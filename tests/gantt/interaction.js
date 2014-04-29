(function() {

    var element;
    var gantt;
    var ganttTimeline;
    var ganttList;
    var range;
    var tasks
    var dependencies;
    var Gantt = kendo.ui.Gantt;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
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
        var dataSource = setupDataSource(options.data);
        ganttList = new GanttList(element, {
            columns: options.columns,
            dataSource: dataSource
        });

        dataSource.fetch();
        ganttList._render(dataSource.taskTree());
    };
    var setupDataSource = function(data) {
        return new GanttDataSource({
            data: data,
            schema: {
                model: {
                    id: "id"
                }
            }
        });
    };

    module("Expand / collapse ", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            ganttList.destroy();
            kendo.destroy(element);
            element.remove();
            ganttList = null;
        }
    });

    test("clicking on icon toggles expanded/collapsed classes", 2, function() {
        setup({ columns: [], data: [{ title: "foo", parentId: null, id: 1, summary: true }] })
        var target = ganttList.content.find(".k-icon:not(.k-i-none)").eq(0);

        target.click();
        ok(!target.hasClass("k-i-collapse"));
        ok(target.hasClass("k-i-expand"));
    });

    test("clicking on icon toggles expanded/collapsed model field", 2, function() {
        setup({ columns: [], data: [{ title: "foo", parentId: null, id: 1, summary: true, expanded: true }] })
        var target = ganttList.content.find(".k-icon:not(.k-i-none)").eq(0);

        ok(ganttList.dataSource.at(0).get("expanded"));
        target.click();
        ok(!ganttList.dataSource.at(0).get("expanded"));
    });

    test("dblclick on icon stops event propagation", function() {
        setup({ columns: [], data: [{ title: "foo", parentId: null, id: 1, summary: true, expanded: true }] })
        var target = ganttList.content.find(".k-icon:not(.k-i-none)").eq(0);
        var flag;

        ganttList.content.on("dblclick", "td", function() {
            flag = true;
        });

        target.dblclick();

        ok(!flag);

        ganttList.content.off();
    });

    module("List Selection", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            ganttList.destroy();
            kendo.destroy(element);
            element.remove();
            ganttList = null;
        }
    });

    test("clicking on a tr calls select(':selector')", function() {
        setup({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        var target = ganttList.content.find("tr:first");
        stub(ganttList, "select");

        target.click();

        ok(ganttList.calls("select"));
    });

    test("clicking with Ctrl on a tr calls clearSelection()", function() {
        setup({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });
        var e = new $.Event("click");
        var target = ganttList.content.find("tr:first")
            .addClass(".k-state-selected");

        e.ctrlKey = true;
        stub(ganttList, "clearSelection");
        target.trigger(e);

        ok(ganttList.calls("clearSelection"));
    });

    module("Timeline Selection", {
        setup: function() {
            element = $("<div />");
            gantt = new Gantt(element);
            ganttTimeline = gantt.timeline;
            range = {
                start: new Date("2014/04/15"),
                end: new Date("2014/04/17")
            };
            tasks = [{
                id: 1,
                uid: "UniqueId1",
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            }, {
                id: 2,
                uid: "UniqueId2",
                start: new Date("2014/04/16"),
                end: new Date("2014/04/17")
            }, {
                id: 3,
                uid: "UniqueId3",
                start: new Date("2014/04/16"),
                end: new Date("2014/04/17")
            }];
            dependencies = [{
                uid: "DependencyUniqueId1",
                predecessorId: 1,
                successorId: 2,
                type: 1
            }, {
                uid: "DependencyUniqueId2",
                predecessorId: 2,
                successorId: 3,
                type: 1
            }];
        },
        teardown: function() {
            gantt.destroy();

            kendo.destroy(element);
        }
    });

    test("clicking on a task calls select(':selector')", function() {
        ganttTimeline._render(tasks, range);

        var target = ganttTimeline.wrapper.find(".k-event:first");

        stub(gantt, "select");

        target.click();

        ok(gantt.calls("select"));
    });

    test("clicking on a task calls select(':selector') with correct parameter", 1, function() {
        ganttTimeline._render(tasks, range);

        var target = ganttTimeline.wrapper.find(".k-event:first");

        stub(gantt, {
            select: function(value) {
                equal(value, "[data-uid='UniqueId1']");
            }
        });

        target.click();
    });

    test("clicking on a dependency calls selectDependency(':selector')", function() {
        ganttTimeline._render(tasks, range);
        ganttTimeline._renderDependencies(dependencies);

        var target = ganttTimeline.wrapper.find(".k-gantt-line:first");

        stub(ganttTimeline, "selectDependency");

        target.click();

        equal(ganttTimeline.calls("selectDependency"), 1);
    });

    test("clicking on a dependency calls selectDependency(':selector') with correct parameter", 1, function() {
        ganttTimeline._render(tasks, range);
        ganttTimeline._renderDependencies(dependencies);

        var target = ganttTimeline.wrapper.find(".k-gantt-line:first");

        stub(ganttTimeline, {
            selectDependency: function(value) {
                equal(value, target[0]);
            }
        });

        target.click();
    });

    test("clicking on a task row calls clearSelection()", function() {
        ganttTimeline._render(tasks, range);

        var target = ganttTimeline.wrapper.find(".k-gantt-tasks tr:first");

        stub(gantt, "clearSelection");

        target.click();

        ok(gantt.calls("clearSelection"));
    });

    module("TaskDropDown", {
        setup: function() {
            element = $("<div/>");
            gantt = new Gantt(element, {
                dataSource: setupDataSource(data)
            });
        },
        teardown: function() {
            kendo.destroy(element);
        }
    });

    test("triggers command upon click", 2, function() {
        var dropDown = gantt.headerDropDown;

        dropDown.bind("command", function(e) {
            ok(true);
            equal(e.type, "add");
        });

        dropDown.element.find("li").click();
    });

    test("triggers command upon list item click", 2, function() {
        var dropDown = gantt.headerDropDown;

        gantt.select("tr:first");

        dropDown.bind("command", function(e) {
            ok(true);
            equal(e.type, "add");
        });

        dropDown.list.find("li:first").eq(0).click();
    });

    test("closes popup upon list item click", function() {
        var dropDown = gantt.headerDropDown;

        gantt.select("tr:first");
        dropDown.element.find("li").click();

        stub(dropDown.popup, "close");

        dropDown.list.find("li:first").eq(0).click();

        ok(dropDown.popup.calls("close"));
    });

    test("does not trigger command upon click should gantt has selection", function() {
        var dropDown = gantt.headerDropDown;
        var flag = true;
        gantt.select("tr:first");

        dropDown.bind("command", function(e) {
            flag = false;
        });

        dropDown.element.find("li").click();

        ok(flag);
    });

    test("opens popup upon click should gantt has selection", function() {
        var dropDown = gantt.headerDropDown;

        gantt.select("tr:first");
        stub(dropDown.popup, "open");
        dropDown.element.find("li").click();

        ok(dropDown.popup.calls("open"));
    });

    test("command trigger add event", function() {
        gantt.bind("add", function(e) {
            ok(true);
            ok(e.task instanceof kendo.data.GanttTask);
        });

        gantt.headerDropDown.trigger("command", { type: "add" });
    });

    test("canceling add event does not add task", function() {
        gantt.bind("add", function(e) {
            e.preventDefault();
        });

        gantt.headerDropDown.trigger("command", { type: "add" });

        equal(gantt.dataSource.taskChildren().length, 2);
    });

    test("'add' appends task to root collection", function() {
        var dropDown = gantt.headerDropDown;

        dropDown.trigger("command", { type: "add" });

        equal(gantt.dataSource.taskChildren().length, 3);
    });

    test("'add' appends task to root collection with correct parameters", 3, function() {
        var dropDown = gantt.headerDropDown;
        var firstTimeSlot = gantt.timeline.view()._timeSlots()[0];
        var newTask;

        dropDown.trigger("command", { type: "add" });

        newTask = gantt.dataSource.taskChildren()[2];

        equal(newTask.get("title"), "New task");
        equal(newTask.get("start"), firstTimeSlot.start);
        equal(newTask.get("end"), firstTimeSlot.end);
    });

    test("'add' appends task to the selected task collection", function() {
        var dropDown = gantt.headerDropDown;
        var selectedTask;

        gantt.select("tr:first");
        selectedTask = gantt.dataItem(gantt.select());
        dropDown.trigger("command", { type: "add" });

        equal(gantt.dataSource.taskChildren(selectedTask).length, 3);
    });

    test("'add' appends task to the selected task collection with correct parameters", 3, function() {
        var dropDown = gantt.headerDropDown;
        var selectedTask;
        var newTask;

        gantt.select("tr:first");
        selectedTask = gantt.dataItem(gantt.select());
        dropDown.trigger("command", { type: "add" });
        newTask = gantt.dataSource.taskChildren(selectedTask)[2];

        equal(newTask.get("title"), "New task");
        equal(newTask.get("start"), selectedTask.get("start"));
        equal(newTask.get("end"), selectedTask.get("end"));
    });

    test("'insertBefore' insert task before the selected", 3, function() {
        var dropDown = gantt.headerDropDown;
        var rootTasks;

        gantt.select("tr:last");
        dropDown.trigger("command", { type: "insert-before" });
        rootTasks = gantt.dataSource.taskChildren();

        equal(rootTasks[0].get("title"), "foo");
        equal(rootTasks[1].get("title"), "New task");
        equal(rootTasks[2].get("title"), "bar");
    });

    test("'insertBefore' insert task with parent's start/end of selected task", 2, function() {
        var dropDown = gantt.headerDropDown;
        var selectedTask;
        var parent;
        var newTask;

        gantt.select("tr:eq(2)");
        selectedTask = gantt.dataItem(gantt.select());
        dropDown.trigger("command", { type: "insert-before" });
        parent = gantt.dataSource.taskParent(selectedTask);
        newTask = gantt.dataSource.taskSiblings(selectedTask)[1];


        equal(newTask.get("start"), parent.get("start"));
        equal(newTask.get("end"), parent.get("end"));
    });

    test("'insertBefore' insert task with first time slot start/end when selected task is root", 2, function() {
        var dropDown = gantt.headerDropDown;
        var firstTimeSlot = gantt.timeline.view()._timeSlots()[0];
        var newTask;

        gantt.select("tr:first");
        dropDown.trigger("command", { type: "insert-before" });
        newTask = gantt.dataSource.taskChildren()[0];

        equal(newTask.get("start"), firstTimeSlot.start);
        equal(newTask.get("end"), firstTimeSlot.end);
    });

    test("'insertAfter' insert task after the selected", 3, function() {
        var dropDown = gantt.headerDropDown;
        var rootTasks;

        gantt.select("tr:last");
        dropDown.trigger("command", { type: "insert-after" });
        rootTasks = gantt.dataSource.taskChildren();

        equal(rootTasks[0].get("title"), "foo");
        equal(rootTasks[1].get("title"), "bar");
        equal(rootTasks[2].get("title"), "New task");
    });

    test("'insertAfter' insert task with parent's start/end of selected task", 2, function() {
        var dropDown = gantt.headerDropDown;
        var selectedTask;
        var parent;
        var newTask;

        gantt.select("tr:eq(2)");
        selectedTask = gantt.dataItem(gantt.select());
        dropDown.trigger("command", { type: "insert-after" });
        parent = gantt.dataSource.taskParent(selectedTask);
        newTask = gantt.dataSource.taskSiblings(selectedTask)[2];

        equal(newTask.get("start"), parent.get("start"));
        equal(newTask.get("end"), parent.get("end"));
    });

    test("'insertAfter' insert task with first time slot start/end when selected task is root", 2, function() {
        var dropDown = gantt.headerDropDown;
        var firstTimeSlot = gantt.timeline.view()._timeSlots()[0];
        var newTask;

        gantt.select("tr:first");
        dropDown.trigger("command", { type: "insert-after" });
        newTask = gantt.dataSource.taskChildren()[1];

        equal(newTask.get("start"), firstTimeSlot.start);
        equal(newTask.get("end"), firstTimeSlot.end);
    });

})();