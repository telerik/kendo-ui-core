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
            select = $("<select multiple />").appendTo(QUnit.fixture);
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

    asyncTest("does not select duplicated values", 2, function() {
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

        autocomplete.one("dataBound", function() {
            var selectedCount = autocomplete.listView.items().filter(".k-state-selected").length

            start();
            equal(selectedCount, 1);
            ok(autocomplete.listView.items().eq(0).hasClass("k-state-selected"));
        });

        autocomplete.search("Item");
    });
})();
