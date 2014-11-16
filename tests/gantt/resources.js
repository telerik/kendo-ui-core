(function() {

    var Gantt = kendo.ui.Gantt;
    var GanttTask = kendo.data.GanttTask;
    var ObservableObject = kendo.data.ObservableObject;
    var element;
    var gantt;
    var extend = $.extend;
    var setup = function(options) {
        gantt = new Gantt(element, extend({
            dataSource: {
                data: [
                    new GanttTask(extend({}, {
                        id: 0,
                        orderId: 0,
                        start: new Date("2014/04/17"),
                        end: new Date("2014/04/18"),
                        title: "task1",
                        percentComplete: 1
                    })),
                    new GanttTask(extend({}, {
                        id: 1,
                        orderId: 1,
                        start: new Date("2014/04/17"),
                        end: new Date("2014/04/18"),
                        title: "task2",
                        percentComplete: 1
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
            ],
            showWorkDays: false
        }, options));
    };

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
        equal(resources.dataColorField, "color");
        equal(resources.dataFormatField, "format");
    });

    test("are initialized with dataSource field", function() {
        gantt = new Gantt(element);

        ok(gantt.resources.dataSource instanceof kendo.data.DataSource);
    });

    test("are fetched by gantt", function() {
        gantt = new Gantt(element, {
            resources: {
                dataSource: [{}]
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
            },
            showWorkDays: false
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

        equal(assignments.dataTaskIdField, "taskId");
        equal(assignments.dataResourceIdField, "resourceId");
        equal(assignments.dataValueField, "value");
    });

    test("are initialized with dataSource field", function() {
        gantt = new Gantt(element);

        ok(gantt.assignments.dataSource instanceof kendo.data.DataSource);
    });

    test("are fetched by gantt", function() {
        gantt = new Gantt(element, {
            assignments: {
                dataSource: [{}]
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
                dataSource: [{}]
            },
            dataBound: function() {
                start();
                equal(this.assignments.dataSource.data().length, 1);
                equal(this.dataSource.data().length, 2);
            },
            showWorkDays: false
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

    test("extend tasks with resources with default data field values", 9, function() {
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
            },
            showWorkDays: false
        });

        var taskTree = gantt.dataSource.taskTree();

        gantt._assignResources(taskTree);

        equal(taskTree[0].resources[0].name, "foo");
        equal(taskTree[0].resources[0].color, "00ffff");
        equal(taskTree[0].resources[0].value, 5);

        equal(taskTree[0].resources[1].name, "bar");
        equal(taskTree[0].resources[1].color, "f0ffff");
        equal(taskTree[0].resources[1].value, 6);

        equal(taskTree[2].resources[0].name, "foobar");
        equal(taskTree[2].resources[0].color, "a52a2a");
        equal(taskTree[2].resources[0].value, 7);
    });

    test("extend tasks with empty resources array when task has no assignments", 2, function() {
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
            },
            showWorkDays: false
        });

        var taskTree = gantt.dataSource.taskTree();

        gantt._assignResources(taskTree);

        ok(taskTree[1].resources);
        equal(taskTree[1].resources.length, 0);
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
                dataColorField: "customColor",
                dataSource: [
                    { id: 0, resourceName: "foo", customColor: "00ffff" }
                ]
            },
            assignments: {
                dataTaskIdField: "id",
                dataResourceIdField: "resource",
                dataValueField: "customValue",
                dataSource: [
                    { id: 0, resource: 0, customValue: 5 }
                ]
            },
            showWorkDays: false
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
            },
            showWorkDays: false
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
            },
            showWorkDays: false
        });

        var taskTree = gantt.dataSource.taskTree();
        var resources = taskTree[0].get("resources");

        equal(resources[0].get("formatedValue"), "5 liters");
        equal(resources[1].get("formatedValue"), "100 %");

    });

    test("extent resource value with default percentage format", function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" }
                ]
            },
            resources: {
                dataSource: [
                    { id: 0, name: "foo" },
                ]
            },
            assignments: {
                dataSource: [
                    { taskId: 0, resourceId: 0, value: 1 }
                ]
            },
            showWorkDays: false
        });

        var taskTree = gantt.dataSource.taskTree();
        var resources = taskTree[0].get("resources");

        equal(resources[0].get("formatedValue"), "100 %");
    });

    test("wraps resource editor data with default percentage format", function() {
        gantt = new Gantt(element, {
            dataSource: {
                data: [
                    { id: 0, title: "Task1" }
                ]
            },
            resources: {
                dataSource: [
                    { id: 0, name: "foo" },
                ]
            },
            assignments: {
                dataSource: [
                    { taskId: 0, resourceId: 0, value: 1 }
                ]
            },
            showWorkDays: false
        });

        var data = gantt._wrapResourceData(0);

        equal(data[0].format, "p0");
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
                },
                showWorkDays: false
            });
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    test("pass resource field to timeline widget", function() {
        equal(gantt.timeline.options.resourcesField, gantt.resources.field);
    });

    test("renders resource wrap container in task cell", function() {
        ok(gantt.timeline.view().content.find(".k-gantt-tasks tr:first div.k-resources-wrap").length);
    });

    test("does not renders resource wrap container in task cell with no resources", function() {
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
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    test("pass resource field to list widget", function() {
        setup();
        var list = gantt.list;

        equal(list.options.resourcesField, gantt.resources.field);
    });

    test("render resource column value", 2, function() {
        setup();

        var content = gantt.list.content;

        equal(content.find("tr:first td:first > span").text(), "foo [5 liters], bar [100 %]");
        equal(content.find("tr:eq(1) td:first > span").text(), "bar [100 %]");
    });

    test("does not initialize sortable for resources column", function() {
        setup();
        var header = gantt.list.header;

        ok(!header.find("th").data("kendoColumnSorter"));
    });

    test("pass resources editor for resources column", function() {
        setup();
        var resourceColumn = gantt.list.columns[0];

        ok(resourceColumn.editor);
    });

    test("pass custom editor for resources column", function() {
        var customEditor = function() {};
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editor: customEditor, width: 200 }
            ]
        });

        var resourceColumn = gantt.list.columns[0];

        equal(resourceColumn.editor, customEditor);
    });

    test("call column editor upon edit", function() {
        var customEditor = function() {
            ok(true);
        };

        setup({
            columns: [
                { field: "resources", title: "Task Resources", editor: customEditor, editable: true }
            ]
        });

        gantt.list.content.find("td").trigger("dblclick");
    });

    test("pass options to column editor upon edit", function() {
        var customEditor = function(container, model) {
            ok(container.is("td"));
            equal(model.get("title"), "task1");
        };

        setup({
            columns: [
                { field: "resources", title: "Task Resources", editor: customEditor, editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");
    });

    test("does not attach editable widget to edited cell", function() {
        var customEditor = function() {};

        setup({
            columns: [
                { field: "resources", title: "Task Resources", editor: customEditor, editable: true }
            ]
        });

        var targetCell = gantt.list.content.find("td:first").trigger("dblclick");

        ok(!targetCell.data("kendoEditable"));
    });

    test("does not attach modelCopy to edited cell", function() {
        var customEditor = function() { };

        setup({
            columns: [
                { field: "resources", title: "Task Resources", editor: customEditor, editable: true }
            ]
        });

        var targetCell = gantt.list.content.find("td:first").trigger("dblclick");

        ok(!targetCell.data("modelCopy"));
    });

    module("ResourceEditor", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
            kendo.effects.enable();
        }
    });

    test("is created upon cell edit", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        ok(gantt._resourceEditor);
    });

    test("properties are initialized from options", 4, function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        equal(editor.resourcesField, gantt.resources.field);
        ok(typeof editor.createButton === "function");
        ok(editor.model instanceof kendo.data.ObservableObject);
        equal(editor.wrapper, editor.element);
    });

    test("creates kendoWindow", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        ok(editor.window instanceof kendo.ui.Window);
    });

    test("create window element with class names", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var window = gantt._resourceEditor.window;

        ok(window.element.hasClass("k-popup-edit-form k-gantt-edit-form"));
    });

    test("create kendoWindow with options", 4, function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ],
            messages: {
                editor: {
                    resourcesEditorTitle: "Custom"
                }
            }
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        ok(editor.window.options.modal);
        ok(editor.window.options.draggable);
        ok(!editor.window.options.resizable);

        equal(editor.window.options.title, "Custom");
    });

    test("creates kendoGrid", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        ok(editor.grid instanceof kendo.ui.Grid);
    });

    test("creates kendoGrid with options", 3, function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        ok(grid.options.sortable);
        ok(grid.options.editable);
        ok(grid.options.filterable);
    });

    test("creates kendoGrid with specific column options", 4, function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ],
            messages: {
                editor: {
                    resourcesHeader: "foo",
                    unitsHeader: "bar"
                }
            }
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var columns = gantt._resourceEditor.grid.options.columns;
        var resourceNameColumn = columns[0];
        var resourceValueColumn = columns[1];

        equal(resourceNameColumn.field, "name");
        equal(resourceNameColumn.title, "foo");

        equal(resourceValueColumn.field, "value");
        equal(resourceValueColumn.title, "bar");
    });

    test("renders content container", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var container = gantt._resourceEditor.container;

        ok(container.hasClass("k-edit-form-container k-resources-form-container"));
    });

    test("renders content", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var container = gantt._resourceEditor.container;

        ok(container.find("div[id='resources-grid']").length > 0);
        ok(container.find(".k-edit-buttons.k-state-default").length > 0);
    });

    test("renders buttons", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var buttonsContainer = gantt._resourceEditor
            .container.find(".k-edit-buttons.k-state-default");

        ok(buttonsContainer.find(".k-primary.k-button.k-gantt-update").length > 0);
        ok(buttonsContainer.find(".k-button.k-gantt-cancel").length > 0);
    });

    test("cancel button click trigger close", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var cancelButton = $(".k-gantt-cancel");

        stub(editor, {
            close: function() {
                ok(true);
            }
        });

        cancelButton.click();
    });

    test("save button click calls close", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var saveButton = $(".k-gantt-update");

        stub(editor, {
            close: function() {
                ok(true);
            }
        });

        saveButton.click();
    });

    test("save button click calls updateModel", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var saveButton = $(".k-gantt-update");

        stub(editor, {
            _updateModel: function() {
                ok(true);
            }
        });

        saveButton.click();
    });

    test("save button updates model", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var saveButton = $(".k-gantt-update");
        var grid = gantt._resourceEditor.grid;

        grid.dataSource.at(0).set("value", null);
        grid.dataSource.at(1).set("value", 5);

        editor
            .unbind("save")
            .bind("save", function(e) {
                equal(e.model[gantt.resources.field].length, 1);
                equal(e.model[gantt.resources.field][0].get("value"), 5);
            });

        saveButton.click();
    });

    test("save button click triggers save event", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var saveButton = $(".k-gantt-update");

        editor.bind("save", function(e) {
            ok(e.container.is("td"));
            equal(e.model, editor.model);
        });

        saveButton.click();
    });

    test("save button updates assignments", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        var model = gantt.dataSource.at(0);

        gantt.list.content.find("td:first").trigger("dblclick");

        stub(gantt, {
            _updateAssignments: function(id, resources) {
                ok(true);
                equal(id, model.get("id"));
                equal(resources.length, 2);
            }
        });

        $(".k-gantt-update").click();
    });

    test("save button update model assignments with models with value", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        var model = gantt.dataSource.at(0);

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        editor.unbind("save");
        editor.grid.dataSource.at(0).set("value", null);
        editor.grid.dataSource.at(1).set("value", 0);

        $(".k-gantt-update").click();

        equal(editor.model.get(gantt.resources.field).length, 0);
    });

    test("close method closes window", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        stub(editor.window, {
            close: function() {
                ok(true);
            }
        });

        editor.close();
    });

    test("open method opens window", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        stub(editor.window, {
            open: function() {
                ok(true);
            }
        });

        editor.open();
    });

    test("closing window calls destroy", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;
        var originalDestroy = editor.destroy;
        var destroy = stub(editor, {
            destroy: function() {
                ok(true);
                originalDestroy.apply(editor);
            }
        });

        editor.destroy();
    });

    test("closing window via close button calls close", function() {
        setup({
            columns: [
                { field: "resources", title: "Task Resources", editable: true }
            ]
        });

        gantt.list.content.find("td:first").trigger("dblclick");

        var editor = gantt._resourceEditor;

        stub(editor.window, {
            close: function() {
                ok(true);
            }
        });

        $(".k-i-close").click();
    });

    module("ResourceEditor grid", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            kendo.effects.disable();
            setup({
                columns: [
                    { field: "resources", title: "Task Resources", editable: true }
                ]
            });
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
            kendo.effects.enable();
        }
    });

    test("renders checkbox in resource name column", function() {
        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        equal(grid.table.find("td > label > input[type='checkbox']").length, 2);
    });

    test("renders resource text in label", function() {
        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        equal(grid.table.find("tr:first > td:first > label").text(), "foo");
        equal(grid.table.find("tr:eq(1) > td:first > label").text(), "bar");
    });

    test("renders checked input when task has value from resources", function() {
        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        ok(grid.table.find("tr:first > td:first > label > input").prop("checked"));
        ok(grid.table.find("tr:eq(1) > td:first > label > input").prop("checked"));
    });

    test("renders unchecked input when task does not have value from resources", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        ok(!grid.table.find("tr:first > td:first > label > input").prop("checked"));
        ok(grid.table.find("tr:eq(1) > td:first > label > input").prop("checked"));
    });

    test("renders formated resource value", function() {
        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        equal(grid.table.find("tr:first > td:eq(1)").text(), "5 liters");
        equal(grid.table.find("tr:eq(1) > td:eq(1)").text(), "100 %");
    });

    test("renders empty resource value when task has not assignment from resources", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        equal(grid.table.find("tr:first > td:eq(1)").text(), "");
        equal(grid.table.find("tr:eq(1) > td:eq(1)").text(), "100 %");
    });

    test("clicking checked checkbox remove resource value assignment", function() {
        gantt.list.content.find("td:first").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        grid.table.find("tr:first > td:first > label > input").click();

        equal(grid.dataSource.at(0).get("value"), null);
    });

    test("clicking unchecked checkbox adds resource value assignment", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        grid.table.find("tr:first > td:first > label > input").click();

        equal(grid.dataSource.at(0).get("value"), 1);
    });

    test("adding resource assignment value checks checkbox", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        grid.dataSource.at(0).set("value", 1);

        ok(grid.table.find("tr:first > td:first > label > input").prop("checked"));
    });

    test("setting resource assignment value to 0 uncheck checkbox", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        grid.dataSource.at(1).set("value", 0);

        ok(!grid.table.find("tr:eq(1) > td:first > label > input").prop("checked"));
    });

    test("setting resource assignment value to null uncheck checkbox", function() {
        gantt.list.content.find("td:eq(1)").trigger("dblclick");

        var grid = gantt._resourceEditor.grid;

        grid.dataSource.at(1).set("value", null);

        ok(!grid.table.find("tr:eq(1) > td:first > label > input").prop("checked"));
    });

    module("Advanced form resource edit", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            kendo.effects.disable();
            setup({
                columns: [
                    { field: "resources", title: "Task Resources", editable: true }
                ]
            });
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
            kendo.effects.enable();
        }
    });

    test("wrap resource field", 6, function() {
        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div").not(".k-edit-buttons");

        equal(elements.length, 11);

        equal(elements.eq(8).find("label").attr("for"), "resources");
        equal(elements.eq(8).find("label").text(), "Resources");

        ok(elements.eq(9).hasClass("k-gantt-resources"));

        equal(elements.eq(10).attr("data-container-for"), "resources");
        ok(elements.eq(10).hasClass("k-edit-field"));
    });

    test("renders button for resources editor", 2, function() {
        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");
        var button = container.find("[data-container-for='resources'] > a.k-button");

        ok(button.length === 1);
        equal(button.text(), "Assign");
    });

    test("clicking resources 'assign' button creates resources editor", function() {
        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");

        container.find("[data-container-for='resources'] > a.k-button").click();

        ok(gantt._resourceEditor);
    });

    test("clicking resources editor save button does not trigger save event", function() {
        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");

        container.find("[data-container-for='resources'] > a.k-button").click();

        var editor = gantt._resourceEditor;
        var triggered = false;

        editor.bind("save", function() {
            triggered = true;
        });

        editor.container.find(".k-gantt-update").click();

        ok(!triggered);
    });

    test("update assignments upon save button click", 3, function() {
        var model = gantt.dataSource.at(0);

        gantt.editTask(model.uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");

        stub(gantt, {
            _updateAssignments: function(id, resources) {
                ok(true);
                equal(id, model.get("id"));
                equal(resources.length, 2);
            }
        });

        container.find("a.k-gantt-update").click();
    });

    module("Gantt", {
        setup: function() {
            element = $("div");
            setup();
        },
        teardown: function() {
            gantt.destroy();
        }
    });

    test("updates assignment dataSource - all resources cleared", function() {
        gantt._updateAssignments(gantt.dataSource.at(0).get("id"), []);

        equal(gantt.assignments.dataSource.total(), 1);
    });

    test("updates assignment dataSource - all resources added", function() {
        var resources = [
           new ObservableObject({ id: 0, value: 1 }),
           new ObservableObject({ id: 1, value: 1 })
        ];

        gantt._updateAssignments(gantt.dataSource.at(1).get("id"), resources);

        equal(gantt.assignments.dataSource.total(), 4);
    });

    test("updates assignment dataSource - update existing resources", 3, function() {
        var resources = [
           new ObservableObject({ id: 0, value: 4 }),
           new ObservableObject({ id: 1, value: 4 })
        ];
        var assignments = gantt.assignments.dataSource;

        gantt._updateAssignments(gantt.dataSource.at(0).get("id"), resources);

        equal(assignments.total(), 3)

        equal(assignments.at(0).get(gantt.assignments.dataValueField), 4);
        equal(assignments.at(0).get(gantt.assignments.dataValueField), 4);
    });

    test("remove assignments for deleted task", function() {
        var task = gantt.dataSource.get(0);
        var assignments = gantt.assignments.dataSource;

        gantt._removeTask(task);

        equal(assignments.data().length, 1);
    });

})();