# Tips
## USB debugging Firefox on Android
````
adb forward tcp:6000 localfilesystem:/data/data/org.mozilla.firefox/firefox-debugger-socket
````
Courtesy: https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Firefox_for_Android
