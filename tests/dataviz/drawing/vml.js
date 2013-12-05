(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,

        d = dataviz.drawing,
        Circle = d.Circle,
        Group = d.Group,
        MultiPath = d.MultiPath,
        Path = d.Path,

        vml = d.vml,
        Node = vml.Node,
        CircleNode = vml.CircleNode,
        FillNode = vml.FillNode,
        GroupNode = vml.GroupNode,
        PathNode = vml.PathNode,
        MultiPathNode = vml.MultiPathNode,
        Surface = vml.Surface,
        StrokeNode = vml.StrokeNode;

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

    test("load appends MultiPathNode", function() {
        node.append = function(child) {
            ok(child instanceof MultiPathNode);
        };

        node.load([new MultiPath()]);
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

    test("renders straight segments", function() {
        path.moveTo(0, 0).lineTo(10, 20).lineTo(20, 30);

        ok(pathNode.render().indexOf("v='m 0,0 l 10,20 20,30 e'") !== -1);
    });

    test("renders closed paths", function() {
        path.moveTo(0, 0).lineTo(10, 20).close();

        ok(pathNode.render().indexOf("v='m 0,0 l 10,20 x e'") !== -1);
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

        ok(multiPathNode.render().indexOf("v='m 0,0 l 10,20 m 10,10 l 10,20 e'") !== -1);
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

    test("renders center", function() {
        console.log(circleNode.render());
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
})();
