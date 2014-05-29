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

        var filterFields = pivotgrid.wrapper.children("div");

        ok(filterFields.is("div"));
        ok(filterFields.hasClass("k-pivot-toolbar"));
        ok(filterFields.hasClass("k-header"));
        equal(filterFields.text(), pivotgrid.options.messages.filterFields);
    });

    test("PivotGrid renders layout table", function() {
        var pivotgrid = createPivot();

        var layout = pivotgrid.wrapper.find(".k-pivot-layout");

        ok(layout[0]);
        ok(layout.is("table"));
    });

    test("PivotGrid renders left layout column wrapper", function() {
        var pivotgrid = createPivot();

        var leftLayoutColumn = pivotgrid.wrapper.find(".k-pivot-rowheaders");

        ok(leftLayoutColumn.is("div"));
        ok(leftLayoutColumn.parent().is("td"));
        equal(leftLayoutColumn.length, 1);
    });

    test("PivotGrid renders right layout column wrapper", function() {
        var pivotgrid = createPivot();

        var rightLayoutColumn = pivotgrid.wrapper.find(".k-pivot-table");

        ok(rightLayoutColumn.is("div"));
        ok(rightLayoutColumn.parent().is("td"));
        equal(rightLayoutColumn.length, 1);
    });

    test("PivotGrid renders data fields section", function() {
        var pivotgrid = createPivot();

        var leftLayoutColumn = pivotgrid.wrapper.find(".k-pivot-rowheaders");

        var measureFields = leftLayoutColumn.children("div").eq(0);

        ok(measureFields.is("div"));
        ok(measureFields.hasClass("k-pivot-toolbar"));
        ok(measureFields.hasClass("k-header"));
        equal(measureFields.text(), pivotgrid.options.messages.measureFields);
    });

    test("PivotGrid renders row fields section", function() {
        var pivotgrid = createPivot();

        var leftLayoutColumn = pivotgrid.wrapper.find(".k-pivot-rowheaders");

        var rowFields = leftLayoutColumn.children("div").eq(1);

        ok(rowFields.is("div"));
        ok(rowFields.hasClass("k-pivot-toolbar"));
        ok(rowFields.hasClass("k-header"));
        equal(rowFields.text(), pivotgrid.options.messages.rowFields);
    });

    test("PivotGrid renders rows header section", function() {
        var pivotgrid = createPivot();

        var leftLayoutColumn = pivotgrid.wrapper.find(".k-pivot-rowheaders");

        var rowFields = leftLayoutColumn.children("div").eq(2);

        ok(rowFields.is("div"));
        ok(rowFields.hasClass("k-grid"));
        ok(rowFields.hasClass("k-widget"));
        ok(rowFields.hasClass("k-alt"));
    });

    test("PivotGrid renders column fields section", function() {
        var pivotgrid = createPivot();

        var rightLayoutColumn = pivotgrid.wrapper.find(".k-pivot-table");

        var columnFields = rightLayoutColumn.children("div").eq(0);

        ok(columnFields.is("div"));
        ok(columnFields.hasClass("k-pivot-toolbar"));
        ok(columnFields.hasClass("k-header"));
        equal(columnFields.text(), pivotgrid.options.messages.columnFields);
    });

    test("PivotGrid renders pivot content wrapper", function() {
        var pivotgrid = createPivot();

        var rightLayoutColumn = pivotgrid.wrapper.find(".k-pivot-table");

        var columnFields = rightLayoutColumn.children("div").eq(1);

        ok(columnFields.is("div"));
        ok(columnFields.hasClass("k-grid"));
        ok(columnFields.hasClass("k-widget"));
    });

    test("PivotGrid renders columns header section", function() {
        var pivotgrid = createPivot();

        var rightLayoutColumn = pivotgrid.wrapper.find(".k-pivot-table");

        var gridWrapper = rightLayoutColumn.find(".k-grid");

        var columnsHeader = gridWrapper.children("div").eq(0);

        ok(columnsHeader.is("div"));
        ok(columnsHeader.hasClass("k-grid-header"));

        var columnsHeaderWrap = columnsHeader.children().eq(0);

        ok(columnsHeaderWrap.is("div"));
        ok(columnsHeaderWrap.hasClass("k-grid-header-wrap"));
    });

    test("PivotGrid renders pivot content column", function() {
        var pivotgrid = createPivot();

        var rightLayoutColumn = pivotgrid.wrapper.find(".k-pivot-table");

        var gridWrapper = rightLayoutColumn.find(".k-grid");

        var gridContent = gridWrapper.children("div").eq(1);

        ok(gridContent.is("div"));
        ok(gridContent.hasClass("k-grid-content"));
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

    function createDataSource(tuples, data) {
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
                        data: data || []
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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        equal(tr.length, 3);

        var row_2 = tr.eq(1);
        var cells_row2 = row_2.find("th");

        equal(cells_row2.length, 5);

        equal(cells_row2.eq(0).text(), "level 1_1");
        equal(cells_row2.eq(0).attr("colspan"), 1);

        equal(cells_row2.eq(1).text(), "level 1_1");
        equal(cells_row2.eq(1).attr("rowspan"), 2);

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        equal(rows.length, 4);

        var tr_dim0 = rows.eq(0);
        var tr_dim1 = rows.eq(1);

        equal(tr_dim0.find("th").attr("colspan"), 4);
        equal(tr_dim1.find("th").attr("colspan"), 4);
    });

    test("PivotGrid does not set colspan to the parent dimension if child was not expanded", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] } ] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        equal(rows.length, 3);

        var tr_dim0 = rows.eq(0);
        var tr_dim1 = rows.eq(1);

        equal(tr_dim0.find("th").last().attr("colspan"), 1);
        ok(!tr_dim1.find("th").last().attr("colspan"));
    });

    test("PivotGrid calculates colspan of two of three expanded dimensions", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] }, { name: "dim 2", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_1", parentName: "dim 2", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_2", parentName: "dim 2", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }, { name: "level 1_3", parentName: "dim 2", levelNum: "1", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        var tr_dim0 = rows.eq(0);
        var tr_dim1 = rows.eq(1);

        equal(tr_dim0.find("th").last().attr("colspan"), 6);
        equal(tr_dim1.find("th").last().attr("colspan"), 4);
    });

    test("PivotGrid expands All cell of second dimension under first dimension child correctly", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        var th_level0 = rows.eq(0).find("th");
        var th_level1 = rows.eq(1).find("th");
        var th_level2 = rows.eq(2).find("th");

        equal(th_level0.eq(0).attr("colspan"), 4);
        equal(th_level1.eq(1).attr("colspan"), 3);
        equal(th_level2.eq(1).attr("colspan"), 2);
    });

    test("PivotGrid expands All cell of second dimension under first dimension child when child is expanded", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_3", parentName: "dim 0_2", levelNum: "2", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_3", parentName: "dim 1_1", levelNum: "2", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        var th_level0 = rows.eq(0).find("th");
        var th_level1 = rows.eq(1).find("th");
        var th_level3 = rows.eq(3).find("th");

        equal(th_level0.eq(0).attr("colspan"), 6);
        equal(th_level1.eq(2).attr("colspan"), 4);
        equal(th_level3.eq(2).attr("colspan"), 3);
    });

    test("PivotGrid expands child cells and all cells of both dimensions (complex expanded header)", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_1", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_3", parentName: "dim 0_2", levelNum: "2", children: [] }, { name: "dim 1", levelNum: "0", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0_2", parentName: "dim 0", levelNum: "1", children: [] }, { name: "dim 1_3", parentName: "dim 1_1", levelNum: "2", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_1", parentName: "dim 1", levelNum: "1", children: [] }] },
            { members: [ { name: "dim 0", levelNum: "0", children: [] }, { name: "dim 1_2", parentName: "dim 1", levelNum: "1", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");

        var th_level0 = rows.eq(0).find("th");
        var th_level1 = rows.eq(1).find("th");
        var th_level3 = rows.eq(3).find("th");
        var th_level4 = rows.eq(4).find("th");

        //All section of dim 0
        equal(th_level0.eq(0).attr("colspan"), 6);
        equal(th_level1.eq(2).attr("colspan"), 4);
        equal(th_level3.eq(2).attr("colspan"), 3);

        //All section of dim 1
        equal(th_level0.eq(1).attr("colspan"), 3);
        equal(th_level0.eq(1).attr("rowspan"), 3);
        equal(th_level3.eq(4).attr("colspan"), 2);
        equal(th_level3.eq(5).attr("rowspan"), 3);
        equal(th_level4.eq(3).attr("rowspan"), 2);
        equal(th_level4.eq(4).attr("rowspan"), 2);
    });

    test("PivotGrid adds tuple-all attr to the ALL tuple column without children", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

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

    test("PivotGrid renders k-header style to TH cell", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        ok(th.hasClass("k-header"));
    });

    test("PivotGrid renders k-header k-alt style to all TH cell", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 0_1", parentName: "level 0", levelNum: "1", children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");
        var th_level0 = rows.eq(0).find("th");
        var th_level1 = rows.eq(1).find("th");

        ok(th_level0.eq(0).hasClass("k-header"));
        ok(!th_level0.eq(0).hasClass("k-alt"));

        ok(th_level0.eq(1).hasClass("k-header"));
        ok(th_level0.eq(1).hasClass("k-alt"));

        ok(th_level1.eq(0).hasClass("k-header"));
        ok(!th_level1.eq(0).hasClass("k-alt"));
    });

    test("PivotGrid renders k-first class to first cells that are not visually first", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_2", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_3", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 2_1", parentName: "level 1_2", levelNum: "2", children: [] }] },
            { members: [ { name: "level 2_2", parentName: "level 1_3", levelNum: "2", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");
        var th_level2 = rows.eq(2).find("th");

        ok(th_level2.eq(0).hasClass("k-first"));
        ok(th_level2.eq(1).hasClass("k-first"));
    });

    test("PivotGrid renders expand button collapsed", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        var button = th.find("span");

        ok(button[0]);
        ok(button.hasClass("k-icon"));
        ok(button.hasClass("k-i-arrow-e"));
        ok(!button.hasClass("k-i-arrow-s"));
        equal(button.attr(kendo.attr("path")), kendo.stringify(["level 0"]));
    });

    test("PivotGrid renders expand button with correct path", function() {
        var tuples = [
            { members: [ { name: "dim 0", levelNum: "0", hasChildren: true, children: [] }, { name: "dim 1", levelNum: "0", hasChildren: true, children: [] } ] }
        ]

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var rows = headerTable.find("tr");
        var th_0 = rows.eq(0).find("th");
        var th_1 = rows.eq(1).find("th");

        equal(th_0.find("span").attr(kendo.attr("path")), kendo.stringify(["dim 0"]));
        equal(th_1.find("span").attr(kendo.attr("path")), kendo.stringify(["dim 0", "dim 1"]));
    });

    test("PivotGrid renders expand button expanded", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", hasChildren: true, children: [] }] },
            { members: [ { name: "level 0_1", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_2", levelNum: "1", parentName: "level 0", children: [] }] },
            { members: [ { name: "level 0_3", levelNum: "1", parentName: "level 0", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");

        var tr = headerTable.find("tr");
        var th = headerTable.find("th");

        var button = th.find("span");

        ok(button[0]);
        ok(button.hasClass("k-icon"));
        ok(!button.hasClass("k-i-arrow-e"));
        ok(button.hasClass("k-i-arrow-s"));
        equal(button.attr(kendo.attr("path")), kendo.stringify(["level 0"]));
    });

    module("PivotGrid resize on render", {
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

    test("PivotGrid sets width of 100 percents if content table is narrow than pivot", function() {
        var tuples = [
            { members: [ { name: "level 0", levelNum: "0", children: [] }] },
            { members: [ { name: "level 1_1", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_2", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 1_3", parentName: "level 0", levelNum: "1", children: [] }] },
            { members: [ { name: "level 2_1", parentName: "level 1_2", levelNum: "2", children: [] }] },
            { members: [ { name: "level 2_2", parentName: "level 1_3", levelNum: "2", children: [] }] }
        ];

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        var contentTable = pivotgrid.wrapper.find(".k-grid-content").find("table");

        equal(headerTable.css("min-width"), "100%");
        equal(contentTable.css("min-width"), "100%");
    });

    test("PivotGrid sets width of 100 percents if content table is narrow than pivot", function() {
        var tuples = [{ members: [ { name: "dim 0", levelNum: "0", children: [] }] }];
        var data = [];

        for (var idx = 0; idx < 100; idx++) {
            tuples.push({ members: [ { name: "tuple " + idx, parentName: "dim 0", levelNum: "1", children: [] }] });
            data.push(idx);
        }

        var pivotgrid = createPivot({
            dataSource: createDataSource(tuples, data)
        });

        var headerTable = pivotgrid.wrapper.find(".k-grid-header").find("table");
        var contentTable = pivotgrid.wrapper.find(".k-grid-content").find("table");

        ok(parseInt(headerTable.css("min-width")) > 100);
        ok(parseInt(contentTable.css("min-width")) > 100);
    });
})();
