import '@progress/kendo-ui/src/kendo.autocomplete.js';

let AutoComplete = kendo.ui.AutoComplete,
    input;

describe("kendo.ui.AutoComplete placeholder", function() {
    beforeEach(function() {
        kendo.ns = "kendo-";
        input = $("<input>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        kendo.destroy(Mocha.fixture);
        kendo.ns = "";
    });

    if (!kendo.support.placeholder) {
        it("get text from placeholder attr", function() {
            let autocomplete = input.attr("placeholder", "Select...").kendoAutoComplete().data("kendoAutoComplete");

            assert.equal(autocomplete.options.placeholder, "Select...");
            assert.equal(autocomplete.element.val(), "Select...");
        });

        it("set placeholder if defined", function() {
            let autocomplete = input.kendoAutoComplete({
                placeholder: "Select item..."
            }).data("kendoAutoComplete");

            assert.equal(autocomplete.element.val(), "Select item...");
        });

        it("do not set k-readonly if value", function() {
            let autocomplete = input.val("text1").kendoAutoComplete({
                dataSource: ["text1", "text2"],
                placeholder: "Select item..."
            }).data("kendoAutoComplete");

            assert.isOk(!autocomplete.element.hasClass("k-readonly"));
        });

        it("set placeholder on blur", async function() {
            let autocomplete = input.val("1").kendoAutoComplete({
                placeholder: "Select..."
            }).data("kendoAutoComplete");

            autocomplete.value("");
            autocomplete.element.focus().blur();
            await vi.waitUntil(() => autocomplete.element.val() === "Select...");
        });

        it("remove placeholder on focus", async function() {
            let autocomplete = input.kendoAutoComplete({
                placeholder: "Select..."
            }).data("kendoAutoComplete");

            autocomplete.element.focus();
            await vi.waitUntil(() => autocomplete.element.val() === "");
        });

        it("set placeholder when clear value using API", function() {
            let autocomplete = input.val("1").kendoAutoComplete({
                placeholder: "Select..."
            }).data("kendoAutoComplete");

            autocomplete.value("");

            assert.equal(autocomplete.element.val(), "Select...");
        });

        it("setting null as value shows placeholder", function() {
            let autocomplete = input.val("1").kendoAutoComplete({
                placeholder: "Select..."
            }).data("kendoAutoComplete");

            autocomplete.value(null);

            assert.equal(autocomplete.element.val(), "Select...");
        });

    } else {
        it("add placeholder attr to the input", function() {
            let autocomplete = input.attr("placeholder", "test").kendoAutoComplete({
                placeholder: "Select..."
            }).data("kendoAutoComplete");

            assert.equal(input.attr("placeholder"), "Select...");
        });

        it("do not set k-readonly class", function() {
            let autocomplete = input.attr("placeholder", "test").kendoAutoComplete().data("kendoAutoComplete");

            assert.isOk(!input.hasClass("k-readonly"));
        });
    }

});
