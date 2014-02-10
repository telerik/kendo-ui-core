(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(0, 0, 800, 600),
        lineChart,
        root,
        view,
        pointCoordinates;

    function setupLineChart(plotArea, options) {
        view = new ViewStub();

        lineChart = new dataviz.LineChart(plotArea, options);

        root = new dataviz.RootElement();
        root.append(lineChart);

        lineChart.reflow();
        lineChart.getViewElements(view);
        pointCoordinates = mapPoints(view.log.path[0].points);
    }

    function stubPlotArea(getCategorySlot, getValueSlot, options) {
        return new function() {
            this.categoryAxis = this.primaryCategoryAxis = {
                getSlot: getCategorySlot,
                options: {
                    categories: ["A", "B"]
                }
            };

            this.valueAxis = {
                getSlot: getValueSlot,
                options: {}
            };

            this.namedCategoryAxes = {};
            this.namedValueAxes = {};
 
            this.seriesCategoryAxis = function(series) {
                return series.categoryAxis ?
                    this.namedCategoryAxes[series.categoryAxis] : this.primaryCategoryAxis;
            };

            this.options = options;
        };
    }

    (function() {
        var sparseSeries = { data: [1, 2, undefined, 2], style: "step", width: 0 },
            VALUE_AXIS_MAX = 2,
            CATEGORY_AXIS_Y = 2;

        var plotArea = stubPlotArea(
            function(categoryIndex) {
                return new Box2D(categoryIndex, CATEGORY_AXIS_Y,
                                 categoryIndex + 1, CATEGORY_AXIS_Y);
            },
            function(value, b) {
                var value = typeof value === "undefined" ? 0 : value,
                    valueY = VALUE_AXIS_MAX - value,
                    slotTop = Math.min(CATEGORY_AXIS_Y, valueY),
                    slotBottom = Math.max(CATEGORY_AXIS_Y, valueY);

                return new Box2D(0, slotTop, 0, slotBottom);
            }
        );

        // ------------------------------------------------------------
        module("Step Line Chart / Stack / Missing values", {
            setup: function() {
                setupLineChart(plotArea, {
                    series: [ sparseSeries, sparseSeries ],
                    isStacked: true
                });
            }
        });

        test("line is drawn between existing points", function() {
            setupLineChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ],
                isStacked: true
            });

            deepEqual(pointCoordinates, [
                [ 0, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 0 ],
                [ 2, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
                [ 3, 0 ], [ 4, 0 ]
            ]);
        });

        test("line stops before missing value", function() {
            setupLineChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ],
                isStacked: true
            });

            deepEqual(pointCoordinates, [
                [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0]
            ]);
        });

        // ------------------------------------------------------------
        module("Step Line Chart / Rendering / Missing Values", {
            teardown: destroyChart
        });

        test("line stops before missing value", function() {
            setupLineChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ]
            ]);
        });

        test("line continues after missing value", function() {
            setupLineChart(plotArea, {
                series: [{
                    data: [ null, 1, 2 ],
                    width: 0,
                    style: "step"
                }]
            });

            deepEqual(pointCoordinates, [
                [ 1, 1 ], [ 2, 1 ], [ 2, 1 ], [ 2, 0 ], [ 3, 0 ]
            ]);
        });

        test("line is drawn between existing points", function() {
            setupLineChart(plotArea, {
                series: [
                    sparseSeries
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 1 ], [ 1, 1 ], [ 1, 1 ],
                [ 1, 0 ], [ 2, 0 ], [ 1, 0 ],
                [ 2, 0 ], [ 3, 0 ], [ 3, 0 ], [ 4, 0 ]
            ]);
        });

        test("line goes to zero for missing point", function() {
            setupLineChart(plotArea, {
                series: [
                    $.extend({ missingValues: "zero" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 1 ], [ 1, 1 ], [ 1, 0 ],
                [ 2, 0 ], [ 1, 0 ], [ 2, 0 ],
                [ 2, 2 ], [ 3, 2 ], [ 2, 2 ],
                [ 3, 2 ], [ 3, 0 ], [ 4, 0 ]
            ]);
        });
    })();
})();
