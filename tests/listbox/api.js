(function() {
    var listbox;
    var dataSource;
    var item;
    var item1;
    var item2;
    var dataItem1;
    var dataItem2;
    var dataItems = [{
        id: 1,
        text: "item1"
    }, {
        id: 2,
        text: "item2"
    }, {
        id: 3,
        text: "item3"
    }, {
        id: 4,
        text: "item4"
    }];

    var FIRST_ITEM_SELECTOR = ".k-item:first";
    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var DOT = ".";

    function createListBoxCRUD(options, html) {
        var listbox = createListBoxFromHtml(html, $.extend({
            dataSource: {
                transport: {
                    read: function (e) {
                        e.success(dataItems);
                    },
                    destroy: $.noop,
                    create: $.noop,
                    update: $.noop
                }
            },
            dataTextField: "text"
        }, options || {}));

        return listbox;
    }

    function createListBox(options, html) {
        var listbox = createListBoxFromHtml(html, $.extend({
            dataSource: {
                data: dataItems
            },
            dataTextField: "text"
        }, options || {}));

        return listbox;
    }

    function getDataItem(listbox, item) {
        return listbox.dataSource.getByUid(getId(item));
    }

    function getId(item) {
        return item.data("uid");
    }

    function getList(listbox) {
        return listbox.wrapper.find(".k-listBox");
    }

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            dataItem1 = { id: 5, text: "item5" };
            dataItem2 = { id: 6, text: "item6" };
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("add() should add a single data item", function() {
            var dataItemsLength = listbox.dataItems().length;

            listbox.add(dataItem1);

            assert.equal(listbox.dataSource.data().length, dataItemsLength + 1);
        });

        it("add() should append a single list item", function() {
            var itemsLength = listbox.items().length;

            listbox.add(dataItem1);

            assert.equal(listbox.items().length, itemsLength + 1);
            assert.equal(listbox.items().last().html(), dataItem1.text);
        });

        it("add() should add multiple data item", function() {
            var dataItemsLength = listbox.dataItems().length;

            listbox.add([dataItem1, dataItem2]);

            assert.equal(listbox.dataSource.data().length, dataItemsLength + 2);
        });

        it("add() should append multiple list items", function() {
            var itemsLength = listbox.items().length;

            listbox.add([dataItem1, dataItem2]);

            assert.equal(listbox.items().length, itemsLength + 2);
            assert.equal(listbox.items().last().prev().html(), dataItem1.text);
            assert.equal(listbox.items().last().html(), dataItem2.text);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("remove() should remove the item from the dataSource", function() {
            listbox.remove(item1);

            assert.equal(listbox.dataSource.data().length, 3);
            assert.equal(getDataItem(listbox, item1), undefined);
        });

        it("remove() should remove the html element of the item", function() {
            listbox.remove(item1);

            assert.equal(listbox.items().length, 3);
            assert.equal(listbox.items().eq(0).html(), dataItems[1].text);
            assert.equal(listbox.items().eq(1).html(), dataItems[2].text);
        });

        it("remove() should not remove an item that shouldn't exist", function() {
            listbox.remove(null);

            assert.equal(listbox.dataSource.data().length, 4);
        });

        it("remove() should remove multiple items from the dataSource", function() {
            listbox.remove(listbox.items());

            assert.equal(listbox.dataSource.data().length, 0);
        });

        it("remove() should remove multiple html elements of the items", function() {
            listbox.remove(listbox.items());

            assert.equal(listbox.items().length, 0);
        });

        it("remove() should work with selector", function() {
            listbox.remove(FIRST_ITEM_SELECTOR);

            assert.equal(listbox.dataSource.data().length, 3);
            assert.equal(listbox.items().length, 3);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("dataItem() should return data item for element", function() {
            var dataItem = listbox.dataItem(listbox.items().eq(0));

            assert.equal(dataItem.id, dataItems[0].id);
        });

        it("dataItem() should not return dataItem for non-existing element", function() {
            var dataItem = listbox.dataItem(null);

            assert.equal(dataItem, undefined);
        });

        it("setOptions changes correctly the dataTextField and renders the changed items", function() {
            listbox.setOptions({
                dataSource: {
                    data: [{
                        id: 1,
                        newText: "newText1"
                    }]
                },
                dataTextField: "newText"
            });
            var items = listbox.items();

            assert.equal(items.length, 1);
            assert.equal(items.first().text(), "newText1");
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBoxCRUD();
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("removing item pushes it in the destroyed collection", function() {
            listbox.remove(FIRST_ITEM_SELECTOR);

            assert.equal(listbox.dataSource._destroyed.length, 1);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
            item3 = listbox.items().eq(2);
            item4 = listbox.items().eq(3);
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("reorder() should move the html element of a list item", function() {
            listbox.reorder(item1, 1);

            equalListItems(listbox.items().eq(0), item2);
            equalListItems(listbox.items().eq(1), item1);
        });

        it("reorder() should not move the data item of a list item in the dataSource", function() {
            listbox.reorder(item1, 1);

            assert.equal(listbox.dataSource.at(0).uid, getId(item1));
            assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        });

        it("reorder() should not reorder at invalid index", function() {
            listbox.reorder(item1, -1);

            equalListItems(listbox.items().eq(0), item1);
        });

        it("reorder() should not reorder with invalid item", function() {
            listbox.reorder($(), 0);

            equalListItems(listbox.items().eq(0), item1);
        });

        it("reorder() should keep item selection", function() {
            item1.addClass(SELECTED_STATE_CLASS);

            listbox.reorder(item1, 1);

            assert.equal(listbox.items().eq(1).hasClass(SELECTED_STATE_CLASS), true);
        });

        it("reorder() should keep item disabled state", function() {
            item1.addClass(DISABLED_STATE_CLASS);

            listbox.reorder(item1, 1);

            assert.equal(listbox.items().eq(1).hasClass(DISABLED_STATE_CLASS), true);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            dataSource = new kendo.data.DataSource({
                data: [{ value: 1 }]
            });
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("setDataSource() should set options.dataSource", function() {
            listbox = createListBox();
            var dataSource = [1, 2, 3];

            listbox.setDataSource(dataSource);

            assert.equal(listbox.options.dataSource, dataSource);
        });

        it("setDataSource() should change dataSource items", function() {
            listbox = createListBox();

            listbox.setDataSource(dataSource);

            assert.equal(listbox.dataSource.data()[0].uid, dataSource.data()[0].uid);
        });

        it("setDataSource() should call fetch if autoBind is true", function() {
            listbox = createListBox({ autoBind: true });
            var fetchSpy = spy(dataSource, "fetch");

            listbox.setDataSource(dataSource);

            assert.equal(fetchSpy.calls("fetch"), 1);
        });

        it("setDataSource() should not call fetch if autoBind is false", function() {
            listbox = createListBox({ autoBind: false });
            var fetchSpy = spy(dataSource, "fetch");

            listbox.setDataSource(dataSource);

            assert.equal(fetchSpy.calls("fetch"), 0);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("refresh() should render list items", function() {
            listbox.element.find(".k-item").remove();

            listbox.refresh();

            assert.deepEqual(listbox.items().length, listbox.dataSource.data().length);
        });
    });

    describe("ListBox api", function() {
        beforeEach(function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
        });
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("enable() should enable single item", function() {
            listbox.enable(item1);

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        });

        it("enable() should enable multiple items", function() {
            listbox.enable(item1.add(item2));

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), false);
            assert.equal(item2.hasClass(DISABLED_STATE_CLASS), false);
        });

        it("enable(true) should enable single item", function() {
            listbox.enable(item1, true);

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        });

        it("enable(true) should enable multiple items", function() {
            listbox.enable(item1.add(item2), true);

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), false);
            assert.equal(item2.hasClass(DISABLED_STATE_CLASS), false);
        });

        it("enable() should disable single item", function() {
            listbox.enable(item1, false);

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), true);
        });

        it("enable() should disable multiple items", function() {
            listbox.enable(item1.add(item2), false);

            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), true);
            assert.equal(item2.hasClass(DISABLED_STATE_CLASS), true);
        });

        it("enable() should remove selection", function() {
            listbox.select(item1);

            listbox.enable(item1, false);

            assert.equal(item1.hasClass(SELECTED_STATE_CLASS), false);
            assert.equal(item1.hasClass(DISABLED_STATE_CLASS), true);
        });

        it("enable() should work with selector", function() {
            listbox.enable(FIRST_ITEM_SELECTOR, false);

            assert.equal(listbox.items().eq(0).hasClass(DISABLED_STATE_CLASS), true);
        });
    });
}());
