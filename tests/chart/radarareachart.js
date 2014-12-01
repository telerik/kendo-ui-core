(function() {
    var dataviz = kendo.dataviz,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        Ring = dataviz.Ring,
        TOLERANCE = 1,
        chartBox = new Box2D(0, 0, 800, 600),
        plotArea,
        chart,
        pointsXY;

    function getSegmentAt(chart, idx) {
        return chart._segments[idx || 0].visual.children[0];
    }

    function createChart(series, options) {
        plotArea = new dataviz.RadarPlotArea(series,
            kendo.deepExtend({
                valueAxis: {
                    majorGridLines: { visible: false },
                    visible: false,
                    startValue: function() {
                        return 0;
                    }
                },
                categoryAxis: {
                    majorGridLines: { visible: false },
                    visible: false
                },
                plotArea: {
                    padding: 35
                }
            }, options)
        );

        chart = plotArea.charts[0];

        plotArea.reflow(chartBox);
        plotArea.renderVisual();
        pointsXY = mapSegments(getSegmentAt(chart).segments);
    }

    // ------------------------------------------------------------
    module("Radar Area Chart / Positive values", {
        setup: function() {
            createChart([{
                type: "radarArea",
                data: [1, 2, 1]
            }]);
        }
    });

    test("point coordinates", function() {
        arrayClose(pointsXY, [
            [400, 168], [630, 433], [285, 366], [400, 168]
        ], TOLERANCE);
    });

    // ------------------------------------------------------------
    module("Radar Area Chart / Positive values / Stacked", {
        setup: function() {
            createChart([{
                type: "radarArea",
                data: [1, 2, 1],
                stack: true
            }, {
                type: "radarArea",
                data: [1, 2, 1]
            }]);
        }
    });

    test("stacked series close around inner series", function() {
        arrayClose(mapSegments(getSegmentAt(chart, 1).segments), [
            [400, 168], [630, 433], [285, 366], [400, 168],
            [400, 234], [343, 333], [515, 366], [400, 234]
        ], TOLERANCE);
    });

    // ------------------------------------------------------------

    (function() {
        module("RadarArea Chart / Values exceeding axis min or max options ", {});

        test("values are limited", 2, function() {
            var plotArea = {
                categoryAxis:  {
                    getSlot: function() {
                         return new Ring(Point2D());
                    },
                    lineBox: function() {
                        return new Box2D(0,2,2,2);
                    },
                    options: {
                        categories: ["A", "B"]
                    }
                },
                valueAxis: {
                    getSlot: function(a,b, limit) {
                        ok(limit);
                        return Box2D();
                    },
                    options: {
                        axisCrossingValue: 0
                    },
                    startValue: function() {
                        return 0;
                    }
                },
                seriesCategoryAxis: function() {
                    return plotArea.categoryAxis;
                }
            };

            var chart = new dataviz.RadarAreaChart(plotArea, {series: [{
                type: "radarArea",
                data: [1,2]
            }]});

            chart.reflow();
        });
    })();
})();
