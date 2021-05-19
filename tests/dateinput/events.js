(function() {

    var DateInput = kendo.ui.DateInput,
        dateinput,
        keys = kendo.keys,
        div, input;

    describe("kendo.ui.DateInput Events", function() {
        beforeEach(function() {
            div = $("<div />").appendTo(Mocha.fixture);
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            dateinput.destroy();
            kendo.destroy(Mocha.fixture);
        });

        it("do not raise change event when use API", function() {
            dateinput = input.kendoDateInput({
                change: function() {
                    assert.isOk(false);
                }
            })
                .data("kendoDateInput");

            dateinput.value(new Date(2000, 10, 10));

            input.focus().blur();

            assert.isOk(true);
        });

        it("change event of input element fires when altering value with arrow keys", function() {
            var upEvent = { keyCode: keys.UP, preventDefault: $.noop };
            var calls = 0;
            input.on("change", function() {
                calls++;
            });
            dateinput = input.kendoDateInput()
                .data("kendoDateInput");

            dateinput.value(new Date(2000, 10, 10));
            input.focus();
            dateinput._selectSegment();
            dateinput._keydown(upEvent);
            assert.equal(calls, 1);
        });

    });
}());
