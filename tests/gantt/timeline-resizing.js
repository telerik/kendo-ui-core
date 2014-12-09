(function() {

    var element;
    var timeline;
    var gantt;
    var task;
    var extend = $.extend;

    module("Gantt Resizing", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("resizeStart event triggered on timeline resize start", 1,  function() {
        setupGantt();

        gantt.bind("resizeStart", function(e) {
            equal(e.task.uid, task.uid);
        });

        timeline.trigger("resizeStart", { task: task });
    });

    test("resize event triggered on timeline resize", 3, function() {
        setupGantt();

        gantt.bind("resize", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/16 16:00");
        });

        timeline.trigger("resize", { task: task, start: new Date("2014/04/15 16:00"), end: new Date("2014/04/16 16:00") });
    });

    test("resizeEnd event triggered on timeline resizeEnd", 3, function() {
        setupGantt();

        gantt.bind("resizeEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/16 16:00");
        });

        timeline.trigger("resizeEnd", { task: task, start: new Date("2014/04/15 16:00"), end: new Date("2014/04/16 16:00") });
    });

    test("_updateTask called on timeline resizeEnd", function() {
        setupGantt();

        stub(gantt, "_updateTask");

        timeline.trigger("resizeEnd", { task: task, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 18:00") });

        ok(gantt.calls("_updateTask"));
    });

    test("_updateTask not called when preventDefault is called on resizeEnd", function() {
        setupGantt();

        gantt.bind("resizeEnd", function(e) {
            e.preventDefault();
        });

        stub(gantt, "_updateTask");

        timeline.trigger("resizeEnd", { task: task, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 18:00") });

        ok(!gantt.calls("_updateTask"));
    });

    test("_updateTask called with correct parameter on timeline resizeEnd from start", 3, function() {
        setupGantt();

        stub(gantt, {
            _updateTask: function(taskToUpdate, updateInfo) {
                equal(taskToUpdate.uid, task.uid);
                equal(kendo.toString(updateInfo.start, "yyyy/MM/dd HH:mm"), "2014/04/15 10:00");
                equal(updateInfo.end, undefined);
            }
        });

        timeline.trigger("resizeEnd", { task: task, resizeStart: true, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 18:00") });
    });

    test("_updateTask called with correct parameter on timeline resizeEnd from end", 3, function() {
        setupGantt();

        stub(gantt, {
            _updateTask: function(taskToUpdate, updateInfo) {
                equal(taskToUpdate.uid, task.uid);
                equal(updateInfo.start, undefined);
                equal(kendo.toString(updateInfo.end, "yyyy/MM/dd HH:mm"), "2014/04/15 18:00");
            }
        });

        timeline.trigger("resizeEnd", { task: task, resizeStart: false, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 18:00") });
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

    test("dragging the east resize handle triggers resizeStart with correct parameters", 1, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-e");

        timeline.bind("resizeStart", function(e) {
            equal(e.task.uid, task.uid);
        });

        dragStart(timeline, handle);
    });

    test("dragging the west resize handle triggers resizeStart with correct parameters", 1, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-w");

        timeline.bind("resizeStart", function(e) {
            equal(e.task.uid, task.uid);
        });

        dragStart(timeline, handle);
    });

    test("dragging the east resize handle triggers resize with correct parameters", 3, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-e");

        timeline.bind("resize", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 12:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[16].offsetLeft);
    });

    test("dragging the west resize handle triggers resize with correct parameters", 3, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-w");

        timeline.bind("resize", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 08:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 14:00");
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[8].offsetLeft);
    });

    test("dragging and dropping the east resize handle triggers resizeEnd with correct parameters", 4, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-e");

        timeline.bind("resizeEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 12:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 16:00");
            ok(!e.resizeStart);
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[16].offsetLeft);
        dragEnd(timeline);
    });

    test("dragging and dropping the west resize handle triggers resizeEnd with correct parameters", 4, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-w");

        timeline.bind("resizeEnd", function(e) {
            equal(e.task.uid, task.uid);
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 08:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 14:00");
            ok(e.resizeStart);
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[8].offsetLeft);
        dragEnd(timeline);
    });


    test("dragging and dropping the east resize handle before the west resize handle", 2, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-e");

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 12:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 12:00");
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[0].offsetLeft);
        dragEnd(timeline);
    });

    test("dragging and dropping the west resize handle after the east resize handle", 2, function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-w");

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 14:00");
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 14:00");
        });

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[20].offsetLeft);
        dragEnd(timeline);
    });


    test("dragging and dropping the east resize handle in the middle of a slot when snap is false", function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[16];

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 16:30");
        });

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);
        dragEnd(timeline);
    });

    test("dragging and dropping the east resize handle in the middle of a slot when snap is true", function() {
        setupTimeline({ snap: true });

        var handle = timeline.view().content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[16];

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.end, "yyyy/MM/dd HH:mm"), "2014/04/15 17:00");
        });

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);
        dragEnd(timeline);
    });

    test("dragging and dropping the west resize handle in the middle of a slot when snap is false", function() {
        setupTimeline();

        var handle = timeline.view().content.find(".k-task .k-resize-w");
        var targetSlot = timeline.view()._timeSlots()[7];

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 07:30");
        });

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft + targetSlot.offsetWidth / 2);
        dragEnd(timeline);
    });

    test("dragging and dropping the west resize handle in the middle of a slot when snap is true", function() {
        setupTimeline({ snap: true });

        var handle = timeline.view().content.find(".k-task .k-resize-w");
        var targetSlot = timeline.view()._timeSlots()[7];

        timeline.bind("resizeEnd", function(e) {
            equal(kendo.toString(e.start, "yyyy/MM/dd HH:mm"), "2014/04/15 07:00");
        });

        dragStart(timeline, handle);
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

    test("resize hint created on drag", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");

        dragStart(timeline, handle);

        ok(content.find(".k-gantt-marquee").length);
    });

    test("resize hint height and top are set", 2, function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var contentTablesWrapper = content.find(".k-gantt-tables");
        var resizeHint;

        dragStart(timeline, handle);

        resizeHint = content.find(".k-gantt-marquee");

        equalWithRound(resizeHint.height(), contentTablesWrapper.height());
        equalWithRound(resizeHint.offset().top, contentTablesWrapper.offset().top);
    });

    test("resize hint position", 2, function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var contentLeft = content.find(".k-gantt-tables").offset().left;
        var targetSlot = timeline.view()._timeSlots()[17];
        var startSlot = timeline.view()._timeSlots()[12];
        var resizeHint;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        resizeHint = content.find(".k-gantt-marquee");

        equalWithRound(resizeHint.offset().left, contentLeft + startSlot.offsetLeft);
        equalWithRound(resizeHint.width(), targetSlot.offsetLeft - startSlot.offsetLeft);
    });

    test("resize hint width when dragging east handle before west handle", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var resizeHint;

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[4].offsetLeft);

        resizeHint = content.find(".k-gantt-marquee");

        equal(resizeHint.width(), 0);
    });

    test("resize hint removed after drop", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");

        dragStart(timeline, handle);

        dragEnd(timeline);

        ok(!content.find(".k-gantt-marquee").length);
    });


    test("resize tooltip created on drag", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");

        dragStart(timeline, handle);

        ok(content.find(".k-tooltip").length);
    });

    test("resize tooltip top when space above task is available", function() {
        setupTimeline();

        timeline._render([task, task, task, task]);

        var content = timeline.view().content;
        var elementRow = content.find(".k-gantt-tasks tr:last");
        var handle = elementRow.find(".k-resize-e");
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[17].offsetLeft);

        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().top, elementRow.offset().top - tooltip.outerHeight());
    });

    test("resize tooltip top when space above task is not available", function() {
        setupTimeline();

        var content = timeline.view().content;
        var elementRow = content.find(".k-gantt-tasks tr:last");
        var handle = elementRow.find(".k-resize-e");
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, timeline.view()._timeSlots()[15].offsetLeft);

        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().top, elementRow.offset().top + elementRow.outerHeight());
    });

    test("resize tooltip position when dragging east handle", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[17];
        var resizeHint;
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        resizeHint = content.find(".k-gantt-marquee");
        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().left, resizeHint.offset().left + resizeHint.width() - (Math.round(timeline.view()._resizeTooltipWidth / 2)));
    });

    test("resize tooltip position when dragging east handle near end of content", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[23];
        var contentWrapper = content.find(".k-gantt-tasks");
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft + (targetSlot.offsetWidth / 2));

        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().left, (contentWrapper.offset().left + contentWrapper.width() - 17) - timeline.view()._resizeTooltipWidth);
    });

    test("resize tooltip position when dragging west handle", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-w");
        var targetSlot = timeline.view()._timeSlots()[6];
        var resizeHint;
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        resizeHint = content.find(".k-gantt-marquee");
        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().left, resizeHint.offset().left - (Math.round(timeline.view()._resizeTooltipWidth / 2)));
    });

    test("resize tooltip position when dragging west handle near start of content", function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-w");
        var targetSlot = timeline.view()._timeSlots()[0];
        var contentWrapper = content.find(".k-gantt-tasks");
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft + (targetSlot.offsetWidth / 2));

        resizeHint = content.find(".k-gantt-marquee");
        tooltip = content.find(".k-tooltip");

        equalWithRound(tooltip.offset().left, contentWrapper.offset().left);
    });

    test("resize tooltip text is set", 2, function() {
        setupTimeline();

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[16];
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        tooltip = content.find(".k-tooltip-content");

        equal(tooltip.children().eq(0).text(), "Start: 12:00 PM Tue, Apr 15");
        equal(tooltip.children().eq(1).text(), "End: 4:00 PM Tue, Apr 15");
    });
    
    test("resize tooltip text messages are set", 2, function() {
        setupTimeline({ messages: { views: { start: "Custom Start", end: "Custom End" } } });

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[16];
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        tooltip = content.find(".k-tooltip-content");

        equal(tooltip.children().eq(0).text(), "Custom Start: 12:00 PM Tue, Apr 15");
        equal(tooltip.children().eq(1).text(), "Custom End: 4:00 PM Tue, Apr 15");
    });
    
    test("resize tooltip date format is set", 2, function() {
        setupTimeline({ views: [{ type: "day", resizeTooltipFormat: "ddd M/dd" }] });

        var content = timeline.view().content;
        var handle = content.find(".k-task .k-resize-e");
        var targetSlot = timeline.view()._timeSlots()[16];
        var tooltip;

        dragStart(timeline, handle);
        drag(timeline, targetSlot.offsetLeft);

        tooltip = content.find(".k-tooltip-content");

        equal(tooltip.children().eq(0).text(), "Start: Tue 4/15");
        equal(tooltip.children().eq(1).text(), "End: Tue 4/15");
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

    function dragStart(ganttTimeline, target) {
        var draggable = ganttTimeline._resizeDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target
        });
    }

    function drag(ganttTimeline, offset) {
        var draggable = ganttTimeline._resizeDraggable;

        if (!draggable) {
            return;
        }

        offset += ganttTimeline.view().content.offset().left;

        draggable.trigger("drag", {
            x: { location: offset }
        });
    }

    function dragEnd(ganttTimeline) {
        var draggable = ganttTimeline._resizeDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragend");
    }


}());
