(function(){

var dataviz = kendo.dataviz,
    gaugeElement,
    gauge;

function createGauge(options) {
    gaugeElement = $("<div>").kendoRadialGauge(kendo.deepExtend({
        pointer: [{
            value: 50
        }, {
            value: 20
        }],
        scale: {
            min: 0,
            max: 100
        }
    }, options));

    gauge = gaugeElement.data("kendoRadialGauge");
}

function destroyGauge() {
    kendo.destroy(gaugeElement);
}

module("Radial Gauge / API", {
    setup: function() {
        createGauge();
    },
    teardown: destroyGauge
});

test("value() method calls pointer.value()", function() {
    var calls = 0,
        usedValue;

    gauge.draw = function() { };
    gauge.pointers[0].value = function(value) {
        calls++;
        usedValue = value;
    };

    gauge.value(10);

    equal(calls, 1);
    equal(usedValue, 10);
});

test("value(x) does not fail with transitions disabled", function() {
    destroyGauge();
    createGauge({ transitions: false });
    gauge.value(10);
    ok(true);
});

test("value() with no args returns pointer value", function() {
    gauge.value(11);

    equal(gauge.value(), 11);
});

test("allValues() method calls pointer.value()", function() {
    var calls = 0,
        usedValue;

    gauge.draw = function() { };

    gauge.pointers[0].value = function(value) {
        calls++;
        usedValue = value;
    };

    gauge.allValues([10]);

    equal(calls, 1);
    equal(usedValue, 10);
});

test("allValues(x) does not fail with transitions disabled", function() {
    destroyGauge();
    createGauge({ transitions: false });
    gauge.allValues([10]);
    ok(true);
});

test("allValues() with no args returns all pointer values", function() {
    gauge.allValues([10, 20]);

    deepEqual(gauge.allValues(), [10, 20]);
});

// test("value(x) updates value in options", function() {
//     gauge.value(11);

//     equal(gauge.options.pointer.value, 11);
// });

}());