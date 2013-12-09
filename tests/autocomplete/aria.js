(function(){

var AutoComplete = kendo.ui.AutoComplete;

var input;

module("autocomplete ARIA", {
    setup: function() {
        input = $("<input>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("AutoComplete adds ARIA role='textbox'", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select..."
    });

    equal(autocomplete.element.attr("role"), "textbox");
});

test("AutoComplete adds aria-haspopup", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select..."
    });

    equal(autocomplete.element.attr("aria-haspopup"), "true");
});

test("AutoComplete adds aria-owns", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select..."
    });

    equal(autocomplete.element.attr("aria-owns"), autocomplete.ul.attr("id"));
});

test("AutoComplete adds aria-autocomplete='both'", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: true
    });

    equal(autocomplete.element.attr("aria-autocomplete"), "both");
});

test("AutoComplete adds aria-autocomplete='list' if no suggest", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: false
    });

    equal(autocomplete.element.attr("aria-autocomplete"), "list");
});

test("Autocomplete sets tabindex", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: false
    });

    equal(autocomplete.element.prop("tabIndex"), "0");
});

test("Autocomplete preserves tab order", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false
    });

    equal(autocomplete.element.attr("tabIndex"), "2");
});

test("Autocomplete adds aria-disabled=false", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false
    });

    equal(autocomplete.element.attr("aria-disabled"), "false");
});

test("Autocomplete adds aria-disabled=true", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false,
        enable: false
    });

    equal(autocomplete.element.attr("aria-disabled"), "true");
});

test("Autocomplete adds aria-expanded", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select...",
        dataSource: ["Item"],
        suggest: false
    });

    autocomplete.search("I");

    equal(autocomplete.element.attr("aria-expanded"), "true");
});

}());
