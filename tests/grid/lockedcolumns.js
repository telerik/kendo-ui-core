(function() {
    var Grid = kendo.ui.Grid,
        div,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }];

    module("grid locked columns", {
        setup: function() {
            div = $("<div></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(div);
        }
    });

    function setup(options) {
        options = $.extend(true, {}, {
            dataSource: {
                data: data
            },
            scrollable: true,
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ]
        },
        options);

        return new Grid(div, options);
    }

    test("header is prepend with locked column table", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 2);
        ok(header.find("table:first").parent().hasClass("k-grid-header-locked"));
    });

    test("header is not prepend with locked column table if no locked column is set", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 1);
        ok(!header.find(".k-grid-header-locked").length);
    });

    test("th elements are added to the locked header table", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-locked th").length, 1);
        equal(grid.element.find(".k-grid-header-locked th[data-field=foo]").length, 1);

        equal(grid.element.find(".k-grid-header-wrap th").length, 2);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=bar]").length);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=baz]").length);
    });

    test("correct th elements are created when multiple locked columns", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", { field: "baz", locked: true }]
        });

        equal(grid.element.find(".k-grid-header-locked th").length, 2);
        equal(grid.element.find(".k-grid-header-locked th").eq(0).data("field"), "foo");
        equal(grid.element.find(".k-grid-header-locked th").eq(1).data("field"), "baz");

        equal(grid.element.find(".k-grid-header-wrap th").length, 1);
        equal(grid.element.find(".k-grid-header-wrap th").eq(0).data("field"), "bar");
    });

    test("correct number of col elements are created", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-locked col").length, 1);

        equal(grid.element.find(".k-grid-header-wrap col").length, 2);
    });

    test("correct header col elements are created when multiple locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true, width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", locked: true, width: 30 }
            ]
        });

        equal(grid.element.find(".k-grid-header-locked col").length, 2);
        equal(grid.element.find(".k-grid-header-locked col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-header-locked col")[1].style.width, "30px");

        equal(grid.element.find(".k-grid-header-wrap col").length, 1);
        equal(grid.element.find(".k-grid-header-wrap col")[0].style.width, "20px");
    });

    test("content is prepend with locked column table", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        ok(grid.content.prev().hasClass("k-grid-content-locked"));
    });

    test("correct number of col elements are created in the locked content", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-content-locked col").length, 1);

        equal(grid.element.find(".k-grid-content col").length, 2);
    });

    test("same number of rows is added to the content and the locked content", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.content.find("tr").length, grid.lockedContent.find("tr").length);
        equal(grid.lockedContent.find("tr").length, 1);
    });

    test("width is set to locked containers", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 140 }, "bar", "baz"]
        });

        equal(grid.lockedHeader.width(), grid.lockedContent.width());
        equal(grid.lockedHeader.width(), 140);
    });

    test("width is set to locked containers if width is set as string", function() {
        div.width(300);
        var grid = setup({
            columns: [{ field: "foo", locked: true, width: "240px" }, { field: "bar", width: 100 }, { field:"baz", width: 200 }]
        });

        equal(grid.lockedHeader.width(), grid.lockedContent.width());
        equal(grid.lockedHeader.width(), 240);
        equal(grid.content.width(), 60 - 2);
    });

    test("width is set to locked containers with grouping applied", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 140 }, "bar", "baz"]
        });

        grid.dataSource.group({ field: "foo" });

        equal(grid.lockedHeader.width(), grid.lockedContent.width());
        equal(grid.lockedHeader.width(), 140 + 27);
    });

    test("width is set to locked containers with multiple grouping applied", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 140 }, "bar", "baz"]
        });

        grid.dataSource.group([{ field: "foo" }, { field: "bar" }]);

        equal(grid.lockedHeader.width(), grid.lockedContent.width());
        equal(grid.lockedHeader.width(), 140 + 54);
    });
    test("width is set to non locked containers", function() {
        div.width(300);

        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 150, footerTemplate: "foo" }, { width: 100, field: "bar"}, { width: 100, field: "baz" }]
        });

        var headerWidth = grid.wrapper.find(".k-grid-header-wrap").width();
        var footerWidth = grid.wrapper.find(".k-grid-footer-wrap").width();
        equal(headerWidth, grid.content.width() - kendo.support.scrollbar());
        equal(headerWidth, footerWidth);
        equal(headerWidth, 150 - kendo.support.scrollbar() - 2);
    });

    test("width is set to locked containers with virtualization enabled", function() {
        var grid = setup({
            scrollable: {
                virtual: true
            },
            columns: [{ field: "foo", locked: true, width: 140 }, "bar", "baz"]
        });

        equal(grid.lockedHeader.width(), grid.lockedContent.width());
        equal(grid.lockedHeader.width(), 140);
    });

    test("width is set to non locked containers with virtualization enabled", function() {
        div.width(300);

        var grid = setup({
            scrollable: {
                virtual: true
            },
            columns: [{ field: "foo", locked: true, width: 150, footerTemplate: "foo" }, { width: 100, field: "bar"}, { width: 100, field: "baz" }]
        });

        var headerWidth = grid.wrapper.find(".k-grid-header-wrap").width();
        var footerWidth = grid.wrapper.find(".k-grid-footer-wrap").width();

        equal(headerWidth, grid.content.width() - 1);
        equal(headerWidth, footerWidth);
    });


    test("row height is in sync", function() {
        div.appendTo(QUnit.fixture);

        var grid = setup({
            columns: [{ template: "foo <br/> foo", locked: true, width: 140, encode: false }, "bar", "baz"]
        });

        equal(grid.content.find("tr:first").height(), grid.lockedContent.find("tr:first").height());
    });

    test("header row height is in sync - locked column is bigger", function() {
        div.appendTo(QUnit.fixture);

        var grid = setup({
            columns: [{ title: "foo <br/> foo", locked: true, width: 140, encode: false }, "bar", "baz"]
        });

        equal(grid.thead.find("tr:first").height(), grid.lockedHeader.find("tr:first").height());
    });

    test("header row height is in sync - non locked column is bigger", function() {
        div.appendTo(QUnit.fixture);

        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 140, encode: false }, { title: "bar <br/> bar", field: "bar" }, "baz"]
        });

        equal(grid.thead.find("tr:first").height(), grid.lockedHeader.find("tr:first").height());
    });


    test("correct content col elements are created when multiple locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true, width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", locked: true, width: 30 }
            ]
        });

        equal(grid.element.find(".k-grid-content-locked col").length, 2);
        equal(grid.element.find(".k-grid-content-locked col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-content-locked col")[1].style.width, "30px");

        equal(grid.element.find(".k-grid-content col").length, 1);
        equal(grid.element.find(".k-grid-content col")[0].style.width, "20px");
    });

    test("correct number of col elements are created in the locked footer", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });
        equal(grid.element.find(".k-grid-footer-locked col").length, 1);

        equal(grid.element.find(".k-grid-footer-wrap col").length, 2);
    });

    test("col elements are position correctly in the locked footer with grouping", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        grid.dataSource.group({ field: "foo" });

        ok(grid.element.find(".k-grid-footer-locked col").first().hasClass("k-group-col"));
        ok(grid.element.find(".k-grid-footer-locked td").first().hasClass("k-group-cell"));
        equal(grid.element.find(".k-grid-footer-locked td").eq(1).text(), "foo");
    });

    test("correct col elements are created in the locked footer when multiple locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true, footerTemplate: "foo", width: 10 },
                "bar",
                { field: "baz", locked: true, footerTemplate: "baz", width: 20 }
            ]
        });

        equal(grid.element.find(".k-grid-footer-locked col").length, 2);
        equal(grid.element.find(".k-grid-footer-locked col")[0].style.width, "10px");
        equal(grid.element.find(".k-grid-footer-locked col")[1].style.width, "20px");

        equal(grid.element.find(".k-grid-footer-wrap col").length, 1);
    });

    test("correct td elements are created in the locked footer when multiple locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true, footerTemplate: "foo", width: 10 },
                { field: "bar", footerTemplate: "bar" },
                { field: "baz", locked: true, footerTemplate: "baz", width: 20 }
            ]
        });

        equal(grid.element.find(".k-grid-footer-locked td").length, 2);
        equal(grid.element.find(".k-grid-footer-locked td").eq(0).text(), "foo");
        equal(grid.element.find(".k-grid-footer-locked td").eq(1).text(), "baz");

        equal(grid.element.find(".k-grid-footer-wrap td").length, 1);
        equal(grid.element.find(".k-grid-footer-wrap td").eq(0).text(), "bar");
    });

    test("width is set to locked footer", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true, width: 140, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedFooter.width(), 140);
    });

    test("group cell is added to the locked header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedHeader.find("col.k-group-col").length, 1);
        equal(grid.lockedHeader.find("th.k-group-cell").length, 1);
    });

    test("group row in locked content has correct colspan", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedTable.find(".k-grouping-row > td:first").attr("colspan"), 2); // groupcell + locked column
    });

    test("group row in non locked content has correct colspan", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.table.find(".k-grouping-row > td:first").attr("colspan"), 2); // two non locked columns
    });

    test("group row in non locked content has correct colspan with multiple groups", function() {
        var grid = setup({
            dataSource: {
                group: [ {field: "foo" }, { field: "bar" }]
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.table.find(".k-grouping-row:first > td:first").attr("colspan"), 2); // two non locked columns
        equal(grid.table.find(".k-grouping-row:eq(1) > td:first").attr("colspan"), 2); // two non locked columns
    });

    test("group row in locked content has correct colspan with multiple groups", function() {
        var grid = setup({
            dataSource: {
                group: [ {field: "foo" }, { field: "bar" }]
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedTable.find(".k-grouping-row:first > td:first").attr("colspan"), 3); // two groupcells + locked column
        equal(grid.lockedTable.find(".k-grouping-row:eq(1) > td:eq(1)").attr("colspan"), 2); // single groupcell + locked column
    });

    test("no group cell is added to the non locked header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        ok(!grid.thead.parent().find("col.k-group-col").length);
        ok(!grid.thead.find("th.k-group-cell").length);
    });

    test("group cell is added to the locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.lockedContent.find("col.k-group-col").length, 1);
        equal(grid.lockedContent.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        ok(!grid.content.find("col.k-group-col").length);
        ok(!grid.content.find("td.k-group-cell").length);
    });

    test("group cell is added to the locked footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedFooter.find("col.k-group-col").length, 1);
        equal(grid.lockedFooter.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non locked footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        var nonLockedFooter = grid.footer.find(".k-grid-footer-wrap");
        ok(!nonLockedFooter.find("col.k-group-col").length);
        ok(!nonLockedFooter.find("td.k-group-cell").length);
    });

    test("collapse group with row from locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.collapseGroup(grid.lockedContent.find(".k-grouping-row:first"));

        equal(grid.lockedContent.find(".k-grouping-row:first a.k-i-expand").length, 1);
        ok(!grid.lockedContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(!grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("collapse group with row from non locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.collapseGroup(grid.content.find(".k-grouping-row:first"));

        equal(grid.lockedContent.find(".k-grouping-row:first a.k-i-expand").length, 1);
        ok(!grid.lockedContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(!grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("expand group with row from locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var group = grid.lockedContent.find(".k-grouping-row:first");
        grid.collapseGroup(group);
        grid.expandGroup(group);

        equal(grid.lockedContent.find(".k-grouping-row:first a.k-i-collapse").length, 1);
        ok(grid.lockedContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("expand group with row from locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var group = grid.content.find(".k-grouping-row:first");
        grid.collapseGroup(group);
        grid.expandGroup(group);

        equal(grid.lockedContent.find(".k-grouping-row:first a.k-i-collapse").length, 1);
        ok(grid.lockedContent.find(".k-grouping-row:first").next().is(":visible"));
        ok(grid.content.find(".k-grouping-row:first").next().is(":visible"));
    });

    test("group footer is added to the locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedContent.find(".k-group-footer").length, 1);
        equal(grid.content.find(".k-group-footer").length, 1);
    });

    test("group cell is added to the group footers in the locked content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.lockedContent.find("tr.k-group-footer .k-group-cell").length, 1);
    });

    test("group cell is not added to the group footers in the content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", locked: true, groupFooterTemplate: "foo" }, "bar", "baz"]
        });

        ok(!grid.content.find("tr.k-group-footer .k-group-cell").length);
    });

    test("locked columns are first in the columns collection", function() {
        var grid = setup({
            columns: ["bar", { field: "moo", locked: true }, "baz", { field: "foo", locked: true }]
        });

        ok(grid.columns[0].locked);
        equal(grid.columns[0].field, "moo");

        ok(grid.columns[1].locked);
        equal(grid.columns[1].field, "foo");

        equal(grid.columns[2].field, "bar");
        equal(grid.columns[3].field, "baz");
    });

    test("cellIndex returns correct index of locked column", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var td = grid.lockedContent.find("tr:first td");
        var index = grid.cellIndex(td);
        equal(index, 0);
    });

    test("cellIndex returns correct index of non locked column", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var td = grid.tbody.find("tr:first td");
        var index = grid.cellIndex(td);
        equal(index, 1);
    });

    test("relatedRow returns same row when no locked columns", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var row = grid.tbody.find("tr:first");
        var related = grid._relatedRow(row);

        equal(related[0], row[0]);
    });

    test("relatedRow accepts DOM element", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var row = grid.tbody.find("tr")[0];
        var related = grid._relatedRow(row);

        equal(related[0], row);
    });

    test("relatedRow returns related row in the non-locked table", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var row = grid.tbody.find("tr:first");
        var related = grid._relatedRow(grid.lockedTable.find("tr").first());

        equal(related[0], row[0]);
    });

    test("relatedRow returns related row in the locked table", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var row = grid.lockedTable.find("tr:first");
        var related = grid._relatedRow(grid.table.find("tr").first());

        equal(related[0], row[0]);
    });

    test("grid is resized on window resize", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        var resize = stub(grid, "resize");

        $(window).trigger("resize");

        equal(resize.calls("resize"),1);
    });

    test("correct number of cells are added to the row if locked columns as set and grid is not scrollable", function() {
        var grid = setup({
            scrollable: false,
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        equal(grid.tbody.find("tr:first td").length, 3);
    });

    test("locked containers are not create if grid is not scrollable", function() {
        var grid = setup({
            scrollable: false,
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        ok(!grid.lockedHeader);
        ok(!grid.lockedContent);
        ok(!grid.lockedFooter);
    });

    test("locked row templates are not created if grid is not scrollable", function() {
        var grid = setup({
            scrollable: false,
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        ok(!grid.lockedRowTemplate);
        ok(!grid.lockedAltRowTemplate);
    });

    test("setDataSource re-creates the locked header", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.setDataSource(new kendo.data.DataSource({
            data: data
        }));

        equal(grid.lockedHeader.find("col").length, 1);
        equal(grid.lockedHeader.find("th").text(), "foo");
    });

    test("setDataSource re-creates the non locked header", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.setDataSource(new kendo.data.DataSource({
            data: data
        }));

        equal(grid.thead.find("th").length, 2);
        equal(grid.thead.find("th:first").text(), "bar");
        equal(grid.thead.find("th:last").text(), "baz");
    });

    test("setDataSource locked container are not duplicated", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.setDataSource(new kendo.data.DataSource({
            data: data
        }));

        equal(grid.wrapper.find(".k-grid-header-locked").length, 1);
        equal(grid.wrapper.find(".k-grid-content-locked").length, 1);
    });

    test("lock column by field", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.lockColumn("bar");

        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
    });

    test("lock column by index", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.lockColumn(1);

        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
    });

    test("lock column is ignored if no column is found", function() {
        var grid = setup({
            columns: [{ field: "foo", locked: true }, "bar", "baz"]
        });

        grid.lockColumn("bax");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, undefined);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("lock column is ignored if the column already locked", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                "baz"
            ]
        });

        grid.lockColumn("bar");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("lock column is ignored if only one non-locked", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                "baz"
            ]
        });

        grid.lockColumn("baz");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("unlock column by field", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                "baz"
            ]
        });

        grid.unlockColumn("bar");

        equal(grid.columns[1].locked, false);
        equal(grid.columns[1].field, "bar");
    });

    test("unlock column by index", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                "baz"
            ]
        });

        grid.unlockColumn(1);

        equal(grid.columns[1].locked, false);
        equal(grid.columns[1].field, "bar");
    });

    test("unlock column is ignored if no column is found", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true },
                "baz"
            ]
        });

        grid.unlockColumn("bax");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("unlock column is ignored if the column already non-locked", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar" },
                "baz"
            ]
        });

        grid.unlockColumn("bar");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, undefined);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("unlock column is ignored if only one locked", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar" },
                "baz"
            ]
        });

        grid.unlockColumn("foo");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");
        equal(grid.columns[1].locked, undefined);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("lock column with hidden locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true, hidden: true },
                "baz",
                "bax"
            ]
        });

        grid.lockColumn("baz");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");

        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "baz");

        equal(grid.columns[2].locked, true);
        equal(grid.columns[2].field, "bar");
        equal(grid.columns[2].hidden, true);

        equal(grid.columns[3].locked, undefined);
        equal(grid.columns[3].field, "bax");
    });

    test("unlock column with hidden locked columns", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", locked: true, hidden: true },
                { field: "baz", locked: true },
                "bax"
            ]
        });

        grid.unlockColumn("baz");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");

        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[1].hidden, true);

        equal(grid.columns[2].locked, false);
        equal(grid.columns[2].field, "baz");

        equal(grid.columns[3].locked, undefined);
        equal(grid.columns[3].field, "bax");
    });

    test("lock hidden column", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", hidden: true },
                "baz"
            ]
        });

        grid.lockColumn("bar");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");

        equal(grid.columns[1].locked, undefined);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[1].hidden, true);

        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });

    test("unlock hidden column", function() {
        var grid = setup({
            columns: [
                { field: "foo", locked: true },
                { field: "bar", hidden: true, locked: true },
                "baz"
            ]
        });

        grid.unlockColumn("bar");

        equal(grid.columns[0].locked, true);
        equal(grid.columns[0].field, "foo");

        equal(grid.columns[1].locked, true);
        equal(grid.columns[1].field, "bar");
        equal(grid.columns[1].hidden, true);

        equal(grid.columns[2].locked, undefined);
        equal(grid.columns[2].field, "baz");
    });
})();
