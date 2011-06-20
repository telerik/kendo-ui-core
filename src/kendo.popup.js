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
        BODY = "body",
        extend = $.extend,
        proxy = $.proxy,
        Component = ui.Component,
        mobileSafari41 = /4_1\slike\sMac\sOS\sX;.*Mobile\/\S+/.test(navigator.userAgent);


    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var Popup = Component.extend({
        init: function(element, options) {
            var that = this;

            Component.fn.init.call(that, element, options);

            options = that.options;

            that.collisions = that.options.collision.split(" ");

            if (that.collisions.length === 1) {
                that.collisions.push(that.collisions[0]);
            }

            that.element.hide()
                .addClass("t-popup t-group t-reset")
                .css({ position : ABSOLUTE })
                .appendTo($(options.appendTo));

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide:true, effects: {} } };
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
                if (that.wrapper[0]) {
                    that._update();
                }
            });

            if (options.toggleTarget) {
                $(options.toggleTarget).bind(options.toggleEvent, proxy(that.toggle, that));
            }
        },
        options: {
            toggleEvent: "click",
            origin: BOTTOM + " " + LEFT,
            position: TOP + " " + LEFT,
            anchor: BODY,
            appendTo: BODY,
            collision: "flip",
            animation: {
                open: {
                    effects: "slideIn:down",
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

                if (options.appendTo == BODY)
                    that.wrapper.css("top", "-10000px");

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
            this._position($(window));
        },

        _fit: function(position, size, viewPortSize) {
            if (position + size > viewPortSize) {
                position = viewPortSize - size;
            }

            if (position < 0) {
                position = 0;
            }

            return position;
        },

        _flipVertical: function(offset, size, viewPortSize) {
            var that = this,
                options = that.options,
                origin,
                position,
                origins = options.origin.toLowerCase().split(" "),
                positions = options.position.toLowerCase().split(" ");

            if (positions[0] !== origins[0] && positions[0] !== CENTER && origins[0] !== CENTER) {
                if (offset.top + size > viewPortSize) {
                    position = BOTTOM + " " + positions[1];
                    origin = TOP + " " + origins[1];
                    offset = that._align(origin, position);
                }

                if (offset.top < 0) {
                    position = TOP + " " + positions[1];
                    origin = BOTTOM + " " + origins[1];
                    offset = that._align(origin, position);
                }
            }
            return offset;
        },

        _flipHorizontal: function(offset, size, viewPortSize) {
            var that = this,
                options = that.options,
                origin,
                position,
                origins = options.origin.toLowerCase().split(" "),
                positions = options.position.toLowerCase().split(" ");

            if (positions[1] !== origins[1] && positions[1] !== CENTER && origins[1] !== CENTER) {

                if (offset.left + size > viewPortSize) {
                    position = positions[0] + " " + RIGHT;
                    origin = origins[0] + " " + LEFT;
                    offset = that._align(origin, position);
                }

                if (offset.left < 0) {
                    position = positions[0] + " " + LEFT;
                    origin = origins[0] + " " + RIGHT;
                    offset = that._align(origin, position);
                }
            }
            return offset;
        },

        _position: function(viewport) {
            var that = this,
                wrapper = that.wrapper,
                offset,
                options = that.options,
                anchor = $(options.anchor),
                origin = options.origin,
                collisions = that.collisions,
                position = options.position;

            if (options.appendTo === Popup.fn.options.appendTo) {
                wrapper.css(that._align(origin, position));
            }
            offset = wrapper.offset();

            if (collisions[0] === "fit") {
                offset.top = that._fit(offset.top, wrapper.outerHeight(), viewport.height());
            }

            if (collisions[0] === "flip") {
                offset = that._flipVertical(offset, wrapper.outerHeight(), viewport.height());
            }

            if (collisions[1] === "fit") {
                offset.left = that._fit(offset.left, wrapper.outerWidth(), viewport.width());
            }

            if (collisions[1] === "flip") {
                offset = that._flipHorizontal(offset, wrapper.outerWidth(), viewport.width());
            }
            wrapper.css(offset);

        },
        _align: function(origin, position) {
            origin = origin.split(" ");
            position = position.split(" ");

            var that = this,
                element = that.wrapper,
                anchor = $(that.options.anchor),
                verticalOrigin = origin[0],
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

            return {
                top: top,
                left: left
            };
        }
    });

    ui.plugin("Popup", Popup);
})(jQuery);
