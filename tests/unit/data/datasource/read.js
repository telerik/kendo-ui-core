import '@progress/kendo-ui/src/kendo.data.js';
import { asyncTest } from '../../../helpers/unit/async-utils.js';

let schema = {
    id: function(record) {
        return record.id;
    },
    data: function(data) {
        return data;
    }
};

let data = [];

let DataSource = kendo.data.DataSource;

describe("data source read", function() {
    beforeEach(function() {
        $.mockjaxSettings.responseTime = 0;
    });
    afterEach(function() {
        $.mockjax.clear();
    });

    function setup(source) {
        data = source || [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }];

        let dataSource = new DataSource({
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

    it("reads data through transport", function() {
        let readWasCalled = false,
            dataSource = new DataSource({
                schema: schema,
                transport: {
                    read: function(callback) {
                        readWasCalled = true;
                    }
                }
            });

        dataSource.read();
        assert.isOk(readWasCalled);
    });

    it("reads data", function() {
        let dataSource = setup();

        assert.isOk(dataSource.data().length);
    });

    it("read triggers load event", function() {
        let dataSource = setup();
        let argument;

        dataSource.bind("load", function(data) {
            argument = data;
        });

        assert.equal(data.length, 2);
    });

    it("Changes to the raw data in requestEnd event does take effect", function() {
        let dataSource = new DataSource({
            data: []
        });

        dataSource.bind("requestEnd", function(e) {
            $.extend(e.response, [{ foo: "bar" }]);
        });

        dataSource.bind("change", function() {
            assert.equal(this.data().length, 1);
            assert.equal(this.data()[0].foo, "bar");
        });

        dataSource.read();
    });

    it("read triggers the requestEnd event passing the raw data", function() {
        let dataSource = new DataSource({
            data: data
        });

        dataSource.bind("requestEnd", function(e) {
            assert.deepEqual(e.response, data);
        });

        dataSource.read();
    });

    it("read triggers the requestEnd event passing operation type", function() {
        let data = [{ foo: "bar" }],
            dataSource = new DataSource({
                data: data
            });

        dataSource.bind("requestEnd", function(e) {
            assert.deepEqual(e.response, data);
            assert.deepEqual(e.type, "read");
        });

        dataSource.read();
    });

    it("read triggers the requestEnd event if custom error is present", function() {
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success({
                        errors: "foo"
                    });
                }
            }
        });

        dataSource.bind("requestEnd", function() {
            assert.isOk(true);
        });

        dataSource.read();
    });

    it("read triggers the requestEnd event if request errors", function() {
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.error({});
                }
            }
        });

        dataSource.bind("requestEnd", function() {
            assert.isOk(true);
        });

        dataSource.read();
    });

    it("read raises the change event", function() {
        let dataSource = new DataSource({
            data: data
        });
        let changeWasCalled = false;

        dataSource.bind("change", function() {
            changeWasCalled = true;
        });

        dataSource.read();

        assert.isOk(changeWasCalled);
    });

    it("read raises the reset event", function() {
        let dataSource = new DataSource({
            data: data
        });

        let resetWasCalled = false;

        dataSource.bind("reset", function() {
            resetWasCalled = true;
        });

        dataSource.read();

        assert.isOk(resetWasCalled);
    });


    it("data is initially empty", function() {
        let dataSource = new DataSource({
            data: data
        });

        assert.equal(dataSource.data().length, 0);
    });

    it("view is initially empty", function() {
        let dataSource = new DataSource({
            data: data
        });

        assert.equal(dataSource.view().length, 0);
    });

    it("read sorts if sort is set", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            sort: { field: "bar", dir: "asc" }
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view.length, 2);
        assert.equal(view[0].bar, "baz");
        assert.equal(view[1].bar, "foo");
    });

    it("read pages if pageSize is set", function() {
        let dataSource = new DataSource({
            data: [1, 2, 3],
            page: 2,
            pageSize: 1
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view.length, 1);
        assert.equal(view[0], 2);
    });

    it("read does not page if pageSize is set and serverPaging = true", function() {
        let dataSource = new DataSource({
            data: [1, 2, 3],
            page: 2,
            pageSize: 1,
            serverPaging: true
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view.length, 3);
        assert.equal(view[0], 1);
    });

    it("read does not sort if sort is set and serverSorting = true", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            sort: { field: "bar", dir: "desc" },
            serverSorting: true
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view[0].bar, "foo");
    });

    it("read calls schema set through constructor", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            schema: {
                data: function(data) {
                    readerWasCalled = true;
                    return data;
                }
            }
        });

        let readerWasCalled = false;
        dataSource.read();
        assert.isOk(readerWasCalled);
    });

    it("read reads item total count", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }]
        });

        dataSource.read();
        assert.equal(dataSource.total(), 2);
    });

    it("read reads total through function passed in constructor", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            schema: {
                total: function() {
                    totalWasCalled = true;
                    return arguments[0].length;
                }
            }
        });
        let totalWasCalled = false;

        dataSource.read();
        assert.isOk(totalWasCalled);
        assert.equal(dataSource.total(), 2);
    });

    asyncTest("error event is raised if transport fails loading data", function(done) {
        let dataSource = new DataSource({
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
            done(() => {
                assert.isOk(e);
                assert.isOk(e.xhr);
                assert.isOk(e.status);
                assert.isOk("errorThrown" in e);
            });
        });

        dataSource.read();
    });

    it("error event is raised if custom schema error returns non empty object", function() {
        let dataSource = new DataSource({
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
            assert.isOk(e);
            assert.equal(e.status, "customerror");
            assert.deepEqual(e.errors, { myError: "some error" });
        });
        dataSource.read();
    });

    it("request is executed after custom schema error is called", function() {
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    assert.isOk(true);
                    options.success({ myerrors: { myError: "some error" } });
                }
            },
            schema: {
                errors: "myerrors"
            }
        });

        dataSource.bind("error", function(e) {
            assert.isOk(true);
        });

        dataSource.read();
        dataSource.read();
    });

    it("error event is raised if custom schema error function returns non empty object", function() {
        let dataSource = new DataSource({
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
            assert.isOk(e);
            assert.equal(e.status, "customerror");
            assert.deepEqual(e.errors, { myError: "some error" });
        });
        dataSource.read();
    });

    it("error event is raised if schema error returns non empty object", function() {
        let dataSource = new DataSource({
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
            assert.isOk(e);
            assert.equal(e.status, "customerror");
            assert.deepEqual(e.errors, { myError: "some error" });
        });
        dataSource.read();
    });

    asyncTest("dequeue the request if transport fails to load data", function(done) {
        let dataSource = new DataSource({
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
            done(() => {
                assert.isOk(!dataSource._requestInProgress);
                assert.isOk(!dataSource._pending);
            });
        });

        dataSource.read();
    });

    it("url as a function", function() {
        let dataSource = new DataSource({
            transport: {
                read: {
                    url: function() {
                        assert.isOk(true, "url() is called");
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

    it("transport data is passed to url when it is a function", function() {
        let dataSource = new DataSource({
            transport: {
                read: {
                    url: function(options) {
                        assert.isOk(options.foo, "bar");
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

    it("read filters if filter is set", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            filter: { field: "bar", operator: "==", value: "baz" }
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view.length, 1);
        assert.equal(view[0].bar, "baz");
    });

    it("read does not filter if filter is set and serverFiltering = true", function() {
        let dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
            filter: { field: "bar", operator: "==", value: "baz" },
            serverFiltering: true
        });

        dataSource.read();
        let view = dataSource.view();
        assert.equal(view.length, 2);
        assert.equal(view[0].bar, "foo");
    });

    it("read does not read data through group if grouping is applied", function() {
        let isCalled = false,
            dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz" }],
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
        assert.isOk(!isCalled);
    });
    it("read group expression are passed to the transport", function() {
        let group, dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz" }],
            group: { field: "bar" },
            transport: {
                read: function(options) {
                    group = options.data.group;
                }
            },
            serverGrouping: true
        });
        dataSource.read();
        assert.isOk(group);
    });
    it("read aggregates expression are passed to the transport", function() {
        let aggregates, dataSource = new DataSource({
            data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }, { id: 3, bar: "baz" }],
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
        assert.isOk(aggregates);
    });

    it("mutiple simultaneous requests are queued", function() {
        let called = 0, dataSource = new DataSource({
            transport: {
                read: function(options) {
                    called++;
                }
            }
        });
        dataSource.read();
        dataSource.read();
        dataSource.read();

        assert.equal(called, 1);
        assert.isOk(dataSource._pending);
    });

    it("mutiple simultaneous requests are queued and only last one is executed", function() {
        let called = 0, dataSource = new DataSource({
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
        assert.equal(called, 2);
        assert.isOk(!dataSource._pending);
    });

    it("requests are dequeued after change event", function() {
        let timesCalled = 0;
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    timesCalled++;
                    if (timesCalled == 1) {
                        dataSource.read();
                        options.success([]);
                    }
                }
            },
            change: function() {
                assert.isOk(dataSource._pending, "Second request is not pending");
            }
        });

        dataSource.read();
    });

    it("setting data should trigger change event", function() {
        let called = false,
            dataSource = new DataSource({
                data: [1, 2, 3, 4, 5],
                change: function() {
                    called = true;
                }
            });
        dataSource.data([6, 7, 8, 9, 10]);
        assert.isOk(called);
    });

    it("setting data updates the total", function() {
        let called = false,
            dataSource = new DataSource({
            });

        dataSource.data([6, 7, 8, 9, 10]);
        assert.equal(dataSource.total(), 5);
    });

    it("setting data persist the total after query", function() {
        let called = false,
            dataSource = new DataSource({
                pageSize: 2
            });

        dataSource.data([6, 7, 8, 9, 10]);
        dataSource.page(2);

        assert.equal(dataSource.total(), 5);
    });

    it("setting data persist the total after query with initial data", function() {
        let called = false,
            dataSource = new DataSource({
                data: { data: [{ foo: "bar" }] },
                schema: {
                    data: "data"
                },
                pageSize: 2
            });

        dataSource.data([6, 7, 8, 9, 10]);
        dataSource.page(2);
        assert.equal(dataSource.total(), 5);
    });

    it("setting data should updates the dataSource data", function() {
        let dataSource = new DataSource({
            data: [1, 2, 3, 4, 5]
        });

        dataSource.data([6, 7, 8, 9, 10]);
        assert.equal(dataSource.data().length, 5);
        assert.equal(dataSource.data()[0], 6);
        assert.equal(dataSource.data()[1], 7);
        assert.equal(dataSource.data()[2], 8);
        assert.equal(dataSource.data()[3], 9);
        assert.equal(dataSource.data()[4], 10);
    });

    it("pristine data is not change if data is modified", function() {
        let data = [1, 2, 3, 4, 5],
            dataSource = new DataSource({
                data: data
            });
        dataSource.read();

        dataSource.data()[0] = 6;
        assert.equal(dataSource.data()[0], 6);
        assert.equal(dataSource._pristineData[0], 1);
    });

    it("paging info is not passed to the transport if serverpaging is false", function() {
        let dataSource = new DataSource({
            page: 3,
            pageSize: 20,
            transport: {
                read: function(data) {
                    assert.isOk(!("page" in data.data));
                    assert.isOk(!("skip" in data.data));
                    assert.isOk(!("take" in data.data));
                    assert.isOk(!("pageSize" in data.data));
                }
            }
        });

        dataSource.read();
    });

    it("filter info is not passed to the transport if serverfiltering is false", function() {
        let dataSource = new DataSource({
            filter: { field: "foo", op: "eq", value: "bar" },
            transport: {
                read: function(data) {
                    assert.isOk(!("filter" in data.data));
                }
            }
        });

        dataSource.read();
    });

    it("sort info is not passed to the transport if serversorting is false", function() {
        let dataSource = new DataSource({
            sort: { field: "foo", dir: "asc" },
            transport: {
                read: function(data) {
                    assert.isOk(!("sort" in data.data));
                }
            }
        });

        dataSource.read();
    });

    it("aggregate info is not passed to the transport if serveraggregates is false", function() {
        let dataSource = new DataSource({
            aggregate: { field: "foo" },
            transport: {
                read: function(data) {
                    assert.isOk(!("aggregate" in data.data));
                }
            }
        });

        dataSource.read();
    });


    it("group info is not passed to the transport if servergrouping is false", function() {
        let dataSource = new DataSource({
            group: { field: "foo" },
            transport: {
                read: function(data) {
                    assert.isOk(!("group" in data.data));
                }
            }
        });

        dataSource.read();
    });

    it("read returns promise", function() {
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.success([]);
                }
            }
        });

        assert.isOk(kendo.isFunction(dataSource.read().then));
    });

    asyncTest("read resolves promise upon success", function(done) {
        let deferred = $.Deferred();
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    deferred.then(function() {
                        options.success([]);
                    });
                }
            }
        });

        let readPromise = dataSource.read();
        assert.equal(readPromise.state(), "pending");

        deferred.resolve();

        setTimeout(() => {
            done(() => assert.equal(readPromise.state(), "resolved"));
        });
    });

    asyncTest("read resolves promise after data was processed", function(done) {
        let deferred = $.Deferred();
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    deferred.then(function() {
                        options.success([{ id: 1 }]);
                    });
                }
            }
        });

        dataSource.read()
            .then(function() {
                done(() => assert.isOk(dataSource.get(1)));
            });

        deferred.resolve();
    });

    asyncTest("read rejects promise upon error", function(done) {
        let deferred = $.Deferred();
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    deferred.then(function() {
                        options.error({});
                    });
                }
            }
        });

        let readPromise = dataSource.read();
        assert.equal(readPromise.state(), "pending");

        deferred.resolve();

        setTimeout(() => {
            done(() => assert.equal(readPromise.state(), "rejected"));
        });
    });

    it("read rejects promise with error arguments", function() {
        let errorArgs = { foo: 1 };
        let dataSource = new DataSource({
            transport: {
                read: function(options) {
                    options.error(errorArgs);
                }
            }
        });

        dataSource.read()
            .fail(function(e) {
                assert.strictEqual(e, errorArgs);
            });
    });

    asyncTest("read resolves promise when requestStart is prevented", function(done) {
        let dataSource = new DataSource({
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
                done(() => assert.isOk(true));
            });
    });

    it("_pageSize is not set to total if a pageSize is present in the options and it is larger than the total", function() {
        let dataSource = new DataSource({
            pageSize: 4,
            transport: {
                read: function(options) {
                    options.success([1, 2, 4]);
                }
            }
        });

        dataSource.read();

        assert.equal(dataSource._pageSize, 4);
    });

});
