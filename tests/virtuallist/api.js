(function() {
    var container,
        asyncDataSource,
        virtualSettings,
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
                itemHeight: 40,
                template: "#=text#",
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

    asyncTest("scrollTo methods scrolls to a given height", 3, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            virtualList.scrollTo(76 * 40); //scroll to the 76th item (76 * ITEMHEIGHT)
            equal(virtualList.element[0].scrollTop, 76 * 40);

            setTimeout(function() {
                start();
                var item76 = virtualList.items().filter(":contains('Item 76')");

                ok(item76.length, "Item 76 is rendered");
                ok(item76.css("transform").indexOf(76*40) > -1, "Item 76 is positioned at the correct place with translateY");
            }, 300);
        });
    });

    asyncTest("scrollToIndex methods scrolls to a given record by index", 3, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            virtualList.scrollToIndex(76); //scroll to the 76th item
            equal(virtualList.element[0].scrollTop, 76 * 40); //ITEMHEIGHT = 40

            setTimeout(function() {
                start();
                var item76 = virtualList.items().filter(":contains('Item 76')");

                ok(item76.length, "Item 76 is rendered");
                ok(item76.css("transform").indexOf(76*40) > -1, "Item 76 is positioned at the correct place with translateY");
            }, 300);
        });
    });

    //events

    asyncTest("fires the itemChange event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            itemChange: function() {
                start();
                ok(true, "itemChange event is fired");
                this.unbind("itemChange");
            }
        }));
        asyncDataSource.read();   
    });

    asyncTest("fires the listBound event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            listBound: function() {
                start();
                ok(true, "listBound event is fired");
                this.unbind("listBound");
            }
        }));
        asyncDataSource.read();   
    });

    asyncTest("fires the activate event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            activate: function() {
                start();
                ok(true, "activate event is fired");
                this.unbind("activate");
            },
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();
            item.trigger("click");
        });
    });

    asyncTest("fires the deactivate event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            deactivate: function() {
                start();
                ok(true, "deactivate event is fired");
                this.unbind("deactivate");
            },
            selectable: true
        }));
        
        asyncDataSource.read().then(function() {
            var item = virtualList.items().first();

            item.trigger("click");
            item.next().trigger("click");
        });
    });

    //methods

    asyncTest("selectedDataItems method returns correct amount of items after scrolling down and up", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            virtualList.items().first().trigger("click");
            equal(virtualList.selectedDataItems().length, 1);
            scroll(container, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                virtualList.items().last().trigger("click");
                scroll(container, 0);

                start();
                equal(virtualList.selectedDataItems().length, 2);
            }, 300);
        });
    });

    asyncTest("data method returns current the optionLabel + dataSource.view", 4, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            optionLabel: {
                text: "option label",
                value: ""
            }
        }));

        asyncDataSource.read().then(function() {
            start();
            var data = virtualList.data();

            equal(data[0].text, "option label");
            equal(data[0].value, "");
            equal(data[1].text, "Item 0");
            equal(data[1].value, 0);
        });
    });

    //setOptions

    asyncTest("setOptions changes the template", 2, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            equal(virtualList.items().first().text(), "Item 0");

            virtualList.setOptions({
                template: "<span class='foo'>#:text#</span>"
            });
            equal(virtualList.items().first().find(".k-item").html(), '<span class="foo">Item 0</span>');
        });
    });

    asyncTest("setOptions turns on the selectable", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);

        asyncDataSource.read().then(function() {
            start();
            virtualList.setOptions({ selectable: true });
            virtualList.items().first().trigger("click");
            equal(virtualList.value()[0], 0);
        });
    });

    asyncTest("setOptions turns off the selectable", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.setOptions({ selectable: false });
            virtualList.items().first().trigger("click");
            equal(virtualList.value().length, 0);
        });
    });

    test("isBound returns false if the list is not bound yet", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read();
        ok(!virtualList.isBound());
    });

    asyncTest("isBound returns true if the list is bound", 1, function() {
        var virtualList = new VirtualList(container, virtualSettings);
        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.isBound());
        });
    });

    asyncTest("value method prefetches values (single selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success(123);
                }, 0);
            }
        }));

        virtualList.value(123).then(function() {
            start();
            equal(virtualList.selectedDataItems()[0].value, 123);
        });

        asyncDataSource.read();
    });

    asyncTest("value method prefetches values (multiple selection)", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: function(operation) {
                setTimeout(function() {
                    operation.success([74, 123]);
                }, 0);
            }
        }));

        virtualList.value([74, 123]).then(function() {
            start();
            equal(virtualList.selectedDataItems()[0].value, 74);
            equal(virtualList.selectedDataItems()[1].value, 123);
        });

        asyncDataSource.read();
    });

})();
