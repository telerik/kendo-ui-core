(function(){

var editor;

var GenericCommand = kendo.ui.editor.GenericCommand,
    RestorePoint = kendo.ui.editor.RestorePoint;

editor_module("editor generic command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

test('generic command undo returns old contents', function() {
    editor.value('foo');

    var range = editor.createRange();

    range.selectNodeContents(editor.body);

    var startRestorePoint = new RestorePoint(range);
    editor.value('');
    var endRestorePoint = new RestorePoint(range);

    var command = new GenericCommand(startRestorePoint, endRestorePoint);
    command.editor = editor;
    command.undo();

    equal(editor.value(), 'foo');
});

test('generic command redo sets new contents', function() {
    editor.value('foo');

    var range = editor.createRange();

    range.selectNodeContents(editor.body);

    var startRestorePoint = new RestorePoint(range);
    editor.value('');
    var endRestorePoint = new RestorePoint(range);

    var command = new GenericCommand(startRestorePoint, endRestorePoint);
    command.editor = editor;
    command.undo();
    command.redo();
    equal(editor.value(), '');
});

test('generic command undo restores selection', function() {
    editor.value('foo');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 2);

    var restorePoint = new RestorePoint(range);
    editor.value('');

    var command = new GenericCommand(restorePoint, restorePoint);
    command.editor = editor;
    command.undo();
    var selectedRange = editor.getRange();
    equal(selectedRange.startOffset, 1);
    equal(selectedRange.endOffset, 2);
    equal(selectedRange.startContainer, editor.body.firstChild);
    equal(selectedRange.endContainer, editor.body.firstChild);
});

test('generic command redo restores selection', function() {
    editor.value('foo');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 2);

    var restorePoint = new RestorePoint(range);

    var command = new GenericCommand(restorePoint, restorePoint);
    command.editor = editor;

    command.redo();

    var selectedRange = editor.getRange();
    equal(selectedRange.startOffset, 1);
    equal(selectedRange.endOffset, 2);
    equal(selectedRange.startContainer, editor.body.firstChild);
    equal(selectedRange.endContainer, editor.body.firstChild);
});

}());
