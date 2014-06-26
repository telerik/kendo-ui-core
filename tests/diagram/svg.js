
(function() {
    var dataviz = kendo.dataviz,
        diagram = dataviz.diagram,

        g = dataviz.geometry,
        d = dataviz.drawing,

        Point = diagram.Point,
        Rect = diagram.Rect,
        Rotation = diagram.Rotation,
        CompositeTransform = diagram.CompositeTransform;

    var ShapeMock = d.Element.extend({
        stroke: function(color, width, opacity) {
            var stroke = this.options.stroke = this.options.stroke || {};
            if (color) {
                stroke.color = color;
            }
            if (width) {
                stroke.width = width;
            }
            if (opacity) {
                stroke.opacity = opacity
            }
        },

        fill: function(color, opacity) {
            var fill = this.options.fill = this.options.fill || {};
            if (color) {
                fill.color = color;
            }
            if (opacity) {
                fill.opacity = opacity
            }
        }
    });

    function elementTests(name, type) {
        var element;
        var drawingElement;

        module(name + " / element", {
            setup: function() {
                element = new type({
                    foo: "bar",
                    id: "foo"
                });

                drawingElement = element.drawingElement;
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

        module( name + " / measure", {
            setup: function() {
                element = new type({});

                drawingElement = element.drawingElement;
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
    }

    function visualBaseTests(name, type) {
        var visual;
        var drawingElement;

        module(name + " / VisualBase", {
            setup: function() {
                visual = new type({
                    fill: {
                        color: "red"
                    },
                    stroke: {
                        color: "green"
                    }
                });
            }
        });

        test("inits fill color", function() {
            equal(visual.options.fill.color, new dataviz.Color("red").toHex());
        });

        test("inits stroke color", function() {
            equal(visual.options.stroke.color, new dataviz.Color("green").toHex());
        });

        // ------------------------------------------------------------
        module(name + " / VisualBase / api", {
            setup: function() {
                visual = new type({
                    fill: {
                        color: "blue",
                        opacity: 1
                    },
                    stroke: {
                        color: "blue",
                        width: 1,
                        opacity: 1
                    }
                });
                drawingElement = visual.drawingElement;
            }
        });

        test("fill updates fill options", function() {
            visual.fill("red", 0.5);
            var fill =  visual.options.fill;
            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.5);
        });

        test("fill renders new fill options", function() {
            visual.fill("red", 0.5);
            var fill =  drawingElement.options.fill;
            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.5);
        });

        test("stroke updates stroke options", function() {
            visual.stroke("red", 2, 0.5);
            var stroke =  visual.options.stroke;
            equal(stroke.color, "#ff0000");
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("stroke renders new stroke options", function() {
            visual.stroke("red", 2, 0.5);
            var stroke =  drawingElement.options.stroke;

            equal(stroke.color, "#ff0000");
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("redraw sets fill options", function() {
            visual.redraw({
                fill: {
                    color: "red",
                    opacity: 0.5
                }
            });
            var fill = visual.options.fill;

            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.5);
        });

        test("redraw renders fill options", function() {
            visual.redraw({
                fill: {
                    color: "red",
                    opacity: 0.5
                }
            });
            var fill = drawingElement.options.fill;

            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.5);
        });

        test("redraw does not render fill if no fill options are passed", 0, function() {
            drawingElement.fill = function() {
                ok(false);
            };
            visual.redraw();
        });

        test("redraw sets stroke options", function() {
            visual.redraw({
                stroke: {
                    color: "red",
                    width: 2,
                    opacity: 0.5
                }
            });
            var stroke = visual.options.stroke;

            equal(stroke.color, "#ff0000");
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("redraw renders stroke options", function() {
            visual.redraw({
                stroke: {
                    color: "red",
                    width: 2,
                    opacity: 0.5
                }
            });
            var stroke = drawingElement.options.stroke;

            equal(stroke.color, "#ff0000");
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("redraw does not render stroke if no stroke options are passed", 0, function() {
            drawingElement.stroke = function() {
                ok(false);
            };
            visual.redraw();
        });

        test("_hover renders hover fill if true is passed as parameter and visual has hover fill options", function() {
            visual.options.hover = {
                fill: {
                    color: "#ff0000",
                    opacity: 0.7
                }
            };
            visual._hover(true);
            var fill = drawingElement.options.fill;

            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.7);
        });

        test("_hover does not update fill options", function() {
            visual.options.hover = {
                fill: {
                    color: "red",
                    opacity: 0.7
                }
            };
            visual._hover(true);
            var fill = visual.options.fill;

            equal(fill.color, "#0000ff");
            equal(fill.opacity, 1);
        });

        test("_hover does not render fill if true is passed as parameter but visual has no hover fill options", 0, function() {
            drawingElement.fill = function() {
                ok(false);
            };
            visual._hover(true);
        });

        test("_hover renders visual fill options if false is passed as parameter and visual has hover fill options", function() {
            visual.options.hover = {
                fill: {
                    color: "#ff0000",
                    opacity: 0.7
                }
            };
            drawingElement.fill = function(color, opacity) {
                equal(color, "#0000ff");
                equal(opacity, 1);
            };
            visual._hover(false);
        });

        test("_hover does not render fill if false is passed as parameter and visual has no hover fill options", 0, function() {
            drawingElement.fill = function() {
                ok(false);
            };
            visual._hover(false);
        });
    }

    function visualTests(name, type) {
        var visual;

        module(name + " / Visual", {
            setup: function() {
                visual = new type({});
            }
        });

        test("redraw updates visual position if x and y are passed", function() {
            visual.position = function(x, y) {
                equal(x, 10);
                equal(y, 20);
            };
            visual.redraw({
                x: 10,
                y: 20
            });
        });

        test("redraw does not update visual position if x and y are not passed", 0, function() {
            visual.position = function(x, y) {
                ok(false);
            };
            visual.redraw();
        });

        test("redraw sets visual size if width and height are passed with the options", function() {
            visual.redraw({
                width: 100,
                height: 200
            });

            equal(visual.options.width, 100);
            equal(visual.options.height, 200);
        });

        test("redraw does not set size if width and height are not passed with the options", 0, function() {
            visual.size = function() {
                ok(false);
            };
            visual.redraw();
        });

        test("size sets size", function() {
             visual.size({
                width: 100,
                height: 200
            });

            equal(visual.options.width, 100);
            equal(visual.options.height, 200);
        });

        test("size returns current size", function() {
            visual.options.width = 100;
            visual.options.height = 200;
            var size = visual.size();

            equal(size.width, 100);
            equal(size.height, 200);
        });
    }

    (function() {
        var TextBlock = diagram.TextBlock;
        var textblock;
        var drawingElement;
        var SANS = "sans-serif";
        var ARIAL = "arial";

        module("TextBlock", {
            setup: function() {
                textblock = new TextBlock({
                    color: "red",
                    fontSize: 10,
                    fontFamily: SANS,
                    text: "foo",
                    fill: {
                        opacity: 0.7
                    },
                    stroke: {
                        color: "red",
                        width: 2,
                        opacity: 0.5,
                        dashType: "dotted"
                    }
                });
                drawingElement = textblock.drawingElement;
            }
        });

        test("inits color", function() {
            equal(textblock.options.fill.color, "#ff0000");
        });

        test("inits font", function() {
            equal(textblock.options.font, "10px " + SANS);
        });

        test("sets drawing text", function() {
            equal(drawingElement.content(), "foo");
        });

        test("sets empty string for text if text is undefined", function() {
            textblock = new TextBlock({});
            equal(textblock.drawingElement.content(), "");
        });

        test("sets drawing font", function() {
            equal(drawingElement.options.font, "10px " + SANS);
        });

        test("sets drawing fill", function() {
            var fill = drawingElement.options.fill;
            equal(fill.color, "#ff0000");
            equal(fill.opacity, 0.7);
        });

        test("sets drawing stroke", function() {
            var stroke = drawingElement.options.stroke;
            equal(stroke.color, "#ff0000");
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
            equal(stroke.dashType, "dotted");
        });

        test("content returns drawing text", function() {
            equal(textblock.content(), "foo");
        });

        test("content sets drawing text", function() {
            textblock.content("bar");
            equal(drawingElement.content(), "bar");
        });

        test("redraw sets color", function() {
            textblock.redraw({color: "blue"});
            equal(textblock.options.fill.color, "#0000ff");
        });

        test("redraw renders color", function() {
            textblock.redraw({color: "blue"});
            equal(drawingElement.options.fill.color, "#0000ff");
        });

        test("redraw sets font", function() {
            textblock.redraw({fontFamily: ARIAL});
            equal(textblock.options.font, "10px " + ARIAL);
            textblock.redraw({fontSize: 15});
            equal(textblock.options.font, "15px " + ARIAL);
        });

        test("redraw renders font", function() {
            textblock.redraw({fontFamily: ARIAL});
            equal(drawingElement.options.font, "10px " + ARIAL);
            textblock.redraw({fontSize: 15});
            equal(drawingElement.options.font, "15px " + ARIAL);
        });

        test("redraw renders text", function() {
            textblock.redraw({text: "bar"});
            equal(drawingElement.content(), "bar");
        });

        test("redraw transforms text to fit new width and height", function() {
            textblock.drawingElement.measure = function() {
                return {
                    height: 10,
                    width: 20
                };
            };

            textblock.redraw({
                height: 50,
                width: 200
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 10);
            equal(matrix.d, 5);
        });

        test("redraw transforms text to fit width and height based on new text", function() {
            textblock.drawingElement.measure = function() {
                return {
                    height: 10,
                    width: 20
                };
            };
            textblock.options.width = 200;
            textblock.options.height = 50;

            textblock.redraw({
                text: "bar"
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 10);
            equal(matrix.d, 5);
        });

        test("redraw transforms text to fit width and height based on new font", function() {
            textblock.drawingElement.measure = function() {
                return {
                    height: 10,
                    width: 20
                };
            };
            textblock.options.width = 200;
            textblock.options.height = 50;

            textblock.redraw({
                fontSize: 15
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 10);
            equal(matrix.d, 5);
        });

        test("redraw does not transform text if size has not changed", function() {
            textblock.drawingElement.measure = function() {
                return {
                    height: 10,
                    width: 20
                };
            };
            textblock.options.width = 100;
            textblock.options.height = 50;

            textblock.redraw({
                color: "green"
            });

            equal(drawingElement.transform(), undefined);
        });

        elementTests("TextBlock", TextBlock);
        visualBaseTests("TextBlock", TextBlock);
        visualTests("TextBlock", TextBlock);
    })();

    (function() {
        var Rectangle = diagram.Rectangle;
        var rectangle;
        var drawingElement;


        module("Rectangle", {
            setup: function() {
                rectangle = new Rectangle({
                    width: 200,
                    height: 100
                });
                drawingElement = rectangle.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 0, y: 0}));
            ok(segments[1].anchor.equals({x: 200, y: 0}));
            ok(segments[2].anchor.equals({x: 200, y: 100}));
            ok(segments[3].anchor.equals({x: 0, y: 100}));
            equal(drawingElement.options.closed, true);
        });

        test("updates path", function() {
            rectangle.redraw({
                width: 300,
                height: 50
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 0, y: 0}));
            ok(segments[1].anchor.equals({x: 300, y: 0}));
            ok(segments[2].anchor.equals({x: 300, y: 50}));
            ok(segments[3].anchor.equals({x: 0, y: 50}));
        });

        test("triggers geometry change once on update", 1, function() {
            drawingElement.geometryChange = function() {
                ok(true);
            };
            rectangle.redraw({
                width: 300,
                height: 50
            });
        });

        test("does not trigger geometry change if width and height are not changed", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            rectangle.redraw({
                stroke: {
                    color: "green"
                }
            });
        });

        elementTests("Rectangle", Rectangle);
        visualBaseTests("Rectangle", Rectangle);
        visualTests("Rectangle", Rectangle);
    })();

    (function() {
        var Path = diagram.Path;
        var path;
        var drawingElement;


        module("Path", {
            setup: function() {
                path = new Path({
                    data: "M100,100L200,200",
                    width: 300,
                    height: 200
                });
                drawingElement = path.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.paths[0].segments;
            ok(segments[0].anchor.equals({x: 100, y: 100}));
            ok(segments[1].anchor.equals({x: 200, y: 200}));
        });

        test("inits transformation", function() {
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 3);
            equal(matrix.d, 2);
        });

        test("does not init transformation if path has not width and heigth", function() {
            path = new Path({
                data: "M100,100L200,200"
            });
            equal(path.drawingElement.transform(), undefined);
        });

        test("redraw updates path", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var segments = drawingElement.paths[0].segments;
            ok(segments[0].anchor.equals({x: 100, y: 100}));
            ok(segments[1].anchor.equals({x: 300, y: 200}));
        });

        test("redraw triggers geometry change once", 1, function() {
            drawingElement.geometryChange = function() {
                ok(true);
            };
            path.redraw({
                data: "M100,100L300,200"
            });
        });

        test("redraw does not trigger geometry change if no data is passed", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            path.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        test("redraw does not trigger geometry change if passed data is the same", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            path.redraw({
                data: "M100,100L200,200"
            });
        });

        test("redraw updates transformation", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 1.5);
            equal(matrix.d, 2);
        });

        test("redraw updates transformation", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 1.5);
            equal(matrix.d, 2);
        });

        test("redraw updates transformation if width and height are passed", function() {
            path.redraw({
                width: 200,
                height: 300
            });
            var matrix = drawingElement.transform().matrix();
            equal(matrix.a, 2);
            equal(matrix.d, 3);
        });

        elementTests("Path", Path);
        visualBaseTests("Path", Path);
        visualTests("Path", Path);
    })();

    (function() {
        var Line = diagram.Line;
        var line;
        var drawingElement;


        module("Line", {
            setup: function() {
                line = new Line({
                    from: new Point(10, 20),
                    to: new Point(20, 40)
                });
                drawingElement = line.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 10, y: 20}));
            ok(segments[1].anchor.equals({x: 20, y: 40}));
        });

        test("redraw updates path if from point is passed", function() {
            line.redraw({
                from: new Point(5, 25)
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 5, y: 25}));
            ok(segments[1].anchor.equals({x: 20, y: 40}));
        });

        test("redraw updates path if to point is passed", function() {
            line.redraw({
                to: new Point(30, 50)
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 10, y: 20}));
            ok(segments[1].anchor.equals({x: 30, y: 50}));
        });

        test("redraw triggers geometry change once", 1, function() {
            drawingElement.geometryChange = function() {
                ok(true);
            };
            line.redraw({
                from: new Point(5, 25),
                to: new Point(30, 50)
            });
        });

        test("redraw dose not trigger geometry change if from or to are not passed", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            line.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        elementTests("Line", Line);
        visualBaseTests("Line", Line);
    })();

    (function() {
        var Polyline = diagram.Polyline;
        var polyline;
        var drawingElement;


        module("Polyline", {
            setup: function() {
                polyline = new Polyline({
                    points: [
                        new Point(10, 20),
                        new Point(30, 40),
                        new Point(15, 10)
                    ]
                });
                drawingElement = polyline.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor.equals({x: 10, y: 20}));
            ok(segments[1].anchor.equals({x: 30, y: 40}));
            ok(segments[2].anchor.equals({x: 15, y: 10}));
        });

        test("redraw updates path", function() {
            polyline.redraw({
                points: [new Point(15, 30), new Point(35, 35)]
            });
            var segments = drawingElement.segments;
            equal(segments.length, 2);
            ok(segments[0].anchor.equals({x: 15, y: 30}));
            ok(segments[1].anchor.equals({x: 35, y: 35}));
        });

        test("redraw trigger geometry change once", 1, function() {
                drawingElement.geometryChange = function() {
                ok(true);
            };
            polyline.redraw({
                points: [new Point(15, 30), new Point(35, 35)]
            });
        });

        test("redraw dose not trigger geometry change if points are not passed ", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            polyline.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        elementTests("Polyline", Polyline);
        visualBaseTests("Polyline", Polyline);
    })();

    (function() {
        var Image = diagram.Image;
        var image;
        var drawingElement;

        module("Image", {
            setup: function() {
                image = new Image({
                    source: "foo",
                    x: 10,
                    y: 10,
                    width: 30,
                    height: 40
                });
                drawingElement = image.drawingElement;
            }
        });

        test("inits source", function() {
            equal(drawingElement.src(), "foo");
        });

        test("inits rectangle", function() {
            var rect = drawingElement.rect();
            ok(rect.p0.equals({x: 10, y: 10}));
            ok(rect.p1.equals({x: 40, y: 50}));
        });

        test("redraw updates source", function() {
            image.redraw({
                source: "bar"
            });
            equal(drawingElement.src(), "bar");
        });

        test("redraw updates rectangle", function() {
            image.redraw({
                width: 100,
                height:  50,
                x: 50,
                y: 50
            });
            var rect = drawingElement.rect();
            ok(rect.p0.equals({x: 50, y: 50}));
            ok(rect.p1.equals({x: 150, y: 100}));
        });

        test("redraw triggers geometry change once", 1, function() {
            drawingElement.geometryChange = function() {
                ok(true);
            };
            image.redraw({
                width: 100,
                height:  50,
                x: 50,
                y: 50
            });
        });

        test("redraw does not trigger geometry change if non of the x, y, width, height options are passed", 0, function() {
            drawingElement.geometryChange = function() {
                ok(false);
            };
            image.redraw();
        });

        elementTests("Image", Image);
    })();


    (function() {
        var Circle = diagram.Circle;
        var circle;
        var circleGeometry;
        var drawingElement;

        module("Circle", {
            setup: function() {
                circle = new Circle({
                    center: {
                        x: 30,
                        y: 40
                    },
                    radius: 10
                });
                drawingElement = circle.drawingElement;
                circleGeometry = drawingElement.geometry;
            }
        });

        test("inits circle", function() {
            equal(circleGeometry.getRadius(), 10);
            equal(circleGeometry.center.x, 30);
            equal(circleGeometry.center.y, 40);
        });

        test("redraw updates circle radius", function() {
            circle.redraw({
                radius: 20
            });
            equal(circleGeometry.getRadius(), 20);
        });

        test("redraw updates circle center", function() {
            circle.redraw({
                center: {
                    x: 5,
                    y: 10
                }
            });
            equal(circleGeometry.center.x, 5);
            equal(circleGeometry.center.y, 10);
        });

        test("redraw updates circle center x or y", function() {
            circle.redraw({
                center: {
                    x: 5
                }
            });
            equal(circleGeometry.center.x, 5);
            equal(circleGeometry.center.y, 40);

            circle.redraw({
                center: {
                    y: 5
                }
            });
            equal(circleGeometry.center.x, 5);
            equal(circleGeometry.center.y, 5);
        });

        elementTests("Circle", Circle);
        visualBaseTests("Circle", Circle);
    })();

    (function() {
        var Group = diagram.Group;
        var group;
        var drawingElement;

        module("Group", {
            setup: function() {
                group = new Group();
                drawingElement = group.drawingElement;
            }
        });

        test("inits group", function() {
            ok(drawingElement);
        });

        test("appends visual drawing element", function() {
            var childGroup = new Group();
            group.append(childGroup);
            ok(childGroup.drawingElement === drawingElement.children[0]);
        });

        test("removes visual drawing element", function() {
            var childGroup = new Group();
            group.append(childGroup);
            group.remove(childGroup);
            equal(drawingElement.children.length, 0);
        });

        test("clear clears children", function() {
            group.append(new Group());
            group.append(new Group());
            group.clear();
            equal(drawingElement.children.length, 0);
        });

        test("redraw transforms group to fit specified width and height", function() {
            var rect = new diagram.Rectangle({width: 100, height: 100});
            group.append(rect);
            group.redraw({
                width: 200,
                height: 300
            });

            var matrix = group.drawingElement.transform().matrix();
            equal(matrix.a, 2);
            equal(matrix.d, 3);
        });

        // ------------------------------------------------------------
        var child1;
        var child2;
        var child3;

        module("Group / reordering", {
            setup: function() {
                group = new Group();
                child1 = new Group();
                child2 = new Group();
                child3 = new Group();

                group.append(child1);
                group.append(child2);
                group.append(child3);

                drawingElement = group.drawingElement;
            }
        });

        test("toFront moves elements to the end", function() {
            group.toFront([child1, child2]);
            ok(child1.drawingElement === drawingElement.children[1]);
            ok(child2.drawingElement === drawingElement.children[2]);
        });

        test("toBack moves elements to the start", function() {
            group.toBack([child3, child2]);
            ok(child2.drawingElement === drawingElement.children[0]);
            ok(child3.drawingElement === drawingElement.children[1]);
        });

        test("toIndex moves elements to the specified indices", function() {
            group.toIndex([child3, child2], [0, 1]);

            ok(child3.drawingElement === drawingElement.children[0]);
            ok(child2.drawingElement === drawingElement.children[1]);
        });

        elementTests("Group", Group);
    })();

    (function() {
        var Canvas = diagram.Canvas;
        var drawingElement;
        var element;
        var canvas;

        module("Canvas", {
            setup: function() {
                element = $("<div></div>").appendTo(QUnit.fixture);

                canvas = new Canvas(element[0], {
                    width: 500,
                    height: 300
                });
                drawingElement = canvas.drawingElement;
            },

            teardown: function() {
                element.remove();
            }
        });

        test("inits surface", function() {
            ok(canvas.surface);
        });

        test("inits container", function() {
            ok(drawingElement instanceof d.Group);
        });

        test("inits viewBox", function() {
            var viewBox = canvas._viewBox;
            equal(viewBox.x, 0);
            equal(viewBox.y, 0);
            equal(viewBox.width, 500);
            equal(viewBox.height, 300);
        });

        test("bounds returns rect with container bounding box width and height", function() {
            canvas.drawingElement.bbox = function() {
                return new Rect(50,50, 100, 200);
            };
            var rect = canvas.bounds();
            equal(rect.x, 0);
            equal(rect.y, 0);
            equal(rect.width, 100);
            equal(rect.height, 200);
        });

        test("viewBox sets viewBox x and y options", function() {
            canvas.viewBox(new Rect(100, 200, 300, 300));
            var viewBox = canvas._viewBox;
            equal(viewBox.x, 100);
            equal(viewBox.y, 200);
        });

        test("viewBox returns viewBox", function() {
            var viewBox = canvas.viewBox();
            equal(viewBox.x, 0);
            equal(viewBox.y, 0);
            equal(viewBox.width, 500);
            equal(viewBox.height, 300);
        });

        test("size sets viewBox size", function() {
            var viewBox = canvas._viewBox;
            canvas.size({
                width: 100,
                height: 200
            });
            equal(viewBox.width, 100);
            equal(viewBox.height, 200);
        });

        test("size returns viewBox size", function() {
            var size = canvas.size();

            equal(size.width, 500);
            equal(size.height, 300);
        });

        test("draw draws container to surface", function() {
            canvas.surface.draw = function() {
                ok(true);
            };
            canvas.draw();
        });

        test("append appends visual drawingElement to container", function() {
            drawingElement.append = function(drawing) {
                equal(drawing.id, "foo");
            };
            canvas.append({
                drawingElement: {
                    id: "foo"
                }
            });
        });

        test("removes removes visual drawingElement from container", function() {
            drawingElement.remove = function(drawing) {
                equal(drawing.id, "foo");
            };
            canvas.remove({
                drawingElement: {
                    id: "foo"
                }
            });
        });

        test("clear clears container", function() {
            drawingElement.clear = function(drawing) {
                ok(true);
            };
            canvas.clear();
        });

        test("destroy destroys surface", function() {
            canvas.surface.destroy = function() {
                ok(true);
            };
            canvas.destroy();
        });

        test("destroy does not remove element", function() {
            canvas.destroy();
            ok(!QUnit.fixture.is(":empty"));
        });

        test("destroy removes element if true is passed as parameter", function() {
            canvas.destroy(true);
            ok(QUnit.fixture.is(":empty"));
        });

    })();

})();
