(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        keys = kendo.keys,
        FOCUSED_CLASS = "k-state-focused",
        DOT = ".",
        TRANSFER_TO = "transferTo",
        TRANSFER_FROM = "transferFrom",
        TRANSFER_ALL_TO = "transferAllTo",
        TRANSFER_ALL_FROM = "transferAllFrom",
        MOVE_UP = "moveUp",
        MOVE_DOWN = "moveDown";
    var TABINDEX = "tabindex"
    var wrapper;
    var listbox;

    describe("ListBox - navigation", function() {
        beforeEach(function() {

            var element = $('<select id="listA"></select>').appendTo(Mocha.fixture);

            listA = element.kendoListBox({
                dataSource: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8", "Item9", "Item10"],
                selectable: "multiple",
                navigatable: true,
                reorderable: true,
                toolbar: {
                    tools: ["moveDown"]
                }
            }).getKendoListBox();
            $(document.body).append(Mocha.fixture);
        });
        afterEach(function() {
            if (listA) {
                listA.destroy();
            }
            kendo.destroy(Mocha.fixture);
        });

        it("Navigatable is true by default", function() {
            assert.isOk(kendo.ui.ListBox.prototype.options.navigatable === true);
        });

        it("List element has tab index", function() {
            assert.isOk(!isNaN(listA._getList().attr("tabindex")));
        });

        it("enabled tool should be focusable", function() {
            listA.select(listA.items().first());

            var tool = getToolElement(listA, MOVE_DOWN);

            assert.equal(tool.attr(TABINDEX), undefined);
        });

        it("disabled tool should not be focusable", function() {
            listA.select(listA.items().last());

            var tool = getToolElement(listA, MOVE_DOWN);

            assert.isOk(tool.attr(TABINDEX) === "-1");
        });

        it("First item gets focused on keydown if focused item is not present", function() {
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.isOk(listA.wrapper.find(DOT + FOCUSED_CLASS).length === 1);
            assert.isOk(listA.select().length === 1);
        });

        it("Multiple items are selected using shift and down", function() {
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });

            assert.isOk(listA.select().length === 3);
        });

        it("Shift + up/down keys clears previous selection", function() {
            var selectedItemsLength;
            listA.select(listA.items());
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });

            assert.isOk(listA.select().length === 3);
        });

        it("Navigating after selecting with shift clears navigation and selects only current", function() {
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.isOk(listA.select().length === 1);
        });

        it("Multiple items are selected using shift and up", function() {
            listA.focus();
            listA._target = listA.items().last();

            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });

            assert.isOk(listA.select().length === 4);
        });
        ;

        it("Item is correctly deselected using ctrl + space", function() {
            listA.select(listA.items().first());
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.SPACEBAR, ctrlKey: true, preventDefault: $.noop });

            assert.isOk(listA.select().length === 0, "First item is deselected");
        });

        it("Selected items are removed using delete", function() {
            var initialCount = listA.items().length;

            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DELETE, preventDefault: $.noop });


            assert.isOk(listA.items().length === initialCount - 3, "Items are correctly deleted");
        });

        it("MOVE_DOWN is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === MOVE_DOWN);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, ctrlKey: true, preventDefault: $.noop });
        });

        it("MOVE_UP is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === MOVE_UP);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, ctrlKey: true, preventDefault: $.noop });
        });

        it("TRANSFER_ALL_TO is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === TRANSFER_ALL_TO);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.RIGHT, shiftKey: true, ctrlKey: true, preventDefault: $.noop });
        });

        it("TRANSFER_TO is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === TRANSFER_TO);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.RIGHT, ctrlKey: true, preventDefault: $.noop });
        });

        it("TRANSFER_ALL_TO is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === TRANSFER_ALL_FROM);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.LEFT, shiftKey: true, ctrlKey: true, preventDefault: $.noop });
        });

        it("TRANSFER_ALL_TO is correctly called", function() {
            listA._executeCommand = function(param1) {
                assert.isOk(param1 === TRANSFER_FROM);
            }

            listA.focus();
            listA._keyDown({ keyCode: keys.LEFT, ctrlKey: true, preventDefault: $.noop });
        });

        it("Focused item jump over disabled items", function() {
            listA.enable(listA.items().eq(1), false);
            listA.focus();

            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

            assert.isOk(listA.items().eq(2).hasClass("k-state-selected") === true);
        });


        it("Change event is fired only once when initially selecting with shift", function() {
            var calls = 0;
            listA.bind("change", function() {
                calls++;
            });
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            calls = 0;
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            assert.isOk(calls === 1);
        });

        it("Moving backwards with shift and up/down arrow key deselects items", function() {
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
            assert.isOk(listA.select().length === 2);
        });

        it("Navigating upwards when on first item does not change current active item", function() {
            listA.focus();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            listA._keyDown({ keyCode: keys.UP, preventDefault: $.noop });
            assert.isOk(listA._target[0] === listA.items().first()[0]);
        });

        it("Navigating downwards when on last item does not change current active item", function() {
            listA.focus();
            listA._target = listA.items().last();
            listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
            assert.isOk(listA._target[0] === listA.items().last()[0]);
        });
    });

    describe("listbox item focusing", function() {
        beforeEach(function() {
            wrapper = $("<div id='wrapper' style='height: 100px; overflow-y: scroll;'>" +
                "<select id='listBox' style='height: 300px;'></select>" +
                "</div>").appendTo(Mocha.fixture);

            listbox = Mocha.fixture.find("#listBox").kendoListBox({
                dataSource: ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8", "Item9", "Item10"],
                navigatable: true
            }).getKendoListBox();

            $(document.body).append(Mocha.fixture);
        });
        afterEach(function() {
            if (listbox) {
                listbox.destroy();
            }
            kendo.destroy(Mocha.fixture);
        });

        it("selecting an item focuses it", function() {
            listbox.wrapper.find(".k-list").find(".k-item").first().click();

            assert.equal(kendo._activeElement(), listbox.wrapper.find(".k-list")[0]);
        });

        it("selecting an item does not scroll the listbox", function() {
            listbox.wrapper.scrollTop(listbox.wrapper[0].scrollHeight);
            var initialScrollTop = listbox.wrapper.scrollTop();

            listbox.wrapper.find(".k-list").find(".k-item").last().click();

            assert.equal(initialScrollTop, wrapper.scrollTop());
        });

        it("selecting an item does not scroll the wrapper", function() {
            wrapper.scrollTop(wrapper[0].scrollHeight);
            listbox.wrapper.scrollTop(listbox.wrapper[0].scrollHeight);
            var initialScrollTop = wrapper.scrollTop();

            listbox.wrapper.find(".k-list").find(".k-item").last().click();

            assert.equal(initialScrollTop, wrapper.scrollTop());
        });
    });
}());
