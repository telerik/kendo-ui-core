(function() {
    var GanttChart = kendo.ui.GanttChart,
        container;

    module("DataBinding", {
        setup: function() {
            container = $("<div />");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    test("creates a GanttChartDataSource", function() {
        var ganttChart = new GanttChart(container);

        ok(ganttChart.dataSource instanceof kendo.data.GanttChartDataSource);
    });

    test("creates a GanttChartDataSource from array", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: []
        });

        ok(ganttChart.dataSource instanceof kendo.data.GanttChartDataSource);
    });

    test("creates a GanttChartDataSource from GanttChartDataSource", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: new kendo.data.GanttChartDataSource()
        });

        ok(ganttChart.dataSource instanceof kendo.data.GanttChartDataSource);
    });

    test("wrong DataSource type throws exception", function() {
        throws(function() {
            var ganttChart = new GanttChart(container, {
                dataSource: new kendo.data.DataSource()
            });
        });
    });

})();
