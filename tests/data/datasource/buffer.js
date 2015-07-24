(function(){

var ds, buffer;

module("data buffer", {
    setup: function() {
        ds = new kendo.data.DataSource({
            transport: {
                read: function(options) {

                    var results = [], data = options.data;
                    for (var i = data.skip; i < data.skip + data.take; i ++) {
                        results.push(i);
                    }

                    options.success(results);
                }
            },
            pageSize: 20,
            serverPaging: true,
            schema: {
                total: function() { return 100000; }
            }
        });

        buffer = new kendo.data.Buffer(ds, 7);
    },

    teardown: function() {
    }
});

asyncTest("returns correct offset of dataSource item", 1, function() {
    ds.fetch();

    buffer.one("expand", function() {
        start();
        equal(buffer.dataSource._ranges.length, 2);
    });

    buffer.at(20); // trigger the range change
});

asyncTest("returns correct offset of dataSource item", 2, function() {
    ds.fetch();

    buffer.one("expand", function() {
        start();
        equal(buffer.at(40), 40);
        equal(buffer.dataSource._ranges.length, 2);
    });

    buffer.at(40); // trigger the range change
});

test("returns correct dataSource item", 1, function() {
    ds.fetch(function() {
        equal(buffer.at(2), 2);
    });
});

asyncTest("returns correct offset of dataSource item", 3, function() {
    ds.fetch();

    equal(buffer.indexOf(12), 12);

    buffer.one("expand", function() {
        equal(buffer.indexOf(29), 29);

        buffer.one("resize", function() {
            start();
            equal(buffer.indexOf(35), 35);
        });

        buffer.at(26); // trigger the range change
    });

    buffer.at(19); // trigger the range change
});


asyncTest("approaching the end of the range prefetches data", 4, function() {
    ds.fetch(function() {
        buffer.at(12);
        ok(!ds.inRange(20, 20));

        buffer.bind("prefetching", function(e) { equal(e.skip, 20); });

        buffer.bind("prefetched", function(e) {
            start();
            equal(e.skip, 20);
            ok(ds.inRange(20, 20));
        });

        buffer.at(13);
    });
});

asyncTest("reaching the end of the range shifts range to mid state", 4, function() {
    ds.fetch();
    buffer.at(12); // prefetch
    equal(buffer.at(19), 19); // trigger the range change
    buffer.bind("expand", function() {
        start();
        equal(ds.view()[0], 13);
        equal(ds.view()[19], 32);
        equal(buffer.at(25), 25);
    })
});

asyncTest("pulling back from the mid range shifts range back to initial page", 4, function() {
    ds.fetch();
    equal(buffer.at(19), 19); // trigger the range change

    buffer.bind("expand", function() {
        start();
        equal(buffer.at(12), 12); // pull back
        equal(ds.view()[0], 0);
        equal(buffer.at(2), 2);
    });
});

asyncTest("reaching the offset of the next range shifts to match the server-side paging", 3, function() {
    ds.fetch();
    buffer.at(12); // prefetch
    equal(buffer.at(19), 19); // fist re-range
    buffer.bind("expand", function() {
        start();
        equal(buffer.at(26), 26); // second re-range
        equal(ds.view()[0], 20);
    })
});

asyncTest("pulling back from next page restores the mid-range", 5, function() {
    ds.fetch();
    buffer.at(12); // prefetch
    equal(buffer.at(19), 19); // go to mid range
    buffer.one("expand", function() {
        equal(ds.view()[0], 13);

        buffer.one("resize", function() {
            start();
            equal(buffer.at(19), 19); // pull back to mid range
            equal(ds.view()[0], 13);
        });

        equal(buffer.at(26), 26); // go to second range
    });
});

asyncTest("requesting an out of range item shifts the buffer to the correct range", 1, function() {
    ds.fetch();
    buffer.at(62);
    buffer.one("expand", function() {
        start();
        equal(ds.view()[0], 60);
    });
});

module("buffer end/resize events ", {
    setup: function() {
        ds = new kendo.data.DataSource({
            transport: {
                read: function(options) {

                    var results = [], data = options.data;
                    for (var i = data.skip; i < data.skip + data.take; i ++) {
                        results.push(i);
                    }

                    options.success(results);
                }
            },
            pageSize: 20,
            serverPaging: true,
            schema: {
                total: function() { return 100000; }
            }
        });

        buffer = new kendo.data.Buffer(ds, 7);
    }
});

asyncTest("requesting the last item in the range triggers resize event", 1, function() {
    ds.fetch();

    buffer.bind("resize", function(e) {
        start();
        equal(buffer.length, 40);
    });

    buffer.at(12);
    setTimeout(function() {
        buffer.at(19);
    }, 100);
});

test("requesting an item from outside of the range triggers endreached event", 2, function() {
    ds.fetch();

    buffer.bind("endreached", function(e) {
        equal(e.index, 20);
    });
    buffer.at(19);
    equal(buffer.at(20), null);
});

module("buffer reset event", {
    setup: function() {
        ds = new kendo.data.DataSource({
            transport: {
                read: function(options) {

                    var results = [], data = options.data;
                    for (var i = data.skip; i < data.skip + data.take; i ++) {
                        results.push({ value: i });
                    }

                    options.success(results);
                }
            },
            pageSize: 20,
            serverPaging: true,
            schema: {
                total: function() { return 100000; }
            }
        });

        buffer = new kendo.data.Buffer(ds, 7);
    },

    teardown: function() {
    }
});

asyncTest("re-reading the datasource causes reset", 2, function() {
    ds.fetch();

    buffer.one("resize", function(e) {
        equal(buffer.length, 40);

        buffer.one("reset", function(e) {
            start();
            equal(buffer.length, 20);
        });

        ds.query({ page: 1, skip: 0, take: 20 });
    });

    buffer.at(19);
});

test("re-reading the datasource causes reset, even on the same page", 3, function() {
    buffer.bind("resize", function(e) {
        equal(buffer.length, 20);
    });

    ds.fetch();

    buffer.bind("reset", function(e) {
        ok(true);
    });

    ds.query({ page: 1, skip: 0, take: 20 });
});

test("re-reading the datasource at a distant location triggers reset while maintaining correct index", 2, function() {
    ds.fetch();

    buffer.bind("reset", function(e) {
        ok(true);
    });

    ds.query({ page: 10, skip: 200, take: 20 });
    equal(buffer.at(210).value, 210);
});

test("triggers reset before resize when local data is filtered", 1, function() {
    var data = [];
    for (var i = 0; i < 25; i++) {
        data.push({ item: "Item " + i, index: "Index " + i});
    }

    var dataSource = new kendo.data.DataSource({
        data: data,
        pageSize: 10
    });

    var myBuffer = new kendo.data.Buffer(dataSource, 7);
    dataSource.fetch();

    var resetFired = false;

    myBuffer.bind("resize", function() {
        ok(resetFired, "reset event is fired first");
    });

    myBuffer.bind("reset", function() {
        resetFired = true;
    });

    dataSource.filter([{ field: "item", operator: "contains", value: "3" }]);
});

module("buffer disabled prefetch", {
    setup: function() {
        timeout = window.setTimeout;
        window.setTimeout = function(callback) {
            callback();
        }
        ds = new kendo.data.DataSource({
            transport: {
                read: function(options) {

                    var results = [], data = options.data;
                    for (var i = data.skip; i < data.skip + data.take; i ++) {
                        results.push({ value: i });
                    }

                    options.success(results);
                }
            },
            pageSize: 20,
            serverPaging: true,
            schema: {
                total: function() { return 100000; }
            }
        });

        buffer = new kendo.data.Buffer(ds, 7, true);
    },

    teardown: function() {
        window.setTimeout = timeout;
    }
});

test("approaching the end of the range does not prefetch data", 2, function() {
    ds.fetch();
    buffer.at(11);
    ok(!ds.inRange(20, 20));
    buffer.bind("prefetching", function(e) { ok(false); });
    buffer.at(12);
    ok(!ds.inRange(20, 20));
});

test("reaching the end of the range does not shift", 4, function() {
    ds.fetch();
    buffer.at(12); // prefetch
    equal(buffer.at(19).value, 19); // trigger the range change
    equal(ds.view()[0].value, 0);
    equal(ds.view()[19].value, 19);
    equal(buffer.at(25), undefined);
});

asyncTest("calling next shifts range to mid state", 1, function() {
    ds.fetch();
    buffer.at(19);

    buffer.one("resize", function() {
        start();
        equal(ds.view()[0].value, 13);
    });

    buffer.next();
});

module("buffer jumps", {
    setup: function() {
        ds = new kendo.data.DataSource({
            transport: {
                read: function(options) {

                    var results = [], data = options.data;
                    for (var i = data.skip; i < data.skip + data.take; i ++) {
                        results.push({ num: i });
                    }

                    options.success(results);
                }
            },
            pageSize: 20,
            serverPaging: true,
            page: 2,
            schema: {
                total: function() { return 100000; }
            }
        });

        buffer = new kendo.data.Buffer(ds, 7);
    },

    teardown: function() {
    }
});

asyncTest("understands the datasource offsets", 2, function() {
    ds.fetch();

    equal(buffer.at(20).num, 20);

    buffer.one("reset", function() {
        ok(false);
    });

    buffer.one("resize", function() {
        start();
    });

    equal(buffer.at(19), null);
});

}());
