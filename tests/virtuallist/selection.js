(function() {
    var container,
        asyncDataSource,
        VirtualList = kendo.ui.VirtualList,
        virtualSettings = {},
        ITEM_HEIGHT = 20,
        CONTAINER_HEIGHT = 200,

        FOCUSED = "k-state-focused",
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

    function valueMapper(o) {
        setTimeout(function() {
            o.success(o.value);
        }, 0);
    }

    module("VirtualList Selection: ", {
        setup: function() {
            container = $("<div id='container'></div>").appendTo(QUnit.fixture);

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
                height: CONTAINER_HEIGHT,
                itemHeight: ITEM_HEIGHT,
                template: "#=text#",
                dataValueField: "value"
            }
        },

        teardown: function() {
            if (container.data("kendoVirtualList")) {
                container.data("kendoVirtualList").destroy();
            }

            QUnit.fixture.empty();
        }
    });

    //VirtualList prefetch, single selection
    asyncTest("does not call prefetch for already available data", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([0]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 0);
        });
    });

    asyncTest("calls prefetch for not available data", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([90]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 1);
        });
    });

    asyncTest("calls prefetch with the correct skip, take", 2, function() {
        var args;
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([123]); //expected range 120 - 160

            args = asyncDataSource.args("_multiplePrefetch");
            equal(args[0], 120); //skip
            equal(args[1], 40); //take
        });
    });

    asyncTest("resolves the promise when data is prefetched", 2, function() {
        var deferred;
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, {
            _multiplePrefetch: asyncDataSource._multiplePrefetch
        });

        asyncDataSource.read().then(function() {
            deferred = virtualList.prefetch([90]);
            deferred.done(function() {
                start();
                ok(true, "promise is resolved");
                equal(asyncDataSource._ranges.length, 2);
            });
        });
    });

    asyncTest("calls prefetch only once per range", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([90]);
            virtualList.prefetch([91]);
            virtualList.prefetch([92]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 1);
        });
    });

    //VirtualList prefetch, multiple selection
    asyncTest("does not call prefetch for already available data (multi selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([0, 4, 7]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 0);
        });
    });

    asyncTest("calls prefetch for not available data (multi selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([90, 167]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 2);
        });
    });

    asyncTest("resolves the promise when data is prefetched (multi selection)", 2, function() {
        var deferred;
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, {
            _multiplePrefetch: asyncDataSource._multiplePrefetch
        });

        asyncDataSource.read().then(function() {
            deferred = virtualList.prefetch([90]);
            deferred.done(function() {
                start();
                ok(true, "promise is resolved");
                equal(asyncDataSource._ranges.length, 2);
            });
        });
    });

    asyncTest("calls prefetch only once per range (multi selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        stub(asyncDataSource, "_multiplePrefetch");

        asyncDataSource.read().then(function() {
            start();
            virtualList.prefetch([40, 82, 100]);
            virtualList.prefetch([101]);
            equal(asyncDataSource.calls("_multiplePrefetch"), 2);
        });
    });

    //rendering

    asyncTest("selecting listItem visually selects it", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().first();
            virtualList.select(element);
            ok(element.hasClass(SELECTED));
        });
    });

    asyncTest("selecting listItem visually selects it (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
                ok(elements[i].hasClass(SELECTED));
            }
        });
    });

    asyncTest("selecting already selected listItem does not visually deselect it", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();

            var element = virtualList.items().first();
            virtualList.select(element);
            ok(element.hasClass(SELECTED));

            virtualList.select(element);
            ok(element.hasClass(SELECTED));
        });
    });

    asyncTest("selecting already selected listItems visually deselects it (multiple selection)", 4, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
                ok(elements[i].hasClass(SELECTED));
            }

            virtualList.select(elements[2]);
            ok(!elements[2].hasClass(SELECTED));
        });
    });

    asyncTest("select method updates the value of the list", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            change: function() {
                start();
                equal(virtualList.value()[0], 0);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(virtualList.items().first());
        });
    });

    asyncTest("select method updates the value of the list (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
            }

            start();
            equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 2, 7]));
        });
    });

    asyncTest("selecting already selected listItem does not deselect it", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(virtualList.items().first());
            virtualList.select(virtualList.items().first());
            equal(virtualList.value()[0], 0);
        });
    });

    asyncTest("selecting already selected listItem deselects it (multiple selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));
            elements.push(virtualList.items().eq(7));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
            }

            virtualList.select(elements[1]);
            equal(kendo.stringify(virtualList.value()), kendo.stringify([1, 7]));
        });
    });

    asyncTest("setting the initial value selects the item", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 6,
            valueMapper: valueMapper
        }));

        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
        });
    });

    asyncTest("setting the initial value selects the item (multiple selection)", 3, function() {
        var values = [1, 10, 6];

        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: values,
            valueMapper: valueMapper
        }));

        asyncDataSource.read().then(function() {
            start();

            for (var i = 0; i < values.length; i++) {
                ok(virtualList.items().eq(values[i]).hasClass(SELECTED), "Item " + i + " is selected");
            }
        });
    });

    asyncTest("setting the value with the value method updates the selection", 1, function() {
        var values = [1, 10, 6];
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: values,
            valueMapper: valueMapper
        }));
        asyncDataSource.read().then(function() {
            start();
            virtualList.value(9);
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        });
    });

    asyncTest("setting the value with the value method updates the selection (multiple selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper,
            change: function() {
                ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
                ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
                ok(virtualList.items().eq(6).hasClass(SELECTED), "Item 6 is selected");
            }
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.value([1, 5, 6]);
        });
    });

    asyncTest("setting the value with the value method clears the selection in valueMapper returns null", 1, function() {
        var values = [1, 10, 6];
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: values,
            valueMapper: valueMapper
        }));
        asyncDataSource.read().then(function() {
            start();
            virtualList.value(9);
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        });
    });

    asyncTest("selection is cleared if non existing value is set through the API and the valueMapper returns no indexes", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 1,
            selectable: true,
            valueMapper: function(operation) {
                operation.success([]);
            }
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.bind("change", function(e) {
                debugger;
                ok(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
            });
            virtualList.value("");
        });
    });

    asyncTest("selection is cleared if non existing value is set through the API and the valueMapper returns -1", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: 1,
            selectable: true,
            valueMapper: function(operation) {
                operation.success(-1);
            }
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.bind("change", function(e) {
                debugger;
                ok(!virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is not selected any more");
            });
            virtualList.value("");
        });
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: valueMapper
        }));

        virtualList.value(3);

        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.items().eq(3).hasClass(SELECTED), "Item 3 is selected");
        });
    });

    asyncTest("value method works if called before the dataSource is fetched and list is created (multiple values)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper
        }));

        virtualList.value([1, 5, 9]);

        asyncDataSource.read().then(function() {
            start();
            ok(virtualList.items().eq(1).hasClass(SELECTED), "Item 1 is selected");
            ok(virtualList.items().eq(5).hasClass(SELECTED), "Item 5 is selected");
            ok(virtualList.items().eq(9).hasClass(SELECTED), "Item 9 is selected");
        });
    });

    asyncTest("selecting item triggers the change event", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            change: function() {
                ok(true, "change is triggered");
            }
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(virtualList.items().first());
        });
    });

    asyncTest("selecting already selected item does not trigger the change event", 0, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 0
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.one("change", function() {
                ok(true, "change is triggered");
            });
            virtualList.select(0);
        });
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();

            var element = virtualList.items().first();
            virtualList.select(element);

            equal(virtualList.selectedDataItems().length, 1, "One item is selected");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0], "First item is selected");
        });
    });

    asyncTest("selecting listItem selects it and saves the corresponding dataItem (multiple items)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();

            var elements = [];
            elements.push(virtualList.items().eq(0));
            elements.push(virtualList.items().eq(1));
            elements.push(virtualList.items().eq(2));

            for (var i = 0; i < elements.length; i++) {
                virtualList.select(elements[i]);
                equal(virtualList.selectedDataItems()[i], asyncDataSource.data()[i]);
            }
        });
    });

    asyncTest("saves the dataItems that correspond to the initially set values", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [0, 1],
            valueMapper: valueMapper,
            selectable: "multiple",
            change: function() {
                start();
                equal(virtualList.selectedDataItems().length, 2);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("selecting already selected listItem removes it from stored dataItems", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [0, 7]
        }));

        asyncDataSource.read().then(function() {
            start();

            var element = virtualList.items().eq(0);
            virtualList.select(element);

            equal(virtualList.selectedDataItems().length, 1, "First item is removed");
            equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[7], "Second item is saved");
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            valueMapper: valueMapper,
            change: function() {
                start();
                equal(virtualList.selectedDataItems().length, 1);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[1]);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([1]);
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection (multi selection)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: valueMapper,
            change: function() {
                start();
                equal(virtualList.selectedDataItems().length, 2);
                equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([0,1]);
        });
    });

    asyncTest("changing the value through the value method updates dataItems collection (initially set values)", 3, function() {
        var count = 1;
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            value: [7],
            valueMapper: valueMapper,
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();

            virtualList.bind("change", function() {
                if (count > 1) { //skip first change when value is cleared
                    equal(virtualList.selectedDataItems().length, 2);
                    equal(virtualList.selectedDataItems()[0], asyncDataSource.data()[0]);
                    equal(virtualList.selectedDataItems()[1], asyncDataSource.data()[1]);
                }
                count += 1;
            });
            virtualList.value([0,1]);
        });
    });

    asyncTest("not available dataItems set as values are prefetched", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            change: function() {
                start();
                equal(virtualList.selectedDataItems().length, 2);
                ok(virtualList.selectedDataItems()[0].value === 7);
                ok(virtualList.selectedDataItems()[1].value === 256);
            }
        }));

        asyncDataSource.read().then(function() {
            virtualList.value([7, 256]);
        });
    });

    asyncTest("not available dataItems set as values are prefetched (initially set items)", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple",
            value: [7, 256],
            valueMapper: function(o) {
                o.success([7, 256]);
            },
            change: function() {
                start();
                equal(virtualList.selectedDataItems().length, 2);
                ok(virtualList.selectedDataItems()[0].value === 7);
                ok(virtualList.selectedDataItems()[1].value === 256);
            }
        }));

        asyncDataSource.read();
    });

    asyncTest("selection is persisted accross ranges", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            itemHeight: 40
        }));

        var element;

        asyncDataSource.read().then(function() {
            element = virtualList.items().first();
            virtualList.select(element);
            ok(element.hasClass(SELECTED));
            scroll(container, 4 * CONTAINER_HEIGHT);
            setTimeout(function() {
                start();
                scroll(container, 0);

                ok(element.hasClass(SELECTED), "First item is not selected");
            }, 300);
        });
    });

    asyncTest("previously selected item is de-selected (single selection)", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.items().filter("." + SELECTED).length, 1);
        });
    });

    asyncTest("previously selected value is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.value().length, 1);
            equal(virtualList.value()[0], 2);
        });
    });

    asyncTest("previously selected dataItem is removed (single selection)", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            var element2 = virtualList.items().eq(2);
            virtualList.select(element1);
            virtualList.select(element2);

            equal(virtualList.selectedDataItems().length, 1);
            equal(virtualList.selectedDataItems()[0].value, 2);
        });
    });

    // select method

    asyncTest("select method focuses the element", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().eq(1);
            virtualList.select(element);

            ok(element.hasClass(FOCUSED));
        });
    });

    asyncTest("select method selects the element", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().eq(1);
            virtualList.select(element);

            ok(element.hasClass(SELECTED));
            equal(virtualList.value()[0], 1);
            equal(virtualList.selectedDataItems()[0].value, 1);
        });
    });

    asyncTest("select method changes the focused element", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.select(element2);

            ok(!element1.hasClass(FOCUSED));
            ok(element2.hasClass(FOCUSED));
        });
    });

    asyncTest("select method changes the value", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.select(element2);

            equal(virtualList.value().length, 1);
            equal(virtualList.value()[0], 2);
        });
    });

    asyncTest("select method accepts predicate function", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(function(dataItem) {
                return dataItem.value === 2;
            });

            var element = virtualList.items().eq(2);
            ok(element.hasClass(FOCUSED));
            ok(element.hasClass(SELECTED));
            equal(virtualList.value()[0], 2);
        });
    });

    /*// Temporary remove this tests, optionLabel will not be supported in Q1 2015
    asyncTest("select method focuses the optionLabel", 1, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: true,
            optionLabel: {
                value: "",
                text: "Option Label"
            }
        });

        setTimeout(function() {
            start();
            virtualList.select(-1);

            var optionLabel = virtualList.optionLabel;

            ok(optionLabel.hasClass(FOCUSED));
        }, 100);
    });

    asyncTest("select method selects the optionLabel", 3, function() {
        var virtualList = new VirtualList(container, {
            dataSource: asyncDataSource,
            template: "#=text#",
            dataValueField: "value",
            selectable: true,
            optionLabel: {
                value: "",
                text: "Option Label"
            }
        });

        setTimeout(function() {
            start();
            virtualList.select(-1);

            var optionLabel = virtualList.optionLabel;

            ok(optionLabel.hasClass(FOCUSED));
            ok(optionLabel.hasClass(SELECTED));
            equal()
        }, 100);
    });
    */

    asyncTest("select method returns currently selected index", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(3);
            equal(virtualList.select(), 3);
        });
    });

    asyncTest("select method deletes selected value when -1 is passed", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true,
            value: 6
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(-1);
            equal(virtualList.value().length, 0);
        });
    });

    asyncTest("select method sets selected values when multiple elements are selected", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(1);
            virtualList.select(0);

            equal(virtualList.value().length, 2);
            equal(virtualList.value()[0], 1);
            equal(virtualList.value()[1], 0);
        });
    });

    asyncTest("select method removes values on deselect", function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: "multiple"
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(0);
            virtualList.select(1);

            virtualList.select(0);
            virtualList.select(1);

            equal(virtualList.value().length, 0);
        });
    });

    // select method

    asyncTest("focus method adds focused class to the element", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element = virtualList.items().eq(1);
            virtualList.focus(element);

            ok(element.hasClass(FOCUSED));
        });
    });

    asyncTest("focus method changes the focused element", 2, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.focus(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.focus(element2);

            ok(!element1.hasClass(FOCUSED));
            ok(element2.hasClass(FOCUSED));
        });
    });

    asyncTest("focus method does not change the selection", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.focus(element2);

            ok(!element1.hasClass(FOCUSED));
            ok(element1.hasClass(SELECTED));
            ok(element2.hasClass(FOCUSED));
        });
    });

    asyncTest("focus method accepts predicate function", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.focus(function(dataItem) {
                return dataItem.value === 1;
            });

            var element = virtualList.items().eq(1);
            ok(element.hasClass(FOCUSED));
        });
    });

    asyncTest("next method focuses the next item", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(1);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(2);
            virtualList.focusNext();

            ok(!element1.hasClass(FOCUSED));
            ok(element1.hasClass(SELECTED));
            ok(element2.hasClass(FOCUSED));
        });
    });

    asyncTest("prev method focuses the prev item", 3, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            var element1 = virtualList.items().eq(2);
            virtualList.select(element1);

            var element2 = virtualList.items().eq(1);
            virtualList.focusPrev();

            ok(!element1.hasClass(FOCUSED));
            ok(element1.hasClass(SELECTED));
            ok(element2.hasClass(FOCUSED));
        });
    });

    asyncTest("focus method scrolls to the focused item in case the List is in hidden container", 1, function() {
        var virtualList = new VirtualList(container, $.extend(virtualSettings, {
            selectable: true
        }));

        asyncDataSource.read().then(function() {
            start();
            virtualList.select(0);

            virtualList.wrapper.hide();

            virtualList.select(9);
            virtualList.select(10);
            virtualList.select(11);
            virtualList.select(12);

            virtualList.wrapper.show();
            virtualList.focus(12);
            equal(virtualList.content.scrollTop(), 12 * ITEM_HEIGHT);
        });
    });

    asyncTest("next method does not focus next item if it is not loaded", 1, function() {
        var asyncDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 300 });
                    }, 100);
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
            dataSource: asyncDataSource
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(39);

            setTimeout(function() {
                start();

                var current = virtualList.focus();
                virtualList.focusNext();

                equal(virtualList.focus()[0], current[0], "incorrect item is focused");
            });
        });
    });

    asyncTest("prev method does not focus prev item if it is not loaded", 1, function() {
        var asyncDataSource = new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        options.success({ data: generateData(options.data), total: 300 });
                    }, 100);
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
            dataSource: asyncDataSource
        }));

        asyncDataSource.read().then(function() {
            virtualList.select(201);

            setTimeout(function() {
                start();

                var current = virtualList.focus();
                virtualList.focusPrev();

                equal(virtualList.focus()[0], current[0], "incorrect item is focused");
            }, 150);
        });
    });
})();
