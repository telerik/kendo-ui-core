(function($, undefined) {
    var mobile = kendo.mobile,
        ui = mobile.ui,
        roleSelector = kendo.roleSelector,
        Widget = ui.Widget;

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
            that.inertia = new mobile.Inertia(that.move);

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
            bounceVelocityThreshold: 2,
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
                ease = kendo.mobile.Ease.easeOutExpo;

            if (velocity > velocityThreshold) {
                approx = Math.ceil;
            } else if(velocity < -velocityThreshold) {
                approx = Math.floor;
            }

            snap = Math.max(that.minSnapX, Math.min(approx(that.move.x / that.width) * that.width, that.maxSnapX));

            if (Math.abs(velocity) > options.bounceVelocityThreshold) {
                ease = kendo.mobile.Ease.easeOutBack;
            }

            that.inertia.moveTo({ x: snap, y: 0, duration: options.duration, ease: ease });
        }
    });

    ui.plugin(ScrollView);
})(jQuery);
