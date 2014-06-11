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
})();
