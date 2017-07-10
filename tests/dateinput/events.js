(function () {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        div, input;

    module("kendo.ui.DateInput Events", {
        setup: function () {
            div = $("<div />").appendTo(QUnit.fixture);
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function () {
            dateinput.destroy();
            kendo.destroy(QUnit.fixture);
        }
    });

    test("do not raise change event when use API", 1, function () {
        dateinput = input.kendoDateInput({
            change: function () {
                ok(false);
            }
        })
            .data("kendoDateInput");

        dateinput.value(new Date(2000, 10, 10));

        input.focus().blur();

        ok(true);
    });

})();
