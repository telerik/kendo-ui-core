(function(){

var editor;

editor_module("editor clipboard", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

function pasteIn(target, initialContent, content) {
    target = target || editor;

    if (initialContent.indexOf("|") >= 0) {
        target.selectRange(createRangeFromText(target, initialContent));
    } else {
        target.value(initialContent);
    }

    target.clipboard.paste(content);
}

test("paste empty content", function() {
    pasteIn(editor, 'fo||o', '');

    var range = editor.getRange();
    equal(editor.value(), 'foo');
    equal(range.startOffset, 2);
    equal(range.startContainer, editor.body.firstChild);
    ok(range.collapsed);
});

test("paste text inserts it at caret position", function() {
    pasteIn(editor, 'fo||o', 'bar');

    var range = editor.getRange();
    equal(editor.value(), 'fobaro');
    equal(range.startOffset, 5);
    equal(range.startContainer, editor.body.firstChild);
    ok(range.collapsed);
});

test("paste inline inserts it at caret position", function() {
    pasteIn(editor, 'fo||o', 'bar<strong>baz</strong>');

    equal(editor.value(), 'fobar<strong>baz</strong>o');
});

test("paste inline in inline", function() {
    pasteIn(editor, '<strong>fo||o</strong>', '<em>baz</em>');

    equal(editor.value(), '<strong>fo</strong><em>baz</em><strong>o</strong>');
});

test("paste deletes contents", function() {
    pasteIn(editor, '<strong>|foo|</strong>', 'bar');

    equal(editor.value(), 'bar');
});

test("paste single block in inline", function() {
    pasteIn(editor, '<strong>fo||o</strong>', '<div>bar</div>');

    equal(editor.value(), '<strong>fo</strong><div>bar</div><strong>o</strong>');
});

test("paste block in paragraph splits the paragraph", function() {
    pasteIn(editor, '<p>fo||o</p>', '<div>bar</div>');

    equal(editor.value(), '<p>fo</p><div>bar</div><p>o</p>');
});

test("paste block in paragraph which contains inline splits the paragraph", function() {
    pasteIn(editor, '<p><span>fo||o</span></p>', '<div>bar</div>');

    equal(editor.value(), '<p><span>fo</span></p><div>bar</div><p><span>o</span></p>');
});

test("paste inline content in block element does not split", function() {
    pasteIn(editor, '<p>fo||o</p>', 'bar');

    equal(editor.value(), '<p>fobaro</p>');
});

test("paste inline content in block with inline child element splits", function() {
    pasteIn(editor, '<p><span>fo||o</span></p>', 'bar');

    equal(editor.value(), '<p><span>fo</span>bar<span>o</span></p>');
});

test("paste inline content in block with nested inline child element splits", function() {
    pasteIn(editor, '<p><span><strong>fo||o</strong></span></p>', 'bar');

    equal(editor.value(), '<p><span><strong>fo</strong></span>bar<span><strong>o</strong></span></p>');
});

test("paste does not strip empty elements", function() {
    pasteIn(editor, '<p><img />fo||o</p>', 'bar');

    equal(editor.value(), '<p><img />fobaro</p>');
});

test("paste block in li splits ul", function() {
    pasteIn(editor, '<ul><li>fo||o</li></ul>', '<div>bar</div>');

    equal(editor.value(), '<ul><li>fo</li></ul><div>bar</div><ul><li>o</li></ul>');
});

test("paste block in td does not split", function() {
    pasteIn(editor, '<table><tr><td>fo||o</td></tr></table>', '<div>bar</div>');

    equal(editor.value(), '<table><tbody><tr><td>fo<div>bar</div>o</td></tr></tbody></table>');
});

test("paste invalid list markup", function() {
    pasteIn(editor, 'f||oo', '<li>foo</li>');

    equal(editor.value(), 'f<ul><li>foo</li></ul>oo');
});

test("paste multiple lines from notepad", function() {
    pasteIn(editor, 'f||oo', '<div class="k-paste-container">bar</div><div class="k-paste-container">baz</div>');

    equal(editor.value(), 'fbar<br />bazoo');
});

test("paste of special characters", function() {
    pasteIn(editor, "", "π");

    equal(editor.value(), '&pi;');
});

test("paste in root of inline editor does not replace its body", function() {
    QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
    var inline = new kendo.ui.Editor("#inline", { tools: [] });

    pasteIn(inline, 'f||oo', '<p>bar</p>');

    equal(inline.value(), 'f<p>bar</p>oo');
});

test("paste list in root of inline editor within list", function() {
    QUnit.fixture.append('<ul><li><div id="inline" contentEditable="true"></div></li></ul>');
    var inline = new kendo.ui.Editor("#inline", { tools: [] });

    pasteIn(inline, '||', '<ul><li>bar</li></ul>');

    equal(inline.value(), '<ul><li>bar</li></ul>');
});

test("paste of table adds k-table class", function() {
    pasteIn(editor, 'fo||o', '<table><tr><td>foo</td></tr></table>');

    ok($("table", editor.body).hasClass("k-table"));
});

test("paste of nested table adds k-table class", function() {
    pasteIn(editor, 'fo||o', '<div><table><tr><td>foo</td></tr></table></div>');

    ok($("table", editor.body).hasClass("k-table"));
});

test("fix tag nesting", function() {
    var clipboard = editor.clipboard;
    equal(clipboard._fixTagNesting("<p>foo"), "<p>foo</p>");
    equal(clipboard._fixTagNesting("foo</p>"), "foo");
    equal(clipboard._fixTagNesting("<p>foo</b></p>"), "<p>foo</p>");
    equal(clipboard._fixTagNesting("<p>foo</b></b></p></i>"), "<p>foo</p>");
    equal(clipboard._fixTagNesting("<p><b>foo</p>"), "<p><b>foo</b></p>");
    equal(clipboard._fixTagNesting("<p><b>foo</b></b></p>"), "<p><b>foo</b></p>");
    equal(clipboard._fixTagNesting("<b><p>foo</b></p>"), "<b></b><p>foo</p>");
    equal(clipboard._fixTagNesting("<p data-bar>foo</b></p>"), "<p data-bar>foo</p>");
    equal(clipboard._fixTagNesting(
        "<table><tbody><tr><td>foo</td></tr></tbody></table>"),
        "<table><tbody><tr><td>foo</td></tr></tbody></table>");
    equal(clipboard._fixTagNesting(
        "<table><tbody><tr><td><p>foo</p></td></tr></tbody></table><p>bar</p>"),
        "<table><tbody><tr><td><p>foo</p></td></tr></tbody></table><p>bar</p>");
    equal(clipboard._fixTagNesting(
        "<p>bar</p><table><tbody><tr><td><p>foo</p></td></tr></tbody></table>"),
        "<p>bar</p><table><tbody><tr><td><p>foo</p></td></tr></tbody></table>");
});

}());
