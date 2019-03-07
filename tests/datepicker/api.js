(function() {

var DateView = kendo.DateView,
    dateview,
    input;

describe("kendo.ui.DateView API", function () {
    beforeEach(function() {

        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {


        dateview.destroy();

        kendo.destroy(Mocha.fixture);
    });

it("value method should call calendar value and set dateView._value", function() {
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

    assert.equal(+dateview._value, +date);
    assert.equal(+dateview.calendar.value(), +date);
});

it("min() should set the options.min", function() {
    var date = new Date(2000, 10, 10);

    dateview = new DateView();

    dateview.min(date);

    assert.equal(+dateview.options.min, +date);
});

it("min method sets calendar min value", function() {
    dateview = new DateView();
    dateview._calendar();

    var date = new Date(2000, 10, 10),
        calendar = dateview.calendar;

    dateview.min(date);

    assert.deepEqual(calendar.min(), date);
});

it("max() should set the options.max", function() {
    var date = new Date(2000, 10, 10);

    dateview = new DateView();

    dateview.max(date);

    assert.equal(+dateview.options.max, +date);
});

it("max method sets calendar max value", function() {
    dateview = new DateView();
    dateview._calendar();

    var date = new Date(2000, 10, 10),
        calendar = dateview.calendar;

    dateview.max(date);

    assert.deepEqual(calendar.max(), date);
});

it("disabled dates are reflected to calendar", function() {
    dateview = new DateView();
    dateview._calendar();

    var options = {
        disableDates: ["mo"],
        value: new Date(2015,9,19)
    }
    dateview.setOptions(options);
    var isDisabled = dateview.calendar.element.find("td").eq(1).hasClass("k-state-disabled")
    assert.equal(isDisabled, true);
});
});

var input;
var datepicker;
var DatePicker = kendo.ui.DatePicker;

describe("kendo.ui.DateView API", function () {
    beforeEach(function() {

        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        datepicker.destroy();
        kendo.destroy(Mocha.fixture);
    });

it("open method opens the dateView", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, "_calendar");
    stub(datepicker.dateView.popup, {open: datepicker.dateView.popup.open});

    datepicker.open();

    assert.equal(datepicker.dateView.popup.calls("open"), 1);
});

it("close method should closes the dateView", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView.popup, "close");

    datepicker.close();

    assert.equal(datepicker.dateView.popup.calls("close"), 1);
});

it("value method should return value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    assert.isOk(datepicker.value() === null);
});

it("value method updates the input value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var date = new Date();
    var dateString = kendo.toString(date, datepicker.options.format);

    datepicker.value(date);

    assert.equal(+datepicker._value, +date);
    assert.equal(input.val(), dateString);
});

it("value method uses options.parseFormats to parse passed value", function() {
    var secondFormat = "MM/dd/yy",
        date = new Date(2000, 10, 10),
        dateString = kendo.toString(date, secondFormat);

    datepicker = input.kendoDatePicker({
        format: "MMMM yyyy",
        parseFormats: secondFormat
    }).data("kendoDatePicker");

    datepicker.value(dateString);

    assert.equal(+datepicker._value, +date);
});

it("value method parse passed value using options.parseFormats", function() {
    var date = new Date(2000, 10, 1),
        dateString = kendo.toString(date, "MMMM yyyy");

    datepicker = input.kendoDatePicker({
        parseFormats: ["MMMM yyyy"]
    }).data("kendoDatePicker");

    datepicker.value(dateString);

    assert.equal(+datepicker.value(), +date);
});

it("value should not accept value bigger than max", function() {
    var date = new Date(2000, 10, 10);

    datepicker = input.kendoDatePicker({
        max: date
    }).data("kendoDatePicker");

    datepicker.value(new Date(2000, 10, 11));

    assert.equal(datepicker._value, null);
});

it("value should update input when select date from calendar", function() {
    var date = new Date(2000, 10, 10);

    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();
    datepicker.dateView.calendar.value(date);
    datepicker.dateView.calendar.trigger("change");

    assert.equal(+datepicker._value, +date);
    assert.equal(input.val(), "11/10/2000");
});

it("empty input if set value ot null", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(null);

    assert.equal(input.val(), "");
    assert.equal(datepicker._value, null);
});

it("value method should call dateview.value()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    stub(datepicker.dateView, "value");

    datepicker.value(new Date());

    assert.equal(datepicker.dateView.calls("value"), 1);
});

it("value method should parse value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/10/2000");

    datepicker.value("10/10/2000");

    assert.equal(+datepicker.value(), +value);
});

it("value method can set 1/1/1970", function() {
    var date = new Date(1970, 0, 1);
    var hours = (date.getTimezoneOffset() / 60) * -1;
    var minutes = hours % 1;
    if (minutes) {
        minutes = 60 * minutes;
    }
    date.setHours(hours, minutes, 0);

    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(date);

    assert.deepEqual(datepicker.dateView._value, date);
});

it("_change should set value if it was changed", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker._change("10/22/2000");

    assert.equal(+datepicker.value(), +(new Date("10/22/2000")));
});

it("_change should not call value() if value was not changed", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.value(value);
    stub(datepicker, "value");

    datepicker._change("10/22/2000");

    assert.equal(datepicker.calls("value"), 0);
});

it("min() should return min value", function() {
    var value = new Date("10/22/2000");
    datepicker = input.kendoDatePicker({min: value}).data("kendoDatePicker");

    var result = datepicker.min();

    assert.equal(+result, +value);
});

it("min() should set the min value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.min(value);

    assert.equal(+datepicker.options.min, +value);
});

it("min method uses options.parseFormats", function() {
    datepicker = input.kendoDatePicker({
        format: "MMMM yyyy",
        parseFormats: "MM/dd/yyyy"
    }).data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.min("10/22/2000");

    assert.equal(+datepicker.options.min, +value);
});

it("min() should call dateView.min()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    stub(datepicker.dateView, { min: datepicker.dateView.min });

    datepicker.min(value);

    assert.equal(datepicker.dateView.calls("min"), 1);
});

it("max() should return max value", function() {
    var value = new Date("10/22/2000");
    datepicker = input.kendoDatePicker({max: value}).data("kendoDatePicker");

    var result = datepicker.max();

    assert.equal(+result, +value);
});

it("max() should set the max value of the datepicker", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    var value = new Date("10/22/2000");

    datepicker.max(value);

    assert.equal(+datepicker.options.max, +value);
});

it("max() should call dateView.max()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    var value = new Date("10/22/2000");

    stub(datepicker.dateView, { max: datepicker.dateView.max });

    datepicker.max(value);

    assert.equal(datepicker.dateView.calls("max"), 1);
});

it("enable(false) should disable input element", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);

    assert.equal(datepicker.element.attr("disabled"), "disabled");
});

it("enable(false) should unbind icon click", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    assert.isOk(!datepicker.dateView.popup.visible());
});

it("enable() should remove disable attribute", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);
    datepicker.enable(true);

    assert.equal(datepicker.element.attr("disabled"), undefined);
});

it("readonly() makes  input element readonly", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();

    assert.equal(datepicker.element.attr("readonly"), "readonly");
});

it("readonly() unbinds icon click", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    assert.isOk(!datepicker.dateView.popup.visible());
});

it("readonly(false) removes readonly attribute", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.readonly(false);

    assert.equal(datepicker.element.attr("readonly"), undefined);
});

it("readonly() removes disabled attribute and disabled class", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.enable(false);
    datepicker.readonly();

    assert.equal(datepicker.element.attr("readonly"), "readonly");
    assert.equal(datepicker.element.attr("disabled"), undefined);
    assert.isOk(datepicker._inputWrapper.hasClass("k-state-default"));
    assert.isOk(!datepicker._inputWrapper.hasClass("k-state-disabled"));
});

it("enable(false) removes readonly attribute and default class", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.enable(false);

    assert.equal(datepicker.element.attr("readonly"), undefined);
    assert.equal(datepicker.element.attr("disabled"), "disabled");
    assert.isOk(!datepicker._inputWrapper.hasClass("k-state-default"));
    assert.isOk(datepicker._inputWrapper.hasClass("k-state-disabled"));
});

it("enable() enables widget after readonly()", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.readonly();
    datepicker.enable();

    assert.equal(datepicker.element.attr("readonly"), undefined);
    assert.equal(datepicker.element.attr("disabled"), undefined);
    assert.isOk(datepicker._inputWrapper.hasClass("k-state-default"));
    assert.isOk(!datepicker._inputWrapper.hasClass("k-state-disabled"));
});

it("value method honors options.culture", function() {
    datepicker = input.kendoDatePicker({
        culture: "bg-BG",
        format: "D"
    }).data("kendoDatePicker");

    var value = new Date(2000, 10, 10),
        formatted = kendo.toString(value, "D", "bg-BG");

    datepicker.value(formatted);

    assert.equal(+datepicker.value(), +value);
    assert.equal(datepicker.element.val(), formatted);
});

it("value method restricts time of the value if it's date part is equal to min", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    datepicker = input.kendoDatePicker({
        min: today,
        value: today
    }).data("kendoDatePicker");

    datepicker.value(midnight);

    assert.notEqual(datepicker._value, null);
    assert.equal(+datepicker._value, +today);
});

it("value method restricts time of the value if it's date part is equal to max", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    datepicker = input.kendoDatePicker({
        max: today,
        value: today
    }).data("kendoDatePicker");

    datepicker.value(midnight);

    assert.notEqual(datepicker._value, null);
    assert.equal(+datepicker._value, +midnight);
});

it("value method does not show text representation of invalid value", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value("invalid");

    assert.equal(datepicker.value(), null);
    assert.equal(input.val(), "");
});

it("setOptions method updates calendar options", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();

    datepicker.setOptions({
        start: "year",
        depth: "year"
    });

    assert.equal(datepicker.dateView.calendar.view().name, "year");
});

it("setOptions method updates format", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();
    datepicker.value(new Date(2013, 10, 10));

    datepicker.setOptions({
        format: "dd/MM/yyyy"
    });

    assert.equal(datepicker.element.val(), kendo.toString(datepicker.value(), "dd/MM/yyyy"));
});

it("setOptions method updates dateInput", function() {
    datepicker = input.kendoDatePicker().data("kendoDatePicker");
    datepicker.open();

    datepicker.setOptions({
        dateInput: true
    });

    assert.equal(datepicker.element.val(), "month/day/year");
});

it("setOptions method disables dateInput and clears the input if widget does not have a value", function() {
    datepicker = input.kendoDatePicker({dateInput: true}).data("kendoDatePicker");
    datepicker.open();

    datepicker.setOptions({
        dateInput: false
    });

    assert.equal(datepicker.element.val(), "");
});

it("setOptions preserves options.dates", function() {
    var datepicker = new DatePicker(input, {
        dates: [new Date()]
    });

    datepicker.setOptions({
        footer: false
    });

    assert.equal(datepicker.options.dates.length, 1);
});

it("setOptions updates options.dates", function() {
    var datepicker = new DatePicker(input, {
        dates: [new Date()]
    });

    datepicker.setOptions({
        dates: [new Date(), new Date()]
    });

    assert.equal(datepicker.options.dates.length, 2);
});

it("disabled date is not set as widgets value", function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,19),
        disableDates : ["mo"]
    });

    assert.equal(datepicker.element.val(), "");
});

it("widget value is set correctly when disabled dates are added", function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,20),
        disableDates : ["mo"]
    });

    assert.equal(datepicker.element.val(), "10/20/2015");
});

it("manually setting disabled date, does not set the widget value", function() {
    var datepicker = new DatePicker(input, {
        value: new Date(2015,9,20),
        disableDates : ["mo"]
    });
    datepicker.element.val("10/19/2015");
    datepicker.element.blur();

    assert.equal(datepicker.element.val(), "10/19/2015");
    assert.equal(datepicker.value(), null);
});

it("setting disabled date for first time does not clear input", function() {
    var datepicker = new DatePicker(input, {
        disableDates : ["sa", "su"]
    });
    datepicker.element.val("06/18/2016");
    datepicker.element.blur();

    assert.equal(datepicker.element.val(), "06/18/2016");
    assert.equal(datepicker.value(), null);
});

it("clicking on disabled date does not close the popup", function() {
    var datepicker = new DatePicker(input, {
        disableDates : ["tu"]
    });
    datepicker.dateView._calendar();
    datepicker.open();
    $("[data-value='2015/9/13']").parent().trigger("click");
    assert.equal(datepicker.element.val().length, 0)
    assert.equal($(".k-animation-container").css("display"), "block");
});

it("readonly calls dateinput _editable method", function() {
    var datepicker = new DatePicker(input, {
        dateInput: true
    });
    var atStub = stub(datepicker._dateInput, "_editable");

    datepicker.readonly();
    assert.equal(atStub.calls("_editable"), 1);
});

it("enable calls dateinput _editable method", function() {
    var datepicker = new DatePicker(input, {
        dateInput: true
    });
    stub(datepicker._dateInput, "_editable");

    datepicker.enable();
    assert.equal(datepicker._dateInput.calls("_editable"), 1);
});

    });
}());
