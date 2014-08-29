(function(){

var getter = kendo.getter;

test("getter access property", function() {
    var dataItem = { foo: "bar" };
    equal(getter("foo")(dataItem), "bar");
});

test("getter access property of complex object", function() {
    var dataItem = { foo: { bar: "baz" } };
    equal(getter("foo.bar")(dataItem), "baz");
});

test("getter access object by indexer", function() {
    var dataItem = [{foo: "bar"}];
    equal(getter("[0].foo")(dataItem), "bar");
});

test("getter access property of array type by indexer", function() {
    var dataItem = {foo: [1,2,3,4]};
    equal(getter("foo[2]")(dataItem), 3);
});

test("getter access array", function() {
    var dataItem = [1,2,3,4];
    equal(getter("[2]")(dataItem), 3);
});

test("getter returns undefined for nonexisting property when in safe mode", function() {
    var dataItem = {foo: {} },
        safeMode = true;
    equal(getter("foo.bar.value", safeMode)(dataItem), undefined);
});

test("getter access property with safe option", function() {
    var dataItem = { foo: "bar" };
    equal(getter("foo", true)(dataItem), "bar");
});

test("getter access property of complex object with safe option", function() {
    var dataItem = { foo: { bar: "baz" } };
    equal(getter("foo.bar", true)(dataItem), "baz");
});

test("getter access object by indexer with safe option", function() {
    var dataItem = [{foo: "bar"}];
    equal(getter("[0].foo", true)(dataItem), "bar");
});

test("getter access nullable object by indexer with safe option", function() {
    var dataItem = [{}];
    equal(getter("[0].foo", true)(dataItem), undefined);
});

test("getter access nullable object property deeper nesting with safe option", function() {
    var dataItem = {};
    equal(getter("foo.bar['baz']", true)(dataItem), undefined);
});

test("getter access nullable object property with safe option", function() {
    var dataItem = {};
    equal(getter("foo['bar']", true)(dataItem), undefined);
});

test("getter access property of array type by indexer with safe option", function() {
    var dataItem = {foo: [1,2,3,4]};
    equal(getter("foo[2]", true)(dataItem), 3);
});

test("getter access property of index in complex object with safe option", function() {
    var dataItem = {foo: []};
    equal(getter("foo[2].bar", true)(dataItem), undefined);
});

test("getter access property of index in complex object with safe option and space", function() {
    var dataItem = {"f oo": []};
    equal(getter("['f oo'][2].bar", true)(dataItem), undefined);
});

test("getter access array with safe option", function() {
    var dataItem = [1,2,3,4];
    equal(getter("[2]", true)(dataItem), 3);
});

test("getter access with array access and double-quoted index", function() {
    var data = { foo: "foo" };

    equal("foo", kendo.getter('["foo"]')(data));
});

test("getter access with array access and single-quoted index", function() {
    var data = { foo: "foo" };

    equal("foo", kendo.getter("['foo']")(data));
});

test("getter access property with safe options type is correct", function() {
    var dataItem = { foo: { bar: 0 } };
    equal(getter("foo.bar", true)(dataItem), 0);
});

test("getter cache honors safe flag", function() {
    var dataItem = {};
    getter("foo.bar");
    equal(getter("foo.bar", true)(dataItem), undefined);
});

test("setter creates function which sets the specified expression", function() {
    var data = { foo: "foo" };

    kendo.setter("foo")(data, "bar");

    equal(data.foo, "bar");
});

test("setter and nested expressions", function() {
    var data = { foo: { bar: "bar" } };

    kendo.setter("foo.bar")(data, "baz");

    equal(data.foo.bar, "baz");
});

test("setter and array access expressions", function() {
    var data = { foo: "foo" };

    kendo.setter("['foo']")(data, "bar");

    equal(data.foo, "bar");
});

test("expr with custom parameter name", function() {
    equal("data.foo", kendo.expr("foo", "data"));
});

test("safe expr with custom parameter name", function() {
    equal("(data.foo)", kendo.expr("foo", true, "data"));
});
}());
