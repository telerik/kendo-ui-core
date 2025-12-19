import '@progress/kendo-ui/src/kendo.multiselect.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

function populateSelect() {
    let options = [];
    for (let i = 0; i < 5; i++) {
        options.push("<option value='" + i + "'>Option" + i + "</option>");
    }

    select.html(options);
}

describe("kendo.ui.MultiSelect Placeholder", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        select = $("<select multiple />").appendTo(Mocha.fixture);
        populateSelect();
    });
    afterEach(function() {
        kendo.ns = "";
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }

        select.parents(".k-widget").remove();
    });

    it("MultiSelect gets placeholder from data-placeholder attr", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        assert.equal(multiselect.options.placeholder, "Select...");
    });

    it("MultiSelect shows placeholder on init", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));
        assert.equal(multiselect.input.attr("placeholder"), "Select...");
    });

    it("MultiSelect scales input on placeholder shows", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        assert.isOk(multiselect.input.width() > 35);
    });

    it("MultiSelect hides placeholder if any value", function() {
        let multiselect = new MultiSelect(select.val("0").data("placeholder", "Select..."));

        assert.equal(multiselect.input.val(), "");
        assert.isOk(!multiselect.input.hasClass("k-readonly"));
    });

    it("MultiSelect hides placeholder if any item is selected", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.ul.children().first().click();

        assert.equal(multiselect.input.val(), "");
        assert.isOk(!multiselect.input.hasClass("k-readonly"));
    });

    it("MultiSelect does not show placeholder if items are deleted", function() {
        let multiselect = new MultiSelect(select.val("0").data("placeholder", "Select..."));

        multiselect.input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.BACKSPACE
        });

        assert.equal(multiselect.input.val(), "");
        assert.isOk(!multiselect.input.hasClass("k-readonly"));
    });

    it("MultiSelect hides placeholder on focus", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.input.focus();

        assert.equal(multiselect.input.val(), "");
    });

    it("MultiSelect shows placeholder on blur", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."));

        multiselect.input.blur();

        assert.equal(multiselect.input.attr("placeholder"), "Select...");
    });

    it("MultiSelect keeps the filter value when autoClose is false", function() {
        let multiselect = new MultiSelect(select.data("placeholder", "Select..."), { autoClose: false });
        let input = multiselect.input;
        let filterText = "2";

        input.focus().val(filterText);
        multiselect.open();

        multiselect.ul.children().first().click();

        assert.equal(input.val(), filterText);
        assert.equal(kendo.caret(input[0])[1], 1);
    });

    it("MultiSelect clears filter value on blur when autoClose is false", function() {
        let filterText = "2";
        let placeholder = "Select...";
        let multiselect = new MultiSelect(select.data("placeholder", placeholder), { autoClose: false });

        multiselect.input.focus().val(filterText);
        multiselect.open();

        multiselect.ul.children().first().click();

        multiselect.input.blur();

        assert.equal(multiselect.input.val(), "");
    });

});
