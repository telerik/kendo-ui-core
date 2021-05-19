(function() {
    var container,
        asyncDataSource,
        virtualSettings,
        VirtualList = kendo.ui.VirtualList,
        ITEM_HEIGHT = 40,
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

    describe("VirtualList API: ", function () {
        beforeEach(function() {
            container = $("<div id='container'></div>").appendTo(Mocha.fixture);

            asyncDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 300 });
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

            virtualSettings = {
                autoBind: false,
                dataSource: asyncDataSource,
                itemHeight: ITEM_HEIGHT,
                height: CONTAINER_HEIGHT,
                template: "#=text#",
                dataValueField: "value"
            };
        });

        afterEach(function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            Mocha.fixture.empty();
        });
    //events

    it("widget triggers selectedItemChange event when the selected item has changed (single selection)", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                var items = e.items;

                assert.equal(items.length, 1);
                assert.equal(items[0].index, 0);
                assert.equal(items[0].item, this.dataSource.view()[0]);
                done();
            });

            virtualList.dataSource.view()[0].set("text", "updated");
        });

        virtualList.dataSource.read();
    });

    it("widget does not trigger selectedItemChange event when updated item is not updated", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                assert.isOk(false);
            });

            virtualList.dataSource.view()[1].set("text", "updated");

            done();
        });

        virtualList.dataSource.read();
    });

    it("widget passes only the changed items in the selectedItemChange event (multiple selection)", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0, 1]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("selectedItemChange", function(e) {
                var items = e.items;

                assert.equal(items.length, 1);
                assert.equal(items[0].index, 1);
                assert.equal(items[0].item, this.dataSource.view()[1]);
            });

            virtualList.dataSource.view()[1].set("text", "updated");

            done();
        });

        virtualList.dataSource.read();
    });

    it("widget triggers change event if selected item is removed", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.one("listBound", function() {

            virtualList.one("change", function(e) {
                assert.equal(virtualList.value().length, 0);
                done();
            });

            virtualList.dataSource.remove(virtualList.dataSource.at(0));
        });

        virtualList.dataSource.read();
    });

    it("widget does not trigger change event if selected item is not removed", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0]
        }));

        virtualList.dataSource.read().done(function () {
            virtualList.one("change", function(e) {
                assert.isOk(false);
            });
            virtualList.dataSource.remove(virtualList.dataSource.at(1));
            done();
        });
    });

    it("fires the itemChange event", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            itemChange: function() {
                assert.isOk(true, "itemChange event is fired");
                this.unbind("itemChange");
                done();
            }
        }));
        asyncDataSource.read();
    });

    it("fires the listBound event", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listBound: function() {
                assert.isOk(true, "listBound event is fired");
                this.unbind("listBound");
                done();
            }
        }));
        asyncDataSource.read();
    });

    it("listBound event is fired after all values are prefetched", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(o) {
                o.success(256);
            },
            value: 256
        }));

        virtualList.one("listBound", function() {
            assert.equal(virtualList.value()[0], 256);
            assert.equal(virtualList.select()[0], 256);
            done();
        });

        asyncDataSource.read();
    });

    // fails because select(-1) resolves the promise
    /*
    it("listBound event is fired after all values are prefetched (multi selection)", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            value: [7, 256],
            listBound: function() {
                done();
                assert.equal(virtualList.value().length, 2);
                assert.equal(virtualList.select().length, 2);
                assert.equal(virtualList.selectedDataItems().length, 2);
            }
        }));
        asyncDataSource.read();
    });

    it("listBound event is fired when range is changed", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(o) {
                o.success(256);
            }
        }));

        asyncDataSource.read().then(function() {
            var page = asyncDataSource.page();

            virtualList.one("listBound", function() {
                done();
                assert.equal(virtualList.value()[0], 256);
                assert.equal(virtualList.select()[0], 256);

                assert.notEqual(asyncDataSource.page(), page);
            });

            virtualList.value(256);
        });
    });

    it("fires the activate event", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            activate: function() {
                done();
                assert.isOk(true, "activate event is fired");
                this.unbind("activate");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            virtualList.select(item);
        });
    });

    it("fires the deactivate event", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            deactivate: function() {
                done();
                assert.isOk(true, "deactivate event is fired");
                this.unbind("deactivate");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();

            virtualList.select(item);
            virtualList.select(item.next());
        });
    });

    it("fires the change event on select", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            change: function() {
                done();
                assert.isOk(true, "change event is fired");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(0);
        });
    });

    it("fires the change event when list is filtered", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(options) {
                options.success(options.value);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(0);

            virtualList.bind("change", function() {
                done();
                assert.isOk(true);
            });

            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            virtualList.select(0);
        });
    });

    it("select method deselects selected item and return correct dataitem", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([0, 1]);
            },
            value: [0, 1]
        }));

        asyncDataSource.read().done(function() {
            virtualList.bind("change", function(e) {
                done()

                var added = e.added;
                var removed = e.removed;

                assert.equal(added.length, 0);
                assert.equal(removed.length, 1);

                assert.equal(removed[0].position, 0);
                assert.equal(removed[0].dataItem.text, "Item 0");
            });

            virtualList.select(0);
        });
    });

    it("select method deselects selected item when filtered (multiple)", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([1, 2]);
            }
        }));

        virtualList.one("change", function() {
            virtualList.dataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });

            virtualList.dataSource.one("change", function() {
                virtualList.bind("change", function(e) {
                    done()

                    var added = e.added;
                    var removed = e.removed;

                    assert.equal(added.length, 0);
                    assert.equal(removed.length, 1);

                    assert.equal(removed[0].position, 1);
                    assert.equal(removed[0].dataItem.text, "Item 2");
                    assert.equal(virtualList.element.find(".k-state-selected").length, 0);
                });

                virtualList.select(0);
            });
        });

        virtualList.value([1, 2]);
        asyncDataSource.read()
    });

    it("fires the change event on deselect", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                done();
                assert.isOk(true, "change event is fired");
            })
            virtualList.select(-1);
        });
    });

    it("removes selected class when all items are de-selected", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function() {
                done();

                assert.equal(container.find(".k-state-selected").length, 0);
            })
            virtualList.select(-1);
        });
    });

    it("select method selects same index when filtered (multiple selection)", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(options) {
                options.success([1]);
            }
        }));

        asyncDataSource.read().done(function() {
            virtualList.select(0);

            virtualList.dataSource.one("change", function() {
                virtualList.bind("change", function(e) {
                    done();

                    var added = e.added;
                    var removed = e.removed;

                    assert.equal(added.length, 1);
                    assert.equal(removed.length, 0);
                });

                virtualList.select(0);
            });

            virtualList.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 10"
            });

        });
    });

    it("in the change event widget passes deselected index", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done();
                var removed = e.removed;

                assert.equal(removed.length, 1);
                assert.equal(removed[0].index, 0);
            });
            virtualList.select(-1);
        });
    });

    it("in the change event widget passes deselected indices when multiple selection is enabled", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [2, 7]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done();
                var removed = e.removed;

                assert.equal(removed.length, 2);
                assert.equal(removed[0].index, 2);
                assert.equal(removed[1].index, 7);
            });
            virtualList.select([2, 7]);
        });
    });

    it("in the change event widget passes the selected indicies", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done();
                var added = e.added;

                assert.equal(added.length, 2);
                assert.equal(added[0].index, 2);
                assert.equal(added[1].index, 7);
            });
            virtualList.select([2, 7]);
        });
    });

    it("widget passes deselected order index", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done();
                var removed = e.removed;
                assert.equal(removed[0].position, 0);
            });
            virtualList.select(-1);
        });
    });

    it("widget passes deselected order indices when multiple selection is enabled", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [1, 2, 8, 10]
        }));

        asyncDataSource.read().then(function() {
            virtualList.bind("change", function(e) {
                done();
                var removed = e.removed;

                assert.equal(removed.length, 2);
                assert.equal(removed[0].position, 0);
                assert.equal(removed[1].position, 2);
            });
            virtualList.select([1, 8]);
        });
    });

    it("fires the click event", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            click: function() {
                done();
                assert.isOk(true, "click event is fired");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            item.trigger("click");
        });
    });

    it("passes the item in click event handler", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            click: function(e) {
                done();
                assert.equal(e.item.text(), this.items().first().text());
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            item.trigger("click");
        });
    });

    it("click event is not triggered if item does not have data-uid", function(done) {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            click: function() {
                assert.isOk(false);
            }
        }));

        asyncDataSource.read().then(function() {
            scroll(virtualList.content, 5000);
            var item = virtualList.items().first();

            done();
            item.trigger("click");
        });
    });

/*
    it("click event fires after rapid scrolling forward and backwards of onloaded items", function(done) {

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        console.log("VirtualList rapid scrolling: transport success");
                        options.success({ data: generateData(options.data), total: 300 });
                    }, 400);
                }
            },
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            dataSource: dataSource,
            selectable: true,
            click: function() {
                assert.isOk(true);
            }
        }));

        var item;

        dataSource.read();

        virtualList.one("listBound", function() {
            virtualList.scrollTo(240 * 40); //scroll to the 260th item (should be loading...)
            setTimeout(function() {
                console.log("VirtualList rapid scrolling: scroll to loading records");
                virtualList.scrollTo(155 * 40); //scroll to the 155th item (should be loading...)
                setTimeout(function() {
                    console.log("VirtualList rapid scrolling: scroll up to loading records");
                    item = virtualList.items().filter("[data-offset-index=155]");
                    item.trigger("click"); //trigger the 'click' before item is loaded

                    virtualList.one("listBound", function() {
                        done();
                        console.log("VirtualList rapid scrolling: after transport success");
                        item.trigger("click"); //trigger the 'click' after item is loaded
                    });
                });
            }, 100);
        });
    });
*/

    });
}());
