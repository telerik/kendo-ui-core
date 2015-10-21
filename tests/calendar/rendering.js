(function() {

var calendar = kendo.calendar,
    template,
    div;

module("kendo.ui.Calendar rendering", {
    setup: function() {
        var cal = new kendo.ui.Calendar($("<div/>"));
        template = cal.month;
        cal.destroy();

        kendo.ns = "kendo-";
        div = $("<div />").appendTo(QUnit.fixture);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.ns = "";
    }
});

test("firstDayOfMonth returns correct date", function() {
    var date = new Date(2011, 7, 31);
    var correct = new Date(2011, 7, 1);

    deepEqual(calendar.firstDayOfMonth(date), correct);
});

test("firstVisibleDay returns correct date", function() {
    var date = new Date(2011, 7, 31, 10, 10, 5555);
    var correct = new Date(2011, 6, 31, 10, 10, 5555);

    deepEqual(calendar.firstVisibleDay(date), correct);
});

test("month.setDate modify day", function() {
    var date = new Date(2011, 7, 31, 10, 10, 555),
        modified = new Date(date);

    date.setDate(21);

    calendar.views[0].setDate(modified, -10);

    deepEqual(modified, date);
});

test("month.setDate updates even the second param is date", function() {
    var value = new Date(2011, 7, 31, 10, 10, 33, 111),
        origin = new Date(2010, 7, 22, 20, 11, 44, 666);

    calendar.views[0].setDate(origin, value);

    equal(origin.getFullYear(), value.getFullYear());
    equal(origin.getMonth(), value.getMonth());
    equal(origin.getDate(), value.getDate());
    equal(origin.getHours(), 20);
    equal(origin.getMinutes(), 11);
    equal(origin.getSeconds(), 44);
    equal(origin.getMilliseconds(), 666);

});

test("year.setDate modify month", function() {
    var date = new Date(2011, 7, 31, 10, 10, 5555),
        modified = new Date(date);

    date.setMonth(11);

    calendar.views[1].setDate(modified, 4);

    deepEqual(modified, date);
});

test("year.setDate should honer end day of month", function() {
    var date = new Date(2011, 3, 30, 10, 10, 5555),
        modified = new Date(2011, 7, 31, 10, 10, 5555);

    calendar.views[1].setDate(modified, -4);

    deepEqual(modified, date);
});

test("year.setDate should work correctly when date is Jan and value is -1 ", function() {
    var date = new Date(2011, 11, 5),
        modified = new Date(2012, 0, 5);

    calendar.views[1].setDate(modified, -1);

    deepEqual(modified, date);
});

test("year.setDate updates even the second param is date", function() {
    var value = new Date(2011, 7, 31, 10, 10, 33, 111),
        origin = new Date(2010, 7, 22, 20, 11, 44, 666);

    calendar.views[1].setDate(origin, value);

    equal(origin.getFullYear(), value.getFullYear());
    equal(origin.getMonth(), value.getMonth());
    equal(origin.getDate(), 22);
    equal(origin.getHours(), 20);
    equal(origin.getMinutes(), 11);
    equal(origin.getSeconds(), 44);
    equal(origin.getMilliseconds(), 666);
});

test("decade.setDate modify year", function() {
    var date = new Date(2011, 7, 31, 10, 10, 5555),
        modified = new Date(date);

    date.setFullYear(2005);

    calendar.views[2].setDate(modified, -6);

    deepEqual(modified, date);
});

test("decade.setDate updates even the second param is date", function() {
    var value = new Date(2011, 7, 31, 10, 10, 33, 111),
        origin = new Date(2010, 7, 22, 20, 11, 44, 666);

    calendar.views[2].setDate(origin, value);

    equal(origin.getFullYear(), value.getFullYear());
    equal(origin.getMonth(), 7);
    equal(origin.getDate(), 22);
    equal(origin.getHours(), 20);
    equal(origin.getMinutes(), 11);
    equal(origin.getSeconds(), 44);
    equal(origin.getMilliseconds(), 666);
});

test("century.setDate modify decade", function() {
    var date = new Date(2011, 7, 31, 10, 10, 5555),
        modified = new Date(date);

    date.setFullYear(2001);

    calendar.views[3].setDate(modified, -1);

    deepEqual(modified, date);
});

test("decade.setDate updates even the second param is date", function() {
    var value = new Date(2000, 7, 31, 10, 10, 33, 111),
        origin = new Date(2010, 7, 22, 20, 11, 44, 666);

    calendar.views[3].setDate(origin, value);

    equal(origin.getFullYear(), value.getFullYear());
    equal(origin.getMonth(), 7);
    equal(origin.getDate(), 22);
    equal(origin.getHours(), 20);
    equal(origin.getMinutes(), 11);
    equal(origin.getSeconds(), 44);
    equal(origin.getMilliseconds(), 666);
});

test("Month view return title", function() {
    var date = new Date(),
        text = kendo.culture().calendar.months.names[date.getMonth()] + " " + date.getFullYear();

        equal(calendar.views[0].title(date), text);
});

test("Month view title honors options.culture", function() {
    var date = new Date(),
        text = kendo.getCulture("bg-BG").calendars.standard.months.names[date.getMonth()] + " " + date.getFullYear();

        equal(calendar.views[0].title(date, null, null, "bg-BG"), text);
});

test("month view renders days", function() {
    var today = new Date(),
        days = kendo.culture().calendar.days;

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        content: template.content,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10),
        disableDates: $.noop
    }));

    equal(div.find("thead").find("th").length, 7);
    equal(div.find("thead").find("th").eq(0).html(), days.namesShort[0]);
    equal(div.find("thead").find("th").eq(0).attr("title"), days.names[0]);

    equal(div.find("tbody").find("tr").length, 6);
    equal(div.find("tbody").find("td").length, 42);
    equal(div.find("tbody").find("a").length, 42);
});

test("month view's content method honors culture", function() {
    var today = new Date(),
        days = kendo.getCulture("bg-BG").calendars.standard.days;

    div.html(calendar.views[0].content({
            date: today,
            empty: template.empty,
            content: template.content,
            min: new Date(2000, 10, 10),
            max: new Date(2020, 10, 10),
            disableDates: $.noop,
            culture: "bg-BG"
        }));

    equal(div.find("thead").find("th").eq(0).html(), days.namesShort[1]);
    equal(div.find("thead").find("th").eq(0).attr("title"), days.names[1]);
});

test("month view renderer honors firstDayOfWeek property", function() {
    var today = new Date(2011, 9, 10);

    kendo.culture().calendar.firstDay = 1;

    div.html(calendar.views[0].content({
        date: today,
        disableDates: $.noop,
        empty: template.empty,
        content: template.content,
        min: today,
        max: today
    }));

    equal(div.find("thead").find("th").eq(0).html(), kendo.culture().calendar.days.namesShort[1]);
    equal(div.find("thead").find("th").eq(0).attr("title"), kendo.culture().calendar.days.names[1]);

    kendo.culture().calendar.firstDay = 0;
});

test("month view honors firstVisibleDay", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        content: template.content,
        disableDates: $.noop,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10)
    }));

    equal(div.find("tbody").find("a").html(), "25");
});

test("month view renders anchor in td with title", function() {
    var today = new Date(2011, 9, 10),
        firstVisibleDay = calendar.firstVisibleDay(today);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        content: template.content,
        disableDates: $.noop,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10)
    }));

    equal(div.find("tbody").find("a").attr("title"), kendo.toString(firstVisibleDay, "D"));
    equal(div.find("tbody").find("a").attr("class"), "k-link");
});

test("month view renders anchor in td with title depending on the options.culture", function() {
    var today = new Date(2011, 9, 10),
        firstVisibleDay = calendar.firstVisibleDay(today, kendo.getCulture("bg-BG").calendars.standard);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        content: template.content,
        culture: "bg-BG",
        disableDates: $.noop,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10)
    }));

    equal(div.find("tbody").find("a").attr("title"), kendo.toString(firstVisibleDay, "D", "bg-BG"));
});

tzTest("Sofia", "month view renders empty string if date is not in range", function() {
    var today = new Date(2011, 9, 10),
    max = new Date(2011, 9, 19);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(today),
        max: max,
        disableDates: $.noop,
        content: template.content
    }));

    equal(div.find("tbody").find("td").html(), "&nbsp;");
    equal(div.find("tbody").find("a:first").html(), today.getDate() + "");
    equal(div.find("tbody").find("a:last").html(), max.getDate() + "");
});

tzTest("Brazil", "last day of March is rendered as part of the current month", function() {
    var today = new Date(2015, 2, 31),
    max = new Date(2015, 3, 1);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(today),
        max: max,
        disableDates: $.noop,
        content: template.content
    }));
    equal($("[data-value='2015/2/31']").parent().hasClass("k-other-month"), false);
});

test("month view should render data-val attribute", function() {
    var max = new Date(2011, 9, 19),
        today = new Date(2011, 9, 10),
        value = today.getFullYear() + "/" + today.getMonth() + "/" + today.getDate();

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(today),
        max: max,
        disableDates: $.noop,
        content: template.content
    }));

    equal(div.find("tbody").find("a:first").attr("data-value"), value);
});

test("month view should render k-other-month style", function() {
    var today = new Date(2011, 9, 10),
        firstDay = kendo.calendar.firstVisibleDay(today);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: template.content
    }));

    equal(div.find("tbody tr:first").find("td.k-other-month").length, 6);
    equal(div.find("tbody tr:last").find("td.k-other-month").length, 5);
});

test("month view should not render k-other-month to last day of month", function() {
    var today = new Date(2011, 8, 12, 10, 10, 10);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: template.content
    }));

    var row = div.find("tbody tr:last").prev(),
        td = row.find("td.k-other-month:first");

    equal(td.text(), "1");
    ok(!td.prev().hasClass("k-other-month"));
});

test("month view do not apply k-other-month to the first day of the month", function() {
    var today = new Date(2011, 8, 20, 14, 40, 0);

    div.html(calendar.views[0].content({
        date: today,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        empty: template.empty,
        disableDates: $.noop,
        content: template.content
    }));

    var cell = div.find("tbody").find("tr:first").find(".k-other-month:last").next();

    equal(cell.children().attr("data-value"), "2011/8/1");
});

test("month view renders k-today if today is in the current view", function() {
    var today = new Date();

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: template.content
    }));

    var cell = div.find("tbody").find("td.k-today");

    equal(cell.length, 1);
    equal(cell.children().text(), today.getDate());
});

test("month view renders k-weekend", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[0].content({
        date: today,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: template.content
    }));

    var cell = div.find("tbody").find("td.k-weekend");

    equal(cell.length, 12);
});

test("month view passes dates array", function() {
    var today = new Date(2011, 9, 10),
        dates = [today];

    div.html(calendar.views[0].content({
        date: today,
        dates: dates,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: function(data) {
            equal(data.dates, dates);
        }
    }));
});

test("month view renders URL if current date is in dates", function() {
    var today = new Date(2011, 9, 10),
        dates = [today];

    div.html(calendar.views[0].content({
        url: "/home/index?url={0}",
        date: today,
        dates: dates,
        format: "MM/dd/yyyy",
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        disableDates: $.noop,
        content: template.content
    }));

    var a = div.find("a[href*=home]");

    ok(a[0]);
    equal(a.attr("href"), "/home/index?url=10/10/2011");
});

test("month view honors culture when renders URL", function() {
    var today = new Date(2011, 9, 10),
        culture = kendo.getCulture("bg-BG"),
        format = culture.calendars.standard.patterns["D"],
        dates = [today];

    div.html(calendar.views[0].content({
        url: "/home/index?url={0}",
        date: today,
        dates: dates,
        culture: "bg-BG",
        format: format,
        empty: template.empty,
        min: new Date(1900,0,1),
        max: new Date(2900,0,1),
        content: template.content,
        disableDates: $.noop
    }));

    var a = div.find("a[href*=home]");

    ok(a[0]);
    equal(a.attr("href"), "/home/index?url=" + kendo.toString(today, format, culture));
});

test("year view renders title", function() {
    var today = new Date(2011, 9, 10);

    equal(calendar.views[1].title(today) + "", today.getFullYear() + "");
});

test("year view renders meta view  4x3 cells", function() {
    var today = new Date(2011, 9, 10),
        firstMonth = kendo.culture().calendar.months.namesAbbr[0],
        lastMonth = kendo.culture().calendar.months.namesAbbr[11];

    div.html(calendar.views[1].content({
        date: today,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10)
    }));

    equal(div.find("tbody").find("tr:first").find("td").length, 4);
    equal(div.find("tbody").find("td > a").length, 12);
    equal(div.find("tbody").find("a:first").eq(0).html(), firstMonth);
    equal(div.find("tbody").find("a:last").eq(0).html(), lastMonth);
});

test("year view's content method honors culture", function() {
    var today = new Date(2011, 9, 10),
        calendarInfo = kendo.getCulture("bg-BG").calendars.standard,
        firstMonth = calendarInfo.months.namesAbbr[0],
        lastMonth = calendarInfo.months.namesAbbr[11];

    div.html(calendar.views[1].content({
        date: today,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10),
        culture: "bg-BG"
    }));

    equal(div.find("tbody").find("tr:first").find("td").length, 4);
    equal(div.find("tbody").find("td > a").length, 12);
    equal(div.find("tbody").find("a:first").eq(0).html(), firstMonth);
    equal(div.find("tbody").find("a:last").eq(0).html(), lastMonth);
});

test("year view renders does not render months not in range", function() {
    var today = new Date(2011, 9, 10),
        monthName = kendo.culture().calendar.months.namesAbbr[9];

    div.html(calendar.views[1].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("td").length, 12);
    equal(div.find("tbody").find("a").length, 1);
    equal(div.find("tbody").find("a").html(), monthName);
    equal(div.find("tbody").find("a:first").html(), monthName);
});

test("year view renders cells with data-val", function() {
    var today = new Date(2011, 9, 10),
        value = today.getFullYear() + "/" + today.getMonth() + "/1",
        monthName = kendo.culture().calendar.months.namesAbbr[9];

    div.html(calendar.views[1].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("a").attr("data-kendo-value"), value);
});

test("decade title renders decade range title", function() {
    var today = new Date(2011, 9, 10);
    var min = new Date(2000, 9, 10);
    var max = new Date(2020, 9, 10);

    equal(calendar.views[2].title(today, min, max), "2010-2019");
});

test("decade title renders decade range within min/max values", function() {
    var today = new Date(2015, 9, 10);
    var min = new Date(2013, 9, 10);
    var max = new Date(2018, 9, 10);

    equal(calendar.views[2].title(today, min, max), "2013-2018");
});

test("decade view renders meta view  4x3 cells", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[2].content({
        date: today,
        min: new Date(2000, 10, 10),
        max: new Date(2020, 10, 10)
    }));

    equal(div.find("tbody").find("tr:first").find("td").length, 4);
    equal(div.find("tbody").find("td > a").length, 12);
    equal(div.find("tbody").find("a:first").html() + "", 2009 + "");
    equal(div.find("tbody").find("a:last").html() + "", 2020 + "");
});

test("decade view renders only years in range", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[2].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("tr:first").find("td").length, 4);
    equal(div.find("tbody").find("td > a").length, 1);
    equal(div.find("tbody").find("a").html(), "2011");
});

test("decade view renders cells with data-val", function() {
    var today = new Date(2011, 9, 10),
        value = "2011/0/1";

    div.html(calendar.views[2].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("td > a").attr("data-kendo-value"), value);
});

test("decade renders k-other-month to the first and last cell of the view", function() {
    var today = new Date(2011, 9, 10),
        cells;

    div.html(calendar.views[2].content({
        date: today,
        min: new Date(1900, 1, 1),
        max: new Date(2100, 1, 1)
    }));

    cells = div.find("tbody").find("td");

    ok(cells.eq(0).hasClass("k-other-month"));
    ok(cells.eq(11).hasClass("k-other-month"));

    ok(!cells.eq(1).hasClass("k-other-month"));
});

test("century title renders century title", function() {
    var today = new Date(2011, 9, 10);
    var min = new Date(1900, 9, 10);
    var max = new Date(2100, 9, 10);

    equal(calendar.views[3].title(today, min, max), "2000-2099");
});

test("century title renders century title within min/max values", function() {
    var today = new Date(2011, 9, 10);
    var min = new Date(2010, 9, 10);
    var max = new Date(2050, 9, 10);

    equal(calendar.views[3].title(today, min, max), "2010-2050");
});

test("century view renders meta view  4x3 cells", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[3].content({
        date: today,
        min: new Date(1800, 10, 10),
        max: new Date(2220, 10, 10)
    }));

    equal(div.find("tbody").find("tr:first").find("td").length, 4);
    equal(div.find("tbody").find("td > a").length, 12);
    equal(div.find("tbody").find("a:first").html(), "1990 - 1999");
    equal(div.find("tbody").find("a:last").html(), "2100 - 2109");
});

test("century view renders only years in range", function() {
    var today = new Date(2011, 9, 10);

    div.html(calendar.views[3].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("td > a").length, 1);
    equal(div.find("tbody").find("a").html(), "2011 - 2011");
});

test("century view does not render decades less then min", function() {
    var today = new Date(1910, 9, 10);

    div.html(calendar.views[3].content({
        date: today,
        min: new Date(1900, 0, 1),
        max: new Date(1950, 0, 1)
    }));

    equal(div.find("tbody").find("td:first").children().length, 0);
});

test("century view renders cells with data-val", function() {
    var today = new Date(2011, 9, 10),
        value = "2010/0/1";

    div.html(calendar.views[3].content({
        date: today,
        min: today,
        max: today
    }));

    equal(div.find("tbody").find("a").attr("data-kendo-value"), value);
});

test("century renders k-other-month to the first and last cell of the view", function() {
    var today = new Date(2011, 9, 10),
        cells;

    div.html(calendar.views[3].content({
        date: today,
        min: new Date(1800, 10, 10),
        max: new Date(2220, 10, 10)
    }));

    cells = div.find("tbody").find("td");

    ok(cells.eq(0).hasClass("k-other-month"));
    ok(cells.eq(11).hasClass("k-other-month"));

    ok(!cells.eq(1).hasClass("k-other-month"));
});

test("_footer should render footer link", function() {
    var container = new kendo.ui.Calendar(div).element;

    ok(container.find(".k-footer")[0]);
    ok(container.find(".k-footer").children().length, 1);
    ok(container.find(".k-footer").children()[0].nodeName, "a");
    ok(container.find(".k-footer").children().html(),kendo.toString(new Date(), "D"));
    ok(container.find(".k-footer").children().attr("title"),kendo.toString(new Date(), "D"));
});

test("if no options.month then build template without WITH block", function() {
    var cal = new kendo.ui.Calendar(div);

    ok(cal.month.content.toString().indexOf("with") == -1);
});

test("set options.month build template with WITH block", function() {
    var cal = new kendo.ui.Calendar(div, {month: {content: "#=value#" }});

    ok(cal.month.content.toString().indexOf("with") != -1);
});

test("set options.month should be used as template", function() {
    var cal = new kendo.ui.Calendar(div, {month: {content: "#=value#" }}),
        oldView = kendo.calendar.views[0].content, options;

    kendo.calendar.views[0].content = function(o) {
       options = o;
    }
    cal.navigate();

    equal(options.content, cal.month.content);

    kendo.calendar.views[0].content = oldView;
});

})();
