(function() {
    var TimelineView = kendo.ui.TimelineView;
    var TimelineWeekView = kendo.ui.TimelineWeekView;
    var SchedulerEvent = kendo.data.SchedulerEvent;
    var Scheduler = kendo.ui.Scheduler;
    var container;
    var scheduler;

    function setup(options) {
        return new TimelineView(container, $.extend(options));
    }

    function setupWeek(options) {
        return new TimelineWeekView(container, $.extend(options));
    }

    function setupScheduler(options) {
        options = options || {};

        options = $.extend({
            views: [
                "timeline"
            ],
            dataSource: []
        }, options);

        scheduler = new Scheduler(container, options);
    }

    module("Timeline View rendering", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("title is read from the options", function () {
        var view = setup({ title: "the title", date: new Date("2013/6/6") });
        equal(view.title, "the title");
    });

    tzTest("Sofia", "Current time marker is rendered correctly", function() {
        var view = setup({ date: new Date() });

        var timeElementsCount = view.element.find(".k-current-time").length;
        equal(timeElementsCount,1);
    });

    test("Current time marker is rendered correctly", function() {
        var view = setup({ date: new Date() });

        var timeElementsCount = view.element.find(".k-current-time").length;
        equal(timeElementsCount,1);
    });

    test("Current time marker is not rendered when the option is set to false", function() {
        var view = setup({ date: new Date(), currentTimeMarker: false });

        var timeElementsCount = view.element.find(".k-current-time").length;
        equal(timeElementsCount,0);
    });

    test("Current time marker is not rendered when the currentTimeMarker option is not object", function() {
        var view = setup({ date: new Date(), currentTimeMarker: true });

        var timeElementsCount = view.element.find(".k-current-time").length;
        equal(timeElementsCount,0);
    });

    test("Current time marker is rendered when vertical grouping is applied", function() {
        setupScheduler({
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

        var timeElementsCount = scheduler.view().element.find(".k-current-time").length;
        equal(timeElementsCount,1);
    });

    module("Timeline View rendering without slot holes", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with no slot holes:
    test("two day all day event is rendered correctly", function() {
        var view = setupWeek({ date: new Date(2013, 1, 3) });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 11);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts in previous date", function() {
        var view = setup({ date: new Date(2013, 1, 3) });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 23);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when ends in next date", function() {
        var view = setup({ date: new Date(2013, 1, 2) });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 23);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts before start date and ends after end date", function() {
        var view = setup({ date: new Date(2013, 1, 2) });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 5, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 23);

        ok(view.element.find(".k-event").length);
    });

    test("all day event is not rendered when ends in start date", function() {
        var view = setupWeek({ date: new Date(2013, 1, 3)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is not rendered when starts in end date", function() {
        var view = setup({ date: new Date(2013, 1, 2)  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("all day event is rendered correctly", function() {
        var view = setupWeek({ date: new Date(2013, 1, 3)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 4, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 6);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 11);

        ok(view.element.find(".k-event").length);
    });

    test("same day event which starts and end at the startTime is rendered as one cell duration", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3)
            //startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            //endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
        });

        view.render([new SchedulerEvent({
            uid: "foo", title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);

        ok(view.content.find(".k-event").length);
    });

    //normal events with no slot holes:
    test("event is rendered correctly", function() {
        var view = setup({ date: new Date(2013, 1, 2) });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 2, 0, 0),
            end: new Date(2013, 1, 2, 4, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 2);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 3);

        ok(view.element.find(".k-event").length);
    });

    test("event between two dates is rendered correctly", function() {
        var view = setupWeek({ date: new Date(2013, 1, 3)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 18, 0, 0),
            end: new Date(2013, 1, 4, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 4);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 8);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts on previous date", function() {
        var view = setup({ date: new Date(2013, 1, 2)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 18, 0, 0),
            end: new Date(2013, 1, 2, 6, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 5);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when ends on next date", function() {
        var view = setup({ date: new Date(2013, 1, 2)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 18, 0, 0),
            end: new Date(2013, 1, 3, 6, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 18);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 23);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts before start date and ends after end date", function() {
        var view = setup({ date: new Date(2013, 1, 2)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 18, 0, 0),
            end: new Date(2013, 1, 3, 6, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 23);

        ok(view.element.find(".k-event").length);
    });

    test("event is not rendered when ends in start date", function() {
        var view = setup({ date: new Date(2013, 1, 2)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 16, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("event is not rendered when starts in end date", function() {
        var view = setup({ date: new Date(2013, 1, 2)});

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 5, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    module("Timeline View rendering with slot holes", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with slot holes:
    test("two day all day event is rendered correctly", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 3);

        ok(view.element.find(".k-event").length);
    });

    test("all day event and regular event starting in same slot are rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "1"
        }), new SchedulerEvent({
            uid: "bar",
            title: "",
            start: new Date(2013, 1, 2, 10, 0, 0),
            end: new Date(2013, 1, 2, 12, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        equal(view.groups[0].getTimeSlotCollection(0).events()[1].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[1].end, 1);

        equal(view.element.find(".k-event").length, 2);
    });

    test("all day event is rendered correctly when times are different than zero", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 19, 0, 0),
            end: new Date(2013, 1, 3, 19, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 1);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts in previous day", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when ends in next day", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts before start date and ends after end date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 0, 0, 0),
            end: new Date(2013, 1, 5, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        ok(view.element.find(".k-event").length);
    });

    test("all day event is not rendered when ends in start date", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("all day event is rendered correctly", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 4, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 2);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 3);

        ok(view.element.find(".k-event").length);
    });

    //normal events with slot holes:
    test("event is rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 11, 0, 0),
            end: new Date(2013, 1, 2, 12, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 1);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 1);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts at day start and end at day end", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 4, 0, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 1);

        ok(view.element.find(".k-event").length);
    });

    test("event between two dates is rendered correctly", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 17, 0, 0),
            end: new Date(2013, 1, 4, 11, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 1);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 2);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts on previous date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 19, 0, 0),
            end: new Date(2013, 1, 2, 14, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 3);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when ends on next date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 17, 0, 0),
            end: new Date(2013, 1, 3, 6, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 7);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts before start date and ends after end date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 23, 0, 0),
            end: new Date(2013, 1, 2, 21, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 7);

        ok(view.element.find(".k-event").length);
    });

    test("event is not rendered when ends in start date and time", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 1, 0, 0),
            end: new Date(2013, 1, 2, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("event is not rendered when starts in end date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 18, 0, 0),
            end: new Date(2013, 1, 2, 22, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("event between two dates is not rendered when starts at end date and ends at start date", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 18, 0, 0),
            end: new Date(2013, 1, 4, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("event between two dates is not rendered when starts at end date and ends in next date", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 18, 0, 0),
            end: new Date(2013, 1, 3, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    //normal events with slot holes (border cases):
    test("event is rendered correctly when starts after end time and ends in available slots in next day", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 22, 0, 0),
            end: new Date(2013, 1, 4, 11, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 2);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 2);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts after end time and ends after end time on next day", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 22, 0, 0),
            end: new Date(2013, 1, 4, 20, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 2);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 3);

        ok(view.element.find(".k-event").length);
    });

    test("event is not rendered when starts after end time and ends at start time next day", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 23, 0, 0),
            end: new Date(2013, 1, 3, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("event is not rendered when starts at end time and ends start time next day", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 22, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 22, 0, 0),
            end: new Date(2013, 1, 4, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("cross-midnight event is not rendered if ends at the begining of the View", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0)
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 12, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.content.find("div.k-event").length, 0);
    });

    test("all day recurring event is rendered correctly", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        var start = new Date(2013, 1, 3, 0, 0, 0);
        var end = new Date(2013, 1, 3, 0, 0, 0)
        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: start,
            startTime: kendo.date.toUtcTime(start),
            end: end,
            endTime: kendo.date.toUtcTime(end),
            recurrenceRule: "FREQ=DAILY",
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 1);

        equal(view.element.find(".k-event").length, 1);
    });

    test("recurring event is rendered correctly", function() {
        var view = setupWeek({
            date: new Date(2013, 1, 3),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0)
        });

        var start =  new Date(2013, 1, 3, 10, 0, 0);
        var end = new Date(2013, 1, 3, 12, 0, 0);

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: start,
            startTime: kendo.date.toUtcTime(start),
            end: end,
            endTime: kendo.date.toUtcTime(end),
            recurrenceRule: "FREQ=DAILY",
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 0);

        equal(view.element.find(".k-event").length, 1);
    });

    module("Timeline View rendering icons", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
            QUnit.fixture.append(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });
})();
