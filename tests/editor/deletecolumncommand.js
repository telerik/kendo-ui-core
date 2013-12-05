(function(){

var editor;

editor_module("editor delete column command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

var DeleteColumnCommand = kendo.ui.editor.DeleteColumnCommand;

function execDeleteColumnCommand(options) {
    var command = new DeleteColumnCommand(options);
    command.editor = editor;
    command.exec();

    return command;
}

var range;

test("exec removes column under cursor", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td><td>bar</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    var dom = $(editor.value());

    equal(dom.find("tr").length, 1);
    equal(dom.find("td").length, 1);
    equal(dom.find("td").text(), "bar");
});

test("deleting last column removes table", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    equal(editor.value(), "");
});

test("deleting last column focuses next paragraph", function() {
    range = createRangeFromText(editor, "<table><tr><td>f||oo</td></tr></table><p>bar</p>");

    execDeleteColumnCommand({ range:range });

    editor.getRange().insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<p><a></a>bar</p>");
});

test("deleting last row focuses previous paragraph, if table was at end of document", function() {
    range = createRangeFromText(editor, "<p>bar</p><table><tr><td>f||oo</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    editor.getRange().insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<p><a></a>bar</p>");
});

test("selection is moved to next column after deleting a column", function() {
    range = createRangeFromText(editor, "<table><tr><td>|foo|</td><td>bar</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>bar</td></tr></tbody></table>");
});

test("selection is moved to previous column after deleting last column", function() {
    range = createRangeFromText(editor, "<table><tr><td>foo</td><td>b||ar</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>foo</td></tr></tbody></table>");
});

test("selection algorithm skips whitespace nodes", function() {
    range = createRangeFromText(editor, "<table><tr><td>foo</td>  <td>b||ar</td></tr></table>");

    execDeleteColumnCommand({ range:range });

    range = editor.getRange();

    range.insertNode(editor.document.createElement("a"));

    equal(editor.value(), "<table><tbody><tr><td><a></a>foo</td></tr></tbody></table>");
});

}());
