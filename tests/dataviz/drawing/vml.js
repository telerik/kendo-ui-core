(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        d = dataviz.drawing,
        Circle = d.Circle,
        Group = d.Group,
        MultiPath = d.MultiPath,
        Path = d.Path,

        vml = d.vml,
        Node = vml.Node,
        ArcNode = vml.ArcNode,
        CircleNode = vml.CircleNode,
        CircleTransformNode = vml.CircleTransformNode,
        FillNode = vml.FillNode,
        GroupNode = vml.GroupNode,
        PathNode = vml.PathNode,
        MultiPathNode = vml.MultiPathNode,
        Surface = vml.Surface,
        StrokeNode = vml.StrokeNode,
        TransformNode = vml.TransformNode;

    function compareMatrices(m1, m2, tolerance) {
        tolerance = tolerance  || 0;
        close(m1.a, m2.a, tolerance);
        close(m1.b, m2.b, tolerance);
        close(m1.c, m2.c, tolerance);
        close(m1.d, m2.d, tolerance);
        close(m1.e, m2.e, tolerance);
        close(m1.f, m2.f, tolerance);
    }

    // ------------------------------------------------------------
    var container,
        surface;

    module("Surface", {
        setup: function() {
            container = QUnit.fixture[0];
            surface = new Surface(container);
        }
    });

    test("sets initial options", function() {
        surface = new Surface(container, { foo: true });
        ok(surface.options.foo);
    });

    test("appends element to container", function() {
        equal(QUnit.fixture.find("div").length, 1);
    });

    test("draw attaches element to root node", function() {
        var group = new Group();
        surface.draw(group);

        deepEqual(surface._root.childNodes[0].srcElement, group);
    });

    test("clear removes element from root node", function() {
        var group = new Group();
        surface.draw(group);
        surface.clear();

        equal(surface._root.childNodes.length, 0);
    });

    test("getSize returns element dimensions", function() {
        $(surface.element).css({ width: 1000, height: 1000 });

        deepEqual(surface.getSize(), {
            width: 1000,
            height: 1000
        });
    });

    test("setSize sets element dimensions", function() {
        deepEqual(surface.setSize({
            width: 100,
            height: 100
        }));

        deepEqual(surface.getSize(), {
            width: 100,
            height: 100
        });
    });

    // ------------------------------------------------------------
    module("Surface / Events", {
        setup: function() {
            container = QUnit.fixture[0];
            surface = new Surface(container);
        }
    });

    test("binds initial handlers", function() {
        surface = new Surface(container, {
            click: function() { ok(true); }
        });

        surface.trigger("click");
    });

    test("clicking a node triggers click", function() {
        surface.draw(new Group());
        surface.bind("click", function() { ok(true); });

        $(surface._root.childNodes[0].element).trigger("click");
    });

    test("click has reference to shape", function() {
        var group = new Group();
        surface.draw(group);
        surface.bind("click", function(e) { deepEqual(e.shape, group); });

        $(surface._root.childNodes[0].element)
            .trigger("click", { toElement: surface._root.childNodes[0].element });
    });

    // ------------------------------------------------------------
    var node;

    module("Node", {
        setup: function() {
            node = new Node();
        }
    });

    test("load appends GroupNode", function() {
        node.append = function(child) {
            ok(child instanceof GroupNode);
        };

        node.load([new Group()]);
    });

    test("load appends PathNode", function() {
        node.append = function(child) {
            ok(child instanceof PathNode);
        };

        node.load([new Path()]);
    });

    test("load appends PathNode with srcElement transformation", function() {
        var matrix = new Matrix(2,2,2,2,2,2),
            path = new Path({transform: matrix});
        node.append = function(child) {
            compareMatrices(child.transform.matrix, matrix);
        };
        node.load([path]);
    });

    test("load appends PathNode with current transformation", function() {
        var matrix = new Matrix(2,2,2,2,2,2),
            path = new Path();
        node.append = function(child) {
            compareMatrices(child.transform.matrix, matrix);
        };
        node.load([path], matrix);
    });

    test("load appends PathNode with combined transformation", function() {
        var matrix = new Matrix(3,3,3,3,3,3),
            currentMatrix = new Matrix(2,2,2,2,2,2),
            combinedMatrix = currentMatrix.times(matrix),
            path = new Path({transform: matrix});

        node.append = function(child) {
            compareMatrices(child.transform.matrix, combinedMatrix);
        };
        node.load([path], currentMatrix);
    });

    test("load appends MultiPathNode", function() {
        node.append = function(child) {
            ok(child instanceof MultiPathNode);
        };

        node.load([new MultiPath()]);
    });

    test("load appends CircleNode", function() {
        node.append = function(child) {
            ok(child instanceof CircleNode);
        };

        node.load([new Circle(new g.Circle())]);
    });

    test("load appends child nodes", function() {
        var parentGroup = new Group()
        var childGroup = new Group();
        parentGroup.append(childGroup);

        node.load([parentGroup]);

        ok(node.childNodes[0].childNodes[0] instanceof GroupNode);
    });

    test("attachTo renders children", 2, function() {
        var ChildNode = Node.extend({});

        var child = new ChildNode();
        node.append(child);

        var grandChild = new ChildNode();
        child.append(grandChild);

        ChildNode.fn.render = function() {
            ok(true);
            return Node.fn.render.call(this);
        };

        node.attachTo(document.createElement("div"));
    });

    (function() {
        var groupLoad = GroupNode.fn.load;

        module("Node / group load transformations", {
            teardown: function() {
                GroupNode.fn.load = groupLoad;
            }
        });

        test("load passes element transformation", function() {
            var matrix = new Matrix(2,2,2,2,2,2),
                group = new Group({transform: matrix});

            group.append(new Group());
            GroupNode.fn.load = function(children, transform) {
                compareMatrices(transform, matrix);
            };
            node.load([group]);
        });

        test("load passes current transformation", function() {
            var matrix = new Matrix(2,2,2,2,2,2),
                group = new Group();

            group.append(new Group());
            GroupNode.fn.load = function(children, transform) {
                compareMatrices(transform, matrix);
            };
            node.load([group], matrix);
        });

        test("load passes combined transformation", function() {
            var matrix = new Matrix(3,3,3,3,3,3),
                currentMatrix = new Matrix(2,2,2,2,2,2),
                combinedMatrix = currentMatrix.times(matrix),
                group = new Group({transform: matrix});

            group.append(new Group());
            GroupNode.fn.load = function(children, transform) {
                compareMatrices(transform, combinedMatrix);
            };
            node.load([group], currentMatrix);
        });

    })();

    // ------------------------------------------------------------
    module("RootNode");

    test("attachTo directly sets element", function() {
        var rootNode = new vml.RootNode();
        var container = document.createElement("div");
        rootNode.attachTo(container);

        deepEqual(rootNode.element, container);
    });

    // ------------------------------------------------------------
    var groupNode;

    module("GroupNode", {
        setup: function() {
            groupNode = new GroupNode();
        }
    });

    test("attachTo sets element", function() {
        groupNode.attachTo(document.createElement("div"));

        ok(groupNode.element);
    });

    test("attachTo sets element for child nodes", function() {
        groupNode.append(new GroupNode());
        groupNode.attachTo(document.createElement("div"));

        ok(groupNode.childNodes[0].element);
    });

    test("attachTo sets element for grandchild nodes", function() {
        var child = new GroupNode();
        var grandChild = new GroupNode();

        child.append(grandChild);
        groupNode.append(child);

        groupNode.attachTo(document.createElement("div"));

        ok(grandChild.element);
    });

    test("attachTo sets _kendoNode expando", function() {
        groupNode.attachTo(document.createElement("div"));

        deepEqual(groupNode.element._kendoNode, groupNode);
    });

    test("attachTo sets _kendoNode expando on child elements", function() {
        var childGroup = new GroupNode();
        groupNode.append(childGroup);
        groupNode.attachTo(document.createElement("div"));

        deepEqual(childGroup.element._kendoNode, childGroup);
    });

    test("attachTo sets _kendoNode expando for grandchild nodes", function() {
        var child = new GroupNode();
        var grandChild = new GroupNode();

        child.append(grandChild);
        groupNode.append(child);

        groupNode.attachTo(document.createElement("div"));

        deepEqual(grandChild.element._kendoNode, grandChild);
    });

    test("clear removes element", function() {
        groupNode.attachTo(document.createElement("div"));
        groupNode.clear();

        ok(!groupNode.element);
    });

    test("clear removes _kendoNode expando from element", function() {
        var container = document.createElement("div");
        groupNode.attachTo(container);
        groupNode.clear();

        ok(!container._kendoNode);
    });

    test("load attaches node", function() {
        groupNode.attachTo(document.createElement("div"));

        var group = new Group();
        groupNode.load([group]);

        ok(groupNode.childNodes[0].element);
    });

    test("renders div tag", function() {
        equal(groupNode.render(), "<div></div>");
    });

    // ------------------------------------------------------------
    var path,
        strokeNode,
        container;

    module("StrokeNode", {
        setup: function() {
            container = document.createElement("div");

            path = new Path();
            strokeNode = new StrokeNode(path);
            strokeNode.attachTo(container);
        }
    });

    test("renders on attribute", function() {
        path.options.set("stroke.color", "red");

        ok(strokeNode.render().indexOf("on='true'") !== -1);
    });

    test("renders on attribute when no stroke is set", function() {
        ok(strokeNode.render().indexOf("on='false'") !== -1);
    });

    test("renders color", function() {
        path.options.set("stroke.color", "red");

        ok(strokeNode.render().indexOf("color='red'") !== -1);
    });

    test("renders stroke width", function() {
        path.options.set("stroke.width", 2);

        ok(strokeNode.render().indexOf("weight='2px'") !== -1);
    });

    test("renders stroke opacity", function() {
        path.options.set("stroke.opacity", 0.5);

        ok(strokeNode.render().indexOf("opacity='0.5'") !== -1);
    });

    test("does not render stroke opacity if not set", function() {
        equal(strokeNode.render().indexOf("opacity="), -1);
    });

    test("renders stroke dashType", function() {
        path.options.set("stroke.dashType", "dot");

        ok(strokeNode.render().indexOf("dashstyle='dot'") !== -1);
    });

    test("does not render stroke dashType if not set", function() {
        equal(strokeNode.render().indexOf("dashstyle="), -1);
    });

    test("optionsChange sets stroke color", function() {
        strokeNode.attr = function(name, value) {
            equal(name, "color");
            equal(value, "red");
        };

        path.options.set("stroke.color", "red");
    });

    test("optionsChange sets stroke width", function() {
        strokeNode.attr = function(name, value) {
            equal(name, "weight");
            equal(value, 4);
        };

        path.options.set("stroke.width", 4);
    });

    test("optionsChange sets stroke opacity", function() {
        strokeNode.attr = function(name, value) {
            equal(name, "opacity");
            equal(value, 0.4);
        };

        path.options.set("stroke.opacity", 0.4);
    });

    test("optionsChange sets stroke dashType", function() {
        strokeNode.attr = function(name, value) {
            equal(name, "dashstyle");
            equal(value, "dot");
        };

        path.options.set("stroke.dashType", "dot");
    });

    test("optionsChange sets stroke", 3, function() {
        strokeNode.attr = function(name, value) {
            if (name === "color") {
                equal(value, "red");
            } else if (name === "opacity") {
                equal(value, 0.4);
            } else if (name === "weight") {
                equal(value, "4px");
            }
        };

        path.options.set("stroke", { color: "red", opacity: 0.4, width: 4 });
    });

    test("optionsChange clears stroke", 2, function() {
        strokeNode.attr = function(name, value) {
            equal(name, "on");
            equal(value, "false");
        };

        path.options.set("stroke", null);
    });

    // ------------------------------------------------------------
    var path,
        fillNode,
        container;

    module("FillNode", {
        setup: function() {
            container = document.createElement("div");

            path = new Path();
            fillNode = new FillNode(path);
            fillNode.attachTo(container);
        }
    });

    test("renders on attribute if no fill set", function() {
        path.options.set("fill", { color: "red" });
        ok(fillNode.render().indexOf("on='true'") !== -1);
    });

    test("renders on attribute if no fill set", function() {
        ok(fillNode.render().indexOf("on='false'") !== -1);
    });

    test("renders on attribute if set to transparent", function() {
        path.options.set("fill.color", "transparent");
        ok(fillNode.render().indexOf("on='false'") !== -1);
    });

    test("renders color", function() {
        path.options.set("fill", { color: "red" });
        var vml = fillNode.render();

        ok(vml.indexOf("color='red'") !== -1);
    });

    test("renders opacity", function() {
        path.options.set("fill", { opacity: 0.5 });
        var vml = fillNode.render();

        ok(vml.indexOf("opacity='0.5'") !== -1);
    });

    test("optionsChange sets fill color", function() {
        fillNode.attr = function(name, value) {
            if (name === "color") {
                equal(value, "red");
            }
        };

        path.options.set("fill.color", "red");
    });

    test("optionsChange sets fill opacity", function() {
        fillNode.attr = function(name, value) {
            equal(name, "opacity");
            equal(value, 0.4);
        };

        path.options.set("fill.opacity", 0.4);
    });

    test("optionsChange clears fill for transparent", function() {
        fillNode.attr = function(name, value) {
            equal(name, "on");
            equal(value, "false");
        };

        path.options.set("fill.color", "transparent");
    });

    test("optionsChange sets fill", 3, function() {
        fillNode.attr = function(name, value) {
            if (name === "color") {
                equal(value, "red");
            } else if (name === "opacity") {
                equal(value, 0.4);
            } else if (name === "on") {
                equal(value, "true");
            } else {
                ok(false);
            }
        };

        path.options.set("fill", { color: "red", opacity: 0.4 });
    });

    test("optionsChange clears fill", 2, function() {
        fillNode.attr = function(name, value) {
            equal(name, "on");
            equal(value, "false");
        };

        path.options.set("fill", null);
    });

    // ------------------------------------------------------------

    var transformNode;

    module("TransformNode", {
        setup: function() {
            transformNode = new TransformNode(new d.Element(), new Matrix(1,2,3,4,5,6));
        }
    });

    test("renders skew element", function() {
        equal(transformNode.render().indexOf("<kvml:skew"), 0);
    });

    test("sets on to true when matrix is available", function() {
        ok(transformNode.render().indexOf("on='true'") !== -1);
    });

    test("sets on to false when matrix is not available", function() {
        transformNode = new TransformNode(new d.Element());
        ok(transformNode.render().indexOf("on='false'") !== -1);
    });

    test("renders matrix attribute", function() {
        ok(transformNode.render().indexOf("matrix='1,3,2,4,0,0'") !== -1);
    });

    test("rounds matrix values to the MAX_PRECISION digit", function() {
        var value = new Number("0." + new Array(TransformNode.fn.MAX_PRECISION + 1).join("5"));
        transformNode = new TransformNode(new d.Element(), new Matrix(value, 0, 0, 1, 0, 0));
        ok(/matrix='(\d\.\d+)/g.exec(transformNode.render())[1] == dataviz.util.round(value, TransformNode.fn.MAX_PRECISION));
    });

    test("does not render matrix attribute if there is no matrix", function() {
        transformNode = new TransformNode(new d.Element());
        ok(transformNode.render().indexOf("matrix") === -1);
    });

    test("renders offset attribute", function() {
        ok(transformNode.render().indexOf("offset='5px,6px'") !== -1);
    });

    test("does not render offset attribute if there is no matrix", function() {
        transformNode = new TransformNode(new d.Element());
        ok(transformNode.render().indexOf("offset") === -1);
    });

    test("renders origin attribute", function() {
        ok(transformNode.render().indexOf("origin='-0.5,-0.5'") !== -1);
    });

    test("does not render origin attribute if there is no matrix", function() {
        transformNode = new TransformNode(new d.Element());
        ok(transformNode.render().indexOf("origin") === -1);
    });

    test("options change updates attributes", 4, function() {
        var element = new d.Element(),
            expectedValues = {
                on: "true",
                matrix: "1,3,2,4,0,0",
                offset: "5px,6px",
                origin: "-0.5,-0.5"
            };
        transformNode = new TransformNode(element);
        transformNode.attr = function(key, value) {
            equal(expectedValues[key], value);
        };
        element.options.set("transform", new Matrix(1,2,3,4,5,6));
    });

    test("clearing transform updates attributes", 1, function() {
        var element = new d.Element(),
            expectedValues = {
                on: "false"
            };
        transformNode = new TransformNode(element);
        transformNode.attr = function(key, value) {
            equal(expectedValues[key], value);
        };
        element.options.set("transform", null);
    });

    // ------------------------------------------------------------
    var path,
        pathNode,
        container;

    module("PathNode", {
        setup: function() {
            container = document.createElement("div");

            path = new Path();
            pathNode = new PathNode(path);
            pathNode.attachTo(container);
        }
    });

    test("sets observer", function() {
        equal(path.observer, pathNode);
    });

    test("initializes a TransformNode", function() {
        ok(pathNode.transform instanceof TransformNode);
    });

    test("renders straight segments", function() {
        path.moveTo(0, 0).lineTo(10, 20).lineTo(20, 30);

        ok(pathNode.render().indexOf("v='m 0,0 l 1000,2000 2000,3000 e'") !== -1);
    });

    test("renders curve", function() {
        path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

        ok(pathNode.render().indexOf("v='m 0,0 c 1000,1000 2000,1000 3000,0 e'") !== -1);
    });

    test("switches between line and curve", function() {
        path.moveTo(0, 0).lineTo(5, 5).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

        ok(pathNode.render().indexOf("v='m 0,0 l 500,500 c 1000,1000 2000,1000 3000,0 e'") !== -1);
    });

    test("switches between curve and line", function() {
        path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0)).lineTo(40, 10);

        ok(pathNode.render().indexOf("v='m 0,0 c 1000,1000 2000,1000 3000,0 l 4000,1000 e'") !== -1);
    });

    test("renders closed paths", function() {
        path.moveTo(0, 0).lineTo(10, 20).close();

        ok(pathNode.render().indexOf("v='m 0,0 l 1000,2000 x e'") !== -1);
    });

    test("does not render segments for empty path", function() {
        equal(pathNode.render().indexOf("v="), -1);
    });

    test("renders stroke", function() {
        path.options.set("stroke.color", "red");

        ok(pathNode.render().indexOf("kvml:stroke") !== -1);
    });

    test("renders fill", function() {
        path.options.set("fill.color", "red");

        ok(pathNode.render().indexOf("kvml:fill") !== -1);
    });

    test("renders cursor", function() {
        path.options.set("cursor", "hand");
        ok(pathNode.render().indexOf("cursor:hand;") !== -1);
    });

    test("does not render cursor if not set", function() {
        ok(pathNode.render().indexOf("cursor") === -1);
    });

    test("renders visibility attribute", function() {
        path.visible(false);
        ok(pathNode.render().indexOf("display:none;") !== -1);
    });

    test("does not render visibility if not set", function() {
        ok(pathNode.render().indexOf("display:none;") === -1);
    });

    test("does not render visibility if set to true", function() {
        path.visible(true);
        ok(pathNode.render().indexOf("display:none;") === -1);
    });

    test("renders coordsize", function() {
        ok(pathNode.render().indexOf("coordsize='10000 10000'") !== -1);
    });

    test("renders width", function() {
        ok(pathNode.render().indexOf("width:100px;") !== -1);
    });

    test("renders height", function() {
        ok(pathNode.render().indexOf("height:100px;") !== -1);
    });

    test("geometryChange sets path", function() {
        path.moveTo(0, 0);
        pathNode.attr = function(name, value) {
            equal(name, "v");
            ok(value);
        };

        path.lineTo(10, 10);
    });

    test("optionsChange is forwarded to stroke", function() {
        pathNode.stroke.optionsChange = function() {
            ok(true);
        };

        path.options.set("stroke", { width: 1 });
    });

    test("optionsChange is not forwarded to stroke", 0, function() {
        pathNode.stroke.optionsChange = function() {
            ok(true);
        };

        path.options.set("foo", true);
    });

    test("optionsChange is forwarded to fill", function() {
        pathNode.fill.optionsChange = function() {
            ok(true);
        };

        path.options.set("fill", { color: "red" });
    });

    test("optionsChange is not forwarded to fill", 0, function() {
        pathNode.fill.optionsChange = function() {
            ok(true);
        };

        path.options.set("foo", true);
    });

    test("optionsChange sets visibility to hidden", function() {
        pathNode.css = function(name, value) {
            equal(name, "display");
            equal(value, "none");
        };

        path.visible(false);
    });

    test("optionsChange sets visibility to visible", function() {
        pathNode.css = function(name, value) {
            equal(name, "display");
            equal(value, "block");
        };

        path.visible(true);
    });

    test("optionsChange is forwarded to transform", function() {
        pathNode.transform.optionsChange = function(e) {
            ok(true);
        };

        path.options.set("transform", Matrix.unit());
    });

    test("optionsChange is not forwarded to transform", 0, function() {
        pathNode.transform.optionsChange = function() {
            ok(true);
        };

        path.options.set("foo", true);
    });

    // ------------------------------------------------------------
    var multiPath,
        multiPathNode;

    module("MultiPathNode", {
        setup: function() {
            multiPath = new MultiPath();
            multiPathNode = new MultiPathNode(multiPath);
        }
    });

    test("renders composite paths", function() {
        multiPath
            .moveTo(0, 0).lineTo(10, 20)
            .moveTo(10, 10).lineTo(10, 20);

        ok(multiPathNode.render().indexOf("v='m 0,0 l 1000,2000 m 1000,1000 l 1000,2000 e'") !== -1);
    });

    test("renders coordsize", function() {
        ok(multiPathNode.render().indexOf("coordsize='10000 10000'") !== -1);
    });

    test("renders width", function() {
        ok(multiPathNode.render().indexOf("width:100px;") !== -1);
    });

    test("renders height", function() {
        ok(multiPathNode.render().indexOf("height:100px;") !== -1);
    });

    // ------------------------------------------------------------

    var circleTransformNode,
        transformCircle;

    module("CircleTransformNode", {
        setup: function() {
            transformCircle = new Circle(new g.Circle(new Point(600,400), 100));
            circleTransformNode = new CircleTransformNode(transformCircle, new Matrix(1,2,3,4,5,6));
        }
    });

    test("circle transform origin is minus bBox center over bBox size", function() {
        ok(circleTransformNode.render().indexOf("origin='-3,-2'") !== -1);
    });

    test("options change updates attributes", 4, function() {
        var expectedValues = {
                on: "true",
                matrix: "2,4,3,5,0,0",
                offset: "6px,7px",
                origin: "-3,-2"
            };
        circleTransformNode.attr = function(key, value) {
            equal(expectedValues[key], value);
        };
        transformCircle.options.set("transform", new Matrix(2,3,4,5,6,7));
    });

    test("clearing transform updates attributes", 1, function() {
        var expectedValues = {
                on: "false"
            };
        circleTransformNode.attr = function(key, value) {
            equal(expectedValues[key], value);
        };
        transformCircle.options.set("transform", null);
    });

    // ------------------------------------------------------------
    var circle,
        circleNode;

    module("CircleNode", {
        setup: function() {
            var geometry = new g.Circle(new Point(10, 20), 30);
            circle = new Circle(geometry);
            circleNode = new CircleNode(circle);
        }
    });

    test("initializes a CircleTransformNode", function() {
        ok(circleNode.transform instanceof CircleTransformNode);
    });

    test("renders center", function() {
        ok(circleNode.render().indexOf("top:-10px;left:-20px;") !== -1);
    });

    test("renders radius", function() {
        ok(circleNode.render().indexOf("width:60px;height:60px;") !== -1);
    });

    test("geometryChange sets center", 2, function() {
        circleNode.css = function(name, value) {
            if (name === "left") {
                equal(value, "-10px");
            } else if (name === "top") {
                equal(value, "10px");
            }
        };

        circle.geometry.center.multiply(2);
    });

    test("geometryChange sets radius", 2, function() {
        circleNode.css = function(name, value) {
            if (name === "width" || name === "height") {
                equal(value, "120px");
            }
        };

        circle.geometry.set("radius", 60);
    });

    test("optionsChange is forwarded to transform", function() {
        circleNode.transform.optionsChange = function(e) {
            ok(true);
        };

        circle.options.set("transform", Matrix.unit());
    });

    test("optionsChange is not forwarded to transform", 0, function() {
        circleNode.transform.optionsChange = function() {
            ok(true);
        };

        circle.options.set("foo", true);
    });

    // ------------------------------------------------------------
    var arc,
        arcNode;

    module("ArcNode", {
        setup: function() {
            var geometry = new g.Arc(new Point(100, 100), {
                startAngle: 0,
                endAngle: 120,
                radiusX: 50,
                radiusY: 100
            });
            arc = new d.Arc(geometry, {stroke: {color: "red", width: 4}, fill: {color: "green", opacity: 0.5}});
            arcNode = new ArcNode(arc);
        }
    });

    test("renders curve path", function() {
        var result = arcNode.render();
        ok(result.indexOf("v='m 15000,10000 c 15000,13491 14011,16915 12500,18660 10989,20406 9011,20406 7500,18660 e'") !== -1);
    });

    test("renders arc fill", function() {
        var result = arcNode.render();

        ok(/kvml:fill.*?color='green'.*?kvml:fill/.test(result));
        ok(/kvml:fill.*?opacity='0.5'.*?kvml:fill/.test(result));
    });

    test("renders arc stroke", function() {
        var result = arcNode.render();

        ok(/kvml:stroke.*?color='red'.*?kvml:stroke/.test(result));
        ok(/kvml:stroke.*?weight='4px'.*?kvml:stroke/.test(result));
    });

    test("renders coordsize", function() {
        ok(arcNode.render().indexOf("coordsize='10000 10000'") !== -1);
    });

    test("renders width", function() {
        ok(arcNode.render().indexOf("width:100px;") !== -1);
    });

    test("renders height", function() {
        ok(arcNode.render().indexOf("height:100px;") !== -1);
    });

    test("geometryChange updates path", function() {
        arcNode.attr = function(name, value) {
            equal(name, "v");
            equal(value, "m 15000,10000 c 15000,15236 12618,20000 10000,20000 7382,20000 5000,15236 5000,10000 e");
        };

        arc.geometry.set("endAngle", 180);
    });

})();
