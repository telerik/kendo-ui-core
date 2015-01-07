(function() {
   var Scheduler = kendo.ui.Scheduler,
        keys = kendo.keys,
        scheduler,
        container,
        now;

    module("Selection", {
        setup: function() {
            kendo.effects.disable();

            now = new Date();
            container = $("<div />");

            $(QUnit.fixture).append(container);

            scheduler = new Scheduler(container, {
                selectable: true,
                views: [
                    "day",
                    { type: "week", selected: true }
                ],
                dataSource: [
                    { start: now, end: new Date(now + (60 * 60 * 1000)), title: "Test" }
                ]
            });

            container.focus();
        },

        teardown: function() {
          kendo.destroy(QUnit.fixture);
          kendo.effects.enable();
        }
    });

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

    function press(cell) {
        scheduler._createSelection(cell[0]);
        scheduler.view().select(scheduler._selection);
    }

    function move(cell) {
        scheduler._mouseMove({
            currentTarget: cell[0]
        });
    }

    test("scheduler wrapper is focusable", function() {
        equal(container.attr("tabindex"), 0);
    });

    test("scheduler creates selection on mousedown", function() {
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        ok(td.hasClass("k-state-selected"));
    });

    test("scheduler does not move selection on right mouse click", function() {
        var td = container.find(".k-scheduler-content td:last");

        td.trigger({
            type: "mousedown",
            currentTarget: td,
            which: 3
        });

        ok(!td.hasClass("k-state-selected"));
    });

    test("scheduler sets selection range based on clicked cell", function() {
        var td = container.find(".k-scheduler-header td").eq(5),
            slot = scheduler.view().selectionByElement(td),
            selection;

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        selection = scheduler._selection;

        deepEqual(selection.start, slot.startDate());
        deepEqual(selection.end, slot.endDate());
        equal(selection.isAllDay, slot.isDaySlot);
        equal(selection.groupIndex, slot.groupIndex);
    });

    test("scheduler focuses wrapper on mousedown", 0, function() {
        var input = $("<input/>");
        var td = container.find(".k-scheduler-toolbar").append(input);

        input.mousedown();

        scheduler.wrapper.triggerHandler({
            type: "mousedown",
            target: input[0],
            preventDefault: function() {
                ok(false);
            }
        });
    });

    test("scheduler focuses input placed in wrapper", function() {
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        equal(container[0], document.activeElement);
    });

    test("scheduler removes selected state on blur", function() {
        var td = container.find(".k-scheduler-content td:first");

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        container.focusout();

        ok(!td.hasClass("k-state-selected"));
    });

    test("scheduler selects first cell on focus", function() {
        var td = container.find(".k-scheduler-content td:first");

        ok(td.hasClass("k-state-selected"));
    });

    test("scheduler restores previous selected state on focus", function() {
        var td = container.find(".k-scheduler-content td").eq(1);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        container.focusout();
        container.focus();

        ok(td.hasClass("k-state-selected"));
        equal(container.find(".k-scheduler-content .k-state-selected").length, 1);
    });

    test("scheduler updates selected date on mousedown", function() {
        var date = new Date(2013, 6, 10);

        scheduler.date(date);

        var td = container.find(".k-scheduler-content td").eq(0);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        deepEqual(scheduler.date(), new Date(2013, 6, 7));
    });

    test("scheduler offsets selection on view change", function() {
        var date = new Date(2013, 6, 10);

        scheduler.date(date);

        var td = container.find(".k-scheduler-content td").eq(0);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        scheduler.view("day");

        ok(container.find(".k-scheduler-content td").eq(0).hasClass("k-state-selected"));
        deepEqual(scheduler.date(), new Date(2013, 6, 7));
    });

    test("scheduler offsets selection on view change", function() {
        var date = new Date(2013, 6, 10);

        scheduler.date(date);

        var td = container.find(".k-scheduler-content td").eq(0);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        scheduler.view("day");

        ok(container.find(".k-scheduler-content td").eq(0).hasClass("k-state-selected"));
        deepEqual(scheduler.date(), new Date(2013, 6, 7));
    });

    /*
     * Marked as unstable. Needs to be reviewed additionally
     *
    asyncTest("scheduler selects multiple cells a column on move", function() {
        var rows = container.find(".k-scheduler-content tr");
        var startCell = rows.find("td:first");
        var endCell = rows.eq(4).find("td:first");

        press(startCell);
        move(endCell);

        setTimeout(function() {
            start();
            equal(container.find(".k-scheduler-content .k-state-selected").length, 5);
        }, 200);
    });

    asyncTest("scheduler selects multiple cells in several columns on move", function() {
        var rows = container.find(".k-scheduler-content tr");
        var startCell = rows.find("td:first");
        var endCell = rows.eq(4).find("td").eq(2);

        press(startCell);
        move(endCell);

        setTimeout(function() {
            start();
            equal(container.find(".k-scheduler-content .k-state-selected").length, 101);
        }, 200);
    });

    asyncTest("scheduler selects multiple cells in backward move", function() {
        var rows = container.find(".k-scheduler-content tr");
        var startCell = rows.eq(4).find("td:first");
        var endCell = rows.find("td:first");

        press(startCell);
        move(endCell);

        setTimeout(function() {
            start();
            equal(container.find(".k-scheduler-content .k-state-selected").length, 5);
        }, 200);
    });
    */

    test("scheduler calls view.move method with specific direction", function() {
        var view = scheduler.view();

        stub(view, {
            move: view.move
        });

        keydown(keys.DOWN);

        equal(view.calls("move"), 1);
        equal(view.args("move")[1], keys.DOWN);
    });

    test("scheduler calls view.move method with information for key modifiers", function() {
        var view = scheduler.view();

        stub(view, {
            move: view.move
        });

        keydown(keys.DOWN, { shiftKey: true });

        equal(view.calls("move"), 1);
        equal(view.args("move")[1], keys.DOWN);
        equal(view.args("move")[2], true);
    });

    test("scheduler calls preventDefault if view.move supports pressed key", 1, function() {
        var view = scheduler.view();

        keydown(keys.DOWN, {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("scheduler sets selectedDate when selection.start is less than view.startDate()", 1, function() {
        var view = scheduler.view(),
            start = kendo.date.addDays(view.startDate(), -1);

        scheduler._selection.start = start;
        scheduler._selection.end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 30);;

        keydown(keys.DOWN);

        deepEqual(kendo.date.getDate(scheduler.date()), kendo.date.getDate(scheduler._selection.start));
    });

    tzTest("Sofia", "scheduler sets selectedDate when selection.start is bigger than view.endDate()", 1, function() {
        var view = scheduler.view(),
            start = kendo.date.addDays(view.endDate(), 1);

        scheduler._selection.start = start;
        scheduler._selection.end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 0, 30);

        keydown(keys.DOWN);

        deepEqual(kendo.date.getDate(scheduler.date()), kendo.date.getDate(scheduler._selection.start));
    });

    test("scheduler selects on move", 1, function() {
        var view = scheduler.view();
        stub(view, {
            select: view.select
        });

        keydown(keys.DOWN);

        ok(view.calls("select"));
    });

    test("scheduler calls moveToEvent on TAB", 2, function() {
        var view = scheduler.view();
        stub(view, {
            moveToEvent: view.moveToEvent
        });

        keydown(keys.TAB);

        ok(view.calls("moveToEvent"));
        equal(view.args("moveToEvent").length, 2);
    });

    test("scheduler calls preventDefault on TAB", 1, function() {
        createSampleEvent();
        scheduler.wrapper.focus();
        keydown(keys.TAB, {
            preventDefault: function() {
                ok(true);
            }
        });
    });

    test("scheduler calls moveToEvent on TAB + Shift", 2, function() {
        var view = scheduler.view();
        stub(view, {
            moveToEvent: view.moveToEvent
        });

        keydown(keys.TAB, { shiftKey: true });

        ok(view.calls("moveToEvent"));
        equal(view.args("moveToEvent")[1], true);
    });

    test("scheduler selects on moveToEvent", 1, function() {
        createSampleEvent();
        scheduler.wrapper.focus();
        var view = scheduler.view();
        stub(view, {
            select: view.select
        });

        keydown(keys.TAB);

        ok(view.calls("select"));
    });

    test("scheduler doesn't call move on TAB", 2, function() {
        var view = scheduler.view();
        stub(view, {
            moveToEvent: view.moveToEvent,
            move: view.move
        });

        keydown(keys.TAB);

        ok(view.calls("moveToEvent"));
        ok(!view.calls("move"));
    });

    test("scheduler adjusts selected date on keydown", 1, function() {
        var date = new Date(2012, 10, 10);

        scheduler._selection.start = date;
        scheduler._selection.end = date;

        keydown();

        deepEqual(scheduler.date(), date);
    });

    function createSampleEvent() {
        return scheduler.dataSource.add({
            title: "Foo",
            start: new Date(now.setHours(10)),
            end: new Date(now.setHours(11))
        });
    }

    function selectEvent(evt) {
        scheduler._selection.events = [evt];
    }

    test("enter key opens selected event for editing", function() {
        var e = createSampleEvent();

        stub(scheduler, "editEvent");

        selectEvent(e);

        keydown(keys.ENTER);

        equal(scheduler.calls("editEvent"), 1);
        equal(scheduler.args("editEvent")[0], e);
    });

    test("enter key adds a new event in empty selection", function() {
        var start = new Date(now.setHours(10));
        var end = new Date(now.setHours(11));

        stub(scheduler, "addEvent");

        $.extend(scheduler._selection, { start: start, end: end });

        keydown(keys.ENTER);

        var eventInfo = scheduler.args("addEvent")[0];
        equal(scheduler.calls("addEvent"), 1);
        equal(eventInfo.start, start);
        equal(eventInfo.end, end);
    });

    test("enter key adds an all-day event in all-day selection", function() {
        stub(scheduler, "addEvent");

        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var end = kendo.date.addDays(start, 1);

        $.extend(scheduler._selection, { isAllDay: true, start: start, end: end });

        keydown(keys.ENTER);

        var eventInfo = scheduler.args("addEvent")[0];
        equal(scheduler.calls("addEvent"), 1);
        ok(eventInfo.isAllDay);

        deepEqual(eventInfo.start, start);
        deepEqual(eventInfo.end, start);
    });

    test("enter key does not add event in view with editable=false", function() {
        var start = new Date(now.setHours(10));
        var end = new Date(now.setHours(11));

        stub(scheduler, "addEvent");

        scheduler.view().options.editable = false;

        $.extend(scheduler._selection, { start: start, end: end });

        keydown(keys.ENTER);

        equal(scheduler.calls("addEvent"), 0);
    });

    test("enter key does not add event in view with editable.create=false", function() {
        var start = new Date(now.setHours(10));
        var end = new Date(now.setHours(11));

        stub(scheduler, "addEvent");

        scheduler.view().options.editable = { create: false };

        $.extend(scheduler._selection, { start: start, end: end });

        keydown(keys.ENTER);

        equal(scheduler.calls("addEvent"), 0);
    });

    test("enter key does not edit event in view with editable=false", function() {
        var e = createSampleEvent();

        stub(scheduler, "editEvent");

        scheduler.view().options.editable = false;

        selectEvent(e);

        keydown(keys.ENTER);

        equal(scheduler.calls("editEvent"), 0);
    });

    test("enter key does not edit event in view with editable.update=false", function() {
        var e = createSampleEvent();

        stub(scheduler, "editEvent");

        scheduler.view().options.editable = { update: false };

        selectEvent(e);

        keydown(keys.ENTER);

        equal(scheduler.calls("editEvent"), 0);
    });

    test("1 switches to day view", function() {
        keydown("1");

        equal(scheduler.view().title, "Day");
    });

    test("2 switches to week view", function() {
        scheduler.view("day");

        keydown("2");

        equal(scheduler.view().title, "Week");
    });

    test("delete key triggers delete of event", function() {
        var e = createSampleEvent();

        stub(scheduler, "removeEvent");

        selectEvent(e);

        keydown(keys.DELETE);

        equal(scheduler.calls("removeEvent"), 1);
    });

    test("delete key does not delete event if editable:false", function() {
        var e = createSampleEvent();
        var view = scheduler.view();

        view.options.editable = false;

        stub(scheduler, "removeEvent");

        selectEvent(e);

        keydown(keys.DELETE);

        equal(scheduler.calls("removeEvent"), 0);
    });

    test("delete key does not delete event if destroy is disabled", function() {
        var e = createSampleEvent();
        var view = scheduler.view();

        view.options.editable = { destroy: false };

        stub(scheduler, "removeEvent");

        selectEvent(e);

        keydown(keys.DELETE);

        equal(scheduler.calls("removeEvent"), 0);
    });

    module("Selection events", {
        setup: function() {
            container = $("<div />");
            QUnit.fixture.append(container);
        },

        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setupWidget(options) {
        today = kendo.date.today();
        options = options || {};

        var end = new Date(today);
        end.setHours(1);

        options = $.extend({
            selectable: true,
            views: [
                "day",
                { type: "week", selected: true }
            ],
            dataSource: [
                { start: today, end: end, title: "Test" }
            ]
        }, options);

        scheduler = new Scheduler(container, options);

        container.focus();
    }

    test("Scheduler raises change event on slot selection", 4, function() {
        setupWidget();

        scheduler.bind("change", function(e) {
            var selection = e;
            var td = container.find(".k-scheduler-header td").eq(5);
            var slot = scheduler.view().selectionByElement(td);

            deepEqual(selection.start, slot.startDate());
            deepEqual(selection.end, slot.endDate());

            equal(selection.slots.length, 1);
            equal(selection.slots[0].element, td[0]);
        });

        var td = container.find(".k-scheduler-header td").eq(5);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });
    });

    test("Scheduler raises change event on shift + keydown navigation", 1, function() {
        setupWidget();

        scheduler.bind("change", function(e) {
            equal(e.slots.length, 2);
        });

        scheduler.wrapper.trigger({
            type: "keydown",
            keyCode: kendo.keys.DOWN,
            shiftKey: true
        });
    });

    test("Scheduler raises change event on event click", 2, function() {
        setupWidget();

        scheduler.bind("change", function(e) {
            var selection = e;
            var dataItem = scheduler.dataSource.view()[0];

            equal(selection.events.length, 1);
            equal(selection.events[0], dataItem);
        });

        var event = scheduler.wrapper.find(".k-event");

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });
    });

    test("select event, slots argument is empty", 1, function() {
        setupWidget();

        var td = container.find(".k-scheduler-header td").eq(1);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        scheduler.bind("change", function(e) {
            var selection = e;

            equal(selection.slots.length, 0);
        });

        var event = scheduler.wrapper.find(".k-event");

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });
    });

    test("Scheduler raises change event with resources", function() {
        var today = kendo.date.today();
        var end = new Date(today);
        end.setHours(1);

        setupWidget({
            dataSource: [
                { roomId2: 4, roomId: 2, start: today, end: end, title: "Test" }
            ],
            group: {
                resources: ["Rooms", "Rooms2"]
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    valuePrimitive: true,
                    title: "Room"
                }, {
                    field: "roomId2",
                    name: "Rooms2",
                    dataSource: [
                        { text: "101", value: 3, color: "#6eb3fa" },
                        { text: "201", value: 4, color: "#f58a8a" }
                    ],
                    valuePrimitive: true,
                    title: "Room2"
                }
            ]
        });

        scheduler.bind("change", function(e) {
            var selection = e;
            var dataItem = scheduler.dataSource.view()[0];
            var resources = selection.resources;

            equal(selection.events.length, 1);
            equal(selection.events[0], dataItem);
            equal(resources.roomId, 2);
            equal(resources.roomId2, 4);
        });

        var event = scheduler.wrapper.find(".k-event");

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });
    });

    test("events from previous group are removed", 2, function() {
        var today = kendo.date.today();
        var end = new Date(today);
        end.setHours(1);

        setupWidget({
            dataSource: [
        { roomId: 1, roomId: 1, start: today, end: end, title: "Test Room 101" },
            { roomId: 2, roomId: 2, start: today, end: end, title: "Test Room 201" }
        ],
            group: {
                resources: ["Rooms"]
            },
            resources: [
        {
            field: "roomId",
            name: "Rooms",
            dataSource: [
        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
            { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
        ],
            valuePrimitive: true,
            title: "Room"
        }
        ]
        });


        var event = scheduler.wrapper.find(".k-event").eq(0);

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });

        scheduler.bind("change", function(selection) {
            var dataItem = scheduler.dataSource.view()[0];

            equal(selection.events.length, 1);
            equal(selection.events[0].uid, scheduler.wrapper.find(".k-event").eq(1).data("uid"));
        });

        scheduler.wrapper.trigger({
            ctrlKey: true,
            type: "keydown"
        });

        event = scheduler.wrapper.find(".k-event").eq(1);

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });
    });

    test("Scheduler pre-sets resources on view selection", function() {
        var today = kendo.date.today();
        var end = new Date(today);
        end.setHours(1);

        setupWidget({
            dataSource: [
                { roomId2: 4, roomId: 2, start: today, end: end, title: "Test" }
            ],
            group: {
                resources: ["Rooms", "Rooms2"]
            },
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    valuePrimitive: true,
                    title: "Room"
                }, {
                    field: "roomId2",
                    name: "Rooms2",
                    dataSource: [
                        { text: "101", value: 3, color: "#6eb3fa" },
                        { text: "201", value: 4, color: "#f58a8a" }
                    ],
                    valuePrimitive: true,
                    title: "Room2"
                }
            ]
        });

        var wrapper = scheduler.wrapper;
        var cell = wrapper.find(".k-scheduler-content").find("tr:first").children().eq(20);

        scheduler._createSelection(cell);

        stub(scheduler, "addEvent");

        wrapper.trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        var args = scheduler.args("addEvent")[0];

        equal(args.roomId, 2);
        equal(args.roomId2, 3);
    });

    test("Scheduler raises change event on task click", 2, function() {
        setupWidget({
            views: ["agenda"]
        });

        scheduler.bind("change", function(e) {
            var selection = e;
            var dataItem = scheduler.dataSource.view()[0];

            equal(selection.events.length, 1);
            equal(selection.events[0], dataItem);
        });

        var event = scheduler.wrapper.find(".k-task");

        event.trigger({
            type: "mousedown",
            currentTarget: event
        });
    });

    test("Scheduler does not raise change event twice", 1, function() {
        setupWidget({
            views: ["agenda"]
        });

        scheduler.bind("change", function(e) {
            ok(true);
        });

        scheduler._createSelection(scheduler.wrapper.find(".k-task").parent());
        scheduler._select();

        keydown(kendo.keys.UP);
    });

    test("navigate to view with less groups", function() {
        setupWidget({
            date: new Date("2014/02/23"),
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }
            ],
            views: [
                "day",
                {
                    type: "week",
                    selected: true,
                    group: {
                        resources: ["Rooms"]
                    }
                }
            ]
        });

        var td = $(scheduler.view().groups[1].getTimeSlotCollection(0).first().element);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        scheduler.view("day");

        equal(scheduler._selection.groupIndex, 0);
    });

    test("navigate to view with less groups and change of selected date", function() {
        setupWidget({
            date: new Date("2014/02/24"),
            resources: [
                {
                    field: "roomId",
                    name: "Rooms",
                    dataSource: [
                        { text: "Meeting Room 101", value: 1, color: "#6eb3fa" },
                        { text: "Meeting Room 201", value: 2, color: "#f58a8a" }
                    ],
                    title: "Room"
                }
            ],
            views: [
                "day",
                {
                    type: "week",
                    selected: true,
                    group: {
                        resources: ["Rooms"]
                    }
                }
            ]
        });

        var td = $(scheduler.view().groups[1].getTimeSlotCollection(0).first().element);

        td.trigger({
            type: "mousedown",
            currentTarget: td
        });

        scheduler.view("day");

        equal(scheduler._selection.groupIndex, 0);
    });
})();
