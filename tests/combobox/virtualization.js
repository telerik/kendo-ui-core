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
            select = $("<select multiple />").appendTo(QUnit.fixture);
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
})();
