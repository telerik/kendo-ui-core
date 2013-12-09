(function() {

    var TimeView = kendo.TimeView,
        keys = kendo.keys,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    module("kendo.ui.TimePicker Navigation", {
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

    test("move should select first item", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.open();
        tv.move({keyCode: keys.DOWN, preventDefault: $.noop});

        equal(tv.ul.find("li.k-state-selected").index(), 0);
        tv.destroy();
    });

    test("move should select last item", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.open();
        tv.move({keyCode: keys.UP, preventDefault: $.noop});

        equal(tv.ul.find("li.k-state-selected").index(), tv.ul.find("li").length - 1);
        tv.destroy();
    });

    test("move should select next item", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.open();
        tv.current(tv.ul[0].firstChild);

        tv.move({keyCode: keys.DOWN, preventDefault: $.noop});

        equal(tv.ul.find("li.k-state-selected").index(), 1);
        tv.destroy();
    });

    test("move should select previous item", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.open();
        tv.current(tv.ul.children().eq(1));

        tv.move({keyCode: keys.UP, preventDefault: $.noop});

        equal(tv.ul.find("li.k-state-selected").index(), 0);
        tv.destroy();
    });

    test("move should not raise error", function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            change: $.noop
        });

        tv.open();
        tv._current = $(tv.ul.children(":first"));
        tv.move({keyCode: keys.UP, preventDefault: $.noop});

        ok(true);
        tv.destroy();
    });

    test("move should call change handler", 1, function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            format: "hh:mm tt",
            change: function(value) {
                equal(value, "12:00 AM");
            }
        });

        tv.open();

        tv.current(tv.ul.children().eq(1));

        tv.move({keyCode: keys.UP, preventDefault: $.noop});
        tv.destroy();
    });

    test("click item should call change handler", 1, function() {
        var tv = new TimeView({
            anchor: input,
            min: MIDNIGHT,
            max: MIDNIGHT,
            interval: 30,
            format: "hh:mm tt",
            change: function(value) {
                equal(value, "12:00 AM");
            }
        });

        tv.open();
        tv.ul.children().eq(0).click();
        tv.destroy();
    });

    test("click item should close popup", function() {
        var tv = new TimeView({
            min: MIDNIGHT,
            anchor: input,
            max: MIDNIGHT,
            interval: 30,
            format: "hh:mm tt",
            change: $.noop
        });

        tv.open();
        var li = tv.ul.children().eq(0);
        tv.select(li);

        li.click();

        ok(!tv.popup.visible());
        tv.destroy();
    });

    //timepicker
    test("press down arrow should select next li and update value", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();
        input.focus().trigger({ type: "keydown", keyCode: keys.DOWN});

        ok(timepicker.timeView._current);
        equal(timepicker.timeView._current.index(), 0);
        equal(input.val(), "12:00 AM");
    });

    test("click arrow should call _click", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker._arrow.click();

        equal(document.activeElement, input[0]);
    });

    test("tabbing out should update timeView", 1, function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();

        input.focus().val("2:00 PM").blur();

        equal(timepicker.timeView.ul.find("li.k-state-selected").text(), "2:00 PM");
    });

    test("should clear selected item if no such time", 2, function() {
        var timepicker = input.kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0)
        }).data("kendoTimePicker");

        timepicker.open();

        ok(timepicker.timeView.ul.find("li.k-state-selected")[0]);

        input.focus().val("2:33 PM").blur();

        ok(!timepicker.timeView.ul.find("li.k-state-selected")[0]);
    });

    test("do not clear input if not valid time", function() {
        var timepicker = input.kendoTimePicker({
            value: new Date(2000, 10, 10, 10, 0, 0)
        }).data("kendoTimePicker");

        timepicker.open();

        input.focus().val("invalid").blur();

        ok(!timepicker.timeView.ul.find("li.k-state-selected")[0]);
        equal(timepicker._value, null);
        equal(input.val(), "invalid");
    });

    test("Enter should update value of the timepicker", function() {
        var date = new Date(2000, 10, 10),
            timepicker = input.kendoTimePicker({
                value: date
            }).data("kendoTimePicker");

        input.val("12:22 PM").trigger({type: "keydown", keyCode: keys.ENTER});

        date.setHours(12);
        date.setMinutes(22);

        equal(+timepicker.value(), +date);
    });

    asyncTest("press enter should call preventDefault when popup is visible", 1, function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();

        timepicker.element.focus().trigger({
            type: "keydown",
            keyCode: keys.ENTER,
            preventDefault: function() {
                ok(true);
                start();
            }
        });
    });

    test("select time with enter clear selection", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();
        input.trigger({type: "keydown", keyCode: keys.DOWN});
        input.trigger({type: "keydown", keyCode: keys.ENTER});

        timepicker.open();

        ok(timepicker.timeView.current().hasClass("k-state-selected"));
    });

    test("TimePicker does not update the input if the entered value is the same but in diff format", function() {
        var timepicker = input.kendoTimePicker({
                format: "hh:mm tt",
                parseFormats: ["yyyy/MM/dd"],
                value: "12:00 AM"
            }).data("kendoTimePicker");

        input.val("2000/10/10");

        //simulate change
        timepicker._change(input.val());

        equal(input.val(), "12:00 AM");
    });

    test("TimePicker does not call change on blur if no text change", function() {
        var date = new Date(1919, 0, 1, 14, 0, 0),
            timepicker = input.kendoTimePicker({
                format: "hh",
                value: new Date(date)
            }).data("kendoTimePicker");

        timepicker.options.parseFormats = ["hh:mm tt", "hh"];

        //simulate change
        input.focus().blur();

        equal(+timepicker.value(), +date);
    });

    test("TimePicker does not call change on ENTER if no text change", function() {
        var date = new Date(1919, 0, 1, 14, 0, 0),
            timepicker = input.kendoTimePicker({
                format: "hh",
                value: new Date(date)
            }).data("kendoTimePicker");

        timepicker.options.parseFormats = ["hh:mm tt", "hh"];

        //simulate change
        input.focus().trigger({
            type: "keydown",
            keyCode: kendo.keys.ENTER
        });

        equal(+timepicker.value(), +date);
    });

})();
