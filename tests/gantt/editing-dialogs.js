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
                    data: [{ id: 1, parentId: null, title: "foo", start: new Date("05/05/2014"), end: new Date("05/06/2014") }]
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

        equal($(".k-popup-message").text(), "Are you sure you want to delete this task and all of its dependencies?");
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
                    data: [{ id: 1, parentId: null, title: "foo", start: new Date("05/05/2014"), end: new Date("05/06/2014") },
                        { id: 2, parentId: null, title: "bar", start: new Date("05/07/2014"), end: new Date("05/08/2014") }]
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
    
})();
