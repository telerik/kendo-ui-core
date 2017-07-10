/* globals stub */
(function() {
    var ListBox = kendo.ui.ListBox;
    var container;
    var listbox;

    module("Selectable API",  {
        setup: function() {
            container = $("<select />").appendTo(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("get all items from the listbox", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        equal(items.length, 3);
    });

    test("select HTML item", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items[0]);

        var selected = listbox.select();

        equal(selected.length, 1);
        equal(selected[0], items[0]);
    });

    test("select another deselects the first", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items[0]);
        listbox.select(items[1]);

        var selected = listbox.select();
        equal(selected.length, 1);
        equal(selected[0], items[1]);
    });

    test("single selection chooses first from list", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items.filter(":gt(0)"));

        var selected = listbox.select();
        equal(selected.length, 1);
        equal(selected[0], items[1]);
    });

    test("select all items when multi select", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            selectable: "multiple"
        });

        var items = listbox.items();
        listbox.select(items);

        var selected = listbox.select();
        equal(selected.length, 3);
        deepEqual(selected.toArray(), items.toArray());
    });

    test("non-sequential select", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            selectable: "multiple"
        });

        var items = listbox.items().filter(":not(:eq(1))");
        listbox.select(items);

        var selected = listbox.select();
        equal(selected.length, 2);
        deepEqual(selected.toArray(), items.toArray());
    });

    test("clear selection removes selection on all items", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        listbox.select(listbox.items()[0]);

        listbox.clearSelection();

        equal(listbox.select().length, 0);
    });

    test("select triggers change event", function() {
        var changeStub = stub({}, "change");
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            change: changeStub.change
        });

        listbox.select(listbox.items()[0]);

        equal(changeStub.calls("change"), 1);
    });

    test("clearSelection removes selection", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        listbox.select(listbox.items()[0]);
        listbox.clearSelection();

        equal(listbox.select().length, 0);
    });

    module("Selectable API", {
        setup: function() {
            container = $("<select />").appendTo(QUnit.fixture);
            listbox = new ListBox(container, {
                dataSource: [1, 2, 3]
            });
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("should not select disabled items", function() {
        listbox.items().addClass("k-state-disabled");

        listbox.select(listbox.items());

        equal(listbox.select().length, 0);
    });
})();
