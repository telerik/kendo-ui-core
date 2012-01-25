(function($, undefined) {
    var mobile = kendo.mobile,
        TICK_INTERVAL,
        ui = mobile.ui,
        proxy = $.proxy,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget
        BOUNCE_FRICTION = 0.8,
        BOUNCE_DECELERATION = 3,
        BOUNCE_PARALLAX = 0.5,
        BOUNCE_SNAP = 0.7,
        FRICTION = 0.96;

    var Inertia = kendo.Class.extend({
        init: function(move) {
            var that = this;
            that.move = move;
            that.tickProxy = proxy(that.tick, that);
        },

        start: function() {
            this.intervalID = setInterval(this.tickProxy, TICK_INTERVAL);
        },

        stop: function() {
            clearInterval(this.intervalID);
        },

        wind: function(options) {
            var that = this,
                move = that.move;

            that.xVelocity = options.x * 10;
            that.yVelocity = options.y * 10;

            that.start();
        },

        update:function(boundries) {
            $.extend(this, boundries);
        },

        tick: function() {
            var that = this,
                y = that.move.y,
                offBy,
                negativeVelocity = 0,
                offBounds = false;

           if (y < that.minY) {
               offBounds = true;
               negativeVelocity = that.minY - y;
           } else if (y > that.maxY) {
               offBounds = true;
               negativeVelocity = -(y - that.maxY);
           }

           negativeVelocity *= BOUNCE_SNAP;

           if (offBounds) {
               that.yVelocity *= BOUNCE_FRICTION;
           } else {
               that.yVelocity *= FRICTION;
           }

           that.move.moveBy(0, that.yVelocity);

           if (Math.abs(that.yVelocity) < 0.5) {
               that.stop();
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

            that.inertia = new Inertia(that.move);

            that.swipe = new mobile.Swipe(element, {
                start: function() { },
                end: $.proxy(that._swipeEnd, that)
            });

            that.draggable = new mobile.Draggable({
                swipe: that.swipe,
                elastic: true,
                move: that.move
            });

            that.calculateDimensions();
            $(window).bind("orientationchange", proxy(that.calculateDimensions, that));
        },

        options: {
            name: "Scroller"
        },

        viewShow: function(view) {
            this.calculateDimensions();
        },

        calculateDimensions: function() {
            var that = this,
                width = that.width = that.element.width(),
                height = that.height = that.element.height(),
                pageHTML = "",
                scrollWidth = that.element[0].scrollWidth - that.move.x,
                scrollHeight = that.element[0].scrollHeight - that.move.y,
                boundries = {minX: width - scrollWidth, minY: height - scrollHeight}

            that.draggable.update(boundries);
            that.inertia.update(boundries);
        },

        _swipeEnd: function(e) {
            this.inertia.wind({
                x: 0,
                y: e.y.velocity
            });
        }

    });

    ui.plugin(Scroller);
})(jQuery);
