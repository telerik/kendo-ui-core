(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        proxy = $.proxy,
        Class = kendo.Class,
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

    var SwipeAxis = Class.extend({
        start: function(location) {
            var that = this;
            that.location = location;
        },

        move: function(location) {
            var that = this;

            that.velocity = that.delta = location - that.location;
            that.location = location;
        },

        end: $.noop
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
            eventMap["touchend" + ns + " touchcancel" + ns] = proxy(that._touchEnd, that);

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

            that._perAxis(START, touch, e);
        },

        _touchMove: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withTouchEvent(e, function(touch) {
                that._perAxis(MOVE, touch, e);
            });
        },

        _mouseMove: function(e) {
            this._perAxis(MOVE, e);
        },

        _touchEnd: function(e) {
            var that = this;

            if (!that.pressed) { return; }

            that._withTouchEvent(e, function(touch) {
                that.pressed = false;
                that.surface.off(that.ns);
                that._perAxis(END, touch, e);
            });
        },

        _mouseUp: function(e) {
            this.surface.off(this.ns);
            this._perAxis(END, e);
        },

        _perAxis: function(method, location, event) {
            var that = this;

            event = event || location;

            that.x[method](location.pageX);
            that.y[method](location.pageY);

            if(that.trigger(method, that)) {
                event.preventDefault();
            }
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

    var Move = Class.extend({
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

    var Boundary = kendo.Class.extend({
        init: function(options) {
            var that = this;

            $.extend(that, options);

            that.max = 0;

            if (that.horizontal) {
                that.measure = "width";
                that.scrollSize = "scrollWidth";
                that.axis = "x";
            } else {
                that.measure = "height";
                that.scrollSize = "scrollHeight";
                that.axis = "y";
            }
        },

        outOfBounds: function() {
            var that = this,
                offset = that.move[that.axis];

            return  offset > that.max || offset < that.min;
        },

        update: function() {
            var that = this,
                element = that.element,
                measure = that.measure;

            that.size = element[that.measure]();
            that.total = element[0][that.scrollSize];
            that.min = that.size - that.total;
        }
    });

    var ContainerBoundary = kendo.Observable.extend({
        init: function(element, options) {
            var that = this,
                move = options.move;

            kendo.Observable.fn.init.call(that);

            that.x = new Boundary({horizontal: true, element: element, move: move});
            that.y = new Boundary({horizontal: false, element: element, move: move});

            $(window).bind("orientationchange resize", proxy(that.refresh, that));

            that.bind(["change"], options);
        },

        refresh: function() {
            this.x.update();
            this.y.update();
            this.trigger("change");
        }
    });

    function draggableHandler(axis) {
        return function(e) {
            var that = this,
                boundary = that.boundary[axis];
                delta = e[axis].delta,
                position = that.move[axis] + delta;

            if (position > boundary.max || position < boundary.min) { delta *= that.resistance; }
            that["delta" + axis] = delta;
        }
    }

    function and(funcA, funcB) {
        return function() {
            funcA.apply(this, arguments);
            funcB.apply(this, arguments);
        }
    }

    var Draggable = Class.extend({
        init: function(options) {
            var that = this;

            extend(that, { elastic: true, deltax: 0, deltay: 0 }, options);
            that.resistance = that.elastic ? 0.5 : 0;

            that.boundary.bind("change", proxy(that.update, that));

            that.swipe.bind([START, MOVE, END], {
                start: function() {
                    that.moved = false;
                },

                move: function(e) {
                    that.moved = true;
                    that._move(e);
                    e.preventDefault();
                },

                end: function(e) {
                    if (that.moved) {
                        e.preventDefault();
                    }
                }
            });
        },

        update: function(options) {
            var that = this,
                boundary = that.boundary;

            var move = that._apply;

            if (boundary.x.min != boundary.x.max) {
                move = and(draggableHandler("x"), move);
            }

            if (boundary.y.min != boundary.y.max) {
                move = and(draggableHandler("y"), move);
            }

            that._move = move;
        },

        _apply: function() {
            this.move.moveBy(this.deltax, this.deltay);
        }
    });


    var TICK_INTERVAL = 10;

    var Transition = Class.extend({
        init: function(move, callback) {
            var that = this;
            that.move = move;
            that.timer = 0;
            that.tickProxy = proxy(that._tick, that);
            that.callback = callback;
        },

        stop: function() {
            clearInterval(this.intervalID);
            this.timer = 0;
        },

        moveTo: function(options) {
            var that = this,
                move = that.move;

            that.initialX = move.x;
            that.initialY = move.y;

            that.deltaX = options.x - that.initialX;
            that.deltaY = options.y - that.initialY;

            that.duration = options.duration || 300;

            that.ease = that._easeProxy(options.ease || Ease.easeOutQuad);

            that._start();
        },

        _easeProxy: function(ease) {
            var that = this;
            return function() {
                that.move.moveTo(
                    ease(that.timer, that.initialX, that.deltaX, that.duration),
                    ease(that.timer, that.initialY, that.deltaY, that.duration)
                );
            }
        },

        _start: function() {
            this.intervalID = setInterval(this.tickProxy, TICK_INTERVAL);
        },

        _tick: function() {
            var that = this;
            that.timer += TICK_INTERVAL;
            that.ease();

            if (that.timer === that.duration) {
                that.stop();
                that.callback();
            }
        }
    });

    extend(Transition, {
        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        easeOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
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
        ContainerBoundary: ContainerBoundary,
        Transition: Transition,
        Draggable: Draggable
    });
})(jQuery);
