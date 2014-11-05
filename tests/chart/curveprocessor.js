(function() {

    var kendo = window.kendo,
        draw = kendo.drawing,
        dataviz = kendo.dataviz,
        Point = kendo.geometry.Point,
        CurveProcessor = dataviz.CurveProcessor,
        EXTREMUM_ALLOWED_DEVIATION = 0.01;
        processor = new CurveProcessor(false),
        closedPointsProcessor = new CurveProcessor(true),
        TOLERANCE = 1e-3,
        COORD_PRECISION = 3,
        round = kendo.dataviz.round;

    module("curveprocessor / monotonic", {
    });

    test("ascending points are correctly detected", function() {
        var p0 = new Point(1,2),
            p1 = new Point(1.1, 3),
            p2 = new Point(4, 3.1),
            monotonicByX = processor.isMonotonicByField(p0,p1,p2, "x"),
            monotonicByY = processor.isMonotonicByField(p0,p1,p2, "y");
        ok(monotonicByX && monotonicByY);
    });

    test("descending points are correctly detected", function() {
        var p0 = new Point(4, 3),
            p1 = new Point(1.1, 2),
            p2 = new Point(1, 1.99),
            monotonicByX = processor.isMonotonicByField(p0,p1,p2, "x"),
            monotonicByY = processor.isMonotonicByField(p0,p1,p2, "y");
        ok(monotonicByX && monotonicByY);
    });

    test("points with equal values are not monotonic", function() {
        var p0 = new Point(4, 3),
            p1 = new Point(4, 2),
            p2 = new Point(1, 2),
            monotonicByX = processor.isMonotonicByField(p0,p1,p2, "x"),
            monotonicByY = processor.isMonotonicByField(p0,p1,p2, "y");
        ok(!(monotonicByX || monotonicByY));
    });

    module("curveprocessor / orientation", {
    });

    test("the axis are not inverted for ascending by X points", function() {
        var p0 = new Point(1,2),
            p1 = new Point(1.1, 3),
            p2 = new Point(4, 3);
        ok(!processor.invertAxis(p0,p1,p2));
    });

    test("the axis are not inverted for descending by X points", function() {
        var p0 = new Point(4,2),
            p1 = new Point(1.1, 3),
            p2 = new Point(1, 3);

        ok(!processor.invertAxis(p0,p1,p2));
    });

    test("the axis are inverted for descending by y points when the third point is below the line determined by the first two", function() {
        var p0 = new Point(4, 3),
            p1 = new Point(6, 2),
            p2 = new Point(4, 1)
        ok(processor.invertAxis(p0,p1,p2));
    });

    test("the axis are inverted for ascending by y points when the third point is above the line determined by the first two", function() {
        var p0 = new Point(4, 2),
            p1 = new Point(6, 3),
            p2 = new Point(4, 4);

        ok(processor.invertAxis(p0,p1,p2));
    });

    test("the axis are not inverted when the third point is below the line determined by the first two", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 3),
            p2 = new Point(2.5, 2);
        ok(!processor.invertAxis(p0,p1,p2));
    });

    test("the axis are not inverted when the third point is above the line determined by the first two", function() {
        var p0 = new Point(3, 3),
            p1 = new Point(1, 1),
            p2 = new Point(1.5, 2);

        ok(!processor.invertAxis(p0,p1,p2));
    });

    test("the axis are inverted for descending by y points when the first two points have equal x value", function() {
        var p0 = new Point(2, 5),
            p1 = new Point(2, 4),
            p2 = new Point(4, 3);

        ok(processor.invertAxis(p0,p1,p2));
    });


    test("the axis are inverted for ascending by y points when the first two points have equal x value", function() {
        var p0 = new Point(2, 2),
            p1 = new Point(2, 3),
            p2 = new Point(4, 4);

        ok(processor.invertAxis(p0,p1,p2));
    });

    test("the axis are not inverted when the points are on the same line", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 3),
            p2 = new Point(4, 4);

        ok(!processor.invertAxis(p0,p1,p2));
    });

    module("curveprocessor / isLine", {
    });

    test("monotonic points on the same line are detected", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 3),
            p2 = new Point(4, 4),
            result = processor.isLine(p0,p1,p2);
        ok(result);
    });

    test("points on the same line are detected when the third point is before the second point", function() {
        var p0 = new Point(2, 2),
            p1 = new Point(4, 4),
            p2 = new Point(1, 1),
            result = processor.isLine(p0,p1,p2);
        ok(result);
    });

    test("points on the same line are detected for a vertical line", function() {
        var p0 = new Point(1, 5),
            p1 = new Point(1, 4),
            p2 = new Point(1, 1),
            result = processor.isLine(p0,p1,p2);
        ok(result);
    });

    test("points on the same line are detected for a vertical line when the third point is before the second point", function() {
        var p0 = new Point(1, 5),
            p1 = new Point(1, 1),
            p2 = new Point(1, 4),
            result = processor.isLine(p0,p1,p2);
        ok(result);
    });

    module("curveprocessor / tangent", {
    });

    test("tangent is correctly calculated", function() {
        var p0 = new Point(1, 5),
            p1 = new Point(3, 4),
            result = processor.tangent(p0,p1, "x", "y");
        equal(result, -1 / 2);
    });

    test("tangent is correctly calculated for inverted axis", function() {
        var p0 = new Point(1, 5),
            p1 = new Point(3, 4),
            result = processor.tangent(p0,p1, "y", "x");
        equal(result, -2);
    });

    test("tangent is 0 for equal by x points", function() {
        var p0 = new Point(1, 5),
            p1 = new Point(1, 4),
            result = processor.tangent(p0,p1, "x", "y");
        equal(result, 0);
    });

    module("curveprocessor / control points / calculation", {
    });

    test("first control point is correctly calculated", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(2, 4),
            tangent = 1.5,
            expectedX = 1.333,
            expectedY = 3.5,
            controlPoint = processor.firstControlPoint(tangent, p0,p1, "x", "y");
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("first control point is correctly calculated for inverted axis", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(4, 2),
            tangent = 1.5,
            expectedY = 1.333,
            expectedX = 3.5,
            controlPoint = processor.firstControlPoint(tangent, p0,p1, "y", "x");
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("second control point is correctly calculated", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(2, 5),
            tangent = 1.5,
            expectedX = 1.667,
            expectedY = 4.501,
            controlPoint = processor.secondControlPoint(tangent, p0,p1, "x", "y");
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("second control point is correctly calculated for inverted axis", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(5, 2),
            tangent = 1.5,
            expectedY = 1.667,
            expectedX = 4.501,
            controlPoint = processor.secondControlPoint(tangent, p0,p1, "y", "x");
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    module("curveprocessor / control points / restrict", {
    });

    test("first control point is restricted for ascending by y points when its y value is higher than the y value of the last point", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(1.1, 3),
            p2 = new Point(3, 3.1),
            tangent = 1.05,
            expectedY = 3.1,
            expectedX = 1.195,
            controlPoint = processor.firstControlPoint(tangent, p1, p2, "x", "y");

        processor.restrictControlPoint(p1,p2, controlPoint, tangent)
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("first control point is restricted for ascending by y descending by x points when its y value is higher than the y value of the last point", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(2.9, 3),
            p2 = new Point(1, 3.1),
            tangent = -1.05,
            expectedY = 3.1,
            expectedX = 2.805,
            controlPoint = processor.firstControlPoint(tangent, p1, p2, "x", "y");

        processor.restrictControlPoint(p1,p2, controlPoint, tangent)
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("second control point is restricted for ascending by y points when its y value is lower than the y value of the first point", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 1.1),
            p2 = new Point(3.1, 3),
            tangent = 0.9523809523809523,
            expectedY = 1,
            expectedX = 2.895,
            controlPoint = processor.secondControlPoint(tangent, p0, p1, "x", "y");

        processor.restrictControlPoint(p0,p1, controlPoint, tangent)
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("second control point is restricted for ascending by y descending by x points when its y value is lower than the y value of the first point", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(1, 1.1),
            p2 = new Point(0.9, 3),
            tangent = -0.9523809523809523,
            expectedY = 1,
            expectedX = 1.105,
            controlPoint = processor.secondControlPoint(tangent, p0, p1, "x", "y");

        processor.restrictControlPoint(p0,p1, controlPoint, tangent)
        equal(controlPoint.x, expectedX, "correct X");
        equal(controlPoint.y, expectedY, "correct Y");
    });

    test("first control point is restricted for descending by y points when its y value is lower than the y value of the last point", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(1.1, 1),
            p2 = new Point(3, 0.9),
            tangent = -1.05,
            expectedY = 0.9,
            expectedX = 1.195,
            controlPoint = processor.firstControlPoint(tangent, p1, p2, "x", "y");

        processor.restrictControlPoint(p1,p2, controlPoint, tangent)
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("first control point is restricted for descending by y descending by x points when its y value is lower than the y value of the last point", function() {
        var p0 = new Point(3, 3),
            p1 = new Point(2.9, 1),
            p2 = new Point(1, 0.9),
            tangent = 1.05,
            expectedY = 0.9,
            expectedX = 2.805,
            controlPoint = processor.firstControlPoint(tangent, p1, p2, "x", "y");

        processor.restrictControlPoint(p1,p2, controlPoint, tangent)
        close(controlPoint.x, expectedX, TOLERANCE);
        close(controlPoint.y, expectedY, TOLERANCE);
    });

    test("second control point is restricted for descending by y points when its y value is higher than the y value of the first point", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(3, 2.9),
            p2 = new Point(3.1, 1),
            tangent = -0.9523809523809523,
            expectedY = 3,
            expectedX = 2.895,
            controlPoint = processor.secondControlPoint(tangent, p0, p1, "x", "y");

        processor.restrictControlPoint(p0,p1, controlPoint, tangent)
        equal(controlPoint.x, expectedX, "correct X");
        equal(controlPoint.y, expectedY, "correct Y");
    });

    test("second control point is restricted for descending by y descending by xpoints when its y value is higher than the y value of the first point", function() {
        var p0 = new Point(3, 3),
            p1 = new Point(1, 2.9),
            p2 = new Point(0.9, 1),
            tangent = 0.9523809523809523,
            expectedY = 3,
            expectedX = 1.105,
            controlPoint = processor.secondControlPoint(tangent, p0, p1, "x", "y");

        processor.restrictControlPoint(p0,p1, controlPoint, tangent)
        equal(controlPoint.x, expectedX, "correct X");
        equal(controlPoint.y, expectedY, "correct Y");
    });

    module("curveprocessor / control points / line", {
    });

    test("control points lie on the the data points line", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(2, 2),
            p2 = new Point(3, 3),
            cp1 = new Point(1.667, 1.667),
            cp2 = new Point(2.333,2.333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points lie on the the data points line for vertical line", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(1, 2),
            p2 = new Point(1, 3),
            cp1 = new Point(1, 2),
            cp2 = new Point(1, 2),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    module("curveprocessor / control points / monotonic", {
    });

    test("control points lie on the line parallel to the end data points line", function() {
        var p0 = new Point(3, 4),
            p1 = new Point(5, 6),
            p2 = new Point(7, 9),
            cp1 = new Point(4.334, 5.1675),
            cp2 = new Point(5.666, 6.8325),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points lie on the line parallel to the end data points line and are restricted when their y value exceeds the end data points y value", function() {
        var p0 = new Point(3, 3),
            p1 = new Point(1, 2.9),
            p2 = new Point(0.9, 1),
            cp1 = new Point(1.105, 3),
            cp2 = new Point(0.9667,  2.8682857142857143),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    module("curveprocessor / control points / extremum", {
    });

    test("control points preserve a high extremum in the middle point for ascending by x points", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 3),
            p2 = new Point(4, 1),
            cp1 = new Point(2.334, 3),
            cp2 = new Point(3.333, 3),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a low extremum in the middle point for ascending by x points", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(3, 1),
            p2 = new Point(4, 3),
            cp1 = new Point(2.334, 1),
            cp2 = new Point(3.333, 1),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a high extremum in the middle point for descending by x points", function() {
        var p0 = new Point(4, 1),
            p1 = new Point(3, 3),
            p2 = new Point(1, 1),
            cp1 = new Point(3.333, 3),
            cp2 = new Point(2.334, 3),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a low extremum in the middle point for descending by x points", function() {
        var p0 = new Point(4, 3),
            p1 = new Point(3, 1),
            p2 = new Point(1, 3),
            cp1 = new Point(3.333, 1),
            cp2 = new Point(2.334, 1),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a high extremum in the middle point for descending by y points", function() {
        var p0 = new Point(1, 4),
            p1 = new Point(3, 3),
            p2 = new Point(1, 1),
            cp1 = new Point(3, 3.333),
            cp2 = new Point(3, 2.334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a low extremum in the middle point for descending by y points", function() {
        var p0 = new Point(3, 4),
            p1 = new Point(1, 3),
            p2 = new Point(3, 1),
            cp1 = new Point(1, 3.333),
            cp2 = new Point(1, 2.334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a high extremum in the middle point for ascending by y points", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 3),
            p2 = new Point(1, 4),
            cp1 = new Point(3, 2.334),
            cp2 = new Point(3, 3.333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("control points preserve a low extremum in the middle point for ascending by y points", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(1, 3),
            p2 = new Point(3, 4),
            cp1 = new Point(1, 2.334),
            cp2 = new Point(1, 3.333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    module("curveprocessor / control points / reverse axis", {
    });

    test("tangent is equal to the allowed error when the first point y value is higher or equal than the second point and lower than the third", function() {
        var p0 = new Point(1, 1),
            p1 = new Point(3, 1),
            p2 = new Point(2, 2),
            cp1 = new Point(2.334, 0.99334),
            cp2 = new Point(3.00333, 1.333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the first point y value is higher or equal than the second point and lower than the third", function() {
        var p0 = new Point(3, 1),
            p1 = new Point(1, 1),
            p2 = new Point(2, 2),
            cp1 = new Point(1.666, 0.99334),
            cp2 = new Point(0.99667, 1.333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the first point y value is lower or equal than the second point and higher than the third", function() {
        var p0 = new Point(1, 3),
            p1 = new Point(3, 3),
            p2 = new Point(2, 2),
            cp1 = new Point(2.334, 3.00666),
            cp2 = new Point(3.00333, 2.667),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the first point y value is lower or equal than the second point and higher than the third", function() {
        var p0 = new Point(3, 3),
            p1 = new Point(1, 3),
            p2 = new Point(2, 2),
            cp1 = new Point(1.666, 3.00666),
            cp2 = new Point(0.99667, 2.667),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the first point x value is higher or equal than the second point and lower than the third", function() {
        var p0 = new Point(2, 1),
            p1 = new Point(2, 3),
            p2 = new Point(3, 2),
            cp1 = new Point(1.99334, 2.334),
            cp2 = new Point(2.333, 3.00333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the first point x value is lower or equal than the second point and higher than the third", function() {
        var p0 = new Point(2, 1),
            p1 = new Point(2, 3),
            p2 = new Point(1, 2),
            cp1 = new Point(2.00666, 2.334),
            cp2 = new Point(1.667, 3.00333),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the first point x value is lower or equal than the second point and higher than the third", function() {
        var p0 = new Point(2, 3),
            p1 = new Point(2, 1),
            p2 = new Point(1, 2),
            cp1 = new Point(2.00666, 1.666),
            cp2 = new Point(1.667, 0.99667),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the first point x value is higher or equal than the second point and lower than the third", function() {
        var p0 = new Point(2, 3),
            p1 = new Point(2, 1),
            p2 = new Point(3, 2),
            cp1 = new Point(1.99334, 1.666),
            cp2 = new Point(2.333, 0.99667),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the third point y value is lower or equal than the second point and higher than the first", function() {
        var p0 = new Point(2, 1),
            p1 = new Point(3, 3),
            p2 = new Point(1, 3),
            cp1 = new Point(3.00666, 2.334),
            cp2 = new Point(2.334, 3.00666),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the third point y value is lower or equal than the second point and higher than the first", function() {
        var p0 = new Point(2, 1),
            p1 = new Point(1, 3),
            p2 = new Point(3, 3),
            cp1 = new Point(0.99334, 2.334),
            cp2 = new Point(1.666, 3.00666),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the third point y value is higher or equal than the second point and lower than the first", function() {
        var p0 = new Point(2, 3),
            p1 = new Point(1, 2),
            p2 = new Point(3, 2),
            cp1 = new Point(0.99667, 2.333),
            cp2 = new Point(1.666, 1.99334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the third point y value is higher or equal than the second point and lower than the first", function() {
        var p0 = new Point(2, 3),
            p1 = new Point(3, 2),
            p2 = new Point(1, 2),
            cp1 = new Point(3.00333, 2.333),
            cp2 = new Point(2.334, 1.99334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the third point x value is lower or equal than the second point and higher than the first", function() {
        var p0 = new Point(1, 2),
            p1 = new Point(3, 1),
            p2 = new Point(2, 3),
            cp1 = new Point(2.334, 0.99334),
            cp2 = new Point(3.00666, 1.666),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the third point x value is higher or equal than the second point and lower than the first", function() {
        var p0 = new Point(3, 2),
            p1 = new Point(2, 1),
            p2 = new Point(2, 3),
            cp1 = new Point(2.333, 0.99667),
            cp2 = new Point(1.99334, 1.666),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the negative allowed error when the third point x value is lower or equal than the second point and higher than the first", function() {
        var p0 = new Point(1, 2),
            p1 = new Point(2, 3),
            p2 = new Point(2, 1),
            cp1 = new Point(1.667, 3.00333),
            cp2 = new Point(2.00666, 2.334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    test("tangent is equal to the allowed error when the third point x value is higher or equal than the second point and lower than the first", function() {
        var p0 = new Point(3, 2),
            p1 = new Point(2, 3),
            p2 = new Point(2, 1),
            cp1 = new Point(2.333, 3.00333),
            cp2 = new Point(1.99334, 2.334),
            controlPoints = processor.controlPoints(p0, p1, p2);

        equal(controlPoints[0].x, cp1.x, "correct second control point X");
        equal(controlPoints[0].y, cp1.y, "correct second control point Y");
        equal(controlPoints[1].x, cp2.x, "correct first control point X");
        equal(controlPoints[1].y, cp2.y, "correct first control point Y");
    });

    module("curveprocessor / process", {
    });

    function closePoints(a, b) {
        return (a.x - b.x < TOLERANCE) && (a.y - b.y < TOLERANCE)
    }

    function equalSegmentPoints(segments, points) {
        var segment, point, areEqual = true;
        for (var idx = 0, pointIdx = 0; idx < segments.length; idx++) {
            segment = segments[idx];
            if (segment.controlIn()) {
                areEqual = areEqual && closePoints(segment.controlIn(), points[pointIdx++]);
            }
            areEqual = areEqual && closePoints(segment.anchor(), points[pointIdx++]);
            if (segment.controlOut()) {
                areEqual = areEqual && closePoints(segment.controlOut(), points[pointIdx++]);
            }
        }
        return areEqual;
    }

    test("empty array is returned for zero data points", function() {
        var dataPoints = [],
            curvePoints = processor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("empty array is returned for one data points", function() {
        var dataPoints = [new Point(1,1)],
            curvePoints = processor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("duplicate points are not calculated", function() {
        var dataPoints = [new Point(7, 9), new Point(7, 9), new Point(5,6), new Point(5,6), new Point(5,6), new Point(3,4), new Point(3,4)],
            expectedPoints = [new Point(7, 9), new Point(6.334, 8.001), new Point(5.666, 6.8325), new Point(5,6),
                new Point(4.334, 5.1675), new Point(3.666, 4.666), new Point(3,4)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("empty array is returned if 1 point is left after removing duplicated points", function() {
        var dataPoints = [new Point(1,1), new Point(1,1)],
            curvePoints = processor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("tangent line is used if 2 points are left after removing duplicated points", function() {
        var dataPoints = [new Point(1,1), new Point(1,1), new Point(3,3)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("four points are returned lying on the tangent line for two data points", function() {
        var dataPoints = [new Point(1,1), new Point(3,3)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("curve starts and ends with the tangent line between the points", function() {
        var dataPoints = [new Point(1,1), new Point(2,1), new Point(4,2), new Point(3,3)],
            exprectedFirstControlPoint = new Point(1.333, 1),
            exprectedLastControlPoint = new Point(3.333, 2.667),
            curvePoints = processor.process(dataPoints);

        ok(closePoints(curvePoints[0].controlOut(), exprectedFirstControlPoint), "correct first control point");
        ok(closePoints(curvePoints[1].controlIn(), exprectedLastControlPoint), "correct last control point");
    });

    test("points on the same line are correctly processed", function() {
        var dataPoints = [new Point(1,1), new Point(2,1), new Point(4,1), new Point(3,1)],
            expectedPoints = [new Point(1,1), new Point(1.333,1), new Point(1.667,1), new Point(2,1), new Point(2.666,1),
                new Point(3.334,1), new Point(4,1), new Point(3.667,1), new Point(3.333,1), new Point(3,1)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("points on the same vertical line are correctly processed", function() {
        var dataPoints = [new Point(1,1), new Point(1,2), new Point(1,4), new Point(1,3)],
            expectedPoints = [new Point(1,1), new Point(1, 1), new Point(1, 2), new Point(1,2), new Point(1, 2),
                new Point(1, 4), new Point(1, 4), new Point(1, 4), new Point(1, 3), new Point(1, 3)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("monotonic points are correctly processed", function() {
        var dataPoints = [new Point(7, 9), new Point(5,6), new Point(3,4)],
            expectedPoints = [new Point(7, 9), new Point(6.334, 8.001), new Point(5.666, 6.8325), new Point(5,6),
                new Point(4.334, 5.1675), new Point(3.666, 4.666), new Point(3,4)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("monotonic points with restrictions are correctly processed", function() {
        var dataPoints = [new Point(1, 3), new Point(3, 2.9), new Point(3.1, 1)],
            expectedPoints = [new Point(1, 3), new Point(1.666, 2.967), new Point(2.895, 3), new Point(3, 2.9),
                new Point(3.033, 2.868), new Point(3.067, 1.633), new Point(3.1, 1)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("extremums are correctly processed", function() {
        var dataPoints = [new Point(1, 3), new Point(3, 1), new Point(5, 3)],
            expectedPoints = [new Point(1, 3), new Point(1.666, 2.334), new Point(2.334, 1), new Point(3, 1),
                new Point(3.666, 1), new Point(4.334, 2.334), new Point(5, 3)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("reversed points are correctly processed", function() {
        var dataPoints = [new Point(1, 2), new Point(2, 3), new Point(2, 1)],
            expectedPoints = [new Point(1, 2), new Point(1.333, 2.333), new Point(1.667, 3.00333), new Point(2, 3),
                new Point(2.00666, 2.334), new Point(2, 1), new Point(2, 1)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    module("curveprocessor / process / closed curve", {
    });

    test("empty array is returned for zero points", function() {
        var dataPoints = [],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("empty array is returned for one points", function() {
        var dataPoints = [new Point(1,1)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("duplicate points are not calculated", function() {
        var dataPoints = [new Point(1, 2), new Point(1, 2), new Point(2, 3), new Point(2, 3), new Point(2, 1), new Point(2, 1), new Point(2, 1)],
            expectedPoints = [new Point(1, 2), new Point(1, 2.333), new Point(1.667, 3.003), new Point(2, 3),
                new Point(2.007, 2.334), new Point(2.007, 1.666), new Point(2, 1), new Point(1.667, 0.997), new Point(1, 1.667), new Point(1, 2)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("empty array is returned if 1 point is left after removing duplicated points", function() {
        var dataPoints = [new Point(1,1), new Point(1,1)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(curvePoints && curvePoints.length === 0);
    });

    test("tangent line is used if 2 points are left after removing duplicated points", function() {
        var dataPoints = [new Point(1,1), new Point(1,1), new Point(3,3)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("two points are not closed", function() {
        var dataPoints = [new Point(1,1), new Point(3,3)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("the end points are used to determine the start and end control points and to close the curve", function() {
        var dataPoints = [new Point(1, 2), new Point(2, 3), new Point(2, 1)],
            expectedPoints = [new Point(1, 2), new Point(1, 2.333), new Point(1.667, 3.003), new Point(2, 3),
                new Point(2.007, 2.334), new Point(2.007, 1.666), new Point(2, 1), new Point(1.667, 0.997), new Point(1, 1.667), new Point(1, 2)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("the curve is closed if the first point is equal to the last point", function() {
        var dataPoints = [new Point(1, 2), new Point(2, 3), new Point(2, 1), new Point(1, 2)],
            expectedPoints = [new Point(1, 2), new Point(1, 2.333), new Point(1.667, 3.003), new Point(2, 3),
                new Point(2.007, 2.334), new Point(2.007, 1.666), new Point(2, 1), new Point(1.667, 0.997), new Point(1, 1.667), new Point(1, 2)],
            curvePoints = processor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("the curve is not closed for 3 points if the first point is equal to the last point", function() {
        var dataPoints = [new Point(1,1), new Point(3,3), new Point(1,1)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

    test("the curve is not closed if there are less than 3 points after removing the last points", function() {
        var dataPoints = [new Point(1,1), new Point(3,3), new Point(1,1), new Point(1,1)],
            expectedPoints = [new Point(1,1), new Point(1.666,1.666), new Point(2.334,2.334), new Point(3,3)],
            curvePoints = closedPointsProcessor.process(dataPoints);

        ok(equalSegmentPoints(curvePoints, expectedPoints));
    });

})();
