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

test("pushCreate inserts a new item to the data source", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    dataSource.pushCreate(item);

    equal(dataSource.at(0).foo, "foo");
});

test("pushCreate returns the inserted item", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    var result = dataSource.pushCreate(item);

    equal(result.foo, "foo");
});

test("pushCreate wraps the inserted item as observable object", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    var result = dataSource.pushCreate(item);

    equal(result instanceof kendo.data.ObservableObject, true);
});

test("pushCreate doesn't wrap if the inserted item is already observable object", function() {
    var dataSource = new DataSource();

    var item = new kendo.data.Model();

    var result = dataSource.pushCreate(item);

    strictEqual(result, item);
});

test("pushCreate insert the item in the pristine collection", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    result = dataSource.pushCreate(item);

    equal(dataSource._pristineData[0].foo, item.foo);
});

test("items inserted via pushCreate remain in the data source after cancelChanges", function() {
    var dataSource = new DataSource();

    var item = { foo: "foo" };

    dataSource.add( { foo: "bar" });
    dataSource.pushCreate(item);
    dataSource.cancelChanges();

    equal(dataSource.at(0).foo, "foo");
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

    equal(dataSource.calls("pushCreate"), data.length);
    equal(dataSource.args("pushCreate", 0)[0], data[0]);
    equal(dataSource.args("pushCreate", 1)[0], data[1]);
});

}());
