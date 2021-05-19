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

    describe("VirtualList Aria: ", function () {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

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
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
    });

    //rendering

    it("elements received role='listbox' attribute", function() {
        assert.equal(virtualList.element.attr("role"), "listbox");
    });

    it("items receive role='option' attribute", function(done) {
        asyncDataSource.read().then(function() {
            assert.equal(virtualList.items().first().attr("role"), "option");
            done();
        });
    });

    it("optionLabel receive role='option' attribute", function(done) {
        asyncDataSource.read().then(function() {
            assert.equal(virtualList.items().first().attr("role"), "option");
            done();
        });
    });

    it("currently focused item receives ID attribute", function(done) {
        asyncDataSource.read().then(function() {
            virtualList.select(virtualList.items().eq(1)).done(function() {
                assert.equal(virtualList.focus().attr("id"), virtualList._optionID);
                done();
            });
        });
    });

    });
}());
