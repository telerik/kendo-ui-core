(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(100, 100, 500, 500),
        center = new Point2D(300, 300),
        gridLines,
        axis,
        altAxis,
        TOLERANCE = 4;

    function getAxisTextBoxes() {
        return $.map(axis.labels, function(item) {
            return item.visual;
        });
    }

    function getAxisTextBackgrounds() {
        return $.map(getAxisTextBoxes(), function(item) {
            return item.children[0];
        });
    }

    function getAxisTexts() {
        return $.map(getAxisTextBoxes(), function(item) {
            return kendo.util.last(item.children);
        });
    }

    function createAxis(options) {
        altAxis = {
            options: { visible: true },
            lineBox: function() { return new Box2D(300, 100, 300, 300); }
        };

        axis = new dataviz.PolarAxis(options);
        axis.reflow(chartBox);
        axis.plotArea = {
            options: {},
            valueAxis: altAxis
        };

        axis.renderVisual();
    }

    // ------------------------------------------------------------
    module("Polar Numeric Axis / Rendering", {
        setup: function() {
            createAxis();
        }
    });

    test("line box equals box", function() {
        deepEqual(axis.lineBox(), axis.box);
    });

    test("creates labels", 1, function() {
        equalTexts(getAxisTexts(), ["0", "60", "120", "180", "240", "300"]);
    });

    test("creates labels with full format", 1, function() {
        createAxis({ categories: [1, 2], labels: { format: "{0:N2}"} });

        equalTexts(getAxisTexts(), ["0.00", "60.00", "120.00", "180.00", "240.00", "300.00"]);
    });

    test("creates labels with simple format", 1, function() {
        createAxis({ categories: [1, 2], labels: { format: "N2"} });

        equalTexts(getAxisTexts(), ["0.00", "60.00", "120.00", "180.00", "240.00", "300.00"]);
    });

    test("labels can be hidden", function() {
        createAxis({
            labels: {
                visible: false
            }
        });

        equal(axis.labels.length, 0);
    });

    test("labels have set template", 1, function() {
        createAxis({
            labels: {
                template: "|${ data.value }|"
            }
        });

        equal(getAxisTexts()[0].content(), "|0|");
    });

    test("labels have set color", 1, function() {
        createAxis({
            labels: {
                color: "#f00"
            }
        });

        equal(getAxisTexts()[0].options.fill.color, "#f00");
    });

    test("labels have set background", 1, function() {
        createAxis({
            labels: {
                background: "#f0f"
            }
        });

        equal(getAxisTextBackgrounds()[0].options.fill.color, "#f0f");
    });

    test("labels have set zIndex", 1, function() {
        createAxis({
            zIndex: 2
        });

        equal(getAxisTextBoxes()[0].options.zIndex, 2);
    });

    test("labels are distributed on major divisions", function() {
        closeTextPosition("", getAxisTexts(), [[510, 293], [410, 102], [169, 102],
             [69, 293], [169, 483], [410, 483]], TOLERANCE);
    });

    test("labels margin is applied", function() {
        createAxis({ labels: { margin: 5 } });

        closeTextPosition("", getAxisTexts(), [[505, 293], [405, 107], [174, 107],
             [74, 293], [174, 478], [406, 478]], TOLERANCE);
    });

    test("labels are distributed in reverse", function() {
        createAxis({ reverse: true });

        closeTextPosition("", getAxisTexts(), [[510, 293], [410, 483], [169, 483],
             [69, 293], [169, 102], [410, 102]], TOLERANCE);
    });

    // ------------------------------------------------------------
    module("Polar Numeric Axis / Intervals", {
        setup: function() {
            createAxis();
        }
    });

    test("major intervals in normal order", function() {
        deepEqual(axis.majorIntervals(), [ 0, 60, 120, 180, 240, 300 ]);
    });

    test("minor intervals in normal order", function() {
        deepEqual(axis.minorIntervals(),
            [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330 ]);
    });

    // ------------------------------------------------------------
    var slot;

    module("Polar Numeric Axis / Slots", {
        setup: function() {
            createAxis();
            slot = axis.getSlot(60);
        }
    });

    test("slot center matches box center", function() {
        equal(slot.c.x, 300);
        equal(slot.c.y, 300);
    });

    test("slot inner radius is 0", function() {
        equal(slot.ir, 0);
    });

    test("slot radius is half box height", function() {
        equal(slot.r, 200);
    });

    test("slot position", function() {
        equal(slot.startAngle, 120);
        equal(slot.angle, 0);
    });

    test("slot position with rotation", function() {
        createAxis({ startAngle: 180 });

        slot = axis.getSlot(60);
        equal(slot.startAngle, 300);
        equal(slot.angle, 0);
    });

    test("slot position in reverse", function() {
        createAxis({ reverse: true });

        slot = axis.getSlot(60);
        equal(slot.startAngle, 240);
        equal(slot.angle, 0);
    });

    test("slot position in reverse with rotation", function() {
        createAxis({ reverse: true, startAngle: 180 });

        slot = axis.getSlot(60);
        equal(slot.startAngle, 60);
        equal(slot.angle, 0);
    });

    test("slot for range", function() {
        slot = axis.getSlot(60, 120);
        equal(slot.startAngle, 60);
        equal(slot.angle, 60);
    });

    test("slot for range in reverse", function() {
        createAxis({ reverse: true });

        slot = axis.getSlot(60, 120);
        equal(slot.startAngle, 240);
        equal(slot.angle, 60);
    });

    test("from value can't be lower than 0", function() {
        slot = axis.getSlot(-1);
        equal(slot.startAngle, 180);
    });

    test("caps from value to range", function() {
        slot = axis.getSlot(1000);
        equal(slot.startAngle, 180);
    });

    test("to value equals from value when smaller", function() {
        slot = axis.getSlot(60, 30);
        equal(slot.startAngle, 120);
        equal(slot.angle, 0);
    });

    // ------------------------------------------------------------
    module("Polar Numeric Axis / getValue", {
        setup: function() {
            createAxis();
        }
    });

    test("value @ 0 deg", function() {
        var p = Point2D.onCircle(center, 0, 100);
        equal(axis.getValue(p), 180);
    });

    test("value @ 90 deg", function() {
        var p = Point2D.onCircle(center, 90, 100);
        equal(axis.getValue(p), 90);
    });

    test("value @ 120 def", function() {
        var p = Point2D.onCircle(center, 120, 100);
        equal(axis.getValue(p), 60);
    });

    test("value @ 270 def", function() {
        var p = Point2D.onCircle(center, 270, 100);
        equal(axis.getValue(p), 270);
    });

    // ------------------------------------------------------------
    module("Polar Numeric Axis / getValue / reverse", {
        setup: function() {
            createAxis({
                reverse: true
            });
        }
    });

    test("value @ 0 deg", function() {
        var p = Point2D.onCircle(center, 0, 100);
        equal(axis.getValue(p), 180);
    });

    test("value @ 90 deg", function() {
        var p = Point2D.onCircle(center, 90, 100);
        equal(axis.getValue(p), 270);
    });

    test("value @ 120 def", function() {
        var p = Point2D.onCircle(center, 120, 100);
        equal(axis.getValue(p), 300);
    });

    test("value @ 270 def", function() {
        var p = Point2D.onCircle(center, 270, 100);
        equal(axis.getValue(p), 90);
    });

    // ------------------------------------------------------------
    module("Polar Numeric Axis / getValue / startAngle", {
        setup: function() {
            createAxis({
                startAngle: 90
            });
        }
    });

    test("value @ 0 deg", function() {
        var p = Point2D.onCircle(center, 0, 100);
        equal(axis.getValue(p), 90);
    });

    test("value @ 90 deg", function() {
        var p = Point2D.onCircle(center, 90, 100);
        equal(axis.getValue(p), 0);
    });

    test("value @ 120 def", function() {
        var p = Point2D.onCircle(center, 120, 100);
        equal(axis.getValue(p), 330);
    });

    test("value @ 270 def", function() {
        var p = Point2D.onCircle(center, 270, 100);
        equal(axis.getValue(p), 180);
    });

    // ------------------------------------------------------------
    module("Polar Numeric Axis / getValue / startAngle / reverse", {
        setup: function() {
            createAxis({
                startAngle: 90,
                reverse: true
            });
        }
    });

    test("value @ 0 deg", function() {
        var p = Point2D.onCircle(center, 0, 100);
        equal(axis.getValue(p), 270);
    });

    test("value @ 90 deg", function() {
        var p = Point2D.onCircle(center, 90, 100);
        equal(axis.getValue(p), 0);
    });

    test("value @ 120 def", function() {
        var p = Point2D.onCircle(center, 120, 100);
        equal(axis.getValue(p), 30);
    });

    test("value @ 270 def", function() {
        var p = Point2D.onCircle(center, 270, 100);
        equal(axis.getValue(p), 180);
    });

    // ------------------------------------------------------------
    function setupGridLines(altAxis, axisOptions) {
        createAxis(axisOptions);
        gridLines = axis.createGridLines(altAxis);
    }

    module("Polar Numeric Axis / Grid lines", {
        setup: function() {
            setupGridLines(altAxis);
        }
    });

    test("renders major grid lines by default", function() {
        equal(gridLines.length, 6);
    });

    test("sets major grid lines default width", function() {
        equal(gridLines[0].options.stroke.width, 1);
    });

    test("major grid lines extend from axis center", function() {
        var anchor = gridLines[0].segments[0].anchor();
        equal(anchor.x, 300);
        equal(anchor.y, 300);
    });

    test("major grid lines extend to value axis end", function() {
        var anchor = gridLines[0].segments[1].anchor();
        close(anchor.x, 100, TOLERANCE);
        equal(anchor.y, 300);
    });

    test("renders 90 degree grid line when value axis is not visible", function() {
        setupGridLines({
            options: { visible: false },
            lineBox: altAxis.lineBox
        }, { majorUnit: 90 });
        var anchor = gridLines[1].segments[1].anchor();
        equal(anchor.x, 300);
        equal(anchor.y, 100);
    });

    test("applies major grid line color", function() {
        setupGridLines(altAxis, { majorGridLines: { color: "red" } });

        equal(gridLines[0].options.stroke.color, "red");
    });

    test("applies major grid line width", function() {
        setupGridLines(altAxis, { majorGridLines: { width: 2 } });
        equal(gridLines[0].options.stroke.width, 2);
    });

    test("renders minor grid lines", function() {
        setupGridLines(altAxis, {
            majorGridLines: {
                visible: false
            },
            minorGridLines: {
                visible: true
            }
        });
        equal(gridLines.length, 11);
    });

    test("applies minor grid line color", function() {
        setupGridLines(altAxis, {
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
        setupGridLines(altAxis, {
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
    module("Polar Numeric Axis / Grid lines / startAngle", {
        setup: function() {
            setupGridLines(altAxis, { startAngle: 10 });
        }
    });

    test("major grid lines are offset with start angle", function() {
        var ref = Point2D.onCircle(center, 350, 200),
            end = gridLines[0].segments[1].anchor();

        ok(ref.equals(end));
    });

    test("renders 90 degree grid line as it no longer overlaps the value axis", function() {
        setupGridLines(altAxis, { majorUnit: 90, startAngle: 10 });

        equal(gridLines.length, 4);
    });


    // ------------------------------------------------------------

    function getPlotBands() {
        return axis._plotbandGroup.children;
    }

    module("Polar Numeric Axis / Plot Bands", {
        setup: function() {
            createAxis({
                plotBands: [{
                    from: 60,
                    to: 120,
                    opacity: 0.5,
                    color: "red"
                }]
            });
        }
    });

    test("renders sectors", function() {
        equal(getPlotBands().length, 1);
    });

    test("renders sectors with correct angles", function() {
        closePaths(getPlotBands()[0], dataviz.ShapeBuilder.current.createRing({
            startAngle: 60,
            angle: 60,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
    });

    test("renders color", function() {
        equal(getPlotBands()[0].options.fill.color, "red");
    });

    test("renders opacity", function() {
        equal(getPlotBands()[0].options.fill.opacity, 0.5);
    });

    test("renders z index", function() {
        equal(axis._plotbandGroup.options.zIndex, -1);
    });

    (function() {
        var chart,
            label,
            plotArea;

        function axisLabelClick(clickHandler, options) {
            chart = createChart($.extend(true, {
                series: [{
                    type: "polarLine",
                    data: [[10, 100], [20, 200]]
                }],
                polarAxis: {
                    name: "Polar Axis"
                },
                axisLabelClick: clickHandler
            }, options));

            plotArea = chart._model.children[1];
            label = plotArea.polarAxis.labels[1];
            chart._userEvents.press(0, 0, getChartDomElement(label));
            chart._userEvents.end(0, 0);
        }

        // ------------------------------------------------------------
        module("Polar Numeric Axis / Events / axisLabelClick", {
            teardown: destroyChart
        });

        test("fires when clicking axis labels", 1, function() {
            axisLabelClick(function() { ok(true); });
        });

        test("event arguments contain axis options", 1, function() {
            axisLabelClick(function(e) {
                equal(e.axis.type, "polar");
            });
        });

        test("event arguments contain DOM element", 1, function() {
            axisLabelClick(function(e) {
                equal(e.element.length, 1);
            });
        });

        test("event arguments contain label index", 1, function() {
            axisLabelClick(function(e) {
                equal(e.index, 1);
            });
        });

        test("event arguments contain label text", 1, function() {
            axisLabelClick(function(e) {
                equal(e.text, 60);
            });
        });

        test("event arguments contain value", 1, function() {
            axisLabelClick(function(e) {
                equal(e.value, 60);
            });
        });

    })();
})();
