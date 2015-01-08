(function() {
   var Scheduler = kendo.ui.Scheduler,
       SchedulerEvent = kendo.data.SchedulerEvent,
       timezone = kendo.timezone,
       container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("editing", {
        setup: function() {
            container = $("<div>");
            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(container);
            kendo.effects.enable();
        }
    });

    function setup(options) {
        return new Scheduler(container,
            $.extend({
                data: new Date(),
                dataSource: {
                    data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ]
                }
            }, options)
        );
    }

    test("occurrenceByUid method returns event from dataSource", function() {
        var date = kendo.date.today();
        date.setHours(10);
        var scheduler = setup({
            dataSource: {
                data: [ { id:1, recurrenceRule: "FREQ=DAILY;BYHOUR=10,12,14;", start: date, end: date, title: "my event" } ]
            }
        });

        var uid = scheduler.wrapper.find(".k-event:first").data("uid");

        var occurrence = scheduler.occurrenceByUid(uid);
        ok(occurrence);
        ok(scheduler.dataSource.getByUid(uid));
    });

    test("occurrenceByUid method searches in scheduler._data events", function() {
        var scheduler = setup({
            dataSource: {
                data: [ { id:1, recurrenceRule: "FREQ=DAILY;BYHOUR=10,12,14;", start: kendo.date.today(), end: kendo.date.today(), title: "my event" } ]
            }
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");

        var occurrence = scheduler.occurrenceByUid(uid);
        ok(occurrence);
        ok(!scheduler.dataSource.getByUid(uid));
    });

    test("adding model updates the view", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            render = stub(scheduler.view(), "render");

        dataSource.add({});

        equal(render.calls("render"), 1);
    });

    test("clicking view slot calls addEvent method", function() {
        QUnit.fixture.append(container);

        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            addEvent = stub(scheduler, "addEvent");

        var cell = scheduler.view().content.find("td").first();
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });

        equal(addEvent.calls("addEvent"), 1);
        ok(addEvent.args("addEvent")[0].start);
        ok(addEvent.args("addEvent")[0].end);
    });

    test("addEvent calls dataSource add method", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            add = stub(dataSource, "add");

        scheduler.addEvent();

        equal(add.calls("add"), 1);
    });

    test("addEvent triggers add event passing the start and end date and all day info", 3, function() {
        var scheduler = setup({
            add: function(e) {
                deepEqual(e.event.start, new Date("2013/6/6"));
                deepEqual(e.event.end, new Date("2013/6/7"));
                deepEqual(e.event.isAllDay, true);
            }
        });

        scheduler.addEvent({ isAllDay: true, start: new Date("2013/6/6"), end: new Date("2013/6/7") });
    });

    test("cancelling addEvent prevent adding the event to the DataSource", function() {
        var scheduler = setup({
                add: function(e) {
                    e.preventDefault();
                }
            }),
            dataSource = scheduler.dataSource,
            add = stub(dataSource, "add");

        scheduler.addEvent({ isAllDay: true, start: new Date("2013/6/6"), end: new Date("2013/6/7") });

        equal(add.calls("add"), 0);
    });

    test("addEvent with type allday creates allday event", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource;

        scheduler.addEvent({ isAllDay: true, start: new Date(2013, 1, 13, 0, 0, 0), end: new Date(2013, 1, 13, 0, 0, 0) });

        equal(dataSource.at(0).isAllDay, true);
    });

    test("dblclicking on event calls editEvent", function() {
        var scheduler = setup({
                dataSource: {
                    data: [ { start: new Date(), end: new Date(), title: "my event" } ]
                }
            }),
            dataSource = scheduler.dataSource,
            editEvent = stub(scheduler, "editEvent");

        scheduler.view().content.find(".k-event").first().dblclick();

        equal(editEvent.calls("editEvent"), 1);
    });

    test("dblclicking on allday event calls editEvent", function() {
        var scheduler = setup(),
            dataSource = scheduler.dataSource,
            editEvent = stub(scheduler, "editEvent");

        scheduler.view().datesHeader.find(".k-event").first().dblclick();

        equal(editEvent.calls("editEvent"), 1);
    });

    test("editEvent creates window instance", function() {
        var scheduler = setup();

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        ok(scheduler._editor.container.data("kendoWindow"));
    });

    test("default settings are applied to the window", function() {
        var scheduler = setup();
        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var wnd = scheduler._editor.container.data("kendoWindow");

        ok(wnd.options.modal);
        ok(!wnd.options.resizable);
        ok(wnd.options.draggable);
        equal(wnd.options.title, "Event");
    });

    test("custom settings are applied to the window", function() {
        var scheduler = setup({ editable: { window: { title: "foo" } } });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var wnd = scheduler._editor.container.data("kendoWindow");

        equal(wnd.options.title, "foo");
    });

    test("correct model is passed to the editable instance", function() {
        var scheduler = setup({ editable: { window: { title: "foo" } } });

        var event = scheduler.dataSource.at(0);
        scheduler.editEvent(event.uid);

        var container = scheduler._editor.container;
        equal(container.data("kendoEditable").options.model, event);
    });

    test("custom template is used if specified", 1, function() {
        var scheduler = setup({
            editable: { template:'<div id="foo">#=title#</div>' },
            edit: function(e) {
                equal(e.container.find("#foo").text(), "my event");
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("custom template as function", 1, function() {
        var scheduler = setup({
            editable: { template: kendo.template('<div id="foo"></div>') },
            edit: function(e) {
               equal(e.container.find("#foo").length, 1);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("editor is destroyed if the edit event is prevented", 1, function() {
        var scheduler = setup({
            edit: function(e) {
                e.preventDefault();
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
        ok(!scheduler._editor.editable);
    });

    test("the new event is removed if the edit event is prevented", 1, function() {
        var scheduler = setup({
            edit: function(e) {
                e.preventDefault();
            }
        });

        scheduler.addEvent({ start: new Date(), end: new Date() });
        equal(scheduler.dataSource.data().length, 1);
    });

    test("update and cancel buttons are added if template is set", 2, function() {
        var scheduler = setup({
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-scheduler-update").length, 1);
                equal(e.container.find("a.k-scheduler-cancel").length, 1);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("Update and cancel button custom text", 2, function() {
        var scheduler = setup({
            messages: {
                save: "myUpdate",
                cancel: "myCancel"
            },
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-scheduler-update").text(), "myUpdate");
                equal(e.container.find("a.k-scheduler-cancel").text(), "myCancel");
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("destroy button is added to the popUp editor", 1, function() {
        var scheduler = setup({
            editable: true,
            edit: function(e) {
                equal(e.container.find("a.k-scheduler-delete").length, 1);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("destroy button is not added to the popUp editor if destroy is disabled", 1, function() {
        var scheduler = setup({
            editable: {
                destroy: false
            },
            edit: function(e) {
                ok(!e.container.find("a.k-scheduler-delete").length);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });


    test("destroy button is added to the popUp editor if template is set", 1, function() {
        var scheduler = setup({
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-scheduler-delete").length, 1);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("destroy button in popup editor custom text", 1, function() {
        var scheduler = setup({
            messages: {
                destroy: "myDestroy"
            },
            editable: { template:"<div>#=title#</div>" },
            edit: function(e) {
                equal(e.container.find("a.k-scheduler-delete").text(), "myDestroy");
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);
    });

    test("clicking destroy button in popUp editor calls delete event", function() {
        var scheduler = setup(),
            saveEvent = stub(scheduler, "removeEvent");

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        scheduler._editor.container.find("a.k-scheduler-delete").click();

        ok(saveEvent.calls("removeEvent"));
    });

    test("destroy button should be removed for create new events", function() {
        var scheduler = setup();

        scheduler.addEvent();

        var button = scheduler._editor.container.find("a.k-scheduler-delete");
        equal(button.length, 0);
    });

    test("clicking update buttons calls update event", function() {
        var scheduler = setup(),
            saveEvent = stub(scheduler, "saveEvent");

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        scheduler._editor.container.find("a.k-scheduler-update").click();

        ok(saveEvent.calls("saveEvent"));
    });

    test("clicking cancel buttons calls cancel event", function() {
        var scheduler = setup(),
            cancelEvent = stub(scheduler, "cancelEvent");

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        scheduler._editor.container.find("a.k-scheduler-cancel").click();

        ok(cancelEvent.calls("cancelEvent"));
    });

    test("clicking close button of the window calls cancelEvent", function() {
        var scheduler = setup(),
            eventElement = scheduler.dataSource.at(0).uid,
            cancelEvent = stub(scheduler, "cancelEvent");

        scheduler.editEvent(eventElement);

        var wnd = scheduler._editor.container.data("kendoWindow");
        wnd.wrapper.find(".k-i-close").click();

        equal(cancelEvent.calls("cancelEvent"), 2);
    });

    test("editEvent call cancelEvent", function() {
        var scheduler = setup(),
            eventElement = scheduler.dataSource.at(0).uid,
            cancelEvent = stub(scheduler, "cancelEvent");

        scheduler.editEvent(eventElement);

        equal(cancelEvent.calls("cancelEvent"), 1);
    });

    test("cancelEvent closes the popup", 2, function() {
        var scheduler = setup(),
            eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        var wnd = scheduler._editor.container.data("kendoWindow");

        wnd.bind("close", function() {
            ok(true, "Window is not been closed");
        });

        scheduler.cancelEvent();
        ok(!scheduler._editor.container);
    });

    test("cancel event is raised when cancel button is clicked", 2, function() {
        var scheduler = setup({
            cancel: function(e) {
                equal(e.event, this.dataSource.at(0));
                ok(e.container.length);
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        scheduler._editor.container.find("a.k-scheduler-cancel").click();
    });

    test("preventing the cancel event leaves the window open when cancel button is clicked", function() {
        var scheduler = setup({
            cancel: function(e) {
                e.preventDefault();
            }
        }),
        eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler._editor.container.find("a.k-scheduler-cancel").click();

        ok(scheduler._editor.container.is(":visible"));
    });

    test("cancel event is raised when window is closed", 2, function() {
        var scheduler = setup({
            cancel: function(e) {
                equal(e.event, this.dataSource.at(0));
                ok(e.container.length);
            }
        }),
        eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        $(scheduler._editor.container.parent().find(".k-i-close")).click();
    });

    test("preventing the cancel event leaves the window open when close button is clicked", function() {
        var scheduler = setup({
            cancel: function(e) {
                e.preventDefault();
            }
        }),
        eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);
        scheduler._editor.container.parent().find(".k-i-close").click();

        ok(scheduler._editor.container.is(":visible"));
    });

    test("saveEvent calls validate", function() {
         var scheduler = setup(),
            eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        var validate = stub(scheduler._editor.container.data("kendoValidator"), "validate");

        scheduler.saveEvent();

        ok(validate.calls("validate"));
    });

    test("saveEvent item does not leave edit mode if validation fails", function() {
        var scheduler = setup({
            editable: {
                template: "<input/>"
            },
            dataSource: {
                    data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ],
                    schema: {
                        model: {
                            fields: {
                                title: { validation: { custom: function() { return false; } } }
                            }
                        }
            }}}),
            eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        ok(scheduler._editor.container.find(".k-scheduler-update").length);
    });

    test("validation rules for description field are executed", function() {
        var scheduler = setup({
                dataSource: {
                    data: [{ start: new Date(), end: new Date(), isAllDay: true, title: "", description: "" }],
                    schema: {
                        model: {
                            fields: {
                                description: { validation: { required: true} }
                            }
                        }
                    }
                }
        });
        var eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        ok(scheduler._editor.container.find(".k-scheduler-update").length);
    });

    test("validation attributes for description field are correctly set", function() {
        var scheduler = setup({
            dataSource: {
                data: [{ start: new Date(), end: new Date(), isAllDay: true, title: "", description: "" }],
                schema: {
                    model: {
                        fields: {
                            description: { validation: { required: true, email: true} }
                        }
                    }
                }
            }
        });
        var eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        equal(scheduler._editor.container.find("[name=description]").attr("data-type"), "email");
        equal(scheduler._editor.container.find("[name=description]").attr("required"), "required");
    });

    test("saveEvent calls DataSource sync", function() {
        var scheduler = setup(),
            eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        var sync = stub(scheduler.dataSource, "sync");

        scheduler.saveEvent();

        ok(sync.calls("sync"));
    });

    test("sync is not call if save event is canceled", function() {
        var scheduler = setup({
            save: function(e) {
                e.preventDefault();
            }
        }),
        eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        ok(scheduler._editor.container);
    });

    test("addEvent opens the edit form", function() {
        var scheduler = setup();

        scheduler.addEvent({ start: new Date(), end: new Date() });

        ok(scheduler._editor.container);
    });

    test("all fields are wrapped", function() {
        var scheduler = setup();

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var container = scheduler._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div").not(".k-edit-buttons").not(".k-recur-view");

        equal(elements.length, 15);
        ok(elements.eq(0).hasClass("k-edit-label"));
        equal(elements.eq(0).find("label").attr("for"), "title");
        equal(elements.eq(1).data("container-for"), "title");
        ok(elements.eq(1).hasClass("k-edit-field"));
    });

    test("data-validate attribute value is set to the date/datetime pickers based on the isAllDay value", 4, function() {
        var scheduler = setup();

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        scheduler._editor.container.find("[data-role=datepicker]").each(function() {
            equal($(this).attr("data-validate"), "false");
        });

        scheduler._editor.container.find("[data-role=datetimepicker]").each(function() {
            equal($(this).attr("data-validate"),"true");
        });
    });

    test("addEvent binds toggleValidation change handler to model", function() {
        var scheduler = setup();

        scheduler.addEvent({ start: new Date(), end: new Date() });
        var model = scheduler._editor.editable.options.model;
        ok($.inArray(scheduler._editor.toggleDateValidationHandler, model._events.change) >= 0);
    });

    test("editEvent binds toggleValidation change handler to model", function() {
        var scheduler = setup();
        var model = scheduler.dataSource.at(0);
        scheduler.editEvent(model.uid);
        ok($.inArray(scheduler._editor.toggleDateValidationHandler, model._events.change) >= 0);
    });

    test("toggleValidation change handler is not bound if edit event is prevented", function() {
        var scheduler = setup({
            edit: function(e) {
                e.preventDefault();
            }
        });
        var model = scheduler.dataSource.at(0);
        scheduler.editEvent(model.uid);
        ok($.inArray(scheduler._editor.toggleDateValidationHandler, model._events.change) < 0);
    });

    test("cancleEvent unbinds toggleValidation change handler from model", function() {
        var scheduler = setup();
        var model = scheduler.dataSource.at(0);
        scheduler.editEvent(model.uid);
        scheduler.cancelEvent();
        ok($.inArray(scheduler._editor.toggleDateValidationHandler, model._events.change) < 0);
    });

    test("changing isAllDay value updates pickers data-validation attribute", 8, function() {
        var scheduler = setup();
        var model = scheduler.dataSource.at(0);
        model.isAllDay = false;
        scheduler.editEvent(model.uid);
        model.set("isAllDay", true);

        scheduler._editor.container.find("[data-role=datepicker]").each(function() {
            equal($(this).attr("data-validate"), "true");
        });

        scheduler._editor.container.find("[data-role=datetimepicker]").each(function() {
            equal($(this).attr("data-validate"), "false");
        });

        model.set("isAllDay", false);

        scheduler._editor.container.find("[data-role=datepicker]").each(function() {
            equal($(this).attr("data-validate"), "false");
        });

        scheduler._editor.container.find("[data-role=datetimepicker]").each(function() {
            equal($(this).attr("data-validate"), "true");
        });
    });

    test("non editable field value is shown", function() {
        var scheduler = setup({
            dataSource: {
                data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event" } ],
                schema: { model: { fields: { title: { editable:false } } } }
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var container = scheduler._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div").not(".k-edit-buttons").not(".k-recur-view");

        equal(elements.length, 13);
        ok(elements.eq(0).hasClass("k-edit-label"));
        equal(elements.eq(0).find("label").attr("for"), "title");
        equal(elements.eq(1).text(), "my event");
        ok(elements.eq(1).hasClass("k-edit-field"));
    });

    test("render description editor if exists", function() {
        var scheduler = setup({
            dataSource: {
                data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event", description: "foo" } ]
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var container = scheduler._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div");

        ok(elements.filter("[data-container-for=description]").length);
    });

    test("recurrence editor is not rendered if recurrenceId property exists", function() {
        var scheduler = setup({
            dataSource: {
                data: [
                    new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), isAllDay: true, title: "my event" }),
                    new SchedulerEvent({ start: new Date(), end: new Date(), isAllDay: true, title: "my event", recurrenceId: 1 })
                ]
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var container = scheduler._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div");

        ok(!elements.filter("[data-container-for=recurrence]").length);
    });

    test("recurrence editor is rendered if recurrenceRule property exists", function() {
        var scheduler = setup({
            dataSource: {
                data: [ { start: new Date(), end: new Date(), isAllDay: true, title: "my event", recurrenceRule: ""} ]
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var container = scheduler._editor.container.children("div.k-edit-form-container");
        var elements = container.children("div");

        ok(elements.filter("[data-container-for=recurrenceRule]").length);
    });

    module("recurrence editing", {
        setup: function() {
            kendo.effects.disable();
            container = $("<div>");
        },
        teardown: function() {
            kendo.destroy(container);
            kendo.effects.enable();
        }
    });

    test("show recurring dialog", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ { start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"} ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid");
        scheduler.editEvent(eventUID);

        ok($(".k-window-title").text(), "Edit Recurring Item");
    });

    test("close recurring dialog on button click", 1, function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ { id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"} ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid");

        stub(scheduler, {
            addEvent: scheduler.addEvent
        });

        scheduler.editEvent(eventUID);

        var popup = $(".k-window");

        popup.find(".k-button:first").click();

        equal(popup.is(":visible"), false);
    });

    test("Set timezone to the RecurrenceEditor", function() {
        var scheduler = setup({
            views: ["week"],
            timezone: "Etc/UTC",
            dataSource: {
                data: [ { id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"} ]
            }
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        $(".k-window .k-button:last").click();

        var editor = scheduler._editor.container.find("[data-role=recurrenceeditor]").data("kendoRecurrenceEditor");

        equal(editor.options.timezone, "Etc/UTC");
    });

    test("create exception", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid");

        stub(scheduler, {
            addEvent: scheduler.addEvent
        });

        scheduler.editEvent(eventUID);

        //edit current instance
        $(".k-window .k-button:first").click();

        equal(scheduler.calls("addEvent"), 1);
    });

    test("creating exception using UTC timezone", function() {
        var scheduler = setup({
            timezone: "Etc/UTC",
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid"),
            origin = scheduler.dataSource.at(0),
            exception;

        scheduler.editEvent(eventUID);
        $(".k-window .k-button:first").click();

        exception = scheduler.dataSource.at(1);

        ok(origin.recurrenceException);
        equal(origin.recurrenceException, kendo.toString(exception.start, "yyyyMMddTHHmmssZ") + ";");
    });

    test("creating exception sets event exception property", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid"),
            origin = scheduler.dataSource.at(0),
            exception;

        scheduler.editEvent(eventUID);

        $(".k-window .k-button:first").click();

        exception = scheduler.dataSource.at(1);

        ok(origin.recurrenceException);
        equal(origin.recurrenceException, kendo.toString(kendo.timezone.apply(exception.start, 0), "yyyyMMddTHHmmssZ") + ";");
    });

    test("created exception has no id and recurrenceRule property", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid"),
            origin = scheduler.dataSource.at(0),
            exception;

        scheduler.editEvent(eventUID);

        $(".k-window .k-button:first").click();

        exception = scheduler.dataSource.at(1);

        ok(exception.isNew())
    });

    test("creating exception adds exception date to event exception property", function() {
        var now = new Date("2013/6/6 10:00");
        now.setMilliseconds(0);

        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: now, end: now, title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var events = scheduler.element.find(".k-event"),
            origin = scheduler.dataSource.at(0);

        scheduler.editEvent(events.last().data("uid"));

        $(".k-window .k-button:first").click();

        scheduler.saveEvent();

        events = scheduler.element.find(".k-event");

        scheduler.editEvent(events.first().data("uid"));

        $(".k-window .k-button:first").click();

        scheduler.saveEvent();

        var result = kendo.toString(kendo.timezone.apply(scheduler.dataSource.at(1).start, 0), "yyyyMMddTHHmmssZ") + ";" +
                     kendo.toString(kendo.timezone.apply(scheduler.dataSource.at(2).start, 0), "yyyyMMddTHHmmssZ") + ";";

        equal(origin.recurrenceException, result);
    });

    test("Editing exception opens recurring dialog", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var events = scheduler.element.find(".k-event"),
            origin = scheduler.dataSource.at(0);

        scheduler.editEvent(events.last().data("uid"));

        $(".k-window .k-button:first").click();

        scheduler.saveEvent();

        events = scheduler.element.find(".k-event");

        stub(scheduler, {
            addEvent: scheduler.addEvent,
            _editEvent: scheduler._editEvent
        });

        scheduler.dataSource.at(1).set("id", 2);
        scheduler.editEvent(events.last().data("uid"));

        ok($(".k-window").find(".k-window-title").text(), "Edit Recurring Item");
        ok($(".k-window").is(":visible"));
    });

    test("open recurring window if editing old exception", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid"),
            origin = scheduler.dataSource.at(0),
            exception;

        scheduler.editEvent(eventUID);
        $(".k-window .k-button:first").click();

        exception = scheduler.dataSource.at(1);

        ok(origin.recurrenceException);
        equal(origin.recurrenceException, kendo.toString(kendo.timezone.apply(exception.start, 0), "yyyyMMddTHHmmssZ") + ";");
    });

    test("Normalize model if create exception from origin", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var origin = scheduler.dataSource.at(0), exception;

        scheduler.editEvent(origin.uid);

        $(".k-window .k-button:first").click();

        exception = scheduler.dataSource.at(1);

        ok(origin.recurrenceException);
        equal(origin.recurrenceException, kendo.toString(kendo.timezone.apply(exception.start, 0), "yyyyMMddTHHmmssZ") + ";");
        equal(origin.id, exception.recurrenceId);
    });

    test("edit series", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var eventUID = scheduler.element.find(".k-event:last").data("uid");

        stub(scheduler, {
            _editEvent: scheduler._editEvent
        });

        scheduler.editEvent(eventUID);

        //edit current instance
        $(".k-window .k-button:last").click();

        var model = scheduler.args("_editEvent", 0)[0];

        equal(scheduler.calls("_editEvent"), 1);
        equal(model.uid, scheduler.dataSource.at(0).uid);
    });

    test("edit series deletes created exceptions", function() {
        var scheduler = setup({
            views: ["week"],
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: new Date(), end: new Date(), title: "my event", recurrenceRule: "FREQ=DAILY"}) ]
            }
        });

        var event = scheduler.element.find(".k-event:last");

        scheduler.editEvent(event.data("uid"));

        $(".k-window .k-button:first").click();

        scheduler.saveEvent();
        scheduler.dataSource.at(1).set("id", 2);

        var eventUID = scheduler.element.find(".k-event:last").data("uid");
        scheduler.editEvent(eventUID);

        //edit current instance
        $(".k-window .k-button:last").click();
        scheduler.saveEvent();

        var model = scheduler.dataSource.at(0);

        equal(scheduler.dataSource.data().length, 1);
        equal(model.recurrenceException, "");
    });

    test("delete occurrence creates recurrenceException entry", function() {
        var date = new Date(2013, 10, 10, 15, 0, 0),
            exceptionDate = new Date(2013, 10, 12, 15, 0, 0),
            exceptionDate = kendo.timezone.apply(exceptionDate, 0),
            recurrenceException = kendo.toString(exceptionDate, "yyyyMMddTHHmmssZ") + ";";

        var scheduler = setup({
            views: ["week"],
            date: date,
            dataSource: {
                data: [ new SchedulerEvent({ id: 1, start: date, end: date, title: "my event", recurrenceRule: "FREQ=DAILY" }) ]
            }
        });

        scheduler.removeEvent(scheduler.element.find(".k-event").eq(2).data("uid"));

        $(".k-window .k-button:first").click();

        var model = scheduler.dataSource.at(0);

        equal(model.recurrenceException, recurrenceException);
    });

    test("delete created exception", function() {
        var date = new Date(2013, 10, 10, 15, 0, 0),
            nextDate = new Date(2013, 10, 11, 15, 0, 0),
            recurrenceException = kendo.toString(kendo.timezone.apply(nextDate, 0), "yyyyMMddTHHmmssZ") + ";";

        var scheduler = setup({
            views: ["week"],
            date: date,
            dataSource: {
                data: [
                    new SchedulerEvent({ id: 1, start: date, end: date, title: "my event", recurrenceRule: "FREQ=DAILY", recurrenceException: recurrenceException}),
                    new SchedulerEvent({ id: 2, start: nextDate, end: nextDate, title: "my event", recurrenceId: "1" })
                ]
            }
        });

        var event = scheduler.element.find(".k-event").eq(1);
            origin = scheduler.dataSource.at(0);

        scheduler.removeEvent(event.data("uid"));

        $(".k-window .k-button:first").click(); //delete current occurrence

        $(".k-window .k-button:first").click(); //accept deletion

        equal(scheduler.dataSource.data().length, 1);
        equal(origin.recurrenceException, recurrenceException);
    });

    test("deleting series wll delete all exceptions", function() {
        var date = new Date(2013, 10, 10, 15, 0, 0),
            nextDate = new Date(2013, 10, 11, 15, 0, 0),
            recurrenceException = kendo.toString(kendo.timezone.apply(nextDate, 0), "yyyyMMddTHHmmssZ") + ";";

        var scheduler = setup({
            views: ["week"],
            date: date,
            dataSource: {
                data: [
                    new SchedulerEvent({ id: 1, start: date, end: date, title: "my event", recurrenceRule: "FREQ=DAILY", recurrenceException: recurrenceException}),
                    new SchedulerEvent({ id: 2, start: nextDate, end: nextDate, title: "my event", recurrenceId: 1 })
                ]
            }
        });

        var event = scheduler.element.find(".k-event").eq(1);

        scheduler.removeEvent(event.data("uid"));

        $(".k-window .k-button:last").click(); //delete series

        $(".k-window .k-button:first").click(); //accept deletion

        equal(scheduler.dataSource.data().length, 0);
    });

    test("recurrenceRule is persisted after delete cancellation", function() {
        var date = new Date(2013, 10, 10, 15, 0, 0),
            nextDate = new Date(2013, 10, 11, 15, 0, 0),
            recurrenceException = kendo.toString(kendo.timezone.apply(nextDate, 0), "yyyyMMddTHHmmssZ") + ";";

        var scheduler = setup({
            views: ["week"],
            date: date,
            dataSource: {
                data: [
                    new SchedulerEvent({ id: 1, start: date, end: date, title: "my event", recurrenceRule: "FREQ=DAILY", recurrenceException: recurrenceException}),
                    new SchedulerEvent({ id: 2, start: nextDate, end: nextDate, title: "my event", recurrenceId: "1" })
                ]
            }
        });

        var event = scheduler.element.find(".k-event").eq(2);

        scheduler.removeEvent(event.data("uid"));
        $(".k-window .k-button:first").click(); //delete current occurrence
        $(".k-window .k-button:last").click(); //cancel deletion

        ok(scheduler.dataSource.at(0).recurrenceRule);
    });

    module("Timezone editing", {
        setup: function() {
            kendo.effects.disable();

            container = $("<div>");
        },
        teardown: function() {
            kendo.destroy(container);
            kendo.effects.enable();
        }
    });

    test("Render Timezone field", function() {
        var scheduler = setup(),
            uid = scheduler.dataSource.data()[0].uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        var anchor = scheduler._editor.container.find(".k-edit-field > a");

        ok(anchor[0]);
        equal(anchor.text(), "Time zone");
    });

    test("Hide Timezone field if isAllDay", function() {
        var scheduler = setup(),
            event = scheduler.dataSource.data()[0],
            uid = event.uid;

        event.isAllDay = true;

        scheduler.editEvent(uid);
        var anchor = scheduler._editor.container.find(".k-edit-field > a");

        equal(anchor[0].style.display, "none");
    });

    test("Show Timezone field if it is not allday", function() {
        var scheduler = setup(),
            event = scheduler.dataSource.data()[0],
            uid = event.uid;

        event.isAllDay = false;

        scheduler.editEvent(uid);
        var anchor = scheduler._editor.container.find(".k-edit-field > a");

        equal(anchor[0].style.display, "");
    });

    test("Show Timezone field on isAllDay change", function() {
        var scheduler = setup(),
            event = scheduler.dataSource.data()[0],
            uid = event.uid;

        event.isAllDay = true;

        scheduler.editEvent(uid);

        var anchor = scheduler._editor.container.find(".k-edit-field > a");

        event.set("isAllDay", false);

        equal(anchor[0].style.display, "");
    });

    test("Render start and end timezone editors", function() {
        var scheduler = setup(),
            uid = scheduler.dataSource.data()[0].uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        var editors = scheduler._editor.container.find("[data-role=timezoneeditor]");

        equal(editors.length, 2);
        equal(editors.eq(0).attr("data-bind"), "value:startTimezone");
        equal(editors.eq(1).attr("data-bind"), "value:endTimezone");
    });

    test("Click Timezone anchor creates timezone popup", function() {
        var scheduler = setup(),
            uid = scheduler.dataSource.data()[0].uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        var editors = scheduler._editor.container.find(".k-edit-field > a").click();

        ok(scheduler._editor._timezonePopup);
        ok(scheduler._editor._timezonePopup.is(":visible"));
        ok(!scheduler._editor._timezonePopup.find(".k-edit-field:last").is(":visible"));
    });

    test("Render popup editor with disabled checkbox", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        var editors = scheduler._editor.container.find(".k-edit-field > a").click();

        ok(scheduler._editor._timezonePopup.find("input[type=checkbox]").prop("disabled"))
    });

    test("Show second TimezoneEditor if model.endTimezone is defined", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        model.set("endTimezone", "America/Toronto");

        scheduler.editEvent(uid);
        var editors = scheduler._editor.container.find(".k-edit-field > a").click();

        ok(scheduler._editor._timezonePopup.find("input[type=checkbox]").prop("checked"))
    });

    test("Select correct timezone if startTimezone is defined", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        model.set("startTimezone", "America/Toronto");

        scheduler.editEvent(uid);
        var editor = scheduler._editor.container.find("[data-role=timezoneeditor]:first").data("kendoTimezoneEditor");

        equal(editor.value(), "America/Toronto");
    });

    test("Timezone editor uses messages.noTimezone text for optionLabel", function() {
        var scheduler = setup({
            messages: {
                editor: {
                    noTimezone: "test"
                }
            }
        });
        var model = scheduler.dataSource.data()[0];
        var uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);

        var editor = scheduler._editor.container
                              .find("[data-role=timezoneeditor]:first")
                              .data("kendoTimezoneEditor");

        equal(editor.options.optionLabel, "test");
    });

    test("Click done closes timezone popup", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        scheduler._editor.container.find(".k-edit-field > a").click();
        scheduler._editor._timezonePopup.find(".k-scheduler-savetimezone").click();

        ok(!scheduler._editor._timezonePopup.is(":visible"));
    });

    test("Click close reverts timezones to last selected", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        scheduler._editor.container.find(".k-edit-field > a").click();

        var editor = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:first").data("kendoTimezoneEditor");
        editor.value("America/Toronto");

        equal(model.startTimezone, "America/Toronto");

        scheduler._editor._timezonePopup.find(".k-scheduler-canceltimezone").click();

        ok(!model.startTimezone);
    });

    test("Select start timezone enables checkbox", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        scheduler._editor.container.find(".k-edit-field > a").click();

        var editor = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:first").data("kendoTimezoneEditor"),
            checkbox = scheduler._editor._timezonePopup.find("input[type=checkbox]");

        editor.value("America/Toronto");

        ok(!checkbox.prop("disabled"));
    });

    test("Clear start timezone disables checkbox and clears end timezone", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        scheduler._editor.container.find(".k-edit-field > a").click();

        var end = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:last").data("kendoTimezoneEditor");
        var start = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:first").data("kendoTimezoneEditor");
        var checkbox = scheduler._editor._timezonePopup.find("input[type=checkbox]");

        start.value("America/Toronto");

        checkbox.click();
        end.value("America/Toronto");

        start.value("");

        ok(checkbox.prop("disabled"));
        ok(!model.endTimezone);
        ok(!end.wrapper.parent(".k-edit-field").is(":visible"));
    });

    test("Click checkbox toggles endTimezone editor widget", function() {
        var scheduler = setup(),
            model = scheduler.dataSource.data()[0],
            uid = model.uid;

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.editEvent(uid);
        scheduler._editor.container.find(".k-edit-field > a").click();

        var start = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:first").data("kendoTimezoneEditor");
        var editor = scheduler._editor._timezonePopup.find("[data-role=timezoneeditor]:last").data("kendoTimezoneEditor");
            checkbox = scheduler._editor._timezonePopup.find("input[type=checkbox]");

        start.value("America/Toronto");

        checkbox.click();
        editor.value("America/Toronto");

        equal(model.endTimezone, "America/Toronto");

        checkbox.click();

        ok(!editor.wrapper.closest(".k-edit-field").is(":visible"));
        ok(!model.endTimezone);
    });

    test("addEvent converts start/end event date UTC to startTimezone: Americ/New_York", function() {
        var scheduler = setup({ timezone: "Etc/UTC" }),
            start = new Date(2013, 10, 10, 10),
            end = new Date(2013, 10, 10, 11),
            zone = "America/New_York";

        scheduler.dataSource.view()[0].isAllDay = false;

        scheduler.addEvent({ start: start, end: end, startTimezone: zone });

        var model = scheduler.dataSource.data()[1];

        deepEqual(model.start, start);
        deepEqual(model.end, end);
    });

    test("editEvent converts start/end event date UTC to endTimezone: Americ/New_York", function() {
        var start = new Date(2013, 10, 10, 10),
            end = new Date(2013, 10, 10, 11),
            zone = "America/New_York";


        var scheduler = setup({
            dataSource: {
                data: [
                    { start: new Date(), end: new Date(), isAllDay: false, title: "my event" },
                    {
                        start: new Date(start),
                        end: new Date(end),
                        startTimezone: zone,
                        title: "my event"
                    }
                ]
            },
            timezone: "Etc/UTC"
        });

        start.setTime(start.getTime() + (start.getTimezoneOffset() * (60 * 1000))); //simulate UTC
        end.setTime(end.getTime() + (end.getTimezoneOffset() * (60 * 1000))); //simulate UTC

        var model = scheduler.dataSource.data()[1];
        scheduler.editEvent(model.uid);

        deepEqual(model.start, timezone.convert(start, "Etc/UTC", zone));
        deepEqual(model.end, timezone.convert(end, "Etc/UTC", zone));
    });

    test("edit occurrence converts date from timezone to  startTimezone/endTimezone", function() {
        var start = new Date(2013, 10, 10, 12);
        var end = new Date(2013, 10, 10, 14);
        var startTimezone = "Europe/Berlin";
        var endTimezone = "Asia/Beirut";

        var scheduler = setup({
            date: new Date(start),
            dataSource: {
                data: [ {
                    id:1,
                    recurrenceRule: "FREQ=DAILY;COUNT=2;",
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                } ]
            },
            timezone: "Etc/UTC"
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrence = scheduler.occurrenceByUid(uid);

        scheduler.editEvent(uid);
        $(".k-popup-edit-form").find(".k-button:first").click();

        deepEqual(occurrence.start, kendo.timezone.apply(start, startTimezone));
        deepEqual(occurrence.end, kendo.timezone.apply(end, endTimezone));
    });

    test("edit occurrence converts head start/end date from timezone to  startTimezone/endTimezone", function() {
        var start = new Date(2013, 10, 10, 12);
        var end = new Date(2013, 10, 10, 14);
        var startTimezone = "Europe/Berlin";
        var endTimezone = "Asia/Beirut";

        var scheduler = setup({
            date: new Date(start),
            dataSource: {
                data: [ {
                    id:1,
                    recurrenceRule: "FREQ=DAILY;COUNT=2;",
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                } ]
            },
            timezone: "Etc/UTC"
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var head = scheduler.dataSource.data()[0];

        scheduler.editEvent(uid);
        $(".k-popup-edit-form").find(".k-button:first").click();

        deepEqual(head.start, kendo.timezone.apply(start, startTimezone));
        deepEqual(head.end, kendo.timezone.apply(end, endTimezone));
    });

    test("edit occurrence converts back head and occurrence on cancel", function() {
        var start = new Date(2013, 10, 10, 12);
        var end = new Date(2013, 10, 10, 14);
        var startTimezone = "Europe/Berlin";
        var endTimezone = "Asia/Beirut";

        var scheduler = setup({
            date: new Date(start),
            dataSource: {
                data: [ {
                    id:1,
                    recurrenceRule: "FREQ=DAILY;COUNT=2;",
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                } ]
            },
            timezone: "Etc/UTC"
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrenceStart = new Date(scheduler.occurrenceByUid(uid).start);
        var headStart = new Date(scheduler.dataSource.data()[0].start);

        scheduler.editEvent(uid);
        $(".k-popup-edit-form").find(".k-button:first").click();
        $(".k-popup-edit-form").find(".k-scheduler-cancel").click();

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrence = scheduler.occurrenceByUid(uid);
        var head = scheduler.dataSource.data()[0];

        deepEqual(occurrence.start, occurrenceStart);
        deepEqual(head.start, headStart);
    });

    test("save an exception honors start/end timezone", function() {
        var start = new Date(2013, 10, 10, 12);
        var end = new Date(2013, 10, 10, 14);
        var startTimezone = "Europe/Berlin";
        var endTimezone = "Asia/Beirut";

        var scheduler = setup({
            date: new Date(start),
            dataSource: {
                data: [ {
                    id:1,
                    recurrenceRule: "FREQ=DAILY;COUNT=2;",
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                } ]
            },
            timezone: "Etc/UTC"
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrenceStart = new Date(scheduler.occurrenceByUid(uid).start);
        var headStart = new Date(scheduler.dataSource.data()[0].start);

        scheduler.editEvent(uid);
        $(".k-popup-edit-form").find(".k-button:first").click();
        $(".k-popup-edit-form").find(".k-scheduler-update").click();

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrence = scheduler.occurrenceByUid(uid);
        var head = scheduler.dataSource.data()[0];

        deepEqual(occurrence.start, occurrenceStart);
        deepEqual(head.start, headStart);
    });

    test("save a recurring head honors start/end timezone", function() {
        var start = new Date(2013, 10, 10, 12);
        var end = new Date(2013, 10, 10, 14);
        var startTimezone = "Europe/Berlin";
        var endTimezone = "Asia/Beirut";

        var scheduler = setup({
            date: new Date(start),
            dataSource: {
                data: [ {
                    id:1,
                    recurrenceRule: "FREQ=DAILY;COUNT=2;",
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                }, {
                    id:2,
                    recurrenceId: 1,
                    start: new Date(start),
                    end: new Date(end),
                    startTimezone: startTimezone,
                    endTimezone: endTimezone,
                    title: "my event"
                } ]
            },
            timezone: "Etc/UTC"
        });

        var uid = scheduler.wrapper.find(".k-event:last").data("uid");
        var occurrenceStart = new Date(scheduler.occurrenceByUid(uid).start);
        var headStart = new Date(scheduler.dataSource.data()[0].start);

        scheduler.editEvent(uid);
        $(".k-popup-edit-form").find(".k-button:last").click();
        $(".k-popup-edit-form").find(".k-scheduler-update").click();

        var uid = scheduler.wrapper.find(".k-event:first").data("uid");
        var occurrence = scheduler.occurrenceByUid(uid);
        var head = scheduler.dataSource.data()[0];

        deepEqual(occurrence.start, occurrenceStart);
        deepEqual(head.start, headStart);
    });

    test("saveEvent reverts applied StartTimezone if no changes have been made", function() {
        var start = new Date(2013, 10, 10, 10),
            end = new Date(2013, 10, 10, 11),
            zone = "America/New_York";

        var scheduler = setup({
            dataSource: {
                data: [
                    { start: new Date(), end: new Date(), isAllDay: false, title: "my event" },
                    {
                        start: new Date(start),
                        end: new Date(end),
                        startTimezone: zone,
                        title: "my event"
                    }
                ]
            },
            timezone: "Etc/UTC"
        });

        start.setTime(start.getTime() + (start.getTimezoneOffset() * (60 * 1000))); //simulate UTC
        end.setTime(end.getTime() + (end.getTimezoneOffset() * (60 * 1000))); //simulate UTC

        var model = scheduler.dataSource.data()[1];
        scheduler.editEvent(model.uid);
        scheduler.saveEvent();

        deepEqual(model.start, start);
        deepEqual(model.end, end);
    });

    test("saveEvent does not revert applied Start/EndTimezone if start/end was edited", function() {
        var start = new Date(2013, 10, 10, 10),
            end = new Date(2013, 10, 10, 11),
            zone = "America/New_York";

        var scheduler = setup({
            dataSource: {
                data: [
                    { start: new Date(), end: new Date(), isAllDay: false, title: "my event" },
                    {
                        start: new Date(start),
                        end: new Date(end),
                        startTimezone: zone,
                        title: "my event"
                    }
                ]
            },
            timezone: "Etc/UTC"
        });

        start.setTime(start.getTime() + (start.getTimezoneOffset() * (60 * 1000))); //simulate UTC
        end.setTime(end.getTime() + (end.getTimezoneOffset() * (60 * 1000))); //simulate UTC

        var model = scheduler.dataSource.data()[1];
        scheduler.editEvent(model.uid);


        start.setHours(start.getHours() - 2);
        end.setHours(end.getHours() - 2);

        var datepickers = $(".k-window .k-edit-form-container").find("[data-role=datetimepicker]");

        var startPicker = datepickers.eq(0).data("kendoDateTimePicker");
        var endPicker = datepickers.eq(1).data("kendoDateTimePicker");

        endPicker.value(end);
        endPicker.trigger("change");

        startPicker.value(start);
        startPicker.trigger("change");

        scheduler.saveEvent();

        deepEqual(model.start, timezone.convert(start, zone, "Etc/UTC"));
        deepEqual(model.end, timezone.convert(end, zone, "Etc/UTC"));
    });

    test("updateEvent refreshes the ui", 2, function() {
        var scheduler = setup({
            dataSource: {
                data: [
                    new kendo.data.SchedulerEvent({ start: new Date(), end: new Date(), isAllDay: true, title: "my event", id: 0 })
                ]
            },
            dataBound: function() {
                ok(true);
            }
        });

        var event = scheduler.dataSource.at(0);
        scheduler._updateEvent(null, event, {});
    });
})();
