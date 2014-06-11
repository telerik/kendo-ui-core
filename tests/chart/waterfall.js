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

        test("sum field is set on all points", function() {
            assertFields("sum", [10, 10, 10, 10]);
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
        module("Waterfall / Sum /", {
            setup: function() {
                createChart(makeSeries([
                   { summary: "sum" },
                   { value: 1 }, { value: 2 }, { summary: "sum" },
                   { value: 3 }, { value: 4 }, { summary: "sum" }
                ]));
            }
        });

        test("sum field is set on all points", function() {
            assertFields("sum", [10, 10, 10, 10, 10, 10, 10]);
        });

        test("sum #1 is set as value", function() {
            equal(chart.points[0].value, 10);
        });

        test("sum #2 is set as value", function() {
            equal(chart.points[3].value, 10);
        });

        test("sum #3 is set as value", function() {
            equal(chart.points[6].value, 10);
        });
    })();

    // ------------------------------------------------------------
    (function() {
        module("Waterfall / Sum / Missing Values /");

        test("ignores null values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: null }, { value: 2 }, { summary: "sum" }
            ]));

            assertFields("sum", [3, 3, 3, 3]);
        });

        test("ignores undefined values", function() {
            createChart(makeSeries([
               { value: 1 }, {}, { value: 2 }, { summary: "sum" }
            ]));

            assertFields("sum", [3, 3, 3, 3]);
        });

        test("ignores NaN values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: NaN }, { value: 2 }, { summary: "sum" }
            ]));

            assertFields("sum", [3, 3, 3, 3]);
        });

        test("ignores other values", function() {
            createChart(makeSeries([
               { value: 1 }, { value: "foo" }, { value: 2 }, { summary: "sum" }
            ]));

            assertFields("sum", [3, 3, 3, 3]);
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
                   { summary: "sum" }
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

        test("point #7 shows sum starting from 0", function() {
            assertPlotRange(6, [0, 1]);
        });

        test("negative running total", function() {
            createChart(makeSeries([
               { value: -1 }, { value: -2 }, { summary: "runningTotal" }
            ]));

            assertPlotRange(2, [-3, 0]);
        });

        test("negative sum", function() {
            createChart(makeSeries([
               { value: -1 }, { value: -2 }, { summary: "sum" }
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
                   { value: -1 }, { value: -2 }, { summary: "sum" }
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
})();
