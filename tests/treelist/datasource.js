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

})();
