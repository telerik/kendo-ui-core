(function($, undefined) {

    var kendo = window.kendo,
        TimeView = kendo.TimeView,
        touch = kendo.support.touch,
        parse = kendo.parseDate,
        extractFormat = kendo._extractFormat,
        calendar = kendo.calendar,
        isInRange = calendar.isInRange,
        restrictValue = calendar.restrictValue,
        isEqualDatePart = calendar.isEqualDatePart,
        getMilliseconds = TimeView.getMilliseconds,
        ui = kendo.ui,
        Widget = ui.Widget,
        OPEN = "open",
        CLOSE = "close",
        CHANGE = "change",
        ns = ".kendoDateTimePicker",
        CLICK = (touch ? "touchend" : "click") + ns,
        DISABLED = "disabled",
        DEFAULT = "k-state-default",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        STATEDISABLED = "k-state-disabled",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        MOUSEDOWN = (touch ? "touchstart" : "mousedown") + ns,
        MONTH = "month",
        SPAN = "<span/>",
        ARIA_EXPANDED = "aria-expanded",
        ARIA_HIDDEN = "aria-hidden",
        DATE = Date,
        MIN = new DATE(1900, 0, 1),
        MAX = new DATE(2099, 11, 31),
        dateViewParams = { view: "date" },
        timeViewParams = { view: "time" },
        extend = $.extend;

    var DateTimePicker = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            normalize(options);

            that._wrapper();

            that._views();

            that._icons();

            that._reset();

            element[0].type = "text";
            element.addClass("k-input")
                   .on("keydown" + ns, $.proxy(that._keydown, that))
                   .on("focus" + ns, function() {
                            that._inputWrapper.addClass(FOCUSED);
                   })
                   .on("blur" + ns, function() {
                        that._inputWrapper.removeClass(FOCUSED);
                        that._change(element.val());
                        that.close("date");
                        that.close("time");
                    })
                   .attr({
                        "role": "textbox",
                        "aria-haspopup": true,
                        "aria-expanded": false
                   });

            that._midnight = getMilliseconds(options.min) + getMilliseconds(options.max) === 0;

            that.enable(!element.is('[disabled]'));
            that.value(options.value || element.val());

            kendo.notify(that);
        },

        options: {
            name: "DateTimePicker",
            value: null,
            format: "",
            timeFormat: "",
            culture: "",
            parseFormats: [],
            dates: [],
            min: new DATE(MIN),
            max: new DATE(MAX),
            interval: 30,
            height: 200,
            footer: "",
            start: MONTH,
            depth: MONTH,
            animation: {},
            month : {}
    },

    events: [
        OPEN,
        CLOSE,
        CHANGE
    ],
        setOptions: function(options) {
            var that = this,
            dateViewOptions = that.dateView.options,
            timeViewOptions = that.timeView.options;

            Widget.fn.setOptions.call(that, options);
            normalize(that.options);

            options = that.options;
            extend(dateViewOptions, options, {
                change: dateViewOptions.change,
                close: dateViewOptions.close,
                open: dateViewOptions.open
            });

            extend(timeViewOptions, options, {
                format: options.timeFormat,
                change: timeViewOptions.change,
                close: timeViewOptions.close,
                open: timeViewOptions.open
            });

            that.timeView.ul[0].innerHTML = "";
        },

        enable: function(enable) {
            var that = this,
                element = that.element,
                dateIcon = that._dateIcon.off(ns),
                timeIcon = that._timeIcon.off(ns),
                wrapper = that._inputWrapper.off(HOVEREVENTS);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(STATEDISABLED);

                element.attr(DISABLED, DISABLED);
            } else {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                element
                    .removeAttr(DISABLED);

                dateIcon.on(MOUSEDOWN, preventDefault)
                        .on(CLICK, function() {
                            that.toggle("date");

                            if (!touch && element[0] !== document.activeElement) {
                                element.focus();
                            }
                        });


                timeIcon.on(MOUSEDOWN, preventDefault)
                        .on(CLICK, function() {
                            that.toggle("time");

                            if (!touch && element[0] !== document.activeElement) {
                                element.focus();
                            }
                        });
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.dateView.destroy();
            that.timeView.destroy();

            that.element.off(ns);
            that._dateIcon.off(ns);
            that._timeIcon.off(ns);
            that._inputWrapper.off(ns);

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        close: function(view) {
            if (view !== "time") {
                view = "date";
            }

            this[view + "View"].close();
        },

        open: function(view) {
            if (view !== "time") {
                view = "date";
            }

            this[view + "View"].open();
        },

        min: function(value) {
            return this._option("min", value);
        },

        max: function(value) {
            return this._option("max", value);
        },

        toggle: function(view) {
            var secondView = "timeView";

            if (view !== "time") {
                view = "date";
            } else {
                secondView = "dateView";
            }

            this[view + "View"].toggle();
            this[secondView].close();
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);
        },

        _change: function(value) {
            var that = this;

            value = that._update(value);

            if (+that._old != +value) {
                that._old = value;
                that.trigger(CHANGE);

                // trigger the DOM change event so any subscriber gets notified
                that.element.trigger(CHANGE);
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options,
                timeView = that.timeView,
                timeViewOptions = timeView.options,
                current = that._value || that._old;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.parseFormats, options.culture);

            if (!value) {
                return;
            }

            options[option] = new DATE(value);
            that.dateView[option](value);

            that._midnight = getMilliseconds(options.min) + getMilliseconds(options.max) === 0;

            if (current && isEqualDatePart(value, current)) {
                if (that._midnight && option == "max") {
                    timeViewOptions[option] = MAX;
                    timeView.dataBind([MAX]);
                    return;
                }

                timeViewOptions[option] = value;
            } else {
                timeViewOptions.max = MAX;
                timeViewOptions.min = MIN;
            }

            timeView.bind();
        },

        _toggleHover: function(e) {
            if (!touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                timeView = that.timeView,
                date = parse(value, options.parseFormats, options.culture),
                rebind, timeViewOptions, old, skip, formattedValue;

            if (+date === +that._value) {
                formattedValue = kendo.toString(date, options.format, options.culture);

                if (formattedValue !== value) {
                    that.element.val(date === null ? value : formattedValue);
                }

                return date;
            }

            if (date !== null && isEqualDatePart(date, min)) {
                date = restrictValue(date, min, max);
            } else if (!isInRange(date, min, max)) {
                date = null;
            }

            that._value = date;
            timeView.value(date);
            that.dateView.value(date);

            if (date) {
                old = that._old;
                timeViewOptions = timeView.options;

                if (isEqualDatePart(date, min)) {
                    timeViewOptions.min = min;
                    timeViewOptions.max = MAX;
                    rebind = true;
                }

                if (isEqualDatePart(date, max)) {
                    if (that._midnight) {
                        timeView.dataBind([MAX]);
                        skip = true;
                    } else {
                        timeViewOptions.max = max;
                        if (!rebind) {
                            timeViewOptions.min = MIN;
                        }
                        rebind = true;
                    }
                }

                if (!skip && ((!old && rebind) || (old && !isEqualDatePart(old, date)))) {
                    if (!rebind) {
                        timeViewOptions.max = MAX;
                        timeViewOptions.min = MIN;
                    }

                    timeView.bind();
                }
            }

            that.element.val(date ? kendo.toString(date, options.format, options.culture) : value);

            return date;
        },

        _keydown: function(e) {
            var that = this,
                dateView = that.dateView,
                timeView = that.timeView,
                isDateViewVisible = dateView.popup.visible();

            if (e.altKey && e.keyCode === kendo.keys.DOWN) {
                that.toggle(isDateViewVisible ? "time" : "date");
            } else if (isDateViewVisible) {
                dateView.move(e);
            } else if (timeView.popup.visible()) {
                timeView.move(e);
            } else if (e.keyCode === kendo.keys.ENTER) {
                that._change(that.element.val());
            }
        },

        _views: function() {
            var that = this,
                element = that.element,
                options = that.options,
                id = element.attr("id"),
                div, ul,
                date;

            that.dateView = new kendo.DateView(extend({}, options, {
                id: id,
                anchor: that.wrapper,
                change: function() {
                    var value = that.dateView.calendar.value(),
                        msValue = +value,
                        msMin = +options.min,
                        msMax = +options.max,
                        current;

                    if (msValue === msMin || msValue === msMax) {
                        current = new DATE(that._value);
                        current.setFullYear(value.getFullYear());
                        current.setMonth(value.getMonth());
                        current.setDate(value.getDate());

                        if (isInRange(current, msMin, msMax)) {
                            value = current;
                        }
                    }

                    that._change(value);
                    that.close("date");
                },
                close: function(e) {
                    if (that.trigger(CLOSE, dateViewParams)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, false);
                        div.attr(ARIA_HIDDEN, true);
                    }
                },
                open:  function(e) {
                    if (that.trigger(OPEN, dateViewParams)) {
                        e.preventDefault();
                    } else {
                        date = parse(element.val(), options.parseFormats, options.culture);
                        if (!date) {
                            that.dateView.value(date);
                        } else {
                            that.dateView._current = date;
                            that.dateView.calendar._focus(date);
                        }

                        element.attr(ARIA_EXPANDED, true);
                        div.attr(ARIA_HIDDEN, false);
                    }
                }
            }));
            div = that.dateView.div;

            that.timeView = new TimeView({
                id: id,
                value: options.value,
                anchor: that.wrapper,
                animation: options.animation,
                dates: options.dates,
                format: options.timeFormat,
                culture: options.culture,
                height: options.height,
                interval: options.interval,
                min: new DATE(MIN),
                max: new DATE(MAX),
                parseFormats: options.parseFormats,
                change: function(value, trigger) {
                    var timeView = this;

                    value = timeView._parse(value);

                    if (value < options.min) {
                        value = new DATE(options.min);
                        timeView.options.min = value;
                    } else if (value > options.max) {
                        value = new DATE(options.max);
                        timeView.options.max = value;
                    }

                    if (trigger) {
                        that._timeSelected = true;
                        that._change(value);
                    } else {
                        element.val(kendo.toString(value, options.format, options.culture));
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE, timeViewParams)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, false);
                        ul.attr(ARIA_HIDDEN, true);
                    }
                },
                open:  function(e) {
                    if (that.trigger(OPEN, timeViewParams)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, true);
                        ul.attr(ARIA_HIDDEN, false);
                    }
                }
            });
            ul = that.timeView.ul;
        },

        _icons: function() {
            var that = this,
                element = that.element,
                icons;

            icons = element.next("span.k-select");

            if (!icons[0]) {
                icons = $('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-i-calendar">select</span><span unselectable="on" class="k-icon k-i-clock">select</span></span>').insertAfter(element);
            }

            icons = icons.children();
            that._dateIcon = icons.eq(0).attr({
                "role": "button",
                "aria-controls": that.dateView._dateViewID
            });

            that._timeIcon = icons.eq(1).attr({
                "role": "button",
                "aria-controls": that.timeView._timeViewID
            });
        },

        _wrapper: function() {
            var that = this,
            element = that.element,
            wrapper;

            wrapper = element.parents(".k-datetimepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(SPAN).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(SPAN).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                width: "100%",
                height: element[0].style.height
            });

            that.wrapper = wrapper.addClass("k-widget k-datetimepicker k-header")
                                  .addClass(element[0].className)
                                  .show();

            that._inputWrapper = $(wrapper[0].firstChild);
        },

        _reset: function() {
            var that = this,
                element = that.element,
                form = element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    that.value(element[0].defaultValue);
                };

                that._form = form.on("reset", that._resetHandler);
            }
        }
    });

    function preventDefault(e) {
        e.preventDefault();
    }

    function normalize(options) {
        var patterns = kendo.getCulture(options.culture).calendars.standard.patterns;

        options.format = extractFormat(options.format || patterns.g);
        options.timeFormat = extractFormat(options.timeFormat || patterns.t);
        kendo.DateView.normalize(options);
        options.parseFormats.splice(1, 0, options.timeFormat);
    }

    ui.plugin(DateTimePicker);

})(jQuery);
