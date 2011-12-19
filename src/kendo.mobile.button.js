(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSEDOWN = support.mousedown,
        MOUSEUP = support.mouseup,
        CLICK = "click",
        proxy = $.proxy;
    /**
    * @name kendo.ui.MobileButton.Description
    * @section The MobileButton widget navigates between mobile Application views when pressed.
    *
    * <h3>Getting Started</h3>
    * The Kendo MobileApplication will automatically initialize a MobileButton for every element with <code>role</code> data attribute set to <code>button</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector. The button element may be either <code>A</code> or <code>BUTTON</code> element.
    *
    * @exampleTitle Initialize Kendo MobileButton based on role data attribute.
    * @example
    * <a href="#foo" data-role="button">Foo</a>
    *
    * @exampleTitle Initialize Kendo MobileButton using a jQuery selector
    * @example
    * var button = $("#button").kendoMobileButton();
    *
    * @section
    *
    * <h3>Customizing MobileButton appearance</h3>
    * // TODO
    */

    var MobileButton = MobileWidget.extend(/** @lends kendo.ui.MobileButton.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.MobileWidget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            var that = this;

            MobileWidget.fn.init.call(that, element, options);

            options = that.options;

            that._wrap();

            that._releaseProxy = proxy(that._release, that);

            that.element.bind(MOUSEUP, that._releaseProxy);

            that.bind([
                /**
                 * Fires when button is clicked
                 * @name kendo.ui.MobileButton#click
                 * @event
                 * @param {Event} e
                 * @param {jQueryObject} e.target The clicked DOM element
                 */
              CLICK
            ], options);
        },

        options: {
            name: "MobileButton",
            style: "",
            selector: kendo.roleSelector("button")
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

    var BackButton = MobileButton.extend({
        options: {
            name: "MobileBackButton",
            style: "back",
            selector: kendo.roleSelector("back-button"),
        },

        init: function(element, options) {
            MobileButton.fn.init.call(this, element, options);
            this.element.attr("href", ":back");
        }
    });

    ui.plugin(MobileButton);
    ui.plugin(BackButton);
})(jQuery);
