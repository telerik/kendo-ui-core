(function() {

var DateView = kendo.DateView,
    keys = kendo.keys,
    dateview,
    anchor,
    input;

describe("kendo.ui.DatePicker Navigation", function () {
    beforeEach(function() {


        kendo.ns = "kendo-";

        input = $("<input />").appendTo(Mocha.fixture);
        anchor = $("<input />").appendTo(Mocha.fixture);
    });
    afterEach(function() {


        if (dateview) {
            dateview.destroy();
        }

        kendo.destroy(Mocha.fixture);
        Mocha.fixture.empty()


        kendo.ns = "";
    });

it("click enter should raise change event if dateview is closed", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    datepicker.close();

    stub(datepicker, { _change: datepicker._change });

    input.focus().val("10/10/2000");
    datepicker._keydown({
        currentTarget: document.createElement("input"),
        keyCode: keys.ENTER,
        preventDefault: $.noop
    });

    assert.equal(datepicker.calls("_change"), 1);
});

it("navigate down should persist current viewedateviewalue", function() {
    var value = new Date(2000, 10, 10, 22, 22, 22),
        upEvent = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop },
        downEvent = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

    dateview = new DateView({
        value: value,
        min: new Date(1999, 10, 10),
        max: new Date(2111, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    dateview.move(upEvent);
    dateview.move(upEvent);

    dateview.move(downEvent);
    dateview.move(downEvent);

    assert.equal(+dateview._current, +value);
});

//MONTH View
it("navigate should not move selection if value is bigger than max", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        date = new Date(2000, 11, 1);

    dateview = new DateView({
        depth: "month",
        start: "month",
        min: new Date(1900, 10, 10),
        value: date,
        max: date
    });

    dateview.open();
    dateview.move(event);

    assert.equal(+dateview._current, +date);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), date.getDate() + "");
});

it("navigate should not move selection if value is less than min", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        date = new Date(2000, 11, 1);

    dateview = new DateView({start: "month", depth: "month", value: date, min: date, max: new Date(2100, 10, 10)});

    dateview.open();
    dateview.move(event);

    assert.equal(+dateview._current, +date);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), date.getDate() + "");

});

it("navigate should focus next day in month view", function() {
    dateview = new DateView({
        start: "month",
        depth: "month",
        min: new Date(1999, 10, 10),
        max: new Date(2111, 10, 10)
    });

    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    kendo.calendar.views[0].setDate(focusedDate, 1);

    dateview.open();
    dateview.move(event);

    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), focusedDate.getDate() + "");

});

it("navigate should focus previous day in month view", function() {
    dateview = new DateView({start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    focusedDate.setDate(focusedDate.getDate() - 1);

    dateview.open();
    dateview.move(event);

    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), focusedDate.getDate() + "");
});

it("navigate should focus day on previous row in month view", function() {
    dateview = new DateView({start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    focusedDate.setDate(focusedDate.getDate() - 7);

    dateview.open();
    dateview.move(event);

    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), focusedDate.getDate() + "");
});

it("navigate should focus day on next row in month view", function() {
    dateview = new DateView({start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    focusedDate.setDate(focusedDate.getDate() + 7);

    dateview.open();
    dateview.move(event);

    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), focusedDate.getDate() + "");
});

it("do not change input value if not a valid date is typed and dateInput option is enabled ", function() {
    input.kendoDatePicker({
            dateInput:true,
            value: new Date()
        });

        input.focus().val("10/22/year").trigger("focusout");

        assert.equal(input.val(), "10/22/year");
});

//YEAR VIEW
it("navigate should focus next month in year view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigateUp();

    focusedDate.setMonth(focusedDate.getMonth() + 1);

    dateview.move(event);

    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "Dec");
});

it("navigate should focus previous month in year view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigateUp();

    focusedDate.setMonth(focusedDate.getMonth() - 1);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "Oct");
});

it("navigate should focus month on previous row in year view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigateUp();

    focusedDate.setMonth(focusedDate.getMonth() - 4);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "Jul");
});

it("navigate should focus month on next row in year view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigateUp();

    focusedDate.setMonth(focusedDate.getMonth() + 4);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "Mar");
});

//DECADE VIEW
it("navigate should focus next year in decade view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "decade");

    focusedDate.setFullYear(focusedDate.getFullYear() + 1);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "2001");

});

it("navigate should focus previous year in decade view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1999, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "decade");

    focusedDate.setFullYear(focusedDate.getFullYear() - 1);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "1999");
    assert.isOk(!dateview.calendar._table.find(".k-state-focused").hasClass("k-other-month"));
});

it("navigate should focus year on previous row in decade view", function() {
    dateview = new DateView({
        depth: "month",
        start: "month",
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2111, 10, 10)
    });

    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "decade");

    focusedDate.setFullYear(focusedDate.getFullYear() - 4);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "1996");
});

it("navigate should focus year on next row in decade view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "decade");

    focusedDate.setFullYear(focusedDate.getFullYear() + 4);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "2004");
});

//CENTURY VIEW
it("navigate should focus next decade in century view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "century");

    focusedDate.setFullYear(focusedDate.getFullYear() + 10);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "2010 - 2019");
});

it("navigate should focus previous decade in century view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "century");

    focusedDate.setFullYear(focusedDate.getFullYear() - 10);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "1990 - 1999");
});

it("navigate should focus decade on previous row in century view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "century");

    focusedDate.setFullYear(focusedDate.getFullYear() - 40);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "1960 - 1969");
});

it("navigate should focus decade on next row in century view", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(dateview._current);

    dateview.open();
    dateview.calendar.navigate(null, "century");

    focusedDate.setFullYear(focusedDate.getFullYear() + 40);

    dateview.move(event);

    assert.equal(+dateview._current, +focusedDate);
    assert.equal(dateview.calendar._table.find(".k-state-focused").text(), "2040 - 2049");
});

//Navigate through views
it("navigate down", function() {
    var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

    dateview = new DateView({
        value: new Date(2000, 10, 10),
        start: "month",
        depth: "month",
        min: new Date(1900, 10, 10),
        max: new Date(2111, 10, 10)
    });

    dateview.open();

    stub(dateview.calendar, { navigateDown: dateview.calendar.navigateDown });

    dateview.calendar.navigateUp();

    dateview.calendar._focus(dateview._current);

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateDown"), 1);
});

it("navigate up", function() {
    var event = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();
    stub(dateview.calendar, "navigateUp");

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateUp"), 1);
});

it("navigate down selects date", function() {
    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop },
        selectedDate = new Date(2000, 10, 15);

    dateview.open();
    dateview.calendar._focus(selectedDate);

    dateview.move(event);

    assert.equal(+dateview.calendar.value(), +selectedDate);
});

it("navigate left", function() {
    var event = { keyCode: keys.LEFT, ctrlKey: true, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();

    stub(dateview.calendar, "navigateToPast");

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateToPast"), 1);
});

it("navigate right", function() {
    var event = { keyCode: keys.RIGHT, ctrlKey: true, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();

    stub(dateview.calendar, "navigateToFuture");

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateToFuture"), 1);
});

it("Home should focus first day of current month", function() {
    var event = { keyCode: keys.HOME, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();
    dateview.move(event);

    var value = dateview.calendar.element.find(".k-state-focused").children(":first").attr("data-kendo-value");

    assert.equal(value, "2000/10/1");
});

it("End should focus last day of current month", function() {
    var event = { keyCode: keys.END, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();
    dateview.move(event);

    var value = dateview.calendar.element.find(".k-state-focused").children(":first").attr("data-kendo-value");

    assert.equal(value, "2000/10/30");
});

it("PageUp should focus same day in previous month", function() {
    var event = { keyCode: keys.PAGEUP, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();
    stub(dateview.calendar, {navigateToPast: dateview.calendar.navigateToPast});

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateToPast"), 1);
});

it("PageDown should focus same day in next month", function() {
    var event = { keyCode: keys.PAGEDOWN, preventDefault: $.noop };

    dateview = new DateView({value: new Date(2000, 10, 10), start: "month", depth: "month", min: new Date(1900, 10, 10), max: new Date(2111, 10, 10)});

    dateview.open();

    stub(dateview.calendar, {navigateToFuture: dateview.calendar.navigateToFuture});

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateToFuture"), 1);
});

it("Enter should close date if select date", function() {
    var event = { keyCode: keys.ENTER, preventDefault: $.noop };

    dateview = new DateView({
        anchor: anchor,
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    dateview.calendar._focus(dateview._current);

    dateview.move(event);

    assert.isOk(!dateview.popup.visible());
});

it("Enter should focus viewedDate", function() {
    var event = { keyCode: keys.ENTER, preventDefault: $.noop };

    dateview = new DateView({
        anchor: anchor,
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    dateview.calendar.navigate(new Date(2000, 10, 10), "year");
    dateview.calendar._focus(dateview._current);
    dateview.move(event);

    assert.isOk(dateview.popup.visible());
    assert.equal(dateview.calendar._table.find(".k-state-focused").length, 1);
});

it("Enter should select date", function() {
    dateview = new DateView({
        anchor: anchor,
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    var called, event = { keyCode: keys.ENTER, preventDefault: $.noop },
    focused = new Date(2000, 10, 11);

    dateview.open();

    stub(dateview.calendar, {navigateDown: dateview.calendar.navigateDown});

    dateview.calendar._focus(focused);
    dateview.move(event);

    assert.equal(+dateview.calendar.args("navigateDown")[0], +focused);
});

it("Enter should navigate down", function() {
    var event = { keyCode: keys.ENTER, preventDefault: $.noop };

    dateview = new DateView({
        anchor: anchor,
        value: new Date(2010, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    stub(dateview.calendar, {navigateDown: dateview.calendar.navigateDown});

    dateview.calendar.navigateUp();
    dateview.calendar._focus(dateview._current);

    dateview.move(event);

    assert.equal(dateview.calendar.calls("navigateDown"), 1);
});

it("Esc should close dateView", function() {
    var event = { keyCode: keys.ESC, preventDefault: $.noop };

    dateview = new DateView({
        anchor: anchor,
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    stub(dateview.popup, "close");

    dateview.move(event);

    assert.equal(dateview.popup.calls("close"), 1);
});

it("DateView prevents default action when ESC is pressed and popup is opened", function() {
    var event = {
        keyCode: keys.ESC,
        preventDefault: function() {
            assert.isOk(true);
        }
    };

    dateview = new DateView({
        anchor: anchor,
        value: new Date(2000, 10, 10),
        min: new Date(1900, 10, 10),
        max: new Date(2100, 10, 10),
        start: "month",
        depth: "month"
    });

    dateview.open();

    dateview.move(event);
});

it("type invalide date does not clear input", function() {
    datepicker = input.kendoDatePicker({value: new Date()}).data("kendoDatePicker");

    var value = "invalid date";

    input.focus().val(value).blur();

    assert.equal(input.val(), value);
    assert.equal(datepicker.value(), null);
});

it("click on selected date should close the dateView", function() {
    dateview = new DateView({
        min: new Date(1800, 1, 1),
        max: new Date(2800, 1, 1),
        start: "month",
        depth: "month",
        anchor: anchor,
        clearBlurTimeout: $.noop,
        close: function() {
            assert.isOk(true);
        }
    });

    dateview.value(new Date());
    dateview.open();

    dateview.calendar
      .element
      .find(".k-state-selected")
      .click();
});

it("click on selected date should populate input if empty", function() {
    datepicker = input.kendoDatePicker({
        value: new Date(2019, 1, 1)
    }).data("kendoDatePicker");

    datepicker.open();

    input.val("");

    datepicker.dateView.calendar
      .element
      .find(".k-state-selected")
      .click();

    assert.isOk(input.val());
});

it("Spacebar should not select a date and close the popup", function() {
    var event = { keyCode: keys.SPACEBAR, preventDefault: $.noop };

    var datepicker = input.kendoDatePicker({
        start: "month",
        depth: "month"
    }).data("kendoDatePicker");

    var dateview = datepicker.dateView;

    dateview.open();

    dateview.calendar._focus(dateview._current);

    dateview.move(event);

    assert.isOk(dateview.popup.visible());
});

it("Alt + Down should open the calendar", function() {
    var event = { type: "keydown", keyCode: keys.DOWN, altKey: true, preventDefault: $.noop };

    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, "open");

    input.trigger(event);

    assert.equal(datepicker.dateView.calls("open"), 1);
});

it("Alt + UP should close the calendar", function() {
    var event = { type: "keydown", keyCode: keys.UP, altKey: true, preventDefault: $.noop };

    datepicker = input.kendoDatePicker().data("kendoDatePicker");

    stub(datepicker.dateView, "close");

    input.trigger(event);

    assert.equal(datepicker.dateView.calls("close"), 1);
});

it("DatePicker does not update the input if the entered value is the same but in diff format", function() {
    datepicker = input.kendoDatePicker({
        format: "dd MMM yyyy",
        parseFormats: ["yyyy/MM/dd"],
        value: kendo.toString(today, "dd MMM yyyy")
    }).data("kendoDatePicker");

    var today = new Date(),
        todayDiffFormat = kendo.toString(today, "yyyy/MM/dd");

    input.val(todayDiffFormat);

    //simulate change
    datepicker._change(input.val());

    assert.equal(input.val(), kendo.toString(today, "dd MMM yyyy"));
});

it("DatePicker does not call change on blur if no text change", function() {
    var date = new Date(1919, 0, 1);

    datepicker = input.kendoDatePicker({
        format: "MM/dd/yy",
        value: new Date(date)
    }).data("kendoDatePicker");

    datepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

    //simulate change
    input.focus().blur();

    assert.equal(+datepicker.value(), +date);
});

it("DatePicker does not call change on ENTER if no text change", function() {
    var date = new Date(1919, 0, 1);

    datepicker = input.kendoDatePicker({
        format: "MM/dd/yy",
        value: new Date(date)
    }).data("kendoDatePicker");

    datepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

    //simulate change
    input.focus().trigger({
        type: "keydown",
        keyCode: kendo.keys.ENTER
    });

    assert.equal(+datepicker.value(), +date);
});

it("DatePicker does set focused date of calendar if no text change", function() {
    var date = new Date(1919, 0, 1);

    datepicker = input.kendoDatePicker({
        format: "MM/dd/yy",
        value: new Date(date)
    }).data("kendoDatePicker");

    datepicker.options.parseFormats = ["MM/dd/yyyy", "MM/dd/yy"];

    input.focus();
    datepicker.open();

    assert.equal(+datepicker.dateView._current, +date);
});

it("click enter should raise change event if dateview is closed", function() {
    var datepicker = input.kendoDatePicker().data("kendoDatePicker");

    input.focus();
    datepicker.open();

    datepicker.dateView.calendar.element.find(".k-nav-fast").click();

    assert.isOk(datepicker.dateView.popup.visible());
});

it("navigate should focus min month in year view", function() {
    var date = new Date(),
        openEvent = { type: "keydown", keyCode: keys.DOWN, altKey: true, preventDefault: $.noop },
        downEvent = { type: "keydown", keyCode: keys.DOWN, altKey: false, preventDefault: $.noop },
        upEvent = { type: "keydown", keyCode: keys.UP, altKey: false, preventDefault: $.noop };

    var datepicker = input.kendoDatePicker({
         min: date,
         start:"year"
    }).data("kendoDatePicker");

    input.trigger(openEvent);
    input.trigger(downEvent);
    input.trigger(upEvent);

    assert.equal(datepicker.dateView.calendar._table.find(".k-state-focused").text(), kendo.toString(date, "MMM"));
});

it("deleting the value in the input sets the current day to the dateview", function() {
    var datepicker = input.kendoDatePicker({value: new Date(2011, 1, 1)}).data("kendoDatePicker");
    datepicker.open();
    datepicker.close();
    input.focus().val("");

    datepicker._blur();

    assert.deepEqual(datepicker.dateView.calendar.current(), kendo.calendar.getToday());
});

it("deleting the value in the input sets the current day to the dateview and does not cause an error on open", function() {
    var datepicker = input.kendoDatePicker({value: new Date(2011, 1, 1)}).data("kendoDatePicker");
    input.focus().val("");

    datepicker._blur();
    datepicker.open();

    assert.deepEqual(datepicker.dateView.calendar.current(), kendo.calendar.getToday());
});
    });
}());
