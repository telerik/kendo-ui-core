(function() {

    var element;
    var ganttList;
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

    test("clicking on icon toggles expanded/collapsed mddel field", 2, function() {
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

})();