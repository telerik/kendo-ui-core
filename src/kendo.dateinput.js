(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "dateinput",
    name: "DateInput",
    category: "web",
    description: "The DateInput widget allows to edit date by typing.",
    depends: [ "core" ]
};

(function ($, undefined) {
    var global = window;
    var kendo = global.kendo;
    var caret = kendo.caret;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var keys = kendo.keys;
    var ns = ".kendoDateInput";
    var proxy = $.proxy;
    var objectToString = {}.toString;

    var INPUT_EVENT_NAME = (kendo.support.propertyChangeEvent ? "propertychange.kendoDateInput input" : "input") + ns;

    var STATEDISABLED = "k-state-disabled";
    var STATEDEFAULT = "k-state-default";
    // var STATEFOCUSED = "k-state-focused";
    // var STATEHOVER = "k-state-hover";
    var STATEINVALID = "k-state-invalid";

    var DISABLED = "disabled";
    var READONLY = "readonly";
    var CHANGE = "change";

    var knownSymbols = "dMyHhmftsz";

    var DateInput = Widget.extend({
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);
            element = that.element;

            options = that.options;
            options.format = kendo._extractFormat(options.format || kendo.getCulture(options.culture).calendars.standard.patterns.d);
            options.min = kendo.parseDate(element.attr("min")) || kendo.parseDate(options.min);
            options.max = kendo.parseDate(element.attr("max")) || kendo.parseDate(options.max);
            
            var insidePicker = ((element.parent().attr("class") || "").indexOf("k-picker-wrap") >= 0);
            if (insidePicker) {
                that.wrapper = element.parent();
            } else {
                that.wrapper = element.wrap("<span class='k-widget k-dateinput'></span>").parent();
                that.wrapper.addClass(element[0].className);
                that.wrapper[0].style.cssText = element[0].style.cssText;
                element.css({
                    width: "100%",
                    height: element[0].style.height
                });
            }
            $("<span class='k-icon k-i-warning'></span>").insertAfter(element);

            that._form();

            that.element
                .addClass(insidePicker ? " " : "k-textbox")
                .attr("autocomplete", "off")
                .on("focusout" + ns, function () {
                    that._change();
                });

            try {
                element[0].setAttribute("type", "text");
            } catch (e) {
                element[0].type = "text";
            }

            var disabled = element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');

            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(element.is("[readonly]"));
            }

            that.value(that.options.value || element.val());

            kendo.notify(that);
        },

        options: {
            name: "DateInput",
            culture: "",
            value: "",
            format: "",
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            messages: {
                "year": "year",
                "month": "month",
                "day": "day",
                "weekday": "day of the week",
                "hour": "hours",
                "minute": "minutes",
                "second": "seconds",
                "dayperiod": "AM/PM"
            }
        },

        events: [
            CHANGE
        ],

        min: function (value) {
            if (value !== undefined) {
                this.options.min = value;
            } else {
                return this.options.min;
            }
        },

        max: function (value) {
            if (value !== undefined) {
                this.options.max = value;
            } else {
                return this.options.max;
            }
        },

        setOptions: function (options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);
            this._unbindInput();
            this._bindInput();
            this._updateElementValue();
        },

        destroy: function () {
            var that = this;
            that.element.off(ns);

            if (that._formElement) {
                that._formElement.off("reset", that._resetHandler);
            }

            Widget.fn.destroy.call(that);
        },

        value: function (value) {
            if (value === undefined) {
                return this._dateTime.getDateObject();
            }

            if (value === null) {
                value = "";
            }

            if (objectToString.call(value) !== "[object Date]") {
                value = kendo.parseDate(value, this.options.format, this.options.culture);
            }

            if (value && !value.getTime()) {
                value = null;
            }

            this._dateTime = new customDateTime(value, this.options.format, this.options.culture, this.options.messages);

            this._updateElementValue();
            this._oldValue = value;
        },

        _updateElementValue: function () {
            var stringAndFromat = this._dateTime.toPair(this.options.format, this.options.culture, this.options.messages);
            this.element.val(stringAndFromat[0]);
            this._oldText = stringAndFromat[0];
            this._format = stringAndFromat[1];
        },

        readonly: function (readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function (enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _bindInput: function () {
            var that = this;
            that.element
                .on("paste" + ns, proxy(that._paste, that))
                .on("keydown" + ns, proxy(that._keydown, that))
                .on(INPUT_EVENT_NAME, proxy(that._input, that))
                .on("mouseup" + ns, proxy(that._mouseUp, that))
                .on("DOMMouseScroll" + ns + " mousewheel" + ns, proxy(that._scroll, that));
        },

        _unbindInput: function () {
            this.element
                .off("keydown" + ns)
                .off("paste" + ns)
                .off(INPUT_EVENT_NAME)
                .off("mouseup" + ns)
                .off("DOMMouseScroll" + ns + " mousewheel" + ns);
        },

        _editable: function (options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;
            var wrapper = that.wrapper;

            that._unbindInput();

            if (!readonly && !disable) {
                wrapper.addClass(STATEDEFAULT)
                    .removeClass(STATEDISABLED);

                element.removeAttr(DISABLED)
                    .removeAttr(READONLY);

                that._bindInput();
            } else {
                if (disable) {
                    wrapper.addClass(STATEDISABLED)
                    .removeClass(STATEDEFAULT);
                    element.attr(DISABLED, disable);
                    element.removeAttr(READONLY);
                }
                if (readonly) {
                    element.attr(READONLY, readonly);
                }
            }
        },

        _change: function () {
            var that = this;
            var oldValue = that._oldValue;
            var value = that.value();

            if (value && that.min() && value < that.min()) {
                that.value(that.min());
                value = that.value();
            }
            if (value && that.max() && value > that.max()) {
                that.value(that.max());
                value = that.value();
            }

            if (oldValue && value && value.getTime() !== oldValue.getTime() ||
                oldValue && !value ||
                !oldValue && value
            ) {
                that._oldValue = value;
                that.trigger(CHANGE);
                that.element.trigger(CHANGE);
            }
        },

        _input: function () {
            var that = this;
            var element = that.element[0];
            var blinkInvalid = false;

            if (kendo._activeElement() !== element) {
                return;
            }

            var diff = approximateStringMatching(
                this._oldText,
                this._format,
                this.element[0].value,
                caret(this.element[0])[0]);

            var navigationOnly = (diff.length === 1 && diff[0][1] === " ");
            if (!navigationOnly) {
                for (var i = 0; i < diff.length; i++) {
                    var valid = this._dateTime.parsePart(diff[i][0], diff[i][1]);
                    blinkInvalid = blinkInvalid || !valid;
                }
            }
            this._updateElementValue();

            if (diff.length && diff[0][0] !== " ") {
                this._selectSegment(diff[0][0]);

                //android fix
                if (!navigationOnly) {
                    var difSym = diff[0][0];
                    setTimeout(function () { that._selectSegment(difSym); });
                }
            }
            if (navigationOnly) {
                var newEvent = { keyCode: 39, preventDefault: function () { } };
                this._keydown(newEvent);
            }
            if (blinkInvalid) {
                clearTimeout(that._blinkInvalidTimeout);
                var stateInvalid = STATEINVALID;
                that.wrapper.addClass(STATEINVALID);
                that._blinkInvalidTimeout = setTimeout(function () { that.wrapper.removeClass(stateInvalid); }, 100);
            }
        },

        _mouseUp: function () {
            var selection = caret(this.element[0]);
            if (selection[0] === selection[1]) {
                this._selectNearestSegment();
            }
        },

        _scroll: function (e) {
            if (kendo._activeElement() !== this.element[0] || this.element.is("[readonly]")) {
                return;
            }
            e = window.event || e;

            var newEvent = { keyCode: 37, preventDefault: function () { } };

            if (e.shiftKey) {
                newEvent.keyCode = (e.wheelDelta || -e.detail) > 0 ? 37 : 39;
            } else {
                newEvent.keyCode = (e.wheelDelta || -e.detail) > 0 ? 38 : 40;
            }
            this._keydown(newEvent);
            e.returnValue = false;
            if (e.preventDefault) {
                e.preventDefault();
            }
            if (e.stopPropagation) {
                e.stopPropagation();
            }
        },

        _form: function () {
            var that = this;
            var element = that.element;
            var formId = element.attr("form");
            var form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function () {
                    setTimeout(function () {
                        that.value(element[0].value);
                    });
                };

                that._formElement = form.on("reset", that._resetHandler);
            }
        },

        _paste: function (e) {
            e.preventDefault();
        },

        _keydown: function (e) {
            var key = e.keyCode;
            var selection;
            if (key == 37 || key == 39) { //left/right
                e.preventDefault();
                selection = caret(this.element[0]);
                if (selection[0] != selection[1]) {
                    this._selectNearestSegment();
                }
                var dir = (key == 37) ? -1 : 1;
                var index = (dir == -1) ? caret(this.element[0])[0] - 1 : caret(this.element[0])[1] + 1;
                while (index >= 0 && index < this._format.length) {
                    if (knownSymbols.indexOf(this._format[index]) >= 0) {
                        this._selectSegment(this._format[index]);
                        break;
                    }
                    index += dir;
                }
            }
            if (key == 38 || key == 40) { //up/down
                e.preventDefault();
                selection = caret(this.element[0]);
                var symbol = this._format[selection[0]];
                if (knownSymbols.indexOf(symbol) >= 0) {
                    this._dateTime.modifyPart(symbol, key == 38 ? 1 : -1);
                    this._updateElementValue();
                    this._selectSegment(symbol);
                }
            }
            if (kendo.support.browser.msie && kendo.support.browser.version < 10) {
                var keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode === 8 || keycode === 46) {
                    var that = this;
                    setTimeout(function () {
                        that._input();
                    }, 0);
                }
            }
            if (key === keys.ENTER){
                this._change();
            }
        },

        _selectNearestSegment: function () {
            var selection = caret(this.element[0]);
            var start = selection[0];
            for (var i = start, j = start - 1; i < this._format.length || j >= 0; i++ , j--) {
                if (i < this._format.length && knownSymbols.indexOf(this._format[i]) !== -1) {
                    this._selectSegment(this._format[i]);
                    return;
                }
                if (j >= 0 && knownSymbols.indexOf(this._format[j]) !== -1) {
                    this._selectSegment(this._format[j]);
                    return;
                }
            }
        },

        _selectSegment: function (symbol) {
            var begin = -1, end = 0;
            for (var i = 0; i < this._format.length; i++) {
                if (this._format[i] === symbol) {
                    end = i + 1;
                    if (begin === -1) {
                        begin = i;
                    }
                }
            }
            if (begin < 0) {
                begin = 0;
            }
            caret(this.element, begin, end);
        }

    });

    ui.plugin(DateInput);

    var customDateTime = function (initDate, initFormat, initCulture, initMessages) {

        var value = null;
        var year = true, month = true, date = true, hours = true, minutes = true, seconds = true, milliseconds = true;
        var typedMonthPart = "";
        var typedDayPeriodPart = "";
        var placeholders = {};

        //TODO: rewrite pad method
        var zeros = ["", "0", "00", "000", "0000"];
        function pad(number, digits, end) {
            number = number + "";
            digits = digits || 2;
            end = digits - number.length;

            if (end) {
                return zeros[digits].substring(0, end) + number;
            }

            return number;
        }
        var dateFormatRegExp = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|H|hh|h|mm|m|fff|ff|f|tt|ss|s|zzz|zz|z|"[^"]*"|'[^']*'/g;
        var months = null, calendar = null, days = null, returnsFormat = false;
        var matcher = function (match) {
            var mins, sign;
            var result;

            switch (match) {
                case ("d"): result = date ? value.getDate() : placeholders.day; break;
                case ("dd"): result = date ? pad(value.getDate()) : placeholders.day; break;
                case ("ddd"): result = date && month && year ? days.namesAbbr[value.getDay()] : placeholders.weekday; break;
                case ("dddd"): result = date && month && year ? days.names[value.getDay()] : placeholders.weekday; break;

                case ("M"): result = month ? value.getMonth() + 1 : placeholders.month; break;
                case ("MM"): result = month ? pad(value.getMonth() + 1) : placeholders.month; break;
                case ("MMM"): result = month ? months.namesAbbr[value.getMonth()] : placeholders.month; break;
                case ("MMMM"): result = month ? months.names[value.getMonth()] : placeholders.month; break;

                case ("yy"): result = year ? pad(value.getFullYear() % 100) : placeholders.year; break;
                case ("yyyy"): result = year ? pad(value.getFullYear(), 4) : placeholders.year; break;

                case ("h"): result = hours ? value.getHours() % 12 || 12 : placeholders.hour; break;
                case ("hh"): result = hours ? pad(value.getHours() % 12 || 12) : placeholders.hour; break;
                case ("H"): result = hours ? value.getHours() : placeholders.hour; break;
                case ("HH"): result = hours ? pad(value.getHours()) : placeholders.hour; break;

                case ("m"): result = minutes ? value.getMinutes() : placeholders.minute; break;
                case ("mm"): result = minutes ? pad(value.getMinutes()) : placeholders.minute; break;
                case ("s"): result = seconds ? value.getSeconds() : placeholders.second; break;
                case ("ss"): result = seconds ? pad(value.getSeconds()) : placeholders.second; break;
                case ("f"): result = milliseconds ? Math.floor(value.getMilliseconds() / 100) : milliseconds; break;
                case ("ff"):
                    result = value.getMilliseconds();
                    if (result > 99) {
                        result = Math.floor(result / 10);
                    }
                    result = milliseconds ? pad(result) : match;
                    break;
                case ("fff"): result = milliseconds ? pad(value.getMilliseconds(), 3) : match; break;
                case ("tt"): result = hours ? (value.getHours() < 12 ? calendar.AM[0] : calendar.PM[0]) : placeholders.dayperiod; break;
                case ("zzz"):
                    mins = value.getTimezoneOffset();
                    sign = mins < 0;
                    result = Math.abs(mins / 60).toString().split(".")[0];
                    mins = Math.abs(mins) - (result * 60);
                    result = (sign ? "+" : "-") + pad(result);
                    result += ":" + pad(mins);
                    break;
                case ("z"):
                case ("zz"):
                    result = value.getTimezoneOffset() / 60;
                    sign = result < 0;
                    result = Math.abs(result).toString().split(".")[0];
                    result = (sign ? "+" : "-") + (match === "zz" ? pad(result) : result);
                    break;
            }
            result = (result !== undefined ? result : match.slice(1, match.length - 1));

            if (returnsFormat) {
                result = "" + result;
                var formatResult = "";
                if (match == "ddd") { match = "EEE"; }
                if (match == "dddd") { match = "EEEE"; }
                for (var i = 0; i < result.length; i++) {
                    formatResult += match[0];
                }
                return formatResult;
            } else {
                return result;
            }
        };

        function generateMatcher(retFormat) {
            returnsFormat = retFormat;
            return matcher;
        }

        function setExisting(symbol, val) {
            switch (symbol) {
                case "y": year = val; break;
                case "M": month = val;
                    if (!val) {
                        value.setMonth(0);
                        typedMonthPart = "";
                    }
                    break;
                case "d": date = val; break;
                case "H":
                case "h": hours = val;
                    if (!val) {
                        typedDayPeriodPart = "";
                    }
                    break;
                case "m": minutes = val; break;
                case "s": seconds = val; break;
                default: return;
            }
        }

        this.setValue = function (val) {
            date = val;
        };

        this.getValue = function () {
            return date;
        };

        this.modifyPart = function (symbol, offset) {
            var newValue = new Date((value && value.getTime) ? value.getTime() : value);
            switch (symbol) {
                case "y": newValue.setFullYear(newValue.getFullYear() + offset); break;
                case "M":
                    var newMonth = newValue.getMonth() + offset;
                    newValue.setMonth(newMonth);
                    if (newValue.getMonth() % 12 !== (newMonth + 12) % 12) {
                        //handle case when new month does not have such date
                        newValue.setDate(1);
                        newValue.setMonth(newMonth);
                    }
                    break;
                case "d":
                case "E": newValue.setDate(newValue.getDate() + offset); break;
                case "H":
                case "h": newValue.setHours(newValue.getHours() + offset); break;
                case "m": newValue.setMinutes(newValue.getMinutes() + offset); break;
                case "s": newValue.setSeconds(newValue.getSeconds() + offset); break;
                case "t": newValue.setHours((newValue.getHours() + 12) % 24); break;
                default: break;
            }
            if (newValue.getFullYear() > 0) {
                setExisting(symbol, true);
                value = newValue;
            }
        };

        this.parsePart = function (symbol, currentChar) {
            if (!currentChar) {
                setExisting(symbol, false);
                return true;
            }
            var newValue = new Date((value && value.getTime) ? value.getTime() : value);
            var newHours;
            switch (symbol) {
                case "d":
                    var newDate = (date ? newValue.getDate() * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newDate)) { return; }
                    while (newDate > 31) {
                        newDate = parseInt(newDate.toString().slice(1), 10);
                    }
                    if (newDate < 1) {
                        date = false;
                    } else {
                        newValue.setDate(newDate);
                        if (newValue.getMonth() !== value.getMonth()) {
                            return;
                        }
                        date = true;
                    }
                    break;
                case "M":
                    var newMonth = (month ? (newValue.getMonth() + 1) * 10 : 0) + parseInt(currentChar, 10);
                    if (!isNaN(newMonth)) {
                        while (newMonth > 12) {
                            newMonth = parseInt(newMonth.toString().slice(1), 10);
                        }
                        if (newMonth < 1) {
                            month = false;
                        } else {
                            newValue.setMonth(newMonth - 1);
                            if (newValue.getMonth() !== newMonth - 1) {
                                newValue.setDate(1);
                                newValue.setMonth(newMonth - 1);
                            }
                            month = true;
                        }
                    }
                    else {
                        var monthNames = calendar.months.names;
                        typedMonthPart += currentChar.toLowerCase();

                        while (typedMonthPart.length > 0) {
                            for (var i = 0; i < monthNames.length; i++) {
                                if (monthNames[i].toLowerCase().indexOf(typedMonthPart) === 0) {
                                    newValue.setMonth(i);
                                    month = true;
                                    value = newValue;
                                    return true;
                                }
                            }
                            typedMonthPart = typedMonthPart.substring(1, typedMonthPart.length);
                        }
                        return false;
                    }
                    break;
                case "y":
                    var newYear = (year ? (newValue.getFullYear()) * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newYear)) {return;}
                    while (newYear > 9999) {
                        newYear = parseInt(newYear.toString().slice(1), 10);
                    }
                    if (newYear < 1) {
                        year = false;
                    } else {
                        newValue.setFullYear(newYear);
                        year = true;
                    }
                    break;
                case "h":
                    newHours = (hours ? (newValue.getHours() % 12 || 12) * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newHours)) { return; }
                    while (newHours > 12) {
                        newHours = parseInt(newHours.toString().slice(1), 10);
                    }
                    newValue.setHours(Math.floor(newValue.getHours() / 12) * 12 + newHours % 12);
                    hours = true;
                    break;
                case "H":
                    newHours = (hours ? (newValue.getHours()) * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newHours)) { return; }
                    while (newHours > 23) {
                        newHours = parseInt(newHours.toString().slice(1), 10);
                    }
                    newValue.setHours(newHours);
                    hours = true;
                    break;
                case "m":
                    var newMinutes = (minutes ? (newValue.getMinutes()) * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newMinutes)) { return; }
                    while (newMinutes > 59) {
                        newMinutes = parseInt(newMinutes.toString().slice(1), 10);
                    }
                    newValue.setMinutes(newMinutes);
                    minutes = true;
                    break;
                case "s":
                    var newSeconds = (seconds ? (newValue.getSeconds()) * 10 : 0) + parseInt(currentChar, 10);
                    if (isNaN(newSeconds)) { return; }
                    while (newSeconds > 59) {
                        newSeconds = parseInt(newSeconds.toString().slice(1), 10);
                    }
                    newValue.setSeconds(newSeconds);
                    seconds = true;
                    break;
                case "t":
                    if (hours) {
                        typedDayPeriodPart += currentChar.toLowerCase();
                        while (typedDayPeriodPart.length > 0) {
                            if (calendar.AM[0].toLowerCase().indexOf(typedDayPeriodPart) === 0 && newValue.getHours() >= 12 ||
                                calendar.PM[0].toLowerCase().indexOf(typedDayPeriodPart) === 0 && newValue.getHours() < 12) {
                                newValue.setHours((newValue.getHours() + 12) % 24);
                                value = newValue;
                                return true;
                            }
                            typedDayPeriodPart = typedDayPeriodPart.substring(1, typedDayPeriodPart.length);
                        }
                        return false;
                    }
                    break;
                default: break;
            }
            value = newValue;
            return true;
        };

        this.toPair = function (format, culture , messages) {
            if (!format) {
                return ["", ""];
            }
            culture = kendo.getCulture(culture);
            calendar = culture.calendars.standard;
            format = calendar.patterns[format] || format;
            days = calendar.days;
            months = calendar.months;
            placeholders = messages;
            return [
                format.replace(dateFormatRegExp, generateMatcher(false)),
                format.replace(dateFormatRegExp, generateMatcher(true))
            ];
        };

        this.getDateObject = function () {
            return (year && month && date && hours && minutes && seconds && milliseconds) ?
                new Date(value.getTime()) : null;
        };

        if (!initDate) {
            value = new Date();
            var sampleFormat = this.toPair(initFormat, initCulture, initMessages)[1];
            for (var i = 0; i < sampleFormat.length; i++) {
                setExisting(sampleFormat[i], false);
            }
        } else {
            value = new Date(initDate.getTime());
        }
    };

    function approximateStringMatching(oldText, oldFormat, newText, caret){
        var oldTextSeparator = oldText[caret + oldText.length - newText.length];
        oldText = oldText.substring(0, caret + oldText.length - newText.length);
        newText = newText.substring(0, caret);
        var diff = [];
        var i;
        //handle typing single character over the same selection
        if (oldText === newText && caret > 0) {
            diff.push([oldFormat[caret - 1], newText[caret - 1]]);
            return diff;
        }
        if (oldText.indexOf(newText) === 0 && (newText.length === 0 || oldFormat[newText.length - 1] !== oldFormat[newText.length])) {
            //handle delete/backspace
            var deletedSymbol = "";
            for (i = newText.length; i < oldText.length; i++) {
                if (oldFormat[i] !== deletedSymbol && knownSymbols.indexOf(oldFormat[i]) >= 0) {
                    deletedSymbol = oldFormat[i];
                    diff.push([deletedSymbol, ""]);
                }
            }
            return diff;
        }

        //handle entering space or separator, for nagivation to next item
        if (newText[newText.length - 1] === " " || newText[newText.length - 1] === oldTextSeparator) {
            return [[oldFormat[caret - 1], " "]];
        }

        //handle inserting text (new text is longer than previous)
        //handle typing over literal as well
        if (newText.indexOf(oldText) === 0 || knownSymbols.indexOf(oldFormat[caret - 1]) === -1) {
            var symbol = oldFormat[0];
            for (i = Math.max(0, oldText.length - 1); i < oldFormat.length; i++) {
                if (knownSymbols.indexOf(oldFormat[i]) >= 0) {
                    symbol = oldFormat[i];
                    break;
                }
            }
            return [[symbol, newText[caret - 1]]];
        }
        //handle typing over correctly selected part
        return [[oldFormat[caret - 1], newText[caret - 1]]];
}

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
