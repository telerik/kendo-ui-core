@echo off

var path = %1;
path.replace("\", "/").replace(":", "");

"C:\NodeJS\bin\node.exe" "cygdrive/" + path + "/build/build.js"