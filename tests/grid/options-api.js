(function() {
   var Grid = kendo.ui.Grid,
        div,
        data = [{ foo: "foo", bar: "bar", baz: "baz" }],
        DataSource = kendo.data.DataSource;

    module("grid options api", {
        setup: function() {
            div = $("<div></div>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    function setup(options) {
        options = $.extend(true, {}, {
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

        var options = grid.setOptions({
            dataSource: {
                sort: {
                    field: "foo",
                    dir: "desc"
                }
            }
        });

        equal(grid.dataSource.sort().length, 1);
        equal(grid.dataSource.sort()[0].field, "foo");
        equal(grid.dataSource.sort()[0].dir, "desc");
    });

    test("preservs initial set events", function() {
        var invoked = false;
        var grid = setup({
            dataBound: function() { invoked = true; }
        });
        grid.setOptions({ sortable:true });

        grid.dataSource.read();
        equal(invoked, true);
    });

    test("preservs dynamically set events", function() {
        var invoked = false;
        var grid = setup({ });
        grid.bind("dataBound", function() { invoked = true; });

        grid.setOptions({ sortable:true });
        grid.dataSource.read();
        equal(invoked, true);
    });

})();
