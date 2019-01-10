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

    describe("Sortable - connected lists", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<div id="listA">' +
                '<div>A1</div>' +
                '<div>A2</div>' +
                '<div>A3</div>' +
                '<div>A4</div>' +
                '</div>'
            );

            Mocha.fixture.append(
                '<div id="listB">' +
                '<div>B1</div>' +
                '<div>B2</div>' +
                '<div>B3</div>' +
                '<div>B4</div>' +
                '</div>'
            );

            Mocha.fixture.append(
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
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Placeholder moves accross connected lists", function() {
            var options = { connectWith: "#listA, #listB, #listC" },
                sortableA = listA.kendoSortable(options),
                sortableB = listB.kendoSortable(options),
                sortableC = listC.kendoSortable(options),
                targetElement = listA.children().first(),
                targetOffset = kendo.getOffset(targetElement),
                targetTopCenter;

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.isOk(listA.children().first().is(":visible") && listA.children().first().text() == "B1", "Placeholder is moved to the ListA");

            targetElement = listC.children().last();
            targetOffset = kendo.getOffset(targetElement);
            targetTopCenter = targetElement.outerHeight() / 2;

            move(draggedElement, targetOffset.left, targetOffset.top + targetTopCenter + 1);

            assert.isOk(listA.children().first().text() !== "B1", "Placeholder is removed from ListA");
            assert.isOk(listC.children().last().text() == "B1", "Placeholder is moved to the ListC");
        });

        it("Item can be dragged from one list to another", function() {
            var options = { connectWith: "#listA, #listB, #listC" },
                sortableA = listA.kendoSortable(options),
                sortableB = listB.kendoSortable(options),
                sortableC = listC.kendoSortable(options);

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 10, 30);
            release(draggedElement, 10, 30);

            assert.isOk(listB.children().length == 3, "Item is removed from ListB");
            assert.isOk(listA.children().length == 5 && listA.children().eq(1).text() == "B1", "Item from listB is appended to ListA");
        });

        it("Move event fires with correct arguments", function() {
            var options = { connectWith: "#listA, #listB, #listC" },
                sortableA = listA.kendoSortable(options).getKendoSortable(),
                sortableB = listB.kendoSortable(options).getKendoSortable(),
                sortableC = listC.kendoSortable(options).getKendoSortable(),
                onMove = function(e) {
                    assert.isOk(true, "SortableA fires move event");
                    assert.equal(e.item[0], draggedElement[0], "Item parameter is correct");
                    assert.equal(this.indexOf(this.placeholder), 0, "Placeholder is placed at the correct position");
                    assert.isOk(listA.has(e.target).length, "Target is part of ListA");
                    assert.equal(e.list.element.attr("id"), "listB", "List parameter points to the correct list");
                };

            sortableA.bind("move", onMove);
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 10, 10);
        });

        it("Item is appended to the botton of an empty connected list", function() {
            var options = { connectWith: "#listA, #listB, #listC" },
                sortableA = listA.kendoSortable(options).getKendoSortable(),
                sortableB = listB.kendoSortable(options).getKendoSortable(),
                sortableC = listC.kendoSortable(options).getKendoSortable(),
                targetOffset = kendo.getOffset(listC);

            listC.css("min-height", 20);
            listC.empty();

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(listC.children()[0], sortableB.placeholder[0], "Placeholder is appended to the ListC");

            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(listC.children().length, 1, "Item is appended to the ListC");
        });
    });

    describe("Sortable - connected lists border cases", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<div id="listA">' +
                '<div style="height: 20px;">A1</div>' +
                '<div style="height: 20px;">A2</div>' +
                '<div style="height: 20px;">A3</div>' +
                '</div>'
            );

            Mocha.fixture.append(
                '<div id="listB" style="min-height: 25px;">' +
                '<div style="height: 20px;">B1</div>' +
                '</div>'
            );

            listA = $("#listA");
            listB = $("#listB");

            draggedElement = listB.children().eq(0);
            draggableOffset = kendo.getOffset(draggedElement);
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("User is able to bring back the last item to the sortable container", function() {
            var options = { connectWith: "#listA" },
                sortableA = listA.kendoSortable().getKendoSortable(),
                sortableB = listB.kendoSortable(options).getKendoSortable(),
                target = listA.children().eq(0),
                targetOffset = kendo.getOffset(target);

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(listA.children()[0], sortableB.placeholder[0], "Placeholder is moved in listA");

            target = listB;
            targetOffset = kendo.getOffset(target);

            move(draggedElement, targetOffset.left, targetOffset.top);
            assert.isOk($.contains(listB[0], sortableB.placeholder[0]), "Placeholder is appended back to listB");

        });

        it("Placeholder is moved when item is dragged at the bottom of connectedList container", function() {
            var options = { connectWith: "#listA" },
                sortableA = listA.kendoSortable().getKendoSortable(),
                sortableB = listB.kendoSortable(options).getKendoSortable(),
                target = listA;

            listA.css("min-height", 200);

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 50, 150);

            assert.equal(listA.children().last()[0], sortableB.placeholder[0], "Placeholder is moved in listA");
        });

        it("Placeholder is appended after the hidden element when only one hidden element is left in the container", function() {
            Mocha.fixture.empty();
            Mocha.fixture.append(
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

            assert.equal(draggedElement.next().text(), sortable.placeholder.text(), "Placeholder is appended after hidden element");
        });

        it("Placeholder is appended to container when using upward motion", function() {
            Mocha.fixture.empty();
            Mocha.fixture.append(
                '<div id="listA" style="height: 80px;">' +
                '<div style="height: 20px;">A1</div>' +
                '<div style="height: 20px;">A2</div>' +
                '<div style="height: 20px;">A3</div>' +
                '</div>'
            );

            Mocha.fixture.append(
                '<div id="listB" style="min-height: 25px;">' +
                '<div style="height: 20px;">B1</div>' +
                '</div>'
            );

            var sortableA = $("#listA").kendoSortable({
            }).data("kendoSortable");
            var sortableB = $("#listB").kendoSortable({
                connectWith: "#listA"
            }).data("kendoSortable");

            draggedElement = $("#listB").children().eq(0);
            draggableOffset = kendo.getOffset(draggedElement);
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, draggableOffset.left, draggableOffset.top - 25);

            assert.equal(sortableA.element.children().last()[0], sortableB.placeholder[0], "Placeholder is moved correctly to sortableA");
        });

    });
}());
