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

    var Inertia = kendo.Class.extend({
        init: function(options) {
            var that = this;
            $.extend(that, options);
            that.tickProxy = proxy(that._tick, that);
        },

        stop: function() {
            clearInterval(this.intervalID);
        },

        start: function(velocity) {
            this.velocity = velocity;
            this.intervalID = setInterval(this.tickProxy, TICK_INTERVAL);
        },

        _tick: function() {
            var that = this,
                friction = that.boundary.y.outOfBounds() ? OUT_OF_BOUNDS_FRICTION : FRICTION;

            that.move.translate({y: that.velocity *= friction});

            if (Math.abs(that.velocity) < 1) {
                that.stop();
                that.callback();
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

            that.transition = new Transition({
                axis: "y",
                move: that.move
            });

            that.swipe = new mobile.Swipe(element, {
                start: function() {
                    that.transition.stop();
                    that.inertia.stop();
                    that.boundary.refresh();
                },
                end: $.proxy(that._swipeEnd, that)
            });

            that.boundary = new mobile.ContainerBoundary(element, {move: that.move});

            that.inertia = new Inertia({
                move: that.move,
                boundary: that.boundary,
                callback: $.proxy(that._snapBack, that)
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
        },

        viewShow: function(view) {
            that.boundary.refresh();
        },

        _snapBack: function() {
            var that = this, snapBack, y = that.move.y, boundary = that.boundary.y;

            if (that.boundary.y.outOfBounds()) {
                snapBack = y > boundary.max ? boundary.max : boundary.min;
                that.transition.moveTo({ location: snapBack, duration: 500, ease: Transition.easeOutExpo });
            }
        },

        _swipeEnd: function(e) {
            var that = this;

            if (!that.boundary.y.present()) { return; }

            if (that.boundary.y.outOfBounds()) {
                that._snapBack();
            } else {
                that.inertia.start(that.swipe.y.velocity);
            }
        }
    });

    ui.plugin(Scroller);
})(jQuery);
