(function() {
    var dom;

    module("MVVM", {
        setup: function() {
        },
        teardown: function() {
            kendo.destroy(dom);
        }
    });

    test("initializes a scheduler when data role is scheduler", function() {
        dom = $('<div data-role="scheduler"/>');

        kendo.bind(dom);

        ok(dom.data("kendoScheduler") instanceof kendo.ui.Scheduler);
    });

    test("initalizes data source", function() {
        dom = $('<div data-role="scheduler" data-bind="source:events" />');

        kendo.bind(dom, { events: [ { start: new Date(), end: new Date(), title: "foo" }] } );

        equal(dom.data("kendoScheduler").dataSource.view()[0].title, "foo");
    });

    test("binding scheduler initialized before binding", function() {
        dom = $('<div data-bind="source:events" />');

        var observable = kendo.observable({ events: [ { start: new Date(), end: new Date(), title: "foo" }] });

        dom.kendoScheduler();

        kendo.bind(dom, observable);

        equal(dom.data("kendoScheduler").dataSource.at(0).title, "foo");
    });

    test("filters data based on view range before bind", function() {
        var today = kendo.date.today();
        var yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

        dom = $('<div data-role="scheduler" data-bind="source:events" />');

        kendo.bind(dom, { events: [
            { start: yesterday, end: yesterday, title: "foo1" },
            { start: yesterday, end: yesterday, title: "foo2" },
            { start: new Date(), end: new Date(), title: "foo3" },
            { start: new Date(), end: new Date(), title: "foo4" }
        ] } );

        var events = dom.find(".k-event");

        equal(events.length, 2);
    });

    test("hidden events in month view does not throw error", function() {
        var date = kendo.date.getDate(new Date());
        dom = $('<div data-role="scheduler" data-views="[\'month\']" data-bind="source:events" />');

        dom.appendTo($("body"));

        kendo.bind(dom, { events: [
            { start: date, end: date, title: "foo1" },
            { start: date, end: date, title: "foo2" },
            { start: date, end: date, title: "foo3" },
            { start: date, end: date, title: "foo4" }
        ] } );

        var events = dom.find(".k-event");

        equal(events.length, dom.find(".k-event").length);
        dom.detach();
    });


    test("change in event is reflected in the view", function() {
        var newTitle = "new title";
        var date = kendo.date.getDate(new Date());
        dom = $('<div data-role="scheduler" data-bind="source:events"' +
        'data-views="[{type:\'day\', eventTemplate:kendo.template(template)}]" />');
        window.template = '<input data-bind="value:title" /><div class="title">#=title#</div>';

        kendo.bind(dom, {
            events: [
                { start: date, end: date, title: "foo4" }
            ]
        } );

        dom.find(".k-event").find("input").val(newTitle).trigger("change");
        var title = dom.find(".k-event").find(".title").text();
        delete window.template;

        equal(title, newTitle);
    });
})();
