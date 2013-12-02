(function() {
   var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource,
        Model = kendo.data.Model,
        dataSource;

    function setup(options) {
        options = $.extend({}, {
        editable: true,
        dataSource: new DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: {
                                field: "foo",
                                validation: {
                                    required: true
                                }
                            },
                            name: "name"
                        }
                    }
                },
                data: [{ foo: "bar", name: "tom" }, { foo: "baz", name: "jerry" }]
            })
        }, options);
        dataSource = options.dataSource;

        return table.kendoGrid(options).data("kendoGrid");
    }

    module("grid inserting", {
        setup: function() {
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);

            table = $(table);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            table.closest(".k-grid").remove();
        }
    });

    test("addRow displays inserted item", function() {
        var grid = setup();

        grid.addRow();

        ok(grid.table.find("tr>td:first").data("kendoEditable"));
    });

    test("addRow does not shows insert item if validation fails", function() {
        var called = 0,
        grid = setup();
        dataSource.bind("change", function() { called++; });

        grid.addRow();
        grid.addRow();

        equal(called, 1);
    });

})();
