import '@progress/kendo-ui/src/kendo.multiselect.js';

let MultiSelect = kendo.ui.MultiSelect,
    select;

describe("kendo.ui.MultiSelect messages", function() {
    beforeEach(function() {
        select = $("<select multiple=multiple/>").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (select.data("kendoMultiSelect")) {
            select.data("kendoMultiSelect").destroy();
        }
        select.parents(".k-widget").remove();
    });

    it("noData message is properly set", function() {
        let multiSelect = new MultiSelect(select, {
            messages: {
                noData: "custom"
            }
        });
        let noDataTemplateText = multiSelect.list.find(".k-no-data").text();
        assert.equal(noDataTemplateText, "custom");
    });

    it("clear title is properly set", function() {
        let multiSelect = new MultiSelect(select, {
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

        let clearTitle = multiSelect.wrapper.find('.k-clear-value').attr("title");
        assert.equal(clearTitle, "custom");
    });

    it("down arrow title is properly set", function() {
        let multiSelect = new MultiSelect(select, {
            value: 1,
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [{
                text: "Test",
                value: 1
            }],
            downArrow: true,
            messages: {
                downArrow: "custom"
            }
        });

        let label = multiSelect._arrow.attr("aria-label");
        assert.equal(label, "custom");
    });
});
