(function() {
    describe("data source query", function() {
        beforeEach(function() {
            $.mockjaxSettings.contentType = 'text/json';
            $.mockjaxSettings.responseTime = 0;
        });
        afterEach(function() {
            $.mockjax.clear()
        });

        var data = [];
        var RemoteTransport = kendo.data.RemoteTransport;
        var DataSource = kendo.data.DataSource;

        function setup(source) {
            data = source || [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }];

            var dataSource = new DataSource({
                data: data
            });

            dataSource.read();
            return dataSource;
        }

        it("query raises the change event", function() {
            var dataSource = new DataSource({
                data: data
            });
            var changeWasCalled = false;

            dataSource.read();

            dataSource.bind("change", function() {
                changeWasCalled = true;
            });

            dataSource.query({});

            assert.isOk(changeWasCalled);
        });

        it("query sets the pageSize", function() {
            var dataSource = new DataSource({
                data: data
            });
            dataSource.query({ pageSize: 1 });
            assert.equal(dataSource.pageSize(), 1);
        });

        it("query sets page", function() {
            var dataSource = new DataSource({
                data: data
            });

            dataSource.query({ page: 1 });
            assert.equal(dataSource.page(), 1);
        });

        it("query sets sort", function() {
            var dataSource = new DataSource({
                data: data
            });

            dataSource.query({ sort: { field: "foo", dir: "asc" } });
            assert.isOk($.isArray(dataSource.sort()));
            assert.equal(dataSource.sort()[0].field, "foo");
            assert.equal(dataSource.sort()[0].dir, "asc");

        });

        it("query should sort the data array when inPlaceSort is enabled and filter is applied", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }],
                inPlaceSort: true
            });

            dataSource.query({
                filter: { field: "id", operator: "eq", value: "1" },
                sort: {
                    field: "id", dir: "desc"
                }
            });

            assert.equal(dataSource.data()[0].id, 2);
        });

        it("query sets custom comparer", function() {
            var dataSource = new DataSource({
                data: data
            });

            var comparer = function() { };
            dataSource.query({ sort: { dir: "asc", compare: comparer } });
            assert.equal(dataSource.sort()[0].compare, comparer);
        });

        it("query sets sort when array is passed", function() {
            var dataSource = new DataSource({
                data: data
            });

            dataSource.query({ sort: [{ field: "foo", dir: "asc" }, { field: "bar", dir: "desc" }] });
            assert.equal(dataSource.sort().length, 2);
            assert.equal(dataSource.sort()[1].field, "bar");
            assert.equal(dataSource.sort()[1].dir, "desc");
        });

        it("paging", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3]
            });

            dataSource.read();
            dataSource.query({ pageSize: 1, page: 2 });

            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0], 2);
        });

        it("sorting", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.query({ sort: { field: "age", dir: "desc" } });
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 2);
            assert.equal(view[1].age, 1);
        });

        it("sorting sort expression are removed from the state if not passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.query({ sort: { field: "age", dir: "desc" } });
            dataSource.query({});
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(view[1].age, 2);
            assert.equal(dataSource.sort(), undefined);
        });

        it("sorting though sort method", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.sort({ field: "age", dir: "desc" });
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 2);
            assert.equal(view[1].age, 1);
        });

        it("paging is after sorting", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });

            dataSource.read();
            dataSource.query({ page: 2, pageSize: 1, sort: { field: "age", dir: "desc" } });
            var view = dataSource.view();

            assert.equal(view[0].age, 1);
        });

        it("original data is not modified", function() {
            var data = [{ age: 1 }, { age: 2 }];

            var dataSource = new DataSource({
                data: data
            });
            dataSource.read();
            dataSource.query({ page: 2, pageSize: 1, sort: { field: "age", dir: "desc" } });
            var view = dataSource.data();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(view[1].age, 2);
        });

        it("data is not sorted if serverSorting = true", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                serverSorting: true
            }).bind("change", function() {

                assert.isOk(true);
                var view = dataSource.view();
                assert.equal(view[0].age, 1);
                assert.equal(view[1].age, 2);
                done();
            });

            $.mockjax({
                url: "foo",
                responseText: '[{"age": 1}, {"age": 2}]'
            });

            dataSource.query({ sort: { field: "age", dir: "desc" } });
        });

        it("data is not paged if serverPaging = true", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true
            }).bind("change", function() {

                var view = dataSource.view();
                assert.equal(view[0].age, 1);
                assert.equal(view[1].age, 2);
                done();
            });

            $.mockjax({
                url: "foo",
                responseText: '[{"age": 1}, {"age": 2}]'
            });

            dataSource.query({ page: 2, pageSize: 1 });
        });

        it("group original field name is used if projection with from is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.group[0].field, "foo");
                    assert.equal(options.group[1].field, "baz");

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: { from: "foo" },
                            boo: { from: "baz" }
                        }
                    }
                },
                serverGrouping: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.group([{ field: "bar" }, { field: "boo" }]);
        });

        it("group original field name is used if projection is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.group[0].field, "foo");
                    assert.equal(options.group[1].field, "baz");

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo",
                            boo: "baz"
                        }
                    }
                },
                serverGrouping: true,
            });

            $.mockjax({
                url: "foo"
            });

            dataSource.group([{ field: "bar" }, { field: "boo" }]);
        });

        it("group with aggregates original field name is used if projection is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.group[0].aggregates[0].field, "foo");
                    assert.equal(options.group[0].aggregates[1].field, "baz");

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo",
                            boo: "baz"
                        }
                    }
                },
                serverGrouping: true,
            });

            $.mockjax({
                url: "foo"
            });

            dataSource.group({
                field: "bar",
                aggregates: [{
                    field: "bar",
                    aggregate: "count"
                }, {
                    field: "boo",
                    aggregate: "count"
                }]
            });

        });

        it("aggregates original field name is used if projection is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.aggregate[0].field, "foo");
                    assert.equal(options.aggregate[1].field, "baz");

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo",
                            boo: "baz"
                        }
                    }
                },
                serverAggregates: true,
            });

            $.mockjax({
                url: "foo"
            });

            dataSource.aggregate(
                [{
                    field: "bar",
                    aggregate: "count"
                }, {
                    field: "boo",
                    aggregate: "count"
                }]);
        });

        it("filter without model definition and serverFiltering", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].field, "foo");

                    return options;
                }
            });

            var dataSource = new kendo.data.DataSource({
                transport: transport,
                serverFiltering: true,
                schema: {
                    model: {
                        fields: {}
                    }
                }
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.filter({ field: "foo", operator: "eq", value: "bar" });
        });

        it("filter without model definition and serverFiltering HierarchicalDataSource", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].field, "foo");

                    return options;
                }
            });

            var dataSource = new kendo.data.HierarchicalDataSource({
                transport: transport,
                serverFiltering: true,
                schema: {
                    model: {
                        fields: {}
                    }
                }
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.filter({ field: "foo", operator: "eq", value: "bar" });
        });

        it("filter original field name is used if projection is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.filter.filters[0].field, "foo");
                    assert.equal(options.filter.filters[1].field, "baz");

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo",
                            boo: "baz"
                        }
                    }
                },
                serverFiltering: true
            });

            $.mockjax({
                url: "foo",
            });


            dataSource.filter({
                logic: "and",
                filters: [
                    { field: "bar", operator: "eq", value: 1 },
                    { field: "boo", operator: "eq", value: 1 },
                ]
            });
        });

        it("filter with no descriptors persist filters property", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.isOk(options.filter.filters);

                    return options;
                }
            });

            var dataSource = new kendo.data.DataSource({
                transport: transport,
                serverFiltering: true,
                schema: {
                    model: {
                        fields: {}
                    }
                }
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.filter({ logic: "and", filters: [] });
        });

        it("sort datasource state is not modified after original field is restored", function() {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo"
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "bar", dir: "asc" });
            assert.equal(dataSource.sort()[0].field, "bar");
        });

        it("filter datasource state is not modified after original field is restored", function() {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo"
                        }
                    }
                },
                serverFiltering: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.filter({ field: "bar", operator: "eq", value: "42" });
            assert.equal(dataSource.filter().filters[0].field, "bar");
        });

        it("sort original field name is used if projection is set", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.sort[0].field, "foo");
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: "foo"
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "bar", dir: "asc" });
        });

        it("sort original field name is used if projection is set if xml is used", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.sort[0].field, "bar");
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    type: "xml",
                    model: {
                        fields: {
                            bar: "bar/text()"
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "bar", dir: "asc" });
        });

        it("sort original field name is used if projection is set via field definition", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.sort[0].field, "foo");
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: { field: "foo" }
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "bar", dir: "asc" });
        });

        it("sort original field name is used if projection is set field definiton without a field options", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.sort[0].field, "bar");
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            bar: { type: "number" }
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "bar", dir: "asc" });
        });

        it("sort original field name is used if complex field", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.sort[0].field, "foo.bar");
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                schema: {
                    model: {
                        fields: {
                            foo: { type: "object" }
                        }
                    }
                },
                serverSorting: true,
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.sort({ field: "foo.bar", dir: "asc" });
        });

        it("next method gets the subsequent page", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.next();

            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0], 2);
            assert.equal(dataSource.page(), 2);
        });

        it("next method does nothing if no subsequent page", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.page(3);

            dataSource.next();

            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0], 3);
            assert.equal(dataSource.page(), 3);
        });

        it("next method gets the subsequent page from server", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.page, 2);

                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true,
                pageSize: 1
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.next();
        });

        it("next method does nothing if pageSize is not defined (remote transport)", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.isOk(false)
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.next();
        });

        it("next method does nothing (local transport)", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3]
            });

            dataSource.next();

            assert.equal(dataSource.view().length, 0);
        });

        it("next method honors total size", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 3
            });

            dataSource.read();
            var page = dataSource.next();

            assert.equal(dataSource.total(), 3);
            assert.equal(page, undefined);
        });

        it("next method accepts parameters", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();

            stub(dataSource, {
                query: dataSource.query
            });

            dataSource.next({
                custom: "custom"
            });

            assert.equal(dataSource.args("query", 0)[0].custom, "custom");
        });

        it("next page overrides page property of the passed parameters", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();

            stub(dataSource, {
                query: dataSource.query
            });

            dataSource.next({
                page: 3
            });

            assert.equal(dataSource.args("query", 0)[0].page, 2);
        });

        it("prev method gets the previous page", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.page(3);
            var page = dataSource.prev();

            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0], 2);
            assert.equal(dataSource.page(), 2);
            assert.equal(page, 2);
        });

        it("prev method does nothing if no previous page", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.prev();

            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0], 1);
            assert.equal(dataSource.page(), 1);
        });

        it("prev method gets the previous page from server", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.equal(options.page, 1);
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true,
                pageSize: 1
            });
            dataSource._skip = 1; //fake current page (zero based)

            $.mockjax({
                url: "foo",
            });

            dataSource.prev();
        });

        it("prev method does nothing if pageSize is not defined (remote transport)", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.isOk(false)
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.prev();
        });

        it("prev method does nothing (local transport)", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3]
            });

            dataSource.prev();

            assert.equal(dataSource.view().length, 0);
        });

        it("prev does not page if no previous page (remote transport)", function() {
            var transport = new RemoteTransport({
                read: "foo",
                parameterMap: function(options) {
                    assert.isOk(false)
                    return options;
                }
            });

            var dataSource = new DataSource({
                transport: transport,
                serverPaging: true,
                pageSize: 1
            });

            $.mockjax({
                url: "foo",
            });

            dataSource.prev();
        });

        it("prev method accepts parameters", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.page(3);

            stub(dataSource, {
                query: dataSource.query
            });

            dataSource.prev({
                custom: "custom"
            });

            assert.equal(dataSource.args("query", 0)[0].custom, "custom");
        });

        it("prev method overrides passed page parameter", function() {
            var dataSource = new DataSource({
                data: [1, 2, 3],
                pageSize: 1
            });

            dataSource.read();
            dataSource.page(3);

            stub(dataSource, {
                query: dataSource.query
            });

            dataSource.prev({
                page: 1
            });

            assert.equal(dataSource.args("query", 0)[0].page, 2);
        });

        it("page should page and persist settings applied through the constructor", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }],
                pageSize: 2,
                sort: {
                    field: "age",
                    dir: "desc"
                }
            });

            dataSource.read();
            dataSource.page(2);

            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0].age, 1);
            assert.equal(dataSource.page(), 2);
        });

        it("page with no pageSize set should return all data", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.read();
            dataSource.page(2);

            var view = dataSource.view();
            assert.equal(view.length, 3);
            assert.equal(view[0].age, 1);
            assert.equal(dataSource.page(), 1);
        });

        it("page cannot be set to value greater than the totalPages", function() {
            var dataSource = new DataSource({
                pageSize: 1,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.read();
            dataSource.page(42);
            assert.equal(dataSource.page(), 3);
        });

        it("page cannot be set to value lower than the first page", function() {
            var dataSource = new DataSource({
                pageSize: 1,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.read();
            dataSource.page(0);
            assert.equal(dataSource.page(), 1);
        });

        it("pageSize should take given number of items", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }],
                page: 1
            });

            dataSource.read();
            dataSource.pageSize(2);

            var view = dataSource.view();
            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(dataSource.pageSize(), 2);
        });

        it("data is populated if query is called without call to read", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.query({ page: 1, pageSize: 2 });
            assert.equal(dataSource.view().length, 2);
        });

        it("query triggers change event when called without read", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            var changeWasCalled = false;
            dataSource.bind("change", function() {
                changeWasCalled = true;
            });

            dataSource.query({ page: 1, pageSize: 2 });
            assert.isOk(changeWasCalled);
        });

        it("total is populated if query is called without call to read", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.query({ page: 1, pageSize: 2 });
            assert.equal(dataSource.total(), 3);
        });

        it("query should filter if filter is set", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }]
            });

            dataSource.query({ filter: { field: "bar", operator: "==", value: "baz" } });
            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0].bar, "baz");

            assert.isOk(dataSource.view()[0] instanceof kendo.data.ObservableObject);
        });

        it("filter first page is shown", function() {
            var dataSource = new DataSource({
                data: [{ id: 1 }, { id: 2 }],
                pageSize: 1,
                page: 2
            });

            dataSource.filter({ field: "id", operator: "==", value: 2 });
            assert.equal(dataSource.page(), 1);
            assert.equal(dataSource.view()[0].id, 2);
        });

        it("filter operators are normalized", function() {
            var dataSource = new DataSource({
                data: [{ id: 1 }, { id: 2 }]
            });

            dataSource.filter({ field: "id", operator: "==", value: 1 });
            assert.equal(dataSource.filter().filters[0].operator, "eq");
        });

        it("query should update the total if filtering is enabled", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }]
            });

            dataSource.query({ filter: { field: "bar", operator: "==", value: "baz" } });
            assert.equal(dataSource.total(), 1);
        });

        it("query does not filter data if serverFiltering = true", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                serverFiltering: true
            }).bind("change", function() {

                var view = dataSource.view();
                assert.equal(view.length, 2);
                assert.equal(view[0].age, 1);
                assert.equal(view[1].age, 2);
                done();
            });

            $.mockjax({
                url: "foo",
                responseText: '[{"age": 1}, {"age": 2}]'
            });

            dataSource.query({ filter: { field: "age", operator: "==", value: 2 } });
        });

        it("total is correct after adding a removed item, when data is single item", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, bar: "foo" }]
            });

            dataSource.read();

            var item = dataSource.at(0);
            dataSource.remove(item);
            dataSource.add(item);

            assert.equal(dataSource.total(), 1);
        });

        it("cancelChanges refresh the total if serverpaging is enabled", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success({ data: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }], total: 2 });
                    }
                },
                schema: {
                    data: "data",
                    total: "total"
                },
                serverPaging: true
            });

            dataSource.read();

            dataSource.add({});
            dataSource.cancelChanges();
            assert.equal(dataSource.total(), 2);
        });

        it("cancelChanges refresh the total if bound to an observablearray", function() {
            var data = new kendo.data.ObservableArray([{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }]),
                dataSource = new DataSource({
                    data: data
                });

            dataSource.read();

            dataSource.add({});
            dataSource.cancelChanges();
            assert.equal(dataSource.total(), 2);
        });


        it("cancelChanges refresh the total if serverpaging is enabled and grouping is applied", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success({ group: [{ items: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }] }, { items: [{ id: 1, bar: "foo" }] }], total: 10 });
                    }
                },
                schema: {
                    groups: "group",
                    total: "total"
                },
                group: { field: "id" },
                serverPaging: true,
                serverGrouping: true
            });

            dataSource.read();

            dataSource.add({});
            dataSource.cancelChanges();
            assert.equal(dataSource.total(), 10);
        });

        it("cancelChanges of a newly inserted item removes the empty group if serverpaging is enabled and grouping is applied", function() {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ group: [{ items: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }] }, { items: [{ id: 3, bar: "foo" }] }], total: 10 });
                    }
                },
                schema: {
                    groups: "group",
                    model: {
                        id: "id"
                    }
                },
                group: { field: "id" },
                serverPaging: true,
                serverGrouping: true
            });

            dataSource.read();
            dataSource.add({ bar: "test" });
            var model = dataSource.get("");
            dataSource.cancelChanges(model);
            assert.equal(dataSource.view().length, 2);
        });

        it("delete the last item in group removes the empty group if serverpaging is enabled and grouping is applied", function() {
            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ group: [{ items: [{ id: 1, bar: "foo" }, { id: 2, bar: "baz" }] }, { items: [{ id: 3, bar: "foo" }] }], total: 10 });
                    }
                },
                schema: {
                    groups: "group",
                    model: {
                        id: "id"
                    }
                },
                group: { field: "id" },
                serverPaging: true,
                serverGrouping: true
            });

            dataSource.read();
            dataSource.add({ bar: "test" });
            var model = dataSource.get("");
            dataSource.remove(model);
            assert.equal(dataSource.view().length, 2);
        });

        it("paging is after filtering", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.read();
            dataSource.query({ page: 2, pageSize: 1, filter: { field: "age", operator: "!=", value: 2 } });
            var view = dataSource.view();

            assert.equal(view[0].age, 3);
        });

        it("query sets filter when array is passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.query({ filter: [{ field: "age", operator: ">=", value: 1 }, { field: "age", operator: "<", value: 3 }] });
            assert.equal(dataSource.filter().filters.length, 2);
            assert.equal(dataSource.filter().filters[1].field, "age");
            assert.equal(dataSource.filter().filters[1].operator, "lt");
            assert.equal(dataSource.filter().filters[1].value, 3);
        });

        it("query sets filter", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.query({ filter: { field: "age", operator: "==", value: 2 } });
            assert.isOk($.isArray(dataSource.filter().filters));
            assert.equal(dataSource.filter().filters[0].field, "age");
            assert.equal(dataSource.filter().filters[0].operator, "eq");
            assert.equal(dataSource.filter().filters[0].value, 2);
        });

        it("query removes filter expression from the state if not passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.query({ filter: { field: "age", operator: "==", value: 2 } });
            dataSource.query({});
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(view[1].age, 2);
            assert.equal(dataSource.filter(), undefined);
        });

        it("filtering though filter method", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });
            dataSource.read();
            dataSource.filter({ field: "age", operator: "!=", value: 2 });
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(view[1].age, 3);
        });

        it("query grouping should group data if set", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 1 }, { age: 3 }]
            });
            dataSource.read();
            dataSource.query({ group: [{ field: "age" }] });
            var view = dataSource.view();
            assert.equal(view.length, 2);
            assert.equal(view[0].items.length, 2);
            assert.equal(view[1].items.length, 1);
        });

        it("query does not group data if serverGrouping is true", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                serverGrouping: true
            }).bind("change", function() {

                var view = dataSource.view()[0].items;
                assert.equal(view.length, 2);
                assert.equal(view[0].age, 1);
                assert.equal(view[1].age, 2);
                done();
            });

            $.mockjax({
                url: "foo",
                responseText: '[{ "items": [{"age": 1}, {"age": 2}] }]'
            });

            dataSource.query({ group: [{ field: "age" }] });
        });

        it("group with paging", function() {
            var data = [{ age: 1 }, { age: 3 }, { age: 1 }];

            var dataSource = new DataSource({
                data: data,
                page: 1,
                pageSize: 2
            });
            dataSource.read();
            dataSource.group({ field: "age" });
            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0].items.length, 2);
        });

        it("query sets group when single group is passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }]
            });

            dataSource.query({ group: { field: "age" } });
            assert.equal(dataSource.group().length, 1);
            assert.equal(dataSource.group()[0].field, "age");
        });

        it("query removes group expression from the state if not passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.query({ group: { field: "age" } });
            dataSource.query({});
            var view = dataSource.view();

            assert.equal(view.length, 2);
            assert.equal(view[0].age, 1);
            assert.equal(view[1].age, 2);
            assert.equal(dataSource.group(), undefined);
        });

        it("group should group data if set", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 1 }, { age: 3 }]
            });
            dataSource.read();
            dataSource.group("age");
            var view = dataSource.view();
            assert.equal(view.length, 2);
            assert.equal(view[0].items.length, 2);
            assert.equal(view[1].items.length, 1);
        });

        it("group aggregates should be calcualted if paging is enabled", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 1 }, { age: 3 }],
                page: 2,
                pageSize: 1
            });
            dataSource.read();
            dataSource.group({ field: "age", aggregates: [{ field: "age", aggregate: "count" }] });
            var view = dataSource.view();
            assert.equal(view.length, 1);
            assert.equal(view[0].aggregates.age.count, 2);
        });
        it("group with sorting order is applied", function() {
            var dataSource = new DataSource({
                data: [{ age: 1, name: "John" }, { age: 1, name: "Tom" }, { age: 1, name: "Jerry" }]
            });

            dataSource.query({ group: { field: "age" }, sort: { field: "name", dir: "asc" } });
            var group = dataSource.view()[0].items;
            assert.equal(group[0].name, "Jerry");
            assert.equal(group[1].name, "John");
            assert.equal(group[2].name, "Tom");
        });
        it("aggregate should be calculated if defined", function() {
            var dataSource = new DataSource({
                data: [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }]
            });
            dataSource.read();

            dataSource.aggregate([{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }]);
            var result = dataSource.aggregates();
            assert.equal(result.foo.sum, 201);
            assert.equal(result.bar.count, 3);
        });

        it("query aggregate should be calculated if defined", function() {
            var dataSource = new DataSource({
                data: [{ foo: 100, bar: "baz" }, { foo: 100, bar: "bar" }, { foo: 1, bar: "baz" }]
            });

            dataSource.query({ aggregate: [{ field: "foo", aggregate: "sum" }, { field: "bar", aggregate: "count" }] });
            var result = dataSource.aggregates();
            assert.equal(result.foo.sum, 201);
            assert.equal(result.bar.count, 3);
        });

        it("query removes aggregates from the state if not passed", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }]
            });
            dataSource.read();
            dataSource.query({ aggregate: [{ field: "foo", aggregate: "sum" }] });
            dataSource.query({});

            assert.equal(dataSource.aggregate(), undefined);
            assert.isOk($.isEmptyObject(dataSource.aggregates()));
        });

        it("query does not aggregate data if serverAggregate is true", function(done) {
            var transport = new RemoteTransport({
                read: "foo"
            });

            var dataSource = new DataSource({
                transport: transport,
                serverAggregates: true
            }).bind("change", function() {

                assert.equal(dataSource.aggregates().foo.sum, 0);
                done();
            });

            $.mockjax({
                url: "foo",
                responseText: '[{"age": 1}, {"age": 2}]'
            });

            dataSource.query({ aggregate: [{ field: "foo", aggregate: "sum" }] });
        });

        it("query does pass additional options to the transport", function() {
            var options, dataSource = new DataSource({
                transport: {
                    read: function() {
                        options = arguments[0].data;
                    }
                }
            });

            dataSource.query({ foo: "bar" });
            assert.equal(options.foo, "bar");
        });
        it("query uses skip and take", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.query({ skip: 2, take: 3 });
            var result = dataSource.view();

            assert.equal(result.length, 3);
            assert.equal(result[0].age, 3);
            assert.equal(result[1].age, 4);
            assert.equal(result[2].age, 5);
        });

        it("skip return skipped items for given page and pageSize", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                page: 2,
                pageSize: 3
            });
            assert.equal(dataSource.skip(), 3);
        });

        it("skip return value set through query", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.query({ skip: 3 });
            assert.equal(dataSource.skip(), 3);
        });

        it("take return pageSize is not set", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4
            });
            assert.equal(dataSource.take(), 4);
        });

        it("take return take set through query", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4
            });
            dataSource.query({ take: 3 });
            assert.equal(dataSource.take(), 3);
        });

        it("query raised requestStart", function() {
            var called = false,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                    pageSize: 4,
                    requestStart: function() {
                        called = true;
                    }
                });
            dataSource.read();
            dataSource.query({ take: 3 });
            assert.isOk(called);
        });

        it("query raised progress event", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4
            });
            dataSource.read();
            dataSource.bind("progress", function() { assert.isOk(true); });

            dataSource.query({ take: 3 });
        });

        it("read raised requestStart", function() {
            var called = false,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                    pageSize: 4,
                    requestStart: function() {
                        called = true;
                    }
                });
            dataSource.read();
            assert.isOk(called);
        });

        it("read raised progress", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4,
                progress: function() {
                    assert.isOk(true);
                }
            });
            dataSource.read();
        });

        it("canceling requestStart prevents read", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4,
                requestStart: function(e) {
                    e.preventDefault();
                }
            });

            dataSource.read();

            assert.isOk(!dataSource.data().length);
        });

        it("canceling requestStart does not block subsequent reads", function() {
            var count = 1,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                    pageSize: 4,
                    requestStart: function(e) {
                        if (count) {
                            e.preventDefault();
                            count--;
                        }
                    }
                });

            dataSource.read();

            dataSource.read();

            assert.isOk(dataSource.data().length);
        });

        it("canceling requestStart from read does not modify datasource state", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                pageSize: 4,
                requestStart: function(e) {
                    e.preventDefault();
                }
            });

            dataSource.read({ page: 2 });

            assert.equal(dataSource.page(), 1);
        });

        it("canceling requestStart prevents query", function() {
            var count = 0,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                    pageSize: 4,
                    requestStart: function(e) {
                        if (count) {
                            e.preventDefault();
                        }
                        count++;
                    }
                });

            dataSource.read();
            dataSource.page(2);

            assert.equal(dataSource.view()[0].age, 1);
        });

        it("canceling requestStart on query does not modify the datasource state", function() {
            var count = 0,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }],
                    pageSize: 4,
                    requestStart: function(e) {
                        if (count) {
                            e.preventDefault();
                        }
                        count++;
                    }
                });

            dataSource.read();
            dataSource.page(2);

            assert.equal(dataSource.page(), 1);
        });


        it("query raised requestEnd", function() {
            var called = false,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
                });

            dataSource.read();

            dataSource.bind("requestEnd", function() {
                assert.isOk(true);
            });

            dataSource.query();
        });

        it("query raised requestEnd with correct operation type", function() {
            var called = false,
                dataSource = new DataSource({
                    data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
                });

            dataSource.read();

            dataSource.bind("requestEnd", function(e) {
                assert.isOk(e.type, "read");
            });

            dataSource.query();
        });

        it("fetch persists dataSource options", function() {
            var dataSource = new DataSource({
                serverPaging: true,
                serverSorting: true,
                serverGrouping: true,
                serverFiltering: true,
                serverAggregates: true,
                data: [{ items: [{ foo: 1, bar: "1" }] }],
                page: 10,
                pageSize: 5,
                sort: { field: "foo", dir: "asc" },
                filter: { field: "bar", operator: "eq", value: "1" },
                group: { field: "foo" },
                aggregate: { field: "bar", aggregate: "count" }
            });

            dataSource.fetch();
            assert.equal(dataSource.page(), 10);
            assert.equal(dataSource.pageSize(), 5);
            assert.equal(dataSource.sort()[0].field, "foo");
            assert.equal(dataSource.sort()[0].dir, "asc");
            assert.equal(dataSource.filter().filters[0].field, "bar");
            assert.equal(dataSource.filter().filters[0].operator, "eq");
            assert.equal(dataSource.filter().filters[0].value, "1");
            assert.equal(dataSource.group()[0].field, "foo");
            assert.equal(dataSource.aggregate()[0].field, "bar");
        });

        it("fetch triggers change event", function() {
            var view,
                dataSource = new DataSource({
                    data: [{ foo: 1, bar: "1" }],
                    change: function() {
                        view = dataSource.view();
                    }
                });

            dataSource.fetch();
            assert.equal(view.length, 1);
            assert.equal(view[0].foo, "1");
        });

        it("fetch calls supplied callback only once on multiple fetches", function() {
            jasmine.clock().install();

            var view,
                called = 0,
                dataSource = new DataSource({
                    data: [{ foo: 1, bar: "1" }]
                });

            dataSource.fetch(function() {
                called++;
                view = dataSource.view();
            });

            dataSource.fetch();

            jasmine.clock().tick();

            assert.isOk(view);
            assert.equal(called, 1);

            jasmine.clock().uninstall();
        });

        it("fetch callback is called with dataSource context", function() {
            jasmine.clock().install();

            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "1" }]
            });

            dataSource.fetch(function() {
                assert.equal(this, dataSource);
            });

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

        it("fetch callback is not called when requestStart is prevented", function() {
            var wasCalled = false,
                dataSource = new DataSource({
                    data: [{ foo: 1, bar: "1" }]
                });

            dataSource.read();

            dataSource.one("requestStart", function(e) {
                e.preventDefault();
            });

            dataSource.fetch(function() {
                wasCalled = true;
            });

            assert.isOk(!wasCalled, "fetch callback was executed");
        });

        it("fetch callback is not called when requestStart is prevented with remote operations", function() {
            var wasCalled = false,
                dataSource = new DataSource({
                    transport: {
                        read: function(options) {
                            options.success([{ foo: 1, bar: "1" }]);
                        }
                    }
                });

            dataSource.one("requestStart", function(e) {
                e.preventDefault();
            });

            dataSource.fetch(function() {
                wasCalled = true;
            });

            assert.isOk(!wasCalled, "fetch callback was executed");
        });

        it("paging with custom schema", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        return options.success({ d: [{ foo: 1 }, { bar: 2 }] });
                    }
                },
                schema: {
                    data: function(result) {
                        return result.d;
                    },
                    total: function(data) {
                        return data.d.length;
                    }
                },
                pageSize: 1
            });

            dataSource.read();
            dataSource.page(1);

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.view()[0].foo, 1);
        });

        it("removing model re-calculate the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.remove(dataSource.get(1));

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.total(), 1);
        });

        it("adding model re-calculate the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.add(new kendo.data.Model());

            assert.equal(dataSource.view().length, 3);
            assert.equal(dataSource.total(), 3);
        });

        it("pushing multiple records to the observable array updates the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
            });

            dataSource.read();

            dataSource.data().push({ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

            assert.equal(dataSource.view().length, 4);
            assert.equal(dataSource.total(), 4);
        });

        it("pushing multiple records to the observable array updates the total - total is string", function() {
            var dataSource = new DataSource({
                serverPaging: true,
                schema: {
                    total: function() {
                        return "2"
                    }
                }
            });

            dataSource.read();

            dataSource.data().push({ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

            assert.equal(dataSource.view().length, 2);
            assert.equal(dataSource.total(), 4);
        });

        it("adding multiple records to the observable array updates the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
            });

            dataSource.read();

            dataSource.data().splice(0, 0, { foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" });

            assert.equal(dataSource.view().length, 4);
            assert.equal(dataSource.total(), 4);
        });

        it("removing multiple records from the observable array updates the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }]
            });

            dataSource.read();

            dataSource.data().splice(0, 2);

            assert.equal(dataSource.view().length, 0);
            assert.equal(dataSource.total(), 0);
        });

        it("total is calculated on initially empty DataSource", function() {
            var dataSource = new DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.add(new kendo.data.Model());

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.total(), 1);
        });

        it("modify model re-calculate the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.add(new kendo.data.Model());
            dataSource.get(1).set("bar", "foo");

            assert.equal(dataSource.view().length, 3);
            assert.equal(dataSource.total(), 3);
        });

        it("cancelChanges re-calculates the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            }),
                model = new kendo.data.Model();

            dataSource.read();
            dataSource.add(model);
            dataSource.cancelChanges(model);

            assert.equal(dataSource.view().length, 2);
            assert.equal(dataSource.total(), 2);
        });

        it("cancelChanges without arguments re-calculates the total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.add(new kendo.data.Model());
            dataSource.cancelChanges();

            assert.equal(dataSource.view().length, 2);
            assert.equal(dataSource.total(), 2);
        });

        it("sync with serverPaging re-calculates the total", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success({
                            data: [{ foo: 1, bar: "bar 1" }],
                            total: 2
                        });
                    },
                    create: function(options) {
                        options.success();
                    }
                },
                pageSize: 1,
                serverPaging: true,
                schema: {
                    data: "data",
                    total: "total",
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.add({});
            dataSource.sync();

            assert.equal(dataSource.view().length, 2);
            assert.equal(dataSource.total(), 3);
        });

        it("query with local transport calculates total", function() {
            var dataSource = new DataSource({
                data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.remove(dataSource.get(1));
            dataSource.query({ page: 1 });

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.total(), 1);
        });

        it("sync after remove calculates total", function() {
            var dataSource = new DataSource({
                //data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                transport: {
                    read: function(options) {
                        options.success({
                            data: [{ foo: 1, bar: "bar 1" }, { foo: 2, bar: "bar 2" }],
                            total: 2
                        });
                    },
                    destroy: function(options) {
                        options.success();
                    }
                },
                schema: {
                    data: "data",
                    total: "total",
                    model: {
                        id: "foo",
                        fields: {
                            foo: { type: "number" },
                            bar: "bar"
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.remove(dataSource.get(1));
            dataSource.sync();

            assert.equal(dataSource.view().length, 1);
            assert.equal(dataSource.total(), 1);
        });

        it("query does not call transport if all items are deleted and server operations are disabled", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, foo: "bar" }]
            });
            dataSource.read();
            dataSource.remove(dataSource.at(0));
            dataSource.fetch();
            assert.equal(dataSource.view().length, 0);
        });

        it("query calls transport if all items are deleted and server operations are enabled", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, foo: "bar" }],
                serverPaging: true
            });
            dataSource.read();
            dataSource.remove(dataSource.at(0));
            dataSource.fetch();
            assert.equal(dataSource.view().length, 1);
        });

        it("fetch returns a promise", function() {
            var dataSource = new DataSource({
                data: [{ id: 1, foo: "bar" }]
            });

            assert.equal(typeof dataSource.fetch().done, "function");
        });

        it("change event resolves the promise when bound to local array", function() {
            jasmine.clock().install();

            var dataSource = new DataSource({
                data: [{ id: 1, foo: "bar" }]
            });

            var promise = dataSource.fetch();

            jasmine.clock().tick();

            assert.equal(promise.state(), "resolved");

            jasmine.clock().uninstall();
        });

        it("custom transport resolves the promess when the success method is called", function(done) {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success([]);
                        }, 1);
                    }
                }
            });

            var promise = dataSource.fetch();
            promise.done(function() {
                assert.isOk(true);
                done();
            });
        });

        it("custom transport fails the promess when the error method is called", function(done) {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.error([]);
                        }, 1);
                    }
                }
            });

            var promise = dataSource.fetch();

            promise.fail(function() {
                assert.isOk(true);
                done();
            });
        });

        it("query returns promise for remote operations", function() {
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        options.success([]);
                    }
                },
                serverSorting: true
            });

            assert.isOk($.isFunction(dataSource.query().then));
        });

        it("query returns promise for local operations", function() {
            var dataSource = new DataSource({
                data: [
                    { id: 1 }
                ]
            });

            dataSource.read();

            assert.isOk($.isFunction(dataSource.query().then));
        });

        it("query resolves promise after data has been processed", function() {
            jasmine.clock().install();

            var dataSource = new DataSource({
                data: [
                    { id: 1 }
                ]
            });

            dataSource.read();

            dataSource.query()
                .then(function() {
                    assert.isOk(true);
                });

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

        it("query resolves promise when requestStart is prevented", function() {
            jasmine.clock().install();

            var dataSource = new DataSource({
                data: [
                    { id: 1 }
                ]
            });

            dataSource.read();

            dataSource.bind("requestStart", function(e) { e.preventDefault(); });

            dataSource.query()
                .then(function() {
                    assert.isOk(true);
                });

            jasmine.clock().tick();
            jasmine.clock().uninstall();
        });

    });
}());
