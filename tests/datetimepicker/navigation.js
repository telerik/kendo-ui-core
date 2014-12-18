(function() {

var DateTimePicker = kendo.ui.DateTimePicker,
    input;

module("kendo.ui.DateTimePicker navigation", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        input.data("kendoDateTimePicker").destroy();
    }
});

test("DateView sets the value on click", function() {
    var today = new Date(),
        datetimepicker = new DateTimePicker(input),
        dateView = datetimepicker.dateView;

    //simulate user click
    dateView._calendar();
    dateView.calendar.value(today);
    dateView.calendar.trigger("change");

    equal(input.val(), kendo.toString(today, datetimepicker.options.format));
});

test("DateView closes itself on click", function() {
    var today = new Date(),
        datetimepicker = new DateTimePicker(input),
        dateView = datetimepicker.dateView;

    datetimepicker.open("date");

    //simulate user click
    dateView.calendar.value(today);
    dateView.calendar.trigger("change");

    ok(!dateView.popup.visible());
});

test("TimeView sets the value on click", function() {
    var datetimepicker = new DateTimePicker(input),
        timeView = datetimepicker.timeView,
        li, date;

    timeView.refresh();
    li = timeView.ul.children(":first");
    date = timeView._parse(li.text());

    li.click();

    equal(input.val(), kendo.toString(date, datetimepicker.options.format));
});

test("TimeView puts in range if max less than today", function() {
    var max = new Date(2000, 10, 10, 10, 0, 0),
        datetimepicker = new DateTimePicker(input, {
            max: max
        }),
        timeView = datetimepicker.timeView;

    datetimepicker.open("time");

    timeView.ul.children(":last").click();

    equal(+timeView.options.max, +max);
    equal(+datetimepicker.value(), +max);
});

test("TimeView puts in range if min bigger than today", function() {
    var min = new Date(2030, 10, 10, 10, 0, 0),
        datetimepicker = new DateTimePicker(input, {
            min: min
        }),
        timeView = datetimepicker.timeView;

    datetimepicker.open("time");

    timeView.ul.children(":first").click();

    equal(+timeView.options.min, +min);
    equal(+datetimepicker.value(), +min);
});

test("DateTimePicker closes all views on blur", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");
    datetimepicker.open("time");

    input.focus().blur();

    ok(!datetimepicker.dateView.popup.visible());
    ok(!datetimepicker.timeView.popup.visible());
});

test("DateTimePicker add focus state to the wrapper on focus", function() {
    var datetimepicker = new DateTimePicker(input);

    input.focus();

    ok(datetimepicker.wrapper.children(":first").hasClass("k-state-focused"));
});

test("DateTimePicker remove focus state to the wrapper on blur", function() {
    var datetimepicker = new DateTimePicker(input);

    input.focus().blur();

    ok(!datetimepicker.wrapper.children(":first").hasClass("k-state-focused"));
});

test("DateTimePicker opens DateView when press ALT + DOWN", function() {
    var datetimepicker = new DateTimePicker(input);

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN,
        altKey: true
    });

    ok(datetimepicker.dateView.popup.visible());
});

test("DateTimePicker opens TimeView when press ALT + DOWN", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN,
        altKey: true
    });

    ok(!datetimepicker.dateView.popup.visible());
    ok(datetimepicker.timeView.popup.visible());
});

test("DateTimePicker closes DateView when press ALT + UP", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP,
        altKey: true
    });

    ok(!datetimepicker.dateView.popup.visible());
});

test("DateTimePicker closes TimeView when press ALT + UP", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP,
        altKey: true
    });

    ok(!datetimepicker.timeView.popup.visible());
});

test("DateTimePicker calls DateView move method if the view is opened", function() {
    var datetimepicker = new DateTimePicker(input);

    stub(datetimepicker.dateView, "move");

    datetimepicker.open("date");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.UP
    });

    equal(datetimepicker.dateView.calls("move"), 1);
});

test("DateTimePicker calls TimeView move method if the view is opened", function() {
    var datetimepicker = new DateTimePicker(input);

    stub(datetimepicker.timeView, "move");

    datetimepicker.open("time");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    equal(datetimepicker.timeView.calls("move"), 1);
});

test("TimeView updates the input value on keyboard navigation", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });

    ok(input.val());
});

test("DateTimePicker updates DateView when select time from TimeView", function() {
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

    equal(+datetimepicker.dateView._value, +date);
});

test("DateTimePicker shows only one available hour in time dropdown list", function() {
    var date = new Date(2000, 11, 31);
    var datetimepicker = new DateTimePicker(input, {
        max: date,
        value: new Date(2000, 11, 30)
    });

    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(date);
    datetimepicker.dateView.calendar.trigger("change");


    equal(datetimepicker.timeView.ul.children().length, 1);
    equal(datetimepicker.timeView.ul.children().text(), "12:00 AM");
    ok(datetimepicker.timeView.ul.children().hasClass("k-state-selected"));
});

test("DateTimePicker limits the available times to the max date", function() {
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

    equal(liElements.eq(0).text(), "12:00 AM");
    equal(liElements.eq(liElements.length - 1).text(), "8:00 PM");
});

test("DateTimePicker shows all hours in TimeView when date is not max", function() {
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

    equal(liElements.eq(0).text(), "12:00 AM");
    equal(liElements.eq(liElements.length - 1).text(), "11:30 PM");
});

test("DateTimePicker updates TimeView when select min date", function() {
    var date = new Date(2000, 11, 1, 16, 0, 0);
    var datetimepicker = new DateTimePicker(input, {
        min: new Date(2000, 11, 1, 0, 0, 0),
        value: new Date(2000, 11, 2)
    });

    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(date);
    datetimepicker.dateView.calendar.trigger("change");

    var liElements = datetimepicker.timeView.ul.children();

    equal(liElements.eq(0).text(), "12:00 AM");
    equal(liElements.eq(liElements.length - 1).text(), "11:30 PM");
});

test("DateTimePicker sets TimeView max date to 59 to midnight", function() {
    var datetimepicker = new DateTimePicker(input, {
        min: new Date("09/16/2013 09:00 PM"),
        max: new Date("09/17/2013 04:59 AM"),
        value: new Date("09/16/2013")
    });

    var min = datetimepicker.timeView.options.min;
    var max = datetimepicker.timeView.options.max;

    deepEqual(min, new Date(2013, 8, 16, 21, 0));
    deepEqual(max, new Date(2099, 11, 31, 23, 30));
});

test("DateTimePicker shows all hours in TimeView when date is not min", function() {
    var date = new Date(2000, 11, 1, 8, 30, 0);
    var datetimepicker = new DateTimePicker(input, {
        min: date,
        value: date
    });

    //select other date
    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(new Date(2000, 11, 20));
    datetimepicker.dateView.calendar.trigger("change");

    equal(datetimepicker.timeView.ul.children(":first").text(), "12:00 AM");
    equal(datetimepicker.timeView.ul.children(":last").text(), "11:30 PM");
});

test("DateTimePicker does not update TimeView when selected date in range", function() {
    var datetimepicker = new DateTimePicker(input, {
        min: new Date(2000, 1, 1)
    });

    stub(datetimepicker.timeView, {
        refresh: datetimepicker.timeView.refresh
    });

    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(new Date(2010, 1, 1));
    datetimepicker.dateView.calendar.trigger("change");

    equal(datetimepicker.timeView.calls("refresh"), 0);
});

test("DateTimePicker does not update TimeView if select time from drop-down list", function() {
    var datetimepicker = new DateTimePicker(input, {
        min: new Date(2000, 1, 1),
        value: new Date(2000, 1, 1)
    });

    datetimepicker.open("time");

    stub(datetimepicker.timeView, {
        refresh: datetimepicker.timeView.refresh
    });

    datetimepicker.timeView.options.change("12:30 AM", true);

    equal(datetimepicker.timeView.calls("refresh"), 0);
});

test("DateTimePicker persist time when select min date from calendar", function() {
    var datetimepicker = new DateTimePicker(input, {
            min: new Date(2000, 11, 8, 8, 30, 0),
            value: new Date(2000, 11, 9, 12, 0, 0)
        });

    //select other date
    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(new Date(2000, 11, 8, 8, 30, 0));
    datetimepicker.dateView.calendar.trigger("change");

    equal(datetimepicker.value().getHours(), 12);
    equal(datetimepicker.value().getMinutes(), 0);
});

test("DateTimePicker uses options.dates when rebind TimeView", function() {
    var date = new Date(2000, 11, 1, 8, 30, 0);
    var datetimepicker = new DateTimePicker(input, {
        value: date,
        dates: [new Date(2000, 10, 10, 12, 10, 0)]
    });

    //select other date
    datetimepicker.open("date");
    datetimepicker.dateView.calendar.value(new Date(2000, 10, 10));
    datetimepicker.dateView.calendar.trigger("change");

    equal(datetimepicker.timeView.ul.children().length, 1);
    equal(datetimepicker.timeView.ul.children().text(), "12:10 PM");
});

test("DateTimePicker does not update the input if the entered value is the same but in diff format", function() {
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

    equal(input.val(), kendo.toString(today, "dd MMM yyyy"));
});

test("DateTimePicker does not call change on blur if no text change", function() {
    var date = new Date(1919, 0, 1),
        datetimepicker = input.kendoDateTimePicker({
            format: "MM/dd/yy",
            value: new Date(date)
        }).data("kendoDateTimePicker");

    datetimepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

    //simulate change
    input.focus().blur();

    equal(+datetimepicker.value(), +date);
});

test("DateTimePicker does not call change on ENTER if no text change", function() {
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

    equal(+datetimepicker.value(), +date);
});

test("DateTimePicker does set focused date of calendar if no text change", function() {
    var date = new Date(1919, 0, 1),
        datetimepicker = input.kendoDateTimePicker({
            format: "MM/dd/yy",
            value: new Date(date)
        }).data("kendoDateTimePicker");

    datetimepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

    input.focus();
    datetimepicker.open();

    equal(+datetimepicker.dateView._current, +date);
});

test("TimeView uses input value on open", function() {
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

    equal(input.val(), "01/01/2019");
});

})();
