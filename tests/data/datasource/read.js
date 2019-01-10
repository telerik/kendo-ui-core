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

    describe("data source read", function() {
        beforeEach(function() {
            $.mockjaxSettings.responseTime = 0;
        });
        afterEach(function() {
            $.mockjax.clear();
        });

        function setup(source) {
            data = source || [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }];

            var dataSource = new DataSource({
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
            var readWasCalled = false,
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
            var dataSource = setup();

            assert.isOk(dataSource.data().length);
        });

        it("read triggers load event", function() {
            var dataSource = setup();
            var argument;

            dataSource.bind("load", function(data) {
                argument = data;
            });

            assert.equal(data.length, 2);
        });

        it("Changes to the raw data in requestEnd event does take effect", function() {
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
                data: data
            });

            dataSource.bind("requestEnd", function(e) {
                assert.deepEqual(e.response, data);
            });

            dataSource.read();
        });

        it("read triggers the requestEnd event passing operation type", function() {
            var data = [{ foo: "bar" }],
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
                assert.isOk(true);
            });

            dataSource.read();
        });

        it("read triggers the requestEnd event if request errors", function() {
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
                data: data
            });
            var changeWasCalled = false;

            dataSource.bind("change", function() {
                changeWasCalled = true;
            });

            dataSource.read();

            assert.isOk(changeWasCalled);
        });

        it("read raises the reset event", function() {
            var dataSource = new DataSource({
                data: data
            });

            var resetWasCalled = false;

            dataSource.bind("reset", function() {
                resetWasCalled = true;
            });

            dataSource.read();

            assert.isOk(resetWasCalled);
        });


        it("data is initially empty", function() {
            var dataSource = new DataSource({
                data: data
            });

            assert.equal(dataSource.data().length, 0);
        });

        it("view is initially empty", function() {
            var dataSource = new DataSource({
                data: data
            });

            assert.equal(dataSource.view().length, 0);
        });

        it("read sorts if sort is set", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                sort: { field: "bar", dir: "asc" }
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view.length, 2);
            assert.equal(view[0].bar, "baz");
            assert.equal(view[1].bar, "foo");
        });

        it("read pages if pageSize is set", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                page: 2,
                pageSize: 1
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0], 2);
        });

        it("read does not page if pageSize is set and serverPaging = true", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                page: 2,
                pageSize: 1,
                serverPaging: true
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view.length, 3);
            assert.equal(view[0], 1);
        });

        it("read does not sort if sort is set and serverSorting = true", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                sort: { field: "bar", dir: "desc" },
                serverSorting: true
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view[0].bar, "foo");
        });

        it("read calls schema set through constructor", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                schema: {
                    data: function(data) {
                        readerWasCalled = true;
                        return data;
                    }
                }
            });

            var readerWasCalled = false;
            dataSource.read();
            assert.isOk(readerWasCalled);
        });

        it("read reads item total count", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }]
            });

            dataSource.read();
            assert.equal(dataSource.total(), 2);
        });

        it("read reads total through function passed in constructor", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                schema: {
                    total: function() {
                        totalWasCalled = true;
                        return arguments[0].length;
                    }
                }
            });
            var totalWasCalled = false;

            dataSource.read();
            assert.isOk(totalWasCalled);
            assert.equal(dataSource.total(), 2);
        });

        it("error event is raised if transport fails loading data", function(done) {
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
                assert.isOk(e);
                assert.isOk(e.xhr);
                assert.isOk(e.status);
                assert.isOk("errorThrown" in e);
                done();
            });

            dataSource.read();
        });

        it("error event is raised if custom schema error returns non empty object", function() {
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
                assert.isOk(e);
                assert.equal(e.status, "customerror");
                assert.deepEqual(e.errors, { myError: "some error" });
            });
            dataSource.read();
        });

        it("request is executed after custom schema error is called", function() {
            var dataSource = new DataSource({
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
                assert.isOk(e);
                assert.equal(e.status, "customerror");
                assert.deepEqual(e.errors, { myError: "some error" });
            });
            dataSource.read();
        });

        it("error event is raised if schema error returns non empty object", function() {
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
                assert.isOk(e);
                assert.equal(e.status, "customerror");
                assert.deepEqual(e.errors, { myError: "some error" });
            });
            dataSource.read();
        });

        it("dequeue the request if transport fails to load data", function(done) {
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
                assert.isOk(!dataSource._requestInProgress);
                assert.isOk(!dataSource._pending);
                done();
            });

            dataSource.read();
        });

        it("url as a function", function() {
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                filter: { field: "bar", operator: "==", value: "baz" }
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0].bar, "baz");
        });

        it("read does not filter if filter is set and serverFiltering = true", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }],
                filter: { field: "bar", operator: "==", value: "baz" },
                serverFiltering: true
            });

            dataSource.read();
            var view = dataSource.view();
            assert.equal(view.length, 2);
            assert.equal(view[0].bar, "foo");
        });

        it("read does not read data through group if grouping is applied", function() {
            var isCalled = false,
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
            var group, dataSource = new DataSource({
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
            var aggregates, dataSource = new DataSource({
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

            assert.equal(called, 1);
            assert.isOk(dataSource._pending);
        });

        it("mutiple simultaneous requests are queued and only last one is executed", function() {
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
            assert.equal(called, 2);
            assert.isOk(!dataSource._pending);
        });

        it("requests are dequeued after change event", function() {
            var timesCalled = 0;
            var dataSource = new DataSource({
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
            var called = false,
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
            var called = false,
                dataSource = new DataSource({
                });

            dataSource.data([6, 7, 8, 9, 10]);
            assert.equal(dataSource.total(), 5);
        });

        it("setting data persist the total after query", function() {
            var called = false,
                dataSource = new DataSource({
                    pageSize: 2
                });

            dataSource.data([6, 7, 8, 9, 10]);
            dataSource.page(2);

            assert.equal(dataSource.total(), 5);
        });

        it("setting data persist the total after query with initial data", function() {
            var called = false,
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
            var dataSource = new DataSource({
                data: [1, 2, 3, 4, 5],
                change: function() {
                    called = true;
                }
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
            var data = [1, 2, 3, 4, 5],
                dataSource = new DataSource({
                    data: data
                });
            dataSource.read();

            dataSource.data()[0] = 6;
            assert.equal(dataSource.data()[0], 6);
            assert.equal(dataSource._pristineData[0], 1);
        });

        it("paging info is not passed to the transport if serverpaging is false", function() {
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
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
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success([]);
                    }
                }
            });

            assert.isOk($.isFunction(dataSource.read().then));
        });

        it("read resolves promise upon success", function() {
            jasmine.clock().install();

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
            assert.equal(readPromise.state(), "pending");

            deferred.resolve();

            jasmine.clock().tick();

            assert.equal(readPromise.state(), "resolved");

            jasmine.clock().uninstall();
        });

        it("read resolves promise after data was processed", function() {
            jasmine.clock().install();

            var deferred = $.Deferred();
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        deferred.then(function() {
                            options.success([{ id: 1 }]);
                            jasmine.clock().tick();
                        });
                    }
                }
            });

            dataSource.read()
                .then(function() {
                    assert.isOk(dataSource.get(1));
                });

            deferred.resolve();

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

        it("read rejects promise upon error", function() {
            jasmine.clock().install();

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
            assert.equal(readPromise.state(), "pending");

            deferred.resolve();

            jasmine.clock().tick();

            assert.equal(readPromise.state(), "rejected");

            jasmine.clock().uninstall();
        });

        it("read rejects promise with error arguments", function() {
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
                    assert.strictEqual(e, errorArgs);
                });
        });

        it("read resolves promise when requestStart is prevented", function() {
            jasmine.clock().install();

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
                    assert.isOk(true);
                });

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

        it("_pageSize is not set to total if a pageSize is present in the options and it is larger than the total", function() {
            var dataSource = new DataSource({
                pageSize: 4,
                transport: {
                    read: function(options) {
                        options.success([1, 2, 4]);
                    }
                }
            });

            dataSource.read()

            assert.equal(dataSource._pageSize, 4);
        });

    });
}());
