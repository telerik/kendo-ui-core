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
        var result = builder.process(data, { columns: [{ name: "name" }], rows: [ { name: "rows1", expand: true }] });

        equal(result.axes.columns.tuples.length, 1);
    });

    test("process root tuple member value are read from dimensions configuration", function() {
        var builder = new PivotCubeBuilder({
            dimensions: { name: { caption: "Name dimension" } }
        });

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [{ name: "name" }] });

        var member = result.axes.columns.tuples[0].members[0];
        equal(member.caption, "Name dimension");
        equal(member.name, "name");
        equal(member.hierarchy, "name");
        equal(member.levelName, "name");
        equal(member.levelNum, "0");
        equal(member.hasChildren, true);
        ok(!member.parentName);
    });

    test("process column root tuple members are correctly set", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [{ name: "name" }] });

        var member = result.axes.columns.tuples[0].members[0];
        equal(member.caption, "All");
        equal(member.name, "name");
        equal(member.hierarchy, "name");
        equal(member.levelName, "name");
        equal(member.levelNum, "0");
        equal(member.hasChildren, true);
        ok(!member.parentName);
    });

    test("process returns empty result if no columns and rows are set", function() {
        var builder = new PivotCubeBuilder();
        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [], rows: [] });

        equal(result.axes.columns.tuples.length, 0);
        equal(result.axes.rows.tuples.length, 0);
        equal(result.data.length, 0, "data does not exists");
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
        equal(result.axes.columns.tuples[0].members[0].caption, "All");
        equal(result.axes.columns.tuples[1].members[0].caption, "name1");
        equal(result.axes.columns.tuples[2].members[0].caption, "name2");

        var firstMember = result.axes.columns.tuples[1].members[0];

        equal(firstMember.caption, "name1");
        equal(firstMember.name, "name.name1");
        equal(firstMember.hierarchy, "name");
        equal(firstMember.levelName, "name.name1");
        equal(firstMember.levelNum, "1");
        equal(firstMember.hasChildren, false);
    });

    test("process rows tuples are equal to distinct values plus row settings", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];
        var result = builder.process(data, { columns: [{ name: "name" }], rows: [{ name: "lastName", expand: true }] });

        equal(result.axes.rows.tuples.length, 3);
    });

    test("process data contains correct number of items - expanded on both axes", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName", expand: true }] });

        equal(result.data.length, 5);
    });

    test("process data contains correct number of items - expanded on columns axis, no missing values", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName" }] });

        equal(result.data.length, 3);
    });

    test("process data contains correct number of items - expanded on rows axis, no missing values", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [{ name: "lastName", expand: true }] });

        equal(result.data.length, 2);
    });

    test("process data items are correctly formatted", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [{ name: "lastName", expand: true }] });

        equal(result.data[0].ordinal, 0);
        ok("value" in result.data[0]);
        ok("fmtValue" in result.data[0]);
        equal(result.data[1].ordinal, 1);
    });

    test("process data contains correct number of items - expanded on both axes, with missing value at the begining", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name2", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName", expand: true }] });

        equal(result.data.length, 5);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].ordinal, 5);
    });

    test("process data measure is calculated- expanded on columns axis, no missing values", function() {
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: { caption: "Measure 1", field: "value",  aggregate: function(data, state) { return state + data;  }}
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName" }], measures: ["Measure1"] });

        equal(result.data.length, 3);
        equal(result.data[0].value, 4);
        equal(result.data[1].value, 2);
        equal(result.data[2].value, 2);
    });

    test("process column root tuple member count is same as column descriptors", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];
        var result = builder.process(data, { columns: [{ name: "name" }, { name: "lastName" },] });

        equal(result.axes.columns.tuples[0].members.length, 2);
    });

    test("process column detail tuples member count is same as column descriptors", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];
        var result = builder.process(data, { columns: [{ name: "name", expand: true }, { name: "lastName" },] });

        equal(result.axes.columns.tuples[1].members.length, 2);
        equal(result.axes.columns.tuples[2].members.length, 2);
    });

})();
