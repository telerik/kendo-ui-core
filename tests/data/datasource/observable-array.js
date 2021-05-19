(function() {

    describe("data source observable array", function() {

        it("triggers change when observable array changes", function() {
            var dataSource = kendo.data.DataSource.create([1, 2, 3]);

            dataSource.read();

            dataSource.bind("change", function() {
                assert.isOk("change is triggered");
            });

            dataSource.data().push(4);
        });

        it("passes added items in the event parameter", function() {
            var dataSource = kendo.data.DataSource.create([1, 2, 3]);

            dataSource.read();

            dataSource.bind("change", function(e) {
                assert.equal(e.items[0], 4);
            });

            dataSource.data().push(4);
        });

        it("creates observale array which contains model instances if model is specified", function() {

            var dataSource = new kendo.data.DataSource({
                data: [{ id: 1 }],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.read();

            assert.isOk(dataSource.data()[0] instanceof kendo.data.Model);
        });

        it("ObservableObject are converted to Model if such is set", function() {
            var data = new kendo.data.ObservableArray([{ foo: 1 }]),
                ModelType = kendo.data.Model.define({
                    fields: {
                        foo: "foo"
                    }
                }),
                dataSource = new kendo.data.DataSource({
                    data: data,
                    schema: {
                        model: ModelType
                    }
                });

            dataSource.read();

            assert.isOk(dataSource.at(0) instanceof ModelType);
            assert.strictEqual(dataSource.data(), data);
        });


        it("field is not assigned if is undefined", function() {
            var data = new kendo.data.ObservableObject({ foo: 1, bar: undefined });

            assert.strictEqual(data.foo, 1);
            assert.strictEqual(data.bar, undefined);
        });

        it("data parent field is assign if observable array is assign", function() {
            var viewModel = kendo.observable({
                data: [{ foo: 1 }],
                dataSource: new kendo.data.DataSource({
                })
            });

            viewModel.dataSource.data(viewModel.data);

            assert.equal(viewModel.dataSource.data().parent(), viewModel);
        });

        it("data parent field is assign if array is assign", function() {
            var viewModel = kendo.observable({
                data: [{ foo: 1 }],
                dataSource: new kendo.data.DataSource({
                    data: [1, 2, 3, 4, 5]
                })
            });

            assert.equal(viewModel.dataSource.data().parent(), viewModel);
        });

        it("parents chain is correct when grouping", function() {
            var dataSource = new kendo.data.DataSource({
                data: [{ foo: 1 }],
                group: [{ field: "foo" }]
            });

            var viewModel = kendo.observable({
                dataSource: dataSource
            });

            dataSource.read();

            var flatViewItem = dataSource.flatView()[0];

            var groupItem = dataSource.view()[0];

            assert.equal(flatViewItem.parent().parent().parent().parent(), viewModel);
            assert.equal(groupItem.parent().parent(), viewModel);
        });

        it("parents chain is correct when grouping on multiple fields", function() {
            var dataSource = new kendo.data.DataSource({
                data: [{ foo: 1, bar: 2 }],
                group: [{ field: "foo" }, { field: "bar" }]
            });

            var viewModel = kendo.observable({
                dataSource: dataSource
            });

            dataSource.read();

            var flatViewItem = dataSource.flatView()[0];

            var groupItem = dataSource.view()[0];
            var nestedGroupItem = groupItem.items[0];

            assert.equal(flatViewItem.parent().parent().parent().parent().parent().parent(), viewModel);
            assert.equal(groupItem.parent().parent(), viewModel);
            assert.equal(nestedGroupItem.parent().parent().parent().parent(), viewModel);
        });

        it("change event should trigger when editing an item with server grouping", function() {
            var onChange = function(e) {
                if (e.action === 'itemchange') {
                    assert.isOk(true);
                }
            };

            var response = [
                {
                    "Aggregates": {

                    },
                    "HasSubgroups": false,
                    "Member": "Salary",
                    "Subgroups": [

                    ],
                    "items": [
                        {
                            "Id": 1,
                            "Name": "John Smith",
                            "Salary": 2000
                        }
                    ],
                    "Aggregates": {
                        "Salary": {
                            "sum": 2000
                        }
                    },
                    "Key": 2000
                },
                {
                    "Key": 3000,
                    "HasSubgroups": false,
                    "Member": "Salary",
                    "items": [
                        {
                            "Id": 2,
                            "Name": "Jane Rottencrotch",
                            "Salary": 3000
                        }
                    ],
                    "Aggregates": {

                    },
                    "Subgroups": [

                    ]
                }
            ];

            var dataSource = new kendo.data.DataSource({
                "change": onChange,
                "transport": {
                    "read": 'someurl'
                },
                "serverPaging": true,
                "serverSorting": true,
                "serverFiltering": true,
                "serverGrouping": true,
                "serverAggregates": true,
                "group": [
                    {
                        "field": "Salary",
                        "dir": "asc"
                    }
                ],
                "filter": [

                ],
                "aggregate": [{
                    "field": "Salary",
                    "aggregate": "sum"
                }],
                "schema": {
                    "data": "Data",
                    "total": "Total",
                    "errors": "Errors",
                    "model": {
                        "id": "Id",
                        "fields": {
                            "Id": {
                                "type": "number"
                            },
                            "Name": {
                                "type": "string"
                            },
                            "Salary": {
                                "type": "number"
                            },
                        }
                    }
                }
            });

            dataSource.success(response);
            dataSource.data()[0].items[0].set('Name', 'test');

        });
    });
}());
