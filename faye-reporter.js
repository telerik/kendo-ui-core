var client = top.client;
client.publish("/connect", navigator.userAgent);

window.__qunit_runner.done = function() {
    client.publish("/done", navigator.userAgent);
}

window.__qunit_runner.testDone = function(state) {
    client.publish("/testDone", state);
}
