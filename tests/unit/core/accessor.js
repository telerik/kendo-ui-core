import '@progress/kendo-ui/src/kendo.core.js';

let getter = kendo.getter;

describe("accessor", function() {

    afterEach(function() {
        delete Object.prototype.kendoPolluted;
    });

    it("getter access property", function() {
        let dataItem = { foo: "bar" };
        assert.equal(getter("foo")(dataItem), "bar");
    });

    it("getter access property of complex object", function() {
        let dataItem = { foo: { bar: "baz" } };
        assert.equal(getter("foo.bar")(dataItem), "baz");
    });

    it("getter access object by indexer", function() {
        let dataItem = [{ foo: "bar" }];
        assert.equal(getter("[0].foo")(dataItem), "bar");
    });

    it("getter access property of array type by indexer", function() {
        let dataItem = { foo: [1, 2, 3, 4] };
        assert.equal(getter("foo[2]")(dataItem), 3);
    });

    it("getter access array", function() {
        let dataItem = [1, 2, 3, 4];
        assert.equal(getter("[2]")(dataItem), 3);
    });

    it("getter returns undefined for nonexisting property when in safe mode", function() {
        let dataItem = { foo: {} },
            safeMode = true;
        assert.equal(getter("foo.bar.value", safeMode)(dataItem), undefined);
    });

    it("getter access property with safe option", function() {
        let dataItem = { foo: "bar" };
        assert.equal(getter("foo", true)(dataItem), "bar");
    });

    it("getter access property of complex object with safe option", function() {
        let dataItem = { foo: { bar: "baz" } };
        assert.equal(getter("foo.bar", true)(dataItem), "baz");
    });

    it("getter access object by indexer with safe option", function() {
        let dataItem = [{ foo: "bar" }];
        assert.equal(getter("[0].foo", true)(dataItem), "bar");
    });

    it("getter access nullable object by indexer with safe option", function() {
        let dataItem = [{}];
        assert.equal(getter("[0].foo", true)(dataItem), undefined);
    });

    it("getter access nullable object property deeper nesting with safe option", function() {
        let dataItem = {};
        assert.equal(getter("foo.bar['baz']", true)(dataItem), undefined);
    });

    it("getter access nullable object property with safe option", function() {
        let dataItem = {};
        assert.equal(getter("foo['bar']", true)(dataItem), undefined);
    });

    it("getter access property of array type by indexer with safe option", function() {
        let dataItem = { foo: [1, 2, 3, 4] };
        assert.equal(getter("foo[2]", true)(dataItem), 3);
    });

    it("getter access property of index in complex object with safe option", function() {
        let dataItem = { foo: [] };
        assert.equal(getter("foo[2].bar", true)(dataItem), undefined);
    });

    it("getter access property of index in complex object with safe option and space", function() {
        let dataItem = { "f oo": [] };
        assert.equal(getter("['f oo'][2].bar", true)(dataItem), undefined);
    });

    it("getter access array with safe option", function() {
        let dataItem = [1, 2, 3, 4];
        assert.equal(getter("[2]", true)(dataItem), 3);
    });

    it("getter access with array access and double-quoted index", function() {
        let data = { foo: "foo" };

        assert.equal("foo", kendo.getter('["foo"]')(data));
    });

    it("getter access with array access and single-quoted index", function() {
        let data = { foo: "foo" };

        assert.equal("foo", kendo.getter("['foo']")(data));
    });

    it("getter access property with safe options type is correct", function() {
        let dataItem = { foo: { bar: 0 } };
        assert.equal(getter("foo.bar", true)(dataItem), 0);
    });

    it("getter cache honors safe flag", function() {
        let dataItem = {};
        getter("foo.bar");
        assert.equal(getter("foo.bar", true)(dataItem), undefined);
    });

    it("setter creates function which sets the specified expression", function() {
        let data = { foo: "foo" };

        kendo.setter("foo")(data, "bar");

        assert.equal(data.foo, "bar");
    });

    it("setter and nested expressions", function() {
        let data = { foo: { bar: "bar" } };

        kendo.setter("foo.bar")(data, "baz");

        assert.equal(data.foo.bar, "baz");
    });

    it("setter and array access expressions", function() {
        let data = { foo: "foo" };

        kendo.setter("['foo']")(data, "bar");

        assert.equal(data.foo, "bar");
    });

    it("setter does not pollute Object prototype through __proto__", function() {
        kendo.setter("__proto__.kendoPolluted")({}, true);

        assert.isUndefined(Object.prototype.kendoPolluted);
    });

    it("setter does not pollute Object prototype through constructor", function() {
        kendo.setter("constructor.prototype.kendoPolluted")({}, true);

        assert.isUndefined(Object.prototype.kendoPolluted);
    });

    it("setter does not pollute Object prototype through prototype", function() {
        kendo.setter("prototype.kendoPolluted")(Object, true);

        assert.isUndefined(Object.prototype.kendoPolluted);
    });

    it("getter cache ignores inherited entries", function() {
        Object.prototype.kendoGetterundefined = function() {
            return "polluted";
        };

        try {
            let data = { kendoGetter: "value" };

            assert.equal(kendo.getter("kendoGetter")(data), "value");
        } finally {
            delete Object.prototype.kendoGetterundefined;
        }
    });

    it("setter supports property names inherited by its cache", function() {
        let data = {};

        kendo.setter("toString")(data, "value");

        assert.equal(data.toString, "value");
    });

    it("expr with custom parameter name", function() {
        assert.equal("data.foo", kendo.expr("foo", "data"));
    });

    it("safe expr with custom parameter name", function() {
        assert.equal("(data.foo)", kendo.expr("foo", true, "data"));
    });

    it("safe expr with array accessor and \" ", function() {
        assert.equal(kendo.expr('["foo.bar"].baz', true), '((d["foo.bar"] || {}).baz)');
    });

    it("safe expr with array accessor and ' ", function() {
        assert.equal(kendo.expr("['foo.bar'].baz", true), "((d['foo.bar'] || {}).baz)");
    });

});
