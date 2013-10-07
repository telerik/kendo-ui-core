var diagram = kendo.diagram, kdiagram, tolerance = 0.0001, Point = diagram.Point, QUnit = window.QUnit, test = QUnit.test, ok = QUnit.ok;

/*-----------Diagram tests------------------------------------*/
QUnit.module("Diagram tests", {
    setup: function () {
        $("#canvas").kendoDiagram();

        kdiagram = $("#canvas").getKendoDiagram();
    },
    teardown: function () {
        kdiagram.destroy();
    }
});

test("Basic tests", function () {
    var found = document.getElementById('SVGRoot');
    ok(found != null, "The Diagram should add an <SVG/> element with name 'SVGRoot'.");
});

test("Adding shape tests", function () {
    var kendoDiagram = kdiagram;
    kendoDiagram.addShape(new diagram.Point(100, 120), {
        id: "TestShape",
        data: "rectangle",
        width: 200, height: 100,
        background: "#778899"
    });
    var found = document.getElementById("TestShape");
    ok(found != null, "A SVG shape with name 'TestShape' should be in the HTML tree.");
    ok(kendoDiagram.shapes.length == 1, "Items count should be incremented.");
    var item = kendoDiagram.shapes[0];
    ok(item.connectors.length == 5, "Item should have 5 connectors.");
    ok(item.options.id == "TestShape", "The Id should be passed across the hierarchy.");

    item.visible(false);
    ok(found.attributes["visibility"].value == "hidden", "The visibility should be 'collapsed' now.");
    item.visible(true);
    ok(found.attributes["visibility"].value == "visible", "The visibility should be 'visible' now.");
    item.IsSelected = true;
    kendoDiagram.addShape(new diagram.Point(350, 120), {
        id: "TestShape",
        data: "rectangle",
        width: 200,
        height: 100,
        background: "#778899"
    });
    //kendoDiagram.shapes[1].select(true);
});

test("Adding connections", function () {
    var kendoDiagram = kdiagram;
    var shape1 = AddShape(kendoDiagram, new diagram.Point(100, 120),
        kendo.deepExtend(Shapes.SequentialData, {
            width: 80, height: 80, title: "sequential data"
        }));
    shape1.Title = "Sequential Data.";
    var shape2 = AddShape(kendoDiagram, new diagram.Point(100, 400));
    var shape3 = AddShape(kendoDiagram, new diagram.Point(370, 400), Shapes.Wave);
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
    //ok(topCor.connections.length == 1, "Shape2#Top should have one connection.");
    //ok(bottomCor.connections.length == 2, "Shape1#Bottom should have two connections.");
});

test("Bring into view - rect", function () {
    var rect = new diagram.Rect(0, 0, 400, 400),
        viewport = kdiagram.viewport();
    kdiagram.bringIntoView(rect);
    var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
    deepEqual(kdiagram.pan(), newPan);
});

test("Bring into view - shape", function () {
    var s = kdiagram.addShape(new Point());
    var rect = s.bounds(),
        viewport = kdiagram.viewport();

    kdiagram.bringIntoView(s, {align: "none"});
    deepEqual(kdiagram.pan(), new Point(), "Shape is in view. No need to bring anything.");

    kdiagram.bringIntoView(s);
    var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
    deepEqual(kdiagram.pan(), newPan);

});

test("Bring into view - many shapes", function () {
    var s = kdiagram.addShape(new Point());
    var s1 = kdiagram.addShape(new Point(500, 500));
    var rect = s.bounds().union(s1.bounds()),
        viewport = kdiagram.viewport();

    kdiagram.bringIntoView([s, s1], {center: true});
    var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
    deepEqual(kdiagram.pan(), newPan);
});

test("Bring into view - after zoom", function () {
    var s = kdiagram.addShape(new Point());
    var s1 = kdiagram.addShape(new Point(500, 500));
    kdiagram.zoom(2);
    var rect = s.visualBounds().union(s1.visualBounds()),
        viewport = kdiagram.viewport();

    kdiagram.bringIntoView([s, s1]);
    var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center());
    deepEqual(kdiagram.pan(), newPan);
});

test("Bring into view - after zoom and pan", function () {
    var s = kdiagram.addShape(new Point());
    var s1 = kdiagram.addShape(new Point(500, 500));
    kdiagram.zoom(2);
    kdiagram.pan(new Point(300, 300));
    var rect = s.visualBounds().union(s1.visualBounds()),
        viewport = kdiagram.viewport();

    var newPan = new Point(viewport.width / 2, viewport.height / 2).minus(rect.center()).plus(kdiagram.pan());
    kdiagram.bringIntoView([s, s1]);
    deepEqual(kdiagram.pan(), newPan);
});

test("Bring into view - align top right", function () {
    var s = kdiagram.addShape(new Point());
    var rect = s.visualBounds(),
        viewport = kdiagram.viewport();

    var newPan = viewport.topRight().minus(rect.topRight()).plus(kdiagram.pan());
    kdiagram.bringIntoView([s], {align: "top right"});
    equal(kdiagram.pan().x, Math.floor(newPan.x));
    equal(kdiagram.pan().y, Math.floor(newPan.y));
});

test("Bring into view - align center bottom", function () {
    var s = kdiagram.addShape(new Point());
    var rect = s.visualBounds(),
        viewport = kdiagram.viewport();

    var newPan = viewport.bottom().minus(rect.bottom()).plus(kdiagram.pan());
    kdiagram.bringIntoView([s], {align: "center bottom"});
    equal(kdiagram.pan().x, newPan.x);
    equal(kdiagram.pan().y, newPan.y);
});

QUnit.module("event handling", {
    setup: function () {
        $("#canvas").kendoDiagram();

        kdiagram = $("#canvas").getKendoDiagram();
    },
    teardown: function () {
        kdiagram.destroy();
    }
});

test("get canvas point of mouse event", function () {
    var offset = $("#canvas").offset();
    var point = kdiagram.documentToCanvasPoint(new Point(200, 200));

    ok(point.equals(new Point(200 - offset.left, 200 - offset.top)));
});

test("limit zoom with min/max values", function () {
    equal(kdiagram.getValidZoom(0.2), 0.55, "below min");
    equal(kdiagram.getValidZoom(0.55), 0.55, "is min");
    equal(kdiagram.getValidZoom(0.7), 0.7, "valid, zoom out");
    equal(kdiagram.getValidZoom(1), 1, "valid, no zoom");
    equal(kdiagram.getValidZoom(1.4), 1.4, "valid, zoom in");
    equal(kdiagram.getValidZoom(2), 2, "is max");
    equal(kdiagram.getValidZoom(2.2), 2, "above max");
});

test("zoom does not change the pan", function () {
    var pan = kdiagram.pan().clone();
    kdiagram.zoom(1.1);

    ok(pan.equals(kdiagram.pan()));
});

test("zoom at position changes diagram zoom", function () {
    var zoom = kdiagram.zoom(1.1, new Point(200, 200));
    equal(zoom, 1.1);
});

test("zoom at position pans the diagram", function () {
    kdiagram.zoom(1.1, new Point(200, 200));

    var pan = kdiagram.pan();
    ok(pan.x < 0, "x pan should be negative because the diagram has expanded around a static point");
    ok(pan.y < 0, "y pan should be negative because the diagram has expanded around a static point");
});

test("zoom out at position pans the diagram", function () {
    kdiagram.zoom(0.7, new Point(200, 200));

    var pan = kdiagram.pan();
    ok(pan.x > 0, "x pan should be positive because the diagram has shrunk around a static point");
    ok(pan.y > 0, "y pan should be positive because the diagram has shrunk around a static point");
});

QUnit.module("Shape bounds", {
    setup: function () {
        $("#canvas").kendoDiagram();

        kdiagram = $("#canvas").getKendoDiagram();
    },
    teardown: function () {
        kdiagram.destroy();
    }
});

test("Shape bounds changed event is raised after position set", function () {
    var s = kdiagram.addShape(new Point(0, 0)),
        raised;

    kdiagram.bind("boundsChange", function () {
        raised = true;
    });

    s.position(new Point(100, 100));
    ok(raised);
});

test("Shape bounds changed event is raised after bounds set", function () {
    var s = kdiagram.addShape(new Point(0, 0)),
        raised;

    kdiagram.bind("boundsChange", function () {
        raised = true;
    });

    s.bounds(new diagram.Rect(100, 100, 100, 100));

    ok(raised);
});

test("Shape visual bounds is ok after pan", function () {
    var s = kdiagram.addShape(new Point(0, 0));
    kdiagram.pan(new Point(100, 100));

    var pan = kdiagram.pan();
    var vb = s.visualBounds();
    var b = s.bounds();
    equal(b.x + pan.x, vb.x);
    equal(b.y + pan.y, vb.y);
});

test("Shape visual bounds is ok after zoom", function () {
    var s = kdiagram.addShape(new Point(0, 0));
    var z = 0.5;
    z = kdiagram.zoom(z);

    var vb = s.visualBounds();
    var b = s.bounds();
    QUnit.close(b.width, vb.width / z, tolerance);
    QUnit.close(b.height, vb.height / z, tolerance);
});

test("Bring to front - no arguments. Rearrange shapes", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));
    s1.select(true);

    equal(kdiagram.shapes.indexOf(s1), 0);
    kdiagram.toFront();
    equal(kdiagram.shapes.indexOf(s1), 2);
});

test("Bring to front - no arguments. Rearrange connections", function () {
    var s1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
    var s2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));
    s1.select(true);

    equal(kdiagram.connections.indexOf(s1), 0);
    kdiagram.toFront();
    equal(kdiagram.connections.indexOf(s1), 1);
});

test("Bring to front - with args.", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));

    equal(kdiagram.shapes.indexOf(s1), 0);
    kdiagram.toFront(s1);
    equal(kdiagram.shapes.indexOf(s1), 2);
});

test("Bring to front - with args connections", function () {
    var s1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
    var s2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));

    equal(kdiagram.connections.indexOf(s1), 0);
    kdiagram.toFront(s1);
    equal(kdiagram.connections.indexOf(s1), 1);
});


test("Bring to front - with shapes array.", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));

    equal(kdiagram.shapes.indexOf(s1), 0);
    kdiagram.toFront([s1, s2]);
    equal(kdiagram.shapes.indexOf(s1), 1);
    equal(kdiagram.shapes.indexOf(s2), 2);
});

test("Bring to front - with mixed array.", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));
    var c1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
    var c2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));

    equal(kdiagram.shapes.indexOf(s1), 0);
    kdiagram.toFront([s1, c1]);
    equal(kdiagram.shapes.indexOf(s1), 2);
    equal(kdiagram.connections.indexOf(c1), 1);
});

test("Send to back - with mixed array.", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));
    var c1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
    var c2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));

    kdiagram.toBack([s3, c2]);
    equal(kdiagram.shapes.indexOf(s3), 0);
    equal(kdiagram.connections.indexOf(c2), 0);
});


test("Hit test after bring to front and send to back.", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(50, 50));
    var s3 = kdiagram.addShape(new Point(60, 60));

    var hit = kdiagram.toolService._hitTest(new Point(70, 70));
    equal(hit.bounds(), s3.bounds());

    kdiagram.toFront(s1);
    hit = kdiagram.toolService._hitTest(new Point(70, 70));
    equal(hit.bounds(), s1.bounds());

    kdiagram.toBack(s1);
    hit = kdiagram.toolService._hitTest(new Point(70, 70));
    equal(hit.bounds(), s3.bounds());
});

QUnit.module("Connections and connectors", {
    setup: function () {
        $("#canvas").kendoDiagram();

        kdiagram = $("#canvas").getKendoDiagram();
    },
    teardown: function () {
        kdiagram.destroy();
    }
});

test("Connection connect - set auto connectors test", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(100, 0));

    var c1 = kdiagram.connect(s1, s2);
    equal(c1.sourceConnector.options.name, "Auto");
    equal(c1.targetConnector.options.name, "Auto");
});

test("Connection connect - resolve auto connectors test", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(100, 0));

    var c1 = kdiagram.connect(s1, s2);
    equal(c1._resolvedSourceConnector.options.name, "Right");
    equal(c1._resolvedTargetConnector.options.name, "Left");
});

test("Connection connect - resolve auto connectors border test", function () {
    var s1 = kdiagram.addShape(new Point(100, 100));
    var s2 = kdiagram.addShape(new Point(160, 160));

    var c1 = kdiagram.connect(s1, s2);
    equal(c1._resolvedSourceConnector.options.name, "Right");
    equal(c1._resolvedTargetConnector.options.name, "Top");
});

test("Connection connect - resolve auto connectors after move test", function () {
    var s1 = kdiagram.addShape(new Point(100, 100));
    var s2 = kdiagram.addShape(new Point(160, 160));

    var c1 = kdiagram.connect(s1, s2);
    equal(c1._resolvedSourceConnector.options.name, "Right");
    equal(c1._resolvedTargetConnector.options.name, "Top");

    s2.position(new Point(300, 100));
    c1.refresh();
    equal(c1._resolvedSourceConnector.options.name, "Right");
    equal(c1._resolvedTargetConnector.options.name, "Left");
});

test("Connection detach", function () {
    var s1 = kdiagram.addShape(new Point(0, 0));
    var s2 = kdiagram.addShape(new Point(200, 0));

    var c1 = kdiagram.connect(s1, s2);
    c1.select(true);
    kdiagram.toolService.start(s2.bounds().left());

    ok(c1.adorner, "The connection edit adorner is present");
    ok(kdiagram.toolService.activeTool.type === "ConnectionTool", "The active tool is ConnectionEditTool");

    kdiagram.toolService.move(new Point(400, 0));
    kdiagram.toolService.end(new Point(400, 0));

    ok(c1._resolvedTargetConnector === undefined);
    ok(c1.targetConnector === undefined);

    equal(c1._resolvedSourceConnector.options.name, "Right");
    equal(c1.sourceConnector.options.name, "Auto");
});

QUnit.module("Serialization - Cut/Copy/Paste", {
    setup: function () {
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
    d._copy();
    equal(d._clipboard.length, 1);
});

test("Copy and Paste", function () {
    var shapesCount = d.shapes.length;
    var s1 = d.shapes[0];

    s1.select(true);
    equal(d._clipboard.length, 0);
    d._copy();
    equal(d._clipboard.length, 1);
    d._paste();
    equal(shapesCount + 1, d.shapes.length);
});

test("Cut and Paste", function () {
    var shapesCount = d.shapes.length;
    var s1 = d.shapes[0];

    s1.select(true);
    equal(d._clipboard.length, 0);
    d._cut();
    equal(d._clipboard.length, 1);
    equal(shapesCount - 1, d.shapes.length);
    d._paste();
    equal(shapesCount, d.shapes.length);
});

test("Cut and Paste - positions", function () {
    var shapesCount = d.shapes.length;
    var s1 = d.shapes[0];
    var pos = s1.position().clone();

    s1.select(true);
    d._cut();
    d._paste();
    var copied = d.shapes[d.shapes.length - 1];
    deepEqual(copied.position(), pos);
});


test("Copy and Paste - positions", function () {
    var shapesCount = d.shapes.length;
    var s1 = d.shapes[0];
    var pos = s1.position().clone();

    s1.select(true);
    d._copy();
    d._paste();
    var copied = d.shapes[d.shapes.length - 1];
    pos = pos.plus(new Point(d.options.copy.offsetX, d.options.copy.offsetY));
    deepEqual(copied.position(), pos);

    d._paste();
    copied = d.shapes[d.shapes.length - 1];
    pos = pos.plus(new Point(d.options.copy.offsetX, d.options.copy.offsetY));
    deepEqual(copied.position(), pos);
});

test("Copy - copying the options", function () {
    var shapesCount = d.shapes.length;
    var s1 = d.shapes[0];
    var copy = s1.copy();

    deepEqual(copy.options, s1.options);
});

test("Copy connection", function () {
    var c1 = d.connect(d.shapes[0], d.shapes[1]);

    var copy = c1.copy();

    deepEqual(copy.options, c1.options);
    deepEqual(copy.from, c1.from);
    deepEqual(copy.to, c1.to);
});

test("Copy/Paste connection", function () {
    var c1 = d.connect(d.shapes[0], d.shapes[1]);
    var cons = d.connections.length;

    c1.select(true);
    equal(d._clipboard.length, 0);
    d._copy();
    equal(d._clipboard.length, 1);
    d._paste();
    equal(cons + 1, d.connections.length);
});

test("Cut/Paste connection", function () {
    var c1 = d.connect(d.shapes[0], d.shapes[1]);
    var cons = d.connections.length;

    c1.select(true);
    equal(d._clipboard.length, 0);
    d._cut();
    equal(d._clipboard.length, 1);
    d._paste();
    equal(cons, d.connections.length);
});
