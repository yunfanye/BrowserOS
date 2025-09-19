diff --git a/chrome/browser/importer/importer_list.cc b/chrome/browser/importer/importer_list.cc
index 5898c273ff443..45d0758ef98e9 100644
--- a/chrome/browser/importer/importer_list.cc
+++ b/chrome/browser/importer/importer_list.cc
@@ -17,9 +17,14 @@
 #include "chrome/common/importer/importer_data_types.h"
 #include "chrome/grit/generated_resources.h"
 #include "ui/base/l10n/l10n_util.h"
+#include "base/logging.h"
 
 #if BUILDFLAG(IS_MAC)
 #include "base/apple/foundation_util.h"
+#include "base/files/file_util.h"
+#include "base/json/json_reader.h"
+#include "base/strings/utf_string_conversions.h"
+#include "base/values.h"
 #include "chrome/common/importer/safari_importer_utils.h"
 #endif
 
@@ -68,6 +73,9 @@ void DetectBuiltinWindowsProfiles(
 #endif  // BUILDFLAG(IS_WIN)
 
 #if BUILDFLAG(IS_MAC)
+// Checks if there are any extensions to import from the Chrome preferences file
+bool HasExtensionsToImport(const base::FilePath& preferences_path);
+
 void DetectSafariProfiles(std::vector<importer::SourceProfile>* profiles) {
   base::ScopedBlockingCall scoped_blocking_call(FROM_HERE,
                                                 base::BlockingType::MAY_BLOCK);
@@ -83,6 +91,210 @@ void DetectSafariProfiles(std::vector<importer::SourceProfile>* profiles) {
   safari.services_supported = items;
   profiles->push_back(safari);
 }
+
+base::FilePath GetChromeUserDataFolder() {
+  base::FilePath result = base::apple::GetUserLibraryPath();
+  return result.Append("Application Support/Google/Chrome");
+}
+
+bool ChromeImporterCanImport(const base::FilePath& profile_path, uint16_t* services) {
+  DCHECK(services);
+  *services = importer::NONE;
+
+  if (!base::PathExists(profile_path))
+    return false;
+
+  base::FilePath bookmarks_path = profile_path.Append("Bookmarks");
+  base::FilePath history_path = profile_path.Append("History");
+  base::FilePath passwords_path = profile_path.Append("Login Data");
+  base::FilePath preferences_path = profile_path.Append("Preferences");
+  base::FilePath secure_preferences_path = profile_path.Append("Secure Preferences");
+
+  if (base::PathExists(bookmarks_path))
+    *services |= importer::FAVORITES;
+
+  if (base::PathExists(history_path))
+    *services |= importer::HISTORY;
+
+  if (base::PathExists(passwords_path))
+    *services |= importer::PASSWORDS;
+
+  if (base::PathExists(preferences_path)) {
+    *services |= importer::AUTOFILL_FORM_DATA;
+    *services |= importer::SEARCH_ENGINES;
+
+    // Check for extensions in preferences
+    if (HasExtensionsToImport(preferences_path) ||
+        (base::PathExists(secure_preferences_path) &&
+         HasExtensionsToImport(secure_preferences_path))) {
+      *services |= importer::EXTENSIONS;
+    }
+  }
+
+  return *services != importer::NONE;
+}
+
+bool HasExtensionsToImport(const base::FilePath& preferences_path) {
+  LOG(INFO) << "Checking for extensions in: " << preferences_path.AsUTF8Unsafe();
+
+  std::string preferences_content;
+  if (!base::ReadFileToString(preferences_path, &preferences_content)) {
+    LOG(INFO) << "Failed to read preferences file: " << preferences_path.AsUTF8Unsafe();
+    return false;
+  }
+
+  std::optional<base::Value::Dict> preferences =
+      base::JSONReader::ReadDict(preferences_content);
+  if (!preferences) {
+    LOG(INFO) << "Failed to parse preferences file as JSON: " << preferences_path.AsUTF8Unsafe();
+    return false;
+  }
+
+  // Extensions are stored in extensions.settings in Chrome preferences
+  const base::Value::Dict* extensions_dict =
+      preferences->FindDictByDottedPath("extensions.settings");
+  if (!extensions_dict) {
+    LOG(INFO) << "No extensions.settings found in preferences file";
+    return false;
+  }
+
+  LOG(INFO) << "Found extensions.settings with " << extensions_dict->size() << " entries";
+
+  // Check for at least one valid extension
+  int examined_extensions = 0;
+  for (const auto [key, value] : *extensions_dict) {
+    examined_extensions++;
+    if (!value.is_dict()) {
+      continue;
+    }
+
+    const base::Value::Dict& dict = value.GetDict();
+
+    // Only count if:
+    // 1. It's from the Chrome Web Store
+    // 2. It's not installed by default
+    // 3. It's enabled
+
+    if (dict.FindBool("was_installed_by_default").value_or(true)) {
+      LOG(INFO) << "Extension " << key << " was installed by default, skipping";
+      continue;  // Skip default extensions
+    }
+
+    // State 0 means disabled
+    // int state = dict.FindInt("state").value_or(0);
+    // if (!state) {
+    //   LOG(INFO) << "Extension " << key << " is disabled (state=0), skipping";
+    //   continue;  // Skip disabled extensions
+    // }
+
+    if (!dict.FindBool("from_webstore").value_or(false)) {
+      LOG(INFO) << "Extension " << key << " is not from the web store, skipping";
+      continue;  // Skip non-webstore extensions
+    }
+    return true;
+
+    // Check if it's an extension (not a theme or app)
+    // const base::Value::Dict* manifest = dict.FindDict("manifest");
+    // if (manifest) {
+    //   LOG(INFO) << "Extension " << key << " has manifest";
+    //   return true;
+    // } else {
+    //   LOG(INFO) << "Extension " << key << " has no manifest";
+    // }
+  }
+
+  LOG(INFO) << "Examined " << examined_extensions << " extensions, none qualified for import";
+  return false;
+}
+
+base::Value::List GetChromeSourceProfiles(const base::FilePath& local_state_path) {
+  base::Value::List profiles;
+
+  if (base::PathExists(local_state_path)) {
+    std::string local_state_content;
+    if (base::ReadFileToString(local_state_path, &local_state_content)) {
+      std::optional<base::Value::Dict> local_state_dict =
+          base::JSONReader::ReadDict(local_state_content);
+
+      if (local_state_dict) {
+        const auto* profile_dict = local_state_dict->FindDict("profile");
+        if (profile_dict) {
+          const auto* info_cache = profile_dict->FindDict("info_cache");
+          if (info_cache) {
+            for (const auto value : *info_cache) {
+              const auto* profile = value.second.GetIfDict();
+              if (!profile)
+                continue;
+
+              auto* name = profile->FindString("name");
+              if (!name)
+                continue;
+
+              base::Value::Dict entry;
+              entry.Set("id", value.first);
+              entry.Set("name", *name);
+              profiles.Append(std::move(entry));
+            }
+          }
+        }
+      }
+    }
+  }
+
+  // If no profiles were found, add the default one
+  if (profiles.empty()) {
+    base::Value::Dict entry;
+    entry.Set("id", "Default");
+    entry.Set("name", "Default");
+    profiles.Append(std::move(entry));
+  }
+
+  return profiles;
+}
+
+void DetectChromeProfiles(std::vector<importer::SourceProfile>* profiles) {
+  base::ScopedBlockingCall scoped_blocking_call(FROM_HERE,
+                                               base::BlockingType::MAY_BLOCK);
+
+  base::FilePath chrome_path = GetChromeUserDataFolder();
+  if (!base::PathExists(chrome_path))
+    return;
+
+  // Get the list of profiles from Local State
+  base::FilePath local_state_path = chrome_path.Append("Local State");
+  base::Value::List chrome_profiles = GetChromeSourceProfiles(local_state_path);
+
+  // Add each profile
+  for (const auto& value : chrome_profiles) {
+    const auto* dict = value.GetIfDict();
+    if (!dict)
+      continue;
+
+    const std::string* profile_id = dict->FindString("id");
+    const std::string* name = dict->FindString("name");
+
+    if (!profile_id || !name)
+      continue;
+
+    base::FilePath profile_folder = chrome_path.Append(*profile_id);
+    uint16_t services = importer::NONE;
+
+    if (!ChromeImporterCanImport(profile_folder, &services))
+      continue;
+
+    importer::SourceProfile chrome;
+    if (*profile_id == "Default") {
+      chrome.importer_name = l10n_util::GetStringUTF16(IDS_IMPORT_FROM_CHROME);
+    } else {
+      chrome.importer_name = l10n_util::GetStringUTF16(IDS_IMPORT_FROM_CHROME) +
+                            u" - " + base::UTF8ToUTF16(*name);
+    }
+    chrome.importer_type = importer::TYPE_CHROME;
+    chrome.services_supported = services;
+    chrome.source_path = profile_folder;
+    profiles->push_back(chrome);
+  }
+}
 #endif  // BUILDFLAG(IS_MAC)
 
 // |locale|: The application locale used for lookups in Firefox's
@@ -172,8 +384,10 @@ std::vector<importer::SourceProfile> DetectSourceProfilesWorker(
   if (shell_integration::IsFirefoxDefaultBrowser()) {
     DetectFirefoxProfiles(locale, &profiles);
     DetectSafariProfiles(&profiles);
+    DetectChromeProfiles(&profiles);
   } else {
     DetectSafariProfiles(&profiles);
+    DetectChromeProfiles(&profiles);
     DetectFirefoxProfiles(locale, &profiles);
   }
 #else
