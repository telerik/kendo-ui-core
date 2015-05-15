(function() {

var ComboBox = kendo.ui.ComboBox,
    data = [{text: "Foo", value: 1}, {text:"Bar", value:2}, {text:"Baz", value:3}],
    combobox,
    input;

function caret(element, position) {
    var range,
    isPosition = position !== undefined;

    if (document.selection) {
        if ($(element).is(":visible")) {
            element.focus();
        }
        range = document.selection.createRange();
        if (isPosition) {
            range.move("character", position);
            range.select();
            } else {
            var rangeElement = element.createTextRange(),
            rangeDuplicated = rangeElement.duplicate();
            rangeElement.moveToBookmark(range.getBookmark());
            rangeDuplicated.setEndPoint('EndToStart', rangeElement);

            position = rangeDuplicated.text.length;

        }
        } else if (element.selectionStart !== undefined) {
        if (isPosition) {
            element.focus();
            element.setSelectionRange(position, position);
            } else {
            position = element.selectionStart;
        }
    }

    return position;
}

module("kendo.ui.ComboBox suggestion", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);

        $.fn.press = function(key) {
            return this.trigger({ type: "keydown", keyCode: key } );
        }

        $.fn.selectedText = function() {
            var that = this[0];

            if (document.selection) {
                return document.selection.createRange().text;
            } else {
                return that.value.substring(that.selectionStart, that.selectionEnd);
            }
        },

        $.fn.type = function(value) {
            return this.val(value).each(function() {
                caret(this, this.value.length);
            });
        }
    },
    teardown: function() {
        kendo.effects.enable();
        combobox.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("current popup item completes the value of the input if suggest is enabled", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true
    });

    combobox.input.type("b");
    combobox.search("b");

    equal(combobox.input.val(), "bar");
});

test("suggestion selects the remainder of the word", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true
    });

    combobox.input.type("b");
    combobox.suggest("Bar");
    equal(combobox.input.selectedText(), "ar");
});

test("suggest with empty string clears selection", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true,
        highlightFirst: false
    });

    combobox.input.type("b");
    combobox.suggest("bar");
    equal(combobox.input.selectedText(), "ar");
    combobox.suggest("");
    equal(combobox.input.val(), "b");
});

test("suggest(text) should add text if input is empty", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox.suggest("Foo");

    equal(combobox.text(), "Foo");
});

test("suggest(text) does not suggest on backspace", function() {
    combobox = input.val("f").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox._last = kendo.keys.BACKSPACE; //backspace is clicked
    combobox.suggest("Foo");
    equal(combobox.text(), "f");
});

test("suggest(text) does not suggest on delete", function() {
    combobox = input.val("f").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox._last = kendo.keys.DELETE; //delete is clicked
    combobox.suggest("Foo");
    equal(combobox.text(), "f");
});

test("suggest(text) should use dataItem.text instead of li.text()", function() {
    var data = [{text: "Item1", value: "1"}, {text: "Item2", value: "2"}];

    combobox = input.val("i").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        template: "<span>List:</span>#=data.text#"
    }).data("kendoComboBox");

    combobox.suggest(combobox.ul.children(":first"));
    equal(combobox.text(), "item1");
});

test("suggest() should suggest correctly", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("Co");
    combobox.suggest("Cotton");

    equal(combobox.text(), "Cotton");
    equal(combobox.input.selectedText(), "tton");
});

test("suggest method appends text only", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        highlightFirst: false,
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("co");
    combobox.suggest("Cotton");

    equal(combobox.current(), null);
    equal(combobox.text(), "cotton");
    equal(combobox.input.selectedText(), "tton");
});

test("suggest method modifes text and appends suggestion", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        highlightFirst: true,
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("co");
    combobox.suggest("Cotton");

    equal(combobox.current().index(), 0);
    equal(combobox.text(), "cotton");
    equal(combobox.input.selectedText(), "tton");
});

test("suggest(text) should only append the rest of the text (filter:contains)", 1, function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "contains",
        suggest: true
    }).data("kendoComboBox");

    var origin = window.setTimeout;
    window.setTimeout = function(func) { func() };

    combobox.input.focus().val("o").keydown();

    equal(combobox.text(), "oo");

    window.setTimeout = origin;
});

test("refresh method suggests if no item is highlighted", 2, function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    }).data("kendoComboBox");

    var origin = window.setTimeout;
    window.setTimeout = function(func) { func() };

    combobox.input.focus();
    combobox.input.val("f");
    combobox.search("f");

    equal(combobox.text(), "foo");
    equal(combobox.current(), null);

    window.setTimeout = origin;
});

test("widget does not suggest when input is empty", 1, function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true,
        delay: 0,
        index: 0
    }).data("kendoComboBox");

    combobox.input.focus();
    combobox.input.val("");
    combobox.refresh();

    equal(combobox.text(), "");
});

test("suggest int values on search", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: 1, value: "1"}],
        suggest: true
    });

    combobox.input.type("1");
    combobox.search("1");

    equal(combobox.input.val(), "1");
});

})();
