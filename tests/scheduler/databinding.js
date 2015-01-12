(function() {
    var Scheduler = kendo.ui.Scheduler,
        container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("DataBinding", {
        setup: function() {
            container = $("<div>");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    test("creates a SchedulerDataSource", function() {
        var scheduler = new Scheduler(container);

        ok(scheduler.dataSource instanceof kendo.data.SchedulerDataSource);
    });

    test("view is bound to the event data", 1, function() {
        var scheduler = new Scheduler(container, {
            views: [ {
                    type: kendo.ui.MultiDayView.extend({
                        render: function(events) {
                            equal(events.length, 2);
                        }
                    }),
                    title: "testView"
                    }
                ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });
    });

    test("dataItems method return valid events", function() {
        container.appendTo($("body"));

        var scheduler = new Scheduler(container, {
            views: [ {
                type: kendo.ui.MonthView,
                title: "testView"
                }
            ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            {title: "foo1", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo2", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo3", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo4", start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            {title: "foo4", start: new Date(2013, 1, 4, 0, 0, 0), end: new Date(2013, 1, 4, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });

        equal(scheduler.wrapper.find(".k-event")[0].getAttribute("data-uid"), scheduler.dataItems()[0].uid);
        equal(scheduler.wrapper.find(".k-event")[1].getAttribute("data-uid"), scheduler.dataItems()[1].uid);
        equal(scheduler.dataItems().length, scheduler.wrapper.find(".k-event").length);
        container.detach();
    });

    test("data is filtered before is passed to the view", 1, function() {
        var scheduler = new Scheduler(container, {
            views: [ {
                    type: kendo.ui.MultiDayView.extend({
                        render: function(events) {
                            equal(events.length, 1);
                        }
                    }),
                    title: "testView"
                }
                ],
            date: new Date(2013, 1, 3, 0, 0, 0),
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: function(options) {
                        options.success([
                            { start: new Date(2013, 1, 3, 0, 0, 0), end: new Date(2013, 1, 3, 0, 0, 0) },
                            { start: new Date(2013, 1, 5, 0, 0, 0), end: new Date(2013, 1, 6, 0, 0, 0) }
                        ]);
                    }
                }
            }
        });
    });

    test("expand recurring events before calling render method", function() {
        var today = new Date(2013, 10, 10),
            year = today.getFullYear(),
            month = today.getMonth(),
            day = today.getDate(),
            view, events;

        var scheduler = new Scheduler(container, {
            views: [ "week" ],
            date: today,
            dataSource: [
                {
                    start: new Date(year, month, day, 10),
                    end: new Date(year, month, day, 11),
                    title: "Today - recurring event",
                    recurrenceRule: "FREQ=DAILY"
                },{
                    start: new Date(year, month, day, 16),
                    end: new Date(year, month, day, 17),
                    title: "Today - single event"
                }
            ]
        });

        view = scheduler.view();
        stub(view, {
            render: view.render
        });

        scheduler.refresh();
        events = view.args("render", 0)[0];

        equal(events.length, 8);
    });

    test("resetting DataSource rebinds the widget", 2, function() {
        var scheduler = new Scheduler(container, {
            dataBinding: function() {
                ok(true);
            }
        });

        scheduler.setDataSource(new kendo.data.SchedulerDataSource({
            data:[{ title: "", start: new Date(), end: new Date()}]
        }));
    });

    test("dataBinding event can be prevented", 0, function() {
        var scheduler = new Scheduler(container, {
            dataBinding: function(e) {
                e.preventDefault();
            },
            dataBound: function() {
                ok(false);
            }
        });
    });

    test("AutoBind=false prevents scheduler from binding", 0, function() {
        var scheduler = new Scheduler(container, {
            autoBind: false,
            dataBinding: function() {
                ok(false);
            }
        });
    });

    test("persist expanded events as a private field", function() {
        var today = new Date(2013, 10, 10),
            year = today.getFullYear(),
            month = today.getMonth(),
            day = today.getDate(),
            view, events;

        var scheduler = new Scheduler(container, {
            views: [ "week" ],
            date: today,
            dataSource: [
                {
                    start: new Date(year, month, day, 10),
                    end: new Date(year, month, day, 11),
                    title: "Today - recurring event",
                    recurrenceRule: "FREQ=DAILY"
                },{
                    start: new Date(year, month, day, 16),
                    end: new Date(year, month, day, 17),
                    title: "Today - single event"
                }
            ]
        });

        scheduler.refresh();

        equal(scheduler._data.length, 8);
    });
})();
