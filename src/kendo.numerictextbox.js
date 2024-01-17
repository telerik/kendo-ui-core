import "./kendo.core.js";
import "./kendo.userevents.js";
import "./kendo.floatinglabel.js";
import "./kendo.html.button.js";
import "./kendo.icons.js";

var __meta__ = {
    id: "numerictextbox",
    name: "NumericTextBox",
    category: "web",
    description: "The NumericTextBox widget can format and display numeric, percentage or currency textbox.",
    depends: [ "core", "userevents", "floatinglabel", "html.button", "icons" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        caret = kendo.caret,
        keys = kendo.keys,
        html = kendo.html,
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
        INPUT = "k-input-inner",
        SPIN = "spin",
        ns = ".kendoNumericTextBox",
        TOUCHEND = "touchend",
        MOUSELEAVE = "mouseleave" + ns,
        HOVEREVENTS = "mouseenter" + ns + " " + MOUSELEAVE,
        FOCUSED = "k-focus",
        HOVER = "k-hover",
        FOCUS = "focus",
        POINT = ".",
        SYMBOL = "symbol",
        CLASS_ICON = "k-icon",
        LABELCLASSES = "k-label k-input-label",
        SELECTED = "k-selected",
        STATEDISABLED = "k-disabled",
        STATEINVALID = "k-invalid",
        ARIA_DISABLED = "aria-disabled",
        INTEGER_REGEXP = /^(-)?(\d*)$/,
        NULL = null,
        isPlainObject = $.isPlainObject,
        extend = $.extend;

    var NumericTextBox = Widget.extend({
         init: function(element, options) {
             var that = this,
             isStep = options && options.step !== undefined,
             min, max, step, value, disabled;
             var inputType;

             Widget.fn.init.call(that, element, options);

             options = that.options;
             element = that.element
                           .on("focusout" + ns, that._focusout.bind(that))
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

             inputType = element.attr("type");

             that._reset();
             that._wrapper();
             that._arrows();
             that._validation();
             that._input();

             if (!kendo.support.mobileOS) {
                 that._text.on(FOCUS + ns, that._click.bind(that));
             } else {
                 that._text.on(TOUCHEND + ns + " " + FOCUS + ns, function() {
                     if (kendo.support.browser.edge) {
                         that._text.one(FOCUS + ns, function() {
                            that._focusin();
                         });
                     } else {
                        that._focusin();
                     }
                     that.selectValue();
                 });
             }

             element.attr("aria-valuemin", options.min !== NULL ? options.min * options.factor : options.min)
                    .attr("aria-valuemax", options.max !== NULL ? options.max * options.factor : options.max);

             options.format = extractFormat(options.format);

             value = options.value;

             if (value == NULL) {
                 if (inputType == "number") {
                    value = parseFloat(element.val());
                 } else {
                     value = element.val();
                 }
             }

             that.value(value);

             disabled = !options.enable || element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');

             if (disabled) {
                 that.enable(false);
             } else {
                 that.readonly(element.is("[readonly]"));
             }

             that._label();
             that._ariaLabel(that._text);
             that._applyCssClasses();

             kendo.notify(that);
         },

        options: {
            name: "NumericTextBox",
            decimals: NULL,
            enable: true,
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
            selectOnFocus: false,
            factor: 1,
            upArrowText: "Increase value",
            downArrowText: "Decrease value",
            label: null,
            size: "medium",
            fillMode: "solid",
            rounded: "medium"
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
                wrapper = that.wrapper.off(HOVEREVENTS);

            that._toggleText(true);

            that._upArrowEventHandler.unbind("press");
            that._downArrowEventHandler.unbind("press");
            element
                .off("keydown" + ns)
                .off("keyup" + ns)
                .off("input" + ns)
                .off("paste" + ns);

            if (that._inputLabel) {
                that._inputLabel.off(ns);
            }

            if (!readonly && !disable) {
                wrapper
                    .removeClass(STATEDISABLED)
                    .on(HOVEREVENTS, that._toggleHover);

                text.prop(DISABLED, false)
                    .prop(READONLY, false)
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
                    .on("keydown" + ns, that._keydown.bind(that))
                    .on("keyup" + ns, that._keyup.bind(that))
                    .on("paste" + ns, that._paste.bind(that))
                    .on("input" + ns, that._inputHandler.bind(that));

                if (that._inputLabel) {
                    that._inputLabel.on("click" + ns, that.focus.bind(that));
                }

            } else {
                wrapper
                    .addClass(disable ? STATEDISABLED : "")
                    .removeClass(disable ? "" : STATEDISABLED);

                text.attr(DISABLED, disable)
                    .attr(READONLY, readonly)
                    .attr(ARIA_DISABLED, disable);
            }
        },

        readonly: function(readonly) {
            var that = this;

            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });

            if (that.floatingLabel) {
                that.floatingLabel.readonly(readonly === undefined ? true : readonly);
            }
        },

        enable: function(enable) {
            var that = this;

            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });

            if (that.floatingLabel) {
                that.floatingLabel.enable(enable = enable === undefined ? true : enable);
            }
        },

        setOptions: function(options) {
            var that = this;
            Widget.fn.setOptions.call(that, options);

            that.wrapper.toggleClass("k-expand-padding", !that.options.spinners);
            that._text.prop("placeholder", that.options.placeholder);
            that._placeholder(that.options.placeholder);
            that.element.attr({
                "aria-valuemin": that.options.min !== NULL ? that.options.min * that.options.factor : that.options.min,
                "aria-valuemax": that.options.max !== NULL ? that.options.max * that.options.factor : that.options.max
            });

            that.options.format = extractFormat(that.options.format);
            that._upArrowEventHandler.destroy();
            that._upArrowEventHandler = null;
            that._downArrowEventHandler.destroy();
            that._downArrowEventHandler = null;
            that._arrowsWrap.remove();
            that._arrows();

            that._applyCssClasses();

            if (that._inputLabel) {
                that._inputLabel.off(ns);
                that._inputLabel.remove();

                if (that.floatingLabel) {
                    that.floatingLabel.destroy();
                    if (that._floatingLabelContainer) {
                        that.wrapper.unwrap();
                    }
                }
            }

            that._label();

            if (options.enable !== undefined || options.readonly !== undefined) {
                that._editable({
                    readonly: options.readonly,
                    disable: !options.enable
                });
            } else {
                that._editable({
                    readonly: that.element.attr("readonly") !== undefined ? Boolean(that.element.attr("readonly")) : that.options.readonly,
                    disable: that.element.attr("disabled") !== undefined ? Boolean(that.element.attr("disabled")) : !that.options.enable
                });
            }

            if (options.value !== undefined) {
                that.value(options.value);
            }
        },

        destroy: function() {
            var that = this;

            if (that._inputLabel) {
                that._inputLabel.off(ns);

                if (that.floatingLabel) {
                    that.floatingLabel.destroy();
                }
            }

            that.element
                .add(that._text)
                .add(that._upArrow)
                .add(that._downArrow)
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

            if (that.floatingLabel) {
                that.floatingLabel.refresh();
            }
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

            arrows = element.siblings(".k-icon-button");

            if (!arrows[0]) {
                arrows = $(buttonHtml("increase", options.upArrowText, options) + buttonHtml("decrease", options.downArrowText, options))
                        .appendTo(that.wrapper);

                that._arrowsWrap = arrows.wrapAll('<span class="k-input-spinner k-spin-button"/>').parent();
            }

            if (!spinners) {
                arrows.parent().toggle(spinners);
                that.wrapper.addClass("k-expand-padding");
            }

            that._upArrow = arrows.eq(0);
            that._upArrowEventHandler = new kendo.UserEvents(that._upArrow, { release: _release });
            that._downArrow = arrows.eq(1);
            that._downArrowEventHandler = new kendo.UserEvents(that._downArrow, { release: _release });
        },

        _validation: function() {
            var that = this;
            var element = that.element;

            that._validationIcon = $(kendo.ui.icon({ icon: "exclamation-circle", iconClass: "k-input-validation-icon k-hidden" })).insertAfter(element);
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
                    extractRegExp = new RegExp("(-)?(" + format[SYMBOL] + ")?([\\d\\" + group + "]+)(\\" + format[POINT] + ")?(\\d+)?");
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
                that.selectValue();
            });
        },

        selectValue: function() {
            if (this.options.selectOnFocus) {
                this.element[0].select();
            }
        },

        _getFactorValue: function(value) {
            var that = this,
                factor = that.options.factor;

            if (factor && factor !== 1) {
                value = kendo.parseFloat(value);
                if (value !== null) {
                    value = value / factor;
                }
            }

            return value;
        },

        _change: function(value) {
            var that = this;

            value = that._getFactorValue(value);
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
            that.wrapper.addClass(FOCUSED);
            that._toggleText(false);
            that.element[0].focus();
        },

        _focusout: function() {
            var that = this;

            clearTimeout(that._focusing);
            that.wrapper.removeClass(FOCUSED).removeClass(HOVER);
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
                element = that.element.addClass(INPUT).show()[0],
                accessKey = element.accessKey,
                wrapper = that.wrapper,
                inputs = wrapper.find(POINT + INPUT),
                text;

            text = inputs.first();

            if (text.length < 2) {
                text = $('<input type="text"/>')
                        .attr(kendo.attr("validate"), false)
                        .insertBefore(element);
            }

            try {
                element.setAttribute("type", "text");
            } catch (e) {
                element.type = "text";
            }

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
                                 "aria-valuemin": options.min !== NULL ? options.min * options.factor : options.min,
                                 "aria-valuemax": options.max !== NULL ? options.max * options.factor : options.max,
                                 "autocomplete": "off"
                             });
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            if (key === keys.NUMPAD_DOT) {
                that._numPadDot = true;
            }

            if (key == keys.DOWN) {
                that._step(-1);
                return;
            } else if (key == keys.UP) {
                that._step(1);
                return;
            } else if (key == keys.ENTER) {
                that._change(that.element.val());
                return;
            }

            if (key != keys.TAB) {
                that._typing = true;
            }
            that._cachedCaret = caret(that.element);
        },

        _keyup: function() {
            this._removeInvalidState();
        },

        _inputHandler: function() {
            var element = this.element;
            var value = element.val();
            var min = this.options.min;
            var numberFormat = this._format(this.options.format);
            var decimalSeparator = numberFormat[POINT];
            var minInvalid = (min !== null && min >= 0 && value.charAt(0) === "-");

            if (this._numPadDot && decimalSeparator !== POINT) {
                value = value.replace(POINT, decimalSeparator);
                this.element.val(value);
                this._numPadDot = false;
            }

            if (this._isPasted && this._parse(value)) {
                value = this._parse(value)
                    .toString()
                    .replace(POINT, numberFormat[POINT]);
            }

            if (this._numericRegex(numberFormat).test(value) && !minInvalid) {
                this._oldText = value;
            } else {
                this._blinkInvalidState();
                this.element.val(this._oldText);
                if (this._cachedCaret) {
                    caret(element, this._cachedCaret[0]);
                    this._cachedCaret = null;
                }
            }

            this._isPasted = false;
        },

        _blinkInvalidState: function() {
            var that = this;

            that._addInvalidState();
            clearTimeout(that._invalidStateTimeout);
            that._invalidStateTimeout = setTimeout(that._removeInvalidState.bind(that), 100);
        },

        _addInvalidState: function() {
            var that = this;

            that.wrapper.addClass(STATEINVALID);
            that._validationIcon.removeClass('k-hidden');
        },

        _removeInvalidState: function() {
            var that = this;

            that.wrapper.removeClass(STATEINVALID);
            that._validationIcon.addClass('k-hidden');
            that._invalidStateTimeout = null;
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

            that._isPasted = true;

           setTimeout(function() {
                var result = that._parse(element.value);

                if (result === NULL) {
                    that._update(value);
                } else {
                    element.value = result.toString().replace(POINT, numberFormat[POINT]);
                    if (that._adjust(result) !== result || !that._numericRegex(numberFormat).test(element.value)) {
                        value = that._getFactorValue(element.value);
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

            if (that.options.factor && value) {
                value = value / that.options.factor;
            }

            value = +(value + that.options.step * step).toFixed(precision);
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
            if (toggle) {
                that._text.removeAttr("aria-hidden");
            } else {
                that._text.attr("aria-hidden", "true");
            }
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
                originalValue,
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
                if (factor) {
                    value = parseFloat(that._round(value * factor, decimals), 10);
                }
                value = value.toString();
                if (value.indexOf("e") !== -1) {
                    value = that._round(+value, decimals);
                }
                originalValue = value;
                value = value.replace(POINT, numberFormat[POINT]);
            } else {
                value = null;
                originalValue = null;
            }

            that.element.val(value);
            that._oldText = value;
            that.element.add(that._text).attr("aria-valuenow", originalValue);
        },

        _placeholder: function(value) {
            var input = this._text;

            input.val(value);
            if (!placeholderSupported && !value) {
                input.val(this.options.placeholder);
            }

            input.attr("title", this.element.attr("title") || input.val());
        },

        _label: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var id = element.attr("id");
            var floating;
            var labelText;

            if (options.label !== null) {
                floating = isPlainObject(options.label) ? options.label.floating : false;
                labelText = isPlainObject(options.label) ? options.label.content : options.label;

                if (floating) {
                    that._floatingLabelContainer = that.wrapper.wrap("<span></span>").parent();
                    that.floatingLabel = new kendo.ui.FloatingLabel(that._floatingLabelContainer, { widget: that });
                }

                if (kendo.isFunction(labelText)) {
                    labelText = labelText.call(that);
                }

                if (!labelText) {
                    labelText = "";
                }

                if (!id) {
                    id = options.name + "_" + kendo.guid();
                    element.attr("id", id);
                }

                that._inputLabel = $("<label class='" + LABELCLASSES + "' for='" + id + "'>" + labelText + "</label>'").insertBefore(that.wrapper);

                if ((that.element.attr("disabled") === undefined) && (that.element.attr("readonly") === undefined)) {
                    that._inputLabel.on("click" + ns, that.focus.bind(that));
                }
            }
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMElement = element[0],
                wrapper;

            wrapper = element.parents(".k-numerictextbox");

            if (!wrapper.is("span.k-numerictextbox")) {
                wrapper = element.hide().wrap("<span/>").parent();
            }

            wrapper[0].style.cssText = DOMElement.style.cssText;
            DOMElement.style.width = "";
            that.wrapper = wrapper.addClass("k-numerictextbox k-input")
                                  .addClass(DOMElement.className)
                                  .removeClass('input-validation-error')
                                  .css("display", "");
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

    kendo.cssProperties.registerPrefix("NumericTextBox", "k-input-");

    kendo.cssProperties.registerValues("NumericTextBox", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

    function buttonHtml(direction, text, options) {
        var className = direction === "increase" ? "caret-alt-up" : "caret-alt-down";
        var dir = direction === "increase" ? "increase" : "decrease";

        return html.renderButton('<button role="button" tabindex="-1" unselectable="on" class="k-spinner-' + dir + '" aria-label="' + text + '" title="' + text + '"></button>', extend({}, options, {
            icon: className,
            shape: null,
            rounded: null
        }));
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
export default kendo;

