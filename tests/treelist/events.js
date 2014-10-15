(function() {
    module("TreeList events", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
            dom.remove();

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

    test("dataBound is fired upon refresh", function() {
        var handler = spy();

        createTreeList({
            dataBound: handler
        });

        equal(handler.calls, 1);
    });

    test("dataBinding is triggered before dataBound", function() {
        var beforeDataBound = true;
        createTreeList({
            dataBinding: function() {
                ok(beforeDataBound);
            },
            dataBound: function() {
                beforeDataBound = false;
            }
        });
    });

    test("change is fired upon select", function() {
        var handler = spy();

        createTreeList({
            selectable: true,
            change: handler
        });

        tap(instance.content.find("tr:first"));

        equal(handler.calls, 1);
    });
})();
