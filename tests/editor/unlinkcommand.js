(function(){

var editor;

var UnlinkCommand = kendo.ui.editor.UnlinkCommand;

editor_module("editor table command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

function execUnlinkCommand(range) {
    var command = new UnlinkCommand({ range: range });
    command.editor = editor;
    command.exec();
}

test('exec removes link', function() {
    var range = createRangeFromText(editor, '<a>|foo|</a>');

    execUnlinkCommand(range);

    equal(editor.value(), 'foo');
});

test('exec removes link with mixed selection', function() {
    var range = createRangeFromText(editor, '|foo<a>bar</a>baz|');

    execUnlinkCommand(range);

    equal(editor.value(), 'foobarbaz');
});

test('exec maintains selection', function() {
    var range = createRangeFromText(editor, '<a>|foo|</a>');

    execUnlinkCommand(range);

    range = editor.getRange();
    equal(range.startOffset, 0);
    equal(range.endOffset, 3);
});

test('exec from cursor', function() {
    editor.value('<a>foo</a>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 1);
    range.collapse(true);

    execUnlinkCommand(range);

    equal(editor.value(), 'foo');
});

test('unlink tool is initially disabled', function() {
    editor.focus();
    var range = createRangeFromText(editor, '|foo|');
    editor.selectRange(range);
    editor.trigger('select');
    ok(editor.toolbar.element.find('.k-unlink').parent().hasClass('k-state-disabled'));
});

test('unlink tool is enabled when cursor is inside a link', function() {
    editor.focus();
    var range = createRangeFromText(editor, '<a>|foo|</a>');
    editor.selectRange(range);

    editor.trigger('select');
    ok(!editor.toolbar.element.find('.k-unlink').parent().hasClass('k-state-disabled'));
});

test('unlink tool is enabled when there is a link in the selection', function() {
    editor.focus();
    var range = createRangeFromText(editor, '|foo<a>bar</a>baz|');
    editor.selectRange(range);

    editor.trigger('select');
    ok(!editor.toolbar.element.find('.k-unlink').parent().hasClass('k-state-disabled'));
});

}());
