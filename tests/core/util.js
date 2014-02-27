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

test("widgetInstance supports array of namespaces as an argument", function() {
    var testbed = $("<div data-role='barcode'></div><div data-role='scroller'></div><div data-role='calendar'></div>");
    kendo.init(testbed, kendo.mobile.ui, kendo.dataviz.ui, kendo.ui);

    if (kendo.size(kendo.dataviz.ui.Barcode)) {
        ok(kendo.widgetInstance(testbed.filter(".k-barcode"), [ kendo.mobile.ui, kendo.dataviz.ui ]));
    }
    ok(kendo.widgetInstance(testbed.filter(".km-scroll-wrapper"), [ kendo.mobile.ui, kendo.dataviz.ui ]));
    ok(!kendo.widgetInstance(testbed.filter(".k-calendar"), [ kendo.mobile.ui, kendo.dataviz.ui ]));
    kendo.destroy(testbed);
});

}());
