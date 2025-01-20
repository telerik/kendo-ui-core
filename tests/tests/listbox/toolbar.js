import {
    destroyListBox,
    getToolElement,
    createListBox,
    createListBoxWithToolbar,
    clickRemoveButton,
    clickTransferToButton,
    clickTransferFromButton,
    clickMoveUpButton,
    clickMoveDownButton,
    clickTransferAllFromButton,
    clickTransferAllToButton,
    equalListItems,
    equalDataArrays,
    equalListItemArrays
} from "../../helpers/listbox-utils.js";

import { stub, spy } from "../../helpers/stub.js";

let listbox, listbox1, listbox2, listbox3;
let item;
let item1;
let item2;
let item3;
let item4;
let item5;
let lastItem;
let args;

let DOT = ".";
let DISABLED_STATE_CLASS = "k-disabled";
let REMOVE = "remove";
let TRANSFER = "transfer";
let ADD = "add";
let MOVE_UP = "moveUp";
let MOVE_DOWN = "moveDown";
let TRANSFER_TO = "transferTo";
let TRANSFER_FROM = "transferFrom";
let TRANSFER_ALL_TO = "transferAllTo";
let TRANSFER_ALL_FROM = "transferAllFrom";

function getId(item) {
    return item.data("uid");
}

function toolIsDisabled(listbox, tool) {
    return getToolElement(listbox, tool).hasClass(DISABLED_STATE_CLASS);
}

function toolIsEnabled(listbox, tool) {
    return !toolIsDisabled(listbox, tool);
}

function triggerDragEnd(listbox) {
    listbox.draggedElement = $();
    listbox.placeholder = $();
    listbox._draggable = { destroy: $.noop };
    listbox._dragend({ preventDefault: $.noop });
}

describe("ListBox toolbar", function() {
    beforeEach(function() {
        listbox = createListBoxWithToolbar();
        $(document.body).append(Mocha.fixture);
    });
    afterEach(function() {
        destroyListBox(listbox);
        kendo.destroy(Mocha.fixture);
    });

    it("tools should have title attribute", function() {
        let toolsButtons = listbox.toolbar.element.find("button.k-button");
        let titleAttr = "title";

        assert.equal(toolsButtons.filter('[data-command="remove"]').attr(titleAttr), "Delete");
        assert.equal(toolsButtons.filter('[data-command="moveUp"]').attr(titleAttr), "Move Up");
        assert.equal(toolsButtons.filter('[data-command="moveDown"]').attr(titleAttr), "Move Down");
        assert.equal(toolsButtons.filter('[data-command="transferTo"]').attr(titleAttr), "Transfer To");
        assert.equal(toolsButtons.filter('[data-command="transferFrom"]').attr(titleAttr), "Transfer From");
        assert.equal(toolsButtons.filter('[data-command="transferAllTo"]').attr(titleAttr), "Transfer All To");
        assert.equal(toolsButtons.filter('[data-command="transferAllFrom"]').attr(titleAttr), "Transfer All From");
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        listbox = createListBoxWithToolbar();
        $(document.body).append(Mocha.fixture);
    });
    afterEach(function() {
        destroyListBox(listbox);
        kendo.destroy(Mocha.fixture);
    });

    it("remove action should not work without selection", function() {
        let itemsLength = listbox.items().length;

        clickRemoveButton(listbox);

        assert.equal(listbox.items().length, itemsLength);
    });

    it("remove action should call listbox.remove()", function() {
        let item = listbox.items().eq(0);
        let removeStub = stub(listbox, REMOVE);
        listbox.select(item);
        listbox._onSelect();

        clickRemoveButton(listbox);

        assert.equal(removeStub.args(REMOVE).length, 1);
        assert.equal(removeStub.args(REMOVE)[0][0], item[0]);
    });

    it("remove action should clear the selection", function() {
        let item = listbox.items().eq(0);
        listbox.select(item);
        listbox._onSelect();

        clickRemoveButton(listbox);

        assert.equal(listbox.select().length, 0);
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        listbox = createListBoxWithToolbar();
        item1 = listbox.items().eq(0);
        item2 = listbox.items().eq(1);
        item3 = listbox.items().eq(2);
        item4 = listbox.items().eq(3);
    });
    afterEach(function() {
        destroyListBox(listbox);
        kendo.destroy(Mocha.fixture);
    });

    it("moveup action should not move the html element of the first list item", function() {
        listbox.select(item);
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.items()[0], item1[0]);
    });

    it("moveup action should not move the data item of the first list item in the dataSource", function() {
        listbox.select(item);
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
    });

    it("moveup action should move the html element of a list item", function() {
        listbox.select(item2);
        listbox._onSelect();
        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    it("moveup action should not move the data item of a list item in the dataSource", function() {
        listbox.select(item2);
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
    });

    it("moveup action should reorder the html elements of multiple list items", function() {
        listbox.select(item3.add(item2));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item3);
        equalListItems(listbox.items().eq(2), item1);
        equalListItems(listbox.items().eq(3), item4);
    });

    it("moveup action should not reorder the data items of multiple list items in the dataSource", function() {
        listbox.select(item2.add(item3));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("moveup action should reorder the html elements of non-adjacent list items", function() {
        listbox.select(item2.add(item4));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
        equalListItems(listbox.items().eq(2), item4);
        equalListItems(listbox.items().eq(3), item3);
    });

    it("moveup action should not reorder the data items of non-adjacent list items in the dataSource", function() {
        listbox.select(item4.add(item2));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("moveup action should not reorder the html elements of multiple list items at the top", function() {
        listbox.select(item1.add(item2));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    it("moveup action should not reorder the data items of multiple list items at the top in the dataSource", function() {
        listbox.select(item1.add(item2));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("moveup action should not partially reorder the html elements of multiple list items at the top", function() {
        listbox.select(item1.add(item3));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    it("moveup action should not partially reorder the data items of multiple list items at the top in the dataSource", function() {
        listbox.select(item3.add(item1));
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        let element = $('<select id="list"></select>').appendTo(Mocha.fixture);
        listbox = createListBoxWithToolbar({}, element);
        item1 = listbox.items().eq(0);
        item2 = listbox.items().eq(1);
        item3 = listbox.items().eq(2);
        item4 = listbox.items().eq(3);
        $(document.body).append(Mocha.fixture);
    });
    afterEach(function() {
        listbox.destroy();
        item1 = item2 = item3 = item4 = null;
        kendo.destroy(Mocha.fixture);
    });

    it("movedown action should not move the html element of the last list item", function() {
        listbox.select(item4);
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.items()[3], item4[0]);
    });

    it("movedown action should not move the data item of the last list item in the dataSource", function() {
        listbox.select(item4);
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("movedown action should move the html element of a list item", function() {
        listbox.select(item1);
        listbox._onSelect();
        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
    });

    it("movedown action should not move the data item of a list item in the dataSource", function() {
        listbox.select(item1);
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
    });

    it("movedown action should reorder the html elements of multiple list items", function() {
        listbox.select(item2.add(item3));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item4);
        equalListItems(listbox.items().eq(2), item2);
        equalListItems(listbox.items().eq(3), item3);
    });

    it("movedown action should not reorder the data items of multiple list items in the dataSource", function() {
        listbox.select(item2.add(item3));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("movedown action should reorder the html elements of non-adjacent list items", function() {
        listbox.select(item1.add(item3));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item2);
        equalListItems(listbox.items().eq(1), item1);
        equalListItems(listbox.items().eq(2), item4);
        equalListItems(listbox.items().eq(3), item3);
    });

    it("movedown action should not reorder the data items of non-adjacent list items in the dataSource", function() {
        listbox.select(item1.add(item3));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("movedown action should not reorder the html elements of multiple list items at the bottom", function() {
        listbox.select(item2.add(item4));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    it("movedown action should not reorder the data items of multiple list items at the bottom in the dataSource", function() {
        listbox.select(item3.add(item4));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });

    it("movedown action should not partially reorder the html elements of multiple list items at the bottom", function() {
        listbox.select(item2.add(item4));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        equalListItems(listbox.items().eq(0), item1);
        equalListItems(listbox.items().eq(1), item2);
        equalListItems(listbox.items().eq(2), item3);
        equalListItems(listbox.items().eq(3), item4);
    });

    it("movedown action should not partially reorder the data items of multiple list items at the bottom in the dataSource", function() {
        listbox.select(item2.add(item4));
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(listbox.dataSource.at(0).uid, getId(item1));
        assert.equal(listbox.dataSource.at(1).uid, getId(item2));
        assert.equal(listbox.dataSource.at(2).uid, getId(item3));
        assert.equal(listbox.dataSource.at(3).uid, getId(item4));
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: [{
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
                }, {
                    id: 5,
                    text: "item5"
                }]
            },
            connectWith: "listbox2"
        }, "<select id='listbox1' />");

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: []
            }
        }, "<select id='listbox2' />");

        item1 = listbox1.items().eq(0);
        item2 = listbox1.items().eq(1);
        item3 = listbox1.items().eq(2);
        item4 = listbox1.items().eq(3);
        item5 = listbox1.items().eq(4);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferTo action should not work without selection", function() {
        let itemsLength = listbox1.items().length;

        clickTransferToButton(listbox1);

        assert.equal(listbox1.items().length, itemsLength);
        assert.equal(listbox2.items().length, 0);
    });

    it("transferTo action should call add() for destination listbox", function() {
        let item = listbox1.items().eq(0);
        let dataItem = listbox1.dataItem(item);
        let addStub = stub(listbox2, ADD);
        listbox1.select(item);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(addStub.args(ADD).length, 1);
        assert.deepEqual(addStub.args(ADD)[0], [dataItem]);
    });

    it("transferTo action should call remove() for source listbox", function() {
        let item = listbox1.items().eq(0);
        let removeStub = stub(listbox1, REMOVE);
        listbox1.select(item);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(removeStub.args(REMOVE).length, 1);
        equalDataArrays(removeStub.args(REMOVE)[0], $(item));
    });

    it("transferTo action should select the next item", function() {
        listbox1.select(item1);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 1);
        equalListItems(listbox1.select(), item2);
    });

    it("transferTo action should skip disabled items for selection", function() {
        listbox1.enable(item2, false);
        listbox1.select(item1);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 1);
        assert.equal(listbox1.select()[0], item3[0]);
    });

    it("transferTo action should select the previous item when transferring the last item", function() {
        let lastItem = listbox1.items().last();
        let previousToLastItem = lastItem.prev();
        listbox1.select(lastItem);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 1);
        assert.equal(listbox1.select()[0], previousToLastItem[0]);
    });

    it("transferTo action should select the previous enabled item when transferring the last enabled item", function() {
        listbox1.enable(item2, false);
        listbox1.enable(item4, false);
        listbox1.enable(item5, false);
        listbox1.select(item3);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 1);
        assert.equal(listbox1.select()[0], item1[0]);
    });

    it("transferTo action should skip disabled items when transferring the last item", function() {
        let dataItem = listbox1.dataItem(item1);
        let lastItem = listbox1.items().last();
        let previousToLastItem = lastItem.prev();
        listbox1.enable(previousToLastItem, false);
        listbox1.select(lastItem);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 1);
        assert.equal(listbox1.select()[0], item3[0]);
    });

    it("transferTo action should clear the selection with multiple items", function() {
        listbox1.select(item1.add(item2));
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(listbox1.select().length, 0);
    });

    it("transferTo action should scroll to the selected item", function() {
        let scrollSpy = spy(listbox1, "_scrollIntoView");
        listbox1.select(item1);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(scrollSpy.calls("_scrollIntoView"), 1);
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: []
            },
            connectWith: "listbox2"
        }, "<select id='listbox1' />");

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: [{
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
                }, {
                    id: 5,
                    text: "item5"
                }]
            }
        }, "<select id='listbox2' />");

        item1 = listbox2.items().eq(0);
        item2 = listbox2.items().eq(1);
        item3 = listbox2.items().eq(2);
        item4 = listbox2.items().eq(3);
        item5 = listbox2.items().eq(4);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferFrom action should not work without selection", function() {
        let itemsLength1 = listbox1.items().length;
        let itemsLength2 = listbox2.items().length;

        clickTransferFromButton(listbox1);

        assert.equal(listbox1.items().length, itemsLength1);
        assert.equal(listbox2.items().length, itemsLength2);
    });

    it("transferFrom action should call add() for destination listbox", function() {
        let item = listbox2.items().eq(0);
        let dataItem = listbox2.dataItem(item);
        let addStub = stub(listbox1, ADD);
        listbox2.select(item);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(addStub.args(ADD).length, 1);
        assert.deepEqual(addStub.args(ADD)[0], [dataItem]);
    });

    it("transferFrom action should call remove() for source listbox", function() {
        let removeStub = stub(listbox2, REMOVE);
        listbox2.select(item1);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(removeStub.args(REMOVE).length, 1);
        equalDataArrays(removeStub.args(REMOVE)[0], $(item1));
    });

    it("transferFrom action should select the next enabled item", function() {
        listbox2.select(item1);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 1);
        assert.equal(listbox2.select()[0], item2[0]);
    });

    it("transferFrom action should skip disabled items for selection", function() {
        listbox2.enable(item2, false);
        listbox2.select(item1);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 1);
        assert.equal(listbox2.select()[0], item3[0]);
    });

    it("transferFrom action should select the previous item when transferring the last item", function() {
        let lastItem = listbox2.items().last();
        let previousToLastItem = lastItem.prev();
        listbox2.select(lastItem);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 1);
        assert.equal(listbox2.select()[0], previousToLastItem[0]);
    });

    it("transferFrom action should select the previous enabled item when transferring the last enabled item", function() {
        listbox2.enable(item2, false);
        listbox2.enable(item4, false);
        listbox2.enable(item5, false);
        listbox2.select(item3);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 1);
        assert.equal(listbox2.select()[0], item1[0]);
    });

    it("transferFrom action should skip disabled items when transferring the last item", function() {
        let lastItem = listbox2.items().last();
        let previousToLastItem = lastItem.prev();
        listbox2.enable(previousToLastItem, false);
        listbox2.select(lastItem);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 1);
        assert.equal(listbox2.select()[0], item3[0]);
    });

    it("transferFrom action should clear the selection with multiple items", function() {
        listbox2.select(item1.add(item2));
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(listbox2.select().length, 0);
    });

    it("transferFrom action should scroll to the selected item", function() {
        let scrollSpy = spy(listbox2, "_scrollIntoView");
        listbox2.select(item1);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(scrollSpy.calls("_scrollIntoView"), 1);
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
        }, "<select id='listbox1' />");

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: []
            }
        }, "<select id='listbox2' />");

        item1 = listbox1.items().eq(0);
        item2 = listbox1.items().eq(1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllTo action should work without selection", function() {
        let itemsLength = listbox1.items().length;

        clickTransferAllToButton(listbox1);

        assert.equal(listbox1.items().length, 0);
        assert.equal(listbox2.items().length, itemsLength);
    });

    it("transferAllTo action should call add() for destination listbox", function() {
        let dataItems = listbox1.dataItems();
        let addStub = stub(listbox2, ADD);

        clickTransferAllToButton(listbox1);

        assert.equal(addStub.args(ADD).length, 1);
        equalDataArrays(addStub.args(ADD)[0], dataItems);
    });

    it("transferAllTo action should call remove() for source listbox", function() {
        let items = listbox1.items();
        let dataItems = listbox1.dataItems();
        let removeStub = stub(listbox1, REMOVE);

        clickTransferAllToButton(listbox1);

        assert.equal(removeStub.args(REMOVE).length, 1);
        equalListItemArrays(removeStub.args(REMOVE)[0], items);
    });

    it("transferAllTo action should skip disabled items", function() {
        listbox1.enable(item2, false);

        clickTransferAllToButton(listbox1);

        assert.equal(listbox1.items().length, 1);
        equalListItems(listbox1.items()[0], item2);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        let element3 = $('<select id="listbox3"></select>').appendTo(Mocha.fixture);
        let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);
        let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);

        listbox3 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 7,
                    text: "item7"
                }, {
                    id: 8,
                    text: "item8"
                }]
            },
            connectWith: "listbox2"
        }, element3);

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: []
            },
            connectWith: "listbox1"
        }, element2);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 1,
                    text: "item1"
                }, {
                    id: 2,
                    text: "item2"
                }]
            }
        }, element1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        destroyListBox(listbox3);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllTo tool should be enabled in connected listbox after transfer", function() {
        clickTransferAllToButton(listbox3);

        assert.equal(getToolElement(listbox2, TRANSFER_ALL_TO).hasClass(DISABLED_STATE_CLASS), false);
    });
});

describe("ListBox toolbar", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: []
            },
            connectWith: "listbox2"
        }, "<select id='listbox1' />");

        listbox2 = createListBox({
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

        item1 = listbox2.items().eq(0);
        item2 = listbox2.items().eq(1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
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

    it("transferAllFrom should trigger a remove event for source listbox which should be preventable", function() {
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

    it("transferAllFrom should trigger an add event for destination listbox which should be preventable", function() {
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

    it("transferAllFrom action should skip disabled items", function() {
        listbox2.enable(item2, false);

        clickTransferAllFromButton(listbox1);

        assert.equal(listbox2.items().length, 1);
        equalListItems(listbox2.items()[0], item2);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox = createListBoxWithToolbar();

        item1 = listbox.items().eq(0);
        item2 = listbox.items().eq(1);
        item3 = listbox.items().eq(2);
        lastItem = listbox.items().last();
    });
    afterEach(function() {
        destroyListBox(listbox);
        kendo.destroy(Mocha.fixture);
    });

    it("remove tool should be disabled when no item is selected", function() {
        let tool = getToolElement(listbox, REMOVE);

        listbox.clearSelection();
        listbox._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("remove tool should be enabled when an item is selected", function() {
        let tool = getToolElement(listbox, REMOVE);

        listbox.select(item1);
        listbox._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("remove tool should be disabled after executing remove", function() {
        let tool = getToolElement(listbox, REMOVE);
        listbox.select(item1);
        listbox._onSelect();

        clickRemoveButton(listbox);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("moveup tool should be disabled when first item is selected", function() {
        let tool = getToolElement(listbox, MOVE_UP);

        listbox.select(item1);
        listbox._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("moveup tool should be enabled when the first item is not selected", function() {
        let tool = getToolElement(listbox, MOVE_UP);

        listbox.select(item2);
        listbox._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("moveup tool should be disabled after executing moveup on the second item", function() {
        let tool = getToolElement(listbox, MOVE_UP);
        listbox.select(item2);
        listbox._onSelect();
        clickMoveUpButton(listbox);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("movedown tool should be disabled when last item is selected", function() {
        let tool = getToolElement(listbox, MOVE_DOWN);

        listbox.select(lastItem);
        listbox._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("movedown tool should be enabled when the last item is not selected", function() {
        let tool = getToolElement(listbox, MOVE_DOWN);

        listbox.select(item2);
        listbox._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("movedown tool should be disabled after executing movedown before the last item", function() {
        let tool = getToolElement(listbox, MOVE_DOWN);
        listbox.select(item3);
        listbox._onSelect();
        clickMoveDownButton(listbox);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
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

        item1 = listbox1.items().eq(0);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferTo tool should be disabled when no item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_TO);

        listbox1.clearSelection();
        listbox1._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferTo tool should be enabled when item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_TO);

        listbox1.select(item1);
        listbox1._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferTo tool should be enabled after executing transferTo", function() {
        let tool = getToolElement(listbox1, TRANSFER_TO);
        listbox1.select(item1);
        listbox1._onSelect();
        clickTransferToButton(listbox1);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

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

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
        }, "<select id='listbox1' />");

        item1 = listbox2.items().eq(0);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferFrom tool should be disabled when no item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_FROM);

        listbox2.clearSelection();
        listbox2._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferFrom tool should be enabled when item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_FROM);

        listbox2.select(item1);
        listbox2._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferFrom tool should be enabled after executing transferFrom", function() {
        let tool = getToolElement(listbox1, TRANSFER_FROM);
        listbox2.select(item1);
        listbox2._onSelect();
        clickTransferFromButton(listbox1);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferFrom tool should be disabled after deleting all items", function() {
        let tool = getToolElement(listbox1, TRANSFER_FROM);
        listbox2.select(listbox2.items());
        listbox2._onSelect();
        clickRemoveButton(listbox2);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);
        let element3 = $('<select id="listbox3"></select>').appendTo(Mocha.fixture);
        let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);
        let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);
        listbox3 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 7,
                    text: "item7"
                }, {
                    id: 8,
                    text: "item8"
                }]
            },
            connectWith: "listbox1"
        }, element3);

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

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
        }, element1);

        item1 = listbox1.items().eq(0);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        destroyListBox(listbox3);
        kendo.destroy(Mocha.fixture);
    });

    it("transferFrom tool should be disabled when item of connected listbox is not selected", function() {
        let tool = getToolElement(listbox3, TRANSFER_FROM);

        listbox1.clearSelection();
        listbox1._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferFrom tool should be enabled when item of connected listbox is selected", function() {
        let tool = getToolElement(listbox3, TRANSFER_FROM);

        listbox1.select(item1);
        listbox1._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        let element3 = $('<select id="listbox3"></select>').appendTo(Mocha.fixture);
        let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);
        let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);

        listbox3 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 7,
                    text: "item7"
                }, {
                    id: 8,
                    text: "item8"
                }]
            },
            connectWith: "listbox1"
        }, element3);

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 5,
                    text: "item5"
                }, {
                    id: 6,
                    text: "item6"
                }]
            },
            connectWith: "listbox1"
        }, element2);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 1,
                    text: "item1"
                }, {
                    id: 2,
                    text: "item2"
                }]
            }
        }, element1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        destroyListBox(listbox3);
        kendo.destroy(Mocha.fixture);
    });

    it("transferFrom tool should be disabled in multiple listboxes when no item is selected", function() {
        listbox1.clearSelection();
        listbox1._onSelect();

        assert.equal(getToolElement(listbox2, TRANSFER_FROM).hasClass(DISABLED_STATE_CLASS), true);
        assert.equal(getToolElement(listbox3, TRANSFER_FROM).hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferFrom tool should be enabled in multiple listboxes when item is selected", function() {
        listbox1.select(listbox1.items().eq(0));
        listbox1._onSelect();

        assert.equal(getToolElement(listbox2, TRANSFER_FROM).hasClass(DISABLED_STATE_CLASS), false);
        assert.equal(getToolElement(listbox3, TRANSFER_FROM).hasClass(DISABLED_STATE_CLASS), false);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
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

        item1 = listbox1.items().eq(0);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllTo tool should be enabled when no item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_TO);

        listbox1.clearSelection();
        listbox1._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllTo tool should be enabled when item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_TO);

        listbox1.select(item1);
        listbox1._onSelect();

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllTo tool should be disabled after executing transferAllTo", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_TO);

        clickTransferAllToButton(listbox1);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferAllTo tool should be disabled when only disabled items are available", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_TO);

        listbox1.enable(listbox1.items(), false);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2"
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

        item1 = listbox1.items().eq(0);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllFrom tool should be enabled when no item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_FROM);

        listbox2.clearSelection();
        listbox2._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllFrom tool should be enabled when item is selected", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_FROM);

        listbox2.select(item1);
        listbox2._onSelect();
        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllFrom tool should be disabled after executing transferAllFrom", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_FROM);

        clickTransferAllFromButton(listbox1);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });

    it("transferAllFrom tool should be disabled when only disabled items are available", function() {
        let tool = getToolElement(listbox1, TRANSFER_ALL_FROM);

        listbox2.enable(listbox2.items(), false);

        assert.equal(tool.hasClass(DISABLED_STATE_CLASS), true);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        let element3 = $('<select id="listbox3"></select>').appendTo(Mocha.fixture);
        let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);
        let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);

        listbox3 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 7,
                    text: "item7"
                }, {
                    id: 8,
                    text: "item8"
                }]
            },
            connectWith: "listbox1"
        }, element3);

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 5,
                    text: "item5"
                }, {
                    id: 6,
                    text: "item6"
                }]
            },
            connectWith: "listbox1"
        }, element2);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 1,
                    text: "item1"
                }, {
                    id: 2,
                    text: "item2"
                }]
            }
        }, element1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        destroyListBox(listbox3);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllFrom tool should be disabled in multiple listboxes when no item is selected", function() {
        listbox1.clearSelection();
        listbox1._onSelect();
        assert.equal(getToolElement(listbox2, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), false);
        assert.equal(getToolElement(listbox3, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllFrom tool should be enabled in multiple listboxes when item is selected", function() {
        listbox1.select(listbox1.items().eq(0));
        listbox1._onSelect();
        assert.equal(getToolElement(listbox2, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), false);
        assert.equal(getToolElement(listbox3, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), false);
    });

    it("transferAllFrom tool should be disabled after executing transferAllFrom", function() {
        clickTransferAllFromButton(listbox2);

        assert.equal(getToolElement(listbox2, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), true);
        assert.equal(getToolElement(listbox3, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), true);
    });
});

describe("ListBox toolbar tools", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        let element3 = $('<select id="listbox3"></select>').appendTo(Mocha.fixture);
        let element2 = $('<select id="listbox2"></select>').appendTo(Mocha.fixture);
        let element1 = $('<select id="listbox1"></select>').appendTo(Mocha.fixture);

        listbox3 = createListBoxWithToolbar({
            dataSource: {
                data: []
            },
            connectWith: "listbox2"
        }, element3);

        listbox2 = createListBoxWithToolbar({
            dataSource: {
                data: []
            }
        }, element2);

        listbox1 = createListBoxWithToolbar({
            dataSource: {
                data: [{
                    id: 1,
                    text: "item1"
                }, {
                    id: 2,
                    text: "item2"
                }]
            },
            connectWith: "listbox2"
        }, element1);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        destroyListBox(listbox3);
        kendo.destroy(Mocha.fixture);
    });

    it("transferAllFrom tool should be enabled in connected listbox after transfer", function() {
        clickTransferAllToButton(listbox1);

        assert.equal(getToolElement(listbox3, TRANSFER_ALL_FROM).hasClass(DISABLED_STATE_CLASS), false);
    });
});

describe("ListBox toolbar tool state after drag and drop", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2",
        }, "<select id='listbox1' />");

        listbox2 = createListBox({
            dataSource: {
                data: [{
                    id: 5,
                    text: "item5"
                }, {
                    id: 6,
                    text: "item6"
                }]
            },
            connectWith: "listbox1"
        }, "<select id='listbox2' />");

        item1 = listbox1.items().eq(0);
        item2 = listbox1.items().eq(1);
        $(document.body).append(Mocha.fixture);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("moveUp tool should be enabled after dragEnd with selection", function() {
        stub(listbox1, {
            select: function() {
                return item2;
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsEnabled(listbox1, MOVE_UP));
    });

    it("moveUp tool should be disabled after dragEnd without selection", function() {
        stub(listbox1, {
            select: function() {
                return $();
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsDisabled(listbox1, MOVE_UP));
    });

    it("moveDown tool should be enabled after dragEnd with selection", function() {
        stub(listbox1, {
            select: function() {
                return item2;
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsEnabled(listbox1, MOVE_DOWN));
    });

    it("moveDown tool should be disabled after dragEnd without selection", function() {
        stub(listbox1, {
            select: function() {
                return $();
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsDisabled(listbox1, MOVE_DOWN));
    });

    it("remove tool should be enabled after dragEnd with selection", function() {
        stub(listbox1, {
            select: function() {
                return item2;
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsEnabled(listbox1, REMOVE));
    });

    it("remove tool should be disabled after dragEnd without selection", function() {
        stub(listbox1, {
            select: function() {
                return $();
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsDisabled(listbox1, REMOVE));
    });
});

describe("ListBox toolbar tool state after drag and drop", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        listbox1 = createListBoxWithToolbar({
            connectWith: "listbox2",
        }, "<select id='listbox1' />");

        listbox2 = createListBox({
            dataSource: {
                data: [{
                    id: 5,
                    text: "item5"
                }, {
                    id: 6,
                    text: "item6"
                }]
            },
            connectWith: "listbox1"
        }, "<select id='listbox2' />");

        item1 = listbox2.items().eq(0);
        item2 = listbox2.items().eq(1);
        $(document.body).append(Mocha.fixture);
    });
    afterEach(function() {
        destroyListBox(listbox1);
        destroyListBox(listbox2);
        kendo.destroy(Mocha.fixture);
    });

    it("transferFrom tool should be enabled after dragEnd with selection", function() {
        stub(listbox2, {
            select: function() {
                return item1;
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsEnabled(listbox1, TRANSFER_FROM));
    });

    it("transferFrom tool should be disabled after dragEnd without selection", function() {
        stub(listbox2, {
            select: function() {
                return $();
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsDisabled(listbox1, TRANSFER_FROM));
    });

    it("transferTo tool should be enabled after dragEnd with selection", function() {
        stub(listbox1, {
            select: function() {
                return item1;
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsEnabled(listbox1, TRANSFER_TO));
    });


    it("transferTo tool should be disabled after dragEnd without selection", function() {
        stub(listbox1, {
            select: function() {
                return $();
            }
        });

        triggerDragEnd(listbox2);

        assert.isOk(toolIsDisabled(listbox1, TRANSFER_TO));
    });

});
