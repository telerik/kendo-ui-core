(function() {

    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(100, 100, 500, 500),
        center = new Point2D(300, 300),
        axis,
        altAxis,
        gridLines,
        plotBands,
        TOLERANCE = 1;

    function createAxis(options) {
        altAxis = {
            box: chartBox,
            majorIntervals: function() {
                return [90, 210, 330];
            },
            majorAngles: function() {
                return this.majorIntervals();
            }
        };

        axis = new dataviz.RadarNumericAxis(1, 3,
            deepExtend({
                min: 0,
                max: 3,
                majorUnit: 1
            }, options)
        );

        axis.reflow(new Box2D(300, 0, 310, 310));
        axis.plotArea = {
            options: {},
            polarAxis: altAxis
        };

        axis.renderVisual();
    }

    // ------------------------------------------------------------

    function setupGridLines(axisOptions) {
        createAxis(axisOptions);
        gridLines = axis.createGridLines(altAxis);
    }

    module("Radar Numeric Axis / Grid lines", {
        setup: function() {
            setupGridLines();
        }
    });

    test("renders major grid lines by default", function() {
        equal(gridLines.length, 3);
    });

    test("points are placed on alt axis intervals", function() {
        var segments = gridLines[0].segments;

        close(segments[0].anchor().x, 300, TOLERANCE);
        close(segments[0].anchor().y, 204, TOLERANCE);

        close(segments[1].anchor().x, 383, TOLERANCE);
        close(segments[1].anchor().y, 348, TOLERANCE);

        close(segments[2].anchor().x, 217, TOLERANCE);
        close(segments[2].anchor().y, 348, TOLERANCE);
    });

    test("applies major grid line color", function() {
        setupGridLines({ majorGridLines: { color: "red" } });

        equal(gridLines[0].options.stroke.color, "red");
    });

    test("applies major grid line width", function() {
        setupGridLines({ majorGridLines: { width: 2 } });

        equal(gridLines[0].options.stroke.width, 2);
    });

    test("renders minor grid lines", function() {
        setupGridLines({
            majorGridLines: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        });

        equal(gridLines.length, 15);
    });

    test("applies minor grid line color", function() {
        setupGridLines({
            majorGridLines: {
                visible: false
            },
            minorGridLines: {
                visible: true,
                color: "red"
            }
        });

        equal(gridLines[0].options.stroke.color, "red");
    });

    test("applies minor grid line width", function() {
        setupGridLines({
            majorGridLines: {
                visible: false
            },
            minorGridLines: {
                visible: true,
                width: 4
            }
        });

        equal(gridLines[0].options.stroke.width, 4);
    });

    // ------------------------------------------------------------
    module("Radar Numeric Axis / Grid arcs", {
        setup: function() {
            setupGridLines({
                majorGridLines: {
                    type: "arc"
                }
            });
        }
    });

    test("renders major grid arcs", function() {
        equal(gridLines.length, 3);
    });

    test("circle center is on alt axis center", function() {
        var c = gridLines[0].geometry().center;

        close(c.x, 300, TOLERANCE);
        close(c.y, 300, TOLERANCE);
    });

    test("circle radius matches value", function() {
        close(gridLines[0].geometry().radius, 96, TOLERANCE);
        close(gridLines[1].geometry().radius, 194, TOLERANCE);
        close(gridLines[2].geometry().radius, 292, TOLERANCE);
    });

    test("applies major grid line color", function() {
        setupGridLines({ majorGridLines: { type: "arc", color: "red" } });

        equal(gridLines[0].options.stroke.color, "red");
    });

    test("applies major grid line width", function() {
        setupGridLines({ majorGridLines: { type: "arc", width: 2 } });

        equal(gridLines[0].options.stroke.width, 2);
    });

    test("renders minor grid arcs", function() {
        setupGridLines({
            majorGridLines: {
                visible: false
            },
            minorGridLines: {
                type: "arc",
                visible: true
            }
        });

        equal(gridLines.length, 15);
    });

    test("applies minor grid line color", function() {
        setupGridLines({
            majorGridLines: { visible: false },
            minorGridLines: { visible: true, type: "arc", color: "red" }
        });

        equal(gridLines[0].options.stroke.color, "red");
    });

    test("applies minor grid line width", function() {
        setupGridLines({
            majorGridLines: { visible: false },
            minorGridLines: { visible: true, type: "arc", width: 2 }
        });

        equal(gridLines[0].options.stroke.width, 2);
    });

    // ------------------------------------------------------------
    module("Radar Numeric Axis / Plot Bands / Polygons", {
        setup: function() {
            createAxis({
                line: {
                    visible: false
                },
                majorTicks: {
                    visible: false
                },
                plotBands: [{
                    from: 0,
                    to: 1,
                    opacity: 0.5,
                    color: "red"
                }]
            });
            plotBands = axis._plotbandGroup.children;
        }
    });

    test("renders polygon", function() {
        equal(plotBands[0].segments.length, 8);
    });

    test("polygon is closed", function() {
        equal(plotBands[0].options.closed, true);
    });

    test("polygon points are on circle", function() {
        arrayClose(mapSegments(plotBands[0].segments), [
            [300, 204], [383, 348], [217, 348], [300, 204],
            [302, 299], [298, 299], [300, 302], [302, 298]
        ], TOLERANCE);
    });

    test("renders color", function() {
        equal(plotBands[0].options.fill.color, "red");
    });

    test("renders opacity", function() {
        equal(plotBands[0].options.fill.opacity, 0.5);
    });

    test("renders z index", function() {
        equal(axis._plotbandGroup.options.zIndex, -1);
    });

    // ------------------------------------------------------------
    module("Radar Numeric Axis / Plot Bands / Arcs", {
        setup: function() {
            createAxis({
                majorGridLines: {
                    type: "arc"
                },
                plotBands: [{
                    from: 1,
                    to: 2,
                    opacity: 0.5,
                    color: "red"
                }]
            });
            plotBands = axis._plotbandGroup.children;
        }
    });

    test("renders ring", function() {
        equal(plotBands.length, 1);
        closePaths(plotBands[0], dataviz.ShapeBuilder.current.createRing({
            angle: 360,
            startAngle: 0,
            c: {
                x: 300,
                y: 300
            },
            ir: 95.8,
            r: 194.7
        }), TOLERANCE);
    });

    test("renders color", function() {
        equal(plotBands[0].options.fill.color, "red");
    });

    test("renders opacity", function() {
        equal(plotBands[0].options.fill.opacity, 0.5);
    });

    test("renders z index", function() {
        equal(axis._plotbandGroup.options.zIndex, -1);
    });

    // ------------------------------------------------------------
    module("Radar Numeric Axis / getValue", {
        setup: function() {
            createAxis();
        }
    });

    test("value for point on axis", function() {
        var p = Point2D.onCircle(center, 90, 100);
        close(axis.getValue(p), 1, 0.02);
    });

    test("value for point on major gridline", function() {
        var p = Point2D.onCircle(center, 210, 100);
        close(axis.getValue(p), 1, 0.02);
    });

    test("value for point between gridlines (middle)", function() {
        var p = Point2D.onCircle(center, 135, 50);
        close(axis.getValue(p), 1, 0.02);
    });

    test("value for point between gridlines (near first)", function() {
        var p = Point2D.onCircle(center, 110, 65);
        close(axis.getValue(p), 1, 0.02);
    });

    test("value for point between gridlines (near second)", function() {
        var p = Point2D.onCircle(center, 190, 65);
        close(axis.getValue(p), 1, 0.02);
    });

    // ------------------------------------------------------------
    module("Radar Numeric Axis / getValue / Arcs", {
        setup: function() {
            createAxis({
                majorGridLines: {
                    type: "arc"
                }
            });
        }
    });

    test("value for point on axis", function() {
        var p = Point2D.onCircle(center, 90, 100);
        close(axis.getValue(p), 1, 0.02);
    });

    test("value for point on gridline", function() {
        var p = Point2D.onCircle(center, 210, 100);
        close(axis.getValue(p), 1, 0.02);
    })

    test("value for point between gridline", function() {
        var p = Point2D.onCircle(center, 145, 100);
        close(axis.getValue(p), 1, 0.02);
    });;

    (function() {
        var chart,
            label,
            plotArea;

        function axisLabelClick(clickHandler, options) {
            chart = createChart($.extend(true, {
                series: [{
                    type: "radarColumn",
                    field: "value"
                }],
                axisLabelClick: clickHandler
            }, options));

            plotArea = chart._model.children[1];
            label = plotArea.valueAxis.labels[1];
            clickChart(chart, getChartDomElement(label));
        }

        // ------------------------------------------------------------
        module("Radar Numeric Axis / Events / axisLabelClick", {
            teardown: destroyChart
        });

        test("fires when clicking axis labels", 1, function() {
            axisLabelClick(function() { ok(true); });
        });

        test("event arguments contain axis options", 1, function() {
            axisLabelClick(function(e) {
                equal(e.axis.type, "numeric");
            });
        });

        test("event arguments contain DOM element", 1, function() {
            axisLabelClick(function(e) {
                equal(e.element.length, 1);
            });
        });

        test("event arguments contain index", 1, function() {
            axisLabelClick(function(e) {
                equal(e.index, 1);
            });
        });

        test("event arguments contain value", 1, function() {
            axisLabelClick(function(e) {
                equal(e.value, 0.2);
            });
        });
    })();

})();
