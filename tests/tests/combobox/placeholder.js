import '@progress/kendo-ui/src/kendo.combobox.js';
import { asyncTest } from '../../helpers/async-utils.js';

let ComboBox = kendo.ui.ComboBox,
    input;

describe("kendo.ui.ComboBox placeholder", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        input.data("kendoComboBox").destroy();
        kendo.destroy(Mocha.fixture);
    });

    if (!kendo.support.placeholder) {
        it("get text from placeholder attr", function() {
            let combobox = input.attr("placeholder", "Select...").kendoComboBox().data("kendoComboBox");

            assert.equal(combobox.options.placeholder, "Select...");
            assert.equal(combobox.input.val(), "Select...");
        });

        it("set placeholder if defined", function() {
            let combobox = input.kendoComboBox({
                placeholder: "Select item..."
            }).data("kendoComboBox");

            assert.equal(combobox.input.val(), "Select item...");
        });

        it("do not set k-readonly if value", function() {
            let combobox = input.kendoComboBox({
                dataSource: ["text1", "text2"],
                placeholder: "Select item...",
                index: 0
            }).data("kendoComboBox");

            assert.isOk(!combobox.input.hasClass("k-readonly"));
        });

        asyncTest("set placeholder on blur", function(done) {
            let combo = input.kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: 1, value: 1 }],
                placeholder: "Select...",
                index: 0
            }).data("kendoComboBox");

            combo.value("");
            combo.input.focus().blur();
            setTimeout(function() {
                done(() => assert.equal(combo.input.val(), "Select..."));
            }, 300);
        });

        it("set placeholder when clear value with API", function() {
            let combo = input.kendoComboBox({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [{ text: 1, value: 1 }],
                placeholder: "Select...",
                index: 0
            }).data("kendoComboBox");

            combo.value("");
            assert.equal(combo.input.val(), "Select...");
        });

        it("setting null as value shows placeholder", function() {
            let combobox = input.val("1").kendoComboBox({
                placeholder: "Select..."
            }).data("kendoComboBox");

            combobox.value(null);

            assert.equal(combobox.element.val(), "");
        });
    } else {
        it("add placeholder attr to the visible input", function() {
            let combobox = input.attr("placeholder", "test").kendoComboBox({
                placeholder: "Select..."
            }).data("kendoComboBox");

            assert.equal(combobox.input.attr("placeholder"), "Select...");
        });

        it("get text from element.placeholder", function() {
            let combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

            assert.equal(combobox.input.attr("placeholder"), "test");
        });

        it("do not set k-readonly class", function() {
            let combobox = input.attr("placeholder", "test").kendoComboBox().data("kendoComboBox");

            assert.isOk(!combobox.input.hasClass("k-readonly"));
        });
    }

});
