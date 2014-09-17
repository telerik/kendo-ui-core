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

    test("click on expand arrow loads items from remote", function() {
        var calls = 0;
        var ds = new kendo.data.TreeListDataSource({
            transport: {
                read: function(options) {
                    options.success([ { id: ++calls, hasChildren: true } ]);
                }
            }
        });

        ds.read();

        createTreeList({ dataSource: ds });

        instance.content.find(".k-i-expand").click();

        equal(instance.content.find("tr").length, 2);
    });

    function loadingIcons() {
        return instance.content.find(".k-loading");
    }

    test("shows loading icon during loading of remote data", function() {
        var calls = 0;
        var readOperation;

        createTreeList({
            dataSource: {
                transport: {
                    read: function(options) {
                        // use promise to control when the transport reads
                        readOperation = $.Deferred();
                        readOperation.then(function() {
                            options.success([ { id: ++calls, hasChildren: true } ]);
                        });
                    }
                }
            },
            autoBind: false
        });

        // initial load
        instance.dataSource.read();
        readOperation.resolve();

        // expand item
        instance.content.find(".k-i-expand").click();
        equal(loadingIcons().length, 1, "loading icon not shown upon expanding");

        readOperation.resolve();
        equal(loadingIcons().length, 0, "icon is not hidden after operation finishes");
    });

    test("removes collapsed icon if no data is returned", function() {
        var called;

        createTreeList({
            dataSource: {
                transport: {
                    read: function(options) {
                        if (!called) {
                            called = true;
                            options.success([ { id: 1, hasChildren: true } ]);
                        } else {
                            options.success([]);
                        }
                    }
                }
            }
        });

        instance.content.find(".k-i-expand").click();

        equal(instance.content.find(".k-icon.k-i-collapse").length, 0);
    });
})();
