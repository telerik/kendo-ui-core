(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        parse = kendo.parseFloat,
        DIV = "<div />"
        HIDE = "k-hide-text",
        INPUT = "k-input",
        CHANGE = "change";

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
            if (!value && value !== 0) { //refactor
                value = element.val();
            }

            that.value(value);

            that._blur();
            that._old = that._value;
        },
        options: {
            value: null,
            min: null,
            max: null,
            format: "n",
            step: 1,
            empty: "Enter value"
        },

        value: function(value) {
            var that = this,
                options = that.options,
                format = options.format,
                decimals = options.decimals,
                numberFormat = kendo.culture().numberFormat;

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

            if (value) {
                value = parseFloat(value.toFixed(decimals));
            }

            that._value = value = that._adjust(value);
            that.element.val(value === null ? "" : value.toString().replace(".", numberFormat["."]));
            that._text.html(value === null ? options.empty : kendo.toString(value, format));
        },

        _adjust: function(value) {
            var that = this,
            options = that.options,
            min = options.min,
            max = options.max;

            if (min !== null && value < min) {
                value = min;
            } else if (max !== null && value > max) {
                value = max;
            }

            return value;
        },

        _arrows: function() {
            var that = this,
            element = that.element,
            EVENTNAME = kendo.support.touch ? "touchstart" : "mousedown",
            arrows;

            arrows = element.siblings(".k-icon");

            if (!arrows[0]) {
                arrows = $(('<span class="k-link k-icon k-arrow-up" title="Increase value">Increment</span>'
                          + '<span class="k-link k-icon k-arrow-down" title="Decrease value">Decrement</span>')).insertAfter(element);
            }

            that._upArrow = arrows.eq(0).bind(EVENTNAME, function(e) { e.preventDefault(); that._spin(1); })
                                        .bind("mouseup mouseleave", function() { that._stop(); });
            that._downArrow = arrows.eq(1).bind(EVENTNAME, function(e) { e.preventDefault(); that._spin(-1); })
                                          .bind("mouseup mouseleave", function() { that._stop(); });

        },

        _blur: function() {
            var that = this,
                element = that.element;

            that._text.show();
            that._change(element.val());

            element.addClass(HIDE).val();
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
                element = that.element.show()[0],
                wrapper = that.wrapper,
                CLASSNAME = "k-formatted-value",
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

        _spin: function(step, e) {
            var that = this;

            clearTimeout( that._spinning );
            that._spinning = setTimeout(function() {
                that._spin(step, event );
            }, 300 );

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
            that.wrapper = wrapper.addClass("k-widget k-numerictextbox").show(); //should be k-textbox
        }
    });

    ui.plugin("TextBox", TextBox);
})(jQuery);
