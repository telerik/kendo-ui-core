(function() {
    var TimeView = kendo.TimeView,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    function getToday() {
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        return today;
    }

    module("kendo.ui.TimePicker API", {
        setup: function() {
            kendo.effects.disable();
            input = $("<input />").appendTo(QUnit.fixture);
        },

        teardown: function() {
            kendo.effects.enable();
            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
        }
    });

    test("open TimeView", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30
        });

        tv.open();

        ok(tv.popup.element.is(":visible"));
        tv.destroy();
    });

    test("close TimeView", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30
        });

        tv.open();
        tv.close();

        ok(!tv.popup.element.is(":visible"));
        tv.destroy();
    });

    test("select() method should select li", function() {
        var tv = new TimeView({
            anchor: input,
            format: "hh:mm tt",
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30
        });

        tv.refresh();

        tv.select("10:00 AM");

        equal(tv.ul.find("li.k-state-selected").length, 1);
        equal(tv.ul.find("li.k-state-selected").html(), "10:00 AM");
        tv.destroy();
    });

    test("click() select li and set date", function() {
        var tv = new TimeView({
            anchor: input,
            format: "h:mm tt",
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.refresh();

        var li = tv.ul.find("li")
                   .filter(function() {
                       return $(this).text() == "2:00 PM";
                   });

        tv._click({ currentTarget: li[0], isDefaultPrevented: function () { return false; } });

        equal(tv.ul.find("li.k-state-selected")[0], li[0]);
        tv.destroy();
    });

    test("current() should persist current selected LI", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30
        });

        tv.refresh();

        equal(tv.current(), undefined);

        tv.current(tv.ul.find("li:first"));

        equal(tv.ul.find("li.k-state-selected").length, 1);
        equal(tv.current().index(), tv.ul.find("li.k-state-selected").index());
        tv.destroy();
    });

    test("refresh() should render li items", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            format: "hh:mm tt",
            interval: 30
        });

        tv.refresh();

        ok(tv.ul.find("li").length > 0);
        tv.destroy();
    });

    test("refresh() should render all hours in a day", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            format: "hh:mm tt",
            interval: 30
        });

        tv.refresh();

        equal(tv.ul.find("li").length, 48);
        equal(tv.ul.find("li:first").html(), "12:00 AM");
        equal(tv.ul.find("li:last").html(), "11:30 PM");
        tv.destroy();
    });

    test("refresh() should render 5 hours only", function() {
        var tv = new TimeView({
            anchor: input,
            min: new Date(10, 10, 10, 10, 0, 0),
            max: new Date(10, 10, 10, 12, 0, 0),
            format: "hh:mm tt",
            interval: 30
        });

        tv.refresh();

        equal(tv.ul.find("li").length, 5);
        equal(tv.ul.find("li:first").html(), "10:00 AM");
        equal(tv.ul.find("li:last").html(), "12:00 PM");
        tv.destroy();
    });

    test("refresh() should honor min and max", function() {
        var tv = new TimeView({
            anchor: input,
            min: new Date(10, 10, 10, 10, 10, 0),
            max: new Date(10, 10, 10, 11, 50, 0),
            format: "hh:mm tt",
            interval: 30
        });

        tv.refresh();

        equal(tv.ul.find("li").length, 5);
        equal(tv.ul.find("li:first").html(), "10:10 AM");
        equal(tv.ul.find("li:last").html(), "11:50 AM");
        tv.destroy();
    });

    test("refresh() should select li if _value", function() {
        var tv = new TimeView({
            anchor: input,
            min: new Date(10, 10, 10, 10, 10, 0),
            max: new Date(10, 10, 10, 11, 50, 0),
            format: "hh:mm tt",
            interval: 30
        });

        tv._value = "11:50 AM";

        tv.refresh();

        ok(tv.ul.find("li:last").hasClass("k-state-selected"));
        tv.destroy();
    });


    test("toggle should toggel popup", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            format: "hh:mm tt"
        });

        tv.toggle();

        ok(tv.popup.visible());
        ok(tv.ul.children()[0]);
        tv.destroy();
    });

    test("value should only set _value if not LIs", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            format: "hh:mm tt"
        });

        tv.value("2:00 PM");

        ok(tv._value, "2:00 PM");
        ok(!tv.ul.children()[0]);
        tv.destroy();
    });

    test("value should select li", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            format: "h:mm tt"
        });

        tv.refresh();
        tv.value("2:00 PM");

        ok(tv._value, "2:00 PM");
        ok(tv.ul.children(".k-state-selected")[0]);
        tv.destroy();
    });

    //timepicker
    test("enable(false) should disable widget", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.enable(false);

        ok(input.attr("disabled"), "disabled");
        ok(timepicker._inputWrapper.hasClass("k-state-disabled"));
        ok(!timepicker._inputWrapper.hasClass("k-state-default"));
    });

    test("enable(false) should unbind icon click", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.enable(false);

        timepicker.wrapper.find(".k-select").click();

        ok(!timepicker.timeView.popup.visible());
    });

    test("enable(true) should enable widget", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.enable(false);
        timepicker.enable();

        ok(!input.attr("disabled"));
        ok(timepicker._inputWrapper.hasClass("k-state-default"));
        ok(!timepicker._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable(true) should bind icon click", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.enable(true);

        timepicker._arrow.click();

        ok(timepicker.timeView.popup.visible());
    });

    test("readonly() makes  input element readonly", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.readonly();

        equal(timepicker.element.attr("readonly"), "readonly");
    });

    test("readonly() unbinds icon click", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.readonly();

        stub(timepicker.timeView, {toggle: timepicker.timeView.toggle});

        timepicker.wrapper.find(".k-select").click();

        ok(!timepicker.timeView.popup.visible());
    });

    test("readonly(false) removes readonly attribute", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.readonly();
        timepicker.readonly(false);

        equal(timepicker.element.attr("readonly"), undefined);
    });

    test("readonly() removes disabled attribute and disabled class", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.enable(false);
        timepicker.readonly();

        equal(timepicker.element.attr("readonly"), "readonly");
        equal(timepicker.element.attr("disabled"), undefined);
        ok(timepicker._inputWrapper.hasClass("k-state-default"));
        ok(!timepicker._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable(false) removes readonly attribute and default class", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.readonly();
        timepicker.enable(false);

        equal(timepicker.element.attr("readonly"), undefined);
        equal(timepicker.element.attr("disabled"), "disabled");
        ok(!timepicker._inputWrapper.hasClass("k-state-default"));
        ok(timepicker._inputWrapper.hasClass("k-state-disabled"));
    });

    test("enable() enables widget after readonly()", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.readonly();
        timepicker.enable();

        equal(timepicker.element.attr("readonly"), undefined);
        equal(timepicker.element.attr("disabled"), undefined);
        ok(timepicker._inputWrapper.hasClass("k-state-default"));
        ok(!timepicker._inputWrapper.hasClass("k-state-disabled"));
    });


    test("open() should open timeview", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");
        timepicker.open();

        ok(timepicker.timeView.popup.visible());
    });

    test("close() should close timeview", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");
        timepicker.open();
        timepicker.close();

        ok(!timepicker.timeView.popup.visible());
    });

    test("value() method should set the _value and input.val()", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
            today = getToday();

        today.setHours(14);

        timepicker.value("2:00 PM");

        equal(input.val(), "2:00 PM");
        equal(+timepicker.value(), +today);
    });

    test("value() persist year of the current value", function() {
        var value = new Date(2000, 10, 10),
            timepicker = input.kendoTimePicker({
                value: value
            }).data("kendoTimePicker");

        timepicker.value("3:23 PM");
        value.setHours(15);
        value.setMinutes(23);

        equal(input.val(), "3:23 PM");
        equal(+timepicker.value(), +value);

    });

    test("value() selects li item", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.timeView.refresh();
        timepicker.value(new Date(2000, 10, 10, 14, 30, 0));

        equal(input.val(), "2:30 PM");
        equal(timepicker.timeView.ul.find(".k-state-selected").text(), "2:30 PM");
    });

    test("value() should honor min/max range", function() {
        var timepicker = input.kendoTimePicker({
            min: new Date(2000, 10, 10, 10, 0, 0),
            max: new Date(2000, 10, 10, 18, 0, 0)
        }).data("kendoTimePicker");

        timepicker.value("8:00 AM");

        equal(timepicker.value(), null);
    });

    test("value() should honor min/max range when min > max", function() {
        var timepicker = input.kendoTimePicker({
            min: new Date(2000, 10, 10, 18, 0, 0),
            max: new Date(2000, 10, 10, 10, 0, 0)
        }).data("kendoTimePicker");

        timepicker.value("11:00 AM");

        equal(timepicker.value(), null);
    });

    test("value method parses passed value using options.parseFormats", function() {
        var timepicker = input.kendoTimePicker({
                parseFormats: ["HH:mm"],
            }).data("kendoTimePicker"),
            date = new Date(),
            dateString;

        date.setHours(18);
        date.setMinutes(18);

        date.setSeconds(0);
        date.setMilliseconds(0);

        dateString = kendo.toString(date, "HH:mm");

        timepicker.value(dateString);

        equal(+timepicker._value, +date);
    });

    test("min() should return min value of the timepicker", function() {
        var date = new Date(2000, 10, 10, 18, 0, 0),
            timepicker = input.kendoTimePicker({
                min: date,
                max: new Date(2000, 10, 10, 10, 0, 0)
            }).data("kendoTimePicker");

        equal(+timepicker.min(), +date);
    });

    test("min() should set options.min and refresh timeView", function() {
        var date = new Date(2000, 10, 10, 18, 0, 0),
            timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.min(date);

        equal(+timepicker.min(), +date);
        equal(+timepicker.timeView.options.min, +date);
        equal(timepicker.timeView.ul.find("li:first").text(), "6:00 PM");
    });

    test("min method parses passed value using options.parseFormats", function() {
        var timepicker = input.kendoTimePicker({
                parseFormats: ["HH:mm"],
            }).data("kendoTimePicker"),
            date = new Date(),
            dateString;

        date.setHours(18);
        date.setMinutes(18);

        date.setSeconds(0);
        date.setMilliseconds(0);

        dateString = kendo.toString(date, "HH:mm");

        timepicker.min(dateString);

        equal(+timepicker.options.min, +date);
    });

    test("max() should return max value of the timepicker", function() {
        var date = new Date(2000, 10, 10, 18, 0, 0),
            timepicker = input.kendoTimePicker({
                min: new Date(2000, 10, 10, 10, 0, 0),
                max: date
            }).data("kendoTimePicker");

        equal(+timepicker.max(), +date);
    });

    test("max() should set options.max and refresh timeView", function() {
        var date = new Date(2000, 10, 10, 18, 0, 0),
            timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.max(date);

        equal(+timepicker.max(), +date);
        equal(+timepicker.timeView.options.max, +date);
        equal(timepicker.timeView.ul.find("li:last").text(), "6:00 PM");
    });

    test("dataBind method binds the TimeView to list of Dates", function() {
        var date = new Date(2000, 10, 10, 18, 0, 0),
            timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.dataBind([date]);

        equal(timepicker.timeView.ul.children().length, 1);
        equal(timepicker.timeView.ul.children().text(), "6:00 PM");
    });

    test("dataBind method strips dates out of the min/max range", function() {
        var timepicker = input.kendoTimePicker({
            min: new Date(1900, 10, 10, 20, 0, 0),
            max: new Date(2000, 10, 10, 8, 0, 0)
        }).data("kendoTimePicker");

        timepicker.dataBind([
            new Date(2000, 10, 10, 8, 30, 0),
            new Date(2000, 10, 10, 7, 59, 0),
            new Date(2000, 10, 10, 20, 1, 0)
        ]);

        equal(timepicker.timeView.ul.children().length, 2);
        equal(timepicker.timeView.ul.children(":first").text(), "7:59 AM");
    });

    test("value method does not show text representation of invalid value", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.value("invalid");

        equal(timepicker.value(), null);
        equal(input.val(), "");
    });

    test("setOptions rebinds time options", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");
        var timeView = timepicker.timeView;

        stub(timeView, {
            bind: timeView.bind
        });

        timepicker.setOptions({});

        equal(timeView.calls("bind"), 1);
    });

    test("setOptions supports dynamically format change", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");
        var timeView = timepicker.timeView;

        timepicker.setOptions({
            format: "HH:mm"
        });

        var first = timeView.ul.children().first();

        equal(first.html(), "00:00");
    });

    test("setOptions method updates format", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.value(new Date(2013, 10, 10, 0));

        timepicker.setOptions({
            format: "HH:mm"
        });

        equal(timepicker.element.val(), "00:00");
    });

     test("widget returns value according to date array", function() {
        var timepicker = input.kendoTimePicker({
            dates: [
                 new Date(2000, 10, 10, 10, 0, 0)
            ]
        }).data("kendoTimePicker");
        timepicker.timeView.bind();
        var currentTarget = timepicker.timeView.ul.find("li").first();
        currentTarget.click();
        equal(timepicker.options.dates[0], timepicker.value());
    });
})();
