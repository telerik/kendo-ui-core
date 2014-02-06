(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        disabledIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    module("Sortable - placeholder and hint customization", {
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

    test("hint can be initialized as jQuery object", 1, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement);

        element.kendoSortable({
            hint: $("<li class='hint'>hint</li>")
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal($(".hint").length, 1, "Hint is initialized");
    });

    test("placeholder can be initialized as jQuery object", 1, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement);

        element.kendoSortable({
            placeholder: $("<li class='placeholder'>placeholder</li>")
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal(element.find(".placeholder").length, 1, "Placeholder is appended to the sortable container");
    });

    test("hint can be initialized as function and is run when user moves an item", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement);

        element.kendoSortable({
            hint: function(element) {
                ok(element[0] == $("#sortable").children()[0], "hint function received the correct argument");

                return element.clone().addClass('hint');
            }
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal($(".hint").length, 1, "Hint is appended to the DOM");
    });

    test("Placeholder can be initialized as function and is run when user moves an item", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement);

        element.kendoSortable({
            placeholder: function(element) {
                ok(element[0] == $("#sortable").children()[0], "Placeholder function received the correct argument");

                return element.clone().addClass('placeholder');
            }
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        move(draggedElement, 100, 100);

        equal(element.find(".placeholder").length, 1, "Placeholder is appended to the sortable container");
    });

})();
