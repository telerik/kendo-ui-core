(function() {

    var DateTimePicker = kendo.ui.DateTimePicker,
        input;

    describe("kendo.ui.DateTimePicker events", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            input.data("kendoDateTimePicker").destroy();
        });

        it("DateTimePicker triggers change event on DateView change", function() {
            var today = new Date(),
                datetimepicker = new DateTimePicker(input),
                dateView = datetimepicker.dateView;

            datetimepicker.bind("change", function() {
                assert.equal(+datetimepicker.value(), +today);
            });

            //simulate user click
            dateView._calendar();
            dateView.calendar.value(today);
            dateView.calendar.trigger("change");
        });

        it("DateTimePicker triggers change event on TimeView click", function() {
            var datetimepicker = new DateTimePicker(input),
                timeView = datetimepicker.timeView,
                li, date;

            timeView.refresh();
            li = timeView.ul.children(":first");
            date = timeView._parse(li.text());

            datetimepicker.bind("change", function() {
                assert.equal(+datetimepicker.value(), +date);
            });

            li.click();
        });

        it("DateTimePicker triggers change on blur", function() {
            var datetimepicker = new DateTimePicker(input),
                today = new Date(2000, 10, 10, 10, 30, 0);

            datetimepicker.bind("change", function() {
                assert.equal(+datetimepicker.value(), +today);
            });

            input.focus().val(kendo.toString(today, datetimepicker.options.format)).blur();
        });

        it("DateTimePicker raises change event on enter", function() {
            var datetimepicker = new DateTimePicker(input, {
                change: function() {
                    assert.isOk(true);
                }
            });

            input.val("10/10/2000 12:00 AM");
            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });
        });

        it("DateTimePicker does not raise change event on enter", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                change: function() {
                    assert.isOk(false);
                }
            });

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });
        });

        it("DateTimePicker does not raise change when navigate in TimeView", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                change: function() {
                    assert.isOk(false);
                }
            });

            datetimepicker.open("time");
            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });
        });

        it("DateTimePicker triggers open event when timeView is opened", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                open: function(e) {
                    assert.isOk(true);
                    assert.equal(e.view, "time");
                }
            });

            datetimepicker.timeView.popup.open();
        });

        it("DateTimePicker triggers open event when dateView is opened", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                open: function(e) {
                    assert.isOk(true);
                    assert.equal(e.view, "date");
                }
            });

            datetimepicker.dateView.popup.open();
        });

        it("DateTimePicker triggers close event when timeView is opened", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                close: function(e) {
                    assert.isOk(true);
                    assert.equal(e.view, "time");
                }
            });

            datetimepicker.timeView.popup.open();
            datetimepicker.timeView.popup.close();
        });

        it("DateTimePicker triggers close event when dateView is opened", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                close: function(e) {
                    assert.isOk(true);
                    assert.equal(e.view, "date");
                }
            });

            datetimepicker.open("date");
            datetimepicker.dateView.popup.close();
        });

        it("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", function() {
            input.kendoDateTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0)
            });

            input.bind("change", function() {
                assert.isOk(false);
            });

            input.focus()
                .trigger($.Event("keydown", { keyCode: 8 }))
                .val("10/10/2010")
                .trigger($.Event("keydown", { keyCode: 13 }));
        });

    });
}());
