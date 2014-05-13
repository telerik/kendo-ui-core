(function() {
    var GanttList = kendo.ui.GanttList;
    var GanttDataSource = kendo.data.GanttDataSource;
    var ganttList;
    var element;
    var columns;
    var extend = $.extend;
    var doubleTap = function(target) {
        tap(target);
        tap(target);
    };

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

    test("attaches touch widget to the list content", function() {
        ok(ganttList.content.data("kendoTouch"));
    });

    test("attaches editable widget to editable cell on dblclick", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.data("kendoEditable"));
    });

    test("attaches model copy to the editable cell data", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.data("modelCopy"));
    });

    test("passes column settings to editable widget", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var editable;

        doubleTap(targetCell);
        editable = targetCell.data("kendoEditable");

        equal(editable.options.fields.field, ganttList.columns[0].field);
        equal(editable.options.fields.format, ganttList.columns[0].format);
        ok(editable.options.fields.editor);
    });

    test("passes the editable's clearContainer setting", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var editable;

        doubleTap(targetCell);
        editable = targetCell.data("kendoEditable");

        ok(!editable.options.clearContainer);
    });

    test("sets list's editable field", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(ganttList.editable instanceof kendo.ui.Editable);
    });

    test("detaches cell content before initializing the editable", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(ganttList._editableContent.eq(0).is("span"));
        ok(ganttList._editableContent.eq(1).is("span"));
        equal(ganttList._editableContent.eq(1).html(), "foo");
    });

    test("re-attaches cell content before initializing the editable", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);
        ganttList._closeCell();

        ok(targetCell.children().eq(0).is("span"));
        ok(targetCell.children().eq(1).is("span"));
        equal(targetCell.children().eq(1).html(), "foo");
    });

    asyncTest("calls validate when cell leaves edit mode", function() {
        expect(1);
        var targetCell = ganttList.content.find("td").eq(0);
        var validate;

        doubleTap(targetCell);
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

        doubleTap(targetCell);
        stub(targetCell.data("kendoValidator"), { validate: function() { return false } });
        targetCell.focusout();

        setTimeout(function() {
            ok(targetCell.data("kendoEditable"));
            start();
        }, 2);
    });

    test("does not attach editable widget to non-editable cell on dblclick", function() {
        var targetCell = ganttList.content.find("td").eq(1);

        doubleTap(targetCell);

        ok(!targetCell.data("kendoEditable"));
    });

    test("triggers 'update' when edited cell closes", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ganttList.bind("update", function() {
            ok(true);
        });

        ganttList._closeCell();
    });

    test("does not trigger 'update' when edited cell closes with cancelUpdate parameter", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var updateTriggered;

        doubleTap(targetCell);

        ganttList.bind("update", function() {
            updateTriggered = true;
        });

        ganttList._closeCell(true);

        ok(!updateTriggered);
    });

    test("destroys editable widget after cell exits edit mode", 3, function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.data("kendoEditable"));

        ganttList._closeCell();

        ok(!targetCell.data("kendoEditable"));
        ok(!ganttList.editable);
    });

    test("detaches model copy after cell exits edit mode", function() {
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);
        ganttList._closeCell();

        ok(!targetCell.data("modelCopy"));
    });

    test("ESC keydown closes edited cell", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ESC;

        stub(ganttList, "_closeCell");
        doubleTap(targetCell);
        targetCell.trigger(event);

        ok(ganttList.calls("_closeCell"));
    });

    test("ESC keydown closes edited cell with cancelUpdate parameter", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ESC;

        stub(ganttList, { _closeCell: function(cancelUpdate) { ok(cancelUpdate) } });
        doubleTap(targetCell);
        targetCell.trigger(event);
    });

    test("Enter keydown closes edited cell", function() {
        var targetCell = ganttList.content.find("td").eq(0);
        var event = new $.Event('keydown');

        event.keyCode = kendo.keys.ENTER;

        stub(ganttList, "_closeCell");
        doubleTap(targetCell);
        targetCell.trigger(event);

        ok(ganttList.calls("_closeCell"));
    });

    var setup = function(options) {
        columns = [
            extend({ editable: true }, options.column)
        ];

        dataSource = new GanttDataSource({
            data: options.data,
            schema: {
                model: extend({
                    id: "id",
                    }, options.fields)
            }
        });

        dataSource.fetch();
        taskTree = dataSource.taskTree();

        ganttList = new GanttList(element, { columns: columns, dataSource: dataSource });
        ganttList._render(taskTree);
    };

    module("Gantt custom date time editor", {
        setup: function() {
            element = $("<div/>");
        },
        teardown: function() {
            ganttList.destroy();
        }
    });

    test("edit date field with no type creates DateTimePicker", function() {
        setup({
            column: { field: "start" },
            data: [{ start: new Date()}]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("custom date time editor has binding attributes", function() {
        setup({
            column: { field: "start" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);
        var input;

        doubleTap(targetCell);

        input = targetCell.find("input");

        equal(input.attr("data-type"), "date");
        equal(input.attr("data-bind"), "value:start");
        equal(input.attr("name"), "start");
        equal(input.attr("required"), "required");
    });

    test("edit custom date field with no type creates DateTimePicker", function() {
        setup({
            column: { field: "customField" },
            data: [{ customField: new Date() }]
        });

        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("edit custom field with date type creates DateTimePicker", function() {
        setup({
            column: { field: "customField" },
            data: [{ CustomField: new Date() }],
            fields: {
                fields: {
                    customField: { from: "CustomField", type: "date" }
                }
            }
        });

        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("custom date field has required attribute", function() {
        setup({
            column: { field: "customField" },
            data: [{ CustomField: new Date() }],
            fields: {
                fields: {
                    customField: { from: "CustomField", type: "date", validation: { required: true } }
                }
            }
        });

        var targetCell = ganttList.content.find("td").eq(0);
        var input;

        doubleTap(targetCell);

        input = targetCell.find("input");

        equal(input.attr("required"), "required");
    });

    test("user defined editor is created for data fields", 1, function() {
        setup({
            column: {
                field: "start", editor: function() {
                    ok(true);
                }
            },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);
    });

    test("user defined editor is created for custom data fields", 1, function() {
        setup({
            column: { field: "customField", editor: function() { ok(true); } },
            data: [{ CustomField: new Date() }],
            fields: {
                fields: {
                    customField: { from: "CustomField", type: "date" }
                }
            }
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);
    });

    test("format yyyy/MM/dd HH:mm:ss creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "yyyy/MM/dd HH:mm:ss" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format yyyy/MM/dd creates DatePicker", function() {
        setup({
            column: { field: "start", format: "yyyy/MM/dd" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDatePicker"));
    });

    test("format yyyy/MM/dd HH:mm creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "yyyy/MM/dd HH:mm" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format ddd MMM dd yyyy HH:mm:ss creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "ddd MMM dd yyyy HH:mm:ss" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format ddd MMM dd yyyy creates DatePicker", function() {
        setup({
            column: { field: "start", format: "ddd MMM dd yyyy" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDatePicker"));
    });

    test("format yyyy-MM-ddTHH:mm creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "yyyy-MM-ddTHH:mm" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format g creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "g" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format u creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "u" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

    test("format F creates DateTimePicker", function() {
        setup({
            column: { field: "start", format: "F" },
            data: [{ start: new Date() }]
        });
        var targetCell = ganttList.content.find("td").eq(0);

        doubleTap(targetCell);

        ok(targetCell.find("input").data("kendoDateTimePicker"));
    });

})();