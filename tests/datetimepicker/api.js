(function() {

var DateTimePicker = kendo.ui.DateTimePicker,
    input;

module("kendo.ui.DateTimePicker api", {
    setup: function() {
        kendo.effects.disable();
        input = $("<input />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        input.data("kendoDateTimePicker").destroy();
    }
});

test("open method with 'date' param opens DateView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");

    ok(datetimepicker.dateView.popup.visible());
});

test("open method with 'time' param opens TimeView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");

    ok(datetimepicker.timeView.popup.visible());
});

test("close method with 'date' param closes DateView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");
    datetimepicker.close("date");

    ok(!datetimepicker.dateView.popup.visible());
});

test("close method with 'time' param closes TimeView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");
    datetimepicker.close("time");

    ok(!datetimepicker.timeView.popup.visible());
});

test("toggle method toggles DateView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");
    datetimepicker.toggle("date");

    ok(!datetimepicker.dateView.popup.visible());
});

test("toggle method toggles TimeView", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");
    datetimepicker.toggle("time");

    ok(!datetimepicker.timeView.popup.visible());
});

test("toggle method closes TimeView when DateView is about to open", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("time");
    datetimepicker.toggle("date");

    ok(datetimepicker.dateView.popup.visible());
    ok(!datetimepicker.timeView.popup.visible());
});

test("toggle method closes DateView when TimeView is about to open", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.open("date");
    datetimepicker.toggle("time");

    ok(!datetimepicker.dateView.popup.visible());
    ok(datetimepicker.timeView.popup.visible());
});

test("value method sets input value", function() {
    var datetimepicker = new DateTimePicker(input),
        value = "2/10/2000 10:10 AM";

    datetimepicker.value(value);

    equal(input.val(), value);
});

test("value method sets DateView's value", function() {
    var datetimepicker = new DateTimePicker(input),
        value = "2/10/2000 10:10 AM";

    stub(datetimepicker.dateView, "value");

    datetimepicker.value(value);

    equal(datetimepicker.dateView.calls("value"), 1);
    ok(datetimepicker.dateView.args("value", 0)[0] instanceof Date);
});

test("value method sets TimeView's value", function() {
    var datetimepicker = new DateTimePicker(input),
        value = "2/10/2000 12:00 AM";

    datetimepicker.timeView.refresh();
    datetimepicker.value(value);

    ok(datetimepicker.timeView.ul.find(".k-state-selected")[0]);
});

test("value method returns value of the datetimepicker", function() {
    var datetimepicker = new DateTimePicker(input),
        value = new Date(2000, 10, 10);

    datetimepicker.value(value);

    equal(+datetimepicker.value(), +value);
});

test("value method sets null if date is out of range", function() {
    var datetimepicker = new DateTimePicker(input, {
            min: new Date(2000, 10, 10)
        }),
        value = "2/10/1900 10:10 AM";

    datetimepicker.value(value);

    equal(datetimepicker.value(), null);
});

test("value method uses options.parseFormats to parse passed value", function() {
    var secondFormat = "MM/dd/yy",
        date = new Date(2000, 10, 10),
        datetimepicker = input.kendoDateTimePicker({
            parseFormats: secondFormat
        }).data("kendoDateTimePicker"),
        dateString = kendo.toString(date, secondFormat);

    datetimepicker.value(dateString);

    equal(+datetimepicker._value, +date);
});

test("value method parse passed value using options.parseFormats", function() {
        var datetimepicker = input.kendoDateTimePicker({
            parseFormats: ["MMMM yyyy"]
        }).data("kendoDateTimePicker"),
        date = new Date(2000, 10, 1),
        dateString = kendo.toString(date, "MMMM yyyy");

    datetimepicker.value(dateString);

    equal(+datetimepicker._value, +date);
});

test("value method sets timeView's min date", function() {
        var date = new Date(2000, 10, 1, 16, 0, 0),
            datetimepicker = input.kendoDateTimePicker({
                value: new Date(),
                min: date
            }).data("kendoDateTimePicker");

    datetimepicker.value(new Date(2000, 10, 1, 16, 0, 1));

    equal(+datetimepicker.timeView.options.min, +date);
});

test("enable method with false value disables the widget", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.enable(false);

    equal(datetimepicker.element.attr("disabled"), "disabled");
});

test("enable method with false unbind click event of date icon", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.enable(false);

    stub(datetimepicker.dateView, {toggle: datetimepicker.dateView.toggle});

    datetimepicker._dateIcon.click();

    ok(!datetimepicker.dateView.popup.visible());
});

test("enable method with false unbind click event of clock icon", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.enable(false);

    stub(datetimepicker.timeView, {toggle: datetimepicker.timeView.toggle});

    datetimepicker._timeIcon.click();

    ok(!datetimepicker.timeView.popup.visible());
});

test("enable method with false adds disabled state class to the wrapper", function() {
    var datetimepicker = new DateTimePicker(input);

    datetimepicker.enable(false);

    var inputwrapper = datetimepicker.wrapper.children(":first");

    ok(inputwrapper.hasClass("k-state-disabled"));
    ok(!inputwrapper.hasClass("k-state-default"));
});

test("enable method with true remove disabled attribute", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.enable(false);
    datetimepicker.enable(true);

    equal(datetimepicker.element.attr("disabled"), undefined);
});

test("enable method with true remove disabled class from wrapper", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.enable(false);
    datetimepicker.enable(true);

    ok(datetimepicker.wrapper.children(":first").hasClass("k-state-default"));
    ok(!datetimepicker.wrapper.children(":first").hasClass("k-state-disabled"));
});

test("readonly() makes  input element readonly", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();

    equal(datetimepicker.element.attr("readonly"), "readonly");
});

test("readonly() unbinds date icon click", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();

    datetimepicker._dateIcon.click();

    ok(!datetimepicker.dateView.popup.visible());
});

test("readonly() unbinds time icon click", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();

    datetimepicker._timeIcon.click();

    ok(!datetimepicker.timeView.popup.visible());
});

test("readonly(false) removes readonly attribute", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();
    datetimepicker.readonly(false);

    equal(datetimepicker.element.attr("readonly"), undefined);
});

test("readonly() removes disabled attribute and disabled class", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.enable(false);
    datetimepicker.readonly();

    equal(datetimepicker.element.attr("readonly"), "readonly");
    equal(datetimepicker.element.attr("disabled"), undefined);
    ok(datetimepicker._inputWrapper.hasClass("k-state-default"));
    ok(!datetimepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("enable(false) removes readonly attribute and default class", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();
    datetimepicker.enable(false);

    equal(datetimepicker.element.attr("readonly"), undefined);
    equal(datetimepicker.element.attr("disabled"), "disabled");
    ok(!datetimepicker._inputWrapper.hasClass("k-state-default"));
    ok(datetimepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("enable() enables widget after readonly()", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.readonly();
    datetimepicker.enable();

    equal(datetimepicker.element.attr("readonly"), undefined);
    equal(datetimepicker.element.attr("disabled"), undefined);
    ok(datetimepicker._inputWrapper.hasClass("k-state-default"));
    ok(!datetimepicker._inputWrapper.hasClass("k-state-disabled"));
});

test("min method returns min value", function() {
    var value = new Date("10/22/2000"),
    datetimepicker = input.kendoDateTimePicker({min: value}).data("kendoDateTimePicker");

    var result = datetimepicker.min();

    equal(+result, +value);
});

test("min() sets the min value of the datetimepicker", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        value = new Date("10/22/2000");

    datetimepicker.min(value);

    equal(+datetimepicker.options.min, +value);
});

test("min() calls min method of the DateView", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        value = new Date(2000, 10, 10, 10, 10, 0);

    stub(datetimepicker.dateView, { min: datetimepicker.dateView.min });
    stub(datetimepicker.timeView, { refresh: datetimepicker.timeView.refresh });

    datetimepicker.min(value);

    equal(datetimepicker.dateView.calls("min"), 1);
});

test("min method does not set TimeView.options.min", function() {
    var datetimepicker = input.kendoDateTimePicker({
            value: new Date(2010, 10, 10)
        }).data("kendoDateTimePicker"),
        min = new Date(2000, 10, 10, 10, 10, 0),
        oldMin = +datetimepicker.options.min;

    datetimepicker.min(min);

    equal(+datetimepicker.timeView.options.min, oldMin);
});

test("max() returns max value", function() {
    var value = new Date("10/22/2000"),
    datetimepicker = input.kendoDateTimePicker({max: value}).data("kendoDateTimePicker");

    var result = datetimepicker.max();

    equal(+result, +value);
});

test("max() sets the max value of the datetimepicker", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        value = new Date("10/22/2000");

    datetimepicker.max(value);

    equal(+datetimepicker.options.max, +value);
});

test("max() calls max methods of DateView", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
        value = new Date(2000, 10, 10, 10, 10, 0);

    stub(datetimepicker.dateView, { max: datetimepicker.dateView.max });

    datetimepicker.max(value);

    equal(datetimepicker.dateView.calls("max"), 1);
});

test("max method does not set TimeView.options.max", function() {
    var datetimepicker = input.kendoDateTimePicker({
            value: new Date(2010, 10, 10)
        }).data("kendoDateTimePicker"),
        max = new Date(2020, 10, 10, 10, 10, 0),
        oldMax = +datetimepicker.options.max;

    datetimepicker.max(max);

    equal(+datetimepicker.timeView.options.max, oldMax);
});

test("change max date shows all hours", function() {
    var datetimepicker = input.kendoDateTimePicker({
            value: new Date(2010, 10, 10),
            max: new Date(2010, 10, 10, 16, 0, 0)
        }).data("kendoDateTimePicker");

    datetimepicker.max(new Date(2011, 11, 11, 16, 0, 0));

    equal(datetimepicker.timeView.ul.children(":last").html(), "11:30 PM");
});

test("max method limits start hours if current value is equal to min", function() {
    var date = new Date(2010, 10, 10, 10);

    var datetimepicker = input.kendoDateTimePicker({
            min: date,
            max: date,
            value: date
        }).data("kendoDateTimePicker");

    var max = new Date(2020, 10, 10, 10, 10, 0);

    datetimepicker.max(max);

    var li = datetimepicker.timeView.ul.find("li");

    equal(li.first().html(), "10:00 AM");
    equal(li.last().html(), "11:30 PM");
});

test("max method rebinds list if min and max are in the same day", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        min: new Date(2010, 10, 10, 10),
        max: new Date(2010, 10, 12, 10),
        value: new Date(2010, 10, 10)
    });

    datetimepicker.max(new Date(2010, 10, 10, 11));

    var li = datetimepicker.timeView.ul.find("li");

    equal(li.length, 3);
    equal(li.first().html(), "10:00 AM");
    equal(li.last().html(), "11:00 AM");
});

test("min method shows all hours in timeView if not edge date", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    datetimepicker.min(new Date(2000, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("max method shows only hour from max date if current is edge", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    datetimepicker.max(new Date(2010, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children().length, 1);
    equal(ul.children(":first").html(), "12:00 AM");
});

test("min method rebinds timeView to honor min value if current value is min", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    datetimepicker.min(new Date(2010, 10, 10, 10, 0, 0));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "10:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("max method rebinds timeView to honor max value if current value is max", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    datetimepicker.max(new Date(2010, 10, 10, 10, 0, 0));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "10:00 AM");
});

test("min method shows all hours if current value is null", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input);

    datetimepicker.min(new Date(2000, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("value method do not rebind timeView if date is not edge", function () {
    var datetimepicker = new kendo.ui.DateTimePicker(input);

    datetimepicker.value(new Date(2000, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children().length, 0);
});

test("value method rebinds timeView if current is equal to min", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10),
        min: new Date(2000, 10, 10)
    });

    datetimepicker.value(new Date(2000, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("value method rebinds timeView if current is equal to max", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        max: new Date(2010, 10, 10, 20, 0, 0)
    });

    datetimepicker.value(new Date(2010, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "8:00 PM");
});

test("value method shows only one hour when max is midnight", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2000, 10, 10),
        max: new Date(2010, 10, 10)
    });

    datetimepicker.value(new Date(2010, 10, 10));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children().length, 1);
    equal(ul.children(":first").html(), "12:00 AM");
});

test("value method shows all hours when set diff then edge", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10),
        max: new Date(2010, 10, 10)
    });

    var ul = datetimepicker.timeView.ul;

    equal(ul.children().length, 1);
    equal(ul.children(":first").html(), "12:00 AM");

    //set value
    datetimepicker.value(new Date(2000, 10, 10));

    ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("value method do nothing if set to same value as current", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    stub(datetimepicker.timeView, "value");

    datetimepicker.value(new Date(2010, 10, 10));

    equal(datetimepicker.timeView.calls("value"), 0);
});

test("value method do nothing if argument is null", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10)
    });

    stub(datetimepicker.timeView, "_bind");

    datetimepicker.value(null);

    equal(datetimepicker.timeView.calls("_bind"), 0);
});

test("value method shows only one date if min and max are in same day", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        value: new Date(2010, 10, 10),
        min: new Date(2010, 10, 10),
        max: new Date(2010, 10, 10)
    });

    var ul = datetimepicker.timeView.ul;

    equal(ul.children().length, 1);
    equal(ul.children(":first").html(), "12:00 AM");
});

test("value method should rebind timeView if select min after max was selected", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        min: new Date(2000, 10, 10, 10, 0, 0),
        max: new Date(2010, 10, 10, 20, 0, 0)
    });

    //set value
    datetimepicker.value(new Date(2010, 10, 10, 20, 0, 0));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "12:00 AM");
    equal(ul.children(":last").html(), "8:00 PM");

    //set value
    datetimepicker.value(new Date(2000, 10, 10, 10, 0, 0));

    ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "10:00 AM");
    equal(ul.children(":last").html(), "11:30 PM");
});

test("value method persist min and max range in timeview", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        min: new Date(2000, 10, 10, 10, 0, 0),
        max: new Date(2000, 10, 10, 20, 0, 0)
    });

    //set value
    datetimepicker.value(new Date(2000, 10, 10, 12, 0, 0));

    var ul = datetimepicker.timeView.ul;

    equal(ul.children(":first").html(), "10:00 AM");
    equal(ul.children(":last").html(), "8:00 PM");
});

test("value method updates input element when select max date", function() {
    var datetimepicker = new kendo.ui.DateTimePicker(input, {
        max: new Date(2000, 9, 10)
    });

    datetimepicker.value(new Date(2000, 9, 10));

    equal(datetimepicker.element.val(), "10/10/2000 12:00 AM");
});

test("value method restricts time of the value if it's date part is equal to min", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        datepicker = input.kendoDateTimePicker({
            min: today,
            value: today
        }).data("kendoDateTimePicker");

    datepicker.value(midnight);

    notEqual(datepicker._value, null);
    equal(+datepicker._value, +today);
});

test("value method restricts time of the value if it's date part is equal to max", function() {
    var today = new Date(),
        midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        datepicker = input.kendoDateTimePicker({
            max: today,
            value: today
        }).data("kendoDateTimePicker");

    datepicker.value(midnight);

    notEqual(datepicker._value, null);
    equal(+datepicker._value, +midnight);
});

test("value method does not show text representation of invalid value", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.value("invalid");

    equal(datetimepicker.value(), null);
    equal(input.val(), "");
});

test("value method can set 1/1/1970", function() {
    var date = new Date(1970, 0, 1);
    var hours = (date.getTimezoneOffset() / 60) * -1;
    var minutes = hours % 1;
    if (minutes) {
        minutes = 60 * minutes;
    }
    date.setHours(hours, minutes, 0);

    datepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datepicker.value(date);

    deepEqual(datepicker.dateView._value, date);
});

test("setOptions method sets correct timeView min/max values", function() {
    var date = new Date(2013, 10, 10, 1, 30);
    var min = new Date(2013, 10, 9, 23, 30);

    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

    datetimepicker.value(date);

    datetimepicker.setOptions({
        min: min
    });

    deepEqual(datetimepicker.timeView.options.min, new Date(1800, 0, 1));
});

test("setOptions rebinds time options", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    var timeView = datetimepicker.timeView;

    stub(timeView, {
        bind: timeView.bind
    });

    datetimepicker.setOptions({});

    equal(timeView.calls("bind"), 1);
});

test("setOptions supports dynamically format change", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    var timeView = datetimepicker.timeView;

    datetimepicker.setOptions({
        timeFormat: "HH:mm"
    });

    var first = timeView.ul.children().first();

    equal(first.html(), "00:00");
});

test("setOptions method updates calendar options", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    datetimepicker.open();

    datetimepicker.setOptions({
        start: "year",
        depth: "year"
    });

    equal(datetimepicker.dateView.calendar.view().name, "year");
});

test("setOptions method updates format", function() {
    var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
    datetimepicker.open();
    datetimepicker.value(new Date(2013, 10, 10));

    datetimepicker.setOptions({
        format: "dd/MM/yyyy"
    });

    equal(datetimepicker.element.val(), kendo.toString(datetimepicker.value(), "dd/MM/yyyy"));
});

test("setOptions preserves options.dates", 1, function() {
    var datetimepicker = new DateTimePicker(input, {
        dates: [new Date()]
    });

    datetimepicker.setOptions({
        footer: false
    });

    equal(datetimepicker.options.dates.length, 1);
});

test("setOptions updates options.dates", 1, function() {
    var datetimepicker = new DateTimePicker(input, {
        dates: [new Date()]
    });

    datetimepicker.setOptions({
        dates: [new Date(), new Date()]
    });

    equal(datetimepicker.options.dates.length, 2);
});

})();
