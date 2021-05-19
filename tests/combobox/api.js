(function() {

    var data = [{ text: "Foo", value: 1 }, { text: "Bar", value: 2 }];

    var ComboBox = kendo.ui.ComboBox;

    var SELECTED = "k-state-selected";
    var keys = kendo.keys;
    var select;
    var input;

    describe("kendo.ui.ComboBox selection", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var combo = input.data("kendoComboBox");

            if (combo) {
                combo.destroy();
                input = null;
            }

            if (select) {
                select.data("kendoComboBox").destroy();
                select = null;
            }
            kendo.destroy(Mocha.fixture);
        });

        it("open() method should open popup {autobind: true}", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.open();

            assert.isOk(combobox.popup.visible());
        });

        it("open() method should bind and open popup {autobind: false}", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }],
                autoBind: false
            });

            combobox.open();

            assert.isOk(combobox.popup.visible());
        });

        it("open() does not initiate second Ajax request", function() {
            $.mockjaxSettings.responseTime = 1000; //TODO: set to 0
            $.mockjaxSettings.contentType = "text/html";
            $.mockjax({ url: "fake.json", responseText: [] });

            var combobox = new ComboBox(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: { url: "fake.json", dataType: "json" }
                    }
                }
            });

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.dataSource.fetch();
            combobox.open();

            assert.equal(combobox.dataSource.calls("fetch"), 1);

            $.mockjax.clear();
        });



        it("value('2') set selectedIndex", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });
            combobox.value("2");

            assert.equal(combobox.selectedIndex, 1);
            assert.equal(combobox.current().index(), 1);
        });

        it("value method should select item if exists", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.value("2");

            assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(combobox.value(), "2");
            assert.equal(combobox.text(), "2");
            assert.equal(combobox._old, "2");
        });

        it("change is not triggered on blur after value()", function() {
            var combobox = new ComboBox(input, {
                change: function () {
                    assert.isOk(false);
                }
            });
            combobox.value("2");

            combobox._blur();
        });

        it("value('') clear selection", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(1);
            combobox.value("");

            assert.isOk(!combobox.ul.children().hasClass(SELECTED));
            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "");
            assert.equal(combobox._old, "");
        });

        it("value method selects item with empty string value", function() {
            combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: "" }, { text: 2, value: 0 }],
                value: 0
            });

            combobox.value("");

            assert.equal(combobox.selectedIndex, 0);
            assert.isOk(combobox.ul.children(":first").hasClass("k-state-selected"));
        });

        it("value method selects item with null value", function() {
            combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: null }, { text: 2, value: 0 }],
                value: 0
            });

            combobox.value(null);

            assert.equal(combobox.selectedIndex, 0);
            assert.isOk(combobox.ul.children(":first").hasClass("k-state-selected"));
        });

        it("value method does not add item with custom value 'null' (select)", function() {
            select = $("<select></select>");

            combobox = new ComboBox(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
            });

            combobox.value("custom");
            combobox.value(null);

            var option = select.children(":last");

            assert.equal(option[0].value, "custom");
            assert.equal(option.attr("selected"), undefined)
            assert.equal(option[0].selected, false);
        });

        it("value method clears selected state of the custom option", function() {
            select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>");

            combobox = new ComboBox(select, {
                dataTextField: "text",
                dataValueField: "value"
            });

            combobox.value(null);

            assert.equal(combobox.selectedIndex, -1);
            assert.equal(combobox.value(), "");
        });

        it("value method selects item when item field is string and value is number", function() {
            combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: "1" }, { text: 2, value: "2" }]
            });

            combobox.value(2);

            assert.equal(combobox.selectedIndex, 1);
            assert.isOk(combobox.ul.children(":last").hasClass("k-state-selected"));
        });

        it("should select jquery object", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(combobox.ul.children().first());

            assert.equal(combobox.value(), "1");
        });

        it("should select dom element", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(combobox.ul.children().first()[0]);

            assert.equal(combobox.value(), "1");
        });

        it("value method should select item with 0 value", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 0 }]
            });

            combobox.value(0);

            assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(combobox.value(), "0");
            assert.equal(combobox.text(), 2);
            assert.equal(combobox._old, 0);
        });

        it("select item with index -1 should clear selection", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(0);
            combobox.select(-1);

            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "");
        });

        it("select should select item by predicate", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(0);
            combobox.select(function(item) {
                return item.text == 2;
            });

            assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(combobox.value(), "2");
            assert.equal(combobox.text(), "2");
        });

        it("select(li) set selectedIndex", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(1);

            assert.equal(combobox.selectedIndex, 1);
            assert.equal(combobox.current().index(), 1);
        });

        it("select() returns selectedIndex", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(1);

            assert.equal(combobox.select(), 1);
        });

        it("select method does not trigger change event", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.bind("change", function() {
                assert.isOk(false);
            });

            combobox.select(1);
            combobox._change();
        });

        it("open should open popup", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.popup.bind("open", function() {
                assert.isOk(true);
            });

            combobox.open();
        });

        it("open should bind and open after this if no items", function() {
            var combobox = input.kendoComboBox({
                autoBind: false,
                dataTextField: "text",
                dataValueField: "value",
                dataSource: data
            }).data("kendoComboBox");

            combobox.popup.bind("open", function() {
                assert.isOk(true);
            });

            combobox.open();
        });

        it("close should close popup", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.popup.bind("close", function() {
                assert.isOk(true);
            });

            combobox.open();
            combobox.close();
        });

        it("value should select custom option if element is select", function() {
            select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>");

            var combobox = new ComboBox(select, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo" }, { text: "bar" }]
            });

            combobox.value("custom value");

            assert.equal(select.val(), "custom value");
            assert.equal(combobox._old, "custom value");
        });

        it("text method should select item if exists", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.text("foo");

            assert.isOk(combobox.ul.children().eq(0).hasClass(SELECTED));
            assert.equal(combobox.value(), "1");
            assert.equal(combobox.text(), "foo");
        });

        it("text should set custom value", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(1);
            combobox.text("custom");

            assert.isOk(!combobox.ul.children().hasClass(SELECTED));
            assert.isOk(!combobox._current);
            assert.isOk(!combobox._selected);
            assert.equal(combobox.value(), "custom");
            assert.equal(combobox.text(), "custom");
        });

        it("text should set custom text and keep value empty", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }],
                syncValueAndText: false
            });

            combobox.select(1);
            combobox.text("custom");

            assert.isOk(!combobox.ul.children().hasClass(SELECTED));
            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "custom");
        });

        it("text method selects item depending on ignoreCase option", function() {
            var combobox = new ComboBox(input, {
                dataSource: ["foo", "Foo"],
                ignoreCase: false
            });

            combobox.text("Foo");

            assert.equal(combobox.selectedIndex, 1);
        });

        it("text method does not throw expection if set to null", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.text(null);

            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "");
        });

        it("text method does not throw expection if current selected item's value is null", function(done) {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: null }]
            });

            combobox.select(0).done(function() {
                combobox.text("foo");

                assert.equal(combobox.value(), "");
                assert.equal(combobox.text(), "foo");
                done();
            });
        });

        it("text should not change selection if selected item is equal to input.value", function() {
            var combobox = input.kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "Text1", value: 1 },
                    { text: "Text2", value: 2 },
                    { text: "Text1", value: 3 }
                ]
            }).data("kendoComboBox");

            combobox.select(2);
            combobox.input.focus().blur();

            assert.equal(combobox.text(), "Text1");
            assert.equal(combobox.value(), 3);
        });

        it("text should set empty text to the combobox", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(0);
            combobox.text("");

            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "");
        })

        it("text method should set input value when autoBind: false", function() {
            var combobox = new ComboBox(input, {
                dataSource: [{ text: "foo", value: null }],
                autoBind: false
            });

            combobox.text("Text");

            assert.equal(combobox.text(), "Text");
        });

        it('enable(false) should disable combobox', function() {
            var combobox = new ComboBox(input);

            combobox.enable(false);

            assert.isOk(combobox._inputWrapper.hasClass('k-state-disabled'));
            assert.isOk(combobox.input.attr("disabled"));
            assert.isOk(combobox.element.attr("disabled"));
        });

        it('after enable(false) should not open popup', function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            var oldOpen = combobox.popup.toggle,
                called = false;

            combobox.popup.toggle = function() { called = true };

            combobox.enable(false);

            combobox._arrow.click();

            assert.isOk(!called);

            combobox.popup.toggle = oldOpen;
        });

        it("enable(true) removes k-state-disabled class", function() {
            var combobox = new ComboBox(input);
            combobox.wrapper.addClass('k-state-disabled');
            combobox.element.attr("disabled", true);
            combobox.input.attr("disabled");

            combobox.enable();

            assert.isOk(!combobox._inputWrapper.hasClass('k-state-disabled'));
            assert.isOk(!combobox.element.attr("disabled"));
            assert.isOk(!combobox.input.attr("disabled"));
        });

        it("readonly() makes  input element readonly", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.readonly();

            assert.equal(combobox.element.attr("readonly"), "readonly");
            assert.equal(combobox.input.attr("readonly"), "readonly");
        });

        it("readonly() unbinds icon click", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.readonly();

            stub(combobox, { toggle: combobox.toggle });

            combobox._arrow.click();

            assert.isOk(!combobox.popup.visible());
        });

        it("readonly(false) removes readonly attribute", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.readonly();
            combobox.readonly(false);

            assert.equal(combobox.element.attr("readonly"), undefined);
            assert.equal(combobox.input.attr("readonly"), undefined);
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.enable(false);
            combobox.readonly();

            assert.equal(combobox.element.attr("readonly"), "readonly");
            assert.equal(combobox.element.attr("disabled"), undefined);
            assert.equal(combobox.input.attr("readonly"), "readonly");
            assert.equal(combobox.input.attr("disabled"), undefined);
            assert.isOk(combobox._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!combobox._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable(false) removes readonly attribute and default class", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.readonly();
            combobox.enable(false);

            assert.equal(combobox.element.attr("readonly"), undefined);
            assert.equal(combobox.element.attr("disabled"), "disabled");
            assert.equal(combobox.input.attr("readonly"), undefined);
            assert.equal(combobox.input.attr("disabled"), "disabled");
            assert.isOk(!combobox._inputWrapper.hasClass("k-state-default"));
            assert.isOk(combobox._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable() enables widget after readonly()", function() {
            var combobox = input.kendoComboBox().data("kendoComboBox");

            combobox.readonly();
            combobox.enable();

            assert.equal(combobox.input.attr("readonly"), undefined);
            assert.equal(combobox.input.attr("disabled"), undefined);
            assert.equal(combobox.element.attr("readonly"), undefined);
            assert.equal(combobox.element.attr("disabled"), undefined);
            assert.isOk(combobox._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!combobox._inputWrapper.hasClass("k-state-disabled"));
        });

        it("dataItem() returns null if no item is selected", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            assert.equal(combobox.selectedIndex, -1);
            assert.equal(combobox.dataItem(), null);
        });

        it("dataItem() returns dataItem of the selected LI element", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            combobox.select(1);
            assert.equal(combobox.selectedIndex, 1);
            assert.equal(combobox.dataItem(), combobox.dataSource.view()[1]);
        });

        it("dataItem() returns dataItem depending on passed index", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
            });

            assert.equal(combobox.dataItem(1), combobox.dataSource.view()[1]);
        });

        it("value(value) calls dataSource.fetch when element is disabled", function() {
            var combobox = new ComboBox(input.attr("disabled", true), {
                autoBind: false
            });

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.value("1");

            assert.equal(combobox.dataSource.calls("fetch"), 1);
        });

        it("value(value) calls dataSource.fetch if no data", function() {
            var combobox = new ComboBox(input, {
                autoBind: false
            });

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.value("1");

            assert.equal(combobox.dataSource.calls("fetch"), 1);
        });

        it("value method with 0 argument calls dataSource.fetch if no data", function() {
            var combobox = new ComboBox(input, {
                autoBind: false
            });

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.value(0);

            assert.equal(combobox.dataSource.calls("fetch"), 1);
        });

        it("value(value) does not initiate second Ajax request", function() {
            $.mockjaxSettings.responseTime = 1000; //TODO: set it to 0
            $.mockjaxSettings.contentType = "text/html";
            $.mockjax({ url: "fake.json", responseText: [] });

            var combobox = new ComboBox(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: { url: "fake.json", dataType: "json" }
                    }
                }
            });

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.dataSource.fetch();
            combobox.value("1");

            assert.equal(combobox.dataSource.calls("fetch"), 1);

            $.mockjax.clear();
        });

        it("value('') clears selection and do not fetch", function() {
            var combobox = new ComboBox(input);

            stub(combobox.dataSource, {
                fetch: combobox.dataSource.fetch
            });

            combobox.value("");

            assert.equal(combobox.selectedIndex, -1);
            assert.equal(combobox.dataSource.calls("fetch"), 0);
        });

        it("ComboBox does not select correct item after filter() and value()", function() {
            var combobox = new ComboBox(input, {
                dataSource: ["Item1", "Item2"],
                filter: "contains"
            });

            combobox.search("item1");
            combobox.close();

            combobox.value("Item1");

            combobox.open();

            assert.isOk(combobox.ul.children(":first").hasClass("k-state-selected"));
        });

        it("ComboBox filter after value method is used", function(done) {
            var combobox = new ComboBox(input, {
                dataSource: ["Item1", "Item2"],
                filter: "contains",
                delay: 0
            });

            stub(combobox, {
                search: combobox.search
            });

            //simulate search
            combobox._prev = "i";
            combobox.value("");

            combobox.input.val("i");
            combobox._search();

            setTimeout(function() {
                assert.equal(combobox.calls("search"), 1);
                done();
            });
        });

        it("value method selects item that exists only in unfiltered source", function() {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "contains"
            });

            combobox.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            combobox.value(2);

            assert.equal(combobox.value(), "2");
            assert.equal(combobox.text(), "bar");
        });

        it("value method selects item that exists only in unfiltered source (async)", function(done) {
            var combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                filter: "startswith",
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

            combobox.one("dataBound", function() {
                combobox.dataSource.filter({
                    field: "text",
                    operator: "contains",
                    value: "foo"
                });

                combobox.one("dataBound", function() {
                    combobox.value(2);

                    combobox.one("dataBound", function() {
                        assert.equal(combobox.value(), "2");
                        assert.equal(combobox.text(), "bar");
                        done();
                    });
                });
            });
        });

        it("value method keeps datasource filters if widget filtration is not enabled", function() {
            combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "none"
            });

            combobox.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            combobox.value(1);

            var filter = combobox.dataSource.filter();
            filter = filter.filters[0];

            assert.isOk(filter);
            assert.equal(filter.value, "foo");
        });

        it("value method sets text if it has been cleared", function() {
            combobox = new ComboBox(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "none"
            });

            combobox.value(1);
            combobox.text("");

            combobox.value(1);

            assert.equal(combobox.text(), "foo");
        });

        it("ComboBox does not change text if custom value is equal to options.value", function() {
            var combobox = new ComboBox(input, {
                dataSource: ["Item1", "Item2"],
                filter: "contains",
                autoBind: false,
                value: "value",
                text: "text"
            });

            combobox.value("value");

            assert.equal(combobox.value(), "value");
            assert.equal(combobox.text(), "text");
        });


        it("ComboBox displays text with pageSize", function() {
            var combobox = new ComboBox(input, {
                autoWidth: true,
                dataTextField: "ProductName",
                dataValueField: "ProductID",
                minLenght: 3,
                filter: "contains",
                dataSource: {
                    pageSize: 2,
                    transport: {
                        read: function(options) {
                            options.success([
                                { ProductName: "Chai", ProductID: 1 },
                                { ProductName: "Tofu", ProductID: 2 },
                                { ProductName: "Test3", ProductID: 3 },
                                { ProductName: "Chai3", ProductID: 4 },
                                { ProductName: "Test4", ProductID: 5 }
                            ]);
                        }
                    }
                }
            });

            combobox.search("te");
            combobox.open();
            combobox.select(0);
            combobox.input.blur();
            combobox.open();
            assert.equal(combobox.text(), "Test3");
        });

        it("ComboBox clears selected value even when text option is set to empty string", function() {
            var combobox = new ComboBox(input, {
                animation: false,
                dataTextField: 'text',
                dataValueField: 'value',
                filter: 'contains',
                autoBind: false,
                ignoreCase: true,
                suggest: false,
                highLightFirst: true,
                value: '',
                text: '',
                dataSource: [
                    { text: "User1", value: "1" },
                    { text: "User2", value: "2" },
                    { text: "User3", value: "3" },
                    { text: "User4", value: "4" }
                ]
            });

            combobox.open();
            combobox.select(0);
            combobox.input.focus().val("").keydown();
            combobox.input.blur();

            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "");
        });

        it("ComboBox selects new item even though text is equal to text option", function() {
            var combobox = new ComboBox(input, {
                animation: false,
                dataTextField: 'text',
                dataValueField: 'value',
                autoBind: false,
                value: '1',
                text: 'User1',
                dataSource: [
                    { text: "User1", value: "1" },
                    { text: "User2", value: "2" },
                    { text: "User3", value: "3" },
                    { text: "User4", value: "4" }
                ]
            });

            combobox.open();
            combobox.select(2);
            combobox.input.focus().val("User1").blur();

            assert.equal(combobox.value(), "1");
            assert.equal(combobox.text(), "User1");
        });

        it("suggest method outputs word parameter", function() {
            var combobox = new ComboBox(input, {
                dataSource: ["Item1", "Item2"]
            });

            combobox.input.focus();
            combobox.suggest("item1");

            assert.equal(combobox.text(), "item1");
        });

        it("suggest method accepts a jQuery element", function() {
            var combobox = new ComboBox(input, {
                dataSource: ["Item1", "Item2"]
            });

            combobox.suggest(combobox.ul.children(":last"));

            assert.equal(combobox.text(), "Item2");
        });

        it("suggest method accepts a data item", function() {
            var combobox = new ComboBox(input, {
                dataValueField: "text",
                dataTextField: "text",
                dataSource: [{
                    text: "Item1"
                }, {
                    text: "Item2"
                }]
            });

            combobox.suggest(combobox.dataSource.data()[1]);

            assert.equal(combobox.text(), "Item2");
        });

        it("calls hideBusy on dataSource transport error", function() {
            var combobox = new ComboBox(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: function(o) {
                            o.error();
                        }
                    }
                }
            });

            stub(combobox, {
                _hideBusy: combobox._hideBusy
            });

            combobox.dataSource.read();
            assert.equal(combobox.calls("_hideBusy"), 1);
        });

        it("focus input when _clear is clicked", function() {
            var combobox = new ComboBox(input, {
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            combobox._clearValue();

            assert.equal(assert.equal(document.activeElement, combobox.input[0]));
        });

        it("show clear button", function() {
            var combobox = new ComboBox(input, {
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            assert.isOk(combobox.wrapper.find(combobox._clear).length > 0);
        });

        it("hide clear button", function() {
            var combobox = new ComboBox(input, {
                clearButton: false,
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            assert.equal(combobox.wrapper.find(combobox._clear).length, 0);
        });

        it("reset value when _clear is clicked", function() {
            var combobox = new ComboBox(input, {
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ],
                value: "2"
            });

            combobox._clear.click();
            assert.equal(combobox.value(), "");
        });

        it("reset value when _clear is clicked (equal value and text)", function() {
            select = $("<select></select>");
            var combobox = new ComboBox(select, {
                filter: "contains",
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: "name1", name: "name1" },
                    { id: "name2", name: "name2" }
                ],
                value: "name2"
            });

            combobox._clear.click();
            assert.equal(combobox.value(), "");
        });

        it("keep focus on first item when _clear is clicked", function() {
            var combobox = new ComboBox(input, {
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: 1, name: "name1" },
                    { id: 2, name: "name2" },
                    { id: 3, name: "name3" }
                ]
            });

            combobox.text("custom");
            combobox.search("custom");

            combobox.close();

            combobox._clear.click();

            combobox.open();

            assert.isOk(combobox.ul.children().eq(0).hasClass("k-state-focused"));
        });

        it("hide clear button on value reset", function() {
            select = $("<select></select>");
            var combobox = new ComboBox(select, {
                filter: "contains",
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: "name1", name: "name1" },
                    { id: "name2", name: "name2" }
                ],
                value: "name2"
            });

            combobox.value("");
            assert.isOk(combobox._clear.is(".k-hidden"));
        });

        it("show clear button on value set", function() {
            select = $("<select></select>");
            var combobox = new ComboBox(select, {
                filter: "contains",
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: "name1", name: "name1" },
                    { id: "name2", name: "name2" }
                ]
            });

            assert.isOk(combobox._clear.is(".k-hidden"));

            combobox.value("name2");

            assert.isOk(!combobox._clear.is(".k-hidden"));
        });

        it("hide clear button if readonly", function() {
            select = $("<select></select>");
            var combobox = new ComboBox(select, {
                filter: "contains",
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: "name1", name: "name1" },
                    { id: "name2", name: "name2" }
                ],
                value: "name2"
            });

            combobox.readonly();

            assert.isOk(combobox._clear.is(".k-hidden"));
        });

        it("hide clear button if disabled", function() {
            select = $("<select></select>");
            var combobox = new ComboBox(select, {
                filter: "contains",
                dataValueField: "id",
                dataTextField: "name",
                dataSource: [
                    { id: "name1", name: "name1" },
                    { id: "name2", name: "name2" }
                ],
                value: "name2"
            });

            combobox.enable(false);
            assert.isOk(combobox._clear.is(".k-hidden"));
        });

        it("setOptions method updates footer template", function() {
            var combobox = new ComboBox(input, {});

            combobox.setOptions({ footerTemplate: "footer" });

            assert.equal(combobox.footer.html(), "footer");
        });

        it("setOptions method hides footer template", function() {
            var combobox = new ComboBox(input, {
                footerTemplate: "footer"
            });

            combobox.setOptions({ footerTemplate: "" });

            assert.equal(combobox.footer, null);
        });

        it("setOptions method updates header template", function() {
            var combobox = new ComboBox(input, {});

            combobox.setOptions({ headerTemplate: "<div>header</div>" });

            assert.equal(combobox.header.html(), "header");
        });

        it("setOptions method hides footer template", function() {
            var combobox = new ComboBox(input, {
                headerTemplate: "header"
            });

            combobox.setOptions({ headerTemplate: "" });

            assert.equal(combobox.header, null);
        });

        it("setOptions method hides footer template", function() {
            var combobox = new ComboBox(input, {
                headerTemplate: "header"
            });

            combobox.setOptions({ headerTemplate: "" });

            assert.equal(combobox.header, null);
        });

        it("setOptions re-renders noDataTemplate", function() {
            var combobox = new ComboBox(input, {
                noDataTemplate: "test"
            });

            combobox.setOptions({
                noDataTemplate: "no data"
            });

            assert.equal(combobox.noData.text(), "no data");
        });

        it("setOptions removes noData template", function() {
            var combobox = new ComboBox(input, {
                noDataTemplate: "test"
            });

            combobox.setOptions({
                noDataTemplate: null
            });

            assert.equal(combobox.noData, null);
        });
        it("reset filters when _clear is clicked", function(done) {
            var combobox = new ComboBox(input, {
                filter: "startswith",
                minLength: 2,
                // enforceMinLength: true,
                dataValueField: "id",
                dataTextField: "name",
                dataSource: {
                    data: [
                        { id: 1, name: "name1" },
                        { id: 2, name: "name2" },
                        { id: 3, name: "name3" }
                    ]
                    // filter: {field: "id", value: 1, operator: "equals"}
                }
            });

            combobox.text("name");
            combobox.search("name");
            combobox.dataSource.bind("change", function() {
                assert.equal(JSON.stringify(combobox.dataSource.filter()), JSON.stringify({ "filters": [], "logic": "and" }));
                done();
            });
            combobox._clear.click();
        });
    });
}());
