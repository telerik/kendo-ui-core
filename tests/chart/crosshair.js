(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        TOLERANCE = 1;

    (function() {
        var crosshair, element,
            chartBox = Box2D(0,0,200,200),
            plotArea, view;

        function PlotAreaStub() { }

        $.extend(PlotAreaStub.prototype, {
            options: { },
            backgroundBox: function () {
                return chartBox;
            }
        });

        function createAxis(options) {
            options = options || {};
            var axis = new dataviz.NumericAxis(0, 1, options);
            axis.reflow(chartBox);
            axis.plotArea = new PlotAreaStub();
            var categoryAxis = new dataviz.CategoryAxis(
                $.extend({
                    categories: ["Foo", "Bar"]
                }, options)
            );
            categoryAxis.reflow(chartBox);

            axis.pane = { axes: [categoryAxis] };
            return axis;
        }

        function createCrosshair(options, axisOptions) {
            view = new ViewStub();
            crosshair = new dataviz.Crosshair(createAxis(), options);
            crosshair.getViewElements(view);
            element = crosshair.element;
        }

        // ------------------------------------------------------------
        module("Crosshair / Configuration", {
            setup: function() {
                createCrosshair();
            },
            teardown: destroyMeasureBox
        });

        test("sets width", function() {
            createCrosshair({ width: 2 });
            equal(element.options.strokeWidth, 2);
        });

        test("sets opacity", function() {
            createCrosshair({ opacity: 0.5 });
            equal(element.options.strokeOpacity, 0.5);
        });

        test("sets color", function() {
            createCrosshair({ color: "color" });
            equal(element.options.stroke, "color");
        });

        test("sets dashType", function() {
            createCrosshair({ dashType: "dashType" });
            equal(element.options.dashType, "dashType");
        });

        // ------------------------------------------------------------
        module("Crosshair / LinePoints", {
            setup: function() {
                createCrosshair();
            },
            teardown: destroyMeasureBox
        });

        test("returns vertical points", function() {
            createCrosshair();
            points = crosshair.linePoints();
            deepEqual([points[0].x, points[0].y], [0,7.5]);
            deepEqual([points[1].x, points[1].y], [199,7.5]);
        });

    })();
})();
