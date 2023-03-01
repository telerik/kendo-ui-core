(function() {

var Calendar = kendo.ui.Calendar;
var div;

describe("kendo.ui.Calendar initialization", function() {
    beforeEach(function() {

        div = $("<div />").appendTo(Mocha.fixture);
    });
    afterEach(function() {

        kendo.destroy(Mocha.fixture);
    });

it("if format is {0: format} should strip it", function() {
    var cal = new Calendar(div, { format: "{0:MM/dd/yyyy}" });

    assert.equal(cal.options.format, "MM/dd/yyyy");
});

it("if start is not correct should set MONTH view", function() {
    var cal = new Calendar(div, { start: "not real view" });
    var view = cal.view();

    assert.equal(view.name, "month");
});

it("if depth is bigger then start set it to MONTH view", function() {
    var cal = new Calendar(div, { depth: "year" });

    assert.equal(cal.options.depth, "month");
});

it("define current", function() {
    var cal = new Calendar(div),
        current = cal.current(),
        today = new Date();

    assert.equal(current.getFullYear(), today.getFullYear());
    assert.equal(current.getMonth(), today.getMonth());
    assert.equal(current.getDate(), today.getDate());
});

it("render the header", function() {
    var cal = new Calendar(div);
    var header = cal.element.find(".k-header");

    assert.isOk(header[0]);
    assert.isOk(header.find(".k-calendar-nav-prev")[0]);
    assert.isOk(header.find(".k-calendar-nav-next")[0]);
    assert.isOk(header.find(".k-calendar-nav-fast")[0]);
});

it("render table after header", function() {
    var cal = new Calendar(div);

    assert.isOk(cal.element.find(".k-content")[0]);
});

it("render month view when init", function() {
    var date = new Date(2011, 10, 10);
    var cal = new Calendar(div, { value: date });

    assert.equal(div.find(".k-calendar-nav-fast").find(".k-button-text").html(), "November 2011");
    assert.isOk(!!div.find(".k-calendar-nav-fast").attr("title"));
    assert.equal(div.find(".k-calendar-nav-fast").attr("title"), cal.options.messages.navigateTo + cal.options.messages.parentViews.month);
    assert.equal(div.find(".k-content").find("a").length, 42);
});

it("render year view when init", function() {
    var date = new Date(2011, 10, 10);
    var cal = new Calendar(div, { value: date, start: "year" });
    var anchors = cal.element.find(".k-content").find("a");
    var january = kendo.culture().calendar.months.namesAbbr[0];

    assert.equal(div.find(".k-calendar-nav-fast").find(".k-button-text").html(), "2011");
    assert.isOk(!!div.find(".k-calendar-nav-fast").attr("title"));
    assert.equal(div.find(".k-calendar-nav-fast").attr("title"), cal.options.messages.navigateTo + cal.options.messages.parentViews.year);
    assert.equal(anchors.length, 12);
    assert.equal(anchors.eq(0).html(), january);
});

it("render decade view when init", function() {
    var date = new Date(2011, 10, 10),
    cal = new Calendar(div, { start: "decade", value: date }),
    anchors = cal.element.find(".k-content").find("a");

    assert.equal(div.find(".k-calendar-nav-fast").find(".k-button-text").html(), "2010-2019");
    assert.isOk(!!div.find(".k-calendar-nav-fast").attr("title"));
    assert.equal(div.find(".k-calendar-nav-fast").attr("title"), cal.options.messages.navigateTo + cal.options.messages.parentViews.decade);
    assert.equal(anchors.length, 12);
    assert.equal(anchors.eq(0).html(), "2009");
});

it("render century view when init", function() {
    var date = new Date(2011, 10, 10),
    cal = new Calendar(div, { start: "century", value: date, max: new Date(2200, 10, 10) }),
    anchors = cal.element.find(".k-content").find("a");

    assert.equal(div.find(".k-calendar-nav-fast").find(".k-button-text").html(), "2000-2099");
    assert.isOk(!div.find(".k-calendar-nav-fast").attr("title"));
    assert.equal(anchors.length, 12);
    assert.equal(anchors.eq(0).html(), "1990 - 1999");
});

it("calendar should wire TD click event", function() {
    var cal = new Calendar(div);

    stub(cal, "navigateDown");

    cal.element.find("td:has(.k-link)").eq(0).click();

    assert.equal(cal.calls("navigateDown"), 1);
});

it("calendar should wire header buttons", function() {
    var cal = new Calendar(div);
    var links, current, view;

    stub(cal, {
        navigateToPast: cal.navigateToPast,
        navigateToFuture: cal.navigateToFuture,
        navigateUp: cal.navigateUp
    });

    links = cal.element.find(".k-header").find(".k-button");

    current = new Date(cal.current());
    links.eq(0).click();

    assert.notEqual(+cal.current(), +current);

    current = new Date(cal.current());
    links.eq(2).click();

    assert.notEqual(+cal.current(), +current);

    view = cal.view();
    links.eq(1).click();

    assert.notEqual(cal.view().name, view.name);
});

it("calendar should show hover state when hover TD", function() {
    var cal = new Calendar(div);

    var td = cal.element.find("td:has(.k-link)").eq(0);

    td.mouseenter();

    assert.isOk(td.hasClass("k-hover"));
});

it("calendar should remove hover state from TD", function() {
    var cal = new Calendar(div);

    var td = cal.element.find("td:has(.k-link)").eq(0);

    td.mouseenter();
    td.mouseleave();

    assert.isOk(!td.hasClass("k-hover"));
});

it("today link should have k-nav-today", function() {
    var cal = new Calendar(div);

    stub(cal, "navigate");

    var link = div.find(".k-footer").find(".k-button-md");

    link.click();

    assert.isOk(link.hasClass("k-calendar-nav-today"));
    assert.isOk(!link.hasClass("k-disabled"));
    assert.equal(cal.calls("navigate"), 1);
});

it("today link should not have k-nav-today", function() {
    var today = new Date(),
        cal = new Calendar(div, {
            min: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
        });

    stub(cal, "_todayClick");

    var link = div.find(".k-footer").find(".k-button-md");
    link.click();

    assert.isOk(!link.hasClass("k-calendar-nav-today"));
    assert.isOk(link.hasClass("k-disabled"));
    assert.equal(cal.calls("_todayClick"), 0);
});

it("today link sets today not now", function() {
    var today = new Date(),
        cal = new Calendar(div, {
            max: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 12, 12)
        });

    stub(cal, "_todayClick");

    div.find(".k-footer").find(".k-button-md").click();

    assert.equal(+cal.value(), +new Date(today.getFullYear(), today.getMonth(), today.getDate()));
});

it("footer:false should not render footer", function() {
    var cal = new Calendar(div, {
        footer: false
    });

    assert.isOk(!cal.footer);
});

it("_footer(false) should hide the footer", function() {
    var cal = new Calendar(div);

    cal._footer(false);

    assert.isOk(!cal.element.find(".k-footer").is("visible"));
});

it("footer:true should render footer", function() {
    var cal = new Calendar(div, {
        footer: true
    });

    assert.isOk(cal.footer);
});

it("Calendar uses culture settings specified through culture option", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG"
    });

    var culture = kendo.getCulture("bg-BG");
    var format = culture.calendars.standard.patterns["d"];

    assert.equal(cal.options.format, format);
});

it("footer honours culture option", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG"
    });

    var culture = kendo.getCulture("bg-BG");
    var format = culture.calendars.standard.patterns["d"];
    var link = div.find(".k-footer").find(".k-button-md");

    assert.equal(link.children().first().html(), kendo.toString(new Date(), "D", culture));
    assert.equal(link.attr("title"), kendo.toString(new Date(), "D", culture));
});

it("Calendar removes focused style on initial rendering", function() {
    var cal = new Calendar(div);

    assert.isOk(!cal._cell.hasClass("k-focus"));
});

it("Calendar adds  focused on focus", function() {
    var cal = new Calendar(div);

    cal._table.focus();

    assert.isOk(cal._cell.hasClass("k-focus"));
});

it("Calendar removes  focused on blur", function() {
    var cal = new Calendar(div);

    cal._table.focus();
    cal._table.blur();

    assert.isOk(!cal._cell.hasClass("k-focus"));
});

it("Widget does not fall into infinitive loop", function() {
    var cal = new Calendar(div, {
        value: '2000/10/5'
    });

    assert.isOk(true);
});

it("Widget sets disabled class correctly when callback is set", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: function(date) {
            if (date.getDate() == 27) {
                return true;
            }
        }
        });
    assert.isOk(cal.element.find("tbody>tr>td").first().hasClass("k-disabled"));
});

it("Widget sets disabled class correctly when array is set", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: ["mo", "su"]
    });
    assert.isOk($('tr').eq(2).children().first().hasClass("k-disabled"));
});

it("Widget value is not set if value is disabled date", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "sa"]
    });
    assert.isOk(cal.element.find("tr").eq(1).children().last().hasClass("k-disabled"));
});

it("Widget value is correctly after initialized with disabled value", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "sa"]
    });
    cal.value(new Date(2015,9,4));
    assert.isOk(cal.element.find('tr').eq(2).children().first().hasClass("k-selected"));
});

it("Year 0 should initialize year 1900", function() {
    var cal = new Calendar(div, {
        value: new Date(0, 1, 1)
    });

    assert.equal(1900, cal.value().getFullYear());
});

it("Full year 0 should initialize year 1900", function() {
    var year = 1;
    var date = new Date(2016, 1, 1);
    date.setFullYear(year);

    var cal = new Calendar(div, { value: date, min: date });

    assert.equal(year, cal.value().getFullYear());
});

it("Year 99 should initialize year 1999", function() {
    var cal = new Calendar(div, {
        value: new Date(99, 1, 1)
    });

    assert.equal(1999, cal.value().getFullYear());
});

it("Full year 99 should initialize year 1900", function() {
    var year = 99;
    var date = new Date(2016, 1, 1);
    date.setFullYear(year);

    var cal = new Calendar(div, { value: date, min: date });

    assert.equal(year, cal.value().getFullYear());
});

it("Century view support dates less then 200 year", function() {
    var minDate = new Date(Date.UTC(1000, 0, 1));
    minDate.setUTCFullYear(100); // set year to 100

    var cal = new Calendar(div, {
        min: minDate,
        value: new Date(200, 0, 1),
        start: "century"
    });

    // navigate to previous century
    var header = cal.element.find(".k-header");
    var prevButton = cal.element.find(".k-header .k-calendar-nav-prev");
    prevButton.click();

    // first decade should be 100 - 1009
    var firstDecade = cal.element.find(".k-content td:has(.k-link:not(.k-disabled)):not(.k-out-of-range) .k-link");
    assert.equal(firstDecade.html(), "100 - 109");
});


it("Century view supports min value equal to 0001-01-01", function() {
    var minDate = new Date(Date.UTC(1000, 0, 1));
    minDate.setUTCFullYear(1); // set year to 0001

    var cal = new Calendar(div, {
        min: minDate,
        value: new Date(1900, 0, 1),
        start: "century"
    });

    assert.equal(cal.min(), minDate);
});

    });
}());
