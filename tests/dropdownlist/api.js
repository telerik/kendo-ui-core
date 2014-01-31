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

            dropdownlist = new DropDownList(input, {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{text: "foo", value: 1}, {text:2, value:2}]
            });
        },

        teardown: function() {
            dropdownlist.destroy();
        }
    });

    test("value method should select item if exists", function() {
        dropdownlist.value("2");

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        equal(dropdownlist.value(), 2);
        equal(dropdownlist.text(), 2);
        equal(dropdownlist._old, 2);
   });

   test("value method should select first if no such value", function() {
       dropdownlist.select(1);
       dropdownlist.value("");

       ok(dropdownlist.ul.children().eq(0).hasClass(SELECTED));
       equal(dropdownlist.value(), "1");
       equal(dropdownlist.text(), "foo");
       equal(dropdownlist._old, 1);
   });

   test("value method selects item with 0 value", function() {
       dropdownlist.destroy();
       dropdownlist = new DropDownList(input, {
           optionLabel: "select",
           dataTextField: "text",
           dataValueField: "value",
           dataSource: [{text: "foo", value: 1}, {text:2, value:0}]
       });

       dropdownlist.value(0);

       ok(dropdownlist.ul.children().eq(2).hasClass(SELECTED));

       equal(dropdownlist.value(), "0");
       equal(dropdownlist.text(), "2");
       equal(dropdownlist._old, "0");
   });

   test("value(value) should call _accessor", function() {
       stub(dropdownlist, "_accessor");

       dropdownlist.value(2);

       ok(dropdownlist.calls("_accessor"));
   });

   test("value should update the selectedIndex", function() {
        dropdownlist.value("2");

        equal(dropdownlist.selectedIndex, 1);
        equal(dropdownlist.current().index(), 1);
   });

   test("select should select item by predicate", function() {
        dropdownlist.select(function(item) {
            return item.text == 2;
        });

        ok(dropdownlist.ul.children().eq(1).hasClass(SELECTED));
        equal(dropdownlist.value(), "2");
        equal(dropdownlist.text(), "2");
    });

    test("select(-1) should not select anything", function() {
        dropdownlist.select(0);

        dropdownlist.select(-1);

        equal(dropdownlist.value(), "1");
        equal(dropdownlist.text(), "foo");
    });

    test("select(li) should prevent raising of change event", 0, function() {
        dropdownlist.bind("change", function() {
            ok(false);
        });

        dropdownlist.select(1);
        dropdownlist._change();
    });

    test("select should call _accessor", function() {
        stub(dropdownlist, "_accessor");

        dropdownlist.select(1);

        ok(dropdownlist.calls("_accessor"));
    });

    test("select() should return index", function() {
        dropdownlist.select(1);

        equal(dropdownlist.select(), 1);
    });

    asyncTest("open should call _scroll method", 1, function () {
        dropdownlist._scroll = function() { ok(true); start(); };
        dropdownlist.open();
    });

    test("open should open popup", 1, function () {
        dropdownlist.bind("open", function(){
            ok(true);
        });

        dropdownlist.open();
    });

    asyncTest("open method binds the widget and opens the popup", 1, function () {
        dropdownlist.destroy();
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

       dropdownlist.destroy();
       dropdownlist = new DropDownList($("<input />"), {
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

        $.mockjaxClear();
    });

    test("close should close popup", 1, function () {
        dropdownlist.bind("close", function(){
            ok(true);
        });

        dropdownlist.open();
        dropdownlist.close();
    });

    test("text should set span html", function() {
       dropdownlist.destroy();
       dropdownlist = new DropDownList(input);

        dropdownlist.text("foo");

        equal(dropdownlist.span.html(), "foo");
    });

    test("text with spaces should set span html", function() {
       dropdownlist.destroy();
       dropdownlist = new DropDownList(input);

        dropdownlist.text("foo foo");

        equal(dropdownlist.span.html(), "foo foo");
    });

    test("set text to html should encode it", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList(data).data("kendoDropDownList");

        dropdownlist.text("<script>alert('test');<\/script>");

        equal(dropdownlist.text(), "<script>alert('test');<\/script>");
    });

    test("text method selects correct item based on text value", function() {
        dropdownlist.destroy();
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
        dropdownlist.destroy();
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
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input);

        dropdownlist.enable(false);

        ok(dropdownlist._inputWrapper.hasClass('k-state-disabled'));
        ok(dropdownlist.element.attr("disabled"));
    });

    test('after enable(false) should not open popup', function() {
        var oldOpen = dropdownlist.popup.toggle, called = false;

        dropdownlist.popup.toggle = function() {called = true};

        dropdownlist.enable(false);

        dropdownlist.wrapper.click();

        ok(!called);

        dropdownlist.popup.toggle = oldOpen;
    });

    test('Disabled dropdownlist removes tabIndex', function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input.attr("tabindex", 2));

        dropdownlist.enable(false);

        ok(!dropdownlist.wrapper.attr("tabindex"));
    });

    test('Disabled dropdownlist persists custom tabindex', function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList($("<input tabindex='3' />"));

        dropdownlist.enable(false);
        dropdownlist.enable();

        equal(dropdownlist.wrapper.attr("tabindex"), 3);
    });

    test("Disabled dropdownlist does not unbind client's event handlers", 1, function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input);

        dropdownlist.wrapper.bind("click", function() {
            ok(true);
        });

        dropdownlist.enable(false);
        dropdownlist.enable(true);

        dropdownlist.wrapper.click();
    });

    test("enable(true) removes k-state-disabled class", function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input);
        dropdownlist.wrapper.addClass('k-state-disabled');
        dropdownlist.element.attr("disabled", true);

        dropdownlist.enable();

        ok(!dropdownlist._inputWrapper.hasClass('k-state-disabled'));
        ok(!dropdownlist.element.attr("disabled"));
    });

    test("readonly() makes  input element readonly", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();

        equal(dropdownlist.element.attr("readonly"), "readonly");
    });

    test("readonly() unbinds icon click", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();

        stub(dropdownlist, {toggle: dropdownlist.toggle});

        dropdownlist.wrapper.click();

        ok(!dropdownlist.popup.visible());
    });

    test("readonly(false) removes readonly attribute", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.readonly(false);

        equal(dropdownlist.element.attr("readonly"), undefined);
    });

    test("readonly() removes disabled attribute and disabled class", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.enable(false);
        dropdownlist.readonly();

        equal(dropdownlist.element.attr("readonly"), "readonly");
        equal(dropdownlist.element.attr("disabled"), undefined);
        ok(dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable(false) removes readonly attribute and default class", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.enable(false);

        equal(dropdownlist.element.attr("readonly"), undefined);
        equal(dropdownlist.element.attr("disabled"), "disabled");
        ok(!dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable() enables widget after readonly()", function() {
        dropdownlist.destroy();
        dropdownlist = input.kendoDropDownList().data("kendoDropDownList");

        dropdownlist.readonly();
        dropdownlist.enable();

        equal(dropdownlist.element.attr("readonly"), undefined);
        equal(dropdownlist.element.attr("disabled"), undefined);
        ok(dropdownlist._inputWrapper.hasClass("k-state-default"));
        ok(!dropdownlist._inputWrapper.hasClass("k-state-disabled"));
    });

    test("_accessor should return value of the INPUT", function() {
        equal(dropdownlist.value(), input.val());
    });

    test("_accessor should set value of the INPUT", function() {
        dropdownlist.value(2);

        equal(dropdownlist.value(), input.val());
        equal(dropdownlist.current().index(), 1);
    });

    test("_accessor should return value of the SELECT", function() {
        var select = $("<select><option>Chai</option><option selected='selected'>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.value(), "Bar");
        equal(select[0].selectedIndex, 1);
    });

    test("_accessor should set value of the SELECT", function() {
        var select = $("<select><option>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select);

        dropdownlist.value("Bar");

        equal(select[0].selectedIndex, 1);
        ok(select[0].options[1].getAttribute("selected"));
        ok(!select[0].options[0].getAttribute("selected"));
    });

    test("value method with empty string calls dataSource.fetch if no data", function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input, {
            optionLabel: "Select"
        });

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("");

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value(value) calls dataSource.fetch if no data", function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input);

        stub(dropdownlist.dataSource, {
            fetch: dropdownlist.dataSource.fetch
        });

        dropdownlist.value("1");

        equal(dropdownlist.dataSource.calls("fetch"), 1);
    });

    test("value method with 0 argument calls dataSource.fetch if no data", function() {
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input);

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

        dropdownlist.destroy();
        dropdownlist = new DropDownList($("<input />"), {
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

        $.mockjaxClear();
    });

    test("value method does not fetch if widget is disabled", function() {
        dropdownlist.destroy();
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
        dropdownlist.destroy();
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
        dropdownlist.destroy();
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

    test("value() returns value of the OPTION element", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.value(), "");
        dropdownlist.select(1);
        equal(dropdownlist.value(), "Bar");
    });

    test("dataItem() returns dataItem of the selected LI on init", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select);

        equal(dropdownlist.selectedIndex, 0);
        equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
    });

    test("dataItem() returns dataItem of the selected LI element", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select, {
            optionLabel: "Select..."
        });

        dropdownlist.select(1);
        equal(dropdownlist.selectedIndex, 1);
        equal(dropdownlist.dataItem(), dropdownlist.dataSource.view()[0]);
    });

    test("dataItem() returns empty object if optionLabel", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select, {
            optionLabel: "Select..."
        });

        equal(dropdownlist.selectedIndex, 0);
        equal(dropdownlist.dataItem().text, dropdownlist._data()[0].text);
    });

    test("dataItem() returns dataItem depending on passed index", function() {
        var select = $("<select><option value=''>Chai</option><option>Bar</option></select>");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select);
        equal(dropdownlist.dataItem(1), dropdownlist.dataSource.view()[1]);
    });

    test("DropDownList re-binds on dataSource.data([])", function() {
        var input = $("<input />");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input, ["item1", "item2"]);

        dropdownlist.dataSource.data([]);

        equal(dropdownlist.ul.children().length, 0);
    });

    test("DropDownList re-binds on dataSource.data([])", function() {
        var input = $("<input />");
        dropdownlist.destroy();
        dropdownlist = new DropDownList(input, ["item1", "item2"]);

        dropdownlist.dataSource.data([]);

        equal(dropdownlist.ul.children().length, 0);
    });

    test("DropDownList selects correct item if element is select", function() {
        var select = $('<select><option value="1">United Arab Emirates</option><option selected="selected" value="2">United Kingdom</option><option value="3">United States</option></select>');
        dropdownlist.destroy();
        dropdownlist = new DropDownList(select, { optionLabel: "Select..." });

        equal(dropdownlist.value(), "2");
    });

    test("DropDownList is focused by focus method", function() {
        dropdownlist.focus();
        equal(dropdownlist.wrapper[0], document.activeElement);
    });

    asyncTest("select value after datasource fetch", 1, function() {
        $.mockjaxSettings.responseTime = 0;
        $.mockjaxSettings.contentType = "application/json";
        $.mockjax({ url: "fake.json", responseText: '["item1", "item2"]' });

        dropdownlist.destroy();
        dropdownlist = new DropDownList($("<input />"), {
            optionLabel: "Select",
            dataSource: {
                transport: {
                    read: { url: "fake.json", type: "json" }
                }
            },
            dataBound: function() {
                $.mockjaxClear();
                equal(dropdownlist.value(), "item2");
                start();
            }
        });

        dropdownlist.value("item2");
    });

})();
