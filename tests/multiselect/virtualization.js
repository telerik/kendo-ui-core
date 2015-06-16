(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    var CONTAINER_HEIGHT = 200;

    function popuplateSelect() {
        var options = [];
        for (var i=0; i < 5; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

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

    module("kendo.ui.MultiSelect Initialization", {
        setup: function() {
            kendo.ns = "";
            select = $("<select multiple />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    asyncTest("MultiSelect renders option value if only values are available", 3, function() {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                start();
                var options = multiselect.element.children(":selected");

                equal(options.length, 1);

                equal(options[0].text, "Item 0");
                equal(options[0].value, "0");
            }, 300);

        });

        multiselect.value("0");
        multiselect.open();
    });

    asyncTest("MultiSelect renders part of the selected data items and values", 5, function() {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            scroll(multiselect.listView.content, 4 * CONTAINER_HEIGHT);

            setTimeout(function() {
                start();
                var options = multiselect.element.children(":selected");

                equal(options.length, 2);

                equal(options[0].text, "Item 15");
                equal(options[0].value, "15");

                equal(options[1].text, "Item 0");
                equal(options[1].value, "0");
            }, 300);

        });

        multiselect.value(["0", "15"]);
        multiselect.open();
    });

})();
