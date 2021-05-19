(function() {
    var MultiSelect = kendo.ui.MultiSelect,
        select;

    describe("kendo.ui.MultiSelect messages", function () {
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
            var multiSelect = new MultiSelect(select, {
                messages: {
                    noData: "custom"
                }
            });
            var noDataTemplateText = multiSelect.list.find(".k-nodata").text();
            assert.equal(noDataTemplateText, "custom");
        });

        it("clear title is properly set", function() {
            var multiSelect = new MultiSelect(select, {
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

            var clearTitle = multiSelect.wrapper.find('.k-clear-value').attr("title");
            assert.equal(clearTitle, "custom");
        });
    });
}());
