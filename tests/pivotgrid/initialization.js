(function() {
    var PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid initialziation", {
        setup: function() {
            kendo.ns = "kendo-";
            div = document.createElement("div");
            QUnit.fixture[0].appendChild(div);
        },
        teardown: function() {
            var component = $(div).data("kendoPivotGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    function createPivot(options) {
        options = options || {};

        if (!options.dataSource) {
            var dataSource = new kendo.data.PivotDataSource();

            //mock - axes method
            dataSource.axes = function() {
                return {
                    columns: [],
                    rows: []
                }
            }

            options.dataSource = dataSource;
        }

        return new PivotGrid($(div), options);
    }

    /*test("kendoPivotGrid attaches a pivotgrid object to target", function() {
        var pivotgrid = $(div).kendoPivotGrid();

        ok(pivotgrid.data("kendoPivotGrid") instanceof PivotGrid);
    });*/

    test("creates a PivotDataSource", function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.dataSource instanceof kendo.data.PivotDataSource);
    });

    test("dataSource fetch is called", function() {
        var dataSource = new kendo.data.PivotDataSource();

        var fetch = stub(dataSource, "fetch");

        var pivot = new PivotGrid(div, { dataSource: dataSource });

        ok(fetch.calls("fetch"));
    });

    test("dataSource fetch is not called if autobind is false", function() {
        var dataSource = new kendo.data.PivotDataSource();

        var fetch = stub(dataSource, "fetch");

        var pivotgrid = new PivotGrid(div, { dataSource: dataSource, autoBind: false });

        ok(!fetch.calls("fetch"));
    });

    test("PivotGrid creates column header virtual DOM node", function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.columnsHeaderTree instanceof kendo.dom.Tree);
    });

    test("PivotGrid creates row header virtual DOM node", function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.rowsHeaderTree instanceof kendo.dom.Tree);
    });

    test("PivotGrid creates content virtual DOM node", function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.contentTree instanceof kendo.dom.Tree);
    });
})();
