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
