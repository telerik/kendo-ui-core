(function ($, undefined) {
    var kendo = window.kendo,
        document = window.document,
        SURFACE = $(document.documentElement),
        Class = kendo.Class,
        Widget = kendo.ui.Widget,
        Observable = kendo.Observable,
        proxy = $.proxy,
        extend = $.extend,
        getOffset = kendo.getOffset,
        draggables = {},
        dropTargets = {},
        lastDropTarget,
        START_EVENTS = "mousedown",
        MOVE_EVENTS = "mousemove",
        END_EVENTS = "mouseup mouseleave";
        KEYDOWN = "keydown",

        // Draggable events
        DRAGSTART = "dragstart",
        DRAG = "drag",
        DRAGEND = "dragend",

        // DropTarget events
        DRAGENTER = "dragenter",
        DRAGLEAVE = "dragleave",
        DROP = "drop",

        // Drag events
        START = "start",
        MOVE = "move",
        END = "end",
        TAP = "tap";

    if (kendo.support.touch) {
        START_EVENTS = "touchstart";
        MOVE_EVENTS = "touchmove";
        END_EVENTS = "touchend touchcancel";
    }

    function contains(parent, child) {
        try {
            return $.contains(parent, child) || parent == child;
        } catch (e) {
            return false;
        }
    }


    function elementUnderCursor(e) {
        return document.elementFromPoint(e.x.client, e.y.client);
    }

    function addNS(events, ns) {
        return events.replace(/ /g, ns + " ");
    }

    var DragAxis = Class.extend({
        init: function(axis) {
            this.axis = axis;
        },

        start: function(location, timeStamp) {
            var that = this,
                offset = location["page" + that.axis];

            that.startLocation = that.location = offset;
            that.client = location["client" + that.axis];
            that.velocity = that.delta = 0;
            that.timeStamp = timeStamp;
        },

        move: function(location, timeStamp) {
            var that = this,
                offset = location["page" + that.axis];

            if (!offset) {
                return;
            }

            that.delta = offset - that.location;
            that.location = offset;
            that.client = location["client" + that.axis];
            that.initialDelta = offset - that.startLocation;
            that.velocity = that.delta / (timeStamp - that.timeStamp);
            that.location = location;
            that.timeStamp = timeStamp;
        }
    });

    function preventDefault(e) {
        e.preventDefault();
    }

    var Drag = Observable.extend({
        init: function(element, options) {
            var that = this,
                eventMap = {},
                ns = "." + kendo.guid();

            options = options || {};
            that.filter = options.filter;
            that.threshold = options.threshold || 0;

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

            element
                .on(START_EVENTS, options.filter, proxy(that._start, that))
                .on("mousedown dragstart selectstart", that.filter, preventDefault);

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
                filter = that.filter,
                originalEvent = e.originalEvent,
                touches = originalEvent && originalEvent.changedTouches,
                touch = touches && touches[0];

            if (that.pressed) { return; }

            if (filter) {
                that.target = $(e.target).is(filter) ? $(e.target) : $(e.target).closest(filter);
            } else {
                that.target = that.element;
            }

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
            var that = this,
                xDelta,
                yDelta,
                delta;

            if (!that.pressed) { return; }

            that._withEvent(e, function(location) {

                that._perAxis(MOVE, location, e.timeStamp);

                if (!that.moved) {
                    xDelta = that.x.initialDelta;
                    yDelta = that.y.initialDelta;

                    delta = Math.sqrt(xDelta * xDelta + yDelta * yDelta);

                    if (delta <= that.threshold) {
                        return;
                    }

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
            this.x[method](location, timeStamp);
            this.y[method](location, timeStamp);
        },

        _trigger: function(name, e) {
            var data = {
                x: this.x,
                y: this.y,
                event: e
            };

            if(this.trigger(name, data)) {
                e.preventDefault();
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

    var DropTarget = Widget.extend(/** @lends kendo.ui.DropTarget.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {String} [group] <"default"> Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.
         */
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            var group = that.options.group;

            if (!(group in dropTargets)) {
                dropTargets[group] = [ that ];
            } else {
                dropTargets[group].push( that );
            }
        },

        events: [
            /**
             * Fires when draggable moves over the drop target.
             * @name kendo.ui.DropTarget#dragenter
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that enters the drop target.
             */
            DRAGENTER,
            /**
             * Fires when draggable moves out of the drop target.
             * @name kendo.ui.DropTarget#dragleave
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that leaves the drop target.
             */
            DRAGLEAVE,
            /**
             * Fires when draggable is dropped over the drop target.
             * @name kendo.ui.DropTarget#drop
             * @event
             * @param {Event} e
             * @param {jQueryObject} e.draggable Reference to the draggable that is dropped over the drop target.
             * @param {jQueryObject} e.draggable.currentTarget The element that the drag and drop operation started from.
             */
            DROP
        ],

        options: {
            name: "DropTarget",
            group: "default"
        },

        _trigger: function(eventName, e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                return that.trigger(eventName, extend({}, e.event, {
                           draggable: draggable
                       }));
            }
        },

        _over: function(e) {
            this._trigger(DRAGENTER, e);
        },

        _out: function(e) {
            this._trigger(DRAGLEAVE, e);
        },

        _drop: function(e) {
            var that = this,
                draggable = draggables[that.options.group];

            if (draggable) {
                draggable.dropped = !that._trigger(DROP, e);
            }
        }
    });

    /**
     * @name kendo.ui.Draggable.Description
     *
     * @section Enable draggable functionality on any DOM element.
     *
     * @exampleTitle <b>Draggable</b> initialization
     * @example
     * var draggable = $("#draggable").kendoDraggable();
     *
     * @name kendo.ui.DropTarget.Description
     *
     * @section Enable any DOM element to be a target for draggable elements.
     *
     * @exampleTitle <b>DropTarget</b> initialization
     * @example
     * var dropTarget = $("#dropTarget").kendoDropTarget();
     */
    var Draggable = Widget.extend(/** @lends kendo.ui.Draggable.prototype */{
        /**
         * @constructs
         * @extends kendo.ui.Widget
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {Integer} [distance] <5> The required distance that the mouse should travel in order to initiate a drag.
         * @option {Selector} [filter] Selects child elements that are draggable if a widget is attached to a container.
         * @option {String} [group] <"default"> Used to group sets of draggable and drop targets. A draggable with the same group value as a drop target will be accepted by the drop target.
         * @option {Function|jQueryObject} [hint] Provides a way for customization of the drag indicator. If a function is supplied, it receives one argument - the draggable element's jQuery object.
         * _example
         *  //hint as a function
         *  $("#draggable").kendoDraggable({
         *      hint: function(element) {
         *          return $("#draggable").clone();
         *          // same as
         *          //  return element.clone();
         *      }
         *  });
         *
         * //hint as jQuery object
         *  $("#draggable").kendoDraggable({
         *      hint: $("#draggableHint");
         *  });
         */
        init: function (element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that.drag = new Drag(that.element, {
                global: true,
                filter: that.options.filter,
                threshold: that.options.distance,
                start: proxy(that._start, that),
                move: proxy(that._drag, that),
                end: proxy(that._end, that)
            });
        },

        events: [
            /**
             * Fires when item drag starts.
             * @name kendo.ui.Draggable#dragstart
             * @event
             * @param {Event} e
             */
            DRAGSTART,
             /**
             * Fires while dragging.
             * @name kendo.ui.Draggable#drag
             * @event
             * @param {Event} e
             */
            DRAG,
             /**
             * Fires when item drag ends.
             * @name kendo.ui.Draggable#dragend
             * @event
             * @param {Event} e
             */
            DRAGEND
        ],

        options: {
            name: "Draggable",
            distance: 5,
            group: "default",
            cursorOffset: null,
            dropped: false
        },

        _start: function(e) {
            var that = this,
                options = that.options,
                hint = options.hint;

            that.currentTarget = that.drag.target;
            if (hint) {
                that.hint = $.isFunction(hint) ? $(hint(that.currentTarget)) : hint;

                var offset = getOffset(that.currentTarget);
                that.hintOffset = offset;
                that.hint.css( {
                    position: "absolute",
                    zIndex: 10010, //the Window's z-index is 10000
                    left: offset.x,
                    top: offset.y
                })
                .appendTo(document.body);
            }

            draggables[options.group] = that;

            that.dropped = false;

            if (that._trigger(DRAGSTART, e)) {
                that.drag.cancel();
                that._destroy(e);
            }
        },

        updateHint: function(e) {
            var that = this,
                coordinates,
                offset = that.initialOffset,
                cursorOffset = that.options.cursorOffset;

            if (cursorOffset) {
               coordinates = { left: e.x.location + cursorOffset.left, top: e.y.location + cursorOffset.top };
            } else {
               that.hintOffset.left += e.x.delta;
               that.hintOffset.top += e.y.delta;
               coordinates = that.hintOffset;
            }

            that.hint.css(coordinates);
        },

        _drag: function(e) {
            var that = this,
                cursorOffset = that.options.cursorOffset;

            e.preventDefault();

            that._withDropTarget(e, function(target) {
                if (!target) {
                    if (lastDropTarget) {
                        lastDropTarget._trigger(DRAGLEAVE, e);
                        lastDropTarget = null;
                    }
                    return;
                }

                if (lastDropTarget) {
                    if (target.element[0] === lastDropTarget.element[0]) {
                        return;
                    }

                    lastDropTarget._trigger(DRAGLEAVE, e);
                }

                target._trigger(DRAGENTER, e);
                lastDropTarget = target;
            });

            that._trigger(DRAG, e);

            if (that.hint) {
                that.updateHint(e);
            }
        },

        _end: function(e) {
            var that = this,
                destroy = proxy(that._destroy, that),
                offset = getOffset(that.currentTarget);

            that._withDropTarget(e, function(target) {
                if (target) {
                    target._drop(e);
                    lastDropTarget = null;
                }
            });

            that._trigger(DRAGEND, e);

            if (that.hint && !that.dropped) {
                that.hint.animate(offset, "fast", destroy);
            } else {
                destroy();
            }
        },

        _trigger: function(eventName, e) {
            var that = this;

            return that.trigger(eventName, extend({}, e.event, {
                currentTarget: that.currentTarget
            }));
        },

        _withDropTarget: function(e, callback) {
            var that = this,
                target,
                result,
                options = that.options,
                targets = dropTargets[options.group];

            if (targets && targets.length) {
                target = elementUnderCursor(e);

                if (that.hint && contains(that.hint, target)) {
                    that.hint.hide();
                    target = elementUnderCursor(e);
                    that.hint.show();
                }

                $.each(targets, function() {
                    var that = this,
                        element = that.element[0];

                    if (contains(element, target)) {
                        result = that;
                        return false;
                    }
                });

                callback(result);
            }
        },

        _destroy: function(e) {
            var that = this;

            if (that.hint) {
                that.hint.remove();
            }

            delete draggables[that.options.group];

            that.trigger("destroy");
        }
    });

    kendo.ui.plugin(DropTarget);
    kendo.ui.plugin(Draggable);
    kendo.Drag = Drag;
    kendo.Tap = Tap;
 })(jQuery);
