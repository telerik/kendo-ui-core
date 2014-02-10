(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        categoriesCount = dataviz.categoriesCount,
        chartBox = new Box2D(0, 0, 800, 600),
        areaChart,
        root,
        view,
        pointCoordinates,
        TOLERANCE = 1;

    function setupStepAreaChart(plotArea, options) {
        view = new ViewStub();

        areaChart = new dataviz.AreaChart(plotArea, options);

        root = new dataviz.RootElement();
        root.append(areaChart);

        areaChart.reflow();
        areaChart.getViewElements(view);
        pointCoordinates = mapPoints(view.log.path[0].points);
    }

    function stubPlotArea(getCategorySlot, getValueSlot, options) {
        return new function() {
            this.categoryAxis = this.primaryCategoryAxis = {
                getSlot: getCategorySlot,
                lineBox: function() {
                    return new Box2D(0,2,2,2);
                },
                options: {
                    categories: ["A", "B"]
                }
            };

            this.valueAxis = {
                getSlot: getValueSlot,
                lineBox: function() {
                    return new Box2D(0,0,0,2);
                },
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
        var positiveSeries = { data: [1, 2], labels: {}, line: { style: "step" } },
            negativeSeries = { data: [-1, -2], labels: {}, line: { style: "step" } },
            sparseSeries = { data: [1, 2, undefined, 2], line: { style: "step" } },
            VALUE_AXIS_MAX = 2,
            CATEGORY_AXIS_Y = 2;

        var plotArea = stubPlotArea(
            function(categoryIndex) {
                return new Box2D(categoryIndex, CATEGORY_AXIS_Y,
                                 categoryIndex + 1, CATEGORY_AXIS_Y);
            },
            function(value) {
                var value = typeof value === "undefined" ? 0 : value,
                    valueY = VALUE_AXIS_MAX - value,
                    slotTop = Math.min(CATEGORY_AXIS_Y, valueY),
                    slotBottom = Math.max(CATEGORY_AXIS_Y, valueY);

                return new Box2D(0, slotTop, 0, slotBottom);
            }
        );

        // ------------------------------------------------------------
        module("Step Area Chart / Stack / Missing values", {
            setup: function() {
                sparseSeries.line = { width: 0, style: "step" };
                setupStepAreaChart(plotArea, {
                    series: [ sparseSeries, sparseSeries ],
                    isStacked: true
                });
            },
            teardown: destroyChart
        });

        test("line is drawn between existing points when interpolating", function() {
            setupStepAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ],
                isStacked: true
            });

            deepEqual(pointCoordinates, [
                [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ],
                [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 2 ]
            ]);
        });

        // ------------------------------------------------------------
        module("Step Area Chart / Rendering / Missing Values", {
            setup: function() {
                sparseSeries.line = { width: 0, style: "step" };
            },
            teardown: destroyChart
        });

        test("area stops before missing value", function() {
            setupStepAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 2 ], [ 0, 1 ], [ 1, 1 ],
                [ 1, 0 ], [ 2, 0 ], [ 2, 2 ]
            ]);
        });

        test("area continues after missing value", function() {
            setupStepAreaChart(plotArea, {
                series: [{
                    missingValues: "gap",
                    data: [ null, 1, 2 ],
                    line: { width: 0, style: "step" }
                }]
            });

            deepEqual(pointCoordinates, [
                [ 1, 2 ], [ 1, 1 ], [ 2, 1 ],
                [ 2, 0 ], [ 3, 0 ], [ 3, 2 ]
            ]);
        });

        test("area is drawn between existing points", function() {
            setupStepAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 1 ],
                [ 1, 0 ], [ 2, 0 ], [ 1, 0 ], [ 2, 0 ],
                [ 3, 0 ], [ 3, 0 ], [ 4, 0 ], [ 4, 2 ]
            ]);
        });

        test("area goes to zero for missing point", function() {
            setupStepAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "zero" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0, 2 ], [ 0, 1 ], [ 1, 1 ], [ 1, 0 ], [ 2, 0 ], [ 1, 0 ], [ 2, 0 ],
                [ 2, 2 ], [ 3, 2 ], [ 2, 2 ], [ 3, 2 ], [ 3, 0 ], [ 4, 0 ], [ 4, 2 ]
            ]);
        });

    })();
})();
