import '@progress/kendo-ui/src/kendo.core.js';

describe("json", function() {

    it("JSON should be able to serialize object", function() {
        let item = { foo: "bar", baz: 1 };
        let result = kendo.stringify(item);
        assert.equal(result, '{"foo":"bar","baz":1}');
    });

    it("stringified object should be deserializable ", function() {
        let obj = { foo: "bar", baz: 1 };
        let result = JSON.parse(kendo.stringify(obj));
        assert.equal(result.foo, "bar");
        assert.equal(result.baz, 1);
    });

});
