(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        extend = $.extend,
        Widget = ui.Widget,
        Class = kendo.Class,
        Move = mobile.Move,
        Transition = mobile.Transition,
        Animation = mobile.Animation,
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.95,
        OUT_OF_BOUNDS_FRICTION = 0.83,
        CHANGE = "change";

    var DragInertia = Animation.extend({
        init: function(options) {
            var that = this;

            Animation.fn.init.call(that);

            extend(that, options, {
                transition: new Transition({
                    axis: options.axis,
                    move: options.move,
                    onEnd: function() { that._end(); }
                })
            });

            that.swipe.bind("start", proxy(that.cancel, that));
            that.swipe.bind("end", proxy(that.start, that));
        },

        onCancel: function() {
            this.transition.cancel();
        },

        onEnd: function() {
            var that = this;
            if (that._outOfBounds()) {
                that._snapBack();
            } else {
                that._end();
            }
        },

        done: function() {
            return Math.abs(this.velocity) < 1;
        },

        start: function() {
            var that = this;

            if (!that.boundary.present()) { return; }

            if (that._outOfBounds()) {
                that._snapBack();
            } else {
                that.velocity = that.swipe[that.axis].velocity;
                if (that.velocity) {
                    setTimeout(function() { that.swipe.captureNext(); });
                    Animation.fn.start.call(that);
                }
            }
        },

        tick: function() {
            var that = this,
                friction = that._outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            that.move.translateAxis(that.axis, that.velocity *= friction);
        },

        _end: function() {
            this.swipe.cancelCapture();
            this.end();
        },

        _outOfBounds: function() {
            return this.boundary.outOfBounds(this.move[this.axis]);
        },

        _snapBack: function() {
            var that = this,
                boundary = that.boundary,
                snapBack = that.move[that.axis] > boundary.max ? boundary.max : boundary.min;

            that.transition.moveTo({ location: snapBack, duration: 500, ease: Transition.easeOutExpo });
        }
    });

    var ScrollBar = Class.extend({
        init: function(options) {
            var that = this,
                horizontal = options.axis === "x",
                element = $('<div class="km-touch-scrollbar km-' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />');

            extend(that, options, {
                element: element,
                elementSize: 0,
                move: new Move(element),
                scrollMove: options.move,
                size: horizontal ? "width" : "height"
            });

            that.scrollMove.bind(CHANGE, proxy(that._move, that));
            that.container.append(element);
        },

        _move: function() {
            var that = this,
                axis = that.axis,
                boundary = that.boundary;
                boundarySize = boundary.size,
                scrollMove = that.scrollMove,
                position = scrollMove[axis],
                sizeRatio = boundarySize / boundary.total,
                position = -scrollMove[axis] * sizeRatio,
                size = Math.round(Math.min(boundarySize * sizeRatio, boundarySize - position));

            if (that.elementSize != size) {
                that.element.css(that.size, size + "px");
                that.elementSize = size;
            }
            that.move.moveAxis(axis, position);
        },

        show: function() {
            this.element.css({opacity: SCROLLBAR_OPACITY, visibility: "visible"});
        },

        hide: function() {
            this.element.css({opacity: 0});
        }
    });

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .css("overflow", "hidden")
                .wrapInner('<div class="km-scroll-container"/>');

            var inner = element.children().first(),
                move = new Move(inner),

                boundary = new mobile.ContainerBoundary({
                    element: inner,
                    container: element
                });

                swipe = new mobile.Swipe(element, {
                    start: function() {
                        boundary.refresh();
                    }
                }),

                draggable = new mobile.Draggable({
                    move: move,
                    boundary: boundary,
                    swipe: swipe,
                    elastic: true
                });

            extend(that, {
                boundary: boundary,
                move: move,
                boundary: boundary,
                swipe: swipe,
                draggable: draggable
            });

            that.initAxis("x");
            that.initAxis("y");

            boundary.refresh();
        },

        initAxis: function(axis) {
            var that = this,
            move = that.move,
            boundary = that.boundary[axis],
            draggable = that.draggable[axis],
            scrollBar = new ScrollBar({
                axis: axis,
                move: move,
                boundary: boundary,
                container: that.element
            });

            new DragInertia({
                axis: axis,
                move: move,
                swipe: that.swipe,
                boundary: boundary,
                end: function() { scrollBar.hide(); }
            });

            draggable.bind(CHANGE, function() { scrollBar.show(); });
        },

        options: {
            name: "Scroller"
        }
    });

    ui.plugin(Scroller);
})(jQuery);
