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
        END = "end";

    var Swipe = Observable.extend({
        init: function(element, options) {
            var that = this,
            options = options || {};

            that.x = new SwipeAxis(true);
            that.y = new SwipeAxis(false);

            Observable.fn.init.call(that);
            element.bind("mousedown", proxy(that._mouseDown, that));
            element.bind("mousemove", proxy(that._mouseMove, that));
            element.bind("mouseup mouseleave", proxy(that._mouseUp, that));
            element.bind("touchstart", proxy(that._touchStart, that));
            element.bind("touchmove", proxy(that._touchMove, that));
            element.bind("touchend", proxy(that._touchEnd, that));

            that.bind([START, MOVE, END], options);
        },

        _mouseDown: function(e) {
            var that = this;

            if (!that.pressed) {
                e.preventDefault();
                that.pressed = true;
                that._perAxis(START, e);
            }
        },

        _touchStart: function(e) {
            var that = this;

            if (!that.pressed) {
                var originalEvent = e.originalEvent;
                touch = originalEvent.changedTouches[0];
                that.touchID = touch.identifier;
                that.pressed = true;
                that._perAxis(START, touch);
            }
        },

        _touchMove: function(e) {
            var that = this;

            if (that.pressed) {
                that._withTouchEvent(e, function(touch) {
                    e.preventDefault();
                    that._perAxis(MOVE, touch);
                });
            }
        },

        _touchEnd: function(e) {
            var that = this;

            that._withTouchEvent(e, function(touch) {
                that._mouseUp(touch);
            });
        },

        _mouseMove: function(e) {
            var that = this;

            if (that.pressed) {
                e.preventDefault(e);
                that._perAxis(MOVE, e);
            }
        },

        _mouseUp: function(e) {
            var that = this;
            if (that.pressed) {
                that.pressed = false;
                that._perAxis(END, e);
            }
        },

        _perAxis: function(method, e) {
            var that = this;

            that.x[method](e.pageX);
            that.y[method](e.pageY);
            that.trigger(method, that);
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
            var that = this;
            that.x = x;
            that.y = y;
            that._redraw();
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

    var Draggable = kendo.Class.extend({
        init: function(options) {
            var that = this;

            that.options = options;

            options.swipe.bind("move", proxy(that._move, that));
        },

        _move: function(e) {
            var that = this,
                options = that.options,
                move = options.move,
                deltaX = options.ignoreX ? 0 : e.x.delta,
                deltaY = options.ignoreY ? 0 : e.y.delta,
                x = move.x + deltaX,
                y = move.y + deltaY;

            if (x > 0 || x < options.minX) { deltaX *= 0.5; }
            if (y > 0 || y < options.minY) { deltaY *= 0.5; }
            move.moveBy(deltaX, deltaY);
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
