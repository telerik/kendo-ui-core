///<reference path="qunit-1.12.0.js" />

(function ($, undefined) {
    var kendo = window.kendo, diagram = kendo.diagram, d;

    module("Selection tests", {
        setup: function () {
            $("#canvas").kendoDiagram();

            d = $("#canvas").getKendoDiagram();
            randomDiagram(d);
        },
        teardown: function () {
            d.clear();
        }
    });

    test("Select/Deselect all", function () {
        d.select(true);

        equal(d.shapes.length + d.connections.length, d.select().length);

        d.select(false);

        equal(0, d.select().length);
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

        var toolService = new diagram.ToolService(d);
        toolService.start(s1c);
        var endpoint = s1c.plus(new diagram.Point(5, 5));
        toolService.move(endpoint);
        toolService.end(endpoint);

        ok(c.sourceConnector !== undefined, "Connection is attached to the source.");
        ok(c.targetConnector !== undefined, "Connection is attached to the target.");
    });

    test("Resizing/Selection adorner", function () {
        var i = d.shapes[0];
        i.select(true);

        ok(i.adorner, "Adorner is present.");
        deepEqual(i.visualBounds().inflate(i.adorner.options.offset, i.adorner.options.offset), i.adorner.bounds(), "Adoner has correct bounds");
    });

    module("Tooling tests. Ensure the tools are activated correctly.", {
        setup: function () {
            $("#canvas").kendoDiagram();

            d = $("#canvas").getKendoDiagram();
            randomDiagram(d);
        },
        teardown: function () {
            d.clear();
        }
    });

    test("Connectors activated", function () {
        var s1 = d.shapes[0];
        var s1c = s1.bounds().center();
        d.toolService.move(s1c);

        ok(d._connectorsAdorner, "The adorner is visible");
        //equal(d.toolService._hoveredConnector, s1.getConnector("Auto"), "Auto (center) connector is hovered");
    });

    module("Hitesting tests", {
        setup: function () {
            $("#canvas").kendoDiagram();

            d = $("#canvas").getKendoDiagram();
            randomDiagram(d);
        },
        teardown: function () {
            d.clear();
        }
    });

    /*-----------Undoredo tests------------------------------------*/
    QUnit.module("UndoRedo tests");

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

})(kendo.jQuery);

