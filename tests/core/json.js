(function() {
    describe("json", function() {

        it("JSON should be able to serialize object", function() {
            var item = { foo: "bar", baz: 1 };
            var result = kendo.stringify(item);
            assert.equal(result, '{"foo":"bar","baz":1}');
        });

        it("stringified object should be deserializable ", function() {
            var obj = { foo: "bar", baz: 1 };
            var result = $.parseJSON(kendo.stringify(obj));
            assert.equal(result.foo, "bar");
            assert.equal(result.baz, 1);
        });

    });
}());
