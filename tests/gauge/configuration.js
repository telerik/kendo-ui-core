(function(){

var dataviz = kendo.dataviz,
    gaugeElement,
    gauge;

function createGauge(options) {
    gaugeElement = $("<div />").kendoRadialGauge(kendo.deepExtend({
        pointer: {
            value: 50
        },

        scale: {
            min: 0,
            max: 100
        }
    }, options));

    gauge = gaugeElement.data("kendoRadialGauge");
}

// ------------------------------------------------------------
module("Radial Gauge / View", {
    setup: function() {
        createGauge();
    },
    teardown: function() {
        kendo.destroy(gaugeElement);
    }
});

asyncTest("uses preferred view specified in 'renderAs'", 1, function() {
    stubMethod(dataviz.ViewFactory.prototype, "create", function(options, preferred) {
        equal(preferred, "foo");
        start();
    }, function() {
        createGauge({ renderAs: "foo" });
    });
});

})();

