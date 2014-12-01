(function() {
    var dataviz = kendo.dataviz,
        deepExtend = kendo.deepExtend,
        Point2D = dataviz.Point2D,
        Box2D = dataviz.Box2D,
        chartBox = new Box2D(100, 100, 500, 500),
        center = new Point2D(300, 300),
        axis,
        altAxis,
        plotBands,
        gridLines,
        TOLERANCE = 4;

    function createAxis(options) {
        altAxis = {
            options: { visible: true },
            lineBox: function() { return new Box2D(300, 100, 300, 300); }
        };

        axis = new dataviz.RadarCategoryAxis(
            deepExtend({
                categories: ["Foo", "Bar", "Baz"]
            }, options)
        );
        axis.reflow(chartBox);
        axis.plotArea = {
            options: {},
            valueAxis: altAxis
        };

        axis.renderVisual();
    }

    function getAxisTextBoxes() {
        return $.map(axis.labels, function(item) {
            return item.visual;
        });
    }

    function getAxisTexts() {
        return $.map(getAxisTextBoxes(), function(item) {
            return kendo.util.last(item.children);
        });
    }

    // ------------------------------------------------------------
    module("Radar Category Axis / Rendering", {
        setup: function() {
            createAxis();
        }
    });

    test("line box equals box", function() {
        deepEqual(axis.lineBox(), axis.box);
    });

    test("creates labels", 1, function() {
        equalTexts(getAxisTexts(), ["Foo", "Bar", "Baz"]);
    });

    test("creates labels with full format", 1, function() {
        createAxis({ categories: [1, 2], labels: { format: "{0:C}"} });

        equalTexts(getAxisTexts(), ["$1.00", "$2.00"]);
    });

    test("creates labels with simple format", 1, function() {
        createAxis({ categories: [1, 2], labels: { format: "C"} });

        equalTexts(getAxisTexts(), ["$1.00", "$2.00"]);
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

        equal(getAxisTexts()[0].content(), "|Foo|");
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

        equal(getAxisTextBoxes()[0].children[0].options.fill.color, "#f0f");
    });

    test("labels have set zIndex", 1, function() {
        createAxis({
            zIndex: 2
        });

        equal(getAxisTextBoxes()[0].options.zIndex, 2);
    });

    test("labels are distributed around axis (justified)", function() {
        closeTextPosition("", getAxisTexts(), [[289.5, 75], [482.535, 410], [92.795, 410]], TOLERANCE);
    });

    test("labels are distributed around axis (non-justified)", function() {
        createAxis({ justified: false });
        closeTextPosition("", getAxisTexts(), [[483, 175], [290.5, 510], [92.795, 175]], TOLERANCE);
    });

    test("labels margin is applied", function() {
        createAxis({ labels: { margin: 5 } });

        closeTextPosition("", getAxisTexts(), [[289.5, 80], [478, 405], [97.795, 405]], TOLERANCE);
    });

    test("labels are distributed in reverse (justified)", function() {
        createAxis({ reverse: true });

        closeTextPosition("", getAxisTexts(), [[289.5, 75], [92.795, 410], [482.535, 410]], TOLERANCE);
    });

    test("labels are distributed in reverse (non-justified)", function() {
        createAxis({ justified: false, reverse: true });

        closeTextPosition("", getAxisTexts(), [[96, 175], [290.5, 510], [483, 175]], TOLERANCE);
    });

    // ------------------------------------------------------------
    module("Radar Category Axis / Intervals", {
        setup: function() {
            createAxis();
        }
    });

    test("major intervals in normal order", function() {
        deepEqual(axis.majorIntervals(), [ 0, 120, 240 ]);
    });

    test("major intervals in reverse order", function() {
        createAxis({ reverse: true });
        deepEqual(axis.majorIntervals(), [ 0, 240, 120 ]);
    });

    test("minor intervals in normal order", function() {
        deepEqual(axis.minorIntervals(), [ 0, 60, 120, 180, 240, 300 ]);
    });

    test("minor intervals in reverse order", function() {
        createAxis({ reverse: true });
        deepEqual(axis.minorIntervals(), [ 0, 300, 240, 180, 120, 60 ]);
    });

    // ------------------------------------------------------------
    var slot;

    module("Radar Category Axis / Slots", {
        setup: function() {
            createAxis();
            slot = axis.getSlot(0);
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

    test("slot angle for first category (justified)", function() {
        equal(slot.startAngle, 30);
        equal(slot.angle, 120);
    });

    test("slot angle for first category (non-justified)", function() {
        createAxis({ justified: false });

        slot = axis.getSlot(0);
        equal(slot.startAngle, 90);
        equal(slot.angle, 120);
    });

    test("slot for first category in reverse (justified)", function() {
        createAxis({ reverse: true });

        slot = axis.getSlot(0);
        equal(slot.startAngle, 30);
        equal(slot.angle, 120);
    });

    test("slot for first category in reverse (non-justified)", function() {
        createAxis({ reverse: true, justified: false });

        slot = axis.getSlot(0);
        equal(slot.startAngle, 330);
        equal(slot.angle, 120);
    });

    test("slot angle for second category (justified)", function() {
        slot = axis.getSlot(1);
        equal(slot.startAngle, 150);
        equal(slot.angle, 120);
    });

    test("slot angle for second category (non-justified)", function() {
        createAxis({ justified: false });

        slot = axis.getSlot(1);
        equal(slot.startAngle, 210);
        equal(slot.angle, 120);
    });

    test("slot for second category in reverse (justified)", function() {
        createAxis({ reverse: true });

        slot = axis.getSlot(1);
        equal(slot.startAngle, 270);
        equal(slot.angle, 120);
    });

    test("slot for second category in reverse (non-justified)", function() {
        createAxis({ reverse: true, justified: false });

        slot = axis.getSlot(1);
        equal(slot.startAngle, 210);
        equal(slot.angle, 120);
    });

    test("slot angle for last category (justified)", function() {
        slot = axis.getSlot(2);
        equal(slot.startAngle, 270);
        equal(slot.angle, 120);
    });

    test("slot angle for last category (non-justified)", function() {
        createAxis({ justified: false });

        slot = axis.getSlot(2);
        equal(slot.startAngle, 330);
        equal(slot.angle, 120);
    });

    test("slot for last category in reverse (justified)", function() {
        createAxis({ reverse: true });

        slot = axis.getSlot(2);
        equal(slot.startAngle, 150);
        equal(slot.angle, 120);
    });

    test("slot for last category in reverse (non-justified)", function() {
        createAxis({ reverse: true, justified: false });

        slot = axis.getSlot(2);
        equal(slot.startAngle, 90);
        equal(slot.angle, 120);
    });

    test("slot for two categories (justified)", function() {
        slot = axis.getSlot(0, 1);
        equal(slot.startAngle, 30);
        equal(slot.angle, 240);
    });

    test("slot for two categories (non-justified)", function() {
        createAxis({ justified: false });

        slot = axis.getSlot(0, 1);
        equal(slot.startAngle, 90);
        equal(slot.angle, 240);
    });

    test("assumes 1 category when no categories are defined (justified)", function() {
        createAxis({ categories: [] });

        slot = axis.getSlot(0);
        equal(slot.startAngle, 270);
        equal(slot.angle, 360);
    })

    test("assumes 1 category when no categories are defined (non-justified)", function() {
        createAxis({ categories: [], justified: false });

        slot = axis.getSlot(0);
        equal(slot.startAngle, 90);
        equal(slot.angle, 360);
    });

    test("reports range minimum of 0", function() {
        equal(axis.range().min, 0);
    });

    test("reports range maximum equal to category count", function() {
        equal(axis.range().max, 3);
    });

    test("from value can't be lower than 0", function() {
        slot = axis.getSlot(-1);
        equal(slot.startAngle, 30);
    });

    test("caps from value to categories count", function() {
        slot = axis.getSlot(1000);
        equal(slot.startAngle, 270);
    });

    test("to value equals from value when not set", function() {
        slot = axis.getSlot(1000);
        equal(slot.angle, 120);
    });

    test("to value equals from value when smaller", function() {
        slot = axis.getSlot(2, 1);
        equal(slot.startAngle, 270);
    });

    // ------------------------------------------------------------
    module("Radar CategoryAxis / getCategory ", {
        setup: function() {
            createAxis();
        }
    });

    test("returns null for coordinates outside of circle", function() {
        deepEqual(axis.getCategory(new Point2D(0, 0)), null);
    });

    test("returns first category for innermost point", function() {
        equal(axis.getCategory(new Point2D(300, 299)), "Foo");
    });

    test("returns second category for innermost point", function() {
        equal(axis.getCategory(new Point2D(301, 300)), "Bar");
    });

    test("returns third category for innermost point", function() {
        equal(axis.getCategory(new Point2D(299, 300)), "Baz");
    });

    // ------------------------------------------------------------
    module("Radar CategoryAxis / getCategory / Reverse", {
        setup: function() {
            createAxis({ reverse: true });
        }
    });

    test("returns first category for innermost point", function() {
        equal(axis.getCategory(new Point2D(300, 299)), "Foo");
    });

    test("returns second category for innermost point", function() {
        equal(axis.getCategory(new Point2D(299, 300)), "Bar");
    });

    test("returns third category for innermost point", function() {
        equal(axis.getCategory(new Point2D(301, 300)), "Baz");
    });

    // ------------------------------------------------------------

    function setupGridLines(altAxis, axisOptions) {
        createAxis(axisOptions);
        gridLines = axis.createGridLines(altAxis);
    }

    module("Radar Category Axis / Grid lines", {
        setup: function() {
            setupGridLines(altAxis);
        }
    });

    test("renders major grid lines by default", function() {
        equal(gridLines.length, 2);
    });

    test("major grid lines extend from axis center", function() {
        var anchor = gridLines[0].segments[0].anchor();
        equal(anchor.x, 300);
        equal(anchor.y, 300);
    });

    test("major grid lines extend to value axis end", function() {
        var anchor = gridLines[0].segments[1].anchor();
        close(anchor.x, 473, TOLERANCE);
        close(anchor.y, 400, TOLERANCE);
    });

    test("renders 90 degree grid line when value axis is not visible", function() {
        setupGridLines({
            options: { visible: false },
            lineBox: altAxis.lineBox
        });

        var anchor = gridLines[0].segments[1].anchor();
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

        equal(gridLines.length, 5);
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
    module("Radar Category Axis / Grid lines / startAngle", {
        setup: function() {
            setupGridLines(altAxis, { categories: ["A", "B", "C", "D"], startAngle: 80 });
        }
    });

    test("major grid lines are offset with start angle", function() {
        var ref = Point2D.onCircle(center, 80, 200),
            end = gridLines[0].segments[1].anchor();

        ok(ref.equals(end));
    });

    test("renders 90 degree grid line as it no longer overlaps the value axis", function() {
        setupGridLines(altAxis, { categories: ["A", "B", "C", "D"], startAngle: 10 });

        equal(gridLines.length, 4);
    });

    // ------------------------------------------------------------
    module("Radar Category Axis / Plot Bands", {
        setup: function() {
            createAxis({
                plotBands: [{
                    from: 0,
                    to: 1,
                    opacity: 0.5,
                    color: "red"
                }, {
                    from: 1.25,
                    to: 1.75
                }, {
                    from: 1.25,
                    to: 2
                }, {
                    from: 1,
                    to: 1.75
                }, {
                    from: 1,
                    to: 2.5
                }]
            });
            plotBands = axis._plotbandGroup.children;
        }
    });

    test("renders sectors", function() {
        equal(plotBands.length, 5);
    });

    test("renders sector with correct angles", function() {
        closePaths(plotBands[0], dataviz.ShapeBuilder.current.createRing({
            startAngle: 30,
            angle: 120,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
    });

    test("renders sector with correct angles for partial slot (from & to)", function() {
        closePaths(plotBands[1], dataviz.ShapeBuilder.current.createRing({
            startAngle: 180,
            angle: 60,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
    });

    test("renders sector with correct angles for partial slot (from)", function() {
        closePaths(plotBands[2], dataviz.ShapeBuilder.current.createRing({
            startAngle: 180,
            angle: 90,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
    });

    test("renders sector with correct angles for partial slot (to)", function() {
        closePaths(plotBands[3], dataviz.ShapeBuilder.current.createRing({
            startAngle: 150,
            angle: 90,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
    });

    test("renders sector with correct angles for long partial slot (to)", function() {
        closePaths(plotBands[4], dataviz.ShapeBuilder.current.createRing({
            startAngle: 150,
            angle: 180,
            r: 200,
            c: {
                x: 300,
                y: 300
            }
        }));
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

    (function() {
        var chart,
            label,
            plotArea;

        function axisLabelClick(clickHandler, options) {
            chart = createChart($.extend(true, {
                dataSource: [{
                    value: 1,
                    category: "A"
                }, {
                    value: 2,
                    category: "B"
                }, {
                    value: 3,
                    category: "C"
                }],
                series: [{
                    type: "radarColumn",
                    field: "value"
                }],
                categoryAxis: {
                    name: "Axis A",
                    field: "category"
                },
                axisLabelClick: clickHandler
            }, options));

            plotArea = chart._model.children[1];
            label = plotArea.categoryAxis.labels[1];
            clickChart(chart, getChartDomElement(label));
        }

        // ------------------------------------------------------------
        module("Radar Category Axis / Events / axisLabelClick", {
            teardown: destroyChart
        });

        test("fires when clicking axis labels", 1, function() {
            axisLabelClick(function() { ok(true); });
        });

        test("event arguments contain axis options", 1, function() {
            axisLabelClick(function(e) {
                equal(e.axis.type, "category");
            });
        });

        test("event arguments contain DOM element", 1, function() {
            axisLabelClick(function(e) {
                equal(e.element.length, 1);
            });
        });

        test("event arguments contain category index", 1, function() {
            axisLabelClick(function(e) {
                equal(e.index, 1);
            });
        });

        test("category index is correct when step is defined", 1, function() {
            axisLabelClick(function(e) {
                equal(e.index, 2);
            }, {
                categoryAxis: {
                    labels: {
                        step: 2
                    }
                }
            });
        });

        test("event arguments contain category name as text", 1, function() {
            axisLabelClick(function(e) {
                equal(e.text, "B");
            });
        });

        test("event arguments contain category name as value", 1, function() {
            axisLabelClick(function(e) {
                equal(e.value, "B");
            });
        });

        test("event arguments contain category data item", 1, function() {
            axisLabelClick(function(e) {
                equal(e.dataItem.value, 2);
            });
        });

    })();

    (function() {
        var chart,
            label,
            plotArea;

        function createBoundChart(options) {
            chart = createChart($.extend(true, {
                dataSource: [{
                    value: 1,
                    category: "A"
                }, {
                    value: 2,
                    category: "B"
                }, {
                    value: 3,
                    category: "C"
                }],
                series: [{
                    type: "radarColumn",
                    field: "value"
                }],
                categoryAxis: {
                    name: "Axis A",
                    field: "category"
                }
            }, options));

            plotArea = chart._model.children[1];
            label = plotArea.categoryAxis.labels[1];
            getChartDomElement(label).click();
        }

        // ------------------------------------------------------------
        module("Radar Category Axis / Data Binding", {
            teardown: destroyChart
        });

        test("categories are data bound", function() {
            createBoundChart();
            equal(plotArea.categoryAxis.labels.length, 3);
        });

        test("template has access to data item", function() {
            createBoundChart({
                categoryAxis: {
                    labels: {
                        template: "#= ok(typeof dataItem.value == 'number') #"
                    }
                }
            });
        });

    })();
})();
