(function() {

    var ds, buffer;

    describe("data buffer", function() {
        beforeEach(function() {
            ds = new kendo.data.DataSource({
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i++) {
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
        });

        afterEach(function() {
        });

        it("returns correct offset of dataSource item", function(done) {
            ds.fetch();

            buffer.one("expand", function() {
                assert.equal(buffer.dataSource._ranges.length, 2);
                done();
            });

            buffer.at(20); // trigger the range change
        });

        it("returns correct offset of dataSource item", function(done) {
            ds.fetch();

            buffer.one("expand", function() {
                assert.equal(buffer.at(40), 40);
                assert.equal(buffer.dataSource._ranges.length, 2);
                done();
            });

            buffer.at(40); // trigger the range change
        });

        it("returns correct dataSource item", function() {
            jasmine.clock().install();

            ds.fetch(function() {
                assert.equal(buffer.at(2), 2);
            });

            jasmine.clock().tick();

            jasmine.clock().uninstall();
        });

        it("returns correct offset of dataSource item", function(done) {
            ds.fetch();

            assert.equal(buffer.indexOf(12), 12);

            buffer.one("expand", function() {
                assert.equal(buffer.indexOf(29), 29);

                buffer.one("resize", function() {
                    assert.equal(buffer.indexOf(35), 35);
                    done();
                });

                buffer.at(26); // trigger the range change
            });

            buffer.at(19); // trigger the range change
        });


        it("approaching the end of the range prefetches data", function(done) {
            ds.fetch(function() {
                buffer.at(12);
                assert.isOk(!ds.inRange(20, 20));

                buffer.bind("prefetching", function(e) { assert.equal(e.skip, 20); });

                buffer.bind("prefetched", function(e) {
                    assert.equal(e.skip, 20);
                    assert.isOk(ds.inRange(20, 20));
                    done();
                });

                buffer.at(13);
            });
        });

        it("reaching the end of the range shifts range to mid state", function(done) {
            ds.fetch();
            buffer.at(12); // prefetch
            assert.equal(buffer.at(19), 19); // trigger the range change
            buffer.bind("expand", function() {
                assert.equal(ds.view()[0], 13);
                assert.equal(ds.view()[19], 32);
                assert.equal(buffer.at(25), 25);
                done();
            })
        });

        it("pulling back from the mid range shifts range back to initial page", function(done) {
            ds.fetch();
            assert.equal(buffer.at(19), 19); // trigger the range change

            buffer.bind("expand", function() {
                assert.equal(buffer.at(12), 12); // pull back
                assert.equal(ds.view()[0], 0);
                assert.equal(buffer.at(2), 2);
                done();
            });
        });

        it("reaching the offset of the next range shifts to match the server-side paging", function(done) {
            ds.fetch();
            buffer.at(12); // prefetch
            assert.equal(buffer.at(19), 19); // fist re-range
            buffer.bind("expand", function() {
                assert.equal(buffer.at(26), 26); // second re-range
                assert.equal(ds.view()[0], 20);
                done();
            })
        });

        it("pulling back from next page restores the mid-range", function(done) {
            ds.fetch();
            buffer.at(12); // prefetch
            assert.equal(buffer.at(19), 19); // go to mid range
            buffer.one("expand", function() {
                assert.equal(ds.view()[0], 13);

                buffer.one("resize", function() {
                    assert.equal(buffer.at(19), 19); // pull back to mid range
                    assert.equal(ds.view()[0], 13);
                    done();
                });

                assert.equal(buffer.at(26), 26); // go to second range
            });
        });

        it("requesting an out of range item shifts the buffer to the correct range", function(done) {
            ds.fetch();
            buffer.at(62);
            buffer.one("expand", function() {
                assert.equal(ds.view()[0], 60);
                done();
            });
        });
    });

    describe("buffer end/resize events ", function() {
        beforeEach(function() {
            ds = new kendo.data.DataSource({
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i++) {
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
        });

        it("requesting the last item in the range triggers resize event", function(done) {
            ds.fetch();

            buffer.bind("resize", function(e) {
                assert.equal(buffer.length, 40);
                done();
            });

            buffer.at(12);
            setTimeout(function() {
                buffer.at(19);
            }, 100);
        });

        it("requesting an item from outside of the range triggers endreached event", function() {
            ds.fetch();

            buffer.bind("endreached", function(e) {
                assert.equal(e.index, 20);
            });
            buffer.at(19);
            assert.equal(buffer.at(20), null);
        });
    });

    describe("buffer reset event", function() {
        beforeEach(function() {
            ds = new kendo.data.DataSource({
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i++) {
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
        });

        afterEach(function() {
        });

        it("re-reading the datasource causes reset", function(done) {
            ds.fetch();

            buffer.one("resize", function(e) {
                assert.equal(buffer.length, 40);

                buffer.one("reset", function(e) {
                    assert.equal(buffer.length, 20);
                    done();
                });

                ds.query({ page: 1, skip: 0, take: 20 });
            });

            buffer.at(19);
        });

        it("re-reading the datasource causes reset, even on the same page", function() {
            buffer.bind("resize", function(e) {
                assert.equal(buffer.length, 20);
            });

            ds.fetch();

            buffer.bind("reset", function(e) {
                assert.isOk(true);
            });

            ds.query({ page: 1, skip: 0, take: 20 });
        });

        it("re-reading the datasource at a distant location triggers reset while maintaining correct index", function() {
            ds.fetch();

            buffer.bind("reset", function(e) {
                assert.isOk(true);
            });

            ds.query({ page: 10, skip: 200, take: 20 });
            assert.equal(buffer.at(210).value, 210);
        });

        it("triggers reset before resize when local data is filtered", function() {
            var data = [];
            for (var i = 0; i < 25; i++) {
                data.push({ item: "Item " + i, index: "Index " + i });
            }

            var dataSource = new kendo.data.DataSource({
                data: data,
                pageSize: 10
            });

            var myBuffer = new kendo.data.Buffer(dataSource, 7);
            dataSource.fetch();

            var resetFired = false;

            myBuffer.bind("resize", function() {
                assert.isOk(resetFired, "reset event is fired first");
            });

            myBuffer.bind("reset", function() {
                resetFired = true;
            });

            dataSource.filter([{ field: "item", operator: "contains", value: "3" }]);
        });
    });

    describe("buffer disabled prefetch", function() {
        beforeEach(function() {
            timeout = window.setTimeout;
            window.setTimeout = function(callback) {
                callback();
            }
            ds = new kendo.data.DataSource({
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i++) {
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
        });

        afterEach(function() {
            window.setTimeout = timeout;
        });

        it("approaching the end of the range does not prefetch data", function() {
            ds.fetch();
            buffer.at(11);
            assert.isOk(!ds.inRange(20, 20));
            buffer.bind("prefetching", function(e) { assert.isOk(false); });
            buffer.at(12);
            assert.isOk(!ds.inRange(20, 20));
        });

        it("reaching the end of the range does not shift", function() {
            ds.fetch();
            buffer.at(12); // prefetch
            assert.equal(buffer.at(19).value, 19); // trigger the range change
            assert.equal(ds.view()[0].value, 0);
            assert.equal(ds.view()[19].value, 19);
            assert.equal(buffer.at(25), undefined);
        });

        it("calling next shifts range to mid state", function(done) {
            ds.fetch();
            buffer.at(19);

            buffer.one("resize", function() {
                assert.equal(ds.view()[0].value, 13);
                done();
            });

            buffer.next();
        });
    });

    describe("buffer jumps", function() {
        beforeEach(function() {
            ds = new kendo.data.DataSource({
                transport: {
                    read: function(options) {

                        var results = [], data = options.data;
                        for (var i = data.skip; i < data.skip + data.take; i++) {
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
        });

        afterEach(function() {
        });

        it("understands the datasource offsets", function(done) {
            ds.fetch();

            assert.equal(buffer.at(20).num, 20);

            buffer.one("reset", function() {
                assert.isOk(false);
            });

            buffer.one("resize", function() {
                done();
            });

            assert.equal(buffer.at(19), null);
        });

    });
}());
