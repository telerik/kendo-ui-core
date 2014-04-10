(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        Point = dataviz.diagram.Point,
        Rect = dataviz.diagram.Rect,
        diagram;

    /*-----------------------------------------------*/
    module("api / select", {
        setup: function () {
            var div = QUnit.fixture.html('<div id="diagram" />');
            diagram = div.kendoDiagram({
                shapes: [{
                    id: "rect",
                    type: "Rectangle",
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },{
                    id: "rect1",
                    type: "Rectangle",
                    x: 200,
                    y: 200,
                    width: 100,
                    height: 100
                }]
            }).getKendoDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items from an array", function () {
        diagram.select(diagram.shapes);

        $.each(diagram.shapes, function() {
            ok(this.isSelected);
        });
    });

    test("select an item", function () {
        diagram.select(diagram.shapes[0]);

        ok(diagram.shapes[0].isSelected);
    });

    test("select all items", function () {
        diagram.select(true);
        $.each(diagram.shapes, function(index, item) {
            ok(this.isSelected);
        });
    });

    /*-----------------------------------------------*/
    module("api / deselect", {
        setup: function () {
            var div = QUnit.fixture.html('<div id="diagram" />');
            diagram = div.kendoDiagram({
                shapes: [{
                    id: "rect",
                    type: "Rectangle",
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },{
                    id: "rect1",
                    type: "Rectangle",
                    x: 200,
                    y: 200,
                    width: 100,
                    height: 100
                }]
            }).getKendoDiagram();
            // make all items selected
            diagram.select(true);
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("deselect all array items", function () {
        diagram.deselect(diagram.shapes);
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });

    test("deselect item", function () {
        var item = diagram.shapes[0]
        diagram.deselect(item);
        ok(item.isSelected === false);
    });

    test("deselect all items", function () {
        diagram.deselect();
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });
})();
