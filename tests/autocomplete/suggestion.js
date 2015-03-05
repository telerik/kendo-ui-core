(function(){

var AutoComplete = kendo.ui.AutoComplete,
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

$.fn.press = function(key) {
    return this.trigger({ type: "keydown", keyCode: key } );
};

$.fn.selectedText = function() {
    var that = this[0];

    if (document.selection) {
        return document.selection.createRange().text;
    } else {
        return that.value.substring(that.selectionStart, that.selectionEnd);
    }
};

$.fn.type = function(value) {
    return this.val(value).each(function() {
        if (this.createTextRange) {
            var textRange = this.createTextRange();
            textRange.collapse(false);
            textRange.select();
        }
    });
};

module("kendo.ui.AutoComplete suggestion", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("pressing enter calls triggers change", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        change: function() {
            ok(true);
        }
    });

    autocomplete.search("b");
    input.focus().press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);
});

test("pressing enter triggers change when custom value is entered", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        change: function() {
            ok(true);
        }
    });

    input.focus().val("test").press(kendo.keys.ENTER);
});

test("pressing tab calls _blur", 1, function() {
    var blurWasCalled, autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true
    });

    autocomplete._blur = function(li) {
        ok(true);
    };

    autocomplete.current = autocomplete.ul.children().first();
    input.focus().press(kendo.keys.TAB);
});

test("current popup item completes the value of the input if suggest is enabled", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.search();

    equal(input.val(), "baz");
    equal(input.selectedText(), "az");
});

test("current highlighted item completes the value of the input if suggest is enabled", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        highlightFirst: true,
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);

    equal(input.val(), "bar");
    equal(input.selectedText(), "ar");
});

test("suggestion does not suggest on backspace", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete._last = kendo.keys.BACKSPACE; //backspace is clicked
    autocomplete.suggest("baz");
    equal(input.val(), "b");
});

test("suggestion does not suggest on delete", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete._last = kendo.keys.DELETE; //delete is clicked
    autocomplete.suggest("baz");
    equal(input.val(), "b");
});


test("suggestion selects the remainder of the word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("baz");
    equal(input.selectedText(), "az");
});

test("suggestion selects the remainder of the second word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("baz");
    autocomplete.suggest("bar");
    equal(input.selectedText(), "ar");
});

test("separator", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        separator: ", "
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);

    equal(input.val(), "baz, ");
});

test("suggestion should suggest correctly", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Cotton", "bar"]
    });

    input.focus();
    input.type("Co");
    autocomplete.suggest("Cotton");

    equal(input.val(), "Cotton");
    equal(input.selectedText(), "tton");
});

asyncTest("suggestion appends only the rest of the text (filter:contains)", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        filter: "contains",
        suggest: true,
        delay: 0
    });

    input.focus();
    input.val("o");
    caret(input[0], 1);
    autocomplete.search();

    setTimeout(function() {
        start();
        equal(input.val(), "oo");
    }, 200);
});

test("suggestion should use dataItem.text instead of li.text()", function() {
    var autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"],
            template: "#=data#<span>List:</span>#=data#"
        });

    input.focus();
    input.val("f");
    autocomplete.search();

    autocomplete.suggest(autocomplete.ul.children(":first"));
    equal(input.val(), "foo");
});

test("separator and suggestion", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    autocomplete.suggest("baz");

    equal(input.selectedText(), "az");
    equal(input.val(), "baz, ");
});

test("separator and suggesting second word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("baz, b");
    autocomplete.search();
    autocomplete.suggest("bar");

    equal(input.selectedText(), "ar");
    equal(input.val(), "baz, bar, ");
});

test("separator and selecting a word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        suggest: true,
        separator: ", "
    });

    autocomplete.dataSource.read();

    input.focus();
    autocomplete.select(autocomplete.ul.children().eq(0));
    equal(input.val(), "foo, ");
});

test("suggest with empty string clears selection", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("bar");
    equal(input.selectedText(), "ar");
    autocomplete.suggest("");
    equal(input.val(), "b");
});

test("suggest with empty string clears selection and adheres to separators", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("foo, b");
    autocomplete.suggest("bar");
    equal(input.selectedText(), "ar");
    autocomplete.suggest("");
    equal(input.val(), "foo, b, ");
});

test("suggest with null does not throw exception", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true
    });

    try {
        autocomplete.suggest(null);
        ok(true);
    } catch(e) {
        ok(false);
    }
});

asyncTest("search should filter items using filter property", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar", "bafoo"],
        filter: "contains"
    });


    autocomplete.dataSource.bind("change", function() {
        equal(autocomplete.dataSource.view().length, 2);
        start();
    });

    input.focus();
    autocomplete.search("foo");
});

asyncTest("filtering honors dataTextField", 2, function() {
    var data = [{text: "foo"}, {text: "2"}], autocomplete = new AutoComplete(input, {
        dataSource: data,
        dataTextField: "text"
    });

    autocomplete.dataSource.bind("change", function() {
        equal(autocomplete.dataSource.view().length, 1);
        equal(autocomplete.dataSource.view()[0].text, "foo");
        start();
    });

    input.focus();
    autocomplete.search("f");
});

test("refresh method suggests if no item is highlighted", 2, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        filter: "startswith",
        highlightFirst: false,
        suggest: true,
        delay: 0
    });

    input.focus();
    input.val("f");
    autocomplete.search("f");

    equal(autocomplete.value(), "foo");
    equal(autocomplete.current(), null);
});

test("suggest method append text without modifying the user input", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Foo", "Bar"],
        filter: "contains",
        highlightFirst: false,
        suggest: true,
        delay: 0
    });

    input.focus().val("f");
    caret(input[0], 1);
    autocomplete.search("f");

    equal(autocomplete.value(), "foo");
});

test("suggest method accepts an object", 1, function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: [{ name: "Foo" }, { name: "Bar" }],
        dataTextField: "name",
        suggest: true
    });

    autocomplete.dataSource.read();

    autocomplete.suggest(autocomplete.dataSource.view()[0]);

    equal(autocomplete.value(), "Foo");
});

}());
