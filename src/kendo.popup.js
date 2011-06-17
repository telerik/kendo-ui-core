(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        OPEN = "open",
        CLOSE = "close",
        CENTER = "center",
        LEFT = "left",
        RIGHT = "right",
        TOP = "top",
        BOTTOM = "bottom",
        ABSOLUTE = "absolute",
        HIDDEN = "hidden",
        extend = $.extend,
        proxy = $.proxy,
        Component = ui.Component,
        mobileSafari41 = /4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/.test(navigator.userAgent);

    function align(element, anchor, origin, position) {
        origin = origin.split(" ");
        position = position.split(" ");

        var verticalOrigin = origin[0],
            horizontalOrigin = origin[1],
            verticalPosition = position[0],
            horizontalPosition = position[1],
            anchorOffset = anchor.offset(),
            width = element.outerWidth(),
            height = element.outerHeight(),
            anchorWidth = anchor.outerWidth(),
            anchorHeight = anchor.outerHeight(),
            top = anchorOffset.top,
            left = anchorOffset.left,
            round = Math.round;

        if (verticalOrigin === BOTTOM) {
            top += anchorHeight;
        }

        if (verticalOrigin === CENTER) {
            top += round(anchorHeight / 2);
        }

        if (verticalPosition === BOTTOM) {
            top -= height;
        }

        if (verticalPosition === CENTER) {
            top -= round(height / 2);
        }

        if (horizontalOrigin === RIGHT) {
            left += anchorWidth;
        }

        if (horizontalOrigin === CENTER) {
            left += round(anchorWidth / 2);
        }

        if (horizontalPosition === RIGHT) {
            left -= width;
        }

        if (horizontalPosition === CENTER) {
            left -= round(width / 2);
        }

        if (kendo.support.touch) {

            if (!document.body.scrollLeft && !mobileSafari41) {
                left -= window.pageXOffset;
            }

            if (!document.body.scrollTop && !mobileSafari41) {
                top -= window.pageYOffset;
            }
        }

        element.css({
            top: top,
            left: left
        });
    }

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var Popup = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            that.element.hide()
                .addClass("t-popup t-group t-reset")
                .css({ position : ABSOLUTE })
                .appendTo($(options.appendTo));

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { effects: {} } };
            }

            if (!("effects" in options.animation.close)) {
                options.animation.close = extend({}, options.animation.open, { reverse: true });
            }

            extend(options.animation.open, {
                complete: function() {
                    that.wrapper.css({ overflow: "" });
                    that.trigger(OPEN);
                }
            });

            extend(options.animation.close, {
                complete: function() {
                    that.wrapper.css({ display: "none" });
                    that.trigger(CLOSE);
                }
            });

            that.bind([OPEN, CLOSE], options);

            $(document.documentElement).mousedown(proxy(that._mousedown, that));

            $(window).bind("resize", function() {
                that._update();
            });

            if (options.toggleTarget) {
                $(options.toggleTarget).bind(options.toggleEvent, proxy(that.toggle, that));
            }
        },
        options: {
            toggleEvent: "click",
            origin: BOTTOM + " " + LEFT,
            position: TOP + " " + LEFT,
            anchor: "body",
            appendTo: "body",
            animation: {
                open: {
                    effects: "slideDownIn",
                    duration: 200,
                    show: true
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    show: false,
                    hide: true
                }
            }
        },

        open: function() {
            var that = this,
                options = that.options;

            if (!that.visible()) {
                that.wrapper = kendo.wrap(that.element).css({ overflow: HIDDEN, display: "block", position: ABSOLUTE});

                that._update();

                that.element.kendoStop(true).kendoAnimate(options.animation.open)
            }
        },

        toggle: function() {
            var that = this;

            that[that.visible() ? CLOSE : OPEN]();
        },

        visible: function() {
            return this.element.is(":visible");
        },

        close: function() {
            var that = this,
                options = that.options;

            if (that.visible()) {
                that.wrapper = kendo.wrap(that.element).css({ overflow: HIDDEN });
                that.element.kendoStop(true).kendoAnimate(options.animation.close);
            }
        },

        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                toggleTarget = that.options.toggleTarget,
                target = e.target;

            if (!contains(container, target) && !(toggleTarget && contains($(toggleTarget)[0], target))) {
                that.close();
            }
        },

        _update: function() {
            var that = this,
                options = that.options;


            if (options.appendTo === Popup.fn.options.appendTo) {
                align(that.wrapper, $(options.anchor), options.origin, options.position);
            }
        }
    });

    ui.plugin("Popup", Popup);
})(jQuery);
