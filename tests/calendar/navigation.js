(function() {

var monthsAbbr = kendo.culture().calendar.months.namesAbbr;
var keys = kendo.keys;
var div, calendar;

module("kendo.ui.Calendar navigation", {
    setup: function() {
        kendo.effects.disable();

        div = $("<div />").appendTo(QUnit.fixture).kendoCalendar({
            min: new Date(1800, 0, 1),
            max: new Date(2200, 0, 1)
        });

        calendar = div.data("kendoCalendar");

        calendar.focus();
    },
    teardown: function() {
        kendo.effects.enable();

        calendar.destroy();
        div.remove();
        kendo.destroy(QUnit.fixture);
    }
});

test("navigate down should persist current viewedValue", function() {
    var value = new Date(2000, 10, 10, 22, 22, 22),
        upEvent = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop },
        downEvent = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

    calendar.value(value);

    calendar._move(upEvent);
    calendar._move(upEvent);

    calendar._move(downEvent);
    calendar._move(downEvent);

    deepEqual(calendar.current(), value);
});

//MONTH View
test("navigate should not _move selection if value is bigger than max", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        date = new Date(2000, 11, 1);

    calendar.max(date);
    calendar.value(date);

    calendar._move(event);

    deepEqual(calendar.current(), date);
    equal(div.find("td.k-state-focused").text(), date.getDate() + "");
});

test("navigate should not _move selection if value is less than min", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        date = new Date(2000, 11, 1);

    calendar.min(date);
    calendar.value(date);

    calendar._move(event);

    deepEqual(calendar.current(), date);
    equal(div.find("td.k-state-focused").text(), date.getDate() + "");

});

test("navigate should focus next day in month view", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    kendo.calendar.views[0].setDate(focusedDate, 1);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
});

test("navigate should focus previous day in month view", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    kendo.calendar.views[0].setDate(focusedDate, -1);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
});

test("navigate should focus day on previous row in month view", function() {
    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    kendo.calendar.views[0].setDate(focusedDate, -7);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
});

test("navigate should focus day on next row in month view", function() {
    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    kendo.calendar.views[0].setDate(focusedDate, 7);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), focusedDate.getDate() + "");
});

//YEAR VIEW
test("navigate should focus next month in year view", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigateUp();

    kendo.calendar.views[1].setDate(focusedDate, 1);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
});

test("navigate should focus previous month in year view", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigateUp();

    kendo.calendar.views[1].setDate(focusedDate, -1);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
});

test("navigate should focus month on previous row in year view", function() {
    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigateUp();

    kendo.calendar.views[1].setDate(focusedDate, -4);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
});

test("navigate should focus month on next row in year view", function() {
    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigateUp();

    kendo.calendar.views[1].setDate(focusedDate, 4);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), monthsAbbr[focusedDate.getMonth()]);
});

//DECADE VIEW
test("navigate should focus next year in decade view", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigate(null, "decade");

    kendo.calendar.views[2].setDate(focusedDate, 1);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());

});

test("navigate should focus previous year in decade view", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigate(null, "decade");

    kendo.calendar.views[2].setDate(focusedDate, -1);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
    ok(!div.find("td.k-state-focused").hasClass("k-other-month"));
});

test("navigate should focus year on previous row in decade view", function() {
    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigate(null, "decade");

    kendo.calendar.views[2].setDate(focusedDate, -4);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
});

test("navigate should focus year on next row in decade view", function() {
    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(calendar.current());

    calendar.navigate(null, "decade");

    kendo.calendar.views[2].setDate(focusedDate, 4);

    calendar._move(event);

    deepEqual(calendar.current(), focusedDate);
    equal(div.find("td.k-state-focused").text(), focusedDate.getFullYear());
});

//CENTURY VIEW
test("navigate should focus next decade in century view", function() {
    var event = { keyCode: keys.RIGHT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current()),
        year, result;

    calendar.navigate(null, "century");

    kendo.calendar.views[3].setDate(focusedDate, 1);
    year = focusedDate.getFullYear();
    year = year - (year % 10);
    result = year + " - " + (year + 9);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), result);
});

test("navigate should focus previous decade in century view", function() {
    var event = { keyCode: keys.LEFT, preventDefault: $.noop },
        focusedDate = new Date(calendar.current()),
        year, result;

    calendar.navigate(null, "century");

    kendo.calendar.views[3].setDate(focusedDate, -1);
    year = focusedDate.getFullYear();
    year = year - (year % 10);
    result = year + " - " + (year + 9);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), result);
});

test("navigate should focus decade on previous row in century view", function() {
    var event = { keyCode: keys.UP, preventDefault: $.noop },
        focusedDate = new Date(calendar.current()),
        year, result;

    calendar.navigate(null, "century");

    kendo.calendar.views[3].setDate(focusedDate, -4);
    year = focusedDate.getFullYear();
    year = year - (year % 10);
    result = year + " - " + (year + 9);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), result);
});

test("navigate should focus decade on next row in century view", function() {
    var event = { keyCode: keys.DOWN, preventDefault: $.noop },
        focusedDate = new Date(calendar.current()),
        year, result;

    calendar.navigate(null, "century");

    kendo.calendar.views[3].setDate(focusedDate, 4);
    year = focusedDate.getFullYear();
    year = year - (year % 10);
    result = year + " - " + (year + 9);

    calendar._move(event);

    equal(div.find("td.k-state-focused").text(), result);
});

//Navigate through views
test("navigate down", function() {
    var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop };

    stub(calendar, { navigateDown: calendar.navigateDown });
    calendar.navigateUp();

    calendar._focus(calendar.current());

    calendar._move(event);

    equal(calendar.calls("navigateDown"), 1);
});

test("navigate up", function() {
    var event = { keyCode: keys.UP, ctrlKey: true, preventDefault: $.noop };

    stub(calendar, "navigateUp");

    calendar._move(event);

    equal(calendar.calls("navigateUp"), 1);
});

test("navigate down selects date", function() {
    var event = { keyCode: keys.DOWN, ctrlKey: true, preventDefault: $.noop },
        selectedDate = new Date(2000, 10, 15);

    calendar._focus(selectedDate);

    calendar._move(event);

    deepEqual(calendar.value(), selectedDate);
});

test("navigate left", function() {
    var event = { keyCode: keys.LEFT, ctrlKey: true, preventDefault: $.noop };

    stub(calendar, "navigateToPast");

    calendar._move(event);

    equal(calendar.calls("navigateToPast"), 1);
});

test("navigate right", function() {
    var event = { keyCode: keys.RIGHT, ctrlKey: true, preventDefault: $.noop };

    stub(calendar, "navigateToFuture");

    calendar._move(event);

    equal(calendar.calls("navigateToFuture"), 1);
});

test("Home should focus first day of current month", function() {
    var event = { keyCode: keys.HOME, preventDefault: $.noop };

    calendar._move(event);

    var value = calendar.element.find(".k-state-focused").children(":first").attr("data-value");

    equal(value, kendo.calendar.views[0].toDateString(calendar.current()));
});

test("End should focus last day of current month", function() {
    var event = { keyCode: keys.END, preventDefault: $.noop };

    calendar._move(event);

    var value = calendar.element.find(".k-state-focused").children(":first").attr("data-value");

    equal(value, kendo.calendar.views[0].toDateString(calendar.current()));
});

test("PageUp should focus same day in previous month", function() {
    var event = { keyCode: keys.PAGEUP, preventDefault: $.noop };

    stub(calendar, {navigateToPast: calendar.navigateToPast});

    calendar._move(event);

    equal(calendar.calls("navigateToPast"), 1);
});

test("PageDown should focus same day in next month", function() {
    var event = { keyCode: keys.PAGEDOWN, preventDefault: $.noop };

    stub(calendar, {navigateToFuture: calendar.navigateToFuture});

    calendar._move(event);

    equal(calendar.calls("navigateToFuture"), 1);
});

test("Enter should focus viewedDate", function() {
    var event = { keyCode: keys.ENTER, preventDefault: $.noop };

    calendar.navigate(new Date(2000, 10, 10), "year");
    calendar._focus(calendar.current());
    calendar._move(event);

    equal(div.find("td.k-state-focused").length, 1);
});

test("Enter should select date", function() {
    var called, event = { keyCode: keys.ENTER, preventDefault: $.noop },
        focused = new Date(2000, 10, 11);

    stub(calendar, {navigateDown: calendar.navigateDown});

    calendar._focus(focused);
    calendar._move(event);

    deepEqual(calendar.args("navigateDown")[0], focused);
});

test("Enter should navigate down", function() {
    var event = { keyCode: keys.ENTER, preventDefault: $.noop };

    stub(calendar, {navigateDown: calendar.navigateDown});

    calendar.navigateUp();
    calendar._focus(calendar.current());

    calendar._move(event);

    equal(calendar.calls("navigateDown"), 1);
});

test("Click on cell persists the time portion", function() {
    calendar.focus();
    calendar.value(new Date(2000, 10, 10, 14, 30));

    var link = calendar._table.find(".k-state-selected").next().find(".k-link");

    calendar._click(link);

    var value = calendar.value();

    equal(value.getHours(), 14);
    equal(value.getMinutes(), 30);
});

test("Click on cell from other month persists the time portion", function() {
    calendar.focus();
    calendar.value(new Date(2000, 10, 10, 14, 30));

    var link = calendar._table.find(".k-other-month").next().find(".k-link");

    calendar._click(link);

    var value = calendar.value();

    equal(value.getHours(), 14);
    equal(value.getMinutes(), 30);
});

test("Calendar persits time portion when select date with navigation", function() {
    calendar.focus();
    calendar.value(new Date(2000, 10, 10, 14, 30));

    calendar._move({ keyCode: keys.UPARROW, preventDefault: $.noop });
    calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

    var value = calendar.value();

    equal(value.getHours(), 14);
    equal(value.getMinutes(), 30);
});

test("Calendar persits time portion when select first day of the month", function() {
    calendar.focus();
    calendar.value(new Date(2000, 10, 10, 14, 30));

    calendar._move({ keyCode: keys.HOME, preventDefault: $.noop });
    calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

    var value = calendar.value();

    equal(value.getHours(), 14);
    equal(value.getMinutes(), 30);
});

test("Calendar persits time portion when select last day of the month", function() {
    calendar.focus();
    calendar.value(new Date(2000, 10, 10, 14, 30));

    calendar._move({ keyCode: keys.END, preventDefault: $.noop });
    calendar._move({ keyCode: keys.ENTER, preventDefault: $.noop });

    var value = calendar.value();

    equal(value.getHours(), 14);
    equal(value.getMinutes(), 30);
});

module("kendo.ui.Calendar focus persistance", {
    setup: function() {
        kendo.effects.disable();

        div = $("<div />").appendTo(QUnit.fixture).kendoCalendar({
            min: new Date(1800, 0, 1),
            max: new Date(2200, 0, 1)
        });

        calendar = div.data("kendoCalendar");

        calendar.focus();
    },
    teardown: function() {
        kendo.effects.enable();

        calendar.destroy();
        div.remove();
        kendo.destroy(QUnit.fixture);
    }
});

test("click to change view", 1, function() {
    document.body.focus();

    calendar.bind("navigate", function() {
        equal(document.activeElement, calendar._table[0]);
    });

    div.find(".k-nav-prev").mousedown();
    div.find(".k-nav-prev").click();
});

test("mouseup on calendar will focus the table", 1, function() {
    calendar.element.mouseup();

    equal(document.activeElement, calendar._table[0]);
});

test("click on title focuses the table", 1, function() {
    calendar._title.click();

    equal(document.activeElement, calendar._table[0]);
});

test("click on prev arrow focuses the table", 1, function() {
    calendar._prevArrow.click();

    equal(document.activeElement, calendar._table[0]);
});

test("click on next arrow focuses the table", 1, function() {
    calendar._nextArrow.click();

    equal(document.activeElement, calendar._table[0]);
});

test("_move focuses the table", 1, function() {
    calendar._table.trigger({
        type: "keydown",
        keyCode: kendo.keys.RIGHT,
        ctrlKey: true
    });

    equal(document.activeElement, calendar._table[0]);
});

module("kendo.ui.Calendar disabled dates navigation", {
    setup: function() {
        kendo.effects.disable();

        div = $("<div />").appendTo(QUnit.fixture).kendoCalendar({
            value: new Date(2015,9,22),
            disableDates: function(date) {
                var disabled = [13,14,20,21];
                if (date && disabled.indexOf(date.getDate()) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        });

        calendar = div.data("kendoCalendar");

        calendar.focus();
    },
    teardown: function() {
        kendo.effects.enable();

        calendar.destroy();
        div.remove();
        kendo.destroy(QUnit.fixture);
    }
});

test("skips disabled date to the left", 1, function() {
    calendar._move({ keyCode: keys.LEFT, preventDefault: $.noop });

    equal($(".k-state-focused > a").text(), 19);
});

test("skips disabled date to the right", 1, function() {
    calendar.value(new Date(2015,9,19));
    calendar._move({ keyCode: keys.RIGHT, preventDefault: $.noop });

    equal($(".k-state-focused > a").text(), 22);
});

test("skips disabled date when navigated between weeks UP", 1, function() {
    calendar.value(new Date(2015,9,28));
    calendar._move({ keyCode: keys.UP, preventDefault: $.noop });

    equal($(".k-state-focused > a").text(), 7);
});

test("skips disabled date when navigated between weeks DOWN", 1, function() {
    calendar.value(new Date(2015,9,7));
    calendar._move({ keyCode: keys.DOWN, preventDefault: $.noop });

    equal($(".k-state-focused > a").text(), 28);
});

test("do not navigate to disabled date in the min range", 1, function() {
    calendar.value(new Date(2015,9,15));
    calendar.min(new Date(2015,9,13));
    calendar._move({ keyCode: keys.LEFT, preventDefault: $.noop });

    equal($(".k-state-focused > a").text(), 15);
});


test("do not navigate to disabled date in the max range", 1, function() {
    var today = new Date();
    var max = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    calendar.max(max);
    calendar.value(new Date(2015,9,12));

    var focusedValue = new Date($(".k-state-focused > a").data("value")).getDate();
    equal(focusedValue, today.getDate());
});

})();
