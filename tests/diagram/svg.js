
(function() {
    var dataviz = kendo.dataviz,
        diagram = dataviz.diagram,

        g = dataviz.geometry,
        d = dataviz.drawing,

        Point = diagram.Point,
        Rect = diagram.Rect,
        Rotation = diagram.Rotation,
        CompositeTransform = diagram.CompositeTransform;


    (function() {
        var Element = diagram.Element;
        var element;
        var drawingElement;

        function elementSetup(options) {
            element = new Element(options);

            drawingElement = new d.Element();
            element.drawingElement = drawingElement;
        }

        module("Element", {
            setup: function() {
                elementSetup({
                    foo: "bar",
                    id: "foo"
                });
            }
        });

        test("sets id", function() {
            equal(element.id, "foo");
        });

        test("inits options", function() {
            equal(element.options.foo, "bar");
        });

        test("inits origin size", function() {
            ok(element._originSize instanceof Rect);
        });

        test("inits transformation ", function() {
            ok(element._transform instanceof CompositeTransform);
        });

        test("visible returns drawing element visibility", function() {
            equal(element.visible(), drawingElement.visible());
        });

        test("visible sets drawing element visibility", function() {
            element.visible(false);
            equal(drawingElement.visible(), false);
        });

        test("redraw extends current options", function() {
            element.redraw({
                foo: "baz",
                bar: "bar"
            });
            equal(element.options.foo, "baz");
            equal(element.options.bar, "bar");
        });

        test("redraw sets id", function() {
            element.redraw({
                id: "test"
            });
            equal(element.id, "test");
        });

        test("position returns point with current position", function() {
            var options = element.options;
            options.x = 1;
            options.y = 2;
            var position = element.position();
            ok(position instanceof Point);
            equal(position.x, 1);
            equal(position.y, 2);
        });

        test("position sets new translate position", function() {
            element.position(1, 2);
            var translate = element._transform.translate;
            equal(translate.x, 1);
            equal(translate.y, 2);
        });

        test("position renders new translate position", function() {
            element.position(1, 2);
            var matrix = drawingElement.transform().matrix();
            equal(matrix.e, 1);
            equal(matrix.f, 2);
        });

        test("position sets new translate position when a point is passed as parameter", function() {
            element.position(new Point(1,2));
            var translate = element._transform.translate;
            equal(translate.x, 1);
            equal(translate.y, 2);
        });

        test("position renders new translate position when a point is passed as parameter", function() {
            element.position(new Point(1,2));
            var matrix = drawingElement.transform().matrix();
            equal(matrix.e, 1);
            equal(matrix.f, 2);
        });

        test("position sets position to options", function() {
            var options = element.options;
            element.position(1, 2);
            equal(options.x, 1);
            equal(options.y, 2);
            element.position(new Point(3, 4));
            equal(options.x, 3);
            equal(options.y, 4);
        });

        test("rotate returns current rotation", function() {
            element._transform.rotate = new Rotation(45, 100, 200);
            var rotation = element.rotate();
            equal(rotation.x, 100);
            equal(rotation.y, 200);
            equal(rotation.angle, 45);
        });

        test("rotate sets rotation", function() {
            element.rotate(45, new Point(100, 200));
            var rotation = element._transform.rotate;
            equal(rotation.x, 100);
            equal(rotation.y, 200);
            equal(rotation.angle, 45);
        });

        test("rotate renders rotation", function() {
            element.rotate(45, new Point(100, 200));
            var tolerance = 0.001;
            var matrix = drawingElement.transform().matrix();
            close(matrix.a, 0.707, tolerance);
            close(matrix.b, 0.707, tolerance);
            close(matrix.c, -0.707, tolerance);
            close(matrix.d, 0.707, tolerance);
            close(matrix.e, 170.711, tolerance);
            close(matrix.f, -12.132, tolerance);
        });

        // ------------------------------------------------------------

        var rawRect = new Rect(100, 200, 100, 50)

        module("Element / measure", {
            setup: function() {
                elementSetup({});
                drawingElement.rawBBox = function() {
                    return new g.Rect(new g.Point(100,200), new g.Point(200, 250));
                };
            }
        });

        test("_measure returns raw bounding rect", function() {;
            var rect = element._measure();
            ok(rect.equals(rawRect));
        });

        test("_measure sets origin fields", function() {;
            var rect = element._measure();
            ok(element._originSize.equals(rawRect));
            equal(element._originWidth, 100);
            equal(element._originHeight, 50);
        });

        test("_measure sets _measured to true", function() {;
            var rect = element._measure();
            equal(element._measured, true);
        });

        test("_measure returns current bounding rect if element has been measured", function() {;
            element._measure();
            drawingElement.rawBBox = function() {
                return new g.Rect(new g.Point(50,60), new g.Point(100, 100));
            };
            var rect = element._measure();
            ok(rect.equals(rawRect));
        });

        test("_measure recalculates raw bounding rect if element has been measured but true is passed as parameter", function() {
            element._measure();
            drawingElement.rawBBox = function() {
                return new g.Rect(new g.Point(50,60), new g.Point(100, 100));
            };
            var rect = element._measure(true);
            ok(rect.equals(new Rect(50, 60, 50, 40)));
        });

    })();

})();
