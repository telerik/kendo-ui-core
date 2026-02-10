import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let container,
    asyncDataSource,
    virtualSettings,
    VirtualList = kendo.ui.VirtualList,
    ITEM_HEIGHT = 40,
    CONTAINER_HEIGHT = 200,

    SELECTED = "k-selected";

function scroll(element, height) {
    element.scrollTop(height);
    element.trigger("scroll");
}

function generateData(parameters) {
    let items = [];
    for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push({
            id: i,
            value: i,
            text: "Item " + i
        });
    }

    return items;
}

describe("VirtualList API: ", function() {
    beforeEach(function() {
        container = $("<div id='container'></div>").appendTo(Mocha.fixture);

        asyncDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 300 });
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
            template: ({ text }) => text,
            dataValueField: "value"
        };
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }

        Mocha.fixture.empty();
    });

    //rendering

    asyncTest("screenHeight method gets the content height", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            done(() => assert.equal(virtualList.screenHeight(), CONTAINER_HEIGHT));
        });
    });

    asyncTest("ul property returns jQuery wrapper for flat list UL element", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            done(() => {
                assert.isOk(virtualList.ul, "ul property should exist");
                assert.isOk(virtualList.ul instanceof $, "ul should be a jQuery object");
                assert.equal(virtualList.ul.length, 1, "ul should contain one element");
                assert.isOk(virtualList.ul.hasClass("k-list-ul"), "ul should have k-list-ul class");
            });
        });
    });

    asyncTest("ulElements method returns jQuery wrapper for flat list UL element", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            done(() => {
                let ulElements = virtualList.ulElements();
                assert.isOk(ulElements instanceof $, "ulElements should return a jQuery object");
                assert.equal(ulElements.length, 1, "ulElements should contain one element for flat list");
                assert.isOk(ulElements.hasClass("k-list-ul"), "ulElements should have k-list-ul class");
            });
        });
    });

    asyncTest("scrollWith method scrolls content down", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            virtualList.scrollWith(200);
            done(() => assert.equal(virtualList.content[0].scrollTop, 200));
        });
    });

    asyncTest("scrollWith method scrolls content up", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 200);
            virtualList.scrollWith(-100);

            done(() => assert.equal(virtualList.content[0].scrollTop, 100));
        });
    });


    //events

    asyncTest("widget triggers selectedItemChange event when the selected item has changed (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                let items = e.items;

                done(() => {
                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 0);
                    assert.equal(items[0].item, this.dataSource.view()[0]);
                });
            });

            virtualList.dataSource.view()[0].set("text", "updated");
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget does not trigger selectedItemChange event when updated item is not updated", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                count++;
            });

            virtualList.dataSource.view()[1].set("text", "updated");

            done(() => {
                assert.isNotOk(count);
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget passes only the changed items in the selectedItemChange event (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0, 1]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                let items = e.items;

                done(() => {
                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 1);
                    assert.equal(items[0].item, this.dataSource.view()[1]);
                });
            });

            virtualList.dataSource.view()[1].set("text", "updated");

        });

        virtualList.dataSource.read();
    });

    asyncTest("fires the itemChange event", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            itemChange: function() {
                this.unbind("itemChange");
                done(() => {
                    assert.isOk(true, "itemChange event is fired");
                });
            }
        }));
        asyncDataSource.read();
    });

    asyncTest("fires the listBound event", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listBound: function() {
                this.unbind("listBound");
                done(() => {
                    assert.isOk(true, "listBound event is fired");
                });
            }
        }));
        asyncDataSource.read();
    });

    asyncTest("fires the listBound event after new dataItems are rendered", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings));
        asyncDataSource.read().then(function() {
            virtualList.one("listBound", function() {
                done(() => {
                    assert.isOk(true, "ListBound is fired");
                });
            });
            scroll(virtualList.content, 16 * ITEM_HEIGHT);
        });
    });

    asyncTest("skip returns the start of the dataSource range", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings));
        asyncDataSource.read().then(function() {
            virtualList.one("listBound", function() {
                let that = this;
                done(() => {
                    assert.isOk(that.skip() !== that.dataSource.page(), "Skip is different from page");
                    assert.isOk(that.skip() >= 10 && that.skip() <= 12, "Skip should be around 10-12, got " + that.skip());
                });
            });
            scroll(virtualList.content, 16 * ITEM_HEIGHT);
        });
    });

    asyncTest("listBound event is fired after all values are prefetched", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(o) {
                o.success(256);
            },
            value: 256
        }));

        virtualList.one("listBound", function() {
            done(() => {
                assert.equal(virtualList.value()[0], 256);
                assert.equal(virtualList.select()[0], 256);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("selectedDataItems method returns correct amount of items after scrolling down and up", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(virtualList.items().first()).done(function() {
                assert.equal(virtualList.selectedDataItems().length, 1);
                scroll(container, 4 * CONTAINER_HEIGHT);

                setTimeout(function() {
                    virtualList.select(virtualList.items().last()).done(function() {
                        scroll(container, 0);

                        done(() => {
                            assert.equal(virtualList.selectedDataItems().length, 2);
                        });
                    });
                }, 300);
            });
        });
    });

    it("selectedDataItems method returns a new array copy", function() {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            }
        }));

        virtualList.value(123);

        let items = virtualList.selectedDataItems();

        assert.notEqual(items, virtualList.selectedDataItems());
    });

    asyncTest("focus method returns null if there is no focused item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            done(() => {
                assert.equal(virtualList.focus(), null);
            });
        });
    });

    asyncTest("focusNext method focuses first item if there is no currently focused item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.focusNext();
            done(() => {
                assert.equal(virtualList.focusIndex(), 0);
            });
        });
    });

    asyncTest("fcusPrev method focuses last item if there is no currently focused item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.focusPrev();
            done(() => {
                assert.equal(virtualList.focusIndex(), virtualList.dataSource.total() - 1);
            });
        });
    });

    asyncTest("focusIndex method returns focused index", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {

            virtualList.focus(0);
            done(() => {
                assert.equal(virtualList.focusIndex(), 0);
            });
        });
    });

    asyncTest("focusIndex method returns undefined if no item is selected", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(1).done(function() {
                virtualList.select(-1).done(function() {
                    done(() => {
                        assert.isOk(!virtualList.focusIndex());
                    });
                });
            });
        });
    });

    asyncTest("setOptions changes the template", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.items().first().text(), "Item 0");

            virtualList.setOptions({
                template: ({ text }) => `<span class='foo'>${kendo.htmlEncode(text)}</span>`
            });

            done(() => {
                assert.equal(virtualList.items().first().find(".k-list-item-text").html(), '<span class="foo">Item 0</span>');
            });
        });
    });

    asyncTest("setOptions turns on the selectable", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, virtualSettings);
        virtualList.bind("click", function() {
            count++;
        });

        asyncDataSource.read().then(function() {
            virtualList.setOptions({ selectable: true });
            virtualList.items().first().trigger("click");
            done(() => {
                assert.isOk(count);
            });
        });
    });

    asyncTest("setOptions turns off the selectable", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            click: function() {
                count++;
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.setOptions({ selectable: false });
            virtualList.items().first().trigger("click");
            done(() => {
                assert.isNotOk(count);
            });
        });
    });

    it("bound returns false if the list is not bound yet", function() {
        let virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read();
        assert.isOk(!virtualList.bound());
    });

    asyncTest("bound returns true if the list is bound", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().then(function() {
            done(() => {
                assert.isOk(virtualList.bound());
            });
        });
    });

    asyncTest("bound sets the bound stat of the widget", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().then(function() {
            virtualList.bound(false);

            done(() => {
                assert.isOk(!virtualList.bound());
            });
        });
    });

    it("value method returns a new array copy", function() {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            }
        }));

        virtualList.value(123);

        let value = virtualList.value();

        assert.notEqual(value, virtualList.value());
    });

    asyncTest("value method prefetches values (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            },
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems()[0].value, 123);
                });
            }
        }));

        virtualList.value(123);
        asyncDataSource.read();
    });

    asyncTest("value method prefetches values (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([74, 123]);
                }, 0);
            },
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems()[0].value, 74);
                    assert.equal(virtualList.selectedDataItems()[1].value, 123);
                });
            }
        }));

        virtualList.value([74, 123]);
        asyncDataSource.read();
    });

    asyncTest("when empty array is passed to the value method all values are cleared", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                let that = this;
                done(() => {
                    assert.isOk(true, "change is fired");
                    assert.equal(that.value().length, 0);
                    assert.equal(that.selectedDataItems().length, 0);
                });
            });
            virtualList.value([]);
        });
    });

    asyncTest("when null is passed to the value method all values are cleared", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                let that = this;
                done(() => {
                    assert.isOk(true, "change is fired");
                    assert.equal(that.value().length, 0);
                    assert.equal(that.selectedDataItems().length, 0);
                });
            });
            virtualList.value(null);
        });
    });

    asyncTest("when empty array is passed to the value method removed items are available in the change event", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done(() => {
                    assert.equal(e.removed.length, 3);
                });
            });
            virtualList.value([]);
        });
    });

    asyncTest("when null is passed to the value method removed items are available in the change event", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done(() => {
                    assert.equal(e.removed.length, 3);
                });
            });
            virtualList.value(null);
        });
    });

    asyncTest("value method clears previous values and dataItems (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: [1]
        }));

        virtualList.bind("listBound", function() {
            virtualList.bind("change", function() {
                let that = this;
                done(() => {
                    assert.equal(that.selectedDataItems().length, 1);
                    assert.equal(that.value().length, 1);
                    assert.equal(that.value()[0], 4);
                }); //select new values
            });
            virtualList.value([4]);
        });

        asyncDataSource.read();
    });

    asyncTest("value method clears previous values and dataItems (multiple)", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                let that = this;
                if (count === 1) { //first change de-selects all items
                    assert.equal(that.value().length, 0);
                    assert.equal(that.selectedDataItems().length, 0);
                    count += 1;
                } else {
                    done(() => {
                        assert.equal(that.value().length, 2);
                        assert.equal(that.selectedDataItems().length, 2);
                    }); //select new values
                }
            });
            virtualList.value([4, 5]);
        });
    });

    asyncTest("value method clears previous values if value mapper returns an empty array", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([]); //explicitly return empty array
                }, 0);
            },
            value: [1000, 2000, 3000],
            listBound: function() {
                done(() => {
                    assert.equal(virtualList.value().length, 0);
                });
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("valueDeffered is resolved immediately if empty array is passed", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([]).done(function() {
                done(() => {
                    assert.isOk(true, "done callback");
                    assert.equal(virtualList.value().length, 0);
                });
            });
        });
    });

    asyncTest("valueDeffered is resolved immediately if null is passed", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        asyncDataSource.read().then(function() {
            virtualList.value(null).done(function() {
                done(() => {
                    assert.isOk(true, "done callback");
                    assert.equal(virtualList.value().length, 0);
                });
            });
        });
    });

    asyncTest("valueDeffered is resolved immediately if value mapper returns an empty array", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([]);
                }, 0);
            },
            selectable: true
        }));

        virtualList.value([""]).done(function() {
            done(() => {
                assert.isOk(true);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("valueDeffered object is not resolved immediately after clearing the values (multiple selection)", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 3]
        }));

        virtualList.value([4, 5]).done(function() {

            done(() => {
                assert.equal(virtualList.select().length, 2);
                assert.equal(virtualList.select()[0], 4);
                assert.equal(virtualList.select()[1], 5);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("valueDeffered object is not resolved immediately after clearing the values (multiple selection + valueMapper)", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([89, 91]);
                }, 0);
            },
            value: [1, 2, 3]
        }));

        virtualList.value([89, 91]).done(function() {
            done(() => {
                assert.equal(virtualList.select().length, 2);
                assert.equal(virtualList.select()[0], 89);
                assert.equal(virtualList.select()[1], 91);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("valueDeffered is resolved when same value is set multiple times", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "single",
            valueMapper: function(options) {
                options.success([2]);
            }
        }));

        virtualList.value([2]);
        asyncDataSource.read().then(function() {
            virtualList.value([2]).then(function() {
                done(() => {
                    assert.isOk(true, "promise is resolved");
                });
            });
        });
    });

    asyncTest("value method clears previous values and dataItems", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: [1]
        }));

        virtualList.bind("listBound", function() {
            virtualList.bind("change", function() {
                let that = this;
                done(() => {
                    assert.equal(that.value().length, 1);
                    assert.equal(that.value()[0], 2);

                    assert.equal(that.element.find(".k-selected").length, 1);
                });
            });
            virtualList.value([2]);
        });

        asyncDataSource.read();
    });

    asyncTest("value method return resolved promise", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(20);
                }, 0);
            }
        }));

        asyncDataSource.read().done(function() {
            virtualList.value(20).done(function() {
                done(() => {
                    assert.isOk(true);
                });
            });
        });
    });

    asyncTest("value method returns promise resolved after data prefetch", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            }
        }));

        virtualList.value(123).done(function() {
            let indices = virtualList.select();


            done(() => {
                assert.equal(indices.length, 1);
                assert.equal(indices[0], 123);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("value method selects an item with empty string value", function(done) {

        let generateDataWithEmptyStringValue = function(parameters) {
            let items = [];
            for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                items.push({
                    id: i,
                    value: (i === 0) ? "" : i,
                    text: "Item " + i
                });
            }

            return items;
        };

        let emptyStringDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            dataSource: emptyStringDataSource
        }));

        virtualList.value("").done(function() {
            let indices = virtualList.select();


            done(() => {
                assert.equal(indices.length, 1);
                assert.equal(indices[0], 0);
            });
        });

        emptyStringDataSource.read();
    });

    asyncTest("value method selects an item with empty string value (valueMapper is invoked)", function(done) {

        let generateDataWithEmptyStringValue = function(parameters) {
            let items = [];
            for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                items.push({
                    id: i,
                    value: (i === 123) ? "" : i,
                    text: "Item " + i
                });
            }

            return items;
        };

        let emptyStringDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            dataSource: emptyStringDataSource,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            }
        }));

        virtualList.value("").done(function() {
            let indices = virtualList.select();


            done(() => {
                assert.equal(indices.length, 1);
                assert.equal(indices[0], 123);
            });
        });

        emptyStringDataSource.read();
    });

    asyncTest("value method selects an item with empty string value (multiple selection + valueMapper)", function(done) {

        let generateDataWithEmptyStringValue = function(parameters) {
            let items = [];
            for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                items.push({
                    id: i,
                    value: (i === 123) ? "" : i,
                    text: "Item " + i
                });
            }

            return items;
        };

        let emptyStringDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            dataSource: emptyStringDataSource,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([89, 123]);
                }, 0);
            }
        }));

        virtualList.value([89, ""]).done(function() {
            let indices = virtualList.select();

            done(() => {
                assert.equal(indices.length, 2);
                assert.equal(indices[0], 89);
                assert.equal(indices[1], 123);
            });
        });

        emptyStringDataSource.read();
    });

    asyncTest("widget does not trigger change when new item is added to the source", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: "1",
            valueMapper: function(operation) {
                operation.success(1);
            }
        }));

        asyncDataSource.read();
        virtualList.one("listBound", function() {
            virtualList.bind("change", function() {
                count++;
            });

            virtualList.dataSource.add("new item");

            done(() => {
                assert.isNotOk(count);
            });
        });
    });

    asyncTest("widget does not trigger change when an item is removed from the source", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: "1",
            valueMapper: function(operation) {
                operation.success(1);
            }
        }));

        asyncDataSource.read();

        virtualList.one("listBound", function() {
            virtualList.bind("change", function() {
                count++;
            });

            virtualList.dataSource.remove(virtualList.dataSource.at(0));

            done(() => {
                assert.isNotOk(count);
            });
        });
    });

    asyncTest("setDataSource method clears value before setting the new source", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: "1",
            valueMapper: function(operation) {
                operation.success(1);
            }
        }));

        virtualList.one("listBound", function() {
            virtualList.bind("change", function() {
                let value = virtualList.value();
                done(() => {
                    assert.equal(value.length, 0);
                });
            });

            virtualList.setDataSource(["1", "2"]);
        });

        asyncDataSource.read();
    });

    asyncTest("setDataSource method sets value silently after source is changed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: "1",
            valueMapper: function(operation) {
                operation.success(1);
            }
        }));

        virtualList.one("listBound", function() {
            virtualList.bind("change", function() {
                assert.isOk(true);
            });

            virtualList.setDataSource(["1", "2"]);

            done(() => {
                assert.equal(virtualList.value().length, 1);
                assert.equal(virtualList.value()[0], "1");
            });
        });

        asyncDataSource.read();
    });

    asyncTest("setDataSource method cleans the list when source is updated", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: "1",
            valueMapper: function(operation) {
                operation.success(1);
            }
        }));

        virtualList.one("listBound", function() {
            virtualList.setDataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 80,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            done(() => {
                assert.isOk(!virtualList.bound());
                assert.isOk(!virtualList.content.children().length);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("removeAt method removes values at current position", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                operation.success([123, 223]);
            },
            change: function() {
                virtualList.removeAt(0);

                let value = virtualList.value();
                let indices = virtualList.select();
                let dataItems = virtualList.selectedDataItems();
                done(() => {
                    assert.equal(value.length, 1);
                    assert.equal(indices.length, 1);
                    assert.equal(dataItems.length, 1);

                    assert.equal(value[0], 223);
                    assert.equal(indices[0], 223);
                    assert.equal(dataItems[0].value, 223);
                });


            }
        }));

        virtualList.value([123, 223]);

        asyncDataSource.read();
    });

    asyncTest("removeAt method returns deleted data item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(operation) {
                operation.success([123, 223]);
            },
            change: function() {

                let removed = virtualList.removeAt(0);

                done(() => {
                    assert.equal(removed.position, 0);
                    assert.equal(removed.dataItem.value, 123);
                    assert.isOk(!Array.isArray(removed.dataItem));
                });
            }
        }));

        virtualList.value([123, 223]);

        asyncDataSource.read();
    });

    asyncTest("setValue method updates values of the widget silently", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            virtualList.setValue("item");

            let value = virtualList.value();
            let indices = virtualList.select();

            done(() => {
                assert.equal(indices.length, 0);

                assert.equal(value.length, 1);
                assert.equal(value[0], "item");
            });
        });
    });

    asyncTest("isFiltered method returns true if source is filtered", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {

            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            done(() => {
                assert.isOk(virtualList.isFiltered());
            });
        });
    });

    asyncTest("isFiltered method returns true if source is bound with filtering", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        virtualList.one("listBound", function() {

            done(() => {
                assert.isOk(virtualList.isFiltered());
            });
        });

        asyncDataSource.filter({
            field: "value",
            operator: "eq",
            value: 2
        });
    });

    asyncTest("isFiltered method returns false if applied filter is removed", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {

            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            asyncDataSource.one("change", function() {
                virtualList.dataSource.filter({});

                done(() => {
                    assert.isOk(!virtualList.isFiltered());
                });
            });
        });
    });

    asyncTest("select value when source and value are applied simultaneously", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            autoBind: true,
            selectable: true,
            dataSource: [],
            valueMapper: function(o) {
                let value = o.value;

                if (!value) {
                    value = [];
                }

                o.success(o.value);
            },
            value: "",
        }));

        asyncDataSource.one("change", function() {

            let value = virtualList.value();

            done(() => {
                assert.equal(value[0], 250);
            });
        });

        virtualList.setDataSource(asyncDataSource);
        virtualList.value(250);
    });

    asyncTest("fetch the correct data page when selecting a border index", function(done) {
        let value = 240;
        let requests = [];
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            requests.push(options.data);
                            options.success({ data: generateData(options.data), total: 300 });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            height: 500,
            itemHeight: 50,
            valueMapper: function(o) {
                o.success(o.value);
            }
        }));

        virtualList.dataSource.read().then(function() {
            let check = function() {
                if (!check) { return; }

                check = null;
                done(() => {
                    assert.equal(requests.length, 2);
                    assert.equal(requests[1].page, 7); //[240, 280)
                });
            };

            virtualList.dataSource.one("change", check);
            virtualList.value(value);
        });
    });

    asyncTest("dataItemByIndex method returns a dataItem from first range", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            height: 500,
            itemHeight: 50,
            valueMapper: function(o) {
                o.success(o.value);
            },
            value: 0
        }));

        virtualList.bind("listBound", function() {
            let dataItem = virtualList.dataItemByIndex(0);

            done(() => {
                assert.isOk(dataItem);
                assert.equal(dataItem.id, 0);
                assert.equal(dataItem.value, 0);
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("dataItemByIndex method returns a dataItem from a prefetched range", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            height: 500,
            itemHeight: 50,
            valueMapper: function(o) {
                o.success(o.value);
            },
            value: 210
        }));

        virtualList.one("listBound", function() {
            let dataItem = virtualList.dataItemByIndex(210);

            done(() => {
                assert.isOk(dataItem);
                assert.equal(dataItem.id, 210);
                assert.equal(dataItem.value, 210);
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("dataItemByIndex method returns null if data is not loaded", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            height: 500,
            itemHeight: 50,
            valueMapper: function(o) {
                o.success(o.value);
            }
        }));

        virtualList.one("listBound", function() {
            let dataItem = virtualList.dataItemByIndex(210);

            done(() => {
                assert.equal(dataItem, null);
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("getElementIndex method returns LI offset index", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ data: generateData(options.data), total: 300 });
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            height: 500,
            itemHeight: 50,
            valueMapper: function(o) {
                o.success(o.value);
            }
        }));

        virtualList.bind("listBound", function() {
            let li = virtualList.items().eq(3);
            let index = virtualList.getElementIndex(li);
            done(() => {
                assert.equal(index, 3);
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("select method unselects prefetched item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([256]);
            }
        }));

        virtualList.one("listBound", function() {

            virtualList.select([256]);

            done(() => {
                assert.equal(virtualList.value().length, 0);
                assert.equal(virtualList.select().length, 0);
            });
        });

        virtualList.select([256]);
    });

    asyncTest("select method notifies for removed after valueMapper is called", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([256]);
            },
            value: [256]
        }));

        virtualList.one("listBound", function() {
            virtualList.one("change", function(e) {
                done(() => {
                    assert.equal(e.removed.length, 1);
                    assert.equal(e.removed[0].index, 256);
                });
            });

            virtualList.mapValueToIndex([256]);
        });

        virtualList.dataSource.read();
    });
});
