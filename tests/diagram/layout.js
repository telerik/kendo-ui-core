///<reference path="qunit-1.12.0.js" />
///<reference path="../refs/kendo.core.js" />
///<reference path="../refs/kendo.dataviz.core.js" />
///<reference path="../js/diagram.math.js" />

(function() {
    var diagram = kendo.diagram;
    var Range = diagram.Range;
    var Graph = diagram.Graph;
    var Node = diagram.Node;
    var Link = diagram.Link;
    var Dictionary = diagram.Dictionary;
    var HashTable = diagram.HashTable;
    var Queue = diagram.Queue;
    var Predefined = diagram.Graph.Predefined;
    var GraphUtils = diagram.Graph.Utils;
    var parse = diagram.Graph.Utils.parse;
    var linearize = diagram.Graph.Utils.linearize;
    var Adapter = diagram.GraphAdapter;
    var Point = diagram.Point;
    var Set = diagram.Set;
    var Utils = diagram.Utils;
    var randomDiagram = diagram.Graph.Utils.randomDiagram;
    /*-------------Testing Utils----------------------------------*/

    QUnit.testSkip = function () {
        QUnit.test(arguments[0] + ' [SKIPPED]', function () {
            var li = document.getElementById(QUnit.config.current.id);
            QUnit.done(function () {
                if(li) {
                    li.style.background = '#FFFF99';
                }
            });
            ok(true);
        });
    };

    /*
     Defines a test which has to be skipped during a run.
     */
    var testSkip = QUnit.testSkip;

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
        d.layout(
            {
                type:"Force",
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
        diagram.layout( {type:"Force", iterations: 400});
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

        diagram.layout();
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
        diagram.layout( {
                grid: {
                    componentSpacingX: 0,
                    componentSpacingY: 0
                }
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
        diagram.layout({type: "tree", subtype: "Down"});
        ok(true);
    });

    testSkip('Random diagram layout', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        diagram.canvas.native.setAttribute("height", "1000");

        randomDiagram(diagram, parseInt(Math.random() * 150 + 1), 3, false);

        diagram.layout({type: "tree", subtype: "Right"});
        ok(true);
    });

    testSkip('Radial layout', function () {
        var g = Predefined.Forest(2, 3, 5);
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
        diagram.layout({type: "tree", subtype: "Radial"});
        ok(true);
    });

    testSkip('Radial layout', function () {

        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        diagram.canvas.native.setAttribute("height", "1000");
        randomDiagram(20, 5, true);
        var root = diagram.getId("0");
        root.shapeVisual.background("Orange");
        diagram.layout({type: "tree", subtype: "Radial"});
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
            shape.visual.native.id = shape.id;
            map[i] = shape;
        }
        // create explicitly a radial diagram without passing through the graph structure
        for (var i = 1; i < 10; i++) {
            diagram.connect(map[0], map[i]);
        }

        var root = diagram.getId("0");
        root.shapeVisual.background("Orange");
        diagram.layout({type: "tree", subtype: "Mindmap", roots: [root]});
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

        diagram.layout({type: "tree", subtype: "MindmapVertical", roots: [root]});
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

        diagram.layout({type: "tree", subtype: "Mindmap", roots: [root]})
        diagram.zoom(0.5);
        ok(true);
    });

    testSkip('Mindmap layout', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        diagram.canvas.native.setAttribute("height", "1000");
        randomDiagram(250, 3, true);
        var root = diagram.getId("0");
        root.shapeVisual.background("Green");

        diagram.layout({
            type: "tree",
            subtype: "Mindmap",
            roots: [root],
            verticalSeparation: 2,
            horizontalSeparation: 150
        });
        diagram.zoom(0.5);
        ok(true);
    });

    testSkip('Tip-over tree layout', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        diagram.canvas.native.setAttribute("height", "1000");
        randomDiagram(50, 3, true);

        var root = diagram.getId("0");
        root.shapeVisual.background("red");
        diagram.layout({
                type: "tree",
                subtype: "TipOver",
                verticalSeparation: 25,
                horizontalSeparation: 10,
                underneathHorizontalOffset: 10,
                underneathVerticalTopOffset: 10,
                roots: [root]
            }
        );
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

        diagram.layout({
                type: "tree",
                subtype: "Up"
            }
        );
        diagram.zoom(0.5);
        ok(true);
    });

    testSkip('Layered layout', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        diagram.canvas.native.setAttribute("height", "1000");
        randomDiagram(50, 15, false, true);

        /*  var g = Predefined.Forest(3,3,3);
         var div = GetRoot();
         var diagramElement = $("#canvas").kendoDiagram();
         var diagram = diagramElement.data("kendoDiagram");
         diagram.canvas.native.setAttribute("height", "1000");
         GraphUtils.createDiagramFromGraph(diagram, g, false);*/

        var root = diagram.getId("0");
        diagram.layout(
            {
                type: "Tree",
                layerDistance: 250,
                nodeDistance: 50,
                subtype: "Right"
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

        diagram.layout(
            {
                type: "Tree",
                layerDistance: 250,
                nodeDistance: 50,
                subtype: "Right",
                roots: roots
            }
        );
        ok(true);
    });
})();
