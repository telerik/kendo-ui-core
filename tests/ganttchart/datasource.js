(function() {
    var GanttChartTask = kendo.data.GanttChartTask;
    var GanttChartDataSource = kendo.data.GanttChartDataSource;

    module("GanttChartTask initialization", {});

    test("GanttChartTask creates kendo.data.Node instance", function () {
        var task = new GanttChartTask();

        ok(task instanceof kendo.data.Node);
    });

    module("GanttChartDataSource initialization", {});

    test("GanttChartTask creates kendo.data.HierarchicalDataSource instance", function() {
        var dataSource = new GanttChartDataSource();

        ok(dataSource instanceof kendo.data.HierarchicalDataSource);
    });

}());
