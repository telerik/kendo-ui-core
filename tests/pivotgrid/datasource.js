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

    test("setting columns", function() {
        var dataSource = new PivotDataSource({
            columns: [{ name: "foo", expand: true }, "bar"]
        });

        dataSource.columns("baz");

        equal(dataSource.columns().length, 1)
        equal(dataSource.columns()[0].name, "baz");
        ok(!dataSource.columns()[0].expand);
    });

    test("setting columns to empty array", function() {
        var dataSource = new PivotDataSource({
            columns: [{ name: "foo", expand: true }, "bar"]
        });

        dataSource.columns([]);
        equal(dataSource.columns().length, 0)
    });

    test("setting rows", function() {
        var dataSource = new PivotDataSource({
            rows: [{ name: "foo", expand: true }, "bar"]
        });

        dataSource.rows("baz");

        equal(dataSource.rows().length, 1)
        equal(dataSource.rows()[0].name, "baz");
        ok(!dataSource.rows()[0].expand);
    });

    test("setting rows to empty array", function() {
        var dataSource = new PivotDataSource({
            rows: [{ name: "foo", expand: true }, "bar"]
        });

        dataSource.rows([]);
        equal(dataSource.rows().length, 0)
    });

    test("setting measures", function() {
        var dataSource = new PivotDataSource({
            measures: ["foo", "bar"]
        });

        dataSource.measures("baz");

        equal(dataSource.measures().length, 1)
        equal(dataSource.measures()[0], "baz");
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

    test("schemaCatalogs calls the transport discover", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    equal(options.data.command, "schemaCatalogs");
                }
            }
        });

        dataSource.schemaCatalogs();
    });

    test("schemaMembers calls the transport discover", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                discover: function(options) {
                    equal(options.data.command, "schemaMembers");
                }
            }
        });

        dataSource.schemaMembers();
    });

    test("schemaMeasures calls the transport discover", 3, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaMeasures");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                }
            }
        });

        dataSource.schemaMeasures();
    });

    test("schemaDimensions calls the transport discover", 3, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaDimensions");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                }
            }
        });

        dataSource.schemaDimensions();
    });

    test("schemaHierarchies calls the transport discover", 4, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaHierarchies");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                    equal(options.data.restrictions.dimensionUniqueName, "dimensionName");
                }
            }
        });

        dataSource.schemaHierarchies("dimensionName");
    });

    test("schemaLevels calls the transport discover", 4, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaLevels");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                    equal(options.data.restrictions.hierarchyUniqueName, "hierarchyName");
                }
            }
        });

        dataSource.schemaLevels("hierarchyName");
    });

    test("schemaCubes calls reader cubes method", 1, function() {
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

    test("schemaCatalogs calls reader catalogs method", 1, function() {
        var dataSource = new PivotDataSource({
            schema: {
                catalogs: function() {
                    ok(true);
                }
            }
        });

        dataSource.schemaCatalogs();
    });

    test("schemaMembers calls the transport discover", 3, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaMembers");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                }
            }
        });

        dataSource.schemaMembers();
    });

    test("schemaMembers calls the transport discover with additional restrictions", 4, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "foo",
                    cube: "bar"
                },
                discover: function(options) {
                    equal(options.data.command, "schemaMembers");
                    equal(options.data.restrictions.catalogName, "foo");
                    equal(options.data.restrictions.cubeName, "bar");
                    equal(options.data.restrictions.foo, "baz");
                }
            }
        });

        dataSource.schemaMembers({
            foo: "baz"
        });
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
                                tuples: [
                                    { members: [ { caption: "foo", children: [] } ] },
                                    { members: [ { caption: "bar", children: [] } ] },
                                    { members: [ { caption: "baz", children: [] } ] },
                                    { members: [ { caption: "moo", children: [] } ] }
                                ]
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

    test("expand of nested tuple with multiple measures", 3, function() {
        var columnTuples = [
            [
                {
                    members: [
                        { name: "[level 0]", children: [] },
                        { name: "measure 1", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0]", children: [] },
                        { name: "measure 2", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] },
                        { name: "measure 1", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 1]", parentName: "[level 0]", children: [] },
                        { name: "measure 2", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] },
                        { name: "measure 1", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] },
                        { name: "measure 2", children: [] }
                    ]
                }
            ],
            [
                {
                    members: [
                        { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] },
                        { name: "measure 1", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 2]", parentName: "[level 0]", children: [] },
                        { name: "measure 2", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 2].[level 0]", parentName: "[level 0].[level 2]", children: [] },
                        { name: "measure 1", children: [] }
                    ]
                },
                {
                    members: [
                        { name: "[level 0].[level 2].[level 0]", parentName: "[level 0].[level 2]", children: [] },
                        { name: "measure 2", children: [] }
                    ]
                }
            ]
        ];
        var dataSource = new PivotDataSource({
            columns: [{ name: "[level 0]", expand: true }],
            measures: ["measure 1", "measure 2"],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success({
                        axes: {
                            columns: {
                                tuples: columnTuples.shift()
                            }
                        },
                        data: []
                    });
                }
            }
        });

        dataSource.read();
        dataSource.expandColumn("[level 0].[level 2]");

        var descriptors = dataSource.columnsAxisDescriptors();

        equal(descriptors.length, 2);
        equal(descriptors[0].name, "[level 0]");
        equal(descriptors[1].name, "[level 0].[level 2]");
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

    test("catalog returns the transport current catalog", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "myCatalog"
                }
            }
        });

        equal(dataSource.catalog(),"myCatalog");
    });

    test("catalog sets the transport current catalog", 2, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    catalog: "myCatalog"
                }
            }
        });

        dataSource.catalog("newCatalog");

        equal(dataSource.catalog(),"newCatalog");
        equal(dataSource.transport.options.connection.catalog, "newCatalog");
    });

    test("cube returns the transport current cube", 1, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    cube: "myCube"
                }
            }
        });

        equal(dataSource.cube(),"myCube");
    });

    test("cube sets the transport current cube", 2, function() {
        var dataSource = new PivotDataSource({
            transport: {
                connection: {
                    cube: "myCube"
                }
            }
        });

        dataSource.cube("newCube");

        equal(dataSource.cube(),"newCube");
        equal(dataSource.transport.options.connection.cube, "newCube");
    });

    test("setting cube clears datasource state", 3, function() {
        var result = [{
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
        }, {
            axes: { },
            data: []
        }];

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success(result.shift());
                },
                connection: {
                    cube: "myCube"
                }
            }
        });

        dataSource.read();

        dataSource.cube("newCube");

        ok(!dataSource.axes().columns);
        ok(!dataSource.axes().rows);
        equal(dataSource.data().length, 0);
    });

    test("setting catalog clears datasource state", 3, function() {
        var result = [{
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
        }, {
            axes: { },
            data: []
        }];

        var dataSource = new PivotDataSource({
            columns: [{ name:"[foo]", expand: true}, "[bar]"],
            rows: [{ name: "baz", expand: true }],
            schema: {
                axes: "axes",
                data: "data"
            },
            transport: {
                read: function(options) {
                    options.success(result.shift());
                },
                connection: {
                    catalog: "myCatalog"
                }
            }
        });

        dataSource.read();

        dataSource.catalog("newCatalog");

        ok(!dataSource.axes().columns);
        ok(!dataSource.axes().rows);
        equal(dataSource.data().length, 0);
    });
})();
