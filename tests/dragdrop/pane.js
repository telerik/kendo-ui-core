(function() {
    var movable,
        pane,
        dimensions,
        userEvents,
        fixture;

    module("pane dimensions", {
        setup: function() {
            fixture = $("<div style='top:0; position: absolute; left: 0;' />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            fixture.remove();
        }
    });

    test("calculates min scale", 1, function() {
        fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 800px;">Element</div></div>');
        var container = fixture.children().first();

        element = container.children().first();

        dimensions = new kendo.ui.PaneDimensions({
            element: element,
            container: container
        });

        dimensions.refresh();
        equal(dimensions.minScale, 0.25);
    })

    test("allows overriding min scale", 1, function() {
        fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 600px;">Element</div></div>');
        var container = fixture.children().first();

        element = container.children().first();

        dimensions = new kendo.ui.PaneDimensions({
            element: element,
            container: container,
            minScale: 1
        });

        dimensions.refresh();
        equal(dimensions.minScale, 1);
    })

    module("pane", {
        setup: function() {
            kendo.support.touch = true;
            fixture = $("<div style='top:0; position: absolute; left: 0;' />").appendTo(QUnit.fixture);
            fixture.append('<div style="width:200px; height: 200px;"><div style="width:400px; height: 400px;">Element</div></div>');
            var container = fixture.children().first();

            element = container.children().first();

            movable = new kendo.ui.Movable(element);

            dimensions = new kendo.ui.PaneDimensions({
                element: element,
                container: container
            });

            userEvents = new kendo.UserEvents(element, {multiTouch: true});

            pane = new kendo.ui.Pane({
                movable: movable,
                userEvents: userEvents,
                dimensions: dimensions
            });

            dimensions.refresh();
        },

        teardown: function() {
            kendo.support.touch = false;
            fixture.remove();
        }
    });

    test("zooms content", function() {
        press(element, 10, 10);
        press(element, 13, 14, 2);
        move(element, 15, 22, 2);
        equal(movable.scale, 2.6);
    })

    test("zooms content to maxScale", function() {
        dimensions.maxScale = 2;
        press(element, 10, 10);
        press(element, 13, 14, 2);
        move(element, 15, 22, 2);
        equal(movable.scale, 2);
    })
    test("zooms to a given point", 2, function() {
        press(element, 10, 10);
        press(element, 13, 14, 2);
        move(element, 9, 6);
        move(element, 14, 18, 2);

        QUnit.close(movable.x, -18.4, 0.1);
        QUnit.close(movable.y, -19.2, 0.1);
    })

    test("offsets zoom point", function() {
        press(element, 10, 10);
        press(element, 13, 14, 2);
        move(element, 5, 5);
        move(element, 8, 9, 2);

        equal(movable.scale, 1);
        QUnit.close(movable.x, -5, 0.1);
        QUnit.close(movable.y, -5, 0.1);
    })

    test("zooms to a given point after being offset", function() {
        press(element, 30, 10);
        move(element, 10, 10);
        release(element);

        equal(movable.x, -20);

        press(element, 10, 10);
        press(element, 13, 14, 2);
        move(element, 9, 6);
        move(element, 14, 18, 2);

        QUnit.close(movable.x, -70.4, 0.1);
        QUnit.close(movable.y, -19.2, 0.1);
    })

    test("zooming out causes friction", function() {
        press(element, 9, 6);
        press(element, 14, 18, 2);
        move(element, 10, 10);
        move(element, 13, 14, 2);
        QUnit.close(movable.scale, 0.92 / 2, 0.1);
    });
})();

