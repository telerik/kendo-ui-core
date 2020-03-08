(function() {
    var DropDownList = kendo.ui.DropDownList,
        input;

    describe("kendo.ui.DropDownList messages", function () {
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
            var dropDownList = new DropDownList(input, {
                messages: {
                    noData: "custom"
                }
            });
            var noDataTemplateText = dropDownList.list.find(".k-nodata").text();
            assert.equal(noDataTemplateText, "custom");
        });
    });
}());
