import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

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
            value: i,
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
        $.when.apply(null, this.promises).done(callback);
    }
});

describe("VirtualList without valueMapper: ", function() {
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
            pageSize: 20,
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
            template: ({ text }) => kendo.htmlEncode(text),
            dataValueField: "value",
            selectable: true,
            mapValueTo: "dataItem",
            valueMapper: function(o) {
                let result = [];

                if (o.value.length) {
                    o.value.forEach(function(value) {
                        result.push({
                            value: value,
                            text: "Item " + value
                        });
                    });
                    o.success(result);
                } else if (o.value) {
                    o.success({
                        value: o.value,
                        text: "Item " + o.value
                    });
                }
            }
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

    asyncTest("value is set", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                done(() => {
                    assert.equal(virtualList.value(), 37);
                });
            });
        });
    });

    asyncTest("selectedDataItems are set", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                done(() => {
                    assert.isOk(virtualList.selectedDataItems().length);
                    assert.equal(virtualList.selectedDataItems()[0].value, 37);
                });
            });
        });
    });

    asyncTest("selectedIndexes array is filled with undefined values", function(done) {
        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                done(() => {
                    assert.equal(virtualList.select().length, 1);
                    assert.equal(virtualList.select()[0], undefined);
                });
            });
        });
    });

    asyncTest("selecting addiotional items does not remove current (multiple selection)", function(done) {
        $.extend(virtualSettings, {
            selectable: "multiple"
        });

        let virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value([15, 25]).done(function() {
                virtualList.bind("change", function() {
                    let that = this;
                    done(() => {
                        assert.equal(that.selectedDataItems().length, 3);
                        assert.equal(that.selectedDataItems()[2].value, 3);
                        assert.equal(that.select().length, 3);
                        assert.equal(that.select()[2], 3);
                    });
                });
                virtualList.select(3);
            });
        });
    });

    asyncTest("deselects previously selected item that is not part of the current page", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 99
        }));

        asyncDataSource.read().done(function() {
            virtualList.bind("change", function() {
                let that = this;
                done(() => {
                    assert.equal(that.selectedDataItems().length, 1);
                    assert.equal(that.select().length, 1);
                    assert.equal(that.items().filter(".k-selected").length, 1, "Only one item is visibly selected");
                });
            });

            virtualList.select(1);
        });
    });

});
