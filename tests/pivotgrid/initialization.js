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

    test("kendoPivotGrid attaches a pivotgrid object to target", function() {
        var pivotgrid = $(div).kendoPivotGrid({ dataSource: [] });

        ok(pivotgrid.data("kendoPivotGrid") instanceof PivotGrid);
    });

    test("creates a PivotDataSource", function() {
        var pivot = new PivotGrid(div);

        ok(pivot.dataSource instanceof kendo.data.PivotDataSource);
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

        var pivot = new PivotGrid(div, { dataSource: dataSource, autoBind: false });

        ok(!fetch.calls("fetch"));
    });

})();
