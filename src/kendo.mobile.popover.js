(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        SHOW = "show",
        HIDE = "hide",
        OPEN = "open",
        CLOSE = "close",
        WRAPPER = '<div class="km-popup-wrapper" />',
        ARROW = '<div class="km-popup-arrow" />',
        OVERLAY = '<div class="km-popup-overlay" />',
        DIRECTION_CLASSES = "km-up km-down km-left km-right",
        Widget = ui.Widget,
        DIRECTIONS = {
            "down": {
                origin: "bottom center",
                position: "top center"
            },
            "up": {
                origin: "top center",
                position: "bottom center"
            },
            "left": {
                origin: "center left",
                position: "center right",
                collision: "fit flip"
            },
            "right": {
                origin: "center right",
                position: "center left",
                collision: "fit flip"
            }
        },

        ANIMATION = {
            animation: {
                open: {
                    effects: "fade:in",
                    duration: 0
                },
                close: {
                    effects: "fade:out",
                    duration: 400
                }
            }
        },
        DIMENSIONS = {
            "horizontal": { offset: "top", size: "height" },
            "vertical": { offset: "left", size: "width" }
        },

        REVERSE = {
            "up": "down",
            "down": "up",
            "left": "right",
            "right": "left"
        };

    var Popup = Widget.extend({
        init: function(element, options) {
            var that = this,
                container = mobile.application.element,
                popupOptions = {
                    viewport: kendo.mobile.application.element,
                    open: function() {
                        that.overlay.show();
                    },

                    activate: $.proxy(that._activate, that),

                    deactivate: function() {
                        that.overlay.hide();
                        that.trigger(HIDE);
                    }
                },
                axis;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            element.wrap(WRAPPER).addClass("km-popup").show();

            axis = that.options.direction.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];

            that.wrapper = element.parent().css({
                width: options.width,
                height: options.height
            }).addClass("km-popup-wrapper km-" + options.direction).hide();

            that.arrow = $(ARROW).prependTo(that.wrapper).hide();

            that.overlay = $(OVERLAY).appendTo(container).hide();
            popupOptions.appendTo = that.overlay;

            that.popup = new kendo.ui.Popup(that.wrapper, $.extend(true, popupOptions, ANIMATION, DIRECTIONS[options.direction]));
        },

        options: {
            name: "Popup",
            width: 240,
            height: 320,
            direction: "down"
        },

        events: [
            SHOW,
            HIDE
        ],

        show: function(target) {
            var that = this,
                popup = that.popup;

            popup.options.anchor = $(target);
            popup.open();
        },

        hide: function() {
            this.popup.close();
        },

        _activate: function() {
            var that = this,
                direction = that.options.direction,
                dimensions = that.dimensions,
                offset = dimensions.offset,
                popup = that.popup,
                anchor = popup.options.anchor,
                anchorOffset = $(anchor).offset(),
                elementOffset = $(popup.element).offset(),
                cssClass = popup.flipped ? REVERSE[direction] : direction,
                offsetAmount = anchorOffset[offset] - elementOffset[offset] + ($(anchor)[dimensions.size]() / 2);

            that.wrapper.removeClass(DIRECTION_CLASSES).addClass("km-" + cssClass);
            that.arrow.css(offset, offsetAmount).show();

            that.trigger(SHOW);
        }
    });

    /**
     * @name kendo.mobile.ui.PopOver.Description
     * @section
     * <p>The mobile PopOver widget represents a transient view which is displayed when the user taps on a navigational widget
     * or area on the screen. It can contain one or more mobile views which can be navigated to, if needed.
     * The Mobile Application automatically instantiates a mobile PopOver for each div element with a <code>role</code>
     * data attribute set to <b>popover</b>.
     * Alternatively, it can be initialized using jQuery plugin syntax in the containing mobile View <strong>init event handler</strong>.
     * </p>
     *
     * <p>The Mobile PopOver widget can be open when any mobile navigational widget (listview link item, button, tabstrip, etc.) is tapped.
     * To do so, add <code>data-rel="popover"</code> attribute and a <code>href</code> attribute equal to the PopOver <code>id</code> to the navigational widget DOM element (prefixed with <code>#</code>, like an anchor).</p>
     *
     * @exampleTitle A Mobile PopOver displaying "Hello World"
     * @example
     * <div data-role="view">
     *  <a data-role="button" href="#foo" data-rel="popover">Say Hello</a>
     *
     *  <div data-role="popover">
     *      <div data-role="view">
     *          Hello world!
     *      </div>
     *  </div>
     * </div>
     *
     * @section
     * <p>The Mobile PopOver widget implicitly instantiates a pane widget for its contents, which allows the containing views to navigate to each
     * other. The pane widget behavior (including default transition, layout, etc.) may be configured from the <code>pane</code> configuration option.</p>
     * <p>The popover dimensions and direction can be configured from the <code>popup</code> configuration option.</p>
     */
    var PopOver = Widget.extend(/** @lends kendo.mobile.ui.PopOver.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {Element} element DOM element
         * @option {Object} [pane] The pane configuration options.
         * @option {String} [pane.layout] <> The id of the default Pane Layout.
         * @option {String} [pane.initial] <> The id of the initial mobile View to display.
         * @option {String} [pane.loading] <Loading...> The text displayed in the loading popup. Setting this value to false will disable the loading popup.
         * @option {String} [pane.transition] <> The default View transition.
         * @option {Object} [popup] The popup configuration options.
         * @option {Number | String} [popup.width] <240> The width of the popup in pixels.
         * @option {Number | String} [popup.height] <320> The height of the popup in pixels.
         * @option {Number | String} [popup.direction] <down> The direction to which the popup will expand, relative to the target that opened it.
         * Supported directions are up, right, down, and left.
         */
        init: function(element, options) {
            var that = this,
                popupOptions;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            popupOptions = $.extend({
                "show": function() { that.trigger(OPEN); },
                "hide": function() { that.trigger(CLOSE); }
            }, this.options.popup);

            that.popup = new Popup(that.element, popupOptions);

            that.pane = new ui.Pane(that.element, this.options.pane).navigate("");

            kendo.notify(that, ui);
        },

        options: {
            name: "PopOver",
            popup: { },
            pane: { }
        },

        events: [
            /**
             * Fires when popover is opened.
             * @name kendo.mobile.ui.PopOver#open
             * @event
             * @param {Event} e
             */
            OPEN,
            /**
             * Fires when popover is closed.
             * @name kendo.mobile.ui.PopOver#close
             * @event
             * @param {Event} e
             */
            CLOSE
        ],

        /**
         * Open the ActionSheet.
         * @param {jQuery} target The target of the Popover, to which the visual arrow will point to.
         */
        openFor: function(target) {
            this.popup.show(target);
        },

        /**
         * Close the popover.
         * @exampleTitle Close a popover when a button is clicked
         * @example
         * <div data-role="popover" id="foo">
         *  <a data-role="button" data-click="closePopOver">Close</a>
         * </div>
         *
         * <script>
         *  function closePopOver() {
         *      $("#foo").data("kendoMobilePopOver").close();
         *  }
         * </script>
         */
        close: function() {
            this.popup.hide();
        }
    });

    ui.plugin(Popup);
    ui.plugin(PopOver);
})(jQuery);
