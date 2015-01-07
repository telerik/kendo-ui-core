(function() {
   var Grid = kendo.ui.Grid,
        DataSource = kendo.data.DataSource,
        VirtualScrollable = kendo.ui.VirtualScrollable,
        progress,
        dataSource,
        timeout,
        container;

    function setup(element, data) {
        dataSource = DataSource.create( { data: data || [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 } ] } );
        return  new VirtualScrollable(element || container, {
            dataSource: dataSource,
            itemHeight: function() {
                return 32;
            }
        });
    }

    function remoteDataSource() {
        var total = 300,
            data = new kendo.data.DataSource({
                serverPaging: true,
                transport: {
                    read: function(options) {
                        var take = options.data.take,
                        skip = options.data.skip;

                        var data = [];

                        for (var i = skip; i < Math.min(skip + take, total); i++) {
                            data.push({ OrderID: i, ContactName: "Contact " + i, ShipAddress: "Ship Address " + i });
                        }
                        options.success(data);
                    }
                },
                schema: {
                    total:  function () {
                        return total;
                    }
                },
                pageSize: 100
            });

        data._total = total;
        return data;
    }

    module("kendo.ui.VirtualScrollable", {
        setup: function() {
            timeout = window.setTimeout;
            window.setTimeout = function(callback) {
                callback();
            };
            container = $('<div style="height:300px;position:relative; overflow-x: hidden; overflow-y: hidden;"><table></table></div>')
                .appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            QUnit.fixture.empty();
            window.setTimeout = timeout;
        }
    });

    test("wraps the element in scrollable area", function() {
        setup();

        var wrap = container.children().first();
        equal(container.children().length, 2);
        ok(wrap.hasClass("k-virtual-scrollable-wrap"));
        equal(wrap.children()[0].nodeName.toLowerCase(), "table");
    });

    test("auto width is applied to the container element", function() {
        setup();
        equal(container[0].style.width, "auto");
        equal(container.css("overflow"), "hidden");
        equal(container.css("paddingRight"), kendo.support.scrollbar() + 1 + "px");
    });

    test("scrollbars are added to the container", function() {
        setup();
        var scrollBar = container.children().last();
        equal(container.children().length, 2);
        ok(scrollBar.hasClass("k-scrollbar k-scrollbar-vertical"));
        ok(scrollBar.width(), kendo.support.scrollbar());
    });

    test("refresh inserts elements into the scrollbar element to for correct scroll height", function() {
        var scroller = setup();
        container.find("table").html(new Array(30).join('<tr><td style="height:30px">foo</td></tr>'));
        dataSource._total = 300;
        scroller.refresh();
        equal(container.find(".k-scrollbar-vertical").children().length, 1);
    });

    test("scroll is called when scrollbar is scrolled", function() {
        var called = false,
            MyVirtualScrollable = VirtualScrollable.extend( {
                _scroll: function() {
                    called = true;
                }
            }),
            scroller = new MyVirtualScrollable(container, {
                dataSource: dataSource
            });

        container.find(".k-scrollbar-vertical").scroll();

        ok(called);
    });

    test("scroll calls fetch", function() {
        dataSource = DataSource.create( { data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 } ] } );
        var called = false,
            MyVirtualScrollable = VirtualScrollable.extend( {
                _fetch: function() {
                    called = true;
                }
            }),
            scroller = new MyVirtualScrollable(container, {
                dataSource: dataSource
            });

        container.find("table").html(new Array(30).join('<tr><td style="height:30px">foo</td></tr>'));
        dataSource._total = 300;
        scroller.refresh();
        container.find(".k-scrollbar-vertical").scroll();

        ok(called)
    });

    test("scroll content is scrolled if items are rendered", function() {
        var scroller = setup(),
            content = container.find("table").html(new Array(300).join('<tr><td style="height:30px">foo</td></tr>'));

        dataSource._total = 300;
        scroller.refresh();
        container.find(".k-scrollbar-vertical").scrollTop(70).scroll();
        equal(content.parent().scrollTop(), 70);
    });

    test("fetch does not show loading mask if items are present", function() {
        var MyDataSource = DataSource.extend({
            inRange: function() {
                return true;
            }
        }),
        scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({ data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 } ] })
        });

        scroller._fetch(0, 15);
        equal(container.find("div.k-overlay").length, 0);
    });

    test("mask is hidden on refresh", function() {
        var scroller = setup();

        kendo.ui.progress(container, true);
        scroller.refresh();
        equal(container.find("div.k-overlay").length, 0);
    });

    test("fetch if lastRow is at the end of the available page fetches next page", function() {
        var skip, take,
        MyDataSource = DataSource.extend({
            range: function() {
                skip = arguments[0];
                take = arguments[1];
            }
        }), scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({
                pageSize: 2,
                page: 0,
                data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 }, { foo: 3, bar: 3 } ]
            })
        }),
        firstRowIndex = 1,
        lastRowIndex = 2;
        var fetching = scroller._fetch(firstRowIndex, lastRowIndex);
        ok(fetching);
        equal(skip, 1);
        equal(take, 2);
    });

    test("fetch if lastRow is at the end of the available page fetches next page with no prefetch", function() {
        var MyDataSource = DataSource.extend({
            inRange: function() {
                return false;
            },
            range: function(skip, take) {
                equal(skip, 1);
                equal(take, 2);
            }
        }), scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({
                pageSize: 2,
                page: 1,
                data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 }, { foo: 3, bar: 3 } ]
            })
        }),
        firstRowIndex = 1,
        lastRowIndex = 2;
        var fetching = scroller._fetch(firstRowIndex, lastRowIndex);
        ok(fetching);
    });

    test("fetch if firstRow is at the begining of the available page fetches prev page", function() {
        var skip, take,
            MyDataSource = DataSource.extend({
            range: function() {
                skip = arguments[0];
                take = arguments[1];
            }
        }), scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({
                pageSize: 2,
                page: 2,
                data: [ 1,2,3,4,5,6,7,8,9,10 ]
            })
        }),
        firstRowIndex = 1,
        lastRowIndex = 2;
        var fetching = scroller._fetch(firstRowIndex, lastRowIndex);
        ok(fetching);
        equal(skip, 0);
        equal(take, 2);
    });

    test("fetch if firstRow is at the begining of the available page fetches prev page without prefech", function() {
        var MyDataSource = DataSource.extend({
            inRange: function() {
                return false;
            },
            range: function(skip,take) {
                equal(skip, 0);
                equal(take, 2);
            }
        }), scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({
                pageSize: 2,
                page: 2,
                data: [ 1,2,3,4,5,6,7,8,9,10 ]
            })
        }),
        firstRowIndex = 1,
        lastRowIndex = 2;
        var fetching = scroller._fetch(firstRowIndex, lastRowIndex);
        ok(fetching);
    });

    test("fetch no new page is requested if first and last rows are in range", function() {
        var called = false,
            MyDataSource = DataSource.extend({
            range: function() {
                called = true;
            }
        }), scroller = new VirtualScrollable(container, {
            dataSource: new MyDataSource({
                pageSize: 2,
                page: 1,
                data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 }, { foo: 3, bar: 3 } ]
            })
        }),
            firstRowIndex = 1,
            lastRowIndex = 1;
        var fetching = scroller._fetch(firstRowIndex, lastRowIndex);
        ok(!fetching);
        ok(!called);
    });

    test("scroll passes firstRowIndex and lastRowIndex", function() {
        var firstRowIndex, lastRowIndex,
            content = container.height(60).find("table").html(new Array(2).join('<tr><td style="height:30px">foo</td></tr>')),
            MyVirtualScrollable = VirtualScrollable.extend( {
                _fetch: function() {
                    firstRowIndex = arguments[0];
                    lastRowIndex = arguments[1];
                }
            }),
            scroller = new MyVirtualScrollable(container, {
                itemHeight: function() {
                    return 35;
                },
                dataSource: new DataSource({
                    pageSize: 2,
                    page: 1,
                    data: [ { foo: 2, bar: 2 }, { foo: 1, bar: 1 }, { foo: 3, bar: 3 } ]
                })
            });

        scroller.refresh();
        scroller._scroll({ currentTarget: { scrollTop: 40 } });
        equal(firstRowIndex, 1);
        equal(lastRowIndex, 2);
    });

    test("fetch prefetch the next page if lastRowIndex is after middle of the page", function() {
        var skip, take,
            MyDataSource = DataSource.extend({
                prefetch: function() {
                    skip = arguments[0];
                    take = arguments[1];
                },
                _total: 10000
            }),
            scroller = new VirtualScrollable(container, {
                    itemHeight: function() {
                    return 35;
                },
                dataSource: new MyDataSource({
                    pageSize: 4,
                    page: 1,
                    data: [ 1,2,3,4,5,6,7,8,9,10 ]
                })
            }),
            firstRowIndex = 0,
            lastRowIndex = 3;
        scroller._fetch(firstRowIndex, lastRowIndex);
        equal(skip, 4);
        equal(take, 4);
    });

    test("fetch does not prefetch the next page if lastRowIndex is after middle of the page when prefetch is off", 0, function() {
        var MyDataSource = DataSource.extend({
                prefetch: function() {
                    ok(true);
                },
                _total: 10000
            }),
            scroller = new VirtualScrollable(container, {
                    prefetch: false,
                    itemHeight: function() {
                    return 35;
                },
                dataSource: new MyDataSource({
                    pageSize: 4,
                    page: 1,
                    data: [ 1,2,3,4,5,6,7,8,9,10 ]
                })
            }),
            firstRowIndex = 0,
            lastRowIndex = 3;

        scroller._fetch(firstRowIndex, lastRowIndex);
    });

    test("rangeStart is set to the current skip if dataSource is sorted", function() {
        var data = remoteDataSource(),
            scroller = new VirtualScrollable(container, {
                dataSource: data,
                    itemHeight: function() {
                        return 32;
                    }
            });

        scroller._fetch(250, 100);
        equal(scroller._rangeStart, 250);
        data.sort({ field: "foo", dir: "asc" });
        equal(scroller._rangeStart, data.skip());
        equal(data.skip(), 200);
    });

    test("Scrolls horizontally the footer according to the content", function() {
        QUnit.fixture.html('<div id="grid"></div>');

        var grid = $('#grid').kendoGrid({
            dataSource: { data: [ { foo: "foo", bar: "bar" } ], pageSize: 1 },
            resizable: true,
            scrollable: {
                virtual: true
            },
            columns: [{ field: "foo", footerTemplate: "foo" }, "bar"]
        }).data('kendoGrid');

        grid.content.scrollLeft(10);
        grid.refresh();

        equal(grid.content.scrollLeft(), grid.footer.find(".k-grid-footer-wrap").scrollLeft());
    });

})();
