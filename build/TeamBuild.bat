@echo off

set /p path= < "C:\NodeJS\bin\cygpath.exe" -u "%1"

echo path;

"C:\NodeJS\bin\node.exe" path