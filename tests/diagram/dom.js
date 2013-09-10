///<reference path="qunit-1.12.0.js" />

(function ($, undefined) {
    var diagram = kendo.diagram, kdiagram, tollerance = 0.0001, Point = diagram.Point;

    /*-----------Diagram tests------------------------------------*/
    QUnit.module("Diagram tests");

    test("Basic tests", function () {
        GetRoot();
        $("#canvas").kendoDiagram();
        var found = document.getElementById('SVGRoot');
        ok(found != null, "The Diagram should add an <SVG/> element with name 'SVGRoot'.");
    });

    test("Adding shape tests", function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var kendoDiagram = diagramElement.data("kendoDiagram");
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
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var kendoDiagram = diagramElement.data("kendoDiagram");
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

    QUnit.module("event handling", {
        setup: function () {
            $("#canvas").kendoDiagram();

            kdiagram = $("#canvas").getKendoDiagram();
        },
        teardown: function () {
            kdiagram.clear();
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
            kdiagram.clear();
        }
    });

    test("Shape bounds changed event is raised after position set", function () {
        var s = kdiagram.addShape(new Point(0, 0)),
            raised;

        s.bind("boundsChange", function () {
            raised = true;
        });

        s.position(new Point(100, 100));
        ok(raised);
    });

    test("Shape bounds changed event is raised after bounds set", function () {
        var s = kdiagram.addShape(new Point(0, 0)),
            raised;

        s.bind("boundsChange", function () {
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
        QUnit.close(b.width, vb.width / z, tollerance);
        QUnit.close(b.height, vb.height / z, tollerance);
    });

    test("Bring to front - no arguments. Rearrange shapes", function () {
        var s1 = kdiagram.addShape(new Point(0, 0));
        var s2 = kdiagram.addShape(new Point(50, 50));
        var s3 = kdiagram.addShape(new Point(60, 60));
        s1.select(true);

        equal(kdiagram.shapes.indexOf(s1), 0);
        kdiagram.bringToFront();
        equal(kdiagram.shapes.indexOf(s1), 2);
    });

    test("Bring to front - no arguments. Rearrange connections", function () {
        var s1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
        var s2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));
        s1.select(true);

        equal(kdiagram.connections.indexOf(s1), 0);
        kdiagram.bringToFront();
        equal(kdiagram.connections.indexOf(s1), 1);
    });

    test("Bring to front - with args.", function () {
        var s1 = kdiagram.addShape(new Point(0, 0));
        var s2 = kdiagram.addShape(new Point(50, 50));
        var s3 = kdiagram.addShape(new Point(60, 60));

        equal(kdiagram.shapes.indexOf(s1), 0);
        kdiagram.bringToFront(s1);
        equal(kdiagram.shapes.indexOf(s1), 2);
    });

    test("Bring to front - with args connections", function () {
        var s1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
        var s2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));

        equal(kdiagram.connections.indexOf(s1), 0);
        kdiagram.bringToFront(s1);
        equal(kdiagram.connections.indexOf(s1), 1);
    });


    test("Bring to front - with shapes array.", function () {
        var s1 = kdiagram.addShape(new Point(0, 0));
        var s2 = kdiagram.addShape(new Point(50, 50));
        var s3 = kdiagram.addShape(new Point(60, 60));

        equal(kdiagram.shapes.indexOf(s1), 0);
        kdiagram.bringToFront([s1, s2]);
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
        kdiagram.bringToFront([s1, c1]);
        equal(kdiagram.shapes.indexOf(s1), 2);
        equal(kdiagram.connections.indexOf(c1), 1);
    });

    test("Send to back - with mixed array.", function () {
        var s1 = kdiagram.addShape(new Point(0, 0));
        var s2 = kdiagram.addShape(new Point(50, 50));
        var s3 = kdiagram.addShape(new Point(60, 60));
        var c1 = kdiagram.connect(new Point(0, 0, new Point(100, 100)));
        var c2 = kdiagram.connect(new Point(0, 0, new Point(100, 200)));

        kdiagram.sendToBack([s3, c2]);
        equal(kdiagram.shapes.indexOf(s3), 0);
        equal(kdiagram.connections.indexOf(c2), 0);
    });


    test("Hit test after bring to front and send to back.", function () {
        var s1 = kdiagram.addShape(new Point(0, 0));
        var s2 = kdiagram.addShape(new Point(50, 50));
        var s3 = kdiagram.addShape(new Point(60, 60));

        var hit = kdiagram.toolService._hitTest(new Point(70, 70));
        equal(hit.bounds(), s3.bounds());

        kdiagram.bringToFront(s1);
        hit = kdiagram.toolService._hitTest(new Point(70, 70));
        equal(hit.bounds(), s1.bounds());

        kdiagram.sendToBack(s1);
        hit = kdiagram.toolService._hitTest(new Point(70, 70));
        equal(hit.bounds(), s3.bounds());
    });

    QUnit.module("Connections and connectors", {
        setup: function () {
            $("#canvas").kendoDiagram();

            kdiagram = $("#canvas").getKendoDiagram();
        },
        teardown: function () {
            kdiagram.clear();
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

})(kendo.jQuery);

