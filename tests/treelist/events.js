(function() {
    var handler;

    module("TreeList events", {
        setup: function() {
           dom = $("<div />").appendTo(QUnit.fixture);
           handler = spy();
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
        createTreeList({
            selectable: true,
            change: handler
        });

        tap(instance.content.find("tr:first"));

        equal(handler.calls, 1);
    });

    test("filterMenuInit is fired upon filter menu initialization", function() {
        createTreeList({
            filterable: true,
            filterMenuInit: handler
        });

        instance.header.find(".k-grid-filter:first").click();

        equal(handler.calls, 1);
    });

    test("expand is fired upon row expanding", function() {
        createTreeList({
            expand: handler
        });

        instance.content.find(".k-i-expand").mousedown();

        equal(handler.calls, 1);
    });

    test("expand event can be prevented", function() {
        createTreeList({
            expand: function(e) {
                e.preventDefault();
            }
        });

        instance.content.find(".k-i-expand").mousedown();

        equal(instance.content.find("tr:visible").length, 1);
    });

    test("collapse is fired upon row collapse", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ],
            collapse: handler
        });

        instance.content.find(".k-i-collapse").mousedown();

        equal(handler.calls, 1);
    });

    test("collapse event can be prevented", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ],
            collapse: function(e) {
                e.preventDefault();
            }
        });

        instance.content.find(".k-i-collapse").mousedown();

        equal(instance.content.find("tr:visible").length, 2);
    });
})();
