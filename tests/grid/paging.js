(function() {
   var Grid = kendo.ui.Grid,
        DataSource = kendo.data.DataSource;

    module("grid paging", {
        setup: function() {
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function table() {
        return $(document.createElement("table")).appendTo(QUnit.fixture);
    }

    test("pageable creates pager", function() {
        var grid = new Grid(table(), { data:[], pageable: true });
        ok(grid.pager);
    });

    test("pager has the same datasource as the grid", function() {
        var grid = new Grid(table(), { data:[], pageable: true });
        ok(grid.pager.dataSource === grid.dataSource);
    });

    test("pageable passes the settings to the pager", function() {
        var grid = new Grid(table(), { data:[], pageable: { buttonCount: 42 } });

        equal(grid.pager.options.buttonCount, 42);
    });

    test("pageable uses the passed kendo.ui.Pager", function() {
        var dataSource = new DataSource({ data: [] }),
            pager = new kendo.ui.Pager($("<div/>").appendTo(QUnit.fixture), { dataSource: dataSource } ),
            grid = new Grid(table(), { data: dataSource, pageable: pager } );

        equal(grid.pager, pager);
    });

    test("pager wrapper is created", function() {
        var grid = new Grid(table(), { data:[], pageable: true });

        equal(grid.wrapper.find("div.k-grid-pager").length, 1);
    });

    test("pageSize of the dataSource is set from the pageable settings", function() {
        var grid = new Grid(table(), { data:[], pageable: { pageSize: 42 } });
        equal(grid.dataSource.pageSize(), 42);
    });

    test("resetting DataSource initialize the pager", function() {
        var grid = new Grid(table(), { pageable: true });

        grid.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}],
            pageSize: 1
        }));

        equal(grid.wrapper.find(".k-pager-wrap li").length, 2)
    });

    test("resetting DataSource does remove previous Pager instance", 2, function() {
        var grid = new Grid(table(), { pageable: true });

        var pager = grid.pager.bind("change", function() {
            ok(false, "Original Pager change event is raised");
        });

        grid.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}],
            pageSize: 1
        }));

        grid.pager.bind("change", function() {
            ok(true);
        });

        grid.wrapper.find(".k-pager-wrap li:last > a").click();

        notStrictEqual(pager, grid.pager);
    });

    test("resetting DataSource calls virtual scroller setDataSource", function() {
        var grid = new Grid(table(), { scrollable: { virtual: true } }),
            scrollable = grid.content.data("kendoVirtualScrollable");

        grid.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}],
            pageSize: 1
        }));

        deepEqual(grid.dataSource, scrollable.dataSource);
    });
})();
