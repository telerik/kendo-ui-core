(function() {
   var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource,
        Model = kendo.data.Model,
        dataSource;

    function setup(options) {
        options = $.extend({}, {
        editable: true,
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

        return table.kendoGrid(options).data("kendoGrid");
    }


    module("grid mobile deleting", {
        setup: function() {
            QUnit.config.reorder = false;
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);

            table = $(table);
        },
        teardown: function() {
            table.getKendoGrid().destroy();
            kendo.destroy(QUnit.fixture);
            table.closest(".k-grid").remove();
        }
    });

    test("actionsheet is created for delete confirm dialog", function() {
        var grid = setup();

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.length, 1);
        ok(actionsheet.data("kendoMobileActionSheet"));
    });

    test("actionsheet is destroyed on close", function() {
        var grid = setup();

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));
        actionsheet.find(".km-actionsheet-cancel>a").mouseup();

        equal($(kendo.roleSelector("actionsheet")).length, 0);
    });

    test("actionsheet is not created when editable is disabled", function() {
        var grid = setup({
            editable: false
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.length, 0);
    });

    test("actionsheet is not created when editable confirmation is disabled", function() {
        var grid = setup({
            editable: {
                confirmation: false
            }
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.length, 0);
        equal(grid.dataSource.view().length, 1);
    });

    test("click on cancel button doesn't remove the item", function() {
        var grid = setup();

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));
        actionsheet.find(".km-actionsheet-cancel>a").mouseup();

        equal(grid.dataSource.view().length, 2);
    });

    test("click on confirm button removes the item", function() {
        var grid = setup();

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));
        actionsheet.find("li>a:first").mouseup();

        equal(grid.dataSource.view().length, 1);
    });

    test("actionsheet title change", function() {
        var grid = setup({
            editable: {
                confirmation: "foo"
            }
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.find(".km-actionsheet-title").text(), "foo");
    });

    test("actionsheet cancel button default text", function() {
        var grid = setup({
            editable: true
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.find(".km-actionsheet-cancel").text(), "Cancel");
    });

    test("actionsheet delete button default text", function() {
        var grid = setup({
            editable: true
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.find("li>a:first").text(), "Delete");
    });

    test("actionsheet cancel button text change", function() {
        var grid = setup({
            editable: {
                confirmation: true,
                cancelDelete: "No"
            }
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.find(".km-actionsheet-cancel").text(), "No");
    });

    test("actionsheet confirm button text change", function() {
        var grid = setup({
            editable: {
                confirmation: true,
                confirmDelete: "Yes"
            }
        });

        grid.removeRow(grid.items().eq(0));

        var actionsheet = $(kendo.roleSelector("actionsheet"));

        equal(actionsheet.find("li>a:first").text(), "Yes");
    });
})();
