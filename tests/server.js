#!/usr/bin/env node

var http       = require("http"),
    faye       = require("faye"),
    static     = require("node-static"),
    path       = require("path"),
    fs         = require("fs"),
    builder    = require("xmlbuilder"),
    WEBROOT    = path.join(path.dirname(__filename), ".."),
    bayeux     = new faye.NodeAdapter({mount: "/faye", timeout: 100000}),
    url        = require("url");

var fileServer = new static.Server(WEBROOT, {cache: false});

function server_plain(request, response) {
    request.addListener('end', function (argument) {
        fileServer.serve(request, response);
    });
};

function server_minified(request, response) {
    request.addListener("end", function(){
        var pathname = decodeURI(url.parse(request.url).pathname);
        pathname = fileServer.resolve(pathname);
        var useOrig = request.headers["x-qhint"];
        if (!useOrig && /(\.js|\.css)$/i.test(pathname)) {
            var minified = pathname.replace(/(js|css)$/, "min.$1");
            fs.exists(minified, function(exists){
                if (exists)
                    request.url = request.url.replace(/(js|css)$/, "min.$1");
                //console.log(request.url);
                fileServer.serve(request, response);
            });
        } else {
            fileServer.serve(request, response);
        }
    });
};

var server = http.createServer(server_minified);

bayeux.attach(server);

server.listen(8888);

function log(statCode, url, ip, err) {
    var logStr = statCode + ' - ' + url + ' - ' + ip;

    if (err) {
        logStr += ' - ' + err;
    }
    console.log(logStr);
}
