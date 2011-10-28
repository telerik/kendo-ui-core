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

    function Axis(element, property, scrollbar) {
        var that = this;
        that.element = element;
        that.sizeName = "inner" + property;
        that.property = property.toLowerCase();
        that.scrollbar = scrollbar;
        that.horizontal = property == "Width";

        that.init();
    }

    Axis.prototype = {
        init: function() {
            var that = this,
                scrollSize = that.element[that.sizeName](),
                boxSize = that.element.parent()[that.sizeName](),
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
        },

        aboutToStop: function() {
            if (!this.hasScroll) return true;

            return abs(this.decelerationVelocity) <= VELOCITY;
        },

        updateScrollOffset: function(location) {
            if (!this.hasScroll) return 0;

            var that = this,
                offset = this.startLocation - location,
                delta = -limitValue(offset, that.minStop, that.maxStop);

            that.updateScrollbarPosition(delta);

            return that.scrollOffset = delta / that.zoomLevel;
        },

        updateScrollbarPosition: function(position) {
            var that = this,
                offsetValue,
                offset = "",
                delta = 0,
                cssModel = {},
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

            offset = that.horizontal ? offsetValue + "px,0" : "0," + offsetValue + PX;

            cssModel[TRANSFORM] = to3DProperty(offset);
            cssModel[that.property] = size + PX;

            that.scrollbar.css(cssModel);
        },

        showScrollbar: function() {
            if (!this.hasScroll) return;

            this.scrollbar
                .show()
                .css({opacity: SCROLLBAR_OPACITY, visibility: VISIBLE})
                .css(this.property, this.ratio);
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
                friction -= limitValue( (BOUNCE_STOP - abs(constraint)) / BOUNCE_STOP, 0, .9 );
                decelerationVelocity -= constraint * BOUNCE_DECELERATION;
            }

            that.decelerationVelocity = decelerationVelocity;
            that.friction = limitValue( friction, 0, 1 );
        },

        startKineticAnimation: function(location, velocityFactor) {
            var that = this,
                delta = this.lastLocation - location;

            that.bounceLocation = location;
            that.friction = .96;
            that.decelerationVelocity = - delta / velocityFactor;
        },

        changeDirection: function(location) {
            var that = this, delta = this.lastLocation - location;

            if (!that.hasScroll) {
                return false;
            }

            var newDirection = delta/abs(delta),
                directionChanged = newDirection !== that.direction;

            that.direction = newDirection;
            return directionChanged;
        },

        sufficient: function(location) {
            return abs(this.lastLocation - location) > this.dip10;
        }
    };

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

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this, scrollElement, children;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            element = that.element,
            options = that.options,
            scrollElement = $('<div class="k-scroll-container"/>'),
            children = element.children(":not(script)");

            that.bind(events, options);

            that.xScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
            that.yScrollbar = that.xScrollbar.clone().removeClass("horizontal-scrollbar").addClass("vertical-scrollbar");
            that._scrollbars = $().add(that.xScrollbar).add(that.yScrollbar);

            extend(that, {
                _waitProxy: proxy(that._wait, that),
                _startProxy: proxy(that._start, that),
                _stopProxy: proxy(that._stop, that),
                _dragProxy: proxy(that._drag, that),
                _gestureStartProxy: proxy(that._onGestureStart, that),
                _gestureEndProxy: proxy(that._onGestureEnd, that),
                _stepKineticProxy: proxy( that._stepKineticAnimation, that )
            });

            element.css("overflow", "hidden");

            if (children.length)
                children.wrapAll(scrollElement);
            else
                element.append(scrollElement);

            that.scrollElement = element.children(":not(script)");
            that._scrollbars.appendTo(element);

            element
                .bind("gesturestart", that._gestureStartProxy )
                .bind("gestureend", that._gestureEndProxy )
                .bind(STARTEVENT, that._waitProxy);

            that.xAxis = new Axis(that.scrollElement, "Width", that.xScrollbar);
            that.yAxis = new Axis(that.scrollElement, "Height", that.yScrollbar);

            browser.mozilla && element.bind("mousedown", false );
        },

        options: {
            name: "Scroller",
            useOnDesktop: true
        },

        _storeLastLocation: function(location) {
            var that = this;

            if (that.xAxis.changeDirection(location.x) || that.yAxis.changeDirection(location.y)) {
                that._updateLastLocation(location);
            }
        },

        _applyCSS: function(location) {
            var that = this,
                start = that.start,
                xOffset = that.xAxis.updateScrollOffset(location.x),
                yOffset = that.yAxis.updateScrollOffset(location.y);

            that.scrollElement.stop(true,true)[0].style[TRANSFORMSTYLE] = to3DProperty(xOffset + PX + "," + yOffset + PX);
        },

        _onGestureStart: function() {
            this._dragCanceled = true;
        },

        _onGestureEnd: function() {
            this._dragCanceled = false;
        },

        _wait: function() {
            var that = this, e = getEvent(arguments);

            that._dragged = false;
            clearTimeout(that.timeoutId);

            var startLocation = touchLocation(e),
                scrollOffsets = getScrollOffsets(that.scrollElement);

            that.xAxis.startLocation = startLocation.x - scrollOffsets.x;
            that.yAxis.startLocation = startLocation.y - scrollOffsets.y;

            that.idx = startLocation.idx;

            that._updateLastLocation(startLocation);

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

            if (that.xAxis.sufficient(currentLocation.x) || that.yAxis.sufficient(currentLocation.y)) {
                that.xAxis.init();
                that.yAxis.init();

                that._storeLastLocation( currentLocation );
                that._dragged = true;

                that.xAxis.showScrollbar();
                that.yAxis.showScrollbar();

                $(document).unbind(MOVEEVENT, that._startProxy)
                           .unbind(MOVEEVENT, that._dragProxy)
                           .bind(MOVEEVENT, that._dragProxy);
            }
        },

        _updateLastLocation: function(location) {
            var that = this;
            that.xAxis.lastLocation = location.x;
            that.yAxis.lastLocation = location.y;
            this.directionChange = +new Date();
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

            that._storeLastLocation(location);

            that._applyCSS(location);
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
            var that = this;
            $(document)
                 .unbind(MOVEEVENT, that._startProxy)
                 .unbind(MOVEEVENT, that._dragProxy);
        },

        _initKineticAnimation: function(e) {
            var that = this,
                xAxis = that.xAxis,
                yAxis = that.yAxis,
                bounceLocation = touchLocation(e),
                velocityFactor = (+new Date() - that.directionChange) / ACCELERATION;

            xAxis.startKineticAnimation(bounceLocation.x, velocityFactor);
            yAxis.startKineticAnimation(bounceLocation.y, velocityFactor);

            that.winding = true;
            that.lastCall = +new Date();
            that.timeoutId = setTimeout(that._stepKineticProxy, FRAMERATE);
        },

        _stepKineticAnimation: function() {
            var that = this;
            if (!that.winding) return;

            var now = +new Date(),
                timeDelta = now - that.lastCall,
                animationIterator = round(timeDelta / FRAMERATE - 1);

            while (animationIterator-- >= 0) {
                that.xAxis.decelerate();
                that.yAxis.decelerate();

                if (that._endKineticAnimation()) {
                    return;
                }
            }

            that._applyCSS({ x: that.xAxis.bounceLocation, y: that.yAxis.bounceLocation});

            that.timeoutId = setTimeout(that._stepKineticProxy, FRAMERATE);
            that.lastCall = now;
        },

       _endKineticAnimation: function(forceEnd) {
           var that = this;

           if (!that.xAxis.aboutToStop() || !that.yAxis.aboutToStop()) {
               if (!forceEnd) {
                   return false;
               }
           }

           that.winding = false;
           clearTimeout(that.timeoutId);

           that.xAxis.hideScrollbar();
           that.yAxis.hideScrollbar();
           return true;
       }
    });

    kendo.ui.plugin(Scroller);
})(jQuery);
