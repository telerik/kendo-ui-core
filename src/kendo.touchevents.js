(function ($, undefined) {
    var kendo = window.kendo,
        support = kendo.support,
        Class = kendo.Class,
        Widget = kendo.ui.Widget,

        extend = $.extend,

        // DOM events
        DOM_PRESS = "mousedown",
        DOM_MOVE = "mousemove",
        DOM_UP = "mouseup mouseleave",

        // Widget Events
        TOUCH_START = "touchstart";

    if (support.touch) {
        DOM_PRESS = "touchstart";
        DOM_MOVE = "touchmove";
        DOM_UP = "touchend touchcancel";
    }

    function getTouches(e) {
        var touches = [],
            originalEvent = e.originalEvent,
            idx = 0, length,
            changedTouches,
            touch;

        if (support.touch) {
            changedTouches = originalEvent.changedTouches;
            for (length = changedTouches.length; idx < length; idx ++) {
                touch = changedTouches[idx];
                touches.push({
                    location: touch,
                    event: e,
                    target: touch.target,
                    id: touch.identifier
                });
            }
        }
        else if (support.pointers) {
            touches.push({
                location: originalEvent,
                event: e,
                target: e.target,
                id: originalEvent.pointerId

            });
        } else {
            touches.push({
                id: 1, // hardcoded ID for mouse event;
                event: e,
                target: e.target,
                location: e
            });
        }

        return touches;
    }

    var TouchAxis = Class.extend({
        init: function(axis, location) {
            var that = this,
                offset = location["page" + axis];

            that.axis = axis;
            that.startLocation = that.location = offset;
            that.client = location["client" + axis];
            that.screen = location["screen" + axis];
        }
    });

    var Touch = Class.extend({
        init: function(touchEvents, eventInfo) {
            var that = this;

            extend(this, {
                x: new TouchAxis("X", eventInfo.location),
                y: new TouchAxis("Y", eventInfo.location),
            });

            touchEvents.trigger(TOUCH_START, {
                event: eventInfo.event,
                touch: this
            });
        }
    })

    var TouchEvents = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = $(element);

            element.on(DOM_PRESS, function(e) { that._press(e) });
        },

        events: [
            TOUCH_START
        ],

        options: {
            name: "TouchEvents"
        },

        _press: function(e) {
            var that = this,
                touches = getTouches(e),
                idx = 0,
                length = touches.length,
                touchEvent;

            for (; idx < length; idx ++) {
                new Touch(that, touches[idx]);
            }
        }
    });

    kendo.ui.plugin(TouchEvents);
 })(jQuery);
