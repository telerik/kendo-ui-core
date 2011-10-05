(function($, undefined) {
    var kendo = window.kendo,
    ui = kendo.ui,
    Component = ui.Component,
    parse = kendo.parseDate,
    keys = kendo.keys,
    defineViewedValue = kendo.calendar.defineViewedValue,
    calendar,
    DATEVIEW = "dateView",
    OPEN = "open",
    CLOSE = "close",
    MOUSEDOWN = (kendo.support.touch ? "touchstart" : "mousedown"),
    CHANGE = "change",
    NAVIGATE = "navigate",
    DIV = "<div />",
    proxy = $.proxy;

    var DateView = function(options) {
        var that = this,
            body = document.body;

        if (!calendar) {
            calendar = new ui.Calendar($(DIV).hide().appendTo(body));
        }

        that.calendar = calendar;
        that.options = options = options || {};
        that.popup = new ui.Popup($(DIV).appendTo(body), {
            anchor: options.anchor,
            close: options.close,
            open: options.open
        });

        that.value(options.value);
    }

    DateView.prototype = {
        _initCalendar: function() {
            var that = this,
                popup = that.popup,
                options = that.options,
                calendar = that.calendar,
                calendarElement = calendar.element;

            if (calendarElement.data(DATEVIEW) !== this) {
                calendarElement.show().appendTo(popup.element);

                calendarElement.bind("click", function(e) {
                    if (e.currentTarget.className.indexOf("k-state-selected") !== -1) {
                        that.close();
                    }
                });

                calendarElement.data(DATEVIEW, this);
                calendar.options.min = options.min;
                calendar.options.max = options.max;
                calendar.options.depth = options.depth;
                calendar.options.startView = options.startView;
                calendar._currentView = options.startView;

                calendar.unbind(CHANGE)
                        .unbind(NAVIGATE)
                        .bind(NAVIGATE,function() {
                            that._viewedValue = new Date(calendar._viewedValue);
                            calendar._focusCell(calendar._viewedValue);
                        })
                        .bind(CHANGE, options);

                calendarElement.unbind(MOUSEDOWN).bind(MOUSEDOWN, options.clearBlurTimeout);

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

            if (that.popup.visible()) {
                that.close();
            } else {
                that.open();
            }
        },

        navigate: function(e) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                viewedValue = new Date(that._viewedValue),
                calendar = that.calendar,
                viewName = calendar._currentView,
                view = calendar._view,
                key = e.keyCode,
                dateString, value;

            if (keys.ESC == key) {
                that.close();
                return;
            }

            //cache e.preventDefault()
            if (e.ctrlKey) {
                if (keys.RIGHT == key) {
                    calendar.navigateToFuture();
                    e.preventDefault();
                } else if (keys.LEFT == key) {
                    calendar.navigateToPast();
                    e.preventDefault();
                } else if (keys.UP == key) {
                    calendar.navigateUp();
                    e.preventDefault();
                } else if (keys.DOWN == key) {
                    e.preventDefault();
                    that._navigateDown();
                }
            } else {
                if (keys.RIGHT == key) {
                    value = 1;
                    e.preventDefault();
                } else if (keys.LEFT == key) {
                    value = -1;
                    e.preventDefault();
                } else if (keys.UP == key) {
                    value = viewName === "month" ? -7 : -4;
                    e.preventDefault();
                } else if (keys.DOWN == key) {
                    value = viewName === "month" ? 7 : 4;
                    e.preventDefault();
                } else if (keys.ENTER == key) {
                    e.preventDefault();
                    that._navigateDown();
                } else if (keys.HOME == key) {
                    e.preventDefault();
                    //find a way to combine this code with the one in the if(value) condition block
                    that._viewedValue = viewedValue = defineViewedValue(view.first(viewedValue), options.min, options.max);
                    calendar._focusCell(viewedValue);
                } else if (keys.END == key) {
                    e.preventDefault();
                    that._viewedValue = viewedValue = defineViewedValue(view.last(viewedValue), options.min, options.max);
                    calendar._focusCell(viewedValue);
                } else if (keys.PAGEUP == key) {
                    calendar.navigateToPast();
                } else if (keys.PAGEDOWN == key) {
                    calendar.navigateToFuture();
                }

                if (value) {
                    view.setDate(viewedValue, value);

                    that._viewedValue = viewedValue = defineViewedValue(viewedValue, options.min, options.max);

                    calendar._focusCell(viewedValue);
                }
            }
        },

        value: function(value) {
            var that = this,
                calendar = that.calendar,
                options = that.options;

            that._value = value;
            that._viewedValue = defineViewedValue(value, options.min, options.max);

            if (calendar.element.data(DATEVIEW) === this) {
                calendar._focusCell(that._viewedValue);
                calendar.value(value);
            }
        },

        _navigateDown: function() {
            var that = this,
                calendar = that.calendar,
                viewedValue = calendar._viewedValue,
                cell = calendar._table.find(".k-state-focused"),
                value = new Date(cell.children(":first").data("value"));

            if (!cell[0] || cell.hasClass("k-state-selected")) {
                that.close();
                return;
            }

            calendar._view.setDate(viewedValue, value);
            calendar.navigateDown(viewedValue);
        }
    }

    kendo.DateView = DateView;

    var DatePicker = Component.extend({
        init: function(element, options) {
            var that = this,
                dateView;

            Component.fn.init.call(that, element, options);
            options = that.options;

            options.format = options.format || kendo.culture().calendar.patterns["d"];

            that._wrapper();
            that._icon();

            that.dateView = dateView = new DateView($.extend({}, options, {
                anchor: that.wrapper,
                change: function() {
                    that._valid = true;
                    that.value(dateView.calendar.value());
                    that.trigger(CHANGE);
                    that.close();
                },
                clearBlurTimeout: proxy(that._clearBlurTimeout, that)
            }));

            that.element
                .addClass("k-input")
                .bind({
                    keydown: proxy(that._keydown, that),
                    blur: function() {
                        var value = this.value;
                        that._bluring = setTimeout(function() {
                            that._change(value);
                            that.close();
                        }, 100);
                    }
                });

            that.bind(CHANGE, options);

            that._valid = true;
            that.value(options.value);
        },

        options: {
            value: null,
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            format: kendo.culture().calendar.patterns.d,
            startView: "month",
            depth: "month"
        },

        open: function() {
            this.dateView.open();
        },

        close: function() {
            this.dateView.close();
        },

        value: function(value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return that._value;
            }

            value = parse(value, that.options.format);

            if (!inRange(value, options.min, options.max)) {
                value = null;
            }

            that._value = value;
            that.dateView.value(value);

            if (that._valid) {
                that.element.val(kendo.toString(value, that.options.format));
            }

            that._valid = true;
        },

        _clearBlurTimeout: function() {
            var that = this;
            setTimeout(function() {
                clearTimeout(that._bluring);
                that.element.focus();
            });
        },

        _change: function(value) {
            var that = this,
                options = that.options;

            value = parse(value, options.format);

            if (value && !inRange(value, options.min, options.max)) {
                value = null;
            }

            that._valid = value !== null;

            if (+value != +that._value) {
                that.value(value);

                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                dateView = that.dateView;

            if (e.altKey) {
                if (keys.DOWN == key) {
                    that.open();
                    e.preventDefault();
                } else if (keys.UP == key) {
                    that.close();
                    e.preventDefault();
                }
            } else {
                if (dateView.popup.visible()) {
                    dateView.navigate(e);
                } else if (keys.ENTER == key) {
                    that._change(e.currentTarget.value);
                }
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                icon;

            icon = element.next("span.k-select");

            if (!icon[0]) {
                icon = $('<span class="k-select k-header"><span class="k-icon k-icon-calendar">select</span></span>').insertAfter(element);
            }

            icon.bind({
                click: function() {
                    that.dateView.toggle();
                },
                mousedown: function() {
                    that._clearBlurTimeout();
                }
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

    //same in the calendar.js
    function inRange(date, min, max) {
        return +date >= +min && +date <= +max;
    }

    ui.plugin("DatePicker", DatePicker);

})(jQuery);
