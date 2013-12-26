(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        excludedIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    function moveToSort(draggedElement, x, y) {
        //event should be simulated twice because hint is updated **after** drag event of the Draggable fires
        move(draggedElement, x, y);
        move(draggedElement, x, y);
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
        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);

        equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

        targetElement = element.children().last();
        targetOffset = kendo.getOffset(targetElement);

        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);
        equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
    });

    test("placeholder is not moved if item is dragged outside of the sortable container", 1, function() {
        var draggedElement = element.children().eq(1),
            draggableOffset = kendo.getOffset(draggedElement),
            sortable = element.kendoSortable().data("kendoSortable");

        //simulate press to trigger draggable's hint initialization
        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 500, 500);

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
        moveToSort(draggedElement, targetOffset.left, targetOffset.top - 10);
        release(draggedElement, targetOffset.left, targetOffset.top - 10);

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
        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);
        moveToSort(draggedElement, 500, 500);
        release(draggedElement, 500, 500);

        equal(draggedElement.index(), 3, "draggedElement is placed at the last valid position");
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
        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);

        ok(!sortable.placeholder, "placeholder is not initialized");
        equal(draggedElement.index(), filteredIndex, "draggedElement did not change its position");
    });

    test("filtered items are valid drop targets", 1, function() {
        var draggedElement = element.children().eq(2),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(filteredIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left, targetOffset.top - 10);

        notEqual(targetElement.index(), filteredIndex, "filtered item changes its position");
    });

    test("user is not able to drag excluded items", 1, function() {
        var draggedElement = element.children().eq(excludedIndex),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(0),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    excluded: ".excluded"
                }).data("kendoSortable");

        sortable.bind("start", function(e) {
            ok(false, "start event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);

        equal(draggedElement.index(), excludedIndex, "draggedElement did not change its position");
    });

    test("excluded items are not valid drop targets and does not move then users drags an item onto them", 2, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(excludedIndex),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.kendoSortable({
                    excluded: ".excluded"
                }).data("kendoSortable");

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left, targetOffset.top + 10);

        //+1 is added because placeholder is appended to the element which changes the index
        equal(targetElement.index(), excludedIndex + 1, "The excluded item did not change its position");

        release(draggedElement, targetElement.left, targetOffset.top + 10);
        equal(draggedElement.index(), 0, "draggedElement did not change its position");
    });

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
        moveToSort(draggedElement, 100, 100);

        equal($(".hint").length, 1, "Hint is initialized");
    });

    test("placeholder can be initialized as jQuery object", 1, function() {
        var draggedElement = element.children().eq(0),
            draggableOffset = kendo.getOffset(draggedElement);

        element.kendoSortable({
            placeholder: $("<li class='placeholder'>placeholder</li>")
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, 100, 100);

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
        moveToSort(draggedElement, 100, 100);

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
        moveToSort(draggedElement, 100, 100);

        equal(element.find(".placeholder").length, 1, "Placeholder is appended to the sortable container");
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
        moveToSort(draggedElement, 100, 100);

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
        moveToSort(draggedElement, 100, 100);

        equal($(".hint").length, 1, "Hint is not appended to the DOM");
        equal(element.children().length, 5, "Placeholder is appended to the sortable container");
        ok(!draggedElement.is(":visible"), "Draggable element is hidden");
    });

    module("Sortable - API", {
        setup: function() {
            QUnit.fixture.append(
                '<div id="sortable">' +
                    '<p class="filtered">foo</p>' +
                    '<p class="item">bar</p>' +
                    '<p class="item excluded">baz</p>' +
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
                exclude: ".excluded"
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
            ok(true, "Change event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");

            //initial index should be 2 because filtered items does not count
            ok(e.index == 1 && e.oldIndex == 2, "Index and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
    });

    test("beforeChange event fires on dragend before DOM changes", 3, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.data("kendoSortable");

        sortable.bind("beforeChange", function(e) {
            ok(true, "beforeChange event is fired");
            ok(e.item[0] == draggedElement[0], "Correct item is passed");

            //index should be 2 because filtered items does not count
            ok(e.index == 2 && e.newIndex == 1, "Index and oldIndex are correct");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
    });

    test("Change action can be prevented at the beforeChange event", 2, function() {
        var draggedElement = element.children().eq(3),
            draggableOffset = kendo.getOffset(draggedElement),
            targetElement = element.children().eq(1),
            targetOffset = kendo.getOffset(targetElement),
            sortable = element.data("kendoSortable");

        sortable.bind("beforeChange", function(e) {
            e.preventDefault();
        });

        sortable.bind("change", function(e) {
            ok(false, "Change event is not fired");
        });

        press(draggedElement, draggableOffset.left, draggableOffset.top);
        moveToSort(draggedElement, targetOffset.left + 10, targetOffset.top + 10);
        release(draggedElement, targetOffset.left + 10, targetOffset.top + 10);

        ok(element.children().index(draggedElement) == 3, "draggedElement did not change its position.");
        ok(element.children().index(targetElement) == 1, "targetElement did not change its position.");
    })

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
