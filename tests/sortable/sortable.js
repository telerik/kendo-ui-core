(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        excludedIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    function moveToSort(draggableElement, x, y) {
        //event should be simulated twice because hint is updated **after** drag event of the Draggable fires
        move(draggableElement, x, y);
        move(draggableElement, x, y);
    }

    module("Sortable - sorting with the mouse", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li>foo</li>' +
                    '<li>bar</li>' +
                    '<li>baz</li>' +
                    '<li>qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("widget creates draggable component", 1, function() {
        element.kendoSortable();
        ok(element.data("kendoDraggable") instanceof Draggable);
    });

    test("placeholder is inserted before dragged element on dragstart", 3, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable");

        triggerDraggableEvent(
            "dragstart",
            { currentTarget: draggedElement, target: draggedElement }, 
            element
        );

        equal(element.children().length, 5, "placeholder is attached to the sortable element");
        equal(draggedElement.text(), draggedElement.prev().text(), "placeholder is attached before draggedElement");
        equal(sortable.placeholder.css("visibility"), "hidden", "placeholder element have visibility: hidden");
    });

    test("the dragged element is hidden on dragstart", 1, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable");

        triggerDraggableEvent(
            "dragstart",
            { currentTarget: draggedElement, target: draggedElement },
            element
        );

        ok(!draggedElement.is(":visible"), "draggedElement is hidden");
    });

    test("placeholder is removed and dragged element is shown on dragcancel", 2, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable"),
            initialChildrenCount = element.children().length;

        triggerDraggableEvent(
            "dragstart",
            { currentTarget: draggedElement, target: draggedElement },
            element
        );
        triggerDraggableEvent("dragcancel", {}, element);

        ok(draggedElement.is(":visible"), "draggableElement is shown");
        ok(initialChildrenCount === element.children().length, "placeholder element is removed");
    });

    test("placeholder is moved while user drags", 2, function() {
        var draggableElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);

        equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

        targetElement = element.children().last();
        targetOffset = kendo.getOffset(targetElement);

        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);
        equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggableElement moves");
    });

    test("placeholder is not moved if item is dragged outside of the sortable container", 1, function() {
        var draggableElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggableElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, 500, 500);

        equal(sortable.placeholder.index(), 1, "placeholder position does not change");
    });

    test("item is sorted correctly on dragend", 1, function() {
        var draggableElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top - 10);
        release(draggableElement, targetOffset.left, targetOffset.top - 10);

        equal(draggableElement.index(), 1, "draggableElement changes its position");
    });

    test("item is placed at the last valid position even if item is released outside of the sortable container", 1, function() {
        var draggableElement = element.children().eq(2),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(3),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);
        moveToSort(draggableElement, 500, 500);
        release(draggableElement, 500, 500);

        equal(draggableElement.index(), 3, "draggableElement is placed at the last valid position");
    });

    module("Sortable - filtering and excluding items", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li class="item">foo</li>' +
                    '<li class="filtered">bar</li>' +
                    '<li class="item">baz</li>' +
                    '<li class="item excluded">qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
            filteredIndex = $("#sortable .filtered").index();
            excludedIndex = $("#sortable .excluded").index();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("user is not able to drag items that does not match the filter", 2, function() {
        var draggableElement = element.children().eq(filteredIndex),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(2),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);

        ok(!sortable.placeholder, "placeholder is not initialized");
        equal(draggableElement.index(), filteredIndex, "draggableElement did not change its position");
    });

    test("filtered items are valid drop targets", 1, function() {
        var draggableElement = element.children().eq(2),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(filteredIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top - 10);

        notEqual(targetElement.index(), filteredIndex, "filtered item changes its position");
    });

    test("user is not able to drag excluded items", 1, function() {
        var draggableElement = element.children().eq(excludedIndex),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(0),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    excluded: ".excluded"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);

        equal(draggableElement.index(), excludedIndex, "draggableElement did not change its position");
    });
/*
    test("excluded items are not valid drop targets and does not move then users drags an item onto them", 2, function() {
        var draggableElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggableElement),
            targetElement = element.children().eq(excludedIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    excluded: ".excluded"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggableElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggableElement, targetOffset.left, targetOffset.top + 10);

        //+1 is added because placeholder is appended to the element which changes the index
        equal(targetElement.index(), excludedIndex + 1, "The excluded item did not change its position");

        release(draggableElement, targetElement.left, targetOffset,top + 10);
        equal(draggableElement.index(), 0, "draggableElement did not change its position");
    });
*/

})();
