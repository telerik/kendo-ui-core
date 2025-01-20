import '@progress/kendo-ui/src/kendo.dropdownlist.js';

let DropDownList = kendo.ui.DropDownList,
    input;

describe("kendo.ui.DropDownList messages", function() {
    beforeEach(function() {
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        if (input.data('kendoDropDownList')) {
            input.data('kendoDropDownList').destroy();
            input.add($("ul")).parent(".k-widget").remove();
        }
    });

    it("noData message is properly set", function() {
        let dropDownList = new DropDownList(input, {
            messages: {
                noData: "custom"
            }
        });
        let noDataTemplateText = dropDownList.list.find(".k-no-data").text();
        assert.equal(noDataTemplateText, "custom");
    });
});
