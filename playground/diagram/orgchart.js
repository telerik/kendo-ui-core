var Shapes = {
    Rectangle: function (point) {
        return {
            data: "Rectangle"
        };
    },
    Triangle: function () {
        return {
            data: "m0,100 L100,100 L50,0z"
        };
    },
    SequentialData: function () {
        return {
            data: "m50.21875,97.4375l0,0c-26.35457,0 -47.71875,-21.25185 -47.71875,-47.46875l0,0c0,-26.21678 21.36418,-47.46875 47.71875,-47.46875l0,0c12.65584,0 24.79359,5.00155 33.74218,13.90339c8.94862,8.90154 13.97657,20.97617 13.97657,33.56536l0,0c0,12.58895 -5.02795,24.66367 -13.97657,33.56542l13.97657,0l0,13.90333l-47.71875,0z"
        };
    },
    Data: function () {
        return {
            data: "m2.5,97.70305l19.07013,-95.20305l76.27361,0l-19.0702,95.20305l-76.27354,0z"
        };
    },
    Wave: function () {
        return {
            data: "m2.5,15.5967c31.68356,-45.3672 63.37309,45.3642 95.05661,0l0,81.65914c-31.68353,45.36404 -63.37305,-45.36732 -95.05661,0l0,-81.65914z"
        };
    }
};

$(document).ready(function (e) {
    $("#canvas").kendoDiagram();
    var diagram = $("#canvas").data("kendoDiagram"),
        kendo = window.kendo,
        Point = kendo.diagram.Point;

    // Org Chart also...
    var s1 = diagram.addShape(new Point(400, 0), Shapes.Rectangle());

    var s2 = diagram.addShape(new Point(200, 200), Shapes.Rectangle());
    var s3 = diagram.addShape(new Point(400, 200), Shapes.Rectangle());
    var s4 = diagram.addShape(new Point(600, 200), Shapes.Rectangle());

    var s5 = diagram.addShape(new Point(200, 400), Shapes.Rectangle());
    var s6 = diagram.addShape(new Point(400, 400), Shapes.Rectangle());
    var s7 = diagram.addShape(new Point(600, 400), Shapes.Rectangle());

    var s8 = diagram.addShape(new Point(200, 600), Shapes.Rectangle());
    var s9 = diagram.addShape(new Point(600, 600), Shapes.Rectangle());

    diagram.connect(s1, s2);
    diagram.connect(s1, s3);
    diagram.connect(s1, s4);
    diagram.connect(s2, s5);
    diagram.connect(s3, s6);
    diagram.connect(s4, s7);
    diagram.connect(s5, s8);
    diagram.connect(s7, s9);

    $("#undoButton").click(function (e) {
        diagram.undo();
    });
    $("#redoButton").click(function (e) {
        diagram.redo();
    });
    $("#deleteButton").click(function (e) {
        diagram.remove(diagram.select(), true);
    });
    $("#selectAllButton").click(function (e) {
        diagram.select(true);
    });
});
