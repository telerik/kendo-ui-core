(function(){

var AutoComplete = kendo.ui.AutoComplete,
    input;

module("kendo.ui.AutoComplete placeholder", {
    setup: function() {
        kendo.ns = "kendo-";
        input = $("<input>").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.ns = "";
    }
});

if (!kendo.support.placeholder) {
    test("get text from placeholder attr", function() {
        var autocomplete = input.attr("placeholder", "Select...").kendoAutoComplete().data("kendoAutoComplete");

        equal(autocomplete.options.placeholder, "Select...");
        equal(autocomplete.element.val(), "Select...");
    });

    test("set placeholder if defined", function() {
        var autocomplete = input.kendoAutoComplete({
            placeholder: "Select item..."
        }).data("kendoAutoComplete");

        equal(autocomplete.element.val(), "Select item...");
    });

    test("do not set k-readonly if value", function() {
        var autocomplete = input.val("text1").kendoAutoComplete({
            dataSource: ["text1", "text2"],
            placeholder: "Select item..."
        }).data("kendoAutoComplete");

        ok(!autocomplete.element.hasClass("k-readonly"));
    });

    asyncTest("set placeholder on blur", 1, function() {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value("");
        autocomplete.element.focus().blur();
        setTimeout(function() {
            start();
            equal(autocomplete.element.val(), "Select...");
        }, 300);
    });

    asyncTest("remove placeholder on focus", 1, function() {
        var autocomplete = input.kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.element.focus();
        setTimeout(function() {
            start();
            equal(autocomplete.element.val(), "");
        }, 100);
    });

    test("set placeholder when clear value using API", 1, function() {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value("");

        equal(autocomplete.element.val(), "Select...");
    });

    test("setting null as value shows placeholder", function() {
        var autocomplete = input.val("1").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        autocomplete.value(null);

        equal(autocomplete.element.val(), "Select...");
    });

} else {
    test("add placeholder attr to the input", function() {
        var autocomplete = input.attr("placeholder", "test").kendoAutoComplete({
            placeholder: "Select..."
        }).data("kendoAutoComplete");

        equal(input.attr("placeholder"), "Select...");
    });

    test("do not set k-readonly class", function() {
        var autocomplete = input.attr("placeholder", "test").kendoAutoComplete().data("kendoAutoComplete");

        ok(!input.hasClass("k-readonly"));
    });
}

}());
