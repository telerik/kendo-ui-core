(function() {
    var div;

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 2);
    }

    module("scheduler resizing", {
        setup: function() {
            kendo.effects.disable();
            div = $("<div>");
        },
        teardown: function() {
            kendo.destroy(div);
            kendo.effects.enable();
        }
    });

    test("day view renders south resize handle for events which end in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-s").length, 1);
    });

    test("week view renders east resize handle for all day events", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/7 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-e").length, 1);
    });

    test("day view renders north resize handle for events which start in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-n").length, 1);
    });

    test("day view does not render east resize handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-e").length, 0);
    });

    test("week view does not render resize handles when editable is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: false,
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w,.k-resize-s,.k-resize-n").length, 0);
    });

    test("month view does not render resize handles when editable is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: false,
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w").length, 0);
    });

    test("week view does not render resize handles when editable.resize is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: { resize: false },
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w,.k-resize-s,.k-resize-n").length, 0);
    });

    test("month view does not render resize handles when editable.resize is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: { resize: false },
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w").length, 0);
    });

    test("day view does not render west resize handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-w").length, 0);
    });

    test("week view renders west resize handle for all day events", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/7 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-w").length, 1);
    });

    test("day view does not render south resize handle for events which don't end in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/7 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-s").length, 0);
    });

    test("week view does not render east resize handle for all day events which dont end in the current week", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/10 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-e").length, 0);
    });

    test("week view does not render west resize handle for all day events which dont start in the current week", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/1 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-w").length, 0);
    });

    test("day view does not render north resize handle for events which don't start in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource: [
                { start: new Date("2013/6/5 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-n").length, 0);
    });

    test("month view doesn't render east resize handle for events which end in the next week", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/9 11:30"), title: "" }
            ]
        });

        equal(div.find(".k-event:first .k-resize-e").length, 0);
    });

    test("month view doesn't render west resize handle for events which start in the previous week", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/9 11:30"), title: "" }
            ]
        });

        equal(div.find(".k-event:last .k-resize-w").length, 0);
    });

    test("timeline view renders east resize handle for events which end in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-e").length, 1);
    });

    test("timeline view does not render east resize handle for events which end in next day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/7 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-e").length, 0);
    });

    test("timeline view renders west resize handle for events which start in the current day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-w").length, 1);
    });

    test("timeline view does not render west resize handle for events which start in previous day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/5 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-event > .k-resize-w").length, 0);
    });

    test("timeline view does not render resize handles when editable is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: false,
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w,.k-resize-s,.k-resize-n").length, 0);
    });

    test("timeline view does not render resize handles when editable.resize is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            editable: { resize: false },
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), isAllDay: true, title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        equal(div.find(".k-resize-e,.k-resize-w,.k-resize-s,.k-resize-n").length, 0);
    });

    module("scheduler resizing live dom", {
        setup: function() {
            kendo.effects.disable();
            div = $("<div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(div);
            kendo.effects.enable();
        }
    });

    test("timeline dragging and dropping the east resize handle changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");
        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(5));

        equal(scheduler.dataSource.at(0).end.getHours(), 13);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 00);
    });

    test("timeline dragging and dropping the east resize handle changes allDay event to regular one", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/2/3"),
            majorTick: 240,
            views: ["timelineWeek"],
            dataSource: [
                { start: new Date("2013/2/3 00:00"), end: new Date("2013/2/3 00:00"), title: "", isAllDay: true }
            ]
        });

        var handle = div.find(".k-resize-e");
        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(3));

        equal(scheduler.dataSource.at(0).isAllDay, false);
        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 8);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("timeline dragging and dropping the west resize handle changes allDay event to regular one", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/2/3"),
            majorTick: 240,
            views: ["timelineWeek"],
            dataSource: [
                { start: new Date("2013/2/3 00:00"), end: new Date("2013/2/3 00:00"), title: "", isAllDay: true }
            ]
        });

        var handle = div.find(".k-resize-w");
        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(4));

        equal(scheduler.dataSource.at(0).isAllDay, false);
        equal(scheduler.dataSource.at(0).start.getHours(), 8);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("timeline dragging and dropping the west resize handle changes the start time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 12:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");
        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 00);
    });

    test("timeline resize event till the end of the day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 17:00"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:30 PM"), end: new Date("2013/6/6 11:00 PM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.last());

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 7);
    });

    test("timeline resize event till the last but one slot", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 17:00"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:30 PM"), end: new Date("2013/6/6 11:00 PM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(slots.length - 2));

        equal(scheduler.dataSource.at(0).end.getHours(), 23);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("resize event till outside the scheduler", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            endTime: new Date("2013/6/6 17:00"),
            dataSource: [
                { start: new Date("2013/6/6 03:00 PM"), end: new Date("2013/6/6 05:00 PM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");
        var handleOffset = handle.offset();
        var helperElement = kendo.format("<div id='resizeEnd' style='position: absolute;top:{0}px;left: {1}px'>resize end</div>",
            handleOffset.top + 10,
            handleOffset.left);
        var resizeEnd = $(helperElement).appendTo(div.parent());



        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, resizeEnd);

        equal(scheduler.dataSource.at(0).end.getHours(), 17);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("timeline dragging and dropping doesn't change the event time if editable is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            editable: false,
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(2));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("timeline dragging and dropping doesn't change the event time if editable.resize is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            editable: { resize: false },
            views: ["timeline"],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(2));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    tzTest("Sofia", "resizing event in timeline view honours DST", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2014/3/30"),
            views: ["timeline"],
            dataSource: [
                { start: new Date("2014/3/30"), end: new Date("2014/3/30 1:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(3));

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);

        equal(scheduler.dataSource.at(0).end.getHours(), 2);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 00);
    });

    test("dragging and dropping the south resize handle changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(2));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("resize event till the end of the day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 17:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:30 PM"), end: new Date("2013/6/6 11:00 PM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.last());

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 7);
    });

    test("resize event till the last but one slot", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 17:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:30 PM"), end: new Date("2013/6/6 11:00 PM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(slots.length - 2));

        equal(scheduler.dataSource.at(0).end.getHours(), 23);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("dragging and dropping doesn't change the event time if editable is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            editable: false,
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(2));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("dragging and dropping doesn't change the event time if editable.resize is set to false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            editable: { resize: false },
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(2));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("the south/north resize hint starts from the beginning of the slot that contains the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s").last();

        var slots = div.find(".k-scheduler-content td");

        dragstart(scheduler, handle);

        drag(scheduler, handle, slots.eq(1).offset());

        equal(div.find(".k-marquee").offset().left, slots.eq(1).offset().left);
    });

    test("the resize hint of all day events ends ind the event slot", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3"), end: new Date("2013/6/3"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w").last();

        var slots = div.find(".k-scheduler-header-all-day td");

        dragstart(scheduler, handle);

        drag(scheduler, handle, slots.eq(0).offset());

        equalWithRound(div.find(".k-marquee").outerWidth(), 2 * slots.eq(0).outerWidth());
    });

    test("the resize hint of all day events ends ind the event slot in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/27"), end: new Date("2013/5/27"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w").last();

        var slots = div.find(".k-scheduler-content td");

        dragstart(scheduler, handle);

        drag(scheduler, handle, slots.eq(0).offset());

        equalWithRound(div.find(".k-marquee").outerWidth(), 2 * slots.eq(0).outerWidth());
    });

    test("the south/north resize hint is as wide as the slot that contains the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s").last();

        var slots = div.find(".k-scheduler-content td");

        dragstart(scheduler, handle);

        drag(scheduler, handle, slots.eq(1).offset());

        equal(div.find(".k-marquee").outerWidth(), slots.eq(1).outerWidth());
    });

    test("dragging and dropping the south resize handle over the next day changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1).next());

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 4);
    });

    test("dragging and dropping the south resize handle over the next day creates two resize hints", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.eq(1).next().offset());

        equal(div.find(".k-marquee").length, 2);
    });

    test("dragging and dropping the south resize handle over the next day sets the start and end time hints", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.eq(1).next().offset());

        equal(div.find(".k-marquee:first .k-label-top").text(), "10:00 AM");
        equal(div.find(".k-marquee:first .k-label-bottom").text(), "");
        equal(div.find(".k-marquee:last .k-label-top").text(), "");
        equal(div.find(".k-marquee:last .k-label-bottom").text(), "11:00 AM");
    });

    test("dragging and dropping the north resize handle over the previous day changes the start time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1).prev());

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 30);
        equal(scheduler.dataSource.at(0).start.getDate(), 2);
    });

    test("dragging and dropping the north resize handle over the previous day creates two resize hints", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.eq(1).prev().offset());

        equal(div.find(".k-marquee").length, 2);
    });

    test("dragging and dropping the north resize handle over the previous day sets the start and end time hints", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.eq(1).prev().offset());

        equal(div.find(".k-marquee:first .k-label-top").text(), "10:30 AM");
        equal(div.find(".k-marquee:first .k-label-bottom").text(), "");
        equal(div.find(".k-marquee:last .k-label-top").text(), "");
        equal(div.find(".k-marquee:last .k-label-bottom").text(), "10:30 AM");
    });

    test("dragging and dropping the north resize handle changes the start of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 30);
    });

    test("a scheduler event can't be less than half an hour long after resizing via the south resize handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("a scheduler event which ends at 12 AM can't be less than half an hour long after resizing via the south resize handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 20:00"),
            dataSource: [
                { start: new Date("2013/6/6 11:00 PM"), end: new Date("2013/6/7 12:00 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(slots.length - 2), slots.eq(0));

        equal(scheduler.dataSource.at(0).start.getHours(), 23);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 6);
        equal(scheduler.dataSource.at(0).end.getHours(), 23);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
        equal(scheduler.dataSource.at(0).end.getDate(), 6);
    });

    test("a scheduler event can't be less than half an hour long in week view when the cursor is over the next day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 10:00"), end: new Date("2013/6/3 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1).next());

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
    });

    test("a scheduler event can't be less than half an hour long in week view when the cursor is over the previous day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/2 10:00"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 11:00"), end: new Date("2013/6/3 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1).prev());

        equal(scheduler.dataSource.at(0).end.getHours(), 11);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("a scheduler event can't be less than half an hour long after resizing via the north resize handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
    });

    test("dragging the south handle is restricted", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 10:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td");

        dragstart(scheduler, handle);

        var offset = slots.last().offset();
        drag(scheduler, handle, offset);

        offset.top += slots.last().outerHeight() + 10;

        drag(scheduler, handle, offset);
        dragend(scheduler, handle, offset);

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
    });

    test("dragging the north handle is restricted", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td");

        dragstart(scheduler, handle);

        var offset = slots.first().offset();
        drag(scheduler, handle, offset);

        offset.top -= 10;

        drag(scheduler, handle, offset);
        dragend(scheduler, handle, offset);

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
    });

    test("dragging and dropping the east resize handle changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 12:00 AM"), end: new Date("2013/6/2 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 3);
    });

    test("reducing the event length via the east resize handle changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 12:00 AM"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 2);
    });

    test("dragging and dropping the west resize handle changes the start of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 11:00"), end: new Date("2013/6/3 11:30"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 2);
    });

    test("reducing the event length via the west resize handle changes the end time of the event", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 11:00"), end: new Date("2013/6/3 11:30"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 3);
    });

    test("dragging the east resize handle is restricted", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 11:00"), end: new Date("2013/6/2 11:30"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragstart(scheduler, handle);

        var offset = slots.last().offset();
        drag(scheduler, handle, offset);

        offset.left += 100;

        drag(scheduler, handle, offset);

        dragend(scheduler, handle, offset);

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 8);
    });

    test("dragging the west resize handle is restricted", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 11:00"), end: new Date("2013/6/3 11:30"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragstart(scheduler, handle);

        var offset = slots.first().offset();

        drag(scheduler, handle, offset);

        offset.left -= 100;

        drag(scheduler, handle, offset);

        dragend(scheduler, handle, offset);

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 2);
    });

    test("a scheduler all day event can't be less than a day long when dragging the east handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 12:00 AM"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 3);
    });

    test("a scheduler all day event can't be less than a day long when dragging the west handle", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 11:00"), end: new Date("2013/6/3 11:30"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(3));

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 3);
    });

    test("dragging the east handle moves the end of the event in month view and updates its month", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 11:00"), end: new Date("2013/5/27 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.last());

        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 7);
        equal(scheduler.dataSource.at(0).end.getMonth(), 6);
    });

    test("dragging the east handle doesn't create scrollbar", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/29 11:00"), end: new Date("2013/5/29 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(7)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.first().offset());

        var content = div.find(".k-scheduler-content")[0];

        equalWithRound(content.offsetWidth, content.scrollWidth);
        equalWithRound(content.offsetHeight, content.offsetHeight);
    });

    test("dragging the west handle moves the start of the event in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 11:00"), end: new Date("2013/5/27 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-content td");

        dragdrop(scheduler, handle, slots.eq(1));

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 27);
    });

    test("the hint starts from the current slot and ends at event end while dragging the west handle in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/3 11:00"), end: new Date("2013/6/4 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragstart(scheduler, handle, handle.offset());

        drag(scheduler, handle, slots.eq(0).offset());


        equal(div.find(".k-marquee").offset().left, slots.eq(0).offset().left);

        equalWithRound(div.find(".k-marquee").offset().left + div.find(".k-marquee").outerWidth(), slots.eq(3).offset().left);
    });

    test("dragging the west handle moves the start of the event in month view and updates its month", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/7 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 26);
        equal(scheduler.dataSource.at(0).start.getMonth(), 4);
    });

    test("dragging the west handle of the occurrence moves the start of the series if the edit series button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-w:last");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        $(".k-window .k-button:last").click();

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 26);
        equal(scheduler.dataSource.at(0).start.getMonth(), 4);
    });

    test("dragging the west handle of the occurrence head shows the edit recurrence dialog", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-w:first");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        equal($(".k-window").length, 1);
    });

    test("dragging the west handle of the occurrence head moves the start of the series if the edit series button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-w:first");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        $(".k-window .k-button:last").click();

        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 26);
        equal(scheduler.dataSource.at(0).start.getMonth(), 4);
    });

    test("dragging the west handle of the occurrence head moves the start of the exception if the edit occurrence button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-w:first");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        $(".k-window .k-button:first").click();

        equal(scheduler.dataSource.at(1).start.getHours(), 0);
        equal(scheduler.dataSource.at(1).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).start.getDate(), 26);
        equal(scheduler.dataSource.at(1).start.getMonth(), 4);
    });

    test("dragging the south handle of the occurrence moves the end time of the series if the edit series button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00"),
            views: ["week"],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 11:00"), end: new Date("2013/6/2 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-s:last");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1));

        $(".k-window .k-button:last").click();


        equal(scheduler.dataSource.at(0).end.getHours(), 12);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 2);
        equal(scheduler.dataSource.at(0).end.getMonth(), 5);
    });

    test("dragging the south handle of the occurrence moves the end time of the exception if the edit occurrence button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00"),
            views: ["week"],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 11:00"), end: new Date("2013/6/2 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-s:last");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(1));

        $(".k-window .k-button:first").click();


        equal(scheduler.dataSource.at(1).end.getHours(), 12);
        equal(scheduler.dataSource.at(1).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).end.getDate(), 3);
        equal(scheduler.dataSource.at(1).end.getMonth(), 5);
    });

    test("dragging the north handle of the occurrence moves the start time of the series if the edit series button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00"),
            views: ["week"],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 11:30"), end: new Date("2013/6/2 12:00"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-n:last");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        $(".k-window .k-button:last").click();


        equal(scheduler.dataSource.at(0).start.getHours(), 11);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 2);
        equal(scheduler.dataSource.at(0).start.getMonth(), 5);
    });

    test("dragging the north handle of the occurrence moves the start time of the exception if the edit occurrence button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00"),
            views: ["week"],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 11:30"), end: new Date("2013/6/2 12:00"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-n:last");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        $(".k-window .k-button:first").click();


        equal(scheduler.dataSource.at(1).start.getHours(), 11);
        equal(scheduler.dataSource.at(1).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).start.getDate(), 3);
        equal(scheduler.dataSource.at(1).start.getMonth(), 5);
    });

    test("dragging the north handle of the occurrence updates the recurrenceException field if the edit occurrence button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00"),
            views: ["week"],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 11:30"), end: new Date("2013/6/2 12:00"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-n:last");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        $(".k-window .k-button:first").click();

        equal(scheduler.dataSource.at(1).start.getHours(), 11);
        equal(scheduler.dataSource.at(1).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).start.getDate(), 3);
        equal(scheduler.dataSource.at(1).start.getMonth(), 5);
        equal(scheduler.dataSource.at(0).recurrenceException, kendo.toString(kendo.timezone.apply(new Date("2013/6/3 11:30"), 0), "yyyyMMddTHHmmssZ") + ";");
    });

    test("dragging the west handle of the occurrence creates an exception if the edit occurrence button is clicked", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2" }
            ]
        });

        var handle = div.find(".k-resize-w:last");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        $(".k-window .k-button:first").click();

        equal(scheduler.dataSource.at(1).start.getHours(), 0);
        equal(scheduler.dataSource.at(1).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).start.getDate(), 26);
        equal(scheduler.dataSource.at(1).start.getMonth(), 4);
    });

    test("dragging the west handle of the exception preserve recurrenceException of the recurrence head", function() {
        var recurrenceException = kendo.toString(kendo.timezone.apply(new Date("2013/6/7 11:00"), 0), "yyyyMMddTHHmmssZ") + ";";

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { id: 1, start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", recurrenceRule: "FREQ=DAILY;COUNT=2", recurrenceException: recurrenceException },
                { id: 2, recurrenceId: 1, start: new Date("2013/6/7 11:00"), end: new Date("2013/6/7 11:30"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w:last");

        var slots = div.find(".k-scheduler-content td.k-other-month");

        dragdrop(scheduler, handle, slots.first());

        equal(scheduler.dataSource.at(1).start.getHours(), 0);
        equal(scheduler.dataSource.at(1).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(1).start.getDate(), 26);
        equal(scheduler.dataSource.at(1).start.getMonth(), 4);

        equal(scheduler.dataSource.at(0).recurrenceException, recurrenceException);
    });

    test("east resizing is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/7 11:30"), ownerId: 1, title: "" }
            ],
            group: {
                resources: ["Owner"]
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(6), slots.eq(slots.length -2));

        equal(scheduler.dataSource.at(0).end.getDate(), 9);
    });

    test("west resizing is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/7 11:30"), ownerId: 2, title: "" }
            ],
            group: {
                resources: ["Owner"]
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td");

        dragdrop(scheduler, handle, slots.eq(7), slots.eq(1));

        equal(scheduler.dataSource.at(0).start.getDate(), 2);
    });

    test("south resizing is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/6/6 10:00"),
            endTime: new Date("2013/6/6 12:00 PM"),
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 11:00"), end: new Date("2013/6/2 11:30"), ownerId: 1, title: "" }
            ],
            group: {
                resources: ["Owner"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-s");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(4), slots.eq(6));

        equal(scheduler.dataSource.at(0).end.getHours(), 12);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("north resizing is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/6/6 10:00"),
            endTime: new Date("2013/6/6 12:00 PM"),
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 11:30"), end: new Date("2013/6/2 12:00 PM"), ownerId: 2, title: "" }
            ],
            group: {
                resources: ["Owner"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-n");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(6), slots.eq(2));

        equal(scheduler.dataSource.at(0).start.getHours(), 10);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
    });

    test("east resizing hint in month view is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/1 11:30"), end: new Date("2013/6/1 12:00 PM"), ownerId: 1, title: "" }
            ],
            group: {
                resources: ["Owner"]
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(7)");

        dragstart(scheduler, handle, handle.offset());

        drag(scheduler, handle, slots.eq(1).offset());

        equalWithRound(div.find(".k-marquee:first").outerWidth(), slots.eq(1).outerWidth());
    });

    test("west resizing hint in month view is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/8 11:30"), end: new Date("2013/6/8 12:00 PM"), ownerId: 1, title: "" }
            ],
            group: {
                resources: ["Owner"]
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-content td:nth-child(7)");

        dragstart(scheduler, handle, handle.offset());

        drag(scheduler, handle, slots.eq(0).offset());

        equalWithRound(div.find(".k-marquee:first").outerWidth(), slots.eq(0).outerWidth());
    });

    test("east resizing hint in vertically grouped month view is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/7/5 11:30"), end: new Date("2013/7/5 12:00 PM"), ownerId: 1, title: "" }
            ],
            group: {
                resources: ["Owner"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(7)");

        dragstart(scheduler, handle, handle.offset());

        drag(scheduler, handle, slots.eq(5).offset());
        drag(scheduler, handle, slots.eq(6).offset());

        equal(div.find(".k-marquee").length, 1);
    });

    test("west resizing hint in vertically grouped month view is restricted by resource", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/6/1 11:30"), end: new Date("2013/6/1 12:00 PM"), ownerId: 2, title: "" }
            ],
            group: {
                resources: ["Owner"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "ownerId",
                    name: "Owner",
                    dataSource: [
                        { text: "Alex", value: 1, color: "red" },
                        { text: "Bob", value: 2, color: "green" }
                    ],
                    title: "Owner"
                }
           ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-content td:nth-child(6)");

        dragstart(scheduler, handle, handle.offset());

        drag(scheduler, handle, slots.eq(6).offset());
        drag(scheduler, handle, slots.eq(5).offset());

        equal(div.find(".k-marquee").length, 1);
    });

    test("east resize two day all-day event to one day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 12:00 AM"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 2);
    });

    test("east resize two day event to one day in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 10:30 AM"), end: new Date("2013/5/27 10:30 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 27);
    });

    test("west resize two day event to one day in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 10:30 AM"), end: new Date("2013/5/27 10:30 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 27);
    });

    test("east resizing sets the end to 12 AM on the next slot date when the end is increased in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 10:30 AM"), end: new Date("2013/5/27 12:00 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 28);
    });

    test("east resizing sets the end to 12 AM on the next slot date when the end is increased in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 10:30 AM"), end: new Date("2013/6/3 11:00 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(3)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 5);
    });

    test("east resizing sets the end to 12 AM on the same slot date when the end is increased in month view and the event is all day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 10:30 AM"), end: new Date("2013/5/27 12:00 AM"), title: "", isAllDay: true }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(3)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 28);
    });

    test("east resizing sets the end to 12 AM on the same slot date when the end is increased in week view and the event is all day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 12:00 AM"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(3)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 4);
    });

    test("east resizing sets the end to 12 AM on the next slot date when the end is decreased in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 10:30 AM"), end: new Date("2013/5/27 11:00 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 27);
    });

    test("east resizing sets the end to 12 AM on the next slot date when the end is decreased in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 10:30 AM"), end: new Date("2013/6/3 11:00 AM"), title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 3);
    });

    test("east resizing sets the end to 12 AM on the same slot date when the end is decreased in month view and the event is all day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["month"],
            dataSource: [
                { start: new Date("2013/5/26 12:00 AM"), end: new Date("2013/5/27 12:00 AM"), title: "", isAllDay: true }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-content td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 26);
    });

    test("east resizing sets the end to 12 AM on the same slot date when the end is decreased in week view and the event is all day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 12:00 AM"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-e");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(1)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 0);
        equal(scheduler.dataSource.at(0).end.getDate(), 2);
    });

    test("west resize two day all-day event to one day", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).start.getHours(), 0);
        equal(scheduler.dataSource.at(0).start.getDate(), 3);
    });

    test("cancelling the drag operation removes the hint", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ]
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.first().offset());
        dragcancel(scheduler);

        equal(div.find(".k-marquee").length, 0);
    });

    test("resizeStart event is raised", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resizeStart: function(e) {
                equal(e.event, scheduler.dataSource.at(0));
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
    });

    test("resize event is raised", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resize: function(e) {
                equal(e.event, scheduler.dataSource.at(0));
                ok(e.slot.element);
                deepEqual(e.slot.start, new Date("2013/6/3"));
                deepEqual(e.slot.end, new Date("2013/6/4"));
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.first().offset());
    });

    test("preventing resize event cancel the resize", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resize: function(e) {
                e.preventDefault();
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragstart(scheduler, handle, handle.offset());
        drag(scheduler, handle, slots.first().offset());

        equal(div.find(".k-marquee").length, 0);
    });

    test("preventing resize event cancel prevent modification of the model", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resize: function(e) {
                e.preventDefault();
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        var event = scheduler.dataSource.at(0);
        deepEqual(event.start, new Date("2013/6/2 12:00 AM"));
        deepEqual(event.end, new Date("2013/6/3 12:00 AM"));
    });

    test("resizeEnd event is raised", 6, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resizeEnd: function(e) {
                equal(e.event, scheduler.dataSource.at(0));
                ok(e.slot.element);
                deepEqual(e.slot.start, new Date("2013/6/3"));
                deepEqual(e.slot.end, new Date("2013/6/4"));

                deepEqual(e.start, new Date("2013/6/3"));
                deepEqual(e.end, new Date("2013/6/3"));
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));
    });

    test("preventing resizeEnd event cancel the resize", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            views: ["week"],
            dataSource: [
                { start: new Date("2013/6/2 8:00"), end: new Date("2013/6/3 12:00 AM"), isAllDay: true, title: "" }
            ],
            resizeEnd: function(e) {
                e.preventDefault();
            }
        });

        var handle = div.find(".k-resize-w");

        var slots = div.find(".k-scheduler-header-all-day td:nth-child(2)");

        dragdrop(scheduler, handle, slots.eq(0));

        var event = scheduler.dataSource.at(0);

        deepEqual(event.start, new Date("2013/6/2 8:00"));
        deepEqual(event.end, new Date("2013/6/3 12:00 AM"));
    });

    function dragcancel(scheduler) {
        var draggable = scheduler._resizeDraggable;
        draggable.trigger("dragcancel");
    }

    function dragdrop(scheduler, target, via, to) {
        if (!to) {
            to = via;
            via = null;
        }
        var offset = to.offset();

        dragstart(scheduler, target);

        if (via) {
            drag(scheduler, target, via.offset());
        }

        drag(scheduler, target, offset);

        dragend(scheduler, target, offset);
    }

    function dragstart(scheduler, target) {
        var draggable = scheduler._resizeDraggable;

        if (!draggable) {
            return;
        }

        var offset = target.offset();

        draggable.trigger("dragstart", {
            currentTarget: target,
            x: { startLocation: offset.left },
            y: { startLocation: offset.top }
        });
    }

    function drag(scheduler, target, offset) {
        var draggable = scheduler._resizeDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            currentTarget: target,
            x: { location: offset.left },
            y: { location: offset.top }
        });
    }

    function dragend(scheduler, target, offset) {
        var draggable = scheduler._resizeDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragend", {
            currentTarget: target,
            x: { startLocation: offset.left },
            y: { startLocation: offset.top }
        });
    }
})();

