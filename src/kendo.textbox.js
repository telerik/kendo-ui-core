(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        parse = kendo.parseFloat,
        DIV = "<div />"
        HIDE = "k-hide-text",
        INPUT = "k-input",
        CHANGE = "change",
        NULL = null;

    var TextBox = Component.extend(/** @lends kendo.ui.TextBox.prototype */{
        init: function(element, options) {
            var that = this,
                value;

            Component.fn.init.call(that, element, options);

            element = that.element.addClass(INPUT);
            options = that.options;

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
                    that._focus();
                },
                focusout: function() {
                    that._bluring = setTimeout(function() {
                        that._blur();
                    }, 100);
                }
            });

            that.bind(CHANGE, options);

            value = options.value;
            if (value === null) {
                value = element.val();
            }

            that.value(value);

            that._blur();
            that._old = that._value;
        },
        options: {
            value: NULL,
            min: NULL,
            max: NULL,
            format: "n",
            step: 1,
            empty: "Enter value",
            upArrowText: "Increase value",
            downArrowText: "Decrease value"
        },

        value: function(value) {
            var that = this,
                options = that.options,
                format = options.format,
                decimals = options.decimals,
                numberFormat = kendo.culture().numberFormat,
                isNULL;

            if (value === undefined) {
                return that._value;
            }

            if (format.indexOf("c") > -1) {
                numberFormat = numberFormat.currency;
            } else if (format.indexOf("p") > -1) {
                numberFormat = numberFormat.percent;
            }

            if (decimals === undefined) {
                decimals = numberFormat.decimals;
            }

            value = parse(value);

            isNULL = value === null;

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
            touch = kendo.support.touch,
            TOUCHEND = "touchend",
            START = touch ? "touchstart" : "mousedown",
            END = touch ? "touchmove " + TOUCHEND : "mouseup mouseleave",
            stop = function(e) {
                if (!touch || kendo.eventTarget(e) != e.currentTarget || e.type === TOUCHEND) {
                    that._stop();
                }
            };

            arrows = element.siblings(".k-icon");

            if (!arrows[0]) {
                arrows = $(buttonHtml("up", options.upArrowText) + buttonHtml("down", options.downArrowText)).insertAfter(element);
            }

            that._upArrow = arrows.eq(0)
                                  .bind(END, stop)
                                  .bind(START, function(e) {
                                      e.preventDefault();
                                      that._spin(1);
                                  });

            that._downArrow = arrows.eq(1)
                                    .bind(END, stop)
                                    .bind(START, function(e) {
                                        e.preventDefault();
                                        that._spin(-1);
                                    });
        },

        _blur: function() {
            var that = this;

            that._text.show();
            that._change(that.element.addClass(HIDE).val());
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

        _focus: function() {
            var that = this;

            that.element.removeClass(HIDE);
            that._text.hide();
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

    ui.plugin("TextBox", TextBox);
})(jQuery);
