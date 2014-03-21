(function() {
    var GanttChart = kendo.ui.GanttChart;
    var GanttChartDataSource = kendo.data.GanttChartDataSource;
    var container;
    var dataSource = {
        data: [
            {
                title: "Root",
                tasks: [
                    { title: "Child1" }
                ]
            }
        ],
        schema: {
            model: {
                children: "tasks"
            }
        }
    };
    var JSONData = [
        {
            title: "Task1", items: [
                { title: "Child 1.1" },
                { title: "Child 1.2" },
                { title: "Child 1.3" }
            ]
        },
        {
            title: "Task2", items: [
                { title: "Child 2.1" },
                { title: "Child 2.2" },
                { title: "Child 2.3" }
            ]
        }
    ];

    module("GanttChart", {
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
        var ganttChart = new GanttChart(container, []);

        ok(ganttChart.dataSource instanceof kendo.data.GanttChartDataSource);
    });

    test("creates a GanttChartDataSource from GanttChartDataSource", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: new kendo.data.GanttChartDataSource()
        });

        ok(ganttChart.dataSource instanceof kendo.data.GanttChartDataSource);
    });

    test("throws exception for wrong DataSource type", function() {
        throws(function() {
            new GanttChart(container, {
                dataSource: new kendo.data.DataSource()
            });
        });
    });

    test("creates a GanttChartDataSource for child items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: [
                { items: [{}, {}] }
            ]
        });

        ok(ganttChart.dataSource.at(0).children instanceof kendo.data.GanttChartDataSource);
    });

    test("dataBinding event is fired", function () {
        new GanttChart(container, {
            dataBinding: function (e) {
                ok(true);
            }
        });
    });

    test("dataBinding event can be prevented", 0, function () {
        new GanttChart(container, {
            dataBinding: function (e) {
                e.preventDefault();
            },
            dataBound: function () {
                ok(false);
            }
        });
    });

    test("AutoBind=false prevents ganttchart from binding", 0, function () {
        new GanttChart(container, {
            autoBind: false,
            dataBinding: function () {
                ok(false);
            }
        });
    });

    test("resetting DataSource rebinds the widget", 2, function () {
        var ganttChart = new GanttChart(container, {
            dataBinding: function () {
                ok(true);
            }
        });

        ganttChart.setDataSource(new kendo.data.GanttChartDataSource());
    });


    test("Initializing from JSON populates root items", function() {
        var ganttChart = new GanttChart(container, JSONData);

        equal(ganttChart.dataSource.data().length, 2);
    });

    test("Initializing from JSON populates child items", function() {
        var ganttChart = new GanttChart(container, JSONData);

        equal(ganttChart.dataSource.at(0).children.data().length, 3);
    });

    test("Initializing from local datasource populates root items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: {
                data: JSONData
            }
        });

        equal(ganttChart.dataSource.data().length, 2);
    });

    test("Initializing from local datasource populates child items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: {
                data: JSONData
            }
        });

        equal(ganttChart.dataSource.at(0).children.data().length, 3);
    });

    test("Initializing from local datasource loads children from schema property", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: dataSource
        });

        equal(ganttChart.dataSource.at(0).children.data().length, 1);
    });

    test("Initializing from remote datasource populates root items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([{}, {}]);
                    }
                }
            }
        });

        equal(ganttChart.dataSource.data().length, 2);
    });

    test("Initializing from existing datasource populates root items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: new GanttChartDataSource({
                data: JSONData
            })
        });

        equal(ganttChart.dataSource.data().length, 2);
    });

    test("Initializing from existing datasource populates child items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: new GanttChartDataSource({
                data: JSONData
            })
        });

        equal(ganttChart.dataSource.at(0).children.data().length, 3);
    });
})();
