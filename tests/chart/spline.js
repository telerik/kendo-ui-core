(function() {
    var dataviz = kendo.dataviz,
        Point = dataviz.Point2D,
        CurveProcessor = dataviz.CurveProcessor,
        processor = new CurveProcessor(false),
        closedCurveProcessor = new CurveProcessor(true),
        AreaChart = dataviz.AreaChart,
        LineChart = dataviz.LineChart,
        LineSegment = dataviz.LineSegment,
        ScatterLineChart = dataviz.ScatterLineChart,
        RadarAreaChart = dataviz.RadarAreaChart,
        SplineRadarAreaSegment = dataviz.SplineRadarAreaSegment,
        RadarLineChart = dataviz.RadarLineChart,
        PolarAreaChart = dataviz.PolarAreaChart,
        PolarLineChart = dataviz.PolarLineChart,
        SplineSegment = dataviz.SplineSegment,
        SplineAreaSegment = dataviz.SplineAreaSegment,
        SplinePolarAreaChart = dataviz.SplinePolarAreaChart,
        SplinePolarAreaSegment = dataviz.SplinePolarAreaSegment,
        SMOOTH = "smooth",
        linePoints = [Point(1, 3), Point(3, 1), Point(5, 3)],
        areaPoints = [Point(1, 3), Point(5, 3)]
        curvePoints = processor.process(linePoints),
        seriesData = [1,3,5];

    function MethodMocker(){
        this._original = {};
    }

    MethodMocker.prototype = {
        mock: function(fn, fnName, callback, replace){
            var that = this;
            that._original[fnName] = fn[fnName];
            fn[fnName] = function(){
                if(replace){
                    return  callback.apply(this, arguments);
                }
                callback.apply(this, arguments);
                return that._original[fnName].apply(this, arguments);
            };
        },
        restore: function(fn,fnName){
            fn[fnName] = this._original[fnName];
            delete this._original[fnName];
        }
    };
    var methodMocker = new MethodMocker();

    module("LineChart smooth", {
        setup: function() {
            methodMocker.mock(LineSegment.fn, "points", function(){
                return this.linePoints;
            }, true);
        },
        teardown: function() {
            methodMocker.restore(LineSegment.fn, "points");
        }
    });

    test("SplineSegment is created for a line chart when the style is set to smooth", function() {
        var segment = LineChart.fn.createSegment([], {data: [], style: SMOOTH}, 0);
        ok(segment instanceof SplineSegment);
    });

    test("SplineSegment is created for a scatter line chart when the style is set to smooth", function() {
        var segment = ScatterLineChart.fn.createSegment([], {data: [], style: SMOOTH}, 0);
        ok(segment instanceof SplineSegment);
    });

    test("SplineSegment is created for a radar line chart when the style is set to smooth", function() {
        var segment = RadarLineChart.fn.createSegment([], {data: [], style: SMOOTH}, 0);
        ok(segment instanceof SplineSegment);
    });

    test("SplineSegment is created for a polar line chart when the style is set to smooth", function() {
        var segment = PolarLineChart.fn.createSegment([], {data: [], style: SMOOTH}, 0);
        ok(segment instanceof SplineSegment);
    });

    test("control points are added for a SplineSegment", function() {
        var segment = LineChart.fn.createSegment(linePoints, {data: seriesData, style: SMOOTH}, 0);
        deepEqual(segment.points(), curvePoints);
    });

    test("cubic curve is created for a SplineSegment", function() {
        var view = new ViewStub(),
            segment = LineChart.fn.createSegment(linePoints, {data: seriesData, style: SMOOTH}, 0);

        segment.getViewElements(view);
        deepEqual(view.log.cubicCurve[0].points, curvePoints, "curve points are passed");
        ok(!view.log.cubicCurve[0].areaPoints, "no area points are passed");
    });

    module("area chart smooth", {
        setup: function() {
            methodMocker.mock(LineSegment.fn, "points", function(){
                return this.linePoints;
            }, true);
            methodMocker.mock(SplineAreaSegment.fn, "areaPoints", function(points){
                if (this.isStacked) {
                    return [];
                }
                return [points[0], points[points.length - 1]];
            }, true);
        },
        teardown: function() {
            methodMocker.restore(LineSegment.fn, "points");
            methodMocker.restore(SplineAreaSegment.fn, "areaPoints");
        }
    });

    test("SplineAreaSegment is created for an area chart when the line style is set to smooth", function() {
        var segment = AreaChart.fn.createSegment([], {data: [], line: {style: SMOOTH}}, 0);
        ok(segment instanceof SplineAreaSegment);
    });

    test("control points are added for a SplineAreaSegment", function() {
        var segment = AreaChart.fn.createSegment(linePoints, {data: seriesData, line: {style: SMOOTH}}, 0);
        deepEqual(segment.points(), curvePoints);
    });

    test("cubic curve with area points is created for a SplineAreaSegment", function() {
        var view = new ViewStub(),
            segment = AreaChart.fn.createSegment(linePoints, {data: seriesData, line: {style: SMOOTH}}, 0);

        segment.getViewElements(view);
        deepEqual(view.log.cubicCurve[0].points, curvePoints, "curve points are passed");
        deepEqual(view.log.cubicCurve[0].areaPoints, areaPoints, "area points are passed");
    });

    test("one curve with area points and one without area points are created for a SplineAreaSegment when the line width is set", function() {
        var view = new ViewStub(),
            segment = AreaChart.fn.createSegment(linePoints, {data: seriesData, line: {style: SMOOTH, width: 1}}, 0);

        segment.getViewElements(view);
        deepEqual(view.log.cubicCurve[0].points, curvePoints, "curve area points are passed");
        deepEqual(view.log.cubicCurve[0].areaPoints, areaPoints, "area points are passed");
        deepEqual(view.log.cubicCurve[1].points, curvePoints, "curve points are passed");
    });

    test("cubic curve includes previous curve points when the area chart is stacked", function() {
        var view = new ViewStub(),
            segment = AreaChart.fn.createSegment(linePoints, {data: seriesData, line: {style: SMOOTH}}, 0),
            stackedLinePoints = [Point(1, 2), Point(3, 4), Point(5, 6)],
            stackedSegment = AreaChart.fn.createSegment.call({options: {isStacked: true}}, stackedLinePoints, {data: [2, 3, 6], line: {style: SMOOTH}}, 1, segment),
            reversedPoints = curvePoints.slice(0).reverse(),
            stackedCurve = processor.process(stackedLinePoints),
            expectedStackedPoints = stackedCurve;

        expectedStackedPoints.push(stackedCurve[stackedCurve.length - 1], reversedPoints[0]);
        expectedStackedPoints = expectedStackedPoints.concat(reversedPoints);
        expectedStackedPoints.push(reversedPoints[reversedPoints.length - 1], stackedCurve[0], stackedCurve[0]);

        segment.getViewElements(view);
        stackedSegment.getViewElements(view);

        deepEqual(view.log.cubicCurve[0].points, curvePoints, "curve points are passed");
        deepEqual(view.log.cubicCurve[0].areaPoints, areaPoints, "area points are passed");
        deepEqual(view.log.cubicCurve[1].areaPoints, [], "no area points are passed for stacked segment");
        deepEqual(view.log.cubicCurve[1].points, expectedStackedPoints, "stacked curve points are passed");
    });

    module("radar area chart smooth", {
        setup: function() {
            methodMocker.mock(LineSegment.fn, "points", function(){
                return this.linePoints;
            }, true);
        },
        teardown: function() {
            methodMocker.restore(LineSegment.fn, "points");
        }
    });

    test("SplineRadarAreaSegment is created for a radar area chart when the line style is set to smooth", function() {
        var segment = RadarAreaChart.fn.createSegment([], {data: [], line: {style: SMOOTH}}, 0);
        ok(segment instanceof SplineRadarAreaSegment);
    });

    test("a closed curve is created for a spline radar area chart", function() {
        var view = new ViewStub(),
            segment = RadarAreaChart.fn.createSegment(linePoints, {data: seriesData, line: {style: SMOOTH}}, 0),
            closedCurve = closedCurveProcessor.process(linePoints);

        segment.getViewElements(view);

        deepEqual(view.log.cubicCurve[0].points, closedCurve, "curve points are passed");
        deepEqual(view.log.cubicCurve[0].areaPoints, [], "no area points are passed");
    });

    test("SplinePolarAreaSegment is created for a radar area chart when the line style is set to smooth", function() {
        var segment = PolarAreaChart.fn.createSegment([], {data: [], line: {style: SMOOTH}}, 0);
        ok(segment instanceof SplinePolarAreaSegment);
    });

})();
