(function() {
    var TimeView = kendo.TimeView,
        TimePicker = kendo.ui.TimePicker,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    describe("kendo.ui.TimePicker initialization", function() {
        beforeEach(function() {

            this.touch = kendo.support.touch;
            this.mobileOS = kendo.support.mobileOS;
            this.kineticScrollNeeded = kendo.support.kineticScrollNeeded;

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
            kendo.support.touch = this.touch;
            kendo.support.mobileOS = this.mobileOS;
            kendo.support.kineticScrollNeeded = this.kineticScrollNeeded;
        });

        it("TimeView creates popup", function() {
            var tv = new TimeView({
                anchor: input,
                format: "hh:mm tt",
                min: MIDNIGHT,
                max: MIDNIGHT
            });

            assert.isOk(tv.popup);
            assert.isOk(tv.popup.element.is("div"));
            assert.isOk(tv.popup.element.hasClass("k-list-container"));
            assert.isOk(tv.popup.element.hasClass("k-list-scroller"));
            assert.equal(tv.popup.element.attr("unselectable"), "on");
            assert.isOk(tv.popup.element.children(":first").is("ul"));
            assert.isOk(tv.popup.element.children(":first").hasClass("k-list k-reset"));
            assert.equal(tv.popup.options.anchor, input);
            tv.destroy();
        });

        it("TimeView create template function", function() {
            var tv = new TimeView({
                format: "hh:mm tt",
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT
            }),
                date = new Date(2000, 10, 10, 10, 10, 0);

            assert.equal(tv.template(kendo.toString(date, "hh:mm tt")), '<li tabindex="-1" role="option" class="k-item" unselectable="on">' + kendo.toString(date, "hh:mm tt") + '</li>');
            tv.destroy();
        });

        it("TimeView renders last item equal to the MAX time", function() {
            var tv = new TimeView({
                format: "hh:mm tt",
                anchor: input,
                min: new Date(2000, 0, 1, 0, 0, 0),
                max: new Date(2000, 0, 1, 23, 59, 0),
                interval: 15
            });

            tv.refresh();

            assert.equal(tv.ul.find("li:last").html(), "11:59 PM");
            tv.destroy();
        });

        //TimePicker
        it("_wrapper() wraps input element", function() {
            input.css("width", "200");

            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            assert.isOk(input.parent().hasClass("k-picker-wrap k-state-default"));
            assert.isOk(timepicker.wrapper.hasClass("k-widget k-timepicker"));
        });

        it("init() should add k-input to the element", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            assert.isOk(timepicker.element.hasClass("k-input"));
        });

        it("_icon put create picker button", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
                icon = timepicker.wrapper.find(".k-select");

            assert.isOk(icon);
            assert.isOk(icon.is("span"));
            assert.isOk(icon.hasClass("k-select"));
            assert.isOk(icon.children().is("span"));
            assert.isOk(icon.children().hasClass("k-icon k-i-clock"));
            assert.equal(icon.children().html(), "");
        });

        it("timeView is defined", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            assert.isOk(timepicker.timeView);
        });

        it("timeView should has correct options", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
                timeView = timepicker.timeView;

            assert.equal(timeView.options.anchor, timepicker.wrapper);
            assert.equal(timeView.options.min, timepicker.options.min);
            assert.equal(timeView.options.max, timepicker.options.max);
            assert.equal(timeView.options.format, timepicker.options.format);
            assert.equal(timeView.options.interval, timepicker.options.interval);
        });

        it("timepicker wire icon click", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.close();
            timepicker._arrow.click();

            assert.isOk(timepicker.timeView.popup.visible());
        });

        it("form reset support", function(done) {
            input.attr("value", "12:00 AM");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();

            timepicker.value("2:30 PM");

            form[0].reset();

            setTimeout(function() {
                assert.equal(timepicker.element.val(), "12:00 AM");
                assert.equal(timepicker.timeView.current().text(), "12:00 AM");
                done();
            }, 200);
        });

        it("support for form defined by attribute", function(done) {
            input.attr("form", "form1").attr("value", "12:00 AM");

            var form = $("<form id='form1'/>").appendTo(Mocha.fixture),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.open();
            timepicker.value("2:30 PM");

            form[0].reset();

            setTimeout(function() {
                assert.equal(timepicker.element.val(), "12:00 AM");
                assert.equal(timepicker.timeView.current().text(), "12:00 AM");
                done();
            }, 200);
            timepicker.destroy();
        });

        it("extend popup options if timepicker.options.popup", function() {
            var appendTo = "#qunit-fixture",
                timepicker = new kendo.ui.TimePicker(input, {
                    popup: {
                        appendTo: appendTo
                    }
                });

            assert.equal(timepicker.timeView.popup.options.appendTo[0], $(appendTo)[0]);
        });

        it("00:00 option is not duplicated when max value is 23:59 on last day of month", function() {
            var timepicker = input.kendoTimePicker({
                min: new Date(2017, 11, 31, 0, 0),
                max: new Date(2017, 11, 31, 23, 59)
            }).data("kendoTimePicker");

            timepicker._arrow.click();

            var lastItem = timepicker.timeView.list.find("li").last();
            var lastDateTime = kendo.parseDate(lastItem.text());
            var time = lastDateTime.getHours() + ":" + lastDateTime.getMinutes();

            assert.equal(time, "23:59");
        });

        it("timepicker strips format from '{0:format}'", function() {
            var timepicker = new kendo.ui.TimePicker(input, {
                format: "{0:hh:mm}"
            });

            assert.equal(timepicker.options.format, "hh:mm");
        });

        it("TimePicker adds format to the parseFormats array", function() {
            var timepicker = input.kendoTimePicker({
                parseFormats: ["hh:mm"]
            }).data("kendoTimePicker");

            assert.equal(timepicker.options.parseFormats[0], timepicker.options.format);
            assert.equal(timepicker.options.parseFormats[1], "hh:mm");
        });

        it("TimePicker uses options.data instead of auto-generated hours", function() {
            var timepicker = input.kendoTimePicker({
                dates: [new Date(2000, 10, 10, 18, 0, 0)]
            }).data("kendoTimePicker");

            timepicker.open();

            assert.equal(timepicker.timeView.ul.children().length, 1);
            assert.equal(timepicker.timeView.ul.children(":first").text(), "6:00 PM");
        });

        it("TimePicker normilize options depending on the options.culture", function() {
            var timepicker = input.kendoTimePicker({
                culture: "bg-BG"
            }).data("kendoTimePicker");

            assert.equal(timepicker.options.format, kendo.getCulture("bg-BG").calendars.standard.patterns.t);
        });

        it("TimePicker uses options.culture to format hours", function() {
            var value = new Date(2000, 10, 10);
            var timepicker = input.kendoTimePicker({
                culture: "bg-BG",
                value: value
            }).data("kendoTimePicker");

            timepicker.open();

            assert.equal(timepicker.timeView.ul.children(":first").html(), kendo.toString(value, "t", "bg-BG"));
            assert.equal(timepicker.element.val(), kendo.toString(value, "t", "bg-BG"));
        });

        it("TimePicker copies input's className to the wrapper", function() {
            var timepicker = input.addClass("test").kendoTimePicker().data("kendoTimePicker");

            assert.isOk(timepicker.wrapper.hasClass("test"));
        });

        if (!kendo.support.touch) {
            it("TimePicker changes the type of the input", function() {
                input = $("<input type='date'/>").appendTo(Mocha.fixture),
                    timepicker = input.kendoTimePicker().data("kendoTimePicker");

                assert.equal(timepicker.element[0].type, "text");
            });
        }

        it("TimePicker does not set width if list has style.width", function() {
            var timepicker = input.kendoTimePicker().data("kendoTimePicker");

            timepicker.timeView.list.width(400);

            timepicker.open();

            assert.isOk(timepicker.timeView.list.attr("style").indexOf("width: 400px") != -1);
        });


        it("TimePicker honors readonly attribute", function() {
            var timepicker = input.attr("readonly", true).kendoTimePicker().data("kendoTimePicker");

            stub(timepicker.timeView, { toggle: timepicker.timeView.toggle });

            timepicker.wrapper.find(".k-select").click();

            assert.isOk(!timepicker.timeView.popup.visible());
        });

        it("TimePicker uses disabled attr over the readonly", function() {
            var timepicker = input.attr("readonly", true).attr("disabled", true)
                .kendoTimePicker().data("kendoTimePicker");

            assert.equal(input.attr("readonly"), undefined);
        });

        it("TimePicker does not remove input text on initialization if not valid value", function() {
            var timepicker = input.val("test").kendoTimePicker().data("kendoTimePicker");

            assert.equal(timepicker.value(), null);
            assert.equal(input.val(), "test");
        });

        it("TimePicker sets min from min attribute", function() {
            var date = kendo.date.today();
            date.setHours(10, 0, 0);

            input.attr("min", kendo.toString(date, "10:00"));

            var timepicker = new TimePicker(input);

            assert.deepEqual(timepicker.min(), date);
        });

        it("TimePicker sets max from max attribute", function() {
            var date = kendo.date.today();
            date.setHours(20, 0, 0);

            input.attr("max", kendo.toString(date, "20:00"));

            var timepicker = new TimePicker(input);

            assert.deepEqual(timepicker.max(), date);
        });

        it("TimePicker resize height on first open", function() {
            var timepicker = new TimePicker(input, {
                animation: false,
                height: 100
            });

            timepicker.open();

            assert.equal(timepicker.timeView.list.height(), 100)
        });

        it("TimePicker resize height after setOptions", function() {
            var timepicker = new TimePicker(input, {
                animation: false,
                height: 100
            });

            timepicker.open();
            timepicker.close();

            timepicker.setOptions({
                height: 200
            });

            timepicker.open();

            assert.equal(timepicker.timeView.list.height(), 200)
        });

        it("TimePicker is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoTimePicker().data("kendoTimePicker");
            assert.equal(input.attr("disabled"), "disabled");
        });

        it("timepicker max and min values are reset to initial when form is reset", function() {
            $(input).wrap("<form id='form'></form>");
            var timepicker = input.kendoTimePicker({
                min: new Date(2000, 0, 1, 22, 0, 0),
                max: new Date(2000, 0, 2, 22, 0, 0)
            }).data("kendoTimePicker")

            timepicker.setOptions({
                max: new Date(2000, 0, 1, 23, 0, 0)
            });

            $("form")[0].reset();
            assert.deepEqual(timepicker.options.max, new Date(2000, 0, 2, 22, 0, 0));
        });

        it("timepicker scrolls to selected value", function() {
            var timepicker = input.kendoTimePicker({
                value: "10:00 AM"
            }).data("kendoTimePicker")
            timepicker.open();
            var isScrolled = !timepicker.timeView.list[0].scrollTop == 0;
            assert.equal(isScrolled, true)
        });

        it("timepicker renders formatted value even when out of range", function() {
            var value = new Date(2000, 0, 1, 20, 30, 0);

            var timepicker = input.kendoTimePicker({
                value: value,
                min: new Date(2000, 0, 1, 22, 0, 0),
                max: new Date(2000, 0, 1, 23, 0, 0)
            }).data("kendoTimePicker");

            assert.equal(timepicker.value(), null);
            assert.equal(timepicker.element.val(), kendo.toString(value, timepicker.options.format));
        });

        it("Custom min and max values are passed correctly to the DateInput", function() {
            var min = new Date(2000, 0, 1, 22, 0, 0);
            var max = new Date(2000, 0, 1, 23, 0, 0);
            var timepicker = input.kendoTimePicker({
                dateInput: true,
                min: min,
                max: max
            }).data("kendoTimePicker");

            assert.equal(timepicker._dateInput.min(), min);
            assert.equal(timepicker._dateInput.max(), max);
        });

        it("TimeView renders only one option if min is set and no more hours reflect the criteria", function() {
            var tv = new TimeView({
                min: new Date(2018, 3, 11, 23, 50, 0),
                max: new Date(2099, 0, 31, 23, 50, 0),
                value: new Date(2018, 3, 11, 23, 50, 0),
                format: "hh:mm tt",
                interval: 10
            });

            tv.refresh();
            assert.equal(tv.ul.children().length, 1);
            assert.equal(tv.ul.find("li:last").html(), "11:50 PM");
            tv.destroy();
        });
    });
}());
