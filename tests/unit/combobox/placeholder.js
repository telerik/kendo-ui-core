import '@progress/kendo-ui/src/kendo.combobox.js';
import { asyncTest } from '../../helpers/unit/async-utils.js';

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
});
