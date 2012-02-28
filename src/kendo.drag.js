(function($, undefined) {
    var Class = kendo.Class,
        Observable = kendo.Observable,
        extend = $.extend,
        proxy = $.proxy,
        START = "start",
        MOVE = "move",
        END = "end",
        TAP = "tap",
        SURFACE = $(document.documentElement);

        if (kendo.support.touch) {
            var START_EVENTS = "touchstart",
                MOVE_EVENTS = "touchmove",
                END_EVENTS = "touchend touchcancel";
        } else {
            var START_EVENTS = "mousedown",
                MOVE_EVENTS = "mousemove",
                END_EVENTS = "mouseup mouseleave";
        }

    var DragAxis = Class.extend({
        start: function(location, timeStamp) {
            var that = this;
            that.location = location;
            that.velocity = that.delta = 0;
            that.timeStamp = timeStamp;
        },

        move: function(location, timeStamp) {
            if (!location) {
                return;
            }

            var that = this;
            that.delta = location - that.location;
            that.velocity = that.delta / (timeStamp - that.timeStamp);
            that.location = location;
            that.timeStamp = timeStamp;
        }
    });

    function addNS(events, ns) {
        return events.replace(/ /g, ns + " ");
    }

    var Drag = Observable.extend({
        init: function(element, options) {
            var that = this,
                eventMap = {},
                ns = "." + kendo.guid();

            options = options || {};

            element = $(element);
            Observable.fn.init.call(that);

            var eventMap = {};

            eventMap[addNS(MOVE_EVENTS, ns)] = proxy(that._move, that);
            eventMap[addNS(END_EVENTS, ns)] = proxy(that._end, that);

            extend(that, {
                x: new DragAxis(),
                y: new DragAxis(),
                element: element,
                surface: options.global ? SURFACE : element,
                pressed: false,
                eventMap: eventMap,
                ns: ns
            });

            element.on(START_EVENTS, proxy(that._start, that))
                .on("dragstart", function(e) { e.preventDefault(); });

            that.bind([TAP, START, MOVE, END], options);
        },

        capture: function() {
            Drag.captured = true;
        },

        cancel: function() {
            this.pressed = false;
            this.surface.off(this.ns);
        },

        _start: function(e) {
            var that = this,
                originalEvent = e.originalEvent,
                touches = originalEvent && originalEvent.changedTouches,
                touch = touches && touches[0];

            if (that.pressed) { return; }

            that.pressed = true;
            that.moved = false;

            if (touch) {
                that.touchID = touch.identifier;
            }

            that._perAxis(START, touch || e, e.timeStamp);
            that.surface.off(that.eventMap).on(that.eventMap);
            Drag.captured = false;
        },

        _move: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function(location) {

                that._perAxis(MOVE, location, e.timeStamp);

                if (!that.x.delta && !that.y.delta) {
                    return;
                }

                if (!that.moved) {
                    if (!Drag.captured) {
                        that._trigger(START, e);
                        that.moved = true;
                    } else {
                        return that.cancel();
                    }
                }

                // Event handlers may cancel the swipe in the START event handler, hence the double check for pressed.
                if (that.pressed) {
                    that._trigger(MOVE, e);
                }
            });
        },

        _end: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withEvent(e, function() {
                that.cancel();

                if (that.moved) {
                    that._trigger(END, e);
                } else {
                    that._trigger(TAP, e);
                }
            });
        },

        _perAxis: function(method, location, timeStamp) {
            this.x[method](location.pageX, timeStamp);
            this.y[method](location.pageY, timeStamp);
        },

        _trigger: function(name, event) {
            if(this.trigger(name, this)) {
                event.preventDefault();
            }
        },

        _withEvent: function(e, callback) {
            var that = this,
                originalEvent = e.originalEvent,
                which = e.which,
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

    var Tap = Observable.extend({
        init: function(element, options) {
            var that = this;

            that.capture = false;
            element.on(START_EVENTS, proxy(that._press, that));
            element.on(END_EVENTS, proxy(that._release, that));
            Observable.fn.init.call(that);

            that.bind(["press", "release"], options || {});
        },

        _press: function(e) {
            var that = this;
            that.trigger("press");
            if (that.capture) {
                e.preventDefault();
                e.originalEvent && e.originalEvent.preventDefault();
            }
        },

        _release: function(e) {
            var that = this;
            that.trigger("release");

            if (that.capture) {
                e.preventDefault();
                e.originalEvent && e.originalEvent.preventDefault();
                that.cancelCapture();
            }
        },

        captureNext: function() {
            this.capture = true;
        },

        cancelCapture: function() {
            this.capture = false;
        }
    });

    kendo.Drag = Drag;
    kendo.Tap = Tap;
})(jQuery);
