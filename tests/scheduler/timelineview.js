(function() {
    var TimelineView = kendo.ui.TimelineView,
        SchedulerEvent = kendo.data.SchedulerEvent,
        container;

    module("Timeline View rendering", {
        setup: function() {
            container = $('<div class="k-scheduler" style="width:1000px;height:800px">');
        },
        teardown: function() {
            if (container.data("kendoTimelineView")) {
                container.data("kendoTimelineView").destroy();
            }

            kendo.destroy(QUnit.fixture);
        }
    });

    test("title is read from the options", function () {
        var view = setup({ title: "the title", date: new Date("2013/6/6") });
        equal(view.title, "the title");
    });
})();
