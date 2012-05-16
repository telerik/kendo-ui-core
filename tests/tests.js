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
    PORT       = process.argv[3] || 8880,
    bayeux     = new faye.NodeAdapter({mount: "/faye", timeout: 100000});

var fileServer = new static.Server(WEBROOT, {cache: false});

var server = http.createServer(function(request, response) {
    request.addListener('end', function (argument) {
        fileServer.serve(request, response);
    });
});

bayeux.attach(server);

server.listen(PORT);

var client = bayeux.getClient(), browsers;
var failures = 0, total = 0;

client.subscribe("/ready", function(agent) {
    client.publish('/load', "/" + url);
});

var doc = builder.create();
var root = doc.begin('testsuite');

url = process.argv[2] || 'tests/';

client.subscribe('/testDone', function(message) {
  var agent = message.agent.match(/(Firefox|Chrome)\/(\d+)/);
  agent = agent[1] + agent[2];
  var testCase = root.ele('testcase')
    .att('name', message.name)
    .att('time', message.duration)
    .att('classname', agent + "." + message.suite);


  if (message.failed > 0) {
    process.stderr.write("*********************************************************************************************\n");
    process.stderr.write("FAIL: " + agent + " -- " + message.suite + " : " + message.name + "(" + message.duration + "ms)" + "\n");
    process.stderr.write(message.failures.join("\n") + "\n");
    process.stderr.write("*********************************************************************************************\n");
    testCase.ele('failure').txt(message.failures.join("\n"));
  } else {
    process.stderr.write("pass: " + agent + " -- " + message.suite + " : " + message.name + "(" + message.duration + "ms)" + "\n");
  }
});

client.subscribe('/done', function(message) {
    failures += message.failures;
    total += message.total;

    browserProcess.kill();
});

var browsers, browserProcess;

switch(os.type()) {
    case "Darwin":
        browsers = [
            "/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome",
            "/Applications/Firefox\ ESR.app/Contents/MacOS/firefox",
            "/Applications/Firefox.app/Contents/MacOS/firefox"];
        break;
    case "Linux":
        browsers = [
            "google-chrome",
            "firefox-esr",
            "firefox"];

        break;
}

var testRunnerURL = 'http://localhost:' + PORT + '/tests/testrunner.html';

function launchBrowser() {
    var currentBrowser;

    if (browsers.length) {
        currentBrowser = browsers.pop();
        setTimeout(function() {
            browserProcess = spawn(currentBrowser, ['-private', '-no-remote', testRunnerURL]);
            browserProcess.on('exit', launchBrowser);
        }, 20);
    } else {
        root.att('tests', total)
        .att('errors', 0)
        .att('failures', failures);

        process.stdout.write(doc.toString({pretty: true}));
        process.exit(failures === 0 ? 0 : 1);
    }
}

launchBrowser();
