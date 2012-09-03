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

            Widget.fn.init.call(that, element, options);
            options = that.options;

            element = that.element;

            function eventProxy(name) {
                return function(e) { that.trigger(name, { touch: e.touch }); }
            }

            function gestureEventProxy(name) {
                return function(e) { that.trigger(name, { touches: e.touches }); }
            }

            that.events = new kendo.UserEvents(element, {
                surface: options.surface,
                multiTouch: options.multiTouch,
                allowSelection: true,
                press: eventProxy("touchstart"),
                tap: proxy(that, "_tap"),
                gesturestart: gestureEventProxy("gesturestart"),
                gesturechange: gestureEventProxy("gesturechange"),
                gestureend: gestureEventProxy("gestureend")
            });

            if (options.captureSwipe) {
                that.events.bind("start", proxy(that, "_swipeStart"));
                that.events.bind("move", proxy(that, "_swipeMove"));
            } else {
                that.events.bind("start", eventProxy("dragstart"));
                that.events.bind("move", eventProxy("drag"));
                that.events.bind("end", eventProxy("dragend"));
            }

            kendo.notify(that);
        },

        events: [
            "touchstart",
            "dragstart",
            "drag",
            "dragend",
            "tap",
            "swipe",
            "gesturestart",
            "gesturechange",
            "gestureend"
        ],

        options: {
            name: "Touch",
            surface: null,
            multiTouch: false,
            captureSwipe: false,
            minXDelta: 30,
            maxYDelta: 20,
            maxDuration: 1000
        },

        _tap: function(e) {
            this.trigger("tap", { touch: e.touch });
        },

        _swipeStart: function(e) {
            if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                e.sender.capture();
            }
        },

        _swipeMove: function(e) {
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
