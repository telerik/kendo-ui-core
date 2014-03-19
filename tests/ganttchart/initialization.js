(function() {
	
	var element;
	
	module("ganttchart initialization", {
		setup: function() {
            element = $("<div/>");
        },
        teardown: function() {

        }
	});
	
	test("kendoGanttChart attaches a ganttchart instance to target element", function() {
		 element.kendoGanttChart();

        ok(element.data("kendoGanttChart") instanceof kendo.ui.GanttChart);
	});
}());