(function() {

    var element;
    var timeline;
    var gantt;
    var task;
    var extend = $.extend;

    module("Gantt Dragging", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("moveStart event triggered on timeline move start", 1, function() {
        setupGantt();

        gantt.bind("moveStart", function(e) {
            equal(e.task.uid, task.uid);
        });

        timeline.trigger("moveStart", { task: task });
    });

    test("move event triggered on timeline move", 2, function() {
        setupGantt();

        gantt.bind("move", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        timeline.trigger("move", { task: task, start: new Date("2014/04/15 16:00") });
    });

    test("moveEnd event triggered on timeline moveEnd", 2, function() {
        setupGantt();

        gantt.bind("moveEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        timeline.trigger("moveEnd", { task: task, start: new Date("2014/04/15 16:00") });
    });

    test("_updateTask called on timeline moveEnd", function() {
        setupGantt();

        stub(gantt, "_updateTask");

        timeline.trigger("moveEnd", { task: task, start: new Date("2014/04/15 16:00") });

        ok(gantt.calls("_updateTask"));
    });

    test("_updateTask not called when preventDefault is called on moveEnd", function() {
        setupGantt();

        gantt.bind("moveEnd", function(e) {
            e.preventDefault();
        });

        stub(gantt, "_updateTask");

        timeline.trigger("moveEnd", { task: task, start: new Date("2014/04/15 16:00") });

        ok(!gantt.calls("_updateTask"));
    });

    test("_updateTask called with correct parameters on timeline moveEnd", 3, function() {
        setupGantt();

        stub(gantt, {
            _updateTask: function(taskToUpdate, updateInfo) {
                equal(taskToUpdate.uid, task.uid);
                equal(kendo.toString(updateInfo.start, "yyyy/MM/dd HH:mm"), "2014/04/15 08:00");
                equal(kendo.toString(updateInfo.end, "yyyy/MM/dd HH:mm"), "2014/04/15 10:00");
            }
        });

        timeline.trigger("moveEnd", { task: task, start: new Date("2014/04/15 08:00") });
    });


    module("Timeline Resizing", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("dragging triggers moveStart with correct parameters", 1, function() {
        setupTimeline();

        var taskElement = timeline.view().content.find(".k-task");

        timeline.bind("moveStart", function(e) {
            equal(e.task.uid, task.uid);
        });

        dragStart(timeline, taskElement, taskElement.offset().left);
    });

    test("dragging triggers move with correct parameters", 2, function() {
        setupTimeline();

        var view = timeline.view();
        var taskElement = view.content.find(".k-task");

        timeline.bind("move", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        dragStart(timeline, taskElement, taskElement.offset().left);
        drag(timeline, view._timeSlots()[16].offsetLeft);
    });

    test("dragging and dropping triggers moveEnd with correct parameters", 2, function() {
        setupTimeline();

        var view = timeline.view();
        var taskElement = view.content.find(".k-task");

        timeline.bind("moveEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        dragStart(timeline, taskElement, taskElement.offset().left);
        drag(timeline, view._timeSlots()[16].offsetLeft);
        dragEnd(timeline);
    });

    test("dragging and dropping drags task relative to initial point of drag", 2, function() {
        setupTimeline();

        var view = timeline.view();
        var taskElement = view.content.find(".k-task");

        timeline.bind("moveEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 15:30");
        });

        dragStart(timeline, taskElement, taskElement.offset().left + view._timeSlots()[12].offsetWidth / 2);
        drag(timeline, view._timeSlots()[16].offsetLeft);
        dragEnd(timeline);
    });

    test("dragging and dropping in the middle of a slot when snap is false", function() {
        setupTimeline();

        var view = timeline.view();
        var taskElement = view.content.find(".k-task");
        var targetSlot = view._timeSlots()[16];

        timeline.bind("moveEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:30");
        });

        dragStart(timeline, taskElement, taskElement.offset().left);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);
        dragEnd(timeline);
    });

    test("dragging and dropping in the middle of a slot when snap is true", function() {
        setupTimeline({ snap: true });

        var view = timeline.view();
        var taskElement = view.content.find(".k-task");
        var targetSlot = timeline.view()._timeSlots()[16];

        timeline.bind("moveEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        dragStart(timeline, taskElement, taskElement.offset().left + 10);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);

        dragEnd(timeline);
    });


    module("Timeline Resize clue", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("drag hint created in task row on drag start", function() {
        setupTimeline();

        var taskElement = timeline.view().content.find(".k-task");

        dragStart(timeline, taskElement, taskElement.offset().left + 10);

        ok(taskElement.parents("tr").find(".k-drag-hint").length);
    });

    test("drag hint position when snap is true", function() {
        setupTimeline({ snap: true });

        var content = timeline.view().content;
        var taskElement = content.find(".k-task");
        var contentLeft = content.offset().left;
        var targetSlot = timeline.view()._timeSlots()[16];
        var dragHint;

        dragStart(timeline, taskElement, taskElement.offset().left + 10);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);

        dragHint = content.find(".k-drag-hint .k-task");

        equalWithRound(dragHint.offset().left, contentLeft + targetSlot.offsetLeft);
    });

    test("drag hint position when snap is false", function() {
        setupTimeline();

        var content = timeline.view().content;
        var taskElement = content.find(".k-task");
        var contentLeft = content.offset().left;
        var targetSlot = timeline.view()._timeSlots()[16];
        var dragHint;

        dragStart(timeline, taskElement, taskElement.offset().left);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);

        dragHint = content.find(".k-drag-hint .k-task");

        equalWithRound(dragHint.offset().left, contentLeft + targetSlot.offsetLeft + targetSlot.offsetWidth / 2);
    });

    test("drag hint removed after drop", function() {
        setupTimeline();

        var taskElement = timeline.view().content.find(".k-task");

        dragStart(timeline, taskElement, taskElement.offset().left + 10);

        dragEnd(timeline);

        ok(!taskElement.parents("tr").find(".k-drag-hint").length);
    });

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 5);
    }

    function setupGantt(userOptions) {
        task = new kendo.data.GanttTask({
            title: "Task",
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });

        var options = extend({}, {
            snap: false,
            views: ["day"],
            showWorkHours: false,
            dataSource: [task]
        }, userOptions);

        gantt = new kendo.ui.Gantt(element, options);
        timeline = gantt.timeline;
    }

    function setupTimeline(userOptions) {
        var options = extend({}, { snap: false }, userOptions);
        timeline = new kendo.ui.GanttTimeline(element, options);
        timeline.view("day");
        task = new kendo.data.GanttTask({
            title: "Task",
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });

        timeline._render([task]);
    }

    function dragStart(ganttTimeline, target, offset) {
        var draggable = ganttTimeline._moveDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target,
            x: { location: offset }
        });
    }

    function drag(ganttTimeline, offset) {
        var draggable = ganttTimeline._moveDraggable;

        if (!draggable) {
            return;
        }

        offset += ganttTimeline.view().content.offset().left;

        draggable.trigger("drag", {
            x: { location: offset }
        });
    }

    function dragEnd(ganttTimeline) {
        var draggable = ganttTimeline._moveDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragend");
    }


}());
