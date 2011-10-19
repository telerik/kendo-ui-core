(function($, undefined) {

    var kendo = window.kendo,
        ui = kendo.ui,
        Component = ui.Component,
        DIV = "<div />"
        CHANGE = "change";

    var TextBox = Component.extend(/** @lends kendo.ui.TextBox.prototype */{
        init: function(element, options) {
            var that = this,
                value;

            Component.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrapper();
            that._arrows();
            that._div();

            value = options.value;
            if (!value || value !== 0) {
                value = element.val();
            }

            that.bind(CHANGE, options);

            that.value(value);
        },
        options: {
            value: null,
            format: "n",
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

            value = kendo.parseFloat(value);

            if (value) {
                value = parseFloat(value.toFixed(decimals));
            }

            that._value = value;
            that.element.val(value === null ? "" : value.toString().replace(".", numberFormat["."]));
            that._text.html(value === null ? options.empty : kendo.toString(value, format));
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

            that._upArrow = arrows.eq(0).bind(EVENTNAME, function() { that.step(1); });
            that._downArrow = arrows.eq(1).bind(EVENTNAME, function() { that.step(-1); });

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
            that._text = text.addClass(element.className.replace("k-input"));
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

    ui.plugin("TextBox", TextBox);
})(jQuery);
