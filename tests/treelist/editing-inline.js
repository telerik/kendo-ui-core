(function() {
    var dom;
    var instance;

    module("TreeList inline editing", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend(true, {}, {
            dataSource: {
                data: [
                    { id: 1, parentId: null },
                    { id: 3, parentId: null },
                    { id: 2, parentId: 1 }
                ]
            },
            columns: [ "id", "parentId" ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("editRow initializes Editable", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        ok(instance.editable instanceof kendo.ui.Editable);
        ok(instance.content.find("tr").first().data("kendoEditable"));
    });

    test("editRow initializes Editable from jQuery selector", function() {
        createTreeList();

        instance.editRow("tr:first");

        ok(instance.editable instanceof kendo.ui.Editable);
        ok(instance.content.find("tr").first().data("kendoEditable"));
    });

    test("editRow adds k-grid-edit-row to the row", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        ok(instance.content.find("tr").first().hasClass("k-grid-edit-row"));
    });

    test("editRow sets model to Editable", function() {
        createTreeList();

        var row = instance.content.find("tr").first();
        var dataItem = instance.dataItem(row);

        instance.editRow(row);

        strictEqual(instance.editable.options.model, dataItem);
    });

    test("editRow destroys previous Editable", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());
        instance.editRow(instance.content.find("tr").last());

        ok(!instance.content.find("tr").first().data("kendoEditable"), "first Editable is not destroyed");
        ok(instance.content.find("tr").last().data("kendoEditable"), "second Editable is not created");
    });

    test("editing row passes fields to Editable", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        var fields = instance.editable.options.fields;

        equal(fields.length, 2);
        equal(fields[0].field, "id");
        equal(fields[1].field, "parentId");
    });

    test("editing row passes column format to Editable", function() {
        createTreeList({
            columns: [
                { field: "id", format: "{0}" },
                "parentId"
            ]
        });

        instance.editRow(instance.content.find("tr").first());

        var fields = instance.editable.options.fields;

        equal(fields[0].format, "{0}");
    });

    test("editing row passes column editor to Editable", function() {
        createTreeList({
            columns: [
                { field: "id", editor: $.noop },
                "parentId"
            ]
        });

        instance.editRow(instance.content.find("tr").first());

        var fields = instance.editable.options.fields;

        ok(fields[0].editor);
    });

    test("do not pass column without field", function() {
        createTreeList({
            columns: [
                { template: "foo" },
                "parentId"
            ]
        });

        instance.editRow(instance.content.find("tr").first());

        var fields = instance.editable.options.fields;

        equal(fields.length, 1);
        equal(fields[0].field, "parentId");
    });

    test("read-only fields are not passed to Editable", function() {
        createTreeList({
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            id: { editable: false },
                            parentId: { defaultValue: null }
                        }
                    }
                }
            }
        });

        instance.editRow(instance.content.find("tr").first());

        var fields = instance.editable.options.fields;

        equal(fields.length, 1);
        equal(fields[0].field, "parentId");
    });

    test("clearContainer is set to false", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        strictEqual(instance.editable.options.clearContainer, false);
    });

    test("editable cells are prepared for editors", function() {
        createTreeList();

        var row = instance.content.find("tr").first();
        instance.editRow(row);

        var cells = instance.content.find("tr").first().children();
        equal(cells.eq(0).attr(kendo.attr("container-for")), "id");
        equal(cells.eq(1).attr(kendo.attr("container-for")), "parentId");
    });

    test("editRow trigger edit event", 1, function() {
        createTreeList({
            edit: function() {
                ok(true);
            }
        });

        instance.editRow(instance.content.find("tr").first());
    });

    test("edit event argumetns", 2, function() {
        createTreeList({
            edit: function(e) {
                var row = this.content.find("tr");
                equal(e.container[0], row[0]);
                equal(e.model.id, 1);
            }
        });

        instance.editRow(instance.content.find("tr").first());
    });

    test("cancelRow destroy current editable", function() {
        createTreeList();

        instance.editRow("tr:first");
        instance.cancelRow();

        ok(!instance.editable);
        ok(!instance.content.find("tr:first").data("kendoEditable"));
    });

    test("cancelRow cancel changes for current model", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1, parentId: null, text: "foo" },
                    { id: 2, parentId: null, text: "bar" }
                ]
            }
        });

        var row = instance.content.find("tr").first();
        var model = instance.dataItem(row);

        instance.editRow(row);

        model.set("text", "baz");

        instance.cancelRow();

        equal(model.text, "foo");
        ok(!model.dirty);
    });

    test("cancelRow repaints the row", function() {
        createTreeList();

        var row = instance.content.find("tr").first();
        instance.editRow(row);
        instance.cancelRow();

        row = instance.content.find("tr").first();

        equal(row.find("input").length, 0);
        equal(row.children().eq(0).text(), "1");
    });

    test("edit another row repaints the previous row", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());
        instance.editRow(instance.content.find("tr").last());

        var row = instance.content.find("tr").first();
        equal(row.find("input").length, 0);
        equal(row.children().eq(0).text(), "1");
    });

    test("widget destroy destroyes current editor", function() {
        createTreeList();

        instance.editRow("tr:first");
        instance.destroy();

        ok(!instance.editable);
        ok(!dom.find("tbody>tr:first").data("kendoEditable"));
    });

    test("widget refresh destroys editable", function() {
        createTreeList();

        instance.editRow("tr:first");
        instance.refresh();

        ok(!instance.editable);
        ok(!dom.find("tbody>tr:first").data("kendoEditable"));
        equal(dom.find(".k-grid-edit-row").length, 0);
    });

    test("refresh doesn't destroy ediatble on itemchange", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1, text: "foo", parentId: null },
                    { id: 3, text: "bar", parentId: null },
                ]
            }
        });

        instance.editRow("tr:first");

        var editable = instance.editable;

        instance.dataSource.at(0).set("text", "baz");

        strictEqual(editable, instance.editable);
    });
})();
