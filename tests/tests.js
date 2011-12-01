#!/usr/bin/env node

var http       = require("http"),
    faye       = require("faye"),
    static     = require("node-static"),
    path       = require("path"),
    fs         = require("fs"),
    builder    = require("xmlbuilder"),
    spawn      = require("child_process").spawn,
    os         = require("os"),
    colors     = require('colors'),
    util       = require('util'),
    builder    = require('xmlbuilder');



var WEBROOT    = path.join(path.dirname(__filename), ".."),
    PORT       = 8880,
    bayeux     = new faye.NodeAdapter({mount: "/faye", timeout: 100000});

var fileServer = new static.Server(WEBROOT, {cache: false});

var server = http.createServer(function(request, response) {
    request.addListener('end', function (argument) {
        fileServer.serve(request, response);
    });
});

bayeux.attach(server);

server.listen(PORT);

var client = bayeux.getClient(), chrome;
var agents = 0, failures = 0, total = 0;

client.subscribe("/ready", function(agent) {
    agents ++;
    client.publish('/load', "/" + url);
});

var doc = builder.create();
var root = doc.begin('testsuite');
var agents = 0;

url = process.argv[2] || 'tests/';

client.subscribe('/testDone', function(message) {
  var testCase = root.ele('testcase')
    .att('name', message.name)
    .att('time', message.duration)
    .att('classname', "Chrome");


  if (message.failed > 0) {
    process.stderr.write("F");
    testCase.ele('failure').txt(message.failures.join("\n"));
  } else {
    process.stderr.write(".");
  }
});

client.subscribe('/done', function(message) {
    agents --;
    failures += message.failures;
    total += message.total;

    if (!agents) {
        root.att('tests', total)
        .att('errors', 0)
        .att('failures', failures);

        process.stdout.write(doc.toString({pretty: true}));
        chrome.kill();
        process.exit(failures === 0 ? 0 : 1);
    }
});

var browserPaths = {
    'Darwin': "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
    'Linux': "google-chrome"
}

chrome = spawn(browserPaths[os.type()], ['http://localhost:' + PORT + '/tests/testrunner.html']);

