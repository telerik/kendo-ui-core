(function() {

    var element;
    var timeline;
    var gantt;
    var extend = $.extend;

    module("Gantt Dependency Drag", {
        setup: function() {
            element = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("createDependency called on timeline dependencyDragEnd", function() {
        setupGantt();

        stub(gantt, "createDependency");

        timeline.trigger("dependencyDragEnd", { type: 0, predecessor: task1, successor: task2 });

        ok(gantt.calls("createDependency"));
    });

    test("createDependency called with correct parameter on timeline dependencyDragEnd", function() {
        setupGantt();

        stub(gantt, {
            createDependency: function(dependency) {
                equal(dependency.type, 0);
                equal(dependency.predecessorId, task1.id);
                equal(dependency.successorId, task2.id);
            }
        });

        timeline.trigger("dependencyDragEnd", { type: 0, predecessor: task1, successor: task2 });

        ok(gantt.calls("createDependency"));
    });


    module("Timeline Dependency Drag", {
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

    test("dragging and dropping start-start triggers dependencyDragEnd with correct parameters", 3, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = timeline.view().content.find(".k-task-wrap:last .k-task-start").show();

        timeline.bind("dependencyDragEnd", function(e) {
            equal(e.type, 3);
            equal(e.predecessor, task1);
            equal(e.successor, task2);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragEnd(timeline);
    });

    test("dragging and dropping start-finish triggers dependencyDragEnd with correct parameters", 3, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = timeline.view().content.find(".k-task-wrap:last .k-task-end").show();

        timeline.bind("dependencyDragEnd", function(e) {
            equal(e.type, 2);
            equal(e.predecessor, task1);
            equal(e.successor, task2);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragEnd(timeline);
    });

    test("dragging and dropping finish-start triggers dependencyDragEnd with correct parameters", 3, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-end").show();
        var secondTaskHandle = timeline.view().content.find(".k-task-wrap:last .k-task-start").show();

        timeline.bind("dependencyDragEnd", function(e) {
            equal(e.type, 1);
            equal(e.predecessor, task1);
            equal(e.successor, task2);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragEnd(timeline);
    });

    test("dragging and dropping finish-finish triggers dependencyDragEnd with correct parameters", 3, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-end").show();
        var secondTaskHandle = timeline.view().content.find(".k-task-wrap:last .k-task-end").show();

        timeline.bind("dependencyDragEnd", function(e) {
            equal(e.type, 0);
            equal(e.predecessor, task1);
            equal(e.successor, task2);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragEnd(timeline);
    });

    test("dragging and dropping over same task doesn't trigger dependencyDragEnd", 0, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-start").show();

        timeline.bind("dependencyDragEnd", function(e) {
            ok(true);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(firstTaskHandle));
        dragEnd(timeline);
    });

    test("dragging and dropping over space different than dependency handle doesn't trigger dependencyDragEnd", 0, function() {
        setupTimeline();

        var firstTaskHandle = timeline.view().content.find(".k-task-wrap:first .k-task-start").show();

        timeline.bind("dependencyDragEnd", function(e) {
            ok(true);
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, { left: 10, top: 10 });
        dragEnd(timeline);
    });


    module("Timeline Dependency Drag Clue", {
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

    test("dragging creates drag hint", function() {
        setupTimeline();

        var content = timeline.view().content;
        var firstTaskHandle = content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = content.find(".k-task-wrap:last .k-task-start").show();

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));

        ok(content.find(".k-dependency-hint").length);
    });

    test("dropping removes drag hint", function() {
        setupTimeline();

        var content = timeline.view().content;
        var firstTaskHandle = content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = content.find(".k-task-wrap:last .k-task-start").show();

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragEnd(timeline);

        ok(!content.find(".k-dependency-hint").length);
    });

    test("canceling drag removes drag hint", function() {
        setupTimeline();

        var content = timeline.view().content;
        var firstTaskHandle = content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = content.find(".k-task-wrap:last .k-task-start").show();

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));
        dragCancel(timeline);

        ok(!content.find(".k-dependency-hint").length);
    });

    test("dragging calls view _updateDependencyDragHint() method", function() {
        setupTimeline();

        var content = timeline.view().content;
        var firstTaskHandle = content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = content.find(".k-task-wrap:last .k-task-start").show();

        stub(timeline.view(), "_updateDependencyDragHint");

        dragStart(timeline, firstTaskHandle);
        drag(timeline, handleLocation(secondTaskHandle));

        ok(timeline.view().calls("_updateDependencyDragHint"));
    });

    test("dragging calls view _updateDependencyDragHint() method with correct parameters", 4, function() {
        setupTimeline();

        var content = timeline.view().content;
        var firstTaskHandle = content.find(".k-task-wrap:first .k-task-start").show();
        var secondTaskHandle = content.find(".k-task-wrap:last .k-task-start").show();

        stub(timeline.view(), {
            _updateDependencyDragHint: function(from, to) {
                var firstHandleOffset = handleLocation(firstTaskHandle);
                var secondHandleOffset = handleLocation(secondTaskHandle);
                var contentOffset = content.offset();

                equalWithRound(from.x, firstHandleOffset.left - contentOffset.left);
                equalWithRound(from.y, firstHandleOffset.top - contentOffset.top);

                equalWithRound(to.x, secondHandleOffset.left - contentOffset.left);
                equalWithRound(to.y, secondHandleOffset.top - contentOffset.top);
            }
        });

        dragStart(timeline, firstTaskHandle);
        drag(timeline, secondTaskHandle.offset());
    });

    function handleLocation(element) {
        var offset = element.offset();
        var width = element.outerWidth();
        var height = element.outerHeight();

        return { left: offset.left + width / 2, top: offset.top + height / 2 };
    }

    function equalWithRound(value, expected) {
        QUnit.close(value, expected, 3);
    }

    function setupGantt(userOptions) {
        task1 = new kendo.data.GanttTask({
            title: "Task 1",
            percentComplete: 50,
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });
        task2 = new kendo.data.GanttTask({
            title: "Task 2",
            percentComplete: 50,
            start: new Date("2014/04/15 16:00"),
            end: new Date("2014/04/15 17:00")
        });

        var options = extend({}, {
            snap: false,
            views: ["day"],
            showWorkHours: false,
            dataSource: [task1, task2]
        }, userOptions);

        gantt = new kendo.ui.Gantt(element, options);
        timeline = gantt.timeline;
    }

    function setupTimeline(userOptions) {
        var options = extend({}, { snap: false, slotSize: 100 }, userOptions);
        timeline = new kendo.ui.GanttTimeline(element, options);
        timeline.view("day");
        task1 = new kendo.data.GanttTask({
            title: "Task 1",
            percentComplete: 50,
            start: new Date("2014/04/15 12:00"),
            end: new Date("2014/04/15 14:00")
        });
        task2 = new kendo.data.GanttTask({
            title: "Task 2",
            percentComplete: 50,
            start: new Date("2014/04/15 16:00"),
            end: new Date("2014/04/15 17:00")
        });

        timeline._render([task1, task2]);
    }

    function dragStart(ganttTimeline, target) {
        var draggable = ganttTimeline._dependencyDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target
        });
    }

    function drag(ganttTimeline, location) {
        var draggable = ganttTimeline._dependencyDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            x: { location: location.left + 5, client: location.left + 5 },
            y: { location: location.top + 5, client: location.top + 5 }
        });
    }

    function dragEnd(ganttTimeline) {
        var draggable = ganttTimeline._dependencyDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragend");
    }

    function dragCancel(ganttTimeline) {
        var draggable = ganttTimeline._dependencyDraggable;

        if (!draggable) {
            return;
        }

        draggable.trigger("dragcancel");
    }

}());
