(function() {
    var container,
        dataSource,
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

    module("VirtualList: ", {
        setup: function() {
            container = $("<div id='container' style='height: " + CONTAINER_HEIGHT + "px;'></div>").appendTo(QUnit.fixture);

            dataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 100 });
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

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 100 });
                        }, 50);
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

    test("creates list wrapper", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });

        equal(virtualList.element.find(".k-wrapper").length, 1);
    });

    test("creates list header", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });

        equal(virtualList.element.find(".k-header").length, 1);
    });

    test("creates height container", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });
        
        equal(virtualList.element.find(".k-height-container").length, 1);
    });

    test("sets the height of the heightContainer", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });
        
        equal(virtualList.element.find(".k-height-container").height(), 4000); //dataSource.total() * itemHeight
    });

    test("initially builds the listScreens", 1, function() {
        var virtualList = new VirtualList(container, {
            listScreens: 6,
            itemHeight: 20,
            dataSource: dataSource
        });

        items = virtualList.element.find(".k-wrapper").children();

        equal(items.length, (CONTAINER_HEIGHT/20)*6);
    });

    //dataBinding

    test("reads the dataSource (autoBind: true by default)", 1, function() {
        dataSource.one("change", function() {
            ok(true);
        });

        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });
    });

    test("does not read the dataSource if autoBind: false", 0, function() {
        dataSource.one("change", function() {
            ok(false);
        });

        var virtualList = new VirtualList(container, {
            dataSource: dataSource,
            autoBind: false
        });
    });

    asyncTest("fixed header displays current visible group", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });
        
        setTimeout(function() {
            start();
            equal($(virtualList.header).text(), virtualList.dataSource.view()[0].value);
        }, 100);
    });

    asyncTest("switches the range when threshold is passed", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource,
            listScreens: 4,
            itemHeight: 20,
            threshold: 1
        });

        container.scrollTop(610);
        container.trigger("scroll");

        setTimeout(function() {
            start();
            equal(dataSource._ranges.length, 2);
            equal(dataSource._ranges[1].start, 40);
        }, 100);
    });

    //templates
    
    test("initializes the default templates", function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });

        ok(virtualList.templates);

        for (key in virtualList.templates) {
            equal(typeof virtualList.templates[key], "function");
        }
    });

    test("uses the item template to render items", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource,
            template: "<span class='foo'>#:text#</span>"
        });

        var firstVisibleItem = $(virtualList.items()[0]);

        equal(firstVisibleItem.find(".foo").length, 1);
        equal(firstVisibleItem.find(".foo").text(), " Item 0");
    });

    test("accepts function as item template", 2, function() {
        var myTemplate = function(data) {
            return "<span class='foo'>" + data.text + "</span>";
        };

        var virtualList = new VirtualList(container, {
            dataSource: dataSource,
            template: myTemplate
        });

        var firstVisibleItem = $(virtualList.items()[0]);

        equal(firstVisibleItem.find(".foo").length, 1);
        equal(firstVisibleItem.find(".foo").text(), " Item 0");
    });

    test("displays loading animation until the dataSource's data is fetched", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource
        });

        ok(virtualList.element.find(".k-loading-mask").length);
    });

    //asyncTest("displays placeholder template when list is scrolled to a not available range", 1, function() {
    //    var virtualList = new VirtualList(container, {
    //        dataSource: asyncDataSource,
    //        placeholderTemplate: "<span class='foo'>foo...</span>",
    //        itemHeight: 20
    //    });

    //    setTimeout(function() {
    //        start();
    //        container.scrollTop(660);
    //        equal(container.find(".k-wrapper").children().first().html(), "<span class='foo'>foo...</span>");
    //    }, 100)
    //});

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

    test("calculates the item count", 1, function() {
        var virtualList = new VirtualList(container, {
            listScreens: 6,
            itemHeight: 20,
            dataSource: dataSource
        });
        
        equal(virtualList.itemCount, 60);
    });

    test("gets the container height", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });

        equal(virtualList.screenHeight, 200);
    });

    test("calculates buffer sizes in pixels", 2, function() {
        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });

        var bufferSizes = virtualList._bufferSizes();

        equal(bufferSizes.down, 200, "down");
        equal(bufferSizes.up, 400, "up");
    });

    //misc

    test("does not create elements with height larger than 250000px", 4, function() {
        //testing with 100011 items
        dataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 100011 });
                }
            },
            serverGrouping: true,
            serverPaging: true,
            pageSize: 10,
            group: { field: "text" },
            schema: {
                groups: "groups",
                total: "total"
            }
        });

        var virtualList = new VirtualList(container, {
            dataSource: dataSource
        });
        
        //height is dataSource.total() * itemHeight
        equal(virtualList.element.find(".k-height-container").height(), 100011 * 40);

        heightPadChildren = virtualList.element.find(".k-height-container").children();

        //heightPad container is expanded by elements with max height of 250000
        //dataSource.total() * itemHeight / MaxHeightElement + 1 ("1" is added because the total height is not devided by 250000)
        equal(heightPadChildren.length, Math.floor(100011 * 40 / 250000) + 1);

        equal(heightPadChildren.first().height(), 250000);
        equal(heightPadChildren.last().height(), 40 * 11);
    });

})();
