(function() {

    var DateTimePicker = kendo.ui.DateTimePicker,
        input;

    describe("kendo.ui.DateTimePicker initialization", function() {
        beforeEach(function() {
            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("_wrapper() wraps input element", function() {
            input.css("width", "200");

            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            assert.isOk(input.parent().hasClass("k-picker-wrap k-state-default"));
            assert.isOk(datetimepicker.wrapper.hasClass("k-widget k-datetimepicker"));
        });

        it("DateTimePicker adds k-input class to the element", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            assert.isOk(datetimepicker.element.hasClass("k-input"));
        });

        it("_icons method creates calendar and clock button", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                icons = datetimepicker.wrapper.find(".k-select");

            assert.isOk(icons.is("span"));
            assert.isOk(icons.hasClass("k-select"));

            var date = icons.children().eq(0);
            var time = icons.children().eq(1);

            assert.isOk(date.hasClass("k-link k-link-date"));
            assert.isOk(time.hasClass("k-link k-link-time"));

            assert.isOk(date.attr("aria-label"), datetimepicker.options.dateButtonText);
            assert.isOk(time.attr("aria-label"), datetimepicker.options.timeButtonText);

            assert.isOk(date.children().hasClass("k-icon k-i-calendar"));
            assert.isOk(time.children().hasClass("k-icon k-i-clock"));
        });

        it("DateTimePicker renders last date when navigating", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            datetimepicker.value(new Date(2099, 11, 10, 10, 10, 10));
            datetimepicker.open();
            assert.equal($(".k-link").not(".k-nav-today").last().text(), 31);
        });

        it("DateTimePicker creates DateView", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            assert.isOk(datetimepicker.dateView);
        });

        it("DateTimePicker sets correct options to DateView", function() {
            var datetimepicker = input.kendoDateTimePicker({ open: function() { }, close: $.noop }).data("kendoDateTimePicker"),
                dateView = datetimepicker.dateView,
                options = dateView.options,
                dpOptions = datetimepicker.options;

            assert.isOk(dateView.options);
            assert.equal(options.anchor, datetimepicker.wrapper);
            assert.equal(options.value, dpOptions.value);
            assert.equal(+options.min, +dpOptions.min);
            assert.equal(+options.max, +dpOptions.max);
        });

        it("DateTimePicker creates TimeView", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            assert.isOk(datetimepicker.timeView);
        });

        it("DateTimePicker sets correct options to TimeView", function() {
            var datetimepicker = input.kendoDateTimePicker({
                popup: {
                    appendTo: "#container"
                }
            }).data("kendoDateTimePicker"),
                timeView = datetimepicker.timeView;

            assert.equal(timeView.options.anchor, datetimepicker.wrapper);
            assert.equal(timeView.options.format, datetimepicker.options.timeFormat);
            assert.equal(timeView.options.interval, datetimepicker.options.interval);
            assert.equal(timeView.options.popup, datetimepicker.options.popup);
        });

        it("datetimepicker wire date icon click", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.close();
            datetimepicker._dateIcon.click();
            assert.isOk(datetimepicker.dateView.popup.visible());
        });

        it("datetimepicker wire clock icon click", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.close("time");
            datetimepicker._timeIcon.click();
            assert.isOk(datetimepicker.timeView.popup.visible());
        });

        it("datetimepicker disables widget if input has disabled attribute", function() {
            var datetimepicker = new DateTimePicker(input.attr("disabled", "disabled"));

            assert.isOk(datetimepicker.wrapper.children(":first").hasClass("k-state-disabled"));
        });

        it("form reset support", function(done) {
            input.attr("value", "12/12/2000 12:00 AM");

            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
                datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.open();
            datetimepicker.value("12/12/2010 12:00 AM");

            form[0].reset();

            setTimeout(function() {
                assert.equal(datetimepicker.element.val(), "12/12/2000 12:00 AM");
                assert.equal(datetimepicker.dateView.calendar.value().getFullYear(), "2000");
                done();
            }, 100);
        });

        it("support for form defined by attribute", function(done) {
            input.attr("form", "form1").attr("value", "12/12/2000 12:00 AM");

            var form = $("<form id='form1'/>").appendTo(Mocha.fixture),
                datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.open();
            datetimepicker.value("12/12/2010 12:00 AM");

            form[0].reset();

            setTimeout(function() {
                assert.equal(datetimepicker.element.val(), "12/12/2000 12:00 AM");
                assert.equal(datetimepicker.dateView.calendar.value().getFullYear(), "2000");
                done();
            }, 100);
        });

        it("form reset support works correctly with value from options", function(done) {
            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
            datetimepicker = input.kendoDateTimePicker({ value: new Date(2018, 1, 1) }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2011, 1, 1));

            form[0].reset();

            setTimeout(function() {
                assert.equal(datetimepicker.element.val(), "2/1/2018 12:00 AM");
                assert.deepEqual(datetimepicker.value(), new Date(2018, 1, 1));
                done();
            }, 200);
        });

        it("form reset support works correctly with value from options", function(done) {
            input.attr("value", "dd MMM yyyy HH:mm");
            var form = $("<form/>").appendTo(Mocha.fixture).append(input),
            datetimepicker = input.kendoDateTimePicker({ value: new Date(2018, 1, 1) }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2011, 1, 1));

            form[0].reset();

            setTimeout(function() {
                assert.equal(datetimepicker.element.val(), "2/1/2018 12:00 AM");
                assert.deepEqual(datetimepicker.value(), new Date(2018, 1, 1));
                done();
            }, 200);
        });

        it("extend popup options if datetimepicker.options.popup", function() {
            var appendTo = "body",
                datetimepicker = new kendo.ui.DateTimePicker(input, {
                    popup: {
                        appendTo: appendTo
                    }
                });

            assert.equal(datetimepicker.dateView.popup.options.appendTo[0], $(appendTo)[0]);
        });

        it("DateTimePicker strips the format from {0:format}", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                format: "{0:MM/dd/yyyy hh:mm}",
                timeFormat: "{0:hh:mm}"
            });

            assert.equal(datetimepicker.options.format, "MM/dd/yyyy hh:mm");
            assert.equal(datetimepicker.options.timeFormat, "hh:mm");
        });

        it("DateTimePicker adds format to the parseFormats array", function() {
            var datetimepicker = input.kendoDateTimePicker({
                parseFormats: ["MM/dd/yy"]
            }).data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.parseFormats[0], datetimepicker.options.format);
            assert.equal(datetimepicker.options.parseFormats[2], datetimepicker.options.timeFormat);
            assert.equal(datetimepicker.options.parseFormats[1], "MM/dd/yy");
        });

        it("DateTimePicker does not modify parseFormats if format exists in the array", function() {
            var datetimepicker = input.kendoDateTimePicker({
                format: "MM/dd/yy",
                parseFormats: ["MM/dd/yyyy", "MM/dd/yy", "h:mm tt"]
            }).data("kendoDateTimePicker");

            assert.equal(datetimepicker.options.parseFormats.length, 3);
            assert.equal(datetimepicker.options.parseFormats[0], "MM/dd/yyyy");
            assert.equal(datetimepicker.options.parseFormats[1], datetimepicker.options.format);
            assert.equal(datetimepicker.options.parseFormats[2], datetimepicker.options.timeFormat);
        });

        it("DateTimePicker uses options.dates if today is in dates", function() {
            var datetimepicker = input.kendoDateTimePicker({
                dates: [new Date(2000, 10, 10, 18, 0, 0)]
            }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2000, 10, 10));

            datetimepicker.open("time");

            assert.equal(datetimepicker.timeView.ul.children().length, 1);
            assert.equal(datetimepicker.timeView.ul.children(":first").text(), "6:00 PM");
        });

        it("DateTimePicker does not use options.dates if today is not in dates", function() {
            var datetimepicker = input.kendoDateTimePicker({
                dates: [new Date(2000, 10, 10, 18, 0, 0)]
            }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2000, 10, 11));

            datetimepicker.open("time");

            assert.isOk(datetimepicker.timeView.ul.children().length > 1);
        });

        it("DateTimePicker initializes dateInput with initial value", function() {
            var datetimepicker = input.kendoDateTimePicker({ dateInput: true, value: new Date(2000, 10, 10, 18, 0, 0) }).data("kendoDateTimePicker");

            assert.equal(datetimepicker.element.val(), "11/10/2000 6:00 PM");
        });

        it("DateTimePicker rebinds timeView if other day is selected", function() {
            var datetimepicker = input.kendoDateTimePicker({
                dates: [new Date(2000, 10, 10, 18, 0, 0)]
            }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2000, 10, 10));
            datetimepicker.open("time");

            datetimepicker.value(new Date(2010, 10, 10));

            assert.isOk(datetimepicker.timeView.ul.children().length > 1);
        });

        it("DateTimePicker uses options.dates even when edge date is selected", function() {
            var datetimepicker = input.kendoDateTimePicker({
                dates: [new Date(2000, 10, 10, 18, 0, 0)],
                min: new Date(2000, 10, 10),
                max: new Date(2000, 10, 10)
            }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2000, 10, 10));
            datetimepicker.open("time");

            assert.equal(datetimepicker.timeView.ul.children().length, 1);
            assert.equal(datetimepicker.timeView.ul.children().eq(0).html(), "6:00 PM");
        });

        it("DateTimePicker copies input's className to the wrapper", function() {
            var datetimepicker = input.addClass("test").kendoDateTimePicker().data("kendoDateTimePicker");

            assert.isOk(datetimepicker.wrapper.hasClass("test"));
        });

        it("DateTimePicker updates calendar if empty input element on open", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.value(new Date());

            input.focus().val("");
            datetimepicker.open();

            assert.equal(datetimepicker.dateView.calendar.value(), null);
        });

        it("DateTimePicker updates calendar's focused date", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                date = new Date(2000, 10, 10);

            datetimepicker.value(new Date(2000, 9, 1));

            input.focus().val(kendo.toString(date, "MM/dd/yyyy hh:mm tt"));
            datetimepicker.open();

            var link = datetimepicker.dateView.calendar.element.find(".k-state-focused > .k-link");

            assert.equal(+datetimepicker.dateView.calendar.value(), +datetimepicker.value());
            assert.equal(link.html(), date.getDate());
        });

        if (!kendo.support.touch) {
            it("DateTimePicker changes the type of the input", function() {
                input = $("<input type='date'/>").appendTo(Mocha.fixture);

                datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

                assert.equal(datetimepicker.element[0].type, "text");
            });
        }

        it("DateTimePicker honors readonly attribute", function() {
            var datetimepicker = input.attr("readonly", true).kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker._timeIcon.click();

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("DateTimePicker uses disabled attr over the readonly", function() {
            input.attr("readonly", true).attr("disabled", true).kendoDateTimePicker();

            assert.equal(input.attr("readonly"), undefined);
        });

        it("DateTimePicker does not remove input text on initialization if not valid value", function() {
            var datetimepicker = input.val("test").kendoDateTimePicker().data("kendoDateTimePicker");

            assert.equal(datetimepicker.value(), null);
            assert.equal(input.val(), "test");
        });

        it("DateTimePicker renders only one possible time option if min and max are equal", function() {
            var date = new Date(2013, 10, 10, 10);
            var datetimepicker = new DateTimePicker(input, {
                min: date,
                max: date
            });

            datetimepicker._timeIcon.click();

            var li = datetimepicker.timeView.ul.find("li");
            assert.equal(li.length, 1);
            assert.equal(li.html(), "10:00 AM");
        });

        it("DateTimePicker sets min from min attribute", function() {
            var date = new Date(2000, 9, 10, 10, 0, 0);
            input.attr("min", kendo.toString(date, "yyyy-MM-ddTHH:mm:ss"));

            var datetimepicker = new DateTimePicker(input);

            assert.deepEqual(datetimepicker.min(), date);
        });

        it("DateTimePicker sets max from max attribute", function() {
            var date = new Date(2013, 9, 10, 21, 30);
            input.attr("max", kendo.toString(date, "yyyy-MM-ddTHH:mm:ss"));

            var datetimepicker = new DateTimePicker(input);

            assert.deepEqual(datetimepicker.max(), date);
        });

        it("DateTimePicker is disabled when placed in disabled fieldset", function() {
            $(input).wrap('<fieldset disabled="disabled"></fieldset>');
            input.kendoDateTimePicker().data("kendoDateTimePicker");
            assert.equal(input.attr("disabled"), "disabled");
        });

        it("DateTimePicker parseFormats contains default ISO formats if no parseFromats are configured", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            var dateFormat = $.inArray('yyyy-MM-dd', datetimepicker.options.parseFormats) > -1
            var timeFormat = $.inArray('yyyy-MM-ddTHH:mm:ss', datetimepicker.options.parseFormats) > -1

            assert.isOk(dateFormat);
            assert.isOk(timeFormat);
        });

        it("DateTimePicker max and min values are reset to initial when form is reset", function() {
            $(input).wrap("<form id='form'></form>");
            var datetimepicker = input.kendoDateTimePicker({
                min: new Date(2000, 0, 1, 22, 0, 0),
                max: new Date(2000, 0, 2, 22, 0, 0)
            }).data("kendoDateTimePicker")

            datetimepicker.setOptions({
                max: new Date(2000, 0, 1, 23, 0, 0)
            });

            $("form")[0].reset();
            assert.deepEqual(datetimepicker.options.max, new Date(2000, 0, 2, 22, 0, 0));
        });

        it("datetimepicker does not add timezone offset incorrectly", function() {
            var minDate = new Date(2016, 3, 8, 0, 0, 0);
            var datetimepicker = new DateTimePicker(input, {
                animation: false,
                min: new Date(minDate)
            });

            datetimepicker.open();
            datetimepicker.dateView.calendar.value(minDate);
            datetimepicker.dateView.calendar.trigger("change");

            assert.deepEqual(datetimepicker.value(), minDate);
        });

        it("datetimepicker renders formatted value even when out of range", function() {
            var value = new Date(1900, 0, 1);

            var datetimepicker = input.kendoDateTimePicker({
                value: value,
                min: new Date(2000, 0, 1),
                max: new Date(2000, 0, 2)
            }).data("kendoDateTimePicker");

            assert.equal(datetimepicker.value(), null);
            assert.equal(datetimepicker.element.val(), kendo.toString(value, datetimepicker.options.format));
        });

        it("datetimepicker instantiates its own popup when component type is modern", function () {
            var datetimepicker = input.kendoDateTimePicker({
                componentType: "modern"
            }).data("kendoDateTimePicker");

            assert.isTrue(datetimepicker.popup instanceof kendo.ui.Popup);
        });

        it("datetimepicker Popup should contain a div with k-date-tab and k-datetime-wrap classes", function () {
            var datetimepicker = input.kendoDateTimePicker({
                componentType: "modern"
            }).data("kendoDateTimePicker");

            assert.equal(datetimepicker.popup.element.find('.k-date-tab.k-datetime-wrap').length, 1);
        });

        it("when time group is selected, date picker should display the time view", function () {
            var datetimepicker = input.kendoDateTimePicker({
                componentType: "modern"
            }).data("kendoDateTimePicker");

            datetimepicker.popup.element.find('button.k-group-end').click();

            assert.equal(datetimepicker.popup.element.find('.k-time-tab').length, 1);
            assert.equal(datetimepicker.popup.element.find('.k-date-tab').length, 0);
        });

        it("when time group is selected, date picker should display the time view", function () {
            var datetimepicker = input.kendoDateTimePicker({
                value: new Date(2020, 3, 5, 0, 0, 0),
                min: new Date(2020, 3, 4, 0, 30, 0),
                max: new Date(2020, 3, 5, 0, 0, 0)
            }).data("kendoDateTimePicker");
            var tv = datetimepicker.timeView;

            tv.refresh();
            assert.equal(tv.ul.children().length, 1);
            assert.equal(tv.ul.find("li:last").html(), "12:00 AM");
        });
    });
}());
