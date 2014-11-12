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
            sortableC = listC.kendoSortable(options),
            targetElement = listA.children().first(),
            targetOffset = kendo.getOffset(targetElement),
            targetTopCenter;

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        ok(listA.children().first().is(":visible") && listA.children().first().text() == "B1", "Placeholder is moved to the ListA");

        targetElement = listC.children().last();
        targetOffset = kendo.getOffset(targetElement);
        targetTopCenter = targetElement.outerHeight() / 2;

        move(draggedElement, targetOffset.left, targetOffset.top + targetTopCenter + 1);

        ok(listA.children().first().text() !== "B1", "Placeholder is removed from ListA");
        ok(listC.children().last().text() == "B1", "Placeholder is moved to the ListC");
    });

    test("Item can be dragged from one list to another", 2, function() {
        var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options),
            sortableB = listB.kendoSortable(options),
            sortableC = listC.kendoSortable(options);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 10, 30);
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
        move(draggedElement, 10, 10);
    });

    test("Item is appended to the botton of an empty connected list", 2, function() {
         var options = { connectWith: "#listA, #listB, #listC" },
            sortableA = listA.kendoSortable(options).getKendoSortable(),
            sortableB = listB.kendoSortable(options).getKendoSortable(),
            sortableC = listC.kendoSortable(options).getKendoSortable(),
            targetOffset = kendo.getOffset(listC);

        listC.css("min-height", 20);
        listC.empty();

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        equal(listC.children()[0], sortableB.placeholder[0], "Placeholder is appended to the ListC");

        release(draggedElement, targetOffset.left, targetOffset.top);

        equal(listC.children().length, 1, "Item is appended to the ListC");
    });

    module("Sortable - connected lists border cases", {
        setup: function() {
            QUnit.fixture.append(
                '<div id="listA">' +
                    '<div style="height: 20px;">A1</div>' +
                    '<div style="height: 20px;">A2</div>' +
                    '<div style="height: 20px;">A3</div>' +
                '</div>'
            );

            QUnit.fixture.append(
                '<div id="listB" style="min-height: 25px;">' +
                    '<div style="height: 20px;">B1</div>' +
                '</div>'
            );

            listA = $("#listA");
            listB = $("#listB");

            draggedElement = listB.children().eq(0);
            draggableOffset = kendo.getOffset(draggedElement);
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("User is able to bring back the last item to the sortable container", 2, function() {
        var options = { connectWith: "#listA" },
            sortableA = listA.kendoSortable().getKendoSortable(),
            sortableB = listB.kendoSortable(options).getKendoSortable(),
            target = listA.children().eq(0),
            targetOffset = kendo.getOffset(target);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        equal(listA.children()[0], sortableB.placeholder[0], "Placeholder is moved in listA");

        target = listB;
        targetOffset = kendo.getOffset(target);

        move(draggedElement, targetOffset.left, targetOffset.top);
        ok($.contains(listB[0], sortableB.placeholder[0]), "Placeholder is appended back to listB");

    });

    test("Placeholder is moved when item is dragged at the bottom of connectedList container", 1, function() {
        var options = { connectWith: "#listA" },
            sortableA = listA.kendoSortable().getKendoSortable(),
            sortableB = listB.kendoSortable(options).getKendoSortable(),
            target = listA;

        listA.css("min-height", 200);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 50, 150);

        equal(listA.children().last()[0], sortableB.placeholder[0], "Placeholder is moved in listA");
    });

    test("Placeholder is appended after the hidden element when only one hidden element is left in the container", 1, function() {
        QUnit.fixture.empty();
        QUnit.fixture.append(
            '<div id="sortable">' +
                '<div class="filter" style="height: 20px;">A1</div>' +
                '<div class="sort" style="height: 20px;">A2</div>' +
                '<div class="filter" style="height: 20px;">A3</div>' +
            '</div>'
        );

        var sortable = $("#sortable").kendoSortable({
            filter: ".sort"
        }).data("kendoSortable");

        draggedElement = $("#sortable").children().eq(1);
        draggableOffset = kendo.getOffset(draggedElement);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, draggableOffset.left, draggableOffset.top + 15);

        equal(draggedElement.next().text(), sortable.placeholder.text(), "Placeholder is appended after hidden element");
    });

})();
