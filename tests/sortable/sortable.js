(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        disabledIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    module("Sortable - sorting with the mouse", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li style="margin: 0; height: 18px;">foo</li>' +
                    '<li style="margin: 0; height: 18px;">bar</li>' +
                    '<li style="margin: 0; height: 18px;">baz</li>' +
                    '<li style="margin: 0; height: 18px;">qux</li>' +
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

        ok(draggedElement.is(":visible"), "draggedElement is shown");
        ok(initialChildrenCount === element.children().length, "placeholder element is removed");
    });

    test("placeholder is moved while user drags", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);

        equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

        targetElement = element.children().last();
        targetOffset = kendo.getOffset(targetElement);

        move(draggedElement, targetOffset.left, targetOffset.top + 10);
        equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
    });

    test("placeholder is moved while cursor enters in the target area (moveOnEnter)", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        sortable.setOptions({ moveOnDragEnter: true });

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

        targetElement = element.children().last();
        targetOffset = kendo.getOffset(targetElement);

        move(draggedElement, targetOffset.left, targetOffset.top);
        equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
    });

    test("placeholder is not moved if item is dragged outside of the sortable container", 1, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 500, 500);

        equal(sortable.placeholder.index(), 1, "placeholder position does not change");
    });

    test("item is sorted correctly on dragend", 1, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);
        release(draggedElement, targetOffset.left, targetOffset.top);

        equal(draggedElement.index(), 1, "draggedElement changes its position");
    });

    test("item is placed at the last valid position even if item is released outside of the sortable container", 1, function() {
        var draggedElement = element.children().eq(2),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(3),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);
        move(draggedElement, 500, 500);
        release(draggedElement, 500, 500);

        equal(draggedElement.index(), 3, "draggedElement is placed at the last valid position");
    });

    test("cursor changes on drag start and is reset on dragcancel", 2, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

        triggerDraggableEvent(
            "dragstart",
            { currentTarget: draggedElement, target: draggedElement }, 
            element
        );

        equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

        triggerDraggableEvent("dragcancel", {}, element);

        equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
    });

    test("cusor changes on drag start and is reset on dragend", 2, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

        release(draggedElement, targetOffset.left, targetOffset.top);

        equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
    });

    module("Sortable - filtering and excluding items", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li style="margin:0; height: 18px;" class="item">foo</li>' +
                    '<li style="margin:0; height: 18px;" class="filtered">bar</li>' +
                    '<li style="margin:0; height: 18px;" class="item">baz</li>' +
                    '<li style="margin:0; height: 18px;" class="item disabled">qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
            filteredIndex = $("#sortable .filtered").index();
            disabledIndex = $("#sortable .disabled").index();
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("user is not able to drag items that does not match the filter", 2, function() {
        var draggedElement = element.children().eq(filteredIndex),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(2),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);

        ok(!sortable.placeholder, "placeholder is not initialized");
        equal(draggedElement.index(), filteredIndex, "draggedElement did not change its position");
    });

    test("filtered items are not valid drop targets", 1, function() {
        var draggedElement = element.children().eq(2),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(filteredIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top);

        equal(targetElement.index(), filteredIndex, "filtered item does not changes its position");
    });

    test("user is not able to drag disabled items", 1, function() {
        var draggedElement = element.children().eq(disabledIndex),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(0),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    disabled: ".disabled"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);

        equal(draggedElement.index(), disabledIndex, "draggedElement did not change its position");
    });

    test("disabled items are valid drop targets and move then users drags an item onto them", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(disabledIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    disabled: ".disabled"
                }).data("kendoSortable");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, targetOffset.left, targetOffset.top + 10);

        //+1 is added because placeholder is appended to the element which changes the index
        equal(targetElement.index(), disabledIndex, "The disabled item changes its position");

        release(draggedElement, targetElement.left, targetOffset.top + 10);
        equal(draggedElement.index(), 3, "draggedElement did not change its position");
    });

    module("Sortable - draggable handler", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li><span class="handler">*</span><p>foo</p></li>' +
                    '<li><span class="handler">*</span><p>bar</p></li>' +
                    '<li><span class="handler">*</span><p>baz</p></li>' +
                    '<li><span class="handler">*</span><p>qux</p></li>' +
                '</ul>'
            );

            element = $("#sortable");

            element.kendoSortable({
                handler: ".handler",
                hint: $("<div class='hint'>hint</div>")
            });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("If mouse is not over the handler the element cannot be dragged", 3, function() {
        var draggedElement = element.children().eq(0).find("p"),
            draggableOffset = kendo.getOffset(draggedElement);

        element.data("kendoSortable").bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal($(".hint").length, 0, "Hint is not appended to the DOM");
        equal(element.children().length, 4, "Placeholder is not appended to the sortable container");
        ok(draggedElement.is(":visible"), "Draggable element is not hidden");
    });

    test("If mouse is over the handler the element can be dragged", 4, function() {
        var draggedElement = element.children().eq(0).find(".handler"),
            draggableOffset = kendo.getOffset(draggedElement);

        element.data("kendoSortable").bind("start", function(e) {
            ok(true, "start event is fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal($(".hint").length, 1, "Hint is not appended to the DOM");
        equal(element.children().length, 5, "Placeholder is appended to the sortable container");
        ok(!draggedElement.is(":visible"), "Draggable element is hidden");
    });

    module("Sortable - moving by axis", {
        setup: function() {
            QUnit.fixture.append(
                '<ul id="sortable">' +
                    '<li class="item" style="margin: 0; height: 20px;">foo</li>' +
                    '<li class="item" style="margin: 0; height: 20px;">bar</li>' +
                    '<li class="item" style="margin: 0; height: 20px;">baz</li>' +
                    '<li class="item" style="margin: 0; height: 20px;">qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
            element.kendoSortable({
                axis: "y",
                filter: ".item"
            });
        },
        teardown: function() {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Placeholder is moved even of the mouse is outside of the sortable container", 1, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetTopCenter = kendo.getOffset(targetElement).top + targetElement.height() / 2;

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, targetTopCenter + 1);

        equal(targetElement.next()[0], element.getKendoSortable().placeholder[0], "Placeholder is moved");
    });

})();
