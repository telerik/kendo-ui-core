(function() {
    module("TreeList interaction", {
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

    test("click on expand arrow shows child rows", function() {
        createTreeList();

        instance.content.find(".k-i-expand").click();

        equal(instance.content.find("tr").length, 2);
    });

    test("click on collapse arrow hides child rows", function() {
        createTreeList({
            dataSource: [
                { id: 1, expanded: true, parentId: null },
                { id: 2, parentId: 1 }
            ]
        });

        instance.content.find(".k-i-collapse").click();

        equal(instance.content.find("tr").length, 1);
    });

})();
