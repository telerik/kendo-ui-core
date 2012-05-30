(function($, undefined) {
    var kendo = window.kendo,
        abs = Math.abs;

    $.fn.kendoMobileSwipe = function(callback, options) {
        options = $.extend({
            minXDelta: 30,
            maxYDelta: 20,
            maxDuration: 1000
        }, options);

        this.each(function(_, element) {
             new kendo.Drag(element, {
                start: function(e) {
                    if (abs(e.x.velocity) * 2 >= abs(e.y.velocity)) {
                        e.sender.capture();
                    }
                },
                end: function(e) {
                    var duration = e.sender.endTime - e.sender.startTime,
                        direction = e.x.initialDelta > 0 ? "right" : "left";

                    if (
                        abs(e.x.initialDelta) >= options.minXDelta &&
                        abs(e.y.initialDelta) < options.maxYDelta &&
                        duration < options.maxDuration)
                    {
                        callback({
                            direction: direction,
                            drag: e.sender,
                            target: $(element)
                        });
                    }
                }
            });
        });
    };
})(jQuery);
