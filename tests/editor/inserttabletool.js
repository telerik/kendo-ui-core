(function(){

var editor;
var tool;
var dom;
var editorNS = kendo.ui.editor;
var toolTemplate = kendo.template(editorNS.EditorUtils.buttonTemplate, { useWithBlock: false });
var keys = kendo.keys;

module("editor insert table tool", {
    setup: function() {
        kendo.effects.disable();
        tool = new editorNS.InsertTableTool();
        dom = $(toolTemplate({ popup: true, title: "createTable", cssClass: "createTable" }))
            .appendTo(QUnit.fixture);

        $.fn.press = function (key) {
            var options = {
                type: "keydown",
                keyCode: key
            };

            if ($.isPlainObject(key)) {
                $.extend(options, key);
            }

            $(this).trigger(options);
        };
        tool.initialize(dom, { title: "", editor: { exec: $.noop } });
    },
    teardown: function() {
        kendo.effects.enable();
        tool.destroy();
    }
});

test("clicking a cell inserts a table", function() {
    var popup = tool.popup();
    popup.toggle();

    var cell = popup.element.find(".k-ct-cell:first"),
        offset = cell.offset();

    var execArgs;

    withMock(tool._editor, "exec", function() { execArgs = arguments; }, function() {
        cell.trigger({
            type: "mouseup",
            clientX: offset.left + cell.width()/2,
            clientY: offset.top + cell.height()/2
        });

        ok(execArgs);
        equal(execArgs[0], "createTable");
        deepEqual(execArgs[1], { rows: 1, columns: 1 });
    });
});

test("clicking the tool while it is disabled does not toggle the popup", function() {
    dom.addClass("k-state-disabled");

    dom.click();
    equal($(".k-ct-popup:visible").length, 0);

    dom.click();
    equal($(".k-ct-popup:visible").length, 0);
});

test("mouseleave is considered as cancel", function() {
    dom.click();

    var popup = tool.popup();

    popup.element.trigger("mouseleave");

    equal(popup.element.find(".k-ct-cell.k-state-selected").length, 0);
});

test("tool can be opened with the keyboard", function() {
    dom.press({ altKey: true, keyCode: keys.DOWN });

    var element = tool.popup().element;
    ok(element.is(":visible"));
    ok(element.find(".k-ct-cell:first").is(".k-state-selected"));
});

test("tool can be closed with the keyboard", function() {
    dom.press({ keyCode: keys.ESC });

    ok(!tool.popup().element.is(":visible"));
});

function selectedIndices(cells) {
    return $.map(cells, function(element, index) {
        if ($(element).hasClass("k-state-selected")) {
            return index;
        }
    });
}

test("up / down keys control row selection", function() {
    var popup = tool.popup();

    popup.open();

    var cells = popup.element.find(".k-ct-cell");

    dom.press({ keyCode: keys.DOWN });
    deepEqual(selectedIndices(cells), [ 0, 8 ]);

    dom.press({ keyCode: keys.DOWN });
    deepEqual(selectedIndices(cells), [ 0, 8, 16 ]);

    dom.press({ keyCode: keys.UP });
    deepEqual(selectedIndices(cells), [ 0, 8 ]);

    dom.press({ keyCode: keys.UP });
    deepEqual(selectedIndices(cells), [ 0 ]);

    dom.press({ keyCode: keys.UP });
    deepEqual(selectedIndices(cells), [ 0 ]);
});

test("left / right keys control column selection", function() {
    var popup = tool.popup();

    popup.open();

    var cells = popup.element.find(".k-ct-cell");

    dom.press({ keyCode: keys.RIGHT });
    deepEqual(selectedIndices(cells), [ 0, 1 ]);

    dom.press({ keyCode: keys.RIGHT });
    deepEqual(selectedIndices(cells), [ 0, 1, 2 ]);

    dom.press({ keyCode: keys.LEFT });
    deepEqual(selectedIndices(cells), [ 0, 1 ]);

    dom.press({ keyCode: keys.LEFT });
    deepEqual(selectedIndices(cells), [ 0 ]);

    dom.press({ keyCode: keys.LEFT });
    deepEqual(selectedIndices(cells), [ 0 ]);
});

test("enter key triggers createTable command", function() {
    var execArgs;

    withMock(tool._editor, "exec", function() { execArgs = arguments; }, function() {
        dom.press({ keyCode: keys.ENTER });

        ok(execArgs);
        equal(execArgs[0], "createTable");
        deepEqual(execArgs[1], { rows: 1, columns: 1 });
    });
});

}());
