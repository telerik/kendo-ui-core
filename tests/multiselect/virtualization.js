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
            serverFiltering: true,
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

    asyncTest("MultiSelect can display values that are not part of the first data page and are set through the API after initial dataBinding", 1, function() {
        var multiselect = new MultiSelect(select, {
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
            multiselect.close();
            multiselect.value([300]);
            setTimeout(function() {
                start();
                equal(multiselect.tagList.children().length, 1, "Selected tag is rendered");
            }, 300)
        });

        multiselect.open();
    });

    asyncTest("MultiSelect renders <select> tag if the corresponding dataItem is not part of the current data view", 2, function() {
        var multiselect = new MultiSelect(select, {
            height: CONTAINER_HEIGHT,
            autoBind: false,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: createAsyncDataSource(),
            virtual: {
                valueMapper: function(o) {
                    o.success(o.value);
                },
                itemHeight: 40
            }
        });

        multiselect.one("dataBound", function() {
            multiselect.close();
            multiselect.value([299]);
            setTimeout(function() {
                start();
                equal(multiselect.value()[0], [299]);
                equal(multiselect.element.children().last().attr("value"), "299", "Custom option is rendered");
            }, 300)
        });

        multiselect.open();
    });

    //unstable
    /*asyncTest("dataItem returns correct object based on LI element", 2, function() {
        var multiselect = new MultiSelect(select, {
            close: function(e) { e.preventDefault(); },
            height: CONTAINER_HEIGHT,
            animation: false,
            dataTextField: "text",
            dataValueField: "value",
            dataSource : new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        setTimeout(function() {
                            var data = generateData(options.data);
                            data = data.slice(0, 53 - ((options.data.page - 1) * options.data.pageSize));
                            options.success({ data: data, total: 53 });
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

        multiselect.open();
        multiselect.one("dataBound", function() {
                setTimeout(function() {
                    start();
                    var item49 = multiselect.listView.content.find("li")
                                         .filter(function(_, li) { return $(li).data("offsetIndex") == 49 });

                    var dataItem = multiselect.dataItem(item49);

                    equal(dataItem.value, 49);
                    equal(dataItem.text, item49.text());
                }, 400);

            multiselect.listView.content.scrollTop(5 * CONTAINER_HEIGHT);
        });
    });*/

    asyncTest("MultiSelect triggers change on item select", 1, function() {
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
            },
            change: function() {
                start();
                ok(true, "change is fired");
            }
        });

        multiselect.one("dataBound", function() {
            var item = $(multiselect.items()[1]);
            item.click();
        });
        multiselect.open();
    });

    asyncTest("clear filter when set new value", 1, function() {
        var multiselect = new MultiSelect(select, {
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

        multiselect.one("dataBound", function() {
            multiselect.open();

            multiselect.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "Item 30"
            });

            multiselect.one("dataBound", function() {
                start();

                multiselect.value("");

                equal(multiselect.dataSource.filter().filters.length, 0);
            });
        });

        multiselect.value(10);
    });

})();
