(function(){

var editor;

var impl = kendo.ui.editor.RangeUtils;

editor_module("editor expand range", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
}, { value: "foo" });

function expandRange(range) {
    var marker = new kendo.ui.editor.Marker(range);
    marker.addCaret(range);
    return impl.expand(range);
}

test('expandRange selects node contents', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.lastChild);
    equal(range.startOffset, 0);
    equal(range.endOffset, 2);
});

test('expandRange selects word', function() {
    editor.value('foo bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 0);
    equal(range.endOffset, 2);
});

test('expandRange stops at tab', function() {
    editor.value('foo\tbar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 0);
    equal(range.endOffset, 2);
});

test('expandRange stops at nbsp', function() {
    editor.value('foo&nbsp;&nbsp;bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 0);
    equal(range.endOffset, 2);
});

test('expandRange does not stop at unicode characters', function() {
    editor.value('fooщbar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.lastChild);
    equal(range.startOffset, 0);
    equal(range.endOffset, 6);
});

test('expandRange stops at exclamation mark', function() {
    editor.value('foo!bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);
    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 0);
    equal(range.endOffset, 2);
});

test('expandRange detects word boundary before caret', function() {
    editor.value('foo bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 5);
    range.setEnd(editor.body.firstChild, 5);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 4);
    equal(range.endOffset, 2);
});

test('expandRange detects word boundary before and after caret', function() {
    editor.value('foo bar baz');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 5);
    range.setEnd(editor.body.firstChild, 5);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.childNodes[2]);
    equal(range.startOffset, 4);
    equal(range.endOffset, 2);
});

test('expandRange does not expand at end of node', function() {
    editor.value('<strong>foo</strong>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 3);
    range.collapse(true);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.firstChild);
    equal(range.startOffset, 1);
    equal(range.endOffset, 2);
});

test('expandRange does not crash in empty node', function() {
    editor.value('<strong></strong>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild);

    range = expandRange(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.endContainer, editor.body.firstChild);
    equal(range.startOffset, 0);
    equal(range.endOffset, 1);
});

test('expandRange does not crash between element nodes', function() {
    editor.value('<span></span><span></span>');
    var range = editor.createRange();
    range.setStart(editor.body, 1);
    range.collapse(true);

    range = expandRange(range);

    equal(range.startContainer, editor.body);
    equal(range.endContainer, editor.body);
    equal(range.startOffset, 1);
    equal(range.endOffset, 2);
});

test('isExpandable returns false for start word boundary', function() {
    editor.value('foo bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.setEnd(editor.body.firstChild, 3);

    ok(!impl.isExpandable(range));
});

test('isExpandable returns false for end word boundary', function() {
    editor.value('foo bar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 4);
    range.setEnd(editor.body.firstChild, 4);

    ok(!impl.isExpandable(range));
});

test('isExpandable returns false for end of content', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.setEnd(editor.body.firstChild, 3);

    ok(!impl.isExpandable(range));
});

test('isExpandable returns false for beginning of content', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.setEnd(editor.body.firstChild, 0);

    ok(!impl.isExpandable(range));
});

test('isExpandable returns false when range is empty', function() {
    editor.value('foo');
    var range = editor.createRange();

    ok(!impl.isExpandable(range));
});

test('isExpandable returns false when in empty node', function() {
    editor.value('<strong></strong>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild);

    ok(!impl.isExpandable(range));
});

}());
