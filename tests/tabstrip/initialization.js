(function() {
    module('tabstrip initialization');

    test("the element field is set to the target from which the tabstrip is initialized", function() {
        var dom = $("<ul/>");
        var tabstrip = new kendo.ui.TabStrip(dom);

        equal(tabstrip.element[0], dom[0]);
    });

    test("the wrapper field is set to the wrapper of created by the tabstrip", function() {
        var dom = $("<ul/>");
        var tabstrip = new kendo.ui.TabStrip(dom);

        equal(tabstrip.wrapper[0], dom.parent()[0]);
    });

    test("the wrapper has k-widget and k-tabstrip css classes", function() {
        var dom = $("<ul/>");
        var tabstrip = new kendo.ui.TabStrip(dom);

        ok(tabstrip.wrapper.is(".k-widget,.k-tabstrip"), "CSS classes are applied");
    });
})();
