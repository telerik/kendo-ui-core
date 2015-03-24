(function() {
    var container,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-state-selected";

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push("Item " + i);
        }

        return items;
    }

    module("VirtualList Primitive Data: ", {
        setup: function() {
            container = $("<div id='container' style='height: " + CONTAINER_HEIGHT + "px;'></div>").appendTo(QUnit.fixture);

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
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    //selection

    asyncTest("selecting listItem selects it as a value of the list", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            virtualList.select(element);

            equal(virtualList.value()[0], "Item 0");
        }, 100);
    });

    asyncTest("selecting listItem selects it as a value of the list (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
            }

            equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 2", "Item 7"]));
        }, 100);
    });

    asyncTest("selecting already selected listItem does not deselect it as a value of the list", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            virtualList.select(element);
            equal(virtualList.value()[0], "Item 0");

            virtualList.select(element);
            equal(virtualList.value()[0], "Item 0");
        }, 100);
    });

    asyncTest("selecting already selected listItem deselects it as a value of the list (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
            }

            virtualList.select(elements[1]);

            equal(kendo.stringify(virtualList.value()), kendo.stringify(["Item 1", "Item 7"]));
        }, 100);
    });

    asyncTest("setting the initial value selects the item", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            value: "Item 6",
            selectable: true
        });

        setTimeout(function() {
            start();

            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        }, 100);
    });

    asyncTest("setting the initial value selects the item (multiple selection)", 3, function() {
        var values = ["Item 1", "Item 10", "Item 6"];
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            value: values,
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(10).hasClass(SELECTED), "Item 10 is selected");
            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        }, 100);
    });

    asyncTest("setting the value with the value method updates the selection", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();

            virtualList.value("Item 9");

            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        }, 100);
    });

    asyncTest("setting the value with the value method updates the selection (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            virtualList.value(["Item 1", "Item 5", "Item 6"]);

            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        }, 100);
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        virtualList.value("Item 3");

        setTimeout(function() {
            start();
            ok(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
        }, 100);
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created (multiple values)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        virtualList.value(["Item 1", "Item 5", "Item 9"]);

        setTimeout(function() {
            start();
            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        }, 100);
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            virtualList.select(element);

            equal(virtualList.selectedDataItems().length, 1, "One item is selected");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0], "First item is selected");
        }, 100);
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem (multiple items)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(0));
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
                equal(virtualList.selectedDataItems()[i], asyncDataSource.data()[i]);
            }
        }, 100);
    });

    asyncTest("saves the dataItems that correspond to the initially set values", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            value: ["Item 0", "Item 1"],
            selectable: "multiple",
            change: function() {
                start();

                equal(virtualList.selectedDataItems().length, 2);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
            }
        });
    });

    asyncTest("selecting already selected listItem removes it from stored dataItems", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple",
            value: ["Item 0", "Item 7"]
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().eq(0);
            virtualList.select(element);

            equal(virtualList.selectedDataItems().length, 1, "First item is removed");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();

            virtualList.bind("change", function() {
                equal(virtualList.selectedDataItems().length, 1);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
            });
            virtualList.value("Item 0");
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection (multiple)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            virtualList.bind("change", function() {
                equal(virtualList.selectedDataItems().length, 2);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
            });
            virtualList.value(["Item 0", "Item 1"]);
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection (initially set values)", 3, function() {
        var count = 1;
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            value: ["Item 7"],
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            virtualList.bind("change", function() {
                if (count !== 1) {
                    equal(virtualList.selectedDataItems().length, 2);
                    equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                }

                count += 1; //first change is triggered because of dataitems removal
            });
            virtualList.value(["Item 0", "Item 1"]);
        }, 100);
    });

    asyncTest("not available dataItems are retrieved by the value method", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            }
        });

        asyncDataSource.one("change", function() {
            virtualList.bind("change", function() {
                start();
                equal(virtualList.selectedDataItems().length, 2);
                ok(virtualList.selectedDataItems()[0] === "Item 7");
                ok(virtualList.selectedDataItems()[1] === "Item 256");
            });
            virtualList.value(["Item 7", "Item 256"]);
        });
    });

    asyncTest("not available dataItems are given as null in dataItems collection (initially set items)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            value: ["Item 7", "Item 256"],
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            selectable: "multiple",
            change: function() {
                start();

                equal(virtualList.selectedDataItems().length, 2);
                ok(virtualList.selectedDataItems()[0] === "Item 7");
                ok(virtualList.selectedDataItems()[1] === "Item 256");
            }
        });
    });

    asyncTest("selection is persisted accross ranges", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            itemHeight: 40,
            template: "#=data#",
            selectable: true
        });

        var element;

        setTimeout(function() {
            element = virtualList.items().first();
            virtualList.select(element);
            ok(element.hasClass(SELECTED));
            scroll(container, 4 * CONTAINER_HEIGHT);
            setTimeout(function() {
                start();
                scroll(container, 0);

                ok(element.hasClass(SELECTED), "First item is not selected");
            }, 300);
        }, 100);
    });

    asyncTest("previously selected item is de-selected (single selection)", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.items().filter("." + SELECTED).length, 1);
        }, 100);
    });

    asyncTest("previously selected value is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.value().length, 1);
            equal(virtualList.value()[0], "Item 2");
        }, 100);
    });

    asyncTest("previously selected dataItem is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.selectedDataItems().length, 1);
            equal(virtualList.selectedDataItems()[0], "Item 2");
        }, 100);
    });

    asyncTest("select method selects the element", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element = virtualList.items().eq(1);
            virtualList.select(element);

            ok(element.hasClass(SELECTED));
            equal(virtualList.value()[0], "Item 1");
            equal(virtualList.selectedDataItems()[0], "Item 1");
        }, 100);
    });

    asyncTest("select method changes the value", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=data#",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.select(element2);

            equal(virtualList.value().length, 1);
            equal(virtualList.value()[0], "Item 2");
        }, 100);
    });

})();
