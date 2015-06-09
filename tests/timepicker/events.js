(function() {

    var TimeView = kendo.TimeView,
        div, input;

    function getToday() {
        var today = new Date();

        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        return today;
    }

    module("kendo.ui.TimePicker Events", {
        setup: function() {
            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
        }
    });

    test("blur should call _change event", 1, function() {
         var timepicker = input.kendoTimePicker({
                                    change: function() {
                                        ok(true);
                                    }
                               })
                              .data("kendoTimePicker");

        input.val("10:00 AM").focus();
        input[0].blur();
    });

    test("raise change event", 1, function() {
        var timepicker = input.kendoTimePicker({
                                    change: function() {
                                        ok(true);
                                    }
                               })
                              .data("kendoTimePicker");

        timepicker._change("10:00 AM");
    });

    test("raise DOM change event", 1, function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        input.bind("change", function() {
            ok(true);
        });

        timepicker._change("10:00 AM");
    });

    test("do not raise change event if no changes", 0, function() {
        var timepicker = input.kendoTimePicker({
                                    value: new Date(2000, 10, 10, 10, 0, 0),
                                    change: function() {
                                        ok(false);
                                    }
                               })
                              .data("kendoTimePicker");

        input.focus().blur();
    });

    test("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", 0, function() {
        input.kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0)
        });

        input.bind("change", function() {
            ok(false);
        });

        input.focus()
            .trigger($.Event("keydown", {keyCode: 8}))
            .val("10:00 A")
            .trigger($.Event("keydown", {keyCode: 13}));
    });

    test("click li raises change event", 1, function() {
        var timepicker = input.kendoTimePicker({
                                    change: function() {
                                        ok(true);
                                    }
                               })
                              .data("kendoTimePicker");

            timepicker.open();
            timepicker.timeView.ul.find("li:first").click();
    });

    test("raise open event", 2, function() {
        var timepicker = input.kendoTimePicker({
                                    open: function() {
                                        ok(true);
                                        ok(this === timepicker);
                                    }
                               })
                              .data("kendoTimePicker");

        timepicker._arrow.click();
    });

    test("raise close event", 2, function() {
        var timepicker = input.kendoTimePicker({
                                    close: function() {
                                        ok(true);
                                        ok(this === timepicker);
                                    }
                               })
                              .data("kendoTimePicker");

        timepicker.open();
        timepicker._arrow.click();
    });

    test("raise close event document click", 1, function() {
        var timepicker = input.kendoTimePicker({
                                    close: function() {
                                        ok(true);
                                    }
                               })
                              .data("kendoTimePicker");

        timepicker.open();
        $(document.documentElement).mousedown();
    });



})();
