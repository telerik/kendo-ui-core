(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        TOLERANCE = 1;

    var crosshair,
        element,
        tooltip,
        chartBox = Box2D(0,0,200,200),
        plotArea, view;

    function PlotAreaStub() { }

    $.extend(PlotAreaStub.prototype, {
        options: {
            seriesColors: []
        },
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
        axis.getRoot = function() {
            return { parent: { element: $(document.body) } };
        };

        return axis;
    }

    function createCrosshair(options, axisOptions) {
        view = new ViewStub();
        crosshair = new dataviz.Crosshair(createAxis(), options);
        crosshair.getViewElements(view);
        element = crosshair.element;
    }

    function createTooltip(options) {
        createCrosshair();

        destroyTooltip();

        tooltip = new dataviz.CrosshairTooltip(crosshair, options);
    }

    function destroyTooltip() {
        if (tooltip) {
            tooltip.destroy();
        }
    }

    function showTooltip() {
        tooltip.showAt(new dataviz.Point2D(0, 0));
    }

    // ------------------------------------------------------------
    module("Crosshair / Configuration", {
        setup: function() {
            createCrosshair();
        }
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
        }
    });

    test("returns vertical points", function() {
        createCrosshair();
        points = crosshair.linePoints();
        deepEqual([points[0].x, points[0].y], [0,7.5]);
        deepEqual([points[1].x, points[1].y], [199,7.5]);
    });

    module("Crosshair / destroy", {
        setup: function() {
            createCrosshair();
        }
    });

    test("destroyes tooltip", function() {
        crosshair.tooltip = {
            destroy: function() {
                ok(true);
            }
        };
        crosshair.destroy();
    });

    // ------------------------------------------------------------
    module("Crosshair / Tooltip", {
        setup: function() {
            createTooltip();
        },
        teardown: destroyTooltip
    });

    test("does not render element initially", function() {
        equal($(".k-chart-tooltip").length, 0);
    });

    test("attaches to body on show", function() {
        showTooltip();

        equal(tooltip.element.parent("body").length, 1);
    });

    test("detaches from body on destroy", function() {
        tooltip.destroy();

        equal($(".k-chart-tooltip").length, 0);
    });

    test("tooltip anchor accounts for tooltip height", function() {
        createTooltip({ template: "<div style='width: 200px; height: 100px;' />"});
        showTooltip();
        ok(tooltip.anchor.y < -49);
    });

})();
