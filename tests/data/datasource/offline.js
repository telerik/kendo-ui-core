(function() {

    module("offline support", {
        teardown: function() {
            localStorage.removeItem("key")
        }
    });

    var DataSource = kendo.data.DataSource;

    test("state stores in localStorage under specified key", function() {
        var dataSource = new DataSource({
            offlineStorage: "key"
        });

        var state = { foo: "foo" };

        dataSource.offlineData(state);

        equal(localStorage.getItem("key"), '{"foo":"foo"}');
    });

    test("state returns item in localStorage under the specified key", function() {
        var dataSource = new DataSource({
            offlineStorage: "key"
        });

        localStorage.setItem("key", kendo.stringify({foo:"foo"}));

        var state = dataSource.offlineData();

        equal(state.foo, "foo");
    });

    test("changes are persisted when online", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id: 1, foo: "foo" }
            ]
        });

        dataSource.read();
        dataSource.at(0).set("foo", "bar");
        dataSource.sync();
        dataSource.online(false);
        dataSource.read();

        equal(dataSource.at(0).foo, "bar");
    });

    test("replaced data is stored offline", function() {
        var dataSource = new DataSource({
            offlineStorage: "key"
        });

        dataSource.data([ { foo: "foo" }]);
        dataSource.online(false);
        dataSource.read();

        equal(dataSource.at(0).foo, "foo");
    });

    test("parses dates in offline data", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    fields: {
                        foo: { type: "date" }
                    }
                }
            }
        });

        var date = new Date();

        dataSource.data([ { foo: date }]);
        dataSource.online(false);
        dataSource.read();

        equal(dataSource.at(0).foo.getTime(), date.getTime());
    });

    test("state uses custom storage to save", 1, function() {
        var state = {};

        var dataSource = new DataSource({
            offlineStorage: {
                setItem: function(data) {
                    strictEqual(state, data)
                }
            }
        });

        dataSource.offlineData(state);
    });

    test("state returns empty object if localStorage doesn't contain an item for the specified key", function() {
        var dataSource = new DataSource({
            offlineStorage: "key"
        });

        var state = dataSource.offlineData();

        equal(kendo.stringify(state), "{}");
    });

    test("data is stored in state", function() {
        var data = [{ foo: "foo" }];

        var dataSource = new DataSource({
            offlineStorage: "key",
            data: data
        });

        dataSource.read();

        equal(dataSource.offlineData().length, data.length);
        equal(dataSource.offlineData()[0].foo, data[0].foo);
    });

    function serverGroupedDataSource(data) {
        return new DataSource({
            offlineStorage: "key",
            serverGrouping: true,
            group: { field: "foo" },
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                   options.success(data);
                }
            }
        });
    }

    test("server grouped data is stored in state", function() {
        var data = [{ items: [ { foo: "foo" } ], field: "foo", value: "foo" }];

        var dataSource = serverGroupedDataSource(data);

        dataSource.read();

        equal(dataSource.offlineData().length, 1);
        equal(dataSource.offlineData()[0].items.length, 1);
        equal(dataSource.offlineData()[0].field, "foo");
    });

    test("data returns data stored in state when offline", function() {
        var data = [{ foo: "foo" }];

        var dataSource = new DataSource({
            offlineStorage: "key"
        });

        dataSource.offlineData(data);
        dataSource.online(false);
        dataSource.read();

        deepEqual(dataSource.data().length, 1);
    });

    test("data returns data stored in state when offline and server grouped", function() {
        var data = [{ items: [ { foo: "foo" } ], field: "foo", value: "foo" }];

        var dataSource = serverGroupedDataSource(data);

        dataSource.offlineData(data);
        dataSource.online(false);
        dataSource.read();

        equal(dataSource.data().length, 1);
        equal(dataSource.data()[0].items.length, 1);
        equal(dataSource.data()[0].field, "foo");
    });

    test("updated items are stored in localStorage when not online and server grouped", function() {
        var data = [{ hasSubgroups: false, items: [ { id: 1, foo: "foo" } ], field: "foo", value: "foo" }];

        var dataSource = serverGroupedDataSource(data);

        dataSource.read();

        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        equal(dataSource.get(1).dirty, true);
        equal(dataSource.get(1).foo, "bar");
    });

    test("destroyed items are stored in localStorage when not online and server grouped", function() {
        var data = [{ hasSubgroups: false, items: [ { id: 1, foo: "foo" } ], field: "foo", value: "foo" }];

        var dataSource = serverGroupedDataSource(data);

        dataSource.read();

        dataSource.online(false);
        dataSource.remove(dataSource.get(1));
        dataSource.sync();
        dataSource.read();

        equal(dataSource._destroyed[0].id, 1);
    });


    test("updated items are stored in localStorage when not online and nested server groups", function() {
        var data = [
            {
            hasSubgroups: true,
            items: [
                {
                    field: "id",
                    value: 1,
                    items: [
                        { id: 1, foo: "foo" }
                    ],
                    hasSubgroups: false
                }
            ],
            field: "foo",
            value: "foo"
        }];

        var dataSource = new DataSource({
            offlineStorage: "key",
            serverGrouping: true,
            group: [{ field: "foo" }, { field: "id" }],
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                   options.success(data);
                }
            }
        });

        dataSource.read();

        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        equal(dataSource.get(1).dirty, true);
        equal(dataSource.get(1).foo, "bar");
    });

    test("updated items are stored in localStorage when not online", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id: 1, foo: "foo" }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        equal(dataSource.get(1).dirty, true);
        equal(dataSource.get(1).foo, "bar");
    });

    test("sync sends all pending update requests to transport", 2, function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        { id: 1, foo: "foo" },
                        { id: 2, foo: "foo" }
                    ]);
                },
                update: function(options) {
                    equal(options.data.foo, "bar");
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.get(2).set("foo", "bar");
        dataSource.sync();

        dataSource.online(true);
    });

    test("sync sends all pending batch update requests to transport", 3, function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            batch: true,
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        { id: 1, foo: "foo" },
                        { id: 2, foo: "foo" }
                    ]);
                },
                update: function(options) {
                    equal(options.data.models.length, 2);
                    equal(options.data.models[0].foo, "bar");
                    equal(options.data.models[1].foo, "baz");
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.get(2).set("foo", "baz");
        dataSource.sync();

        dataSource.online(true);
    });


    test("sync accepts data for batch requests that have been sent successfully", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            batch: true,
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([{ id:1, foo: "foo" }]);
                },
                update: function(options) {
                    options.success([{ id: 1, foo: "baz" }]);
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();

        dataSource.online(true);

        equal(dataSource.get(1).foo, "baz");
    });

    test("sync accepts data for requests that have been sent successfully", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([{ id:1, foo: "foo" }]);
                },
                update: function(options) {
                    options.success({ id: 1, foo: "baz" });
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.online(true);

        equal(dataSource.get(1).foo, "baz");
    });

    test("destroy stores the destroyed items in localStorage when not online", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id : 1 }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.remove(dataSource.get(1));
        dataSource.sync();

        equal(dataSource.offlineData()[0].id, 1);
    });

    test("create stores the creted items in localStorage when not online", function() {
        var dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.online(false);
        dataSource.add({ foo: "foo" });
        dataSource.sync();
        dataSource.read();

        var state = dataSource.offlineData();

        equal(dataSource.at(0).isNew(), true);
    });

    test("online returns true by default", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        equal(dataSource.online(), true);
    });

    test("online(true) returns a promise", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        var result = dataSource.online(true);

        equal(typeof result.then, "function");
    });

    test("online(true) returns a promise", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        var result = dataSource.online(false);

        equal(typeof result.then, "function");
    });

    test("data source stores its data when it syncs", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id: 1, foo: "foo"}
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();

        var state = dataSource.offlineData();

        equal(state[0].foo, "bar");
    });

    test("sync of offline data triggers request start", 1, function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id:1, foo: "foo" }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.bind("requestStart", function(e) {
            equal(e.type, "update");
        });
        dataSource.online(true);
    })

    test("offlineData returns null if offlineStorage isn't enabled", function() {
        var dataSource = new kendo.data.DataSource({});

        equal(dataSource.offlineData(), null);
    });

    test("updating inserted item updates the item", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.online(false);
        dataSource.add( { foo : "foo" });
        dataSource.sync();
        dataSource.at(0).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        equal(dataSource.at(0).foo, "bar");
        equal(dataSource.total(), 1);
    });

    test("synced inserted item remains after cancelChanges", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.online(false);
        dataSource.add( { foo : "foo" });
        dataSource.sync();

        dataSource.cancelChanges(dataSource.at(0));

        equal(dataSource.total(), 1);
    });

    test("cancelChanges of synced inserted item resets it to previous state", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.online(false);
        dataSource.add( { foo : "foo" });
        dataSource.sync();

        dataSource.at(0).set("foo", "bar");
        dataSource.cancelChanges(dataSource.at(0));

        equal(dataSource.at(0).foo, "foo");
    });

    test("cancelChanges removes unsynced inserted item", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.online(false);
        dataSource.add( { foo : "foo" });
        dataSource.sync();

        dataSource.add( { foo : "bar" });
        dataSource.cancelChanges(dataSource.at(1));

        equal(dataSource.total(), 1);
        equal(dataSource.at(0).foo, "foo");
    });

    test("read resolves promise when pushing data to offline storage", function() {
        var dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        dataSource.online(false);
        dataSource.read()
            .then(function() {
                ok(true);
            });
    });
}());
