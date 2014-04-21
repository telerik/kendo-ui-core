(function() {
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
    var ganttList;
    var element;
    var columns;

    module("Gantt inline editing", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);

            columns = [
                { field: "title", editable: true, editor: function() { } },
                { field: "summary" }
            ];

            dataSource = new GanttDataSource({
                data: [{ title: "foo", parentId: null, id: 1, summary: true }],
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
            kendo.destroy(QUnit.fixture);
            element.remove();
        }
    });

    test("attaches editable widget to editable cell on dblclick", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(targetCell.data("kendoEditable"));
    });

    test("attaches 'change' handler to edited model", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        equal(dataSource.at(0)._events["change"].length, 2);
    });

    test("passes column settings to editable widget", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var editable;

        targetCell.dblclick();
        editable = targetCell.data("kendoEditable");

        equal(editable.options.fields.field, ganttList.columns[0].field);
        equal(editable.options.fields.format, ganttList.columns[0].format);
        ok(editable.options.fields.editor);
    });

    test("passes the editable's clearContainer setting", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var editable;

        targetCell.dblclick();
        editable = targetCell.data("kendoEditable");

        ok(!editable.options.clearContainer);
    });

    test("sets list's editable field", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(ganttList.editable instanceof kendo.ui.Editable);
    });

    test("detaches cell content before initializing the editable", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(ganttList._editableContent.eq(0).is("span"));
        ok(ganttList._editableContent.eq(1).is("span"));
        equal(ganttList._editableContent.eq(1).html(), "foo");
    });

    test("re-attaches cell content before initializing the editable", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();
        ganttList._closeCell();

        ok(targetCell.children().eq(0).is("span"));
        ok(targetCell.children().eq(1).is("span"));
        equal(targetCell.children().eq(1).html(), "foo");
    });

    asyncTest("call validate when cell leaves edit mode", function() {
        expect(1);
        var targetCell = ganttList.content.find("td").eq(0);
        var validate;

        targetCell.dblclick();
        validate = stub(targetCell.data("kendoValidator"), "validate");
        targetCell.focusout();

        setTimeout(function() {
            ok(validate.calls("validate"));
            start();
        }, 2);
    });

    asyncTest("does not leaves edit mode if validation fails", function() {
        expect(1);
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();
        stub(targetCell.data("kendoValidator"), { validate: function() { return false } });
        targetCell.focusout();

        setTimeout(function() {
            ok(targetCell.data("kendoEditable"));
            start();
        }, 2);
    });

    test("trigger 'update' if the mode; is updated", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ganttList.bind("update", function() {
            ok(true);
        });

        ganttList.updated = true;
        ganttList._closeCell();
    });

    test("does not trigger 'update' if the model is npt updated", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var flag;

        targetCell.dblclick();

        ganttList.bind("update", function() {
            flag = true;
        });

        ganttList._closeCell();

        ok(!flag);
    });

    test("does not attach editable widget to non-editable cell on dblclick", function() {
        var targetCell = ganttList.content.find("td").eq(1);

        targetCell.dblclick();

        ok(!targetCell.data("kendoEditable"));
    });

    test("destroys editable widget after cell exit edit mode", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(targetCell.data("kendoEditable"));

        ganttList._closeCell();

        ok(!targetCell.data("kendoEditable"));
        ok(!ganttList.editable);
    });

    test("detaches change handler from edited model after cell exit edit mode", 1, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();
        ganttList._closeCell();

        equal(dataSource.at(0)._events["change"].length, 1);
    });
})();