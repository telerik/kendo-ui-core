(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        d = dataviz.drawing,
        canv = d.canvas,
        Surface = canv.Surface;

    function mockContext(members) {
        return kendo.deepExtend({
            beginPath: $.noop,
            clearRect: $.noop,
            close: $.noop,
            drawImage: $.noop,
            fill: $.noop,
            fillText: $.noop,
            lineTo: $.noop,
            moveTo: $.noop,
            restore: $.noop,
            save: $.noop,
            stroke: $.noop,
            strokeText: $.noop
        }, members);
    }

    // ------------------------------------------------------------
    (function() {
        var container,
            surface;

        baseSurfaceTests("Canvas", Surface);

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
            equal(surface.type, "canvas");
        });

        test("appends canvas element to container", function() {
            equal(QUnit.fixture.find("canvas").length, 1);
        });

        test("sets actual width on root element", function() {
            surface = new Surface(container, { width: "500px" });
            equal(surface._rootElement.width, 500);
        });

        test("sets actual height on root element", function() {
            surface = new Surface(container, { height: "500px" });
            equal(surface._rootElement.height, 500);
        });

        test("sets actual width on resize", function() {
            surface.element.css("width", "500px");
            surface.resize();
            equal(surface._rootElement.width, 500);
        });

        test("sets actual height on resize", function() {
            surface.element.css("height", "500px");
            surface.resize();
            equal(surface._rootElement.height, 500);
        });

        test("destroys root node", function() {
            surface._root.destroy = function() {
                ok(true);
            };

            surface.destroy();
        });

        test("image returns base64 encoded image", function() {
            var path = new d.Path();
            path.moveTo(0, 0).lineTo(100, 100);
            surface.draw(path);

            var image = surface.image();
            equal(image.indexOf("data:image/png;base64,"), 0);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var root;

        function createRoot(ctx) {
            root = new canv.RootNode({
                getContext: function() {
                    return ctx;
                }
            });
        };

        module("RootNode", {
            setup: function() {
                createRoot(mockContext());
            }
        });

        test("throttles invalidate", function() {
            createRoot(mockContext({
                clearRect: function() {
                    ok(true);
                }
            }));

            root.invalidate();
            root.invalidate();

            root.destroy();
        });

        asyncTest("makes a tail call to invalidate", function() {
            var count = 0;
            createRoot(mockContext({
                clearRect: function() {
                    if (++count == 2) {
                        ok(true);
                        start();
                    }
                }
            }));

            root.invalidate();
            root.invalidate();
        });

        test("destroy clears timeout", function() {
            root.invalidate();
            root.destroy();

            equal(root._timeout, null);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var node;

        module("Node", {
            setup: function() {
                node = new canv.Node();
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

        test("load appends MultiPathNode", function() {
            node.append = function(child) {
                ok(child instanceof canv.MultiPathNode);
            };

            node.load([new d.MultiPath()]);
        });

        test("load appends TextNode", function() {
            node.append = function(child) {
                ok(child instanceof canv.TextNode);
            };

            node.load([new d.Text()]);
        });

        test("load appends CircleNode", function() {
            node.append = function(child) {
                ok(child instanceof canv.CircleNode);
            };

            node.load([new d.Circle()]);
        });

        test("load appends ArcNode", function() {
            node.append = function(child) {
                ok(child instanceof canv.ArcNode);
            };

            node.load([new d.Arc()]);
        });

        test("load appends ImageNode", function() {
            node.append = function(child) {
                ok(child instanceof canv.ImageNode);
            };

            node.load([new d.Image()]);
        });

        test("load appends child nodes", function() {
            var parentGroup = new d.Group();
            var childGroup = new d.Group();
            parentGroup.append(childGroup);

            node.load([parentGroup]);

            ok(node.childNodes[0].childNodes[0] instanceof canv.Node);
        });

        test("load invalidates node", function() {
            node.invalidate = function() { ok(true); };
            node.load([new d.Group()]);
        });

        test("renders transform", function() {
            var group = new d.Group();
            group.transform(new Matrix(1e-6, 2, 3, 4, 5, 6));

            var ctx = mockContext({
                transform: function(a, b, c, d, e, f) {
                    deepEqual([a, b, c, d, e, f], [1e-6, 2, 3, 4, 5, 6]);
                }
            });

            node.load([group]);
            node.renderTo(ctx);
        });

        test("does not render transform if not set", 0, function() {
            var ctx = mockContext({
                transform: function(mx) {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });
    })();

    function paintTests(TShape, TNode, nodeName) {
        var shape;
        var node;

        module("Paint Tests / " + nodeName, {
            setup: function() {
                shape = new TShape()
                    .stroke("red", 2).fill("blue");

                node = new TNode(shape);
            }
        });

        test("renders stroke", function() {
            var ctx = mockContext({
                stroke: function() {
                    equal(ctx.strokeStyle, "red");
                }
            });

            node.renderTo(ctx);
        });

        test("does not render stroke if set to none", 0, function() {
            shape.options.set("stroke.color", "none");

            var ctx = mockContext({
                stroke: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render stroke if set to transparent", 0, function() {
            shape.options.set("stroke.color", "transparent");

            var ctx = mockContext({
                stroke: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });

        test("renders stroke width", function() {
            var ctx = mockContext({
                stroke: function() {
                    equal(ctx.lineWidth, 2);
                }
            });

            node.renderTo(ctx);
        });

        test("renders stroke opacity", function() {
            shape.options.set("stroke.opacity", 0.5);

            var ctx = mockContext({
                stroke: function() {
                    equal(ctx.globalAlpha, 0.5);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render stroke opacity if not set", function() {
            var ctx = mockContext({
                stroke: function() {
                    equal(ctx.globalAlpha, undefined);
                }
            });

            node.renderTo(ctx);
        });

        test("renders stroke dashType", function() {
            shape.options.set("stroke.dashType", "dot");

            var ctx = mockContext({
                setLineDash: function(arr) {
                    deepEqual(arr, [1.5, 3.5]);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render stroke dashType if not set", 0, function() {
            var ctx = mockContext({
                setLineDash: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });

        test("renders fill", function() {
            var ctx = mockContext({
                fill: function() {
                    equal(ctx.fillStyle, "blue");
                }
            });

            node.renderTo(ctx);
        });

        test("renders fill opacity", function() {
            shape.options.set("fill.opacity", 0.5);

            var ctx = mockContext({
                fill: function() {
                    equal(ctx.globalAlpha, 0.5);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render fill if not set", 0, function() {
            shape.options.set("fill", null);

            var ctx = mockContext({
                fill: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render fill if set to none", 0, function() {
            shape.options.set("fill.color", "none");

            var ctx = mockContext({
                fill: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });

        test("does not render fill if set to transparent", 0, function() {
            shape.options.set("fill.color", "transparent");

            var ctx = mockContext({
                fill: function() {
                    ok(false);
                }
            });

            node.renderTo(ctx);
        });
    }

    // ------------------------------------------------------------
    (function() {
        var path,
            pathNode;

        paintTests(d.Path, canv.PathNode, "PathNode");

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

        test("saves and restores context", 2, function() {
            pathNode.renderTo(mockContext({
                save: function() {
                    ok(true);
                },
                restore: function() {
                    ok(true);
                }
            }));
        });

        test("renders straight segments", 3, function() {
            path.moveTo(0, 0).lineTo(10, 20);

            pathNode.renderTo(mockContext({
                beginPath: function() {
                    ok(true);
                },
                moveTo: function(x, y) {
                    deepEqual([x, y], [0, 0]);
                },
                lineTo: function(x, y) {
                    deepEqual([x, y], [10, 20]);
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

        test("renders curve", 4, function() {
            path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

            var order = 0;
            pathNode.renderTo(mockContext({
                moveTo: function(x, y) {
                    equal(order++, 0, "#");
                    deepEqual([x, y], [0, 0]);
                },
                bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                    equal(order++, 1, "#");
                    deepEqual([cp1x, cp1y, cp2x, cp2y, x, y], [10, 10, 20, 10, 30, 0]);
                }
            }));
        });

        test("switches between line and curve", 6, function() {
            path.moveTo(0, 0).lineTo(5, 5).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0));

            var order = 0;
            pathNode.renderTo(mockContext({
                moveTo: function(x, y) {
                    equal(order++, 0, "#");
                    deepEqual([x, y], [0, 0]);
                },
                lineTo: function(x, y) {
                    equal(order++, 1, "#");
                    deepEqual([x, y], [5, 5]);
                },
                bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                    equal(order++, 2, "#");
                    deepEqual([cp1x, cp1y, cp2x, cp2y, x, y],
                              [10, 10, 20, 10, 30, 0]);
                }
            }));
        });

        test("switches between curve and line", 6, function() {
            path.moveTo(0, 0).curveTo(Point.create(10, 10), Point.create(20, 10), Point.create(30, 0)).lineTo(40, 10);

            var order = 0;
            pathNode.renderTo(mockContext({
                moveTo: function(x, y) {
                    equal(order++, 0, "#");
                    deepEqual([x, y], [0, 0]);
                },
                bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                    equal(order++, 1, "#");
                    deepEqual([cp1x, cp1y, cp2x, cp2y, x, y],
                              [10, 10, 20, 10, 30, 0]);
                },
                lineTo: function(x, y) {
                    equal(order++, 2, "#");
                    deepEqual([x, y], [40, 10]);
                }
            }));
        });

        test("does not render empty path", 0, function() {
            pathNode.renderTo(mockContext({
                moveTo: function() {
                    ok(false);
                }
            }));
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

        test("renders stroke lineJoin", function() {
            path.options.set("stroke.lineJoin", "round");

            var ctx = mockContext({
                stroke: function() {
                    equal(ctx.lineJoin, "round");
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

    // ------------------------------------------------------------
    (function() {
        var multiPath,
            multiPathNode;

        module("MultiPathNode", {
            setup: function() {
                multiPath = new d.MultiPath();
                multiPathNode = new canv.MultiPathNode(multiPath);
            }
        });

        test("renders composite paths", 4, function() {
            multiPath
                .moveTo(0, 0).lineTo(10, 20)
                .moveTo(10, 10).lineTo(10, 20);

            var order = 0;
            multiPathNode.renderTo(mockContext({
                moveTo: function(x, y) {
                    if (order === 0) {
                        deepEqual([x, y], [0, 0]);
                    } else if (order === 2) {
                        deepEqual([x, y], [10, 10]);
                    }

                    order++;
                },
                lineTo: function(x, y) {
                    deepEqual([x, y], [10, 20]);

                    order++;
                }
            }));
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var circle,
            circleNode;

        module("CircleNode", {
            setup: function() {
                var geometry = new g.Circle(new Point(10, 20), 30);
                circle = new d.Circle(geometry);
                circleNode = new canv.CircleNode(circle);
            }
        });

        test("renders arc", function() {
            circleNode.renderTo(mockContext({
                arc: function(x, y, r, start, end) {
                    deepEqual([x, y, r, start, end],
                              [10, 20, 30, 0, Math.PI * 2]);
                }
            }));
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var arc,
            arcNode;

        module("ArcNode", {
            setup: function() {
                var geometry = new g.Arc(new Point(10, 20), {
                    radiusX: 10,
                    radiusY: 10,
                    startAngle: 0,
                    endAngle: 90
                });
                arc = new d.Arc(geometry);
                arcNode = new canv.ArcNode(arc);
            }
        });

        test("renders equivalent curve", function() {
            var order = 0;
            arcNode.renderTo(mockContext({
                moveTo: function(x, y) {
                    equal(order++, 0, "#");
                    deepEqual([x, y], [20, 20]);
                },
                bezierCurveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
                    equal(order++, 1, "#");
                    arrayClose([cp1x, cp1y, cp2x, cp2y, x, y], [20, 25, 15, 30, 10, 30], 0.3);
                }
            }));
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var text;
        var textNode;

        paintTests(d.Text, canv.TextNode, "TextNode");

        module("TextNode", {
            setup: function() {
                text = new d.Text("Foo", new Point(10, 20), { font: "arial" });
                text.measure = function() {
                    return {
                        width: 20, height: 10, baseline: 15
                    };
                };

                textNode = new canv.TextNode(text);
            }
        });

        test("renders position accounting for baseline", function() {
            textNode.renderTo(mockContext({
                fillText: function(content, x, y) {
                    deepEqual([x, y], [10, 35]);
                }
            }));
        });

        test("renders content", function() {
            textNode.renderTo(mockContext({
                fillText: function(content) {
                    equal(content, "Foo");
                }
            }));
        });

        test("sets font", function() {
            var ctx = mockContext({
                fillText: function(content) {
                    equal(ctx.font, "arial");
                }
            });

            textNode.renderTo(ctx);
        });

        test("does not fill text if no fill is set", 0, function() {
            text.options.set("fill", null);

            var ctx = mockContext({
                fillText: function() {
                    ok(false);
                }
            });

            textNode.renderTo(ctx);
        });

        test("setting content invalidates node", function() {
            textNode.invalidate = function() {
                ok(true);
            };

            text.content("Bar");
        });

        test("strokes text", function() {
            text.stroke("red");

            var ctx = mockContext({
                strokeText: function(content, x, y) {
                    equal(content, "Foo");
                    deepEqual([x, y], [10, 35]);
                }
            });

            textNode.renderTo(ctx);
        });

        test("does not stroke text if no stroke is set", 0, function() {
            var ctx = mockContext({
                strokeText: function() {
                    ok(false);
                }
            });

            textNode.renderTo(ctx);
        });

        test("renders transform", function() {
            text.transform(new Matrix(1e-6, 2, 3, 4, 5, 6));

            var ctx = mockContext({
                transform: function(a, b, c, d, e, f) {
                    deepEqual([a, b, c, d, e, f], [1e-6, 2, 3, 4, 5, 6]);
                }
            });

            textNode.renderTo(ctx);
        });

        test("does not render transform if not set", 0, function() {
            var ctx = mockContext({
                transform: function(mx) {
                    ok(false);
                }
            });

            textNode.renderTo(ctx);
        });

        test("creates new path", function() {
            var ctx = mockContext({
                beginPath: function(mx) {
                    ok(true);
                }
            });

            textNode.renderTo(ctx);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var image;
        var imageNode;

        module("ImageNode", {
            setup: function() {
                image = new d.Image("Foo", new g.Rect(new Point(10, 20), [90, 80]));
                imageNode = new canv.ImageNode(image);
                imageNode._loaded = true;
            }
        });

        test("renders position", function() {
            imageNode.renderTo(mockContext({
                drawImage: function(img, x, y) {
                    deepEqual([x, y], [10, 20]);
                }
            }));
        });

        test("renders size", function() {
            imageNode.renderTo(mockContext({
                drawImage: function(img, x, y, width, height) {
                    deepEqual([width, height], [90, 80]);
                }
            }));
        });

        test("setting src resets loaded state", function() {
            image.src("Bar");
            ok(!imageNode._loaded);
        });

        test("load handler sets loaded state", function() {
            imageNode.onLoad();
            ok(imageNode._loaded);
        });

        test("load handler invalidates node", function() {
            imageNode.invalidate = function() {
                ok(true);
            };

            imageNode.onLoad();
        });

        test("geometryChange invalidates node", function() {
            imageNode.invalidate = function() {
                ok(true);
            };

            image.rect().origin.setX(20);
        });

        test("renders transform", function() {
            image.transform(new Matrix(1e-6, 2, 3, 4, 5, 6));

            var ctx = mockContext({
                transform: function(a, b, c, d, e, f) {
                    deepEqual([a, b, c, d, e, f], [1e-6, 2, 3, 4, 5, 6]);
                }
            });

            imageNode.renderTo(ctx);
        });

        test("does not render transform if not set", 0, function() {
            var ctx = mockContext({
                transform: function(mx) {
                    ok(false);
                }
            });

            imageNode.renderTo(ctx);
        });
    })();
})();
