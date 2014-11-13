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

        ok(result.axes.columns);
        ok(result.axes.rows);
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
        equal(firstMember.name, "name&name1");
        equal(firstMember.hierarchy, "name");
        equal(firstMember.levelName, "name&name1");
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

        equal(result.data.length, 9);
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

        equal(result.data.length, 3);
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

        equal(result.data.length, 9);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].ordinal, 4);
        equal(result.data[5].ordinal, 5);
        equal(result.data[6].ordinal, 6);
        equal(result.data[7].ordinal, 7);
        equal(result.data[8].ordinal, 8);
    });

    test("process data measure is calculated- expanded on columns axis, no missing values", function() {
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: { caption: "Measure 1", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName" }], measures: [{ name: "Measure1" }] });

        equal(result.data.length, 3);
        equal(result.data[0].value, 4);
        equal(result.data[1].value, 2);
        equal(result.data[2].value, 2);
    });

    test("process data measure state is an object", function() {
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: {
                    caption: "Measure 1",
                    field: "value",
                    aggregate: function(data, state) {
                       ok($.isPlainObject(state))
                       equal(state.accumulator, undefined);

                       return data;
                   }
                }
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [], measures: [{ name: "Measure1" }] });
    });

    test("process data measure aggregates value in state.accumulator field", function() {
        var aggregatorState;
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: {
                    caption: "Measure 1",
                    field: "value",
                    aggregate: function(data, state) {
                        aggregatorState = state;
                        state.accumulator = state.accumulator || 0;
                        return data + state.accumulator;
                   }
                }
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];
        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName" }], measures: [{ name: "Measure1" }] });

        equal(aggregatorState.accumulator, 4);
    });

    test("process data measure passes aggregator context", function() {
        var aggregatorContexts = [];
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: {
                    caption: "Measure 1",
                    field: "value",
                    aggregate: function(data, state, context) {
                       aggregatorContexts.push(context);
                       return data;
                   }
                }
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 } ];
        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [], measures: [{ name: "Measure1" }] });

        equal(aggregatorContexts[0].dataItem, data[0]);
        equal(aggregatorContexts[0].index, 0);

        equal(aggregatorContexts[1].dataItem, data[1]);
        equal(aggregatorContexts[1].index, 1);
    });

    test("process data measure calls result function at the and", function() {
        var aggregatorContexts = [];
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: {
                    caption: "Measure 1",
                    field: "value",
                    aggregate: function(value, state, context) {
                        state.accumulator = state.accumulator || 0;
                        return value + state.accumulator;
                    },
                    result: function(state) {
                        equal(state.accumulator, 3);
                    }
                }
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 } ];

        builder.process(data, { columns: [{ name: "name", expand: false }], rows: [], measures: [{ name: "Measure1" }] });
    });

    test("process data measure uses result function value", function() {
        var aggregatorContexts = [];
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: {
                    caption: "Measure 1",
                    field: "value",
                    aggregate: function(value, state, context) {
                        state.accumulator = state.accumulator || 0;
                        return value + state.accumulator;
                    },
                    result: function(state) {
                        return 10;
                    }
                }
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [], measures: [{ name: "Measure1" }] });

        equal(result.data[0].value, 10);
    });

    test("process data measure format is applied", function() {
        var builder = new PivotCubeBuilder({
            measures: {
                Measure1: { caption: "Measure 1", field: "value", format: "foo {0}",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            }
        });

        var data = [{ name: "name1", lastName: "LastName1", value: 1 }, { name: "name2", lastName: "LastName1", value: 2 }, { name: "name1", lastName: "LastName2", value: 1 } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }], rows: [{ name: "lastName" }], measures: [{ name: "Measure1" }] });

        equal(result.data.length, 3);
        equal(result.data[0].fmtValue, "foo 4");
        equal(result.data[1].fmtValue, "foo 2");
        equal(result.data[2].fmtValue, "foo 2");
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

    test("process data contains correct number of items - multiple members on column axis and no rows", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name2", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: true }, { name: "lastName", expand: true }] });

        equal(result.data.length, 5);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].ordinal, 4);
    });

    test("process data contains correct number of items - multiple members on row axis", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1", lastName: "LastName1", age: 42 }, { name: "name2", lastName: "LastName1", age: 42  }, { name: "name2", lastName: "LastName2", age: 52  } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [{ name: "lastName", expand: true },{ name: "age", expand: true }] });

        equal(result.data.length, 5);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].ordinal, 4);
    });

    test("process data contains correct number of items - multiple members on columns axis and expanded row axis", function() {
        var builder = new PivotCubeBuilder({
           dimensions: {
               FirstName: { caption: "All First Names" },
               LastName: { caption: "All Last Names" },
               Age: { caption: "Age" }
           },
           measures: {
               "Count": { caption: "Measure 1", field: "Age",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1; } }
           }
        });
        var data = [{ FirstName: "Name1", LastName: "LastName1", Age: 42 }, { FirstName: "Name2", LastName: "LastName1", Age: 42  }, { FirstName: "Name2", LastName: "LastName2", Age: 52  } ];

        var result = builder.process(data, {
            columns: [{ name: "FirstName", expand: true },{ name: "LastName", expand: true }],
            rows: [{ name: "Age", expand: true }],
            measures: [{ name: "Count" }]
        });

        equal(result.data.length, 15);
        equal(result.data[0].ordinal, 0, "ordinal 0");
        equal(result.data[0].value, 3, "ordinal 0");
        equal(result.data[1].ordinal, 1, "ordinal 1");
        equal(result.data[1].value, 1, "ordinal 1");
        equal(result.data[2].ordinal, 2, "ordinal 2");
        equal(result.data[2].value, 2, "ordinal 2");
        equal(result.data[3].ordinal, 3, "ordinal 3");
        equal(result.data[3].value, 2, "ordinal 3");
        equal(result.data[4].ordinal, 4, "ordinal 4");
        equal(result.data[4].value, 1, "ordinal 4");
        equal(result.data[5].ordinal, 5, "ordinal 5");
        equal(result.data[5].value, 2, "ordinal 5");
        equal(result.data[6].ordinal, 6, "ordinal 6");
        equal(result.data[6].value, 1, "ordinal 6");
        equal(result.data[7].ordinal, 7, "ordinal 7");
        equal(result.data[7].value, 2, "ordinal 7");
        equal(result.data[8].ordinal, 8, "ordinal 8");
        equal(result.data[8].value, 1, "ordinal 8");
        equal(result.data[9].ordinal, 9, "ordinal 9");
        equal(result.data[9].value, "", "ordinal 9");
        equal(result.data[10].ordinal, 10, "ordinal 10");
        equal(result.data[10].value, 1, "ordinal 10");
        equal(result.data[11].ordinal, 11, "ordinal 11");
        equal(result.data[11].value, "", "ordinal 11");
        equal(result.data[12].ordinal, 12, "ordinal 12");
        equal(result.data[12].value, "", "ordinal 12");
        equal(result.data[13].ordinal, 13, "ordinal 13");
        equal(result.data[13].value, 1, "ordinal 13");
        equal(result.data[14].ordinal, 14, "ordinal 14");
        equal(result.data[14].value, 1, "ordinal 14");
    });

    test("dimension as array", function() {
        var builder = new PivotCubeBuilder({
           dimensions: [
               { field: "FirstName", caption: "All First Names" },
               { field: "LastName", caption: "All Last Names" }
           ]
        });

        equal(builder.dimensions.FirstName.caption, "All First Names");
        equal(builder.dimensions.LastName.caption, "All Last Names");
    });

    test("dimension as array of strings", function() {
        var builder = new PivotCubeBuilder({
           dimensions: [ "FirstName", "LastName" ]
        });

        ok(builder.dimensions.FirstName);
        ok(builder.dimensions.LastName);
    });

    test("measures as array", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });

        equal(builder.measures.Measure1.caption, "Measure 1");
        equal(builder.measures.Measure1.field, "value");
        ok(builder.measures.Measure1.aggregate);
    });

    test("additional tuple is created for every measure if multiple measures are defined", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "name" }], measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.columns.tuples.length, 2);
    });

    test("measure member of the tuples have measure names set - with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "name" }], measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.columns.tuples[0].members.length, 2);
        equal(result.axes.columns.tuples[0].members[1].caption, "Measure 1");
        equal(result.axes.columns.tuples[1].members.length, 2);
        equal(result.axes.columns.tuples[1].members[1].caption, "Measure 2");
    });

    test("measure member of the tuples have measure names set with expanded column - with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "name", expand: true }], measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.columns.tuples.length, 6);

        equal(result.axes.columns.tuples[0].members.length, 2);
        equal(result.axes.columns.tuples[0].members[1].caption, "Measure 1");
        equal(result.axes.columns.tuples[0].members[1].name, "Measure1");
        equal(result.axes.columns.tuples[1].members.length, 2);
        equal(result.axes.columns.tuples[1].members[1].caption, "Measure 2");
        equal(result.axes.columns.tuples[1].members[1].name, "Measure2");

        equal(result.axes.columns.tuples[2].members.length, 2);
        equal(result.axes.columns.tuples[2].members[1].caption, "Measure 1");
        equal(result.axes.columns.tuples[2].members[1].name, "Measure1");
        equal(result.axes.columns.tuples[3].members.length, 2);
        equal(result.axes.columns.tuples[3].members[1].caption, "Measure 2");
        equal(result.axes.columns.tuples[3].members[1].name, "Measure2");
    });

    test("no additional tuple is created on the opposite axes if multiple measures are defined", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "name" }], rows: [{ name: "lastName" }], measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.columns.tuples.length, 2);
        equal(result.axes.rows.tuples.length, 1);
    });

    test("process data contains correct number of items - non expanded column with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, {
            columns: [{ name: "name" }],
            measures: [{ name: "Measure1" }, { name: "Measure2" }] });

        equal(result.data.length, 2);
    });

    test("process data contains correct number of items - expanded column with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, {
            columns: [{ name: "name", expand: true }],
            measures: [{ name: "Measure1" }, { name: "Measure2" }] });

        equal(result.data.length, 6);
    });

    test("process data contains correct number of items - expanded column and rows with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, {
            columns: [{ name: "name", expand: true }],
            rows: [{ name: "lastName", expand: true }],
            measures: [{ name: "Measure1" }, { name: "Measure2" }] });

        equal(result.data.length, 18);
    });

    test("process data items are correctly formatted with multiple measures", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name", format: "foo{0}",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  format: "{0}bar", aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [{ name: "lastName", expand: false }], measures: [{ name: "Measure1" }, { name: "Measure2" }] });

        equal(result.data[0].value, 3);
        equal(result.data[0].fmtValue, "foo3");
        equal(result.data[1].value, 3);
        equal(result.data[1].fmtValue, "3bar");
    });

    test("process data items are correctly formatted with multiple measures - single measure format", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName", format: "{0}bar", aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [{ name: "name1", lastName: "LastName1" }, { name: "name2", lastName: "LastName1" }, { name: "name1", lastName: "LastName2" } ];

        var result = builder.process(data, { columns: [{ name: "name", expand: false }], rows: [{ name: "lastName", expand: false }], measures: [{ name: "Measure1" }, { name: "Measure2" }] });

        equal(result.data[0].value, 3);
        equal(result.data[0].fmtValue, 3);
        equal(result.data[1].value, 3);
        equal(result.data[1].fmtValue, "3bar");
    });

    test("additional tuple is created for every measure if multiple measures are defined - measures on row axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "lastName" }], measures: [{ name: "Measure1" }, { name: "Measure2" }], rows: [{ name: "name" }], measuresAxis: "rows" });

        equal(result.axes.rows.tuples.length, 2);
    });

    test("measure member of the tuples have measure names set - with multiple measures - measures on row axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "lastName" }], rows: [{ name: "name" }], measures: [{ name: "Measure1" }, { name: "Measure2" }], measuresAxis: "rows"});

        equal(result.axes.rows.tuples[0].members.length, 2);
        equal(result.axes.rows.tuples[0].members[1].caption, "Measure 1");
        equal(result.axes.rows.tuples[1].members.length, 2);
        equal(result.axes.rows.tuples[1].members[1].caption, "Measure 2");
    });

    test("measure member of the tuples have measure names set with expanded column - with multiple measures on row axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { columns: [{ name: "lastName" }], rows: [{ name: "name", expand: true }], measuresAxis: "rows", measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.rows.tuples.length, 6);

        equal(result.axes.rows.tuples[0].members.length, 2);
        equal(result.axes.rows.tuples[0].members[1].caption, "Measure 1");
        equal(result.axes.rows.tuples[0].members[1].name, "Measure1");
        equal(result.axes.rows.tuples[1].members.length, 2);
        equal(result.axes.rows.tuples[1].members[1].caption, "Measure 2");
        equal(result.axes.rows.tuples[1].members[1].name, "Measure2");

        equal(result.axes.rows.tuples[2].members.length, 2);
        equal(result.axes.rows.tuples[2].members[1].caption, "Measure 1");
        equal(result.axes.rows.tuples[2].members[1].name, "Measure1");
        equal(result.axes.rows.tuples[3].members.length, 2);
        equal(result.axes.rows.tuples[3].members[1].caption, "Measure 2");
        equal(result.axes.rows.tuples[3].members[1].name, "Measure2");
    });

    test("no additional tuple is created on the opposite axes if multiple measures are defined - with measures on row axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Measure1", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Measure2", caption: "Measure 2", field: "lastName",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1" },
            { name: "name2", lastName: "lastName2" },
            { name: "name1", lastName: "lastName3" }
        ];
        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Measure1" }, { name: "Measure2" }]});

        equal(result.axes.rows.tuples.length, 2);
        equal(result.axes.columns.tuples.length, 1);
    });

    test("data is correct with multiple measures on row axis and no expanded members", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Count" }, { name: "Sum" }]});

        equal(result.data.length, 2);
        equal(result.data[0].value, 3);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].value, 4);
        equal(result.data[1].ordinal, 1);
    });

    test("data is correct with multiple measures on row axis and expanded members on column axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName", expand: true }], measuresAxis: "rows",  measures: [{ name: "Count" }, { name: "Sum" }]});

        equal(result.data.length, 8);
        equal(result.data[0].value, 3);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].value, 1);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].value, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].value, 1);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].value, 4);
        equal(result.data[4].ordinal, 4);
        equal(result.data[5].value, 1);
        equal(result.data[5].ordinal, 5);
        equal(result.data[6].value, 2);
        equal(result.data[6].ordinal, 6);
        equal(result.data[7].value, 1);
        equal(result.data[7].ordinal, 7);
    });

    test("data is correct with multiple measures on row axis and expanded members on row axis", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name", expand: true }], columns: [{ name: "lastName" }], measuresAxis: "rows", measures: [{ name: "Count" }, { name: "Sum" }]});

        equal(result.data.length, 6);
        equal(result.data[0].value, 3);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].value, 4);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].value, 2);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].value, 2);
        equal(result.data[3].ordinal, 3);
        equal(result.data[4].value, 1);
        equal(result.data[4].ordinal, 4);
        equal(result.data[5].value, 2);
        equal(result.data[5].ordinal, 5);
    });

    test("data is correct with multiple measures on row axis and expanded members on both axes", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name", expand: true }], columns: [{ name: "lastName", expand: true }], measuresAxis: "rows", measures: [{ name: "Count" }, { name: "Sum" }]});

        equal(result.data.length, 24);

        equal(result.data[0].value, 3);
        equal(result.data[0].ordinal, 0);
        equal(result.data[1].value, 1);
        equal(result.data[1].ordinal, 1);
        equal(result.data[2].value, 1);
        equal(result.data[2].ordinal, 2);
        equal(result.data[3].value, 1);
        equal(result.data[3].ordinal, 3);

        equal(result.data[4].value, 4);
        equal(result.data[4].ordinal, 4);
        equal(result.data[5].value, 1);
        equal(result.data[5].ordinal, 5);
        equal(result.data[6].value, 2);
        equal(result.data[6].ordinal, 6);
        equal(result.data[7].value, 1);
        equal(result.data[7].ordinal, 7);

        equal(result.data[8].value, 2);
        equal(result.data[8].ordinal, 8);
        equal(result.data[9].value, 1);
        equal(result.data[9].ordinal, 9);

        equal(result.data[11].value, 1);
        equal(result.data[11].ordinal, 11);

        equal(result.data[12].value, 2);
        equal(result.data[12].ordinal, 12);
        equal(result.data[13].value, 1);
        equal(result.data[13].ordinal, 13);

        equal(result.data[15].value, 1);
        equal(result.data[15].ordinal, 15);
        equal(result.data[16].value, 1);
        equal(result.data[16].ordinal, 16);
        equal(result.data[18].value, 1);
        equal(result.data[18].ordinal, 18);
        equal(result.data[20].value, 2);
        equal(result.data[20].ordinal, 20);

        equal(result.data[22].value, 2);
        equal(result.data[22].ordinal, 22);
    });

    test("process measures are set as columns if no columns and rows are set", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });
        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [], rows: [], measures: [{ name: "Count" }] });

        ok(result.axes.columns);
        equal(result.data.length, 1);
    });

    test("process multiple measures are set as columns if no columns and rows are set", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });
        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [], rows: [], measures: [{ name: "Count" }, { name: "Sum" }] });

        equal(result.axes.columns.tuples.length, 2);
        equal(result.axes.columns.tuples[0].members.length, 1, "members count");
        equal(result.data.length, 2);
    });

    test("process measures are set as columns if no column are set", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "name",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + 1;  }},
                { name: "Sum", caption: "Measure 2", field: "value",  aggregate: function(data, state) { state.accumulator = state.accumulator || 0; return state.accumulator + data;  }}
            ]
        });
        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [], rows: [{ name: "name" }], measures: [{ name: "Count" }] });

        ok(result.axes.columns.tuples.length);
        ok(result.axes.rows.tuples.length);
        equal(result.data.length, 1);
    });

    test("process rows are set as columns if no column and measures are set", function() {
        var builder = new PivotCubeBuilder();

        var data = [{ name: "name1" }, { name: "name2" }, { name: "name1" } ];
        var result = builder.process(data, { columns: [], rows: [{ name: "name" }] });

        ok(result.axes.columns.tuples.length);
        ok(!result.axes.rows.tuples.length);
        equal(result.data.length, 1);
    });

    module("PivotCubeBuilder built-in aggregators", { });

    test("PivotCube uses built-in sum aggregate", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Sum", caption: "Measure 1", field: "value",  aggregate: "Sum" }
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Sum" }]});

        equal(result.data.length, 1);
        equal(result.data[0].value, 4);
        equal(result.data[0].ordinal, 0);
    });

    test("PivotCube uses built-in count aggregate", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Count", caption: "Measure 1", field: "value",  aggregate: "Count" }
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 2 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Count" }]});

        equal(result.data.length, 1);
        equal(result.data[0].value, 3);
        equal(result.data[0].ordinal, 0);
    });

    test("PivotCube uses built-in avarage aggregate", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Average", caption: "Measure 1", field: "value",  aggregate: "Average" }
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 1 },
            { name: "name1", lastName: "lastName3", value: 1 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Average" }]});

        equal(result.data.length, 1);
        equal(result.data[0].value, 1);
        equal(result.data[0].ordinal, 0);
    });

    test("PivotCube uses built-in max aggregate", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Max", caption: "Measure 1", field: "value",  aggregate: "Max" }
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 5 },
            { name: "name1", lastName: "lastName3", value: 2 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Max" }]});

        equal(result.data.length, 1);
        equal(result.data[0].value, 5);
        equal(result.data[0].ordinal, 0);
    });

    test("PivotCube uses built-in min aggregate", function() {
        var builder = new PivotCubeBuilder({
            measures: [
                { name: "Min", caption: "Measure 1", field: "value",  aggregate: "Min" }
            ]
        });

        var data = [
            { name: "name1", lastName: "lastName1", value: 1 },
            { name: "name2", lastName: "lastName2", value: 5 },
            { name: "name1", lastName: "lastName3", value: 2 }
        ];

        var result = builder.process(data, { rows: [{ name: "name" }], columns: [{ name: "lastName" }], measuresAxis: "rows",  measures: [{ name: "Min" }]});

        equal(result.data.length, 1);
        equal(result.data[0].value, 1);
        equal(result.data[0].ordinal, 0);
    });
})();
