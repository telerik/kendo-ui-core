(function($, undefined) {
    var mobile = kendo.mobile,
        TICK_INTERVAL,
        ui = mobile.ui,
        proxy = $.proxy,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget,
        Transition = mobile.Transition;
        SCROLLBAR_OPACITY = 0.7,
        FRICTION = 0.95;
        OUT_OF_BOUNDS_FRICTION = 0.83;

    var DragInertia = kendo.Class.extend({
        init: function(options) {
            var that = this;
            $.extend(that, options);

            that.transition = new Transition({
                axis: that.axis,
                move: that.move,
                callback: function() { that.end(); }
            });

            that.outOfBounds = proxy(that.boundary.outOfBounds, that.boundary);
            that.tickProxy = proxy(that._tick, that);

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

            if (that.outOfBounds()) {
                that._snapBack();
            } else {
                that.velocity = that.swipe[that.axis].velocity * .5;
                that.intervalID = setInterval(that.tickProxy, TICK_INTERVAL);
            }
        },

        _end: function() {
            var that = this;
            that.cancel();

            if (that.outOfBounds()) {
                that._snapBack();
            } else {
                that.end();
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
                friction =  that.outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            that.move.translateAxis(that.axis, that.velocity *= friction);

            if (Math.abs(that.velocity) < 1) {
                that._end();
            }
        }
    });

    var ScrollBar = kendo.Class.extend({
        init: function(options) {
            var that = this,
                horizontal = options.axis === "x";

            $.extend(that, options);

            that.element = $('<div class="km-touch-scrollbar km-' + (horizontal ? "horizontal" : "vertical") + '-scrollbar" />');
            that.container.append(that.element);

            that.size = horizontal ? "width" : "height";
            that.scrollMove = that.boundary.move;

            that.boundary.bind("change", proxy(that.resize, that));
            that.scrollMove.bind("change", proxy(that.move, that));
            that.move = new mobile.Move(that.element);
        },

        resize: function() {
            var that = this,
                boundary = that.boundary;

            that.sizeRatio = boundary.size / boundary.total;

            that.element.css(that.size, 100 * that.sizeRatio + "%");
        },

        move: function() {
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

    function ScrollAxis(axis, scroller) {
    };

    var Scroller = Widget.extend({
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            element = that.element;

            element
                .css("overflow", "hidden")
                .wrapInner('<div class="km-scroll-container"/>');

            that.inner = element.children().first();

            that.move = new mobile.Move(that.inner);

            that.boundary = new mobile.ContainerBoundary(element, {move: that.move});

            that.swipe = new mobile.Swipe(element, {
                start: function() { that.boundary.refresh(); }
            });

            that.draggable = new mobile.Draggable({
                move: that.move,
                boundary: that.boundary,
                swipe: that.swipe,
                elastic: true,
            });

            that.initAxis("x");
            that.initAxis("y");

            that.boundary.refresh();
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
