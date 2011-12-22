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
    * // TODO
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

    var BackButton = Button.extend({
        options: {
            name: "BackButton",
            style: "back",
            selector: kendo.roleSelector("back-button"),
        },

        init: function(element, options) {
            Button.fn.init.call(this, element, options);
            this.element.attr("href", ":back");
        }
    });

    ui.plugin(Button);
    ui.plugin(BackButton);
})(jQuery);
