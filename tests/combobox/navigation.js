(function () {

var ComboBox = kendo.ui.ComboBox;
var data = [{text: "Foo", value: 1}, {text:"Bar", value:2}];
var CLICK = kendo.support.touch ? "touchend" : "click";
var SELECTED = "k-state-selected";
var FOCUSED = "k-state-focused";
var keys = kendo.keys;
var combobox;
var input;

describe("kendo.ui.ComboBox selection", function () {
    beforeEach(function() {


        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        };

        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        combobox.destroy();
        kendo.destroy(Mocha.fixture);
    });

function create(options) {
    combobox = input.kendoComboBox($.extend({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }, options)).data("kendoComboBox");
}

var getData = function(length) {
    var result = [];
    for(var idx=0; idx < length; idx++) {
        result.push("item" + idx);
    }
    return result;
};

it("pressing alt + down should open popup", function() {
    create();
    combobox.popup.bind("open", function(){
        assert.isOk(true);
    });

    combobox.input.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.DOWN});
});

it("pressing alt + up should close popup", function() {
    create();
    combobox.popup.bind("close", function(){
        assert.isOk(true);
    });
    combobox.open();

    combobox.input.trigger({type: "keydown", altKey: true, keyCode: kendo.keys.UP});
});

it("_arrow click should focus the input", function() {
    create();

    combobox._arrow.click();

    assert.equal(combobox.input[0], kendo._activeElement());
});

it("select item depending on the options.index", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: "foo", value: 1}, {text:2, value:2}],
        index: 1
    });

    assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
});

it("click first li should update text and value", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    });

    combobox.open();
    combobox.ul.children().eq(1).trigger(CLICK);

    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].value);
});

it("click li should remove readonly css", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        placeholder: "select"
    });

    combobox.open();
    combobox.ul.children().eq(1).trigger(CLICK);

    assert.equal(combobox.text(), data[1].text);
    assert.isOk(!combobox.input.hasClass("k-readonly"));
});

it("value should be set to item.text if no item.value", function() {
    var localData = [{text: "Foo", value: 1}, {text:"Bar"}];

    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: localData
    });

    combobox.select(1);

    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].text);
});

it("select li should update text and value", function() {
    create();
    combobox.select(combobox.ul.children().eq(1));

    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].value);
});

it("click li should close popup", function() {
    create();
    combobox.popup.bind("close", function(){
        assert.isOk(true);
    });

    combobox.popup.open();
    combobox.ul.children().eq(1).trigger(CLICK);
});

it("select should select li by index", function() {
    create();
    combobox.select(1);

    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].value);
});

it("selected should be persisted", function(){
    create();
    combobox.select(1);

    combobox._arrow.trigger(CLICK);

    assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
});

it("only one li should be selected at a time", function(){
    create();
    combobox.select(1);
    combobox.select(0);

    combobox._arrow.trigger(CLICK);

    assert.equal(combobox.ul.children("." + SELECTED).length, 1);
});

it("press down _arrow should focus next item and update text and value", function() {
    create();
    combobox.select(0);
    combobox.input.focus().press(keys.DOWN);

    assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].value);

});

it("press down _arrow when last item is selected should not do anything", function() {
    create();
    combobox.select(combobox.ul.children(":last"));
    combobox.input.focus().press(keys.DOWN);

    assert.isOk(combobox.ul.children().eq(1).hasClass(SELECTED));
    assert.equal(combobox.text(), data[1].text);
    assert.equal(combobox.value(), data[1].value);
});

it("press up _arrow should focus prev item and update text and value", function() {
    create();

    combobox.select(1);
    combobox.input.focus().press(keys.UP);

    assert.isOk(combobox.ul.children().eq(0).hasClass(SELECTED));
    assert.equal(combobox.text(), data[0].text);
    assert.equal(combobox.value(), data[0].value);

});

it("press up _arrow when first item is selected should not do anything", function() {
    create();
    combobox.select(0);
    combobox.input.focus().press(keys.UP);

    assert.isOk(combobox.ul.children().eq(0).hasClass(SELECTED));
    assert.equal(combobox.text(), data[0].text);
    assert.equal(combobox.value(), data[0].value);
});

it("press down selects only LI which is focused", function() {
    create({
        filter: "startswith"
    });

    combobox.value("1");
    combobox.search("B");
    combobox.input.focus().press(keys.DOWN);

    assert.isOk(combobox.ul.children().eq(0).hasClass(SELECTED));
});

it("press enter should close popup when no change in selection", function() {
    create();
    combobox.popup.bind("close", function(){
        assert.isOk(true);
    });

    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().press(keys.ENTER);
});

it("press Tab should close popup when no change in selection", function() {
    create();
    combobox.popup.bind("close", function(){
        assert.isOk(true);
    });

    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().press(keys.TAB);
});

it("press Tab should call _blur only when open", function() {
    create();

    var comboboxSpy = spy(combobox, "_blur");

    combobox.select(0);
    combobox.input.focus().press(keys.TAB);
    assert.equal(comboboxSpy.calls("_blur"), 0);
});

it("press enter should call preventDefault when popup is visible", function() {
    create();
    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: keys.ENTER,
        preventDefault: function() {
            assert.isOk(true);
        }
    });
});

it("press Tab should call preventDefault when popup is visible", function() {
    create();
    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: keys.TAB,
        preventDefault: function() {
            assert.isOk(true);
        }
    });
});

it("press enter accepts user value before the filtration has been completed", function() {
    create();

    var input = combobox.input;

    input.focus().val("12");

    //start search
    input.trigger({
        type: "keydown"
    });

    input.trigger({
        type: "keydown",
        keyCode: keys.ENTER
    });

    assert.equal(combobox.value(), "12");
});

it("press esc should close popup when no change in selection", function() {
    create();
    combobox.popup.bind("close", function(){
        assert.isOk(true);
    });

    combobox.popup.open();

    combobox.select(0);
    combobox.input.focus().press(keys.ESC);
});

it("pressing enter selects an item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        change: function() {
            assert.isOk(combobox.current().hasClass("k-state-selected"));
        }
    });

    combobox.open();

    combobox.current(combobox.ul.children().first());
    combobox.input.focus().press(kendo.keys.ENTER);
});

it("pressing Tab selects an item", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        change: function() {
            assert.isOk(combobox.current().hasClass("k-state-selected"));
        }
    });

    combobox.open();

    combobox.current(combobox.ul.children().first());
    combobox.input.focus().press(kendo.keys.TAB);
});

it("empty input should clear focused item", function(done) {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        highlightFirst: false,
        delay: 0
    });

    combobox.select(combobox.ul.children(":last"));

    combobox.input.val("").focus().press(keys.BACKSPACE);

    setTimeout(function() {
        assert.equal(combobox.current(), null);
        done();
    });
});

it("ComboBox does not set value if autoBind:false and text property", function() {
    combobox = new ComboBox(input, {
        autoBind: false,
        text: "Test",
        dataSource: ["foo"]
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.ESC
    });

    assert.equal(combobox.value(), "");
});

it("ComboBox selects first item on down arrow even when it is highlighted", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo"]
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    assert.equal(combobox.value(), "foo");
});

it("ComboBox selects focused item after search", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"]
    });

    combobox.search("bar");

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    assert.equal(combobox.value(), "bar");
});

it("ComboBox bind widget on DOWN arrow", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false,
        dataBound: function() {
            assert.isOk(true);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
});

it("ComboBox selects first item on DOWN arrow and autoBind: false", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    assert.equal(combobox.select(), 0);
});

it("ComboBox bind widget on UP arrow", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        autoBind: false,
        dataBound: function() {
            assert.isOk(true);
        }
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP
    });
});

it("ComboBox selects previous item on UP arrow", function() {
    combobox = new ComboBox(input, {
        dataSource: ["foo", "bar", "baz"],
        index: 2
    });

    combobox.input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP
    });

    assert.equal(combobox.value(), "bar");
});

it("Empty comboBox does not raise exception on navigate", function() {
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

    assert.isOk(true);
});

it("Empty combobox does not select first focused item on ENTER", function() {
    combobox = new ComboBox(input, {
        dataSource: ["Item1", "Item2"]
    });

    combobox.input.focus();

    combobox.open();
    combobox.input.val("");
    combobox.close();

    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });

    assert.equal(combobox.value(), "");
});

it("ComboBox does not focus if refresh is called after blur", function() {
    combobox = new ComboBox(input, {
        autoBind: false,
        dataSource: ["Item1", "Item2"]
    });

    combobox.open();

    assert.notEqual(document.activeElement, combobox.input[0]);
});

it("clearing custom value does not re-enter the old value", function(done) {
    create({
        delay: 0,
        filter: "startswith"
    });

    combobox.value("test");
    combobox.input.focus().val("").press(keys.BACKSPACE);

    setTimeout(function() {
        assert.equal(combobox.input.val(), "", "input is not cleared");
        done();
    });
});

it("clearing custom value does not re-enter the old value (SELECT)", function(done) {
    var select = $("<select />").appendTo(Mocha.fixture);

    var combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith",
        delay: 0
    });

    combobox.value("test");
    combobox.input.focus().val("").press(keys.BACKSPACE);

    setTimeout(function() {
        assert.equal(combobox.input.val(), "", "input is not cleared");
        done();
    });
});

it("ComboBox selects an item on ENTER after search ", function() {
    create();

    var input = combobox.input;

    input.focus();
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
        assert.equal(combobox.select(), 0);
    });

    input.trigger({
        type: "keydown",
        keyCode: keys.ENTER
    });
});

it("ComboBox does not focus input if mobile device", function() {
    var origin = kendo.support.touch;
    var input = combobox.input;

    kendo.support.mobileOS = true;

    kendo.support.touch = true;

    combobox.wrapper.find(".k-icon").click();

    assert.notEqual(combobox.input[0], document.activeElement);
});

it("Selects first item if it is focused but not selected", function() {
    var combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    });

    combobox.input.focus().press(keys.DOWN);

    var current = combobox.current();

    assert.equal(current.index(), 0);
    assert.isOk(current.hasClass("k-state-selected"));
});

it("ComboBox scrolls content down", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataSource: getData(100)
    });

    stub(combobox.listView, {
        scrollWith: combobox.listView.scrollWith
    });

    combobox.open();
    combobox.input.press(keys.PAGEDOWN);

    assert.equal(combobox.listView.calls("scrollWith"), 1);
    assert.equal(combobox.listView.args("scrollWith")[0], combobox.listView.screenHeight());
});

it("ComboBox scrolls content up", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataSource: getData(100)
    });

    stub(combobox.listView, {
        scrollWith: combobox.listView.scrollWith
    });

    combobox.open();
    combobox.input.press(keys.PAGEUP);

    assert.equal(combobox.listView.calls("scrollWith"), 1);
    assert.equal(combobox.listView.args("scrollWith")[0], -1 * combobox.listView.screenHeight());
});

it("ComboBox prevents default on PAGEDOWN", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataSource: getData(100)
    });

    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: keys.PAGEDOWN,
        preventDefault: function() {
            assert.isOk(true);
        }
    });
});

it("ComboBox focuses first item on Home key", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataSource: getData(100)
    });

    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: keys.HOME
    });
    assert.isOk(combobox.ul.children().first().hasClass(FOCUSED));
});

it("ComboBox focuses last item on End key", function() {
    var combobox = new ComboBox(input, {
        animation: false,
        dataSource: getData(100)
    });

    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: keys.END
    });
    assert.isOk(combobox.ul.children().last().hasClass(FOCUSED));
});

it("ComboBox select focused listview item on blur", function() {
    combobox = new ComboBox(input, {
        ignoreCase: true,
        dataSource: ["Item1", "item1"]
    });

    combobox.value("item1");
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.TAB
    });

    assert.equal(combobox.value(), "item1");
});
    });
}());
