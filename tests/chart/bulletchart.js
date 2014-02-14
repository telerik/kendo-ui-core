(function() {
    var dataviz = kendo.dataviz,
        getElement = dataviz.getElement,
        Box2D = dataviz.Box2D,
        categoriesCount = dataviz.categoriesCount,
        chartBox = new Box2D(0, 0, 800, 600),
        series,
        view;

    function stubPlotArea(getCategorySlot, getValueSlot, options) {
        return new function() {
            this.categoryAxis = this.primaryCategoryAxis = {
                getSlot: getCategorySlot,
                options: {
                    axisCrossingValue: 0,
                    categories: options.categoryAxis.categories
                }
            };

            this.valueAxis = {
                getSlot: getValueSlot,
                options: {
                    axisCrossingValue: 0
                }
            };

            this.namedCategoryAxes = { };
            this.namedValueAxes = {};

            this.seriesCategoryAxis = function(series) {
                return series.categoryAxis ?
                    this.namedCategoryAxes[series.categoryAxis] : this.primaryCategoryAxis;
            };

            this.options = options;
        };
    }

    (function() {
        var bulletChart;

        var plotArea = stubPlotArea(
            function(categoryIndex) {
                return new Box2D();
            },
            function(from, to) {
                return new Box2D(0, 0, to || from, 0);
            },
            {
                categoryAxis: {
                    categories: ["A"]
                }
            }
        );

        // ------------------------------------------------------------
        module("Bullet Chart / Rendering", {
            setup: function() {
                bulletChart = new dataviz.BulletChart(plotArea, {
                    series: [{
                        data: [[0, 0]],
                        color: "#f00",
                        opacity: 0.5,
                        overlay: "none"
                    }]
                });
            }
        });

        test("applies series fill color to bars", function() {
            equal(bulletChart.points[0].options.color, "#f00");
        });

        test("applies series opacity color to bullets", function() {
            equal(bulletChart.points[0].options.opacity, 0.5);
        });

        test("applies series overlay to bullets", function() {
            equal(bulletChart.points[0].options.overlay, "none");
        });

        test("applies color function", function() {
            bulletChart = new dataviz.BulletChart(plotArea, {
                series: [{
                    type: "bullet",
                    data: [[0, 0]],
                    color: function(bullet) { return "#f00" }
                }]
            });

            equal(bulletChart.points[0].options.color, "#f00");
        });

        test("color fn argument contains value", 2, function() {
            new dataviz.BulletChart(plotArea, {
                series: [{
                    type: "bullet",
                    data: [[0, 1]],
                    color: function(bullet) {
                        equal(bullet.value.current, 0);
                        equal(bullet.value.target, 1);
                    }
                }]
            });
        });

        test("color fn argument contains series", 1, function() {
            new dataviz.BulletChart(plotArea, {
                series: [{
                    type: "bullet",
                    name: "series 1",
                    data: [[0, 0]],
                    color: function(bubble) { equal(bubble.series.name, "series 1"); }
                }]
            });
        });

        test("sets bar size to current value", function() {
            bulletChart = new dataviz.BulletChart(plotArea, {
                series: [{
                    type: "bullet",
                    data: [[10, 15]],
                    notes: { label: { } }
                }],
                invertAxes: true
            });
            bulletChart.reflow(chartBox);

            equal(bulletChart.points[0].box.x2, 10);
        });

        test("sets target position to target value", function() {
            bulletChart = new dataviz.BulletChart(plotArea, {
                series: [{
                    type: "bullet",
                    data: [[10, 15]],
                    notes: { label: { } }
                }],
                invertAxes: true
            });
            bulletChart.reflow(chartBox);

            equal(bulletChart.points[0].target.box.x2, 15);
        });

    })();

    (function() {
        var chart;

        function createBulletChart(options) {
            chart = createChart(kendo.deepExtend({
                series: [{
                    type: "bullet",
                    data: [[1,2]]
                }]
            }, options));
        }

        // ------------------------------------------------------------
        module("Bullet Chart / Configuration", {
            teardown: function() {
                destroyChart();
            }
        });

        test("forces categoryAxis.justified to false", function() {
            createBulletChart({
                categoryAxis: {
                    justified: true
                }
            });

            ok(!chart._plotArea.categoryAxis.options.justified);
        });

        test("with no data should not render target", function() {
            createBulletChart({
                series: [{
                    type: "bullet",
                    data: []
                }]
            });

            ok(typeof chart._plotArea.charts[0].points[0].target === "undefined");
        });
    })();
})();
