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
})();

