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

})();

