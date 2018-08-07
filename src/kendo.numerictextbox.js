(function(f, define){
    define([ "./kendo.core", "./kendo.userevents" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "numerictextbox",
    name: "NumericTextBox",
    category: "web",
    description: "The NumericTextBox widget can format and display numeric, percentage or currency textbox.",
    depends: [ "core", "userevents" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        caret = kendo.caret,
        keys = kendo.keys,
        ui = kendo.ui,
        Widget = ui.Widget,
        activeElement = kendo._activeElement,
        extractFormat = kendo._extractFormat,
        parse = kendo.parseFloat,
        placeholderSupported = kendo.support.placeholder,
        getCulture = kendo.getCulture,
        CHANGE = "change",
        DISABLED = "disabled",
        READONLY = "readonly",
        INPUT = "k-input",
        SPIN = "spin",
        ns = ".kendoNumericTextBox",
        TOUCHEND = "touchend",
        MOUSELEAVE = "mouseleave" + ns,
        HOVEREVENTS = "mouseenter" + ns + " " + MOUSELEAVE,
        DEFAULT = "k-state-default",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        FOCUS = "focus",
        POINT = ".",
        CLASS_ICON = "k-icon",
        SELECTED = "k-state-selected",
        STATEDISABLED = "k-state-disabled",
        STATE_INVALID = "k-state-invalid",
        ARIA_DISABLED = "aria-disabled",
        INTEGER_REGEXP = /^(-)?(\d*)$/,
        NULL = null,
        proxy = $.proxy,
        extend = $.extend;

    var NumericTextBox = Widget.extend({
         init: function(element, options) {
             var that = this,
             isStep = options && options.step !== undefined,
             min, max, step, value, disabled;

             Widget.fn.init.call(that, element, options);

             options = that.options;
             element = that.element
                           .on("focusout" + ns, proxy(that._focusout, that))
                           .attr("role", "spinbutton");

             options.placeholder = options.placeholder || element.attr("placeholder");

             min = that.min(element.attr("min"));
             max = that.max(element.attr("max"));
             step = that._parse(element.attr("step"));

             if (options.min === NULL && min !== NULL) {
                 options.min = min;
             }

             if (options.max === NULL && max !== NULL) {
                 options.max = max;
             }

             if (!isStep && step !== NULL) {
                 options.step = step;
             }

             that._initialOptions = extend({}, options);

             that._reset();
             that._wrapper();
             that._arrows();
             that._validation();
             that._input();

             if (!kendo.support.mobileOS) {
                 that._text.on(FOCUS + ns, proxy(that._click, that));
             } else {
                 that._text.on(TOUCHEND + ns + " " + FOCUS + ns, function() {
                     if (kendo.support.browser.edge) {
                         that._text.one(FOCUS + ns, function() {
                             that._toggleText(false);
                             element.focus();
                         });
                     } else {
                         that._toggleText(false);
                         element.focus();
                     }
                 });
             }

             element.attr("aria-valuemin", options.min !== NULL ? options.min*options.factor : options.min)
                    .attr("aria-valuemax", options.max !== NULL ? options.max*options.factor : options.max);

             options.format = extractFormat(options.format);

             value = options.value;
             that.value(value !== NULL ? value : element.val());

             disabled = element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');

             if (disabled) {
                 that.enable(false);
             } else {
                 that.readonly(element.is("[readonly]"));
             }

             kendo.notify(that);
         },

        options: {
            name: "NumericTextBox",
            decimals: NULL,
            restrictDecimals: false,
            min: NULL,
            max: NULL,
            value: NULL,
            step: 1,
            round: true,
            culture: "",
            format: "n",
            spinners: true,
            placeholder: "",
            factor: 1,
            upArrowText: "Increase value",
            downArrowText: "Decrease value"
        },
        events: [
            CHANGE,
            SPIN
        ],

        _editable: function(options) {
            var that = this,
                element = that.element,
                disable = options.disable,
                readonly = options.readonly,
                text = that._text.add(element),
                wrapper = that._inputWrapper.off(HOVEREVENTS);

            that._toggleText(true);

            that._upArrowEventHandler.unbind("press");
            that._downArrowEventHandler.unbind("press");
            element
                .off("keydown" + ns)
                .off("keypress" + ns)
                .off("keyup" + ns)
                .off("paste" + ns);

            if (!readonly && !disable) {
                wrapper
                    .addClass(DEFAULT)
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                text.removeAttr(DISABLED)
                    .removeAttr(READONLY)
                    .attr(ARIA_DISABLED, false);

                that._upArrowEventHandler.bind("press", function(e) {
                    e.preventDefault();
                    that._spin(1);
                    that._upArrow.addClass(SELECTED);
                });

                that._downArrowEventHandler.bind("press", function(e) {
                    e.preventDefault();
                    that._spin(-1);
                    that._downArrow.addClass(SELECTED);
                });

                that.element
                    .on("keydown" + ns, proxy(that._keydown, that))
                    .on("keypress" + ns, proxy(that._keypress, that))
                    .on("keyup" + ns, proxy(that._keyup, that))
                    .on("paste" + ns, proxy(that._paste, that));

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : DEFAULT)
                    .removeClass(disable ? DEFAULT : STATEDISABLED);

                text.attr(DISABLED, disable)
                    .attr(READONLY, readonly)
                    .attr(ARIA_DISABLED, disable);
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

        setOptions: function (options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);

            that._arrowsWrap.toggle(that.options.spinners);
            that._inputWrapper.toggleClass("k-expand-padding", !that.options.spinners);
            that._text.prop("placeholder", that.options.placeholder);
            that._placeholder(that.options.placeholder);
            that.element.attr({
                "aria-valuemin": that.options.min !== NULL ? that.options.min*that.options.factor : that.options.min,
                "aria-valuemax": that.options.max !== NULL ? that.options.max*that.options.factor : that.options.max
            });

            that.options.format = extractFormat(that.options.format);

            if (options.value !== undefined) {
                that.value(options.value);
            }
        },

        destroy: function() {
            var that = this;

            that.element
                .add(that._text)
                .add(that._upArrow)
                .add(that._downArrow)
                .add(that._inputWrapper)
                .off(ns);

            that._upArrowEventHandler.destroy();
            that._downArrowEventHandler.destroy();

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }

            Widget.fn.destroy.call(that);
        },

        min: function(value) {
            return this._option("min", value);
        },

        max: function(value) {
            return this._option("max", value);
        },

        step: function(value) {
            return this._option("step", value);
        },

        value: function(value) {
            var that = this, adjusted;

            if (value === undefined) {
                return that._value;
            }

            value = that._parse(value);
            adjusted = that._adjust(value);

            if (value !== adjusted) {
                return;
            }

            that._update(value);
            that._old = that._value;
        },

        focus: function() {
            this._focusin();
        },

        _adjust: function(value) {
            var that = this,
            options = that.options,
            min = options.min,
            max = options.max;

            if (value === NULL) {
                return value;
            }

            if (min !== NULL && value < min) {
                value = min;
            } else if (max !== NULL && value > max) {
                value = max;
            }

            return value;
        },

        _arrows: function() {
            var that = this,
            arrows,
            _release = function() {
                clearTimeout( that._spinning );
                arrows.removeClass(SELECTED);
            },
            options = that.options,
            spinners = options.spinners,
            element = that.element;

            arrows = element.siblings("." + CLASS_ICON);

            if (!arrows[0]) {
                arrows = $(buttonHtml("increase", options.upArrowText) + buttonHtml("decrease", options.downArrowText))
                        .insertAfter(element);

                that._arrowsWrap = arrows.wrapAll('<span class="k-select"/>').parent();
            }

            if (!spinners) {
                arrows.parent().toggle(spinners);
                that._inputWrapper.addClass("k-expand-padding");
            }

            that._upArrow = arrows.eq(0);
            that._upArrowEventHandler = new kendo.UserEvents(that._upArrow, { release: _release });
            that._downArrow = arrows.eq(1);
            that._downArrowEventHandler = new kendo.UserEvents(that._downArrow, { release: _release });
        },

        _validation: function () {
            var that = this;
            var element = that.element;

            that._validationIcon = $("<span class='" + CLASS_ICON + " k-i-warning'></span>")
                .hide()
                .insertAfter(element);
        },

        _blur: function() {
            var that = this;

            that._toggleText(true);

            that._change(that.element.val());
        },

        _click: function(e) {
            var that = this;

            clearTimeout(that._focusing);
            that._focusing = setTimeout(function() {
                var input = e.target,
                    idx = caret(input)[0],
                    value = input.value.substring(0, idx),
                    format = that._format(that.options.format),
                    group = format[","],
                    result, groupRegExp, extractRegExp,
                    caretPosition = 0;

                if (group) {
                    groupRegExp = new RegExp("\\" + group, "g");
                    extractRegExp = new RegExp("([\\d\\" + group + "]+)(\\" + format[POINT] + ")?(\\d+)?");
                }

                if (extractRegExp) {
                    result = extractRegExp.exec(value);
                }

                if (result) {
                    caretPosition = result[0].replace(groupRegExp, "").length;

                    if (value.indexOf("(") != -1 && that._value < 0) {
                        caretPosition++;
                    }
                }

                that._focusin();

                caret(that.element[0], caretPosition);
            });
        },

        _change: function(value) {
            var that = this,
                factor = that.options.factor;

            if(factor && factor !== 1){
                value = kendo.parseFloat(value);
                if(value !== null) {
                    value = value/factor;
                }
            }

            that._update(value);
            value = that._value;

            if (that._old != value) {
                that._old = value;

                if (!that._typing) {
                    // trigger the DOM change event so any subscriber gets notified
                    that.element.trigger(CHANGE);
                }

                that.trigger(CHANGE);
            }

            that._typing = false;
        },

        _culture: function(culture) {
            return culture || getCulture(this.options.culture);
        },

        _focusin: function() {
            var that = this;
            that._inputWrapper.addClass(FOCUSED);
            that._toggleText(false);
            that.element[0].focus();
        },

        _focusout: function() {
            var that = this;

            clearTimeout(that._focusing);
            that._inputWrapper.removeClass(FOCUSED).removeClass(HOVER);
            that._blur();
            that._removeInvalidState();
        },

        _format: function(format, culture) {
            var numberFormat = this._culture(culture).numberFormat;

            format = format.toLowerCase();

            if (format.indexOf("c") > -1) {
                numberFormat = numberFormat.currency;
            } else if (format.indexOf("p") > -1) {
                numberFormat = numberFormat.percent;
            }

            return numberFormat;
        },

        _input: function() {
            var that = this,
                options = that.options,
                CLASSNAME = "k-formatted-value",
                element = that.element.addClass(INPUT).show()[0],
                accessKey = element.accessKey,
                wrapper = that.wrapper,
                text;

            text = wrapper.find(POINT + CLASSNAME);

            if (!text[0]) {
                text = $('<input type="text"/>').insertBefore(element).addClass(CLASSNAME);
            }

            try {
                element.setAttribute("type", "text");
            } catch(e) {
                element.type = "text";
            }

            that._initialTitle = element.title;
            text[0].title = element.title;
            text[0].tabIndex = element.tabIndex;
            text[0].style.cssText = element.style.cssText;
            text.prop("placeholder", options.placeholder);

            if (accessKey) {
                text.attr("accesskey", accessKey);
                element.accessKey = "";
            }


            that._text = text.addClass(element.className)
                             .attr({
                                 "role": "spinbutton",
                                 "aria-valuemin": options.min !== NULL ? options.min*options.factor : options.min,
                                 "aria-valuemax": options.max !== NULL ? options.max*options.factor : options.max,
                                 "autocomplete": "off"
                             });
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            that._key = key;

            if (key == keys.DOWN) {
                that._step(-1);
            } else if (key == keys.UP) {
                that._step(1);
            } else if (key == keys.ENTER) {
                that._change(that.element.val());
            } else if (key != keys.TAB) {
                that._typing = true;
            }

        },

        _keypress: function(e) {
            if (e.which === 0 || e.metaKey || e.ctrlKey || e.keyCode === keys.BACKSPACE || e.keyCode === keys.ENTER) {
                return;
            }

            var that = this;
            var min = that.options.min;
            var element = that.element;
            var selection = caret(element);
            var selectionStart = selection[0];
            var selectionEnd = selection[1];
            var character = String.fromCharCode(e.which);
            var numberFormat = that._format(that.options.format);
            var isNumPadDecimal = that._key === keys.NUMPAD_DOT;
            var value = element.val();
            var isValid;

            if (isNumPadDecimal) {
                character = numberFormat[POINT];
            }

            value = value.substring(0, selectionStart) + character + value.substring(selectionEnd);
            isValid = that._numericRegex(numberFormat).test(value);

            if (isValid && isNumPadDecimal) {
                element.val(value);
                caret(element, selectionStart + character.length);

                e.preventDefault();
            } else if ((min !== null && min >= 0 && value.charAt(0) === "-") || !isValid) {
                that._addInvalidState();
                e.preventDefault();
            }

            that._key = 0;
        },

        _keyup: function () {
            this._removeInvalidState();
        },

        _addInvalidState: function () {
            var that = this;
            that._inputWrapper.addClass(STATE_INVALID);
            that._validationIcon.show();
        },

        _removeInvalidState: function () {
            var that = this;
            that._inputWrapper.removeClass(STATE_INVALID);
            that._validationIcon.hide();
        },

        _numericRegex: function(numberFormat) {
            var that = this;
            var separator = numberFormat[POINT];
            var precision = that.options.decimals;
            var fractionRule = "*";

            if (separator === POINT) {
                separator = "\\" + separator;
            }

            if (precision === NULL) {
                precision = numberFormat.decimals;
            }

            if (precision === 0 && that.options.restrictDecimals) {
                return INTEGER_REGEXP;
            }

            if (that.options.restrictDecimals) {
                fractionRule = "{0," + precision + "}";
            }

            if (that._separator !== separator) {
                that._separator = separator;
                that._floatRegExp = new RegExp("^(-)?(((\\d+(" + separator + "\\d" + fractionRule + ")?)|(" + separator + "\\d" + fractionRule + ")))?$");
            }

            return that._floatRegExp;
        },

        _paste: function(e) {
            var that = this;
            var element = e.target;
            var value = element.value;
            var numberFormat = that._format(that.options.format);

            setTimeout(function() {
                var result = that._parse(element.value);

                if (result === NULL) {
                    that._update(value);
                } else {
                    element.value = result.toString().replace(POINT, numberFormat[POINT]);
                    if (that._adjust(result) !== result || !that._numericRegex(numberFormat).test(element.value)) {
                        that._update(value);
                    }
                }
            });
        },

        _option: function(option, value) {
            var that = this,
                element = that.element,
                options = that.options;

            if (value === undefined) {
                return options[option];
            }

            value = that._parse(value);

            if (!value && option === "step") {
                return;
            }

            options[option] = value;
            element
                .add(that._text)
                .attr("aria-value" + option, value);

            element.attr(option, value);
        },

        _spin: function(step, timeout) {
            var that = this;

            timeout = timeout || 500;

            clearTimeout( that._spinning );
            that._spinning = setTimeout(function() {
                that._spin(step, 50);
            }, timeout );

            that._step(step);
        },

        _step: function(step) {
            var that = this,
                element = that.element,
                originalValue = that._value,
                value = that._parse(element.val()) || 0,
                precision = that.options.decimals || 2;

            if (activeElement() != element[0]) {
                that._focusin();
            }

            if(that.options.factor && value) {
                value = value/that.options.factor;
            }

            value =  +(value + that.options.step * step).toFixed(precision);
            value = that._adjust(value);
            that._update(value);
            that._typing = false;

            if (originalValue !== value) {
                that.trigger(SPIN);
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
        },

        _toggleText: function(toggle) {
            var that = this;

            that._text.toggle(toggle);
            that.element.toggle(!toggle);
        },

        _parse: function(value, culture) {
            return parse(value, this._culture(culture), this.options.format);
        },

        _round: function(value, precision) {
            var rounder = this.options.round ? kendo._round : truncate;

            return rounder(value, precision);
        },

        _update: function(value) {
            var that = this,
                options = that.options,
                factor = options.factor,
                format = options.format,
                decimals = options.decimals,
                culture = that._culture(),
                numberFormat = that._format(format, culture),
                isNotNull;

            if (decimals === NULL) {
                decimals = numberFormat.decimals;
            }

            value = that._parse(value, culture);

            isNotNull = value !== NULL;

            if (isNotNull) {
                value = parseFloat(that._round(value, decimals), 10);
            }

            that._value = value = that._adjust(value);
            that._placeholder(kendo.toString(value, format, culture));

            if (isNotNull) {
                if(factor) {
                    value =  parseFloat(that._round(value*factor, decimals), 10);
                }
                value = value.toString();
                if (value.indexOf("e") !== -1) {
                    value = that._round(+value, decimals);
                }
                value = value.replace(POINT, numberFormat[POINT]);
            } else {
                value = null;
            }

            that.element.val(value);
            that.element.add(that._text).attr("aria-valuenow", value);
        },

        _placeholder: function(value) {
            var input = this._text;

            input.val(value);
            if (!placeholderSupported && !value) {
                input.val(this.options.placeholder);
            }

            input.attr("title", this._initialTitle || input.val());
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMElement = element[0],
                wrapper;

            wrapper = element.parents(".k-numerictextbox");

            if (!wrapper.is("span.k-numerictextbox")) {
                wrapper = element.hide().wrap('<span class="k-numeric-wrap k-state-default" />').parent();
                wrapper = wrapper.wrap("<span/>").parent();
            }

            wrapper[0].style.cssText = DOMElement.style.cssText;
            DOMElement.style.width = "";
            that.wrapper = wrapper.addClass("k-widget k-numerictextbox")
                                  .addClass(DOMElement.className)
                                  .css("display", "");

            that._inputWrapper = $(wrapper[0].firstChild);
        },

        _reset: function() {
            var that = this,
                element = that.element,
                formId = element.attr("form"),
                form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(element[0].value);
                        that.max(that._initialOptions.max);
                        that.min(that._initialOptions.min);
                    });
                };

                that._form = form.on("reset", that._resetHandler);
            }
        }
    });

    function buttonHtml(direction, text) {
        var className = "k-i-arrow-" + (direction === "increase" ? "60-up" : "60-down");

        return (
            '<span unselectable="on" class="k-link k-link-' + direction + '" aria-label="' + text + '" title="' + text + '">' +
                '<span unselectable="on" class="' + CLASS_ICON + ' ' + className + '"></span>' +
            '</span>'
        );
    }

    function truncate(value, precision) {
        var parts = parseFloat(value, 10).toString().split(POINT);

        if (parts[1]) {
            parts[1] = parts[1].substring(0, precision);
        }

        return parts.join(POINT);

    }

    ui.plugin(NumericTextBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
