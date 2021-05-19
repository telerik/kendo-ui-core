(function() {
    var Sortable = kendo.ui.Sortable,
        Draggable = kendo.ui.Draggable,
        element,
        filteredIndex,
        disabledIndex;

    function triggerDraggableEvent(type, e, element) {
        element.data("kendoDraggable").trigger(type, e);
    }

    describe("Sortable - sorting with the mouse", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<ul id="sortable">' +
                '<li style="margin: 0; height: 18px;">foo</li>' +
                '<li style="margin: 0; height: 18px;">bar</li>' +
                '<li style="margin: 0; height: 18px;">baz</li>' +
                '<li style="margin: 0; height: 18px;">qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("widget creates draggable component", function() {
            element.kendoSortable();
            assert.isOk(element.data("kendoDraggable") instanceof Draggable);
        });

        it("placeholder is inserted before dragged element on dragstart", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.equal(element.children().length, 5, "placeholder is attached to the sortable element");
            assert.equal(draggedElement.text(), draggedElement.prev().text(), "placeholder is attached before draggedElement");
            assert.equal(sortable.placeholder.css("visibility"), "hidden", "placeholder element have visibility: hidden");
        });

        it("the dragged element is hidden on dragstart", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.isOk(!draggedElement.is(":visible"), "draggedElement is hidden");
        });

        it("placeholder is removed and dragged element is shown on dragcancel", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable"),
                initialChildrenCount = element.children().length;

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );
            triggerDraggableEvent("dragcancel", {}, element);

            assert.isOk(draggedElement.is(":visible"), "draggedElement is shown");
            assert.isOk(initialChildrenCount === element.children().length, "placeholder element is removed");
        });

        it("placeholder is moved while user drags", function() {
            var draggedElement = element.children().eq(0),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 10);

            assert.equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

            targetElement = element.children().last();
            targetOffset = kendo.getOffset(targetElement);

            move(draggedElement, targetOffset.left, targetOffset.top + 10);
            assert.equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
        });

        it("placeholder is moved while cursor enters in the target area (moveOnEnter)", function() {
            var draggedElement = element.children().eq(0),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            sortable.setOptions({ moveOnDragEnter: true });

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

            targetElement = element.children().last();
            targetOffset = kendo.getOffset(targetElement);

            move(draggedElement, targetOffset.left, targetOffset.top);
            assert.equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
        });

        it("placeholder is not moved if item is dragged outside of the sortable container", function() {
            var draggedElement = element.children().eq(1),
                draggableOffset = kendo.getOffset(draggedElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 500, 500);

            assert.equal(sortable.placeholder.index(), 1, "placeholder position does not change");
        });

        it("item is sorted correctly on dragend", function() {
            var draggedElement = element.children().eq(3),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);
            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.index(), 1, "draggedElement changes its position");
        });

        it("item is placed at the last valid position even if item is released outside of the sortable container", function() {
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

            assert.equal(draggedElement.index(), 3, "draggedElement is placed at the last valid position");
        });

        it("cursor changes on drag start and is reset on dragcancel", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

            triggerDraggableEvent("dragcancel", {}, element);

            assert.equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
        });

        it("cusor changes on drag start and is reset on dragend", function() {
            var draggedElement = element.children().eq(3),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
        });
    });

    describe("Sortable - filtering and excluding items", function() {
        beforeEach(function() {
            Mocha.fixture.append(
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
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("user is not able to drag items that does not match the filter", function() {
            var draggedElement = element.children().eq(filteredIndex),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(2),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

            sortable.bind("start", function(e) {
                assert.isOk(false, "start event is not fired");
            });

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 10);

            assert.isOk(!sortable.placeholder, "placeholder is not initialized");
            assert.equal(draggedElement.index(), filteredIndex, "draggedElement did not change its position");
        });

        it("filtered items are not valid drop targets", function() {
            var draggedElement = element.children().eq(2),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(filteredIndex),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable({
                    filter: ".item"
                }).data("kendoSortable");

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(targetElement.index(), filteredIndex, "filtered item does not changes its position");
        });

        it("user is not able to drag disabled items", function() {
            var draggedElement = element.children().eq(disabledIndex),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(0),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable({
                    disabled: ".disabled"
                }).data("kendoSortable");

            sortable.bind("start", function(e) {
                assert.isOk(false, "start event is not fired");
            });

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top + 10);

            assert.equal(draggedElement.index(), disabledIndex, "draggedElement did not change its position");
        });

        it("disabled items are valid drop targets and move then users drags an item onto them", function() {
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
            assert.equal(targetElement.index(), disabledIndex, "The disabled item changes its position");

            release(draggedElement, targetElement.left, targetOffset.top + 10);
            assert.equal(draggedElement.index(), 3, "draggedElement did not change its position");
        });
    });

    describe("Sortable - draggable handler", function() {
        beforeEach(function() {
            Mocha.fixture.append(
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
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("If mouse is not over the handler the element cannot be dragged", function() {
            var draggedElement = element.children().eq(0).find("p"),
                draggableOffset = kendo.getOffset(draggedElement);

            element.data("kendoSortable").bind("start", function(e) {
                assert.isOk(false, "start event is not fired");
            });

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 100, 100);

            assert.equal($(".hint").length, 0, "Hint is not appended to the DOM");
            assert.equal(element.children().length, 4, "Placeholder is not appended to the sortable container");
            assert.isOk(draggedElement.is(":visible"), "Draggable element is not hidden");
        });

        it("If mouse is over the handler the element can be dragged", function() {
            var draggedElement = element.children().eq(0).find(".handler"),
                draggableOffset = kendo.getOffset(draggedElement);

            element.data("kendoSortable").bind("start", function(e) {
                assert.isOk(true, "start event is fired");
            });

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 100, 100);

            assert.equal($(".hint").length, 1, "Hint is not appended to the DOM");
            assert.equal(element.children().length, 5, "Placeholder is appended to the sortable container");
            assert.isOk(!draggedElement.is(":visible"), "Draggable element is hidden");
        });
    });

    describe("Sortable - moving by axis", function() {
        beforeEach(function() {
            Mocha.fixture.append(
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
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("Placeholder is moved even of the mouse is outside of the sortable container", function() {
            var draggedElement = element.children().eq(0),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetTopCenter = kendo.getOffset(targetElement).top + targetElement.height() / 2;

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 100, targetTopCenter + 1);

            assert.equal(targetElement.next()[0], element.getKendoSortable().placeholder[0], "Placeholder is moved");
        });

    });

      describe("Sortable - flexbox sorting", function() {
        beforeEach(function() {
            Mocha.fixture.append(
                '<ul style="display:flex" id="sortable">' +
                '<li style="width: 50px; margin: 0; height: 18px;">foo</li>' +
                '<li style="width: 50px; margin: 0; height: 18px;">bar</li>' +
                '<li style="width: 50px; margin: 0; height: 18px;">baz</li>' +
                '<li style="width: 50px; margin: 0; height: 18px;">qux</li>' +
                '</ul>'
            );

            element = $("#sortable");
        });
        afterEach(function() {
            kendo.destroy(Mocha.fixture);
        });

        it("widget creates draggable component", function() {
            element.kendoSortable();
            assert.isOk(element.data("kendoDraggable") instanceof Draggable);
        });

        it("placeholder is inserted before dragged element on dragstart", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.equal(element.children().length, 5, "placeholder is attached to the sortable element");
            assert.equal(draggedElement.text(), draggedElement.prev().text(), "placeholder is attached before draggedElement");
            assert.equal(sortable.placeholder.css("visibility"), "hidden", "placeholder element have visibility: hidden");
        });

        it("the dragged element is hidden on dragstart", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.isOk(!draggedElement.is(":visible"), "draggedElement is hidden");
        });

        it("placeholder is removed and dragged element is shown on dragcancel", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable().data("kendoSortable"),
                initialChildrenCount = element.children().length;

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );
            triggerDraggableEvent("dragcancel", {}, element);

            assert.isOk(draggedElement.is(":visible"), "draggedElement is shown");
            assert.isOk(initialChildrenCount === element.children().length, "placeholder element is removed");
        });

        it("placeholder is moved while user drags", function() {
            var draggedElement = element.children().eq(0),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left + 26, targetOffset.top); // 26 number comes from half width + 1px

            assert.equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

            targetElement = element.children().last();
            targetOffset = kendo.getOffset(targetElement);

            move(draggedElement, targetOffset.left + 26, targetOffset.top); // 26 number comes from half width + 1px
            assert.equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
        });

        it("placeholder is moved while cursor enters in the target area (moveOnEnter)", function() {
            var draggedElement = element.children().eq(0),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            sortable.setOptions({ moveOnDragEnter: true });

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(sortable.placeholder.index(), 2, "placeholder is moved under the element under cursor");

            targetElement = element.children().last();
            targetOffset = kendo.getOffset(targetElement);

            move(draggedElement, targetOffset.left, targetOffset.top);
            assert.equal(sortable.placeholder.index(), 4, "placeholder changes its position while the draggedElement moves");
        });

        it("placeholder is not moved if item is dragged outside of the sortable container", function() {
            var draggedElement = element.children().eq(1),
                draggableOffset = kendo.getOffset(draggedElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, 500, 500);

            assert.equal(sortable.placeholder.index(), 1, "placeholder position does not change");
        });

        it("item is sorted correctly on dragend", function() {
            var draggedElement = element.children().eq(3),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);
            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.index(), 1, "draggedElement changes its position");
        });

        it("item is placed at the last valid position even if item is released outside of the sortable container", function() {
            var draggedElement = element.children().eq(2),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(3),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable().data("kendoSortable");

            //simulate press to trigger draggable's hint initialization
            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left + 26, targetOffset.top); // 26 number comes from half width + 1px
            move(draggedElement, 500, 500);
            release(draggedElement, 500, 500);

            assert.equal(draggedElement.index(), 3, "draggedElement is placed at the last valid position");
        });

        it("cursor changes on drag start and is reset on dragcancel", function() {
            var draggedElement = element.children().eq(0),
                sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

            triggerDraggableEvent(
                "dragstart",
                { currentTarget: draggedElement, target: draggedElement },
                element
            );

            assert.equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

            triggerDraggableEvent("dragcancel", {}, element);

            assert.equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
        });

        it("cusor changes on drag start and is reset on dragend", function() {
            var draggedElement = element.children().eq(3),
                draggableOffset = kendo.getOffset(draggedElement),
                targetElement = element.children().eq(1),
                targetOffset = kendo.getOffset(targetElement),
                sortable = element.kendoSortable({ cursor: "move" }).data("kendoSortable");

            press(draggedElement, draggableOffset.left, draggableOffset.top);
            move(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.css("cursor"), "move", "Cursor is changed to move");

            release(draggedElement, targetOffset.left, targetOffset.top);

            assert.equal(draggedElement.css("cursor"), "auto", "Cusror is reset back to auto");
        });
    });

}());
