(function() {
    module("MVVM", {
        setup: function() {
        },
        teardown: function() {
        }
    });

    test("initializes a scheduler when data role is scheduler", function() {
        var dom = $('<div data-role="scheduler"/>').appendTo(QUnit.fixture);

        kendo.bind(dom);

        ok(dom.data("kendoScheduler") instanceof kendo.ui.Scheduler);
    });

    test("initalizes data source", function() {
        var dom = $('<div data-role="scheduler" data-bind="source:events" />').appendTo(QUnit.fixture);

            kendo.bind(dom, { events: [ { start: new Date(), end: new Date(), title: "foo" }] } );

        equal(dom.data("kendoScheduler").dataSource.view()[0].title, "foo");
    });

    test("binding scheduler initialized before binding", function() {
        var dom = $('<div data-bind="source:events" />').appendTo(QUnit.fixture);

        var observable = kendo.observable({ events: [ { start: new Date(), end: new Date(), title: "foo" }] });

        dom.kendoScheduler();

        kendo.bind(dom, observable);

        equal(dom.data("kendoScheduler").dataSource.at(0).title, "foo");
    });
})();
