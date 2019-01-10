(function(){

var AutoComplete = kendo.ui.AutoComplete;

var input;

describe("autocomplete ARIA", function () {
    beforeEach(function() {
        kendo.effects.disable();
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
    });

it("AutoComplete adds ARIA role='textbox'", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select..."
    });

    assert.equal(autocomplete.element.attr("role"), "textbox");
});

it("AutoComplete adds aria-haspopup", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select..."
    });

    assert.equal(autocomplete.element.attr("aria-haspopup"), "true");
});

it("AutoComplete adds aria-owns", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select..."
    });

    assert.equal(autocomplete.element.attr("aria-owns"), autocomplete.ul.attr("id"));
});

it("AutoComplete adds aria-autocomplete='both'", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: true
    });

    assert.equal(autocomplete.element.attr("aria-autocomplete"), "both");
});

it("AutoComplete adds aria-autocomplete='list' if no suggest", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: false
    });

    assert.equal(autocomplete.element.attr("aria-autocomplete"), "list");
});

it("Autocomplete sets tabindex", function() {
    var autocomplete = new AutoComplete(input.attr("id", "test"), {
        placeholder: "Select...",
        suggest: false
    });

    assert.equal(autocomplete.element.prop("tabIndex"), "0");
});

it("Autocomplete preserves tab order", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false
    });

    assert.equal(autocomplete.element.attr("tabIndex"), "2");
});

it("Autocomplete adds aria-disabled=false", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false
    });

    assert.equal(autocomplete.element.attr("aria-disabled"), "false");
});

it("Autocomplete adds aria-disabled=true", function() {
    var autocomplete = new AutoComplete(input.attr("tabIndex", "2"), {
        placeholder: "Select...",
        suggest: false,
        enable: false
    });

    assert.equal(autocomplete.element.attr("aria-disabled"), "true");
});

it("Autocomplete adds aria-expanded", function() {
    var autocomplete = new AutoComplete(input, {
        placeholder: "Select...",
        dataSource: ["Item"],
        suggest: false
    });

    autocomplete.search("I");

    assert.equal(autocomplete.element.attr("aria-expanded"), "true");
});

    });
}());
