(function() {
    var container,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
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

            groupsDict[key].items.push({ text: " Item " + i });
        }

        return groups;
    }

    module("Grouped VirtualList: ", {
        setup: function() {
            container = $("<div id='container' style='height: " + CONTAINER_HEIGHT + "px;'></div>").appendTo(QUnit.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 100 });
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
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource
        });

        equal(virtualList.wrapper.find(".k-virtual-header").length, 1);
    });

    //dataBinding

    asyncTest("detects that the dataSource is grouped", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource
        });

        setTimeout(function() {
            start();
            equal(virtualList.options.type, "group");
        }, 100);
    });

    asyncTest("fixed header displays current visible group", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource
        });
        
        setTimeout(function() {
            start();
            equal($(virtualList.header).text(), virtualList.dataSource.view()[0].value);
        }, 100);
    });

    //asyncTest("switches the range when threshold is passed", 2, function() {
    //    var virtualList = new VirtualList(container, {
    //        dataSource: asyncDataSource,
    //        listScreens: 4,
    //        itemHeight: 20,
    //        threshold: 1
    //    });


    //    setTimeout(function() {
    //        start();
    //        scroll(container, 630);
    //        equal(asyncDataSource._ranges.length, 2);
    //        equal(asyncDataSource._ranges[1].start, 40);
    //    }, 150);
    //});

    //templates
    
    //test("uses group template to render group items", 2, function() {
    //    var virtualList = new VirtualList(container, {
    //        dataSource: dataSource,
    //        groupTemplate: "<span class='foo'>#:group#</span>"
    //    });

    //    var firstVisibleItem = $(virtualList.items()[0]);

    //    equal(firstVisibleItem.find(".foo").length, 1);
    //    equal(firstVisibleItem.find(".foo").text(), "0 - 30");
    //});

    //grouping
    


    //scrolling
    
    //utilities

})();
