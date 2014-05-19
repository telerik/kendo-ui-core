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
})();

