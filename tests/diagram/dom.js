///<reference path="qunit-1.12.0.js" />

(function($, undefined) {
    var diagram = kendo.diagram, kdiagram;
    
    QUnit.module("event handling", {
        setup: function() {
            $("#canvas").kendoDiagram();

            kdiagram = $("#canvas").getKendoDiagram();
        },
        teardown: function() {
            kdiagram.clear();
        }
    });

    test("get canvas point of mouse event", function() {
        var offset = $("#canvas").offset();
        var point = kdiagram.documentToCanvasPoint(new diagram.Point(200, 200));

        ok(point.equals(new diagram.Point(200 - offset.left, 200 - offset.top)));
    });

    test("limit zoom with min/max values", function() {
        equal(kdiagram.getValidZoom(0.2), 0.55, "below min");
        equal(kdiagram.getValidZoom(0.55), 0.55, "is min");
        equal(kdiagram.getValidZoom(0.7), 0.7, "valid, zoom out");
        equal(kdiagram.getValidZoom(1), 1, "valid, no zoom");
        equal(kdiagram.getValidZoom(1.4), 1.4, "valid, zoom in");
        equal(kdiagram.getValidZoom(2), 2, "is max");
        equal(kdiagram.getValidZoom(2.2), 2, "above max");
    });

    test("zoom does not change the pan", function() {
        var pan = kdiagram.pan().clone();
        kdiagram.zoom(1.1);

        ok(pan.equals(kdiagram.pan()));
    });

    test("zoom at position changes diagram zoom", function() {
        var zoom = kdiagram.zoom(1.1, new diagram.Point(200, 200));
        equal(zoom, 1.1);
    });

    test("zoom at position pans the diagram", function() {
        kdiagram.zoom(1.1, new diagram.Point(200, 200));

        var pan = kdiagram.pan();
        ok(pan.x < 0, "x pan should be negative because the diagram has expanded around a static point");
        ok(pan.y < 0, "y pan should be negative because the diagram has expanded around a static point");
    });

    test("zoom out at position pans the diagram", function() {
        kdiagram.zoom(0.7, new diagram.Point(200, 200));

        var pan = kdiagram.pan();
        ok(pan.x > 0, "x pan should be positive because the diagram has shrunk around a static point");
        ok(pan.y > 0, "y pan should be positive because the diagram has shrunk around a static point");
    });
})(kendo.jQuery);

