(function() {

var DataSource = kendo.data.DataSource;
var ObservableObject = kendo.data.ObservableObject;
var Model = kendo.data.Model.define({ id: "foo" });
var dataSource;

function setup(options) {
    dataSource = new DataSource(options);
}

module("data source lazy observable object");

test("at returns observable object", function() {
    setup({
        data: [ { foo: "foo" }]
    });

    dataSource.read();
    ok(dataSource.at(0) instanceof ObservableObject);
});

test("at returns observable object not from the current page", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1
    });

    dataSource.read();
    ok(dataSource.at(1) instanceof ObservableObject);
});

test("at returns instance of the data source model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1,
        schema: {
            model: Model
        }
    });

    dataSource.read();
    ok(dataSource.at(1) instanceof Model);
});

test("doesn't create observable objects that are not in the current page", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1
    });

    dataSource.read();

    ok(!(dataSource._data[1] instanceof ObservableObject));
});

test("observes data item when it gets in the current page", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1
    });

    dataSource.read();

    ok(!(dataSource._data[1] instanceof ObservableObject));

    dataSource.page(2);

    ok(dataSource._data[1] instanceof ObservableObject);
});

test("data returns observable objects", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1
    });

    dataSource.read();

    ok(dataSource.data()[1] instanceof ObservableObject);
});

test("data returns instances of the model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1,
        schema: {
            model: Model
        }
    });

    dataSource.read();

    ok(dataSource.data()[1] instanceof Model);
});

test("view returns observable objects", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1
    });

    dataSource.read();

    ok(dataSource.view()[0] instanceof ObservableObject);
});

test("view returns instances of the model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        pageSize: 1,
        schema: {
            model: Model
        }
    });

    dataSource.read();

    ok(dataSource.view()[0] instanceof Model);
});

test("the items event argument of the change event contains observables", 2, function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        change: function(e) {
            ok(e.items[0] instanceof ObservableObject);
            ok(e.items[1] instanceof ObservableObject);
        }
    });

    dataSource.read();
});

test("the items event argument of the change event contains instances of the model", 2, function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        change: function(e) {
            ok(e.items[0] instanceof Model);
            ok(e.items[1] instanceof Model);
        },
        schema: {
            model: Model
        }
    });

    dataSource.read();
});

test("the items event argument of the change event contains instances of the model", 2, function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        schema: {
            model: Model
        },
        change: function(e) {
            ok(e.items[0] instanceof Model);
            ok(e.items[1] instanceof Model);
        }
    });

    dataSource.read();
});

test("get returns observable", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        schema: {
            model: {
                id: "foo"
            }
        }
    });

    dataSource.read();

    ok(dataSource.get("foo") instanceof ObservableObject);
});

test("get returns instance of the model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        schema: {
            model: Model
        }
    });

    dataSource.read();

    ok(dataSource.get("foo") instanceof Model);
});

test("getByUid returns observable", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }]
    });

    dataSource.read();

    ok(dataSource.getByUid(dataSource.at(0).uid) instanceof ObservableObject);
});

test("getByUid returns instances of the model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        schema: {
            model: Model
        }
    });

    dataSource.read();

    ok(dataSource.getByUid(dataSource.at(0).uid) instanceof Model);
});

test("group returns items that are observable", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        group: { field: "foo" }
    });

    dataSource.read();

    ok(dataSource.view()[0].items[0] instanceof ObservableObject);
});

test("group items are not observable", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        group: { field: "foo" }
    });

    dataSource.read();

    ok(!(dataSource.view()[0] instanceof ObservableObject));
});

test("group returns items that are instances of the model", function() {
    setup({
        data: [ { foo: "foo" }, { foo: "bar" }],
        schema: {
            model: Model
        },
        group: { field: "foo" }
    });

    dataSource.read();

    ok(dataSource.view()[0].items[0] instanceof Model);
});

test("group return items that are observable when serverGrouping is enabled", function() {
    setup({
        transport: {
            read: function(options) {
                options.success([
                    {
                        value: "foo",
                        items: [ { foo: "foo" }]
                    },
                    {
                        value: "bar",
                        items: [ { foo: "bar" }]
                    }
                ]);
            }
        },
        group: { field: "foo" },
        serverGrouping: true
    });

    dataSource.read();
    ok(dataSource.data()[1].items[0] instanceof ObservableObject);
});

test("group return items that are instances of the model when serverGrouping is enabled", function() {
    setup({
        transport: {
            read: function(options) {
                options.success([
                    {
                        value: "foo",
                        items: [ { foo: "foo" }]
                    },
                    {
                        value: "bar",
                        items: [ { foo: "bar" }]
                    }
                ]);
            }
        },
        group: { field: "foo" },
        schema: {
            model: Model
        },
        serverGrouping: true
    });

    dataSource.read();
    ok(dataSource.data()[1].items[0] instanceof Model);
});

test("get with server grouping", function() {
    setup({
        transport: {
            read: function(options) {
                options.success([
                    {
                        value: "foo",
                        items: [ { foo: "foo" }]
                    },
                    {
                        value: "bar",
                        items: [ { foo: "bar" }]
                    }
                ]);
            }
        },
        schema: {
            model: {
                id: "foo"
            }
        },
        group: { field: "foo" },
        serverGrouping: true
    });

    dataSource.read();
    ok(dataSource.get("foo") instanceof ObservableObject);
});

test("get with server grouping returns instance of the model", function() {
    setup({
        transport: {
            read: function(options) {
                options.success([
                    {
                        value: "foo",
                        items: [ { foo: "foo" }]
                    },
                    {
                        value: "bar",
                        items: [ { foo: "bar" }]
                    }
                ]);
            }
        },
        schema: {
            model: Model
        },
        group: { field: "foo" },
        serverGrouping: true
    });

    dataSource.read();
    ok(dataSource.get("foo") instanceof Model);
});

test("view returns items that are observable when server paging is enabled", function() {
    setup({
        transport: {
            read: function(options) {
                options.success([
                    { foo: "foo" }, { foo: "bar" }
                ]);
            }
        },
        schema: {
            model: Model
        },
        pageSize: 1,
        serverPaging: true
    });

    dataSource.read();
    ok(dataSource.view()[0] instanceof Model);
});

})();
