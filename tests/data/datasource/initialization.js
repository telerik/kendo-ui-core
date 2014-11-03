(function(){

var data = [];
var RemoteTransport = kendo.data.RemoteTransport;
var Model = kendo.data.Model;
var DataSource = kendo.data.DataSource;

function setup(source) {
    data = source || [{ id:1, bar: "foo" },{ id: 2, bar: "foo" }];

    var dataSource = new DataSource( {
        data: data
    });

    dataSource.read();
    return dataSource;
}

test("remote transport is initialized if data is not set", function() {
    var dataSource = new DataSource({
        transport: {
            read: "foo"
        }
    });

    equal(dataSource.transport.options.read.url, "foo");
});

test("dataSource is initialized from the options", function() {
    var dataSource1 = new DataSource(),
        dataSource2 = DataSource.create(dataSource1);

    ok(dataSource1 === dataSource2);
});

test("dataSource is initialized if array is passed as options.data", function() {
    var data = [1, 2],
        dataSource = DataSource.create({
            data: data
        });

    dataSource.read();
    ok(dataSource.data().length, 2);
    ok(dataSource.data()[0], 1);
    ok(dataSource.data()[1], 2);
});

test("assigning data updates the pristine", function() {
    var data = [1, 2],
        dataSource = DataSource.create({ });

    dataSource.read();
    dataSource.data([{ foo: 1 }]);
    dataSource.cancelChanges();
    equal(dataSource.data().length, 1);
});

test("assigning data updates the pristine total", function() {
    var data = [1, 2],
        dataSource = DataSource.create({ });

    dataSource.read();
    dataSource.data([{ foo: 1 }]);
    dataSource.cancelChanges();
    equal(dataSource.total(), 1);
});

test("model is created during dataSource initialization from field definition", function() {
    var dataSource = DataSource.create({
        data: data,
        fields: [ { field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
    });
    var fields = dataSource.options.schema.model.fields;
    equal(fields["foo"].field, "foo");
    equal(fields["foo"].type, "number");
    equal(fields["bar"].type, "boolean");
    equal(fields["bar"].field, "bar");
});

test("model is created during dataSource initialization from field definition", function() {
    var dataSource = DataSource.create({
        data: data,
        schema: { data: "foo" },
        fields: [ { field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
    });
    var schema = dataSource.options.schema;
    equal(schema.data, "foo");
    equal(schema.model.fields["foo"].field, "foo");
    equal(schema.model.fields["foo"].type, "number");
    equal(schema.model.fields["bar"].type, "boolean");
    equal(schema.model.fields["bar"].field, "bar");
});

test("model is not overridden durring dataSource initialization", function() {
    var dataSource = DataSource.create({
        data: data,
        schema: { model: { fields: { baz: "baz" } } },
        fields: [ { field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
    });

    var fields = dataSource.options.schema.model.fields;
    equal(fields["foo"], undefined);
    equal(fields["bar"], undefined);
    ok(fields["baz"]);
});

test("page is set to 1 if pageSize is defined but no page", function() {
    var dataSource = new DataSource({ pageSize: 10 });
    equal(dataSource.page(), 1);
});

test("page", function() {
    var dataSource = new DataSource({ page: 1, pageSize: 10 });
    equal(dataSource.page(), 1);
    equal(dataSource.pageSize(), 10);
});

test(" skips disabled optionsinfer from html table", function() {
    var table = $("<table><tr><td>foo1</td><td>bar1</td></tr><tr><td>foo2</td><td>bar2</td></tr></table>"),
        dataSource = DataSource.create({
            table: table,
            fields: [ { field: "foo" }, { field: "bar" } ]
        });

    dataSource.read();
    equal(dataSource.data().length, 2);
    equal(dataSource.data()[0].foo, "foo1");
    equal(dataSource.data()[0].bar, "bar1");
    equal(dataSource.data()[1].foo, "foo2");
    equal(dataSource.data()[1].bar, "bar2");
});

test("infer from html table skips th", function() {
    var table = $("<table><tr><th>foo</th></tr></table>"),
        dataSource = DataSource.create({
            table: table,
            fields: [ { field: "foo" }]
        });

    dataSource.read();
    equal(dataSource.data().length, 0);
});

test("infer from html select", function() {
    var select = $("<select><option value=1>foo1</option><option value=2>foo2</option></select>"),
        dataSource = DataSource.create({
            select: select,
            fields: [ { field: "text" }, { field: "value" } ]
        });

    dataSource.read();
    equal(dataSource.data().length, 2);
    equal(dataSource.data()[0].text, "foo1");
    equal(dataSource.data()[0].value, "1");
    equal(dataSource.data()[1].text, "foo2");
    equal(dataSource.data()[1].value, "2");
});

test("infer from html select skips disabled options", function() {
    var select = $("<select><option disabled value=1>foo1</option><option value=2>foo2</option></select>"),
        dataSource = DataSource.create({
            select: select,
            fields: [ { field: "text" }, { field: "value" } ]
        });

    dataSource.read();
    equal(dataSource.data().length, 1);
    equal(dataSource.data()[0].text, "foo2");
    equal(dataSource.data()[0].value, "2");
});

test("initialize data source from array", function() {
    var data = [1, 2],
        dataSource = DataSource.create(data);

    dataSource.read();
    ok(dataSource.data().length, 2);
    ok(dataSource.data()[0], 1);
    ok(dataSource.data()[1], 2);
});

test("XmlDataReader is initialized when the type of the schema is xml", function() {
    var dataSource = new DataSource({
        schema: {
            type: "xml",
            model: Model.define()
        }
    });

    ok(dataSource.reader instanceof kendo.data.XmlDataReader);
});

test("get returns a model instance", function() {
    var dataSource = new DataSource({
        schema: {
            model: Model.define()
        },
        data: [ { id: 1, foo: "bar"}, { id: 2, foo: "baz"}]
    });
    dataSource.read();
    var model = dataSource.get(1);
    equal(model.get("id"), 1);
    equal(model.get("foo"), "bar");
});

test("get returns data record if original data is grouped", function() {
    var dataSource = new DataSource({
        schema: {
            model: Model.define()
        },
        serverGrouping: true,
        group: [ { field: "foo", value: "bar" } ],
        data: [ { field: "foo", value: "bar", items: [{ id: 1, foo: "bar"}, { id: 2, foo: "bar"}]}]
    });
    dataSource.read();
    var model = dataSource.get(1);
    equal(model.get("id"), 1);
    equal(model.get("foo"), "bar");
});

test("get data record is same as the original if original data is grouped", function() {
    var dataSource = new DataSource({
        schema: {
            model: Model.define()
        },
        serverGrouping: true,
        group: [ { field: "foo", value: "bar" } ],
        data: [ { field: "foo", value: "bar", items: [{ id: 1, foo: "bar"}, { id: 2, foo: "bar"}]}]
    });
    dataSource.read();
    var original = dataSource.data()[0].items[0];

    var model = dataSource.get(1);
    equal(model, original);
});

test("getByUid returns data record if data is grouped", function() {
    var dataSource = new DataSource({
        serverGrouping: true,
        group: [ { field: "foo", value: "bar" } ],
        data: [ { field: "foo", value: "bar", items: [{ id: 1, foo: "bar"}, { id: 2, foo: "bar"}]}]
    });
    dataSource.read();
    var uid = dataSource.data()[0].items[0].uid;
    var model = dataSource.getByUid(uid);

    equal(model.get("id"), 1);
    equal(model.get("foo"), "bar");
});

test("getByUid returns data record if data is grouped with multiple group levels", function() {
    var dataSource = new DataSource({
        serverGrouping: true,
        group: [ { field: "foo", value: "bar" } ],
        data: [ { field: "foo", value: "bar", hasSubgroups: true, items: [
            { field: "id", value: 1, items: [{ id: 1, foo: "bar"}]},
            { field: "id", value: 2, items: [{ id: 2, foo: "bar"}]}
        ]}]
    });
    dataSource.read();
    var uid = dataSource.data()[0].items[0].items[0].uid;
    var model = dataSource.getByUid(uid);

    equal(model.get("id"), 1);
    equal(model.get("foo"), "bar");
});

test("model use model metadata", function() {
    var dataSource = new DataSource({
        schema: {
            model: Model.define( { id: "foo" })
        },
        data: [ { foo: "1", bar: "bar1"}, { foo: "2", bar: "bar2"}]
    });
    dataSource.read();
    var model = dataSource.get("2");
    equal(model.get("foo"), "2");
    equal(model.get("bar"), "bar2");
});

test("model method uses specified model from the configuration", function() {
    var dataSource = new DataSource({
        schema: {
            model: { id: "foo" }
        },
        data: [ { foo: "1", bar: "bar1"}, { foo: "2", bar: "bar2"}]
    });
    dataSource.read();

    var model = dataSource.get("2");
    equal(model.get("foo"), "2");
    equal(model.get("bar"), "bar2");
});

test("sort as object is expanded to array", function() {
    var dataSource = new DataSource({
        data: [],
        sort: { field: "foo", dir: "asc" }
    });

    ok($.isArray(dataSource._sort));
    equal(dataSource._sort[0].field, "foo");
    equal(dataSource._sort[0].dir, "asc");
});

test("Data is converted to ObservableArray", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1 }]
    });
    dataSource.read();
    ok(dataSource.data() instanceof kendo.data.ObservableArray);
    ok(dataSource.view() instanceof kendo.data.ObservableArray);
});

test("Data initial value is ObservableArray", function() {
    var dataSource = new DataSource({
        data: [{ foo: 1 }]
    });
    ok(dataSource.data() instanceof kendo.data.ObservableArray);
});

test("Group items are converted to the model type when server grouping is enabled", function() {
    var MyModel = Model.define({}),
        dataSource = new DataSource({
            schema: {
                model: MyModel,
                groups: function(data) {
                    return [{
                        items: [{ foo: 1 },{ foo: 2 }],
                        field: "foo",
                        value: "bar"
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

    ok(dataSource.data()[0].items[0] instanceof MyModel);
    ok(dataSource.data()[0].items[1] instanceof MyModel);
});

test("Nested group items are converted to the model type when server grouping is enabled", function() {
    var MyModel = Model.define({}),
        dataSource = new DataSource({
            schema: {
                model: MyModel,
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
            group: { field: "foo" }
        });

    dataSource.read();

    ok(dataSource.data()[0].items[0].items[0] instanceof MyModel);
});

test("reseting data unbind change from the previous data", 1, function() {
    var dataSource = new DataSource({
        data: []
    });
    var originalData = dataSource.data();

    dataSource.bind("change", function() {
        ok(true);
    });

    dataSource.data([{}]);

    originalData.push({});
});

test("setting data triggers reset event", 1, function() {
    var dataSource = new DataSource({ data: [] });
    var originalData = dataSource.data();

    dataSource.bind("reset", function() {
        ok(true);
    });

    dataSource.data([{}]);
});

test("re-read parent of the old array is reset", function() {
    var dataSource = new DataSource({ data: [{ foo: "foo" }, { foo: "foo1" }]});

    dataSource.read();

    var arr = dataSource.data();

    dataSource.read();

    notDeepEqual(dataSource.data()[0].parent(), arr);
    notDeepEqual(arr[0].parent(), arr);
});

test("re-read does not remove the parent of the observable array", function() {
    var arr = new kendo.data.ObservableArray([{ foo: "foo" }, { foo: "foo1" }]);
    var dataSource = new DataSource({ data: arr });

    dataSource.read();

    dataSource.read();

    deepEqual(arr[0].parent(), arr);
    deepEqual(arr[1].parent(), arr);
});

}());
