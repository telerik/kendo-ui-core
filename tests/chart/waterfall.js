(function() {
    var dataviz = kendo.dataviz;
    var deepExtend = kendo.deepExtend;
    var plotArea;
    var chart;

    function createChart(series, options) {
        plotArea = new dataviz.CategoricalPlotArea([]);
        chart = new dataviz.WaterfallChart(plotArea, deepExtend({ series: series }, options));
    }

    function makeSeries(data) {
        return [{
            type: "waterfall",
            data: data
        }];
    }

    function assertFields(field, values) {
        deepEqual(
            $.map(chart.points, function(p) { return p[field]; }),
            values
        );
    }

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Point Fields /", {
            setup: function() {
                createChart(makeSeries([1, 2, 3, 4]));
            }
        });

        test("total field is set on all points", function() {
            assertFields("total", [10, 10, 10, 10]);
        });

        test("runningTotal field is set on all points", function() {
            assertFields("runningTotal", [1, 3, 6, 10]);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Running Total /", {
            setup: function() {
                createChart(makeSeries([
                   { summary: "runningTotal" },
                   { value: 1 }, { value: 2 }, { summary: "runningTotal" },
                   { value: 3 }, { value: 4 }, { summary: "runningTotal" }
                ]));
            }
        });

        test("runningTotal field is set on all points", function() {
            assertFields("runningTotal", [0, 1, 3, 0, 3, 7, 0]);
        });

        test("running total #1 is set as value", function() {
            equal(chart.points[0].value, 0);
        });

        test("running total #2 is set as value", function() {
            equal(chart.points[3].value, 3);
        });

        test("running total #3 is set as value", function() {
            equal(chart.points[6].value, 7);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Running Total / Missing Values /");

        test("ignores null values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: null }, { value: 2 }, { summary: "runningTotal" }
            ]));

            assertFields("runningTotal", [1, 1, 3, 0]);
        });

        test("ignores undefined values", function() {
            createChart(makeSeries([
               { value: 1 }, {}, { value: 2 }, { summary: "runningTotal" }
            ]));

            assertFields("runningTotal", [1, 1, 3, 0]);
        });

        test("ignores NaN values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: NaN }, { value: 2 }, { summary: "runningTotal" }
            ]));

            assertFields("runningTotal", [1, 1, 3, 0]);
        });

        test("ignores other values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: "foo" }, { value: 2 }, { summary: "runningTotal" }
            ]));

            assertFields("runningTotal", [1, 1, 3, 0]);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Total /", {
            setup: function() {
                createChart(makeSeries([
                   { summary: "total" },
                   { value: 1 }, { value: 2 }, { summary: "total" },
                   { value: 3 }, { value: 4 }, { summary: "total" }
                ]));
            }
        });

        test("total field is set on all points", function() {
            assertFields("total", [10, 10, 10, 10, 10, 10, 10]);
        });

        test("total #1 is set as value", function() {
            equal(chart.points[0].value, 10);
        });

        test("total #2 is set as value", function() {
            equal(chart.points[3].value, 10);
        });

        test("total #3 is set as value", function() {
            equal(chart.points[6].value, 10);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Total / Missing Values /");

        test("ignores null values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: null }, { value: 2 }, { summary: "total" }
            ]));

            assertFields("total", [3, 3, 3, 3]);
        });

        test("ignores undefined values", function() {
            createChart(makeSeries([
               { value: 1 }, {}, { value: 2 }, { summary: "total" }
            ]));

            assertFields("total", [3, 3, 3, 3]);
        });

        test("ignores NaN values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: NaN }, { value: 2 }, { summary: "total" }
            ]));

            assertFields("total", [3, 3, 3, 3]);
        });

        test("ignores other values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: "foo" }, { value: 2 }, { summary: "total" }
            ]));

            assertFields("total", [3, 3, 3, 3]);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        function assertPlotRange(index, range) {
            deepEqual(chart.plotRange(chart.points[index]), range);
        }

        module("Waterfall / Plot Range /", {
            setup: function() {
                createChart(makeSeries([
                   { value: 1 }, { value: 3 }, { summary: "runningTotal" },
                   { value: -1 }, { value: -2 }, { summary: "runningTotal" },
                   { summary: "total" }
                ]));
            }
        });

        test("point #1 starts at 0", function() {
            assertPlotRange(0, [0, 1]);
        });

        test("point #2 starts point #1 end", function() {
            assertPlotRange(1, [1, 4]);
        });

        test("point #3 shows running total from point #2 end", function() {
            assertPlotRange(2, [4, 0]);
        });

        test("point #4 starts from point #2", function() {
            assertPlotRange(3, [4, 3]);
        });

        test("point #5 starts from point #4 end", function() {
            assertPlotRange(4, [3, 1]);
        });

        test("point #6 shows running total starting from point #5 end", function() {
            assertPlotRange(5, [1, 4]);
        });

        test("point #7 shows total starting from 0", function() {
            assertPlotRange(6, [0, 1]);
        });

        test("negative running total", function() {
            createChart(makeSeries([
               { value: -1 }, { value: -2 }, { summary: "runningTotal" }
            ]));

            assertPlotRange(2, [-3, 0]);
        });

        test("negative total", function() {
            createChart(makeSeries([
               { value: -1 }, { value: -2 }, { summary: "total" }
            ]));

            assertPlotRange(2, [0, -3]);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Axis Range /", {
            setup: function() {
                createChart(makeSeries([
                   { value: 1 }, { value: 3 }, { summary: "runningTotal" },
                   { value: -1 }, { value: -2 }, { summary: "total" }
                ]));
            }
        });

        test("Reports minimum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].min, 0);
        });

        test("Reports maximum value for default axis", function() {
            equal(chart.valueAxisRanges[undefined].max, 4);
        });

        test("negative running total", function() {
            createChart(makeSeries([
               { value: 1 }, { value: 2 }, { summary: "runningTotal" },
               { value: -1 }, { summary: "runningTotal" }
            ]));

            equal(chart.valueAxisRanges[undefined].min, 0);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        function assertSegment(segmentIx, fromIx, toIx) {
            equal(chart.segments[segmentIx].from, chart.points[fromIx]);
            equal(chart.segments[segmentIx].to, chart.points[toIx]);
        }

        module("Waterfall / Segments /", {
            setup: function() {
                createChart(makeSeries([
                   { value: 1 }, { value: 3 }, { summary: "runningTotal" },
                   { value: -1 }, { value: -2 }, { summary: "total" }
                ]));
            }
        });

        test("creates segments between regular points", function() {
            assertSegment(0, 0, 1);
            assertSegment(3, 3, 4);
        });

        test("creates segments between regular points and running totals", function() {
            assertSegment(1, 1, 2);
            assertSegment(2, 2, 3);
        });

        test("doesn't create segment to total", function() {
            equal(chart.segments.length, 4);
        });

        test("doesn't fail with no points", function() {
            createChart(makeSeries([]));
            ok(true);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        var segment;
        var view;
        var polyline;

        module("WaterfallSegment", {
            setup: function() {
                segment = new dataviz.WaterfallSegment({
                    // From point
                    aboveAxis: true,
                    box: new dataviz.Box2D(0, 0, 10, 100)
                }, {
                    // To point
                    aboveAxis: true,
                    box: new dataviz.Box2D(20, 0, 30, 100)
                }, {
                    // Series
                    line: {
                        color: "blue",
                        width: 2,
                        opacity: 0.5,
                        dashType: "dot"
                    }
                });

                view = new ViewStub();
                polyline = segment.getViewElements(view)[0];
            }
        });

        test("connects point end to next point start", function() {
            ok(polyline.points[0].equals(new dataviz.Point2D(0, 0)));
            ok(polyline.points[1].equals(new dataviz.Point2D(30, 0)));
        });

        test("connects point end to next point start (negative values)", function() {
            segment.from.aboveAxis = segment.to.aboveAxis = false;
            polyline = segment.getViewElements(view)[0];
            ok(polyline.points[0].equals(new dataviz.Point2D(0, 100)));
            ok(polyline.points[1].equals(new dataviz.Point2D(30, 100)));
        });

        test("renders open polyline", function() {
            ok(!polyline.closed);
        });

        test("sets default animation", function() {
            equal(polyline.options.animation.type, "fadeIn");
        });

        test("sets color", function() {
            equal(polyline.options.stroke, "blue");
        });

        test("sets width", function() {
            equal(polyline.options.strokeWidth, 2);
        });

        test("sets opacity", function() {
            equal(polyline.options.strokeOpacity, 0.5);
        });

        test("sets dashType", function() {
            equal(polyline.options.dashType, "dot");
        });
    })();
})();
