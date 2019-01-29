(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    function popuplateSelect(length) {
        var options = [];
        length = length || 5;
        for (var i = 0; i < length; i++) {
            options.push("<option value='" + i + "'>Option" + i + "</option>");
        }

        select.html(options);
    }

    describe("kendo.ui.MultiSelect API", function() {
        beforeEach(function() {
            kendo.ns = "kendo-";

            select = $("<select multiple/>").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.ns = "";

            if (select.data("kendoMultiSelect")) {
                select.data("kendoMultiSelect").destroy();
            }

            select.parents(".k-widget").remove();
        });

        it("MultiSelect opens the popup element", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.open();

            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect calls refresh method on open if no items", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, {
                autoBind: false
            });

            multiselect.open();

            assert.isOk(multiselect.ul.children().length);
        });

        it("MultiSelect does not rebind on open if no filtration", function() {
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

            assert.equal(multiselect.calls("refresh"), 0);
        });

        it("MultiSelect closes the popup element", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.close();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect creates tags for its values", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.value("0");

            assert.equal(multiselect.tagList.children().length, 1);
            assert.equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
            assert.isOk(multiselect.element[0].children[0].selected);
        });

        it("MultiSelect value method clears previously selected item", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.value("0");
            multiselect.value("1");

            assert.equal(multiselect.tagList.children().length, 1);
            assert.equal(multiselect.tagList.children(":first").find("span").html(), "Option1");
            assert.isOk(multiselect.element[0].children[1].selected);
            assert.isOk(!multiselect.element[0].children[0].selected);
        });

        it("MultiSelect value method forces re-bind if autoBind false is used", function(done) {
            var multiselect = new MultiSelect(select, {
                autoBind: false,
                dataValueField: "id",
                dataTextField: "text",
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{ id: 1, text: "Item1" }]);

                            assert.isOk(true);
                            done();
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

        it("MultiSelect value method selects the item retrieved from the server if autoBind:false", function(done) {
            var multiselect = new MultiSelect(select, {
                autoBind: false,
                dataValueField: "id",
                dataTextField: "text",
                dataSource: {
                    transport: {
                        read: function(options) {
                            options.success([{ id: 1, text: "New1" }]);
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

                assert.equal(items.length, 1);
                assert.equal(items[0].text, "New1");
                done();
            });

            multiselect.value(1);
        });

        it("Multiselect value is not deselected on open", function() {
            var multiselect = new MultiSelect(select, {
                autoBind: false,
                dataValueField: "value",
                dataTextField: "text",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                value: []
            });

            multiselect.open();

            multiselect.input.trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });

            multiselect.input.trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            multiselect.close();
            multiselect.open();

            assert.equal(multiselect.tagList.children().length, 1);
        });

        it("MultiSelect supports multiple values", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.value(["0", "1"]);

            assert.equal(multiselect.tagList.children().length, 2);
            assert.equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
            assert.equal(multiselect.tagList.children(":last").find("span").html(), "Option1");
            assert.isOk(multiselect.element[0].children[0].selected);
            assert.isOk(multiselect.element[0].children[1].selected);
        });

        it("MultiSelect supports ObservableArray value", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);
            var value = new kendo.data.ObservableArray(["0"]);

            multiselect.value(value);

            assert.equal(multiselect.tagList.children().length, 1);
            assert.equal(multiselect.tagList.children(":first").find("span").html(), "Option0");
            assert.isOk(multiselect.element[0].children[0].selected);
        });

        it("MultiSelect returns array with selected values", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            var items = multiselect.ul.children();

            items.eq(0).click();
            items.eq(1).click();

            assert.deepEqual(multiselect.value(), ["0", "1"]);
        });

        it("MultiSelect value with null parameter clears selected items", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            var items = multiselect.ul.children();

            items.eq(0).click();
            items.eq(1).click();

            multiselect.value(null);

            assert.equal(multiselect.value().length, 0);
        });

        it("MultiSelect returns empty array if no value", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);
            multiselect.value(null);

            assert.isOk(multiselect.value() instanceof Array);
        });

        it("value method selects item that exists only in unfiltered source", function() {
            var multiselect = new MultiSelect(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "contains"
            });

            multiselect.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            multiselect.value(2);

            assert.deepEqual(multiselect.value(), [2]);
        });

        it("value method selects item that exists only in unfiltered source (async)", function(done) {
            var multiselect = new MultiSelect(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: {
                    transport: {
                        read: function(options) {
                            setTimeout(function() {
                                if (options.data.filter && options.data.filter.filters[0]) {
                                    options.success([{ text: "foo", value: 1 }]);
                                } else {
                                    options.success([{ text: "foo", value: 1 }, { text: "bar", value: 2 }]);
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
                        assert.deepEqual(multiselect.value(), [2]);
                        done();
                    });
                });
            });
        });

        it("change is not triggered on blur after value()", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, {
                change: function () {
                    assert.isOk(false);
                }
            });

            multiselect.value(["0", "1"]);
            multiselect._blur();
        });

        it("MultiSelect opens popup", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.open();

            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect rebinds list on open", function() {
            popuplateSelect(5);
            var multiselect = new MultiSelect(select);

            multiselect.search("Option1");
            multiselect.ul.children().first().click();
            multiselect.open();

            assert.equal(multiselect.ul.children().length, 5);
        });

        it("MultiSelect closes popup", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.open();
            multiselect.close();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect disables widget", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { value: "1" });

            multiselect.enable(false);

            multiselect.tagList.find(".k-i-close").click();

            assert.equal(multiselect.tagList.children().length, 1);
            assert.isOk(multiselect.wrapper.hasClass("k-state-disabled"));
            assert.isOk(!multiselect._innerWrapper.hasClass("k-state-disabled"));
            assert.isOk(multiselect.input.attr("disabled"));
        });

        it("MultiSelect enables widget", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { value: "1" });

            multiselect.enable(false);
            multiselect.enable(true);

            multiselect.tagList.find(".k-i-close").click();
            multiselect.wrapper.mousedown();

            assert.equal(multiselect.tagList.children().length, 0);
            assert.isOk(!multiselect.wrapper.hasClass("k-state-disabled"));
            assert.isOk(!multiselect.input.attr("disabled"));
            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect returns list of selected dataItems", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { value: "1" });

            var dataItems = multiselect.dataItems();

            assert.equal(dataItems.length, 1);
            assert.equal(dataItems[0].value, "1");
            assert.equal(dataItems[0].text, "Option1");
        });

        it("MultiSelect fetches item if widget is disabled and value is set", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select.attr("disabled", true), { autoBind: false });

            multiselect.value("1");

            assert.equal(multiselect.dataSource.view().length, 5);
            assert.equal(multiselect.value().length, 1);
        });

        it("MultiSelect fetches item if autoBind is set to false when value is set", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { autoBind: false });

            multiselect.value("1");

            assert.equal(multiselect.dataSource.view().length, 5);
            assert.equal(multiselect.value().length, 1);
        });

        it("MultiSelect does not allow selection more than maxSelectedItems", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { maxSelectedItems: 1 });

            multiselect.value(["1", "2"]);

            assert.equal(multiselect.value().length, 1);
            assert.equal(multiselect.dataItems().length, 1);
        });

        it("MultiSelect does not open popup if values >= maxSelectedItems", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { maxSelectedItems: 2 });

            multiselect.value(["1", "2"]);
            multiselect.open();

            assert.isOk(!multiselect.popup.visible());
        });

        it("MultiSelect opens popup if noDataTemplate", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { noDataTemplate: "no data" });

            multiselect.open();

            assert.isOk(multiselect.popup.visible());
        });

        it("readonly method makes input element readonly", function() {
            var multiselect = new MultiSelect(select);

            multiselect.readonly();

            assert.equal(multiselect.element.attr("readonly"), "readonly");
        });

        it("readonly method unbinds input click", function() {
            var multiselect = new MultiSelect(select);

            multiselect.readonly();
            multiselect.input.click();

            assert.isOk(!multiselect.popup.visible());
        });

        it("readonly(false) removes readonly attribute", function() {
            var multiselect = new MultiSelect(select);

            multiselect.readonly();
            multiselect.readonly(false);

            assert.equal(multiselect.element.attr("readonly"), undefined);
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var multiselect = new MultiSelect(select);

            multiselect.enable(false);
            multiselect.readonly();

            assert.equal(multiselect.element.attr("readonly"), "readonly");
            assert.equal(multiselect.element.attr("disabled"), undefined);
            assert.isOk(!multiselect.wrapper.hasClass("k-state-disabled"));
        });

        it("enable(false) removes readonly attribute and default class", function() {
            var multiselect = new MultiSelect(select);

            multiselect.readonly();
            multiselect.enable(false);

            assert.equal(multiselect.element.attr("readonly"), undefined);
            assert.equal(multiselect.element.attr("disabled"), "disabled");
            assert.isOk(multiselect.wrapper.hasClass("k-state-disabled"));
        });

        it("enable() enables widget after readonly()", function() {
            var multiselect = new MultiSelect(select);

            multiselect.readonly();
            multiselect.enable();

            assert.equal(multiselect.element.attr("readonly"), undefined);
            assert.equal(multiselect.element.attr("disabled"), undefined);
            assert.isOk(!multiselect.wrapper.hasClass("k-state-disabled"));
        });

        it("MultiSelect does not pass placeholder on search", function() {
            var multiselect = new MultiSelect(select, {
                autoBind: false,
                placeholder: "Select...",
                dataSource: {
                    serverFiltering: true,
                    transport: {
                        read: "",
                        parameterMap: function(options) {
                            assert.equal(options.filter.filters.length, 0);
                        }
                    }
                }
            });

            multiselect.search();
        });

        it("MultiSelect does not request data if set empty array as value", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select, { autoBind: false });

            multiselect.value([]);

            assert.equal(multiselect.ul.children().length, 0);
        });

        it("MultiSelect does not request source for second time if already started", function() {
            popuplateSelect();

            var def = $.Deferred();
            var source = new kendo.data.DataSource({
                transport: {
                    read: function(options) {
                        assert.isOk(true);

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

        it("MultiSelect toggles popup element", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.toggle();

            assert.isOk(multiselect.popup.visible());
        });

        it("MultiSelect does not append already selected items", function() {
            popuplateSelect();
            var multiselect = new MultiSelect(select);

            multiselect.value(["0", "1"]);

            multiselect.setDataSource(multiselect.dataSource);

            assert.equal(multiselect.tagList.children().length, 2);
        });

        it("setOptions updates listView template when dataTextField is set", function() {
            var multiselect = new MultiSelect(select, {
                dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
                dataTextField: "name",
                dataValueField: "name",
                filter: "startswith"
            });

            multiselect.setOptions({
                dataTextField: "anotherName"
            });


            assert.equal(multiselect.listView.options.template, "#:data.anotherName#");
        });

        it("setOptions updates placeholder", function() {
            var multiselect = new MultiSelect(select, {
                dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
                dataTextField: "name",
                dataValueField: "name",
                placeholder: "Select..."
            });

            multiselect.setOptions({
                placeholder: "Name"
            });

            assert.equal(multiselect.input.val(), "Name");
        });

        it("accept value after source is updated", function() {
            var multiselect = new MultiSelect(select, {
                autoBind: false
            });

            multiselect.open(); //open to force binding

            multiselect.setDataSource([
                "item1", "item2"
            ]);

            multiselect.value("item2");

            assert.equal(multiselect.tagList.children().length, 1)
        });

        it("setOptions method updates footer template", function() {
            var multiselect = new MultiSelect(select, {});

            multiselect.setOptions({ footerTemplate: "footer" });

            assert.equal(multiselect.footer.html(), "footer");
        });

        it("setOptions method hides footer template", function() {
            var multiselect = new MultiSelect(select, {
                footerTemplate: "footer"
            });

            multiselect.setOptions({ footerTemplate: "" });

            assert.equal(multiselect.footer, null);
        });

        it("setOptions method updates header template", function() {
            var multiselect = new MultiSelect(select, {});

            multiselect.setOptions({ headerTemplate: "<div>header</div>" });

            assert.equal(multiselect.header.html(), "header");
        });

        it("setOptions method hides footer template", function() {
            var multiselect = new MultiSelect(select, {
                headerTemplate: "header"
            });

            multiselect.setOptions({ headerTemplate: "" });

            assert.equal(multiselect.header, null);
        });

        it("setOptions re-renders noDataTemplate", function() {
            var multiselect = new MultiSelect(select, {
                noDataTemplate: "test"
            });

            multiselect.setOptions({
                noDataTemplate: "no data"
            });

            assert.equal(multiselect.noData.text(), "no data");
        });

        it("setOptions removes noData template", function() {
            var multiselect = new MultiSelect(select, {
                noDataTemplate: "test"
            });

            multiselect.setOptions({
                noDataTemplate: null
            });

            assert.equal(multiselect.noData, null);
        });

    });
}());
