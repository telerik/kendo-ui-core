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

    module("VirtualList API: ", {
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

    asyncTest("scrollTo methods scrolls to a given height", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            virtualList.scrollTo(76 * 40); //scroll to the 76th item (76 * ITEMHEIGHT)
            equal(virtualList.element[0].scrollTop, 76 * 40);

            setTimeout(function() {
                start();
                var item76 = virtualList.items().filter(":contains('Item 76')");

                ok(item76.length, "Item 76 is rendered");
                ok(item76.css("transform").indexOf(76*40) > -1, "Item 76 is positioned at the correct place with translateY");
            }, 300);
        }, 100);
    });

    asyncTest("scrollToIndex methods scrolls to a given record by index", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value"
        });

        setTimeout(function() {
            virtualList.scrollToIndex(76); //scroll to the 76th item
            equal(virtualList.element[0].scrollTop, 76 * 40); //ITEMHEIGHT = 40

            setTimeout(function() {
                start();
                var item76 = virtualList.items().filter(":contains('Item 76')");

                ok(item76.length, "Item 76 is rendered");
                ok(item76.css("transform").indexOf(76*40) > -1, "Item 76 is positioned at the correct place with translateY");
            }, 300);
        }, 100);
    });

    //events

    asyncTest("fires the dataBound event", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            dataBound: function() {
                start();
                ok(true, "dataBound event is fired");
            },
            template: "#=text#",
            dataValueField: "value"
        });
    });

})();
