(function() {
    var PivotGrid = kendo.ui.PivotGrid,
        PivotDataSource = kendo.data.PivotDataSource,
        XmlaTransport = kendo.data.XmlaTransport,
        div;

    module("PivotDataSource initialziation", { });

    test("create instantiate a PivotDataSource", function() {
        var dataSource = PivotDataSource.create();

        ok(dataSource instanceof PivotDataSource);
    });

    test("throws error is non PivotDataSource is provided", function() {
       throws(function() { PivotDataSource.create(new kendo.data.DataSource()); } );
    });

    test("setting columns during initialization", function() {
        var dataSource = new PivotDataSource({
            columns: [{ name: "foo", expand: true }, "bar"]
        });

        equal(dataSource.columns()[0].name, "foo");
        ok(dataSource.columns()[0].expand);

        equal(dataSource.columns()[1].name, "bar");
        ok(!dataSource.columns()[1].expand);
    });

    test("discover calls the transport discover", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function() {
                    ok(true);
                }
            }
        });

        dataSource.discover();
    });

    test("discover returns a promise", 1, function() {
        var dataSource = new PivotDataSource({ });

        equal(typeof dataSource.discover().done, "function");
    });

    test("discover promise is resolved with default transport", 1, function() {
        var dataSource = new PivotDataSource({ });

        var promise = dataSource.discover();

        equal(promise.state(), "resolved");
    });

    test("discover promise is resolved with custom transport", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.success({});
                }
            }
        });

        var promise = dataSource.discover();

        equal(promise.state(), "resolved");
    });

    test("discover response is passed on success", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.success({ foo: "bar" });
                }
            }
        });

        var promise = dataSource.discover();

        promise.done(function(data) {
            equal(data.foo, "bar");
        });
    });

    test("discover calls the converter passing the response", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.success({ foo: "bar" });
                }
            }
        });

        dataSource.discover({}, function(data) {
            equal(data.foo, "bar");
        });
    });

    test("discover converted response is passed to the promise success", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.success({ foo: "bar" });
                }
            }
        });

        var promise = dataSource.discover({}, function(data) {
            return { baz: "moo" };
        });

        promise.done(function(data) {
            equal(data.baz, "moo");
        });
    });

    test("discover error event is called", 2, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.error({});
                }
            },
            error: function() {
                ok(true);
            }
        });

       var promise = dataSource.discover();

        equal(promise.state(), "rejected");
    });

    test("schemaCubes calls the transport discover", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    equal(options.data.command, "schemaCubes");
                }
            }
        });

        dataSource.schemaCubes();
    });

    test("schemaCubes return response to the promise on success", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    options.success({ foo: "bar" });
                }
            }
        });

        var promise = dataSource.schemaCubes();

        promise.done(function(data) {
            equal(data.foo, "bar");
        });
    });


    test("schemaCubes calls reader cubes methed", 1, function() {
        var dataSource = new PivotDataSource({
            schema: {
                cubes: function() {
                    ok(true);
                }
            }
        });

        dataSource.schemaCubes();
    });

    test("schemaCubes returns a promise", 1, function() {
        var dataSource = new PivotDataSource({ });

        equal(typeof dataSource.schemaCubes().done, "function");
    });

    test("columns descriptors are normalized during initialization", function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar"]
        });

        equal(dataSource.columns()[0].name, "foo");
        ok(!dataSource.columns()[0].expand);

        equal(dataSource.columns()[1].name, "bar");
        ok(!dataSource.columns()[1].expand);
    });

    test("setting measures during initialization", function() {
        var dataSource = new PivotDataSource({
            measures: ["foo", "bar"]
        });

        equal(dataSource.measures()[0], "foo");
        equal(dataSource.measures()[1], "bar");
    });

    test("default measures axis is columns", function() {
        var dataSource = new PivotDataSource({ });

        equal(dataSource.measuresAxis(), "columns");
    });

    test("default measures axis - measures as object", function() {
        var dataSource = new PivotDataSource({
            measures: {
                values: ["foo", "bar"]
            }
        });

        equal(dataSource.measures()[0], "foo");
        equal(dataSource.measures()[1], "bar");
        equal(dataSource.measuresAxis(), "columns");
    });

    test("setting measures axis during initialization", function() {
        var dataSource = new PivotDataSource({
            measures: {
                values: ["foo", "bar"],
                axis: "rows"
            }
        });

        equal(dataSource.measures()[0], "foo");
        equal(dataSource.measures()[1], "bar");
        equal(dataSource.measuresAxis(), "rows");
    });

    test("setting rows during initialization", function() {
        var dataSource = new PivotDataSource({
            rows: [{ name: "foo", expand: true }, "bar"]
        });

        equal(dataSource.rows()[0].name, "foo");
        ok(dataSource.rows()[0].expand);

        equal(dataSource.rows()[1].name, "bar");
        ok(!dataSource.rows()[1].expand);
    });

    test("rows descriptors are normalized during initialization", function() {
        var dataSource = new PivotDataSource({
            rows: ["foo", "bar"]
        });

        equal(dataSource.rows()[0].name, "foo");
        ok(!dataSource.rows()[0].expand);

        equal(dataSource.rows()[1].name, "bar");
        ok(!dataSource.rows()[1].expand);
    });

    test("columns and rows are pass to the transport read", function() {
        var dataSource = new PivotDataSource({
            columns: ["foo"],
            rows: ["bar"],
            transport: {
                read: function(options) {
                    equal(options.data.columns[0].name, "foo");
                    equal(options.data.rows[0].name, "bar"); }
            }
        });
        dataSource.read();
    });

    test("measures are pass to the transport read", function() {
        var dataSource = new PivotDataSource({
            measures: ["foo"],
            transport: {
                read: function(options) {
                    equal(options.data.measures[0], "foo"); }
            }
        });
        dataSource.read();
    });

    test("measuresAxis is pass to the transport read", function() {
        var dataSource = new PivotDataSource({
            measures: { values: ["foo"], axis: "rows" },
            transport: {
                read: function(options) {
                    equal(options.data.measuresAxis, "rows"); }
            }
        });
        dataSource.read();
    });

    test("server operations are enabled by default", function() {
        var dataSource = new PivotDataSource({ });

        ok(dataSource.options.serverFiltering);
        ok(dataSource.options.serverPaging);
        ok(dataSource.options.serverGrouping);
        ok(dataSource.options.serverSorting);
    });

    test("read calls reader axes method", 1, function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: function() {
                    ok(true);
                    return {};
                },
                data: function() {
                    return [];
                }
            },
            transport: {
                read: function(options) {
                    options.success({});
                }
            }
        });
        dataSource.read();
    });

    test("axes return axes", function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: function() {
                  return { columns: {}, rows: {} };
                },
                data: function() {
                    return [];
                }
            },
            transport: {
                read: function(options) {
                    options.success({});
                }
            }
        });
        dataSource.read();
        ok(dataSource.axes().columns);
        ok(dataSource.axes().rows);
    });

    test("read calls reader data method", 1, function() {
        var dataSource = new PivotDataSource({
            schema: {
                data: function() {
                    ok(true);
                    return [];
                }
            },
            transport: {
                read: function(options) {
                    options.success({});
                }
            }
        });
        dataSource.read();
    });

    test("read missing data cells are filled with defaults", function() {
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
                                tuples: [ { members: [ { caption: "foo", children: [] } ] },  { members: [ { caption: "bar", children: [] } ] }, { members: [ { caption: "baz", children: [] } ] }, { members: [ { caption: "moo", children: [] } ] }]
                            }
                        },
                        data: [ { ordinal: 0, value: 0, fmtValue: "0" }, { ordinal: 2, value: 2, fmtValue: "2" } ]
                    });
                }
            }
        });

        dataSource.read();

        var data = dataSource.data();

        equal(data.length, 4);
        equal(data[0].ordinal, 0);
        equal(data[0].value, 0);
        equal(data[1].ordinal, 1);
        ok(!data[1].value);
        equal(data[2].ordinal, 2);
        equal(data[2].value, 2);
        equal(data[3].ordinal, 3);
        ok(!data[3].value);
    });

    test("expandColumn issue a request", 1, function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar", { name: "baz", expand: true } ]
        });

        dataSource.bind("requestStart", function() {
            ok(true);
        });

        dataSource.expandColumn("foo");
    });

    test("expandColumn doesn't issue a request on already expadned member", 0, function() {
        var dataSource = new PivotDataSource({
            columns: [{ name: "foo", expand: true }],
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
                                    { members: [ { name: "foo", children: [] } ] },
                                    { members: [ { name: "bar", parentName: "foo", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        dataSource.bind("requestStart", function() {
            ok(false);
        });

        dataSource.expandColumn(["foo"]);
    });

    test("expandColumn pass current row state", 2, function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    equal(options.data.rows.length, 1);
                    equal(options.data.rows[0].name, "baz");

                    options.success({
                        axes: { columns: {}},
                        data: []
                    });
                }
            }
        });

        dataSource.expandColumn("foo");
    });

    test("expandRow does not add measures to columns state", 4, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: ["foo"],
            rows: ["baz"],
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "foo", children: [] }, { name: "measure 1", children: [] } ] },
                                    { members: [ { name: "foo", children: [] }, { name: "measure 2", children: [] } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "baz", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.rows.length, 1);
            equal(options.data.rows[0].name, "baz");

            equal(options.data.columns.length, 1);
            equal(options.data.columns[0].name, "foo");
        }

        dataSource.expandRow("baz");
    });

    test("query clears measures", 2, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            measures: ["baz"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    equal(options.data.measures.length, 0);

                    options.success({
                        axes: { },
                        data: []
                    });
                }
            }
        });

        dataSource.query({});

        equal(dataSource.measures().length, 0);
    });

    test("fetch pass measures", 2, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            measures: ["baz"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    equal(options.data.measures.length, 1);
                    equal(options.data.measures[0], "baz");

                    options.success({
                        axes: { },
                        data: []
                    });
                }
            }
        });

        dataSource.fetch();
    });

    test("fetch pass current columns and rows state", 6, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {

                    callback(options.data);

                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] },
                                    { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 1", children: [] } ] },
                                    { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 2", parentName: "level 1", children: [] } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                                    { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                                    { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 1", parentName: "row level 0", children: [] } ] },
                                    { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 1", children: [] } ] },
                                    { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 2", parentName: "row level 1", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(e) {
            equal(e.columns.length, 2);
            equal(e.columns[0].name, "level 0");
            equal(e.columns[1].name, "level 1");

            equal(e.rows.length, 2);
            equal(e.rows[0].name, "row level 0");
            equal(e.rows[1].name, "row level 1");
        };

        dataSource.fetch();
    });

    test("fetch without options clears current axes data", 3, function() {
        var result = {
            axes: {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] },
                        { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 1", children: [] } ] },
                        { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 2", parentName: "level 1", children: [] } ] }
                    ]
                },
                rows: {
                    tuples: [
                        { members: [ { name: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 1", parentName: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 1", children: [] } ] },
                        { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 2", parentName: "row level 1", children: [] } ] }
                    ]
                }
            },
            data: [1,2,3,4,5,6,7,8,9,0]// some data
        };

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success(result);
                }
            }
        });

        dataSource.read();

        result = { axes: { }, data: [] };

        dataSource.fetch();

        equal(dataSource.axes().columns.tuples.length, 0);
        equal(dataSource.axes().rows.tuples.length, 0);
        equal(dataSource.data().length, 0);
    });

    test("filter clears current axes data", 3, function() {
        var result = {
            axes: {
                columns: {
                    tuples: [
                        { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                        { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] },
                        { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 1", children: [] } ] },
                        { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 2", parentName: "level 1", children: [] } ] }
                    ]
                },
                rows: {
                    tuples: [
                        { members: [ { name: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 1", parentName: "row level 0", children: [] }, { name: "row level 1", parentName: "row level 0", children: [] } ] },
                        { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 1", children: [] } ] },
                        { members: [ { name: "row level 2", parentName: "row level 1", children: [] }, { name: "row level 2", parentName: "row level 1", children: [] } ] }
                    ]
                }
            },
            data: [1,2,3,4,5,6,7,8,9,0]// some data
        };

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success(result);
                }
            }
        });

        dataSource.read();

        result = { axes: { }, data: [] };

        dataSource.filter({ field: "foo", operator: "eq", value: "bar" });

        equal(dataSource.axes().columns.tuples.length, 0);
        equal(dataSource.axes().rows.tuples.length, 0);
        equal(dataSource.data().length, 0);
    });

    test("filter current columns and rows state is send to the server", 7, function() {
        var result = {
            axes: {
                columns: {
                    tuples: [
                        { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", children: [], hierarchy: "[level 1]" } ] }
                    ]
                },
                rows: {
                    tuples: [
                        { members: [ { name: "[row 0]", children: [], hierarchy: "[row 0]" } ] },
                        { members: [ { name: "[row 0].&[1]", parentName: "[row 0]", children: [] } ] },
                        { members: [ { name: "[row 0].&[2]", parentName: "[row 0]", children: [] } ] }
                    ]
                }
            },
            data: []
        };

        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[level 0]", expand: false}, "[level 1]"],
            rows: [{ name: "[row 0]", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);
                    options.success(result);
                }
            }
        });

        dataSource.read();

        result = {
            axes: {
                columns: {
                    tuples: [
                        { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", children: [], hierarchy: "[level 1]" } ] },
                        { members: [ { name: "[level 0].&[1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                        { members: [ { name: "[level 0].&[2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] }
                    ]
                },
                rows: {
                    tuples: [
                        { members: [ { name: "[row 0]", children: [], hierarchy: "[row 0]" } ] },
                        { members: [ { name: "[row 0].&[1]", parentName: "[row 0]", children: [] } ] },
                        { members: [ { name: "[row 0].&[2]", parentName: "[row 0]", children: [] } ] }
                    ]
                }
            },
            data: []
        };


        dataSource.expandColumn("[level 0]");

        callback = function(options) {
            equal(options.data.columns.length, 2);
            equal(options.data.columns[0].name, "[level 0]");
            ok(options.data.columns[0].expand);
            equal(options.data.columns[1].name, "[level 1]");

            equal(options.data.rows.length, 1);
            equal(options.data.rows[0].name, "[row 0]");
            ok(options.data.rows[0].expand);
        }

        dataSource.filter({ field: "foo", operator: "eq", value: "bar" });
    });

    test("columnsAxisDescriptors returns columns state", 3, function() {
        var dataSource = new PivotDataSource({
            columns: [{ name: "[level 0]", expand: true }, {name: "[level 1]", expand: true }],
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
                                    { members: [ { name: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0]", children: [] }, { name: "[level 1].[level 1]", parentName: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0]", children: [] }, { name: "[level 1].[level 2]", parentName: "[level 1]", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var descriptors = dataSource.columnsAxisDescriptors();

        equal(descriptors.length, 2);
        equal(descriptors[0].name, "[level 0]");
        equal(descriptors[1].name, "[level 1]");
    });

    test("columnsAxisDescriptors multiple members and expanded child result in correct ordered members", 4, function() {
        var result = [{
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", hierarchy: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    },
                    {
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0].[level 2].[level 1]", parentName: "[level 0].[level 2]", children: [] }, { name: "[level 1]", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    }
        ];

        var dataSource = new PivotDataSource({
            columns: [{ name: "[level 0]", expand: true }, {name: "[level 1]"}],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success(result.shift());
                }
            }
        });

        dataSource.read();

        dataSource.expandColumn("[level 0].[level 2]");

        var descriptors = dataSource.columnsAxisDescriptors();

        equal(descriptors.length, 3);
        equal(descriptors[0].name, "[level 0]");
        equal(descriptors[1].name, "[level 0].[level 2]");
        equal(descriptors[2].name, "[level 1]");
    });

    test("columnsAxisDescriptors returns columns state for expanded dimention child", 4, function() {
        var dataSource = new PivotDataSource({
            columns: ["[level 0]", "[level 1]"],
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
                                    { members: [ { name: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    //{ members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    //{ members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0]", parentName: "[level 0]", children: [] }, { name: "[level 1].[level 0]", parentName: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0]", parentName: "[level 0]", children: [] }, { name: "[level 1].[level 1]", parentName: "[level 1]", children: [] } ] },
                                    { members: [ { name: "[level 0]", parentName: "[level 0]", children: [] }, { name: "[level 1].[level 1].[level 1]", parentName: "[level 1].[level 1]", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var descriptors = dataSource.columnsAxisDescriptors();

        equal(descriptors.length, 3);
        equal(descriptors[0].name, "[level 0]");
        equal(descriptors[1].name, "[level 1]");
        equal(descriptors[2].name, "[level 1].[level 1]");
    });

    test("columnsAxisDescriptors returns columns if no request is made", 2, function() {
        var dataSource = new PivotDataSource({
            columns: ["foo"],
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                }
            }
        });

        var descriptors = dataSource.columnsAxisDescriptors();

        equal(descriptors.length, 1);
        equal(descriptors[0].name, "foo");
    });

    test("rowsAxisDescriptors returns rows state", 3, function() {
        var dataSource = new PivotDataSource({
            rows: ["level 0"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {},
                            rows: {
                                tuples: [
                                    { members: [ { name: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 0", children: [] } ] },
                                    { members: [ { name: "level 1", parentName: "level 0", children: [] }, { name: "level 1", parentName: "level 0", children: [] } ] },
                                    { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 1", children: [] } ] },
                                    { members: [ { name: "level 2", parentName: "level 1", children: [] }, { name: "level 2", parentName: "level 1", children: [] } ] }
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        var descriptors = dataSource.rowsAxisDescriptors();

        equal(descriptors.length, 2);
        equal(descriptors[0].name, "level 0");
        equal(descriptors[1].name, "level 1");
    });

    test("rowsAxisDescriptors returns columns if no request is made", 2, function() {
        var dataSource = new PivotDataSource({
            rows: ["foo"],
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                }
            }
        });

        var descriptors = dataSource.rowsAxisDescriptors();

        equal(descriptors.length, 1);
        equal(descriptors[0].name, "foo");
    });

    test("columns pass current rows state", 6, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: ["[level 0]", "[level 1]"],
            rows: [{ name: "[row 0]", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {

                    callback(options);

                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", children: [], hierarchy: "[level 1]" } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "[row 0]", children: [], hierarchy: "[row 0]" } ] },
                                    { members: [ { name: "[row 0].[row 1]", parentName: "[row 0]", children: [] } ] },
                                    { members: [ { name: "[row 0].[row 2]", parentName: "[row 0]", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.columns.length, 1, "Number of columns does not match");
            equal(options.data.columns[0].name, "[level 0]");
            ok(!options.data.columns[0].expand);

            equal(options.data.rows.length, 1, "Number of rows does not match");
            equal(options.data.rows[0].name, "[row 0]");
            ok(options.data.rows[0].expand);
        };

        dataSource.columns("[level 0]");
    });

    test("rows pass current columns state", 5, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: ["[level 0]", "[level 1]"],
            rows: [{ name: "[row 0]", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {

                    callback(options);

                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", children: [], hierarchy: "[level 1]" } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "[row 0]", children: [], hierarchy: "[row 0]" } ] },
                                    { members: [ { name: "[row 0].[row 1]", parentName: "[row 0]", children: [] } ] },
                                    { members: [ { name: "[row 0].[row 2]", parentName: "[row 0]", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.columns.length, 2, "Number of columns does not match");
            equal(options.data.columns[0].name, "[level 0]");
            ok(!options.data.columns[0].expand);
            equal(options.data.columns[1].name, "[level 1]");
            ok(!options.data.columns[1].expand);
        };

        dataSource.rows("[row 0]");
    });

    test("expandColumn pass current columns state when expanding top member", 4, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: ["[level 0]", "[level 1]"],
            rows: [{ name: "[row 0]", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {

                    callback(options);

                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" }, { name: "[level 1]", children: [], hierarchy: "[level 1]" } ] }
                                ]
                            },
                            rows: {
                                tuples: [
                                    { members: [ { name: "[row 0]", children: [], hierarchy: "[row 0]" } ] },
                                    { members: [ { name: "[row 0].[row 1]", parentName: "[row 0]", children: [] } ] },
                                    { members: [ { name: "[row 0].[row 2]", parentName: "[row 0]", children: [] } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        callback = function(options) {
            equal(options.data.columns.length, 2, "Number of columns does not match");
            equal(options.data.columns[0].name, "[level 0]");
            ok(options.data.columns[0].expand);
            equal(options.data.columns[1].name, "[level 1]");
        };

        dataSource.expandColumn("[level 0]");
    });

    test("expandColumn pass current columns state when expanding bottom member", 4, function() {
        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    equal(options.data.columns.length, 2);
                    equal(options.data.columns[0].name, "[foo].&[1]");
                    equal(options.data.columns[1].name, "[bar].&[1]");
                    ok(options.data.columns[1].expand);

                    options.success({
                        axes: { columns: {}},
                        data: []
                    });
                }
            }
        });

        dataSource.expandColumn(["[foo].&[1]", "[bar].&[1]"]);
    });

    test("expandColumn pass current columns state when expanding same level member", 3, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[level 0]", expand: true}],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);
                }
            }
        });

        callback = function(options) {
            options.success({
                axes: {
                    columns: {
                        tuples: [
                            { members: [ { name: "[level 0]", children: [] } ] },
                            { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] } ] },
                            { members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] } ] },
                        ]
                    }
                },
                data: []
            });
        }

        dataSource.read();

        callback = function(options) {
            options.success({
                axes: {
                    columns: {
                        tuples: [
                            { members: [ { name: "[level 0].[level 1]", children: [] } ] },
                            { members: [ { name: "[level 0].[level 1].[level 0]", parentName: "[level 0].[level 1]", children: [] } ] }
                        ]
                    }
                },
                data: []
            });
        }

        dataSource.expandColumn(["[level 0].[level 1]"]);

        callback = function(options) {
            equal(options.data.columns.length, 1);
            equal(options.data.columns[0].name, "[level 0].[level 2]");
            ok(options.data.columns[0].expand);
        }

        dataSource.expandColumn(["[level 0].[level 2]"]);
    });

    test("expandColumn pass current columns state when expanding bottom then top dimention", 5, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[level 0]", expand: true},{ name:"[level 1]"}],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);
                }
            }
        });

        callback = function(options) {
            options.success({
                axes: {
                    columns: {
                        tuples: [
                            { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" },{ name: "[level 1]", children: [], hierarchy: "[level 1]" } ] },
                            { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                            { members: [ { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                        ]
                    }
                },
                data: []
            });
        }

        dataSource.read();

        callback = function(options) {
            options.success({
                axes: {
                    columns: {
                        tuples: [
                            { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1]", children: [] } ] },
                            { members: [ { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] }, { name: "[level 1].[level 1]", parentName: "[level 1]", children: [] } ] }
                        ]
                    }
                },
                data: []
            });
        }

        dataSource.expandColumn(["[level 0].[level 1]","[level 1]"]);

        callback = function(options) {
            equal(options.data.columns.length, 2);
            equal(options.data.columns[0].name, "[level 0].[level 1]");
            ok(options.data.columns[0].expand);
            equal(options.data.columns[1].name, "[level 1]");
            ok(!options.data.columns[1].expand);
        }

        dataSource.expandColumn(["[level 0].[level 1]"]);
    });


    test("expandColumn pass current columns state when expanding bottom member multiple members", 5, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            columns: [{ name:"[level 0]", expand: true}, { name: "[level 1]", expand: true }, "[level 2]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);
                    options.success({
                        axes: {
                            columns: {
                                tuples: [
                                    { members: [
                                        { name: "[level 0]", children: [], hierarchy: "[level 0]" },
                                        { name: "[level 1]", children: [], hierarchy: "[level 1]" },
                                        { name: "[level 2]", children: [], hierarchy: "[level 2]" }
                                    ]},
                                    { members: [
                                        { name: "[level 0].&[1]", parentName: "[level 0]", children: [] },
                                        { name: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0].&[2]", parentName: "[level 0]", children: [] },
                                        { name: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0]", children: [] },
                                        { name: "[level 1].&[1]", parentName: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0]", children: [] },
                                        { name: "[level 1].&[2]", parentName: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]}
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.columns.length, 3);
            equal(options.data.columns[0].name, "[level 0].&[1]");
            equal(options.data.columns[1].name, "[level 1].&[1]");
            ok(options.data.columns[1].expand);
            equal(options.data.columns[2].name, "[level 2]");
        }

        dataSource.expandColumn(["[level 0].&[1]", "[level 1].&[1]"]);
    });

    test("expandRow pass current columns state", 3, function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: {},
                read: function(options) {
                    equal(options.data.columns.length, 2);
                    equal(options.data.columns[0].name, "foo");
                    equal(options.data.columns[1].name, "bar");

                    options.success({
                        axes: { columns: {}},
                        data: []
                    });
                }
            }
        });

        dataSource.expandRow("baz");
    });

    test("expandRow pass current row state when expanding top member", 4, function() {
        var callback = $.noop;
        var dataSource = new PivotDataSource({
            rows: ["[level 0]", "[level 1]"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);

                    options.success({
                        axes: {
                            columns: {},
                            rows: {
                                tuples: [
                                    { members: [ { name: "[level 0]", children: [], hierarchy: "[level 0]" },{ name: "[level 1]", children: [], hierarchy: "[level 1]" } ] },
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.rows.length, 2);
            equal(options.data.rows[0].name, "[level 0]");
            ok(options.data.rows[0].expand);
            equal(options.data.rows[1].name, "[level 1]");
        }

        dataSource.expandRow("[level 0]");
    });

    test("expandRow pass current row state when expanding bottom member", 4, function() {
        var dataSource = new PivotDataSource({
            rows: [{ name:"[foo]", expand: true}, "[bar]"],
            columns: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    equal(options.data.rows.length, 2);
                    equal(options.data.rows[0].name, "[foo].&[1]");
                    equal(options.data.rows[1].name, "[bar].&[1]");
                    ok(options.data.rows[1].expand);

                    options.success({
                        axes: { columns: {}},
                        data: []
                    });
                }
            }
        });

        dataSource.expandRow(["[foo].&[1]", "[bar].&[1]"]);
    });

    test("expandRow pass current row state when expanding bottom member multiple members", 5, function() {
        var callback = $.noop;

        var dataSource = new PivotDataSource({
            rows: [{ name:"[level 0]", expand: true}, { name: "[level 1]", expand: true }, "[level 2]"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    callback(options);

                    options.success({
                        axes: {
                            columns: {},
                            rows: {
                                tuples: [
                                    { members: [
                                        { name: "[level 0]", children: [], hierarchy: "[level 0]" },
                                        { name: "[level 1]", children: [], hierarchy: "[level 1]" },
                                        { name: "[level 2]", children: [], hierarchy: "[level 2]" }
                                    ]},
                                    { members: [
                                        { name: "[level 0].&[1]", parentName: "[level 0]", children: [] },
                                        { name: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0].&[2]", parentName: "[level 0]", children: [] },
                                        { name: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0]", children: [] },
                                        { name: "[level 1].&[1]", parentName: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]},
                                    { members: [
                                        { name: "[level 0]", children: [] },
                                        { name: "[level 1].&[2]", parentName: "[level 1]", children: [] },
                                        { name: "[level 2]", children: [] }
                                    ]}
                                ]
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();

        callback = function(options) {
            equal(options.data.rows.length, 3);
            equal(options.data.rows[0].name, "[level 0].&[1]");
            equal(options.data.rows[1].name, "[level 1].&[1]");
            ok(options.data.rows[1].expand);
            equal(options.data.rows[2].name, "[level 2]");
        }

        dataSource.expandRow(["[level 0].&[1]", "[level 1].&[1]"]);
    });

    test("expandRow issue a request", 1, function() {
        var dataSource = new PivotDataSource({
            columns: "bar",
            rows: ["foo"]
        });

        dataSource.bind("requestStart", function() {
            ok(true);
        });

        dataSource.expandRow("foo");
    });


    module("XmlaTransport initialziation", { });

    test("connection settings are passed to the parameterMap", function() {
        var transport = new kendo.data.XmlaTransport({
            connection: {
                catalog: "catalogName",
                cube: "cubeName"
            },
            read: {},
            parameterMap: function(options, type) {
                equal(options.connection.catalog, "catalogName");
                equal(options.connection.cube, "cubeName");
            }
        });

        transport.read({success: $.noop, data: {}});
    });

    test("discover use read settings if not set", function() {
        var transport = new kendo.data.XmlaTransport({ read: "foo" });

        equal(transport.options.discover.url, "foo");
    });

    test("discover as string", function() {
        var transport = new kendo.data.XmlaTransport({ discover: "foo" });

        equal(transport.options.discover.url, "foo");
    });

    test("discover as function", 1, function() {
        var transport = new kendo.data.XmlaTransport({
            discover: function() {
                ok(true);
            }
        });

        transport.discover();
    });

    test("discover pass correct type to the parameterMap", function() {
        var transport = new kendo.data.XmlaTransport({
            discover: {},
            parameterMap: function(options, type) {
                equal(type, "discover");
            }
        });

        transport.discover({success: $.noop, data: {}});
    });


    test("parameterMap create empty statment wrap", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName" } }, "read");

       ok(params.indexOf('<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Execute xmlns="urn:schemas-microsoft-com:xml-analysis"><Command><Statement>') == 0);
       ok(params.indexOf('</Statement></Command><Properties><PropertyList><Catalog>catalogName</Catalog></PropertyList></Properties></Execute></Body></Envelope>') > -1);
    });

    test("parameterMap create empty select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" } }, "read");

       ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap create single column select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[foo]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap columns are expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[foo]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo].[(ALL)].MEMBERS,[foo].[ALL].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap row is expanded", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[(ALL)].MEMBERS,[foo].[ALL].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create empty column and single row select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create column and row select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[bar]" }], rows: [{ name: "[foo]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create single measure is added to the where", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName", cube: "cubeName" },
           columns: [{ name: "[bar]" }],
           rows: [{ name: "[foo]" }],
           measures: ["[baz]"]
       }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName] WHERE ([baz])') > -1);
    });

    test("parameterMap measure is added as column if no columns are set", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            rows: [{ name: "[foo]" }],
            measures: ["[baz]"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[baz]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap multiple measures are added as row if no rows are set and axis is rows", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[baz]", "[bar]"],
            measuresAxis: "rows"
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[baz],[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap multiple measures are added as row if no columns are set and axis is rows", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            rows: [{ name: "[foo]" }],
            measures: ["[baz]", "[bar]"],
            measuresAxis: "rows"
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{{[baz],[bar]}})} ' +
           'DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap measures are added to the correct axis", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName", cube: "cubeName" },
           columns: [ { name: "[foo]" }],
           rows: [ { name: "[bar]" }],
           measures: ["[measure1]","[measure2]"],
           measuresAxis: "rows"
       }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo].[(ALL)].MEMBERS} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS,' +
           ' NON EMPTY {CROSSJOIN({[bar].[(ALL)].MEMBERS},{{[measure1],[measure2]}})} ' +
           'DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap & is encoded", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].&[1]" }],
            rows: [{ name: "[baz].&[2]" }],
            measures: ["[bar].&[3]"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo].&amp;[1]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
        'NON EMPTY {[baz].&amp;[2]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName] WHERE ([bar].&amp;[3])') > -1);
    });

    test("parameterMap multiple columns are cross joined", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].[ALL].Children},{[bar].[(ALL)].MEMBERS})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap leaf is cross joined with one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].&[baz]", expand: true }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].&amp;[baz]},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].&amp;[baz].Children},{[bar].[(ALL)].MEMBERS})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with second one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }, { name: "[bar]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[ALL].Children})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with two expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[bar]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].[ALL].Children},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[ALL].Children}),' +
            'CROSSJOIN({[foo].[ALL].Children},{[bar].[ALL].Children})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 3 members", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[foo].&[1]", expand: true }, { name: "[bar]", expand: false }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].[ALL].Children},{[bar].[(ALL)].MEMBERS}),' +
            'CROSSJOIN({[foo].&amp;[1].Children},{[bar].[(ALL)].MEMBERS})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 2 members", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[foo].&[1]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo].[(ALL)].MEMBERS,' +
            '[foo].[ALL].Children,' +
            '[foo].&amp;[1].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 2 members and 2 measures", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[foo].&[1]", expand: true }],
            measures: [ "measure1", "measure2"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{{measure1,measure2}}),CROSSJOIN({[foo].[ALL].Children},{{measure1,measure2}}),'+
            'CROSSJOIN({[foo].&amp;[1].Children},{{measure1,measure2}})}' +
            ' DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });


    test("parameterMap multiple rows are cross joined", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            rows: [{ name: "[foo]" }, { name: "[bar]" }],
            measures: ["[baz]"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[baz]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
            'NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{[bar].[(ALL)].MEMBERS})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple measures are cross joined with columns", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[(ALL)].MEMBERS},{{[bar],[baz]}})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap in filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "in", value: "[foo].&[1], [foo].&[2]" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT ({[foo].&amp;[1], [foo].&amp;[2]}) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap contains filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "contains", field: "[foo]", value: "zoo" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT (Filter([foo].[ALL].Children, InStr([foo].MemberValue,"zoo"))) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap startswith filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "startswith", field: "[foo]", value: "zoo" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT (Filter([foo].[ALL].Children, Left([foo].MemberValue,Len("zoo"))="zoo")) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap endswith filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "endswith", field: "[foo]", value: "zoo" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT (Filter([foo].[ALL].Children, Right([foo].MemberValue,Len("zoo"))="zoo")) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap create empty discover statment wrap", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName" } }, "discover");

       ok(params.indexOf('<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Header/><Body><Discover xmlns="urn:schemas-microsoft-com:xml-analysis">') == 0);
       ok(params.indexOf('</Discover></Body></Envelope>') > -1);
    });

    test("parameterMap discover command is set as request type", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName" },
           command: "schemaCubes"
       }, "discover");

       ok(params.indexOf('<RequestType>MDSCHEMA_CUBES</RequestType>') > -1);
    });

    test("parameterMap discover custom command is set as request type", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName" },
           command: "myCustomCommand"
       }, "discover");

       ok(params.indexOf('<RequestType>myCustomCommand</RequestType>') > -1);
    });

    test("parameterMap discover empty restrictionlist is added if no restrictions are set", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName" }
       }, "discover");

       ok(params.indexOf("<Restrictions><RestrictionList/></Restrictions>") > -1);
    });

    test("parameterMap discover empty properties is added if no properties are set", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { }
       }, "discover");

       ok(params.indexOf('<Properties><PropertyList/></Properties>') > -1);
    });

    test("parameterMap discover properties are added to PropertyList", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { },
           properties: { foo: "fooValue", bar: "barValue"}
       }, "discover");

       ok(params.indexOf('<Properties><PropertyList><foo>fooValue</foo><bar>barValue</bar></PropertyList></Properties>') > -1);
    });

    test("parameterMap discover restrictions are added to RestrictionList", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { },
           restrictions: { foo: "fooValue", bar: "barValue"}
       }, "discover");

       ok(params.indexOf('<Restrictions><RestrictionList><foo>fooValue</foo><bar>barValue</bar></RestrictionList></Restrictions>') > -1);
    });

    module("XmlaDataReader initialziation", { });

    test("parse returns the body tag content", function() {
        var reader = new kendo.data.XmlaDataReader({ });
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><foo>bar</foo></soap:Body></soap:Envelope>';

        var body = reader.parse(response);
        equal(body.foo["#text"], "bar");
    });

    test("errors are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({ });
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <soap:Fault xmlns="http://schemas.xmlsoap.org/soap/envelope/"> <faultcode>code</faultcode> <faultstring>description</faultstring> <detail> <Error ErrorCode="3238985738" Description="description" HelpFile="" /> </detail> </soap:Fault> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var errors = reader.errors(body);

        equal(errors.length, 1);
        equal(errors[0].faultcode, "code");
        equal(errors[0].faultstring, "description");
    });

    test("axes are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({ });
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root> <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"> </xs:schema> <OlapInfo></OlapInfo><Axes><Axis name="Axis0"><Tuples> <Tuple> <Member Hierarchy="[Date].[Calendar]"> <UName>[Date].[Calendar].[Year].&amp;[2005]</UName> <Caption>2005</Caption> <LName>[Date].[Calendar].[Year]</LName> <LNum>1</LNum> <DisplayInfo>2</DisplayInfo> <CHILDREN_CARDINALITY>2</CHILDREN_CARDINALITY> <PARENT_UNIQUE_NAME>[Date].[Calendar].[All]</PARENT_UNIQUE_NAME> </Member> </Tuple> </Tuples> </Axis> <Axis name="Axis1"> <Tuples> <Tuple> <Member Hierarchy="[Product].[Product Name]"> <UName>[Product].[Product Name].[All]</UName> <Caption>All</Caption> <LName>[Product].[Product Name].[(All)]</LName> <LNum>0</LNum> <DisplayInfo>504</DisplayInfo> <CHILDREN_CARDINALITY>504</CHILDREN_CARDINALITY> </Member> </Tuple> </Tuples> </Axis> <Axis name="SlicerAxis"> <Tuples> <Tuple> <Member Hierarchy="[Measures]"> <UName>[Measures].[Internet Order Lines Count]</UName> <Caption>Internet Order Lines Count</Caption> <LName>[Measures].[MeasuresLevel]</LName> <LNum>0</LNum> <DisplayInfo>0</DisplayInfo> </Member></Tuple> </Tuples> </Axis> </Axes> <CellData> </CellData> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var axes = reader.axes(body);

        equal(axes.columns.tuples.length, 1);
        equal(axes.rows.tuples.length, 1);
    });

    test("empty column axes and no rows", function() {
        var reader = new kendo.data.XmlaDataReader({ });
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root> <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"> </xs:schema><OlapInfo></OlapInfo> <Axes> <Axis name="Axis0"> <Tuples/> </Axis> <Axis name="SlicerAxis"> <Tuples> <Tuple> <Member Hierarchy="[Measures]"> <UName>[Measures].[Internet Order Lines Count]</UName> <Caption>Internet Order Lines Count</Caption> <LName>[Measures].[MeasuresLevel]</LName> <LNum>0</LNum> <DisplayInfo>0</DisplayInfo> </Member>                 </Tuple> </Tuples> </Axis> </Axes> <CellData> </CellData> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var axes = reader.axes(body);

        equal(axes.columns.tuples.length, 0);
        ok(!axes.rows.tuples);
    });

    test("axes tuples are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({ });
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root> <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"> </xs:schema> <OlapInfo></OlapInfo><Axes><Axis name="Axis0"><Tuples> <Tuple> <Member Hierarchy="[Date].[Calendar]"> <UName>[Date].[Calendar].[Year].&amp;[2005]</UName> <Caption>2005</Caption> <LName>[Date].[Calendar].[Year]</LName> <LNum>1</LNum> <DisplayInfo>2</DisplayInfo> <CHILDREN_CARDINALITY>2</CHILDREN_CARDINALITY> <PARENT_UNIQUE_NAME>[Date].[Calendar].[All]</PARENT_UNIQUE_NAME> </Member> </Tuple> </Tuples> </Axis> <Axis name="Axis1"> <Tuples> <Tuple> <Member Hierarchy="[Product].[Product Name]"> <UName>[Product].[Product Name].[All]</UName> <Caption>All</Caption> <LName>[Product].[Product Name].[(All)]</LName> <LNum>0</LNum> <DisplayInfo>504</DisplayInfo> <CHILDREN_CARDINALITY>504</CHILDREN_CARDINALITY> </Member> </Tuple> </Tuples> </Axis> <Axis name="SlicerAxis"> <Tuples> <Tuple> <Member Hierarchy="[Measures]"> <UName>[Measures].[Internet Order Lines Count]</UName> <Caption>Internet Order Lines Count</Caption> <LName>[Measures].[MeasuresLevel]</LName> <LNum>0</LNum> <DisplayInfo>0</DisplayInfo> </Member></Tuple> </Tuples> </Axis> </Axes> <CellData> </CellData> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var axes = reader.axes(body);

        var columnTuples = axes.columns.tuples;
        var rowTuples = axes.rows.tuples;

        equal(columnTuples[0].members.length, 1);
        equal(columnTuples[0].members[0].caption, "2005");
        equal(columnTuples[0].members[0].hasChildren, true);
        equal(columnTuples[0].members[0].parentName, "[Date].[Calendar].[All]");
        equal(columnTuples[0].members[0].name, "[Date].[Calendar].[Year].&[2005]");
        equal(columnTuples[0].members[0].hierarchy, "[Date].[Calendar]");

        equal(rowTuples[0].members.length, 1);
    });

    test("data is read for response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla">         <Axes> <Axis name="Axis0">                 </Axis> </Axes> <CellData> <Cell CellOrdinal="0"> <Value xsi:type="xsd:long">1013</Value> <FmtValue>1013</FmtValue> </Cell> <Cell CellOrdinal="1"> <Value xsi:type="xsd:long">1014</Value> <FmtValue>1014</FmtValue> </Cell></CellData> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var data = reader.data(body);

        equal(data.length, 2);
        equal(data[0].value, 1013);
        equal(data[0].ordinal, 0);
        equal(data[0].fmtValue, "1013");
        equal(data[1].value, 1014);
        equal(data[1].ordinal, 1);
        equal(data[1].fmtValue, "1014");
    });

    test("data is read for response - empty celldata", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla">         <Axes> <Axis name="Axis0">                 </Axis> </Axes> <CellData/> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var data = reader.data(body);

        equal(data.length, 0);
    });

    test("data with missing values", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <ExecuteResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla">         <Axes> <Axis name="Axis0">                 </Axis> </Axes> <CellData> <Cell CellOrdinal="0"> <Value xsi:type="xsd:long">1013</Value> <FmtValue>1013</FmtValue> </Cell> <Cell CellOrdinal="2"> <Value xsi:type="xsd:long">1014</Value> <FmtValue>1014</FmtValue> </Cell></CellData> </root> </return> </ExecuteResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var data = reader.data(body);

        equal(data.length, 2);
        equal(data[0].value, 1013);
        equal(data[0].ordinal, 0);
        equal(data[0].fmtValue, "1013");

        equal(data[1].value, 1014);
        equal(data[1].ordinal, 2);
        equal(data[1].fmtValue, "1014");
    });

})();
