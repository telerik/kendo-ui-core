(function() {
    var Gantt = kendo.ui.Gantt;
    var GanttDataSource = kendo.data.GanttDataSource;
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

    module("Gantt", {
        setup: function() {
            container = $("<div />");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    test("creates a GanttDataSource", function() {
        var gantt = new Gantt(container);

        ok(gantt.dataSource instanceof kendo.data.GanttDataSource);
    });

    test("creates a GanttDataSource from array", function() {
        var gantt = new Gantt(container, []);

        ok(gantt.dataSource instanceof kendo.data.GanttDataSource);
    });

    test("creates a GanttDataSource from GanttDataSource", function() {
        var gantt = new Gantt(container, {
            dataSource: new kendo.data.GanttDataSource()
        });

        ok(gantt.dataSource instanceof kendo.data.GanttDataSource);
    });

    test("throws exception for wrong DataSource type", function() {
        throws(function() {
            new Gantt(container, {
                dataSource: new kendo.data.DataSource()
            });
        });
    });

    test("dataBinding event is fired", function () {
        new Gantt(container, {
            dataBinding: function (e) {
                ok(true);
            }
        });
    });

    test("dataBinding event can be prevented", 0, function () {
        new Gantt(container, {
            dataBinding: function (e) {
                e.preventDefault();
            },
            dataBound: function () {
                ok(false);
            }
        });
    });

    test("AutoBind=false prevents gantt from binding", 0, function () {
        new Gantt(container, {
            autoBind: false,
            dataBinding: function () {
                ok(false);
            }
        });
    });

    test("resetting DataSource rebinds the widget", 2, function () {
        var gantt = new Gantt(container, {
            dataBinding: function () {
                ok(true);
            }
        });

        gantt.setDataSource(new kendo.data.GanttDataSource());
    });

    test("Initializing from JSON array populates items", function() {
        var gantt = new Gantt(container, JSONData);

        equal(gantt.dataSource.data().length, 8);
    });

    test("Initializing from local datasource populates items", function() {
        var gantt = new Gantt(container, {
            dataSource: dataSource
        });

        equal(gantt.dataSource.data().length, 8);
    });

    test("Initializing from remote datasource populates items", function() {
        var gantt = new Gantt(container, {
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([{}, {}]);
                    }
                }
            }
        });

        equal(gantt.dataSource.data().length, 2);
    });

    test("Initializing from existing datasource populates items", function() {
        var gantt = new Gantt(container, {
            dataSource: new GanttDataSource({
                data: JSONData
            })
        });

        equal(gantt.dataSource.data().length, 8);
    });

    module("Dependencies", {
        setup: function() {
            container = $("<div />");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    test("create GanttDependencyDataSource", function() {
        var gantt = new Gantt(container);

        ok(gantt.dependencies instanceof kendo.data.GanttDependencyDataSource);
    });

    test("create GanttDependencyDataSource from Array", function() {
        var gantt = new Gantt(container, {
            dependencies: [{}, {}]
        });

        ok(gantt.dependencies instanceof kendo.data.GanttDependencyDataSource);
    });

    test("create GanttDependencyDataSource from datasource", function() {
        var gantt = new Gantt(container, {
            dependencies: {
                data: [{}, {}]
            }
        });

        ok(gantt.dependencies instanceof kendo.data.GanttDependencyDataSource);
    });

    test("throw exception for wrong DataSource type", function() {
        throws(function() {
            new Gantt(container, {
                dependencies: new kendo.data.DataSource()
            });
        });
    });

    test("populated from JSON array", function() {
        var gantt = new Gantt(container, {
            dependencies: [{}, {}]
        });

        ok(gantt.dependencies.data().length === 2);
    });

    test("populated from local datasource", function() {
        var gantt = new Gantt(container, {
            dependencies: {
                data: [{}, {}]
            }
        });

        ok(gantt.dependencies.data().length === 2);
    });

    test("populated from remote datasource", function() {
        var gantt = new Gantt(container, {
            dependencies: {
                transport: {
                    read: function(options) {
                        options.success([{}, {}]);
                    }
                }
            }
        });

        ok(gantt.dependencies.data().length === 2);
    });

})();
