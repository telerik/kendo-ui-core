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
        proxy = $.proxy,
        Component = ui.Component,
        mobileSafari41 = (navigator.userAgent.search(/4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/) != -1);

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

        if (kendo.support.touch) {
            if (!document.body.scrollLeft && !mobileSafari41)
                left -= window.pageXOffset;
            if (!document.body.scrollTop && !mobileSafari41)
                top -= window.pageYOffset;
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

            if (options && ('animation' in options) && !options.animation)
                options.animation = { open: { effects: {} }, close: { effects: {} } };

            Component.fn.init.call(that, element, options);

            that.element.hide().addClass("t-popup t-group t-reset").css("position", "absolute").appendTo(document.body);

            options = that.options;

            that.bind([OPEN, CLOSE], options);

            $(document.documentElement).mousedown(proxy(that._mousedown, that));

            $(window).bind("resize", function() {
                that._updatePosition();
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
            animation: {
                open: {
                    effects: 'slideDownIn',
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
                that.element.data('effectOptions', extend( {}, options.animation.open) );
                that._wrapper = kendo.wrap(that.element).css({ overflow: 'hidden', display: 'block', position: 'absolute', top: '-10000px' });
                that._updatePosition();
                that.element.kendoStop(true).kendoAnimate(options.animation.open, function () {
                    that._wrapper.css({ overflow: '' });
                    that.trigger(OPEN);
                });
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
                var hasCloseAnimation = 'effects' in options.animation.close;
                that._wrapper = kendo.wrap(that.element).css({ overflow: 'hidden' });
                that.element.kendoStop(true).kendoAnimate(extend( hasCloseAnimation ? {} : that.element.data('effectOptions'), options.animation.close, {
                                    reverse: !hasCloseAnimation,
                                    complete: function () {
                                        that._wrapper.css({ display: 'none' });
                                        that.trigger(CLOSE);
                                    }
                                }));
            }
        },
        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                toggleTarget = that.options.toggleTarget,
                target = e.target;

            if (contains(container, target)) return;
            if (toggleTarget && (contains($(toggleTarget)[0], target) || $(toggleTarget)[0] === target)) return;

            that.close();
        },
        _updatePosition: function() {
            var that = this,
                options = that.options;

            align(that._wrapper, $(options.anchor), options.origin, options.position);
        },
        _wrapper: $()
    });

    ui.plugin("Popup", Popup);
})(jQuery);
