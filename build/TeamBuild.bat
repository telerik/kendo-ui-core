@echo off

"C:\NodeJS\bin\cygpath.exe" "-u %1" > path

echo path;

"C:\NodeJS\bin\node.exe" path