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
                global: true,
                end: function(e) {
                    var duration = e.sender.endTime - e.sender.startTime,
                        direction = e.x.delta > 0 ? "right" : "left";

                    if (
                        abs(e.x.delta) >= options.minXDelta &&
                        abs(e.y.delta) < options.maxYDelta &&
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
