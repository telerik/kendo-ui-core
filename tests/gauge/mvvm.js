(function(){

    var dom;

    module("Gauge / Radigal mvvm", {
        teardown: function() {
           kendo.destroy(dom);
        }
    });

    // test("initializes a radial gauge when data role is gauge", function() {
    //     dom = $('<div data-role="radialgauge2" />');

    //     kendo.bind(dom, {}, kendo.dataviz.newGauge);

    //     ok(dom.data("kendoRadialGauge2") instanceof kendo.dataviz.newGauge.RadialGauge);
    // });

}());