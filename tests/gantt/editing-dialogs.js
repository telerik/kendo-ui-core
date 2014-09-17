(function () {
    var Gantt = kendo.ui.Gantt;
    var element;

    module("Task delete confirmation", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    function setup(options) {
        return new Gantt(element, 
            $.extend({
                dataSource: {
                    data: [{ id: 1, parentId: null, percentComplete: 0, title: "Task 1", start: new Date("05/05/2014"), end: new Date("05/06/2014") }]
                }
            }, options)
        );
    }

    test("is shown on delete icon click", function() {
        var gantt = setup();
        var target = gantt.wrapper.find(".k-gantt-tasks .k-task-delete").first();

        equal($(".k-popup-edit-form").length, 0);

        target.click();

        equal($(".k-popup-edit-form").length, 1);
    });

    test("is shown on call to removeTask()", function() {
        var gantt = setup();
        var taskUid = gantt.wrapper.find(".k-task").data("uid");

        equal($(".k-popup-edit-form").length, 0);

        gantt.removeTask(taskUid);

        equal($(".k-popup-edit-form").length, 1);
    });

    test("prevents call to datasource remove", function() {
        var gantt = setup();
        var dataSource = gantt.dataSource;
        var taskUid = gantt.wrapper.find(".k-task").data("uid");

        stub(dataSource, "remove");

        gantt.removeTask(taskUid);

        equal(dataSource.calls("remove"), 0);
    });

    test("default text rendered", function() {
        var gantt = setup();
        var taskUid = gantt.wrapper.find(".k-task").data("uid");

        gantt.removeTask(taskUid);

        equal($(".k-popup-message").text(), "Are you sure you want to delete this task?");
    });

    test("delete button rendered", function() {
        var gantt = setup();
        var taskUid = gantt.wrapper.find(".k-task").data("uid");
        var deleteButton;

        gantt.removeTask(taskUid);

        deleteButton = $(".k-popup-edit-form .k-gantt-delete");

        equal(deleteButton.length, 1);
    });

    test("delete button click calls datasource remove", function() {
        var gantt = setup();
        var dataSource = gantt.dataSource;
        var taskUid = gantt.wrapper.find(".k-task").data("uid");
        var deleteButton;

        stub(dataSource, "remove");

        gantt.removeTask(taskUid);

        deleteButton = $(".k-popup-edit-form .k-gantt-delete");

        deleteButton.click();

        equal(dataSource.calls("remove"), 1);
    });

    test("cancel button rendered", function() {
        var gantt = setup();
        var taskUid = gantt.wrapper.find(".k-task").data("uid");
        var cancelButton;

        gantt.removeTask(taskUid);

        cancelButton = $(".k-popup-edit-form .k-gantt-cancel");

        equal(cancelButton.length, 1);
    });

    test("cancel button click prevents call to  datasource remove", function() {
        var gantt = setup();
        var dataSource = gantt.dataSource;
        var taskUid = gantt.wrapper.find(".k-task").data("uid");
        var cancelButton;

        stub(dataSource, "remove");

        gantt.removeTask(taskUid);

        cancelButton = $(".k-popup-edit-form .k-gantt-cancel");

        cancelButton.click();

        equal(dataSource.calls("remove"), 0);
    });
    
    module("Dependency delete confirmation", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });
    
    function setupDependency(options) {
        return new Gantt(element, 
            $.extend({
                dataSource: {
                    data: [{ id: 1, parentId: null, title: "Task 1", start: new Date("05/05/2014"), end: new Date("05/06/2014") },
                        { id: 2, parentId: null, title: "Task 2", start: new Date("05/07/2014"), end: new Date("05/08/2014") }]
                },
                dependencies: {
                    data: [{ id: 1, predecessorId: 1, successorId: 2, type: 1 }]
                }
            }, options)
        );
    }
    
    test("is shown on call to removeDependency()", function() {
        var gantt = setupDependency();
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");

        equal($(".k-popup-edit-form").length, 0);

        gantt.removeDependency(dependencyUid);

        equal($(".k-popup-edit-form").length, 1);
    });
    
    test("prevents call to datasource remove", function() {
        var gantt = setupDependency();
        var dataSource = gantt.dependencies;
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");

        stub(dataSource, "remove");

        gantt.removeDependency(dependencyUid);

        equal(dataSource.calls("remove"), 0);
    });
    
    test("default text rendered", function() {
        var gantt = setupDependency();
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");
        
        gantt.removeDependency(dependencyUid);

        equal($(".k-popup-message").text(), "Are you sure you want to delete this dependency?");
    });
    
    test("delete button rendered", function() {
        var gantt = setupDependency();
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");
        var deleteButton;

        gantt.removeDependency(dependencyUid);

        deleteButton = $(".k-popup-edit-form .k-gantt-delete");

        equal(deleteButton.length, 1);
    });

    test("delete button click calls datasource remove", function() {
        var gantt = setupDependency();
        var dataSource = gantt.dependencies;
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");
        var deleteButton;

        stub(dataSource, "remove");

        gantt.removeDependency(dependencyUid);

        deleteButton = $(".k-popup-edit-form .k-gantt-delete");

        deleteButton.click();

        equal(dataSource.calls("remove"), 1);
    });
    
    test("cancel button rendered", function() {
        var gantt = setupDependency();
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");
        var cancelButton;

        gantt.removeDependency(dependencyUid);

        cancelButton = $(".k-popup-edit-form .k-gantt-cancel");

        equal(cancelButton.length, 1);
    });

    test("cancel button click prevents call to  datasource remove", function() {
        var gantt = setupDependency();
        var dataSource = gantt.dependencies;
        var dependencyUid = gantt.wrapper.find(".k-line").data("uid");
        var cancelButton;

        stub(dataSource, "remove");

        gantt.removeDependency(dependencyUid);

        cancelButton = $(".k-popup-edit-form .k-gantt-cancel");

        cancelButton.click();

        equal(dataSource.calls("remove"), 0);
    });
    
    module("Advanced form edit", {
        setup: function() {
            element = $("<div/>");
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(element);
            kendo.effects.enable();
        }
    });

    test("dblclicking on task calls editTask", function() {
        var gantt = setup();
        var editTask = stub(gantt, "editTask");

        gantt.wrapper.find(".k-task").first().dblclick();

        equal(editTask.calls("editTask"), 1);

    });

    test("editTask creates window instance", function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        ok(gantt._editor.container.data("kendoWindow"));

    });

    test("default settings are applied to the window", function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        var window = gantt._editor.container.data("kendoWindow");

        ok(window.options.modal);
        ok(!window.options.resizable);
        ok(window.options.draggable);
        equal(window.options.title, "Task");
    });

    test("the popup window is not shown if the edit event is prevented", 1, function() {
        var gantt = setup({
            edit: function(e) {
                e.preventDefault();
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        equal(gantt._editor.container.find(".k-edit-form-container:visible").length, 0);
    });

    test("correct model is passed to the editable instance", function() {
        var gantt = setup();
        var task = gantt.dataSource.at(0);

        gantt.editTask(task.uid);

        var container = gantt._editor.container;

        equal(container.data("kendoEditable").options.model.uid, task.uid);
    });

    test("editTask calls cancelTask", function() {
        var gantt = setup();
        var cancelTask = stub(gantt, "cancelTask");

        gantt.editTask(gantt.dataSource.at(0).uid);

        equal(cancelTask.calls("cancelTask"), 1);
    });

    test("cancelTask closes the popup window", 2, function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        var wnd = gantt._editor.container.data("kendoWindow");

        wnd.bind("close", function() {
            ok(true, "Window is now been closed");
        });

        gantt.cancelTask();
        ok(!gantt._editor.container);
    });

    test("clicking cancel buttons calls cancelTask", function() {
        var gantt = setup();
        var cancelTask = stub(gantt, "cancelTask");

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt._editor.container.find("a.k-gantt-cancel").click();

        ok(cancelTask.calls("cancelTask"));
    });

    test("cancel event is raised when cancel button is clicked", 2, function() {
        var gantt = setup({
            cancel: function(e) {
                equal(e.task, this.dataSource.at(0));
                ok(e.container.length);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt._editor.container.find("a.k-gantt-cancel").click();
    });

    test("preventing the cancel event leaves the window open when cancel button is clicked", function() {
        var gantt = setup({
            cancel: function(e) {
                e.preventDefault();
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
        
        gantt._editor.container.find("a.k-gantt-cancel").click();

        ok(gantt._editor.container.is(":visible"));
    });

    test("clicking close button of the window calls cancelTask", function() {
        var gantt = setup();
        var cancelTask = stub(gantt, "cancelTask");

        gantt.editTask(gantt.dataSource.at(0).uid);

        $(gantt._editor.container.parent().find(".k-i-close")).click();
        
        equal(cancelTask.calls("cancelTask"), 2); // May be called twice
    });

    test("cancel event is raised when window is closed", 2, function() {
        var gantt = setup({
            cancel: function(e) {
                equal(e.task, this.dataSource.at(0));
                ok(e.container.length);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        $(gantt._editor.container.parent().find(".k-i-close")).click();
    });

    test("preventing the cancel event leaves the window open when close button is clicked", function() {
        var gantt = setup({
            cancel: function(e) {
                e.preventDefault();
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt._editor.container.parent().find(".k-i-close").click();

        ok(gantt._editor.container.is(":visible"));
    });

    test("clicking destroy button calls removeTask", function() {
        var gantt = setup();
        var removeTask = stub(gantt, "removeTask");

        gantt.editTask(gantt.dataSource.at(0).uid);
        
        gantt._editor.container.find("a.k-gantt-delete").click();
        
        ok(removeTask.calls("removeTask"));
    });

    test("clicking update button calls saveTask", function() {
        var gantt = setup();
        var saveTask = stub(gantt, "saveTask");

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt._editor.container.find("a.k-gantt-update").click();

        ok(saveTask.calls("saveTask"));
    });

    test("saveTask calls validate", function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        var validate = stub(gantt._editor.container.data("kendoValidator"), "validate");

        gantt.saveTask();

        ok(validate.calls("validate"));
    });

    test("saveTask item does not leave edit mode if validation fails", function() {
        var gantt = setup({
            editable: {
                template: "<input/>"
            },
            dataSource: {
                    data: [{ id: 1, parentId: null, percentComplete: 0, title: "Task 1", start: new Date("05/05/2014"), end: new Date("05/06/2014") }],
                    schema: {
                        model: {
                            fields: {
                                title: { validation: { custom: function() { return false; } } }
                            }
                        }
            }}});

        gantt.editTask(gantt.dataSource.at(0).uid);
        
        gantt.saveTask();

        ok(gantt._editor.container.find(".k-gantt-update").length);
    });

    test("saveTask calls _updateTask", function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        var update = stub(gantt, "_updateTask");

        gantt.saveTask();

        ok(update.calls("_updateTask"));
    });

    test("save event is raised when update button is clicked", function() {
        var gantt = setup({
            save: function(e) {
                equal(e.task, this.dataSource.at(0));
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt._editor.container.find("a.k-gantt-update").click();
    });

    test("saveTask item does not leave edit mode if save event is canceled", function() {
        var gantt = setup({
            save: function(e) {
                e.preventDefault();
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        gantt.saveTask();
        
        ok(gantt._editor.container.find(".k-gantt-update").length);
    });

    test("custom template is used if specified", 1, function() {
        var gantt = setup({
            editable: { template:'<div id="foo">#=title#</div>' },
            edit: function(e) {
                equal(e.container.find("#foo").text(), "Task 1");
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("custom template as function", 1, function() {
        var gantt = setup({
            editable: { template: kendo.template('<div id="foo"></div>') },
            edit: function(e) {
               equal(e.container.find("#foo").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("update button added", 1, function() {
        var gantt = setup({
            edit: function(e) {
                equal(e.container.find("a.k-gantt-update").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("update button added when template is set", 1, function() {
        var gantt = setup({
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-update").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("update button custom text", 1, function() {
        var gantt = setup({
            messages: {
                save: "myUpdate"
            },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-update").text(), "myUpdate");
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("cancel button added", 1, function() {
        var gantt = setup({
            edit: function(e) {
                equal(e.container.find("a.k-gantt-cancel").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("cancel button added when template is set", 1, function() {
        var gantt = setup({
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-cancel").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("cancel button custom text", 1, function() {
        var gantt = setup({
            messages: {
                cancel: "myCancel"
            },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-cancel").text(), "myCancel");
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("destroy button added", 1, function() {
        var gantt = setup({
            edit: function(e) {
                equal(e.container.find("a.k-gantt-delete").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("destroy button added", 1, function() {
        var gantt = setup({
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-delete").length, 1);
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });

    test("destroy button custom text", 1, function() {
        var gantt = setup({
            messages: {
                destroy: "myDelete"
            },
            edit: function(e) {
                equal(e.container.find("a.k-gantt-delete").text(), "myDelete");
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);
    });
    
    test("all fields are wrapped", function() {
        var gantt = setup();

        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div").not(".k-edit-buttons");

        equal(elements.length, 8);
        ok(elements.eq(0).hasClass("k-edit-label"));
        equal(elements.eq(0).find("label").attr("for"), "title");
        equal(elements.eq(1).data("container-for"), "title");
        ok(elements.eq(1).hasClass("k-edit-field"));
    });

    test("non editable field value is shown", function() {
        var gantt = setup({
            dataSource: {
                data: [{ id: 1, parentId: null, percentComplete: 0, title: "Task 1", start: new Date("05/05/2014"), end: new Date("05/06/2014") }],
                schema: { model: { fields: { title: { editable:false } } } }
            }
        });

        gantt.editTask(gantt.dataSource.at(0).uid);

        var container = gantt._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div").not(".k-edit-buttons");

        equal(elements.length, 8);
        ok(elements.eq(0).hasClass("k-edit-label"));
        equal(elements.eq(0).find("label").attr("for"), "title");
        equal(elements.eq(1).text(), "Task 1");
        ok(elements.eq(1).hasClass("k-edit-field"));
    });

})();
