(function() {
    var PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid rendering", {
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

    test("PivotGrid renders filter section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.filtersSection.is("div"));
        equal(pivotgrid.filtersSection[0], div.firstChild);
    });

    test("PivotGrid renders measures section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.measuresSection.is("div"));
        ok(pivotgrid.measuresSection.closest(".k-widget")[0]);
    });

    test("PivotGrid renders column fields section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.columnsSection.is("div"));
        ok(pivotgrid.columnsSection.closest(".k-widget")[0]);
    });

    test("PivotGrid renders row fields section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.rowsSection.is("div"));
        ok(pivotgrid.rowsSection.closest(".k-widget")[0]);
    });

    test("PivotGrid renders column header section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.columnsHeader.is("div"));
        ok(pivotgrid.columnsHeader.closest(".k-widget")[0]);
    });

    test("PivotGrid renders row header section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.rowsHeader.is("div"));
        ok(pivotgrid.rowsHeader.closest(".k-widget")[0]);
    });

    test("PivotGrid renders content section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.content.is("div"));
        ok(pivotgrid.content.closest(".k-widget")[0]);
    });

})();
