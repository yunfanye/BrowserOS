diff --git a/chrome/browser/ui/views/frame/browser_window_property_manager_win.cc b/chrome/browser/ui/views/frame/browser_window_property_manager_win.cc
index 1a62480aee22c..2b678add30238 100644
--- a/chrome/browser/ui/views/frame/browser_window_property_manager_win.cc
+++ b/chrome/browser/ui/views/frame/browser_window_property_manager_win.cc
@@ -6,6 +6,7 @@
 
 #include "base/command_line.h"
 #include "base/functional/bind.h"
+#include "base/path_service.h"
 #include "base/strings/utf_string_conversions.h"
 #include "base/win/windows_version.h"
 #include "chrome/browser/browser_process.h"
@@ -17,6 +18,7 @@
 #include "chrome/browser/web_applications/extensions/web_app_extension_shortcut.h"
 #include "chrome/browser/web_applications/web_app_helpers.h"
 #include "chrome/common/pref_names.h"
+#include "chrome/installer/util/install_util.h"
 #include "components/prefs/pref_service.h"
 #include "extensions/browser/extension_registry.h"
 #include "ui/base/win/shell.h"
@@ -87,6 +89,16 @@ void BrowserWindowPropertyManager::UpdateWindowProperties() {
     shortcut_manager->GetShortcutProperties(profile->GetPath(), &command_line,
                                             &pinned_name, &icon_path);
     command_line_string = command_line.GetCommandLineString();
+  } else if (browser->is_type_normal() || browser->is_type_popup()) {
+    // Fallback: Set basic relaunch details using the current executable.
+    // This ensures taskbar pinning works correctly even when the profile
+    // icon hasn't been created yet (e.g., in developer builds).
+    base::FilePath exe_path;
+    if (base::PathService::Get(base::FILE_EXE, &exe_path)) {
+      icon_path = exe_path;
+      command_line_string = L"\"" + exe_path.value() + L"\"";
+      pinned_name = InstallUtil::GetDisplayName();
+    }
   }
   ui::win::SetAppDetailsForWindow(app_id, icon_path, 0, command_line_string,
                                   pinned_name, hwnd_);
