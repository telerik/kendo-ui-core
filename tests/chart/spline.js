(function() {

    var dataviz = kendo.dataviz,
        draw = kendo.drawing,
        Point = kendo.geometry.Point,
        Box2D = dataviz.Box2D,
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
        linePoints = [new Point(1, 3), new Point(3, 1), new Point(5, 3)],
        areaPoints = [new Point(1, 3), new Point(5, 3)]
        curvePoints = processor.process(linePoints),
        areaPath =  new draw.Path(),
        curvePath = new draw.Path(),
        seriesData = [1,3,5];

    curvePath.segments.elements(curvePoints);
    areaPath.segments.elements(curvePoints.concat([new draw.Segment([5, 3]), new draw.Segment([1, 3])]));

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

    test("cubic curve is created for a SplineSegment", function() {
        var segment = LineChart.fn.createSegment(linePoints, {data: seriesData, style: SMOOTH}, 0);

        segment.renderVisual();
        closePaths(segment.visual, curvePath);
    });


    //-------------------------------------------------------------------------------------
    var areaOptions = {
        invertAxes: false,
        isStacked: false
    };
    function createAreaSegment(options) {
        var segment = AreaChart.fn.createSegment.apply({
            options: options
        }, Array.prototype.slice.call(arguments, 1));
        segment.parent = {
            plotArea: {
                seriesCategoryAxis: function() {
                    return {
                        lineBox: function() {
                            return new Box2D(1, 3, 5, 3);
                        }
                    };
                }
            },

            seriesValueAxis: function() {
                return {
                    lineBox: function() {
                        return new Box2D(1, 1, 1, 3);
                    }
                };
            },
            options: {},
            appendVisual: $.noop
        };
        return segment;
    }

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

    test("cubic curve with area points is created for a SplineAreaSegment", function() {
        var segment = createAreaSegment(areaOptions, linePoints, {data: seriesData, line: {style: SMOOTH}}, 0);

        segment.renderVisual();
        closePaths(segment.visual.children[0], areaPath);
    });

    test("one curve with area points and one without area points are created for a SplineAreaSegment when the line width is set", function() {
        var segment = createAreaSegment(areaOptions, linePoints, {data: seriesData, line: {style: SMOOTH, width: 1}}, 0);

        segment.renderVisual();
        closePaths(segment.visual.children[0], areaPath);
        closePaths(segment.visual.children[1], curvePath);
    });

    test("cubic curve includes previous curve points when the area chart is stacked", function() {

        var segment = createAreaSegment(areaOptions, linePoints, {data: seriesData, line: {style: SMOOTH}}, 0);
        var stackedLinePoints = [new Point(1, 2), new Point(3, 4), new Point(5, 6)];
        var stackedSegment = createAreaSegment({
                isStacked: true
            }, stackedLinePoints, {data: [2, 3, 6], line: {style: SMOOTH}}, 1, segment);
        var expectedPath = new draw.Path();
        expectedPath.segments.elements([
            new draw.Segment([1,2], undefined, [1.666,2.666]),
            new draw.Segment([3,4], [2.334,3.334], [3.666,4.666]),
            new draw.Segment([5,6], [4.334,5.334]),
            new draw.Segment([5,3], [5,3], [5,6]),
            new draw.Segment([5,3], undefined, [4.334,2.334]),
            new draw.Segment([3,1], [3.666,1], [2.334,1]),
            new draw.Segment([1,3], [1.666,2.334]),
            new draw.Segment([1,2], [1,2], [1,3]),
            new draw.Segment([5,3]),
            new draw.Segment([1,3])
            ]);
        stackedSegment.renderVisual();
        closePaths(stackedSegment.visual.children[0], expectedPath);
    });

    //-------------------------------------------------------------------------------------

    function createRadarAreaSegment() {
        var segment = RadarAreaChart.fn.createSegment.apply(RadarAreaChart.fn, arguments);
        segment.parent = {
            plotArea: {
                seriesCategoryAxis: function() {
                    return {
                        lineBox: function() {
                            return new Box2D(1, 3, 5, 3);
                        }
                    };
                }
            },

            seriesValueAxis: function() {
                return {
                    lineBox: function() {
                        return new Box2D(1, 1, 1, 3);
                    }
                };
            },
            options: {},
            appendVisual: $.noop
        };
        return segment;
    }
    
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
        var segment = createRadarAreaSegment(linePoints, {data: seriesData, line: {style: SMOOTH}}, 0),
            closedCurve = closedCurveProcessor.process(linePoints),
            closedPath = new draw.Path();
            
        closedPath.segments.elements(closedCurve.concat([new draw.Segment([1,3]), new draw.Segment([1,3])]));
        segment.renderVisual();
        closePaths(segment.visual.children[0], closedPath);
    });

    test("SplinePolarAreaSegment is created for a radar area chart when the line style is set to smooth", function() {
        var segment = PolarAreaChart.fn.createSegment([], {data: [], line: {style: SMOOTH}}, 0);
        ok(segment instanceof SplinePolarAreaSegment);
    });
})();
