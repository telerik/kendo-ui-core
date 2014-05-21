(function() {

    var element;
    var timeline;
    var view;
    var extend = $.extend;
    var Gantt = kendo.ui.Gantt;
    var Timeline = kendo.ui.GanttTimeline;
    var DayView = kendo.ui.GanttDayView;
    var WeekView = kendo.ui.GanttWeekView;
    var MonthView = kendo.ui.GanttMonthView;

    var headerTree;
    
    module("Initialization", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("gantt options are merged", function() {
        var gantt = new Gantt(element, {
            workWeekEnd: 4
        });

        equal(gantt.timeline.options.workWeekEnd, 4);
    });

    test("wrapper field is initialized", function() {
        timeline = new Timeline(element);

        equal(timeline.wrapper[0], element[0]);
    });

    test("css classes added to wrapper", function () {
        timeline = new Timeline(element);

        ok(timeline.wrapper.hasClass("k-widget"));
        ok(timeline.wrapper.hasClass("k-grid"));
        ok(timeline.wrapper.hasClass("k-timeline"));
    });

    test("header wrap added to wrapper", 2, function() {
        timeline = new Timeline(element);

        ok(timeline.wrapper.find(".k-grid-header").length);
        ok(timeline.wrapper.find(".k-grid-header-wrap").length);
    });

    test("content wrap added to wrapper", function() {
        timeline = new Timeline(element);

        ok(timeline.wrapper.find(".k-grid-content").length);
    });

    test("day, week and month views are set by default", 3, function() {
        timeline = new Timeline(element);

        equal(timeline.views.day.title, "Day");
        equal(timeline.views.week.title, "Week");
        equal(timeline.views.month.title, "Month");
    });

    test("views are set from options", 3, function() {
        timeline = new Timeline(element, {
            views: ["day", "month"]
        });

        equal(timeline.views.day.title, "Day");
        equal(timeline.views.week, undefined);
        equal(timeline.views.month.title, "Month");
    });

    test("view initialized from string", 2, function() {
        timeline = new Timeline(element, {
            views: ["day"]
        });

        equal(timeline.views.day.title, "Day");
        equal(timeline.views.day.type, "kendo.ui.GanttDayView");
    });

    test("view initialized from object", 2, function() {
        timeline = new Timeline(element, {
            views: [{ type: "day", title: "custom title" }]
        });

        equal(timeline.views.day.title, "custom title");
        equal(timeline.views.day.type, "kendo.ui.GanttDayView");
    });

    test("invalid views are not set", function() {
        timeline = new Timeline(element, {
            views: ["day", "invalidView"]
        });

        equal(timeline.views.day.title, "Day");
        equal(timeline.views.invalidView, undefined);
    });

    test("view initialized with wrapper element", function() {
        timeline = new Timeline(element, {
            views: ["day"]
        });

        timeline.view("day");

        equal(timeline.view().element[0], timeline.wrapper[0]);
    });

    test("view initialized with merged options", function() {
        timeline = new Timeline(element, {
            views: [{ type: "day" }],
            dayHeaderTemplate: "customTemplate"
        });

        timeline.view("day");

        equal(timeline.view().options.dayHeaderTemplate, "customTemplate");
    });

    test("editable false does not initialize task draggable", function() {
        timeline = new Timeline(element, { editable: false });

        ok(!timeline._moveDraggable);
    });

    test("editable false does not initialize resize draggable", function() {
        timeline = new Timeline(element, { editable: false });

        ok(!timeline._resizeDraggable);
    });

    test("editable false does not initialize percent resize draggable", function() {
        timeline = new Timeline(element, { editable: false });

        ok(!timeline._percentDraggable);
    });

    test("editable false does not initialize dependency draggable", function() {
        timeline = new Timeline(element, { editable: false });

        ok(!timeline._dependencyDraggable);
    });

    module("Day View", {
        setup: function() {
            element = $(
                "<div>\
                    <div class='k-grid-header'>\
                        <div class='k-grid-header-wrap'>\
                        </div>\
                    </div>\
                    <div class='k-grid-content'>\
                        <div class='k-gantt-timeline-tasks'>\
                        </div>\
                        <div class='k-gantt-timeline-dependencies'>\
                        </div>\
                    </div>\
                </div>");

            headerTree = new kendo.dom.Tree(element.find(".k-grid-header-wrap")[0]);
            taskTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-tasks")[0]);
            dependencyTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-dependencies")[0]);
        },
        teardown: function() {
            if (view) {
                view.destroy();
            }
        }
    });

    function dayView(options) {
        var dayView = new DayView(element, extend(true, {
            headerTree: headerTree,
            taskTree: taskTree,
            dependencyTree: dependencyTree
        }, options));

        return dayView;
    }

    test("header field initialized", function() {
        view = dayView();

        equal(view.header[0], element.find(".k-grid-header")[0]);
    });

    test("content field initialized", function() {
        view = dayView();

        equal(view.content[0], element.find(".k-grid-content")[0]);
    });

    test("work days initialized", 4, function() {
        view = dayView({
            workWeekStart: 2,
            workWeekEnd: 4,
        });

        equal(view._workDays.length, 3);
        equal(view._workDays[0], 2);
        equal(view._workDays[1], 3);
        equal(view._workDays[2], 4);
    });

    test("range() sets view range", 2, function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);

        equal(kendo.toString(view.start, "yyyy/MM/dd"), "2014/04/15");
        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/04/17");
    });

    test("range() with equal start and end", 2, function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/15")
        };

        view.range(range);

        equal(kendo.toString(view.start, "yyyy/MM/dd"), "2014/04/15");
        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/04/16");
    });

    test("range() view range has trimmed time", 2, function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15 10:30:00"),
            end: new Date("2014/04/17 15:45:00")
        };
        
        view.range(range);

        equal(kendo.date.getMilliseconds(view.start), 0);
        equal(kendo.date.getMilliseconds(view.end), 0);
    });

    test("range() view range end is set to next day start when time is not 0", function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17 15:45:00")
        };

        view.range(range);

        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/04/18");
    });

    test("range() view range end is set to day start when time is 0", function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);

        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/04/17");
    });

    test("_calculateTableWidth() honors slotSize property", function() {
        view = dayView({
            slotSize: 100
        });

        view._slots = [[
            { span: 1 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 300);
    });

    test("_calculateTableWidth() for slots with different span", function() {
        view = dayView({
            slotSize: 100
        });

        view._slots = [[
            { span: 2 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 200);
    });


    test("renderLayout() creates table with correct width", function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("table").width(), view._tableWidth);
    });

    test("renderLayout() creates day and hour header rows", function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr").length, 2);
    });


    test("renderLayout() creates hour headers with correct text", function() {
        view = dayView({
            timeHeaderTemplate: kendo.template("#=kendo.toString(start, 't')#")
        });
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").eq(0).text(), "12:00 AM");
    });
    
    test("renderLayout() creates hour headers for each hour in range", function() {
        view = dayView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 48);
    });

    test("renderLayout() creates hour headers for each working hour in range when showWorkHours is true", function() {
        view = dayView({
            showWorkHours: true
        });
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 18);
    });

    test("renderLayout() creates hour headers for each working hour in range when showWorkHours is true with custom working Hours", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            showWorkHours: true,
            workDayStart: new Date(1980, 1, 1, 10, 0, 0),
            workDayEnd: new Date(1980, 1, 1, 14, 0, 0)
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 8);
    });

    test("renderLayout() creates hour headers for each working day in range when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/18"),
            end: new Date("2014/04/21")
        };

        view = dayView({
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 24);
    });

    test("renderLayout() creates hour headers for each working day in range when showWorkDays is true with custom working Days", function() {
        var range = {
            start: new Date("2014/04/18"),
            end: new Date("2014/04/21")
        };

        view = dayView({
            showWorkDays: true,
            workWeekStart: 5,
            workWeekEnd: 6
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 48);
    });

    test("renderLayout() creates hour headers for each working hour in each working day in range when showWorkHours and showWorkDays are true", function() {
        var range = {
            start: new Date("2014/04/18"),
            end: new Date("2014/04/21")
        };

        view = dayView({
            showWorkHours: true,
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 9);
    });

    test("renderLayout() creates correct number of hour headers when hourSpan is set", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            hourSpan: 5
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 10);
    });

    test("renderLayout() hour headers are rendered with colspan 1", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th")[0].colSpan, 1);
    });

    test("renderLayout() hour headers are rendered with colspan 1 when hourSpan is set", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            hourSpan: 5
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th")[0].colSpan, 1);
    });

    test("renderLayout() hour headers for non working hours have non-working class", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView();
        view.range(range);
        view.renderLayout();

        ok(view.header.find("tr:last th").eq(0).hasClass("nonWorking"));
    });


    test("renderLayout() creates day headers with correct text", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = dayView({
            dayHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").eq(0).text(), "Tue 4/15");
    });

    test("renderLayout() creates day headers for each day in range", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };
        
        view = dayView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").length, 8);
    });

    test("renderLayout() creates day headers for working days in range when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = dayView({
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").length, 6);
    });

    test("renderLayout() creates day headers for custom working days in range when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = dayView({
            showWorkDays: true,
            workWeekStart: 2,
            workWeekEnd: 4
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").length, 4);
    });

    test("renderLayout() day headers are rendered with correct colspan", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 24);
    });

    test("renderLayout() day headers are rendered with correct colspan when showWorkHours is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            showWorkHours: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 9);
    });

    test("renderLayout() day headers are rendered with correct colspan when hourSpan is set", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            hourSpan: 2
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 12);
    });

    test("renderLayout() day headers are rendered with correct colspan when hourSpan is set to a non common denominator of 24", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            hourSpan: 7
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 4);
    });

    test("renderLayout() day headers are rendered with correct colspan when showWorkHours is true and hourSpan is set", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = dayView({
            showWorkHours: true,
            hourSpan: 4
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 3);
    });

    test("renderLayout() day headers for non working days have non-working class", function() {
        var range = {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/22")
        };

        view = dayView();
        view.range(range);
        view.renderLayout();

        ok(view.header.find("tr:first th").eq(2).hasClass("nonWorking"));
    });


    module("Week View", {
        setup: function() {
            element = $(
                "<div>\
                    <div class='k-grid-header'>\
                        <div class='k-grid-header-wrap'>\
                        </div>\
                    </div>\
                    <div class='k-grid-content'>\
                        <div class='k-gantt-timeline-tasks'>\
                        </div>\
                        <div class='k-gantt-timeline-dependencies'>\
                        </div>\
                    </div>\
                </div>");

            headerTree = new kendo.dom.Tree(element.find(".k-grid-header-wrap")[0]);
            taskTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-tasks")[0]);
            dependencyTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-dependencies")[0]);
        },
        teardown: function() {
            if (view) {
                view.destroy();
            }
        }
    });

    function weekView(options) {
        var dayView = new WeekView(element, extend(true, {
            headerTree: headerTree,
            taskTree: taskTree,
            dependencyTree: dependencyTree
        }, options));

        return dayView;
    }

    test("header field initialized", function() {
        view = weekView();

        equal(view.header[0], element.find(".k-grid-header")[0]);
    });

    test("content field initialized", function() {
        view = weekView();

        equal(view.content[0], element.find(".k-grid-content")[0]);
    });

    test("work days initialized", 4, function() {
        view = weekView({
            workWeekStart: 2,
            workWeekEnd: 4,
        });

        equal(view._workDays.length, 3);
        equal(view._workDays[0], 2);
        equal(view._workDays[1], 3);
        equal(view._workDays[2], 4);
    });

    test("range() sets view range to containing weeks", 2, function() {
        view = weekView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view.range(range);

        equal(kendo.toString(view.start, "yyyy/MM/dd"), "2014/04/13");
        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/04/27");
    });

    test("_calculateTableWidth() honors slotSize property", function() {
        view = weekView({
            slotSize: 100
        });

        view._slots = [[
            { span: 1 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 300);
    });

    test("_calculateTableWidth() for slots with different span", function() {
        view = weekView({
            slotSize: 100
        });

        view._slots = [[
            { span: 2 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 200);
    });


    test("renderLayout() creates table with correct width", function() {
        view = weekView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("table").width(), view._tableWidth);
    });

    test("renderLayout() creates week and day header rows", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr").length, 2);
    });


    test("renderLayout() creates day headers with correct text", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            dayHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").eq(0).text(), "Sun 4/13");
    });

    test("renderLayout() creates day headers for each day in range", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 14);
    });

    test("renderLayout() creates day headers for working days in range when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 10);
    });

    test("renderLayout() creates day headers for custom working days in range when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            showWorkDays: true,
            workWeekStart: 2,
            workWeekEnd: 4
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 6);
    });

    test("renderLayout() day headers are rendered with colspan 1", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th")[0].colSpan, 1);
    });

    test("renderLayout() day headers for non working days have non-working class", function() {
        var range = {
            start: new Date("2014/04/17"),
            end: new Date("2014/04/22")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        ok(view.header.find("tr:last th").eq(0).hasClass("nonWorking"));
    });


    test("renderLayout() creates week headers with correct text", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            weekHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").eq(0).text(), "Sun 4/13 - Sat 4/19");
    });

    test("renderLayout() creates week headers with correct text when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            weekHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#"),
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").eq(0).text(), "Mon 4/14 - Fri 4/18");
    });

    test("renderLayout() creates week headers for each week in range", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").length, 2);
    });

    test("renderLayout() week headers are rendered with correct colspan", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 7);
    });

    test("renderLayout() week headers are rendered with correct colspan when showWorkDays is true", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = weekView({
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 5);
    });


    module("Month View", {
        setup: function() {
            element = $(
                "<div>\
                    <div class='k-grid-header'>\
                        <div class='k-grid-header-wrap'>\
                        </div>\
                    </div>\
                    <div class='k-grid-content'>\
                        <div class='k-gantt-timeline-tasks'>\
                        </div>\
                        <div class='k-gantt-timeline-dependencies'>\
                        </div>\
                    </div>\
                </div>");

            headerTree = new kendo.dom.Tree(element.find(".k-grid-header-wrap")[0]);
            taskTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-tasks")[0]);
            dependencyTree = new kendo.dom.Tree(element.find(".k-gantt-timeline-dependencies")[0]);
        },
        teardown: function() {
            if (view) {
                view.destroy();
            }
        }
    });

    function monthView(options) {
        var dayView = new MonthView(element, extend(true, {
            headerTree: headerTree,
            taskTree: taskTree,
            dependencyTree: dependencyTree
        }, options));

        return dayView;
    }

    test("header field initialized", function() {
        view = monthView();

        equal(view.header[0], element.find(".k-grid-header")[0]);
    });

    test("content field initialized", function() {
        view = monthView();

        equal(view.content[0], element.find(".k-grid-content")[0]);
    });

    test("work days initialized", 4, function() {
        view = monthView({
            workWeekStart: 2,
            workWeekEnd: 4,
        });

        equal(view._workDays.length, 3);
        equal(view._workDays[0], 2);
        equal(view._workDays[1], 3);
        equal(view._workDays[2], 4);
    });

    test("range() sets view range to containing months", 2, function() {
        view = monthView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view.range(range);

        equal(kendo.toString(view.start, "yyyy/MM/dd"), "2014/04/01");
        equal(kendo.toString(view.end, "yyyy/MM/dd"), "2014/05/01");
    });

    test("_calculateTableWidth() honors slotSize property", function() {
        view = monthView({
            slotSize: 100
        });

        view._slots = [[
            { span: 1 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 300);
    });

    test("_calculateTableWidth() for slots with different span", function() {
        view = monthView({
            slotSize: 100
        });

        view._slots = [[
            { span: 2 },
            { span: 1 },
            { span: 1 }
        ]];

        equal(view._calculateTableWidth(), 200);
    });


    test("renderLayout() creates table with correct width", function() {
        view = monthView();
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view.range(range);
        view.renderLayout();

        equal(view.header.find("table").width(), view._tableWidth);
    });

    test("renderLayout() creates month and week header rows", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/17")
        };

        view = monthView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr").length, 2);
    });


    test("renderLayout() creates week headers with correct text", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = monthView({
            weekHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").eq(0).text(), "Tue 4/01 - Sat 4/05");
    });

    test("renderLayout() first week headers with correct text when not all days are in same month", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = monthView({
            weekHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").eq(0).text(), "Tue 4/01 - Sat 4/05");
    });

    test("renderLayout() last week headers with correct text when not all days are in same month", function() {
        var range = {
            start: new Date("2014/04/15"),
            end: new Date("2014/04/23")
        };

        view = monthView({
            weekHeaderTemplate: kendo.template("#=kendo.toString(start, 'ddd M/dd')# - #=kendo.toString(kendo.date.addDays(end, -1), 'ddd M/dd')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").eq(4).text(), "Sun 4/27 - Wed 4/30");
    });

    test("renderLayout() creates week headers for each week in range", function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 6);
    });

    test("renderLayout() does not create week header for first week if showWorkDays is true and week has only non working days", function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView({
            workWeekStart: 0,
            workWeekEnd: 4,
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 5);
    });

    test("renderLayout() does not create week header for last week if showWorkDays is true and week has only non working days", function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView({
            workWeekStart: 1,
            workWeekEnd: 5,
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th").length, 5);
    });

    test("renderLayout() week headers have correct column span", 6, function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView();
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th")[0].colSpan, 2);
        equal(view.header.find("tr:last th")[1].colSpan, 7);
        equal(view.header.find("tr:last th")[2].colSpan, 7);
        equal(view.header.find("tr:last th")[3].colSpan, 7);
        equal(view.header.find("tr:last th")[4].colSpan, 7);
        equal(view.header.find("tr:last th")[5].colSpan, 1);
    });

    test("renderLayout() week headers have correct column span when showWorkDays is true", 5, function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView({
            showWorkDays: true
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:last th")[0].colSpan, 1);
        equal(view.header.find("tr:last th")[1].colSpan, 5);
        equal(view.header.find("tr:last th")[2].colSpan, 5);
        equal(view.header.find("tr:last th")[3].colSpan, 5);
        equal(view.header.find("tr:last th")[4].colSpan, 5);
    });


    test("renderLayout() creates month headers with correct text", function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/08/23")
        };

        view = monthView({
            monthHeaderTemplate: kendo.template("#=kendo.toString(start, 'MMM')#")
        });
        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").eq(0).text(), "Aug");
    });

    test("renderLayout() creates month headers for each month in range", function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/10/23")
        };

        view = monthView();

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th").length, 3);
    });

    test("renderLayout() month headers have correct column span", 3, function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/10/23")
        };

        view = monthView();

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 31);
        equal(view.header.find("tr:first th")[1].colSpan, 30);
        equal(view.header.find("tr:first th")[2].colSpan, 31);
    });

    test("renderLayout() month headers have correct column span when showWorkDays is true", 3, function() {
        var range = {
            start: new Date("2014/08/15"),
            end: new Date("2014/10/23")
        };

        view = monthView({
            showWorkDays: true
        });

        view.range(range);
        view.renderLayout();

        equal(view.header.find("tr:first th")[0].colSpan, 21);
        equal(view.header.find("tr:first th")[1].colSpan, 22);
        equal(view.header.find("tr:first th")[2].colSpan, 23);
    });

}());
