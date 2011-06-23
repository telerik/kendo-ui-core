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
                    var location = that.wrapper.data('location');

                    if (location)
                        that.wrapper.css(location);

                    that.trigger(CLOSE);
                }
            });

            that.bind([OPEN, CLOSE], options);

            $(document.documentElement).mousedown(proxy(that._mousedown, that));

            $(window).bind("resize", function() {
                that.wrapper
                    .removeData('position')
                    .removeData('location'); // Remove position and location to force originals reset.

                if (that.wrapper.is(":visible")) {
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
            collision: "flip fit",
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

                var animation = extend({}, options.animation.open);

                if (that._update()) {
                    animation.effects = kendo.parseEffects(animation.effects, true);
                }

                that.element.data('effects', animation.effects);
                that.element.kendoStop(true).kendoAnimate(animation);
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
                var animation = extend({}, options.animation.close),
                    effects = that.element.data('effects');

                that.wrapper = kendo.wrap(that.element).css({ overflow: HIDDEN });

                if (effects) {
                    animation.effects = effects;
                }

                that.element.kendoStop(true).kendoAnimate(animation);
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
            return this._position($(window));
        },

        _fit: function(position, size, viewPortSize) {
            var output = 0;

            if (position + size > viewPortSize) {
                output = viewPortSize - (position + size);
            }

            if (position < 0)
                output = position;

            return output;
        },

        _flip: function(offset, size, anchorSize, viewPortSize, origin, position, boxSize) {
            var output = 0;
                boxSize = boxSize || size;

            if (position !== origin && position !== CENTER && origin !== CENTER) {
                if (offset + boxSize > viewPortSize) {
                    output += -(anchorSize + size);
                }

                if (offset + output < 0) {
                    output += anchorSize + size;
                }
            }
            return output;
        },

        _position: function(viewport) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper,
                options = that.options,
                anchor = $(options.anchor),
                origins = options.origin.toLowerCase().split(" "),
                positions = options.position.toLowerCase().split(" "),
                collisions = that.collisions,
                aligned = false;

            if (options.appendTo === Popup.fn.options.appendTo) {
                wrapper.css(that._align(origins, positions));
                aligned = true;
            }

            var pos = wrapper.data('position'),
                offset = wrapper.data('offset'),
                zoomLevel = kendo.support.touch ? (document.documentElement.clientWidth / window.innerWidth) : 1;

            if (!pos) {
                pos = wrapper.position();
                offset = wrapper.offset();

                wrapper
                    .data('position', pos)
                    .data('offset', extend({}, offset));
            }

            var anchorParent = anchor.offsetParent().parent('.t-animation-container'); // If the parent is positioned, get the current positions
            if (anchorParent.length && anchorParent.data('fitted')) {
                pos = wrapper.position();
                offset = wrapper.offset();
            }

            if (!that.wrapper.data('location')) // Needed to reset the popup location after every closure - fixes the resize bugs.
                wrapper.data('location', extend({}, pos));

            offset = { top: offset.top - (window.pageYOffset || document.documentElement.scrollTop || 0), left: offset.left - (window.pageXOffset || document.documentElement.scrollLeft || 0) };

            if (!aligned && kendo.support.touch && !document.body.scrollLeft && !mobileSafari41)
                offset = { top: offset.top - window.pageYOffset, left: offset.left - window.pageXOffset };

            var offsets = extend({}, offset),
                location = extend({}, pos);

            if (collisions[0] === "fit") {
                location.top += that._fit(offsets.top, wrapper.outerHeight(), viewport.height() / zoomLevel);
            }

            if (collisions[1] === "fit") {
                location.left += that._fit(offsets.left, wrapper.outerWidth(), viewport.width() / zoomLevel);
            }

            if (location.left != pos.left || location.top != pos.top)
                wrapper.data('fitted', true);
            else
                wrapper.removeData('fitted');

            var flipPos = extend({}, location);

            if (collisions[0] === "flip") {
                location.top += that._flip(offsets.top, element.outerHeight(), anchor.outerHeight(), viewport.height() / zoomLevel, origins[0], positions[0], wrapper.outerHeight())
            }

            if (collisions[1] === "flip") {
                location.left += that._flip(offsets.left, element.outerWidth(), anchor.outerWidth(), viewport.width() / zoomLevel, origins[1], positions[1], wrapper.outerWidth());
            }

            wrapper.css(location);

            return (location.left != flipPos.left || location.top != flipPos.top);
        },
        _align: function(origin, position) {
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

            return {
                top: top,
                left: left
            };
        }
    });

    ui.plugin("Popup", Popup);
})(jQuery);
