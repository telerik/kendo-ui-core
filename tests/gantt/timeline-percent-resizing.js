(function() {

    var element;
    var timeline;
    var gantt;
    var task;
    var extend = $.extend;

    module("Gantt Task Progress Resizing", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("updateTask called on timeline percentResizeEnd", function() {
        setupGantt();

        stub(gantt, "updateTask");

        timeline.trigger("percentResizeEnd", { task: task, percentComplete: 70 });

        ok(gantt.calls("updateTask"));
    });

    test("updateTask called with correct parameter on timeline percentResizeEnd", 2, function() {
        setupGantt();

        stub(gantt, {
            updateTask: function(taskToUpdate, updateInfo) {
                equal(taskToUpdate.uid, task.uid);
                equal(updateInfo.percentComplete, 70);
            }
        });

        timeline.trigger("percentResizeEnd", { task: task, percentComplete: 70 });
    });


    module("Timeline Task Progress Resizing", {
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

    test("dragging and dropping triggers percentResizeEnd with correct parameters", 2, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task-wrap .k-task-draghandle");

        timeline.bind("percentResizeEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(e.percentComplete, 60);
        });

        dragStart(timeline, handle);
        drag(timeline, 20);
        dragEnd(timeline);
    });

    test("dragging and dropping before task start passes 0 percent to percentResizeEnd", 1, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task-wrap .k-task-draghandle");

        timeline.bind("percentResizeEnd", function(e) {
            equal(e.percentComplete, 0);
        });

        dragStart(timeline, handle);
        drag(timeline, -200);
        dragEnd(timeline);
    });

    test("dragging and dropping after task end passes 100 percent to percentResizeEnd", 1, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task-wrap .k-task-draghandle");

        timeline.bind("percentResizeEnd", function(e) {
            equal(e.percentComplete, 100);
        });

        dragStart(timeline, handle);
        drag(timeline, 200);
        dragEnd(timeline);
    });

    test("dragging updates percentComplete element width", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");
        var percentElement = taskWrap.find(".k-task-complete");

        dragStart(timeline, handle);
        drag(timeline, 20);

        equalWithRound(percentElement.width(), 120, 3);
    });

    test("dragging before task start sets percentComplete element width to 0", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");
        var percentElement = taskWrap.find(".k-task-complete");

        dragStart(timeline, handle);
        drag(timeline, -200);

        equalWithRound(percentElement.width(), 0, 3);
    });

    test("dragging after task end sets percentComplete element width to element width", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var taskElement = taskWrap.find(".k-task");
        var handle = taskWrap.find(".k-task-draghandle");
        var percentElement = taskWrap.find(".k-task-complete");

        dragStart(timeline, handle);
        drag(timeline, 200);

        equalWithRound(percentElement.width(), taskElement.outerWidth(), 3);
    });

    test("canceling drag restores percentComplete element width", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");
        var percentElement = taskWrap.find(".k-task-complete");
        var originalWidth = percentElement.width();

        dragStart(timeline, handle);
        drag(timeline, 20);
        dragCancel(timeline);

        equal(percentElement.width(), originalWidth);
    });

    test("dragging updates drag handle position", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 20);

        equalWithRound(parseInt(handle.css("left"), 10), 120, 3);
    });

    test("dragging before task start sets correct drag handle position", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, -200);

        equalWithRound(parseInt(handle.css("left"), 10), 0, 3);
    });

    test("dragging after task end sets correct drag handle position", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var taskElement = taskWrap.find(".k-task");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 200);

        equalWithRound(parseInt(handle.css("left"), 10), taskElement.outerWidth(), 3);
    });

    test("canceling drag restores drag handle position", 1, function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");
        var originalLeft = handle.css("left");

        dragStart(timeline, handle);
        drag(timeline, 20);
        dragCancel(timeline);

        equal(handle.css("left"), originalLeft);
    });


    module("Timeline Task Progress Resize Clue", {
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

    test("dragging creates tooltip", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 20);

        ok(timeline.element.find(".k-tooltip").length);
    });

    test("tooltip text is correct", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 20);

        equal(timeline.element.find(".k-tooltip-content").text(), "60%");
    });

    test("tooltip vertical position", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");
        var tooltipElement;
        var tooltipFullHeight;

        dragStart(timeline, handle);
        drag(timeline, 20);

        tooltipElement = timeline.element.find(".k-tooltip");
        tooltipFullHeight = tooltipElement.outerHeight() + tooltipElement.find(".k-callout").outerHeight() / 2;

        equalWithRound(tooltipElement.offset().top, taskWrap.offset().top - tooltipFullHeight);
    });

    test("tooltip horizontal position", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var taskPercentElement = taskWrap.find(".k-task-complete");
        var handle = taskWrap.find(".k-task-draghandle");
        var tooltipElement;

        dragStart(timeline, handle);
        drag(timeline, 20);

        tooltipElement = timeline.element.find(".k-tooltip");

        equalWithRound(tooltipElement.offset().left, taskPercentElement.offset().left + taskPercentElement.width() - tooltipElement.outerWidth() / 2);
    });

    test("dropping removes tooltip", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 20);
        dragEnd(timeline);

        ok(!timeline.element.find(".k-tooltip").length);
    });

    test("canceling drag removes tooltip", function() {
        setupTimeline();

        var taskWrap = timeline.view().content.find(".k-task-wrap");
        var handle = taskWrap.find(".k-task-draghandle");

        dragStart(timeline, handle);
        drag(timeline, 20);
        dragCancel(timeline);

        ok(!timeline.element.find(".k-tooltip").length);
    });


    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 3);
    }

    function setupGantt(userOptions) {
        task = new kendo.data.GanttTask({
            title: "Task",
            percentComplete: 50,
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
        var options = extend({}, { snap: false, slotSize: 100 }, userOptions);
        timeline = new kendo.ui.GanttTimeline(element, options);
        timeline.view("day");
        task = new kendo.data.GanttTask({
            title: "Task",
            percentComplete: 50,
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });

        timeline._render([task]);
    }

    function dragStart(ganttTimeline, target) {
        var draggable = ganttTimeline._percentDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target
        });
    }

    function drag(ganttTimeline, delta) {
        var draggable = ganttTimeline._percentDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            x: { initialDelta: delta }
        });
    }

    function dragEnd(ganttTimeline) {
        var draggable = ganttTimeline._percentDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragend");
    }

    function dragCancel(ganttTimeline) {
        var draggable = ganttTimeline._percentDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragcancel");
    }

}());
