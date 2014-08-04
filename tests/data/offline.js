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

    test("update returns a what the wrapped transport returns", 1, function() {
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
}());
