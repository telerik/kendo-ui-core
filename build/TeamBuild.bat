@echo off

echo %1

"C:\NodeJS\bin\cygpath.exe -u %1" > tmpPath

echo tmp

"C:\NodeJS\bin\node.exe" path