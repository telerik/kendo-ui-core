(function(){

var dataSource;

function setup(source) {
    dataSource = new kendo.data.DataSource( {
        data: source || [{ id:1, foo: "foo" },{ id: 2, foo: "foo" }],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    dataSource.read();
}

module("DataSource", {
    setup: function() {
        setup();
    }
});

test("get returns undefined if no model exist with the specified id", function() {
    equal(dataSource.get(3), undefined, "result is undefined");
});

test("get returns the model instance with the specified id", function() {
    var model = dataSource.get(1);
    ok(model);
    ok(model instanceof kendo.data.Model);
});

test("get returns the model instance with the specified id as string", function() {
    var model = dataSource.get(1);
    equal(model.id, 1);
});

test("add appends the specified values", function() {
    dataSource.add( { foo: "bar" } );

    equal(dataSource.data().length, 3);
    equal(dataSource.data()[2].foo, "bar");
});

test("add returns the new model istance", function() {
    var model = dataSource.add( { foo: "bar" } );

    ok(model instanceof kendo.data.Model);
    ok(model.isNew());
    equal(model.foo, "bar");
});

test("add appends specified model instance", function() {
    var model = new kendo.data.Model({ foo: "bar" });

    equal(dataSource.add(model), model);
});

test("inserts specified values at specified position", function() {
    dataSource.insert(0, { foo: "bar" } );

    equal(dataSource.data().length, 3);
    equal(dataSource.data()[0].foo, "bar");
});

test("inserts the specified values at first position if index is not specified", function() {
    dataSource.insert({ foo: "bar" } );

    equal(dataSource.data()[0].foo, "bar");
});

test("insert returns the new model istance", function() {
    var model = dataSource.insert({ foo: "bar" });

    ok(model instanceof kendo.data.Model);
    ok(model.isNew());
});

test("removes the specified model", function() {
    var model = dataSource.get(1);
    dataSource.remove(model);

    equal(dataSource.data().length, 1);
});

test("remove returns the removed model", function() {
    var model = dataSource.get(1);

    equal(dataSource.remove(model), model);
});

test("cancelChanges restores removed model", function() {
    dataSource.remove(dataSource.get(1));

    dataSource.cancelChanges();

    equal(dataSource.data().length, 2);

    equal(dataSource.data()[0].id, 1);
    ok(dataSource.data()[0] instanceof kendo.data.Model, "First item is a model");
});

test("cancelChanges restores removed model to its original state", function() {
    var model = dataSource.get(1);

    model.set("foo", "bar");

    dataSource.remove(model);

    dataSource.cancelChanges();

    equal(dataSource.get(1).foo, "foo");
});

test("cancelChanges removes inserted model", function() {
    dataSource.insert({ foo: "baz" });

    dataSource.cancelChanges();

    equal(dataSource.data().length, 2);
});

test("cancelChanges restores updated model to its original state", function() {
    var model = dataSource.get(1);
    model.set("foo", "baz");

    dataSource.cancelChanges(model);

    equal(dataSource.get(1).foo, "foo");
    ok(dataSource.get(1) instanceof kendo.data.ObservableObject);
});

test("cancelChanges restores updated complex model to its original state", function() {
    setup([ { id: 1, foo: { bar: "baz" } } ]);

    var model = dataSource.get(1);
    model.set("foo", { bar: "moo" });

    dataSource.cancelChanges(model);

    equal(dataSource.get(1).foo.bar, "baz");
    ok(dataSource.get(1).foo instanceof kendo.data.ObservableObject);
});

test("cancelChanges restores updated model to its original state only for povided model", function() {
    var model1 = dataSource.get(1),
        model2 = dataSource.get(2);

    model1.set("foo", "baz");
    model2.set("foo", "bar");

    dataSource.cancelChanges(model1);

    equal(dataSource.get(1).foo, "foo");
    equal(dataSource.get(2).foo, "bar");
});

test("cancelChanges removes inserted model passed as parameter", function() {
    var model;

    dataSource.get(1).set("foo", "bar");
    model = dataSource.insert({ foo: "baz" });

    dataSource.cancelChanges(model);

    equal(dataSource.get(1).foo, "bar");
    equal(dataSource.data().length, 2);
});

test("cancelChanges does not revert it passed model is removed", function() {
    var model = dataSource.get(1);

    dataSource.get(2).set("foo", "bar");
    dataSource.remove(model);

    dataSource.cancelChanges(model);

    equal(dataSource.get(2).foo, "bar");
    equal(dataSource.data().length, 1);
});

test("indexOf returns the index of model", function() {
    var model = dataSource.get(1);

    equal(dataSource.indexOf(model), 0);
});
test("indexOf returns -1 if model is undefined", function() {
    var model = dataSource.get();

    equal(dataSource.indexOf(model), -1);
});


test("indexOf returns -1 if model does is not contained in the data source", function() {
    equal(dataSource.indexOf(new kendo.data.Model()), -1);
});

test("removes model from grouped data", function() {
    var dataSource = new kendo.data.DataSource({
        schema: {
            model: { id: "id" },
            groups: function(data) {
                return [{
                    items: [{ foo: 1, id: 0}, { foo: 1, id: 1}],
                    field: "foo",
                    value: 1
                }];
            },
            total: function() {
                return 1;
            }
        },
        serverGrouping: true,
        group: { field: "foo" }
    });

    dataSource.read();
    var model = dataSource.get(0);
    var removedModel = dataSource.remove(model);

    deepEqual(removedModel, model);
    equal(removedModel.foo, 1);
    equal(removedModel.id, 0);
    equal(dataSource.data()[0].items.length, 1);
});

test("removes model from nested grouped data", function() {
    var dataSource = new kendo.data.DataSource({
        schema: {
            model: { id: "id" },
            groups: function(data) {
                return [{
                    items: [{
                        items: [{ bar: "bar", foo: 1, id: 0}, { bar: "bar", foo: 1, id: 1}],
                        field: "bar",
                        value: "bar"
                    }],
                    field: "foo",
                    value: 1,
                    hasSubgroups: true
                }];
            },
            total: function() {
                return 1;
            }
        },
        serverGrouping: true,
        group: [{ field: "foo" }, { field: "bar" }]
    });

    dataSource.read();
    var model = dataSource.get(1);
    var removedModel = dataSource.remove(model);

    deepEqual(removedModel, model);
    equal(removedModel.foo, 1);
    equal(removedModel.id, 1);
    equal(dataSource.data()[0].items[0].items.length, 1);
});

test("cancelChanges does revert changes if server grouping is enabled", function() {
    var dataSource = new kendo.data.DataSource({
        schema: {
            model: { id: "id" },
            parse: function(data) {
                return [{
                    items: [{
                        items: [{ bar: "bar", foo: 1, id: 0}, { bar: "bar", foo: 1, id: 1}],
                        field: "bar",
                        value: "bar"
                    }],
                    field: "foo",
                    value: 1,
                    hasSubgroups: true
                }];
            },
            total: function() {
                return 1;
            }
        },
        serverGrouping: true,
        group: [{ field: "foo" }, { field: "bar" }]
    });

    dataSource.read();

    var model = dataSource.get(1);

    dataSource.remove(model);

    dataSource.cancelChanges();

    ok(dataSource.get(1));
    equal(dataSource.data()[0].items[0].items.length, 2);
});

test("cancelChanges does revert changes for given model if server grouping is enabled", function() {
    var dataSource = new kendo.data.DataSource({
        schema: {
            model: { id: "id" },
            parse: function(data) {
                return [{
                    items: [{
                        items: [{ bar: "bar", foo: 1, id: 0}, { bar: "bar", foo: 1, id: 1}],
                        field: "bar",
                        value: "bar"
                    }],
                    field: "foo",
                    value: 1,
                    hasSubgroups: true
                }];
            },
            total: function() {
                return 1;
            }
        },
        serverGrouping: true,
        group: [{ field: "foo" }, { field: "bar" }]
    });

    dataSource.read();

    var model = dataSource.get(1);

    model.set("bar", "boo");

    dataSource.cancelChanges(model);

    equal(dataSource.get(1).get("bar"), "bar");
    equal(dataSource.data()[0].items[0].items.length, 2);
});

test("item is of correct type after cancelChanges and server grouping", function() {
    var MyModel = kendo.data.Model.define({ id: "id" });

    var dataSource = new kendo.data.DataSource({
        schema: {
            model: MyModel,
            parse: function(data) {
                return [{
                    items: [{
                        items: [{ bar: "bar", foo: 1, id: 0}, { bar: "bar", foo: 1, id: 1}],
                        field: "bar",
                        value: "bar"
                    }],
                    field: "foo",
                    value: 1,
                    hasSubgroups: true
                }];
            },
            total: function() {
                return 1;
            }
        },
        serverGrouping: true,
        group: [{ field: "foo" }, { field: "bar" }]
    });

    dataSource.read();

    var model = dataSource.get(1);

    model.set("bar", "boo");

    dataSource.cancelChanges();

    ok(dataSource.view()[0].items[0].items[0] instanceof MyModel);
});


test("adding items to array field sets the dirty flag to true", function() {
    var model = new kendo.data.Model({
        foo: []
    });

    model.foo.push("foo");

    equal(model.dirty, true);
});

test("removing items from array field sets the dirty flag to true", function() {
    var model = new kendo.data.Model({
        foo: ["foo"]
    });

    model.foo.pop();

    equal(model.dirty, true);
});

test("accept does not wrap field with underscore", function() {
    var model = new kendo.data.Model({
        _foo: {},
        bar: "bar"
    });

    model.accept({ _foo: { foo: "foo1" }, bar: "bar1" });

    ok(!(model._foo instanceof kendo.data.ObservableObject));
    equal(model._foo.foo, "foo1");
});

}());
