(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        disabledIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    module("Sortable - API", {
        setup: function() {
            QUnit.fixture.append(
                '<div id="sortable">' +
                    '<p style="margin: 0; height: 18px;" class="filtered">foo</p>' +
                    '<p style="margin: 0; height: 18px;" class="item">bar</p>' +
                    '<p style="margin: 0; height: 18px;" class="item disabled">baz</p>' +
                    '<p style="margin: 0; height: 18px;" class="item">qux</p>' +
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
        move(draggedElement, 100, 100);
        ok(!this.placeholder, "Placeholder is not initialized");
        ok(!$(".hint").length, "Hint is not initialized");
    });

    test("move event fires while the user rearrange items with the mouse", 2, function() {
        var children = element.children(),
            draggedElement = children.eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            target,
            targetOffset,
            sortable = element.data("kendoSortable");

        sortable.bind("move", function(e) {
            ok(true, "move event is fired");
        });

        target = children.eq(3);
        targetOffset = kendo.getOffset(target);

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);
        //move is trigerred once
        equal(target.next()[0], sortable.placeholder[0], "Placeholder is inserted after the target");
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
            ok(e.newIndex == 0 && e.oldIndex == 2, "newIndex and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);
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
            ok(e.oldIndex == 2 && e.newIndex == 0, "newIndex and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);
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
        move(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
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
        move(draggedElement, 100, 100);
        triggerDraggableEvent("dragcancel", {}, element);
    });

    test("items method returns the sortable items collection", 3, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.data("kendoSortable");

        equal(sortable.items().length, 3, "Method returns correct amount of items before placeholder is initialized.");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 10, 10);

        equal(sortable.items().length, 3, "Method returns correct amount of items after placeholder is initialized.");
        equal(sortable.items().find(sortable.placeholder).length, 0, "Placeholder is not part of the items collection");
    });

    test("indexOf method works as expected", 4, function() {
        var item = element.children().eq(1),
            filtered = element.find(".filtered"),
            disabled = element.find(".disabled"),
            dummy = $("<li>dummy</li>"),
            sortable = element.data("kendoSortable");

        equal(sortable.indexOf(item), 0, "indexOf returns the correct position");
        equal(sortable.indexOf(dummy), -1, "indexOf returns -1 if element cannot be found");
        equal(sortable.indexOf(filtered), -1, "filtered items are excluded");
        equal(sortable.indexOf(disabled), 1, "disabled items are included");
    });

    test("indexOf method works as expected if sorting was started", 5, function() {
        var item = element.children().eq(1),
            filtered = element.find(".filtered"),
            disabled = element.find(".disabled"),
            dummy = $("<li>dummy</li>"),
            sortable = element.data("kendoSortable");

        press(item, kendo.getOffset(item).left, kendo.getOffset(item).top);
        move(item, 10, 10)

        equal(sortable.indexOf(sortable.placeholder), 0, "index of the placeholder is returned correctly");

        equal(sortable.indexOf(item), 0, "indexOf returns the correct position");
        equal(sortable.indexOf(dummy), -1, "indexOf returns -1 if element cannot be found");
        equal(sortable.indexOf(filtered), -1, "filtered items are excluded");
        equal(sortable.indexOf(disabled), 1, "disabled items are included");
    });

})();
