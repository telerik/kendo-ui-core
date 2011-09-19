(function($, undefined) {
    var kendo = window.kendo,
    ui = kendo.ui,
    Component = ui.Component,
    popup,
    calendar,
    DATEVIEW = "dateView",
    OPEN = "open",
    CLOSE = "close",
    CHANGE = "change",
    keys = kendo.keys;

    var DateView = function(options) {
        var that = this,
            div;

        if (!calendar) {
            div = $('<div/>');
            div.appendTo(document.body);
            calendar = new ui.Calendar(div);
            popup = new ui.Popup(div);
        }

        that.options = options = options || {};

        that.calendar = calendar;
        that.popup = popup;

        that._value = options.value; //???
        that._viewedValue = kendo.calendar.defineViewedValue(options.value, options.min, options.max);
    }

    DateView.prototype = {
        _initCalendar: function() {
            var that = this,
                calendar = that.calendar,
                options = that.options,
                popup = that.popup;

            if (calendar.element.data(DATEVIEW) !== this) {
                popup.options.anchor = options.anchor;

                popup.unbind(OPEN)
                     .unbind(CLOSE)
                     .bind([OPEN, CLOSE], options);

                calendar.min = options.min;
                calendar.max = options.max;

                //calendar.navigate(that._viewedValue, calendar.options.firstView);

                calendar.value(options.value); //this navigate to options.depth
                calendar._focusCell(that._viewedValue);


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
                key = e.keyCode,
                calendar = that.calendar,
                dateString,
                viewName = calendar._currentView,
                view = kendo.calendar[viewName],
                viewedValue = that._viewedValue,
                value;

            if (e.ctrlKey) {
                if (keys.RIGHT == key) {
                    calendar.navigateToFuture();
                } else if (keys.LEFT == key) {
                    calendar.navigateToPast();
                } else if (keys.UP == key) {
                    calendar.navigateUp();
                } else if (keys.DOWN == key) {
                    navigateDown(calendar);
                }
            }

            if (keys.RIGHT == key) {
                value = 1;
            } else if (keys.LEFT == key) {
                value = -1;
            } else if (keys.UP == key) {
                value = viewName === "month" ? -7 : -4;
            } else if (keys.DOWN == key) {
                value = viewName === "month" ? 7 : 4;
            } else if (keys.ENTER == key) {
                navigateDown(calendar);
            }

            if (value) {
                view.setDate(viewedValue, value);
                calendar._focusCell(viewedValue);
            }
        },

        value: function(value) {
            var that = this;

            that._value = value;
            that.calendar.value(value);
        }
    }

    function navigateDown(calendar) {
        var dateString = calendar.view.find(".k-state-focused").children().data("value");
        calendar.navigateDown(new Date(dateString));
    }

    kendo.DateView = DateView;

    var DatePicker = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);
            options = that.options;

            that._wrapper();
            that._icon();

            that.bind("change", options);

            that.dateView = new DateView($.extend({}, options, {
                anchor: that.element,
                change: function() {
                    that.value(that.dateView.value());
                    that.trigger("change");
                    that.close();
                }
            }));
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31)
        },

        open: function() {
            this.dateView.open();
        },

        close: function() {
            this.dateView.close();
        },

        value: function() {

        },

        _icon: function() {
            var that = this,
                element = that.element,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select k-header"><span class="k-icon k-icon-calendar">select</span></span>').insertAfter(element);
            }

            icon.bind("click", function() {
                that.dateView.popup.toggle();
            });
            //that.icon = icon;
            that.element.addClass("k-input");
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-datepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap("<div />").parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap("<div />").parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-datepicker k-header");
        }
    });

    ui.plugin("DatePicker", DatePicker);

})(jQuery);
