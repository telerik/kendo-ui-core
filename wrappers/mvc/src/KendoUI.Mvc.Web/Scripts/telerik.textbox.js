(function ($) {

    var $t = $.telerik,
        keycodes = [8, // backspace
                    9, // tab
                    37, // left arrow
                    38, // up arrow
                    39, // right arrow
                    40, // down arrow
                    46, // delete
                    35, // end
                    36, // home
                    44], //","
        styles = ["font-family",
                  "font-size",
                  "font-stretch",
                  "font-style",
                  "font-weight",
                  "line-height",
                  "color",
                  "text-align",
                  "text-decoration",
                  "text-transform"];
    
    $t.scripts.push("telerik.textbox.js");

    function getStyles(input) {
        var retrievedStyles = {};
        for (var i = 0, length = styles.length; i < length; i++) {
            var style = styles[i],
                value = input.css(style);

            if (value) {
                if (styles[i] != "font-style" && value != "normal") {
                    retrievedStyles[style] = value;
                }
            }
        }
        return retrievedStyles;
    }

    $t.textbox = function (element, options) {
        if (element.nodeName.toLowerCase() !== "input" && element.type.toLowerCase() !== "text") {
            throw "Target element is not a INPUT";
        }

        var that = this;

        $.extend(that, options);

        that.element = element;
        var $element = that.$element = $(element)
            .bind({
                keydown: $.proxy(that._keydown, that),
                keypress: $.proxy(that._keypress, that)
            })
            .bind("paste", $.proxy(that._paste, that));

        $element.closest("form").bind("reset", $.proxy(that._onParentFormReset, that));

        var builder = new $t.stringBuilder();

        if (element.parentNode.nodeName.toLowerCase() !== "div") {
            $element.addClass('t-input')
                    .wrap($('<div class="t-widget t-numerictextbox"></div>'));

            if (that.showIncreaseButton) {
                builder.cat('<a class="t-link t-icon t-arrow-up" href="#" tabindex="-1" title="')
                       .cat(that.increaseButtonTitle)
                       .cat('">Increment</a>');
            }

            if (that.showDecreaseButton) {
                builder.cat('<a class="t-link t-icon t-arrow-down" href="#" tabindex="-1" title="')
                       .cat(that.decreaseButtonTitle)
                       .cat('">Decrement</a>');
            }

            if (builder.buffer.length > 0) {
                $(builder.string()).insertAfter($element);
            }
        }

        that.$wrapper = $element.closest('.t-numerictextbox')
            .find('.t-arrow-up, .t-arrow-down')
                .bind({
                    click: $t.preventDefault,
                    dragstart: $t.preventDefault
                })
            .end()
            .bind({
                focusin: $.proxy(that._focus, that),
                focusout: $.proxy(that._blur, that)
            });

        that.enabled = !$element.is('[disabled]');

        builder.buffer = [];
        builder.cat('[ |')
               .cat(that.groupSeparator)
               .catIf('|' + that.symbol, that.symbol)
               .cat(']');
        that.replaceRegExp = new RegExp(builder.string(), 'g');

        var inputValue = $element.attr('value'),
            cssClass = $element.attr('class').replace("t-input", "").replace("input-validation-error", "");

        builder.buffer = [];
        builder.cat('<div class="t-formatted-value')
               .catIf(' t-state-empty', inputValue == '' && that.enabled)
               .catIf(cssClass, cssClass)
               .cat('">')
               .cat(inputValue || (that.enabled ? that.text : ''))
               .cat('</div>');

        that.$text = $(builder.string())
                        .insertBefore($element)
                        .css(getStyles($element))
                        .click(function (e) {
                            if (that.enabled) {
                                element.focus();
                            }
                        });

        //set text color to the background-color
        that._blur();
        that[that.enabled ? 'enable' : 'disable']();

        that.numFormat = that.numFormat === undefined ? that.type.charAt(0) : that.numFormat;
        that.step = that.parse(that.step);
        that.val = that.parse(that.val);
        that.minValue = that.parse(that.minValue);
        that.maxValue = that.parse(that.maxValue);
        that.decimals = { '190': '.', '188': ',' };
        that.specialDecimals = { '110': that.separator };

        that.value(inputValue || that.val);

        $t.bind(that, {
            load: that.onLoad,
            valueChange: that.onChange
        });
    }

    $t.textbox.prototype = {
        _paste: function (e) {
            setTimeout($.proxy(function () {
                var val = e.target.value;

                if (val == '-') {
                    return true;
                }

                var parsedValue = this.parse(val);
                if (parsedValue || parsedValue == 0) {
                    this._update(parsedValue);
                }
            }, this));
        },

        _keydown: function (e) {
            setTimeout($.proxy(function () {
                $element.toggleClass('t-state-error', !this.inRange(this.parse($element.val()), this.minValue, this.maxValue));
            }, this));

            var key = e.keyCode,
                $element = this.$element,
                element = $element[0],
                value = $element.val(),
                separator = this.separator,
                selection = currentSelection(element),
                start = selection.start,
                end = selection.end,
                separatorIndex = value ? value.indexOf(separator) : -1,
                allowSeparator = separatorIndex === -1;

            if (!allowSeparator && start !== -1) {
                if (separatorIndex >= start && separatorIndex < end) {
                    allowSeparator = true;
                }
            }

            var specialDecimals = this.specialDecimals[key];
            if (specialDecimals) {
                if (allowSeparator) {
                    var firstSliceEnd,
                        secondSliceStart;

                    if (start != -1) {
                        firstSliceEnd = start;
                        secondSliceStart = end;
                    } else {
                        var caret = $t.caretPos(element);
                        firstSliceEnd = caret;
                        secondSliceStart = caret;
                    }
                    $element.val(value.slice(0, firstSliceEnd) + specialDecimals + value.slice(secondSliceStart, value.length));
                    if ($.browser.msie) {
                        if (element.createTextRange) {
                            var range = element.createTextRange();
                            range.moveStart('textedit', 1);
                            range.select();
                        }
                    }
                }
                return false;
            }

            // Allow decimal
            var decimalSeparator = this.decimals[key];
            if (decimalSeparator) {
                if (decimalSeparator === separator && this.digits > 0 && allowSeparator) {
                    return true;
                } else {
                    e.preventDefault();
                }
            }

            if (key == 13 || key == 9) { //backspace and delete
                this._update(this.parse($element.val()));
                return true;
            }

            if (key == 38 || key == 40) {
                var direction = key == 38 ? 1 : -1;
                this._modify(direction * this.step);
                return true;
            }

            if (key == 222) e.preventDefault();
        },

        _keypress: function (e) {
            var element = e.target,
                key = e.keyCode || e.which;

            if (key == 0 || $.inArray(key, keycodes) != -1 || e.ctrlKey || (e.shiftKey && key == 45)) {
                return true;
            }

            var isSignAllowed;
            if (this.minValue === null || this.minValue < 0) {
                if (currentSelection(element).start === 0
                || ($t.caretPos(element) === 0 && element.value.indexOf("-") === -1)) {
                    isSignAllowed = true;
                }
            }

            if ((isSignAllowed && String.fromCharCode(key) == "-") || this.inRange(key, 48, 57)) {
                return true;
            }

            e.preventDefault();
        },

        _focus: function () {
            if (this.enabled) {
                this._showTextBoxValue();
                this.$text.hide();
                var input = this.$element[0];
                this._focusing = setTimeout(function () {
                    input.focus();
                    if ($.browser.msie) {
                        input.select();
                    } else {
                        input.selectionStart = 0;
                        input.selectionEnd = input.value.length;
                    }
                }, 0);
            }
        },

        _blur: function () {
            clearTimeout(this._focusing);
            this.$element.removeClass('t-state-error');

            if (this.enabled) {
                this.$text.show();
                this._hideTextBoxValue();
            }

            var min = this.minValue,
                max = this.maxValue,
                parsedValue = this.parse(this.$element.val());

            if (parsedValue != null) {
                if (min != null && parsedValue < min) {
                    parsedValue = min;
                } else if (max != null && parsedValue > max) {
                    parsedValue = max;
                }
                parsedValue = parseFloat(parsedValue.toFixed(this.digits));
            }
            this._update(parsedValue);
        },

        _clearTimer: function (e) {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
            clearInterval(this.acceleration);
        },

        _stepper: function (e, stepMod) {
            if (e.which == 1) {

                var step = this.step;

                this._modify(stepMod * step);

                this.timeout = setTimeout($.proxy(function () {
                    this.timer = setInterval($.proxy(function () {
                        this._modify(stepMod * step);
                    }, this), 80);

                    this.acceleration = setInterval(function () { step += 1; }, 1000);
                }, this), 200);
            }
        },

        _modify: function (step) {
            var value = this.parse(this.element.value),
                min = this.minValue,
                max = this.maxValue;

            value = value ? value + step : step;

            if (min !== null && value < min) {
                value = min;
            } else if (max !== null && value > max) {
                value = max;
            }

            this._update(parseFloat(value.toFixed(this.digits)));
        },

        _update: function (val) {
            var oldValue = this.val;
            this._value(val);

            if (oldValue != val) {
                if ($t.trigger(this.element, 'valueChange', { oldValue: oldValue, newValue: val })) {
                    this._value(oldValue);
                }
            }
        },

        _value: function (value) {
            var parsedValue = (typeof value === "number") ? value : this.parse(value),
                text = this.enabled ? this.text : '',
                isNull = parsedValue === null;

            if (parsedValue != null) {
                parsedValue = parseFloat(parsedValue.toFixed(this.digits));
            }

            this.val = parsedValue;
            this.$element.val(isNull ? '' : this.formatEdit(parsedValue));
            this.$text.html(isNull ? text : this.format(parsedValue));
            this.$text.toggleClass('t-state-empty', isNull);
        },

        _hideTextBoxValue: function () {
            var $element = this.$element;
            if (this.enabled) {
                setTimeout(function () { $element.css('color', $element.css('background-color')); });
                if ($.browser.opera) {
                    $element.css({ 'color': $element.css('background-color'), 'text-indent': '-4444px' });
                }
            } else {
                if (!$.browser.msie) {
                    $element.css({ 'color': $element.css('background-color'), 'text-indent': '-4444px' });
                } else {
                    $element.css({ 'color': $element.css('background-color'), 'letter-spacing': '1000px' });
                }
            }
        },

        _showTextBoxValue: function () {
            var $element = this.$element,
                $text = this.$text;
            if (this.enabled) {
                setTimeout(function () { $element.css({ 'color': $text.css('color'), 'text-indent': '', 'letter-spacing': '' }); });
            } else {
                if (!$.browser.msie) {
                    $element.css({ 'color': $text.css('background-color'), 'text-indent': '0px' });
                } else {
                    $element.css({ 'color': $text.css('background-color'), 'letter-spacing': '0px' });
                }
            }
        },

        _onParentFormReset: function () {
            var that = this;
            window.setTimeout(function () { that._value(that.$element.val()); }, 1);
        },

        enable: function () {
            var $buttons = this.$wrapper.find('.t-arrow-up, .t-arrow-down'),
                clearTimerProxy = $.proxy(this._clearTimer, this);

            this.enabled = true;
            this.$element.removeAttr("disabled");

            if (!this.val && this.val != 0) {
                this.$text
                    .addClass('t-state-empty')
                    .html(this.text);
            } else {
                this._hideTextBoxValue();
            }
            this.$wrapper.removeClass('t-state-disabled');
            $buttons.unbind('mouseup').unbind('mouseout').unbind('dblclick')
                    .bind({
                        mouseup: clearTimerProxy,
                        mouseout: clearTimerProxy,
                        dblclick: clearTimerProxy
                    });

            var eventName = "mousedown";
            $buttons.eq(0)
                    .unbind(eventName)
                    .bind(eventName, $.proxy(function (e) {
                        this._stepper(e, 1);
                    }, this));

            $buttons.eq(1)
                    .unbind(eventName)
                    .bind(eventName, $.proxy(function (e) {
                        this._stepper(e, -1);
                    }, this));
        },

        disable: function () {
            var that = this;
            that.enabled = false;

            that.$wrapper
                .addClass('t-state-disabled')
                .find('.t-icon')
                    .unbind('mousedown')
                    .bind('mousedown', $t.preventDefault);

            that.$element.attr('disabled', 'disabled');
            that.$text.css("color", "");

            if (!that.val && that.val != 0) {
                that.$text.html('');
            } else {
                that._hideTextBoxValue();
            }
        },

        value: function (value) {
            if (value === undefined) {
                return this.parse(this.element.value);
            }

            var parsedValue = (typeof value === "number") ? value : this.parse(value);
            if (!this.inRange(parsedValue, this.minValue, this.maxValue)) {
                parsedValue = null;
            }

            this._value(parsedValue);
        },

        formatEdit: function (value) {
            var separator = this.separator;

            if (value.toString().toLowerCase().indexOf("e") > -1) {
                value = value.toFixed(this.digits);
            }

            if (value && separator != '.'){
                value = value.toString().replace('.', separator);
            }
            return value;
        },

        format: function (value) {
            return $t.formatNumber(value,
                                           this.numFormat,
                                           this.digits,
                                           this.separator,
                                           this.groupSeparator,
                                           this.groupSize,
                                           this.positive,
                                           this.negative,
                                           this.symbol,
                                           true);
        },

        inRange: function (key, min, max) {
            return key === null || ((min !== null ? key >= min : true) && (max !== null ? key <= max : true));
        },

        parse: function (value) {
            var result = null,
                separator = this.separator;

            if (value || value == "0") {
                if (typeof value == typeof 1) {
                    return value;
                }

                if (value.toLowerCase().indexOf("e") > -1 && !isNaN(Number(value))) {
                    value = Number(value);
                    value = value.toFixed(this.digits).replace('.', separator);
                }

                value = value.replace(this.replaceRegExp, '');
                if (separator && separator != '.') {
                    value = value.replace(separator, '.');
                }

                var negativeFormatPattern = $t.patterns[this.type].negative[this.negative]
                        .replace(/(\(|\))/g, '\\$1').replace('*', '').replace('n', '([\\d|\\.]*)'),
                    negativeFormatRegEx = new RegExp(negativeFormatPattern);

                if (negativeFormatRegEx.test(value))
                    result = -parseFloat(negativeFormatRegEx.exec(value)[1]);
                else
                    result = parseFloat(value);
            }
            return isNaN(result) ? null : result;
        }
    }

    $.fn.tTextBox = function (options) {
        var type = 'numeric';
        if (options && options.type) {
            type = options.type;
        }

        var defaults = $.fn.tTextBox.defaults[type];
        defaults.digits = $t.cultureInfo[type + 'decimaldigits'];
        defaults.separator = $t.cultureInfo[type + 'decimalseparator'];
        defaults.groupSeparator = $t.cultureInfo[type + 'groupseparator'];
        defaults.groupSize = $t.cultureInfo[type + 'groupsize'];
        defaults.positive = $t.cultureInfo[type + 'positive'];
        defaults.negative = $t.cultureInfo[type + 'negative'];
        defaults.symbol = $t.cultureInfo[type + 'symbol'];

        options = $.extend({}, defaults, options);
        options.type = type;

        return this.each(function () {
            var $element = $(this);
            options = $.meta ? $.extend({}, options, $element.data()) : options;

            if (!$element.data('tTextBox')) {
                $element.data('tTextBox', new $t.textbox(this, options));
                $t.trigger(this, 'load');
            }
        });
    };

    var commonDefaults = {
        val: null,
        text: '',
        step: 1,
        inputAttributes: '',
        increaseButtonTitle: "Increase value",
        decreaseButtonTitle: "Decrease value",
        showIncreaseButton: true,
        showDecreaseButton: true
    };

    $.fn.tTextBox.defaults = {
        numeric: $.extend(commonDefaults, {
            minValue: -100,
            maxValue: 100
        }),
        currency: $.extend(commonDefaults, {
            minValue: 0,
            maxValue: 1000
        }),
        percent: $.extend(commonDefaults, {
            minValue: 0,
            maxValue: 100
        })
    };

    function currentSelection(element) {
        var selectionStart = -1,
            selectionEnd = -1;

        if (document.selection) {
            var selectedText = element.document.selection.createRange().text,
                length = selectedText.length;
            if (length > 0) {
                selectionStart = element.value.indexOf(selectedText);
                selectionEnd = length;
            }
        } else if (element.selectionStart !== undefined) {
            var selStart = element.selectionStart,
                selEnd = element.selectionEnd;
            if (selStart != selEnd) {
                selectionStart = selStart;
                selectionEnd = selEnd;
            }
        }
        return { start: selectionStart, end: selectionEnd };
    }

})(jQuery);
