(function() {

    var dataviz = kendo.dataviz,
        LogarithmicAxis = dataviz.LogarithmicAxis,
        deepExtend = dataviz.deepExtend,
        defined = dataviz.defined,
        Point = dataviz.Point2D,
        Box = dataviz.Box2D,
        draw = kendo.drawing,
        axis,
        chartBox = dataviz.Box2D(0, 0, 800, 600),
        TOLERANCE = 0.1;

    function createAxis(min, max, options) {
        axis = new LogarithmicAxis(min, max, options);
    }

    (function() {
        module("axis options", {});

        test("throws error for non-positive crossing value", function() {
            try {
                createAxis(0.1, 1, {
                    axisCrossingValue: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("throws error for non-positive min options value", function() {
            try {
                createAxis(0.1, 1, {
                    min: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("throws error for non-positive max options value", function() {
            try {
                createAxis(0.1, 1, {
                    max: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("does not change minorUnit passed from the options", function() {
            createAxis(0.1, 100, {
                minorUnit: 2
            });
            equal(axis.options.minorUnit, 2);
        });

        test("sets minorUnit to majorUnit minus 1 by default", function() {
            createAxis(0.1, 100, {});
            equal(axis.options.minorUnit, 9);
        });

        module("axis options / auto min", {});

        test("does not change minimum value passed from the options", function() {
            createAxis(0.1, 100, {
                min: 10
            });
            equal(axis.options.min, 10);
        });

        test("sets min to 1 if series min is non-positive", function() {
            createAxis(0, 100, {});
            equal(axis.options.min, 1);
        });

        test("sets min to base on power minus 2 if series min is non-positive and max le 1", function() {
            createAxis(0, 1, {});
            equal(axis.options.min, 0.01);
        });

        test("sets min to the lower whole power if narrowRange is false", function() {
            createAxis(0.9, 100, {
                narrowRange: false
            });
            equal(axis.options.min, 0.1);
        });

        test("uses series min if narrowRange is true", function() {
            createAxis(0.9, 100, {
                narrowRange: true
            });
            equal(axis.options.min, 0.9);
        });

        module("axis options / auto max", {});

        test("does not change maximum value passed from the options", function() {
            createAxis(0.1, 100, {
                max: 10
            });
            equal(axis.options.max, 10);
        });

        test("sets max to the majorUnit if series max is non-positive", function() {
            createAxis(0, 0, {
                majorUnit: 2
            });
            equal(axis.options.max, 2);
        });

        test("adds 0.2 to the power if series max base power remainder is gt 0 and lt than 0.3", function() {
            createAxis(0.9, 18, {});
            close(axis.options.max, 28.5, TOLERANCE);
        });

        test("adds 0.2 to the power if series max base power remainder is gt 0.9", function() {
            createAxis(0.9, 80, {});
            close(axis.options.max, 126.8, TOLERANCE);
        });

        test("sets max to the higher whole power if series max base power remainder is between 0.3 and 0.9", function() {
            createAxis(0.9, 70, {});
            equal(axis.options.max, 100);
        });
    })();

    (function() {
        module("axis slot", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical:true
                });
                axis.reflow(chartBox);
            }
        });

        test("uses 1 to calculate the slot when the value is not defined", function() {
            var slot = axis.getSlot(),
                value1Slot = axis.getSlot(1);

            close(slot.y1, value1Slot.y1, TOLERANCE);
            close(slot.y2, value1Slot.y2, TOLERANCE);
        });


        module("axis slot / vertical", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.y1, 592.5, TOLERANCE);
            close(slot.y2, 592.5, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.y1, 7.5, TOLERANCE);
            close(slot.y2, 7.5, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.y1, 153.75, TOLERANCE);
            close(slot.y2, 153.75, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.y1, 197.77, TOLERANCE);
            close(slot.y2, 197.77, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.y1, 153.75, TOLERANCE);
            close(slot.y2, 197.77, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.y1, 7.5, TOLERANCE);
            close(slot.y2, 7.5, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.y1, 1.45, TOLERANCE);
            close(slot.y2, 1.45, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / vertical / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.y1, 7.5, TOLERANCE);
            close(slot.y2, 7.5, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.y1, 592.5, TOLERANCE);
            close(slot.y2, 592.5, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.y1, 446.25, TOLERANCE);
            close(slot.y2, 446.25, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.y1, 402.224, TOLERANCE);
            close(slot.y2, 402.224, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.y1, 402.224, TOLERANCE);
            close(slot.y2, 446.25, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.y1, 592.5, TOLERANCE);
            close(slot.y2, 592.5, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.y1, 598.55, TOLERANCE);
            close(slot.y2, 598.55, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.x1, 16, TOLERANCE);
            close(slot.x2, 16, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.x1, 788, TOLERANCE);
            close(slot.x2, 788, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.x1, 595, TOLERANCE);
            close(slot.x2, 595, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.x1, 536.9, TOLERANCE);
            close(slot.x2, 536.9, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.x1, 536.9, TOLERANCE);
            close(slot.x2, 595, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.x1, 788, TOLERANCE);
            close(slot.x2, 788, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.x1, 796, TOLERANCE);
            close(slot.x2, 796, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.x1, 788, TOLERANCE);
            close(slot.x2, 788, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.x1, 16, TOLERANCE);
            close(slot.x2, 16, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.x1, 209, TOLERANCE);
            close(slot.x2, 209, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.x1, 267.09, TOLERANCE);
            close(slot.x2, 267.09, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.x1, 209, TOLERANCE);
            close(slot.x2, 267.09, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.x1, 16, TOLERANCE);
            close(slot.x2, 16, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.x1, 8, TOLERANCE);
            close(slot.x2, 8, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / non-positive", {
            setup: function() {
                createAxis(1, 100, {});
                axis.reflow(chartBox);
            }
        });

        test("returns undefined if first value is non-positive", function() {
            var slot = axis.getSlot(0, 1);
            ok(!defined(slot));
        });

        test("returns undefined if second value is non-positive", function() {
            var slot = axis.getSlot(1, 0);
            ok(!defined(slot));
        });

    })();

    (function() {
        module("axis value / vertical", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(0, 592.5));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(0, 7.5));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(0, 153.75));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(0, 197.77));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis value / vertical / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(0, 7.5));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(0, 592.5));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(0, 446.25));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(0, 402.224));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis value / horizontal", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(12, 0));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(788, 0));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(595.125, 0));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(536.6, 0));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(787.999, 0));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(16, 0));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(206.375, 0));
            close(value, 10.31, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(264.89, 0));
            close(value, 5.13, TOLERANCE);
        });

    })();

    (function() {
        var TRANSLATE_TOLERANCE = 0.001;

        module("axis range / scale", {
            setup: function() {
                createAxis(1, 1000, {});
                axis.reflow(chartBox);
            }
        });

        test("delta -1 expands range with 1 base power", function() {
            var range = axis.scaleRange(-1);
            equal(0.1, range.min);
            equal(10000, range.max);
        });

        test("delta 1 collapses range with 1 base power", function() {
            var range = axis.scaleRange(1);
            equal(10, range.min);
            equal(100, range.max);
        });

        // ------------------------------------------------------------
        module("axis range / translate / vertical", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range up", function() {
            var range = axis.translateRange(-1);
            close(1.008, range.min, TRANSLATE_TOLERANCE);
            close(100.79, range.max, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range down", function() {
            var range = axis.translateRange(1);
            close(0.992, range.min, TRANSLATE_TOLERANCE);
            close(99.215, range.max, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / vertical / reverse", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range down", function() {
            var range = axis.translateRange(-1);
            close(0.992, range.min, TRANSLATE_TOLERANCE);
            close(99.215, range.max, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range up", function() {
            var range = axis.translateRange(1);
            close(1.008, range.min, TRANSLATE_TOLERANCE);
            close(100.79, range.max, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / horizontal", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range down", function() {
            var range = axis.translateRange(-1);
            close(range.min, 0.994, TRANSLATE_TOLERANCE);
            close(range.max, 99.415, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range up", function() {
            var range = axis.translateRange(1);
            close(range.min, 1.005, TRANSLATE_TOLERANCE);
            close(range.max, 100.589, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / horizontal / reverse", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range up", function() {
            var range = axis.translateRange(-1);
            close(range.min, 1.005, TRANSLATE_TOLERANCE);
            close(range.max, 100.589, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range down", function() {
            var range = axis.translateRange(1);
            close(range.min, 0.994, TRANSLATE_TOLERANCE);
            close(range.max, 99.415, TRANSLATE_TOLERANCE);
        });

    })();
    // TO DO: Add horizontal / reverse tests
    (function() {
        var defaultOptions = {skip: 0, step: 1};

        module("axis / major positions", {
            setup: function() {
                createAxis(1, 1000, { min: 5 });
                axis.reflow(chartBox);
            }
        });

        test("returns positions for all whole powers between min and max", function() {
            var positions = axis.getMajorTickPositions();
            arrayClose(positions, [515.9, 261.7, 7.5], TOLERANCE);
        });

        test("passes options to callback", 3, function() {
            axis.traverseMajorTicksPositions(function(position, tickOptions) {
                ok(defaultOptions === tickOptions);
            }, defaultOptions);
        });

        test("triggers callback for each position", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position, tickOptions) {
                   positions.push(position);
                }, defaultOptions);
            arrayClose(positions, [515.9, 261.7, 7.5], TOLERANCE);
        });

        test("skips first n positions based on the options", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 2, step: 1});
            arrayClose(positions, [7.5], TOLERANCE);
        });

        test("applies step", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 0, step: 2});
            arrayClose(positions, [515.9, 7.5], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis / minor positions", {
            setup: function() {
                createAxis(1, 100, { min: 5 });
                axis.reflow(chartBox);
            }
        });

        test("passes options to callback", 14, function() {
            axis.traverseMinorTicksPositions(function(position, tickOptions) {
                ok(defaultOptions === tickOptions);
            }, defaultOptions);
        });

        test("triggers callback for each position", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position, tickOptions) {
                   positions.push(position);
                }, defaultOptions);
            arrayClose(positions, [592.5, 556.9, 526.8, 500.7, 477.7, 457.1, 321.8, 242.6, 186.4, 142.9, 107.3, 77.2, 51.1, 28.1], TOLERANCE);
        });

        test("skips first n positions for each interval based on the options", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 5, step: 1});
            arrayClose(positions, [556.9, 526.8, 500.7, 477.7, 107.3, 77.2, 51.1, 28.1], TOLERANCE);
        });

        test("applies step", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 0, step: 3});

            arrayClose(positions, [526.8, 457.1, 186.4, 77.2], TOLERANCE);
        });

    })();

    (function() {
        var tickLineOptions = {
                align: true,
                stroke: "red",
                strokeWidth: 5
            },
            gridLineOptions = {
                dashType: undefined,
                data: {
                    modelId: 1
                },
                stroke: "red",
                strokeWidth: 5,
                zIndex: -1
            },
            altAxis = {
                options: {
                    line: {
                       visible: true
                    }
                },
                lineBox: function() {
                    return Box();
                }
            };

        function comparePaths(actual, expected) {
            for (var idx = 0; idx < actual.length; idx++) {
                dataviz.alignPathToPixel(expected[idx]);
                sameLinePath(actual[idx], expected[idx]);
            }
        }

        // ------------------------------------------------------------
        module("axis / render / minor ticks", {
            setup: function() {
                createAxis(1, 10, {
                    minorTicks: {
                        visible: true,
                        width: 5,
                        size: 4,
                        color: "red"
                    },
                    majorTicks: {
                        visible: false
                    }
                });
                axis.reflow(chartBox);
                axis.renderVisual();
            }
        });

        test("renders minor ticks", function() {
            var lines = axis._lineGroup.children.slice(1);
            var expectedPaths = [
                new draw.Path().moveTo(21, 592.5).lineTo(25, 592.5),
                new draw.Path().moveTo(21, 416.397453).lineTo(25, 416.397453),
                new draw.Path().moveTo(21, 313.384066).lineTo(25, 313.384066),
                new draw.Path().moveTo(21, 240.294905).lineTo(25, 240.294905),
                new draw.Path().moveTo(21, 183.602547).lineTo(25, 183.602547),
                new draw.Path().moveTo(21, 137.281519).lineTo(25, 137.281519),
                new draw.Path().moveTo(21, 98.117647).lineTo(25, 98.117647),
                new draw.Path().moveTo(21, 64.192358).lineTo(25, 64.192358),
                new draw.Path().moveTo(21, 34.268132).lineTo(25, 34.268132)
            ];

            comparePaths(lines, expectedPaths);
        });

        // ------------------------------------------------------------
        module("axis / render / major ticks", {
            setup: function() {
                createAxis(1, 10, {
                    minorTicks: {
                        visible: false
                    },
                    majorTicks: {
                        visible: true,
                        width: 5,
                        size: 4,
                        color: "red"
                    }
                });
                axis.reflow(chartBox);
                axis.renderVisual();
            }
        });

        test("renders major ticks", function() {
            var lines = axis._lineGroup.children.slice(1);
            var expectedPaths = [
                new draw.Path().moveTo(21, 592.5).lineTo(25, 592.5),
                new draw.Path().moveTo(21, 7.5).lineTo(25, 7.5)
            ];
            comparePaths(lines, expectedPaths);
        });

        // ------------------------------------------------------------
        module("axis / render / minor grid lines", {
            setup: function() {
                createAxis(1, 10, {
                    minorGridLines: {
                        visible: true,
                        width: 5,
                        color: "red"
                    },
                    majorGridLines: {
                        visible: false
                    }
                });
                axis.plotArea = {
                    modelId: 1
                };
                axis.reflow(chartBox);
                axis.renderVisual();
                axis.createGridLines(altAxis);
            }
        });

        test("renders minor grid lines", function() {
            var lines = axis._gridLines.children;
            var expectedPaths = [
                new draw.Path().moveTo(0, 592.5).lineTo(0, 592.5),
                new draw.Path().moveTo(0, 416.397453).lineTo(0, 416.397453),
                new draw.Path().moveTo(0, 313.384066).lineTo(0, 313.384066),
                new draw.Path().moveTo(0, 240.294905).lineTo(0, 240.294905),
                new draw.Path().moveTo(0, 183.602547).lineTo(0, 183.602547),
                new draw.Path().moveTo(0, 137.281519).lineTo(0, 137.281519),
                new draw.Path().moveTo(0, 98.117647).lineTo(0, 98.117647),
                new draw.Path().moveTo(0, 64.192358).lineTo(0, 64.192358),
                new draw.Path().moveTo(0, 34.268132).lineTo(0, 34.268132)
            ];

            comparePaths(lines, expectedPaths);

        });

        // ------------------------------------------------------------
        module("axis / render / major grid lines", {
            setup: function() {
                createAxis(1, 10, {
                    minorGridLines: {
                        visible: false
                    },
                    majorGridLines: {
                        visible: true,
                        width: 5,
                        color: "red"
                    }
                });
                axis.plotArea = {
                    modelId: 1
                };
                axis.reflow(chartBox);
                axis.renderVisual();
                axis.createGridLines(altAxis);
            }
        });

        test("renders minor grid lines", function() {
            var lines = axis._gridLines.children;
            var expectedPaths = [
                new draw.Path().moveTo(0, 592.5).lineTo(0, 592.5),
                new draw.Path().moveTo(0, 7.5).lineTo(0, 7.5)
            ];

            comparePaths(lines, expectedPaths);
        });

    })();

    (function() {
        module("axis / labels", {
            setup: function() {
                createAxis(1, 110, { min: 5});
            }
        });

        test("labels count is equal to the number of whole powers between min and max", function() {
            equal(axis.labelsCount(), 2);
        });

        test("labels value is equal to base on power min power plus index", function() {
            var label1 = axis.createAxisLabel(0, {}),
                label2 = axis.createAxisLabel(1, {});

            equal(label1.value, 10);
            equal(label2.value, 100);
        });

    })();

})();
