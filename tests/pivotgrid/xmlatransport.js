(function() {
    var PivotDataSource = kendo.data.PivotDataSource,
        XmlaTransport = kendo.data.XmlaTransport,
        div;

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


       ok(params.indexOf('SELECT NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap columns are expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, columns: [{ name: "[foo]", expand: true }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[foo],[foo].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap row is expanded", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]", expand: true }], columns: [ { name: "[bar]", expand: false }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
           'NON EMPTY {[foo],[foo].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON ROWS FROM [cubeName]') > -1);
    });

    test("parameterMap create empty column and single row select query", function() {
        var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({ connection: { catalog: "catalogName", cube: "cubeName" }, rows: [{ name: "[foo]" }], columns: [{ name: "[bar]" }] }, "read");

       ok(params.indexOf('SELECT NON EMPTY {[bar]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
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

    test("parameterMap rows are added as column if no columns are set", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            rows: [{ name: "[foo]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS' +
           ' FROM [cubeName]') > -1);
    });

    test("parameterMap multiple measures are added as row if no rows are set and axis is rows", function() {
        var transport = new kendo.data.XmlaTransport({ });
        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[baz]", "[bar]"],
            measuresAxis: "rows"
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS, ' +
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

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{{[baz],[bar]}})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS' +
           ' FROM [cubeName]') > -1);
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

       ok(params.indexOf('SELECT NON EMPTY {[foo]} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS,' +
           ' NON EMPTY {CROSSJOIN({[bar]},{{[measure1],[measure2]}})} ' +
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

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
           'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{[bar]}),' +
            'CROSSJOIN({[foo].Children},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap leaf is cross joined with one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].&[baz]", expand: true }, { name: "[bar]" }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].&amp;[baz]},{[bar]}),' +
            'CROSSJOIN({[foo].&amp;[baz].Children},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with second one expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }, { name: "[bar]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{[bar]}),' +
            'CROSSJOIN({[foo]},{[bar].Children})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap multiple columns are cross joined with two expanded", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]", expand: true }, { name: "[bar]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{[bar]}),' +
            'CROSSJOIN({[foo].Children},{[bar]}),' +
            'CROSSJOIN({[foo]},{[bar].Children}),' +
            'CROSSJOIN({[foo].Children},{[bar].Children})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
            'FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 3 members", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].[foo1].[all]", expand: true }, { name: "[foo].[foo1].&[1]", expand: true }, { name: "[bar]", expand: false }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[foo1].[all]},{[bar]}),' +
            'CROSSJOIN({[foo].[foo1].[all].Children},{[bar]}),' +
            'CROSSJOIN({[foo].[foo1].&amp;[1].Children},{[bar]})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 2 members", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].[foo1].[all]", expand: true }, { name: "[foo].[foo1].&[1]", expand: true }]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {[foo].[foo1].[all],' +
            '[foo].[foo1].[all].Children,' +
            '[foo].[foo1].&amp;[1].Children} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS FROM [cubeName]') > -1);
    });

    test("parameterMap same hierarchy members are not cross joined - 2 members and 2 measures", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo].[foo1].[all]", expand: true }, { name: "[foo].[foo1].&[1]", expand: true }],
            measures: [ "measure1", "measure2"]
        }, "read");

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo].[foo1].[all]},{{measure1,measure2}}),CROSSJOIN({[foo].[foo1].[all].Children},{{measure1,measure2}}),'+
            'CROSSJOIN({[foo].[foo1].&amp;[1].Children},{{measure1,measure2}})}' +
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

        ok(params.indexOf('SELECT NON EMPTY {CROSSJOIN({[foo]},{{[bar],[baz]}})} DIMENSION PROPERTIES CHILDREN_CARDINALITY, PARENT_UNIQUE_NAME ON COLUMNS ' +
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

        ok(params.indexOf('FROM (SELECT (Filter([foo].Children, InStr([foo].MemberValue,"zoo"))) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap startswith filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "startswith", field: "[foo]", value: "zoo" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT (Filter([foo].Children, Left([foo].MemberValue,Len("zoo"))="zoo")) ON 0 FROM [cubeName])') > -1);
    });

    test("parameterMap endswith filter is generated", function() {
        var transport = new kendo.data.XmlaTransport({ });

        var params = transport.parameterMap({
            connection: { catalog: "catalogName", cube: "cubeName" },
            columns: [{ name: "[foo]" }],
            measures: ["[bar]", "[baz]"],
            filter: { filters: [{ operator: "endswith", field: "[foo]", value: "zoo" }] }
        }, "read");

        ok(params.indexOf('FROM (SELECT (Filter([foo].Children, Right([foo].MemberValue,Len("zoo"))="zoo")) ON 0 FROM [cubeName])') > -1);
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

    test("parameterMap discover connection catalog is added to PropertyList", function() {
       var transport = new kendo.data.XmlaTransport({ });
       var params = transport.parameterMap({
           connection: { cube: "myCube", catalog: "myCatalog" },
           properties: { foo: "fooValue", bar: "barValue"}
       }, "discover");

       ok(params.indexOf('<Properties><PropertyList><Catalog>myCatalog</Catalog><foo>fooValue</foo><bar>barValue</bar></PropertyList></Properties>') > -1);
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

       ok(params.indexOf('<Restrictions><RestrictionList><FOO>fooValue</FOO><BAR>barValue</BAR></RestrictionList></Restrictions>') > -1);
    });
})();
