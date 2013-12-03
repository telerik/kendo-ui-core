(function() {
   var Scheduler = kendo.ui.Scheduler,
        container;

    function getDate(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    }

    module("Initialization", {
        setup: function() {
            kendo.ui.Popup.fn.options.animation = false;

            container = document.createElement("div");
            QUnit.fixture[0].appendChild(container);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setup(options) {
        options = $.extend({ mobile: "phone" }, options);
        return new Scheduler(container, options);
    }

    test("css class is added to the wrapper", function() {
        var scheduler = setup();

        ok(scheduler.wrapper.hasClass("k-scheduler-mobile"));
        ok(scheduler.wrapper.hasClass("k-scheduler-phone"));
    });

    test("mobile css class is added to the wrapper if device is tablet", function() {
        var scheduler = setup({ mobile: "tablet" });

        ok(scheduler.wrapper.hasClass("k-scheduler-mobile"));
    });

    test("mobile phone css class is not added to the wrapper if device is tablet", function() {
        var scheduler = setup({ mobile: "tablet" });

        ok(!scheduler.wrapper.hasClass("k-scheduler-phone"));
    });

    test("is wrapped in a mobile view", function() {
        var scheduler = setup({ mobile: "tablet" });

        ok(scheduler.wrapper.closest("[data-role=view]").length);
    });

    test("additional toolbar item is rendered", function() {
        var scheduler = setup();

        equal(scheduler.wrapper.find(".k-scheduler-navigation").length, 2);
    });

    test("next prev buttons are rendered in the second toolbar item", function() {
        var scheduler = setup();

        ok(!scheduler.wrapper.find(".k-scheduler-navigation:first:has(.k-nav-next)").length);
        ok(scheduler.wrapper.find(".k-scheduler-navigation:last:has(.k-nav-next)").length);

        ok(!scheduler.wrapper.find(".k-scheduler-navigation:first:has(.k-nav-prev)").length);
        ok(scheduler.wrapper.find(".k-scheduler-navigation:last:has(.k-nav-prev)").length);
    });

    test("clicking on the current time does not open calendar", function() {
        var scheduler = setup();

        scheduler.toolbar.find(".k-nav-current").click();
        ok(!scheduler.calendar);
    });

    test("clicking on the current time opens a calendar when viewed on a tablet", function() {
        var scheduler = setup({ mobile: "tablet" });

        scheduler.toolbar.find(".k-nav-current").click();

        ok(scheduler.calendar);
        equal(getDate(scheduler.calendar.value()).getTime(), scheduler.date().getTime());
    });

    test("delete button is not shown in the month view", function() {
        var scheduler = setup({
            views: ["month"],
            dataSource: [ { start: new Date(), end: new Date(), isAllDay: true, title:"" }]
        });

        ok(!scheduler.element.find(".k-event").first().has(".k-event-delete").length);
    });

    test("resize handles are not shown in the month view", function() {
        var scheduler = setup({
            views: ["month"],
            dataSource: [ { start: new Date(), end: new Date(), isAllDay: true, title:"" }]
        });

        ok(!scheduler.element.find(".k-event").first().has(".k-resize-handle").length);
    });

    test("render short day of week", function() {
        var scheduler = setup({
            views: ["month"],
            dataSource: [ { start: new Date(), end: new Date(), isAllDay: true, title:"" }]
        });

        var headerCells = scheduler.view().datesHeader.find("th");

        equal(headerCells.length, 7);
        equal(headerCells.first().text(), "Su");
        equal(headerCells.eq(1).text(), "Mo");
        equal(headerCells.eq(2).text(), "Tu");
        equal(headerCells.eq(3).text(), "We");
        equal(headerCells.eq(4).text(), "Th");
        equal(headerCells.eq(5).text(), "Fr");
        equal(headerCells.eq(6).text(), "Sa");

    });

    test("delete button is not shown in the day view", function() {
        var scheduler = setup({
            views: ["day"],
            dataSource: [ { start: new Date(), end: new Date(), isAllDay: true, title:"" }]
        });

        ok(!scheduler.element.find(".k-event").first().has(".k-event-delete").length);
    });

    test("resize handles are not shown in the day view", function() {
        var scheduler = setup({
            views: ["day"],
            dataSource: [ { start: new Date(), end: new Date(), isAllDay: true, title:"" }]
        });

        ok(!scheduler.element.find(".k-event").first().has(".k-resize-handle").length);
    });

})();
