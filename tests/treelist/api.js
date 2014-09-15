(function() {
    module("TreeList API", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);

            dom = instance = null;
        }
    });

    function createTreeList(options) {
        dom.kendoTreeList($.extend({
            dataSource: [
                { id: 1, parentId: null },
                { id: 2, parentId: 1 }
            ],
            columns: [ "id", "parentId" ]
        }, options));

        instance = dom.data("kendoTreeList");
    }

    test("dataItem returns item by table row", function() {
        createTreeList();

        var dataItem = instance.dataItem(instance.content.find("tr:first"));

        equal(dataItem, instance.dataSource.get(1));
    });

    test("dataItem returns item by nested element", function() {
        createTreeList();

        var dataItem = instance.dataItem(instance.content.find(".k-icon:first"));

        equal(dataItem, instance.dataSource.get(1));
    });

    test("dataItem returns item for nested tr", function() {
        createTreeList({
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 }
            ]
        });

        var dataItem = instance.dataItem(instance.content.find("tr:last"));

        equal(dataItem, instance.dataSource.get(2));
    });
})()
