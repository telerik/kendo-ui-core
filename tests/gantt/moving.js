(function() {
    var element;
    var gantt;
    var ganttList;
    var Gantt = kendo.ui.Gantt;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
    var draggable;
    var dropTargetArea;
    var data = [
        {
            id: 1,
            parentId: null,
            orderId: 0,
            title: "foo",
            start: new Date("2014/03/31"),
            end: new Date("2014/04/05"),
            summary: true,
            expanded: true
        },
        {
            id: 2,
            parentId: null,
            orderId: 1,
            title: "bar",
            start: new Date("2014/04/02"),
            end: new Date("2014/04/03"),
            summary: false
        },
        {
            id: 3,
            parentId: 1,
            orderId: 0,
            title: "foo.bar",
            start: new Date("2014/03/31"),
            end: new Date("2014/04/02"),
            summary: true,
            expanded: true
        },
        {
            id: 5,
            parentId: 3,
            orderId: 0,
            title: "foo.bar.foo",
            start: new Date("2014/03/31"),
            end: new Date("2014/04/02"),
            summary: false
        },
        {
            id: 4,
            parentId: 1,
            orderId: 1,
            title: "foo.foo",
            start: new Date("2014/04/02"),
            end: new Date("2014/04/05"),
            summary: false
        }
    ];
    var setup = function(options) {
        var dataSource = setupDataSource(options ? options.data : data);
        ganttList = new GanttList(element, {
            columns: options ? options.columns : [],
            dataSource: dataSource
        });

        dataSource.fetch();
        ganttList._render(dataSource.taskTree());
    };
    var setupDataSource = function(testData) {
        return new GanttDataSource({
            data: testData,
            schema: {
                model: {
                    id: "id"
                }
            }
        });
    };
    var createHint = function() {
        draggable.hint = $('<div class="k-header k-drag-clue"/>')
            .append('<span class="k-icon k-drag-status k-denied" /><span class="k-clue-text"/>');
    };

    function dragstart(target) {
        if (!draggable) {
            return;
        }

        draggable.trigger("dragstart", {
            currentTarget: target
        });
    }

    function drag(target, offset) {
        if (!draggable) {
            return;
        }

        draggable.trigger("drag", {
            currentTarget: target,
            x: { initialDelta: offset },
            y: { location: offset }
        });
    }

    function dragenter(target) {
        if (!dropTargetArea) {
            return;
        }

        dropTargetArea.trigger("dragenter", {
            dropTarget: target
        });
    }

    function dragleave() {
        if (!dropTargetArea) {
            return;
        }

        dropTargetArea.trigger("dragleave", { });
    }

    function drop() {
        if (!dropTargetArea) {
            return;
        }

        dropTargetArea.trigger("drop", {});
    }

    module("Moving", {
        setup: function() {
            element = $("<div />");
        },
        teardown: function() {
            kendo.destroy(element);
            draggable = null;
            dropTargetArea = null;
        }
    });

    //test("moving task triggers movestart event", 1, function() {
    //    var gantt = new Gantt(element, {
    //        dataSource: [
    //            { start: new Date("2014/04/30 10:30"), end: new Date("2014/04/30 12:30") }
    //        ],
    //        moveStart: function(e) {
    //            equal(e.task, gantt.dataSource.at(0));
    //        }
    //    });

    //    var handle = element.find(".k-event").eq(0);

    //    draggable = gantt.timeline._moveDraggable;

    //    dragstart(handle);
    //});

    module("List Drag/Drop", {
        setup: function() {
            element = $("<div/>")
                .appendTo(QUnit.fixture);

            setup();
            draggable = ganttList.
                content.data("kendoDraggable");
            dropTargetArea = ganttList.
                content.data("kendoDropTargetArea");
            createHint();
        },
        teardown: function() {
            ganttList.destroy();
            element.remove();
            draggable = null;
            dropTargetArea = null;
        }
    });

    test("list draggable and dropTargetArea have same group", function() {
        ok(draggable.options.group === dropTargetArea.options.group);
    });

    test("drag start append task title to hint", function() {
        dragstart(ganttList.content.find("tr:first"));
        equal(draggable
            .hint
            .children(".k-clue-text")
            .text(), "foo");
    });

    test("dragenter on possible target removes denied class", function() {
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));

        ok(!draggable
            .hint
            .children(".k-drag-status")
            .hasClass("k-denied"));
    });

    test("dragenter on denied target does not remove denied class", function() {
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:eq(1)"));

        ok(draggable
            .hint
            .children(".k-drag-status")
            .hasClass("k-denied"));
    });

    test("dragleave removes position class", function() {
        var statusHint = draggable.hint.children(".k-drag-status");

        statusHint.addClass("k-add");
        dragleave();

        ok(!statusHint.hasClass("k-add"));
    });

    test("drop on possible target trigger update event", 1, function() {
        ganttList.bind("update", function() {
            ok(true);
        });
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drop();
    });

    test("drop on child does not trigger update event", 1, function() {
        var flag = true;

        ganttList.bind("update", function() {
            flag = false;
        });
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:eq(1)"));
        drop();

        ok(flag);
    });

    test("drop on grand child does not trigger update event", 1, function() {
        var flag = true;

        ganttList.bind("update", function() {
            flag = false;
        });
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:eq(2)"));
        drop();

        ok(flag);
    });

    test("drop on self does not trigger update event", 1, function() {
        var flag = true;

        ganttList.bind("update", function() {
            flag = false;
        });
        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:first"));
        drop();

        ok(flag);
    });

    test("drag on upper part of target set drop position class", function() {
        var target = ganttList.content.find("tr:last");
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.20));

        ok(draggable
            .hint
            .children(".k-drag-status")
            .hasClass("k-insert-top"));
    });

    test("drag on upper part of target set update arguments", 3, function() {
        var target = ganttList.content.find("tr:last");
        var targetTask = ganttList._modelFromElement(target);
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        ganttList.bind("update", function(e) {
            equal(e.task.get("title"), "foo");
            equal(e.updateInfo.parentId, targetTask.get("parentId"));
            equal(e.updateInfo.orderId, targetTask.get("orderId"));
        });

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.20));
        drop();
    });

    test("drag on middle part of target set drop position class", function() {
        var target = ganttList.content.find("tr:last");
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.60));

        ok(draggable
            .hint
            .children(".k-drag-status")
            .hasClass("k-add"));
    });

    test("drag on middle part of target set update arguments", 2, function() {
        var target = ganttList.content.find("tr:last");
        var targetTask = ganttList._modelFromElement(target);
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        ganttList.bind("update", function(e) {
            equal(e.task.get("title"), "foo");
            equal(e.updateInfo.parentId, targetTask.get("id"));
        });

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.60));
        drop();
    });

    test("drag on bottom part of target set drop position class", function() {
        var target = ganttList.content.find("tr:last");
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.90));

        ok(draggable
            .hint
            .children(".k-drag-status")
            .hasClass("k-insert-bottom"));
    });

    test("drag on bottom part of target set update arguments", 3, function() {
        var target = ganttList.content.find("tr:last");
        var targetTask = ganttList._modelFromElement(target);
        var height = target.height();
        var offsetY = kendo.getOffset(target).top;

        ganttList.bind("update", function(e) {
            equal(e.task.get("title"), "foo");
            equal(e.updateInfo.parentId, targetTask.get("parentId"));
            equal(e.updateInfo.orderId, targetTask.get("orderId") + 1);
        });

        dragstart(ganttList.content.find("tr:first"));
        dragenter(ganttList.content.find("tr:last"));
        drag(target, (offsetY + height * 0.90));
        drop();
    });

    module("Gantt non-editable", {
        setup: function () {
            element = $("<div/>");

            gantt = new Gantt(element, { editable: false });
        },
        teardown: function () {
            gantt.destroy();
        }
    });

    test("does not attach draggable widget to the list content", function () {
        ok(!gantt.list.content.data("kendoDraggable"));
    });

    test("does not attach dropTargetArea widget to the list content", function () {
        ok(!gantt.list.content.data("kendoDropTargetArea"));
    });
}());
