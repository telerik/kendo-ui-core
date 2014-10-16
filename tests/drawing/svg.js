(function() {
    var dataviz = kendo.dataviz,

        g = kendo.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        d = kendo.drawing,
        Circle = d.Circle,
        Group = d.Group,
        MultiPath = d.MultiPath,
        Path = d.Path,
        Text = d.Text,

        svg = d.svg,
        Node = svg.Node,
        ArcNode = svg.ArcNode,
        CircleNode = svg.CircleNode,
        GroupNode = svg.GroupNode,
        PathNode = svg.PathNode,
        MultiPathNode = svg.MultiPathNode,
        Surface = svg.Surface,
        TextNode = svg.TextNode;

    // ------------------------------------------------------------
    (function() {
        var container,
            surface;

        baseSurfaceTests("SVG", Surface);
        baseSurfaceEventTests("SVG", Surface);

        module("Surface", {
            setup: function() {
                container = $("<div>").appendTo(QUnit.fixture);
                surface = new Surface(container);
            },
            teardown: function() {
                container.remove();
            }
        });

        test("reports actual surface type", function() {
            surface = new Surface(container, { type: "foo" });
            equal(surface.type, "svg");
        });

        test("appends svg element to container", function() {
            equal(QUnit.fixture.find("svg").length, 1);
        });

        test("size updates translate", function() {
            surface.translate({ x: 10, y: 10 });
            surface.size({ width: 100, height: 100 });

            equal(surface._rootElement.getAttribute("viewBox"), "10 10 100 100");
        });
    })();

    // ------------------------------------------------------------
    (function() {
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

        test("load appends TextNode", function() {
            node.append = function(child) {
                ok(child instanceof svg.TextNode);
            };

            node.load([new d.Text()]);
        });

        test("load appends ImageNode", function() {
            node.append = function(child) {
                ok(child instanceof svg.ImageNode);
            };

            node.load([new d.Image()]);
        });

        test("load appends child nodes", function() {
            var parentGroup = new Group();
            var childGroup = new Group();
            parentGroup.append(childGroup);

            node.load([parentGroup]);

            ok(node.childNodes[0].childNodes[0] instanceof GroupNode);
        });

        test("load creates definitions", 3, function() {
            var path = new Path();
            node.definitionChange = function(e) {
                equal(e.action, "add");
                equal(e.definitions.clip, path);
            };

            node.load([new Group({
                clip: path
            })]);

            equal(node.childNodes[0].definitions.clip, path);
        });

        test("load does not create definitions if source does not have definitions", 0, function() {
            var path = new Path();
            var definitions;
            node.definitionChange = function() {
                ok(false);
            };

            node.load([new Group()]);
            definitions = node.childNodes[0].definitions;

            for (var definition in definitions) {
                ok(false);
            }
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

    })();

    // ------------------------------------------------------------
    function nodeTests(TShape, TNode, name) {
        var shape,
            node,
            clip,
            container;

        module("Base Node tests / " + name, {
            setup: function() {
                container = document.createElement("div");

                shape = new TShape();
                node = new TNode(shape);
                node.attachTo(container);
            }
        });

        test("renders visibility", function() {
            shape.visible(false);
            ok(node.render().indexOf("display:none;") !== -1);
        });

        test("does not render visibility if not set", function() {
            ok(node.render().indexOf("display") === -1);
        });

        test("does not render visibility if set to true", function() {
            shape.visible(true);
            ok(node.render().indexOf("display") === -1);
        });

        test("renders opacity", function() {
            shape.opacity(0.5);
            ok(node.render().indexOf("opacity='0.5'") !== -1);
        });

        test("does not render opacity if not set", function() {
            ok(node.render().indexOf("opacity") === -1);
        });

        test("optionsChange sets visibility to hidden", function() {
            node.css = function(name, value) {
                equal(name, "display");
                equal(value, "none");
            };

            shape.visible(false);
        });

        test("optionsChange sets visibility to visible", function() {
            node.css = function(name, value) {
                equal(name, "display");
                equal(value, "");
            };

            shape.visible(true);
        });

        test("optionsChange sets opacity", function() {
            node.attr = function(name, value) {
                equal(name, "opacity");
                equal(value, 0.5);
            };

            shape.opacity(0.5);
        });

        // ------------------------------------------------------------
        module("Base Node tests / " + name + " / observer", {
            setup: function() {
                shape = new TShape();
                node = new TNode(shape);
            }
        });

        test("Adds srcElement observer", function() {
            equal(shape.observers()[0], node);
        });

        test("clear removes srcElement observer", function() {
            node.clear();
            equal(shape.observers().length, 0);
        });

        // ------------------------------------------------------------
        module("Base Node tests / " + name + " / definitions", {
            setup: function() {
                container = new GroupNode();
                clip = new Path();
                shape = new TShape();
                shape.clip(clip);
                container.load([shape]);
                node = container.childNodes[0];
            }
        });

        test("renders clip-path", function() {
            ok(node.render().indexOf("clip-path='url(#" + clip.id + ")'") != -1);
        });

        test("clearing definition in the options removes definition", function() {
            shape.options.set("clip", null);
            equal(node.definitions.clip, undefined);
        });

        test("clearing definition triggers definition change", function() {
            node.definitionChange = function(e) {
                equal(e.action, "remove");
                equal(e.definitions.clip, clip);
            };
            shape.options.set("clip", null);
        });

        test("clearing definition removes attribute", function() {
            node.removeAttr = function(attr) {
                equal(attr, "clip-path");
            };
            shape.options.set("clip", null);
        });

        test("sets new definition", 2, function() {
            var newClip = new Path();
            node.definitionChange = function(e) {
                if (e.action == "add") {
                    equal(e.definitions.clip, newClip);
                }
            };
            shape.options.set("clip", newClip);
            equal(node.definitions.clip, newClip);
        });

        test("setting new definition updates attribute", function() {
            var newClip = new Path();
            node.attr = function(attr, value) {
                equal(attr, "clip-path");
                equal(value, "url(#" + newClip.id + ")");
            };
            shape.clip(newClip);
            equal(node.definitions.clip, newClip);
        });

        test("setting new definition removes the old one", function() {
            var newClip = new Path();
            node.definitionChange = function(e) {
                if (e.action == "remove") {
                    equal(e.definitions.clip, clip);
                }
            };
            shape.clip(newClip);
        });

        test("clear removes definitions", function() {
            node.definitionChange = function(e) {
                equal(e.action, "remove");
                equal(e.definitions.clip, clip);
            };
            node.clear();
            for (var definition in node.definitions) {
                ok(false);
            }
        });
    }

    // ------------------------------------------------------------
    (function() {
        var rootNode;

        module("RootNode", {
            setup: function() {
                rootNode = new svg.RootNode();
            }
        });

        test("inits definition node", function() {
            ok(rootNode.defs instanceof svg.DefinitionNode);
        });

        test("renders definition node", function() {
            rootNode.defs.render = function() {
                ok(true);
            };
            rootNode.render();
        });

        test("propagates definition change to definition node", function() {
            var defs = rootNode.defs;
            defs.definitionChange = function(e) {
                equal(e, "foo");
            };
            rootNode.definitionChange("foo");
        });

        test("attachTo directly sets element", function() {
            var container = document.createElement("div");
            rootNode.attachTo(container);

            deepEqual(rootNode.element, container);
        });

        test("attachTo attaches first child to definition node", function() {
            var container = document.createElement("div");
            var child = document.createElement("div");
            container.appendChild(child);
            rootNode.attachTo(container);

            deepEqual(rootNode.defs.element, child);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var group;
        var groupNode;

        nodeTests(Group, GroupNode, "GroupNode");

        module("GroupNode", {
            setup: function() {
                group = new Group();
                groupNode = new GroupNode(group);
            }
        });

        test("attachTo sets element", function() {
            groupNode.attachTo(document.createElement("div"));

            ok(groupNode.element);
        });

        test("attachTo sets element for child nodes", function() {
            groupNode.append(new GroupNode(new Group()));
            groupNode.attachTo(document.createElement("div"));

            ok(groupNode.childNodes[0].element);
        });

        test("attachTo sets element for grandchild nodes", function() {
            var child = new GroupNode(new Group());
            var grandChild = new GroupNode(new Group());

            child.append(grandChild);
            groupNode.append(child);

            groupNode.attachTo(document.createElement("div"));

            ok(grandChild.element);
        });

        test("attachTo sets kendoNode data", function() {
            groupNode.attachTo(document.createElement("div"));

            deepEqual($(groupNode.element).data("kendoNode"), groupNode);
        });

        test("attachTo sets kendoNode data on child elements", function() {
            var childGroup = new GroupNode(new Group());
            groupNode.append(childGroup);
            groupNode.attachTo(document.createElement("div"));

            deepEqual($(childGroup.element).data("kendoNode"), childGroup);
        });

        test("attachTo sets kendoNode data for grandchild nodes", function() {
            var child = new GroupNode(new Group());
            var grandChild = new GroupNode(new Group());

            child.append(grandChild);
            groupNode.append(child);

            groupNode.attachTo(document.createElement("div"));

            deepEqual($(grandChild.element).data("kendoNode"), grandChild);
        });

        test("clear removes element", function() {
            groupNode.attachTo(document.createElement("div"));
            groupNode.clear();

            ok(!groupNode.element);
        });

        test("clear removes kendoNode data from element", function() {
            var container = document.createElement("div");
            groupNode.attachTo(container);
            groupNode.clear();

            ok(!$(container).data("kendoNode"));
        });

        test("load attaches node", function() {
            groupNode.attachTo(document.createElement("div"));

            var group = new Group();
            groupNode.load([group]);

            ok(groupNode.childNodes[0].element);
        });

        test("renders group tag", function() {
            equal(groupNode.render(), "<g></g>");
        });

        test("renders group transform", function() {
            groupNode = new GroupNode(new Group({transform: new Matrix(1,1,1,1,1,1)}));
            equal(groupNode.render(), "<g transform='matrix(1,1,1,1,1,1)' ></g>");
        });

        test("does not render transform if not set", function() {
            ok(groupNode.render().indexOf("transform") === -1);
        });

        test("options change renders transform", function() {
            groupNode.attr = function(key, value) {
                equal(key, "transform");
                equal(value, "matrix(1,0,0,1,0,0)");
            };
            group.transform(Matrix.unit());

        });

        test("clearing transform removes transform attribute", function() {
            groupNode.removeAttr = function(key) {
                equal(key, "transform");
            };
            group.transform(null);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var path,
            pathNode,
            container;

        nodeTests(Path, PathNode, "PathNode");

        module("PathNode", {
            setup: function() {
                container = document.createElement("div");

                path = new Path();
                pathNode = new PathNode(path);
                pathNode.attachTo(container);
            }
        });

        test("renders straight segments", function() {
            path.moveTo(0, 0).lineTo(10, 20);

            ok(pathNode.render().indexOf("d='M0 0 L 10 20'") !== -1);
        });

        test("renders points with precision to the third sign", function() {
            path.moveTo(0, 0).lineTo(10.001, 20.0005);

            ok(pathNode.render().indexOf("d='M0 0 L 10.001 20.001'") !== -1);
        });

        test("renders closed paths", function() {
            path.moveTo(0, 0).lineTo(10, 20).close();

            ok(pathNode.render().indexOf("d='M0 0 L 10 20Z'") !== -1);
        });

        test("renders curve", function() {
            path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

            ok(pathNode.render().indexOf("d='M0 0 C 10 10 20 10 30 0'") !== -1);
        });

        test("switches between line and curve", function() {
            path.moveTo(0, 0).lineTo(5, 5).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

            ok(pathNode.render().indexOf("d='M0 0 L 5 5 C 10 10 20 10 30 0'") !== -1);
        });

        test("switches between curve and line", function() {
            path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0)).lineTo(40, 10);

            ok(pathNode.render().indexOf("d='M0 0 C 10 10 20 10 30 0 L 40 10'") !== -1);
        });

        test("does not render segments for empty path", function() {
            equal(pathNode.render().indexOf("d="), -1);
        });

        test("renders stroke", function() {
            path.options.set("stroke.color", "red");

            ok(pathNode.render().indexOf("stroke='red'") !== -1);
        });

        test("renders empty stroke if set to 'transparent'", function() {
            path.options.set("stroke.color", "transparent");
            ok(pathNode.render().indexOf("stroke='none'") !== -1);
        });

        test("renders empty stroke if set to 'none'", function() {
            path.options.set("stroke.color", "none");
            ok(pathNode.render().indexOf("stroke='none'") !== -1);
        });

        test("renders empty stroke if set to ''", function() {
            path.options.set("stroke.color", "");
            ok(pathNode.render().indexOf("stroke='none'") !== -1);
        });

        test("renders stroke width", function() {
            path.options.set("stroke.width", 2);

            ok(pathNode.render().indexOf("stroke-width='2'") !== -1);
        });

        test("renders stroke opacity", function() {
            path.options.set("stroke.opacity", 0.5);

            ok(pathNode.render().indexOf("stroke-opacity='0.5'") !== -1);
        });

        test("does not render stroke opacity if not set", function() {
            equal(pathNode.render().indexOf("stroke-opacity="), -1);
        });

        test("renders stroke dashType", function() {
            path.options.set("stroke.dashType", "dot");

            ok(pathNode.render().indexOf("stroke-dasharray='1.5 3.5'") !== -1);
        });

        test("does not render stroke dashType if not set", function() {
            equal(pathNode.render().indexOf("stroke-dasharray="), -1);
        });

        test("renders stroke linejoin", function() {
            path.options.set("stroke.lineJoin", "round");

            ok(pathNode.render().indexOf("stroke-linejoin='round'") !== -1);
        });

        test("renders stroke linecap", function() {
            path.options.set("stroke.lineCap", "butt");

            ok(pathNode.render().indexOf("stroke-linecap='butt'") !== -1);
        });

        test("overrides stroke linecap when dashType is set", function() {
            path.options.set("stroke.dashType", "dot");
            path.options.set("stroke.lineCap", "foo");

            ok(pathNode.render().indexOf("stroke-linecap='butt'") !== -1);
        });

        test("renders stroke linecap when dashType is set to solid", function() {
            path.options.set("stroke.dashType", "solid");
            path.options.set("stroke.lineCap", "foo");

            ok(pathNode.render().indexOf("stroke-linecap='foo'") !== -1);
        });

        test("renders fill", function() {
            path.options.set("fill", { color: "red", opacity: 0.5 });
            var svg = pathNode.render();

            ok(svg.indexOf("fill='red'") !== -1);
            ok(svg.indexOf("fill-opacity='0.5'") !== -1);
        });

        test("renders empty fill if not set", function() {
            ok(pathNode.render().indexOf("fill='none'") !== -1);
        });

        test("renders empty fill if set to none", function() {
            path.options.set("fill.color", "none");
            ok(pathNode.render().indexOf("fill='none'") !== -1);
        });

        test("renders empty fill if set to transparent", function() {
            path.options.set("fill.color", "transparent");
            ok(pathNode.render().indexOf("fill='none'") !== -1);
        });

        test("renders empty fill if set to null", function() {
            path.options.set("fill", null);
            ok(pathNode.render().indexOf("fill='none'") !== -1);
        });

        test("renders empty fill if set to ''", function() {
            path.options.set("fill", '');
            ok(pathNode.render().indexOf("fill='none'") !== -1);
        });

        test("renders cursor", function() {
            path.options.set("cursor", "hand");
            ok(pathNode.render().indexOf("cursor:hand;") !== -1);
        });

        test("does not render cursor if not set", function() {
            ok(pathNode.render().indexOf("cursor") === -1);
        });

        test("does not render style if not set", function() {
            ok(pathNode.render().indexOf("style") === -1);
        });

        test("renders transform if set", function() {
            path.transform(new Matrix(1,1,1,1,1,1));
            ok(pathNode.render().indexOf("transform='matrix(1,1,1,1,1,1)'") !== -1);
        });

        test("does not render transform if not set", function() {
            ok(pathNode.render().indexOf("transform") === -1);
        });

        test("geometryChange sets path", function() {
            path.moveTo(0, 0);
            pathNode.attr = function(name, value) {
                equal(name, "d");
                ok(value);
            };

            path.lineTo(10, 10);
        });

        test("optionsChange sets fill color", function() {
            pathNode.attr = function(name, value) {
                equal(name, "fill");
                equal(value, "red");
            };

            path.options.set("fill.color", "red");
        });

        test("optionsChange sets fill opacity", function() {
            pathNode.attr = function(name, value) {
                equal(name, "fill-opacity");
                equal(value, 0.4);
            };

            path.options.set("fill.opacity", 0.4);
        });

        test("optionsChange sets fill color to none for 'transparent'", function() {
            pathNode.attr = function(name, value) {
                equal(name, "fill");
                equal(value, "none");
            };

            path.options.set("fill.color", "transparent");
        });

        test("optionsChange sets fill color to none for 'none'", function() {
            pathNode.attr = function(name, value) {
                equal(name, "fill");
                equal(value, "none");
            };

            path.options.set("fill.color", "none");
        });

        test("optionsChange sets fill color to none for ''", function() {
            pathNode.attr = function(name, value) {
                equal(name, "fill");
                equal(value, "none");
            };

            path.options.set("fill.color", "");
        });

        test("optionsChange sets fill", 2, function() {
            pathNode.attr = function(name, value) {
                if (name === "fill") {
                    equal(value, "red");
                } else if (name === "fill-opacity") {
                    equal(value, 0.4);
                } else {
                    ok(false);
                }
            };

            path.options.set("fill", { color: "red", opacity: 0.4 });
        });

        test("optionsChange clears stroke", function() {
            pathNode.removeAttr = function(name) {
                equal(name, "fill");
            };

            path.options.set("fill", null);
        });

        test("optionsChange sets stroke color", function() {
            pathNode.attr = function(name, value) {
                equal(name, "stroke");
                equal(value, "red");
            };

            path.options.set("stroke.color", "red");
        });

        test("optionsChange sets stroke width", function() {
            pathNode.attr = function(name, value) {
                equal(name, "stroke-width");
                equal(value, 4);
            };

            path.options.set("stroke.width", 4);
        });

        test("optionsChange sets stroke opacity", function() {
            pathNode.attr = function(name, value) {
                equal(name, "stroke-opacity");
                equal(value, 0.4);
            };

            path.options.set("stroke.opacity", 0.4);
        });

        test("optionsChange sets stroke", 3, function() {
            pathNode.attr = function(name, value) {
                if (name === "stroke") {
                    equal(value, "red");
                } else if (name === "stroke-opacity") {
                    equal(value, 0.4);
                } else if (name === "stroke-width") {
                    equal(value, 4);
                }
            };

            path.options.set("stroke", { color: "red", opacity: 0.4, width: 4 });
        });

        test("optionsChange clears stroke", function() {
            pathNode.removeAttr = function(name) {
                equal(name, "stroke");
            };

            path.options.set("stroke", null);
        });

        test("options change renders transform", function() {
            pathNode.attr = function(key, value) {
                equal(key, "transform");
                equal(value, "matrix(1,0,0,1,0,0)");
            };
            path.transform(Matrix.unit());
        });

        test("clearing transform removes transform attribute", function() {
            pathNode.removeAttr = function(key) {
                equal(key, "transform");
            };
            path.transform(null);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var multiPath,
            multiPathNode;

        nodeTests(MultiPath, MultiPathNode, "MultiPathNode");

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

            ok(multiPathNode.render().indexOf("d='M0 0 L 10 20 M10 10 L 10 20'") !== -1);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var circle,
            circleNode;

        nodeTests(Circle, CircleNode, "CircleNode");

        module("CircleNode", {
            setup: function() {
                var geometry = new g.Circle(new Point(10, 20), 30);
                circle = new Circle(geometry);
                circleNode = new CircleNode(circle);
            }
        });

        test("renders center", function() {
            ok(circleNode.render().indexOf("cx='10' cy='20'") !== -1);
        });

        test("renders radius", function() {
            ok(circleNode.render().indexOf("r='30'") !== -1);
        });

        test("geometryChange sets center", 2, function() {
            circleNode.attr = function(name, value) {
                if (name === "cx") {
                    equal(value, 20);
                } else if (name === "cy") {
                    equal(value, 40);
                }
            };

            circle.geometry().center.scale(2);
        });

        test("geometryChange sets radius", 1, function() {
            circleNode.attr = function(name, value) {
                if (name === "r") {
                    equal(value, 60);
                }
            };

            circle.geometry().setRadius(60);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var text;
        var textNode;

        nodeTests(Text, TextNode, "TextNode");

        module("TextNode", {
            setup: function() {
                text = new d.Text("Foo", new Point(10, 20), { font: "arial" });
                text.measure = function() {
                    return {
                        width: 20, height: 10, baseline: 15
                    };
                };

                textNode = new svg.TextNode(text);
            }
        });

        test("renders position accounting for baseline", function() {
            ok(textNode.render().indexOf("x='10' y='35'") > -1);
        });

        test("renders content", function() {
            ok(textNode.render().indexOf("Foo") > -1);
        });

        test("renders font", function() {
            ok(textNode.render().indexOf("font:arial;") > -1);
        });

        test("renders transformation", function() {
            text.transform(g.transform(new Matrix(1,1,1,1,1,1)));
            ok(textNode.render().indexOf("transform='matrix(1,1,1,1,1,1)'") > -1);
        });

        test("geometryChange sets position", 2, function() {
            textNode.attr = function(name, value) {
                if (name === "x") {
                    equal(value, 20);
                } else if (name === "y") {
                    equal(value, 55);
                }
            };

            text.position().scale(2);
        });

        test("optionsChange sets font", function() {
            textNode.attr = function(name, value) {
                if (name == "style") {
                    equal(value, "font:foo;");
                }
            };

            text.options.set("font", "foo");
        });

        test("optionsChange sets content", function() {
            textNode.content = function(value) {
                equal(value, "Bar");
            };

            text.content("Bar");
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var image;
        var imageNode;

        nodeTests(d.Image, svg.ImageNode, "ImageNode");

        module("ImageNode", {
            setup: function() {
                image = new d.Image("Foo", new g.Rect(new g.Point(10, 20), [90, 80]));
                imageNode = new svg.ImageNode(image);
            }
        });

        test("renders X position", function() {
            ok(imageNode.render().indexOf("x='10'") > -1);
        });

        test("renders Y position", function() {
            ok(imageNode.render().indexOf("y='20'") > -1);
        });

        test("renders width", function() {
            ok(imageNode.render().indexOf("width='90px'") > -1);
        });

        test("renders height", function() {
            ok(imageNode.render().indexOf("height='80px'") > -1);
        });

        test("renders source", function() {
            ok(imageNode.render().indexOf("xlink:href='Foo'") > -1);
        });

        test("renders transformation", function() {
            image.transform(g.transform(new Matrix(1,1,1,1,1,1)));
            ok(imageNode.render().indexOf("transform='matrix(1,1,1,1,1,1)'") > -1);
        });

        test("geometryChange sets position", 2, function() {
            imageNode.attr = function(name, value) {
                if (name === "x") {
                    equal(value, 20);
                } else if (name === "y") {
                    equal(value, 40);
                }
            };

            image.rect().origin.scale(2);
        });

        test("geometryChange sets size", 2, function() {
            imageNode.attr = function(name, value) {
                if (name === "width") {
                    equal(value, "80px");
                } else if (name === "height") {
                    equal(value, "60px");
                }
            };

            image.rect().setSize([80, 60]);
        });

        test("optionsChange sets source", function() {
            imageNode.attr = function(name, value) {
                equal(name, "xlink:href");
                equal(value, "Bar");
            };

            image.src("Bar");
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var ClipNode = svg.ClipNode;
        var clipNode;
        var path;

        module("ClipNode", {
            setup: function() {
                path = new d.Path();
                clipNode = new ClipNode(path);
            }
        });

        test("renders clippath", function() {
            ok(clipNode.render().indexOf("clippath") !== -1);
        });

        test("renders clip path id", function() {
            ok(clipNode.render().indexOf("id='" + path.id + "'") !== -1);
        });

        test("loads path", function() {
            var pathNode = clipNode.childNodes[0];
            ok(pathNode instanceof PathNode);
            equal(pathNode.srcElement, path);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var DefinitionNode = svg.DefinitionNode;
        var definitionNode, path, definitions;

        module("DefinitionNode", {
            setup: function() {
                definitionNode = new DefinitionNode();
            }
        });

        test("renders defs", function() {
            ok(definitionNode.render().indexOf("defs") !== -1);
        });

        test("attachTo sets element", function() {
            definitionNode.attachTo("foo");
            equal(definitionNode.element, "foo");
        });

        module("DefinitionNode / definitionChange", {
            setup: function() {
                path = new d.Path();
                definitions = {
                    clip: path
                };
                definitionNode = new DefinitionNode();
            }
        });

        test("add creates ClipNode", function() {
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            ok(definitionNode.childNodes[0] instanceof svg.ClipNode);
        });

        test("add does not create another node if definition has the same id", function() {
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            equal(definitionNode.childNodes.length, 1);
        });

        test("remove clears definition", 2, function() {
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            var node = definitionNode.definitionMap[path.id].element;
            node.clear = function() {
                ok(true);
            };
            definitionNode.definitionChange({
                action: "remove",
                definitions: definitions
            });
            equal(definitionNode.childNodes.length, 0);
        });

        test("remove does not clear definition if it was added more times", function() {
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            definitionNode.definitionChange({
                action: "add",
                definitions: definitions
            });
            definitionNode.definitionChange({
                action: "remove",
                definitions: definitions
            });
            equal(definitionNode.childNodes.length, 1);
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var element;

        module("exportSVG", {
            setup: function() {
                element = new d.Group();
            }
        });

        test("exports element", function() {
            d.exportSVG(element).done(function(svg) {
                contains(svg, "<?xml version='1.0' ?><svg");
            });
        });

        test("encodes entities", function() {
            element = new d.Text("Foo & Bar", [0, 0]);
            d.exportSVG(element).done(function(svg) {
                contains(svg, "Foo &amp; Bar");
            });
        });

        test("preserves encoded entities", function() {
            element = new d.Text("Foo &amp; Bar", [0, 0]);
            d.exportSVG(element).done(function(svg) {
                contains(svg, "Foo &amp; Bar");
            });
        });
    })();
})();
