(function() {
    var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource,
        ns;

    module("grid aria", {
        setup: function() {
            ns = kendo.ns;
            kendo.ns = "kendo-";

            table = document.createElement("table");
            table.id = "test";

            QUnit.fixture[0].appendChild(table);
        },
        teardown: function() {
            $(table).closest(".k-grid").remove();
            kendo.ns = ns;
        }
    });

    test("Grid renders role=grid", function() {
        var table = $("<table />").kendoGrid({ dataSource: [] });

        equal(table.attr("role"), "grid");
    });

    test("Grid renders role=row to the tr", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal($(table).find("tr").attr("role"), "row");
    });

    test("Grid renders role=cell to the td", function() {
        var grid = new Grid(table, [ { foo: "foo", bar: "bar" } ]);

        equal($(table).find("td").attr("role"), "gridcell");
    });

    test("Grid renders role=columnheader to the th (scrollable: false)", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            scrollable: false
        });

        equal($(table).find("th").attr("role"), "columnheader");
    });

    test("Grid renders role=grid to the header table", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            scrollable: true
        });

        equal(grid.thead.parent().attr("role"), "grid");
    });

    test("Grid sets active element on focus", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            navigatable: true
        });

        grid.table.focus();
        var item = grid.current();

        equal(item.attr("id"), "test_active_cell");
        equal(grid.table.attr("aria-activedescendant"), "test_active_cell");
    });

    test("Grid sets active element on focus", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.thead.parent().focus();
        var item = grid.current();

        equal(item.attr("id"), "test_active_cell");
        equal(grid.thead.parent().attr("aria-activedescendant"), "test_active_cell");
    });

    test("Grid role is treegrid when has details", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });

        equal(grid.element.attr("role"), "treegrid");
    });

    test("Grid set expanded state on expand", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });

        grid.table.focus().find(".k-icon:first").click();

        equal(grid.current().attr("aria-expanded"), "true");
    });

    test("Grid set expanded state on collapse", function() {
        var grid = new Grid(table, {
            navigatable: true,
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"],
            detailTemplate: "details"
        });

        grid.table.focus().find(".k-icon:first").click().click();

        equal(grid.current().attr("aria-expanded"), "false");
    });

    test("Grid set expanded state on group expand", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.dataSource.group({ field: "foo" });
        var row = grid.table.find("tr:first");
        grid.collapseGroup(row);
        grid.expandGroup(row);

        equal(grid.table.find("tr td:first").attr("aria-expanded"), "true");
    });

    test("Grid set expanded state on group collapse", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.dataSource.group({ field: "foo" });
        var row = grid.table.find("tr:first");
        grid.collapseGroup(row);

        equal(grid.table.find("tr td:first").attr("aria-expanded"), "false");
    });

    test("Grid set expanded state is set for group cell", function() {
        var grid = new Grid(table, {
            dataSource: [ { foo: "foo", bar: "bar" } ],
            columns: [ "foo"]
        });

        grid.dataSource.group({ field: "foo" });

        equal(grid.table.find("tr td:first").attr("aria-expanded"), "true");
    });
})();
