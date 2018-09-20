(function () {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        keys = kendo.keys,
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

    test("change event of input element fires when altering value with arrow keys", 1, function () {
        var upEvent = { keyCode: keys.UP, preventDefault: $.noop };
        var calls = 0;
        input.on("change", function () {
            calls++;
        });
        dateinput = input.kendoDateInput()
            .data("kendoDateInput");

        dateinput.value(new Date(2000, 10, 10));
        input.focus();
        dateinput._selectSegment();
        dateinput._keydown(upEvent);
        equal(calls,1);
    });

})();
