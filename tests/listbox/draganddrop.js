(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        listB,
        listC,
        listD;

    module("ListBox - dragdrop", {
        setup: function() {
            $(document.body).append(QUnit.fixture);

            var elementA = $('<select id="listA"></select>').appendTo(QUnit.fixture);
            var elementB = $('<select id="listB"></select>').appendTo(QUnit.fixture);
            var elementC = $('<select id="listC"></select>').appendTo(QUnit.fixture);
            var elementD = $('<select id="listD"></select>').appendTo(QUnit.fixture);
            
            listA  = elementA.kendoListBox({
                    dataSource: [ {name: "Tim", id:4 }, {name: "Johny", id:5 }, {name: "Dicky", id:6 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true,
                    dropSources: ["listB"]
            }).getKendoListBox();


            listB = elementB.kendoListBox({
                    dataSource: [ {name: "Tom", id:1 }, {name: "Jerry", id:2 }, {name: "Donald", id:3 }],
                    dataTextField: "name",
                    selectable: true,
                    dropSources: ["listA"],
                    draggable:true
            }).getKendoListBox();

            listC = elementC.kendoListBox({
                    dataSource: [ {name: "Tonny", id:7 }, {name: "Jack", id:8 }, {name: "Dino", id:9 }],
                    dataTextField: "name",
                    selectable: true,
                    draggable:true
            }).getKendoListBox();

            listD = elementD.kendoListBox({
                    dataTextField: "name",
                    dataSource: [],
                    dropSources: ["listA"]
            }).getKendoListBox();
        },
        teardown: function() {
            if(listA) {
              listA.destroy();
            }
            if(listB) {
              listB.destroy();
            }
            if(listC) {
              listC.destroy();
            }
            if(listD) {
              listD.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Draggable is not enabled by default", 1, function() {
        ok(kendo.ui.ListBox.prototype.options.draggable === null);
    });

    test("Placeholder moves across connected listboxes", 1, function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        ok(listA._getList().children().length === 4, "Placeholder is moved to the ListA");
    });

    test("Item can be dragged from one listbox to another", 2, function() {
        var draggedElement = listB.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listA.items().first(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listB.items().length == 2, "Item is removed from ListB");
        ok(listA.items().length == 4, "Item is added to ListA");
    });

    test("Item is correctly reordered in listbox using drag", 1, function () {
        var draggedElement = listB.items().last();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listB.items().first(),
            targetOffset = kendo.getOffset(targetElement);
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);
        //this should not depend on default line hight, since moving up to exact location
        ok(listB.items().filter(":eq(0)").html() === "Donald");
    });

    test("Item is not dropped if dropSources is not set", 1, function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listC.items().last(),
            targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listC.dataSource.view().length === 3);
    });

    test("Item is not dropped if dropSources is empty", 1, function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listD._getList();
        targetElement.height(30);
        var targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        ok(listD.dataSource.view().length === 1);
    });

    test("Drag and drop classes are set and removed correctly", 2, function() {
        var draggedElement = listA.items().first();
        var draggableOffset = kendo.getOffset(draggedElement);
        var targetElement = listD._getList();
        var targetOffset = kendo.getOffset(targetElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 100);
        ok($("body").find(".k-item.k-state-selected.k-reset.k-drag-clue").length === 1);
        release(draggedElement, targetOffset.left, targetOffset.top + 100);
        ok(listA.items().find(".k-ghost").length === 0);
    });
})();
