@echo off

setlocal
set PATH=c:\NodeJS\bin;%PATH%;

echo %CD%

"C:\NodeJS\bin\node.exe '/cygdrive/c/TB/%1/Griffin/Kendo/Sources/build/build.js'"
endlocal