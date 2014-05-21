(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        util = dataviz.util,

        d = dataviz.drawing,
        Element = d.Element,
        Group = d.Group,
        Segment = d.Segment,
        Shape = d.Shape,
        Text = d.Text,
        Circle = d.Circle,
        MultiPath = d.MultiPath,
        Path = d.Path,
        Arc = d.Arc,
        TOLERANCE = 0.1;

    // ------------------------------------------------------------
    (function() {
        var element,
            matrix;

        module("Element", {
            setup: function() {
                element = new Element();
            }
        });

        test("visible sets visible option", function() {
            element.visible(false);
            equal(element.options.visible, false);
            element.visible(true);
            equal(element.options.visible, true);
        });

        test("visible returns true if visible option is not defined", function() {
            ok(element.visible());
        });

        test("visible returns visible option value", function() {
            element.options.visible = false;
            equal(element.visible(), false);
        });

        test("constructor sets transformation when a matrix is passed through the options", function() {
            element = new Element({transform: Matrix.unit()});
            compareMatrices(element.options.transform.matrix(), Matrix.unit());
        });

        test("transform sets transform option", function() {
            element.transform(g.transform(Matrix.unit()));
            ok(element.options.transform);
        });

        test("transform sets transformation if matrix is passed", function() {
            matrix = new Matrix(1,1,1,1,1,1);
            element.transform(matrix);
            compareMatrices(element.options.transform.matrix(), matrix);
        });

        test("parentTransform returns undefined if element has no parents", function() {
            ok(element.parentTransform() === undefined);
        });

        test("parentTransform returns parents transformation", function() {
            var mainGroup = new Group({transform: new Matrix(2,2,2,2,2,2)}),
                group = new Group({transform: new Matrix(3,3,3,3,3,3)});

            group.append(element);
            mainGroup.append(group);

            compareMatrices(element.parentTransform().matrix(), new Matrix(12,12,12,12,14,14));
        });

        test("currentTransform returns undefined if the element has no transformation and no transformation is passed", function() {
            matrix = element.currentTransform();
            equal(matrix, undefined);
        });

        test("currentTransform returns elements transformation if no transformation is passed", function() {
            element.transform(Matrix.translate(10,20));
            matrix = element.currentTransform().matrix();
            compareMatrices(matrix, new Matrix(1,0,0,1,10,20));
        });

        test("currentTransform returns transformation with the passed matrix if the element has no transformation", function() {
            matrix = element.currentTransform(g.transform(Matrix.translate(10,20))).matrix();
            compareMatrices(matrix, new Matrix(1,0,0,1,10,20));
        });

        test("currentTransform returns a transformation with the passed matrix multiplied by the element matrix", function() {
            element.transform(g.transform(new Matrix(3,3,3,3,3,3)));
            matrix = element.currentTransform(g.transform(new Matrix(2,2,2,2,2,2))).matrix();
            compareMatrices(matrix, new Matrix(12,12,12,12,14,14));
        });

        test("currentTransform gets transformation from parents if no parent transformation is passed", function() {
            var mainGroup = new Group({transform: g.transform(new Matrix(2,2,2,2,2,2))}),
                group = new Group({transform: g.transform(new Matrix(3,3,3,3,3,3))});

            group.append(element);
            mainGroup.append(group);
            matrix = element.currentTransform().matrix();

            compareMatrices(matrix, new Matrix(12,12,12,12,14,14));
        });

        test("currentTransform does not search for parent matrix if null is passed", 0, function() {
            element.transform(matrix);
            element.parentTransform = function() {
                ok(false);
            };

            element.currentTransform(null);
        });

    })();

    // ------------------------------------------------------------
    function shapeBaseTests(TShape, name) {
        var shape;

        module("Shape base tests / " + name, {
            setup: function() {
                shape = new TShape();
            }
        });

        test("fill sets fill", function() {
            shape.fill("red", 1);

            equal(shape.options.fill.color, "red");
            equal(shape.options.fill.opacity, 1);
        });

        test("fill triggers optionsChange", function() {
            shape.observer = {
                optionsChange: function() {
                    ok(true);
                }
            };

            shape.fill("red");
        });

        test("fill returns shape", function() {
            deepEqual(shape.fill("red"), shape);
        });

        test("stroke sets stroke", function() {
            shape.stroke("red", 2, 1);

            equal(shape.options.stroke.color, "red");
            equal(shape.options.stroke.width, 2);
            equal(shape.options.stroke.opacity, 1);
        });

        test("stroke triggers optionsChange", function() {
            shape.observer = {
                optionsChange: function() {
                    ok(true);
                }
            };

            shape.stroke("red");
        });

        test("stroke returns shape", function() {
            deepEqual(shape.stroke("red"), shape);
        });
    }

    // ------------------------------------------------------------
    (function() {
        var group;

        module("Group", {
            setup: function() {
                group = new Group();
            }
        });

        test("append adds children", function() {
            var child = new Group();
            group.append(child);

            deepEqual(group.children[0], child);
        });

        test("append sets children parent", function() {
            var child = new Group();
            group.append(child);

            ok(child.parent === group);
        });

        test("append triggers childrenChange", function() {
            var child = new Group();

            group.observer = {
                childrenChange: function() {
                    ok(true);
                }
            };

            group.append(child);
        });

        test("clear triggers childrenChange", function() {
            var child = new Group();
            group.append(child);

            group.observer = {
                childrenChange: function() {
                    ok(true);
                }
            };

            group.clear();
        });

        test("clear sets children parent to null", function() {
            var child = new Group();
            group.append(child);
            group.clear();

            ok(child.parent === null);
        });

        test("visible triggers optionsChange", function() {
            group.observer = {
                optionsChange: function() {
                    ok(true);
                }
            };

            group.visible(false);
        });

        test("visible sets visible", function() {
            group.visible(false);
            ok(!group.options.visible);
        });

        test("visible returns group", function() {
            deepEqual(group.visible(false), group);
        });

        test("traverse traverses children", function() {
            var child = new Group();
            group.append(child);

            group.traverse(function(item) {
                deepEqual(item, child);
            });
        });

        test("traverse traverses child groups", 2, function() {
            var childGroup = new Group();
            group.append(childGroup);
            var child = new Group();
            childGroup.append(child);

            group.traverse(function(item) {
                ok(true);
            });
        });

        test("boundingBox returns children bounding rectangle", function() {
            var path = new Path(),
                circle = new Circle(new g.Circle(new Point(), 10)),
                boundingBox;
            circle.bbox = function() {
                return new g.Rect(Point.create(50, 50), Point.create(150, 150));
            };
            path.bbox = function() {
                return new g.Rect(Point.create(30, 70), Point.create(120, 170));
            };
            group.append(circle);
            group.append(path);
            boundingBox = group.bbox();
            compareBoundingBox(boundingBox, [30, 50, 150, 170]);
        });

        test("boundingBox returns only visible children bounding rectangle", function() {
            var path = new Path({visible: false}),
                circle = new Circle(new g.Circle(new Point(), 10)),
                boundingBox;
            circle.bbox = function() {
                return new g.Rect(Point.create(50, 50), Point.create(150, 150));
            };
            path.bbox = function() {
                return new g.Rect(Point.create(30, 70), Point.create(120, 170));
            };
            group.append(circle);
            group.append(path);
            boundingBox = group.bbox();
            compareBoundingBox(boundingBox, [50, 50, 150, 150]);
        });

        test("boundingBox returns undefined if group has no visible children", function() {
            var path = new Path({visible: false}),
                circle = new Circle(new g.Circle(new Point(), 10), {visible: false}),
                boundingBox;
            circle.bbox = function() {
                return new g.Rect(Point.create(50, 50), Point.create(150, 150));
            };
            path.bbox = function() {
                return new g.Rect(Point.create(30, 70), Point.create(120, 170));
            };
            group.append(circle);
            group.append(path);
            boundingBox = group.bbox();
            equal(boundingBox, undefined);
        });

        test("boundingBox returns undefined if group has no children", function() {
            equal(group.bbox(), undefined);
        });

        test("boundingBox passes transformation to its children boundingBox methods", 12, function() {
            var path = new Path(),
                circle = new Circle(new g.Circle(new Point(), 10)),
                boundingBox,
                groupMatrix;
            circle.bbox = function(transformation) {
                compareMatrices(transformation.matrix(), groupMatrix);
                return new g.Rect();
            };
            path.bbox = function(transformation) {
                compareMatrices(transformation.matrix(), groupMatrix);
                return new g.Rect();
            };
            group.transform(g.transform(Matrix.unit()));
            groupMatrix = group.options.transform.matrix();
            group.append(circle);
            group.append(path);
            group.bbox();
        });

        test("currentTransform returns null group has no matrix and there is no parent matrix", function() {
            ok(group.currentTransform() === null);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var shape;

        module("Shape");

        test("sets initial options", function() {
            shape = new Shape({ foo: true });
            ok(shape.options.foo);
        });

        shapeBaseTests(Shape, "Shape");
    })();

    // ------------------------------------------------------------
    (function() {
        var text;

        module("Text", {
            setup: function() {
                text = new Text("Foo", new g.Point(100, 100));
            }
        });

        test("sets initial content", function() {
            equal(text.content(), "Foo");
        });

        test("sets initial origin", function() {
            equal(text.origin.x, 100);
        });

        test("sets initial options", function() {
            text = new Text("Foo", new g.Point(), { foo: true });

            ok(text.options.foo);
        });

        test("sets default font", function() {
            equal(text.options.font, "12px sans-serif");
        });

        test("changing the origin triggers geometryChange", function() {
            text.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            text.origin.set("x", 5);
        });

        test("setting content triggers contentChange", function() {
            text.observer = {
                contentChange: function() { ok(true); }
            };

            text.content("Bar");
        });

        test("clears content", function() {
            text.content("");
            equal(text.content(), "");
        });

        test("content setter is chainable", function() {
            equal(text.content("Bar"), text);
        });

        test("bbox returns text bounding box", function() {
            text.measure = function() {
                return { width: 20, height: 10 };
            };

            var bbox = text.bbox();
            compareBoundingBox(bbox, [100, 100, 120, 110]);
        });

        test("retrieving bbox doesn't change origin observer", function() {
            text.bbox();
            equal(text.origin.observer, text);
        });

        test("bbox returns transformed bounding box", function() {
            text.measure = function() {
                return { width: 20, height: 10 };
            };

            var bbox = text.bbox(g.transform().scale(2, 1, text.origin));
            compareBoundingBox(bbox, [100, 100, 140, 110]);
        });

        test("measure returns text metrics", function() {
            deepEqual(text.measure(), util.measureText("Foo"));
        });

        test("measure takes font in consideration", function() {
            text.options.set("font", "15px sans-serif");
            deepEqual(text.measure(), util.measureText("Foo", { font: "15px arial" }));
        });

        shapeBaseTests(Text, "Text");
    })();

    // ------------------------------------------------------------
    (function() {
        var circleGeometry,
            circle;

        module("Circle", {
            setup: function() {
                circleGeometry = new g.Circle(new g.Point(0, 0), 10);
                circle = new Circle(circleGeometry);
            }
        });

        test("sets initial geometry", function() {
            deepEqual(circle.geometry, circleGeometry);
        });

        test("sets initial options", function() {
            var circle = new Circle(circleGeometry, { foo: true });

            ok(circle.options.foo);
        });

        test("changing the center triggers geometryChange", function() {
            circle.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            circle.geometry.center.set("x", 5);
        });

        test("changing the radius triggers geometryChange", function() {
            circle.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            circle.geometry.set("radius", 5);
        });

        test("boundingBox returns geometry bounding rect with half stroke width added", function() {
            var boundingBox,
                geometry = new g.Circle(new Point());

            geometry.bbox = function() {
                return new g.Rect(new Point(50, 50), new Point(150, 150));
            };
            circle = new Circle(geometry, {stroke: {width: 5}});
            boundingBox = circle.bbox();
            compareBoundingBox(boundingBox, [47.5, 47.5, 152.5, 152.5]);
        });

        test("boundingBox passes matrix to geometry boundingBox method", function() {
            var geometry = new g.Circle(new Point()),
                circleMatrix;

            geometry.bbox = function(matrix) {
                ok(circleMatrix === matrix);
                return new g.Rect();
            };
            circle = new Circle(geometry, {stroke: {width: 5}, transform: g.transform(Matrix.unit())});
            circleMatrix = circle.options.transform.matrix();
            circle.bbox();
        });

        shapeBaseTests(Circle, "Circle");
    })();

    // ------------------------------------------------------------
    (function() {
        var arcGeometry,
            arc;

        module("Arc", {
            setup: function() {
                arcGeometry = new g.Arc(new Point(100, 100), {
                    startAngle: 0,
                    endAngle: 180,
                    radiusX: 50,
                    radiusY: 100
                });

                arc = new Arc(arcGeometry);
            }
        });

        test("sets initial geometry", function() {
            deepEqual(arc.geometry, arcGeometry);
        });

        test("sets initial options", function() {
            var arc = new Arc(arcGeometry, { foo: true });

            ok(arc.options.foo);
        });

        test("changing the center triggers geometryChange", function() {
            arc.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            arc.geometry.center.set("x", 5);
        });

        test("changing a geometry field triggers geometryChange", 2, function() {
            arc.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            arc.geometry.set("radiusX", 100);
            arc.geometry.set("counterClockwise", true);
        });

        test("boundingBox returns geometry bounding rect with half stroke width added", function() {
            var boundingBox,
                geometry = new g.Arc(new Point());

            geometry.bbox = function() {
                return new g.Rect(new Point(50, 50), new Point(150, 150));
            };
            arc = new Arc(geometry, {stroke: {width: 5}});
            boundingBox = arc.bbox();

            compareBoundingBox(boundingBox, [47.5, 47.5, 152.5, 152.5]);
        });

        test("boundingBox passes matrix to geometry boundingBox method", function() {
            var geometry = new g.Arc(new Point()),
                arcMatrix;

            geometry.bbox = function(matrix) {
                ok(arcMatrix === matrix);
                return new g.Rect();
            };
            arc = new Arc(geometry, {stroke: {width: 5}});
            arcMatrix = arc.options.transform;
            arc.bbox();
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var segment;

        module("Segment", {
            setup: function() {
                segment = new Segment(
                    new Point(0, 0),
                    new Point(10, 10),
                    new Point(-10, -10)
                );
            }
        });

        test("parameter-less constructor creates anchor", function() {
            ok(new Segment().anchor);
        });

        test("changing the anchor point triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.anchor.set("x", 5);
        });

        test("changing the control point (in) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlIn.set("x", 5);
        });

        test("changing the control point (out) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlOut.set("x", 5);
        });

        test("boundingBoxTo returns the line bounding box to the passed segment if all control points are not specified", function() {
            var other = new Segment(Point.create(100, 100)),
                boundingBox = segment.bboxTo(other);
            compareBoundingBox(boundingBox, [0,0,100,100]);
        });

        test("boundingBoxTo returns the transformed line bounding box", function() {
            var other = new Segment(Point.create(100, 100)),
                boundingBox = segment.bboxTo(other, Matrix.scale(2,1));
            compareBoundingBox(boundingBox, [0,0,200,100]);
        });

        test("boundingBoxTo returns the curve bounding rect to the passed segment if all control points are specified", function() {
            var other = new Segment(Point.create(30, 50), Point.create(-20, 30)),
                boundingBox = segment.bboxTo(other);
            compareBoundingBox(boundingBox, [-8.2,-1.6,30,50], TOLERANCE);
        });

        test("boundingBoxTo returns the transformed curve bounding rect to the passed segment", function() {
            var other = new Segment(Point.create(30, 50), Point.create(-20, 30)),
                boundingBox = segment.bboxTo(other, Matrix.scale(2,1));
            compareBoundingBox(boundingBox, [-16.3,-1.6,60,50], TOLERANCE);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var path;

        module("Path", {
            setup: function() {
                path = new Path();
            }
        });

        test("moveTo adds segment", function() {
            path.moveTo(0, 0);
            equal(path.segments.length, 1);
        });

        test("moveTo returns path", function() {
            deepEqual(path.moveTo(0, 0), path);
        });

        test("moveTo clears segments", function() {
            path.moveTo(0, 0);
            path.lineTo(10, 10);

            path.moveTo(0, 0);
            equal(path.segments.length, 1);
        });

        test("lineTo adds segment", function() {
            path.lineTo(0, 0);
            equal(path.segments.length, 1);
        });

        test("lineTo returns path", function() {
            deepEqual(path.lineTo(0, 0), path);
        });

        test("curveTo does nothing if move segment has not been set", function() {
            path.curveTo(Point.create(10, 10), Point.create(40, 20), Point.create(30,30));

            equal(path.segments.length, 0);
        });

        test("curveTo adds segment", function() {
            path.moveTo(0, 0);
            path.curveTo(Point.create(10, 10), Point.create(40, 20), Point.create(30,30));

            equal(path.segments.length, 2);
        });

        test("curveTo sets control points", function() {
            var controlOut = Point.create(10, 10),
                controlIn = Point.create(40, 20);
            path.moveTo(0, 0);
            path.curveTo(controlOut, controlIn, Point.create(30,30));

            deepEqual(path.segments[0].controlOut, controlOut);
            deepEqual(path.segments[1].controlIn, controlIn);
        });

        test("changing the control points triggers geometryChange", 2, function() {
            var controlOut = Point.create(10, 10),
                controlIn = Point.create(40, 20);
            path.moveTo(0, 0);
            path.curveTo(controlOut, controlIn, Point.create(30,30));
            path.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            controlOut.set("x", 20);
            controlIn.set("y", 30);
        });

        test("sets initial options", function() {
            var path = new Path({ foo: true });
            ok(path.options.foo);
        });

        test("adding a point triggers geometryChange", function() {
            path.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            path.moveTo(0, 0);
        });

        test("close sets closed", function() {
            path.close();
            ok(path.options.closed);
        });

        test("close triggers geometryChange", function() {
            path.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            path.close();
        });

        test("close does not trigger optionsChange", 0, function() {
            path.observer = {
                geometryChange: $.noop,
                optionsChange: function() {
                    ok(false);
                }
            };

            path.close();
        });

        test("close returns path", function() {
            deepEqual(path.close(), path);
        });

        test("boundingBox returns undefined if there are no segments", function() {
            var boundingBox = path.bbox();
            ok(boundingBox === undefined);
        });

        test("boundingBox returns a bounding rectangle with both points equal to the segment anchor if there is a single segment", function() {
            path.moveTo(10, 10);
            var boundingBox = path.bbox();
            compareBoundingBox(boundingBox, [10,10,10,10]);
        });

        test("boundingBox returns the bounding rectangle of the transformed anchor if there is a single segment", function() {
            path.moveTo(10, 10);
            var boundingBox = path.bbox(g.transform(Matrix.scale(1,2)));
            compareBoundingBox(boundingBox, [10,20,10,20]);
        });

        test("boundingBox returns the bounding rectangle of the anchor using the combined transformation", function() {
            path.transform(Matrix.scale(2,1));
            path.moveTo(10, 10);
            var boundingBox = path.bbox(g.transform(Matrix.scale(1,2)));
            compareBoundingBox(boundingBox, [20,20,20,20]);
        });

        test("boundingBox returns the bounding rect between the segments", function() {
            path.moveTo(0, 0);
            path.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            path.lineTo(20, 70);
            var boundingBox = path.bbox();

            compareBoundingBox(boundingBox, [-8.2,-1.6,30,70], TOLERANCE);
        });

        test("boundingBox returns the bounding rect between the transformed segments", function() {
            path.moveTo(0, 0);
            path.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            path.lineTo(20, 70);
            path.transform(g.transform(Matrix.scale(2, 1)));
            var boundingBox = path.bbox();
            compareBoundingBox(boundingBox, [-16.3,-1.6,60,70], TOLERANCE);
        });

        test("boundingBox returns the bounding rect between the segments using the combined transformation", function() {
            path.moveTo(0, 0);
            path.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            path.lineTo(20, 70);
            path.transform(Matrix.scale(2, 1));
            var boundingBox = path.bbox(g.transform(Matrix.scale(1, 2)));
            compareBoundingBox(boundingBox, [-16.3,-3.2,60,140], TOLERANCE);
        });

        test("boundingBox returns the bounding rect between the segments with stroke added", function() {
            path.moveTo(0, 0);
            path.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            path.stroke("black", 5);
            var boundingBox = path.bbox();
            compareBoundingBox(boundingBox, [-10.7,-4.1,32.5,52.5], TOLERANCE);
        });

        shapeBaseTests(Path, "Path");
    })();

    // ------------------------------------------------------------
    (function() {
        var multiPath;

        module("MultiPath", {
            setup: function() {
                multiPath = new MultiPath();
            }
        });

        test("moveTo adds path", function() {
            multiPath.moveTo(0, 0);
            equal(multiPath.paths.length, 1);
        });

        test("moveTo adds segment to path", function() {
            multiPath.moveTo(0, 0);
            equal(multiPath.paths[0].segments.length, 1);
        });

        test("moveTo sets path observer", function() {
            multiPath.moveTo(0, 0);
            deepEqual(multiPath.paths[0].observer, multiPath);
        });

        test("moveTo adds new path", function() {
            multiPath.moveTo(0, 0).lineTo(0, 0).moveTo(0, 0);
            equal(multiPath.paths.length, 2);
        });

        test("moveTo returns multiPath", function() {
            deepEqual(multiPath.moveTo(0, 0), multiPath);
        });

        test("lineTo does nothing if called first", function() {
            multiPath.lineTo(0, 0);
            equal(multiPath.paths.length, 0);
        });

        test("lineTo adds segment", function() {
            multiPath.moveTo(0, 0).lineTo(0, 0);
            equal(multiPath.paths[0].segments.length, 2);
        });

        test("lineTo adds segment to last path", function() {
            multiPath.moveTo(0, 0).moveTo(0, 0).lineTo(0, 0);
            equal(multiPath.paths[1].segments.length, 2);
        });

        test("lineTo returns multiPath", function() {
            deepEqual(multiPath.moveTo(0, 0).lineTo(0, 0), multiPath);
        });

        test("curveTo does nothing if there are no paths", function() {
            multiPath.curveTo(Point.create(10, 10), Point.create(40, 20), Point.create(30,30));

            equal(multiPath.paths.length, 0);
        });

        test("curveTo adds curve to the last path", function() {
            multiPath.moveTo(-10, -10);
            multiPath.moveTo(0, 0);
            multiPath.curveTo(Point.create(10, 10), Point.create(40, 20), Point.create(30,30));

            equal(multiPath.paths[1].segments.length, 2);
        });

        test("curveTo returns multiPath", function() {
            deepEqual(multiPath.moveTo(0, 0).curveTo(new Point(), new Point(), new Point()), multiPath);
        });

        test("changing the control points triggers geometryChange", 2, function() {
            var controlOut = Point.create(10, 10),
                controlIn = Point.create(40, 20);
            multiPath.moveTo(0, 0);
            multiPath.curveTo(controlOut, controlIn, Point.create(30,30));
            multiPath.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            controlOut.set("x", 20);
            controlIn.set("y", 30);
        });

        test("close closes last path", function() {
            multiPath.moveTo(0, 0).close();
            ok(multiPath.paths[0].options.closed);
        });

        test("close does nothing if called first", function() {
            multiPath.close(0, 0);
            equal(multiPath.paths.length, 0);
        });

        test("close returns multiPath", function() {
            deepEqual(multiPath.moveTo(0, 0).close(), multiPath);
        });

        test("boundingBox returns undefined if there are no paths", function() {
            var boundingBox = multiPath.bbox();
            ok(boundingBox === undefined);
        });

        test("boundingBox returns the bounding rect for the paths", function() {
            multiPath.moveTo(0, 0);
            multiPath.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            multiPath.moveTo(20, 70);
            var boundingBox = multiPath.bbox();
            compareBoundingBox(boundingBox, [-8.2,-1.6,30,70], TOLERANCE);
        });

        test("boundingBox returns the bounding rect for the transformed paths", function() {
            multiPath.transform(g.transform(Matrix.scale(2, 1)));
            multiPath.moveTo(0, 0);
            multiPath.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            multiPath.moveTo(20, 70);
            var boundingBox = multiPath.bbox();
            compareBoundingBox(boundingBox, [-16.3,-1.6,60,70], TOLERANCE);
        });

        test("boundingBox returns the bounding rect for the paths using the combined transformation", function() {
            multiPath.transform(g.transform(Matrix.scale(2, 1)));
            multiPath.moveTo(0, 0);
            multiPath.curveTo(Point.create(-10, -10), Point.create(-20, 30), Point.create(30, 50));
            multiPath.moveTo(20, 70);
            var boundingBox = multiPath.bbox(Matrix.scale(1, 2));
            compareBoundingBox(boundingBox, [-16.3,-3.2,60,140], TOLERANCE);
        });

        shapeBaseTests(MultiPath, "MultiPath");
    })();

})();
