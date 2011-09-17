(function($, undefined) {
    var kendo = window.kendo,
    ui = kendo.ui,
    Component = ui.Component,
    sharedCalendar,
    calendar,
    popup,
    DATEVIEW = "dateView",
    OPEN = "open",
    CLOSE = "close",
    CHANGE = "change",
    keys = kendo.keys;

    var DateView = Component.extend({
        init: function(options) {
            var that = this;

            //Component.fn.init.call(that, element, options);

            if (!sharedCalendar) {
                sharedCalendar = $('<div/>');
                sharedCalendar.appendTo(document.body);
                calendar = new ui.Calendar(sharedCalendar);
                popup = new ui.Popup(sharedCalendar);
            }

            that.options = options = options || {};

            that.calendar = calendar;
            that.popup = popup;

            that._viewedValue = kendo.calendar.defineViewedValue(options.value, options.min, options.max);
        },

        _initCalendar: function() {
            var that = this,
                calendar = that.calendar,
                options = that.options,
                popup = that.popup;

            if (calendar.element.data(DATEVIEW) !== this) {
                popup.options.anchor = options.anchor;

                popup.unbind(OPEN)
                     .unbind(CLOSE)
                     .bind(OPEN, options)
                     .bind(CLOSE, options);

                calendar.min = options.min;
                calendar.max = options.max;

                calendar.navigate(that._viewedValue, calendar.options.firstView);

                calendar.value(options.value);


                //check
                //calendar._viewedValue = that._viewedValue;
                calendar._focusValue(that._viewedValue);


                calendar.unbind(CHANGE).bind(CHANGE, options);

                calendar.element.data(DATEVIEW, this);
            }
        },

        open: function() {
            var that = this;

            that._initCalendar();
            that.popup.open();
        },

        close: function() {
            this.popup.close();
        },

        navigate: function(e) {
            var that = this,
                key = e.keyCode;

            if (e.ctrlKey) {
                var calendar = that.calendar;

                if (keys.RIGHT == key) {
                    calendar.navigateToFuture();
                } else if (keys.LEFT == key) {
                    calendar.navigateToPast();
                } else if (keys.UP == key) {
                    calendar.navigateUp();
                } else if (keys.DOWN == key) {
                    var dateString = that.calendar.view.find(".k-state-focused").children().data("value");
                    var date = new Date(dateString);

                    calendar.navigateDown(date);

                }
            }

            if (keys.RIGHT == key) {
                var view = kendo.calendar[that.calendar._currentView];

                view.setDate(that._viewedValue, 1);

                that.calendar._focusValue(that._viewedValue);
            } else if (keys.LEFT == key) {
                var view = kendo.calendar[that.calendar._currentView];

                view.setDate(that._viewedValue, -1);

                that.calendar._focusValue(that._viewedValue);
            } else if (keys.UP == key) {
                var viewName = that.calendar._currentView;
                var view = kendo.calendar[viewName];
                var value = viewName === "month" ? -7 : -4;

                view.setDate(that._viewedValue, value);

                that.calendar._focusValue(that._viewedValue);
            } else if (keys.DOWN == key) {
                var viewName = that.calendar._currentView;
                var view = kendo.calendar[viewName];
                var value = viewName === "month" ? 7 : 4;

                view.setDate(that._viewedValue, value);

                that.calendar._focusValue(that._viewedValue);
            }
        }
    });

    ui.DateView = DateView;

})(jQuery);
