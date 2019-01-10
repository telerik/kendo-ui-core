(function() {

    var TimeView = kendo.TimeView,
        keys = kendo.keys,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    describe("kendo.ui.TimePicker Navigation", function() {
        beforeEach(function() {

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            kendo.destroy(Mocha.fixture);
        });

        it("move should select first item", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                change: $.noop
            });

            tv.open();
            tv.move({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.equal(tv.ul.find("li.k-state-selected").index(), 0);
            tv.destroy();
        });

        it("move should select last item", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                change: $.noop
            });

            tv.open();
            tv.move({ keyCode: keys.UP, preventDefault: $.noop });

            assert.equal(tv.ul.find("li.k-state-selected").index(), tv.ul.find("li").length - 1);
            tv.destroy();
        });

        it("move should select next item", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                change: $.noop
            });

            tv.open();
            tv.current(tv.ul[0].firstChild);

            tv.move({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.equal(tv.ul.find("li.k-state-selected").index(), 1);
            tv.destroy();
        });

        it("move should select previous item", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                change: $.noop
            });

            tv.open();
            tv.current(tv.ul.children().eq(1));

            tv.move({ keyCode: keys.UP, preventDefault: $.noop });

            assert.equal(tv.ul.find("li.k-state-selected").index(), 0);
            tv.destroy();
        });

        it("move should not raise error", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                change: $.noop
            });

            tv.open();
            tv._current = $(tv.ul.children(":first"));
            tv.move({ keyCode: keys.UP, preventDefault: $.noop });

            assert.isOk(true);
            tv.destroy();
        });

        it("move should call change handler", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                format: "hh:mm tt",
                change: function(value) {
                    assert.equal(value, "12:00 AM");
                }
            });

            tv.open();

            tv.current(tv.ul.children().eq(1));

            tv.move({ keyCode: keys.UP, preventDefault: $.noop });
            tv.destroy();
        });

        it("click item should call change handler", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                format: "hh:mm tt",
                change: function(value) {
                    assert.equal(value, "12:00 AM");
                }
            });

            tv.open();
            tv.ul.children().eq(0).click();
            tv.destroy();
        });

        it("click item should close popup", function() {
            var tv = new TimeView({
                min: MIDNIGHT,
                anchor: input,
                max: MIDNIGHT,
                interval: 30,
                format: "hh:mm tt",
                change: $.noop
            });

            tv.open();
            var li = tv.ul.children().eq(0);
            tv.select(li);

            li.click();

            assert.isOk(!tv.popup.visible());
            tv.destroy();
        });

        //timepicker
        it("press down arrow should select next li and update value", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();
            input.focus().trigger({ type: "keydown", keyCode: keys.DOWN });

            assert.isOk(timepicker.timeView._current);
            assert.equal(timepicker.timeView._current.index(), 0);
            assert.equal(input.val(), "12:00 AM");
        });

        it("click arrow should call _click", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker._arrow.click();

            assert.equal(document.activeElement, input[0]);
        });

        it("tabbing out should update timeView", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();

            input.focus().val("2:00 PM").blur();

            assert.equal(timepicker.timeView.ul.find("li.k-state-selected").text(), "2:00 PM");
        });

        it("should clear selected item if no such time", function() {
            var timepicker = input.kendoTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0)
            }).data("kendoTimePicker");

            timepicker.open();

            assert.isOk(timepicker.timeView.ul.find("li.k-state-selected")[0]);

            input.focus().val("2:33 PM").blur();

            assert.isOk(!timepicker.timeView.ul.find("li.k-state-selected")[0]);
        });

        it("do not change input value if not valid time if dateInput option is enabled ", function() {
            input.kendoTimePicker({
                dateInput: true
            });

            input.focus().val("10:minutes AM/PM").trigger("focusout");

            assert.equal(input.val(), "10:minutes AM/PM");
        });

        it("do not change input value if not a valid time is typed and dateInput option is enabled ", function() {
            input.kendoTimePicker({
                dateInput: true,
                value: new Date()
            });

            input.focus().val("10:minutes AM/PM").trigger("focusout");

            assert.equal(input.val(), "10:minutes AM/PM");
        });

        it("do not clear input if not valid time", function() {
            var timepicker = input.kendoTimePicker({
                value: new Date(2000, 10, 10, 10, 0, 0)
            }).data("kendoTimePicker");

            timepicker.open();

            input.focus().val("invalid").blur();

            assert.isOk(!timepicker.timeView.ul.find("li.k-state-selected")[0]);
            assert.equal(timepicker._value, null);
            assert.equal(input.val(), "invalid");
        });

        it("Enter should update value of the timepicker", function() {
            var date = new Date(2000, 10, 10),
                timepicker = input.kendoTimePicker({
                    value: date
                }).data("kendoTimePicker");

            input.val("12:22 PM").trigger({ type: "keydown", keyCode: keys.ENTER });

            date.setHours(12);
            date.setMinutes(22);

            assert.equal(+timepicker.value(), +date);
        });

        it("press enter should call preventDefault when popup is visible", function(done) {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();

            timepicker.element.focus().trigger({
                type: "keydown",
                keyCode: keys.ENTER,
                preventDefault: function() {
                    assert.isOk(true);
                    done();
                }
            });
        });

        it("select time with enter clear selection", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();
            input.trigger({ type: "keydown", keyCode: keys.DOWN });
            input.trigger({ type: "keydown", keyCode: keys.ENTER });

            timepicker.open();

            assert.isOk(timepicker.timeView.current().hasClass("k-state-selected"));
        });

        it("TimePicker does not update the input if the entered value is the same but in diff format", function() {
            var timepicker = input.kendoTimePicker({
                format: "hh:mm tt",
                parseFormats: ["yyyy/MM/dd"],
                value: "12:00 AM"
            }).data("kendoTimePicker");

            input.val("2000/10/10");

            //simulate change
            timepicker._change(input.val());

            assert.equal(input.val(), "12:00 AM");
        });

        it("TimePicker does not call change on blur if no text change", function() {
            var date = new Date(1919, 0, 1, 14, 0, 0),
                timepicker = input.kendoTimePicker({
                    format: "hh",
                    value: new Date(date)
                }).data("kendoTimePicker");

            timepicker.options.parseFormats = ["hh:mm tt", "hh"];

            //simulate change
            input.focus().blur();

            assert.equal(+timepicker.value(), +date);
        });

        it("TimePicker does not call change on ENTER if no text change", function() {
            var date = new Date(1919, 0, 1, 14, 0, 0),
                timepicker = input.kendoTimePicker({
                    format: "hh",
                    value: new Date(date)
                }).data("kendoTimePicker");

            timepicker.options.parseFormats = ["hh:mm tt", "hh"];

            //simulate change
            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            assert.equal(+timepicker.value(), +date);
        });

    });
}());
