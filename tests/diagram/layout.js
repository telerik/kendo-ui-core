var diagram = kendo.diagram;
var Range = kendo.diagram.Range;
var Graph = kendo.diagram.Graph;
var Node = kendo.diagram.Node;
var Link = kendo.diagram.Link;
var Dictionary = kendo.diagram.Dictionary;
var HashTable = kendo.diagram.HashTable;
var Queue = kendo.diagram.Queue;
var Predefined = kendo.diagram.Graph.Predefined;
var GraphUtils = kendo.diagram.Graph.Utils;
var parse = kendo.diagram.Graph.Utils.parse;
var linearize = kendo.diagram.Graph.Utils.linearize;
var Adapter = kendo.diagram.GraphAdapter;
var Point = kendo.diagram.Point;
var Set = kendo.diagram.Set;
var Utils = diagram.Utils;
/*-------------Testing Utils----------------------------------*/

QUnit.testSkip = function () {
    QUnit.test(arguments[0] + ' [SKIPPED]', function () {
        var li = document.getElementById(QUnit.config.current.id);
        QUnit.done(function () {
            li.style.background = '#FFFF99';
        });
        ok(true);
    });
};

/*
 Defines a test which has to be skipped during a run.
 */
testSkip = QUnit.testSkip;

function lexicCount(c, name) {
    switch (c) {
        case 0:
            return null;
        case 1:
            return "one " + name;
        default:
            return c + " " + name + "s";
    }
};

var CountObjects = function (obj) {
    var items = [];
    if (obj.shapes && obj.shapes.Items) {
        items.push(lexicCount(obj.shapes.Items.length, "shape"));
    }
    if (obj.groups && obj.groups.Items) {
        items.push(lexicCount(obj.groups.Items.length, "group"));
    }
    if (obj.connections && obj.connections.Items) {
        items.push(lexicCount(obj.connections.Items.length, "connection"));
    }
    switch (items.length) {
        case 0:
            return "The XML contained an empty diagram.";
        case 1:
            return "Found " + items[0];
        case 2:
            return "Found " + items[0] + " and " + items[1];
        case 3:
            return "Found " + items[0] + ", " + items[1] + " and " + items[2];
    }
};

var Accuracy = 1E-6;


QUnit.module("Layout algorithms");

testSkip('Graph to diagram', function () {
    var g = Predefined.Grid(5, 5);
    //var g = Predefined.Forest(3,2,2);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var d = diagramElement.data("kendoDiagram");
    d.canvas.native.setAttribute("height", "1000");
    // converting a Graph to a diagram (with internal spring layout to please the eyes)
    GraphUtils.createDiagramFromGraph(d, g, false);
    d.layout(kendo.diagram.LayoutTypes.ForceDirectedLayout,
        {
            iterations: 300,
            nodeDistance: 50
        }
    )
    ok(d.shapes.length == 36 && d.connections.length == 60, "Grid of 36 shapes and 60 connections.");
});

testSkip('Spring layout', function () {
    var g = Predefined.Forest(3, 3, 8);
    //var g = GraphUtils.createRandomConnectedGraph(300,2,true);

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var d = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(d, g);
    ok(true);
});

testSkip('Spring layout', function () {
    var g = Predefined.Forest(3, 3, 3);
    //var g = GraphUtils.createRandomConnectedGraph(300,2,true);

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    diagram.layout(kendo.diagram.LayoutTypes.ForceDirectedLayout, {iterations: 400});
    ok(true);
});

testSkip('Spring layout', function () {

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    var map = [];
    for (var i = 0; i < 10; i++) {
        var shape = diagram.addShape();
        shape.id = i.toString();
        map[i] = shape;
    }
    // create explicitly a radial diagram without passing through the graph structure
    for (var i = 1; i < 10; i++) {
        diagram.connect(map[0], map[i]);
    }
    diagram.layout();
    ok(true);
});

testSkip('Tree layout', function () {
    var g = Predefined.Tree(3, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(diagram, g, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {});
    ok(true);
});

testSkip('Grid layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    var map = [];
    for (var i = 0; i < 100; i++) {
        var shape = diagram.addShape();
        shape.id = i.toString();
        map[i] = shape;
    }
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {
            componentMargin: new kendo.diagram.Size(0,0)

        }
    );
    ok(true);
});

testSkip('Forest layout', function () {
    var g = Predefined.Forest(3, 2, 13);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {treeLayoutType: kendo.diagram.TreeLayoutType.TreeDown});
    ok(true);
});

testSkip('Random diagram layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");

    diagram.randomDiagram(parseInt(Math.random() * 150 + 1), 3, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.TreeRight
        }
    )
    ok(true);
});

testSkip('Radial layout', function () {
    var g = Predefined.Forest(2, 3,5);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    var roots = [];
    var components = g.getConnectedComponents();
    for (var i = 0; i < components.length; i++) {
        var rootid = components[i].nodes[0].id;
        var root = diagram.getId(rootid);
        root.shapeVisual.background("red");
        roots.push(root);
    }
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.RadialTree,
            roots: roots
        }
    )
    ok(true);
});

testSkip('Radial layout', function () {

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(20, 5, true);
    var root = diagram.getId("0");
    root.shapeVisual.background("Orange");
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.RadialTree,
            roots: [root]
        }
    )
    ok(true);
});

testSkip('Mindmap layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    diagramElement.css("width", "800");
    diagramElement.css("height", "800");
    var diagram = diagramElement.data("kendoDiagram");
    var map = [];
    for (var i = 0; i < 10; i++) {
        var shape = diagram.addShape();
        shape.id = i.toString();
        shape.visual.native.id=shape.id;
        map[i] = shape;
    }
    // create explicitly a radial diagram without passing through the graph structure
    for (var i = 1; i < 10; i++) {
        diagram.connect(map[0], map[i]);
    }

    var root = diagram.getId("0");
    root.shapeVisual.background("Orange");
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal  ,
            roots: [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function () {
    var g = Predefined.Tree(3, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    var root = diagram.getId("0");
    root.shapeVisual.background("Orange");

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapVertical     ,
            roots: [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function () {
    var g = Predefined.Mindmap();
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    var root = diagram.getId("0");
    root.shapeVisual.background("Orange");

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal   ,
            roots: [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(250, 3, true);
    var root = diagram.getId("0");
    root.shapeVisual.background("Green");

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal,
            verticalSeparation: 2,
            horizontalSeparation: 150,
            roots: [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Tip-over tree layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(50, 3, true);

    var root = diagram.getId("0");
    root.shapeVisual.background("red");
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.TipOverTree,
            verticalSeparation: 25,
            horizontalSeparation: 10,
            underneathHorizontalOffset: 10,
            underneathVerticalTopOffset: 10,
            roots: [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Varying shape size layout', function () {
    var g = Predefined.Tree(3, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false, true);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.TreeUp
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Layered layout', function () {
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(50, 15, false, true);


    /*  var g = Predefined.Forest(3,3,3);
     var div = GetRoot();
     var diagramElement = $("#canvas").kendoDiagram();
     var diagram = diagramElement.data("kendoDiagram");
     diagram.canvas.native.setAttribute("height", "1000");
     GraphUtils.createDiagramFromGraph(diagram, g, false);*/

    var root = diagram.getId("0");
    diagram.layout(kendo.diagram.LayoutTypes.LayeredLayout,
        {
            layerDistance: 250,
            nodeDistance: 50,
            layeredLayoutType: kendo.diagram.LayeredLayoutType.Right
        });
    diagram.zoom(0.5);
    ok(true);
});


testSkip('Layout roots', function () {
    var g = Predefined.Forest(2, 3, 5);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    var roots = [];
    var components = g.getConnectedComponents();
    for (var i = 0; i < components.length; i++) {
        var rootid = components[i].nodes[3].id;
        var root = diagram.getId(rootid);
        root.shapeVisual.background("red");
        roots.push(root);
    }

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {
        roots: roots
    });
    ok(true);
});