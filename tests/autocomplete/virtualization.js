(function() {
    var AutoComplete = kendo.ui.AutoComplete,
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
            serverFiltering: true,
            serverPaging: true,
            pageSize: 40,
            schema: {
                data: "data",
                total: "total"
            }
        });
    }

    module("kendo.ui.AutoComplete Virtualization", {
        setup: function() {
            kendo.ns = "";
            select = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (select.data("kendoAutoComplete")) {
                select.data("kendoAutoComplete").destroy();
            }
        }
    });

    asyncTest("AutoComplete does not revert scroll position on dataBound", 1, function() {
        var autocomplete = new AutoComplete(select, {
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

        autocomplete.one("dataBound", function() {
            scroll(autocomplete.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                start();

                notEqual(autocomplete.listView.content.scrollTop(), 0);
            }, 100);

        });

        autocomplete.search("Item");
    });

    asyncTest("should clear selected item on popup open", 2, function() {
        var autocomplete = new AutoComplete(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            options.success({
                                data: [
                                    { id: 1, text: "Item " + 1 },
                                    { id: 11, text: "Item " + 1 },
                                    { id: 111, text: "Item " + 1 },
                                    { id: 1111, text: "Item " + 1 },
                                    { id: 11111, text: "Item " + 1 },
                                    { id: 111111, text: "Item " + 1 }
                                ],
                                total: 6
                            });
                        }, 0);
                    }
                },
                serverPaging: true,
                pageSize: 40,
                schema: {
                    data: "data",
                    total: "total"
                }
            },
            virtual: {
                valueMapper: function(o) { o.success(o.value); },
                itemHeight: 40
            },
            value: "Item 1"
        });

        autocomplete.popup.one("activate", function() {
            var selectedCount = autocomplete.listView.items().filter(".k-state-selected").length

            start();
            equal(selectedCount, 0);
            ok(!autocomplete.listView.items().eq(0).hasClass("k-state-selected"));
        });

        autocomplete.search("Item");
    });

    asyncTest("dataItem returns correct object based on LI element", 2, function() {
        var autocomplete = new AutoComplete(select, {
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

        autocomplete.one("dataBound", function() {
            autocomplete.one("dataBound", function() {
                start();
                var item49 = autocomplete.listView.content.find("li")
                                         .filter(function(_, li) { return $(li).data("offsetIndex") == 49 });

                var dataItem = autocomplete.dataItem(item49);

                equal(dataItem.value, 49);
                equal(dataItem.text, item49.text());
            });

            scroll(autocomplete.listView.content, 5 * CONTAINER_HEIGHT);
        });

        autocomplete.search("Item");
    });

    asyncTest("do not focus first item on second search", 1, function() {
        var autocomplete = new AutoComplete(select, {
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

        autocomplete.one("dataBound", function() {
            autocomplete.one("dataBound", function() {
                start();
                var firstItem = autocomplete.listView.content.find("li:first");

                equal(firstItem.hasClass("k-state-focused"), false);
            });

            autocomplete.search("Item1");
        });

        autocomplete.search("Item");
    });
})();
