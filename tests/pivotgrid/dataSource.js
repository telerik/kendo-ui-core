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
                                tuples: [ { members: [ { caption: "foo" } ] },  { members: [ { caption: "bar" } ] }, { members: [ { caption: "baz" } ] }, { members: [ { caption: "moo" } ] }]
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

    test("expand sets the column as expanded", function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar", { name: "baz", expand: true } ]
        });

        dataSource.expand("foo");

        equal(dataSource.columns()[0].name, "foo");
        ok(dataSource.columns()[0].expand);
    });

    test("expand sets the row as expanded", function() {
        var dataSource = new PivotDataSource({
            rows: ["foo", "bar", { name: "baz", expand: true } ]
        });

        dataSource.expand("foo");

        equal(dataSource.rows()[0].name, "foo");
        ok(dataSource.rows()[0].expand);
    });

    test("expand issue an request", 1, function() {
        var dataSource = new PivotDataSource({
            columns: ["foo", "bar", { name: "baz", expand: true } ]
        });

        dataSource.bind("requestStart", function() {
            ok(true);
        });

        dataSource.expand("foo");
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

       ok(params.indexOf('SELECT NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap columns are expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[foo]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo].[ALL].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap leafs are not expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[foo].&[bar]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo].&amp;[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap row is expanded", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo].[ALL].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create empty column and single row select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create column and row select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[bar]" }], rows: [{ name: "[foo]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create single measure is added to the where", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName", cube: "cubeName" },
           columns: [{ name: "[bar]" }],
           rows: [{ name: "[foo]" }],
           measures: ["[baz]"]
       }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName] WHERE ([baz])') > -1);
    });

    test("parameterMap measure is added as column if no columns are set", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { catalog: "catalogName", cube: "cubeName" },
           rows: [{ name: "[foo]" }],
           measures: ["[baz]"]
       }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[baz]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap & is encoded", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].&[1]" }],
            rows: [{ name: "[baz].&[2]" }],
            measures: ["[bar].&[3]"]
        }, "read");

        console.log(params);

        ok(params.indexOf('SELECT NON EMPTY {[foo].&amp;[1]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
        'NON EMPTY {[baz].&amp;[2]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName] WHERE ([bar].&amp;[3])') > -1);
    });

    test("parameterMap multiple columns are cross joined", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple rows are cross joined", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            rows: [{ name: "[foo]" }, { name: "[bar]" }],
            measures: ["[baz]"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[baz]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
            'NON EMPTY {CROSSJOIN({[foo]},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple measures are cross joined with columns", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"]
        }, "read");

        console.log(params);

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{{[bar],[baz]}})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
           'FROM [cubeName]') > -1);
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
