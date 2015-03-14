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

test("adds a scroll stopping wrapper around itself", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    ok(tabstrip.scrollWrap.is(".k-tabstrip-wrapper"), "Adds wrapper class");
    ok(tabstrip.wrapper.parent(".k-tabstrip-wrapper").length, "Wraps around the TabStrip");
});

test("doesn't add a scroll stopping wrapper if there is one already", function() {
    var tabstrip = new kendo.ui.TabStrip(dom.wrap('<div class="k-tabstrip-wrapper"></div>'));

    ok(dom.parents(".k-tabstrip-wrapper").length == 1, "Only one wrapper around the TabStrip");
});

test("removes its scrolling wrapper on destroy", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    tabstrip.destroy();

    ok(!tabstrip.wrapper.parent().is(".km-tabstrip-wrapper"), "Unwraps the wrapper");
});

test("applies a default top tab position CSS class", function () {
    var tabstrip = new kendo.ui.TabStrip(dom);

    ok(tabstrip.wrapper.hasClass("k-tabstrip-top"), "CSS class is applied");
});

test("applies a top tab position CSS class", function () {
    var tabstrip = new kendo.ui.TabStrip(dom, {tabPosition: "left"});

    ok(tabstrip.wrapper.hasClass("k-tabstrip-left"), "CSS class is applied");
});

test("moves tabs at the bottom when bottom tab position is defined", function () {
    var tabstrip = new kendo.ui.TabStrip(dom, { tabPosition: "bottom" });

    ok(tabstrip.wrapper.children().last().is(".k-tabstrip-items"), "Tabs are at the bottom");
});

})();
