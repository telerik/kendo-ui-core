(function(){

var editor;

editor_module("editor selection", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

function selectTextNodeContents(node, start, end)
{
    if (window.getSelection)
    {
        var range = editor.createRange();
        range.setStart(node, start || 0);
        range.setEnd(node, end || node.nodeValue.length);
        editor.getSelection().removeAllRanges();
        editor.getSelection().addRange(range);
    } else {
        var textRange = editor.document.body.createTextRange();

        var startPoint = textRange.duplicate();
        startPoint.moveToElementText(node.parentNode);
        if (start)
            startPoint.moveStart('character', start);
        textRange.setEndPoint('StartToStart', startPoint);

        var endPoint = textRange.duplicate();
        endPoint.moveToElementText(node.parentNode);
        if (end) {
            endPoint.moveStart('character', end);
            textRange.setEndPoint('EndToStart', endPoint);
        } else {
            textRange.setEndPoint('EndToEnd', endPoint);
        }

        textRange.select();
    }
}

function selectRange(start, startOffset, end, endOffset, endChars) {
    if (window.getSelection) {
        var range = editor.createRange();
        range.setStart(start, startOffset);
        range.setEnd(end, endOffset);
        var selection = editor.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        var textRange = editor.document.body.createTextRange();

        var startPoint = textRange.duplicate();
        startPoint.moveToElementText(start.parentNode);
        startPoint.moveStart('character', startOffset);
        textRange.setEndPoint('StartToStart', startPoint);

        var endPoint = textRange.duplicate();
        endPoint.moveToElementText(end.parentNode);
        endPoint.moveStart('character', endChars || endOffset);
        textRange.setEndPoint('EndToStart', endPoint);

        textRange.select();
    }
}

test('getSelection returns selection like object', function() {
    var selection = editor.getSelection();

    ok(undefined !== selection);
    ok(undefined !== selection.getRangeAt);
    ok(undefined !== selection.removeAllRanges);
    ok(undefined !== selection.addRange);
});

function selectAndGet(range) {
    var selection = editor.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    return selection.getRangeAt(0);
}

test('addRange with text range', function() {
    editor.value('foo');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 2);

    range = selectAndGet(range);

    equal(range.startContainer, editor.body.firstChild);
    equal(range.startOffset, 1);
    equal(range.endContainer, editor.body.firstChild);
    equal(range.endOffset, 2);
});

test('addRange with collapsed range', function() {
    editor.value('<strong>foo</strong>bar');

    var range = editor.createRange();
    var bar = editor.body.childNodes[1];
    range.setStart(bar, 2);
    range.setEnd(bar, 2);

    range = selectAndGet(range);

    equal(range.startContainer, bar);
    equal(range.startOffset, 2);
    equal(range.endContainer, bar);
    equal(range.endOffset, 2);
});

test('addRange with text to element range', function() {
    editor.value('<strong>foo</strong>bar baz');

    var range = editor.createRange();
    var barbaz = editor.body.childNodes[1];
    range.setStart(barbaz, 0);
    range.setEnd(barbaz, 5);

    range = selectAndGet(range);

    equal(range.startContainer, barbaz);
    equal(range.startOffset, 0);
    equal(range.endContainer, barbaz);
    equal(range.endOffset, 5);
});

test('addRange with collapsed range at start of element', function() {
    editor.value('<p>foo</p><p>bar</p>');

    var range = editor.createRange();
    var bar = editor.body.childNodes[1].firstChild;
    range.setStart(bar, 0);
    range.setEnd(bar, 0);

    range = selectAndGet(range);

    equal(range.startContainer, bar);
    equal(range.startOffset, 0);
    equal(range.endContainer, bar);
    equal(range.endOffset, 0);
});

test('getRangeAt on selection of single text node', function() {
    editor.value('foo');
    var textNode = editor.body.firstChild;

    selectTextNodeContents(textNode);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, textNode);
    equal(range.startOffset, 0);
    equal(range.endContainer, textNode);
    equal(range.endOffset, 3);
});

test('getRangeAt on selection of part of text node', function() {
    editor.value('foo');
    var textNode = editor.body.firstChild;

    selectTextNodeContents(textNode, 1, 2);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, textNode);
    equal(range.startOffset, 1);
    equal(range.endContainer, textNode);
    equal(range.endOffset, 2);
});

test('getRangeAt on selection with end points in text node and tag', function() {
    editor.value('fo<em>obar</em>');

    var fo = editor.body.firstChild;
    var obar = editor.body.childNodes[1].firstChild;
    selectRange(fo, 1, obar, 2);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, fo);
    equal(range.startOffset, 1);
    equal(range.endContainer, obar);
    equal(range.endOffset, 2);
});

test('getRangeAt on selection with end points in tag and text node', function() {
    editor.value('<em>foob</em>ar');

    var foob = editor.body.firstChild.firstChild;
    var ar = editor.body.childNodes[1];
    selectRange(foob, 2, ar, 1, 5);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, foob);
    equal(range.startOffset, 2);
    equal(range.endContainer, ar);
    equal(range.endOffset, 1);
});

test('getRangeAt on selection with end points in the middle of different tags', function() {
    editor.value('<em>foo</em><strong>bar</strong>');

    var foo = editor.body.firstChild.firstChild;
    var bar = editor.body.childNodes[1].firstChild;
    selectRange(foo, 1, bar, 2);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, foo);
    equal(range.startOffset, 1);
    equal(range.endContainer, bar);
    equal(range.endOffset, 2);
});

test('getRangeAt on selection with end points in the middle of different text nodes', function() {
    editor.value('fo<em>ob</em>ar');

    var fo = editor.body.firstChild;
    var ar = editor.body.childNodes[2];
    selectRange(fo, 1, ar, 1, 5);

    var range = editor.getSelection().getRangeAt(0);

    equal(range.startContainer, fo);
    equal(range.startOffset, 1);
    equal(range.endContainer, ar);
    equal(range.endOffset, 1);
});

test('getRangeAt on collapsed selection at end of paragraph', function() {
    editor.value('<p>foo</p>');

    var range = editor.createRange();

    range.setStart(editor.body.firstChild.firstChild, 3);
    range.collapse(true);

    range = selectAndGet(range);

    ok(range.collapsed);
    equal(range.startOffset, 3);
    equal(range.startContainer, editor.body.firstChild.firstChild);
});

test("selectedHtml returns selected whitespace", function() {
    editor.value("foo bar");

    var range = editor.createRange(),
        node = editor.document.body.firstChild;

    range.setStart(node, 3);
    range.setEnd(node, node.length);

    editor.selectRange(range);

    equal(editor.selectedHtml(), " bar");
});

}());
