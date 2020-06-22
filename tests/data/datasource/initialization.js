(function() {

    var data = [];
    var RemoteTransport = kendo.data.RemoteTransport;
    var Model = kendo.data.Model;
    var DataSource = kendo.data.DataSource;

    describe("DataSource initialization", function() {
        beforeEach(function() {
        });
        afterEach(function() {
            delete kendo.data.transports["my-custom-transport"];
        });


        function setup(source) {
            data = source || [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }];

            var dataSource = new DataSource({
                data: data
            });

            dataSource.read();
            return dataSource;
        }

        it("remote transport is initialized if data is not set", function() {
            var dataSource = new DataSource({
                transport: {
                    read: "foo"
                }
            });

            assert.equal(dataSource.transport.options.read.url, "foo");
        });

        it("dataSource is initialized from the options", function() {
            var dataSource1 = new DataSource(),
                dataSource2 = DataSource.create(dataSource1);

            assert.isOk(dataSource1 === dataSource2);
        });

        it("dataSource is initialized if array is passed as options.data", function() {
            var data = [1, 2],
                dataSource = DataSource.create({
                    data: data
                });

            dataSource.read();
            assert.isOk(dataSource.data().length, 2);
            assert.isOk(dataSource.data()[0], 1);
            assert.isOk(dataSource.data()[1], 2);
        });

        it("assigning data updates the pristine", function() {
            var data = [1, 2],
                dataSource = DataSource.create({});

            dataSource.read();
            dataSource.data([{ foo: 1 }]);
            dataSource.cancelChanges();
            assert.equal(dataSource.data().length, 1);
        });

        it("assigning data updates the pristine total", function() {
            var data = [1, 2],
                dataSource = DataSource.create({});

            dataSource.read();
            dataSource.data([{ foo: 1 }]);
            dataSource.cancelChanges();
            assert.equal(dataSource.total(), 1);
        });

        it("model is created during dataSource initialization from field definition", function() {
            var dataSource = DataSource.create({
                data: data,
                fields: [{ field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
            });
            var fields = dataSource.options.schema.model.fields;
            assert.equal(fields["foo"].field, "foo");
            assert.equal(fields["foo"].type, "number");
            assert.equal(fields["bar"].type, "boolean");
            assert.equal(fields["bar"].field, "bar");
        });

        it("model is created during dataSource initialization from field definition", function() {
            var dataSource = DataSource.create({
                data: data,
                schema: { data: "foo" },
                fields: [{ field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
            });
            var schema = dataSource.options.schema;
            assert.equal(schema.data, "foo");
            assert.equal(schema.model.fields["foo"].field, "foo");
            assert.equal(schema.model.fields["foo"].type, "number");
            assert.equal(schema.model.fields["bar"].type, "boolean");
            assert.equal(schema.model.fields["bar"].field, "bar");
        });

        it("model is not overridden durring dataSource initialization", function() {
            var dataSource = DataSource.create({
                data: data,
                schema: { model: { fields: { baz: "baz" } } },
                fields: [{ field: "foo", type: "number" }, { field: "bar", type: "boolean" }]
            });

            var fields = dataSource.options.schema.model.fields;
            assert.equal(fields["foo"], undefined);
            assert.equal(fields["bar"], undefined);
            assert.isOk(fields["baz"]);
        });

        it("page is set to 1 if pageSize is defined but no page", function() {
            var dataSource = new DataSource({ pageSize: 10 });
            assert.equal(dataSource.page(), 1);
        });

        it("page", function() {
            var dataSource = new DataSource({ page: 1, pageSize: 10 });
            assert.equal(dataSource.page(), 1);
            assert.equal(dataSource.pageSize(), 10);
        });

        it(" skips disabled optionsinfer from html table", function() {
            var table = $("<table><tr><td>foo1</td><td>bar1</td></tr><tr><td>foo2</td><td>bar2</td></tr></table>"),
                dataSource = DataSource.create({
                    table: table,
                    fields: [{ field: "foo" }, { field: "bar" }]
                });

            dataSource.read();
            assert.equal(dataSource.data().length, 2);
            assert.equal(dataSource.data()[0].foo, "foo1");
            assert.equal(dataSource.data()[0].bar, "bar1");
            assert.equal(dataSource.data()[1].foo, "foo2");
            assert.equal(dataSource.data()[1].bar, "bar2");
        });

        it("infer from html table skips th", function() {
            var table = $("<table><tr><th>foo</th></tr></table>"),
                dataSource = DataSource.create({
                    table: table,
                    fields: [{ field: "foo" }]
                });

            dataSource.read();
            assert.equal(dataSource.data().length, 0);
        });

        it("infer from html select", function() {
            var select = $("<select><option value=1>foo1</option><option value=2>foo2</option></select>"),
                dataSource = DataSource.create({
                    select: select,
                    fields: [{ field: "text" }, { field: "value" }]
                });

            dataSource.read();
            assert.equal(dataSource.data().length, 2);
            assert.equal(dataSource.data()[0].text, "foo1");
            assert.equal(dataSource.data()[0].value, "1");
            assert.equal(dataSource.data()[1].text, "foo2");
            assert.equal(dataSource.data()[1].value, "2");
        });

        it("infer from html select skips disabled options", function() {
            var select = $("<select><option disabled value=1>foo1</option><option value=2>foo2</option></select>"),
                dataSource = DataSource.create({
                    select: select,
                    fields: [{ field: "text" }, { field: "value" }]
                });

            dataSource.read();
            assert.equal(dataSource.data().length, 1);
            assert.equal(dataSource.data()[0].text, "foo2");
            assert.equal(dataSource.data()[0].value, "2");
        });

        it("infer from grouped html select", function() {
            var select = $("<select><optgroup label='group1'><option value=1>foo1</option></optgroup><optgroup label='group2'><option value=2>foo2</option></optgroup></select>"),
                dataSource = DataSource.create({
                    select: select,
                    fields: [{ field: "text" }, { field: "value" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 2);
            assert.equal(data[0].optgroup, "group1");
            assert.equal(data[1].optgroup, "group2");
        });

        it("infer from grouped html select skips disabled groups", function() {
            var select = $("<select><optgroup disabled label='group1'><option value=1>foo1</option></optgroup><optgroup label='group2'><option value=2>foo2</option></optgroup></select>"),
                dataSource = DataSource.create({
                    select: select,
                    fields: [{ field: "text" }, { field: "value" }]
                });

            dataSource.read();

            var data = dataSource.data();

            assert.equal(data.length, 1);
            assert.equal(data[0].optgroup, "group2");
        });


        it("infering from grouped html select sets group option", function() {
            var select = $("<select><optgroup label='group1'><option value=1>foo1</option></optgroup><optgroup label='group2'><option value=2>foo2</option></optgroup></select>"),
                dataSource = DataSource.create({
                    select: select,
                    fields: [{ field: "text" }, { field: "value" }]
                });

            dataSource.read();

            var group = dataSource.group();
            assert.equal(group.length, 1);
            assert.equal(group[0].field, "optgroup");
        });

        it("initialize data source from array", function() {
            var data = [1, 2],
                dataSource = DataSource.create(data);

            dataSource.read();
            assert.isOk(dataSource.data().length, 2);
            assert.isOk(dataSource.data()[0], 1);
            assert.isOk(dataSource.data()[1], 2);
        });

        it("XmlDataReader is initialized when the type of the schema is xml", function() {
            var dataSource = new DataSource({
                schema: {
                    type: "xml",
                    model: Model.define()
                }
            });

            assert.isOk(dataSource.reader instanceof kendo.data.XmlDataReader);
        });

        it("get returns a model instance", function() {
            var dataSource = new DataSource({
                schema: {
                    model: Model.define()
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });
            dataSource.read();
            var model = dataSource.get(1);
            assert.equal(model.get("id"), 1);
            assert.equal(model.get("foo"), "bar");
        });

        it("get returns data record if original data is grouped", function() {
            var dataSource = new DataSource({
                schema: {
                    model: Model.define()
                },
                serverGrouping: true,
                group: [{ field: "foo", value: "bar" }],
                data: [{ field: "foo", value: "bar", items: [{ id: 1, foo: "bar" }, { id: 2, foo: "bar" }] }]
            });
            dataSource.read();
            var model = dataSource.get(1);
            assert.equal(model.get("id"), 1);
            assert.equal(model.get("foo"), "bar");
        });

        it("get data record is same as the original if original data is grouped", function() {
            var dataSource = new DataSource({
                schema: {
                    model: Model.define()
                },
                serverGrouping: true,
                group: [{ field: "foo", value: "bar" }],
                data: [{ field: "foo", value: "bar", items: [{ id: 1, foo: "bar" }, { id: 2, foo: "bar" }] }]
            });
            dataSource.read();
            var original = dataSource.data()[0].items[0];

            var model = dataSource.get(1);
            assert.equal(model, original);
        });

        it("getByUid returns data record if data is grouped", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: [{ field: "foo", value: "bar" }],
                data: [{ field: "foo", value: "bar", items: [{ id: 1, foo: "bar" }, { id: 2, foo: "bar" }] }]
            });
            dataSource.read();
            var uid = dataSource.data()[0].items[0].uid;
            var model = dataSource.getByUid(uid);

            assert.equal(model.get("id"), 1);
            assert.equal(model.get("foo"), "bar");
        });

        it("getByUid returns data record if data is grouped with multiple group levels", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: [{ field: "foo", value: "bar" }],
                data: [{
                    field: "foo", value: "bar", hasSubgroups: true, items: [
                        { field: "id", value: 1, items: [{ id: 1, foo: "bar" }] },
                        { field: "id", value: 2, items: [{ id: 2, foo: "bar" }] }
                    ]
                }]
            });
            dataSource.read();
            var uid = dataSource.data()[0].items[0].items[0].uid;
            var model = dataSource.getByUid(uid);

            assert.equal(model.get("id"), 1);
            assert.equal(model.get("foo"), "bar");
        });

        it("model use model metadata", function() {
            var dataSource = new DataSource({
                schema: {
                    model: Model.define({ id: "foo" })
                },
                data: [{ foo: "1", bar: "bar1" }, { foo: "2", bar: "bar2" }]
            });
            dataSource.read();
            var model = dataSource.get("2");
            assert.equal(model.get("foo"), "2");
            assert.equal(model.get("bar"), "bar2");
        });

        it("model method uses specified model from the configuration", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "foo" }
                },
                data: [{ foo: "1", bar: "bar1" }, { foo: "2", bar: "bar2" }]
            });
            dataSource.read();

            var model = dataSource.get("2");
            assert.equal(model.get("foo"), "2");
            assert.equal(model.get("bar"), "bar2");
        });

        it("sort as object is expanded to array", function() {
            var dataSource = new DataSource({
                data: [],
                sort: { field: "foo", dir: "asc" }
            });

            assert.isOk($.isArray(dataSource._sort));
            assert.equal(dataSource._sort[0].field, "foo");
            assert.equal(dataSource._sort[0].dir, "asc");
        });

        it("sort settings are stored as descriptors", function() {
            var dataSource = new DataSource({
                data: [],
                sort: { field: "foo", dir: "asc" }
            });

            assert.equal(dataSource._sortFields["foo"].dir, "asc");
        });

        it("Data is converted to ObservableArray", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1 }]
            });
            dataSource.read();
            assert.isOk(dataSource.data() instanceof kendo.data.ObservableArray);
            assert.isOk(dataSource.view() instanceof kendo.data.ObservableArray);
        });

        it("Data initial value is ObservableArray", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1 }]
            });
            assert.isOk(dataSource.data() instanceof kendo.data.ObservableArray);
        });

        it("Group items are converted to the model type when server grouping is enabled", function() {
            var MyModel = Model.define({}),
                dataSource = new DataSource({
                    schema: {
                        model: MyModel,
                        groups: function(data) {
                            return [{
                                items: [{ foo: 1 }, { foo: 2 }],
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

            assert.isOk(dataSource.data()[0].items[0] instanceof MyModel);
            assert.isOk(dataSource.data()[0].items[1] instanceof MyModel);
        });

        it("Nested group items are converted to the model type when server grouping is enabled", function() {
            var MyModel = Model.define({}),
                dataSource = new DataSource({
                    schema: {
                        model: MyModel,
                        groups: function(data) {
                            return [{
                                items: [{
                                    items: [{ bar: "bar", foo: 1, id: 0 }, { bar: "bar", foo: 1, id: 1 }],
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

            assert.isOk(dataSource.data()[0].items[0].items[0] instanceof MyModel);
        });

        it("reseting data unbind change from the previous data", function() {
            var dataSource = new DataSource({
                data: []
            });
            var originalData = dataSource.data();

            dataSource.bind("change", function() {
                assert.isOk(true);
            });

            dataSource.data([{}]);

            originalData.push({});
        });

        it("setting data triggers reset event", function() {
            var dataSource = new DataSource({ data: [] });
            var originalData = dataSource.data();

            dataSource.bind("reset", function() {
                assert.isOk(true);
            });

            dataSource.data([{}]);
        });

        it("re-read parent of the old array is reset", function() {
            var dataSource = new DataSource({ data: [{ foo: "foo" }, { foo: "foo1" }] });

            dataSource.read();

            var arr = dataSource.data();

            dataSource.read();

            assert.notDeepEqual(dataSource.data()[0].parent(), arr);
            assert.notDeepEqual(arr[0].parent(), arr);
        });

        it("re-read does not remove the parent of the observable array", function() {
            var arr = new kendo.data.ObservableArray([{ foo: "foo" }, { foo: "foo1" }]);
            var dataSource = new DataSource({ data: arr });

            dataSource.read();

            dataSource.read();

            assert.deepEqual(arr[0].parent(), arr);
            assert.deepEqual(arr[1].parent(), arr);
        });

        it("dataSource instance is passed as option to the jsdo transport", function() {
            var MyTransport = RemoteTransport.extend({
                init: function(options) {
                    assert.isOk(options.dataSource);
                    assert.isOk(options.dataSource instanceof DataSource);
                }
            });

            kendo.data.transports.jsdo = MyTransport;

            var dataSource = new DataSource({
                transport: {},
                type: "jsdo"
            });
        });

    });
}());
