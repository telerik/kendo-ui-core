(function() {
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeListDataSource binding");

    test("TreeListDataSource extends HierarchicalDataSource", function() {

        ok(new TreeListDataSource() instanceof kendo.data.HierarchicalDataSource);
    });

    test("TreeListDataSource can be instantiated without options", function() {

        ok(new TreeListDataSource());
    });

    test("TreeListDataSource throws error when specifying heterogeneous data", function(assert) {

        assert.throws(function() {
            new TreeListDataSource({
                schema: {
                    model: {
                        children: { }
                    }
                }
            });
        });
    });
})();
