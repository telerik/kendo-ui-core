@echo off
echo Setting environment for using Node.JS
path %PATH%;%~dp0
set TAR_OPTIONS=--no-same-owner
set HOME=/lib
