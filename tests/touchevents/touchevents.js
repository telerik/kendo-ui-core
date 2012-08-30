var touchEvents,
    element;

module("Touch Events - touchstart", {
    setup: function() {
        element = $("<i />");
        touchEvents = element.kendoTouchEvents().data("kendoTouchEvents");
    }
});


test("Triggers touchstart when pressed", 1, function() {
    touchEvents.bind("touchstart", function() {
        ok(true);
    });

    element.trigger($.Event("touchstart"));
})

test("passes jQuery event in handler", 1, function() {
    var event = $.Event("touchstart", { pageX: 10, pageY: 10});
    touchEvents.bind("touchstart", function(e) {
        equal(e.event, event);
    });

    element.trigger(event);
})
