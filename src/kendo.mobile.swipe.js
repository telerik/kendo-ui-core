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
        start: function(location) {
            var that = this;
            that.location = location;
            that.velocity = that.delta = 0;
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
                eventMap: eventMap,
                ns: ns
            });

            element.on({
                "mousedown touchstart": proxy(that._start, that),
                "dragstart": function(e) { e.preventDefault(); }
            });

            that.bind([START, MOVE, END], options);
        },

        _start: function(e) {
            var that = this,
                originalEvent = e.originalEvent,
                touches = originalEvent && originalEvent.changedTouches,
                touch = touches && touches[0];

            if (that.pressed) { return; }

            that.pressed = true;
            this.moved = false;

            if (touch) {
                that.touchID = touch.identifier;
            }

            that._perAxis(START, touch || e);
            that.surface.on(that.eventMap);
        },

        _move: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function(location) {
                if (!that.moved) {
                    that._trigger(START, e);
                    that.moved = true;
                }

                that._perAxis(MOVE, location);
                that._trigger(MOVE, e);
            });
        },

        _end: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function() {
                that.pressed = false;
                that.surface.off(that.ns);

                if (that.moved) {
                    that._trigger(END, e);
                }
            });
        },

        _perAxis: function(method, location) {
            this.x[method](location.pageX);
            this.y[method](location.pageY);
        },

        _trigger: function(name, event) {
            if(this.trigger(name, this)) {
                event.preventDefault();
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
