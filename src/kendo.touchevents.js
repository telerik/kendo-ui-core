(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        pointers = support.pointers,
        document = window.document,
        SURFACE = $(document.documentElement),
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        Observable = kendo.Observable,
        proxy = $.proxy,
        now = $.now,
        extend = $.extend,
        OS = support.mobileOS,
        invalidZeroEvents = OS && OS.android,
        START_EVENTS = "mousedown",
        MOVE_EVENTS = "mousemove",
        END_EVENTS = "mouseup mouseleave",

        // Event namespace
        NS = ".kendoDrag",

        // Drag events
        START = "start",
        MOVE = "move",
        END = "end",
        CANCEL = "cancel",
        TAP = "tap",
        GESTURESTART = "gesturestart",
        GESTURECHANGE = "gesturechange",
        GESTUREEND = "gestureend",
        GESTURETAP = "gesturetap";

    if (support.touch) {
        START_EVENTS = "touchstart";
        MOVE_EVENTS = "touchmove";
        END_EVENTS = "touchend touchcancel";
    }

    if(pointers) {
        START_EVENTS = "MSPointerDown";
        MOVE_EVENTS = "MSPointerMove";
        END_EVENTS = "MSPointerUp MSPointerCancel";
    }

    function preventTrigger(e) {
        e.preventDefault();

        var target = $(e.target),   // Determine the correct parent to receive the event and bubble.
            parent = target.closest(".k-widget").parent();

        if (!parent[0]) {
            parent = target.parent();
        }

        parent.trigger(e.type);
    }

    var TouchAxis = Class.extend({
        init: function(axis, location) {
            var that = this;

            that.axis = axis;

            that._updateLocationData(location);

            that.startLocation = that.location;
            that.velocity = that.delta = 0;
            that.timeStamp = now();
        },

        move: function(location) {
            var that = this,
                offset = location["page" + that.axis],
                timeStamp = now();

            if (!offset && invalidZeroEvents) {
                return;
            }

            that.delta = offset - that.location;

            that._updateLocationData(location);

            that.initialDelta = offset - that.startLocation;
            that.velocity = that.delta / (timeStamp - that.timeStamp);
            that.timeStamp = timeStamp;
        },

        _updateLocationData: function(location) {
            var that = this, axis = that.axis;

            that.location = location["page" + axis];
            that.client = location["client" + axis];
            that.screen = location["screen" + axis];
        }
    });

    var Touch = Class.extend({
        init: function(drag, target, event) {
            var that = this,
                timestamp = now();

            extend(that, {
                x: new TouchAxis("X", event.location, timestamp),
                y: new TouchAxis("Y", event.location, timestamp),
                drag: drag,
                target: target,
                currentTarget: event.currentTarget,
                id: event.id,
                _moved: false,
                _finished: false
            });
        },

        dispose: function() {
            var that = this,
                drag = that.drag,
                activeTouches = drag.touches;

            that._finished = true;

            activeTouches.splice(activeTouches.indexOf(that), 1);
        },

        skip: function() {
            this.dispose();
        },

        cancel: function() {
            this.dispose();
        },

        isMoved: function() {
            return this._moved;
        },

        _start: function(e) {
           this.startTime = now();
           this._moved = true;
           this._trigger(START, e);
        },

        move: function(touch) {
            var that = this,
                e = touch.event,
                timestamp = now();

            if (that._finished) { return; }

            that.x.move(touch.location, timestamp);
            that.y.move(touch.location, timestamp);

            if (!that._moved) {
                if (that._withinIgnoreThreshold()) {
                    return;
                }

                if (!Drag.current || Drag.current === that.drag) {
                    that._start(e);
                } else {
                    return that.dispose();
                }
            }

            // Event handlers may cancel the drag in the START event handler, hence the double check for pressed.
            if (!that._finished) {
                that._trigger(MOVE, e);
            }
        },

        end: function(touch) {
            var that = this,
                e = touch.event;

            if (that._finished) { return; }

            if (that._moved) {
                that._trigger(END, e);
            } else {
                that._trigger(TAP, e);
            }

            that.dispose();
        },

        _trigger: function(name, e) {
            var that = this,
                data = {
                    touch: that,
                    x: that.x,
                    y: that.y,
                    target: that.target,
                    event: e
                };

            if(that.drag.notify(name, data)) {
                e.preventDefault();
            }
        },

        _withinIgnoreThreshold: function() {
            var xDelta = this.x.initialDelta,
                yDelta = this.y.initialDelta;

            return Math.sqrt(xDelta * xDelta + yDelta * yDelta) <= this.drag.threshold;
        }
    });

    function getTouches(e) {
        var touches = [],
            originalEvent = e.originalEvent,
            idx = 0, length,
            changedTouches,
            touch;

        if (support.touch) {
            changedTouches = originalEvent.changedTouches;
            for (length = changedTouches.length; idx < length; idx ++) {
                touch = changedTouches[idx];
                touches.push({
                    location: touch,
                    event: e,
                    target: touch.target,
                    id: touch.identifier
                });
            }
        }
        else if (support.pointers) {
            touches.push({
                location: originalEvent,
                event: e,
                target: e.target,
                id: originalEvent.pointerId

            });
        } else {
            touches.push({
                id: 1, // hardcoded ID for mouse event;
                event: e,
                target: e.target,
                location: e
            });
        }

        return touches;
    }

    var Drag = Observable.extend({
        init: function(element, options) {
            var that = this,
                filter,
                preventIfMoving,
                eventMap = {};

            options = options || {};
            filter = that.filter = options.filter;
            that.threshold = options.threshold || 0;
            that.touches = [];
            that._maxTouches = options.multiTouch ? 2 : 1;

            element = $(element);
            Observable.fn.init.call(that);

            extend(that, {
                eventMap: eventMap,
                element: element,
                surface: options.global ? SURFACE : options.surface || element,
                stopPropagation: options.stopPropagation,
                pressed: false
            });

            eventMap[MOVE_EVENTS] = function(e) { that._move(e); };
            eventMap[END_EVENTS] = function(e) { that._end(e); };

            element.on(START_EVENTS + NS, filter, proxy(that._start, that));

            that.surface.on(eventMap);

            if (pointers) {
                element.css("-ms-touch-action", "pinch-zoom double-tap-zoom");
            }

            if (!options.allowSelection) {
                var args = ["mousedown" + NS + " selectstart" + NS + " dragstart" + NS, filter, preventTrigger];

                if (filter instanceof $) {
                    args.splice(2, 0, null);
                }

                element.on.apply(element, args);
            }

            if (support.eventCapture) {
                preventIfMoving = function(e) {
                    if (that._isMoved()) {
                        e.preventDefault();
                    }
                };

                that.surface[0].addEventListener(support.mouseup, preventIfMoving, true);
            }

            that.bind([
            TAP,
            START,
            MOVE,
            END,
            CANCEL,
            GESTURESTART,
            GESTURECHANGE,
            GESTUREEND,
            GESTURETAP], options);
        },

        destroy: function() {
            this.element.off(NS);
            this.surface.off(this.eventMap);
            this._disposeAll();
        },

        capture: function() {
            Drag.current = this;
        },

        cancel: function() {
            this._disposeAll();
            this.trigger(CANCEL);
        },

        notify: function(eventName, data) {
            var that = this;

            if (this._isMultiTouch()) {
                switch(eventName) {
                    case MOVE:
                        eventName = GESTURECHANGE;
                        break;
                    case END:
                        eventName = GESTUREEND;
                        break;
                    case TAP:
                        eventName = GESTURETAP;
                        break;
                }

                data.touches = that.touches;
            }

            return this.trigger(eventName, data);
        },

        _isMultiTouch: function() {
            return this.touches.length > 1;
        },

        _maxTouchesReached: function() {

            return this.touches.length >= this._maxTouches;
        },

        _disposeAll: function() {
            $.each(this.touches, function() { this.dispose(); });
        },

        _isMoved: function() {
            return $.grep(this.touches, function(touch) { return touch.isMoved(); }).length;
        },

        _isPressed: function() {
            return this.touches.length;
        },

        _start: function(e) {
            var that = this,
                idx = 0,
                filter = that.filter,
                target,
                touches = getTouches(e),
                length = touches.length,
                touch;

            if (that._maxTouchesReached()) {
                return;
            }

            Drag.current = null;

            that.currentTarget = e.currentTarget;

            if (that.stopPropagation) {
                e.stopPropagation();
            }

            for (; idx < length; idx ++) {
                if (that._maxTouchesReached()) {
                    break;
                }

                touch = touches[idx];

                target = $(touch.target);

                if (filter) {
                    target = target.is(filter) ? target : target.closest(filter);
                } else {
                    target = that.element;
                }

                if (!target.length) {
                    continue;
                }

                that.touches.push(new Touch(that, target, touch));

                if (that._isMultiTouch()) {
                    that.notify("gesturestart", {});
                }
            }
        },

        _move: function(e) {
            this._eachTouch("move", e);
        },

        _end: function(e) {
            this._eachTouch("end", e);
        },

        _eachTouch: function(methodName, e) {
            var that = this,
                dict = {},
                touches = getTouches(e),
                activeTouches = that.touches,
                idx,
                touch,
                matchingTouch;

            for (idx = 0; idx < activeTouches.length; idx ++) {
                touch = activeTouches[idx];
                dict[touch.id] = touch;
            }

            for (idx = 0; idx < touches.length; idx ++) {
                touch = touches[idx];
                matchingTouch = dict[touch.id];

                if (matchingTouch) {
                    matchingTouch[methodName](touch);
                }
            }
        }
    });

    kendo.Drag = Drag;
 })(jQuery);
