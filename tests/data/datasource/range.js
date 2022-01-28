(function() {

    var data = [];
    var DataSource = kendo.data.DataSource;
    var timeout;

    describe("data source ranges", function() {
        beforeEach(function() {
            jasmine.clock().install();
            timeout = window.setTimeout;
            window.setTimeout = function(callback) {
                callback();
            };
        });
        afterEach(function() {
            window.setTimeout = timeout;
            jasmine.clock().uninstall();
        });

        function setup(source) {
            data = source || [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }];

            var dataSource = new DataSource({
                data: data
            });

            dataSource.read();

            return dataSource;
        }

        function generateData(startIndex, endIndex) {
            var data = [];

            for (var i = startIndex; i < endIndex; i++) {
                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
            }

            return data;
        }

        function remoteDataSource(callback, options) {
            callback = callback || $.noop;
            var total = (options || {}).total || 10000,
                dataSource = new kendo.data.DataSource($.extend(true, {}, {
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take;
                            var skip = options.data.skip;
                            var data = generateData(skip, Math.min(skip + take, total));

                            callback();
                            options.success(data);
                        }
                    },
                    schema: {
                        total: function() {
                            return total;
                        },
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                ContactName: { type: "string" },
                                ShipAddress: { type: "string" }
                            }
                        }
                    },
                    pageSize: 16
                }, options || {}));

            dataSource._total = total;
            return dataSource;
        }

        function equalRanges(actualRanges, expectedRanges) {
            assert.equal(actualRanges.length, expectedRanges.length);

            for (var i = 0; i < actualRanges.length; i++) {
                equalRange(actualRanges[i], expectedRanges[i]);
            }
        }

        function equalRange(actualRange, expectedRange) {
            assert.equal(actualRange.start, expectedRange.start);
            assert.equal(actualRange.end, expectedRange.end);
            assert.equal(actualRange.data.length, expectedRange.dataLength);
        }

        it("prefetch projects request parameters", function() {
            var data = [{ id: 1, text: "foo" }, { id: 2, text: "bar" }];
            var dataSource = new DataSource({
                schema: {
                    model: {
                        fields: {
                            Text: { from: "text" }
                        }
                    }
                },
                serverSorting: true,
                sort: {
                    field: "Text",
                    dir: "asc"
                },
                transport: {
                    read: function(options) {
                        options.success(data);

                        var sort = options.data.sort[0];
                        assert.equal(sort.field, "text");
                        assert.equal(sort.dir, "asc");
                    }
                }
            });

            dataSource.prefetch(0, 1);
        });

        it("inrange returns true if available", function() {
            var dataSource = setup();

            assert.isOk(dataSource.inRange(0, 2));
        });

        it("inrange returns false if no data is available", function() {
            var dataSource = setup([]);

            assert.isOk(!dataSource.inRange(0, 2));
        });

        it("prefetch gets data for given range", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);

            var ranges = dataSource._ranges;
            assert.equal(ranges.length, 1);
            assert.equal(ranges[0].start, 0);
            assert.equal(ranges[0].end, 1);
            assert.equal(ranges[0].data.length, 1);
            assert.equal(ranges[0].data[0].OrderID, 0);
        });

        it("prefetched data is converted to ObservableArray", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);

            var ranges = dataSource._ranges;
            assert.equal(ranges.length, 1);
            assert.isOk(ranges[0].data instanceof kendo.data.ObservableArray);
        });

        it("prefetch multiple calls for same range does not retrieve data multiple times", function() {
            var called = 0,
                dataSource = remoteDataSource(function() {
                    called++;
                });

            dataSource.prefetch(0, 1);
            dataSource.prefetch(0, 1);
            assert.equal(dataSource._ranges.length, 1);
            assert.equal(called, 1);
        });

        it("prefetch retrieves different ranges", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);
            dataSource.prefetch(1, 1);

            var ranges = dataSource._ranges;
            assert.equal(ranges.length, 2);
        });

        it("prefetch raises requestEnd", function() {
            var dataSource = remoteDataSource();

            dataSource.bind("requestEnd", function(e) {
                assert.isOk(e.response);
                assert.equal(e.type, "read");
            });

            dataSource.prefetch(1, 1);
        });


        it("prefetch raises requestStart", function() {
            var dataSource = remoteDataSource();

            dataSource.bind("requestStart", function() {
                assert.isOk(true);
            });

            dataSource.prefetch(1, 1);
        });

        it("prefetch cancelling requestStart does not block subsequent requests", function() {
            var dataSource = remoteDataSource();

            dataSource.one("requestStart", function(e) {
                e.preventDefault();
            });

            dataSource.prefetch(1, 1);

            dataSource.one("requestStart", function(e) {
                assert.isOk(true);
            });

            dataSource.prefetch(1, 1);
        });


        it("inRange returns true if skip is within range", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);
            dataSource.prefetch(1, 1);
            assert.isOk(dataSource.inRange(0, 2));
        });

        it("inRange returns true if start is more than one", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(1, 1);
            assert.isOk(dataSource.inRange(1, 1));
        });

        it("inRange returns false if skip is in range but take is not", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);
            dataSource.prefetch(1, 1);
            assert.isOk(!dataSource.inRange(0, 3));
        });

        it("inRange returns false if skip and take are in range but prefetched data is missing", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 1);
            dataSource.prefetch(2, 1);
            assert.isOk(!dataSource.inRange(0, 3));
        });

        it("ranges are sorted by start", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(2, 1);
            dataSource.prefetch(0, 1);
            assert.equal(dataSource._ranges[0].start, 0);
            assert.equal(dataSource._ranges[1].start, 2);
        });

        it("prefetch end of range is correctly set when returned data is less than page size", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(10000 - 16, 18);
            assert.equal(dataSource._ranges[0].start, 10000 - 16);
            assert.equal(dataSource._ranges[0].end, 10000);
        });

        it("prefetch does not create new range if existing sub range is requested", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(20, 200);
            dataSource.prefetch(30, 50);
            assert.equal(dataSource._ranges.length, 1);
        });

        it("range if range exists transport is not called", function() {
            var called = 0,
                dataSource = remoteDataSource(function() {
                    called++;
                });

            dataSource.prefetch(0, 1);
            dataSource.range(0, 1);
            assert.equal(called, 1);
        });

        it("range if range does not exist transport is called", function() {
            var called = 0,
                dataSource = remoteDataSource(function() {
                    called++;
                });

            dataSource.range(0, 1);
            assert.equal(called, 1);
        });

        it("change is raised when range is prefetched", function() {
            var data,
                dataSource = remoteDataSource();

            dataSource.bind("change", function() {
                data = dataSource.view();
            });

            dataSource.prefetch(0, 1);
            dataSource.range(0, 1);

            assert.equal(data.length, 1);
        });

        it("change is raised when range is not", function() {
            var called = false, dataSource = remoteDataSource();
            dataSource.bind("change", function() {
                called = true;
            });

            dataSource.prefetch(0, 1);
            dataSource.range(0, 1);
            assert.isOk(called);
        });

        it("inRange return false if skip is below available range", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(20, 40);
            assert.isOk(!dataSource.inRange(0, 40));
        });

        it("range calls transport if skip is below available range", function() {
            var called = 0,
                dataSource = remoteDataSource(function() {
                    called++;
                });

            dataSource.prefetch(20, 40);
            dataSource.range(0, 1);
            assert.equal(called, 2);
        });

        it("range fetches range accross multiple prefech ranges", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(20, 20);
            dataSource.prefetch(0, 20);
            dataSource.range(9, 20);

            assert.equal(dataSource.view().length, 20);
            assert.equal(dataSource.view()[0].OrderID, 9);
            assert.equal(dataSource.view()[19].OrderID, 28);
        });

        it("range fetches range accross multiple overlapping prefech ranges", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 15);
            dataSource.prefetch(10, 20);
            dataSource.range(9, 10);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.view()[0].OrderID, 9);
            assert.equal(dataSource.view()[9].OrderID, 18);
        });

        it("range fetches range accross multiple overlapping prefech ranges 2", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 20);
            dataSource.prefetch(20, 20);
            dataSource.range(9, 20);

            assert.equal(dataSource.view().length, 20);
            assert.equal(dataSource.view()[0].OrderID, 9);
            assert.equal(dataSource.view()[19].OrderID, 28);
        });

        it("range fetches range accross multiple overlapping not prefeched ranges transport is called two times", function() {
            var called = 0, dataSource = remoteDataSource(function() { called++; });

            dataSource.range(9, 20);

            assert.equal(called, 2);
            assert.equal(dataSource.view().length, 20);
            assert.equal(dataSource.view()[0].OrderID, 9);
            assert.equal(dataSource.view()[19].OrderID, 28);
        });

        it("inRange returns false if not the entire range is available", function() {
            var dataSource = remoteDataSource();

            dataSource.prefetch(0, 5);
            dataSource.prefetch(10, 5);
            assert.isOk(!dataSource.inRange(0, 10));
        });

        it("read adds result as range", function() {
            var dataSource = remoteDataSource();
            dataSource.read();
            assert.equal(dataSource._ranges[0].start, 0);
            assert.equal(dataSource._ranges[0].end, 16);
        });

        it("data adds result as range", function() {
            var dataSource = remoteDataSource();
            dataSource.data([{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }, { id: 3, bar: "foo" }]);
            assert.equal(dataSource._ranges.length, 1);
            assert.equal(dataSource._ranges[0].start, 0);
            assert.equal(dataSource._ranges[0].end, 3);
        });

        it("read clear previous ranges", function() {
            var dataSource = remoteDataSource();
            dataSource.prefetch(20, 20);
            dataSource.read();
            assert.equal(dataSource._ranges.length, 1);
            assert.equal(dataSource._ranges[0].start, 0);
            assert.equal(dataSource._ranges[0].end, 16);
        });

        it("range page given number of items from index", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.read();
            dataSource.range(2, 3);

            var result = dataSource.view();

            assert.equal(result.length, 3);
            assert.equal(result[0].age, 3);
            assert.equal(result[1].age, 4);
            assert.equal(result[2].age, 5);
        });

        it("range if index undefined set to zero", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.read();
            dataSource.range(undefined, 3);

            var result = dataSource.view();

            assert.equal(result.length, 3);
            assert.equal(result[0].age, 1);
            assert.equal(result[1].age, 2);
            assert.equal(result[2].age, 3);
        });

        it("range if count is undefined return all data", function() {
            var dataSource = new DataSource({
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.read();
            dataSource.range(0, undefined);

            var result = dataSource.view();

            assert.equal(result.length, 8);
        });

        it("range returns empty view when data total is 0", function() {
            var dataSource = new DataSource({
                total: function() { return 0; }
            });
            dataSource.read();

            dataSource.range(5, 10);

            assert.equal(dataSource.view().length, 0);
            assert.equal(dataSource.skip(), 0);
            assert.equal(dataSource.take(), 10);
        });

        it("range fetches range accross pages where last page is partial", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }]
            });
            dataSource.read();
            dataSource.range(3, 3);

            var result = dataSource.view();
            assert.equal(result.length, 2);
        });
        it("range fetch range accross multiple pages where second page is already fetched", function() {
            var dataSource = remoteDataSource();
            dataSource.range(32, 16);
            dataSource.range(30, 16);
            dataSource.range(30, 16);
            dataSource.range(30, 16);
            dataSource.range(30, 16);

            var result = dataSource.view();
            assert.equal(result.length, 16);
            assert.equal(result[0].OrderID, 30);
            assert.equal(result[15].OrderID, 45);
            assert.equal(dataSource._ranges.length, 2);
        });

        it("prefetch multiple request to the last not full page does not add multiple ranges", function() {
            var dataSource = remoteDataSource();
            dataSource.prefetch(dataSource.total() - 4, 16);
            dataSource.prefetch(dataSource.total() - 4, 16);
            dataSource.prefetch(dataSource.total() - 4, 16);
            assert.equal(dataSource._ranges.length, 1);
        });

        it("range set skip to the beginning of the second requested page if multi page range is requested", function() {
            var dataSource = remoteDataSource();
            dataSource.pageSize(100);
            dataSource.range(150, 100);
            assert.equal(dataSource.skip(), 200);
        });

        it("range set skip to the beginning of the first requested page if multi page range is requested and pages are before current page", function() {
            var dataSource = remoteDataSource();
            dataSource.pageSize(100);
            dataSource.page(3);
            dataSource.range(80, 100);
            assert.equal(dataSource.skip(), 0);
        });

        it("range set skip to requested page begining", function() {
            var dataSource = remoteDataSource();
            dataSource.pageSize(100);
            dataSource.page(3);
            dataSource.range(100, 100);
            assert.equal(dataSource.skip(), 100);
        });

        it("range set skip request for range starting on the last page and beyond", function() {
            var dataSource = remoteDataSource(),
                lastPageSkip = dataSource.total();

            dataSource.pageSize(100);
            dataSource.range(lastPageSkip - 50, 100);
            assert.equal(dataSource.skip(), lastPageSkip - 100);
        });

        it("range set skip request for the last page which is not full", function() {
            var dataSource = remoteDataSource();

            dataSource.pageSize(60);

            var lastPageSkip = (dataSource.totalPages() - 1) * 60;
            dataSource.range(lastPageSkip, 60);
            assert.equal(dataSource.skip(), lastPageSkip);
        });

        it("range set skip part of the first page and current page is before the end of the range", function() {
            var dataSource = remoteDataSource();

            dataSource.pageSize(100);
            dataSource.range(30, 100);
            assert.equal(dataSource.skip(), 100);
            assert.equal(dataSource.page(), 2);
        });

        it("range set skip part of the first page and current page is after", function() {
            var dataSource = remoteDataSource();

            dataSource.pageSize(100);
            dataSource.page(2);
            dataSource.range(30, 100);
            assert.equal(dataSource.skip(), 0);
            assert.equal(dataSource.page(), 1);
        });

        it("range does not reset the actual dataSource data when local transport is used", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });

            dataSource.read();
            dataSource.range(4, 3);

            assert.equal(dataSource.data().length, 8);
            assert.equal(dataSource.view().length, 3);
        });

        it("range set data and view when remote transport is used", function() {
            var dataSource = remoteDataSource();

            dataSource.read();
            dataSource.range(4, 16);

            assert.equal(dataSource.data().length, 16);
            assert.equal(dataSource.view().length, 16);
        });

        it("range from sorted local data is with the correct order", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ foo: 6 }, { foo: 1 }, { foo: 5 }, { foo: 3 }, { foo: 2 }, { foo: 4 }, { foo: 7 }]
            });

            dataSource.sort({ field: "foo", dir: "asc" });
            dataSource.range(1, 3);
            var view = dataSource.view();
            assert.equal(view.length, 3);
            assert.equal(view[0].foo, 2);
            assert.equal(view[1].foo, 3);
            assert.equal(view[2].foo, 4);
        });

        it("range from grouped and sorted local data is with the correct order", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ foo: 11, bar: 1 }, { foo: 6, bar: 1 }, { foo: 1, bar: 1 }, { foo: 5, bar: 1 }, { foo: 3, bar: 1 }, { foo: 2, bar: 1 }, { foo: 4, bar: 1 }, { foo: 7, bar: 1 }, { foo: 8, bar: 1 }, { foo: 9, bar: 1 }, { foo: 10, bar: 1 }]
            });

            dataSource.sort({ field: "foo", dir: "asc" });
            dataSource.group({ field: "bar" });
            dataSource.range(0, 11);
            var view = dataSource.view()[0].items;
            assert.equal(view.length, 11);
            assert.equal(view[0].foo, 1);
            assert.equal(view[1].foo, 2);
            assert.equal(view[2].foo, 3);
        });

        it("initial order is preserved after unsorting a range with local data", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ foo: 6 }, { foo: 1 }, { foo: 5 }, { foo: 3 }, { foo: 2 }, { foo: 4 }, { foo: 7 }]
            });

            dataSource.sort({ field: "foo", dir: "asc" });
            dataSource.range(1, 3);

            dataSource.sort({ field: "foo" });
            dataSource.range(1, 3);

            var view = dataSource.view();
            assert.equal(view.length, 3);
            assert.equal(view[0].foo, 1);
            assert.equal(view[1].foo, 5);
            assert.equal(view[2].foo, 3);
        });

        it("range from filtered local data is with the correct", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ foo: 6 }, { foo: 1 }, { foo: 5 }, { foo: 3 }, { foo: 2 }, { foo: 4 }, { foo: 7 }]
            });

            dataSource.filter({ field: "foo", operator: "gt", value: 3 });

            dataSource.range(1, 3);

            var view = dataSource.view();
            assert.equal(view.length, 3);
            assert.equal(view[0].foo, 5);
            assert.equal(view[1].foo, 4);
            assert.equal(view[2].foo, 7);
        });

        it("range server return total less results", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 40,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;
                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ foo: i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(6, 40);

            assert.equal(dataSource.view().length, 40);
        });

        function generator(size) {
            var data = [];

            for (var idx = 0; idx < size; idx++) {
                data.push({ foo: idx });
            }

            return data;
        }

        it("range total is change during the request", function() {
            var mainData = generator(80),
                dataSource = new DataSource({
                    pageSize: 10,
                    serverPaging: true,
                    serverFiltering: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;

                            data = mainData.slice(skip, skip + take);

                            options.success({ data: data, total: mainData.length });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.page(1);

            mainData = generator(2);
            dataSource.range(8, 10);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.view()[0].foo, 0);
        });

        it("range existing range is requested while remote is fetched - remote request is not loaded", function() {
            var mainData = generator(80),
                dataSource = new DataSource({
                    pageSize: 10,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;

                            if (skip !== 0) {
                                dataSource.range(0, 10);
                            }

                            data = mainData.slice(skip, skip + take);

                            options.success({ data: data, total: mainData.length });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            var counter = 0;
            stub(dataSource, { _timeStamp: function() { return counter++; } });

            dataSource.page(1);

            dataSource.range(20, 10);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.page(), 1);
            assert.equal(dataSource.view()[0].foo, 0);
            assert.equal(dataSource.view()[9].foo, 9);
        });

        it("range existing range is requested while multiple remote requests are fetched - remote request is not loaded", function() {
            var mainData = generator(80),
                dataSource = new DataSource({
                    pageSize: 10,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;

                            if (skip == 20) {
                                dataSource.range(30, 10);
                            }

                            if (skip == 30) {
                                dataSource.range(0, 10);
                            }

                            data = mainData.slice(skip, skip + take);

                            options.success({ data: data, total: mainData.length });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            var counter = 0;
            stub(dataSource, { _timeStamp: function() { return counter++; } });

            dataSource.page(1);

            dataSource.range(20, 10);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.page(), 1);
            assert.equal(dataSource.view()[0].foo, 0);
            assert.equal(dataSource.view()[9].foo, 9);
        });

        it("range request made after remote requests are cancelled as existing range is requests is proccessed", function() {
            var mainData = generator(80),
                dataSource = new DataSource({
                    pageSize: 10,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;

                            if (skip == 20) {
                                dataSource.range(30, 10);
                            }

                            if (skip == 30) {
                                dataSource.range(0, 10);
                            }

                            data = mainData.slice(skip, skip + take);

                            options.success({ data: data, total: mainData.length });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            var counter = 0;
            stub(dataSource, { _timeStamp: function() { return counter++; } });

            dataSource.page(1);

            dataSource.range(20, 10);

            dataSource.range(39, 10);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.page(), 5);
            assert.equal(dataSource.view()[0].foo, 39);
            assert.equal(dataSource.view()[9].foo, 48);
        });

        it("range existing data requested after remote requests are cancelled as existing range is requests is proccessed", function() {
            var mainData = generator(80),
                dataSource = new DataSource({
                    pageSize: 10,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;

                            if (skip == 20) {
                                dataSource.range(30, 10);
                            }

                            if (skip == 30) {
                                dataSource.range(0, 10);
                            }

                            data = mainData.slice(skip, skip + take);

                            options.success({ data: data, total: mainData.length });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.page(1);

            dataSource.range(20, 10);

            dataSource.page(2);

            assert.equal(dataSource.view().length, 10);
            assert.equal(dataSource.page(), 2);
            assert.equal(dataSource.view()[0].foo, 10);
            assert.equal(dataSource.view()[9].foo, 19);
        });


        it("range total is updated", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 40,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var skip = options.data.skip;
                            var take = options.data.take;
                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ foo: i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            totalCount = 80;
            dataSource.range(6, 40);

            assert.equal(dataSource.total(), 80);
        });

        it("range data is same as the range if remote paging is enabled", function() {
            var dataSource = remoteDataSource();
            dataSource.read();
            dataSource.range(30, 16);
            assert.equal(dataSource.data().length, dataSource.view().length);
        });

        it("getByUid returns the item after remote range from a diffrent page is retrieved", function() {
            var dataSource = remoteDataSource();
            dataSource.read();
            dataSource.range(30, 16);
            assert.isOk(dataSource.getByUid(dataSource.view()[0].uid));
        });

        it("getByUid returns the item after local range from a diffrent page is retrieved", function() {
            var dataSource = new DataSource({
                data: [{ foo: "foo" }, { foo: "bar" }, { foo: "baz" }],
                pageSize: 1
            });
            dataSource.read();
            dataSource.range(2, 1);
            assert.isOk(dataSource.getByUid(dataSource.view()[0].uid));
        });

        it("range with server grouping", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    group: "foo",
                    serverGrouping: true,
                    transport: {
                        read: function(options) {
                            var skip = options.data.skip;
                            var take = options.data.take;
                            var group = { items: [], field: "foo", value: 1 };
                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                group.items.push({ foo: i });
                            }
                            options.success({ groups: [group], total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        groups: "groups",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(6, 20);
            var view = dataSource.view();

            assert.equal(view.length, 1);
            assert.equal(view[0].items.length, 20);
            assert.equal(view[0].items[0].foo, 6);
        });

        it("range with server grouping second page with two groups", function() {
            var totalCount = 10,
                dataSource = new DataSource({
                    pageSize: 2,
                    serverPaging: true,
                    group: [{ field: "foo" }, { field: "bar" }],
                    serverGrouping: true,
                    transport: {
                        read: function(options) {
                            var skip = options.data.skip;
                            var take = options.data.take;
                            var group = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                group.push({
                                    "value": i,
                                    "field": "ID",
                                    "hasSubgroups": true,
                                    "items": [{
                                        "value": i * 2,
                                        "field": "UnitPrice",
                                        "hasSubgroups": false,
                                        "items": [{
                                            "ID": 11,
                                            "Name": "Product11",
                                            "UnitPrice": 34.54,
                                            "UnitsOnOrder": 11
                                        }]
                                    }]
                                });
                            }
                            options.success({ groups: group, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        groups: "groups",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(1, 2);
            var view = dataSource.view();

            assert.equal(view.length, 2);
        });

        it("range with server grouping ranges are not modified", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    group: "foo",
                    serverGrouping: true,
                    transport: {
                        read: function(options) {
                            var data = [];
                            var i;

                            var group = { items: [], field: "foo", value: 1 };
                            for (i = 0; i < 10; i++) {
                                group.items.push({ foo: i });
                            }
                            data.push(group);

                            group = { items: [], field: "foo", value: 2 };
                            for (i = 0; i < 10; i++) {
                                group.items.push({ foo: i });
                            }
                            data.push(group);
                            options.success({ groups: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        groups: "groups",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(6, 20);
            assert.equal(dataSource._flatData(dataSource._ranges[0].data).length, 20);
        });

        function groupedData(options) {
            var groupsDict = {};
            var groups = [];

            for (var i = options.skip, len = options.skip + options.take; i < len; i++) {
                var key = Math.floor(i / 30) * 30;

                if (!groupsDict[key]) {
                    groupsDict[key] = {
                        field: "number",
                        items: [],
                        hasSubgroups: false,
                        value: key + " - " + (key + 30)
                    };

                    groups.push(groupsDict[key]);
                }

                groupsDict[key].items.push({
                    id: i,
                    text: " Item " + i
                });
            }

            return groups;
        }

        it("view returns observable items when range changes and dataSource has server grouping", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    group: "foo",
                    serverGrouping: true,
                    transport: {
                        read: function(options) {
                            options.success({ groups: groupedData(options.data), hasSubgroups: false, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        groups: "groups",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(6, 20);
            dataSource.range(20, 40);
            var view = dataSource.view();

            assert.isOk(view[0] instanceof kendo.data.ObservableObject, "groups are observable objects");
            assert.isOk(view[0].items[0] instanceof kendo.data.ObservableObject, "group.items contains observable objects");
        });

        it("mergeGroup returns a subset of the data", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [{ field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

            assert.equal(result[0].items.length, 2);
        });

        it("mergeGroup returns a subset of the data if range is of multiple groups skipping the last group data if not required", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "3", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }
                ];

            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 4);

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 2);
            assert.equal(result[1].items.length, 2);
        });

        it("mergeGroup skips more than one group", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "3", items: [{ foo: 31 }, { foo: 32 }, { foo: 33 }] }
                ];

            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 6, 2);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 2);
            assert.equal(result[0].items[1].foo, 32);
        });

        it("mergeGroup returns a subset of the data if range is of multiple groups", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }
                ];

            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 4);

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 2);
            assert.equal(result[1].items.length, 2);
        });

        it("mergeGroup returns a subset of the data if range is of multiple groups skiping the first groups", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }
                ];

            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 3, 2);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 2);
        });

        it("mergeGroup merges group with previous data", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }
                ],
                originalData = [{ field: "foo", value: "3", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 1, 4);

            assert.equal(result.length, 3);
            assert.equal(result[0].items.length, 3);
            assert.equal(result[1].items.length, 2);
            assert.equal(result[2].items.length, 2);
        });

        it("mergeGroup merges group with previous data and skips", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "3", items: [{ foo: 1 }, { foo: 32 }, { foo: 3 }] }
                ],
                originalData = [{ field: "foo", value: "3", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 7, 1);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 4);
            assert.equal(result[0].items[3].foo, 32);
        });

        it("mergeGroup merges group with previous data and skips", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    { field: "foo", value: "3", items: [{ foo: 1 }, { foo: 32 }, { foo: 3 }] },
                    { field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                    { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 22 }, { foo: 3 }] }
                ],
                originalData = [{ field: "foo", value: "3", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 7, 1);

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 3);
            assert.equal(result[1].items.length, 1);
            assert.equal(result[1].items[0].foo, 22);
        });

        it("mergeGroup merges group with previous data if from the same group", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [{ field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }],
                originalData = [{ field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 0, 2);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 5);
        });

        it("mergeGroup merges group with previous data if from the same group with nested groups", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [{ field: "foo", value: "1", hasSubgroups: true, items: [{ field: "bar", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }] }],
                originalData = [{ field: "foo", value: "1", hasSubgroups: true, items: [{ field: "bar", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 0, 2);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 1);
            assert.equal(result[0].items[0].items.length, 5);
        });

        it("mergeGroup merges group with previous data if from the same group and multi group range", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [{ field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] },
                { field: "foo", value: "2", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }],
                originalData = [{ field: "foo", value: "1", items: [{ foo: 1 }, { foo: 2 }, { foo: 3 }] }];

            var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 0, 5);

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 6);
            assert.equal(result[1].items.length, 2);
        });

        it("mergeGroup merges group with nested groups", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    {
                        field: "foo", value: "1",
                        hasSubgroups: true,
                        items: [
                            { field: "bar", value: 1, items: [{ foo: 11 }, { foo: 12 }] },
                            { field: "bar", value: 2, items: [{ foo: 21 }, { foo: 22 }] }
                        ]
                    }
                ];


            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

            assert.equal(result.length, 1);
            assert.equal(result[0].items.length, 2);
            assert.equal(result[0].items[0].items.length, 1);
            assert.equal(result[0].items[1].items.length, 1);
            assert.equal(result[0].items[0].items[0].foo, 12);
            assert.equal(result[0].items[1].items[0].foo, 21);
        });

        it("mergeGroup merges group with two levels of nested groups", function() {
            var dataSource = new DataSource({
                serverGrouping: true,
                group: "foo"
            }),
                data = [
                    {
                        field: "foo", value: "1",
                        hasSubgroups: true,
                        items: [
                            { field: "bar", value: 1, hasSubgroups: true, items: [{ field: "baz", value: 1, items: [{ foo: 11 }, { foo: 12 }] }] },
                            { field: "bar", value: 2, hasSubgroups: true, items: [{ field: "baz", value: 2, items: [{ foo: 21 }, { foo: 22 }] }] }
                        ]
                    }
                ];


            var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

            result = result[0].items;

            assert.equal(result.length, 2);
            assert.equal(result[0].items.length, 1);
            assert.equal(result[0].items[0].items[0].foo, 12);
            assert.equal(result[1].items[0].items[0].foo, 21);
        });

        it("range returns requested size when one group is in multiple ranges", function() {
            var count = 0;
            var dataSource = new DataSource({
                transport: {
                    read: function(options) {
                        count++;

                        options.success({
                            data: [{
                                field: "foo",
                                value: 1,
                                items: [
                                    { foo: count + "1" },
                                    { foo: count + "2" }
                                ]
                            }],
                            total: 4
                        });
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 2,
                schema: {
                    groups: "data",
                    total: "total"
                },
                group: "foo"
            });

            dataSource.read();
            dataSource.range(1, 2);
            var data = dataSource.view();

            assert.equal(data.length, 1);
            assert.equal(data[0].items.length, 2);
            assert.equal(data[0].items[0].foo, 12);
            assert.equal(data[0].items[1].foo, 21);
        });

        it("ranges are updated when model is removed", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();

            dataSource.remove(dataSource.at(0));

            var range = dataSource._ranges[0];

            assert.equal(range.start, 0);
            assert.equal(range.end, 19);
            assert.equal(range.data.length, 19);
            assert.equal(dataSource.data().length, 19);
        });

        it("ranges are updated when model is removed after range is called", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(10, 20);

            dataSource.remove(dataSource.at(0));

            var range = dataSource._ranges[0];

            assert.equal(range.start, 0);
            assert.equal(range.end, 19);
            assert.equal(range.data.length, 19);
            assert.equal(dataSource.data().length, 19);
        });

        it("fetched ranges start is updated if item is removed", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(10, 20);
            dataSource.remove(dataSource.at(0));

            var range = dataSource._ranges[1];
            assert.equal(range.start, 19);
            assert.equal(range.end, 39);
            assert.equal(range.data.length, 20);
        });

        it("calling range and deleting an item does not mark it twice for deleting", function() {
            var totalCount = 1000,
                dataSource = new DataSource({
                    pageSize: 100,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(100, 100, $.noop);
            dataSource.remove(dataSource.view()[0]);

            assert.equal(dataSource._destroyed.length, 1);
        });

        it("fetched ranges start is updated if item is removed - with range holes", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();

            dataSource.range(40, 20);

            dataSource.remove(dataSource.at(0));

            var range = dataSource._ranges[1];
            assert.equal(range.start, 40);
            assert.equal(range.end, 46);
            assert.equal(range.data.length, 6);
        });

        it("ranges are updated when model is removed after range is called - with local binding", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    data: generator(totalCount)
                });

            dataSource.read();
            dataSource.range(10, 20);

            dataSource.remove(dataSource.at(0));

            var range = dataSource._ranges[0];

            assert.equal(range.start, 0);
            assert.equal(range.end, 46);
            assert.equal(range.data.length, 46);
            assert.equal(dataSource.data().length, 46);
        });

        it("ranges are updated when model is removed from the first range after range is called with remote binding", function() {
            var dataSource = remoteDataSource($.noop, { pageSize: 10 });
            dataSource.read();

            dataSource.range(20, 10);
            dataSource.range(40, 10);
            dataSource.range(60, 10);

            dataSource.range(0, 10);

            dataSource.remove(dataSource.at(0));

            equalRanges(dataSource._ranges, [
                { start: 0, end: 9, dataLength: 9 },
                { start: 19, end: 29, dataLength: 10 },
                { start: 39, end: 49, dataLength: 10 },
                { start: 59, end: 69, dataLength: 10 }
            ]);
        });

        it("ranges are updated when model is removed from a middle range after range is called with remote binding", function() {
            var dataSource = remoteDataSource($.noop, { pageSize: 10 });
            dataSource.read();

            dataSource.range(20, 10);
            dataSource.range(40, 10);
            dataSource.range(60, 10);

            dataSource.range(20, 10);

            dataSource.remove(dataSource.at(0));

            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 10 },
                { start: 20, end: 29, dataLength: 9 },
                { start: 39, end: 49, dataLength: 10 },
                { start: 59, end: 69, dataLength: 10 }
            ]);
        });

        it("ranges are updated when model is removed from the last range after range is called with remote binding", function() {
            var dataSource = remoteDataSource($.noop, { pageSize: 10 });
            dataSource.read();

            dataSource.range(20, 10);
            dataSource.range(40, 10);
            dataSource.range(60, 10);

            dataSource.remove(dataSource.at(0));

            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 10 },
                { start: 20, end: 30, dataLength: 10 },
                { start: 40, end: 50, dataLength: 10 },
                { start: 60, end: 69, dataLength: 9 }
            ]);
        });

        it("model is removed when it is not in current range bounds with local binding", function() {
            var total = 100;
            var pageSize = 20;
            var dataSource = new DataSource({
                pageSize: pageSize,
                data: generator(total)
            });
            dataSource.read();

            var removedModel = dataSource.at(total - 1);
            dataSource.remove(removedModel);

            equalRange(dataSource._ranges[0], { start: 0, end: total - 1, dataLength: total - 1 });
            assert.equal(dataSource._getByUid(removedModel.uid, dataSource._ranges[0].data), null);
        });

        it("model is removed after canceling changes on added model on last page", function() {
            var total = 100;
            var dataSource = new DataSource({
                pageSize: 20,
                data: generator(total)
            });
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.page(dataSource.totalPages());

            var addedModel = dataSource.add(total, {});
            dataSource.cancelChanges(addedModel);

            var removedModel = dataSource.at(total - 1);
            dataSource.remove(removedModel);

            assert.equal(dataSource.getByUid(removedModel.uid), undefined);
        });

        it("currentRangeStart is updated when model is removed after canceling changes on added model on last page", function() {
            var total = 100;
            var pageSize = 20;
            var dataSource = new DataSource({
                pageSize: pageSize,
                data: generator(total)
            });
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.page(dataSource.totalPages());

            var addedModel = dataSource.add(total, {});
            dataSource.cancelChanges(addedModel);

            var removedModel = dataSource.at(total - 1);
            dataSource.remove(removedModel);

            assert.equal(dataSource.currentRangeStart(), total - pageSize);
            assert.equal(dataSource.currentRangeStart(), dataSource.skip());
        });

        it("grand total aggregates are calculated with local data", function() {
            var dataSource = new DataSource({
                pageSize: 10,
                aggregate: [{ field: "bar", aggregate: "count" }],
                data: [{ id: 1, bar: "foo" }, { id: 2, bar: "foo" }]
            });

            dataSource.read();
            dataSource.range(0, 1);

            assert.equal(dataSource.aggregates().bar.count, 2);
        });

        it("range is reverted when calling cancel changes", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        model: {
                            id: "OrderID"
                        },
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();
            dataSource.range(10, 20);

            var model = dataSource.get(10);
            model.set("ShipAddress", "fooo");

            dataSource.cancelChanges();

            dataSource.range(10, 20);

            model = dataSource.get(10);

            assert.equal(model.get("ShipAddress"), "Ship Address 10");
        });

        it("cancelChanges() resets ranges to the first page with remote binding", function() {
            var dataSource = remoteDataSource();
            dataSource.read();

            dataSource.range(10, 20);
            dataSource.range(20, 30);
            dataSource.cancelChanges();

            equalRanges(dataSource._ranges, [{ start: 0, end: 16, dataLength: 16 }]);
            assert.equal(dataSource._ranges[0].data.length, 16);
        });

        it("cancelChanges() after adding a new item updates ranges with local binding", function() {
            var total = 100;
            var dataSource = new DataSource({
                pageSize: 10,
                data: generator(total)
            });
            dataSource.read();

            var item = dataSource.insert(0, dataSource.get(0));
            dataSource.cancelChanges(item);

            equalRanges(dataSource._ranges, [{ start: 0, end: total, dataLength: total }]);
            assert.equal(dataSource._ranges[0].data.length, total);
            assert.equal(dataSource.data().length, total);
        });

        it("cancelChanges() after adding a new item with schema.model updates ranges with local binding", function() {
            var total = 100;
            var dataSource = new DataSource({
                pageSize: 10,
                data: generator(total),
                schema: {
                    model: {
                        foo: { type: "number" }
                    }
                }
            });
            dataSource.read();

            var item = dataSource.insert(0, dataSource.get(0));
            dataSource.cancelChanges(item);

            equalRanges(dataSource._ranges, [{ start: 0, end: total, dataLength: total }]);
            assert.equal(dataSource._ranges[0].data.length, total);
        });

        it("cancelChanges() after adding a new item with schema.model partially updates ranges with local binding", function() {
            var total = 100;
            var dataSource = new DataSource({
                pageSize: 10,
                data: generator(total),
                schema: {
                    model: {
                        foo: { type: "number" }
                    }
                }
            });
            dataSource.read();

            var item = dataSource.insert(30, dataSource.get(0));
            dataSource.cancelChanges(item);

            equalRanges(dataSource._ranges, [{ start: 0, end: total, dataLength: total }]);
            assert.equal(dataSource._ranges[0].data.length, total);
            assert.equal(dataSource.data().length, total);
        });

        it("cancelChanges() after adding a new item updates ranges with remote binding when model is not defined", function() {
            var dataSource = remoteDataSource($.noop, {
                pageSize: 10,
                schema: {}
            });
            delete dataSource.reader.model;
            dataSource.read();
            dataSource.range(20, 10);
            dataSource.range(30, 10);

            var item = dataSource.insert(0, dataSource.get(30));
            dataSource.cancelChanges(item);

            equalRanges(dataSource._ranges, [{ start: 0, end: 10, dataLength: 10 }]);
            assert.equal(dataSource._ranges[0].data.length, 10);
        });

        it("cancelChanges() after adding a new item with schema.model updates ranges with remote binding", function() {
            var dataSource = remoteDataSource($.noop, {
                pageSize: 10,
                schema: {
                    model: {
                        id: "OrderID",
                        OrderID: { type: "number" }
                    }
                }
            });
            dataSource.read();
            dataSource.range(10, 10);
            dataSource.range(30, 10);

            var item = dataSource.insert(0, dataSource.get(0));
            dataSource.cancelChanges(item);

            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 10 },
                { start: 10, end: 20, dataLength: 10 },
                { start: 30, end: 40, dataLength: 10 }
            ]);
            assert.equal(dataSource._ranges[0].data.length, 10);
            assert.equal(dataSource._ranges[1].data.length, 10);
            assert.equal(dataSource._ranges[2].data.length, 10);
        });

        it("cancelChanges() after adding a new item with schema.model partially updates ranges with remote binding", function() {
            var dataSource = remoteDataSource($.noop, {
                pageSize: 10,
                schema: {
                    model: {
                        id: "OrderID",
                        OrderID: { type: "number" }
                    }
                }
            });
            dataSource.read();
            dataSource.range(10, 10);
            dataSource.range(30, 10);
            dataSource.range(50, 10);
            var model = dataSource._createNewModel({ OrderID: 333, ContactName: "Contact " + 333, ShipAddress: "Ship Address " + 333 });

            var item = dataSource.insert(30, model);
            dataSource.cancelChanges(item);
            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 10 },
                { start: 10, end: 20, dataLength: 10 },
                { start: 30, end: 40, dataLength: 10 },
                { start: 50, end: 60, dataLength: 10 }
            ]);
            assert.equal(dataSource._ranges[0].data.length, 10);
            assert.equal(dataSource._ranges[1].data.length, 10);
            assert.equal(dataSource._ranges[2].data.length, 10);
        });

        it("cancelChanges() reverts updated model with remote binding", function() {
            var dataSource = remoteDataSource($.noop, {
                pageSize: 10,
                schema: {
                    model: {
                        id: "OrderID",
                        OrderID: { type: "number" }
                    }
                }
            });
            dataSource.options.useRanges = true;
            dataSource.read();
            dataSource.range(30, 10);
            var item = dataSource.get(30);

            item.set("ShipAddress", "new value");
            dataSource.cancelChanges(item);

            assert.equal(dataSource.get(30).get("ShipAddress"), "Ship Address 30");
        });

        it("models within the range have correct parent - local paging", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    //        serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take || totalCount,
                                skip = options.data.skip || 0;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        model: {
                            id: "OrderID"
                        },
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();

            dataSource.range(10, 20);
            dataSource.range(12, 20);

            assert.deepEqual(dataSource.view()[0].parent(), dataSource.data());
        });

        it("models within the range have correct parent - server paging", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        model: {
                            id: "OrderID"
                        },
                        data: "data",
                        total: "total"
                    }
                });

            dataSource.read();

            dataSource.range(10, 20);
            dataSource.range(12, 20);

            assert.deepEqual(dataSource.view()[0].parent(), dataSource.data());
        });

        it("the first range is updated when model is added at index 0 with local binding", function() {
            var total = 47;
            var dataSource = new DataSource({
                pageSize: 20,
                data: generator(total)
            });
            dataSource.read();

            dataSource.insert(0, { value: 1 });

            equalRanges(dataSource._ranges, [{ start: 0, end: 48, dataLength: total + 1 }]);
            assert.equal(dataSource._ranges[0].data[0].value, 1);
            assert.equal(dataSource._ranges[0].data.length, 48);
            assert.equal(dataSource.data().length, 48);
        });

        it("the first range is updated when model is added at index 0 after range is called with local binding", function() {
            var total = 47;
            var dataSource = new DataSource({
                pageSize: 20,
                data: generator(total)
            });
            dataSource.read();
            dataSource.range(0, 10);
            dataSource.range(10, 20);
            dataSource.range(20, 30);

            dataSource.insert(0, { value: 1 });

            equalRanges(dataSource._ranges, [{ start: 0, end: 48, dataLength: total + 1 }]);
            assert.equal(dataSource._ranges[0].data[0].value, 1);
            assert.equal(dataSource._ranges[0].data.length, 48);
            assert.equal(dataSource.data().length, 48);
        });

        it("ranges are updated when model is added at the end with local binding", function() {
            var total = 47;
            var pageSize = 10;
            var dataSource = new DataSource({
                pageSize: pageSize,
                data: generator(total)
            });
            dataSource.read();
            dataSource.range(0, pageSize);
            dataSource.range(total - pageSize, pageSize);

            dataSource.insert(dataSource.total(), { value: 1 });

            equalRanges(dataSource._ranges, [{ start: 0, end: 48, dataLength: total + 1 }]);
            assert.equal(dataSource._ranges[0].data[47].value, 1);
            assert.equal(dataSource._ranges[0].data.length, 48);
            assert.equal(dataSource.data().length, 48);
        });

        it("ranges are updated when model is added at index 0 with remote binding", function() {
            var totalCount = 47,
                dataSource = new DataSource({
                    pageSize: 20,
                    serverPaging: true,
                    transport: {
                        read: function(options) {
                            var take = options.data.take,
                                skip = options.data.skip;

                            var data = [];

                            for (var i = skip; i < Math.min(skip + take, totalCount); i++) {
                                data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                            }
                            options.success({ data: data, total: totalCount });
                        }
                    },
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });
            dataSource.read();

            dataSource.insert(0, {});

            var range = dataSource._ranges[0];

            assert.equal(range.start, 0);
            assert.equal(range.end, 21);
            assert.equal(range.data.length, 21);
            assert.equal(dataSource.data().length, 21);
        });

        it("ranges are updated when model is added at index 0 after range is called with remote binding", function() {
            var dataSource = remoteDataSource($.noop, { pageSize: 10 });
            dataSource.read();
            dataSource.range(0, 10);
            dataSource.range(10, 10);
            dataSource.range(30, 10);

            dataSource.insert(0, { value: 1 });

            equalRanges(dataSource._ranges, [
                { start: 0, end: 11, dataLength: 11 },
                { start: 11, end: 21, dataLength: 10 },
                { start: 31, end: 41, dataLength: 10 }
            ]);
            assert.equal(dataSource._ranges[0].data[0].value, 1);
            assert.equal(dataSource.data().length, 11);
        });

        it("ranges are updated when model is added at the end after range is called with remote binding", function() {
            var total = 831;
            var pageSize = 10;
            var dataSource = remoteDataSource($.noop, { pageSize: pageSize, total: total });
            dataSource.read();
            dataSource.range(0, pageSize);
            dataSource.range(total - pageSize, pageSize);

            dataSource.insert(dataSource.total(), { value: 1 });

            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 10 },
                { start: 820, end: 830, dataLength: 10 },
                { start: 830, end: 832, dataLength: 2 }
            ]);
            assert.equal(dataSource._ranges[2].data[1].value, 1);
            assert.equal(dataSource.data().length, 11);
        });

        it("ranges are updated when model is added at index 0 with server grouping", function() {
            var total = 100;
            var index = 0;
            var dataSource = remoteDataSource($.noop, {
                pageSize: 10,
                serverPaging: true,
                group: "group1",
                serverGrouping: true,
                transport: {
                    read: function(options) {
                        var skip = options.data.skip;
                        var take = options.data.take;
                        index++;

                        var group1 = { items: [], field: "FirstName", value: "value" + index };

                        for (var i = skip; i < Math.min(skip + take, total); i++) {
                            group1.items.push({ Id: skip + (i - skip), FirstName: "value" + i });
                        }

                        options.success({ groups: [group1], total: total });
                    }
                },
                schema: {
                    data: "data",
                    groups: "groups",
                    total: "total",
                    model: {
                        id: "Id",
                        fields: {
                            Id: { type: "number", editable: false },
                            FirstName: { type: "string" }
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.range(20, 10);

            dataSource.insert(0, {});

            equalRanges(dataSource._ranges, [
                { start: 0, end: 11, dataLength: 2 },
                { start: 21, end: 31, dataLength: 1 }
            ]);
            assert.equal(dataSource._ranges[0].data[0].items.length, 1);
            assert.equal(dataSource._ranges[0].data[1].items.length, 10);
            assert.equal(dataSource._ranges[1].data[0].items.length, 10);
            assert.equal(dataSource.data().length, 2);
        });

        it("ranges are updated when model is added at the end with server grouping", function() {
            var total = 100;
            var index = 0;
            var pageSize = 10;
            var dataSource = remoteDataSource($.noop, {
                pageSize: pageSize,
                serverPaging: true,
                group: "group1",
                serverGrouping: true,
                transport: {
                    read: function(options) {
                        var skip = options.data.skip;
                        var take = options.data.take;
                        index++;

                        var group1 = { items: [], field: "FirstName", value: "value" + index };

                        for (var i = skip; i < Math.min(skip + take, total); i++) {
                            group1.items.push({ Id: skip + (i - skip), FirstName: "value" + i });
                        }

                        options.success({ groups: [group1], total: total });
                    }
                },
                schema: {
                    data: "data",
                    groups: "groups",
                    total: "total",
                    model: {
                        id: "Id",
                        fields: {
                            Id: { type: "number", editable: false },
                            FirstName: { type: "string" }
                        }
                    }
                }
            });

            dataSource.read();
            dataSource.range(20, 10);
            dataSource.range(total - pageSize, pageSize);

            dataSource.insert(total, {});

            equalRanges(dataSource._ranges, [
                { start: 0, end: 10, dataLength: 1 },
                { start: 20, end: 30, dataLength: 1 },
                { start: 90, end: 101, dataLength: 2 }
            ]);
            assert.equal(dataSource._ranges[0].data[0].items.length, 10);
            assert.equal(dataSource._ranges[1].data[0].items.length, 10);
            assert.equal(dataSource._ranges[2].data[0].items.length, 10);
            assert.equal(dataSource._ranges[2].data[1].items.length, 1);
            assert.equal(dataSource.data().length, 2);
        });

        it("error event is raised if error occurs during fetching", function() {
            var dataSource = new DataSource({
                error: function() {
                    assert.isOk(true);
                },
                transport: {
                    read: function(options) {
                        options.error({});
                    }
                }
            });

            dataSource.prefetch(0, 1);
        });

        it("currentRangeStart returns start of the last requested range", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.read();
            dataSource.range(2, 4);

            assert.equal(dataSource.currentRangeStart(), 2);
        });

        it("currentRangeStart returns start of the last requested page", function() {
            var dataSource = new DataSource({
                pageSize: 3,
                data: [{ age: 1 }, { age: 2 }, { age: 3 }, { age: 4 }, { age: 5 }, { age: 6 }, { age: 7 }, { age: 8 }]
            });
            dataSource.read();
            dataSource.range(2, 4);
            dataSource.page(1);

            assert.equal(dataSource.currentRangeStart(), 0);
        });

        it("range calls a callback", function() {
            var called = false;
            var dataSource = new DataSource({
                data: generator(20)
            });
            dataSource.read();

            dataSource.range(10, 20, function() {
                called = true;
            });

            assert.isOk(called);
        });

        it("getByUid() does not call data.at() when ranges are used", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            var atStub = stub(dataSource._data, "at");

            dataSource.getByUid("123");

            assert.equal(atStub.calls("at"), 0);
        });

        it("get() does not call data.at() when ranges are used", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            var atStub = stub(dataSource._data, "at");

            dataSource.get(0);

            assert.equal(atStub.calls("at"), 0);
        });

        it("updated() does not call data.at() when ranges are used", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            var atStub = stub(dataSource._data, "at");

            dataSource.updated();

            assert.equal(atStub.calls("at"), 0);
        });

        it("created() does not call data.at() when ranges are used", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            var atStub = stub(dataSource._data, "at");

            dataSource.created();

            assert.equal(atStub.calls("at"), 0);
        });

        it("hasChanges() does not call data.at() when ranges are used", function() {
            var dataSource = remoteDataSource();
            dataSource.options.useRanges = true;
            dataSource.read();
            var atStub = stub(dataSource._data, "at");

            dataSource.hasChanges();

            assert.equal(atStub.calls("at"), 0);
        });

        it("sync returns data according to currentRangeStart instead of skip without server paging", function() {
            var dataSource = remoteDataSource($.noop, {
                serverPaging: false
            });
            dataSource.options.useRanges = true;
            stub(dataSource, {
                created: function() {
                    return [];
                },
                skip: function() {
                    return 20;
                }
            });
            dataSource.data(generateData(0, 100));
            dataSource.range(0, 10);
            dataSource.range(25, 10);
            var items = [];
            dataSource.bind("change", function(e) {
                items = e.items;
            });

            dataSource.sync();
            jasmine.clock().tick();

            assert.equal(items.length, 10);
            assert.equal(items[0].OrderID, 25);
        });

        it("sync returns data according to currentRangeStart instead of skip with server paging", function() {
            var dataSource = remoteDataSource($.noop, {
                serverPaging: true
            });
            dataSource.options.useRanges = true;
            stub(dataSource, {
                created: function() {
                    return [];
                },
                skip: function() {
                    return 20;
                }
            });
            dataSource.read();
            dataSource.range(0, 10);
            dataSource.range(25, 10);
            var items = [];
            dataSource.bind("change", function(e) {
                items = e.items;
            });

            dataSource.sync();
            jasmine.clock().tick();

            assert.equal(items.length, 10);
            assert.equal(items[0].OrderID, 25);
        });

    });
}());
