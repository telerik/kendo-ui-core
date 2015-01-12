(function() {
    var TreeListDataSource = kendo.data.TreeListDataSource;

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

    test("destroy unbinds dataSource handlers", function() {
        createTreeList();

        var dataSource = instance.dataSource;

        instance.destroy();

        function hasHandlers(eventName) {
            var handlers = dataSource._events[eventName];
            return handlers && handlers.length;
        }

        ok(!hasHandlers("change"), "change handlers remaining");
        ok(!hasHandlers("error"), "error handlers remaining");
        ok(!hasHandlers("progress"), "progress handlers remaining");
    });

    test("destroy nulls dom references", function() {
        createTreeList();

        instance.destroy();

        ok(!instance.element);
        ok(!instance.header);
        ok(!instance.content);
        ok(!instance.headerTree);
        ok(!instance.contentTree);
    });

    test("destroy removes event handlers", function() {
        createTreeList();

        var content = instance.content;

        instance.destroy();

        var events = $._data(content[0], "events");
        ok(!events || !events.click || !events.click.length);
    });

    test("items returns item rows", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ]
        });

        equal(instance.items().length, 2);
    });

    test("items does not return footer templates", function() {
        createTreeList({
            columns: [
                "id",
                { field: "parentId", footerTemplate: "foo" }
            ]
        });

        equal(instance.items().length, 2);
    });

    test("items returns collapsed rows", function() {
        createTreeList();

        equal(instance.items().length, 2);
    });

    test("setDataSource changes dataSource", function() {
        createTreeList();

        var ds = new TreeListDataSource({
            data: [
                { id: 3, parentId: null }
            ]
        });

        instance.setDataSource(ds);

        equal(instance.dataSource, ds);
    });

    test("setDataSource binds refresh handler", function() {
        createTreeList();

        var ds = TreeListDataSource.create([ { id: 3, parentId: null } ]);

        instance.setDataSource(ds);

        equal(instance.content.find("tr").length, 1);
    });

    test("setDataSource unbinds handlers", function() {
        createTreeList();

        var previousDs = instance.dataSource;

        instance.setDataSource(TreeListDataSource.create([ { id: 3, parentId: null } ]));

        previousDs.trigger("change");
        previousDs.trigger("error");
        previousDs.trigger("progress");

        equal(dom.find(".k-status").length, 0);
        equal(instance.content.find("tr").length, 1);
    });

    test("setDataSource does not fetch dataSource if autoBind is false", function() {
        createTreeList({
            autoBind: false
        });

        var ds = TreeListDataSource.create([ { id: 3, parentId: null } ]);

        instance.setDataSource(ds);

        equal(ds.data().length, 0);
    });

    test("setDataSource reinitializes sortable", function() {
        createTreeList({
            sortable: true
        });

        var sortable = instance.header.find("th:first").data("kendoColumnSorter");

        var ds = TreeListDataSource.create([ { id: 3, parentId: null } ]);

        instance.setDataSource(ds);

        ok(instance.header.find("th:first").data("kendoColumnSorter") != sortable, "sorter instance is not changed");
    });

    test("setDataSource reinitializes filterable", function() {
        createTreeList({
            filterable: true
        });

        var filterMenu = instance.header.find("th:first").data("kendoFilterMenu");

        var ds = TreeListDataSource.create([ { id: 3, parentId: null } ]);

        instance.setDataSource(ds);

        ok(instance.header.find("th:first").data("kendoFilterMenu") != filterMenu, "filter menu instance is not changed");
    });

    test("select calls selectable.value as getter", function() {
        createTreeList({ selectable: true });

        spy(instance.selectable, "value");

        instance.select();

        equal(instance.selectable.calls("value"), 1);
        ok(typeof instance.selectable.args("value")[0] == "undefined");
    });

    test("select calls selectable.value as setter", function() {
        createTreeList({ selectable: true });

        spy(instance.selectable, "value");

        var row = instance.content.find("tr").eq(0);
        instance.select(row);

        equal(instance.selectable.calls("value"), 1);
        equal(instance.selectable.args("value")[0][0], row[0]);
    });

    test("select clears selection before selecting new row", function() {
        createTreeList({ selectable: true });

        var rows = instance.content.find("tr");
        instance.select(rows.eq(0));
        instance.select(rows.eq(1));

        equal(instance.content.find("tr.k-state-selected").length, 1);
    });

    test("select does not clear selection when multi-select is enabled", function() {
        createTreeList({ selectable: "multiple" });

        var rows = instance.content.find("tr");
        instance.select(rows.eq(0));
        instance.select(rows.eq(1));

        equal(instance.content.find("tr.k-state-selected").length, 2);
    });

    test("select on single-row selection does not allow selecting multiple rows", function() {
        createTreeList({ selectable: true });

        instance.select(instance.content.find("tr"));

        var selectedRows = instance.content.find("tr.k-state-selected");
        equal(selectedRows.length, 1);
        equal(selectedRows.index(), 0);
    });

    test("clearSelection calls selectable.clear", function() {
        createTreeList({ selectable: true });

        var row = instance.content.find("tr").eq(0);
        instance.select(row);

        spy(instance.selectable, "clear");

        instance.clearSelection();

        equal(instance.selectable.calls("clear"), 1);
    });

    test("clearSelection triggers change", function() {
        var handler = spy();

        createTreeList({ selectable: true });

        var row = instance.content.find("tr").eq(0);
        instance.select(row);

        instance.bind("change", handler);

        instance.clearSelection();

        equal(handler.calls, 1);
    });

    test("clearSelection does not trigger change if no items were selected", function() {
        var handler = spy();

        createTreeList({ selectable: true });

        instance.bind("change", handler);

        instance.clearSelection();

        ok(!handler.calls);
    });

    test("expand shows row children", function() {
        createTreeList();

        var row = instance.content.find("tr:first");

        instance.expand(row);

        equal(instance.content.find(".k-i-collapse").length, 1);
    });

    test("collapse hides row children", function() {
        createTreeList({
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ]
        });

        var row = instance.content.find("tr:first");

        instance.collapse(row);

        equal(instance.content.find(".k-i-expand").length, 1);
    });

    test("collapse hides row footer", function() {
        createTreeList({
            columns: [ { field: "id", footerTemplate: "foo" } ],
            dataSource: [
                { id: 1, parentId: null, expanded: true },
                { id: 2, parentId: 1 }
            ]
        });

        var row = instance.content.find("tr:first");

        instance.collapse(row);

        var footerRow = instance.content.find(".k-footer-template:first");

        equal(footerRow.css("display"), "none");
    });
})()
