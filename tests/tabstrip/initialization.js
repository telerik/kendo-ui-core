(function() {
var dom;
describe("tabstrip initialization", function () {
    beforeEach(function() {
        dom = $("<ul>");
    });
    afterEach(function() {
        kendo.destroy(dom);
    });

it("the element field is set to the target from which the tabstrip is initialized", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    assert.equal(tabstrip.element[0], dom[0]);
});

it("the wrapper field is set to the wrapper of created by the tabstrip", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    assert.equal(tabstrip.wrapper[0], dom.parent()[0]);
});

it("the wrapper has k-widget and k-tabstrip css classes", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    assert.isOk(tabstrip.wrapper.is(".k-widget,.k-tabstrip"), "CSS classes are applied");
});

it("navigatable should attach the keydown handler only if true", function() {
    var tabstrip = new kendo.ui.TabStrip(dom, { navigatable: false });

    assert.isOk(!$._data( tabstrip.wrapper[0], "events" ).keydown, "No keydown event attached");

    tabstrip.setOptions({ navigatable: true });

    assert.isOk($._data( tabstrip.wrapper[0], "events" ).keydown, "Keydown event attached");
});

it("adds a scroll stopping wrapper around itself", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    assert.isOk(tabstrip.scrollWrap.is(".k-tabstrip-wrapper"), "Adds wrapper class");
    assert.isOk(tabstrip.wrapper.parent(".k-tabstrip-wrapper").length, "Wraps around the TabStrip");
});

it("doesn't add a scroll stopping wrapper if there is one already", function() {
    var tabstrip = new kendo.ui.TabStrip(dom.wrap('<div class="k-tabstrip-wrapper"></div>'));

    assert.isOk(dom.parents(".k-tabstrip-wrapper").length == 1, "Only one wrapper around the TabStrip");
});

it("removes its scrolling wrapper on destroy", function() {
    var tabstrip = new kendo.ui.TabStrip(dom);

    tabstrip.destroy();

    assert.isOk(!tabstrip.wrapper.parent().is(".km-tabstrip-wrapper"), "Unwraps the wrapper");
});

it("applies a default top tab position CSS class", function () {
    var tabstrip = new kendo.ui.TabStrip(dom);

    assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-top"), "CSS class is applied");
});

it("applies a top tab position CSS class", function () {
    var tabstrip = new kendo.ui.TabStrip(dom, {tabPosition: "left"});

    assert.isOk(tabstrip.wrapper.hasClass("k-tabstrip-left"), "CSS class is applied");
});

it("moves tabs at the bottom when bottom tab position is defined", function () {
    var tabstrip = new kendo.ui.TabStrip(dom, { tabPosition: "bottom" });

    assert.isOk(tabstrip.wrapper.children().last().is(".k-tabstrip-items"), "Tabs are at the bottom");
});

    });
}());
