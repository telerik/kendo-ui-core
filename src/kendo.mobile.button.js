(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = support.mousedown,
        MOUSEUP = support.mouseup,
        CLICK = "click",
        proxy = $.proxy;

    /**
    * @name kendo.mobile.ui.Button.Description
    * @section The Button widget navigates between mobile Application views when pressed.
    *
    * <h3>Getting Started</h3>
    * The Kendo mobile Application will automatically initialize a mobile Button for every element with <code>role</code> data attribute set to <code>button</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector. The button element may be either <code>A</code> or <code>BUTTON</code> element.
    *
    * @exampleTitle Initialize Kendo mobile Button based on role data attribute.
    * @example
    * <a href="#foo" data-role="button">Foo</a>
    *
    * @exampleTitle Initialize Kendo mobile Button using a jQuery selector
    * @example
    * var button = $("#button").kendoMobileButton();
    *
    * @section
    *
    * <h3>Customizing mobile Button appearance</h3>
    * Every Kendo Mobile Button color can be customized by simply setting its background-color (either inline or by using a CSS selector with specificity of 20+.
    * @exampleTitle Initialize a green Kendo mobile Button
    * @example
    * <a href="#foo" data-role="button" style="background-color: green">Foo</a>
    *
    * @section
    * You can target platforms separately with their respective root classes.
    * @exampleTitle Initialize a green Kendo mobile Button in iOS and a red one in Android
    * @example
    * <style>
    *     .km-ios .checkout { background-color: green; }
    *     .km-android .checkout { background-color: red; }
    * </style>
    * <a href="#foo" data-role="button" class="checkout">Foo</a>
    */
    var Button = Widget.extend(/** @lends kendo.mobile.ui.Button.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._releaseProxy = proxy(that._release, that);

            that.element.bind(MOUSEUP, that._releaseProxy);

            that.bind([
                /**
                 * Fires when button is clicked
                 * @name kendo.mobile.ui.Button#click
                 * @event
                 * @param {Event} e
                 * @param {jQueryObject} e.target The clicked DOM element
                 */
                 CLICK
            ], options);
        },

        options: {
            name: "Button",
            style: "",
            selector: kendo.roleSelector("button"),
            enable: true
        },

        _release: function(e) {
            if (this.trigger(CLICK, {target: $(e.target)})) {
                e.preventDefault();
            }
        },

        _wrap: function() {
            var that = this,
                style = that.options.style,
                element = that.element,
                span;

            span = element.addClass("km-button")
                          .children("span");

            if (style) {
                element.addClass("km-" + style);
            }

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text")
                .find("img")
                .addClass("km-image");
        }
    });

    /**
    * @name kendo.mobile.ui.BackButton.Description
    * @section The BackButton widget navigates to the previous mobile View when pressed.
    *
    * @exampleTitle Initialize Kendo mobile BackButton based on role data attribute.
    * @example
    * <a data-role="back-button">Foo</a>
    *
    * @exampleTitle Initialize Kendo mobile BackButton using a jQuery selector
    * @example
    * var button = $("#button").kendoMobileBackButton();
    */
    var BackButton = Button.extend(/** @lends kendo.mobile.ui.BackButton.prototype */{
        options: {
            name: "BackButton",
            style: "back",
            selector: kendo.roleSelector("back-button"),
        },

        /**
        * @constructs
        * @extends kendo.mobile.ui.Button
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            Button.fn.init.call(this, element, options);
            this.element.attr("href", ":back");
        }
    });

    ui.plugin(Button);
    ui.plugin(BackButton);
})(jQuery);
