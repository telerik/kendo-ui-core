(function() {
    var MultiDayView = kendo.ui.MultiDayView;
    var SchedulerEvent = kendo.data.SchedulerEvent;

    var MyView = MultiDayView.extend({
        calculateDateRange: function() {
            this._render(this.options.dates || [new Date()]);
        }
    });

    var element;

    module("multi day view gaps", {
        setup: function() {
            element = $("<div>");

            QUnit.fixture.append(element);
        },
        teardown: function() {
            element.data("kendoMultiDayView").destroy();
        }
    });

    function setup(options, event) {
        var view = new MyView(element, options);
        view.render([
           new SchedulerEvent(event)
        ]);

        return view;
    }

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 3);
    }

    test("event which starts in a missing day and ends in existing day", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7 22:00"),
            end: new Date("2013/6/8 11:30"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerHeight(), view.content.find("td").outerHeight() * 3, 2);

        equalWithRound(view.element.find(".k-event").offset().top, view.content.find("td").offset().top, 2);
    });

    test("event which starts in existing day and ends in a missing day", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            endTime: new Date("2013/6/6 14:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/6 11:30"),
            end: new Date("2013/6/7 11:00"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerHeight(), view.content.find("td").outerHeight() * 5);

        equalWithRound(view.element.find(".k-event").offset().top, view.content.find("td:nth-child(1)").eq(3).offset().top, 2);
    });

    test("event which occurs in the missing day is not rendered when the missing day is between", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7 10:00"),
            end: new Date("2013/6/7 11:00"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 0);
    });

    test("event which occurs in the missing day is not rendered when the missing day is before", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/7")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/5 10:00"),
            end: new Date("2013/6/5 11:00"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 0);
    });

    test("event which occurs in the missing day is not rendered when the missing day is after", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/7")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/5 10:00"),
            end: new Date("2013/6/5 11:00"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 0);
    });

    test("all day event which passes through a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/6"),
            end: new Date("2013/6/9"),
            isAllDay: true,
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);
        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 3);
    });

    test("multi day event which passes through a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/6"),
            end: new Date("2013/6/10"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);
        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 3);
    });

    test("all day event which starts in a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9"),
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7"),
            end: new Date("2013/6/9"),
            isAllDay: true,
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 2);
        equalWithRound(view.element.find(".k-event").offset().left, view.element.find(".k-scheduler-header th:nth-child(2)").offset().left);
    });

    test("multi day event which starts in a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7"),
            end: new Date("2013/6/10"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 2);
        equalWithRound(view.element.find(".k-event").offset().left, view.element.find(".k-scheduler-header th:nth-child(2)").offset().left);
    });

    test("all day event which ends in a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/6"),
            end: new Date("2013/6/8"),
            isAllDay: true,
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 2);
    });

    test("multi day event which ends in a day which does not exist", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/7")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/6"),
            end: new Date("2013/6/8"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 1);

        equalWithRound(view.element.find(".k-event").outerWidth(), view.element.find(".k-scheduler-header th").outerWidth() * 2);
    });

    test("all day event which occurs in the missing day is not rendered", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7"),
            end: new Date("2013/6/7"),
            title: "",
            isAllDay: true
        });

        equal(view.element.find(".k-event").length, 0);
    });

    test("multi day event which occurs in the missing day is not rendered", function() {
        var view = setup({
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8")
            ]
        }, {
            uid: "uid",
            start: new Date("2013/6/7"),
            end: new Date("2013/6/8"),
            title: ""
        });

        equal(view.element.find(".k-event").length, 0);
    });

})();
