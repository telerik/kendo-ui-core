import '@progress/kendo-ui/src/kendo.virtuallist.js';
import { asyncTest } from '../../helpers/async-utils.js';

let container,
    asyncDataSource,
    virtualSettings,
    VirtualList = kendo.ui.VirtualList,
    CONTAINER_HEIGHT = 200,

    SELECTED = "k-selected";

function scroll(element, height) {
    element.scrollTop(height);
    element.trigger("scroll");
}

function generateData(parameters) {
    let items = [];
    for (let i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
        items.push("Item " + i);
    }

    return items;
}

describe("VirtualList Primitive Data: ", function() {
    beforeEach(function() {
        container = $("<ul id='container'></ul>").appendTo(Mocha.fixture);

        asyncDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 400 });
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
            template: (data) => data
        };
    });

    afterEach(function() {
        if (container.data("kendoVirtualList")) {
            container.data("kendoVirtualList").destroy();
        }

        virtualSettings = null;

        Mocha.fixture.empty();
    });

    //selection
    function selectAll(virtual, elements, done) {
        let item = elements.shift();

        if (!item) {
            done(() => {
            });
            return;
        }

        virtual.select(item).done(function() {
            selectAll(virtual, elements, done);
        });
    }

    asyncTest("selecting listItem selects it as a value of the list", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();

            virtualList.select(element).done(function() {
                done(() => {
                    assert.equal(virtualList.value()[0], "Item 0");
                });
            });
        });
    });

    asyncTest("selecting listItem selects it as a value of the list (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];

            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            let virtualDone = function() {
                done(() => {
                    assert.equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 2", "Item 7"]));
                });
            };

            selectAll(virtualList, elements, virtualDone);
        });
    });

    asyncTest("selecting already selected listItem does not deselect it as a value of the list", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            let element = virtualList.items().first();

            virtualList.select(element).done(function() {
                assert.equal(virtualList.value()[0], "Item 0");

                virtualList.select(element).done(function() {
                    done(() => {
                        assert.equal(virtualList.value()[0], "Item 0");
                    });
                });
            });
        });
    });

    asyncTest("selecting already selected listItem deselects it as a value of the list (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            let elements = [];
            let item2 = virtualList.items().eq(2);

            elements.push(virtualList.items().eq(1));
            elements.push(item2);
            elements.push(virtualList.items().eq(7));

            let virtualDone = function() {
                virtualList.select(item2).done(function() {
                    done(() => {
                        assert.equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 7"]));
                    });
                });
            };

            selectAll(virtualList, elements, virtualDone);
        });
    });

    asyncTest("setting the initial value selects the item", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: "Item 6"
        }));

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                });
            }, 0);
        });
    });

    asyncTest("setting the initial value selects the item (multiple selection)", function(done) {
        let values = ["Item 1", "Item 10", "Item 6"];
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: values
        }));

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(10).hasClass(SELECTED), "Item 10 is selected");
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                });
            });
        });
    });

    asyncTest("setting the value with the value method updates the selection", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.value("Item 9").done(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
                });
            });
        });
    });

    asyncTest("setting the value with the value method updates the selection (multiple selection)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.value(["Item 1", "Item 5", "Item 6"]).done(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                    assert.isOk(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
                });
            });
        });
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        virtualList.value("Item 3");

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
                });
            });
        });
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created (multiple values)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        virtualList.value(["Item 1", "Item 5", "Item 9"]);

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                done(() => {
                    assert.isOk(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                    assert.isOk(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                    assert.isOk(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
                });
            });
        });
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

    // TODO: un-skip after release
    it.skip("saves the dataItems that correspond to the initially set values", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: ["Item 0", "Item 1"],
            selectable: "multiple",
            change: function() {
                setTimeout(function() {
                    done(() => {
                        assert.equal(virtualList.selectedDataItems().length, 2);
                        assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                        assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                    });
                });
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("selecting already selected listItem removes it from stored dataItems", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: ["Item 0", "Item 7"]
        }));

        asyncDataSource.read().then(function() {
            setTimeout(function() {
                let element = virtualList.items().eq(0);

                virtualList.select(element).done(function() {
                    done(() => {
                        assert.equal(virtualList.selectedDataItems().length, 1, "First item is removed");
                        assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
                    });
                });
            });
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {

            virtualList.bind("change", function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                });
            });
            virtualList.value("Item 0");
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection (multiple)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                });
            });
            virtualList.value(["Item 0", "Item 1"]);
        });
    });

    // TODO: un-skip after release
    it.skip("changing the value through the value method updates dataItems collection (initially set values)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: ["Item 7"],
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.value(["Item 0", "Item 1"]).then(function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    assert.equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                });
            });
        });
    });

    asyncTest("not available dataItems are retrieved by the value method", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            }
        }));

        asyncDataSource.read().done(function() {
            virtualList.bind("change", function() {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0] === "Item 7");
                    assert.isOk(virtualList.selectedDataItems()[1] === "Item 256");
                });
            });
            virtualList.value(["Item 7", "Item 256"]);
        });
    });

    asyncTest("not available dataItems are given as null in dataItems collection (initially set items)", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: ["Item 7", "Item 256"],
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            selectable: "multiple",
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success({ data: generateData(options.data), total: 400 });
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }
        }));

        virtualList.bind("change", function(e) {
            if (e.added && e.added.length) {
                done(() => {
                    assert.equal(virtualList.selectedDataItems().length, 2);
                    assert.isOk(virtualList.selectedDataItems()[0] === "Item 7");
                    assert.isOk(virtualList.selectedDataItems()[1] === "Item 256");
                });
            }
        });

        virtualList.dataSource.read();

    });

    asyncTest("selection is persisted accross ranges", function(done) {
        let virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
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
            let element1 = virtualList.items().eq(1);
            let element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2).done(function() {
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
                    assert.equal(virtualList.value()[0], "Item 2");
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
                    assert.equal(virtualList.value()[0], "Item 1");
                    assert.equal(virtualList.selectedDataItems()[0], "Item 1");
                });
            });
        });
    });

});
