(function(){

var AutoComplete = kendo.ui.AutoComplete,
    input;

$.fn.press = function(key) {
    return this.trigger({ type: "keydown", keyCode: key } );
}

$.fn.selectedText = function() {
    var that = this[0];

    if (that.createTextRange) {
        return that.createTextRange().text;
    } else {
        return that.value.substring(that.selectionStart, that.selectionEnd);
    }
}

$.fn.type = function(value) {
    return this.val(value).each(function() {
        if (this.createTextRange) {
            var textRange = this.createTextRange();
            textRange.collapse(false);
            textRange.select();
        }
    });
}

module("kendo.ui.AutoComplete separator", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("separator", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        separator: ", "
    });

    input.focus();
    input.val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());

    equal(input.val(), "baz, ");
});

test("search uses the last word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        separator: ", "
    });

    input.focus();
    input.type("foo, b");
    autocomplete.search();
    equal(autocomplete.ul.children().first().text(), "bar");
});

test("search uses the word at the caret position", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        separator: ", "
    });

    input.focus();
    input.val("foo, bar, ");
    input[0].selectionStart = 0;
    autocomplete.search();
    equal(autocomplete.ul.children().first().text(), "foo");
});

test("select replaces the word at the caret position", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar", "baz"],
        separator: ", "
    });

    input.focus();
    input.val("foo, bar, ");
    input[0].selectionStart = 0;
    autocomplete.dataSource.read();
    autocomplete.select(autocomplete.ul.children().eq(2));
    equal(input.val(), "baz, bar, ");
});

}());
