(function() {

    var element;

    module("gantt initialization", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {

        }
    });

    test("kendoGantt attaches a gantt instance to target element", function() {
        element.kendoGantt();

        ok(element.data("kendoGantt") instanceof kendo.ui.Gantt);
    });
}());
