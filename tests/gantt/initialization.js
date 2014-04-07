(function() {

    var element;
    var Gantt = kendo.ui.Gantt;

    module("gantt initialization", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {

        }
    });

    test("kendoGantt attaches a gantt instance to target element", function() {
        element.kendoGantt();

        ok(element.data("kendoGantt") instanceof Gantt);
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

        ok(gantt.wrapper.find(".k-gantt-list").length);
    });

    test("timeline is created", function() {
        var gantt = new Gantt(element);

        ok(gantt.wrapper.find(".k-gantt-timeline").length);
    });

}());
