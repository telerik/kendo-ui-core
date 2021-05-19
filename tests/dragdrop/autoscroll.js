(function() {
    describe("Draggable auto scrolll", function() {

        it("scrollVelocity calculates velocity from rectangle and mouse position (top)", function() {
            var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(30, 20, {
                top: 0,
                left: 0,
                bottom: 200,
                right: 200
            });

            assert.equal(velocity.x, -20);
            assert.equal(velocity.y, -30);
        });

        it("scrollVelocity calculates velocity from rectangle and mouse position (bottom)", function() {
            var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(170, 180, {
                top: 0,
                left: 0,
                bottom: 200,
                right: 200
            });

            assert.equal(velocity.x, 20);
            assert.equal(velocity.y, 30);
        });

        it("scrollVelocity calculates velocity from rectangle and mouse position (center)", function() {
            var velocity = kendo.ui.Draggable.utils.autoScrollVelocity(100, 100, {
                top: 0,
                left: 0,
                bottom: 200,
                right: 200
            });

            assert.equal(velocity.x, 0);
            assert.equal(velocity.y, 0);
        });

        it("scrollable view port calculates element dimensions", function() {
            var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px;'>Div</div>").appendTo(Mocha.fixture);
            var dimensions = kendo.ui.Draggable.utils.scrollableViewPort(el);

            assert.equal(dimensions.top, 100);
            assert.equal(dimensions.left, 200);
            assert.equal(dimensions.bottom, 400);
            assert.equal(dimensions.right, 400);
        });

        it("scrollable parent gets the element if scrollalble", function() {
            var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px; overflow: auto'>Div</div>").appendTo(Mocha.fixture);
            var parent = kendo.ui.Draggable.utils.findScrollableParent(el);

            assert.equal(el[0], parent[0]);
        });

        it("scrollable parent gets the body if not scrollable", function() {
            var el = $("<div style='width: 200px; height:300px; position: absolute; top: 100px; left: 200px;'>Div</div>").appendTo(Mocha.fixture);
            var parent = kendo.ui.Draggable.utils.findScrollableParent(el);
            assert.isOk(parent[0] === document.body || parent[0] === document.documentElement);
        });
    });
}());
