import '@progress/kendo-ui/src/kendo.combobox.js';

let ComboBox = kendo.ui.ComboBox,
    input;

describe("kendo.ui.ComboBox messages", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (input.data('kendoComboBox')) {
            input.data('kendoComboBox').destroy();
            input.add($("ul")).parent(".k-input").remove();
        }
    });

    it("noData message is properly set", function() {
        let comboBox = new ComboBox(input, {
            messages: {
                noData: "custom"
            }
        });
        let noDataTemplateText = comboBox.list.find(".k-no-data").text();
        assert.equal(noDataTemplateText, "custom");
    });

    it("clear title is properly set", function() {
        let comboBox = new ComboBox(input, {
            value: 1,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{
                text: "Test",
                value: 1
            }],
            messages: {
                clear: "custom"
            }
        });

        let clearTitle = comboBox.wrapper.find('.k-clear-value').attr("title");
        assert.equal(clearTitle, "custom");
    });
});
