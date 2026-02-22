import '@progress/kendo-ui/src/kendo.listbox.js';
import { press, move, release } from '../../helpers/unit/general-utils.js';

let ListBox = kendo.ui.ListBox,
    listA,
    listB,
    listC,
    listD;

describe("ListBox - drag and drop", function() {
    beforeEach(function() {
        $(document.body).append(Mocha.fixture);

        let elementA = $('<select id="listA"></select>').appendTo(Mocha.fixture);
        let elementB = $('<select id="listB"></select>').appendTo(Mocha.fixture);
        let elementC = $('<select id="listC"></select>').appendTo(Mocha.fixture);
        let elementD = $('<select id="listD"></select>').appendTo(Mocha.fixture);

        listA = elementA.kendoListBox({
            dataSource: [{ name: "Tim", id: 4 }, { name: "Johnny", id: 5 }, { name: "Dicky", id: 6 }],
            dataTextField: "name",
            selectable: true,
            draggable: true,
            dropSources: ["listB"]
        }).getKendoListBox();


        listB = elementB.kendoListBox({
            dataSource: [{ name: "Tom", id: 1 }, { name: "Jerry", id: 2 }, { name: "Donald", id: 3 }],
            dataTextField: "name",
            selectable: true,
            dropSources: ["listA"],
            draggable: true
        }).getKendoListBox();

        listC = elementC.kendoListBox({
            dataSource: [{ name: "Tony", id: 7 }, { name: "Jack", id: 8 }, { name: "Dino", id: 9 }],
            dataTextField: "name",
            selectable: true,
            draggable: true
        }).getKendoListBox();

        listD = elementD.kendoListBox({
            dataTextField: "name",
            dataSource: [],
            dropSources: ["listA"]
        }).getKendoListBox();
    });
    afterEach(function() {
        if (listA) {
            listA.destroy();
        }
        if (listB) {
            listB.destroy();
        }
        if (listC) {
            listC.destroy();
        }
        if (listD) {
            listD.destroy();
        }
        kendo.destroy(Mocha.fixture);
    });

    it("Draggable is not enabled by default", function() {
        assert.isOk(kendo.ui.ListBox.prototype.options.draggable === null);
    });

    if (!kendo.support.browser.mozilla) {
        it("Placeholder moves across connected listboxes", function() {
            let draggedElement = listB.items().first();
            let draggableOffset = kendo.getOffset(draggedElement);
            let targetElement = listA.items().first();
            let targetOffset = kendo.getOffset(targetElement);

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 2);

            assert.isOk(listA._getList().children().length === 4, "Placeholder is moved to the ListA");
        });
    }

    if (!kendo.support.browser.mozilla) {
        it("Item can be dragged from one listbox to another", function() {
            let draggedElement = listB.items().first();
            let draggableOffset = kendo.getOffset(draggedElement);
            let targetElement = listA.items().first();
            let targetOffset = kendo.getOffset(targetElement);

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 2);
            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.isOk(listB.items().length == 2, "Item is removed from ListB");
            assert.isOk(listA.items().length == 4, "Item is added to ListA");
            assert.isOk(listA.items().first().find("span").html() === "Tom");
        });
    }

    if (!kendo.support.browser.mozilla) {
        it("Item is correctly reordered in listbox using drag", function() {
            let draggedElement = listB.items().last();
            let draggableOffset = kendo.getOffset(draggedElement);
            let targetElement = listB.items().first(),
                targetOffset = kendo.getOffset(targetElement);
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 2); // The +2 is added just before an official release, I have no idea where the additional offset is coming from, can't look for it now.
            release(draggedElement, targetOffset.left, targetOffset.top + 2);
            //this should not depend on default line height, since moving up to exact location
            assert.isOk(listB.items().filter(":eq(0)").find("span").html() === "Donald");
        });
    }

    it("Item is not dropped if dropSources is not set", function() {
        let draggedElement = listA.items().first();
        let draggableOffset = kendo.getOffset(draggedElement);
        let targetElement = listC.items().last(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listC.dataSource.view().length === 3);
    });

    it("Item is not dropped if dropSources is empty", function() {
        let draggedElement = listA.items().first();
        let draggableOffset = kendo.getOffset(draggedElement);
        let targetElement = listD._getList();
        targetElement.height(30);
        let targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        assert.isOk(listD.dataSource.view().length === 1);
    });

    it("Drag and drop classes are set and removed correctly", function() {
        let draggedElement = listA.items().first();
        let draggableOffset = kendo.getOffset(draggedElement);
        let targetElement = listD._getList();
        let targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 100);
        assert.isOk($("body").find(".k-drag-clue").length === 1);
        release(draggedElement, targetOffset.left, targetOffset.top + 100);
        assert.isOk(listA.items().find(".k-ghost").length === 0);
    });

    it("Drag and drop hint should not have .k-focus class when dragged element is focused", function() {
        let mockedElement = $('<li class="k-list-item k-focus k-selected"/>');
        let hint = listA._draggable.options.hint(mockedElement);

        assert.isOk(!hint.hasClass("k-focus"));
    });
});
