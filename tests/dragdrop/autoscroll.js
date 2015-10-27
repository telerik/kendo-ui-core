(function() {
    module("Draggable auto scrolll");

    test("scrollVelocity calculates velocity from rectangle and mouse position (top)", function() {
        var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(30, 20, {
            top: 0,
            left: 0,
            bottom: 200,
            right: 200
        });

        equal(velocity.x, -20);
        equal(velocity.y, -30);
    });

    test("scrollVelocity calculates velocity from rectangle and mouse position (bottom)", function() {
        var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(170, 180, {
            top: 0,
            left: 0,
            bottom: 200,
            right: 200
        });

        equal(velocity.x, 20);
        equal(velocity.y, 30);
    });

    test("scrollVelocity calculates velocity from rectangle and mouse position (center)", function() {
        var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(100, 100, {
            top: 0,
            left: 0,
            bottom: 200,
            right: 200
        });

        equal(velocity.x, 0);
        equal(velocity.y, 0);
    });

    test("scrollable view port calculates element dimensions", function() {
        var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px;'>Div</div>").appendTo(QUnit.fixture);
        var dimensions = kendo.ui.Draggable.utils.scrollableViewPort(el);

        equal(dimensions.top, 100);
        equal(dimensions.left, 200);
        equal(dimensions.bottom, 400);
        equal(dimensions.right, 400);
    });

    test("scrollable parent gets the element if scrollalble", function() {
        var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px; overflow: auto'>Div</div>").appendTo(QUnit.fixture);
        var parent = kendo.ui.Draggable.utils.findScrollableParent(el);

        equal(el[0], parent[0]);
    });

    test("scrollable parent gets the body if not scrollable", function() {
        var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px;'>Div</div>").appendTo(QUnit.fixture);
        var parent = kendo.ui.Draggable.utils.findScrollableParent(el);
        ok(parent[0] === document.body || parent[0] === document.documentElement);
    });
})();
