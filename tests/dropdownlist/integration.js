(function() {
    var DropDownList = kendo.ui.DropDownList,
        viewModel, select;

    describe("kendo.ui.DropDownList integration", function() {
        beforeEach(function() {
            viewModel = {
                tickets: [
                    { name: "Economy", price: 199.95 },
                    { name: "Business", price: 449.22 },
                    { name: "First Class", price: 1199.99 }
                ],
                chosenTicket: ko.observable()
            }

            select = $('<select id="ticket" data-bind="options: tickets, optionsCaption: \'Choose...\', optionsText: \'name\', value: chosenTicket"></select>').appendTo(Mocha.fixture);

            ko.applyBindings(viewModel);

            select.kendoDropDownList().trigger("change"); //notify ko to re-init options of the select
        });
        afterEach(function() {
            select.data("kendoDropDownList").destroy();
            select.closest(".k-widget").remove();
        });

        it("DropDownList triggers change event on click", function() {
            var ddl = select.data("kendoDropDownList");

            ddl.open();
            ddl.ul.find("li:first").click();
            ddl.ul.find("li:last").click();

            assert.isOk(viewModel.chosenTicket())
        });

        it("DropDownList triggers change event on click of optionLabel", function() {
            var ddl = select.data("kendoDropDownList");

            ddl.open();
            ddl.ul.find("li:last").click();
            ddl.ul.find("li:first").click();

            assert.equal(viewModel.chosenTicket(), null)
        });
    });
}());
