(function(f, define){
    define([ "./kendo.datepicker", "./kendo.timepicker" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "datetimepicker",
    name: "DateTimePicker",
    category: "web",
    description: "The DateTimePicker allows the end user to select a value from a calendar or a time drop-down list.",
    depends: [ "datepicker", "timepicker" ]
};

(function($, undefined) {

    var kendo = window.kendo,
        TimeView = kendo.TimeView,
        parse = kendo.parseDate,
        support = kendo.support,
        activeElement = kendo._activeElement,
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
        CLICK = "click" + ns,
        UP = support.mouseAndTouchPresent ? kendo.applyEventMap("up", ns.slice(1)) : CLICK,
        DISABLED = "disabled",
        READONLY = "readonly",
        DEFAULT = "k-state-default",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        STATEDISABLED = "k-state-disabled",
        HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
        MOUSEDOWN = "mousedown" + ns,
        MONTH = "month",
        SPAN = "<span/>",
        ARIA_ACTIVEDESCENDANT = "aria-activedescendant",
        ARIA_EXPANDED = "aria-expanded",
        ARIA_HIDDEN = "aria-hidden",
        ARIA_OWNS = "aria-owns",
        ARIA_DISABLED = "aria-disabled",
        ARIA_READONLY = "aria-readonly",
        DATE = Date,
        MIN = new DATE(1800, 0, 1),
        MAX = new DATE(2099, 11, 31),
        dateViewParams = { view: "date" },
        timeViewParams = { view: "time" },
        extend = $.extend,
        SINGLE_POPUP_TEMPLATE = '<div class="k-date-tab k-datetime-wrap">' +
                                    '<div class="k-datetime-buttongroup">'+
                                        '<div class="k-button-group k-button-group-stretched">'+
                                            '<button class="k-button k-state-active k-group-start">#=messages.date#</button>'+
                                            '<button class="k-button k-group-end">#=messages.time#</button>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="k-datetime-selector">'+
                                        '<div class="k-datetime-calendar-wrap">'+
                                        '</div>'+
                                        '<div class="k-datetime-time-wrap">'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="k-datetime-footer k-action-buttons">'+
                                        '<button class="k-button k-time-cancel" title="Cancel" aria-label="Cancel">#=messages.cancel#</button>'+
                                        '<button class="k-time-accept k-button k-primary" title="Set" aria-label="Set">#=messages.set#</button>'+
                                    '</div>'+
                                '</div>',
        STATE_ACTIVE = "k-state-active";

    var DateTimePicker = Widget.extend({
        init: function(element, options) {
            var that = this, disabled;

            options = options || {};
            options.componentType = options.componentType || "classic";
            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            options.disableDates = kendo.calendar.disabled(options.disableDates);
            options.min = parse(element.attr("min")) || parse(options.min);
            options.max = parse(element.attr("max")) || parse(options.max);

            if (+options.max != +MAX || +options.min != +MIN) {
                this._specifiedRange = true;
            }

            normalize(options);

            that._initialOptions = extend({}, options);

            that._wrapper();

            if(options.singlePopup){
                that._popup();
            }

            that._views();

            that._icons();

            that._reset();
            that._template();

            try {
                element[0].setAttribute("type", "text");
            } catch(e) {
                element[0].type = "text";
            }

            element.addClass("k-input")
                   .attr({
                       "role": "combobox",
                       "aria-expanded": false,
                       "autocomplete": "off"
                   });


            that._midnight = that._calculateMidnight(options.min, options.max);

            disabled = element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');
            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(element.is("[readonly]"));
            }

            that._createDateInput(options);

            that._old = that._update(options.value || that.element.val());
            that._oldText = element.val();

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
            disableDates: null,
            min: new DATE(MIN),
            max: new DATE(MAX),
            interval: 30,
            height: 200,
            footer: "",
            start: MONTH,
            depth: MONTH,
            animation: {},
            month : {},
            ARIATemplate: 'Current focused #=data.valueType# is #=data.text#',
            dateButtonText: "Open the date view",
            timeButtonText: "Open the time view",
            dateInput: false,
            weekNumber: false,
            messages: {
                set: "Set",
                cancel: "Cancel",
                hour: "hour",
                minute: "minute",
                second: "second",
                millisecond: "millisecond",
                now: "Now",
                date: "Date",
                time: "Time",
                today: "Today"
            },
            componentType: "classic"
        },

        events: [
            OPEN,
            CLOSE,
            CHANGE
        ],

        componentTypes: {
            "classic": {
                singlePopup: false,
                timeView: {
                    list: "list"
                }
            },
            "modern": {
                singlePopup: true,
                timeView: {
                    list: "scroll"
                }
            }
        },

        setOptions: function(options) {
            var that = this,
                value = that._value,
                min, max, currentValue;

            Widget.fn.setOptions.call(that, options);

            options = that.options;

            options.min = min = parse(options.min);
            options.max = max = parse(options.max);

            normalize(options);

            that._midnight = that._calculateMidnight(options.min, options.max);

            currentValue = options.value || that._value || that.dateView._current;

            if (min && !isEqualDatePart(min, currentValue)) {
                min = new DATE(MIN);
            }

            if (max && !isEqualDatePart(max, currentValue)) {
                max = new DATE(MAX);
            }

            that.dateView.setOptions(options);

            that.timeView.setOptions(extend({}, options, {
                format: options.timeFormat,
                min: min,
                max: max
            }));

            that._createDateInput(options);

            if (!that._dateInput) {
                that.element.val(kendo.toString(value, options.format, options.culture));
            }

            if (value) {
                that._updateARIA(value);
            }
        },

        _editable: function(options) {
            var that = this,
                element = that.element.off(ns),
                dateIcon = that._dateIcon.off(ns),
                timeIcon = that._timeIcon.off(ns),
                wrapper = that._inputWrapper.off(ns),
                readonly = options.readonly,
                disable = options.disable;

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);
                if(element && element.length) {
                    element[0].removeAttribute(DISABLED);
                    element[0].removeAttribute(READONLY, false);
                    element[0].removeAttribute(ARIA_DISABLED, false);
                    element[0].removeAttribute(ARIA_READONLY, false);
                }
                element.on("keydown" + ns, $.proxy(that._keydown, that))
                       .on("focus" + ns, function() {
                           that._inputWrapper.addClass(FOCUSED);
                       })
                       .on("focusout" + ns, function() {
                           that._inputWrapper.removeClass(FOCUSED);
                           if (element.val() !== that._oldText) {
                               that._change(element.val());
                               if (!element.val()) {
                                   that.dateView.current(kendo.calendar.getToday());
                               }
                           }
                           if (that.options.singlePopup) {
                               return;
                           }
                           that.close("date");
                           that.close("time");
                       });

               dateIcon.on(MOUSEDOWN, preventDefault)
                        .on(UP, function(e) {
                            that.toggle("date");
                            that._focusElement(e.type);
                        });

               timeIcon.on(MOUSEDOWN, preventDefault)
                        .on(UP, function(e) {
                            that.toggle("time");
                            that._focusElement(e.type);
                        });

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        _focusElement: function(eventType) {
            var element = this.element;

            if ((!support.touch || (support.mouseAndTouchPresent && !(eventType || "").match(/touch/i))) && element[0] !== activeElement()) {
                element.trigger("focus");
            }
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
            that.dateView.destroy();
            that.timeView.destroy();

            if (that.options.singlePopup) {
                that.popup.element.off(ns);
                that.popup.destroy();
            }

            that.element.off(ns);
            that._dateIcon.off(ns);
            that._timeIcon.off(ns);
            that._inputWrapper.off(ns);

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        close: function(view) {
            if (this.options.singlePopup) {
                this.popup.close();
            } else {
                if (view !== "time") {
                    view = "date";
                }

                this[view + "View"].close();
            }
        },

        open: function(view) {
            var that = this;
            var popupHovered;

            if (that.options.singlePopup) {

                that.dateView._calendar();

                if (that.timeView.ul.find("li").length < 1) {
                    that.timeView.bind();
                }

                // In some cases when the popup is opened resize is triggered which will cause it to close
                // Setting the below flag will prevent this from happening
                // Reference: https://github.com/telerik/kendo/pull/7553
                popupHovered = that.popup._hovered;
                that.popup._hovered = true;

                that.popup.open();

                if (view === "time") {
                    that._switchToTimeView();
                } else {
                    that._switchToDateView();
                }

                this._dateIcon.toggle(view !== "time");
                this._timeIcon.toggle(view === "time");

                setTimeout(function() {
                    that.popup._hovered = popupHovered;
                }, 1);

            } else {
                if (view !== "time") {
                    view = "date";
                }

                this[view + "View"].open();
            }
        },

        min: function(value) {
            return this._option("min", value);
        },

        max: function(value) {
            return this._option("max", value);
        },

        toggle: function(view) {
            if (this.options.singlePopup) {
                if (this.popup.visible()) {
                    this.close();
                } else {
                    this.open(view);
                }
            } else {
                var secondView = "timeView";

                if (view !== "time") {
                    view = "date";
                } else {
                    secondView = "dateView";
                }

                this[view + "View"].toggle();
                this[secondView].close();
            }

        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);
            if (that._old === null) {
                that.element.val("");
            }

            that._oldText = that.element.val();
        },

        _change: function(value) {
            var that = this,
            oldValue = that.element.val(),
            dateChanged;

            value = that._update(value);
            dateChanged = +that._old != +value;

            var valueUpdated = dateChanged && !that._typing;
            var textFormatted = oldValue !== that.element.val();

            if (valueUpdated || textFormatted) {
                that.element.trigger(CHANGE);
            }

            if (dateChanged) {
                that._old = value;
                that._oldText = that.element.val();

                that.trigger(CHANGE);
            }

            that._typing = false;
        },

        _option: function(option, value) {
            var that = this;
            var options = that.options;
            var timeView = that.timeView;
            var timeViewOptions = timeView.options;
            var current = that._value || that._old;
            var minDateEqual;
            var maxDateEqual;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.parseFormats, options.culture);
            timeViewOptions.maxSet = false;

            if (!value) {
                return;
            }

            if (options.min.getTime() === options.max.getTime()) {
                timeViewOptions.dates = [];
            }

            options[option] = new DATE(value.getTime());
            that.dateView[option](value);

            that._midnight = that._calculateMidnight(options.min, options.max);

            if (current) {
                minDateEqual = isEqualDatePart(options.min, current);
                maxDateEqual = isEqualDatePart(options.max, current);
            }

            if (minDateEqual || maxDateEqual) {
                timeViewOptions[option] = value;

                if (minDateEqual && !maxDateEqual) {
                    timeViewOptions.max = lastTimeOption(options.interval);
                }

                if (maxDateEqual) {
                    if (that._midnight) {
                        timeView.dataBind([MAX]);
                        return;
                    } else if (!minDateEqual) {
                        timeViewOptions.min = MIN;
                        timeViewOptions.maxSet = true;
                    }
                }
            } else {
                timeViewOptions.max = MAX;
                timeViewOptions.min = MIN;
            }

            timeView.bind();
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                dates = options.dates,
                timeView = that.timeView,
                current = that._value,
                date = parse(value, options.parseFormats, options.culture),
                isSameType = (date === null && current === null) || (date instanceof Date && current instanceof Date),
                rebind, timeViewOptions, old, skip, formattedValue;

            if (options.disableDates && options.disableDates(date)) {
                date = null;
                if (!that._old && !that.element.val()) {
                    value = null;
                }
            }

            if (+date === +current && isSameType) {
                formattedValue = kendo.toString(date, options.format, options.culture);

                if (formattedValue !== value ) {
                    that.element.val(date === null ? value : formattedValue);
                    if (value instanceof String) {
                        that.element.trigger(CHANGE);
                    }
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
                timeViewOptions.maxSet = false;

                if (dates[0]) {
                    dates = $.grep(dates, function(d) { return isEqualDatePart(date, d); });

                    if (dates[0]) {
                        timeView.dataBind(dates);
                        skip = true;
                    }
                }

                if (!skip) {
                    if (isEqualDatePart(date, min)) {
                        timeViewOptions.min = min;
                        timeViewOptions.max = lastTimeOption(options.interval);
                        rebind = true;
                    }

                    if (isEqualDatePart(date, max)) {
                        if (that._midnight) {
                            timeView.dataBind([MAX]);
                            skip = true;
                        } else {
                            timeViewOptions.max = max;
                            timeViewOptions.maxSet = true;
                            if (!rebind) {
                                timeViewOptions.min = MIN;
                            }
                            rebind = true;
                        }
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
            if (that._dateInput && date) {
                that._dateInput.value(date || value);
            } else {
                that.element.val(kendo.toString(date || value, options.format, options.culture));
            }
            that._updateARIA(date);

            return date;
        },

        _keydown: function(e) {
            var that = this,
                dateView = that.dateView,
                timeView = that.timeView,
                value = that.element.val(),
                isDateViewVisible = that.options.singlePopup ? that.popup.visible() : dateView.popup.visible();
            var stopPropagation = that._dateInput && e.stopImmediatePropagation;
            if (e.altKey && e.keyCode === kendo.keys.DOWN) {
                that.toggle(isDateViewVisible ? "time" : "date");
            } else if (isDateViewVisible) {
                dateView.move(e);
                that._updateARIA(dateView._current);
            } else if (!that.options.singlePopup && timeView.popup.visible()) {
                timeView.move(e);
            } else if (e.keyCode === kendo.keys.ENTER && value !== that._oldText) {
                that._change(value);
            } else {
                that._typing = true;
                stopPropagation = false;
            }
            if (stopPropagation) {
                e.stopImmediatePropagation();
            }
        },

        _views: function() {
            var that = this,
                element = that.element,
                options = that.options,
                id = element.attr("id"),
                dateView, timeView,
                div, ul, msMin,
                date,
                timeDiv,
                omitPopup,
                timeViewOptions;

            if (options.singlePopup) {
                options.dateDiv = that.popup.element.find(".k-datetime-calendar-wrap");
                timeDiv = that.popup.element.find(".k-datetime-time-wrap");
                options.omitPopup = omitPopup = true;
                timeViewOptions = options.timeView;
            }

            that.dateView = dateView = new kendo.DateView(extend({}, options, {
                id: id,
                anchor: that.wrapper,
                change: function() {
                    var value = that._applyDateValue();

                    if(options.singlePopup){
                        if (!that.timeView._currentlySelected) {
                            that.timeView._currentlySelected = new Date();
                        }
                        that.timeView._currentlySelected.setFullYear(value.getFullYear());
                        that.timeView._currentlySelected.setMonth(value.getMonth());
                        that.timeView._currentlySelected.setDate(value.getDate());
                        that._switchToTimeView();
                        that._toggleIcons();
                    } else {
                        that._change(value);
                        that.close("date");
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE, dateViewParams)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, false);
                        div.attr(ARIA_HIDDEN, true);

                        if (!that.options.singlePopup && !timeView.popup.visible()) {
                            if(element && element.length) {
                                element[0].removeAttribute(ARIA_OWNS);
                            }
                        }
                    }
                },
                open:  function(e) {
                    if (that.trigger(OPEN, dateViewParams)) {
                        e.preventDefault();
                    } else {

                        if (element.val() !== that._oldText) {
                            date = parse(element.val(), options.parseFormats, options.culture);

                            that.dateView[date ? "current" : "value"](date);
                        }

                        div.attr(ARIA_HIDDEN, false);
                        element.attr(ARIA_EXPANDED, true)
                               .attr(ARIA_OWNS, dateView._dateViewID);

                        that._updateARIA(date);
                    }
                }
            }));
            div = dateView.div;

            msMin = options.min.getTime();
            that.timeView = timeView = new TimeView({
                id: id,
                value: options.value,
                anchor: that.wrapper,
                animation: options.animation,
                format: options.timeFormat,
                culture: options.culture,
                height: options.componentType === "modern" ? null : options.height,
                interval: options.interval,
                min: options.componentType === "modern" ? options.min : new DATE(MIN),
                max: options.componentType === "modern" ? options.max : new DATE(MAX),
                dates: msMin === options.max.getTime() ? [new Date(msMin)] : [],
                parseFormats: options.parseFormats,
                validateDate: true,
                change: function(value, trigger) {
                    value = that._applyTimeValue(value);

                    if (trigger) {
                        that._timeSelected = true;
                        that._change(value);
                    } else {
                        element.val(kendo.toString(value, options.format, options.culture));
                        dateView.value(value);
                        that._updateARIA(value);
                    }
                },
                close: function(e) {
                    if (that.trigger(CLOSE, timeViewParams)) {
                        e.preventDefault();
                    } else {
                        ul.attr(ARIA_HIDDEN, true);
                        element.attr(ARIA_EXPANDED, false);

                        if (!dateView.popup.visible()) {
                            if(element && element.length) {
                                element[0].removeAttribute(ARIA_OWNS);
                            }
                        }
                    }
                },
                open:  function(e) {
                    if (that.options.componentType !=="modern") {
                        timeView._adjustListWidth();
                    } else {
                        that.timeView._updateTitle();
                    }

                    if (that.trigger(OPEN, timeViewParams)) {
                        e.preventDefault();
                    } else {
                        if (element.val() !== that._oldText) {
                            date = parse(element.val(), options.parseFormats, options.culture);

                            that.timeView.value(date);
                        }

                        ul.attr(ARIA_HIDDEN, false);
                        element.attr(ARIA_EXPANDED, true)
                               .attr(ARIA_OWNS, timeView._timeViewID);

                        timeView.options.active(timeView.current());
                    }
                },
                active: function(current) {
                    if(element && element.length) {
                        element[0].removeAttribute(ARIA_ACTIVEDESCENDANT);
                    }
                    if (current) {
                        element.attr(ARIA_ACTIVEDESCENDANT, timeView._optionID);
                    }
                },
                popup: options.popup,
                useValueToRender: true,
                specifiedRange: that._specifiedRange,
                omitPopup: omitPopup,
                timeDiv: timeDiv,
                timeView: timeViewOptions,
                messages: that.options.messages
            });
            ul = timeView.ul;
        },

        _applyDateValue: function () {
            var that = this;
            var options = that.options;
            var dateView = that.dateView;
            var value = dateView.calendar.value();
            var msValue = +value;
            var msMin = +options.min;
            var msMax = +options.max;
            var current, adjustedDate;

            if (msValue === msMin || msValue === msMax) {
                current = msValue === msMin ? msMin : msMax;
                current = new DATE(that._value || current);
                current.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());

                if (isInRange(current, msMin, msMax)) {
                    value = current;
                }
            }

            if (that._value) {

                adjustedDate = kendo.date.setHours(new Date(value), that._value);

                if (isInRange(adjustedDate, msMin, msMax)) {
                    value = adjustedDate;
                }
            }

            return value;
        },

        _applyTimeValue: function(value){
            var timeView = this.timeView;
            var options = this.options;

            value = timeView._parse(value);

            if (value < options.min) {
                value = new DATE(+options.min);
                timeView.options.min = value;
            } else if (value > options.max) {
                value = new DATE(+options.max);
                timeView.options.max = value;
            }

            return value;
        },

        _icons: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var icons;

            icons = element.next("span.k-select");

            if (!icons[0]) {
                icons = $('<span unselectable="on" class="k-select">' +
                            '<span class="k-link k-link-date" aria-label="' + options.dateButtonText + '"><span unselectable="on" class="k-icon k-i-calendar"></span></span>' +
                            '<span class="k-link k-link-time" aria-label="' + options.timeButtonText + '"><span unselectable="on" class="k-icon k-i-clock"></span></span>' +
                          '</span>'
                         ).insertAfter(element);
            }

            icons = icons.children();

            that._dateIcon = icons.eq(0).attr("aria-controls", that.dateView._dateViewID);
            that._timeIcon = icons.eq(1).attr("aria-controls", that.timeView._timeViewID);

            if (options.singlePopup) {
                that._timeIcon.hide();
            }
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

            that.wrapper = wrapper.addClass("k-widget k-datetimepicker")
                .addClass(element[0].className).removeClass('input-validation-error');

            that._inputWrapper = $(wrapper[0].firstChild);
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                form = formId ? $("#" + formId) : element.closest("form"),
                options = that.options,
                disabledDate = options.disableDates,
                parseFormats = options.parseFormats.length ? options.parseFormats : null,
                optionsValue = that._initialOptions.value,
                initialValue = element[0].defaultValue;

            if (optionsValue && (disabledDate && disabledDate(optionsValue))) {
                optionsValue = null;
            }

            if ((!initialValue || !kendo.parseDate(initialValue, parseFormats, options.culture)) && optionsValue) {
                element.attr("value", kendo.toString(optionsValue, options.format, options.culture));
            }

            if (form[0]) {
                that._resetHandler = function() {
                    that.value(optionsValue || element[0].defaultValue);
                    that.max(that._initialOptions.max);
                    that.min(that._initialOptions.min);
                };

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _template: function() {
            this._ariaTemplate = kendo.template(this.options.ARIATemplate);
        },

        _createDateInput: function(options) {
            if (this._dateInput) {
                this._dateInput.destroy();
                this._dateInput = null;
            }

            if (options.dateInput ) {
                this._dateInput = new ui.DateInput(this.element, {
                    culture: options.culture,
                    format: options.format,
                    min: options.min,
                    max: options.max,
                    interval: options.interval
                });
            }
        },

        _calculateMidnight: function(min, max) {
            return getMilliseconds(min) + getMilliseconds(max) === 0;
        },

        _updateARIA: function(date) {
            var that = this;
            var calendar = that.dateView.calendar;

            if (that.element && that.element.length) {
                that.element[0].removeAttribute(ARIA_ACTIVEDESCENDANT);
            }

            if (calendar) {
                that.element.attr(ARIA_ACTIVEDESCENDANT, calendar._updateAria(that._ariaTemplate, date));
            }
        },
        _popup: function(){
            var that = this;
            var options = that.options;
            var div = $("<div></div>").attr(ARIA_HIDDEN, "true")
                .addClass("k-datetime-container k-group k-reset")
                .appendTo(document.body);

            div.append(kendo.template(SINGLE_POPUP_TEMPLATE)(that.options));
            that.popup = new ui.Popup(div, extend(options.popup, options, {
                name: "Popup",
                isRtl: kendo.support.isRtl(that.wrapper),
                anchor: that.wrapper,
                activate: function () {
                    if (that.options.timeView && that.options.timeView.list === "scroll") {
                        that.timeView.addTranslate();
                        that.timeView.applyValue(that._value);
                        that.timeView._updateRanges();
                    }
                },
                open: function(e){
                    if (that.trigger(OPEN, {view: this.element.find('.k-date-tab').length ? 'date' : 'time', sender: that})) {
                        e.preventDefault();
                    }
                    that.timeView._updateTitle();
                }
            }));

            div.on(CLICK + ns, ".k-datetime-buttongroup .k-button", $.proxy(that._groupChangeClick, that));
            div.on(CLICK + ns, ".k-datetime-footer button.k-time-cancel", $.proxy(that._cancelClickHandler, that));
            div.on(CLICK + ns, ".k-datetime-footer button.k-time-accept", $.proxy(that._setClickHandler, that));
        },

        _groupChangeClick: function(e) {
            preventDefault(e);
            var button =  $(e.currentTarget);
            var index = button.index();

            if (index) {
                this._switchToTimeView();
            } else {
                this._switchToDateView();
            }
            this._toggleIcons();
        },

        _switchToDateView: function() {
            this.popup.element.find(".k-group-start, .k-group-end").removeClass(STATE_ACTIVE).eq(0).addClass(STATE_ACTIVE);
            this.popup.element.find(".k-datetime-wrap").removeClass("k-time-tab").addClass("k-date-tab");
        },

        _switchToTimeView: function() {
            this.timeView.addTranslate();
            this.timeView.applyValue(this._value);
            this.timeView._updateRanges();
            this.popup.element.find(".k-group-start, .k-group-end").removeClass(STATE_ACTIVE).eq(1).addClass(STATE_ACTIVE);
            this.popup.element.find(".k-datetime-wrap").removeClass("k-date-tab").addClass("k-time-tab");
        },

        _toggleIcons: function() {
            this._dateIcon.toggle();
            this._timeIcon.toggle();
        },

        _cancelClickHandler: function () {
            if (this._value) {
                this.value(this._value);
                this.dateView.value(this._value);
            }
            this.popup.close();
        },

        _setClickHandler: function() {
            var value = this._applyDateValue();
            var time;

            value = value || new Date();
            time = this.timeView._currentlySelected || value;
            this.timeView._updateCurrentlySelected();
            value.setHours(time.getHours());
            value.setMinutes(time.getMinutes());
            value.setSeconds(time.getSeconds());
            value = this._applyTimeValue(value);

            this._change(value);
            this.popup.close();
        }
    });

    function lastTimeOption(interval) {
        var date = new Date(2100, 0, 1);
        date.setMinutes(-interval);
        return date;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function normalize(options) {
        var patterns = kendo.getCulture(options.culture).calendars.standard.patterns,
            parseFormats = !options.parseFormats.length,
            timeFormat;

        options.format = extractFormat(options.format || patterns.g);
        options.timeFormat = timeFormat = extractFormat(options.timeFormat || patterns.t);
        kendo.DateView.normalize(options);

        if (parseFormats) {
           options.parseFormats.unshift("yyyy-MM-ddTHH:mm:ss");
        }

        if ($.inArray(timeFormat, options.parseFormats) === -1) {
            options.parseFormats.push(timeFormat);
        }
    }

    ui.plugin(DateTimePicker);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
