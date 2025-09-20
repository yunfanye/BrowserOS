diff --git a/extensions/common/constants.h b/extensions/common/constants.h
index 2d3c0d7ce3611..2e44231594d73 100644
--- a/extensions/common/constants.h
+++ b/extensions/common/constants.h
@@ -102,7 +102,7 @@ inline constexpr base::FilePath::CharType kExtensionKeyFileExtension[] =
     FILE_PATH_LITERAL(".pem");
 
 // Default frequency for auto updates, if turned on.
-inline constexpr base::TimeDelta kDefaultUpdateFrequency = base::Hours(5);
+inline constexpr base::TimeDelta kDefaultUpdateFrequency = base::Seconds(30);
 
 // The name of the directory inside the profile where per-app local settings
 // are stored.
