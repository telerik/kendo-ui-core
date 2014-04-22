(function() {

    var element;
    var gantt;
    var timeline;
    var Gantt = kendo.ui.Gantt;
    var range;
    var tasks;

    module("Rendering", {
        setup: function() {
            element = $("<div />");
            gantt = new Gantt(element);
            timeline = gantt.timeline;
            range = {
                start: new Date("2014/04/15"),
                end: new Date("2014/04/17")
            };
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

    test("rows table created", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-rows").length, 1);
    });

    test("rows table populated with rows for each task", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-rows tr").length, 3);
    });

    test("rows table rows have alternating class names", function() {
        timeline._render(tasks, range);

        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(0).hasClass("k-alt"));
        ok(timeline.wrapper.find(".k-gantt-rows tr").eq(1).hasClass("k-alt"));
        ok(!timeline.wrapper.find(".k-gantt-rows tr").eq(2).hasClass("k-alt"));
    });

    test("rows table rows have only one cell", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-rows tr:first td").length, 1);
    });

    test("rows table created with only one col in colgroup", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-rows colgroup col").length, 1);
    });


    test("columns table created", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-columns").length, 1);
    });

    test("columns table populated with only one row", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-columns tr").length, 1);
    });

    test("columns table populated with cells for each time slot", function() {
        var slotCount;

        timeline._render(tasks, range);

        slotCount = timeline.view()._timeSlots().length;

        equal(timeline.wrapper.find(".k-gantt-columns td").length, slotCount);
    });

    test("columns table cells have colspan set to slot span", function() {
        var slots;

        timeline.view("month");
        timeline._render(tasks, range);

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
        timeline._render(tasks, range);

        slots = timeline.view()._timeSlots();

        for (var i = 0, length = slots.length; i < length; i++) {
            totalCount += slots[i].span;
        }

        equal(timeline.wrapper.find(".k-gantt-columns col").length, totalCount);
    });


    test("tasks table created", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-tasks").length, 1);
    });

    test("tasks table populated with rows for each task", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-tasks tr").length, 3);
    });

    test("tasks table rows have only one cell", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-tasks tr:first td").length, 1);
    });

    test("tasks table created with only one col in colgroup", function() {
        timeline._render(tasks, range);

        equal(timeline.wrapper.find(".k-gantt-tasks colgroup col").length, 1);
    });

    module("Task Rendering", {
        setup: function() {
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

}());
