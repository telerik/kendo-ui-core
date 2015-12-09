(function(){

var parameterMap = kendo.data.transports["odata"].parameterMap;
var DataSource = kendo.data.DataSource;

test("datasource with type odata creates remote transport with parameterMap", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            read: "foo"
        }
    });

    ok(dataSource.transport.parameterMap === parameterMap);
});

test("datasource with type odata creates remote transport and sets default values for read", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            read: "foo"
        }
    });

    var read = dataSource.transport.options.read;
    equal(read.dataType, "jsonp");
    equal(read.cache, true);
    equal(read.jsonp, "$callback");
});

test("datasource with type odata creates remote transport and sets default values for update", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            update: {
                url: "foo"
            }
        }
    });

    var update = dataSource.transport.options.update;
    equal(update.url, "foo");
    equal(update.dataType, "json");
    equal(update.cache, true);
    equal(update.contentType, "application/json");
    equal(update.type, "PUT");
});

test("datasource with type odata creates remote transport and sets default values for create", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            create: {
                url: "foo"
            }
        }
    });

    var create = dataSource.transport.options.create;
    equal(create.url, "foo");
    equal(create.dataType, "json");
    equal(create.cache, true);
    equal(create.contentType, "application/json");
    equal(create.type, "POST");
});

test("datasource with type odata creates remote transport and sets default values for destroy", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            destroy: {
                url: "foo"
            }
        }
    });

    var destroy = dataSource.transport.options.destroy;
    equal(destroy.url, "foo");
    equal(destroy.dataType, "json");
    equal(destroy.cache, true);
    equal(destroy.type, "DELETE");
});

test("datasource with type odata initializes odata schema", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            read: "foo"
        }
    });

    var schema = dataSource.options.schema;
    equal(schema.total, "d.__count");
    ok($.isFunction(schema.data));
});

test("parameterMap adds $format and $inlinecount to the request", function() {
    var result = parameterMap();
    equal(result.$format, "json");
    equal(result.$inlinecount, "allpages");
});

test("$format is not set if dataType is json", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            read: {
                url: "foo",
                dataType: "json"
            }
        }
    });

    var result = dataSource.transport.parameterMap();
    ok(!result.$format);
});

test("parameterMap adds $skip when skip is specified", function() {
    var result = parameterMap({ skip: 1 });
    equal(result.$skip, 1);
});

test("parameterMap does not add $skip when skip is not specified", function() {
    var result = parameterMap();
    ok(!result.hasOwnProperty("$skip"), "Skip is not set");
});

test("parameterMap adds $top when take is specified", function() {
    var result = parameterMap({take: 1});
    equal(result.$top, 1);
});

test("parameterMap does not add $top when take is not specified", function() {
    var result = parameterMap();
    ok(!result.hasOwnProperty("$top"), "Top is not set");
});

test("parameterMap adds $orderby when sort is specified", function() {
    var result = parameterMap({ sort: [ { field:"foo", dir: "asc" } ]});
    equal(result.$orderby, "foo");
});

test("$orderby with nested field", function() {
    var result = parameterMap({ sort: [ { field:"foo.bar", dir: "asc" } ]});
    equal(result.$orderby, "foo/bar");
});

test("parameterMap does not add $orderby if sort is not specified", function() {
    var result = parameterMap();
    ok(!result.hasOwnProperty("$orderby"), "orderby is not set");
});

test("parameterMap does not add $orderby if sort is empty list", function() {
    var result = parameterMap({ sort: [] });
    ok(!result.hasOwnProperty("$orderby"), "orderby is not set");
});

test("$orderby when direction is descending", function() {
    var result = parameterMap({ sort: [ { field:"foo", dir: "desc" } ]});
    equal(result.$orderby, "foo desc");
});

test("$orderby when there are multiple order by expressions", function() {
    var result = parameterMap({ sort: [ { field:"bar", dir: "desc" }, { field:"foo", dir: "asc" } ]});

    equal(result.$orderby, "bar desc,foo");
});

test("parametterMap does not add $filter if no filters is applied", function() {
    var result = parameterMap({ filter: null });
    equal(typeof result["$filter"], "undefined");
});

test("parametterMap does not add $filter if empty filter object is applied", function() {
    var result = parameterMap({ filter: {logic: "and", filters: []} });
    equal(typeof result["$filter"], "undefined");
});

test("parameterMap adds $filter if filter is specified", function() {
    var result = parameterMap({ filter: { filters:[ {field: "Name", operator: "startswith", value: "bar"} ]} });
    equal(result.$filter, "startswith(Name,'bar')");
});

test("parameterMap adds tolower(field) if ignoreCase is true", function() {
    var result = parameterMap({ filter: { filters:[ {field: "Name", operator: "startswith", value: "bar", ignoreCase: true} ]} });
    equal(result.$filter, "startswith(tolower(Name),'bar')");
});

test("parameterMap does not add $filter if filter is not specified", function() {
    var result = parameterMap();
    ok(!result.hasOwnProperty("$filter"), "Filter is not present");
});

test("$filter and endswith operator", function() {
    var result = parameterMap({ filter: {filters:[ {field: "Name", operator: "endswith", value: "bar"} ]}});
    equal(result.$filter, "endswith(Name,'bar')");
});

test("$filter on string that contains ' symbol", function() {
    var result = parameterMap({ filter: {filters:[ {field: "Name", operator: "contains", value: "bar'foo"} ]}});
    equal(result.$filter, "substringof('bar''foo',Name)");
});

test("$filter and contains operator uses substringof", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "contains", value: "bar"} ]}});
    ok(result.$filter, "substringof('bar',Name)");
});

test("$filter and doesnotcontain operator uses substringof", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "doesnotcontain", value: "bar"} ]}});
    equal(result.$filter, "substringof('bar',Name) eq false");
});

test("$filter and neq operator", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "neq", value: "bar"} ]} });

    equal(result.$filter, "Name ne 'bar'");
});

test("$filter and isempty operator uses eq", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "isempty" } ]}});
    equal(result.$filter, "Name eq ''");
});

test("$filter and isnotempty operator uses eq", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "isnotempty" } ]}});
    equal(result.$filter, "Name ne ''");
});

test("$filter and isnull operator uses eq", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "isnull" } ]}});
    equal(result.$filter, "Name eq null");
});

test("$filter and isnotnull operator uses ne", function() {
    var result = parameterMap({ filter: { filters: [ {field: "Name", operator: "isnotnull" } ]}});
    equal(result.$filter, "Name ne null");
});

test("$filter with nested field", function() {
    var result = parameterMap({ filter: { filters: [ {field: "foo.bar", operator: "neq", value: "bar"} ]} });

    equal(result.$filter, "foo/bar ne 'bar'");
});

test("$filter does not quote apostrophe when numberic value is specifed", function() {
    var result = parameterMap({ filter: { filters: [ {field: "ID", operator: "neq", value: 10} ]} });

    equal(result.$filter, "ID ne 10");
});

test("$filter does not honour ignoreCase if value is number", function() {
    var result = parameterMap({ filter: { filters: [ {ignoreCase: true, field: "ID", operator: "neq", value: 10} ]} });

    equal(result.$filter, "ID ne 10");
});

test("$filter and null value", function() {
    var result = parameterMap({ filter: { filters: [ {field: "ID", operator: "neq", value: null} ]} });

    equal(result.$filter, "ID ne null");
});

test("$filter or", function() {
    var result = parameterMap({ filter: { logic: "or", filters: [ {field: "ID", operator: "neq", value: 1}, {field: "ID", operator: "eq", value: 1} ]} });

    equal(result.$filter, "(ID ne 1 or ID eq 1)");
});

test("$filter and", function() {
    var result = parameterMap({ filter: { filters: [ {field: "ID", operator: "neq", value: null}, {field: "ID", operator: "neq", value: null} ]} });

    equal(result.$filter, "(ID ne null and ID ne null)");
});

test("$filter and nested expressions", function() {
    var result = parameterMap({
        filter: {
            logic:"and",
            filters: [ {
                logic: "or",
                filters: [{
                        field: "ID",
                        operator: "neq",
                        value: 1
                    }, {
                        field: "ID",
                        operator: "neq",
                        value: 2
                    }]
                }, {
                    field: "ID",
                    operator:"eq",
                    value: 3
                }
            ]
        }
    });

    equal(result.$filter, "((ID ne 1 or ID ne 2) and ID eq 3)");
});

test("$filter date encoding", function() {
    var result = parameterMap({ filter: { filters: [ { field: "foo", operator: "eq", value: new Date(2011, 1, 1) }] } });

    equal(result.$filter, "foo eq datetime'2011-02-01T00:00:00'");
});

test("custom arguments are preserved", function() {
    var result = parameterMap({ foo: "bar" });

    equal(result.foo, "bar");
});

test("model is stringified if type is update", function() {
    var result = parameterMap({ foo: "bar" }, "update");

    equal(result, kendo.stringify({ foo: "bar" }));
});

test("model is stringified if type is create", function() {
    var result = parameterMap({ foo: "bar" }, "create");

    equal(result, kendo.stringify({ foo: "bar" }));
});

test("does not proccess the arguments if type is destroy", function() {
    var result = parameterMap({ foo: "bar" }, "destroy");

    ok(!result);
});

test("number values is serialized as string", function() {
    var result = parameterMap({ foo: 1 }, "update");

    equal(result, '{"foo":"1"}');
});

test("update with dataType set to jsonp throws an error", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            update: {
                url: "foo",
                dataType: "jsonp"
            }
        }
    });

    throws(function() {
        dataSource.transport.parameterMap({ foo: 1 }, "update");
    }, "dataType for update should be json");
});

test("create with dataType set to jsonp throws an error", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            create: {
                url: "foo",
                dataType: "jsonp"
            }
        }
    });

    throws(function() {
        dataSource.transport.parameterMap({ foo: 1 }, "create");
    }, "dataType for create should be json");
});

test("destroy with dataType set to jsonp throws an error", function() {
    var dataSource = new DataSource({
        type: "odata",
        transport: {
            destroy: {
                url: "foo",
                dataType: "jsonp"
            }
        }
    });

    throws(function() {
        dataSource.transport.parameterMap({ foo: 1 }, "destroy");
    }, "dataType for destroy should be json");
});

}());
