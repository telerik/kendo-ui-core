(function() {
   var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource,
        Model = kendo.data.Model,
        dataSource;

    function setup(options) {
        options = $.extend({}, {
        editable: "popup",
        mobile: "phone",
        dataSource: new DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo"
                        }
                    }
                },
                data: [{ foo: "bar", name: "tom" }, { foo: "baz", name: "jerry" }]
            })
        }, options);
        dataSource = options.dataSource;

        var grid = table.kendoGrid(options).data("kendoGrid");
        grid._editAnimation = "";

        return grid;
    }

    QUnit.config.reorder = false;

    module("grid mobile editing", {
        setup: function() {
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);

            table = $(table);
        },
        teardown: function() {
            table.closest(".k-grid").remove();
            kendo.destroy(QUnit.fixture);
            $(".km-pane-wrapper").remove();
        }
    });

    test("edit container is wrapped in mobile view", function() {
        var grid = setup();

        grid.editRow(grid.items().eq(0));

        ok(grid.editView);
        ok($.contains(grid.editView.element[0], grid.editable.element[0]));
    });

    test("grid pane navigates to edit view", function() {
        var grid = setup();

        grid.editRow(grid.items().eq(0));

        strictEqual(grid.pane.view(), grid.editView);
        ok(grid.editView.element.is(":visible"));
    });

    test("grid destroy removes the edit view", function() {
        var grid = setup();
        var wasCalled = false;

        grid.editRow(grid.items().eq(0));

        grid.editView.purge = function() {
            wasCalled = true;
        };

        grid.destroy();

        ok(!grid.editView);
        ok(wasCalled);
    });

    test("click on cancel button navigates back to grid view", function() {
        var grid = setup();

        grid.editRow(grid.items().eq(0));
        grid.editView.element.find(".k-grid-cancel").click();

        ok(grid.view === grid.pane.view(), "Current view is not the one which wraps the Grid");
    });

    test("click on update button navigates back to grid view", function() {
        var grid = setup();

        grid.editRow(grid.items().eq(0));
        grid.editView.element.find(".k-grid-update").click();

        ok(grid.view === grid.pane.view(), "Current view is not the one which wraps the Grid");
    });
})();
