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
        Text = d.Text,

        canv = d.canvas,
        Node = canv.Node,
        PathNode = canv.PathNode,
        Surface = canv.Surface,
        TextNode = canv.TextNode;

    function mockContext(members) {
        return kendo.deepExtend({
            beginPath: $.noop,
            close: $.noop,
            fill: $.noop,
            lineTo: $.noop,
            moveTo: $.noop,
            restore: $.noop,
            save: $.noop,
            stroke: $.noop
        }, members);
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

    test("appends canvas element to container", function() {
        equal(QUnit.fixture.find("canvas").length, 1);
    });

    test("draw attaches element to root node", function() {
        var group = new d.Group();
        surface.draw(group);

        deepEqual(surface._root.childNodes[0].srcElement, group);
    });

    test("clear removes element from root node", function() {
        var group = new d.Group();
        surface.draw(group);
        surface.clear();

        equal(surface._root.childNodes.length, 0);
    });

    test("getSize returns element dimensions", function() {
        surface.setSize({ width: 1000, height: 1000 });

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
    var node;

    module("Node", {
        setup: function() {
            node = new Node();
        }
    });

    test("load appends Node for Group", function() {
        node.append = function(child) {
            ok(child instanceof canv.Node);
        };

        node.load([new d.Group()]);
    });

    test("load appends PathNode", function() {
        node.append = function(child) {
            ok(child instanceof canv.PathNode);
        };

        node.load([new d.Path()]);
    });

    test("load appends TextNode", function() {
        node.append = function(child) {
            ok(child instanceof canv.TextNode);
        };

        node.load([new d.Text()]);
    });

    test("load appends child nodes", function() {
        var parentGroup = new d.Group()
        var childGroup = new d.Group();
        parentGroup.append(childGroup);

        node.load([parentGroup]);

        ok(node.childNodes[0].childNodes[0] instanceof canv.Node);
    });

    // ------------------------------------------------------------
    var path,
        pathNode;

    module("PathNode", {
        setup: function() {
            path = new d.Path({
                stroke: {
                    color: "red",
                    width: 2
                },
                fill: {
                    color: "blue"
                }
            });

            pathNode = new canv.PathNode(path);
        }
    });

    test("renders straight segments", 5, function() {
        path.moveTo(0, 0).lineTo(10, 20);

        pathNode.renderTo(mockContext({
            beginPath: function() {
                ok(true);
            },
            moveTo: function(x, y) {
                equal(x, 0);
                equal(y, 0);
            },
            lineTo: function(x, y) {
                equal(x, 10);
                equal(y, 20);
            }
        }));
    });

    test("renders closed paths", function() {
        path.moveTo(0, 0).lineTo(10, 20).close();

        pathNode.renderTo(mockContext({
            closePath: function() {
                ok(true);
            }
        }));
    });

    /*
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
    */

    test("does not render empty path", 0, function() {
        pathNode.renderTo(mockContext({
            moveTo: function() {
                ok(false);
            }
        }));
    });

    test("renders stroke", function() {
        var ctx = mockContext({
            stroke: function() {
                equal(ctx.strokeStyle, "red");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke width", function() {
        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineWidth, 2);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders fixed stroke lineJoin", function() {
        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineJoin, "round");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke opacity", function() {
        path.options.set("stroke.opacity", 0.5);

        var ctx = mockContext({
            stroke: function() {
                equal(ctx.globalAlpha, 0.5);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("does not render stroke opacity if not set", function() {
        var ctx = mockContext({
            stroke: function() {
                equal(ctx.globalAlpha, undefined);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke dashType", function() {
        path.options.set("stroke.dashType", "dot");

        var ctx = mockContext({
            setLineDash: function(arr) {
                deepEqual(arr, [1.5, 3.5]);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke dashType (legacy)", function() {
        path.options.set("stroke.dashType", "dot");

        var ctx = mockContext({
            stroke: function() {
                deepEqual(ctx.mozDash, [1.5, 3.5]);
                deepEqual(ctx.webkitLineDash, ctx.mozDash);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("does not render stroke dashType if not set", 0, function() {
        var ctx = mockContext({
            setLineDash: function() {
                ok(false);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders default stroke linecap", function() {
        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineCap, "square");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke linecap", function() {
        path.options.set("stroke.lineCap", "round");

        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineCap, "round");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("overrides stroke linecap when dashType is set", function() {
        path.options.set("stroke.lineCap", "round");
        path.options.set("stroke.dashType", "dot");

        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineCap, "butt");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders stroke linecap when dashType is set to solid", function() {
        path.options.set("stroke.lineCap", "round");
        path.options.set("stroke.dashType", "solid");

        var ctx = mockContext({
            stroke: function() {
                equal(ctx.lineCap, "round");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders fill", function() {
        var ctx = mockContext({
            fill: function() {
                equal(ctx.fillStyle, "blue");
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders fill opacity", function() {
        path.options.set("fill.opacity", 0.5);

        var ctx = mockContext({
            fill: function() {
                equal(ctx.globalAlpha, 0.5);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("does not render fill if not set", 0, function() {
        path.options.set("fill", null);

        var ctx = mockContext({
            fill: function() {
                ok(false);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("does not render fill if set to transparent", 0, function() {
        path.options.set("fill.color", "transparent");

        var ctx = mockContext({
            fill: function() {
                ok(false);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("renders transform", function() {
        path.transform(new Matrix(1e-6, 2, 3, 4, 5, 6));

        var ctx = mockContext({
            transform: function(a, b, c, d, e, f) {
                deepEqual([a, b, c, d, e, f], [1e-6, 2, 3, 4, 5, 6]);
            }
        });

        pathNode.renderTo(ctx);
    });

    test("does not render transform if not set", 0, function() {
        var ctx = mockContext({
            transform: function(mx) {
                ok(false);
            }
        });

        pathNode.renderTo(ctx);
    });
})();
