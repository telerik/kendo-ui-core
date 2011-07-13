@echo off

setlocal
set PATH=c:\NodeJS\bin;%PATH%;
node.exe "/cygdrive/c/TB/%1/Griffin/Kendo/Sources/build/build.js";
endlocal