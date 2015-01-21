(function(){


var data = [];
var DataSource = kendo.data.DataSource;
var timeout;

module("data source ranges", {
    setup: function() {
        timeout = window.setTimeout;
        window.setTimeout = function(callback) {
            callback();
        }
    },
    teardown: function() {
        window.setTimeout = timeout;
    }
});

function setup(source) {
    data = source || [{ id:1, bar: "foo" },{ id: 2, bar: "foo" }];

    var dataSource = new DataSource( {
        data: data
    } );

    dataSource.read();

    return dataSource;
}

function remoteDataSource(callback) {
    callback = callback || $.noop;
    var total = 10000,
        dataSource = new kendo.data.DataSource({
            serverPaging: true,
            transport: {
                read: function(options) {
                    var take = options.data.take,
                    skip = options.data.skip;

                    var data = [];

                    for (var i = skip; i < Math.min(skip + take, total); i++) {
                        data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                    }
                    callback();
                    options.success(data);
                }
            },
            schema: {
                total:  function () {
                    return total;
                }
            },
            pageSize: 16
        });

    dataSource._total = total;
    return dataSource;
}

test("prefetch projects request parameters", 2, function() {
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
                equal(sort.field, "text");
                equal(sort.dir, "asc");
            }
        }
    });

    dataSource.prefetch(0, 1);
});

test("inrange returns true if available", function() {
    var dataSource = setup();

    ok(dataSource.inRange(0,2));
});

test("inrange returns false if no data is available", function() {
    var dataSource = setup([]);

    ok(!dataSource.inRange(0,2));
});

test("prefetch gets data for given range", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);

    var ranges = dataSource._ranges;
    equal(ranges.length, 1);
    equal(ranges[0].start, 0);
    equal(ranges[0].end, 1);
    equal(ranges[0].data.length, 1);
    equal(ranges[0].data[0].OrderID, 0);
});

test("prefetched data is converted to ObservableArray", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);

    var ranges = dataSource._ranges;
    equal(ranges.length, 1);
    ok(ranges[0].data instanceof kendo.data.ObservableArray);
});

test("prefetch multiple calls for same range does not retrieve data multiple times", function() {
    var called = 0,
        dataSource = remoteDataSource(function () {
            called++;
        });

    dataSource.prefetch(0, 1);
    dataSource.prefetch(0, 1);
    equal(dataSource._ranges.length, 1);
    equal(called, 1);
});

test("prefetch retrieves different ranges", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);
    dataSource.prefetch(1, 1);

    var ranges = dataSource._ranges;
    equal(ranges.length, 2);
});

test("prefetch raises requestEnd", 2, function() {
    var dataSource = remoteDataSource();

    dataSource.bind("requestEnd", function(e) {
        ok(e.response);
        equal(e.type, "read");
    });

    dataSource.prefetch(1, 1);
});


test("prefetch raises requestStart", 1, function() {
    var dataSource = remoteDataSource();

    dataSource.bind("requestStart", function() {
        ok(true);
    });

    dataSource.prefetch(1, 1);
});

test("prefetch cancelling requestStart does not block subsequent requests", 1, function() {
    var dataSource = remoteDataSource(),
        counter = 0;

    dataSource.one("requestStart", function(e) {
        e.preventDefault();
    });

    dataSource.prefetch(1, 1);

    dataSource.one("requestStart", function(e) {
        ok(true);
    });

    dataSource.prefetch(1, 1);
});


test("inRange returns true if skip is within range", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);
    dataSource.prefetch(1, 1);
    ok(dataSource.inRange(0, 2));
});

test("inRange returns true if start is more than one", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(1, 1);
    ok(dataSource.inRange(1, 1));
});

test("inRange returns false if skip is in range but take is not", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);
    dataSource.prefetch(1, 1);
    ok(!dataSource.inRange(0, 3));
});

test("inRange returns false if skip and take are in range but prefetched data is missing", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 1);
    dataSource.prefetch(2, 1);
    ok(!dataSource.inRange(0, 3));
});

test("ranges are sorted by start", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(2, 1);
    dataSource.prefetch(0, 1);
    equal(dataSource._ranges[0].start, 0);
    equal(dataSource._ranges[1].start, 2);
});

test("prefetch end of range is correctly set when returned data is less than page size", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(10000 - 16, 18);
    equal(dataSource._ranges[0].start, 10000 - 16);
    equal(dataSource._ranges[0].end, 10000);
});

test("prefetch does not create new range if existing sub range is requested", function() {
    var dataSource =  remoteDataSource();

    dataSource.prefetch(20, 200);
    dataSource.prefetch(30, 50);
    equal(dataSource._ranges.length, 1);
});

test("range if range exists transport is not called", function() {
    var called = 0,
        dataSource = remoteDataSource(function () {
            called++;
        });

    dataSource.prefetch(0, 1);
    dataSource.range(0, 1);
    equal(called, 1);
});

test("range if range does not exist transport is called", function() {
    var called = 0,
        dataSource = remoteDataSource(function () {
            called++;
        });

    dataSource.range(0, 1);
    equal(called, 1);
});

test("change is raised when range is prefetched", function() {
    var data,
        dataSource = remoteDataSource();

    dataSource.bind("change", function() {
        data = dataSource.view();
    });

    dataSource.prefetch(0, 1);
    dataSource.range(0, 1);

    equal(data.length, 1);
});

test("change is raised when range is not", function() {
    var called = false, dataSource = remoteDataSource();
    dataSource.bind("change", function() {
        called = true;
    });

    dataSource.prefetch(0, 1);
    dataSource.range(0, 1);
    ok(called);
});

test("inRange return false if skip is below available range", function() {
     var dataSource = remoteDataSource();

    dataSource.prefetch(20, 40);
    ok(!dataSource.inRange(0, 40));
});

test("range calls transport if skip is below available range", function() {
    var called = 0,
        dataSource = remoteDataSource(function () {
            called++;
        });

    dataSource.prefetch(20, 40);
    dataSource.range(0, 1);
    equal(called, 2);
});

test("range fetches range accross multiple prefech ranges", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(20, 20);
    dataSource.prefetch(0, 20);
    dataSource.range(9, 20);

    equal(dataSource.view().length, 20);
    equal(dataSource.view()[0].OrderID, 9);
    equal(dataSource.view()[19].OrderID, 28);
});

test("range fetches range accross multiple overlapping prefech ranges", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 15);
    dataSource.prefetch(10, 20);
    dataSource.range(9, 10);

    equal(dataSource.view().length, 10);
    equal(dataSource.view()[0].OrderID, 9);
    equal(dataSource.view()[9].OrderID, 18);
});

test("range fetches range accross multiple overlapping prefech ranges 2", function() {
    var dataSource = remoteDataSource();

    dataSource.prefetch(0, 20);
    dataSource.prefetch(20, 20);
    dataSource.range(9, 20);

    equal(dataSource.view().length, 20);
    equal(dataSource.view()[0].OrderID, 9);
    equal(dataSource.view()[19].OrderID, 28);
});

test("range fetches range accross multiple overlapping not prefeched ranges transport is called two times", function() {
    var called = 0, dataSource = remoteDataSource(function () { called ++;});

    dataSource.range(9, 20);

    equal(called, 2);
    equal(dataSource.view().length, 20);
    equal(dataSource.view()[0].OrderID, 9);
    equal(dataSource.view()[19].OrderID, 28);
});

test("inRange returns false if not the entire range is available", function() {
     var called = 0,
        dataSource = remoteDataSource();

    dataSource.prefetch(0, 5);
    dataSource.prefetch(10, 5);
    ok(!dataSource.inRange(0, 10));
});

test("read adds result as range", function() {
    var dataSource = remoteDataSource();
    dataSource.read();
    equal(dataSource._ranges[0].start, 0);
    equal(dataSource._ranges[0].end, 16);
});

test("data adds result as range", function() {
    var dataSource = remoteDataSource();
    dataSource.data([{ id:1, bar: "foo" },{ id: 2, bar: "foo" }, { id: 3, bar: "foo" }]);
    equal(dataSource._ranges.length, 1);
    equal(dataSource._ranges[0].start, 0);
    equal(dataSource._ranges[0].end, 3);
});

test("read clear previous ranges", function() {
    var dataSource = remoteDataSource();
    dataSource.prefetch(20, 20);
    dataSource.read();
    equal(dataSource._ranges.length, 1);
    equal(dataSource._ranges[0].start, 0);
    equal(dataSource._ranges[0].end, 16);
});
test("range page given number of items from index", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });
    dataSource.read();
    dataSource.range(2, 3);

    var result = dataSource.view();

    equal(result.length, 3);
    equal(result[0].age, 3);
    equal(result[1].age, 4);
    equal(result[2].age, 5);
});

test("range if index undefined set to zero", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });
    dataSource.read();
    dataSource.range(undefined, 3);

    var result = dataSource.view();

    equal(result.length, 3);
    equal(result[0].age, 1);
    equal(result[1].age, 2);
    equal(result[2].age, 3);
});

test("range if count is undefined return all data", function() {
    var dataSource = new DataSource({
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });
    dataSource.read();
    dataSource.range(0, undefined);

    var result = dataSource.view();

    equal(result.length, 8);
});

test("range fetches range accross pages where last page is partial", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}]
    });
    dataSource.read();
    dataSource.range(3, 3);

    var result = dataSource.view();
    equal(result.length, 2);
});
test("range fetch range accross multiple pages where second page is already fetched", function() {
    var dataSource = remoteDataSource();
    dataSource.range(32, 16);
    dataSource.range(30, 16);
    dataSource.range(30, 16);
    dataSource.range(30, 16);
    dataSource.range(30, 16);

    var result = dataSource.view();
    equal(result.length, 16);
    equal(result[0].OrderID, 30);
    equal(result[15].OrderID, 45);
    equal(dataSource._ranges.length, 2);
});

test("prefetch multiple request to the last not full page does not add multiple ranges", function () {
    var dataSource = remoteDataSource();
    dataSource.prefetch(dataSource.total() - 4, 16);
    dataSource.prefetch(dataSource.total() - 4, 16);
    dataSource.prefetch(dataSource.total() - 4, 16);
    equal(dataSource._ranges.length, 1);
});

test("range set skip to the beginning of the second requested page if multi page range is requested", function() {
    var dataSource = remoteDataSource();
    dataSource.pageSize(100);
    dataSource.range(150, 100);
    equal(dataSource.skip(), 200);
});

test("range set skip to the beginning of the first requested page if multi page range is requested and pages are before current page", function() {
    var dataSource = remoteDataSource();
    dataSource.pageSize(100);
    dataSource.page(3);
    dataSource.range(80, 100);
    equal(dataSource.skip(), 0);
});

test("range set skip to requested page begining", function() {
    var dataSource = remoteDataSource();
    dataSource.pageSize(100);
    dataSource.page(3);
    dataSource.range(100, 100);
    equal(dataSource.skip(), 100);
});

test("range set skip request for range starting on the last page and beyond", function() {
    var dataSource = remoteDataSource(),
        lastPageSkip = dataSource.total();

    dataSource.pageSize(100);
    dataSource.range(lastPageSkip - 50, 100);
    equal(dataSource.skip(), lastPageSkip - 100);
});

test("range set skip request for the last page which is not full", function() {
    var dataSource = remoteDataSource();

    dataSource.pageSize(60);

    var lastPageSkip = (dataSource.totalPages() - 1) * 60;
    dataSource.range(lastPageSkip, 60);
    equal(dataSource.skip(), lastPageSkip);
});

test("range set skip part of the first page and current page is before the end of the range", function () {
    var dataSource = remoteDataSource();

    dataSource.pageSize(100);
    dataSource.range(30, 100);
    equal(dataSource.skip(), 100);
    equal(dataSource.page(), 2);
});

test("range set skip part of the first page and current page is after", function () {
    var dataSource = remoteDataSource();

    dataSource.pageSize(100);
    dataSource.page(2);
    dataSource.range(30, 100);
    equal(dataSource.skip(), 0);
    equal(dataSource.page(), 1);
});

test("range does not reset the actual dataSource data when local transport is used", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{age: 1}, {age: 2},{age: 3}, {age: 4},{age: 5}, {age: 6},{age: 7}, {age: 8}]
    });

    dataSource.read();
    dataSource.range(4, 3);

    equal(dataSource.data().length, 8);
    equal(dataSource.view().length, 3);
});

test("range set data and view when remote transport is used", function() {
    var dataSource = remoteDataSource();

    dataSource.read();
    dataSource.range(4, 16);

    equal(dataSource.data().length, 16);
    equal(dataSource.view().length, 16);
});

test("range from sorted local data is with the correct order", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{ foo: 6 },{ foo: 1 },{ foo: 5 },{ foo: 3 },{ foo: 2 },{ foo: 4 },{ foo: 7 }]
    });

    dataSource.sort({ field: "foo", dir: "asc" });
    dataSource.range(1,3);
    var view = dataSource.view();
    equal(view.length, 3);
    equal(view[0].foo, 2);
    equal(view[1].foo, 3);
    equal(view[2].foo, 4);
});

test("range from grouped and sorted local data is with the correct order", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{ foo: 11, bar: 1 },{ foo: 6, bar: 1 },{ foo: 1, bar: 1 },{ foo: 5, bar:1 },{ foo: 3, bar:1 },{ foo: 2, bar:1 },{ foo: 4, bar:1 },{ foo: 7, bar:1 },{ foo: 8, bar:1 },{ foo: 9, bar:1 }, { foo: 10, bar: 1}]
    });

    dataSource.sort({ field: "foo", dir: "asc" });
    dataSource.group({ field: "bar" });
    dataSource.range(0,11);
    var view = dataSource.view()[0].items;
    equal(view.length, 11);
    equal(view[0].foo, 1);
    equal(view[1].foo, 2);
    equal(view[2].foo, 3);
});

test("initial order is preserved after unsorting a range with local data", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{ foo: 6 },{ foo: 1 },{ foo: 5 },{ foo: 3 },{ foo: 2 },{ foo: 4 },{ foo: 7 }]
    });

    dataSource.sort({ field: "foo", dir: "asc" });
    dataSource.range(1,3);

    dataSource.sort({ field: "foo" });
    dataSource.range(1,3);

    var view = dataSource.view();
    equal(view.length, 3);
    equal(view[0].foo, 1);
    equal(view[1].foo, 5);
    equal(view[2].foo, 3);
});

test("range from filtered local data is with the correct", function() {
    var dataSource = new DataSource({
        pageSize: 3,
        data: [{ foo: 6 },{ foo: 1 },{ foo: 5 },{ foo: 3 },{ foo: 2 },{ foo: 4 },{ foo: 7 }]
    });

    dataSource.filter({ field: "foo", operator: "gt", value: 3});

    dataSource.range(1,3);

    var view = dataSource.view();
    equal(view.length, 3);
    equal(view[0].foo, 5);
    equal(view[1].foo, 4);
    equal(view[2].foo, 7);
});

test("range server return total less results", function() {
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

    equal(dataSource.view().length, 40);
});

function generator(size) {
    var data = [];

    for (var idx = 0; idx < size; idx++) {
        data.push({ foo: idx });
    }

    return data;
}

test("range total is change during the request", function() {
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

    equal(dataSource.view().length, 10);
    equal(dataSource.view()[0].foo, 0);
});

test("range existing range is requested while remote is fetched - remote request is not loaded", function() {
    var mainData = generator(80),
        dataSource = new DataSource({
            pageSize: 10,
            serverPaging: true,
            transport: {
                read: function(options) {
                    var data = [];
                    var skip = options.data.skip;
                    var take = options.data.take;

                    if (skip != 0) {
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

    equal(dataSource.view().length, 10);
    equal(dataSource.page(), 1);
    equal(dataSource.view()[0].foo, 0);
    equal(dataSource.view()[9].foo, 9);
});

test("range existing range is requested while multiple remote requests are fetched - remote request is not loaded", function() {
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

    equal(dataSource.view().length, 10);
    equal(dataSource.page(), 1);
    equal(dataSource.view()[0].foo, 0);
    equal(dataSource.view()[9].foo, 9);
});

test("range request made after remote requests are cancelled as existing range is requests is proccessed", function() {
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

    dataSource.range(39, 10);

    equal(dataSource.view().length, 10);
    equal(dataSource.page(), 5);
    equal(dataSource.view()[0].foo, 39);
    equal(dataSource.view()[9].foo, 48);
});

test("range existing data requested after remote requests are cancelled as existing range is requests is proccessed", function() {
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

    equal(dataSource.view().length, 10);
    equal(dataSource.page(), 2);
    equal(dataSource.view()[0].foo, 10);
    equal(dataSource.view()[9].foo, 19);
});


test("range total is updated", function() {
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

    equal(dataSource.total(), 80);
});

test("range data is same as the range if remote paging is enabled", function() {
    var dataSource = remoteDataSource();
    dataSource.read();
    dataSource.range(30,16);
    equal(dataSource.data().length, dataSource.view().length);
});

test("getByUid returns the item after remote range from a diffrent page is retrieved", function() {
    var dataSource = remoteDataSource();
    dataSource.read();
    dataSource.range(30,16);
    ok(dataSource.getByUid(dataSource.view()[0].uid));
});

test("getByUid returns the item after local range from a diffrent page is retrieved", function() {
    var dataSource = new DataSource({
        data: [{foo: "foo"}, {foo: "bar"}, {foo: "baz"}],
        pageSize: 1
    });
    dataSource.read();
    dataSource.range(2,1);
    ok(dataSource.getByUid(dataSource.view()[0].uid));
});

test("range with server grouping", function() {
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
                    var group = { items: [] };
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

    equal(view.length, 1);
    equal(view[0].items.length, 20);
    equal(view[0].items[0].foo, 6);
});

test("range with server grouping ranges are not modfied", function() {
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
                    var data = [];

                    var group = { items: [] };
                    for (var i = 0; i < 10; i++) {
                        group.items.push({ foo: i });
                    }
                    data.push(group);

                    group = { items: [] };
                    for (var i = 0; i < 10; i++) {
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
    equal(dataSource._flatData(dataSource._ranges[0].data).length, 20);
});

function groupedData(options) {
    var groupsDict = {};
    var groups = [];

    for (var i = options.skip, len = options.skip + options.take; i < len; i++) {
        var key = Math.floor(i / 30) * 30;
        var group;

        if (!groupsDict[key]) {
            groupsDict[key] = {
                field: "number",
                items: [],
                hasSubgroups: false,
                value: key + " - " + (key + 30)
            }

            groups.push(groupsDict[key]);
        }

        groupsDict[key].items.push({
            id: i,
            text: " Item " + i
        });
    }

    return groups;
}

test("view returns observable items when range changes and dataSource has server grouping", function() {
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

    ok(view[0] instanceof kendo.data.ObservableObject, "groups are observable objects");
    ok(view[0].items[0] instanceof kendo.data.ObservableObject, "group.items contains observable objects");
});

test("mergeGroup returns a subset of the data", function() {
    var dataSource = new DataSource({
        serverGrouping: true,
        group: "foo"
    }),
    data = [{ field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

    equal(result[0].items.length, 2);
});

test("mergeGroup returns a subset of the data if range is of multiple groups skipping the last group data if not required", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }
        ];

    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 4);

    equal(result.length, 2);
    equal(result[0].items.length, 2);
    equal(result[1].items.length, 2);
});

test("mergeGroup skips more than one group", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"3", items: [{ foo: 31 },{ foo: 32 },{ foo: 33 }] }
        ];

    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 6, 2);

    equal(result.length, 1);
    equal(result[0].items.length, 2);
    equal(result[0].items[1].foo, 32);
});

test("mergeGroup returns a subset of the data if range is of multiple groups", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }
        ];

    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 4);

    equal(result.length, 2);
    equal(result[0].items.length, 2);
    equal(result[1].items.length, 2);
});

test("mergeGroup returns a subset of the data if range is of multiple groups skiping the first groups", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }
        ];

    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 3, 2);

    equal(result.length, 1);
    equal(result[0].items.length, 2);
});

test("mergeGroup merges group with previous data", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }
            ],
        originalData = [ { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 1, 4);

    equal(result.length, 3);
    equal(result[0].items.length, 3);
    equal(result[1].items.length, 2);
    equal(result[2].items.length, 2);
});

test("mergeGroup merges group with previous data and skips", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 32 },{ foo: 3 }] }
            ],
        originalData = [ { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 7, 1);

    equal(result.length, 1);
    equal(result[0].items.length, 4);
    equal(result[0].items[3].foo, 32);
});

test("mergeGroup merges group with previous data and skips", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 32 },{ foo: 3 }] },
            { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 22 },{ foo: 3 }] }
        ],
        originalData = [ { field: "foo", value:"3", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 7, 1);

    equal(result.length, 2);
    equal(result[0].items.length, 3);
    equal(result[1].items.length, 1);
    equal(result[1].items[0].foo, 22);
});

test("mergeGroup merges group with previous data if from the same group", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [ { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] } ],
        originalData = [ { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups(originalData,  new kendo.data.ObservableArray(data), 0, 2);

    equal(result.length, 1);
    equal(result[0].items.length, 5);
});

test("mergeGroup merges group with previous data if from the same group with nested groups", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [{ field: "foo", value:"1", hasSubgroups: true, items: [{ field: "bar", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }] }  ],
        originalData = [{ field: "foo", value:"1", hasSubgroups: true, items: [{ field: "bar", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }] } ];

    var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 0, 2);

    equal(result.length, 1);
    equal(result[0].items.length, 1);
    equal(result[0].items[0].items.length, 5);
});

test("mergeGroup merges group with previous data if from the same group and multi group range", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [ { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] },
            { field: "foo", value:"2", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }],
        originalData = [ { field: "foo", value:"1", items: [{ foo: 1 },{ foo: 2 },{ foo: 3 }] }];

    var result = dataSource._mergeGroups(originalData, new kendo.data.ObservableArray(data), 0, 5);

    equal(result.length, 2);
    equal(result[0].items.length, 6);
    equal(result[1].items.length, 2);
});

test("mergeGroup merges group with nested groups", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            {
                field: "foo", value:"1",
                hasSubgroups: true,
                items: [
                    { field: "bar", value: 1, items: [ { foo: 11 }, { foo: 12}] },
                    { field: "bar", value: 2, items: [ { foo: 21 }, { foo: 22}] }
                ]
            }
        ];


    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

    equal(result.length, 1);
    equal(result[0].items.length, 2);
    equal(result[0].items[0].items.length, 1);
    equal(result[0].items[1].items.length, 1);
    equal(result[0].items[0].items[0].foo, 12);
    equal(result[0].items[1].items[0].foo, 21);
});

test("mergeGroup merges group with two levels of nested groups", function() {
    var dataSource = new DataSource({
            serverGrouping: true,
            group: "foo"
        }),
        data = [
            {
                field: "foo", value:"1",
                hasSubgroups: true,
                items: [
                    { field: "bar", value: 1, hasSubgroups: true, items: [ { field: "baz", value: 1,  items: [ { foo: 11 }, { foo: 12}] } ] },
                    { field: "bar", value: 2, hasSubgroups: true, items: [ { field: "baz", value: 2,  items: [ { foo: 21 }, { foo: 22}] } ] }
                ]
            }
        ];


    var result = dataSource._mergeGroups([], new kendo.data.ObservableArray(data), 1, 2);

    result = result[0].items;

    equal(result.length, 2);
    equal(result[0].items.length, 1);
    equal(result[0].items[0].items[0].foo, 12);
    equal(result[1].items[0].items[0].foo, 21);
});

test("range returns requested size when one group is in multiple ranges", function() {
    var count = 0;
    var dataSource = new DataSource({
        transport: {
            read: function(options) {
               count ++;

               options.success({
                   data: [ {
                       field: "foo",
                       value: 1,
                       items: [
                           { foo: count + "1"},
                           { foo: count + "2"}
                       ]
                   } ],
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
    dataSource.range(1, 2)
    var data = dataSource.view();

    equal(data.length, 1);
    equal(data[0].items.length, 2);
    equal(data[0].items[0].foo, 12);
    equal(data[0].items[1].foo, 21);
});

test("ranges are updated when model is removed", function() {
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

    equal(range.start, 0);
    equal(range.end, 19);
    equal(range.data.length, 19);
    equal(dataSource.data().length, 19);
});

test("ranges are updated when model is removed after range is called", function() {
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

    equal(range.start, 0);
    equal(range.end, 19);
    equal(range.data.length, 19);
    equal(dataSource.data().length, 19);
});

test("fetched ranges start is updated if item is removed", function() {
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
    equal(range.start, 19);
    equal(range.end, 39);
    equal(range.data.length, 20);
});

test("fetched ranges start is updated if item is removed - with range holes", function() {
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
    equal(range.start, 40);
    equal(range.end, 46);
    equal(range.data.length, 6);
});

test("ranges are updated when model is removed after range is called - with local binding", function() {
    var totalCount = 47,
        dataSource = new DataSource({
            pageSize: 20,
            data: generator(totalCount)
       });

    dataSource.read();
    dataSource.range(10, 20);

    dataSource.remove(dataSource.at(0));

    var range = dataSource._ranges[0];

    equal(range.start, 0);
    equal(range.end, 46);
    equal(range.data.length, 46);
    equal(dataSource.data().length, 46);
});

test("grand total aggregates are calculated with local data", function() {
    var dataSource = new DataSource( {
        pageSize: 10,
        aggregate: [ { field: "bar", aggregate: "count" } ],
        data: [{ id:1, bar: "foo" },{ id: 2, bar: "foo" }]
    } );

    dataSource.read();
    dataSource.range(0, 1);

    equal(dataSource.aggregates().bar.count, 2);
});

test("range is reverted when calling cancel changes", function() {
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

    equal(model.get("ShipAddress"), "Ship Address 10");
});

test("models within the range have correct parent - local paging", function() {
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

    deepEqual(dataSource.view()[0].parent(), dataSource.data());
});

test("models within the range have correct parent - server paging", function() {
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

    deepEqual(dataSource.view()[0].parent(), dataSource.data());
});


/*test("ranges are updated when model is added after range is called - with local binding", function() {
    var totalCount = 47,
        dataSource = new DataSource({
            pageSize: 20,
            data: generator(totalCount)
       });

    dataSource.read();
    dataSource.range(10, 20);

    dataSource.add({});

    var range = dataSource._ranges[0];

    equal(range.start, 0);
    equal(range.end, 46);
    equal(range.data.length, 46);
    equal(dataSource.data().length, 46);
});*/

}());
