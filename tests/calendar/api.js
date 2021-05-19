(function() {
var Calendar = kendo.ui.Calendar;
var div;

describe("kendo.ui.Calendar API", function () {
    beforeEach(function() {

        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        kendo.destroy(Mocha.fixture);
    });

it("navigate method render view using default values", function() {
    var cal = new Calendar(div),
        date = new Date(),
        firstVisibleDate = kendo.calendar.firstVisibleDay(date);

    assert.equal(cal.element.find(".k-content").find("a:first").html(), firstVisibleDate.getDate());
});

it("navigate method render view depending on given date and view", function() {
    var cal = new Calendar(div),
        date = new Date(2000, 10, 10);

    cal.navigate(date, 2);

    assert.equal(cal.element.find(".k-content").find("a:first").html(), "1999");
});

it("navigate method should disable._prevArrow if cannot navigate to past", function() {
    var date = new Date(2000, 10, 10),
    cal = new Calendar(div, {
        value: date,
        min: date
    });

    assert.isOk(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

it("navigate method should disable._nextArrow if cannot navigate to future", function() {
    var date = new Date(2000, 10, 10),
    cal = new Calendar(div, {
        value: date,
        max: date
    });

    assert.isOk(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

it("navigate method should disable._prevArrow if cannot navigate to past (year)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 1
        });

    assert.isOk(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

it("navigate method should disable._nextArrow if cannot navigate to future (year)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 1
        });

    assert.isOk(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

it("navigate method should disable._prevArrow if cannot navigate to past (decade)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 2
        });

    assert.isOk(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

it("navigate method should disable._nextArrow if cannot navigate to future (decade)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 2
        });

    assert.isOk(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

it("navigate method should disable._prevArrow if cannot navigate to past (century)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            min: date,
            firstView: 3
        });

    assert.isOk(div.find(".k-nav-prev").hasClass("k-state-disabled"));
});

it("navigate method should disable._nextArrow if cannot navigate to future (century)", function() {
    var date = new Date(2000, 10, 10),
        cal = new Calendar(div, {
            value: date,
            max: date,
            firstView: 3
        });

    assert.isOk(div.find(".k-nav-next").hasClass("k-state-disabled"));
});

it("navigate should select date equal to _value", function() {
    var cal = new Calendar(div),
        value = new Date(2000, 10, 10);

    cal.navigateDown(value);

    cal.navigateToPast();

    assert.equal(div.find("td.k-state-selected").length, 0);
});

it("navigateToPast should navigate to previous month when month view", function() {
    var cal = new Calendar(div),
        modified = new Date(cal.current()),
        names = kendo.culture().calendar.months.names;

    modified.setMonth(modified.getMonth() - 1, 1);

    cal.navigateToPast();

    assert.equal(cal.current().getMonth(), modified.getMonth());
    assert.isOk(cal._title.html().indexOf(names[modified.getMonth()]) !== -1);
});

it("navigateToPast should navigate to previous year when year view", function() {
    var cal = new Calendar(div),
        modified = new Date(cal.current());

    cal._index = 1;
    modified.setFullYear(modified.getFullYear() - 1);

    cal.navigateToPast();

    assert.isOk(cal._title.html(), modified.getFullYear());
    assert.deepEqual(cal.current(), modified);
});

it("navigateToPast should navigate to previous decade when decade view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;
    modified.setFullYear(modified.getFullYear() - 10);

    var start = modified.getFullYear() - modified.getFullYear() % 10;

    cal.navigateToPast();

    assert.isOk(cal._title.html(), start + "-" + (start + 9));
    assert.deepEqual(cal.current(), modified);
});

it("navigateToPast should navigate to previous century when century view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 3;
    modified.setFullYear(modified.getFullYear() - 100);


    var start = modified.getFullYear() - modified.getFullYear() % 100;

    cal.navigateToPast();

    assert.isOk(cal._title.html(), start + "-" + (start + 99));
    assert.deepEqual(cal.current(), modified);
});

it("navigateToFuture should navigate to next month when month view", function() {
    var cal = new Calendar(div, {value: new Date(2000, 10, 10), animation: false}),
        modified = new Date(cal._current),
        names = kendo.culture().calendar.months.names;

    cal._index = 0;
    modified.setMonth(modified.getMonth() + 1);

    cal.navigateToFuture();

    assert.deepEqual(cal.current(), modified);
    assert.isOk(cal._title.html().indexOf(names[modified.getMonth()]) !== -1);
});

it("navigateToFuture should navigate to next year when year view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;
    modified.setFullYear(modified.getFullYear() + 1);

    cal.navigateToFuture();

    assert.isOk(cal._title.html(), modified.getFullYear());
    assert.deepEqual(cal.current(), modified);
});

it("navigateToFuture should navigate to next decade when decade view", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;
    modified.setFullYear(modified.getFullYear() + 10);


    var start = modified.getFullYear() - modified.getFullYear() % 10;

    cal.navigateToFuture();

    assert.isOk(cal._title.html(), start + "-" + (start + 9));
    assert.deepEqual(cal.current(), modified);
});

it("navigateToFuture should navigate to next century when century view", function() {
    var cal = new Calendar(div, {
            max: new Date(2400, 10, 10),
            animation: false
        }),
        modified = new Date(cal._current);

    cal._index = 3;
    modified.setFullYear(modified.getFullYear() + 100);


    var start = modified.getFullYear() - modified.getFullYear() % 100;

    cal.navigateToFuture();

    assert.isOk(cal._title.html(), start + "-" + (start + 99));
    assert.deepEqual(cal.current(), modified);
});

it("navigateUp should navigate upper view (year)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 0;

    cal.navigateUp();

    assert.equal(cal._index, 1);
});

it("navigateUp should navigate upper view (decade)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateUp();

    assert.equal(cal._index, 2);
});

it("navigateUp should navigate upper view (century)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;

    cal.navigateUp();

    assert.equal(cal._index, 3);
    assert.isOk(cal._title.hasClass("k-state-disabled"));
});

it("navigateDown should navigate lower view (decade)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 3;

    cal.navigateDown(modified);

    assert.equal(cal._index, 2);
});

it("navigateDown should navigate lower view (year)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 2;

    cal.navigateDown(modified);

    assert.equal(cal._index, 1);
});

it("navigateDown should navigate lower view (month)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateDown(modified);

    assert.equal(cal._index, 0);
});

it("navigateDown should navigate lower view (month)", function() {
    var cal = new Calendar(div, {animation: false}),
        modified = new Date(cal._current);

    cal._index = 1;

    cal.navigateDown(modified);

    assert.equal(cal._index, 0);
});

it("navigateDown with date navigate to cell's date", function() {
    var cal = stub(new Calendar(div, {animation: false}), "navigate"),
        value = new Date(2000, 10, 10);

    cal._index = 1;

    cal.navigateDown(value);

    assert.equal(cal.calls("navigate"), 1);
    assert.deepEqual(cal.args("navigate")[0], value);
});

it("navigateDown should call value method if _index === options.depth", function() {
    var cal = stub(new Calendar(div, {animation: false}), "value"),
        value = new Date(2000, 10, 10);

    cal.navigateDown(value);

    assert.equal(cal.calls("value"), 1);
    assert.deepEqual(cal.args("value")[0], value);
});

it("navigate should put in range passed date", function() {
    var cal = new Calendar(div, {animation: false}),
        value = new Date(1800, 10, 10);

    cal.navigate(value);

    assert.deepEqual(cal.current(), cal.options.min);
});

it("value should select set selectedValue property", function() {
    var cal = new Calendar(div, {animation: false}),
        value = new Date(2000, 10, 10);

    cal.value(value);

    assert.deepEqual(cal.value(), value);
});

it("value should return selectedValue", function() {
    var value = new Date(2000, 10, 10);
    var cal = new Calendar(div, {
        value: value
    })

    assert.deepEqual(cal.value(), value);
});

it("value method should call navigate method with correct date", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {value: value});

    stub(cal, "navigate");

    cal.value(value);

    assert.equal(cal.calls("navigate"), 1);
    assert.deepEqual(cal.args("navigate")[0], value);
});

it("value method should update selection of the view", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {value: value});

        value.setDate(17);

        cal.value(value);

    assert.isOk(cal.element.find(".k-content td").eq(19).hasClass("k-state-selected"));
});

it("value should clear _value if null", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {min: value});

    cal.value(null);

    assert.equal(cal.value(), null);
    assert.equal(cal.element.find(".k-content td:has(k-state-selected)").length, 0);
});

it("value should not accept value lower than min", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {min: value});

    cal.value(new Date(1900, 10,10));

    assert.equal(cal.value(), null);
});

it("value should not accept value bigger than max", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {max: value});

    cal.value(new Date(2900, 10,10));

    assert.equal(cal.value(), null);
});

it("value should not accept invalid date", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {max: value});

    cal.value("dsadasDA");

    assert.equal(cal.value(), null);
});

it("focus date depending on given value", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div);

    cal.focus();
    cal._focus(value);

    assert.equal(cal._table.find(".k-state-focused").length, 1);
    assert.equal(cal._table.find(".k-state-focused").text(), "10");
});

it("focus date in current view without navigating", function() {
    var value = new Date(2000,10,10),
        viewedValue = new Date(2000, 10, 15),
        cal = new Calendar(div, {value: value});

    cal.navigate(null, 1);

    cal.focus();
    cal._focus(value);

    assert.equal(cal._table.find(".k-state-focused").length, 1);
    assert.equal(cal._table.find(".k-state-focused").text(), "Nov");
});

it("focus should not call navigate if need to focus next cell in current decade view", function() {
    var value = new Date(2005,10,10),
        viewedValue = new Date(2004, 10, 15),
        cal = new Calendar(div);

    cal._current = viewedValue;
    cal._view = kendo.calendar.views[2];

    stub(cal, {navigate: cal.navigate});

    cal.focus();
    cal._focus(value);

    assert.equal(cal.calls("navigate"), 0);
});

it("navigate should not re-render view if it was not changed", function() {
    var value = new Date(2000, 10, 10),
        cal = new Calendar(div, {value: value});

    stub(kendo.calendar.views[0], {
        content: kendo.calendar.views[0].content
    });

    cal.navigateDown(value);

    assert.equal(kendo.calendar.views[0].calls("content"), 0);
});

it("min() returns current min value", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {min: value});

     var result = cal.min();

     assert.deepEqual(result, value);
 });

it("min() should set min value value of the calendar", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div);

     cal.min(value);

     assert.deepEqual(cal.options.min, value);
 });

it("min() should set min value value of the calendar", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div);

     cal.min(value);
     stub(cal, { navigate: cal.navigate });

     assert.deepEqual(cal.options.min, value);
     assert.equal(cal.calls("navigate"), 0);
});

it("min method navigates when custom template is defined", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {
        month: {
            empty: "nth"
        }
     });

     stub(cal, { _animate: cal._animate });
     cal.min(value);

     assert.deepEqual(cal.options.min, value);
     assert.equal(cal.calls("_animate"), 1);
});

it("max method persists selected value when max is in current month", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {
        max: value,
        value: value
     });

     cal.max(new Date(2000, 10, 11));

     assert.equal(div.find("td.k-state-selected").length, 1);
});

it("Should navigate if min is bigger then _current", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(5); //should re-render in order to hide dates before 5th

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     assert.equal(cal.calls("navigate"), 1);
});

it("Navigates widget when set min value bigger than selected date", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(15); //should re-render in order to hide dates before 5th

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     assert.equal(cal.calls("navigate"), 1);
});

it("Should clear _value if less then min", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(13);

     stub(cal, { navigate: cal.navigate });

     cal.min(value);

     assert.equal(cal.value(), null);
     assert.equal(cal.calls("navigate"), 1);
});

it("max() returns current max value", function() {
     var value = new Date(2000, 10, 10),
     cal = new Calendar(div, {max: value});

     var result = cal.max();

     assert.deepEqual(result, value);
 });

it("max() should set max value value of the calendar", function() {
     var value = new Date(2050, 10, 10),
     cal = new Calendar(div);

     cal.max(value);
     stub(cal, { navigate: cal.navigate });

     assert.deepEqual(cal.options.max, value);
     assert.equal(cal.calls("navigate"), 0);
});

it("Should navigate if max is less then _current", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(15); //should re-render in order to hide dates after 15th

     stub(cal, { navigate: cal.navigate });

     cal.max(value);

     assert.equal(cal.calls("navigate"), 1);
});

it("Should clear _value if bigger then max", function() {
     var value = new Date(2000, 10, 10),
         cal = new Calendar(div, {value: value});

     value.setDate(5);

     stub(cal, { navigate: cal.navigate });

     cal.max(value);

     assert.equal(cal.value(), null);
     assert.equal(cal.calls("navigate"), 1);
});

it("_navigate should set correct date if month has 30 days", function() {
    var cal = new Calendar(div);
    cal._current = new Date(2099, 11, 31);

    stub(cal, "navigate");
    cal._navigate("_prevArrow", -1);

    assert.equal(+cal.args("navigate")[0], +(new Date(2099, 10, 30)));
});

it("today link should be disabled when min() with bigger then today", function() {
    var today = new Date(),
        min = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()),
        cal = new Calendar(div);

    cal.min(min);

    stub(cal, "navigate");
    cal._today.click();

    assert.isOk(!div.find(".k-footer").find(".k-link").hasClass("k-nav-today"));
    assert.isOk(div.find(".k-footer").find(".k-link").hasClass("k-state-disabled"));
    assert.equal(cal.calls("navigate"), 0);
});

it("today link should be disabled when max() with less then today", function() {
    var today = new Date(),
        max = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
        cal = new Calendar(div);

    cal.max(max);

    stub(cal, "navigate");
    cal._today.click();

    assert.isOk(!div.find(".k-footer").find(".k-link").hasClass("k-nav-today"));
    assert.isOk(div.find(".k-footer").find(".k-link").hasClass("k-state-disabled"));
    assert.equal(cal.calls("navigate"), 0);
});

it("today link should be enabled on _footer(true)", function() {
    var cal = new Calendar(div);

    cal._toggle(false);
    cal._footer(cal.footer);

    assert.isOk(cal._today[0]);
    assert.isOk(!cal._today.hasClass("k-state-disabled"));
});

it("value method honors options.culture", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG",
        format: "D"
    }),
    value = new Date(2000, 10, 10);

    cal.value(kendo.toString(value, "D", "bg-BG"));

    assert.deepEqual(cal.value(), value);
});

it("calendar is not focused when value changed with API", function() {
    var calendar = new Calendar(div);
    calendar.value(null);

    assert.equal(document.activeElement, document.body);
});

it("min method enables prev link", function() {
    var calendar = new Calendar(div, {
        min: new Date(2000, 10, 10),
        value: new Date(2000, 10, 10)
    });

    calendar.min(new Date(2000, 9, 10));

    assert.isOk(!calendar._prevArrow.hasClass("k-state-disabled"));
});

it("min method navigates if selected date is null and current date is equal to min", function() {
    var calendar = new Calendar(div);

    calendar.bind("navigate", function() {
        assert.isOk(true);
    });

    calendar.min(new Date());
});

it("max method enables prev link", function() {
    var calendar = new Calendar(div, {
        max: new Date(2000, 10, 10),
        value: new Date(2000, 10, 10)
    });

    calendar.max(new Date(2000, 11, 10));

    assert.isOk(!calendar._nextArrow.hasClass("k-state-disabled"));
});

it("current method returns currently focused date", function() {
    var calendar = new Calendar(div),
        today = new Date();

    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    assert.equal(+calendar.current(), +today);
});

it("view method returns current view", function() {
    var calendar = new Calendar(div);

    assert.equal(calendar.view().name, "month");
});

it("setOptions re-renders current view", function() {
    var calendar = new Calendar(div);

    calendar.setOptions({
        start: "year",
        depth: "year"
    });

    assert.equal(calendar.view().name, "year");
});

it("setOptions updates footer", function() {
    var calendar = new Calendar(div);

    calendar.setOptions({
        footer: false
    });

    assert.isOk(!div.find(".k-footer").is(":visible"));
});

it("setOptions preserves options.dates", function() {
    var calendar = new Calendar(div, {
        dates: [new Date()]
    });

    calendar.setOptions({
        footer: false
    });

    assert.equal(calendar.options.dates.length, 1);
});

it("setOptions allows clearing options.dates", function() {
    var calendar = new Calendar(div, {
        dates: [new Date()]
    });

    calendar.setOptions({
        dates: []
    });

    assert.equal(calendar.options.dates.length, 0);

    calendar.setOptions({
        dates: null
    });

    assert.equal(calendar.options.dates.length, 0);
});

it("setOptions updates options.dates", function() {
    var calendar = new Calendar(div, {
        dates: [new Date()]
    });

    calendar.setOptions({
        dates: [new Date(), new Date()]
    });

    assert.equal(calendar.options.dates.length, 2);
});

it("setOptions should destroy selectable", function() {
    var value = new Date(2000,10,10),
        cal = new Calendar(div, {value: value});

    stub(cal, "_destroySelectable");

    cal.setOptions({});

    assert.equal(cal.calls("_destroySelectable"), 1);
});

it("disabled date does get k-state-focused class", function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["MON", "sa"]
    });
    var cell = calendar.element.find("td").eq(6);
    cell.trigger("click");
    var focused = cell.hasClass("k-state-focused");
    assert.equal(focused, false);
});

it("dates are disabled when array of dates is used", function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
        disableDates: [new Date(2015,9,12)]
    });
    var cell = calendar.element.find("td").eq(15);
    var disabled = cell.hasClass("k-state-disabled");
    assert.equal(disabled, true);
});


it("disabled date does get k-state-focused class when calleback is used", function() {
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
   assert.equal($("tr").eq(2).find("td").hasClass("k-state-disabled"), true);
});

it("clicking today button does not set the widgets value", function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "tu", "we", "th", "fr", "sa", "su"]
    });
    $(".k-nav-today").click();
    assert.equal(calendar.value(), null);
});

it("today link is disabled if the respecitve date is disabled", function() {
    var today = new Date();
    var max = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    var calendar = new Calendar(div, {
        disableDates: ["mo", "tu", "we", "th", "fr", "sa", "su"]
    });
    calendar.max(max);
    assert.equal($(".k-footer>a").hasClass("k-state-disabled"), true);
});

it("_current is not set if date is disabled", function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,12),
        disableDates: ["mo", "fr"]
    });

    calendar.value(new Date(2015,9,13));
    $("[data-value='2015/9/12']").trigger("click");

    assert.equal(calendar.current().getDate(), 13);
});

it("_current is not set if date is disabled", function() {
    var calendar = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: ["mo", "th"]
    });

    calendar.value(new Date(2015,9,15));
    assert.equal(calendar.value(), null);
});

it("selectDates selects unique dates", function() {
    var calendar = new Calendar(div, {
        selectDates: [new Date(2018, 0, 10), new Date(2018, 0, 11)],
        selectable: "multiple"
    });

    calendar.selectDates([new Date(2018, 0, 20), new Date(2018, 0, 20)]);

    assert.deepEqual(calendar.selectDates(), [new Date(2018, 0, 20)]);
});

it("selectDates selects empty array", function() {
    var calendar = new Calendar(div, {
        selectDates: [new Date(2018, 0, 10), new Date(2018, 0, 11)],
        selectable: "multiple"
    });

    calendar.selectDates([]);

    assert.deepEqual(calendar.selectDates(), []);
});

it("calling navigateToFuture does not throw error", function() {
    var calendar = new Calendar(div, {
        start: "century",
        selectable: "multiple"
    });

    calendar.navigateToPast();
    calendar.navigateToFuture();

    assert.isOk(calendar._current);
});

    });
}());
