(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        browser = $.browser,
        proxy = $.proxy,
        Component = ui.Component,
        events = [ "showArrow" ],
        touch = support.touch,
        hasHW3D = support.hasHW3D,
        cssPrefix = support.transitions.css,
        stylePrefix = support.transitions.prefix,
        touchLocation = kendo.touchLocation,
        min = Math.min,
        max = Math.max,
        abs = Math.abs,
        round = Math.round,
        translationRegExp = /(translate[3d]*\(|matrix\(([\s\w\d]*,){4,4})\s*(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)[\w\s]*.*?\)/i,
        PX = "px",
        SHOW = "show",
        HIDE = "hide",
        CLICK = "click",
        WIDTH = "width",
        OPACITY = "opacity",
        VISIBLE = "visible",
        LEFTARROW = "left-scroll-arrow",
        RIGHTARROW = "right-scroll-arrow",
        TRANSFORM = cssPrefix + "transform",
        TRANSFORMSTYLE = stylePrefix + "Transform",
        TRANSLATE3DSUFFIX = (hasHW3D ? ", 0)" : ")"),
        TRANSLATE3DPREFIX = "translate" + (hasHW3D ? "3d(" : "("),
        STARTEVENT = touch ? "touchstart" : "mousedown",
        MOVEEVENT = touch ? "touchmove" : "mousemove",
        ENDEVENT = touch ? "touchend" : "mouseup";

    function getReverseDelta (position, minBounceLimit, maxBounceLimit, bounceStop) {
        return limitValue( (position > maxBounceLimit ? (position - maxBounceLimit) : 0) || (position < minBounceLimit ? position : 0),
                                  -bounceStop, bounceStop );
    }

    function limitValue (value, minLimit, maxLimit) {
        return max( minLimit, min( maxLimit, value));
    }

    function calculateOffset (scrollbar, start, location, minBounceStop, maxBounceStop, minBounceLimit, maxBounceLimit, boxSize, ratio, sizeProperty, bounceStop) {
        var position = 0, offset = "", delta = 0, cssModel = {}, size, horizontal = sizeProperty == WIDTH;

        position = -limitValue( start - location, minBounceStop, maxBounceStop );
        delta = getReverseDelta( -position, minBounceLimit, maxBounceLimit, bounceStop );
        size = max( ~~( boxSize * ratio - abs(delta)), 20 );
        offset = (horizontal ? "": "0, ") + limitValue( -position * ratio + delta, 0, boxSize - size ) + (horizontal ? "px, 0" : PX);

        cssModel[TRANSFORM] = TRANSLATE3DPREFIX + offset + TRANSLATE3DSUFFIX;
        cssModel[sizeProperty] = size + PX;

        scrollbar.css( cssModel );

        return position;
    }

    function getScrollOffsets (scrollElement) {
        scrollElement = $(scrollElement);

        var transformStyle = scrollElement[0].style[TRANSFORMSTYLE],
            transforms = (transformStyle ? transformStyle.match(translationRegExp) || [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0]);

        return support.transitions ? {
                                         x: +transforms[3],
                                         y: +transforms[4]
                                     } :
                                     {
                                         x: parseInt(scrollElement.css("marginLeft"), 10) || 0,
                                         y: parseInt(scrollElement.css("marginTop"), 10) || 0
                                     };
    }

    var Scroller = Component.extend({
        init: function (element, options) {
            var that = this;

            if (options !== false && options.useOnDesktop === false) return false; // Stop the initialization if on desktop and disabled.

            Component.fn.init.call(that, element, options);

            options = that.options;
            element = that.element;

            that.bind(events, options);

            that.xScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
            that.yScrollbar = that.xScrollbar.clone().removeClass("horizontal-scrollbar").addClass("vertical-scrollbar");
            that._scrollbars = $().add(that.xScrollbar).add(that.yScrollbar);

            that._scrollArrows = {};
            var leftArrow = that._scrollArrows.left = $('<a class="scroll-arrow left-scroll-arrow" href="#" />');

            extend( that._scrollArrows, {
                right: leftArrow.clone().removeClass(LEFTARROW).addClass(RIGHTARROW),
                top: leftArrow.clone().removeClass(LEFTARROW).addClass("top-scroll-arrow"),
                bottom: leftArrow.clone().removeClass(LEFTARROW).addClass("bottom-scroll-arrow")
            });
            
            var scrollArrows = that._scrollArrows;
            that._horizontalArrows = $().add(scrollArrows.left).add(scrollArrows.right);
            that._verticalArrows = $().add(scrollArrows.top).add(scrollArrows.bottom);
            that._allArrows = $().add(that._horizontalArrows).add(that._verticalArrows);

            that._allArrows.click( proxy( that._scrollClick, that ) );

            extend(that, {
                _waitProxy: proxy(that._wait, that),
                _startProxy: proxy(that._start, that),
                _stopProxy: proxy(that._stop, that),
                _dragProxy: proxy(that._drag, that),
                _gestureStartProxy: proxy(that._onGestureStart, that),
                _gestureEndProxy: proxy(that._onGestureEnd, that),
                _stepScrollProxy: proxy( that._stepScrollAnimation, that ),
                _stepKinetikProxy: proxy( that._stepKinetikAnimation, that )
            });

            that._create();
        },

        options: {
                acceleration: 10,
                velocity: .5,
                pagingVelocity: 5,
                friction: .98,
                bounceAcceleration: .1,
                bounceDeceleration: .1,
                bounceLimit: 0,
                bounceStop: 100,
                framerate: 30,
                zoomFactor: 1,

                useOnDesktop: true,
                scrollbarOpacity: .7,
                scrollArrowsOpacity: .84
            },

        _create: function () {
            var that = this,
                element = that.element,
                scrollElement = '<div class="scroll-container"/>',
                children = element.children();

            element
                .css("overflow", "hidden");

            if (children.length)
                children.wrapAll(scrollElement);
            else
                element.append(scrollElement);

            that.scrollElement = element.children();
            that._scrollbars.appendTo(element);
            that._horizontalArrows.appendTo(element);

            that._moveEvent = MOVEEVENT,
            that._startEvent = STARTEVENT,
            that._endEvent = ENDEVENT;

            if (touch) {
                element
                    .bind("gesturestart", that._gestureStartProxy )
                    .bind("gestureend", that._gestureEndProxy )
                    .bind(that._startEvent, that._waitProxy);

                browser.mozilla && element.bind("mousedown", false );
            } else {
                element.bind( "mouseenter", function () {
                    that._showScrollArrows();
                });

                element.bind( "mouseleave", function () {
                    that._hideScrollArrows();
                });
            }

            that._storeLastLocation = function(location) { // TODO: better direction change detection?

                var lastLocation = that.lastLocation,
                    dX = lastLocation.x - location.x, dY = lastLocation.y - location.y,
                    newDirection = { x: dX/abs(dX) || 0, y: dY/abs(dY) || 0 },
                    oldDirection = that.direction;

                if (oldDirection) {
                    if (newDirection.x && oldDirection.x != newDirection.x) {
                        that.direction.x = newDirection.x;
                        that.directionChange = +new Date();
                        that.lastLocation = location;
                    }
                    if (newDirection.y && oldDirection.y != newDirection.y) {
                        that.direction.y = newDirection.y;
                        that.directionChange = +new Date();
                        that.lastLocation = location;
                    }
                } else {
                    that.direction = newDirection;
                    that.directionChange = +new Date();
                    that.lastLocation = location;
                }

            };

            that._applyCSS = function ( location ) {
                var deltaX = 0,
                    deltaY = 0,
                    start = that.start,
                    minBounceStop = that.minBounceStop,
                    maxBounceStop = that.maxBounceStop,
                    minBounceLimit = that.minBounceLimit,
                    maxBounceLimit = that.maxBounceLimit,
                    zoomFactor = that.options.zoomFactor,
                    bounceStop = that.options.bounceStop;

                if (that.hasHorizontalScroll) {
                    deltaX = calculateOffset(that.xScrollbar, start.x, location.x, minBounceStop.x, maxBounceStop.x,
                                    minBounceLimit.x, maxBounceLimit.x, that.boxWidth, that.xRatio, WIDTH, bounceStop) / zoomFactor;
                }

                if (that.hasVerticalScroll) {
                    deltaY = calculateOffset(that.yScrollbar, start.y, location.y, minBounceStop.y, maxBounceStop.y,
                                    minBounceLimit.y, maxBounceLimit.y, that.boxHeight, that.yRatio, "height", bounceStop) / zoomFactor;
                }

                that.scrollElement.stop(true,true)[0].style[TRANSFORMSTYLE] = TRANSLATE3DPREFIX +
                                                        deltaX + "px," + deltaY + PX + TRANSLATE3DSUFFIX;

                that.scrollOffsets = { x: deltaX, y: deltaY }; // Cachings
            };

        },

        _onGestureStart: function () {
            this._dragCanceled = true;
        },

        _onGestureEnd: function () {
            this._dragCanceled = false;
        },

        _scrollClick: function (e) {
            e.preventDefault();

            var that = this,
                scrollTo = 0,
                element = that.element,
                scrollElement = that.scrollElement,
                scrollOffsets = getScrollOffsets(scrollElement);

            if ($(e.target).hasClass(LEFTARROW)) {
                scrollTo = min( 0, scrollOffsets.x + element.innerWidth() );
            }

            if ($(e.target).hasClass(RIGHTARROW)) {
                scrollTo = max( -scrollElement.innerWidth() + element.innerWidth(), scrollOffsets.x - element.innerWidth() );
            }

            scrollElement.kendoStop().kendoAnimate({effects: { slide: { properties: { translateX: scrollTo + PX }, direction: "left" } }, duration: 500 });
        },

        _animateArrows: function (arrows, action) {
            var that = this;

            arrows.each( function (idx) {
                var element = $(this),
                    options = {
                        effects: { fadeIn : { properties: { opacity: that.options.scrollArrowsOpacity } } },
                        duration: "fast",
                        show: true,
                        complete: function() {
                            that.trigger(action + "Arrow", element);
                        }
                    },
                    hideOptions = {};

                if (action == HIDE) {
                    hideOptions = { effects: "fadeOut" };
                }

                element.kendoStop(true).kendoAnimate(extend( options, hideOptions ));
            });
        },

        _toggleScrollArrows: function (state) {
            var that = this;

            if (that.hasVerticalScroll) {
                that._animateArrows(that._verticalArrows, state);
            }

            if (that.hasHorizontalScroll) {
                that._animateArrows(that._horizontalArrows, state);
            }
        },

        _showScrollArrows: function () {
            var that = this;
            that._initializeBoxModel();
            that._allArrows.hide();

            this._toggleScrollArrows(SHOW);
        },

        _hideScrollArrows: function () {
            this._toggleScrollArrows(HIDE);
        },

        _wait: function (e) {
            e.preventDefault(); // Might stir some problems...
            var that = this;

            that._dragged = false;
            clearTimeout(that.timeoutId);
            that._originalEvent = e.originalEvent;
            var startLocation = touchLocation(e),
                scrollOffsets = getScrollOffsets(that.scrollElement);

            that.start = {
                idx: startLocation.idx,
                x: startLocation.x - scrollOffsets.x,
                y: startLocation.y - scrollOffsets.y
            };

            that.lastLocation = startLocation;
            that.direction = { x: 1, y: 1 };
            that.directionChange = +new Date();

            $(document)
                .unbind(that._moveEvent, that._startProxy)
                .bind(that._moveEvent, that._startProxy);

            if (browser.mozilla) {
                that.element
                    .unbind(that._endEvent, that._stopProxy) // Make sure previous event is removed
                    .bind(that._endEvent, that._stopProxy);
            } else {
                document.removeEventListener(that._endEvent, that._stopProxy, true);
                document.addEventListener(that._endEvent, that._stopProxy, true); // Needs capture to prevent delegates...
            }
        },

        _initializeBoxModel: function () {
            var that = this,
                element = that.element,
                scrollElement = that.scrollElement,
                options = that.options;

            extend(that, {
                        boxWidth: element.innerWidth(),
                        boxHeight: element.innerHeight(),
                        scrollWidth: scrollElement.innerWidth(),
                        scrollHeight: scrollElement.innerHeight()
                    });

            var bounceLimit = {
                    x: -that.boxWidth * options.bounceLimit,
                    y: -that.boxHeight * options.bounceLimit
                },
                bounceStop = {
                    x: -options.bounceStop,
                    y: -options.bounceStop
                },
                scrollWidth = that.scrollWidth,
                scrollHeight = that.scrollHeight,
                boxWidth = that.boxWidth,
                boxHeight = that.boxHeight;

            extend(that, {
                        hasHorizontalScroll: scrollWidth > boxWidth,
                        hasVerticalScroll: scrollHeight > boxHeight,
                        xRatio: boxWidth / scrollWidth,
                        yRatio: boxHeight / scrollHeight,
                        minBounceLimit: bounceLimit,
                        maxBounceLimit: {
                                            x: scrollWidth - boxWidth - bounceLimit.x,
                                            y: scrollHeight - boxHeight - bounceLimit.y
                                        },
                        minBounceStop: bounceStop,
                        maxBounceStop: {
                                            x: scrollWidth - boxWidth - bounceStop.x,
                                            y: scrollHeight - boxHeight - bounceStop.y
                                        }
                    });
        },

        _start: function (e) {
            var that = this,
                options = that.options;

            if (that._dragCanceled) {
                return;
            }

            var dip10 = 10 * support.devicePixelRatio,
                currentLocation = touchLocation(e),
                lastLocation = that.lastLocation;

            if (currentLocation.idx != that.start.idx) {
                return;
            }

            if (abs(lastLocation.x - currentLocation.x) > dip10 || abs(lastLocation.y - currentLocation.y) > dip10) {
                e.preventDefault();
                e.stopPropagation();
                that._dragged = true;

                that._initializeBoxModel();

                var moveEvent = that._moveEvent,
                    scrollbarOpacity = options.scrollbarOpacity;

                if (that.hasHorizontalScroll) {
                    that.xScrollbar
                        .css({
                                width: ~~(that.boxWidth * that.xRatio),
                                opacity: scrollbarOpacity,
                                visibility: VISIBLE
                            });
                }

                if (that.hasVerticalScroll) {
                    that.yScrollbar
                        .css({
                                height: ~~(that.boxHeight * that.yRatio),
                                opacity: scrollbarOpacity,
                                visibility: VISIBLE
                            });
                }

                $(document).unbind(moveEvent, that._startProxy)
                           .unbind(moveEvent, that._dragProxy)
                           .bind(moveEvent, that._dragProxy);
            }
        },

        _drag: function (e) {
            var that = this;
            if (that._dragCanceled) return;

            e.preventDefault();
            e.stopPropagation();

            var currentLocation = touchLocation(e);
            if (currentLocation.idx != that.start.idx) {
                return;
            }

            that._applyCSS( currentLocation );
            that._storeLastLocation( currentLocation );
        },

        _click: function (e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            that.target.unbind( CLICK, that.original._click );
        },

        _stop: function (e) {
            var that = this;
            if (that._dragCanceled) return;
            e.preventDefault();
            e.stopPropagation();

            if (browser.mozilla) {
                that.element.unbind(that._endEvent, that._stopProxy);
            } else {
                document.removeEventListener(that._endEvent, that._stopProxy, true);
            }

            $(document)
                 .unbind(that._moveEvent, that._startProxy)
                 .unbind(that._moveEvent, that._dragProxy);

            var oEvent = that._originalEvent,
                target = $(oEvent.target),
                thisProxy = null;

            if (that._dragged) {
                that._dragged = false;

                that._initKinetikAnimation(e);
            } else {
                thisProxy = proxy( that._click, { original: that, target: target } );

                if (touch && oEvent.touches.length == 1) // Fire a click event when there's no drag...
                {
                    target.unbind(CLICK, thisProxy);
                    target.trigger(ENDEVENT);
                    fireFakeMouseEvent(CLICK, oEvent);
                    target.bind(CLICK, thisProxy);
                }
            }
       },

        _hideScrollHints: function() {
            var that = this;
            if (that.hasHorizontalScroll) {
                that.xScrollbar.css(OPACITY, 0);
            }

            if (that.hasVerticalScroll) {
                that.yScrollbar.css(OPACITY, 0);
            }
        },

        _initKinetikAnimation: function (e) {
            var that = this,
                lastLocation = that.lastLocation,
                bounceLocation = that.bounceLocation = touchLocation(e);

            var velocityFactor = (+new Date() - that.directionChange) / that.options.acceleration,
                horizontalOffset = bounceLocation.x - lastLocation.x,
                verticalOffset = bounceLocation.y - lastLocation.y;

            that._startKinetikAnimation( horizontalOffset, verticalOffset, velocityFactor );
        },

        _startKinetikAnimation: function ( horizontalOffset, verticalOffset, velocityFactor ) {
            var that = this,
                decelerationVelocity = that.decelerationVelocity = { x: horizontalOffset / velocityFactor, y: verticalOffset / velocityFactor },
                options = that.options,
                velocity = options.velocity,
                friction = options.friction;

            that.framerate = 1000 / options.framerate;
            that.friction = { x: friction, y: friction };
            that.winding = false;
            that.scrollOffsets = getScrollOffsets(that.scrollElement);

            if (abs(decelerationVelocity.x) > velocity || abs(decelerationVelocity.y) > velocity) {
                that.winding = true;
                that.lastCall = +new Date();
                clearTimeout(that.timeoutId);
                that.timeoutId = setTimeout( that._stepKinetikProxy, that.framerate );
            }
        },

        _singleStep: function () {
            var that = this,
                options = that.options,
                friction = that.friction,
                velocity = options.velocity,
                scrollOffsets = that.scrollOffsets,
                minBounceLimit = that.minBounceLimit,
                maxBounceLimit = that.maxBounceLimit,
                bounceLocation = that.bounceLocation,
                decelerationVelocity = that.decelerationVelocity;

            that._decelerate( "x", scrollOffsets.x, minBounceLimit.x, maxBounceLimit.x, bounceLocation.x, decelerationVelocity.x, friction.x );
            that._decelerate( "y", scrollOffsets.y, minBounceLimit.y, maxBounceLimit.y, bounceLocation.y, decelerationVelocity.y, friction.y );

            if (abs(decelerationVelocity.x) <= velocity && abs(decelerationVelocity.y) <= velocity) {
                that.winding = false;
                that._endKinetikAnimation();
                return true;
            }

            return false;
        },

        _scrollIntoView: function(element) {
        },

        _scrollTo: function (x, y, duration) {
            var that = this;

            if (!that.start)
                that._initializeBoxModel();

            that.framerate = 1000 / that.options.framerate;
            that.start = { x: 0, y: 0 };

            that.source = that.bounceLocation = that.bounceLocation || getScrollOffsets(that.scrollElement);
            that.lastCall = that.source.time = +new Date();

            if (duration) {
                clearTimeout(that.timeoutId);
                that.destination = { x: -x, y: -y, duration: duration };
                that.timeoutId = setTimeout(that._stepScrollProxy, that.framerate);
            } else {
                that._applyCSS({ x: -x, y: -y });
            }
        },

        _stepScrollAnimation: function () {
            var that = this,
                now = +new Date(),
                source = that.source,
                framerate = that.framerate,
                destination = that.destination,
                duration = destination.duration,
                deltaX = -(-source.x - destination.x),
                deltaY = -(-source.y - destination.y),

                timeDelta = now - source.time,
                timeFactor = duration / timeDelta,
                animationIterator = Math.ceil( (now - that.lastCall) / framerate - 1 );

            while (animationIterator-- >= 0) {
                that.bounceLocation = {
                    x: deltaX / timeFactor,
                    y: deltaY / timeFactor
                };
            }

            that._applyCSS( that.bounceLocation );

            if (timeDelta < duration) {
                that.timeoutId = setTimeout( that._stepScrollProxy, framerate );
                that.lastCall = now;
            }
        },

        _scrollBy: function (x, y, duration) {
            var that = this, bounceLocation;

            if (!that.bounceLocation) {
                that._initializeBoxModel();
            }

            that.start = { x: 0, y: 0 };
            bounceLocation = that.bounceLocation = getScrollOffsets(that.scrollElement);

            if (duration) {
                that._startKinetikAnimation(bounceLocation.x - x, bounceLocation.y - y, duration / that.options.acceleration);
            } else {
                that._applyCSS({ x: bounceLocation.x - x, y: bounceLocation.y - y });
            }
        },

        _decelerate: function ( axis, scrollOffset, minBounce, maxBounce, bounceLocation, decelerationVelocity, friction ) {
            var that = this,
                constraint = 0,
                options = that.options,
                bounceStop = options.bounceStop;

            bounceLocation += decelerationVelocity;
            decelerationVelocity *= friction;

            if (-scrollOffset < minBounce) {
                constraint = minBounce + scrollOffset;
            } else {
                if (-scrollOffset > maxBounce) {
                    constraint = maxBounce + scrollOffset;
                }
            }

            if (constraint) {
                var constrainFactor = 0;
                friction -= limitValue( (bounceStop - abs(constraint)) / bounceStop, .04, .9 );
                constrainFactor = constraint * options.bounceDeceleration;
                decelerationVelocity -= constrainFactor;
            }

            that.bounceLocation[axis] = bounceLocation;
            that.decelerationVelocity[axis] = decelerationVelocity;
            that.friction[axis] = limitValue( friction, 0, .99 );
        },

        _stepKinetikAnimation: function () {
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

        _endKinetikAnimation: function () {
            var that = this;

            that.winding = false;
            clearTimeout(that.timeoutId);

            that._hideScrollHints();
        }
    });

    function fireFakeMouseEvent(eventName, event) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent(eventName, event.bubbles || false, event.cancelable || true, event.view || document.defaultView.window,
                           event.detail || 1, event.screenX || event.changedTouches[0].screenX, event.screenY || event.changedTouches[0].screenY,
                           event.clientX || event.changedTouches[0].clientX, event.clientY || event.changedTouches[0].clientY,
                           false, false, false, false, event.button || 0, event.relatedTarget || event.target);
        event.target.dispatchEvent(evt);
    }

    kendo.ui.plugin("Scroller", Scroller, Component);
})(jQuery);
