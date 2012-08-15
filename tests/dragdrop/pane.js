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
    equal(movable.x, 141.6);
    equal(movable.y, 140.8);
})

