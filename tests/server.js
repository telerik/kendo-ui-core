#!/usr/bin/env node

var http    = require("http");
var faye    = require("faye");
var path    = require("path");
var fs      = require("fs");
var WEBROOT = path.join(path.dirname(__filename), "..");
var url     = require("url");
var SS      = require("./static-server.js");

var server = http.createServer(SS.make_server(WEBROOT, true));
server.listen(8888);
