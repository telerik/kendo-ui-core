(function() {

    var element;
    var gantt;
    var Gantt = kendo.ui.Gantt;
    var GanttTask = kendo.data.GanttTask;
    var GanttDependency = kendo.data.GanttDependency;

    module("Gantt events", {
        setup: function() {
            element = $("<div/>");
            gantt = new Gantt(element);
        },
        teardown: function() {
            gantt.destroy();
            kendo.destroy(element);
        }
    });

    test("window resizing adjust content dimensions", function() {
        stub(gantt, "_adjustDimensions");
        
        $(window).resize();

        ok(gantt.calls("_adjustDimensions"));
    });

    test("trigger add event '_createTask'", function() {
        var task = new GanttTask();

        gantt.bind("add", function(e) {
            ok(true);
            equal(e.task, task);
            ok(!e.dependency);
        });

        gantt._createTask(task);
    });

    test("prevent 'add' event '_createTask' does not add to data source", 1, function() {
        var task = new GanttTask();

        gantt.bind("add", function(e) {
            e.preventDefault();
        });

        stub(gantt.dataSource, "add");
        gantt._createTask(task);

        ok(!gantt.dataSource.calls("add"));
    });

    test("trigger add event '_createDependency'", function() {
        var dependency = new GanttDependency();

        gantt.bind("add", function(e) {
            ok(true);
            equal(e.dependency, dependency);
            ok(!e.task);
        });

        gantt._createDependency(dependency);
    });

    test("prevent 'add' event '_createDependency' does not add to data source", 1, function() {
        var dependency = new GanttDependency();

        gantt.bind("add", function(e) {
            e.preventDefault();
        });

        stub(gantt.dependencies, "add");
        gantt._createDependency(dependency);

        ok(!gantt.dependencies.calls("add"));
    });

    test("trigger edit event", 3, function() {
        var cell = $("td").get(0);
        var task = new GanttTask();

        gantt.bind("edit", function(e) {
            ok(true);
            equal(e.task, task);
            equal(e.container, cell);
        });

        gantt.list.trigger("edit", { model: task, cell: cell });
    });

    test("prevent edit event cancel list's edit", 1, function() {
        var cell = $("td").get(0);
        var task = new GanttTask();

        gantt.bind("edit", function(e) {
            e.preventDefault();
        });

        if (gantt.list.trigger("edit", { model: task, cell: cell })) {
            ok(true);
        }
    });

    test("trigger remove event 'removeTask'", function() {
        var task = new GanttTask();

        gantt.bind("remove", function(e) {
            ok(true);
            equal(e.task, task);
            ok(!e.dependency);
        });

        gantt.removeTask(task);
    });

    test("trigger remove event 'removeDependency'", function() {
        var dependency = new GanttDependency();

        gantt.bind("remove", function(e) {
            ok(true);
            equal(e.dependency, dependency);
            ok(!e.task);
        });

        gantt.removeDependency(dependency);
    });

    test("prevent remove event 'removeTask' does not remove from data source", function() {
        var task = new GanttTask();

        gantt.bind("remove", function(e) {
            e.preventDefault();
        });

        stub(gantt.dataSource, "remove");
        gantt.removeTask(task);

        ok(!gantt.dataSource.calls("remove"));
    });

    test("prevent remove event 'removeDependency' does not remove from data source", function() {
        var dependency = new GanttDependency();

        gantt.bind("remove", function(e) {
            e.preventDefault();
        });

        stub(gantt.dependencies, "remove");
        gantt.removeDependency(dependency);

        ok(!gantt.dependencies.calls("remove"));
    });

    test("trigger cancel event", 3, function() {
        var cell = $("td").get(0);
        var task = new GanttTask();

        gantt.bind("cancel", function(e) {
            ok(true);
            equal(e.task, task);
            equal(e.container, cell);
        });

        gantt.list.trigger("cancel", { model: task, cell: cell });
    });

    test("prevent 'cancel' event prevent list's 'cancel'", 1, function() {
        var cell = $("td").get(0);
        var task = new GanttTask();

        gantt.bind("cancel", function(e) {
            e.preventDefault();
        });

        if (gantt.list.trigger("cancel", { model: task, cell: cell })) {
            ok(true);
        }
    });

    test("trigger save event", function() {
        var task = new GanttTask();
        var info = {};
        gantt.bind("save", function(e) {
            ok(true);
            equal(e.task, task);
            equal(e.values, info);
        });

        gantt._updateTask(task, info);
    });

    test("prevent save event does not update data source", function() {
        var task = new GanttTask();
        var info = {};

        gantt.bind("save", function(e) {
            e.preventDefault();
        });

        stub(gantt.dataSource, "update");
        gantt._updateTask(task, info);

        ok(!gantt.dataSource.calls("update"));
    });

    test("trigger change event", function() {
        gantt.bind("change", function(e) {
            ok(true);
        });

        gantt.list.trigger("change");
    });

})();