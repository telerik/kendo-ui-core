(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        disabledIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    function moveToSort(draggedElement, x, y) {
        //event should be simulated twice because hint is updated **after** drag event of the Draggable fires
        move(draggedElement, x, y);
        move(draggedElement, x, y);
    }

    module("Sortable - API", {
        setup: function() {
            QUnit.fixture.append(
                '<div id="sortable">' +
                    '<p class="filtered">foo</p>' +
                    '<p class="item">bar</p>' +
                    '<p class="item disabled">baz</p>' +
                    '<p class="item">qux</p>' +
                '</div>'
            );

            element = $("#sortable");

            element.kendoSortable({
                hint: $("<p class='hint'>hint</p>"),
                placeholder: function(element) {
                    return element.clone().addClass("placeholder").text("placeholder");
                },
                filter: ".item",
                disabled: ".disabled"
            });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("start event fires on dragstart", 2, function() {
        var draggedElement = element.children().eq(1),
            sortable = element.data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(true, "Start event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");
        });

        triggerDraggableEvent(
            "dragstart",
            { currentTarget: draggedElement, target: draggedElement },
            element
        );
    });

    test("start action can be prevented at start event", 2, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.data("kendoSortable");

        sortable.bind("start", function(e) {
            e.preventDefault();
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 100, 100);
        ok(!this.placeholder, "Placeholder is not initialized");
        ok(!$(".hint").length, "Hint is not initialized");
    });

    test("change event fires on dragend after DOM changes", 3, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.data("kendoSortable");

        sortable.bind("change", function(e) {
            ok(true, "change event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");

            //initial index should be 2 because filtered items does not count
            ok(e.index == 1 && e.oldIndex == 2, "Index and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
    });

    test("end event fires on dragend before DOM changes", 3, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.data("kendoSortable");

        sortable.bind("end", function(e) {
            ok(true, "end event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");

            //index should be 2 because filtered items does not count
            ok(e.index == 2 && e.newIndex == 1, "Index and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
    });

    test("Sort action can be prevented at the end event", 2, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.data("kendoSortable");

        sortable.bind("end", function(e) {
            e.preventDefault();
        });

        sortable.bind("change", function(e) {
            ok(false, "change event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);

        ok(element.children().index(draggedElement) == 3, "draggedElement did not change its position.");
        ok(element.children().index(targetElement) == 1, "targetElement did not change its position.");
    });

    test("Cancel event is fired when item drag is cancelled by the user", 2, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.data("kendoSortable");

        sortable.bind("cancel", function(e) {
            ok(true, "Cancel event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 100, 100);
        triggerDraggableEvent("dragcancel", {}, element);
    });

    test("items method returns the sortable items collection", 3, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.data("kendoSortable");

        equal(sortable.items().length, 3, "Method returns correct amount of items before placeholder is initialized.");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 10, 10);

        equal(sortable.items().length, 3, "Method returns correct amount of items after placeholder is initialized.");
        equal(sortable.items().find(sortable.placeholder).length, 0, "Placeholder is not part of the items collection");
    });

})();
