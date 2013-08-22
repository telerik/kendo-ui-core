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
/*-------------Testing Utils----------------------------------*/

QUnit.testSkip = function()
{
    QUnit.test(arguments[0] + ' [SKIPPED]', function()
    {
        var li = document.getElementById(QUnit.config.current.id);
        QUnit.done(function()
        {
            li.style.background = '#FFFF99';
        });
        ok(true);
    });
};

/*
 Defines a test which has to be skipped during a run.
 */
testSkip = QUnit.testSkip;

function Task(title)
{
    this.Count = 0;
    this.Title = title;
}

Task.prototype = {
    isEmpty: false,
    undo   : function()
    {
        this.Count--;
    },
    redo   : function()
    {
        this.Count++;
    }
};

function lexicCount(c, name)
{
    switch(c)
    {
        case 0:
            return null;
        case 1:
            return "one " + name;
        default:
            return c + " " + name + "s";
    }
};

var CountObjects = function(obj)
{
    var items = [];
    if(obj.shapes && obj.shapes.Items)
    {
        items.push(lexicCount(obj.shapes.Items.length, "shape"));
    }
    if(obj.groups && obj.groups.Items)
    {
        items.push(lexicCount(obj.groups.Items.length, "group"));
    }
    if(obj.connections && obj.connections.Items)
    {
        items.push(lexicCount(obj.connections.Items.length, "connection"));
    }
    switch(items.length)
    {
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

var AddShape = function(kendoDiagram, p, shapeOptions, id)
{
    if(typeof(p) === "undefined")
    {
        p = new diagram.Point(0, 0);
    }

    shapeOptions = kendo.deepExtend({
        width     : 200,
        height    : 100,
        id        : id,
        background: "#778899",
        data      : "rectangle"
    }, shapeOptions);

    return kendoDiagram.addShape(p, shapeOptions);
};

var AddCircle = function(canvas, p, radius)
{
    var circ = new diagram.Circle({
        x         : p.x,
        y         : p.y,
        background: "orange",
        radius    : radius || 25
    });
    canvas.append(circ);

    return circ;
};

var AddConnection = function(diagram, from, to, options)
{
    return diagram.connect(from, to, options);
};

var GetRoot = function()
{
    var root = document.getElementById('canvas');
    if(root == null)
    {
        throw "The unit testing requires a DIV with name 'canvas'.";
    }
    var children = root.childNodes;
    if(children.length > 0)
    {
        for(var i = 0; i < children.length; i++)
        {
            root.removeChild(children[i]);
        }
    }
    return root;
};

var Shapes = {
    Rectangle     : function(point)
    {
        return {
            data: "Rectangle"
        };
    },
    Triangle      : function()
    {
        return {
            data: "m2.5,109.24985l61,-106.74985l61,106.74985l-122,0z"
        };
    },
    SequentialData: function()
    {
        return {
            data: "m50.21875,97.4375l0,0c-26.35457,0 -47.71875,-21.25185 -47.71875,-47.46875l0,0c0,-26.21678 21.36418,-47.46875 47.71875,-47.46875l0,0c12.65584,0 24.79359,5.00155 33.74218,13.90339c8.94862,8.90154 13.97657,20.97617 13.97657,33.56536l0,0c0,12.58895 -5.02795,24.66367 -13.97657,33.56542l13.97657,0l0,13.90333l-47.71875,0z"
        };
    },
    Data          : function()
    {
        return {
            data: "m2.5,97.70305l19.07013,-95.20305l76.27361,0l-19.0702,95.20305l-76.27354,0z"
        };
    },
    Wave          : function()
    {
        return {
            data: "m2.5,15.5967c31.68356,-45.3672 63.37309,45.3642 95.05661,0l0,81.65914c-31.68353,45.36404 -63.37305,-45.36732 -95.05661,0l0,-81.65914z"
        };
    }
};

/*-----------Utilities tests------------------------------------*/
QUnit.module("Utilities tests");

test("Flatten Array", function()
{
    var ar = [
        [1],
        [2, 3],
        [4],
        [1],
        []
    ];
    var res = ar.flatten();
    ok(res.length == 5, "Should have length 4.");
    deepEqual(res, [1, 2, 3, 4, 1], "Should be merged to a flattened array.");
});

test("Distinct array", function()
{
    var ar = [1, 2, 1, 3, 5, 4, 4];
    var dis = ar.distinct();
    ok(dis.length == 5, "Should have been reduced to distinct elements.");
});

test("Normal Distribution", function()
{
    var n = kendo.diagram.normalVariable;
    var r = Range(0, 100).map(function(i)
    {
        return n();
    });
    ok(true, "Have to think about how to unit test the normal distribution...");
});

test('Random id', function()
{
    var a = new Range(0, 20);
    var counter = 0;
    a.forEach(function(i, j, m)
    {
        counter++;
    });
    ok(counter == 21, 'Passed 21 times.');
});

test('Any', function()
{
    // mixed array
    var a = new Range(1, 15);
    a.push('Swa');
    a.push('Miro');
    a.push('Niko');
    ok(a.any(function(x)
    {
        return x == 'Swa';
    }), 'Should find element Swa in the array.');
});

test('Remove', function()
{
    var a = new Range(1, 105);
    a.remove(7, 13);
    var find = function(x)
    {
        return x == 7 || x == 13;
    };
    ok(!a.any(find), 'Elements 7 and 13 should have been removed.')
});

test('Distinct and contains', function()
{
    var a = [1, 3, 7, 5, 7, 5, 3];
    var ds = a.distinct();
    ok(ds.length == 4, 'Only 1,3,5,7 should remain.');
    ok(ds.contains(1, 3, 5, 7), 'Found the distinct elements.')
});

test('indexOf', function()
{
    var a = [1, 4, 7, 8, 5, 2];
    ok(a.indexOf(7) == 2, 'Correct')
    ok(a.indexOf(2) == 5, 'Correct')
});

test('Fold', function()
{
    var a = new Range(1, 4);
    var sum = a.fold(function(a, x)
    {
        return a + x;
    });
    ok(sum == 10);

    sum = a.fold(function(a, x)
    {
        return a + x;
    }, 10);
    ok(sum == 20);

    a = ['Niko', 'Miro', 'Swa'];
    sum = a.fold(function(a, x)
    {
        return a + ', ' + x;
    }, 'D^3 team: ');
    ok(sum == 'D^3 team: , Niko, Miro, Swa');
});

test('sameAs', function()
{
    var a = new Range(1, 5);
    var b = new Range(1, 5);
    var c = new Range(1, 7);

    ok(a.sameAs(b), 'They are the same.')
    ok(!a.sameAs(c), 'They are not the same.')
});

test('Map', function()
{
    var a = new Range(1, 5);
    var b = a.map(function(x)
    {
        return x + 1;
    });
    var shouldbe = new Range(2, 6);
    ok(b.sameAs(shouldbe), 'Shifted array are the same.')
});

test('Find', function()
{
    var a = ['Niko', 'Miro', 'Swa'];
    ok(a.find(function(x)
    {
        return x == 'Niko';
    }), 'Found Niko.');

    ok(!a.find(function(x)
    {
        return x == 'Itzo';
    }), 'Itzo not supposed to be in there.');
    var stuff = [
        {"name": "Ian", "age": 12},
        {"name": "Ian", "age": 47},
        {"name": "Mary", "age": 27}
    ];
    var first = stuff.find(function(item)
    {
        return item["name"] == "Ian";
    });
    ok(first && first["age"] == 12);
});

test('Bi-sort', function()
{
    var a = ['d', 'a', 'c', 'b'];
    var b = [4, 1, 3, 2];
    Array.prototype.bisort(a, b, function(m, n)
    {
        return m.localeCompare(n);
    });
    var shouldbe = new Range(1, 4);
    ok(b.sameAs(shouldbe), "Reordering works.");
});

test('Call $*!', function()
{
    var f = function(x, r)
    {
        return x + r;
    };
    var w = f.call(this, 5, 4);
    ok(w == 9);
});

test('Insert', function()
{
    var a = new Range(1, 5);
    var shouldbe = [1, 2, 3, 17, 4, 5];
    var b = a.insert(17, 3);
    ok(b.sameAs(shouldbe));
});

test('Prepend', function()
{
    var a = new Range(1, 5);
    var shouldbe = new Range(0, 5);
    var b = a.prepend(0);
    ok(b.sameAs(shouldbe));
});

test('Append', function()
{
    var a = new Range(1, 5);
    var shouldbe = new Range(1, 6);
    var b = a.append(6);
    ok(b.sameAs(shouldbe));
});

test('Apply', function()
{
    var a = new Range(3, 22);
    var func = function(x, r)
    {
        return x + r;
    };
    var b = a.apply(func, 3);
    var shouldbe = new Range(6, 25);
    ok(b.sameAs(shouldbe), 'Functional is lovely.');
});

test('isObject', function()
{
    ok(isObject({"stuff": 14}), "Should be considered as an object.")
    ok(!isObject(3.1415), "Should not be considered as an object.")
});

test('isFunction', function()
{
    var g = function(s)
    {
        return s;
    };
    ok(isFunction(g), "Obviously a function.");
    ok(!isFunction({}, "Not a function hey."));
    ok(!isFunction(25.26259), "Neither this one.");
});

test('isEmpty', function()
{
    ok(isEmpty([]), "Is an empty array.");
    ok(!isEmpty([3, 4]), "Not empty of course.");
    ok(!isEmpty({"a": 1}), "Non empty literal.");
});

test('has', function()
{
    var obj = {"a": 1, "b": 2};
    ok(has(obj, "a"), "Has prop 'a'.")
    ok(!has(obj, "k"), "Has no prop 'k'.")
});

test('isString', function()
{
    ok(isString("Something"), "Is a string, cool.");
    ok(!isString({}), "Nope.");
});

test('NaN', function()
{
    ok(!isNaN(4585), "Is not NaN.");
    ok(isNaN(Number.NaN), "Bad bad math behavior.");
});

test('filter', function()
{
    var a = new Range(1, 55);
    var b = a.filter(function(x)
    {
        return x >= 50;
    });
    var shouldbe = new Range(50, 55);
    ok(b.sameAs(shouldbe), "Should have filtered out.");
});

test('where', function()
{
    var stuff = [
        {"name": "Ian", "age": 12},
        {"name": "Ian", "age": 47},
        {"name": "Mary", "age": 27}
    ];

    var subset = stuff.where(function(x)
    {
        return x.name == "Ian";
    });
    ok(subset.length == 2, "Should have two items.");
    var item = stuff.where(function(x)
    {
        return x.name == "Ian";
    }, true);
    ok(isObject(item) && !isArray(item) && item["age"] == 12, "Should be one item.");
});

test('all', function()
{
    var a = [1, 1, 1, 1, 1, 1];
    ok(a.all(function(x)
    {
        return x == 1;
    }), "All ones.");
    a.add(2);
    ok(!a.all(function(x)
    {
        return x == 1;
    }), "Not all ones.");

    ok([].all(function(x)
    {
        return x > 1;
    }), "Empty fulfills all the requirements.");

});

test("Range test", function()
{
    var r = new Range(10, 20);
    ok(r.length == 11, "Should have length 11.");
    r = new Range(10, 20, 2);
    ok(r.length == 6, "Should have length 6.");
    r = new Range(20, 10, -2);
    ok(r.length == 6, "Should have length 6.");
    r = new Range(10, 20, .5);
    ok(r.length == 21, "Should have length 21.");
    r = new Range();
    ok(r.length == 0, 'Empty array');
    r = new Range(5);
    ok(r.length == 0, 'One element array');
    r = new Range(5, 1);
    ok(r.length == 5, 'Length 5');
    throws(function()
        {
            new Range(15, 1, 4);
        },
        'Should throw a separation error.'
    );
});

/*-----------Hashtable tests------------------------------------*/
QUnit.module("HashTable tests");

test('Basics', function()
{
    var ht = new HashTable();
    ht.add(1);
    ok(ht.containsKey(1));
    ok(isObject(ht.get(1)));
    ht.get(1).value = "Geri";
    ht.get(1).prop = 147;
    ok(ht.get(1).value == "Geri");
    ok(ht.get(1).prop == 147);
    ok(ht.get(5) == null);
    ht.remove(1);
    ok(ht.get(1) == null);
    ok(!ht.containsKey(1));

    ht = new HashTable();
    for(var i = 0; i < 10; i++)
    {
        ht.add(new Node(i.toString()), i);
    }
    var vals = [];
    var acc = function(x)
    {
        vals.add(x.value);
    };
    ht.forEach(acc);
    ok(vals.length == 10, "Accumulation of ids.");

});

/*-----------Dictionary tests------------------------------------*/
QUnit.module("Dictionary tests");

test('Basics', function()
{
    var dic = new Dictionary();
    var counter = 0;
    dic.bind("changed", function(e)
    {
        counter++;
    });
    dic.add(1, "Geri");
    dic.add(3, "Miro");
    dic.add(5, "Niko");
    dic.add(7, {name: "Swa", shoe: 44});
    ok(counter == 4, "Event is raised four times.");
    ok(dic.containsKey(3));
    var swa = dic.get(7);
    ok(isDefined(swa));
    ok(isObject(swa));
    ok(swa.shoe == 44);
    dic.remove(3);
    ok(counter == 5, "Event is raised five times.");
    ok(!dic.containsKey(3));
    ok(dic.keys().length == 3);
    var r = [];
    dic.forEachValue(function(v)
    {
        if(isString(v))
        {
            r.push(v);
        }
        if(isObject(v))
        {
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
    for(var i = 0; i < 10; i++)
    {
        dic.add(new Node(i.toString()), i);
    }
    var vals = [];
    var acc = function(k, v)
    {
        vals.add(v);
    };
    dic.forEach(acc);
    ok(vals.length == 10, "Accumulation of ids.");
    shouldbe = new Range(0, 9);
    ok(shouldbe.sameAs(vals), "Should be just a range.");

    vals = [];
    var acc = function(v)
    {
        vals.add(v);
    };
    dic.forEachValue(acc);
    ok(vals.length == 10, "Accumulation of ids.");
    shouldbe = new Range(0, 9);
    ok(shouldbe.sameAs(vals), "Should be just a range again.");
});

test('Load from existing dictionary', function()
{
    var from = new Dictionary();
    var data = new Range(0, 14);
    data.forEach(function(x)
    {
        from.add(x, x.toString());
    });
    var to = new Dictionary(from);
    ok(to.length == 15, "Copied from the source dic.");
    ok(to.get(10) == "10");
});

/*-----------Queue tests------------------------------------*/
QUnit.module("Queue tests");

test('Basics', function()
{
    var q = new Queue();
    var r = new Range(1, 5);
    r.forEach(function(x)
    {
        q.enqueue(x);
    });
    var rev = [];
    while(q.length > 0)
    {
        rev.push(q.dequeue());
    }
    var shouldbe = new Range(1, 5);
    ok(rev.sameAs(shouldbe), "The same really.");
});

/*-----------Graph structure tests------------------------------------*/
QUnit.module("Graph structure tests");

test('Node basics', function()
{

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
    throws(function()
        {
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

test('Parents and children', function()
{
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

test('Depth-first traversal', function()
{
    var g = parse(["0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
    var path = [];
    var acc = function(node)
    {
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

test('Subgraphs', function()
{
    var g = parse(["0->1", "1->2", "1->3", "3->4", "2->4", "4->5", "5->6", "6->7", "6->8", "8->9", "7->9", "9->10"]);
    var h = parse(["3->4", "2->4", "4->5", "5->6", "6->7", "6->8"]);
    ok(g.isSubGraph(h), "Should be a subgraph.");
    h = parse(["3->4", "2->4", "4->5", "5->6", "6->7", "6->8", "14->5"]);
    ok(!g.isSubGraph(h), "Shouldn't be a subgraph.");
});

test('Breadth-first traversal', function()
{
    var g = parse(["0->1", "0->2", "1->3", "1->4", "2->5", "2->6", "3->7"]);
    var path = [];
    var acc = function(node)
    {
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

test('Link basics', function()
{
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
});

test('Graph basics', function()
{

    var g = new Graph("D1");
    ok(g.id == "D1", "Id check.");
    ok(true, Object.getPrototypeOf(new Node()));

    n1 = g.addNode("n1");
    ok(g.hasNode("n1"), "Contains the node");

    var l12 = g.addLink(n1, "n2");
    var n2 = g.getNode("n2");
    ok(isDefined(n2), "The link target should be added automatically.");
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

test('Parsing', function()
{
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

test('Components', function()
{
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

test('Spanning tree', function()
{
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

test('Make acyclic', function()
{
    var g = Graph.Predefined.Grid(2, 2);
    ok(g.nodes.length == 9);
    ok(g.links.length == 12);

    g = Graph.Predefined.Workflow(); // is cyclic
    var reversed = g.makeAcyclic();
    ok(g.isAcyclic(), "Should be acyclic now");
});

test('Balance trees and forests', function()
{
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

test('Acyclicity', function()
{
    var g = parse(["0->1", "1->2", "2->3", "3->4", "4->1"]);
    var cycles = g.findCycles();
    ok(cycles.length == 1, "Should have a cycle.");

    g = Graph.Utils.createRandomConnectedGraph(20, 3, true); // a random tree of 20 nodes and incidence<=3
    cycles = g.findCycles();
    ok(cycles.length == 0, "Trees don't have cycles.");

    g = Graph.Utils.createRandomConnectedGraph(250, 14, false); // a random non-tree of 20 nodes and incidence<=14
    cycles = g.findCycles();
    ok(cycles.length > 0, "No panic if falsey. Since the graph is random this one has probability of not having cycles...but with 250 nodes and incidence up to 14 this should not happen (i.e. statistically very low).");

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

test('Assign levels', function()
{
    var tree = Predefined.Tree(3, 2);
    var root = tree.root;
    tree.assignLevels(root);

    ok(root != null, "There should be a root.");
    ok(root.id == "0");
    ok(root.level == 0);
    ok(isDefined(root.children) && root.children.length == 2);
    ok(root.children[0].level == 1 && root.children[1].level == 1);
    ok(root.children[0].children[0].level == 2); // and so on

    tree.assignLevels(root, 7);
    ok(root.level == 7);
    ok(root.children[0].level == 8 && root.children[1].level == 8);
    ok(root.children[0].children[0].level == 9); // and so on
});

/*-----------Undoredo tests------------------------------------*/
QUnit.module("UndoRedo tests");

test("UndoRedoService basic", function()
{
    var ur = new diagram.UndoRedoService();
    var unit = new Task("Counting unit.");
    ur.begin();
    ur.addCompositeItem(unit);
    ur.commit();
    ok(unit.Count == 1, "Unit was executed");
    ur.undo();
    ok(ur.count() > 0, "The units are still there.");
    QUnit.equal(unit.Count, 0, "Unit undo was executed");
    ur.redo();
    ok(unit.Count == 1, "Unit was executed");
    QUnit.throws(function()
    {
        ur.Redo();
    }, "Supposed to raise an exception since we are passed the length of the stack.");
    ur.undo();
    ok(unit.Count == 0, "Unit was executed");
    ur = new diagram.UndoRedoService();
    unit = new Task("Counting unit.");
    ur.add(unit);
    ok(unit.Count == 1, "Unit was executed");
});

/*-----------Canvas tests------------------------------------*/
QUnit.module("Canvas tests");

test("Add Canvas", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    var found = document.getElementById('SVGRoot');
    ok(found != null, "The Canvas should add an <SVG/> element with name 'SVGRoot'.");
    root = GetRoot();

    canvas = new diagram.Canvas(root, {
        width     : 865,
        height    : 287,
        background: "#121217"
    });
    found = document.getElementById('SVGRoot');
    ok(parseFloat(found.style.width) == 865, "The width should be 865.");
    ok(parseFloat(found.style.height) == 287, "The height should be 287.");
    ok(found.style.backgroundColor == "rgb(18, 18, 23)");
});

/*-----------Rectangle tests------------------------------------*/
QUnit.module("Rectangle tests");

test("Add Circle", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    var rec = new diagram.Rectangle({
        id    : "MyRectangle",
        width : 150,
        height: 88
    });
    rec.position(new diagram.Point(100, 121));
    rec.background("Red");
    canvas.append(rec);

    var found = document.getElementById("MyRectangle");
    ok(found != null, "A SVG rectangle with name 'MyRectangle' should be in the HTML tree.");
    ok(found.attributes["width"].value == 150, "The width should be 150.");
    ok(found.attributes["height"].value == 88, "The height should be 287.");
    ok(found.attributes["fill"].value == "#ff0000");
});

/*-----------Marker tests------------------------------------*/
QUnit.module("Marker tests");

test("Add/Remove/Clear Marker", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    AddCircle(canvas, new diagram.Point(100, 120));
    var marker = new diagram.Marker({
        id          : "ArrowHead",
        width       : 44,
        height      : 21,
        viewBox     : new diagram.Rect(10, 20, 33, 55),
        orientantion: "auto",
        data        : "m"
    });
    canvas.addMarker(marker);
    var found = document.getElementById("ArrowHead");
    ok(found != null, "Marker element should be there.");
    ok(found.attributes["viewBox"] != null, "The viewBox should be there");
    ok(found.attributes["orient"] != null && found.attributes["orient"].value == "auto", "The orientation should be there");
    equal(marker.native.firstChild.tagName.toLowerCase(), "path", "path should be there");

    var line = new diagram.Line({
        id    : "Line1",
        endCap: marker.native.id
    });
    canvas.append(line);
    found = document.getElementById("Line1");
    ok(found.attributes["marker-end"] != null);
    equal(found.attributes["marker-end"].value.replace(/"/g, ""), "url(#ArrowHead)", "The end marker should be present.");
    var returnedMarkerId = line.native.getAttribute("marker-end");
    ok(returnedMarkerId.indexOf("ArrowHead") > -1, "Not the correct Id.");
    canvas.clearMarkers();
    var defs = document.getElementsByTagName("defs");
    ok(defs != null && defs.length == 1, "Defs tag should still be there.");
    ok(defs[0].childNodes.length == 0, "All markers should be gone now.");
    canvas.clear();
});

/*-----------Circle tests------------------------------------*/
QUnit.module("Circle tests");

test("Add Circle", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    var circ = new diagram.Circle({
        id        : "MyCirc",
        x         : 200, y: 121,
        width     : 150,
        height    : 150,
        background: "#345656"
    });
    canvas.append(circ);
    var found = document.getElementById("MyCirc");
    ok(found != null, "A SVG circle with name 'MyCirc' should be in the HTML tree.");
    equal(parseInt(found.attributes["rx"].value), 75, "The radius should be 75.");
    equal(parseInt(found.attributes["cx"].value), 275, "The center X value should be 200+75.");
    ok(found.attributes["fill"].value == "#345656");
});

/*-----------Text tests------------------------------------*/
QUnit.module("Text tests");

test("Add Text", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    var text = new diagram.TextBlock({
        id  : "MyText",
        x   : 100, y: 121,
        text: "<<|Telerik|>>"
    });

    canvas.append(text);
    var found = document.getElementById("MyText");
    ok(found != null, "A SVG text with name 'MyText' should be in the HTML tree.");
    ok(found.textContent == "<<|Telerik|>>", "The text should be '<< | Telerik | >>'.");
    equalTranslate(found, new diagram.Point(100, 121), "text block should be positioned");

    text.content("changed");
    equal(found.textContent, "changed", "Text has changed.");
});

/*-----------Group tests------------------------------------*/
QUnit.module("Group tests");

test("Add group", function()
{
    var root = GetRoot();
    var canvas = new diagram.Canvas(root);
    var g = new diagram.Group({
        id: "G1",
        x : 100,
        y : 100
    });
    canvas.append(g);
    var found = document.getElementById("G1");
    ok(found != null, "A SVG group with name 'G1' should be in the HTML tree.");
    var rec = new diagram.Rectangle({
        id        : "MyRectangle",
        width     : 50,
        height    : 50,
        background: "red"
    });
    g.append(rec);
});

/*-----------Transofrmations tests------------------------------------*/
QUnit.module("Transformation tests");

test("Matrix calculus", function()
{
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

test("Basic tests", function()
{
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

/*-----------Diagram tests------------------------------------*/
QUnit.module("Diagram tests");

test("Basic tests", function()
{
    GetRoot();
    $("#canvas").kendoDiagram();
    var found = document.getElementById('SVGRoot');
    ok(found != null, "The Diagram should add an <SVG/> element with name 'SVGRoot'.");
});

test("Adding shape tests", function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var kendoDiagram = diagramElement.data("kendoDiagram");
    kendoDiagram.addShape(new diagram.Point(100, 120), {
        id        : "TestShape",
        data      : "rectangle",
        width     : 200, height: 100,
        background: "#778899"
    });
    var found = document.getElementById("TestShape");
    ok(found != null, "A SVG shape with name 'TestShape' should be in the HTML tree.");
    ok(kendoDiagram.shapes.length == 1, "Items count should be incremented.");
    var item = kendoDiagram.shapes[0];
    ok(item.connectors.length == 5, "Item should have 5 connectors.");
    ok(item.options.id == "TestShape", "The Id should be passed across the hierarchy.");

    item.visible(false);
    ok(found.attributes["visibility"].value == "hidden", "The visibility should be 'collapsed' now.");
    item.visible(true);
    ok(found.attributes["visibility"].value == "visible", "The visibility should be 'visible' now.");
    item.IsSelected = true;
    kendoDiagram.addShape(new diagram.Point(350, 120), {
        id        : "TestShape",
        data      : "rectangle",
        width     : 200,
        height    : 100,
        background: "#778899"
    });
    //kendoDiagram.shapes[1].select(true);
});

test("Adding connections", function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var kendoDiagram = diagramElement.data("kendoDiagram");
    var shape1 = AddShape(kendoDiagram, new diagram.Point(100, 120),
        kendo.deepExtend(Shapes.SequentialData, {
            width: 80, height: 80, title: "sequential data"
        }));
    shape1.Title = "Sequential Data.";
    var shape2 = AddShape(kendoDiagram, new diagram.Point(100, 400));
    var shape3 = AddShape(kendoDiagram, new diagram.Point(370, 400), Shapes.Wave);
    var topCor = shape2.getConnector("Top");
    var topCor2 = shape3.getConnector("Top");
    var bottomCor = shape1.getConnector("Bottom");
    var con = AddConnection(kendoDiagram, bottomCor, topCor, {
        startCap: "ArrowEnd",
        endCap  : "FilledCircle"
    });
    var con2 = AddConnection(kendoDiagram, bottomCor, topCor2);
    con2.content("Connection Label");
    equal(kendoDiagram.connections.length, 2, "diagram should have 2 connections");
    //ok(topCor.connections.length == 1, "Shape2#Top should have one connection.");
    //ok(bottomCor.connections.length == 2, "Shape1#Bottom should have two connections.");
});

/*-----------XML Loading tests------------------------------------*/
QUnit.module("Graph adapter tests");
test('Graph adapter', function()
{

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

    var loopGraph = parse(["1->1", "1->2"]);
    div = GetRoot();
    diagramElement = $("#canvas").kendoDiagram();
    diagram = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(diagram, loopGraph, false);

    adapter = new Adapter(diagram);
    var g = adapter.convert();
    ok(g.nodes.length == 2);
    ok(g.links.length == 1);

    multiEdgeGraph = parse(["1->2", "1->2", "1->2"]);
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

    // floating and loose ends
    div = GetRoot();
    diagramElement = $("#canvas").kendoDiagram();
    diagram = diagramElement.data("kendoDiagram");
    // cannot use parse to create loose connections, too bad
    var a = AddShape(diagram);
    var b = AddShape(diagram);
    AddConnection(diagram, a, b);
    var looseCon = new kendo.diagram.Connection(a, new Point(120, 255));
    diagram.addConnection(looseCon);
    adapter = new Adapter(diagram);
    g = adapter.convert();
    ok(g.nodes.length == 2);
    ok(g.links.length == 1);
    ok(adapter.ignoredConnections.length == 1, "Should have ignored a floating connection.");

});

QUnit.module("Layout algorithms");

testSkip('Graph to diagram', function()
{
    var g = Predefined.Grid(5, 5);
    //var g = Predefined.Forest(3,2,2);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var d = diagramElement.data("kendoDiagram");
    // converting a Graph to a diagram (with internal spring layout to please the eyes)
    GraphUtils.createDiagramFromGraph(d, g);
    ok(d.shapes.length == 36 && d.connections.length == 60, "Grid of 36 shapes and 60 connections.");
});

testSkip('Spring layout', function()
{
    var g = Predefined.Forest(3, 3, 8);
    //var g = GraphUtils.createRandomConnectedGraph(300,2,true);

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var d = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(d, g);
    ok(true);
});

testSkip('Spring layout', function()
{
    var g = Predefined.Forest(3, 3, 3);
    //var g = GraphUtils.createRandomConnectedGraph(300,2,true);

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    diagram.layout(kendo.diagram.LayoutTypes.ForceDirectedLayout, {iterations: 400});
    ok(true);
});

testSkip('Spring layout', function()
{

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    var map = [];
    for(var i = 0; i < 10; i++)
    {
        var shape = diagram.addShape();
        shape.id = i.toString();
        map[i] = shape;
    }
    // create explicitly a radial diagram without passing through the graph structure
    for(var i = 1; i < 10; i++)
    {
        diagram.connect(map[0], map[i]);
    }
    diagram.layout();
    ok(true);
});

testSkip('Tree layout', function()
{
    var g = Predefined.Tree(3, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    GraphUtils.createDiagramFromGraph(diagram, g, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {});
    ok(true);
});

testSkip('Grid layout', function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    var map = [];
    for(var i = 0; i < 10; i++)
    {
        var shape = diagram.addShape();
        shape.id = i.toString();
        map[i] = shape;
    }
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {treeLayoutType: kendo.diagram.TreeLayoutType.TreeDown});
    ok(true);
});

testSkip('Forest layout', function()
{
    var g = Predefined.Forest(3, 2, 13);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout, {treeLayoutType: kendo.diagram.TreeLayoutType.TreeDown});
    ok(true);
});

testSkip('Random diagram layout', function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    for(var i = 0; i < 12; i++)
    {
        diagram.randomDiagram(parseInt(Math.random() * 150 + 1), 3, false);
    }
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.TreeRight
        }
    )
    ok(true);
});

testSkip('Radial layout', function()
{
    var g = Predefined.Tree(5, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.RadialTree
        }
    )
    ok(true);
});

testSkip('Radial layout', function()
{

    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(20, 5, true);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.RadialTree
        }
    )
    ok(true);
});

testSkip('Mindmap layout', function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    diagramElement.css("width", "800");
    diagramElement.css("height", "800");
    var diagram = diagramElement.data("kendoDiagram");
    var map = [];
    for(var i = 0; i < 10; i++)
    {
        var shape = diagram.addShape();
        shape.id = i.toString();
        map[i] = shape;
    }
    // create explicitly a radial diagram without passing through the graph structure
    for(var i = 1; i < 10; i++)
    {
        diagram.connect(map[0], map[i]);
    }
    diagram.layout();
    ok(true);
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function()
{
    var g = Predefined.Tree(3, 3);
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapVertical
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function()
{
    var g = Predefined.Mindmap();
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    GraphUtils.createDiagramFromGraph(diagram, g, false);

    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

testSkip('Mindmap layout', function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(250, 3, true);
    var root = diagram.getId("0");
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.MindmapHorizontal,
            verticalSeparation: 2,
            horizontalSeparation: 150,
            roots         : [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});

test('Tip-over tree layout', function()
{
    var div = GetRoot();
    var diagramElement = $("#canvas").kendoDiagram();
    var diagram = diagramElement.data("kendoDiagram");
    diagram.canvas.native.setAttribute("height", "1000");
    diagram.randomDiagram(50, 3, true);

    var root = diagram.getId("0");
    diagram.layout(kendo.diagram.LayoutTypes.TreeLayout,
        {
            TreeLayoutType: kendo.diagram.TreeLayoutType.TipOverTree,
            verticalSeparation: 25,
            horizontalSeparation:10,
            underneathHorizontalOffset: 10,
            underneathVerticalTopOffset: 10,
            roots         : [root]
        }
    )
    diagram.zoom(0.5);
    ok(true);
});
