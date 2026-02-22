import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { stub } from '../../helpers/unit/stub.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

let container,
    asyncDataSource,
    VirtualList = kendo.ui.VirtualList,
    virtualSettings = {},
    ITEM_HEIGHT = 20,
    CONTAINER_HEIGHT = 200,

    FOCUSED = "k-focus",
    SELECTED = "k-selected";

function selectAll(virtual, elements, done) {
    let item = elements.shift();

    if (item === undefined) {
        done();
        return;
    }

    virtual.select(item).done(function() {
        selectAll(virtual, elements, done);
    });
}

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

function valueMapper(o) {
    setTimeout(function() {
        o.success(o.value);
    }, 0);
}

describe("VirtualList Selection: ", function() {
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
            height: CONTAINER_HEIGHT,
            itemHeight: ITEM_HEIGHT,
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

    //VirtualList prefetch, single selection
    asyncTest("does not call prefetch for already available data", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([0]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 0);
            });
        });
    });

    asyncTest("calls prefetch for not available data", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([90]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 1);
            });
        });
    });

    asyncTest("calls prefetch with the correct skip, take", function(done) {
        let args;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([123]); //expected range 120 - 160

            args = asyncDataSource.args("_multiplePrefetch");
            done(() => {
                assert.equal(args[0], 120); //skip
                assert.equal(args[1], 40); //take
            });
        });
    });

    asyncTest("resolves the promise when data is prefetched", function(done) {
        let deferred;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, {
            _multiplePrefetch: asyncDataSource._multiplePrefetch
        });

        asyncDataSource.read().then(function() {
            deferred = virtualList.prefetch([90]);
            deferred.done(function() {
                done(() => {
                    assert.isOk(true, "promise is resolved");
                    assert.equal(asyncDataSource._ranges.length, 2);
                });
            });
        });
    });

    asyncTest("calls prefetch only once per range", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([90]);
            virtualList.prefetch([91]);
            virtualList.prefetch([92]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 1);
            });
        });
    });

    //VirtualList prefetch, multiple selection
    asyncTest("does not call prefetch for already available data (multi selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([0, 4, 7]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 0);
            });
        });
    });

    asyncTest("calls prefetch for not available data (multi selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([90, 167]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 2);
            });
        });
    });

    asyncTest("resolves the promise when data is prefetched (multi selection)", function(done) {
        let deferred;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, {
            _multiplePrefetch: asyncDataSource._multiplePrefetch
        });

        asyncDataSource.read().then(function() {
            deferred = virtualList.prefetch([90]);
            deferred.done(function() {
                done(() => {
                    assert.isOk(true, "promise is resolved");
                    assert.equal(asyncDataSource._ranges.length, 2);
                });
            });
        });
    });

    asyncTest("calls prefetch only once per range (multi selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            virtualList.prefetch([40, 82, 100]);
            virtualList.prefetch([101]);
            done(() => {
                assert.equal(asyncDataSource.calls("_multiplePrefetch"), 2);
            });
        });
    });

    //rendering

    asyncTest("selecting listItem visually selects it", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();
            virtualList.select(element).done(function() {
                done(() => {
                    assert.isOk(element.hasClass(SELECTED));
                });
            });
        });
    });

    asyncTest("selecting listItem visually selects it (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED));
                    assert.isOk(virtualList.items().eq(2).hasClass(SELECTED));
                    assert.isOk(virtualList.items().eq(7).hasClass(SELECTED));
                });
            });
        });
    });

    asyncTest("selecting already selected listItem does not visually deselect it", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        let element;

        let selectElementDone2 = function() {
            done(() => {
                assert.isOk(element.hasClass(SELECTED));
            });
        };

        let selectElementDone1 = function() {
            assert.isOk(element.hasClass(SELECTED));
            virtualList.select(element).done(selectElementDone2);
        };

        let asyncDataSourceThen = function() {
            element = virtualList.items().first();
            virtualList.select(element).done(selectElementDone1);
        };

        asyncDataSource.read().then(asyncDataSourceThen);
    });

    asyncTest("selecting already selected listItems visually deselects it (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        let deselectSecondDone = function() {

            done(() => {
                assert.isOk(!virtualList.items().eq(2).hasClass(SELECTED));
            });
        };

        let allDone = function() {
            assert.isOk(virtualList.items().eq(1).hasClass(SELECTED));
            assert.isOk(virtualList.items().eq(2).hasClass(SELECTED));
            assert.isOk(virtualList.items().eq(7).hasClass(SELECTED));

            virtualList.select(virtualList.items().eq(2)).done(deselectSecondDone);
        };

        let asyncDataSourceThen = function() {
            let elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            selectAll(virtualList, elements, allDone);
        };

        asyncDataSource.read().done(asyncDataSourceThen);
    });

    asyncTest("select method updates the value of the list", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            change: function() {
                done(() => {
                    assert.equal(virtualList.value()[0], 0);
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(virtualList.items().first());
        });
    });

    asyncTest("select method updates the value of the list (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 2, 7]));
                });
            });
        });
    });

    asyncTest("selecting already selected listItem does not deselect it", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let selectTwoDone = function() {
                done(() => {
                    assert.equal(virtualList.value()[0], 0);
                });
            };

            let selectOneDone = function() {
                virtualList.select(virtualList.items().first()).done(selectTwoDone);
            };

            virtualList.select(virtualList.items().first()).done(selectOneDone);
        });
    });

    asyncTest("selecting already selected listItem deselects it (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            let virtualDone = function() {
                virtualList.select(virtualList.items().eq(2)).done(function() {
                    done(() => {
                        assert.equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 7]));
                    });
                });
            };

            selectAll(virtualList, elements, virtualDone);
        });
    });

    asyncTest("setting the initial value selects the item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 6,
            valueMapper: valueMapper
        }));

        asyncDataSource.read().then(function() {
            done(() => {
                assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
            });
        });
    });

    asyncTest("setting the initial value selects the item (multiple selection)", function(done) {
        let values = [1, 10, 6];

        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: values,
            valueMapper: valueMapper
        }));

        asyncDataSource.read().then(function() {

            done(() => {
                for (let i = 0; i < values.length; i++) {
                    assert.isOk(virtualList.items().eq(values[i]).hasClass(SELECTED), "Item " + i + " is selected");
                }
            });
        });
    });

    asyncTest("setting the value with the value method updates the selection", function(done) {
        let values = [1, 10, 6];
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: values,
            valueMapper: valueMapper
        }));

        virtualList.bind("listBound", function() {
            virtualList.value(9).done(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is not selected");
                });
            });
        });

        asyncDataSource.read();
    });

    asyncTest("setting the value with the value method updates the selection (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper,
            change: function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([1, 5, 6]);
        });
    });

    asyncTest("setting the value with the value method clears the selection in valueMapper returns null", function(done) {
        let values = [100];
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: values,
            valueMapper: function(o) { o.success([-1]); }
        }));

        virtualList.bind("listBound", function() {
            done(() => {
                assert.equal(virtualList.value().length, 0);
            });
        });

        asyncDataSource.read();
    });

    asyncTest("selection is cleared if non existing value is set through the API and the valueMapper returns no indexes", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 1,
            selectable: true,
            valueMapper: function(operation) {
                operation.success([]);
            }
        }));

        virtualList.bind("listBound", function() {
            virtualList.bind("change", function(e) {
                done(() => {
                    assert.isOk(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
                });
            });
            virtualList.value("");
        });

        asyncDataSource.read();
    });

    asyncTest("selection is cleared if non existing value is set through the API and the valueMapper returns -1", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 1,
            selectable: true,
            valueMapper: function(operation) {
                operation.success(-1);
            }
        }));

        virtualList.bind("listBound", function() {
            virtualList.bind("change", function(e) {
                done(() => {
                    assert.isOk(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
                });
            });
            virtualList.value("");
        });

        asyncDataSource.read();
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: valueMapper
        }));

        virtualList.value(3);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.isOk(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
            });
        });
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created (multiple values)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper
        }));

        virtualList.value([1, 5, 9]);

        asyncDataSource.read().then(function() {
            done(() => {
                assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
            });
        });
    });

    asyncTest("selecting item triggers the change event", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            change: function() {
                done(() => {
                    assert.isOk(true, "change is triggered");
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(virtualList.items().first());
        });
    });

    asyncTest("selecting already selected item does not trigger the change event", function(done) {
        let count = 0;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        virtualList.bind("listBound", function() {
            virtualList.one("change", function() {
                count++;
            });
            virtualList.select(0).done(function() {
                done(() => {
                    assert.isNotOk(count);
                });
            });
        });

        asyncDataSource.read();
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {

            let element = virtualList.items().first();
            virtualList.select(element).done(function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 1, "One item is selected");
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0], "First item is selected");
                });
            });
        });
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem (multiple items)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];
            elements.push(virtualList.items().eq(0));
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));

            selectAll(virtualList, elements, function() {
                done(() => {
                    for (let i = 0; i < 3; i++) {
                        assert.equal(virtualList.selectedDataItems()[i], asyncDataSource.data()[i]);
                    }
                });
            });
        });
    });

    asyncTest("saves the dataItems that correspond to the initially set values", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0, 1],
            valueMapper: valueMapper,
            selectable: "multiple",
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                });
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("selecting already selected listItem removes it from stored dataItems", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0, 7]
        }));

        virtualList.bind("listBound", function() {
            let element = virtualList.items().eq(0);

            virtualList.select(element).done(function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 1, "First item is removed");
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
                });
            });
        });

        asyncDataSource.read();
    });

    asyncTest("changing the value through the value method updates dataItems collection", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: valueMapper,
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[1]);
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([1]);
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection (multi selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper,
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([0, 1]);
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection (initially set values)", function(done) {
        let count = 1;
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [7],
            valueMapper: valueMapper,
            selectable: "multiple"
        }));

        virtualList.bind("listBound", function() {

            virtualList.bind("change", function() {
                if (count > 1) { //skip first change when value is cleared
                    done(() => {
                        assert.equal(virtualList.selectedDataItems().length, 2);
                        assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                        assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    });
                }
                count += 1;
            });
            virtualList.value([0, 1]);
        });

        asyncDataSource.read();
    });

    asyncTest("not available dataItems set as values are prefetched", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0].value === 7);
                    assert.isOk(virtualList.selectedDataItems()[1].value === 256);
                });
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([7, 256]);
        });
    });

    asyncTest("not available dataItems set as values are prefetched (initially set items)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [7, 256],
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            change: function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0].value === 7);
                    assert.isOk(virtualList.selectedDataItems()[1].value === 256);
                });
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("selection is persisted accross ranges", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            itemHeight: 40
        }));

        let element;

        asyncDataSource.read().then(function() {
            element = virtualList.items().first();
            virtualList.select(element).done(function() {
                assert.isOk(element.hasClass(SELECTED));
                scroll(container, 4 * CONTAINER_HEIGHT);
                setTimeout(function() {
                    scroll(container, 0);

                    done(() => {
                        assert.isOk(element.hasClass(SELECTED), "First item is not selected");
                    });
                }, 300);
            });
        });
    });

    asyncTest("previously selected item is de-selected (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.equal(virtualList.items().filter("." + SELECTED).length, 1);
                });
            });
        });
    });

    asyncTest("previously selected value is removed (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.equal(virtualList.value().length, 1);
                    assert.equal(virtualList.value()[0], 2);
                });
            });
        });
    });

    asyncTest("previously selected dataItem is removed (single selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0].value, 2);
                });
            });
        });
    });

    // select method

    asyncTest("select method focuses the element", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().eq(1);
            virtualList.select(element).done(function() {
                done(() => {
                    assert.isOk(element.hasClass(FOCUSED));
                });
            });
        });
    });

    asyncTest("select method selects the element", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().eq(1);
            virtualList.select(element).done(function() {
                done(() => {
                    assert.isOk(element.hasClass(SELECTED));
                    assert.equal(virtualList.value()[0], 1);
                    assert.equal(virtualList.selectedDataItems()[0].value, 1);
                });
            });
        });
    });

    asyncTest("select method changes the focused element", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.isOk(!virtualList.items().eq(1).hasClass(FOCUSED));
                    assert.isOk(virtualList.items().eq(2).hasClass(FOCUSED));
                });
            });
        });
    });

    asyncTest("select method changes the value", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let elements = [virtualList.items().eq(1), virtualList.items().eq(2)];

            selectAll(virtualList, elements, function() {
                done(() => {
                    assert.equal(virtualList.value().length, 1);
                    assert.equal(virtualList.value()[0], 2);
                });
            });
        });
    });

    asyncTest("select method accepts predicate function", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(function(dataItem) {
                return dataItem.value === 2;
            }).done(function() {
                let element = virtualList.items().eq(2);
                done(() => {
                    assert.isOk(element.hasClass(FOCUSED));
                    assert.isOk(element.hasClass(SELECTED));
                    assert.equal(virtualList.value()[0], 2);
                });
            });
        });
    });

    asyncTest("select method returns currently selected index", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(3).done(function() {
                done(() => {
                    assert.equal(virtualList.select(), 3);
                });
            });
        });
    });

    asyncTest("select method deletes selected value when -1 is passed", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 6
        }));

        virtualList.bind("listBound", function() {
            virtualList.select(-1).done(function() {
                done(() => {
                    assert.equal(virtualList.value().length, 0);
                });
            });
        });

        asyncDataSource.read();
    });

    asyncTest("select method sets selected values when multiple elements are selected", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let virtualDone = function() {
                done(() => {
                    assert.equal(virtualList.value().length, 2);
                    assert.equal(virtualList.value()[0], 1);
                    assert.equal(virtualList.value()[1], 0);
                });
            };

            selectAll(virtualList, [1, 0], virtualDone);
        });
    });

    asyncTest("select method removes values on deselect", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let selectDone2 = function() {
                done(() => {
                    assert.equal(virtualList.value().length, 0);
                });
            };

            let selectDone1 = function() {
                selectAll(virtualList, [0, 1], selectDone2);
            };

            selectAll(virtualList, [0, 1], selectDone1);
        });
    });

    // select method

    asyncTest("focus method adds focused class to the element", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().eq(1);
            virtualList.focus(element);

            done(() => {
                assert.isOk(element.hasClass(FOCUSED));
            });
        });
    });

    asyncTest("focus method changes the focused element", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element1 = virtualList.items().eq(1);
            virtualList.focus(element1);

            let element2 = virtualList.items().eq(2);
            virtualList.focus(element2);

            done(() => {
                assert.isOk(!element1.hasClass(FOCUSED));
                assert.isOk(element2.hasClass(FOCUSED));
            });
        });
    });

    asyncTest("focus method does not change the selection", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element1 = virtualList.items().eq(1);
            virtualList.select(element1).done(function() {
                let element2 = virtualList.items().eq(2);
                virtualList.focus(element2);

                done(() => {
                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                });
            });
        });
    });

    asyncTest("focus method accepts predicate function", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.focus(function(dataItem) {
                return dataItem.value === 1;
            });

            let element = virtualList.items().eq(1);
            done(() => {
                assert.isOk(element.hasClass(FOCUSED));
            });
        });
    });

    asyncTest("next method focuses the next item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element1 = virtualList.items().eq(1);
            virtualList.select(element1).done(function() {
                let element2 = virtualList.items().eq(2);
                virtualList.focusNext();

                done(() => {
                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                });
            });
        });
    });

    asyncTest("prev method focuses the prev item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element1 = virtualList.items().eq(2);
            virtualList.select(element1).done(function() {
                let element2 = virtualList.items().eq(1);
                virtualList.focusPrev();

                done(() => {
                    assert.isOk(!element1.hasClass(FOCUSED));
                    assert.isOk(element1.hasClass(SELECTED));
                    assert.isOk(element2.hasClass(FOCUSED));
                });
            });
        });
    });

    asyncTest("focus method scrolls to the focused item in case the List is in hidden container", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(0).done(function() {
                virtualList.wrapper.hide();

                selectAll(virtualList, [9, 10, 11, 12], function() {
                    virtualList.wrapper.show();
                    virtualList.focus(12);

                    done(() => {
                        // The focused item (index 12) should be scrolled into view
                        // Verify that scrollTop is greater than 0 (list was scrolled)
                        // and that the focused element exists and has the focus class
                        const focusedElement = virtualList.items().filter(".k-focus");
                        const scrollTop = virtualList.content.scrollTop();

                        assert.isOk(scrollTop > 0, "List should have scrolled to show focused item");
                        assert.equal(focusedElement.length, 1, "Focused element should exist");
                        assert.equal(parseInt(focusedElement.attr("data-offset-index"), 10), 12, "Focused element should be item 12");
                    });
                });
            });
        });
    });
});
