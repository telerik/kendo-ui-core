(function() {
    var TreeListDataSource = kendo.data.TreeListDataSource;
    var TreeListModel = kendo.data.TreeListModel;

    module("TreeListModel");

    test("loaded method returns false", function() {
        var m = new TreeListModel();

        ok(!m.loaded());
    });

    test("loaded flag can be set", function() {
        var m = new TreeListModel();

        m.loaded(true);

        ok(m.loaded());
    });

    module("TreeListDataSource");

    test("extends DataSource", function() {
        ok(new TreeListDataSource() instanceof kendo.data.DataSource);
    });

    test("uses model of type TreeListModel", function(assert) {
        var ds = new TreeListDataSource({
            data: [ { id: 1 } ]
        });

        ds.read();

        ok(ds.at(0) instanceof TreeListModel);
    });

    test("load calls transport.read", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([
                        { id: calls }
                    ]);
                }
            }
        });

        ds.read();

        equal(calls, 1);

        ds.load(ds.at(0));

        equal(calls, 2);
    });

    test("load inserts new data into datasource", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([
                        { id: calls }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));

        equal(ds.data().length, 2);
    });

    test("load does not call transport.read when model is loaded", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([
                        { id: calls }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));
        ds.load(ds.at(0));

        equal(calls, 2);
    });

    test("load sets model loaded flag", function() {
        var calls = 0;

        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    calls++;

                    options.success([
                        { id: calls }
                    ]);
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));

        ok(ds.at(0).loaded());
    });

    test("load sends id field to server", 1, function() {
        var ds = new TreeListDataSource({
            transport: {
                read: function(options) {
                    var id = options.data.id;

                    if (!id) {
                        options.success([ { id: 42 } ]);
                    } else {
                        equal(id, 42);
                    }
                }
            }
        });

        ds.read();

        ds.load(ds.at(0));
    });

    test("childNodes returns child items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 2 }
            ]
        });

        ds.read();

        var childNodes = ds.childNodes(ds.get(1));
        equal(childNodes.length, 1);

        childNodes = ds.childNodes(ds.get(2));
        equal(childNodes.length, 1);
    });

    test("childNodes returns multiple child items", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 1 },
                { id: 5, parentId: 2 },
                { id: 6, parentId: 2 }
            ]
        });

        ds.read();

        var childNodes = ds.childNodes(ds.get(1));
        equal(childNodes.length, 3);

        childNodes = ds.childNodes(ds.get(2));
        equal(childNodes.length, 2);
    });

    test("parentNode returns parent node", function() {
        var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 },
                { id: 3, parentId: 2 }
            ]
        });

        ds.read();

        var parent = ds.parentNode(ds.get(2));
        equal(parent.id, 1);
    });

    test("rootNodes returns root nodes", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 2, parentId: null },
                { id: 5, parentId: 2 }
            ]
        });

        ds.read();

        var roots = ds.rootNodes();
        equal(roots.length, 2);
        equal(roots[0].id, 1);
        equal(roots[1].id, 2);
    });

    test("rootNodes uses parentId defaultValue", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: -1 },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 2, parentId: -1 },
                { id: 5, parentId: 2 }
            ],
            schema: {
                model: {
                    fields: {
                        parentId: { defaultValue: -1 }
                    }
                }
            }
        });

        ds.read();

        var roots = ds.rootNodes();
        equal(roots.length, 2);
        equal(roots[0].id, 1);
        equal(roots[1].id, 2);
    });

    test("node is considered loaded if it has children", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 3 },
                { id: 2, parentId: null },
                { id: 5, parentId: 2 }
            ]
        });

        ds.read();

        ok(ds.get(1).loaded());
        ok(ds.get(2).loaded());
        ok(ds.get(3).loaded());
    });

    test("level returns item level", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        equal(ds.level(1), 0);
        equal(ds.level(2), 0);
        equal(ds.level(3), 1);
        equal(ds.level(4), 1);
        equal(ds.level(5), 2);
    });

    test("level returns level when given model", function() {
         var ds = new TreeListDataSource({
            data: [
                { id: 1, parentId: null },
                { id: 2, parentId: null },
                { id: 3, parentId: 1 },
                { id: 4, parentId: 2 },
                { id: 5, parentId: 3 }
            ]
        });

        ds.read();

        equal(ds.level(ds.get(1)), 0);
        equal(ds.level(ds.get(4)), 1);
        equal(ds.level(ds.get(5)), 2);
    });

})();
