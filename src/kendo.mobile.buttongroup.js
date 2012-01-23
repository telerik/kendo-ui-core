(function($, undefined) {
    /**
    * @name kendo.mobile.ui.ButtonGroup.Description
    * @section The Kendo mobile ButtonGroup widget is a linear set of grouped buttons.
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo mobile Application will automatically initialize a mobile ButtonGroup for every element with <code>role</code> data attribute set to <code>buttongroup</code>
    * present in the views/layouts markup.</p>
    *
    * <p>Alternatively, it can be initialized using a jQuery selector. The ButtonGroup element may be <code>UL</code> element.</p>
    *
    * @exampleTitle Initialize Kendo mobile ButtonGroup based on role data attribute.
    * @example
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li>Option 1</li>
    *   <li>Option 2</li>
    * </ul>
    *
    * @exampleTitle Initialize Kendo mobile ButtonGroup using a jQuery selector
    * @example
    * var buttongroup = $("#buttongroup").kendoMobileButtonGroup();
    *
    * @section
    *
    * <h3>Customizing mobile ButtonGroup appearance</h3>
    * Every Kendo Mobile ButtonGroup color can be customized by setting its <code>background-color</code> inline or using a CSS selector.
    * @exampleTitle Green Kendo mobile ButtonGroup
    * @example
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li style="background-color: green">Option1</li>
    *   <li style="beckground-color: red">Option2</li>
    * </ul>
    *
    * @section
    * <h3>Button icons</h3>
    * <p>A Button icon can be set in two ways - either by adding an <code>img</code> element inside the Button <code>a</code> element,
    * or by setting an <code>icon</code> data attribute to the Button <code>a</code> element.</p>
    * <p>Kendo mobile comes out of the box with several ready to use icons:</p>
    *
    * * <ul id="icon-list">
    *   <li title=".km-about"><span class="km-icon km-about"></span>about</li>
    *   <li title=".km-action"><span class="km-icon km-action"></span>action</li>
    *   <li title=".km-add"><span class="km-icon km-add"></span>add</li>
    *   <li title=".km-bookmarks"><span class="km-icon km-bookmarks"></span>bookmarks</li>
    *   <li title=".km-camera"><span class="km-icon km-camera"></span>camera</li>
    *   <li title=".km-cart"><span class="km-icon km-cart"></span>cart</li>
    *   <li title=".km-compose"><span class="km-icon km-compose"></span>compose</li>
    *   <li title=".km-contacts"><span class="km-icon km-contacts"></span>contacts</li>
    *   <li title=".km-details"><span class="km-icon km-details"></span>details</li>
    *   <li title=".km-downloads"><span class="km-icon km-downloads"></span>downloads</li>
    *   <li title=".km-fastforward"><span class="km-icon km-fastforward"></span>fastforward</li>
    *   <li title=".km-favorites"><span class="km-icon km-favorites"></span>favorites</li>
    *   <li title=".km-featured"><span class="km-icon km-featured"></span>featured</li>
    *   <li title=".km-featured"><span class="km-icon km-toprated"></span>toprated</li>
    *   <li title=".km-globe"><span class="km-icon km-globe"></span>globe</li>
    *   <li title=".km-history"><span class="km-icon km-history"></span>history</li>
    *   <li title=".km-home"><span class="km-icon km-home"></span>home</li>
    *   <li title=".km-info"><span class="km-icon km-info"></span>info</li>
    *   <li title=".km-more"><span class="km-icon km-more"></span>more</li>
    *   <li title=".km-mostrecent"><span class="km-icon km-mostrecent"></span>mostrecent</li>
    *   <li title=".km-mostviewed"><span class="km-icon km-mostviewed"></span>mostviewed</li>
    *   <li title=".km-organize"><span class="km-icon km-organize"></span>organize</li>
    *   <li title=".km-pause"><span class="km-icon km-pause"></span>pause</li>
    *   <li title=".km-play"><span class="km-icon km-play"></span>play</li>
    *   <li title=".km-recents"><span class="km-icon km-recents"></span>recents</li>
    *   <li title=".km-refresh"><span class="km-icon km-refresh"></span>refresh</li>
    *   <li title=".km-reply"><span class="km-icon km-reply"></span>reply</li>
    *   <li title=".km-rewind"><span class="km-icon km-rewind"></span>rewind</li>
    *   <li title=".km-search"><span class="km-icon km-search"></span>search</li>
    *   <li title=".km-settings"><span class="km-icon km-settings"></span>settings</li>
    *   <li title=".km-share"><span class="km-icon km-share"></span>share</li>
    *   <li title=".km-stop"><span class="km-icon km-stop"></span>stop</li>
    *   <li title=".km-trash"><span class="km-icon km-trash"></span>trash</li>
    * </ul>
    *
    * <p>Additional icons may be added by defining the respective CSS class.
    * If the <code>icon</code> data attribute is set to <code>custom</code>, the Button will receive <code>km-custom</code> CSS class.</p>
    * @exampleTitle Define custom button icon.
    * @example
    * <style>
    * .km-custom {
    *   background-image: url("foo.png");
    * }
    * </style>
    *
    * <ul id="buttongroup" data-role="buttongroup" />
    *   <li data-icon="custom">Option 1</li>
    *   <li>Option 2</li>
    * </ul>
    */

    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        ACTIVE = "km-state-active",
        EMPTY_JQUERY_OBJECT = $(),
        SELECT = "select",
        SELECTOR = "li:not(." + ACTIVE +")",
        MOUSEDOWN = kendo.support.touch ? "touchstart" : "mousedown";

    var ButtonGroup = Widget.extend(/** @lends kendo.mobile.ui.ButtonGroup.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Number} [index] Defines the initially selected Button.
        */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.element.addClass("km-buttongroup")
                .delegate(SELECTOR, MOUSEDOWN, $.proxy(that._mousedown, that))
                .find("li").each(that._button);

            that.bind([
                /**
                * Fires when different Button is selected.
                * @name kendo.mobile.ui.ButtonGroup#select
                * @event
                * @param {Event} e
                *
                * @exampleTitle Handle select event
                * @example
                * <ul id="buttongroup" data-role="buttongroup" />
                *   <li>Option 1</li>
                *   <li>Option 2</li>
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

            that._current = EMPTY_JQUERY_OBJECT;
            that.select(that.options.index);
        },

        options: {
            name: "ButtonGroup",
            index: -1
        },

        /**
        * Get the currently selected Button.
        * @returns {jQueryObject} the currently selected Button.
        */
        current: function() {
            return this._current;
        },

        /**
        * Select a Button.
        * @param {jQueryObject | Number} li LI element or index of the Button.
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
            if (li === undefined) {
                return;
            }

            var that = this,
                current = that._current.removeClass(ACTIVE),
                index = -1;

            if (typeof li === "number") {
                index = li;

                if (li > -1) {
                    li = $(that.element[0].children[li]);
                } else {
                    li = EMPTY_JQUERY_OBJECT;
                }

            } else if (li.nodeType) {
                li = $(li);
                index = li.index();
            }

            that._current = li.addClass(ACTIVE);
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
