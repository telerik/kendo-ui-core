(function() {
    var DropDownList = kendo.ui.DropDownList,
        data = [{text: "Foo", value: 1}, {text:"Bar", value:2}],
        SELECTED = "k-state-selected",
        keys = kendo.keys,
        dropdownlist,
        input;

    module("kendo.ui.DropDownList API", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            QUnit.fixture.find(":input").each(function() {
                var widget = $(this).data("kendoDropDownList");

                if (widget) {
                    widget.destroy();
                }
            });
        }
    });

    function createDropDownList(options) {
        if (!options) {
            options = {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{text: "foo", value: 1}, {text:2, value:2}]
            };
        }

        return new DropDownList(input, options);
    }

   test("value method should select item if exists", function() {
       dropdownlist = createDropDownList();
       dropdownlist.value("2");

       ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
       equal(dropdownlist.value(), 2);
       equal(dropdownlist.text(), 2);
   });

   test("value method should de-select the selected value if no value", function() {
       dropdownlist = createDropDownList();
       dropdownlist.select(1);
       dropdownlist.value("");

       var selectedItems = dropdownlist.ul.children(".k-state-selected");

       equal(selectedItems.length, 0);
   });

   test("value method selects item with 0 value", function() {
       dropdownlist = new DropDownList(input, {
           optionLabel: "select",
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: 1}, {text:2, value:0}]
       });

       dropdownlist.value(0);

       ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));

       equal(dropdownlist.value(), "0");
       equal(dropdownlist.text(), "2");
   });

   test("value(value) sets element value", function() {
       dropdownlist = createDropDownList();
       dropdownlist.value(2);

       equal(dropdownlist.element.val(), 2);
   });

   test("value should update the selectedIndex", function() {
       dropdownlist = createDropDownList();
       dropdownlist.value("2");

       equal(dropdownlist.selectedIndex, 1);
       equal(dropdownlist.current().index(), 1);
   });

   test("select should select item by predicate", function() {
       dropdownlist = createDropDownList();
       dropdownlist.select(function(item) {
           return item.text == 2;
       });

       ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
       equal(dropdownlist.value(), "2");
       equal(dropdownlist.text(), "2");
   });

   test("select(-1) should clear the selection", function() {
       dropdownlist = createDropDownList();
       dropdownlist.select(0);

       dropdownlist.select(-1);

       equal(dropdownlist.value(), "");
       equal(dropdownlist.text(), "");
   });

   test("select(li) should prevent raising of change event", 0, function() {
       dropdownlist = createDropDownList();
       dropdownlist.bind("change", function() {
           ok(false);
       });

       dropdownlist.select(1);
       dropdownlist.wrapper.focusout();
   });

   test("select method sets element value", function() {
       dropdownlist = createDropDownList();
       dropdownlist.select(1);

       equal(dropdownlist.element.val(), 2);
   });

   test("select() should return index", function() {
       dropdownlist = createDropDownList();
       dropdownlist.select(1);

       equal(dropdownlist.select(), 1);
   });

   test("select method passes index -1 when optionLabel is enabled", function() {
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

       equal(args[0], -1);
   });

   test("select method does not call predicate with incorrect params", 1, function() {
       dropdownlist = createDropDownList({
           index: -1,
           optionLabel: "Select...",
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{ text: "text", value: "1" }]
       });

       dropdownlist.select(function(item) {
            equal(item, dropdownlist.dataSource.data()[0]);
       });
   });

    test("open should open popup", 1, function () {
        dropdownlist = createDropDownList();
        dropdownlist.bind("open", function(){
            ok(true);
        });

        dropdownlist.open();
    });

    asyncTest("open method binds the widget and opens the popup", 1, function () {
        dropdownlist = input.kendoDropDownList({autoBind: false, dataSource: data}).data("kendoDropDownList");

        dropdownlist.bind("open", function(){
            ok(true);
            start();
        });

        dropdownlist.open();
    });

    test("open() does not initiate second Ajax request", function() {
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

        equal(dropdownlist.dataSource.calls("fetch"), 1);

        $.mockjax.clear();
    });

    test("calls hideBusy on dataSource transport error", 1, function() {
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
        equal(dropdownlist.calls("_hideBusy"), 1);
    });

    test("close should close popup", 1, function () {
        dropdownlist = createDropDownList();
        dropdownlist.bind("close", function(){
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.close();
    });

    test("text should set span html", function() {
       dropdownlist = new DropDownList(input);

        dropdownlist.text("foo");

        equal(dropdownlist.span.html(), "foo");
    });

    test("text with spaces should set span html", function() {
       dropdownlist = new DropDownList(input);

        dropdownlist.text("foo foo");

        equal(dropdownlist.span.html(), "foo foo");
    });

    test("set text to html should encode it", function() {
        dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.text("<script>alert('test');<\/script>");

        equal(dropdownlist.text(), "<script>alert('test');<\/script>");
    });

    test("text method selects correct item based on text value", function() {
        dropdownlist = input.kendoDropDownList({
            dataSource: data,
            dataTextField: "text",
            dataValueField: "value"
        }).data("kendoDropDownList");

        stub(dropdownlist, {
            valueTemplate: dropdownlist.valueTemplate
        });

        dropdownlist.text("Bar");

        equal(dropdownlist.args("valueTemplate")[0], dropdownlist.dataSource.view()[1]);
    });

    test("text method passes object to valueTemplate if no data", function() {
        dropdownlist = input.kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value"
        }).data("kendoDropDownList");

        stub(dropdownlist, {
            valueTemplate: dropdownlist.valueTemplate
        });

        dropdownlist.text("Bar");
        var data = dropdownlist.args("valueTemplate")[0];

        ok(data);
        equal(data.text, "Bar");
        equal(data.value, "");
    });

    test('enable(false) should disable dropDownList', function() {
        dropdownlist = new DropDownList(input);

        dropdownlist.enable(false);

        ok(dropdownlist._inputWrapper.hasClass('k-state-disabled'));
        ok(dropdownlist.element.attr("disabled"));
    });

    test('after enable(false) should not open popup', function() {
        dropdownlist = createDropDownList();

        var oldOpen = dropdownlist.popup.toggle, called = false;

        dropdownlist.popup.toggle = function() {called = true};

        dropdownlist.enable(false);

        dropdownlist.wrapper.click();

        ok(!called);

        dropdownlist.popup.toggle = oldOpen;
    });

    test('Disabled dropdownlist removes tabIndex', function() {
        dropdownlist = new DropDownList(input.attr("tabindex", 2));

        dropdownlist.enable(false);

        ok(!dropdownlist.wrapper.attr("tabindex"));
    });

    test('Disabled dropdownlist persists custom tabindex', function() {
        dropdownlist = new DropDownList(input.attr("tabindex", 3));

        dropdownlist.enable(false);
        dropdownlist.enable();

        equal(dropdownlist.wrapper.attr("tabindex"), 3);
    });

    test("Disabled dropdownlist does not unbind client's event handlers", 1, function() {
        dropdownlist = new DropDownList(input);

        dropdownlist.wrapper.bind("click", function() {
            ok(true);
        });

        dropdownlist.enable(false);
        dropdownlist.enable(true);

        dropdownlist.wrapper.click();
    });

    test("enable(true) removes k-state-disabled class", function() {
        dropdownlist = new DropDownList(input);
        dropdownlist.wrapper.addClass('k-state-disabled');
        dropdownlist.element.attr("disabled", true);

        dropdownlist.enable();

        ok(!dropdownlist._inputWrapper.hasClass('k-state-disabled'));
        ok(!dropdownlist.element.attr("disabled"));
    });

    test("readonly() makes  input element readonly", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();

        equal(dropdownlist.element.attr("readonly"), "readonly");
    });

    test("readonly() unbinds icon click", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();

        stub(dropdownlist, {toggle: dropdownlist.toggle});

        dropdownlist.wrapper.click();

        ok(!dropdownlist.popup.visible());
    });

    test("readonly(false) removes readonly attribute", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.readonly(false);

        equal(dropdownlist.element.attr("readonly"), undefined);
    });

    test("readonly() removes disabled attribute and disabled class", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.enable(false);
        dropdownlist.readonly();

        equal(dropdownlist.element.attr("readonly"), "readonly");
        equal(dropdownlist.element.attr("disabled"), undefined);
        ok(dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable(false) removes readonly attribute and default class", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.enable(false);

        equal(dropdownlist.element.attr("readonly"), undefined);
        equal(dropdownlist.element.attr("disabled"), "disabled");
        ok(!dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable() enables widget after readonly()", function() {
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.enable();

        equal(dropdownlist.element.attr("readonly"), undefined);
        equal(dropdownlist.element.attr("disabled"), undefined);
        ok(dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("value method should return value of the INPUT", function() {
        dropdownlist = createDropDownList();
        equal(dropdownlist.value(), input.val());
    });

    test("value method should set value of the INPUT", function() {
        dropdownlist = createDropDownList();
        dropdownlist.value(2);

        equal(dropdownlist.value(), input.val());
        equal(dropdownlist.current().index(), 1);
    });

    test("value method should return value of the SELECT", function() {
        var select = $("<select><option>Chai</option><option selected='selected'>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.value(), "Bar");
        equal(select[0].selectedIndex, 1);
    });

    test("value method should set value of the SELECT", function() {
        var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select);

        dropdownlist.value("Bar");

        equal(select[0].selectedIndex, 1);
        ok(select[0].options[1].getAttribute("selected"));
        ok(!select[0].options[0].getAttribute("selected"));
    });

    test("value method calls dataSource.fetch when element is disabled", function() {
        dropdownlist = new DropDownList(input.attr("disabled", true), {
            autoBind: false,
            optionLabel: "Select"
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("");

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value method with empty string calls dataSource.fetch if no data", function() {
        dropdownlist = new DropDownList(input, {
            autoBind: false,
            optionLabel: "Select"
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("");

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value(value) calls dataSource.fetch if no data", function() {
        dropdownlist = new DropDownList(input, {
            autoBind: false
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("1");

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value method with 0 argument calls dataSource.fetch if no data", function() {
        dropdownlist = new DropDownList(input, {
            autoBind: false
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value(0);

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value(value) does not initiate second Ajax request", function() {
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

        equal(dropdownlist.dataSource.calls("fetch"), 1);

        $.mockjax.clear();
    });

    test("value method does not fetch if widget is disabled", function() {
        dropdownlist = new DropDownList(input, {
            optionLabel: "Select"
        });

        dropdownlist.enable(false);

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("");

        equal(dropdownlist.dataSource.calls("fetch"), 0);
    });

    test("value method does not fetch if request is already started", function() {
        dropdownlist = new DropDownList(input, {
            optionLabel: "Select"
        });

        dropdownlist.dataSource.trigger("progress");

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("10");

        equal(dropdownlist.dataSource.calls("fetch"), 0);
    });

    test("value method does not fetch widget cascades", function() {
        dropdownlist = new DropDownList(input, {
            optionLabel: "Select",
            cascadeFrom: "parent"
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("10");

        equal(dropdownlist.dataSource.calls("fetch"), 0);
    });

   test("value method de-selects option label", function() {
       dropdownlist = new DropDownList(input, {
           optionLabel: "select",
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: 1}, {text:2, value:0}]
       });

       dropdownlist.value(1);

       ok(!dropdownlist.optionLabel.hasClass(SELECTED));
       ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
   });

   test("value method selects option label", function() {
       dropdownlist = new DropDownList(input, {
           optionLabel: "select",
           dataTextField: "text",
           dataValueField: "value",
           index: 1,
           dataSource: [{text: "foo", value: 1}, {text:2, value:0}]
       });

       dropdownlist.value("");

       ok(dropdownlist.optionLabel.hasClass(SELECTED));
   });

   test("value method selects item with empty string value", function() {
       dropdownlist = new DropDownList(input, {
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: ""}, {text:2, value:0}],
           value: 0
       });

       dropdownlist.value("");

       equal(dropdownlist.selectedIndex, 0);
       ok(dropdownlist.ul.children(":first").hasClass("k-state-selected"));
   });

   test("value method selects item with null value", function() {
       dropdownlist = new DropDownList(input, {
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: null}, {text:2, value:0}],
           value: 0
       });

       dropdownlist.value(null);

       equal(dropdownlist.selectedIndex, 0);
       ok(dropdownlist.ul.children(":first").hasClass("k-state-selected"));
   });

   test("value method selects item when item field is string and value is number", function() {
       dropdownlist = new DropDownList(input, {
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: "1" }, {text:2, value: "2"}]
       });

       dropdownlist.value(2);

       equal(dropdownlist.selectedIndex, 1);
       ok(dropdownlist.ul.children(":last").hasClass("k-state-selected"));
   });

   test("value method supports boolean values", function() {
       dropdownlist = new DropDownList(input, {
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: true }, {text:2, value: false}]
       });

       dropdownlist.value(false);

       equal(dropdownlist.selectedIndex, 1);
       ok(dropdownlist.ul.children(":last").hasClass("k-state-selected"));
   });

   test("value() returns value of the OPTION element", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.value(), "");

        dropdownlist.select(1);

        equal(dropdownlist.value(), "Bar");
    });

    test("value method resets default selected index (input)", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["foo", "bar", "baz"],
            autoBind: false
        });

        dropdownlist.value("");

        equal(dropdownlist.value(), "");
        equal(dropdownlist.text(), "");
        equal(dropdownlist.selectedIndex, -1);
    });

    test("value method resets default selected index (select)", function() {
        var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);

        dropdownlist = new DropDownList(select, {
            autoBind: false
        });

        dropdownlist.value("");

        equal(dropdownlist.value(), "");
        equal(dropdownlist.text(), "");
        equal(dropdownlist.selectedIndex, -1);
    });

    test("value method selects item that exists only in unfiltered source", function() {
        dropdownlist = createDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "foo", value: 1}, {text:"bar", value:2}],
            filter: "contains"
        });

        dropdownlist.dataSource.filter({
            field: "text",
            operator: "contains",
            value: "foo"
        });

        dropdownlist.value(2);

        equal(dropdownlist.value(), "2");
        equal(dropdownlist.text(), "bar");
    });

    asyncTest("value method selects item that exists only in unfiltered source (async)", 2, function() {
        dropdownlist = createDropDownList({
            filter: "startswith",
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

        dropdownlist.one("dataBound", function() {
            dropdownlist.dataSource.filter({
                field: "text",
                operator: "contains",
                value: "foo"
            });

            dropdownlist.one("dataBound", function() {
                dropdownlist.value(2);

                dropdownlist.one("dataBound", function() {
                    start();
                    equal(dropdownlist.value(), "2");
                    equal(dropdownlist.text(), "bar");
                });
            });
        });
    });

    test("value method keeps datasource filters if widget filtration is not enabled", function() {
        dropdownlist = createDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: "foo", value: 1}, {text:"bar", value:2}],
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

        ok(filter);
        equal(filter.value, "foo");
    });

    test("dataItem() returns dataItem of the selected LI on init", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.selectedIndex, 0);
        equal(dropdownlist.element[0].selectedIndex, 0);
        equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
    });

    test("dataItem() returns dataItem of the selected LI element", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select, {
            optionLabel: "Select..."
        });

        dropdownlist.select(1);
        equal(dropdownlist.selectedIndex, 1);
        equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
    });

    test("dataItem() returns an empty object if optionLabel", function() {
        var select = $("<select><option>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);

        dropdownlist = new DropDownList(select, {
            optionLabel: "Select...",
            value: ""
        });

        equal(dropdownlist.selectedIndex, 0);
        equal(dropdownlist.dataItem().text, "Select...");
    });

    test("dataItem() returns dataItem depending on passed index", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>").appendTo(QUnit.fixture);
        dropdownlist = new DropDownList(select);
        equal(dropdownlist.dataItem(1), dropdownlist.dataSource.view()[1]);
    });

    test("dataItem() returns optionLabel data item", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            optionLabel: "Select..."
        });

        equal(dropdownlist.dataItem(0), "Select...");
    });

    test("dataItem() returns optionLabel data item as ObservableObject instance", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: [
                { item: "item1" },
                { item: "item2" }
            ],
            dataTextField: "item",
            dataValueField: "item",
            optionLabel: "Select..."
        });

        ok(dropdownlist.dataItem() instanceof kendo.data.ObservableObject);
        equal(JSON.stringify(dropdownlist.dataItem().toJSON()), '{"item":""}');
    });

    test("dataItem method returns a dataItem based on LI element", function() {
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

        ok(dataItem instanceof kendo.data.ObservableObject);
        equal(JSON.stringify(dataItem.toJSON()), '{"item":"item1"}');
    });

    test("dataItem method returns a dataItem based on OptionLabel element", function() {
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

        ok(dataItem instanceof kendo.data.ObservableObject);
        equal(JSON.stringify(dataItem.toJSON()), '{"item":""}');
    });

    test("dataItem method returns options.optionLabel based on OptionLabel element", function() {
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

        ok(dataItem instanceof kendo.data.ObservableObject);
        equal(JSON.stringify(dataItem.toJSON()), '{"item":"Select...","custom":"custom"}');
    });

    test("dataItem method returns returns null if argument is null", function() {
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

        equal(dataItem, null);
    });

    test("DropDownList re-binds on dataSource.data([])", function() {
        dropdownlist = new DropDownList(input, ["item1", "item2"]);

        dropdownlist.dataSource.data([]);

        equal(dropdownlist.ul.children().length, 0);
    });

    test("DropDownList re-binds on dataSource.data([])", function() {
        dropdownlist = new DropDownList(input, ["item1", "item2"]);

        dropdownlist.dataSource.data([]);

        equal(dropdownlist.ul.children().length, 0);
    });

    test("DropDownList selects correct item if element is select", function() {
        var select = $('<select><option value="1">United Arab Emirates</option><option selected="selected" value="2">United Kingdom</option><option value="3">United States</option></select>').appendTo(QUnit.fixture);

        dropdownlist = new DropDownList(select, { optionLabel: "Select..." });

        equal(dropdownlist.value(), "2");
    });

    test("DropDownList is focused by focus method", function() {
        dropdownlist = createDropDownList();
        dropdownlist.focus();
        equal(dropdownlist.wrapper[0], document.activeElement);
    });

    asyncTest("select value after datasource fetch", 1, function() {
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
                equal(dropdownlist.value(), "item2");
                start();
            }
        });

        dropdownlist.value("item2");
    });

    test("setOptions remove filter header", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        ok(dropdownlist.filterInput);

        dropdownlist.setOptions({
            filter: "none"
        });

        ok(!dropdownlist.filterInput);
        ok(!dropdownlist.list.find(".k-textbox")[0]);
    });

    test("setOptions does not render more than one input", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        dropdownlist.setOptions({});

        var list = dropdownlist.list;

        equal(list.find(".k-textbox").length, 1);
    });

    test("setOptions hides option optionLabel", function() {
        dropdownlist = new DropDownList(input, {
            optionLabel: "Select...",
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        dropdownlist.setOptions({
            optionLabel: ""
        });

        var list = dropdownlist.list;

        equal(list.children(".k-list-optionlabel").length, 0);
    });

    test("setOptions shows option optionLabel", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        dropdownlist.setOptions({
            optionLabel: "Select..."
        });

        var list = dropdownlist.list;

        equal(list.children(".k-list-optionlabel").length, 1);
    });

    test("setOptions updates optionLabel text", function() {
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

        equal(list.children(".k-list-optionlabel").length, 1);
        equal(list.children(".k-list-optionlabel").text(), "Select");
    });

    test("setOptions selects optionLabel on add if widget's value is empty string", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        dropdownlist.value("");
        dropdownlist.setOptions({
            optionLabel: "Select..."
        });

        var current = dropdownlist.current();

        ok(current.hasClass("k-list-optionlabel"));
        ok(current.hasClass("k-state-selected"));
        equal(dropdownlist.text(), "Select...");
    });

    test("setOptions keeps selected item when optionLabel is added", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: ["item1", "item2"],
            filter: "startswith"
        });

        dropdownlist.setOptions({
            optionLabel: "Select..."
        });

        var current = dropdownlist.current();

        equal(dropdownlist.text(), "item1");
    });

    test("setOptions updates listView template when dataTextField is set", function() {
        dropdownlist = new DropDownList(input, {
            dataSource: [{ name: "item1", anotherName: "anotherItem1" }],
            dataTextField: "name",
            dataValueField: "name",
            filter: "startswith"
        });

        dropdownlist.setOptions({
            dataTextField: "anotherName"
        });


        equal(dropdownlist.listView.options.template, "#:data.anotherName#");
    });

    test("setDataSource does not trigger cascade event of the parent widget", 0, function() {
        var parent = $("<input id='parent' />").appendTo(QUnit.fixture).kendoDropDownList().data("kendoDropDownList");

        dropdownlist = new DropDownList(input, {
            cascadeFrom: "parent"
        });

        parent.bind("cascade", function() {
            ok(false);
        });

        dropdownlist.setDataSource({
            data: ["item1", "item2"]
        });
    });

    test("setting source with setDataSource after widget is bound does not preselect first item", 2, function() {
        dropdownlist = new DropDownList(input, { });

        dropdownlist.setDataSource({
            data: ["item1", "item2"]
        });

        equal(dropdownlist.select(), -1);
        equal(dropdownlist.value(), "");
    });

    test("Open popup when option label is defined", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: [],
            optionLabel: "Select..."
        });

        dropdownlist.open();

        ok(dropdownlist.popup.visible());
    });

    test("Open popup when option label is defined and widget is not bound", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: [],
            optionLabel: "Select...",
            autoBind: false
        });

        dropdownlist.open();

        ok(dropdownlist.popup.visible());
    });

    test("Open popup when filter is enabled event if data source is empty", 1, function() {
        var dropdownlist = new DropDownList(input, {
            dataSource: [],
            filter: "contains"
        });

        dropdownlist.open();

        ok(dropdownlist.popup.visible());
    });

    test("hasOptionLabel method returns true if optionLabel is defined", 1, function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select",
            dataSource: [],
            filter: "contains"
        });

        ok(dropdownlist.hasOptionLabel());
    });

    test("hasOptionLabel method returns false if optionLabel is removed", 1, function() {
        var dropdownlist = new DropDownList(input, {
            optionLabel: "Select",
            dataSource: [],
            filter: "contains"
        });

        dropdownlist.setOptions({ optionLabel: "" });

        ok(!dropdownlist.hasOptionLabel());
    });
})();
