(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        browser = $.browser,
        proxy = $.proxy,
        Widget = ui.Widget,
        events = [ "showArrow" ],
        touch = support.touch || support.pointers,
        hasHW3D = support.hasHW3D,
        cssPrefix = support.transitions.css,
        stylePrefix = support.transitions.prefix,
        touchLocation = kendo.touchLocation,
        min = Math.min,
        max = Math.max,
        abs = Math.abs,
        round = Math.round,
        translationRegExp = /(translate[3d]*\(|matrix\(([\s\w\d]*,){4,4})\s*(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)[\w\s]*.*?\)/i,
        singleTranslationRegExp = /(translate([XY])\(\s*(-?[\d\.]+)?[\w\s]*\))/i,
        PX = "px",
        WIDTH = "width",
        OPACITY = "opacity",
        VISIBLE = "visible",
        TRANSFORM = cssPrefix + "transform",
        TRANSFORMSTYLE = stylePrefix + "Transform",
        TRANSLATE3DSUFFIX = (hasHW3D ? ", 0)" : ")"),
        TRANSLATE3DPREFIX = "translate" + (hasHW3D ? "3d(" : "("),
        STARTEVENT = touch ? "touchstart" : "mousedown",
        MOVEEVENT = touch ? "touchmove" : "mousemove",
        ENDEVENT = touch ? "touchend" : "mouseup",
        FRAMERATE = 1000 / 30,
        ACCELERATION = 20,
        VELOCITY = .5,
        BOUNCE_LIMIT = 0,
        BOUNCE_STOP = 100,
        BOUNCE_DECELERATION = .1,
        SCROLLBAR_OPACITY = .7;

    function getEvent(args) {
        if (args[1] && "changedTouches" in args[1]) {
            return args[1];
        } else {
            return args[0];
        }
    }

    function getAxisDimensions (axis, element, axisProperty, scrollbar) {
        var scrollSize = element["inner" + axisProperty](),
            boxSize = element.parent()["inner" + axisProperty](),
            scroll = scrollSize - boxSize;

        return $.extend(axis, {
            initiated: true,
            minLimit: boxSize * BOUNCE_LIMIT,
            maxLimit: scroll + boxSize * BOUNCE_LIMIT,
            minStop: - BOUNCE_STOP,
            maxStop: scroll + BOUNCE_STOP,
            ratio: ~~(boxSize / scrollSize * boxSize),
            size: boxSize,
            hasScroll: scroll > 0,
            horizontal: axisProperty == "Width",
            scrollOffset: 0,
            friction: .96,
            decelerationVelocity: 0,
            bounceLocation: 0,
            direction: 0,
            property: axisProperty.toLowerCase(),
            zoomLevel: kendo.support.zoomLevel(),
            scrollbar: scrollbar,

            aboutToStop: function () {
                if (!this.hasScroll) return true;

                return abs(this.decelerationVelocity) <= VELOCITY;
            },

            updateScrollOffset: function(location) {
                if (!this.hasScroll) return;

                var that = this,
                    offset = this.startLocation - location,
                    delta = -limitValue(offset, that.minStop, that.maxStop);

                updateScrollbarPosition(delta, that.scrollbar, that);

                that.scrollOffset = delta / that.zoomLevel;
            },

            showScrollbar: function () {
                if (!this.hasScroll) return;

                this.scrollbar
                    .show()
                    .css({opacity: SCROLLBAR_OPACITY, visibility: VISIBLE})
                    .css(this.property, this.ratio);
            },

            hideScrollbar: function () {
                if (!this.hasScroll) return;

                this.scrollbar.css(OPACITY, 0);
            },

            decelerate: function () {
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

            startKineticAnimation: function(location, delta, velocityFactor) {
                var that = this;
                that.bounceLocation = location;
                that.friction = .96;
                that.decelerationVelocity = - delta / velocityFactor;
            },

            changeDirection: function(delta) {
                var that = this;

                if (!that.hasScroll) {
                    return false;
                }

                var newDirection = delta/abs(delta),
                    directionChanged = newDirection !== that.direction;

                that.direction = newDirection;
                return directionChanged;
            }
        });
    }

    function limitValue(value, minLimit, maxLimit) {
        return max( minLimit, min( maxLimit, value));
    }

    function updateScrollbarPosition(position, scrollbar, info) {
        var offsetValue, offset = "", delta = 0, cssModel = {}, size, limit = 0;

        position = -position;

        if (position > info.maxLimit) {
            limit = position - info.maxLimit;
        } else if (position < info.minLimit) {
            limit = position;
        }

        delta = limitValue(limit, -BOUNCE_STOP, BOUNCE_STOP);

        size = max( info.ratio - abs(delta), 20 );

        offsetValue = limitValue( position * info.ratio / info.size + delta, 0, info.size - size );

        if (info.horizontal) {
            offset = offsetValue + "px,0";
        } else {
            offset = "0," + offsetValue + PX;
        }

        cssModel[TRANSFORM] = TRANSLATE3DPREFIX + offset + TRANSLATE3DSUFFIX;
        cssModel[info.property] = size + PX;

        scrollbar.css( cssModel );
    }

    function getScrollOffsets (scrollElement) {
        scrollElement = $(scrollElement);

        var transformStyle = scrollElement[0].style[TRANSFORMSTYLE],
            transforms = (transformStyle ? transformStyle.match(translationRegExp) || transformStyle.match(singleTranslationRegExp) || [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0]);

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
        init: function (element, options) {
            var that = this, scrollElement, children;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            element = that.element,
            options = that.options,
            scrollElement = $('<div class="k-scroll-container"/>'),
            children = element.children(":not(script)");
            that.xAxis = {};
            that.yAxis = {};

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

            that._moveEvent = MOVEEVENT;
            that._startEvent = STARTEVENT;
            that._endEvent = ENDEVENT;

            element
                .bind("gesturestart", that._gestureStartProxy )
                .bind("gestureend", that._gestureEndProxy )
                .bind(that._startEvent, that._waitProxy);

            browser.mozilla && element.bind("mousedown", false );
        },

        options: {
            name: "Scroller",
            useOnDesktop: true
        },

        _storeLastLocation: function(location) {
            var that = this,
                xAxis = that.xAxis,
                locationDelta = that._locationDelta(location),
                yAxis = that.yAxis;

            if (xAxis.changeDirection(locationDelta.x) || yAxis.changeDirection(locationDelta.y)) {
                that._updateLastLocation(location);
            }
        },

        _applyCSS: function ( location ) {
            var that = this,
                start = that.start,
                xAxis = that.xAxis,
                yAxis = that.yAxis;

            xAxis.updateScrollOffset(location.x);
            yAxis.updateScrollOffset(location.y);

            that.scrollElement.stop(true,true)[0].style[TRANSFORMSTYLE] = TRANSLATE3DPREFIX +
                                    xAxis.scrollOffset + "px," + yAxis.scrollOffset + PX + TRANSLATE3DSUFFIX;
        },

        _onGestureStart: function () {
            this._dragCanceled = true;
        },

        _onGestureEnd: function () {
            this._dragCanceled = false;
        },

        _wait: function () {
            var that = this, e = getEvent(arguments);

            that._dragged = false;
            clearTimeout(that.timeoutId);

            var startLocation = touchLocation(e),
                scrollOffsets = getScrollOffsets(that.scrollElement);

            that.xAxis.startLocation = startLocation.x - scrollOffsets.x;
            that.yAxis.startLocation = startLocation.y - scrollOffsets.y;

            that.start = {
                idx: startLocation.idx,
                zoomLevel: support.zoomLevel()
            };

            that._updateLastLocation(startLocation);

            $(document)
                .unbind(that._moveEvent, that._startProxy)
                .bind(that._moveEvent, that._startProxy);

            that.element
                .unbind(that._endEvent, that._stopProxy) // Make sure previous event is removed
                .bind(that._endEvent, that._stopProxy);
        },

        _start: function () {
            var that = this,
                currentLocation = that._getTouchLocation(getEvent(arguments));

            if (!currentLocation) {
                return;
            }

            var dip10 = 5 * that.start.zoomLevel,
                locationDelta = this._locationDelta(currentLocation);

            if (abs(locationDelta.x) > dip10 || abs(locationDelta.y) > dip10) {

                that.xAxis = getAxisDimensions(that.xAxis, that.scrollElement, "Width", that.xScrollbar);
                that.yAxis = getAxisDimensions(that.yAxis, that.scrollElement, "Height", that.yScrollbar);
                that._storeLastLocation( currentLocation );
                that._dragged = true;

                var moveEvent = that._moveEvent;

                that.xAxis.showScrollbar();
                that.yAxis.showScrollbar();

                $(document).unbind(moveEvent, that._startProxy)
                           .unbind(moveEvent, that._dragProxy)
                           .bind(moveEvent, that._dragProxy);
            }
        },

        _locationDelta: function(location) {
            return { x: this.xAxis.lastLocation - location.x, y: this.yAxis.lastLocation - location.y };
        },

        _updateLastLocation: function (location) {
            var that = this;
            that.xAxis.lastLocation = location.x;
            that.yAxis.lastLocation = location.y;
            this.directionChange = +new Date();
        },

        _getTouchLocation: function(event) {
            event.preventDefault();
            event.stopPropagation();

            var location = touchLocation(event);
            if (location.idx != this.start.idx || this._dragCanceled) {
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

        _stop: function () {
            var that = this;
            if (that._dragCanceled) return;
            that._unbindFromMove();
            that.element.unbind(that._endEvent, that._stopProxy);

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
                 .unbind(that._moveEvent, that._startProxy)
                 .unbind(that._moveEvent, that._dragProxy);
        },

        _initKineticAnimation: function(e) {
            var that = this,
                xAxis = that.xAxis,
                yAxis = that.yAxis,
                bounceLocation = touchLocation(e),
                locationDelta = that._locationDelta(bounceLocation),
                velocityFactor = (+new Date() - that.directionChange) / ACCELERATION;

            xAxis.startKineticAnimation(bounceLocation.x, locationDelta.x, velocityFactor);
            yAxis.startKineticAnimation(bounceLocation.y, locationDelta.y, velocityFactor);

            that.winding = true;
            that.lastCall = +new Date();
            that.timeoutId = setTimeout( that._stepKineticProxy, FRAMERATE);
        },

        _stepKineticAnimation: function () {
            var that = this;
            if (!that.winding) return;

            var now = +new Date(),
                timeDelta = now - that.lastCall,
                animationIterator = round( timeDelta / FRAMERATE - 1 );

            while (animationIterator-- >= 0) {
                that.xAxis.decelerate();
                that.yAxis.decelerate();

                if (that._endKineticAnimation()) {
                    return;
                }
            }

            that._applyCSS( { x: that.xAxis.bounceLocation, y: that.yAxis.bounceLocation} );

            that.timeoutId = setTimeout( that._stepKineticProxy, FRAMERATE );
            that.lastCall = now;
        },

       _endKineticAnimation: function(forceEnd) {
           var that = this;

           if (!that.xAxis.initiated) {
                return false;
           }

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
