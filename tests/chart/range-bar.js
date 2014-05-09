(function() {
    var dataviz = kendo.dataviz;
    var chart;

    var positiveSeries = { type: "rangeColumn", data: [[1, 2]] };
    var negativeSeries = { type: "rangeColumn", data: [[-1, -2]] };

    // ------------------------------------------------------------
    module("Range Column Chart / aboveAxis", {
        teardown: destroyChart
    });

    test("is set to true when from < to", function() {
        var chart = createChart({ series: [ positiveSeries ] });
        var bar = chart._plotArea.charts[0].points[0];

        ok(bar.aboveAxis);
    });

    test("is set to false when from > to", function() {
        var chart = createChart({ series: [ negativeSeries ] });
        var bar = chart._plotArea.charts[0].points[0];

        ok(!bar.aboveAxis);
    });

})();
