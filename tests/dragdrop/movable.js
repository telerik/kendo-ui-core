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

test("scales given element", 1, function() {
    movable.scaleTo(2);
    equal(elementLocation()["scale"], 2);
});

var movable, pane, dimensions, drag;

module("pane", {
    setup: function() {
        kendo.support.touch = true;
        fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 400px;">Element</div></div>');
        var container = fixture.children().first();

        element = container.children().first();

        movable = new kendo.ui.Movable(element);

        dimensions = new kendo.ui.PaneDimensions({
            element: element,
            container: container
        });

        drag = new kendo.Drag(element);

        pane = new kendo.ui.Pane({
            movable: movable,
            drag: drag,
            dimensions: dimensions
        });
    },

    teardown: function() {
        fixture.empty();
    }
});

test("zooms content", function() {
    triggerTouchEvent("mousedown", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousedown", { pageX: 13, pageY: 14, identifier: 2 });
    triggerTouchEvent("mousemove", { pageX: 15, pageY: 22, identifier: 2 });
    equal(movable.scale, 2.6);
})

