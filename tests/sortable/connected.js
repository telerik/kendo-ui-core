(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        listA,
        listB,
        listC,
        draggedElement,
        draggableOffset;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    function moveToSort(draggedElement, x, y) {
        //event should be simulated twice because hint is updated **after** drag event of the Draggable fires
        move(draggedElement, x, y);
        move(draggedElement, x, y);
    }

    module("Sortable - connected lists", {
        setup: function() {
            QUnit.fixture.append(
                '<div id="listA">' +
                    '<div>A1</div>' +
                    '<div>A2</div>' +
                    '<div>A3</div>' +
                    '<div>A4</div>' +
                '</div>'
            );

            QUnit.fixture.append(
                '<div id="listB">' +
                    '<div>B1</div>' +
                    '<div>B2</div>' +
                    '<div>B3</div>' +
                    '<div>B4</div>' +
                '</div>'
            );

            QUnit.fixture.append(
                '<div id="listC">' +
                    '<div>C1</div>' +
                    '<div>C2</div>' +
                    '<div>C3</div>' +
                    '<div>C4</div>' +
                '</div>'
            );

            listA = $("#listA");
            listB = $("#listB");
            listC = $("#listC");

            draggedElement = listB.children().eq(0);
            draggableOffset = kendo.getOffset(draggedElement);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Placeholder moves accross connected lists", 3, function() {
        var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options),
            sortableB = listB.kendoSortable(options),
            sortableC = listC.kendoSortable(options);

        press(draggedElement, draggableOffset.left, draggableOffset.top + 10);
        moveToSort(draggedElement, 10, 10);

        ok(listA.children().first().is(":visible") && listA.children().first().text() == "B1", "Placeholder is moved to the ListA");

        moveToSort(draggedElement, 10, 220);

        ok(listA.children().first().is(":visible"), "Placeholder is removed from ListA");
        ok(listC.children().last().is(":visible") && listC.children().last().text() == "B1", "Placeholder is moved to the ListC");
    });

    test("Item can be dragged from one list to another", 2, function() {
        var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options),
            sortableB = listB.kendoSortable(options),
            sortableC = listC.kendoSortable(options);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 10, 30);
        release(draggedElement, 10, 30);

        ok(listB.children().length == 3, "Item is removed from ListB");
        ok(listA.children().length == 5 && listA.children().eq(1).text() == "B1", "Item from listB is appended to ListA");
    });

    test("Move event fires with correct arguments", 5, function() {
         var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options).getKendoSortable(),
            sortableB = listB.kendoSortable(options).getKendoSortable(),
            sortableC = listC.kendoSortable(options).getKendoSortable(),
            onMove = function (e) {
                ok(true, "SortableA fires move event");
                equal(e.item[0], draggedElement[0], "Item parameter is correct");
                equal(this.indexOf(this.placeholder), 0, "Placeholder is placed at the correct position");
                ok(listA.has(e.target).length, "Target is part of ListA");
                equal(e.list.element.attr("id"), "listB", "List parameter points to the correct list");
            };

        sortableA.bind("move", onMove);
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 10, 10);
    });

    test("Item is appended to the botton of an empty connected list", 2, function() {
         var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options).getKendoSortable(),
            sortableB = listB.kendoSortable(options).getKendoSortable(),
            sortableC = listC.kendoSortable(options).getKendoSortable();

        listC.css("min-height", 20);
        listC.empty();

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 10, 155);

        equal(listC.children()[0], sortableB.placeholder[0], "Placeholder is appended to the ListC");

        release(draggedElement, 10, 155);

        equal(listC.children().length, 1, "Item is appended to the ListC");
    });

})();
