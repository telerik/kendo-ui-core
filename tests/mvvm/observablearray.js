(function(){

test("pushing items to array raises the change event", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function() {
        ok(true, "change is raised");
    });

    viewModel.foo.push({});
});

test("pushing items to array raises the change event", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function() {
        ok(true, "change is raised");
    });

    viewModel.foo.push({});
});

test("items pushed to observable array are converted to observable objects", function() {
    var viewModel = kendo.observable({ foo: [] });
    viewModel.foo.push({});

    ok(viewModel.foo[0] instanceof kendo.data.ObservableObject);
});

test("Object should be wrapped", function() {
    var MyClass = kendo.Class.extend({});

    var viewModel = kendo.observable({ foo: [new MyClass()] });

    ok(viewModel.foo[0] instanceof kendo.data.ObservableObject);
});

test("ObservableObjects should be converted if type is set", function() {
    var ModelType = kendo.data.Model.define({});

    var array = new kendo.data.ObservableArray([new kendo.data.ObservableObject({})], ModelType);

    ok(array[0] instanceof kendo.data.ObservableObject);
    ok(array[0] instanceof ModelType);
});

test("pushing items to array raises the change event and sets the action to add", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "add");
    });

    viewModel.foo.push({});
});

test("pushing items to array raises the change event and sets the index", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.index, 1)
    });

    viewModel.foo.push({});
});

test("pushing items to array raises the change event and provides the added items", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.items.length, 1)
    });

    viewModel.foo.push({});
});

test("unshifting items to array raises the change event", function() {
    expect(3);

    var viewModel = kendo.observable({ foo: [] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "add");
        equal(e.index, 0);
        equal(e.items.length, 1);
    });

    viewModel.foo.unshift({});
});

test("items unshifted to array are converted to observable objects", 1, function() {
    var viewModel = kendo.observable({ foo: [] });

    viewModel.foo.bind("change", function(e) {
        ok(e.items[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
    });

    viewModel.foo.unshift({});
});

test("items spliced to array items are converted to observable objects", 2, function() {
    var viewModel = kendo.observable({ foo: [] });

    viewModel.foo.bind("change", function(e) {
        ok(e.items[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
    });

    viewModel.foo.splice(0, 0, {});

    ok(viewModel.foo[0] instanceof kendo.data.ObservableObject, "Should be ObservableObject");
});

test("splicing array items raises the change event with remove action", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "remove");
    });

    viewModel.foo.splice(0, 1);
});

test("splicing array items raises the change event and provides index", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.index, 0);
    });

    viewModel.foo.splice(0, 1);
});

test("splicing array items raises the change event and provides the removed items", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [{}] });

    viewModel.foo.bind("change", function(e) {
        equal(e.items.length, 1);
    });

    viewModel.foo.splice(0, 1);
});

test("splicing array items returns the removed items", function() {
    var viewModel = kendo.observable({ foo: [{}] });

    equal(viewModel.foo.splice(0, 1).length, 1);
});

test("splicing array items raises the change event with add action", function() {
    expect(1);

    var viewModel = kendo.observable({ foo: [] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "add");
    });

    viewModel.foo.splice(0, 1, {});
});

test("splicing array items raises the change event and sends the index and inserted items", function() {
    expect(2);

    var viewModel = kendo.observable({ foo: [] });

    viewModel.foo.bind("change", function(e) {
        equal(e.index, 0);
        equal(e.items.length, 1);
    });

    viewModel.foo.splice(0, 1, {});
});

test("observable array items are observable", function() {
    var viewModel = kendo.observable({ foo: [ {} ] });
    ok(viewModel.foo[0].bind);
});

test("change event is raised when child an item changes", 3, function() {
    var viewModel = kendo.observable({ foo: [ {} ] });

    viewModel.foo.bind("change", function(e) {
        equal(e.items[0], viewModel.foo[0]);
        equal(e.action, "itemchange");
        equal(e.field, "bar");
    });

    viewModel.foo[0].set("bar", "baz");
});

test("indexOf return index of the item", function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 } ] });

    equal(viewModel.foo.indexOf(viewModel.foo[0]), 0);
});

test("indexOf return -1 if item does not exists", function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 } ] });

    equal(viewModel.foo.indexOf({ bar: 42 }), -1);
});

test("pop raises the change event and removes the last item", 2, function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 } ] });
    var last = viewModel.foo[0];


    viewModel.foo.bind("change", function(e) {
        equal(e.items[0], last);
        equal(e.index, 0);
    });

    viewModel.foo.pop();
});

test("pop raises the change event and action is remove", 1, function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 } ] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "remove");
    });

    viewModel.foo.pop();
});

test("shift raises the change event and removes the first item", 2, function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 }, { bar: 2}  ] });
    var first = viewModel.foo[0];


    viewModel.foo.bind("change", function(e) {
        equal(e.items[0], first);
        equal(e.index, 0);
    });

    viewModel.foo.shift();
});

test("shift raises the change event and action is remove", 1, function() {
    var viewModel = kendo.observable({ foo: [ { bar: 1 } ] });

    viewModel.foo.bind("change", function(e) {
        equal(e.action, "remove");
    });

    viewModel.foo.shift();
});

test("shift does not raise the change event when the array is empty", 0, function() {
    var viewModel = kendo.observable({ foo: [ ] });

    viewModel.foo.bind("change", function(e) {
        ok(false, "Should not raise the change event when empty");
    });

    viewModel.foo.shift();
});

test("pop does not raise the change event when the array is empty", 0, function() {
    var viewModel = kendo.observable({ foo: [ ] });

    viewModel.foo.bind("change", function(e) {
        ok(false, "Should not raise the change event when empty");
    });

    viewModel.foo.pop();
});

test("private fields are not included in JSON serialization", function() {
    var viewModel = kendo.observable({ foo: [1] });

    equal(kendo.stringify(viewModel.foo), "[1]");
});

test("parent returns undefined for new observable array", function() {
    strictEqual((new kendo.data.ObservableArray([])).parent(), undefined);
});

test("adding item to nested array triggers change event of the parent", 1, function() {
    var viewModel = kendo.observable({ foo: [{
            bar: { items: [] }
        } ] });

    viewModel.get("foo").bind("change", function(e) {
        equal(e.action, "itemchange");
    });

    viewModel.get("foo")[0].bar.items.push({ baz: "moo" });
});

test("forEach calls callback for each item", 3, function() {
    var viewModel = kendo.observable({ foo: ["foo"] });

    viewModel.foo.forEach(function(value, index, item) {
        equal(value, "foo");
        strictEqual(index, 0);
        equal(item, viewModel.foo);
    });
});

test("map collects returned results from iteration", 2, function() {
    var viewModel = kendo.observable({ foo: [2, 4] });

    var result = viewModel.get("foo").map(function(value) {
        return value * 2;
    });

    equal(result[0], 4);
    equal(result[1], 8);
});

test("filter collects returned results from iteration", 2, function() {
    var viewModel = kendo.observable({ foo: [2, 3, 4] });

    var result = viewModel.get("foo").filter(function(value) {
        return value % 2 === 0;
    });

    equal(result[0], 2);
    equal(result[1], 4);
});

test("find returns the first item that matches the requirements", 1, function() {
    var viewModel = kendo.observable({ foo: [2, 3, 4] });

    var result = viewModel.get("foo").find(function(value) {
        return value % 2 === 1;
    });

    equal(result, 3);
});

test("every returns true if all items satisfy the provided requirement", 1, function() {
    var viewModel = kendo.observable({ foo: [2, 4] });

    var result = viewModel.get("foo").every(function(value) {
        return value % 2 === 0;
    });

    ok(result);
});

test("every returns false if one item does not satisfy the provided requirement", 1, function() {
    var viewModel = kendo.observable({ foo: [2, 3, 4] });

    var result = viewModel.get("foo").every(function(value) {
        return value % 2 === 0;
    });

    ok(!result);
});

test("some returns true if some items satisfy the provided requirement", 1, function() {
    var viewModel = kendo.observable({ foo: [2, 4] });

    var result = viewModel.get("foo").some(function(value) {
        return value % 2 === 0;
    });

    ok(result);
});

test("some returns false if no items satisfy the provided requirement", 1, function() {
    var viewModel = kendo.observable({ foo: [3, 5] });

    var result = viewModel.get("foo").some(function(value) {
        return value % 2 === 0;
    });

    ok(!result);
});

test("remove removes the given item", 2, function() {
    var viewModel = kendo.observable({ foo: [3, 5] });

    viewModel.foo.remove(3);

    equal(viewModel.foo.length, 1);
    equal(viewModel.foo[0], 5);
});

test("remove only removes if the item exists", 3, function() {
    var viewModel = kendo.observable({ foo: [3, 5] });

    viewModel.foo.remove(4);

    equal(viewModel.foo.length, 2);
    equal(viewModel.foo[0], 3);
    equal(viewModel.foo[1], 5);
});

test("empty removes all items", function() {
    var viewModel = kendo.observable({ foo: [3, 5] });

    viewModel.foo.empty();

    equal(viewModel.foo.length, 0);
});

}());
