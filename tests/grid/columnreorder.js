(function() {
   var Grid = kendo.ui.Grid,
        div,
        data,
        DataSource = kendo.data.DataSource;

    module("grid column reorder", {
        setup: function() {
            data = [{ foo: "foo", bar: "bar" }];
            div = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            div.remove();
        }
    });

    test("reorderable in config options", function() {
        strictEqual(Grid.fn.options.reorderable, false);
    });

    test("Reorderable widget is initialized in Grid wrapper", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: data
        });

        ok(grid.wrapper.data("kendoReorderable") instanceof kendo.ui.Reorderable);
    });

    test("Reorderable widget is initialized in Grid wrapper when no columns are defined", function() {
        var grid = new Grid(div, {
            reorderable: true,
            dataSource: data
        });

        ok(grid.wrapper.data("kendoReorderable") instanceof kendo.ui.Reorderable);
    });

    test("columnReorder reorder col elements", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: data,
            scrollable: false
        });

        grid.reorderColumn(1, grid.columns[0]);

        var cols = grid.thead.prev().find("col");
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
    });

    test("columnReorder reorders col elements in scrollable grid", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: data
        });

        grid.reorderColumn(1, grid.columns[0]);

        var cols = grid.thead.prev().find("col").add(grid.tbody.prev().find("col"));
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
        equal(cols[2].style.width, "20px");
        equal(cols[3].style.width, "10px");
    });

    test("columnReorder reorders col elements in groupable grid", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: {
                data: data,
                group: { field: "foo" }
            },
            scrollable: false
        });

        grid.reorderColumn(1, grid.columns[0]);

        var cols = grid.thead.prev().find("col:not(.k-group-col)");
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
    });

    test("columnReorder reorders col elements in hierarchical grid", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: data,
            scrollable: false,
            detailTemplate: "foo"
        });

        grid.reorderColumn(1, grid.columns[0]);

        var cols = grid.thead.prev().find("col:not(.k-hierarchy-col)");
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
    });

    test("columnReorder moves col at first position", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: data,
            scrollable: false
        });

        grid.reorderColumn(0, grid.columns[1]);

        var cols = grid.thead.prev().find("col");
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
    });

    test("columnReorder does not move if destIndex same as column index", function() {
        var grid = new Grid(div, {
            columns: [{
                field: "foo",
                width: 10
            },
            {
                field: "bar",
                width: 20
            }],
            dataSource: data,
            scrollable: false
        });

        grid.reorderColumn(0, grid.columns[0]);

        var cols = grid.thead.prev().find("col");
        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "20px");
    });

    test("columnReorder reorder column headers", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var th = grid.thead.find("th");
        equal(th.eq(0).data("field"), "bar");
        equal(th.eq(1).data("field"), "foo");
    });

    test("columnReorder reorder column filtercell headers", function() {
        var grid = new Grid(div, {
            reorderable: true,
            filterable: {
                mode: "row menu"
            },
            columns: ["foo", "bar"],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var th = grid.thead.find(".k-filter-row [data-role=filtercell]");
        equal(th.length, 2);
        equal(th.eq(0).data("field"), "bar");
        equal(th.eq(1).data("field"), "foo");
    });

    test("columnReorder skips group and detail column headers", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: {
                data: data,
                group: { field: "foo" }
            },
            detailTemplate: "foo"
        });

        grid.reorderColumn(0, grid.columns[1]);

        var th = grid.thead.find("th:not(.k-group-cell,.k-hierarchy-cell)");
        equal(th.eq(0).data("field"), "bar");
        equal(th.eq(1).data("field"), "foo");
    });

    test("columnReorder reorder colum cells", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var td = grid.tbody.find("tr>td");
        equal(td.eq(0).text(), "bar");
        equal(td.eq(1).text(), "foo");
    });

    test("columnReorder skips group cells", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(0, grid.columns[1]);

        var td = grid.tbody.find("tr:eq(1)>td");
        equal(td.eq(1).text(), "bar");
        equal(td.eq(2).text(), "foo");
    });

    test("columnReorder skips detail cells", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: data,
            detailTemplate: "foo"
        });

        grid.reorderColumn(0, grid.columns[1]);

        var td = grid.tbody.children(":not(.k-detail-row)").find(">td");
        equal(td.eq(1).text(), "bar");
        equal(td.eq(2).text(), "foo");
    });

    test("columnReorder reorder colum footer cells", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer"
            },
            {
                field: "bar",
                footerTemplate: "bar footer"
            }],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var footer = grid.footer.find(".k-footer-template>td");
        equal(footer.eq(0).text(), "bar footer");
        equal(footer.eq(1).text(), "foo footer");
    });

    test("columnReorder reorder colum footer cols", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer",
                width: 20
            },
            {
                field: "bar",
                footerTemplate: "bar footer",
                width: 10
            }],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var cols = grid.footer.find(".k-grid-footer-wrap>table>colgroup>col");
        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "20px");
    });

    test("columnReorder reorder grid columns collection", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: ["foo", "bar"],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        equal(grid.columns[0].field, "bar");
        equal(grid.columns[1].field, "foo");
    });

    test("column order is peristed on refresh", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar"],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);
        grid.refresh();

        var td = grid.tbody.find("tr>td");
        equal(td.eq(0).text(), "bar");
        equal(td.eq(1).text(), "foo");
    });

    test("reorder when hidden column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", hidden: true, width: 20 },
                { field: "baz", width: 30 }
            ],
            dataSource: [{ foo: "foo", bar: "bar", baz: "baz" }]
        });

        grid.reorderColumn(0, grid.columns[2]);

        var td = grid.tbody.find("td");
        var col = grid.thead.prev().find("col");

        equal(grid.columns[0].field, "baz");
        equal(grid.columns[1].field, "foo");
        equal(grid.columns[2].field, "bar");
        equal(td.eq(0).text(), "baz");
        equal(td.eq(1).text(), "foo");
        equal(td.eq(2).text(), "bar");
        equal(col[0].style.width, "30px");
        equal(col[1].style.width, "10px");
    });

    test("reorder when first column is hidden", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", hidden: true, width: 10 },
                { field: "moo", width: 20 },
                { field: "bar", width: 30 },
                { field: "baz", width: 40 }
            ],
            dataSource: [{ foo: "foo", bar: "bar", baz: "baz", moo: "moo" }]
        });

        grid.reorderColumn(2, grid.columns[3], true);

        var td = grid.tbody.find("td");
        var th = grid.thead.find("th");
        var col = grid.thead.prev().find("col");

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "moo");
        equal(grid.columns[2].field, "baz");
        equal(grid.columns[3].field, "bar");

        equal(td.eq(0).text(), "foo");
        equal(td.eq(1).text(), "moo");
        equal(td.eq(2).text(), "baz");
        equal(td.eq(3).text(), "bar");

        equal(th.eq(0).text(), "foo");
        equal(th.eq(1).text(), "moo");
        equal(th.eq(2).text(), "baz");
        equal(th.eq(3).text(), "bar");

        equal(col[0].style.width, "20px");
        equal(col[1].style.width, "40px");
        equal(col[2].style.width, "30px");
    });

    test("reorder to right when hidden column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", width: 10, hidden: true },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ],
            dataSource: [{ foo: "foo", bar: "bar", baz: "baz" }]
        });

        grid.reorderColumn(2, grid.columns[1]);

        var col = grid.thead.prev().find("col");

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "baz");
        equal(grid.columns[2].field, "bar");
        equal(col[0].style.width, "30px");
        equal(col[1].style.width, "20px");
    });

    test("reorder when destination index is hidden column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", width: 10, hidden: true },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ],
            dataSource: [{ foo: "foo", bar: "bar", baz: "baz" }]
        });

        grid.reorderColumn(0, grid.columns[1]);
        var columns = grid.columns;

        equal(columns[0].field, "bar");
        equal(columns[1].field, "foo");
        equal(columns[2].field, "baz");
    });

    test("Reorderable destroy is called on grid destroy", function() {
        var grid = new Grid(div, { reorderable: true }),
            reorderable = grid.wrapper.data("kendoReorderable");

        reorderable = stub(reorderable, { destroy:  reorderable.destroy} );

        grid.destroy();

        equal(reorderable.calls("destroy"), 1);
    });

    test("move column after its right adjacent column", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz"]
        });

        grid.reorderColumn(1, grid.columns[0], false);

        var columns = grid.columns;
        equal(columns[0].field, "bar");
        equal(columns[1].field, "foo");
        equal(columns[2].field, "baz");
    });

    test("move column after its left adjacent column", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz"]
        });

        grid.reorderColumn(0, grid.columns[1], false);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        equal(columns[1].field, "bar");
        equal(columns[2].field, "baz");
    });

    test("move column before its adjacent column when current is before adjecent", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz"]
        });

        grid.reorderColumn(1, grid.columns[0], true);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        equal(columns[1].field, "bar");
        equal(columns[2].field, "baz");
    });

    test("move column before its adjacent column when current is after adjacent", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz"]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        equal(columns[1].field, "baz");
        equal(columns[2].field, "bar");
    });

    test("move column after another column", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz", "bax"]
        });

        grid.reorderColumn(2, grid.columns[0]);

        var columns = grid.columns;
        equal(columns[0].field, "bar");
        equal(columns[1].field, "baz");
        equal(columns[2].field, "foo");
        equal(columns[3].field, "bax");
    });

    test("move column before column which is after the current", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz", "bax"]
        });

        grid.reorderColumn(2, grid.columns[0], true);

        var columns = grid.columns;
        equal(columns[0].field, "bar");
        equal(columns[1].field, "foo");
        equal(columns[2].field, "baz");
        equal(columns[3].field, "bax");
    });

    test("move column before column which is before the current", function() {
        var grid = new Grid(div, {
            columns: ["foo", "bar", "baz", "bax"]
        });

        grid.reorderColumn(1, grid.columns[3], true);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        equal(columns[1].field, "bax");
        equal(columns[2].field, "bar");
        equal(columns[3].field, "baz");
    });

    test("move locked column before non locked column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                { field: "baz" },
                { field: "bax" }
            ]
        });

        grid.reorderColumn(2, grid.columns[1], true);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        ok(columns[0].locked, true);
        equal(columns[1].field, "bar");
        ok(!columns[1].locked);
        equal(columns[2].field, "baz");
        ok(!columns[2].locked);
        equal(columns[3].field, "bax");
        ok(!columns[3].locked);
    });

    test("move locked column after non locked column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                { field: "baz" },
                { field: "bax" }
            ]
        });

        grid.reorderColumn(2, grid.columns[1], false);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        ok(columns[0].locked, true);
        equal(columns[1].field, "baz");
        ok(!columns[1].locked);
        equal(columns[2].field, "bar");
        ok(!columns[2].locked);
        equal(columns[3].field, "bax");
        ok(!columns[3].locked);
    });

    test("move non locked column before locked column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                { field: "baz" },
                { field: "bax" }
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        ok(columns[0].locked, true);
        equal(columns[1].field, "baz");
        ok(columns[1].locked);
        equal(columns[2].field, "bar");
        ok(columns[2].locked);
        equal(columns[3].field, "bax");
        ok(!columns[3].locked);
    });

    test("move non locked column after locked column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                { field: "baz" },
                { field: "bax" }
            ]
        });

        grid.reorderColumn(1, grid.columns[2], false);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        ok(columns[0].locked, true);
        equal(columns[1].field, "bar");
        ok(columns[1].locked);
        equal(columns[2].field, "baz");
        ok(columns[2].locked);
        equal(columns[3].field, "bax");
        ok(!columns[3].locked);
    });

    test("move non locked column after hidden locked column", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true, hidden: true },
                { field: "baz" },
                { field: "bax" }
            ]
        });

        grid.reorderColumn(0, grid.columns[2], false);

        var columns = grid.columns;
        equal(columns[0].field, "foo");
        ok(columns[0].locked);
        equal(columns[1].field, "baz");
        ok(columns[1].locked);
        equal(columns[2].field, "bar");
        ok(columns[2].locked);
        equal(columns[3].field, "bax");
        ok(!columns[3].locked);
    });

    test("reorder headers with locked columns", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        var th = div.find("th");
        equal(th.length, 4);
        equal(th.eq(0).text(), "bax");
        equal(th.eq(1).text(), "bar");
        equal(th.eq(2).text(), "foo");
        equal(th.eq(3).text(), "baz");
    });

    test("reorder filtercell headers with locked columns", function() {
        var grid = new Grid(div, {
            filterable: {
                mode: "row menu"
            },
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        var th = div.find("th");
        equal(th.length, 8, "4 standard headers and 4 filtercell headers");
        var rowheadercells = div.find(".k-filter-row [data-role=filtercell]");
        equal(rowheadercells.eq(0).data("field"), "bax");
        equal(rowheadercells.eq(1).data("field"), "bar");
        equal(rowheadercells.eq(2).data("field"), "foo");
        equal(rowheadercells.eq(3).data("field"), "baz");
    });

    test("non locked header is moved to locked headers", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ]
        });

        grid.reorderColumn(0, grid.columns[1], false);

        var th = div.find("th");
        equal(th.eq(0).text(), "bax");
        equal(th.eq(1).text(), "foo");
        equal(th.eq(2).text(), "bar");
        equal(th.eq(3).text(), "baz");
        equal(th.eq(0).next()[0], th[1]);
    });

    test("locked header is moved to non locked headers", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                { field: "foo", locked: true },
                "bar",
                "baz"
            ]
        });

        grid.reorderColumn(2, grid.columns[1], true);

        var th = div.find("th");
        equal(th.eq(0).text(), "bax");
        equal(th.eq(1).text(), "foo");
        equal(th.eq(2).text(), "bar");
        equal(th.eq(3).text(), "baz");
        equal(th.eq(1).next()[0], th[2]);
    });

    test("reorder colum footer cells with locked columns", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer",
                locked: true
            },
            {
                field: "baz",
                locked: true,
                footerTemplate: "baz footer"
            },
            {
                field: "bar",
                footerTemplate: "bar footer"
            }],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var footer = grid.footer.find(".k-footer-template>td");
        equal(footer.eq(0).text(), "baz footer");
        equal(footer.eq(1).text(), "foo footer");
        equal(footer.eq(2).text(), "bar footer");
    });

    test("reorder colum footer cols with locked columns", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer",
                locked: true,
                width: 10
            },
            {
                field: "baz",
                locked: true,
                footerTemplate: "baz footer",
                width: 20
            },
            {
                field: "bar",
                footerTemplate: "bar footer",
                width: 30
            }],
            dataSource: data
        });

        grid.reorderColumn(0, grid.columns[1]);

        var cols = grid.footer.find("colgroup>col");
        equal(cols.length, 3);
        equal(cols[0].style.width, "20px");
        equal(cols[1].style.width, "10px");
        equal(cols[2].style.width, "30px");
    });

    test("columns are not reordered if only one locked column", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer",
                locked: true,
                width: 10
            },
            {
                field: "baz",
                footerTemplate: "baz footer",
                width: 20
            },
            {
                field: "bar",
                footerTemplate: "bar footer",
                width: 30
            }],
            dataSource: data
        });

        grid.reorderColumn(1, grid.columns[0], false);

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "baz");
        equal(grid.columns[2].field, "bar");
    });

    test("columns are not reordered if only one non locked column", function() {
        var grid = new Grid(div, {
            reorderable: true,
            columns: [{
                field: "foo",
                footerTemplate: "foo footer",
                locked: true,
                width: 10
            },
            {
                field: "baz",
                locked: true,
                footerTemplate: "baz footer",
                width: 20
            },
            {
                field: "bar",
                footerTemplate: "bar footer",
                width: 30
            }],
            dataSource: data
        });

        grid.reorderColumn(1, grid.columns[2], true);

        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].field, "baz");
        equal(grid.columns[2].field, "bar");
    });

    test("move to locked columns with grouping", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ],
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(0, grid.columns[1], false);

        equal(grid.lockedTable.find(".k-grouping-row>td:first").attr("colspan"), 3, "colspan in locked table");
        equal(grid.table.find(".k-grouping-row>td:first").attr("colspan"), 2, "colspan in non-locked table");
    });

    test("move filtercell header cell to locked header when grouping is enabled", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ],
            filterable: {
                mode: "row menu"
            },
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(0, grid.columns[1], false);
        equal(grid.element.find(".k-grid-header-locked .k-filter-row>th:not(.k-group-cell)").length, 2);
        equal(grid.element.find(".k-grid-header-wrap").find(".k-filter-row>th").length,  2);
    });

    test("move grouping header cell to locked header when grouping is enabled", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ],
            filterable: {
                mode: "row menu"
            },
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(0, grid.columns[1], false);
        equal(grid.element.find(".k-grid-header-locked .k-filter-row th.k-group-cell").length, 1);
        equal(grid.element.find(".k-grid-header-wrap .k-filter-row th.k-group-cell").length,  0);
    });

    test("move to non-locked columns with grouping", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                { field: "foo", locked: true },
                "bar",
                "baz"
            ],
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(2, grid.columns[1], false);

        equal(grid.lockedTable.find(".k-grouping-row>td:first").attr("colspan"), 2, "colspan in locked table");
        equal(grid.table.find(".k-grouping-row>td:first").attr("colspan"), 3, "colspan in non-locked table");
    });

    test("move in non-locked table with grouping", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                "foo",
                "bar",
                "baz"
            ],
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(2, grid.columns[1], false);

        equal(grid.lockedTable.find(".k-grouping-row>td:first").attr("colspan"), 2, "colspan in locked table");
        equal(grid.table.find(".k-grouping-row>td:first").attr("colspan"), 3, "colspan in non-locked table");
    });

    test("move in locked table with grouping", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                { field: "foo", locked: true },
                "bar",
                "baz"
            ],
            dataSource: {
                data: data,
                group: { field: "foo" }
            }
        });

        grid.reorderColumn(1, grid.columns[0], true);

        equal(grid.lockedTable.find(".k-grouping-row>td:first").attr("colspan"), 3, "colspan in locked table");
        equal(grid.table.find(".k-grouping-row>td:first").attr("colspan"), 2, "colspan in non-locked table");
    });

    test("reorder with two levels of grouping and locked columns", function() {
        var grid = new Grid(div, {
            columns: [
                { field: "bax", locked: true },
                { field: "foo", locked: true },
                "bar",
                "baz"
            ],
            dataSource: {
                data: data,
                group: [{ field: "foo" }, { field: "bar" }]
            }
        });

        grid.reorderColumn(2, grid.columns[1], false);

        equal(grid.lockedTable.find(".k-grouping-row:eq(0)>td:first").attr("colspan"), 3, "colspan in locked table");
        equal(grid.lockedTable.find(".k-grouping-row:eq(1)>td:not(.k-group-cell)").attr("colspan"), 2, "colspan in locked table");
        equal(grid.table.find(".k-grouping-row:eq(0)>td:first").attr("colspan"), 3, "colspan in non-locked table");
        equal(grid.table.find(".k-grouping-row:eq(1)>td:not(.k-group-cell)").attr("colspan"), 3, "colspan in non-locked table");
    });

    test("reorder second level header with single columns", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");
        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
    });

    test("reorder second level header with single columns - insert before", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[1], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");
        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
    });

    test("reorder second level header with single columns - columns collection is updated", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[1], true);

        equal(grid.columns[1].columns.length, 2);

        equal(grid.columns[1].columns[0].title, "master1-child1");
        equal(grid.columns[1].columns[1].title, "master1-child");
        equal(grid.columns[1].columns[0].columns[0].title, "master1-child1-child");
        equal(grid.columns[1].columns[1].columns[0].title, "master1-child-child");
    });

    test("reorder second level header with single columns - not beside of each other", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child2");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
    });

    test("reorder second level header with single columns - not beside of each other - insert before", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[2], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child2");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child1");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child1-child");
    });

    test("reorder second level header with single columns - not beside of each other - insert before ltr", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child2");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child2-child");
    });

    test("reorder second level header with two source child columns - rtl with insert before", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[1], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
    });

    test("reorder second level header with two source child columns - ltr", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child2");
    });

    test("reorder second level header with two source child columns - skip one - ltr", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }, { title: "master1-child2-child2", width: 20 }] },
                        { title: "master1-child3", columns: [{ title: "master1-child3-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child2");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child3");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child2-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child3-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(4).text(), "master1-child-child2");
    });

    test("reorder second level header with two source child columns - skip one - ltr with before", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }, { title: "master1-child2-child2", width: 20 }] },
                        { title: "master1-child3", columns: [{ title: "master1-child3-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child2");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child3");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child2-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child-child2");
        equal(rows.eq(2).find("th").eq(4).text(), "master1-child3-child");
    });

    test("reorder second level header with two target child columns - rtl with insert before", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[1], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child2");
    });

    test("reorder second level header with two target child columns - ltr", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
    });

    test("reorder second level header with two target child columns - ltr insert between", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }, { title: "master1-child2-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child2");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(4).text(), "master1-child2-child2");
    });

    test("reorder second level header with two target child columns - ltr multiple columns insert after", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 20 }, { title: "master1-child2-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child2");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child2-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child2-child2");
        equal(rows.eq(2).find("th").eq(4).text(), "master1-child-child");
    });

    test("reorder second level header with two target child columns and hidden source column - ltr multiple columns insert after", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20, hidden: true }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child-child2");
    });

    test("reorder second level header with two source child columns to non child target", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", width: 20 },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[1], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child1-child2");
    });

    test("reorder first level header with one child columns to non child target - ltr", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", width: 20 }
                ] },
                { title: "master2", width: 30 },
                { title: "master3",
                    columns: [
                        { title: "master3-child", columns: [{ title: "master3-child-child", width: 40 }, { title: "master3-child-child2", width: 40 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master2");
        equal(rows.eq(0).find("th").eq(2).text(), "master1");
        equal(rows.eq(0).find("th").eq(3).text(), "master3");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child1");

        equal(rows.eq(1).find("th").eq(2).text(), "master3-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child2");

        equal(rows.eq(2).find("th").eq(2).text(), "master3-child-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master3-child-child2");
    });

    test("reorder first level header with one child columns to non child target - rtl", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", width: 20 }
                ] },
                { title: "master2", width: 30 },
                { title: "master3",
                    columns: [
                        { title: "master3-child", columns: [{ title: "master3-child-child", width: 40 }, { title: "master3-child-child2", width: 40 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[3], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");
        equal(rows.eq(0).find("th").eq(2).text(), "master3");
        equal(rows.eq(0).find("th").eq(3).text(), "master2");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child1");

        equal(rows.eq(1).find("th").eq(2).text(), "master3-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child2");

        equal(rows.eq(2).find("th").eq(2).text(), "master3-child-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master3-child-child2");
    });

    test("reorder second level header with two source child columns to non child target - rtl", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child2", width: 20 }] },
                        { title: "master1-child1", width: 20 }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master");
        equal(rows.eq(0).find("th").eq(1).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master1-child1");
        equal(rows.eq(1).find("th").eq(1).text(), "master1-child");

        equal(rows.eq(2).find("th").eq(0).text(), "master1-child-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master1-child-child2");
    });

    test("reorder top level header with two source child columns to non child target", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", width: 20 },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }, { title: "master1-child1-child2", width: 20 }] }
                    ]},
                { title: "master2",
                    columns: [
                        { title: "master2-child", width: 20 },
                        { title: "master2-child1", columns: [{ title: "master2-child1-child", width: 20 }, { title: "master2-child1-child2", width: 20 }] }
                    ]}
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[2], true);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).text(), "master2");
        equal(rows.eq(0).find("th").eq(1).text(), "master");
        equal(rows.eq(0).find("th").eq(2).text(), "master1");

        equal(rows.eq(1).find("th").eq(0).text(), "master2-child");
        equal(rows.eq(1).find("th").eq(1).text(), "master2-child1");
        equal(rows.eq(1).find("th").eq(2).text(), "master1-child");
        equal(rows.eq(1).find("th").eq(3).text(), "master1-child1");

        equal(rows.eq(2).find("th").eq(0).text(), "master2-child1-child");
        equal(rows.eq(2).find("th").eq(1).text(), "master2-child1-child2");
        equal(rows.eq(2).find("th").eq(2).text(), "master1-child1-child");
        equal(rows.eq(2).find("th").eq(3).text(), "master1-child1-child2");
    });

    test("reorder cols second level header with single columns", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var cols = grid.thead.parent().find("col");

        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "30px");
        equal(cols[2].style.width, "20px");
    });

    test("reorder cols second level header with two source columns - rtl", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child", width: 30 } ] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 40 }] },
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(1, grid.columns[1].columns[0]);

        var cols = grid.thead.parent().find("col");

        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "40px");
        equal(cols[2].style.width, "20px");
        equal(cols[3].style.width, "30px");
    });

    test("reorder cols second level header with two source columns - rtl with before true", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }, { title: "master1-child-child", width: 30 } ] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 40 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[0], true);

        var cols = grid.thead.parent().find("col");

        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "40px");
        equal(cols[2].style.width, "20px");
        equal(cols[3].style.width, "30px");
        equal(cols[4].style.width, "50px");
    });

    test("reorder cols second level header with two source columns - ltr with before true", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 20 }] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 30 }] },
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 40 }, { title: "master1-child-child", width: 50 } ] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(0, grid.columns[1].columns[2], true);

        var cols = grid.thead.parent().find("col");

        equal(cols[0].style.width, "10px");
        equal(cols[1].style.width, "40px");
        equal(cols[2].style.width, "50px");
        equal(cols[3].style.width, "20px");
        equal(cols[4].style.width, "30px");
    });

    test("reorder data cells index is updated", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    columns: [
                        { title: "master1-child", columns: [{ title: "master1-child-child", width: 20 }] },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[1].columns[1]);

        var rows = grid.thead.find("tr");

        equal(rows.eq(0).find("th").eq(0).attr("data-index"), 0);
        equal(rows.eq(2).find("th").eq(0).attr("data-index"), 1);
        equal(rows.eq(2).find("th").eq(1).attr("data-index"), 2);
        equal(rows.eq(2).find("th").eq(2).attr("data-index"), 3);
        equal(rows.eq(2).find("th").eq(3).attr("data-index"), 4);
        equal(rows.eq(2).find("th").eq(4).attr("data-index"), 5);

    });

    test("reorder data cells index is updated - locked columns", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] }
            ],
            dataSource: {
                data: data
            }
        });

        grid.reorderColumn(2, grid.columns[0].columns[0]);

        var rows = grid.lockedHeader.find("tr");

        equal(rows.eq(2).find("th").eq(0).attr("data-index"), 0);
        equal(rows.eq(2).find("th").eq(1).attr("data-index"), 1);
        equal(rows.eq(2).find("th").eq(2).attr("data-index"), 2);
        equal(rows.eq(2).find("th").eq(3).attr("data-index"), 3);
        equal(rows.eq(1).find("th").eq(2).attr("data-index"), 4);

        equal(grid.thead.find("tr").first().find("th").eq(0).attr("data-index"), 5);
    });

    test("move locked multi-header column to non-locked single row column creates additional row elements", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(2, grid.columns[0], true);

        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).text(), "master2");
        equal(grid.lockedHeader.find("th").length, 1);
        equal(grid.lockedHeader.find("tr").length, 1);

        equal(grid.thead.find("tr").eq(0).find("th").eq(0).text(), "master1");
        equal(grid.thead.find("tr").eq(0).find("th").eq(1).text(), "master");
        equal(grid.thead.find("tr").eq(0).find("th").eq(2).text(), "master3");

        equal(grid.thead.find("tr").eq(1).find("th").eq(0).text(), "master1-child");
        equal(grid.thead.find("tr").eq(1).find("th").eq(1).text(), "master1-child1");
        equal(grid.thead.find("tr").eq(1).find("th").eq(2).text(), "master1-child2");

        equal(grid.thead.find("tr").eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(grid.thead.find("tr").eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(grid.thead.find("tr").eq(2).find("th").eq(2).text(), "master1-child2-child");
        equal(grid.thead.find("tr").eq(2).find("th").eq(3).text(), "master1-child2-child2");


        equal(grid.thead.find("tr").length, 3);
    });

    test("move non locked multi-header column to locked single row column creates additional row elements", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        equal(grid.thead.find("tr").eq(0).find("th").eq(0).text(), "master3");
        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("tr").length, 1);

        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).text(), "master");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(1).text(), "master1");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(2).text(), "master2");

        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(0).text(), "master1-child");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(1).text(), "master1-child1");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(2).text(), "master1-child2");

        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(2).text(), "master1-child2-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(3).text(), "master1-child2-child2");


        equal(grid.lockedHeader.find("tr").length, 3);
    });

    test("move non locked multi-header column to locked single row column creates additional row elements - with filter row enabled", function() {
        var grid = new Grid(div, {
            filterable: { mode: "row" },
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        equal(grid.thead.find("tr").eq(0).find("th").eq(0).text(), "master3");
        equal(grid.thead.find("th").length, 2);
        equal(grid.thead.find("tr").length, 2);

        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).text(), "master");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(1).text(), "master1");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(2).text(), "master2");

        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(0).text(), "master1-child");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(1).text(), "master1-child1");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(2).text(), "master1-child2");

        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(0).text(), "master1-child1-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(1).text(), "master1-child1-child2");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(2).text(), "master1-child2-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(3).text(), "master1-child2-child2");


        equal(grid.lockedHeader.find("tr").length, 4);
    });


    test("move non locked multi-header column to locked multi-header column creates additional row elements", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1", locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70 },
                { title: "master3",
                    columns: [
                        { title: "master3-child" },
                        { title: "master3-child1", columns: [{ title: "master3-child1-child", width: 30 }, { title: "master3-child1-child2", width: 40 } ] },
                        { title: "master3-child2", columns: [{ title: "master3-child2-child", width: 50 }, { title: "master3-child2-child2", width: 60 } ] }
                ] }
            ]
        });

        grid.reorderColumn(1, grid.columns[3], true);

        equal(grid.thead.find("tr").eq(0).find("th").eq(0).text(), "master2");
        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("tr").length, 1, "non locked rows");

        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).text(), "master");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(1).text(), "master3");
        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(2).text(), "master1");

        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(0).text(), "master3-child");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(1).text(), "master3-child1");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(2).text(), "master3-child2");

        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(3).text(), "master1-child");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(4).text(), "master1-child1");
        equal(grid.lockedHeader.find("tr").eq(1).find("th").eq(5).text(), "master1-child2");

        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(0).text(), "master3-child1-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(1).text(), "master3-child1-child2");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(2).text(), "master3-child2-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(3).text(), "master3-child2-child2");

        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(4).text(), "master1-child1-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(5).text(), "master1-child1-child2");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(6).text(), "master1-child2-child");
        equal(grid.lockedHeader.find("tr").eq(2).find("th").eq(7).text(), "master1-child2-child2");

        equal(grid.lockedHeader.find("tr").length, 3);
    });

    test("move locked multi-header column to non-locked single row column updates the rowspan", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10 },
                { title: "master1",
                    locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(2, grid.columns[0], true);

        equal(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).text(), "master2");
        equal(grid.lockedHeader.find("th")[0].rowSpan, 1);

        equal(grid.thead.find("tr").eq(0).find("th")[1].rowSpan, 3);
        equal(grid.thead.find("tr").eq(0).find("th")[2].rowSpan, 3);
    });

    test("move non locked multi-header column to locked single row column updates the rowspans", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        equal(grid.thead.find("tr").eq(0).find("th")[0].rowSpan, 1, "non locked column rowspan");

        equal(grid.lockedHeader.find("tr").eq(0).find("th")[0].rowSpan, 3, "locked column 1");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[1].rowSpan, 1, "locked column 2");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[2].rowSpan, 3, "locked column 3");
    });

    test("move non locked multi-header column to locked multi-header column creates group cells when grouping is applied", function() {
        var grid = new Grid(div, {
            dataSource: {
                group: ["foo"]
            },
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master2", width: 70 },
                { title: "master3",
                    columns: [
                        { title: "master3-child" },
                        { title: "master3-child1", columns: [{ title: "master3-child1-child", width: 30 }, { title: "master3-child1-child2", width: 40 } ] },
                        { title: "master3-child2", columns: [{ title: "master3-child2-child", width: 50 }, { title: "master3-child2-child2", width: 60 } ] }
                ] }
            ]
        });

        grid.reorderColumn(0, grid.columns[2], true);

        equal(grid.thead.find("th").length, 1);
        equal(grid.thead.find("tr").length, 1, "non locked rows");

        ok(grid.lockedHeader.find("tr").eq(0).find("th").eq(0).hasClass("k-group-cell"));
        ok(grid.lockedHeader.find("tr").eq(1).find("th").eq(0).hasClass("k-group-cell"));
        ok(grid.lockedHeader.find("tr").eq(2).find("th").eq(0).hasClass("k-group-cell"));

        equal(grid.lockedHeader.find("tr").length, 3);
    });

    test("move non locked single header column to locked multi-header column updates the rowspans", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1", locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70 },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(1, grid.columns[2], true);

        equal(grid.thead.find("tr").eq(0).find("th")[0].rowSpan, 1, "non locked column rowspan");

        equal(grid.lockedHeader.find("tr").eq(0).find("th")[0].rowSpan, 3, "locked column 1");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[1].rowSpan, 3, "locked column 2");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[2].rowSpan, 1, "locked column 3");
    });

    test("move non locked single header column to locked single row column updates the rowspans - multi-header column is in the non locked container", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(1, grid.columns[3], true);

        equal(grid.thead.find("tr").eq(0).find("th")[0].rowSpan, 1, "non locked column rowspan");

        equal(grid.lockedHeader.find("tr").eq(0).find("th")[0].rowSpan, 1, "locked column 1");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[1].rowSpan, 1, "locked column 2");
        equal(grid.lockedHeader.find("tr").eq(0).find("th")[2].rowSpan, 1, "locked column 3");
    });

    test("move locked single header column to non-locked multi-header column updates the rowspans", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70, locked: true },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(2, grid.columns[1]);

        equal(grid.thead.find("tr").eq(0).find("th")[0].rowSpan, 1, "non locked column 1 rowspan");
        equal(grid.thead.find("tr").eq(0).find("th")[1].rowSpan, 3, "non locked column 2 rowspan");
        equal(grid.thead.find("tr").eq(0).find("th")[2].rowSpan, 3, "non locked column 3 rowspan");

        equal(grid.lockedHeader.find("tr").eq(0).find("th")[0].rowSpan, 1, "locked column 1");
    });

    test("move locked single header column to non-locked single header column updates the rowspans - multi-header column is in the locked container", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true },
                { title: "master1", locked: true,
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1", columns: [{ title: "master1-child1-child", width: 30 }, { title: "master1-child1-child2", width: 40 } ] },
                        { title: "master1-child2", columns: [{ title: "master1-child2-child", width: 50 }, { title: "master1-child2-child2", width: 60 } ] }
                ] },
                { title: "master2", width: 70 },
                { title: "master3", width: 80 },
            ]
        });

        grid.reorderColumn(2, grid.columns[0]);

        equal(grid.thead.find("tr").eq(0).find("th")[0].rowSpan, 1, "non locked column 1 rowspan");
        equal(grid.thead.find("tr").eq(0).find("th")[1].rowSpan, 1, "non locked column 2 rowspan");
        equal(grid.thead.find("tr").eq(0).find("th")[2].rowSpan, 1, "non locked column 3 rowspan");

        equal(grid.lockedHeader.find("tr").eq(0).find("th")[0].rowSpan, 1, "locked column 1");
    });

    test("move non-locked multi header column with hidden child to locked single header column updates the col span", function() {
        var grid = new Grid(div, {
            columns: [
                { title: "master", width: 10, locked: true, footerTemplate: "foo" },
                { title: "master1",
                    columns: [
                        { title: "master1-child" },
                        { title: "master1-child1" },
                        { title: "master1-child2", hidden: true }
                ] },
                { title: "master2", width: 70 }
            ]
        });

        grid.reorderColumn(0, grid.columns[1]);

        equal(grid.thead.parent().find("col").length, 1, "non locked header");
        equal(grid.lockedHeader.find("col").length, 3, "locked header");

        equal(grid.table.find("col").length, 1, "non-locked content");
        equal(grid.lockedTable.find("col").length, 3, "locked content");

        equal(grid.footer.find(".k-grid-footer-wrap").find("col").length, 1, "non-loocked footer");
        equal(grid.lockedFooter.find("col").length, 3, "loocked footer");
    });

})();
