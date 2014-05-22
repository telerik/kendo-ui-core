(function() {

    var element;
    var timeline;
    var extend = $.extend;
    var GanttTask = kendo.data.GanttTask;
    var GanttDependency = kendo.data.GanttDependency;
    var task1;
    var task2;
    var dependency;

    module("Rendering", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("dependency not rendered when related tasks not rendered", function() {
        setupTimeline();

        var dependency = {
            type: 0,
            predecessorId: 1,
            successorId: 2,
        };

        timeline._renderDependencies([dependency]);

        equal(timeline.wrapper.find(".k-gantt-dependencies k-line").length, 0);
    });

    test("dependency not rendered when one of related tasks is not rendered", function() {
        setupTimeline();

        var task = new GanttTask({
            id: 1,
            title: "task 1",
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });

        var dependency = new GanttDependency({
            type: 0,
            predecessorId: 1,
            successorId: 5,
        });

        timeline._render([task]);
        timeline._renderDependencies([dependency]);

        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 0);
    });


    // Dependency Finish-Finish

    module("Dependency Finish-Finish Predecessor above and ending earlier than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 0, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.task2RightEdge + referencePoints.minLineLength - referencePoints.task1RightEdge);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.minLineLength);
    });


    module("Dependency Finish-Finish Predecessor above and ending later than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });

            dependency = new GanttDependency({ type: 0, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task1RightEdge + referencePoints.minLineLength - referencePoints.task2RightEdge);
    });


    module("Dependency Finish-Finish Predecessor below and ending earlier than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });

            dependency = new GanttDependency({ type: 0, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.task1RightEdge + referencePoints.minLineLength - referencePoints.task2RightEdge);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.minLineLength);
    });


    module("Dependency Finish-Finish Predecessor below and ending later than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 0, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task2RightEdge + referencePoints.minLineLength - referencePoints.task1RightEdge);
    });


    // Dependency Finish-Start

    module("Dependency Finish-Start Predecessor above and ending earlier than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 09:00"), end: new Date("2014/04/15 10:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 14:00"), end: new Date("2014/04/15 15:00") });

            dependency = new GanttDependency({ type: 1, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task2LeftEdge - (referencePoints.task1RightEdge + referencePoints.minLineLength));
    });


    module("Dependency Finish-Start Predecessor above and ending later than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 11:00"), end: new Date("2014/04/15 12:00") });

            dependency = new GanttDependency({ type: 1, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 5);
    });

    test("lines rendered with data-uid attribute set", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
        equal(lines.eq(3).attr("data-uid"), dependency.uid);
        equal(lines.eq(4).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
        ok(lines.eq(3).hasClass("k-line-v"));
        ok(lines.eq(4).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 15, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.minLineLength);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(thirdLine.outerWidth(), (referencePoints.task1RightEdge - referencePoints.task2LeftEdge) + 2 * referencePoints.minLineLength);

        var fourthLine = lines.eq(3);
        equalWithRound(fourthLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(fourthLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(fourthLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle - referencePoints.minLineLength);

        var fifthLine = lines.eq(4);
        equalWithRound(fifthLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(fifthLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(fifthLine.outerWidth(), referencePoints.minLineLength);

    });


    module("Dependency Finish-Start Predecessor below and ending earlier than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 14:00"), end: new Date("2014/04/15 15:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 09:00"), end: new Date("2014/04/15 10:00") });

            dependency = new GanttDependency({ type: 1, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task1LeftEdge - referencePoints.task2RightEdge - referencePoints.minLineLength);
    });


    module("Dependency Finish-Start Predecessor below and ending later than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 11:00"), end: new Date("2014/04/15 12:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 1, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 5);
    });

    test("lines rendered with data-uid attribute set", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
        equal(lines.eq(3).attr("data-uid"), dependency.uid);
        equal(lines.eq(4).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
        ok(lines.eq(3).hasClass("k-line-v"));
        ok(lines.eq(4).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 15, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(secondLine.outerHeight(), referencePoints.minLineLength);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(thirdLine.outerWidth(), (referencePoints.task2RightEdge - referencePoints.task1LeftEdge) + 2 * referencePoints.minLineLength);

        var fourthLine = lines.eq(3);
        equalWithRound(fourthLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(fourthLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(fourthLine.outerHeight(), referencePoints.minLineLength);

        var fifthLine = lines.eq(4);
        equalWithRound(fifthLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(fifthLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(fifthLine.outerWidth(), referencePoints.minLineLength);
    });


    // Dependency Start-Finish

    module("Dependency Start-Finish Predecessor above and starting later than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 14:00"), end: new Date("2014/04/15 15:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 09:00"), end: new Date("2014/04/15 10:00") });

            dependency = new GanttDependency({ type: 2, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task1LeftEdge - referencePoints.task2RightEdge - referencePoints.minLineLength);
    });


    module("Dependency Start-Finish Predecessor above and starting earlier than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 11:00"), end: new Date("2014/04/15 12:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 2, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 5);
    });

    test("lines rendered with data-uid attribute set", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
        equal(lines.eq(3).attr("data-uid"), dependency.uid);
        equal(lines.eq(4).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
        ok(lines.eq(3).hasClass("k-line-v"));
        ok(lines.eq(4).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 15, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.minLineLength);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(thirdLine.outerWidth(), (referencePoints.task2RightEdge - referencePoints.task1LeftEdge) + 2 * referencePoints.minLineLength);

        var fourthLine = lines.eq(3);
        equalWithRound(fourthLine.offset().left, referencePoints.task2RightEdge + referencePoints.minLineLength);
        equalWithRound(fourthLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(fourthLine.outerHeight(), (referencePoints.secondRowMiddle - referencePoints.firstRowMiddle) - referencePoints.minLineLength);

        var fifthLine = lines.eq(4);
        equalWithRound(fifthLine.offset().left, referencePoints.task2RightEdge);
        equalWithRound(fifthLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(fifthLine.outerWidth(), referencePoints.minLineLength);
    });


    module("Dependency Start-Finish Predecessor below and starting later than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 09:00"), end: new Date("2014/04/15 10:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 14:00"), end: new Date("2014/04/15 15:00") });

            dependency = new GanttDependency({ type: 2, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task2LeftEdge - referencePoints.task1RightEdge - referencePoints.minLineLength);
    });


    module("Dependency Start-Finish Predecessor below and starting earlier than Successor end", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 11:00"), end: new Date("2014/04/15 12:00") });

            dependency = new GanttDependency({ type: 2, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 5);
    });

    test("lines rendered with data-uid attribute set", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
        equal(lines.eq(3).attr("data-uid"), dependency.uid);
        equal(lines.eq(4).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 5, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
        ok(lines.eq(3).hasClass("k-line-v"));
        ok(lines.eq(4).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-w").length);
    });

    test("lines rendered with correct position", 15, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(secondLine.outerHeight(), referencePoints.minLineLength);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle + referencePoints.minLineLength);
        equalWithRound(thirdLine.outerWidth(), (referencePoints.task1RightEdge - referencePoints.task2LeftEdge) + 2 * referencePoints.minLineLength);

        var fourthLine = lines.eq(3);
        equalWithRound(fourthLine.offset().left, referencePoints.task1RightEdge + referencePoints.minLineLength);
        equalWithRound(fourthLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(fourthLine.outerHeight(), (referencePoints.secondRowMiddle - referencePoints.firstRowMiddle) - referencePoints.minLineLength);

        var fifthLine = lines.eq(4);
        equalWithRound(fifthLine.offset().left, referencePoints.task1RightEdge);
        equalWithRound(fifthLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(fifthLine.outerWidth(), referencePoints.minLineLength);
    });


    // Dependency Start-Start

    module("Dependency Start-Start Predecessor above and starting earlier than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 3, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task2LeftEdge + referencePoints.minLineLength - referencePoints.task1LeftEdge);
    });


    module("Dependency Start-Start Predecessor above and starting later than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });

            dependency = new GanttDependency({ type: 3, predecessorId: 1, successorId: 2, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.task1LeftEdge + referencePoints.minLineLength - referencePoints.task2LeftEdge);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.minLineLength);
    });


    module("Dependency Start-Start Predecessor below and starting earlier than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });

            dependency = new GanttDependency({ type: 3, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.minLineLength);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task2LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.task1LeftEdge + referencePoints.minLineLength - referencePoints.task2LeftEdge);

    });


    module("Dependency Start-Start Predecessor below and starting later than Successor start", {
        setup: function() {
            element = $("<div class='k-timeline k-grid k-widget' style='height: 500px;'/>").appendTo(QUnit.fixture);

            setupTimeline();

            task1 = new GanttTask({ id: 1, start: new Date("2014/04/15 10:00"), end: new Date("2014/04/15 11:00") });
            task2 = new GanttTask({ id: 2, start: new Date("2014/04/15 12:00"), end: new Date("2014/04/15 13:00") });

            dependency = new GanttDependency({ type: 3, predecessorId: 2, successorId: 1, });

            timeline._render([task1, task2]);
            timeline._renderDependencies([dependency]);
        },
        teardown: function() {
            if (timeline) {
                timeline.destroy();
            }

            kendo.destroy(element);
        }
    });

    test("correct number of lines rendered", function() {
        equal(timeline.wrapper.find(".k-gantt-dependencies .k-line").length, 3);
    });

    test("lines rendered with data-uid attribute set", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        equal(lines.eq(0).attr("data-uid"), dependency.uid);
        equal(lines.eq(1).attr("data-uid"), dependency.uid);
        equal(lines.eq(2).attr("data-uid"), dependency.uid);
    });

    test("lines rendered with correct classNames", 3, function() {
        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        ok(lines.eq(0).hasClass("k-line-h"));
        ok(lines.eq(1).hasClass("k-line-v"));
        ok(lines.eq(2).hasClass("k-line-h"));
    });

    test("arrow rendered in last line", function() {
        var line = timeline.wrapper.find(".k-gantt-dependencies .k-line:last");

        ok(line.find("span.k-arrow-e").length);
    });

    test("lines rendered with correct position", 9, function() {
        var referencePoints = getReferencePoints();

        var lines = timeline.wrapper.find(".k-gantt-dependencies .k-line");

        var firstLine = lines.eq(0);
        equalWithRound(firstLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(firstLine.offset().top, referencePoints.secondRowMiddle);
        equalWithRound(firstLine.outerWidth(), referencePoints.task2LeftEdge + referencePoints.minLineLength - referencePoints.task1LeftEdge);

        var secondLine = lines.eq(1);
        equalWithRound(secondLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(secondLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(secondLine.outerHeight(), referencePoints.secondRowMiddle - referencePoints.firstRowMiddle);

        var thirdLine = lines.eq(2);
        equalWithRound(thirdLine.offset().left, referencePoints.task1LeftEdge - referencePoints.minLineLength);
        equalWithRound(thirdLine.offset().top, referencePoints.firstRowMiddle);
        equalWithRound(thirdLine.outerWidth(), referencePoints.minLineLength);
    });



    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 5);
    }

    function getReferencePoints() {
        var result = {};

        var taskElements = timeline.wrapper.find(".k-gantt-tasks .k-task");
        var rowHeight = timeline.wrapper.find(".k-gantt-tasks tr:first").outerHeight();

        result.task1LeftEdge = taskElements.eq(0).offset().left;
        result.task1RightEdge = result.task1LeftEdge + taskElements.eq(0).outerWidth();

        result.task2LeftEdge = taskElements.eq(1).offset().left;
        result.task2RightEdge = result.task2LeftEdge + taskElements.eq(1).outerWidth();

        result.rowHeight = rowHeight;
        result.minLineLength = rowHeight / 2;

        result.firstRowMiddle = timeline.view().content.offset().top + rowHeight / 2;
        result.secondRowMiddle = result.firstRowMiddle + rowHeight;

        return result;
    }

    function elementRightEdge(element) {
        return element.offset().left + element.outerWidth();
    }

    function setupTimeline(userOptions) {
        var options = extend({}, { slotSize: 30 }, userOptions);

        timeline = new kendo.ui.GanttTimeline(element, options);

        timeline.view("day");
    }

}());
