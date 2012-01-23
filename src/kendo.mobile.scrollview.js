(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        proxy = $.proxy,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

    var TICK_INTERVAL = 10;

    var Inertia = kendo.Class.extend({
        init: function(move, callback) {
            var that = this;
            that.move = move;
            that.timer = 0;
            that.tickProxy = proxy(that.tick, that);
            that.callback = callback;
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
                this.callback();
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

    var CURRENT_PAGE_CLASS = "km-current-page";

    /**
    * @name kendo.mobile.ui.ScrollView.Description
    * @section The Kendo Mobile ScrollView widget is used to scroll content wider than the device screen.
    *
    * <h3>Getting Started</h3>
    * <p>The Kendo Mobile Application automatically initializes the Mobile ScrollView for every element with <code>role</code> data attribute set to <code>scrollview</code> present in the views' markup.
    * Alternatively, it can be initialized using a jQuery selector. </p>
    * @exampleTitle Initialize mobile ScrollView using a role data attribute.
    * @example
    * <div data-role="scrollview">
    *   Foo
    * </div>
    *
    * @exampleTitle Initialize mobile ScrollView using a jQuery selector.
    * @example
    * <div id="scrollView"></div>
    * <script>
    * var listView = $("#scrollView").kendoMobileScrollView();
    * </script>
    *
    */
    var ScrollView = Widget.extend(/** @lends kendo.mobile.ui.ScrollView.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element
        * @param {Object} options
        * @option {Number} [duration] <300> The milliseconds that take the ScrollView to snap to the current page after released.
        * @option {Number} [velocityThreshold] <1> The velocity threshold after which a swipe will navigate to the next page (as opposed to snapping back to the current view).
        * The swipe velocity equal the pixels per millisecond change for a swipe.
        * @option {Number} [bounceVelocityThreshold] <2.5> The velocity threshold after which a swipe will result in a bounce effect.
        */
        init: function(element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);
            element = that.element;

            element
                .wrapInner("<div/>")
                .addClass("km-scrollview")
                .append('<ol class="km-pages"/>');

            that.inner = element.children().first();
            that.pager = element.children().last();
            that.page = 0;

            that.move = new mobile.Move(that.inner);

            that.inertia = new Inertia(that.move, function() {
                that.page = -that.move.x / that.width;
                that._updatePage();
            });

            that.swipe = new mobile.Swipe(element, {
                start: function() {
                    that.inertia.stop();
                },
                end: $.proxy(that._swipeEnd, that)
            });

            that.draggable = new mobile.Draggable({
                ignoreY: true,
                minY: 0,
                swipe: that.swipe,
                move: that.move
            });

            that.calculateDimensions();
            $(window).bind("orientationchange", proxy(that.calculateDimensions, that));
        },

        options: {
            name: "ScrollView",
            duration: 300,
            velocityThreshold: 1,
            bounceVelocityThreshold: 2.5
        },

        viewShow: function(view) {
            this.calculateDimensions();
        },

        calculateDimensions: function() {
            var that = this,
                width = that.width = that.element.width(),
                scrollWidth = that.inner[0].scrollWidth,
                pages = that.pages = Math.ceil(scrollWidth / width),
                pageHTML = "";

            that.minSnap = - (pages - 1) * width;
            that.maxSnap = 0;
            that.draggable.options.minX = width - scrollWidth;
            that.page = -that.move.x / width;

            for (var idx = 0; idx < pages; idx ++) {
                pageHTML += "<li/>";
            };

            that.pager.html(pageHTML);
            that._updatePage();
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

            snap = Math.max(that.minSnap, Math.min(approx(that.move.x / that.width) * that.width, that.maxSnap));

            if (Math.abs(velocity) > options.bounceVelocityThreshold) {
                ease = Ease.easeOutBack;
            }

            that.inertia.moveTo({ x: snap, y: 0, duration: options.duration, ease: ease });
        },

        _updatePage: function() {
            var that = this,
                pager = that.pager;

            pager.children().removeClass(CURRENT_PAGE_CLASS);
            pager.find(":nth-child(" + (that.page + 1) +")").addClass(CURRENT_PAGE_CLASS);
        }
    });

    ui.plugin(ScrollView);
})(jQuery);
