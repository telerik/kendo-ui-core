(function() {

    var element;
    var gantt;
    var timeline;
    var Gantt = kendo.ui.Gantt;
    var Timeline = kendo.ui.GanttTimeline;
    var tasks;

    module("Rendering", {
        setup: function() {
            element = $("<div />");
            timeline = new Timeline(element);
            timeline.view("week");
            tasks = [{
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            }, {
                start: new Date("2014/04/16"),
                end: new Date("2014/04/17")
            }, {
                start: new Date("2014/04/15"),
                end: new Date("2014/04/17")
            }];
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("_render(tasks) sets view range", function() {
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                original.apply(this, arguments);
            }
        });

        timeline._render(tasks);

        ok(timeline.view(), "range");
    });

    test("_render(tasks) calls view range() method with tasks range", 2, function() {
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                equal(kendo.toString(range.start, "yyyy/MM/dd"), "2014/04/15");
                equal(kendo.toString(range.end, "yyyy/MM/dd"), "2014/04/17");

                original.apply(this, arguments);
            }
        });

        timeline._render(tasks);
    });

    test("_render([empty]) calls view range() method with range of today's date", 2, function() {
        var today = new Date();
        var original = timeline.view().range;

        stub(timeline.view(), {
            range: function(range) {
                equal(kendo.toString(range.start, "yyyy/MM/dd"), kendo.toString(today, "yyyy/MM/dd"));
                equal(kendo.toString(range.end, "yyyy/MM/dd"), kendo.toString(today, "yyyy/MM/dd"));

                original.apply(this, arguments);
            }
        });

        timeline._render([]);
    });


    test("rows table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows").length, 1);
    });

    test("rows table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows").width(), timeline.view()._tableWidth);
    });

    test("rows table populated with rows for each task", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows tr").length, 3);
    });

    test("rows table rows have alternating class names", function() {
        timeline._render(tasks);

        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(0).hasClass("k-alt"));
        ok(timeline.wrapper.find(".k-gantt-rows tr").eq(1).hasClass("k-alt"));
        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(2).hasClass("k-alt"));
    });

    test("rows table rows have only one cell", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows tr:first td").length, 1);
    });

    test("rows table created with only one col in colgroup", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-rows colgroup col").length, 1);
    });


    test("columns table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns").length, 1);
    });

    test("columns table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns").width(), timeline.view()._tableWidth);
    });

    test("columns table populated with only one row", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-columns tr").length, 1);
    });

    test("columns table populated with cells for each time slot", function() {
        var slotCount;

        timeline._render(tasks);

        slotCount = timeline.view()._timeSlots().length;

        equal(timeline.wrapper.find(".k-gantt-columns td").length, slotCount);
    });

    test("columns table cells have colspan set to slot span", function() {
        var slots;

        timeline.view("month");
        timeline._render(tasks);

        slots = timeline.view()._timeSlots();

        equal(timeline.wrapper.find(".k-gantt-columns td")[0].colSpan, slots[0].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[1].colSpan, slots[1].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[2].colSpan, slots[2].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[3].colSpan, slots[3].span);
        equal(timeline.wrapper.find(".k-gantt-columns td")[4].colSpan, slots[4].span);
    });

    test("columns table populated with cols for each time slot combined span", function() {
        var slots;
        var totalCount = 0;

        timeline.view("month");
        timeline._render(tasks);

        slots = timeline.view()._timeSlots();

        for (var i = 0, length = slots.length; i < length; i++) {
            totalCount += slots[i].span;
        }

        equal(timeline.wrapper.find(".k-gantt-columns col").length, totalCount);
    });


    test("tasks table created", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks").length, 1);
    });

    test("tasks table width set", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks").width(), timeline.view()._tableWidth);
    });

    test("tasks table populated with rows for each task", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks tr").length, 3);
    });

    test("tasks table rows have only one cell", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks tr:first td").length, 1);
    });

    test("tasks table created with only one col in colgroup", function() {
        timeline._render(tasks);

        equal(timeline.wrapper.find(".k-gantt-tasks colgroup col").length, 1);
    });


    module("Single Task Rendering", {
        setup: function() {
            element = $("<div />");
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    function renderTask() {
        timeline._render([{
            start: new Date("2014/04/17"),
            end: new Date("2014/04/18")
        }]);
    }

    function renderMilestone() {
        timeline._render([{
            start: new Date("2014/04/17"),
            end: new Date("2014/04/17")
        }]);
    }

    function renderSummary() {
        timeline._render([{
            start: new Date("2014/04/17"),
            end: new Date("2014/04/19"),
            summary: true
        }]);
    }

    module("Summary Task Rendering", {
        setup: function() {
            element = $("<div />");
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });


    module("Milestone Task Rendering", {
        setup: function() {
            element = $("<div />");
            gantt = new Gantt(element);
            timeline = gantt.timeline;
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

}());
