(function() {
   var Scheduler = kendo.ui.Scheduler,
        container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("editing destroy", {
        setup: function() {
            container = $("<div>");
        },
        teardown: function() {
            kendo.destroy(container);
        }
    });

    function setup(options) {
        return new Scheduler(container,
            $.extend({
                editable: {
                    confirmation: false
                },
                dataSource: {
                    data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
                }
            }, options)
        );
    }

    test("removing model triggers updates the view", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            render = stub(scheduler.view(), "render");

        dataSource.remove(dataSource.at(0));

        equal(render.calls("render"), 1);
    });

    test("clicking the destroy button calls datasource remove", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove"),
            uid = dataSource.at(0).uid;

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();

        equal(remove.calls("remove"), 1);
        equal(remove.args("remove")[0].uid, uid);
    });


    test("confirmation message is shown when editor template is set", function() {
        var scheduler = setup({
                editable: {
                    template: " "
                }
            }),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove");

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();

        equal(remove.calls("remove"), 0);
    });

    test("clicking the destroy button does not call datasource remove if editable is false", function() {
        var scheduler = setup({ editable: false }),
            dataSource = scheduler.dataSource,
            remove = stub(dataSource, "remove");

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();

        equal(remove.calls("remove"), 0);
    });

    test("clicking the destroy button calls datasource sync", function() {
        var scheduler = setup(),
        dataSource = scheduler.dataSource,
        sync = stub(dataSource, "sync");

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();

        equal(sync.calls("sync"), 1);
    });

    test("removeRow calls _confirmation if delete confirm is true", function() {
        var scheduler = setup(),
            method = stub(scheduler, "_confirmation");

        scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));

        ok(method.calls("_confirmation"));
    });

    test("removeRow does not call datasource remove if element does not exist", function() {
        var scheduler = setup(),
            remove = stub(scheduler.dataSource, "remove");

        scheduler.removeEvent("<div/>");

        equal(remove.calls("remove"), 0);
    });

    test("removeRow raises remove event", 1, function() {
        var scheduler = setup({
                remove: function() {
                    ok(true);
                }
            });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));
    });

    test("removeRow raises remove event passing the event object and the element", 1, function() {
        var scheduler = setup({
                remove: function(e) {
                    ok(e.event instanceof kendo.data.ObservableObject);
                }
            });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));
    });

    test("the destroy confirmation uses the text set through the options", function() {
        var scheduler = setup({ editable: { confirmation: "foo" } }),
            text;

        scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));

        equal($(".k-popup-message").text(), "foo");
    });

    test("the destroy confirmation uses default text if not set", 1, function() {
        var scheduler = setup({ editable: true });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event").data("uid"));

        equal($(".k-popup-message").text(), "Are you sure you want to delete this event?");
    });

    test("switching views does not trigger multiple remove events", 1, function() {
        var scheduler = setup({ }),
            removeEvent = stub(scheduler, "removeEvent");

        scheduler.view("week");
        scheduler.view("day");

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();

        equal(removeEvent.calls("removeEvent"), 1);
    });

    test("multiple calls to same views does not trigger multiple remove events", 1, function() {
        var scheduler = setup({ }),
            removeEvent = stub(scheduler, "removeEvent");

        scheduler.view("day");
        scheduler.view("day");

        scheduler.wrapper.find(".k-event a:has(.k-si-close)").click();
        equal(removeEvent.calls("removeEvent"), 1);
    });

    test("Remove recurring event opens delete recurring dialog", 1, function() {
        var scheduler = setup({
            dataSource: {
                data: [ { recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
            },
            editable: true
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:first").data("uid"));

        equal($(".k-popup-message").text(), "Do you want to delete only this event occurrence or the whole series?");
    });

    test("Remove only current recurring event will remove only current occurrence", 1, function() {
        var scheduler = setup({
            dataSource: {
                data: [ { id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
            },
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
        $(".k-window").find(".k-button:first").click();

        ok(scheduler.dataSource.args("remove")[0].isOccurrence());
    });

    test("Remove an occurrence with startTimezone does not move head start date", 1, function() {
        var start = new Date(2013, 10, 10, 5);
        var end = new Date(2013, 10, 10, 6);

        var scheduler = setup({
            timezone: "Etc/UTC",
            views: ["week"],
            dataSource: {
                data: [ { startTimezone: "Europe/Berlin", id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(start), end: new Date(end), title: "my event" } ]
            },
            editable: true
        });

        start = new Date(scheduler.dataSource.at(0).start);

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
        $(".k-window").find(".k-button:first").click();

        deepEqual(scheduler.dataSource.data()[0].start, start);
    });

    test("Remove recurrence head will remove the corresponding series", 1, function() {
        var scheduler = setup({
            dataSource: {
                data: [ { id: 1, recurrenceRule: "FREQ=DAILY", start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
            },
            views: ["week"],
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
        $(".k-window").find(".k-button:last").click();

        ok(scheduler.dataSource.args("remove")[0].isRecurrenceHead());
    });

    test("Canceling event removal persist instance in the DataSource", 2, function() {
        var scheduler = setup({
            dataSource: {
                data: [ { id: 1, start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
            },
            editable: true
        });

        stub(scheduler.dataSource, {
            remove: scheduler.dataSource.remove
        });

        scheduler.removeEvent(scheduler.wrapper.find(".k-event:last").data("uid"));
        $(".k-window").find(".k-button:last").click();

        equal(scheduler.dataSource.calls("remove"), 0);
        equal(scheduler.dataSource.data().length, 1);
    })
})();
