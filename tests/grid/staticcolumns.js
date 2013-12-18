(function() {
    var Grid = kendo.ui.Grid,
        div,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }];

    module("grid static columns", {
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

    test("header is prepend with static column table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 2);
        ok(header.find("table:first").parent().hasClass("k-grid-header-static"));
    });

    test("header is not prepend with static column table if no static column is set", function() {
        var grid = setup({
            columns: ["foo", "bar", "baz"]
        });

        var header = grid.element.children(".k-grid-header");
        equal(header.find("table").length, 1);
        ok(!header.find(".k-grid-header-static").length);
    });

    test("th elements are added to the static header table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-static th").length, 1);
        equal(grid.element.find(".k-grid-header-static th[data-field=foo]").length, 1);

        equal(grid.element.find(".k-grid-header-wrap th").length, 2);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=bar]").length);
        ok(grid.element.find(".k-grid-header-wrap th[data-field=baz]").length);
    });

    test("correct number of col elements are created", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-header-static col").length, 1);

        equal(grid.element.find(".k-grid-header-wrap col").length, 2);
    });

    test("content is prepend with static column table", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(grid.content.prev().hasClass("k-grid-content-static"));
    });

    test("correct number of col elements are created in the static content", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.element.find(".k-grid-content-static col").length, 1);

        equal(grid.element.find(".k-grid-content col").length, 2);
    });

    test("same number of rows is added to the content and the static content", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.content.find("tr").length, grid.staticContent.find("tr").length);
        equal(grid.staticContent.find("tr").length, 1);
    });

    test("width is set to static containers", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, width: 140 }, "bar", "baz"]
        });

        equal(grid.staticHeader.width(), grid.staticContent.width());
        equal(grid.staticHeader.width(), 140);
    });

    test("row height is in sync", function() {
        div.appendTo(QUnit.fixture);

        var grid = setup({
            columns: [{ template: "foo <br/> foo", static: true, width: 140, encode: false }, "bar", "baz"]
        });

        equal(grid.content.find("tr:first").height(), grid.staticContent.find("tr:first").height());
    });

    test("correct number of col elements are created in the static footer", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });
        equal(grid.element.find(".k-grid-footer-static col").length, 1);

        equal(grid.element.find(".k-grid-footer-wrap col").length, 2);
    });

    test("width is set to static footer", function() {
        var grid = setup({
            columns: [{ field: "foo", static: true, width: 140, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticFooter.width(), 140);
    });

    test("group cell is added to the static header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticHeader.find("col.k-group-col").length, 1);
        equal(grid.staticHeader.find("th.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static header", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(!grid.thead.parent().find("col.k-group-col").length);
        ok(!grid.thead.find("th.k-group-cell").length);
    });

    test("group cell is added to the static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        equal(grid.staticContent.find("col.k-group-col").length, 1);
        equal(grid.staticContent.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static content", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true }, "bar", "baz"]
        });

        ok(!grid.content.find("col.k-group-col").length);
        ok(!grid.content.find("td.k-group-cell").length);
    });

    test("group cell is added to the static footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        equal(grid.staticFooter.find("col.k-group-col").length, 1);
        equal(grid.staticFooter.find("td.k-group-cell").length, 1);
    });

    test("no group cell is added to the non static footer", function() {
        var grid = setup({
            dataSource: {
                group: "foo"
            },
            columns: [{ field: "foo", static: true, footerTemplate: "foo" }, "bar", "baz"]
        });

        var nonStaticFooter = grid.footer.find(".k-grid-footer-wrap");
        ok(!nonStaticFooter.find("col.k-group-col").length);
        ok(!nonStaticFooter.find("td.k-group-cell").length);
    });
})();
