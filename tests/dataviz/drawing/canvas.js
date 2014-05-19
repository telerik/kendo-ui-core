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

})();
