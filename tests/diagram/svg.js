
(function() {
    var dataviz = kendo.dataviz,
        diagram = dataviz.diagram,
        deepExtend = kendo.deepExtend,

        g = kendo.geometry,
        d = kendo.drawing,

        Point = diagram.Point,
        Rect = diagram.Rect,
        Rotation = diagram.Rotation,
        CompositeTransform = diagram.CompositeTransform,

        TOLERANCE = 0.1;

    function elementTests(name, type) {
        var element;
        var drawingElement;

        module(name + " / element", {
            setup: function() {
                element = new type({
                    foo: "bar",
                    id: "foo"
                });

                drawingElement = element.drawingContainer();
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
                element._boundingBox = function() {
                    return new g.Rect(new g.Point(100, 200), new g.Size(100, 50));
                };

                drawingElement = element.drawingElement;
            }
        });

        test("_measure returns bounding box", function() {;
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

        test("_measure returns current bounding box if element has been measured", function() {;
            element._measure();
            element._boundingBox = function() {
                return new g.Rect(new g.Point(50, 60), new g.Size(50, 40));
            };
            var rect = element._measure();
            ok(rect.equals(rawRect));
        });

        test("_measure recalculates bounding box if element has been measured but true is passed as parameter", function() {
            element._measure();
            element._boundingBox = function() {
                return new g.Rect(new g.Point(50, 60), new g.Size(50, 40));
            };
            var rect = element._measure(true);
            ok(rect.equals(new Rect(50, 60, 50, 40)));
        });
    }

    function visualBaseTests(name, type) {
        var visual;
        var drawingElement;
        var RED = "red";
        var GREEN = "green";
        var redHex = new d.Color(RED).toHex();
        var greenHex = new d.Color(GREEN).toHex();

        module(name + " / VisualBase", {
            setup: function() {
                visual = new type({
                    fill: {
                        color: RED
                    },
                    stroke: {
                        color: GREEN
                    }
                });
            }
        });

        test("inits fill color", function() {
            equal(visual.options.fill.color, redHex);
        });

        test("inits fill color if fill is a string", function() {
            visual = new type({
                fill: RED
            });
            equal(visual.options.fill.color, redHex);
        });

        test("inits stroke color", function() {
            equal(visual.options.stroke.color, greenHex);
        });

        test("inits stroke color if stroke is a string", function() {
            visual = new type({
                stroke: RED
            });
            equal(visual.options.stroke.color, redHex);
        });

        // ------------------------------------------------------------
        module(name + " / VisualBase / api", {
            setup: function() {
                visual = new type({
                    fill: {
                        color: GREEN,
                        opacity: 1
                    },
                    stroke: {
                        color: GREEN,
                        width: 1,
                        opacity: 1
                    }
                });
                drawingElement = visual.drawingElement;
            }
        });

        test("fill updates fill options", function() {
            visual.fill(RED, 0.5);
            var fill =  visual.options.fill;
            equal(fill.color, redHex);
            equal(fill.opacity, 0.5);
        });

        test("fill renders new fill options", function() {
            visual.fill(RED, 0.5);
            var fill =  drawingElement.options.fill;
            equal(fill.color, redHex);
            equal(fill.opacity, 0.5);
        });

        test("stroke updates stroke options", function() {
            visual.stroke(RED, 2, 0.5);
            var stroke =  visual.options.stroke;
            equal(stroke.color, redHex);
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("stroke renders new stroke options", function() {
            visual.stroke(RED, 2, 0.5);
            var stroke =  drawingElement.options.stroke;

            equal(stroke.color, redHex);
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("redraw sets fill options", function() {
            visual.redraw({
                fill: {
                    color: RED,
                    opacity: 0.5
                }
            });
            var fill = visual.options.fill;

            equal(fill.color, redHex);
            equal(fill.opacity, 0.5);
        });

        test("redraw sets fill color if fill is passed as string", function() {
            visual.redraw({
                fill: RED
            });
            var fill = visual.options.fill;

            equal(fill.color, redHex);
        });

        test("redraw renders fill options", function() {
            visual.redraw({
                fill: {
                    color: RED,
                    opacity: 0.5
                }
            });
            var fill = drawingElement.options.fill;

            equal(fill.color, redHex);
            equal(fill.opacity, 0.5);
        });

        test("redraw renders fill color if fill is passed as string", function() {
            visual.redraw({
                fill: RED
            });
            var fill = drawingElement.options.fill;

            equal(fill.color, redHex);
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
                    color: RED,
                    width: 2,
                    opacity: 0.5
                }
            });
            var stroke = visual.options.stroke;

            equal(stroke.color, redHex);
            equal(stroke.width, 2);
            equal(stroke.opacity, 0.5);
        });

        test("redraw sets stroke color if stroke is passed as string", function() {
            visual.redraw({
                stroke: RED
            });
            var stroke = visual.options.stroke;

            equal(stroke.color, redHex);
        });

        test("redraw renders stroke options", function() {
            visual.redraw({
                stroke: {
                    color: RED,
                    width: 2,
                    opacity: 0.5
                }
            });
            var stroke = drawingElement.options.stroke;

            equal(stroke.color, redHex);
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
                    color: RED,
                    opacity: 0.7
                }
            };
            visual._hover(true);
            var fill = drawingElement.options.fill;

            equal(fill.color, redHex);
            equal(fill.opacity, 0.7);
        });

        test("_hover does not update fill options", function() {
            visual.options.hover = {
                fill: {
                    color: RED,
                    opacity: 0.7
                }
            };
            visual._hover(true);
            var fill = visual.options.fill;

            equal(fill.color, greenHex);
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
                    color: RED,
                    opacity: 0.7
                }
            };
            drawingElement.fill = function(color, opacity) {
                equal(color, greenHex);
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

    function autoSizableTests(name, type) {
        var element;
        var matrix, translate, scale;
        var drawingContainer;
        var prototypeBoundingBox = type.fn._boundingBox;
        var defaultScaleY = 100 / 60;
        var defaultScaleX = 100 / 50;

        module(name + " / autosize", {
            setup: function() {
                type.fn._boundingBox = function() {
                    return new g.Rect(new g.Point(10, 20), new g.Size(50, 60));
                };

                element = new type({
                    autoSize: true,
                    x: 10,
                    y: 20,
                    width: 100,
                    height: 100
                });

                translate =  element._transform.translate;
                scale = element._transform.scale;
                drawingContainer = element.drawingContainer();
                if (drawingContainer.transform()) {
                    matrix = drawingContainer.transform().matrix();
                }
            },

            teardown: function() {
                type.fn._boundingBox = prototypeBoundingBox;
            }
        });

        test("inits position", function() {
            equal(translate.x, 10);
            equal(translate.y, 20);
        });

        test("renders initial position", function() {
            equal(matrix.e, 10);
            equal(matrix.f, 20);
        });

        test("inits scale", function() {
            equal(scale.x, defaultScaleX);
            equal(scale.y, defaultScaleY);
        });

        test("renders initial scale", function() {
            equal(matrix.a, defaultScaleX);
            equal(matrix.d, defaultScaleY);
        });

        test("does not init scale if autoSize is set to false", function() {
            element = new type({
                x: 10,
                y: 20,
                width: 100,
                height: 100,
                autoSize: false
            });
            scale = element._transform.scale;
            ok(!scale);
        });

        test("does not render scale if autoSize is set to false", function() {
            element = new type({
                x: 10,
                y: 20,
                width: 100,
                height: 100,
                autoSize: false
            });
            equal(element.drawingContainer().transform().matrix().a, 1);
            equal(element.drawingContainer().transform().matrix().d, 1);
        });


        test("does not render transformation if element has not x,y,width or height options", function() {
            element = new type({});
            ok(!element.drawingContainer().transform());
        });

        test("redraw renders new position if new value is passed for x or y", function() {
            element.redraw({
                x: 20
            });
            equal(drawingContainer.transform().matrix().e, 20);

            element.redraw({
                y: 30
            });
            equal(drawingContainer.transform().matrix().f, 30);
        });

        test("redraw does not render scale if autoSize is set to false", function() {
            element = new type({
                width: 100,
                height: 100,
                x: 10,
                y: 10,
                autoSize: false
            });
            element.redraw({
                width: 300,
                height: 300
            });
            equal(element.drawingContainer().transform().matrix().a, 1);
            equal(element.drawingContainer().transform().matrix().d, 1);
        });

        test("redraw does not render transformation if x and y are not changed", 0, function() {
            drawingContainer.transform = function() {
                ok(false);
            };
            element.redraw({});
            element.redraw({
                x: 10,
                y: 20
            });
        });

        test("redraw renders new scale if new value is passed for width or height", function() {
            element.redraw({
                width: 80
            });
            equal(drawingContainer.transform().matrix().a, 80 / 50);

            element.redraw({
                height: 80
            });
            equal(drawingContainer.transform().matrix().d, 80 / 60);
        });

        test("redraw does not render transformation if width and height are not changed", 0, function() {
            drawingContainer.transform = function() {
                ok(false);
            };
            element.redraw({});
            element.redraw({
                width: 100,
                height: 100
            });
        });
    }

    function markerPathTests(name, createElement) {
        var Markers = diagram.Markers;
        var ArrowMarker = diagram.ArrowMarker;
        var CircleMarker = diagram.CircleMarker;
        var element, markers;
        var drawingContainer;

        function setupMarkerPath(options) {
            element = createElement(options);
            markers = element._markers;
            drawingContainer = element.drawingContainer();
        }

        function positionedMarker(marker) {
            return marker.drawingElement.transform() !== undefined;
        }

        module(name + " / markers", {
            setup: function() {
                setupMarkerPath({
                    startCap: Markers.filledCircle,
                    endCap: Markers.arrowEnd
                });
            }
        });

        test("creates markers", function() {
            ok(markers["start"] instanceof CircleMarker);
            ok(markers["end"] instanceof ArrowMarker);
        });

        test("appends markers to container", function() {
            ok($.inArray(markers["start"].drawingElement, drawingContainer.children) >= 0);
            ok($.inArray(markers["end"].drawingElement,drawingContainer.children) >= 0);
        });

        test("sets markers position", function() {
            equal(markers["start"].options.position, "start");
            equal(markers["end"].options.position, "end");
        });

        test("positions markers", function() {
            ok(positionedMarker(markers["start"]));
            ok(positionedMarker(markers["end"]));
        });

        module(name + " / markers / redraw / existing", {
            setup: function() {
                setupMarkerPath({
                    startCap: Markers.filledCircle,
                    endCap: Markers.arrowEnd
                });
            }
        });

        test("removes markers if none is set as cap", function() {
            element.redraw({
                startCap: Markers.none,
                endCap: Markers.none
            });
            ok(!markers["start"]);
            ok(!markers["end"]);
            equal(drawingContainer.children.length, 1);
        });

        test("recreates markers if new cap type is set", function() {
            element.redraw({
                startCap: Markers.arrowStart,
                endCap: Markers.filledCircle
            });

            ok(markers["start"] instanceof ArrowMarker);
            ok(markers["end"] instanceof CircleMarker);
        });

        test("removes old markers if markers are recreated", function() {
            element.redraw({
                startCap: Markers.arrowStart,
                endCap: Markers.filledCircle
            });

            equal(drawingContainer.children.length, 3);
        });

        test("positions markers", function() {
            element.redraw({
                startCap: Markers.arrowStart,
                endCap: Markers.filledCircle
            });
            ok(positionedMarker(markers["start"]));
            ok(positionedMarker(markers["end"]));
        });

        module(name + " / markers / redraw / new", {
            setup: function() {
                setupMarkerPath({});
            }
        });

        test("creates markers", function() {
            element.redraw({
                startCap: Markers.filledCircle,
                endCap: Markers.arrowEnd
            });
            ok(markers["start"] instanceof CircleMarker);
            ok(markers["end"] instanceof ArrowMarker);
        });

        test("does not create markers if type is set to none", function() {
            element.redraw({
                startCap: Markers.none,
                endCap: Markers.none
            });
            ok(!markers["start"]);
            ok(!markers["end"]);
            equal(drawingContainer.children.length, 1);
        });

        test("appends markers to container", function() {
            element.redraw({
                startCap: Markers.filledCircle,
                endCap: Markers.arrowEnd
            });
            ok($.inArray(markers["start"].drawingElement, drawingContainer.children) >= 0);
            ok($.inArray(markers["end"].drawingElement, drawingContainer.children) >= 0);
        });

        test("sets markers position", function() {
            element.redraw({
                startCap: Markers.filledCircle,
                endCap: Markers.arrowEnd
            });
            equal(markers["start"].options.position, "start");
            equal(markers["end"].options.position, "end");
        });

        test("positions markers", function() {
            element.redraw({
                startCap: Markers.arrowStart,
                endCap: Markers.filledCircle
            });

            ok(positionedMarker(markers["start"]));
            ok(positionedMarker(markers["end"]));
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

        test("does not set stroke if width is 0", function() {
            textblock = new TextBlock({
                text: "foo",
                stroke: {
                    color: "red",
                    width: 0
                }
            });
            drawingElement = textblock.drawingElement;
            ok(drawingElement.options.stroke === null);
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
        autoSizableTests("TextBlock", TextBlock);
    })();

    (function() {
        var Rectangle = diagram.Rectangle;
        var rectangle;
        var drawingElement;

        module("Rectangle", {
            setup: function() {
                rectangle = new Rectangle({
                    width: 200,
                    height: 100,
                    x: 5,
                    y: 10
                });
                drawingElement = rectangle.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 0, y: 0}));
            ok(segments[1].anchor().equals({x: 200, y: 0}));
            ok(segments[2].anchor().equals({x: 200, y: 100}));
            ok(segments[3].anchor().equals({x: 0, y: 100}));
            equal(drawingElement.options.closed, true);
        });

        test("inits position", function() {
            var container = rectangle.drawingContainer();
            var matrix = container.transform().matrix();
            equal(matrix.e, 5);
            equal(matrix.f, 10);
        });

        test("updates path", function() {
            rectangle.redraw({
                width: 300,
                height: 50
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 0, y: 0}));
            ok(segments[1].anchor().equals({x: 300, y: 0}));
            ok(segments[2].anchor().equals({x: 300, y: 50}));
            ok(segments[3].anchor().equals({x: 0, y: 50}));
        });

        test("updates position", function() {
            rectangle.redraw({
                x: 100,
                y: 50
            });
            var container = rectangle.drawingContainer();
            var matrix = container.transform().matrix();
            equal(matrix.e, 100);
            equal(matrix.f, 50);
        });

        test("triggers geometry change once on update", 1, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            rectangle.redraw({
                width: 300,
                height: 50
            });
        });

        test("does not trigger geometry change if width or height are not changed", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });

            rectangle.redraw({
                width: 200,
                height: 100
            });
        });

        test("updates transformation once", 1, function() {
            var container = rectangle.drawingContainer();
            container.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "transform");
                }
            });

            rectangle.redraw({
                x: 10,
                y: 15
            });
        });

        test("does not update transformation if x and y are the same", 0, function() {
            var container = rectangle.drawingContainer();
            container.addObserver({
                optionsChange: function(e) {
                    ok(false);
                }
            });

            rectangle.redraw({
                x: 5,
                y: 10
            });
        });

        elementTests("Rectangle", Rectangle);
        visualBaseTests("Rectangle", Rectangle);
    })();

    (function() {
        var Path = diagram.Path;
        var path;
        var drawingElement;
        var drawingContainer;

        function createPath(options) {
            var path = new Path(deepExtend({
                data: "M100,100L200,200"
            }, options));
            return path;
        }

        module("Path", {
            setup: function() {
                path = createPath({
                    width: 300,
                    height: 200
                });

                drawingElement = path.drawingElement;
                drawingContainer = path.drawingContainer();
            }
        });

        test("inits path", function() {
            var segments = drawingElement.paths[0].segments;
            ok(segments[0].anchor().equals({x: 100, y: 100}));
            ok(segments[1].anchor().equals({x: 200, y: 200}));
        });

        test("inits container", function() {
            ok(drawingContainer instanceof d.Group);
            equal($.inArray(drawingElement, drawingContainer.children), 0);
        });

        test("inits transformation", function() {
            var matrix = drawingContainer.transform().matrix();
            equal(matrix.a, 3);
            equal(matrix.d, 2);
        });

        test("does not init transformation if path has no width and heigth", function() {
            path = createPath();
            equal(path.drawingContainer().transform(), undefined);
        });

        test("redraw redraws path", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var segments = path.drawingElement.paths[0].segments;
            ok(segments[0].anchor().equals({x: 100, y: 100}));
            ok(segments[1].anchor().equals({x: 300, y: 200}));
        });

        test("redrawing the path triggers geometry change once", 1, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            path.redraw({
                data: "M100,100L300,200"
            });
        });

        test("redraw does not redraw path if no data is passed", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });
            path.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        test("redraw does not redraw path if passed data is the same", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });
            path.redraw({
                data: "M100,100L200,200"
            });
        });

        test("redraw updates transformation", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var matrix = drawingContainer.transform().matrix();
            equal(matrix.a, 1.5);
            equal(matrix.d, 2);
        });

        test("redraw updates transformation", function() {
            path.redraw({
                data: "M100,100L300,200"
            });
            var matrix = drawingContainer.transform().matrix();
            equal(matrix.a, 1.5);
            equal(matrix.d, 2);
        });

        test("redraw updates transformation if width and height are passed", function() {
            path.redraw({
                width: 200,
                height: 300
            });
            var matrix = drawingContainer.transform().matrix();
            equal(matrix.a, 2);
            equal(matrix.d, 3);
        });

        // ------------------------------------------------------------
        module("Path / markers / empty path", {
            setup: function() {
                path = createPath({
                    data: "",
                    startCap: diagram.Markers.filledCircle,
                    endCap: diagram.Markers.arrowStart
                });

                drawingElement = path.drawingElement;
                drawingContainer = path.drawingContainer();
            }
        });

        test("does not create markers if path is empty", function() {
            ok(!path._markers["start"]);
            ok(!path._markers["end"]);
        });

        test("does not create markers if path is not set on redraw", function() {
            path.redraw({
                stroke:  {
                    color: "red"
                }
            });
            ok(!path._markers["start"]);
            ok(!path._markers["end"]);
        });

        test("creates markers if path is set on redraw", function() {
            path.redraw({
                data:  "M100,100L300,200"
            });
            ok(path._markers["start"]);
            ok(path._markers["end"]);
        });

        elementTests("Path", Path);
        visualBaseTests("Path", Path);
        autoSizableTests("Path", Path);
        markerPathTests("Path", createPath);
    })();

    (function() {
        var Line = diagram.Line;
        var line;
        var drawingElement;

        function createLine(options) {
            return new Line(deepExtend({
                from: new Point(10, 20),
                to: new Point(20, 40)
            }, options));
        }

        module("Line", {
            setup: function() {
                line = createLine();
                drawingElement = line.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 10, y: 20}));
            ok(segments[1].anchor().equals({x: 20, y: 40}));
        });

        test("redraw updates path if from point is passed", function() {
            line.redraw({
                from: new Point(5, 25)
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 5, y: 25}));
            ok(segments[1].anchor().equals({x: 20, y: 40}));
        });

        test("redraw updates path if to point is passed", function() {
            line.redraw({
                to: new Point(30, 50)
            });
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 10, y: 20}));
            ok(segments[1].anchor().equals({x: 30, y: 50}));
        });

        test("redraw triggers geometry change once", 1, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            line.redraw({
                from: new Point(5, 25),
                to: new Point(30, 50)
            });
        });

        test("redraw dose not trigger geometry change if from or to are not passed", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });

            line.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        elementTests("Line", Line);
        visualBaseTests("Line", Line);
        markerPathTests("Line", createLine);
    })();

    (function() {
        var Polyline = diagram.Polyline;
        var polyline;
        var drawingElement;

        function createPolyline(options) {
            var polyline = new Polyline(deepExtend({
                points: [
                    new Point(10, 20),
                    new Point(30, 40),
                    new Point(15, 10)
                ]
            }, options));
            return polyline;
        }

        module("Polyline", {
            setup: function() {
                polyline = createPolyline();
                drawingElement = polyline.drawingElement;
            }
        });

        test("inits path", function() {
            var segments = drawingElement.segments;
            ok(segments[0].anchor().equals({x: 10, y: 20}));
            ok(segments[1].anchor().equals({x: 30, y: 40}));
            ok(segments[2].anchor().equals({x: 15, y: 10}));
        });

        test("redraw updates path", function() {
            polyline.redraw({
                points: [new Point(15, 30), new Point(35, 35)]
            });
            var segments = drawingElement.segments;
            equal(segments.length, 2);
            ok(segments[0].anchor().equals({x: 15, y: 30}));
            ok(segments[1].anchor().equals({x: 35, y: 35}));
        });

        test("redraw triggers geometry change once", 1, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            polyline.redraw({
                points: [new Point(15, 30), new Point(35, 35)]
            });
        });

        test("redraw dose not trigger geometry change if points are not passed ", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });

            polyline.redraw({
                stroke: {
                    color: "red"
                }
            });
        });

        test("redraw dose not trigger geometry change if points are the same ", 0, function() {
            drawingElement.addObserver({
                geometryChange: function() {
                    ok(false);
                }
            });

            polyline.redraw({
                points: [
                    new Point(10, 20),
                    new Point(30, 40),
                    new Point(15, 10)
                ]
            });
        });

        // ------------------------------------------------------------
        module("PolyLine / markers / empty path", {
            setup: function() {
                polyline = createPolyline({
                    points: [],
                    startCap: diagram.Markers.filledCircle,
                    endCap: diagram.Markers.arrowStart
                });

                drawingElement = polyline.drawingElement;
                drawingContainer = polyline.drawingContainer();
            }
        });

        test("does not create markers if no points", function() {
            ok(!polyline._markers["start"]);
            ok(!polyline._markers["end"]);
        });

        test("does not create markers if no points are set on redraw", function() {
            polyline.redraw({
                stroke:  {
                    color: "red"
                }
            });
            ok(!polyline._markers["start"]);
            ok(!polyline._markers["end"]);
        });

        test("creates markers if points are set on redraw", function() {
            polyline.redraw({
               points: [
                    new Point(10, 20),
                    new Point(30, 40),
                    new Point(15, 10)
                ]
            });
            ok(polyline._markers["start"]);
            ok(polyline._markers["end"]);
        });

        elementTests("Polyline", Polyline);
        visualBaseTests("Polyline", Polyline);
        markerPathTests("Polyline", createPolyline);
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
            ok(rect.origin.equals({x: 10, y: 10}));
            ok(rect.size.equals({width: 30, height: 40}));
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
            ok(rect.origin.equals({x: 50, y: 50}));
            ok(rect.size.equals({width: 100, height: 50}));
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
                circleGeometry = drawingElement.geometry();
            }
        });

        test("inits circle", function() {
            equal(circleGeometry.getRadius(), 10);
            equal(circleGeometry.center.x, 30);
            equal(circleGeometry.center.y, 40);
        });

        test("inits center based on radius if center is not set", function() {
            circle = new Circle({
                radius: 20
            });
            circleGeometry = circle.drawingElement.geometry();
            equal(circleGeometry.center.x, 20);
            equal(circleGeometry.center.y, 20);
        });

        test("inits center and radius based on width or height if radius and center are not set", function() {
            circle = new Circle({
                width: 100
            });
            circleGeometry = circle.drawingElement.geometry();
            equal(circleGeometry.getRadius(), 50);
            equal(circleGeometry.center.x, 50);
            equal(circleGeometry.center.y, 50);
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
        autoSizableTests("Circle", Circle);
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

        test("inits children", function() {
            ok($.isArray(group.children));
        });

        test("appends visual", function() {
            var childGroup = new Group();
            group.append(childGroup);
            ok(group.children[0] === childGroup);
        });

        test("appends visual drawingContainer element", function() {
            var childGroup = new Group();
            group.append(childGroup);
            ok(childGroup.drawingContainer() === drawingElement.children[0]);
        });

        test("removes visual", function() {
            var childGroup = new Group();
            group.append(childGroup);
            group.remove(childGroup);
            equal(drawingElement.children.length, 0);
        });

        test("removes visual drawingContainer element", function() {
            var childGroup = new Group();
            group.append(childGroup);
            group.remove(childGroup);
            equal(drawingElement.children.length, 0);
        });

        test("does not change children if visual is not from children", function() {
            var childGroup = new Group();
            var notChild = new Group();
            group.append(childGroup);
            group._childrenChange = false;

            group.remove(notChild);
            equal(group.children.length, 1);
            equal(group._childrenChange, false);
        });

        test("clear clears children", function() {
            group.append(new Group());
            group.append(new Group());
            group.clear();
            equal(drawingElement.children.length, 0);
        });

        test("_boundingBox returns clipped bounding box", function() {
            var rect = new g.Rect([10, 20], [100, 200]);
            var childGroup = new diagram.Group({});
            childGroup.drawingElement.clippedBBox = function() {
                return rect;
            };

            group.append(childGroup);
            var boundingBox = group._boundingBox();
            ok(boundingBox.origin.equals(rect.origin));
            ok(boundingBox.size.equals(rect.size));
        });

        test("_boundingBox returns transformed children bbox without parent transformation", function() {
            var rectangle = new diagram.Rectangle({
                width: 50,
                height: 50,
                x: 10,
                y: 10
            });

            rectangle._transform.scale = new diagram.Scale(2, 2);
            rectangle._renderTransform();
            group._transform.scale = new diagram.Scale(2, 2);
            group._renderTransform();

            group.append(rectangle);
            var boundingBox = group._boundingBox();
            var expected = rectangle.drawingElement.bbox(null);
            ok(boundingBox.origin.equals(expected.origin));
            ok(boundingBox.size.equals(expected.size));
        });

        test("_boundingBox excludes children with _includeInBBox set to false", function() {
            var rectangle = new diagram.Rectangle({
                width: 50,
                height: 50,
                x: 10,
                y: 10
            });
            var excludeFromBBox = new diagram.Rectangle({
                width: 200,
                height: 200
            });
            excludeFromBBox._includeInBBox = false;

            rectangle._transform.scale = new diagram.Scale(2, 2);
            rectangle._renderTransform();
            group._transform.scale = new diagram.Scale(2, 2);
            group._renderTransform();

            group.append(rectangle);
            group.append(excludeFromBBox);

            var boundingBox = group._boundingBox();
            var expected = rectangle.drawingElement.bbox(null);
            ok(boundingBox.origin.equals(expected.origin));
            ok(boundingBox.size.equals(expected.size));
        });

        // ------------------------------------------------------------
        module("Group / autoSize", {
            setup: function() {
                group = new Group({
                    width: 200,
                    height: 300,
                    autoSize: true
                });

                drawingElement = group.drawingElement;
            }
        });

        test("redraw transforms group to fit specified width and height when the width and height are the same but the children have changed", function() {
            var rect = new diagram.Rectangle({width: 100, height: 100});
            group.append(rect);
            group.redraw({
                width: 200,
                height: 300
            });

            var matrix = group.drawingElement.transform().matrix();
            close(matrix.a, 2, TOLERANCE);
            close(matrix.d, 3, TOLERANCE);
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

        test("toFront moves visuals to the end", function() {
            group.toFront([child1, child2]);
            ok(child1 === group.children[1]);
            ok(child2 === group.children[2]);
        });

        test("toFront moves elements to the end", function() {
            group.toFront([child1, child2]);
            ok(child1.drawingElement === drawingElement.children[1]);
            ok(child2.drawingElement === drawingElement.children[2]);
        });

        test("toBack moves visuals to the start", function() {
            group.toBack([child3, child2]);
            ok(child2 === group.children[0]);
            ok(child3 === group.children[1]);
        });

        test("toBack moves elements to the start", function() {
            group.toBack([child3, child2]);
            ok(child2.drawingElement === drawingElement.children[0]);
            ok(child3.drawingElement === drawingElement.children[1]);
        });

        test("toIndex moves visuals to the specified indices", function() {
            group.toIndex([child3, child2], [0, 1]);

            ok(child3 === group.children[0]);
            ok(child2 === group.children[1]);
        });

        test("toIndex moves elements to the specified indices", function() {
            group.toIndex([child3, child2], [0, 1]);

            ok(child3.drawingElement === drawingElement.children[0]);
            ok(child2.drawingElement === drawingElement.children[1]);
        });

        autoSizableTests("Group", Group);

    })();

    (function() {
        var Canvas = diagram.Canvas;
        var drawingElement;
        var element;
        var canvas;

        function setupCanvas() {
            element = $("<div></div>").appendTo(QUnit.fixture);
            canvas = new Canvas(element[0], {
                width: 500,
                height: 300
            });
            drawingElement = canvas.drawingElement;
        }

        function teardown() {
            element.off();
            element.remove();
        }

        module("Canvas / init", {
            setup: setupCanvas,
            teardown: teardown
        });

        test("inits surface", function() {
            ok(canvas.surface);
        });

        test("inits surface size", function() {
            var size = canvas.surface.getSize();
            ok(size.width, 500);
            ok(size.height, 300);
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

        var SurfaceCreate = d.Surface.create;

        function Surface() {
            this.setSize = function(size) {
                this._size = size;
            };
        }

        module("Canvas / init translate", {
            teardown: function() {
                d.Surface.create = SurfaceCreate;
                element.remove();
            }
        });

        test("sets translate method if surface can translate", function() {
            d.Surface.create = function(element, options) {
                var surface = new Surface();
                surface.translate = function() {};
                return surface;
            };
            setupCanvas();
            ok(canvas.translate === canvas._translate);
        });

        test("does not set translate method if surface cannot translate", function() {
            d.Surface.create = function(element, options) {
                return new Surface();
            };
            setupCanvas();
            ok(canvas.translate === undefined);
        });

        module("Canvas / api", {
            setup: setupCanvas,
            teardown: teardown
        });

        test("bounds returns rect with container clipped bounding box width and height", function() {
            canvas.drawingElement.clippedBBox = function() {
                return new g.Rect(new g.Point(50,50), new g.Size(100, 200));
            };
            var rect = canvas.bounds();
            equal(rect.x, 0);
            equal(rect.y, 0);
            equal(rect.width, 100);
            equal(rect.height, 200);
        });

        test("_translate translates surface", function() {
            canvas.surface.translate = function(offset) {
                equal(offset.x, 100);
                equal(offset.y, 200);
            };
            canvas._translate(100, 200);
        });

        test("_translate updates viewBox", function() {
            canvas._translate(100, 200);
            var viewBox = canvas._viewBox;
            equal(viewBox.x, 100);
            equal(viewBox.y, 200);
        });

        test("_translate returns current translation", function() {
            canvas._viewBox.x = 100;
            canvas._viewBox.y = 200;

            var viewBox = canvas._translate();
            equal(viewBox.x, 100);
            equal(viewBox.y, 200);
        });

        test("size sets surface size", function() {
            canvas.surface.setSize = function(size) {
                equal(size.width, 100);
                equal(size.height, 200);
            };
            canvas.size({
                width: 100,
                height: 200
            });
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

        test("append appends visual drawingContainer to container", function() {
            drawingElement.append = function(drawing) {
                equal(drawing.id, "foo");
            };
            canvas.append({
                drawingContainer: function() {
                    return  {
                        id: "foo"
                    };
                }
            });
        });

        test("removes removes visual drawingContainer from container", function() {
            drawingElement.remove = function(drawing) {
                equal(drawing.id, "foo");
            };
            canvas.remove({
                drawingContainer: function() {
                    return  {
                        id: "foo"
                    };
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

    (function() {
        var ArrowMarker = diagram.ArrowMarker;
        var CircleMarker = diagram.CircleMarker;
        var markerShape;

        var linePath = d.Path.parse("M10,10L40,80").paths[0];
        var circle;

        module("CircleMarker", {
            setup: function() {
               markerShape = new CircleMarker({
                    position: "start"
               });
               circle = markerShape.drawingElement;
            }
        });

        test("inits circle", function() {
            ok(markerShape.drawingElement instanceof d.Circle);
        });

        test("redraw updates position", function() {
            markerShape.redraw({
                position: "end"
            });
            equal(markerShape.options.position, "end");
        });

        test("positionMarker translates circle to the target segment point", function() {
            var matrix;
            markerShape.positionMarker(linePath);
            matrix = circle.transform().matrix();
            equal(matrix.e, 10);
            equal(matrix.f, 10);
            markerShape.redraw({position: "end"});
            markerShape.positionMarker(linePath);
            matrix = circle.transform().matrix();
            equal(matrix.e, 40);
            equal(matrix.f, 80);
        });

        // ------------------------------------------------------------

        var curvePath = d.Path.parse("M10,10C100,100 200,200 300,100").paths[0];
        var tolerance = 0.01;
        var path;

        function closeMatrices(actual, expected, tolerance) {
            close(actual.a, expected.a, tolerance);
            close(actual.b, expected.b, tolerance);
            close(actual.c, expected.c, tolerance);
            close(actual.d, expected.d, tolerance);
            close(actual.e, expected.e, tolerance);
            close(actual.f, expected.f, tolerance);
        }

        module("ArrowMarker", {
            setup: function() {
               markerShape = new ArrowMarker({
                    position: "start"
               });
               path = markerShape.drawingElement;
            }
        });

        test("inits path", function() {
            ok(path instanceof d.MultiPath);
        });

        test("redraw updates position", function() {
            markerShape.redraw({
                position: "end"
            });
            equal(markerShape.options.position, "end");
        });

        test("positionMarker transforms arrow anchor to the start segment for line paths", function() {
            markerShape.positionMarker(linePath);
            var matrix = path.transform().matrix();
            closeMatrices(matrix, new g.Matrix(-0.393, -0.919, 0.919, -0.393, 9.34, 21.16), tolerance);
        });

        test("positionMarker transforms arrow anchor to the end segment for line paths", function() {
            markerShape.redraw({
                position: "end"
            });
            markerShape.positionMarker(linePath);
            var matrix = path.transform().matrix();

            closeMatrices(matrix, new g.Matrix(0.393, 0.919, -0.919, 0.393, 40.656, 68.838), tolerance);
        });

        test("positionMarker transforms arrow anchor to the start segment for curve paths", function() {
            markerShape.positionMarker(curvePath);

            var matrix = path.transform().matrix();

            closeMatrices(matrix, new g.Matrix(-0.707, -0.707, 0.707, -0.707, 13.535, 20.606), tolerance);
        });

        test("positionMarker transforms arrow anchor to the end segment for curve paths", function() {
            markerShape.redraw({
                position: "end"
            });
            markerShape.positionMarker(curvePath);

            var matrix = path.transform().matrix();

            closeMatrices(matrix, new g.Matrix(0.707, -0.707, 0.707, 0.707, 289.393, 103.535), tolerance);
        });

        test("positionMarker translates arrow anchor to the start point for paths with a single segment", function() {
            var pointPath = new d.Path();
            pointPath.moveTo(100, 200);
            markerShape.positionMarker(pointPath);
            var matrix = path.transform().matrix();

            closeMatrices(matrix, new g.Matrix(1, 0, 0, 1, 90, 195), tolerance);
        });

        test("positionMarker translates arrow anchor to the end point for paths with a single segment", function() {
            markerShape.redraw({
                position: "end"
            });

            var pointPath = new d.Path();
            pointPath.moveTo(100, 200);
            markerShape.positionMarker(pointPath);
            var matrix = path.transform().matrix();

            closeMatrices(matrix, new g.Matrix(1, 0, 0, 1, 90, 195), tolerance);
        });

    })();

})();
