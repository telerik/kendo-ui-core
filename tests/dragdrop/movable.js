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
    var values = $(element).css("transform").match(/[\d.]+/g);
    return {
        scale: parseInt(values[0]),
        x: parseFloat(values[4]),
        y: parseFloat(values[5])
    };
}

test("sets x", 1, function() {
    movable.moveAxis("x", 10.5);
    equal(elementLocation()["x"], 10.5);
});

test("sets y", 1, function() {
    movable.moveAxis("y", 10.5);
    equal(elementLocation()["y"], 10.5);
});

test("rounds x", 1, function() {
    movable.round = true;
    movable.moveAxis("x", 10.5);
    equal(elementLocation()["x"], 11);
});

test("rounds y", 1, function() {
    movable.round = true;
    movable.moveAxis("y", 10.5);
    equal(elementLocation()["y"], 11);
});
