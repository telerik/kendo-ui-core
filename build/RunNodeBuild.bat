@echo off

echo "fooo"
dir "\TB\%1\Griffin\Kendo\Sources"
echo "node bin folder"
dir "C:\NodeJS\bin\"

cd "\TB\%1\Griffin\Kendo\Sources"

echo %CD%

"C:\NodeJS\bin\node.exe" "build/build.js"