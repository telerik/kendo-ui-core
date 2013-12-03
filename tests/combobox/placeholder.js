(function() {

var ComboBox = kendo.ui.ComboBox,
    input;

module("kendo.ui.ComboBox placeholder", {
    setup: function() {
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        input.data("kendoComboBox").destroy();
        kendo.destroy(QUnit.fixture);
    }
});

if (!kendo.support.placeholder) {
    test("get text from placeholder attr", function() {
        var combobox = input.attr("placeholder", "Select...").kendoComboBox().data("kendoComboBox");

        equal(combobox.options.placeholder, "Select...");
        equal(combobox.input.val(), "Select...");
    });

    test("set placeholder if defined", function() {
        var combobox = input.kendoComboBox({
            placeholder: "Select item..."
        }).data("kendoComboBox");

        equal(combobox.input.val(), "Select item...");
    });

    test("do not set k-readonly if value", function() {
        var combobox = input.kendoComboBox({
            dataSource: ["text1", "text2"],
            placeholder: "Select item...",
            index: 0
        }).data("kendoComboBox");

        ok(!combobox.input.hasClass("k-readonly"));
    });

    asyncTest("set placeholder on blur", 1, function() {
        var combo = input.kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: 1, value: 1}],
            placeholder: "Select...",
            index: 0
        }).data("kendoComboBox");

        combo.value("");
        combo.input.focus().blur();
        setTimeout(function() {
            start();
            equal(combo.input.val(), "Select...");
        }, 300);
    });

    test("set placeholder when clear value with API", 1, function() {
        var combo = input.kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: 1, value: 1}],
            placeholder: "Select...",
            index: 0
        }).data("kendoComboBox");

        combo.value("");
        equal(combo.input.val(), "Select...");
    });

    test("setting null as value shows placeholder", function() {
        var combobox = input.val("1").kendoComboBox({
            placeholder: "Select..."
        }).data("kendoComboBox");

        combobox.value(null);

        equal(combobox.element.val(), "");
    });
} else {
    test("add placeholder attr to the visible input", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox({
            placeholder: "Select..."
        }).data("kendoComboBox");

        equal(combobox.input.attr("placeholder"), "Select...");
    });

    test("get text from element.placeholder", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

        equal(combobox.input.attr("placeholder"), "test");
    });

    test("do not set k-readonly class", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

        ok(!combobox.input.hasClass("k-readonly"));
    });
}

})();
