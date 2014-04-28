(function() {

    var element;
    var gantt;
    var ganttList;
    var Gantt = kendo.ui.Gantt;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
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
            range = {
                start: new Date("2014/04/15"),
                end: new Date("2014/04/17")
            };
            tasks = [{
                uid: "UniqueId1",
                start: new Date("2014/04/15"),
                end: new Date("2014/04/16")
            }, {
                uid: "UniqueId2",
                start: new Date("2014/04/16"),
                end: new Date("2014/04/17")
            }];
        },
        teardown: function() {
            gantt.destroy();

            kendo.destroy(element);
        }
    });

    test("clicking on a task calls select(':selector')", function() {
        gantt.timeline._render(tasks, range);

        var target = gantt.timeline.wrapper.find(".k-event:first");

        stub(gantt, "select");

        target.click();

        ok(gantt.calls("select"));
    });

    test("clicking on a task calls select(':selector') with correct parameter", 1, function() {
        gantt.timeline._render(tasks, range);

        var target = gantt.timeline.wrapper.find(".k-event:first");

        stub(gantt, {
            select: function(value) {
                equal(value, "[data-uid='UniqueId1']");
            }
        });

        target.click();
    });

    test("clicking on a task row calls clearSelection()", function() {
        gantt.timeline._render(tasks, range);

        var target = gantt.timeline.wrapper.find(".k-gantt-tasks tr:first");

        stub(gantt, "clearSelection");

        target.click();

        ok(gantt.calls("clearSelection"));
    });

})();