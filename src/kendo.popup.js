(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        touch = support.touch,
        getOffset = kendo.getOffset,
        appendingToBodyTriggersResize = $.browser.msie && $.browser.version < 9,
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
        FITTED = "fitted",
        EFFECTS = "effects",
        ACTIVE = "k-state-active",
        ACTIVEBORDER = "k-state-border",
        ACTIVECHILDREN = ".k-picker-wrap, .k-dropdown-wrap, .k-link",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        DOCUMENT= $(document),
        WINDOW = $(window),
        DOCUMENT_ELEMENT = $(document.documentElement),
        RESIZE_SCROLL = "resize scroll",
        cssPrefix = support.transitions.css,
        TRANSFORM = cssPrefix + "transform",
        extend = $.extend,
        styles = ["font-family",
                   "font-size",
                   "font-stretch",
                   "font-style",
                   "font-weight",
                   "line-height"];

    function contains(container, target) {
        return container === target || $.contains(container, target);
    }

    var Popup = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that.collisions = that.options.collision.split(" ");

            if (that.collisions.length === 1) {
                that.collisions.push(that.collisions[0]);
            }

            that.element.hide()
                .addClass("k-popup k-group k-reset")
                .css({ position : ABSOLUTE })
                .appendTo($(options.appendTo))
                .bind("mouseenter mouseleave", function(e) {
                    that._hovered = e.type === "mouseenter";
                });

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { show: true, effects: {} }, close: { hide: true, effects: {} } };
            }

            if (!(EFFECTS in options.animation.close)) {
                options.animation.close = extend(true, { reverse: true }, options.animation.open, options.animation.close);
            }

            extend(options.animation.open, {
                complete: function() {
                    that.wrapper.css({ overflow: VISIBLE }); // Forcing refresh causes flickering in mobile.
                }
            });

            extend(options.animation.close, {
                complete: function() {
                    that.wrapper.hide();

                    var location = that.wrapper.data(LOCATION),
                        anchor = $(options.anchor),
                        direction, dirClass;

                    if (location) {
                        that.wrapper.css(location);
                    }

                    if (options.anchor != BODY) {
                        direction = anchor.hasClass(ACTIVEBORDER + "-down") ? "down" : "up";
                        dirClass = ACTIVEBORDER + "-" + direction;

                        anchor
                            .removeClass(dirClass)
                            .children(ACTIVECHILDREN)
                            .removeClass(ACTIVE)
                            .removeClass(dirClass);

                        element.removeClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);
                    }

                    that._closing = false;
                }
            });

            that._mousedownProxy = function(e) {
                that._mousedown(e);
            };

            that._currentWidth = DOCUMENT.width();

            that._resizeProxy = function(e) {
                that._resize(e);
            };

            kendo.touchScroller(element);

            if (options.toggleTarget) {
                $(options.toggleTarget).bind(options.toggleEvent, $.proxy(that.toggle, that));
            }
        },

        events: [
            OPEN,
            CLOSE
        ],

        options: {
            name: "Popup",
            toggleEvent: "click",
            origin: BOTTOM + " " + LEFT,
            position: TOP + " " + LEFT,
            anchor: BODY,
            appendTo: BODY,
            collision: "flip fit",
            animation: {
                open: {
                    effects: "slideIn:down",
                    transition: true,
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
                element = that.element,
                options = that.options,
                direction = "down",
                animation, wrapper,
                anchor = $(options.anchor),
                style,
                idx;

            if (!that.visible()) {
                for (idx = 0; idx < styles.length; idx++) {
                    style = styles[idx];
                    element.css(style, anchor.css(style));
                }

                if (element.data("animating") || that.trigger(OPEN)) {
                    return;
                }

                DOCUMENT_ELEMENT.unbind(MOUSEDOWN, that._mousedownProxy)
                                .bind(MOUSEDOWN, that._mousedownProxy);
                if (!touch) {
                    WINDOW.unbind(RESIZE_SCROLL, that._resizeProxy)
                          .bind(RESIZE_SCROLL, that._resizeProxy)
                }

                that.wrapper = wrapper = kendo.wrap(element)
                                        .css({
                                            overflow: HIDDEN,
                                            display: "block",
                                            position: ABSOLUTE
                                        });

                if (support.mobileOS.android) {
                    wrapper.add(anchor).css(TRANSFORM, "translatez(0)"); // Android is VERY slow otherwise. Should be tested in other droids as well since it may cause blur.
                }

                wrapper.css(POSITION);

                if (options.appendTo == BODY) {
                    wrapper.css(TOP, "-10000px");
                }

                animation = extend(true, {}, options.animation.open);
                animation.effects = kendo.parseEffects(animation.effects, that._update());
                direction = animation.effects.slideIn ? animation.effects.slideIn.direction : direction;

                if (options.anchor != BODY) {
                    var dirClass = ACTIVEBORDER + "-" + direction;

                    element.addClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);

                    anchor
                        .addClass(dirClass)
                        .children(ACTIVECHILDREN)
                        .addClass(ACTIVE)
                        .addClass(dirClass);
                }

                element.data(EFFECTS, animation.effects)
                       .kendoStop(true)
                       .kendoAnimate(animation);
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

                DOCUMENT_ELEMENT.unbind(MOUSEDOWN, that._mousedownProxy);
                WINDOW.unbind(RESIZE_SCROLL, that._resizeProxy);

                animation = extend(true, {}, options.animation.close);
                effects = that.element.data(EFFECTS);

                that.wrapper = kendo.wrap(that.element).css({ overflow: HIDDEN });

                if (effects) {
                    animation.effects = effects;
                }

                that._closing = true;

                that.element.kendoStop(true).kendoAnimate(animation);
            }
        },

        _resize: function(e) {
            var that = this;

            if (appendingToBodyTriggersResize) {
                var width = DOCUMENT.width();
                if (width == that._currentWidth) {
                    return;
                }
                that._currentWidth = width;
            }

            if (!that._hovered) {
                that.close();
            }
        },

        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                options = that.options,
                anchor = $(options.anchor)[0],
                toggleTarget = options.toggleTarget,
                target = kendo.eventTarget(e),
                popup = $(target).closest(".k-popup")[0];

            if (popup && popup !== that.element[0] ){
                return;
            }

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
                zoomLevel = support.zoomLevel(),
                zIndex = 10002;

            var siblingContainer = anchor.parents().filter(wrapper.siblings());

            if (siblingContainer[0]) {
                var parentZIndex = Number($(siblingContainer).css("zIndex"));
                if (parentZIndex) {
                    zIndex = parentZIndex + 1;
                }
            }

            wrapper.css("zIndex", zIndex);

            if (options.appendTo === Popup.fn.options.appendTo) {
                wrapper.css(that._align(origins, positions));
            } else {
                wrapper.css(that._align(origins, positions, true));
            }

            var pos = getOffset(wrapper, POSITION),
                offset = getOffset(wrapper),
                anchorParent = anchor.offsetParent().parent(".k-animation-container"); // If the parent is positioned, get the current positions

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

        _align: function(origin, position, isPosition) {
            var that = this,
                element = that.wrapper,
                anchor = $(that.options.anchor),
                verticalOrigin = origin[0],
                horizontalOrigin = origin[1],
                verticalPosition = position[0],
                horizontalPosition = position[1],
                anchorOff = getOffset(anchor),
                appendOff = getOffset($(that.options.appendTo)),
                anchorOffset = isPosition ? { top: anchorOff.top - appendOff.top , left: anchorOff.left - appendOff.left } : anchorOff,
                width = element.outerWidth(),
                height = element.outerHeight(),
                anchorWidth = anchor.outerWidth(),
                anchorHeight = anchor.outerHeight(),
                top = anchorOffset.top,
                left = anchorOffset.left,
                round = Math.round,
                verticalFlip = verticalOrigin !== verticalPosition,
                horizontalflip = horizontalOrigin !== horizontalPosition;


            if (verticalOrigin === TOP && isPosition && verticalFlip) {
                top -= height;
            }

            if (verticalOrigin === BOTTOM && !isPosition) {
                top += anchorHeight;
            }

            if (verticalOrigin === CENTER) {
                top += round(anchorHeight / 2);
            }

            if (verticalPosition === TOP && isPosition && verticalFlip) {
                top += anchorHeight;
            }

            if (verticalPosition === BOTTOM && !isPosition) {
                top -= height;
            }

            if (verticalPosition === CENTER) {
                top -= round(height / 2);
            }

            if (horizontalOrigin === LEFT && isPosition && horizontalflip) {
                left -= width;
            }

            if (horizontalOrigin === RIGHT && !isPosition) {
                left += anchorWidth;
            }

            if (horizontalOrigin === CENTER) {
                left += round(anchorWidth / 2);
            }

            if (horizontalPosition === LEFT && isPosition && horizontalflip) {
                left += anchorWidth;
            }

            if (horizontalPosition === RIGHT && !isPosition) {
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

    ui.plugin(Popup);
})(jQuery);
