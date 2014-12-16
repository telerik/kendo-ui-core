(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        Point = dataviz.diagram.Point,
        Rect = dataviz.diagram.Rect,
        diagram;

    function createDiagram() {
        diagram = $('<div id="diagram" style="width: 800px; height: 600px;" />')
            .appendTo(QUnit.fixture)
            .kendoDiagram({
                shapes: [{
                    id: "shape1"
                },{
                    id: "shape2",
                    x: 150,
                    y: 150
                }],
                connections: [{
                    from: "shape1",
                    to: "shape2"
                }],
                connectionDefaults: {
                    type: "polyline"
                }
            })
            .getKendoDiagram();

        return diagram;
    }

    /*-----------------------------------------------*/
    module("Diagram connections / configuration", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("type polyline", function () {
        $.each(diagram.connections, function(index, item) {
            equal(this.options.type, "polyline");
        });
    });
})();
