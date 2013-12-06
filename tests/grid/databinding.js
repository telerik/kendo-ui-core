(function() {
   var Grid = kendo.ui.Grid,
        dom = $("<div />"),
        DataSource = kendo.data.DataSource;

    module("Grid databinding", {
        setup: function() {
            dom.appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("refresh creates table row for each item of the datasource view", function() {
        var grid = new Grid(dom, { dataSource: [1,2] });

        equal(grid.tbody.find(">tr").length, 2);
    });

    test("dataItem return data for given row", function() {
        var grid = new Grid(dom, { dataSource: [1,2] });

        var rows = grid.tbody.find("tr");
        equal(grid.dataItem(rows.first()), 1);
        equal(grid.dataItem(rows.eq(1)), 2);
    });

    test("dataItem return data for given row when grouping is applied", function() {
        var grid = new Grid(dom, {
            dataSource: {
                data: [ { foo: 1 }, { foo: 2 }],
                group: [ { field: "foo" } ]
        } });

        var rows = grid.tbody.find("tr:not(.k-grouping-row)");

        equal(grid.dataItem(rows.first()).foo, 1);
        equal(grid.dataItem(rows.eq(1)).foo, 2);
    });

    test("dataItem return data for given row with grouping and footers", function() {
        var grid = new Grid(dom, {
            columns: [
                { field: "foo", groupFooterTemplate: "baz" }
            ],
            dataSource: {
                data: [ { foo: 1 }, { foo: 2 }],
                group: [ { field: "foo" } ]
        } });

        var rows = grid.tbody.find("tr:not(.k-grouping-row, .k-group-footer)");

        equal(grid.dataItem(rows.first()).foo, 1);
        equal(grid.dataItem(rows.eq(1)).foo, 2);
    });

    test("grid row is refreshed on modelChange", function() {
         var grid = new Grid(dom, {
            dataSource: {
                data: [ { id: 1, foo: "foo" }, { id: 2, foo: "bar" }],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            foo: "foo"
                        }
                    }
                }
        } });

        grid.dataSource.get(1).set("foo", "baz");

        var row = grid.tbody.find("tr:first");

        equal(row.find("td").eq(1).text(), "baz");
    });

    test("grid alt row is refreshed on modelChange", function() {
         var grid = new Grid(dom, {
            dataSource: {
                data: [ { id: 1, foo: "foo" }, { id: 2, foo: "bar" }],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            foo: "foo"
                        }
                    }
                }
        } });

        grid.dataSource.get(2).set("foo", "baz");

        var row = grid.tbody.find("tr:nth(1)");

        equal(row.find("td").eq(1).text(), "baz");
        ok(row.hasClass("k-alt"));
    });

    test("dataItem return data for given row if model is changed", function() {
        var grid = new Grid(dom, {
            dataSource: {
                data: [ { id: 1, foo: "foo" }, { id: 2, foo: "bar" } ],
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            foo: "foo"
                        }
                    }
                }
        } });

        grid.dataSource.get(1).set("foo", "baz");

        var rows = grid.tbody.find("tr");
        equal(grid.dataItem(rows.first()).foo, "baz");
    });

    test("resetting dataSource detaches the previouse events", function() {
        var grid = new Grid(dom);

        var dataSource = grid.dataSource;

        grid._dataSource();

        grid.bind("dataBound", function() {
            ok(false, "Change event is not detached");
        });

        dataSource.read();
        expect(0);
    });

    test("resetting DataSource rebinds the widget", function() {
        var grid = new Grid(dom);

        grid.setDataSource(new kendo.data.DataSource({
            data:[{text: 1, value: 1}, {text:2, value:2}]
        }));

        equal(grid.table.find("tr").length, 2);
        equal(grid.columns.length, 2);
    });

    test("binding to null value does not display the string 'null'", function() {
        var grid = new Grid(dom, { dataSource: [ { foo: null} ], columns: ["foo"] });

        ok(grid.tbody.find("td").text() != "null");
    });

    test("binding to undefined value does not display the string 'undefined'", function() {
        var grid = new Grid(dom, { dataSource: [ { foo : undefined } ], columns: ["foo"], templateSettings: { useWithBlock: false } });

        ok(grid.tbody.find("td").text() != "undefined");
    });
})();
