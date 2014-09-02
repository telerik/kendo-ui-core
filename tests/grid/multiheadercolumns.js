(function() {
    var Grid = kendo.ui.Grid,
        table,
        DataSource = kendo.data.DataSource;

    module("grid multicolumnheaders", {
        setup: function() {
            kendo.ns = "kendo-";
            table = document.createElement("table");
            QUnit.fixture[0].appendChild(table);
        },
        teardown: function() {
            var component = $(table).data("kendoGrid");
            if (component) {
                component.destroy();
            }
            kendo.destroy(QUnit.fixture);
            kendo.ns = "";
        }
    });

    test("render correct number of rows and columns - single nested column", function() {

        var grid = new Grid(table, {
            columns: [{ title: "master", columns: [{ title: "child" }] }]
        });

        equal(grid.thead.find("tr").length, 2);
        equal(grid.thead.find("tr:first").find("th").length, 1);
        equal(grid.thead.find("tr:last").find("th").length, 1);
    });

    test("render correct number of rows and columns - two parent and one child columns", function() {
        var grid = new Grid(table, {
            columns: [{ title: "master", columns: [{ title: "child" }] }, { title: "master1" }]
        });

        var firstRow = grid.thead.find("tr:first");
        var lastRow = grid.thead.find("tr:last");

        equal(grid.thead.find("tr").length, 2);
        equal(firstRow.find("th").length, 2);
        equal(firstRow.find("th").first().text(), "master");
        equal(firstRow.find("th").last().text(), "master1");
        equal(lastRow.find("th").length, 1);
        equal(lastRow.find("th").last().text(), "child");
    });

    test("render rowspan to parent cell - two parent and one child columns", function() {
        var grid = new Grid(table, {
            columns: [{ title: "master", columns: [{ title: "child" }] }, { title: "master1" }]
        });

        var firstRow = grid.thead.find("tr:first");
        var lastRow = grid.thead.find("tr:last");

        ok(!firstRow.find("th").first().attr("rowSpan"), "first master column rowspan is not correct");
        equal(firstRow.find("th").last().attr("rowSpan"), 2);
        ok(!lastRow.find("th").first().attr("rowSpan"), "first child column rowspan is not correct");
    });

    test("does not render colspan for cells - two parent and one child columns", function() {
        var grid = new Grid(table, {
            columns: [{ title: "master", columns: [{ title: "child" }] }, { title: "master1" }]
        });

        var firstRow = grid.thead.find("tr:first");
        var lastRow = grid.thead.find("tr:last");

        ok(!firstRow.find("th").first().attr("colSpan"));
        ok(!firstRow.find("th").last().attr("colSpan"));
        ok(!lastRow.find("th").first().attr("colSpan"));
    });

    test("render rows and columns - two parents and second one with mutiple child columns", function() {
        var grid = new Grid(table, {
            columns: [{ title: "master" }, { title: "master1", columns: [{ title: "child" }, { title: "child1" }] }]
        });

        var firstRow = grid.thead.find("tr:first");
        var lastRow = grid.thead.find("tr:last");

        equal(grid.thead.find("tr").length, 2);
        equal(firstRow.find("th").length, 2);
        equal(firstRow.find("th").first().attr("rowSpan"), 2);
        equal(firstRow.find("th").first().text(), "master");
        equal(firstRow.find("th").last().attr("colSpan"), 2);
        equal(firstRow.find("th").last().text(), "master1");
        equal(lastRow.find("th").length, 2);
        equal(lastRow.find("th").first().text(), "child");
        equal(lastRow.find("th").last().text(), "child1");
    });

    test("render rows and columns - three parents, second one with 3 level columns, third one with two child columns", function() {
        var grid = new Grid(table, {
            columns: [
                { title: "master" },
                { title: "master1", columns: [{ title: "master1-child", columns: [{ title: "master1-child-child" }] }, { title: "master1-child1" }] },
                { title: "master2", columns: [{ title: "master2-child" }, { title: "master2-child1" }] }
            ]
        });

        var firstRow = grid.thead.find("tr:first");
        var secondRow = grid.thead.find("tr:eq(1)");
        var lastRow = grid.thead.find("tr:last");

        equal(grid.thead.find("tr").length, 3);
        equal(firstRow.find("th").length, 3);
        equal(firstRow.find("th").first().attr("rowSpan"), 3);
        equal(firstRow.find("th").first().text(), "master");

        equal(firstRow.find("th").eq(1).text(), "master1");
        equal(firstRow.find("th").eq(1).attr("colSpan"), 2);

        equal(firstRow.find("th").last().attr("colSpan"), 2);
        equal(firstRow.find("th").last().text(), "master2");

        equal(secondRow.find("th").length, 4);
        equal(secondRow.find("th").first().text(), "master1-child");
        ok(!secondRow.find("th").first().attr("colSpan"));
        equal(secondRow.find("th").eq(1).text(), "master1-child1");
        equal(secondRow.find("th").eq(1).attr("rowSpan"), 2);
        equal(secondRow.find("th").eq(2).text(), "master2-child");
        ok(!secondRow.find("th").eq(2).attr("colSpan"));
        equal(secondRow.find("th").eq(3).text(), "master2-child1");
        ok(!secondRow.find("th").eq(3).attr("colSpan"));

        equal(lastRow.find("th").length, 1);
        ok(!lastRow.find("th").first().attr("colSpan"));
        equal(lastRow.find("th").first().text(), "master1-child-child");
    });

})();
