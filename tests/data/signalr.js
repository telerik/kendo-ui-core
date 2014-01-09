(function() {

var SignalR;
var transport;

function promise() {
    return  {
        done: $.noop,
        fail: $.noop
    };
}

function hub() {
    return {
        on: $.noop,
        invoke: $.noop
    };
}

module("SignalR", {
    setup: function() {
        SignalR = kendo.data.transports.signalr;

        transport = new SignalR({
            promise: promise(),
            hub: hub()
        });
    }
});

test("signalr transport inherits from remote transport", function() {
    ok(transport instanceof kendo.data.RemoteTransport);
});

test("signalr transport requires the promise option to be set", 1, function() {
    try {
        new SignalR();
    } catch(e) {
        equal(e.toString(), 'Error: The "promise" option must be set.');
    }
});

test("the promise option must be a Promise", 1, function() {
    try {
        new SignalR({
            promise: {}
        });
    } catch(e) {
        equal(e.toString(), 'Error: The "promise" option must be a Promise.');
    }
});

test("signalr transport requires the hub option to be set", 1, function() {
    try {
        new SignalR({
            promise: promise()
        });
    } catch(e) {
        equal(e.toString(), 'Error: The "hub" option must be set.');
    }
});

test("the hub object must have on and invoke methods", 1, function() {
    try {
        new SignalR({
            promise: promise(),
            hub: {}
        });
    } catch(e) {
        equal(e.toString(), 'Error: The "hub" option is not a valid SignalR hub proxy.');
    }
});

test("the push method listens for create notifications from the hub", function() {
    var proxy = stub({}, {
        on: $.noop,
        invoke: $.noop
    });

    transport = new SignalR({
        promise: promise(),
        hub: proxy,
        client: {
            create: "create"
        }
    });

    transport.push({});

    equal(proxy.calls("on"), 1);
    equal(proxy.args("on", 0)[0], "create");
});

test("the push method listens for update notifications from the hub", function() {
    var proxy = stub({}, {
        on: $.noop,
        invoke: $.noop
    });

    transport = new SignalR({
        promise: promise(),
        hub: proxy,
        client: {
            update: "update"
        }
    });

    transport.push({});

    equal(proxy.calls("on"), 1);
    equal(proxy.args("on", 0)[0], "update");
});

test("the push method listens for destroy notifications from the hub", function() {
    var proxy = stub({}, {
        on: $.noop,
        invoke: $.noop
    });

    transport = new SignalR({
        promise: promise(),
        hub: proxy,
        client: {
            destroy: "destroy"
        }
    });

    transport.push({});

    equal(proxy.calls("on"), 1);
    equal(proxy.args("on", 0)[0], "destroy");
});

test("transport calls pushCreate when the create method is triggered by the hub", function() {
    var result = {};

    transport = new SignalR({
        promise: promise(),
        hub: {
            invoke: $.noop,
            on: function(method, callback) {
               callback(result);
            }
        },
        client: {
            create: "c"
        }
    });

    var options = stub({}, "pushCreate");

    transport.push(options);

    equal(options.calls("pushCreate"), 1);
    equal(options.args("pushCreate", 0)[0], result);
});

test("transport calls pushUpdate when the update method is triggered by the hub", function() {
    var result = {};

    transport = new SignalR({
        promise: promise(),
        hub: {
            invoke: $.noop,
            on: function(method, callback) {
               callback(result);
            }
        },
        client: {
            update: "c"
        }
    });

    var options = stub({}, "pushUpdate");

    transport.push(options);

    equal(options.calls("pushUpdate"), 1);
    equal(options.args("pushUpdate", 0)[0], result);
});

test("transport calls pushDestroy when the destroy method is triggered by the hub", function() {
    var result = {};

    transport = new SignalR({
        promise: promise(),
        hub: {
            invoke: $.noop,
            on: function(method, callback) {
               callback(result);
            }
        },
        client: {
            destroy: "c"
        }
    });

    var options = stub({}, "pushDestroy");

    transport.push(options);

    equal(options.calls("pushDestroy"), 1);
    equal(options.args("pushDestroy", 0)[0], result);
});

test("can override the push method from the options", function() {
    var push = $.noop;

    transport = new SignalR({
       promise: promise(),
       hub: hub(),
       push: push
    });

    equal(transport.push, push);
});

test("the context of the custom push method is the transport itself", 1, function() {
    transport = new SignalR({
       promise: promise(),
       hub: hub(),
       push: function() {
           strictEqual(this, transport);
       }
    });

    transport.push();
});

}());
