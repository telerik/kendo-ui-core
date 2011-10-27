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
        constants = {
            acceleration: 20,
            velocity: .5,
            pagingVelocity: 5,
            friction: 1,
            bounceAcceleration: .1,
            bounceDeceleration: .1,
            bounceLimit: 0,
            bounceStop: 100,
            framerate: 30,
            scrollbarOpacity: .7,
            scrollArrowsOpacity: .84
        };


    function getAxisDimensions (element, axisProperty, scrollbar) {
        var scrollSize = element["inner" + axisProperty](),
            boxSize = element.parent()["inner" + axisProperty](),
            scroll = scrollSize - boxSize;

        return {
            minLimit: boxSize * constants.bounceLimit,
            maxLimit: scroll + boxSize * constants.bounceLimit,
            minStop: -constants.bounceStop,
            maxStop: scroll + constants.bounceStop,
            ratio: ~~(boxSize / scrollSize * boxSize),
            size: boxSize,
            hasScroll: scroll > 0,
            horizontal: axisProperty == "Width",
            scrollOffset: 0,
            friction: .96,
            decelerationVelocity: 0,
            property: axisProperty.toLowerCase(),
            zoomLevel: kendo.support.zoomLevel(),
            scrollbar: scrollbar,
            aboutToStop: function () {
                if (!this.hasScroll) return true;

                return abs(this.decelerationVelocity) <= constants.velocity;
            },
            updateScrollOffset: function(offset) {
                if (!this.hasScroll) return;

                var that = this,
                    delta = -limitValue(offset, that.minStop, that.maxStop);

                updateScrollbarPosition(delta, that.scrollbar, that);

                that.scrollOffset = delta / that.zoomLevel;
            },
            showScrollbar: function () {
                if (!this.hasScroll) return;

                this.scrollbar
                    .show()
                    .css({
                            opacity: constants.scrollbarOpacity,
                            visibility: VISIBLE
                        })
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
                    decelerationVelocity = that.decelerationVelocity * friction,
                    bounceStop = constants.bounceStop,
                    output = that.decelerationVelocity;

                if (-scrollOffset < that.minLimit) {
                    constraint = that.minLimit + scrollOffset;
                } else if (-scrollOffset > that.maxLimit) {
                    constraint = that.maxLimit + scrollOffset;
                }

                if (constraint) {
                    var constrainFactor = 0;
                    friction -= limitValue( (bounceStop - abs(constraint)) / bounceStop, 0, .9 );
                    constrainFactor = constraint * constants.bounceDeceleration;
                    decelerationVelocity -= constrainFactor;
                }

                that.decelerationVelocity = decelerationVelocity;
                that.friction = limitValue( friction, 0, 1 );

                return output;
            }

        }
    }

    function limitValue (value, minLimit, maxLimit) {
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

        delta = limitValue(limit, -constants.bounceStop, constants.bounceStop);

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
            var that = this;

            if (options && options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Widget.fn.init.call(that, element, options);

            options = that.options;

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
                _stepKinetikProxy: proxy( that._stepKineticAnimation, that )
            });

            that._create();
        },

        options: {
            name: "Scroller",

            useOnDesktop: true
        },

        _create: function () {
            var that = this,
                element = that.element,
                scrollElement = $('<div class="k-scroll-container"/>'),
                children = element.children(":not(script)");

            element
                .css("overflow", "hidden");

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

        _storeLastLocation: function(location) {
            var that = this;

            var lastLocation = that.lastLocation,
                dX = lastLocation.x - location.x, dY = lastLocation.y - location.y,
                newDirection = { x: that.xInfo.hasScroll ? dX/abs(dX) : 0, y: that.yInfo.hasScroll ? dY/abs(dY) : 0 },
                oldDirection = that.direction;

            if (newDirection.x != oldDirection.x || newDirection.y != oldDirection.y) {
                this.directionChange = +new Date();
                this.lastLocation = location;
            }

            that.direction = newDirection;
        },

        _applyCSS: function ( location ) {
            var that = this,
                start = that.start,
                xInfo = that.xInfo,
                yInfo = that.yInfo;

            xInfo.updateScrollOffset(start.x - location.x);
            yInfo.updateScrollOffset(start.y - location.y);

            that.scrollElement.stop(true,true)[0].style[TRANSFORMSTYLE] = TRANSLATE3DPREFIX +
                                    xInfo.scrollOffset + "px," + yInfo.scrollOffset + PX + TRANSLATE3DSUFFIX;
        },

        _onGestureStart: function () {
            this._dragCanceled = true;
        },

        _onGestureEnd: function () {
            this._dragCanceled = false;
        },

        _wait: function (e) {
            if (arguments[1] && "changedTouches" in arguments[1])
                e = arguments[1];

            var that = this;

            that._dragged = false;
            clearTimeout(that.timeoutId);

            var startLocation = touchLocation(e),
                scrollOffsets = getScrollOffsets(that.scrollElement);

            that.start = {
                idx: startLocation.idx,
                x: startLocation.x - scrollOffsets.x,
                y: startLocation.y - scrollOffsets.y,
                zoomLevel: support.zoomLevel()
            };

            that.lastLocation = startLocation;
            that.direction = { x: 0, y: 0 };
            that.directionChange = +new Date();

            $(document)
                .unbind(that._moveEvent, that._startProxy)
                .bind(that._moveEvent, that._startProxy);

            that.element
                .unbind(that._endEvent, that._stopProxy) // Make sure previous event is removed
                .bind(that._endEvent, that._stopProxy);
        },

        _initializeBoxModel: function () {
            var that = this;

            that.xInfo = getAxisDimensions(that.scrollElement, "Width", that.xScrollbar);
            that.yInfo = getAxisDimensions(that.scrollElement, "Height", that.yScrollbar);
        },

        _start: function (e) {
            if (arguments[1] && "changedTouches" in arguments[1])
                e = arguments[1];

            var that = this;

            if (that._dragCanceled) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            var dip10 = 5 * that.start.zoomLevel,
                currentLocation = touchLocation(e),
                lastLocation = that.lastLocation;

            if (currentLocation.idx != that.start.idx) {
                return;
            }

            if (abs(lastLocation.x - currentLocation.x) > dip10 || abs(lastLocation.y - currentLocation.y) > dip10) {

                that._initializeBoxModel();
                that._storeLastLocation( currentLocation );
                that._dragged = true;

                var moveEvent = that._moveEvent;

                that.xInfo.showScrollbar();
                that.yInfo.showScrollbar();

                $(document).unbind(moveEvent, that._startProxy)
                           .unbind(moveEvent, that._dragProxy)
                           .bind(moveEvent, that._dragProxy);
            }
        },

        _drag: function (e) {
            if (arguments[1] && "changedTouches" in arguments[1])
                e = arguments[1];

            var that = this;
            if (that._dragCanceled) return;

            e.preventDefault();
            e.stopPropagation();

            var currentLocation = touchLocation(e);
            if (currentLocation.idx != that.start.idx) {
                return;
            }
            that._storeLastLocation( currentLocation );

            that._applyCSS( currentLocation );
        },

        _stop: function (e) {
            if (arguments[1] && "changedTouches" in arguments[1])
                e = arguments[1];

            var that = this;
            if (that._dragCanceled) return;

            that.element.unbind(that._endEvent, that._stopProxy);

            $(document)
                 .unbind(that._moveEvent, that._startProxy)
                 .unbind(that._moveEvent, that._dragProxy);

            if (that._dragged) {
                that._dragged = false;

                that._initKineticAnimation(e);
            } else {
                that._hideScrollHints();
            }
       },

        _hideScrollHints: function() {
            var that = this;

            that.xInfo.hideScrollbar();
            that.yInfo.hideScrollbar();
        },

        _initKineticAnimation: function (e) {
            if (arguments[1] && "changedTouches" in arguments[1])
                e = arguments[1];

            var that = this,
                lastLocation = that.lastLocation,
                bounceLocation = that.bounceLocation = touchLocation(e);

            var velocityFactor = (+new Date() - that.directionChange) / constants.acceleration,
                horizontalOffset = bounceLocation.x - lastLocation.x,
                verticalOffset = bounceLocation.y - lastLocation.y;

            that._startKineticAnimation( horizontalOffset, verticalOffset, velocityFactor );
        },

        _startKineticAnimation: function ( horizontalOffset, verticalOffset, velocityFactor ) {
            var that = this,
                xInfo = that.xInfo,
                yInfo = that.yInfo,
                velocity = constants.velocity;

            xInfo.decelerationVelocity = horizontalOffset / velocityFactor;
            yInfo.decelerationVelocity = verticalOffset / velocityFactor;
            xInfo.friction = yInfo.friction = .96;

            that.framerate = 1000 / constants.framerate;
            that.winding = false;

            if (abs(xInfo.decelerationVelocity) > velocity || abs(yInfo.decelerationVelocity) > velocity) {
                that.winding = true;
                that.lastCall = +new Date();
                clearTimeout(that.timeoutId);
                that.timeoutId = setTimeout( that._stepKinetikProxy, that.framerate );
            } else {
                that._endKineticAnimation();
            }
        },

        _singleStep: function () {
            var that = this;

            that.bounceLocation.x += that.xInfo.decelerate();
            that.bounceLocation.y += that.yInfo.decelerate();

            if (that.xInfo.aboutToStop() && that.yInfo.aboutToStop()) {
                that._endKineticAnimation();
                return true;
            }

            return false;
        },

        _stepKineticAnimation: function () {
            var that = this;
            if (!that.winding) return;

            var now = +new Date(),
                framerate = that.framerate,
                timeDelta = now - that.lastCall,
                animationIterator = round( timeDelta / framerate - 1 );

            while (animationIterator-- >= 0) {
                if (that._singleStep()) {
                    return;
                }
            }

            that._applyCSS( that.bounceLocation );

            that.timeoutId = setTimeout( that._stepKinetikProxy, framerate );
            that.lastCall = now;
        },

        _endKineticAnimation: function () {
            var that = this;

            that.winding = false;
            clearTimeout(that.timeoutId);

            that._hideScrollHints();
        }
    });

    kendo.ui.plugin(Scroller);
})(jQuery);
