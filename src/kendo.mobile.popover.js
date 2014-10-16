(function(f, define){
    define([ "./kendo.popup", "./kendo.mobile.pane" ], f);
})(function(){

var __meta__ = {
    id: "mobile.popover",
    name: "PopOver",
    category: "mobile",
    description: "The mobile PopOver widget represents a transient view which is displayed when the user taps on a navigational widget or area on the screen. ",
    depends: [ "popup", "mobile.pane" ]
};

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
                containerPopup = element.closest(".km-modalview-wrapper"),
                viewport = element.closest(".km-root").children('.km-pane').first(),
                container = containerPopup[0] ? containerPopup : viewport,
                popupOptions,
                axis;

            if (options.viewport) {
                viewport = options.viewport;
            } else if (!viewport[0]) {
                viewport = window;
            }

            if (options.container) {
                container = options.container;
            } else if (!container[0]) {
                container = document.body;
            }

            popupOptions = {
                viewport: viewport,
                copyAnchorStyles: false,
                autosize: true,
                open: function() {
                    that.overlay.show();
                },

                activate: $.proxy(that._activate, that),

                deactivate: function() {
                    that.overlay.hide();
                    if (!that._apiCall) {
                        that.trigger(HIDE);
                    }

                    that._apiCall = false;
                }
            };

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

            if (options.className) {
                that.overlay.addClass(options.className);
            }

            that.popup = new kendo.ui.Popup(that.wrapper, $.extend(true, popupOptions, ANIMATION, DIRECTIONS[options.direction]));
        },

        options: {
            name: "Popup",
            width: 240,
            height: "",
            direction: "down",
            container: null,
            viewport: null
        },

        events: [
            HIDE
        ],

        show: function(target) {
            this.popup.options.anchor = $(target);
            this.popup.open();
        },

        hide: function() {
            this._apiCall = true;
            this.popup.close();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.popup.destroy();
            this.overlay.remove();
        },

        target: function() {
            return this.popup.options.anchor;
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
                min = that.arrow[dimensions.size]() * 2,
                max = that.element[dimensions.size]() - that.arrow[dimensions.size](),
                size = $(anchor)[dimensions.size](),
                offsetAmount = anchorOffset[offset] - elementOffset[offset] + (size / 2);

            if (offsetAmount < min) {
                offsetAmount = min;
            }

            if (offsetAmount > max) {
                offsetAmount = max;
            }

            that.wrapper.removeClass(DIRECTION_CLASSES).addClass("km-" + cssClass);
            that.arrow.css(offset, offsetAmount).show();
        }
    });

    var PopOver = Widget.extend({
        init: function(element, options) {
            var that = this,
                popupOptions,
                paneOptions;

            that.initialOpen = false;

            Widget.fn.init.call(that, element, options);

            popupOptions = $.extend({
                className: "km-popover-root",
                hide: function() { that.trigger(CLOSE); }
            }, this.options.popup);

            that.popup = new Popup(that.element, popupOptions);
            that.popup.overlay.on("move", function(e) {
                if (e.target == that.popup.overlay[0]) {
                    e.preventDefault();
                }
            });

            that.pane = new ui.Pane(that.element, $.extend(this.options.pane, { $angular: this.options.$angular }));
            that.pane.navigateToInitial();

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

        open: function(target) {
            this.popup.show(target);

            if (!this.initialOpen) {
                this.pane.navigate("");
                this.popup.popup._position();
                this.initialOpen = true;
            } else {
                this.pane.view()._invokeNgController();
            }
        },

        openFor: function(target) {
            this.open(target);
            this.trigger(OPEN, { target: this.popup.target() });
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

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
