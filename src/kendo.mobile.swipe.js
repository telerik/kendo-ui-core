(function($, undefined) {
    var Class = kendo.Class,
        Observable = kendo.Observable,
        extend = $.extend,
        proxy = $.proxy,
        START = "start",
        MOVE = "move",
        END = "end",
        SURFACE = $(document.documentElement);

    var SwipeAxis = Class.extend({
        velocity: 0,

        start: function(location) {
            this.location = location;
        },

        move: function(location) {
            var that = this;

            that.velocity = that.delta = location - that.location;
            that.location = location;
        }
    });

    function addNS(events, ns) {
        return events.replace(/ /g, ns + " ");
    }

    var Swipe = Observable.extend({
        init: function(element, options) {
            var that = this,
                eventMap = {},
                ns = "." + kendo.guid();

            options = options || {};

            element = $(element);
            Observable.fn.init.call(that);

            var eventMap = {};

            eventMap[addNS("mousemove touchmove", ns)] = proxy(that._move, that);
            eventMap[addNS("mouseup mouseleave touchend touchcancel", ns)] = proxy(that._end, that);

            extend(that, {
                x: new SwipeAxis(),
                y: new SwipeAxis(),
                element: element,
                surface: options.global ? SURFACE : element,
                pressed: false,
                nextCaptured: false,
                eventMap: eventMap,
                ns: ns
            });

            element.on({
                "mousedown touchstart": proxy(that._start, that),
                "dragstart": function(e) { e.preventDefault(); }
            });

            that.bind([START, MOVE, END], options);
        },

        captureNext: function() {
            this.nextCaptured = true;
        },

        cancelCapture: function() {
            this.nextCaptured = false;
        },

        _start: function(e) {
            var that = this,
                originalEvent = e.originalEvent,
                touches = originalEvent && originalEvent.changedTouches,
                touch = touches && touches[0];

            if (that.pressed) { return; }
            that.pressed = true;

            if (touch) {
                that.touchID = touch.identifier;
            }

            that.surface.on(that.eventMap);

            that._perAxis(START, e, touch);
        },

        _move: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function(location) {
                that._perAxis(MOVE, e, location);
            });
        },

        _end: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function() {
                that.pressed = false;
                that.surface.off(that.ns);
                that._trigger(END, e);
                that.nextCaptured = false;
            });
        },

        _perAxis: function(method, event, location) {
            var that = this;

            location = location || event;

            that.x[method](location.pageX);
            that.y[method](location.pageY);
            that._trigger(method, event);
        },

        _trigger: function(name, event) {
            if(this.trigger(name, this) || this.nextCaptured) {
                event.preventDefault();
            }

            if (this.nextCaptured && event.originalEvent) {
                event.originalEvent.preventDefault();
            }
        },

        _withEvent: function(e, callback) {
            var that = this,
                originalEvent = e.originalEvent,
                touches = originalEvent && originalEvent.changedTouches,
                idx = touches && touches.length;

            if (!touches) {
                return callback(e);
            }

            while (idx) {
                idx --;
                if (touches[idx].identifier === that.touchID) {
                    return callback(touches[idx]);
                }
            }
        }
    });

    kendo.mobile.Swipe = Swipe;
})(jQuery);
