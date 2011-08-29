(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        touch = kendo.support.touch,
        getOffset = kendo.getOffset,
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
        LOCATION = "location",
        POSITION = "position",
        VISIBLE = "visible",
        OFFSET = "offset",
        FITTED = "fitted",
        EFFECTS = "effects",
        ACTIVE = "k-state-active",
        ACTIVECHILDREN = ".k-dropdown-wrap, .k-link",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        extend = $.extend,
        proxy = $.proxy,
        Component = ui.Component;

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
                .addClass("k-popup k-group k-reset")
                .css({ position : ABSOLUTE })
                .appendTo($(options.appendTo));

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide: true, effects: {} } };
            }

            if (!(EFFECTS in options.animation.close)) {
                options.animation.close = extend({ reverse: true }, options.animation.open, options.animation.close);
            }

            extend(options.animation.open, {
                complete: function() {
                    that.wrapper.css({ overflow: VISIBLE }).css("overflow");
                }
            });

            extend(options.animation.close, {
                complete: function() {
                    that.wrapper.hide();

                    var location = that.wrapper.data(LOCATION);
                    if (location) {
                        that.wrapper.css(location);
                    }

                    that._closing = false;
                }
            });

            that.bind([OPEN, CLOSE], options);

            $(document.documentElement).bind(MOUSEDOWN, proxy(that._mousedown, that));

            $(window).bind("resize", function() {
                that.wrapper
                    .removeData(POSITION)
                    .removeData(LOCATION); // Remove position and location to force originals reset.

                if (that.wrapper.is(":" + VISIBLE)) {
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
                options = that.options,
                animation;

            if (!that.visible()) {

                if (that.element.data("animating") || that.trigger(OPEN)) {
                    return;
                }

                that.wrapper = kendo.wrap(that.element)
                                    .css({
                                        overflow: HIDDEN,
                                        display: "block",
                                        position: ABSOLUTE
                                    });

                that.wrapper.css(POSITION);

                if (options.appendTo == BODY) {
                    that.wrapper.css(TOP, "-10000px");
                }

                animation = extend({}, options.animation.open);

                if (that._update()) {
                    animation.effects = kendo.parseEffects(animation.effects, true);
                }

                that.element.data(EFFECTS, animation.effects);
                that.element.kendoStop(true).kendoAnimate(animation);

                if (options.anchor != BODY) {
                    options.anchor.children(ACTIVECHILDREN).addClass(ACTIVE);
                }
            }
        },

        toggle: function() {
            var that = this;

            that[that.visible() ? CLOSE : OPEN]();
        },

        visible: function() {
            return this.element.is(":" + VISIBLE);
        },

        close: function() {
            var that = this,
                options = that.options,
                animation,
                effects;

            if (that.visible()) {

                if (that._closing || that.trigger(CLOSE)) {
                    return;
                }

                animation = extend({}, options.animation.close);
                effects = that.element.data(EFFECTS);

                that.wrapper = kendo.wrap(that.element).css({ overflow: HIDDEN });

                if (effects) {
                    animation.effects = effects;
                }

                that._closing = true;

                that.element.kendoStop(true).kendoAnimate(animation);

                if (options.anchor != BODY) {
                    options.anchor.children(ACTIVECHILDREN).removeClass(ACTIVE);
                }
            }
        },

        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                options = that.options,
                anchor = $(options.anchor)[0],
                toggleTarget = options.toggleTarget,
                target = e.target;

            if (!contains(container, target) && !contains(anchor, target) && !(toggleTarget && contains($(toggleTarget)[0], target))) {
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

            if (position < 0) {
                output = position;
            }

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
                aligned = false,
                zoomLevel = kendo.support.zoomLevel();

            if (options.appendTo === Popup.fn.options.appendTo) {
                wrapper.css(that._align(origins, positions));
                aligned = true;
            }

            var pos = wrapper.data(POSITION),
                offset = wrapper.data(OFFSET);

            if (!pos) {
                pos = getOffset(wrapper, POSITION);
                offset = getOffset(wrapper);

                wrapper
                    .data(POSITION, pos)
                    .data(OFFSET, extend({}, offset));
            }

            var anchorParent = anchor.offsetParent().parent(".k-animation-container"); // If the parent is positioned, get the current positions
            if (anchorParent.length && anchorParent.data(FITTED)) {
                pos = getOffset(wrapper, POSITION);
                offset = getOffset(wrapper);
            }

            offset = {
                top: offset.top - (window.pageYOffset || document.documentElement.scrollTop || 0),
                left: offset.left - (window.pageXOffset || document.documentElement.scrollLeft || 0)
            };

            if (!that.wrapper.data(LOCATION)) { // Needed to reset the popup location after every closure - fixes the resize bugs.
                wrapper.data(LOCATION, extend({}, pos));
            }

            var offsets = extend({}, offset),
                location = extend({}, pos);

            if (collisions[0] === "fit") {
                location.top += that._fit(offsets.top, wrapper.outerHeight(), viewport.height() / zoomLevel);
            }

            if (collisions[1] === "fit") {
                location.left += that._fit(offsets.left, wrapper.outerWidth(), viewport.width() / zoomLevel);
            }

            if (location.left != pos.left || location.top != pos.top) {
                wrapper.data(FITTED, true);
            } else {
                wrapper.removeData(FITTED);
            }

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
                anchorOffset = getOffset(anchor),
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
