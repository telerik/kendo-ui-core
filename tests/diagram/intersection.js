///<reference path="qunit-1.12.0.js" />
///<reference path="../refs/kendo.core.js" />
///<reference path="../refs/kendo.dataviz.core.js" />
///<reference path="../js/diagram.math.js" />

(function($, undefined) {
    var diagram = kendo.diagram,
        Point = diagram.Point,
        Rect = diagram.Rect,
        Intersect = diagram.Intersect;

    module("line intersection");

    test("intersect vertical parallel lines", function() {
        noIntersection(2,3, 2,5, 4,3, 4,5);
    });

    test("intersect horizontal parallel lines", function() {
       noIntersection(2,3, 4,3, 2,5, 4,5);
    });

    test("intersect at start", function() {
        var l = createLines(2,3, 5,6, 2,3, 5,7);
        var intersect = intersectLines(l);

        equalPoint(intersect, l.start1);
    });

    test("intersect at end", function() {
        var l = createLines(2,4, 5,6, 2,3, 5,6);
        var intersect = intersectLines(l);

        equalPoint(intersect, l.end1);
    });

    test("intersect at middle orthogonal", function() {
        var intersect = intersectCoords(1,2, 4,2, 2,1, 2,4);

        equalPoint(intersect, new Point(2, 2));
    });

    test("intesect at middle", function() {
        var intersect = intersectCoords(1,1, 3,5, 1,4, 4,1);

        equalPoint(intersect, new Point(2, 3));
    });

    test("no intersect - line 1 below line 2", function() {
        var intersect = intersectCoords(1,1, 2,2, 3,5, 5,3);

        equalPoint(intersect, new Point(4, 4));
    });

    module("segment intersection");

    test("no intersect - line 1 below line 2", function() {
        noSegmentIntersection(1,1, 2,2, 3,5, 5,3);
    });

    test("no intersect - line 1 above line 2", function() {
        noSegmentIntersection(5,5, 7,7, 3,5, 5,3);
    });

    test("no intersect - line 2 below line 1", function() {
        noSegmentIntersection(3,5, 5,3, 1,1, 2,2);
    });

    test("no intersect - line 2 above line 1", function() {
        noSegmentIntersection(3,5, 5,3, 5,5, 7,7);
    });
    
    var rect;
    module("rect with line intersection", {
        setup: function() {
            rect = new Rect(2, 2, 3, 3);
        }
    });

    test("line outside rect", function() {
        var line = createLine(0, 1, 1, 0);

        var result = Intersect.rectWithLine(rect, line.start, line.end);
        ok(!result);
    });

    test("line with rect - single intersection", function() {
        var line = createLine(1, 3, 3, 3);

        var result = Intersect.rectWithLine(rect, line.start, line.end);
        ok(result);
    });

    module("intersect rects", {
        setup: function() {
            rect = new Rect(2, 2, 3, 3);
        }
    });

    test("rect is outside", function() {
        var otherRect = new Rect(6, 6, 1, 1);

        ok(!Intersect.rects(rect, otherRect));
    });

    test("rect is partially outside", function() {
        var otherRect = new Rect(4, 4, 1, 1);

        ok(Intersect.rects(rect, otherRect));
    });

    test("rect is completely inside", function() {
        var otherRect = new Rect(3, 3, 1, 1);

        ok(Intersect.rects(rect, otherRect));
    });

    test("rotated rect is outside", function() {
        var otherRect = new Rect(2, 3, 100, 2);

        ok(!Intersect.rects(rect, otherRect, 90));
    });

    test("rotated rect is partially inside", function() {
        var otherRect = new Rect(4, 4, 2, 2);

        ok(Intersect.rects(rect, otherRect, 45));
    });

    test("rect2 is around rect1", function() {
        var otherRect = new Rect(1, 1, 5, 5);

        ok(Intersect.rects(rect, otherRect));
    });

    function equalPoint(actual, expected) {
        equal(actual.x, expected.x, "x should be equal");
        equal(actual.y, expected.y, "y should be equal");
    }

    function createLines(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2) {
        var l1 = createLine(sx1, sy1, ex1, ey1);
        var l2 = createLine(sx2, sy2, ex2, ey2);

        return {
            start1: l1.start,
            end1: l1.end,
            start2: l2.start,
            end2: l2.end
        };
    }

    function createLine(sx, sy, ex, ey) {
        return {
            start: new Point(sx, sy),
            end: new Point(ex, ey)
        };
    }

    function noIntersection(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2) {
        var intersection = intersectCoords(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2);
        ok(isUndefined(intersection));
    }

    function intersectCoords(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2) {
        var lines = createLines(sx1,sy1, ex1,ey1, sx2,sy2, ex2,ey2);
        return intersectLines(lines);
    }

    function intersectLines(lines) {
        return Intersect.lines(lines.start1, lines.end1, lines.start2, lines.end2);
    }

    function noSegmentIntersection(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2) {
        var intersection = segmentIntersectCoords(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2);
        ok(isUndefined(intersection));
    }

    function segmentIntersectCoords(sx1, sy1, ex1, ey1, sx2, sy2, ex2, ey2) {
        var lines = createLines(sx1,sy1, ex1,ey1, sx2,sy2, ex2,ey2);
        return segmentIntersectLines(lines);
    }

    function segmentIntersectLines(lines) {
        return Intersect.segments(lines.start1, lines.end1, lines.start2, lines.end2);
    }
})(kendo.jQuery);