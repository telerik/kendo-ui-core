(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        extend = $.extend,
        proxy = $.proxy,
        Class = kendo.Class,
        Observable = kendo.Observable,
        mobile,

        //Math
        round = Math.round;


    var Widget = ui.Widget.extend(/** @lends kendo.mobile.ui.Widget.prototype */{
        /**
         * Initializes mobile widget. Sets `element` and `options` properties.
         * @constructs
         * @class Represents a mobile UI widget. Base class for all Kendo mobile widgets.
         * @extends kendo.ui.Widget
         */
        init: function(element, options) {
            var that = this,
                idx = 0,
                events = that.events,
                dataSource,
                option,
                value,
                event,
                handler;

            ui.Widget.fn.init.call(that, element, options);
            options = that.options;
            that.element.attr("data-" + kendo.ns + "widget", options.name);
            dataSource = that.element.data("source");

            for (option in options) {
                value = that.element.data(kendo.ns + option);

                if (value !== undefined) {
                    options[option] = value;
                }
            }

            for (; idx < events.length; idx ++) {
                event = events[idx];
                handler = that.element.data(kendo.ns + event);

                if (handler !== undefined) {
                    options[event] = window[handler];
                }
            }

            if (dataSource) {
                options["dataSource"] = window[dataSource];
            }

            that.bind(events, options);
        },


        options: {},
        events: [],

        viewShow: $.noop,

        viewInit: function(view) {
            this.view = view;
        },

        enhance: function(element) {
            var options = this.options,
                pluginMethod = "kendoMobile" + options.name,
                selector = kendo.roleSelector(options.name.toLowerCase());

                element.find(selector)
                       .add(element.filter(selector))[pluginMethod]();
        }
    });

    var TRANSFORM_STYLE = support.transitions.prefix + "Transform";

    if (support.hasHW3D) {
        function translate(x, y) {
            return "translate3d(" + round(x) + "px," + round(y) +"px,0)";
        }
    } else {
        function translate(x, y) {
            return "translate(" + round(x) + "px," + round(y) +"px)";
        }
    }

    var Move = Observable.extend({
        init: function(element) {
            var that = this;

            Observable.fn.init.call(that);

            that.element = $(element);
            that.domElement = that.element[0];
            that.x = 0;
            that.y = 0;
            that._saveCoordinates(translate(that.x, that.y));
        },

        translateAxis: function(axis, by) {
            this[axis] += by;
            this._redraw();
        },

        translate: function(coordinates) {
            this.x += coordinates.x;
            this.y += coordinates.y;
            this._redraw();
        },

        moveAxis: function(axis, value) {
            this[axis] = value;
            this._redraw();
        },

        moveTo: function(coordinates) {
            extend(this, coordinates);
            this._redraw();
        },

        _redraw: function() {
            var that = this,
                newCoordinates = translate(that.x, that.y);

            if (newCoordinates != that.coordinates) {
                that.domElement.style[TRANSFORM_STYLE] = newCoordinates;
                that._saveCoordinates(newCoordinates);
                that.trigger("change");
            }
        },

        _saveCoordinates: function(coordinates) {
            this.coordinates = coordinates;
        }
    });

    var Boundary = Observable.extend({
        init: function(options) {
            var that = this;
            Observable.fn.init.call(that);

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

        outOfBounds: function(offset) {
            return  offset > this.max || offset < this.min;
        },

        present: function() {
            return this.max - this.min;
        },

        update: function() {
            var that = this;

            that.size = that.container[that.measure]();
            that.total = that.element[0][that.scrollSize];
            that.min = Math.min(that.max, that.size - that.total);
            that.trigger("change", that);
        }
    });

    var ContainerBoundary = Class.extend({
        init: function(options) {
            var that = this,
                move = options.move;

            that.x = new Boundary(extend({horizontal: true}, options));
            that.y = new Boundary(extend({horizontal: false}, options));

            $(window).bind("orientationchange resize", proxy(that.refresh, that));
        },

        refresh: function() {
            this.x.update();
            this.y.update();
        }
    });

    var DraggableAxis = Observable.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Observable.fn.init.call(that);
        },

        swipeMove: function(delta) {
            var that = this,
                boundary = that.boundary,
                axis = that.axis,
                move = that.move,
                position = move[axis] + delta;

            if (!boundary.present()) {
                return;
            }

            if ((position < boundary.min && delta < 0) || (position > boundary.max && delta > 0)) {
                delta *= that.resistance;
            }

            move.translateAxis(axis, delta);
            that.trigger("change", that);
        }
    });

    var Draggable = Class.extend({
        init: function(options) {
            var that = this,
                x,
                y,
                resistance;

            extend(that, {elastic: true}, options);

            resistance = that.elastic ? 0.5 : 0;

            that.x = x = new DraggableAxis({
                axis: "x",
                boundary: that.boundary.x,
                resistance: resistance,
                move: that.move
            });

            that.y = y = new DraggableAxis({
                axis: "y",
                boundary: that.boundary.y,
                resistance: resistance,
                move: that.move
            });

            that.swipe.bind(["move", "end"], {
                move: function(e) {
                    x.swipeMove(e.x.delta);
                    y.swipeMove(e.y.delta);
                    e.preventDefault();
                },

                end: function(e) {
                    e.preventDefault();
                }
            });
        }
    });

    var TICK_INTERVAL = 10;

    var animationFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    var Animation = Class.extend({
        init: function() {
            var that = this;
            that._tickProxy = proxy(that._tick, that);
            that._started = false;
        },

        tick: $.noop,
        done: $.noop,
        onEnd: $.noop,
        onCancel: $.noop,

        start: function() {
            this._started = true;
            animationFrame(this._tickProxy);
        },

        cancel: function() {
            this._started = false;
            this.onCancel();
        },

        _tick: function() {
            var that = this;
            if (!that._started) { return; }

            that.tick();

            if (!that.done()) {
                animationFrame(that._tickProxy);
            } else {
                that._started = false;
                that.onEnd();
            }
        }
    });

    var Transition = Animation.extend({
        init: function(options) {
            var that = this;
            extend(that, options);
            Animation.fn.init.call(that);
        },

        done: function() {
            return this.timePassed() >= this.duration;
        },

        timePassed: function() {
            return Math.min(this.duration, (+new Date()) - this.startDate);
        },

        moveTo: function(options) {
            var that = this,
                move = that.move;

            that.initial = move[that.axis];
            that.delta = options.location - that.initial;

            that.duration = options.duration || 300;

            that.tick = that._easeProxy(options.ease || Ease.easeOutQuad);

            that.startDate = +new Date();
            that.start();
        },

        _easeProxy: function(ease) {
            var that = this;

            return function() {
                that.move.moveAxis(that.axis, ease(that.timePassed(), that.initial, that.delta, that.duration));
            }
        }
    });

    extend(Transition, {
        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        easeOutBack: function (t, b, c, d, s) {
            s = 1.70158;
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

        Move: Move,
        ContainerBoundary: ContainerBoundary,
        Animation: Animation,
        Transition: Transition,
        Draggable: Draggable
    });
})(jQuery);
