(function() {

var ComboBox = kendo.ui.ComboBox;
var data = [{text: "Foo", value: 1}, {text:"Bar", value:2}, {text:"Baz", value:3}];
var CLICK = kendo.support.touch ? "touchend" : "click";
var combobox;
var input;

module("kendo.ui.ComboBox searching", {
    setup: function() {
        kendo.effects.disable();

        $.fn.press = function(key) {
            return this.trigger({ type: "keypress", keyCode: key } );
        };

        $.fn.pressKeyDown = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };

        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();

        combobox.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

function create(options) {
    combobox = input.kendoComboBox($.extend({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }, options)).data("kendoComboBox");
}

test("search focus first match", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: true,
        index: 0
    });

    combobox.text("b");
    combobox.search("b");

    ok(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

test("open popup on search and any items", function() {
    create();
    combobox.text("b");
    combobox.search("b");

    ok(combobox.popup.visible());
});

test("open popup with all items if empty input", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("");

    combobox._state = "accept";
    combobox.open();
    equal(combobox.ul.find("li").length, data.length);
});

test("open() does not rebind popup if server filtering", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: data,
            serverFiltering: true
        },
        filter: "startswith"
    });

    stub(combobox, "_selectItem");
    combobox._state = "accept"; //simulate selected item after filtering
    combobox.open();

    equal(combobox.calls("_selectItem"), 0);
});

test("search focus item if text number", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:10, value:2}]
    });

    combobox.text("1");
    combobox.search("1");

    ok(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

test("search focus item if text is 0", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
    });

    combobox.text("0");
    combobox.search("0");

    ok(combobox.ul.children().eq(1).hasClass("k-state-focused"));
});

test("focused item does not update text input value", function() {
    create();
    combobox.text("f");
    combobox.search("f");

    equal(combobox.text(), "f");
});

test("current item is not cleared on search with filter none", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
    });

    combobox.select(1);
    combobox.search("f");

    ok(combobox.current()[0]);
});

test("search should raise error if word is null", function() {
    create();
    combobox.text("");
    combobox.search("");

    ok(true);
});

test("search with no filter should open popup if any match", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false
    });

    combobox.popup.bind("open", function() {
        ok(true);
    });

    combobox.text("f");
    combobox.search("f");
});

test("search with no filter should not open if no match", 0, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false
    });

    combobox.popup.bind("open", function() {
        ok(false);
    });

    combobox.text("fooooo");
    combobox.search("fooooo");
});

test("search with no filter indicates that the filtering is started", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [],
        autoBind: false
    });

    combobox.search("fooooo");
    equal(combobox._state, "filter");
});

test("ComboBox announces end of filtration on item selection", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ["foo"],
        autoBind: false
    });

    input.focus();
    combobox.search("f");
    combobox.select(0);

    equal(combobox._state, "accept");
});

test("ComboBox announces end of filtration custom value", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: ["foo"],
        autoBind: false
    });

    input.focus();
    combobox.search("f");
    combobox.value("custom");

    equal(combobox._state, "accept");
});

test("search with startswith rebind items", function() {
    create({
        filter: "startswith"
    });
    combobox.text("f");
    combobox.search("f");

    equal(combobox.ul.children().length, 1);
});

test("search with empty input and enforceMinLength: true does not rebind items", function() {
    create({
        filter: "startswith",
        minLength: 2,
        enforceMinLength: true
    });
    combobox.text("fo");
    combobox.search("fo");

    equal(combobox.ul.children().length, 1);

    combobox.text("");
    combobox.search("");

    equal(combobox.ul.children().length, 1);
});

test("does not rebind items when enforceMinLength: true and _clear is clicked", function() {
    create({
        filter: "startswith",
        minLength: 2,
        enforceMinLength: true
    });
    combobox.text("fo");
    combobox.search("fo");

    equal(combobox.ul.children().length, 1);

    combobox._clear.click();

    equal(combobox.ul.children().length, 1);
});

test("search with filter opens drop down if any items", function() {
    create({
        filter: "startswith"
    });

    combobox.popup.bind("open", function() {
        ok(true);
    });

    combobox.text("f");
    combobox.search("f");
});

test("rebound list should use correct dataItem to update text and value", function() {
    create({
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("b");
    combobox.select(combobox.ul.children().eq(1));

    equal(combobox.ul.children().length, 2);
    equal(combobox.value(), data[2].value);
    equal(combobox.text(), data[2].text);
});

test("reopen ul after filter should show all data", function() {
    create({
        filter: "startswith"
    });

    combobox.text("b");
    combobox.search("b");

    combobox.ul.children().eq(1).click();
    combobox.open();

    equal(combobox.ul.children().length, data.length);
});

test("rebound ul should has item selected", function() {
    create({
        filter: "startswith"
    });

    combobox.open();
    combobox.text("b");
    combobox.search("b");
    combobox.ul.children().eq(1).trigger(CLICK);

    combobox.open();

    ok(combobox.current().hasClass("k-state-selected"));
});

asyncTest("typing should trigger search", 1, function() {
    create({
        filter: "startswith",
        filtering: function() {
            start();
            ok(true);
        }
    });

    combobox.input.val("f").trigger({type: "keydown", keyCode: "f".charCodeAt(0)});
});

test("dataSource.read triggered by typing does not update input value with dataItem.text", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        filter: "startswith",
        dataSource: data,
        autoBind: false
    });

    combobox.value("1");
    combobox.input.val("f");
    combobox.search("f");

    equal(combobox.input.val(), "f");
});

test("should not trigger search on TAB", 1, function() {
    create();

    stub(combobox, {
        search: combobox.search
    });

    combobox.input.val("f").pressKeyDown(kendo.keys.TAB);

    equal(combobox.calls("search"), 0);
});

test("should not trigger search on ESC", 1, function() {
    create();

    stub(combobox, {
        search: combobox.search
    });

    combobox.input.val("f").pressKeyDown(kendo.keys.ESC);

    equal(combobox.calls("search"), 0);
});

test("allow custom value", 1, function() {
    create();

    combobox.input.val("ffff").blur();

    equal(combobox.value(), "ffff");
});

test("allow custom text when sync is disabled", 2, function() {
    create({
        syncValueAndText: false
    });

    combobox.input.val("ffff").blur();

    equal(combobox.value(), "");
    equal(combobox.text(), "ffff");
});

asyncTest("do not search if text does not changed", 1, function() {
    create({
        delay: 0
    });

    stub(combobox, {
        search: combobox.search
    });

    combobox._prev = "test";
    combobox.input.val("test");
    combobox.input.pressKeyDown(kendo.keys.HOME);

    setTimeout(function() {
        start();
        equal(combobox.calls("search"), 0);
    });
});

test("highlight first item on refresh", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: false,
        filter: "startswith"
    });

    combobox.input.val("f");
    combobox.search("f");

    ok(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("refresh method highlights first item if options.highlightFirst is true", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true,
        filter: "startswith",
        highlightFirst: false
    });

    combobox.input.val("f");
    combobox.search("f");

    equal(combobox.ul.children().filter(".k-state-focused").length, 0);
});

test("no filter and highlightFirst should always focus first item", function() {
    create();
    combobox.search("");

    ok(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("no filter and highlightFirst=false should not focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false
    });

    combobox.search("");

    ok(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("failed filter should not focus first item", function() {
    create({
        highlightFirst: false
    });
    combobox.open();
    combobox.current(combobox.ul.children("li").eq(1));

    combobox.input.val("Ice");
    combobox.search("Ice");

    ok(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("startswith filter and highlightFirst should always focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith"
    });

    combobox.search("");

    ok(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("startswith filter and highlightFirst=false should not focus first item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false,
        filter: "startswith"
    });

    combobox.search("");

    ok(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("search method uses ignoreCase option", function() {
    combobox = new ComboBox(input, {
        dataSource: ["TEXT", "text"],
        ignoreCase: false,
        filter: "startswith"
    });

    combobox.search("T");

    equal(combobox.ul.children().length, 1);
    equal(combobox.ul.children().eq(0).text(), "TEXT");
});

test("search method lowers case of the filter value when ignoreCase true", 1, function() {
    combobox = new ComboBox(input, {
        autoBind: false,
        dataSource: {
            transport: {
                read: "fake url",
                parameterMap: function(options) {
                    equal(options.filter.filters[0].value, "f");
                }
            },
            serverFiltering: true
        },
        filter: "startswith",
        ignoreCase: true
    });

    combobox.search("F");
});

test("do not remove default filter expression", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    ok(combobox.dataSource.filter());
    equal(combobox.dataSource.filter().filters.length, 1);
});

test("append combobox filter expression ot the default one", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");

    ok(combobox.dataSource.filter());
    equal(combobox.dataSource.filter().filters.length, 2);
});

test("do not append combobox filter twice", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");
    combobox.search("foo2");

    equal(combobox.dataSource.filter().filters.length, 2);
});

//TODO: Fails when all tests are run. Needs to refactor
/*asyncTest("remove only combobox filter expression on rebind", 2, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [
                {text: "foo", value: "1", parent: 1},
                {text: "foo1", value: "2", parent: 1},
                {text: "foo2", value: "3", parent: 1},
                {text: "foo3", value: "4", parent: 2},
                {text: "foo4", value: "5", parent: 2},
                {text: "foo5", value: "6", parent: 3},
            ],
            filter: {
                field: "parent",
                operation: "eq",
                value: 1
            }
        },
        filter: "contains"
    });

    combobox.search("foo1");
    combobox.input.focus().blur();

    combobox.bind("dataBound", function() {
        equal(combobox.dataSource.filter().filters.length, 1);
        equal(combobox.dataSource.filter().filters[0].field, "parent");

        start();
    });

    combobox.open();
});*/

test("refresh suggests on every dataSource change", 2, function() {
    combobox = input.kendoComboBox({
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.input.val("t");
    combobox.search("t");
    combobox.input.val("3");
    combobox.search("3");

    equal(combobox.text(), "3text");
    equal(combobox.current(), null);
});

test("ComboBox ignores case when filter is disabled", 1, function() {
    combobox = input.kendoComboBox({
        dataSource: ["Text", "text", "3text"],
        ignoreCase: true, //default
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("t");
    combobox.search("t");

    equal(combobox.current().index(), 0);
});

test("ComboBox honors casing when filter is disabled", 1, function() {
    combobox = input.kendoComboBox({
        dataSource: ["Text", "text", "3text"],
        ignoreCase: false,
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("t");
    combobox.search("t");

    equal(combobox.current().index(), 1);
});

test("ComboBox sets value of the select element on rebind", 1, function() {
    kendo.destroy(QUnit.fixture);

    var select = $("<select><option value=1>Item1</option><option value=2>2Item</option></select>").appendTo(QUnit.fixture);

    combobox = select.kendoComboBox({
        filter: "contains",
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("2");
    combobox.search("2");

    //select first item after search
    combobox.ul.children().first().click();

    combobox.open();

    equal(combobox.current().index(), 1);
});

test("ComboBox does not throw exception when try to search empty DS", function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    combobox.search("12");

    ok(true);
});

asyncTest("ComboBox does not open popup if not active element", 1, function() {
    combobox = input.kendoComboBox({
        delay: 0,
        autoBind: false,
        dataSource: ["bar", "baz"],
        filter: "startswith",
        dataBound: function() {
            start();
            ok(!combobox.popup.visible());
        }
    }).data("kendoComboBox");

    combobox.input.val("b").pressKeyDown(60);
});

asyncTest("ComboBox opens popup on search", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        open: function() {
            start();
            ok(true);
        }
    });

    //simulate search
    combobox.input.focus();
    combobox.input.val("b").pressKeyDown(60);
});

test("ComboBox rebinds if after search value method is called", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains"
    });

    combobox.search("Foo");
    combobox.value("");
    combobox.close();

    combobox.open();

    equal(combobox.ul.children().length, 3);
});

asyncTest("ComboBox does not trigger search on SHIFT", 0, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        autoBind: false,
        delay: 0,
        value: "1",
        text: "Foo",
        dataBound: function() {
            ok(false);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        start();
    }, 100);
});

asyncTest("ComboBox does not trigger filtering when value is set with API", 0, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
    });

    combobox.value("1");
    combobox.one("dataBound", function() {
        ok(false);
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        start();
    }, 100);
});

asyncTest("ComboBox does not trigger filtering when set custom value", 0, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0
    });

    combobox.value("custom");
    combobox.one("dataBound", function() {
        ok(false);
    });

    combobox.input.focus().trigger({
        type: "keydown",
        shiftKey: true
    });

    setTimeout(function() {
        start();
    }, 100);
});

test("ComboBox does not fall in continuous loop after filtering", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [{
                text: "item1",
                value: 1
            }],
            filter: {
                field: "value",
                operator: "eq",
                value: 2
            }
        },
        delay: 0
    });

    combobox.dataSource.bind("change", function() {
        ok(true);
    });

    combobox.search("unknown");
});

test("ComboBox does not rebind on open if still in filter mode", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0
    });

    combobox.search("unknown");
    combobox.input.val("unknown");
    combobox.open();

    equal(combobox.ul.children().length, 0);
});

test("ComboBox keeps the user input on inital bind", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: false,
        delay: 0
    });

    combobox.input.val("unknown");
    combobox.search();

    equal(combobox.input.val(), "unknown");
});

test("text method should set custom value to already added custom option", 2, function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
        change: function() {
            equal(this.value(), values.shift());
        }
    });

    var input = combobox.input;

    input.focus().val("unknown");
    combobox.search();
    input.blur();

    input.focus().val("unknown2");
    combobox.search();
    input.blur();
});

test("text method should set custom text to already added custom option keeping value empty", 4, function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        delay: 0,
        change: function() {
            equal(this.text(), values.shift());
            equal(this.value(), "");
        },
        syncValueAndText: false
    });

    var input = combobox.input;

    input.focus().val("unknown");
    combobox.search();
    input.blur();

    input.focus().val("unknown2");
    combobox.search();
    input.blur();
});

test("keep selected value when filtered from outside", 2, function() {
    var values = ["unknown", "unknown2"];
    var select = $("<select></select>");

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        change: function() {
            equal(this.value(), values.shift());
        },
        value: 2
    });

    combobox.dataSource.filter({
        field: "text",
        operator: "eq",
        value: "none"
    });


    equal(combobox.value(), 2);
    equal(combobox.text(), "Bar");
});

asyncTest("clear selected value if search is started (filter: none)", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "none",
        value: 2
    });

    combobox.bind("open", function() {
        start();
        equal(combobox.value(), "Ba");
    });

    combobox.input.focus().val("Ba").trigger({ type: "keydown" });
});

asyncTest("search on paste", 1, function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith",
        value: 2
    });

    combobox.bind("open", function() {
        start();
        equal(combobox.listView.dataSource.view().length, 1);
    });

    combobox.input.focus().val("F").trigger({ type: "paste" });
});

test("resize popup on search when autoWidth is enabled", function(assert) {
    var data = [{text: "Foooooooooooooo", value: 1, type: "a"}, {text:"Bar", value:2, type: "b"}, {text:"Baz", value:3, type: "a"}];
    var combobox = new ComboBox(input, {
        autoWidth: true,
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        minLenght: 3,
        filter: "contains",
        dataSource: {
            serverFiltering: false,
            transport: {
                read: function(options) {
                    options.success([
                        { ProductName: "ChaiiiiiiiiiiiiiiiiiiiiiiiiiiiiiChaiiiiiiiiiiiiiiiiiiiiiiiiiiiii", ProductID: 1 },
                        { ProductName: "Tofu", ProductID: 2 },
                        { ProductName: "Test3", ProductID: 3 },
                        { ProductName: "Chai3", ProductID: 4 },
                        { ProductName: "Test4", ProductID: 5 }
                    ]);
                }
            }
        }
    });

    var done1 = assert.async();
    var done2 = assert.async();
    combobox.one("open", function() {
        assert.ok(combobox.wrapper.width() < combobox.popup.element.width());
        combobox.close();
        done1();
        combobox.one("open", function() {
            assert.ok(combobox.wrapper.width() >= combobox.popup.element.width());
            done2();
        });
        combobox.search("Tof");
    });
    combobox.search("Cha");

});

test("autoWidth adds one pixel to avoid browser pixel rounding", function(assert) {
    var combobox = new ComboBox(input, {
        autoWidth: true,
        animation:{
            open: {
                duration:0
            },
            close: {
                duration:0
            },
        },
        dataSource: {
            data: ["Short item", "An item with really, really, really, really, really, really, really, really, really, long text","Short item"]
        }
    });

    combobox.open();
    equal(combobox.popup.element.parent(".k-animation-container").width(), combobox.popup.element.outerWidth(true) + 1);
    combobox.close();
    combobox.open();
    equal(combobox.popup.element.parent(".k-animation-container").width(), combobox.popup.element.outerWidth(true) + 1);
});

test("keep popup opened on empty search result if noDataTemplate", 2, function(assert) {
    var combobox = new ComboBox(input, {
        animation: false,
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}]
    });

    combobox.search("Foo");

    ok(combobox.popup.visible());

    combobox.search("None");

    ok(combobox.popup.visible());
});

test("close popup opened on empty search result", 2, function(assert) {
    var combobox = new ComboBox(input, {
        animation: false,
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        dataSource: [{text: "Foo", value: 1 }, {text:"Bar", value:2 }, {text:"Baz", value:3}],
        noDataTemplate: ""
    });

    combobox.search("Foo");
    ok(combobox.popup.visible());

    combobox.search("None");
    ok(!combobox.popup.visible());
});

asyncTest("update popup height when no items are found", 1, function() {
    var combobox = new ComboBox(input, {
        dataSource: $.map(new Array(30), function(_, idx) { return "item" + idx.toString() }),
        filter: "contains"
    });

    combobox.open();

    var oldHeight = combobox.list.height();

    combobox.one("dataBound", function() {
        start();
        ok(combobox.list.height() < oldHeight);
    });

    combobox.input.focus().val("test").keydown();
});

test("scrolls to the matched item on open", 2, function() {
    var data = [];
    for (var i = 0; i < 50; i++) { data.push(i); }

    var combobox = new ComboBox(input, {
        dataSource: data
    });

    combobox.search("49");

    ok(combobox.ul.children().eq(49).hasClass("k-state-focused"), "item is not focused");
    ok(combobox.list.children(".k-list-scroller").scrollTop() > 200, "list is not scrolled");
});

test("concat filters with the same logic operator", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data: [{ text: "foo", value: 1 }, { text: "bar", value: 2 }, { text: "too", value: 10 }],
            filter: {
                logic: "or",
                filters: [
                    { field: "value", operator: "eq", value: 1 },
                    { field: "value", operator: "eq", value: 2 }
                ]
            }
        },
        filter: "contains"
    });

    combobox.search("to");
    combobox.search("too");

    var filters = combobox.dataSource.filter();

    equal(filters.filters[1].filters.length, 2);
    equal(!filters.filters[1].filters.filters, true);
});
})();
