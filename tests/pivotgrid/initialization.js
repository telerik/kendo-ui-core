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

})();
