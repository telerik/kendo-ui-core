(function() {
    var dataviz = kendo.dataviz;

    var positiveSeries = { type: "rangeColumn", data: [[1, 2]] };
    var negativeSeries = { type: "rangeColumn", data: [[-1, -2]] };
    var sparseSeries = { type: "rangeColumn", data: [null, [1, 2]] };

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

    // ------------------------------------------------------------
    module("Range Bar / Labels", {
        teardown: destroyChart
    });

    test("Has default format", function() {
        var chart = createChart({ series: [ $.extend(positiveSeries, { labels: { visible: true } }) ] });
        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.label.children[0].content, "1 - 2");
    });

    test("Empty for null values", function() {
        var chart = createChart({ series: [ $.extend(sparseSeries, { labels: { visible: true } }) ] });
        var bar = chart._plotArea.charts[0].points[0];
        equal(bar.label.children[0].content, "");
    });
})();
