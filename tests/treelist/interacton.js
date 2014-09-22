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
            if (!queue.length) {
                throw new Error("Tried to resolve a request that hasn't been executed.");
            }
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

    test("shows refresh icon to allow re-fetching of rows", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        instance.content.find(".k-i-expand").click();

        read.reject({});

        equal(instance.content.find(".k-i-refresh").length, 1);
    });

    test("clicking refresh icon fetches rows", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([ { id: 1, hasChildren: true } ]);

        instance.content.find(".k-i-expand").click();

        read.reject({});

        instance.content.find(".k-i-refresh").click();

        read.resolve([ { id: 2, parentId: 1 } ]);

        equal(instance.content.find("tr").length, 2);
    });

    test("failing to load root item shows request failed message", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.reject({});

        ok(instance.content.text().indexOf("Request failed.") >= 0);
    });

    test("request failed messages is used from messages object", function() {
        var read = controlledRead();
        var message = "Oops, something went wrong.";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { requestFailed: message }
        });

        read.reject({});

        ok(instance.content.text().indexOf(message) >= 0);
    });

    test("retry button is rendered for root level", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.reject({});

        var button = instance.content.find("button.k-button.k-request-retry");
        equal(button.length, 1);
        equal(button.text(), "Retry");
    });

    test("retry button uses retry message", function() {
        var read = controlledRead();
        var message = "Try again";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { retry: message }
        });

        read.reject({});

        equal(instance.content.find(".k-request-retry").text(), message);
    });

    test("clicking retry button triggers read", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.reject({});

        instance.content.find(".k-request-retry").click();

        read.resolve([ { id: 1 } ]);

        equal(instance.content.find("tr").length, 1);
    });
})();
