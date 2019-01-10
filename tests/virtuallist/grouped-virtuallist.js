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

    describe("Grouped VirtualList: ", function () {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

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
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
    });

    //rendering

    it("creates list header", function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read();
        assert.equal(virtualList.wrapper.find(".k-group-header").length, 1);
    });

    it("does not render item level group label for the first item (offset index 0)", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.items().first().find(".k-group").length, 0);
            done();
        });
    });

    //dataBinding

    it("detects that the dataSource is grouped", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal(virtualList.options.type, "group");
            done();
        });
    });

    it("fixed header displays current visible group", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            assert.equal($(virtualList.header).text(), virtualList.dataSource.view()[0].value);
            done();
        });
    });

    //grouping

    //scrolling

    //utilities

    it("prefetches value in grouped dataSource", function(done) {
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
            assert.equal(virtualList.selectedDataItems()[0].value, 89);
            done();
        });
    });

    it("prefetches values in grouped dataSource (multiple selection)", function(done) {
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
            assert.equal(virtualList.selectedDataItems()[0].value, 88);
            assert.equal(virtualList.selectedDataItems()[1].value, 143);
            done();
        });
    });

    it("can select item when value resolves to an index equal to the length of the first group", function(done) {
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
        virtualList.bind("listBound", function() {
            assert.isOk(this.selectedDataItems().length);
            assert.equal(this.value()[0], 30);
            done();
        });
    });

    });
}());
