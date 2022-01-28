(function() {

    var TimeView = kendo.TimeView,
        div, input;

    function getToday() {
        var today = new Date();

        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        return today;
    }

    describe("kendo.ui.TimePicker Events", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
        });

        it("blur should call _change event", function() {
            var timepicker = input.kendoTimePicker({
                change: function() {
                    assert.isOk(true);
                }
            })
                .data("kendoTimePicker");

            input.val("10:00 AM").focus();
            input[0].blur();
        });

        it("raise change event", function() {
            var timepicker = input.kendoTimePicker({
                change: function() {
                    assert.isOk(true);
                }
            })
                .data("kendoTimePicker");

            timepicker._change("10:00 AM");
        });

        it("raise DOM change event", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            input.bind("change", function() {
                assert.isOk(true);
            });

            timepicker._typing = true;
            timepicker._change("10:00 AM");
        });

        it("do not raise change event if no changes", function() {
            var timepicker = input.kendoTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0),
                change: function() {
                    assert.isOk(false);
                }
            })
                .data("kendoTimePicker");

            input.focus().blur();
        });

        it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
            input.kendoTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0)
            });

            input.bind("change", function() {
                assert.isOk(false);
            });

            input.focus()
                .trigger($.Event("keydown", { keyCode: 8 }))
                .val("10:00 A")
                .trigger($.Event("keydown", { keyCode: 13 }));
        });

        it("click li raises change event", function() {
            var timepicker = input.kendoTimePicker({
                change: function() {
                    assert.isOk(true);
                }
            })
                .data("kendoTimePicker");

            timepicker.open();
            timepicker.timeView.ul.find("li:first").click();
        });

        it("raise open event", function() {
            var timepicker = input.kendoTimePicker({
                open: function() {
                    assert.isOk(true);
                    assert.isOk(this === timepicker);
                }
            })
                .data("kendoTimePicker");

            timepicker._arrow.click();
        });

        it("raise close event", function() {
            var timepicker = input.kendoTimePicker({
                close: function() {
                    assert.isOk(true);
                    assert.isOk(this === timepicker);
                }
            })
                .data("kendoTimePicker");

            timepicker.open();
            timepicker._arrow.click();
        });

        it("raise close event document click", function() {
            var timepicker = input.kendoTimePicker({
                close: function() {
                    assert.isOk(true);
                }
            })
                .data("kendoTimePicker");

            timepicker.open();
            $(document.documentElement).mousedown();
        });



    });
}());
