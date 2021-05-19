/* globals stub */
(function() {
    var ListBox = kendo.ui.ListBox;
    var container;
    var listbox;

    describe("Selectable API", function () {
        beforeEach(function() {
            container = $("<select />").appendTo(Mocha.fixture);
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

    it("get all items from the listbox", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        assert.equal(items.length, 3);
    });

    it("select HTML item", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items[0]);

        var selected = listbox.select();

        assert.equal(selected.length, 1);
        assert.equal(selected[0], items[0]);
    });

    it("select another deselects the first", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items[0]);
        listbox.select(items[1]);

        var selected = listbox.select();
        assert.equal(selected.length, 1);
        assert.equal(selected[0], items[1]);
    });

    it("single selection chooses first from list", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        var items = listbox.items();
        listbox.select(items.filter(":gt(0)"));

        var selected = listbox.select();
        assert.equal(selected.length, 1);
        assert.equal(selected[0], items[1]);
    });

    it("select all items when multi select", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            selectable: "multiple"
        });

        var items = listbox.items();
        listbox.select(items);

        var selected = listbox.select();
        assert.equal(selected.length, 3);
        assert.deepEqual(selected.toArray(), items.toArray());
    });

    it("non-sequential select", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            selectable: "multiple"
        });

        var items = listbox.items().filter(":not(:eq(1))");
        listbox.select(items);

        var selected = listbox.select();
        assert.equal(selected.length, 2);
        assert.deepEqual(selected.toArray(), items.toArray());
    });

    it("clear selection removes selection on all items", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        listbox.select(listbox.items()[0]);

        listbox.clearSelection();

        assert.equal(listbox.select().length, 0);
    });

    it("select triggers change event", function() {
        var changeStub = stub({}, "change");
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3],
            change: changeStub.change
        });

        listbox.select(listbox.items()[0]);

        assert.equal(changeStub.calls("change"), 1);
    });

    it("clearSelection removes selection", function() {
        listbox = new ListBox(container, {
            dataSource: [1, 2, 3]
        });

        listbox.select(listbox.items()[0]);
        listbox.clearSelection();

        assert.equal(listbox.select().length, 0);
    });
});

    describe("Selectable API", function () {
        beforeEach(function() {
            container = $("<select />").appendTo(Mocha.fixture);
            listbox = new ListBox(container, {
                dataSource: [1, 2, 3]
            });
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

    it("should not select disabled items", function() {
        listbox.items().addClass("k-state-disabled");

        listbox.select(listbox.items());

        assert.equal(listbox.select().length, 0);
    });

    it("destroying the selectable and then the listbox does not throw error", function() {
        listbox.selectable.destroy();

        listbox.destroy();

        assert.isOk(true);
    });
    });
}());
