(function(){

var editor;

editor_module("editor new line command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

function createNewLineCommand(range) {
    var command = new kendo.ui.editor.NewLineCommand({ range: range });
    command.editor = editor;
    return command;
}

test("exec inserts br at carret position", function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    var command = createNewLineCommand(range);
    command.exec();
    equal(editor.value(), 'f<br />oo');
});

test("exec moves cursor after br", function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    var command = createNewLineCommand(range);
    command.exec();
    range = editor.getRange();
    range.insertNode(editor.document.createElement('hr'));
    equal(editor.value(), 'f<br /><hr />oo')
});

test("exec replaces selection with br", function() {
    var range = createRangeFromText(editor, 'f|o|o');
    var command = createNewLineCommand(range);
    command.exec();
    equal(editor.value(), 'f<br />o');
});

test("undo removes br", function() {
    var range = createRangeFromText(editor, 'f|o|o');
    var command = createNewLineCommand(range);
    command.exec();
    command.undo();
    equal(editor.value(), 'foo');
});

test("undo leaves normalized content", function() {
    var range = createRangeFromText(editor, 'f|o|o');
    var command = createNewLineCommand(range);
    command.exec();
    command.undo();
    equal(editor.body.childNodes.length, 1);
});

test("redo", function() {
    var range = createRangeFromText(editor, 'f|o|o');
    var command = createNewLineCommand(range);
    command.exec();
    command.undo();
    command.exec();
    equal(editor.value(), 'f<br />o');
});

test("exec on end of line", function() {
    editor.value("foo");
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.collapse(true);

    var command = createNewLineCommand(range);

    command.exec();
    equal(editor.value(), "foo<br />");
});

}());
