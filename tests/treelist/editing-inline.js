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
})();
