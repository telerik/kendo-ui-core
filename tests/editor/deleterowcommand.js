(function(){

var editor;

editor_module("editor delete row command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

var DeleteRowCommand = kendo.ui.editor.DeleteRowCommand;

function execDeleteRowCommand(options) {
    var command = new DeleteRowCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range;

test("exec creates row below cursor", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr><tr><td>bar</td></tr></table>");

    execDeleteRowCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td").length, 1);
    equal(dom.find("td").text(), "bar");
});

test("deleting last row removes table", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execDeleteRowCommand({ range:range });

    equal(editor.value(), "");
});

test("deleting last row focuses next paragraph", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table><p>bar</p>");

    execDeleteRowCommand({ range:range });

    editor.getRange().insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<p><a></a>bar</p>");
});

test("deleting last row focuses previous paragraph, if table was at end of document", function() {
    range = createRangeFromText(editor, "<p>bar</p><table><tr><td>f||oo</td></tr></table>");

    execDeleteRowCommand({ range:range });

    editor.getRange().insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<p><a></a>bar</p>");
});

test("selection is moved to bottom row after deleting a row", function() {
    range = createRangeFromText(editor, "<table><tr><td>|foo|</td></tr><tr><td>bar</td></tr></table>");

    execDeleteRowCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>bar</td></tr></tbody></table>");
});

test("selection is moved to top row after deleting last row", function() {
    range = createRangeFromText(editor, "<table><tr><td>foo</td></tr><tr><td>b||ar</td></tr></table>");

    execDeleteRowCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>foo</td></tr></tbody></table>");
});

test("selection algorithm skips whitespace nodes", function() {
    range = createRangeFromText(editor, "<table><tr><td>foo</td></tr>  <tr><td>b||ar</td></tr></table>");

    execDeleteRowCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>foo</td></tr></tbody></table>");
});

}());
