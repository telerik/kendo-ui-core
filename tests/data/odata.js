(function() {

    var parameterMap = kendo.data.transports["odata"].parameterMap;
    var DataSource = kendo.data.DataSource;

    describe("Odata", function() {

        it("datasource with type odata creates remote transport with parameterMap", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    read: "foo"
                }
            });

            assert.isOk(dataSource.transport.parameterMap === parameterMap);
        });

        it("datasource with type odata creates remote transport and sets default values for read", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    read: "foo"
                }
            });

            var read = dataSource.transport.options.read;
            assert.equal(read.dataType, "jsonp");
            assert.equal(read.cache, true);
            assert.equal(read.jsonp, "$callback");
        });

        it("datasource with type odata creates remote transport and sets default values for update", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    update: {
                        url: "foo"
                    }
                }
            });

            var update = dataSource.transport.options.update;
            assert.equal(update.url, "foo");
            assert.equal(update.dataType, "json");
            assert.equal(update.cache, true);
            assert.equal(update.contentType, "application/json");
            assert.equal(update.type, "PUT");
        });

        it("datasource with type odata creates remote transport and sets default values for create", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    create: {
                        url: "foo"
                    }
                }
            });

            var create = dataSource.transport.options.create;
            assert.equal(create.url, "foo");
            assert.equal(create.dataType, "json");
            assert.equal(create.cache, true);
            assert.equal(create.contentType, "application/json");
            assert.equal(create.type, "POST");
        });

        it("datasource with type odata creates remote transport and sets default values for destroy", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    destroy: {
                        url: "foo"
                    }
                }
            });

            var destroy = dataSource.transport.options.destroy;
            assert.equal(destroy.url, "foo");
            assert.equal(destroy.dataType, "json");
            assert.equal(destroy.cache, true);
            assert.equal(destroy.type, "DELETE");
        });

        it("datasource with type odata initializes odata schema", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    read: "foo"
                }
            });

            var schema = dataSource.options.schema;
            assert.equal(schema.total, "d.__count");
            assert.isOk($.isFunction(schema.data));
        });

        it("parameterMap adds $format and $inlinecount to the request", function() {
            var result = parameterMap();
            assert.equal(result.$format, "json");
            assert.equal(result.$inlinecount, "allpages");
        });

        it("$format is not set if dataType is json", function() {
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
            assert.isOk(!result.$format);
        });

        it("parameterMap adds $skip when skip is specified", function() {
            var result = parameterMap({ skip: 1 });
            assert.equal(result.$skip, 1);
        });

        it("parameterMap does not add $skip when skip is not specified", function() {
            var result = parameterMap();
            assert.isOk(!result.hasOwnProperty("$skip"), "Skip is not set");
        });

        it("parameterMap adds $top when take is specified", function() {
            var result = parameterMap({ take: 1 });
            assert.equal(result.$top, 1);
        });

        it("parameterMap does not add $top when take is not specified", function() {
            var result = parameterMap();
            assert.isOk(!result.hasOwnProperty("$top"), "Top is not set");
        });

        it("parameterMap adds $orderby when sort is specified", function() {
            var result = parameterMap({ sort: [{ field: "foo", dir: "asc" }] });
            assert.equal(result.$orderby, "foo");
        });

        it("$orderby with nested field", function() {
            var result = parameterMap({ sort: [{ field: "foo.bar", dir: "asc" }] });
            assert.equal(result.$orderby, "foo/bar");
        });

        it("parameterMap does not add $orderby if sort is not specified", function() {
            var result = parameterMap();
            assert.isOk(!result.hasOwnProperty("$orderby"), "orderby is not set");
        });

        it("parameterMap does not add $orderby if sort is empty list", function() {
            var result = parameterMap({ sort: [] });
            assert.isOk(!result.hasOwnProperty("$orderby"), "orderby is not set");
        });

        it("$orderby when direction is descending", function() {
            var result = parameterMap({ sort: [{ field: "foo", dir: "desc" }] });
            assert.equal(result.$orderby, "foo desc");
        });

        it("$orderby when there are multiple order by expressions", function() {
            var result = parameterMap({ sort: [{ field: "bar", dir: "desc" }, { field: "foo", dir: "asc" }] });

            assert.equal(result.$orderby, "bar desc,foo");
        });

        it("parametterMap does not add $filter if no filters is applied", function() {
            var result = parameterMap({ filter: null });
            assert.equal(typeof result["$filter"], "undefined");
        });

        it("parametterMap does not add $filter if empty filter object is applied", function() {
            var result = parameterMap({ filter: { logic: "and", filters: [] } });
            assert.equal(typeof result["$filter"], "undefined");
        });

        it("parameterMap adds $filter if filter is specified", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "startswith", value: "bar" }] } });
            assert.equal(result.$filter, "startswith(Name,'bar')");
        });

        it("parameterMap adds tolower(field) if ignoreCase is true", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "startswith", value: "bar", ignoreCase: true }] } });
            assert.equal(result.$filter, "startswith(tolower(Name),'bar')");
        });

        it("parameterMap does not add $filter if filter is not specified", function() {
            var result = parameterMap();
            assert.isOk(!result.hasOwnProperty("$filter"), "Filter is not present");
        });

        it("$filter and endswith operator", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "endswith", value: "bar" }] } });
            assert.equal(result.$filter, "endswith(Name,'bar')");
        });

        it("$filter on string that contains ' symbol", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "contains", value: "bar'foo" }] } });
            assert.equal(result.$filter, "substringof('bar''foo',Name)");
        });

        it("$filter and contains operator uses substringof", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "contains", value: "bar" }] } });
            assert.isOk(result.$filter, "substringof('bar',Name)");
        });

        it("$filter and doesnotcontain operator uses substringof", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "doesnotcontain", value: "bar" }] } });
            assert.equal(result.$filter, "substringof('bar',Name) eq false");
        });

        it("$filter and neq operator", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "neq", value: "bar" }] } });

            assert.equal(result.$filter, "Name ne 'bar'");
        });

        it("$filter and isempty operator uses eq", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isempty" }] } });
            assert.equal(result.$filter, "Name eq ''");
        });

        it("$filter and isnotempty operator uses eq", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isnotempty" }] } });
            assert.equal(result.$filter, "Name ne ''");
        });

        it("$filter and isnull operator uses eq", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isnull" }] } });
            assert.equal(result.$filter, "Name eq null");
        });

        it("$filter and isnullorempty operator uses eq", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isnullorempty" }] } });
            assert.equal(result.$filter, "Name eq null or Name eq ''");
        });


        it("$filter and isnotnull operator uses ne", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isnotnull" }] } });
            assert.equal(result.$filter, "Name ne null");
        });

        it("$filter and isnotnullorempty operator uses ne", function() {
            var result = parameterMap({ filter: { filters: [{ field: "Name", operator: "isnotnullorempty" }] } });
            assert.equal(result.$filter, "Name ne null and Name ne ''");
        });

        it("$filter with nested field", function() {
            var result = parameterMap({ filter: { filters: [{ field: "foo.bar", operator: "neq", value: "bar" }] } });

            assert.equal(result.$filter, "foo/bar ne 'bar'");
        });

        it("$filter does not quote apostrophe when numberic value is specifed", function() {
            var result = parameterMap({ filter: { filters: [{ field: "ID", operator: "neq", value: 10 }] } });

            assert.equal(result.$filter, "ID ne 10");
        });

        it("$filter does not honour ignoreCase if value is number", function() {
            var result = parameterMap({ filter: { filters: [{ ignoreCase: true, field: "ID", operator: "neq", value: 10 }] } });

            assert.equal(result.$filter, "ID ne 10");
        });

        it("$filter and null value", function() {
            var result = parameterMap({ filter: { filters: [{ field: "ID", operator: "neq", value: null }] } });

            assert.equal(result.$filter, "ID ne null");
        });

        it("$filter or", function() {
            var result = parameterMap({ filter: { logic: "or", filters: [{ field: "ID", operator: "neq", value: 1 }, { field: "ID", operator: "eq", value: 1 }] } });

            assert.equal(result.$filter, "(ID ne 1 or ID eq 1)");
        });

        it("$filter and", function() {
            var result = parameterMap({ filter: { filters: [{ field: "ID", operator: "neq", value: null }, { field: "ID", operator: "neq", value: null }] } });

            assert.equal(result.$filter, "(ID ne null and ID ne null)");
        });

        it("$filter and nested expressions", function() {
            var result = parameterMap({
                filter: {
                    logic: "and",
                    filters: [{
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
                        operator: "eq",
                        value: 3
                    }
                    ]
                }
            });

            assert.equal(result.$filter, "((ID ne 1 or ID ne 2) and ID eq 3)");
        });

        it("$filter date encoding", function() {
            var result = parameterMap({ filter: { filters: [{ field: "foo", operator: "eq", value: new Date(2011, 1, 1) }] } });

            assert.equal(result.$filter, "foo eq datetime'2011-02-01T00:00:00'");
        });

        it("$filter adjust date to UTC TZ (odata-v4)", function() {
            var useVersionFour = true;
            var date = new Date(2011, 1, 1);
            var result = parameterMap({ filter: { filters: [{ field: "foo", operator: "eq", value: date }] } }, "read", useVersionFour);

            date = kendo.timezone.apply(date, "Etc/UTC");

            assert.equal(result.$filter, "foo eq " + kendo.toString(date, "yyyy-MM-ddTHH:mm:ss+00:00"));
        });

        it("custom arguments are preserved", function() {
            var result = parameterMap({ foo: "bar" });

            assert.equal(result.foo, "bar");
        });

        it("model is stringified if type is update", function() {
            var result = parameterMap({ foo: "bar" }, "update");

            assert.equal(result, kendo.stringify({ foo: "bar" }));
        });

        it("model is stringified if type is create", function() {
            var result = parameterMap({ foo: "bar" }, "create");

            assert.equal(result, kendo.stringify({ foo: "bar" }));
        });

        it("does not proccess the arguments if type is destroy", function() {
            var result = parameterMap({ foo: "bar" }, "destroy");

            assert.isOk(!result);
        });

        it("number values is serialized as string", function() {
            var result = parameterMap({ foo: 1 }, "update");

            assert.equal(result, '{"foo":"1"}');
        });

        it("update with dataType set to jsonp throws an error", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    update: {
                        url: "foo",
                        dataType: "jsonp"
                    }
                }
            });

            assert.throws(function() {
                dataSource.transport.parameterMap({ foo: 1 }, "update");
            }, "Only json dataType can be used for update operation.");
        });

        it("create with dataType set to jsonp throws an error", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    create: {
                        url: "foo",
                        dataType: "jsonp"
                    }
                }
            });

            assert.throws(function() {
                dataSource.transport.parameterMap({ foo: 1 }, "create");
            }, "Only json dataType can be used for create operation.");
        });

        it("destroy with dataType set to jsonp throws an error", function() {
            var dataSource = new DataSource({
                type: "odata",
                transport: {
                    destroy: {
                        url: "foo",
                        dataType: "jsonp"
                    }
                }
            });

            assert.throws(function() {
                dataSource.transport.parameterMap({ foo: 1 }, "destroy");
            }, "Only json dataType can be used for destroy operation.");
        });

    });
}());
