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
        extend = $.extend,
        Component = ui.Component;

    function Popup(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.element.hide().css("position", "absolute").appendTo(document.body);

        that.openAnimation = extend(that.options.openAnimation, {
            complete: function() {
                that.trigger(OPEN);
            }
        });

        that.closeAnimation = extend(that.options.closeAnimation, {
            complete: function() {
                that.trigger(CLOSE);
            }
        });

        that.bind([OPEN, CLOSE], that.options);

        $(document.documentElement).bind("mousedown", function(e){
            var container = that.element[0],
                target = e.target;
            if(container !== target && !$.contains(container, target)) {
                that.close();
            }
        });

    }

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
            top -= round(height / 2 );
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
            left -= round(width / 2 );
        }

        element.css( {
            top: top,
            left: left
        });
    }

    Popup.prototype = {
        options: {
            origin: "bottom left",
            position: "top left",
            anchor: "body",
            openAnimation: {
                effects: "fadeIn",
                show: true
            },
            closeAnimation: {
                effects: "fadeOut",
                hide: true
            }
        },
        open: function() {
            var that = this;

            align(that.element, $(that.options.anchor), that.options.origin, that.options.position);

            that.element.kendoAnimate(that.openAnimation);
        },
        close: function() {
            var that = this;

            that.element.kendoAnimate(that.closeAnimation);
        }
    }

    ui.plugin("Popup", Popup, Component);
})(jQuery);
