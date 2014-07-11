(function() {
    var ButtonGroup = kendo.mobile.ui.ButtonGroup,
        MOUSEDOWN = kendo.support.mousedown,
        MOUSEUP = kendo.support.mouseup,
        dom;

    var mouseDownEvent;
    if (kendo.support.touch) {
        mouseDownEvent = new $.Event(null, {type: MOUSEDOWN, changedTouches: [{identifier: 1, pageX: 100, pageY: 100}] });
    } else {
        mouseDownEvent = MOUSEDOWN;
    }

    module("buttongroup", {
        setup: function() {
            dom = $("<ul><li>Text1</li><li>Text2</li></ul>");
        },
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("Add css class to the ul element", function() {
        new ButtonGroup(dom);

        ok(dom.hasClass("km-buttongroup"));
    });

    test("Add class to the li element", function() {
        new ButtonGroup(dom);

        equal(dom.find("li.km-button").length, 2);
    });

    test("Wrap li content with span element", function() {
        new ButtonGroup(dom);

        var spans = dom.find("span.km-text");

        equal(spans.length, 2);
        equal(spans.eq(0).text(), "Text1");
        equal(spans.eq(1).text(), "Text2");
    });

    test("Wrap image in span if it exists", function() {
        dom.find("li:first").append("<img />");
        new ButtonGroup(dom);

        equal(dom.find("img.km-image").length, 1);
    });

    test("Rendering does not expand child nodes of UL", function() {
        new ButtonGroup(dom);

        equal(dom[0].childNodes.length, 2);
    });

    test("Honor li.km-state-active on init", function() {
        var group = new ButtonGroup($("<ul><li class='km-state-active'>Text1</li><li>Text2</li></ul>"));

        equal(group.current().index(), 0);
        group.destroy();
    });

    test("Add icon if no image and data attribute", function() {
        dom.find("li:first").attr("data-icon", "test");

        new ButtonGroup(dom);

        equal(dom.find(".km-icon").length, 1);
        ok(dom.find(".km-icon").hasClass("km-test"));
    });

    test("Select li on init", function() {
        var group = new ButtonGroup(dom, {
            index: 0
        });

        ok(dom.children("li:first").hasClass("km-state-active"));
    });

    test("Select li as jQuery object", function() {
        var group = new ButtonGroup(dom);

        group.select(dom.children("li:first"));

        var current = dom.find(".km-state-active");

        equal(current.length, 1);
        ok(current.hasClass("km-state-active"));

    });

    test("Select by index", function() {
        var group = new ButtonGroup(dom);

        group.select(0);

        ok(dom.children("li:first").hasClass("km-state-active"));
    });

    test("Do not select if index is negative", function() {
        var group = new ButtonGroup(dom);

        group.select(-1);

        equal(dom.children("li.km-state-active").length, 0);
    });

    test("Do not select if li has km-state-disabled", function() {
        var group = new ButtonGroup(dom);

        var li = dom.children("li:first").addClass("km-state-disabled");
        group.select(li);

        ok(li.is(":not(.km-state-active)"));
    });

    test("Only one li is selected", function() {
        var group = new ButtonGroup(dom);

        group.select(0);
        group.select(1);

        var current = dom.find(".km-state-active");

        equal(current.length, 1);
        equal(current.index(), 1);
        ok(current.hasClass("km-state-active"));
    });

    test("Click button should select it", function() {
        var group = new ButtonGroup(dom);

        dom.find("li:last").trigger("mousedown");

        equal(dom.children("li.km-state-active").index(), 1);
    });

    test("selects and triggers", 2, function() {
        var group = new ButtonGroup(dom, {
            select: function() {
                equal(this.selectedIndex, 1);
            }
        });

        equal(this.selectedIndex, undefined);

        dom.find("li:last").trigger("mousedown");
    });

    test("group accepts event phase configuration option", 2, function() {
        var group = new ButtonGroup(dom, {
            selectOn: "up",
            select: function() {
                ok(true);
                equal(this.selectedIndex, 1);
            }
        });

        dom.find("li:last").trigger("mouseup");
    });

    test("group does not select button if event is prevented", 1, function() {
        var group = new ButtonGroup(dom, {
            selectOn: "up"
        });

        var e = new $.Event(null, { type: "mouseup" });
        e.preventDefault();

        dom.find("li:last").trigger(e);
        equal(group.selectedIndex, undefined);
    });


    test("binding visible to false hides the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="visible:visible"><li></li></ul>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("binding visible to true shows the widget", function() {
        dom = $('<ul data-role="buttongroup" style="display:none" data-bind="visible:visible"><li></li></ul>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("changing visible to false hides the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="visible:visible"><li></li></ul>');

        var observable = kendo.observable({
            visible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", false);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") == "none", "Display is 'none'");
    });

    test("changing visible to true shows the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="visible:visible"><li></li></ul>');

        var observable = kendo.observable({
            visible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("visible", true);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") != "none", "Display is not 'none'");
    });

    test("binding invisible to true hides the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="invisible:invisible"><li></li></ul>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") == "none", "display is 'none'");
    });

    test("binding invisible to false shows the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="invisible:invisible" style="display:none"><li></li></ul>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("changing invisible to true hides the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="invisible:invisible"><li></li></ul>');

        var observable = kendo.observable({
            invisible: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", true);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") == "none", "display is 'none'");
    });

    test("changing invisible to false shows the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="invisible:invisible"><li></li></ul>');

        var observable = kendo.observable({
            invisible: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("invisible", false);

        ok(dom.data("kendoMobileButtonGroup").wrapper.css("display") != "none", "display is not 'none'");
    });

    test("badge method sets a badge where there is none", function() {
        dom = $('<ul data-role="buttongroup"><li id="foo">foo</li><li id="bar">bar</li></ul>');
        kendo.mobile.init(dom);

        dom.data("kendoMobileButtonGroup").badge("li:first", 5);

        ok(dom.find("li:first span.km-badge").html() == "5");
    });

    test("badge attribute init and badge method gets a badge by tab number or tab selector", function() {
        dom = $('<ul data-role="buttongroup"><li id="foo" data-badge="3">foo</li><li id="bar">bar</li></ul>');
        kendo.mobile.init(dom);
        var buttongroup = dom.data("kendoMobileButtonGroup");

        ok(buttongroup.badge(0) == buttongroup.badge("li:first"));
    });

    test("badge method removes the badge if passed false", function() {
        dom = $('<ul data-role="buttongroup"><li id="foo" data-badge="3">foo</li><li id="bar">bar</li></ul>');
        kendo.mobile.init(dom);
        var buttongroup = dom.data("kendoMobileButtonGroup");

        buttongroup.badge(0, false);
        ok(!dom.find(".km-badge")[0]);
    });

    test("badge method gets the badge value if no arguments", function() {
        dom = $('<ul data-role="buttongroup"><li id="foo">foo</li><li id="bar">bar</li></ul>');
        kendo.mobile.init(dom);
        var buttongroup = dom.data("kendoMobileButtonGroup");

        buttongroup.badge("li:last", 6);

        ok(buttongroup.badge("li:last") == "6");
    });

    test("by default buttonGroup is not disabled", 1, function() {
        var group = new ButtonGroup(dom);

        ok(!group.element.hasClass("km-state-disabled"));
    });

    test("disabled buttonGroup has km-state-disabled class", 1, function() {
        var group = new ButtonGroup(dom, { enable: false });

        ok(group.element.hasClass("km-state-disabled"));
    });

    test("buttonGroup can be disabled through the API", 1, function() {
        var group = new ButtonGroup(dom);

        group.enable(false);
        ok(group.element.hasClass("km-state-disabled"));
    });

    test("buttonGroup can be enabled through the API", 1, function() {
        var group = new ButtonGroup(dom, { enable: false });

        group.enable(true);
        ok(!group.element.hasClass("km-state-disabled"));
    });

    test("when disabled buttonGroup does not change the selected item on tap", 1, function() {
        var group = new ButtonGroup(dom, { index: 0, enable: false });

        dom.find("li:last").trigger("mousedown");
        equal(group.selectedIndex, 0, "Selected index did not changed");
    });

    test("when disabled buttonGroup does not change the selected item through select method", 1, function() {
        var group = new ButtonGroup(dom, { index: 0, enable: false });

        group.select(1);
        equal(group.selectedIndex, 0, "Selected index did not changed");
    });

    test("when disabled buttonGroup does not fire select event", 0, function() {
        var group = new ButtonGroup(dom, {
            enable: false,
            select: function() {
                ok(false, "select event should not trigger");
            }
        });

        dom.find("li:last").trigger("mousedown");
    });

    /* enabled binding */
    test("enabled binding to false disables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="enabled:enable"><li></li></ul>');

        var observable = kendo.observable({
            enable: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("enabled binding to true enables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="enabled:enable"><li></li></ul>');

        var observable = kendo.observable({
            enable: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(!dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("changing enabled binding to true enables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="enabled:enable"><li></li></ul>');

        var observable = kendo.observable({
            enable: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("enable", true);

        ok(!dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("changing enabled binding to false disables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="enabled:enable"><li></li></ul>');

        var observable = kendo.observable({
            enable: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("enable", false);

        ok(dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    /* disabled binding */
    test("disabled binding to true disables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="disabled:disable"><li></li></ul>');

        var observable = kendo.observable({
            disable: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("disabled binding to false enables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="disabled:disable"><li></li></ul>');

        var observable = kendo.observable({
            disable: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);

        ok(!dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("changing disabled binding to false enables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="disabled:disable"><li></li></ul>');

        var observable = kendo.observable({
            disable: true
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("disable", false);

        ok(!dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

    test("changing disabled binding to true disables the widget", function() {
        dom = $('<ul data-role="buttongroup" data-bind="disabled:disable"><li></li></ul>');

        var observable = kendo.observable({
            disable: false
        });

        kendo.bind(dom, observable, kendo.mobile.ui);
        observable.set("disable", true);

        ok(dom.data("kendoMobileButtonGroup").wrapper.hasClass("km-state-disabled"));
    });

})();
