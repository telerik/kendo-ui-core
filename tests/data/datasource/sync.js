(function() {

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

    describe("data source sync", function() {
        beforeEach(function() {
            jasmine.clock().install();
            setup();
        });
        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it("change is raised after new model is added to the set", function() {
            dataSource.bind("change", function(e) {
                assert.equal(e.action, "add");
            });

            dataSource.add({});
        });

        it("change is raised after model is deleted from the set", function() {
            dataSource.bind("change", function(e) {
                assert.equal(e.action, "remove");
            });

            dataSource.remove(dataSource.get(1));
        });

        it("data is processed after model changes are reverted", function() {
            dataSource.filter({ field: "id", operator: "ge", value: 1 });

            dataSource.add({ id: 3 });

            dataSource.bind("change", function() {
                assert.equal(dataSource.view().length, 1);
                assert.equal(dataSource.view()[0].id, 1);
            });

            dataSource.cancelChanges();
        });

        it("data is processed after model is added", function() {
            dataSource.filter({ field: "id", operator: "ge", value: 1 });

            dataSource.bind("change", function() {
                assert.equal(dataSource.view().length, 2);
                assert.equal(dataSource.view()[1].id, 3);
            });

            dataSource.add({ id: 3 });
        });

        it("add syncs when autoSync is true", function() {
            setup({ autoSync: true });

            stub(dataSource, "sync");

            dataSource.add({ foo: "bar" });

            assert.equal(dataSource.calls("sync"), 1);
        });

        it("remove syncs when autoSync is true", function() {
            setup({ autoSync: true });
            stub(dataSource, "sync");
            dataSource.remove(dataSource.get(1));

            assert.equal(dataSource.calls("sync"), 1);
        });

        it("update syncs when autoSync is true", function() {
            setup({ autoSync: true });
            stub(dataSource, "sync");

            dataSource.get(1).set("foo", "moo");

            assert.equal(dataSource.calls("sync"), 1);
        });

        it("add does not sync when autoSync is false", function() {
            stub(dataSource, "sync");
            dataSource.add({ foo: "bar" });

            assert.equal(dataSource.calls("sync"), 0);
        });

        it("remove does not sync when autoSync is false", function() {
            stub(dataSource, "sync");

            dataSource.remove(dataSource.get(1));

            assert.equal(dataSource.calls("sync"), 0);
        });

        it("sync calls the create method of the transport", function() {
            stub(dataSource.transport, "create");

            dataSource.add(new Model({ foo: "bar" }));
            dataSource.sync();

            assert.equal(dataSource.transport.calls("create"), 1);
        });

        it("sync does not call the create method of the transport if there are no new models", function() {
            stub(dataSource.transport, "create");

            dataSource.sync();

            assert.equal(dataSource.transport.calls("create"), 0);
        });

        it("sync sends the data of the created model to the create method of the transport", function() {
            stub(dataSource.transport, "create");

            dataSource.add(new Model({ foo: "bar" }));
            dataSource.sync();

            assert.equal(dataSource.transport.args("create")[0].data.foo, "bar");
        });

        it("sync sends the data of all created models to the create method of the transport", function() {
            stub(dataSource.transport, "create");

            dataSource.add(new Model({ foo: "bar" }));
            dataSource.add(new Model({ foo: "baz" }));
            dataSource.sync();

            assert.equal(dataSource.transport.calls("create"), 2);
            assert.equal(dataSource.transport.args("create", 0)[0].data.foo, "bar");
            assert.equal(dataSource.transport.args("create", 1)[0].data.foo, "baz");
        });

        it("sync calls the update method of the transport if there are updated models", function() {
            stub(dataSource.transport, "update");

            var model = dataSource.get(1);

            model.set("foo", "bar");
            dataSource.sync();

            assert.equal(dataSource.transport.calls("update"), 1);
        });

        it("sync does not call the update method of the transport if there are no updated models", function() {
            stub(dataSource.transport, "update");

            dataSource.sync();

            assert.equal(dataSource.transport.calls("update"), 0);
        });

        it("sync sends all updated models to the create method of the transport", function() {
            setup({ data: [{ id: 1 }, { id: 2 }] });

            stub(dataSource.transport, "update");

            var model = dataSource.get(1);
            model.set("foo", "bar");
            model = dataSource.get(2);
            model.set("foo", "baz");
            dataSource.sync();

            assert.equal(dataSource.transport.calls("update"), 2);
            assert.equal(dataSource.transport.args("update", 0)[0].data.foo, "bar");
            assert.equal(dataSource.transport.args("update", 0)[0].data.id, 1);
            assert.equal(dataSource.transport.args("update", 1)[0].data.id, 2);
            assert.equal(dataSource.transport.args("update", 1)[0].data.foo, "baz");
        });

        it("sync calls the destroy method of the transport if there are destroyed models", function() {
            stub(dataSource.transport, "destroy");

            var model = dataSource.get(1);
            dataSource.remove(model);
            dataSource.sync();

            assert.equal(dataSource.transport.calls("destroy"), 1);
        });

        it("sync calls change after destroy", function() {
            var model = dataSource.get(1),
                wasCalled = false;

            dataSource.remove(model);
            dataSource.bind("change", function() {
                wasCalled = true;
            });
            dataSource.sync();

            jasmine.clock().tick();

            assert.isOk(wasCalled);
        });

        it("sync does not call the destroy method of the transport if a new model is destroyed", function() {
            stub(dataSource.transport, "destroy");

            var model = new Model();
            dataSource.add(model);
            dataSource.remove(model);
            dataSource.sync();

            assert.equal(dataSource.transport.calls("destroy"), 0);
        });

        it("sync sends all destroyed models to the destroy method of the transport", function() {
            setup({ data: [{ id: 1 }, { id: 2 }] });
            stub(dataSource.transport, "destroy");

            var model = dataSource.get(1);
            dataSource.remove(model);
            model = dataSource.get(2);
            dataSource.remove(model);
            dataSource.sync();

            assert.equal(dataSource.transport.calls("destroy"), 2);
            assert.equal(dataSource.transport.args("destroy", 0)[0].data.id, 1);
            assert.equal(dataSource.transport.args("destroy", 1)[0].data.id, 2);
        });

        it("sync does not send the automatically generated id of new models", function() {
            stub(dataSource.transport, "create");

            var model = new Model();
            model.set("foo", "bar");
            dataSource.add(model);
            dataSource.sync();

            assert.equal(dataSource.transport.args("create", 0)[0].data.uid, undefined);
        });

        it("sync does not send the automatically generated id of updated models", function() {
            stub(dataSource.transport, "update");

            dataSource.get(1).set("foo", "bar");
            dataSource.sync();

            assert.equal(dataSource.transport.args("update", 0)[0].data.uid, undefined);
        });

        it("sync does not send the automatically generated id of destroyed models", function() {
            stub(dataSource.transport, "destroy");

            dataSource.remove(dataSource.get(1));
            dataSource.sync();

            assert.equal(dataSource.transport.args("destroy", 0)[0].data.uid, undefined);
        });

        it("sync calls the create method of the transport only once when batch is true", function() {
            setup({ batch: true });

            stub(dataSource.transport, "create");

            dataSource.add(new Model());
            dataSource.add(new Model());
            dataSource.sync();

            assert.equal(dataSource.transport.calls("create"), 1);
        });

        it("sync passes array of created models to transport when batch is true", function() {
            setup({ batch: true });

            stub(dataSource.transport, "create");

            dataSource.add(new Model({ foo: "foo" }));
            dataSource.add(new Model({ foo: "bar" }));
            dataSource.sync();

            var models = dataSource.transport.args("create")[0].data.models;

            assert.isOk($.isArray(models));
            assert.equal(models.length, 2);
            assert.equal(models[0].foo, "foo");
            assert.equal(models[1].foo, "bar");
        });

        it("sync does not send the uid of new models when batch is true", function() {
            setup({ batch: true });

            stub(dataSource.transport, "create");

            dataSource.add(new Model({ foo: "bar" }));
            dataSource.sync();

            var models = dataSource.transport.args("create")[0].data.models;

            assert.equal(models[0].uid, undefined);
        });

        it("sync calls the update method of the transport only once when batch is true", function() {
            setup({ batch: true, data: [{ id: 1 }, { id: 2 }] });

            stub(dataSource.transport, "update");

            var model = dataSource.get(1);
            model.set("foo", "foo");
            model = dataSource.get(2);
            model.set("foo", "bar");
            dataSource.sync();

            assert.equal(dataSource.transport.calls("update"), 1);
        });

        it("sync passes array of updated models to transport when batch is true", function() {
            setup({ batch: true, data: [{ id: 1 }, { id: 2 }] });

            stub(dataSource.transport, "update");

            var model = dataSource.get(1);
            model.set("foo", "foo");
            model = dataSource.get(2);
            model.set("foo", "bar");
            dataSource.sync();

            var models = dataSource.transport.args("update")[0].data.models;
            assert.isOk($.isArray(models));
            assert.equal(models.length, 2);
            assert.equal(models[0].foo, "foo");
            assert.equal(models[1].foo, "bar");
        });

        it("sync does not send the uid of updated models when batch is true", function() {
            setup({ batch: true });

            stub(dataSource.transport, "update");

            dataSource.get(1).set("foo", "bar");
            dataSource.sync();

            var models = dataSource.transport.args("update")[0].data.models;

            assert.equal(models[0].uid, undefined);
        });

        it("sync calls the destroy method of the transport only once when batch is true", function() {
            setup({ batch: true, data: [{ id: 1 }, { id: 2 }] });

            stub(dataSource.transport, "destroy");

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));
            dataSource.sync();

            assert.equal(dataSource.transport.calls("destroy"), 1);
        });

        it("sync passes array of destroyed models to transport when batch is true", function() {
            setup({ batch: true, data: [{ id: 1 }, { id: 2 }] });

            stub(dataSource.transport, "destroy");

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));
            dataSource.sync();


            var models = dataSource.transport.args("destroy")[0].data.models;
            assert.isOk($.isArray(models));
            assert.equal(models.length, 2);
            assert.equal(models[0].id, 1);
            assert.equal(models[1].id, 2);
        });

        it("sync does not send the uid of destroyed models when batch is true", function() {
            setup({ batch: true });

            stub(dataSource.transport, "destroy");

            dataSource.remove(dataSource.get(1));
            dataSource.sync();

            var models = dataSource.transport.args("destroy")[0].data.models;

            assert.equal(models[0].uid, undefined);
        });

        it("the updated data records are send to the if server grouping is enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }],
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
            assert.equal(models[0].foo, 2);
        });

        it("the created data records are send to the if server grouping is enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }],
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
            assert.equal(models[0].foo, 1);
            assert.equal(models.length, 1);
        });

        it("the destroyed data records are send to the if server grouping is enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }],
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
            assert.equal(models[0].foo, 1);
            assert.equal(models.length, 1);
        });

        it("hasChanges returns true if model is updated", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 0, foo: "bar" }]
            });

            dataSource.read();

            dataSource.get(0).set("foo", "baz");

            assert.isOk(dataSource.hasChanges());
        });

        it("hasChanges returns false if no changes are made", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 0, foo: "bar" }]
            });

            dataSource.read();

            assert.isOk(!dataSource.hasChanges());
        });

        it("hasChanges returns true if new model is added", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 0, foo: "bar" }]
            });

            dataSource.read();

            dataSource.add({});

            assert.isOk(dataSource.hasChanges());
        });

        it("hasChanges returns true if record is deleted", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 0, foo: "bar" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(0));

            assert.isOk(dataSource.hasChanges());
        });

        it("hasChanges returns true if model is updated on third page", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                pageSize: 1,
                data: [{ id: 0, foo: "bar" }, { id: 1, foo: "bar" }, { id: 2, foo: "bar" }]
            });

            dataSource.read();

            dataSource.at(2).set("foo", "baz");

            assert.isOk(dataSource.hasChanges());
        });

        it("hasChanges returns false if model is not updated with paging enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                pageSize: 1,
                data: [{ id: 0, foo: "bar" }, { id: 1, foo: "bar" }, { id: 2, foo: "bar" }]
            });

            dataSource.read();

            assert.isOk(!dataSource.hasChanges());
        });

        it("requestStart is called for each sync request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.bind("requestStart", function() {
                assert.isOk(true);
            });

            dataSource.add();

            dataSource.remove(dataSource.get(1));

            dataSource.get(2).set("foo", "moo");

            dataSource.sync();
        });

        it("requestStart contains request type for create request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.bind("requestStart", function(e) {
                assert.equal(e.type, "create");
            });

            dataSource.add();

            dataSource.sync();
        });

        it("requestStart contains request type for read request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.bind("requestStart", function(e) {
                assert.equal(e.type, "read");
            });

            dataSource.read();
        });

        it("requestStart contains request type for update request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.bind("requestStart", function(e) {
                assert.equal(e.type, "update");
            });

            dataSource.get(2).set("foo", "moo");

            dataSource.sync();
        });

        it("requestStart contains request type for destroy request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.bind("requestStart", function(e) {
                assert.equal(e.type, "destroy");
            });

            dataSource.remove(dataSource.get(1));

            dataSource.sync();
        });

        it("progress is called for each sync request", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.bind("progress", function() {
                assert.isOk(true);
            });

            dataSource.add();

            dataSource.remove(dataSource.get(1));

            dataSource.get(2).set("foo", "moo");

            dataSource.sync();
        });

        it("progress is called when batch operations are used", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function() { },
                    submit: function() { }
                },
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }],
                batch: true
            });

            dataSource.read();

            dataSource.bind("progress", function() {
                assert.isOk(true);
            });

            dataSource.add(new Model());
            dataSource.add(new Model());

            dataSource.sync();
        });

        it("total is correct after removing all items", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));

            dataSource.sync();

            assert.equal(dataSource.total(), 0);
        });

        it("total is correct after removing all items syncing and canceling the changes", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));

            dataSource.sync();

            jasmine.clock().tick();

            dataSource.cancelChanges();

            assert.equal(dataSource.total(), 0);
        });

        it("total is correct after removing all items, syncing adding new one and canceling the changes", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));

            dataSource.sync();

            dataSource.add({});

            jasmine.clock().tick();

            dataSource.sync();

            dataSource.cancelChanges();

            jasmine.clock().tick();

            assert.equal(dataSource.total(), 1);
        });

        it("total is updated after removing all items and adding new", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));

            dataSource.sync();

            dataSource.add({});

            assert.equal(dataSource.total(), 1);
        });

        it("total is updated after removing all items and adding new with autoSync", function() {
            var dataSource = new DataSource({
                autoSync: true,
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.remove(dataSource.get(1));
            dataSource.remove(dataSource.get(2));

            dataSource.add({});

            jasmine.clock().tick();
            assert.equal(dataSource.total(), 1);
        });

        it("sync returns promise", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            var promise = dataSource.sync();

            assert.isOk($.isFunction(promise.then));
        });

        it("sync returns promise when offline", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" }
                },
                data: [{ id: 1, foo: "bar" }, { id: 2, foo: "baz" }]
            });

            dataSource.read();

            dataSource.online(false);

            var promise = dataSource.sync();

            assert.isOk($.isFunction(promise.then));

            promise.then($.proxy(assert.isOk, this, true));

            jasmine.clock().tick();
        });

        it("sync calls the create method of the transport if submit is defined but not in batch mode", function() {
            setup({ batch: false });

            stub(dataSource.transport, "create");

            dataSource.add(new Model());
            dataSource.add(new Model());
            dataSource.sync();

            assert.equal(dataSource.transport.calls("create"), 2);
        });

        it("sync does not call the submit method of the transport if defined and not in batch mode", function() {
            setup({ batch: false });

            stub(dataSource.transport, "submit");

            dataSource.add(new Model());
            dataSource.add(new Model());
            dataSource.sync();

            assert.equal(dataSource.transport.calls("submit"), 0);
        });

        it("sync calls the submit method of the transport if defined", function() {
            setup({ batch: true });

            stub(dataSource.transport, "submit");

            dataSource.add(new Model());
            dataSource.add(new Model());
            dataSource.sync();

            assert.equal(dataSource.transport.calls("submit"), 1);
        });

        it("sync calls the submit method passing the created records", function() {
            setup({ batch: true });

            stub(dataSource.transport, "submit");

            dataSource.add(new Model({ foo: "bar" }));
            dataSource.add(new Model({ foo: "baz" }));
            dataSource.sync();

            var models = dataSource.transport.args("submit")[0].data.created;
            assert.equal(models.length, 2);
            assert.equal(models[0].foo, "bar");
            assert.equal(models[1].foo, "baz");
        });

        it("sync calls the submit method passing the updated records", function() {
            setup({ batch: true });

            stub(dataSource.transport, "submit");

            dataSource.at(0).set("foo", "bar");

            dataSource.sync();

            var models = dataSource.transport.args("submit")[0].data.updated;
            assert.equal(models.length, 1);
            assert.equal(models[0].foo, "bar");
        });

        it("sync calls the submit method passing the removed records", function() {
            setup({ batch: true });

            stub(dataSource.transport, "submit");

            dataSource.remove(dataSource.at(0));

            dataSource.sync();

            var models = dataSource.transport.args("submit")[0].data.destroyed;
            assert.equal(models.length, 1);
            assert.equal(models[0].foo, "foo");
        });


        it("sync calls the submit method passing the removed, updated and created records", function() {
            setup({ batch: true, data: [{ id: 1, foo: "foo" }, { id: 2, foo: "deleted" }] });

            stub(dataSource.transport, "submit");

            dataSource.at(0).set("foo", "updated");

            dataSource.remove(dataSource.at(1));

            dataSource.add(new Model({ foo: "created" }));

            dataSource.sync();

            var changes = dataSource.transport.args("submit")[0].data;

            assert.equal(changes.created.length, 1);
            assert.equal(changes.destroyed.length, 1);
            assert.equal(changes.updated.length, 1);

            assert.equal(changes.created[0].foo, "created");
            assert.equal(changes.updated[0].foo, "updated");
            assert.equal(changes.destroyed[0].foo, "deleted");
        });

        it("destoyed method returns the removed items", function() {
            setup();

            var removed = dataSource.at(0);
            dataSource.remove(removed);
            var result = dataSource.destroyed();

            assert.equal(result.length, 1);
            assert.deepEqual(removed, result[0]);
        });

        it("created method returns the added items", function() {
            setup();

            var first = dataSource.add();
            var second = dataSource.add();

            var result = dataSource.created();

            assert.equal(result.length, 2);
            assert.deepEqual(result[1], first);
            assert.deepEqual(result[0], second);
        });

        it("updated method returns the modified items", function() {
            setup({ data: [{ id: 1, foo: "foo" }, { id: 2, foo: "foo2" }] });

            var first = dataSource.at(0);
            first.set("foo", 1);

            var second = dataSource.at(1);
            second.set("foo", 2);

            var result = dataSource.updated();

            assert.equal(result.length, 2);
            assert.deepEqual(result[0], first);
            assert.deepEqual(result[1], second);
        });

        it("updated method does not return the dirty added items", function() {
            setup({ data: [{ id: 1, foo: "foo" }, { id: 2, foo: "foo2" }] });

            var first = dataSource.add();

            first.set("foo", 1);

            var result = dataSource.updated();

            assert.isOk(!result.length);
        });

        it("updated method returns modified records if server grouping is enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }],
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

            dataSource.read();

            dataSource.get(0).set("foo", 2);

            var updated = dataSource.updated();

            assert.equal(updated.length, 1);
            assert.equal(updated[0], dataSource.get(0));
        });

        it("created method returns added records if server grouping is enabled", function() {
            var dataSource = new DataSource({
                schema: {
                    model: { id: "id" },
                    groups: function(data) {
                        return [{
                            items: [{ foo: 1, id: 0 }],
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

            dataSource.read();

            var added = dataSource.add();

            var created = dataSource.created();

            assert.equal(created.length, 1);
            assert.equal(created[0], added);
        });

        it("deleted records are cleared when datasource is re-read", function() {
            var dataSource = new DataSource({
                data: [{ id: 1 }, { id: 2 }],
                schema: {
                    model: { id: "id" }
                }
            });

            dataSource.read();
            dataSource.remove(dataSource.at(0));

            dataSource.read();

            var destroyed = dataSource.destroyed();

            assert.equal(destroyed.length, 0);
        });

    });
}());
