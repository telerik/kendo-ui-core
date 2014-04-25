(function() {
    var PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid initial rendering", {
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

    test("PivotGrid renders filter section", function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        var filtersSection = pivotgrid.filtersSection;

        ok(filtersSection.is("div"));
        ok(filtersSection.hasClass("k-grouping-header"));
        equal(filtersSection.text(), pivotgrid.options.messages.filterFields);

        equal(filtersSection[0], div.firstChild);
    });

    test("PivotGrid renders measures section", function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        var measuresSection = pivotgrid.measuresSection;

        ok(measuresSection.is("div"));
        equal(measuresSection.text(), pivotgrid.options.messages.measureFields);

        ok(measuresSection.closest(".k-widget")[0]);
    });

    test("PivotGrid renders column fields section", function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        var columnsSection = pivotgrid.columnsSection;

        ok(columnsSection.is("div"));
        equal(columnsSection.text(), pivotgrid.options.messages.columnFields);

        ok(pivotgrid.columnsSection.closest(".k-widget")[0]);
    });

    test("PivotGrid renders row fields section", function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        var rowsSection = pivotgrid.rowsSection;

        ok(rowsSection.is("div"));
        equal(rowsSection.text(), pivotgrid.options.messages.rowFields);

        ok(rowsSection.closest(".k-widget")[0]);
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

    module("PivotGrid virtual DOM rendering", {
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

    test("PivotGrid renders content section", 2, function() {
        var pivotgrid = new PivotGrid($(div), { dataSource: [] });

        ok(pivotgrid.content.is("div"));
        ok(pivotgrid.content.closest(".k-widget")[0]);
    });
})();
