import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';
import { stub } from '../../helpers/unit/stub.js';

let container,
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
    let items = [];
    for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push({
            text: " Item " + i
        });
    }

    return items;
}

let Async = kendo.Class.extend({
    init: function() {
        this.promises = [];
    },

    exec: function(callback) {
        let promise = $.Deferred();

        promise.done(callback);

        this.promises.push(promise);
    },

    resolve: function(idx) {
        let promise = this.promises[idx];

        if (!promise) {
            throw new Error("There is no promise to resolve!");
        }

        promise.resolve();
    },

    allDone: function(callback) {
        $.when.apply($, this.promises).done(callback);
    }
});

describe("VirtualList: ", function() {
    beforeEach(function() {
        container = $("<ul id='container'></ul>").appendTo(Mocha.fixture);

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
            template: ({ text }) => kendo.htmlEncode(text)
        };

        // TO DO: remove below after implementing new SASS styles in LESS
        Mocha.fixture.append($('<style>.k-virtual-content .k-list-item { position: absolute; } .k-list-ul { margin: 0; }</style>'));
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
        let virtualList = new VirtualList(container, virtualSettings);

        assert.isOk(virtualList.wrapper.hasClass("k-virtual-content"));
    });

    asyncTest("creates height container", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.wrapper.find(".k-height-container").length, 1);
            });
        });
    });

    asyncTest("sets the height of the heightContainer", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.wrapper.find(".k-height-container").height(), 4000); //dataSource.total() * itemHeight
            });
        });
    });

    asyncTest("sets the height of the content wrapper", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.content.height(), CONTAINER_HEIGHT);
            });
        });
    });

    asyncTest("sets the height of the content wrapper to 0 when dataSource has no data", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            asyncDataSource.data([]);
            done(() => {
                assert.equal(virtualList.content.height(), 0);
            });
        });
    });

    asyncTest("sets the height of the content wrapper to total*itemHeight if total height of items is less that the height option", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            asyncDataSource.data([
                { text: " Item 1" },
                { text: " Item 2" },
                { text: " Item 3" },
                { text: " Item 4" },
                { text: " Item 5" }
            ]);
            done(() => {
                assert.equal(virtualList.content.height(), 5 * ITEM_HEIGHT);
            });
        });
    });

    asyncTest("initially builds the listScreens", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listScreens: 6,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            let items = virtualList.items();
            done(() => {
                assert.equal(items.length, (CONTAINER_HEIGHT / 20) * 6);
            });
        });
    });

    asyncTest("adds .k-list-item class to the item placeholders", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let items = virtualList.items();
            done(() => {
                assert.isOk(items.hasClass("k-list-item"));
            });
        });
    });

    asyncTest("adds uid to the item placeholders", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let items = virtualList.items();
            let dataItems = asyncDataSource.view();


            done(() => {
                items.each(function(idx, element) {
                    assert.isOk(items.eq(idx).data("uid") === dataItems[idx].uid);
                });
            });
        });
    });

    asyncTest("updating the model updates the corresponding item", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let dataItem = virtualList.dataSource.data()[3];
            dataItem.set("text", "foo");
            done(() => {
                assert.equal(virtualList.items().eq(3).text(), "foo");
            });
        });
    });

    asyncTest("can be initialized from already loaded dataSource", function(done) {
        asyncDataSource.fetch(function() {
            let virtualList = new VirtualList(container, virtualSettings);
            done(() => {
                assert.equal(virtualList.items().eq(0).text(), " Item 0");
            });
        });
    });

    asyncTest("adds k-hover class on mouseenter", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();
            element.trigger("mouseover");
            done(() => {
                assert.isOk(element.hasClass("k-hover"));
            });
        });
    });

    asyncTest("removes k-hover class on mouseleave", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();
            element.trigger("mouseover");
            assert.isOk(element.hasClass("k-hover"));
            element.trigger("mouseleave");
            done(() => {
                assert.isOk(!element.hasClass("k-hover"));
            });
        });
    });

    asyncTest("adds k-hover class on mouseenter", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();
            element.trigger("mouseover");
            done(() => {
                assert.isOk(element.hasClass("k-hover"));
            });
        });
    });

    asyncTest("render k-loading-item class to placeholder element", function(done) {
        let requestTimeout = 100;

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    }, requestTimeout);
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            let li = virtualList.element
                .children()
                .filter(function() {
                    return $(this).position().top >= 0;
                }).first();

            done(() => {
                assert.isOk(li.hasClass("k-loading-item"));
            });
        });
    });

    // Flaky. Fails in headless mode but passes in window mode.
    asyncTest.skip("widget does not show hover state on loading item hover", function(done) {
        let requestTimeout = 100;

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    }, requestTimeout);
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: asyncDataSource,
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {

            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);

            let li = virtualList.element
                .children()
                .filter(function() {
                    return $(this).position().top >= 0;
                }).first();

            li.trigger("mouseover");
            done(() => {
                assert.isOk(!li.hasClass("k-hover"));
            });
        });
    });

    asyncTest("widget doesn't set value if skipUpdateOnBind is true", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            valueMapper: function(options) { options.success(options.value); },
            dataValueField: "text",
            value: ["Item1"],
            skipUpdateOnBind: true
        }));

        stub(virtualList, {
            value: virtualList.value
        });

        virtualList.one("listBound", function() {
            done(() => {
                assert.equal(virtualList.calls("value"), 0);
            });
        });

        virtualList.dataSource.read();
    });

    //dataBinding

    asyncTest("reads the dataSource (autoBind: true by default)", function(done) {
        asyncDataSource.one("change", function() {
            done(() => {
                assert.isOk(true);
            });
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            autoBind: true
        }));
    });

    //templates

    asyncTest("initializes the default templates", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.isOk(virtualList.templates);

            done(() => {
                for (let key in virtualList.templates) {
                    assert.equal(typeof virtualList.templates[key], "function");
                }
            });
        });
    });

    asyncTest("uses the item template to render items", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: ({ text }) => `<span class='foo'>${kendo.htmlEncode(text)}</span>`
        }));

        asyncDataSource.read().then(function() {
            let items = virtualList.items();

            assert.isOk(items.find(".foo").length > 0);
            done(() => {
                items.each(function(idx, element) {
                    assert.equal($(element).text().trim(), "Item " + idx);
                });
            });
        });
    });

    asyncTest("wraps the item template in li.k-list-item > div.k-list-item-text", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: ({ text }) => `<span class='foo'>${kendo.htmlEncode(text)}</span>`
        }));

        virtualList.bind("listBound", function() {
            let items = virtualList.element.find(".foo");
            done(() => {
                items.each(function(idx, element) {
                    assert.isOk(items.eq(idx).parent().is(".k-list-item-text") && items.eq(idx).parents(".k-list-item").length === 1);
                });
            });
        });

        asyncDataSource.read();
    });

    asyncTest("accepts function as item template", function(done) {
        let myTemplate = function(data) {
            return "<span class='foo'>" + data.text + "</span>";
        };

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            template: myTemplate
        }));

        asyncDataSource.read().then(function() {
            let items = virtualList.items();

            assert.isOk(items.find(".foo").length > 0);
            done(() => {
                items.each(function(idx, element) {
                    assert.equal($(element).text().trim(), "Item " + idx);
                });
            });
        });
    });

    asyncTest("displays placeholder template when list is scrolled to a not available range", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "<span class='foo'>foo...</span>",
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            done(() => {
                assert.equal(virtualList.items().last().find(".k-list-item-text").html(), '<span class="foo">foo...</span>');
            });
        });
    });

    asyncTest("accepts function as placeholderTemplate", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: function() {
                return "<span class='foo'>foo...</span>";
            },
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT + 60);
            done(() => {
                assert.equal(virtualList.items().last().find(".k-list-item-text").html(), '<span class="foo">foo...</span>');
            });
        });
    });

    //scrolling

    asyncTest("loads new items when list is scrolled", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 3 screens down
            let lastScreenItems = $(virtualList.items().slice(-10));

            done(() => {
                lastScreenItems.each(function(idx, element) {
                    assert.equal($(element).text().trim(), "loading data...");
                });
            });
        });
    });

    asyncTest("shifts the position of item placeholders", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 3 * CONTAINER_HEIGHT); //scroll the list 1 screen
            let lastScreenItems = virtualList.items().slice(-10);

            done(() => {
                lastScreenItems.each(function(idx, element) {
                    let transform = $(element).css("transform");
                    let translateY = parseInt(transform.substring(transform.lastIndexOf(",") + 2, transform.length - 1), 10);
                    assert.equal(translateY, (5 * CONTAINER_HEIGHT) + (idx * 20));
                });
            });
        });
    });

    asyncTest("starts dataSource request to fetch the next range when threshold is passed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            asyncDataSource.one("requestStart", function(e) {
                done(() => {
                    assert.isOk(true, "request started");
                });
            });

            //(listScreens - 1 - threshold) * screenHeight
            scroll(virtualList.content, (400 - 1 - 0.5) * 200); //scroll the list 1 screens
        });
    });

    asyncTest("does not shift the position of item placeholders until threshold is passed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            //total placeholders height is 200/20 * 4 = 800
            //threshold is 800 * 0.5 = 400, at 400 + 1 * itemHeight placeholders should re-position
            scroll(container, 2 * CONTAINER_HEIGHT);
            let items = virtualList.items();

            done(() => {
                items.each(function(idx, element) {
                    assert.equal($(element).position().top, idx * 20);
                });
            });
        });
    });

    asyncTest("user is able to jump to the bottom of the list", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            placeholderTemplate: () => "loading data...",
            listScreens: 4,
            itemHeight: 20
        }));

        asyncDataSource.read().then(function() {
            //total height is dataSource.total * itemHeight
            //max scrollTop is total height - CONTAINER_HEIGHT
            scroll(container, 100 * 20 - CONTAINER_HEIGHT);

            setTimeout(function() {
                let items = virtualList.items();
                let data = asyncDataSource.data();

                done(() => {
                    items.each(function(idx, element) {
                        assert.equal(items.eq(idx).text(), data[idx].text);
                    });
                });
            }, 300);
        });
    });

    asyncTest("updates the uid of the item placeholders after list position changes", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            scroll(container, 3 * CONTAINER_HEIGHT);

            let items = virtualList.items();
            let dataItems = asyncDataSource.view();

            done(() => {
                items.each(function(idx, element) {
                    assert.isOk(items.eq(idx).data("uid") === dataItems[idx].uid);
                });
            });
        });
    });

    asyncTest("renders only datasource range relevant to the scrollTop 2000px (first request comes later)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() {
                            return $(this).offset().top >= 0;
                        })
                        .first();

                    done(() => {
                        assert.equal(li.text().trim(), "Item 100");
                    });
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 2000px (second request comes later)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() { return $(this).offset().top >= 0; })
                        .first();

                    done(() => {
                        assert.equal(li.text().trim(), "Item 100");
                    });
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 1000px (second request comes later)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() { return $(this).offset().top >= 0; })
                        .first();

                    done(() => {
                        assert.equal(li.text().trim(), "Item 50");
                    });
                }, 100);
            });
        });
        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 1000px (first request comes later)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() { return $(this).offset().top >= 0; })
                        .first();

                    done(() => {
                        assert.equal(li.text().trim(), "Item 50");
                    });
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes last)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() { return $(this).offset().top >= 0; })
                        .first();

                    done(() => {
                        assert.equal(li.text().trim(), "Item 35");
                    });
                }, 100);
            });
        });

        async.resolve(0); //initial request
    });

    asyncTest("renders only datasource range relevant to the scrollTop 700px (four mixed request, last comes first)", function(done) {
        let async = new Async();

        asyncDataSource = createAsyncDataSource({
            transport: {
                read: function(options) {
                    async.exec(function() {
                        options.success({ data: generateData(options.data), total: 1000 });
                    });
                }
            }
        });

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
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
                    let li = virtualList.element.children()
                        .filter(function() { return $(this).offset().top >= 0; })
                        .first();

                    assert.equal(li.text().trim(), "Item 35");
                    done(() => {
                    });
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

    //utilities
    asyncTest("calculates buffer sizes in pixels", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let bufferSizes = virtualList._bufferSizes();

            done(() => {
                assert.equal(bufferSizes.down, 200, "down");
                assert.equal(bufferSizes.up, 400, "up");
            });
        });
    });

    it("check value order", function() {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));
        virtualList._removedAddedIndexes = [2, 1, 3];
        let newValue = virtualList._checkValuesOrder([1, 2, 3]);
        assert.equal(newValue[0], 2);
        assert.equal(newValue[1], 1);
        assert.equal(newValue[2], 3);
    });

    it("value is not changed if removedAddedIndexes with different size", function() {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));
        virtualList._removedAddedIndexes = [2, 1];
        let newValue = virtualList._checkValuesOrder([1, 2, 3]);
        assert.equal(newValue[0], 1);
        assert.equal(newValue[1], 2);
        assert.equal(newValue[2], 3);
    });

    it("value is not changed if no removedAddedIndexes", function() {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
        }));

        let newValue = virtualList._checkValuesOrder([1, 2, 3]);
        assert.equal(newValue[0], 1);
        assert.equal(newValue[1], 2);
        assert.equal(newValue[2], 3);
    });

    asyncTest("calculates buffer sizes in pixels", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let bufferSizes = virtualList._bufferSizes();

            done(() => {
                assert.equal(bufferSizes.down, 200, "down");
                assert.equal(bufferSizes.up, 400, "up");
            });
        });
    });

    asyncTest("forces the placeholder itemHeight", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            let items = virtualList.items();

            done(() => {
                assert.equal(items.eq(0).css("height"), "40px");
                assert.equal(items.eq(0).css("minHeight"), "40px");
            });
        });
    });

    //misc

    it("does not create elements with height larger than 250000px", function() {
        //testing with 100011 items
        let dataSource = new kendo.data.DataSource({
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

        let virtualList = new VirtualList(container, {
            dataSource: dataSource,
            height: CONTAINER_HEIGHT,
            itemHeight: 40
        });

        //height is dataSource.total() * itemHeight
        assert.equal(virtualList.content.find(".k-height-container").height(), 100011 * 40);

        let heightPadChildren = virtualList.content.find(".k-height-container").children();

        //heightPad container is expanded by elements with max height of 250000
        //dataSource.total() * itemHeight / MaxHeightElement + 1 ("1" is added because the total height is not devided by 250000)
        assert.equal(heightPadChildren.length, Math.floor(100011 * 40 / 250000) + 1);

        assert.equal(heightPadChildren.first().height(), 250000);
        assert.equal(heightPadChildren.last().height(), 40 * 11);
    });

    //initialization in hidden container

    asyncTest("can be initialized in a hidden container", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.content.height(), 500);
            });
        });
    });

    asyncTest("group header is hidden when type: flat", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 500
        }));

        asyncDataSource.read().then(function() {
            done(() => {
                assert.isOk(virtualList.header.is(":hidden"));
            });
        });
    });

    asyncTest("VirtualList supports group value set to undefined", function(done) {
        Mocha.fixture.empty();
        container = $("<div id='hidden' style='display: none;'><div id='container'></div></div>").appendTo(Mocha.fixture);

        let data = [
            { text: "item", value: 1, group: "a" },
            { text: "item2", value: 2, group: "b" }
        ];

        let virtualList = new VirtualList(container, {
            autoBind: false,
            dataSource: asyncDataSource,
            itemHeight: ITEM_HEIGHT,
            height: CONTAINER_HEIGHT,
            template: ({ text }) => kendo.htmlEncode(text)
        });

        virtualList.dataSource.one("change", function() {
            done(() => {
                assert.isOk(true);
            });
        });

        virtualList.dataSource.query({ filter: null });
    });

});
