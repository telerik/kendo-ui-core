(function() {

    var isFunction = kendo.isFunction;
    describe("util", function() {

        it("true for functions", function() {
            assert.isOk(isFunction(function() { }));
        });

        it("false for objects", function() {
            assert.isOk(!isFunction({}));
        });

        it("false for null", function() {
            assert.isOk(!isFunction(null));
        });

        it("false for undefined", function() {
            assert.isOk(!isFunction());
        });

        it("outer width return 0 when no element is provided", function() {
            assert.isOk(kendo._outerWidth() === 0);
        });

        it("outer height return 0 when no element is provided", function() {
            assert.isOk(kendo._outerHeight() === 0);
        });

        it("outer width pass correctly includeMargin", function() {
            assert.isOk(kendo._outerWidth(undefined, undefined) === 0);
        });

        it("outer height pass correctly includeMargin", function() {
            assert.isOk(kendo._outerHeight(undefined, undefined) === 0);
        });

        var toCamelCase = kendo.toCamelCase;

        it("replaces dashes with next letter in upper case", function() {
            assert.equal(toCamelCase("foo-bar-baz"), "fooBarBaz")
        });

        var toHyphens = kendo.toHyphens;

        it("replaces ...-a... with ...A...", function() {
            assert.equal(toHyphens("fooBarBaz"), "foo-bar-baz")
        });

        it("widgetInstance supports array of namespaces as an argument", function() {
            var testbed = $("<div data-role='barcode'></div><div data-role='scroller'></div><div data-role='calendar'></div>");
            kendo.init(testbed, kendo.mobile.ui, kendo.dataviz.ui, kendo.ui);

            if (kendo.size(kendo.dataviz.ui.Barcode)) {
                assert.isOk(kendo.widgetInstance(testbed.filter(".k-barcode"), [kendo.mobile.ui, kendo.dataviz.ui]));
            }
            assert.isOk(kendo.widgetInstance(testbed.filter(".km-scroll-wrapper"), [kendo.mobile.ui, kendo.dataviz.ui]));
            assert.isOk(!kendo.widgetInstance(testbed.filter(".k-calendar"), [kendo.mobile.ui, kendo.dataviz.ui]));
            kendo.destroy(testbed);
        });

        it("widgetInstance returns mobile view instances correctly", function() {
            var testbed = $("<div data-role='view'>test</div>");
            kendo.init(testbed, kendo.mobile.ui, kendo.dataviz.ui, kendo.ui);

            assert.isOk(kendo.widgetInstance(testbed.filter(".km-view"), [kendo.mobile.ui]));
            kendo.destroy(testbed);
        });

        var directiveSelector = kendo.directiveSelector;

        it("puts hyphens before 'view', 'bar', 'strip', 'over' words in the widget names", function() {
            assert.equal(directiveSelector("modalview"), "kendo-mobile-modal-view");
            assert.equal(directiveSelector("tabstrip"), "kendo-mobile-tab-strip");
            assert.equal(directiveSelector("popover"), "kendo-mobile-pop-over");
        });

        it("works with multiple selectors", function() {
            assert.equal(directiveSelector("modalview drawer"), "kendo-mobile-modal-view, kendo-mobile-drawer");
        });

        it("works with 'view' selector", function() {
            assert.equal(directiveSelector("view"), "kendo-mobile-view");
        });

        var getFileSizeMessage = kendo.getFileSizeMessage;

        it("returns correct message according to the size", function() {
            assert.equal(getFileSizeMessage(0), "0 Byte");
            assert.equal(getFileSizeMessage(1024), "1 KB");
            assert.equal(getFileSizeMessage(1048576), "1 MB");
            assert.equal(getFileSizeMessage(1073741824), "1 GB");
            assert.equal(getFileSizeMessage(1099511627776), "1 TB");
        });

    });
}());

// ------------------------------------------------------------
(function() {
    var container;

    describe("Security tokens", function() {
        beforeEach(function() {
            container = $("<div/>").appendTo(document.body);
        });
        afterEach(function() {
            container.remove();
        });

        it("Anti-Forgery Token", function() {
            $(container).append("<input type='hidden' name='__RequestVerificationToken' value='42' />");
            var tokens = kendo.antiForgeryTokens();

            assert.equal(tokens["__RequestVerificationToken"], 42);
        });

        it("Rails CSRF token", function() {
            $(container)
                .append('<meta content="authenticity_token" name="csrf-param" />')
                .append('<meta content="42" name="csrf-token" />');
            var tokens = kendo.antiForgeryTokens();

            assert.equal(tokens["authenticity_token"], "42");
        });

        it("Spring CSRF token", function() {
            $(container)
                .append('<meta content="authenticity_token" name="_csrf_header" />')
                .append('<meta content="42" name="_csrf" />');
            var tokens = kendo.antiForgeryTokens();

            assert.equal(tokens["authenticity_token"], "42");
        });

        it("Anti-Forgery Token with AppPath", function() {
            $(container).append("<input type='hidden' name='__RequestVerificationToken_test' value='42' />");
            var tokens = kendo.antiForgeryTokens();

            assert.equal(tokens["__RequestVerificationToken_test"], "42");
        });

        it("Multiple Anti-Forgery Tokens", function() {
            $(container)
                .append("<input type='hidden' name='__RequestVerificationToken_1' value='42' />")
                .append("<input type='hidden' name='__RequestVerificationToken_2' value='24' />");
            var tokens = kendo.antiForgeryTokens();

            assert.equal(tokens["__RequestVerificationToken_1"], "42");
            assert.equal(tokens["__RequestVerificationToken_2"], "24");
        });
    });
}());
