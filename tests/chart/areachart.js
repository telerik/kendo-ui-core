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

    function setupAreaChart(plotArea, options) {
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

    baseLineChartTests("area", dataviz.AreaChart);

    (function() {
        var positiveSeries = { data: [1, 2], labels: {} },
            negativeSeries = { data: [-1, -2], labels: {} },
            sparseSeries = { data: [1, 2, undefined, 2] },
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
        module("Area Chart / Positive Values", {
            setup: function() {
                setupAreaChart(plotArea, { series: [ positiveSeries ] });
            }
        });

        test("segments are clipped to category axis", function() {
            setupAreaChart(plotArea, { series: [ positiveSeries ]});

            equal(areaChart._segments[0].points()[0].y, CATEGORY_AXIS_Y);
        });

        test("segments are clipped to secondary category axis", function() {
            plotArea.namedCategoryAxes["secondary"] = {
                getSlot: function(categoryIndex) {
                    return new Box2D(categoryIndex, 0,
                                     categoryIndex + 1, 0);
                },
                lineBox: function() {
                    ok(true)
                    return new Box2D(0,0,2,0);
                },
                options: {
                    categories: ["A", "B"]
                }
            };

            setupAreaChart(plotArea, { series: [{
                categoryAxis: "secondary",
                data: [1, 2],
                labels: {}
            }]});

            equal(areaChart._segments[0].points()[0].y, 0);
        });

        // ------------------------------------------------------------
        module("Area Chart / Values exceeding value axis min or max options ", {});
        
        test("values are not limited", 2, function() {
            var plotArea = stubPlotArea(
                function(categoryIndex) {
                    return new Box2D(categoryIndex, CATEGORY_AXIS_Y,
                                     categoryIndex + 1, CATEGORY_AXIS_Y);
                },
                function(value, axisCrossingValue, limit) {
                    ok(!limit);
                    return Box2D();
                }
            );
            
            setupAreaChart(plotArea, { series: [ {data: [1, 2]} ] });          
        });

        // ------------------------------------------------------------
        module("Area Chart / Multiple Series", {
            setup: function() {
                plotArea.namedValueAxes.secondary = plotArea.valueAxis;

                setupAreaChart(plotArea, {
                    series: [
                    $.extend({ }, positiveSeries),
                    $.extend({ axis: "secondary" }, negativeSeries  )
                ] });
            }
        });

        test("Reports minimum series value for primary axis", function() {
            deepEqual(areaChart.valueAxisRanges[undefined].min, positiveSeries.data[0]);
        });

        test("Reports maximum series value for primary axis", function() {
            deepEqual(areaChart.valueAxisRanges[undefined].max, positiveSeries.data[1]);
        });

        test("Reports minimum series value for secondary axis", function() {
            deepEqual(areaChart.valueAxisRanges.secondary.min, negativeSeries.data[1]);
        });

        test("Reports maximum series value for secondary axis", function() {
            deepEqual(areaChart.valueAxisRanges.secondary.max, negativeSeries.data[0]);
        });

        test("Reports number of categories for two series", function() {
            setupAreaChart(plotArea, {series: [ positiveSeries, negativeSeries ]});
            equal(categoriesCount(areaChart.options.series), positiveSeries.data.length);
        });

        test("getNearestPoint returns nearest series point", function() {
            var point = areaChart.points[1],
                result = areaChart.getNearestPoint(point.box.x2, point.box.y2 + 100, 1);

            ok(result === point);
        });

        // ------------------------------------------------------------
        module("Area Chart / Mismatched series", {
            setup: function() {
                setupAreaChart(plotArea, {
                series: [ { data: [1, 2, 3] },
                          positiveSeries
                    ]
                });
            }
        });

        test("getNearestPoint returns nearest series point", function() {
            var point = areaChart.points[3],
                result = areaChart.getNearestPoint(point.box.x2, point.box.y2 + 10, 1);

            ok(result === point);
        });

        // ------------------------------------------------------------
        module("Area Chart / Missing values", {
            setup: function() {
                setupAreaChart(plotArea, {
                    series: [ sparseSeries ]
                });
            }
        });

        test("missing points are assumed to be 0 by default", function() {
            equal(areaChart.points[2].value, 0);
        });

        test("omits missing points", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            equal(areaChart.points[2], null);
        });

        test("getNearestPoint returns nearest series point (left)", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            var point = areaChart.points[1],
                result = areaChart.getNearestPoint(point.box.x2 + 0.1, point.box.y2, 0);

            ok(result === point);
        });

        test("getNearestPoint returns nearest series point (right)", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            var point = areaChart.points[3],
                result = areaChart.getNearestPoint(point.box.x1 - 0.1, point.box.y1, 0);

            ok(result === point);
        });

        // ------------------------------------------------------------
        module("Area Chart / Panes", {
            teardown: destroyChart
        });

        test("area fill is clipped to value axis box", function() {
            var chart = createChart({
                series: [{
                    type: "area",
                    data: [1, 2, 3]
                }],
                panes: [{
                    name: "top"
                }, {
                    name: "bottom"
                }],
                valueAxis: [{
                }],
                categoryAxis: {
                    pane: "bottom",
                    categories: ["A"]
                }
            });

            var plotArea = chart._model._plotArea;
            var areaChart = plotArea.charts[0];
            equal(areaChart._segments[0].points()[0].y,
                   plotArea.panes[0].axes[0].lineBox().y2);
        });

        // ------------------------------------------------------------
        module("Area Chart / Stack / Missing values", {
            setup: function() {
                sparseSeries.line = { width: 0 };
                setupAreaChart(plotArea, {
                    series: [ sparseSeries, sparseSeries ],
                    isStacked: true
                });
            },
            teardown: destroyChart
        });

        test("line is drawn between existing points when interpolating", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ],
                isStacked: true
            });

            deepEqual(pointCoordinates, [
                [ 0.5, 2 ], [ 0.5, 1 ], [ 1.5, 0 ], [ 3.5, 0 ], [ 3.5, 2 ]
            ]);
        });

        // ------------------------------------------------------------
        var polyline;

        module("Area Chart / Rendering", {
            setup: function() {
                setupAreaChart(plotArea, {
                    series: [
                        $.extend({
                                line: {
                                    width: 2,
                                    color: "lineColor",
                                    opacity: 0.5,
                                    dashType: "dot"
                                },
                                color: "areaColor",
                                opacity: 0.1
                            },
                            positiveSeries
                        )
                    ]
                });

                polyline = view.log.path[0];

            },
            teardown: destroyChart
        });

        test("sets area line width", function() {
            equal(view.log.path[1].style.strokeWidth, 2);
        });

        test("sets area line color", function() {
            equal(view.log.path[1].style.stroke, "lineColor");
        });

        test("sets area line opacity", function() {
            equal(view.log.path[1].style.strokeOpacity, 0.5);
        });

        test("sets area line opacity", function() {
            equal(view.log.path[1].style.dashType, "dot");
        });

        test("sets area fill color", function() {
            equal(polyline.style.fill, "areaColor");
        });

        test("sets area fill color to default if series color is fn", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({
                            _defaults: { color: "areaColor" },
                            color: function() { }
                        },
                        positiveSeries
                    )
                ]
            });
            equal(view.log.path[0].style.fill, "areaColor");
        });

        test("sets area opacity", function() {
            equal(polyline.style.fillOpacity, 0.1);
        });

        test("area has same model id as its segment", function() {
            equal(polyline.style.data.modelId, areaChart._segments[0].modelId);
        });

        test("renders area chart group", function() {
            equal(view.log.group.length, 1);
        });

        test("sets group animation", function() {
            equal(view.log.group[0].options.animation.type, "clip");
        });

        test("area shape is open", function() {
            equal(polyline.closed, false);
        });

        // ------------------------------------------------------------
        module("Area Chart / Rendering / Missing Values", {
            setup: function() {
                sparseSeries.line = { width: 0 };
            }
        });

        test("area stops before missing value", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0.5, 2 ], [ 0.5, 1 ],
                [ 1.5, 0 ], [ 1.5, 2 ]
            ]);
        });

        test("no area is created for isolated points", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "gap" }, sparseSeries)
                ]
            });

            equal(view.log.path.length, 1);
        });

        test("area continues after missing value", function() {
            setupAreaChart(plotArea, {
                series: [{
                    missingValues: "gap",
                    data: [ null, 1, 2 ],
                    line: { width: 0 }
                }]
            });

            deepEqual(pointCoordinates, [
                [ 1.5, 2 ], [ 1.5, 1 ],
                [ 2.5, 0 ], [ 2.5, 2 ]
            ]);
        });

        test("area is drawn between existing points", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0.5, 2 ], [ 0.5, 1 ], [ 1.5, 0 ],
                [ 3.5, 0 ], [ 3.5, 2 ]
            ]);
        });

        test("area goes to zero for missing point", function() {
            setupAreaChart(plotArea, {
                series: [
                    $.extend({ missingValues: "zero" }, sparseSeries)
                ]
            });

            deepEqual(pointCoordinates, [
                [ 0.5, 2 ], [ 0.5, 1 ], [ 1.5, 0 ],
                [ 2.5, 2 ], [ 3.5, 0 ], [ 3.5, 2 ]
            ]);
        });

    })();

    (function() {
        var chart,
            segment;

        function getElement(modelElement) {
            return $(dataviz.getElement(modelElement.id));
        }

        function createAreaChart(options) {
            chart = createChart($.extend({
                series: [{
                    type: "area",
                    data: [1, 2]
                }],
                categoryAxis: {
                    categories: ["A", "B"]
                }
            }, options));

            var plotArea = chart._model.children[1],
                areaChart = plotArea.charts[0];

            segment = areaChart._segments[0];
        }

        function areaClick(callback, x, y) {
            createAreaChart({
                seriesClick: callback
            });

            chart._userEvents.press(x, y, getElement(segment));
            chart._userEvents.end(x, y);
        }

        function areaHover(callback, x, y) {
            createAreaChart({
                seriesHover: callback
            });

            triggerEvent("mouseover", getElement(segment), x, y);
        }

        // ------------------------------------------------------------
        module("Area Chart / Events / seriesClick", {
            teardown: function() {
                destroyChart();
            }
        });

        test("fires when clicking segment", 1, function() {
            areaClick(function() { ok(true); });
        });

        test("fires for closest point when clicking segment (1)", 1, function() {
            areaClick(function(e) { equal(e.value, 1); }, 0, 0);
        });

        test("fires for closest point when clicking segment (2)", 1, function() {
            areaClick(function(e) { equal(e.value, 2); }, 1000, 0);
        });

        // ------------------------------------------------------------
        module("Area Chart / Events / seriesHover", {
            teardown: function() {
                destroyChart();
            }
        });

        test("fires when hovering segment", 1, function() {
            areaHover(function() { ok(true); });
        });

        test("fires for closest point when hovering segment (1)", 1, function() {
            areaHover(function(e) { equal(e.value, 1); }, 0, 0);
        });

        test("fires for closest point when hovering segment (2)", 1, function() {
            areaHover(function(e) { equal(e.value, 2); }, 1000, 0);
        });

    })();

    (function() {
        var note;

        module("Area Chart / Note", {
            setup: function() {
                var chart = createChart({
                    series: [{
                        name: "Value",
                        type: "area",
                        data: [{ value: 10, noteText: "A" }]
                    }]
                });

                note = chart._plotArea.charts[0].points[0].note;
            },
            teardown: function() {
                destroyChart();
            }
        });

        test("should have text", function() {
            equal(note.text, "A");
        });

        module("Area Chart / Note Template", {
            teardown: function() {
                destroyChart();
            }
        });

        function createNote(options) {
            var chart = createChart({
                series: [{
                    name: "Value",
                    type: "area",
                    data: [{ value: 10, noteText: "A", test: "test" }],
                    notes: $.extend({}, options),
                    name: "name"
                }],
                categoryAxis: {
                    categories: ["Alpha"]
                }
            });

            note = chart._plotArea.charts[0].points[0].note;
        }

        test("dataItem", function() {
            createNote({
                label: {
                    template: "#= dataItem.test #"
                }
            });

            equal(note.label.content, "test");
        });

        test("category", function() {
            createNote({
                label: {
                    template: "#= category #"
                }
            });

            equal(note.label.content, "Alpha");
        });

        test("value", function() {
            createNote({
                label: {
                    template: "#= value #"
                }
            });

            equal(note.label.content, 10);
        });

        test("series", function() {
            createNote({
                label: {
                    template: "#= series.name #"
                }
            });

            equal(note.label.content, "name");
        });
    })();
})();
