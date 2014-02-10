(function() {
    var dataviz = kendo.dataviz,
        getElement = dataviz.getElement,
        Box2D = dataviz.Box2D,
        plotArea,
        categoryAxis,
        valueAxis;


    function createPlotArea(series, options) {
        plotArea = new dataviz.RadarPlotArea(series, options);

        categoryAxis = plotArea.categoryAxis;
        valueAxis = plotArea.valueAxis;

        chartSeries = plotArea.charts[0];
    }

    // ------------------------------------------------------------
    module("Radar Plot Area / Axes", {
        setup: function() {
            createPlotArea([{ type: "radarLine", data: [] }]);
        }
    });

    test("roundToMajorUnit is set to false", function() {
        equal(valueAxis.options.roundToMajorUnit, false);
    });

    test("value axis grid lines are set to 'arc' for radarColumn series", function() {
        createPlotArea([{ type: "radarColumn", data: [] }]);
        equal(valueAxis.options.majorGridLines.type, "arc");
        equal(valueAxis.options.minorGridLines.type, "arc");
    });

    test("roundToMajorUnit is set to false for radarColumn series", function() {
        createPlotArea([{ type: "radarColumn", data: [] }]);
        equal(valueAxis.options.roundToMajorUnit, false);
    });

    // ------------------------------------------------------------
    module("Radar Plot Area / Legend");

    test("adds series legend items", function() {
        createPlotArea([{ type: "radarColumn", data: [], name: "Foo" }]);

        equal(plotArea.options.legend.items.length, 1);
    });


    // ------------------------------------------------------------
    module("Radar Plot Area / Configuration");

    test("default axisBox padding is 15% of smallest dimension", function() {
        createPlotArea([{ type: "radarColumn", data: [] }]);
        plotArea.reflow(new Box2D(0, 0, 100, 200));

        equal(plotArea.axisBox.width(), 70);
        equal(plotArea.axisBox.height(), 170);
    });

    test("default axisBox padding can be overriden", function() {
        createPlotArea([{ type: "radarColumn", data: [] }], {
            plotArea: { padding: 10 }
        });
        plotArea.reflow(new Box2D(0, 0, 100, 200));

        equal(plotArea.axisBox.width(), 80);
        equal(plotArea.axisBox.height(), 180);
    });

    test("default axisBox padding can be overriden (partial)", function() {
        createPlotArea([{ type: "radarColumn", data: [] }], {
            plotArea: { padding: { top: 10 } }
        });
        plotArea.reflow(new Box2D(0, 0, 100, 200));

        equal(plotArea.axisBox.width(), 70);
        equal(plotArea.axisBox.height(), 175);
    });

    // ------------------------------------------------------------
    module("Radar Plot Area / Charts");

    test("first series gap setting is applied to radarColumn charts", function() {
        createPlotArea([{ type: "radarColumn", data: [], gap: 2 }]);

        equal(plotArea.charts[0].options.gap, 2);
    });

    test("first series spacing setting is applied to radarColumn charts", function() {
        createPlotArea([{ type: "radarColumn", data: [], spacing: 2 }]);

        equal(plotArea.charts[0].options.spacing, 2);
    });

    function assertStackedSeries(seriesType) {
        // ------------------------------------------------------------
        module("Radar Plot Area / Stacked " + seriesType + " /");

        test("sets isStacked when first series is stacked", function() {
            createPlotArea([{
                type: seriesType, data: [], stack: true
            }, {
                type: seriesType, data: []
            }]);

            ok(chartSeries.options.isStacked);
        });

        test("does not set isStacked when first and only series is stacked", function() {
            createPlotArea([{
                type: seriesType, data: [], stack: true
            }]);

            ok(!chartSeries.options.isStacked);
        });

        test("sets isStacked and isStacked100 when first series is 100% stacked", function() {
            createPlotArea([{
                type: seriesType, data: [], stack: { type: "100%" }
            }, {
                type: seriesType, data: []
            }]);

            ok(chartSeries.options.isStacked);
            ok(chartSeries.options.isStacked100);
        });

        test("does not set isStacked and isStacked100 when only series is 100% stacked", function() {
            createPlotArea([{
                type: seriesType, data: [], stack: { type: "100%" }
            }]);

            ok(!chartSeries.options.isStacked);
            ok(!chartSeries.options.isStacked100);
        });
    }

    assertStackedSeries("radarColumn");
    assertStackedSeries("radarLine");
    assertStackedSeries("radarArea");

    function assertStacked100(seriesType) {
        var series = [{
            type: seriesType,
            stack: { type: "100%" },
            data: [1, 2],
            labels: { }
        }];

        series.push(series[0]);

        // ------------------------------------------------------------
        module("Radar Plot Area / 100% Stacked " + seriesType + " /");

        test("sets value axis roundToMajorUnit to false", function() {
            createPlotArea(series);
            ok(!plotArea.valueAxis.options.roundToMajorUnit);
        });

        test("roundToMajorUnit can be overriden", function() {
            createPlotArea(series, { valueAxis: { roundToMajorUnit: false } });
            ok(!plotArea.valueAxis.options.roundToMajorUnit);
        });

        test("default value axis label format is set to P0", function() {
            createPlotArea(series);
            deepEqual(plotArea.valueAxis.options.labels.format, "P0");
        });

        test("default value axis label format can be overriden", function() {
            createPlotArea(series, { valueAxis: { labels: { format: "N" } } });
            deepEqual(plotArea.valueAxis.options.labels.format, "N");
        });
    }

    assertStacked100("radarColumn");
    assertStacked100("radarLine");
    assertStacked100("radarArea");

    (function() {
        var chart,
            point,
            pointElement,
            plotArea,
            plotAreaElement;

        var TOLERANCE = 5;

        function createRadarChart(options) {
            chart = $("<div id='container' style='width: 600px; height: 400px;' />").appendTo(QUnit.fixture).kendoChart($.extend({
                series: [{
                    type: "radarLine",
                    data: [1, 2, 3],
                    markers: { visible: true }
                }],
                categoryAxis: {
                    categories: ["A", "B", "C"]
                }
            }, options)).data("kendoChart");

            $("#container").css({ position: "absolute", top: "200px", left: "8px" });

            plotArea = chart._model.children[1];
            plotAreaElement = getElement(plotArea.id);
            point = plotArea.charts[0].points[0];
            pointElement = $(getElement(point.id));
        }

        // ------------------------------------------------------------
        module("Radar Plot Area / Events / plotAreaClick", {
            teardown: destroyChart
        });

        test("point click bubbles to plot area", function() {
            createRadarChart({
                plotAreaClick: function() { ok(true); }
            });

            clickChart(chart, pointElement, 300, 300);
        });

        test("fires when clicking plot area directly", function() {
            createRadarChart({
                plotAreaClick: function() { ok(true); }
            });

            clickChart(chart, plotAreaElement, 300, 300);
        });

        test("does not fire when clicking outside of axis range", 0, function() {
            createRadarChart({
                plotAreaClick: function() { ok(false); }
            });

            clickChart(chart, plotAreaElement, 300, 580);
        });

        test("does not fire when clicking on axes", 0, function() {
            createRadarChart({
                plotAreaClick: function() { ok(false); }
            });

            clickChart(chart, plotAreaElement, 3000, 0);
        });

        test("event arguments contain value", 1, function() {
            createRadarChart({
                plotAreaClick: function(e) { close(e.value, 0.4, TOLERANCE); }
            });

            clickChart(chart, plotAreaElement, 300, 400);
        });

        test("event arguments contain category", 1, function() {
            createRadarChart({
                plotAreaClick: function(e) { equal(e.category, "A"); }
            });

            clickChart(chart, plotAreaElement, 300, 300);
        });

        test("event arguments contain empty category", 1, function() {
            createRadarChart({
                categoryAxis: {
                    categories: ["A"]
                },
                plotAreaClick: function(e) { equal(e.category, ""); }
            });

            clickChart(chart, plotAreaElement, 300, 400);
        });

        test("event arguments contain date category", 1, function() {
            var date = new Date("2012/09/15");
            createRadarChart({
                categoryAxis: {
                    categories: [date]
                },
                plotAreaClick: function(e) { equal(e.category.toString(), date.toString()); }
            });

            clickChart(chart, plotAreaElement, 300, 300);
        });

    })();
})();
