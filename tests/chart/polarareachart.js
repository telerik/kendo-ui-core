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
        plotArea = new dataviz.PolarPlotArea(series,
            kendo.deepExtend({
                xAxis: {
                    majorGridLines: { visible: false },
                    visible: false
                },
                yAxis: {
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
    module("Polar Area Chart / Positive values", {
        setup: function() {
            createChart([{
                type: "polarArea",
                data: [[45, 1], [60, 2], [75, 1]]
            }]);
        }
    });

    test("starts and ends on plot center", function() {
        arrayClose(pointsXY[0], [400, 300]);
        arrayClose(pointsXY[4], [400, 300]);
    });

    test("points are ordered by angular position", function() {
        createChart([{
            type: "polarArea",
            data: [[60, 2], [45, 1], [75, 1]]
        }]);

        arrayClose(pointsXY.slice(1, 4), [
            [494, 206], [533, 71], [434, 172]
        ], TOLERANCE);
    });
    
    // ------------------------------------------------------------
                           
    (function() {      
        module("PolarArea Chart / Values exceeding axis min or max options ", {});

        test("values are limited", 1, function() {
            var plotArea = {
                axisX: {
                    getSlot: function(a,b,limit) {   
                        return new Ring(Point2D());
                    }
                },
                axisY: {
                    getSlot: function(a,b, limit) {
                        ok(limit);
                        return Box2D();
                    }
                }
            };

            var chart = new dataviz.PolarAreaChart(plotArea, {series: [{
                type: "polarArea",
                data: [[45, 1]]
            }]});          
            
            chart.reflow();            
        });          
    })();    
})();
