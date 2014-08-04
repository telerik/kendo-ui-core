(function() {

    module("offline transport", {
        setup: function() {

        },
        teardown: function() {
            localStorage.removeItem("key")
        }
    });

    var Wrapper = kendo.data.OfflineTransportWrapper;

    var storage = {
        getItem: function() {
            return JSON.parse(localStorage.getItem("key"))
        },
        setItem: function(item) {
            localStorage.setItem("key", kendo.stringify(item));
        }
    };

    var transport = {}

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
            storage: storage
        });

        var state = { foo: "foo" };

        wrapper._state(state);

        equal(localStorage.getItem("key"), '{"foo":"foo"}');
    });

    test("state returns item in localStorage under the specified key", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        localStorage.setItem("key", kendo.stringify({foo:"foo"}));

        var state = wrapper._state();

        equal(state.foo, "foo");
    });

    test("state uses custom storage to save", 1, function() {
        var state = {};

        var wrapper = new Wrapper({
            storage: {
                setItem: function(data) {
                    strictEqual(state, data)
                }
            }
        });

        wrapper._state(state);
    });

    test("state returns empty object if localStorage doesn't contain an item for the specified key", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        var state = wrapper._state();

        equal(kendo.stringify(state), "{}");
    });

    test("date stores in state", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        var data = { foo: "foo" };

        wrapper.data(data);

        deepEqual(wrapper._state().data, data);
    });

    test("date returns data stored in state", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        var data = { foo: "foo" };

        wrapper.data(data);

        deepEqual(wrapper.data(), data);
    });

    test("read returns the contents of data if online is false", 1, function() {
        var wrapper = new Wrapper({
            storage: storage
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
            storage: storage,
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
            storage: storage,
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
            storage: storage
        });

        wrapper.online = false;

        wrapper.update({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "update");
        equal(state.requests[0].data.foo, "foo");
    });

    test("update returns a promise", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        wrapper.online = false;

        var result = wrapper.update({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("sync sends all pending update requests to transport", function() {
        var wrapper = new Wrapper({
            storage: storage,
            transport: stub({}, "update")
        });

        wrapper._state({
            requests: [
                { data: "foo", type: "update"},
                { data: "bar", type: "update"}
            ]
        })

        wrapper.sync();

        equal(wrapper._transport.calls("update"), 2);
    });

    test("_sunc removes requests that have been sent successfully", function() {
        var wrapper = new Wrapper({
            storage: storage,
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

        wrapper.sync();

        var state = wrapper._state();

        equal(state.requests.length, 1);
        equal(state.requests[0].data.foo, "bar");
    });

    test("destroy delegates to the wrapped transport", 1, function() {
        var destroyOptions = {};

        var wrapper = new Wrapper({
            storage: storage,
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
            storage: storage,
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
            storage: storage
        });

        wrapper.online = false;

        wrapper.destroy({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "destroy");
        equal(state.requests[0].data.foo, "foo");
    });

    test("destroy returns a promise", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        wrapper.online = false;

        var result = wrapper.destroy({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("create delegates to the wrapped transport", 1, function() {
        var createOptions = {};

        var wrapper = new Wrapper({
            storage: storage,
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
            storage: storage,
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
            storage: storage
        });

        wrapper.online = false;

        wrapper.create({ foo: "foo", success: $.noop });

        var state = wrapper._state();

        equal(state.requests[0].type, "create");
        equal(state.requests[0].data.foo, "foo");
    });

    test("create returns a promise", function() {
        var wrapper = new Wrapper({
            storage: storage
        });

        wrapper.online = false;

        var result = wrapper.create({ foo: "foo", success: $.noop });

        equal(typeof result.then, "function");
    });

    test("data source wraps existingt transpor with OfflineTransportWrapper when offlineStorage is set", function() {
        var transport = new kendo.data.RemoteTransport();

        var dataSource = new kendo.data.DataSource({
            transport: transport,
            offlineStorage: "key"
        });

        ok(dataSource.transport instanceof Wrapper);
        strictEqual(dataSource.transport._transport, transport);
    });

    test("online method sets the online flag of the transport", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        dataSource.online(false);

        equal(dataSource.transport.online, false);
    });

    test("online returns true if offlineStorage is not enabled", function() {
        var dataSource = new kendo.data.DataSource();

        equal(dataSource.online(), true);
    });

    test("online method gets the online flag of the transport", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        equal(dataSource.online(), true);
    });

    test("data source calls the data method of the wrapper when it reads data", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        stub(dataSource.transport, "data");

        dataSource.read();

        equal(dataSource.transport.calls("data"), 1);
    });

    test("data source calls the data method of the wrapper when it syncs data", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        stub(dataSource.transport, "data");

        dataSource.sync();

        equal(dataSource.transport.calls("data"), 1);
    });

    test("data source calls the sync method of the wrapper when it syncs data", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        stub(dataSource.transport, "sync");

        dataSource.sync();

        equal(dataSource.transport.calls("sync"), 1);
    });

    test("offlineState returns the current wrapper state", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        dataSource.transport._state({ foo: "foo" });
        equal(dataSource.offlineState().foo, "foo");
    });

    test("offlineState returns null if offlineStorage isn't enabled", function() {
        var dataSource = new kendo.data.DataSource({
        });

        equal(dataSource.offlineState(), null);
    });
}());
