(function() {
    var movable,
        pane,
        dimensions,
        userEvents,
        fixture;

    describe("pane dimensions", function() {
        beforeEach(function() {
            fixture = $("<div style='top:0; position: absolute; left: 0;' />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            fixture.remove();
        });

        it("calculates min scale", function() {
            fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 800px;">Element</div></div>');
            var container = fixture.children().first();

            element = container.children().first();

            dimensions = new kendo.ui.PaneDimensions({
                element: element,
                container: container
            });

            dimensions.refresh();
            assert.equal(dimensions.minScale, 0.25);
        })

        it("allows overriding min scale", function() {
            fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 600px;">Element</div></div>');
            var container = fixture.children().first();

            element = container.children().first();

            dimensions = new kendo.ui.PaneDimensions({
                element: element,
                container: container,
                minScale: 1
            });

            dimensions.refresh();
            assert.equal(dimensions.minScale, 1);
        })
    });

    describe("pane", function() {
        beforeEach(function() {
            kendo.support.touch = true;
            fixture = $("<div style='top:0; position: absolute; left: 0;' />").appendTo(Mocha.fixture);
            fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 400px;">Element</div></div>');
            var container = fixture.children().first();

            element = container.children().first();

            movable = new kendo.ui.Movable(element);

            dimensions = new kendo.ui.PaneDimensions({
                element: element,
                container: container
            });

            userEvents = new kendo.UserEvents(element, { multiTouch: true });

            pane = new kendo.ui.Pane({
                movable: movable,
                userEvents: userEvents,
                dimensions: dimensions
            });

            dimensions.refresh();
        });

        afterEach(function() {
            kendo.support.touch = false;
            fixture.remove();
        });

        it("zooms content", function() {
            press(element, 10, 10);
            press(element, 13, 14, 2);
            move(element, 15, 22, 2);
            assert.equal(movable.scale, 2.6);
        })

        it("zooms content to maxScale", function() {
            dimensions.maxScale = 2;
            press(element, 10, 10);
            press(element, 13, 14, 2);
            move(element, 15, 22, 2);
            assert.equal(movable.scale, 2);
        })
        it("zooms to a given point", function() {
            press(element, 10, 10);
            press(element, 13, 14, 2);
            move(element, 9, 6);
            move(element, 14, 18, 2);

            assert.closeTo(movable.x, -18.4, 0.1);
            assert.closeTo(movable.y, -19.2, 0.1);
        })

        it("offsets zoom point", function() {
            press(element, 10, 10);
            press(element, 13, 14, 2);
            move(element, 5, 5);
            move(element, 8, 9, 2);

            assert.equal(movable.scale, 1);
            assert.closeTo(movable.x, -5, 0.1);
            assert.closeTo(movable.y, -5, 0.1);
        })

        it("zooms to a given point after being offset", function() {
            press(element, 30, 10);
            move(element, 10, 10);
            release(element);

            assert.equal(movable.x, -20);

            press(element, 10, 10);
            press(element, 13, 14, 2);
            move(element, 9, 6);
            move(element, 14, 18, 2);

            assert.closeTo(movable.x, -70.4, 0.1);
            assert.closeTo(movable.y, -19.2, 0.1);
        })

        it("zooming out causes friction", function() {
            press(element, 9, 6);
            press(element, 14, 18, 2);
            move(element, 10, 10);
            move(element, 13, 14, 2);
            assert.closeTo(movable.scale, 0.92 / 2, 0.1);
        });
    });
}());

