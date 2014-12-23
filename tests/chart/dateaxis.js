(function() {
    var dataviz = kendo.dataviz,
        Box2D = dataviz.Box2D,
        Point2D = dataviz.Point2D,
        dateAxis,
        chartBox = new Box2D(0, 0, 800, 600),
        TOLERANCE = 1;

    var DateCategoryAxis = dataviz.DateCategoryAxis.extend({
        options: {
            labels: {
                font: "16px Verdana, sans-serif"
            }
        }
    });

    var DateValueAxis = dataviz.DateValueAxis.extend({
        options: {
            labels: {
                font: "16px Verdana, sans-serif"
            }
        }
    });

    function getAxisTextBoxes() {
        return $.grep(dateAxis.visual.children, function(item) {
            if (item !== dateAxis._lineGroup && item !== dateAxis._backgroundPath && item !== dateAxis._gridLines) {
                return true;
            }
        });
    }

    function getAxisTexts() {
        return $.map(getAxisTextBoxes(), function(item) {
            return kendo.util.last(item.children);
        });
    }

    (function() {
        var categories;

        function createDateCategoryAxis(options) {
            dateAxis = new DateCategoryAxis(options);

            categories = dateAxis.options.categories;

            dateAxis.reflow(chartBox);
            dateAxis.renderVisual();
        }

        // ------------------------------------------------------------
        module("Date Category Axis / Configuration", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01"), new Date("2012/02/10")
                    ]
                });
            }
        });

        test("User set base unit is applied", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/03/10")
                ],
                baseUnit: "days"
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Default base unit is days", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Default base unit is days when no categories are defined", function() {
            createDateCategoryAxis();

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Setting base unit to 'default' selects one based on minimum difference", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/01 00:20:00")
                ],
                baseUnit: "default"
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("Empty base unit interpreted as 'default'", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/03/10")
                ],
                baseUnit: ""
            });

            equal(dateAxis.options.baseUnit, "months");
        });

        test("Invalid base unit interpreted as 'default'", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/01 00:20:00")
                ],
                baseUnit: "fortnight"
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("Min date can be parsed from string", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/10")
                ],
                min: "2012/02/01"
            });

            deepEqual(dateAxis.options.min, new Date("2012/02/01 00:00"));
        });

        test("Max date can be parsed from string", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/5")
                ],
                max: "2012/02/15"
            });

            deepEqual(dateAxis.options.max, new Date("2012/02/15 00:00"));
        });

        test("No categories", 0, function() {
            createDateCategoryAxis();
        });

        test("Base unit step is applied for explicit baseUnit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/07")
                ],
                baseUnit: "days",
                baseUnitStep: 3
            });

            deepEqual(categories, [
                new Date("2012/02/01"), new Date("2012/02/04"),
                new Date("2012/02/07")
            ]);
        });

        test("Categories are rounded to next base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/05")
                ],
                baseUnit: "days",
                baseUnitStep: 3
            });

            deepEqual(categories, [
                new Date("2012/02/01"), new Date("2012/02/04")
            ]);
        });

        test("Empty categories are kept when max value is specified", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/05")
                ],
                max: new Date("2012/02/05"),
                baseUnit: "days",
                baseUnitStep: 3
            });

            deepEqual(categories, [
                new Date("2012/02/01"), new Date("2012/02/04"),
                new Date("2012/02/07")
            ]);
        });

        test("User set base unit step is disregarded when using automatic base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/07")
                ],
                baseUnit: "fit",
                maxDateGroups: 3
            });

            deepEqual(categories, [
                new Date("2012/02/01"), new Date("2012/02/04"),
                new Date("2012/02/07")
            ]);
        });

        test("maxDateGroups constraint does not alter default base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:50:00")
                ],
                autoBaseUnitSteps: { minutes: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("maxDateGroups defaults to 10", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/10 00:00:00")
                ],
                baseUnit: "fit"
            });

            equal(dateAxis.options.baseUnitStep, 1);

            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/11 00:00:00")
                ],
                baseUnit: "fit"
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("Dates are sorted before grouping", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/04/01"), new Date("2012/02/01"), new Date("2012/03/01")
                ],
                baseUnit: "months"
            });

            deepEqual(dateAxis.options.categories,
                    [ new Date("2012/02/01"), new Date("2012/03/01"), new Date("2012/04/01") ]);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / categoryIndex");

        test("category indicies for aggregated categories", function() {
            createDateCategoryAxis({
                baseUnit: "months",
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/03")), 0);
        });

        test("category indicies for sparse categories", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/03")), 2);
        });

        test("category indicies when rounding is disabled", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 21:00:00"), new Date("2012/02/03 03:00:00")
                ],
                roundToBaseUnit: false
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01 21:00:00")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/02 00:00:00")), 1);
            equal(dateAxis.categoryIndex(new Date("2012/02/03 03:00:00")), 2);
        });

        test("category indicies when rounding is disabled and not applicable", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                roundToBaseUnit: false
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/03")), 2);
        });

        test("category indicies when rounding is disabled (justified)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 21:00:00"), new Date("2012/02/03 03:00:00")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01 21:00:00")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/03 03:00:00")), 2);
        });

        test("category indicies when rounding is disabled and not applicable (justified)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/01")), 0);
            equal(dateAxis.categoryIndex(new Date("2012/02/03")), 2);
        });

        test("categoryIndex accepts string", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            equal(dateAxis.categoryIndex("2012/02/03"), 2);
        });

        test("categoryAxis returns -1 if value is missing", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            equal(dateAxis.categoryIndex(), -1);
        });

        test("categoryAxis returns -1 if value is smaller then min axis value", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });

            equal(dateAxis.categoryIndex(new Date("2012/01/01")), -1);
        });

        test("categoryAxis returns 2 if value is larger then max axis value", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });

            equal(dateAxis.categoryIndex(new Date("2012/02/04")), 3);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Min-Max values", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01"), new Date("2012/02/10")
                    ]
                });
            }
        });

        test("User set min value smaller than first category is applied", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/06")
                ],
                min: new Date("2012/02/04")
            });

            deepEqual(categories, [
                new Date("2012/02/04"), new Date("2012/02/05"),
                new Date("2012/02/06")
            ]);
        });

        test("User set min value larger than first category is applied", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/06")
                ],
                min: new Date("2012/02/06")
            });

            deepEqual(categories, [
                new Date("2012/02/06")
            ]);
        });

        test("User set max value smaller than last category", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/06")
                ],
                max: new Date("2012/02/05")
            });

            deepEqual(categories, [
                new Date("2012/02/05")
            ]);
        });

        test("User set max value smaller than last category (rounding off)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/06")
                ],
                max: new Date("2012/02/05"),
                roundToBaseUnit: false
            });

            deepEqual(categories, [
                new Date("2012/02/05")
            ]);
        });

        test("User set max value larger than last category", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05"), new Date("2012/02/06")
                ],
                max: new Date("2012/02/07")
            });

            deepEqual(categories, [
                new Date("2012/02/05"), new Date("2012/02/06"),
                new Date("2012/02/07")
            ]);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Minutes");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 11:00:00"), new Date("2012/02/05 11:05:00")
                ]
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:02:00")
                ]
            });
            equalTexts(getAxisTexts(), ["10:00", "10:01", "10:02"]);
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:10:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 6
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit step is increased to satisfy maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:10:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { minutes: [1] },
                maxDateGroups: 6
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("base unit step is limited to specified value", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:05:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { minutes: [10] }
            });

            equal(dateAxis.options.baseUnitStep, 10);
        });

        test("base unit is not chosen if it has no valid automatic steps", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:05:00")
                ],
                baseUnit: "fit",
                baseUnitStep: "auto",
                autoBaseUnitSteps: { minutes: [] }
            });

            equal(dateAxis.options.baseUnit, "hours");
        });

        test("automatic base unit (hours) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:50:00")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { minutes: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "hours");
        });

        test("maxDateGroups keeps user set base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:50:00")
                ],
                autoBaseUnitSteps: { minutes: [1] },
                baseUnit: "minutes",
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("maxDateGroups constraint has lower priority than base unit step", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:10:00")
                ],
                maxDateGroups: 6,
                baseUnitStep: 1
            });

            equal(dateAxis.options.baseUnitStep, 1);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Seconds");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 11:00:00"), new Date("2012/02/05 11:00:05")
                ]
            });

            equal(dateAxis.options.baseUnit, "seconds");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:02")
                ]
            });
            equalTexts(getAxisTexts(), ["10:00:00", "10:00:01", "10:00:02"]);
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:10")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 6
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit step is increased to satisfy maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:10")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { seconds: [1] },
                maxDateGroups: 6
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("base unit step is limited to specified value", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:05")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { seconds: [10] }
            });

            equal(dateAxis.options.baseUnitStep, 10);
        });

        test("base unit is not chosen if it has no valid automatic steps", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:05")
                ],
                baseUnit: "fit",
                baseUnitStep: "auto",
                autoBaseUnitSteps: { seconds: [] }
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("automatic base unit (minutes) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:50")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { seconds: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("maxDateGroups keeps user set base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:50")
                ],
                autoBaseUnitSteps: { seconds: [1] },
                baseUnit: "seconds",
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "seconds");
        });

        test("maxDateGroups constraint has lower priority than base unit step", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 10:00:10")
                ],
                maxDateGroups: 6,
                baseUnitStep: 1
            });

            equal(dateAxis.options.baseUnitStep, 1);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / No Rounding");

        test("Major ticks are positioned at exact time", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                ],
                roundToBaseUnit: false
            });

            arrayClose(dateAxis.getMajorTickPositions(),
                [0, 88, 321, 555, 789, 799], 1);
        });

        test("Major ticks are not affected when start/end time match base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/05 00:00:00")
                ],
                roundToBaseUnit: false
            });

            arrayClose(dateAxis.getMajorTickPositions(),
                [0, 200, 400, 600, 800], 1);
        });

        test("Does not fail with no categories", 0, function() {
            createDateCategoryAxis({
                categories: [],
                roundToBaseUnit: false
            });
        });

        test("Preserves all categories when they match base units exactly", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/02/01"), new Date("2012/03/01")
                ],
                roundToBaseUnit: false
            });

            deepEqual(kendo.util.last(dateAxis.options.categories), new Date("2012/03/01"));
        });

        test("Does not add categories beyond last day", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/01/01 12:00:00"),
                    new Date("2012/01/02"), new Date("2012/01/02 12:00:00")
                ],
                baseUnit: "days",
                roundToBaseUnit: false
            });

            deepEqual(kendo.util.last(dateAxis.options.categories), new Date("2012/01/02"));
        });

        test("Does not add categories beyond last week", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2013/02/24"), new Date("2013/03/02"),
                    new Date("2013/03/03"), new Date("2013/03/09")
                ],
                baseUnit: "weeks",
                roundToBaseUnit: false
            });

            deepEqual(kendo.util.last(dateAxis.options.categories), new Date("2013/03/03"));
        });

        test("Last category label is hidden if it equals the range end", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2013/01/27"), new Date("2013/02/17")
                ],
                roundToBaseUnit: false,
                baseUnit: "weeks"
            });

            equal(dateAxis.labels.length, 3);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / No Rounding / Justified");

        test("Major ticks are positioned at exact time", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 15:00:00"), new Date("2012/02/05 15:00:00")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            arrayClose(dateAxis.getMajorTickPositions(),
                [13, 99, 328, 558, 788] , 1);
        });

        test("Major ticks are not affected when start/end time match base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/05 00:00:00")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            arrayClose(dateAxis.getMajorTickPositions(),
                [12, 207, 400, 593, 787], 1);
        });

        test("First label is hidden if it does not match base unit", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                ],
                roundToBaseUnit: false,
                justified: true
            });

            equal(dateAxis.labels[0].text, "2/2");
        });

        test("Last category is not stretched when max is set to range end", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2013/01/27"), new Date("2013/02/16")
                ],
                baseUnit: "weeks",
                roundToBaseUnit: false,
                justified: true,
                max: new Date("2013/02/16")
            });

            equal(dateAxis.getMajorTickPositions()[1], 400);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / No Rounding / Reversed");

        test("Major ticks are positioned at exact time", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                ],
                roundToBaseUnit: false,
                reverse: true
            });

            arrayClose(dateAxis.getMajorTickPositions(),
                [799, 711, 477, 243, 10, 0], 1);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Minutes");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 23:55:00"), new Date("2012/02/06 00:00:00")
                ]
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("Base unit is determined by series delta (DST boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2013/10/27 02:45:00"), new Date("2013/10/27 03:00:00")
                ]
            });

            equal(dateAxis.options.baseUnit, "minutes");
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 10:00:00"), new Date("2012/02/05 10:11:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 10
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("maxDateGroups takes priority over preferred base unit step", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 10:00:00"), new Date("2012/02/05 10:11:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { minutes: [1] },
                maxDateGroups: 10
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Hours");

        test("Base unit is determined by series delta (day boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 23:00:00"), new Date("2012/02/06 00:00:00")
                ]
            });

            equal(dateAxis.options.baseUnit, "hours");
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 10:00:00"), new Date("2012/02/05 21:00:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 10
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("maxDateGroups takes priority over preferred base unit step", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 10:00:00"), new Date("2012/02/05 21:00:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { hours: [1] },
                maxDateGroups: 10
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("maxDateGroups takes priority over preferred base unit step (fit)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("1980/01/01 00:00:00"), new Date("2012/01/01 00:00:00")
                ],
                baseUnit: "fit",
                baseUnitStep: "auto",
                autoBaseUnitSteps: { years: [1] },
                maxDateGroups: 10
            });

            equal(dateAxis.options.baseUnitStep, 4);
        });

        test("automatic base unit (days) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 10:00:00"), new Date("2012/02/01 20:00:00")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { hours: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Days");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/04"), new Date("2012/02/05")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Base unit is determined by series delta (DST boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/03/24"), new Date("2012/03/25"), new Date("2012/03/26")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Base unit is determined by series delta (month boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/29"), new Date("2012/03/01")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Base unit is determined by series delta (year boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2011/12/31"), new Date("2012/01/01")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Base unit is determined by minimum series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2011/01/01"), new Date("2012/02/04"), new Date("2012/02/05")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        tzTest("Brazil", "Base unit is determined by series delta (Brazil DST boundary)", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2013/10/18"), new Date("2013/10/19"), new Date("2013/10/20")
                ]
            });

            //equal(dateAxis.options.baseUnit, "days");
            console.warn("SKIPPED: " + QUnit.config.current.testName+ ": Good luck finding out that the interval is a whole day");
            ok(true);
        });

        test("Base unit calculation ignores repeating categories", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/01"), new Date("2012/02/02")
                ]
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });
            equalTexts(getAxisTexts(), ["2/1", "2/2", "2/3"]);
        });

        test("labels have associated data items", function() {
            createDateCategoryAxis({
                dataItems: ["a", "b", "c"],
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ]
            });

            deepEqual(dateAxis.labels[0].dataItem, "a");
        });

        test("creates labels with custom date format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                labels: {
                    dateFormats: {
                        days: "M/d/yy"
                    }
                }
            });
            equalTexts(getAxisTexts(), ["2/1/12", "2/2/12", "2/3/12"]);
        });

        test("creates labels with custom format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                labels: {
                    format: "M/d/yy"
                }
            });

            equalTexts(getAxisTexts(), ["2/1/12", "2/2/12", "2/3/12"]);
        });

        test("creates labels with custom culture", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                labels: {
                    format: "d.MMM",
                    culture: "es-ES"
                }
            });

            equalTexts(getAxisTexts(), ["1.feb.", "2.feb.", "3.feb."]);
        });

        test("creates labels with custom template", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/03")
                ],
                labels: {
                    template: "#= kendo.toString(value, 'yyyy') #"
                }
            });

            equalTexts(getAxisTexts(), ["2012", "2012", "2012"]);
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/05 00:00:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit step is calculated when outside of preset values", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/05 00:00:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { days: [1] },
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit (weeks) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/02/20 00:00:00")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { days: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "weeks");
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Weeks");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/02/8")
                ]
            });

            equal(dateAxis.options.baseUnit, "weeks");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/01/15")
                ]
            });

            equalTexts(getAxisTexts(), ["1/1", "1/8", "1/15"]);
        });

        test("creates labels with custom date format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/01/15")
                ],
                labels: {
                    dateFormats: {
                        weeks: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/1/12", "1/8/12", "1/15/12"]);
        });

        test("week start day can be customized", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/01/15")
                ],
                weekStartDay: kendo.days.Monday
            });

            equalTexts(getAxisTexts(), ["12/26", "1/2", "1/9"]);
        });

        tzTest("Sofia", "automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 00:00:00"), new Date("2012/03/03 00:00:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 2
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        tzTest("Sofia", "automatic base unit step is calculated when outside of preset values", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 00:00:00"), new Date("2012/03/03 00:00:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { weeks: [1] },
                maxDateGroups: 2
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit (months) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/05 00:00:00"), new Date("2012/03/03 00:00:00")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { weeks: [1] },
                maxDateGroups: 2
            });

            equal(dateAxis.options.baseUnit, "months");
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Months");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2012/03/10")
                ]
            });

            equal(dateAxis.options.baseUnit, "months");
        });

        test("Base unit is set to months when range extends to next month end", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2011/01/31"), new Date("2011/02/28")
                ]
            });

            equal(dateAxis.options.baseUnit, "months");
        });

        test("Base unit is set to months when series delta is 1 month - 3 days", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2011/03/31"), new Date("2011/04/29")
                ]
            });

            equal(dateAxis.options.baseUnit, "months");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/02/01")
                ]
            });

            equalTexts(getAxisTexts(), ["Jan '12", "Feb '12"]);
        });

        test("creates labels with custom date format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2012/02/01")
                ],
                labels: {
                    dateFormats: {
                        months: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/1/12", "2/1/12"]);
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/06/01 00:00:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit step is calculated when outside of preset values", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/06/01 00:00:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { months: [1] },
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit (years) is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01 00:00:00"), new Date("2012/12/01 00:00:00")
                ],
                baseUnit: "fit",
                autoBaseUnitSteps: { months: [1] },
                maxDateGroups: 5
            });

            equal(dateAxis.options.baseUnit, "years");
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Base unit / Years");

        test("Base unit is determined by series delta", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/02/01"), new Date("2013/03/10")
                ]
            });

            equal(dateAxis.options.baseUnit, "years");
        });

        test("creates labels with default format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2013/02/01")
                ]
            });

            equalTexts(getAxisTexts(), ["2012", "2013"]);
        });

        test("creates labels with custom date format", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01"), new Date("2013/02/01")
                ],
                labels: {
                    dateFormats: {
                        years: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/1/12", "1/1/13"]);
        });

        test("automatic base unit step is chosen according to maxDateGroups", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01 00:00:00"), new Date("2016/01/01 00:00:00")
                ],
                baseUnitStep: "auto",
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        test("automatic base unit step is calculated when outside of preset values", function() {
            createDateCategoryAxis({
                categories: [
                    new Date("2012/01/01 00:00:00"), new Date("2016/01/01 00:00:00")
                ],
                baseUnitStep: "auto",
                autoBaseUnitSteps: { years: [1] },
                maxDateGroups: 3
            });

            equal(dateAxis.options.baseUnitStep, 2);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / getSlot / No Rounding", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                    ],
                    roundToBaseUnit: false
                });
            }
        });

        test("Returns correct first partial slot", function() {
            sameBox(dateAxis.getSlot(0),
                    new Box2D(0, 0, 88, 0),
                    TOLERANCE);
        });

        test("Returns correct first full slot", function() {
            sameBox(dateAxis.getSlot(1),
                    new Box2D(88, 0, 322, 0),
                    TOLERANCE);
        });

        test("Returns correct last full slot", function() {
            sameBox(dateAxis.getSlot(3),
                    new Box2D(555, 0, 789, 0),
                    TOLERANCE);
        });

        test("Returns correct last partial slot", function() {
            sameBox(dateAxis.getSlot(4),
                    new Box2D(789, 0, 799, 0),
                    TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / getSlot / No Rounding / Justified", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                    ],
                    roundToBaseUnit: false,
                    justified: true
                });
            }
        });

        test("Returns correct first partial slot", function() {
            sameBox(dateAxis.getSlot(0),
                    new Box2D(12, 0, 12, 0),
                    TOLERANCE);
        });

        test("Returns correct first full slot", function() {
            sameBox(dateAxis.getSlot(1),
                    new Box2D(99, 0, 99, 0),
                    TOLERANCE);
        });

        test("Returns correct last full slot", function() {
            sameBox(dateAxis.getSlot(3),
                    new Box2D(558, 0, 558, 0),
                    TOLERANCE);
        });

        test("Returns correct last partial slot", function() {
            var lineBox = dateAxis.lineBox();
            sameBox(dateAxis.getSlot(4),
                    new Box2D(lineBox.x2, 0, lineBox.x2, 0),
                    TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Date Category Axis / getCategory", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [new Date("2012/01/01")],
                    labels: { visible: false }
                });
            }
        });

        test("returns date", function() {
            deepEqual(dateAxis.getCategory(new Point2D(0, 0)), new Date("2012/01/01"));
        });

        // ------------------------------------------------------------
        module("Date Category Axis / getCategory / No Rounding", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                    ],
                    roundToBaseUnit: false
                });
            }
        });

        test("Returns correct first partial category (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(0, 0)),
                   new Date("2012/02/01 15:00:00"));
        });

        test("Returns correct first partial category (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(87, 0)),
                   new Date("2012/02/01 15:00:00"));
        });

        test("Returns correct first full slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(89, 0)).toString(),
                 new Date("2012/02/02 00:00:00").toString());
        });

        test("Returns correct first full slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(321, 0)).toString(),
                 new Date("2012/02/02 00:00:00").toString());
        });

        test("Returns correct last full slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(556, 0)).toString(),
                 new Date("2012/02/04 00:00:00").toString());
        });

        test("Returns correct last full slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(788, 0)).toString(),
                 new Date("2012/02/04 00:00:00").toString());
        });

        test("Returns correct last partial slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(790, 0)).toString(),
                 new Date("2012/02/05 00:00:00").toString());
        });

        test("Returns correct last partial slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(799, 0)).toString(),
                 new Date("2012/02/05 00:00:00").toString());
        });

        // ------------------------------------------------------------
        module("Date Category Axis / getCategory / No Rounding / Justified", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01 15:00:00"), new Date("2012/02/05 01:00:00")
                    ],
                    roundToBaseUnit: false,
                    justified: true
                });
            }
        });

        test("Returns correct first partial category (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(14, 0)),
                   new Date("2012/02/01 15:00:00"));
        });

        test("Returns correct first partial category (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(14, 0)),
                   new Date("2012/02/01 15:00:00"));
        });

        test("Returns correct first full slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(99, 0)).toString(),
                 new Date("2012/02/02 00:00:00").toString());
        });

        test("Returns correct first full slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(324, 0)).toString(),
                 new Date("2012/02/03 00:00:00").toString());
        });

        test("Returns correct last full slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(551, 0)).toString(),
                 new Date("2012/02/04 00:00:00").toString());
        });

        test("Returns correct last full slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(776, 0)).toString(),
                 new Date("2012/02/05 00:00:00").toString());
        });

        test("Returns correct last partial slot (left edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(778, 0)).toString(),
                 new Date("2012/02/05 00:00:00").toString());
        });

        test("Returns correct last partial slot (right edge)", function() {
            deepEqual(dateAxis.getCategory(new Point2D(dateAxis.lineBox().x2, 0)).toString(),
                 new Date("2012/02/05 00:00:00").toString());
        });

        // ------------------------------------------------------------
        module("Date Category Axis / Range manipulation", {
            setup: function() {
                createDateCategoryAxis({
                    categories: [
                        new Date("2012/02/01"), new Date("2012/02/10")
                    ]
                });
            }
        });

        test("translateRange with negative delta", function() {
            var range = dateAxis.translateRange(-400);
            deepEqual(range.min, new Date("2012/01/15"));
            deepEqual(range.max, new Date("2012/01/29"));
        });

        test("translateRange with positive delta", function() {
            var range = dateAxis.translateRange(400);
            deepEqual(range.min, new Date("2012/02/05"));
            deepEqual(range.max, new Date("2012/02/19"));
        });

        test("translateRange uses min/max when no categories are defined", function() {
            createDateCategoryAxis({
                min: new Date("2012/02/01"),
                max: new Date("2012/02/10")
            });

            var range = dateAxis.translateRange(-400);
            deepEqual(range.min, new Date("2012/01/26"));
            deepEqual(range.max, new Date("2012/02/04"));
        });

        test("translateRange with no categories and min/max", function() {
            createDateCategoryAxis();

            var range = dateAxis.translateRange(-400);
            deepEqual(range, dateAxis.range());
        });

        test("scaleRange with negative delta expands range", function() {
            var range = dateAxis.scaleRange(-2);
            deepEqual(range.min, new Date("2012/01/25 22:04:48"));
            deepEqual(range.max, new Date("2012/02/15 01:55:12"));
        });

        test("scaleRange with positive delta shrinks range", function() {
            var range = dateAxis.scaleRange(2);
            deepEqual(range.min, new Date("2012/01/31 12:28:48"));
            deepEqual(range.max, new Date("2012/02/09 11:31:12"));
        });

        test("scaleRange uses min/max when no categories are defined", function() {
            createDateCategoryAxis({
                min: new Date("2012/02/01"),
                max: new Date("2012/02/10")
            });

            var range = dateAxis.scaleRange(2);
            deepEqual(range.min, new Date("2012/02/02 19:12:00"));
            deepEqual(range.max, new Date("2012/02/09 04:48:00"));
        });

        test("scaleRange with no categories and min/max", function() {
            createDateCategoryAxis();

            var range = dateAxis.scaleRange(-400);
            deepEqual(range, dateAxis.range());
        });

    })();

    (function() {
        function createDateValueAxis(min, max, options) {
            dateAxis = new DateValueAxis(
                min, max, options
            );

            dateAxis.reflow(chartBox);
            dateAxis.renderVisual();
        }

        // ------------------------------------------------------------
        module("Date Value Axis / Configuration");

        test("Min date can be parsed from string", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    min: "2012/02/01"
            });

            deepEqual(new Date(dateAxis.options.min), new Date("2012/02/01"));
        });

        test("Max date can be parsed from string", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    max: "2012/02/29"
            });

            deepEqual(new Date(dateAxis.options.max), new Date("2012/02/29"));
        });

        test("Axis crossing value can be parsed from string", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    axisCrossingValue: "2012/02/29"
            });

            deepEqual(new Date(dateAxis.options.axisCrossingValue), new Date("2012/02/29"));
        });

        test("Axis crossing values can be parsed from string array", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    axisCrossingValue: ["2012/02/28", "2012/02/29"]
            });

            deepEqual(dateAxis.options.axisCrossingValue,
                [new Date("2012/02/28"), new Date("2012/02/29")]
            );
        });

        test("Axis crossing values can be parsed from axisCrossingValues", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    axisCrossingValues: ["2012/02/28", "2012/02/29"]
            });

            deepEqual(dateAxis.options.axisCrossingValue,
                [new Date("2012/02/28"), new Date("2012/02/29")]
            );
        });

        test("Major ticks count is correct", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/06"));
            equal(dateAxis.getMajorTickPositions().length, 5);
        });

        test("Minor ticks count is correct", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/06"));
            equal(dateAxis.getMinorTickPositions().length, 21);
        });

        test("User set empty base unit defaults to automatic", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/06"), {
                baseUnit: ""
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Slots");

        test("Returns slot from date string", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/10"));

            deepEqual(dateAxis.getSlot("2012/02/01", "2012/02/02"),
                 dateAxis.getSlot(new Date("2012/02/01"), new Date("2012/02/02")));
        });

        test("limits slots depending on the limit parameter", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/10"));
            var limited = dateAxis.getSlot("2012/02/20", "2012/02/20", true),
                unlimited = dateAxis.getSlot("2012/02/20", "2012/02/20", false);
            close(limited.x1, 784, 1, 1, "value is limited");
            close(unlimited.x1, 1222, 1, "value is not limited");
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Slots / Positions", {
            setup: function() {
                createDateValueAxis(new Date("2014/06/01"), new Date("2014/06/15"));
            }
        });

        test("first slot is at min axis value", function() {
            var slot = dateAxis.getSlot("2014/05/25");
            close(slot.x1, 16, TOLERANCE);
        });

        test("mid slot position", function() {
            var slot = dateAxis.getSlot("2014/06/08");
            close(slot.x1, 400, TOLERANCE);
        });

        test("last slot is at max axis value", function() {
            var slot = dateAxis.getSlot("2014/06/22");
            close(slot.x2, 784, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Slots / Positions / Range", {
            setup: function() {
                createDateValueAxis(new Date("2014/06/01"), new Date("2014/06/15"), {
                    min: new Date("2014/06/01"),
                    max: new Date("2014/06/15")
                });
            }
        });

        test("first slot is at min axis value", function() {
            var slot = dateAxis.getSlot("2014/06/01");
            close(slot.x1, 12, TOLERANCE);
        });

        test("mid slot position", function() {
            var slot = dateAxis.getSlot("2014/06/08");
            close(slot.x1, 398, TOLERANCE);
        });

        test("last slot is at max axis value", function() {
            var slot = dateAxis.getSlot("2014/06/15");
            close(slot.x2, 784, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Range manipulation", {
            setup: function() {
                createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/10"));
            }
        });

        test("translateRange with negative delta", function() {
            var range = dateAxis.translateRange(-2);
            deepEqual(range.min, new Date("2012/01/22"));
            deepEqual(range.max, new Date("2012/02/05"));
        });

        test("translateRange with positive delta", function() {
            var range = dateAxis.translateRange(2);
            deepEqual(range.min, new Date("2012/01/29"));
            deepEqual(range.max, new Date("2012/02/12"));
        });

        test("scaleRange with negative delta expands range", function() {
            var range = dateAxis.scaleRange(-2);
            deepEqual(range.min, new Date("2012/01/25 22:04:48"));
            deepEqual(range.max, new Date("2012/02/15 01:55:12"));
        });

        test("scaleRange with positive delta shrinks range", function() {
            var range = dateAxis.scaleRange(2);
            deepEqual(range.min, new Date("2012/01/31 12:28:48"));
            deepEqual(range.max, new Date("2012/02/9 11:31:12"));
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Days");

        test("Base unit is inferred from series range", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/06")
            );

            equal("days", dateAxis.options.baseUnit);
        });

        test("Base unit is inferred from user set min/max", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/12/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2012/02/06")
            });

            equal(dateAxis.options.baseUnit, "days");
        });

        test("Base unit can be overriden", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/01/01"),
                    max: new Date("2012/03/01"),
                    baseUnit: "days"
            });

            equal("days", dateAxis.options.baseUnit);
        });

        test("Major unit is calculated for user set min/max", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2012/02/06")
            });

            equal(dateAxis.options.majorUnit, 2);
        });

        test("Major unit is calculated for user set min/max and base unit", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/01/01"),
                    max: new Date("2012/03/01"),
                    baseUnit: "days"
            });

            equal(dateAxis.options.majorUnit, 12);
        });

        test("Major unit is calculated for user set min and automatic max", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/11/01"),
                    baseUnit: "days"
            });

            equal(dateAxis.options.majorUnit, 6);
        });

        test("Major unit is calculated for user set max and automatic min", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    max: new Date("2012/01/10"),
                    baseUnit: "days"
            });

            equal(dateAxis.options.majorUnit, 2);
        });

        test("Major unit is calculated for series when user min/max are not set", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/06"));
            equal(dateAxis.options.majorUnit, 2);
        });

        test("Minor unit is derived from major unit", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/06"));
            equal(dateAxis.options.minorUnit, 0.4);
        });

        test("Automatic maximum is rounded to set major unit", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    majorUnit: 4
            });

            deepEqual(dateAxis.options.max, new Date("2012/02/12"));
        });

        test("Automatic maximum is rounded to auto major unit", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"));

            deepEqual(dateAxis.options.max, new Date("2012/02/12"));
        });

        test("Automatic minimum is rounded to set major unit", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    majorUnit: 4
            });

            deepEqual(dateAxis.options.min, new Date("2012/01/31"));
        });

        test("Automatic minimum is rounded to auto major unit", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/06"));

            deepEqual(dateAxis.options.min, new Date("2012/01/31"));
        });

        test("Reports range minimum equal to options.min", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    min: new Date("2012/02/05")
            });

            deepEqual(dateAxis.range().min, new Date("2012/02/05"));
        });

        test("Reports range maximum equal to options.max", function() {
            createDateValueAxis(
                new Date("2012/02/01"), new Date("2012/02/10"), {
                    max: new Date("2012/02/05")
            });

            deepEqual(dateAxis.range().max, new Date("2012/02/05"));
        });

        test("creates labels with default format", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/02"));

            equalTexts(getAxisTexts(), ["1/31", "2/1", "2/2", "2/3"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/02"), {
                labels: {
                    dateFormats: {
                        days: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/31/12", "2/1/12", "2/2/12", "2/3/12"]);
        });

        test("creates labels with custom format", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/02"), {
                labels: {
                    format: "M/d/yy"
                }
            });

            equalTexts(getAxisTexts(), ["1/31/12", "2/1/12", "2/2/12", "2/3/12"]);
        });

        test("creates labels with custom culture", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/02"), {
                labels: {
                    format: "d.MMM",
                    culture: "es-ES"
                }
            });

            equalTexts(getAxisTexts(), ["31.ene.", "1.feb.", "2.feb.", "3.feb."]);
        });

        test("creates labels with custom template", function() {
            createDateValueAxis(new Date("2012/02/01"), new Date("2012/02/02"), {
                categories: [
                    new Date("2012-02-01"), new Date("2012-02-01")
                ],
                labels: {
                    template: "#= kendo.toString(value, 'yyyy') #"
                }
            });

            equalTexts(getAxisTexts(), ["2012", "2012", "2012", "2012"]);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Weeks");

        test("Major unit is calculated for user set min/max (in weeks)", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2012/02/15"),
                    baseUnit: "weeks"
            });

            equal(dateAxis.options.majorUnit, 1);
        });

        test("creates labels with default format", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/01/15")
            );

            equalTexts(getAxisTexts(), ["12/25", "1/1", "1/8", "1/15", "1/22"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(new Date("2012/01/01"), new Date("2012/01/15"), {
                labels: {
                    dateFormats: {
                        weeks: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["12/25/11", "1/1/12", "1/8/12", "1/15/12", "1/22/12"]);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Weeks");

        test("Major unit is calculated for user set min/max (in weeks)", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2012/02/29"),
                    baseUnit: "weeks"
            });

            equal(dateAxis.options.majorUnit, 1);
        });

        test("creates labels with default format", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/01/14")
            );

            equalTexts(getAxisTexts(), ["12/25", "1/1", "1/8", "1/15"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(new Date("2012/01/01"), new Date("2012/01/14"), {
                labels: {
                    dateFormats: {
                        weeks: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["12/25/11", "1/1/12", "1/8/12", "1/15/12"]);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Months");

        test("Major unit is calculated for user set min/max (in months)", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/12/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2012/02/29"),
                    baseUnit: "months"
            });

            equal(dateAxis.options.majorUnit, 1);
        });

        test("creates labels with default format", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/02/01")
            );

            equalTexts(getAxisTexts(), ["Dec '11", "Jan '12", "Feb '12", "Mar '12"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(new Date("2012/01/01"), new Date("2012/02/01"), {
                labels: {
                    dateFormats: {
                        months: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["12/1/11", "1/1/12", "2/1/12", "3/1/12"]);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Years");

        test("Major unit is calculated for user set min/max (in years)", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2100/01/01"), {
                    min: new Date("2012/02/01"),
                    max: new Date("2013/02/01"),
                    baseUnit: "years"
            });

            equal(dateAxis.options.majorUnit, 1);
        });

        test("creates labels with default format", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2013/02/01")
            );

            equalTexts(getAxisTexts(), ["2011", "2012", "2013", "2014"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(new Date("2012/01/01"), new Date("2013/02/01"), {
                labels: {
                    dateFormats: {
                        years: "M/d/yy"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/1/11", "1/1/12", "1/1/13", "1/1/14"]);
        });

        // ------------------------------------------------------------
        module("Date Value Axis / Base unit / Hours");

        test("Major unit is calculated for user set min/max (in hours)", function() {
            createDateValueAxis(
                new Date("2012/01/01"), new Date("2012/01/02"), {
                    min: new Date("2012/02/01 15:00"),
                    max: new Date("2012/02/01 16:00"),
                    baseUnit: "hours"
            });

            equal(dateAxis.options.majorUnit, 1);
        });

        test("creates labels with default format", function() {
            createDateValueAxis(
                new Date("2012/01/01 15:00"), new Date("2012/01/01 16:00")
            );

            equalTexts(getAxisTexts(), ["14:00", "15:00", "16:00", "17:00"]);
        });

        test("creates labels with custom date format", function() {
            createDateValueAxis(
                new Date("2012/01/01 15:00"), new Date("2012/01/01 16:00"), {
                labels: {
                    dateFormats: {
                        hours: "M/d HH:mm"
                    }
                }
            });

            equalTexts(getAxisTexts(), ["1/1 14:00", "1/1 15:00", "1/1 16:00", "1/1 17:00"]);
        });

    })();

    (function() {
        var Point2D = kendo.dataviz.Point2D;
        var dateAxis;

        // ------------------------------------------------------------
        module("Date ValueAxis / getValue / Horizontal", {
            setup: function() {
                dateAxis = new DateValueAxis(
                    new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    vertical: false,
                    labels: { visible: false }
                });
                dateAxis.reflow(chartBox);
            }
        });

        test("returns null for coordinates left of axis", function() {
            deepEqual(dateAxis.getValue(new Point2D(-1, 0)), null);
        });

        test("returns null for coordinates right of axis", function() {
            deepEqual(dateAxis.getValue(new Point2D(1000, 0)), null);
        });

        test("returns minimum value for leftmost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 0)), new Date("2012/01/31"));
        });

        test("returns maximum value for righttmost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(799, 0)), new Date("2012/02/12"));
        });

        test("returns value for middle point", function() {
            deepEqual(dateAxis.getValue(new Point2D(399.5, 0)), new Date("2012/02/06 00:00:00"));
        });

        // ------------------------------------------------------------
        module("Date ValueAxis / getValue / Horizontal / Reverse", {
            setup: function() {
                dateAxis = new DateValueAxis(
                    new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    vertical: false,
                    reverse: true,
                    labels: { visible: false }
                });

                dateAxis.reflow(chartBox);
            }
        });

        test("returns minimum value for righttmost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(799, 0)), new Date("2012/01/31"));
        });

        test("returns maximum value for leftmost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 0)), new Date("2012/02/12"));
        });

        test("returns value for middle point", function() {
            deepEqual(dateAxis.getValue(new Point2D(399.5, 0)), new Date("2012/02/06 00:00:00"));
        });

        // ------------------------------------------------------------
        module("Date ValueAxis / getValue / Vertical", {
            setup: function() {
                dateAxis = new DateValueAxis(
                    new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    vertical: true,
                    labels: { visible: false }
                });
                dateAxis.reflow(chartBox);
            }
        });

        test("returns null for coordinates above the axis", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, -1)), null);
        });

        test("returns null for coordinates below the axis", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 1000)), null);
        });

        test("returns minimum value for bottommost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 599)), new Date("2012/01/31"));
        });

        test("returns maximum value for topmost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 0)), new Date("2012/02/12"));
        });

        test("returns value for middle point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 299.5)), new Date("2012/02/06"));
        });

        // ------------------------------------------------------------
        module("Date ValueAxis / getValue / Vertical / Reverse", {
            setup: function() {
                dateAxis = new DateValueAxis(
                    new Date("2012/02/01"), new Date("2012/02/10"), {
                    baseUnit: "days",
                    vertical: true,
                    reverse: true,
                    labels: { visible: false }
                });

                dateAxis.reflow(chartBox);
            }
        });

        test("returns minimum value for topmost  point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 0)), new Date("2012/01/31"));
        });

        test("returns maximum value for bottommost point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 599)), new Date("2012/02/12"));
        });

        test("returns value for middle point", function() {
            deepEqual(dateAxis.getValue(new Point2D(0, 299.5)), new Date("2012/02/06"));
        });
    })();

    (function() {
        var lteDateIndex = kendo.dataviz.lteDateIndex;

        // ------------------------------------------------------------
        module("lteDateIndex");

        test("returns -1 if the only item is greater", function() {
            equal(lteDateIndex(new Date("2011/12/31"), [new Date("2012/01/01")]), -1);
        });

        test("returns the only item index if equals", function() {
            equal(lteDateIndex(new Date("2012/01/01"), [new Date("2012/01/01")]), 0);
        });

        test("returns the only item index if less than", function() {
            equal(lteDateIndex(new Date("2012/02/01"), [new Date("2012/01/01")]), 0);
        });

        test("returns nearest item index (1)", function() {
            equal(lteDateIndex(new Date("2012/01/02"), [
                    new Date("2012/01/01"),
                    new Date("2012/01/03"),
                    new Date("2012/01/05")
                ]), 0);
        });

        test("returns nearest item index (2)", function() {
            equal(lteDateIndex(new Date("2012/01/04"), [
                    new Date("2012/01/01"),
                    new Date("2012/01/03"),
                    new Date("2012/01/05")
                ]), 1);
        });

        test("returns nearest item index (3)", function() {
            equal(lteDateIndex(new Date("2012/01/06"), [
                    new Date("2012/01/01"),
                    new Date("2012/01/03"),
                    new Date("2012/01/05")
                ]), 2);
        });

    })();

    (function() {
        var dateAxis, notes;

        function createDateCategoryAxis(options) {
            dateAxis = new DateCategoryAxis(
                $.extend({
                    categories: [new Date("2012/02/01"), new Date("2012/02/10")]
                }, options)
            );

            dateAxis.reflow(chartBox);
            dateAxis.renderVisual();
            notes = dateAxis.notes;
        }

        // ------------------------------------------------------------
        module("Date Category Axis / Notes");

        test("render note if is in the range of the axis", function() {
            createDateCategoryAxis({
                notes: {
                    data: [{
                        value: "2012/02/01"
                    },{
                        value: "2012/02/11"
                    }]
                }
            });

            ok(notes[0].options.visible);
            ok(notes[1].options.visible);
        });
    })();

    (function() {
        var plotArea,
            plotBands,
            lineSeriesData = [{
                name: "Value A",
                type: "line",
                data: [100, 200, 300]
            }],
            barSeriesData =  [{
                name: "Value A",
                type: "bar",
                data: [100, 20, 30]
            }];

        function getPlotBands() {
            return plotArea.axes[0]._plotbandGroup;
        }

        function createPlotArea(series, chartOptions) {
            plotArea = new dataviz.CategoricalPlotArea(series, kendo.deepExtend({
                categoryAxis: {
                    categories: [new Date("2012/01/01"), new Date("2012/01/02")],
                    plotBands: [{
                        from: new Date("2012/01/01"),
                        to: new Date("2012/01/03"),
                        color: "red"
                    }]
                }
            }, chartOptions));

            plotArea.reflow(chartBox);
            plotArea.renderVisual();
            plotBands = getPlotBands().children[0];
        }

        // ------------------------------------------------------------
        module("Date Axis / Plot Bands / Horizontal", {
            setup: function() {
                createPlotArea(lineSeriesData);
            }
        });

        test("renders box", function() {
            sameRectPath(plotBands, [33, 7.5, 799, 577], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Category Axis / Plot Bands / Horizontal / Justified", {
            setup: function() {
                createPlotArea(lineSeriesData, { categoryAxis: { justified: true } });
            }
        });

        test("renders box", function() {
            sameRectPath(plotBands, [33, 7.5, 788, 577], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Category Axis / Plot Bands / Vertical", {
            setup: function() {
                createPlotArea(barSeriesData);
            }
        });

        test("renders box", function() {
            sameRectPath(plotBands, [33, 0, 788, 576], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("Category Axis / Plot Bands / Vertical / Justified", {
            setup: function() {
                createPlotArea([{
                    name: "Value A",
                    type: "verticalLine",
                    data: [100, 200, 300]
                }], { categoryAxis: { justified: true } });
            }
        });

        test("renders box", function() {
            sameRectPath(plotBands, [33, 7, 788, 576], TOLERANCE);
        });
    })();
})();
