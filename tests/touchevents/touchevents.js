var touchEvents,
    element;

module("Touch Events - touchstart", {
    setup: function() {
        element = $("<i />");
        touchEvents = element.kendoTouchEvents().data("kendoTouchEvents");
    }
});

function triggerTouchEvent(type, eventData) {
    element.trigger($.Event(type, { originalEvent: { changedTouches: [eventData] } }));
}

test("Triggers touchstart when pressed", 1, function() {
    touchEvents.bind("touchstart", function() {
        ok(true);
    });

    triggerTouchEvent("touchstart", {});
})

test("passes jQuery event", 1, function() {
    touchEvents.bind("touchstart", function(e) {
        ok(e.event instanceof $.Event);
    });

    triggerTouchEvent("touchstart", {});
});

test("passes event coordinates", 6, function() {
    touchEvents.bind("touchstart", function(e) {
        var x = e.touch.x, y = e.touch.y;
        equal(x.location, 10);
        equal(x.client, 100);
        equal(x.screen, 80);

        equal(y.location, 10);
        equal(y.client, 100);
        equal(y.screen, 80);
    });

    triggerTouchEvent("touchstart", {
        pageX: 10,
        pageY: 10,
        clientX: 100,
        clientY: 100,
        screenX: 80,
        screenY: 80,
    });
})
