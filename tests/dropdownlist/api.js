(function() {
    var DropDownList = kendo.ui.DropDownList,
        data = [{ text: "Foo", value: 1 }, { text: "Bar", value: 2 }],
        SELECTED = "k-state-selected",
        keys = kendo.keys,
        dropdownlist,
        input;

    describe("kendo.ui.DropDownList API", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });

        afterEach(function() {
            Mocha.fixture.find(":input").each(function() {
                var widget = $(this).data("kendoDropDownList");

                if (widget) {
                    widget.destroy();
                }
            });
        });

        function createDropDownList(options) {
            if (!options) {
                options = {
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 2 }]
                };
            }

            return new DropDownList(input, options);
        }

        it("value method should select item if exists", function() {
            dropdownlist = createDropDownList();
            dropdownlist.value("2");

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(dropdownlist.value(), 2);
            assert.equal(dropdownlist.text(), 2);
        });

        it("change is not triggered on blur after value()", function() {
            dropdownlist = createDropDownList({
                change: function () {
                    assert.isOk(false);
                }
            });
            dropdownlist.value("2");

            dropdownlist._blur();
        });

        it("value method should select optionLabel if it does not exist", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "select",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 0 }]
            });

            dropdownlist.value(3);

            assert.equal(dropdownlist.text(), "select");
        });

        it("value method should de-select the selected value if no value", function() {
            dropdownlist = createDropDownList();
            dropdownlist.select(1);
            dropdownlist.value("");

            var selectedItems = dropdownlist.ul.children(".k-state-selected");

            assert.equal(selectedItems.length, 0);
        });

        it("value method selects item with 0 value", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "select",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 0 }]
            });

            dropdownlist.value(0);

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));

            assert.equal(dropdownlist.value(), "0");
            assert.equal(dropdownlist.text(), "2");
        });

        it("value(value) sets element value", function() {
            dropdownlist = createDropDownList();
            dropdownlist.value(2);

            assert.equal(dropdownlist.element.val(), 2);
        });

        it("value should update the selectedIndex", function() {
            dropdownlist = createDropDownList();
            dropdownlist.value("2");

            assert.equal(dropdownlist.selectedIndex, 1);
            assert.equal(dropdownlist.current().index(), 1);
        });

        it("select should select item by predicate", function() {
            dropdownlist = createDropDownList();
            dropdownlist.select(function(item) {
                return item.text == 2;
            });

            assert.isOk(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
            assert.equal(dropdownlist.value(), "2");
            assert.equal(dropdownlist.text(), "2");
        });

        it("select(-1) should clear the selection", function() {
            dropdownlist = createDropDownList();
            dropdownlist.select(0);

            dropdownlist.select(-1);

            assert.equal(dropdownlist.value(), "");
            assert.equal(dropdownlist.text(), "");
        });

        it("select(li) should prevent raising of change event", function() {
            dropdownlist = createDropDownList();
            dropdownlist.bind("change", function() {
                assert.isOk(false);
            });

            dropdownlist.select(1);
            dropdownlist.wrapper.focusout();
        });

        it("select method sets element value", function() {
            dropdownlist = createDropDownList();
            dropdownlist.select(1);

            assert.equal(dropdownlist.element.val(), 2);
        });

        it("select() should return index", function() {
            dropdownlist = createDropDownList();
            dropdownlist.select(1);

            assert.equal(dropdownlist.select(), 1);
        });

        it("select method passes index -1 when optionLabel is enabled", function() {
            dropdownlist = createDropDownList({
                index: -1,
                optionLabel: "Select...",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: data
            });

            var listView = dropdownlist.listView;

            stub(listView, {
                select: listView.select
            });

            dropdownlist.select(-1);

            var args = listView.args("select", 0);

            assert.equal(args[0], -1);
        });

        it("select method does not call predicate with incorrect params", function() {
            dropdownlist = createDropDownList({
                index: -1,
                optionLabel: "Select...",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "text", value: "1" }]
            });

            dropdownlist.select(function(item) {
                assert.equal(item, dropdownlist.dataSource.data()[0]);
            });
        });

        it("open should open popup", function() {
            dropdownlist = createDropDownList();
            dropdownlist.bind("open", function() {
                assert.isOk(true);
            });

            dropdownlist.open();
        });

        it("open method binds the widget and opens the popup", function(done) {
            dropdownlist = input.kendoDropDownList({ autoBind: false, dataSource: data }).data("kendoDropDownList");

            dropdownlist.bind("open", function() {
                assert.isOk(true);
                done();
            });

            dropdownlist.open();
        });

        it("open() does not initiate second Ajax request", function() {
            $.mockjaxSettings.responseTime = 1000;
            $.mockjaxSettings.contentType = "application/json";
            $.mockjax({ url: "fake.json", responseText: '[]' });

            dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: { url: "fake.json", type: "json" }
                    }
                }
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.dataSource.fetch();
            dropdownlist.open();

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);

            $.mockjax.clear();
        });

        it("calls hideBusy on dataSource transport error", function() {
            dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: function(o) {
                            o.error();
                        }
                    }
                }
            });

            stub(dropdownlist, {
                _hideBusy: dropdownlist._hideBusy
            });

            dropdownlist.dataSource.read();
            assert.equal(dropdownlist.calls("_hideBusy"), 1);
        });

        it("close should close popup", function() {
            dropdownlist = createDropDownList();
            dropdownlist.bind("close", function() {
                assert.isOk(true);
            });

            dropdownlist.open();
            dropdownlist.close();
        });

        it("text should set span html", function() {
            dropdownlist = new DropDownList(input);

            dropdownlist.text("foo");

            assert.equal(dropdownlist.span.html(), "foo");
        });

        it("text with spaces should set span html", function() {
            dropdownlist = new DropDownList(input);

            dropdownlist.text("foo foo");

            assert.equal(dropdownlist.span.html(), "foo foo");
        });

        it("set text to html should encode it", function() {
            dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

            dropdownlist.text("<script>alert('test');<\/script>");

            assert.equal(dropdownlist.text(), "<script>alert('test');<\/script>");
        });

        it("text method selects correct item based on text value", function() {
            dropdownlist = input.kendoDropDownList({
                dataSource: data,
                dataTextField: "text",
                dataValueField: "value"
            }).data("kendoDropDownList");

            stub(dropdownlist, {
                valueTemplate: dropdownlist.valueTemplate
            });

            dropdownlist.text("Bar");

            assert.equal(dropdownlist.args("valueTemplate")[0], dropdownlist.dataSource.view()[1]);
        });

        it("text method passes object to valueTemplate if no data", function() {
            dropdownlist = input.kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value"
            }).data("kendoDropDownList");

            stub(dropdownlist, {
                valueTemplate: dropdownlist.valueTemplate
            });

            dropdownlist.text("Bar");
            var data = dropdownlist.args("valueTemplate")[0];

            assert.isOk(data);
            assert.equal(data.text, "Bar");
            assert.equal(data.value, "");
        });

        it("text method passes optionLabel text to the template", function() {
            dropdownlist = input.kendoDropDownList({
                optionLabel: "test",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "Chai", value: 1 }],
                value: 1
            }).data("kendoDropDownList");

            dropdownlist.text(null);

            assert.equal(dropdownlist.text(), "test");
        });

        it('enable(false) should disable dropDownList', function() {
            dropdownlist = new DropDownList(input);

            dropdownlist.enable(false);

            assert.isOk(dropdownlist._inputWrapper.hasClass('k-state-disabled'));
            assert.isOk(dropdownlist.element.attr("disabled"));
        });

        it('after enable(false) should not open popup', function() {
            dropdownlist = createDropDownList();

            var oldOpen = dropdownlist.popup.toggle, called = false;

            dropdownlist.popup.toggle = function() { called = true };

            dropdownlist.enable(false);

            dropdownlist.wrapper.click();

            assert.isOk(!called);

            dropdownlist.popup.toggle = oldOpen;
        });

        it('Disabled dropdownlist removes tabIndex', function() {
            dropdownlist = new DropDownList(input.attr("tabindex", 2));

            dropdownlist.enable(false);

            assert.isOk(!dropdownlist.wrapper.attr("tabindex"));
        });

        it('Disabled dropdownlist persists custom tabindex', function() {
            dropdownlist = new DropDownList(input.attr("tabindex", 3));

            dropdownlist.enable(false);
            dropdownlist.enable();

            assert.equal(dropdownlist.wrapper.attr("tabindex"), 3);
        });

        it("Disabled dropdownlist does not unbind client's event handlers", function() {
            dropdownlist = new DropDownList(input);

            dropdownlist.wrapper.bind("click", function() {
                assert.isOk(true);
            });

            dropdownlist.enable(false);
            dropdownlist.enable(true);

            dropdownlist.wrapper.click();
        });

        it("enable(true) removes k-state-disabled class", function() {
            dropdownlist = new DropDownList(input);
            dropdownlist.wrapper.addClass('k-state-disabled');
            dropdownlist.element.attr("disabled", true);

            dropdownlist.enable();

            assert.isOk(!dropdownlist._inputWrapper.hasClass('k-state-disabled'));
            assert.isOk(!dropdownlist.element.attr("disabled"));
        });

        it("readonly() makes  input element readonly", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.readonly();

            assert.equal(dropdownlist.element.attr("readonly"), "readonly");
        });

        it("readonly() unbinds icon click", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.readonly();

            stub(dropdownlist, { toggle: dropdownlist.toggle });

            dropdownlist.wrapper.click();

            assert.isOk(!dropdownlist.popup.visible());
        });

        it("readonly(false) removes readonly attribute", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.readonly();
            dropdownlist.readonly(false);

            assert.equal(dropdownlist.element.attr("readonly"), undefined);
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.enable(false);
            dropdownlist.readonly();

            assert.equal(dropdownlist.element.attr("readonly"), "readonly");
            assert.equal(dropdownlist.element.attr("disabled"), undefined);
            assert.isOk(dropdownlist._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable(false) removes readonly attribute and default class", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.readonly();
            dropdownlist.enable(false);

            assert.equal(dropdownlist.element.attr("readonly"), undefined);
            assert.equal(dropdownlist.element.attr("disabled"), "disabled");
            assert.isOk(!dropdownlist._inputWrapper.hasClass("k-state-default"));
            assert.isOk(dropdownlist._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable() enables widget after readonly()", function() {
            dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

            dropdownlist.readonly();
            dropdownlist.enable();

            assert.equal(dropdownlist.element.attr("readonly"), undefined);
            assert.equal(dropdownlist.element.attr("disabled"), undefined);
            assert.isOk(dropdownlist._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
        });

        it("value method should return value of the INPUT", function() {
            dropdownlist = createDropDownList();
            assert.equal(dropdownlist.value(), input.val());
        });

        it("value method should set value of the INPUT", function() {
            dropdownlist = createDropDownList();
            dropdownlist.value(2);

            assert.equal(dropdownlist.value(), input.val());
            assert.equal(dropdownlist.current().index(), 1);
        });

        it("value method should return value of the SELECT", function() {
            var select = $("<select><option>Chai</option><option selected='selected'>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);

            assert.equal(dropdownlist.value(), "Bar");
            assert.equal(select[0].selectedIndex, 1);
        });

        it("value method should set value of the SELECT", function() {
            var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);

            dropdownlist.value("Bar");

            assert.equal(select[0].selectedIndex, 1);

            assert.isOk(!select[0].options[0].selected);
            assert.isOk(select[0].options[1].selected);
        });

        it("value method should update only OPTION selected property", function() {
            var select = $("<select><option selected>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);

            dropdownlist.value("Bar");

            assert.isOk(select[0].options[0].getAttribute("selected"));
            assert.isOk(!select[0].options[0].selected);

            assert.isOk(!select[0].options[1].getAttribute("selected"));
            assert.isOk(select[0].options[1].selected);
        });

        it("value method calls dataSource.fetch when element is disabled", function() {
            dropdownlist = new DropDownList(input.attr("disabled", true), {
                autoBind: false,
                optionLabel: "Select"
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);
        });

        it("value method with empty string calls dataSource.fetch if no data", function() {
            dropdownlist = new DropDownList(input, {
                autoBind: false,
                optionLabel: "Select"
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);
        });

        it("value(value) calls dataSource.fetch if no data", function() {
            dropdownlist = new DropDownList(input, {
                autoBind: false
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("1");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);
        });

        it("value method with 0 argument calls dataSource.fetch if no data", function() {
            dropdownlist = new DropDownList(input, {
                autoBind: false
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value(0);

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);
        });

        it("value(value) does not initiate second Ajax request", function() {
            $.mockjaxSettings.responseTime = 1000;
            $.mockjaxSettings.contentType = "application/json";
            $.mockjax({ url: "fake.json", responseText: '[]' });

            dropdownlist = new DropDownList(input, {
                autoBind: false,
                dataSource: {
                    transport: {
                        read: { url: "fake.json", type: "json" }
                    }
                }
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.dataSource.fetch();
            dropdownlist.value("1");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 1);

            $.mockjax.clear();
        });

        it("value method does not fetch if widget is disabled", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "Select"
            });

            dropdownlist.enable(false);

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 0);
        });

        it("value method does not fetch if request is already started", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "Select"
            });

            dropdownlist.dataSource.trigger("progress");

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("10");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 0);
        });

        it("value method does not fetch widget cascades", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "Select",
                cascadeFrom: "parent"
            });

            stub(dropdownlist.dataSource, {
                fetch: dropdownlist.dataSource.fetch
            });

            dropdownlist.value("10");

            assert.equal(dropdownlist.dataSource.calls("fetch"), 0);
        });

        it("value method de-selects option label", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "select",
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 0 }]
            });

            dropdownlist.value(1);

            assert.isOk(!dropdownlist.optionLabel.hasClass(SELECTED));
            assert.isOk(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
        });

        it("value method selects option label", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "select",
                dataTextField: "text",
                dataValueField: "value",
                index: 1,
                dataSource: [{ text: "foo", value: 1 }, { text: 2, value: 0 }]
            });

            dropdownlist.value("");

            assert.isOk(dropdownlist.optionLabel.hasClass(SELECTED));
        });

        it("value method selects item with empty string value", function() {
            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: "" }, { text: 2, value: 0 }],
                value: 0
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.selectedIndex, 0);
            assert.isOk(dropdownlist.ul.children(":first").hasClass("k-state-selected"));
        });

        it("value method selects item with null value", function() {
            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: null }, { text: 2, value: 0 }],
                value: 0
            });

            dropdownlist.value(null);

            assert.equal(dropdownlist.selectedIndex, 0);
            assert.isOk(dropdownlist.ul.children(":first").hasClass("k-state-selected"));
        });

        it("value method selects item when item field is string and value is number", function() {
            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: "1" }, { text: 2, value: "2" }]
            });

            dropdownlist.value(2);

            assert.equal(dropdownlist.selectedIndex, 1);
            assert.isOk(dropdownlist.ul.children(":last").hasClass("k-state-selected"));
        });

        it("value method supports boolean values", function() {
            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: true }, { text: 2, value: false }]
            });

            dropdownlist.value(false);

            assert.equal(dropdownlist.selectedIndex, 1);
            assert.isOk(dropdownlist.ul.children(":last").hasClass("k-state-selected"));
        });

        it("value() returns value of the OPTION element", function() {
            var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);

            assert.equal(dropdownlist.value(), "");

            dropdownlist.select(1);

            assert.equal(dropdownlist.value(), "Bar");
        });

        it("value method resets default selected index (input)", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["foo", "bar", "baz"],
                autoBind: false
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.value(), "");
            assert.equal(dropdownlist.text(), "");
            assert.equal(dropdownlist.selectedIndex, -1);
        });

        it("value method resets default selected index (select)", function() {
            var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);

            dropdownlist = new DropDownList(select, {
                autoBind: false
            });

            dropdownlist.value("");

            assert.equal(dropdownlist.value(), "");
            assert.equal(dropdownlist.text(), "");
            assert.equal(dropdownlist.selectedIndex, -1);
        });

        it("value method selects item that exists only in unfiltered source", function() {
            dropdownlist = createDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "contains"
            });

            dropdownlist.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            dropdownlist.value(2);

            assert.equal(dropdownlist.value(), "2");
            assert.equal(dropdownlist.text(), "bar");
        });

        it("value method selects item that exists only in unfiltered source (async)", function(done) {
            dropdownlist = createDropDownList({
                filter: "startswith",
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

            dropdownlist.one("dataBound", function() {
                dropdownlist.dataSource.filter({
                    field: "text",
                    operator: "contains",
                    value: "foo"
                });

                dropdownlist.one("dataBound", function() {
                    dropdownlist.value(2);

                    dropdownlist.one("dataBound", function() {
                        assert.equal(dropdownlist.value(), "2");
                        assert.equal(dropdownlist.text(), "bar");
                        done();
                    });
                });
            });
        });

        it("value method keeps datasource filters if widget filtration is not enabled", function() {
            dropdownlist = createDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }],
                filter: "none"
            });

            dropdownlist.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            dropdownlist.value(1);

            var filter = dropdownlist.dataSource.filter();
            filter = filter.filters[0];

            assert.isOk(filter);
            assert.equal(filter.value, "foo");
        });

        it("dataItem() returns dataItem of the selected LI on init", function() {
            var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);

            assert.equal(dropdownlist.selectedIndex, 0);
            assert.equal(dropdownlist.element[0].selectedIndex, 0);
            assert.equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
        });

        it("dataItem() returns dataItem of the selected LI element", function() {
            var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select, {
                optionLabel: "Select..."
            });

            dropdownlist.select(1);
            assert.equal(dropdownlist.selectedIndex, 1);
            assert.equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
        });

        it("dataItem() returns an empty object if optionLabel", function() {
            var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);

            dropdownlist = new DropDownList(select, {
                optionLabel: "Select...",
                value: ""
            });

            assert.equal(dropdownlist.selectedIndex, 0);
            assert.equal(dropdownlist.dataItem().text, "Select...");
        });

        it("dataItem() returns dataItem depending on passed index", function() {
            var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(Mocha.fixture);
            dropdownlist = new DropDownList(select);
            assert.equal(dropdownlist.dataItem(1), dropdownlist.dataSource.view()[1]);
        });

        it("dataItem() returns optionLabel data item", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                optionLabel: "Select..."
            });

            assert.equal(dropdownlist.dataItem(0), "Select...");
        });

        it("dataItem() returns optionLabel data item as ObservableObject instance", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            assert.isOk(dropdownlist.dataItem() instanceof kendo.data.ObservableObject);
            assert.equal(JSON.stringify(dropdownlist.dataItem().toJSON()), '{"item":""}');
        });

        it("dataItem method returns a dataItem based on LI element", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            var dataItem = dropdownlist.dataItem(dropdownlist.ul.children(":first"));

            assert.isOk(dataItem instanceof kendo.data.ObservableObject);
            assert.equal(JSON.stringify(dataItem.toJSON()), '{"item":"item1"}');
        });

        it("dataItem method returns a dataItem based on OptionLabel element", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: "Select..."
            });

            var dataItem = dropdownlist.dataItem(dropdownlist.optionLabel);

            assert.isOk(dataItem instanceof kendo.data.ObservableObject);
            assert.equal(JSON.stringify(dataItem.toJSON()), '{"item":""}');
        });

        it("dataItem method returns options.optionLabel based on OptionLabel element", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: {
                    item: "Select...",
                    custom: "custom"
                }
            });

            var dataItem = dropdownlist.dataItem(dropdownlist.optionLabel);

            assert.isOk(dataItem instanceof kendo.data.ObservableObject);
            assert.equal(JSON.stringify(dataItem.toJSON()), '{"item":"Select...","custom":"custom"}');
        });

        it("dataItem method returns returns null if argument is null", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [
                    { item: "item1" },
                    { item: "item2" }
                ],
                dataTextField: "item",
                dataValueField: "item",
                optionLabel: {
                    item: "Select...",
                    custom: "custom"
                }
            });

            var dataItem = dropdownlist.dataItem(null);

            assert.equal(dataItem, null);
        });

        it("DropDownList re-binds on dataSource.data([])", function() {
            dropdownlist = new DropDownList(input, ["item1", "item2"]);

            dropdownlist.dataSource.data([]);

            assert.equal(dropdownlist.ul.children().length, 0);
        });

        it("DropDownList re-binds on dataSource.data([])", function() {
            dropdownlist = new DropDownList(input, ["item1", "item2"]);

            dropdownlist.dataSource.data([]);

            assert.equal(dropdownlist.ul.children().length, 0);
        });

        it("DropDownList selects correct item if element is select", function() {
            var select = $('<select><option value="1">United Arab Emirates</option><option selected="selected" value="2">United Kingdom</option><option value="3">United States</option></select>').appendTo(Mocha.fixture);

            dropdownlist = new DropDownList(select, { optionLabel: "Select..." });

            assert.equal(dropdownlist.value(), "2");
        });

        it("DropDownList is focused by focus method", function() {
            dropdownlist = createDropDownList();
            dropdownlist.focus();
            assert.equal(dropdownlist.wrapper[0], document.activeElement);
        });

        it("select value after datasource fetch", function(done) {
            $.mockjaxSettings.responseTime = 0;
            $.mockjaxSettings.contentType = "application/json";
            $.mockjax({ url: "fake.json", responseText: '["item1", "item2"]' });

            dropdownlist = new DropDownList(input, {
                optionLabel: "Select",
                dataSource: {
                    transport: {
                        read: { url: "fake.json", type: "json" }
                    }
                },
                dataBound: function() {
                    $.mockjax.clear();
                    assert.equal(dropdownlist.value(), "item2");
                    done();
                }
            });

            dropdownlist.value("item2");
        });

        it("setOptions remove filter header", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            assert.isOk(dropdownlist.filterInput);

            dropdownlist.setOptions({
                filter: "none"
            });

            assert.isOk(!dropdownlist.filterInput);
            assert.isOk(!dropdownlist.list.find(".k-textbox")[0]);
        });

        it("setOptions does not render more than one input", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.setOptions({});

            var list = dropdownlist.list;

            assert.equal(list.find(".k-textbox").length, 1);
        });

        it("setOptions hides option optionLabel", function() {
            dropdownlist = new DropDownList(input, {
                optionLabel: "Select...",
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.setOptions({
                optionLabel: ""
            });

            var list = dropdownlist.list;

            assert.equal(list.children(".k-list-optionlabel").length, 0);
        });

        it("setOptions shows option optionLabel", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.setOptions({
                optionLabel: "Select..."
            });

            var list = dropdownlist.list;

            assert.equal(list.children(".k-list-optionlabel").length, 1);
        });

        it("setOptions updates optionLabel text", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.setOptions({
                optionLabel: "Select..."
            });

            dropdownlist.setOptions({
                optionLabel: "Select"
            });

            var list = dropdownlist.list;

            assert.equal(list.children(".k-list-optionlabel").length, 1);
            assert.equal(list.children(".k-list-optionlabel").text(), "Select");
        });

        it("setOptions selects optionLabel on add if widget's value is empty string", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.value("");
            dropdownlist.setOptions({
                optionLabel: "Select..."
            });

            var current = dropdownlist.current();

            assert.isOk(current.hasClass("k-list-optionlabel"));
            assert.isOk(current.hasClass("k-state-selected"));
            assert.equal(dropdownlist.text(), "Select...");
        });

        it("setOptions keeps selected item when optionLabel is added", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1", "item2"],
                filter: "startswith"
            });

            dropdownlist.setOptions({
                optionLabel: "Select..."
            });

            var current = dropdownlist.current();

            assert.equal(dropdownlist.text(), "item1");
        });

        it("setOptions updates listView template when dataTextField is set", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
                dataTextField: "name",
                dataValueField: "name",
                filter: "startswith"
            });

            dropdownlist.setOptions({
                dataTextField: "anotherName"
            });


            assert.equal(dropdownlist.listView.options.template, "#:data.anotherName#");
        });

        it("setDataSource does not trigger cascade event of the parent widget", function() {
            var parent = $("<input id='parent' />").appendTo(Mocha.fixture).kendoDropDownList().data("kendoDropDownList");

            dropdownlist = new DropDownList(input, {
                cascadeFrom: "parent"
            });

            parent.bind("cascade", function() {
                assert.isOk(false);
            });

            dropdownlist.setDataSource({
                data: ["item1", "item2"]
            });
        });

        it("setting source with setDataSource after widget is bound does not preselect first item", function() {
            dropdownlist = new DropDownList(input, {});

            dropdownlist.setDataSource({
                data: ["item1", "item2"]
            });

            assert.equal(dropdownlist.select(), -1);
            assert.equal(dropdownlist.value(), "");
        });

        it("first item is highlighted after setting source with setDataSource", function() {
            dropdownlist = new DropDownList(input, {
                dataSource: ["item1.1", "item1.2"],
                highlightFirst: true
            });

            dropdownlist.setDataSource(
                ["item1", "item2"]
            );

            dropdownlist.open();

            assert.isOk(dropdownlist.ul.children().first().hasClass("k-state-focused"));
        });

        it("Open popup when option label is defined", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [],
                optionLabel: "Select..."
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("Open popup when option label is defined and widget is not bound", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [],
                optionLabel: "Select...",
                autoBind: false
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("Open popup when filter is enabled event if data source is empty", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: [],
                filter: "contains"
            });

            dropdownlist.open();

            assert.isOk(dropdownlist.popup.visible());
        });

        it("hasOptionLabel method returns true if optionLabel is defined", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select",
                dataSource: [],
                filter: "contains"
            });

            assert.isOk(dropdownlist.hasOptionLabel());
        });

        it("hasOptionLabel method returns false if optionLabel is removed", function() {
            var dropdownlist = new DropDownList(input, {
                optionLabel: "Select",
                dataSource: [],
                filter: "contains"
            });

            dropdownlist.setOptions({ optionLabel: "" });

            assert.isOk(!dropdownlist.hasOptionLabel());
        });

        it("setOptions method updates footer template", function() {
            var dropdownlist = new DropDownList(input, {});

            dropdownlist.setOptions({ footerTemplate: "footer" });

            assert.equal(dropdownlist.footer.html(), "footer");
        });

        it("setOptions method hides footer template", function() {
            var dropdownlist = new DropDownList(input, {
                footerTemplate: "footer"
            });

            dropdownlist.setOptions({ footerTemplate: "" });

            assert.equal(dropdownlist.footer, null);
        });

        it("setOptions method updates header template", function() {
            var dropdownlist = new DropDownList(input, {});

            dropdownlist.setOptions({ headerTemplate: "<div>header</div>" });

            assert.equal(dropdownlist.header.html(), "header");
        });

        it("setOptions method hides footer template", function() {
            var dropdownlist = new DropDownList(input, {
                headerTemplate: "header"
            });

            dropdownlist.setOptions({ headerTemplate: "" });

            assert.equal(dropdownlist.header, null);
        });

        it("setOptions re-renders noDataTemplate", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "test"
            });

            dropdownlist.setOptions({
                noDataTemplate: "no data"
            });

            assert.equal(dropdownlist.noData.text(), "no data");
        });

        it("setOptions removes noData template", function() {
            var dropdownlist = new DropDownList(input, {
                noDataTemplate: "test"
            });

            dropdownlist.setOptions({
                noDataTemplate: null
            });

            assert.equal(dropdownlist.noData, null);
        });

        it("open, close and refresh - the popup should be closed", function() {
            var dropdownlist = new DropDownList(input, {
                dataSource: ["Apples", "Oranges"],
                animation: false
            });

            dropdownlist.open();
            dropdownlist.close();
            dropdownlist.refresh();

            assert.equal(dropdownlist.popup.visible(), false);
        });
    });
}());
