#!/usr/bin/env node

var http       = require("http"),
    faye       = require("faye"),
    static     = require("node-static"),
    path       = require("path"),
    fs         = require("fs"),
    builder = require("xmlbuilder"),
    WEBROOT    = path.join(path.dirname(__filename), ".."),
    bayeux     = new faye.NodeAdapter({mount: "/faye", timeout: 100000});

var fileServer = new static.Server(WEBROOT, {cache: false});

var server = http.createServer(function(request, response) {
    request.addListener('end', function (argument) {
        fileServer.serve(request, response);
    });
});

bayeux.attach(server);

server.listen(8888);

function log(statCode, url, ip, err) {
    var logStr = statCode + ' - ' + url + ' - ' + ip;

    if (err) {
        logStr += ' - ' + err;
    }
    console.log(logStr);
}
