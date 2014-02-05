(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(0, 0, 800, 600),
        plotArea,
        scatterChart,
        root,
        view,
        TOLERANCE = 1;

    function setupScatterChart(plotArea, options) {
        view = new ViewStub();

        scatterChart = new dataviz.ScatterChart(plotArea, options);

        root = new dataviz.RootElement();
        root.append(scatterChart);

        scatterChart.reflow();
        scatterChart.getViewElements(view);
    }

    (function() {
        var series = { data: [[1, 1], [2, 2]], labels: {}, type: "scatter" },
            sparseSeries = { data: [
                                [1, 1], [2, 2], undefined, [2, 2], [null, 1], [1, null]
                            ], labels: {}, type: "scatter" },
            VALUE_AXIS_MAX = 2,
            CATEGORY_AXIS_Y = 2;

        function PlotAreaStub() { }

        $.extend(PlotAreaStub.prototype, {
            axisX: {
                getSlot: function(categoryIndex) {
                    return new Box2D(categoryIndex, CATEGORY_AXIS_Y,
                    categoryIndex + 1, CATEGORY_AXIS_Y);
                }
            },
            axisY: {
                getSlot: function(value) {
                    var value = typeof value === "undefined" ? 0 : value,
                        valueY = VALUE_AXIS_MAX - value,
                        slotTop = Math.min(CATEGORY_AXIS_Y, valueY),
                        slotBottom = Math.max(CATEGORY_AXIS_Y, valueY);

                    return new Box2D(0, slotTop, 0, slotBottom);
                },
                options: {}
            },
            namedXAxes: {},
            namedYAxes: {}
        });

        // ------------------------------------------------------------
        module("Scatter Chart / Series", {
            setup: function() {
                plotArea = new PlotAreaStub();
                setupScatterChart(plotArea, { series: [ series ] });
            }
        });

        test("Creates points for scatterChart data points", function() {
            equal(scatterChart.points.length, series.data.length);
        });

        test("Reports minimum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].min, series.data[0][0]);
        });

        test("Reports minimum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].min, series.data[0][1]);
        });

        test("Reports maximum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].max, series.data[1][0]);
        });

        test("Reports maximum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].max, series.data[1][1]);
        });

        test("points have set width", function() {
            $.each(scatterChart.points, function() {
                equal(this.box.width(), 1);
            });
        });

        test("points have set height according to value", function() {
            var pointHeights = $.map(scatterChart.points, function(point) {
                return point.box.height();
            });

            deepEqual(pointHeights, [1, 2]);
        });

        test("sets point owner", function() {
            ok(scatterChart.points[0].owner === scatterChart);
        });

        test("sets point series", function() {
            ok(scatterChart.points[0].series === series);
        });

        test("sets point series index", function() {
            ok(scatterChart.points[0].seriesIx === 0);
        });

        test("sets point dataItem", function() {
            equal(typeof scatterChart.points[0].dataItem, "object");
        });

        test("removes the series points if the visible is set to false", function() {
            var chart = createChart({
                seriesDefaults: {
                    type: "scatterLine"
                },
                series: [{
                    data: [[1,2]],
                    visible: false
                },{
                    data: [[1,2]]
                }]
            });

            var points = chart._plotArea.charts[0].points;
            ok(points.length === 1);

            destroyChart();
        });

        test("renders empty scatter line series", 0, function() {
            setupScatterChart(plotArea, { series: [ { data: [] } ] });
        });

        test("renders empty and non-empty scatter line series", 0, function() {
            setupScatterChart(plotArea, { series: [ { data: [] }, series ] });
        });             

        // ------------------------------------------------------------
        module("Scatter Chart / Multiple Axes", {
            setup: function() {
                plotArea = new PlotAreaStub();
                plotArea.namedXAxes.secondary = plotArea.axisX;
                plotArea.namedYAxes.secondary = plotArea.axisY;

                setupScatterChart(plotArea, {
                    series: [
                        { type: "scatter", data: [[1, 10], [2, 20]] },
                        { type: "scatter", xAxis: "secondary", yAxis: "secondary", data: [[3, 30], [4, 40]] }
                    ]
                });
            }
        });

        test("Reports minimum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].min, 1);
        });

        test("Reports minimum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].min, 10);
        });

        test("Reports maximum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].max, 2);
        });

        test("Reports maximum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].max, 20);
        });

        test("Reports minimum value for secondary X axis", function() {
            deepEqual(scatterChart.xAxisRanges.secondary.min, 3);
        });

        test("Reports minimum value for secondary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges.secondary.min, 30);
        });

        test("Reports maximum value for secondary X axis", function() {
            deepEqual(scatterChart.xAxisRanges.secondary.max, 4);
        });

        test("Reports maximum value for secondary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges.secondary.max, 40);
        });

        test("Throws error when unable to locate X axis", function() {
            raises(function() {
                    setupScatterChart(plotArea, {
                        series: [
                            { data: [[1, 10], [2, 20]], xAxis: "b" }
                        ]
                    });
                },
                /Unable to locate X axis with name b/);
        });

        test("Throws error when unable to locate Y axis", function() {
            raises(function() {
                    setupScatterChart(plotArea, {
                        series: [
                            { data: [[1, 10], [2, 20]], yAxis: "b" }
                        ]
                    });
                },
                /Unable to locate Y axis with name b/);
        });

        // ------------------------------------------------------------
        module("Scatter Chart / Missing values", {
            setup: function() {
                plotArea = new PlotAreaStub();
                setupScatterChart(plotArea, {
                    series: [ sparseSeries ]
                });
            }
        });

        test("Reports minimum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].min, 1);
        });

        test("Reports minimum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].min, 1);
        });

        test("Reports maximum value for primary X axis", function() {
            deepEqual(scatterChart.xAxisRanges[undefined].max, 2);
        });

        test("Reports maximum value for primary Y axis", function() {
            deepEqual(scatterChart.yAxisRanges[undefined].max, 2);
        });

        test("omits null points by default", function() {
            equal(scatterChart.points[2], null);
        });

        test("omits null points when interpolating", function() {
            setupScatterChart(plotArea, {
                series: [
                    $.extend({ missingValues: "interpolate" }, sparseSeries)
                ]
            });

            equal(scatterChart.points[2], null);
        });

        test("point with missing X value is omitted", function() {
            equal(scatterChart.points[5], null);
        });

        test("point with missing Y value is omitted", function() {
            equal(scatterChart.points[6], null);
        });

        // ------------------------------------------------------------
        module("Scatter Chart / Rendering", {
            setup: function() {
                plotArea = new PlotAreaStub();
                setupScatterChart(plotArea, { series: [ series ] });
            }
        });

        test("sets group animation", function() {
            equal(view.log.group[0].options.animation.type, "clip");
        });

        // ------------------------------------------------------------
        module("Scatter Chart / Labels", {
            setup: function() {
                plotArea = new PlotAreaStub();
            }
        });

        test("applies full label format", function() {
            setupScatterChart(plotArea, {
                series: [{
                    data: [[1, 10], [2, 20]],
                    labels: { visible: true, format: "{0:C} {1:C}" },
                    type: "scatter"
                }]
            });

            equal(view.log.text[0].content, "$1.00 $10.00");
        });

    })();

    (function() {
        var scatterChart,
            MARGIN = PADDING = BORDER = 5,
            linePoint,
            scatterPoint;

        function PlotAreaStub() { }

        $.extend(PlotAreaStub.prototype, {
            axisX: {
                getSlot: function(value) {
                    return new Box2D();
                }
            },
            axisY: {
                getSlot: function(categoryIndex) {
                    return new Box2D();
                }
            }
        });

        function createScatterChart(options) {
            plotArea = new PlotAreaStub();
            scatterChart = new dataviz.ScatterChart(plotArea, {
                series: [$.extend({
                    data: [[0, 0], [1, 1]],
                    type: "scatter",
                    color: "#f00",
                    markers: {
                        visible: false,
                        size: 10,
                        type: "triangle",
                        border: {
                            width: BORDER
                        }
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
            scatterPoint = scatterChart.points[0];
        }

        // ------------------------------------------------------------
        module("Scatter Chart / Configuration", {
            setup: function() {
                createScatterChart();
            }
        });

        test("applies visible to point markers", function() {
            equal(scatterPoint.options.markers.visible, false);
        });

        test("applies series color to point markers border", function() {
            createScatterChart({ markers: { visible: true } });
            scatterChart.reflow(chartBox);
            equal(scatterPoint.marker.options.border.color, "#f00");
        });

        test("applies series opacity color to point markers", function() {
            equal(scatterPoint.options.markers.opacity, 0.5);
        });

        test("applies size to point markers", function() {
            equal(scatterPoint.options.markers.size, 10);
        });

        test("applies type to point markers", function() {
            equal(scatterPoint.options.markers.type, "triangle");
        });

        test("applies border color to point markers", function() {
            createScatterChart({ markers: { border: { color: "marker-border" } } });
            equal(scatterPoint.options.markers.border.color, "marker-border");
        });

        test("applies border width to point markers.", function() {
            equal(scatterPoint.options.markers.border.width, BORDER);
        });

        test("applies visible to point labels", function() {
            equal(scatterPoint.options.labels.visible, false);
        });

        test("applies color to point labels", function() {
            equal(scatterPoint.options.labels.color, "labels-color");
        });

        test("applies background to point labels", function() {
            equal(scatterPoint.options.labels.background, "labels-background");
        });

        test("applies border color to point labels", function() {
            equal(scatterPoint.options.labels.border.color, "labels-border");
        });

        test("applies border width to point labels", function() {
            equal(scatterPoint.options.labels.border.width, BORDER);
        });

        test("applies padding to point labels", function() {
            equal(scatterPoint.options.labels.padding, PADDING);
        });

        test("applies margin to point labels", function() {
            equal(scatterPoint.options.labels.margin, MARGIN);
        });

        test("applies margin to point labels", function() {
            equal(scatterPoint.options.dashType, "dot");
        });

        test("applies color function", function() {
            createScatterChart({
                color: function(point) { return "#f00" }
            });

            equal(scatterPoint.color, "#f00");
        });

        test("color fn argument contains value", 1, function() {
            createScatterChart({
                data: [[1, 1]],
                color: function(point) {
                    deepEqual(point.value, { x: 1, y: 1});
                }
            });
        });

        test("color fn argument contains series", 1, function() {
            createScatterChart({
                name: "series 1",
                data: [[1, 1]],
                color: function(point) { equal(point.series.name, "series 1"); }
            });
        });

        test("color fn argument contains dataItem", 1, function() {
            createScatterChart({
                data: [[1, 1]],
                color: function(point) { equal(point.dataItem[0], 1); }
            });
        });

    })();

    (function() {
        var data = [{
                xValue: 3,
                yValue: 1
            }, {
                xValue: 2,
                yValue: 2
            }, {
                xValue: 2,
                yValue: 2
            }],
            points,
            legend;

        // ------------------------------------------------------------
        module("Scatter Chart / Integration", {
            setup: function() {
                var chart = createChart({
                    dataSource: {
                        data: data
                    },
                    series: [{
                        name: "A",
                        type: "scatter",
                        xField: "xValue",
                        yField: "yValue",
                        test: "test"
                    }],
                    legend: {
                        labels: {
                            template: "#= text #-#= series.test #"
                        }
                    }
                });

                points = chart._plotArea.charts[0].points;
                legend = chart._model.children[0];
            },
            teardown: destroyChart
        });

        test("gets data from x and y field", function() {
            equal(points.length, 3);
        });

        test("legend labels template", function() {
            equal(legend.options.items[0].text, "A-test");
        });

    })();

    (function() {
        var note;

        module("Scatter Chart / Note", {
            setup: function() {
                var chart = createChart({
                    series: [{
                        name: "Value",
                        type: "scatter",
                        data: [{ x: 1, y: 10, noteText: "A" }]
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

        module("Scatter Chart / Note Template", {
            teardown: function() {
                destroyChart();
            }
        });

        function createNote(options) {
            var chart = createChart({
                series: [{
                    name: "Value",
                    type: "scatter",
                    data: [{ x: 1, y: 10, noteText: "A", test: "test" }],
                    notes: $.extend({}, options),
                    name: "name"
                }]
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

        test("value", function() {
            createNote({
                label: {
                    template: "x: #= value.x # y: #= value.y #"
                }
            });

            equal(note.label.content, "x: 1 y: 10");
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
    
    // ------------------------------------------------------------
                           
    (function() {      
        module("Scatter Chart / Values exceeding axis min or max options ", {});

        test("values are not limited", 2, function() {
            var plotArea = {
                axisX: {
                    getSlot: function(a,b,limit) {
                        ok(!limit);
                        return Box2D();
                    }
                },
                axisY: {
                    getSlot: function(a,b, limit) {
                        ok(!limit);
                        return Box2D();
                    }
                }
            };
           
            setupScatterChart(plotArea, { series: [ {data: [[1, 2]], type: "scatter"} ] });          
        });          
    })();
    
})();
