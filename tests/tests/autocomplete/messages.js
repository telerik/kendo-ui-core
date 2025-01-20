import '@progress/kendo-ui/src/kendo.autocomplete.js';

let AutoComplete = kendo.ui.AutoComplete,
    input;

describe("kendo.ui.AutoComplete messages", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (input.data('kendoAutoComplete')) {
            input.data('kendoAutoComplete').destroy();
            input.add($("ul")).parent(".k-widget").remove();
        }
    });

    it("noData message is properly set", function() {
        let autoComplete = new AutoComplete(input, {
            messages: {
                noData: "custom"
            }
        });
        autoComplete.search("aaa");
        let noDataTemplateText = autoComplete.list.find(".k-no-data").text();
        assert.equal(noDataTemplateText, "custom");
    });

    it("clear title is properly set", function() {
        let autoComplete = new AutoComplete(input, {
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

        let clearTitle = autoComplete.wrapper.find('.k-clear-value').attr("title");
        assert.equal(clearTitle, "custom");
    });
});
