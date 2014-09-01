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

        combobox = input.kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: data
        }).data("kendoComboBox");

    },
    teardown: function() {
        kendo.effects.enable();

        combobox.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("search focus first match", function() {
    combobox.destroy();
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
    combobox.text("b");
    combobox.search("b");

    ok(combobox.popup.visible());
});

test("open popup with all items if empty input", function() {
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.text("f");
    combobox.search("f");

    equal(combobox.text(), "f");
});

test("current item is not cleared on search with filter none", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "Foo", value: 1}, {text:0, value:2}]
    });

    combobox.select(1);
    combobox.search("f");

    ok(combobox._current);
});

test("search should raise error if word is null", function() {
    combobox.text("");
    combobox.search("");

    ok(true);
});

test("search with no filter should open popup if any match", 1, function() {
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.options.filter = "startswith";
    combobox.text("f");
    combobox.search("f");

    equal(combobox.ul.children().length, 1);
});

test("search with filter opens drop down if any items", function() {
    combobox.popup.bind("open", function() {
        ok(true);
    });

    combobox.options.filter = "startswith";
    combobox.text("f");
    combobox.search("f");
});

test("rebound list should use correct dataItem to update text and value", function() {
    combobox.options.filter = "startswith";
    combobox.text("b");
    combobox.search("b");
    combobox._focus(combobox.ul.children().eq(1));

    equal(combobox.ul.children().length, 2);
    equal(combobox.value(), data[2].value);
    equal(combobox.text(), data[2].text);
});

test("reopen ul after filter should show all data", function() {
    combobox.options.filter = "startswith";
    combobox.text("b");
    combobox.search("b");
    combobox._focus(combobox.ul.children().eq(1));
    combobox._state = "accept";

    combobox.open();

    equal(combobox.ul.children().length, data.length);
    ok(combobox._current.hasClass("k-state-selected"));
});

test("rebound ul should has item selected", function() {
    combobox.options.filter = "startswith";
    combobox.open();
    combobox.text("b");
    combobox.search("b");
    combobox.ul.children().eq(1).trigger(CLICK);

    combobox.open();

    equal(combobox.ul.children().length, data.length);
});

test("typing should trigger search", 1, function() {
    combobox._search = function() {
        ok(true);
    }

    combobox.input.val("f").trigger({type: "keydown", keyCode: "f".charCodeAt(0)});
});

test("dataSource.read triggered by typing does not update input value with dataItem.text", function() {
    combobox.destroy();
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

test("should not trigger search on TAB", 0, function() {
    combobox.search = function() {
        ok(true)
    };

    combobox.input.val("f").pressKeyDown(kendo.keys.TAB);
});

test("should not trigger search on ESC", 0, function() {

    combobox.search = function() {
        ok(true);
    };

    combobox.input.val("f").pressKeyDown(kendo.keys.ESC);
});

test("allow custom value", 1, function() {
    combobox._selected = combobox._current = null;

    combobox.input.val("ffff").blur();

    equal(combobox.value(), "ffff");
});

test("do not search if text does not changed", 0, function() {
    combobox.search = function() { ok(false); };

    combobox._prev = "test";
    combobox.input.val("test");
    combobox.input.pressKeyDown(kendo.keys.HOME);
});

test("highlight first item on refresh", function() {
    combobox.destroy();
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
    combobox.destroy();
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

    combobox.search("");

    ok(combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("no filter and highlightFirst=false should not focus first item", function() {
    combobox.destroy();
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
    combobox.open();
    combobox.current(combobox.ul.children("li").eq(1));

    combobox.input.val("Ice");
    combobox.search("Ice");

    ok(!combobox.ul.children().eq(0).hasClass("k-state-focused"));
});

test("startswith filter and highlightFirst should always focus first item", function() {
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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

test("remove only combobox filter expression on rebind", function() {
    combobox.destroy();
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
    combobox.open();

    ok(combobox.dataSource.filter());
    equal(combobox.dataSource.filter().filters.length, 1);
    equal(combobox.dataSource.filter().filters[0].field, "parent");
});

test("refresh suggests on every dataSource change", 2, function() {
    combobox.destroy();
    combobox = input.kendoComboBox({
        dataSource: ["text", "Text", "3text"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("t");
    combobox.search("t");
    combobox.input.val("3");
    combobox.search("3");

    equal(combobox.text(), "3text");
    equal(combobox.current(), null);
});

test("ComboBox ignores case when filter is disabled", 1, function() {
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
    QUnit.fixture.html("");

    var select = $("<select><option value=1>Item1</option><option value=2>2Item</option></select>").appendTo(QUnit.fixture);

    combobox = select.kendoComboBox({
        filter: "contains",
        delay: 0
    }).data("kendoComboBox");

    combobox.input.val("2");
    combobox.search("2");

    //select first item after search
    combobox._accept(combobox.ul[0].children[0]);

    combobox.open();

    equal(combobox.current().index(), 1);
});

test("ComboBox does not throw exception when try to search empty DS", function() {
    combobox.destroy();
    combobox = input.kendoComboBox().data("kendoComboBox");

    combobox.search("12");

    ok(true);
});

asyncTest("ComboBox does not open popup if not active element", 1, function() {
    combobox.destroy();
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

    combobox._search("b");
});

test("ComboBox opens popup on search", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        autoBind: true,
        index: 0
    });

    stub(combobox, {
        toggle: combobox.toggle
    });

    //simulate search
    combobox._typing = 80;
    combobox._open = true;
    combobox.input.focus();

    combobox.refresh();

    equal(combobox.calls("toggle"), 1);
    equal(combobox.args("toggle", 0)[0], true);
});

test("ComboBox rebinds if after search value method is called", function() {
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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
    combobox.destroy();
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

})();
