(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        proxy = $.proxy,
        Widget = ui.Widget,
        touch = support.touch || support.pointers,
        touchLocation = kendo.touchLocation,
        min = Math.min,
        max = Math.max,
        abs = Math.abs,
        round = Math.round,
        TRANSLATION_REGEXP = /(translate[3d]*\(|matrix\(([\s\w\d]*,){4,4})\s*(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)[\w\s]*.*?\)/i,
        SINGLE_TRANSLATION_REGEXP = /(translate([XY])\(\s*(-?[\d\.]+)?[\w\s]*\))/i,
        DEFAULT_MATRIX = [0, 0, 0, 0, 0],
        PX = "px",
        WIDTH = "width",
        OPACITY = "opacity",
        VISIBLE = "visible",
        TRANSFORM = support.transitions.css + "transform",
        TRANSFORMSTYLE = support.transitions.prefix + "Transform",
        STARTEVENT = touch ? "touchstart" : "mousedown",
        MOVEEVENT = touch ? "touchmove" : "mousemove",
        ENDEVENT = touch ? "touchend" : "mouseup",
        FRAMERATE = 1000 / 30,
        ACCELERATION = 20,
        VELOCITY = .5,
        BOUNCE_LIMIT = 0,
        BOUNCE_STOP = 100,
        BOUNCE_DECELERATION = .1,
        to3DProperty,
        SCROLLBAR_OPACITY = .7;

        if (support.hasHW3D) {
            to3DProperty = function(value) {
                return "translate3d(" + value + ", 0)";
            }
        } else {
            to3DProperty = function(value) {
                return "translate(" + value + ")";
            }
        }

    function limitValue(value, minLimit, maxLimit) {
        return max(minLimit, min(maxLimit, value));
    }

    function getScrollOffsets(scrollElement) {
        scrollElement = $(scrollElement);

        var transformStyle = scrollElement[0].style[TRANSFORMSTYLE],
            transforms = (transformStyle ? transformStyle.match(TRANSLATION_REGEXP) || transformStyle.match(SINGLE_TRANSLATION_REGEXP) || DEFAULT_MATRIX : DEFAULT_MATRIX);

        if (transforms) {
            if (transforms[2] == "Y") {
                transforms[4] = transforms[3];
                transforms[3] = 0;
            } else
                transforms[2] == "X" && (transforms[4] = 0);
        }

        return support.transitions ? {
                                         x: +transforms[3],
                                         y: +transforms[4]
                                     } :
                                     {
                                         x: parseInt(scrollElement.css("marginLeft"), 10) || 0,
                                         y: parseInt(scrollElement.css("marginTop"), 10) || 0
                                     };
    }

    function Axis(scrollElement, property, updateCallback) {
        var boxSizeName = "inner" + property,
            cssProperty = property.toLowerCase(),
            horizontal = property == "Width",
            scrollSizeName = "scroll" + property,
            element = scrollElement.parent(),
            scrollbar = $('<div class="touch-scrollbar ' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />'),
            name = horizontal ? "x" : "y",
            dip10,
            enabled,
            minLimit,
            maxLimit,
            minStop,
            maxStop,
            ratio,
            decelerationVelocity,
            bounceLocation,
            direction,
            zoomLevel,
            directionChange,
            scrollOffset,
            boxSize,
            friction,
            lastLocation,
            startLocation,
            idx,
            timeoutId,
            winding,
            dragCanceled,
            lastCall,
            dragged;

        element.append(scrollbar);

        function _updateLastLocation (location) {
            lastLocation = location;
            directionChange =+ new Date();
        }

        function _updateScrollbarPosition(position) {
            var offsetValue,
                delta = 0,
                size,
                limit = 0;

            position = -position;

            if (position > maxLimit) {
                limit = position - maxLimit;
            } else if (position < minLimit) {
                limit = position;
            }

            delta = limitValue(limit, -BOUNCE_STOP, BOUNCE_STOP);

            size = max(ratio - abs(delta), 20);

            offsetValue = limitValue(position * ratio / boxSize + delta, 0, boxSize - size);

            scrollbar
                .css(TRANSFORM, to3DProperty(horizontal ? offsetValue + "px,0" : "0," + offsetValue + PX))
                .css(cssProperty, size + PX);
        }

        function _changeDirection(location) {
            var delta = lastLocation - location,
                newDirection = delta/abs(delta);

            if (newDirection === direction) {
                return;
            }

            direction = newDirection;
            _updateLastLocation(location);
        }

        function _updateScrollOffset(location) {
            var delta = -limitValue(startLocation - location, minStop, maxStop),
                position = scrollOffset = delta / zoomLevel;

            updateCallback(name, position);

            _updateScrollbarPosition(delta);
        }

        function _wait(e) {
            if (!enabled) {
                return;
            }

            dragged = false;
            clearTimeout(timeoutId);

            var location = touchLocation(e),
                scrollOffset  = getScrollOffsets(scrollElement)[name];

            idx = location.idx;

            startLocation = location[name] - scrollOffset;
            _updateLastLocation(location[name]);

            $(document)
                .unbind(MOVEEVENT, _start)
                .bind(MOVEEVENT, _start);

            scrollElement
                .unbind(ENDEVENT, _stop) // Make sure previous event is removed
                .bind(ENDEVENT, _stop);
        }

        function _start(e) {
            var location = _getTouchLocation(e);

            if (!location) {
                return;
            }

            if (!abs(lastLocation - location) > dip10) {
                return;
            }

            _init();
            _changeDirection(location);

            scrollbar.show()
            .css({opacity: SCROLLBAR_OPACITY, visibility: VISIBLE})
            .css(cssProperty, ratio);

            dragged = true;

            $(document).unbind(MOVEEVENT, _start)
            .unbind(MOVEEVENT, _drag)
            .bind(MOVEEVENT, _drag);

        }

        function _getTouchLocation(event) {
            event.preventDefault();
            event.stopPropagation();

            var location = touchLocation(event);
            if (location.idx != idx || dragCanceled) {
                return;
            }

            return location[name];
        }

        function _drag(e) {
            var location = _getTouchLocation(e);

            if (!location) {
                return;
            }

            _changeDirection(location);
            _updateScrollOffset(location);
        }

        function _stop(e) {
            if (dragCanceled) return;
            _unbindFromMove();
            element.unbind(ENDEVENT, _stop);

            if (dragged) {
                dragged = false;
                _initKineticAnimation(e);
            } else {
                _endKineticAnimation(true);
            }
       }

       function _unbindFromMove() {
           $(document)
                .unbind(MOVEEVENT, _start)
                .unbind(MOVEEVENT, _drag);
       }

       function _initKineticAnimation(e) {
           var location = touchLocation(e)[name];

           bounceLocation = location;
           friction = .96;
           decelerationVelocity = - (lastLocation - location) / ((+new Date() - directionChange) / ACCELERATION);
           winding = true;
           _queueNextStep();
       }

       function _queueNextStep() {
           lastCall = +new Date();
           timeoutId = setTimeout(_stepKineticAnimation, FRAMERATE);
       }

       function _stepKineticAnimation() {
            var animationIterator = round((+new Date() - lastCall) / FRAMERATE - 1), constraint, velocity;

            if (!winding) return;

            while (animationIterator-- >= 0) {
                constraint = 0;
                velocity = decelerationVelocity * friction;
                bounceLocation += decelerationVelocity;

                if (-scrollOffset < minLimit) {
                    constraint = minLimit + scrollOffset;
                } else if (-scrollOffset > maxLimit) {
                    constraint = maxLimit + scrollOffset;
                }

                if (constraint) {
                    friction -= limitValue((BOUNCE_STOP - abs(constraint)) / BOUNCE_STOP, 0, .9);
                    velocity -= constraint * BOUNCE_DECELERATION;
                }

                decelerationVelocity = velocity;
                friction = limitValue(friction, 0, 1);
                _updateScrollOffset(bounceLocation);

                if (_endKineticAnimation()) {
                    return;
                }
            }

            _queueNextStep();
       }

       function _endKineticAnimation(forceEnd) {
           if (!forceEnd && abs(decelerationVelocity) > VELOCITY) {
               return false;
           }

           winding = false;
           clearTimeout(timeoutId);

           scrollbar.css(OPACITY, 0);
           return true;
       }

       function _init() {
           var scrollSize = scrollElement[0][scrollSizeName],
           scroll;

           boxSize = element[boxSizeName]();
           scroll = scrollSize - boxSize;
           enabled = scroll > 0;
           zoomLevel = kendo.support.zoomLevel();
           dip10 = 5 * zoomLevel;
           minLimit = boxSize * BOUNCE_LIMIT;
           maxLimit = scroll + minLimit;
           minStop = - BOUNCE_STOP;
           maxStop = scroll + BOUNCE_STOP;
           ratio = ~~(boxSize / scrollSize * boxSize);
           decelerationVelocity = 0;
           bounceLocation = 0;
           direction = 0;
           directionChange =+ new Date();
           scrollOffset = 0;
           friction = .96;

           element
           .bind("gesturestart", function() { dragCanceled = true; } )
           .bind("gestureend", function() { dragCanceled = false; } )
           .bind(STARTEVENT, _wait);
       }

       _init();
    };

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this, scrollElement, children;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            element = that.element,
            scrollElement = $('<div class="k-scroll-container"/>'),
            children = element.children(":not(script)");

            var _updateTransformProxy = proxy(that._updateTransform, that);

            element.css("overflow", "hidden");

            if (children.length) {
                children.wrapAll(scrollElement);
            }
            else {
                element.append(scrollElement);
            }

            that.scrollElement = element.children(":not(script)");

            that.transform = {x: 0, y: 0};
            Axis(that.scrollElement, "Width", _updateTransformProxy);
            Axis(that.scrollElement, "Height", _updateTransformProxy);

            $.browser.mozilla && element.bind("mousedown", false);
        },

        _updateTransform: function(property, value) {
            var that = this;
            that.transform[property] = value;
            that.scrollElement[0].style[TRANSFORMSTYLE] = to3DProperty(that.transform.x + PX + "," + that.transform.y + PX);
        },

        options: {
            name: "Scroller",
            useOnDesktop: true
        }
    });

    kendo.ui.plugin(Scroller);
})(jQuery);
