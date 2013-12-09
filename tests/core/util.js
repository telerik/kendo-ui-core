(function(){

var isFunction = kendo.isFunction;

test("true for functions", function() {
    ok(isFunction(function() {}));
});

test("false for objects", function() {
    ok(!isFunction({}));
});

test("false for null", function() {
    ok(!isFunction(null));
});

test("false for undefined", function() {
    ok(!isFunction());
});

var toCamelCase = kendo.toCamelCase;

test("replaces dashes with next letter in upper case", function() {
    equal(toCamelCase("foo-bar-baz"), "fooBarBaz")
});

var toHyphens = kendo.toHyphens;

test("replaces ...-a... with ...A...", function() {
    equal(toHyphens("fooBarBaz"), "foo-bar-baz")
});

}());
