(function() {

    var DateTimePicker = kendo.ui.DateTimePicker,
        input;

    describe("kendo.ui.DateTimePicker navigation", function() {
        beforeEach(function() {

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            kendo.destroy(Mocha.fixture);
        });

        it("DateView sets the value on click", function() {
            var today = new Date(),
                datetimepicker = new DateTimePicker(input),
                dateView = datetimepicker.dateView;

            //simulate user click
            dateView._calendar();
            dateView.calendar.value(today);
            dateView.calendar.trigger("change");

            assert.equal(input.val(), kendo.toString(today, datetimepicker.options.format));
        });

        it("DateView closes itself on click", function() {
            var today = new Date(),
                datetimepicker = new DateTimePicker(input),
                dateView = datetimepicker.dateView;

            datetimepicker.open("date");

            //simulate user click
            dateView.calendar.value(today);
            dateView.calendar.trigger("change");

            assert.isOk(!dateView.popup.visible());
        });

        it("TimeView sets the value on click", function() {
            var datetimepicker = new DateTimePicker(input),
                timeView = datetimepicker.timeView,
                li, date;

            timeView.refresh();
            li = timeView.ul.children(":first");
            date = timeView._parse(li.text());

            li.click();

            assert.equal(input.val(), kendo.toString(date, datetimepicker.options.format));
        });

        it("TimeView puts in range if max less than today", function() {
            var max = new Date(2000, 10, 10, 10, 0, 0),
                datetimepicker = new DateTimePicker(input, {
                    max: max
                }),
                timeView = datetimepicker.timeView;

            datetimepicker.open("time");

            timeView.ul.children(":last").click();

            assert.equal(+timeView.options.max, +max);
            assert.equal(+datetimepicker.value(), +max);
        });

        it("TimeView puts in range if min bigger than today", function() {
            var min = new Date(2030, 10, 10, 10, 0, 0),
                datetimepicker = new DateTimePicker(input, {
                    min: min
                }),
                timeView = datetimepicker.timeView;

            datetimepicker.open("time");

            timeView.ul.children(":first").click();

            assert.equal(+timeView.options.min, +min);
            assert.equal(+datetimepicker.value(), +min);
        });

        it("DateTimePicker closes all views on blur", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");
            datetimepicker.open("time");

            input.focus().blur();

            assert.isOk(!datetimepicker.dateView.popup.visible());
            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("DateTimePicker add focus state to the wrapper on focus", function() {
            var datetimepicker = new DateTimePicker(input);

            input.focus();

            assert.isOk(datetimepicker.wrapper.hasClass("k-focus"));
        });

        it("DateTimePicker remove focus state to the wrapper on blur", function() {
            var datetimepicker = new DateTimePicker(input);

            input.focus().blur();

            assert.isOk(!datetimepicker.wrapper.hasClass("k-focus"));
        });

        it("DateTimePicker opens DateView when press ALT + DOWN", function() {
            var datetimepicker = new DateTimePicker(input);

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN,
                altKey: true
            });

            assert.isOk(datetimepicker.dateView.popup.visible());
        });

        it("DateTimePicker opens TimeView when press ALT + DOWN", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN,
                altKey: true
            });

            assert.isOk(!datetimepicker.dateView.popup.visible());
            assert.isOk(datetimepicker.timeView.popup.visible());
        });

        it("DateTimePicker opens TimeView when press ENTER while DateView is open", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            assert.isOk(!datetimepicker.dateView.popup.visible());
            assert.isOk(datetimepicker.timeView.popup.visible());
        });

        it("DateTimePicker closes DateView when press ALT + UP", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.UP,
                altKey: true
            });

            assert.isOk(!datetimepicker.dateView.popup.visible());
        });

        it("deleting the value in the input sets the current day to the dateview", function() {
            var datepicker = new DateTimePicker(input, {
                value: "1/1/2011 11:00 AM"
            });
            datepicker.open();
            datepicker.close();
            input.focus().val("");

            input.trigger("focusout");

            assert.deepEqual(datepicker.dateView.calendar.current(), kendo.calendar.getToday());
        });

        it("DateTimePicker closes TimeView when press ALT + UP", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.UP,
                altKey: true
            });

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("DateTimePicker calls DateView move method if the view is opened", function() {
            var datetimepicker = new DateTimePicker(input);

            stub(datetimepicker.dateView, "move");

            datetimepicker.open("date");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.UP
            });

            assert.equal(datetimepicker.dateView.calls("move"), 1);
        });

        it("DateTimePicker calls TimeView move method if the view is opened", function() {
            var datetimepicker = new DateTimePicker(input);

            stub(datetimepicker.timeView, "move");

            datetimepicker.open("time");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });

            assert.equal(datetimepicker.timeView.calls("move"), 1);
        });

        it("TimeView updates the input value on keyboard navigation", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });

            assert.isOk(input.val());
        });

        it("DateTimePicker updates DateView when select time from TimeView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            var date = kendo.parseDate(input.val(), datetimepicker.options.format);

            assert.equal(+datetimepicker.dateView._value, +date);
        });

        it("DateTimePicker shows only one available hour in time dropdown list", function() {
            var date = new Date(2000, 11, 31);
            var datetimepicker = new DateTimePicker(input, {
                max: date,
                value: new Date(2000, 11, 30)
            });

            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(date);
            datetimepicker.dateView.calendar.trigger("change");


            assert.equal(datetimepicker.timeView.ul.children().length, 1);
            assert.equal(datetimepicker.timeView.ul.children().text(), "12:00 AM");
            assert.isOk(datetimepicker.timeView.ul.children().hasClass("k-selected"));
        });

        it("DateTimePicker limits the available times to the max date", function() {
            var date = new Date(2000, 11, 31, 20, 0, 0);
            var datetimepicker = new DateTimePicker(input, {
                max: date,
                value: new Date(2000, 11, 30)
            });

            //select max date
            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(date);
            datetimepicker.dateView.calendar.trigger("change");

            var liElements = datetimepicker.timeView.ul.children();

            assert.equal(liElements.eq(0).text(), "12:00 AM");
            assert.equal(liElements.eq(liElements.length - 1).text(), "8:00 PM");
        });

        it("DateTimePicker shows all hours in TimeView when date is not max", function() {
            var date = new Date(2000, 11, 31);
            var datetimepicker = new DateTimePicker(input, {
                max: date,
                value: new Date(2000, 11, 30)
            });

            //select max date
            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(date);
            datetimepicker.dateView.calendar.trigger("change");

            //select other date
            datetimepicker.dateView.calendar.value(new Date(2000, 11, 20));
            datetimepicker.dateView.calendar.trigger("change");

            var liElements = datetimepicker.timeView.ul.children();

            assert.equal(liElements.eq(0).text(), "12:00 AM");
            assert.equal(liElements.eq(liElements.length - 1).text(), "11:30 PM");
        });

        it("DateTimePicker updates TimeView when select min date", function() {
            var date = new Date(2000, 11, 1, 16, 0, 0);
            var datetimepicker = new DateTimePicker(input, {
                min: new Date(2000, 11, 1, 0, 0, 0),
                value: new Date(2000, 11, 2)
            });

            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(date);
            datetimepicker.dateView.calendar.trigger("change");

            var liElements = datetimepicker.timeView.ul.children();

            assert.equal(liElements.eq(0).text(), "12:00 AM");
            assert.equal(liElements.eq(liElements.length - 1).text(), "11:30 PM");
        });

        it("DateTimePicker sets TimeView max date to 59 to midnight", function() {
            var datetimepicker = new DateTimePicker(input, {
                min: new Date("09/16/2013 09:00 PM"),
                max: new Date("09/17/2013 04:59 AM"),
                value: new Date("09/16/2013")
            });

            var min = datetimepicker.timeView.options.min;
            var max = datetimepicker.timeView.options.max;

            assert.deepEqual(min, new Date(2013, 8, 16, 21, 0));
            assert.deepEqual(max, new Date(2099, 11, 31, 23, 30));
        });

        it("DateTimePicker shows all hours in TimeView when date is not min", function() {
            var date = new Date(2000, 11, 1, 8, 30, 0);
            var datetimepicker = new DateTimePicker(input, {
                min: date,
                value: date
            });

            //select other date
            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(new Date(2000, 11, 20));
            datetimepicker.dateView.calendar.trigger("change");

            assert.equal(datetimepicker.timeView.ul.children(":first").text(), "12:00 AM");
            assert.equal(datetimepicker.timeView.ul.children(":last").text(), "11:30 PM");
        });

        it("DateTimePicker does not update TimeView when selected date in range", function() {
            var datetimepicker = new DateTimePicker(input, {
                min: new Date(2000, 1, 1)
            });

            stub(datetimepicker.timeView, {
                refresh: datetimepicker.timeView.refresh
            });

            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(new Date(2010, 1, 1));
            datetimepicker.dateView.calendar.trigger("change");

            assert.equal(datetimepicker.timeView.calls("refresh"), 0);
        });

        it("DateTimePicker does not update TimeView if select time from drop-down list", function() {
            var datetimepicker = new DateTimePicker(input, {
                min: new Date(2000, 1, 1),
                value: new Date(2000, 1, 1)
            });

            datetimepicker.open("time");

            stub(datetimepicker.timeView, {
                refresh: datetimepicker.timeView.refresh
            });

            datetimepicker.timeView.options.change("12:30 AM", true);

            assert.equal(datetimepicker.timeView.calls("refresh"), 0);
        });

        it("DateTimePicker persist time when select min date from calendar", function() {
            var datetimepicker = new DateTimePicker(input, {
                min: new Date(2000, 11, 8, 8, 30, 0),
                value: new Date(2000, 11, 9, 12, 0, 0)
            });

            //select other date
            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(new Date(2000, 11, 8, 8, 30, 0));
            datetimepicker.dateView.calendar.trigger("change");

            assert.equal(datetimepicker.value().getHours(), 12);
            assert.equal(datetimepicker.value().getMinutes(), 0);
        });

        it("DateTimePicker uses options.dates when rebind TimeView", function() {
            var date = new Date(2000, 11, 1, 8, 30, 0);
            var datetimepicker = new DateTimePicker(input, {
                value: date,
                dates: [new Date(2000, 10, 10, 12, 10, 0)]
            });

            //select other date
            datetimepicker.open("date");
            datetimepicker.dateView.calendar.value(new Date(2000, 10, 10));
            datetimepicker.dateView.calendar.trigger("change");

            assert.equal(datetimepicker.timeView.ul.children().length, 1);
            assert.equal(datetimepicker.timeView.ul.children().text(), "12:10 PM");
        });

        it("DateTimePicker does not update the input if the entered value is the same but in diff format", function() {
            var today = new Date(),
                datetimepicker = input.kendoDateTimePicker({
                    format: "dd MMM yyyy",
                    parseFormats: ["yyyy/MM/dd"],
                    value: kendo.toString(today, "dd MMM yyyy")
                }).data("kendoDateTimePicker"),
                todayDiffFormat = kendo.toString(today, "yyyy/MM/dd");

            input.val(todayDiffFormat);

            //simulate change
            datetimepicker._change(input.val());

            assert.equal(input.val(), kendo.toString(today, "dd MMM yyyy"));
        });

        it("DateTimePicker does not call change on blur if no text change", function() {
            var date = new Date(1919, 0, 1),
                datetimepicker = input.kendoDateTimePicker({
                    format: "MM/dd/yy",
                    value: new Date(date)
                }).data("kendoDateTimePicker");

            datetimepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

            //simulate change
            input.focus().blur();

            assert.equal(+datetimepicker.value(), +date);
        });

        it("do not change input value if not a valid time is typed and dateInput option is enabled ", function() {
            input.kendoDateTimePicker({
                dateInput: true,
                value: new Date(1919, 0, 1)
            });

            input.focus().val("1/1/year 12:00 AM").trigger("focusout");

            assert.equal(input.val(), "1/1/year 12:00 AM");
        });

        it("DateTimePicker does not call change on ENTER if no text change", function() {
            var date = new Date(1919, 0, 1),
                datetimepicker = input.kendoDateTimePicker({
                    format: "MM/dd/yy",
                    value: new Date(date)
                }).data("kendoDateTimePicker");

            datetimepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

            //simulate change
            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.ENTER
            });

            assert.equal(+datetimepicker.value(), +date);
        });

        it("DateTimePicker does set focused date of calendar if no text change", function() {
            var date = new Date(1919, 0, 1),
                datetimepicker = input.kendoDateTimePicker({
                    format: "MM/dd/yy",
                    value: new Date(date)
                }).data("kendoDateTimePicker");

            datetimepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

            input.focus();
            datetimepicker.open();

            assert.equal(+datetimepicker.dateView._current, +date);
        });

        it("DateTimePicker does set focused date of calendar if no text change", function() {
            datetimepicker = input.kendoDateTimePicker({
                value: new Date(2016, 0, 1),
                parseFormats: ["MM/dd/yyyy"]
            }).data("kendoDateTimePicker");

            datetimepicker.min(new Date(new Date(2016, 0, 10, 10, 10, 10).getTime() + 30 * 60000));
            datetimepicker.open();
            $(".k-weekend").eq(1).trigger("click");

            assert.equal(input.val(), "1/16/2016 12:00 AM");
        });


        it("TimeView uses input value on open", function() {
            var date = new Date(1919, 0, 1),
                datetimepicker = input.kendoDateTimePicker({
                    format: "MM/dd/yyyy",
                    value: new Date(date)
                }).data("kendoDateTimePicker");

            input.focus();
            input.val("01/01/2019");

            datetimepicker.open("time");

            input.focus().trigger({
                type: "keydown",
                keyCode: kendo.keys.DOWN
            });

            assert.equal(input.val(), "01/01/2019");
        });

    });
}());
