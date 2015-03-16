(function() {
    var DropDownList = kendo.ui.DropDownList,
    viewModel, select;

    module("kendo.ui.DropDownList integration", {
        setup: function() {
            viewModel = {
                tickets: [
                    { name: "Economy", price: 199.95 },
                    { name: "Business", price: 449.22 },
                    { name: "First Class", price: 1199.99 }
                ],
                chosenTicket: ko.observable()
            }

            select = $('<select id="ticket" data-bind="options: tickets, optionsCaption: \'Choose...\', optionsText: \'name\', value: chosenTicket"></select>').appendTo(QUnit.fixture);

            ko.applyBindings(viewModel);

            select.kendoDropDownList().trigger("change"); //notify ko to re-init options of the select
        },
        teardown: function() {
            select.data("kendoDropDownList").destroy();
            select.closest(".k-widget").remove();
        }
    });

    test("DropDownList triggers change event on click", function() {
        var ddl = select.data("kendoDropDownList");

        ddl.open();
        ddl.ul.find("li:first").click();
        ddl.ul.find("li:last").click();

        ok(viewModel.chosenTicket())
    });

    test("DropDownList triggers change event on click of optionLabel", function() {
        var ddl = select.data("kendoDropDownList");

        ddl.open();
        ddl.ul.find("li:last").click();
        ddl.ul.find("li:first").click();

        equal(viewModel.chosenTicket(), null)
    });
})();
