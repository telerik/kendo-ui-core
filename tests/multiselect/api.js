(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function popuplateSelect(length) {
        var options = [];
        length = length || 5;
        for (var i=0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    module("kendo.ui.MultiSelect API", {
        setup: function() {
            kendo.ns = "kendo-";
            kendo.effects.disable();
            select = $("<select multiple/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.ns = "";
            kendo.effects.enable();
            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        }
    });

    test("MultiSelect opens the popup element", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.open();

        ok(multiselect.popup.visible());
    });

    test("MultiSelect calls refresh method on open if no items", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            autoBind: false
        });

        multiselect.open();

        ok(multiselect.ul.children().length);
    });

    test("MultiSelect does not rebind on open if no filtration", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, {
            autoBind: true
        });

        stub(multiselect, {
            refresh: multiselect.refresh
        });

        multiselect.wrapper.mousedown();
        multiselect.input.click();
        multiselect.wrapper.click();

        equal(multiselect.calls("refresh"), 0);
    });

    test("MultiSelect closes the popup element", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.close();

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect creates tags for its values", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.value("0");

        equal(multiselect.tagList.children().length, 1);
        equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
        ok(multiselect.element[0].children[0].selected);
    });

    test("MultiSelect value method clears previously selected item", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.value("0");
        multiselect.value("1");

        equal(multiselect.tagList.children().length, 1);
        equal(multiselect.tagList.children(":first").find("span").html(), "Option1");
        ok(multiselect.element[0].children[1].selected);
        ok(!multiselect.element[0].children[0].selected);
    });

    asyncTest("MultiSelect value method forces re-bind if autoBind false is used", 1, function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { id: 1, text: "Item1" } ]);

                        start();
                        ok(true);
                    }
                }
            },
            value: [
                { id: 1, text: "Item1" },
                { id: 2, text: "Item2" },
                { id: 3, text: "Item3" }
            ]
        });

        multiselect.value(1);
    });

    asyncTest("MultiSelect value method selects the item retrieved from the server if autoBind:false", 2, function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            dataValueField: "id",
            dataTextField: "text",
            dataSource: {
                transport: {
                    read: function(options) {
                        options.success([ { id: 1, text: "New1" } ]);
                    }
                }
            },
            value: [
                { id: 1, text: "Item1" },
                { id: 2, text: "Item2" },
                { id: 3, text: "Item3" }
            ]
        });

        multiselect.bind("dataBound", function() {
            var items = multiselect.dataItems();

            start();
            equal(items.length, 1);
            equal(items[0].text, "New1");
        });

        multiselect.value(1);
    });

    test("MultiSelect supports multiple values", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.value(["0", "1"]);

        equal(multiselect.tagList.children().length, 2);
        equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
        equal(multiselect.tagList.children(":last").find("span").html(), "Option1");
        ok(multiselect.element[0].children[0].selected);
        ok(multiselect.element[0].children[1].selected);
    });

    test("MultiSelect supports ObservableArray value", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);
        var value = new kendo.data.ObservableArray(["0"]);

        multiselect.value(value);

        equal(multiselect.tagList.children().length, 1);
        equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
        ok(multiselect.element[0].children[0].selected);
    });

    test("MultiSelect returns array with selected values", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        var items = multiselect.ul.children();

        items.eq(0).click();
        items.eq(1).click();

        deepEqual(multiselect.value(), ["0", "1"]);
    });

    test("MultiSelect value with null parameter clears selected items", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        var items = multiselect.ul.children();

        items.eq(0).click();
        items.eq(1).click();

        multiselect.value(null);

        equal(multiselect.value().length, 0);
    });

    test("MultiSelect returns empty array if no value", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);
        multiselect.value(null);

        ok(multiselect.value() instanceof Array);
    });

test("value method selects item that exists only in unfiltered source", function() {
    var multiselect = new MultiSelect(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "foo", value: 1}, {text:"bar", value:2}],
        filter: "contains"
    });

    multiselect.dataSource.filter({
        field: "text",
        operator: "contains",
        value: "foo"
    });

    multiselect.value(2);

    deepEqual(multiselect.value(), [2]);
});

asyncTest("value method selects item that exists only in unfiltered source (async)", 1, function() {
    var multiselect = new MultiSelect(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            transport: {
                read: function(options) {
                    setTimeout(function() {
                        if (options.data.filter && options.data.filter.filters[0]) {
                            options.success([{text: "foo", value: 1}]);
                        } else {
                            options.success([{text: "foo", value: 1}, {text:"bar", value:2}]);
                        }
                    });
                }
            },
            serverFiltering: true
        }
    });

    multiselect.one("dataBound", function() {
        multiselect.dataSource.filter({
            field: "text",
            operator: "contains",
            value: "foo"
        });

        multiselect.one("dataBound", function() {
            multiselect.value(2);

            multiselect.one("dataBound", function() {
                start();
                deepEqual(multiselect.value(), [2]);
            });
        });
    });
});

    test("MultiSelect opens popup", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.open();

        ok(multiselect.popup.visible());
    });

    test("MultiSelect rebinds list on open", function() {
        popuplateSelect(5);
        var multiselect = new MultiSelect(select);

        multiselect.search("Option1");
        multiselect.ul.children().first().click();
        multiselect.open();

        equal(multiselect.ul.children().length, 5);
    });

    test("MultiSelect closes popup", 1, function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.open();
        multiselect.close();

        ok(!multiselect.popup.visible());
    });

    test("MultiSelect disables widget", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { value: "1" });

        multiselect.enable(false);

        multiselect.tagList.find(".k-i-close").click();

        equal(multiselect.tagList.children().length, 1);
        ok(multiselect.wrapper.hasClass("k-state-disabled"));
        ok(!multiselect._innerWrapper.hasClass("k-state-disabled"));
        ok(multiselect.input.attr("disabled"));
    });

    test("MultiSelect enables widget", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { value: "1" });

        multiselect.enable(false);
        multiselect.enable(true);

        multiselect.tagList.find(".k-i-close").click();
        multiselect.wrapper.mousedown();

        equal(multiselect.tagList.children().length, 0);
        ok(!multiselect.wrapper.hasClass("k-state-disabled"));
        ok(!multiselect.input.attr("disabled"));
        ok(multiselect.popup.visible());
    });

    test("MultiSelect returns list of selected dataItems", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { value: "1" });

        var dataItems = multiselect.dataItems();

        equal(dataItems.length, 1);
        equal(dataItems[0].value, "1");
        equal(dataItems[0].text, "Option1");
    });

    test("MultiSelect fetches item if widget is disabled and value is set", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select.attr("disabled", true), { autoBind: false });

        multiselect.value("1");

        equal(multiselect.dataSource.view().length, 5);
        equal(multiselect.value().length, 1);
    });

    test("MultiSelect fetches item if autoBind is set to false when value is set", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { autoBind: false });

        multiselect.value("1");

        equal(multiselect.dataSource.view().length, 5);
        equal(multiselect.value().length, 1);
    });

    test("MultiSelect does not allow selection more than maxSelectedItems", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { maxSelectedItems: 1 });

        multiselect.value(["1", "2"]);

        equal(multiselect.value().length, 1);
        equal(multiselect.dataItems().length, 1);
    });

    test("MultiSelect does not open popup if values >= maxSelectedItems", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { maxSelectedItems: 2 });

        multiselect.value(["1", "2"]);
        multiselect.open();

        ok(!multiselect.popup.visible());
    });

    test("readonly method makes input element readonly", function() {
        var multiselect = new MultiSelect(select);

        multiselect.readonly();

        equal(multiselect.element.attr("readonly"), "readonly");
    });

    test("readonly method unbinds input click", function() {
        var multiselect = new MultiSelect(select);

        multiselect.readonly();
        multiselect.input.click();

        ok(!multiselect.popup.visible());
    });

    test("readonly(false) removes readonly attribute", function() {
        var multiselect = new MultiSelect(select);

        multiselect.readonly();
        multiselect.readonly(false);

        equal(multiselect.element.attr("readonly"), undefined);
    });

    test("readonly() removes disabled attribute and disabled class", function() {
        var multiselect = new MultiSelect(select);

        multiselect.enable(false);
        multiselect.readonly();

        equal(multiselect.element.attr("readonly"), "readonly");
        equal(multiselect.element.attr("disabled"), undefined);
        ok(!multiselect.wrapper.hasClass("k-state-disabled"));
    });

    test("enable(false) removes readonly attribute and default class", function() {
        var multiselect = new MultiSelect(select);

        multiselect.readonly();
        multiselect.enable(false);

        equal(multiselect.element.attr("readonly"), undefined);
        equal(multiselect.element.attr("disabled"), "disabled");
        ok(multiselect.wrapper.hasClass("k-state-disabled"));
    });

    test("enable() enables widget after readonly()", function() {
        var multiselect = new MultiSelect(select);

        multiselect.readonly();
        multiselect.enable();

        equal(multiselect.element.attr("readonly"), undefined);
        equal(multiselect.element.attr("disabled"), undefined);
        ok(!multiselect.wrapper.hasClass("k-state-disabled"));
    });

    test("MultiSelect does not pass placeholder on search", 1, function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false,
            placeholder: "Select...",
            dataSource: {
                serverFiltering: true,
                transport: {
                    read: "",
                    parameterMap: function(options) {
                        equal(options.filter.filters[0].value, "");
                    }
                }
            }
        });

        multiselect.search();
    });

    test("MultiSelect does not request data if set empty array as value", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select, { autoBind: false });

        multiselect.value([]);

        equal(multiselect.ul.children().length, 0);
    });

    test("MultiSelect does not request source for second time if already started", 1, function() {
        popuplateSelect();

        var def = $.Deferred();
        var source =  new kendo.data.DataSource({
            transport: {
                read: function(options) {
                    ok(true);

                    def.done(function() {
                        options.success([]);
                    });
                }
            }
        });

        var multiselect = new MultiSelect(select);

        multiselect.setDataSource(source);
        multiselect.value([1]);
        def.resolve();
    });

    test("MultiSelect toggles popup element", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.toggle();

        ok(multiselect.popup.visible());
    });

    test("MultiSelect does not append already selected items", function() {
        popuplateSelect();
        var multiselect = new MultiSelect(select);

        multiselect.value(["0", "1"]);

        multiselect.setDataSource(multiselect.dataSource);

        equal(multiselect.tagList.children().length, 2);
    });

    test("setOptions updates listView template when dataTextField is set", function() {
        var multiselect = new MultiSelect(select, {
            dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
            dataTextField: "name",
            dataValueField: "name",
            filter: "startswith"
        });

        multiselect.setOptions({
            dataTextField: "anotherName"
        });


        equal(multiselect.listView.options.template, "#:data.anotherName#");
    });

    test("accept value after source is updated", function() {
        var multiselect = new MultiSelect(select, {
            autoBind: false
        });

        multiselect.open(); //open to force binding

        multiselect.setDataSource([
            "item1", "item2"
        ]);

        multiselect.value("item2");

        equal(multiselect.tagList.children().length, 1)
    });
})();
