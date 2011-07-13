@echo off

C:\NodeJS\bin\cygpath.exe -u %1 > tmpFile
set /p converted= < tmpFile 
del tmpFile

set buildPath=%converted%/build/build.js
set buildPath=%buildPath: =\ %

"C:\NodeJS\bin\node.exe" "%buildPath%"
