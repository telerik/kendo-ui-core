(function() {
    var dataviz = kendo.dataviz,
        getElement = dataviz.getElement,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(100, 100, 1000, 1000),
        plotArea,
        categoryAxis,
        valueAxis;


    function createPlotArea(series, options) {
        plotArea = new dataviz.PolarPlotArea(series, options);

        categoryAxis = plotArea.categoryAxis;
        valueAxis = plotArea.valueAxis;

        chartSeries = plotArea.charts[0];
    }

    // ------------------------------------------------------------
    module("Polar Plot Area / Axes", {
        setup: function() {
            createPlotArea([{ type: "polarLine", data: [] }]);
        }
    });

    test("roundToMajorUnit is set to false", function() {
        equal(valueAxis.options.roundToMajorUnit, false);
    });

    // ------------------------------------------------------------
    module("Polar Plot Area / Legend");

    test("adds series legend items", function() {
        createPlotArea([{ type: "polarLine", data: [], name: "Foo" }]);

        equal(plotArea.options.legend.items.length, 1);
    });

    (function() {
        var chart,
            point,
            pointElement,
            plotArea,
            plotAreaElement;

        var TOLERANCE = 5;

        function createPolarChart(options) {
            chart = $("<div id='container' style='width: 600px; height: 400px;' />").appendTo(QUnit.fixture).kendoChart($.extend({
                series: [{
                    type: "polarLine",
                    data: [[120, 10]],
                    markers: { visible: true }
                }]
            }, options)).data("kendoChart");


            $("#container").css({ position: "absolute", top: "200px", left: "8px" });

            plotArea = chart._model.children[1];
            plotAreaElement = getElement(plotArea.id);
            point = plotArea.charts[0].points[0];
            pointElement = $(getElement(point.id));
        }

        // ------------------------------------------------------------
        module("Polar Plot Area / Events / plotAreaClick", {
            setup: function() {
                $(document.body).css("margin", "0").css("padding", "0");
            },
            teardown: function() {
                destroyChart();
                $(document.body).css("margin", "");
            }
        });

        test("point click bubbles to plot area", function() {
            createPolarChart({
                plotAreaClick: function() { ok(true); }
            });

            clickChart(chart, pointElement, 300, 300);
        });

        test("fires when clicking plot area directly", function() {
            createPolarChart({
                plotAreaClick: function() { ok(true); }
            });

            clickChart(chart, plotAreaElement, 300, 300);
        });

        test("does not fire when clicking outside of axis range", 0, function() {
            createPolarChart({
                plotAreaClick: function() { ok(false); }
            });

            clickChart(chart, plotAreaElement, 300, 580);
        });

        test("does not fire when clicking on axes", 0, function() {
            createPolarChart({
                plotAreaClick: function() { ok(false); }
            });

            clickChart(chart, plotAreaElement, 3000, 0);
        });

        test("event arguments contain x value", 1, function() {
            createPolarChart({
                plotAreaClick: function(e) { close(e.x, 180, TOLERANCE); }
            });

            clickChart(chart, plotAreaElement, 300, 400);
        });

        test("event arguments contain y value", 1, function() {
            createPolarChart({
                plotAreaClick: function(e) { close(e.y, 6, TOLERANCE); }
            });

            clickChart(chart, plotAreaElement, 300, 300);
        });

    })();
})();
