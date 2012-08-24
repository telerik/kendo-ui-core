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

        dimensions.refresh();
    },

    teardown: function() {
        fixture.empty();
    }
});

function press(x, y, id) {
    triggerTouchEvent("mousedown", { pageX: x, pageY: y, identifier: id || 1});
}

function move(x, y, id) {
    triggerTouchEvent("mousemove", { pageX: x, pageY: y, identifier: id || 1});
}

function release(id) {
    triggerTouchEvent("mouseup", { pageX: 1, pageY: 1, identifier: id || 1});
}

test("determines zoom point", 2, function() {
    press(10, 10);
    press(13, 14, 2);
    equal(pane.gestureInfo.center.x, 11.5);
    equal(pane.gestureInfo.center.y, 12);
})

test("zooms content", function() {
    press(10, 10);
    press(13, 14, 2);
    move(15, 22, 2);
    equal(movable.scale, 2.6);
})


test("zooms to a given point", function() {
    press(10, 10);
    press(13, 14, 2);
    move(9, 6);
    move(14, 18, 2);

    equal(movable.x, -18.4, 0.1);
    equal(movable.y, -19.2, 0.1);
})

test("offsets zoom point", function() {
    press(10, 10);
    press(13, 14, 2);
    move(5, 5);
    move(8, 9, 2);

    equal(movable.scale, 1);
    equal(movable.x, -5, 0.1);
    equal(movable.y, -5, 0.1);
})

test("zooms to a given point after being offset", function() {
    press(30, 10);
    move(10, 10);
    release();

    equal(movable.x, -20);

    press(10, 10);
    press(13, 14, 2);
    move(9, 6);
    move(14, 18, 2);

    equal(movable.x, -70.4, 0.1);
    equal(movable.y, -19.2, 0.1);
})

test("zooming out causes friction", function() {
    press(9, 6);
    press(14, 18, 2);
    move(10, 10);
    move(13, 14, 2);
    equal(movable.scale, 0.92, 0.1);
});


