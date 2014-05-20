(function() {

    var element;
    var ui = kendo.ui;
    var Gantt = ui.Gantt;
    var setup = function(options) {
        var gantt = new Gantt(element, options || {});

        return gantt.headerDropDown;
    };

    module("Gantt initialization", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("kendoGantt attaches a gantt instance to target element", function() {
        element.kendoGantt();

        ok(element.data("kendoGantt") instanceof Gantt);
    });

    test("kendoGantt creates GanttList widget", 2, function() {
        element.kendoGantt();

        ok(element.data("kendoGantt").list);
        ok(element.data("kendoGantt").list instanceof ui.GanttList);
    });

    test("kendoGantt creates GanttTimeline widget", function () {
        element.kendoGantt();

        ok(element.data("kendoGantt").timeline);
        ok(element.data("kendoGantt").timeline instanceof ui.GanttTimeline);
    });

    test("css classes are added to the wrapper", 2, function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.hasClass("k-widget"));
        ok(gantt.wrapper.hasClass("k-gantt"));
    });

    test("toolbar is created", 2, function() {
        var gantt = new Gantt(element);

        ok(gantt.toolbar);
        equal(gantt.wrapper.children(".k-gantt-toolbar")[0], gantt.toolbar[0]);
    });

    test("css classes added to the toolbar", function () {
        var gantt = new Gantt(element);

        ok(gantt.toolbar.hasClass("k-floatwrap k-header"));
    });

    test("footer is created", 2, function() {
        var gantt = new Gantt(element);

        ok(gantt.footer);
        equal(gantt.wrapper.children(".k-gantt-toolbar")[1], gantt.footer[0]);
    });

    test("css classes added to the footer", function () {
        var gantt = new Gantt(element);

        ok(gantt.footer.hasClass("k-floatwrap k-header"));
    });

    test("view buttons are added to the toolbar", 2, function() {
        var gantt = new Gantt(element, {
            views: ["day"]
        });

        ok(gantt.toolbar.find(".k-view-day").length);
        equal(gantt.toolbar.find(".k-gantt-views .k-link").text(), "Day");
    });

    test("toolbar action button is added", 2, function () {
        var gantt = new Gantt(element);

        ok(gantt.toolbar.find(".k-gantt-actions").length);
        ok(gantt.toolbar.find(".k-gantt-actions").hasClass("k-reset k-header k-toolbar"));
    });

    test("toolbar action button's elements are rendered", 4, function () {
        var gantt = new Gantt(element);

        ok(gantt.toolbar.find(".k-gantt-actions > li").length);
        ok(gantt.toolbar.find(".k-gantt-actions > li").hasClass("k-button k-button-icontext"));

        ok(gantt.toolbar.find(".k-gantt-actions span").length);
        ok(gantt.toolbar.find(".k-gantt-actions span").hasClass("k-icon k-i-plus"));
    });

    test("toolbar action button data attributes are rendered", function () {
        var gantt = new Gantt(element);

        equal(gantt.toolbar.find(".k-gantt-actions > li").attr("data-action"), "add");
    });

    test("toolbar action button text is rendered", function () {
        var gantt = new Gantt(element);

        equal(gantt.toolbar.find(".k-gantt-actions > li").text(), "Add Task");
    });

    test("footer action button is added", 2, function () {
        var gantt = new Gantt(element);

        ok(gantt.footer.find(".k-gantt-actions").length);
        ok(gantt.footer.find(".k-gantt-actions").hasClass("k-reset k-header k-toolbar"));
    });

    test("footer action button's elements are rendered", 4, function () {
        var gantt = new Gantt(element);

        ok(gantt.footer.find(".k-gantt-actions > li").length);
        ok(gantt.footer.find(".k-gantt-actions > li").hasClass("k-button k-button-icontext"));

        ok(gantt.footer.find(".k-gantt-actions span").length);
        ok(gantt.footer.find(".k-gantt-actions span").hasClass("k-icon k-i-plus"));
    });

    test("footer action button data attributes are rendered", function () {
        var gantt = new Gantt(element);

        equal(gantt.footer.find(".k-gantt-actions > li").attr("data-action"), "add");
    });

    test("footer action button text is rendered", function () {
        var gantt = new Gantt(element);

        equal(gantt.footer.find(".k-gantt-actions > li").text(), "Add Task");
    });

    test("default action toolbar button is localized", function() {
        var gantt = new Gantt(element, {
            messages: {
                actions: {
                    append: "bar"
                }
            }
        });

        equal(gantt.toolbar.find(".k-gantt-actions > li").text(), "bar");
    });

    test("default action footer button is localized", function() {
        var gantt = new Gantt(element, {
            messages: {
                actions: {
                    append: "bar"
                }
            }
        });

        equal(gantt.footer.find(".k-gantt-actions > li").text(), "bar");
    });

    test("toolbar action dropDown is created", 2, function() {
        var gantt = new Gantt(element);

        ok(gantt.headerDropDown);
        ok(gantt.headerDropDown instanceof kendo.Observable);
    });

    test("toolbar action dropDown has command event handler attached", function() {
        var gantt = new Gantt(element);

        ok(gantt.headerDropDown._events["command"]);
    });

    test("footer action dropDown is created", 2, function() {
        var gantt = new Gantt(element);

        ok(gantt.footerDropDown);
        ok(gantt.footerDropDown instanceof kendo.Observable);
    });

    test("footer action dropDown has command event handler attached", function() {
        var gantt = new Gantt(element);

        ok(gantt.footerDropDown._events["command"]);
    });

    test("first view is selected", function() {
        var gantt = new Gantt(element, {
            views: ["day", "week"]
        });

        ok(gantt.toolbar.find(".k-view-day").hasClass("k-state-selected"));
    });

    test("view is selected", function() {
        var gantt = new Gantt(element, {
            views: ["day", { type: "week", selected: true }]
        });

        ok(gantt.toolbar.find(".k-view-week").hasClass("k-state-selected"));
    });

    test("day, week and month views are rendered by default", function() {
        var gantt = new Gantt(element);

        ok(gantt.toolbar.find(".k-view-day").length);
        ok(gantt.toolbar.find(".k-view-week").length);
        ok(gantt.toolbar.find(".k-view-month").length);
    });

    test("default views custom options are merged", function() {
        var gantt = new Gantt(element, {
            views: [{
                type: "day",
                title: "My Custom Day View Title"
            }]
        });

        equal(gantt.toolbar.find(".k-view-day").text(), "My Custom Day View Title");
    });

    test("list's wrapper is created", function () {
        var gantt = new Gantt(element);
        var listWrapper = gantt.wrapper.children(".k-gantt-treelist");

        ok(listWrapper.length);
        ok(listWrapper.hasClass("k-gantt-layout"));
    });

    test("timeline's wrapper is created", function() {
        var gantt = new Gantt(element);
        var timelineWrapper = gantt.wrapper.children(".k-gantt-timeline");

        ok(timelineWrapper.length);
        ok(timelineWrapper.hasClass("k-gantt-layout"));
    });

    test("resize handle is created", function() {
        var gantt = new Gantt(element, { height: 400 });

        ok(gantt.wrapper.find(".k-splitbar"));
    });

    module("TaskDropDown", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("initialize Popup widget", 2, function() {
        var dropDown = setup();

        ok(dropDown.popup);
        ok(dropDown.popup instanceof kendo.ui.Popup);
    });

    test("default direction is 'down'", function() {
        var dropDown = setup();

        equal(dropDown.options.direction, "down");
    });

    test("css classes added to popup container", function () {
        var dropDown = setup();

        ok(dropDown.list.hasClass("k-list-container"));
    });

    test("renders popup content list", 2, function() {
        var dropDown = setup();

        ok(dropDown.list.children("ul").length);
        ok(dropDown.list.children("ul").hasClass("k-list k-reset"));
    });

    test("renders popup list's content", 7, function () {
        var dropDown = setup();
        var actions = dropDown.options.messages.actions;

        equal(dropDown.list.find("li").length, 3);

        ok(dropDown.list.find("li").eq(0).hasClass("k-item"));
        equal(dropDown.list.find("li").eq(0).text(), actions.addChild);

        ok(dropDown.list.find("li").eq(1).hasClass("k-item"));
        equal(dropDown.list.find("li").eq(1).text(), actions.insertBefore);

        ok(dropDown.list.find("li").eq(2).hasClass("k-item"));
        equal(dropDown.list.find("li").eq(2).text(), actions.insetAfter);
    });

    test("renders list's item data attributes", 3, function() {
        var dropDown = setup();

        equal(dropDown.list.find("li").eq(0).attr("data-action"), "add");

        equal(dropDown.list.find("li").eq(1).attr("data-action"), "insert-before");

        equal(dropDown.list.find("li").eq(2).attr("data-action"), "insert-after");
    });
}());
