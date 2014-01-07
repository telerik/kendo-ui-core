(function() {
    var dataviz = kendo.dataviz,
        getElement = dataviz.getElement,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        Ring = dataviz.Ring,
        TOLERANCE = 1,
        chartBox = new Box2D(0, 0, 800, 600),
        view,
        plotArea,
        chart,
        pointsXY;


    function createChart(series, options) {
        view = new ViewStub();
        plotArea = new dataviz.RadarPlotArea(series,
            kendo.deepExtend({
                valueAxis: {
                    majorGridLines: { visible: false },
                    visible: false
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
        plotArea.getViewElements(view);
        pointsXY = mapPoints(view.log.path[0].points);
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
        arrayClose(mapPoints(view.log.path[1].points), [
            [400, 168], [630, 433], [285, 366], [400, 168],
            [400, 234], [343, 333], [515, 366], [400, 234]
        ], TOLERANCE);
    });
})();
