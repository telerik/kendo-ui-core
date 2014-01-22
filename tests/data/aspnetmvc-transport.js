(function() {

var Transport = kendo.data.transports["aspnetmvc-ajax"];

module("AspNetMvc transport", {
    setup: function() {
        $.mockjaxSettings.contentType = "text/json";
        $.mockjaxSettings.responseTime = 0;
    },
    teardown: function() {
        $.mockjaxClear();
        kendo.culture("en-US");
    }
});

function decodeURLParameters(value) {
    var params = {},
    pieces = value.split('&'),
    pair, i, l;

    for (i = 0, l = pieces.length; i < l; i++) {
        pair = pieces[i].split('=', 2);
        params[decodeURIComponent(pair[0])] = (pair.length == 2 ?
            decodeURIComponent(pair[1].replace(/\+/g, ' ')) : true);
    }
    return params;
}

test("server transport encodes ampersand", function() {
    var transport = new kendo.data.transports["aspnetmvc-server"]({ prefix: "" });

    equal("foo~eq~'%26'", transport.parameterMap({ filter: { logic: "and", filters: [ { field: "foo", operator: "eq", value: "&" }] } }).filter);
});

test("ajax transport doesn't encode ampersand", function() {
    var transport = new kendo.data.transports["aspnetmvc-ajax"]({ prefix: "" });

    equal("foo~eq~'&'", transport.parameterMap({ filter: { logic: "and", filters: [ { field: "foo", operator: "eq", value: "&" }] } }).filter);
});

test("read url is requested if no data is set", 1, function() {
    var transport = new Transport({
            read: {
                url: "foo"
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
           start();
           ok(true);
        }
    });
    stop();
    transport.read({});
});

test("data is loaded from the options if both data and url are set", 1, function() {
    var data = [{foo: "bar" }],
        transport = new Transport({
            data: {
                Data: data,
                Total: 10
            },
            read: {
                url: "foo"
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
            ok(false);
        }
    });

    stop();

    transport.read({
        success: function(e) {
           start();
           deepEqual(e.Data, data);
        }
    });
});

test("data is loaded from the options if set", 1, function() {
    var data = [{foo: "bar" }],
        transport = new Transport({
            data: {
                Data: data,
                Total: 10
            }
        });

    transport.read({
        success: function(e) {
           deepEqual(e.Data, data);
        }
    });
});

test("date fields are correctly serialized when stringifyDates is set to false", function() {
       var transport = new Transport({});
       var currentDate = new Date();

       var otherResult = transport.parameterMap({dateField: currentDate}, "update", true);

       equal(otherResult.dateField, kendo.format("{0:G}", currentDate))
});

test("date fields are correctly serialized when stringifyDates is set to true", function() {
       var schedulerTransport = new kendo.data.transports["aspnetmvc-ajax"]({stringifyDates: true});
       var currentDate = new Date();

       var schedulerResult = schedulerTransport.parameterMap({dateField: currentDate}, "update", true, true);

       equal(schedulerResult.dateField, currentDate.toJSON());
});

test("stringifyDates parameter is correctly set in the transport and dates are correctly serialized", function() {
        var requestData,
        currentDate = new Date();

        var dataSource = new kendo.data.SchedulerDataSource({
            type: "aspnetmvc-ajax",
            transport: {
                stringifyDates: true,
                read: {
                    url: "read"
                },
                update: {
                    url: "update",
                    beforeSend: function(jqXHR, settings ) {
                        requestData = decodeURLParameters(settings.data);
                        return false;
                    }
                }
            }
        });

        dataSource.read();
        dataSource.add({id: 1, Start: currentDate});
        dataSource.at(0).set("dirty", true);

        dataSource.sync();
        equal(requestData.Start, currentDate.toJSON());
});

test("Update url is correctly formatted with model ID", function() {
       transport = new kendo.data.transports["webapi"]({
            update: "/update/{0}",
            idField: "id"
        });

        var generatedUrl = transport.options.update.url({id: "1"});

        equal(generatedUrl.indexOf(1) > -1,true);
});

test("Destroy url is correctly formatted with model ID", function() {
        transport = new kendo.data.transports["webapi"]({
            destroy: "/destroy/{0}",
            idField: "id"
        });

        var generatedUrl = transport.options.destroy.url({id: "1"});

        equal(generatedUrl.indexOf(1) > -1,true);
});

test("Read is using correct Http method", function() {
        var requestData;
        var currentMethod;

        var transport = new kendo.data.transports["webapi"]({
            read: {
                url: "/read"
            }
        });

        equal(transport.options.read.type,"GET");
});

test("Create is using correct Http method", function() {
        var requestData;
        var currentMethod;

        var transport = new kendo.data.transports["webapi"]({
            create: "/create"
        });

        equal(transport.options.create.type,"POST");
});

test("Update is using correct Http method", function() {
        var requestData;
        var currentMethod;

        var transport = new kendo.data.transports["webapi"]({
            update: "/update"
        });

        equal(transport.options.update.type,"PUT");
});

test("Delete is using correct Http method", function() {
        var requestData;
        var currentMethod;

        var transport = new kendo.data.transports["webapi"]({
            destroy: "/delete"
        });

        equal(transport.options.destroy.type,"DELETE");
});

test("data is loaded from the url if both data and url are set on the second request", 2, function() {
    var data = [{foo: "bar" }],
        transport = new Transport({
            data: {
                Data: data,
                Total: 10
            },
            read: {
                url: "foo"
            }
        });

    $.mockjax({
        url: "foo",
        response: function() {
            start();
            ok(true);
        }
    });

    transport.read({
        success: function(e) {
           deepEqual(e.Data, data);
        }
    });

    stop();

    transport.read({
        success: function(e) {
        }
    });
});

test("parameterMap transforms single string filter", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = {
        filter: {
            logic: "and",
            filters: [
                { field: "foo", value: "bar", operator: "eq" }
            ]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "foo~eq~'bar'");
});

test("parameterMap strips filter with no field names", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = {
        filter: {
            logic: "and",
            filters: [
                { field: undefined , value: "bar", operator: "eq" }
            ]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "");
});

test("parameterMap transforms single number filter", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = {
        filter: {
            logic: "and",
            filters: [
                { field: "foo", value: 1, operator: "eq" }
            ]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "foo~eq~1");
});

test("parameterMap no filter", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = { };

    var result = transport.parameterMap(options);
    equal(result.filter, "");
});

test("parameterMap transforms multiple filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = {
        filter: {
            logic: "and",
            filters: [
                { field: "foo", value: "bar", operator: "eq" },
                { field: "baz", value: 1, operator: "eq" }
            ]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "foo~eq~'bar'~and~baz~eq~1");
});

test("parameterMap transforms multiple or filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),

    options = {
        filter: {
            logic: "or",
            filters: [
                { field: "foo", value: "bar", operator: "eq" },
                { field: "baz", value: 1, operator: "eq" }
            ]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "foo~eq~'bar'~or~baz~eq~1");
});

test("parameterMap transforms multiple nested filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),
    options = {
        filter: {
            logic: "or",
            filters: [{
                logic: "and",
                filters: [
                    { field: "foo", value: "bar", operator: "eq" },
                    { field: "baz", value: 1, operator: "eq" }]
            }]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "(foo~eq~'bar'~and~baz~eq~1)");
});

test("parameterMap transforms multiple nested or filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),
    options = {
        filter: {
            logic: "and",
            filters: [{
                logic: "or",
                filters: [
                    { field: "foo", value: "bar", operator: "eq" },
                    { field: "baz", value: 1, operator: "eq" }]
            }]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "(foo~eq~'bar'~or~baz~eq~1)");
});

test("parameterMap transforms multiple level nested filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),
    options = {
        filter: {
            logic: "and",
            filters: [{
                logic: "and",
                filters: [
                    { field: "foo", value: "bar", operator: "eq" },
                    { field: "baz", value: 1, operator: "eq" }]
            },
            { field: "moo", value: "boo", operator: "contains" }]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "(foo~eq~'bar'~and~baz~eq~1)~and~moo~contains~'boo'");
});

test("parameterMap transforms multiple level nested or filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),
    options = {
        filter: {
            logic: "or",
            filters: [{
                logic: "and",
                filters: [
                    { field: "foo", value: "bar", operator: "eq" },
                    { field: "baz", value: 1, operator: "eq" }]
            },
            { field: "moo", value: "boo", operator: "contains" }]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "(foo~eq~'bar'~and~baz~eq~1)~or~moo~contains~'boo'");
});

test("parameterMap transforms multiple nested levels or filters", function() {
    var transport = new Transport({
        read: {
            url: "foo"
        }
    }),
    options = {
        filter: {
            logic: "or",
            filters: [{
                logic: "or",
                filters: [
                    { field: "foo", value: "bar", operator: "eq" },
                    {
                        logic: "or",
                        filters: [ { field: "baz", value: 1, operator: "eq" }, { field: "baz2", value: 1, operator: "eq" }]
                    }]
            },
            { field: "moo", value: "boo", operator: "contains" }]
        }
    };

    var result = transport.parameterMap(options);
    equal(result.filter, "(foo~eq~'bar'~or~(baz~eq~1~or~baz2~eq~1))~or~moo~contains~'boo'");
});

test("parameterMap includes additional data on read", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: {bar: 1}}, "read");
    
    equal(result["foo.bar"], 1);
});

test("parameterMap returns only serialized values on read", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: {bar: 1}}, "read");
    
    equal(result["foo"], undefined);
});

test("parameterMap includes additional data when using batch updates", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({models: [{bar: 1}], foo: "test"}, "update");
 
    equal(result.foo, "test");
    equal(result["models[0].bar"], 1);
});

test("parameterMap returns only the serialized values on update", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: {bar: 1}}, "update");
    
    equal(result.foo, undefined);
});

test("parameterMap serializes objects using dot notation", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: {bar: 1}}, "update");

    equal(result["foo.bar"], 1);
});

test("parameterMap serializes arrays using bracket notation", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: [1,2]}, "update");

    equal(result["foo[0]"], 1);
    equal(result["foo[1]"], 2);
});

test("parameterMap serializes arrays of objects using bracket and dot notation", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: [{bar: 1}, {bar: 2}]}, "update");

    equal(result["foo[0].bar"], 1);
    equal(result["foo[1].bar"], 2);
});

test("parameterMap serializes arrays of objects using bracket and dot notation", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: [{bar: 1}, {bar: 2}]}, "update");

    equal(result["foo[0].bar"], 1);
    equal(result["foo[1].bar"], 2);
});

test("parameterMap serializes nested arrays", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: [[1],[2]]}, "update");

    equal(result["foo[0][0]"], 1);
    equal(result["foo[1][0]"], 2);
});

test("parameterMap serializes nested arrays of objects", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: [[{bar: 1}],[{bar: 2}]]}, "update");

    equal(result["foo[0][0].bar"], 1);
    equal(result["foo[1][0].bar"], 2);
});

test("parameterMap serializes models array", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({models: [{foo: 1}, {foo: 2}]}, "update");

    equal(result["models[0].foo"], 1);
    equal(result["models[1].foo"], 2);
});

test("parameterMap does not override a nested field with a field that has the full path name", function() {
    var transport = new Transport({}),
        result = transport.parameterMap({foo: {bar: 2}, "foo.bar": 1}, "update");

    equal(result["foo.bar"], "2");
});

test("parameterMap serializes dates using General date/time pattern", function() {
    var transport = new Transport({}),
        value = new Date(2010, 0, 14),
        expectedResult = kendo.format("{0:G}", value),
        result = transport.parameterMap({date: value}, "update");

    equal(result.date, expectedResult);
});

test("parameterMap serializes dates in nested objects using General date/time pattern", function() {
    var transport = new Transport({}),
        value = new Date(2010, 0, 14),
        expectedResult = kendo.format("{0:G}", value),
        result = transport.parameterMap({foo: {date: value}}, "update");

    equal(result["foo.date"], expectedResult);
});

test("parameterMap serializes dates in array using General date/time pattern", function() {
    var transport = new Transport({}),
        value = new Date(2010, 0, 14),
        expectedResult = kendo.format("{0:G}", value),
        result = transport.parameterMap({foo: [value]}, "update");

    equal(result["foo[0]"], expectedResult);
});

test("parameterMap serializes numbers with dot separator for the default culture", function() {
    var transport = new Transport({}),
        value = 1011.1,
        expectedResult = "1011.1",
        result = transport.parameterMap({foo: value}, "update");

    equal(result.foo, expectedResult);
});

test("parameterMap serializes numbers in nested objects with dot separator for the default culture", function() {
    var transport = new Transport({}),
        value = 1011.1,
        expectedResult = "1011.1",
        result = transport.parameterMap({foo: {bar: value}}, "update");

    equal(result["foo.bar"], expectedResult);
});

test("parameterMap serializes numbers in array with dot separator for the default culture", function() {
    var transport = new Transport({}),
        value = 1011.1,
        expectedResult = "1011.1",
        result = transport.parameterMap({foo: [value]}, "update");

    equal(result["foo[0]"], expectedResult);
});

test("parameterMap serializes integer numbers without separator", function() {
    var transport = new Transport({}),
        value = 1011,
        expectedResult = "1011",
        result = transport.parameterMap({foo: value}, "update");

    equal(result.foo, expectedResult);
});

test("parameterMap serializes dates based on the current culture", function() {
    kendo.culture("bg-BG");

    var transport = new Transport({}),
        value = new Date(2010, 0, 14),
        expectedResult = kendo.format("{0:G}", value),
        result = transport.parameterMap({date: value}, "update");

    equal(result.date, expectedResult);
});

test("parameterMap serializes numbers based on the current culture", function() {
    kendo.culture("bg-BG");

    var transport = new Transport({}),
        value = 1011.1,
        expectedResult = "1011,1",
        result = transport.parameterMap({foo: [value]}, "update");

    equal(result["foo[0]"], expectedResult);
});

test("the transport is initialized when no options are passed", function (){
    var transport = new Transport();
    ok(true);
});

}());
