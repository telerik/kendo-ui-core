(function() {

    var getter = kendo.getter;

    describe("accessor", function() {

        it("getter access property", function() {
            var dataItem = { foo: "bar" };
            assert.equal(getter("foo")(dataItem), "bar");
        });

        it("getter access property of complex object", function() {
            var dataItem = { foo: { bar: "baz" } };
            assert.equal(getter("foo.bar")(dataItem), "baz");
        });

        it("getter access object by indexer", function() {
            var dataItem = [{ foo: "bar" }];
            assert.equal(getter("[0].foo")(dataItem), "bar");
        });

        it("getter access property of array type by indexer", function() {
            var dataItem = { foo: [1, 2, 3, 4] };
            assert.equal(getter("foo[2]")(dataItem), 3);
        });

        it("getter access array", function() {
            var dataItem = [1, 2, 3, 4];
            assert.equal(getter("[2]")(dataItem), 3);
        });

        it("getter returns undefined for nonexisting property when in safe mode", function() {
            var dataItem = { foo: {} },
                safeMode = true;
            assert.equal(getter("foo.bar.value", safeMode)(dataItem), undefined);
        });

        it("getter access property with safe option", function() {
            var dataItem = { foo: "bar" };
            assert.equal(getter("foo", true)(dataItem), "bar");
        });

        it("getter access property of complex object with safe option", function() {
            var dataItem = { foo: { bar: "baz" } };
            assert.equal(getter("foo.bar", true)(dataItem), "baz");
        });

        it("getter access object by indexer with safe option", function() {
            var dataItem = [{ foo: "bar" }];
            assert.equal(getter("[0].foo", true)(dataItem), "bar");
        });

        it("getter access nullable object by indexer with safe option", function() {
            var dataItem = [{}];
            assert.equal(getter("[0].foo", true)(dataItem), undefined);
        });

        it("getter access nullable object property deeper nesting with safe option", function() {
            var dataItem = {};
            assert.equal(getter("foo.bar['baz']", true)(dataItem), undefined);
        });

        it("getter access nullable object property with safe option", function() {
            var dataItem = {};
            assert.equal(getter("foo['bar']", true)(dataItem), undefined);
        });

        it("getter access property of array type by indexer with safe option", function() {
            var dataItem = { foo: [1, 2, 3, 4] };
            assert.equal(getter("foo[2]", true)(dataItem), 3);
        });

        it("getter access property of index in complex object with safe option", function() {
            var dataItem = { foo: [] };
            assert.equal(getter("foo[2].bar", true)(dataItem), undefined);
        });

        it("getter access property of index in complex object with safe option and space", function() {
            var dataItem = { "f oo": [] };
            assert.equal(getter("['f oo'][2].bar", true)(dataItem), undefined);
        });

        it("getter access array with safe option", function() {
            var dataItem = [1, 2, 3, 4];
            assert.equal(getter("[2]", true)(dataItem), 3);
        });

        it("getter access with array access and double-quoted index", function() {
            var data = { foo: "foo" };

            assert.equal("foo", kendo.getter('["foo"]')(data));
        });

        it("getter access with array access and single-quoted index", function() {
            var data = { foo: "foo" };

            assert.equal("foo", kendo.getter("['foo']")(data));
        });

        it("getter access property with safe options type is correct", function() {
            var dataItem = { foo: { bar: 0 } };
            assert.equal(getter("foo.bar", true)(dataItem), 0);
        });

        it("getter cache honors safe flag", function() {
            var dataItem = {};
            getter("foo.bar");
            assert.equal(getter("foo.bar", true)(dataItem), undefined);
        });

        it("setter creates function which sets the specified expression", function() {
            var data = { foo: "foo" };

            kendo.setter("foo")(data, "bar");

            assert.equal(data.foo, "bar");
        });

        it("setter and nested expressions", function() {
            var data = { foo: { bar: "bar" } };

            kendo.setter("foo.bar")(data, "baz");

            assert.equal(data.foo.bar, "baz");
        });

        it("setter and array access expressions", function() {
            var data = { foo: "foo" };

            kendo.setter("['foo']")(data, "bar");

            assert.equal(data.foo, "bar");
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
}());
