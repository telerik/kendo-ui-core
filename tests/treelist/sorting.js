(function() {
    var TreeList = kendo.ui.TreeList;
    var dom;
    var instance;
    var fieldAttr = kendo.attr("field");

    module("TreeList initialization", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend({
            columns: [ "id", "parentId" ],
            sortable: true,
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("sortable adds data-field attribute to column header", function() {
        createTreeList();

        var header = instance.header.find("th");
        equal(header.eq(0).attr(fieldAttr), "id");
        equal(header.eq(1).attr(fieldAttr), "parentId");
    });

    test("instanciate ColumnSorter on column header", function() {
        createTreeList();

        var header = instance.header.find("th");
        ok(header.eq(0).data("kendoColumnSorter"));
        ok(header.eq(1).data("kendoColumnSorter"));
    });

    test("disabling sortable doesn't create ColumnSorter", function() {
        createTreeList({
            sortable: false
        });

        var header = instance.header.find("th");
        ok(!header.eq(0).data("kendoColumnSorter"));
        ok(!header.eq(1).data("kendoColumnSorter"));
    });

    test("disable sorting by column", function() {
        createTreeList({
            columns: [ "id", { field: "parentId", sortable: false } ]
        });

        var header = instance.header.find("th");
        ok(header.eq(0).data("kendoColumnSorter"));
        ok(!header.eq(1).data("kendoColumnSorter"));
    });

    test("do not initialize ColumnSorter for command columns", function() {
        createTreeList({
            columns: [ "id", "parentId", { command: [ "foo" ] } ]
        });

        var header = instance.header.find("th");
        ok(header.eq(0).data("kendoColumnSorter"));
        ok(header.eq(1).data("kendoColumnSorter"));
        ok(!header.eq(2).data("kendoColumnSorter"));
    });

    test("do not initialize ColumnSorter for column without field", function() {
        createTreeList({
            columns: [ "id", "parentId", { template: "foo" } ]
        });

        var header = instance.header.find("th");
        ok(header.eq(0).data("kendoColumnSorter"));
        ok(header.eq(1).data("kendoColumnSorter"));
        ok(!header.eq(2).data("kendoColumnSorter"));
    });

    test("setting global compare function", 1, function() {
        createTreeList({
            sortable: {
                compare: function() {
                    ok(true);
                }
            }
        });

        instance.header.find("th").first().click();
    });

    test("setting column compare function", 1, function() {
        createTreeList({
            columns:[ {
                field: "id",
                sortable: {
                    compare: function() {
                        ok(true);
                    }
                }
            }]
        });

        instance.header.find("th").first().click();
    });
})();
