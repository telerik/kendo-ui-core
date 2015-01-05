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
            ok(chart.animation || !chart.visual);
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

        function createLineChart(seriesOptions) {
            seriesOptions = kendo.deepExtend({
                type: "line",
                data: [1, 1]
            }, seriesOptions);

            var widget = createChart({
                series: [seriesOptions]
            });

            chart = widget._plotArea.charts[0];
        }

        module("Chart / Z-Index / LinePoint", {
            setup: function() {
                createLineChart({
                    zIndex: 100
                });
            },
            teardown: destroyChart
        });

        test("segment zIndex defaults to base zIndex", function() {
            equal(chart._segments[0].visual.options.zIndex, 100);
        });

        test("segment zIndex defaults to base zIndex (smooth style)", function() {
            createLineChart({
                style: "smooth",
                zIndex: 100
            });
            equal(chart._segments[0].visual.options.zIndex, 100);
        });
    })();
})();
