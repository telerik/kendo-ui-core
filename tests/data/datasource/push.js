(function(){

var DataSource = kendo.data.DataSource;

module("data source push");

test("push is invoked when the data source is initialized", function(){
    var transport = stub({}, "push");

    new DataSource({ transport: transport })

    equal(transport.calls("push"), 1);
});

test("push of custom transport is invoked", function(){
    var transport = stub({ read: function() {} }, "push");

    new DataSource({ transport: transport })

    equal(transport.calls("push"), 1);
});

test("pushCreate option is passed to the push method", 1, function() {
    var transport = {
        push: function(options) {
            ok($.isFunction(options.pushCreate));
        }
    };

    new DataSource( { transport : transport });
});

test("pushUpdate option is passed to the push method", 1, function() {
    var transport = {
        push: function(options) {
            ok($.isFunction(options.pushUpdate));
        }
    };

    new DataSource( { transport : transport });
});

test("pushDestroy option is passed to the push method", 1, function() {
    var transport = {
        push: function(options) {
            ok($.isFunction(options.pushDestroy));
        }
    };

    new DataSource( { transport : transport });
});

test("pushCreate option calls _pushCreate of the data source", function() {
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

        var dataSource = new DataSource({ transport : transport });

        transportPushCreate();

        equal(dataSource.calls("_pushCreate"), 1);

    } finally {
       DataSource.fn._pushCreate = _pushCreate;
    }
});

test("pushUpdate option calls _pushUpdate of the data source", function() {
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

        var dataSource = new DataSource({ transport : transport });

        transportPushUpdate();

        equal(dataSource.calls("_pushUpdate"), 1);

    } finally {
       DataSource.fn._pushUpdate = _pushUpdate;
    }
});

test("pushDestroy option calls _pushDestroy of the data source", function() {
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

        var dataSource = new DataSource({ transport : transport });

        transportPushDestroy();

        equal(dataSource.calls("_pushDestroy"), 1);

    } finally {
       DataSource.fn._pushDestroy = _pushDestroy;
    }
});

test("pushCreate inserts a new item in the data source", function() {
    var dataSource = new DataSource();

    dataSource.pushCreate({ foo: "foo" });

    equal(dataSource.at(0).foo, "foo");
});

test("pushCreate does not wrap observable objects", function() {
    var dataSource = new DataSource();

    var observableObject = new kendo.data.ObservableObject({ foo: "foo" });

    dataSource.pushCreate(observableObject);

    equal(observableObject.uid, dataSource.at(0).uid);
});

test("pushCreate updates the total when autoSync is set to true", function() {
    var dataSource = new DataSource({
       autoSync: true
    });

    dataSource.pushCreate({ foo: "foo" });

    equal(dataSource.total(), 1);
});

test("hasChanges returns false after pushCreate", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } }
    });

    dataSource.pushCreate({ id: 1, foo: "foo" });

    equal(dataSource.hasChanges(), false);
});

test("isNew returns false after pushCreate", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } }
    });

    dataSource.pushCreate({ id: 1, foo: "foo" });

    equal(dataSource.at(0).isNew(), false);
});

test("pushCreate raises the change event", 2, function() {
    var dataSource = new DataSource({
        change: function(e) {
            equal(e.action, "add");
            equal(e.items[0].foo, "foo");
        }
    });

    dataSource.pushCreate({ id: 1, foo: "foo" });
});

test("pushCreate inserts an array of items in the data source", function() {
    var dataSource = new DataSource();

    dataSource.pushCreate([
        { foo: "foo" },
        { foo: "bar" }
    ]);

    equal(dataSource.at(1).foo, "bar");
});

test("pushCreate fires the push event", 5, function() {
    var dataSource = new DataSource({
        push: function(e) {
            equal(e.items.length, 2);
            equal(e.type, "create");
            equal(e.items[0] instanceof kendo.data.ObservableObject, true);
            equal(e.items[0].foo, "foo");
            equal(e.items[1].foo, "bar");
        }
    });

    dataSource.pushCreate([
        { foo: "foo" },
        { foo: "bar" }
    ]);
});

test("pushUpdate updates an existing item", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate({ id: 1, foo: "bar" });

    equal(dataSource.at(0).foo, "bar");
});

test("hasChanges returns false after pushUpdate", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate({ id: 1, foo: "bar" });

    equal(dataSource.hasChanges(), false);
});

test("pushUpdate raises the change event", 2, function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.bind("change", function(e){
        equal(e.action, "itemchange");
        equal(e.items[0].foo, "bar");
    });

    dataSource.pushUpdate({ id: 1, foo: "bar" });
});

test("pushUpdate updates an array of existing items", function() {
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

    equal(dataSource.at(1).foo, "bar");
});

test("pushUpdate fires the push event", 5, function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        push: function(e) {
            equal(e.items.length, 2);
            equal(e.type, "update");
            equal(e.items[0] instanceof kendo.data.ObservableObject, true);
            equal(e.items[0].foo, "bar");
            equal(e.items[1].foo, "bar");
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

test("pushUpdate updates the total when autoSync is set to true", function() {
    var dataSource = new DataSource({
       autoSync: true
    });

    dataSource.pushUpdate({ foo: "foo" });

    equal(dataSource.total(), 1);
});

test("pushDestroy removes an existing item", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushDestroy({ id: 1 });

    equal(dataSource.data().length, 0);
});

test("pushDestroy updates the total when autoSync is set to true", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();
    dataSource.pushDestroy({ id: 1 });

    equal(dataSource.total(), 0);
});

test("hasChanges returns false after pushDestroy", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushDestroy({ id: 1 });

    equal(dataSource.hasChanges(), false);
});

test("pushDestroy raises the change event", 2, function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.bind("change", function(e){
        equal(e.action, "remove");
        equal(e.items[0].foo, "foo");
    });

    dataSource.pushDestroy({ id: 1 });
});

test("pushDestroy removes an array of existing items", function() {
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

    equal(dataSource.data().length, 0);
});

test("pushDestroy fires the push event", 5, function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        push: function(e) {
            equal(e.items.length, 2);
            equal(e.type, "destroy");
            ok(e.items[0] instanceof kendo.data.ObservableObject);
            equal(e.items[0].foo, "foo");
            equal(e.items[1].foo, "foo");
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

test("pushDestroy removes an existing from the pristine collection", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushDestroy({ id: 1 });

    equal(dataSource._pristineData.length, 0);
});

test("pushUpdate doesn't set the dirty flag", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate({ id: 1, foo: "bar" });

    equal(dataSource.at(0).dirty, false);
});

test("pushUpdate with observable object instance as parameter", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate(new kendo.data.ObservableObject({ id: 1, foo: "bar" }));

    equal(dataSource.at(0).foo, "bar");
});

test("pushUpdate with model instance as parameter", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate(new kendo.data.Model({ id: 1, foo: "bar" }));

    equal(dataSource.at(0).foo, "bar");
});

test("pushCreate inserts the item in the pristine collection", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    result = dataSource.pushCreate(item);

    equal(dataSource._pristineData[0].foo, item.foo);
});

test("pushUpdate updates the model instance in the pristine collection", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } },
        data: [ { id: 1, foo: "foo" }]
    });

    dataSource.read();

    dataSource.pushUpdate({ id: 1, foo: "bar" });

    equal(dataSource._pristineData[0].foo, "bar");
});

test("items inserted via pushCreate remain in the data source after cancelChanges", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    dataSource.add( { foo: "bar" });
    dataSource.pushCreate(item);
    dataSource.cancelChanges();

    equal(dataSource.at(0).foo, "foo");
});

test("pushUpdate inserts the item if a model with corresponding id isn't found", function() {
    var dataSource = new DataSource({
        schema: { model: { id: "id" } }
    });

    dataSource.read();

    dataSource.pushUpdate({ id: 1, foo: "bar" });

    equal(dataSource.at(0).foo, "bar");
});

test("_pushCreate calls pushCreate for every item when data is returned according to the schema", function() {
    var dataSource = new DataSource({
        schema: {
            data: "d"
        }
    });

    dataSource = stub(dataSource, "pushCreate");

    var data = [ { }, { }];

    dataSource._pushCreate( { d: data });

    equal(dataSource.calls("pushCreate"), 1);
    equal(dataSource.args("pushCreate", 0)[0][0], data[0]);
    equal(dataSource.args("pushCreate", 0)[0][1], data[1]);
});

test("_pushUpdate calls pushUpdate for every item when data is returned according to the schema", function() {
    var dataSource = new DataSource({
        schema: {
            data: "d"
        }
    });

    dataSource = stub(dataSource, "pushUpdate");

    var data = [ { }, { }];

    dataSource._pushUpdate( { d: data });

    equal(dataSource.calls("pushUpdate"), 1);
    equal(dataSource.args("pushUpdate", 0)[0][0], data[0]);
    equal(dataSource.args("pushUpdate", 0)[0][1], data[1]);
});

test("_pushDestroy calls pushDestroy for every item when data is returned according to the schema", function() {
    var dataSource = new DataSource({
        schema: {
            data: "d"
        }
    });

    dataSource = stub(dataSource, "pushDestroy");

    var data = [ { }, { }];

    dataSource._pushDestroy( { d: data });

    equal(dataSource.calls("pushDestroy"), 1);
    equal(dataSource.args("pushDestroy", 0)[0][0], data[0]);
    equal(dataSource.args("pushDestroy", 0)[0][1], data[1]);
});

test("_push accepts array of items even if the schema expects an object", function() {
    var dataSource = new DataSource({
        schema: {
            data: "d"
        }
    });

    dataSource = stub(dataSource, "pushCreate");

    var data = [ { }, { }];

    dataSource._push( data, "pushCreate" );

    equal(dataSource.calls("pushCreate"), 1);
    equal(dataSource.args("pushCreate", 0)[0][0], data[0]);
    equal(dataSource.args("pushCreate", 0)[0][1], data[1]);
});

test("_push accepts a single item even if the schema expects an object", function() {
    var dataSource = new DataSource({
        schema: {
            data: "d"
        }
    });

    dataSource = stub(dataSource, "pushCreate");

    var item = { };

    dataSource._push(item, "pushCreate" );

    equal(dataSource.calls("pushCreate"), 1);
    equal(dataSource.args("pushCreate", 0)[0], item);
});

}());
