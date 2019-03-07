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

describe("kendo.ui.AutoComplete suggestion", function () {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

it("pressing enter calls triggers change", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        change: function() {
            assert.isOk(true);
        }
        });

    autocomplete.search("b");
    input.focus().press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);
});

it("pressing enter triggers change when custom value is entered", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        change: function() {
            assert.isOk(true);
        }
        });

    input.focus().val("test").press(kendo.keys.ENTER);
});

it("pressing tab calls _blur", function() {
    var blurWasCalled, autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true
    });

    autocomplete._blur = function(li) {
        assert.isOk(true);
    };

    autocomplete.current = autocomplete.ul.children().first();
    input.focus().press(kendo.keys.TAB);
});

it("current popup item completes the value of the input if suggest is enabled", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.search();

    assert.equal(input.val(), "baz");
    assert.equal(input.selectedText(), "az");
});

it("current popup item completes the value of the input if suggest is enabled and correct culture is used", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: {
            data: ["KIZ"],
            accentFoldingFiltering: "tr-TR"
        },
        suggest: true,
        ignoreCase: true
    });

    input.focus();
    input.type("kı");
    autocomplete.search();

    assert.equal(input.val(), "kıZ");
    assert.equal(input.selectedText(), "Z");
});

it("current highlighted item completes the value of the input if suggest is enabled", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        highlightFirst: true,
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);

    assert.equal(input.val(), "bar");
    assert.equal(input.selectedText(), "ar");
});

it("suggestion does not suggest on backspace", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete._last = kendo.keys.BACKSPACE; //backspace is clicked
    autocomplete.suggest("baz");
    assert.equal(input.val(), "b");
});

it("suggestion does not suggest on delete", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete._last = kendo.keys.DELETE; //delete is clicked
    autocomplete.suggest("baz");
    assert.equal(input.val(), "b");
});


it("suggestion selects the remainder of the word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("baz");
    assert.equal(input.selectedText(), "az");
});

it("suggestion selects the remainder of the second word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"]
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("baz");
    autocomplete.suggest("bar");
    assert.equal(input.selectedText(), "ar");
});

it("separator", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        separator: ", "
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    input.press(kendo.keys.DOWN);
    input.press(kendo.keys.ENTER);

    assert.equal(input.val(), "baz, ");
});

it("suggestion should suggest correctly", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["Cotton", "bar"]
    });

    input.focus();
    input.type("Co");
    autocomplete.suggest("Cotton");

    assert.equal(input.val(), "Cotton");
    assert.equal(input.selectedText(), "tton");
});

it("suggestion appends only the rest of the text (filter:contains)", function(done) {
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
        assert.equal(input.val(), "oo");
        done();
    }, 200);
});

it("suggestion should use dataItem.text instead of li.text()", function() {
    var autocomplete = new AutoComplete(input, {
            dataSource: ["foo", "bar"],
            template: "#=data#<span>List:</span>#=data#"
        });

    input.focus();
    input.val("f");
    autocomplete.search();

    autocomplete.suggest(autocomplete.ul.children(":first"));
    assert.equal(input.val(), "foo");
});

it("separator and suggestion", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("b");
    autocomplete.search();
    autocomplete.suggest("baz");

    assert.equal(input.selectedText(), "az");
    assert.equal(input.val(), "baz, ");
});

it("separator and suggesting second word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("baz, b");
    autocomplete.search();
    autocomplete.suggest("bar");

    assert.equal(input.selectedText(), "ar");
    assert.equal(input.val(), "baz, bar, ");
});

it("separator and selecting a word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        suggest: true,
        separator: ", "
    });

    autocomplete.dataSource.read();

    input.focus();
    autocomplete.select(autocomplete.ul.children().eq(0));
    assert.equal(input.val(), "foo, ");
});

it("suggest with empty string clears selection", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true
    });

    input.focus();
    input.type("b");
    autocomplete.suggest("bar");
    assert.equal(input.selectedText(), "ar");
    autocomplete.suggest("");
    assert.equal(input.val(), "b");
});

it("suggest with empty string clears selection and adheres to separators", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true,
        separator: ", "
    });

    input.focus();
    input.type("foo, b");
    autocomplete.suggest("bar");
    assert.equal(input.selectedText(), "ar");
    autocomplete.suggest("");
    assert.equal(input.val(), "foo, b, ");
});

it("suggest with null does not throw exception", function() {
    var autocomplete = new AutoComplete(input, {
        suggest: true
    });

    try {
        autocomplete.suggest(null);
        assert.isOk(true);
    } catch(e) {
        assert.isOk(false);
    }
    });

it("search should filter items using filter property", function(done) {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar", "bafoo"],
        filter: "contains"
    });


    autocomplete.dataSource.bind("change", function() {
        assert.equal(autocomplete.dataSource.view().length, 2);
        done();
    });

    input.focus();
    autocomplete.search("foo");
});

it("filtering honors dataTextField", function(done) {
    var data = [{text: "foo"}, {text: "2"}], autocomplete = new AutoComplete(input, {
        dataSource: data,
        dataTextField: "text"
    });

    autocomplete.dataSource.bind("change", function() {
        assert.equal(autocomplete.dataSource.view().length, 1);
        assert.equal(autocomplete.dataSource.view()[0].text, "foo");
        done();
    });

    input.focus();
    autocomplete.search("f");
});

it("refresh method suggests if no item is highlighted", function() {
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

    assert.equal(autocomplete.value(), "foo");
    assert.equal(autocomplete.current(), null);
});

it("suggest method append text without modifying the user input", function() {
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

    assert.equal(autocomplete.value(), "foo");
});

it("suggest method accepts an object", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: [{ name: "Foo" }, { name: "Bar" }],
        dataTextField: "name",
        suggest: true
    });

    autocomplete.dataSource.read();

    autocomplete.suggest(autocomplete.dataSource.view()[0]);

    assert.equal(autocomplete.value(), "Foo");
});

    });
}());
