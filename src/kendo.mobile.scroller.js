function Scroller (element) {
    this.element = $(element);

    this.options = {
        acceleration: 10,
        velocity: .1,
        pagingVelocity: 5,
        friction: .95,
        bounceAcceleration: .1,
        bounceDeceleration: .1,
        bounceLimit: 0,
        bounceStop: 100,
        framerate: 30,

        scrollbarOpacity: .7
    };

    if (typeof arguments[1] === 'object')
        $.extend( this.options, arguments[1] );

    this.xScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
    this.yScrollbar = this.xScrollbar.clone().replaceClass('horizontal-scrollbar', 'vertical-scrollbar');
    this._scrollbars = $().add(this.xScrollbar).add(this.yScrollbar);
    this.webkit3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

    this._startProxy = $.proxy(this._start, this);
    this._stopProxy = $.proxy(this._stop, this);
    this._dragProxy = $.proxy(this._drag, this);
    this._gestureStartProxy = $.proxy(this._onGestureStart, this);
    this._gestureEndProxy = $.proxy(this._onGestureEnd, this);

    this._transformProperty = $.getCssPrefix() + 'transform';
    this._transformOrigin = $.getCssPrefix() + 'transform-origin';
    this._translate3DPrefix = 'translate' + (this.webkit3d ? '3d(' : '(');
    this._translate3DSuffix = (this.webkit3d ? ', 0)' : ')');
    
    this._create();
}

function touchLocation(e) {
    var changedTouches = e.changedTouches ? e.changedTouches : null;

    if (changedTouches && changedTouches.length < 2) {
        return {
            x: changedTouches[0].pageX,
            y: changedTouches[0].pageY
        };
    }

    return {
        x: e.pageX,
        y: e.pageY
    };
}

$.throttle = function(delay, callback) {
    var timeout_id,
        last_call = 0,
        omit_ending = arguments[2] || false;

    return function () {
        var that = this,
            time_span = +new Date() - last_call,
            args = arguments;

        function execute() {
            last_call = +new Date();
            callback.apply(that, args);
        }

        function clear() {
            timeout_id = undefined;
        }

        timeout_id && clearTimeout(timeout_id);

        if (time_span > delay)
            execute();
        else
            if (!omit_ending)
                timeout_id = setTimeout( execute, delay - time_span);
    };
};

Scroller.prototype = {
    _create: function () {
        if (kendo.support.touch) {
            this._moveEvent = "touchmove",
            this._startEvent = "touchstart",
            this._endEvent = "touchend";
        } else {
            this._moveEvent = "mousemove",
            this._startEvent = "mousedown",
            this._endEvent = "mouseup";
        }
        var scrollElement = '<div class="scroll-container"></div>';
        var children = this.element.children();

        this.element
            .css("overflow", "hidden")
            .bind(this._startEvent, $.proxy(this._wait, this));

        if (kendo.support.touch)
            this.element
                .bind('gesturestart', this._gestureStartProxy )
                .bind('gestureend', this._gestureEndProxy );

        if (children.length)
            children.wrapAll(scrollElement);
        else
            this.element.append(scrollElement);

        this.scrollElement = this.element.children();
        this._scrollbars.appendTo(this.element);

        this._storeLastLocation = $.throttle(20, function(location) {

            var dX = this.lastLocation.x - location.x, dY = this.lastLocation.y - location.y,
                newDirection = { x: dX/Math.abs(dX) || 0, y: dY/Math.abs(dY) || 0 },
                oldDirection = this.direction;

            if (oldDirection) {
                if (newDirection.x && oldDirection.x != newDirection.x) {
                    this.direction.x = newDirection.x;
                    this.directionChange = +new Date();
                    this.lastLocation = location;
                }
                if (newDirection.y && oldDirection.y != newDirection.y) {
                    this.direction.y = newDirection.y;
                    this.directionChange = +new Date();
                    this.lastLocation = location;
                }
            } else {
                this.direction = newDirection;
                this.directionChange = +new Date();
                this.lastLocation = location;
            }
            
        });

        this._throttleCSS = function ( location ) {
            var position = { x: 0, y: 0 },
                offset = 0,
                delta = 0,
                cssModel = {};

            if (this.xScroller) {
                position.x = -Math.max( this.minBounceStop.x, Math.min( this.maxBounceStop.x, -(location.x - this.start.x)));
                delta = Math.max(-this.options.bounceStop, Math.min(this.options.bounceStop,
                                (-position.x > this.maxBounceLimit.x ? (-position.x - this.maxBounceLimit.x) : 0) || (-position.x < this.minBounceLimit.x ? -position.x : 0)));
                var width = ~~(this.boxWidth * (this.xRatio - Math.abs(delta) / this.scrollWidth));
                offset = Math.min(this.boxWidth, Math.max(0, -position.x * this.xRatio - Math.abs(delta) / this.scrollWidth));

                cssModel[this._transformProperty] = this._translate3DPrefix + offset + 'px, 0' + this._translate3DSuffix;
                cssModel['width'] = width + 'px';

                this.xScrollbar.css( cssModel );
            }

            if (this.yScroller) {
                position.y = -Math.max( this.minBounceStop.y, Math.min( this.maxBounceStop.y, -(location.y - this.start.y)));
                delta = Math.max(-this.options.bounceStop, Math.min(this.options.bounceStop,
                                (-position.y > this.maxBounceLimit.y ? (-position.y - this.maxBounceLimit.y) : 0) || (-position.y < this.minBounceLimit.y ? -position.y : 0)));
                var height = ~~(this.boxHeight * (this.yRatio - Math.abs(delta) / this.scrollHeight));
                offset = Math.min(this.boxHeight, Math.max(0, -position.y * this.yRatio - Math.abs(delta) / this.scrollHeight));
                
                cssModel = {};
                cssModel[this._transformProperty] = this._translate3DPrefix + '0, ' + offset + 'px' + this._translate3DSuffix;
                cssModel['height'] = height + 'px';

                this.yScrollbar.css( cssModel );
            }
            
            this.scrollElement.stop(true,true).css( this._transformProperty, this._translate3DPrefix +
                                                    position.x + 'px,' + position.y + 'px' + this._translate3DSuffix);
        };

    },

    _onGestureStart: function () {
        this._dragCanceled = true;
    },

    _onGestureEnd: function () {
        this._dragCanceled = false;
    },

    _getScrollOffsets: function () {
        var transforms = this.scrollElement.css(this._transformProperty).match(/(translate3?d?|matrix)\([,\s\w\d]*?\s*(-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+)[\w\s]*(,\s*-?[\d\.]+[\w\s]*)?\)/i) || [0, 0, 0, 0];

        return {
            x: +transforms[2],
            y: +transforms[3]
        };
    },

    _wait: function (e) {
        clearTimeout(this.timeoutId);
        this._originalEvent = e;
        var startLocation = touchLocation(e);
        var scrollOffsets = this._getScrollOffsets();

        this.start = {
            x: startLocation.x - scrollOffsets.x,
            y: startLocation.y - scrollOffsets.y
        };
        
        this.lastLocation = startLocation;
        this.direction = { x: 1, y: 1 };
        this.directionChange = +new Date();

        $(document)
            .bind(this._moveEvent, this._startProxy)
            .bind(this._endEvent, this._stopProxy);
    },

    _start: function (e) {
        if (this._dragCanceled) return;

        var currentLocation = touchLocation(e);
        this._dragged = false;

        if (Math.abs(this.lastLocation.x - currentLocation.x) > 10 || Math.abs(this.lastLocation.y - currentLocation.y) > 10) {
            e.preventDefault();
            this._dragged = true;

            this.boxWidth = this.element.innerWidth();
            this.boxHeight = this.element.innerHeight();
            this.scrollWidth = this.scrollElement.innerWidth();
            this.scrollHeight = this.scrollElement.innerHeight();

            var bounceLimit = {
                    x: -this.boxWidth * this.options.bounceLimit,
                    y: -this.boxHeight * this.options.bounceLimit
                },
                bounceStop = {
                    x: -this.options.bounceStop,
                    y: -this.options.bounceStop
                };

            $.extend(this, {
                xScroller: this.scrollWidth > this.boxWidth,
                yScroller: this.scrollHeight > this.boxHeight,
                xRatio: this.boxWidth / this.scrollWidth,
                yRatio: this.boxHeight / this.scrollHeight,
                minBounceLimit: bounceLimit,
                maxBounceLimit: {
                    x: this.scrollWidth - this.boxWidth - bounceLimit.x,
                    y: this.scrollHeight - this.boxHeight - bounceLimit.y
                },
                minBounceStop: bounceStop,
                maxBounceStop: {
                    x: this.scrollWidth - this.boxWidth - bounceStop.x,
                    y: this.scrollHeight - this.boxHeight - bounceStop.y
                }
            });

            if (this.xScroller) {
                this.xScrollbar.css('opacity');
                this.xScrollbar
                    .css({
                            width: ~~(this.boxWidth * this.xRatio),
                            opacity: this.options.scrollbarOpacity,
                            visibility: 'visible'
                        });
            }

            if (this.yScroller) {
                this.yScrollbar
                    .css({
                            height: ~~(this.boxHeight * this.yRatio),
                            opacity: this.options.scrollbarOpacity,
                            visibility: 'visible'
                        });
            }

            $(document).unbind(this._moveEvent, this._startProxy)
                       .bind(this._moveEvent, this._dragProxy);
        }
    },

    _drag: function (e) {
        if (this._dragCanceled) return;

        e.preventDefault();

        var currentLocation = touchLocation(e);

        this._throttleCSS( currentLocation );
        this._storeLastLocation( currentLocation );
    },

    _click: function (e) {
        e.stopPropagation();
        e.preventDefault();
        this.target.unbind( 'click', this.original._click );
    },

    _stop: function (e) {
        if (this._dragCanceled) return;

        var oEvent = this._originalEvent,
            target = $(oEvent.target),
            proxy = null;
        
        if (this._dragged) {
            this._dragged = false;
            e.preventDefault();

            if (!kendo.support.touch) {
                proxy = $.proxy( this._click, { original: this, target: target } );
                target.bind( 'click', proxy );
            }

            this._startKinetikAnimation(e);
        } else {
            if (kendo.support.touch && this._originalEvent.touches.length == 1) // Fire a click event when there's no drag...
            {
                proxy = $.proxy( this._click, { original: this, target: target } );
                var evt = document.createEvent("MouseEvents");

                target.unbind( 'click', proxy );
                evt.initMouseEvent("click", oEvent.bubbles, oEvent.cancelable, oEvent.view,
                                   oEvent.detail, oEvent.screenX, oEvent.screenY, oEvent.clientX, oEvent.clientY,
                                   false, false, false, false, oEvent.button, oEvent.relatedTarget);

                oEvent.target.dispatchEvent(evt);
                target.bind( 'click', proxy );
            }
        }

        $(document).unbind(this._moveEvent, this._startProxy)
                   .unbind(this._moveEvent, this._dragProxy)
                   .unbind(this._endEvent, this._stopProxy);
   },

    _startKinetikAnimation: function (e) {

        this.bounceLocation = touchLocation(e);

        var velocityFactor = ((+new Date() - this.directionChange) / this.options.acceleration).toFixed(2),
            horizontalOffset = this.bounceLocation.x - this.lastLocation.x,
            verticalOffset = this.bounceLocation.y - this.lastLocation.y;

        this.decelerationVelocity = { x: horizontalOffset / velocityFactor, y: verticalOffset / velocityFactor };
        this.framerat = 1000 / this.options.framerate;
        this.friction = { x: this.options.friction, y: this.options.friction };
        this.winding = false;

        if (Math.abs(this.decelerationVelocity.x) > this.options.velocity || Math.abs(this.decelerationVelocity.y) > this.options.velocity) {
            this.winding = true;
            this.lastCall = +new Date();
            this.timeoutId = setTimeout( $.proxy( this._stepKinetikAnimation, this ), this.framerate );
        }
    },

    _singleStep: function () {
        var constraint = { x: 0, y: 0 },
            scrollOffsets = this._getScrollOffsets(),
            minBounce = this.minBounceLimit,
            maxBounce = this.maxBounceLimit;

        ['x', 'y'].forEach(function (item) {
            this.bounceLocation[item] += this.decelerationVelocity[item];
            this.decelerationVelocity[item] *= this.friction[item];

            if (-scrollOffsets[item] < minBounce[item])
                constraint[item] = minBounce[item] + scrollOffsets[item];
            else
                if (-scrollOffsets[item] > maxBounce[item])
                    constraint[item] = maxBounce[item] + scrollOffsets[item];

            var constrainFactor = 0;

            if (constraint[item]) {
                this.friction[item] -= .03;
                constrainFactor = constraint[item] * this.options.bounceDeceleration;
                this.decelerationVelocity[item] -= Math.abs(constrainFactor) > 1 ? constrainFactor : 1;
            }
        }, this);

        if (Math.abs(this.decelerationVelocity.x) <= this.options.velocity && Math.abs(this.decelerationVelocity.y) <= this.options.velocity) {
            this.winding = false;
            this._endKinetikAnimation();
            return true;
        }

        return false
    },

    _stepKinetikAnimation: function () {
        if (!this.winding) return;

        var now = +new Date();
        var timeDelta = now - this.lastCall;
        var animationIterator = Math.round( timeDelta / this.framerate - 1 );

        while (animationIterator-- > 0)
            if (this._singleStep()) return;

        if (this._singleStep()) return;

        this._throttleCSS( this.bounceLocation );

        this.timeoutId = setTimeout( $.proxy( this._stepKinetikAnimation, this ), this.framerate );
        this.lastCall = now;
    },

    _endKinetikAnimation: function () {
        this.winding = false;
        clearTimeout(this.timeoutId);

        if (this.xScroller)
            this.xScrollbar.css('opacity', 0);

        if (this.yScroller)
            this.yScrollbar.css('opacity', 0);
    }
};
