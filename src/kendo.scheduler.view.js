kendo_module({
    id: "scheduler.view",
    name: "Scheduler View",
    category: "web",
    description: "The Scheduler Common View",
    depends: [ "core" ]
});

(function($) {
    var kendo = window.kendo;
    var ui = kendo.ui;
    var Widget = ui.Widget;

    kendo.ui.SchedulerView = Widget.extend({

    });

})(window.kendo.jQuery);
