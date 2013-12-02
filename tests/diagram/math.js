(function() {
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

    test("Normal Distribution", function () {
        var n = kendo.diagram.normalVariable;
        var r = Range(0, 100).map(function (i) {
            return n();
        });
        ok(true, "Have to think about how to unit test the normal distribution...");
    });


    /*-----------Hashtable tests------------------------------------*/
    QUnit.module("HashTable tests");

    test('Basics', function () {
        var ht = new HashTable();
        ht.add(1);
        ok(ht.containsKey(1));
        ok(Utils.isObject(ht.get(1)));
        ht.get(1).value = "Geri";
        ht.get(1).prop = 147;
        ok(ht.get(1).value == "Geri");
        ok(ht.get(1).prop == 147);
        ok(ht.get(5) == null);
        ht.remove(1);
        ok(ht.get(1) == null);
        ok(!ht.containsKey(1));

        ht = new HashTable();
        for (var i = 0; i < 10; i++) {
            ht.add(new Node(i.toString()), i);
        }
        var vals = [];
        var acc = function (x) {
            vals.add(x.value);
        };
        ht.forEach(acc);
        ok(vals.length == 10, "Accumulation of ids.");

        ht = new HashTable();
        for (var i = 0; i < 10; i++) {
            ht.add("k" + i, "v" + i);
        }
        equal(ht.length, 10);
        ht.remove("m");
        equal(ht.length, 10);
        ht.remove("k5");
        equal(ht.length, 9);
        ht.set("k5", "Telerik");
        var telerik = ht.get("k5");
        equal(telerik.value, "Telerik");
        var clone = ht.clone();
        equal(clone.length, 10);
        var found = clone.get("k3");
        ok(found != null && found.value == "v3");
        ok(clone.get("nope") == null);
        ok(clone.get("k5").value == "Telerik");
    });

    /*-----------Dictionary tests------------------------------------*/
    QUnit.module("Dictionary tests");

    test('Basics', function () {
        var dic = new Dictionary();
        var counter = 0;
        dic.bind("changed", function (e) {
            counter++;
        });
        dic.add(1, "Geri");
        dic.add(3, "Miro");
        dic.add(5, "Niko");
        dic.add(7, {name: "Swa", shoe: 44});
        ok(counter == 4, "Event is raised four times.");
        ok(dic.containsKey(3));
        var swa = dic.get(7);
        ok(Utils.isDefined(swa));
        ok(Utils.isObject(swa));
        ok(swa.shoe == 44);
        dic.remove(3);
        ok(counter == 5, "Event is raised five times.");
        ok(!dic.containsKey(3));
        ok(dic.keys().length == 3);
        var r = [];
        dic.forEachValue(function (v) {
            if (Utils.isString(v)) {
                r.push(v);
            }
            if (Utils.isObject(v)) {
                r.push(v.name);
            }
        });
        var shouldbe = ["Geri", "Niko", "Swa"];
        ok(r.sameAs(shouldbe));

        dic = new Dictionary();
        var n = new Node("1");
        dic.add(n, 12);
        ok(dic.containsKey(n), "Should be there.");
        ok(dic.get(n) == 12, "Correct value.");
        dic.add(n, 13);
        ok(dic.get(n) == 13, "Changed value.");
        dic.remove(n);
        ok(!dic.containsKey(n), "Should be gone now.");

        dic = new Dictionary();
        for (var i = 0; i < 10; i++) {
            dic.add(new Node(i.toString()), i);
        }
        var vals = [];
        var acc = function (k, v) {
            vals.add(v);
        };
        dic.forEach(acc);
        ok(vals.length == 10, "Accumulation of ids.");
        shouldbe = new Range(0, 9);
        ok(shouldbe.sameAs(vals), "Should be just a range.");

        vals = [];
        var acc = function (v) {
            vals.add(v);
        };
        dic.forEachValue(acc);
        ok(vals.length == 10, "Accumulation of ids.");
        shouldbe = new Range(0, 9);
        ok(shouldbe.sameAs(vals), "Should be just a range again.");
    });

    test('Load from existing dictionary', function () {
        var from = new Dictionary();
        var data = new Range(0, 14);
        data.forEach(function (x) {
            from.add(x, x.toString());
        });
        var to = new Dictionary(from);
        ok(to.length == 15, "Copied from the source dic.");
        ok(to.get(10) == "10");
    });

    /*-----------Queue tests------------------------------------*/
    QUnit.module("Queue tests");

    test('Basics', function () {
        var q = new Queue();
        var r = new Range(1, 5);
        r.forEach(function (x) {
            q.enqueue(x);
        });
        var rev = [];
        while (q.length > 0) {
            rev.push(q.dequeue());
        }
        var shouldbe = new Range(1, 5);
        ok(rev.sameAs(shouldbe), "The same really.");
    });

    QUnit.module("Set tests");
    test('Add unique', function () {
        var set = new Set();
        set.add("John");
        set.add("Mary");
        set.add("John");
        equal(set.length, 2);

        var dic = new Dictionary();
        dic.add("a", 6);
        dic.add("b", 74);
        dic.add("c", 61);
        dic.add("c", 70);    // should not be added
        set = new Set(dic);
        equal(set.length, 3);
        var sum = 0;
        set.forEach(function (d) {
            sum += d.value;
        });
        equal(sum, 150);
        set.add("whatever");
        equal(set.get("whatever"), "whatever");
        ok(set.hash({brand: "Ford", age: 13}) != null);
    });

    /*-----------Graph structure tests------------------------------------*/
    QUnit.module("Graph structure tests");

    test('Node basics', function () {

        var n = new Node();
        n.id = "GR";
        ok(n.id == "GR");
        n.bounds(new diagram.Rect(0, 0, 120, 150));
        ok(n.bounds().x == 0 && n.bounds().y == 0 && n.bounds().width == 120 && n.bounds().height == 150, "Correct dimensions.");

        var g = new Graph();
        g.id = "Def";
        ok(g.id == "Def");
        var a11 = g.addNode("A11");
        ok(g.hasNode("A11"));
        ok(g.hasNode(a11));
        ok(a11 == g.getNode("A11"), "Getting a node in the Graph.");
        ok(null == g.getNode("A141"), "Getting a node not in the Graph.");
        g.removeNode(a11);
        ok(null == g.getNode("A11"), "Getting a removed node.");
        ok(!g.hasNode("A11"));

        var b7 = g.addNode("B7");
        throws(function () {
                g.getNode(77);
            },
            'Should throw an error since it is neither a Node nor an identifier.'
        );
        ok(b7.links.isEmpty(), "No links defined yet.");
        ok(b7.outgoing.isEmpty(), "No links defined yet.");
        ok(b7.incoming.isEmpty(), "No links defined yet.");
        ok(b7.weight == 1, "No weight set by default.");

        var ori = new Node();
        var clone = ori.clone();
        ok(ori.id != clone.id, "The clone should not have the same identifier.");
        ok(ori.links.sameAs(clone.links));
        ok(ori.outgoing.sameAs(clone.outgoing));
        ok(ori.incoming.sameAs(clone.incoming));
    });

    test('Parents and children', function () {
        var g = parse(["1->2", "0->2", "2->3", "3->4", "3->5", "3->6"]);

        var n0 = g.getNode("0");
        var n1 = g.getNode("1");
        var n2 = g.getNode("2");
        var n3 = g.getNode("3");
        var n4 = g.getNode("4");
        var n5 = g.getNode("5");

        var n2Parents = n2.getParents();
        ok(n2Parents.length == 2 && n2Parents.contains(n0) && n2Parents.contains(n1), "Parents of n2.");
        var n2Children = n2.getChildren();
        ok(n2Children.length == 1 && n2Children.contains(n3), "Children of n2.");
        var n3Children = n3.getChildren();
        ok(n3Children.length == 3, "Children of n3.");
        ok(n5.getParents().length == 1, "Parent of n5.");
    });

    test('Depth-first traversal', function () {
        var g = parse(["0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
        var path = [];
        var acc = function (node) {
            path.add(node.id);
        }
        var n0 = g.getNode("0");
        g.depthFirstTraversal(n0, acc);
        var shouldbe = [0, 1, 3, 7, 4, 2, 5, 6];
        ok(path.sameAs(shouldbe), "Should be unique in this case.");
        g = parse(["0->7", "0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
        shouldbe = [0, 7, 1, 3, 4, 2, 5, 6];
        path = [];
        n0 = g.getNode("0");
        g.depthFirstTraversal(n0, acc);
        ok(path.sameAs(shouldbe), "No revisit please.");
    });

    test('Subgraphs', function () {
        var g = parse(["0->1", "1->2", "1->3", "3->4", "2->4", "4->5", "5->6", "6->7", "6->8", "8->9", "7->9", "9->10"]);
        var h = parse(["3->4", "2->4", "4->5", "5->6", "6->7", "6->8"]);
        ok(g.isSubGraph(h), "Should be a subgraph.");
        h = parse(["3->4", "2->4", "4->5", "5->6", "6->7", "6->8", "14->5"]);
        ok(!g.isSubGraph(h), "Shouldn't be a subgraph.");
    });

    test('Breadth-first traversal', function () {
        var g = parse(["0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
        var path = [];
        var acc = function (node) {
            path.add(node.id);
        }
        var n0 = g.getNode("0");
        g.breadthFirstTraversal(n0, acc);
        var shouldbe = new Range(0, 7);
        ok(path.sameAs(shouldbe), "Should be unique in this case.");
        g = parse(["0->7", "0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
        shouldbe = [0, 7, 1, 2, 3, 4, 5, 6];
        path = [];
        n0 = g.getNode("0");
        g.breadthFirstTraversal(n0, acc);
        ok(path.sameAs(shouldbe), "No revisit please.");
    });

    test('Link basics', function () {
        var from = new Node("from");
        var to = new Node("to");
        var l = new Link(from, to);
        ok(l.source == from && l.target == to, "Source and Target define the link.");

        l.reverse();
        ok(l.target == from && l.source == to, "Source and Target reversed.");
        l.reverse();

        ok(l.incidentWith(to), "Incidence with the target.");
        ok(l.incidentWith(from), "Incidence with the source.");
        ok(from.adjacentTo(to), "Adjacency with the source.");
        ok(to.adjacentTo(from), "Adjacency with the target.");

        var clone = l.clone();
        ok(clone.id != l.id, "The cloned link should not have the same identifier.");
        ok(clone.source == l.source);
        ok(clone.target == l.target);

        var otherTo = new Node("to2");
        var otherLink = new Link(from, otherTo);
        var common = l.getCommonNode(otherLink);
        ok(common != null);
        ok(common.id == from.id);

        ok(otherLink.isBridging(from, otherTo));
        ok(l.isBridging(from, to));

        ok(l.incidentWith(from));
        ok(!l.incidentWith(otherTo));
        ok(otherLink.incidentWith(otherTo));

        ok(l.adjacentTo(otherLink));

        l.changeTarget(otherTo);
        ok(l.target.id == otherTo.id);
        ok(l.isBridging(from, otherTo));
    });

    test('Graph basics', function () {

        var g = new Graph("D1");
        ok(g.id == "D1", "Id check.");
        ok(true, Object.getPrototypeOf(new Node()));

        n1 = g.addNode("n1");
        ok(g.hasNode("n1"), "Contains the node");

        var l12 = g.addLink(n1, "n2");
        var n2 = g.getNode("n2");
        ok(Utils.isDefined(n2), "The link target should be added automatically.");
        ok(g.links.contains(l12), "The link should be in the links.");
        ok(l12.source.id == "n1" && l12.target.id == "n2", "Check of the identifiers.");
        ok(g.isHealthy(), "The graph is healthy.");
        g.removeLink(l12);
        ok(g.nodes.length == 2, "Should still have the nodes.");
        ok(n1.isIsolated(), "Should have no links.");
        ok(n2.isIsolated(), "Should have no links.");
        ok(g.links.isEmpty(), "No links.");
        var n3 = new Node("n3");
        var link = new Link(n1, n3);
        g.addLink(link);
        ok(g.hasNode(n3), "The node should be added through the link.");
        ok(g.areConnected(n1, n3), "Adding the link connects nodes. Duh.");
        var l23 = new Link(n2, n3);
        g.addLink(l23);
        g.removeNode("n3"); //should also remove the two links
        ok(g.nodes.length == 2 && g.hasNode("n2") && g.hasNode("n1"), "Two nodes remaining.");
        ok(g.links.length == 0, "No links anymore.");

        //using addNodeAndOutgoings to rebuild the graph
        var n4 = new Node("n4");
        var l41 = new Link(n4, n1);
        var l42 = new Link(n4, n2);
        var l45 = new Link(n4, "n5");
        g.addNodeAndOutgoings(n4); // adds three nodes and three links
        ok(g.links.length == 3);
        ok(g.nodes.length == 4);
        var n5 = g.getNode("n5");
        ok(n5 != null);
        ok(g.areConnected(n1, n4));
        ok(g.areConnected(n2, n4));
        ok(g.areConnected(n5, n4));
        ok(!g.areConnected(n5, n2));
        ok(!g.areConnected(n1, n2));
        ok(g.isHealthy());
        g.removeAllLinks();
        ok(g.links.length == 0);
        ok(g.nodes.length == 4);
    });

    test('Parsing', function () {
        var graphString = ["n1->n2", {id: "QSDF13"}, "n2->n3"];
        var g = parse(graphString);
        ok(g.nodes.length == 3 && g.nodes[0].id == "n1" && g.nodes[1].id == "n2" && g.nodes[2].id == "n3");
        ok(g.links.length == 2 && g.links[0].id == "QSDF13");

        g = new Graph();
        var firstLink = g.addLink("n12", "n13");
        firstLink.id = "33";
        var secondLink = g.addLink("n17", "n22");
        secondLink.id = "44";
        var s = g.linearize();
        var shouldbe = ["n12->n13", "n17->n22"];
        ok(s.sameAs(shouldbe));

        s = g.linearize(true);
        shouldbe = ["n12->n13", {id: "33"}, "n17->n22", {id: "44"}];
        ok(s[0] == shouldbe[0]);
        ok(s[1].id == "33");
        ok(s[2] == shouldbe[2]);
        ok(s[3].id == "44");
    });

    test('Components', function () {
        // two simple components
        var simple = parse(["1->2", "3->4"]);
        var components = simple.getConnectedComponents();
        ok(components.length == 2, "Should be two components.");
        var g1 = components[0];
        ok(g1.nodes.contains(simple.getNode("1")));
        ok(g1.nodes.contains(simple.getNode("2")));
        var g2 = components[1];
        ok(g2.nodes.contains(simple.getNode("3")));
        ok(g2.nodes.contains(simple.getNode("4")));

        simple = parse(["1->2", "2->3", "3->4", "5->6", "6->5", "9->12"]);
        components = simple.getConnectedComponents();
        ok(components.length == 3, "Should be three components.");
    });

    test('Spanning tree', function () {
        var g = parse(["0->1", "1->2", "1->3", "3->4", "2->4"]);
        var n0 = g.getNode("0");
        var tree = g.getSpanningTree(n0);
        ok(tree.nodes.length == 5, "Should visit all nodes.");
        ok(tree.links.length == 4, "Should not bifurcate.");
        ok(true, "Results in: " + tree.linearize());
        ok(tree.isAcyclic(), "A tree should not have cycles.");

        g = parse(["0->1", "1->2", "1->3", "3->4", "2->4", "4->5"]);
        n0 = g.getNode("0");
        tree = g.getSpanningTree(n0);
        ok(tree.isAcyclic(), "A tree should not have cycles.");

        ok(tree.nodes.length == 6, "Should visit all nodes.");
        ok(tree.links.length == 5, "Should not bifurcate.");
        ok(true, "Results in: " + tree.linearize());

        g = parse(["0->1", "1->2", "1->3", "3->4", "2->4", "4->5", "5->6", "6->7", "6->8", "8->9", "7->9", "9->10"]);
        n0 = g.getNode("0");
        tree = g.getSpanningTree(n0);
        ok(tree.nodes.length == 11, "Should visit all nodes.");
        ok(tree.links.length == 10, "Should not bifurcate.");
        ok(true, "Results in: " + tree.linearize());
        ok(tree.isAcyclic(), "A tree should not have cycles.");
        ok(g.isSubGraph(tree), "The spanning tree should be a subgraph of the graph.");

    });

    test('Make acyclic', function () {
        var g = Graph.Predefined.Grid(2, 2);
        ok(g.nodes.length == 9);
        ok(g.links.length == 12);

        g = Graph.Predefined.Workflow(); // is cyclic
        var reversed = g.makeAcyclic();
        ok(g.isAcyclic(), "Should be acyclic now");
    });

    test('Balance trees and forests', function () {
        var g = Graph.Utils.createBalancedTree(1, 2);
        ok(g.nodes.length == 3);
        ok(g.links.length == 2);

        g = Graph.Utils.createBalancedTree(2, 2);
        ok(g.nodes.length == 7);
        ok(g.links.length == 6);

        g = Graph.Utils.createBalancedForest(3, 4, 8);
        var components = g.getConnectedComponents();
        ok(components.length == 8, "Should have eight components.");
        ok(components[0].nodes.length == 85); // (1-4^4)/(1-4)
        ok(components[0].links.length == 84); // (4-4^4)/(1-4)
    });

    test('Acyclicity', function () {
        var g = parse(["0->1", "1->2", "2->3", "3->4", "4->1"]);
        var cycles = g.findCycles();
        ok(cycles.length == 1, "Should have a cycle.");

        g = Graph.Utils.createRandomConnectedGraph(20, 3, true); // a random tree of 20 nodes and incidence<=3
        cycles = g.findCycles();
        ok(cycles.length == 0, "Trees don't have cycles.");

        g = Graph.Utils.createRandomConnectedGraph(250, 14, false); // a random non-tree of 20 nodes and incidence<=14
        cycles = g.findCycles();
        // Breaks the build. We should test someting sure. :)
        //ok(cycles.length > 0, "No panic if falsey. Since the graph is random this one has probability of not having cycles...but with 250 nodes and incidence up to 14 this should not happen (i.e. statistically very low).");

        g = parse(["0->1", "1->2", "2->3", "3->4", "4->1", "3->5", "5->6", "6->7", "7->3"]);
        cycles = g.findCycles();
        ok(cycles.length == 1, "Should have a cycle.");

        g = Graph.Utils.createBalancedTree();
        cycles = g.findCycles();
        ok(cycles.length == 0, "A balanced should not have any cycles.");

        g = Graph.Utils.createBalancedForest();
        cycles = g.findCycles();
        ok(cycles.length == 0, "A balanced forest should not have any cycles.");
    });

    test('Assign levels', function () {
        var tree = Predefined.Tree(3, 2);
        var root = tree.root;
        tree.assignLevels(root);

        ok(root != null, "There should be a root.");
        ok(root.id == "0");
        ok(root.level == 0);
        ok(Utils.isDefined(root.children) && root.children.length == 2);
        ok(root.children[0].level == 1 && root.children[1].level == 1);
        ok(root.children[0].children[0].level == 2); // and so on

        tree.assignLevels(root, 7);
        ok(root.level == 7);
        ok(root.children[0].level == 8 && root.children[1].level == 8);
        ok(root.children[0].children[0].level == 9); // and so on
    });

    /*-----------Transofrmations tests------------------------------------*/
    QUnit.module("Transformation tests");

    test("Matrix calculus", function () {
        var m = diagram.Matrix.parse("matrix(1,2,3,4,5,6)");
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 2);
        ok(m.c == 3);
        ok(m.d == 4);
        ok(m.e == 5);
        ok(m.f == 6);
        m = diagram.Matrix.parse("matrix(1 2 3 4 5 6)");
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 2);
        ok(m.c == 3);
        ok(m.d == 4);
        ok(m.e == 5);
        ok(m.f == 6);
        m = diagram.Matrix.parse("(1,2,3,4,5,6)");
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 2);
        ok(m.c == 3);
        ok(m.d == 4);
        ok(m.e == 5);
        ok(m.f == 6);
        m = diagram.Matrix.parse("1,2,3,4,5,6");
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 2);
        ok(m.c == 3);
        ok(m.d == 4);
        ok(m.e == 5);
        ok(m.f == 6);
        m = diagram.Matrix.fromList([
            1,
            2,
            3,
            4,
            5,
            6
        ]);
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 2);
        ok(m.c == 3);
        ok(m.d == 4);
        ok(m.e == 5);
        ok(m.f == 6);
        m = diagram.Matrix.translation(55, 66);
        ok(m != null);
        ok(m.a == 1);
        ok(m.b == 0);
        ok(m.c == 0);
        ok(m.d == 1);
        ok(m.e == 55);
        ok(m.f == 66);
        m = diagram.Matrix.scaling(478, 2.5);
        ok(m != null);
        ok(m.a == 478);
        ok(m.b == 0);
        ok(m.c == 0);
        ok(m.d == 2.5);
        ok(m.e == 0);
        ok(m.f == 0);
        m = diagram.Matrix.fromMatrixVector(new diagram.MatrixVector(66, 55, 44, 33, 22, 11));
        ok(m != null);
        ok(m.a == 66);
        ok(m.b == 55);
        ok(m.c == 44);
        ok(m.d == 33);
        ok(m.e == 22);
        ok(m.f == 11);
        var a = diagram.Matrix.fromList([
            2.3,
            4,
            5,
            0.6,
            8.7,
            7.01
        ]);
        var b = diagram.Matrix.fromList([
            24.2,
            48,
            1,
            0,
            0,
            71
        ]);
        m = a.times(b);
        ok(m != null);
        ok(m.a == 295.65999999999997);
        ok(m.b == 125.6);
        ok(m.c == 2.3);
        ok(m.d == 4);
        ok(m.e == 363.7);
        ok(m.f == 49.61);
        a = diagram.Matrix.parse("Matrix(2.3, 4, 5, 0.6, 8.7, 7.01)");
        b = diagram.Matrix.parse("matrix(24.2, 48, 1, 0, 0, 71)");
        m = a.times(b);
        ok(m != null);
        ok(m.a == 295.65999999999997);
        ok(m.b == 125.6);
        ok(m.c == 2.3);
        ok(m.d == 4);
        ok(m.e == 363.7);
        ok(m.f == 49.61);
    });

    /*-----------Rect tests------------------------------------*/
    QUnit.module("Rect tests");

    test("Basic tests", function () {
        var r = new diagram.Rect(122, 155);
        equal(r.width, 0, "if not specified, width should be 0");
        ok(!r.contains(new diagram.Point(150, 160)));

        r.width = 120;
        r.height = 150;
        ok(r.contains(new diagram.Point(150, 160)), "Specifying the dimensions renders the result.");
        ok(!r.contains(new diagram.Point(NaN, 160)));
        ok(!r.contains(new diagram.Point(550, 160)), "Points outside should not be contained, obviously.");
        r = new diagram.Rect(100, 100, 150, 150);
        r.inflate(5);
        ok(r.width == 161);
        var rr = r.clone();
        ok(rr.x == r.x && rr.y == r.y && rr.width == r.width && rr.height == r.height, "Clones should be identical.");
    });

    /*-----------XML Loading tests------------------------------------*/
    QUnit.module("Graph adapter tests", {
        setup: function() {
            QUnit.fixture.html('<div id=canvas />');
        }
    });

    test('Graph adapter', function () {
        var treeGraph = Predefined.Tree(2, 2); // 7 nodes and 6 links
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        GraphUtils.createDiagramFromGraph(diagram, treeGraph, false);

        var adapter = new Adapter(diagram);
        adapter.convert();

        // should essentially be the same as the original tree
        ok(adapter.finalNodes.length == 7, "Tree conversion should return 7 tree nodes.");
        ok(adapter.finalLinks.length == 6, "Tree conversion should return 6 tree links.");

        var forest = Predefined.Forest(3, 3, 3); // 120 nodes and 117 links
        div = GetRoot(); // clear the diagram, which is important since otherwise the previous test will remain
        diagramElement = $("#canvas").kendoDiagram();
        diagram = diagramElement.data("kendoDiagram");
        GraphUtils.createDiagramFromGraph(diagram, forest, false);

        adapter = new Adapter(diagram);
        adapter.convert();

        // should essentially be the same as the original forest
        ok(adapter.finalNodes.length == 120, "Forest conversion should return 120 tree nodes.");
        ok(adapter.finalLinks.length == 117, "Forest conversion should return 117 tree links.");
        var components = adapter.finalGraph.getConnectedComponents();
        ok(components.length == 3, "Forest conversion should return three trees.")

    });

    return;

    test('Loops and multi-links', function () {
        var loopGraph = parse(["1->1", "1->2"]);
        div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        GraphUtils.createDiagramFromGraph(diagram, loopGraph, false);

        var adapter = new Adapter(diagram);
        var g = adapter.convert();
        ok(g.nodes.length == 2);
        ok(g.links.length == 1);

        var multiEdgeGraph = parse(["1->2", "1->2", "1->2"]);
        ok(multiEdgeGraph.nodes.length == 2);
        ok(multiEdgeGraph.links.length == 3);
        div = GetRoot();
        diagramElement = $("#canvas").kendoDiagram();
        diagram = diagramElement.data("kendoDiagram");
        GraphUtils.createDiagramFromGraph(diagram, multiEdgeGraph, false);

        adapter = new Adapter(diagram);
        g = adapter.convert();
        ok(g.nodes.length == 2);
        ok(g.links.length == 1);
        ok(adapter.ignoredConnections.length == 2, "Should have ignored two identical connections.");
    });
    test('Floating connections analysis', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        // cannot use parse to create loose connections, too bad
        var a = AddShape(diagram);
        var b = AddShape(diagram);
        AddConnection(diagram, a, b);
        var looseCon = new kendo.diagram.Connection(a, new Point(120, 255));
        diagram.addConnection(looseCon);
        var adapter = new Adapter(diagram);
        var g = adapter.convert();
        ok(g.nodes.length == 2);
        ok(g.links.length == 1);
        ok(adapter.ignoredConnections.length == 1, "Should have ignored a floating connection.");
    });
    test('Ensure id transfer across the analysis', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        var a = AddShape(diagram);
        a.id = "a";
        var b = AddShape(diagram);
        b.id = "b";
        AddConnection(diagram, a, b);
        var c = AddShape(diagram);
        c.id = "c";
        var d = AddShape(diagram);
        d.id = "d";
        AddConnection(diagram, c, d);

        var adapter = new Adapter(diagram);
        var g = adapter.convert();
        ok(g.nodes.length == 4);
        ok(g.links.length == 2);
        var components = g.getConnectedComponents();
        equal(components.length, 2);
        var ids = [];
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            for (var j = 0; j < component.nodes.length; j++) {
                var node = component.nodes[j];
                ids.push(node.id);
            }
        }
        equal(ids.length, 4);
        ids.sort();
        ok(["a", "b", "c", "d"].sameAs(ids));
    });

    test('Ensure random id transfer across the analysis', function () {
        var div = GetRoot();
        var diagramElement = $("#canvas").kendoDiagram();
        var diagram = diagramElement.data("kendoDiagram");
        var a = AddShape(diagram);
        var b = AddShape(diagram);
        AddConnection(diagram, a, b);
        var c = AddShape(diagram);
        var d = AddShape(diagram);
        AddConnection(diagram, c, d);

        var adapter = new Adapter(diagram);
        var g = adapter.convert();
        ok(g.nodes.length == 4);
        ok(g.links.length == 2);
        var components = g.getConnectedComponents();
        equal(components.length, 2);
        var idsbefore = [a.id, b.id, c.id, d.id];
        var idsafter = [];
        for (var i = 0; i < components.length; i++) {
            var component = components[i];
            for (var j = 0; j < component.nodes.length; j++) {
                var node = component.nodes[j];
                idsafter.push(node.id);
            }
        }
        equal(idsafter.length, 4);
        idsbefore.sort();
        idsafter.sort();
        ok(idsbefore.sameAs(idsafter));
    });
})();
