(function() {
    var listbox;
    var item;

    var DISABLED_STATE_CLASS = "k-state-disabled";
    var SELECTED_STATE_CLASS = "k-state-selected";
    var DOT = ".";
    var REORDER = "reorder";
    var REMOVE = "remove";
    var TRANSFER = "transfer";
    var ADD = "add";

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("remove action should trigger remove event with args", function() {
        listbox = createListBoxWithToolbar({
            remove: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var items = listbox.items();
        var dataItem = listbox.dataItem(item);
        listbox.select(item);

        clickRemoveButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("remove action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox = createListBoxWithToolbar({
            remove: function(e) {
                calls++;
            }
        });
        var removeSpy = spy(listbox, REMOVE);
        listbox.select(listbox.items());

        clickRemoveButton(listbox);

        equal(calls, 1);
    });

    test("remove action should be preventable", function() {
        var args = {};
        listbox = createListBoxWithToolbar({
            remove: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(0);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickRemoveButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("movedown action should trigger reorder event with args", function() {
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(0);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickMoveDownButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
        equal(args.offset, 1);
    });

    test("movedown action should trigger a single reorder event for multiple items", function() {
        var calls = 0;
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                calls++;
            }
        });
        var item2 = listbox.items().eq(1);
        var item3 = listbox.items().eq(2);
        listbox.select(item2.add(item3));

        clickMoveDownButton(listbox);

        equal(calls, 1);
    });

    test("movedown action should be preventable", function() {
        var args = {};
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(0);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickMoveDownButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("moveup action should trigger reorder event with args", function() {
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                args = e;
            }
        });
        var item = listbox.items().eq(1);
        var dataItem = getDataItem(listbox, item);
        listbox.select(item);

        clickMoveUpButton(listbox);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
        equal(args.offset, -1);
    });

    test("moveup action should trigger a single reorder event for multiple items", function() {
        var calls = 0;
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                calls++;
            }
        });
        var item2 = listbox.items().eq(1);
        var item3 = listbox.items().eq(2);
        listbox.select(item2.add(item3));

        clickMoveUpButton(listbox);

        equal(calls, 1);
    });

    test("moveup action should be preventable", function() {
        var args = {};
        listbox = createListBoxWithToolbar({
            reorder: function(e) {
                args = e;
                e.preventDefault();
            }
        });
        var item = listbox.items().eq(1);
        var itemsLength = listbox.items().length;
        listbox.select(item);

        clickMoveUpButton(listbox);

        equal(args.isDefaultPrevented(), true);
        equal(listbox.items().length, itemsLength);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBoxWithToolbar({
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                }
            }, "<select id='listbox2' />");

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("transferTo action should trigger remove event with args for source listbox", function() {
        listbox1.bind(REMOVE, function(e) {
            args = e;
        });
        var item = listbox1.items().eq(0);
        var dataItem = listbox1.dataItem(item);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferTo action should trigger add event with args for destination listbox", function() {
        listbox2.bind(ADD, function(e) {
            args = e;
        });
        var item = listbox1.items().eq(0);
        var dataItem = listbox1.dataItem(item);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferTo action should trigger a single add event for multiple items", function() {
        var calls = 0;
        listbox2.bind(ADD, function(e) {
            calls++;
        });
        var item2 = listbox1.items().eq(1);
        var item3 = listbox1.items().eq(2);
        listbox1.select(item2.add(item3));

        clickTransferToButton(listbox1);

        equal(calls, 1);
    });

    test("transferTo action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox1.bind(REMOVE, function(e) {
            calls++;
        });
        var item2 = listbox1.items().eq(1);
        var item3 = listbox1.items().eq(2);
        listbox1.select(item2.add(item3));

        clickTransferToButton(listbox1);

        equal(calls, 1);
    });

    test("transferTo should trigger a remove event for source listbox which should be preventable", function() {
        var args = {};
        listbox1.bind(REMOVE, function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox1.items().eq(0);
        var itemsLength = listbox1.items().length;
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength);
        equal(listbox2.items().length, 1);
    });

    test("transferTo should trigger an add event for destination listbox which should be preventable", function() {
        var args = {};
        listbox2.bind(ADD, function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox1.items().eq(0);
        var itemsLength = listbox1.items().length;
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength - 1);
        equal(listbox2.items().length, 0);
    });

    test("transferTo should not change selection if remove event for source listbox is prevented", function() {
        listbox1.bind(REMOVE, function(e) {
            e.preventDefault();
        });
        var item = listbox1.items().eq(0);
        listbox1.select(item);

        clickTransferToButton(listbox1);

        equal(listbox1.select().length, 1);
        equalListItems(listbox1.select(), item);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                },
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: [{
                        id: 5,
                        text: "item5"
                    }, {
                        id: 6,
                        text: "item6"
                    }]
                }
            }, "<select id='listbox2' />");

             $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("transferFrom action should trigger a remove event with args for source listbox", function() {
        listbox2.bind(REMOVE, function(e) {
            args = e;
        });
        var item = listbox2.items().eq(0);
        var dataItem = listbox2.dataItem(item);
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferFrom action should trigger an add event with args for destination listbox", function() {
        listbox1.bind(ADD, function(e) {
            args = e;
        });
        var item = listbox2.items().eq(0);
        var dataItem = listbox2.dataItem(item);
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equalDataArrays(args.dataItems, [dataItem]);
        equalListItemArrays(args.items, $(item));
    });

    test("transferFrom action should trigger a single add event for multiple items", function() {
        var calls = 0;
        listbox1.bind(ADD, function(e) {
            calls++;
        });
        var item2 = listbox2.items().eq(1);
        var item3 = listbox2.items().eq(2);
        listbox2.select(item2.add(item3));

        clickTransferFromButton(listbox1);

        equal(calls, 1);
    });

    test("transferFrom action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox2.bind(REMOVE, function(e) {
            calls++;
        });
        var item2 = listbox2.items().eq(1);
        var item3 = listbox2.items().eq(2);
        listbox2.select(item2.add(item3));

        clickTransferFromButton(listbox1);

        equal(calls, 1);
    });

    test("transferFrom should trigger a remove event for source listbox which should be preventable", function() {
        var args = {};
        listbox2.bind(REMOVE, function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox2.items().eq(0);
        var itemsLength = listbox2.items().length;
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, 1);
        equal(listbox2.items().length, itemsLength);
    });

    test("transferFrom should trigger an add event for destination listbox which should be preventable", function() {
        var args = {};
        listbox1.bind(ADD, function(e) {
            args = e;
            e.preventDefault();
        });
        var item = listbox2.items().eq(0);
        var itemsLength = listbox2.items().length;
        listbox2.select(item);

        clickTransferFromButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, 0);
        equal(listbox2.items().length, itemsLength - 1);
    });

    test("transferFrom should not change selection if remove event for source listbox is prevented", function() {
        listbox2.bind(REMOVE, function(e) {
            e.preventDefault();
        });
        var item = listbox2.items().eq(0);
        listbox2.select(item);

        clickTransferToButton(listbox1);

        equal(listbox2.select().length, 1);
        equal(listbox2.select()[0], item[0]);
    });

    module("ListBox events", {
        setup: function() {
            listbox1 = createListBoxWithToolbar({
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                }
            }, "<select id='listbox2' />");

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("transferAllTo action should trigger remove event with args for source listbox", function() {
        listbox1.bind(REMOVE, function(e) {
            args = e;
        });
        var items = listbox1.items();
        var dataItems = listbox1.dataItems();

        clickTransferAllToButton(listbox1);

        equalDataArrays(args.dataItems, dataItems);
        equalListItemArrays(args.items, items);
    });

    test("transferAllTo action should trigger add event with args for destination listbox", function() {
        listbox2.bind(ADD, function(e) {
            args = e;
        });
        var items = listbox1.items();
        var dataItems = listbox1.dataItems();

        clickTransferAllToButton(listbox1);

        equalDataArrays(args.dataItems, dataItems);
        equalListItemArrays(args.items, items);
    });

    test("transferAllTo action should trigger a single add event for multiple items", function() {
        var calls = 0;
        listbox2.bind(ADD, function(e) {
            calls++;
        });

        clickTransferAllToButton(listbox1);

        equal(calls, 1);
    });

    test("transferAllTo action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox1.bind(REMOVE, function(e) {
            calls++;
        });

        clickTransferAllToButton(listbox1);

        equal(calls, 1);
    });

    test("transferAllTo should trigger a remove event for source listbox which should be preventable", function() {
        var args = {};
        listbox1.bind(REMOVE, function(e) {
            args = e;
            e.preventDefault();
        });
        var items = listbox1.items();
        var dataItems = listbox1.dataItems();
        var itemsLength = items.length;

        clickTransferAllToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength);
        equal(listbox2.items().length, itemsLength);
    });

    test("transferAllTo should trigger an add event for destination listbox which should be preventable", function() {
        var args = {};
        listbox2.bind(ADD, function(e) {
            args = e;
            e.preventDefault();
        });
        var items = listbox1.items();
        var dataItems = listbox1.dataItems();

        clickTransferAllToButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, 0);
        equal(listbox2.items().length, 0);
    });

    module("ListBox toolbar", {
        setup: function() {
            listbox1 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                },
                connectWith: "#listbox2"
            }, "<select id='listbox1' />");

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: [{
                        id: 5,
                        text: "item5"
                    }, {
                        id: 6,
                        text: "item6"
                    }]
                }
            }, "<select id='listbox2' />");

            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(QUnit.fixture);
            $(document.body).find(QUnit.fixture).off().remove();
        }
    });

    test("transferAllFrom action should trigger remove event with args for source listbox", function() {
        listbox2.bind(REMOVE, function(e) {
            args = e;
        });
        var items = listbox2.items();
        var dataItems = listbox2.dataItems();

        clickTransferAllFromButton(listbox1);

        equalDataArrays(args.dataItems, dataItems);
        equalListItemArrays(args.items, items);
    });

    test("transferAllFrom action should trigger add event with args for destination listbox", function() {
        listbox1.bind(ADD, function(e) {
            args = e;
        });
        var items = listbox2.items();
        var dataItems = listbox2.dataItems();

        clickTransferAllFromButton(listbox1);

        equalDataArrays(args.dataItems, dataItems);
        equalListItemArrays(args.items, items);
    });

    test("transferAllFrom action should trigger a single add event for multiple items", function() {
        var calls = 0;
        listbox1.bind(ADD, function(e) {
            calls++;
        });

        clickTransferAllFromButton(listbox1);

        equal(calls, 1);
    });

    test("transferAllFrom action should trigger a single remove event for multiple items", function() {
        var calls = 0;
        listbox2.bind(REMOVE, function(e) {
            calls++;
        });

        clickTransferAllFromButton(listbox1);

        equal(calls, 1);
    });

    test("transferAllFrom should trigger a remove event for source listbox which should be preventable", function() {
        var args = {};
        listbox2.bind(REMOVE, function(e) {
            args = e;
            e.preventDefault();
        });
        var itemsLength = listbox2.items().length;

        clickTransferAllFromButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, itemsLength);
        equal(listbox2.items().length, itemsLength);
    });

    test("transferAllFrom should trigger an add event for destination listbox which should be preventable", function() {
        var args = {};
        listbox1.bind(ADD, function(e) {
            args = e;
            e.preventDefault();
        });

        clickTransferAllFromButton(listbox1);

        equal(args.isDefaultPrevented(), true);
        equal(listbox1.items().length, 0);
        equal(listbox2.items().length, 0);
    });

    module("ListBox events", {
        teardown: function() {
            destroyListBox(listbox);
            kendo.destroy(QUnit.fixture);
        }
    });

    test("initializing a listbox with data source should trigger dataBound event", function() {
        var called = false;

        listbox = createListBoxWithToolbar({
            dataBound: function() {
                called = true;
            }
        });

        equal(called, true);
    });

    test("refresh should trigger dataBound event", function() {
        var called = false;
        listbox = createListBox();
        listbox.bind("dataBound", function() {
            called = true;
        })

        listbox.refresh();

        equal(called, true);
    });
})();
