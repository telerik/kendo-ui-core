(function() {

    var DataSource = kendo.data.DataSource;
    var ObservableObject = kendo.data.ObservableObject;
    var Model = kendo.data.Model.define({ id: "foo" });
    var dataSource;

    function setup(options) {
        dataSource = new DataSource(options);
    }

    describe("data source lazy observable object", function() {

        it("at returns observable object", function() {
            setup({
                data: [{ foo: "foo" }]
            });

            dataSource.read();
            assert.isOk(dataSource.at(0) instanceof ObservableObject);
        });

        it("at returns observable object not from the current page", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1
            });

            dataSource.read();
            assert.isOk(dataSource.at(1) instanceof ObservableObject);
        });

        it("at returns instance of the data source model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1,
                schema: {
                    model: Model
                }
            });

            dataSource.read();
            assert.isOk(dataSource.at(1) instanceof Model);
        });

        it("doesn't create observable objects that are not in the current page", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1
            });

            dataSource.read();

            assert.isOk(!(dataSource._data[1] instanceof ObservableObject));
        });

        it("observes data item when it gets in the current page", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1
            });

            dataSource.read();

            assert.isOk(!(dataSource._data[1] instanceof ObservableObject));

            dataSource.page(2);

            assert.isOk(dataSource._data[1] instanceof ObservableObject);
        });

        it("data returns observable objects", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1
            });

            dataSource.read();

            assert.isOk(dataSource.data()[1] instanceof ObservableObject);
        });

        it("data returns instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1,
                schema: {
                    model: Model
                }
            });

            dataSource.read();

            assert.isOk(dataSource.data()[1] instanceof Model);
        });

        it("view returns observable objects", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1
            });

            dataSource.read();

            assert.isOk(dataSource.view()[0] instanceof ObservableObject);
        });

        it("view returns new object when data is filtered", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 10,
                filter: { field: "foo", operator: "eq", value: "bar" }
            });

            dataSource.read();
            dataSource.add({ foo: "three" });

            assert.equal(dataSource.view().length, 2);
        });

        it("view returns instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                pageSize: 1,
                schema: {
                    model: Model
                }
            });

            dataSource.read();

            assert.isOk(dataSource.view()[0] instanceof Model);
        });

        it("the items event argument of the change event contains observables", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                change: function(e) {
                    assert.isOk(e.items[0] instanceof ObservableObject);
                    assert.isOk(e.items[1] instanceof ObservableObject);
                }
            });

            dataSource.read();
        });

        it("the items event argument of the change event contains instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                change: function(e) {
                    assert.isOk(e.items[0] instanceof Model);
                    assert.isOk(e.items[1] instanceof Model);
                },
                schema: {
                    model: Model
                }
            });

            dataSource.read();
        });

        it("the items event argument of the change event contains instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                schema: {
                    model: Model
                },
                change: function(e) {
                    assert.isOk(e.items[0] instanceof Model);
                    assert.isOk(e.items[1] instanceof Model);
                }
            });

            dataSource.read();
        });

        it("get returns observable", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                schema: {
                    model: {
                        id: "foo"
                    }
                }
            });

            dataSource.read();

            assert.isOk(dataSource.get("foo") instanceof ObservableObject);
        });

        it("get returns instance of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                schema: {
                    model: Model
                }
            });

            dataSource.read();

            assert.isOk(dataSource.get("foo") instanceof Model);
        });

        it("getByUid returns observable", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }]
            });

            dataSource.read();

            assert.isOk(dataSource.getByUid(dataSource.at(0).uid) instanceof ObservableObject);
        });

        it("getByUid returns instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                schema: {
                    model: Model
                }
            });

            dataSource.read();

            assert.isOk(dataSource.getByUid(dataSource.at(0).uid) instanceof Model);
        });

        it("group returns items that are observable", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                group: { field: "foo" }
            });

            dataSource.read();

            assert.isOk(dataSource.view()[0].items[0] instanceof ObservableObject);
        });

        it("group items are not observable", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                group: { field: "foo" }
            });

            dataSource.read();

            assert.isOk(!(dataSource.view()[0] instanceof ObservableObject));
        });

        it("group returns items that are instances of the model", function() {
            setup({
                data: [{ foo: "foo" }, { foo: "bar" }],
                schema: {
                    model: Model
                },
                group: { field: "foo" }
            });

            dataSource.read();

            assert.isOk(dataSource.view()[0].items[0] instanceof Model);
        });

        it("group return items that are observable when serverGrouping is enabled", function() {
            setup({
                transport: {
                    read: function(options) {
                        options.success([
                            {
                                value: "foo",
                                items: [{ foo: "foo" }]
                            },
                            {
                                value: "bar",
                                items: [{ foo: "bar" }]
                            }
                        ]);
                    }
                },
                group: { field: "foo" },
                serverGrouping: true
            });

            dataSource.read();
            assert.isOk(dataSource.data()[1].items[0] instanceof ObservableObject);
        });

        it("group return items that are instances of the model when serverGrouping is enabled", function() {
            setup({
                transport: {
                    read: function(options) {
                        options.success([
                            {
                                value: "foo",
                                items: [{ foo: "foo" }]
                            },
                            {
                                value: "bar",
                                items: [{ foo: "bar" }]
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
            assert.isOk(dataSource.data()[1].items[0] instanceof Model);
        });

        it("get with server grouping", function() {
            setup({
                transport: {
                    read: function(options) {
                        options.success([
                            {
                                value: "foo",
                                items: [{ foo: "foo" }]
                            },
                            {
                                value: "bar",
                                items: [{ foo: "bar" }]
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
            assert.isOk(dataSource.get("foo") instanceof ObservableObject);
        });

        it("get with server grouping returns instance of the model", function() {
            setup({
                transport: {
                    read: function(options) {
                        options.success([
                            {
                                value: "foo",
                                items: [{ foo: "foo" }]
                            },
                            {
                                value: "bar",
                                items: [{ foo: "bar" }]
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
            assert.isOk(dataSource.get("foo") instanceof Model);
        });

        it("view returns items that are observable when server paging is enabled", function() {
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
            assert.isOk(dataSource.view()[0] instanceof Model);
        });

    });
}());
