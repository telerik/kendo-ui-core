(function() {

var ComboBox = kendo.ui.ComboBox,
    input;

describe("kendo.ui.ComboBox placeholder", function () {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        input.data("kendoComboBox").destroy();
        kendo.destroy(Mocha.fixture);
    });

if (!kendo.support.placeholder) {
    it("get text from placeholder attr", function() {
        var combobox = input.attr("placeholder", "Select...").kendoComboBox().data("kendoComboBox");

        assert.equal(combobox.options.placeholder, "Select...");
        assert.equal(combobox.input.val(), "Select...");
    });

    it("set placeholder if defined", function() {
        var combobox = input.kendoComboBox({
            placeholder: "Select item..."
        }).data("kendoComboBox");

        assert.equal(combobox.input.val(), "Select item...");
    });

    it("do not set k-readonly if value", function() {
        var combobox = input.kendoComboBox({
            dataSource: ["text1", "text2"],
            placeholder: "Select item...",
            index: 0
        }).data("kendoComboBox");

        assert.isOk(!combobox.input.hasClass("k-readonly"));
    });

    it("set placeholder on blur", function(done) {
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
            assert.equal(combo.input.val(), "Select...");
            done();
        }, 300);
    });

    it("set placeholder when clear value with API", function() {
        var combo = input.kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{text: 1, value: 1}],
            placeholder: "Select...",
            index: 0
        }).data("kendoComboBox");

        combo.value("");
        assert.equal(combo.input.val(), "Select...");
    });

    it("setting null as value shows placeholder", function() {
        var combobox = input.val("1").kendoComboBox({
            placeholder: "Select..."
        }).data("kendoComboBox");

        combobox.value(null);

        assert.equal(combobox.element.val(), "");
    });
} else {
    it("add placeholder attr to the visible input", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox({
            placeholder: "Select..."
        }).data("kendoComboBox");

        assert.equal(combobox.input.attr("placeholder"), "Select...");
    });

    it("get text from element.placeholder", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

        assert.equal(combobox.input.attr("placeholder"), "test");
    });

    it("do not set k-readonly class", function() {
        var combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

        assert.isOk(!combobox.input.hasClass("k-readonly"));
    });
}

    });
}());
