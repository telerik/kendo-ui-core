kendo_module({
    id: "scheduler",
    name: "Scheduler",
    category: "web",
    description: "The Scheduler is a event calendar.",
    depends: [ "core" ]
});


(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var Scheduler = Widget.extend({
        init: function(element, options) {
            var that = this, value, id;

            Widget.fn.init.call(that, element, options);
        },

        options: {
            name: "Scheduler",
        },

        events: []
    });

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
