(function(){

test("set changes the value of the field", function() {
    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.set("foo", "foo");

    equal(viewModel.foo, "foo");
});

test("copies all fields of the source object", function() {
    var viewModel = kendo.observable({ foo: "bar" });

    equal(viewModel.foo, "bar");
});

test("context of methods is the view model", function() {
    var viewModel = kendo.observable({
        foo: function() {
            strictEqual(this, viewModel);
        }
    });

    viewModel.foo();
});

test("nested objects are observable as well", function() {
    var viewModel = kendo.observable({ foo: { bar: "baz" } });

    ok(viewModel.foo.get);
});

test("nested objects which are private are not observable", function() {
    var viewModel = kendo.observable({ _foo: { bar: "baz" } });

    ok(!(viewModel._foo instanceof kendo.data.ObservableObject));
});

test("set triggers the change event", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.bind("change", function() {
        ok(true, "change is raised");
    });

    viewModel.set("foo", "baz");
});

test("set triggers only once the change event if value is the same", 1, function() {
    var viewModel = kendo.observable({ foo: { foo: "bar" }});

    viewModel.bind("change", function() {
        ok(true, "change is raised");
    });

    viewModel.set("foo.foo", "baz");
    viewModel.set("foo.foo", "baz");
});

test("set bind to change once with composite paths", 1, function() {
    var viewModel = kendo.observable({ foo: { foo: [] }});

    // This works: viewModel.foo.set("foo", []);
    viewModel.set("foo.foo", []);

    viewModel.bind("change", function() {
        ok(true, "change is raised");
    });

    viewModel.get("foo.foo").push(1);
});

test("change event arguments provide the name of the field", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.bind("change", function(e) {
        equal(e.field, "foo");
    });

    viewModel.set("foo", "baz");
});

test("setting nested fields", function() {
    var viewModel = kendo.observable({ foo: { bar: "bar" } });

    viewModel.set("foo.bar", "baz");

    equal(viewModel.foo.bar, "baz");
});

test("nested arrays are extended", function() {
    var viewModel = kendo.observable({ foo: [{}] });

    equal(typeof viewModel.foo.bind, "function");
});

asyncTest("getting field raises get event", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.bind("get", function(e) {
        start();

        equal(e.field, "foo");
    });

    viewModel.get("foo");
});

asyncTest("setting a field raises set event", function() {
    expect(2);

    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.bind("set", function(e) {
        start();

        equal(e.field, "foo");
        equal(e.value, "foo");
    });

    viewModel.set("foo", "foo");
});

asyncTest("cancelling the set event prevents setting the field value", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: "bar" });

    viewModel.bind("set", function(e) {
        start();
        e.preventDefault();
    });

    viewModel.set("foo", "foo");
    equal(viewModel.foo, "bar");
});

asyncTest("getting nested field raises get event of parent", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: { bar: "bar" } });

    viewModel.bind("get", function(e) {
        start();
        equal(e.field, "foo.bar");
    });

    viewModel.foo.get("bar");
});

test("toJSON serializes only public fields", function() {
    var observable = kendo.observable({ foo: "bar", baz: function(){} });
    var json = observable.toJSON();
    var fields = [];

    for (var field in json) {
        fields.push(field);
    }

    equal(fields.length, 1);
    equal(fields[0], "foo");
    equal(json.foo, "bar");
});

test("toJSON is recursive", function() {
    var observable = kendo.observable({ foo: { bar: "bar", baz: function(){} } });
    var json = observable.toJSON();
    var fields = [];

    for (var field in json.foo) {
        fields.push(field);
    }

    equal(fields.length, 1);
    equal(fields[0], "bar");
});

test("toJSON is recursive with arrays", function() {
    var observable = kendo.observable({ foo: [{ bar: "bar" }] });
    var json = observable.toJSON();
    var fields = [];

    for (var field in json.foo[0]) {
        fields.push(field);
    }

    equal(fields.length, 1);
    equal(fields[0], "bar");
});

test("toJSON copies dates", function() {
    var date = new Date();
    var observable = kendo.observable({ foo: date } );
    var json = observable.toJSON();
    var fields = [];

    for (var field in json) {
        fields.push(field);
    }

    equal(fields.length, 1);
    equal(json.foo, date);
});

test("set uses the nested observable object set method", function() {
    var observable = kendo.observable({ foo: "bar", baz: { moo: "moo" } }),
        set  = stub(observable.baz, "set");

    observable.set("baz.moo", "42");
    equal(set.calls("set"), 1);
});

test("set uses the nested array with observable objects", function() {
    var observable = kendo.observable({ foo: "bar", baz: [{ moo: "moo" }] }),
        set  = stub(observable.baz[0], "set");

    observable.set("baz[0].moo", "42");
    equal(set.calls("set"), 1);
});

test("set object is wrapped", function() {
    var observable = kendo.observable({ foo: {} });

    observable.set("foo", { bar: "baz" });

    ok(observable.foo instanceof kendo.data.ObservableObject);
});

test("change event is raised if wrapped object is modified", 1, function() {
    var observable = kendo.observable({ foo: {} });

    observable.set("foo", { bar: "baz" });

    observable.bind("change", function() {
        ok(true);
    });

    observable.foo.set("bar", "moo");
});

test("ObservableObject are not wrapped if attached through set", function() {
    var observable = kendo.observable({ foo: {} });
    var nested = new kendo.data.ObservableObject({ bar: "baz" });
    observable.set("foo", nested);

    strictEqual(observable.foo, nested);
});

test("change event is raised for wrapped ObservableObject", 1, function() {
    var observable = kendo.observable({ foo: {} });
    var nested = new kendo.data.ObservableObject({ bar: "baz" });
    observable.set("foo", nested);

    observable.bind("change", function() {
        ok(true);
    });

    observable.foo.set("bar", "moo");
});


test("set Array is wrapped", function() {
    var observable = kendo.observable({ foo: [] });

    observable.set("foo", [1,2,3]);

    ok(observable.foo instanceof kendo.data.ObservableArray);
});

test("change event is raised if wrapped array is modified", 1, function() {
    var observable = kendo.observable({ foo: [] });

    observable.set("foo", []);

    observable.bind("change", function() {
        ok(true);
    });

    observable.foo.push(1);
});

test("DataSource is not wrapped if set as ViewModel property",function() {
    var observable = kendo.observable({ dataSource: new kendo.data.DataSource() });

    ok(!(observable.dataSource instanceof kendo.data.ObservableObject))
});

test("ObservableArray is not wrapped if set as ViewModel property",function() {
    var observable = kendo.observable({ items: new kendo.data.ObservableArray([1,2,3,4,5]) });

    ok(observable.items instanceof kendo.data.ObservableArray)
});

test("listen for changes of ObservableArray set as ViewModel property", 1,function() {
    var observable = kendo.observable({ items: new kendo.data.ObservableArray([1,2,3,4,5]) });

    observable.bind("change", function() { ok(true); });

    observable.get("items").push(6);
});

test("parent returns the parent observable object", function() {
    var observable = kendo.observable( {
        foo: {
        }
    });

    strictEqual(observable.foo.parent(), observable);
});

test("parent returns the parent observable array", function() {
    var observable = kendo.observable( {
        foo: [{}]
    });

    strictEqual(observable.foo[0].parent(), observable.foo);
});

test("parent returns the parent of the observable array", function() {
    var observable = kendo.observable( {
        foo: [{}]
    });

    strictEqual(observable.foo.parent(), observable);
});

test("parent returns undefined for root observable object", function() {
    strictEqual(kendo.observable({}).parent(), undefined);
});

test("setting object sets its parent", function() {
    var observable = kendo.observable({ });
    observable.set("foo", { bar: "baz" });

    strictEqual(observable.foo.parent(), observable);
});

test("datasource change event propagates to parent", 1, function() {
    var observable = new kendo.observable( {
        dataSource: new kendo.data.DataSource()
    });

    observable.bind("change", function(e) {
        equal(e.action, "add");
    });

    observable.dataSource.add({});
});

test("change events fire from top to bottom", 3, function() {
    var observable = kendo.observable({
        foo: {
            bar: {
                baz: ""
            }
        }
    });

    observable.bind("change", function(e) {
        equal(e.field, "foo.bar.baz");
    });

    observable.foo.bind("change", function(e) {
        equal(e.field, "bar.baz");
    });

    observable.foo.bar.bind("change", function(e) {
        equal(e.field, "baz");
    });

    observable.set("foo.bar.baz", "baz");
});


test("change event bubbles to top", 2, function() {
    var observable = kendo.observable({
        foo: [
            { bar: "bar" }
        ]
    });

    var expected = ["foo", "foo[0].bar"];

    observable.bind("change", function(e) {
        equal(e.field, expected.shift());
    });

    observable.set("foo[0].bar", "foo");
});

test("undefined is not wrapped", function() {
    var observable = new kendo.observable( {
        empty: undefined
    });

    ok(!(observable.get("empty") instanceof kendo.data.ObservableObject));
});

}());
