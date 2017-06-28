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

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            dataItem1 = { id: 5, text: "item5" };
            dataItem2 = { id: 6, text: "item6" };
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("add() should add a single data item", function() {
        var dataItemsLength = listbox.dataItems().length;

        listbox.add(dataItem1);

        equal(listbox.dataSource.data().length, dataItemsLength + 1);
    });

    test("add() should append a single list item", function() {
        var itemsLength = listbox.items().length;

        listbox.add(dataItem1);

        equal(listbox.items().length, itemsLength + 1);
        equal(listbox.items().last().html(), dataItem1.text);
    });

    test("add() should add multiple data item", function() {
        var dataItemsLength = listbox.dataItems().length;

        listbox.add([dataItem1, dataItem2]);

        equal(listbox.dataSource.data().length, dataItemsLength + 2);
    });

    test("add() should append multiple list items", function() {
        var itemsLength = listbox.items().length;

        listbox.add([dataItem1, dataItem2]);

        equal(listbox.items().length, itemsLength + 2);
        equal(listbox.items().last().prev().html(), dataItem1.text);
        equal(listbox.items().last().html(), dataItem2.text);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("remove() should remove the item from the dataSource", function() {
        listbox.remove(item1);

        equal(listbox.dataSource.data().length, 3);
        equal(getDataItem(listbox, item1), undefined);
    });

    test("remove() should remove the html element of the item", function() {
        listbox.remove(item1);

        equal(listbox.items().length, 3);
        equal(listbox.items().eq(0).html(), dataItems[1].text);
        equal(listbox.items().eq(1).html(), dataItems[2].text);
    });

    test("remove() should not remove an item that shouldn't exist", function() {
        listbox.remove(null);

        equal(listbox.dataSource.data().length, 4);
    });

    test("remove() should remove multiple items from the dataSource", function() {
        listbox.remove(listbox.items());

        equal(listbox.dataSource.data().length, 0);
    });

    test("remove() should remove multiple html elements of the items", function() {
        listbox.remove(listbox.items());

        equal(listbox.items().length, 0);
    });

    test("remove() should work with selector", function() {
        listbox.remove(FIRST_ITEM_SELECTOR);

        equal(listbox.dataSource.data().length, 3);
        equal(listbox.items().length, 3);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("dataItem() should return data item for element", function() {
        var dataItem = listbox.dataItem(listbox.items().eq(0));

        equal(dataItem.id, dataItems[0].id);
    });

    test("dataItem() should not return dataItem for non-existing element", function() {
        var dataItem = listbox.dataItem(null);

        equal(dataItem, undefined);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
            item3 = listbox.items().eq(2);
            item4 = listbox.items().eq(3);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("reorder() should move the html element of a list item", function() {
        listbox.reorder(item1, 1);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    test("reorder() should not move the data item of a list item in the dataSource", function() {
        listbox.reorder(item1, 1);

        equal(listbox.dataSource.at(0).uid, getId(item1));
        equal(listbox.dataSource.at(1).uid, getId(item2));
    });

    test("reorder() should not reorder at invalid index", function() {
        listbox.reorder(item1, -1);

        equalListItems(listbox.items().eq(0), item1);
    });

    test("reorder() should not reorder with invalid item", function() {
        listbox.reorder($(), 0);

        equalListItems(listbox.items().eq(0), item1);
    });

    test("reorder() should keep item selection", function() {
        item1.addClass(SELECTED_STATE_CLASS);

        listbox.reorder(item1, 1);

        equal(listbox.items().eq(1).hasClass(SELECTED_STATE_CLASS), true);
    });

    test("reorder() should keep item disabled state", function() {
        item1.addClass(DISABLED_STATE_CLASS);

        listbox.reorder(item1, 1);

        equal(listbox.items().eq(1).hasClass(DISABLED_STATE_CLASS), true);
    });

    module("ListBox api", {
        setup: function() {
            dataSource = new kendo.data.DataSource({
                data: [{ value: 1 }]
            });
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("setDataSource() should set options.dataSource", function() {
        listbox = createListBox();
        var dataSource = [1, 2, 3];

        listbox.setDataSource(dataSource);

        equal(listbox.options.dataSource, dataSource);
    });

    test("setDataSource() should change dataSource items", function() {
        listbox = createListBox();

        listbox.setDataSource(dataSource);

        equal(listbox.dataSource.data()[0].uid, dataSource.data()[0].uid);
    });

    test("setDataSource() should call fetch if autoBind is true", function() {
        listbox = createListBox({ autoBind: true });
        var fetchSpy = spy(dataSource, "fetch");

        listbox.setDataSource(dataSource);

        equal(fetchSpy.calls("fetch"), 1);
    });

    test("setDataSource() should not call fetch if autoBind is false", function() {
        listbox = createListBox({ autoBind: false });
        var fetchSpy = spy(dataSource, "fetch");

        listbox.setDataSource(dataSource);

        equal(fetchSpy.calls("fetch"), 0);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("refresh() should render list items", function() {
        listbox.element.find(".k-item").remove();

        listbox.refresh();

        deepEqual(listbox.items().length, listbox.dataSource.data().length);
    });

    module("ListBox api", {
        setup: function() {
            listbox = createListBox();
            item1 = listbox.items().eq(0);
            item2 = listbox.items().eq(1);
        },
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("enable() should enable single item", function() {
        listbox.enable(item1);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable() should enable multiple items", function() {
        listbox.enable(item1.add(item2));

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        equal(item2.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable(true) should enable single item", function() {
        listbox.enable(item1, true);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable(true) should enable multiple items", function() {
        listbox.enable(item1.add(item2), true);

        equal(item1.hasClass(DISABLED_STATE_CLASS), false);
        equal(item2.hasClass(DISABLED_STATE_CLASS), false);
    });

    test("enable() should disable single item", function() {
        listbox.enable(item1, false);

        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
    });

    test("enable() should disable multiple items", function() {
        listbox.enable(item1.add(item2), false);

        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
        equal(item2.hasClass(DISABLED_STATE_CLASS), true);
    });

    test("enable() should remove selection", function() {
        listbox.select(item1);

        listbox.enable(item1, false);

        equal(item1.hasClass(SELECTED_STATE_CLASS), false);
        equal(item1.hasClass(DISABLED_STATE_CLASS), true);
    });

    test("enable() should work with selector", function() {
        listbox.enable(FIRST_ITEM_SELECTOR, false);

        equal(listbox.items().eq(0).hasClass(DISABLED_STATE_CLASS), true);
    });
})();
