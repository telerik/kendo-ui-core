(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

    var TICK_INTERVAL = 10;

    var Inertia = kendo.Class.extend({
        init: function(move) {
            var that = this;
            that.move = move;
            that.timer = 0;
            that.tickProxy = proxy(that.tick, that);
        },

        animate: function() {
            this.intervalID = setInterval(this.tickProxy, TICK_INTERVAL);
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

            that.ease = that.easeProxy(options.ease || Ease.easeOutQuad);

            that.animate();
        },

        easeProxy: function(ease) {
            var that = this;
            return function() {
                that.move.moveTo(
                    ease(that.timer, that.initialX, that.deltaX, that.duration),
                    ease(that.timer, that.initialY, that.deltaY, that.duration)
                );
            }
        },

        tick: function() {
            var that = this;
            that.timer += TICK_INTERVAL;
            that.ease();

            if (that.timer === that.duration) {
                that.stop();
            }
        }
    });

    var Ease = {
        /*
        linearTween: function (t, b, c, d) {
            return c*t/d + b;
        },

        easeInQuad: function (t, b, c, d) {
            return c*(t/=d)*t + b;
        },

        easeOutQuad: function (t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },

        easeInCubic: function (t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },

        easeOutCubic: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },

        easeInQuart: function (t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },

        easeOutQuart: function (t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },

        easeInQuint: function (t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },

        easeOutQuint: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },

        easeInExpo: function (t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        */

        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        /*
        easeInBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        */

        easeOutBack: function (t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    }


    var ScrollView = Widget.extend({
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        * @param {Object} options
        */
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            element = that.element;

            that.domElement = element[0];
            element.wrapInner("<div/>");
            that.move = new mobile.Move(element.children().first());
            that.inertia = new Inertia(that.move);

            that.swipe = new mobile.Swipe(element, {
                start: $.proxy(that._swipeStart, that),
                end: $.proxy(that._swipeEnd, that)
            });

            that.draggable = new mobile.Draggable({
                ignoreY: true,
                minY: 0,
                swipe: that.swipe,
                move: that.move
            });

            that.calculateDimensions();
        },

        options: {
            name: "ScrollView",
            duration: 300,
            velocityThreshold: 1,
            bounceVelocityThreshold: 2.5,
            selector: roleSelector("navbar")
        },

        calculateDimensions: function() {
            var that = this,
                width = that.width = that.element.width(),
                scrollWidth = that.domElement.scrollWidth;

            that.minSnapX = - Math.floor(scrollWidth / width) * width;
            that.maxSnapX = 0;
            that.draggable.options.minX = width - scrollWidth;
        },

        _swipeStart: function() {
            this.inertia.stop();
        },

        _swipeEnd: function(e) {
            var that = this,
                velocity = e.x.velocity,
                options = that.options,
                velocityThreshold = options.velocityThreshold,
                snap,
                approx = Math.round,
                ease = Ease.easeOutExpo;

            if (velocity > velocityThreshold) {
                approx = Math.ceil;
            } else if(velocity < -velocityThreshold) {
                approx = Math.floor;
            }

            snap = Math.max(that.minSnapX, Math.min(approx(that.move.x / that.width) * that.width, that.maxSnapX));

            if (Math.abs(velocity) > options.bounceVelocityThreshold) {
                ease = Ease.easeOutBack;
            }

            that.inertia.moveTo({ x: snap, y: 0, duration: options.duration, ease: ease });
        }
    });

    ui.plugin(ScrollView);
})(jQuery);
