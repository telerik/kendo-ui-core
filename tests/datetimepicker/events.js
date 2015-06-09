(function() {

var DateTimePicker = kendo.ui.DateTimePicker,
    input;

module("kendo.ui.DateTimePicker events", {
    setup: function() {
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        input.data("kendoDateTimePicker").destroy();
    }
});

test("DateTimePicker triggers change event on DateView change", 1, function() {
    var today = new Date(),
        datetimepicker = new DateTimePicker(input),
        dateView = datetimepicker.dateView;

    datetimepicker.bind("change", function() {
        equal(+datetimepicker.value(), +today);
    });

    //simulate user click
    dateView._calendar();
    dateView.calendar.value(today);
    dateView.calendar.trigger("change");
});

test("DateTimePicker triggers change event on TimeView click", 1, function() {
    var datetimepicker = new DateTimePicker(input),
        timeView = datetimepicker.timeView,
        li, date;

    timeView.refresh();
    li = timeView.ul.children(":first");
    date = timeView._parse(li.text());

    datetimepicker.bind("change", function() {
        equal(+datetimepicker.value(), +date);
    });

    li.click();
});

test("DateTimePicker triggers change on blur", 1, function() {
    var datetimepicker = new DateTimePicker(input),
        today = new Date(2000, 10, 10, 10, 30, 0);

    datetimepicker.bind("change", function() {
        equal(+datetimepicker.value(), +today);
    });

    input.focus().val(kendo.toString(today, datetimepicker.options.format)).blur();
});

test("DateTimePicker raises change event on enter", 1, function() {
    var datetimepicker = new DateTimePicker(input, {
        change: function() {
            ok(true);
        }
    });

    input.val("10/10/2000 12:00 AM");
    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });
});

test("DateTimePicker does not raise change event on enter", 0, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        change: function() {
            ok(false);
        }
    });

    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });
});

test("DateTimePicker does not raise change when navigate in TimeView", 0, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        change: function() {
            ok(false);
        }
    });

    datetimepicker.open("time");
    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.DOWN
    });
});

test("DateTimePicker triggers open event when timeView is opened", 2, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        open: function(e) {
            ok(true);
            equal(e.view, "time");
        }
    });

    datetimepicker.timeView.popup.open();
});

test("DateTimePicker triggers open event when dateView is opened", 2, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        open: function(e) {
            ok(true);
            equal(e.view, "date");
        }
    });

    datetimepicker.dateView.popup.open();
});

test("DateTimePicker triggers close event when timeView is opened", 2, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        close: function(e) {
            ok(true);
            equal(e.view, "time");
        }
    });

    datetimepicker.timeView.popup.open();
    datetimepicker.timeView.popup.close();
});

test("DateTimePicker triggers close event when dateView is opened", 2, function() {
    var datetimepicker = new DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        close: function(e) {
            ok(true);
            equal(e.view, "date");
        }
    });

    datetimepicker.open("date");
    datetimepicker.dateView.popup.close();
});

test("does not force element's DOM change event when the user manually edits the value and presses 'Enter'", 0, function() {
    input.kendoDateTimePicker({
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

})();
