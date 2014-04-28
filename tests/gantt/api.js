(function() {
    var element;
    var gantt;
    var ganttList;
    var Gantt = kendo.ui.Gantt;
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
    var setupGanttList = function(options) {
        var dataSource = setupDataSource(options.data);
        ganttList = new GanttList(element, {
            columns: options.columns,
            dataSource: dataSource
        });

        dataSource.fetch();
        ganttList._render(dataSource.taskTree());
    };
    var setupGantt = function(options) {
        var dataSource = setupDataSource(options.data);

        gantt = new Gantt(element, {
            columns: options.columns,
            dataSource: dataSource
        });

        ganttList = gantt.list;
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

    module("Gantt", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
            gantt = null;
        }
    });

    test("select(':selector') calls list's select method with argument", function() {
        setupGantt({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        stub(ganttList, {
            select: function(value) {
                ok(value);
            }
        });

        gantt.select("tr:first");
    });

    test("select() calls list's select method with no argument", function() {
        setupGantt({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        stub(ganttList, {
            select: function(value) {
                ok(!value);
            }
        });

        gantt.select();
    });

    test("clearSelection() calls list's clearSelection()", function() {
        setupGantt({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        stub(ganttList, "clearSelection");

        gantt.clearSelection();

        ok(ganttList.calls("clearSelection"));
    });

    module("GanttList", {
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

    test("select(':selector') applies selected class to element", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        ganttList.select("tr:first");

        ok(ganttList.content.find("tr:first").hasClass("k-state-selected"));
    });

    test("select(':selector') triggers change event", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        ganttList.bind("change", function() {
            ok(true);
        });
        ganttList.select("tr:first");
    });

    test("select(':selector') removes selected class from previously selected element", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });
        var target = ganttList.content.find("tr:last")
            .addClass("k-state-selected");

        ganttList.select("tr:first");

        ok(!target.hasClass("k-state-selected"));
    });

    test("select() retrieves selected element", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        var target = ganttList.content.find("tr:first").addClass("k-state-selected");
        var selected = ganttList.select();

        equal(selected.length, 1);
        equal(selected[0], target[0]);
    });

    test("select() does not trigger change event", function() {
        var flag = false;
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        ganttList.bind("change", function() {
            flag = true;
        });
        ganttList.select();

        ok(!flag);
    });

    test("clearSelection() removes selected class from element", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        ganttList.select("tr:first");
        ganttList.clearSelection();

        ok(!ganttList.content.find("tr:first").hasClass("k-state-selected"));
    });

    test("clearSelection() triggers change event", function() {
        setupGanttList({
            columns: [],
            data: [
                { title: "foo", parentId: null, id: 1, summary: false },
                { title: "bar", parentId: null, id: 2, summary: false }
            ]
        });

        ganttList.bind("change", function() {
            ok(true);
        });
        ganttList.clearSelection();
    });

})();