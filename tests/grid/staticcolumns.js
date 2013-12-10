(function() {
    var Grid = kendo.ui.Grid,
        div,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }];

    module("grid static columns", {
        setup: function() {
            div = $("<div></div>");
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

})();
