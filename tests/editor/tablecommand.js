(function(){

var editor;
var TableCommand = kendo.ui.editor.TableCommand;

editor_module("editor table command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        editor.focus();
    },
    teardown: function() {
        $(".k-window,.k-overlay").remove();
    }
});

function execTableCommand(options) {
    var command = new TableCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range, command;

test("exec createTable creates table at cursor", function() {
    range = createRangeFromText(editor, 'foo||');

    execTableCommand({ range:range });

    equal(editor.value(), "foo<table><tbody><tr><td></td></tr></tbody></table>");
});

test("exec createTable creates table with given row/columns", function() {
    editor.value("foo");

    range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.collapse(true);

    execTableCommand({ range:range, rows: 1, columns: 2 });

    equal(editor.value(), "<table><tbody><tr><td></td><td></td></tr></tbody></table>foo");
});

function stripAttr(html) {
    return html.replace(/<(\w+)[^>]*>/i, "<$1>");
}

test("empty table cells have the empty element content", function() {
    range = createRangeFromText(editor, '||');

    execTableCommand({ range:range });

    equal(stripAttr(editor.document.getElementsByTagName("td")[0].innerHTML), stripAttr(kendo.ui.editor.emptyElementContent));
});

test("table has k-table class", function() {
    range = createRangeFromText(editor, '||');

    execTableCommand({ range:range });

    equal(editor.document.getElementsByTagName("table")[0].className, "k-table");
});

test("exec splits paragraph", function() {
    range = createRangeFromText(editor, '<p>foo||bar</p>');

    execTableCommand({ range:range });

    equal(editor.value(), "<p>foo</p><table><tbody><tr><td></td></tr></tbody></table><p>bar</p>");
});

test("first cell is focused after insertion", function() {
    range = createRangeFromText(editor, 'foo||');

    execTableCommand({ range:range });

    range = editor.getRange();
    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "foo<table><tbody><tr><td><a></a></td></tr></tbody></table>");
});

test("table holds its position after undo/redo", function() {
    editor.selectRange(createRangeFromText(editor, '<p>foo||bar</p>'));

    editor.exec("createTable");
    editor.exec("undo");

    equal(editor.value(), "<p>foobar</p>");

    editor.exec("redo");

    equal(editor.value().replace(/<br[^>]*>/g, ""), "<p>foo</p><table><tbody><tr><td></td></tr></tbody></table><p>bar</p>");
});

}());
