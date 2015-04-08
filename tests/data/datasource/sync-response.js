(function() {

var Model = kendo.data.Model;
var DataSource = kendo.data.DataSource;
var dataSource;

function setup(options) {
    dataSource = new DataSource($.extend(true, {
        data: [ { id: 1, foo: "foo" }, { id: 2, foo: "foo2" }  ],
        schema: {
            model: $.extend({}, Model, { id: "id" })
        }
    }, options));

    dataSource.read();
}

function stubTransport(method, data) {
    var obj = {};
    data = data !== undefined ? data : [ { id: 1, foo: "bar" } ];
    obj[method] = function(options) {
        options.success($.isFunction(data) ? data() : data);
    }

    stub(dataSource.transport, obj);
}

module("data source sync response", {
    setup: function() {
        setup();
    }
});

test("sync updates the fields of created model from array server response", function() {
    stubTransport("create");

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(model.id, 1);
    equal(model.get("foo"), "bar");
});

test("sync updates the fields of updated model from array server response", function() {
    stubTransport("update");

    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(model.get("foo"), "bar");
});

test("sync updates data from server response", function() {
    stubTransport("update");

    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(dataSource.data()[0].foo, "bar");
});

test("sync updates data if server response without content", function() {
    dataSource = new DataSource({
        schema: {
            model: {
                id: "id"
            },
            data: "d.d"
        },
        transport: {
            read: function(options) {
                options.success({ d: { d: [{ id: 1, foo: "foo" }] } });
            },
            update: function(options) {
                options.success(null);
            }
        }
    });

    dataSource.read();
    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(dataSource.data()[0].foo, "bar");
});

test("sync updates pristine data if server response is empty object", function() {
    dataSource = new DataSource({
        schema: {
            model: {
                id: "id",
                fields: {
                    foo: { type: "string" }
                }
            }
        },
        transport: {
            read: function(options) {
                options.success([{id: 1, foo: "bar"}]);
            },
            update: function(options) {
                options.success({});
            }
        }
    });

    dataSource.read();
    var model = dataSource.get(1);
    model.set("foo", "car");
    dataSource.sync();

    equal(dataSource._pristineData[0].foo, "car");
});

test("sync updates pristine data for array property", function() {
    dataSource = new DataSource({
        schema: {
            model: {
                id: "id",
                fields: {
                    foo: {
                        type: "object",
                        defaultValue: []
                    }
                }
            }
        },
        transport: {
            read: function(options) {
                options.success([{id: 1, foo: [{bar: 1}, {bar: 2}]}]);
            },
            update: function(options) {
                options.success(null);
            }
        }
    });

    dataSource.read();
    var model = dataSource.get(1);
    model.set("foo", [{bar:1}]);
    dataSource.sync();

    equal(dataSource.data()[0].foo.length, 1);
    equal(dataSource._pristineData[0].foo.length, 1);
});

test("sync updates the fields of created model from single object server response", function() {
    stubTransport("create", { id: 1, foo: "foo" } );

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(model.id, 1);
    equal(model.get("foo"), "foo");
});

test("sync updates the fields of updated model from single object server response", function() {
    stubTransport("update", { id: 1, foo: "bar" } );

    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(model.id, 1);
    equal(model.get("foo"), "bar");
});

test("sync merges created model data with server response", function() {
    stubTransport("create", { id: 1 } );

    var model = new Model({ foo: "foo" });
    dataSource.add(model);
    dataSource.sync();

    equal(model.id, 1);
    equal(model.get("foo"), "foo");
});

test("sync merges updated model data with server response", function() {
    stubTransport("update", { id: 1 } );

    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(model.id, 1);
    equal(model.get("foo"), "bar");
});

test("sync updates created model when response is empty", function() {
    stubTransport("create", null );

    var model = dataSource.add({ foo: "foo" });
    dataSource.sync();

    equal(model.get("foo"), "foo");
    equal(model.dirty, false);
});

test("sync updates the state of updated model when response is empty", function() {
    stubTransport("update", null );

    var model = dataSource.get(1);
    model.set("foo", "bar");
    dataSource.sync();

    equal(model.get("foo"), "bar");
    equal(model.dirty, false);
    equal(dataSource._pristineData[0].foo, "bar");
});

test("sync updates all created models with server response", function() {
    var response = [{id:1, foo: "foo"} , {id:2, foo: "bar"}];

    stubTransport("create", function() { return [response.shift()]; });

    var model1 = new Model();
    dataSource.add(model1);

    var model2 = new Model();
    dataSource.add(model2);
    dataSource.sync();

    equal(model1.id, 1);
    equal(model1.get("foo"), "foo");
    equal(model2.id, 2);
    equal(model2.get("foo"), "bar");
});

test("sync updates all updated models with server response", function() {
    var response = [{id:1, foo: "bar"} , {id:2, foo: "baz"}];

    stubTransport("update", function() { return [response.shift()]; });

    var model1 = dataSource.get(1);

    model1.set("foo", "bar" );

    var model2 = dataSource.get(2);

    model2.set("foo", "baz");

    dataSource.sync();

    equal(model1.get("foo"), "bar");
    equal(model2.get("foo"), "baz");
});

test("sync updates all created models with server response when batch is true and incomplete response", function() {
    setup({ batch: true });

    stubTransport("create", [{id:1, foo: "bar"} , {id:2, foo: "baz"}]);

    var model1 = new Model();
    dataSource.add(model1);

    var model2 = new Model();
    dataSource.add(model2);
    dataSource.sync();

    equal(model1.id, 1);
    equal(model1.get("foo"), "bar");
    equal(model2.isNew(), false);
    equal(model2.dirty, false);
});

test("sync updates all created models with server response when batch is true", function() {
    setup({ batch: true });

    stubTransport("create", [{ id:1, foo: "foo" }, { id:2 , foo: "bar" }]);

    var model1 = new Model();
    dataSource.add(model1);

    var model2 = new Model();
    dataSource.add(model2);
    dataSource.sync();

    equal(model1.id, 1);
    equal(model1.get("foo"), "foo");
    equal(model2.id, 2);
    equal(model2.get("foo"), "bar");
});

test("sync updates all updated models with server response when batch is true", function() {
    setup({ batch: true });

    stubTransport("update", [{ id:1, foo: "baz" }, { id:2 , foo: "bar" }]);

    var model1 = dataSource.get(1);

    model1.set("foo", "baz");

    var model2 = dataSource.get(2);

    model2.set("foo", "bar");
    dataSource.sync();

    equal(model1.get("foo"), "baz");
    equal(model2.get("foo"), "bar");
});

test("created models are no longer new after sync", function() {
    stubTransport("create");

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(model.isNew(), false);
});

test("created model has no changes after sync", function() {
    stubTransport("create");

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(model.dirty, false);
});

test("updated model has no changes after sync", function() {
    stubTransport("update");

    var model1 = dataSource.get(1);

    model1.set("foo", "foo");

    dataSource.sync();

    equal(model1.dirty, false);
});

test("sync clears destroyed models", function() {
    stubTransport("destroy");
    var model = dataSource.get(1);

    dataSource.remove(model);
    dataSource.sync();

    dataSource.sync();

    equal(dataSource.transport.calls("destroy"), 1);
});

test("sync uses the parse method of the reader", function() {
    var reader = stub(dataSource.reader, {
        parse: function() {
            return [{id:1}];
        },
        data: function(result) {
            return result;
        }
    });

    stubTransport("create");

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(reader.calls("parse"), 1);
    equal(model.id, 1);
});

test("sync uses the data method of the reader", function() {
    var reader = stub(dataSource.reader, {
        parse: function(result) {
            return [{id:1}];
        },
        data: function(result) {
            return [{id:1}];
        }
    });

    stubTransport("create");

    var model = new Model();
    dataSource.add(model);
    dataSource.sync();

    equal(reader.calls("parse"), 1);
    equal(model.id, 1);
});

test("sync raises requestEnd event", 2, function() {
    stubTransport("destroy", { foo: "bar" });

    dataSource.remove(dataSource.get(1));

    dataSource.bind("requestEnd", function(e) {
        deepEqual(e.response, { foo: "bar" });
        deepEqual(e.type, "destroy");
    });

    dataSource.sync();
});


test("sync raises change event after delete", 1, function() {
    stubTransport("destroy");

    dataSource.remove(dataSource.get(1));

    dataSource.bind("change", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync raises sync event after delete attached through the constructor", 1, function() {
    setup({
        sync: function() {
            ok(true);
        }
    });

    stubTransport("destroy");

    dataSource.remove(dataSource.get(1));

    dataSource.sync();
});

test("sync raises sync event after delete", 1, function() {
    stubTransport("destroy");

    dataSource.remove(dataSource.get(1));

    dataSource.bind("sync", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync raises sync event after update attached through the constructor", 1, function() {
    setup({
        sync: function() {
            ok(true);
        }
    });

    stubTransport("update");

    dataSource.get(1).set("foo", "bar");

    dataSource.sync();
});

test("sync raises sync event after update", 1, function() {

    stubTransport("update");

    dataSource.get(1).set("foo", "bar");

    dataSource.bind("sync", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync raises sync event after create attached through the constructor", 1, function() {
    setup({
        sync: function() {
            ok(true);
        }
    });

    stubTransport("create");

    dataSource.add({});

    dataSource.sync();
});

test("sync raises sync event after create", 1, function() {

    stubTransport("create");
    dataSource.add({});

    dataSource.bind("sync", function() {
        ok(true);
    });

    dataSource.sync();
});
test("sync raises change event after create", 1, function() {
    stubTransport("create");

    var model = new Model();
    dataSource.add(model);

    dataSource.bind("change", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync raises change event after update", 1, function() {
    stubTransport("update", [{ foo: "moo" }]);

    dataSource.get(1).set("foo", "moo");

    dataSource.bind("change", function() {
        ok(true);
    });

    dataSource.sync();
});

test("get returns new models after sync", function() {
    stubTransport("create", [{ id: 3, foo: "moo" }]);

    dataSource.add({});
    dataSource.sync();

    equal(dataSource.get(3).get("id"), 3);
});

test("cancelChanges does not remove the added models after sync", function() {
    stubTransport("create", [{ id: 3, foo: "moo" }]);

    dataSource.add({});
    dataSource.sync();

    dataSource.cancelChanges();

    ok(dataSource.get(3));
});

test("cancelChanges does not remove the added models after sync", function() {
    stubTransport("create", [{ id: 3, foo: "moo" }]);

    dataSource.add({});
    dataSource.sync();

    dataSource.cancelChanges();

    ok(dataSource.get(3));
});

test("cancelChanges does not revert the updated models after sync when Model has fields defined", function() {
    setup({
        schema: {
            model: {
                fields: {
                    foo: "foo"
                }
            }
        }
    });

    stubTransport("create", [{ id: 42, foo: "moo" }]);

    dataSource.add();

    dataSource.sync();

    dataSource.cancelChanges();

    equal(dataSource.get(42).foo, "moo");
});

test("cancelChanges does not revert the deleted models after sync", function() {
    stubTransport("destroy", [{ id: 2, foo: "moo" }]);

    dataSource.remove(dataSource.get(2));
    dataSource.sync();

    dataSource.cancelChanges();

    ok(!dataSource.get(2));
});

test("sync response data as array is converted if model types are set", function() {
    setup({
        data: [ { id: 1, foo: "1" } ],
        schema: { model: { id: "id", fields: { foo: { type: "number" } } } }
    });
    stubTransport("create", [{ id: 3, foo: "2" }]);

    dataSource.add({});
    dataSource.sync();

    strictEqual(dataSource.get(3).get("foo"), 2);
});

test("sync response data as object is converted if model types are set", function() {
    setup({
        data: [ { id: 1, foo: "1" } ],
        schema: { model: { id: "id", fields: { foo: { type: "number" } } } }
    });
    stubTransport("create", { id: 3, foo: "2" });

    dataSource.add({});
    dataSource.sync();

    strictEqual(dataSource.get(3).get("foo"), 2);
});

test("destroy sync null response", 1, function() {
    setup({
        transport: {
            read: function(options) {
                options.success({ d:[ { id: 1, foo: "foo" }, { id: 2, foo: "foo2" }  ]});
            }
        },
        schema: { data: "d", model: { id: "id", fields: { foo: { type: "string" } } } }
    });
    stubTransport("destroy", { d: null });

    dataSource.remove(dataSource.get(1));

    dataSource.sync();
    equal(dataSource.data().length, 1);
});

test("deleted items are not synced after changes are reverted", 1, function() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: function(options) {
                options.success([{id: 1, foo: "bar"}]);
            },
            destroy: function(options) {
                ok(false);
            }
        }
    });
    dataSource.read();

    dataSource.remove(dataSource.at(0));

    dataSource.cancelChanges();
    dataSource.sync();
    ok(!dataSource._destroyed.length);
});

test("deleted items are synced after other record changes are reverted", 2, function() {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: function(options) {
                options.success([{id: 1, foo: "bar"},{id: 2, foo: "baz"}]);
            },
            destroy: function(options) {
                ok(true);
            }
        },
        schema: { model: { id: "id" } }
    });
    dataSource.read();

    dataSource.remove(dataSource.at(0));

    dataSource.cancelChanges(dataSource.get(2));
    dataSource.sync();
    equal(dataSource._destroyed.length, 1);
});

test("error event is raised if custom errors are returned", 1, function() {
    setup({
        data: [ { id: 1, foo: "1" } ],
        schema: { model: { id: "id", fields: { foo: { type: "number" } } } }
    });
    stubTransport("create", { errors: "error" });

    dataSource.add({});

    dataSource.bind("error", function(e) {
        equal(e.errors, "error");
    });

    dataSource.sync();
});

test("sync updates the pristine data with server grouping", 4, function() {
    dataSource = new DataSource({
        schema: {
            model: { id: "id" },
            total: function() {
                return 1;
            }
        },
        batch: true,
        serverGrouping: true,
        group: { field: "foo" }
    });

    stubTransport("update", [{ foo: "moo" }]);
    stubTransport("read", [{ items: [{ foo: 1, id: 0}, { foo: 2, id: 1}], field: "foo", value: "bar" },
        { items: [{ foo: 3, id: 2}, { foo: 4, id: 3}], field: "foo", value: "baz" }]);

    dataSource.read();

    dataSource.get(0).set("foo", "moo");

    dataSource.sync();
    equal(dataSource._pristineData[0].items[0].foo, "moo");
    equal(dataSource._pristineData[0].items[1].foo, 2);
    equal(dataSource._pristineData[1].items[0].foo, 3);
    equal(dataSource._pristineData[1].items[1].foo, 4);
});

test("sync update the pristine data with created items if server grouping", 6, function() {
    dataSource = new DataSource({
        schema: {
            model: { id: "id" },
            total: function() {
                return 1;
            }
        },
        batch: true,
        serverGrouping: true,
        group: { field: "foo" }
    });

    stubTransport("create", [{ foo: "moo" }]);
    stubTransport("read", [{ items: [{ foo: 1, id: 0}, { foo: 2, id: 1}], field: "foo", value: "bar" },
        { items: [{ foo: 3, id: 2}, { foo: 4, id: 3}], field: "foo", value: "baz" }]);

    dataSource.read();

    dataSource.add({});

    dataSource.sync();
    equal(dataSource.data().length, 3);

    equal(dataSource._pristineData[0].items[0].foo, 1);
    equal(dataSource._pristineData[0].items[1].foo, 2);
    equal(dataSource._pristineData[1].items[0].foo, 3);
    equal(dataSource._pristineData[1].items[1].foo, 4);
    equal(dataSource._pristineData[2].items[0].foo, "moo");
});

test("nested object are observable after sync", 2, function() {
    setup({
        data: [ { id: 1, obj: { foo: "bar" } } ]
    });

    stubTransport("update", null);
    var initial = dataSource.get(1);
    initial.set("obj", { foo: "baz" });

    dataSource.sync();

    ok(dataSource.get(1).obj instanceof kendo.data.ObservableObject);
    equal(dataSource.get(1).uid, initial.uid);
});

test("sync updates the pristine data with plain objects", function() {
    dataSource = new DataSource({
        schema: {
            model: {
                id: "id"
            }
        }
    });
    dataSource.insert(0, {});

    dataSource.sync();

    equal(dataSource._pristineData[0] instanceof kendo.data.ObservableObject, false);
});

test("sync model custom field mapping is persisted after sync with empty response", function() {
    setup({
        data: [ { id: 1, foo: "bar" } ],
        schema: {
            model: {
                fields: {
                    baz: "foo"
                }
            }
        }
    });
    stubTransport("update", null);
    var initial = dataSource.get(1);
    initial.set("baz", "foo" );

    dataSource.sync();

    ok(!("foo" in dataSource.get(1)));
    equal(dataSource.get(1).baz, "foo");
});

test("sync submit promises are rejected on success", 1, function() {
    setup({
        batch: true,
        data: [ { id: 1, foo: "bar" } ],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    stub(dataSource.transport, {
        submit: function(options) {
            options.error({});
        }
    });

    var initial = dataSource.get(1);
    initial.set("baz", "foo" );

    dataSource.add({});

    dataSource.bind("error", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync submit promises are resloved on success", 1, function() {
    setup({
        batch: true,
        data: [ { id: 1, foo: "bar" } ],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    stub(dataSource.transport, {
        submit: function(options) {
            options.success([], "update");
            options.success([], "create");
            options.success([], "destroy");
        }
    });

    var initial = dataSource.get(1);
    initial.set("baz", "foo" );

    dataSource.add({});

    dataSource.bind("sync", function() {
        ok(true);
    });

    dataSource.sync();
});

test("sync submit applies server changes to correct items", 5, function() {
    setup({
        batch: true,
        data: [ { id: 1, foo: "bar" }, { id: 2, foo: "boo" }  ],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    stub(dataSource.transport, {
        submit: function(options) {
            options.success([{ id: 1, foo: "baz"} ], "update");
            options.success([{ id: 3, foo: "created" } ], "create");
            options.success(null, "destroy");
        }
    });

    var initial = dataSource.get(1);

    initial.set("foo", "foo" );

    dataSource.remove(dataSource.get(2));

    dataSource.add({});

    dataSource.sync();

    ok(!dataSource.hasChanges());

    equal(dataSource.get(1).foo, "baz");
    equal(dataSource.get(3).foo, "created");
    ok(dataSource.get(2) === undefined);
    equal(dataSource.data().length, 2);
});

test("sync submit changes are accepted with no server response", 5, function() {
    setup({
        batch: true,
        data: [ { id: 1, foo: "bar" }, { id: 2, foo: "boo" }  ],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    stub(dataSource.transport, {
        submit: function(options) {
            options.success([], "update");
            options.success({ id: 3 }, "create");
            options.success(null, "destroy");
        }
    });

    var initial = dataSource.get(1);

    initial.set("foo", "foo" );

    dataSource.remove(dataSource.get(2));

    dataSource.add({});

    dataSource.sync();

    ok(!dataSource.hasChanges());

    equal(dataSource.get(1).foo, "foo");
    ok(dataSource.get(3) !== undefined);
    ok(dataSource.get(2) === undefined);
    equal(dataSource.data().length, 2);
});

}());
