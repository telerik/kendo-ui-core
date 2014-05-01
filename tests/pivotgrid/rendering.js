(function() {
    var PivotDataSource = kendo.data.PivotDataSource,
        PivotGrid = kendo.ui.PivotGrid,
        div;

    module("PivotGrid render layout", {
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
            options.dataSource = new kendo.data.PivotDataSource({
                schema: {
                    axes: function() {
                        return {};
                    }
                }
            });
        }

        return new PivotGrid($(div), options);
    }

    test("PivotGrid renders filter section", function() {
        var pivotgrid = createPivot();

        var filterFields = pivotgrid.filterFields;

        ok(filterFields.is("div"));
        equal(filterFields.text(), pivotgrid.options.messages.filterFields);
    });

    test("PivotGrid renders measures section", function() {
        var pivotgrid = createPivot();

        var measureFields = pivotgrid.measureFields;

        ok(measureFields.is("div"));
        equal(measureFields.text(), pivotgrid.options.messages.measureFields);

        ok(measureFields.closest(".k-widget")[0]);
    });

    test("PivotGrid renders column fields section", function() {
        var pivotgrid = createPivot();

        var columnFields = pivotgrid.columnFields;

        ok(columnFields.is("div"));
        equal(columnFields.text(), pivotgrid.options.messages.columnFields);

        ok(pivotgrid.columnFields.closest(".k-widget")[0]);
    });

    test("PivotGrid renders row fields section", function() {
        var pivotgrid = createPivot();

        var rowFields = pivotgrid.rowFields;

        ok(rowFields.is("div"));
        equal(rowFields.text(), pivotgrid.options.messages.rowFields);

        ok(rowFields.closest(".k-widget")[0]);
    });

    test("PivotGrid renders column header section", 2, function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.columnsHeader.is("div"));
        ok(pivotgrid.columnsHeader.closest(".k-widget")[0]);
    });

    test("PivotGrid renders row header section", 2, function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.rowsHeader.is("div"));
        ok(pivotgrid.rowsHeader.closest(".k-widget")[0]);
    });

    test("PivotGrid renders content section", 2, function() {
        var pivotgrid = createPivot();

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

})();
