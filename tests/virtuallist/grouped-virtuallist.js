(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function groupedData(options) {
        var groupsDict = {};
        var groups = [];

        for (var i = options.skip, len = options.skip + options.take; i < len; i++) {
            var key = Math.floor(i / 30) * 30;
            var group;

            if (!groupsDict[key]) {
                groupsDict[key] = {
                    field: "number",
                    items: [],
                    hasSubgroups: false,
                    value: key + " - " + (key + 30)
                }

                groups.push(groupsDict[key]);
            }

            groupsDict[key].items.push({ text: " Item " + i, value: i });
        }

        return groups;
    }

    module("Grouped VirtualList: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 300 });
                        }, 0);
                    }
                },
                serverGrouping: true,
                serverPaging: true,
                pageSize: 40,
                group: { field: "text" },
                schema: {
                    groups: "groups",
                    total: "total"
                }
            });

            virtualSettings = {
                autoBind: false,
                height: CONTAINER_HEIGHT,
                dataSource: asyncDataSource,
                template: "#:text#",
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

    //rendering

    test("creates list header", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read();
        equal(virtualList.wrapper.find(".k-group-header").length, 1);
    });

    asyncTest("does not render item level group label for the first item (offset index 0)", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.items().first().find(".k-group").length, 0);
        });
    });

    //dataBinding

    asyncTest("detects that the dataSource is grouped", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.options.type, "group");
        });
    });

    asyncTest("fixed header displays current visible group", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal($(virtualList.header).text(), virtualList.dataSource.view()[0].value);
        });
    });

    //grouping
    
    //scrolling
    
    //utilities

    asyncTest("prefetches value in grouped dataSource", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 89,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([89]);
                }, 0);
            }
        }));

        asyncDataSource.read();
        virtualList.bind("change", function() {
            start();
            equal(virtualList.selectedDataItems()[0].value, 89);
        });
    });

    asyncTest("prefetches values in grouped dataSource (multiple selection)", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [88, 143],
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([88, 143]);
                }, 0);
            }
        }));

        asyncDataSource.read();
        virtualList.bind("change", function() {
            start();
            equal(virtualList.selectedDataItems()[0].value, 88);
            equal(virtualList.selectedDataItems()[1].value, 143);
        });
    });

    asyncTest("can select item when value resolves to an index equal to the length of the first group", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            height: 400,
            itemHeight: 20,
            selectable: "multiple",
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(30);
                }, 0);
            }
        }));

        asyncDataSource.pageSize(80);
        virtualList.value(30);
        asyncDataSource.read();
        virtualList.bind("listBound", function() {
            start();
            ok(this.selectedDataItems().length);
            equal(this.value()[0], 30);
        });
    });

})();
