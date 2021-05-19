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

    describe("VirtualList API: ", function() {
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

        //rendering

        it("screenHeight method gets the content height", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().done(function() {
                assert.equal(virtualList.screenHeight(), CONTAINER_HEIGHT);
                done();
            });
        });

        //skipping due to instability
        // it("scrollTo methods scrolls to a given height", function(asyncDone) {
        //     var virtualList = new VirtualList(container, virtualSettings);

        //     asyncDataSource.read().done(function() {
        //         virtualList.scrollTo(76 * 40); //scroll to the 76th item (76 * ITEMHEIGHT)
        //         assert.equal(virtualList.content[0].scrollTop, 76 * 40);

        //         virtualList.one("listBound", function () {
        //             var item76 = virtualList.items().filter(":contains('Item 76')");

        //             assert.isOk(item76.length, "Item 76 is rendered");
        //             assert.isOk(item76.css("transform").indexOf(76 * 40) > -1, "Item 76 is positioned at the correct place with translateY");
        //             asyncDone();
        //         });
        //     });
        // });

        // it("scrollToIndex methods scrolls to a given record by index", function(asyncDone) {
        //     var virtualList = new VirtualList(container, virtualSettings);

        //     asyncDataSource.read().done(function() {
        //         virtualList.scrollToIndex(76); //scroll to the 76th item
        //         assert.equal(virtualList.content[0].scrollTop, 76 * 40); //ITEMHEIGHT = 40

        //         virtualList.one("listBound", function () {
        //             var item76 = virtualList.items().filter(":contains('Item 76')");

        //             assert.isOk(item76.length, "Item 76 is rendered");
        //             assert.isOk(item76.css("transform").indexOf(76 * 40) > -1, "Item 76 is positioned at the correct place with translateY");
        //             asyncDone();
        //         });
        //     });
        // });

        it("scrollWith method scrolls content down", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {
                virtualList.scrollWith(200);
                assert.equal(virtualList.content[0].scrollTop, 200);
                done();
            });
        });

        it("scrollWith method scrolls content up", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {
                scroll(virtualList.content, 200);
                virtualList.scrollWith(-100);

                assert.equal(virtualList.content[0].scrollTop, 100);
                done();
            });
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

        it("widget does not trigger selectedItemChange event when updated item is not updated", function(done) {
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

        it("fires the listBound event after new dataItems are rendered", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings));
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.isOk(true, "ListBound is fired");
                    done();
                });
                scroll(virtualList.content, 16 * ITEM_HEIGHT);
            });
        });

        it("skip returns the start of the dataSource range", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings));
            asyncDataSource.read().then(function() {
                virtualList.one("listBound", function() {
                    assert.isOk(this.skip() !== this.dataSource.page(), "Skip is different from page");
                    assert.equal(this.skip(), 11);
                    done();
                });
                scroll(virtualList.content, 16 * ITEM_HEIGHT);
            });
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

        it("selectedDataItems method returns correct amount of items after scrolling down and up", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple"
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(virtualList.items().first()).done(function() {
                    assert.equal(virtualList.selectedDataItems().length, 1);
                    scroll(container, 4 * CONTAINER_HEIGHT);

                    setTimeout(function() {
                        virtualList.select(virtualList.items().last()).done(function() {
                            scroll(container, 0);

                            assert.equal(virtualList.selectedDataItems().length, 2);
                            done();
                        });
                    }, 300);
                });
            });
        });

        it("selectedDataItems method returns a new array copy", function() {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(123);
                    }, 0);
                }
            }));

            virtualList.value(123)

            var items = virtualList.selectedDataItems();

            assert.notEqual(items, virtualList.selectedDataItems());
        });

        it("focus method returns null if there is no focused item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                assert.equal(virtualList.focus(), null);
                done();
            });
        });

        it("focusNext method focuses first item if there is no currently focused item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.focusNext();
                assert.equal(virtualList.focusIndex(), 0);
                done();
            });
        });

        it("fcusPrev method focuses last item if there is no currently focused item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.focusPrev();
                assert.equal(virtualList.focusIndex(), virtualList.dataSource.total() - 1);
                done();
            });
        });

        it("focusIndex method returns focused index", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {

                virtualList.focus(0);
                assert.equal(virtualList.focusIndex(), 0);
                done();
            });
        });

        //skipping due to instability
        // it("focusIndex method returns focused index event if the item is not yet loaded", function(asyncDone) {
        //     var virtualList = new VirtualList(container, $.extend(virtualSettings, {
        //         selectable: true
        //     }));

        //     virtualList.one("listBound", function() {
        //         virtualList.one("listBound", function() {
        //             assert.equal(virtualList.focusIndex(), 100);
        //             asyncDone();
        //         });
        //     });

        //     asyncDataSource.read().then(function() {
        //         virtualList.select(100);
        //     });
        // });

        it("focusIndex method returns undefined if no item is selected", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true
            }));

            asyncDataSource.read().then(function() {
                virtualList.select(1).done(function() {
                    virtualList.select(-1).done(function() {
                        assert.isOk(!virtualList.focusIndex());
                        done();
                    });
                });
            });
        });

        it("setOptions changes the template", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {
                assert.equal(virtualList.items().first().text(), "Item 0");

                virtualList.setOptions({
                    template: "<span class='foo'>#:text#</span>"
                });

                assert.equal(virtualList.items().first().html(), '<span class="foo">Item 0</span>');
                done();
            });
        });

        it("setOptions turns on the selectable", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);
            virtualList.bind("click", function() {
                assert.isOk(true);
            });

            asyncDataSource.read().then(function() {
                virtualList.setOptions({ selectable: true });
                virtualList.items().first().trigger("click");
                done();
            });
        });

        it("setOptions turns off the selectable", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                click: function() {
                    assert.isOk(false);
                }
            }));

            asyncDataSource.read().then(function() {
                virtualList.setOptions({ selectable: false });
                virtualList.items().first().trigger("click");
                done();
            });
        });

        it("bound returns false if the list is not bound yet", function() {
            var virtualList = new VirtualList(container, virtualSettings);
            asyncDataSource.read();
            assert.isOk(!virtualList.bound());
        });

        it("bound returns true if the list is bound", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);
            asyncDataSource.read().then(function() {
                assert.isOk(virtualList.bound());
                done();
            });
        });

        it("bound sets the bound stat of the widget", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);
            asyncDataSource.read().then(function() {
                virtualList.bound(false);

                assert.isOk(!virtualList.bound());
                done();
            });
        });

        it("value method returns a new array copy", function() {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(123);
                    }, 0);
                }
            }));

            virtualList.value(123)

            var value = virtualList.value();

            assert.notEqual(value, virtualList.value());
        });

        it("value method prefetches values (single selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(123);
                    }, 0);
                },
                change: function() {
                    assert.equal(virtualList.selectedDataItems()[0].value, 123);
                    done();
                }
            }));

            virtualList.value(123)
            asyncDataSource.read();
        });

        it("value method prefetches values (multiple selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success([74, 123]);
                    }, 0);
                },
                change: function() {
                    assert.equal(virtualList.selectedDataItems()[0].value, 74);
                    assert.equal(virtualList.selectedDataItems()[1].value, 123);
                    done();
                }
            }));

            virtualList.value([74, 123]);
            asyncDataSource.read();
        });

        it("when empty array is passed to the value method all values are cleared", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function() {
                    assert.isOk(true, "change is fired");
                    assert.equal(this.value().length, 0);
                    assert.equal(this.selectedDataItems().length, 0);
                    done();
                });
                virtualList.value([]);
            });
        });

        it("when null is passed to the value method all values are cleared", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function() {
                    assert.isOk(true, "change is fired");
                    assert.equal(this.value().length, 0);
                    assert.equal(this.selectedDataItems().length, 0);
                    done();
                });
                virtualList.value(null);
            });
        });

        it("when empty array is passed to the value method removed items are available in the change event", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function(e) {
                    assert.equal(e.removed.length, 3);
                    done();
                });
                virtualList.value([]);
            });
        });

        it("when null is passed to the value method removed items are available in the change event", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function(e) {
                    assert.equal(e.removed.length, 3);
                    done();
                });
                virtualList.value(null);
            });
        });

        it("value method clears previous values and dataItems (single selection)", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: [1]
            }));

            virtualList.bind("listBound", function() {
                virtualList.bind("change", function() {
                    assert.equal(this.selectedDataItems().length, 1);
                    assert.equal(this.value().length, 1);
                    assert.equal(this.value()[0], 4);
                    done(); //select new values
                });
                virtualList.value([4]);
            });

            asyncDataSource.read();
        });

        it("value method clears previous values and dataItems (multiple)", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.bind("change", function() {
                    if (count === 1) { //first change de-selects all items
                        assert.equal(this.value().length, 0);
                        assert.equal(this.selectedDataItems().length, 0);
                        count += 1;
                    } else {
                        assert.equal(this.value().length, 2);
                        assert.equal(this.selectedDataItems().length, 2);
                        done(); //select new values
                    }
                });
                virtualList.value([4, 5]);
            });
        });

        it("value method clears previous values if value mapper returns an empty array", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success([]); //explicitly return empty array
                    }, 0);
                },
                value: [1000, 2000, 3000],
                listBound: function() {
                    assert.equal(virtualList.value().length, 0);
                    done();
                }
            }));

            asyncDataSource.read();
        });

        it("valueDeffered is resolved immediately if empty array is passed", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.value([]).done(function() {
                    assert.isOk(true, "done callback");
                    assert.equal(virtualList.value().length, 0);
                    done();
                })
            });
        });

        it("valueDeffered is resolved immediately if null is passed", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            asyncDataSource.read().then(function() {
                virtualList.value(null).done(function() {
                    assert.isOk(true, "done callback");
                    assert.equal(virtualList.value().length, 0);
                    done();
                })
            });
        });

        it("valueDeffered is resolved immediately if value mapper returns an empty array", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success([]);
                    }, 0);
                },
                selectable: true
            }));

            virtualList.value([""]).done(function() {
                assert.isOk(true);
                done();
            });

            asyncDataSource.read();
        });

        it("valueDeffered object is not resolved immediately after clearing the values (multiple selection)", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: [1, 2, 3]
            }));

            virtualList.value([4, 5]).done(function() {

                assert.equal(virtualList.select().length, 2);
                assert.equal(virtualList.select()[0], 4);
                assert.equal(virtualList.select()[1], 5);
                done();
            });

            asyncDataSource.read();
        });

        it("valueDeffered object is not resolved immediately after clearing the values (multiple selection + valueMapper)", function(done) {
            var count = 1;
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success([89, 91]);
                    }, 0);
                },
                value: [1, 2, 3]
            }));

            virtualList.value([89, 91]).done(function() {
                assert.equal(virtualList.select().length, 2);
                assert.equal(virtualList.select()[0], 89);
                assert.equal(virtualList.select()[1], 91);
                done();
            });

            asyncDataSource.read();
        });

        it("valueDeffered is resolved when same value is set multiple times", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "single",
                valueMapper: function(options) {
                    options.success([2]);
                }
            }));

            virtualList.value([2]);
            asyncDataSource.read().then(function() {
                virtualList.value([2]).then(function() {
                    assert.isOk(true, "promise is resolved");
                    done();
                });
            });
        });

        it("value method clears previous values and dataItems", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                value: [1]
            }));

            virtualList.bind("listBound", function() {
                virtualList.bind("change", function() {
                    assert.equal(this.value().length, 1);
                    assert.equal(this.value()[0], 2);

                    assert.equal(this.element.find(".k-state-selected").length, 1);
                    done();
                });
                virtualList.value([2]);
            });

            asyncDataSource.read();
        });

        it("value method return resolved promise", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(20);
                    }, 0);
                }
            }));

            asyncDataSource.read().done(function() {
                virtualList.value(20).done(function() {
                    assert.isOk(true);
                    done();
                });
            });
        });

        it("value method returns promise resolved after data prefetch", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(123);
                    }, 0);
                }
            }));

            virtualList.value(123).done(function() {
                var indices = virtualList.select();

                assert.equal(indices.length, 1);
                assert.equal(indices[0], 123);

                done();
            });

            asyncDataSource.read();
        });

        it("value method selects an item with empty string value", function(done) {

            var generateDataWithEmptyStringValue = function(parameters) {
                var items = [];
                for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                    items.push({
                        id: i,
                        value: (i === 0) ? "" : i,
                        text: "Item " + i
                    });
                }

                return items;
            }

            var emptyStringDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                dataSource: emptyStringDataSource
            }));

            virtualList.value("").done(function() {
                var indices = virtualList.select();

                assert.equal(indices.length, 1);
                assert.equal(indices[0], 0);

                done();
            });

            emptyStringDataSource.read();
        });

        it("value method selects an item with empty string value (valueMapper is invoked)", function(done) {

            var generateDataWithEmptyStringValue = function(parameters) {
                var items = [];
                for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                    items.push({
                        id: i,
                        value: (i === 123) ? "" : i,
                        text: "Item " + i
                    });
                }

                return items;
            }

            var emptyStringDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: true,
                dataSource: emptyStringDataSource,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success(123);
                    }, 0);
                }
            }));

            virtualList.value("").done(function() {
                var indices = virtualList.select();

                assert.equal(indices.length, 1);
                assert.equal(indices[0], 123);

                done();
            });

            emptyStringDataSource.read();
        });

        it("value method selects an item with empty string value (multiple selection + valueMapper)", function(done) {

            var generateDataWithEmptyStringValue = function(parameters) {
                var items = [];
                for (var i = parameters.skip, len = parameters.skip + parameters.take; i < len; i++) {
                    items.push({
                        id: i,
                        value: (i === 123) ? "" : i,
                        text: "Item " + i
                    });
                }

                return items;
            }

            emptyStringDataSource = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateDataWithEmptyStringValue(options.data), total: 300 });
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

            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                dataSource: emptyStringDataSource,
                valueMapper: function(operation) {
                    setTimeout(function() {
                        operation.success([89, 123]);
                    }, 0);
                }
            }));

            virtualList.value([89, ""]).done(function() {
                var indices = virtualList.select();

                assert.equal(indices.length, 2);
                assert.equal(indices[0], 89);
                assert.equal(indices[1], 123);
                done();
            });

            emptyStringDataSource.read();
        });

        it("widget does not trigger change when new item is added to the source", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: "1",
                valueMapper: function(operation) {
                    operation.success(1);
                }
            }));

            asyncDataSource.read();
            virtualList.one("listBound", function() {
                virtualList.bind("change", function() {
                    assert.isOk(false);
                });

                virtualList.dataSource.add("new item");

                done();
            });
        });

        it("widget does not trigger change when an item is removed from the source", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: "1",
                valueMapper: function(operation) {
                    operation.success(1);
                }
            }));

            asyncDataSource.read();

            virtualList.one("listBound", function() {
                virtualList.bind("change", function() {
                    assert.isOk(false);
                });

                virtualList.dataSource.remove(virtualList.dataSource.at(0));

                done();
            });
        });

        it("setDataSource method clears value before setting the new source", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: "1",
                valueMapper: function(operation) {
                    operation.success(1);
                }
            }));

            virtualList.one("listBound", function() {
                virtualList.bind("change", function() {
                    assert.equal(virtualList.value().length, 0);
                    done();
                });

                virtualList.setDataSource(["1", "2"]);
            });

            asyncDataSource.read();
        });

        it("setDataSource method sets value silently after source is changed", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: "1",
                valueMapper: function(operation) {
                    operation.success(1);
                }
            }));

            virtualList.one("listBound", function() {
                virtualList.bind("change", function() {
                    assert.isOk(true);
                });

                virtualList.setDataSource(["1", "2"]);

                assert.equal(virtualList.value().length, 1);
                assert.equal(virtualList.value()[0], "1");
                done();
            });

            asyncDataSource.read();
        });

        it("setDataSource method cleans the list when source is updated", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                value: "1",
                valueMapper: function(operation) {
                    operation.success(1);
                }
            }));

            virtualList.one("listBound", function() {
                virtualList.setDataSource({
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                options.success({ data: generateData(options.data), total: 300 });
                            }, 0);
                        }
                    },
                    serverPaging: true,
                    pageSize: 80,
                    schema: {
                        data: "data",
                        total: "total"
                    }
                });

                assert.isOk(!virtualList.bound());
                assert.isOk(!virtualList.element.html());
                done();
            });

            asyncDataSource.read();
        });

        it("removeAt method removes values at current position", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(operation) {
                    operation.success([123, 223]);
                },
                change: function() {
                    done();

                    virtualList.removeAt(0);

                    var value = virtualList.value();
                    var indices = virtualList.select();
                    var dataItems = virtualList.selectedDataItems();

                    assert.equal(value.length, 1);
                    assert.equal(indices.length, 1);
                    assert.equal(dataItems.length, 1);

                    assert.equal(value[0], 223);
                    assert.equal(indices[0], 223);
                    assert.equal(dataItems[0].value, 223);
                }
            }));

            virtualList.value([123, 223]);

            asyncDataSource.read()
        });

        it("removeAt method returns deleted data item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(operation) {
                    operation.success([123, 223]);
                },
                change: function() {

                    var removed = virtualList.removeAt(0);

                    assert.equal(removed.position, 0);
                    assert.equal(removed.dataItem.value, 123);
                    assert.isOk(!$.isArray(removed.dataItem));
                    done();
                }
            }));

            virtualList.value([123, 223]);

            asyncDataSource.read()
        });

        it("setValue method updates values of the widget silently", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {
                virtualList.setValue("item");

                var value = virtualList.value();
                var indices = virtualList.select();

                assert.equal(indices.length, 0);

                assert.equal(value.length, 1);
                assert.equal(value[0], "item");
                done();
            });
        });

        it("isFiltered method returns true if source is filtered", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {

                virtualList.dataSource.filter({
                    field: "value",
                    operator: "eq",
                    value: 2
                });

                assert.isOk(virtualList.isFiltered());
                done();
            });
        });

        it("isFiltered method returns true if source is bound with filtering", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            virtualList.one("listBound", function() {

                assert.isOk(virtualList.isFiltered());
                done();
            });

            asyncDataSource.filter({
                field: "value",
                operator: "eq",
                value: 2
            });
        });

        it("isFiltered method returns false if applied filter is removed", function(done) {
            var virtualList = new VirtualList(container, virtualSettings);

            asyncDataSource.read().then(function() {

                virtualList.dataSource.filter({
                    field: "value",
                    operator: "eq",
                    value: 2
                });

                asyncDataSource.one("change", function() {
                    virtualList.dataSource.filter({});

                    assert.isOk(!virtualList.isFiltered());
                    done();
                });
            });
        });

        it("select value when source and value are applied simultaneously", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                autoBind: true,
                selectable: true,
                dataSource: [],
                valueMapper: function(o) {
                    var value = o.value;

                    if (!value) {
                        value = [];
                    }

                    o.success(o.value);
                },
                value: "",
            }));

            asyncDataSource.one("change", function() {

                var value = virtualList.value();

                assert.equal(value[0], 250);
                done();
            });

            virtualList.setDataSource(asyncDataSource);
            virtualList.value(250);
        });

        it("fetch the correct data page when selecting a border index", function(done) {
            var value = 240;
            var requests = [];
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                requests.push(options.data);
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
                }),
                height: 500,
                itemHeight: 50,
                valueMapper: function(o) {
                    o.success(o.value);
                }
            }));

            virtualList.dataSource.read().then(function() {
                var check = function() {
                    if (!check) { return; }

                    assert.equal(requests.length, 2);
                    assert.equal(requests[1].page, 7); //[240, 280)
                    check = null;
                    done();
                };

                virtualList.dataSource.one("change", check);
                virtualList.value(value);
            });
        });

        it("dataItemByIndex method returns a dataItem from first range", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {
                            options.success({ data: generateData(options.data), total: 300 });
                        }
                    },
                    serverPaging: true,
                    pageSize: 40,
                    schema: {
                        data: "data",
                        total: "total"
                    }
                }),
                height: 500,
                itemHeight: 50,
                valueMapper: function(o) {
                    o.success(o.value);
                },
                value: 0
            }));

            virtualList.bind("listBound", function() {
                var dataItem = virtualList.dataItemByIndex(0);

                assert.isOk(dataItem);
                assert.equal(dataItem.id, 0);
                assert.equal(dataItem.value, 0);
                done();
            });

            virtualList.dataSource.read();
        });

        it("dataItemByIndex method returns a dataItem from a prefetched range", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {
                            options.success({ data: generateData(options.data), total: 300 });
                        }
                    },
                    serverPaging: true,
                    pageSize: 40,
                    schema: {
                        data: "data",
                        total: "total"
                    }
                }),
                height: 500,
                itemHeight: 50,
                valueMapper: function(o) {
                    o.success(o.value);
                },
                value: 210
            }));

            virtualList.one("listBound", function() {
                var dataItem = virtualList.dataItemByIndex(210);

                assert.isOk(dataItem);
                assert.equal(dataItem.id, 210);
                assert.equal(dataItem.value, 210);
                done();
            });

            virtualList.dataSource.read();
        });

        it("dataItemByIndex method returns null if data is not loaded", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {
                            options.success({ data: generateData(options.data), total: 300 });
                        }
                    },
                    serverPaging: true,
                    pageSize: 40,
                    schema: {
                        data: "data",
                        total: "total"
                    }
                }),
                height: 500,
                itemHeight: 50,
                valueMapper: function(o) {
                    o.success(o.value);
                }
            }));

            virtualList.one("listBound", function() {
                var dataItem = virtualList.dataItemByIndex(210);

                assert.equal(dataItem, null);
                done();
            });

            virtualList.dataSource.read();
        });

        it("getElementIndex method returns LI offset index", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                dataSource: new kendo.data.DataSource({
                    transport: {
                        read: function(options) {
                            options.success({ data: generateData(options.data), total: 300 });
                        }
                    },
                    serverPaging: true,
                    pageSize: 40,
                    schema: {
                        data: "data",
                        total: "total"
                    }
                }),
                height: 500,
                itemHeight: 50,
                valueMapper: function(o) {
                    o.success(o.value);
                }
            }));

            virtualList.bind("listBound", function() {
                var li = virtualList.element.children().eq(3);
                var index = virtualList.getElementIndex(li);
                assert.equal(index, 3);
                done();
            });

            virtualList.dataSource.read();
        });

        it("select method unselects prefetched item", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(o) {
                    o.success([256]);
                }
            }));

            virtualList.one("listBound", function() {

                virtualList.select([256]);

                assert.equal(virtualList.value().length, 0);
                assert.equal(virtualList.select().length, 0);
                done();
            });

            virtualList.select([256]);
        });

        it("select method notifies for removed after valueMapper is called", function(done) {
            var virtualList = new VirtualList(container, $.extend(virtualSettings, {
                selectable: "multiple",
                valueMapper: function(o) {
                    o.success([256]);
                },
                value: [256]
            }));

            virtualList.one("listBound", function() {
                virtualList.one("change", function(e) {
                    assert.equal(e.removed.length, 1);
                    assert.equal(e.removed[0].index, 256);
                    done();
                });

                virtualList.mapValueToIndex([256]);
            });

            virtualList.dataSource.read();
        });
    });
}());
