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
    //events

    asyncTest("widget triggers selectedItemChange event when the selected item has changed (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                let that = this;
                let items = e.items;

                done(() => {
                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 0);
                    assert.equal(items[0].item, that.dataSource.view()[0]);
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
                let that = this;

                done(() => {
                    assert.equal(items.length, 1);
                    assert.equal(items[0].index, 1);
                    assert.equal(items[0].item, that.dataSource.view()[1]);
                });
            });

            virtualList.dataSource.view()[1].set("text", "updated");

        });

        virtualList.dataSource.read();
    });

    asyncTest("widget triggers change event if selected item is removed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("change", function(e) {
                done(() => {
                    assert.equal(virtualList.value().length, 0);
                });
            });

            virtualList.dataSource.remove(virtualList.dataSource.at(0));
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget does not trigger change event if selected item is not removed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.dataSource.read().done(function() {
            virtualList.one("change", function(e) {
                assert.isOk(false);
            });
            done(() => {
                virtualList.dataSource.remove(virtualList.dataSource.at(1));
            });
        });
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
});
