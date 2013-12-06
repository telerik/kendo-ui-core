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
})();
