(function() {

var DateView = kendo.DateView,
    DatePicker = kendo.ui.DatePicker,
    datepicker,
    div, input;

module("kendo.ui.DatePicker Events", {
    setup: function() {
        div = $("<div />").appendTo(QUnit.fixture);
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        datepicker.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("blur should call _change event", function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    ok(true);
                                }
                           })
                          .data("kendoDatePicker");

    input.val("10/10/2000").focus();
    input[0].blur();
});

test("raise change event", 1, function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    ok(true);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker._change("10/10/2000");
});

test("raise DOM change event", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    input.bind("change", function() {
        ok(true);
    });

    datepicker._change("10/10/2000");
});

test("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", 0, function() {
    input.kendoDatePicker({
        value: new Date(2000, 10, 10, 10, 0, 0)
    });

    input.bind("change", function() {
        ok(false);
    });

    input.focus()
        .trigger($.Event("keydown", {keyCode: 8}))
        .val("10/10/2010")
        .trigger($.Event("keydown", {keyCode: 13}));
});

test("do not raise change event when use API", 1, function() {
    datepicker = input.kendoDatePicker({
                                change: function() {
                                    ok(false);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.value(new Date(2000, 10, 10));

    input.focus().blur();

    ok(true);
});

test("raise open event", function() {
    datepicker = input.kendoDatePicker({
                                open: function() {
                                    ok(true);
                                    ok(this === datepicker);
                                }
                           })
                          .data("kendoDatePicker");

    input.next().click();
});

test("raise close event", function() {
    datepicker = input.kendoDatePicker({
                                close: function() {
                                    ok(true);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.open();
    datepicker._dateIcon.click();
});

test ("raise close event document click", function() {
    datepicker = input.kendoDatePicker({
                                close: function() {
                                    ok(true);
                                    ok(this === datepicker);
                                }
                           })
                          .data("kendoDatePicker");

    datepicker.open();

    $(document.documentElement).mousedown();
});

})();
