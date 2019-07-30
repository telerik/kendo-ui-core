(function() {
    var TimeView = kendo.TimeView,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    function getToday() {
        var today = new Date();
        today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        return today;
    }

    describe("kendo.ui.TimePicker API", function() {
        beforeEach(function() {

            input = $("<input />").appendTo(Mocha.fixture);
        });

        afterEach(function() {

            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
        });

        it("open TimeView", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30
            });

            tv.open();

            assert.isOk(tv.popup.element.is(":visible"));
            tv.destroy();
        });

        it("close TimeView", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30
            });

            tv.open();
            tv.close();

            assert.isOk(!tv.popup.element.is(":visible"));
            tv.destroy();
        });

        it("select() method should select li", function() {
            var tv = new TimeView({
                anchor: input,
                format: "hh:mm tt",
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30
            });

            tv.refresh();

            tv.select("10:00 AM");

            assert.equal(tv.ul.find("li.k-state-selected").length, 1);
            assert.equal(tv.ul.find("li.k-state-selected").html(), "10:00 AM");
            tv.destroy();
        });

        it("click() select li and set date", function() {
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

            tv._click({ currentTarget: li[0], isDefaultPrevented: function() { return false; } });

            assert.equal(tv.ul.find("li.k-state-selected")[0], li[0]);
            tv.destroy();
        });

        it("current() should persist current selected LI", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30
            });

            tv.refresh();

            assert.equal(tv.current(), undefined);

            tv.current(tv.ul.find("li:first"));

            assert.equal(tv.ul.find("li.k-state-selected").length, 1);
            assert.equal(tv.current().index(), tv.ul.find("li.k-state-selected").index());
            tv.destroy();
        });

        it("refresh() should render li items", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                format: "hh:mm tt",
                interval: 30
            });

            tv.refresh();

            assert.isOk(tv.ul.find("li").length > 0);
            tv.destroy();
        });

        it("refresh() should render all hours in a day", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                format: "hh:mm tt",
                interval: 30
            });

            tv.refresh();

            assert.equal(tv.ul.find("li").length, 48);
            assert.equal(tv.ul.find("li:first").html(), "12:00 AM");
            assert.equal(tv.ul.find("li:last").html(), "11:30 PM");
            tv.destroy();
        });

        it("refresh() should render 5 hours only", function() {
            var tv = new TimeView({
                anchor: input,
                min: new Date(10, 10, 10, 10, 0, 0),
                max: new Date(10, 10, 10, 12, 0, 0),
                format: "hh:mm tt",
                interval: 30
            });

            tv.refresh();

            assert.equal(tv.ul.find("li").length, 5);
            assert.equal(tv.ul.find("li:first").html(), "10:00 AM");
            assert.equal(tv.ul.find("li:last").html(), "12:00 PM");
            tv.destroy();
        });

        it("refresh() should honor min and max", function() {
            var tv = new TimeView({
                anchor: input,
                min: new Date(10, 10, 10, 10, 10, 0),
                max: new Date(10, 10, 10, 11, 50, 0),
                format: "hh:mm tt",
                interval: 30
            });

            tv.refresh();

            assert.equal(tv.ul.find("li").length, 5);
            assert.equal(tv.ul.find("li:first").html(), "10:10 AM");
            assert.equal(tv.ul.find("li:last").html(), "11:50 AM");
            tv.destroy();
        });

        it("refresh() should select li if _value", function() {
            var tv = new TimeView({
                anchor: input,
                min: new Date(10, 10, 10, 10, 10, 0),
                max: new Date(10, 10, 10, 11, 50, 0),
                format: "hh:mm tt",
                interval: 30
            });

            tv._value = "11:50 AM";

            tv.refresh();

            assert.isOk(tv.ul.find("li:last").hasClass("k-state-selected"));
            tv.destroy();
        });


        it("toggle should toggel popup", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                format: "hh:mm tt"
            });

            tv.toggle();

            assert.isOk(tv.popup.visible());
            assert.isOk(tv.ul.children()[0]);
            tv.destroy();
        });

        it("value should only set _value if not LIs", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                format: "hh:mm tt"
            });

            tv.value("2:00 PM");

            assert.isOk(tv._value, "2:00 PM");
            assert.isOk(!tv.ul.children()[0]);
            tv.destroy();
        });

        it("value should select li", function() {
            var tv = new TimeView({
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT,
                interval: 30,
                format: "h:mm tt"
            });

            tv.refresh();
            tv.value("2:00 PM");

            assert.isOk(tv._value, "2:00 PM");
            assert.isOk(tv.ul.children(".k-state-selected")[0]);
            tv.destroy();
        });

        //timepicker
        it("enable(false) should disable widget", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.enable(false);

            assert.isOk(input.attr("disabled"), "disabled");
            assert.isOk(timepicker._inputWrapper.hasClass("k-state-disabled"));
            assert.isOk(!timepicker._inputWrapper.hasClass("k-state-default"));
        });

        it("enable(false) should unbind icon click", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.enable(false);

            timepicker.wrapper.find(".k-select").click();

            assert.isOk(!timepicker.timeView.popup.visible());
        });

        it("enable(true) should enable widget", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.enable(false);
            timepicker.enable();

            assert.isOk(!input.attr("disabled"));
            assert.isOk(timepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!timepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable(true) should bind icon click", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.enable(true);

            timepicker._arrow.click();

            assert.isOk(timepicker.timeView.popup.visible());
        });

        it("readonly() makes  input element readonly", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.readonly();

            assert.equal(timepicker.element.attr("readonly"), "readonly");
        });

        it("readonly() unbinds icon click", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.readonly();

            stub(timepicker.timeView, { toggle: timepicker.timeView.toggle });

            timepicker.wrapper.find(".k-select").click();

            assert.isOk(!timepicker.timeView.popup.visible());
        });

        it("readonly(false) removes readonly attribute", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.readonly();
            timepicker.readonly(false);

            assert.equal(timepicker.element.attr("readonly"), undefined);
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.enable(false);
            timepicker.readonly();

            assert.equal(timepicker.element.attr("readonly"), "readonly");
            assert.equal(timepicker.element.attr("disabled"), undefined);
            assert.isOk(timepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!timepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable(false) removes readonly attribute and default class", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.readonly();
            timepicker.enable(false);

            assert.equal(timepicker.element.attr("readonly"), undefined);
            assert.equal(timepicker.element.attr("disabled"), "disabled");
            assert.isOk(!timepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(timepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable() enables widget after readonly()", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.readonly();
            timepicker.enable();

            assert.equal(timepicker.element.attr("readonly"), undefined);
            assert.equal(timepicker.element.attr("disabled"), undefined);
            assert.isOk(timepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!timepicker._inputWrapper.hasClass("k-state-disabled"));
        });


        it("open() should open timeview", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");
            timepicker.open();

            assert.isOk(timepicker.timeView.popup.visible());
        });

        it("close() should close timeview", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");
            timepicker.open();
            timepicker.close();

            assert.isOk(!timepicker.timeView.popup.visible());
        });

        it("value() method should set the _value and input.val()", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
                today = getToday();

            today.setHours(14);

            timepicker.value("2:00 PM");

            assert.equal(input.val(), "2:00 PM");
            assert.equal(+timepicker.value(), +today);
        });

        it("value() persist year of the current value", function() {
            var value = new Date(2000, 10, 10),
                timepicker = input.kendoTimePicker({
                    value: value
                }).data("kendoTimePicker");

            timepicker.value("3:23 PM");
            value.setHours(15);
            value.setMinutes(23);

            assert.equal(input.val(), "3:23 PM");
            assert.equal(+timepicker.value(), +value);

        });

        it("value() selects li item", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.timeView.refresh();
            timepicker.value(new Date(2000, 10, 10, 14, 30, 0));

            assert.equal(input.val(), "2:30 PM");
            assert.equal(timepicker.timeView.ul.find(".k-state-selected").text(), "2:30 PM");
        });

        it("value() should honor min/max range", function() {
            var timepicker = input.kendoTimePicker({
                min: new Date(2000, 10, 10, 10, 0, 0),
                max: new Date(2000, 10, 10, 18, 0, 0)
            }).data("kendoTimePicker");

            timepicker.value("8:00 AM");

            assert.equal(timepicker.value(), null);
        });

        it("value() should honor min/max range when min > max", function() {
            var timepicker = input.kendoTimePicker({
                min: new Date(2000, 10, 10, 18, 0, 0),
                max: new Date(2000, 10, 10, 10, 0, 0)
            }).data("kendoTimePicker");

            timepicker.value("11:00 AM");

            assert.equal(timepicker.value(), null);
        });

        it("value method parses passed value using options.parseFormats", function() {
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

            assert.equal(+timepicker._value, +date);
        });

        it("min() should return min value of the timepicker", function() {
            var date = new Date(2000, 10, 10, 18, 0, 0),
                timepicker = input.kendoTimePicker({
                    min: date,
                    max: new Date(2000, 10, 10, 10, 0, 0)
                }).data("kendoTimePicker");

            assert.equal(+timepicker.min(), +date);
        });

        it("min() should set options.min and refresh timeView", function() {
            var date = new Date(2000, 10, 10, 18, 0, 0),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.min(date);

            assert.equal(+timepicker.min(), +date);
            assert.equal(+timepicker.timeView.options.min, +date);
            assert.equal(timepicker.timeView.ul.find("li:first").text(), "6:00 PM");
        });

        it("min method parses passed value using options.parseFormats", function() {
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

            assert.equal(+timepicker.options.min, +date);
        });

        it("max() should return max value of the timepicker", function() {
            var date = new Date(2000, 10, 10, 18, 0, 0),
                timepicker = input.kendoTimePicker({
                    min: new Date(2000, 10, 10, 10, 0, 0),
                    max: date
                }).data("kendoTimePicker");

            assert.equal(+timepicker.max(), +date);
        });

        it("max() should set options.max and refresh timeView", function() {
            var date = new Date(2000, 10, 10, 18, 0, 0),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.max(date);

            assert.equal(+timepicker.max(), +date);
            assert.equal(+timepicker.timeView.options.max, +date);
            assert.equal(timepicker.timeView.ul.find("li:last").text(), "6:00 PM");
        });

        it("dataBind method binds the TimeView to list of Dates", function() {
            var date = new Date(2000, 10, 10, 18, 0, 0),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.dataBind([date]);

            assert.equal(timepicker.timeView.ul.children().length, 1);
            assert.equal(timepicker.timeView.ul.children().text(), "6:00 PM");
        });

        it("dataBind method strips dates out of the min/max range", function() {
            var timepicker = input.kendoTimePicker({
                min: new Date(1900, 10, 10, 20, 0, 0),
                max: new Date(2000, 10, 10, 8, 0, 0)
            }).data("kendoTimePicker");

            timepicker.dataBind([
                new Date(2000, 10, 10, 8, 30, 0),
                new Date(2000, 10, 10, 7, 59, 0),
                new Date(2000, 10, 10, 20, 1, 0)
            ]);

            assert.equal(timepicker.timeView.ul.children().length, 2);
            assert.equal(timepicker.timeView.ul.children(":first").text(), "7:59 AM");
        });

        it("value method does not show text representation of invalid value", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.value("invalid");

            assert.equal(timepicker.value(), null);
            assert.equal(input.val(), "");
        });

        it("setOptions rebinds time options", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");
            var timeView = timepicker.timeView;

            stub(timeView, {
                bind: timeView.bind
            });

            timepicker.setOptions({});

            assert.equal(timeView.calls("bind"), 1);
        });

        it("setOptions supports dynamically format change", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");
            var timeView = timepicker.timeView;

            timepicker.setOptions({
                format: "HH:mm"
            });

            var first = timeView.ul.children().first();

            assert.equal(first.html(), "00:00");
        });

        it("setOptions method updates format", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.value(new Date(2013, 10, 10, 0));

            timepicker.setOptions({
                format: "HH:mm"
            });

            assert.equal(timepicker.element.val(), "00:00");
        });

        it("widget returns value according to date array", function() {
            var timepicker = input.kendoTimePicker({
                dates: [
                    new Date(2000, 10, 10, 10, 0, 0)
                ]
            }).data("kendoTimePicker");
            timepicker.timeView.bind();
            var currentTarget = timepicker.timeView.ul.find("li").first();
            currentTarget.click();
            assert.equal(timepicker.options.dates[0], timepicker.value());
        });

        it("refresh() should not render items which belong to another date", function () {
            timepicker = input.kendoTimePicker({
                min: new Date(2000, 1, 1, 18, 0, 0),
                max: new Date(2000, 1, 2, 17, 0, 0)
            }).data("kendoTimePicker");

            timepicker.timeView.refresh();

            assert.equal(timepicker.timeView.ul.find('li').length, 12);
        });
    });
}());
