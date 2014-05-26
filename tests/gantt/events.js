(function() {

    var element;
    var gantt;
    var Gantt = kendo.ui.Gantt;
    var GanttTask = kendo.data.GanttTask;

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

    test("trigger add event", 1, function() {
        gantt.bind("add", function() {
            ok(true);
        });

        gantt.headerDropDown.trigger("command", { type: "add"});
    });

    test("prevent 'add' event does not add to data source", 1, function() {
        gantt.bind("add", function(e) {
            e.preventDefault();
        });

        stub(gantt.dataSource, "add");
        gantt.headerDropDown.trigger("command", { type: "add" });

        ok(!gantt.dataSource.calls("add"));
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

    test("trigger remove event", function() {
        var task = new GanttTask();

        gantt.bind("remove", function(e) {
            ok(true);
            equal(e.task, task);
        });

        gantt.removeTask(task);
    });

    test("prevent remove event does not remove from data source", function() {
        var task = new GanttTask();

        gantt.bind("remove", function(e) {
            e.preventDefault();
        });

        stub(gantt.dataSource, "remove");
        gantt.removeTask(task);

        ok(!gantt.dataSource.calls("remove"));
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