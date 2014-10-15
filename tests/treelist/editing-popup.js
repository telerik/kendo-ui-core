(function() {
    var dom;
    var instance;
    var TreeListDataSource = kendo.data.TreeListDataSource;

    module("TreeList popup editing", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);

            kendo.effects.disable();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;

            kendo.effects.enable();
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend(true, {}, {
            editable: "popup",
            dataSource: {
                data: [
                    { id: 1, parentId: null, expanded: true },
                    { id: 3, parentId: null, expanded: true },
                    { id: 2, parentId: 1 }
                ]
            },
            columns: [ "id", "parentId" ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("kendoWindow is created as editor", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        ok(instance.editor.wrapper.data("kendoWindow"));
        ok(instance.editor.wrapper.data("kendoEditable"));
    });

    test("window element have uid attribute set", function() {
        createTreeList();

        var row = instance.content.find("tr").first();
        var model = instance.dataItem(row);
        instance.editRow(row);

        equal(instance.editor.window.element.attr(kendo.attr("uid")), model.uid);
    });

    test("edit row opens the window", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        ok(instance.editor.wrapper.is(":visible"));
    });

    test("close of editor destroys the window", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        var destroySpy = spy(instance.editor.window, "destroy");

        instance.cancelRow();

        equal(destroySpy.calls("destroy"), 1);
    });

    test("destroy of editor closes the window", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        var closeSpy = spy(instance.editor.window, "close");

        instance.cancelRow();

        equal(closeSpy.calls("close"), 1);
    });

    test("creates editors placeholders for the fields", function() {
        var attr = kendo.attr("container-for");
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        equal(instance.editor.wrapper.find("[" + attr + "]").length, 2);
    });

    test("doesn't render placeholders for command columns", function() {
        createTreeList({
            columns: [
                "id",
                "parentId",
                { command: ["edit"] }
            ]
        });

        instance.editRow(instance.content.find("tr").first());

        equal(instance.editor.wrapper.find(".k-edit-label").length, 2);
    });

    test("show content for not editable fields", function() {
        var attr = kendo.attr("container-for");
        createTreeList({
            dataSource: {
                schema: {
                    model: {
                        fields: {
                            id: { editable: false }
                        }
                    }
                }
            }
        });

        instance.editRow(instance.content.find("tr").first());

        equal(instance.editor.wrapper.find("[" + attr + "]").length, 1);
        equal(instance.editor.wrapper.find(".k-edit-field").eq(0).text(), "1");
    });

    test("render save command button", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        equal(instance.editor.wrapper.find(".k-grid-update").length, 1);
    });

    test("render cancel command button", function() {
        createTreeList();

        instance.editRow(instance.content.find("tr").first());

        equal(instance.editor.wrapper.find(".k-grid-cancel").length, 1);
    });
})();
