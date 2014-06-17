(function() {
    var PivotDataSource = kendo.data.PivotDataSource;

    module("PivotDataSource merging of data", { });

    test("expand of root level column axis, without rows", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 10 } ],
            [ { value: 10 }, { value: 3 }, { value: 7 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 0");

        var data = dataSource.data();
        equal(data.length, 3);
        equal(data[0].value, 10);
        equal(data[1].value, 3);
        equal(data[2].value, 7);
    });

    test("expand of second level column axis", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 2-0", parentName: "level 1-0", children: [] } ] },
                    { members: [ { name: "level 2-1", parentName: "level 1-0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 10 }, { value: 3 }, { value: 7 } ],
            [ { value: 3 }, { value: 2 }, { value: 1 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 1-0");

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, 10);
        equal(data[1].value, 3);
        equal(data[2].value, 2);
        equal(data[3].value, 1);
        equal(data[4].value, 7);
    });

    test("expand of root level row axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 10 } ],
            [ { value: 10 }, { value: 3 }, { value: 7 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 0");

        var data = dataSource.data();
        equal(data.length, 3);
        equal(data[0].value, 10);
        equal(data[1].value, 3);
        equal(data[2].value, 7);
    });

    test("expand of second level row axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 2-0", parentName: "level 1-0", children: [] } ] },
                    { members: [ { name: "level 2-1", parentName: "level 1-0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 10 }, { value: 3 }, { value: 7 } ],
            [ { value: 3 }, { value: 2 }, { value: 1 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 1-0");

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, 10);
        equal(data[1].value, 3);
        equal(data[2].value, 2);
        equal(data[3].value, 1);
        equal(data[4].value, 7);
    });

    test("initially expanded row and column axes", function() {
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
                                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: [
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                            { value: 4 }
                        ]
                    });
                }
            }
        });

        dataSource.read();

        var data = dataSource.data();
        equal(data.length, 4);
        equal(data[0].value, 1);
        equal(data[1].value, 2);
        equal(data[2].value, 3);
        equal(data[3].value, 4);
    });

    test("expand column axis with rows expanded", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 2-0", parentName: "level 1-0", children: [] } ] },
                    { members: [ { name: "level 2-1", parentName: "level 1-0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 1 }, { value: 2 }, { value: 3 },  { value: 4 }, { value: 5 }, { value: 6 } ],
            [ { value: 2 }, { value: 7 }, { value: 8 },  { value: 5 }, { value: 9 }, { value: 10 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift(),
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("level 1-0");

        var data = dataSource.data();
        equal(data.length, 10);
        equal(data[0].value, 1);
        equal(data[1].value, 2);
        equal(data[2].value, 7);
        equal(data[3].value, 8);
        equal(data[4].value, 3);

        equal(data[5].value, 4);
        equal(data[6].value, 5);
        equal(data[7].value, 9);
        equal(data[8].value, 10);
        equal(data[9].value, 6);
    });

    test("initially expanded row and columns, expand row axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 2-0", parentName: "level 1-0", children: [] } ] },
                    { members: [ { name: "level 2-1", parentName: "level 1-0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 1 }, { value: 2 }, { value: 3 },  { value: 4 }, { value: 5 }, { value: 6 } ],
            [ { value: 3 }, { value: 4 }, { value: 7 },  { value: 8 }, { value: 9 }, { value: 10 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift(),
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 1-0");

        var data = dataSource.data();
        equal(data.length, 10);
        equal(data[0].value, 1);
        equal(data[1].value, 2);
        equal(data[2].value, 3);
        equal(data[3].value, 4);
        equal(data[4].value, 7);
        equal(data[5].value, 8);
        equal(data[6].value, 9);
        equal(data[7].value, 10);
        equal(data[8].value, 5);
        equal(data[9].value, 6);
    });

    test("expand row axis with only one column", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 10 } ],
            [ { value: 10 }, { value: 3 }, { value: 7 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift(),
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 0");

        var data = dataSource.data();
        equal(data.length, 3);
        equal(data[0].value, 10);
        equal(data[1].value, 3);
        equal(data[2].value, 7);
    });

    test("initially expanded columns, expand row axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            }
        ];
        var data = [
            [ { value: 1 }, { value: 2 } ],
            [ { value: 1 }, { value: 2 }, { value: 3 },  { value: 4 }, { value: 5 }, { value: 6 } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift(),
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] }
                                ]
                            }
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 0");

        var data = dataSource.data();
        equal(data.length, 6);
        equal(data[0].value, 1);
        equal(data[1].value, 2);
        equal(data[2].value, 3);
        equal(data[3].value, 4);
        equal(data[4].value, 5);
        equal(data[5].value, 6);
    });

    test("expand second level on row axis without columns", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [ { name: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 1-1", parentName: "level 0", children: [] } ] }
                ]
            },
            {
                tuples: [
                    { members: [ { name: "level 1-0", parentName: "level 0", children: [] } ] },
                    { members: [ { name: "level 2-0", parentName: "level 1-0", children: [] } ] },
                    { members: [ { name: "level 2-1", parentName: "level 1-0", children: [] } ] }
                ]
            }
        ];

        var data = [
            [ { value: 1 }, { value: 2 }, { value: 3 } ],
            [ { value: 2 }, { value: 4 }, { value: 5 } ]
        ];

        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow("level 1-0");

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, 1);
        equal(data[1].value, 2);
        equal(data[2].value, 4);
        equal(data[3].value, 5);
        equal(data[4].value, 3);
    });

    test("initially expanded multiple members on column axis", function() {
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
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                ]
                            }
                        },
                        data: [
                            { value: "dim 0 level 0" },
                            { value: "dim 0 level 1-0" },
                            { value: "dim 1 level 1-0" },
                            { value: "dim 2 level 1-0" },
                            { value: "dim 0 level 1-0, dim 1 level 1-0" },
                            { value: "dim 0 level 1-0, dim 2 level 1-0" },
                            { value: "dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0" }
                        ]
                    });
                }
            }
        });

        dataSource.read();

        var data = dataSource.data();
        equal(data.length, 7);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-0, dim 1 level 1-0");
        equal(data[3].value, "dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0");
        equal(data[4].value, "dim 0 level 1-0, dim 2 level 1-0");
        equal(data[5].value, "dim 1 level 1-0");
        equal(data[6].value, "dim 2 level 1-0");
    });

    test("initially expanded multiple members on row axis", function() {
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
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                ]
                            }
                        },
                        data: [
                            { value: "dim 0 level 0" },
                            { value: "dim 0 level 1-0" },
                            { value: "dim 1 level 1-0" },
                            { value: "dim 2 level 1-0" },
                            { value: "dim 0 level 1-0, dim 1 level 1-0" },
                            { value: "dim 0 level 1-0, dim 2 level 1-0" },
                            { value: "dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0" }
                        ]
                    });
                }
            }
        });

        dataSource.read();

        var data = dataSource.data();
        equal(data.length, 7);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-0, dim 1 level 1-0");
        equal(data[3].value, "dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0");
        equal(data[4].value, "dim 0 level 1-0, dim 2 level 1-0");
        equal(data[5].value, "dim 1 level 1-0");
        equal(data[6].value, "dim 2 level 1-0");
    });

    test("initially expanded multiple members on row axis and multuple columns", function() {
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
                                    { members: [
                                        { name: "dim 0 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] }
                                    ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                    { members: [
                                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] },
                                        { name: "dim 2 level 1-0", parentName: "dim 2 level 0", children: [] }
                                    ] },
                                ]
                            }
                        },
                        data: [
                            { value: "col 0 dim 0 level 0" },
                            { value: "col 1 dim 0 level 0" },
                            { value: "col 0 dim 0 level 1-0" },
                            { value: "col 1 dim 0 level 1-0" },
                            { value: "col 0 dim 1 level 1-0" },
                            { value: "col 1 dim 1 level 1-0" },
                            { value: "col 0 dim 2 level 1-0" },
                            { value: "col 1 dim 2 level 1-0" },
                            { value: "col 0 dim 0 level 1-0, dim 1 level 1-0" },
                            { value: "col 1 dim 0 level 1-0, dim 1 level 1-0" },
                            { value: "col 0 dim 0 level 1-0, dim 2 level 1-0" },
                            { value: "col 1 dim 0 level 1-0, dim 2 level 1-0" },
                            { value: "col 0 dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0" },
                            { value: "col 1 dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0" }
                        ]
                    });
                }
            }
        });

        dataSource.read();

        var data = dataSource.data();
        equal(data.length, 14);
        equal(data[0].value, "col 0 dim 0 level 0");
        equal(data[1].value, "col 1 dim 0 level 0");
        equal(data[2].value, "col 0 dim 0 level 1-0");
        equal(data[3].value, "col 1 dim 0 level 1-0");
        equal(data[4].value, "col 0 dim 0 level 1-0, dim 1 level 1-0");
        equal(data[5].value, "col 1 dim 0 level 1-0, dim 1 level 1-0");
        equal(data[6].value, "col 0 dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0");
        equal(data[7].value, "col 1 dim 0 level 1-0, dim 1 level 1-0, dim 2 level 1-0");
        equal(data[8].value, "col 0 dim 0 level 1-0, dim 2 level 1-0");
        equal(data[9].value, "col 1 dim 0 level 1-0, dim 2 level 1-0");
        equal(data[10].value, "col 0 dim 1 level 1-0");
        equal(data[11].value, "col 1 dim 1 level 1-0");
        equal(data[12].value, "col 0 dim 2 level 1-0");
        equal(data[13].value, "col 1 dim 2 level 1-0");
    });

    test("expand first member on node with alreay expanded second member on column axis", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-1", parentName: "dim 1 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] }
                ]
            }
        ];
        var data = [
            [ { value: "dim 0 level 0" }, { value: "dim 1 level 1-0" }, { value: "dim 1 level 1-1" } ],
            [ { value: "dim 0 level 0" }, { value: "dim 0 level 1-0" }, { value: "dim 0 level 1-1" } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 0"]);

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-1");
        equal(data[3].value, "dim 1 level 1-0");
        equal(data[4].value, "dim 1 level 1-1");
    });

    test("expand second member on node with alreay expanded first member on column axis", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-1", parentName: "dim 1 level 0", children: [] }
                    ] }
                ]
            }
        ];
        var data = [
            [ { value: "dim 0 level 0" }, { value: "dim 0 level 1-0" }, { value: "dim 0 level 1-1" } ],
            [ { value: "dim 0 level 0" }, { value: "dim 1 level 1-0" }, { value: "dim 1 level 1-1" } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 0", "dim 1 level 0"]);

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-1");
        equal(data[3].value, "dim 1 level 1-0");
        equal(data[4].value, "dim 1 level 1-1");
    });

    test("expand first member on node with alreay expanded second member on row axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-1", parentName: "dim 1 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] }
                ]
            }
        ];
        var data = [
            [ { value: "dim 0 level 0" }, { value: "dim 1 level 1-0" }, { value: "dim 1 level 1-1" } ],
            [ { value: "dim 0 level 0" }, { value: "dim 0 level 1-0" }, { value: "dim 0 level 1-1" } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow(["dim 0 level 0"]);

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-1");
        equal(data[3].value, "dim 1 level 1-0");
        equal(data[4].value, "dim 1 level 1-1");
    });

    test("expand second member on node with alreay expanded first member on rows axis", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-0", parentName: "dim 1 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "dim 1 level 1-1", parentName: "dim 1 level 0", children: [] }
                    ] }
                ]
            }
        ];
        var data = [
            [ { value: "dim 0 level 0" }, { value: "dim 0 level 1-0" }, { value: "dim 0 level 1-1" } ],
            [ { value: "dim 0 level 0" }, { value: "dim 1 level 1-0" }, { value: "dim 1 level 1-1" } ]
        ];
        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow(["dim 0 level 0", "dim 1 level 0"]);

        var data = dataSource.data();
        equal(data.length, 5);
        equal(data[0].value, "dim 0 level 0");
        equal(data[1].value, "dim 0 level 1-0");
        equal(data[2].value, "dim 0 level 1-1");
        equal(data[3].value, "dim 1 level 1-0");
        equal(data[4].value, "dim 1 level 1-1");
    });

    test("return less column tuples on row expand", function() {
        var rowTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            }
        ];

        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                { members: [
                    { name: "dim 0 level 0", children: [] }
                    ] },
                { members: [
                    { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            }
        ];

        var data = [
            [{ value: "col 0, row 0" }, { value: "col 1, row 0" }, { value: "col 2, row 0" }],
            [{ value: "col 0, row 0" }, { value: "col 2, row 0" }, { value: "col 0, row 1" }, { value: "col 2, row 1" }]
        ];

        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift(),
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandRow(["dim 0 level 0"]);

        var columns = dataSource.axes().columns.tuples;
        equal(columns.length, 1);
        equal(columns[0].members[0].children.length, 2);

        var rows = dataSource.axes().rows.tuples;
        equal(rows.length, 1);
        equal(rows[0].members[0].children.length, 1);

        var data = dataSource.data();
        equal(data.length, 6);
        equal(data[0].value, "col 0, row 0");
        equal(data[1].value, "col 1, row 0");
        equal(data[2].value, "col 2, row 0");
        equal(data[3].value, "col 0, row 1");
        equal(data[4].value, "", "col 1, row 1 is not empty");
        equal(data[5].value, "col 2, row 1");
    });

    test("return less rows tuples on column expand", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            }
        ];

        var rowTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                { members: [
                    { name: "dim 0 level 0", children: [] }
                    ] },
                { members: [
                    { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] }
                    ] }
                ]
            }
        ];

        var data = [
            [{ value: "col 0, row 0" }, { value: "col 0, row 1" }, { value: "col 0, row 2" }],
            [
                { value: "col 0, row 0" }, { value: "col 1, row 0" },
                { value: "col 0, row 2" }, { value: "col 1, row 2" }
            ]
        ];

        var dataSource = new PivotDataSource({
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift(),
                            rows: rowTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 0"]);

        var columns = dataSource.axes().columns.tuples;
        equal(columns.length, 1);
        equal(columns[0].members[0].children.length, 1);

        var rows = dataSource.axes().rows.tuples;
        equal(rows.length, 1);
        equal(rows[0].members[0].children.length, 2);

        var data = dataSource.data();
        equal(data.length, 6);
        equal(data[0].value, "col 0, row 0");
        equal(data[1].value, "col 1, row 0");
        equal(data[2].value, "col 0, row 1");
        equal(data[3].value, "", "col 1, row 2 is not empty");
        equal(data[4].value, "col 0, row 2");
        equal(data[5].value, "col 1, row 2");
    });

    test("expand column with multiple measures", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            }
        ];

        var data = [
            [{ value: "level 0, measure 1" }, { value: "level 0, measure 2" }],
            [
                { value: "level 0, measure 1" }, { value: "level 0, measure 2" },
                { value: "level 1, measure 1" }, { value: "level 1, measure 2" }
            ],
        ];

        var dataSource = new PivotDataSource({
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 0"]);

        var data = dataSource.data();
        equal(data.length, 4);
        equal(data[0].value, "level 0, measure 1");
        equal(data[1].value, "level 0, measure 2");
        equal(data[2].value, "level 1, measure 1");
        equal(data[3].value, "level 1, measure 2");
    });

    test("expand second nested column with multiple measures", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-1", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 2-0", parentName: "dim 0 level 1-1", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 2-0", parentName: "dim 0 level 1-1", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            }
        ];

        var data = [
            [
                { value: "level 0, measure 1" }, { value: "level 0, measure 2" },
                { value: "level 1-0, measure 1" }, { value: "level 1-0, measure 2" },
                { value: "level 1-1, measure 1" }, { value: "level 1-1, measure 2" }
            ],
            [
                { value: "level 1-1, measure 1" }, { value: "level 1-1, measure 2" },
                { value: "level 2, measure 1" }, { value: "level 2, measure 2" }
            ],
        ];

        var dataSource = new PivotDataSource({
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 1-0"]);

        var data = dataSource.data();
        equal(data.length, 8);
        equal(data[0].value, "level 0, measure 1");
        equal(data[1].value, "level 0, measure 2");
        equal(data[2].value, "level 1-0, measure 1");
        equal(data[3].value, "level 1-0, measure 2");
        equal(data[4].value, "level 1-1, measure 1");
        equal(data[5].value, "level 1-1, measure 2");
        equal(data[6].value, "level 2, measure 1");
        equal(data[7].value, "level 2, measure 2");
    });

    test("expand nested column with multiple measures", function() {
        var columnTuples = [
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            },
            {
                tuples: [
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 1-0", parentName: "dim 0 level 0", children: [] },
                        { name: "measure 2", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 2-0", parentName: "dim 0 level 1-0", children: [] },
                        { name: "measure 1", children: [] }
                    ] },
                    { members: [
                        { name: "dim 0 level 2-0", parentName: "dim 0 level 1-0", children: [] },
                        { name: "measure 2", children: [] }
                    ] }
                ]
            }
        ];

        var data = [
            [
                { value: "level 0, measure 1" }, { value: "level 0, measure 2" },
                { value: "level 1, measure 1" }, { value: "level 1, measure 2" }
            ],
            [
                { value: "level 1, measure 1" }, { value: "level 1, measure 2" },
                { value: "level 2, measure 1" }, { value: "level 2, measure 2" }
            ],
        ];

        var dataSource = new PivotDataSource({
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: columnTuples.shift()
                        },
                        data: data.shift()
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn(["dim 0 level 1-0"]);

        var data = dataSource.data();
        equal(data.length, 6);
        equal(data[0].value, "level 0, measure 1");
        equal(data[1].value, "level 0, measure 2");
        equal(data[2].value, "level 1, measure 1");
        equal(data[3].value, "level 1, measure 2");
        equal(data[4].value, "level 2, measure 1");
        equal(data[5].value, "level 2, measure 2");
    });

})();

