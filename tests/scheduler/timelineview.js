(function() {
    var TimelineView = kendo.ui.TimelineView,
        SchedulerEvent = kendo.data.SchedulerEvent,
        container;

    function setup(options) {
        return new TimelineView(container, $.extend({ majorTick: 60 }, options));
    }

    module("Timeline View rendering", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
        },
        teardown: function() {
            if (container.data("kendoTimelineView")) {
                container.data("kendoTimelineView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("title is read from the options", function () {
        var view = setup({ title: "the title", date: new Date("2013/6/6") });
        equal(view.title, "the title");
    });

    module("Timeline View rendering without slot holes", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
        },
        teardown: function() {
            if (container.data("kendoTimelineView")) {
                container.data("kendoTimelineView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with no slot holes:
    test("two day all day event is rendered correctly", function() {
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 2  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 0);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 47);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts in previous date", function() {
        var view = setup({ date: new Date(2013, 1, 3), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 3), numberOfDays: 2  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 2  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 24);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 47);

        ok(view.element.find(".k-event").length);
    });

    //normal events with no slot holes:
    test("event is rendered correctly", function() {
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 2  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 18, 0, 0),
            end: new Date(2013, 1, 3, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 18);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 33);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts on previous date", function() {
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

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
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 1, 16, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("event is not rendered when starts in end date", function() {
        var view = setup({ date: new Date(2013, 1, 2), numberOfDays: 1  });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 5, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    module("Timeline View rendering with slot holes", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
        },
        teardown: function() {
            if (container.data("kendoTimelineView")) {
                container.data("kendoTimelineView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });
    //allDay events with slot holes:
    test("two day all day event is rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 2
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
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 15);

        ok(view.element.find(".k-event").length);
    });

    test("two day all day event is rendered correctly when starts in previous day", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 2
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 0, 0, 0),
            end: new Date(2013, 1, 2, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        ok(view.element.find(".k-event").length === 0);
    });

    test("all day event is rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 2
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 3, 0, 0, 0),
            end: new Date(2013, 1, 3, 0, 0, 0),
            isAllDay: true,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 8);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 15);

        ok(view.element.find(".k-event").length);
    });

    //normal events with slot holes:
    test("event is rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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

    test("event between two dates is rendered correctly", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 2
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 17, 0, 0),
            end: new Date(2013, 1, 3, 11, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        equal(view.groups[0].getTimeSlotCollection(0).events()[0].start, 7);
        equal(view.groups[0].getTimeSlotCollection(0).events()[0].end, 8);

        ok(view.element.find(".k-event").length);
    });

    test("event is rendered correctly when starts on previous date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
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
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 1, 0, 0),
            end: new Date(2013, 1, 2, 10, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("event is not rendered when starts in end date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 1
        });

        view.render([new SchedulerEvent({
            uid: "foo",
            title: "",
            start: new Date(2013, 1, 2, 18, 0, 0),
            end: new Date(2013, 1, 2, 22, 0, 0),
            isAllDay: false,
            id: "2"
        })]);

        ok(!view.element.find(".k-event").length);
    });

    test("event between two dates is not rendered when starts at end date and ends at start date", function() {
        var view = setup({
            date: new Date(2013, 1, 2),
            startTime: new Date(2013, 1, 2, 10, 0, 0, 0),
            endTime: new Date(2013, 1, 2, 18, 0, 0, 0),
            numberOfDays: 2
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
})();
