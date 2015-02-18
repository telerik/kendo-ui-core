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

var directiveSelector = kendo.directiveSelector;

test("puts hyphens before 'view', 'bar', 'strip', 'over' words in the widget names", 3, function() {
    equal(directiveSelector("modalview"), "kendo-mobile-modal-view");
    equal(directiveSelector("tabstrip"), "kendo-mobile-tab-strip");
    equal(directiveSelector("popover"), "kendo-mobile-pop-over");
});

test("works with multiple selectors", 1, function() {
    equal(directiveSelector("modalview drawer"), "kendo-mobile-modal-view, kendo-mobile-drawer");
});

test("works with 'view' selector", 1, function() {
    equal(directiveSelector("view"), "kendo-mobile-view");
});

}());

// ------------------------------------------------------------
(function() {
    var container;

    module("Security tokens", {
        setup: function() {
            container = $("<div/>").appendTo(document.body);
        },
        teardown: function() {
            container.remove();
        }
    });

    test("Anti-Forgery Token", function() {
        $(container).append("<input type='hidden' name='__RequestVerificationToken' value='42' />");
        var tokens = kendo.antiForgeryTokens();

        equal(tokens["__RequestVerificationToken"], 42);
    });

    test("Rails CSRF token", function() {
        $(container)
            .append('<meta content="authenticity_token" name="csrf-param" />')
            .append('<meta content="42" name="csrf-token" />');
        var tokens = kendo.antiForgeryTokens();

        equal(tokens["authenticity_token"], "42");
    });

    test("Spring CSRF token", function() {
        $(container)
            .append('<meta content="authenticity_token" name="_csrf_header" />')
            .append('<meta content="42" name="_csrf" />');
        var tokens = kendo.antiForgeryTokens();

        equal(tokens["authenticity_token"], "42");
    });

    test("Anti-Forgery Token with AppPath", function() {
        $(container).append("<input type='hidden' name='__RequestVerificationToken_test' value='42' />");
        var tokens = kendo.antiForgeryTokens();

        equal(tokens["__RequestVerificationToken_test"], "42");
    });

    test("Multiple Anti-Forgery Tokens", function() {
        $(container)
            .append("<input type='hidden' name='__RequestVerificationToken_1' value='42' />")
            .append("<input type='hidden' name='__RequestVerificationToken_2' value='24' />");
        var tokens = kendo.antiForgeryTokens();

        equal(tokens["__RequestVerificationToken_1"], "42");
        equal(tokens["__RequestVerificationToken_2"], "24");
    });
})();
