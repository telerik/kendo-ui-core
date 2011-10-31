(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        browser = $.browser,
        proxy = $.proxy,
        Widget = ui.Widget,
        events = ["showArrow"],
        touch = support.touch || support.pointers,
        cssPrefix = support.transitions.css,
        stylePrefix = support.transitions.prefix,
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
        TRANSFORM = cssPrefix + "transform",
        TRANSFORMSTYLE = stylePrefix + "Transform",
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
        return max( minLimit, min( maxLimit, value));
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

    var Axis = function(element, property) {
        var that = this, scrollbarCssClass;

        that.element = element;
        that.scrollSizeName = "scroll" + property;
        that.boxSizeName = "inner" + property;
        that.property = property.toLowerCase();
        that.horizontal = property == "Width";
        that.scrollbar = $('<div class="touch-scrollbar ' + (that.horizontal ? "horizontal" : "vertical") + '-scrollbar" />');
        that.name = that.horizontal ? "x" : "y";

        that.element.parent().append(that.scrollbar);

        that.init();
    }

    Axis.prototype = {
        init: function() {
            var that = this,
                scrollSize = that.element[0][that.scrollSizeName],
                boxSize = that.element.parent()[that.boxSizeName](),
                scroll = scrollSize - boxSize;

            that.minLimit = boxSize * BOUNCE_LIMIT;
            that.maxLimit = scroll + this.minLimit;
            that.minStop = - BOUNCE_STOP;
            that.maxStop = scroll + BOUNCE_STOP;
            that.ratio = ~~(boxSize / scrollSize * boxSize);
            that.size = boxSize;
            that.hasScroll = scroll > 0;
            that.scrollOffset = 0;
            that.friction = .96;
            that.decelerationVelocity = 0;
            that.bounceLocation = 0;
            that.direction = 0;
            that.zoomLevel = kendo.support.zoomLevel();
            that.dip10 = 5 * that.zoomLevel;
            that.directionChange =+ new Date();
        },

        aboutToStop: function() {
            if (!this.hasScroll) return true;

            return abs(this.decelerationVelocity) <= VELOCITY;
        },

        hideScrollbar: function() {
            if (!this.hasScroll) return;
            this.scrollbar.css(OPACITY, 0);
        },

        decelerate: function() {
            var that = this,
                constraint = 0,
                friction = that.friction,
                scrollOffset = that.scrollOffset,
                decelerationVelocity = that.decelerationVelocity * friction;

                that.bounceLocation += that.decelerationVelocity;

            if (-scrollOffset < that.minLimit) {
                constraint = that.minLimit + scrollOffset;
            } else if (-scrollOffset > that.maxLimit) {
                constraint = that.maxLimit + scrollOffset;
            }

            if (constraint) {
                friction -= limitValue((BOUNCE_STOP - abs(constraint)) / BOUNCE_STOP, 0, .9);
                decelerationVelocity -= constraint * BOUNCE_DECELERATION;
            }

            that.decelerationVelocity = decelerationVelocity;
            that.friction = limitValue( friction, 0, 1 );
            that._updateScrollOffset(that.bounceLocation);
        },

        startKineticAnimation: function(location) {
            var that = this,
                velocityFactor = (+new Date() - that.directionChange) / ACCELERATION,
                delta = this.lastLocation - location;

            that.bounceLocation = location;
            that.friction = .96;
            that.decelerationVelocity = - delta / velocityFactor;
        },

        drag: function(location) {
            this._changeDirection(location);
            this._updateScrollOffset(location);
        },

        setStartLocation: function(location, scrollOffset) {
            this.startLocation = location - scrollOffset;
            this._updateLastLocation(location);
        },

        startScrolling: function(location) {
            var that = this;

            if (!abs(that.lastLocation - location) > that.dip10 || !that.hasScroll) {
                return false;
            }

            that.init();
            that._changeDirection(location);

            that.scrollbar.show()
                .css({opacity: SCROLLBAR_OPACITY, visibility: VISIBLE})
                .css(that.property, that.ratio);

            return true;
        },

        _updateLastLocation: function(location) {
            this.lastLocation = location;
            this.directionChange =+ new Date();
        },

        _updateScrollbarPosition: function(position) {
            var that = this,
                offsetValue,
                delta = 0,
                size,
                limit = 0;

            position = -position;

            if (position > that.maxLimit) {
                limit = position - that.maxLimit;
            } else if (position < that.minLimit) {
                limit = position;
            }

            delta = limitValue(limit, -BOUNCE_STOP, BOUNCE_STOP);

            size = max(that.ratio - abs(delta), 20);

            offsetValue = limitValue(position * that.ratio / that.size + delta, 0, that.size - size);

            that.scrollbar
                .css(TRANSFORM, to3DProperty(that.horizontal ? offsetValue + "px,0" : "0," + offsetValue + PX))
                .css(that.property, size + PX);
        },

        _changeDirection: function(location) {
            var that = this,
                delta = this.lastLocation - location,
                newDirection = delta/abs(delta);

            if (!that.hasScroll || newDirection === that.direction) {
                return;
            }

            that.direction = newDirection;
            that._updateLastLocation(location);
        },


        _updateScrollOffset: function(location) {
            if (!this.hasScroll) return 0;

            var that = this,
                offset = this.startLocation - location,
                delta = -limitValue(offset, that.minStop, that.maxStop),
                position = that.scrollOffset = delta / that.zoomLevel;

            that.element[0].style[TRANSFORMSTYLE] = "translate" + that.name + "(" + position + PX + ")";

            that._updateScrollbarPosition(delta);
        },
    };


    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this, scrollElement, children;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            element = that.element,
            scrollElement = $('<div class="k-scroll-container"/>'),
            children = element.children(":not(script)");

            that.bind(events, that.options);

            extend(that, {
                _waitProxy: proxy(that._wait, that),
                _startProxy: proxy(that._start, that),
                _stopProxy: proxy(that._stop, that),
                _dragProxy: proxy(that._drag, that),
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

            that.xAxis = new Axis(that.scrollElement, "Width");
            that.yAxis = new Axis(that.scrollElement, "Height");

            browser.mozilla && element.bind("mousedown", false);
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
