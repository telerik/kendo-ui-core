(function() {
    var NavBar = kendo.mobile.ui.NavBar,
    MOUSEDOWN = kendo.support.mousedown,
    MOUSEUP = kendo.support.mouseup,
    dom;

    module("Navbar", {
        setup: function() {
            kendo.ns = "kendo-";
        },
        teardown: function() {
            kendo.destroy(dom);
            kendo.ns = "";
        }
    });

    test("applies css class", function() {
        dom = $("<div/>");
        var bar = new NavBar(dom);
        ok(bar.element.hasClass("km-navbar"), "has specified CSS class");
    });

    test("view-title with ul adds km-absolute to left element", function() {
        dom = $("<div><a data-kendo-align='left'></a><ul></ul></div>");
        var bar = new NavBar(dom);
        bar.title();
        ok(bar.leftElement.hasClass("km-absolute"), "has specified CSS class");
    });

    test("moves items based on data-kendo-align attributes", function() {
        dom = $('<div><div data-kendo-align="left" id="foo"/><div data-kendo-align="right" id="bar" /></div>');

        var bar = new NavBar(dom);

        var leftContainer = dom.children(".km-leftitem")[0];
        var rightContainer = dom.children(".km-rightitem")[0];

        ok(leftContainer, "creates left container");
        equal(dom.find("#foo").parent()[0], leftContainer, "moves left aligned item to the container");

        ok(rightContainer, "creates right container");
        equal(dom.find("#bar").parent()[0], rightContainer, "moves right aligned item to the container");
    });

    test("sets title to element with view-title data attribute", function() {
        dom = $('<div><span data-kendo-role="view-title"></span></div>');
        var bar = new NavBar(dom);
        bar.title("foo");
        equal(dom.find("[data-kendo-role=view-title]").text(), "foo");
    });
})();
