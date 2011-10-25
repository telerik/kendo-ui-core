(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        Component = ui.Component,
        parse = kendo.parseFloat,
        touch = kendo.support.touch,
        TOUCHEND = "touchend",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchmove " + TOUCHEND : "mouseup mouseleave",
        HOVER = "k-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        DISABLED = "disabled",
        DIV = "<div />"
        HIDE = "k-hide-text",
        INPUT = "k-input",
        CHANGE = "change",
        NULL = null,
        decimals = {
            190 : ".",
            188 : ","
        };

    var TextBox = Component.extend(/** @lends kendo.ui.TextBox.prototype */{
        init: function(element, options) {
            var that = this,
                min, max, value;

            Component.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.addClass(INPUT).bind("keydown", $.proxy(that._keydown, that));

            that._wrapper();
            that._arrows();
            that._div();

            that._text.click(function() {
                that.wrapper.focusin();
            });

            that.wrapper.bind({
                focusin: function() {
                    clearTimeout(that._bluring);
                    that.element.focus();
                    that._toggleText(false);
                },
                focusout: function() {
                    that._bluring = setTimeout(function() {
                        that._blur();
                    }, 100);
                }
            });

            that.bind(CHANGE, options);

            min = parse(element.attr("min"));
            max = parse(element.attr("max"));

            if (options.min === NULL && min !== NULL) {
                options.min = min;
            }

            if (options.max === NULL && max !== NULL) {
                options.max = max;
            }

            that.enable(!element.is('[disabled]'));

            value = options.value;
            that.value(value !== NULL ? value : element.val());

            that._blur();
            that._old = that._value;
        },
        options: {
            value: NULL,
            min: NULL,
            max: NULL,
            step: 1,
            format: "n",
            empty: "Enter value",
            upArrowText: "Increase value",
            downArrowText: "Decrease value"
        },

        enable: function(enable) {
            var that = this,
                upArrow = that._upArrow,
                downArrow = that._downArrow,
                wrapper = that.wrapper,
                element = that.element;

            upArrow.unbind(MOUSEDOWN);
            downArrow.unbind(MOUSEDOWN);

            that._toggleText(enable);

            if (enable === false) {
                wrapper
                    .addClass(DISABLED)
                    .unbind(HOVEREVENTS);

                element.attr(DISABLED, DISABLED);
            } else {
                wrapper
                    .removeClass(DISABLED)
                    .bind(HOVEREVENTS, that._toggleHover);

                element
                    .removeAttr(DISABLED);

                upArrow.bind(MOUSEDOWN, function(e) {
                    e.preventDefault();
                    that._spin(1, e);
                });

                downArrow.bind(MOUSEDOWN, function(e) {
                    e.preventDefault();
                    that._spin(-1, e);
                });
            }
        },

        value: function(value) {
            var that = this,
                options = that.options,
                format = options.format,
                decimals = options.decimals,
                numberFormat = that._format(format),
                isNULL;

            if (value === undefined) {
                return that._value;
            }

            if (decimals === undefined) {
                decimals = numberFormat.decimals;
            }

            value = parse(value);

            isNULL = value === NULL;

            if (!isNULL) {
                value = parseFloat(value.toFixed(decimals));
            }

            that._value = value = that._adjust(value);
            that.element.val(isNULL ? "" : value.toString().replace(".", numberFormat["."]));
            that._text.html(isNULL ? options.empty : kendo.toString(value, format));
        },

        _adjust: function(value) {
            var that = this,
            options = that.options,
            min = options.min,
            max = options.max;

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
            options = that.options,
            element = that.element,
            stop = function(e) {
                if (!touch || kendo.eventTarget(e) != e.currentTarget || e.type === TOUCHEND) {
                    that._stop();
                }
            };

            arrows = element.siblings(".k-icon");

            if (!arrows[0]) {
                arrows = $(buttonHtml("up", options.upArrowText) + buttonHtml("down", options.downArrowText)).insertAfter(element);
            }

            that._upArrow = arrows.eq(0).bind(MOUSEUP, stop);
            that._downArrow = arrows.eq(1).bind(MOUSEUP, stop);
        },

        _blur: function() {
            var that = this;

            that._toggleText(true);
            that._change(that.element.val());
        },

        _change: function(value) {
            var that = this;

            that.value(value);

            if (that._old != that._value) {
                that._old = that._value;
                that.trigger(CHANGE);
            }
        },

        _div: function() {
            var that = this,
                CLASSNAME = "k-formatted-value",
                element = that.element.show()[0],
                wrapper = that.wrapper,
                text;

           text = wrapper.find("." + CLASSNAME);

            if (!text[0]) {
                text = $(DIV).insertBefore(element).addClass(CLASSNAME);
            }

            text[0].style.cssText = element.style.cssText;
            that._text = text.addClass(element.className.replace(INPUT));
        },

        _format: function(format) {
            var that = this,
                options = that.options,
                numberFormat = kendo.culture().numberFormat;


            if (format.indexOf("c") > -1) {
                numberFormat = numberFormat.currency;
            } else if (format.indexOf("p") > -1) {
                numberFormat = numberFormat.percent;
            }

            return numberFormat;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode;

            if (key == keys.DOWN) {
                that._step(-1);
            } else if (key == keys.UP) {
                that._step(1);
            }

            if (!that._prevent(key) && !e.ctrlKey && !e.shiftKey) {
                e.preventDefault();
            }
        },

        _prevent: function(key) {
            var that = this,
                valid = false,
                min = that.options.min,
                element = that.element[0],
                value = element.value,
                separator = that._format(that.options.format)["."];

            if (key > 47 && key < 58) {
                valid = true;
            } else if (key > 95 && key < 106) {
                valid = true;
            } else if (key > 32 && key < 37) { //PageUp/PageDown Home/End
                valid = true;
            } else if (key == 46 || key == 45 || key == 37 || key == 39) {
                valid = true;
            } else if (decimals[key] === separator && value.indexOf(separator) == -1) {
                valid = true;
            } else if (key > 16 && key < 21) {
                valid = true;
            } else if (key == 8 || key == 9 || key == 13) {
                valid = true;
            } else if ((min === NULL || min < 0) && value.indexOf("-") == -1 && (key == 189 || key == 109) && getCaret(element) == 0) { //sign
                valid = true;
            } else if (key == 110 && value.indexOf(separator) == -1) {
                valid = false;
                var idx = getCaret(element),
                end = value.substring(idx);

                element.value = value.substring(0, idx) + separator + end;
            }

            return valid;
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
                value = parse(element.val()) || 0;

            if (document.activeElement != element[0]) {
                element.focus();
            }

            value += that.options.step * parse(step);

            value = that._adjust(value);
            that.value(value);
        },

        _stop: function() {
            clearTimeout( this._spinning );
        },

        _toggleHover: function(e) {
            if (!touch) {
                $(e.currentTarget).toggleClass(HOVER, e.type === "mouseenter");
            }
        },

        _toggleText: function(toggle) {
            var that = this;

            that._text.toggle(toggle);
            that.element.toggleClass(HIDE, toggle)
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div.k-widget")) {
                wrapper = element.hide().wrap(DIV).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-textbox").show();
        }
    });

    function buttonHtml(className, text) {
        return '<span class="k-link k-icon k-arrow-' + className + '" title="' + text + '">' + text + '</span>'
    }

    function getCaret(el) {
        if (el.selectionStart) {
            return el.selectionStart;
        } else if (document.selection) {
            el.focus();

            var r = document.selection.createRange();
            if (r == NULL) {
                return 0;
            }

            var re = el.createTextRange(),
            rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint('EndToStart', re);

            return rc.text.length;
        }
        return 0;
    }

    ui.plugin("TextBox", TextBox);
})(jQuery);
