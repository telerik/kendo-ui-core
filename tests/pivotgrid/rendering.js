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

    test("PivotGrid adds CSS classes to the wrapper elements", function() {
        var pivotgrid = createPivot();

        var wrapper = pivotgrid.wrapper;

        ok(wrapper.hasClass("k-widget"));
        ok(wrapper.hasClass("k-pivot"));
    });

    test("PivotGrid renders filter section", function() {
        var pivotgrid = createPivot();

        var filterFields = pivotgrid.wrapper.find(".k-pivot-filters");

        ok(filterFields.is("div"));
        equal(filterFields.text(), pivotgrid.options.messages.filterFields);
    });

    test("PivotGrid renders layout table", function() {
        var pivotgrid = createPivot();

        var layout = pivotgrid.wrapper.find(".k-pivot-layout");

        ok(layout[0]);
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

    test("PivotGrid renders pivot content column", 1, function() {
        var pivotgrid = createPivot();

        ok(pivotgrid.wrapper.find(".k-pivot-table")[0]);
    });

    test("PivotGrid renders header outer wrapper", 1, function() {
        var pivotgrid = createPivot();

        var header = pivotgrid.wrapper
                              .find(".k-pivot-table")
                              .find(".k-pivot-header");

        ok(header[0]);
    });

    test("PivotGrid renders header inner wrapper", 1, function() {
        var pivotgrid = createPivot();

        var header = pivotgrid.wrapper
                              .find(".k-pivot-table")
                              .find(".k-pivot-header")
                              .find(".k-pivot-header-wrap");

        ok(header[0]);
    });

    test("PivotGrid renders row header section", 2, function() {
        var pivotgrid = createPivot();

        var rowheaders = pivotgrid.wrapper.find(".k-pivot-rowheaders");

        ok(rowheaders.is("div"));
        ok(rowheaders.closest(".k-pivot-layout")[0]);
    });

    test("PivotGrid renders content section", 2, function() {
        var pivotgrid = createPivot();

        var contentElement = pivotgrid.wrapper.find(".k-pivot-content");

        ok(contentElement.is("div"));
        ok(contentElement.closest(".k-pivot-layout")[0]);
    });

    module("PivotGrid column headers rendering", {
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

    function createDataSource(tuples) {
        return new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: tuples || []
                            }
                        },
                        data: []
                    });
                }
            }
        });
    }

    test("PivotGrid renders column header for 1 dimension with one tuple", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        equal(tr.length, 1);
        equal(th.length, 1);
        equal(th.text(), "level 0");
    });

    test("PivotGrid renders column header for 2 dimension with one tuple each", function() {
        var tuples = [
            { members: [ { name: "dim 1", levelNum: "0", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        equal(tr.length, 2);
        equal(th.length, 2);
        equal(th.eq(0).text(), "dim 1");
        equal(th.eq(1).text(), "dim 2");
    });

    test("PivotGrid renders one expanded dimension", function() {
        var tuples = [
            { members: [{ name: "dim 1", levelNum: "0", children: [] }] },
            { members: [{ name: "child 1", levelNum: "1",  parentName: "dim 1", children: [] }] },
            { members: [{ name: "child 2", levelNum: "1",  parentName: "dim 1", children: [] }] },
            { members: [{ name: "child 3", levelNum: "1",  parentName: "dim 1", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 2);

        var row_1 = tr.eq(0);
        var cells_row1 = row_1.find("th");

        equal(cells_row1.length, 2);
        equal(cells_row1.eq(0).attr("colspan"), 3);
        equal(cells_row1.eq(1).attr("rowspan"), 2);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 3);
        equal(cells_row2.eq(0).text(), "child 1");
        equal(cells_row2.eq(1).text(), "child 2");
        equal(cells_row2.eq(2).text(), "child 3");
    });

    test("PivotGrid renders one expanded dimension of two", function() {
        var tuples = [
            { members: [{ name: "dim 1", levelNum: "0", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [{ name: "child 1", levelNum: "1",  parentName: "dim 1", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [{ name: "child 2", levelNum: "1",  parentName: "dim 1", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [{ name: "child 3", levelNum: "1",  parentName: "dim 1", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 3);

        var row_1 = tr.eq(0);
        var cells_row1 = row_1.find("th");

        equal(cells_row1.length, 2);
        equal(cells_row1.eq(0).attr("colspan"), 3);
        equal(cells_row1.eq(1).attr("rowspan"), 2);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 3);
        equal(cells_row2.eq(0).text(), "child 1");
        equal(cells_row2.eq(1).text(), "child 2");
        equal(cells_row2.eq(2).text(), "child 3");

        var row_3 = tr.eq(2);
        var cells_row3 = row_3.find("th");

        equal(cells_row3.length, 4);
        equal(cells_row3.eq(0).text(), "dim 2");
        equal(cells_row3.eq(1).text(), "dim 2");
        equal(cells_row3.eq(2).text(), "dim 2");
        equal(cells_row3.eq(3).text(), "dim 2");
    });

    test("PivotGrid renders three level expanded dimension", function() {
        var tuples = [
            { members: [ { name: "level 0",  levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2", levelNum: "2",  parentName: "level 1_1", children: [] }] },
            { members: [ { name: "level 3", levelNum: "3",  parentName: "level 2", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 4);

        var row_1 = tr.eq(0);
        var cells_row1 = row_1.find("th");

        equal(cells_row1.length, 2);
        equal(cells_row1.eq(0).attr("colspan"), 5);
        equal(cells_row1.eq(1).attr("rowspan"), 4);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 4);
        equal(cells_row2.eq(0).text(), "level 1_1");
        equal(cells_row2.eq(0).attr("colspan"), 2);

        equal(cells_row2.eq(1).text(), "level 1_1");
        equal(cells_row2.eq(1).attr("rowspan"), 3);

        equal(cells_row2.eq(2).text(), "level 1_2");
        equal(cells_row2.eq(2).attr("rowspan"), 3);

        equal(cells_row2.eq(3).text(), "level 1_3");
        equal(cells_row2.eq(3).attr("rowspan"), 3);

        var row_3 = tr.eq(2);
        var cells_row3 = row_3.find("th");

        equal(cells_row3.length, 2);
        equal(cells_row3.eq(0).text(), "level 2");
        equal(cells_row3.eq(1).text(), "level 2");
        equal(cells_row3.eq(1).attr("rowspan"), 2);

        var row_4 = tr.eq(3);
        var cells_row4 = row_4.find("th");

        equal(cells_row4.length, 1);
    });

    test("PivotGrid renders third level corretly if second parent has been expanded", function() {
        var tuples = [
            { members: [ { name: "level 0",  levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2", levelNum: "2",  parentName: "level 1_2", children: [] }] },
            { members: [ { name: "level 3", levelNum: "3",  parentName: "level 2", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 4);

        var row_1 = tr.eq(0);
        var cells_row1 = row_1.find("th");

        equal(cells_row1.length, 2);
        equal(cells_row1.eq(0).attr("colspan"), 5);
        equal(cells_row1.eq(1).attr("rowspan"), 4);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 4);

        equal(cells_row2.eq(0).text(), "level 1_1");
        equal(cells_row2.eq(0).attr("rowspan"), 3);

        equal(cells_row2.eq(1).text(), "level 1_2");
        equal(cells_row2.eq(1).attr("colspan"), 2);

        equal(cells_row2.eq(2).text(), "level 1_2");
        equal(cells_row2.eq(2).attr("rowspan"), 3);

        equal(cells_row2.eq(3).text(), "level 1_3");
        equal(cells_row2.eq(3).attr("rowspan"), 3);

        var row_3 = tr.eq(2);
        var cells_row3 = row_3.find("th");

        equal(cells_row3.length, 2);
        equal(cells_row3.eq(0).text(), "level 2");
        equal(cells_row3.eq(1).text(), "level 2");
        equal(cells_row3.eq(1).attr("rowspan"), 2);

        var row_4 = tr.eq(3);
        var cells_row4 = row_4.find("th");

        equal(cells_row4.length, 1);
    });

    test("PivotGrid renders second level with two expanded tuples corretly", function() {
       var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1",  parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2_1", levelNum: "2",  parentName: "level 1_1", children: [] }] },
            { members: [ { name: "level 2_2", levelNum: "2",  parentName: "level 1_2", children: [] }] },
            { members: [ { name: "level 2_3", levelNum: "2",  parentName: "level 1_2", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 3);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 5);

        equal(cells_row2.eq(0).text(), "level 1_1");
        equal(cells_row2.eq(0).attr("colspan"), 1);

        equal(cells_row2.eq(1).text(), "level 1_1");
        equal(cells_row2.eq(1).attr("rowspan"), 2);
        return;

        equal(cells_row2.eq(2).text(), "level 1_2");
        equal(cells_row2.eq(2).attr("colspan"), 2);

        equal(cells_row2.eq(3).text(), "level 1_2");
        equal(cells_row2.eq(3).attr("rowspan"), 2);

        equal(cells_row2.eq(4).text(), "level 1_3");
        equal(cells_row2.eq(4).attr("rowspan"), 2);

        var row_3 = tr.eq(2);
        var cells_row3 = row_3.find("th");

        equal(cells_row3.length, 3);
        equal(cells_row3.eq(0).text(), "level 2_1");
        equal(cells_row3.eq(1).text(), "level 2_2");
        equal(cells_row3.eq(2).text(), "level 2_3");
    });

    test("PivotGrid appends first level expanded tuple to two levels expanded sibling tuple ", function() {
       var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2_1", levelNum: "2", parentName: "level 1_1", children: [] }] },
            { members: [ { name: "level 3_1", levelNum: "3", parentName: "level 2_1", children: [] }] },
            { members: [ { name: "level 2_2", levelNum: "2", parentName: "level 1_2", children: [] }] },
            { members: [ { name: "level 2_3", levelNum: "2", parentName: "level 1_2", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");
        var tr = headerTable.find("tr");

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 5);

        equal(cells_row2.eq(2).text(), "level 1_2");
        equal(cells_row2.eq(2).attr("colspan"), 2);

        equal(cells_row2.eq(3).text(), "level 1_2");
        equal(cells_row2.eq(3).attr("rowspan"), 3);

        var row_3 = tr.eq(2);
        var cells_row3 = row_3.find("th");

        equal(cells_row3.eq(2).text(), "level 2_2");
        equal(cells_row3.eq(2).attr("rowspan"), 2);
        equal(cells_row3.eq(3).text(), "level 2_3");
        equal(cells_row3.eq(3).attr("rowspan"), 2);
    });

    test("PivotGrid normalizes rowspan values of master row", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2", levelNum: "2", parentName: "level 1_1", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr").eq(1);
        var th_level1 = tr.find("th");

        ok(!th_level1.eq(0).attr("rowspan"));
        equal(th_level1.eq(1).attr("rowspan"), 2);
        equal(th_level1.eq(2).attr("rowspan"), 2);
        equal(th_level1.eq(3).attr("rowspan"), 2);
    });

    test("PivotGrid normalizes rowspan values of all master rows", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 1_3", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 2", levelNum: "2", parentName: "level 1_1", children: [] }] },
            { members: [ { name: "level 3", levelNum: "3", parentName: "level 2", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr").eq(1);
        var th_level1 = tr.find("th");

        ok(!th_level1.eq(0).attr("rowspan"));
        equal(th_level1.eq(0).attr("colspan"), 2);
        equal(th_level1.eq(1).attr("rowspan"), 3);
        equal(th_level1.eq(2).attr("rowspan"), 3);
        equal(th_level1.eq(3).attr("rowspan"), 3);
    });

    test("PivotGrid normalize colspan value of all dimension rows", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_1", parentName: "dim 2", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_2", parentName: "dim 2", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_3", parentName: "dim 2", levelNum: "1", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var rows = headerTable.find("tr");

        equal(rows.length, 4);

        var tr_dim0 = rows.eq(0);
        var tr_dim1 = rows.eq(1);

        equal(tr_dim0.find("th").attr("colspan"), 4);
        equal(tr_dim1.find("th").attr("colspan"), 4);
    });

    test("PivotGrid adds tuple-all attr to the ALL tuple column without children", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        ok(th.attr("data-kendo-tuple-all"), "true");
    });

    test("PivotGrid adds tuple-all attr to the expanded ALL tuples", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_2", parentName: "level 0", levelNum: "1", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var tr = headerTable.find("tr");
        var th_level0 = tr.eq(0).find("th");
        var th_level1 = tr.eq(1).find("th");

        equal(th_level0.last().attr("data-kendo-tuple-all"), "true");
        equal(th_level1.eq(0).attr("data-kendo-tuple-all"), "true");
        equal(th_level1.eq(1).attr("data-kendo-tuple-all"), "true");
    });

    test("PivotGrid adds tuple-all attr to the second level parent cell", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_2", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_3", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 2", parentName: "level 1_1", levelNum: "2", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-pivot-header").find("table");

        var rows = headerTable.find("tr");
        var th_level0 = rows.eq(0).find("th");
        var th_level1 = rows.eq(1).find("th");
        var th_level2 = rows.eq(2).find("th");

        ok(!th_level0.first().attr("data-kendo-tuple-all"));
        equal(th_level0.last().attr("data-kendo-tuple-all"), "true");

        ok(!th_level1.eq(0).attr("data-kendo-tuple-all"));
        equal(th_level1.eq(1).attr("data-kendo-tuple-all"), "true");
        equal(th_level1.eq(2).attr("data-kendo-tuple-all"), "true");
        equal(th_level1.eq(3).attr("data-kendo-tuple-all"), "true");

        equal(th_level2.eq(0).attr("data-kendo-tuple-all"), "true");
    });
})();
