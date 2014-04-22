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
                id: 1,
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            }, {
                id: 2,
                start: new Date("2014/04/16"),
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

    test("dependency not rendered when related tasks not rendered", function() {
        var dependency = {
            type: 0,
            predecessorId: 1,
            successorId: 2,
        };

        timeline._renderDependencies([dependency]);

        equal(timeline.wrapper.find(".k-gantt-timeline-dependencies k-gantt-line").length, 0);
    });

    test("dependency not rendered when one of related tasks is not rendered", function() {
        var dependency = {
            type: 0,
            predecessorId: 1,
            successorId: 5,
        };

        timeline._render(tasks, range);

        timeline._renderDependencies([dependency]);

        equal(timeline.wrapper.find(".k-gantt-timeline-dependencies .k-gantt-line").length, 0);
    });

    test("dependency rendered", function() {
        var dependency = {
            type: 0,
            predecessorId: 1,
            successorId: 2,
        };

        timeline._render(tasks, range);

        timeline._renderDependencies([dependency]);

        equal(timeline.wrapper.find(".k-gantt-timeline-dependencies .k-gantt-line").length, 5);
    });

}());
