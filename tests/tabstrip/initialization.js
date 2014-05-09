(function() {
var dom;
module("tabstrip initialization", {
    setup: function() {
        dom = $("<ul>");
    },
    teardown: function() {
        kendo.destroy(dom);
    }
});

test("the element field is set to the target from which the tabstrip is initialized", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    equal(tabstrip.element[0], dom[0]);
});

test("the wrapper field is set to the wrapper of created by the tabstrip", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    equal(tabstrip.wrapper[0], dom.parent()[0]);
});

test("the wrapper has k-widget and k-tabstrip css classes", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    ok(tabstrip.wrapper.is(".k-widget,.k-tabstrip"), "CSS classes are applied");
});

test("navigatable should attach the keydown handler only if true", 2, function() {
    var tabstrip = new kendo.ui.TabStrip(dom, { navigatable: false });

    ok(!$._data( tabstrip.wrapper[0], "events" ).keydown, "No keydown event attached");

    tabstrip.setOptions({ navigatable: true });

    ok($._data( tabstrip.wrapper[0], "events" ).keydown, "Keydown event attached");
});

})();
