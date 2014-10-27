(function() {
    var dataviz = kendo.dataviz,

        g = kendo.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        util = dataviz.util,

        d = kendo.drawing,
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

        test("opacity sets opacity option", function() {
            element.opacity(0.5);
            equal(element.options.opacity, 0.5);
        });

        test("opacity setter is chainable", function() {
            equal(element.opacity(0.5), element);
        });

        test("opacity returns 1 if opacity is not defined", function() {
            equal(element.opacity(), 1);
        });

        test("opacity returns opacity option value", function() {
            element.options.opacity = 0.5;
            equal(element.opacity(), 0.5);
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

        test("constructor sets id to passed clip path", function() {
            var path = new Path();
            element = new Element({
                clip: path
            });

            ok(path.id);
        });

        test("constructor does not override id if it is already set to the passed clip path ", function() {
            var path = new Path();
            path.id = "foo";
            element = new Element({
                clip: path
            });

            equal(path.id, "foo");
        });

        test("clip sets clip option", function() {
            var path = new Path();
            element.clip(path);
            equal(element.options.clip, path);
        });

        test("clip sets id to passed path", function() {
            var path = new Path();
            element.clip(path);

            ok(path.id);
        });

        test("clip setting null clears clip", function() {
            var path = new Path();
            element.clip(path);
            element.clip(null);

            equal(element.options.clip, null);
        });

        test("clip does not override id if it is already set to the passed path ", function() {
            var path = new Path();
            path.id = "foo";
            element.clip(path);

            equal(path.id, "foo");
        });

        test("clip returns clip option", function() {
            element.options.clip = "foo";

            equal(element.clip(), "foo");
        });

        test("visible returns true if visible option is not defined", function() {
            ok(element.visible());
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
        var Gradient = d.Gradient;
        var shape;

        module("Shape base tests / " + name, {
            setup: function() {
                shape = new TShape();
            }
        });

        test("fill sets color and opacity", function() {
            shape.fill("red", 1);

            equal(shape.options.fill.color, "red");
            equal(shape.options.fill.opacity, 1);
        });

        test("fill sets gradient", function() {
            var gradient = new Gradient({});
            shape.fill(gradient);

            equal(shape.options.fill, gradient);
        });

        test("fill sets color and opacity if current fill is gradient", function() {
            shape.fill(new Gradient({}));
            shape.fill("red", 1);

            equal(shape.options.fill.color, "red");
            equal(shape.options.fill.opacity, 1);
        });

        test("fill sets gradient if current field is not", function() {
            var gradient = new Gradient({});
            shape.fill("red", 1);
            shape.fill(gradient);

            equal(shape.options.fill, gradient);
        });

        test("fill sets null", function() {
            shape.fill(null);

            equal(shape.options.fill, null);
        });

        test("fill triggers optionsChange", function() {
            shape.addObserver({
                optionsChange: function() {
                    ok(true);
                }
            });

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
            shape.addObserver({
                optionsChange: function() {
                    ok(true);
                }
            });

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

            group.addObserver({
                childrenChange: function() {
                    ok(true);
                }
            });

            group.append(child);
        });

        test("append is chainable", function() {
            equal(group.append(new Group()), group);
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
            group.addObserver({
                childrenChange: function(args) {
                    equal(args.action, "remove");
                    ok(args.items[0] === toRemove);
                    equal(args.index, 1);
                }
            });

            group.remove(toRemove);
        });

        test("remove does not trigger childrenChange if shape is not from group children", 0, function() {
            var child = new Group();
            var toRemove = new Group();
            group.append(child);

            group.addObserver({
                childrenChange: function(args) {
                    ok(false);
                }
            });

            group.remove(toRemove);
        });

        test("remove is chainable", function() {
            var child = new Group();
            group.append(child);

            equal(group.remove(child), group);
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
            group.addObserver({
                childrenChange: function(args) {
                    equal(args.action, "remove");
                    ok(args.items[0] === toRemove);
                    equal(args.index, 1);
                }
            });

            group.removeAt(1);
        });

        test("removeAt does not trigger childrenChange if index is out of range", 0, function() {
            var child = new Group();
            group.append(child);

            group.addObserver({
                childrenChange: function(args) {
                    ok(false);
                }
            });

            group.removeAt(-1);
            group.removeAt(1);
        });

        test("removeAt is chainable", function() {
            var child = new Group();
            group.append(child);

            equal(group.removeAt(0), group);
        });

        test("clear triggers childrenChange", function() {
            var child = new Group();
            group.append(child);

            group.addObserver({
                childrenChange: function() {
                    ok(true);
                }
            });

            group.clear();
        });

        test("clear sets children parent to null", function() {
            var child = new Group();
            group.append(child);
            group.clear();

            ok(child.parent === null);
        });

        test("clear is chainable", function() {
            equal(group.clear(), group);
        });

        test("visible triggers optionsChange", function() {
            group.addObserver({
                optionsChange: function() {
                    ok(true);
                }
            });

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
            var child = new Element();
            group.append(child);

            group.traverse(function(item) {
                deepEqual(item, child);
            });
        });

        test("traverse traverses child groups", function() {
            var childGroup = new Group();
            group.append(childGroup);
            var child = new Element();
            childGroup.append(child);

            group.traverse(function(item) {
                ok(true);
            });
        });

        test("traverse is chainable", function() {
            equal(group.traverse($.noop), group);
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

        // ------------------------------------------------------------
        module("Group / insertAt", {
            setup: function() {
                group = new Group();
                group.append(new Element(), new Element());
            }
        });

        test("insertAt adds child at beginning", function() {
            var child = new Element();
            group.insertAt(child, 0);

            deepEqual(group.children[0], child);
        });

        test("insertAt doesn't alter existing elements", function() {
            var child = new Element();
            group.insertAt(child, 0);

            equal(group.children.length, 3);
        });

        test("insertAt adds child at middle", function() {
            var child = new Element();
            group.insertAt(child, 1);

            deepEqual(group.children[1], child);
        });

        test("insertAt adds child at end", function() {
            var child = new Element();
            group.insertAt(child, 2);

            deepEqual(group.children[2], child);
        });

        test("insertAt sets child parent", function() {
            var child = new Element();
            group.append(child);

            ok(child.parent === group);
        });

        test("insertAt triggers childrenChange", function() {
            var child = new Element();

            group.addObserver({
                childrenChange: function(e) {
                    equal(e.action, "add");
                    equal(e.items[0], child);
                    equal(e.index, 1);
                }
            });

            group.insertAt(child, 1);
        });

        test("insertAt is chainable", function() {
            equal(group.insertAt(new Element()), group);
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
            text.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            text.position().setX(5);
        });

        test("position can be set to a Point instance", function() {
            var position = new g.Point(10, 10);
            text.position(position);
            equal(text.position(), position);
        });

        test("position sets new point observer", function() {
            var position = new g.Point(10, 10);
            text.position(position);
            equal(position.observers()[0], text);
        });

        test("position clears previous point observer", function() {
            var position = new g.Point(10, 10);
            text.position(position);
            text.position(new g.Point(10, 10));
            equal(position.observers().length, 0);
        });

        test("position can be set to an array", function() {
            text.position([10, 10]);
            deepEqual(text.position().toArray(), [10, 10]);
        });

        test("setting content triggers optionsChange", function() {
            text.addObserver({
                optionsChange: function() { ok(true); }
            });

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
            text.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

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
            equal(text.position().observers()[0], text);
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

        test("measure returns text metrics with default font", function() {
            deepEqual(text.measure(), d.util.measureText("Foo", { font: "12px sans-serif" }));
        });

        test("measure returns text metrics with custom font", function() {
            text.options.set("font", "15px sans-serif");
            deepEqual(text.measure(), d.util.measureText("Foo", { font: "15px sans-serif" }));
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
            circle.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            circle.geometry().center.setX(5);
        });

        test("changing the radius triggers geometryChange", function() {
            circle.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            circle.geometry().setRadius(5);
        });

        test("changing the geometry triggers geometryChange", function() {
            circle.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            circle.geometry(new Point(10, 10));
        });

        test("geometry sets new geometry observer", function() {
            var geometry = new g.Circle();
            circle.geometry(geometry);
            equal(geometry.observers()[0], circle);
        });

        test("geometry clears previous geometry observer", function() {
            var geometry = new g.Circle();
            circle.geometry(geometry);
            circle.geometry(new g.Circle());
            equal(geometry.observers().length, 0);
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
            arc.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            arc.geometry().center.setX(5);
        });

        test("changing a geometry field triggers geometryChange", 2, function() {
            arc.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            arc.geometry().setRadiusX(100);
            arc.geometry().setAnticlockwise(true);
        });

        test("changing geometry triggers geometryChange", function() {
            arc.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            arc.geometry(new g.Arc());
        });

        test("geometry sets new geometry observer", function() {
            var geometry = new g.Arc();
            arc.geometry(geometry);
            equal(geometry.observers()[0], arc);
        });

        test("geometry clears previous geometry observer", function() {
            var geometry = new g.Arc();
            arc.geometry(geometry);
            arc.geometry(new g.Arc());
            equal(geometry.observers().length, 0);
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
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            segment.anchor().setX(5);
        });

        test("setting the anchor point triggers geometryChange", function() {
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            segment.anchor(new Point());
        });

        test("anchor sets new point observer", function() {
            var anchor = new g.Point(10, 10);
            segment.anchor(anchor);
            equal(anchor.observers()[0], segment);
        });

        test("anchor clears previous point observer", function() {
            var anchor = new g.Point(10, 10);
            segment.anchor(anchor);
            segment.anchor(new g.Point(10, 10));
            equal(anchor.observers().length, 0);
        });

        test("anchor setter is chainable", function() {
            equal(segment.anchor(new Point()), segment);
        });

        test("anchor setter accepts array", function() {
            segment.anchor([10, 20]);
            ok(segment.anchor().equals(new Point(10, 20)));
        });

        test("changing the control point (in) triggers geometryChange", function() {
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            segment.controlIn().setX(5);
        });

        test("setting the control point (in) triggers geometryChange", function() {
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            segment.controlIn(new Point());
        });

        test("controlIn sets new point observer", function() {
            var controlIn = new g.Point(10, 10);
            segment.controlIn(controlIn);
            equal(controlIn.observers()[0], segment);
        });

        test("controlIn clears previous point observer", function() {
            var controlIn = new g.Point(10, 10);
            segment.controlIn(controlIn);
            segment.controlIn(new g.Point(10, 10));
            equal(controlIn.observers().length, 0);
        });

        test("controlIn setter is chainable", function() {
            equal(segment.controlIn(new Point()), segment);
        });

        test("controlIn setter accepts array", function() {
            segment.controlIn([10, 20]);
            ok(segment.controlIn().equals(new Point(10, 20)));
        });

        test("changing the control point (out) triggers geometryChange", function() {
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            segment.controlOut().setX(5);
        });

        test("controlOut sets new point observer", function() {
            var controlOut = new g.Point(10, 10);
            segment.controlOut(controlOut);
            equal(controlOut.observers()[0], segment);
        });

        test("controlOut clears previous point observer", function() {
            var controlOut = new g.Point(10, 10);
            segment.controlOut(controlOut);
            segment.controlOut(new g.Point(10, 10));
            equal(controlOut.observers().length, 0);
        });

        test("controlOut setter is chainable", function() {
            equal(segment.controlOut(new Point()), segment);
        });

        test("controlOut setter accepts array", function() {
            segment.controlOut([10, 20]);
            ok(segment.controlOut().equals(new Point(10, 20)));
        });

        test("setting the control point (out) triggers geometryChange", function() {
            segment.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

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

        function closePoints(p1, p2, tolerance) {
            close(p1.x, p2.x, tolerance);
            close(p1.y, p2.y, tolerance);
        };

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

        test("sets default linejoin", function() {
            equal(path.options.stroke.lineJoin, "miter");
        });

        test("doesn't override null stroke", function() {
            path = new Path({ stroke: null });
            equal(path.options.stroke, null);
        });

        test("default stroke can be overriden", function() {
            path = new Path({ stroke: { color: "foo" } });
            equal(path.options.stroke.color, "foo");
        });

        test("constructs path from Rect", function() {
            path = Path.fromRect(new g.Rect([10, 20], [100, 200]));
            compareBoundingBox(path.rawBBox(), [10, 20, 110, 220]);
        });

        test("constructs path from points", function() {
            var p0 = new g.Point(10, 20);
            var p1 = new g.Point(100, 200);
            path = Path.fromPoints([p0, p1]);

            ok(path.segments[0].anchor().equals(p0));
            ok(path.segments[1].anchor().equals(p1));
            equal(path.segments.length, 2);
        });

        test("constructs path from point arrays", function() {
            path = Path.fromPoints([[10, 20], [100, 200]]);
            equal(path.segments.length, 2);
        });

        test("constructs empty path from empty point list", function() {
            path = Path.fromPoints([]);
            equal(path.segments.length, 0);
        });

        test("returns undefined for undefined point list", function() {
            path = Path.fromPoints();
            equal(path, undefined);
        });

        test("moveTo adds segment", function() {
            path.moveTo(0, 0);
            equal(path.segments.length, 1);
        });

        test("moveTo accepts Point", function() {
            var p = new Point(10, 20);
            path.moveTo(p);
            ok(path.segments[0].anchor().equals(p));
        });

        test("moveTo accepts array", function() {
            path.moveTo([10, 20]);
            ok(path.segments[0].anchor().equals(new Point(10, 20)));
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

        test("moveTo triggers geometryChange once", 1, function() {
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            path.moveTo(0, 0);
        });

        test("lineTo adds segment", function() {
            path.lineTo(0, 0);
            equal(path.segments.length, 1);
        });

        test("lineTo accepts Point", function() {
            var p = new Point(10, 20);
            path.lineTo(p);
            ok(path.segments[0].anchor().equals(p));
        });

        test("lineTo accepts array", function() {
            path.lineTo([10, 20]);
            ok(path.segments[0].anchor().equals(new Point(10, 20)));
        });

        test("lineTo returns path", function() {
            deepEqual(path.lineTo(0, 0), path);
        });

        test("lineTo triggers geometryChange once", 1, function() {
            path.moveTo(0, 0);
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            path.lineTo([10, 10]);
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

        test("curveTo sets points from arrays", function() {
            path.moveTo(0, 0);
            path.curveTo([10, 10], [40, 20], [30, 30]);

            ok(path.segments[0].controlOut().equals(new Point(10, 10)));
            ok(path.segments[1].controlIn().equals(new Point(40, 20)));
            ok(path.segments[1].anchor().equals(new Point(30, 30)));
        });

        test("curveTo triggers geometryChange once", 1, function() {
            path.moveTo(0, 0);
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            path.curveTo([10, 10], [40, 20], [30, 30]);
        });

        test("arc adds arc curvePoints to path", function() {
            path.moveTo(200, 100);
            path.arc(30, 180, 100, 100);
            var expectedArc = new g.Arc([113.4, 50],{
                startAngle: 30,
                endAngle: 180,
                radiusX: 100,
                radiusY: 100,
                anticlockwise: false
            });
            var arcCurvePoints = expectedArc.curvePoints();
            var segments = path.segments;
            var segment;
            for (var idx = 0, pointIdx = 0; idx < segments.length; idx++) {
                segment = segments[idx];
                if (segment.controlIn()) {
                    closePoints(segment.controlIn(), arcCurvePoints[pointIdx++], 0.1);
                }
                closePoints(segment.anchor(),arcCurvePoints[pointIdx++], 0.1);
                if (segment.controlOut()) {
                    closePoints(segment.controlOut(), arcCurvePoints[pointIdx++], 0.1);
                }
            }
        });

        test("arc does nothing if move segment has not been set", function() {
            path.arc(30, 180, 100, 100);
            equal(path.segments.length, 0);
        });

        test("arc triggers geometry change once", 1, function() {
            path.moveTo(200, 100);
            path.addObserver({
                geometryChange: function() {
                    ok(true)
                }
            });

            path.arc(30, 180, 100, 100);
        });

        test("arcTo adds arc curvePoints to path", function() {
            path.moveTo(400, 300);
            path.arcTo(new Point(250, 256.7), 100, 50, true, true);
            var expectedArc = new g.Arc([300, 300],{
                startAngle: 0,
                endAngle: -120,
                radiusX: 100,
                radiusY: 50,
                anticlockwise: false
            });
            var arcCurvePoints = expectedArc.curvePoints();
            var segments = path.segments;
            var segment;
            for (var idx = 0, pointIdx = 0; idx < segments.length; idx++) {
                segment = segments[idx];
                if (segment.controlIn()) {
                    closePoints(segment.controlIn(), arcCurvePoints[pointIdx++], 0.1);
                }
                closePoints(segment.anchor(),arcCurvePoints[pointIdx++], 0.1);
                if (segment.controlOut()) {
                    closePoints(segment.controlOut(), arcCurvePoints[pointIdx++], 0.1);
                }
            }
        });

        test("arcTo does nothing if move segment has not been set", function() {
            path.arcTo(new Point(250, 256.7), 100, 50, true, true);
            equal(path.segments.length, 0);
        });

        test("arcTo triggers geometry change once", 1, function() {
            path.moveTo(400, 300);
            path.addObserver({
                geometryChange: function() {
                    ok(true)
                }
            });

            path.arcTo(new Point(250, 256.7), 100, 50, true, true);
        });


        test("changing the control points triggers geometryChange", 2, function() {
            var controlOut = Point.create(10, 10),
                controlIn = Point.create(40, 20);
            path.moveTo(0, 0);
            path.curveTo(controlOut, controlIn, Point.create(30,30));
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            controlOut.setX(20);
            controlIn.setY(30);
        });

        test("adding a point triggers geometryChange", function() {
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            path.moveTo(0, 0);
        });

        test("close sets closed", function() {
            path.close();
            ok(path.options.closed);
        });

        test("close triggers geometryChange", function() {
            path.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            path.close();
        });

        test("close does not trigger optionsChange", 0, function() {
            path.addObserver({
                geometryChange: $.noop,
                optionsChange: function() {
                    ok(false);
                }
            });

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

        // ------------------------------------------------------------
        module("Path / Class methods");

        test("fromRect creates path from the passed rectangle", function() {
            var path = Path.fromRect(new g.Rect([10, 20], [50, 50]));

            ok(path.segments[0].anchor().equals({
                x: 10,
                y: 20
            }));
            ok(path.segments[1].anchor().equals({
                x: 60,
                y: 20
            }));
            ok(path.segments[2].anchor().equals({
                x: 60,
                y: 70
            }));
            ok(path.segments[3].anchor().equals({
                x: 10,
                y: 70
            }));
            ok(path.options.get("closed"));
        });

        test("fromRect creates path with the specified options", function() {
            var path = Path.fromRect(new g.Rect(), {
                foo: "bar"
            });

            equal(path.options.get("foo"), "bar");
        });

        test("fromArc adds creates path from arc", function() {
            var arc = new g.Arc([113.4, 50],{
                startAngle: 30,
                endAngle: 180,
                radiusX: 100,
                radiusY: 100,
                anticlockwise: false
            });
            var arcPath = Path.fromArc(arc);

            path.moveTo(200, 100);
            path.arc(30, 180, 100, 100);

            var arcSegments = arcPath.segments;
            var segments = path.segments;
            equal(arcSegments.length, segments.length);
            for (var idx = 0; idx < segments.length; idx++) {
                if (segments[idx].controlIn()) {
                    closePoints(segments[idx].controlIn(), arcSegments[idx].controlIn(), 0.1);
                }
                closePoints(segments[idx].anchor(), arcSegments[idx].anchor(), 0.1);
                if (segments[idx].controlOut()) {
                    closePoints(segments[idx].controlOut(), arcSegments[idx].controlOut(), 0.1);
                }
            }
        });
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

        test("moveTo adds new path", function() {
            multiPath.moveTo(0, 0).lineTo(0, 0).moveTo(0, 0);
            equal(multiPath.paths.length, 2);
        });

        test("moveTo returns multiPath", function() {
            deepEqual(multiPath.moveTo(0, 0), multiPath);
        });

        test("moveTo triggers geometryChange once", 1, function() {
            multiPath.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });
            multiPath.moveTo(0, 0);
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

        test("arc does nothing if there are no paths", function() {
            multiPath.arc(30, 180, 100, 100);
            equal(multiPath.paths.length, 0);
        });

        test("arc adds arc to last path", function() {
            multiPath.moveTo(200, 100);
            multiPath.paths[0].arc = function(start, end, rx, ry, anticlockwise) {
                equal(start, 30);
                equal(end, 180);
                equal(rx, 100);
                equal(ry, 100);
                equal(anticlockwise, true);
            };
            multiPath.arc(30, 180, 100, 100, true);
        });

        test("arcTo does nothing if there are no paths", function() {
            multiPath.arcTo(new Point(250, 256.7), 100, 50, true, true);
            equal(multiPath.paths.length, 0);
        });

        test("arcTo adds arc to last path", function() {
            multiPath.moveTo(400, 300);
            multiPath.paths[0].arcTo = function(end, rx, ry, largeArc, swipe) {
                equal(end.x, 250);
                equal(end.y, 256.7);
                equal(rx, 100);
                equal(ry, 50);
                ok(largeArc);
                ok(swipe);
            };
            multiPath.arcTo(new Point(250, 256.7), 100, 50, true, true);
        });

        test("changing the control points triggers geometryChange", 2, function() {
            var controlOut = Point.create(10, 10),
                controlIn = Point.create(40, 20);
            multiPath.moveTo(0, 0);
            multiPath.curveTo(controlOut, controlIn, Point.create(30,30));
            multiPath.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

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
            image.addObserver({
                optionsChange: function() {
                    ok(true);
                }
            });

            image.src("bar");
        });

        test("src setter is chainable", function() {
            equal(image.src("bar"), image);
        });

        test("rect returns current rect", function() {
            equal(image.rect(), rect);
        });

        test("rect setter triggers geometryChange", function() {
            image.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

            image.rect(new g.Rect());
        });

        test("rect sets new rect observer", function() {
            var rect = new g.Rect();
            image.rect(rect);
            equal(rect.observers()[0], image);
        });

        test("rect clears previous rect observer", function() {
            var rect = new g.Rect();
            image.rect(rect);
            image.rect(new g.Rect());
            equal(rect.observers().length, 0);
        });

        test("rect setter is chainable", function() {
            equal(image.rect(new g.Rect()), image);
        });

        test("changing the rect triggers geometryChange", function() {
            image.addObserver({
                geometryChange: function() {
                    ok(true);
                }
            });

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

    // ------------------------------------------------------------
    (function() {
        var GradientStop = d.GradientStop;
        var stop;

        module("GradientStop", {
            setup: function() {
                stop = new GradientStop(0.5, "foo", 0.7);
            }
        });

        test("inits offset", function() {
            equal(stop.options.offset, 0.5);
        });

        test("inits color", function() {
            equal(stop.options.color, "foo");
        });

        test("inits opacity", function() {
            equal(stop.options.opacity, 0.7);
        });

        test("inits zero opacity", function() {
            stop = new GradientStop(0.5, "foo", 0);
            equal(stop.options.opacity, 0);
        });

        test("sets opacity to one if not specified", function() {
            stop = new GradientStop(0.5, "foo");
            equal(stop.options.opacity, 1);
        });

        test("offset sets offset", function() {
            stop.offset(1);
            equal(stop.options.offset, 1);
        });

        test("offset triggers options change", function() {
            stop.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "offset");
                    equal(e.value, 1);
                }
            });
            stop.offset(1);
        });

        test("color sets color", function() {
            stop.color("bar");
            equal(stop.options.color, "bar");
        });

        test("color triggers options change", function() {
            stop.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "color");
                    equal(e.value, "bar");
                }
            });
            stop.color("bar");
        });

        test("opacity sets opacity", function() {
            stop.opacity(0.1);
            equal(stop.options.opacity, 0.1);
        });

        test("opacity triggers options change", function() {
            stop.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "opacity");
                    equal(e.value, 0.1);
                }
            });
            stop.opacity(0.1);
        });

        module("GradientStop / create");

        test("returns existing instance", function() {
            stop = new GradientStop();
            equal(GradientStop.create(stop), stop);
        });

        test("creates stop from array", function() {
            stop = GradientStop.create([0.5, "red", 0.1]);
            equal(stop.offset(), 0.5);
            equal(stop.color(), "red");
            equal(stop.opacity(), 0.1);
        });

        test("creates stop from object", function() {
            stop = GradientStop.create({
                color: "red",
                offset: 0.5,
                opacity: 0.1
            });
            equal(stop.offset(), 0.5);
            equal(stop.color(), "red");
            equal(stop.opacity(), 0.1);
        });

    })();

    // ------------------------------------------------------------
    function gradientBaseTests(name, type) {
        var GradientStop = d.GradientStop;
        var gradient;
        var stops;

        module(name + " base tests", {
            setup: function() {
                stops = [new GradientStop(), new GradientStop()];
                gradient = new type({
                    stops: stops,
                    userSpace: true
                });
            }
        });

        test("inits stops", function() {
            equal(gradient.stops.length, 2);
        });

        test("inits userSpace", function() {
            ok(gradient.userSpace());
        });

        test("userSpace is false by default", function() {
            gradient = new type({});
            ok(!gradient.userSpace());
        });

        test("changing userSpace triggers optionsChange", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            gradient.userSpace(false);
        });

        test("inits stops from array of arrays", function() {
            gradient = new type({
                stops: [[0.5, "red"]]
            });
            var stop = gradient.stops[0];
            ok(stop instanceof GradientStop);
            equal(stop.offset(), 0.5);
            equal(stop.color(), "red");
        });

        test("inits stops from array of plain objects", function() {
            gradient = new type({
                stops: [{
                    offset: 0.5,
                    color: "red"
                }]
            });
            var stop = gradient.stops[0];
            ok(stop instanceof GradientStop);
            equal(stop.offset(), 0.5);
            equal(stop.color(), "red");
        });

        test("inits id", function() {
            ok(gradient.id);
        });

        test("modifying stops array triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient.stops");
                }
            });
            gradient.stops.pop();
        });

        test("addStop adds new stop", function() {
            gradient.addStop(1, "foo", 0.5);
            var stop = gradient.stops[2];

            ok(stop instanceof GradientStop);
            equal(stop.offset(), 1);
            equal(stop.color(), "foo");
            equal(stop.opacity(), 0.5);
        });

        test("addStop triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient.stops");
                }
            });
            gradient.addStop(1, "foo", 0.5);
        });

        test("removeStop removes stop", function() {
            gradient.removeStop(gradient.stops[1]);

            equal(gradient.stops.length, 1);
        });

        test("removeStop triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient.stops");
                }
            });
            gradient.removeStop(gradient.stops[1]);
        });

        test("removeStop does not remove stop if passed instance is not from the gradient stops", 1, function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    ok(false);
                }
            });
            gradient.removeStop(new GradientStop());

            equal(gradient.stops.length, 2);
        });
    }

    // ------------------------------------------------------------
    (function() {
        var LinearGradient = d.LinearGradient;
        var gradient;
        var start;
        var end;

        gradientBaseTests("LinearGradient", LinearGradient);

        module("LinearGradient", {
            setup: function() {
                start = new Point();
                end = new Point();
                gradient = new LinearGradient({
                    start: start,
                    end: end
                });
            }
        });

        test("inits start point", function() {
            equal(gradient.start(), start);
        });

        test("inits end point", function() {
            equal(gradient.end(), end);
        });

        test("inits default start and end point if not passed", function() {
            gradient = new LinearGradient();
            start = gradient.start();
            end = gradient.end();
            equal(start.x, 0);
            equal(start.y, 0);
            equal(end.x, 1);
            equal(end.y, 0);
        });

        test("changing point field triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            start.setX(1);
        });

        test("changing point triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            gradient.start(new Point());
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var RadialGradient = d.RadialGradient;
        var gradient;
        var center;

        gradientBaseTests("RadialGradient", RadialGradient);

        module("RadialGradient", {
            setup: function() {
                center = new Point(1, 1);
                gradient = new RadialGradient({
                    center: center,
                    radius: 0.5,
                    fallbackFill: {
                        color: "red",
                        opacity: 0.1
                    }
                });
            }
        });

        test("inits center point", function() {
            equal(gradient.center(), center);
        });

        test("inits radius", function() {
            equal(gradient.radius(), 0.5);
        });

        test("inits fallbackFill", function() {
            var fill = gradient.fallbackFill();
            equal(fill.color, "red");
            equal(fill.opacity, 0.1);
        });

        test("inits default center and radius if not passed", function() {
            gradient = new RadialGradient();
            center = gradient.center();
            equal(center.x, 0);
            equal(center.y, 0);
            equal(gradient.radius(), 1);
        });

        test("changing center field triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            center.setX(0);
        });

        test("changing center triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            gradient.center(new Point());
        });

        test("changing radius triggers options change", function() {
            gradient.addObserver({
                optionsChange: function(e) {
                    equal(e.field, "gradient");
                }
            });
            gradient.radius(1);
        });

    })();
})();
