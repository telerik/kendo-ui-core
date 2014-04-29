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
            columns: ["foo", "bar"]
        });

        equal(dataSource.columns()[0], "foo");
        equal(dataSource.columns()[1], "bar");
    });

    test("setting measures during initialization", function() {
        var dataSource = new PivotDataSource({
            measures: ["foo", "bar"]
        });

        equal(dataSource.measures()[0], "foo");
        equal(dataSource.measures()[1], "bar");
    });

    test("setting rows during initialization", function() {
        var dataSource = new PivotDataSource({
            rows: ["foo", "bar"]
        });

        equal(dataSource.rows()[0], "foo");
        equal(dataSource.rows()[1], "bar");
    });

    test("columns and rows are pass to the transport read", function() {
        var dataSource = new PivotDataSource({
            columns: ["foo"],
            rows: ["bar"],
            transport: {
                read: function(options) {
                    equal(options.data.columns[0], "foo");
                    equal(options.data.rows[0], "bar"); }
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

    test("read calls reader axes method", 1, function() {
        var dataSource = new PivotDataSource({
            schema: {
                axes: function() {
                    ok(true);
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
        ok(!columnTuples[0].members[0].hierarchy);

        equal(rowTuples[0].members.length, 1);
    });

})();
