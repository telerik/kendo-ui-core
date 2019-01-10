(function() {

    var DataSource = kendo.data.DataSource;

    function remoteDataSource(options) {
        var total = (options || {}).total || 100,
            dataSource = new kendo.data.DataSource($.extend(true, {}, {
                serverPaging: true,
                transport: {
                    read: function(options) {
                        var take = options.data.take;
                        var skip = options.data.skip;
                        var data = [];

                        for (var i = skip; i < Math.min(skip + take, total); i++) {
                            data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                        }

                        options.success(data);
                    }
                },
                schema: {
                    model: {
                        id: "OrderID"
                    },
                    total: function() {
                        return total;
                    }
                },
                pageSize: 10
            }, options || {}));

        dataSource._total = total;
        return dataSource;
    }

    describe("data source push", function() {
        beforeEach(function() {
            //remove the setTimeout in dataSource.prefetch
            timeout = window.setTimeout;
            window.setTimeout = function(callback) {
                callback();
            };
        });
        afterEach(function() {
            window.setTimeout = timeout;
        });

        it("push is invoked when the data source is initialized", function() {
            var transport = stub({}, "push");

            new DataSource({ transport: transport })

            assert.equal(transport.calls("push"), 1);
        });

        it("push of custom transport is invoked", function() {
            var transport = stub({ read: function() { } }, "push");

            new DataSource({ transport: transport })

            assert.equal(transport.calls("push"), 1);
        });

        it("pushCreate option is passed to the push method", function() {
            var transport = {
                push: function(options) {
                    assert.isOk($.isFunction(options.pushCreate));
                }
            };

            new DataSource({ transport: transport });
        });

        it("pushUpdate option is passed to the push method", function() {
            var transport = {
                push: function(options) {
                    assert.isOk($.isFunction(options.pushUpdate));
                }
            };

            new DataSource({ transport: transport });
        });

        it("pushDestroy option is passed to the push method", function() {
            var transport = {
                push: function(options) {
                    assert.isOk($.isFunction(options.pushDestroy));
                }
            };

            new DataSource({ transport: transport });
        });

        it("pushCreate option calls _pushCreate of the data source", function() {
            var transportPushCreate;

            var transport = {
                push: function(options) {
                    transportPushCreate = options.pushCreate;
                }
            };

            var _pushCreate;

            try {
                _pushCreate = DataSource.fn._pushCreate;

                stub(DataSource.fn, "_pushCreate");

                var dataSource = new DataSource({ transport: transport });

                transportPushCreate();

                assert.equal(dataSource.calls("_pushCreate"), 1);

            } finally {
                DataSource.fn._pushCreate = _pushCreate;
            }
        });

        it("pushUpdate option calls _pushUpdate of the data source", function() {
            var transportPushUpdate;

            var transport = {
                push: function(options) {
                    transportPushUpdate = options.pushUpdate;
                }
            };

            var _pushUpdate;

            try {
                _pushUpdate = DataSource.fn._pushUpdate;

                stub(DataSource.fn, "_pushUpdate");

                var dataSource = new DataSource({ transport: transport });

                transportPushUpdate();

                assert.equal(dataSource.calls("_pushUpdate"), 1);

            } finally {
                DataSource.fn._pushUpdate = _pushUpdate;
            }
        });

        it("pushDestroy option calls _pushDestroy of the data source", function() {
            var transportPushDestroy;

            var transport = {
                push: function(options) {
                    transportPushDestroy = options.pushDestroy;
                }
            };

            var _pushDestroy;

            try {
                _pushDestroy = DataSource.fn._pushDestroy;

                stub(DataSource.fn, "_pushDestroy");

                var dataSource = new DataSource({ transport: transport });

                transportPushDestroy();

                assert.equal(dataSource.calls("_pushDestroy"), 1);

            } finally {
                DataSource.fn._pushDestroy = _pushDestroy;
            }
        });

        it("pushCreate inserts a new item in the data source", function() {
            var dataSource = new DataSource();

            dataSource.pushCreate({ foo: "foo" });

            assert.equal(dataSource.at(0).foo, "foo");
        });

        it("pushInsert inserts a new item in the data source without specifying index", function() {
            var dataSource = new DataSource();

            dataSource.pushInsert({ foo: "foo" });

            assert.equal(dataSource.at(0).foo, "foo");
        });

        it("pushInsert inserts a new item in specified index", function() {
            var dataSource = new DataSource();

            dataSource.pushCreate([{ foo: "bar" }, { foo: "baz" }, { foo: "bat" }]);

            dataSource.pushInsert(1, { foo: "foo" });

            assert.equal(dataSource.at(1).foo, "foo");
        });

        it("pushCreate does not wrap observable objects", function() {
            var dataSource = new DataSource();

            var observableObject = new kendo.data.ObservableObject({ foo: "foo" });

            dataSource.pushCreate(observableObject);

            assert.equal(observableObject.uid, dataSource.at(0).uid);
        });

        it("pushCreate updates the total when autoSync is set to true", function() {
            var dataSource = new DataSource({
                autoSync: true
            });

            dataSource.pushCreate({ foo: "foo" });

            assert.equal(dataSource.total(), 1);
        });

        it("hasChanges returns false after pushCreate", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } }
            });

            dataSource.pushCreate({ id: 1, foo: "foo" });

            assert.equal(dataSource.hasChanges(), false);
        });

        it("isNew returns false after pushCreate", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } }
            });

            dataSource.pushCreate({ id: 1, foo: "foo" });

            assert.equal(dataSource.at(0).isNew(), false);
        });

        it("pushCreate raises the change event", function() {
            var dataSource = new DataSource({
                change: function(e) {
                    assert.equal(e.action, "add");
                    assert.equal(e.items[0].foo, "foo");
                }
            });

            dataSource.pushCreate({ id: 1, foo: "foo" });
        });

        it("pushCreate inserts an array of items in the data source", function() {
            var dataSource = new DataSource();

            dataSource.pushCreate([
                { foo: "foo" },
                { foo: "bar" }
            ]);

            assert.equal(dataSource.at(1).foo, "bar");
        });

        it("pushCreate fires the push event", function() {
            var dataSource = new DataSource({
                push: function(e) {
                    assert.equal(e.items.length, 2);
                    assert.equal(e.type, "create");
                    assert.equal(e.items[0] instanceof kendo.data.ObservableObject, true);
                    assert.equal(e.items[0].foo, "foo");
                    assert.equal(e.items[1].foo, "bar");
                }
            });

            dataSource.pushCreate([
                { foo: "foo" },
                { foo: "bar" }
            ]);
        });

        it("pushUpdate updates an existing item", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate({ id: 1, foo: "bar" });

            assert.equal(dataSource.at(0).foo, "bar");
        });

        it("hasChanges returns false after pushUpdate", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate({ id: 1, foo: "bar" });

            assert.equal(dataSource.hasChanges(), false);
        });

        it("pushUpdate raises the change event", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.bind("change", function(e) {
                assert.equal(e.action, "itemchange");
                assert.equal(e.items[0].foo, "bar");
            });

            dataSource.pushUpdate({ id: 1, foo: "bar" });
        });

        it("pushUpdate updates an array of existing items", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [
                    { id: 1, foo: "foo" },
                    { id: 2, foo: "foo" }
                ]
            });

            dataSource.read();

            dataSource.pushUpdate([
                { id: 1, foo: "bar" },
                { id: 2, foo: "bar" }
            ]);

            assert.equal(dataSource.at(1).foo, "bar");
        });

        it("pushUpdate fires the push event", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                push: function(e) {
                    assert.equal(e.items.length, 2);
                    assert.equal(e.type, "update");
                    assert.equal(e.items[0] instanceof kendo.data.ObservableObject, true);
                    assert.equal(e.items[0].foo, "bar");
                    assert.equal(e.items[1].foo, "bar");
                },
                data: [
                    { id: 1, foo: "foo" },
                    { id: 2, foo: "foo" }
                ]
            });

            dataSource.read();

            dataSource.pushUpdate([
                { id: 1, foo: "bar" },
                { id: 2, foo: "bar" }
            ]);
        });

        it("pushUpdate updates the total when autoSync is set to true", function() {
            var dataSource = new DataSource({
                autoSync: true
            });

            dataSource.pushUpdate({ foo: "foo" });

            assert.equal(dataSource.total(), 1);
        });

        it("pushDestroy removes an existing item", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushDestroy({ id: 1 });

            assert.equal(dataSource.data().length, 0);
        });

        it("pushDestroy updates the total when autoSync is set to true", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();
            dataSource.pushDestroy({ id: 1 });

            assert.equal(dataSource.total(), 0);
        });

        it("hasChanges returns false after pushDestroy", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushDestroy({ id: 1 });

            assert.equal(dataSource.hasChanges(), false);
        });

        it("pushDestroy raises the change event", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.bind("change", function(e) {
                assert.equal(e.action, "remove");
                assert.equal(e.items[0].foo, "foo");
            });

            dataSource.pushDestroy({ id: 1 });
        });

        it("pushDestroy removes an array of existing items", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [
                    { id: 1, foo: "foo" },
                    { id: 2, foo: "foo" }
                ]
            });

            dataSource.read();

            dataSource.pushDestroy([
                { id: 1 },
                { id: 2 }
            ]);

            assert.equal(dataSource.data().length, 0);
        });

        it("pushDestroy fires the push event", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                push: function(e) {
                    assert.equal(e.items.length, 2);
                    assert.equal(e.type, "destroy");
                    assert.isOk(e.items[0] instanceof kendo.data.ObservableObject);
                    assert.equal(e.items[0].foo, "foo");
                    assert.equal(e.items[1].foo, "foo");
                },
                data: [
                    { id: 1, foo: "foo" },
                    { id: 2, foo: "foo" }
                ]
            });

            dataSource.read();

            dataSource.pushDestroy([
                { id: 1 },
                { id: 2 }
            ]);
        });

        it("pushDestroy removes an existing from the pristine collection", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushDestroy({ id: 1 });

            assert.equal(dataSource._pristineData.length, 0);
        });

        it("pushDestroy removes an existing from the range pristine collection", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.range(20, 10);

            dataSource.pushDestroy({ OrderID: 20 });

            assert.equal(dataSource._ranges[1].pristineData.length, 9);
            assert.equal(dataSource._ranges[1].pristineData[0].OrderID, 21);
        });

        it("pushUpdate doesn't set the dirty flag", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate({ id: 1, foo: "bar" });

            assert.equal(dataSource.at(0).dirty, false);
        });

        it("pushUpdate with observable object instance as parameter", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate(new kendo.data.ObservableObject({ id: 1, foo: "bar" }));

            assert.equal(dataSource.at(0).foo, "bar");
        });

        it("pushUpdate with model instance as parameter", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate(new kendo.data.Model({ id: 1, foo: "bar" }));

            assert.equal(dataSource.at(0).foo, "bar");
        });

        it("pushCreate inserts the item in the pristine collection", function() {
            var dataSource = new DataSource();

            var item = { foo: "foo" };

            result = dataSource.pushCreate(item);

            assert.equal(dataSource._pristineData[0].foo, item.foo);
        });

        it("pushCreate inserts the item in the range pristine collection", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.range(20, 10);

            dataSource.pushCreate({ OrderID: 100 });

            assert.equal(dataSource._ranges[1].pristineData[10].OrderID, 100);
        });

        it("pushUpdate updates the model instance in the pristine collection", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } },
                data: [{ id: 1, foo: "foo" }]
            });

            dataSource.read();

            dataSource.pushUpdate({ id: 1, foo: "bar" });

            assert.equal(dataSource._pristineData[0].foo, "bar");
        });

        it("pushUpdate updates the model instance in the range pristine collection", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.range(20, 10);

            dataSource.pushUpdate({ OrderID: 20, ShipAddress: "new value" });

            assert.equal(dataSource._ranges[1].pristineData[0].ShipAddress, "new value");
        });

        it("items inserted via pushCreate remain in the data source after cancelChanges", function() {
            var dataSource = new DataSource();

            var item = { foo: "foo" };

            dataSource.add({ foo: "bar" });
            dataSource.pushCreate(item);
            dataSource.cancelChanges();

            assert.equal(dataSource.at(0).foo, "foo");
        });

        it("pushUpdate inserts the item if a model with corresponding id isn't found", function() {
            var dataSource = new DataSource({
                schema: { model: { id: "id" } }
            });

            dataSource.read();

            dataSource.pushUpdate({ id: 1, foo: "bar" });

            assert.equal(dataSource.at(0).foo, "bar");
        });

        it("_pushCreate calls pushCreate for every item when data is returned according to the schema", function() {
            var dataSource = new DataSource({
                schema: {
                    data: "d"
                }
            });

            dataSource = stub(dataSource, "pushCreate");

            var data = [{}, {}];

            dataSource._pushCreate({ d: data });

            assert.equal(dataSource.calls("pushCreate"), 1);
            assert.equal(dataSource.args("pushCreate", 0)[0][0], data[0]);
            assert.equal(dataSource.args("pushCreate", 0)[0][1], data[1]);
        });

        it("_pushUpdate calls pushUpdate for every item when data is returned according to the schema", function() {
            var dataSource = new DataSource({
                schema: {
                    data: "d"
                }
            });

            dataSource = stub(dataSource, "pushUpdate");

            var data = [{}, {}];

            dataSource._pushUpdate({ d: data });

            assert.equal(dataSource.calls("pushUpdate"), 1);
            assert.equal(dataSource.args("pushUpdate", 0)[0][0], data[0]);
            assert.equal(dataSource.args("pushUpdate", 0)[0][1], data[1]);
        });

        it("_pushDestroy calls pushDestroy for every item when data is returned according to the schema", function() {
            var dataSource = new DataSource({
                schema: {
                    data: "d"
                }
            });

            dataSource = stub(dataSource, "pushDestroy");

            var data = [{}, {}];

            dataSource._pushDestroy({ d: data });

            assert.equal(dataSource.calls("pushDestroy"), 1);
            assert.equal(dataSource.args("pushDestroy", 0)[0][0], data[0]);
            assert.equal(dataSource.args("pushDestroy", 0)[0][1], data[1]);
        });

        it("_push accepts array of items even if the schema expects an object", function() {
            var dataSource = new DataSource({
                schema: {
                    data: "d"
                }
            });

            dataSource = stub(dataSource, "pushCreate");

            var data = [{}, {}];

            dataSource._push(data, "pushCreate");

            assert.equal(dataSource.calls("pushCreate"), 1);
            assert.equal(dataSource.args("pushCreate", 0)[0][0], data[0]);
            assert.equal(dataSource.args("pushCreate", 0)[0][1], data[1]);
        });

        it("_push accepts a single item even if the schema expects an object", function() {
            var dataSource = new DataSource({
                schema: {
                    data: "d"
                }
            });

            dataSource = stub(dataSource, "pushCreate");

            var item = {};

            dataSource._push(item, "pushCreate");

            assert.equal(dataSource.calls("pushCreate"), 1);
            assert.equal(dataSource.args("pushCreate", 0)[0], item);
        });

    });
}());
