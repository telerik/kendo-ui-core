(function() {
    var dataviz = kendo.dataviz,

        g = dataviz.geometry,
        Point = g.Point,
        Matrix = g.Matrix,

        d = dataviz.drawing,
        Circle = d.Circle,
        Group = d.Group,
        MultiPath = d.MultiPath,
        Path = d.Path,
        Text = d.Text,

        canv = d.canvas,
        Node = canv.Node,
        PathNode = canv.PathNode,
        Surface = canv.Surface,
        TextNode = canv.TextNode;

    // ------------------------------------------------------------
    var container,
        surface;

    module("Surface", {
        setup: function() {
            container = QUnit.fixture[0];
            surface = new Surface(container);
        }
    });

    test("sets initial options", function() {
        surface = new Surface(container, { foo: true });
        ok(surface.options.foo);
    });

    test("appends canvas element to container", function() {
        equal(QUnit.fixture.find("canvas").length, 1);
    });

    test("draw attaches element to root node", function() {
        var group = new d.Group();
        surface.draw(group);

        deepEqual(surface._root.childNodes[0].srcElement, group);
    });

    test("clear removes element from root node", function() {
        var group = new d.Group();
        surface.draw(group);
        surface.clear();

        equal(surface._root.childNodes.length, 0);
    });

    test("getSize returns element dimensions", function() {
        surface.setSize({ width: 1000, height: 1000 });

        deepEqual(surface.getSize(), {
            width: 1000,
            height: 1000
        });
    });

    test("setSize sets element dimensions", function() {
        deepEqual(surface.setSize({
            width: 100,
            height: 100
        }));

        deepEqual(surface.getSize(), {
            width: 100,
            height: 100
        });
    });

    // ------------------------------------------------------------
    var node;

    module("Node", {
        setup: function() {
            node = new Node();
        }
    });

    test("load appends Node for Group", function() {
        node.append = function(child) {
            ok(child instanceof canv.Node);
        };

        node.load([new d.Group()]);
    });

    test("load appends PathNode", function() {
        node.append = function(child) {
            ok(child instanceof canv.PathNode);
        };

        node.load([new d.Path()]);
    });

    test("load appends TextNode", function() {
        node.append = function(child) {
            ok(child instanceof canv.TextNode);
        };

        node.load([new d.Text()]);
    });

    test("load appends child nodes", function() {
        var parentGroup = new d.Group()
        var childGroup = new d.Group();
        parentGroup.append(childGroup);

        node.load([parentGroup]);

        ok(node.childNodes[0].childNodes[0] instanceof canv.Node);
    });

})();
