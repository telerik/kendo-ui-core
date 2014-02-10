function categoricalChartTests(name, TChart) {
    var dataviz = kendo.dataviz;
    var deepExtend = kendo.deepExtend;
    var box = new dataviz.Box2D(0, 0, 800, 600);
    var plotArea;
    var chart;

    function createChart(series, options) {
        plotArea = new dataviz.CategoricalPlotArea([]);
        chart = new TChart(plotArea, deepExtend({ series: series }, options));
    }

    // ------------------------------------------------------------
    module(name + " / Plot range / Positive values", {
        setup: function() {
            createChart([{ data: [1] }]);
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 1]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Negative values", {
        setup: function() {
            createChart([{ data: [-1] }]);
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, -1]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack / Configuration");

    test("first series set to stack: true", function() {
        createChart([{ data: [1], stack: true }, { data: [2] }],
                     { isStacked: true });
        deepEqual(chart.plotRange(chart.points[1]), [1, 3]);
    });

    test("all series set to stack: true", function() {
        createChart([{ data: [1], stack: true }, { data: [2], stack: true }],
                     { isStacked: true });
        deepEqual(chart.plotRange(chart.points[1]), [1, 3]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack / Positive values", {
        setup: function() {
            createChart([{ data: [1] }, { data: [2] }],
                         { isStacked: true });
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 1]);
    });

    test("from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [1, 3]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack / Negative values", {
        setup: function() {
            createChart([{ data: [-1] }, { data: [-2] }],
                         { isStacked: true });
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, -1]);
    });

    test("from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [-1, -3]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack / Mixed values", {
        setup: function() {
            createChart([{ data: [1] }, { data: [-1] }],
                         { isStacked: true });
        }
    });

    test("from axis to positive value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 1]);
    });

    test("from axis to negative value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [0, -1]);
    });

    // ------------------------------------------------------------
    function assertMultipleStacksPositive() {
        test("first stack, from axis to value", function() {
            deepEqual(chart.plotRange(chart.points[0]), [0, 1]);
        });

        test("first stack, from prev point to value", function() {
            deepEqual(chart.plotRange(chart.points[1]), [1, 3]);
        });

        test("second stack, from axis to value", function() {
            deepEqual(chart.plotRange(chart.points[2]), [0, 3]);
        });

        test("second stack, from prev point to value", function() {
            deepEqual(chart.plotRange(chart.points[3]), [3, 7]);
        });
    }

    module(name + " / Plot range / Multiple Stacks / Positive values", {
        setup: function() {
            createChart([{ data: [1], stack: "a" }, { data: [2], stack: "a" },
                         { data: [3], stack: "b" }, { data: [4], stack: "b" }],
                         { isStacked: true });
        }
    });
    assertMultipleStacksPositive();

    module(name + " / Plot range / Multiple Stacks (group syntax) / Positive values", {
        setup: function() {
            createChart([{ data: [1], stack: { group: "a" } },
                         { data: [2], stack: { group: "a" } },
                         { data: [3], stack: { group: "b" } },
                         { data: [4], stack: { group: "b" } }],
                         { isStacked: true });
        }
    });
    assertMultipleStacksPositive();

    // ------------------------------------------------------------
    function assertMultipleStacksNegative() {
        test("first stack, from axis to value", function() {
            deepEqual(chart.plotRange(chart.points[0]), [0, -1]);
        });

        test("first stack, from prev point to value", function() {
            deepEqual(chart.plotRange(chart.points[1]), [-1, -3]);
        });

        test("second stack, from axis to value", function() {
            deepEqual(chart.plotRange(chart.points[2]), [0, -3]);
        });

        test("second stack, from prev point to value", function() {
            deepEqual(chart.plotRange(chart.points[3]), [-3, -7]);
        });
    }

    module(name + " / Plot range / Multiple Stacks / Negative values", {
        setup: function() {
            createChart([{ data: [-1], stack: "a" }, { data: [-2], stack: "a" },
                         { data: [-3], stack: "b" }, { data: [-4], stack: "b" }],
                         { isStacked: true });
        }
    });
    assertMultipleStacksNegative();

    module(name + " / Plot range / Multiple Stacks (group syntax) / Negative values", {
        setup: function() {
            createChart([{ data: [-1], stack: { group: "a" } },
                         { data: [-2], stack: { group: "a" } },
                         { data: [-3], stack: { group: "b" } },
                         { data: [-4], stack: { group: "b" } }],
                         { isStacked: true });
        }
    });
    assertMultipleStacksNegative();

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack 100% / Positive values", {
        setup: function() {
            createChart([{ data: [1] }, { data: [3] }],
                         { isStacked: true, isStacked100: true });
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 0.25]);
    });

    test("from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [0.25, 1]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack 100% / Negative values", {
        setup: function() {
            createChart([{ data: [-1] }, { data: [-3] }],
                         { isStacked: true, isStacked100: true });
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, -0.25]);
    });

    test("from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [-0.25, -1]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Stack 100% / Mixed values", {
        setup: function() {
            createChart([{ data: [1] }, { data: [-3] }],
                         { isStacked: true, isStacked100: true });
        }
    });

    test("from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 0.25]);
    });

    test("from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [0, -0.75]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Multiple 100% Stacks / Positive values", {
        setup: function() {
            createChart([
                { data: [1], stack: { type: "100%", group: "a" } },
                { data: [3], stack: { type: "100%", group: "a" } },
                { data: [2], stack: { type: "100%", group: "b" } },
                { data: [6], stack: { type: "100%", group: "b" } }],
                { isStacked: true, isStacked100: true });
        }
    });

    test("first stack, from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, 0.25]);
    });

    test("first stack, from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [0.25, 1]);
    });

    test("second stack, from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[2]), [0, 0.25]);
    });

    test("second stack, from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[3]), [0.25, 1]);
    });

    // ------------------------------------------------------------
    module(name + " / Plot range / Multiple 100% Stacks / Negative values", {
        setup: function() {
            createChart([
                { data: [-1], stack: { type: "100%", group: "a" } },
                { data: [-3], stack: { type: "100%", group: "a" } },
                { data: [-2], stack: { type: "100%", group: "b" } },
                { data: [-6], stack: { type: "100%", group: "b" } }],
                { isStacked: true, isStacked100: true });
        }
    });

    test("first stack, from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[0]), [0, -0.25]);
    });

    test("first stack, from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[1]), [-0.25, -1]);
    });

    test("second stack, from axis to value", function() {
        deepEqual(chart.plotRange(chart.points[2]), [-0, -0.25]);
    });

    test("second stack, from prev point to value", function() {
        deepEqual(chart.plotRange(chart.points[3]), [-0.25, -1]);
    });
}
