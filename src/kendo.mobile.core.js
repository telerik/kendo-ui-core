(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        proxy = $.proxy,
        Observable = kendo.Observable,
        mobile;

    var Widget = ui.Widget.extend(/** @lends kendo.mobile.ui.Widget.prototype */{
        /**
         * Initializes mobile widget. Sets `element` and `options` properties.
         * @constructs
         * @class Represents a mobile UI widget. Base class for all Kendo mobile widgets.
         * @extends kendo.ui.Widget
         */
        init: function(element, options) {
            var that = this,
                option,
                value;

            ui.Widget.fn.init.call(that, element, options);

            for (option in that.options) {
                value = that.element.data(kendo.ns + option);

                if (value !== undefined) {
                    that.options[option] = value;
                }
            }
        },

        options: {},

        viewShow: $.noop,

        enhance: function(element) {
            var options = this.options,
                pluginMethod = "kendoMobile" + options.name,
                selector = kendo.roleSelector(options.name.toLowerCase());

                element.find(selector)
                       .add(element.filter(selector))
                       .attr("data-" + kendo.ns + "widget", options.name)[pluginMethod]();
        }
    });

    // Mobile Swipe
    var SwipeAxis = kendo.Class.extend({
        init: function(horizontal) {
            var that = this;

            if (horizontal) {
                that.size = "width";
                that.axis = "x";
            } else {
                that.size = "height";
                that.axis = "y";
            }
        },

        start: function(location) {
            var that = this;
            that.location = location;
        },

        move: function(location) {
            var that = this,
                direction;

            that.delta = location - that.location;
            direction = that.delta > 0;

            if (that.direction != direction) {
                that._resetDirection();
                that.direction = direction;
            }

            that.location = location;
        },

        end: function(location) {
            var that = this,
                timePassed = (+new Date()) -that.startTime;

            // console.log(location + "-" + that.startLocation + "/" + timePassed);

            that.velocity = (location - that.startLocation) / timePassed;
            that.move(location);
            delete that.direction;
        },

        _resetDirection: function() {
            var that = this;
            that.startTime = +new Date();
            that.startLocation = that.location;
        }
    });

    var START = "start",
        MOVE = "move",
        END = "end",
        SURFACE = $(document.documentElement);

    var Swipe = Observable.extend({
        init: function(element, options) {
            var that = this,
                eventMap = {},
                ns = "." + kendo.guid();

            options = options || {};

            element = $(element);
            Observable.fn.init.call(that);

            var eventMap = {};

            eventMap["mousemove" + ns] = proxy(that._mouseMove, that);
            eventMap["mouseup" + ns + " mouseleave" + ns] = proxy(that._mouseUp, that);
            eventMap["touchmove" + ns] = proxy(that._touchMove, that);
            eventMap["touchend" + ns] = proxy(that._touchEnd, that);

            extend(that, {
                x: new SwipeAxis(true),
                y: new SwipeAxis(false),
                element: element,
                surface: options.global ? SURFACE : element,
                pressed: false,
                eventMap: eventMap,
                ns: ns
            });

            element.on({
                "mousedown": proxy(that._mouseDown, that),
                "touchstart": proxy(that._touchStart, that)
            });

            that.bind([START, MOVE, END], options);
        },

        _mouseDown: function(e) {
            var that = this;

            e.preventDefault();

            that.surface.on(that.eventMap);

            that._perAxis(START, e);
        },

        _touchStart: function(e) {
            var that = this,
                originalEvent,
                touch;

            if (that.pressed) { return; }
            that.pressed = true;

            originalEvent = e.originalEvent;
            touch = originalEvent.changedTouches[0];

            that.touchID = touch.identifier;

            that.surface.on(that.eventMap);

            that._perAxis(START, touch);
        },

        _touchMove: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withTouchEvent(e, function(touch) {
                e.preventDefault();
                that._perAxis(MOVE, touch);
            });
        },

        _mouseMove: function(e) {
            var that = this;

            e.preventDefault(e);
            that._perAxis(MOVE, e);
        },

        _touchEnd: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withTouchEvent(e, function(touch) {
                that.pressed = false;

                that.surface.off(that.ns);

                that._perAxis(END, touch);
            });
        },

        _mouseUp: function(e) {
            var that = this;

            that.surface.off(that.ns);

            that._perAxis(END, e);
        },

        _perAxis: function(method, e) {
            var that = this;

            that.x[method](e.pageX);
            that.y[method](e.pageY);
            return that.trigger(method, that);
        },

        _withTouchEvent: function(e, callback) {
            var that = this,
            touches = e.originalEvent.changedTouches,
            idx = touches.length;

            while (idx) {
                idx --;
                if (touches[idx].identifier === that.touchID) {
                    return callback(touches[idx]);
                }
            }
        }
    });

    var TRANSFORM_STYLE = kendo.support.transitions.prefix + "Transform";
    var Move = kendo.Class.extend({
        init: function(element) {
            var that = this;
            that.element = $(element);
            that.domElement = that.element[0];
            that.x = 0;
            that.y = 0;
        },

        moveBy: function(x, y) {
            var that = this;
            if (x) { that.x += x; }
            if (y) { that.y += y; }
            that._redraw();
        },

        moveTo: function(x, y) {
            this.x = x;
            this.y = y;
            this._redraw();
        },

        _redraw: function() {
            var that = this, translate;
            if (support.hasHW3D) {
                translate = "translate3d(" + that.x + "px," + that.y +"px,0)";
            } else {
                translate = "translate(" + that.x + "px," + that.y +"px)";
            }
            that.domElement.style[TRANSFORM_STYLE] = translate;
        }
    });

    var draggableHandler = function(axis) {
        return function(e) {
            var that = this,
                move = that.move,
                capitalAxis = axis.toUpperCase(),
                min = that["min" + capitalAxis],
                max = that["max" + capitalAxis],
                resistance = that.resistance,
                delta = min === max ? 0 : e.delta,
                position = move[axis] + delta;

            if (position > max || position < min) { delta *= resistance; }
            that["delta" + capitalAxis] = delta;
        }
    }

    var Draggable = kendo.Class.extend({
        init: function(options) {
            var that = this;

            extend(that, { maxX: 0, maxY: 0, elastic: true }, options);

            that.resistance = that.elastic ? 0.5 : 0;

            that.swipe.bind("move", proxy(that._move, that));
        },

        xHandler: draggableHandler("x"),
        yHandler: draggableHandler("y"),

        _move: function(e) {
            var that = this;
            that.xHandler(e.x);
            that.yHandler(e.y);
            that.move.moveBy(that.deltaX, that.deltaY);
        }
    });

    /**
     * @name kendo.mobile
     * @namespace This object contains all code introduced by the Kendo mobile suite, plus helper functions that are used across all mobile widgets.
     */
    extend(kendo.mobile, {
        enhance: function(element) {
            var widget, prototype, ui = kendo.mobile.ui;

            element = $(element);

            for (widget in ui) {
                widget = ui[widget];
                prototype = widget.prototype;

                if (prototype.enhance && prototype.options.name) {
                    prototype.enhance(element);
                }
            }
        },

        /**
         * @name kendo.mobile.ui
         * @namespace Contains all classes for the Kendo Mobile UI widgets.
         */
        ui: {
            plugin: function(widget) {
                kendo.ui.plugin(widget, kendo.mobile.ui, "Mobile");
            },

            Widget: Widget
        },

        Swipe: Swipe,
        Move: Move,
        Draggable: Draggable
    });
})(jQuery);
