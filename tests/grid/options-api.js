(function() {
   var Grid = kendo.ui.Grid,
        div,
        invoked,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }],
        DataSource = kendo.data.DataSource;

    module("grid options api", {
        setup: function() {
            invoked = 0;
            div = $("<div></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setup(options) {
        options = kendo.deepExtend({}, {
            dataSource: {
                data: data
            },
            columns: [
                { field: "foo", width: 10 },
                { field: "bar", width: 20 },
                { field: "baz", width: 30 }
            ]
        },
        options);

        return new Grid(div, options);
    }

    test("getOptions retrieves the columns", function() {
       var options = setup().getOptions();
       equal(options.columns.length, 3);
       equal(options.columns[0].field, "foo");
       equal(options.columns[2].width, 30);
    });

    test("getOptions retrieves the filterable options", function() {
       var options = setup({
           filterable: {
               mode: "row"
           }
       }).getOptions();
       equal(options.filterable.mode, "row");
    });

    test("getOptions retrieves the groupable options", function() {
       var options = setup({
           groupable: {
               messages: {
                   empty: "foo"
               }
           }
       }).getOptions();
       equal(options.groupable.messages.empty, "foo");
    });

    test("getOptions retrieves the AutoBind option", function() {
       var options = setup({
           autoBind: false
       }).getOptions();
       equal(options.autoBind, false);
    });

    test("getOptions retrieves the rowTemplate/altRowTemplate", function() {
       var options = setup({
           rowTemplate: "foo",
           altRowTemplate: "bar"
       }).getOptions();
       equal(options.rowTemplate, "foo");
       equal(options.altRowTemplate, "bar");
    });

    test("getOptions retrieves the mobile option", function() {
       var options = setup({
           mobile: true
       }).getOptions();
       equal(options.mobile, true);
    });

    test("getOptions retrieves the dynamically set group option", function() {
        var grid = setup({ });
        grid.dataSource.group({ field: "foo" });


        var options = grid.getOptions();
        equal(options.dataSource.group.length, 1);
        equal(options.dataSource.group[0].field, "foo");
    });

    test("getOptions retrieves the initial set sort option", function() {
        var grid = setup({
            dataSource: {
                sort: { field: "foo", dir: "desc" }
            }
        });

        var options = grid.getOptions();
        equal(options.dataSource.sort.length, 1);
        equal(options.dataSource.sort[0].field, "foo");
        equal(options.dataSource.sort[0].dir, "desc");
    });

    test("getOptions retrieves the dynamically set sort option", function() {
        var grid = setup({ });
        grid.dataSource.sort({ field: "foo", dir: "desc" });


        var options = grid.getOptions();
        equal(options.dataSource.sort.length, 1);
        equal(options.dataSource.sort[0].field, "foo");
        equal(options.dataSource.sort[0].dir, "desc");
    });

    test("getOptions retrieves the dynamically set sort option when there is initial sort", function() {
        var grid = setup({
            dataSource: {
                sort: {
                    field: "foo",
                    dir: "asc"
                }
            }
        });
        grid.dataSource.sort({ field: "foo", dir: "desc" });

        var options = grid.getOptions();
        equal(options.dataSource.sort.length, 1);
        equal(options.dataSource.sort[0].field, "foo");
        equal(options.dataSource.sort[0].dir, "desc");
    });

    test("getOptions retrieves the columns", function() {
        var grid = setup();
        equal(grid.columns.length, 3);
        grid.setOptions({columns:[{field:"bar"}]});
        equal(grid.columns.length, 1);
        equal(grid.columns[0].field, "bar");
    });

    test("setOptions does not create new instance of the dataSource when no options for dataSource are passed", function() {
        var grid = setup({ });

        var ds = grid.dataSource;
        grid.setOptions({ editable: true });
        ok(ds === grid.dataSource);
    });

    test("setOptions creates new instance of the dataSource when options for dataSource exist", function() {
        var grid = setup({ });

        var ds = grid.dataSource;
        grid.setOptions({ editable: true, dataSource: { batch: true } });
        ok(ds !== grid.dataSource);
    });

    test("setOptions sets the new Options and persists the current", function() {
        var grid = setup({
            dataSource: {
                sort: [{
                    field: "foo",
                    dir: "asc"
                }, {
                    field: "bar",
                    dir: "asc"
                }]
            }
        });

        grid.setOptions({
            dataSource: {
                sort: [{
                    field: "foo",
                    dir: "desc"
                }]
            }
        });

        equal(grid.dataSource.sort().length, 1);
        equal(grid.dataSource.sort()[0].field, "foo");
        equal(grid.dataSource.sort()[0].dir, "desc");
    });

    test("preservs initial set events", function() {
        var grid = setup({
            dataBound: function() { invoked++; }
        });
        invoked = 0;
        grid.setOptions({ sortable: true });

        equal(invoked, 1);
    });

    test("preservs dynamically set events", function() {
        var grid = setup({ });
        grid.bind("dataBound", function() { invoked++; });

        invoked = 0;
        grid.setOptions({ sortable: true });
        equal(invoked, 1);
    });

    test("preservs initial and dynamically set events", function() {
        var grid = setup({
            dataBound: function() { invoked++; }
        });
        grid.bind("dataBound", function() { invoked++; });
        invoked = 0;
        grid.setOptions({ sortable: true });

        equal(invoked, 2);
    });

    test("detaches events used internally by columnMenu", function() {
        var grid = setup({
            columns: ["foo"],
            columnMenu: true
        });
        grid.thead.find(".k-header-column-menu").click();
        equal(grid._events.columnHide.length, 1);
        grid.setOptions({ sortable: true });

        console.log(kendo.stringify(grid._events));
        equal(grid._events.columnHide.length, 0);
    });

    test("preserves the structure when using div", function() {
        div.before("<div id='before' />");
        div.after("<div id='after' />");
        var grid = setup();
        ok(div.prev()[0] === $("#before")[0]);
        ok(div.next()[0] === $("#after")[0]);
        grid.setOptions({scrollable: true});
        ok(div.prev()[0] === $("#before")[0]);
        ok(div.next()[0] === $("#after")[0]);
    });

    test("preserves the structure when using table for initialization", function() {
        var table = $("<table id='table' />").appendTo(QUnit.fixture);
        table.before("<div id='before' />");
        table.after("<div id='after' />");

        grid = table.kendoGrid({ scrollable: true }).data("kendoGrid");
        ok(table.parent().parent().prev()[0] === $("#before")[0]);
        ok(table.parent().parent().next()[0] === $("#after")[0]);
        grid.setOptions({ scrollable: false });
        ok(table.parent().prev()[0] === $("#before")[0]);
        ok(table.parent().next()[0] === $("#after")[0]);
        ok(grid.wrapper.next()[0] === $("#after")[0]);
        ok(grid.wrapper.prev()[0] === $("#before")[0]);
    });

    test("even when new DS instance is passed it gets options from it and preserves older one", function() {

        var grid = setup({
            dataSource: {
                pageSize: 22
            }
        });

        grid.setOptions({
            dataSource: new kendo.data.DataSource({
                data: [{ foo: "faz" }],
                pageSize: 33
            })
        });

        equal(grid.dataSource.pageSize(), 33);
        equal(grid.dataSource.at(0).foo, "faz")
    });

})();
