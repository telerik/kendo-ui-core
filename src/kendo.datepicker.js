(function($, undefined) {
    var kendo = window.kendo,
    ui = kendo.ui,
    Component = ui.Component,
    sharedCalendar,
    calendar,
    popup;

    //function init() {
    sharedCalendar = $('<div/>').hide();
    sharedCalendar.appendTo(document.body);
    calendar = new ui.Calendar(sharedCalendar);
    popup = new ui.Popup(sharedCalendar);
    //};

    //init();

    var DateView = Component.extend({
        init: function(options) {
            var that = this;

            that.options = options;
            that.calendar = calendar;
            that.popup = popup;
        },
        _initCalendar: function() {
            var that = this,
                calendar = that.calendar,
                options = that.options,
                popup = that.popup;

                popup.anchor = options.anchor;

                //open and close events !!!!

            calendar.min = options.min;
            calendar.max = options.max;
            calendar.value(options.value);

            calendar.unbind("change")
                    .bind("change", options["change"]);

            sharedCalendar.data("dateView", this);
        }
    });

    ui.DateView = DateView;

})(jQuery);
