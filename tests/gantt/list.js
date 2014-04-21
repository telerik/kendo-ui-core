(function() {

    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
    var dataSource;
    var ganttList;
    var taskTree;
    var element;
    var columns;
    var paddingStep = 26;

    module("Gantt List", {
        setup: function() {
            element = $("div");
            dataSource = new GanttDataSource();
        },
        teardown: function() {
            ganttList.destroy();
        }
    });

    test("add default title column", 2, function() {
        ganttList = new GanttList(element, { columns: [], dataSource: dataSource });

        equal(ganttList.options.columns.length, 1);
        equal(ganttList.options.columns[0], "title");
    });

    test("creates column from options", 5, function() {
        ganttList = new GanttList(element, {
            columns: [{
                field: "end",
                editable: true,
                title: "My End Time",
                sortable: true
            }],
            dataSource: dataSource
        });

        equal(ganttList.columns.length, 1);
        equal(ganttList.columns[0].field, "end");
        equal(ganttList.columns[0].title, "My End Time");
        ok(ganttList.columns[0].sortable);
        ok(ganttList.columns[0].editable);
    });

    test("creates column with default values from string", 4, function() {
        ganttList = new GanttList(element, {
            columns: ["end"],
            dataSource: dataSource
        });

        equal(ganttList.columns[0].field, "end");
        equal(ganttList.columns[0].title, "End Time");
        ok(!ganttList.columns[0].sortable);
        ok(!ganttList.columns[0].editable);
    });

    test("renders header's wrapping div", function() {
        ganttList = new GanttList(element, { columns: [], dataSource: dataSource });
        var wrapper = ganttList.element;

        equal(wrapper.children(".k-grid-header").length, 1);

    });

    test("renders header's inner wrapping div", function() {
        ganttList = new GanttList(element, { columns: [], dataSource: dataSource });
        var wrapper = ganttList.element;

        equal(wrapper.find(".k-grid-header-wrap").length, 1);

    });

    test("renders content's wrapping div", function() {
        ganttList = new GanttList(element, { columns: [], dataSource: dataSource });
        var wrapper = ganttList.element;

        equal(wrapper.children(".k-grid-content").length, 1);

    });

    module("Gantt List header renders", {
        setup: function() {
            element = $("div");

            columns = [
                { field: "title", title: "Title", sortable: false },
                { field: "start", title: "Start Time", sortable: true, width: 150 },
                { field: "end", title: "End Time", sortable: true, width: 150 },
                { field: "percentComplete", title: "Task Percentage" }
            ];

            dataSource = new GanttDataSource();

            ganttList = new GanttList(element, { columns: columns, dataSource: dataSource });
        },
        teardown: function() {
            ganttList.destroy();
        }
    });

    test("table element", function() {
        var header = ganttList.header;

        equal(header.children("table").length, 1);
        equal(header.children("table").attr("role"), "grid");
    });

    test("table colgroup", function() {
        var header = ganttList.header;

        equal(header.find("colgroup").length, 1);
    });

    test("table head", function() {
        var header = ganttList.header;

        equal(header.find("thead").length, 1);
        equal(header.find("thead").attr("role"), "rowgroup");
    });

    test("table col elements for each column", function() {
        var header = ganttList.header;

        equal(header.find("col").length, ganttList.columns.length);
    });

    test("table col elements with style attr when column width set", 4, function() {
        var header = ganttList.header;
        var cols = header.find("col");

        ok(!cols.eq(0).attr("style"));
        ok(cols.eq(1).attr("style"));
        ok(cols.eq(2).attr("style"));
        ok(!cols.eq(3).attr("style"));
    });

    test("table th elements for each column", function() {
        var header = ganttList.header;

        equal(header.find("th").length, ganttList.columns.length);
    });

    test("table th elements data attr for each column", function() {
        var header = ganttList.header;
        var test = function(idx, th) {
            th = $(th);
            equal(th.attr("data-field"), ganttList.columns[idx].field);
            equal(th.attr("data-title"), ganttList.columns[idx].title);
        };

        header.find("th").each(test);
    });

    test("table th elements sorter attr for sortable column", 4, function() {
        var header = ganttList.header;
        var ths = header.find("th");
        var column;

        for (var idx = 0; idx < ganttList.columns.length; idx++) {
            column = ganttList.columns[idx];
            if (column.sortable) {
                equal(ths.eq(idx).attr("data-role"), "sorter");
            } else {
                ok(!ths.eq(idx).attr("data-role"));
            }
        }
    });

    module("Gantt List content renders", {
        setup: function() {
            element = $("div");

            columns = [
                { field: "title", title: "Title", sortable: false },
                { field: "start", title: "Start Time", sortable: true, width: 150 },
                { field: "end", title: "End Time", sortable: true, width: 150 },
                { field: "percentComplete", title: "Task Percentage" }
            ];

            dataSource = new GanttDataSource({
                data: [
                { title: "Task1", parentId: null, id: 1, summary: true , expanded: true },
                    { title: "Child 1.1", parentId: 1, id: 2, summary: true, expanded: true },
                        { title: "Child 1.1.1", parentId: 2, id: 3, summary: false },
                        { title: "Child 1.1.2", parentId: 2, id: 4, summary: true, expanded: true },
                            { title: "Child 1.1.2.1", parentId: 4, id: 11 },
                    { title: "Child 1.2", parentId: 1, id: 5, summary: false },
                    { title: "Child 1.3", parentId: 1, id: 6, summary: false },
                { title: "Task2", parentId: null, id: 7, summary: true, expanded: true },
                    { title: "Child 2.1", parentId: 7, id: 8, summary: false },
                    { title: "Child 2.2", parentId: 7, id: 9, summary: false },
                    { title: "Child 2.3", parentId: 7, id: 10, summary: false }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            });

            dataSource.fetch();
            taskTree = dataSource.taskTree();

            ganttList = new GanttList(element, { columns: columns, dataSource: dataSource });
            ganttList._render(taskTree);
        },
        teardown: function() {
            ganttList.destroy();
        }
    });

    test("table element", function() {
        var content = ganttList.content;

        equal(content.children("table").length, 1);
        equal(content.children("table").attr("role"), "grid");
    });

    test("table colgroup", function() {
        var content = ganttList.content;

        equal(content.find("colgroup").length, 1);
    });

    test("table col elements for each column", function() {
        var content = ganttList.content;

        equal(content.find("col").length, ganttList.columns.length);
    });

    test("table body", 2, function() {
        var content = ganttList.content;

        equal(content.find("tbody").length, 1);
        equal(content.find("tbody").attr("role"), "rowgroup");
    });

    test("table tr elements for each task", function() {
        var content = ganttList.content;

        equal(content.find("tr").length, dataSource.total());
    });

    test("table tr elements attr", function() {
        var content = ganttList.content;
        var test = function(idx, tr) {
            tr = $(tr);
            equal(tr.attr("role"), "row");
            equal(tr.attr("data-uid"), taskTree[idx].get("uid"));
        };

        content.find("tr").each(test);
    });

    test("table even tr elements style", function() {
        var content = ganttList.content;
        var test = function(idx, tr) {
            tr = $(tr);
            if (idx % 2 !== 0) {
                ok(tr.hasClass("k-alt"));
            }
        };

        content.find("tr").each(test);
    });

    test("table td elements for each column", function() {
        var content = ganttList.content;

        equal(content.find("tr").eq(0).children("td").length, columns.length);
    });

    test("table td element with icon-span for title column", function() {
        var content = ganttList.content;
        var span = content.find("tr").eq(0).children("td").eq(0).children("span");

        equal(span.length, 2);
        ok(span.eq(0).hasClass("k-icon"));
    });

    test("table td element with padding for title column", function() {
        var content = ganttList.content;
        var test = function(idx, tr) {
            tr = $(tr);
            var td = tr.children("td").eq(0);
            var padding = parseInt(td.css("padding-left"));
            var level = dataSource.taskLevel(taskTree[idx]);
            
            if (level > 0) {
                equal(padding, level * paddingStep);
            } else {
                ok(!td.attr("style"));
            }
        };

        content.find("tr").each(test);
    });

    test("table td element with span with collapse icon summary tasks", function() {
        var content = ganttList.content;
        var span = content.find("tr").eq(0).children("td").eq(0).children("span");

        ok(span.hasClass("k-i-collapse"));
    });

    test("table td element with span with hidden icon non-summary tasks", function() {
        var content = ganttList.content;
        var span = content.find("tr").eq(2).children("td").eq(0).children("span");

        ok(span.hasClass("k-i-none"));
    });
})();