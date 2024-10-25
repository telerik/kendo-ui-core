// The current file development is no longer in active phase but the code will be kept as is.
// Please be advised that we have discontinued the sync for this file with the commercial version of Kendo UI for jQuery.
// To take advantage of new features please visit (https://www.telerik.com/kendo-jquery-ui) and consider upgrading to a commercial license.import "./kendo.calendar.js";
import "./kendo.popup.js";
import "./kendo.dateinput.js";
import "./kendo.html.button.js";
import "./kendo.label.js";

var __meta__ = {
    id: "datepicker",
    name: "DatePicker",
    category: "web",
    description: "The DatePicker widget allows the user to select a date from a calendar or by direct input.",
    depends: [ "calendar", "popup", "html.button", "label" ]
};

(function($, undefined) {
    var kendo = window.kendo,
    ui = kendo.ui,
    html = kendo.html,
    Widget = ui.Widget,
    parse = kendo.parseDate,
    keys = kendo.keys,
    support = kendo.support,
    template = kendo.template,
    activeElement = kendo._activeElement,
    DIV = "<div />",
    SPAN = "<span />",
    ns = ".kendoDatePicker",
    CLICK = "click" + ns,
    UP = support.mouseAndTouchPresent ? kendo.applyEventMap("up", ns.slice(1)) : CLICK,
    OPEN = "open",
    CLOSE = "close",
    CHANGE = "change",
    DISABLED = "disabled",
    READONLY = "readonly",
    FOCUSED = "k-focus",
    SELECTED = "k-selected",
    STATEDISABLED = "k-disabled",
    HOVER = "k-hover",
    HOVEREVENTS = "mouseenter" + ns + " mouseleave" + ns,
    MOUSEDOWN = "mousedown" + ns,
    NAVIGATE = "navigate",
    ID = "id",
    MIN = "min",
    MAX = "max",
    MONTH = "month",
    ARIA_DISABLED = "aria-disabled",
    ARIA_READONLY = "aria-readonly",
    ARIA_EXPANDED = "aria-expanded",
    ARIA_HIDDEN = "aria-hidden",
    ARIA_ACTIVEDESCENDANT = "aria-activedescendant",
    calendar = kendo.calendar,
    isInRange = calendar.isInRange,
    restrictValue = calendar.restrictValue,
    isEqualDatePart = calendar.isEqualDatePart,
    extend = $.extend,
    DATE = Date;

    function normalize(options) {
        var parseFormats = options.parseFormats,
            format = options.format;

        calendar.normalize(options);

        parseFormats = Array.isArray(parseFormats) ? parseFormats : [parseFormats];

        if (!parseFormats.length) {
            parseFormats.push("yyyy-MM-dd");
        }

        if ($.inArray(format, parseFormats) === -1) {
            parseFormats.splice(0, 0, options.format);
        }

        options.parseFormats = parseFormats;
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    var DateView = function(options) {
        var that = this, id,
            body = document.body,
            div = $(DIV).attr(ARIA_HIDDEN, "true")
                        .addClass("k-calendar-container");

        that.options = options = options || {};
        id = options.id;

        if (!options.omitPopup) {
            div.appendTo(body);
            that.popup = new ui.Popup(div, extend(options.popup, options, { name: "Popup", isRtl: kendo.support.isRtl(options.anchor) }));
        } else {
            div = options.dateDiv;
        }
        if (id) {
            id += "_dateview";

            div.attr(ID, id);
            that._dateViewID = id;
        }
        that.div = div;

        that.value(options.value);
    };

    DateView.prototype = {
        _calendar: function() {
            var that = this;
            var calendar = that.calendar;
            var options = that.options;
            var div;

            if (!calendar) {
                div = $(DIV).attr(ID, kendo.guid())
                            .appendTo(options.omitPopup ? options.dateDiv : that.popup.element)
                            .on(MOUSEDOWN, preventDefault)
                            .on(CLICK, "td:has(.k-link)", that._click.bind(that));

                that.calendar = calendar = new ui.Calendar(div, {
                    componentType: options.componentType,
                    size: options.size,
                    messages: options.messages
                });
                that._setOptions(options);

                div.addClass(kendo.getValidCssClass("k-calendar-", "size", options.size));

                calendar.navigate(that._value || that._current, options.start);

                that.value(that._value);
            }
        },

        _setOptions: function(options) {
            this.calendar.setOptions({
                focusOnNav: false,
                change: options.change,
                culture: options.culture,
                dates: options.dates,
                depth: options.depth,
                footer: options.footer,
                format: options.format,
                max: options.max,
                min: options.min,
                month: options.month,
                weekNumber: options.weekNumber,
                start: options.start,
                messages: options.messages,
                disableDates: options.disableDates
            });
        },

        setOptions: function(options) {
            var that = this;
            var old = that.options;
            var disableDates = options.disableDates;

            if (disableDates) {
                options.disableDates = calendar.disabled(disableDates);
            }

            that.options = extend(old, options, {
                change: old.change,
                close: old.close,
                open: old.open
            });

            if (that.calendar) {
                that._setOptions(that.options);
            }
        },

        destroy: function() {
            if (this.popup) {
                this.popup.destroy();
            }
        },

        open: function() {
            var that = this;
            var popupHovered;

            that._calendar();

            // In some cases when the popup is opened resize is triggered which will cause it to close
            // Setting the below flag will prevent this from happening
            // Reference: https://github.com/telerik/kendo/pull/7553
            popupHovered = that.popup._hovered;
            that.popup._hovered = true;

            that.popup.open();

            setTimeout(function() {
                that.popup._hovered = popupHovered;
            }, 1);
        },

        close: function() {
            if (this.popup) {
                this.popup.close();
            }
        },

        min: function(value) {
            this._option(MIN, value);
        },

        max: function(value) {
            this._option(MAX, value);
        },

        toggle: function() {
            var that = this;

            that[that.popup.visible() ? CLOSE : OPEN]();
        },

        move: function(e) {
            var that = this,
                key = e.keyCode,
                calendar = that.calendar,
                selectIsClicked = e.ctrlKey && key == keys.DOWN || key == keys.ENTER,
                handled = false;

            if (e.altKey) {
                if (key == keys.DOWN) {
                    that.open();
                    e.preventDefault();
                    handled = true;
                } else if (key == keys.UP) {
                    that.close();
                    e.preventDefault();
                    handled = true;
                }

            } else if (that.popup && that.popup.visible()) {

                if (key == keys.ESC || (selectIsClicked && calendar._cell.hasClass(SELECTED))) {
                    that.close();
                    e.preventDefault();
                    return true;
                }
                //spacebar selects a date in the calendar
                if (key != keys.SPACEBAR) {
                    that._current = calendar._move(e);
                }

                handled = true;
            }

            return handled;
        },

        current: function(date) {
            this._current = date;
            if (this.calendar) {
                this.calendar._focus(date);
            }
        },

        value: function(value) {
            var that = this,
                calendar = that.calendar,
                options = that.options,
                disabledDate = options.disableDates;

            if (disabledDate && disabledDate(value)) {
                value = null;
            }

            that._value = value;
            that._current = new DATE(+restrictValue(value, options.min, options.max));

            if (calendar) {
                calendar.value(value);
            }
        },

        _click: function(e) {

            if (e.currentTarget.className.indexOf(SELECTED) !== -1) {
                this.calendar.trigger("change");
                this.close();
            }
        },

        _option: function(option, value) {
            var that = this;
            var calendar = that.calendar;

            that.options[option] = value;

            if (calendar) {
                calendar[option](value);
            }
        }
    };

    DateView.normalize = normalize;

    kendo.DateView = DateView;

    var DatePicker = Widget.extend({
        init: function(element, options) {
            var that = this,
                initialValue,
                disabled,
                div;

            Widget.fn.init.call(that, element, options);
            element = that.element;
            options = that.options;

            options.disableDates = kendo.calendar.disabled(options.disableDates);

            options.min = parse(element.attr("min")) || parse(options.min);
            options.max = parse(element.attr("max")) || parse(options.max);

            that.options.readonly = options.readonly !== undefined ? options.readonly : Boolean(that.element.attr("readonly"));
            that.options.enable = options.enable !== undefined ? options.enable : !(Boolean(element.is("[disabled]") || $(element).parents("fieldset").is(':disabled')));

            normalize(options);

            that._initialOptions = extend({}, options);

            that._wrapper();

            that.dateView = new DateView(extend({}, options, {
                id: element.attr(ID),
                anchor: that.wrapper,
                change: function() {
                    // calendar is the current scope
                    that._change(this.value());
                    that.close();
                },
                close: function(e) {
                    if (that.trigger(CLOSE)) {
                        e.preventDefault();
                    } else {
                        element.attr(ARIA_EXPANDED, false);
                        div.attr(ARIA_HIDDEN, true);

                        setTimeout(function() {
                            element.removeAttr("aria-activedescendant");
                        });
                    }
                },
                open: function(e) {
                    var options = that.options,
                        date;

                    if (that.trigger(OPEN)) {
                        e.preventDefault();
                    } else {
                        if (that.element.val() !== that._oldText) {
                            date = parse(element.val(), options.parseFormats, options.culture);

                            that.dateView[date ? "current" : "value"](date);
                        }

                        element.attr(ARIA_EXPANDED, true);
                        div.attr(ARIA_HIDDEN, false);

                        that._updateARIA(date);

                    }
                }
            }));

            div = that.dateView.div;

            that._icon();

            try {
                element[0].setAttribute("type", "text");
            } catch (e) {
                element[0].type = "text";
            }

            element
                .addClass("k-input-inner")
                .attr({
                    role: "combobox",
                    "aria-expanded": false,
                    "aria-haspopup": "grid",
                    "aria-controls": that.dateView._dateViewID,
                    "autocomplete": "off"
                });
            that._reset();
            that._template();

            disabled = !that.options.enable;
            if (disabled) {
                that.enable(false);
            } else {
                that.readonly(element.is("[readonly]"));
            }

            initialValue = parse(options.value || that.element.val(), options.parseFormats, options.culture);

            that._createDateInput(options);

            that._old = that._update(initialValue || that.element.val());
            that._oldText = element.val();
            that._applyCssClasses();

            if (options.label) {
                that._label();
            }

            kendo.notify(that);
        },
        events: [
        OPEN,
        CLOSE,
        CHANGE],
        options: {
            name: "DatePicker",
            value: null,
            footer: "",
            format: "",
            culture: "",
            parseFormats: [],
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            start: MONTH,
            depth: MONTH,
            animation: {},
            month: {},
            dates: [],
            disableDates: null,
            ARIATemplate: ({ valueType, text }) => `Current focused ${valueType} is ${text}`,
            dateInput: false,
            weekNumber: false,
            messages: {
                weekColumnHeader: ""
            },
            componentType: "classic",
            size: "medium",
            fillMode: "solid",
            rounded: "medium",
            label: null
        },

        setOptions: function(options) {
            var that = this;
            var value = that._value;

            Widget.fn.setOptions.call(that, options);

            options = that.options;

            options.min = parse(options.min);
            options.max = parse(options.max);

            normalize(options);

            that._dateIcon.off(ns);
            that._dateIcon.remove();

            that.dateView.setOptions(options);
            that._icon();
            that._editable({
                readonly: options.readonly === undefined ? that.options.readonly : options.readonly,
                disable: !(options.enable === undefined ? that.options.enable : options.enable)
            });

            that._createDateInput(options);

            if (!that._dateInput) {
                that.element.val(kendo.toString(value, options.format, options.culture));
            }

            if (value) {
                that._updateARIA(value);
            }

            if (options.label && that._inputLabel) {
                that.label.setOptions(options.label);
            } else if (options.label === false) {
                that.label._unwrapFloating();
                that._inputLabel.remove();
                delete that._inputLabel;
            } else if (options.label) {
                that._label();
            }
        },

        _editable: function(options) {
            var that = this,
                icon = that._dateIcon.off(ns),
                element = that.element.off(ns),
                wrapper = that.wrapper.off(ns),
                readonly = options.readonly,
                disable = options.disable;

            if (!readonly && !disable) {
                wrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);
                if (element && element.length) {
                    element[0].removeAttribute(DISABLED);
                    element[0].removeAttribute(READONLY);
                }
                element.attr(ARIA_DISABLED, false)
                       .attr(ARIA_READONLY, false)
                       .on("keydown" + ns, that._keydown.bind(that))
                       .on("focusout" + ns, that._blur.bind(that))
                       .on("focus" + ns, function() {
                           that.wrapper.addClass(FOCUSED);
                       });

               icon.on(UP, that._click.bind(that))
                   .on(MOUSEDOWN, preventDefault);
            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : "")
                    .removeClass(disable ? "" : STATEDISABLED);

                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .attr(ARIA_DISABLED, disable)
                       .attr(ARIA_READONLY, readonly);
            }
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
            if (this._dateInput) {
                this._dateInput._editable({
                    readonly: readonly === undefined ? true : readonly,
                    disable: false
                });
            }

            if (this.label && this.label.floatingLabel) {
                this.label.floatingLabel.readonly(readonly === undefined ? true : readonly);
            }
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
            if (this._dateInput) {
                this._dateInput._editable({
                    readonly: false,
                    disable: !(enable = enable === undefined ? true : enable)
                });
            }

            if (this.label && this.label.floatingLabel) {
                this.label.floatingLabel.enable(enable = enable === undefined ? true : enable);
            }
        },

        _label: function() {
            var that = this;
            var options = that.options;
            var labelOptions = $.isPlainObject(options.label) ? options.label : {
                content: options.label
            };

            if (that._dateInput) {
                labelOptions.floatCheck = () => {
                    that._dateInput._toggleDateMask(true);

                    if (!that.value() && !that._dateInput._hasDateInput() && document.activeElement !== that.element[0]) {
                        that._dateInput._toggleDateMask(false);
                        return true;
                    }

                    return false;
                };
            }

            that.label = new kendo.ui.Label(null, $.extend({}, labelOptions, {
                widget: that
            }));

            that._inputLabel = that.label.element;
        },

        destroy: function() {
            var that = this;

            if (that.label) {
                that.label.destroy();
            }

            Widget.fn.destroy.call(that);

            if (that.dateView.calendar && that._navigateCalendarHandler) {
                that.dateView.calendar.unbind(NAVIGATE, that._navigateCalendarHandler);
                that._navigateCalendarHandler = null;
            }

            that.dateView.destroy();

            that.element.off(ns);
            that._dateIcon.off(ns);

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }
        },

        open: function() {
            this.dateView.open();
            this._navigateCalendar();
        },

        close: function() {
            this.dateView.close();
        },

        min: function(value) {
            return this._option(MIN, value);
        },

        max: function(value) {
            return this._option(MAX, value);
        },

        value: function(value) {
            var that = this;

            if (value === undefined) {
                return that._value;
            }

            that._old = that._update(value);

            if (that._old === null) {
                if (that._dateInput) {
                    that._dateInput.value(that._old);
                } else {
                    that.element.val("");
                }
            }

            that._oldText = that.element.val();

            if (that.label && that.label.floatingLabel) {
                that.label.floatingLabel.refresh();
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _blur: function() {
            var that = this,
                value = that.element.val();

            that.close();
            if (value !== that._oldText) {
                that._change(value);
                if (!value) {
                    that.dateView.current(kendo.calendar.getToday());
                }
            }

            that.wrapper.removeClass(FOCUSED);
        },

        _click: function(e) {
            var that = this;

            that.dateView.toggle();
            that._navigateCalendar();
            that._focusElement(e.type);
        },

        _focusElement: function(eventType) {
            var element = this.element;

            if ((!support.touch || (support.mouseAndTouchPresent && !(eventType || "").match(/touch/i))) && element[0] !== activeElement()) {
                element.trigger("focus");
            }
        },

        _change: function(value) {
            var that = this,
            oldValue = that.element.val(),
            dateChanged;

            value = that._update(value);
            dateChanged = !kendo.calendar.isEqualDate(that._old, value);

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

        _keydown: function(e) {
            var that = this,
                dateView = that.dateView,
                value = that.element.val(),
                handled = false;

            if (!dateView.popup.visible() && e.keyCode == keys.ENTER && value !== that._oldText) {
                that._change(value);
            } else {
                handled = dateView.move(e);
                that._updateARIA(dateView._current);

                if (!handled) {
                    that._typing = true;
                } else if (that._dateInput && e.stopImmediatePropagation) {
                    e.stopImmediatePropagation();
                }
            }
        },

        _icon: function() {
            var that = this,
                element = that.element,
                options = that.options,
                icon;

            icon = element.next("button.k-input-button");

            if (!icon[0]) {
                icon = $(html.renderButton('<button aria-label="select" tabindex="-1" class="k-input-button k-button k-icon-button"></button>', {
                    icon: "calendar",
                    size: options.size,
                    fillMode: options.fillMode,
                    shape: "none",
                    rounded: "none"
                })).insertAfter(element);
            }

            that._dateIcon = icon.attr({
                "role": "button"
            });
        },

        _setCalendarAttribute: function() {
            var that = this;
            setTimeout(function() {
                that.element.attr(ARIA_ACTIVEDESCENDANT, that.dateView.calendar._table.attr(ARIA_ACTIVEDESCENDANT));
            });
        },

        _navigateCalendar: function() {
            var that = this;

            if (!that._navigateCalendarHandler) {
                that._navigateCalendarHandler = that._setCalendarAttribute.bind(that);
            }

            if (!!that.dateView.calendar) {
                that.dateView.calendar.unbind(NAVIGATE, that._navigateCalendarHandler).bind(NAVIGATE, that._navigateCalendarHandler);
            }
        },

        _option: function(option, value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options[option];
            }

            value = parse(value, options.parseFormats, options.culture);

            if (!value) {
                return;
            }

            options[option] = new DATE(+value);
            that.dateView[option](value);
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                min = options.min,
                max = options.max,
                current = that._value,
                date = parse(value, options.parseFormats, options.culture),
                isSameType = (date === null && current === null) || (date instanceof Date && current instanceof Date),
                formattedValue;

            if (options.disableDates(date)) {
                date = null;
                if (!that._old && !that.element.val()) {
                    value = null;
                }
            }

            if (+date === +current && isSameType) {
                formattedValue = kendo.toString(date, options.format, options.culture);

                if (formattedValue !== value && !(that._dateInput && !date)) {
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
            that.dateView.value(date);
            if (that._dateInput && date) {
                that._dateInput.value(date || value);
            } else {
                that.element.val(kendo.toString(date || value, options.format, options.culture));
            }
            that._updateARIA(date);

            return date;
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parents(".k-datepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(SPAN).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                height: element[0].style.height
            });

            that.wrapper = wrapper.addClass("k-datepicker k-input")
                .addClass(element[0].className).removeClass('input-validation-error');
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                options = that.options,
                disabledDate = options.disableDates,
                parseFormats = options.parseFormats.length ? options.parseFormats : null,
                optionsValue = that._initialOptions.value,
                form = formId ? $("#" + formId) : element.closest("form"),
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
            this._ariaTemplate = template(this.options.ARIATemplate).bind(this);
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
                    size: options.size,
                    fillMode: options.fillMode,
                    rounded: options.rounded,
                    min: options.min,
                    max: options.max,
                    messages: options.messages.dateInput
                });
            }
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
        }
    });

    kendo.cssProperties.registerPrefix("DatePicker", "k-input-");

    kendo.cssProperties.registerValues("DatePicker", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

    ui.plugin(DatePicker);

})(window.kendo.jQuery);

