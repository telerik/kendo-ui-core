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
            close: $.noop,
            drawImage: $.noop,
            fill: $.noop,
            fillText: $.noop,
            lineTo: $.noop,
            moveTo: $.noop,
            restore: $.noop,
            save: $.noop,
            stroke: $.noop
        }, members);
    }

    // ------------------------------------------------------------
    (function() {
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

        test("load appends child nodes", function() {
            var parentGroup = new d.Group();
            var childGroup = new d.Group();
            parentGroup.append(childGroup);

            node.load([parentGroup]);

            ok(node.childNodes[0].childNodes[0] instanceof canv.Node);
        });
    })();

    // ------------------------------------------------------------
    (function() {
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
        var text;
        var textNode;

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

        test("setting content invalidates node", function() {
            textNode.invalidate = function() {
                ok(true);
            };

            text.content("Bar");
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
    })();

    // ------------------------------------------------------------
    (function() {
        var image;
        var imageNode;

        module("ImageNode", {
            setup: function() {
                image = new d.Image("Foo", new g.Rect(new Point(10, 20), new Point(100, 100)));
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

            image.rect().p0.setX(20);
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
