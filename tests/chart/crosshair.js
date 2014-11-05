(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        TOLERANCE = 1;

    var crosshair,
        line,
        tooltip,
        chartBox = Box2D(0,0,200,200),
        plotArea;

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
            return { chart: { element: $(document.body) } };
        };

        return axis;
    }

    function createCrosshair(options, axisOptions) {
        crosshair = new dataviz.Crosshair(createAxis(), options);
        crosshair.renderVisual();

        line = crosshair.line;
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
        equal(line.options.stroke.width, 2);
    });

    test("sets opacity", function() {
        createCrosshair({ opacity: 0.5 });
        equal(line.options.stroke.opacity, 0.5);
    });

    test("sets color", function() {
        createCrosshair({ color: "color" });
        equal(line.options.stroke.color, "color");
    });

    test("sets dashType", function() {
        createCrosshair({ dashType: "dashType" });
        equal(line.options.stroke.dashType, "dashType");
    });

    // ------------------------------------------------------------
    module("Crosshair / LinePoints", {
        setup: function() {
            createCrosshair();
        }
    });

    test("returns vertical points", function() {
        createCrosshair();
        var segments = line.segments;
        var start = segments[0].anchor();
        var end = segments[1].anchor();
        deepEqual([start.x, start.y], [0,7.5]);
        deepEqual([end.x, end.y], [199,7.5]);
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
