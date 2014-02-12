///<reference path="qunit-1.12.0.js" />
///<reference path="../refs/kendo.core.js" />
///<reference path="../refs/kendo.dataviz.core.js" />
///<reference path="../js/diagram.math.js" />
///<reference path="common.js" />
///<reference path="mock-helper.js" />

(function() {
    var tolerance = 0.0001,
        Point = kendo.diagram.Point,
        Rect = kendo.diagram.Rect,
        diagram;

    /*-----------Diagram tests------------------------------------*/
    module("Diagram tests", {
        setup: function () {
            QUnit.fixture.html('<div id="canvas" />');
            diagram = $("#canvas").kendoDiagram().getKendoDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("Basic tests", function () {
        var found = document.getElementById('SVGRoot');
        ok(found != null, "The Diagram should add an <SVG/> element with name 'SVGRoot'.");
    });

    test("Adding shape tests", function () {
        diagram.addShape({
            id: "TestShape",
            data: "rectangle",
            width: 200, height: 100,
            background: "#778899",
            x: 100,
            y: 120
        });
        var found = document.getElementById("TestShape");
        ok(found != null, "A SVG shape with name 'TestShape' should be in the HTML tree.");
        ok(diagram.shapes.length == 1, "Items count should be incremented.");
        var item = diagram.shapes[0];
        ok(item.connectors.length == 5, "Item should have 5 connectors.");
        ok(item.options.id == "TestShape", "The Id should be passed across the hierarchy.");

        item.visible(false);
        ok(found.attributes["visibility"].value == "hidden", "The visibility should be 'collapsed' now.");
        item.visible(true);
        ok(found.attributes["visibility"].value == "visible", "The visibility should be 'visible' now.");
    });

    test("Adding connections", function () {
        var kendoDiagram = diagram;
        var shape1 = AddShape(kendoDiagram, new Point(100, 120),
            kendo.deepExtend(Shapes.SequentialData, {
                width: 80, height: 80, title: "sequential data"
            }));
        shape1.Title = "Sequential Data.";
        var shape2 = AddShape(kendoDiagram, new Point(100, 400));
        var shape3 = AddShape(kendoDiagram, new Point(370, 400), Shapes.Wave);
        var topCor = shape2.getConnector("Top");
        var topCor2 = shape3.getConnector("Top");
        var bottomCor = shape1.getConnector("Bottom");
        var con = AddConnection(kendoDiagram, bottomCor, topCor, {
            startCap: "ArrowEnd",
            endCap: "FilledCircle"
        });
        var con2 = AddConnection(kendoDiagram, bottomCor, topCor2);
        con2.content("Connection Label");
        equal(kendoDiagram.connections.length, 2, "diagram should have 2 connections");
    });

    test("Bring into view - rect", function () {
        var rect = new Rect(0, 0, 400, 400),
            viewport = diagram.viewport();
        diagram.bringIntoView(rect);
        var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
        deepEqual(diagram.pan(), newPan);
    });

    test("Bring into view - shape", function () {
        var s = diagram.addShape({});
        var rect = s.bounds(),
            viewport = diagram.viewport();

        diagram.bringIntoView(s, {align: "none"});
        deepEqual(diagram.pan(), new Point(), "Shape is in view. No need to bring anything.");

        diagram.bringIntoView(s);
        var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
        deepEqual(diagram.pan(), newPan);

    });

    test("Bring into view - many shapes", function () {
        var s = diagram.addShape({});
        var point = new Point(500, 500)
        var s1 = diagram.addShape({
            x: point.x,
            y: point.y
        });
        var rect = s.bounds().union(s1.bounds()),
            viewport = diagram.viewport();

        diagram.bringIntoView([s, s1], {center: true});
        var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
        deepEqual(diagram.pan(), newPan);
    });

    test("Bring into view - align top right", function () {
        var s = diagram.addShape({});
        var rect = s.bounds("transformed"),
            viewport = diagram.viewport();

        var newPan = viewport.topRight().minus(rect.topRight()).plus(diagram.pan());
        diagram.bringIntoView([s], {align: "top right"});
        equal(diagram.pan().x, Math.floor(newPan.x));
        equal(diagram.pan().y, Math.floor(newPan.y));
    });

    test("Bring into view - align center bottom", function () {
        var s = diagram.addShape({});
        var rect = s.bounds("transformed"),
            viewport = diagram.viewport();

        var newPan = viewport.bottom().minus(rect.bottom()).plus(diagram.pan());
        diagram.bringIntoView([s], {align: "center bottom"});
        equal(diagram.pan().x, newPan.x);
        equal(diagram.pan().y, newPan.y);
    });

    module("initialization", {
        setup: function() {
            QUnit.fixture.html('<div id=canvas />');
            window.initLayoutDiagram = function(options) {
                diagram = $("#canvas").kendoDiagram({ layout: options }).data("kendoDiagram");
            };
        },
        teardown: function() {
            window.removeMocksIn(window.kendo.ui.Diagram.fn);
            delete window.initDiagram;
            diagram.destroy();
        }
    });

    test("grid layout", function () {
        var diagramFn = kendo.ui.Diagram.prototype;
        diagramFn.layout = diagramFn.layout.mock();

        window.initLayoutDiagram({
            grid: {
                width: 600
            }
        });

        equal(diagram.options.layout.grid.width, 600, "grid width option should be stored");
        ok(diagramFn.layout.called, "the layout method of the diagram should be called");
    });

    module("event handling", {
        setup: function () {
            QUnit.fixture.html('<div id="canvas" />');
            $("#canvas").kendoDiagram();
            diagram = $("#canvas").getKendoDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("limit zoom with min/max values", function () {
        equal(diagram._getValidZoom(0.7), 0.7, "valid, zoom out");
        equal(diagram._getValidZoom(1), 1, "valid, no zoom");
        equal(diagram._getValidZoom(1.4), 1.4, "valid, zoom in");
        equal(diagram._getValidZoom(2), 2, "is max");
        equal(diagram._getValidZoom(2.2), 2, "above max");
    });

    test("zoom does not change the pan", function () {
        var pan = diagram.pan().clone();
        diagram.zoom(1.1);

        ok(pan.equals(diagram.pan()));
    });

    test("zoom at position changes diagram zoom", function () {
        var zoom = diagram.zoom(1.1, new Point(200, 200));
        equal(zoom, 1.1);
    });

    module("Coordinate transformations", {
        setup: function() {
            QUnit.fixture.html('<div id="canvas" />');
            diagram = $("#canvas").kendoDiagram().getKendoDiagram();
        },
        teardown: function() {
            diagram.destroy();
        }
    });

    test("transform document point to view point", function() {
        var doc = $(diagram.canvas.element).offset(),
            point = new Point(100, 100);

        var result = diagram.documentToView(point);

        roughlyEqualPoint(result, new Point(point.x - doc.left, point.y - doc.top), "transformed point should be relative to the diagram view");
    });

    test("transform view point to document point", function() {
        var doc = $(diagram.canvas.element).offset(),
            point = new Point(100, 100);

        var result = diagram.viewToDocument(point);

        roughlyEqualPoint(result, new Point(point.x + doc.left, point.y + doc.top), "transformed point should include the diagram container offset");
    });

    test("transform view to layer point", function() {
        var point = new Point(100, 100);
        diagram.zoom(1.5);

        var result = diagram.viewToLayer(point);

        roughlyEqualPoint(result, point.times(1/1.5), "view point should correspond to a scaled down vector in the layer");
    });

    test("transform layer to view point", function() {
        var point = new Point(100, 100);
        diagram.zoom(1.5);

        var result = diagram.layerToView(point);

        roughlyEqualPoint(result, point.times(1.5), "layer point should appear as zoomed in the view coordinate system");
    });

    test("transform document to layer", function() {
        var point = new Point(100, 100);
        diagram.zoom(1.5);
        diagram.pan(-20, -20);

        var result = diagram.documentToLayer(point);
        var expected = diagram.viewToLayer(diagram.documentToView(point));

        roughlyEqualPoint(result, expected, "document to layer transformation should be same as document->view->layer");
    });

    test("transform layer to document", function() {
        var point = new Point(100, 100);
        diagram.zoom(1.5);
        diagram.pan(-20, -20);

        var result = diagram.layerToDocument(point);
        var expected = diagram.viewToDocument(diagram.layerToView(point));

        roughlyEqualPoint(result, expected, "layer->view->document");
    });

    module("Shape bounds", {
        setup: function () {
            QUnit.fixture.html('<div id="canvas" />');
            $("#canvas").kendoDiagram();

            diagram = $("#canvas").getKendoDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("Shape bounds changed event is raised after position set", function () {
        var s = diagram.addShape({}),
            raised;

        diagram.bind("boundsChange", function () {
            raised = true;
        });

        s.position(new Point(100, 100));
        ok(raised);
    });

    test("Shape bounds changed event is raised after bounds set", function () {
        var s = diagram.addShape({}),
            raised;

        diagram.bind("boundsChange", function () {
            raised = true;
        });

        s.bounds(new Rect(100, 100, 100, 100));

        ok(raised);
    });

    test("Shape visual bounds is ok after zoom", function () {
        var s = diagram.addShape({});
        var z = 0.5;
        z = diagram.zoom(z);

        var vb = s.bounds("transformed");
        var b = s.bounds();
        close(b.width, vb.width / z, tolerance);
        close(b.height, vb.height / z, tolerance);
    });

    test("Add shape raises itemschange event", function() {
        var eventShape = null,
            called = false;

        diagram.bind("itemsChange", function(args) {
            eventShape = args.added[0];
            called = true;
        });

        var addedShape = diagram.addShape({});
        ok(called, "itemschange event should be raised");
        equal(eventShape, addedShape, "the reported shape should be the same as the added");
    });

    test("Remove shape raises itemschange event", function() {
        var eventShape = null,
            called = false,
            shape = diagram.addShape({});

        diagram.bind("itemsChange", function(args) {
            eventShape = args.removed[0];
            called = true;
        });

        diagram.remove(shape);
        ok(called, "itemschange event should be raised");
        equal(eventShape, shape, "the reported shape should be the same as the removed");
    });

    test("Remove multiple items raises itemschange event", function() {
        var eventShapes = [],
            point = new Point(1, 0),
            shapes = [diagram.addShape({}), diagram.addShape({ x: point.x, y: point.y })];

        diagram.bind("itemsChange", function(args) {
            eventShapes = args.removed;
        });

        diagram.remove(shapes);
        equal(eventShapes.length, shapes.length, "all shapes should be reported by the event handler");
    });

    module("Connections and connectors", {
        setup: function () {
            QUnit.fixture.html('<div id="canvas" />');
            $("#canvas").kendoDiagram();

            diagram = $("#canvas").getKendoDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("Connection connect - set auto connectors test", function () {
        var s1 = diagram.addShape({});
        var point = new Point(100, 0);
        var s2 = diagram.addShape({ x: point.x, y: point.y });

        var c1 = diagram.connect(s1, s2);
        equal(c1.sourceConnector.options.name, "Auto");
        equal(c1.targetConnector.options.name, "Auto");
    });

    test("Connection connect - resolve auto connectors test", function () {
        var s1 = diagram.addShape({});
        var point = new Point(100, 0);
        var s2 = diagram.addShape({ x: point.x, y: point.y });

        var c1 = diagram.connect(s1, s2);
        equal(c1._resolvedSourceConnector.options.name, "Right");
        equal(c1._resolvedTargetConnector.options.name, "Left");
    });

    test("Connection connect - resolve auto connectors border test", function () {
        var point1 = new Point(100, 100);
        var s1 = diagram.addShape({ x: point1.x, y: point1.y });
        var point2 = new Point(160, 160);
        var s2 = diagram.addShape({ x: point2.x, y: point2.y });

        var c1 = diagram.connect(s1, s2);
        equal(c1._resolvedSourceConnector.options.name, "Bottom");
        equal(c1._resolvedTargetConnector.options.name, "Left");
    });

    test("Connection connect - resolve auto connectors after move test", function () {
        var point1 = new Point(100, 100);
        var s1 = diagram.addShape({ x: point1.x, y: point1.y });
        var point2 = new Point(160, 160);
        var s2 = diagram.addShape({ x: point2.x, y: point2.y });

        var c1 = diagram.connect(s1, s2);
        equal(c1._resolvedSourceConnector.options.name, "Bottom");
        equal(c1._resolvedTargetConnector.options.name, "Left");

        s2.position(new Point(300, 100));
        c1.refresh();
        equal(c1._resolvedSourceConnector.options.name, "Right");
        equal(c1._resolvedTargetConnector.options.name, "Left");
    });

    test("Connection detach", function () {
        var s1 = diagram.addShape({});
        var point2 = new Point(200, 0);
        var s2 = diagram.addShape({ x: point2.x, y: point2.y });

        var c1 = diagram.connect(s1, s2);
        c1.select(true);
        diagram.toolService.start(s2.bounds().left());

        ok(c1.adorner, "The connection edit adorner is present");
        ok(diagram.toolService.activeTool.type === "ConnectionTool", "The active tool is ConnectionEditTool");

        diagram.toolService.move(new Point(400, 0));
        diagram.toolService.end(new Point(400, 0));

        ok(c1._resolvedTargetConnector === undefined);
        ok(c1.targetConnector === undefined);

        equal(c1._resolvedSourceConnector.options.name, "Right");
        equal(c1.sourceConnector.options.name, "Auto");
    });

    test('Connection definers', function () {
        var con = new kendo.diagram.Connection(new Point(10, 20), new Point(100, 200));
        con.points([new Point(1, 2), new Point(3, 4), new Point(5, 6)]);
        equal(con.points().length, 3);
        equal(con.allPoints().length, 5);
        ok(con.sourceDefiner().point === con.sourcePoint());
        ok(con.targetDefiner().point === con.targetPoint());

        con.sourceDefiner(new kendo.diagram.PathDefiner(new Point(44, 55), new Point(478, 44), new Point(-55, 0)));
        ok(con.sourceDefiner().point.x === 44 && con.sourceDefiner().point.y === 55);
        ok(con.sourceDefiner().left===null);
        ok(con.sourceDefiner().right.x === -55 && con.sourceDefiner().right.y === 0);

        con.targetDefiner(new kendo.diagram.PathDefiner(new Point(44, 55), new Point(478, 102), new Point(-55, 0)));
        ok(con.targetDefiner().point.x === 44 && con.targetDefiner().point.y === 55);
        ok(con.targetDefiner().right===null);
        ok(con.targetDefiner().left.x === 478 && con.targetDefiner().left.y === 102);
    });

    test('Connection bounds', function () {
        var con = new kendo.diagram.Connection(new Point(0, 0), new Point(500, 500));
        con.points([new Point(25,10), new Point(101,88), new Point(250,37), new Point(100,100), new Point(301,322), new Point(660,770)]);
        var bounds = con._router.getBounds();
        ok(bounds.x===0 && bounds.y===0 && bounds.width===660 && bounds.height===770);
    });

    test('Distance to a line segment', function () {
        var d = kendo.diagram.Geometry.distanceToLine(new Point(0,0), new Point(0,100), new Point(100,100));
        equal(d, 100);
        d = kendo.diagram.Geometry.distanceToLine(new Point(57.88, 0), new Point(0, 100), new Point(100, 100));
        equal(d,100);
        d = kendo.diagram.Geometry.distanceToLine(new Point(100, 44.02), new Point(0, 0), new Point(0, 100));
        equal(d,100);
    });

    test('Distance to polyline', function () {
        var polyline = [new Point(0,0), new Point(100,0), new Point(100,100), new Point(0,100)];
        var d = kendo.diagram.Geometry.distanceToPolyline(new Point(50,50), polyline);
        equal(d, 50);
        d = kendo.diagram.Geometry.distanceToPolyline(new Point(57,50), polyline);
        equal(d, 43);
    });

    module("Serialization - Cut/Copy/Paste", {
        setup: function () {
            QUnit.fixture.html('<div id="canvas" />');
            $("#canvas").kendoDiagram();

            d = $("#canvas").getKendoDiagram();
            randomDiagram(d);
        },
        teardown: function () {
            d.destroy();
        }
    });

    test("Copy Selected", function () {
        var s1 = d.shapes[0];

        s1.select(true);
        equal(d._clipboard.length, 0);
        d.copy();
        equal(d._clipboard.length, 1);
    });

    test("Copy and Paste", function () {
        var shapesCount = d.shapes.length;
        var s1 = d.shapes[0];

        s1.select(true);
        equal(d._clipboard.length, 0);
        d.copy();
        equal(d._clipboard.length, 1);
        d.paste();
        equal(shapesCount + 1, d.shapes.length);
    });

    test("Cut and Paste", function () {
        var shapesCount = d.shapes.length;
        var s1 = d.shapes[0];

        s1.select(true);
        equal(d._clipboard.length, 0);
        d.cut();
        equal(d._clipboard.length, 1);
        equal(shapesCount - 1, d.shapes.length);
        d.paste();
        equal(shapesCount, d.shapes.length);
    });

    test("Cut and Paste - positions", function () {
        var shapesCount = d.shapes.length;
        var s1 = d.shapes[0];
        var pos = s1.position().clone();

        s1.select(true);
        d.cut();
        d.paste();
        var copied = d.shapes[d.shapes.length - 1];
        deepEqual(copied.position(), pos);
    });


    test("Copy and Paste - positions", function () {
        var shapesCount = d.shapes.length;
        var s1 = d.shapes[0];
        var pos = s1.position().clone();

        s1.select(true);
        d.copy();
        d.paste();
        var copied = d.shapes[d.shapes.length - 1];
        pos = pos.plus(new Point(d.options.copy.offsetX, d.options.copy.offsetY));
        deepEqual(copied.position(), pos);

        d.paste();
        copied = d.shapes[d.shapes.length - 1];
        pos = pos.plus(new Point(d.options.copy.offsetX, d.options.copy.offsetY));
        deepEqual(copied.position(), pos);
    });

    test("Copy - copying the options", function () {
        var shapesCount = d.shapes.length;
        var s1 = d.shapes[0];
        var copy = s1.clone();
        ok(copy.id!==s1.id && copy.options.id!==s1.options.id);
        copy.options.id = s1.options.id;
        deepEqual(copy.options, s1.options);
    });

    test("Copy connection", function () {
        var c1 = d.connect(d.shapes[0], d.shapes[1]);

        var copy = c1.clone();

        deepEqual(copy.options, c1.options);
        deepEqual(copy.from, c1.from);
        deepEqual(copy.to, c1.to);
    });

    test("Copy/Paste connection", function () {
        var c1 = d.connect(d.shapes[0], d.shapes[1]);
        var cons = d.connections.length;

        c1.select(true);
        equal(d._clipboard.length, 0);
        d.copy();
        equal(d._clipboard.length, 1);
        d.paste();
        equal(cons + 1, d.connections.length);
    });

    test("Cut/Paste connection", function () {
        var c1 = d.connect(d.shapes[0], d.shapes[1]);
        var cons = d.connections.length;

        c1.select(true);
        equal(d._clipboard.length, 0);
        d.cut();
        equal(d._clipboard.length, 1);
        d.paste();
        equal(cons, d.connections.length);
    });
})();
