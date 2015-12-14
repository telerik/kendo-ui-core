(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-state-selected";

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                id: i,
                value: i,
                text: "Item " + i
            });
        }

        return items;
    }

    module("VirtualList API: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

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
                template: "#=text#",
                dataValueField: "value"
            };
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });
    //events

    asyncTest("widget triggers selectedItemChange event when the selected item has changed (single selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                start();
                var items = e.items;

                equal(items.length, 1);
                equal(items[0].index, 0);
                equal(items[0].item, this.dataSource.view()[0]);
            });

            virtualList.dataSource.view()[0].set("text", "updated");
        });

        virtualList.dataSource.read();
    });

    test("widget does not trigger selectedItemChange event when updated item is not updated", 0, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                ok(false);
            });

            virtualList.dataSource.view()[1].set("text", "updated");

            start();
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget passes only the changed items in the selectedItemChange event (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0, 1]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                var items = e.items;

                equal(items.length, 1);
                equal(items[0].index, 1);
                equal(items[0].item, this.dataSource.view()[1]);
            });

            virtualList.dataSource.view()[1].set("text", "updated");

            start();
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget triggers change event if selected item is removed", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("change", function(e) {
                start();
                equal(virtualList.value().length, 0);
            });

            virtualList.dataSource.remove(virtualList.dataSource.at(0));
        });

        virtualList.dataSource.read();
    });

    asyncTest("widget does not trigger change event if selected item is not removed", 0, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("change", function(e) {
                ok(false);
            });

            virtualList.dataSource.remove(virtualList.dataSource.at(1));

            setTimeout(function() {
                start();
            });
        });

        virtualList.dataSource.read();
    });

    asyncTest("fires the itemChange event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            itemChange: function() {
                start();
                ok(true, "itemChange event is fired");
                this.unbind("itemChange");
            }
        }));
        asyncDataSource.read();
    });

    asyncTest("fires the listBound event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listBound: function() {
                start();
                ok(true, "listBound event is fired");
                this.unbind("listBound");
            }
        }));
        asyncDataSource.read();
    });

    asyncTest("listBound event is fired after all values are prefetched", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(o) {
                o.success(256);
            },
            value: 256
        }));

        virtualList.one("listBound", function() {
            start();
            equal(virtualList.value()[0], 256);
            equal(virtualList.select()[0], 256);
        });

        asyncDataSource.read();
    });

    // fails because select(-1) resolves the promise
    /*
    asyncTest("listBound event is fired after all values are prefetched (multi selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            value: [7, 256],
            listBound: function() {
                start();
                equal(virtualList.value().length, 2);
                equal(virtualList.select().length, 2);
                equal(virtualList.selectedDataItems().length, 2);
            }
        }));
        asyncDataSource.read();
    });

    asyncTest("listBound event is fired when range is changed", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(o) {
                o.success(256);
            }
        }));

        asyncDataSource.read().then(function() {
            var page = asyncDataSource.page();

            virtualList.one("listBound", function() {
                start();
                equal(virtualList.value()[0], 256);
                equal(virtualList.select()[0], 256);

                notEqual(asyncDataSource.page(), page);
            });

            virtualList.value(256);
        });
    });

    asyncTest("fires the activate event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            activate: function() {
                start();
                ok(true, "activate event is fired");
                this.unbind("activate");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            virtualList.select(item);
        });
    });

    asyncTest("fires the deactivate event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            deactivate: function() {
                start();
                ok(true, "deactivate event is fired");
                this.unbind("deactivate");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();

            virtualList.select(item);
            virtualList.select(item.next());
        });
    });

    asyncTest("fires the change event on select", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            change: function() {
                start();
                ok(true, "change event is fired");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(0);
        });
    });

    asyncTest("fires the change event when list is filtered", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(options) {
                options.success(options.value);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(0);

            virtualList.bind("change", function() {
                start();
                ok(true);
            });

            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            virtualList.select(0);
        });
    });

    asyncTest("select method deselects selected item and return correct dataitem", 4, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([0, 1]);
            },
            value: [0, 1]
        }));

        asyncDataSource.read().done(function() {
            virtualList.bind("change", function(e) {
                start()

                var added = e.added;
                var removed = e.removed;

                equal(added.length, 0);
                equal(removed.length, 1);

                equal(removed[0].position, 0);
                equal(removed[0].dataItem.text, "Item 0");
            });

            virtualList.select(0);
        });
    });

    asyncTest("select method deselects selected item when filtered (multiple)", 5, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([1, 2]);
            }
        }));

        virtualList.one("change", function() {
            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            virtualList.dataSource.one("change", function() {
                virtualList.bind("change", function(e) {
                    start()

                    var added = e.added;
                    var removed = e.removed;

                    equal(added.length, 0);
                    equal(removed.length, 1);

                    equal(removed[0].position, 1);
                    equal(removed[0].dataItem.text, "Item 2");
                    equal(virtualList.element.find(".k-state-selected").length, 0);
                });

                virtualList.select(0);
            });
        });

        virtualList.value([1, 2]);
        asyncDataSource.read()
    });

    asyncTest("fires the change event on deselect", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                start();
                ok(true, "change event is fired");
            })
            virtualList.select(-1);
        });
    });

    asyncTest("removes selected class when all items are de-selected", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                start();

                equal(container.find(".k-state-selected").length, 0);
            })
            virtualList.select(-1);
        });
    });

    asyncTest("select method selects same index when filtered (multiple selection)", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([1]);
            }
        }));

        asyncDataSource.read().done(function() {
            virtualList.select(0);

            virtualList.dataSource.one("change", function() {
                virtualList.bind("change", function(e) {
                    start();

                    var added = e.added;
                    var removed = e.removed;

                    equal(added.length, 1);
                    equal(removed.length, 0);
                });

                virtualList.select(0);
            });

            virtualList.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 10"
            });

        });
    });

    asyncTest("in the change event widget passes deselected index", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                start();
                var removed = e.removed;

                equal(removed.length, 1);
                equal(removed[0].index, 0);
            });
            virtualList.select(-1);
        });
    });

    asyncTest("in the change event widget passes deselected indices when multiple selection is enabled", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [2, 7]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                start();
                var removed = e.removed;

                equal(removed.length, 2);
                equal(removed[0].index, 2);
                equal(removed[1].index, 7);
            });
            virtualList.select([2, 7]);
        });
    });

    asyncTest("in the change event widget passes the selected indicies", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                start();
                var added = e.added;

                equal(added.length, 2);
                equal(added[0].index, 2);
                equal(added[1].index, 7);
            });
            virtualList.select([2, 7]);
        });
    });

    asyncTest("widget passes deselected order index", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                start();
                var removed = e.removed;
                equal(removed[0].position, 0);
            });
            virtualList.select(-1);
        });
    });

    asyncTest("widget passes deselected order indices when multiple selection is enabled", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 8, 10]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                start();
                var removed = e.removed;

                equal(removed.length, 2);
                equal(removed[0].position, 0);
                equal(removed[1].position, 2);
            });
            virtualList.select([1, 8]);
        });
    });

    asyncTest("fires the click event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            click: function() {
                start();
                ok(true, "click event is fired");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            item.trigger("click");
        });
    });

    asyncTest("passes the item in click event handler", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            click: function(e) {
                start();
                equal(e.item.text(), this.items().first().text());
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            item.trigger("click");
        });
    });

    asyncTest("click event is not triggered if item does not have data-uid", 0, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            click: function() {
                ok(false);
            }
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 5000);
            var item = virtualList.items().first();

            start();
            item.trigger("click");
        });
    });

/*
    asyncTest("click event fires after rapid scrolling forward and backwards of onloaded items", 1, function() {

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        console.log("VirtualList rapid scrolling: transport success");
                        options.success({ data: generateData(options.data), total: 300 });
                    }, 400);
                }
            },
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: dataSource,
            selectable: true,
            click: function() {
                ok(true);
            }
        }));

        var item;

        dataSource.read();

        virtualList.one("listBound", function() {
            virtualList.scrollTo(240 * 40); //scroll to the 260th item (should be loading...)
            setTimeout(function() {
                console.log("VirtualList rapid scrolling: scroll to loading records");
                virtualList.scrollTo(155 * 40); //scroll to the 155th item (should be loading...)
                setTimeout(function() {
                    console.log("VirtualList rapid scrolling: scroll up to loading records");
                    item = virtualList.items().filter("[data-offset-index=155]");
                    item.trigger("click"); //trigger the 'click' before item is loaded

                    virtualList.one("listBound", function() {
                        start();
                        console.log("VirtualList rapid scrolling: after transport success");
                        item.trigger("click"); //trigger the 'click' after item is loaded
                    });
                });
            }, 100);
        });
    });
*/

})();
