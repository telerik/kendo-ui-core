(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        proxy = $.proxy,
        abs = Math.abs;


    var Swipe = kendo.Class.extend({
        init: function(element, callback, options) {
            options = $.extend({
                minXDelta: 30,
                maxYDelta: 20,
                maxDuration: 1000
            }, options);

            new kendo.UserEvents(element, {
                surface: options.surface,
                allowSelection: true,

                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        e.sender.capture();
                    }
                },

                move: function(e) {
                    var touch = e.touch,
                    duration = e.event.timeStamp - touch.startTime,
                    direction = touch.x.initialDelta > 0 ? "right" : "left";

                    if (
                        abs(touch.x.initialDelta) >= options.minXDelta &&
                        abs(touch.y.initialDelta) < options.maxYDelta &&
                    duration < options.maxDuration)
                    {
                        callback({
                            direction: direction,
                            userEvents: e.userEvents,
                            target: $(e.event.currentTarget)
                        });

                        touch.cancel();
                    }
                }
            });
        }
    });

    $.fn.kendoMobileSwipe = function(callback, options) {
        new Swipe(this, callback, options);
    };


    var Touch = Widget.extend({
        init: function(element, options) {
            var that = this;

            options = $.extend({ minXDelta: 30, maxYDelta: 20, maxDuration: 1000 }, options);

            Widget.fn.init.call(that, element, options);

            element = that.element;

            function eventProxy(name) {
                return function(e) { that.trigger(name, { touch: e.touch }); }
            }

            new kendo.UserEvents(element, {
                surface: options.surface,
                allowSelection: true,
                press: eventProxy("touchstart"),
                start: proxy(that, "_start"),
                move: proxy(that, "_move"),
            });

            kendo.notify(that);
        },

        events: [
            "touchstart",
            "dragstart",
            "swipe"
        ],

        options: {
            name: "Touch",
            minXDelta: 30,
            maxYDelta: 20,
            maxDuration: 1000
        },

        _start: function(e) {
            if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                e.sender.capture();
            }

            this.trigger("dragstart", { touch: e.touch });
        },

        _move: function(e) {
            var that = this,
                options = that.options,
                touch = e.touch,
                duration = e.event.timeStamp - touch.startTime,
                direction = touch.x.initialDelta > 0 ? "right" : "left";

            if (
                abs(touch.x.initialDelta) >= options.minXDelta &&
                abs(touch.y.initialDelta) < options.maxYDelta &&
                duration < options.maxDuration
                )
            {
                that.trigger("swipe", {
                    direction: direction,
                    touch: e.touch
                });

                touch.cancel();
            }
        }

    });

    kendo.ui.plugin(Touch);
})(jQuery);
