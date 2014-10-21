(function() {
    var dataviz = kendo.dataviz;
    var Gauge = dataviz.newGauge.Gauge;
    var RadialPointer = dataviz.newGauge.RadialPointer;
    var geo = dataviz.geometry;
    var Rect = geo.Rect;
    var Arc = geo.Arc;
    var RadialScale;
    var pointer;
    var chartBox = new Rect([0, 0], [400, 300]);

    RadialScale = dataviz.newGauge.RadialScale.extend({
        options: {
            labels: {
                // Tests expect particular font size
                font: "16px Verdana, sans-serif"
            }
        }
    });

    function stubScale(min, max) {
        var scale = new RadialScale({
            min: min,
            max: max
        });

        scale.arc = new Arc([100, 100], {
            radiusX: 100,
            radiusY: 100,
            startAngle: 270,
            endAngle: 360
        });

        return scale;
    }

    module("RadialPointer", {
        setup: function() {
            pointer = new RadialPointer(stubScale(), {
                    type: "needle"
                });

            //pointer.getViewElements(new dataviz.SVGView());
        }
    });

    test("value() updates value", function() {
        pointer.value(10);

        equal(pointer.options.value, 10);
    });

    test("value() returns value", function() {
        pointer.options.value = 15;

        equal(pointer.value(), 15);
    });

    test("value() calls repaint()", function() {
        var called = false;

        pointer.repaint = function() {
            called = true;
        };

        pointer.value(15);

        ok(called);
    });

    test("value() takes scale.min into account", function() {
        pointer.scale.options.min = -20;

        pointer.value(-21);

        equal(pointer.value(), -20);
    });

    test("value() takes scale.max into account", function() {
        pointer.scale.options.max = 20;

        pointer.value(21);

        equal(pointer.value(), 20);
    });

    test("initial pointer value is constrained within scale range", function() {
        pointer = new RadialPointer(stubScale(-1, 11), {
            value: -2
        });

        equal(pointer.value(), -1);

        pointer = new RadialPointer(stubScale(0, 11), {
            value: 12
        });

        equal(pointer.value(), 11);
    });
}());