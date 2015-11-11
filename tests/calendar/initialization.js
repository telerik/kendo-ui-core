(function(){

var Calendar = kendo.ui.Calendar;
var div;

module("kendo.ui.Calendar initialization", {
    setup: function() {
        kendo.effects.disable();
        div = $("<div />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.effects.enable();
        kendo.destroy(QUnit.fixture);
    }
});

test("if format is {0: format} should strip it", function() {
    var cal = new Calendar(div, {format: "{0:MM/dd/yyyy}"});

    equal(cal.options.format, "MM/dd/yyyy");
});

test("if start is not correct should set MONTH view", function() {
    var cal = new Calendar(div, {start: "not real view"});
    var view = cal.view();

    equal(view.name, "month");
});

test("if depth is bigger then start set it to MONTH view", function() {
    var cal = new Calendar(div, {depth: "year"});

    equal(cal.options.depth, "month");
});

test("define current", function() {
    var cal = new Calendar(div),
        current = cal.current(),
        today = new Date();

    equal(current.getFullYear(), today.getFullYear());
    equal(current.getMonth(), today.getMonth());
    equal(current.getDate(), today.getDate());
});

test("render the header", function() {
    var cal = new Calendar(div);
    var header = cal.element.find(".k-header");

    ok(header[0]);
    ok(header.find(".k-nav-prev")[0]);
    ok(header.find(".k-nav-next")[0]);
    ok(header.find(".k-nav-fast")[0]);
});

test("render table after header", function() {
    var cal = new Calendar(div);

    ok(cal.element.find(".k-content")[0]);
});

test("render month view when init", function() {
    var date = new Date(2011, 10, 10);
    var cal = new Calendar(div, {value: date});

    equal(div.find(".k-nav-fast").html(), "November 2011");
    equal(div.find(".k-content").find("a").length, 42);
});

test("render year view when init", function() {
    var date = new Date(2011, 10, 10);
    var cal = new Calendar(div, { value: date, start: "year" });
    var anchors = cal.element.find(".k-content").find("a");
    var january = kendo.culture().calendar.months.namesAbbr[0];

    equal(div.find(".k-nav-fast").html(), "2011");

    equal(anchors.length, 12);
    equal(anchors.eq(0).html(), january);
});

test("render decade view when init", function() {
    var date = new Date(2011, 10, 10),
    cal = new Calendar(div, { start: "decade", value: date }),
    anchors = cal.element.find(".k-content").find("a");

    equal(div.find(".k-nav-fast").html(), "2010-2019");
    equal(anchors.length, 12);
    equal(anchors.eq(0).html(), "2009");
});

test("render century view when init", function() {
    var date = new Date(2011, 10, 10),
    cal = new Calendar(div, { start: "century", value: date, max: new Date(2200, 10, 10) }),
    anchors = cal.element.find(".k-content").find("a");

    equal(div.find(".k-nav-fast").html(), "2000-2099");
    equal(anchors.length, 12);
    equal(anchors.eq(0).html(), "1990 - 1999");
});

test("calendar should wire TD click event", function() {
    var cal = new Calendar(div);

    stub(cal, "navigateDown");

    cal.element.find("td:has(.k-link)").eq(0).click();

    equal(cal.calls("navigateDown"), 1);
});

test("calendar should wire header buttons", 3, function() {
    var cal = new Calendar(div);
    var links, current, view;

    stub(cal, {
        navigateToPast: cal.navigateToPast,
        navigateToFuture: cal.navigateToFuture,
        navigateUp: cal.navigateUp
    });

    links = cal.element.find(".k-header").find(".k-link");

    current = new Date(cal.current());
    links.eq(0).click();

    notEqual(+cal.current(), +current);

    current = new Date(cal.current());
    links.eq(2).click();

    notEqual(+cal.current(), +current);

    view = cal.view();
    links.eq(1).click();

    notEqual(cal.view().name, view.name);
});

test("calendar should show hover state when hover TD", function() {
    var cal = new Calendar(div);

    var td = cal.element.find("td:has(.k-link)").eq(0);

    td.mouseenter();

    ok(td.hasClass("k-state-hover"));
});

test("calendar should remove hover state from TD", function() {
    var cal = new Calendar(div);

    var td = cal.element.find("td:has(.k-link)").eq(0);

    td.mouseenter();
    td.mouseleave();

    ok(!td.hasClass("k-state-hover"));
});

test("calendar should show hover state to the header elements", function() {
    var cal = new Calendar(div);

    var links = cal.element.find(".k-header").find(".k-link");

    links.eq(0).mouseenter();
    links.eq(1).mouseenter();
    links.eq(2).mouseenter();

    ok(links.eq(0).hasClass("k-state-hover"));
    ok(links.eq(1).hasClass("k-state-hover"));
    ok(links.eq(2).hasClass("k-state-hover"));
});

test("calendar should remove hover state to the header elements", function() {
    var cal = new Calendar(div);

    var links = cal.element.find(".k-header").find(".k-link");

    links.eq(0).mouseenter();
    links.eq(1).mouseenter();
    links.eq(2).mouseenter();

    links.eq(0).mouseleave();
    links.eq(1).mouseleave();
    links.eq(2).mouseleave();

    ok(!links.eq(0).hasClass("k-state-hover"));
    ok(!links.eq(1).hasClass("k-state-hover"));
    ok(!links.eq(2).hasClass("k-state-hover"));
});

test("today link should have k-nav-today", function() {
    var cal = new Calendar(div);

    stub(cal, "navigate");

    var link = div.find(".k-footer").find(".k-link");

    link.click();

    ok(link.hasClass("k-nav-today"));
    ok(!link.hasClass("k-state-disabled"));
    equal(cal.calls("navigate"), 1);
});

test("today link should not have k-nav-today", function() {
    var today = new Date(),
        cal = new Calendar(div, {
            min: new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
        });

    stub(cal, "_todayClick");

    var link = div.find(".k-footer").find(".k-link");
    link.click();

    ok(!link.hasClass("k-nav-today"));
    ok(link.hasClass("k-state-disabled"));
    equal(cal.calls("_todayClick"), 0);
});

test("today link sets today not now", function() {
    var today = new Date(),
        cal = new Calendar(div, {
            max: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 12, 12)
        });

    stub(cal, "_todayClick");

    div.find(".k-footer").find(".k-link").click();

    equal(+cal.value(), +new Date(today.getFullYear(), today.getMonth(), today.getDate()));
});

test("footer:false should not render footer", function() {
    var cal = new Calendar(div, {
        footer: false
    });

    ok(!cal.footer);
});

test("_footer(false) should hide the footer", function() {
    var cal = new Calendar(div);

    cal._footer(false);

    ok(!cal.element.find(".k-footer").is("visible"));
});

test("Calendar uses culture settings specified through culture option", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG"
    });

    var culture = kendo.getCulture("bg-BG");
    var format = culture.calendars.standard.patterns["d"];

    equal(cal.options.format, format);
});

test("footer honours culture option", function() {
    var cal = new Calendar(div, {
        culture: "bg-BG"
    });

    var culture = kendo.getCulture("bg-BG");
    var format = culture.calendars.standard.patterns["d"];
    var link = div.find(".k-footer").find(".k-link");

    equal(link.html(), kendo.toString(new Date(), "D", culture));
    equal(link.attr("title"), kendo.toString(new Date(), "D", culture));
});

test("Calendar removes focused style on initial rendering", function() {
    var cal = new Calendar(div);

    ok(!cal._cell.hasClass("k-state-focused"));
});

test("Calendar adds  focused on focus", function() {
    var cal = new Calendar(div);

    cal._table.focus();

    ok(cal._cell.hasClass("k-state-focused"));
});

test("Calendar removes  focused on blur", function() {
    var cal = new Calendar(div);

    cal._table.focus();
    cal._table.blur();

    ok(!cal._cell.hasClass("k-state-focused"));
});

test("Widget does not fall into infinitive loop", function() {
    var cal = new Calendar(div, {
        value: '2000/10/5'
    });

    ok(true);
});

test("Widget sets disabled class correctly when callback is set", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: function(date) {
            if (date.getDate() == 27) {
                return true;
            }
        }
    });
    ok(cal.element.find("tbody>tr>td").first().hasClass("k-state-disabled"));
});

test("Widget sets disabled class correctly when array is set", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,12),
		disableDates: ["mo", "su"]
    });
    ok($('tr').eq(2).children().first().hasClass("k-state-disabled"));
});

test("Widget value is not set if value is disbaled date", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "sa"]
    });
    ok(cal.element.find("tr").eq(1).children().last().hasClass("k-state-disabled"));
});

test("Widget value is correctly after initialized with disabled value", function() {
    var cal = new Calendar(div, {
        value: new Date(2015,9,3),
		disableDates: ["mo", "sa"]
    });
    cal.value(new Date(2015,9,4))
    ok(cal.element.find('tr').eq(2).children().first().hasClass("k-state-selected"));
});

}());
