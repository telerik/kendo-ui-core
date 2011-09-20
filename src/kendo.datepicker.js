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

        that.value(options.value);
    }

    DateView.prototype = {
        _initCalendar: function() {
            var that = this,
                calendar = that.calendar,
                options = that.options,
                popup = that.popup;

            if (calendar.element.data(DATEVIEW) !== this) {
                popup.options.anchor = options.anchor;
                if (popup.wrapper) {
                    popup.wrapper.data("position", "");
                }

                popup.unbind(OPEN)
                     .unbind(CLOSE)
                     .bind([OPEN, CLOSE], options);

                calendar.element.data(DATEVIEW, this);
                calendar.min = options.min;
                calendar.max = options.max;
                //calendar.options.depth = options.depth;
                //calendar.options.firstView = options.firstView;
                //calendar._currentView = options.firstView;

                calendar.unbind(CHANGE)
                        .unbind(NAVIGATE)
                        .bind(NAVIGATE,function() {
                            that._viewedValue = new Date(calendar._viewedValue);
                            calendar._focusCell(calendar._viewedValue);
                        })
                        .bind(CHANGE, options);

                that.value(that._value);
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

        toggle: function() {
            var that = this;
            that._initCalendar();
            that.popup.toggle();
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
            } else if (e.altKey) {
                if (keys.DOWN == key) {
                    that.open();
                } else if (keys.UP == key) {
                    that.close();
                }
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
                }

                if (value) {
                    view.setDate(viewedValue, value);
                    calendar._focusCell(viewedValue);
                }
            }
        },

        value: function(value) {
            var that = this,
                calendar = that.calendar,
                options = that.options;

            that._value = value;
            that._viewedValue = kendo.calendar.defineViewedValue(value, options.min, options.max);

            if (calendar.element.data(DATEVIEW) === this) {
                calendar._focusCell(that._viewedValue);
                calendar.value(value);
            }
        }
    }

    function navigateDown(calendar) {
        var date = new Date(calendar.view.find(".k-state-focused").children().data("value")),
            viewedValue = calendar._viewedValue;

        kendo.calendar[calendar._currentView].setDate(viewedValue, date);
        calendar.navigateDown(viewedValue);
    }

    kendo.DateView = DateView;

    var DatePicker = Component.extend({
        init: function(element, options) {
            var that = this,
                dateView;

            Component.fn.init.call(that, element, options);
            options = that.options;

            options.format = options.format || kendo.culture().calendar.patterns["d"];

            that.dateView = dateView = new DateView($.extend({}, options, {
                anchor: that.element,
                change: function() {
                    that.value(dateView.calendar.value());
                    that.trigger(CHANGE);
                    that.close();
                }
            }));

            that._wrapper();
            that._icon();

            that.element
                .addClass("k-input")
                .bind("keydown", $.proxy(dateView.navigate, dateView));

            that.bind(CHANGE, options);

            that.value(options.value);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            firstView: "month",
            depth: "month"
        },

        open: function() {
            this.dateView.open();
        },

        close: function() {
            this.dateView.close();
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            //parse value

            that._value = value;
            that.dateView.value(value);
            that.element.val(kendo.toString(value, that.options.format));
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

            icon.bind("click", $.proxy(dateView.toggle, dateView));
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
