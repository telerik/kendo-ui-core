(function() {

    module("offline transport", {
        setup: function() {

        },
        teardown: function() {
            localStorage.removeItem("key")
        }
    });

    var Wrapper = kendo.data.OfflineTransportWrapper;

    test("read delegates to the wrapped transport", 1, function() {
        var readOptions = {};

        var wrapper = new Wrapper({
            transport: {
                read: function(options) {
                    strictEqual(options, readOptions);
                }
            }
        });

        wrapper.read(readOptions);
    });

    test("state stores in localStorage under specified key", function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       var state = { foo: "foo" };

       wrapper._state(state);

       equal(localStorage.getItem("key"), '{"foo":"foo"}');
    });

    test("state returns item in localStorage under the specified key", function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       localStorage.setItem("key", kendo.stringify({foo:"foo"}));

       var state = wrapper._state();

       equal(state.foo, "foo");
    });

    test("state returns empty object if localStorage doesn't contain an item for the specified key", function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       var state = wrapper._state();

       equal(kendo.stringify(state), "{}");
    });

    test("date stores in state", function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       var data = { foo: "foo" };

       wrapper.data(data);

       deepEqual(wrapper._state().data, data);
    });

    test("date returns data stored in state", function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       var data = { foo: "foo" };

       wrapper.data(data);

       deepEqual(wrapper.data(), data);
    });

    test("read returns the contents of data if online is false", 1, function() {
       var wrapper = new Wrapper({
           key: "key"
       });

       wrapper.data({ foo: "foo"});

       wrapper.online = false;

       wrapper.read({
          success: function(data) {
              equal(kendo.stringify(data), '{"foo":"foo"}');
          }
       });
    });

    test("update delegates to the wrapped transport", 1, function() {
        var updateOptions = {};

        var wrapper = new Wrapper({
            transport: {
                update: function(options) {
                    strictEqual(options, updateOptions);
                }
            }
        });

        wrapper.update(updateOptions);
    });

    test("update returns what the wrapped transport returns", 1, function() {
        var wrapper = new Wrapper({
            transport: {
                update: function() {
                    return "foo";
                }
            }
        });

        equal(wrapper.update(), "foo");
    });

    test("update stores the request in localStorage when not online", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        wrapper.update({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "update");
        equal(state.requests[0].data.foo, "foo");
    });

    test("update returns a promise", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        var result = wrapper.update({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("_sync sends all pending update requests to transport", function() {
        var wrapper = new Wrapper({
            key: "key",
            transport: stub({}, "update")
        });

        wrapper._state({
            requests: [
                { data: "foo", type: "update"},
                { data: "bar", type: "update"}
            ]
        })

        wrapper._sync();

        equal(wrapper._transport.calls("update"), 2);
    });

    test("_sunc removes requests that have been sent successfully", function() {
        var wrapper = new Wrapper({
            key: "key",
            transport: {
                update: function(options) {
                    if (options.foo == "foo") {
                       options.success();
                    }
                }
            }
        });

        wrapper._state({
            requests: [
                { data: {foo:"foo"}, type: "update"},
                { data: {foo:"bar"}, type: "update"}
            ]
        })

        wrapper._sync();

        var state = wrapper._state();

        equal(state.requests.length, 1);
        equal(state.requests[0].data.foo, "bar");
    });

    test("update calls _sync when online", function() {
        var wrapper = new Wrapper({
            key: "key",
            transport: stub({}, "update")
        });

        stub(wrapper, "_sync");

        wrapper.update();

        equal(wrapper.calls("_sync"), 1);
    });

    test("destroy delegates to the wrapped transport", 1, function() {
        var destroyOptions = {};

        var wrapper = new Wrapper({
            transport: {
                destroy: function(options) {
                    strictEqual(options, destroyOptions);
                }
            }
        });

        wrapper.destroy(destroyOptions);
    });

    test("destroy returns what the wrapped transport returns", 1, function() {
        var wrapper = new Wrapper({
            transport: {
                destroy: function() {
                    return "foo";
                }
            }
        });

        equal(wrapper.destroy(), "foo");
    });

    test("destroy stores the request in localStorage when not online", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        wrapper.destroy({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "destroy");
        equal(state.requests[0].data.foo, "foo");
    });

    test("destroy returns a promise", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        var result = wrapper.destroy({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("destroy calls _sync when online", function() {
        var wrapper = new Wrapper({
            key: "key",
            transport: stub({}, "destroy")
        });

        stub(wrapper, "_sync");

        wrapper.destroy();

        equal(wrapper.calls("_sync"), 1);
    });

    test("create delegates to the wrapped transport", 1, function() {
        var createOptions = {};

        var wrapper = new Wrapper({
            transport: {
                create: function(options) {
                    strictEqual(options, createOptions);
                }
            }
        });

        wrapper.create(createOptions);
    });

    test("create returns what the wrapped transport returns", 1, function() {
        var wrapper = new Wrapper({
            transport: {
                create: function() {
                    return "foo";
                }
            }
        });

        equal(wrapper.create(), "foo");
    });

    test("create stores the request in localStorage when not online", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        wrapper.create({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "create");
        equal(state.requests[0].data.foo, "foo");
    });

    test("create returns a promise", function() {
        var wrapper = new Wrapper({
            key: "key"
        });

        wrapper.online = false;

        var result = wrapper.create({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("create calls _sync when online", function() {
        var wrapper = new Wrapper({
            key: "key",
            transport: stub({}, "create")
        });

        stub(wrapper, "_sync");

        wrapper.create();

        equal(wrapper.calls("_sync"), 1);
    });
}());
