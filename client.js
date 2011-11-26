#!/usr/bin/env node

var http       = require('http'),
    faye       = require('faye'),
    colors     = require('colors'),
    util       = require('util'),
    builder    = require('xmlbuilder'),
    paperboy   = require('paperboy');

var client = new faye.Client('http://localhost:8080/faye');
var doc = builder.create();
var root = doc.begin('testsuite');
var agents = 0;

url = process.argv[2] || 'tests/mobile/';

client.subscribe('/connect', function(agent) {

    util.puts(agent.green, " connected");
    agents ++;
});

client.subscribe("/testDone", function(state) {
    var testName = (state.module ? state.module + " " : "").bold + state.name;
    if (state.failed == 0) {
        testName = testName.blue;
    } else {
        testName = testName.red;
    }

    util.puts(testName + ' (' + state.failed.toString().red + ', ' + state.passed.toString().green + ', ' + state.total.toString().grey + ')');
    for (var i = 0; i < state.failures.length; i ++) {
        util.puts((" -- " + state.failures[i]).red);
    }
});

client.subscribe("/done", function(agent) {
    agents --;

    if(!agents) {
        process.exit();
    }
});

client.publish('/load', "/" + url);

/*
client.subscribe('/testDone', function(message) {
  var testCase = root.ele('testcase').att('name', message.name).att('classname', message.agent);

  if (message.failed > 0) {
    testCase.ele('failure');
  }
});

var clientsReported = 0, clientsTotal = 2, failures = 0, total = 0;


client.subscribe('/done', function(message) {

  clientsReported ++;
  failures += message.failures;
  total += message.total;

  if (clientsReported == clientsTotal) {
    root.att('tests', total)
      .att('errors', 0)
      .att('failures', failures);

    console.log(doc.toString({pretty: true}));
    process.exit();
  }
});
*/
