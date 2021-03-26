(function() {
    var ComboBox = kendo.ui.ComboBox,
        input;

    describe("kendo.ui.ComboBox messages", function () {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            if (input.data('kendoComboBox')) {
                input.data('kendoComboBox').destroy();
                input.add($("ul")).parent(".k-widget").remove();
            }
        });

        it("noData message is properly set", function() {
            var comboBox = new ComboBox(input, {
                messages: {
                    noData: "custom"
                }
            });
            var noDataTemplateText = comboBox.list.find(".k-nodata").text();
            assert.equal(noDataTemplateText, "custom");
        });

        it("clear title is properly set", function() {
            var comboBox = new ComboBox(input, {
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

            var clearTitle = comboBox.wrapper.find('.k-clear-value').attr("title");
            assert.equal(clearTitle, "custom");
        });
    });
}());
