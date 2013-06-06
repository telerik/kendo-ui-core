kendo_module({
    id: "scheduler.monthview",
    name: "Scheduler Month View",
    category: "web",
    description: "The Scheduler Month View",
    depends: [ "core", "scheduler.view" ]
});

(function($){
    var kendo = window.kendo,
        ui = kendo.ui;

    ui.MonthView = ui.SchedulerView.extend({
        init: function(element, options) {
            ui.SchedulerView.fn.init.call(this, element, options);

            this.title = this.name = this.options.title;
        },

        nextDate: function() {
            return kendo.date.nextDay(this.endDate);
        },

        previousDate: function() {
            return kendo.date.previousDay(this.startDate);
        },

        // change to setDate
        renderGrid: function(date) {
            this.startDate = this.endDate = date;
        },

        renderEvents: function(events) {

        },

        options: {
            title: "Month",
            name: "month",
            selectedDateFormat: "{0:y}"
        }
    });

})(window.kendo.jQuery);
