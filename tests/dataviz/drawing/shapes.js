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

        test("fill is chainable", function() {
            deepEqual(shape.fill("red"), shape);
        });

        test("fill returns fill", function() {
            equal(shape.fill("red").fill().color, "red");
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

        test("stroke is chainable", function() {
            deepEqual(shape.stroke("red"), shape);
        });

        test("stroke returns stroke", function() {
            equal(shape.stroke("red").stroke().color, "red");
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

        test("remove removes child", function() {
            var toRemove = new Group();
            group.append(toRemove);
            group.remove(toRemove);
            equal(group.children.length, 0);
        });

        test("remove sets child parent to null", function() {
            var toRemove = new Group();
            group.append(toRemove);
            group.remove(toRemove);
            equal(toRemove.parent, null);
        });

        test("remove triggers childrenChange", function() {
            var child = new Group();
            var toRemove = new Group();
            group.append(child);
            group.append(toRemove);
            group.observer = {
                childrenChange: function(args) {
                    equal(args.action, "remove");
                    ok(args.items[0] === toRemove);
                    equal(args.index, 1);
                }
            };

            group.remove(toRemove);
        });

        test("remove does not trigger childrenChange if shape is not from group children", 0, function() {
            var child = new Group();
            var toRemove = new Group();
            group.append(child);

            group.observer = {
                childrenChange: function(args) {
                    ok(false);
                }
            };

            group.remove(toRemove);
        });

        test("removeAt removes child at specified index", function() {
            var child = new Group();
            var toRemove = new Group();
            group.append(child);
            group.append(toRemove);
            group.removeAt(1);
            equal(group.children.length, 1);
            ok(group.children[0] === child);
        });

        test("removeAt sets child parent to null", function() {
            var toRemove = new Group();
            group.append(toRemove);
            group.removeAt(0);
            equal(toRemove.parent, null);
        });

        test("removeAt triggers childrenChange", function() {
            var child = new Group();
            var toRemove = new Group();
            group.append(child);
            group.append(toRemove);
            group.observer = {
                childrenChange: function(args) {
                    equal(args.action, "remove");
                    ok(args.items[0] === toRemove);
                    equal(args.index, 1);
                }
            };

            group.removeAt(1);
        });

        test("removeAt does not trigger childrenChange if index is out of range", 0, function() {
            var child = new Group();
            group.append(child);

            group.observer = {
                childrenChange: function(args) {
                    ok(false);
                }
            };

            group.removeAt(-1);
            group.removeAt(1);
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
                return new g.Rect(new Point(50, 50), [100, 100]);
            };
            path.bbox = function() {
                return new g.Rect(new Point(30, 70), [90, 100]);
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
                return new g.Rect(new Point(50, 50), [100, 100]);
            };
            path.bbox = function() {
                return new g.Rect(new Point(30, 70), [90, 100]);
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
                return new g.Rect(new Point(50, 50), [100, 100]);
            };
            path.bbox = function() {
                return new g.Rect(new Point(30, 70), [90, 100]);
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

        test("rawBBox returns bounding box without transformation", function() {
            var circle = new Circle(new g.Circle(new Point(), 10));
            group.append(circle);
            group.transform(g.transform().scale(2,2));

            compareBoundingBox(group.rawBBox(), [-10, -10, 10, 10]);
        });

        test("currentTransform returns null if group has no matrix and there is no parent matrix", function() {
            ok(group.currentTransform() === null);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var text;
        var position;

        module("Text", {
            setup: function() {
                position = new g.Point(100, 100);
                text = new Text("Foo", position);
            }
        });

        test("sets initial content", function() {
            equal(text.content(), "Foo");
        });

        test("sets initial position", function() {
            equal(text.position().x, 100);
        });

        test("sets initial position from array", function() {
            text = new Text("Foo", [100, 100]);
            ok(text.position().equals(position));
        });

        test("sets initial options", function() {
            text = new Text("Foo", new g.Point(), { foo: true });

            ok(text.options.foo);
        });

        test("sets default font", function() {
            equal(text.options.font, "12px sans-serif");
        });

        test("sets default fill", function() {
            equal(text.options.fill.color, "#000");
        });

        test("default fill can be overriden", function() {
            text = new Text("Foo", new g.Point(), { fill: { color: "foo" } });

            equal(text.options.fill.color, "foo");
        });

        test("default fill can be disabled", function() {
            text = new Text("Foo", new g.Point(), { fill: null });

            equal(text.options.fill, null);
        });

        test("changing the position triggers geometryChange", function() {
            text.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            text.position().setX(5);
        });

        test("position can be set to a Point instance", function() {
            var position = new g.Point(10, 10);
            text.position(position);
            equal(text.position(), position);
        });

        test("position can be set to an array", function() {
            text.position([10, 10]);
            deepEqual(text.position().toArray(), [10, 10]);
        });

        test("setting content triggers optionsChange", function() {
            text.observer = {
                optionsChange: function() { ok(true); }
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

        test("position returns current position", function() {
            equal(text.position(), position);
        });

        test("position setter triggers geometryChange", function() {
            text.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            text.position(new g.Point());
        });

        test("position setter is chainable", function() {
            equal(text.position(new g.Point()), text);
        });

        test("bbox returns text bounding box", function() {
            text.measure = function() {
                return { width: 20, height: 10 };
            };

            var bbox = text.bbox();
            compareBoundingBox(bbox, [100, 100, 120, 110]);
        });

        test("retrieving bbox doesn't change position observer", function() {
            text.bbox();
            equal(text.position().observer, text);
        });

        test("bbox returns transformed bounding box", function() {
            text.measure = function() {
                return { width: 20, height: 10 };
            };

            var bbox = text.bbox(g.transform().scale(2, 1, text.position()));
            compareBoundingBox(bbox, [100, 100, 140, 110]);
        });

        test("rawBBox returns bounding box without transformation", function() {
            text.measure = function() {
                return { width: 20, height: 10 };
            };

            text.transform(g.transform().scale(2, 2));
            compareBoundingBox(text.rawBBox(), [100, 100, 120, 110]);
        });

        test("measure returns text metrics", function() {
            deepEqual(text.measure(), util.measureText("Foo"));
        });

        test("measure takes font in consideration", function() {
            text.options.set("font", "15px sans-serif");
            deepEqual(text.measure(), util.measureText("Foo", { font: "15px sans-serif" }));
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
            deepEqual(circle.geometry(), circleGeometry);
        });

        test("sets initial options", function() {
            var circle = new Circle(circleGeometry, { foo: true });

            ok(circle.options.foo);
        });

        test("sets default stroke", function() {
            equal(circle.options.stroke.color, "#000");
        });

        test("default stroke can be overriden", function() {
            circle = new Circle(circleGeometry, { stroke: { color: "foo" } });
            equal(circle.options.stroke.color, "foo");
        });

        test("changing the center triggers geometryChange", function() {
            circle.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            circle.geometry().center.setX(5);
        });

        test("changing the radius triggers geometryChange", function() {
            circle.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            circle.geometry().setRadius(5);
        });

        test("changing the geometry triggers geometryChange", function() {
            circle.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            circle.geometry(new Point(10, 10));
        });

        test("geometry setter is chainable", function() {
            equal(circle.geometry(new Point(10, 10)), circle);
        });

        test("boundingBox returns geometry bounding rect with half stroke width added", function() {
            var boundingBox,
                geometry = new g.Circle(new Point());

            geometry.bbox = function() {
                return new g.Rect(new Point(50, 50), [100, 100]);
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

        test("rawBBox returns geometry bounding box with no transformation applied", function() {
            circle.transform(g.transform().scale(2,2));

            compareBoundingBox(circle.rawBBox(), [-10, -10, 10, 10]);
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
            deepEqual(arc.geometry(), arcGeometry);
        });

        test("sets initial options", function() {
            var arc = new Arc(arcGeometry, { foo: true });

            ok(arc.options.foo);
        });

        test("sets default stroke", function() {
            equal(arc.options.stroke.color, "#000");
        });

        test("default stroke can be overriden", function() {
            arc = new Arc(arcGeometry, { stroke: { color: "foo" } });
            equal(arc.options.stroke.color, "foo");
        });

        test("changing the center triggers geometryChange", function() {
            arc.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            arc.geometry().center.setX(5);
        });

        test("changing a geometry field triggers geometryChange", 2, function() {
            arc.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            arc.geometry().setRadiusX(100);
            arc.geometry().setCounterClockwise(true);
        });

        test("boundingBox returns geometry bounding rect with half stroke width added", function() {
            var boundingBox,
                geometry = new g.Arc(new Point());

            geometry.bbox = function() {
                return new g.Rect(new Point(50, 50), [100, 100]);
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

        test("rawBBox returns geometry bounding box with no transformation applied", function() {
            arc.transform(g.transform().scale(2,2));

            compareBoundingBox(arc.rawBBox(), [50, 100, 150, 200]);
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
            ok(new Segment().anchor());
        });

        test("sets initial anchor from array", function() {
            segment = new Segment([10, 20]);
            ok(segment.anchor().equals(new Point(10, 20)));
        });

        test("sets initial controlIn point from array", function() {
            segment = new Segment([0, 0], [10, 20]);
            ok(segment.controlIn().equals(new Point(10, 20)));
        });

        test("sets initial controlOut point from array", function() {
            segment = new Segment([0, 0], [0, 0], [10, 20]);
            ok(segment.controlOut().equals(new Point(10, 20)));
        });

        test("changing the anchor point triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.anchor().setX(5);
        });

        test("setting the anchor point triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.anchor(new Point());
        });

        test("anchor setter is chainable", function() {
            equal(segment.anchor(new Point()), segment);
        });

        test("anchor setter accepts array", function() {
            segment.anchor([10, 20]);
            ok(segment.anchor().equals(new Point(10, 20)));
        });

        test("changing the control point (in) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlIn().setX(5);
        });

        test("setting the control point (in) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlIn(new Point());
        });

        test("controlIn setter is chainable", function() {
            equal(segment.controlIn(new Point()), segment);
        });

        test("controlIn setter accepts array", function() {
            segment.controlIn([10, 20]);
            ok(segment.controlIn().equals(new Point(10, 20)));
        });

        test("changing the control point (out) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlOut().setX(5);
        });

        test("controlOut setter is chainable", function() {
            equal(segment.controlOut(new Point()), segment);
        });

        test("controlOut setter accepts array", function() {
            segment.controlOut([10, 20]);
            ok(segment.controlOut().equals(new Point(10, 20)));
        });

        test("setting the control point (out) triggers geometryChange", function() {
            segment.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            segment.controlOut(new Point());
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

        test("sets initial options", function() {
            var path = new Path({ foo: true });
            ok(path.options.foo);
        });

        test("sets default stroke", function() {
            equal(path.options.stroke.color, "#000");
        });

        test("default stroke can be overriden", function() {
            path = new Path({ stroke: { color: "foo" } });
            equal(path.options.stroke.color, "foo");
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

            deepEqual(path.segments[0].controlOut(), controlOut);
            deepEqual(path.segments[1].controlIn(), controlIn);
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

            controlOut.setX(20);
            controlIn.setY(30);
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

        test("rawBBox returns the bounding rect without transformation", function() {
            path.moveTo(0, 0);
            path.lineTo(100, 100);
            path.transform(g.transform().scale(2,2));
            compareBoundingBox(path.rawBBox(), [0, 0, 100, 100]);
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

        test("sets initial options", function() {
            multiPath = new MultiPath({ foo: true });
            ok(multiPath.options.foo);
        });

        test("sets default stroke", function() {
            equal(multiPath.options.stroke.color, "#000");
        });

        test("default stroke can be overriden", function() {
            multiPath = new MultiPath({ stroke: { color: "foo" } });
            equal(multiPath.options.stroke.color, "foo");
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

            controlOut.setX(20);
            controlIn.setY(30);
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

        test("rawBBox return bounding box without transformation", function() {
            multiPath.moveTo(50, 50);
            multiPath.lineTo(100, 100);
            multiPath.moveTo(200, 200);
            multiPath.transform(g.transform(Matrix.scale(2, 2)));

            compareBoundingBox(multiPath.rawBBox(), [50, 50, 200, 200]);
        });

        shapeBaseTests(MultiPath, "MultiPath");
    })();

    // ------------------------------------------------------------
    (function() {
        var rect,
            image;

        module("Image", {
            setup: function() {
                rect = new g.Rect(new g.Point(0, 0), [100, 100]);
                image = new d.Image("foo", rect);
            }
        });

        test("sets initial source", function() {
            deepEqual(image.src(), "foo");
        });

        test("sets initial rect", function() {
            deepEqual(image.rect(), rect);
        });

        test("sets initial options", function() {
            var image = new d.Image("foo", rect, { foo: true });
            ok(image.options.foo);
        });

        test("src returns current source", function() {
            equal(image.src(), "foo");
        });

        test("src setter triggers optionsChange", function() {
            image.observer = {
                optionsChange: function() {
                    ok(true);
                }
            };

            image.src("bar");
        });

        test("src setter is chainable", function() {
            equal(image.src("bar"), image);
        });

        test("rect returns current rect", function() {
            equal(image.rect(), rect);
        });

        test("rect setter triggers geometryChange", function() {
            image.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            image.rect(new g.Rect());
        });

        test("rect setter is chainable", function() {
            equal(image.rect(new g.Rect()), image);
        });

        test("changing the rect triggers geometryChange", function() {
            image.observer = {
                geometryChange: function() {
                    ok(true);
                }
            };

            image.rect().origin.setX(5);
        });

        test("boundingBox returns bounding rect", function() {
            compareBoundingBox(image.bbox(), [0, 0, 100, 100]);
        });

        test("boundingBox passes matrix to geometry boundingBox method", function() {
            var transform = g.transform();

            rect.bbox = function(matrix) {
                ok(matrix.equals(transform.matrix()));
                return new g.Rect();
            };

            image.transform(transform);
            image.bbox();
        });

        test("rawBBox returns bounding box without transformation", function() {
            image.transform(g.transform().scale(2, 2));
            compareBoundingBox(image.rawBBox(), [0, 0, 100, 100]);
        });
    })();

})();
