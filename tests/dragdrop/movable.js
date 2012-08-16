var fixture = $("#qunit-fixture"),
    Movable = kendo.ui.Movable,
    element,
    movable;

module("movable", {
    setup: function() {
        fixture.append("<div />");
        element = fixture.children().first();
        movable = new Movable(element);
    },

    teardown: function() {
        fixture.empty()
    }
});

function triggerTouchEvent(type, e) {
    element.trigger($.Event(type, { originalEvent: { changedTouches: [e] }}));
}

function elementLocation() {
    var values = $(element).css("transform").match(/\d+/g);
    return {
        scale: parseInt(values[0]),
        x: parseInt(values[4]),
        y: parseInt(values[5])
    };
}

test("moves given element", 1, function() {
    movable.moveAxis("x", 10);
    equal(elementLocation()["x"], 10);
});
