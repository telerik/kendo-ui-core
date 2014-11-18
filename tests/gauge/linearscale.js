(function() {
    var dataviz = kendo.dataviz;
    var Gauge = dataviz.ui.Gauge;
    var LinearScale;
    var linearScale;
    var chartBox = new dataviz.Box2D(0, 0, 400, 400);
    var TOLERANCE = 1.5;

    LinearScale = dataviz.LinearScale.extend({
        options: {
            labels: {
                // Tests expect particular font size
                font: "16px Verdana, sans-serif"
            }
        }
    });

    function createScale(options) {
        linearScale = new LinearScale(options);
    }

    // ------------------------------------------------------------
    module("Linear Scale/ Ranges");

    test("render range from 10 to 20", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20
            }]
        });

        linearScale.reflow(chartBox);
        var ranges = linearScale.renderRanges().bbox();

        arrayClose([ranges.origin.x , ranges.origin.y,
                    ranges.origin.x + ranges.width(), ranges.origin.y + ranges.height()],
                   [35, 238.1, 40, 313.4], TOLERANCE);
    });

    test("render range from 10 to 15 and from 15 to 20", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 15
            }, {
                from: 15,
                to: 20
            }]
        });

        linearScale.reflow(chartBox);
        var ranges = linearScale.renderRanges();
        var first = ranges.children[0].bbox();
        var second = ranges.children[1].bbox();

        arrayClose([first.origin.x , first.origin.y,
                    first.origin.x + first.width(), first.origin.y + first.height()],
                    [35, 276, 40, 313.4], TOLERANCE);

        arrayClose([second.origin.x , second.origin.y,
                    second.origin.x + second.width(), second.origin.y + second.height()],
                   [35, 238, 40, 276], TOLERANCE);
    });

    // ------------------------------------------------------------
    module("Linear Scale / Configuration");

    test("render scale with default min, max and step", function() {
        createScale({ });
        var options = linearScale.options;
        equal(options.min, 0);
        equal(options.max, 50);
        equal(options.majorUnit, 10);
    });

    test("render scale with min=0 max=12 step=2", function() {
        createScale({
            min: 0,
            max: 12
        });
        equal(linearScale.options.majorUnit, 2);
    });

    test("sets auto majorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(linearScale.options.majorUnit, 200);
    });

    test("sets auto minorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(linearScale.options.minorUnit, 20);
    });

    test("sets majorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            majorUnit: 10
        });
        equal(linearScale.options.majorUnit, 10);
    });

    test("sets auto minorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            minorUnit: 10
        });
        equal(linearScale.options.minorUnit, 10);
    });

    // ------------------------------------------------------------
    module("Linear Scale/ Ranges/ Configuration");

    test("render color", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20,
                color: "red"
            }]
        });

        linearScale.reflow(chartBox);
        var ranges = linearScale.renderRanges();
        var first = ranges.children[0];

        ok(first.options.fill.color, "red");
    });

    test("render opacity", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20,
                opacity: 0.33
            }]
        });

        linearScale.reflow(chartBox);
        var ranges = linearScale.renderRanges();
        var first = ranges.children[0];

        ok(first.options.fill.opacity, 0.33);
    });
}());
