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

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.popup.destroy();
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

    var PopOver = Widget.extend({
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

            that.pane = new ui.Pane(that.element, this.options.pane);
            that.pane.navigate("");

            kendo.notify(that, ui);
        },

        options: {
            name: "PopOver",
            popup: { },
            pane: { }
        },

        events: [
            OPEN,
            CLOSE
        ],

        openFor: function(target) {
            this.popup.show(target);
        },

        close: function() {
            this.popup.hide();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.pane.destroy();
            this.popup.destroy();

            kendo.destroy(this.element);
        }
    });

    ui.plugin(Popup);
    ui.plugin(PopOver);
})(window.kendo.jQuery);
