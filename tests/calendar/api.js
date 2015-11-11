(function() {
var Calendar = kendo.ui.Calendar;
var div;

module("kendo.ui.Calendar API", {
    setup: function() {
        kendo.effects.disable();
        div = $("<div />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        kendo.destroy(QUnit.fixture);
    }
});

test("navigate method render view using default values", function() {
    var cal = new Calendar(div),
        date = new Date(),
        firstVisibleDate = kendo.calendar.firstVisibleDay(date);

    equal(cal.element.find(".k-content").find("a:first").html(), firstVisibleDate.getDate());
});

test("navigate method render view depending on given date and view", function() {
    var cal = new Calendar(div),
        date = new Date(2000, 10, 10);

    cal.navigate(date, 2);

    equal(cal.element.find(".k-content").find("a:first").html(), "1999");
});

test("navigate method should disable._prevArrow if cannot navigate to past", function() {
    var date = new Date(2000, 10, 10),
    cal = new Calendar(div, {
        value: date,
        min: date
    });

    ok(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

test("navigate method should disable._nextArrow if cannot navigate to future", function() {
    var date = new Date(2000, 10, 10),
    cal = new Calendar(div, {
        value: date,
        max: date
    });

    ok(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

test("navigate method should disable._prevArrow if cannot navigate to past (year)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 1
        });

    ok(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

test("navigate method should disable._nextArrow if cannot navigate to future (year)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 1
        });

    ok(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

test("navigate method should disable._prevArrow if cannot navigate to past (decade)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 2
        });

    ok(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

test("navigate method should disable._nextArrow if cannot navigate to future (decade)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 2
        });

    ok(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

test("navigate method should disable._prevArrow if cannot navigate to past (century)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 3
        });

    ok(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

test("navigate method should disable._nextArrow if cannot navigate to future (century)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 3
        });

    ok(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

test("navigate should select date equal to _value", function() {
    var cal = new Calendar(div),
        value = new Date(2000, 10, 10);

    cal.navigateDown(value);

    cal.navigateToPast();

    equal(div.find("td.k-state-selected").length, 0);
});

test("navigateToPast should navigate to previous month when month view", function() {
    var cal = new Calendar(div),
        modified = new Date(cal.current()),
        names = kendo.culture().calendar.months.names;

    modified.setMonth(modified.getMonth() - 1, 1);

    cal.navigateToPast();

    equal(cal.current().getMonth(), modified.getMonth());
    ok(cal._title.html().indexOf(names[modified.getMonth()]) !== -1);
});

test("navigateToPast should navigate to previous year when year view", function() {
    var cal = new Calendar(div),
        modified = new Date(cal.current());

    cal._index = 1;
    modified.setFullYear(modified.getFullYear() - 1);

    cal.navigateToPast();

    ok(cal._title.html(), modified.getFullYear());
    deepEqual(cal.current(), modified);
});

test("navigateToPast should navigate to previous decade when decade view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;
    modified.setFullYear(modified.getFullYear() - 10);

    var start = modified.getFullYear() - modified.getFullYear() % 10;

    cal.navigateToPast();

    ok(cal._title.html(), start + "-" + (start + 9));
    deepEqual(cal.current(), modified);
});

test("navigateToPast should navigate to previous century when century view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 3;
    modified.setFullYear(modified.getFullYear() - 100);


    var start = modified.getFullYear() - modified.getFullYear() % 100;

    cal.navigateToPast();

    ok(cal._title.html(), start + "-" + (start + 99));
    deepEqual(cal.current(), modified);
});

test("navigateToFuture should navigate to next month when month view", function() {
    var cal = new Calendar(div, {value: new Date(2000, 10, 10), animation: false}),
        modified = new Date(cal._current),
        names = kendo.culture().calendar.months.names;

    cal._index = 0;
    modified.setMonth(modified.getMonth() + 1);

    cal.navigateToFuture();

    deepEqual(cal.current(), modified);
    ok(cal._title.html().indexOf(names[modified.getMonth()]) !== -1);
});

test("navigateToFuture should navigate to next year when year view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;
    modified.setFullYear(modified.getFullYear() + 1);

    cal.navigateToFuture();

    ok(cal._title.html(), modified.getFullYear());
    deepEqual(cal.current(), modified);
});

test("navigateToFuture should navigate to next decade when decade view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;
    modified.setFullYear(modified.getFullYear() + 10);


    var start = modified.getFullYear() - modified.getFullYear() % 10;

    cal.navigateToFuture();

    ok(cal._title.html(), start + "-" + (start + 9));
    deepEqual(cal.current(), modified);
});

test("navigateToFuture should navigate to next century when century view", function() {
    var cal = new Calendar(div, {
            max: new Date(2400, 10, 10),
            animation: false
        }),
        modified = new Date(cal._current);

    cal._index = 3;
    modified.setFullYear(modified.getFullYear() + 100);


    var start = modified.getFullYear() - modified.getFullYear() % 100;

    cal.navigateToFuture();

    ok(cal._title.html(), start + "-" + (start + 99));
    deepEqual(cal.current(), modified);
});

test("navigateUp should navigate upper view (year)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 0;

    cal.navigateUp();

    equal(cal._index, 1);
});

test("navigateUp should navigate upper view (decade)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateUp();

    equal(cal._index, 2);
});

test("navigateUp should navigate upper view (century)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;

    cal.navigateUp();

    equal(cal._index, 3);
    ok(cal._title.hasClass("k-state-disabled"));
});

test("navigateDown should navigate lower view (decade)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 3;

    cal.navigateDown(modified);

    equal(cal._index, 2);
});

test("navigateDown should navigate lower view (year)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;

    cal.navigateDown(modified);

    equal(cal._index, 1);
});

test("navigateDown should navigate lower view (month)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateDown(modified);

    equal(cal._index, 0);
});

test("navigateDown should navigate lower view (month)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateDown(modified);

    equal(cal._index, 0);
});

test("navigateDown with date navigate to cell's date", function() {
    var cal = stub(new Calendar(div, {animation: false}), "navigate"),
        value = new Date(2000, 10, 10);

    cal._index = 1;

    cal.navigateDown(value);

    equal(cal.calls("navigate"), 1);
    deepEqual(cal.args("navigate")[0], value);
});

test("navigateDown should call value method if _index === options.depth", function() {
    var cal = stub(new Calendar(div, {animation: false}), "value"),
        value = new Date(2000, 10, 10);

    cal.navigateDown(value);

    equal(cal.calls("value"), 1);
    deepEqual(cal.args("value")[0], value);
});

test("navigate should put in range passed date", function() {
    var cal = new Calendar(div, {animation: false}),
        value = new Date(1800, 10, 10);

    cal.navigate(value);

    deepEqual(cal.current(), cal.options.min);
});

test("value should select set selectedValue property", function() {
    var cal = new Calendar(div, {animation: false}),
        value = new Date(2000, 10, 10);

    cal.value(value);

    deepEqual(cal.value(), value);
});

test("value should return selectedValue", function() {
    var value = new Date(2000, 10, 10);
    var cal = new Calendar(div, {
        value: value
    })

    deepEqual(cal.value(), value);
});

test("value method should call navigate method with correct date", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {value: value});

    stub(cal, "navigate");

    cal.value(value);

    equal(cal.calls("navigate"), 1);
    deepEqual(cal.args("navigate")[0], value);
});

test("value method should update selection of the view", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {value: value});

        value.setDate(17);

        cal.value(value);

    ok(cal.element.find(".k-content td").eq(19).hasClass("k-state-selected"));
});

test("value should clear _value if null", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {min: value});

    cal.value(null);

    equal(cal.value(), null);
    equal(cal.element.find(".k-content td:has(k-state-selected)").length, 0);
});

test("value should not accept value lower than min", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {min: value});

    cal.value(new Date(1900, 10,10));

    equal(cal.value(), null);
});

test("value should not accept value bigger than max", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {max: value});

    cal.value(new Date(2900, 10,10));

    equal(cal.value(), null);
});

test("value should not accept invalid date", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {max: value});

    cal.value("dsadasDA");

    equal(cal.value(), null);
});

test("focus date depending on given value", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div);

    cal.focus();
    cal._focus(value);

    equal(cal._table.find(".k-state-focused").length, 1);
    equal(cal._table.find(".k-state-focused").text(), "10");
});

test("focus date in current view without navigating", function() {
    var value = new Date(2000,10,10),
        viewedValue = new Date(2000, 10, 15),
        cal = new Calendar(div, {value: value});

    cal.navigate(null, 1);

    cal.focus();
    cal._focus(value);

    equal(cal._table.find(".k-state-focused").length, 1);
    equal(cal._table.find(".k-state-focused").text(), "Nov");
});

test("focus should not call navigate if need to focus next cell in current decade view", function() {
    var value = new Date(2005,10,10),
        viewedValue = new Date(2004, 10, 15),
        cal = new Calendar(div);

    cal._current = viewedValue;
    cal._view = kendo.calendar.views[2];

    stub(cal, {navigate: cal.navigate});

    cal.focus();
    cal._focus(value);

    equal(cal.calls("navigate"), 0);
});

test("navigate should not re-render view if it was not changed", function() {
    var value = new Date(2000, 10, 10),
        cal = new Calendar(div, {value: value});

    stub(kendo.calendar.views[0], {
        content: kendo.calendar.views[0].content
    });

    cal.navigateDown(value);

    equal(kendo.calendar.views[0].calls("content"), 0);
});

test("min() returns current min value", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {min: value});

     var result = cal.min();

     deepEqual(result, value);
 });

test("min() should set min value value of the calendar", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div);

     cal.min(value);

     deepEqual(cal.options.min, value);
 });

test("min() should set min value value of the calendar", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div);

     cal.min(value);
     stub(cal, { navigate: cal.navigate });

     deepEqual(cal.options.min, value);
     equal(cal.calls("navigate"), 0);
});

test("min method navigates when custom template is defined", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {
        month: {
            empty: "nth"
        }
     });

     stub(cal, { _animate: cal._animate });
     cal.min(value);

     deepEqual(cal.options.min, value);
     equal(cal.calls("_animate"), 1);
});

test("max method persists selected value when max is in current month", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {
        max: value,
        value: value
     });

     cal.max(new Date(2000, 10, 11));

     equal(div.find("td.k-state-selected").length, 1);
});

test("Should navigate if min is bigger then _current", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(5); //should re-render in order to hide dates before 5th

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     equal(cal.calls("navigate"), 1);
});

test("Navigates widget when set min value bigger than selected date", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(15); //should re-render in order to hide dates before 5th

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     equal(cal.calls("navigate"), 1);
});

test("Should clear _value if less then min", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(13);

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     equal(cal.value(), null);
     equal(cal.calls("navigate"), 1);
});

test("max() returns current max value", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {max: value});

     var result = cal.max();

     deepEqual(result, value);
 });

test("max() should set max value value of the calendar", function() {
     var value = new Date(2050, 10, 10),
     cal = new Calendar(div);

     cal.max(value);
     stub(cal, { navigate: cal.navigate });

     deepEqual(cal.options.max, value);
     equal(cal.calls("navigate"), 0);
});

test("Should navigate if max is less then _current", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(15); //should re-render in order to hide dates after 15th

     stub(cal, { navigate: cal.navigate });

     cal.max(value);

     equal(cal.calls("navigate"), 1);
});

test("Should clear _value if bigger then max", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(5);

     stub(cal, { navigate: cal.navigate });

     cal.max(value);

     equal(cal.value(), null);
     equal(cal.calls("navigate"), 1);
});

test("_navigate should set correct date if month has 30 days", function() {
    var cal = new Calendar(div);
    cal._current = new Date(2099, 11, 31);

    stub(cal, "navigate");
    cal._navigate("_prevArrow", -1);

    equal(+cal.args("navigate")[0], +(new Date(2099, 10, 30)));
});

test("today link should be disabled when min() with bigger then today", function() {
    var today = new Date(),
        min = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
        cal = new Calendar(div);

    cal.min(min);

    stub(cal, "navigate");
    cal._today.click();

    ok(!div.find(".k-footer").find(".k-link").hasClass("k-nav-today"));
    ok(div.find(".k-footer").find(".k-link").hasClass("k-state-disabled"));
    equal(cal.calls("navigate"), 0);
});

test("today link should be disabled when max() with less then today", function() {
    var today = new Date(),
        max = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
        cal = new Calendar(div);

    cal.max(max);

    stub(cal, "navigate");
    cal._today.click();

    ok(!div.find(".k-footer").find(".k-link").hasClass("k-nav-today"));
    ok(div.find(".k-footer").find(".k-link").hasClass("k-state-disabled"));
    equal(cal.calls("navigate"), 0);
});

test("today link should be enabled on _footer(true)", function() {
    var cal = new Calendar(div);

    cal._toggle(false);
    cal._footer(cal.footer);

    ok(cal._today[0]);
    ok(!cal._today.hasClass("k-state-disabled"));
});

test("value method honors options.culture", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG",
        format: "D"
    }),
    value = new Date(2000, 10, 10);

    cal.value(kendo.toString(value, "D", "bg-BG"));

    deepEqual(cal.value(), value);
});

test("calendar is not focused when value changed with API", 1, function() {
    var calendar = new Calendar(div);
    calendar.value(null);

    equal(document.activeElement, document.body);
});

test("min method enables prev link", 1, function() {
    var calendar = new Calendar(div, {
        min: new Date(2000, 10, 10),
        value: new Date(2000, 10, 10)
    });

    calendar.min(new Date(2000, 9, 10));

    ok(!calendar._prevArrow.hasClass("k-state-disabled"));
});

test("min method navigates if selected date is null and current date is equal to min", 1, function() {
    var calendar = new Calendar(div);

    calendar.bind("navigate", function() {
        ok(true);
    });

    calendar.min(new Date());
});

test("max method enables prev link", 1, function() {
    var calendar = new Calendar(div, {
        max: new Date(2000, 10, 10),
        value: new Date(2000, 10, 10)
    });

    calendar.max(new Date(2000, 11, 10));

    ok(!calendar._nextArrow.hasClass("k-state-disabled"));
});

test("current method returns currently focused date", 1, function() {
    var calendar = new Calendar(div),
        today = new Date();

    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    equal(+calendar.current(), +today);
});

test("view method returns current view", 1, function() {
    var calendar = new Calendar(div);

    equal(calendar.view().name, "month");
});

test("setOptions re-renders current view", 1, function() {
    var calendar = new Calendar(div);

    calendar.setOptions({
        start: "year",
        depth: "year"
    });

    equal(calendar.view().name, "year");
});

test("setOptions updates footer", 1, function() {
    var calendar = new Calendar(div);

    calendar.setOptions({
        footer: false
    });

    ok(!div.find(".k-footer").is(":visible"));
});

test("setOptions preserves options.dates", 1, function() {
    var calendar = new Calendar(div, {
        dates: [new Date()]
    });

    calendar.setOptions({
        footer: false
    });

    equal(calendar.options.dates.length, 1);
});

test("setOptions updates options.dates", 1, function() {
    var calendar = new Calendar(div, {
        dates: [new Date()]
    });

    calendar.setOptions({
        dates: [new Date(), new Date()]
    });

    equal(calendar.options.dates.length, 2);
});

test("disabled date does get k-state-focused class", 1, function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "sa"]
    });
    var cell = calendar.element.find("td").eq(6);
    cell.trigger("click");
    var focused = cell.hasClass("k-state-focused");
    equal(focused, false);
});

test("disabled date does get k-state-focused class when calleback is used", 1, function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: function(date) {
            if (date && date.getDate() == 4) {
                return true
            } else {
                return false
            }
        }
    });
   equal($("tr").eq(2).find("td").hasClass("k-state-disabled"), true);
});

test("clicking today button does not set the widgets value", 1, function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "tu", "we", "th", "fr", "sa", "su"]
    });
    $(".k-nav-today").click();
    equal(calendar.value(), null);
});

test("today link is disabled if the respecitve date is disabled", 1, function() {
    var today = new Date();
    var max = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    var calendar = new Calendar(div, {
        disableDates: ["mo", "tu", "we", "th", "fr", "sa", "su"]
    });
    calendar.max(max);
    equal($(".k-footer>a").hasClass("k-state-disabled"), true);
});

test("_current is not set if date is disabled", 1, function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,12),
        disableDates: ["mo", "fr"]
    });

    calendar.value(new Date(2015,9,13));
    $("[data-value='2015/9/12']").trigger("click");

    equal(calendar.current().getDate(), 13);
});

test("_current is not set if date is disabled", 1, function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: ["mo", "th"]
    });

    calendar.value(new Date(2015,9,15));
    equal(calendar.value(), null);
});

})();
