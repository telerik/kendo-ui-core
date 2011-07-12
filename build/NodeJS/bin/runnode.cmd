rem @echo off
call %~dp0\setenv
echo on
FOR /F "tokens=*" %%i in ('cygpath.exe %1') do SET convArg=%%i  
node.exe "%convArg%"  
