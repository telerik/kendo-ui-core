@echo off

echo "windows format path:"
echo %1

C:\NodeJS\bin\cygpath.exe -u %1 > tmpFile

set /p myvar= < tmpFile 
del tmpFile

set buildPath=cygdrive/%myvar%/build/build.js

echo %buildPath%

"C:\NodeJS\bin\node.exe" buildPath
