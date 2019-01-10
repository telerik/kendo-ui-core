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

describe("kendo.ui.ComboBox suggestion", function () {
    beforeEach(function() {

        input = $("<input />").appendTo(Mocha.fixture);

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
    });
    afterEach(function() {

        combobox.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("current popup item completes the value of the input if suggest is enabled", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true
    });

    combobox.input.type("b");
    combobox.search("b");

    assert.equal(combobox.input.val(), "bar");
});

it("suggestion selects the remainder of the word", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true
    });

    combobox.input.type("b");
    combobox.suggest("Bar");
    assert.equal(combobox.input.selectedText(), "ar");
});

it("suggest with empty string clears selection", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        suggest: true,
        highlightFirst: false
    });

    combobox.input.type("b");
    combobox.suggest("bar");
    assert.equal(combobox.input.selectedText(), "ar");
    combobox.suggest("");
    assert.equal(combobox.input.val(), "b");
});

it("suggest(text) should add text if input is empty", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox.suggest("Foo");

    assert.equal(combobox.text(), "Foo");
});

it("suggest(text) does not suggest on backspace", function() {
    combobox = input.val("f").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox._last = kendo.keys.BACKSPACE; //backspace is clicked
    combobox.suggest("Foo");
    assert.equal(combobox.text(), "f");
});

it("suggest(text) does not suggest on delete", function() {
    combobox = input.val("f").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data
    }).data("kendoComboBox");

    combobox._last = kendo.keys.DELETE; //delete is clicked
    combobox.suggest("Foo");
    assert.equal(combobox.text(), "f");
});

it("suggest(text) should use dataItem.text instead of li.text()", function() {
    var data = [{text: "Item1", value: "1"}, {text: "Item2", value: "2"}];

    combobox = input.val("i").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        template: "<span>List:</span>#=data.text#"
    }).data("kendoComboBox");

    combobox.suggest(combobox.ul.children(":first"));
    assert.equal(combobox.text(), "item1");
});

it("suggest() should suggest correctly", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("Co");
    combobox.suggest("Cotton");

    assert.equal(combobox.text(), "Cotton");
    assert.equal(combobox.input.selectedText(), "tton");
});

it("suggest() suggest correctly after typing multiple times", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"cotton"}, {text: "Cotton"}, {text: "Cotton/Polyester"}],
        suggest: true
    }).data("kendoComboBox");

    for (var i = 0;i < 3; i++) {
        combobox.input.type("co");
        combobox.suggest("cotton");
    }

    assert.equal(combobox.text(), "cotton");
});

it("suggest method appends text only", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        highlightFirst: false,
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("co");
    combobox.suggest("Cotton");

    assert.equal(combobox.current(), null);
    assert.equal(combobox.text(), "cotton");
    assert.equal(combobox.input.selectedText(), "tton");
});

it("suggest method modifes text and appends suggestion", function() {
    combobox = input.kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text:"Cotton"}, {text: "Cotton/Polyester"}],
        highlightFirst: true,
        suggest: true
    }).data("kendoComboBox");

    combobox.input.type("co");
    combobox.suggest("Cotton");

    assert.equal(combobox.current().index(), 0);
    assert.equal(combobox.text(), "cotton");
    assert.equal(combobox.input.selectedText(), "tton");
});

it("suggest(text) should only append the rest of the text (filter:contains)", function() {
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

    assert.equal(combobox.text(), "oo");

    window.setTimeout = origin;
});

it("refresh method suggests if no item is highlighted", function() {
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

    assert.equal(combobox.text(), "foo");
    assert.equal(combobox.current(), null);

    window.setTimeout = origin;
});

it("widget does not suggest when input is empty", function() {
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

    assert.equal(combobox.text(), "");
});

it("suggest int values on search", function() {
    combobox = new ComboBox(input, {
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [{text: 1, value: "1"}],
        suggest: true
    });

    combobox.input.type("1");
    combobox.search("1");

    assert.equal(combobox.input.val(), "1");
});

    });
}());
