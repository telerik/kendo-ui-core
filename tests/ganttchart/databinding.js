(function() {
    var GanttChart = kendo.ui.GanttChart;
    var GanttChartDataSource = kendo.data.GanttChartDataSource;
    var container;
    var JSONData = [
        { title: "Task1", parentId: null, id: 1 },
            { title: "Child 1.1", parentId: 1, id: 2 },
            { title: "Child 1.2", parentId: 1, id: 3 },
            { title: "Child 1.3", parentId: 1, id: 4 },
        { title: "Task2", parentId: null, id: 5 },
            { title: "Child 2.1", parentId: 5, id: 6 },
            { title: "Child 2.2", parentId: 5, id: 7 },
            { title: "Child 2.3", parentId: 5, id: 8 }
    ];
    var dataSource = {
        data: JSONData,
        schema: {
            model: {
                id: "id"
            }
        }
    };

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

    test("Initializing from JSON array populates items", function() {
        var ganttChart = new GanttChart(container, JSONData);

        equal(ganttChart.dataSource.data().length, 8);
    });

    test("Initializing from local datasource populates items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: dataSource
        });

        equal(ganttChart.dataSource.data().length, 8);
    });

    test("Initializing from remote datasource populates items", function() {
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

    test("Initializing from existing datasource populates items", function() {
        var ganttChart = new GanttChart(container, {
            dataSource: new GanttChartDataSource({
                data: JSONData
            })
        });

        equal(ganttChart.dataSource.data().length, 8);
    });

    module("Dependencies", {
        setup: function() {
            container = $("<div />");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    test("Dependencies create a DataSource when not specified", function() {
        var ganttChart = new GanttChart(container);

        ok(ganttChart.dependencies.dataSource instanceof kendo.data.DataSource);
    });

    test("Dependencies create a DataSource from Array", function() {
        var ganttChart = new GanttChart(container, {
            dependencies: [{}, {}]
        });

        ok(ganttChart.dependencies.dataSource instanceof kendo.data.DataSource);
    });

    test("Dependencies create a DataSource from datasource", function() {
        var ganttChart = new GanttChart(container, {
            dependencies: {
                dataSource: {
                    data: [{}, {}]
                }
            }
        });

        ok(ganttChart.dependencies.dataSource instanceof kendo.data.DataSource);
    });
    
    test("Dependencies are populated from JSON array", function() {
        var ganttChart = new GanttChart(container, {
            dependencies: [{}, {}]
        });

        ok(ganttChart.dependencies.dataSource.data().length === 2);
    });

    test("Dependencies are populated from local datasource", function() {
        var ganttChart = new GanttChart(container, {
            dependencies: {
                dataSource: {
                    data: [{}, {}]
                }
            }
        });

        ok(ganttChart.dependencies.dataSource.data().length === 2);
    });

    test("Dependencies are populated from remote datasource", function() {
        var ganttChart = new GanttChart(container, {
            dependencies: {
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{}, {}]);
                        }
                    }
                }
            }
        });

        ok(ganttChart.dependencies.dataSource.data().length === 2);
    });


})();
