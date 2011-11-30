#!/usr/bin/env node

var http       = require('http'),
    faye       = require('faye'),
    colors     = require('colors'),
    util       = require('util'),
    builder    = require('xmlbuilder'),
    paperboy   = require('paperboy');

var client = new faye.Client('http://localhost:8888/faye');
var doc = builder.create();
var root = doc.begin('testsuite');
var agents = 0;

url = process.argv[2] || 'tests/mobile/';

client.subscribe('/connect', function(agent) {
    agents ++;
});

client.publish('/load', "/" + url);

client.subscribe('/testDone', function(message) {
  var testCase = root.ele('testcase')
    .att('name', message.name)
    .att('time', message.duration)
    .att('classname', "Chrome");

  if (message.failed > 0) {
    testCase.ele('failure').txt(message.failures.join("\n"));
  }
});

var clientsReported = 0, clientsTotal = 2, failures = 0, total = 0;


client.subscribe('/done', function(message) {
    agents --;
    failures += message.failures;
    total += message.total;

    if (!agents) {
        root.att('tests', total)
        .att('errors', 0)
        .att('failures', failures);

        console.log(doc.toString({pretty: true}));
        process.exit();
    }
});
