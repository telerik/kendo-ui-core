(function() {
    var Button = kendo.mobile.ui.Button,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup,
        dom;

    function click(dom) {
        dom.trigger(MOUSEDOWN);
        dom.trigger(MOUSEUP);
    }

    module("mobile button", {
        // setup: function() { kendo.ns = "kendo-"; }
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("applies css class", function() {
        expect(1);

        dom = $("<button/>");

        var button = new Button(dom);

        ok(button.element.hasClass("km-button"), "has specified CSS class");
    });

    test("accepts css class through options", function() {
        dom = $('<button data-role="button" data-style="detail"/>');

        kendo.mobile.init(dom);

        ok(dom.hasClass("km-detail"), "has specified CSS class");
    });

    test("wraps content in a span", function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);

        ok(button.element.children().first().is("span.km-text"), "Should wrap contents");
    });

    test("reuses existing span", function() {
        dom = $("<button><span>foo</span></button>");
        var span = dom.find("span");

        var button = new Button(dom);

        ok(span.hasClass("km-text"), "Should wrap contents");
    });

    test("adds css class to children img elements", function() {
        dom = $("<button><img/>foo</button>");
        var img = dom.find("img");

        var button = new Button(dom);

        ok(img.hasClass("km-image"), "Should set css class to img");
    });

    test("raises click event when clicked", 1, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);

        button.bind("click", function() {
            ok(true, "Should raise the click event");
        });

        click(dom);
    });

    test("raises click event on touchstart when pressed and configured", 1, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom, { clickOn: "down" });

        button.bind("click", function() {
            ok(true, "Should raise the click event");
        });

        dom.trigger(MOUSEDOWN);
    });

    test("Sets active css class on 'down'", 1, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);

        dom.trigger(MOUSEDOWN);

        ok(dom.hasClass("km-state-active"), "Should set the active class");
    });

    test("icon only button", function() {
        dom = $('<button data-role="button" data-icon="history"></button>');
        kendo.mobile.init(dom);

        ok(!dom.find("span.km-text")[0]);
        ok(dom.find("span.km-icon").hasClass("km-notext"));
    });

    test("badge method sets a badge where there is none", function() {
        dom = $('<button data-role="button"></button>');
        kendo.mobile.init(dom);

        dom.data("kendoMobileButton").badge(5);

        ok(dom.find("span.km-badge").html() == "5");
    });

    test("badge attribute init and badge method gets the badge value if no arguments", function() {
        dom = $('<button data-role="button" data-badge="6"></button>');
        kendo.mobile.init(dom);

        ok(dom.data("kendoMobileButton").badge() == "6");
    });

    test("badge method removes the badge if passed false", function() {
        dom = $('<button data-role="button" data-badge="6"></button>');
        kendo.mobile.init(dom);
        dom.data("kendoMobileButton").badge(false);

        ok(!dom.find(".km-badge")[0]);
    });

    test("binding visible to false hides the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="visible:visible"></button>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButton").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<button data-role="button" data-icon="history" style="display:none" data-bind="visible:visible"></button>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButton").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="visible:visible"></button>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", false);

        ok(dom.data("kendoMobileButton").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="visible:visible"></button>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", true);

        ok(dom.data("kendoMobileButton").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="invisible:invisible"></button>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButton").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="invisible:invisible" style="display:none"></button>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButton").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="invisible:invisible"></button>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", true);

        ok(dom.data("kendoMobileButton").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<button data-role="button" data-icon="history" data-bind="invisible:invisible"></button>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", false);

        ok(dom.data("kendoMobileButton").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("disabled button has km-state-disabled class", 1, function() {
        dom = $("<button/>");

        var button = new Button(dom);
        button.enable(false);

        ok(button.element.hasClass("km-state-disabled"), "has km-state-disabled class");
    });

    test("widget understands disabled attribute", 1, function() {
        dom = $('<button data-role="button" disabled></button>');

        kendo.mobile.init(dom);
        var button = dom.data("kendoMobileButton");

        ok(button.element.hasClass("km-state-disabled"), "has km-state-disabled class");
    });

    test("enable methods enables and disables the widget", 2, function() {
        dom = $("<button/>");

        var button = new Button(dom);
        button.enable(false);

        ok(button.element.hasClass("km-state-disabled"), "has km-state-disabled class");

        button.enable(true);
        ok(!button.element.hasClass("km-state-disabled"), "does not have km-state-disabled class");
    });

    test("does not active css class on 'down' for disabled button", 1, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);
        button.enable(false);

        dom.trigger(MOUSEDOWN);

        ok(!dom.hasClass("km-state-active"), "Should not set the active class");
    });

    test("click event of disabled button is not rised", 0, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);

        button.bind("click", function() {
            ok(false, "Should not raise the click event");
        });

        button.enable(false);
        click(dom);
    });

    test("disabled button has disabled attribute", 1, function() {
        dom = $("<button>foo</button>");

        var button = new Button(dom);
        button.enable(false);

        ok(button.element.is(":disabled"), "has disabled attribute");
    });
})();
