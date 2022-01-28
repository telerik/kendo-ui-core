(function() {

var DateView = kendo.DateView,
    DatePicker = kendo.ui.DatePicker,
    datepicker,
    div, input;

describe("kendo.ui.DatePicker Events", function () {
    beforeEach(function() {
        div = $("<div />").appendTo(Mocha.fixture);
        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {
        datepicker.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("blur should call _change event", function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    assert.isOk(true);
                                }
                           })
                          .data("kendoDatePicker");

    input.val("10/10/2000").focus();
    input[0].blur();
});

it("raise change event", function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    assert.isOk(true);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker._change("10/10/2000");
});

it("raise DOM change event", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    input.bind("change", function() {
        assert.isOk(true);
    });

    datepicker._change("10/10/2000");
});

it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
    input.kendoDatePicker({
        value: new Date(2000, 10, 10, 10, 0, 0)
    });

    input.bind("change", function() {
        assert.isOk(false);
    });

    input.focus()
        .trigger($.Event("keydown", {keyCode: 8}))
        .val("10/10/2010")
        .trigger($.Event("keydown", {keyCode: 13}));
});

it("do not raise change event when use API", function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    assert.isOk(false);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.value(new Date(2000, 10, 10));

    input.focus().blur();

    assert.isOk(true);
});

it("raise open event", function() {
    datepicker = input.kendoDatePicker({
                                open: function() {
                                    assert.isOk(true);
                                    assert.isOk(this === datepicker);
                                }
                           })
                          .data("kendoDatePicker");

    input.next().click();
});

it("raise close event", function() {
    datepicker = input.kendoDatePicker({
                                close: function() {
                                    assert.isOk(true);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.open();
    datepicker._dateIcon.click();
});

it("raise close event document click", function() {
    datepicker = input.kendoDatePicker({
                                close: function() {
                                    assert.isOk(true);
                                    assert.isOk(this === datepicker);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.open();

    $(document.documentElement).mousedown();
});

    });
}());
