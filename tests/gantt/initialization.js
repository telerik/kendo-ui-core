(function() {

    var element;
    var ui = kendo.ui;
    var Gantt = ui.Gantt;

    module("gantt initialization", {
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

    test("kendoGantt creates GanttList widget", function() {
        element.kendoGantt();

        ok(element.data("kendoGantt").list);
        ok(element.data("kendoGantt").list instanceof ui.GanttList);
    });

    test("css classes are added to the wrapper", function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.hasClass("k-widget"));
        ok(gantt.wrapper.hasClass("k-gantt"));
    });

    test("toolbar is created", function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.find(".k-gantt-toolbar").length);
        equal(gantt.wrapper.find(".k-gantt-toolbar")[0], gantt.toolbar[0]);
    });

    test("view buttons are added to the toolbar", function() {
        var gantt = new Gantt(element, {
            views: ["day"]
        });

        ok(gantt.toolbar.find(".k-view-day").length);
        equal(gantt.toolbar.find(".k-link").text(), "Day");
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

    test("clicking on the view navigation selects the view", function() {
        var gantt = new Gantt(element);

        gantt.toolbar.find(".k-view-week").click();

        equal(gantt.timeline.view().name, "week");
        ok(gantt.toolbar.find(".k-view-week").hasClass("k-state-selected"));
    });

    test("clicking on the view navigation deselects the other views", function() {
        var gantt = new Gantt(element);

        gantt.toolbar.find(".k-view-week").click();

        equal(gantt.toolbar.find(".k-state-selected").length, 1);
    });

    test("list is created", function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.find(".k-gantt-treelist").length);
    });

    test("timeline is created", function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.find(".k-gantt-timeline").length);
    });

}());
