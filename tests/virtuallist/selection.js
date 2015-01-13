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
            dataValueField: "value"
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
            dataValueField: "value"
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
            dataValueField: "value"
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
            dataValueField: "value"
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
            value: values
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
            dataValueField: "value"
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
            dataValueField: "value"
        });

        virtualList.value([1, 5, 9]);

        setTimeout(function() {
            start();
            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        }, 100);
    });

})();
