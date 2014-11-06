(function(){
    var dataviz = kendo.dataviz;
    var RadialGauge = dataviz.RadialGauge;
    var DEFAULT_MARGIN = 5
    var TOLERANCE = 1.5 + DEFAULT_MARGIN;
    var elem = "<div id='gauge' style='width: 200px; height: 200px;'></div>"; //$('<div/>').width(200).height(200);

    (function() {
        function createGauge(options) {
            $(elem).appendTo(QUnit.fixture);
            radialGauge = new RadialGauge($("#gauge"), options);
            box = radialGauge.plotBbox;
        }

        module("Radial Gauge / Reflow", {
            setup: function() {
                createGauge();
            },
            teardown: function() {
                kendo.destroy(QUnit.fixture);
                QUnit.fixture.empty();
            }
        });

        test("fit plot area box in gauge with 0:90", function() {

            createGauge({ scale: { startAngle: 0, endAngle: 90 }});
            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], 
                       [ 0, 1.5, 200, 198.5 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 0:45", function() {
            createGauge({ scale: { startAngle: 0, endAngle: 45 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 28, 200, 172 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 45:90", function() {
            createGauge({ scale: { startAngle: 45, endAngle: 90 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 27, 1, 173, 200], TOLERANCE);
        });

        test("fit plot area box in gauge with 90:180", function() {
            createGauge({ scale: { startAngle: 90, endAngle: 180 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 1, 200, 200], TOLERANCE);
        });

        test("fit plot area box in gauge with 90:135", function() {
            createGauge({ scale: { startAngle: 90, endAngle: 135 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 29, 1, 172, 200], TOLERANCE);
        });

        test("fit plot area box in gauge with 135:180", function() {
            createGauge({ scale: { startAngle: 135, endAngle: 180 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 28, 200, 172], TOLERANCE);
        });

        test("fit plot area box in gauge with 180:270", function() {
            createGauge({ scale: { startAngle: 180, endAngle: 270 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 0, 1.5, 200, 198.5 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 180:225", function() {
            createGauge({ scale: { startAngle: 180, endAngle: 225 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 29, 200, 172 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 225:270", function() {
            createGauge({ scale: { startAngle: 225, endAngle: 270 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 27, 1, 173, 200 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 270:360", function() {
            createGauge({ scale: { startAngle: 270, endAngle: 360 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 1, 200, 200 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 270:315", function() {
            createGauge({ scale: { startAngle: 270, endAngle: 315 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 29, 1, 172, 200 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 315:360", function() {
            createGauge({ scale: { startAngle: 315, endAngle: 360 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 29, 200, 172 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 0:180", function() {
            createGauge({ scale: { startAngle: 0, endAngle: 180 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 0, 45, 200, 155 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 90:270", function() {
            createGauge({ scale: { startAngle: 315, endAngle: 360 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 29, 200, 172 ], TOLERANCE);
        });

        test("fit plot area box in gauge with 180:360", function() {
            createGauge({ scale: { startAngle: 315, endAngle: 360 }});

            arrayClose([ box.origin.x, box.origin.y, box.origin.x + box.width(), box.origin.y + box.height() ], [ 1, 29, 200, 172 ], TOLERANCE);
        });
    }());    

    (function() {
        var arc;
        var radius = 100;

        module("RadialGauge / Reflow / Without pointer");
    })();
}());