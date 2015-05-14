(function() {

var DateView = kendo.DateView;
var dateview;
var anchor;
var div;

module("kendo.ui.DateView initialization", {
    setup: function() {
        kendo.ns = "kendo-";
        kendo.effects.disable();

        anchor = $("<input/>").appendTo(QUnit.fixture);
        div = $("<div />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();

        if (dateview) {
            dateview.destroy();
        }

        kendo.destroy(QUnit.fixture);

        kendo.ns = "";
    }
});

test("DateView should create popup instance", function() {
    dateview = new DateView();

    ok(dateview.popup);
});

test("DateView does not create calendar on init", function() {
    dateview = new DateView();

    ok(!dateview.calendar);
});

test("DateView creates calendar on first open", function() {
    dateview = new DateView();

    dateview.open();

    ok(dateview.calendar);
});

test("DateView persist focused value when calendar navigate", function() {
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

    equal(dateview.calendar._table.find(".k-state-focused").children().attr("data-kendo-value"), "2000/10/10");
    equal(+dateview._current, +dateview.calendar._current);
});

var input;
var DatePicker = kendo.ui.DatePicker;

module("kendo.ui.DatePicker initialization", {
    setup: function() {
        kendo.ns = "kendo-";
        kendo.effects.disable();

        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();

        kendo.destroy(QUnit.fixture);

        kendo.ns = "";
    }
});

test("DatePicker should not create footer template", function() {
    var datepicker = input.kendoDatePicker({
        footer: false
    }).data("kendoDatePicker");

    deepEqual(datepicker.dateView.footer, undefined);
});

test("get value of the input if", function() {
    input.val("10/10/2000");

    var datepicker = new DatePicker(input);

    equal(+datepicker.value(), +new Date(2000, 9, 10));
});

test("_wrapper() wraps input element", function() {
    input.css("width", "200");

    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    ok(input.parent().hasClass("k-picker-wrap k-state-default"));
    equal(datepicker.wrapper.attr("class"), "k-widget k-datepicker k-header");
});

test("_input should add k-input to the element", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    ok(datepicker.element.hasClass("k-input"));
});

test("_input create calendar button", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker"),
        icon = datepicker.wrapper.find(".k-select");

    ok(icon);
    ok(icon.is("span"));
    ok(icon.hasClass("k-select"));
    ok(icon.children().is("span"));
    ok(icon.children().hasClass("k-icon k-i-calendar"));
    ok(icon.children().html());
});

test("create dateview", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    ok(datepicker.dateView);
});

test("dateView should have correct options", function() {
    var datepicker = input.kendoDatePicker({open: function() {}, close: $.noop}).data("kendoDatePicker"),
        dateView = datepicker.dateView,
        options = dateView.options,
        dpOptions = datepicker.options;

    ok(dateView.options);
    equal(options.anchor, datepicker.wrapper);
    equal(options.value, dpOptions.value);
    equal(+options.min, +dpOptions.min);
    equal(+options.max, +dpOptions.max);
    notEqual(options.change, dpOptions.change);
});

test("dateview updates datepicker on calendar change", function() {
    var date = new Date(2010, 10, 10);
    var datepicker = new DatePicker(input, { value: new Date(2000, 10, 10) });
    var dateview = datepicker.dateView;

    datepicker.open();
    dateview.calendar.value(date);
    dateview.calendar.trigger("change");

    deepEqual(datepicker.value(), date);
});

test("DatePicker wire icon click", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.close();
    datepicker._dateIcon.click();
    ok(datepicker.dateView.popup.visible());
});

asyncTest("form reset support", 2, function() {
    input.attr("value", "12/12/2000");

    var form = $("<form/>").appendTo(QUnit.fixture).append(input),
        datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.open();
    datepicker.value("12/12/2010");

    form[0].reset();

    setTimeout(function() {
        equal(datepicker.element.val(), "12/12/2000");
        equal(datepicker.dateView.calendar.value().getFullYear(), "2000");
        start();
    }, 200);
});

asyncTest("support for form defined by attribute", 2, function() {
    input.attr("form", "form1").attr("value", "12/12/2000");

    var form = $("<form id='form1'/>").appendTo(QUnit.fixture),
        datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.open();
    datepicker.value("12/12/2010");

    form[0].reset();

    setTimeout(function() {
        equal(datepicker.element.val(), "12/12/2000");
        equal(datepicker.dateView.calendar.value().getFullYear(), "2000");
        start();
    }, 200);
});


test("extend popup options if datepicker.options.popup", function() {
    var appendTo = QUnit.fixture,
        datepicker = new kendo.ui.DatePicker(input, {
            popup: {
                appendTo: appendTo
            }
        });

    equal(datepicker.dateView.popup.options.appendTo[0], $(appendTo)[0]);
});

test("DatePicker adds format to parseFormats array", function() {
    var datepicker = input.kendoDatePicker({
        parseFormats: ["MM/dd/yy"]
    }).data("kendoDatePicker");

    equal(datepicker.options.parseFormats[0], datepicker.options.format);
    equal(datepicker.options.parseFormats[1], "MM/dd/yy");
});

test("DatePicker does not modify parseFormats if format exists in the array", function() {
    var datepicker = input.kendoDatePicker({
        format: "MM/dd/yy",
        parseFormats: ["MM/dd/yyyy", "MM/dd/yy"]
    }).data("kendoDatePicker");

    equal(datepicker.options.parseFormats.length, 2);
    equal(datepicker.options.parseFormats[0], "MM/dd/yyyy");
    equal(datepicker.options.parseFormats[1], datepicker.options.format);
});

test("DatePicker copies input's className to the wrapper", function() {
    var datepicker = input.addClass("test").kendoDatePicker().data("kendoDatePicker");

    ok(datepicker.wrapper.hasClass("test"));
});

test("DatePicker updates calendar if empty input element on open", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.value(new Date());

    input.focus().val("");
    datepicker.open();

    equal(datepicker.dateView.calendar.value(), null);
});

test("DatePicker updates calendar's focused date", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker"),
        date = new Date(2000, 10, 10);

    datepicker.value(new Date(2000, 9, 1));

    input.focus().val(kendo.toString(date, "MM/dd/yyyy"));
    datepicker.open();

    var link = datepicker.dateView.calendar.element.find(".k-state-focused > .k-link");

    equal(+datepicker.dateView.calendar.value(), +datepicker.value());
    equal(link.html(), date.getDate());
});

if (!kendo.support.touch) {
    test("DatePickers changes the type of the input", function() {
        input = $("<input type='date'/>").appendTo(QUnit.fixture);

        var datepicker = input.kendoDatePicker().data("kendoDatePicker");

        equal(datepicker.element[0].type, "text");
        equal(datepicker.element.attr("type"), "text");
    });
}

test("DatePicker sets dates property of the calendar", function() {
    var dates =  [new Date(2000, 10, 10)],
        datepicker = input.kendoDatePicker({
            dates: dates
        }).data("kendoDatePicker");

    datepicker.open();

    ok(datepicker.dateView.calendar.options.dates[0]);
});

test("DatePicker honors readonly attribute", function() {
    var datepicker = input.attr("readonly", true).kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, {toggle: datepicker.dateView.toggle});

    datepicker.wrapper.find(".k-select").click();

    ok(!datepicker.dateView.popup.visible());
});

test("DatePicker uses disabled attr over the readonly", function() {
    var datepicker = input.attr("readonly", true).attr("disabled", true)
                          .kendoDatePicker().data("kendoDatePicker");

    equal(input.attr("readonly"), undefined);
});

test("DatePicker is disabled when placed in disabled fieldset", function() {
    $(input).wrap('<fieldset disabled="disabled"></fieldset>');
    input.kendoDatePicker().data("kendoDatePicker");
    equal(input.attr("disabled"), "disabled");
});

test("DatePicker does not remove input text on initialization if not valid value", function() {
    var datepicker = input.val("test").kendoDatePicker().data("kendoDatePicker");

    equal(datepicker.value(), null);
    equal(input.val(), "test");
});

test("DatePicker sets min from min attribute", function() {
    var date = new Date(2000, 9, 10);
    input.attr("min", kendo.toString(date, "yyyy-MM-dd"));

    var datepicker = new DatePicker(input);

    deepEqual(datepicker.min(), date);
});

test("DatePicker sets max from max attribute", function() {
    var date = new Date(2000, 9, 10);
    input.attr("max", kendo.toString(date, "yyyy-MM-dd"));

    var datepicker = new DatePicker(input);

    deepEqual(datepicker.max(), date);
});

test("DatePicker parseFormats contains default ISO format if no parseFromats are configured", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");
    var ISOFormat = $.inArray('yyyy-MM-dd', datepicker.options.parseFormats) > -1
    ok(ISOFormat)
});

test("DatePicker max and min values are reset to initial when form is reset", function() {
    $(input).wrap("<form id='form'></form>");
    var datepicker = input.kendoDatePicker({
        min: new Date(2000, 0, 1),
        max: new Date(2000, 0, 2)
    }).data("kendoDatePicker")

    datepicker.setOptions({
        max: new Date(2000, 0, 4)
    });

    $("form")[0].reset();
    deepEqual(datepicker.options.max, new Date(2000, 0, 2));
});


})();
