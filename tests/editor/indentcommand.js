(function(){

var IndentCommand = kendo.ui.editor.IndentCommand;

var editor;

editor_module("editor indent command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

function createIndentCommand(range) {
    var command = new IndentCommand({range:range});
    command.editor = editor;
    return command;
}

test('exec indents', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createIndentCommand(range);
    command.exec();
    equal(editor.value(), '<p style="margin-left:30px;">foo</p>');
});

test('undo removes margin', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createIndentCommand(range);
    command.exec();
    command.undo();

    equal(editor.value(), 'foo');
});

test('redo indents', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createIndentCommand(range);
    command.exec();
    command.undo();
    command.exec();

    equal(editor.value(), '<p style="margin-left:30px;">foo</p>');
});

test('indent list', function() {
    editor.focus();
    var range = createRangeFromText(editor, '<ul><li>foo</li><li>|b|ar</li></ul>');
    var command = createIndentCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li>foo<ul><li>bar</li></ul></li></ul>');
});

}());
