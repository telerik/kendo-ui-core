(function() {
    var AutoComplete = kendo.ui.AutoComplete,
        input;

    describe("kendo.ui.AutoComplete messages", function () {
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
            var autoComplete = new AutoComplete(input, {
                messages: {
                    noData: "custom"
                }
            });
            autoComplete.search("aaa");
            var noDataTemplateText = autoComplete.list.find(".k-nodata").text();
            assert.equal(noDataTemplateText, "custom");
        });

        it("clear title is properly set", function() {
            var autoComplete = new AutoComplete(input, {
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

            var clearTitle = autoComplete.wrapper.find('.k-clear-value').attr("title");
            assert.equal(clearTitle, "custom");
        });
    });
}());
