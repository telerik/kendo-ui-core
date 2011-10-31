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

    function getEvent(args) {
        if (args[1] && "changedTouches" in args[1]) {
            return args[1];
        } else {
            return args[0];
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

    var Axis = function(element, property, updateCallback) {
        var that = this,
            boxSizeName = "inner" + property,
            cssProperty = property.toLowerCase(),
            horizontal = property == "Width",
            scrollSizeName = "scroll" + property,
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
            lastLocation;

        element.parent().append(scrollbar);

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
            var delta = -limitValue(that.startLocation - location, minStop, maxStop),
                position = scrollOffset = delta / zoomLevel;

            updateCallback(name, position);

            _updateScrollbarPosition(delta);
        }

        extend(that, {
            init: function() {
                var scrollSize = element[0][scrollSizeName],
                    scroll;

                boxSize = element.parent()[boxSizeName]();
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
            },

            startScrolling: function(location) {
                if (!abs(lastLocation - location) > dip10 || !enabled) {
                    return false;
                }

                that.init();
                _changeDirection(location);

                scrollbar.show()
                    .css({opacity: SCROLLBAR_OPACITY, visibility: VISIBLE})
                    .css(cssProperty, ratio);

                return true;
            },

            aboutToStop: function() {
                if (!enabled) return true;

                return abs(decelerationVelocity) <= VELOCITY;
            },

            hideScrollbar: function() {
                if (!enabled) return;
                scrollbar.css(OPACITY, 0);
            },

            decelerate: function() {
                if (!enabled) return 0;

                var constraint = 0,
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
            },

            startKineticAnimation: function(location) {
                bounceLocation = location;
                friction = .96;
                decelerationVelocity = - (lastLocation - location) / ((+new Date() - directionChange) / ACCELERATION);
            },

            drag: function(location) {
                if (!enabled) {
                    return;
                }

                _changeDirection(location);
                _updateScrollOffset(location);
            },

            setStartLocation: function(location, offset) {
                that.startLocation = location - offset;
                _updateLastLocation(location);
            }
        });

        that.init();
    };

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this, scrollElement, children;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            element = that.element,
            scrollElement = $('<div class="k-scroll-container"/>'),
            children = element.children(":not(script)");

            extend(that, {
                _waitProxy: proxy(that._wait, that),
                _startProxy: proxy(that._start, that),
                _stopProxy: proxy(that._stop, that),
                _dragProxy: proxy(that._drag, that),
                _updateTransformProxy: proxy(that._updateTransform, that),
                _stepKineticProxy: proxy(that._stepKineticAnimation, that)
            });

            element.css("overflow", "hidden");

            if (children.length) {
                children.wrapAll(scrollElement);
            }
            else {
                element.append(scrollElement);
            }

            that.scrollElement = element.children(":not(script)");

            element
                .bind("gesturestart", function() { that._dragCanceled = true; } )
                .bind("gestureend", function() { that._dragCanceled = false; } )
                .bind(STARTEVENT, that._waitProxy);

            that.transform = {x: 0, y: 0};
            that.xAxis = new Axis(that.scrollElement, "Width", that._updateTransformProxy);
            that.yAxis = new Axis(that.scrollElement, "Height", that._updateTransformProxy);

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
        },

        _wait: function() {
            var that = this, e = getEvent(arguments);

            that._dragged = false;
            clearTimeout(that.timeoutId);

            var startLocation = touchLocation(e),
                scrollOffsets = getScrollOffsets(that.scrollElement);

            that.idx = startLocation.idx;

            that.xAxis.setStartLocation(startLocation.x, scrollOffsets.x);
            that.yAxis.setStartLocation(startLocation.y, scrollOffsets.y);

            $(document)
                .unbind(MOVEEVENT, that._startProxy)
                .bind(MOVEEVENT, that._startProxy);

            that.element
                .unbind(ENDEVENT, that._stopProxy) // Make sure previous event is removed
                .bind(ENDEVENT, that._stopProxy);
        },

        _start: function() {
            var that = this,
                currentLocation = that._getTouchLocation(getEvent(arguments));

            if (!currentLocation) {
                return;
            }

            var started = that._passToAxes("startScrolling", currentLocation);

            if (started[0] || started[1]) {

                that._dragged = true;

                $(document).unbind(MOVEEVENT, that._startProxy)
                           .unbind(MOVEEVENT, that._dragProxy)
                           .bind(MOVEEVENT, that._dragProxy);
            }

        },

        _getTouchLocation: function(event) {
            event.preventDefault();
            event.stopPropagation();

            var location = touchLocation(event);
            if (location.idx != this.idx || this._dragCanceled) {
                return;
            }

            return location;
        },

        _drag: function() {
            var that = this,
                location = that._getTouchLocation(getEvent(arguments));

            if (!location) return;

            that._passToAxes("drag", location);
        },

        _stop: function() {
            var that = this;
            if (that._dragCanceled) return;
            that._unbindFromMove();
            that.element.unbind(ENDEVENT, that._stopProxy);

            if (that._dragged) {
                that._dragged = false;
                that._initKineticAnimation(getEvent(arguments));
            } else {
                that._endKineticAnimation(true);
            }
       },

        _unbindFromMove: function() {
            $(document)
                 .unbind(MOVEEVENT, this._startProxy)
                 .unbind(MOVEEVENT, this._dragProxy);
        },

        _initKineticAnimation: function(e) {
            var that = this;

            that._passToAxes("startKineticAnimation", touchLocation(e));

            that.winding = true;
            that._queueNextStep();
        },

        _queueNextStep: function() {
            var that = this;
            that.lastCall = +new Date();
            that.timeoutId = setTimeout(that._stepKineticProxy, FRAMERATE);
        },

        _stepKineticAnimation: function() {
            var that = this;
                animationIterator = round((+new Date() - that.lastCall) / FRAMERATE - 1);

            if (!that.winding) return;

            while (animationIterator-- >= 0) {
                that._passToAxes("decelerate");

                if (that._endKineticAnimation()) {
                    return;
                }
            }

            that._queueNextStep();
        },

       _endKineticAnimation: function(forceEnd) {
            var that = this,
                stopStatus = that._passToAxes("aboutToStop");

           if (!stopStatus[0] || !stopStatus[1]) {
               if (!forceEnd) {
                   return false;
               }
           }

           that.winding = false;
           clearTimeout(that.timeoutId);

           that._passToAxes("hideScrollbar");
           return true;
       },

       _passToAxes: function(functionName, coordinates) {
           coordinates = coordinates || {x: undefined, y: undefined};
           return [this.xAxis[functionName](coordinates.x), this.yAxis[functionName](coordinates.y)];
       }
    });

    kendo.ui.plugin(Scroller);
})(jQuery);
