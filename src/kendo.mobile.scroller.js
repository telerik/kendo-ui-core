(function($, undefined) {
    var mobile = kendo.mobile,
        TICK_INTERVAL,
        ui = mobile.ui,
        proxy = $.proxy,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget,
        Transition = mobile.Transition;
        FRICTION = 0.95;
        OUT_OF_BOUNDS_FRICTION = 0.83;

    var DragInertia = kendo.Class.extend({
        init: function(options) {
            var that = this;
            $.extend(that, options);

            that.transition = new Transition({
                axis: that.axis,
                move: that.move
            });

            that.boundary = that.boundary[that.axis];
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
            this.cancel();
            this._snapBack();
        },

        _snapBack: function() {
            var that = this,
                snapBack,
                boundary = that.boundary;

            if (that.outOfBounds()) {
                snapBack = that.move[that.axis] > boundary.max ? boundary.max : boundary.min;
                that.transition.moveTo({ location: snapBack, duration: 500, ease: Transition.easeOutExpo });
            }
        },

        _tick: function() {
            var that = this,
                axis = that.axis,
                params = {},
                friction =  that.outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            params[axis] = that.velocity *= friction;

            that.move.translate(params);

            if (Math.abs(that.velocity) < 1) {
                that._end();
            }
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

            that.inner = element.children().first();

            that.move = new mobile.Move(that.inner);

            that.boundary = new mobile.ContainerBoundary(element, {move: that.move});

            that.swipe = new mobile.Swipe(element, {
                start: function() {
                    that.boundary.refresh();
                }
            });

            that.inertia = new DragInertia({
                axis: "y",
                move: that.move,
                swipe: that.swipe,
                boundary: that.boundary
            });

            that.draggable = new mobile.Draggable({
                move: that.move,
                boundary: that.boundary,
                swipe: that.swipe,
                elastic: true,
            });

            that.boundary.refresh();
        },

        options: {
            name: "Scroller"
        }
    });

    ui.plugin(Scroller);
})(jQuery);
