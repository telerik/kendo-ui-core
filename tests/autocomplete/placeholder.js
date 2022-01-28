(function(){

var AutoComplete = kendo.ui.AutoComplete,
    input;

describe("kendo.ui.AutoComplete placeholder", function () {
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
        var autocomplete = input.attr("placeholder", "Select...").kendoAutoComplete().data("kendoAutoComplete");

        assert.equal(autocomplete.options.placeholder, "Select...");
        assert.equal(autocomplete.element.val(), "Select...");
    });

    it("set placeholder if defined", function() {
        var autocomplete = input.kendoAutoComplete({
            placeholder: "Select item..."
        }).data("kendoAutoComplete");

        assert.equal(autocomplete.element.val(), "Select item...");
    });

    it("do not set k-readonly if value", function() {
        var autocomplete = input.val("text1").kendoAutoComplete({
            dataSource: ["text1", "text2"],
            placeholder: "Select item..."
        }).data("kendoAutoComplete");

        assert.isOk(!autocomplete.element.hasClass("k-readonly"));
    });

    it("set placeholder on blur", function(done) {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value("");
        autocomplete.element.focus().blur();
        setTimeout(function() {
            assert.equal(autocomplete.element.val(), "Select...");
            done();
        }, 300);
    });

    it("remove placeholder on focus", function(done) {
        var autocomplete = input.kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.element.focus();
        setTimeout(function() {
            assert.equal(autocomplete.element.val(), "");
            done();
        }, 100);
    });

    it("set placeholder when clear value using API", function() {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value("");

        assert.equal(autocomplete.element.val(), "Select...");
    });

    it("setting null as value shows placeholder", function() {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value(null);

        assert.equal(autocomplete.element.val(), "Select...");
    });

} else {
    it("add placeholder attr to the input", function() {
        var autocomplete = input.attr("placeholder", "test").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        assert.equal(input.attr("placeholder"), "Select...");
    });

    it("do not set k-readonly class", function() {
        var autocomplete = input.attr("placeholder", "test").kendoAutoComplete().data("kendoAutoComplete");

        assert.isOk(!input.hasClass("k-readonly"));
    });
}

    });
}());
