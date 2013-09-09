/*
 - print
 - ruler
 - thumbnail
 - shapes lib
 - shapes panel
 */

(function ($, undefined) {
    var extend = $.extend,
        math = Math;

    function mwDelta(e) {
        var origEvent = e.originalEvent,
            delta = 0;

        if (origEvent.wheelDelta) {
            delta = -origEvent.wheelDelta / 40;
            delta = delta > 0 ? math.ceil(delta) : math.floor(delta);
        } else if (origEvent.detail) {
            delta = origEvent.detail;
        }

        return delta;
    }

    extend($.fn, {
        mousewheel: function (handler, options) {
            var o = extend({
                ns: ""
            }, options || {});

            var that = this,
                mousewheel_NS = "DOMMouseScroll" + o.ns + " mousewheel" + o.ns;

            that.on(mousewheel_NS, function (e) {
                e.data = { delta: mwDelta(e) };

                handler(e);
            });

            return that;
        }
    });
})(window.kendo.jQuery);