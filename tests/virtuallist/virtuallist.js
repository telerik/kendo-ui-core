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
            $.when.apply($, this.promises).done(callback);
        }
    });

    describe("VirtualList: ", function () {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

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
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
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

    it("creates list's content wrapper", function() {
        var virtualList = new VirtualList(container, virtualSettings);
        assert.equal(virtualList.wrapper.find(".k-virtual-content").length, 1);
    });

    it("creates height container", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.wrapper.find(".k-height-container").length, 1);
            done();
        });
    });

    it("sets the height of the heightContainer", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.wrapper.find(".k-height-container").height(), 4000); //dataSource.total() * itemHeight
            done();
        });
    });

    it("sets the height of the content wrapper", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.content.height(), CONTAINER_HEIGHT);
            done();
        });
    });

    it("sets the height of the content wrapper to 0 when dataSource has no data", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            asyncDataSource.data([]);
            assert.equal(virtualList.content.height(), 0);
            done();
        });
    });

    it("sets the height of the content wrapper to total*itemHeight if total height of items is less that the height option", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            asyncDataSource.data([
                { text: " Item 1" },
                { text: " Item 2" },
                { text: " Item 3" },
                { text: " Item 4" },
                { text: " Item 5" }
            ]);
            assert.equal(virtualList.content.height(), 5 * ITEM_HEIGHT);
            done();
        });
    });

    it("initially builds the listScreens", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listScreens: 6,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            var items = virtualList.items();
            assert.equal(items.length, (CONTAINER_HEIGHT/20)*6);
            done();
        });
    });

    it("adds .k-virtual-item class to the item placeholders", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var items = virtualList.items();
            assert.isOk(items.hasClass("k-virtual-item"));
            done();
        });
    });

    it("adds uid to the item placeholders", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var items = virtualList.items();
            var dataItems = asyncDataSource.view();

            items.each(function(idx, element) {
               assert.isOk(items.eq(idx).data("uid") === dataItems[idx].uid);
            });

            done();
        });
    });

    it("updating the model updates the corresponding item", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var dataItem = virtualList.dataSource.data()[3];
            dataItem.set("text", "foo");
            assert.equal(virtualList.items().eq(3).text(), "foo");
            done();
        });
    });

    it("can be initialized from already loaded dataSource", function(done) {
        asyncDataSource.fetch(function() {
            var virtualList = new VirtualList(container, virtualSettings);
            assert.equal(virtualList.items().eq(0).text(), " Item 0");
            done();
        });
    });

    it("adds k-state-hover class on mouseenter", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var element = virtualList.items().first();
            element.trigger("mouseover");
            assert.isOk(element.hasClass("k-state-hover"));
            done();
        });
    });

    it("removes k-state-hover class on mouseleave", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var element = virtualList.items().first();
            element.trigger("mouseover");
            assert.isOk(element.hasClass("k-state-hover"));
            element.trigger("mouseleave");
            assert.isOk(!element.hasClass("k-state-hover"));
            done();
        });
    });

    it("adds k-state-hover class on mouseenter", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var element = virtualList.items().first();
            element.trigger("mouseover");
            assert.isOk(element.hasClass("k-state-hover"));
            done();
        });
    });

    it("render k-loading-item class to placeholder element", function(done) {
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

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            var li = virtualList.element
                                .children()
                                .filter(function() {
                                    return $(this).position().top >= 0;
                                }).first();

            assert.isOk(li.hasClass("k-loading-item"));
            done();
        });
    });

    it("widget does not show hover state on loading item hover", function(done) {
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

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            var li = virtualList.element
                                .children()
                                .filter(function() {
                                    return $(this).position().top >= 0;
                                }).first();

            li.trigger("mouseover");
            assert.isOk(!li.hasClass("k-state-hover"));
            done();
        });
    });

    it("widget doesn't set value if skipUpdateOnBind is true", function(done) {
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
            assert.equal(virtualList.calls("value"), 0);
            done();
        });

        virtualList.dataSource.read();
    });

    //dataBinding

    it("reads the dataSource (autoBind: true by default)", function(done) {
        asyncDataSource.one("change", function() {
            assert.isOk(true);
            done();
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            autoBind: true
        }));
    });

    //templates

    it("initializes the default templates", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.isOk(virtualList.templates);

            for (key in virtualList.templates) {
                assert.equal(typeof virtualList.templates[key], "function");
            }
            done();
        });
    });

    it("uses the item template to render items", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: "<span class='foo'>#:text#</span>"
        }));

        asyncDataSource.read().then(function() {
            var items = virtualList.items();

            assert.isOk(items.find(".foo").length > 0);
            items.each(function(idx, element) {
                assert.equal($(element).text().trim(), "Item " + idx);
            });
            done();
        });
    });

    it("wraps the item template in li.k-virtual-item > div.k-item", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: "<span class='foo'>#:text#</span>"
        }));

        asyncDataSource.read().then(function() {
            var items = virtualList.element.find(".foo");
            items.each(function(idx, element) {
                assert.isOk(items.eq(idx).parent().is(".k-item") && items.eq(idx).parents(".k-virtual-item").length === 1);
            });
            done();
        });
    });

    it("accepts function as item template", function(done) {
        var myTemplate = function(data) {
            return "<span class='foo'>" + data.text + "</span>";
        };

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: myTemplate
        }));

        asyncDataSource.read().then(function() {
            var items = virtualList.items();

            assert.isOk(items.find(".foo").length > 0);
            items.each(function(idx, element) {
                assert.equal($(element).text().trim(), "Item " + idx);
            });
            done();
        });
    });

    it("displays placeholder template when list is scrolled to a not available range", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "<span class='foo'>foo...</span>",
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            assert.equal(virtualList.items().last().html(), '<span class="foo">foo...</span>');
            done();
        });
    });

    it("accepts function as placeholderTemplate", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: function() {
                return "<span class='foo'>foo...</span>";
            },
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            assert.equal(virtualList.items().last().html(), '<span class="foo">foo...</span>');
            done();
        });
    });

    //scrolling

    it("loads new items when list is scrolled", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 3 screens down
            var lastScreenItems = $(virtualList.items().slice(-10));

            lastScreenItems.each(function(idx, element) {
                assert.equal($(element).text().trim(), "loading data...");
            });
            done();
        });
    });

    it("shifts the position of item placeholders", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 1 screen
            var lastScreenItems = virtualList.items().slice(-10);

            lastScreenItems.each(function(idx, element) {
                var transform = $(element).css("transform");
                var translateY = parseInt(transform.substring(transform.lastIndexOf(",") + 2, transform.length - 1), 10);
                assert.equal(translateY, (5 * CONTAINER_HEIGHT) + (idx * 20));
            });
            done();
        });
    });

    it("starts dataSource request to fetch the next range when threshold is passed", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            asyncDataSource.one("requestStart", function(e) {
                assert.isOk(true, "request started");
                done();
            });

            //(listScreens - 1 - threshold) * screenHeight
            scroll(virtualList.content, (400 - 1 - 0.5) * 200); //scroll the list 1 screens
        });
    });

    it("does not shift the position of item placeholders until threshold is passed", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            //total placeholders height is 200/20 * 4 = 800
            //threshold is 800 * 0.5 = 400, at 400 + 1 * itemHeight placeholders should re-position
            scroll(container, 2 * CONTAINER_HEIGHT);
            var items = virtualList.items();

            items.each(function(idx, element) {
                assert.equal($(element).position().top, idx * 20);
            });
            done();
        });
    });

    it("user is able to jump to the bottom of the list", function(done) {
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
                var items = virtualList.items();
                var data = asyncDataSource.data();

                items.each(function(idx, element) {
                    assert.equal(items.eq(idx).text(), data[idx].text);
                });
                done();
            }, 300);
        });
    });

    it("updates the uid of the item placeholders after list position changes", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            scroll(container, 3 * CONTAINER_HEIGHT);

            var items = virtualList.items();
            var dataItems = asyncDataSource.view();

            items.each(function(idx, element) {
               assert.isOk(items.eq(idx).data("uid") === dataItems[idx].uid);
            });
            done();
        });
    });

    it("renders only datasource range relevant to the scrollTop 2000px (first request comes later)", function(done) {
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
                setTimeout(function() {

                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 100");
                    done();
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    it("renders only datasource range relevant to the scrollTop 2000px (second request comes later)", function(done) {
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
                setTimeout(function() {
                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 100");
                    done();
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    it("renders only datasource range relevant to the scrollTop 1000px (second request comes later)", function(done) {
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
                setTimeout(function() {
                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 50");
                    done();
                }, 100);
            });
        });
        async.resolve(0); //initial request
    });

    it("renders only datasource range relevant to the scrollTop 1000px (first request comes later)", function(done) {
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
                setTimeout(function() {
                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 50");
                    done();
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    it("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes last)", function(done) {
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
                setTimeout(function() {
                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 35");
                    done();
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    it("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes first)", function(done) {
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
                setTimeout(function() {
                    var li = virtualList.element.children()
                                        .filter(function() { return $(this).offset().top >= 0; })
                                        .first();

                    assert.equal(li.text().trim(), "Item 35");
                    done();
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    function deferredScroll(list, scrollTop, timeout) {
        setTimeout(function() {
            list.content[0].scrollTop = scrollTop;
        }, timeout);
    }

     //skipping due to instability
    // it("renders only the last retrieved range", function(asyncDone) {
    //     var asyncDataSource = createAsyncDataSource({
    //         transport: {
    //             read: function(options) {
    //                 setTimeout(function() {
    //                     options.success({ data: generateData(options.data), total: 830 });
    //                 }, 100);
    //             }
    //         },
    //         schema: {
    //             data: "data",
    //             total: "total"
    //         },
    //         pageSize: 80,
    //         serverPaging: true,
    //         serverFiltering: true
    //     });

    //     var virtualList = new VirtualList(container, {
    //         delay: 0,
    //         autoBind: false,
    //         dataSource: asyncDataSource,
    //         height: 520,
    //         itemHeight: 26,
    //         valueMapper: function(options) {
    //             setTimeout(function() {
    //                 options.success(options.value);
    //             }, 0);
    //         },
    //         template: '#:text#',
    //         selectable: true
    //     });

    //     asyncDataSource.read().done(function() {
    //         virtualList.one("listBound", function () {
    //             var item100 = virtualList.items().filter(function() {
    //                 return $(this).data("offsetIndex") == 100;
    //             });

    //             assert.equal(item100.text().trim(), "Item 100");
    //             asyncDone();

    //         });

    //         deferredScroll(virtualList, 1481, 60);
    //         deferredScroll(virtualList, 1885, 70);
    //         deferredScroll(virtualList, 2335, 90);
    //     });
    // });

    //utilities
    it("calculates buffer sizes in pixels", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var bufferSizes = virtualList._bufferSizes();

            assert.equal(bufferSizes.down, 200, "down");
            assert.equal(bufferSizes.up, 400, "up");
            done();
        });
    });

    it("check value order", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));
        virtualList._removedAddedIndexes = [2,1,3];
        var newValue = virtualList._checkValuesOrder([1,2,3]);
        assert.equal(newValue[0],2);
        assert.equal(newValue[1],1);
        assert.equal(newValue[2],3);
    });

    it("value is not changed if removedAddedIndexes with different size", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));
        virtualList._removedAddedIndexes = [2,1];
        var newValue = virtualList._checkValuesOrder([1,2,3]);
        assert.equal(newValue[0],1);
        assert.equal(newValue[1],2);
        assert.equal(newValue[2],3);
    });

    it("value is not changed if no removedAddedIndexes", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));

        var newValue = virtualList._checkValuesOrder([1,2,3]);
        assert.equal(newValue[0],1);
        assert.equal(newValue[1],2);
        assert.equal(newValue[2],3);
    });

    it("calculates buffer sizes in pixels", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var bufferSizes = virtualList._bufferSizes();

            assert.equal(bufferSizes.down, 200, "down");
            assert.equal(bufferSizes.up, 400, "up");
            done();
        });
    });

    it("forces the placeholder itemHeight", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            var items = virtualList.items();

            assert.equal(items.eq(0).css("height"), "40px");
            assert.equal(items.eq(0).css("minHeight"), "40px");
            done();
        });
    });

    //misc

    it("does not create elements with height larger than 250000px", function() {
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
        assert.equal(virtualList.content.find(".k-height-container").height(), 100011 * 40);

        heightPadChildren = virtualList.content.find(".k-height-container").children();

        //heightPad container is expanded by elements with max height of 250000
        //dataSource.total() * itemHeight / MaxHeightElement + 1 ("1" is added because the total height is not devided by 250000)
        assert.equal(heightPadChildren.length, Math.floor(100011 * 40 / 250000) + 1);

        assert.equal(heightPadChildren.first().height(), 250000);
        assert.equal(heightPadChildren.last().height(), 40 * 11);
    });

    //initialization in hidden container

    it("can be initialized in a hidden container", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.content.height(), 500);
            done();
        });
    });

    it("group header is hidden when type: flat", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            assert.isOk(virtualList.header.is(":hidden"));
            done();
        });
    });

    it("VirtualList supports group value set to undefined", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

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
            assert.isOk(true);
            done();
        });

        virtualList.dataSource.query({ filter: null });
    });

    });
}());
