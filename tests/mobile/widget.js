(function() {
    var MobileWidget = kendo.mobile.ui.Widget;

    var MyMobileWidget = MobileWidget.extend({
        options: {
            name: "My",
            foo: "foo",
            bar: "bar",
        caseSensitive: "caseSensitive"
        }
    });

    kendo.mobile.ui.plugin(MyMobileWidget);

    module("mobile core");

    test("MobileWidget is Observable", function() {
        var widget = new MobileWidget();

        ok(widget instanceof kendo.Observable);
        widget.destroy();
    });

    test("element is initialized", function() {
        var dom = $("<div />");
        var widget = new MobileWidget(dom);

        equal(widget.element[0], dom[0]);
        widget.destroy();
    });

    test("mobile widget has widget class", function() {
        var dom = $("<div />");
        var widget = new MobileWidget(dom);

        ok(widget.element.hasClass("km-widget"));
        widget.destroy();
    });

    test("instantiates mobile widgets by data attribute and container dom", 1, function() {
        var dom = $("<div><div data-role='my'></div></div>");

        kendo.mobile.init(dom);

        ok(dom.find("div").data("kendoMobileMy"), "Plugin instantiated");
        dom.find("div").data("kendoMobileMy").destroy();
    });

    test("instantiates mobile widgets by data attribute", 1, function() {
        var dom = $("<div data-role='my'></div>");

        kendo.mobile.init(dom);

        ok(dom.data("kendoMobileMy"), "Plugin instantiated");
        dom.data("kendoMobileMy").destroy();
    });
})();
