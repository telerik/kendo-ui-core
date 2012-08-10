(function($, undefined) {
    var kendo = window.kendo,
        abs = Math.abs;


    var Swipe = kendo.Class.extend({
        init: function(element, callback, options) {
            options = $.extend({
                minXDelta: 30,
                maxYDelta: 20,
                maxDuration: 1000
            }, options);

            new kendo.Drag(element, {
                surface: options.surface,
                allowSelection: true,

                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        e.sender.capture();
                    }
                },

                move: function(e) {
                    var drag = e.sender,
                    duration = e.event.timeStamp - e.startTime,
                    direction = e.x.initialDelta > 0 ? "right" : "left";

                    if (
                        abs(e.x.initialDelta) >= options.minXDelta &&
                        abs(e.y.initialDelta) < options.maxYDelta &&
                    duration < options.maxDuration)
                    {
                        callback({
                            direction: direction,
                            drag: drag,
                            target: $(drag.currentTarget)
                        });

                        drag.cancel();
                    }
                }
            });
        }
    });

    $.fn.kendoMobileSwipe = function(callback, options) {
        new Swipe(this, callback, options);
    };
})(jQuery);
