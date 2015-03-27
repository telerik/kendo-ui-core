(function() {
    var container,
        virtualList,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200,

        SELECTED = "k-state-selected";

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

    module("VirtualList Aria: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

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

            virtualList = new VirtualList(container, {
                autoBind: false,
                dataSource: asyncDataSource,
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                template: "#=text#",
                dataValueField: "value",
                selectable: true
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

    test("elements received role='listbox' attribute", 1, function() {
        equal(virtualList.element.attr("role"), "listbox");
    });

    asyncTest("items receive role='option' attribute", 1, function() {
        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.items().first().attr("role"), "option");
        });
    });

    asyncTest("optionLabel receive role='option' attribute", 1, function() {
        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.items().first().attr("role"), "option");
        });
    });

    asyncTest("currently focused item receives ID attribute", 1, function() {
        asyncDataSource.read().then(function() {
            start();
            virtualList.select(virtualList.items().eq(1));
            equal(virtualList.focus().attr("id"), virtualList._optionID);
        });
    });

})();
