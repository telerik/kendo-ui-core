(function() {
    var div;

    function equalBackgroundColor(element, color) {
        equal($(element)[0].style.backgroundColor, color);
    }

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 3);
    }

    module("scheduler resources", {
        setup: function() {
            kendo.effects.disable();
            div = $("<div>");
        },
        teardown: function() {
            kendo.destroy(div);
            kendo.effects.enable();
        }
    });

    test("scheduler fetches resources", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [
                {
                    field: "category",
                    dataSource: [
                        { text: "foo", value: 1 }
                    ]
                }
            ]
        });

        equal(scheduler.resources[0].dataSource.data()[0].text, "foo");
    });

    asyncTest("scheduler binds when resources and events are loaded", 2, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            dataSource:  {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([
                                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:00"), title: "foo" }
                            ]);
                        }, 1);
                    }
                }
            },
            resources: [
                {
                    field: "category",
                    dataSource: {
                        transport: {
                            read: function(options) {
                                setTimeout(function() {
                                    options.success([
                                        { text: "foo", value: 1 }
                                    ]);
                                }, 1);
                            }
                        }
                    }
                }
            ],

            dataBound: function() {
                start();
                equal(this.resources[0].dataSource.data()[0].text, "foo");
                equal(this.dataSource.data()[0].title, "foo");
            }
        });
    });

    test("scheduler throws error if the field option is not specified", 1, function() {
        try {
            var scheduler = new kendo.ui.Scheduler(div, {
                resources: [ {} ]
            });
        } catch(e) {
            equal(e.toString(), 'Error: The "field" and "dataSource" options of the scheduler resource are mandatory.')
        }
    });

    test("scheduler throws error if the dataSource option is not specified", 1, function() {
        try {
            var scheduler = new kendo.ui.Scheduler(div, {
                resources: [ { field: "" } ]
            });
        } catch(e) {
            equal(e.toString(), 'Error: The "field" and "dataSource" options of the scheduler resource are mandatory.')
        }
    });

    test('dataTextField is "text" by default', function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [] } ]
        });

        equal(scheduler.resources[0].dataTextField, "text");
    });

    test("specify custom dataTextField via the resource options", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [], dataTextField: "bar" } ]
        });

        equal(scheduler.resources[0].dataTextField, "bar");
    });

    test('dataValueField is "value" by default', function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [] } ]
        });

        equal(scheduler.resources[0].dataValueField, "value");
    });

    test("specify custom dataValueField via the resource options", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [], dataValueField: "bar" } ]
        });

        equal(scheduler.resources[0].dataValueField, "bar");
    });

    test('dataColorField is "color" by default', function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [] } ]
        });

        equal(scheduler.resources[0].dataColorField, "color");
    });

    test("specify custom dataColorField via the resource options", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            resources: [ { field: "foo", dataSource: [], dataColorField: "bar" } ]
        });

        equal(scheduler.resources[0].dataColorField, "bar");
    });

    test("resource color is applied as the background of the event in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "day" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "green");
        equalBackgroundColor(events.eq(1), "red");
    });

    test("resource color is applied as the background of the event in day view when using valuePrimitive is false", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ],
                    valuePrimitive: false
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: { value: 2 }},
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: { value: 1 }}
            ],
            views: [ "day" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "green");
        equalBackgroundColor(events.eq(1), "red");
    });

    test("k-event-inverse class is correctly added to the event when the resource color match scheduler text color in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "day" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), true);
        equal(events.eq(0).hasClass("k-event-inverse"), false);
    });

    test("k-event-inverse class is correctly added to the event and aware of current widget text color in day view", function() {
        div.css("color", "white");
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "day" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), false);
        equal(events.eq(0).hasClass("k-event-inverse"), true);

        div.css("color", "");
    });

    test("resource color is applied as the background of the event in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "week" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "green");
        equalBackgroundColor(events.eq(1), "red");
    });

    test("eventResources method returns items with field, name and title fields", function() {
        var resourcesInEventTemplate = [];

        eventTemplate = function(resources) {
            resourcesInEventTemplate = resources;
            return "";
        };

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            eventTemplate: "#=eventTemplate(data.resources)#",
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "text11", value: 1, color: "red" },
                        { text: "text12", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    multiple: true,
                    dataSource: [
                        { text: "text21", value: 1, color: "red" },
                        { text: "text22", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2, bar: [1,2]},
            ],
            views: [ "week" ]
        });

        equal(resourcesInEventTemplate[0].field == "foo", true);
        equal(resourcesInEventTemplate[0].title == "foo", true);
        equal(resourcesInEventTemplate[0].name == "foo", true);
    });

    test("background is not changed if the event doesn't have a resource in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "" }
            ],
            views: [ "week" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "");
    });

    test("k-event-inverse class is correctly added to the event when the resource color match scheduler text color in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "week" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), true);
        equal(events.eq(0).hasClass("k-event-inverse"), false);
    });

    test("k-event-inverse class is correctly added to the event and aware of current widget text color in week view", function() {
        div.css("color", "white");
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "week" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), false);
        equal(events.eq(0).hasClass("k-event-inverse"), true);

        div.css("color", "");
    });

    test("multiple resources are passed to template", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ],
                    multiple: true
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "", foo: [2, 1] }
            ],
            views: [{
                type: "agenda",
                eventTemplate: function(data) {
                    equal(data.resources.length, 2);

                    equal(data.resources[0].value, 2);
                    equal(data.resources[1].value, 1);
                }
            }]
        });
    });

    test("scheduler creates a dropdownlist in the popup form for resources", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date(), end: new Date(), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var dropdownlist = scheduler._editor.container.find("select[data-role=dropdownlist]");

        equal(dropdownlist.attr("data-bind"), "value:foo");
        equal(dropdownlist.children().eq(0).text(), "None");
        equal(dropdownlist.children().eq(1).text(), "Foo 1");
        equal(dropdownlist.children().eq(2).text(), "Foo 2");
    });

    test("scheduler creates a multiselect in the popup form for resources which allow multiple values", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var multiselect = scheduler._editor.container.find("select[data-role=multiselect]").data("kendoMultiSelect");

        equal($(multiselect.items()[0]).text(), "Foo 1");
        equal($(multiselect.items()[1]).text(), "Foo 2");
    });

    test("validation rules for dropdownlist resource editor", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: {
                data: [{ start: new Date(), end: new Date(), isAllDay: true, title: "", description: "", foo: [] }],
                schema: {
                    model: {
                        fields: {
                            foo: { validation: { required: true} }
                        }
                    }
                }
            },
            views: ["day"]
        });

        var eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        equal(scheduler._editor.container.find("[data-bind='value:foo']").attr("required"), "required");
        ok(scheduler._editor.container.find(".k-scheduler-update").length);
    });

    test("validation rules for multiselect resource editor", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: {
                data: [{ start: new Date(), end: new Date(), isAllDay: true, title: "", description: "" }],
                schema: {
                    model: {
                        fields: {
                            foo: { validation: { required: true} }
                        }
                    }
                }
            },
            views: ["day"]
        });

        var eventElement = scheduler.dataSource.at(0).uid;

        scheduler.editEvent(eventElement);

        scheduler.saveEvent();

        equal(scheduler._editor.container.find("[data-bind='value:foo']").attr("required"), "required");
        ok(scheduler._editor.container.find(".k-scheduler-update").length);
    });

    test("the dropdownlist items have the color of the event", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var dropdownlist = scheduler._editor.container.find("select[data-role=dropdownlist]").data("kendoDropDownList");

        var marks = dropdownlist.list.find(".k-scheduler-mark");
        equal(marks.eq(1)[0].style.backgroundColor, "red");
        equal(marks.eq(2)[0].style.backgroundColor, "green");
    });

    test("the multiselect items have the color of the event", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var multiselect = scheduler._editor.container.find("select[data-role=multiselect]").data("kendoMultiSelect");

        var marks = multiselect.list.find(".k-scheduler-mark");
        equal(marks.eq(0)[0].style.backgroundColor, "red");
        equal(marks.eq(1)[0].style.backgroundColor, "green");
    });

    test("selecting a value from the resource dropdownlist sets the resource field of the event", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var dropdownlist = scheduler._editor.container.find("select[data-role=dropdownlist]").data("kendoDropDownList");

        dropdownlist.value(2);
        dropdownlist.trigger("change");

        equal(scheduler.dataSource.at(0).foo, 2);
    });

    test("selecting a value from the resource multiselect sets the resource field of the event", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: ""
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var multiselect = scheduler._editor.container.find("select[data-role=multiselect]").data("kendoMultiSelect");

        multiselect.value(2);
        multiselect.trigger("change");

        equal(scheduler.dataSource.at(0).foo[0], 2);
    });

    test("the current resource is selected in the dropdownlist", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "",
            foo: {  value: 2 }
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var dropdownlist = scheduler._editor.container.find("select[data-role=dropdownlist]").data("kendoDropDownList");

        equal(dropdownlist.value(), 2);
    });

    test("the current resource is selected in the multiselect", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "",
            foo: [{  value: 2 }]
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var multiselect = scheduler._editor.container.find("select[data-role=multiselect]").data("kendoMultiSelect");

        equal(multiselect.value(), 2);
    });

    test("selecting an item from the multiselect adds a resource item to the current resources array of the event", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "",
            foo: [ 2 ]
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var multiselect = scheduler._editor.container.find("select[data-role=multiselect]").data("kendoMultiSelect");

        multiselect.value([2, 1]);
        multiselect.trigger("change");

        equal(scheduler.dataSource.at(0).foo[0], 2);
        equal(scheduler.dataSource.at(0).foo[1], 1);
    });

    test("selecting the option label sets the resource field of the event to null", function() {
        var event = new kendo.data.SchedulerEvent({
            start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "",
            foo: {  value: 2 }
        });

        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ event ],
            views: ["day"]
        });

        scheduler.editEvent(scheduler.dataSource.at(0).uid);

        var dropdownlist = scheduler._editor.container.find("select[data-role=dropdownlist]").data("kendoDropDownList");

        dropdownlist.value("");
        dropdownlist.trigger("change");

        equal(scheduler.dataSource.at(0).foo, null);
    });

    test("headers are rendered for groups in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
        var headerRows = view.datesHeader.find("tr");

        equal(headerRows.length, 3);
        equal(headerRows.eq(0).find("th").length, 2);
        equal(headerRows.eq(1).find("th").length, 2);
        equal(headerRows.eq(2).find("td").length, 2);
    });

    test("headers are rendered for multi level groups in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName1", "ResourceName2" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
        var headerRows = view.datesHeader.find("tr");

        equal(headerRows.length, 4);
        equal(headerRows.eq(0).find("th").length, 2);
        equal(headerRows.eq(1).find("th").length, 6);
        equal(headerRows.eq(2).find("th").length, 6);
        equal(headerRows.eq(3).find("td").length, 6);
    });

    test("header text is encoded", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName1" ]
            },
            resources: [
                {
                    field: "bar",
                    name: "ResourceName1",
                    dataSource: [
                        { text: "<script>alert(1)<\/script>", value: 1, color: "red" }
                    ]
                }
            ],
            dataSource: [],
            views: ["day"]
        });

        var view = scheduler.view();
        var headerRows = view.datesHeader.find("tr");

        equal(headerRows.eq(0).find("th").text(), "<script>alert(1)<\/script>");
    });

    test("row headers are rendered for groups in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            allDaySlot: false,
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
        equal(view.times.find("tr:first th:first").attr("rowspan"), 48);
        equal(view.times.find("tr:eq(48) th:first").attr("rowspan"), 48);
    });

    test("resource color is applied as the background of the event in agenda view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:30"), title: "", foo: 1 }
            ],
            views: [ "agenda" ]
        });

        var marks = scheduler.element.find(".k-scheduler-mark");

        equalBackgroundColor(marks.eq(0), "green");
        equalBackgroundColor(marks.eq(1), "red");
    });

    test("the first resource color is used when multiple resources are present", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ],
                    multiple: true
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 11:00"), title: "", foo: [2, 1] }
            ],
            views: ["agenda"]
        });

        var marks = scheduler.element.find(".k-scheduler-mark");

        equalBackgroundColor(marks.eq(0), "green");
    });

    test("events are position in the correct group in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 12:00"), title:"foo", foo: 2 } ],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.content.find(".k-event").length, 1);
        equal(view.groups[1].getTimeSlotCollection(0).events().length, 1);
    });

    test("events are position in the correct group in day view in vertical orientation", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 12:00"), title:"foo", foo: 2 },
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 12:00"), title:"foo", foo: 1 }
            ],
            views: ["day"]
        });

        var view = scheduler.view();
        equal(view.content.find(".k-event").length, 2);
        equal(view.groups[0].getTimeSlotCollection(0).events().length, 1);
        equal(view.groups[1].getTimeSlotCollection(0).events().length, 1);
    });

    test("multi day events are position in the correct group in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/8 12:00"), isAllDay: true, title:"foo", foo: 1 }
            ],
            views: ["day"]
        });

        var view = scheduler.view();
        var event = view.groups[0].getDaySlotCollection(0).events()[0];
        equal(view.datesHeader.find(".k-event").length, 1);
        equal(view.groups[0].getDaySlotCollection(0).events().length, 1);
        equal(event.start, 0);
        equal(event.end, 0);
    });

    test("multiple copies of the event are position in the correct group in day view when multiple resources matched", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName", "ResourceName2" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 12:00"), title:"foo", foo: 2, bar: [1, 2] } ],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.content.find(".k-event").length, 2);

        var event = view.groups[0].getTimeSlotCollection(0).events()[0];

        equal(view.groups[2].getTimeSlotCollection(0).events().length, 1);
        equal(view.groups[3].getTimeSlotCollection(0).events().length, 1);
    });

    test("all day slot is rendered for each resource group when orientation is vertical in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.content.find(".k-scheduler-header-all-day").length, 2);
        equal(view.content.find(".k-scheduler-header-all-day td").length, 2); // the sum of the both header row cells
    });

    test("all day slot template is rendered for each resource group when orientation is horizontal in day view", 2, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            allDaySlotTemplate: function(data) { deepEqual(data.date,new Date("2013/6/6")) },
            group: {
                resources: [ "ResourceName"],
                orientation: "horizontal"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
    });

    test("all day slot template is rendered for each resource group when orientation is vertical in day view", 2, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            allDaySlotTemplate: function(data) { deepEqual(data.date,new Date("2013/6/6")) },
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
    });

    test("all day slots are not rendered for each resource group when orientation is vertical in day view if disabled", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            allDaySlot: false,
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        ok(!view.content.find(".k-scheduler-header-all-day").length);
    });

    test("all day events are added in the content when vertical grouping is applyed", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), isAllDay: true, title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.content.find(".k-event").length, 1);
    });

    test("all day events are added in allday slot when horizontal grouping is applyed", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), isAllDay: true, title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(0).events().length, 1);
    });

    test("all day events are added in the correct group allday slot when vertical grouping is applyed", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), isAllDay: true, title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(0).events().length, 1);
    });

    test("last slot in the group has correct date when groupped vertically", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date(2013, 1,1, 11,0,0),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        var slot = view.groups[0].getTimeSlotCollection(0).last();
        deepEqual(slot.startDate(), new Date("2013/6/6 23:30"));
        deepEqual(slot.endDate(), new Date("2013/6/7 00:00"));
    });

    test("group index is set to the row slot with horizontal grouping in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();
        var slots = view.groups[0].getDaySlotCollection(0);

        equal(slots.first().groupIndex, 0);
        equal(slots.last().groupIndex, 0);

        slots = view.groups[1].getDaySlotCollection(0);

        equal(slots.first().groupIndex, 1);
        equal(slots.last().groupIndex, 1);

        slots = view.groups[2].getDaySlotCollection(0);
        equal(slots.first().groupIndex, 2);
        equal(slots.last().groupIndex, 2);
    });

    test("group index is set to the row slot with vertical grouping in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });


        var view = scheduler.view();
        var slots = view.groups[0].getDaySlotCollection(0);
        equal(slots.first().groupIndex, 0);
        equal(slots.last().groupIndex, 0);

        slots = view.groups[1].getDaySlotCollection(0);
        equal(slots.first().groupIndex, 1);
        equal(slots.last().groupIndex, 1);
    });


    test("group index is set to the slot with horizontal grouping in week view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();

        var view = scheduler.view();
        var slots = view.groups[0].getTimeSlotCollection(0);

        equal(slots.first().groupIndex, 0);
        equal(slots.last().groupIndex, 0);

        slots = view.groups[1].getTimeSlotCollection(0);

        equal(slots.first().groupIndex, 1);
        equal(slots.last().groupIndex, 1);

        slots = view.groups[2].getTimeSlotCollection(0);

        equal(slots.first().groupIndex, 2);
        equal(slots.last().groupIndex, 2);

        slots = view.groups[3].getTimeSlotCollection(0);

        equal(slots.first().groupIndex, 3);
        equal(slots.last().groupIndex, 3);
    });

    test("headers are rendered for groups in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();
        equal(view.datesHeader.find("tr").length, 2);
        equal(view.datesHeader.find("tr:first th").length, 2);
        equal(view.datesHeader.find("tr:last th").length, 14);
    });

    test("individual calenders are rendered for each groups in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.content.find("td").length, 42 * 2);
    });

    test("additional cell are rendered in the times section for each calendar row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.times.find("th.k-hidden").length, 6*2);
    });

    test("grouping day view on a string value", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: "foo1", color: "red" },
                        { text: "Foo 2", value: "foo2", color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:00"), title: "foo", foo: "foo1" }
            ],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(div.find(".k-event").length, 1);
    });

    test("grouping month view on a string value", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: "foo1", color: "red" },
                        { text: "Foo 2", value: "foo2", color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:00"), title: "foo", foo: "foo1" }
            ],
            views: ["day"]
        });

        var view = scheduler.view();

        equal(div.find(".k-event").length, 1);
    });

    module("scheduler resources live dom", {
        setup: function() {
            kendo.effects.disable();

            div = $('<div style="width:500px;height:1000px">');
            div.appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(div);
            kendo.effects.enable();
        }
    });

    test("resource color is applied as the background of the event in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "", foo: 2 },
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "", foo: 1 }
            ],
            views: [ "month" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "green");
        equalBackgroundColor(events.eq(1), "red");
    });

    test("background is not changed if the event doesn't have a resource in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "red" },
                        { text: "", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:30"), title: "" }
            ],
            views: [ "month" ]
        });

        var events = scheduler.element.find(".k-event");

        equalBackgroundColor(events.eq(0), "");
    });

    test("k-event-inverse class is correctly added to the event when the resource color match scheduler text color in month view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "month" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), true);
        equal(events.eq(0).hasClass("k-event-inverse"), false);
    });

    test("k-event-inverse class is correctly added to the event and aware of current widget text color in month view", function() {
        div.css("color", "white");
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            resources: [
                {
                    field: "foo",
                    dataSource: [
                        { text: "", value: 1, color: "black" },
                        { text: "", value: 2, color: "white" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:30"), end: new Date("2013/6/6 11:33"), title: "", foo: 2 },
                { start: new Date("2013/6/6 11:00"), end: new Date("2013/6/6 11:33"), title: "", foo: 1 }
            ],
            views: [ "month" ]
        });

        var events = scheduler.element.find(".k-event");

        equal(events.eq(1).hasClass("k-event-inverse"), false);
        equal(events.eq(0).hasClass("k-event-inverse"), true);

        div.css("color", "");
    });

    test("event pass the endTime in vertical resource grouping", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            endTime: new Date("2013/6/6 14:00"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [
                { start: new Date("2013/6/6 10:00"), end: new Date("2013/6/6 16:00"), title:"foo", foo: 1 }
            ],
            views: ["day"]
        });

        var view = scheduler.view();
        var event = div.find(".k-event");
        var slots = div.find(".k-scheduler-content td");

        equalWithRound(event.offset().top, slots.eq(21).offset().top);
        equalWithRound(event.offset().top + event.outerHeight(), slots.eq(28).offset().top + slots.eq(28).outerHeight());
    });

    test("double clicking a day view cell triggers add event with grouping", 2, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));
        });

        var cell = view.content.find("tr:eq(4) td:eq(1)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("all day slots are skipped during event time slot calculation with vertical orientation in day view", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 9:00:00"),
            endTime: new Date("2013/6/6 14:00:00"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        var slotEvents = view.groups[1].getTimeSlotCollection(0).events();

        equal(slotEvents.length, 1);

        var slots = div.find(".k-scheduler-content td");
        var event = div.find(".k-event");

        equalWithRound(event.offset().top, slots.eq(14).offset().top);
        equalWithRound(event.offset().top + event.outerHeight(), slots.eq(15).offset().top + slots.eq(15).outerHeight());
    });

    test("double clicking the first all day slot triggers add event in day view with vertical orientation", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function() {
            ok(true);
        });

        var cell = view.content.find(".k-scheduler-header-all-day:first td");

        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking the all day slot triggers add event in day view with vertical orientation", 1, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function() {
            ok(true);
        });

        var cell = view.content.find(".k-scheduler-header-all-day:eq(1) td");

        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("slots offsetTop is updated when all day event is inserted when vertical grouping is applyed", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
        var slots = view.groups[0].getTimeSlotCollection(0);

        var initialHeight = view._allDayHeaderHeight;
        var firstSlotTop = slots.first().offsetTop;
        var lastSlotTop = slots.last().offsetTop;

        scheduler.dataSource.add({ start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), isAllDay: true, title: "", foo: 1 });

        var offset = view.element.find(".k-scheduler-header-all-day").first()[0].clientHeight - initialHeight;

        slots = view.groups[0].getTimeSlotCollection(0);

        equalWithRound(slots.first().offsetTop, firstSlotTop + offset);
        equalWithRound(slots.last().offsetTop, lastSlotTop + offset);
    });

    test("slotByPosition returns correct date for slot for the last group with vertical orientation", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();
        var slot = view.content.find("td:last");

        var info = view._slotByPosition(slot.offset().left, slot.offset().top);

        deepEqual(info.startDate(), new Date("2013/6/6 11:30 PM"));
        deepEqual(info.endDate(), new Date("2013/6/7 00:00 AM"));
    });

    test("events are repositioned after all day slot is resized when vertically grouped", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6 10:00 AM"), end: new Date("2013/6/6 11:00 AM"), title: "", foo: 2 }],
            views: ["day"]
        });

        var view = scheduler.view();

        var eventInitialTop = view.content.find(".k-event")[0].offsetTop;

        var initialHeight = view._allDayHeaderHeight;

        scheduler.dataSource.add({ start: new Date("2013/6/6 00:00"), end: new Date("2013/6/6 00:00"), isAllDay: true, title: "", foo: 1 });

        var offset = view.element.find(".k-scheduler-header-all-day").first()[0].clientHeight - initialHeight;

        equalWithRound(view.content.find(".k-event:last")[0].offsetTop, eventInitialTop + offset * 2);
    });

    test("double clicking a day view cell triggers add event with resources information with horizontal single grouping", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));

            equal(event.foo, 2);
        });

        var cell = view.content.find("tr:eq(4) td:eq(1)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a day view cell triggers add event with resources information with horizontal multiple grouping", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));

            equal(event.foo, 1);
            equal(event.bar, 2);
        });

        var cell = view.content.find("tr:eq(4) td:eq(1)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a week view cell triggers add event with resources information with horizontal multiple grouping", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 2:00"),
            endTime: new Date("2013/6/6 3:00"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));

            equal(event.foo, 2);
            equal(event.bar, 2);
        });

        var cell = view.content.find("tr:eq(0) td:eq(25)");
        var offset = cell.offset();
        cell.trigger({ type: "dblclick", pageX: offset.left, pageY: offset.top });
    });

    test("double clicking a week view cell get correct resources information with horizontal multiple grouping if resources are sorted", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 2:00"),
            endTime: new Date("2013/6/6 3:00"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: {
                        sort: { field: "text", dir: "desc" },
                        data: [
                            { text: "Foo 1", value: 1, color: "red" },
                            { text: "Foo 2", value: 2, color: "green" }
                        ]
                    }
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));

            equal(event.foo, 1);
            equal(event.bar, 2);
        });

        var cell = view.content.find("tr:eq(0) td:eq(25)");
        var offset = cell.offset();
        cell.trigger({ type: "dblclick", pageX: offset.left, pageY: offset.top });
    });

    test("double clicking a week view cell triggers add event with resources information and horizontal multiple grouping - resource set as multiple", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 2:00"),
            endTime: new Date("2013/6/6 3:00"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    multiple: true,
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 2, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 2, 30, 0));

            equal(event.foo, 2);
            equal(event.bar[0], 2);
        });

        var cell = view.content.find("tr:eq(0) td:eq(25)");
        var offset = cell.offset();
        cell.trigger({ type: "dblclick", pageX: offset.left, pageY: offset.top });
    });

    test("double clicking a week view all day cell triggers add event with resources information with horizontal multiple grouping", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 2:00"),
            endTime: new Date("2013/6/6 3:00"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["week"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 0, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 0, 0, 0));

            equal(event.foo, 2);
            equal(event.bar, 2);
        });

        var cell = view.datesHeader.find(".k-scheduler-header-all-day td:eq(25)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a day view all day cell triggers add event with resources information with vertical multiple grouping", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ ],
            views: ["day"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date(2013, 5, 6, 0, 0, 0));
            deepEqual(event.end, new Date(2013, 5, 6, 0, 0, 0));

            equal(event.foo, 2);
            equal(event.bar, 1);
        });
        var cell = view.content.find(".k-scheduler-header-all-day:eq(2) td:first");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("event in the last slot is correctly positioned when grouped vertically", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 11:00 PM"),
            group: {
                resources: ["ResourceName", "ResourceName2"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ { start: new Date("2013/6/6 23:30"), end: new Date("2013/6/7 00:00"), title: "foo", foo: 1, bar: 2 } ],
            views: ["day"]
        });

        var slots = div.find(".k-scheduler-content td");
        var event = div.find(".k-event");

        equalWithRound(event.offset().top, slots.eq(5).offset().top);
        equalWithRound(event.offset().top + event.outerHeight(), slots.eq(5).offset().top + slots.eq(5).outerHeight());
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the first group first row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/30"), end: new Date("2013/5/30"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[0].getDaySlotCollection(0).events().length, 1);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].start, 4);
        equal(view.groups[0].getDaySlotCollection(0).events()[0].end, 4);
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the first group second row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[0].getDaySlotCollection(1).events().length, 1);
        equal(view.groups[0].getDaySlotCollection(1).events()[0].start, 4);
        equal(view.groups[0].getDaySlotCollection(1).events()[0].end, 4);
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the first group third row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/13"), end: new Date("2013/6/13"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[0].getDaySlotCollection(2).events().length, 1);
        equal(view.groups[0].getDaySlotCollection(2).events()[0].start, 4);
        equal(view.groups[0].getDaySlotCollection(2).events()[0].end, 4);
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the first group last row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/7/4"), end: new Date("2013/7/4"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[0].getDaySlotCollection(5).events().length, 1);
        equal(view.groups[0].getDaySlotCollection(5).events()[0].start, 4);
        equal(view.groups[0].getDaySlotCollection(5).events()[0].end, 4);
    });

    test("event is position based on the group in horizontally oriented group month view - event in the second group first row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/30"), end: new Date("2013/5/30"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(0).events().length, 1);
        equal(view.groups[1].getDaySlotCollection(0).events()[0].start, 4);
        equal(view.groups[1].getDaySlotCollection(0).events()[0].end, 4);
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the second group second row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(1).events().length, 1);
        equal(view.groups[1].getDaySlotCollection(1).events()[0].start, 4);
        equal(view.groups[1].getDaySlotCollection(1).events()[0].end, 4);
    });

    test("event is positioned based on the group in horizontally oriented group month view - event in the second group third row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/13"), end: new Date("2013/6/13"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(2).events().length, 1);
        equal(view.groups[1].getDaySlotCollection(2).events()[0].start, 4);
        equal(view.groups[1].getDaySlotCollection(2).events()[0].end, 4);
    });

    test("event is position based on the group in horizontally oriented group month view - event in the second group last row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/7/4"), end: new Date("2013/7/4"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        equal(view.groups[1].getDaySlotCollection(5).events().length, 1);
        equal(view.groups[1].getDaySlotCollection(5).events()[0].start, 4);
        equal(view.groups[1].getDaySlotCollection(5).events()[0].end, 4);
    });

    test("event passing the end of the month is position based on the group in horizontally oriented group month view - event in the second group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/1"), end: new Date("2013/7/13"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(5).events();
        equal(events[events.length - 1].start, 0);
        equal(events[events.length - 1].end, 6);
    });

    test("event starting before the month start is position based on the group in horizontally oriented group month view - event in the second group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/1"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(0).events();
        equal(events[0].start, 0);
        equal(events[0].end, 6);

        events = view.groups[1].getDaySlotCollection(1).events();
        equal(events[0].start, 0);
        equal(events[0].end, 4);
    });

    test("event starting before the month start is position based on the group in horizontally oriented group month view - event in the first group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/1"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(0).events();
        equal(events[0].start, 0);
        equal(events[0].end, 6);

        events = view.groups[0].getDaySlotCollection(1).events();
        equal(events[0].start, 0);
        equal(events[0].end, 4);
    });

    test("event passing the end of the month is position based on the group in horizontally oriented group month view - event in the first group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/1"), end: new Date("2013/7/13"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(5).events();
        equal(events[events.length - 1].start, 0);
        equal(events[events.length - 1].end, 6);
    });

    test("event is positioned based on the group in horizontally oriented multiple group month view - event in the second group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName", "ResourceName2" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 2, bar: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[3].getDaySlotCollection(1).events();
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is position based on the group in horizontally oriented multiple group month view - event in the first group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName", "ResourceName2" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 1, bar: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(1).events();
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event passing the end of the month is position based on the group in horizontally oriented multiple group month view - event in the first group", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName", "ResourceName2" ]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }

            ],
            dataSource: [ { start: new Date("2013/6/1"), end: new Date("2013/7/13"), isAllDay: true, title: "", foo: 1, bar: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(3).events();
        equal(events[0].start, 0);
        equal(events[0].end, 6);
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - first row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(4)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - second row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/6"));
            deepEqual(event.end, new Date("2013/6/6"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(18)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - third row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/13"));
            deepEqual(event.end, new Date("2013/6/13"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(32)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - last row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/7/4"));
            deepEqual(event.end, new Date("2013/7/4"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(74)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - first row second group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(11)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - second row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/6"));
            deepEqual(event.end, new Date("2013/6/6"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(25)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - third row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/13"));
            deepEqual(event.end, new Date("2013/6/13"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(39)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal single grouping - last row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/7/4"));
            deepEqual(event.end, new Date("2013/7/4"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(81)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with horizontal multiple grouping - first row first group", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"]
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 1);
            equal(event.bar, 2);
        });

        var cell = view.content.find("td:eq(11)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("event is positioned based on the group in vertically oriented group month view - event in the first group first row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/30"), end: new Date("2013/5/30"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(0).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is positioned based on the group in vertically oriented group month view - event in the first group second row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(1).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is positioned based on the group in vertically oriented group month view - event in the first group third row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/13"), end: new Date("2013/6/13"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(2).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is positioned based on the group in vertically oriented group month view - event in the first group last row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/7/4"), end: new Date("2013/7/4"), isAllDay: true, title: "", foo: 1 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[0].getDaySlotCollection(5).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is positioned based on the group in vertically oriented group month view - event in the second group first row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/5/30"), end: new Date("2013/5/30"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(0).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is position based on the group in vertically oriented group month view - event in the second group second row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/6"), end: new Date("2013/6/6"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(1).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is position based on the group in vertically oriented group month view - event in the second group third row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/6/13"), end: new Date("2013/6/13"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(2).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("event is position based on the group in vertically oriented group month view - event in the second group last row", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ { start: new Date("2013/7/4"), end: new Date("2013/7/4"), isAllDay: true, title: "", foo: 2 } ],
            views: ["month"]
        });

        var view = scheduler.view();

        var events = view.groups[1].getDaySlotCollection(5).events();
        equal(events.length, 1);
        equal(events[0].start, 4);
        equal(events[0].end, 4);
    });

    test("double clicking a month view slot triggers add event with resources information with vertical single grouping - first row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(4)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - second row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/6"));
            deepEqual(event.end, new Date("2013/6/6"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(11)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - third row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/13"));
            deepEqual(event.end, new Date("2013/6/13"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(18)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - last row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/7/4"));
            deepEqual(event.end, new Date("2013/7/4"));

            equal(event.foo, 1);
        });

        var cell = view.content.find("td:eq(39)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - first row second group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(46)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - second row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/6"));
            deepEqual(event.end, new Date("2013/6/6"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(53)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - third row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/6/13"));
            deepEqual(event.end, new Date("2013/6/13"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(60)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically single grouping - last row first group", 3, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/7/4"));
            deepEqual(event.end, new Date("2013/7/4"));

            equal(event.foo, 2);
        });

        var cell = view.content.find("td:eq(81)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("double clicking a month view slot triggers add event with resources information with vertically multiple grouping - first row first group", 4, function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            group: {
                resources: ["ResourceName", "ResourceName2"],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                },
                {
                    field: "bar",
                    name: "ResourceName2",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" },
                        { text: "Foo 2", value: 2, color: "green" }
                    ]
                }
            ],
            dataSource: [ ],
            views: ["month"]
        });

        var view = scheduler.view();

        view.bind("add", function(e) {
            var event = e.eventInfo;

            deepEqual(event.start, new Date("2013/5/30"));
            deepEqual(event.end, new Date("2013/5/30"));

            equal(event.foo, 1);
            equal(event.bar, 2);
        });

        var cell = view.content.find("td:eq(46)");
        cell.trigger({ type: "dblclick", pageX: cell.offset().left, pageY: cell.offset().top });
    });

    test("events are repositioned in vertically grouped view when all day events are present", function() {
        var scheduler = new kendo.ui.Scheduler(div, {
            date: new Date("2013/6/6"),
            startTime: new Date("2013/6/6 10:00"),
            endTime: new Date("2013/6/6 11:00"),
            group: {
                resources: [ "ResourceName" ],
                orientation: "vertical"
            },
            resources: [
                {
                    field: "foo",
                    name: "ResourceName",
                    dataSource: [
                        { text: "Foo 1", value: 1, color: "red" }
                    ]
                }
            ],
            dataSource: [
                { id: 1, start: new Date("2013/6/2 10:15"), end: new Date("2013/6/2 10:30"), title: "", foo: 1 },
                { id: 2, start: new Date("2013/6/3"), end: new Date("2013/6/3"), isAllDay: true, title: "", foo: 1 }
            ],
            views: ["week"]
        });

        var slots = div.find(".k-scheduler-content td:nth-child(1)");
        var event = div.find(".k-event");

        equalWithRound(event.offset().top, slots.eq(1).offset().top + slots.eq(1).outerHeight() / 2);
    });

})();
