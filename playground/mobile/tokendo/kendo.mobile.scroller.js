var isTouch = (/iphone|ipad|android/gi).test(navigator.appVersion);

function Scroller (element) {
    this.element = element;
    this.wrapper = $(element);
    this._location = {};

    this._horizontalScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
    this._verticalScrollbar = this._horizontalScrollbar.clone().replaceClass('horizontal-scrollbar', 'vertical-scrollbar');
    this._scrollbars = this._horizontalScrollbar.add(this._verticalScrollbar);

    this._startProxy = $.proxy(this._start, this);
    this._stopProxy = $.proxy(this._stop, this);
    this._dragProxy = $.proxy(this._drag, this);

    this._transitionProperty = $.getCssPrefix() + 'transform';
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
        var children = this.wrapper.children();

        this.wrapper
            .css("overflow", "hidden")
            .bind(this._startEvent, $.proxy(this._wait, this));

        if (children.length)
            children.wrapAll(scrollElement);
        else
            this.wrapper.append(scrollElement);

        this.scrollElement = this.wrapper.children();

        this._scrollbars.appendTo(this.wrapper);

        this._storeLastLocation = $.throttle(50, function(location) {
            var loc = this._location;

            var dX = loc.last.x - location.x, dY = loc.last.y - location.y,
                newDirection = { x: dX/Math.abs(dX) || 0, y: dY/Math.abs(dY) || 0 },
                oldDirection = loc.direction;

            if (oldDirection) {
                if (newDirection.x && oldDirection.x != newDirection.x) {
                    this._location.direction.x = newDirection.x;
                    this._location.directionChange = +new Date();
                }
                if (newDirection.y && oldDirection.y != newDirection.y) {
                    this._location.direction.y = newDirection.y;
                    this._location.directionChange = +new Date();
                }
            } else {
                this._location.directionChange = +new Date();
                this._location.direction = newDirection;
            }
            
            this._location.last = location;
        });

        this._throttleCSS = $.throttle(20, function ( location ) {
            var horizontalDifference = 0,
            verticalDifference = 0,
            vsCompensate = 0,
            hsCompensate = 0,
            offset = 0;

            if (this._boxModel.scrollWidth > this._boxModel.width) {
                horizontalDifference = location.x - this.start.x;
                offset = ~~(-horizontalDifference * 100 / (this._boxModel.scrollWidth - this._boxModel.width));
                hsCompensate = Math.max(-100, Math.min(100, (offset > 100 ? (offset - 100)*5 : 0) || (offset < 0 ? offset*5 : 0)));
                offset = Math.min(100, Math.max(0, offset));

                this._horizontalScrollbar
                        .css( this._transformOrigin, offset + '% 0' );
                if (hsCompensate)
                    this._horizontalScrollbar
                        .css( this._transformProperty, 'scaleX(' + ((this._boxModel.width - Math.abs(hsCompensate)) / this._boxModel.scrollWidth) + ')' );
            }

            if (this._boxModel.scrollHeight > this._boxModel.height) {
                verticalDifference = location.y - this.start.y;
                offset = ~~(-verticalDifference * 100 / (this._boxModel.scrollHeight - this._boxModel.height));
                vsCompensate = Math.max(-100, Math.min(100, (offset > 100 ? (offset - 100)*5 : 0) || (offset < 0 ? offset*5 : 0)));
                offset = Math.min(100, Math.max(0, offset));

                this._verticalScrollbar
                        .css( this._transformOrigin, '0 ' + offset + '%' );
                if (vsCompensate)
                    this._verticalScrollbar
                        .css( this._transformProperty, 'scaleY(' + ((this._boxModel.height - Math.abs(vsCompensate)) / this._boxModel.scrollHeight) + ')' );
            }

            this.scrollElement.stop(true,true).css( this._transformProperty, 'translate(' + horizontalDifference + 'px,' + verticalDifference + 'px)' );
        });

    },

    _getScrollOffsets: function () {
        var transforms = this.scrollElement.css(this._transformProperty).match(/(translate|matrix)\([,\s\w\d]*?\s*(-?\d+)[\w\s]*,\s*(-?\d+)[\w\s]*\)/i) || [0, 0, 0, 0];

        return {
            x: +transforms[2],
            y: +transforms[3]
        };
    },

    _wait: function (e) {
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
                width: this.wrapper.innerWidth(),
                height: this.wrapper.innerHeight(),
                scrollWidth: this.scrollElement.innerWidth(),
                scrollHeight: this.scrollElement.innerHeight()
            };

            if (this._boxModel.scrollWidth > this._boxModel.width) {
                this._horizontalScrollbar
                    .css( this._transformProperty, 'scaleX(' + (this._boxModel.width / this._boxModel.scrollWidth) + ')' )
                    .show()
                    .stop(true,true)
                    .fadeTo( 200, .7 );
            }

            if (this._boxModel.scrollHeight > this._boxModel.height) {
                this._verticalScrollbar
                    .css( this._transformProperty, 'scaleY(' + (this._boxModel.height / this._boxModel.scrollHeight) + ')' )
                    .show()
                    .stop(true,true)
                    .fadeTo( 200, .7 );
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
        $(document).unbind(this._moveEvent, this._startProxy)
                   .unbind(this._moveEvent, this._dragProxy)
                   .unbind(this._endEvent, this._stopProxy);

        if (this._dragged) {
            this._dragged = false;
            e.preventDefault();

            var currentLocation = touchLocation(e), that = this,
                scrollOffsets = this._getScrollOffsets(),
                horizontalOffset = this._boxModel.scrollWidth > this._boxModel.width ? (currentLocation.x - this._location.last.x) + scrollOffsets.x : 0,
                verticalOffset = this._boxModel.scrollHeight > this._boxModel.height ? (currentLocation.y - this._location.last.y) + scrollOffsets.y : 0,
                duration = Math.min(1000, 250 + (+new Date() - this._location.directionChange));

            this.scrollElement
                .stop(true,true)
                .animate({
                        translate: horizontalOffset + 'px,' + verticalOffset + 'px'
                    }, duration, 'ease-out', function () {
                        that._scrollbars
                            .stop(true,true)
                            .fadeTo(400, 0);
                    });

        } else {
            if (isTouch && this._originalEvent.touches.length == 1) // Fire a click event when there's no drag...
            {
                var oEvent = this._originalEvent;
                var target = $(oEvent.target);
                var evt = document.createEvent("MouseEvents");
                var proxy = $.proxy( this._click, { original: this, target: target } );

                target.unbind( 'click', proxy );
                evt.initMouseEvent("click", oEvent.bubbles, oEvent.cancelable, oEvent.view,
                                   oEvent.detail, oEvent.screenX, oEvent.screenY, oEvent.clientX, oEvent.clientY,
                                   false, false, false, false, oEvent.button, oEvent.relatedTarget);

                oEvent.target.dispatchEvent(evt);
                target.bind( 'click', proxy );
            }
        }

    }
};
