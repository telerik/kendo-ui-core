@echo off

"C:\NodeJS\bin\cygpath.exe -u %1" > tmp

echo %tmp%;

"C:\NodeJS\bin\node.exe" path