(function(){

var dataviz = kendo.dataviz,
    Gauge = dataviz.ui.Gauge,
    Box2D = dataviz.Box2D,
    Point2D = dataviz.Point2D,
    RadialPointer = dataviz.RadialPointer,
    pointer,
    chartBox = new Box2D(0, 0, 400, 300);

// Tests expect particular font size

function stubScale(min, max) {
    var scale = new dataviz.RadialScale({
        min: min,
        max: max
    });

    scale.ring = new dataviz.Ring(new Point2D(100, 100), 50, 100, 90, 180);

    return scale;
}

module("RadialPointer", {
    setup: function() {
        this.font = dataviz.Text.fn.options.font;
        dataviz.Text.fn.options.font = "16px Verdana, sans-serif";
        pointer = new RadialPointer(stubScale(), {
                type: "needle"
            });

        pointer.getViewElements(new dataviz.SVGView());
    },
    teardown: function() {
        dataviz.Text.fn.options.font = this.font;
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

test("value() takes scale.min into account", function() {
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
