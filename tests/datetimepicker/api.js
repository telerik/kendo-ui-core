(function() {

    var DateTimePicker = kendo.ui.DateTimePicker,
        input;

    describe("kendo.ui.DateTimePicker api", function() {
        beforeEach(function() {

            input = $("<input />").appendTo(Mocha.fixture);
        });
        afterEach(function() {

            kendo.destroy(Mocha.fixture);
        });

        it("open method with 'date' param opens DateView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");

            assert.isOk(datetimepicker.dateView.popup.visible());
        });

        it("open method with 'time' param opens TimeView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");

            assert.isOk(datetimepicker.timeView.popup.visible());
        });

        it("close method with 'date' param closes DateView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");
            datetimepicker.close("date");

            assert.isOk(!datetimepicker.dateView.popup.visible());
        });

        it("close method with 'time' param closes TimeView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");
            datetimepicker.close("time");

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("toggle method toggles DateView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");
            datetimepicker.toggle("date");

            assert.isOk(!datetimepicker.dateView.popup.visible());
        });

        it("toggle method toggles TimeView", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");
            datetimepicker.toggle("time");

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("toggle method closes TimeView when DateView is about to open", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("time");
            datetimepicker.toggle("date");

            assert.isOk(datetimepicker.dateView.popup.visible());
            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("toggle method closes DateView when TimeView is about to open", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.open("date");
            datetimepicker.toggle("time");

            assert.isOk(!datetimepicker.dateView.popup.visible());
            assert.isOk(datetimepicker.timeView.popup.visible());
        });

        it("value method sets input value", function() {
            var datetimepicker = new DateTimePicker(input),
                value = "2/10/2000 10:10 AM";

            datetimepicker.value(value);

            assert.equal(input.val(), value);
        });

        it("value method sets DateView's value", function() {
            var datetimepicker = new DateTimePicker(input),
                value = "2/10/2000 10:10 AM";

            stub(datetimepicker.dateView, "value");

            datetimepicker.value(value);

            assert.equal(datetimepicker.dateView.calls("value"), 1);
            assert.isOk(datetimepicker.dateView.args("value", 0)[0] instanceof Date);
        });

        it("value method sets TimeView's value", function() {
            var datetimepicker = new DateTimePicker(input),
                value = "2/10/2000 12:00 AM";

            datetimepicker.timeView.refresh();
            datetimepicker.value(value);

            assert.isOk(datetimepicker.timeView.ul.find(".k-state-selected")[0]);
        });

        it("value method returns value of the datetimepicker", function() {
            var datetimepicker = new DateTimePicker(input),
                value = new Date(2000, 10, 10);

            datetimepicker.value(value);

            assert.equal(+datetimepicker.value(), +value);
        });

        it("value method sets null if date is out of range", function() {
            var datetimepicker = new DateTimePicker(input, {
                min: new Date(2000, 10, 10)
            }),
                value = "2/10/1900 10:10 AM";

            datetimepicker.value(value);

            assert.equal(datetimepicker.value(), null);
        });

        it("value method uses options.parseFormats to parse passed value", function() {
            var secondFormat = "MM/dd/yy",
                date = new Date(2000, 10, 10),
                datetimepicker = input.kendoDateTimePicker({
                    parseFormats: secondFormat
                }).data("kendoDateTimePicker"),
                dateString = kendo.toString(date, secondFormat);

            datetimepicker.value(dateString);

            assert.equal(+datetimepicker._value, +date);
        });

        it("value method parse passed value using options.parseFormats", function() {
            var datetimepicker = input.kendoDateTimePicker({
                parseFormats: ["MMMM yyyy"]
            }).data("kendoDateTimePicker"),
                date = new Date(2000, 10, 1),
                dateString = kendo.toString(date, "MMMM yyyy");

            datetimepicker.value(dateString);

            assert.equal(+datetimepicker._value, +date);
        });

        it("value method sets timeView's min date", function() {
            var date = new Date(2000, 10, 1, 16, 0, 0),
                datetimepicker = input.kendoDateTimePicker({
                    value: new Date(),
                    min: date
                }).data("kendoDateTimePicker");

            datetimepicker.value(new Date(2000, 10, 1, 16, 0, 1));

            assert.equal(+datetimepicker.timeView.options.min, +date);
        });

        it("enable method with false value disables the widget", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.enable(false);

            assert.equal(datetimepicker.element.attr("disabled"), "disabled");
        });

        it("enable method with false unbind click event of date icon", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.enable(false);

            stub(datetimepicker.dateView, { toggle: datetimepicker.dateView.toggle });

            datetimepicker._dateIcon.click();

            assert.isOk(!datetimepicker.dateView.popup.visible());
        });

        it("enable method with false unbind click event of clock icon", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.enable(false);

            stub(datetimepicker.timeView, { toggle: datetimepicker.timeView.toggle });

            datetimepicker._timeIcon.click();

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("enable method with false adds disabled state class to the wrapper", function() {
            var datetimepicker = new DateTimePicker(input);

            datetimepicker.enable(false);

            var inputwrapper = datetimepicker.wrapper.children(":first");

            assert.isOk(inputwrapper.hasClass("k-state-disabled"));
            assert.isOk(!inputwrapper.hasClass("k-state-default"));
        });

        it("enable method with true remove disabled attribute", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.enable(false);
            datetimepicker.enable(true);

            assert.equal(datetimepicker.element.attr("disabled"), undefined);
        });

        it("enable method with true remove disabled class from wrapper", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.enable(false);
            datetimepicker.enable(true);

            assert.isOk(datetimepicker.wrapper.children(":first").hasClass("k-state-default"));
            assert.isOk(!datetimepicker.wrapper.children(":first").hasClass("k-state-disabled"));
        });

        it("readonly() makes  input element readonly", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();

            assert.equal(datetimepicker.element.attr("readonly"), "readonly");
        });

        it("readonly() unbinds date icon click", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();

            datetimepicker._dateIcon.click();

            assert.isOk(!datetimepicker.dateView.popup.visible());
        });

        it("readonly() unbinds time icon click", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();

            datetimepicker._timeIcon.click();

            assert.isOk(!datetimepicker.timeView.popup.visible());
        });

        it("readonly(false) removes readonly attribute", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();
            datetimepicker.readonly(false);

            assert.equal(datetimepicker.element.attr("readonly"), undefined);
        });

        it("readonly() removes disabled attribute and disabled class", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.enable(false);
            datetimepicker.readonly();

            assert.equal(datetimepicker.element.attr("readonly"), "readonly");
            assert.equal(datetimepicker.element.attr("disabled"), undefined);
            assert.isOk(datetimepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!datetimepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable(false) removes readonly attribute and default class", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();
            datetimepicker.enable(false);

            assert.equal(datetimepicker.element.attr("readonly"), undefined);
            assert.equal(datetimepicker.element.attr("disabled"), "disabled");
            assert.isOk(!datetimepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(datetimepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("enable() enables widget after readonly()", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.readonly();
            datetimepicker.enable();

            assert.equal(datetimepicker.element.attr("readonly"), undefined);
            assert.equal(datetimepicker.element.attr("disabled"), undefined);
            assert.isOk(datetimepicker._inputWrapper.hasClass("k-state-default"));
            assert.isOk(!datetimepicker._inputWrapper.hasClass("k-state-disabled"));
        });

        it("min method returns min value", function() {
            var value = new Date("10/22/2000"),
                datetimepicker = input.kendoDateTimePicker({ min: value }).data("kendoDateTimePicker");

            var result = datetimepicker.min();

            assert.equal(+result, +value);
        });

        it("min() sets the min value of the datetimepicker", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                value = new Date("10/22/2000");

            datetimepicker.min(value);

            assert.equal(+datetimepicker.options.min, +value);
        });

        it("min() calls min method of the DateView", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                value = new Date(2000, 10, 10, 10, 10, 0);

            stub(datetimepicker.dateView, { min: datetimepicker.dateView.min });
            stub(datetimepicker.timeView, { refresh: datetimepicker.timeView.refresh });

            datetimepicker.min(value);

            assert.equal(datetimepicker.dateView.calls("min"), 1);
        });

        it("min method does not set TimeView.options.min", function() {
            var datetimepicker = input.kendoDateTimePicker({
                value: new Date(2010, 10, 10)
            }).data("kendoDateTimePicker"),
                min = new Date(2000, 10, 10, 10, 10, 0),
                oldMin = +datetimepicker.options.min;

            datetimepicker.min(min);

            assert.equal(+datetimepicker.timeView.options.min, oldMin);
        });

        it("max() returns max value", function() {
            var value = new Date("10/22/2000"),
                datetimepicker = input.kendoDateTimePicker({ max: value }).data("kendoDateTimePicker");

            var result = datetimepicker.max();

            assert.equal(+result, +value);
        });

        it("max() sets the max value of the datetimepicker", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                value = new Date("10/22/2000");

            datetimepicker.max(value);

            assert.equal(+datetimepicker.options.max, +value);
        });

        it("max() calls max methods of DateView", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker"),
                value = new Date(2000, 10, 10, 10, 10, 0);

            stub(datetimepicker.dateView, { max: datetimepicker.dateView.max });

            datetimepicker.max(value);

            assert.equal(datetimepicker.dateView.calls("max"), 1);
        });

        it("max method does not set TimeView.options.max", function() {
            var datetimepicker = input.kendoDateTimePicker({
                value: new Date(2010, 10, 10)
            }).data("kendoDateTimePicker"),
                max = new Date(2020, 10, 10, 10, 10, 0),
                oldMax = +datetimepicker.options.max;

            datetimepicker.max(max);

            assert.equal(+datetimepicker.timeView.options.max, oldMax);
        });

        it("change max date shows all hours", function() {
            var datetimepicker = input.kendoDateTimePicker({
                value: new Date(2010, 10, 10),
                max: new Date(2010, 10, 10, 16, 0, 0)
            }).data("kendoDateTimePicker");

            datetimepicker.max(new Date(2011, 11, 11, 16, 0, 0));

            assert.equal(datetimepicker.timeView.ul.children(":last").html(), "11:30 PM");
        });

        it("max method limits start hours if current value is equal to min", function() {
            var date = new Date(2010, 10, 10, 10);

            var datetimepicker = input.kendoDateTimePicker({
                min: date,
                max: date,
                value: date
            }).data("kendoDateTimePicker");

            var max = new Date(2020, 10, 10, 10, 10, 0);

            datetimepicker.max(max);

            var li = datetimepicker.timeView.ul.find("li");

            assert.equal(li.first().html(), "10:00 AM");
            assert.equal(li.last().html(), "11:30 PM");
        });

        it("max method rebinds list if min and max are in the same day", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                min: new Date(2010, 10, 10, 10),
                max: new Date(2010, 10, 12, 10),
                value: new Date(2010, 10, 10)
            });

            datetimepicker.max(new Date(2010, 10, 10, 11));

            var li = datetimepicker.timeView.ul.find("li");

            assert.equal(li.length, 3);
            assert.equal(li.first().html(), "10:00 AM");
            assert.equal(li.last().html(), "11:00 AM");
        });

        it("min method shows all hours in timeView if not edge date", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            datetimepicker.min(new Date(2000, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("max method shows only hour from max date if current is edge", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            datetimepicker.max(new Date(2010, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children().length, 1);
            assert.equal(ul.children(":first").html(), "12:00 AM");
        });

        it("min method rebinds timeView to honor min value if current value is min", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            datetimepicker.min(new Date(2010, 10, 10, 10, 0, 0));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "10:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("max method rebinds timeView to honor max value if current value is max", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            datetimepicker.max(new Date(2010, 10, 10, 10, 0, 0));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "10:00 AM");
        });

        it("min method shows all hours if current value is null", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input);

            datetimepicker.min(new Date(2000, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("value method do not rebind timeView if date is not edge", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input);

            datetimepicker.value(new Date(2000, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children().length, 0);
        });

        it("value method rebinds timeView if current is equal to min", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10),
                min: new Date(2000, 10, 10)
            });

            datetimepicker.value(new Date(2000, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("value method rebinds timeView if current is equal to max", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                max: new Date(2010, 10, 10, 20, 0, 0)
            });

            datetimepicker.value(new Date(2010, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "8:00 PM");
        });

        it("value method shows only one hour when max is midnight", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2000, 10, 10),
                max: new Date(2010, 10, 10)
            });

            datetimepicker.value(new Date(2010, 10, 10));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children().length, 1);
            assert.equal(ul.children(":first").html(), "12:00 AM");
        });

        it("value method shows all hours when set diff then edge", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10),
                max: new Date(2010, 10, 10)
            });

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children().length, 1);
            assert.equal(ul.children(":first").html(), "12:00 AM");

            //set value
            datetimepicker.value(new Date(2000, 10, 10));

            ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("value method do nothing if set to same value as current", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            stub(datetimepicker.timeView, "value");

            datetimepicker.value(new Date(2010, 10, 10));

            assert.equal(datetimepicker.timeView.calls("value"), 0);
        });

        it("value method do nothing if argument is null", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10)
            });

            stub(datetimepicker.timeView, "_bind");

            datetimepicker.value(null);

            assert.equal(datetimepicker.timeView.calls("_bind"), 0);
        });

        it("value method shows only one date if min and max are in same day", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                value: new Date(2010, 10, 10),
                min: new Date(2010, 10, 10),
                max: new Date(2010, 10, 10)
            });

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children().length, 1);
            assert.equal(ul.children(":first").html(), "12:00 AM");
        });

        it("value method should rebind timeView if select min after max was selected", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                min: new Date(2000, 10, 10, 10, 0, 0),
                max: new Date(2010, 10, 10, 20, 0, 0)
            });

            //set value
            datetimepicker.value(new Date(2010, 10, 10, 20, 0, 0));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "12:00 AM");
            assert.equal(ul.children(":last").html(), "8:00 PM");

            //set value
            datetimepicker.value(new Date(2000, 10, 10, 10, 0, 0));

            ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "10:00 AM");
            assert.equal(ul.children(":last").html(), "11:30 PM");
        });

        it("value method persist min and max range in timeview", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                min: new Date(2000, 10, 10, 10, 0, 0),
                max: new Date(2000, 10, 10, 20, 0, 0)
            });

            //set value
            datetimepicker.value(new Date(2000, 10, 10, 12, 0, 0));

            var ul = datetimepicker.timeView.ul;

            assert.equal(ul.children(":first").html(), "10:00 AM");
            assert.equal(ul.children(":last").html(), "8:00 PM");
        });

        it("value method updates input element when select max date", function() {
            var datetimepicker = new kendo.ui.DateTimePicker(input, {
                max: new Date(2000, 9, 10)
            });

            datetimepicker.value(new Date(2000, 9, 10));

            assert.equal(datetimepicker.element.val(), "10/10/2000 12:00 AM");
        });

        it("value method restricts time of the value if it's date part is equal to min", function() {
            var today = new Date(),
                midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                datepicker = input.kendoDateTimePicker({
                    min: today,
                    value: today
                }).data("kendoDateTimePicker");

            datepicker.value(midnight);

            assert.notEqual(datepicker._value, null);
            assert.equal(+datepicker._value, +today);
        });

        it("value method restricts time of the value if it's date part is equal to max", function() {
            var today = new Date(),
                midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                datepicker = input.kendoDateTimePicker({
                    max: today,
                    value: today
                }).data("kendoDateTimePicker");

            datepicker.value(midnight);

            assert.notEqual(datepicker._value, null);
            assert.equal(+datepicker._value, +midnight);
        });

        it("value method does not show text representation of invalid value", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.value("invalid");

            assert.equal(datetimepicker.value(), null);
            assert.equal(input.val(), "");
        });

        it("value method can set 1/1/1970", function() {
            var date = new Date(1970, 0, 1);
            var hours = (date.getTimezoneOffset() / 60) * -1;
            var minutes = hours % 1;
            if (minutes) {
                minutes = 60 * minutes;
            }
            date.setHours(hours, minutes, 0);

            datepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datepicker.value(date);

            assert.deepEqual(datepicker.dateView._value, date);
        });

        it("value method parses hours when ISO date format", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: "2000-10-10T13:30:23"
            });

            assert.equal(datetimepicker.element.val(), "10/10/2000 1:30 PM");
        });

        it("setting value in change event does not cause infinite recursion", function() {
            var datetimepicker = new DateTimePicker(input, {
                change: function() {
                    this.value(new Date("1/1/2015"));
                }
            });
            datetimepicker.value(new Date("1/2/2015"));
            assert.equal(datetimepicker.value().getDate(), 2);
        });

        it("setOptions method sets correct timeView min/max values", function() {
            var date = new Date(2013, 10, 10, 1, 30);
            var min = new Date(2013, 10, 9, 23, 30);

            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.value(date);

            datetimepicker.setOptions({
                min: min
            });

            assert.deepEqual(datetimepicker.timeView.options.min, new Date(1800, 0, 1));
        });

        it("setOptions rebinds time options", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            var timeView = datetimepicker.timeView;

            stub(timeView, {
                bind: timeView.bind
            });

            datetimepicker.setOptions({});

            assert.equal(timeView.calls("bind"), 1);
        });

        it("setOptions supports dynamically format change", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            var timeView = datetimepicker.timeView;

            datetimepicker.setOptions({
                timeFormat: "HH:mm"
            });

            var first = timeView.ul.children().first();

            assert.equal(first.html(), "00:00");
        });

        it("setOptions method updates calendar options", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            datetimepicker.open();

            datetimepicker.setOptions({
                start: "year",
                depth: "year"
            });

            assert.equal(datetimepicker.dateView.calendar.view().name, "year");
        });

        it("setOptions method updates format", function() {
            var datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");
            datetimepicker.open();
            datetimepicker.value(new Date(2013, 10, 10));

            datetimepicker.setOptions({
                format: "dd/MM/yyyy"
            });

            assert.equal(datetimepicker.element.val(), kendo.toString(datetimepicker.value(), "dd/MM/yyyy"));
        });

        it("setOptions preserves options.dates", function() {
            var datetimepicker = new DateTimePicker(input, {
                dates: [new Date()]
            });

            datetimepicker.setOptions({
                footer: false
            });

            assert.equal(datetimepicker.options.dates.length, 1);
        });

        it("setOptions updates options.dates", function() {
            var datetimepicker = new DateTimePicker(input, {
                dates: [new Date()]
            });

            datetimepicker.setOptions({
                dates: [new Date(), new Date()]
            });

            assert.equal(datetimepicker.options.dates.length, 2);
        });

        it("setOptions updates max option correctly", function() {
            var datetimepicker = new DateTimePicker(input, {
            });

            var max = new Date(new Date().getTime() + (5 * 3600000));

            datetimepicker.setOptions({
                max: max
            });
            datetimepicker.value(max);
            assert.isOk(datetimepicker.timeView.ul.children().length > 1);
        });

        it("setOptions method updates dateInput", function() {
            datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.setOptions({
                dateInput: true
            });

            assert.equal(datetimepicker.element.val(), "month/day/year hours:minutes AM/PM");
        });

        it("setOptions method disables dateInput and clears the input if widget does not have a value", function() {
            datetimepicker = input.kendoDateTimePicker().data("kendoDateTimePicker");

            datetimepicker.setOptions({
                dateInput: false
            });

            assert.equal(datetimepicker.element.val(), "");
        });


        it("does not set disabled date as value", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2015, 9, 20, 10, 10, 10),
                disableDates: ["tu"]
            });

            assert.equal(datetimepicker.value(), null);
        });

        it("does not update the input when disabled value is set", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2015, 9, 20, 10, 10, 10),
                disableDates: ["tu"]
            });

            assert.equal(datetimepicker.element.val().length, 0);
        });

        it("manually setting disabled date, does not set the widget value", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2015, 9, 19, 10, 10, 10),
                disableDates: ["tu"]
            });
            datetimepicker.element.val("10/13/2015 12:00 AM");
            datetimepicker.element.blur();

            assert.equal(datetimepicker.element.val(), "10/13/2015 12:00 AM");
            assert.equal(datetimepicker.value(), null);
        });

        it("manually setting disabled date, does not set the widget value", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date(2015, 9, 19, 10, 10, 10),
                disableDates: ["tu"]
            });
            datetimepicker.element.val("10/13/2015 12:00 AM");
            datetimepicker.element.blur();

            assert.equal(datetimepicker.element.val(), "10/13/2015 12:00 AM");
            assert.equal(datetimepicker.value(), null);
        });

        it("time part from current is stripped when value is set to null", function() {
            var datetimepicker = new DateTimePicker(input, {
                value: new Date()
            });
            datetimepicker.value(null);
            assert.equal(datetimepicker.dateView._current.getHours(), 0);
            assert.equal(datetimepicker.dateView._current.getMinutes(), 0);
            assert.equal(datetimepicker.dateView._current.getSeconds(), 0);
        });
    });
}());
