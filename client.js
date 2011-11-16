var http       = require('http'),
    faye       = require('faye'),
    builder    = require('xmlbuilder'),
    paperboy   = require('paperboy');

var client = new faye.Client('http://localhost:8080/faye');
var doc = builder.create();
var root = doc.begin('testsuite');
var agents = 0;


client.subscribe('/connect', function(agent) {
    console.log(agent, " connected");
    agents ++;
});

client.subscribe("/testDone", function(state) {
    console.log("test done", state);
});

client.subscribe("/done", function(agent) {
    console.log("done", agent);

    agents --;

    if(!agents) {
        process.exit();
    }
});

client.publish('/load', '/tests/mobile/');

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
