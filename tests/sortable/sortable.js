(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element;

    module("kendo.ui.Sortable", {
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

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    function trigger(type, e, element) {
        element.trigger($.Event(type, e));
    }

    test("widget creates draggable component", 1, function() {
        element.kendoSortable();
        ok(element.data("kendoDraggable") instanceof Draggable);
    });

    test("placeholder is inserted before dragged element on dragstart", 3, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable");

        triggerDraggableEvent("dragstart", { currentTarget: draggedElement }, element);

        equal(element.children().length, 5, "placeholder is attached to the sortable element");
        equal(draggedElement.text(), draggedElement.prev().text(), "placeholder is attached before draggedElement");
        equal(sortable.placeholder.css("visibility"), "hidden", "placeholder element have visibility: hidden");
    });

    test("the dragged element is hidden on dragstart", 1, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable");

        triggerDraggableEvent("dragstart", { currentTarget: draggedElement }, element);

        ok(!draggedElement.is(":visible"), "draggedElement is hidden");
    });

    test("placeholder is removed and dragged element is shown on dragcancel", 2, function() {
        var draggedElement = element.children().eq(0),
            sortable = element.kendoSortable().data("kendoSortable"),
            initialChildrenCount = element.children().length;

        triggerDraggableEvent("dragstart", { currentTarget: draggedElement }, element);
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

        //simulate press and move to trigger draggable's hint initialization
        press(draggableElement, draggableOffset.left, draggableOffset.top);
        move(draggableElement, targetOffset.left, targetOffset.top + 10);

        //hint is re-located after move
        equal(sortable.placeholder.index(), 1);

        triggerDraggableEvent("drag",  {
            x: { client: targetOffset.left },
            y: { client: targetOffset.top + 10 }
        }, element);

        equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");
    });

})();
