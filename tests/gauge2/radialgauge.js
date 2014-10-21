(function(){
    var dataviz = kendo.dataviz;
    var RadialGauge = dataviz.newGauge.RadialGauge;
    //var gaugeBox = new Rect([0, 0], [200, 200]);
    var TOLERANCE = 1.5;
    var elem = $('<div/>').width(200).height(200);

    (function() {
        function createGauge(options) {
            radialGauge = new RadialGauge(elem, options);
            radialGauge.reflow();
            box = radialGauge.plotArea;
        }

        module("PlotArea / Reflow", {
            setup: function() {
                //createGauge();
            },
            teardown: function() {
                radialGauge.destroy();
                elem.remove();
            }
        });

        // test("fit plot area box in gauge with 0:90", function() {
        //     debugger;
        //     createGauge({ scale: { startAngle: 0, endAngle: 90 }});

        //     arrayClose([ box.origin.x, box.origin.y, box.origin.x + 200, box.origin.y + 200 ], 
        //                [ 0, 1.5, 200, 198.5 ], TOLERANCE);
        //     //arrayClose([ box.x1, box.y1, box.x2, box.y2 ], [ 0, 1.5, 200, 198.5 ], TOLERANCE);
        // });

    }());    

}());