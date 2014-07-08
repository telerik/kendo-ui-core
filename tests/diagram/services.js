///<reference path="qunit-1.12.0.js" />

(function ($, undefined) {
    var kendo = window.kendo;
    var deepExtend = kendo.deepExtend;
    var diagram = kendo.dataviz.diagram;
    var Point = diagram.Point;
    var element;
    var d;

    function setup() {
        setupDiagram();
        addShapes();
    }

    function addShapes() {
        d.addShape(new Point(10, 20), { data: "Rectangle" });
        d.addShape(new Point(50, 100), { data: "Rectangle" });
        d.addShape(new Point(30, 200), { data: "Rectangle" });
        d.addShape(new Point(500, 100), { data: "Rectangle" });
    }

    function setupDiagram(options) {
        element = $('<div id=canvas />').appendTo(QUnit.fixture);
        element.kendoDiagram(deepExtend({
            theme: "black"
        }, options));
        d = element.data("kendoDiagram");
    }

    function teardown() {
        kendo.destroy(QUnit.fixture);
        element.remove();
    }

    module("ToolService", {
        setup: setup,
        teardown: teardown
    });

    test("toolservice ends tool on start if there is active tool", function() {
        d.toolService.activeTool = {
            end: function(p, meta) {
                ok(true);
            }
        };
        d.toolService.start(new Point(), {});
    });

    module("Selection tests", {
        setup: setup,
        teardown: teardown
    });

    test("Select/Deselect all", function () {
        d.selectAll();

        equal(d.shapes.length + d.connections.length, d.select().length);
    });

    test("Select/Deselect any", function () {
        d.shapes[2].select(true);
        d.shapes[3].select(true);

        equal(2, d.select().length);

        d.shapes[2].select(false);
        d.shapes[3].select(false);
        equal(0, d.select().length);
    });

    test("Drag group - 2 shapes and connection", function () {
        var s1 = d.shapes[0], s2 = d.shapes[1];
        var c = d.connect(s1, s2);
        s1.select(true);
        s2.select(true);
        c.select(true);

        var s1c = s1.bounds().center().minus(new diagram.Point(5, 5));

        d.toolService.start(s1c);
        var endpoint = s1c.plus(new diagram.Point(5, 5));
        d.toolService.move(endpoint);
        d.toolService.end(endpoint);

        ok(c.sourceConnector !== undefined, "Connection is attached to the source.");
        ok(c.targetConnector !== undefined, "Connection is attached to the target.");
    });

    (function() {
        var adorner;
        var visual;
        var drawingContainer;

        module("Resizing/Selection adorner / initialization", {
            setup: function() {
                setupDiagram();
                adorner = d._resizingAdorner;
                visual = adorner.visual;
                drawingContainer = visual.drawingContainer();
            },
            teardown: teardown
        });

        test("creates visual group", function() {
            ok(visual instanceof diagram.Group);
        });

        test("creates bounds rectangle", function() {
            ok(adorner.rect instanceof diagram.Rectangle);
        });

        test("appends bounds rectangle to visual group", function() {
            ok($.inArray(adorner.rect.drawingContainer(), drawingContainer.children) >= 0);
        });

        test("creates handles", function() {
            var map = adorner.map;
            equal(map.length, 8);
            for (var i = 0; i < 8; i++) {
                ok(map[i].visual instanceof diagram.Rectangle);
            }
        });

        test("adds handles to visual group", function() {
            var map = adorner.map;
            for (var i = 0; i < 8; i++) {
                ok($.inArray(map[i].visual.drawingContainer(), drawingContainer.children) >= 0);
            }
        });

        test("creates rotation thumb", function() {
            ok(adorner.rotationThumb instanceof diagram.Path);
        });

        test("adds rotation thumb to visual group", function() {
            ok($.inArray(adorner.rotationThumb.drawingContainer(), drawingContainer.children) >= 0);
        });

        // ------------------------------------------------------------
        module("Resizing/Selection adorner / editable", {
            setup: function() {
                setupDiagram({
                    editable: {
                        resize: false,
                        rotate: false
                    }
                });
                adorner = d._resizingAdorner;
                visual = adorner.visual;
                drawingContainer = visual.drawingContainer();
            },
            teardown: teardown
        });

        test("does not create handles if resizing is disabled", function() {
            equal(adorner.map.length, 0);
        });

        test("does not create rotation thumb if rotation is disabled", function() {
            ok(!adorner.rotationThumb);
        });

        // ------------------------------------------------------------
        module("Resizing/Selection adorner", {
            setup: function() {
                setupDiagram();
                adorner = d._resizingAdorner;
                addShapes();
            },
            teardown: teardown
        });

        test("bounds", function () {
            var shape = d.shapes[0];
            shape.select(true);
            deepEqual(shape.bounds("transformed").inflate(adorner.options.offset, adorner.options.offset), adorner.bounds(), "Adoner has correct bounds");
        });

        test("correct cursor", function () {
            var last = d.shapes[d.shapes.length - 1];

            last.select(true);
            var delta = new Point(adorner.options.offset + 4, adorner.options.offset + 4);
            var testP = last.bounds().bottomRight().plus(delta);

            equal(adorner._getCursor(testP), "se-resize", "Cursor is correct.");
        });

        test("correct cursor after rotation - 50", function () {
            var last = d.shapes[d.shapes.length - 1];

            last.select(true);
            last.rotate(50);
            var delta = new Point(adorner.options.offset + 4, adorner.options.offset + 4);
            var testP = last.bounds().bottomRight().plus(delta);
            testP.rotate(last.bounds().center(), 360 - 50);

            equal(adorner._getCursor(testP), "s-resize", "Cursor is correct.");
        });

    })();

    // ------------------------------------------------------------
    module("Tooling tests. Ensure the tools are activated correctly.", {
        setup: setup,
        teardown: teardown
    });

    test("Connectors activated", function () {
        var s1 = d.shapes[0];
        var s1c = s1.bounds().center();
        d.toolService.move(s1c);

        ok(d._connectorsAdorner, "The adorner is visible");
        //equal(d.toolService._hoveredConnector, s1.getConnector("Auto"), "Auto (center) connector is hovered");
    });

    test("ConnectionTool - create connection", function () {
        d.clear();
        d.addShape(new Point(0, 0));
        var s1 = d.shapes[0];
        var s1c = s1.bounds().center();
        d.toolService.start(s1c);
        d.toolService.move(s1c);
        d.toolService.end(s1c);

        d.toolService.start(s1c);
        d.toolService.move(s1c);
        var target = new Point(300, 300);
        d.toolService.move(target);

        ok(d.toolService.newConnection, "New Connection is present");
        equal(target, d.toolService.newConnection.targetPoint(), "New Connection target is ok");

        var c = d.toolService.newConnection;
        d.toolService.end(target);
        ok(!d.toolService.newConnection, "New Connection is empty");

        equal(target, c.targetPoint(), "Connection target is ok");
        //equal(d.toolService._hoveredConnector, s1.getConnector("Auto"), "Auto (center) connector is hovered");
    });

    // ------------------------------------------------------------
    // module("Hitesting tests", {
        // setup: setup,
        // teardown: teardown
    // });

    // ------------------------------------------------------------
    QUnit.module("UndoRedo tests", {
        setup: setup,
        teardown: teardown
    });

    test("UndoRedoService basic", function () {
        var ur = new diagram.UndoRedoService();
        var unit = new Task("Counting unit.");
        ur.begin();
        ur.addCompositeItem(unit);
        ur.commit();
        ok(unit.Count == 1, "Unit was executed");
        ur.undo();
        ok(ur.count() > 0, "The units are still there.");
        QUnit.equal(unit.Count, 0, "Unit undo was executed");
        ur.redo();
        ok(unit.Count == 1, "Unit was executed");
        QUnit.throws(function () {
            ur.Redo();
        }, "Supposed to raise an exception since we are passed the length of the stack.");
        ur.undo();
        ok(unit.Count == 0, "Unit was executed");
        ur = new diagram.UndoRedoService();
        unit = new Task("Counting unit.");
        ur.add(unit);
        ok(unit.Count == 1, "Unit was executed");
    });

    test("Delete shape, undo, connection attached", function () {
        var s1 = d.shapes[0];
        var s2 = d.shapes[1];

        var c1 = d.connect(s1, s2);

        ok(c1.sourceConnector !== undefined, "Source attached");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");

        d.remove(s1, true);

        d.undo();

        ok(c1.sourceConnector !== undefined, "Source attached after undo");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");
    });

    test("Delete Connection, undo, connection attached", function () {
        var s1 = d.shapes[0];
        var s2 = d.shapes[1];

        var c1 = d.connect(s1, s2);

        ok(c1.sourceConnector !== undefined, "Source attached");
        ok(c1.sourceConnector.options.name == "Auto", "Attached to Auto");

        d.remove(c1, true);

        d.undo();

        var lastC = d.connections[d.connections.length - 1];

        ok(lastC.sourceConnector !== undefined, "Source attached after undo");
        ok(lastC.sourceConnector.options.name == "Auto", "Attached to Auto");

        ok(lastC.targetConnector !== undefined, "Target attached after undo");
        ok(lastC.targetConnector.options.name == "Auto", "Attached to Auto");
    });

})(kendo.jQuery);

