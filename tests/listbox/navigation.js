(function() {
    var ListBox = kendo.ui.ListBox,
        listA,
        keys = kendo.keys,
        FOCUSED_CLASS = "k-state-focused",
        DOT = ".",
        TRANSFER_TO = "transferTo",
        TRANSFER_FROM = "transferFrom",
        TRANSFER_ALL_TO = "transferAllTo",
        TRANSFER_ALL_FROM = "transferAllFrom";;

    module("ListBox - navigation", {
        setup: function() {
           
            var element = $('<select id="listA"></select>').appendTo(QUnit.fixture);

            listA  = element.kendoListBox({ 
                    dataSource: [ "Item1", "Item2", "Item3", "Item4", "Item5", "Item6", "Item7", "Item8", "Item9", "Item10"],
                    selectable: "multiple",
                    navigatable: true,
                    reorderable: true
            }).getKendoListBox();
            $(document.body).append(QUnit.fixture);
        },
        teardown: function() {
            if(listA) {
              listA.destroy();
            }
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Navigatable is false by default", 1, function() {
        ok(kendo.ui.ListBox.prototype.options.navigatable === false);
    });

    test("List element has tab index", 1, function() {
        ok(!isNaN(listA._getList().attr("tabindex")));
    });

    test("First item gets focused on keydown if focused item is not present", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });

        ok(listA.wrapper.find(DOT+FOCUSED_CLASS).length === 1);
    });

    test("Multiple items are selected using shift and down", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });

        ok(listA.select().length === 3);
    });

    test("Shift + up/down keys does not clear selection", 1, function() {
        var selectedItemsLength;
        listA.select(listA.items());
        selectedItemsLength = listA.select().length;
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });

        ok(selectedItemsLength === listA.select().length);
    });

    test("Space clears selection and leaves only current item selected", 1, function() {
        listA.select(listA.items());
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.SPACEBAR, preventDefault: $.noop });

        ok(listA.select().length === 1);
    });

    test("Multiple items are selected using shift and up", 1, function() {
        listA.focus();
        listA._target = listA.items().last();
       
        listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.UP, shiftKey: true, preventDefault: $.noop });

        ok(listA.select().length === 4);
    });

    test("Item is correctly selected using space", 1, function() {
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.SPACEBAR, preventDefault: $.noop });

        ok(listA.select().length === 1, "First item is selected");
    });

    test("Item is correctly deselected using ctrl + space", 1, function() {
        listA.select(listA.items().first());
        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.SPACEBAR, ctrlKey:true, preventDefault: $.noop });

        ok(listA.select().length === 0, "First item is deselected");
    });

    test("Selected items are removed using delete", 1, function() {
        var initialCount = listA.items().length;

        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DELETE, preventDefault: $.noop });


        ok(listA.items().length === initialCount - 3, "Items are correctly deleted");
    });

    test("Items are correctly reordered using keyboard", 2, function() {
        var firstItem = listA.dataItem(listA.items().first());

        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, ctrlKey:true, preventDefault: $.noop });

        ok(firstItem === listA.items().first().next().html());

        listA._keyDown({ keyCode: keys.UP, shiftKey: true, ctrlKey:true, preventDefault: $.noop });

        ok(firstItem === listA.items().first().html());
    });

    test("Items are correctly reordered using keyboard", 2, function() {
        var firstItem = listA.dataItem(listA.items().first());

        listA.focus();
        listA._keyDown({ keyCode: keys.DOWN, preventDefault: $.noop });
        listA._keyDown({ keyCode: keys.DOWN, shiftKey: true, ctrlKey:true, preventDefault: $.noop });

        ok(firstItem === listA.items().first().next().html());

        listA._keyDown({ keyCode: keys.UP, shiftKey: true, ctrlKey:true, preventDefault: $.noop });

        ok(firstItem === listA.items().first().html());
    });

    test("TRANSFER_ALL_TO is correctly called", 1, function() {
        listA._executeCommand = function (param1) {
            ok(param1 === TRANSFER_ALL_TO);
        }

        listA.focus();
        listA._keyDown({ keyCode: keys.RIGHT, shiftKey: true, ctrlKey:true, preventDefault: $.noop });
    });

    test("TRANSFER_TO is correctly called", 1, function() {
        listA._executeCommand = function (param1) {
            ok(param1 === TRANSFER_TO);
        }

        listA.focus();
        listA._keyDown({ keyCode: keys.RIGHT, ctrlKey:true, preventDefault: $.noop });
    });

    test("TRANSFER_ALL_TO is correctly called", 1, function() {
        listA._executeCommand = function (param1) {
            ok(param1 === TRANSFER_ALL_FROM);
        }

        listA.focus();
        listA._keyDown({ keyCode: keys.LEFT, shiftKey: true, ctrlKey:true, preventDefault: $.noop });
    });

    test("TRANSFER_ALL_TO is correctly called", 1, function() {
        listA._executeCommand = function (param1) {
            ok(param1 === TRANSFER_FROM);
        }

        listA.focus();
        listA._keyDown({ keyCode: keys.LEFT, ctrlKey:true, preventDefault: $.noop });
    });
})();
