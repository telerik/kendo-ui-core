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

test("determines zoom point", 2, function() {
    triggerTouchEvent("mousedown", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousedown", { pageX: 13, pageY: 14, identifier: 2 });
    equal(pane.zoomPoint.x, 11.5);
    equal(pane.zoomPoint.y, 12);
})

test("zooms content", function() {
    triggerTouchEvent("mousedown", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousedown", { pageX: 13, pageY: 14, identifier: 2 });
    triggerTouchEvent("mousemove", { pageX: 15, pageY: 22, identifier: 2 });
    equal(movable.scale, 2.6);
})

test("zooms to a given point", function() {
    triggerTouchEvent("mousedown", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousedown", { pageX: 13, pageY: 14, identifier: 2 });
    triggerTouchEvent("mousemove", { pageX: 15, pageY: 22, identifier: 2 });
    equal(movable.x, -18.4, 0.1);
    equal(movable.y, -19.2, 0.1);
})

test("zooms to a given point after being offset", function() {
    triggerTouchEvent("mousedown", { pageX: 30, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousemove", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mouseup", { pageX: 10, pageY: 10, identifier: 1 });

    equal(movable.x, -20);

    triggerTouchEvent("mousedown", { pageX: 10, pageY: 10, identifier: 1 });
    triggerTouchEvent("mousedown", { pageX: 13, pageY: 14, identifier: 2 });
    triggerTouchEvent("mousemove", { pageX: 15, pageY: 22, identifier: 2 });
    equal(movable.x, -70.4, 0.1);
    equal(movable.y, -19.2, 0.1);
})

