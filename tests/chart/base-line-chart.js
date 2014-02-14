function baseLineChartTests(seriesName, TChart) {
    var dataviz = kendo.dataviz,
        getElement = dataviz.getElement,
        Box2D = dataviz.Box2D,
        categoriesCount = dataviz.categoriesCount,
        chartBox = new Box2D(0, 0, 800, 600),
        chart,
        root,
        view,
        pointCoordinates,
        TOLERANCE = 1;

    var chartName = seriesName.substring(0, 1).toUpperCase() + seriesName.substring(1, seriesName.length);

    function setupChart(plotArea, options) {
        view = new ViewStub();

        chart = new TChart(plotArea, options);

        root = new dataviz.RootElement();
        root.append(chart);

        chart.reflow();
        chart.getViewElements(view);
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
        var positiveSeries = { data: [1, 2], labels: {} },
            negativeSeries = { data: [-1, -2], labels: {} },
            sparseSeries = { data: [1, 2, undefined, 2], width: 0 },
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
        module(chartName + " / Positive Values", {
            setup: function() {
                setupChart(plotArea, { series: [ positiveSeries ] });
            }
        });

        test("Creates points for data points", function() {
            equal(chart.points.length, positiveSeries.data.length);
        });

        test("Reports minimum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].min, positiveSeries.data[0]);
        });

        test("Reports maximum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].max, positiveSeries.data[1]);
        });

        test("Reports number of categories", function() {
            setupChart(plotArea, {series: [ positiveSeries ]});
            equal(categoriesCount(chart.options.series), positiveSeries.data.length);
        });

        test("points are distributed across category axis", function() {
            var pointsX = $.map(chart.points, function(point) {
                return point.box.x1;
            });

            deepEqual(pointsX, [0, 1]);
        });

        test("points are aligned to category axis", function() {
            var pointsY = $.map(chart.points, function(point) {
                return point.box.y2;
            });

            deepEqual(pointsY, [CATEGORY_AXIS_Y, CATEGORY_AXIS_Y]);
        });

        test("points have set width", function() {
            $.each(chart.points, function() {
                equal(this.box.width(), 1);
            });
        });

        test("points have set height according to value", function() {
            var pointHeights = $.map(chart.points, function(point) {
                return point.box.height();
            });

            deepEqual(pointHeights, [1, 2]);
        });

        test("getNearestPoint returns nearest series point", function() {
            var point = chart.points[1],
                result = chart.getNearestPoint(point.box.x2 + 100, point.box.y2, 0);

            ok(result === point);
        });

        test("sets point owner", function() {
            ok(chart.points[0].owner === chart);
        });

        test("sets point series", function() {
            ok(chart.points[0].series === positiveSeries);
        });

        test("sets point series index", function() {
            ok(chart.points[0].seriesIx === 0);
        });

        test("sets point category", function() {
            equal(chart.points[0].category, "A");
        });

        test("sets point dataItem", function() {
            equal(typeof chart.points[0].dataItem, "number");
        });

        test("Throws error when unable to locate value axis", function() {
            raises(function() {
                    setupChart(plotArea, {
                        series: [{ axis: "b", data: [1] }]
                    });
                },
                /Unable to locate value axis with name b/);
        });

        // ------------------------------------------------------------
        module(chartName + " / Negative Values", {
            setup: function() {
                setupChart(plotArea, { series: [ negativeSeries ] });
            }
        });

        test("Reports minimum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].min, negativeSeries.data[1]);
        });

        test("Reports maximum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].max, negativeSeries.data[0]);
        });

        test("point tops are aligned to category axis", function() {
            var pointsY = $.map(chart.points, function(point) {
                return point.box.y1;
            });

            deepEqual(pointsY, [CATEGORY_AXIS_Y, CATEGORY_AXIS_Y]);
        });

        test("points have set height according to value", function() {
            var pointHeights = $.map(chart.points, function(point) {
                return point.box.height();
            });

            deepEqual(pointHeights, [1, 2]);
        });

        test("getNearestPoint returns nearest series point", function() {
            var point = chart.points[1],
                result = chart.getNearestPoint(point.box.x2 + 100, point.box.y2, 0);

            ok(result === point);
        });

        // ------------------------------------------------------------
        module(chartName + " / Mismatched series", {
            setup: function() {
                setupChart(plotArea, {
                series: [ { data: [1, 2, 3] },
                          positiveSeries
                    ]
                });
            }
        });

        test("Reports minimum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].min, 1);
        });

        test("Reports maximum series value for default axis", function() {
            deepEqual(chart.valueAxisRanges[undefined].max, 3);
        });

        test("Reports number of categories", function() {
            equal(categoriesCount(chart.options.series), 3);
        });

        // ------------------------------------------------------------
        module(chartName + " / Missing values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ sparseSeries ]
                });
            }
        });

        test("reports minimum series value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 1);
        });

        test("reports maximum series value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, 2);
        });

        test("omits missing points when interpolating", function() {
            setupChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ]
            });

            equal(chart.points[2], null);
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Positive Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ positiveSeries, positiveSeries, positiveSeries ],
                    isStacked: true }
                );
            }
        });

        test("reports stacked minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 1);
        });

        test("reports stacked maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, 6);
        });

        test("point plot values are stacked", function() {
            deepEqual(
                $.map(chart.points, function(point) { return chart.plotRange(point)[0] }),
                [1, 2, 3, 2, 4, 6]
            );
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Negative Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ negativeSeries, negativeSeries, negativeSeries ],
                    isStacked: true
                });
            }
        });

        test("reports stacked minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, -6);
        });

        test("reports stacked maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, -1);
        });

        test("point plot values are stacked", function() {
            deepEqual(
                $.map(chart.points, function(point) { return chart.plotRange(point)[0] }),
                [-1, -2, -3, -2, -4, -6]
            );
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Mixed Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [{
                        data: [2, 2],
                        labels: {}
                    }, {
                        data: [-1, -1],
                        labels: {}
                    }],
                    isStacked: true
                });
            }
        });

        test("reports stacked minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 1);
        });

        test("reports stacked maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, 2);
        });

        test("points have set height according to stack value", function() {
            var pointHeights = $.map(chart.points, function(point) {
                return point.box.height();
            });

            deepEqual(pointHeights, [2, 1, 2, 1]);
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Mixed Series", {
            setup: function() {
                plotArea.namedValueAxes.a = plotArea.valueAxis;
                plotArea.namedValueAxes.b = plotArea.valueAxis;

                setupChart(plotArea, {
                    series: [
                        // Both axes should be on same axis.
                        // This rule is intentionally broken for the tests.
                        $.extend({ axis: "a" }, positiveSeries),
                        $.extend({ axis: "b" }, negativeSeries)
                    ],
                    isStacked: true
                });
            }
        });

        test("reports stacked minumum value for default axis", function() {
            equal(chart.valueAxisRanges.a.min, 0);
        });

        test("reports stacked maximum value for default axis", function() {
            equal(chart.valueAxisRanges.a.max, 2);
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Missing values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ sparseSeries, sparseSeries ],
                    isStacked: true
                });
            }
        });

        test("Reports minimum series value", function() {
            deepEqual(chart.valueAxisRanges[undefined].min, 0);
        });

        test("Reports minimum series value (interpolated)", function() {
            setupChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ],
                isStacked: true
            });
            deepEqual(chart.valueAxisRanges[undefined].min, 1);
        });

        test("Reports maximum series value", function() {
            deepEqual(chart.valueAxisRanges[undefined].max, 4);
        });

        test("missing points are assumed to be 0 by default", function() {
            equal(chart.points[4].value, 0);
        });

        test("missing points are skipped", function() {
            setupChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ],
                isStacked: true
            });

            equal(chart.points[4], null);
        });

        // ------------------------------------------------------------
        module(chartName + " / 100% Stacked / Positive Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ positiveSeries, positiveSeries ],
                    isStacked: true, isStacked100: true }
                );
            }
        });

        test("reports minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 0.5);
        });

        test("reports maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, 1);
        });

        // ------------------------------------------------------------
        module(chartName + " / 100% Stacked / Negative Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [ negativeSeries, negativeSeries ],
                    isStacked: true, isStacked100: true }
                );
            }
        });

        test("reports minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, -1);
        });

        test("reports maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, -0.5);
        });

        // ------------------------------------------------------------
        module(chartName + " / 100% Stacked / Mixed Values", {
            setup: function() {
                setupChart(plotArea, {
                    series: [{
                        data: [2, 2],
                        labels: {}
                    }, {
                        data: [-1, -1],
                        labels: {}
                    }],
                    isStacked: true, isStacked100: true }
                );
            }
        });

        test("reports minumum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 1/3);
        });

        test("reports maximum value for default axis", function() {
            close(chart.valueAxisRanges[undefined].max, 2/3);
        });

        // ------------------------------------------------------------
        module(chartName + " / Stack / Panes", {
            teardown: destroyChart
        });

        test("charts in different panes are not stacked", function() {
            teardown: destroyChart
            var chart = createChart({
                series: [{
                    stack: true,
                    type: seriesName,
                    data: [1]
                }, {
                    type: seriesName,
                    data: [2],
                    axis: "b"
                }],
                panes: [{
                    name: "top"
                }, {
                    name: "bottom"
                }],
                valueAxis: [{
                }, {
                    name: "b",
                    pane: "bottom"
                }],
                categoryAxis: {
                    categories: ["A"]
                }
            });

            var charts = chart._model._plotArea.charts;
            equal(charts[0].points[0].plotValue, undefined);
            equal(charts[1].points[0].plotValue, undefined);
        });
    })();

    (function() {
        var chart,
            MARGIN = PADDING = BORDER = 5,
            linePoint;

        var plotArea = stubPlotArea(
            function(categoryIndex) {
                return new Box2D();
            },
            function(value) {
                return new Box2D();
            },
            {
                categoryAxis: { }
            }
        );

        function createCustomChart(options) {
            chart = new TChart(plotArea, {
                series: [$.extend({
                    data: [0, 1],
                    color: "#f00",
                    markers: {
                        visible: false,
                        size: 10,
                        type: "triangle",
                        border: {
                            width: BORDER
                        },
                        opacity: 0.2
                    },
                    labels: {
                        visible: false,
                        color: "labels-color",
                        background: "labels-background",
                        border: {
                            color: "labels-border",
                            width: BORDER
                        },
                        margin: MARGIN,
                        padding: PADDING
                    },
                    opacity: 0.5,
                    dashType: "dot"
                }, options)]
            });
            linePoint = chart.points[0];
            chart.reflow(chartBox);
        }

        // ------------------------------------------------------------
        module(chartName + " / Configuration", {
            setup: function() {
                createCustomChart();
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("remove series if visible is set to false", function() {
            var chart = createChart({
                seriesDefaults: {
                    type: seriesName
                },
                series: [{
                    data: [1],
                    visible: false
                },{
                    data: [1]
                }]
            });

            var points = chart._model._plotArea.charts[0].points;

            ok(points.length === 1);
        });

        test("applies visible to point markers", function() {
            equal(linePoint.options.markers.visible, false);
        });

        test("applies series color to point markers border", function() {
            createCustomChart({ markers: { visible: true } });
            equal(linePoint.marker.options.border.color, "#f00");
        });

        test("applies opacity to point markers", function() {
            equal(linePoint.options.markers.opacity, 0.2);
        });

        test("applies size to point markers", function() {
            equal(linePoint.options.markers.size, 10);
        });

        test("applies type to point markers", function() {
            equal(linePoint.options.markers.type, "triangle");
        });

        test("applies border color to point markers", function() {
            createCustomChart({ markers: { border: { color: "marker-border" } } });
            equal(linePoint.options.markers.border.color, "marker-border");
        });

        test("applies border width to point markers.", function() {
            equal(linePoint.options.markers.border.width, BORDER);
        });

        test("applies visible to point labels", function() {
            equal(linePoint.options.labels.visible, false);
        });

        test("applies color to point labels", function() {
            equal(linePoint.options.labels.color, "labels-color");
        });

        test("applies background to point labels", function() {
            equal(linePoint.options.labels.background, "labels-background");
        });

        test("applies border color to point labels", function() {
            equal(linePoint.options.labels.border.color, "labels-border");
        });

        test("applies border width to point labels", function() {
            equal(linePoint.options.labels.border.width, BORDER);
        });

        test("applies padding to point labels", function() {
            equal(linePoint.options.labels.padding, PADDING);
        });

        test("applies margin to point labels", function() {
            equal(linePoint.options.labels.margin, MARGIN);
        });

        test("applies dashType", function() {
            equal(linePoint.options.dashType, "dot");
        });

        test("binds point color", function() {
            createCustomChart({
                type: seriesName,
                data: [{
                    color: "red", value: 1
                }, {
                    color: "green", value: 2
                }],
                field: "value",
                colorField: "color"
            });

            equal(chart.points[0].color, "red");
            equal(chart.points[1].color, "green");
        });

        test("applies color function", function() {
            createCustomChart({
                markers: { visible: true },
                color: function(point) { return "#f00" }
            });

            equal(linePoint.marker.options.border.color, "#f00");
        });

        test("color fn argument contains value", 1, function() {
            createCustomChart({
                data: [1],
                color: function(point) { equal(point.value, 1); }
            });
        });

        test("color fn argument contains category", 1, function() {
            createCustomChart({
                data: [1],
                color: function(point) { equal(point.category, "A"); }
            });
        });

        test("color fn argument contains series", 1, function() {
            createCustomChart({
                name: "series 1",
                data: [1],
                color: function(point) { equal(point.series.name, "series 1"); }
            });
        });

    })();

    (function() {
        var data = [{
                name: "Category A",
                text: "Alpha",
                value: 0
            }],
            chart,
            label;

        // ------------------------------------------------------------
        module(chartName + " / Integration", {
            setup: function() {
                chart = createChart({
                    dataSource: {
                        data: data
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            template: "${dataItem.text}"
                        }
                    },
                    series: [{
                        name: "Value",
                        type: seriesName,
                        field: "value"
                    }],
                    categoryAxis: {
                        field: "name"
                    }
                });

                label = chart._plotArea.charts[0].points[0].label;
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("dataItem sent to label template", function() {
            equal(label.children[0].content, "Alpha");
        });

    })();
}
