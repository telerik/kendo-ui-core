var isTouch = 'ontouchstart' in window;

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
        framerate: 60,

        scrollbarOpacity: .7
    };

    if (typeof arguments[1] === 'object')
        $.extend( this.options, arguments[1] );

    this.xScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
    this.yScrollbar = this.xScrollbar.clone().replaceClass('horizontal-scrollbar', 'vertical-scrollbar');
    this._scrollbars = this.xScrollbar.add(this.yScrollbar);
    this.webkit3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

    this._startProxy = $.proxy(this._start, this);
    this._stopProxy = $.proxy(this._stop, this);
    this._dragProxy = $.proxy(this._drag, this);

    this._transformProperty = $.getCssPrefix() + 'transform';
    this._transformOrigin = $.getCssPrefix() + 'transform-origin';
    
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
        if (isTouch) {
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

        this._throttleCSS = $.throttle(2, function ( location ) {
            var position = { x: 0, y: 0 },
                delta = 0,
                cssModel = {};

            if (this.xScroll) {
                position.x = -Math.max( this.minBounceStop.x, Math.min( this.maxBounceStop.x, -(location.x - this.start.x )));
                delta = this._constrainOffset(~~(-position.x * this.xOffsetRatio));

                cssModel[this._transformOrigin] = delta.offset + '% 0';
                cssModel[this._transformProperty] = 'scaleX(' + (this.xRatio - Math.abs(delta.compensation) / this.scrollWidth).toFixed(2) + ')';

                this.xScrollbar.css( cssModel );
            }

            if (this.yScroll) {
                position.y = -Math.max( this.minBounceStop.y, Math.min( this.maxBounceStop.y, -(location.y - this.start.y)));
                delta = this._constrainOffset(~~(-position.y * this.yOffsetRatio));

                cssModel[this._transformOrigin] = '0 ' + delta.offset + '%';
                cssModel[this._transformProperty] = 'scaleY(' + (this.yRatio - Math.abs(delta.compensation) / this.scrollHeight).toFixed(2) + ')';

                this.yScrollbar.css( cssModel );
            }
            
            this.scrollElement.stop(true,true).css( this._transformProperty, 'translate' + (this.webkit3d ? '3d' : '') +
                                                    '(' + position.x + 'px,' + position.y + 'px' + (this.webkit3d ? ', 0)' : ')') );
        });

    },

    _constrainOffset: function (offset) {
        var bounceStop = this.options.bounceStop;
        return {
            compensation: Math.max(-bounceStop, Math.min(bounceStop, (offset > bounceStop ? (offset - bounceStop)*5 : 0) || (offset < 0 ? offset*5 : 0))),
            offset: Math.min(100, Math.max(0, offset))
        }
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
        var currentLocation = touchLocation(e);
        this._dragged = false;

        if (Math.abs(this.lastLocation.x - currentLocation.x) > 10 || Math.abs(this.lastLocation.y - currentLocation.y) > 10) {
            e.preventDefault();
            this._dragged = true;

            $(document).unbind(this._moveEvent, this._startProxy)
                       .bind(this._moveEvent, this._dragProxy);

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
                xScroll: this.scrollWidth > this.boxWidth,
                yScroll: this.scrollHeight > this.boxHeight,
                xRatio: this.boxWidth / this.scrollWidth,
                yRatio: this.boxHeight / this.scrollHeight,
                xOffsetRatio: 100 / (this.scrollWidth - this.boxWidth),
                yOffsetRatio: 100 / (this.scrollHeight - this.boxHeight),
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

            if (this.xScroll) {
                this.xScrollbar
                    .css( this._transformProperty, 'scaleX(' + this.xRatio + ')' )
                    .show().css('opacity', this.options.scrollbarOpacity);
            }

            if (this.yScroll) {
                this.yScrollbar
                    .css( this._transformProperty, 'scaleY(' + this.yRatio + ')' )
                    .show().css('opacity', this.options.scrollbarOpacity);
            }
        }
    },

    _drag: function (e) {
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
        var oEvent = this._originalEvent,
            target = $(oEvent.target),
            proxy = null;
        
        if (this._dragged) {
            this._dragged = false;
            e.preventDefault();

            if (!isTouch) {
                proxy = $.proxy( this._click, { original: this, target: target } );
                target.bind( 'click', proxy );
            }

            this._startKinetikAnimation(e);
        } else {
            if (isTouch && this._originalEvent.touches.length == 1) // Fire a click event when there's no drag...
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

        if (this.xScroll)
            this.xScrollbar.css('opacity', 0);

        if (this.yScroll)
            this.yScrollbar.css('opacity', 0);
    }
};
