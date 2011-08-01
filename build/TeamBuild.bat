@echo off

cd %1

echo "param 2"
echo %2

C:\NodeJS\bin\node.exe build/build.js %2
