(function() {

    var element;
    var gantt;
    var timeline;
    var extend = $.extend;
    var Gantt = kendo.ui.Gantt;
    var GanttTask = kendo.data.GanttTask;
    var Timeline = kendo.ui.GanttTimeline;
    var tasks;

    module("Rendering", {
        setup: function() {
            element = $("<div />");
            timeline = new Timeline(element);
            timeline.view("week");
            tasks = [new GanttTask({
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            }), new GanttTask({
                start: new Date("2014/04/16"),
                end: new Date("2014/04/17")
            }), new GanttTask({
                start: new Date("2014/04/15"),
                end: new Date("2014/04/17")
            })];
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("_render(tasks) sets view range", function() {
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                original.apply(this, arguments);
            }
        });

        timeline._render(tasks);

        ok(timeline.view(), "range");
    });

    test("_render(tasks) calls view range() method with tasks range", 2, function() {
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                equal(kendo.toString(range.start, "yyyy/MM/dd"), "2014/04/15");
                equal(kendo.toString(range.end, "yyyy/MM/dd"), "2014/04/17");

                original.apply(this, arguments);
            }
        });

        timeline._render(tasks);
    });

    test("_render([empty]) calls view range() method with range of today's date", 2, function() {
        var today = new Date();
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                equal(kendo.toString(range.start, "yyyy/MM/dd"), kendo.toString(today, "yyyy/MM/dd"));
                equal(kendo.toString(range.end, "yyyy/MM/dd"), kendo.toString(today, "yyyy/MM/dd"));

                original.apply(this, arguments);
            }
        });

        timeline._render([]);
    });


    test("rows table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows").length, 1);
    });

    test("rows table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows").width(), timeline.view()._tableWidth);
    });

    test("rows table populated with rows for each task", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows tr").length, 3);
    });

    test("rows table rows have alternating class names", function() {
        timeline._render(tasks);

        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(0).hasClass("k-alt"));
        ok(timeline.wrapper.find(".k-gantt-rows tr").eq(1).hasClass("k-alt"));
        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(2).hasClass("k-alt"));
    });

    test("rows table rows have only one cell", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows tr:first td").length, 1);
    });

    test("rows table created with only one col in colgroup", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows colgroup col").length, 1);
    });


    test("columns table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns").length, 1);
    });

    test("columns table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns").width(), timeline.view()._tableWidth);
    });

    test("columns table populated with only one row", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns tr").length, 1);
    });

    test("columns table populated with cells for each time slot", function() {
        var slotCount;

        timeline._render(tasks);

        slotCount = timeline.view()._timeSlots().length;

        equal(timeline.wrapper.find(".k-gantt-columns td").length, slotCount);
    });

    test("columns table cells have colspan set to slot span", function() {
        var slots;

        timeline.view("month");
        timeline._render(tasks);

        slots = timeline.view()._timeSlots();

        equal(timeline.wrapper.find(".k-gantt-columns td")[0].colSpan, slots[0].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[1].colSpan, slots[1].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[2].colSpan, slots[2].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[3].colSpan, slots[3].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[4].colSpan, slots[4].span);
    });

    test("columns table populated with cols for each time slot combined span", function() {
        var slots;
        var totalCount = 0;

        timeline.view("month");
        timeline._render(tasks);

        slots = timeline.view()._timeSlots();

        for (var i = 0, length = slots.length; i < length; i++) {
            totalCount += slots[i].span;
        }

        equal(timeline.wrapper.find(".k-gantt-columns col").length, totalCount);
    });


    test("tasks table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks").length, 1);
    });

    test("tasks table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks").width(), timeline.view()._tableWidth);
    });

    test("tasks table populated with rows for each task", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks tr").length, 3);
    });

    test("tasks table rows have only one cell", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks tr:first td").length, 1);
    });

    test("tasks table created with only one col in colgroup", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks colgroup col").length, 1);
    });


    module("Task Tooltip", {
        setup: function() {
            element = $("<div />");
            timeline = new Timeline(element);
            timeline.view("week");
            tasks = [new GanttTask({
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            })];
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("_createTaskTooltip renders tooltip", function() {
        timeline._render(tasks);

        var task = timeline._tasks[0];
        var taskElement = timeline.wrapper.find(".k-task");

        timeline.view()._createTaskTooltip(task, taskElement, 0);

        equal(timeline.wrapper.find(".k-tooltip .k-task-details").length, 1);
    });

    test("_createTaskTooltip renders tooltip with template if set", function() {
        timeline._render(tasks);

        var task = timeline._tasks[0];
        var taskElement = timeline.wrapper.find(".k-task");

        timeline.view().options.tooltip = {
            template: '<div class="customTemplate" />'
        };

        timeline.view()._createTaskTooltip(task, taskElement, 0);

        equal(timeline.wrapper.find(".k-tooltip .customTemplate").length, 1);
    });

    test("_removeTaskTooltip removes tooltip", function() {
        timeline._render(tasks);

        var task = timeline._tasks[0];
        var taskElement = timeline.wrapper.find(".k-task");

        timeline.view()._createTaskTooltip(task, taskElement, 0);

        timeline.view()._removeTaskTooltip();

        equal(timeline.wrapper.find(".k-tooltip .k-task-details").length, 0);
    });


    module("Single Task Rendering", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    function renderTask(taskProperties) {
        timeline._render([new GanttTask(extend({}, {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/18")
        }, taskProperties))]);
    }

    test("wrapper rendered", function() {
        renderTask();

        ok(timeline.view().content.find(".k-task-wrap").length);
    });

    test("dependency drag handles rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-start").length);
        ok(taskWrap.find(".k-task-end").length);
    });

    test("dependency drag handles not rendered when editable is false", function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-start").length);
        ok(!taskWrap.find(".k-task-end").length);
    });

    test("task element rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-single").length);
    });

    test("task element has data-uid attribute set", function() {
        var taskElement;
        var task = new GanttTask({
            start: new Date("2014/04/17"),
            end: new Date("2014/04/18")
        });

        timeline._render([task]);
        
        taskElement = timeline.view().content.find(".k-task-single");

        equal(taskElement.attr("data-uid"), task.uid);
    });

    test("title rendered", function() {
        var taskWrap;

        renderTask({ title: "Task 1" });

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-content .k-task-template").length);
        equal(taskWrap.find(".k-task-content .k-task-template").text(), "Task 1");
    });

    test("delete button rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-content .k-task-actions .k-task-delete").length);
        ok(taskWrap.find(".k-task-content .k-task-actions .k-task-delete .k-si-close").length);
    });

    test("delete button not rendered when editable is false", function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-content .k-task-actions .k-task-delete").length);
        ok(!taskWrap.find(".k-task-content .k-task-actions .k-task-delete .k-si-close").length);
    });

    test("resize handles rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-content .k-resize-handle.k-resize-w").length);
        ok(taskWrap.find(".k-task-content .k-resize-handle.k-resize-e").length);
    });

    test("resize handles not rendered when editable is false", function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-content .k-resize-handle.k-resize-w").length);
        ok(!taskWrap.find(".k-task-content .k-resize-handle.k-resize-e").length);
    });

    test("progress rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-complete").length);
    });

    test("progress drag handle rendered", function() {
        var taskWrap;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-draghandle").length);
    });

    test("progress drag handle not rendered when editable is false", function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderTask();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-draghandle").length);
    });


    test("width of one hour task is equal to one slot in DayView", function() {
        var taskElement;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth);
    });

    test("width of two hour task", function() {
        var taskElement;
        var firstSlot;
        var secondSlot;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 12:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[2];
        secondSlot = timeline.view()._timeSlots()[3];

        equal(taskElement.outerWidth(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of task when not snapped to slot", function() {
        var taskElement;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 10:30")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth / 2);
    });

    test("width of one day task is equal to one slot in WeekView", function() {
        var taskElement;
        var taskSlot;

        timeline.view("week");

        renderTask({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth);
    });

    test("width of one week task is equal to one slot in MonthView", function() {
        var taskElement;
        var taskSlot;

        timeline.view("month");

        renderTask({
            start: new Date("2014/05/11"),
            end: new Date("2014/05/17")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth);
    });


    test("width of task when end is in non working hours and showWorkHours is true", function() {
        var taskElement;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/13 19:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[8];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth);
    });

    test("width of task when end is in non working hours and showWorkHours is false", function() {
        var taskElement;
        var firstSlot;
        var secondSlot;
        var thirdSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderTask({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/13 19:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[16];
        secondSlot = timeline.view()._timeSlots()[17];
        thirdSlot = timeline.view()._timeSlots()[18];

        equal(taskElement.outerWidth(), firstSlot.offsetWidth + secondSlot.offsetWidth + thirdSlot.offsetWidth);
    });

    test("width of task when start is in non working hours and showWorkHours is true", function() {
        var taskElement;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        taskSlot = timeline.view()._timeSlots()[0];

        equal(taskElement.outerWidth(), taskSlot.offsetWidth);
    });

    test("width of task when start is in non working hours and showWorkHours is false", function() {
        var taskElement;
        var firstSlot;
        var secondSlot;
        var thirdSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderTask({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[6];
        secondSlot = timeline.view()._timeSlots()[7];
        thirdSlot = timeline.view()._timeSlots()[8];

        equal(taskElement.outerWidth(), firstSlot.offsetWidth + secondSlot.offsetWidth + thirdSlot.offsetWidth);
    });

    test("width of task when start and end are in non working hours and showWorkHours is true", function() {
        var taskElement;

        renderTask({
            start: new Date("2014/05/13 02:00"),
            end: new Date("2014/05/13 04:00")
        });

        taskElement = timeline.wrapper.find(".k-task");

        equal(taskElement.width(), 0);
    });

    test("width of task when start and end are in non working hours and showWorkHours is false", function() {
        var taskElement;
        var firstSlot;
        var secondSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderTask({
            start: new Date("2014/05/13 02:00"),
            end: new Date("2014/05/13 04:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[2];
        secondSlot = timeline.view()._timeSlots()[3];

        equal(taskElement.outerWidth(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of task with non working hours in the middle and showWorkHours is true", function() {
        var taskElement;
        var firstSlot;
        var secondSlot;

        renderTask({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/14 09:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[8];
        secondSlot = timeline.view()._timeSlots()[9];

        equal(taskElement.outerWidth(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of task with non working hours in the middle and showWorkHours is false", function() {
        var taskElement;
        var firstSlot;
        var lastSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderTask({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/14 09:00")
        });

        taskElement = timeline.wrapper.find(".k-task");
        firstSlot = timeline.view()._timeSlots()[16];
        lastSlot = timeline.view()._timeSlots()[32];

        equal(taskElement.outerWidth(), (lastSlot.offsetLeft - firstSlot.offsetLeft) + lastSlot.offsetWidth);
    });


    test("position of one hour task at beginning of view range", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 08:00"),
            end: new Date("2014/05/13 09:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[0];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft);
    });

    test("position of one hour task at middle of view range", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft);
    });

    test("position of one hour task not snapped to slot", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 10:30"),
            end: new Date("2014/05/13 11:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[2];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft + taskSlot.offsetWidth / 2);
    });

    test("position of one hour task starting in non working hours", function() {
        var taskWrapper;
        var taskSlot;

        renderTask({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[0];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft);
    });


    test("width of progress when 0", function() {
        var progressElement;

        renderTask({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14"),
            percentComplete: 0
        });

        progressElement = timeline.wrapper.find(".k-task-complete");

        equal(progressElement.width(), 0);
    });

    test("width of progress when not 0", function() {
        var progressElement;
        var taskElement;

        renderTask({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00"),
            percentComplete: 0.5
        });

        progressElement = timeline.wrapper.find(".k-task-complete");
        taskElement = timeline.wrapper.find(".k-task");

        equal(progressElement.width(), taskElement.outerWidth() / 2);
    });

    test("position of progress drag handle when progress is 0", function() {
        var handleElement;

        renderTask({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14"),
            percentComplete: 0
        });

        handleElement = timeline.wrapper.find(".k-task-draghandle");

        equal(parseFloat(handleElement.css("left"), 10), 0);
    });

    test("position of progress drag handle when progress is not 0", function() {
        var handleElement;
        var taskElement;

        renderTask({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14"),
            percentComplete: 0.5
        });

        handleElement = timeline.wrapper.find(".k-task-draghandle");
        taskElement = timeline.wrapper.find(".k-task");

        equal(parseFloat(handleElement.css("left"), 10), taskElement.outerWidth() / 2);
    });


    module("Summary Task Rendering", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    function renderSummary(taskProperties) {
        timeline._render([new GanttTask(extend({}, {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/19"),
            summary: true
        }, taskProperties))]);
    }

    test("wrapper rendered", function() {
        renderSummary();

        ok(timeline.view().content.find(".k-task-wrap").length);
    });

    test("dependency drag handles rendered", function() {
        var taskWrap;

        renderSummary();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-start").length);
        ok(taskWrap.find(".k-task-end").length);
    });

    test("dependency drag handles not rendered when editable is false", 2, function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderSummary();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-start").length);
        ok(!taskWrap.find(".k-task-end").length);
    });

    test("summary element rendered", function() {
        var taskWrap;

        renderSummary();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-summary").length);
    });

    test("summary element has data-uid attribute set", function() {
        var summaryElement;
        var task = new GanttTask({
            start: new Date("2014/04/17"),
            end: new Date("2014/04/18"),
            summary: true
        });

        timeline._render([task]);

        summaryElement = timeline.view().content.find(".k-task-summary");

        equal(summaryElement.attr("data-uid"), task.uid);
    });

    test("progress rendered", function() {
        var taskWrap;

        renderSummary();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-summary-progress").length);
        ok(taskWrap.find(".k-task-summary-progress .k-task-summary-complete").length);
    });

    test("progress drag handle not rendered", function() {
        var taskWrap;

        renderSummary();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-draghandle").length);
    });


    test("width of one hour summary is equal to one slot in DayView", function() {
        var summaryElement;
        var summaryCompleteElement;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summaryCompleteElement = timeline.wrapper.find(".k-task-summary-complete");
        summarySlot = timeline.view()._timeSlots()[2];

        equal(summaryElement.width(), summarySlot.offsetWidth);
        equal(summaryCompleteElement.width(), summarySlot.offsetWidth);
    });

    test("width of two hour summary", function() {
        var summaryElement;
        var summaryCompleteElement;
        var firstSlot;
        var secondSlot;

        renderSummary({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 12:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summaryCompleteElement = timeline.wrapper.find(".k-task-summary-complete");
        firstSlot = timeline.view()._timeSlots()[2];
        secondSlot = timeline.view()._timeSlots()[3];

        equal(summaryElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth);
        equal(summaryCompleteElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of summary when not snapped to slot", function() {
        var summaryElement;
        var summaryCompleteElement;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 10:30")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summaryCompleteElement = timeline.wrapper.find(".k-task-summary-complete");
        summarySlot = timeline.view()._timeSlots()[2];

        equal(summaryElement.width(), summarySlot.offsetWidth / 2);
        equal(summaryCompleteElement.width(), summarySlot.offsetWidth / 2);
    });

    test("width of one day summary is equal to one slot in WeekView", function() {
        var summaryElement;
        var summaryCompleteElement;
        var summarySlot;

        timeline.view("week");

        renderSummary({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summaryCompleteElement = timeline.wrapper.find(".k-task-summary-complete");
        summarySlot = timeline.view()._timeSlots()[2];
        
        equal(summaryElement.width(), summarySlot.offsetWidth);
        equal(summaryCompleteElement.width(), summarySlot.offsetWidth);
    });

    test("width of one week summary is equal to one slot in MonthView", function() {
        var summaryElement;
        var summaryCompleteElement;
        var summarySlot;

        timeline.view("month");

        renderSummary({
            start: new Date("2014/05/11"),
            end: new Date("2014/05/17")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summaryCompleteElement = timeline.wrapper.find(".k-task-summary-complete");
        summarySlot = timeline.view()._timeSlots()[2];

        equal(summaryElement.width(), summarySlot.offsetWidth);
        equal(summaryCompleteElement.width(), summarySlot.offsetWidth);
    });


    test("width of summary when end is in non working hours and showWorkHours is true", function() {
        var summaryElement;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/13 19:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summarySlot = timeline.view()._timeSlots()[8];

        equal(summaryElement.width(), summarySlot.offsetWidth);
    });

    test("width of summary when end is in non working hours and showWorkHours is false", function() {
        var summaryElement;
        var firstSlot;
        var secondSlot;
        var thirdSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderSummary({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/13 19:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        firstSlot = timeline.view()._timeSlots()[16];
        secondSlot = timeline.view()._timeSlots()[17];
        thirdSlot = timeline.view()._timeSlots()[18];

        equal(summaryElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth + thirdSlot.offsetWidth);
    });

    test("width of summary when start is in non working hours and showWorkHours is true", function() {
        var summaryElement;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        summarySlot = timeline.view()._timeSlots()[0];

        equal(summaryElement.width(), summarySlot.offsetWidth);
    });

    test("width of summary when start is in non working hours and showWorkHours is false", function() {
        var summaryElement;
        var firstSlot;
        var secondSlot;
        var thirdSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderSummary({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        firstSlot = timeline.view()._timeSlots()[6];
        secondSlot = timeline.view()._timeSlots()[7];
        thirdSlot = timeline.view()._timeSlots()[8];

        equal(summaryElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth + thirdSlot.offsetWidth);
    });

    test("width of summary when start and end are in non working hours and showWorkHours is true", function() {
        var summaryElement;

        renderSummary({
            start: new Date("2014/05/13 02:00"),
            end: new Date("2014/05/13 04:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");

        equal(summaryElement.width(), 0);
    });

    test("width of summary when start and end are in non working hours and showWorkHours is false", function() {
        var summaryElement;
        var firstSlot;
        var secondSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderSummary({
            start: new Date("2014/05/13 02:00"),
            end: new Date("2014/05/13 04:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        firstSlot = timeline.view()._timeSlots()[2];
        secondSlot = timeline.view()._timeSlots()[3];

        equal(summaryElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of summary with non working hours in the middle and showWorkHours is true", function() {
        var summaryElement;
        var firstSlot;
        var secondSlot;

        renderSummary({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/14 09:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        firstSlot = timeline.view()._timeSlots()[8];
        secondSlot = timeline.view()._timeSlots()[9];

        equal(summaryElement.width(), firstSlot.offsetWidth + secondSlot.offsetWidth);
    });

    test("width of summary with non working hours in the middle and showWorkHours is false", function() {
        var summaryElement;
        var firstSlot;
        var lastSlot;

        timeline.options.showWorkHours = false;
        timeline.view("day");

        renderSummary({
            start: new Date("2014/05/13 16:00"),
            end: new Date("2014/05/14 09:00")
        });

        summaryElement = timeline.wrapper.find(".k-task-summary");
        firstSlot = timeline.view()._timeSlots()[16];
        lastSlot = timeline.view()._timeSlots()[32];

        equal(summaryElement.width(), (lastSlot.offsetLeft - firstSlot.offsetLeft) + lastSlot.offsetWidth);
    });



    test("position of one hour summary at beginning of view range", function() {
        var summaryWrapper;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 08:00"),
            end: new Date("2014/05/13 09:00")
        });

        summaryWrapper = timeline.wrapper.find(".k-task-wrap");
        summarySlot = timeline.view()._timeSlots()[0];

        equal(parseFloat(summaryWrapper.css("left"), 10), summarySlot.offsetLeft);
    });

    test("position of one hour task at middle of view range", function() {
        var summaryWrapper;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00")
        });

        summaryWrapper = timeline.wrapper.find(".k-task-wrap");
        summarySlot = timeline.view()._timeSlots()[2];

        equal(parseFloat(summaryWrapper.css("left"), 10), summarySlot.offsetLeft);
    });

    test("position of one hour task not snapped to slot", function() {
        var summaryWrapper;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 10:30"),
            end: new Date("2014/05/13 11:00")
        });

        summaryWrapper = timeline.wrapper.find(".k-task-wrap");
        summarySlot = timeline.view()._timeSlots()[2];

        equal(parseFloat(summaryWrapper.css("left"), 10), summarySlot.offsetLeft + summarySlot.offsetWidth / 2);
    });

    test("position of one hour summary starting in non working hours", function() {
        var summaryWrapper;
        var summarySlot;

        renderSummary({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 09:00")
        });

        summaryWrapper = timeline.wrapper.find(".k-task-wrap");
        summarySlot = timeline.view()._timeSlots()[0];

        equal(parseFloat(summaryWrapper.css("left"), 10), summarySlot.offsetLeft);
    });


    test("width of progress when 0", function() {
        var progressElement;

        renderSummary({
            start: new Date("2014/05/13"),
            end: new Date("2014/05/14"),
            percentComplete: 0
        });

        progressElement = timeline.wrapper.find(".k-task-summary-progress");

        equal(progressElement.width(), 0);
    });

    test("width of progress when not 0", function() {
        var progressElement;
        var summaryElement;

        renderSummary({
            start: new Date("2014/05/13 10:00"),
            end: new Date("2014/05/13 11:00"),
            percentComplete: 0.5
        });

        progressElement = timeline.wrapper.find(".k-task-summary-progress");
        summaryElement = timeline.wrapper.find(".k-task-summary");

        equal(progressElement.width(), summaryElement.width() / 2);
    });



    module("Milestone Task Rendering", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    function renderMilestone(taskProperties) {
        timeline._render([new GanttTask(extend({}, {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/17")
        }, taskProperties))]);
    }

    test("wrapper rendered", function() {
        renderMilestone();

        ok(timeline.view().content.find(".k-task-wrap").length);
    });

    test("dependency drag handles rendered", function() {
        var taskWrap;

        renderMilestone();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-start").length);
        ok(taskWrap.find(".k-task-end").length);
    });

    test("dependency drag handles not rendered when editable is false", 2, function() {
        var taskWrap;

        timeline.view().options.editable = false;

        renderMilestone();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-start").length);
        ok(!taskWrap.find(".k-task-end").length);
    });

    test("milestone element rendered", function() {
        var taskWrap;

        renderMilestone();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(taskWrap.find(".k-task-milestone").length);
    });

    test("milestone element has data-uid attribute set", function() {
        var milestoneElement;
        var task = new GanttTask({
            start: new Date("2014/04/17"),
            end: new Date("2014/04/17")
        });

        timeline._render([task]);

        milestoneElement = timeline.view().content.find(".k-task-milestone");

        equal(milestoneElement.attr("data-uid"), task.uid);
    });

    test("progress drag handle not rendered", function() {
        var taskWrap;

        renderMilestone();

        taskWrap = timeline.view().content.find(".k-task-wrap");

        ok(!taskWrap.find(".k-task-draghandle").length);
    });

    test("position of milestone takes into account milestone width", function() {
        var taskWrapper;
        var taskSlot;

        renderMilestone({
            start: new Date("2014/05/13 11:00"),
            end: new Date("2014/05/13 11:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[3];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft);
    });

    test("position of milestone starting in non working hours", function() {
        var taskWrapper;
        var taskSlot;

        renderMilestone({
            start: new Date("2014/05/13 06:00"),
            end: new Date("2014/05/13 06:00")
        });

        taskWrapper = timeline.wrapper.find(".k-task-wrap");
        taskSlot = timeline.view()._timeSlots()[0];

        equal(parseFloat(taskWrapper.css("left"), 10), taskSlot.offsetLeft);
    });

}());
