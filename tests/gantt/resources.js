(function() {

    var Gantt = kendo.ui.Gantt;
    var GanttTask = kendo.data.GanttTask;
    var element;
    var gantt;
    var extend = $.extend;

    module("Gantt resources", {
        setup: function() {
            element = $("div");
        },
        teardown: function() {
            gantt.destroy();
        }
    });

    test("are initialized", function() {
        gantt = new Gantt(element);

        ok(gantt.resources);
    });

    test("are initialized with default data fields", 4, function() {
        var resources;

        gantt = new Gantt(element);
        resources = gantt.resources;

        equal(resources.field, "resources");
        equal(resources.dataTextField, "name");
        equal(resources.dataColourField, "color");
        equal(resources.dataBaseUnitField, "format");
    });

    test("are initialized with dataSource field", function() {
        gantt = new Gantt(element);

        ok(gantt.resources.dataSource instanceof kendo.data.DataSource);
    });

    test("are fetched by gantt", function() {
        gantt = new Gantt(element, {
            resources: {
                dataSource: [ { } ]
            }
        });

        equal(gantt.resources.dataSource.data().length, 1);
    });

    asyncTest("gantt is bound when resources and tasks are loaded", function() {
        gantt = new Gantt(element, {
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([{}, {}]);
                        }, 2);
                    }
                }
            },
            resources: {
                dataSource: [
                    { name: "foo", color: "00ffff" }
                ]
            },
            dataBound: function() {
                start();
                equal(this.resources.dataSource.data().length, 1);
                equal(this.dataSource.data().length, 2);
            }
        });
    });

    module("Gantt assignments", {
        setup: function() {
            element = $("div");
        },
        teardown: function() {
            gantt.destroy();
        }
    });

    test("are initialized", function() {
        gantt = new Gantt(element);

        ok(gantt.assignments);
    });

    test("are initialized with default data fields", 3, function() {
        var assignments;

        gantt = new Gantt(element);
        assignments = gantt.assignments;

        equal(assignments.dataTaskField, "taskId");
        equal(assignments.dataResourceField, "resourceId");
        equal(assignments.dataValueField, "value");
    });

    test("are initialized with dataSource field", function() {
        gantt = new Gantt(element);

        ok(gantt.assignments.dataSource instanceof kendo.data.DataSource);
    });

    test("are fetched by gantt", function() {
        gantt = new Gantt(element, {
            assignments: {
                dataSource: [{ }]
            }
        });

        equal(gantt.assignments.dataSource.data().length, 1);
    });

    asyncTest("gantt is bound when assignments and tasks are loaded", function() {
        gantt = new Gantt(element, {
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([{}, {}]);
                        }, 2);
                    }
                }
            },
            assignments: {
                dataSource: [{ }]
            },
            dataBound: function() {
                start();
                equal(this.assignments.dataSource.data().length, 1);
                equal(this.dataSource.data().length, 2);
            }
        });
    });

    module("Gantt task resource assignments", {
        setup: function() {
            element = $("div");
        },
        teardown: function() {
            gantt.destroy();
        }
    });

    test("extend tasks with resources with default data field values", 10, function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" },
                    { id: 1, title: "Task2" },
                    { id: 2, title: "Task3" }
                ]
            },
            resources: {
                dataSource: [
                    { id: 0, name: "foo", color: "00ffff" },
                    { id: 1, name: "bar", color: "f0ffff" },
                    { id: 2, name: "foobar", color: "a52a2a" }
                ]
            },
            assignments: {
                dataSource: [
                    { taskId: 0, resourceId: 0, value: 5 },
                    { taskId: 0, resourceId: 1, value: 6 },
                    { taskId: 2, resourceId: 2, value: 7 }
                ]
            }
        });

        var taskTree = gantt.dataSource.taskTree();

        gantt._assignResources(taskTree);

        equal(taskTree[0].resources[0].name, "foo");
        equal(taskTree[0].resources[0].color, "00ffff");
        equal(taskTree[0].resources[0].value, 5);

        equal(taskTree[0].resources[1].name, "bar");
        equal(taskTree[0].resources[1].color, "f0ffff");
        equal(taskTree[0].resources[1].value, 6);

        ok(!taskTree[1].resources);

        equal(taskTree[2].resources[0].name, "foobar");
        equal(taskTree[2].resources[0].color, "a52a2a");
        equal(taskTree[2].resources[0].value, 7);
    });

    test("extend tasks with resources with specified data field values", 3, function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" }
                ]
            },
            resources: {
                dataTextField: "resourceName",
                dataColourField: "customColor",
                dataSource: [
                    { id: 0, resourceName: "foo", customColor: "00ffff" }
                ]
            },
            assignments: {
                dataTaskField: "id",
                dataResourceField: "resource",
                dataValueField: "customValue",
                dataSource: [
                    { id: 0, resource: 0, customValue: 5 }
                ]
            }
        });

        var taskTree = gantt.dataSource.taskTree();

        gantt._assignResources(taskTree);

        equal(taskTree[0].resources[0].name, "foo");
        equal(taskTree[0].resources[0].color, "00ffff");
        equal(taskTree[0].resources[0].value, 5);
    });

    test("extend task with resource field name", function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" }
                ]
            },
            resources: {
                dataSource: [
                    { id: 0, name: "foo", color: "00ffff" }
                ]
            },
            assignments: {
                dataSource: [
                    { taskId: 0, resourceId: 0, value: 5 }
                ]
            }
        });

        var taskTree = gantt.dataSource.taskTree();

        gantt._assignResources(taskTree);

        ok(taskTree[0].get(gantt.resources.field));
    });

    test("extend resource value with format", function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" }
                ]
            },
            resources: {
                dataSource: [
                    { id: 0, name: "foo", format: "0 liters" },
                    { id: 1, name: "bar", format: "p0" },
                ]
            },
            assignments: {
                dataSource: [
                    { taskId: 0, resourceId: 0, value: 5 },
                    { taskId: 0, resourceId: 1, value: 1 }
                ]
            }
        });

        var taskTree = gantt.dataSource.taskTree();
        var resources = taskTree[0].get("resources");

        equal(resources[0].get("value"), "5 liters");
        equal(resources[1].get("value"), "100 %");

    });

    module("Gantt timeline resource rendering", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            gantt = new Gantt(element, {
                dataSource: {
                    data: [
                        new GanttTask(extend({}, {
                            id: 0,
                            start: new Date("2014/04/17"),
                            end: new Date("2014/04/18")
                        })),
                        new GanttTask(extend({}, {
                            id: 1,
                            start: new Date("2014/04/17"),
                            end: new Date("2014/04/18")
                        }))
                    ]
                },
                resources: {
                    dataSource: [
                        { id: 0, name: "foo", color: "red" },
                        { id: 1, name: "bar", color: "green" }
                    ]
                },
                assignments: {
                    dataSource: [
                        { taskId: 0, resourceId: 0, value: 5 },
                        { taskId: 0, resourceId: 1, value: 6 }
                    ]
                }
            });
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    test("renders resource wrap container in task cell", function() {
        ok(gantt.timeline.view().content.find(".k-gantt-tasks tr:first div.k-resources-wrap").length);
    });

    test("does not renders resource wrap container in task cell with no resource", function() {
        ok(!gantt.timeline.view().content.find(".k-gantt-tasks tr:eq(1) div.k-resources-wrap").length);
    });

    test("renders resource text container for each resource", function() {
        var resourcesContainer = gantt.timeline.view()
            .content.find(".k-gantt-tasks tr:first div.k-resources-wrap");

        equal(resourcesContainer.find("span.k-resource").length, 2);
    });

    test("renders resource text", 2, function() {
        var resourcesContainer = gantt.timeline.view()
            .content.find(".k-gantt-tasks tr:first div.k-resources-wrap");

        equal(resourcesContainer.find("span.k-resource:first").text(), "foo");
        equal(resourcesContainer.find("span.k-resource:eq(1)").text(), "bar");
    });

    test("renders resource color", 2, function() {
        var resourcesContainer = gantt.timeline.view()
            .content.find(".k-gantt-tasks tr:first div.k-resources-wrap");

        equal(resourcesContainer.find("span.k-resource:first")[0].style.color, "red");
        equal(resourcesContainer.find("span.k-resource:eq(1)")[0].style.color, "green");
    });

    module("Gantt list resources", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            gantt = new Gantt(element, {
                dataSource: {
                    data: [
                        new GanttTask(extend({}, {
                            id: 0,
                            start: new Date("2014/04/17"),
                            end: new Date("2014/04/18")
                        })),
                        new GanttTask(extend({}, {
                            id: 1,
                            start: new Date("2014/04/17"),
                            end: new Date("2014/04/18")
                        }))
                    ]
                },
                resources: {
                    dataSource: [
                        { id: 0, name: "foo", format: "0 liters" },
                        { id: 1, name: "bar", format: "p0" }
                    ]
                },
                assignments: {
                    dataSource: [
                        { taskId: 0, resourceId: 0, value: 5 },
                        { taskId: 0, resourceId: 1, value: 1 },
                        { taskId: 1, resourceId: 1, value: 1 }
                    ]
                },
                columns: [
                    { field: "resources", title: "Task Resources", sortable: true, width: 200 }
                ]
            });
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    test("pass resource field to list widget", function() {
        var list = gantt.list;

        equal(list.options.resourceField, gantt.resources.field);
    });

    test("render resource column value", 2, function() {
        var content = gantt.list.content;

        equal(content.find("tr:first td:first > span").text(), "foo [5 liters], bar [100 %]");
        equal(content.find("tr:eq(1) td:first > span").text(), "bar [100 %]");
    });

    test("does not initialize sortable for resources column", function() {
        var header = gantt.list.header;

        ok(!header.find("th").data("kendoColumnSorter"));
    });

})();