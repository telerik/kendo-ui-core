(function() {
    var TimeView = kendo.TimeView,
        TimePicker = kendo.ui.TimePicker,
        MIDNIGHT = new Date(0, 0, 0, 0, 0, 0),
        div, input;

    module("kendo.ui.TimePicker initialization", {
        setup: function() {

            this.touch = kendo.support.touch;
            this.mobileOS = kendo.support.mobileOS;
            this.kineticScrollNeeded = kendo.support.kineticScrollNeeded;

            input = $("<input />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            var widget = kendo.widgetInstance(input);
            if (widget) {
                widget.destroy();
            }
            kendo.support.touch = this.touch;
            kendo.support.mobileOS = this.mobileOS;
            kendo.support.kineticScrollNeeded = this.kineticScrollNeeded;
        }
    });

    test("TimeView creates popup", function() {
        var tv = new TimeView({
            anchor: input,
            format: "hh:mm tt",
            min: MIDNIGHT,
            max: MIDNIGHT
        });

        ok(tv.popup);
        ok(tv.popup.element.is("div"));
        ok(tv.popup.element.hasClass("k-list-container"));
        ok(tv.popup.element.hasClass("k-list-scroller"));
        equal(tv.popup.element.attr("unselectable"), "on");
        ok(tv.popup.element.children(":first").is("ul"));
        ok(tv.popup.element.children(":first").hasClass("k-list k-reset"));
        equal(tv.popup.options.anchor, input);
        tv.destroy();
    });

    test("TimeView create template function", function() {
        var tv = new TimeView({
                format: "hh:mm tt",
                anchor: input,
                min: MIDNIGHT,
                max: MIDNIGHT
            }),
            date = new Date(2000, 10, 10, 10, 10, 0);

        equal(tv.template(kendo.toString(date, "hh:mm tt")), '<li tabindex="-1" role="option" class="k-item" unselectable="on">' + kendo.toString(date, "hh:mm tt") + '</li>');
        tv.destroy();
    });

    test("TimeView renders last item equal to the MAX time", function() {
        var tv = new TimeView({
                format: "hh:mm tt",
                anchor: input,
                min: new Date(2000, 0, 1, 0, 0, 0),
                max: new Date(2000, 0, 1, 23, 59, 0),
                interval: 15
            });

        tv.refresh();

        equal(tv.ul.find("li:last").html(), "11:59 PM");
        tv.destroy();
    });

    //TimePicker
    test("_wrapper() wraps input element", function() {
        input.css("width", "200");

        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        ok(input.parent().hasClass("k-picker-wrap k-state-default"));
        equal(timepicker.wrapper.attr("class"), "k-widget k-timepicker k-header");
    });

    test("init() should add k-input to the element", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        ok(timepicker.element.hasClass("k-input"));
    });

    test("_icon put create picker button", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
            icon = timepicker.wrapper.find(".k-select");

        ok(icon);
        ok(icon.is("span"));
        ok(icon.hasClass("k-select"));
        ok(icon.children().is("span"));
        ok(icon.children().hasClass("k-icon k-i-clock"));
        ok(icon.children().html());
    });

    test("timeView is defined", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        ok(timepicker.timeView);
    });

    test("timeView should has correct options", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker"),
            timeView = timepicker.timeView;

        equal(timeView.options.anchor, timepicker.wrapper);
        equal(timeView.options.min, timepicker.options.min);
        equal(timeView.options.max, timepicker.options.max);
        equal(timeView.options.format, timepicker.options.format);
        equal(timeView.options.interval, timepicker.options.interval);
    });

    test("timepicker wire icon click", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.close();
        timepicker._arrow.click();

        ok(timepicker.timeView.popup.visible());
    });

    asyncTest("form reset support", 2, function() {
        input.attr("value", "12:00 AM");

        var form = $("<form/>").appendTo(QUnit.fixture).append(input),
            timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();

        timepicker.value("2:30 PM");

        form[0].reset();

        setTimeout(function() {
            equal(timepicker.element.val(), "12:00 AM");
            equal(timepicker.timeView.current().text(), "12:00 AM");
            start();
        }, 200);
    });

    asyncTest("support for form defined by attribute", 2, function() {
        input.attr("form", "form1").attr("value", "12:00 AM");

        var form = $("<form id='form1'/>").appendTo(QUnit.fixture),
            timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.open();
        timepicker.value("2:30 PM");

        form[0].reset();

        setTimeout(function() {
            equal(timepicker.element.val(), "12:00 AM");
            equal(timepicker.timeView.current().text(), "12:00 AM");
            start();
        }, 200);
        timepicker.destroy();
    });

    test("extend popup options if timepicker.options.popup", function() {
        var appendTo = "#qunit-fixture",
            timepicker = new kendo.ui.TimePicker(input, {
                popup: {
                    appendTo: appendTo
                }
            });

        equal(timepicker.timeView.popup.options.appendTo[0], $(appendTo)[0]);
    });

    test("timepicker strips format from '{0:format}'", function() {
        var timepicker = new kendo.ui.TimePicker(input, {
            format: "{0:hh:mm}"
        });

        equal(timepicker.options.format, "hh:mm");
    });

    test("TimePicker adds format to the parseFormats array", function() {
        var timepicker = input.kendoTimePicker({
            parseFormats: ["hh:mm"]
        }).data("kendoTimePicker");

        equal(timepicker.options.parseFormats[0], timepicker.options.format);
        equal(timepicker.options.parseFormats[1], "hh:mm");
    });

    test("TimePicker uses options.data instead of auto-generated hours", function() {
        var timepicker = input.kendoTimePicker({
            dates: [new Date(2000, 10, 10, 18, 0, 0)]
        }).data("kendoTimePicker");

        timepicker.open();

        equal(timepicker.timeView.ul.children().length, 1);
        equal(timepicker.timeView.ul.children(":first").text(), "6:00 PM");
    });

    test("TimePicker normilize options depending on the options.culture", function() {
        var timepicker = input.kendoTimePicker({
            culture: "bg-BG"
        }).data("kendoTimePicker");

        equal(timepicker.options.format, kendo.getCulture("bg-BG").calendars.standard.patterns.t);
    });

    test("TimePicker uses options.culture to format hours", function() {
        var value = new Date(2000, 10, 10);
        var timepicker = input.kendoTimePicker({
            culture: "bg-BG",
            value: value
        }).data("kendoTimePicker");

        timepicker.open();

        equal(timepicker.timeView.ul.children(":first").html(), kendo.toString(value, "t", "bg-BG"));
        equal(timepicker.element.val(), kendo.toString(value, "t", "bg-BG"));
    });

    test("TimePicker copies input's className to the wrapper", function() {
        var timepicker = input.addClass("test").kendoTimePicker().data("kendoTimePicker");

        ok(timepicker.wrapper.hasClass("test"));
    });

    if (!kendo.support.touch) {
        test("TimePicker changes the type of the input", function() {
            input = $("<input type='date'/>").appendTo(QUnit.fixture),
                timepicker = input.kendoTimePicker().data("kendoTimePicker");

            equal(timepicker.element[0].type, "text");
        });
    }

    test("TimePicker does not set width if list has style.width", function() {
        var timepicker = input.kendoTimePicker().data("kendoTimePicker");

        timepicker.timeView.list.width(400);

        timepicker.open();

        equal(timepicker.timeView.list.width(), 400);
    });


    test("TimePicker honors readonly attribute", function() {
        var timepicker = input.attr("readonly", true).kendoTimePicker().data("kendoTimePicker");

        stub(timepicker.timeView, {toggle: timepicker.timeView.toggle});

        timepicker.wrapper.find(".k-select").click();

        ok(!timepicker.timeView.popup.visible());
    });

    test("TimePicker uses disabled attr over the readonly", function() {
        var timepicker = input.attr("readonly", true).attr("disabled", true)
                              .kendoTimePicker().data("kendoTimePicker");

        equal(input.attr("readonly"), undefined);
    });

    test("TimePicker does not remove input text on initialization if not valid value", function() {
        var timepicker = input.val("test").kendoTimePicker().data("kendoTimePicker");

        equal(timepicker.value(), null);
        equal(input.val(), "test");
    });

    test("TimePicker sets min from min attribute", function() {
        var date = kendo.date.today();
        date.setHours(10, 0, 0);

        input.attr("min", kendo.toString(date, "10:00"));

        var timepicker = new TimePicker(input);

        deepEqual(timepicker.min(), date);
    });

    test("TimePicker sets max from max attribute", function() {
        var date = kendo.date.today();
        date.setHours(20, 0, 0);

        input.attr("max", kendo.toString(date, "20:00"));

        var timepicker = new TimePicker(input);

        deepEqual(timepicker.max(), date);
    });

    test("TimePicker resize height on first open", 1, function() {
        var timepicker = new TimePicker(input, {
            animation: false,
            height: 100
        });

        timepicker.open();

        equal(timepicker.timeView.list.height(), 100)
    });

    test("TimePicker resize height after setOptions", 1, function() {
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

        equal(timepicker.timeView.list.height(), 200)
    });

    test("TimePicker is disabled when placed in disabled fieldset", function() {
        $(input).wrap('<fieldset disabled="disabled"></fieldset>');
        input.kendoTimePicker().data("kendoTimePicker");
        equal(input.attr("disabled"), "disabled");
    });

    test("DateTimePicker max and min values are reset to initial when form is reset", function() {
        $(input).wrap("<form id='form'></form>");
        var timepicker = input.kendoTimePicker({
            min: new Date(2000, 0, 1, 22, 0, 0),
            max: new Date(2000, 0, 2, 22, 0, 0)
        }).data("kendoTimePicker")

        timepicker.setOptions({
            max: new Date(2000, 0, 1, 23, 0, 0)
        });

        $("form")[0].reset();
        deepEqual(timepicker.options.max, new Date(2000, 0, 2, 22, 0, 0));
    });

    test("DateTimePicker scrolls to selected value", function() {
        var timepicker = input.kendoTimePicker({
            value: "10:00 AM"
        }).data("kendoTimePicker")
        timepicker.open();
        var isScrolled = !timepicker.timeView.list[0].scrollTop == 0;
        equal(isScrolled, true)
    });



})();
