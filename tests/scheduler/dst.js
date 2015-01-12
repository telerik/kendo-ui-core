(function() {
    var div;

    var SchedulerEvent = kendo.data.SchedulerEvent;

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 3);
    }

    module("dst", {
        setup: function() {
            div = $("<div/>").width(1000).height(1000);
            div.appendTo(QUnit.fixture);
            this.firsDay = kendo.culture().calendar.firstDay;
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            kendo.culture().calendar.firstDay = this.firsDay;
        }
    });

    var dst = (new Date("2013/3/31 3:00 AM")).getHours() != 3;

    test("clicking the slot from 2:30 to 3:00AM creates event which starts at 2:30 AM and ends at 4:00 AM", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        slots.eq(1).trigger({
            type: "dblclick",
            pageX: slots.eq(1).offset().left,
            pageY: slots.eq(1).offset().top
        });

        $(".k-scheduler-update").click();

        equal(scheduler.dataSource.at(0).start.getHours(), 2);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 30);
        equal(scheduler.dataSource.at(0).end.getHours(), 4);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 0);
    });

    test("clicking the slot from 4:00 to 4:30AM creates event which starts at 4:00 AM and ends at 4:30 AM", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        slots.eq(4).trigger({
            type: "dblclick",
            pageX: slots.eq(4).offset().left,
            pageY: slots.eq(4).offset().top
        });

        $(".k-scheduler-update").click();

        equal(scheduler.dataSource.at(0).start.getHours(), 4);
        equal(scheduler.dataSource.at(0).start.getMinutes(), 0);
        equal(scheduler.dataSource.at(0).end.getHours(), 4);
        equal(scheduler.dataSource.at(0).end.getMinutes(), 30);
    });

    test("event which starts at 2:30 AM and ends at 4:00 AM is properly positioned", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/31 2:30 AM"), end: new Date("2013/3/31 4:00 AM"), title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var event = div.find(".k-event");

        equalWithRound(event.outerHeight(), 3 * slots.outerHeight());
        equalWithRound(event.offset().top, slots.eq(1).offset().top);
    });

    test("event which starts at 4:00 AM and ends at 4:30 AM is properly positioned", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/31 4:00 AM"), end: new Date("2013/3/31 4:30 AM"), title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var event = div.find(".k-event");

        equalWithRound(event.offset().top, slots.eq(4).offset().top);
    });

    test("resizing event by dragging the south handle doesn't skip DST slots", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/31 2:00 AM"), end: new Date("2013/3/31 2:30 AM"), title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var handle = div.find(".k-resize-s");

        resizeStart(scheduler, handle);

        resize(scheduler, handle, slots.eq(2).offset());

        var hint = div.find(".k-marquee");

        equalWithRound(hint.outerHeight(), 3 * slots.outerHeight());
    });

    test("resizing event by dragging the north handle doesn't skip the DST slots", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/31 4:00 AM"), end: new Date("2013/3/31 4:30 AM"), title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var handle = div.find(".k-resize-n");

        resizeStart(scheduler, handle);

        resize(scheduler, handle, slots.eq(2).offset());

        var hint = div.find(".k-marquee");

        equalWithRound(hint.outerHeight(), 3 * slots.outerHeight());
    });

    test("moving event doesn't skip DST slots", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/31 4:00 AM"), end: new Date("2013/3/31 4:30 AM"), title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var event = div.find(".k-event");

        moveStart(scheduler, event);

        move(scheduler, event, slots.eq(2).offset());

        var hint = div.find(".k-event-drag-hint");


        equalWithRound(hint.offset().top,  slots.eq(2).offset().top);
    });

    test("displays event occurring in DST", function() {
        if (!dst) {
            expect(0);
            return;
        }

        var scheduler = new kendo.ui.Scheduler(div, {
            startTime: new Date("2013/3/31 2:00 AM"),
            date: new Date("2013/3/31"),
            dataSource: [
                new SchedulerEvent({ start: new Date("2013/3/30 3:00 AM"), end: new Date("2013/3/30 3:30 AM"), recurrenceRule: "FREQ=DAILY;COUNT=2", title: "" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        var diff = slots.eq(0).outerHeight() / 2;
        var event = div.find(".k-event");

        var startOffset = event.offset();
        var endOffset = $.extend({}, startOffset, { top: startOffset.top + event.outerHeight() });

        var startSlot = scheduler.slotByPosition(startOffset.left, startOffset.top + diff);
        var endSlot = scheduler.slotByPosition(endOffset.left, endOffset.top - diff);

        equal($(startSlot.element).closest("tr").index(), 2);
        equal($(endSlot.element).closest("tr").index(), 2);
    });

    test("dst event is not rendered in month view", function() {
        if (!dst) {
            expect(0);
            return;
        }

        kendo.culture().calendar.firstDay = 1;

        var scheduler = new kendo.ui.Scheduler(div, {
            views: ["month"],
            date: new Date("2014/2/1"),
            dataSource: [
                new kendo.data.SchedulerEvent({ start: new Date("2014/3/10"), end: new Date("2014/3/10"), title: "event" })
            ]
        });

        var slots = div.find(".k-scheduler-content td");

        ok(!div.find(".k-event").length);
    });


    function resizeStart(scheduler, target) {
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

    function resize(scheduler, target, offset) {
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

    function moveStart(scheduler, target) {
        var draggable = scheduler._moveDraggable;

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

    function move(scheduler, target, offset) {
        var draggable = scheduler._moveDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            currentTarget: target,
            x: { location: offset.left },
            y: { location: offset.top }
        });
    }
})();
