@echo off

var path = %1;
path.replace("\", "/").replace(":", "");
path = "cygdrive/" + path + "/build/build.js";

echo path;

"C:\NodeJS\bin\node.exe" path