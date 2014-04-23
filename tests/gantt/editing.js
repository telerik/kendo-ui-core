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

    test("attaches model copy to the editable cell data", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(targetCell.data("modelCopy"));
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

    asyncTest("calls validate when cell leaves edit mode", function() {
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

    test("does not attach editable widget to non-editable cell on dblclick", function() {
        var targetCell = ganttList.content.find("td").eq(1);

        targetCell.dblclick();

        ok(!targetCell.data("kendoEditable"));
    });

    test("triggers 'update' when edited cell closes", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ganttList.bind("update", function() {
            ok(true);
        });

        ganttList._closeCell();
    });

    test("does not trigger 'update' when edited cell closes with cancelUpdate parameter", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var updateTriggered;

        targetCell.dblclick();

        ganttList.bind("update", function() {
            updateTriggered = true;
        });

        ganttList._closeCell(true);

        ok(!updateTriggered);
    });

    test("updates model when edited cell closes", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        stub(ganttList.dataSource, "update");

        ganttList._closeCell();

        ok(ganttList.dataSource.calls("update"));
    });

    test("does not update model when edited cell closes with cancelUpdate parameter", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        stub(ganttList.dataSource, "update");

        ganttList._closeCell(true);

        ok(!ganttList.dataSource.calls("update"));
    });

    test("destroys editable widget after cell exits edit mode", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();

        ok(targetCell.data("kendoEditable"));

        ganttList._closeCell();

        ok(!targetCell.data("kendoEditable"));
        ok(!ganttList.editable);
    });

    test("detaches model copy after cell exits edit mode", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        targetCell.dblclick();
        ganttList._closeCell();

        ok(!targetCell.data("modelCopy"));
    });

    test("ESC keydown closes edited cell", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ESC;

        stub(ganttList, "_closeCell");
        targetCell.dblclick();
        targetCell.trigger(event);

        ok(ganttList.calls("_closeCell"));
    });

    test("ESC keydown closes edited cell with cancelUpdate parameter", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ESC;

        stub(ganttList, { _closeCell: function(cancelUpdate) { ok(cancelUpdate) } });
        targetCell.dblclick();
        targetCell.trigger(event);
    });

    test("Enter keydown closes edited cell", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ENTER;

        stub(ganttList, "_closeCell");
        targetCell.dblclick();
        targetCell.trigger(event);

        ok(ganttList.calls("_closeCell"));
    });
})();