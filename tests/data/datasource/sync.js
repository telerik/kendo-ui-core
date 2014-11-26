(function(){

var Model = kendo.data.Model;
var DataSource = kendo.data.DataSource;
var dataSource;

function setup(options) {
    dataSource = new DataSource($.extend({
        data: [{ id: 1, foo: "foo" }],
        schema: {
            model: $.extend({}, Model, { id: "id" })
        }
    }, options));

    dataSource.read();
}

module("data source sync", {
    setup: function() {
        setup();
    }
});

test("change is raised after new model is added to the set", 1, function() {
    dataSource.bind("change", function(e) {
        equal(e.action, "add");
    });

    dataSource.add({});
});

test("change is raised after model is deleted from the set", 1, function() {
    dataSource.bind("change", function(e) {
        equal(e.action, "remove");
    });

    dataSource.remove(dataSource.get(1));
});

test("data is processed after model changes are reverted", 2, function() {
    dataSource.filter({ field: "id", operator: "ge", value: 1 });

    dataSource.add({ id: 3 });

    dataSource.bind("change", function() {
        equal(dataSource.view().length, 1);
        equal(dataSource.view()[0].id, 1);
    });

    dataSource.cancelChanges();
});

test("data is processed after model is added", function() {
    dataSource.filter({ field: "id", operator: "ge", value: 1 });

    dataSource.bind("change", function() {
        equal(dataSource.view().length, 2);
        equal(dataSource.view()[1].id, 3);
    });

    dataSource.add({ id: 3 });
});

test("add syncs when autoSync is true", function() {
    setup({ autoSync: true });

    stub(dataSource, "sync");

    dataSource.add({ foo: "bar" });

    equal(dataSource.calls("sync"), 1);
});

test("remove syncs when autoSync is true", function() {
    setup({ autoSync: true });
    stub(dataSource, "sync");
    dataSource.remove(dataSource.get(1));

    equal(dataSource.calls("sync"), 1);
});

test("update syncs when autoSync is true", function() {
    setup({ autoSync: true });
    stub(dataSource, "sync");

    dataSource.get(1).set("foo", "moo");

    equal(dataSource.calls("sync"), 1);
});

test("add does not sync when autoSync is false", function() {
    stub(dataSource, "sync");
    dataSource.add({ foo: "bar" });

    equal(dataSource.calls("sync"), 0);
});

test("remove does not sync when autoSync is false", function() {
    stub(dataSource, "sync");

    dataSource.remove(dataSource.get(1));

    equal(dataSource.calls("sync"), 0);
});

test("sync calls the create method of the transport", function() {
    stub(dataSource.transport, "create");

    dataSource.add(new Model( { foo: "bar" }));
    dataSource.sync();

    equal(dataSource.transport.calls("create"), 1);
});

test("sync does not call the create method of the transport if there are no new models", function() {
    stub(dataSource.transport, "create");

    dataSource.sync();

    equal(dataSource.transport.calls("create"), 0);
});

test("sync sends the data of the created model to the create method of the transport", function() {
    stub(dataSource.transport, "create");

    dataSource.add(new Model( { foo: "bar" }));
    dataSource.sync();

    equal(dataSource.transport.args("create")[0].data.foo, "bar");
});

test("sync sends the data of all created models to the create method of the transport", function() {
    stub(dataSource.transport, "create");

    dataSource.add(new Model( { foo: "bar" }));
    dataSource.add(new Model( { foo: "baz" }));
    dataSource.sync();

    equal(dataSource.transport.calls("create"), 2);
    equal(dataSource.transport.args("create", 0)[0].data.foo, "bar");
    equal(dataSource.transport.args("create", 1)[0].data.foo, "baz");
});

test("sync calls the update method of the transport if there are updated models", function() {
    stub(dataSource.transport, "update");

    var model = dataSource.get(1);

    model.set("foo", "bar");
    dataSource.sync();

    equal(dataSource.transport.calls("update"), 1);
});

test("sync does not call the update method of the transport if there are no updated models", function() {
    stub(dataSource.transport, "update");

    dataSource.sync();

    equal(dataSource.transport.calls("update"), 0);
});

test("sync sends all updated models to the create method of the transport", function() {
    setup({ data: [ { id:1 }, { id: 2}] });

    stub(dataSource.transport, "update");

    var model = dataSource.get(1);
    model.set("foo", "bar");
    model = dataSource.get(2);
    model.set("foo", "baz");
    dataSource.sync();

    equal(dataSource.transport.calls("update"), 2);
    equal(dataSource.transport.args("update", 0)[0].data.foo, "bar");
    equal(dataSource.transport.args("update", 0)[0].data.id, 1);
    equal(dataSource.transport.args("update", 1)[0].data.id, 2);
    equal(dataSource.transport.args("update", 1)[0].data.foo, "baz");
});

test("sync calls the destroy method of the transport if there are destroyed models", function() {
    stub(dataSource.transport, "destroy");

    var model = dataSource.get(1);
    dataSource.remove(model);
    dataSource.sync();

    equal(dataSource.transport.calls("destroy"), 1);
});

test("sync calls schange after destroy", function() {
    var model = dataSource.get(1),
        wasCalled = false;

    dataSource.remove(model);
    dataSource.bind("change", function() {
        wasCalled = true;
    });
    dataSource.sync();

    ok(wasCalled);
});

test("sync does not call the destroy method of the transport if a new model is destroyed", function() {
    stub(dataSource.transport, "destroy");

    var model = new Model();
    dataSource.add(model);
    dataSource.remove(model);
    dataSource.sync();

    equal(dataSource.transport.calls("destroy"), 0);
});

test("sync sends all destroyed models to the destroy method of the transport", function() {
    setup({ data: [ { id:1 }, { id: 2}] });
    stub(dataSource.transport, "destroy");

    var model = dataSource.get(1);
    dataSource.remove(model);
    model = dataSource.get(2);
    dataSource.remove(model);
    dataSource.sync();

    equal(dataSource.transport.calls("destroy"), 2);
    equal(dataSource.transport.args("destroy", 0)[0].data.id, 1);
    equal(dataSource.transport.args("destroy", 1)[0].data.id, 2);
});

test("sync does not send the automatically generated id of new models", function() {
    stub(dataSource.transport, "create");

    var model = new Model();
    model.set("foo", "bar");
    dataSource.add(model);
    dataSource.sync();

    equal(dataSource.transport.args("create", 0)[0].data.uid, undefined);
});

test("sync does not send the automatically generated id of updated models", function() {
    stub(dataSource.transport, "update");

    dataSource.get(1).set("foo", "bar");
    dataSource.sync();

    equal(dataSource.transport.args("update", 0)[0].data.uid, undefined);
});

test("sync does not send the automatically generated id of destroyed models", function() {
    stub(dataSource.transport, "destroy");

    dataSource.remove(dataSource.get(1));
    dataSource.sync();

    equal(dataSource.transport.args("destroy", 0)[0].data.uid, undefined);
});

test("sync calls the create method of the transport only once when batch is true", function() {
    setup({ batch: true });

    stub(dataSource.transport, "create");

    dataSource.add(new Model());
    dataSource.add(new Model());
    dataSource.sync();

    equal(dataSource.transport.calls("create"), 1);
});

test("sync passes array of created models to transport when batch is true", function() {
    setup({ batch: true });

    stub(dataSource.transport, "create");

    dataSource.add(new Model({foo: "foo"}));
    dataSource.add(new Model({foo: "bar"}));
    dataSource.sync();

    var models = dataSource.transport.args("create")[0].data.models;

    ok($.isArray(models));
    equal(models.length, 2);
    equal(models[0].foo, "foo");
    equal(models[1].foo, "bar");
});

test("sync does not send the uid of new models when batch is true", function() {
    setup({ batch: true });

    stub(dataSource.transport, "create");

    dataSource.add(new Model({foo: "bar"}));
    dataSource.sync();

    var models = dataSource.transport.args("create")[0].data.models;

    equal(models[0].uid, undefined);
});

test("sync calls the update method of the transport only once when batch is true", function() {
    setup({ batch: true, data: [ { id: 1 }, { id: 2 }] });

    stub(dataSource.transport, "update");

    var model = dataSource.get(1);
    model.set("foo", "foo");
    model = dataSource.get(2);
    model.set("foo", "bar");
    dataSource.sync();

    equal(dataSource.transport.calls("update"), 1);
});

test("sync passes array of updated models to transport when batch is true", function() {
    setup({ batch: true, data: [ { id: 1 }, { id: 2 }] });

    stub(dataSource.transport, "update");

    var model = dataSource.get(1);
    model.set("foo", "foo");
    model = dataSource.get(2);
    model.set("foo", "bar");
    dataSource.sync();

    var models = dataSource.transport.args("update")[0].data.models;
    ok($.isArray(models));
    equal(models.length, 2);
    equal(models[0].foo, "foo");
    equal(models[1].foo, "bar");
});

test("sync does not send the uid of updated models when batch is true", function() {
    setup({ batch: true });

    stub(dataSource.transport, "update");

    dataSource.get(1).set("foo", "bar");
    dataSource.sync();

    var models = dataSource.transport.args("update")[0].data.models;

    equal(models[0].uid, undefined);
});

test("sync calls the destroy method of the transport only once when batch is true", function() {
    setup({ batch: true, data: [ { id: 1 }, { id: 2 }] });

    stub(dataSource.transport, "destroy");

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));
    dataSource.sync();

    equal(dataSource.transport.calls("destroy"), 1);
});

test("sync passes array of destroyed models to transport when batch is true", function() {
    setup({ batch: true, data: [ { id: 1 }, { id: 2 }] });

    stub(dataSource.transport, "destroy");

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));
    dataSource.sync();


    var models = dataSource.transport.args("destroy")[0].data.models;
    ok($.isArray(models));
    equal(models.length, 2);
    equal(models[0].id, 1);
    equal(models[1].id, 2);
});

test("sync does not send the uid of destroyed models when batch is true", function() {
    setup({ batch: true });

    stub(dataSource.transport, "destroy");

    dataSource.remove(dataSource.get(1));
    dataSource.sync();

    var models = dataSource.transport.args("destroy")[0].data.models;

    equal(models[0].uid, undefined);
});

test("the updated data records are send to the if server grouping is enabled", function() {
    var dataSource = new DataSource({
            schema: {
                model: { id: "id" },
                groups: function(data) {
                    return [{
                        items: [{ foo: 1, id: 0}],
                        field: "foo",
                        value: "bar"
                    }];
                },
                total: function() {
                    return 1;
                }
            },
            batch: true,
            serverGrouping: true,
            group: { field: "foo" }
        });

    stub(dataSource.transport, "update");
    dataSource.read();

    dataSource.get(0).set("foo", 2);
    dataSource.sync();

    var models = dataSource.transport.args("update")[0].data.models;
    equal(models[0].foo, 2);
});

test("the created data records are send to the if server grouping is enabled", function() {
    var dataSource = new DataSource({
            schema: {
                model: { id: "id" },
                groups: function(data) {
                    return [{
                        items: [{ foo: 1, id: 0}],
                        field: "foo",
                        value: "bar"
                    }];
                },
                total: function() {
                    return 1;
                }
            },
            batch: true,
            serverGrouping: true,
            group: { field: "foo" }
        });

    stub(dataSource.transport, "create");
    dataSource.read();

    dataSource.add({ foo: 1 });
    dataSource.sync();

    var models = dataSource.transport.args("create")[0].data.models;
    equal(models[0].foo, 1);
    equal(models.length, 1);
});

test("the destroyed data records are send to the if server grouping is enabled", function() {
    var dataSource = new DataSource({
            schema: {
                model: { id: "id" },
                groups: function(data) {
                    return [{
                        items: [{ foo: 1, id: 0}],
                        field: "foo",
                        value: "bar"
                    }];
                },
                total: function() {
                    return 1;
                }
            },
            batch: true,
            serverGrouping: true,
            group: { field: "foo" }
        });

    stub(dataSource.transport, "destroy");
    dataSource.read();

    dataSource.remove(dataSource.get(0));
    dataSource.sync();

    var models = dataSource.transport.args("destroy")[0].data.models;
    equal(models[0].foo, 1);
    equal(models.length, 1);
});

test("hasChanges returns true if model is updated", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 0, foo: "bar"}]
    });

    dataSource.read();

    dataSource.get(0).set("foo", "baz");

    ok(dataSource.hasChanges());
});

test("hasChanges returns false if no changes are made", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 0, foo: "bar"}]
    });

    dataSource.read();

    ok(!dataSource.hasChanges());
});

test("hasChanges returns true if new model is added", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 0, foo: "bar"}]
    });

    dataSource.read();

    dataSource.add({});

    ok(dataSource.hasChanges());
});

test("hasChanges returns true if record is deleted", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 0, foo: "bar"}]
    });

    dataSource.read();

    dataSource.remove(dataSource.get(0));

    ok(dataSource.hasChanges());
});

test("hasChanges returns true if model is updated on third page", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        pageSize: 1,
        data: [{ id: 0, foo: "bar"}, { id: 1, foo: "bar"}, { id: 2, foo: "bar"}]
    });

    dataSource.read();

    dataSource.at(2).set("foo", "baz");

    ok(dataSource.hasChanges());
});

test("hasChanges returns false if model is not updated with paging enabled", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        pageSize: 1,
        data: [{ id: 0, foo: "bar"}, { id: 1, foo: "bar"}, { id: 2, foo: "bar"}]
    });

    dataSource.read();

    ok(!dataSource.hasChanges());
});

test("requestStart is called for each sync request", 3, function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.bind("requestStart", function() {
        ok(true);
    });

    dataSource.add();

    dataSource.remove(dataSource.get(1));

    dataSource.get(2).set("foo", "moo");

    dataSource.sync();
});

test("requestStart contains request type for create request", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.bind("requestStart", function(e) {
        equal(e.type, "create");
    });

    dataSource.add();

    dataSource.sync();
});

test("requestStart contains request type for read request", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.bind("requestStart", function(e) {
        equal(e.type, "read");
    });

    dataSource.read();
});

test("requestStart contains request type for update request", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.bind("requestStart", function(e) {
        equal(e.type, "update");
    });

    dataSource.get(2).set("foo", "moo");

    dataSource.sync();
});

test("requestStart contains request type for destroy request", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.bind("requestStart", function(e) {
        equal(e.type, "destroy");
    });

    dataSource.remove(dataSource.get(1));

    dataSource.sync();
});

test("total is correct after removing all items", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));

    dataSource.sync();

    equal(dataSource.total(), 0);
});

test("total is correct after removing all items syncing and canceling the changes", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));

    dataSource.sync();
    dataSource.cancelChanges();

    equal(dataSource.total(), 0);
});

test("total is correct after removing all items, syncing adding new one and canceling the changes", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));

    dataSource.sync();

    dataSource.add({});

    dataSource.sync();

    dataSource.cancelChanges();

    equal(dataSource.total(), 1);
});

test("total is updated after removing all items and adding new", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.remove(dataSource.get(1));
    dataSource.remove(dataSource.get(2));

    dataSource.sync();

    dataSource.add({});

    equal(dataSource.total(), 1);
});

test("sync returns promise", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    var promise = dataSource.sync();

    ok($.isFunction(promise.then));
});

test("sync returns promise when offline", 2, function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "id" }
        },
        data: [{ id: 1, foo: "bar"},{ id: 2, foo: "baz"}]
    });

    dataSource.read();

    dataSource.online(false);

    var promise = dataSource.sync();

    ok($.isFunction(promise.then));

    promise.then($.proxy(ok, this, true));
});

}());
