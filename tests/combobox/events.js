(function() {

var ComboBox = kendo.ui.ComboBox,
    CLICK = kendo.support.touch ? "touchend" : "click",
    combobox,
    input;

module("kendo.ui.ComboBox events", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }
    },
    teardown: function() {
        kendo.effects.enable();
        combobox.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("_blur calls _change", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    combobox._change = function() {
        ok(true);
    }

    combobox._blur();
});

test("_blur calls popup close", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    combobox.dataSource.read();
    combobox.popup.open();

    combobox.popup.bind("close", function() {
        ok(true);
    });

    combobox._blur();
});

test("_change raises the change event if value has changed", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(true);
        }
    });

    combobox.value("bar");
    combobox._old = "foo";
    combobox._change();
});

test("_change raises the input change event", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    input.bind("change", function() {
        ok(true);
    });

    combobox.value("bar");
    combobox._old = "foo";
    combobox._change();
});

test("_change is not raised initially", 0, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        autoBind: false,
        change: function() {
            ok(false);
        }
    });

    combobox.input.focus();
    combobox._change();
});

test("select does not raise the change event", 0, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(false);
        }
    });

    combobox.input.focus();
    combobox.select($("<li>foo</li>"));
});

test("clicking an item raises the change event", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(true);
        }
    });

    combobox.input.focus();
    combobox.open();

    combobox.ul.children().eq(1).trigger(CLICK);
});

test("change should be raised on enter", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(true);
        }
    });

    combobox.open();
    combobox.input.focus();
    combobox.input.press(kendo.keys.DOWN);
    combobox.input.press(kendo.keys.ENTER);
});

test("change should not be raised on enter if input is empty", 0, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(false);
        }
    });

    combobox.input.focus();
    combobox.input.press(kendo.keys.ENTER);
});

test("change should be raised on tab", 1, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(true);
        }
    });

    combobox.input.focus();
    combobox.open();
    combobox.input.press(kendo.keys.DOWN);
    combobox.input.press(kendo.keys.TAB);
    combobox.input.focusout();
});

test("_change raises change event if selectedIndex has changed", 1, function() {
    var select = $("<select/>");

    combobox = new ComboBox(select, {
        dataSource: ["foo", "bar"],
        change: function() {
            ok(true);
        }
    });

    combobox.selectedIndex = 1;
    combobox._change();
});

test("clicking an item raises the change event of HTML select", 1, function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>")
                    .bind("change", function() {
                        ok(true);
                    });

    combobox = new ComboBox(select, {
        dataTextField: "text",
        dataValueField: "value"
    });

    combobox.input.focus();
    combobox.open();

    combobox.ul.children().eq(1).trigger(CLICK);
});

test("raise change on custom value", 3, function() {
    combobox = new ComboBox(input, {
        dataSource: [{text: "foo"}, {text: "bar"}],
        change: function() {
            ok(true);
            equal(combobox._old, "foo");
            equal(combobox.value(), "foo");
        }
    });

    combobox.input
            .focus()
            .val("foo")
            .focusout();
});

test("raise change on custom value if element is select", 2, function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>");
    combobox = new ComboBox(select, {
        dataSource: [{text: "foo"}, {text: "bar"}]
    });

    select.bind("change", function() {
        equal(combobox.value(), "custom value");
        equal(combobox._old, "custom value");
    });

    combobox.input
            .focus()
            .val("custom value")
            .focusout();

});

test("raise change if empty input after selection", 1, function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);

    select.bind("change", function() {
        equal(combobox.value(), "");
    });

    combobox = new ComboBox(select, {
        dataValueField: "text",
        dataTextField: "text"
    });

    combobox.select(0);

    combobox.input.focus().val("").press(kendo.keys.BACKSPACE).focusout();

});

asyncTest("change with custom value on blur", 2, function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);

    combobox = new ComboBox(select, {
        delay: 0
    });

    combobox.input.focus();
    combobox.input.val("test");
    combobox.input.press(60); //some letter

    combobox.bind("change", function() {
        start();
        equal(combobox.value(), "test");
        equal(combobox.text(), "test");
    });

    combobox.input.focusout();
});

asyncTest("change on custom value and ENTER", 2, function() {
    var select = $("<select><option value=1>foo1</option><option value=3>foo3</option></select>").appendTo(QUnit.fixture);

    select.bind("change", function() {
        start();
        equal(combobox.value(), "test");
        equal(combobox.text(), "test");
    });

    combobox = new ComboBox(select, {
        delay: 0
    });

    combobox.input.focus();
    combobox.input.val("test");
    combobox.input.press(60); //some letter
    combobox.input.press(kendo.keys.ENTER);
});

test("open event when click _arrow", 2, function() {
    combobox = input.kendoComboBox({
        animation: false,
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function() {
            ok(true);
            ok(this === combobox, "'this' is not the correct scope");
        }
    }).data("kendoComboBox");

    input.data("kendoComboBox").wrapper.find(".k-icon").trigger(CLICK);
});

test("open event should be cancellable", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function(e) {
            e.preventDefault();
        }
    });

    combobox = input.data("kendoComboBox");

    combobox._arrow.trigger(CLICK);

    ok(!combobox.popup.visible());
});

test("open event should not raise twice on initial binding", function() {
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

    equal(index, 1);
});

test("open event when ALT + down _arrow", 1, function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        open: function() {
            ok(true);
        }
    });

    combobox = input.data("kendoComboBox");

    combobox.input.trigger({ type: "keydown", keyCode: kendo.keys.DOWN, altKey: true } );
});

test("close event when click _arrow", 2, function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function() {
            ok(true);
            ok(this === combobox, "'this' is not the correct scope");
        }
    });

    combobox = input.data("kendoComboBox");
    combobox.open();
    combobox._arrow.trigger(CLICK);
});

test("close event should be cancellable", function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function(e) {
            e.preventDefault();
        }
    });

    combobox = input.data("kendoComboBox");

    combobox.open();
    combobox._arrow.trigger(CLICK);

    ok(combobox.popup.visible());
});

test("close should not raise if no data", 0, function() {
    input.kendoComboBox({
        close: function(e) {
            ok(false);
        }
    });

    combobox = input.data("kendoComboBox");
    combobox._arrow.trigger(CLICK);
});

test("close event when ALT + up _arrow", 1, function() {
    input.kendoComboBox({
        dataSource: [{text: "foo"}, {text: "bar"}],
        close: function() {
            ok(true);
        }
    });


    combobox = input.data("kendoComboBox");
    combobox.open();

    combobox.input.trigger({ type: "keydown", keyCode: kendo.keys.UP, altKey: true } );
});

test("click item raises select event", 1, function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        select: function(e) {
            ok(e.item);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.ul.children().first().trigger(CLICK);
});

test("select event is not raised when custom value is entered", 0, function() {
    combobox = input.kendoComboBox({
        highlightFirst: true,
        dataSource: ["foo"],
        select: function(e) {
            ok(false);
        }
    }).data("kendoComboBox");

    combobox.input.val("custom");
    combobox.input.press(kendo.keys.ENTER);
});

test("select event is not raised no item is focused", 0, function() {
    combobox = input.kendoComboBox({
        highlightFirst: false,
        dataSource: ["foo"],
        select: function(e) {
            ok(false);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.press(kendo.keys.ENTER);
});

test("select is raised when down arrow is clicked", 1, function() {
    combobox = input.kendoComboBox({
        highlightFirst: false,
        dataSource: ["foo"],
        select: function(e) {
            ok(true);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.press(kendo.keys.DOWN);
});

test("prevent select event should only close the popup", 2, function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        select: function(e) {
            ok(true);
            e.preventDefault();
        },
        change: function() {
            ok(false);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.ul.children().first().trigger(CLICK);

    ok(!combobox.popup.visible());
});

test("preventing select event during navigation reverts selection", 2, function() {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            e.preventDefault()
        }
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.wrapper.press(kendo.keys.DOWN);

    var current = combobox.current();

    ok(current.hasClass("k-state-focused"));
    equal(current.html(), "foo");
});

test("trigger select event on blur when input text is changed", 1, function() {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            equal(e.item[0], combobox.current()[0]);
        }
    }).data("kendoComboBox");

    combobox.input.focus().val("bar").blur();
});

test("do not trigger select event on blur when input text is not changed", 0, function() {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            ok(false);
        }
    }).data("kendoComboBox");

    combobox.select(0);
    combobox.input.focus().blur();
});

test("prevent select event on blur returns old value", 1, function() {
    var combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        select: function(e) {
            e.preventDefault();
        }
    }).data("kendoComboBox");

    combobox.select(0);
    combobox.input.focus().val("bar").blur();

    equal(combobox.text(), "foo");
});

test("ComboBox trigger blur of the hidden input", 1, function() {
    combobox = input.kendoComboBox().data("kendoComboBox");

    combobox.element.blur(function() {
        ok(true);
    });

    combobox.input.focusout();
});

test("ComboBox trigger cascade on TAB", 1, function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo"],
        cascade: function() {
            ok(true);
        }
    }).data("kendoComboBox");

    combobox.open();
    combobox.input.trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    combobox.text(combobox.text());
});

test("ComboBox trigger cascade when selected index is changed", 2, function() {
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

    combobox.input.focus().val("1");
    combobox.search("1");
    combobox.input.blur();

    combobox.bind("cascade", function() {
        equal(combobox.value(), "1");
        equal(combobox.text(), "foo");
    });

    combobox.search("f");
    combobox.ul.children(":first").click();
});

test("ComboBox triggers cascade only once when setting value externally", 1, function() {
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
        ok(true);
    });

    combobox.value("2");
});

test("ComboBox trigger change on blur after filtration", 1, function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.value("foo");

    combobox.bind("change", function() {
        ok(true);
    });

    combobox.search("b");
    combobox.input.val("");
    combobox.suggest("bar");

    combobox.input.focusout();
});

test("ComboBox trigger change when selected index is changed", 2, function() {
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

    combobox.input.focus().val("1");
    combobox.search("1");
    combobox.input.blur();

    combobox.bind("change", function() {
        equal(combobox.value(), "1");
        equal(combobox.text(), "foo");
    });

    combobox.search("f");
    combobox.ul.children(":first").click();
});

test("ComboBox triggers filtering event on data source filter", 3, function() {
    combobox = input.kendoComboBox({
        autoBind: false,
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            var filter = e.filter;

            equal(filter.field, "");
            equal(filter.operator, "contains");
            equal(filter.value, "baz");
        }
    }).data("kendoComboBox");

    combobox.search("baz");
});

test("modifying filter expression in filtering event changes datasource result", 2, function() {
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

    equal(data.length, 1);
    equal(data[0], "foo");
});

test("ComboBox filtering event can be prevented", 0, function() {
    combobox = input.kendoComboBox({
        dataSource: ["foo", "bar"],
        filter: "contains",
        filtering: function(e) {
            e.preventDefault();
        }
    }).data("kendoComboBox");

    combobox.dataSource.bind("change", function() {
        ok(false);
    });

    combobox.search("baz");
});

test("ComboBox does not trigger change event on blur after initialization (<select>)", 0, function() {
    var select = $('<select id="combobox"><option selected></option><option value="1">Value1</option></select>');

    combobox = select.kendoComboBox({
        change: function(e) {
            ok(false);
        }
    }).data("kendoComboBox");

    combobox.input.focus().blur();
});

test("change event is not raised when value is set through configuration", 0, function() {
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
            ok(false);
        }
    });

    combobox.input.focus().blur();
});

test("change event is not raised when widget is not bound and value method is used", 0, function() {
    var select = $("<select></select>").appendTo(QUnit.fixture);

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
            ok(false);
        }
    });

    combobox.value(2);
    combobox.input.focus().blur();
});

test("change event is not raised when widget value is cleared", 0, function() {
    var select = $("<select></select>").appendTo(QUnit.fixture);

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
            ok(false);
        }
    });

    combobox.value("");
    combobox.input.focus().blur();
});

test("trigger set when setting value", 1, function() {
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
            equal(e.value, value);
        }
    });

    combobox.value(value);
});

})();
