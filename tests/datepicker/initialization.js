(function() {

var DateView = kendo.DateView;
var dateview;
var anchor;
var div;

describe("kendo.ui.DateView initialization", function () {
    beforeEach(function() {
        kendo.ns = "kendo-";


        anchor = $("<input/>").appendTo(Mocha.fixture);
        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {


        if (dateview) {
            dateview.destroy();
        }

        kendo.destroy(Mocha.fixture);

        kendo.ns = "";
    });

it("DateView should create popup instance", function() {
    dateview = new DateView();

    assert.isOk(dateview.popup);
});

it("DateView does not create calendar on init", function() {
    dateview = new DateView();

    assert.isOk(!dateview.calendar);
});

it("DateView creates calendar on first open", function() {
    dateview = new DateView();

    dateview.open();

    assert.isOk(dateview.calendar);
});

it("DateView persist focused value when calendar navigate", function() {
    var called = false,
        date = new Date(2000, 10, 10);

    dateview = new DateView({
        value: date,
        min: date,
        max: date,
        start: "month"
    });

    dateview._calendar();
    dateview.calendar.navigate(date, "month");

    assert.equal(dateview.calendar._table.find(".k-state-focused").children().attr("data-kendo-value"), "2000/10/10");
    assert.equal(+dateview._current, +dateview.calendar._current);
});
});

var input;
var DatePicker = kendo.ui.DatePicker;

describe("kendo.ui.DatePicker initialization", function () {
    beforeEach(function() {
        kendo.ns = "kendo-";


        input = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {


        kendo.destroy(Mocha.fixture);

        kendo.ns = "";
    });

it("DatePicker should not create footer template", function() {
    var datepicker = input.kendoDatePicker({
        footer: false
    }).data("kendoDatePicker");

    assert.deepEqual(datepicker.dateView.footer, undefined);
});

it("get value of the input if", function() {
    input.val("10/10/2000");

    var datepicker = new DatePicker(input);

    assert.equal(+datepicker.value(), +new Date(2000, 9, 10));
});

it("_wrapper() wraps input element", function() {
    input.css("width", "200");

    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    assert.isOk(input.parent().hasClass("k-picker-wrap k-state-default"));
    assert.isOk(datepicker.wrapper.hasClass("k-widget k-datepicker"));
});

it("_input should add k-input to the element", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    assert.isOk(datepicker.element.hasClass("k-input"));
});

it("_input create calendar button", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker"),
        icon = datepicker.wrapper.find(".k-select");

    assert.isOk(icon);
    assert.isOk(icon.is("span"));
    assert.isOk(icon.hasClass("k-select"));
    assert.isOk(icon.children().is("span"));
    assert.isOk(icon.children().hasClass("k-icon k-i-calendar"));
    assert.equal(icon.children().html(), "");
});

it("create dateview", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    assert.isOk(datepicker.dateView);
});

it("dateView should have correct options", function() {
    var datepicker = input.kendoDatePicker({open: function() {}, close: $.noop, showWeekNumber: true}).data("kendoDatePicker"),
        dateView = datepicker.dateView,
        options = dateView.options,
        dpOptions = datepicker.options;

    assert.isOk(dateView.options);
    assert.equal(options.anchor, datepicker.wrapper);
    assert.equal(options.value, dpOptions.value);
    assert.equal(+options.min, +dpOptions.min);
    assert.equal(+options.max, +dpOptions.max);
    assert.equal(+options.showWeekNumber, +dpOptions.showWeekNumber);
    assert.notEqual(options.change, dpOptions.change);
});

it("dateview updates datepicker on calendar change", function() {
    var date = new Date(2010, 10, 10);
    var datepicker = new DatePicker(input, { value: new Date(2000, 10, 10) });
    var dateview = datepicker.dateView;

    datepicker.open();
    dateview.calendar.value(date);
    dateview.calendar.trigger("change");

    assert.deepEqual(datepicker.value(), date);
});

it("DatePicker wire icon click", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.close();
    datepicker._dateIcon.click();
    assert.isOk(datepicker.dateView.popup.visible());
});

it("DatePicker initializes dateInput with initial value", function() {
    var datepicker = input.kendoDatePicker({ dateInput: true, value: new Date(2000, 10, 10)}).data("kendoDatePicker");

    assert.equal(datepicker.element.val(), "11/10/2000");
});

it("form reset support", function(done) {
    input.attr("value", "12/12/2000");

    var form = $("<form/>").appendTo(Mocha.fixture).append(input),
        datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.open();
    datepicker.value("12/12/2010");

    form[0].reset();

    setTimeout(function() {
        assert.equal(datepicker.element.val(), "12/12/2000");
        assert.equal(datepicker.dateView.calendar.value().getFullYear(), "2000");
        done();
    }, 200);
});

it("support for form defined by attribute", function(done) {
    input.attr("form", "form1").attr("value", "12/12/2000");

    var form = $("<form id='form1'/>").appendTo(Mocha.fixture),
        datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.open();
    datepicker.value("12/12/2010");

    form[0].reset();

    setTimeout(function() {
        assert.equal(datepicker.element.val(), "12/12/2000");
        assert.equal(datepicker.dateView.calendar.value().getFullYear(), "2000");
        done();
    }, 200);
});


it("extend popup options if datepicker.options.popup", function() {
    var appendTo = Mocha.fixture,
        datepicker = new kendo.ui.DatePicker(input, {
            popup: {
                appendTo: appendTo
            }
        });

    assert.equal(datepicker.dateView.popup.options.appendTo[0], $(appendTo)[0]);
});

it("DatePicker adds format to parseFormats array", function() {
    var datepicker = input.kendoDatePicker({
        parseFormats: ["MM/dd/yy"]
    }).data("kendoDatePicker");

    assert.equal(datepicker.options.parseFormats[0], datepicker.options.format);
    assert.equal(datepicker.options.parseFormats[1], "MM/dd/yy");
});

it("DatePicker does not modify parseFormats if format exists in the array", function() {
    var datepicker = input.kendoDatePicker({
        format: "MM/dd/yy",
        parseFormats: ["MM/dd/yyyy", "MM/dd/yy"]
    }).data("kendoDatePicker");

    assert.equal(datepicker.options.parseFormats.length, 2);
    assert.equal(datepicker.options.parseFormats[0], "MM/dd/yyyy");
    assert.equal(datepicker.options.parseFormats[1], datepicker.options.format);
});

it("DatePicker copies input's className to the wrapper", function() {
    var datepicker = input.addClass("test").kendoDatePicker().data("kendoDatePicker");

    assert.isOk(datepicker.wrapper.hasClass("test"));
});

it("DatePicker updates calendar if empty input element on open", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(new Date());

    input.focus().val("");
    datepicker.open();

    assert.equal(datepicker.dateView.calendar.value(), null);
});

it("DatePicker updates calendar's focused date", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker"),
        date = new Date(2000, 10, 10);

    datepicker.value(new Date(2000, 9, 1));

    input.focus().val(kendo.toString(date, "MM/dd/yyyy"));
    datepicker.open();

    var link = datepicker.dateView.calendar.element.find(".k-state-focused > .k-link");

    assert.equal(+datepicker.dateView.calendar.value(), +datepicker.value());
    assert.equal(link.html(), date.getDate());
});

if (!kendo.support.touch) {
    it("DatePickers changes the type of the input", function() {
        input = $("<input type='date'/>").appendTo(Mocha.fixture);

        var datepicker = input.kendoDatePicker().data("kendoDatePicker");

        assert.equal(datepicker.element[0].type, "text");
        assert.equal(datepicker.element.attr("type"), "text");
    });
}

it("DatePicker sets dates property of the calendar", function() {
    var dates =  [new Date(2000, 10, 10)],
        datepicker = input.kendoDatePicker({
            dates: dates
        }).data("kendoDatePicker");

    datepicker.open();

    assert.isOk(datepicker.dateView.calendar.options.dates[0]);
});

it("DatePicker honors readonly attribute", function() {
    var datepicker = input.attr("readonly", true).kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    assert.isOk(!datepicker.dateView.popup.visible());
});

it("DatePicker uses disabled attr over the readonly", function() {
    var datepicker = input.attr("readonly", true).attr("disabled", true)
                          .kendoDatePicker().data("kendoDatePicker");

    assert.equal(input.attr("readonly"), undefined);
});

it("DatePicker is disabled when placed in disabled fieldset", function() {
    $(input).wrap('<fieldset disabled="disabled"></fieldset>');
    input.kendoDatePicker().data("kendoDatePicker");
    assert.equal(input.attr("disabled"), "disabled");
});

it("DatePicker does not remove input text on initialization if not valid value", function() {
    var datepicker = input.val("test").kendoDatePicker().data("kendoDatePicker");

    assert.equal(datepicker.value(), null);
    assert.equal(input.val(), "test");
});

it("DatePicker sets min from min attribute", function() {
    var date = new Date(2000, 9, 10);
    input.attr("min", kendo.toString(date, "yyyy-MM-dd"));

    var datepicker = new DatePicker(input);

    assert.deepEqual(datepicker.min(), date);
});

it("DatePicker sets max from max attribute", function() {
    var date = new Date(2000, 9, 10);
    input.attr("max", kendo.toString(date, "yyyy-MM-dd"));

    var datepicker = new DatePicker(input);

    assert.deepEqual(datepicker.max(), date);
});

it("DatePicker parseFormats contains default ISO format if no parseFromats are configured", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");
    var ISOFormat = $.inArray('yyyy-MM-dd', datepicker.options.parseFormats) > -1
    assert.isOk(ISOFormat)
});

it("DatePicker max and min values are reset to initial when form is reset", function() {
    $(input).wrap("<form id='form'></form>");
    var datepicker = input.kendoDatePicker({
        min: new Date(2000, 0, 1),
        max: new Date(2000, 0, 2)
    }).data("kendoDatePicker")

    datepicker.setOptions({
        max: new Date(2000, 0, 4)
    });

    $("form")[0].reset();
    assert.deepEqual(datepicker.options.max, new Date(2000, 0, 2));
});

it("DatePicker renders formatted value even when out of range", function() {
    var value = new Date(1900, 0, 1);

    var datepicker = input.kendoDatePicker({
        value: value,
        min: new Date(2000, 0, 1),
        max: new Date(2000, 0, 2)
    }).data("kendoDatePicker");

    assert.equal(datepicker.value(), null);
    assert.equal(datepicker.element.val(), kendo.toString(value, datepicker.options.format));
});

    });
}());
