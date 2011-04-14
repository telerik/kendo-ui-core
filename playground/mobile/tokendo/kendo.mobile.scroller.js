var isTouch = (/iphone|ipad|android/gi).test(navigator.appVersion);

function Scroller (element) {
    this.element = element;
    this.wrapper = $(element);

    this._horizontalScrollbar = $('<div class="touch-scrollbar horizontal-scrollbar" />');
    this._verticalScrollbar = this._horizontalScrollbar.clone().replaceClass('horizontal-scrollbar', 'vertical-scrollbar');
    this._scrollbars = this._horizontalScrollbar.add(this._verticalScrollbar);

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

        this._storeLastLocation = $.throttle(100, function(location) {
            this._lastLocation = location;
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
            location: startLocation,
            x: startLocation.x - scrollOffsets.x,
            y: startLocation.y - scrollOffsets.y
        };
        this.lastLocation = this.start;

        $(document)
            .bind(this._moveEvent, this._startProxy)
            .bind(this._endEvent, this._stopProxy);
    },

    _start: function (e) {
        var currentLocation = touchLocation(e);
        this._dragged = false;

        if (Math.abs(this.start.location.x - currentLocation.x) > 10 || Math.abs(this.start.location.y - currentLocation.y) > 10) {
            
            e.preventDefault();

            this._dragged = true;

            $(document).unbind(this._moveEvent, this._startProxy)
                       .bind(this._moveEvent, this._dragProxy);

            this._width = this.wrapper.innerWidth();
            this._height = this.wrapper.innerHeight();
            this._scrollWidth = this.scrollElement.innerWidth();
            this._scrollHeight = this.scrollElement.innerHeight();

            if (this._scrollWidth > this._width) {
                this._horizontalScrollbar
                    .css(
                        this._transformProperty, 'scaleX(' + (this._width / this._scrollWidth) + ')'
                    )
                    .show()
//                    .stop()
//                    .fadeTo(200, .7);
            }

            if (this._scrollHeight > this._height) {
                this._verticalScrollbar
                    .css(
                        this._transformProperty, 'scaleY(' + (this._height / this._scrollHeight) + ')'
                    )
                    .show()
//                    .stop()
//                    .fadeTo(200, .7);
            }

        }
    },

    _drag: function (e) {
        e.preventDefault();

        var currentLocation = touchLocation(e),
            horizontalDifference = 0,
            verticalDifference = 0,
            vsCompensate = 0,
            hsCompensate = 0,
            offset = 0;

        if (this._scrollWidth > this._width) {
            horizontalDifference = currentLocation.x - this.start.x;
            offset = ~~(-horizontalDifference * 100 / (this._scrollWidth - this._width));
            hsCompensate = Math.max(-100, Math.min(100, (offset > 100 ? (offset - 100)*5 : 0) || (offset < 0 ? offset*5 : 0)));
            offset = Math.min(100, Math.max(0, offset));

            this._horizontalScrollbar
                    .css( this._transformOrigin, offset + '% 0' );
            if (hsCompensate)
                this._horizontalScrollbar
                    .css( this._transformProperty, 'scaleX(' + ((this._width - Math.abs(hsCompensate)) / this._scrollWidth) + ')' );
        }

        if (this._scrollHeight > this._height) {
            verticalDifference = currentLocation.y - this.start.y;
            offset = ~~(-verticalDifference * 100 / (this._scrollHeight - this._height));
            vsCompensate = Math.max(-100, Math.min(100, (offset > 100 ? (offset - 100)*5 : 0) || (offset < 0 ? offset*5 : 0)));
            offset = Math.min(100, Math.max(0, offset));

            this._verticalScrollbar
                    .css( this._transformOrigin, '0 ' + offset + '%' );
            if (vsCompensate)
                this._verticalScrollbar
                    .css( this._transformProperty, 'scaleY(' + ((this._height - Math.abs(vsCompensate)) / this._scrollHeight) + ')' );
        }

        this.scrollElement.css( this._transformProperty, 'translate(' + horizontalDifference + 'px,' + verticalDifference + 'px)' );

        this._storeLastLocation(currentLocation);
    },

    _stop: function (e) {
        $(document).unbind(this._moveEvent, this._startProxy)
                   .unbind(this._moveEvent, this._dragProxy)
                   .unbind(this._endEvent, this._stopProxy);

        if (this._dragged) {
            e.preventDefault();

            var currentLocation = touchLocation(e),
                scrollOffsets = this._getScrollOffsets(),
                horizontal = scrollOffsets.x + this.lastLocation.x - currentLocation.x,
                vertical = scrollOffsets.y + this.lastLocation.y - currentLocation.y;

            
            this.scrollElement
                .stop(true)
                .animate({
                        translate: horizontal + 'px,' + vertical + 'px)'
                    }, 500, 'ease-out');

//            this._scrollbars
//                .stop(true)
//                .fadeTo(400, 0);
        } else {
            if (isTouch && this._originalEvent.touches.length == 1) // Fire a click event when there's no drag...
            {
                var oEvent = this._originalEvent;
                var evt = document.createEvent("MouseEvents");
                evt.initMouseEvent("click", oEvent.bubbles, oEvent.cancelable, oEvent.view,
                                   oEvent.detail, oEvent.screenX, oEvent.screenY, oEvent.clientX, oEvent.clientY,
                                   false, false, false, false, oEvent.button, oEvent.relatedTarget);

                var clickHandler = function (e) {
                    e.stopPropagation();
                    this.removeEventListener('click', proxy, true );
                };

                var proxy = $.proxy( clickHandler, this.scrollElement[0] );

                oEvent.target.dispatchEvent(evt);
                
                this.scrollElement[0].addEventListener( 'click', proxy , true );
            }
        }

    }
};
