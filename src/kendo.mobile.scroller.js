(function($, undefined) {
    var mobile = kendo.mobile,
        TICK_INTERVAL,
        ui = mobile.ui,
        proxy = $.proxy,
        extend = $.extend,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget,
        Transition = mobile.Transition;
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.95;
        OUT_OF_BOUNDS_FRICTION = 0.83;

    var DragInertia = kendo.Class.extend({
        init: function(options) {
            var that = this;
            extend(that, options, {
                tickProxy: proxy(that._tick, that),
                transition: new Transition({
                    axis: options.axis,
                    move: options.move,
                    callback: function() { that.end(); }
                })
            });

            that.swipe.bind("start", proxy(that.cancel, that));
            that.swipe.bind("end", proxy(that.start, that));
        },

        cancel: function() {
            this.transition.stop();
            clearInterval(this.intervalID);
        },

        start: function() {
            var that = this;

            if (!that.boundary.present()) { return; }

            if (that.boundary.outOfBounds()) {
                that._snapBack();
            } else {
                that.velocity = that.swipe[that.axis].velocity * .5;
                that.intervalID = setInterval(that.tickProxy, TICK_INTERVAL);
            }
        },

        _snapBack: function() {
            var that = this,
                boundary = that.boundary,
                snapBack = that.move[that.axis] > boundary.max ? boundary.max : boundary.min;

            that.transition.moveTo({ location: snapBack, duration: 500, ease: Transition.easeOutExpo });
        },

        _tick: function() {
            var that = this,
                outOfBounds = that.boundary.outOfBounds(),
                friction = outOfBounds ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            that.move.translateAxis(that.axis, that.velocity *= friction);

            if (Math.abs(that.velocity) < 1) {
                that.cancel();

                if (outOfBounds) {
                    that._snapBack();
                } else {
                    that.end();
                }
            }
        }
    });

    var ScrollBar = kendo.Class.extend({
        init: function(options) {
            var that = this,
                horizontal = options.axis === "x",
                element = $('<div class="km-touch-scrollbar km-' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />');

            extend(that, options, {
                element: element,
                move: new mobile.Move(element),
                scrollMove: options.boundary.move,
                size: horizontal ? "width" : "height"
            });

            that.boundary.bind("change", proxy(that.resize, that));
            that.scrollMove.bind("change", proxy(that._move, that));

            that.container.append(element);
        },

        resize: function() {
            var that = this,
                boundary = that.boundary;

            that.sizeRatio = boundary.size / boundary.total;

            that.element.css(that.size, 100 * that.sizeRatio + "%");
        },

        _move: function() {
            var that = this,
                axis = that.axis,
                scrollMove = that.scrollMove,
                position = scrollMove[axis];

            that.move.moveAxis(axis, -position * that.sizeRatio);
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
                move = new mobile.Move(inner),
                boundary = new mobile.ContainerBoundary(element, {move: move}),

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
            boundary = that.boundary[axis],
            draggable = that.draggable[axis],
            scrollBar = new ScrollBar({
                axis: axis,
                boundary: boundary,
                container: that.element
            });

            new DragInertia({
                axis: axis,
                move: that.move,
                swipe: that.swipe,
                boundary: boundary,
                end: function() { scrollBar.hide(); }
            });

            draggable.bind("change", function() { scrollBar.show(); });
        },

        options: {
            name: "Scroller"
        }
    });

    ui.plugin(Scroller);
})(jQuery);
