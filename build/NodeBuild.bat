@echo off

cd %1

echo "cdn path"
echo %3

C:\NodeJS\bin\node.exe build/build.js %2 %3
