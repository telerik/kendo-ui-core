// ------------------------------------------------------------
(function() {
    function zIndexTests(seriesType) {
        var chart;

        module("Chart / Z-Index / " + seriesType + " / ", {
            setup: function() {
                var series = {
                    type: seriesType,
                    zIndex: 100
                };

                var fields = kendo.dataviz.SeriesBinder.current.valueFields(series);
                var sample = $.map(fields, function() {
                    return 1;
                });

                series.data = [sample];
                var widget = createChart({
                    series: [series]
                });

                chart = widget._plotArea.charts[0];
            },

            teardown: destroyChart
        });

        test("Chart root has no visual (pass-through to ChartContainer)", function() {
            ok(!chart.visual);
        });

        test("z-index is applied to points", function() {
            equal(chart.points[0].options.zIndex, 100);
        });
    }

    var targets = [
        "area", "bar", "column",
        "boxPlot", "ohlc", "candlestick",
        "bubble", "bullet", "line",
        "polarLine", "polarScatter", "polarArea",
        "radarLine", "radarArea", "radarColumn",
        "rangeBar", "waterfall",
        "scatter", "scatterLine"
    ];

    $.each(targets, function(i, type) {
        zIndexTests(type);
    });

    // ------------------------------------------------------------
    (function() {
        var chart;

        module("Chart / Z-Index / LinePoint", {
            setup: function() {
                var widget = createChart({
                    series: [{
                        type: "line",
                        data: [1, 1],
                        zIndex: 100
                    }]
                });

                chart = widget._plotArea.charts[0];
            },
            teardown: destroyChart
        });

        test("marker zIndex defaults to base zIndex + fraction", function() {
            equal(chart.points[0].marker.visual.options.zIndex, 100.1);
        });

        test("segment zIndex defaults to base zIndex", function() {
            equal(chart._segments[0].visual.options.zIndex, 100);
        });

        test("line chart default zIndex is 2", function() {
            var widget = createChart({
                series: [{
                    type: "line",
                    data: [1]
                }]
            });

            chart = widget._plotArea.charts[0];

            equal(chart.points[0].marker.visual.options.zIndex, 2.1);
        });
    })();
})();
