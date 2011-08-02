(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        extend = $.extend,
        Component = ui.Component,
        events = [ 'showArrow' ],
        touchLocation = kendo.touchLocation;

    var Scroller = Component.extend({
        init: function (element, options) {
            var that = this;
            element = $(element);

            Component.fn.init.call(that, element, options);

            options = that.options;

            that.bind(events, that.options);

            that.xScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
            that.yScrollbar = that.xScrollbar.clone().removeClass('horizontal-scrollbar').addClass('vertical-scrollbar');
            that._scrollbars = $().add(that.xScrollbar).add(that.yScrollbar);

            that._scrollArrows = {};
            var leftArrow = that._scrollArrows.left = $('<a class="scroll-arrow left-scroll-arrow" href="#" />');

            extend( that._scrollArrows, {
                right: leftArrow.clone().removeClass('left-scroll-arrow').addClass('right-scroll-arrow'),
                top: leftArrow.clone().removeClass('left-scroll-arrow').addClass('top-scroll-arrow'),
                bottom: leftArrow.clone().removeClass('left-scroll-arrow').addClass('bottom-scroll-arrow')
            });
            that._horizontalArrows = $().add(that._scrollArrows.left).add(that._scrollArrows.right);
            that._verticalArrows = $().add(that._scrollArrows.top).add(that._scrollArrows.bottom);
            that._allArrows = $().add(that._horizontalArrows).add(that._verticalArrows);

            that._allArrows.click( $.proxy( that._scrollClick, that ) );

            extend(that, {
                webkit3d: 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),

                _waitProxy: $.proxy(that._wait, that),
                _startProxy: $.proxy(that._start, that),
                _stopProxy: $.proxy(that._stop, that),
                _dragProxy: $.proxy(that._drag, that),
                _gestureStartProxy: $.proxy(that._onGestureStart, that),
                _gestureEndProxy: $.proxy(that._onGestureEnd, that),
                _stepScrollProxy: $.proxy( that._stepScrollAnimation, that ),
                _stepKinetikProxy: $.proxy( that._stepKinetikAnimation, that ),

                _transformProperty: kendo.support.transitions.css + 'transform',
                _transformOrigin: kendo.support.transitions.css + 'transform-origin',
                _translate3DPrefix: 'translate' + (that.webkit3d ? '3d(' : '('),
                _translate3DSuffix: (that.webkit3d ? ', 0)' : ')')
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

                scrollbarOpacity: .7,
                scrollArrowsOpacity: .84
            },

        _create: function () {
            var that = this,
                scrollElement = '<div class="scroll-container"></div>',
                children = that.element.children();

            that.element
                .css("overflow", "hidden");

            if (children.length)
                children.wrapAll(scrollElement);
            else
                that.element.append(scrollElement);

            that.scrollElement = that.element.children();
            that._scrollbars.appendTo(that.element);
            that._horizontalArrows.appendTo(that.element);

            if (kendo.support.touch) {
                that._moveEvent = "touchmove",
                that._startEvent = "touchstart",
                that._endEvent = "touchend";

                that.element
                    .bind('gesturestart', that._gestureStartProxy )
                    .bind('gestureend', that._gestureEndProxy )
                    .bind(that._startEvent, that._waitProxy);

                $.browser.mozilla && that.element.bind('mousedown', false );
            } else {
                that._moveEvent = "mousemove",
                that._startEvent = "mousedown",
                that._endEvent = "mouseup";

                that.element.bind( 'mouseenter', function () {
                    that._showScrollArrows();
                });

                that.element.bind( 'mouseleave', function () {
                    that._hideScrollArrows();
                });
            }

            that._storeLastLocation = kendo.throttle(20, function(location) {

                var dX = that.lastLocation.x - location.x, dY = that.lastLocation.y - location.y,
                    newDirection = { x: dX/Math.abs(dX) || 0, y: dY/Math.abs(dY) || 0 },
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

            });

            that._applyCSS = function ( location ) {
                var position = { x: 0, y: 0 },
                    offset = 0,
                    delta = 0,
                    cssModel = {};

                if (that.hasHorizontalScroll) {
                    position.x = -that._limitValue( that.start.x - location.x, that.minBounceStop.x, that.maxBounceStop.x );
                    delta = that._getReverseDelta(-position.x, that.minBounceLimit.x, that.maxBounceLimit.x);
                    var width = Math.max( ~~(that.boxWidth * that.xRatio - Math.abs(delta)), 20);
                    offset = that._limitValue( -position.x * that.xRatio + delta, 0, that.boxWidth - width );

                    cssModel[that._transformProperty] = that._translate3DPrefix + offset + 'px, 0' + that._translate3DSuffix;
                    cssModel['width'] = width + 'px';

                    that.xScrollbar.css( cssModel );
                }

                if (that.hasVerticalScroll) {
                    position.y = -that._limitValue( that.start.y - location.y, that.minBounceStop.y, that.maxBounceStop.y );
                    delta = that._getReverseDelta(-position.y, that.minBounceLimit.y, that.maxBounceLimit.y);
                    var height = Math.max( ~~(that.boxHeight * that.yRatio - Math.abs(delta)), 20);
                    offset = that._limitValue( -position.y * that.yRatio + delta, 0, that.boxHeight - height );

                    cssModel = {};
                    cssModel[that._transformProperty] = that._translate3DPrefix + '0, ' + offset + 'px' + that._translate3DSuffix;
                    cssModel['height'] = height + 'px';

                    that.yScrollbar.css( cssModel );
                }

                that.scrollElement.stop(true,true).css( that._transformProperty, that._translate3DPrefix +
                                                        position.x / that.options.zoomFactor + 'px,' + position.y / that.options.zoomFactor + 'px' + that._translate3DSuffix);
            };

        },

        _getReverseDelta: function (position, minBounceLimit, maxBounceLimit) {
            var that = this,
                bounceStop = that.options.bounceStop;
            return that._limitValue( (position > maxBounceLimit ? (position - maxBounceLimit) : 0) || (position < minBounceLimit ? position : 0),
                                      -bounceStop, bounceStop );
        },

        _limitValue: function (value, minLimit, maxLimit) {
            return Math.max( minLimit, Math.min( maxLimit, value));
        },

        _getScrollOffsets: function () {
            var that = this,
                transforms = (that.scrollElement.css(that._transformProperty).match(/(translate[3d]*\(|matrix\(([\s\w\d]*,){4,4})\s*(-?[\d\.]+)?[\w\s]*,?\s*(-?[\d\.]+)[\w\s]*.*?\)/i) || [0, 0, 0, 0, 0]);

            if (kendo.support.transitions)
                return {
                    x: +transforms[3],
                    y: +transforms[4]
                };
            else
                return {
                    x: parseInt(that.scrollElement.css('marginLeft'), 10) || 0,
                    y: parseInt(that.scrollElement.css('marginTop'), 10) || 0
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
                scrollOffsets = that._getScrollOffsets();

            if ($(e.target).hasClass('left-scroll-arrow'))
                scrollTo = Math.min( 0, scrollOffsets.x + that.element.innerWidth() );

            if ($(e.target).hasClass('right-scroll-arrow'))
                scrollTo = Math.max( -that.scrollElement.innerWidth() + that.element.innerWidth(), scrollOffsets.x - that.element.innerWidth() );

            that.scrollElement.kendoStop().kendoAnimate({effects: { slide: { properties: { translateX: scrollTo + 'px' }, direction: "left" } }, duration: 500 });
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

                if (action == 'hide')
                    hideOptions = { effects: "fadeOut" };

                element.kendoStop(true).kendoAnimate(extend( options, hideOptions ));
            });
        },

        _showScrollArrows: function (e) {
            var that = this;
            that._initializeBoxModel();
            that._allArrows.hide();

            if (that.hasVerticalScroll)
                that._animateArrows(that._verticalArrows, 'show');

            if (that.hasHorizontalScroll)
                that._animateArrows(that._horizontalArrows, 'show');
        },

        _hideScrollArrows: function (e) {
            var that = this;
            if (that.hasVerticalScroll)
                that._animateArrows(that._verticalArrows, 'hide');

            if (that.hasHorizontalScroll)
                that._animateArrows(that._horizontalArrows, 'hide');
        },

        _wait: function (e) {
            e.preventDefault(); // Might stir some problems...
            var that = this;

            that._dragged = false;
            clearTimeout(that.timeoutId);
            that._originalEvent = e.originalEvent;
            var startLocation = touchLocation(e),
                scrollOffsets = that._getScrollOffsets();

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
            if ($.browser.mozilla) {
                that.element
                    .unbind(that._endEvent, that._stopProxy) // Make sure previous event is removed
                    .bind(that._endEvent, that._stopProxy);
            } else {
                document.removeEventListener(that._endEvent, that._stopProxy, true);
                document.addEventListener(that._endEvent, that._stopProxy, true); // Needs capture to prevent delegates...
            }
        },

        _initializeBoxModel: function () {
            var that = this;

            extend(that, {
                        boxWidth: that.element.innerWidth(),
                        boxHeight: that.element.innerHeight(),
                        scrollWidth: that.scrollElement.innerWidth(),
                        scrollHeight: that.scrollElement.innerHeight()
                    });

            var bounceLimit = {
                    x: -that.boxWidth * that.options.bounceLimit,
                    y: -that.boxHeight * that.options.bounceLimit
                },
                bounceStop = {
                    x: -that.options.bounceStop,
                    y: -that.options.bounceStop
                };

            extend(that, {
                        hasHorizontalScroll: that.scrollWidth > that.boxWidth,
                        hasVerticalScroll: that.scrollHeight > that.boxHeight,
                        xRatio: that.boxWidth / that.scrollWidth,
                        yRatio: that.boxHeight / that.scrollHeight,
                        minBounceLimit: bounceLimit,
                        maxBounceLimit: {
                                            x: that.scrollWidth - that.boxWidth - bounceLimit.x,
                                            y: that.scrollHeight - that.boxHeight - bounceLimit.y
                                        },
                        minBounceStop: bounceStop,
                        maxBounceStop: {
                                            x: that.scrollWidth - that.boxWidth - bounceStop.x,
                                            y: that.scrollHeight - that.boxHeight - bounceStop.y
                                        }
                    });
        },

        _start: function (e) {
            var that = this;
            if (that._dragCanceled) return;

            var dip10 = 10 * kendo.support.devicePixelRatio,
                currentLocation = touchLocation(e);
            if (currentLocation.idx != that.start.idx) return;

            if (Math.abs(that.lastLocation.x - currentLocation.x) > dip10 || Math.abs(that.lastLocation.y - currentLocation.y) > dip10) {
                e.preventDefault();
                e.stopPropagation();
                that._dragged = true;

                that._initializeBoxModel();

                if (that.hasHorizontalScroll) {
                    that.xScrollbar
                        .css({
                                width: ~~(that.boxWidth * that.xRatio),
                                opacity: that.options.scrollbarOpacity,
                                visibility: 'visible'
                            });
                }

                if (that.hasVerticalScroll) {
                    that.yScrollbar
                        .css({
                                height: ~~(that.boxHeight * that.yRatio),
                                opacity: that.options.scrollbarOpacity,
                                visibility: 'visible'
                            });
                }

                $(document).unbind(that._moveEvent, that._startProxy)
                           .unbind(that._moveEvent, that._dragProxy)
                           .bind(that._moveEvent, that._dragProxy);
            }
        },

        _drag: function (e) {
            var that = this;
            if (that._dragCanceled) return;

            e.preventDefault();
            e.stopPropagation();

            var currentLocation = touchLocation(e);
            if (currentLocation.idx != that.start.idx) return;

            that._applyCSS( currentLocation );
            that._storeLastLocation( currentLocation );
        },

        _click: function (e) {
            var that = this;
            e.stopPropagation();
            e.preventDefault();
            that.target.unbind( 'click', that.original._click );
        },

        _stop: function (e) {
            var that = this;
            if (that._dragCanceled) return;
            e.preventDefault();
            e.stopPropagation();

            if ($.browser.mozilla)
                that.element.unbind(that._endEvent, that._stopProxy);
            else
                document.removeEventListener(that._endEvent, that._stopProxy, true);
            $(document)
                 .unbind(that._moveEvent, that._startProxy)
                 .unbind(that._moveEvent, that._dragProxy);

            var oEvent = that._originalEvent,
                target = $(oEvent.target),
                proxy = null;

            if (that._dragged) {
                that._dragged = false;

                that._initKinetikAnimation(e);
            } else {
                proxy = $.proxy( that._click, { original: that, target: target } );

                if (kendo.support.touch && oEvent.touches.length == 1) // Fire a click event when there's no drag...
                {
                    target.unbind('click', proxy);
                    target.trigger('touchend');
                    fireFakeMouseEvent('click', oEvent);
                    target.bind('click', proxy);
                }
            }
       },

        _hideScrollHints: function() {
            var that = this;
            if (that.hasHorizontalScroll)
                that.xScrollbar.css('opacity', 0);

            if (that.hasVerticalScroll)
                that.yScrollbar.css('opacity', 0);
        },

        _initKinetikAnimation: function (e) {
            var that = this;

            that.bounceLocation = touchLocation(e);

            var velocityFactor = (+new Date() - that.directionChange) / that.options.acceleration,
                horizontalOffset = that.bounceLocation.x - that.lastLocation.x,
                verticalOffset = that.bounceLocation.y - that.lastLocation.y;

            that._startKinetikAnimation( horizontalOffset, verticalOffset, velocityFactor );
        },

        _startKinetikAnimation: function ( horizontalOffset, verticalOffset, velocityFactor ) {
            var that = this;

            that.decelerationVelocity = { x: horizontalOffset / velocityFactor, y: verticalOffset / velocityFactor };
            that.framerate = 1000 / that.options.framerate;
            that.friction = { x: that.options.friction, y: that.options.friction };
            that.winding = false;

            if (Math.abs(that.decelerationVelocity.x) > that.options.velocity || Math.abs(that.decelerationVelocity.y) > that.options.velocity) {
                that.winding = true;
                that.lastCall = +new Date();
                clearTimeout(that.timeoutId);
                that.timeoutId = setTimeout( that._stepKinetikProxy, that.framerate );
            }
        },

        _singleStep: function () {
            var that = this;

            var scrollOffsets = that._getScrollOffsets();

            that._decelerate( 'x', scrollOffsets.x, that.minBounceLimit.x, that.maxBounceLimit.x );
            that._decelerate( 'y', scrollOffsets.y, that.minBounceLimit.y, that.maxBounceLimit.y );

            if (Math.abs(that.decelerationVelocity.x) <= that.options.velocity && Math.abs(that.decelerationVelocity.y) <= that.options.velocity) {
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

            that.source = that.bounceLocation = that.bounceLocation || that._getScrollOffsets();
            that.lastCall = that.source.time = +new Date();

            if (duration) {
                clearTimeout(that.timeoutId);
                that.destination = { x: -x, y: -y, duration: duration };
                that.timeoutId = setTimeout(that._stepScrollProxy, that.framerate);
            } else
                that._applyCSS({ x: -x, y: -y });
        },

        _stepScrollAnimation: function () {
            var that = this,
                now = +new Date(),
                timeDelta = now - that.source.time,
                timeFactor = that.destination.duration / timeDelta,
                animationIterator = Math.ceil( (now - that.lastCall) / that.framerate - 1 );

            while (animationIterator-- >= 0) {
                that.bounceLocation = {
                    x: -(-that.source.x - that.destination.x) / timeFactor,
                    y: -(-that.source.y - that.destination.y) / timeFactor
                };

                that._applyCSS( that.bounceLocation );
            }

            if (timeDelta < that.destination.duration) {
                that.timeoutId = setTimeout( that._stepScrollProxy, that.framerate );
                that.lastCall = now;
            }
        },

        _scrollBy: function (x, y, duration) {
            var that = this;

            if (!that.bounceLocation)
                that._initializeBoxModel();

            that.start = { x: 0, y: 0 };
            that.bounceLocation = that._getScrollOffsets();

            if (duration) {
                that._startKinetikAnimation(that.bounceLocation.x - x, that.bounceLocation.y - y, duration / that.options.acceleration);
            } else
                that._applyCSS({ x: that.bounceLocation.x - x, y: that.bounceLocation.y - y });
        },

        _decelerate: function ( axis, scrollOffset, minBounce, maxBounce ) {
            var that = this,
                constraint = 0,
                bounceStop = that.options.bounceStop,
                bounceLocation = that.bounceLocation[axis],
                decelerationVelocity = that.decelerationVelocity[axis],
                friction = that.friction[axis];

            bounceLocation += decelerationVelocity;
            decelerationVelocity *= friction;

            if (-scrollOffset < minBounce)
                constraint = minBounce + scrollOffset;
            else
                if (-scrollOffset > maxBounce)
                    constraint = maxBounce + scrollOffset;

            if (constraint) {
                var constrainFactor = 0;
                friction -= that._limitValue( (bounceStop - Math.abs(constraint)) / bounceStop, .04, .9 );
                constrainFactor = constraint * that.options.bounceDeceleration;
                decelerationVelocity -= constrainFactor;
            }

            that.bounceLocation[axis] = bounceLocation;
            that.decelerationVelocity[axis] = decelerationVelocity;
            that.friction[axis] = that._limitValue( friction, 0, .99 );
        },

        _stepKinetikAnimation: function () {
            var that = this;
            if (!that.winding) return;

            var now = +new Date(),
                timeDelta = now - that.lastCall,
                animationIterator = Math.round( timeDelta / that.framerate - 1 );

            while (animationIterator-- > 0)
                if (that._singleStep()) return;

            if (that._singleStep()) return;

            that._applyCSS( that.bounceLocation );

            that.timeoutId = setTimeout( that._stepKinetikProxy, that.framerate );
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

    function fireFakeTouchEvent(eventName, event) {
        var evt = document.createEvent("TouchEvent");
        evt.initTouchEvent(eventName, event.bubbles || false, event.cancelable || true, event.view || document.defaultView.window,
                           event.detail || 1, event.changedTouches[0].screenX, event.changedTouches[0].screenY,
                           event.changedTouches[0].clientX, event.changedTouches[0].clientY,
                           false, false, false, false, event.touches, event.targetTouches, event.changedTouches, event.scale, event.rotation);
        event.target.dispatchEvent(evt);
    }

    kendo.ui.plugin("Scroller", Scroller, Component);
})(jQuery, window);
