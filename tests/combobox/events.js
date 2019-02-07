(function() {

var ComboBox = kendo.ui.ComboBox,
    CLICK = kendo.support.touch ? "touchend" : "click",
    combobox,
    input;

describe("kendo.ui.ComboBox events", function () {
    beforeEach(function() {

        input = $("<input />").appendTo(Mocha.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }
    });
    afterEach(function() {

        combobox.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("_blur calls _change", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    combobox._change = function() {
        assert.isOk(true);
    }

    combobox._blur();
});

it("_blur calls popup close", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    combobox.dataSource.read();
    combobox.popup.open();

    combobox.popup.bind("close", function() {
        assert.isOk(true);
    });

    combobox._blur();
});

it("_change raises the change event if value has changed", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.value("bar");
    combobox._old = "foo";
    combobox._change();
});

it("_change raises the input change event", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    input.bind("change", function() {
        assert.isOk(true);
    });

    combobox.value("bar");
    combobox._old = "foo";
    combobox._change();
});

it("_change is not raised initially", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        autoBind: false,
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.input.focus();
    combobox._change();
});

it("select does not raise the change event", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.input.focus();
    combobox.select($("<li>foo</li>"));
});

it("clicking an item raises the change event", function(done) {
    combobox = new ComboBox(input, {
        dataValueField: "text",
        dataTextField: "text",
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(true);
            done();
        }
    });

    combobox.input.focus();
    combobox.open();

    combobox.ul.children().eq(1).trigger(CLICK);
});

it("change should be raised on enter", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.open();
    combobox.input.focus();
    combobox.input.press(kendo.keys.DOWN);
    combobox.input.press(kendo.keys.ENTER);
});

it("change should not be raised on enter if input is empty", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.input.focus();
    combobox.input.press(kendo.keys.ENTER);
});

it("change should be raised on tab", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.input.focus();
    combobox.open();
    combobox.input.press(kendo.keys.DOWN);
    combobox.input.press(kendo.keys.TAB);
    combobox.input.focusout();
});

it("change should not be raised on tab after already changed value", function() {
    combobox = new ComboBox(input, {
        dataSource: ["One", "Two", "Three"],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.input.focus();
    combobox.open();
    combobox.input.press(kendo.keys.DOWN);
    combobox.input.press(kendo.keys.ENTER);
    combobox.input.press(kendo.keys.TAB);
    combobox.input.focusout();
});

it("change should not be raised twice on tab after edits of arbitrary text", function() {
    var counter = 0;

    combobox = new ComboBox(input, {
        dataSource: [],
        change: function() {
            counter++;
        }
    });

    for (var i = 0; i < 2; i++) {
        combobox.input.focus();
        combobox.input.val(i);
        combobox.input.press(kendo.keys.ENTER);
        combobox.input.press(kendo.keys.TAB);
        combobox.input.focusout();
    }

    assert.equal(counter, 2);
});

it("_change raises change event if selectedIndex has changed", function() {
    var select = $("<select/>");

    combobox = new ComboBox(select, {
        dataSource: ["foo", "bar"],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.selectedIndex = 1;
    combobox._change();
});

it("clicking an item raises the change event of HTML select", function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>")
                    .bind("change", function() {
                        assert.isOk(true);
                    });

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value"
    });

    combobox.input.focus();
    combobox.open();

    combobox.ul.children().eq(1).trigger(CLICK);
});

it("raise change on custom value", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.equal(combobox.value(), "foo");
        }
    });

    combobox.input
                .focus()
                .val("foo");

    combobox.open();

    combobox.input.focusout();
});

it("raise change on custom text with empty value", function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            assert.equal(combobox.value(), "");
            assert.equal(combobox.text(), "foo");
        },
        syncValueAndText: false
    });

    combobox.input
            .focus()
            .val("foo");

    combobox.open();

    combobox.input.focusout();
});

it("raise change on custom value if element is select", function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>");
    combobox = new ComboBox(select, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    select.bind("change", function() {
        assert.equal(combobox.value(), "custom value");
    });

    combobox.input
            .focus()
            .val("custom value");

    combobox.open();

    combobox.input.focusout();
});

it("raise change on custom text with empty value (select)", function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>");
    combobox = new ComboBox(select, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        syncValueAndText: false
    });

    select.bind("change", function() {
        assert.equal(combobox.value(), "");
        assert.equal(combobox.text(), "custom value");
    });

    combobox.input
            .focus()
            .val("custom value");

    combobox.open();

    combobox.input.focusout();
});

it("raise change if empty input after selection", function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

    select.bind("change", function() {
        assert.equal(combobox.value(), "");
    });

    combobox = new ComboBox(select, {
        dataValueField: "text",
        dataTextField: "text"
    });

    combobox.select(0);

    combobox.input.focus().val("").press(kendo.keys.BACKSPACE);

    combobox.open();

    combobox.input.focusout();
});

it("change with custom value on blur", function(done) {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

    combobox = new ComboBox(select, {
        delay: 0
    });

    combobox.input.focus();
    combobox.input.val("test");
    combobox.input.press(60); //some letter

    combobox.bind("change", function() {
        assert.equal(combobox.value(), "test");
        assert.equal(combobox.text(), "test");
        done();
    });

    combobox.open();

    combobox.input.focusout();
});

it("change on custom value and ENTER", function(done) {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

    select.bind("change", function() {
        assert.equal(combobox.value(), "test");
        assert.equal(combobox.text(), "test");
        done();
    });

    combobox = new ComboBox(select, {
        delay: 0
    });

    combobox.input.focus();
    combobox.input.val("test");
    combobox.input.press(60); //some letter
    combobox.input.press(kendo.keys.ENTER);
});

it("change on ENTER with custom text and empty value", function(done) {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(Mocha.fixture);

    select.bind("change", function() {
        assert.equal(combobox.value(), "");
        assert.equal(combobox.text(), "test");
        done();
    });

    combobox = new ComboBox(select, {
        delay: 0,
        syncValueAndText: false
    });

    combobox.input.focus();
    combobox.input.val("test");
    combobox.input.press(60); //some letter
    combobox.input.press(kendo.keys.ENTER);
});

it("open event when click _arrow", function() {
    combobox = input.kendoComboBox({
        animation: false,
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function() {
            assert.isOk(true);
            assert.isOk(this === combobox, "'this' is not the correct scope");
        }
    }).data("kendoComboBox");

    input.data("kendoComboBox").wrapper.find(".k-icon").trigger(CLICK);
});

it("open event should be cancellable", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function(e) {
            e.preventDefault();
        }
    });

    combobox = input.data("kendoComboBox");

    combobox._arrow.trigger(CLICK);

    assert.isOk(!combobox.popup.visible());
});

it("open event should not raise twice on initial binding", function() {
    var index = 0;
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function(e) {
            index++;
        },
        autoBind: false
    });

    combobox = input.data("kendoComboBox");

    combobox._arrow.trigger(CLICK);

    assert.equal(index, 1);
});

it("open event when ALT + down _arrow", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function() {
            assert.isOk(true);
        }
    });

    combobox = input.data("kendoComboBox");

    combobox.input.trigger({ type: "keydown", keyCode: kendo.keys.DOWN, altKey: true } );
});

it("close event when click _arrow", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function() {
            assert.isOk(true);
            assert.isOk(this === combobox, "'this' is not the correct scope");
        }
    });

    combobox = input.data("kendoComboBox");
    combobox.open();
    combobox._arrow.trigger(CLICK);
});

it("close event should be cancellable", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function(e) {
            e.preventDefault();
        }
    });

    combobox = input.data("kendoComboBox");

    combobox.open();
    combobox._arrow.trigger(CLICK);

    assert.isOk(combobox.popup.visible());
});

it("close should not raise if no data", function() {
    input.kendoComboBox({
        close: function(e) {
            assert.isOk(false);
        }
    });

    combobox = input.data("kendoComboBox");
    combobox._arrow.trigger(CLICK);
});

it("close event when ALT + up _arrow", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function() {
            assert.isOk(true);
        }
    });


    combobox = input.data("kendoComboBox");
    combobox.open();

    combobox.input.trigger({ type: "keydown", keyCode: kendo.keys.UP, altKey: true } );
});

it("click item raises select event", function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        select: function(e) {
            assert.equal(e.item[0], combobox.ul.children()[0]);
            assert.equal(e.dataItem, combobox.dataSource.view()[0]);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.ul.children().first().trigger(CLICK);
});

it("select event is not raised when custom value is entered", function() {
    combobox = input.kendoComboBox({
        highlightFirst: true,
        dataSource: ["foo"],
        select: function(e) {
            assert.equal(e.item[0], combobox.ul.children()[0]);
            assert.equal(e.dataItem, combobox.dataSource.view()[0]);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.focus();
    combobox.listView.focus(0);
    combobox.input.press(kendo.keys.ENTER);
});

it("select event is not raised when custom value is entered", function() {
    combobox = input.kendoComboBox({
        highlightFirst: true,
        dataSource: ["foo"],
        select: function(e) {
            assert.isOk(false);
        }
    }).data("kendoComboBox");

    combobox.input.val("custom");
    combobox.input.press(kendo.keys.ENTER);
});

it("select event is not raised no item is focused", function() {
    combobox = input.kendoComboBox({
        highlightFirst: false,
        dataSource: ["foo"],
        select: function(e) {
            assert.isOk(false);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.press(kendo.keys.ENTER);
});

it("select is raised when down arrow is clicked", function() {
    combobox = input.kendoComboBox({
        highlightFirst: false,
        dataSource: ["foo"],
        select: function(e) {
            assert.equal(e.item[0], combobox.ul.children()[0]);
            assert.equal(e.dataItem, combobox.dataSource.view()[0]);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.press(kendo.keys.DOWN);
});

it("prevent select event should only close the popup", function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        select: function(e) {
            assert.isOk(true);
            e.preventDefault();
        },
        change: function() {
            assert.isOk(false);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.ul.children().first().trigger(CLICK);

    assert.isOk(!combobox.popup.visible());
});

it("preventing select event during navigation reverts selection", function() {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            e.preventDefault()
        }
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.wrapper.press(kendo.keys.DOWN);

    var current = combobox.current();

    assert.isOk(current.hasClass("k-state-focused"));
    assert.equal(current.html(), "foo");
});

it("trigger select event on blur when input text is changed", function(done) {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            assert.equal(e.item[0], combobox.ul.children()[1]);
            assert.equal(e.dataItem, combobox.dataSource.view()[1]);
            done();
        }
    }).data("kendoComboBox");

    combobox.input.focus().val("bar").focusout();
});

it("do not trigger select event on blur when input text is not changed", function(done) {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            assert.isOk(false);
        }
    }).data("kendoComboBox");

    combobox.select(0).done(function() {
        combobox.input.focus().focusout();
        done();
    });
});

it("prevent select event on blur returns old value", function(done) {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            e.preventDefault();
        }
    }).data("kendoComboBox");

    combobox.select(0).then(function() {
        combobox.input.focus().val("bar").focusout();

        assert.equal(combobox.text(), "foo");
        done();
    });
});

it("ComboBox trigger blur of the hidden input", function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    combobox.element.blur(function() {
        assert.isOk(true);
    });

    combobox.input.focusout();
});

it("ComboBox trigger cascade on TAB", function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        cascade: function() {
            assert.isOk(true);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    combobox.text(combobox.text());
});

it("ComboBox trigger cascade when selected index is changed", function() {
    combobox = input.kendoComboBox({
        dataSource: [
            { text: "foo", value: "1" },
            { text: "bar", value: "2" }
        ],
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    combobox.bind("cascade", function() {
        assert.equal(combobox.value(), "1");
        assert.equal(combobox.text(), "1");
    });

    combobox.input.focus().val("1");
    combobox.search("1");
    combobox.input.blur();
});

it("ComboBox does not trigger cascade when selected index is changed due to filtering", function() {
    combobox = input.kendoComboBox({
        dataSource: [
            { text: "foo", value: "1" },
            { text: "bar", value: "2" }
        ],
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    var timesCascadeCalled = 0;

    combobox.bind("cascade", function() {
        timesCascadeCalled++
        assert.equal(combobox.value(), "2");
        assert.equal(combobox.text(), "bar");
    });

    combobox.input.focus().val("2");
    combobox.search("bar");
    combobox.ul.children(":first").click();
    combobox.dataSource.filter({});



    assert.equal(timesCascadeCalled, 1);
});

it("ComboBox triggers cascade only once when setting value externally", function() {
    combobox = input.kendoComboBox({
        dataSource: {
            transport: {
                read: function(options) {
                    options.success([
                        { text: "foo", value: "1" },
                        { text: "bar", value: "2" }
                    ]);
                }
            }
        },
        dataTextField: "text",
        dataValueField: "value"
    }).data("kendoComboBox");

    combobox.bind("cascade", function() {
        assert.isOk(true);
    });

    combobox.value("2");
});

it("ComboBox trigger change on blur after filtration", function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.value("foo");

    combobox.bind("change", function() {
        assert.isOk(true);
    });

    combobox.search("b");
    combobox.input.val("");
    combobox.suggest("bar");

    combobox.input.focusout();
});

it("ComboBox trigger change when selected index is changed", function() {
    combobox = input.kendoComboBox({
        dataSource: [
            { text: "foo", value: "1" },
            { text: "bar", value: "2" }
        ],
        dataTextField: "text",
        dataValueField: "value",
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    combobox.bind("change", function() {
        assert.equal(combobox.value(), "1");
        assert.equal(combobox.text(), "1");
    });

    combobox.input.focus().val("1");
    combobox.search("1");
    combobox.input.blur();
});

it("ComboBox triggers filtering event on data source filter", function() {
    combobox = input.kendoComboBox({
        autoBind: false,
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            var filter = e.filter;

            assert.equal(filter.field, "");
            assert.equal(filter.operator, "contains");
            assert.equal(filter.value, "baz");
        }
    }).data("kendoComboBox");

    combobox.search("baz");
});

it("modifying filter expression in filtering event changes datasource result", function() {
    combobox = input.kendoComboBox({
        autoBind: false,
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            e.filter.value = "foo";
        }
    }).data("kendoComboBox");

    combobox.search("baz");

    var data = combobox.dataSource.view();

    assert.equal(data.length, 1);
    assert.equal(data[0], "foo");
});

it("ComboBox filtering event can be prevented", function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            e.preventDefault();
        }
    }).data("kendoComboBox");

    combobox.dataSource.bind("change", function() {
        assert.isOk(false);
    });

    combobox.search("baz");
});

it("ComboBox does not trigger change event on blur after initialization (<select>)", function() {
    var select = $('<select id="combobox"><option selected></option><option value="1">Value1</option></select>');

    combobox = select.kendoComboBox({
        change: function(e) {
            assert.isOk(false);
        }
    }).data("kendoComboBox");

    combobox.input.focus().blur();
});

it("change event is not raised when value is set through configuration", function() {
    var combobox = new ComboBox(input, {
        value: 2,
        dataValueField: "id",
        dataTextField: "name",
        dataSource: [
            { id: 1, name: "name1" },
            { id: 2, name: "name2" },
            { id: 3, name: "name3" }
        ],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.input.focus().blur();
});

it("change event is not raised when widget is not bound and value method is used", function() {
    var select = $("<select></select>").appendTo(Mocha.fixture);

    var combobox = new ComboBox(select, {
        autoBind: false,
        dataValueField: "id",
        dataTextField: "name",
        dataSource: [
            { id: 1, name: "name1" },
            { id: 2, name: "name2" },
            { id: 3, name: "name3" }
        ],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.value(2);
    combobox.input.focus().blur();
});

it("change event is not raised when widget value is cleared", function() {
    var select = $("<select></select>").appendTo(Mocha.fixture);

    var combobox = new ComboBox(select, {
        autoBind: false,
        dataValueField: "id",
        dataTextField: "name",
        dataSource: [
            { id: 1, name: "name1" },
            { id: 2, name: "name2" },
            { id: 3, name: "name3" }
        ],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.value("");
    combobox.input.focus().blur();
});

it("trigger set when setting value", function() {
    var value = "test";

    var combobox = new ComboBox(input, {
        dataValueField: "id",
        dataTextField: "name",
        dataSource: [
            { id: 1, name: "name1" },
            { id: 2, name: "name2" },
            { id: 3, name: "name3" }
        ],
        set: function(e) {
            assert.equal(e.value, value);
        }
    });

    combobox.value(value);
});

it("raised change event on blur after filtering", function() {
    var combobox = new ComboBox(input, {
        dataValueField: "id",
        dataTextField: "name",
        dataSource: [
            { id: 1, name: "name1" },
            { id: 2, name: "name2" },
            { id: 3, name: "name3" }
        ],
        change: function() {
            assert.isOk(true);
        }
    });

    combobox.input.val("n");
    combobox._search();
    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
    combobox.input.focus().blur();
});

it("not raise change event on selecting current item after filtering", function() {
    var combobox = new ComboBox(input, {
        dataValueField: "id",
        dataTextField: "name",
        value: 2,
        dataSource: [
            { id: 1, name: "foo" },
            { id: 2, name: "boo" }
        ],
        change: function() {
            assert.isOk(false);
        }
    });

    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.BACKSPACE
    });
    combobox._search();
    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
    combobox.input.focus().blur();
});
    });
}());
