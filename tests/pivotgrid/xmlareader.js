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
