(function() {
    module("TreeList interaction", {
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

    function controlledRead() {
        var queue = [];

        var read = function(options) {
            var deferred = $.Deferred();

            deferred.then(options.success, options.error);

            queue.push(deferred);
        };

        read.resolve = function(value) {
            queue.shift().resolve(value);
        };

        read.reject = function(value) {
            queue.shift().reject(value);
        };

        return read;
    }

    test("shows loading icon during loading of remote data", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } },
            autoBind: false
        });

        // initial load
        instance.dataSource.read();
        read.resolve([ { id: 1, hasChildren: true } ]);

        // expand item
        instance.content.find(".k-i-expand").click();

        equal(loadingIcons().length, 1, "loading icon not shown upon expanding");

        read.resolve([ { id: 2, parentId: 1 } ]);

        equal(loadingIcons().length, 0, "icon is not hidden after operation finishes");
    });

    test("removes collapsed icon if no data is returned", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        instance.content.find(".k-i-expand").click();

        read.resolve([]);

        equal(instance.content.find(".k-icon.k-i-collapse").length, 0);
    });

    test("clicks on loading icon are ignored", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        instance.content.find(".k-i-expand").click();

        instance.content.find(".k-i-collapse").click();

        equal(instance.content.find(".k-i-expand").length, 0);
        equal(instance.content.find(".k-loading").length, 1);
    });

    test("shows initial loading message during load", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        ok(instance.content.text().indexOf("Loading") >= 0);

        read.resolve([ { id: 1 } ]);

        ok(instance.content.text().indexOf("Loading") < 0);
    });

    test("uses passed loading message", function() {
        var read = controlledRead();
        var message = "Fetching data";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { loading: message }
        });

        ok(instance.content.text().indexOf(message) >= 0);
    });

    test("shows no rows message when no rows have been fetched", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([]);

        equal(instance.content.text(), "No records to display");
    });

    test("uses passed no rows message", function() {
        var read = controlledRead();
        var message = "Nothing to show";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { noRows: message }
        });

        read.resolve([]);

        equal(instance.content.text(), message);
    });
})();
