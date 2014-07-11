(function() {
    var dataviz = kendo.dataviz;

    var positiveSeries = { type: "rangeColumn", data: [[1, 2]] };
    var negativeSeries = { type: "rangeColumn", data: [[-1, -2]] };
    var sparseSeries = { type: "rangeColumn", data: [null, [1, 2]] };

    // ------------------------------------------------------------
    module("Range Column Chart / aboveAxis", {
        teardown: destroyChart
    });

    test("is set to true when from < to", function() {
        var chart = createChart({ series: [ positiveSeries ] });
        var bar = chart._plotArea.charts[0].points[0];

        ok(bar.aboveAxis);
    });

    test("is set to false when from > to", function() {
        var chart = createChart({ series: [ negativeSeries ] });
        var bar = chart._plotArea.charts[0].points[0];

        ok(!bar.aboveAxis);
    });

    // ------------------------------------------------------------
    module("Range Bar / Labels", {
        teardown: destroyChart
    });

    test("From label has default format", function() {
        var chart = createChart({ series: [ $.extend(positiveSeries, { labels: { visible: true } }) ] });
        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.labelFrom.children[0].content, "1 - 2");
    });

    test("To label has default format", function() {
        var chart = createChart({ series: [ $.extend(positiveSeries, { labels: { visible: true } }) ] });
        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.labelTo.children[0].content, "1 - 2");
    });

    test("Series defaults From label format overrides default format", function() {
        var chart = createChart({series: [ positiveSeries ], seriesDefaults: [ $.extend(positiveSeries, { labels: { visible: true, format: "{0}" } }) ] });

        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.labelFrom.children[0].content, "1");
    });

    test("Series defaults To label format overrides default format", function() {
        var chart = createChart({series: [ positiveSeries ], seriesDefaults: [ $.extend(positiveSeries, { labels: { visible: true, format: "{1}" } }) ] });

        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.labelTo.children[0].content, "2");
    });

    test("Label format configuration overrides default format", 2, function() {
        var chart = createChart({ 
            series: [ $.extend(positiveSeries, { 
                labels: { 
                    visible: true,
                    from: {
                        format: "{0}"
                    },
                    to: {
                        format: "{1}"
                    } 
                } 
            })] 
        });

        var bar = chart._plotArea.charts[0].points[0];

        equal(bar.labelFrom.children[0].content, "1");
        equal(bar.labelTo.children[0].content, "2");
    });

    test("Label visible configuration overrides seriesDefaults", 2, function() {
        var chart = createChart({
            seriesDefaults: {
                labels: {
                    visible: true
                }
            },
            series: [ $.extend(positiveSeries, { 
                labels: { 
                    from: {
                        visible: false,
                        format: "{0}"
                    },
                    to: {
                        format: "{1}"
                    }
                }}) 

            ]
        });

        var bar = chart._plotArea.charts[0].points[0];

        equal(bar.labelFrom, undefined);
        equal(bar.labelTo.options.visible, true);
    });

    test("Label format configuration overrides seriesDefaults", 2, function() {
        var chart = createChart({
            seriesDefaults: {
                labels: {
                    visible: true,
                    format: "{0} - {1}"
                }
            },
            series: [ $.extend(positiveSeries, { 
                labels: { 
                    from: {
                        format: "{0}"
                    },
                    to: {
                        format: "{1}"
                    }
                }})
            ]
        });

        var bar = chart._plotArea.charts[0].points[0];

        equal(bar.labelFrom.options.format, "{0}");
        equal(bar.labelTo.options.format, "{1}");
    });

    test("Label template configuration overrides seriesDefaults", 2, function() {
        var chart = createChart({
            seriesDefaults: {
                labels: {
                    visible: true,
                    template: "{0} - {1}"
                }
            },
            series: [ $.extend(positiveSeries, { 
                labels: { 
                    from: {
                        template: "{0}"
                    },
                    to: {
                        template: "{1}"
                    }
                }})
            ]
        });

        var bar = chart._plotArea.charts[0].points[0];

        equal(bar.labelFrom.options.template, "{0}");
        equal(bar.labelTo.options.template, "{1}");
    });

    test("Empty for null values", function() {
        var chart = createChart({ series: [ $.extend(sparseSeries, { labels: { visible: true } }) ] });
        var bar = chart._plotArea.charts[0].points[0];

        equal(bar.labelFrom.children[0].content, "");
    });

})();
