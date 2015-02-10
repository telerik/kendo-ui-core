(function () {

var ComboBox = kendo.ui.ComboBox;
var data = [{text: "Foo", value: 1}, {text:"Bar", value:2}];
var CLICK = kendo.support.touch ? "touchend" : "click";
var SELECTED = "k-state-selected";
var keys = kendo.keys;
var combobox;
var input;

module("kendo.ui.ComboBox selection", {
    setup: function() {
        kendo.effects.disable();

        $.fn.press = function(key) {
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

test("pressing alt + down should open popup", 1, function() {
    combobox.popup.bind("open", function(){
        ok(true);
    });

    combobox.input.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.DOWN});
});

test("pressing alt + up should close popup", 1, function() {
    combobox.popup.bind("close", function(){
        ok(true);
    });
    combobox.open();

    combobox.input.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.UP});
});

test("click _arrow should input", 1, function() {
    combobox.input.bind("focus", function(){
        ok(true);
    });

    combobox._arrow.trigger(CLICK);
});

test("select item depending on the options.index", function() {
    combobox.destroy();

    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "foo", value: 1}, {text:2, value:2}],
        index: 1
    });

    ok(combobox.ul.children().eq(1).hasClass(SELECTED));
});

test("click first li should update text and value", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    });

    combobox.open();
    combobox.ul.children().eq(1).trigger(CLICK);

    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].value);
});

test("click li should remove readonly css", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        placeholder: "select"
    });

    combobox.open();
    combobox.ul.children().eq(1).trigger(CLICK);

    equal(combobox.text(), data[1].text);
    ok(!combobox.input.hasClass("k-readonly"));
});

test("value should be set to item.text if no item.value", function() {
    var localData = [{text: "Foo", value: 1}, {text:"Bar"}];

    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: localData
    });

    combobox.select(1);

    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].text);
});

test("select li should update text and value", function() {
    combobox.dataSource.read();
    combobox.select(combobox.ul.children().eq(1));

    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].value);
});

test("click li should close popup", 1, function() {
    combobox.popup.bind("close", function(){
        ok(true);
    });

    combobox.popup.open();
    combobox.ul.children().eq(1).trigger(CLICK);
});

test("select should select li by index", function() {
    combobox.dataSource.read();
    combobox.select(1);

    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].value);
});

test("selected should be persisted", function(){
    combobox.dataSource.read();
    combobox.select(1);

    combobox._arrow.trigger(CLICK);

    ok(combobox.ul.children().eq(1).hasClass(SELECTED));
});

test("only one li should be selected at a time", function(){
    combobox.dataSource.read();
    combobox.select(1);
    combobox.select(0);

    combobox._arrow.trigger(CLICK);

    equal(combobox.ul.children("." + SELECTED).length, 1);
});

test("press down _arrow should focus next item and update text and value", function() {
    combobox.dataSource.read();
    combobox.select(0);
    combobox.input.focus().press(keys.DOWN);

    ok(combobox.ul.children().eq(1).hasClass(SELECTED));
    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].value);

});

test("press down _arrow when last item is selected should not do anything", function() {
    combobox.dataSource.read();
    combobox.select(combobox.ul.children(":last"));
    combobox.input.focus().press(keys.DOWN);

    ok(combobox.ul.children().eq(1).hasClass(SELECTED));
    equal(combobox.text(), data[1].text);
    equal(combobox.value(), data[1].value);
});

test("press up _arrow should focus prev item and update text and value", function() {
    combobox.dataSource.read();

    combobox.select(1);
    combobox.input.focus().press(keys.UP);

    ok(combobox.ul.children().eq(0).hasClass(SELECTED));
    equal(combobox.text(), data[0].text);
    equal(combobox.value(), data[0].value);

});

test("press up _arrow when first item is selected should not do anything", function() {
    combobox.dataSource.read();
    combobox.select(0);
    combobox.input.focus().press(keys.UP);

    ok(combobox.ul.children().eq(0).hasClass(SELECTED));
    equal(combobox.text(), data[0].text);
    equal(combobox.value(), data[0].value);
});

test("press down selects only LI which is focused", function() {
    combobox.options.filter = "startswith";
    combobox.dataSource.read();

    combobox.value("1");
    combobox.search("F");
    combobox.input.focus().press(keys.DOWN);

    ok(combobox.ul.children().eq(0).hasClass(SELECTED));
});

test("press enter should close popup when no change in selection", 1, function() {
    combobox.popup.bind("close", function(){
        ok(true);
    });

    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().press(keys.ENTER);
});

test("press enter should call preventDefault when popup is visible", 1, function() {
    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: keys.ENTER,
        preventDefault: function() {
            ok(true);
        }
    });
});

test("press enter accepts user value before the filtration has been completed", 1, function() {
    var input = combobox.input;

    input.focus().val("12");
    combobox._search();

    input.trigger({
        type: "keydown",
        keyCode: keys.ENTER
    });

    equal(combobox.value(), "12");
});

test("press esc should close popup when no change in selection", 1, function() {
    combobox.popup.bind("close", function(){
        ok(true);
    });

    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().press(keys.ESC);
});

test("pressing enter calls _blur", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    });

    combobox.open();

    combobox._blur = function(li) {
        ok(true);
    };

    combobox._current = combobox.ul.children().first();
    combobox.input.focus().press(kendo.keys.ENTER);
});

test("empty input should clear focused item", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false,
        delay: 0
    });

    combobox.dataSource.query();
    combobox.select(combobox.ul.children(":last"));

    stub(combobox, {
        current: combobox.current
    });

    var origin = window.setTimeout;
    window.setTimeout = function(func) { func() };

    combobox.input.val("").focus().press(keys.BACKSPACE);

    equal(combobox.calls("current"), 1);
    equal(combobox.args("current")[0], null);

    window.setTimeout = origin;
});

test("ComboBox does not set value if autoBind:false and text property", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        autoBind: false,
        text: "Test",
        dataSource: ["foo"]
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.TAB
    });

    equal(combobox.value(), "");
});

test("ComboBox selects first item on down arrow even when it is highlighted", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["foo"]
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    equal(combobox.value(), "foo");
});

test("ComboBox selects next after search", function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"]
    });

    combobox.search("bar");

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    equal(combobox.value(), "baz");
});

test("ComboBox bind widget on DOWN arrow", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false,
        dataBound: function() {
            ok(true);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
});

test("ComboBox selects first item on DOWN arrow and autoBind: false", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    equal(combobox.select(), 0);
});

test("ComboBox bind widget on UP arrow", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false,
        dataBound: function() {
            ok(true);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP
    });
});

test("Empty comboBox does not raise exception on navigate", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: [],
        text: "Test",
        value: "1",
        autoBind: false
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP
    });

    ok(true);
});

test("Empty combobox does not select first focused item on ENTER", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        dataSource: ["Item1", "Item2"],
    });

    combobox.input.focus();

    combobox.open();
    combobox.input.val("");
    combobox.close();

    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });

    equal(combobox.value(), "");
});

test("ComboBox does not focus if refresh is called after blur", 1, function() {
    combobox.destroy();
    combobox = new ComboBox(input, {
        autoBind: false,
        dataSource: ["Item1", "Item2"],
    });

    combobox.open();

    notEqual(document.activeElement, combobox.input[0]);
});

asyncTest("clearing custom value does not re-enter the old value", 1, function() {
    combobox.options.delay = 0;
    combobox.options.filter = "startswith";
    combobox.dataSource.read();

    combobox.value("test");
    combobox.input.focus().val("").press(keys.BACKSPACE);

    setTimeout(function() {
        start();
        equal(combobox.input.val(), "", "input is not cleared");
    });
});

asyncTest("clearing custom value does not re-enter the old value (SELECT)", 1, function() {
    var select = $("<select />").appendTo(QUnit.fixture);
    var selectCombo = select.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith",
        delay: 0
    }).data("kendoComboBox");

    selectCombo.dataSource.read();

    selectCombo.value("test");
    selectCombo.input.focus().val("").press(keys.BACKSPACE);

    setTimeout(function() {
        start();
        equal(selectCombo.input.val(), "", "input is not cleared");

        selectCombo.destroy();
        kendo.destroy(QUnit.fixture);
    });
});

test("ComboBox selects an item on ENTER after search ", 1, function() {
    var input = combobox.input;

    input.focus();
    //open
    input.trigger({
        type: "keydown",
        altKey: true
    });

    input.trigger({
        type: "keydown",
        altKey: true,
        keyCode: keys.DOWN
    });

    combobox.bind("change", function() {
        equal(combobox.select(), 0);
    });

    input.trigger({
        type: "keydown",
        keyCode: keys.ENTER
    });
});

test("ComboBox does not focus input if mobile device", 1, function() {
    var origin = kendo.support.touch;
    var input = combobox.input;

    kendo.support.touch = true;

    combobox.wrapper.find(".k-icon").click();

    notEqual(combobox.input[0], document.activeElement);
});

})();
