(function(){

var editor;

editor_module("editor link command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        QUnit.fixture.append('<textarea id="inline"></textarea>');
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

function createListCommand(options) {
    var command = new kendo.ui.editor.ListCommand(options);
    command.editor = editor;

    return command;
}

test('exec adds list', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createListCommand({tag:'ul', range:range});
    command.exec();
    equal(editor.value(), '<ul><li>foo</li></ul>');
});

test('undo removes list', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createListCommand({tag:'ul', range:range});
    command.exec();
    command.undo();

    equal(editor.value(), 'foo');
});

test('redo adds list', function() {
    var range = createRangeFromText(editor, '|foo|');
    var command = createListCommand({ tag: 'ul', range: range });
    command.exec();
    command.undo();
    command.exec();

    equal(editor.value(), '<ul><li>foo</li></ul>');
});

test('exec with collapsed range', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    var command = createListCommand({ tag: 'ul', range: range });
    command.exec();

    equal(editor.value(), '<ul><li>foo</li></ul>');
});

test('apply on block element which is adjacent to list merges it with the list when the list is selected', function() {
    var range = createRangeFromText(editor, '|<ul><li>foo</li></ul><p>bar</p>|');
    var command = createListCommand({ tag: 'ul', range: range });
    command.exec();
    equal(editor.value(), '<ul><li>foo</li><li>bar</li></ul>');
});

test('exec keeps selection', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    var command = createListCommand({ tag: 'ul', range: range });
    command.exec();
    range = editor.getRange();
    equal(range.startContainer, editor.body.firstChild.firstChild.firstChild);
    equal(range.startOffset, 1);
    ok(range.collapsed);
});

test('apply and cursor', function() {
    editor.value('foo<ul><li>bar</li></ul>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createListCommand({ tag: 'ul', range: range });
    command.exec();
    equal(editor.value(), '<ul><li>foo</li><li>bar</li></ul>');
});

test('exec puts cursor in empty li', function() {
    editor.value('');
    editor.focus();
    var command = createListCommand({ tag: 'ul', range: editor.getRange() });
    command.exec();
    editor.getRange().insertNode(editor.document.createElement('a'));
    equal(editor.value(), '<ul><li><a></a></li></ul>');
});

test("exec does not replace inline editor container", function() {
    var inline = new kendo.ui.Editor("#inline");
    inline.value('foo');
    var range = inline.createRange();
    range.setStart(inline.body.firstChild, 1);
    range.setEnd(inline.body.firstChild, 1);
    inline.selectRange(range);

    var command = createListCommand({ tag: 'ul', range: inline.getRange() });
    command.exec();

    equal(inline.value(), "<ul><li>foo</li></ul>");
});
}());
