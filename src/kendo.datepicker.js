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
    NAVIGATE = "navigate",
    DIV = "<div />",
    keys = kendo.keys;

    var DateView = function(options) {
        var that = this,
            div;

        if (!calendar) {
            div = $(DIV);
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


                calendar.unbind(CHANGE)
                        .unbind(NAVIGATE)
                        .bind(NAVIGATE,function() {
                            that._viewedValue = new Date(calendar._viewedValue);
                            calendar._focusCell(calendar._viewedValue);
                        })
                        .bind(CHANGE, options);

                calendar.element.data(DATEVIEW, this);
            }
        },

        navigate: function(e) {
            var that = this,
                key = e.keyCode,
                calendar = that.calendar,
                viewName = calendar._currentView,
                view = kendo.calendar[viewName],
                viewedValue = that._viewedValue,
                dateString, value;

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
                //calendar._focusCell(viewedValue);
            } else {
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
                    //calendar._focusCell(viewedValue);
                }

                if (value) {
                    view.setDate(viewedValue, value);
                    calendar._focusCell(viewedValue);
                }
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
            var that = this,
                dateView;

            Component.fn.init.call(that, element, options);
            options = that.options;

            that.dateView = dateView = new DateView($.extend({}, options, {
                anchor: that.element,
                change: function() {
                    that.value(dateView.value());
                    that.trigger(CHANGE);
                    that.close();
                }
            }));

            that._wrapper();
            that._icon();

            that.element.addClass("k-input")
                .bind("keydown", $.proxy(dateView.navigate, dateView));

            that.bind(CHANGE, options);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31)
        },

        open: function() {
            var dateView = this.dateView;

            dateView._initCalendar();
            dateView.popup.open();
        },

        close: function() {
            this.dateView.popup.close();
        },

        value: function() {

        },

        _icon: function() {
            var that = this,
                element = that.element,
                dateView = that.dateView,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select k-header"><span class="k-icon k-icon-calendar">select</span></span>').insertAfter(element);
            }

            icon.bind("click", function() {
                dateView._initCalendar();
                dateView.popup.toggle();
            });
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-datepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(DIV).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-datepicker k-header");
        }
    });

    ui.plugin("DatePicker", DatePicker);

})(jQuery);
