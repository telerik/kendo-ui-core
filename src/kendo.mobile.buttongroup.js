(function($, undefined) {
    /**
    * @name kendo.mobile.ui.ButtonGroup.Description
    * @section The ButtonGroup widget is a linear set of segmentes, which function as button.
    *
    * <h3>Getting Started</h3>
    * The Kendo mobile Application will automatically initialize a mobile ButtonGroup for every element with <code>role</code> data attribute set to <code>buttongroup</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector. The ButtonGroup element may be <code>UL</code> element.
    *
    * @exampleTitle Initialize Kendo mobile ButtonGroup based on role data attribute.
    * @example
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li>Option1</li>
    *   <li>Option2</li>
    * </ul>
    *
    * @exampleTitle Initialize Kendo mobile ButtonGroup using a jQuery selector
    * @example
    * var buttongroup = $("#buttongroup").kendoMobileButtonGroup();
    *
    * @section
    *
    * <h3>Customizing mobile ButtonGroup appearance</h3>
    * Every Kendo Mobile ButtonGroup color can be customized by simply setting its background-color (either inline or by using a CSS selector).
    * @exampleTitle Initialize a green Kendo mobile ButtonGroup
    * @example
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li style="background-color: green">Option1</li>
    *   <li style="beckground-color: red">Option2</li>
    * </ul>
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
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li data-icon="custom">Option1</li>
    *   <li>Option2</li>
    * </ul>
    */

    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        ACTIVE = "km-state-active",
        SELECT = "select",
        SELECTOR = "li:not(." + ACTIVE +")",
        MOUSEDOWN = kendo.support.touch ? "touchstart" : "mousedown";

    var ButtonGroup = Widget.extend(/** @lends kendo.mobile.ui.ButtonGroup.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Number} [index] Defines the initial selected item.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-radiogroup")
                .delegate(SELECTOR, MOUSEDOWN, $.proxy(that._mousedown, that))
                .find("li").each(that._button);

            that.bind([
                /**
                * Fires when different button is selected
                * @name kendo.mobile.ui.ButtonGroup#select
                * @event
                * @param {Event} e
                *
                * @exampleTitle Handle select event
                * @example
                * <ul id="buttongroup" data-role="buttongroup" />
                *   <li>Option1</li>
                *   <li>Option2</li>
                * </ul>
                *
                * <script>
                *  $("#buttongroup").data("kendoMobileButtonGroup").bind("select", function(e) {
                *      //handle select event
                *  }
                * </script>
                */
                SELECT
            ], that.options);

            that.select(that.options.index);
        },

        options: {
            name: "ButtonGroup",
            selector: kendo.roleSelector("buttongroup")
        },

        /**
        * Get the currently selected button element.
        * @returns {jQueryObject} the currenlty selected button element.
        */
        current: function() {
            return this._current;
        },

        /**
        * Selects a button.
        * @param {jQueryObject | Number} li LI element or index of the item, which defines the button that should be selected.
        * @example
        * var buttongroup = $("#buttongroup").data("kendoMobileButtonGroup");
        *
        * // selects by jQuery object
        * buttongroup.select(buttongroup.element.children().eq(0));
        *
        * // selects by index
        * buttongroup.select(1);
        */
        select: function (li) {
            var that = this,
                current = that._current,
                index = -1;

            if (current) {
                current.removeClass(ACTIVE)
            }

            if (li !== undefined) {
                if (typeof li === "number") {
                    index = li;
                    li = that.element.children().eq(li);
                } else if (li && li.nodeType) {
                    li = $(li);
                    index = li.index();
                }

                li.addClass(ACTIVE);
            }

            that._current = li;
            that.selectedIndex = index;
        },

        _button: function() {
            var button = $(this).addClass("km-button"),
                icon = button.data(kendo.ns + "icon"),
                span = button.children("span"),
                image = button.find("img").addClass("km-image");

            if (!span[0]) {
                span = button.wrapInner("<span/>").children("span");
            }

            span.addClass("km-text");

            if (!image[0] && icon) {
                button.prepend($('<span class="km-icon km-' + icon + '"/>'));
            }
        },

        _mousedown: function(e) {
            var that = this;
            that.select(e.currentTarget);
            that.trigger(SELECT);
        }
    });

    ui.plugin(ButtonGroup);
})(jQuery);
