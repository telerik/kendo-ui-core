(function() {
    var PivotDataSource = kendo.data.PivotDataSource;

    module("PivotDataSource merging of axes", { });

    test("add children to the first member of root level tuple", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        equal(axes.columns.tuples[0].members[0].name, "level 0");
        equal(axes.columns.tuples[0].members[1].name, "level 0");
        equal(axes.columns.tuples[0].members[0].children.length, 1);
        equal(axes.columns.tuples[0].members[0].children[0].members[0].name, "level 1");
        equal(axes.columns.tuples[0].members[0].children[0].members[1].name, "level 0");
    });

    test("add children to the second member of root level tuple", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        equal(axes.columns.tuples[0].members[0].name, "level 0");
        equal(axes.columns.tuples[0].members[1].name, "level 0");
        equal(axes.columns.tuples[0].members[0].children.length, 0);
        equal(axes.columns.tuples[0].members[1].children.length, 1);
        equal(axes.columns.tuples[0].members[1].children[0].members[0].name, "level 0");
        equal(axes.columns.tuples[0].members[1].children[0].members[1].name, "level 1");
    });

    test("add children to the first member of level 1 tuple", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        equal(axes.columns.tuples[0].members[0].children.length, 1);
        equal(axes.columns.tuples[0].members[0].children[0].members[0].children.length, 0);
        equal(axes.columns.tuples[0].members[0].children[0].members[1].children.length, 1);
    });

    test("add children to the last member of root level tuple", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        equal(axes.columns.tuples[0].members[0].children.length, 0);
        equal(axes.columns.tuples[0].members[1].children.length, 0);
        equal(axes.columns.tuples[0].members[2].children.length, 1);
    });

    test("add children to the last member of last level tuple with 3 members", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        var level0 = axes.columns.tuples[0];
        equal(level0.members[0].children.length, 1);

        var level1 = level0.members[0].children[0];
        equal(level1.members[0].children.length, 0);
        equal(level1.members[1].children.length, 1);
        equal(level1.members[2].children.length, 0);

        var level2 = level1.members[1].children[0];
        equal(level2.members[0].children.length, 0);
        equal(level2.members[1].children.length, 0);
        equal(level2.members[2].children.length, 1);

        var level3 = level2.members[2].children[0];
        equal(level3.members[0].name, "level 1");
        equal(level3.members[1].name, "level 1");
        equal(level3.members[2].name, "level 1");
    });

    test("tuples with parentName without existing parent are recognized as root", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1-2", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 2);
    });

    test("add children from single member tuple", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);
        equal(axes.columns.tuples[0].members[0].children.length, 1);
    });

    test("multiple measures merged in single member", function() {
        var dataSource = new PivotDataSource({
            measures: [ "measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 1", children: [] } ] },
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 2", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.columns.tuples.length, 1);

        var tuple = axes.columns.tuples[0];
        equal(tuple.members[0].name, "level 0");
        equal(tuple.members[1].measure, true);
        equal(tuple.members[1].name, "Measures");
        equal(tuple.members[1].children.length, 2);
        equal(tuple.members[1].children[0].name, "measure 1");
        equal(tuple.members[1].children[1].name, "measure 2");
    });

    test("merge to existing axes on expand with single dimention", function() {
        var axes = [
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] } ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 1", parentName: "level 0", children: [] } ] },
                        { members: [ { name: "level 2", parentName: "level 1", children: [] } ] }
                    ]
                }
            }
        ];

        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: axes.shift(),
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 1");

        var tuples = dataSource.axes().columns.tuples;
        equal(tuples.length, 1, "one root tuple");
        equal(tuples[0].members[0].children.length, 1, "one tuple on second level");
        equal(tuples[0].members[0].children[0].members[0].children.length, 1, "one tuple on third level");
        equal(tuples[0].members[0].children[0].members[0].children[0].members[0].name, "level 2");
    });

    test("merge to existing axes on expand on root level of first dimention", function() {
        var axes = [
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 1", children: [] }  ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 1", children: [] }  ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", children: [] }  ] }
                    ]
                }
            }
        ];

        var dataSource = new PivotDataSource({
            columns: ["level 0", "level 1"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: axes.shift(),
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 0");

        var tuples = dataSource.axes().columns.tuples;
        equal(tuples.length, 1, "one root tuple");
        equal(tuples[0].members[0].children.length, 1, "one tuple on second level of first memeber");
        equal(tuples[0].members[0].children[0].members[0].name, "level 1");
        equal(tuples[0].members[1].children.length, 0, "zero tuples on second level of second member");
    });

    test("merge to existing axes on expand on root level of second dimention", function() {
        var axes = [
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 1", children: [] }  ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 1", children: [] }  ] },
                        { members: [ { name: "level 0", children: [] }, { name: "level 2", parentName: "level 1", children: [] }  ] }
                    ]
                }
            }
        ];

        var dataSource = new PivotDataSource({
            columns: ["level 0", "level 1"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: axes.shift(),
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["level 0", "level 1"]);

        var tuples = dataSource.axes().columns.tuples;
        equal(tuples.length, 1, "one root tuple");
        equal(tuples[0].members[0].children.length, 0, "zero tuples on second level of first memeber");
        equal(tuples[0].members[1].children.length, 1, "one tuple on second level of second member");
        equal(tuples[0].members[1].children[0].members[0].name, "level 0");
        equal(tuples[0].members[1].children[0].members[1].name, "level 2");
    });

    test("merge to existing axes with multuiple measures", function() {
        var axes = [
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [], hierarchy: "level 0" }, { name: "measure 1", children: [] } ] },
                        { members: [ { name: "level 0", children: [] }, { name: "measure 2", children: [] } ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "measure 1", children: [] } ] },
                        { members: [ { name: "level 0", children: [] }, { name: "measure 2", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "measure 1", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "measure 2", children: [] } ] }
                    ]
                }
            }
        ];

        var dataSource = new PivotDataSource({
            measures: [ "measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: axes.shift(),
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 0");

        var tuples = dataSource.axes().columns.tuples;
        equal(tuples.length, 1, "one root tuple");
        equal(tuples[0].members[0].children.length, 1, "one tuple on second level of first memeber");
        equal(tuples[0].members[1].children.length, 2, "two measures on root level");

        equal(tuples[0].members[0].children[0].members[0].name, "level 1");
        equal(tuples[0].members[0].children[0].members[1].measure, true);
        equal(tuples[0].members[0].children[0].members[1].children.length, 2, "two measures on second level");
    });

    test("merge tuples in rows axis", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var axes = dataSource.axes();

        equal(axes.rows.tuples.length, 1);
        equal(axes.rows.tuples[0].members[0].name, "level 0");
        equal(axes.rows.tuples[0].members[1].name, "level 0");
        equal(axes.rows.tuples[0].members[0].children.length, 1);
        equal(axes.rows.tuples[0].members[0].children[0].members[0].name, "level 1");
        equal(axes.rows.tuples[0].members[0].children[0].members[1].name, "level 0");
    });

    test("measures are merged only on column axis", function() {
        var dataSource = new PivotDataSource({
            measures: [ "measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 1", children: [] } ] },
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 2", children: [] } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var columnTuples = dataSource.axes().columns.tuples;
        var rowTuples = dataSource.axes().rows.tuples;

        equal(columnTuples.length, 1);
        equal(columnTuples[0].members.length, 2);
        equal(columnTuples[0].members[1].measure, true);

        equal(rowTuples.length, 1);
        equal(rowTuples[0].members.length, 1);
    });

    test("measures are merged only on row axis", function() {
        var dataSource = new PivotDataSource({
            measures: {
                values: [ "measure 1", "measure 2"],
                axis: "rows"
            },
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 1", children: [] } ] },
                                    { members: [ { name: "level 0", children: [] }, { name: "measure 2", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var columnTuples = dataSource.axes().columns.tuples;
        var rowTuples = dataSource.axes().rows.tuples;

        equal(rowTuples.length, 1);
        equal(rowTuples[0].members.length, 2);
        equal(rowTuples[0].members[1].measure, true);

        equal(columnTuples.length, 1);
        equal(columnTuples[0].members.length, 1);
    });

    test("tuple with empty children are skipped", function() {
        var axes = [
            {
                columns: {
                    tuples: [
                        { members: [ { name: "member 0", children: [] }, { name: "member 1", children: [] } ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "member 0", children: [] }, { name: "member 1", children: [] } ] },
                        { members: [ { name: "member 0 - 0", parentName: "member 0", children: [] }, { name: "member 1", children: [] } ] }
                    ]
                }
            },
            {
                columns: {
                    tuples: [
                        { members: [ { name: "member 0", children: [] }, { name: "member 1", children: [] } ] },
                        { members: [ { name: "member 0", children: [] }, { name: "member 1 - 0", parentName: "member 1", children: [] } ] }
                    ]
                }
            }
        ];

        var dataSource = new PivotDataSource({
            columns: ["member 0", "member 1"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: axes.shift(),
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("member 0");
        dataSource.expandColumn(["member 0", "member 1"]);

        var tuples = dataSource.axes().columns.tuples;
        equal(tuples.length, 1, "one root tuple");
        equal(tuples[0].members[0].children.length, 1, "one child tuple in first member");
        equal(tuples[0].members[1].children.length, 1, "one child tuple in second member");
    });
})();

