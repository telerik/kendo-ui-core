(function($, undefined) {
    var kendo = window.kendo,
        mobile = kendo.mobile,
        ui = mobile.ui,
        WRAPPER = '<div class="km-popover-wrapper" />',
        ARROW = '<div class="km-popover-arrow" />',
        OVERLAY = '<div class="km-popover-overlay" />',
        DIRECTION_CLASSES = "km-top km-bottom km-left km-right",
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
            "top": "bottom",
            "bottom": "top",
            "left": "right",
            "right": "left"
        };

    /**
     * @name kendo.mobile.ui.SplitView.Description
     * @section
     */
    var PopOver = Widget.extend(/** @lends kendo.mobile.ui.SplitView.prototype */{
        /**
         * @constructs
         * @extends kendo.mobile.ui.Widget
         * @param {DomElement} element DOM element
         */
        init: function(element, options) {
            var that = this,
                container = mobile.application.element,
                popupOptions = {
                    appendTo: container,
                    open: function() {
                        that.overlay.show();
                    },

                    activate: $.proxy(that._activate, that),

                    deactivate: function() {
                        that.overlay.hide();
                    }
                },
                axis;

            Widget.fn.init.call(that, element, options);
            $.extend(that, that.options);

            element = that.element;

            element.wrap(WRAPPER).addClass("km-popover").show();

            axis = that.direction.match(/left|right/) ? "horizontal" : "vertical";

            that.dimensions = DIMENSIONS[axis];

            that.wrapper = element.parent().css({
                width: that.options.width,
                height: that.options.height
            }).addClass("km-popover-wrapper km-" + that.direction).hide();

            that.arrow = $(ARROW).appendTo(that.wrapper).hide();

            that.overlay = $(OVERLAY).appendTo(container).hide();

            that.pane = new ui.Pane(that.element).navigate("");

            that.popup = new kendo.ui.Popup(that.wrapper, $.extend(true, popupOptions, ANIMATION, DIRECTIONS[that.options.direction]));
        },

        options: {
            name: "PopOver",
            width: 240,
            height: 320,
            direction: "down"
        },

        _activate: function() {
            var that = this,
                direction = that.direction,
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
        },

        openFor: function(link) {
            var that = this,
                popup = that.popup;

            popup.options.anchor = $(link);
            popup.open();
        },

        close: function() {
            this.popup.close();
        }
    });

    ui.plugin(PopOver);
})(jQuery);
