(function() {
    var MultiDayView = kendo.ui.MultiDayView;
    var SchedulerEvent = kendo.data.SchedulerEvent;

    var MyView = MultiDayView.extend({
        init: function(element, options) {
            var that = this;

            MultiDayView.fn.init.call(that, element, options);
        },
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

    test("event which occurs in the missing day is not rendered", function() {
        var view = new MyView(element, {
            startTime: new Date("2013/6/6 10:00"),
            dates: [
                new Date("2013/6/6"),
                new Date("2013/6/8"),
                new Date("2013/6/9")
            ]
        });

        var events = [
            new SchedulerEvent({
                uid:"uid",
                start: new Date("2013/6/7 10:00"),
                end: new Date("2013/6/7 11:00"),
                title: ""
            })
        ];

        view.render(events);

        equal(view.content.find("div.k-event").length, 0);
    });

})();
