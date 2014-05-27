(function() {
    var GanttTask = kendo.data.GanttTask;
    var GanttDataSource = kendo.data.GanttDataSource;
    var GanttDependency = kendo.data.GanttDependency;
    var GanttDependencyDataSource = kendo.data.GanttDependencyDataSource;
    var dataSource;
    var task;

    module("GanttTask", {
        setup: function() {
            dataSource = new GanttDataSource({
                data: [
                { title: "Task1", parentId: null, id: 1 },
                    { title: "Child 1.1", parentId: 1, id: 2 }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });
        }
    });

    test("GanttTask inherits kendo.data.Model", function() {
        var task = new GanttTask();

        ok(task instanceof kendo.data.Model);
    });

    test("GanttTask creates kendo.data.GanttTask instance", function() {
        var task = new GanttTask();

        ok(task instanceof kendo.data.GanttTask);
    });

    test("GanttTask isMilestone returns true for zero duration", function() {
        var task = new GanttTask();

        task.set("start", new Date("2014/04/04"));
        task.set("end", new Date("2014/04/04"));

        ok(task.isMilestone());
    });

    test("GanttTask isMilestone returns false for non zero duration", function() {
        var task = new GanttTask();

        task.set("start", new Date("2014/04/04"));
        task.set("end", new Date("2014/04/06"));

        ok(!task.isMilestone());
    });


    module("GanttDataSource", {
        setup: function() {
            dataSource = new GanttDataSource({
                data: [
                { title: "Task1", parentId: null, id: 1 },
                    { title: "Child 1.1", parentId: 1, id: 2 },
                        { title: "Child 1.1.1", parentId: 2, id: 3 },
                        { title: "Child 1.1.2", parentId: 2, id: 4 },
                    { title: "Child 1.2", parentId: 1, id: 5 },
                    { title: "Child 1.3", parentId: 1, id: 6 },
                { title: "Task2", parentId: null, id: 7 },
                    { title: "Child 2.1", parentId: 7, id: 8 },
                    { title: "Child 2.2", parentId: 7, id: 9 },
                    { title: "Child 2.3", parentId: 7, id: 10 }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
        }
    });

    test("GanttDataSource creates kendo.data.DataSource instance", function() {
        var dataSource = new GanttDataSource();

        ok(dataSource instanceof kendo.data.DataSource);
    });

    test("taskChildren() returns root tasks", 3, function() {
        var roots = dataSource.taskChildren();

        equal(roots.length, 2);
        equal(roots[0].get("title"), "Task1");
        equal(roots[1].get("title"), "Task2");
    });

    test("taskChildren(null) returns root tasks", 3, function() {
        var roots = dataSource.taskChildren(null);

        equal(roots.length, 2);
        equal(roots[0].get("title"), "Task1");
        equal(roots[1].get("title"), "Task2");
    });

    test("taskChildren(object) returns direct children", 4, function() {
        var parent = dataSource.at(0);
        var children = dataSource.taskChildren(parent);

        equal(children.length, 3);
        equal(children[0].get("title"), "Child 1.1");
        equal(children[1].get("title"), "Child 1.2");
        equal(children[2].get("title"), "Child 1.3");
    });

    test("taskAllChildren() returns all tasks", function() {
        var children = dataSource.taskAllChildren();

        equal(children.length, 10);
    });

    test("taskAllChildren(object) returns all children recursively", function() {
        var parent = dataSource.get(1);
        var children = dataSource.taskAllChildren(parent);

        equal(children.length, 5);
    });

    test("taskParent(object) returns parent task", function() {
        var child = dataSource.get(2);
        var parent = dataSource.taskParent(child);

        equal(parent.get("title"), "Task1");
    });

    test("taskParent(null) returns null", function() {
        var parent = dataSource.taskParent(null);

        ok(parent === null);
    });

    test("taskSiblings() for root level task returns root tasks", 3, function() {
        var task = dataSource.at(0);
        var siblings = dataSource.taskSiblings(task);

        equal(siblings.length, 2);
        equal(siblings[0].get("title"), "Task1");
        equal(siblings[1].get("title"), "Task2");
    });

    test("taskSiblings() for child task returns sibling tasks", 4, function() {
        var task = dataSource.get(2);
        var siblings = dataSource.taskSiblings(task);

        equal(siblings.length, 3);
        equal(siblings[0].get("title"), "Child 1.1");
        equal(siblings[1].get("title"), "Child 1.2");
        equal(siblings[2].get("title"), "Child 1.3");
    });

    test("taskSiblings(null) returns null", function() {
        var siblings = dataSource.taskSiblings(null);

        ok(siblings === null);
    });

    test("taskLevel() returns 0 for root task", function() {
        var task = dataSource.get(1);

        equal(dataSource.taskLevel(task), 0);
    });

    test("taskLevel() returns correct value for child task", function() {
        var task = dataSource.get(2);

        equal(dataSource.taskLevel(task), 1);
    });

    test("taskTree() returns tasks in correct order", function() {
        /* 

        Tasks should be returned in the following order:

        Task1
            Child 1.1
                Child 1.1.1
                Child 1.1.2
        Task2
            Child 2.1

        */

        dataSource = new GanttDataSource({
            data: [
            { title: "Task1", parentId: null, id: 1, expanded: true },
            { title: "Task2", parentId: null, id: 2, expanded: true },
            { title: "Child 1.1", parentId: 1, id: 3, expanded: true },
            { title: "Child 2.1", parentId: 2, id: 4 },
            { title: "Child 1.1.1", parentId: 3, id: 5 },
            { title: "Child 1.1.2", parentId: 3, id: 6 }
            ],
            schema: {
                model: {
                    id: "id"
                }
            }
        });
        dataSource.fetch();

        var tasks = dataSource.taskTree();

        equal(tasks[0].id, 1);
        equal(tasks[1].id, 3);
        equal(tasks[2].id, 5);
        equal(tasks[3].id, 6);
        equal(tasks[4].id, 2);
        equal(tasks[5].id, 4);
    });

    test("taskTree() skips the children of collapsed tasks", function() {
        /* 

       Tasks should be returned in the following order:

       Task1
           Child 1.1
       Task2
           Child 2.1

       */

        dataSource = new GanttDataSource({
            data: [
            { title: "Task1", parentId: null, id: 1, expanded: true },
            { title: "Task2", parentId: null, id: 2, expanded: true },
            { title: "Child 1.1", parentId: 1, id: 3, expanded: false },
            { title: "Child 2.1", parentId: 2, id: 4 },
            { title: "Child 1.1.1", parentId: 3, id: 5 },
            { title: "Child 1.1.2", parentId: 3, id: 6 }
            ],
            schema: {
                model: {
                    id: "id"
                }
            }
        });
        dataSource.fetch();

        var tasks = dataSource.taskTree();

        equal(tasks[0].id, 1);
        equal(tasks[1].id, 3);
        equal(tasks[2].id, 2);
        equal(tasks[3].id, 4);
        equal(tasks.length, 4);
    });


    module("GanttDataSource update()", {
        setup: function() {
            dataSource = new GanttDataSource({
                data: [{
                    id: 1,
                    title: "Task1",
                    parentId: null,
                    orderId: 0,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/01"),
                    percentComplete: 20
                }, {
                    id: 2,
                    title: "Task2",
                    parentId: null,
                    orderId: 0,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/01"),
                    percentComplete: 20
                }],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
            task = dataSource.at(0);
        }
    });

    test("updates start field", function() {
        var newDate = new Date("2014/03/30");

        dataSource.update(task, { start: newDate });

        equal(task.get("start"), newDate);
    });

    test("updates end field", function() {
        var newDate = new Date("2014/04/02");

        dataSource.update(task, { end: newDate });

        equal(task.get("end"), newDate);
    });

    test("updates title field", function() {
        var newTitle = "Updated Task";

        dataSource.update(task, { title: newTitle });

        equal(task.get("title"), newTitle);
    });

    test("updates orderId field", function() {
        var newOrderId = 1;

        dataSource.update(task, { orderId: newOrderId });

        equal(task.get("orderId"), newOrderId);
    });

    test("updates parentId field", function() {
        var newParentId = 2;

        dataSource.update(task, { parentId: newParentId });

        equal(task.get("parentId"), newParentId);
    });

    test("updates percentComplete field", function() {
        var newPercentComplete = 50;

        dataSource.update(task, { percentComplete: newPercentComplete });

        equal(task.get("percentComplete"), newPercentComplete);
    });

    test("updates multiple fields", function() {
        var newDate = new Date("2014/04/02");
        var newTitle = "Updated Task";

        dataSource.update(task, { start: newDate, title: newTitle });

        equal(task.get("start"), newDate);
        equal(task.get("title"), newTitle);
    });


    module("GanttDataSource update() related tasks", {
        setup: function() {
            dataSource = new GanttDataSource({
                data: [
                {
                    id: 1,
                    title: "Parent",
                    parentId: null,
                    orderId: 0,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/06"),
                    percentComplete: 40,
                    summary: true
                },
                    {
                        id: 2,
                        title: "Child1",
                        parentId: 1,
                        orderId: 0,
                        start: new Date("2014/03/31"),
                        end: new Date("2014/04/04"),
                        percentComplete: 60,
                        summary: true
                    },
                        {
                            id: 3,
                            title: "Task1",
                            parentId: 2,
                            orderId: 0,
                            start: new Date("2014/03/31"),
                            end: new Date("2014/04/01"),
                            percentComplete: 80,
                            summary: false
                        },
                        {
                            id: 4,
                            title: "Task2",
                            parentId: 2,
                            orderId: 1,
                            start: new Date("2014/04/02"),
                            end: new Date("2014/04/03"),
                            percentComplete: 60,
                            summary: false
                        },
                        {
                            id: 5,
                            title: "Task3",
                            parentId: 2,
                            orderId: 2,
                            start: new Date("2014/04/02"),
                            end: new Date("2014/04/04"),
                            percentComplete: 40,
                            summary: false
                        },
                    {
                        id: 6,
                        title: "Child2",
                        parentId: 1,
                        orderId: 1,
                        start: new Date("2014/04/05"),
                        end: new Date("2014/04/06"),
                        percentComplete: 20,
                        summary: false
                    },
                {
                    id: 7,
                    title: "Parent2",
                    parentId: null,
                    orderId: 1,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/06"),
                    percentComplete: 40,
                    summary: false
                },
                {
                    id: 8,
                    title: "Parent3",
                    parentId: null,
                    orderId: 2,
                    start: new Date("2014/04/02"),
                    end: new Date("2014/04/03"),
                    percentComplete: 60,
                    summary: true
                },
                    {
                        id: 9,
                        title: "Child1",
                        parentId: 8,
                        orderId: 0,
                        start: new Date("2014/04/02"),
                        end: new Date("2014/04/03"),
                        percentComplete: 60,
                        summary: false
                    }],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
        }
    });

    test("start updates children start", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(2);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(3).start, "yyyy/MM/dd"), "2014/03/30");
        equal(kendo.toString(dataSource.get(4).start, "yyyy/MM/dd"), "2014/04/01");
        equal(kendo.toString(dataSource.get(5).start, "yyyy/MM/dd"), "2014/04/01");
    });

    test("start updates children end", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(2);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(3).end, "yyyy/MM/dd"), "2014/03/31");
        equal(kendo.toString(dataSource.get(4).end, "yyyy/MM/dd"), "2014/04/02");
        equal(kendo.toString(dataSource.get(5).end, "yyyy/MM/dd"), "2014/04/03");
    });

    test("start updates children start recursively", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(1);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(3).start, "yyyy/MM/dd"), "2014/03/30");
        equal(kendo.toString(dataSource.get(4).start, "yyyy/MM/dd"), "2014/04/01");
        equal(kendo.toString(dataSource.get(5).start, "yyyy/MM/dd"), "2014/04/01");
    });

    test("start updates children end recursively", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(1);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(3).end, "yyyy/MM/dd"), "2014/03/31");
        equal(kendo.toString(dataSource.get(4).end, "yyyy/MM/dd"), "2014/04/02");
        equal(kendo.toString(dataSource.get(5).end, "yyyy/MM/dd"), "2014/04/03");
    });

    test("start updates parent start", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(2);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(1).start, "yyyy/MM/dd"), "2014/03/30");
    });

    test("start updates parent start to earliest from children", function() {
        var newDate = new Date("2014/04/06");
        var task = dataSource.get(2);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(1).start, "yyyy/MM/dd"), "2014/04/05");
    });

    test("start updates parent start recursively", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(3);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(1).start, "yyyy/MM/dd"), "2014/03/30");
    });

    test("start does not update parent end", function() {
        var newDate = new Date("2014/03/30");
        var task = dataSource.get(2);

        dataSource.update(task, { start: newDate });

        equal(kendo.toString(dataSource.get(1).end, "yyyy/MM/dd"), "2014/04/06");

    });


    test("end does not update children start", function() {
        var newDate = new Date("2014/04/07");
        var task = dataSource.get(2);

        dataSource.update(task, { end: newDate });

        equal(kendo.toString(dataSource.get(3).start, "yyyy/MM/dd"), "2014/03/31");
        equal(kendo.toString(dataSource.get(4).start, "yyyy/MM/dd"), "2014/04/02");
        equal(kendo.toString(dataSource.get(5).start, "yyyy/MM/dd"), "2014/04/02");
    });

    test("end does not update children end", function() {
        var newDate = new Date("2014/04/07");
        var task = dataSource.get(2);

        dataSource.update(task, { end: newDate });

        equal(kendo.toString(dataSource.get(3).end, "yyyy/MM/dd"), "2014/04/01");
        equal(kendo.toString(dataSource.get(4).end, "yyyy/MM/dd"), "2014/04/03");
        equal(kendo.toString(dataSource.get(5).end, "yyyy/MM/dd"), "2014/04/04");
    });

    test("end updates parent end", function() {
        var newDate = new Date("2014/04/07");
        var task = dataSource.get(2);

        dataSource.update(task, { end: newDate });

        equal(kendo.toString(dataSource.get(1).end, "yyyy/MM/dd"), "2014/04/07");
    });

    test("end updates parent end to latest from children", function() {
        var newDate = new Date("2014/04/03");
        var task = dataSource.get(6);

        dataSource.update(task, { end: newDate });

        equal(kendo.toString(dataSource.get(1).end, "yyyy/MM/dd"), "2014/04/04");
    });

    test("end updates parent end recursively", function() {
        var newDate = new Date("2014/04/07");
        var task = dataSource.get(3);

        dataSource.update(task, { end: newDate });

        equal(kendo.toString(dataSource.get(1).end, "yyyy/MM/dd"), "2014/04/07");
    });


    test("percentComplete updates parent percentComplete", function() {
        var task = dataSource.get(2);

        dataSource.update(task, { percentComplete: 70 });

        equal(dataSource.get(1).get("percentComplete"), 45);
    });

    test("percentComplete updates parent percentComplete recursively", 2, function() {
        var task = dataSource.get(3);

        dataSource.update(task, { percentComplete: 50 });

        equal(dataSource.get(1).get("percentComplete"), 35);
        equal(dataSource.get(2).get("percentComplete"), 50);
    });

    test("percentComplete does not update children percentComplete", function() {
        var task = dataSource.get(2);

        dataSource.update(task, { percentComplete: 30 });

        equal(dataSource.get(3).get("percentComplete"), 80);
        equal(dataSource.get(4).get("percentComplete"), 60);
        equal(dataSource.get(5).get("percentComplete"), 40);
    });


    test("orderId increased updates siblings orderId", function() {
        var task = dataSource.get(3);

        dataSource.update(task, { orderId: 2 });

        equal(dataSource.get(4).get("orderId"), 0);
        equal(dataSource.get(5).get("orderId"), 1);
    });

    test("orderId decreased updates siblings orderId", function() {
        var task = dataSource.get(5);

        dataSource.update(task, { orderId: 0 });

        equal(dataSource.get(3).get("orderId"), 1);
        equal(dataSource.get(4).get("orderId"), 2);
    });


    test("parentId updates old siblings orderId", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: 1 });

        equal(dataSource.get(3).get("orderId"), 0);
        equal(dataSource.get(5).get("orderId"), 1);
    });

    test("parentId updates old siblings orderId when oldParentId is null", function() {
        var task = dataSource.get(7);

        dataSource.update(task, { parentId: 1 });

        equal(dataSource.get(1).get("orderId"), 0);
        equal(dataSource.get(8).get("orderId"), 1);
    });

    test("parentId updates orderId to last in new collection", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: 1 });

        equal(task.get("orderId"), 2);
    });

    test("parentId to null updates orderId to last in root collection", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: null });

        equal(task.get("orderId"), 3);
    });

    test("parentId and orderId updates new siblings orderId", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: 1, orderId: 1 });

        equal(dataSource.get(2).get("orderId"), 0);
        equal(dataSource.get(6).get("orderId"), 2);
    });

    test("parentId to null and orderId updates root siblings orderId", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: null, orderId: 0 });

        equal(dataSource.get(1).get("orderId"), 1);
    });

    test("parentId and orderId updates orderId to set value", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: 1, orderId: 1 });

        equal(task.get("orderId"), 1);
    });

    test("parentId to null and orderId updates orderId to set value", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { parentId: null, orderId: 0 });

        equal(task.get("orderId"), 0);
    });

    test("orderId and parentId updates orderId to set value", function() {
        var task = dataSource.get(4);

        dataSource.update(task, { orderId: 1, parentId: 1 });

        equal(task.get("orderId"), 1);
    });


    test("parentId updates old parent summary field", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 1 });

        ok(!dataSource.get(8).get("summary"));
    });

    test("parentId updates new parent summary field", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 7 });

        ok(dataSource.get(7).get("summary"));
    });


    test("parentId updates old parent start when it has remaining children", function() {
        var task = dataSource.get(3);

        dataSource.update(task, { parentId: 1 });

        equal(kendo.toString(dataSource.get(2).start, "yyyy/MM/dd"), "2014/04/02");
    });

    test("parentId updates old parent end when it has remaining children", function() {
        var task = dataSource.get(5);

        dataSource.update(task, { parentId: 1 });

        equal(kendo.toString(dataSource.get(2).end, "yyyy/MM/dd"), "2014/04/03");
    });

    test("parentId updates old parent percentComplete when it has remaining children", function() {
        var task = dataSource.get(3);

        dataSource.update(task, { parentId: 1 });

        equal(dataSource.get(2).get("percentComplete"), 50);
    });

    test("parentId doesn't update old parent start when it has no remaining children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 1 });

        equal(kendo.toString(dataSource.get(8).start, "yyyy/MM/dd"), "2014/04/02");
    });

    test("parentId doesn't update old parent end when it has no remaining children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 1 });

        equal(kendo.toString(dataSource.get(8).end, "yyyy/MM/dd"), "2014/04/03");
    });

    test("parentId doesn't update old parent percentComplete when it has no remaining children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 1 });

        equal(dataSource.get(8).get("percentComplete"), 60);
    });


    test("parentId updates new parent start when it has previous children", function() {
        var task = dataSource.get(7);

        dataSource.update(task, { parentId: 8 });

        equal(kendo.toString(dataSource.get(8).start, "yyyy/MM/dd"), "2014/03/31");
    });

    test("parentId updates new parent end when it has previous children", function() {
        var task = dataSource.get(7);

        dataSource.update(task, { parentId: 8 });

        equal(kendo.toString(dataSource.get(8).end, "yyyy/MM/dd"), "2014/04/06");
    });

    test("parentId updates new parent percentComplete when it has previous children", function() {
        var task = dataSource.get(7);

        dataSource.update(task, { parentId: 8 });

        equal(dataSource.get(8).get("percentComplete"), 50);
    });

    test("parentId updates new parent start when it has no previous children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 8 });

        equal(kendo.toString(dataSource.get(8).start, "yyyy/MM/dd"), "2014/04/02");
    });

    test("parentId updates new parent end when it has no previous children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 8 });

        equal(kendo.toString(dataSource.get(8).end, "yyyy/MM/dd"), "2014/04/03");
    });

    test("parentId updates new parent percentComplete when it has no previous children", function() {
        var task = dataSource.get(9);

        dataSource.update(task, { parentId: 8 });

        equal(dataSource.get(8).get("percentComplete"), 60);
    });



    module("GanttDataSource CRUD", {
        setup: function() {
            dataSource = new GanttDataSource({
                data: [
                {
                    id: 1,
                    title: "Parent",
                    parentId: null,
                    orderId: 0,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/06"),
                    percentComplete: 40,
                    summary: true
                },
                    {
                        id: 2,
                        title: "Child1",
                        parentId: 1,
                        orderId: 0,
                        start: new Date("2014/03/31"),
                        end: new Date("2014/04/04"),
                        percentComplete: 60,
                        summary: true
                    },
                    {
                        id: 3,
                        title: "Child2",
                        parentId: 1,
                        orderId: 1,
                        start: new Date("2014/04/02"),
                        end: new Date("2014/04/04"),
                        percentComplete: 40,
                        summary: true
                    },
                    {
                        id: 4,
                        title: "Child3",
                        parentId: 1,
                        orderId: 2,
                        start: new Date("2014/04/05"),
                        end: new Date("2014/04/06"),
                        percentComplete: 20,
                        summary: false
                    },
                {
                    id: 5,
                    title: "Parent2",
                    parentId: null,
                    orderId: 1,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/06"),
                    percentComplete: 40,
                    summary: false
                },
                {
                    id: 6,
                    title: "Parent3",
                    parentId: null,
                    orderId: 2,
                    start: new Date("2014/03/31"),
                    end: new Date("2014/04/06"),
                    percentComplete: 40,
                    summary: true
                },
                    {
                        id: 7,
                        title: "Child1",
                        parentId: 6,
                        orderId: 0,
                        start: new Date("2014/03/31"),
                        end: new Date("2014/04/06"),
                        percentComplete: 40,
                        summary: false
                    }],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
        }
    });

    test("remove() reorders old siblings", 2, function() {
        var task = dataSource.get(3);

        dataSource.remove(task);

        equal(dataSource.get(2).get("orderId"), 0);
        equal(dataSource.get(4).get("orderId"), 1);
    });

    test("remove() only child updates parent summary field", function() {
        var task = dataSource.get(7);

        dataSource.remove(task);

        ok(!dataSource.get(6).get("summary"));
    });

    test("remove() only child doesn't update parent start", function(e) {
        var task = dataSource.get(7);

        dataSource.remove(task);

        equal(kendo.toString(dataSource.get(6).start, "yyyy/MM/dd"), "2014/03/31");
    });

    test("remove() only child doesn't update parent end", function(e) {
        var task = dataSource.get(7);

        dataSource.remove(task);

        equal(kendo.toString(dataSource.get(6).end, "yyyy/MM/dd"), "2014/04/06");
    });

    test("remove() only child doesn't update parent percentComplete", function(e) {
        var task = dataSource.get(7);

        dataSource.remove(task);

        equal(dataSource.get(6).get("percentComplete"), 40);
    });

    test("remove() sibling doesn't update parent summary field", function() {
        var task = dataSource.get(3);

        dataSource.remove(task);

        ok(dataSource.get(1).get("summary"));
    });

    test("remove() sibling updates parent start", function(e) {
        var task = dataSource.get(2);

        dataSource.remove(task);

        equal(kendo.toString(dataSource.get(1).start, "yyyy/MM/dd"), "2014/04/02");
    });

    test("remove() sibling updates parent end", function(e) {
        var task = dataSource.get(4);

        dataSource.remove(task);

        equal(kendo.toString(dataSource.get(1).end, "yyyy/MM/dd"), "2014/04/04");
    });

    test("remove() sibling updates parent percentComplete", function(e) {
        var task = dataSource.get(2);

        dataSource.remove(task);

        equal(dataSource.get(1).get("percentComplete"), 30);
    });


    test("add(task) appends task to root collection when parentId is null", function() {
        var task = new GanttTask();

        dataSource.add(task);

        equal(task.get("orderId"), 3);
    });

    test("add(task) appends task to child collection when parentId is set", function() {
        var task = new GanttTask();
        task.set("parentId", 6);

        dataSource.add(task);

        equal(task.get("orderId"), 1);
    });

    test("add(task) updates parent summary field", function() {
        var task = new GanttTask();
        task.set("parentId", 7);

        dataSource.add(task);

        ok(dataSource.get(7).get("summary"));
    });

    test("insert(index, task) sets task orderId when parentId is null", function() {
        var task = new GanttTask();

        dataSource.insert(1, task);

        equal(task.get("orderId"), 1);
    });

    test("insert(index, task) sets task orderId when parentId is set", function() {
        var task = new GanttTask();
        task.set("parentId", 1);

        dataSource.insert(1, task);

        equal(task.get("orderId"), 1);
    });

    test("insert(index, task) updates siblings orderId when parentId is null", function() {
        var task = new GanttTask();

        dataSource.insert(1, task);

        equal(dataSource.get(5).get("orderId"), 2);
        equal(dataSource.get(6).get("orderId"), 3);
    });

    test("insert(index, task) updates siblings orderId when parentId is set", function() {
        var task = new GanttTask();
        task.set("parentId", 1);

        dataSource.insert(1, task);

        equal(dataSource.get(3).get("orderId"), 2);
        equal(dataSource.get(4).get("orderId"), 3);
    });

    test("insert(index, task) updates new parent start when parentId points to single task", function(e) {
        var task = new GanttTask();
        task.set("parentId", 5);
        task.set("start", new Date("2014/03/28"));
        task.set("end", new Date("2014/03/29"));

        dataSource.insert(0, task);

        equal(kendo.toString(dataSource.get(5).start, "yyyy/MM/dd"), "2014/03/28");
    });

    test("insert(index, task) updates new parent end when parentId points to single task", function(e) {
        var task = new GanttTask();
        task.set("parentId", 5);
        task.set("start", new Date("2014/03/28"));
        task.set("end", new Date("2014/03/29"));

        dataSource.insert(0, task);

        equal(kendo.toString(dataSource.get(5).end, "yyyy/MM/dd"), "2014/03/29");
    });

    test("insert(index, task) updates new parent percentComplete when parentId points to single task", function(e) {
        var task = new GanttTask();
        task.set("parentId", 5);
        task.set("percentComplete", 70);

        dataSource.insert(0, task);

        equal(dataSource.get(5).get("percentComplete"), 70);
    });

    test("insert(index, task) updates new parent start when parentId points to summary", function(e) {
        var task = new GanttTask();
        task.set("parentId", 6);
        task.set("start", new Date("2014/03/28"));
        task.set("end", new Date("2014/03/29"));

        dataSource.insert(1, task);

        equal(kendo.toString(dataSource.get(6).start, "yyyy/MM/dd"), "2014/03/28");
    });

    test("insert(index, task) updates new parent end when parentId points to summary", function(e) {
        var task = new GanttTask();
        task.set("parentId", 6);
        task.set("start", new Date("2014/03/28"));
        task.set("end", new Date("2014/04/29"));

        dataSource.insert(1, task);

        equal(kendo.toString(dataSource.get(6).end, "yyyy/MM/dd"), "2014/04/29");
    });

    test("insert(index, task) updates new parent percentComplete when parentId points to summary", function(e) {
        var task = new GanttTask();
        task.set("parentId", 6);
        task.set("percentComplete", 80);

        dataSource.insert(1, task);

        equal(dataSource.get(6).get("percentComplete"), 60);
    });


    module("GanttDependency", { });

    test("GanttDependency inherits kendo.data.Model", function() {
        var task = new GanttDependency();

        ok(task instanceof kendo.data.Model);
    });

    test("GanttDependency creates kendo.data.GanttDependency instance", function() {
        var task = new GanttDependency();

        ok(task instanceof kendo.data.GanttDependency);
    });


    module("GanttDependencyDataSource", {
        setup: function() {
            dataSource = new GanttDependencyDataSource({
                data: [
                { id: 1, predecessorId: 1, successorId: 2, type: 1 },
                { id: 2, predecessorId: 1, successorId: 3, type: 1 },
                { id: 3, predecessorId: 1, successorId: 4, type: 1 },
                { id: 4, predecessorId: 2, successorId: 5, type: 1 },
                { id: 5, predecessorId: 3, successorId: 5, type: 1 },
                { id: 6, predecessorId: 4, successorId: 5, type: 1 },
                { id: 7, predecessorId: 5, successorId: 6, type: 1 }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
        }
    });

    test("successors(id) returns correct items", 4, function() {
        var successors = dataSource.successors(1);

        equal(successors.length, 3);
        equal(successors[0].id, 1);
        equal(successors[1].id, 2);
        equal(successors[2].id, 3);
    });

    test("predecessors(id) returns correct items", 4, function() {
        var predecessors = dataSource.predecessors(5);

        equal(predecessors.length, 3);
        equal(predecessors[0].id, 4);
        equal(predecessors[1].id, 5);
        equal(predecessors[2].id, 6);
    });

    test("dependencies(id) returns correct items", 5, function() {
        var predecessors = dataSource.dependencies(5);

        equal(predecessors.length, 4);
        equal(predecessors[0].id, 4);
        equal(predecessors[1].id, 5);
        equal(predecessors[2].id, 6);
        equal(predecessors[3].id, 7);
    });


}());
