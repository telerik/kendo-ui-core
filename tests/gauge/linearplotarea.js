(function(){

var dataviz = kendo.dataviz,
    LinearGaugePlotArea = dataviz.LinearGaugePlotArea,
    Box2D = dataviz.Box2D,
    Point2D = dataviz.Point2D,
    gaugeBox = new Box2D(0, 0, 300, 300),
    box,
    view,
    TOLERANCE = 1.5,
    plotArea;

function createPlotArea(options) {
    plotArea = new LinearGaugePlotArea(options);
    plotArea.reflow(gaugeBox);
    view = new ViewStub();
    plotArea.getViewElements(view);
    box = plotArea.box;
}

module("PlotArea / Vertical", {
    teardown: destroyMeasureBox
});

test("getBox return centered box", function() {
    plotArea = new LinearGaugePlotArea();
    plotArea.pointer = { box: new Box2D(0, 0, 0, 0) };
    plotArea.scale = { box: new Box2D(0, 0, 100, 100) };
    plotArea.scale.options = { vertical: true };
    box = plotArea.getBox(gaugeBox);

    deepEqual([box.x1, box.y1, box.x2, box.y2], [100, 0, 200, 300]);
});

module("PlotArea / Horizontal", {
    teardown: destroyMeasureBox
});

test("getBox return centered box", function() {
    plotArea = new LinearGaugePlotArea();
    plotArea.pointer = { box: new Box2D(0, 0, 0, 0) };
    plotArea.scale = { box: new Box2D(0, 0, 100, 100) };
    plotArea.scale.options = { vertical: false };
    box = plotArea.getBox(gaugeBox);

    deepEqual([box.x1, box.y1, box.x2, box.y2], [0, 100, 300, 200]);
});

module("PlotArea / Configuration", {
    setup: function() {
        createPlotArea({
            plotArea: {
                background: "red",
                border: {
                    width: 2,
                    color: "blue",
                    dashType: "dot"
                }
            }
        });
    },
    teardown: destroyMeasureBox
});

test("renders background", function() {
    ok(view.log.rect[1].style.fill == "red");
});

test("renders border", function() {
    var rect = view.log.rect[1].style;
    ok(rect.stroke == "blue");
    ok(rect.dashType == "dot");
    ok(rect.strokeWidth == 2);
});

}());
