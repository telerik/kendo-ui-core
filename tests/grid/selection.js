(function() {
   var Grid = kendo.ui.Grid,
        DataSource = kendo.data.DataSource,
        div;

    function setup(options) {
        options = $.extend({ dataSource: [{foo: 1, bar: 1}, {foo: 2, bar:2}, {foo: 3, bar:3}], navigatable: true }, options);
        return new Grid(div, options);
    }

    module("Grid selection and navigation", {
        setup: function() {
            div = $("<div></div>").appendTo(QUnit.fixture);

            $.fn.press = function(key, ctrl, shift, alt) {
                return this.trigger( { type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift, altKey: alt } );
            }
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            div.remove();
            $(".k-animation-container").remove();
        }
    });

    test("tabindex is set to 0", function() {
        var grid = setup();
        equal(grid.table.attr("tabIndex"), 0);
    });

    test("header table tabindex is -1", function() {
        var grid = setup({
            columns: [ "foo" ]
        });
        equal(grid.thead.parent().attr("tabIndex"), -1);
    });

    test("header table tabindex is 0 in non scrollable grid", function() {
        var grid = setup({
            columns: [ "foo" ],
            scrollable: false
        });
        equal(grid.thead.parent().attr("tabIndex"), 0);
    });

    test("positive tabindex is retained", function() {
        var table = $("<table><tbody/></table>").attr("tabIndex", 1).appendTo(QUnit.fixture);
        var grid = new Grid(table, { navigatable: true });

        equal(table.attr("tabIndex"), 1);
        grid.destroy();
        table.remove();
    });

    test("negative tabindex is set to 0", function() {
        var table = $("<table><tbody/></table>").attr("tabIndex", -1).appendTo(QUnit.fixture);
        var grid = new Grid(table, { navigatable: true });

        equal(table.attr("tabIndex"), 0);
        grid.destroy();
        table.remove();
    });

    test("focusing scrollable grid header set tabindex to 0 and body table to -1", function() {
        var grid = setup({
            columns: ["foo"]
        });

        grid.thead.parent().focus();

        equal(grid.thead.parent().attr("tabindex"), 0);
        equal(grid.table.attr("tabindex"), -1);
    });

    test("focusing non scrollable grid header set tabindex to 0", function() {
        var grid = setup({
            scrollable: false,
            columns: ["foo"]
        });

        grid.thead.parent().focus();

        equal(grid.table.attr("tabindex"), 0);
    });

    test("footer table has negative tabindex", function() {
        var grid = setup({
            columns: [ { field: "foo", footerTemplate: "foo" }]
        });

        equal(grid.footer.attr("tabindex"), -1);
    });

    test("focusing grid element focus first cell", function() {
        var grid = setup();
        grid.table.focus();
        ok(grid.table.find(">tbody>tr>td").first().is(".k-state-focused"));
    });

    test("focused state is removed on blur", function() {
        var grid = setup();

        grid.table.focus().blur().trigger("focusout");

        ok(!grid.table.find(">tbody>tr>td").first().is(".k-state-focused"));
    });

    test("focused state is maintained after refocus", function() {
        var grid = setup();
        grid.table.focus().blur().focus();

        ok(grid.table.find(">tbody>tr>td").first().is(".k-state-focused"));
    });

    test("clicking a child focuses it", function() {
        var grid = setup();
        grid.table.find(">tbody>tr>td").last().mousedown().click();

        ok(grid.table.find(">tbody>tr>td").last().is(".k-state-focused"));
    });

    test("down arrow moves focus on the next row same cell", function() {
        var grid = setup();
        grid.table.focus().press(kendo.keys.DOWN);
        ok(grid.table.find("tbody tr:eq(1)").find("td").hasClass("k-state-focused"));
        equal(grid.table.find(".k-state-focused").length, 1);
    });

    test("moving down from header", function() {
        var grid = setup({
            columns: [{ field: "foo" }]
        });

        grid.thead.parent().focus().press(kendo.keys.DOWN);

        ok(grid.table.find("td:first").hasClass("k-state-focused"));
    });

    test("right arrow moves focus on the next cell on the same row", function() {
        var grid = setup();
        grid.table.focus().press(kendo.keys.RIGHT);
        ok(grid.table.find("tbody tr:eq(0)").find("td:eq(1)").hasClass("k-state-focused"));
    });

    test("left arrow moves focus on the prev cell on the same row", function() {
        var grid = setup();
        grid.table.focus().press(kendo.keys.RIGHT).press(kendo.keys.LEFT);
        ok(grid.table.find("tbody tr:eq(0)").find("td:eq(0)").hasClass("k-state-focused"));
    });

    test("up arrow moves focus on the prev row same cell", function() {
        var grid = setup();
        grid.table.focus().press(kendo.keys.DOWN).press(kendo.keys.UP);
        ok(grid.table.find("tbody tr:eq(0)").find("td").hasClass("k-state-focused"));
    });

    test("moving up to header", function() {
        var grid = setup({
            columns: [{ field: "foo" }]
        });

        grid.table.focus().press(kendo.keys.UP);

        ok(grid.thead.find("th:first").hasClass("k-state-focused"));
    });

    test("pageDown page to the next page", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            }
        });
        grid.table.focus().press(kendo.keys.PAGEDOWN);
        equal(grid.dataSource.page(), 2);
    });

    test("pageUp page to the prev page", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            }
        });
        $(".k-grid-pager").find("ul a:not(.currentPage)").click();
        grid.table.focus().press(kendo.keys.PAGEUP);
        equal(grid.dataSource.page(), 1);
    });

    test("pageUp should not page if on first page", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            }
        });
        grid.table.focus().press(kendo.keys.PAGEUP);
        equal(grid.dataSource.page(), 1);
    });

    test("page should focus first cell in the table", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            }
        });
        grid.table.focus().press(kendo.keys.PAGEDOWN);
        ok(grid.table.find("td:first").hasClass("k-state-focused"));
    });

    test("page will persist the focus in header table", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            },
            columns: [{ field: "foo" }]
        });
        grid.thead.parent().focus().press(kendo.keys.PAGEDOWN);
        ok(grid.thead.find("th:first").hasClass("k-state-focused"));
    });

    test("down arrow after paging should select first cell", function() {
        var grid = setup({
            pageable: {
                pageSize: 1
            }
        });
        grid.table.focus().press(kendo.keys.PAGEUP).press(kendo.keys.DOWN);

        ok(grid.table.find(">tbody>tr>td").first().is(".k-state-focused"));
    });

    test("space key select the focused cell", function() {
        grid = setup({ selectable: "cell" });

        grid.table.focus().press(kendo.keys.DOWN).press(kendo.keys.SPACEBAR);

        ok(grid.table.find("tbody tr:eq(1) td:first").hasClass("k-state-selected"));
    });

    test("space key select the multiple focused cells if multiple selection is enabled", function() {
        var grid = setup({ selectable: "multipleCell" });

        grid.table.focus()
                    .press(kendo.keys.DOWN)
                    .press(kendo.keys.SPACEBAR)
                    .press(kendo.keys.RIGHT)
                    .press(kendo.keys.SPACEBAR, true);
        var row = grid.table.find("tbody tr").eq(1);
        ok(row.find("td").first().hasClass("k-state-selected"));
        ok(row.find("td").last().hasClass("k-state-selected"));
    });

    test("space key select single cells if multiple selection is enabled but ctrl is not active", function() {
        var grid = setup({ selectable: "multipleCell" });

        grid.table.focus()
                    .press(kendo.keys.DOWN)
                    .press(kendo.keys.SPACEBAR)
                    .press(kendo.keys.RIGHT)
                    .press(kendo.keys.SPACEBAR);
        var row = grid.table.find("tbody tr").eq(1);
        ok(!row.find("td").first().hasClass("k-state-selected"));
        ok(row.find("td").last().hasClass("k-state-selected"));
    });

    test("clicking on cell selects it", function() {
        var grid = setup({ selectable: "cell" }),
            cell = grid.table.find("tbody tr:eq(1)").find("td").first();
        cell.mousedown().mouseup();
        ok(cell.hasClass("k-state-selected"));
    });

    test("clicking on cell selects the row if row selection is enabled", function() {
        var grid = setup({ selectable: true }),
            cell = grid.table.find("tbody tr:eq(1)").find("td").first();
        cell.mousedown().mouseup();
        ok(cell.parent().hasClass("k-state-selected"));
    });

    test("selecting a cell triggers change event", function() {
        var triggered = false,
            grid = setup({
                selectable: true,
                change: function() {
                    triggered = true;
                }
            }),
            cell = grid.table.find("tbody tr:eq(1)").find("td").first();
        cell.mousedown().mouseup();
        ok(triggered);
    });

    test("space key does not select the header cell", function() {
        var grid = setup({ selectable: "cell", scrollable: false });

        grid.table.focus().press(kendo.keys.SPACEBAR);

        equal(grid.table.find(".k-state-selected").length, 0);
    });

    test("last selected cell on blur is highlighted on focus", function() {
        var grid = setup();

        grid.table.focus().press(kendo.keys.DOWN);
        grid.table.trigger("focusout").trigger("focus");

        var row = grid.table.find("tbody tr").eq(1);
        ok(row.find("td").first().hasClass("k-state-focused"));
    });

    test("left arrow on grouped grid", function() {
        var grid = setup();
        grid.dataSource.group({field: "foo"});

        grid.table.focus().press(kendo.keys.LEFT);

        var row = grid.table.find("tbody tr:first");
        ok(row.find("td").eq(0).hasClass("k-state-focused"));
    });

    test("down arrow on grouped grid", function() {
        var grid = setup();
        grid.dataSource.group({field: "foo"});

        grid.table.focus().press(kendo.keys.DOWN);

        var row = grid.table.find("tbody tr:not(.k-grouping-row):first");
        ok(!row.find("td").eq(0).hasClass("k-state-focused"));
        ok(row.find("td").eq(1).hasClass("k-state-focused"));
    });

    test("up arrow on grouped grid", function() {
        var grid = setup();
        grid.dataSource.group({field: "foo"});

        grid.table.focus()
            .press(kendo.keys.DOWN)
            .press(kendo.keys.UP);

        var row = grid.table.find("tbody tr.k-grouping-row:first");
        ok(row.find("td").eq(0).hasClass("k-state-focused"));
    });

    test("focus after grid refresh selects first cell", function() {
        var grid = setup();

        grid.table.focus();
        grid.refresh();

        var row = grid.table.find("tbody tr").eq(0);
        ok(row.find("td:first").hasClass("k-state-focused"));
    });

    test("clearSelection clears selected items", function() {
        var grid = setup({
                selectable: true
            }),
            cell = grid.table.find("tbody tr:eq(1)").find("td").first();
        cell.mousedown().mouseup();
        grid.clearSelection();

        ok(!cell.parent().hasClass("k-state-selected"));
    });

    test("clearSelection clears selected items when inside a collapsed group", function() {
        var grid = setup({
                selectable: true
            });

        grid.dataSource.group({ field: "foo" });

        var cell = grid.table.find("tbody tr:eq(1)").find("td").last();
        cell.mousedown().mouseup();

        grid.collapseGroup(grid.table.find(".k-grouping-row:first"));

        grid.clearSelection();

        ok(!cell.parent().hasClass("k-state-selected"));
    });

    test("clearSelection clears selected cell when inside a collapsed group", function() {
        var grid = setup({
                selectable: "cell"
            });

        grid.dataSource.group({ field: "foo" });

        var cell = grid.table.find("tbody tr:eq(1)").find("td").last();
        cell.mousedown().mouseup();

        grid.collapseGroup(grid.table.find(".k-grouping-row:first"));

        grid.clearSelection();

        ok(!cell.hasClass("k-state-selected"));
    });

    test("clearSelection triggers change event", function() {
        var triggered = false,
            grid = setup({
                selectable: true,
                change: function() {
                    triggered = true;
                }
            }),
            row = grid.table.find("tbody tr:eq(1)").addClass("k-state-selected");
        grid.clearSelection();

        ok(triggered);
    });

    test("select without arguments return all selected items", function() {
        var grid = setup({
                selectable: true
            }),
            firstRow = grid.table.find("tbody tr:eq(0)").addClass("k-state-selected");

        var selected = grid.select();

        equal(selected.length, 1);
        equal(selected[0], firstRow[0]);
    });

    test("select with arguments mark the arguments as selected", function() {
        var grid = setup({
                selectable: true
            }),
            firstRow = grid.table.find("tbody tr:eq(0)");

        grid.select(firstRow);

        ok(firstRow.hasClass("k-state-selected"));
    });

    test("select clears previously selected items if single select", function() {
        var grid = setup({
                selectable: true
            }),
            rows = grid.table.find("tbody tr");
        rows.eq(0).addClass("k-state-selected");
        grid.select(rows.eq(1));

        ok(!rows.eq(0).hasClass("k-state-selected"));
        ok(rows.eq(1).hasClass("k-state-selected"));
    });

    test("select persist previously selected items if multi select", function() {
        var grid = setup({
                selectable: "multiple"
            }),
            rows = grid.table.find("tbody tr");
        rows.eq(0).addClass("k-state-selected");
        grid.select(rows.eq(1));

        ok(rows.eq(0).hasClass("k-state-selected"));
        ok(rows.eq(1).hasClass("k-state-selected"));
    });

    test("select with array of items as argument select first if single select", function() {
        var grid = setup({
                selectable: true
            }),
            rows = grid.table.find("tbody tr");

        grid.select(rows);

        ok(rows.eq(0).hasClass("k-state-selected"));
        ok(!rows.eq(1).hasClass("k-state-selected"));
        ok(!rows.eq(2).hasClass("k-state-selected"));
    });

    test("ctrl space on selected item unselects it", function() {
        var grid = setup({
                selectable: "multiple"
            });

        grid.table.focus()
            .press(kendo.keys.SPACEBAR)
            .press(kendo.keys.SPACEBAR, true);

        ok(!grid.table.find("tbody tr:first").hasClass("k-state-selected"));
    });

    test("ctrl space on selected item triggers change", function() {
        var wasCalled = false,
            grid = setup({
                selectable: "multiple",
                change: function() {
                    wasCalled = true;
                }
            });

        grid.table.find("tbody tr:first").addClass("k-state-selected");
        grid.table.focus()
            .press(kendo.keys.SPACEBAR, true);

        ok(wasCalled);
    });

    test("hierarchy cell links tabindex", function() {
        var grid = setup({ detailTemplate: "template" });

        equal(grid.table.find(".k-hierarchy-cell>a").attr("tabindex"), -1);
    });

    test("k-hierarchy-cell is not highlighted when grid is focused", function() {
        var grid = setup({ detailTemplate: "template" });
        grid.table.focus();

        ok(!grid.table.find("tbody tr:eq(0)").find("td:first").hasClass("k-state-focused"));
        ok(grid.table.find("tbody tr:eq(0)").find("td:nth(1)").hasClass("k-state-focused"));
    });


    test("k-hierarchy-cell is not highlighted on left arrow press", function() {
        var grid = setup({ detailTemplate: "template" });
        grid.table.focus().press(kendo.keys.LEFT);

        ok(!grid.table.find("tbody tr:eq(0)").find("td:first").hasClass("k-state-focused"));
        ok(grid.table.find("tbody tr:eq(0)").find("td:nth(1)").hasClass("k-state-focused"));
    });

    test("group cell links tabindex", function() {
        var grid = setup();
        grid.dataSource.group({ field: "foo" });

        equal(grid.table.find(".k-grouping-row a").attr("tabindex"), -1);
    });

    test("group footer row is not selected when clicked", function() {
        var grid = setup({selectable: true, columns: [ { field: "foo", groupFooterTemplate: "foo" }] });
        grid.dataSource.group({ field: "foo" });
        grid.element.find(".k-group-footer:first").mousedown().mouseup();

        ok(!grid.element.find(".k-state-selected").length)
    });

    test("group footer row is not selected when clicked and selection mode is cell", function() {
        var grid = setup({selectable: "cell", columns: [ { field: "foo", groupFooterTemplate: "foo" }] });
        grid.dataSource.group({ field: "foo" });
        grid.element.find(".k-group-footer:first > td:last").mousedown().mouseup();

        ok(!grid.element.find(".k-state-selected").length)
    });

    test("detail cell is not focused", function() {
        var grid = setup({ detailTemplate: "<input class='foo' />" });
        grid.expandRow(div.find(".k-master-row:first"));
        grid.table.find(".foo").focus().mousedown();

        ok(!div.find(".k-detail-cell").hasClass("k-state-focused"));
    });

    test("enter key on header on sortable grid", function() {
        var grid = setup({ sortable: true, columns: [ { field: "foo" }] });
        grid.thead.parent().focus().press(kendo.keys.ENTER);

        equal(grid.dataSource.sort().length, 1);
        equal(grid.dataSource.sort()[0].field, "foo");
        equal(grid.dataSource.sort()[0].dir, "asc");
    });

    test("enter key on button column", function() {
        var grid = setup({
            columns: [ {
                field: "foo"
            },
            {
                template: '<input id="button" />'
            }]
        });

        grid.table.focus().press(kendo.keys.RIGHT).press(kendo.keys.ENTER);

        equal(document.activeElement, $("#button")[0]);
    });

    test("esc key on focused button in column", function() {
        var grid = setup({
            columns: [ {
                field: "foo",
                template: '<input id="button" />'
            }]
        });

        grid.table.focus().press(kendo.keys.ENTER);
        $("#button").press(kendo.keys.ESC);

        equal(document.activeElement, grid.table[0]);
        ok(grid.table.find("td:first").hasClass("k-state-focused"));
    });

    test("pressing alt and down opens filter menu", function() {
        var grid = setup({ columns: [ "foo", "bar" ], filterable: true });

        grid.thead.parent().focus().press(kendo.keys.DOWN, false, false, true);

        ok(!grid.tbody.find("td:first").hasClass("k-state-focused"));
    });

    test("useAllItems is set when static columns and multiple cell selection", function() {
        var grid = setup({
            selectable: "multiple cell",
            columns: [
                { field: "foo", static: true }
            ]
        });

        var useAllItems = grid.selectable.options.useAllItems;

        ok(useAllItems);
    });

    test("useAllItems is not set when no static columns", function() {
        var grid = setup({
            selectable: "multiple cell"
        });

        var useAllItems = grid.selectable.options.useAllItems;

        ok(!useAllItems);
    });

    test("relatedTarget returns undefined with cell selection", function() {
        var grid = setup({ selectable: "cell" });

        var target = grid.selectable.relatedTarget();

        equal(target, undefined);
    });

    test("relatedTarget returns undefined with if not static columns", function() {
        var grid = setup({ selectable: "row" });

        var target = grid.selectable.relatedTarget();

        equal(target, undefined);
    });

    test("relatedTarget returns row from non-static table", function() {
        var grid = setup({
            selectable: "row",
            columns: [
                { field: "foo", static: true }
            ]
        });

        var item = grid.table.find("tr").first();
        var target = grid.selectable.relatedTarget(item);

        equal(target[0], grid.staticContent.find("tr")[0]);
    });

    test("relatedTarget returns row from static table", function() {
        var grid = setup({
            selectable: "row",
            columns: [
                { field: "foo", static: true }
            ]
        });

        var item = grid.staticContent.find("tr").first();
        var target = grid.selectable.relatedTarget(item);

        equal(target[0], grid.table.find("tr")[0]);
    });

    test("relatedTarget returns multiple rows", function() {
        var grid = setup({
            selectable: "row",
            columns: [
                { field: "foo", static: true }
            ]
        });

        var item = grid.table.find("tr").eq(0).add(grid.table.find("tr").eq(1));
        var target = grid.selectable.relatedTarget(item);

        equal(target.length, 2);
        equal(target[0], grid.staticContent.find("tr")[0]);
        equal(target[1], grid.staticContent.find("tr")[1]);
    });

    test("relatedTarget returns empty object if called with related rows", function() {
        var grid = setup({
            selectable: "row",
            columns: [
                { field: "foo", static: true }
            ]
        });

        var item = grid.table.find("tr").eq(0).add(grid.staticContent.find("tr")[0]);
        var target = grid.selectable.relatedTarget(item);

        equal(target.length, 0);
    });

    test("continuousItems returns undefined if no static columns", function() {
        var grid = setup({
            selectable: "row"
        });

        var items = grid.selectable.options.continuousItems();

        ok(!items);
    });

    test("continuousItems returns collection of DOM elements when row selection", function() {
        var grid = setup({
            selectable: "row",
            columns: [
                { field: "foo", static: true },
                { field: "bar" }
            ],
            dataSource: {
                data: [
                    { foo: 1, bar: 2 }
                ]
            }
        });

        var items = grid.selectable.options.continuousItems();

        equal(items.length, 2);
        equal(items[0], grid.staticContent.find("tr")[0]);
        equal(items[1], grid.table.find("tr")[0]);
    });

    test("continuousItems returns collection of DOM elements when cell selection", function() {
        var grid = setup({
            selectable: "cell",
            columns: [
                { field: "foo", static: true },
                { field: "bar", static: true },
                { field: "baz" }
            ],
            dataSource: {
                data: [
                    { foo: 1, bar: 2, baz: 3 },
                    { foo: 21, bar: 22, baz: 23 }
                ]
            }
        });

        var items = grid.selectable.options.continuousItems();
        var staticCells = grid.staticContent.find("td");
        var nonStaticCells = grid.table.find("td");

        equal(items.length, 6);
        equal(items[0], staticCells[0]);
        equal(items[1], staticCells[1]);
        equal(items[2], nonStaticCells[0]);
        equal(items[3], staticCells[2]);
        equal(items[4], staticCells[3]);
        equal(items[5], nonStaticCells[1]);
    });
})();
            /*
            test("group footer row is skipped when up arrow is pressed", function() {
                var grid = setup({selectable: "cell", columns: [ { field: "foo", groupFooterTemplate: "foo" }] });
                grid.dataSource.group({ field: "foo" });

                grid.current(table.find("tbody tr:not(.k-grouping-row,.k-group-footer):eq(1)").find("td:not(.k-group-cell):first"));
                grid.table.focus().press(kendo.keys.UP);

                ok(table.find("tbody tr:not(.k-grouping-row,.k-group-footer):eq(0)").find("td:not(.k-group-cell):first").hasClass("k-state-focused"));
            });

            test("group footer row is skipped when down arrow is pressed", function() {
                var grid = setup({selectable: "cell", columns: [ { field: "foo", groupFooterTemplate: "foo" }] });
                grid.dataSource.group({ field: "foo" });

                grid.current(table.find("tbody tr:not(.k-grouping-row,.k-group-footer):eq(0)").find("td:not(.k-group-cell):first"));
                grid.table.focus().press(kendo.keys.DOWN);

                ok(table.find("tbody tr:not(.k-grouping-row,.k-group-footer):eq(1)").find("td:not(.k-group-cell):first").hasClass("k-state-focused"));
            });
            */
