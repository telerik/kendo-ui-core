import {
    createListBoxWithToolbar,
    destroyListBox,
    clickRemoveButton,
    clickMoveUpButton,
    clickMoveDownButton,
    equalDataArrays,
    equalListItemArrays,
    getDataItem,
    clickTransferFromButton,
    clickTransferToButton,
    equalListItems,
    clickTransferAllToButton,
    clickTransferAllFromButton,
    createListBox } from "../../helpers/unit/listbox-utils.js";

import { spy } from "../../helpers/unit/stub.js";

    let listbox, listbox1, listbox2, args;
    let item;

    let DOT = ".";
    let REORDER = "reorder";
    let REMOVE = "remove";
    let TRANSFER = "transfer";
    let ADD = "add";
    let CHANGE = "change";

    describe("ListBox events", function() {
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("remove action should trigger remove event with args", function() {
            listbox = createListBoxWithToolbar({
                remove: function(e) {
                    args = e;
                }
            });
            let item = listbox.items().eq(0);
            let items = listbox.items();
            let dataItem = listbox.dataItem(item);
            listbox.select(item);
            listbox._onSelect();

            clickRemoveButton(listbox);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
        });

        it("remove action should trigger a single remove event for multiple items", function() {
            let calls = 0;
            listbox = createListBoxWithToolbar({
                remove: function(e) {
                    calls++;
                }
            });
            let removeSpy = spy(listbox, REMOVE);
            listbox.select(listbox.items());
            listbox._onSelect();

            clickRemoveButton(listbox);

            assert.equal(calls, 1);
        });

        it("remove action should be preventable", function() {
            let args = {};
            listbox = createListBoxWithToolbar({
                remove: function(e) {
                    args = e;
                    e.preventDefault();
                }
            });
            let item = listbox.items().eq(0);
            let itemsLength = listbox.items().length;
            listbox.select(item);
            listbox._onSelect();

            clickRemoveButton(listbox);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox.items().length, itemsLength);
        });

        it("remove action should not trigger change event", function() {
            let called = false;
            listbox = createListBoxWithToolbar();
            listbox.select(listbox.items().eq(0));
            listbox._onSelect();
            listbox.bind(CHANGE, function() {
                called = true;
            });

            clickRemoveButton(listbox);

            assert.equal(called, false);
        });

        it("remove action should not trigger change event for all items", function() {
            let called = false;
            listbox = createListBoxWithToolbar();
            listbox.select(listbox.items());
            listbox._onSelect();
            listbox.bind(CHANGE, function() {
                called = true;
            });

            clickRemoveButton(listbox);

            assert.equal(called, false);
        });
    });

    describe("ListBox events", function() {
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("movedown action should trigger reorder event with args", function() {
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    args = e;
                }
            });
            let item = listbox.items().eq(0);
            let dataItem = getDataItem(listbox, item);
            listbox.select(item);
            listbox._onSelect();

            clickMoveDownButton(listbox);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
            assert.equal(args.offset, 1);
        });

        it("movedown action should trigger a single reorder event for multiple items", function() {
            let calls = 0;
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    calls++;
                }
            });
            let item2 = listbox.items().eq(1);
            let item3 = listbox.items().eq(2);
            listbox.select(item2.add(item3));
            listbox._onSelect();

            clickMoveDownButton(listbox);

            assert.equal(calls, 1);
        });

        it("movedown action should be preventable", function() {
            let args = {};
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    args = e;
                    e.preventDefault();
                }
            });
            let item = listbox.items().eq(0);
            let itemsLength = listbox.items().length;
            listbox.select(item);
            listbox._onSelect();

            clickMoveDownButton(listbox);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox.items().length, itemsLength);
        });
    });

    describe("ListBox events", function() {
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("moveup action should trigger reorder event with args", function() {
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    args = e;
                }
            });
            let item = listbox.items().eq(1);
            let dataItem = getDataItem(listbox, item);
            listbox.select(item);
            listbox._onSelect();

            clickMoveUpButton(listbox);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
            assert.equal(args.offset, -1);
        });

        it("moveup action should trigger a single reorder event for multiple items", function() {
            let calls = 0;
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    calls++;
                }
            });
            let item2 = listbox.items().eq(1);
            let item3 = listbox.items().eq(2);
            listbox.select(item2.add(item3));
            listbox._onSelect();

            clickMoveUpButton(listbox);

            assert.equal(calls, 1);
        });

        it("moveup action should be preventable", function() {
            let args = {};
            listbox = createListBoxWithToolbar({
                reorder: function(e) {
                    args = e;
                    e.preventDefault();
                }
            });
            let item = listbox.items().eq(1);
            let itemsLength = listbox.items().length;
            listbox.select(item);
            listbox._onSelect();

            clickMoveUpButton(listbox);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox.items().length, itemsLength);
        });
    });

    describe("ListBox events", function() {
        beforeEach(function() {
            $(document.body).append(Mocha.fixture);

            let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);
            let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);

            listbox1 = createListBoxWithToolbar({
                connectWith: "listbox2"
            }, element1);

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                }
            }, element2);
        });
        afterEach(function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(Mocha.fixture);
            $(document.body).find(Mocha.fixture).off().remove();
        });

        it("transferTo action should trigger remove event with args for source listbox", function() {
            listbox1.bind(REMOVE, function(e) {
                args = e;
            });
            let item = listbox1.items().eq(0);
            let dataItem = listbox1.dataItem(item);
            listbox1.select(item);
            listbox1._onSelect();

            clickTransferToButton(listbox1);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
        });

        it("transferTo action should trigger add event with args for destination listbox", function() {
            listbox2.bind(ADD, function(e) {
                args = e;
            });
            let item = listbox1.items().eq(0);
            let dataItem = listbox1.dataItem(item);
            listbox1.select(item);
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
        });

        it("transferTo action should trigger a single add event for multiple items", function() {
            let calls = 0;
            listbox2.bind(ADD, function(e) {
                calls++;
            });
            let item2 = listbox1.items().eq(1);
            let item3 = listbox1.items().eq(2);
            listbox1.select(item2.add(item3));
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferTo action should trigger a single remove event for multiple items", function() {
            let calls = 0;
            listbox1.bind(REMOVE, function(e) {
                calls++;
            });
            let item2 = listbox1.items().eq(1);
            let item3 = listbox1.items().eq(2);
            listbox1.select(item2.add(item3));
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferTo should trigger a remove event for source listbox which should be preventable", function() {
            let args = {};
            listbox1.bind(REMOVE, function(e) {
                args = e;
                e.preventDefault();
            });
            let item = listbox1.items().eq(0);
            let itemsLength = listbox1.items().length;
            listbox1.select(item);
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, itemsLength);
            assert.equal(listbox2.items().length, 1);
        });

        it("transferTo should trigger an add event for destination listbox which should be preventable", function() {
            let args = {};
            listbox2.bind(ADD, function(e) {
                args = e;
                e.preventDefault();
            });
            let item = listbox1.items().eq(0);
            let itemsLength = listbox1.items().length;
            listbox1.select(item);
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, itemsLength - 1);
            assert.equal(listbox2.items().length, 0);
        });

        it("transferTo should not change selection if remove event for source listbox is prevented", function() {
            listbox1.bind(REMOVE, function(e) {
                e.preventDefault();
            });
            let item = listbox1.items().eq(0);
            listbox1.select(item);
            listbox1._onSelect();
            clickTransferToButton(listbox1);

            assert.equal(listbox1.select().length, 1);
            equalListItems(listbox1.select(), item);
        });

        it("transferTo action should trigger a change event of source listbox", function() {
            let called = false;
            listbox1.select(listbox1.items().eq(0));
            listbox1._onSelect();
            listbox1.bind(CHANGE, function(e) {
                called = true;
            });

            clickTransferToButton(listbox1);

            assert.equal(called, true);
        });
    });

    describe("ListBox events", function() {
        beforeEach(function() {
            $(document.body).append(Mocha.fixture);

            let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);
            let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);

            listbox1 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                },
                connectWith: "listbox2"
            }, element1);

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
            }, element2);
        });
        afterEach(function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(Mocha.fixture);
            $(document.body).find(Mocha.fixture).off().remove();
        });

        it("transferFrom action should trigger a remove event with args for source listbox", function() {
            listbox2.bind(REMOVE, function(e) {
                args = e;
            });
            let item = listbox2.items().eq(0);
            let dataItem = listbox2.dataItem(item);
            listbox2.select(item);
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
        });

        it("transferFrom action should trigger an add event with args for destination listbox", function() {
            listbox1.bind(ADD, function(e) {
                args = e;
            });
            let item = listbox2.items().eq(0);
            let dataItem = listbox2.dataItem(item);
            listbox2.select(item);
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            equalDataArrays(args.dataItems, [dataItem]);
            equalListItemArrays(args.items, $(item));
        });

        it("transferFrom action should trigger a single add event for multiple items", function() {
            let calls = 0;
            listbox1.bind(ADD, function(e) {
                calls++;
            });
            let item2 = listbox2.items().eq(1);
            let item3 = listbox2.items().eq(2);
            listbox2.select(item2.add(item3));
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferFrom action should trigger a single remove event for multiple items", function() {
            let calls = 0;
            listbox2.bind(REMOVE, function(e) {
                calls++;
            });
            let item2 = listbox2.items().eq(1);
            let item3 = listbox2.items().eq(2);
            listbox2.select(item2.add(item3));
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferFrom should trigger a remove event for source listbox which should be preventable", function() {
            let args = {};
            listbox2.bind(REMOVE, function(e) {
                args = e;
                e.preventDefault();
            });
            let item = listbox2.items().eq(0);
            let itemsLength = listbox2.items().length;
            listbox2.select(item);
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, 1);
            assert.equal(listbox2.items().length, itemsLength);
        });

        it("transferFrom should trigger an add event for destination listbox which should be preventable", function() {
            let args = {};
            listbox1.bind(ADD, function(e) {
                args = e;
                e.preventDefault();
            });
            let item = listbox2.items().eq(0);
            let itemsLength = listbox2.items().length;
            listbox2.select(item);
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, 0);
            assert.equal(listbox2.items().length, itemsLength - 1);
        });

        it("transferFrom should not change selection if remove event for source listbox is prevented", function() {
            listbox2.bind(REMOVE, function(e) {
                e.preventDefault();
            });
            let item = listbox2.items().eq(0);
            listbox2.select(item);
            listbox2._onSelect();
            clickTransferFromButton(listbox1);

            assert.equal(listbox2.select().length, 1);
            assert.equal(listbox2.select()[0], item[0]);
        });

        it("transferFrom action should trigger a change event of source listbox", function() {
            let called = false;
            listbox2.select(listbox2.items().eq(0));
            listbox2._onSelect();
            listbox2.bind(CHANGE, function(e) {
                called = true;
            });

            clickTransferFromButton(listbox1);

            assert.equal(called, true);
        });
    });

    describe("ListBox events", function() {
        beforeEach(function() {
            $(document.body).append(Mocha.fixture);

            let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);
            let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);

            listbox1 = createListBoxWithToolbar({
                connectWith: "listbox2"
            }, element1);

            listbox2 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                }
            }, element2);
        });
        afterEach(function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(Mocha.fixture);
            $(document.body).find(Mocha.fixture).off().remove();
        });

        it("transferAllTo action should trigger remove event with args for source listbox", function() {
            listbox1.bind(REMOVE, function(e) {
                args = e;
            });
            let items = listbox1.items();
            let dataItems = listbox1.dataItems();

            clickTransferAllToButton(listbox1);

            equalDataArrays(args.dataItems, dataItems);
            equalListItemArrays(args.items, items);
        });

        it("transferAllTo action should trigger add event with args for destination listbox", function() {
            listbox2.bind(ADD, function(e) {
                args = e;
            });
            let items = listbox1.items();
            let dataItems = listbox1.dataItems();

            clickTransferAllToButton(listbox1);

            equalDataArrays(args.dataItems, dataItems);
            equalListItemArrays(args.items, items);
        });

        it("transferAllTo action should trigger a single add event for multiple items", function() {
            let calls = 0;
            listbox2.bind(ADD, function(e) {
                calls++;
            });

            clickTransferAllToButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferAllTo action should trigger a single remove event for multiple items", function() {
            let calls = 0;
            listbox1.bind(REMOVE, function(e) {
                calls++;
            });

            clickTransferAllToButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferAllTo action should trigger a remove event for source listbox which should be preventable", function() {
            let args = {};
            listbox1.bind(REMOVE, function(e) {
                args = e;
                e.preventDefault();
            });
            let items = listbox1.items();
            let dataItems = listbox1.dataItems();
            let itemsLength = items.length;

            clickTransferAllToButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, itemsLength);
            assert.equal(listbox2.items().length, itemsLength);
        });

        it("transferAllTo action should trigger an add event for destination listbox which should be preventable", function() {
            let args = {};
            listbox2.bind(ADD, function(e) {
                args = e;
                e.preventDefault();
            });
            let items = listbox1.items();
            let dataItems = listbox1.dataItems();

            clickTransferAllToButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, 0);
            assert.equal(listbox2.items().length, 0);
        });

        it("transferAllTo action should not trigger a change event", function() {
            let called = false;
            listbox1.bind(CHANGE, function(e) {
                called = true;
            });

            clickTransferAllToButton(listbox1);

            assert.equal(called, false);
        });
    });

    describe("ListBox toolbar", function() {
        beforeEach(function() {
            $(document.body).append(Mocha.fixture);

            let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);
            let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);

            listbox1 = createListBoxWithToolbar({
                dataSource: {
                    data: []
                },
                connectWith: "listbox2"
            }, element1);

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
            }, element2);
        });
        afterEach(function() {
            destroyListBox(listbox1);
            destroyListBox(listbox2);
            kendo.destroy(Mocha.fixture);
            $(document.body).find(Mocha.fixture).off().remove();
        });

        it("transferAllFrom action should trigger remove event with args for source listbox", function() {
            listbox2.bind(REMOVE, function(e) {
                args = e;
            });
            let items = listbox2.items();
            let dataItems = listbox2.dataItems();

            clickTransferAllFromButton(listbox1);

            equalDataArrays(args.dataItems, dataItems);
            equalListItemArrays(args.items, items);
        });

        it("transferAllFrom action should trigger add event with args for destination listbox", function() {
            listbox1.bind(ADD, function(e) {
                args = e;
            });
            let items = listbox2.items();
            let dataItems = listbox2.dataItems();

            clickTransferAllFromButton(listbox1);

            equalDataArrays(args.dataItems, dataItems);
            equalListItemArrays(args.items, items);
        });

        it("transferAllFrom action should trigger a single add event for multiple items", function() {
            let calls = 0;
            listbox1.bind(ADD, function(e) {
                calls++;
            });

            clickTransferAllFromButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferAllFrom action should trigger a single remove event for multiple items", function() {
            let calls = 0;
            listbox2.bind(REMOVE, function(e) {
                calls++;
            });

            clickTransferAllFromButton(listbox1);

            assert.equal(calls, 1);
        });

        it("transferAllFrom action should trigger a remove event for source listbox which should be preventable", function() {
            let args = {};
            listbox2.bind(REMOVE, function(e) {
                args = e;
                e.preventDefault();
            });
            let itemsLength = listbox2.items().length;

            clickTransferAllFromButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, itemsLength);
            assert.equal(listbox2.items().length, itemsLength);
        });

        it("transferAllFrom action should trigger an add event for destination listbox which should be preventable", function() {
            let args = {};
            listbox1.bind(ADD, function(e) {
                args = e;
                e.preventDefault();
            });

            clickTransferAllFromButton(listbox1);

            assert.equal(args.isDefaultPrevented(), true);
            assert.equal(listbox1.items().length, 0);
            assert.equal(listbox2.items().length, 0);
        });

        it("transferAllFrom action should not trigger a change event", function() {
            let called = false;
            listbox2.bind(CHANGE, function(e) {
                called = true;
            });

            clickTransferAllFromButton(listbox1);

            assert.equal(called, false);
        });
    });

    describe("ListBox events", function() {
        afterEach(function() {
            destroyListBox(listbox);
            kendo.destroy(Mocha.fixture);
        });

        it("initializing a listbox with data source should trigger dataBound event", function() {
            let called = false;

            listbox = createListBoxWithToolbar({
                dataBound: function() {
                    called = true;
                }
            });

            assert.equal(called, true);
        });

        it("refresh should trigger dataBound event", function() {
            let called = false;
            listbox = createListBox();
            listbox.bind("dataBound", function() {
                called = true;
            });

            listbox.refresh();

            assert.equal(called, true);
        });
    });
