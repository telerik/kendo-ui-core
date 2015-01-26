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
            items.push({
                id: i,
                value: i,
                text: "Item " + i
            });
        }
        
        return items;
    }

    module("VirtualList: ", {
        setup: function() {
            container = $("<div id='container' style='height: " + CONTAINER_HEIGHT + "px;'></div>").appendTo(QUnit.fixture);

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
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    //rendering

    asyncTest("click on listItem visually selects it", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");

            ok(element.hasClass(SELECTED));
        }, 100);
    });

    asyncTest("click on listItem visually selects it (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                elements[i].trigger("click");
                ok(elements[i].hasClass(SELECTED));
            }
        }, 100);
    });

    asyncTest("click on already selected listItem visually deselects it", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");
            ok(element.hasClass(SELECTED));

            element.trigger("click");
            ok(!element.hasClass(SELECTED));
        }, 100);
    });

    asyncTest("click on already selected listItems visually deselects it (multiple selection)", 4, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                elements[i].trigger("click");
                ok(elements[i].hasClass(SELECTED));
            }

            elements[2].trigger("click");
            ok(!elements[2].hasClass(SELECTED));
        }, 100);
    });

    asyncTest("click on listItem selects it as a value of the list", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");

            equal(virtualList.value()[0], 0);
        }, 100);
    });

    asyncTest("click on listItem selects it as a value of the list (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                elements[i].trigger("click");
            }

            equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 2, 7]));
        }, 100);
    });

    asyncTest("click on already selected listItem deselects it as a value of the list", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");
            equal(virtualList.value()[0], 0);

            element.trigger("click");
            equal(virtualList.value().length, 0);
        }, 100);
    });

    asyncTest("click on already selected listItem deselects it as a value of the list (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                elements[i].trigger("click");
            }

            elements[1].trigger("click");

            equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 7]));
        }, 100);
    });

    asyncTest("setting the initial value selects the item", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: 6
        });

        setTimeout(function() {
            start();

            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        }, 100);
    });

    asyncTest("setting the initial value selects the item (multiple selection)", 3, function() {
        var values = [1, 10, 6];
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: values,
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            for (var i = 0; i < values.length; i++) {
                ok(virtualList.items().eq(values[i]).hasClass(SELECTED), "Item " + i + " is selected");
            }
        }, 100);
    });

    asyncTest("setting the value with the value method updates the selection", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            virtualList.value(9);

            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        }, 100);
    });

    asyncTest("setting the value with the value method updates the selection (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            virtualList.value([1, 5, 6]);

            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        }, 100);
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        virtualList.value(3);

        setTimeout(function() {
            start();
            ok(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
        }, 100);
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created (multiple values)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        virtualList.value([1, 5, 9]);

        setTimeout(function() {
            start();
            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        }, 100);
    });

    asyncTest("selecting item triggers the change event", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            change: function() {
                ok(true, "change is triggered");
            }
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");
        }, 100);
    });

    asyncTest("de-selecting item triggers the change event", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: 0,
            change: function() {
                ok(true, "change is triggered");
            }
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");
        }, 100);
    });

    asyncTest("click on listItem selects it and saves the corresponding dataItem", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().first();
            element.trigger("click");

            equal(virtualList.selectedDataItems().length, 1, "One item is selected");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0], "First item is selected");
        }, 100);
    });

    asyncTest("click on listItem selects it and saves the corresponding dataItem (multiple items)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple"
        });

        setTimeout(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(0));
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));

            for (var i = 0; i < elements.length; i++) {
                elements[i].trigger("click");
                equal(virtualList.selectedDataItems()[i], asyncDataSource.data()[i]);
            }
        }, 100);
    });

    asyncTest("saves the dataItems that correspond to the initially set values", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: [0, 1]
        });

        setTimeout(function() {
            start();

            equal(virtualList.selectedDataItems().length, 2);
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
            equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
        }, 100);
    });

    asyncTest("click on already selected listItem removes it from stored dataItems", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: "multiple",
            value: [0, 7]
        });

        setTimeout(function() {
            start();

            var element = virtualList.items().eq(0);
            element.trigger("click");

            equal(virtualList.selectedDataItems().length, 1, "First item is removed");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            virtualList.value([0,1]);

            equal(virtualList.selectedDataItems().length, 2);
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
            equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            virtualList.value([0,1]);

            equal(virtualList.selectedDataItems().length, 2);
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
            equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
        }, 100);
    });

    asyncTest("changing the value through the value method updates dataItems collection (initially set values)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: [7]
        });

        setTimeout(function() {
            start();

            virtualList.value([0,1]);

            equal(virtualList.selectedDataItems().length, 2);
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
            equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
        }, 100);
    });

    asyncTest("not available dataItems are given as null in dataItems collection", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            start();

            virtualList.value([7, 256]);

            equal(virtualList.selectedDataItems().length, 2);
            ok(virtualList.selectedDataItems()[0] != null);
            ok(virtualList.selectedDataItems()[1] == null);
        }, 100);
    });

    asyncTest("not available dataItems are given as null in dataItems collection (initially set items)", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            value: [7, 256]
        });

        setTimeout(function() {
            start();

            equal(virtualList.selectedDataItems().length, 2);
            ok(virtualList.selectedDataItems()[0] != null);
            ok(virtualList.selectedDataItems()[1] == null);
        }, 100);
    });

    asyncTest("selection is persisted accross ranges", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        var element;

        setTimeout(function() {
            element = virtualList.items().first();
            element.trigger("click");
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
            template: "#=text#",
            dataValueField: "value",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            element1.trigger("click");
            element2.trigger("click");

            equal(virtualList.items().filter("." + SELECTED).length, 1);
        }, 100);
    });

    asyncTest("previously selected value is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            element1.trigger("click");
            element2.trigger("click");

            equal(virtualList.value().length, 1);
            equal(virtualList.value()[0], 2);
        }, 100);
    });

    asyncTest("previously selected dataItem is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: true
        });

        setTimeout(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            element1.trigger("click");
            element2.trigger("click");

            equal(virtualList.selectedDataItems().length, 1);
            equal(virtualList.selectedDataItems()[0].value, 2);
        }, 100);
    });

})();
