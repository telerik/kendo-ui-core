(function() {
    var Scheduler = kendo.ui.Scheduler,
        container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("Initialization", {
        setup: function() {
            kendo.effects.disable();
            container = $('<div style="width:500px;height:1000px;">');
        },
        teardown: function() {
            kendo.destroy(container);
            kendo.effects.enable();
        }
    });

    test("kendoScheduler attaches a scheduler object to target", function() {
        container.kendoScheduler();

        ok(container.data("kendoScheduler") instanceof Scheduler);
    });

    test("kendoScheduler is DataBound widget", function() {
        container.kendoScheduler();

        ok(container.data("kendoScheduler") instanceof kendo.ui.DataBoundWidget);
    });

    test("wrapper field is initialized", function() {
       var scheduler = new Scheduler(container);

       equal(scheduler.wrapper[0], container[0]);
   });

   test("timezone is pass to the datasource", function() {
       var scheduler = new Scheduler(container, { timezone: "UTC/Etc" });

       equal(scheduler.dataSource.options.schema.timezone, "UTC/Etc");
   });

   test("timezone does not override the datasource if instance is provided", function() {
       var scheduler = new Scheduler(container, {
           timezone: "UTC/Etc",
           dataSource: new kendo.data.SchedulerDataSource()
       });

       ok(!scheduler.dataSource.options.schema.timezone);
   });

   test("timezone overrides the datasource timezone", function() {
       var scheduler = new Scheduler(container, {
           timezone: "UTC/Etc",
           dataSource: {
               schema: {
                   timezone: "Europe/London"
               }
           }
       });

       equal(scheduler.dataSource.options.schema.timezone, "UTC/Etc");
   });

   test("css classes are added to the wrapper", function() {
       var scheduler = new Scheduler(container);

       ok(scheduler.wrapper.hasClass("k-widget"));
       ok(scheduler.wrapper.hasClass("k-scheduler"));
    });

    test("toolbar is created", function() {
        var scheduler = new Scheduler(container);

        ok(scheduler.wrapper.find(".k-scheduler-toolbar").length);
        equal(scheduler.wrapper.find(".k-scheduler-toolbar")[0], scheduler.toolbar[0]);
    });

    test("navigation button are added to the toolbar", function() {
        var scheduler = new Scheduler(container);
        equal(scheduler.wrapper.find("ul.k-scheduler-navigation li").length, 4);
    });

    test("today button text is read from messages", function() {
        var scheduler = new Scheduler(container, {
            messages: {
                today: "foo"
            }
        });

        equal(scheduler.wrapper.find("li.k-nav-today").text(), "foo");
    });

    test("today is selected by default", function() {
        var scheduler = new Scheduler(container),
            today = new Date();

        equal(scheduler.date().getTime(), getDate(today).getTime());
    });

    test("selected date is read from the options", function() {
        var date = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: date
            });

        equal(scheduler.date().getTime(), date.getTime());
    });

    test("selected date is displayed", function() {
        var scheduler = new Scheduler(container, {
            date: new Date("1/2/2013")
        });

        equal(scheduler.wrapper.find("li.k-nav-current").text(), "Wednesday, January 02, 2013");
    });

    test("custom format is applied to the selected date", function() {
        var scheduler = new Scheduler(container, {
            date: new Date("1/2/2013"),
            views: [
            {
                type: "day",
                selectedDateFormat: "{0:d}"
            }]
        });

        equal(scheduler.wrapper.find("li.k-nav-current").text(), "1/2/2013");
    });

    test("changing selected date updates the label", function() {
        var scheduler = new Scheduler(container);

        scheduler.date(new Date("2/2/2013"));

        equal(scheduler.wrapper.find("li.k-nav-current").text(), "Saturday, February 02, 2013");
    });

    test("clicking on the today selects today's date", function() {
        var scheduler = new Scheduler(container, {
            date: new Date("1/2/2013")
        });

        scheduler.toolbar.find(".k-nav-today").click();

        equal(scheduler.date().getTime(), getDate(new Date()).getTime());
    });

    test("clicking on the next date calls the view", function() {
        var selectedDate = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: selectedDate
            });

        var view = stub(scheduler.view(), "nextDate");

        scheduler.toolbar.find(".k-nav-next").click();

        equal(view.calls("nextDate"), 1);
    });

    test("clicking on the prev date calls the view", function() {
        var selectedDate = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: selectedDate
            });

        var view = stub(scheduler.view(), "previousDate");

        scheduler.toolbar.find(".k-nav-prev").click();

        equal(view.calls("previousDate"), 1);
    });

    test("clicking on the current time opens a calendar", function() {
        var scheduler = new Scheduler(container);

        scheduler.toolbar.find(".k-nav-current").click();

        ok(scheduler.calendar);
        equal(getDate(scheduler.calendar.value()).getTime(), scheduler.date().getTime());
    });

    test("selecting date via the calendar updates the selectedDate value", function() {
        var scheduler = new Scheduler(container);

        scheduler.toolbar.find(".k-nav-current").click();

        scheduler.calendar.value(new Date("4/4/2013"));
        scheduler.calendar.trigger("change");

        equal(getDate(scheduler.calendar.value()).getTime(), scheduler.date().getTime());
    });

    test("view buttons are added to the toolbar", function() {
        var scheduler = new Scheduler(container, {
            views: ["day"]
        });

        ok(scheduler.toolbar.find(".k-view-day").length);
        equal(scheduler.toolbar.find(".k-view-day").text(), "Day");
    });

    test("first view is selected", function() {
        var scheduler = new Scheduler(container, {
            views: ["day"]
        });

        ok(scheduler.toolbar.find(".k-view-day").hasClass("k-state-selected"));
        equal(scheduler.view().name, "day");
    });

    test("work week view is selected", function() {
        var scheduler = new Scheduler(container, {
            views: ["workWeek"]
        });

        ok(scheduler.toolbar.find(".k-view-workweek").hasClass("k-state-selected"));
    });

    test("view is selected", function() {
        var scheduler = new Scheduler(container, {
            views: ["day", { type: "week", selected: true }]
        });

        ok(scheduler.toolbar.find(".k-view-week").hasClass("k-state-selected"));
        equal(scheduler.view().name, "week");
    });

    test("day and week view are rendered by default", function() {
        var scheduler = new Scheduler(container, { });

        ok(scheduler.toolbar.find(".k-view-day").length);
        ok(scheduler.toolbar.find(".k-view-week").length);
    });

    test("default views custom options are merged", function() {
        var scheduler = new Scheduler(container, {
            views: [{
                type: "day",
                title: "My Custom Day View Title"
            }]
        });

        equal(scheduler.toolbar.find(".k-view-day").text(), "My Custom Day View Title");
    });

    test("error is thrown if invalid view is set", 1, function() {
        throws(function() {
            var scheduler = new Scheduler(container, {
                views: [ "NoExistingView" ]
            })
        });
    });

    test("clicking on the view navigation selects the view", function() {
        var scheduler = new Scheduler(container, { });

        scheduler.toolbar.find(".k-view-week").click();

        equal(scheduler.view().name, "week");
        ok(scheduler.toolbar.find(".k-view-week").hasClass("k-state-selected"));
    });

    test("clicking on the view navigation deselects the other views", function() {
        var scheduler = new Scheduler(container, { });

        scheduler.toolbar.find(".k-view-week").click();

        equal(scheduler.toolbar.find(".k-state-selected").length, 1);
    });

    test("default view is created its string name", function() {
        var scheduler = new Scheduler(container, {
            views: [ "day" ]
        });

        ok(scheduler.view() instanceof kendo.ui.MultiDayView);
        equal(scheduler.view().element[0], scheduler.wrapper[0]);
    });

    test("default view is created with provided options", function() {
        var scheduler = new Scheduler(container, {
            views: [ { title: "foo", type: "day" }]
        });

        ok(scheduler.view() instanceof kendo.ui.MultiDayView);
        equal(scheduler.view().title, "foo");
    });

    test("custom view is instantiated", function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
            renderLayout: $.noop,
            dateForTitle: $.noop,
            render: $.noop,
            startDate: $.noop,
            endDate: $.noop
        });

        var scheduler = new Scheduler(container, {
            views: [ {
                title: "foo",
                type: MyCustomView
            }]
        });

        ok(scheduler.view() instanceof MyCustomView);
    });

    test("custom view with title same as default view is instantiated", function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
            renderLayout: $.noop,
            dateForTitle: $.noop,
            render: $.noop,
            startDate: $.noop,
            endDate: $.noop
        });

        var scheduler = new Scheduler(container, {
            views: [ {
                title: "day",
                type: MyCustomView
            }]
        });

        ok(scheduler.view() instanceof MyCustomView);
    });

    test("selected date is passed to view render method", 1, function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
                name: "foo",
                dateForTitle: $.noop,
                render: $.noop,
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [{ type: MyCustomView, title: "foo" }]
            });

        deepEqual(scheduler.view().options.date, scheduler.date());
    });

    test("switching between views destroyes the view", 1, function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
                name: "foo",
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: function(selectedDate) {
                },
                destroy: function() {
                    kendo.ui.SchedulerView.fn.destroy.call(this);
                    ok(true);
                },
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [ { type: MyCustomView, title: "foo" }, "day"]
            });

        scheduler.view("day");
    });

    test("top level options are propagated to the view", function() {
        var scheduler = new Scheduler(container, {
            views: [ "day" ],
            allDaySlot: false
        });

        equal(scheduler.view().options.allDaySlot, false);
    });

    test("top level options are propageted to the custom views", function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
                title: "foo",
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: function(selectedDate) {
                    ok(true);
                },
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [ { type: MyCustomView, title: "foo" }],
                allDaySlot: false
            });

        equal(scheduler.view().options.allDaySlot, false);
    });

    test("events are re-position on window resize", function() {
        var scheduler = new Scheduler(container, { });

        var view = stub(scheduler.view(), "render");

        $(window).trigger("resize");

        equal(view.calls("render"), 1);
    });

    test("renderEvent is called with events as SchedulerEvent", 1, function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
                title: "foo",
                dateForTitle: $.noop,
                render: function(events) {
                    ok((events[0] instanceof kendo.data.SchedulerEvent));
                },
                renderLayout: function() {
                },
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [ { type: MyCustomView, title: "foo" } ],
                dataSource: {
                    data: [ { start: new Date(), end: new Date(), title: "" }]
                }
            });
    });

    test("view is called when navigate is triggered", function() {
        var MyCustomView = kendo.ui.SchedulerView.extend({
                title: "view1",
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: $.noop,
                startDate: $.noop,
                endDate: $.noop
            }),
            MyCustomView2 = kendo.ui.SchedulerView.extend({
                title: "view2",
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: $.noop,
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [ { type: MyCustomView, title: "view1" }, { type: MyCustomView2, title: "view2" }],
                dataSource: { }
            });

        scheduler.view().trigger("navigate", { view: "view2", date: new Date(2013, 1, 2) });

        equal(scheduler.view().title, "view2");
        equal(scheduler.date().getTime(), new Date(2013, 1, 2).getTime());
    });

    test("rebind is called once when navigating between views", function() {

        var MyCustomView = kendo.ui.SchedulerView.extend({
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: $.noop,
                startDate: $.noop,
                endDate: $.noop
            }),
            MyCustomView2 = kendo.ui.SchedulerView.extend({
                dateForTitle: $.noop,
                render: $.noop,
                renderLayout: $.noop,
                startDate: $.noop,
                endDate: $.noop
            }),
            scheduler = new Scheduler(container, {
                views: [{ type: MyCustomView, title: "view1"}, {title: "view2", type: MyCustomView2}],
                dataSource: { }
            }),
            rebindStub = stub(scheduler, "rebind");

        scheduler.view().trigger("navigate", { view: "view2", date: new Date(2013, 1, 2) });

        equal(rebindStub.calls("rebind"), 1);
    });

    test("work day mode is set if present in the navigate events", function() {
        var scheduler = new Scheduler(container);

        scheduler.view().trigger("navigate", { view: "day", isWorkDay: true });

        ok(scheduler._workDayMode);
    });

    test("work day mode is not change if not present in the navigate events", function() {
        var scheduler = new Scheduler(container);

        scheduler.view().trigger("navigate", { view: "day", isWorkDay: true });

        scheduler.view().trigger("navigate", { view: "day" });

        ok(scheduler._workDayMode);
    });

    test("work day mode is passed to the view", function() {
        var scheduler = new Scheduler(container);

        scheduler.view().trigger("navigate", { view: "day", isWorkDay: true });

        ok(scheduler.view().options.showWorkHours);
    });

    test("navigate event is rasied when view is switch to business hours", 3, function() {
        var scheduler = new Scheduler(container);

        scheduler.bind("navigate", function(e) {
            equal(e.isWorkDay, true);
            equal(e.view, "day");
            equal(e.action, "changeWorkDay");
        });

        scheduler.view().trigger("navigate", { view: "day", isWorkDay: true });
    });

    test("navigate event is rasied when navigating between views", 3, function() {
        var scheduler = new Scheduler(container);

        scheduler.bind("navigate", function(e) {
            ok(!e.isWorkDay);
            equal(e.view, "day");
            equal(e.action, "changeView");
        });

        scheduler.view().trigger("navigate", { view: "day" });
    });

    test("canceling the navigate events prevents switching the views", function() {
        var scheduler = new Scheduler(container);

        scheduler.bind("navigate", function(e) {
            e.preventDefault();
        });

        scheduler.view().trigger("navigate", { view: "week" });
        equal(scheduler.view().name, "day");
    });

    test("navigate event is raised when the next date button is clicked", 3, function() {
        var selectedDate = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: selectedDate,
                navigate: function(e) {
                    equal(e.action, "next");
                    deepEqual(e.date, new Date("1/3/2013"));
                    equal(e.view, "day");
                }
            });

        scheduler.toolbar.find(".k-nav-next").click();
    });

    test("navigate event is raised when the prev date button is clicked", 3, function() {
        var selectedDate = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: selectedDate,
                navigate: function(e) {
                    equal(e.action, "previous");
                    deepEqual(e.date, new Date("1/1/2013"));
                    equal(e.view, "day");
                }
            });

        scheduler.toolbar.find(".k-nav-prev").click();
    });

    test("navigate event is raised when the today date button is clicked", 5, function() {
        var selectedDate = new Date("1/2/2013");
        var now = new Date();
        var scheduler = new Scheduler(container, {
                date: selectedDate,
                navigate: function(e) {
                    equal(e.action, "today");
                    equal(e.view, "day");

                    // compare day only, time may vary
                    equal(e.date.getFullYear(), now.getFullYear());
                    equal(e.date.getMonth(), now.getMonth());
                    equal(e.date.getDate(), now.getDate());
                }
            });

        scheduler.toolbar.find(".k-nav-today").click();
    });

    test("preventing navigate event does not change the selected date", function() {
        var selectedDate = new Date("1/2/2013"),
            scheduler = new Scheduler(container, {
                date: selectedDate,
                navigate: function(e) {
                    e.preventDefault();
                }
            });

        scheduler.toolbar.find(".k-nav-today").click();

        deepEqual(scheduler.date(), new Date("1/2/2013"));
    });

    test("navigate event is raised when button view is clicked", 3, function() {
        var scheduler = new Scheduler(container, {
            views: [{ type: "day", selected: true }, "week"],
            navigate: function(e) {
                equal(e.action, "changeView");
                deepEqual(e.date, scheduler.date());
                equal(e.view, "week");
            }
        });

        scheduler.toolbar.find(".k-view-week").click();
    });

    test("slotByPosition function returns null when the _slotByPosition is not available in view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["agenda"],
            dataSource: []
        });

        equal(scheduler.slotByPosition(0,0), null);
    });

    test("slotByElement function returns null when the _slotByPosition is not available in view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["agenda"],
            date: new Date("Thu Jun 27 2013 00:00:00"),
            dataSource: [
                {
                    title: "Foo",
                    description: "Bar",
                    start: new Date("Thu Jun 27 2013 01:00:00"),
                    end: new Date("Thu Jun 27 2013 01:30:00"),
                    isAllDay: false
                }
            ]
        });

        var firstSlot = scheduler.view().content.find("tr:first td:first");
        equal(scheduler.slotByElement(firstSlot), null);
    });

    test("slotByPosition function returns null when there is no slot on current position", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["day"],
            dataSource: []
        });

        equal(scheduler.slotByPosition(0,0), null);
    });

    test("slotByPosition function returns groupIndex correctly in day view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["day"],
            dataSource: []
        });

        var firstSlotOffset = scheduler.view().content.find("tr:first td:first").offset();
        var slot = scheduler.slotByPosition(firstSlotOffset.left + 1, firstSlotOffset.top + 1);

        ok(slot !== null && slot.groupIndex == 0);
    });

    test("slotByPosition function returns slot correctly on day view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["day"],
            dataSource: []
        });

        var firstSlotOffset = scheduler.view().content.find("tr:first td:first").offset();
        var slot = scheduler.slotByPosition(firstSlotOffset.left + 1, firstSlotOffset.top + 1);

        ok(slot !== null && typeof slot == "object");
    });

    test("slotByPosition function returns slot correctly on week view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["week"],
            dataSource: []
        });

        var firstSlotOffset = scheduler.view().content.find("tr:first td:first").offset();
        var slot = scheduler.slotByPosition(firstSlotOffset.left + 1, firstSlotOffset.top + 1);

        ok(slot !== null && typeof slot == "object");
    });

   test("slotByPosition function returns slot correctly on month view", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["month"],
            dataSource: []
        });

        var firstSlotOffset = scheduler.view().content.find("tr:first td:first").offset();
        var slot = scheduler.slotByPosition(firstSlotOffset.left + 1, firstSlotOffset.top + 1);

        ok(slot !== null && typeof slot == "object");
    });

   test("slotByPosition function returns Date objects in startDate and endDate fields", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["month"],
            dataSource: []
        });

        var firstSlotOffset = scheduler.view().content.find("tr:first td:first").offset();
        var slot = scheduler.slotByPosition(firstSlotOffset.left + 1, firstSlotOffset.top + 1);

        ok(slot.startDate instanceof Date);
        ok(slot.endDate instanceof Date);
    });

    test("slotByElement function returns object when JavaScript element is passed", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["day"],
            dataSource: []
        });

        var firstSlot = scheduler.view().content.find("tr:first td:first")[0];
        var slot = scheduler.slotByElement(firstSlot);

        ok(slot !== null && typeof slot == "object");
    });

    test("resourcesBySlot function returns resources for passed index", function() {
        QUnit.fixture.append(container);
        var scheduler = new kendo.ui.Scheduler(container, {
            views: ["day"],
            dataSource: [],
            group: {
                resources: ["ResourceName", "ResourceName2"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "rooms",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Room1", value: 1 },
                        { text: "Room2", value: 2 }
                    ]
                },
                {
                    field: "persons",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Fred", value: 1 },
                        { text: "Barny", value: 2 }
                    ]
                }
            ]
        });


        var resources1 = scheduler.resourcesBySlot({ groupIndex: 0 });
        equal(resources1.rooms, 1);
        equal(resources1.persons, 1);

        var resources2 = scheduler.resourcesBySlot({ groupIndex: 1 });
        equal(resources2.rooms, 1);
        equal(resources2.persons, 2);

        var resources3 = scheduler.resourcesBySlot({ groupIndex: 2 });
        equal(resources3.rooms, 2);
        equal(resources3.persons, 1);

        var resources4 = scheduler.resourcesBySlot({ groupIndex: 3 });
        equal(resources4.rooms, 2);
        equal(resources4.persons, 2);
    });

    test("date past max is not selected", function() {
        var scheduler = new Scheduler(container, {
                date: new Date("1/1/2013"),
                max: new Date("1/2/2013")
            });

        scheduler.date(new Date("1/3/2013"));
        deepEqual(scheduler.date(), new Date("1/1/2013"));
    });

    test("date before min is not selected", function() {
        var scheduler = new Scheduler(container, {
                date: new Date("2/2/2013"),
                min: new Date("2/1/2013")
            });

        scheduler.date(new Date("1/3/2013"));
        deepEqual(scheduler.date(), new Date("2/2/2013"));
    });

    test("min and max is set to calendar", function() {
        var scheduler = new Scheduler(container, {
            date: new Date("2/2/2013"),
            min: new Date("2/1/2013"),
            max: new Date("2/3/2013")
        });

        scheduler.toolbar.find(".k-nav-current").click();

        equal(scheduler.calendar.options.min, scheduler.options.min);
        equal(scheduler.calendar.options.max, scheduler.options.max);
    });

    test("kendo.resize does not trigger resize event", 0, function() {
        var scheduler = new Scheduler(container, {
            resize: function() {
                ok(true);
            }
        });

        kendo.resize(container);
    });

    test("resize method does nothing if view is destroyed", 0, function() {
        var scheduler = new Scheduler(container);

        scheduler.view().destroy();

        scheduler.resize(true);
    });

    test("Recreating the scheduler does not throw javascript exception if widget is bound to external dataSource", 0, function() {
        var dataSource = new kendo.data.SchedulerDataSource({
            data: [
                {
                    id: 1,
                    start: new Date("2013/6/6 08:00 AM"),
                    end: new Date("2013/6/6 09:00 AM"),
                    title: "Interview"
                },
                {
                    id: 2,
                    start: new Date("2013/6/6 08:00 AM"),
                    end: new Date("2013/6/6 09:00 AM"),
                    title: "Meeting"
                }
            ]
        });

        container.kendoScheduler({ 
            date: new Date("2013/6/6"),
            dataSource: dataSource
        });

        try {
            container.data("kendoScheduler").destroy();
            container.empty();
            container.kendoScheduler({ 
                date: new Date("2013/6/6"),
                dataSource: dataSource
            });
        } catch (e) {
            ok(false, "Error is thrown!");
        }
    });
})();
