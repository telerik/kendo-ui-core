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
        Class = kendo.Class,
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

    var RRule = Class.extend({
        init: function(options) {
        }
    });

    var rrule_parser = function(rrule) {
        var result = {},
            property,
            pair;

        rrule = rrule.split(";");

        for (var idx = 0, length = rrule.length; idx < length; idx++) {
            property = rrule[idx];
            pair = property.split("=");

            if (pair[0].toUpperCase() === "FREQ") {
                result.freq = pair[1];
            }
        }

        return result;
    }

    kendo.rrule_parser = rrule_parser;

    ui.plugin(Scheduler);

})(window.kendo.jQuery);
