(function() {
    var ComboBox = kendo.ui.ComboBox,
        select;

    var CONTAINER_HEIGHT = 200;

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

    function createAsyncDataSource() {
        return new kendo.data.DataSource({
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
    }

    module("kendo.ui.ComboBox Virtualization", {
        setup: function() {
            kendo.ns = "";
            select = $("<select />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (select.data("kendoComboBox")) {
                select.data("kendoComboBox").destroy();
            }
        }
    });

    asyncTest("ComboBox does not revert scroll position on dataBound", 1, function() {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            scroll(combobox.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                start();

                notEqual(combobox.listView.content.scrollTop(), 0);
            }, 100);

        });

        combobox.value("0");
    });

    asyncTest("widget dropdown is opened after filtering", 1, function() {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.search("Item");
            combobox.select(0);
            combobox.close();
            combobox.open();

            setTimeout(function() {
                start();
                ok(combobox.list.is(":visible"));
            }, 100);
        });
    });

    asyncTest("after filtering widget's list selects item that was selected from filtered data set and is part of the first DataSource page ", 2, function() {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.search("0");
            combobox.select(0);

            ok(combobox.listView.items().eq(0).hasClass("k-state-selected"));

            combobox.close();
            combobox.open();

            setTimeout(function() {
                start();
                ok(combobox.listView.items().eq(0).hasClass("k-state-selected"));
            }, 100);
        });
    });

    asyncTest("Widget's list selects item from filtered data set after filter is cleared", 4, function() {
        var combobox = new ComboBox(select, {
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: {
                    read: function(options) {
                        if (options.data.filter) {
                            setTimeout(function() {
                                options.success({
                                    data: [
                                        { id: 1, value: 1, text: "Item " + 1 },
                                        { id: 11, value: 11, text: "Item " + 11 },
                                        { id: 111, value: 111, text: "Item " + 111 },
                                        { id: 1111, value: 1111, text: "Item " + 1111 }
                                    ],
                                    total: 4
                                });
                            }, 0);
                        } else {
                            setTimeout(function() {
                                options.success({ data: generateData(options.data), total: 300 });
                            }, 0);
                        }
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            combobox.select(1);
            combobox.close();

            combobox.search("1");
            combobox.one("dataBound", function() {
                combobox.select(2); //select "Item 111"

                combobox.bind("dataBound", function() {
                    if (combobox.dataSource.page() > 1) { //wait until the binding is done
                        start();
                        equal(combobox.select(), 111);
                        equal(combobox.dataItem().value, 111);
                        ok($("[data-offset-index=111]").hasClass("k-state-focused"));
                        ok($("[data-offset-index=111]").hasClass("k-state-selected"));
                    }
                });

                combobox.dataSource.filter([]);
            });
        });
    });

    asyncTest("widget keeps the selected item after filter is cleared", 4, function() {
        var combobox = new ComboBox(select, {
            autoBind: false,
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: {
                    read: function(options) {
                        var filter = options.data.filter;

                        if (filter && filter.filters.length) {
                            setTimeout(function() {
                                options.success({
                                    data: [
                                        { id: 1, value: 1, text: "Item " + 1 },
                                        { id: 11, value: 11, text: "Item " + 11 },
                                        { id: 111, value: 111, text: "Item " + 111 },
                                        { id: 1111, value: 1111, text: "Item " + 1111 }
                                    ],
                                    total: 4
                                });
                            }, 0);
                        } else {
                            setTimeout(function() {
                                options.success({ data: generateData(options.data), total: 300 });
                            }, 0);
                        }
                    }
                },
                serverPaging: true,
                serverFiltering: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();
            combobox.select(1);
            combobox.close();

            combobox.one("dataBound", function() {
                start();
                equal(combobox.select(), 11);
                equal(combobox.dataItem().value, 11);
                ok($("[data-offset-index=11]").hasClass("k-state-focused"));
                ok($("[data-offset-index=11]").hasClass("k-state-selected"));
            });

            combobox.open();
        });

        combobox.search("1");
    });

    asyncTest("widget keeps selected value when filter is cleared (select)", 1, function() {
        var data = generateData({ skip: 0, take: 40 });
        var combobox = new ComboBox(select, {
            autoBind: false,
            animation: false,
            height: 200,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                transport: { read: function(options) { options.success(data); } },
                pageSize: 40
            },
            filter: "contains",
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 28
            }
        });

        combobox.one("dataBound", function() {
            combobox.select(0);
            combobox.close();

            combobox.one("dataBound", function() {
                start();
                equal(combobox.value(), "11");
            });

            combobox.open();
        });

        //simulate MVVM value binding
        combobox._preselect("1", "Item1");
        combobox.search("11");
    });

    asyncTest("dataItem returns correct object based on LI element", 2, function() {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource : new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({ data: generateData(options.data), total: 53 });
                        }, 0);
                    }
                },
                serverFiltering: true,
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            }),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        combobox.open();
        combobox.one("dataBound", function() {
            combobox.one("dataBound", function() {
                start();
                var item49 = combobox.listView.content.find("li")
                                     .filter(function(_, li) { return $(li).data("offsetIndex") == 49 });

                var dataItem = combobox.dataItem(item49);

                equal(dataItem.value, 49);
                equal(dataItem.text, item49.text());
            });

            scroll(combobox.listView.content, 5 * CONTAINER_HEIGHT);
        });
    });

    asyncTest("widget focuses the item found during text search", 1, function() {
        var combobox = new ComboBox(select, {
            delay: 0,
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            }
        });

        combobox.one("dataBound", function() {
            combobox.input.focus().val("Item 1");
            combobox.input.trigger({ type: "keydown" });

            setTimeout(function() {
                start();
                ok($("[data-offset-index=1]").hasClass("k-state-focused"));
            }, 100);
        });
    });

    asyncTest("keep selected value when list is scrolled", 1, function() {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();

            combobox.one("dataBound", function() {
                start();
                equal(select.val(), 10);
            });

            scroll(combobox.listView.content, 5 * CONTAINER_HEIGHT);
        });

        combobox.value(10);
    });

    asyncTest("clear filter when set new value", 1, function() {
        var combobox = new ComboBox(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            filter: "contains",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 20
            }
        });

        combobox.one("dataBound", function() {
            combobox.open();

            combobox.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            combobox.one("dataBound", function() {
                start();

                combobox.value("");

                equal(combobox.dataSource.filter().filters.length, 0);
            });
        });

        combobox.value(10);
    });

    test("use DataSource that was already read", 1, function() {
        var noErrors = true;
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: function(o) {
                    o.success([{text: "asd", value: 1}]);
                }
            }
        });
        dataSource.read();
        try {
            var combobox = new ComboBox(select, {
                close: function(e) { e.preventDefault(); },
                height: CONTAINER_HEIGHT,
                animation: false,
                filter: "contains",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: dataSource,
                virtual: {
                    valueMapper: function(o) { o.success(o.value); },
                    itemHeight: 20
                }
            });
        } catch(err) {
            noErrors = false;
        }
        ok(noErrors);
    });
})();
