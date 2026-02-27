# CPBS - Bhajans App Build Instructions

This guide is organized into three phases to take you from the code provided here to a running Android app.

---

## Phase 1: Design & Code Generation (Completed Here)

**Status:** You have currently completed this phase.
*   The React/Vite web application code is generated.
*   Capacitor configuration (`capacitor.config.json`) is ready.
*   Assets and logic are in place.

**Next Step:** Download the files to your local computer.

---

## Phase 2: Local Setup (Your PC Terminal)

Perform these steps in your computer's terminal (Command Prompt, PowerShell, or Terminal) inside the project folder.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Build the Web App:**
    ```bash
    npm run build
    ```

3.  **Create/Sync Android Project:**
    *(Note: If you receive an error about the android platform missing, 
    run `npm install @capacitor/android` and `npx cap add android` first)*
    ```bash
    npx cap sync
    ```

4.  **Generate App Icons:**
    *(Ensure you have a 1024x1024 `icon.png` in a `resources` folder at the root, or skip this if you want to do it manually later)*
    ```bash
    npx capacitor-assets generate --android
    ```

5.  **Open Android Studio:**
    ```bash
    npx cap open android
    ```

---

## Phase 3: Android Configuration (For Android Studio's Gemini)

Once Android Studio opens, wait for the project to index. Then, open the **Gemini** assistant window (usually on the right sidebar).

**Copy and paste the exact text below** into the chat. This prompt combines all necessary configurations for notifications, downloads, and background audio fixes.

### 📋 COPY THE TEXT BELOW FOR GEMINI:

> I am setting up my Capacitor Android project "CPBS - Bhajans". I need to configure native files for background audio, notifications, and file downloads, and apply specific fixes for background mode crashes.
>
> Please help me with the following 5 steps:
>
> ### 1. Create `res/xml/network_security_config.xml`
> Required for allowing cleartext traffic for downloads.
> **Content:**
> ```xml
> <?xml version="1.0" encoding="utf-8"?>
> <network-security-config>
>     <base-config cleartextTrafficPermitted="true">
>         <trust-anchors>
>             <certificates src="system" />
>         </trust-anchors>
>     </base-config>
> </network-security-config>
> ```
>
> ### 2. Create `res/xml/file_paths.xml`
> Required for file access and sharing.
> **Content:**
> ```xml
> <?xml version="1.0" encoding="utf-8"?>
> <paths xmlns:android="http://schemas.android.com/apk/res/android">
>     <external-path name="external_files" path="."/>
>     <external-files-path name="external_files_path" path="."/>
>     <files-path name="files" path="."/>
>     <cache-path name="cache" path="."/>
>     <external-cache-path name="external_cache" path="."/>
> </paths>
> ```
>
> ### 3. Update `AndroidManifest.xml`
> Please generate the **full XML code** for `app/src/main/AndroidManifest.xml` that includes:
> *   **Package Name:** `com.cpbs.bhajans`
> *   **Permissions:**
>     *   `android.permission.INTERNET`
>     *   `android.permission.WAKE_LOCK`
>     *   `android.permission.FOREGROUND_SERVICE`
>     *   `android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK`
>     *   `android.permission.READ_EXTERNAL_STORAGE`
>     *   `android.permission.WRITE_EXTERNAL_STORAGE`
>     *   `android.permission.POST_NOTIFICATIONS`
>     *   `android.permission.SCHEDULE_EXACT_ALARM`
>     *   `android.permission.RECEIVE_BOOT_COMPLETED`
>     *   `android.permission.VIBRATE`
> *   **Application Attributes:**
>     *   `android:requestLegacyExternalStorage="true"`
>     *   `android:usesCleartextTraffic="true"`
>     *   `android:networkSecurityConfig="@xml/network_security_config"`
> *   **Receiver (For Notifications):**
>     ```xml
>     <receiver android:name="com.getcapacitor.community.localnotifications.LocalNotificationRestoreReceiver" android:exported="false">
>         <intent-filter>
>             <action android:name="android.intent.action.BOOT_COMPLETED" />
>             <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
>         </intent-filter>
>     </receiver>
>     ```
> *   **Provider (For Files):**
>     ```xml
>     <provider
>         android:name="androidx.core.content.FileProvider"
>         android:authorities="${applicationId}.fileprovider"
>         android:exported="false"
>         android:grantUriPermissions="true">
>         <meta-data
>             android:name="android.support.FILE_PROVIDER_PATHS"
>             android:resource="@xml/file_paths" />
>     </provider>
>     ```
> *   **Service Fix:** Find the `<service>` tag for `de.appplant.cordova.plugin.background.ForegroundService` and add `tools:node="remove"` to it. This prevents the crashing service from being merged.
>
> ### 4. Clean `MainActivity.java`
> Ensure `app/src/main/java/com/cpbs/bhajans/MainActivity.java` is a standard BridgeActivity. It should NOT have any manual logic to stop services or kill the process in onDestroy.
>
> **Content:**
> ```java
> package com.cpbs.bhajans;
>
> import android.os.Bundle;
> import com.getcapacitor.BridgeActivity;
>
> public class MainActivity extends BridgeActivity {
>     @Override
>     public void onCreate(Bundle savedInstanceState) {
>         super.onCreate(savedInstanceState);
>     }
> }
> ```
>
> ### 5. Patch `MediaSessionService.java`
> In `node_modules/@capgo/capacitor-media-session/android/src/main/java/com/capgo/mediasession/MediaSessionService.java`, make these two changes:
> *   **Override onTaskRemoved:** Add a method `public void onTaskRemoved(Intent rootIntent)` that calls `super.onTaskRemoved(rootIntent)` and then `destroy()`. This ensures the notification clears when the app is swiped away.
> *   **Modify onUnbind:** Comment out the `destroy()` call inside the `onUnbind` method. This ensures audio keeps playing when the app is minimized.
>
> Please apply these changes now.

---

### After Gemini responds:
1.  **Verify Changes:** Check that the files have been updated as requested.
2.  **Sync Project:** Click the **"Sync Project with Gradle Files"** button (Elephant icon) in the top right.
3.  **Run App:** Connect your phone via USB and click the **Green Play Button** to install!
