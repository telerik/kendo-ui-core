(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                text: " Item " + i
            });
        }

        return items;
    }

    var Async = kendo.Class.extend({
        init: function() {
            this.promises = [];
        },

        exec: function(callback) {
            var promise = $.Deferred();

            promise.done(callback);

            this.promises.push(promise);
        },

        resolve: function(idx) {
            var promise = this.promises[idx];

            if (!promise) {
                throw new Error("There is no promise to resolve!");
            }

            promise.resolve();
        },

        allDone: function(callback) {
            $.when.apply(null, this.promises).done(callback);
        }
    });

    module("VirtualList: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 100 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            virtualSettings = {
                autoBind: false,
                dataSource: asyncDataSource,
                itemHeight: ITEM_HEIGHT,
                height: CONTAINER_HEIGHT,
                template: "#:text#"
            };
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    function createAsyncDataSource(options) {
        return new kendo.data.DataSource($.extend({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 100 });
                    }, 0);
                }
            },
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        }, options));
    }

    //rendering

    test("creates list's content wrapper", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);
        equal(virtualList.wrapper.find(".k-virtual-content").length, 1);
    });

    asyncTest("creates height container", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.wrapper.find(".k-height-container").length, 1);
        });
    });

    asyncTest("sets the height of the heightContainer", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.wrapper.find(".k-height-container").height(), 4000); //dataSource.total() * itemHeight
        });
    });

    asyncTest("sets the height of the content wrapper", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.content.height(), CONTAINER_HEIGHT);
        });
    });

    asyncTest("sets the height of the content wrapper to 0 when dataSource has no data", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            asyncDataSource.data([]);
            equal(virtualList.content.height(), 0);
        });
    });

    asyncTest("sets the height of the content wrapper to total*itemHeight if total height of items is less that the height option", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            asyncDataSource.data([
                { text: " Item 1" },
                { text: " Item 2" },
                { text: " Item 3" },
                { text: " Item 4" },
                { text: " Item 5" }
            ]);
            equal(virtualList.content.height(), 5 * ITEM_HEIGHT);
        });
    });

    asyncTest("initially builds the listScreens", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listScreens: 6,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();
            equal(items.length, (CONTAINER_HEIGHT/20)*6);
        });
    });

    asyncTest("adds .k-virtual-item class to the item placeholders", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();
            ok(items.hasClass("k-virtual-item"));
        });
    });

    asyncTest("adds uid to the item placeholders", function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();
            var dataItems = asyncDataSource.view();

            items.each(function(idx, element) {
               ok(items.eq(idx).data("uid") === dataItems[idx].uid);
            });
        });
    });

    asyncTest("updating the model updates the corresponding item", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var dataItem = virtualList.dataSource.data()[3];
            dataItem.set("text", "foo");
            equal(virtualList.items().eq(3).text(), "foo");
        });
    });

    asyncTest("can be initialized from already loaded dataSource", 1, function() {
        asyncDataSource.fetch(function() {
            var virtualList = new VirtualList(container, virtualSettings);

            start();
            equal(virtualList.items().eq(0).text(), " Item 0");
        });
    });

    asyncTest("adds k-state-hover class on mouseenter", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().first();
            element.trigger("mouseover");
            ok(element.hasClass("k-state-hover"));
        });
    });

    asyncTest("removes k-state-hover class on mouseleave", 2, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().first();
            element.trigger("mouseover");
            ok(element.hasClass("k-state-hover"));
            element.trigger("mouseleave");
            ok(!element.hasClass("k-state-hover"));
        });
    });

    asyncTest("adds k-state-hover class on mouseenter", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().first();
            element.trigger("mouseover");
            ok(element.hasClass("k-state-hover"));
        });
    });

    asyncTest("render k-loading-item class to placeholder element", 1, function() {
        var requestTimeout = 100;

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    }, requestTimeout);
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            var li = virtualList.element
                                .children()
                                .filter(function() {
                                    return $(this).position().top >= 0;
                                }).first();

            ok(li.hasClass("k-loading-item"));
        });
    });

    asyncTest("widget does not show hover state on loading item hover", 1, function() {
        var requestTimeout = 100;

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    }, requestTimeout);
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            var li = virtualList.element
                                .children()
                                .filter(function() {
                                    return $(this).position().top >= 0;
                                }).first();

            li.trigger("mouseover");
            ok(!li.hasClass("k-state-hover"));
        });
    });

    asyncTest("widget doesn't set value if skipUpdateOnBind is true", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            valueMapper: function(options) { options.success(options.value); },
            dataValueField: "text",
            value: ["Item1"],
            skipUpdateOnBind: true
        }));

        stub(virtualList, {
            value: virtualList.value
        });

        virtualList.one("listBound", function() {
            start();
            equal(virtualList.calls("value"), 0);
        });

        virtualList.dataSource.read();
    });

    //dataBinding

    asyncTest("reads the dataSource (autoBind: true by default)", 1, function() {
        asyncDataSource.one("change", function() {
            start();
            ok(true);
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            autoBind: true
        }));
    });

    //templates

    asyncTest("initializes the default templates", function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.templates);

            for (key in virtualList.templates) {
                equal(typeof virtualList.templates[key], "function");
            }
        });
    });

    asyncTest("uses the item template to render items", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: "<span class='foo'>#:text#</span>"
        }));

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();

            ok(items.find(".foo").length > 0);
            items.each(function(idx, element) {
                equal($(element).text().trim(), "Item " + idx);
            });
        });
    });

    asyncTest("wraps the item template in li.k-virtual-item > div.k-item", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: "<span class='foo'>#:text#</span>"
        }));

        asyncDataSource.read().then(function() {
            start();

            var items = virtualList.element.find(".foo");
            items.each(function(idx, element) {
                ok(items.eq(idx).parent().is(".k-item") && items.eq(idx).parents(".k-virtual-item").length === 1);
            });
        });
    });

    asyncTest("accepts function as item template", function() {
        var myTemplate = function(data) {
            return "<span class='foo'>" + data.text + "</span>";
        };

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: myTemplate
        }));

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();

            ok(items.find(".foo").length > 0);
            items.each(function(idx, element) {
                equal($(element).text().trim(), "Item " + idx);
            });
        });
    });

    asyncTest("displays placeholder template when list is scrolled to a not available range", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "<span class='foo'>foo...</span>",
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            equal(virtualList.items().last().html(), '<span class="foo">foo...</span>');
        });
    });

    asyncTest("accepts function as placeholderTemplate", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: function() {
                return "<span class='foo'>foo...</span>";
            },
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            equal(virtualList.items().last().html(), '<span class="foo">foo...</span>');
        });
    });

    //scrolling

    asyncTest("loads new items when list is scrolled", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 3 screens down
            var lastScreenItems = $(virtualList.items().slice(-10));

            lastScreenItems.each(function(idx, element) {
                equal($(element).text().trim(), "loading data...");
            });
        });
    });

    asyncTest("shifts the position of item placeholders", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 1 screen
            var lastScreenItems = virtualList.items().slice(-10);

            lastScreenItems.each(function(idx, element) {
                var transform = $(element).css("transform");
                var translateY = parseInt(transform.substring(transform.lastIndexOf(",") + 2, transform.length - 1), 10);
                equal(translateY, (5 * CONTAINER_HEIGHT) + (idx * 20));
            });
        });
    });

    asyncTest("starts dataSource request to fetch the next range when threshold is passed", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            asyncDataSource.one("requestStart", function(e) {
                start();
                ok(true, "request started");
            });

            //(listScreens - 1 - threshold) * screenHeight
            scroll(virtualList.content, (400 - 1 - 0.5) * 200); //scroll the list 1 screens
        });
    });

    asyncTest("does not shift the position of item placeholders until threshold is passed", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            //total placeholders height is 200/20 * 4 = 800
            //threshold is 800 * 0.5 = 400, at 400 + 1 * itemHeight placeholders should re-position
            scroll(container, 2 * CONTAINER_HEIGHT);
            var items = virtualList.items();

            items.each(function(idx, element) {
                equal($(element).position().top, idx * 20);
            });
        });
    });

    asyncTest("user is able to jump to the bottom of the list", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            //total height is dataSource.total * itemHeight
            //max scrollTop is total height - CONTAINER_HEIGHT
            scroll(container, 100 * 20 - CONTAINER_HEIGHT);

            setTimeout(function() {
                start();
                var items = virtualList.items();
                var data = asyncDataSource.data();

                items.each(function(idx, element) {
                    equal(items.eq(idx).text(), data[idx].text);
                });
            }, 300);
        });
    });

    asyncTest("updates the uid of the item placeholders after list position changes", function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            scroll(container, 3 * CONTAINER_HEIGHT);

            start();
            var items = virtualList.items();
            var dataItems = asyncDataSource.view();

            items.each(function(idx, element) {
               ok(items.eq(idx).data("uid") === dataItems[idx].uid);
            });
        });
    });

    asyncTest("renders only datasource range relevant to the scrollTop 2000px (first request comes later)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 5 * CONTAINER_HEIGHT); //scroll the list 5 screens down
            scroll(virtualList.content, 10 * CONTAINER_HEIGHT); //scroll the list 10 screens down

            async.resolve(3);
            async.resolve(1);
            async.resolve(2);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 100");
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 2000px (second request comes later)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 5 * CONTAINER_HEIGHT); //scroll the list 5 screens down
            scroll(virtualList.content, 10 * CONTAINER_HEIGHT); //scroll the list 10 screens down

            async.resolve(1);
            async.resolve(2);
            async.resolve(3);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 100");
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 1000px (second request comes later)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 10 * CONTAINER_HEIGHT); //scroll the list 10 screens down
            scroll(virtualList.content, 5 * CONTAINER_HEIGHT); //scroll the list 5 screens down

            async.resolve(3);
            async.resolve(2);
            async.resolve(1);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 50");
            });
        });
        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 1000px (first request comes later)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 10 * CONTAINER_HEIGHT); //scroll the list 10 screens down
            scroll(virtualList.content, 5 * CONTAINER_HEIGHT); //scroll the list 5 screens down

            async.resolve(1);
            async.resolve(2);
            async.resolve(3);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 50");
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes last)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 500);
            scroll(virtualList.content, 1000);
            scroll(virtualList.content, 2000);
            scroll(virtualList.content, 700);

            async.resolve(1);
            async.resolve(3);
            async.resolve(2);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 35");
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes first)", 1, function() {
        var async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            delay: 0,
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 500);
            scroll(virtualList.content, 1000);
            scroll(virtualList.content, 2000);
            scroll(virtualList.content, 700);

            async.resolve(1);
            async.resolve(3);
            async.resolve(2);

            async.allDone(function() {
                start();

                var li = virtualList.element.children()
                                    .filter(function() { return $(this).offset().top >= 0; })
                                    .first();

                equal(li.text().trim(), "Item 35");
            }, 100);
        });

        async.resolve(0); //initial request
    });

    function deferredScroll(list, scrollTop, timeout) {
        setTimeout(function() {
            list.content[0].scrollTop = scrollTop;
        }, timeout);
    }

    asyncTest("renders only the last retrieved range", 1, function() {
        var asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 830 });
                    }, 100);
                }
            },
            schema: {
                data: "data",
                total: "total"
            },
            pageSize: 80,
            serverPaging: true,
            serverFiltering: true
        });

        var virtualList = new VirtualList(container, {
            delay: 0,
            autoBind: false,
            dataSource: asyncDataSource,
            height: 520,
            itemHeight: 26,
            valueMapper: function(options) {
                setTimeout(function() {
                    options.success(options.value);
                }, 0);
            },
            template: '#:text#',
            selectable: true
        });

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                start();

                var item100 = virtualList.items().filter(function() {
                    return $(this).data("offsetIndex") == 100;
                });

                equal(item100.text().trim(), "Item 100");
            }, 600);

            deferredScroll(virtualList, 1481, 60);
            deferredScroll(virtualList, 1885, 70);
            deferredScroll(virtualList, 2335, 90);
        });
    });

    //utilities

    asyncTest("calculates the item count", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listScreens: 6,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.itemCount, 60);
        });
    });

    asyncTest("calculates buffer sizes in pixels", 2, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var bufferSizes = virtualList._bufferSizes();

            equal(bufferSizes.down, 200, "down");
            equal(bufferSizes.up, 400, "up");
        });
    });

    asyncTest("forces the placeholder itemHeight", 2, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            var items = virtualList.items();

            equal(items.eq(0).css("height"), "40px");
            equal(items.eq(0).css("minHeight"), "40px");
        });
    });

    //misc

    test("does not create elements with height larger than 250000px", 4, function() {
        //testing with 100011 items
        dataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    options.success({ data: generateData(options.data), total: 100011 });
                }
            },
            serverPaging: true,
            pageSize: 10,
            schema: {
                data: "data",
                total: "total"
            }
        });

        var virtualList = new VirtualList(container, {
            dataSource: dataSource,
            height: CONTAINER_HEIGHT,
            itemHeight: 40
        });

        //height is dataSource.total() * itemHeight
        equal(virtualList.content.find(".k-height-container").height(), 100011 * 40);

        heightPadChildren = virtualList.content.find(".k-height-container").children();

        //heightPad container is expanded by elements with max height of 250000
        //dataSource.total() * itemHeight / MaxHeightElement + 1 ("1" is added because the total height is not devided by 250000)
        equal(heightPadChildren.length, Math.floor(100011 * 40 / 250000) + 1);

        equal(heightPadChildren.first().height(), 250000);
        equal(heightPadChildren.last().height(), 40 * 11);
    });

    //initialization in hidden container

    asyncTest("can be initialized in a hidden container", 1, function() {
        QUnit.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(QUnit.fixture);

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.content.height(), 500);
        });
    });

    asyncTest("group header is hidden when type: flat", 1, function() {
        QUnit.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(QUnit.fixture);

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.header.is(":hidden"));
        });
    });

    asyncTest("VirtualList supports group value set to undefined", function() {
        QUnit.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(QUnit.fixture);

        var data = [
            { text: "item", value: 1, group: "a" },
            { text: "item2", value: 2, group: "b" }
        ];

        var virtualList = new VirtualList(container, {
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success(data);
                    }
                }
            },
            autoBind: false,
            dataSource: asyncDataSource,
            itemHeight: ITEM_HEIGHT,
            height: CONTAINER_HEIGHT,
            template: "#:text#"
        });

        virtualList.dataSource.one("change", function() {
            start();
            ok(true);
        });

        virtualList.dataSource.query({ filter: null });
    });

})();
