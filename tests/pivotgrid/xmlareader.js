(function() {
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

    test("data is read from response", function() {
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

    test("data is read from response - empty celldata", function() {
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

    test("cubes read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row> <CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <CUBE_NAME>Adventure Works Internet Sales Model</CUBE_NAME> <CUBE_TYPE>CUBE</CUBE_TYPE> <LAST_SCHEMA_UPDATE>2014-04-03T14:29:44.573333</LAST_SCHEMA_UPDATE> <LAST_DATA_UPDATE>2014-04-03T14:30:07.106667</LAST_DATA_UPDATE> <DESCRIPTION /> <IS_DRILLTHROUGH_ENABLED>true</IS_DRILLTHROUGH_ENABLED> <IS_LINKABLE>true</IS_LINKABLE> <IS_WRITE_ENABLED>false</IS_WRITE_ENABLED> <IS_SQL_ENABLED>true</IS_SQL_ENABLED> <CUBE_CAPTION>Adventure Works Internet Sales Model</CUBE_CAPTION> <CUBE_SOURCE>1</CUBE_SOURCE> <PREFERRED_QUERY_PATTERNS>1</PREFERRED_QUERY_PATTERNS> </row> </root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var cubes = reader.cubes(body);

        equal(cubes.length, 1);
        equal(cubes[0].caption, "Adventure Works Internet Sales Model");
        equal(cubes[0].type, "CUBE");
        equal(cubes[0].description, undefined);
        equal(cubes[0].name, "Adventure Works Internet Sales Model");
    });

    test("catalogs read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row> <CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <DESCRIPTION /> <ROLES>anonymous</ROLES> <DATE_MODIFIED>2014-04-10T12:22:34.086667</DATE_MODIFIED> </row></root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var cubes = reader.catalogs(body);

        equal(cubes.length, 1);
        equal(cubes[0].description, undefined);
        equal(cubes[0].name, "Adventure Works Internet Sales Model");
    });

    test("measures are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row><CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <CUBE_NAME>Adventure Works Internet Sales Model</CUBE_NAME> <MEASURE_NAME>Days Current Quarter to Date</MEASURE_NAME> <MEASURE_UNIQUE_NAME>[Measures].[Days Current Quarter to Date]</MEASURE_UNIQUE_NAME> <MEASURE_CAPTION>Days Current Quarter to Date</MEASURE_CAPTION> <MEASURE_AGGREGATOR>0</MEASURE_AGGREGATOR> <DATA_TYPE>20</DATA_TYPE> <NUMERIC_PRECISION>65535</NUMERIC_PRECISION> <NUMERIC_SCALE>-1</NUMERIC_SCALE> <DESCRIPTION /> <EXPRESSION>COUNTROWS( DATESQTD( \'Date\'[Date]))</EXPRESSION> <MEASURE_IS_VISIBLE>true</MEASURE_IS_VISIBLE> <MEASURE_NAME_SQL_COLUMN_NAME>Days Current Quarter to Date</MEASURE_NAME_SQL_COLUMN_NAME> <MEASURE_UNQUALIFIED_CAPTION>Days Current Quarter to Date</MEASURE_UNQUALIFIED_CAPTION> <MEASUREGROUP_NAME>Date</MEASUREGROUP_NAME> <MEASURE_DISPLAY_FOLDER /> <DEFAULT_FORMAT_STRING /> </row></root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var measures = reader.measures(body);

        equal(measures.length, 1);
        equal(measures[0].name, "Days Current Quarter to Date");
        equal(measures[0].caption, "Days Current Quarter to Date");
        equal(measures[0].uniqueName, "[Measures].[Days Current Quarter to Date]");
        ok(!measures[0].description);
        equal(measures[0].aggregator, 0);
        equal(measures[0].groupName, "Date");
        ok(!measures[0].displayFolder);
        ok(!measures[0].defaultFormat);
    });

    test("dimensions are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row><CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <CUBE_NAME>Adventure Works Internet Sales Model</CUBE_NAME> <DIMENSION_NAME>Customer</DIMENSION_NAME> <DIMENSION_UNIQUE_NAME>[Customer]</DIMENSION_UNIQUE_NAME> <DIMENSION_CAPTION>Customer</DIMENSION_CAPTION> <DIMENSION_ORDINAL>2</DIMENSION_ORDINAL> <DIMENSION_TYPE>3</DIMENSION_TYPE> <DIMENSION_CARDINALITY>18484</DIMENSION_CARDINALITY> <DEFAULT_HIERARCHY>[Customer].[Commute Distance]</DEFAULT_HIERARCHY> <DESCRIPTION /> <IS_VIRTUAL>false</IS_VIRTUAL> <IS_READWRITE>false</IS_READWRITE> <DIMENSION_UNIQUE_SETTINGS>1</DIMENSION_UNIQUE_SETTINGS> <DIMENSION_MASTER_NAME>Customer</DIMENSION_MASTER_NAME> <DIMENSION_IS_VISIBLE>true</DIMENSION_IS_VISIBLE> </row></root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var result = reader.dimensions(body);

        equal(result.length, 1);
        equal(result[0].name, "Customer");
        equal(result[0].caption, "Customer");
        equal(result[0].uniqueName, "[Customer]");
        equal(result[0].defaultHierarchy, "[Customer]");
        ok(!result[0].description);
        equal(result[0].type, 3);
    });

    test("hierarchies are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row><CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <CUBE_NAME>Adventure Works Internet Sales Model</CUBE_NAME> <DIMENSION_UNIQUE_NAME>[Customer]</DIMENSION_UNIQUE_NAME> <HIERARCHY_NAME>Address Line 1</HIERARCHY_NAME> <HIERARCHY_UNIQUE_NAME>[Customer].[Address Line 1]</HIERARCHY_UNIQUE_NAME> <HIERARCHY_CAPTION>Address Line 1</HIERARCHY_CAPTION> <DIMENSION_TYPE>3</DIMENSION_TYPE> <HIERARCHY_CARDINALITY>0</HIERARCHY_CARDINALITY> <DEFAULT_MEMBER>[Customer].[Address Line 1].[All]</DEFAULT_MEMBER> <ALL_MEMBER>[Customer].[Address Line 1].[All]</ALL_MEMBER> <DESCRIPTION /> <STRUCTURE>0</STRUCTURE> <IS_VIRTUAL>false</IS_VIRTUAL> <IS_READWRITE>false</IS_READWRITE> <DIMENSION_UNIQUE_SETTINGS>1</DIMENSION_UNIQUE_SETTINGS> <DIMENSION_IS_VISIBLE>true</DIMENSION_IS_VISIBLE> <HIERARCHY_ORDINAL>22</HIERARCHY_ORDINAL> <DIMENSION_IS_SHARED>true</DIMENSION_IS_SHARED> <HIERARCHY_IS_VISIBLE>true</HIERARCHY_IS_VISIBLE> <HIERARCHY_ORIGIN>2</HIERARCHY_ORIGIN> <HIERARCHY_DISPLAY_FOLDER /> <INSTANCE_SELECTION>0</INSTANCE_SELECTION> <GROUPING_BEHAVIOR>1</GROUPING_BEHAVIOR> <STRUCTURE_TYPE>Natural</STRUCTURE_TYPE></row></root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var result = reader.hierarchies(body);

        equal(result.length, 1);
        equal(result[0].name, "Address Line 1");
        equal(result[0].caption, "Address Line 1");
        equal(result[0].uniqueName, "[Customer].[Address Line 1]");
        ok(!result[0].description);
        equal(result[0].dimensionUniqueName, "[Customer]");
        equal(result[0].defaultMember, "[Customer].[Address Line 1].[All]");
        ok(!result[0].displayFolder);
        equal(result[0].origin, 2);
    });

    test("levels are read from response", function() {
        var reader = new kendo.data.XmlaDataReader({});
        var response = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <soap:Body> <DiscoverResponse xmlns="urn:schemas-microsoft-com:xml-analysis"> <return> <root xmlns="urn:schemas-microsoft-com:xml-analysis:mddataset" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msxmla="http://schemas.microsoft.com/analysisservices/2003/xmla"><row> <CATALOG_NAME>Adventure Works Internet Sales Model</CATALOG_NAME> <CUBE_NAME>Adventure Works Internet Sales Model</CUBE_NAME> <DIMENSION_UNIQUE_NAME>[Customer]</DIMENSION_UNIQUE_NAME> <HIERARCHY_UNIQUE_NAME>[Customer].[Address Line 1]</HIERARCHY_UNIQUE_NAME> <LEVEL_NAME>(All)</LEVEL_NAME> <LEVEL_UNIQUE_NAME>[Customer].[Address Line 1].[(All)]</LEVEL_UNIQUE_NAME> <LEVEL_CAPTION>(All)</LEVEL_CAPTION> <LEVEL_NUMBER>0</LEVEL_NUMBER> <LEVEL_CARDINALITY>0</LEVEL_CARDINALITY> <LEVEL_TYPE>1</LEVEL_TYPE> <DESCRIPTION /> <CUSTOM_ROLLUP_SETTINGS>0</CUSTOM_ROLLUP_SETTINGS> <LEVEL_UNIQUE_SETTINGS>0</LEVEL_UNIQUE_SETTINGS> <LEVEL_IS_VISIBLE>true</LEVEL_IS_VISIBLE> <LEVEL_ORDERING_PROPERTY>(All)</LEVEL_ORDERING_PROPERTY> <LEVEL_DBTYPE>3</LEVEL_DBTYPE> <LEVEL_KEY_CARDINALITY>1</LEVEL_KEY_CARDINALITY> <LEVEL_ORIGIN>2</LEVEL_ORIGIN></row></root> </return> </DiscoverResponse> </soap:Body> </soap:Envelope>';

        var body = reader.parse(response);
        var result = reader.levels(body);

        equal(result.length, 1);
        equal(result[0].name, "(All)");
        equal(result[0].caption, "(All)");
        equal(result[0].uniqueName, "[Customer].[Address Line 1].[(All)]");
        ok(!result[0].description);
        equal(result[0].dimensionUniqueName, "[Customer]");
        equal(result[0].orderingProperty, "(All)");
        ok(!result[0].displayFolder);
        equal(result[0].origin, 2);
        equal(result[0].hierarchyUniqueName, "[Customer].[Address Line 1]");
    });
})();
