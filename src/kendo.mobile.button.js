(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        MOUSECANCEL = support.mousecancel,
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
    *
    * @section
    * <h3>Button icons</h3>
    * A button icon can be set in two ways - either by adding an <code>img</code> element inside the <code>a</code> element, or by setting an <code>icon</code> data attribute to the <code>a</code> element.
    * Kendo mobile comes out of the box with several ready to use icons:
    *
    * <ul>
    *   <li>featured</li>
    *   <li>toprated</li>,
    *   <li>favorites</li>
    *   <li>mostviewed</li>
    *   <li>bookmarks</li>
    *   <li>contacts</li>
    *   <li>downloads</li>
    *   <li>more</li>
    *   <li>mostrecent</li>
    *   <li>recents</li>
    *   <li>history</li>
    *   <li>add</li>,
    *   <li>contactadd</li>
    *   <li>detaildisclosure</li>
    *   <li>info</li>
    *   <li>action</li>
    *   <li>camera</li>
    *   <li>compose</li>
    *   <li>search</li>
    *   <li>trash</li>
    *   <li>organize</li>
    *   <li>reply</li>
    *   <li>stop</li>
    *   <li>refresh</li>
    *   <li>play</li>
    *   <li>fastforward</li>
    *   <li>pause</li>
    *   <li>rewind</li>
    *   <li>settings</li>
    *   <li>globe</li>
    *   <li>home</li>
    *   <li>cart</li>
    *   <li>about</li>
    * </ul>
    *
    * Additional icons may be added by defining the respective CSS class. If the <code>icon</code> data attribute is set to <code>custom</code>, the tab will receive <code>km-custom</code> CSS class.
    * @exampleTitle Define custom button icon.
    * @example
    * .km-custom {
    *   background-image: ...
    * }
    *
    * <div data-role="button">
    *   <a href="#index" data-icon="custom">Home</a>
    * </div>
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

            that.element.bind(MOUSEDOWN + " " + MOUSECANCEL + " " + MOUSEUP, function (e) {
                $(e.target).closest(".km-button,.km-detail").toggleClass("km-state-active", e.type == MOUSEDOWN);
            });

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

        _style: function () {
            var style = this.options.style,
                element = this.element;

            if (style) {
                var styles = style.split(" ");
                $.each(styles, function () {
                    element.addClass("km-" + this);
                });
            }
        },

        _wrap: function() {
            var that = this,
                element = that.element,
                icon = element.data(kendo.ns + "icon"),
                iconSpan = $('<span class="km-icon"/>'),
                span;

            span = element.addClass("km-button")
                          .children("span");

            that._style();

            if (!span[0]) {
                span = element.wrapInner("<span/>").children("span");
            }

            var image = span.addClass("km-text")
                            .find("img")
                            .addClass("km-image");

            if (!image[0] && icon) {
                element.prepend(iconSpan);
                iconSpan.addClass("km-" + icon);
            }
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
            selector: kendo.roleSelector("back-button")
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

    /**
    * @name kendo.mobile.ui.DetailButton.Description
    * @section The DetailButton widget navigates to a detail mobile View when pressed.
    *
    * @exampleTitle Initialize Kendo mobile DetailButton based on role data attribute.
    * @example
    * <a data-role="detail-button">Foo</a>
    *
    * @exampleTitle Initialize Kendo mobile DetailButton using a jQuery selector
    * @example
    * var button = $("#button").kendoMobileDetailButton();
    */
    var DetailButton = Button.extend(/** @lends kendo.mobile.ui.DetailButton.prototype */{
        options: {
            name: "DetailButton",
            style: "",
            selector: kendo.roleSelector("detail-button")
        },

        /**
        * @constructs
        * @extends kendo.mobile.ui.Button
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        */
        init: function(element, options) {
            Button.fn.init.call(this, element, options);
        },

        _style: function () {
            var style = this.options.style + " detail",
                element = this.element;

            if (style) {
                var styles = style.split(" ");
                $.each(styles, function () {
                    element.addClass("km-" + this);
                });
                element.removeClass("km-button");
            }
        }

    });

    ui.plugin(Button);
    ui.plugin(BackButton);
    ui.plugin(DetailButton);
})(jQuery);
