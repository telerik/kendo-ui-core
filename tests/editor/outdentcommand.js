(function(){

var editor;

editor_module("editor outdent command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

function createOutdentCommand(range) {
    var command = new kendo.ui.editor.OutdentCommand({ range: range });
    command.editor = editor;
    return command;
}

test('exec indents', function() {
    var range = createRangeFromText(editor, '<div style="margin-left:30px;">|foo|</div>');
    var command = createOutdentCommand(range);
    command.exec();
    equal(editor.value(), '<div>foo</div>');
});

test('undo removes margin', function() {
    var range = createRangeFromText(editor, '<div style="margin-left:30px;">|foo|</div>');
    var command = createOutdentCommand(range);
    command.exec();
    command.undo();

    equal(editor.value(), '<div style="margin-left:30px;">foo</div>');
});

test('redo indents', function() {
    var range = createRangeFromText(editor, '<div style="margin-left:30px;">|foo|</div>');
    var command = createOutdentCommand(range);
    command.exec();
    command.undo();
    command.exec();

    equal(editor.value(), '<div>foo</div>');
});

test('tool is initially disabled', function() {
    editor.value('foo');
    editor.focus();
    editor.trigger('select');
    ok($('.k-outdent').parent().hasClass('k-state-disabled'));
});

test('tool is enabled when cursor is inside block node with marginLeft', function() {
    var range = createRangeFromText(editor, '<p style="margin-left:10px">|foo|</p>');
    editor.selectRange(range);
    editor.focus();
    editor.trigger('select');
    ok(!$('.k-outdent').parent().hasClass('k-state-disabled'));
});

test('tool is enabled for nested list item', function() {
    var range = createRangeFromText(editor, '<ul><li>bar<ul><li>f|o|o</li></ul></li></ul>');
    editor.selectRange(range);
    editor.focus();
    editor.trigger('select');
    ok(!$('.k-outdent').parent().hasClass('k-state-disabled'));
});

test('tool is disabled for first-level lists', function() {
    var range = createRangeFromText(editor, '<ul><li>|foo|</li></ul>');
    editor.selectRange(range);
    editor.focus();
    editor.trigger('select');
    ok($('.k-outdent').parent().hasClass('k-state-disabled'));
});

test('tool is enabled for first-level lists with marginLeft', function() {
    var range = createRangeFromText(editor, '<ul style="margin-left:30px;"><li>|foo|</li></ul>');
    editor.selectRange(range);
    editor.focus();
    editor.trigger('select');
    ok(!$('.k-outdent').parent().hasClass('k-state-disabled'));
});

}());
