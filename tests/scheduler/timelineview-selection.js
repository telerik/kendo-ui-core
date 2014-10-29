(function() {
    var Scheduler = kendo.ui.Scheduler;
    var SchedulerEvent = kendo.data.SchedulerEvent;
    var keys = kendo.keys;
    var scheduler;
    var container;
    var startDate;
    var view;

    module("Selection timeline", {
        setup: function() {
            container = $("<div />");
            QUnit.fixture.append(container);
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setupWidget(options) {
        startDate = new Date(2013, 1, 3, 0, 0, 0, 0);
        options = options || {};

        var end = new Date(startDate);
        end.setHours(1);

        options = $.extend({
            selectable: true,
            date: new Date(2013, 1, 3, 0, 0, 0, 0),
            views: [
                "timeline"
            ],
            dataSource: [
                { start: startDate, end: end, title: "Test", roomId: 2}
            ]
        }, options);

        scheduler = new Scheduler(container, options);
        view = scheduler.view();

        container.focus();
    }

    function addHours(date, hours) {
        return new Date(+ date + (3600000 * hours));
    }

    function keydown(keyCode, options) {
        var e = $.extend({
            type: "keydown"
        }, options);

        if (typeof keyCode == "string") {
            keyCode = keyCode.charCodeAt(0);
        }

        if (keyCode) {
            e.keyCode = keyCode;
        }

        container.trigger(e);
    }

    test("selects first cell on focus", function() {
        setupWidget();
        container.focusout().focus();
        var td = container.find(".k-scheduler-content td:first");

        ok(td.hasClass("k-state-selected"));
    });

    test("focuses wrapper on mousedown", function() {
        setupWidget();
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        equal(container[0], document.activeElement);
    });

    test("creates selection on mousedown", function() {
        setupWidget();
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        ok(td.hasClass("k-state-selected"));
    });

    test("selects next cell on move", function() {
        setupWidget();
        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(oldSelection[0]).index(), 0);
        equal($(currentSelection[0]).index(), 1);
    });

    test("selects previous cell on move", function() {
        setupWidget();
        keydown(keys.RIGHT);
        var oldSelection = $(".k-scheduler-content .k-state-selected");
        equal($(oldSelection[0]).index(), 1);
        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(currentSelection[0]).index(), 0);
    });

    test("move to previous or next range on move from edge cell", function() {
        setupWidget();
        var oldStartDate = scheduler.view().startDate();

        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal($(currentSelection[0]).index(), $(currentSelection[0]).closest("tr").children().length - 1);
        notEqual(+oldStartDate, +scheduler.view().startDate());

        keydown(keys.RIGHT);

        currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(+oldStartDate, +scheduler.view().startDate());
        equal($(currentSelection[0]).index(), 0);
    });

    test("move to previous or next range preserves selection duration", function() {
        setupWidget();
        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.LEFT);

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.length, 2);

        keydown(keys.RIGHT);

        currentSelection = $(".k-scheduler-content .k-state-selected");

        equal(currentSelection.length, 2);
    });

    test("move to next group restarts selection to single cell", function() {
        setupWidget({
            group: {
                resources: ["Rooms"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }]

        });
        keydown(keys.RIGHT, { shiftKey: true });
        keydown(keys.LEFT);

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.DOWN);

        var currentSelection = $(".k-scheduler-content .k-state-selected");


        equal(oldSelection.length, 2);
        equal(currentSelection.length, 1);
    });

    test("pressing TAB key moves to next event element", function() {
        setupWidget({
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), title: "Test", roomId: 1},
                { start: addHours(startDate, 4), end: addHours(startDate, 6), title: "Test 2", roomId: 1}
            ]
        });

        keydown(keys.TAB);
        var oldSelection = $(".k-scheduler-content .k-state-selected");
        keydown(keys.TAB);
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(currentSelection.hasClass("k-event"));

        notEqual(oldSelection.data("uid"), currentSelection.data("uid"));
    });

    test("pressing TAB key on allDay event moves to next event element", function() {
        setupWidget({
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), isAllDay: true, title: "Test", roomId: 1},
                { start: addHours(startDate, 4), end: addHours(startDate, 6), isAllDay: true, title: "Test 2", roomId: 1}
            ]
        });

        var eventElement = $(container.find(".k-event")[0]);
        eventElement.trigger({
            type: "mousedown",
            currentTarget: eventElement
        });

        var oldSelection = $(".k-scheduler-content .k-state-selected");
        keydown(keys.TAB);
        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(currentSelection.hasClass("k-event"));

        notEqual(oldSelection.data("uid"), currentSelection.data("uid"));
    });

    test("pressing RIGHT key on allDay event moves to next element", function() {
        setupWidget({
            startTime: new Date(2013, 1, 3, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 3, 18, 0, 0, 0),
            views: ["timelineWeek"],
            dataSource: [
                { start: startDate, end: addHours(startDate, 2), isAllDay: true, title: "Test", roomId: 1},
            ]
        });

        var oldStartDate = scheduler.view().startDate();

        var eventElement = $(container.find(".k-event")[0]);

        eventElement.trigger({
            type: "mousedown",
            currentTarget: eventElement
        });

        var oldSelection = $(".k-scheduler-content .k-state-selected");

        keydown(keys.RIGHT);

        equal(+oldStartDate, +scheduler.view().startDate());

        var currentSelection = $(".k-scheduler-content .k-state-selected");

        ok(oldSelection.hasClass("k-event"));
        ok(!currentSelection.hasClass("k-event"));
    });

    test("continues events collection is populated with events", function() {
        setupWidget();

        var event1 = new SchedulerEvent({
            start: startDate,
            end: addHours(startDate, 2),
            title: "Test"
        });
        var event2 = new SchedulerEvent({
            start: addHours(startDate, 4),
            end: addHours(startDate, 6),
            title: "Test"
        });

        view.render([
            event1,
            event2
        ]);
        var events = view.groups[0]._continuousEvents;

        equal(events.length, 2);
        equal(events[0].uid, event1.uid);
        equal(events[1].uid, event2.uid);
    });

    test("continues events collection is populated with all day events", function() {
        setupWidget();

        var event1 = new SchedulerEvent({
            start: startDate,
            end: startDate,
            isAllDay: true,
            title: "Test"
        });
        var event2 = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            isAllDay: true,
            title: "Test"
        });


        view.render([
            event1,
            event2
        ]);

        var events = view.groups[0]._continuousEvents;

        equal(events.length, 2);
        equal(events[0].uid, event1.uid);
        equal(events[1].uid, event2.uid);
    });

    test("continuous all day events must be in same order as rendered", function() {
        setupWidget();

        var allDayEvent1 = new SchedulerEvent({
            start: startDate,
            end: startDate,
            isAllDay: true,
            title: "Test"
        });
        var allDayEvent2 = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            isAllDay: true,
            title: "Test"
        });
        var event = new SchedulerEvent({
            start: addHours(startDate, 6),
            end: addHours(startDate, 11),
            title: "Test"
        });

        view.render([
            allDayEvent1,
            allDayEvent2,
            event
        ]);

        var events = view.groups[0]._continuousEvents;

        equal(events.length, 3);
        equal(events[0].uid, allDayEvent1.uid);
        equal(events[1].uid, allDayEvent2.uid);
        equal(events[2].uid, event.uid);
    });
})();