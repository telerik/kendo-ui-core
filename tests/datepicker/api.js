(function() {

var DateView = kendo.DateView,
    dateview,
    input;

module("kendo.ui.DateView API", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();

        dateview.destroy();

        kendo.destroy(QUnit.fixture);
    }
});

test("value method should call calendar value and set dateView._value", function() {
    var date = new Date(2000, 10, 10);

    dateview = new DateView({
        value: date,
        start: "month",
        anchor: input,
        min: new Date (1900, 10, 10),
        max: new Date (2100, 10, 10),
        depth: "month"
    });

    dateview._calendar();
    date.setDate(20);

    dateview.value(date);

    equal(+dateview._value, +date);
    equal(+dateview.calendar.value(), +date);
});

test("min() should set the options.min", function() {
    var date = new Date(2000, 10, 10);

    dateview = new DateView();

    dateview.min(date);

    equal(+dateview.options.min, +date);
});

test("min method sets calendar min value", function() {
    dateview = new DateView();
    dateview._calendar();

    var date = new Date(2000, 10, 10),
        calendar = dateview.calendar;

    dateview.min(date);

    deepEqual(calendar.min(), date);
});

test("max() should set the options.max", function() {
    var date = new Date(2000, 10, 10);

    dateview = new DateView();

    dateview.max(date);

    equal(+dateview.options.max, +date);
});

test("max method sets calendar max value", function() {
    dateview = new DateView();
    dateview._calendar();

    var date = new Date(2000, 10, 10),
        calendar = dateview.calendar;

    dateview.max(date);

    deepEqual(calendar.max(), date);
});

test("disabled dates are reflected to calendar", function() {
    dateview = new DateView();
    dateview._calendar();

    var options = {
        disableDates: ["mo"],
        value: new Date(2015,9,19)
    }
    dateview.setOptions(options);
    var isDisabled = dateview.calendar.element.find("td").eq(1).hasClass("k-state-disabled")
    equal(isDisabled, true);
});

var input;
var datepicker;
var DatePicker = kendo.ui.DatePicker;

module("kendo.ui.DateView API", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        datepicker.destroy();
        kendo.destroy(QUnit.fixture);
    }
});

test("open method opens the dateView", 1, function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, "_calendar");
    stub(datepicker.dateView.popup, {open: datepicker.dateView.popup.open});

    datepicker.open();

    equal(datepicker.dateView.popup.calls("open"), 1);
});

test("close method should closes the dateView", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView.popup, "close");

    datepicker.close();

    equal(datepicker.dateView.popup.calls("close"), 1);
});

test("value method should return value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    ok(datepicker.value() === null);
});

test("value method updates the input value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var date = new Date();
    var dateString = kendo.toString(date, datepicker.options.format);

    datepicker.value(date);

    equal(+datepicker._value, +date);
    equal(input.val(), dateString);
});

test("value method uses options.parseFormats to parse passed value", function() {
    var secondFormat = "MM/dd/yy",
        date = new Date(2000, 10, 10),
        dateString = kendo.toString(date, secondFormat);

    datepicker = input.kendoDatePicker({
        format: "MMMM yyyy",
        parseFormats: secondFormat
    }).data("kendoDatePicker");

    datepicker.value(dateString);

    equal(+datepicker._value, +date);
});

test("value method parse passed value using options.parseFormats", function() {
    var date = new Date(2000, 10, 1),
        dateString = kendo.toString(date, "MMMM yyyy");

    datepicker = input.kendoDatePicker({
        parseFormats: ["MMMM yyyy"]
    }).data("kendoDatePicker");

    datepicker.value(dateString);

    equal(+datepicker.value(), +date);
});

test("value should not accept value bigger than max", function() {
    var date = new Date(2000, 10, 10);

    datepicker = input.kendoDatePicker({
        max: date
    }).data("kendoDatePicker");

    datepicker.value(new Date(2000, 10, 11));

    equal(datepicker._value, null);
});

test("value should update input when select date from calendar", function() {
    var date = new Date(2000, 10, 10);

    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();
    datepicker.dateView.calendar.value(date);
    datepicker.dateView.calendar.trigger("change");

    equal(+datepicker._value, +date);
    equal(input.val(), "11/10/2000");
});

test("empty input if set value ot null", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(null);

    equal(input.val(), "");
    equal(datepicker._value, null);
});

test("value method should call dateview.value()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    stub(datepicker.dateView, "value");

    datepicker.value(new Date());

    equal(datepicker.dateView.calls("value"), 1);
});

test("value method should parse value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/10/2000");

    datepicker.value("10/10/2000");

    equal(+datepicker.value(), +value);
});

test("value method can set 1/1/1970", function() {
    var date = new Date(1970, 0, 1);
    var hours = (date.getTimezoneOffset() / 60) * -1;
    var minutes = hours % 1;
    if (minutes) {
        minutes = 60 * minutes;
    }
    date.setHours(hours, minutes, 0);

    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(date);

    deepEqual(datepicker.dateView._value, date);
});

test("_change should set value if it was changed", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker._change("10/22/2000");

    equal(+datepicker.value(), +(new Date("10/22/2000")));
});

test("_change should not call value() if value was not changed", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.value(value);
    stub(datepicker, "value");

    datepicker._change("10/22/2000");

    equal(datepicker.calls("value"), 0);
});

test("min() should return min value", function() {
    var value = new Date("10/22/2000");
    datepicker = input.kendoDatePicker({min: value}).data("kendoDatePicker");

    var result = datepicker.min();

    equal(+result, +value);
});

test("min() should set the min value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.min(value);

    equal(+datepicker.options.min, +value);
});

test("min method uses options.parseFormats", function() {
    datepicker = input.kendoDatePicker({
        format: "MMMM yyyy",
        parseFormats: "MM/dd/yyyy"
    }).data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.min("10/22/2000");

    equal(+datepicker.options.min, +value);
});

test("min() should call dateView.min()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    stub(datepicker.dateView, { min: datepicker.dateView.min });

    datepicker.min(value);

    equal(datepicker.dateView.calls("min"), 1);
});

test("max() should return max value", function() {
    var value = new Date("10/22/2000");
    datepicker = input.kendoDatePicker({max: value}).data("kendoDatePicker");

    var result = datepicker.max();

    equal(+result, +value);
});

test("max() should set the max value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.max(value);

    equal(+datepicker.options.max, +value);
});

test("max() should call dateView.max()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    var value = new Date("10/22/2000");

    stub(datepicker.dateView, { max: datepicker.dateView.max });

    datepicker.max(value);

    equal(datepicker.dateView.calls("max"), 1);
});

test("enable(false) should disable input element", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);

    equal(datepicker.element.attr("disabled"), "disabled");
});

test("enable(false) should unbind icon click", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    ok(!datepicker.dateView.popup.visible());
});

test("enable() should remove disable attribute", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);
    datepicker.enable(true);

    equal(datepicker.element.attr("disabled"), undefined);
});

test("readonly() makes  input element readonly", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();

    equal(datepicker.element.attr("readonly"), "readonly");
});

test("readonly() unbinds icon click", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    ok(!datepicker.dateView.popup.visible());
});

test("readonly(false) removes readonly attribute", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.readonly(false);

    equal(datepicker.element.attr("readonly"), undefined);
});

test("readonly() removes disabled attribute and disabled class", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);
    datepicker.readonly();

    equal(datepicker.element.attr("readonly"), "readonly");
    equal(datepicker.element.attr("disabled"), undefined);
    ok(datepicker._inputWrapper.hasClass("k-state-default"));
    ok(!datepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("enable(false) removes readonly attribute and default class", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.enable(false);

    equal(datepicker.element.attr("readonly"), undefined);
    equal(datepicker.element.attr("disabled"), "disabled");
    ok(!datepicker._inputWrapper.hasClass("k-state-default"));
    ok(datepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("enable() enables widget after readonly()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.enable();

    equal(datepicker.element.attr("readonly"), undefined);
    equal(datepicker.element.attr("disabled"), undefined);
    ok(datepicker._inputWrapper.hasClass("k-state-default"));
    ok(!datepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("value method honors options.culture", function() {
    datepicker = input.kendoDatePicker({
        culture: "bg-BG",
        format: "D"
    }).data("kendoDatePicker");

    var value = new Date(2000, 10, 10),
        formatted = kendo.toString(value, "D", "bg-BG");

    datepicker.value(formatted);

    equal(+datepicker.value(), +value);
    equal(datepicker.element.val(), formatted);
});

test("value method restricts time of the value if it's date part is equal to min", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    datepicker = input.kendoDatePicker({
        min: today,
        value: today
    }).data("kendoDatePicker");

    datepicker.value(midnight);

    notEqual(datepicker._value, null);
    equal(+datepicker._value, +today);
});

test("value method restricts time of the value if it's date part is equal to max", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    datepicker = input.kendoDatePicker({
        max: today,
        value: today
    }).data("kendoDatePicker");

    datepicker.value(midnight);

    notEqual(datepicker._value, null);
    equal(+datepicker._value, +midnight);
});

test("value method does not show text representation of invalid value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value("invalid");

    equal(datepicker.value(), null);
    equal(input.val(), "");
});

test("setOptions method updates calendar options", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();

    datepicker.setOptions({
        start: "year",
        depth: "year"
    });

    equal(datepicker.dateView.calendar.view().name, "year");
});

test("setOptions method updates format", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();
    datepicker.value(new Date(2013, 10, 10));

    datepicker.setOptions({
        format: "dd/MM/yyyy"
    });

    equal(datepicker.element.val(), kendo.toString(datepicker.value(), "dd/MM/yyyy"));
});

test("setOptions preserves options.dates", 1, function() {
    var datepicker = new DatePicker(input, {
        dates: [new Date()]
    });

    datepicker.setOptions({
        footer: false
    });

    equal(datepicker.options.dates.length, 1);
});

test("setOptions updates options.dates", 1, function() {
    var datepicker = new DatePicker(input, {
        dates: [new Date()]
    });

    datepicker.setOptions({
        dates: [new Date(), new Date()]
    });

    equal(datepicker.options.dates.length, 2);
});

test("disabled date is not set as widgets value", 1, function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,19),
        disableDates : ["mo"]
    });

    equal(datepicker.element.val(), "");
});

test("widget value is set correctly when disabled dates are added", 1, function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,20),
        disableDates : ["mo"]
    });

    equal(datepicker.element.val(), "10/20/2015");
});

test("manually setting disabled date, does not set the widget value", 2, function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,20),
        disableDates : ["mo"]
    });
    datepicker.element.val("10/19/2015");
    datepicker.element.blur();

    equal(datepicker.element.val(), "10/19/2015");
    equal(datepicker.value(), null);
});

/*test("clicking on disabled date does not close the popup", 2, function() {
    var datepicker = new DatePicker(input, {
        disableDates : ["tu"]
    });
    datepicker.dateView._calendar();
    datepicker.open();
    $("[data-value='2015/9/13']").parent().trigger("click");
    equal(datepicker.element.val().length, 0)
    equal($(".k-animation-container").css("display"), "block");
});
*/
})();
