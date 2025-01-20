import '@progress/kendo-ui/src/kendo.data.js';
import { asyncTest } from '../../../helpers/async-utils.js';

describe("offline support", function() {
    afterEach(function() {
        localStorage.removeItem("key");
    });

    let DataSource = kendo.data.DataSource;

    it("state stores in localStorage under specified key", function() {
        let dataSource = new DataSource({
            offlineStorage: "key"
        });

        let state = { foo: "foo" };

        dataSource.offlineData(state);

        assert.equal(localStorage.getItem("key"), '{"foo":"foo"}');
    });

    it("state returns item in localStorage under the specified key", function() {
        let dataSource = new DataSource({
            offlineStorage: "key"
        });

        localStorage.setItem("key", kendo.stringify({ foo: "foo" }));

        let state = dataSource.offlineData();

        assert.equal(state.foo, "foo");
    });

    asyncTest("changes are persisted when online", function(done) {
        let dataSource = new DataSource({
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

        setTimeout(() => {
            dataSource.online(false);
            dataSource.read();

            done(() => assert.equal(dataSource.at(0).foo, "bar"));
        });
    });

    it("deleted items are synced correctly when online", function() {
        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "foo",
                    fields: {}
                }
            },
            data: [
                { id: 1, foo: "foo" }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.remove(dataSource.at(0));
        dataSource.sync();
        dataSource.read();
        dataSource.read();

        assert.equal(dataSource._destroyed.length, 1);
    });

    it("scheduling the same item for delete twice works correctly", function() {
        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "foo",
                    fields: {}
                }
            },
            data: [
                { id: 1, foo: "foo" }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        let model = dataSource.at(0);
        dataSource.remove(model);
        dataSource.remove(model);

        assert.equal(dataSource._destroyed.length, 1);
    });

    it("replaced data is stored offline", function() {
        let dataSource = new DataSource({
            offlineStorage: "key"
        });

        dataSource.data([{ foo: "foo" }]);
        dataSource.online(false);
        dataSource.read();

        assert.equal(dataSource.at(0).foo, "foo");
    });

    it("parses dates in offline data", function() {
        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    fields: {
                        foo: { type: "date" }
                    }
                }
            }
        });

        let date = new Date();

        dataSource.data([{ foo: date }]);
        dataSource.online(false);
        dataSource.read();

        assert.equal(dataSource.at(0).foo.getTime(), date.getTime());
    });

    it("state uses custom storage to save", function() {
        let state = {};

        let dataSource = new DataSource({
            offlineStorage: {
                setItem: function(data) {
                    assert.strictEqual(state, data);
                }
            }
        });

        dataSource.offlineData(state);
    });

    it("state returns empty array if localStorage doesn't contain an item for the specified key", function() {
        let dataSource = new DataSource({
            offlineStorage: "key"
        });

        let state = dataSource.offlineData();

        assert.equal(kendo.stringify(state), "[]");
    });

    it("data is stored in state", function() {
        let data = [{ foo: "foo" }];

        let dataSource = new DataSource({
            offlineStorage: "key",
            data: data
        });

        dataSource.read();

        assert.equal(dataSource.offlineData().length, data.length);
        assert.equal(dataSource.offlineData()[0].foo, data[0].foo);
    });

    it("state is passed via the reader serialize prior to saving", function() {
        let state = [{ foo: "foo" }];

        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                serialize: function(data) {
                    assert.strictEqual(state, data);
                }
            }
        });

        dataSource.offlineData(state);
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

    it("server grouped data is stored in state", function() {
        let data = [{ items: [{ foo: "foo" }], field: "foo", value: "foo" }];

        let dataSource = serverGroupedDataSource(data);

        dataSource.read();

        assert.equal(dataSource.offlineData().length, 1);
        assert.equal(dataSource.offlineData()[0].items.length, 1);
        assert.equal(dataSource.offlineData()[0].field, "foo");
    });

    it("data returns data stored in state when offline", function() {
        let data = [{ foo: "foo" }];

        let dataSource = new DataSource({
            offlineStorage: "key"
        });

        dataSource.offlineData(data);
        dataSource.online(false);
        dataSource.read();

        assert.deepEqual(dataSource.data().length, 1);
    });

    it("data returns data stored in state when offline and server grouped", function() {
        let data = [{ items: [{ foo: "foo" }], field: "foo", value: "foo" }];

        let dataSource = serverGroupedDataSource(data);

        dataSource.offlineData(data);
        dataSource.online(false);
        dataSource.read();

        assert.equal(dataSource.data().length, 1);
        assert.equal(dataSource.data()[0].items.length, 1);
        assert.equal(dataSource.data()[0].field, "foo");
    });

    it("updated items are stored in localStorage when not online and server grouped", function() {
        let data = [{ hasSubgroups: false, items: [{ id: 1, foo: "foo" }], field: "foo", value: "foo" }];

        let dataSource = serverGroupedDataSource(data);

        dataSource.read();

        dataSource.online(false);
        dataSource.get(1).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        assert.equal(dataSource.get(1).dirty, true);
        assert.equal(dataSource.get(1).foo, "bar");
    });

    it("destroyed items are stored in localStorage when not online and server grouped", function() {
        let data = [{ hasSubgroups: false, items: [{ id: 1, foo: "foo" }], field: "foo", value: "foo" }];

        let dataSource = serverGroupedDataSource(data);

        dataSource.read();

        dataSource.online(false);
        dataSource.remove(dataSource.get(1));
        dataSource.sync();
        dataSource.read();

        assert.equal(dataSource._destroyed[0].id, 1);
    });


    it("updated items are stored in localStorage when not online and nested server groups", function() {
        let data = [
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

        let dataSource = new DataSource({
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

        assert.equal(dataSource.get(1).dirty, true);
        assert.equal(dataSource.get(1).foo, "bar");
    });

    it("updated items are stored in localStorage when not online", function() {
        let dataSource = new DataSource({
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

        assert.equal(dataSource.get(1).dirty, true);
        assert.equal(dataSource.get(1).foo, "bar");
    });

    it("sync sends all pending update requests to transport", function() {
        let dataSource = new DataSource({
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
                    assert.equal(options.data.foo, "bar");
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

    it("sync sends all pending batch update requests to transport", function() {
        let dataSource = new DataSource({
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
                    assert.equal(options.data.models.length, 2);
                    assert.equal(options.data.models[0].foo, "bar");
                    assert.equal(options.data.models[1].foo, "baz");
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


    asyncTest("sync accepts data for batch requests that have been sent successfully", function(done) {
        let dataSource = new DataSource({
            offlineStorage: "key",
            batch: true,
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([{ id: 1, foo: "foo" }]);
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

        setTimeout(() => {
            done(() => assert.equal(dataSource.get(1).foo, "baz"));
        });
    });

    asyncTest("sync accepts data for requests that have been sent successfully", function(done) {
        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([{ id: 1, foo: "foo" }]);
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

        setTimeout(() => {
            done(() => assert.equal(dataSource.get(1).foo, "baz"));
        });
    });

    it("destroy stores the destroyed items in localStorage when not online", function() {
        let dataSource = new DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            data: [
                { id: 1 }
            ]
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.remove(dataSource.get(1));
        dataSource.sync();

        assert.equal(dataSource.offlineData()[0].id, 1);
    });

    it("create stores the creted items in localStorage when not online", function() {
        let dataSource = new DataSource({
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

        let state = dataSource.offlineData();

        assert.equal(dataSource.at(0).isNew(), true);
    });

    it("online returns true by default", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        assert.equal(dataSource.online(), true);
    });

    it("online(true) returns a promise", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        let result = dataSource.online(true);

        assert.equal(typeof result.then, "function");
    });

    it("online(true) returns a promise", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        let result = dataSource.online(false);

        assert.equal(typeof result.then, "function");
    });

    it("data source stores its data when it syncs", function() {
        let dataSource = new kendo.data.DataSource({
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

        let state = dataSource.offlineData();

        assert.equal(state[0].foo, "bar");
    });

    it("sync of offline data triggers request start", function() {
        let dataSource = new kendo.data.DataSource({
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
        dataSource.bind("requestStart", function(e) {
            assert.equal(e.type, "update");
        });
        dataSource.online(true);
    });

    it("offlineData returns null if offlineStorage isn't enabled", function() {
        let dataSource = new kendo.data.DataSource({});

        assert.equal(dataSource.offlineData(), null);
    });

    it("updating inserted item updates the item", function() {
        let dataSource = new kendo.data.DataSource({
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
        dataSource.at(0).set("foo", "bar");
        dataSource.sync();
        dataSource.read();

        assert.equal(dataSource.at(0).foo, "bar");
        assert.equal(dataSource.total(), 1);
    });

    it("synced inserted item remains after cancelChanges - with projection", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            data: [{ Foo: "baz", id: 1 }],
            schema: {
                model: {
                    id: "id",
                    fields: {
                        foo: { from: "Foo" }
                    }
                }
            }
        });

        dataSource.read();

        dataSource.online(false);

        dataSource.add({ foo: "foo" });
        dataSource.sync();

        dataSource.cancelChanges();

        assert.equal(dataSource.total(), 2);
        assert.equal(dataSource.at(1).foo, "foo");
    });

    it("synced updated item remains after cancelChanges - with projection", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            transport: {
                read: function(options) {
                    options.success({ Data: [{ Foo: "bar", id: 1 }] });
                },
                updates: function(options) {
                    options.success();
                }
            },
            schema: {
                data: "Data",
                model: {
                    id: "id",
                    fields: {
                        foo: { from: "Foo" }
                    }
                }
            }
        });

        dataSource.read();

        dataSource.online(false);

        dataSource.at(0).set("foo", "baz");
        dataSource.sync();

        dataSource.cancelChanges(dataSource.at(0));

        assert.equal(dataSource.data().length, 1);
        assert.equal(dataSource.at(0).foo, "baz");
    });

    it("synced inserted item remains after cancelChanges", function() {
        let dataSource = new kendo.data.DataSource({
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

        dataSource.cancelChanges(dataSource.at(0));

        assert.equal(dataSource.total(), 1);
    });

    asyncTest("synced deleted item stays deleted after cancelChanges", function(done) {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        { id: 1 }
                    ]);
                },
                destroy: function(options) {
                    options.success();
                }
            }
        });

        dataSource.read();
        dataSource.remove(dataSource.at(0));
        dataSource.sync();

        setTimeout(() => {
            dataSource.cancelChanges();

            done(() => assert.equal(dataSource.data().length, 0));
        });
    });

    it("cancelChanges of synced inserted item resets it to previous state", function() {
        let dataSource = new kendo.data.DataSource({
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

        dataSource.at(0).set("foo", "bar");
        dataSource.cancelChanges(dataSource.at(0));

        assert.equal(dataSource.at(0).foo, "foo");
    });

    it("cancelChanges removes unsynced inserted item", function() {
        let dataSource = new kendo.data.DataSource({
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

        dataSource.add({ foo: "bar" });
        dataSource.cancelChanges(dataSource.at(1));

        assert.equal(dataSource.total(), 1);
        assert.equal(dataSource.at(0).foo, "foo");
    });

    it("cancelChanges reverts item state after read is called", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        {
                            id: 1,
                            name: "foo"
                        }
                    ]);
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        dataSource.read();
        let model = dataSource.get(1);
        model.set("name", "bar");
        dataSource.cancelChanges(model);

        assert.equal(dataSource.data().length, 1);
    });

    it("cancelChanges does not revert item state after sync is called", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        {
                            id: 1,
                            name: "foo"
                        }
                    ]);
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        let model = dataSource.get(1);
        model.set("name", "bar");
        dataSource.sync();
        dataSource.cancelChanges();

        assert.equal(dataSource.data().length, 1);
        assert.equal(dataSource.at(0).name, "bar");
        assert.isOk(dataSource.at(0).dirty);
    });

    it("cancelChanges for a single record does not revert item state after sync is called", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    id: "id"
                }
            },
            transport: {
                read: function(options) {
                    options.success([
                        {
                            id: 1,
                            name: "foo"
                        }
                    ]);
                }
            }
        });

        dataSource.read();
        dataSource.online(false);
        let model = dataSource.get(1);
        model.set("name", "bar");
        dataSource.sync();
        dataSource.cancelChanges(model);

        assert.equal(dataSource.data().length, 1);
        assert.equal(dataSource.at(0).name, "bar");
        assert.isOk(dataSource.at(0).dirty);
    });

    asyncTest("read resolves promise when pushing data to offline storage", function(done) {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key"
        });

        dataSource.online(false);
        dataSource.read()
            .then(function() {
                done(() => assert.isOk(true));
            });
    });

    it("read empty offline datasource does not add phantom item", function() {
        let dataSource = new kendo.data.DataSource({
            offlineStorage: "key",
            schema: {
                model: {
                    fields: {
                        foo: {}
                    }
                }
            }
        });

        dataSource.online(false);
        dataSource.fetch();

        assert.equal(dataSource.data().length, 0);
    });

});
