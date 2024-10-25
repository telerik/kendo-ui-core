(function() {

    var dataSource;

    function setup(source) {
        dataSource = new kendo.data.DataSource({
            data: source || [{ id: 1, foo: "foo" }, { id: 2, foo: "foo" }],
            schema: {
                model: {
                    id: "id"
                }
            }
        });

        dataSource.read();
    }

    describe("DataSource", function() {
        beforeEach(function() {
            setup();
        });

        it("get returns undefined if no model exist with the specified id", function() {
            assert.equal(dataSource.get(3), undefined, "result is undefined");
        });

        it("get returns the model instance with the specified id", function() {
            var model = dataSource.get(1);
            assert.isOk(model);
            assert.isOk(model instanceof kendo.data.Model);
        });

        it("get returns the model instance with the specified id as string", function() {
            var model = dataSource.get(1);
            assert.equal(model.id, 1);
        });

        it("add appends the specified values", function() {
            dataSource.add({ foo: "bar" });

            assert.equal(dataSource.data().length, 3);
            assert.equal(dataSource.data()[2].foo, "bar");
        });

        it("add returns the new model instance", function() {
            var model = dataSource.add({ foo: "bar" });

            assert.isOk(model instanceof kendo.data.Model);
            assert.isOk(model.isNew());
            assert.equal(model.foo, "bar");
        });

        it("add appends specified model instance", function() {
            var model = new kendo.data.Model({ foo: "bar" });

            assert.equal(dataSource.add(model), model);
        });

        it("inserts specified values at specified position", function() {
            dataSource.insert(0, { foo: "bar" });

            assert.equal(dataSource.data().length, 3);
            assert.equal(dataSource.data()[0].foo, "bar");
        });

        it("inserts the specified values at first position if index is not specified", function() {
            dataSource.insert({ foo: "bar" });

            assert.equal(dataSource.data()[0].foo, "bar");
        });

        it("insert returns the new model istance", function() {
            var model = dataSource.insert({ foo: "bar" });

            assert.isOk(model instanceof kendo.data.Model);
            assert.isOk(model.isNew());
        });

        it("removes the specified model", function() {
            var model = dataSource.get(1);
            dataSource.remove(model);

            assert.equal(dataSource.data().length, 1);
        });

        it("remove returns the removed model", function() {
            var model = dataSource.get(1);

            assert.equal(dataSource.remove(model), model);
        });

        it("remove does not wrap other items", function() {
            var dataSource = new kendo.data.DataSource({
                pageSize: 2,
                data: [
                    { id: 1, value: "value1" },
                    { id: 2, value: "value2" },
                    { id: 3, value: "value3" }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });
            dataSource.read();

            dataSource.remove({ id: 4, value: "value4" });

            assert.isOk(!(dataSource._data[2] instanceof kendo.data.ObservableObject));
        });

        it("cancelChanges restores removed model", function() {
            dataSource.remove(dataSource.get(1));

            dataSource.cancelChanges();

            assert.equal(dataSource.data().length, 2);

            assert.equal(dataSource.data()[0].id, 1);
            assert.isOk(dataSource.data()[0] instanceof kendo.data.Model, "First item is a model");
        });

        it("cancelChanges restores removed model to its original state", function() {
            var model = dataSource.get(1);

            model.set("foo", "bar");

            dataSource.remove(model);

            dataSource.cancelChanges();

            assert.equal(dataSource.get(1).foo, "foo");
        });

        it("cancelChanges removes inserted model", function() {
            dataSource.insert({ foo: "baz" });

            dataSource.cancelChanges();

            assert.equal(dataSource.data().length, 2);
        });

        it("cancelChanges restores updated model to its original state", function() {
            var model = dataSource.get(1);
            model.set("foo", "baz");

            dataSource.cancelChanges(model);

            assert.equal(dataSource.get(1).foo, "foo");
            assert.isOk(dataSource.get(1) instanceof kendo.data.ObservableObject);
        });

        it("cancelChanges restores updated complex model to its original state", function() {
            setup([{ id: 1, foo: { bar: "baz" } }]);

            var model = dataSource.get(1);
            model.set("foo", { bar: "moo" });

            dataSource.cancelChanges(model);

            assert.equal(dataSource.get(1).foo.bar, "baz");
            assert.isOk(dataSource.get(1).foo instanceof kendo.data.ObservableObject);
        });

        it("cancelChanges restores updated model to its original state only for provided model", function() {
            var model1 = dataSource.get(1),
                model2 = dataSource.get(2);

            model1.set("foo", "baz");
            model2.set("foo", "bar");

            dataSource.cancelChanges(model1);

            assert.equal(dataSource.get(1).foo, "foo");
            assert.equal(dataSource.get(2).foo, "bar");
        });

        it("cancelChanges removes inserted model passed as parameter", function() {
            var model;

            dataSource.get(1).set("foo", "bar");
            model = dataSource.insert({ foo: "baz" });

            dataSource.cancelChanges(model);

            assert.equal(dataSource.get(1).foo, "bar");
            assert.equal(dataSource.data().length, 2);
        });

        it("cancelChanges does not revert it passed model is removed", function() {
            var model = dataSource.get(1);

            dataSource.get(2).set("foo", "bar");
            dataSource.remove(model);

            dataSource.cancelChanges(model);

            assert.equal(dataSource.get(2).foo, "bar");
            assert.equal(dataSource.data().length, 1);
        });

        it("indexOf returns the index of model", function() {
            var model = dataSource.get(1);

            assert.equal(dataSource.indexOf(model), 0);
        });
        it("indexOf returns -1 if model is undefined", function() {
            var model = dataSource.get();

            assert.equal(dataSource.indexOf(model), -1);
        });


        it("indexOf returns -1 if model does is not contained in the data source", function() {
            assert.equal(dataSource.indexOf(new kendo.data.Model()), -1);
        });

        it("removes model from grouped data", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }, { foo: 1, id: 1 }],
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

            assert.deepEqual(removedModel, model);
            assert.equal(removedModel.foo, 1);
            assert.equal(removedModel.id, 0);
            assert.equal(dataSource.data()[0].items.length, 1);
        });

        it("removes model from nested grouped data", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: { id: "id" },
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
                group: [{ field: "foo" }, { field: "bar" }]
            });

            dataSource.read();
            var model = dataSource.get(1);
            var removedModel = dataSource.remove(model);

            assert.deepEqual(removedModel, model);
            assert.equal(removedModel.foo, 1);
            assert.equal(removedModel.id, 1);
            assert.equal(dataSource.data()[0].items[0].items.length, 1);
        });

        it("cancelChanges does revert changes if server grouping is enabled", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: { id: "id" },
                    parse: function(data) {
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
                group: [{ field: "foo" }, { field: "bar" }]
            });

            dataSource.read();

            var model = dataSource.get(1);

            dataSource.remove(model);

            dataSource.cancelChanges();

            assert.isOk(dataSource.get(1));
            assert.equal(dataSource.data()[0].items[0].items.length, 2);
        });

        it("cancelChanges does revert changes for given model if server grouping is enabled", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: { id: "id" },
                    parse: function(data) {
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
                group: [{ field: "foo" }, { field: "bar" }]
            });

            dataSource.read();

            var model = dataSource.get(1);

            model.set("bar", "boo");

            dataSource.cancelChanges(model);

            assert.equal(dataSource.get(1).get("bar"), "bar");
            assert.equal(dataSource.data()[0].items[0].items.length, 2);
        });

        it("item is of correct type after cancelChanges and server grouping", function() {
            var MyModel = kendo.data.Model.define({ id: "id" });

            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: MyModel,
                    parse: function(data) {
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
                group: [{ field: "foo" }, { field: "bar" }]
            });

            dataSource.read();

            var model = dataSource.get(1);

            model.set("bar", "boo");

            dataSource.cancelChanges();

            assert.isOk(dataSource.view()[0].items[0].items[0] instanceof MyModel);
        });

        it("adding items to array field sets the dirty flag to true", function() {
            var model = new kendo.data.Model({
                foo: []
            });

            model.foo.push("foo");

            assert.equal(model.dirty, true);
        });

        it("nullable field with default value is not initialized as null", function() {
            var model = kendo.data.Model.define({
                id: "personId",
                fields: {
                    name: {
                        type: "string"
                    },
                    color: {
                        type: 'string',
                        nullable: true,
                        defaultValue: '#000000'
                    }
                }
            });

            var person = new model({
            });

            assert.equal(person.color, "#000000");
        });

        it("adding items to array field updates dirtyFields", function() {
            var model = new kendo.data.Model({
                foo: []
            });

            model.foo.push("foo");

            assert.isOk(model.dirtyFields["foo"]);
        });

        it("removing items from array field sets the dirty flag to true", function() {
            var model = new kendo.data.Model({
                foo: ["foo"]
            });

            model.foo.pop();

            assert.equal(model.dirty, true);
        });

        it("removing items from array field updates dirtyFields", function() {
            var model = new kendo.data.Model({
                foo: ["foo"]
            });

            model.foo.pop();

            assert.isOk(model.dirtyFields["foo"]);
        });

        it("accept does not wrap field with underscore", function() {
            var model = new kendo.data.Model({
                _foo: {},
                bar: "bar"
            });

            model.accept({ _foo: { foo: "foo1" }, bar: "bar1" });

            assert.isOk(!(model._foo instanceof kendo.data.ObservableObject));
            assert.equal(model._foo.foo, "foo1");
        });

        it("accept resets dirty flag", function() {
            var model = new kendo.data.Model({
                foo: "bar"
            });

            model.accept({ foo: "bar2" });

            assert.isOk(!model.dirty);
        });

        it("accept resets dirtyFields", function() {
            var model = new kendo.data.Model({
                foo: "bar"
            });

            model.accept({ foo: "bar2" });

            assert.deepEqual(model.dirtyFields, {});
        });

        it("insert wraps the record in a group when servergrouping is enabled", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo"
                    }
                },
                serverGrouping: true,
                group: [{ field: "foo" }]
            });

            dataSource.insert(0, { foo: "bar" });

            var group = dataSource.view()[0];

            assert.equal(group.field, "foo");
            assert.equal(group.value, "bar");
            assert.equal(group.items.length, 1);
            assert.isOk(!group.hasSubgroups);
            assert.isOk(group.aggregates);
        });

        it("insert wraps the record in a group with correct default aggregates when servergrouping is enabled", function() {
            var dataSource = new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo"
                    }
                },
                serverGrouping: true,
                group: {
                    field: "foo", aggregates: [
                        { field: "foo", aggregate: "count" }
                    ]
                }
            });

            dataSource.insert(0, { foo: "bar" });

            var group = dataSource.view()[0];

            assert.equal(group.field, "foo");
            assert.equal(group.value, "bar");
            assert.equal(group.items.length, 1);
            assert.isOk(!group.hasSubgroups);

            assert.equal(group.aggregates.foo.count, 0);
        });

    });
}());
