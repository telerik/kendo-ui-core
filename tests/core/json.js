(function(){

test("JSON should be able to serialize object", function() {
    var item = { foo: "bar", baz: 1};
    var result = kendo.stringify(item);
    equal(result, '{"foo":"bar","baz":1}');
});

test("stringified object should be deserializable ", function() {
    var obj = { foo: "bar", baz: 1};
    var result = $.parseJSON(kendo.stringify(obj));
    equal(result.foo, "bar");
    equal(result.baz, 1);
});

}());
