(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        WRAPPER = '<div class="km-popover-wrapper" />';
        Widget = ui.Widget;
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

            that.arrow = $('<div class="km-popover-arrow" />').appendTo(that.wrapper).hide();

            that.pane = new kendo.mobile.ui.Pane(that.element).navigate("");

            that.popup = new kendo.ui.Popup(that.wrapper, $.extend(true,
                {
                    activate: function() {
                        var direction = that.direction,
                            dimensions = that.dimensions,
                            offset = dimensions.offset,
                            anchorOffset = $(that.popup.options.anchor).offset(),
                            elementOffset = $(that.popup.element).offset(),
                            cssClass = that.popup.flipped ? REVERSE[direction] : direction,
                            offsetAmount = anchorOffset[offset] - elementOffset[offset] + ($(that.popup.options.anchor)[dimensions.size]() / 2);

                            that.wrapper.removeClass("km-top km-bottom km-left km-right").addClass("km-" + cssClass);
                            that.arrow.css(offset, offsetAmount).show();
                    }
                },
                ANIMATION,
                DIRECTIONS[that.options.direction])
            );
        },

        options: {
            name: "PopOver",
            width: 240,
            height: 320,
            direction: "down"
        },

        openFor: function(link) {
            var that = this,
                popup = that.popup,
                timeout = 0;

            if (popup.visible()) {
                popup.close();
                timeout = 401;
            }

            that.popup.options.anchor = $(link);
            setTimeout(function() {
                that.popup.open();
            }, timeout);
        }
    });

    PopOver.init = function(element) {
        var instance = element.data("kendoMobilePopOver");

        if (!instance) {
            instance = kendo.initWidget(element, {}, ui);
        }

        return instance;
    }
    ui.plugin(PopOver);
})(jQuery);
