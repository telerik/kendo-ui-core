(function() {

var schema = {
    id: function(record) {
        return record.id;
    },
    data: function(data) {
        return data;
    }
};

var data = [];

var DataSource = kendo.data.DataSource;

module("data source read", {
    setup: function() {
        $.mockjaxSettings.responseTime = 0;
    },
    teardown: function() {
        $.mockjaxClear();
    }
});

function setup(source) {
    data = source || [{ id:1, bar: "foo" },{ id: 2, bar: "foo" }];

    var dataSource = new DataSource( {
        schema: $.extend(schema, {
            model: {
                id: "id"
            }
        }),
        data: data
    });

    dataSource.read();
    return dataSource;
}

test("reads data through transport", function() {
    var readWasCalled = false,
    dataSource = new DataSource( {
        schema: schema,
        transport: {
            read: function(callback) {
                readWasCalled = true;
            }
        }
    });

    dataSource.read();
    ok(readWasCalled);
});

test("reads data", function() {
    var dataSource = setup();

    ok(dataSource.data().length);
});

test("read triggers load event", function(){
    var dataSource = setup();
    var argument;

    dataSource.bind("load", function(data){
        argument = data;
    });

    equal(data.length, 2);
});

test("Changes to the raw data in requestEnd event does take effect", 2, function() {
    var dataSource = new DataSource({
        data: []
    });

    dataSource.bind("requestEnd", function(e) {
        $.extend(e.response, [ { foo: "bar" }]);
    });

    dataSource.bind("change", function() {
        equal(this.data().length, 1);
        equal(this.data()[0].foo, "bar");
    });

    dataSource.read();
});

test("read triggers the requestEnd event passing the raw data", 1, function() {
    var dataSource = new DataSource({
        data: data
    });

    dataSource.bind("requestEnd", function(e) {
        deepEqual(e.response, data);
    });

    dataSource.read();
});

test("read triggers the requestEnd event passing operation type", 2, function() {
    var data = [ { foo: "bar" } ],
        dataSource = new DataSource({
            data: data
        });

    dataSource.bind("requestEnd", function(e) {
        deepEqual(e.response, data);
        deepEqual(e.type, "read");
    });

    dataSource.read();
});

test("read triggers the requestEnd event if custom error is present", 1, function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success({
                    errors: "foo"
                });
            }
        }
    });

    dataSource.bind("requestEnd", function() {
        ok(true);
    });

    dataSource.read();
});

test("read triggers the requestEnd event if request errors", 1, function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.error({ });
            }
        }
    });

    dataSource.bind("requestEnd", function() {
        ok(true);
    });

    dataSource.read();
});

test("read raises the change event", function() {
    var dataSource = new DataSource({
        data: data
    });
    var changeWasCalled = false;

    dataSource.bind("change", function() {
        changeWasCalled = true;
    });

    dataSource.read();

    ok(changeWasCalled);
});

test("read raises the reset event", function() {
    var dataSource = new DataSource({
        data: data
    });

    var resetWasCalled = false;

    dataSource.bind("reset", function() {
        resetWasCalled = true;
    });

    dataSource.read();

    ok(resetWasCalled);
});


test("data is initially empty", function() {
    var dataSource = new DataSource({
        data: data
    });

    equal(dataSource.data().length, 0);
});

test("view is initially empty", function() {
    var dataSource = new DataSource({
        data: data
    });

    equal(dataSource.view().length, 0);
});

test("read sorts if sort is set", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        sort: { field: "bar", dir: "asc"}
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view.length, 2);
    equal(view[0].bar, "baz");
    equal(view[1].bar, "foo");
});

test("read pages if pageSize is set", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        page: 2,
        pageSize: 1
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0], 2);
});

test("read does not page if pageSize is set and serverPaging = true", function() {
    var dataSource = new DataSource({
        data: [1,2,3],
        page: 2,
        pageSize: 1,
        serverPaging: true
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view.length, 3);
    equal(view[0], 1);
});

test("read does not sort if sort is set and serverSorting = true", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        sort: { field: "bar", dir: "desc"},
        serverSorting: true
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view[0].bar, "foo");
});

test("read calls schema set through constructor", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        schema: {
            data: function(data) {
                readerWasCalled = true;
                return data;
            }
        }
    });

    var readerWasCalled = false;
    dataSource.read();
    ok(readerWasCalled);
});

test("read reads item total count", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }]
    });

    dataSource.read();
    equal(dataSource.total(), 2);
});

test("read reads total through function passed in constructor", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        schema: {
            total: function() {
                totalWasCalled = true;
                return arguments[0].length;
            }
        }
    });
    var totalWasCalled = false;

    dataSource.read();
    ok(totalWasCalled);
    equal(dataSource.total(), 2);
});

asyncTest("error event is raised if transport fails loading data", 4, function() {
    var dataSource = new DataSource({
            transport: {
                read: "foo"
            },
            schema: schema
        }),
        args;

    $.mockjax({
        contentType: "text/json",
        url: "foo",
        status: 500,
        responseText: 'A text response from the server'
    });

    dataSource.bind("error", function(e) {
        start();
        ok(e);
        ok(e.xhr);
        ok(e.status);
        ok("errorThrown" in e);
    });

    dataSource.read();
});

test("error event is raised if custom schema error returns non empty object", 3, function() {
    var dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success({ myerrors: { myError: "some error" } });
                }
            },
            schema: {
                errors: "myerrors"
            }
        });

    dataSource.bind("error", function(e) {
        ok(e);
        equal(e.status, "customerror");
        deepEqual(e.errors, { myError: "some error" });
    });
    dataSource.read();
});

test("request is executed after custom schema error is called", 4, function() {
    var dataSource = new DataSource({
            transport: {
                read: function(options) {
                    ok(true);
                    options.success({ myerrors: { myError: "some error" } });
                }
            },
            schema: {
                errors: "myerrors"
            }
        });

    dataSource.bind("error", function(e) {
        ok(true);
    });

    dataSource.read();
    dataSource.read();
});

test("error event is raised if custom schema error function returns non empty object", 3, function() {
    var dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success({ errors: { myError: "some error" } });
                }
            },
            schema: {
                errors: function(data) { return data.errors; }
            }
        });

    dataSource.bind("error", function(e) {
        ok(e);
        equal(e.status, "customerror");
        deepEqual(e.errors, { myError: "some error" });
    });
    dataSource.read();
});

test("error event is raised if schema error returns non empty object", 3, function() {
    var dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success({ errors: { myError: "some error" } });
                }
            },
            schema: {
                errors: "errors"
            }
        });

    dataSource.bind("error", function(e) {
        ok(e);
        equal(e.status, "customerror");
        deepEqual(e.errors, { myError: "some error" });
    });
    dataSource.read();
});

asyncTest("dequeue the request if transport fails to load data", 2, function() {
    var dataSource = new DataSource({
            transport: {
                read: "foo"
            },
            schema: schema
        }),
        args;

    $.mockjax({
        contentType: "text/json",
        url: "foo",
        status: 500,
        responseText: 'A text response from the server'
    });

    dataSource.bind("error", function(e) {
        start();
        ok(!dataSource._requestInProgress);
        ok(!dataSource._pending);
    });

    dataSource.read();
});

test("url as a function", 1, function() {
    var dataSource = new DataSource({
            transport: {
                read: {
                    url: function() {
                        ok(true, "url() is called");
                        return "foo";
                    }
                }
            },
            schema: schema
        }),
        args;

    $.mockjax({
        contentType: "text/json",
        url: "foo",
        responseText: '[]'
    });

    dataSource.read();
});

test("transport data is passed to url when it is a function", 1, function() {
    var dataSource = new DataSource({
            transport: {
                read: {
                    url: function(options) {
                        ok(options.foo, "bar");
                        return "foo";
                    },
                    data: {
                        foo: "bar"
                    }
                }
            },
            schema: schema
        }),
        args;

    $.mockjax({
        contentType: "text/json",
        url: "foo",
        responseText: '[]'
    });

    dataSource.read();
});

test("read filters if filter is set", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        filter: { field: "bar", operator: "==", value: "baz" }
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view.length, 1);
    equal(view[0].bar, "baz");
});

test("read does not filter if filter is set and serverFiltering = true", function() {
    var dataSource = new DataSource({
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "baz" }],
        filter: { field: "bar", operator: "==", value: "baz" },
        serverFiltering: true
    });

    dataSource.read();
    var view = dataSource.view();
    equal(view.length, 2);
    equal(view[0].bar, "foo");
});

test("read does not read data through group if grouping is applied", function() {
    var isCalled = false,
        dataSource = new DataSource({
        data: [{ id:1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz"} ],
        group: { field: "bar" },
        schema: {
            groups: function() {
                isCalled = true;
                return [];
            }
        },
        serverGrouping: false
    });
    dataSource.read();
    ok(!isCalled);
});
test("read group expression are passed to the transport", function() {
     var group, dataSource = new DataSource({
        data: [{ id:1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz"} ],
        group: { field: "bar" },
        transport: {
            read: function(options) {
                group = options.data.group;
            }
        },
        serverGrouping: true
    });
    dataSource.read();
    ok(group);
});
test("read aggregates expression are passed to the transport", function() {
     var aggregates, dataSource = new DataSource({
        data: [{ id:1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz"} ],
        aggregate: { field: "bar", aggregates: ["count"] },
        transport: {
            read: function(options) {
                aggregates = options.data.aggregate;
            }
        },
        serverGrouping: true,
        serverAggregates: true
    });
    dataSource.read();
    ok(aggregates);
});

test("mutiple simultaneous requests are queued", function() {
    var called = 0, dataSource = new DataSource({
        transport: {
            read: function(options) {
                called++;
            }
        }
    });
    dataSource.read();
    dataSource.read();
    dataSource.read();

    equal(called, 1);
    ok(dataSource._pending);
});

test("mutiple simultaneous requests are queued and only last one is executed", function() {
    var called = 0, dataSource = new DataSource({
        transport: {
            read: function(options) {
                called++;
                if (called == 1) {
                    dataSource.read();
                    dataSource.read();
                }
                options.success([]);
            }
        }
    });
    dataSource.read();
    equal(called, 2);
    ok(!dataSource._pending);
});

test("requests are dequeued after change event", function() {
    var timesCalled = 0;
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                timesCalled ++;
                if (timesCalled == 1) {
                    dataSource.read();
                    options.success([]);
                }
            }
        },
        change: function() {
            ok(dataSource._pending, "Second request is not pending");
        }
    });

    dataSource.read();
});

test("setting data should trigger change event", function() {
    var called = false,
        dataSource = new DataSource({
            data: [1,2,3,4,5],
            change: function() {
                called = true;
            }
        });
        dataSource.data([6,7,8,9,10]);
        ok(called);
});

test("setting data updates the total", function() {
    var called = false,
        dataSource = new DataSource({
        });

    dataSource.data([6,7,8,9,10]);
    equal(dataSource.total(), 5);
});

test("setting data persist the total after query", function() {
    var called = false,
        dataSource = new DataSource({
            pageSize: 2
        });

    dataSource.data([6,7,8,9,10]);
    dataSource.page(2);

    equal(dataSource.total(), 5);
});

test("setting data persist the total after query with initial data", function() {
    var called = false,
        dataSource = new DataSource({
            data: { data: [ { foo: "bar" } ] },
            schema: {
                data: "data"
            },
            pageSize: 2
        });

    dataSource.data([6,7,8,9,10]);
    dataSource.page(2);
    equal(dataSource.total(), 5);
});

test("setting data should updates the dataSource data", function() {
    var dataSource = new DataSource({
            data: [1,2,3,4,5],
            change: function() {
                called = true;
            }
        });

    dataSource.data([6,7,8,9,10]);
    equal(dataSource.data().length, 5);
    equal(dataSource.data()[0], 6);
    equal(dataSource.data()[1], 7);
    equal(dataSource.data()[2], 8);
    equal(dataSource.data()[3], 9);
    equal(dataSource.data()[4], 10);
});

test("pristine data is not change if data is modified", function() {
    var data =  [1,2,3,4,5],
        dataSource = new DataSource({
            data: data
        });
    dataSource.read();

    dataSource.data()[0] = 6;
    equal(dataSource.data()[0], 6);
    equal(dataSource._pristineData[0], 1);
});

test("paging info is not passed to the transport if serverpaging is false", 4, function() {
    var dataSource = new DataSource({
        page: 3,
        pageSize: 20,
        transport: {
            read: function(data) {
                ok(!("page" in data.data));
                ok(!("skip" in data.data));
                ok(!("take" in data.data));
                ok(!("pageSize" in data.data));
            }
        }
    });

    dataSource.read();
});

test("filter info is not passed to the transport if serverfiltering is false", 1, function() {
    var dataSource = new DataSource({
        filter: { field: "foo", op: "eq", value: "bar" },
        transport: {
            read: function(data) {
                ok(!("filter" in data.data));
            }
        }
    });

    dataSource.read();
});

test("sort info is not passed to the transport if serversorting is false", 1, function() {
    var dataSource = new DataSource({
        sort: { field: "foo", dir: "asc" },
        transport: {
            read: function(data) {
                ok(!("sort" in data.data));
            }
        }
    });

    dataSource.read();
});

test("aggregate info is not passed to the transport if serveraggregates is false", 1, function() {
    var dataSource = new DataSource({
        aggregate: { field: "foo" },
        transport: {
            read: function(data) {
                ok(!("aggregate" in data.data));
            }
        }
    });

    dataSource.read();
});


test("group info is not passed to the transport if servergrouping is false", 1, function() {
    var dataSource = new DataSource({
        group: { field: "foo" },
        transport: {
            read: function(data) {
                ok(!("group" in data.data));
            }
        }
    });

    dataSource.read();
});

test("read returns promise", function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success([]);
            }
        }
    });

    ok($.isFunction(dataSource.read().then));
});

test("read resolves promise upon success", function() {
    var deferred = $.Deferred();
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                deferred.then(function() {
                    options.success([]);
                });
            }
        }
    });

    var readPromise = dataSource.read();
    equal(readPromise.state(), "pending");

    deferred.resolve();

    equal(readPromise.state(), "resolved");
});

test("read resolves promise after data was processed", function() {
    var deferred = $.Deferred();
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                deferred.then(function() {
                    options.success([ { id: 1 } ]);
                });
            }
        }
    });

    dataSource.read()
        .then(function() {
            ok(dataSource.get(1));
        });

    deferred.resolve();
});

test("read rejects promise upon error", function() {
    var deferred = $.Deferred();
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                deferred.then(function() {
                    options.error({});
                });
            }
        }
    });

    var readPromise = dataSource.read();
    equal(readPromise.state(), "pending");

    deferred.resolve();

    equal(readPromise.state(), "rejected");
});

test("read rejects promise with error arguments", function() {
    var errorArgs = { foo: 1 };
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.error(errorArgs);
            }
        }
    });

    dataSource.read()
        .fail(function(e) {
            strictEqual(e, errorArgs);
        });
});

test("read resolves promise when requestStart is prevented", 1, function() {
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
                options.success([]);
            }
        },
        requestStart: function(e) {
            e.preventDefault();
        }
    });

    dataSource.read()
        .then(function() {
            ok(true);
        });
});

}());
