(function ($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        // DOM events
        DOM_PRESS = "mousedown",
        DOM_MOVE = "mousemove",
        DOM_UP = "mouseup mouseleave",

        // Widget Events
        TOUCH_START = "touchstart";

    if (kendo.support.touch) {
        DOM_PRESS = "touchstart";
        DOM_MOVE = "touchmove";
        DOM_UP = "touchend touchcancel";
    }

    var TouchEvents = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = $(element);

            element.on(DOM_PRESS, function(e) {
                that.trigger(TOUCH_START, {event: e});
            });
        },

        events: [
            TOUCH_START
        ],

        options: {
            name: "TouchEvents"
        }
    });

    kendo.ui.plugin(TouchEvents);
 })(jQuery);
