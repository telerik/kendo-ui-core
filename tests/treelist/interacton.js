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

        var rows = instance.content.find("tr");

        equal(rows.length, 2);
        ok(rows.eq(0).is(":visible"));
        ok(!rows.eq(1).is(":visible"));
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

    function statusHTML() {
        return instance.element.find(".k-status").text();
    }

    test("shows initial loading message during load", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        ok(statusHTML().indexOf("Loading") >= 0);

        read.resolve([ { id: 1 } ]);

        ok(statusHTML().indexOf("Loading") < 0);
    });

    test("uses passed loading message", function() {
        var read = controlledRead();
        var message = "Fetching data";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { loading: message }
        });

        ok(statusHTML().indexOf(message) >= 0);
    });

    test("hides content when showing status", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        ok(!instance.content.is(":visible"));

        read.resolve([ { id: 1 } ]);

        ok(instance.content.is(":visible"));
    });

    test("shows no rows message when no rows have been fetched", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.resolve([]);

        equal(statusHTML(), "No records to display");
    });

    test("uses passed no rows message", function() {
        var read = controlledRead();
        var message = "Nothing to show";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { noRows: message }
        });

        read.resolve([]);

        equal(statusHTML(), message);
    });

    test("shows no rows message when datasource is filtered to zero elements", function() {
        createTreeList({
            dataSource: {
                data: [
                    { id: 1 },
                    { id: 2 }
                ]
            }
        });

        instance.dataSource.filter({ field: "id", operator: "eq", value: 3 });

        equal(statusHTML(), "No records to display");

        instance.dataSource.filter({});

        equal(instance.content.find("tr").length, 2);
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

        ok(instance.element.text().indexOf("Request failed.") >= 0);
    });

    test("request failed messages is used from messages object", function() {
        var read = controlledRead();
        var message = "Oops, something went wrong.";

        createTreeList({
            dataSource: { transport: { read: read } },
            messages: { requestFailed: message }
        });

        read.reject({});

        ok(instance.element.text().indexOf(message) >= 0);
    });

    test("retry button is rendered for root level", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.reject({});

        var button = instance.element.find("button.k-button.k-request-retry");
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

        equal(instance.element.find(".k-request-retry").text(), message);
    });

    test("clicking retry button triggers read", function() {
        var read = controlledRead();

        createTreeList({
            dataSource: { transport: { read: read } }
        });

        read.reject({});

        instance.element.find(".k-request-retry").click();

        read.resolve([ { id: 1 } ]);

        equal(instance.content.find("tr").length, 1);
    });

    test("clicking edit button triggers edit mode", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        var row = instance.content.find(".k-grid-edit").closest("tr");

        instance.editRow = function(arg) {
            ok(true);
            equal(arg[0], row[0]);
        };

        instance.content.find(".k-grid-edit").click();
    });

    test("clicking create child button triggers edit mode", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["createchild"] }
            ]
        });

        instance.editRow = function() {
            ok(true);
        };

        instance.content.find(".k-grid-add").click();
    });

    test("editing row shows update and cancel buttons", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        instance.editRow("tr");

        var content = instance.content;
        equal(content.find(".k-grid-update").length, 1);
        equal(content.find(".k-grid-cancel").length, 1);
    });

    test("clicking cancel button calls cancelRow", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        instance.editRow("tr");

        instance.cancelRow = function() {
            ok(true);
        };

        instance.content.find(".k-grid-cancel").click();
    });

    test("clicking update button calls saveRow", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["edit"] }
            ]
        });

        instance.editRow("tr");

        instance.saveRow = function() {
            ok(true);
        };

        instance.content.find(".k-grid-update").click();
    });

    test("clicking delete button calls removeRow", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: ["destroy"] }
            ]
        });

        var row = instance.content.find(".k-grid-delete").closest("tr");

        instance.removeRow = function(arg) {
            ok(true);
            equal(arg[0], row[0]);
        };

        instance.content.find(".k-grid-delete").click();
    });

    test("clicking excel button calls saveAsExcel", function() {
        createTreeList({
            toolbar: ["excel"],
            dataSource: [ { id: 1 } ],
            columns: [ { field: "id" } ]
        });

        instance.saveAsExcel = function(arg) {
            ok(true);
        };

        dom.find(".k-grid-excel").click();
    });

    test("clicking pdf button calls saveAsPDF", function() {
        createTreeList({
            toolbar: ["pdf"],
            dataSource: [ { id: 1 } ],
            columns: [ { field: "id" } ]
        });

        instance.saveAsPDF = function(arg) {
            ok(true);
        };

        dom.find(".k-grid-pdf").click();
    });

    test("custom command renders button with passed className", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [
                    { name: "foo", className: "foo" }
                ] }
            ]
        });

        equal(instance.content.find(".foo").length, 1);
    });

    test("clicking custom command buttons executes their click action", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [
                    { name: "foo", className: "foo", click: function() { ok(true); } }
                ] }
            ]
        });

        instance.content.find(".foo").click();
    });

    test("clicking custom command buttons passes events arguments", function() {
        createTreeList({
            dataSource: [ { id: 1 } ],
            columns: [
                { field: "id" },
                { command: [
                    { name: "foo", className: "foo", click: function(e) { ok(e); } }
                ] }
            ]
        });

        instance.content.find(".foo").click();
    });

    test("selects row on click", function() {
        createTreeList({
            selectable: true
        });

        var row = instance.content.find("tr:first");
        tap(row);

        ok(row.hasClass("k-state-selected"));
    });

    test("does not select row if selectable is false", function() {
        createTreeList({
            selectable: false
        });

        var row = instance.content.find("tr:first");
        tap(row);

        ok(!row.hasClass("k-state-selected"));
    });

    test("selects cell if selectable is 'cell'", function() {
        createTreeList({
            selectable: "cell"
        });

        var cell = instance.content.find("td:first");
        tap(cell);

        ok(cell.hasClass("k-state-selected"));
    });

    test("does not select footer row if selectable is false", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "foo" } ],
            selectable: true
        });

        var footer = instance.content.find("tr.k-footer-template");

        tap(footer);

        ok(!footer.hasClass("k-state-selected"));
    });

    test("does not select footer cells", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "foo" } ],
            selectable: "cell"
        });

        var footerCells = instance.content.find(".k-footer-template td");

        tap(footerCells.eq(0));

        ok(!footerCells.hasClass("k-state-selected"));
    });
})();
