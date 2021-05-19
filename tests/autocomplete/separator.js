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

describe("kendo.ui.AutoComplete separator", function () {
    beforeEach(function() {
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

it("separator", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["baz", "bar"],
        separator: ", "
    });

    input.focus();
    input.val("b");
    autocomplete.search();
    autocomplete.select(autocomplete.ul.children().first());

    assert.equal(input.val(), "baz, ");
});

it("search uses the last word", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        separator: ", "
    });

    input.focus();
    input.type("foo, b");
    autocomplete.search();
    assert.equal(autocomplete.ul.children().first().text(), "bar");
});

it("search uses the word at the caret position", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar"],
        separator: ", "
    });

    input.focus();
    input.val("foo, bar, ");
    input[0].selectionStart = 0;
    autocomplete.search();
    assert.equal(autocomplete.ul.children().first().text(), "foo");
});

it("select replaces the word at the caret position", function() {
    var autocomplete = new AutoComplete(input, {
        dataSource: ["foo", "bar", "baz"],
        separator: ", "
    });

    input.focus();
    input.val("foo, bar, ");
    input[0].selectionStart = 0;
    autocomplete.dataSource.read();
    autocomplete.select(autocomplete.ul.children().eq(2));
    assert.equal(input.val(), "baz, bar, ");
});

    it("multiple separators, use first one as default", function() {
        var autocomplete = new AutoComplete(input, {
            dataSource: ["baz", "bar"],
            separator: [", ", "; "]
        });

        input.focus();
        input.val("b");
        autocomplete.search();
        autocomplete.select(autocomplete.ul.children().first());

        assert.equal(input.val(), "baz, ");
    });

    it("multiple separators", function(done) {
        var autocomplete = new AutoComplete(input, {
            dataSource: ["baz", "bar"],
            separator: [", ", "; "]
        });

        autocomplete.popup.one("open", function() {
            assert.isOk(true);
            done();
        });
        input.focus();
        input.val("baz; ");
        autocomplete.search();
    });

    it("multiple separators, replace all with default separator", function() {
        var autocomplete = new AutoComplete(input, {
            dataSource: ["baz", "bar"],
            separator: [", ", "; ", "/ "],
            value: "foo; bar, baz/ boo"
        });

        input.focus();
        input.trigger("focusout");
        assert.equal(autocomplete.value(), "foo, bar, baz, boo");
    });
    });
}());
