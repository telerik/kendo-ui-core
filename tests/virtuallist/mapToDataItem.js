(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
        CONTAINER_HEIGHT = 200;

    function scroll(element, height) {
        element.scrollTop(height);
        element.trigger("scroll");
    }

    function generateData(parameters) {
        var items = [];
        for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
            items.push({
                value: i,
                text: " Item " + i
            });
        }

        return items;
    }

    var Async = kendo.Class.extend({
        init: function() {
            this.promises = [];
        },

        exec: function(callback) {
            var promise = $.Deferred();

            promise.done(callback);

            this.promises.push(promise);
        },

        resolve: function(idx) {
            var promise = this.promises[idx];

            if (!promise) {
                throw new Error("There is no promise to resolve!");
            }

            promise.resolve();
        },

        allDone: function(callback) {
            $.when.apply(null, this.promises).done(callback);
        }
    });

    describe("VirtualList without valueMapper: ", function () {
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
                pageSize: 20,
                schema: {
                    data: "data",
                    total: "total"
                }
            });

            virtualSettings = {
                autoBind: false,
                dataSource: asyncDataSource,
                itemHeight: ITEM_HEIGHT,
                height: CONTAINER_HEIGHT,
                template: "#:text#",
                dataValueField: "value",
                selectable: true,
                mapValueTo: "dataItem",
                valueMapper: function(o) {
                    var result = [];

                    if (o.value.length) {
                        o.value.forEach(function(value){
                            result.push({
                                value: value,
                                text: "Item " + value
                            });
                        });
                        o.success(result);
                    } else if (o.value) {
                        o.success({
                            value: o.value,
                            text: "Item " + o.value
                        });
                    }
                }
            };
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
        });

    function createAsyncDataSource(options) {
        return new kendo.data.DataSource($.extend({
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
        }, options));
    }

    it("value is set", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                assert.equal(virtualList.value(), 37);
                done();
            });
        });
    });

    it("selectedDataItems are set", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                assert.isOk(virtualList.selectedDataItems().length);
                assert.equal(virtualList.selectedDataItems()[0].value, 37);
                done();
            });
        });
    });

    it("selectedIndexes array is filled with undefined values", function(done) {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value(37).done(function() {
                assert.equal(virtualList.select().length, 1);
                assert.equal(virtualList.select()[0], undefined);
                done();
            });
        });
    });

    //skipping due to instability
    // it("deselects an already resolved dataItem (multiple selection)", function(asyncDone) {
    //     $.extend(virtualSettings, {
    //         selectable: "multiple"
    //     });

    //     var virtualList = new VirtualList(container, virtualSettings);

    //     asyncDataSource.read().done(function() {
    //         virtualList.value([15, 25]).done(function() {
    //             virtualList.bind("change", function() {
    //                 assert.equal(this.selectedDataItems().length, 1);
    //                 assert.equal(this.selectedDataItems()[0].value, 15);
    //                 assert.equal(this.select().length, 1);
    //                 assert.equal(this.select()[0], 15);
    //                 asyncDone();
    //             });

    //             virtualList.scrollToIndex(25);
    //             virtualList.one("listBound", function () {
    //                 this.select(25);
    //             });
    //         });
    //     });
    // });

    it("selecting addiotional items does not remove current (multiple selection)", function(done) {
        $.extend(virtualSettings, {
            selectable: "multiple"
        });

        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().done(function() {
            virtualList.value([15, 25]).done(function() {
                virtualList.bind("change", function() {
                    assert.equal(this.selectedDataItems().length, 3);
                    assert.equal(this.selectedDataItems()[2].value, 3);
                    assert.equal(this.select().length, 3);
                    assert.equal(this.select()[2], 3);
                    done();
                });
                virtualList.select(3);
            });
        });
    });

    //skipping due to instability
    // it("deselects all previously selected items when selection changes (single selection)", function(asyncDone) {
    //     var virtualList = new VirtualList(container, virtualSettings);

    //     asyncDataSource.read().done(function() {
    //         virtualList.value(25).done(function() {
    //             virtualList.bind("change", function() {
    //                 assert.equal(this.selectedDataItems().length, 1);
    //                 assert.equal(this.select().length, 1);
    //                 assert.equal(this.items().filter(".k-state-selected").length, 1, "Only one item is visibly selected");
    //                 asyncDone();
    //             });

    //             virtualList.scrollToIndex(25);

    //             virtualList.one("listBound", function () {
    //                 this.select(26);
    //             });
    //         });
    //     });
    // });

    it("deselects previously selected item that is not part of the current page", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 99
        }));

        asyncDataSource.read().done(function() {
            virtualList.bind("change", function() {
                assert.equal(this.selectedDataItems().length, 1);
                assert.equal(this.select().length, 1);
                assert.equal(this.items().filter(".k-state-selected").length, 1, "Only one item is visibly selected");
                done();
            });

            virtualList.select(1);
        });
    });

    });
}());
