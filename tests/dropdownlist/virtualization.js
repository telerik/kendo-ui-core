(function() {
    var DropDownList = kendo.ui.DropDownList,
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

    module("kendo.ui.DropDownList Virtualization", {
        setup: function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (select.data("kendoDropDownList")) {
                select.data("kendoDropDownList").destroy();
            }
        }
    });

    asyncTest("DropDownList does not revert scroll position on dataBound", 1, function() {
        var dropdownlist = new DropDownList(select, {
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

        dropdownlist.one("dataBound", function() {
            dropdownlist.open();
            scroll(dropdownlist.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                start();

                notEqual(dropdownlist.listView.content.scrollTop(), 0);
            }, 100);

        });

        dropdownlist.value("0");
    });

    asyncTest("DropDownList selects correct item when optionLabel is defined", 1, function() {
        var dropdownlist = new DropDownList(select, {
            optionLabel: "test",
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

        dropdownlist.one("dataBound", function() {
            start();
            equal(dropdownlist.value(), 100);
        });

        dropdownlist.value("100");
    });
})();
