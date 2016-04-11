(function() {

var DateTimePicker = kendo.ui.DateTimePicker,
    input;

module("kendo.ui.DateTimePicker initialization", {
    setup: function() {
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        input.data("kendoDateTimePicker").destroy();
    }
});

test("_wrapper() wraps input element", function() {
    input.css("width", "200");

    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    ok(input.parent().hasClass("k-picker-wrap k-state-default"));
    equal(datetimepicker.wrapper.attr("class"), "k-widget k-datetimepicker k-header");
});

test("DateTimePicker adds k-input class to the element", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    ok(datetimepicker.element.hasClass("k-input"));
});

test("_icons method creates calendar and clock button", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        icons = datetimepicker.wrapper.find(".k-select");

    ok(icons.is("span"));
    ok(icons.hasClass("k-select"));

    ok(icons.children(":first").hasClass("k-icon k-i-calendar"));
    ok(icons.children(":last").hasClass("k-icon k-i-clock"));
});

test("DateTimePicker renders last date when navigating", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    datetimepicker.value(new Date(2099, 11, 10, 10, 10, 10));
    datetimepicker.open();
    equal($(".k-link").not(".k-nav-today").last().text(), 31);
});

test("DateTimePicker creates DateView", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    ok(datetimepicker.dateView);
});

test("DateTimePicker sets correct options to DateView", function() {
    var datetimepicker = input.kendoDateTimePicker({open: function() {}, close: $.noop}).data("kendoDateTimePicker"),
        dateView = datetimepicker.dateView,
        options = dateView.options,
        dpOptions = datetimepicker.options;

    ok(dateView.options);
    equal(options.anchor, datetimepicker.wrapper);
    equal(options.value, dpOptions.value);
    equal(+options.min, +dpOptions.min);
    equal(+options.max, +dpOptions.max);
});

test("DateTimePicker creates TimeView", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    ok(datetimepicker.timeView);
});

test("DateTimePicker sets correct options to TimeView", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        timeView = datetimepicker.timeView;

    equal(timeView.options.anchor, datetimepicker.wrapper);
    equal(timeView.options.format, datetimepicker.options.timeFormat);
    equal(timeView.options.interval, datetimepicker.options.interval);
});

test("datetimepicker wire date icon click", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.close();
    datetimepicker._dateIcon.click();
    ok(datetimepicker.dateView.popup.visible());
});

test("datetimepicker wire clock icon click", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.close("time");
    datetimepicker._timeIcon.click();
    ok(datetimepicker.timeView.popup.visible());
});

test("datetimepicker disables widget if input has disabled attribute", function() {
    var datetimepicker = new DateTimePicker(input.attr("disabled", "disabled"));

    ok(datetimepicker.wrapper.children(":first").hasClass("k-state-disabled"));
});

asyncTest("form reset support", 2, function() {
    input.attr("value", "12/12/2000 12:00 AM");

    var form = $("<form/>").appendTo(QUnit.fixture).append(input),
        datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.open();
    datetimepicker.value("12/12/2010 12:00 AM");

    form[0].reset();

    setTimeout(function() {
        equal(datetimepicker.element.val(), "12/12/2000 12:00 AM");
        equal(datetimepicker.dateView.calendar.value().getFullYear(), "2000");
        start();
    }, 100);
});

asyncTest("support for form defined by attribute", 2, function() {
    input.attr("form", "form1").attr("value", "12/12/2000 12:00 AM");

    var form = $("<form id='form1'/>").appendTo(QUnit.fixture),
        datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.open();
    datetimepicker.value("12/12/2010 12:00 AM");

    form[0].reset();

    setTimeout(function() {
        equal(datetimepicker.element.val(), "12/12/2000 12:00 AM");
        equal(datetimepicker.dateView.calendar.value().getFullYear(), "2000");
        start();
    }, 100);
});

test("extend popup options if datetimepicker.options.popup", function() {
    var appendTo = "body",
        datetimepicker = new kendo.ui.DateTimePicker(input, {
            popup: {
                appendTo: appendTo
            }
        });

    equal(datetimepicker.dateView.popup.options.appendTo[0], $(appendTo)[0]);
});

test("DateTimePicker strips the format from {0:format}", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        format: "{0:MM/dd/yyyy hh:mm}",
        timeFormat: "{0:hh:mm}"
    });

    equal(datetimepicker.options.format, "MM/dd/yyyy hh:mm");
    equal(datetimepicker.options.timeFormat, "hh:mm");
});

test("DateTimePicker adds format to the parseFormats array", function() {
    var datetimepicker = input.kendoDateTimePicker({
        parseFormats: ["MM/dd/yy"]
    }).data("kendoDateTimePicker");

    equal(datetimepicker.options.parseFormats[0], datetimepicker.options.format);
    equal(datetimepicker.options.parseFormats[1], datetimepicker.options.timeFormat);
    equal(datetimepicker.options.parseFormats[2], "MM/dd/yy");
});

test("DateTimePicker does not modify parseFormats if format exists in the array", function() {
    var datetimepicker = input.kendoDateTimePicker({
        format: "MM/dd/yy",
        parseFormats: ["MM/dd/yyyy", "MM/dd/yy", "h:mm tt"]
    }).data("kendoDateTimePicker");

    equal(datetimepicker.options.parseFormats.length, 3);
    equal(datetimepicker.options.parseFormats[0], "MM/dd/yyyy");
    equal(datetimepicker.options.parseFormats[1], datetimepicker.options.format);
    equal(datetimepicker.options.parseFormats[2], datetimepicker.options.timeFormat);
});

test("DateTimePicker uses options.dates if today is in dates", function() {
    var datetimepicker = input.kendoDateTimePicker({
        dates: [new Date(2000, 10, 10, 18, 0, 0)]
    }).data("kendoDateTimePicker");

    datetimepicker.value(new Date(2000, 10, 10));

    datetimepicker.open("time");

    equal(datetimepicker.timeView.ul.children().length, 1);
    equal(datetimepicker.timeView.ul.children(":first").text(), "6:00 PM");
});

test("DateTimePicker does not use options.dates if today is not in dates", function() {
    var datetimepicker = input.kendoDateTimePicker({
        dates: [new Date(2000, 10, 10, 18, 0, 0)]
    }).data("kendoDateTimePicker");

    datetimepicker.value(new Date(2000, 10, 11));

    datetimepicker.open("time");

    ok(datetimepicker.timeView.ul.children().length > 1);
});

test("DateTimePicker rebinds timeView if other day is selected", function() {
    var datetimepicker = input.kendoDateTimePicker({
        dates: [new Date(2000, 10, 10, 18, 0, 0)]
    }).data("kendoDateTimePicker");

    datetimepicker.value(new Date(2000, 10, 10));
    datetimepicker.open("time");

    datetimepicker.value(new Date(2010, 10, 10));

    ok(datetimepicker.timeView.ul.children().length > 1);
});

test("DateTimePicker uses options.dates even when edge date is selected", function() {
    var datetimepicker = input.kendoDateTimePicker({
        dates: [new Date(2000, 10, 10, 18, 0, 0)],
        min: new Date(2000, 10, 10),
        max: new Date(2000, 10, 10)
    }).data("kendoDateTimePicker");

    datetimepicker.value(new Date(2000, 10, 10));
    datetimepicker.open("time");

    equal(datetimepicker.timeView.ul.children().length, 1);
    equal(datetimepicker.timeView.ul.children().eq(0).html(), "6:00 PM");
});

test("DateTimePicker copies input's className to the wrapper", function() {
    var datetimepicker = input.addClass("test").kendoDateTimePicker().data("kendoDateTimePicker");

    ok(datetimepicker.wrapper.hasClass("test"));
});

test("DateTimePicker updates calendar if empty input element on open", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.value(new Date());

    input.focus().val("");
    datetimepicker.open();

    equal(datetimepicker.dateView.calendar.value(), null);
});

test("DateTimePicker updates calendar's focused date", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        date = new Date(2000, 10, 10);

    datetimepicker.value(new Date(2000, 9, 1));

    input.focus().val(kendo.toString(date, "MM/dd/yyyy hh:mm tt"));
    datetimepicker.open();

    var link = datetimepicker.dateView.calendar.element.find(".k-state-focused > .k-link");

    equal(+datetimepicker.dateView.calendar.value(), +datetimepicker.value());
    equal(link.html(), date.getDate());
});

if (!kendo.support.touch) {
    test("DateTimePicker changes the type of the input", function() {
        input = $("<input type='date'/>").appendTo(QUnit.fixture);

        datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

        equal(datetimepicker.element[0].type, "text");
    });
}

test("DateTimePicker honors readonly attribute", function() {
    var datetimepicker = input.attr("readonly", true).kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker._timeIcon.click();

    ok(!datetimepicker.timeView.popup.visible());
});

test("DateTimePicker uses disabled attr over the readonly", function() {
    input.attr("readonly", true).attr("disabled", true).kendoDateTimePicker();

    equal(input.attr("readonly"), undefined);
});

test("DateTimePicker does not remove input text on initialization if not valid value", function() {
    var datetimepicker = input.val("test").kendoDateTimePicker().data("kendoDateTimePicker");

    equal(datetimepicker.value(), null);
    equal(input.val(), "test");
});

test("DateTimePicker renders only one possible time option if min and max are equal", function() {
    var date = new Date(2013, 10, 10, 10);
    var datetimepicker = new DateTimePicker(input, {
        min: date,
        max: date
    });

    datetimepicker._timeIcon.click();

    var li = datetimepicker.timeView.ul.find("li");
    equal(li.length, 1);
    equal(li.html(), "10:00 AM");
});

test("DateTimePicker sets min from min attribute", function() {
    var date = new Date(2000, 9, 10, 10, 0, 0);
    input.attr("min", kendo.toString(date, "yyyy-MM-ddTHH:mm:ss"));

    var datetimepicker = new DateTimePicker(input);

    deepEqual(datetimepicker.min(), date);
});

test("DateTimePicker sets max from max attribute", function() {
    var date = new Date(2013, 9, 10, 21, 30);
    input.attr("max", kendo.toString(date, "yyyy-MM-ddTHH:mm:ss"));

    var datetimepicker = new DateTimePicker(input);

    deepEqual(datetimepicker.max(), date);
});

test("DateTimePicker is disabled when placed in disabled fieldset", function() {
    $(input).wrap('<fieldset disabled="disabled"></fieldset>');
    input.kendoDateTimePicker().data("kendoDateTimePicker");
    equal(input.attr("disabled"), "disabled");
});

test("DateTimePicker parseFormats contains default ISO formats if no parseFromats are configured", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    var dateFormat = $.inArray('yyyy-MM-dd', datetimepicker.options.parseFormats) > -1
    var timeFormat = $.inArray('yyyy-MM-ddTHH:mm:ss', datetimepicker.options.parseFormats) > -1

    ok(dateFormat);
    ok(timeFormat);
});

test("DateTimePicker max and min values are reset to initial when form is reset", function() {
    $(input).wrap("<form id='form'></form>");
    var datetimepicker = input.kendoDateTimePicker({
        min: new Date(2000, 0, 1, 22, 0, 0),
        max: new Date(2000, 0, 2, 22, 0, 0)
    }).data("kendoDateTimePicker")

    datetimepicker.setOptions({
        max: new Date(2000, 0, 1, 23, 0, 0)
    });

    $("form")[0].reset();
    deepEqual(datetimepicker.options.max, new Date(2000, 0, 2, 22, 0, 0));
});

test("datetimepicker does not add timezone offset incorrectly", function() {
    var minDate = new Date(2016, 3, 8, 0, 0, 0);
    var datetimepicker = new DateTimePicker(input, {
        animation: false,
        min: new Date(minDate)
    });

    datetimepicker.open();
    datetimepicker.dateView.calendar.value(minDate);
    datetimepicker.dateView.calendar.trigger("change");

    deepEqual(datetimepicker.value(), minDate);
});

})();
