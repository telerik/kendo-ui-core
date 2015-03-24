(function() {
    var container,
        template,
        viewModel,
        asyncDataSource,
        virtualList,
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

    module("VirtualList MVVM: ", {
        setup: function() {
            container = $("<div id='container' data-role='virtuallist' data-bind='source: asyncDataSource' data-template='tmp' data-value-field='value' data-item-height='20' data-height='200'></div>")
                .appendTo(QUnit.fixture);

            template = $("<script id='tmp' type='text/x-kendo-template'>" +
                            "<div data-bind='text: text'></div>" +
                         "</script>")
                .appendTo(QUnit.fixture);

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

            viewModel = kendo.observable({
                asyncDataSource: asyncDataSource
            });

            kendo.bind(QUnit.fixture, viewModel);
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    //rendering

    test("widget is initialized via data attributes", 1, function() {
        virtualList = container.getKendoVirtualList();
        ok(virtualList, "widget is initialized");
    });

    asyncTest("dataSource is set", 1, function() {
        virtualList = $("#container").getKendoVirtualList();
        setTimeout(function() {
            start();
            ok(virtualList.dataSource.data().length > 0);
        }, 100);
    });

    asyncTest("items are rendered", 2, function() {
        virtualList = container.getKendoVirtualList();
        setTimeout(function() {
            start();
            equal(virtualList.items().eq(0).text(), "Item 0");
            equal(virtualList.items().last().text(), "Item 39");
        }, 100);
    });

    asyncTest("items are rebound after re-rendering (list scroll)", 2, function() {
        virtualList = container.getKendoVirtualList();
        setTimeout(function() {
            scroll(virtualList.content, 620);
            setTimeout(function() {
                start();
                equal(virtualList.items().eq(0).text(), "Item 11");
                equal(virtualList.items().last().text(), "Item 50");
            }, 300)
        }, 100);
    });

})();
