(function(){

var editor;

var FormatCommand = kendo.ui.editor.FormatCommand;

editor_module("editor format command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
});

var boldTool = kendo.ui.Editor.defaultTools.bold;

function getBoldCommand(range) {
    var command = boldTool.command({range:range});
    command.editor = editor;

    return command;
}

test('undo restores original content', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    var command = getBoldCommand(range);
    command.exec();
    equal(editor.value(), '<strong>foo</strong>');
    command.undo();
    equal(editor.value(), 'foo');
});

test('undo restores selection', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 2);

    var command = getBoldCommand(range);
    command.exec();
    command.undo();

    var selectionRange = editor.getRange();
    equal(selectionRange.startOffset, 1);
    equal(selectionRange.endOffset, 2);
    equal(selectionRange.startContainer, editor.body.firstChild);
    equal(selectionRange.endContainer, editor.body.firstChild);
});

test('redo executes the command', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    var command = getBoldCommand(range);
    command.exec();
    equal(editor.value(), '<strong>foo</strong>');
    command.undo();
    equal(editor.value(), 'foo');
    command.exec();
    equal(editor.value(), '<strong>foo</strong>');
});

test('fontName exec', function() {
    var range = createRangeFromText(editor, '|foo|');
    editor.selectRange(range);
    editor.exec('fontName', {value: 'Arial'});
    equal(editor.value(), '<span style="font-family:Arial;">foo</span>');
});

test('fontSize exec', function() {
    var range = createRangeFromText(editor, '|foo|');
    editor.selectRange(range);
    editor.exec('fontSize', {value: '8pt'});
    equal(editor.value(), '<span style="font-size:8pt;">foo</span>');
});

test('foreColor exec', function() {
    var range = createRangeFromText(editor, '|foo|');
    editor.selectRange(range);
    editor.exec('foreColor', {value: '#a0b0c0'});
    equal(editor.value(), '<span style="color:#a0b0c0;">foo</span>');
});

test('backColor exec', function() {
    var range = createRangeFromText(editor, '|foo|');
    editor.selectRange(range);
    editor.exec('backColor', {value: '#a0b0c0'});
    equal(editor.value(), '<span style="background-color:#a0b0c0;">foo</span>');
});

}());
