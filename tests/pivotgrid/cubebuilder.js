(function() {
    var PivotCubeBuilder = kendo.data.PivotCubeBuilder;

    module("PivotCubeBuilder initialization", { });

    test("process returns structured result", function() {
        var builder = new PivotCubeBuilder();
        var result = builder.process([]);

        ok(result.axes, "axes does not exists");
        ok(result.axes.columns, "columns does not exists");
        ok(result.axes.rows, "rows does not exists");
        equal(result.data.length, 0, "data does not exists");
    });

    test("process column tuples are equal to number of column settings if not expanded", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [{ name: "name" }] });

        equal(result.axes.columns.tuples.length, 1);
    });

    test("process column tuples are equal to number of column settings plus distinct values if columns are expanded", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [{ name: "name", expand: true }] });

        equal(result.axes.columns.tuples.length, 3);
    });

    test("process column tuple members are populated", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [{ name: "name", expand: true }] });

        equal(result.axes.columns.tuples[0].members.length, 1);
        equal(result.axes.columns.tuples[1].members.length, 1);
        equal(result.axes.columns.tuples[2].members.length, 1);
        equal(result.axes.columns.tuples[0].members[0].caption, "ALL");
        equal(result.axes.columns.tuples[1].members[0].caption, "name1");
        equal(result.axes.columns.tuples[2].members[0].caption, "name2");
    });

    test("process rows tuples are equal to distinct values plus row settings", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];
        var result = builder.process(data, { columns: [{ name: "name" }], rows: [{ name: "lastName", expand: true }] });

        equal(result.axes.rows.tuples.length, 3);
    });

})();
