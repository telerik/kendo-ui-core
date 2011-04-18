var isTouch = 'ontouchstart' in window;

function Scroller (element) {
    this.element = $(element);
    this._location = {};

    this.options = {
        acceleration: 15,
        velocity: 1,
        pagingVelocity: 5,
        friction: .9,
        boundAcceleration: .1,
        boundDeceleration: .05,
        boundLimit: .5,
        framerate: 60,

        scrollbarOpacity: .7
    };

    if (typeof arguments[1] === 'object')
        $.extend( this.options, arguments[1] );

    this._horizontalScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
    this._verticalScrollbar = this._horizontalScrollbar.clone().replaceClass('horizontal-scrollbar', 'vertical-scrollbar');
    this._scrollbars = this._horizontalScrollbar.add(this._verticalScrollbar);
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

function constrainOffset (offset) {
    return {
        compensation: Math.max(-100, Math.min(100, (offset > 100 ? (offset - 100)*5 : 0) || (offset < 0 ? offset*5 : 0))),
        offset: Math.min(100, Math.max(0, offset))
    }
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

        this._storeLastLocation = $.throttle(50, function(location) {
            var loc = this._location;

            var dX = loc.last.x - location.x, dY = loc.last.y - location.y,
                newDirection = { x: dX/Math.abs(dX) || 0, y: dY/Math.abs(dY) || 0 },
                oldDirection = loc.direction;

            if (oldDirection) {
                if (newDirection.x && oldDirection.x != newDirection.x) {
                    this._location.direction.x = newDirection.x;
                    this._location.directionChange = +new Date();
                    this._location.last = location;
                }
                if (newDirection.y && oldDirection.y != newDirection.y) {
                    this._location.direction.y = newDirection.y;
                    this._location.directionChange = +new Date();
                    this._location.last = location;
                }
            } else {
                this._location.directionChange = +new Date();
                this._location.direction = newDirection;
                this._location.last = location;
            }
            
        });

        this._throttleCSS = function ( location ) {
            var horizontalDifference = 0,
                verticalDifference = 0,
                delta = 0,
                cssModel = {};

            if (this._boxModel.hasHorizontalScroll) {
                horizontalDifference = location.x - this.start.x;
                delta = constrainOffset(~~(-horizontalDifference * this._boxModel.horizontalOffsetRatio));

                cssModel[this._transformOrigin] = delta.offset + '% 0';
                cssModel[this._transformProperty] = 'scaleX(' + (this._boxModel.horizontalRatio - Math.abs(delta.compensation) / this._boxModel.scrollWidth).toFixed(2) + ')';

                this._horizontalScrollbar.css( cssModel );
            }

            if (this._boxModel.hasVerticalScroll) {
                verticalDifference = location.y - this.start.y;
                delta = constrainOffset(~~(-verticalDifference * this._boxModel.verticalOffsetRatio));

                cssModel[this._transformOrigin] = '0 ' + delta.offset + '%';
                cssModel[this._transformProperty] = 'scaleY(' + (this._boxModel.verticalRatio - Math.abs(delta.compensation) / this._boxModel.scrollHeight).toFixed(2) + ')';

                this._verticalScrollbar.css( cssModel );
            }

            this.scrollElement.stop(true,true).css( this._transformProperty, 'translate' + (this.webkit3d ? '3d' : '') +
                                                    '(' + horizontalDifference + 'px,' +
                                                          verticalDifference + 'px' +
                                                          (this.webkit3d ? ', 0)' : ')') );
        }

    },

    _getScrollOffsets: function () {
        var transforms = this.scrollElement.css(this._transformProperty).match(/(translate3?d?|matrix)\([,\s\w\d]*?\s*(-?[\d\.]+)[\w\s]*,\s*(-?[\d\.]+)[\w\s]*(,\s*-?[\d\.]+[\w\s]*)?\)/i) || [0, 0, 0, 0];

        return {
            x: (+transforms[2]).toFixed(2),
            y: (+transforms[3]).toFixed(2)
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
        this._location.last = startLocation;
        this._location.direction = { x: 1, y: 1 };
        this._location.directionChange = +new Date();

        $(document)
            .bind(this._moveEvent, this._startProxy)
            .bind(this._endEvent, this._stopProxy);
    },

    _start: function (e) {
        var currentLocation = touchLocation(e);
        this._dragged = false;

        if (Math.abs(this._location.last.x - currentLocation.x) > 10 || Math.abs(this._location.last.y - currentLocation.y) > 10) {
            e.preventDefault();
            this._dragged = true;

            $(document).unbind(this._moveEvent, this._startProxy)
                       .bind(this._moveEvent, this._dragProxy);

            this._boxModel = {
                width: this.element.innerWidth(),
                height: this.element.innerHeight(),
                scrollWidth: this.scrollElement.innerWidth(),
                scrollHeight: this.scrollElement.innerHeight()
            };
            
            $.extend(this._boxModel, {
                hasHorizontalScroll: this._boxModel.scrollWidth > this._boxModel.width,
                hasVerticalScroll: this._boxModel.scrollHeight > this._boxModel.height,
                horizontalRatio: this._boxModel.width / this._boxModel.scrollWidth,
                verticalRatio: this._boxModel.height / this._boxModel.scrollHeight,
                horizontalOffsetRatio: 100 / (this._boxModel.scrollWidth - this._boxModel.width),
                verticalOffsetRatio: 100 / (this._boxModel.scrollHeight - this._boxModel.height)
            });

            if (this._boxModel.hasHorizontalScroll) {
                this._horizontalScrollbar
                    .css( this._transformProperty, 'scaleX(' + this._boxModel.horizontalRatio + ')' )
                    .show().css('opacity', this.options.scrollbarOpacity);
            }

            if (this._boxModel.hasVerticalScroll) {
                this._verticalScrollbar
                    .css( this._transformProperty, 'scaleY(' + this._boxModel.verticalRatio + ')' )
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

        this._kinetikOptions = {
            location: touchLocation(e),
            scrollOffsets: this._getScrollOffsets()
        };

        var velocityFactor = ((+new Date() - this._location.directionChange) / this.options.acceleration).toFixed(2),
            horizontalOffset = this._kinetikOptions.location.x - this._location.last.x,
            verticalOffset = this._kinetikOptions.location.y - this._location.last.y;

        $.extend(this._kinetikOptions, {
            location: {
                x: this._kinetikOptions.location.x,
                y: this._kinetikOptions.location.y
            },
            decelerationVelocity : {
                x: horizontalOffset / velocityFactor,
                y: verticalOffset / velocityFactor
            },
            framerate: 1000 / this.options.framerate,
            winding: false
        });

        if (Math.abs(this._kinetikOptions.decelerationVelocity.x) > this.options.velocity || Math.abs(this._kinetikOptions.decelerationVelocity.y) > this.options.velocity) {
            this._kinetikOptions.winding = true;
            this._kinetikOptions.lastCall = +new Date();
            this.timeoutId = setTimeout( $.proxy( this._stepKinetikAnimation, this ), this._kinetikOptions.framerate );
        }
    },

    _singleStep: function () {
        this._kinetikOptions.location = {
            x: this._kinetikOptions.location.x + this._kinetikOptions.decelerationVelocity.x,
            y: this._kinetikOptions.location.y + this._kinetikOptions.decelerationVelocity.y
        };

        this._kinetikOptions.decelerationVelocity.x *= this.options.friction;
        this._kinetikOptions.decelerationVelocity.y *= this.options.friction;

        this._kinetikOptions.lastCall = +new Date();

        if (Math.abs(this._kinetikOptions.decelerationVelocity.x) <= this.options.velocity && Math.abs(this._kinetikOptions.decelerationVelocity.y) <= this.options.velocity) {
            this._kinetikOptions.winding = false;
            this._endKinetikAnimation();
            return true;
        }

        return false
    },

    _stepKinetikAnimation: function () {
        if (!this._kinetikOptions.winding) return;

        var now = +new Date();
        var timeDelta = now - this._kinetikOptions.lastCall;
        var animationIterator = Math.round( timeDelta / this._kinetikOptions.framerate - 1 );

        while (animationIterator-- > 0)
            if (this._singleStep()) return;

        if (this._singleStep()) return;

        this._throttleCSS( this._kinetikOptions.location );

        this.timeoutId = setTimeout( $.proxy( this._stepKinetikAnimation, this ), this._kinetikOptions.framerate );

        this._kinetikOptions.lastCall = now;
    },

    _endKinetikAnimation: function () {
        this._kinetikOptions.winding = false;
        clearTimeout(this.timeoutId);

        if (this._boxModel.hasHorizontalScroll)
            this._horizontalScrollbar.css('opacity', 0);
        
        if (this._boxModel.hasVerticalScroll)
            this._verticalScrollbar.css('opacity', 0);
    }
};
