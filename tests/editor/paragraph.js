(function(){

var editor;

editor_module("editor paragraph command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

function createParagraphCommand(range) {
    var command = new kendo.ui.editor.ParagraphCommand({ range: range });
    command.editor = editor;
    return command;
}

test('exec wraps the node in paragraph and creates a new paragraph', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>f</p><p>oo</p>');
});

test('exec splits paragraph', function() {
    editor.value('<p>foo</p>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>f</p><p>oo</p>');
});

test('exec splits inline elements', function() {
    editor.value('fo<em>ob</em>ar');
    var range = editor.createRange();
    range.setStart(editor.body.childNodes[1].firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>fo<em>o</em></p><p><em>b</em>ar</p>');
});

test('exec deletes selected content', function() {
    editor.value('foobar');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 5);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>f</p><p>r</p>');
});

test('exec adds paragraph around inline content', function() {
    editor.value('foo<p>bar</p>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>f</p><p>oo</p><p>bar</p>');
});

test('exec creates new li when inside ul', function() {
    editor.value('<ul><li>foo</li></ul>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li>f</li><li>oo</li></ul>');
});

test('exec when inside empty li', function() {
    editor.value('<ul><li></li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.firstChild);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '');
    equal(editor.body.firstChild.nodeName.toLowerCase(), 'p');
});

test('exec when inside empty li and p', function() {
    editor.value('<ul><li><p></p></li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.firstChild.firstChild);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '');
    equal(editor.body.firstChild.nodeName.toLowerCase(), 'p');
});

test('exec creates new li when inside ul and p', function() {
    editor.value('<ul><li><p>foo</p></li></ul>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild.firstChild.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li><p>f</p></li><li><p>oo</p></li></ul>');
});

test('exec when in last li and it is empty', function() {
    editor.value('<ul><li>foo</li><li></li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.lastChild);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li>foo</li></ul><p></p>');
});

test('exec in empty list item preserves line breaks in others', function() {
    editor.value('<ul><li>fo<br />o</li><li></li><li>ba<br />r</li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.childNodes[1]);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li>fo<br />o</li></ul><p></p><ul><li>ba<br />r</li></ul>');
});

test('exec when there is empty li', function() {
    editor.value('<ul><li>foo</li><li></li></ul>');
    var range = editor.createRange();
    range.setStartAfter(editor.body.firstChild.firstChild.firstChild);
    range.setEndAfter(editor.body.firstChild.firstChild.firstChild);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<ul><li>foo</li><li></li><li></li></ul>');
});

test('exec handles li containing br', function() {
    editor.value('<ul><li><br/></li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '');
    equal(editor.body.firstChild.nodeName.toLowerCase(), 'p');
});

test("exec handles li containing BOM nodes", function() {
    editor.value('<ul><li>\ufeff<br/></li></ul>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '');
    equal(editor.body.firstChild.nodeName.toLowerCase(), 'p');
});

test('exec removes br', function() {
    editor.value('foo<br/>bar');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);
    range.collapse(false);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>foo</p><p>bar</p>');
});

test('exec deletes selected inline content', function() {
    editor.value('foo<p>bar</p>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.lastChild.firstChild, 1);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>f</p><p>ar</p>');
});

test('exec deletes all contents', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.selectNodeContents(editor.body);

    var command = createParagraphCommand(range);

    command.exec();
    equal(editor.value(), '<p></p><p></p>');
});

test('exec caret at end of content', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.setEnd(editor.body.firstChild, 3);
    var command = createParagraphCommand(range);
    command.exec();

    if (!kendo.support.browser.msie) {
        var br = editor.body.lastChild.firstChild;
        equal(br.nodeName.toLowerCase(), "br", "bogus br is present in non-ie browsers");
    }

    equal(editor.value(), '<p>foo</p><p></p>');
});

test('undo reverts content', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    command.undo();
    equal(editor.value(), 'foo');
});

test('redo', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();
    command.undo();
    command.exec();

    equal(editor.value(), '<p>f</p><p>oo</p>');
});

test('exec moves caret', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();

    range = editor.getRange();
    range.insertNode(editor.document.createElement('span'));

    equal(editor.value(), '<p>f</p><p><span></span>oo</p>');
});

test('exec at end of text node wraps with paragraph and inserts new paragraph', function() {
    editor.value('<p>foo</p>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 3);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>foo</p><p></p>');
});

test('exec in empty paragraph at middle of text adds more paragraphs', function() {
    editor.value('<p>foo</p><p></p><p>bar</p>');
    var range = editor.createRange();
    range.selectNodeContents(editor.body.childNodes[1]);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();
    equal(editor.value(), '<p>foo</p><p></p><p></p><p>bar</p>');
});

test('exec at start of paragraph leaves selection in paragraph', function() {
    editor.value('<p>foo</p><p>bar</p>');
    var range = editor.createRange();
    range.setStart(editor.body.lastChild, 0);
    range.collapse(true);
    var command = createParagraphCommand(range);
    command.exec();

    range = editor.getRange();

    range.insertNode(editor.document.createElement('a'));

    equal(editor.value(), '<p>foo</p><p></p><p><a></a>bar</p>');
});

test('exec in td', function() {
    var range =  createRangeFromText(editor, '<table><tr><td>|f|oo</td></tr></table>');
    var command = createParagraphCommand(range);
    command.exec();

    equal(editor.value(), '<table><tbody><tr><td><p></p><p>oo</p></td></tr></tbody></table>');
});

function insertCaretAnchor() {
    var range = editor.getRange();
    range.insertNode(editor.document.createElement('a'));
}

test('exec in header goes in new paragraph', function() {
    editor.value('<h1>foo</h1>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 3);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();

    insertCaretAnchor();

    equal(editor.value(), '<h1>foo</h1><p><a></a></p>');
});

test('exec in midst of header splits it in two', function() {
    editor.value('<h1>foo</h1>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 2);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();

    insertCaretAnchor();

    equal(editor.value(), '<h1>fo</h1><h1><a></a>o</h1>');
});

test('exec at beginning of header adds header above', function() {
    editor.value('<h1>foo</h1>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 0);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();

    insertCaretAnchor();

    equal(editor.value(), '<h1></h1><h1><a></a>foo</h1>');
});

test("exec in header among BOMs goes in new paragraph", function() {
    editor.value('<h1>foo\ufeff\ufeff</h1>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 4);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();

    insertCaretAnchor();

    equal(editor.value(), '<h1>foo</h1><p><a></a></p>');
});

test('exec in list before image', function() {
    editor.value('<ul><li><img src="foo" /></li></ul>');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 0);
    range.collapse(true);
    var command = createParagraphCommand(range);

    command.exec();

    insertCaretAnchor();

    equal(editor.value(), '<ul><li></li><li><a></a><img src="foo" /></li></ul>');
});

test('paragraph at start of formatted text', function() {
    editor.value('<p><strong>foo</strong></p>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild.firstChild, 0);
    range.collapse(true);

    var command = createParagraphCommand(range);
    command.exec();

    if (!kendo.support.browser.msie) {
        var br = editor.body.firstChild.firstChild.firstChild;
        equal(br.nodeName.toLowerCase(), "br", "bogus br is present in non-ie browsers");
    }

    insertCaretAnchor();

    equal(editor.value(), '<p><strong></strong></p><p><strong><a></a>foo</strong></p>');
});

test("paragraph at end of formatted text", function() {
    editor.value('<p><strong>foo</strong></p>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild.firstChild, 3);
    range.collapse(true);

    createParagraphCommand(range).exec();

    insertCaretAnchor();

    equal(editor.value(), '<p><strong>foo</strong></p><p><strong><a></a></strong></p>');
});

test("paragraph discards preceding whitespace", function() {
    editor.value("<p>foo</p><p>    bar</p>");

    var p = editor.body.lastChild;
    var range = editor.createRange();
    range.setStart(p.firstChild, 4);
    range.collapse(true);

    var command = createParagraphCommand(range);
    command.exec();

    if (!kendo.support.browser.msie) {
        var br = editor.body.childNodes[1].lastChild;
        equal(br.nodeName.toLowerCase(), "br", "bogus br is present in non-ie browsers");
    }

    insertCaretAnchor();

    equal(editor.value(), '<p>foo</p><p></p><p><a></a>bar</p>');
});

test("does not break out of inline editor within list", function() {
    try {
        var dom = $("<ul><li><div contentEditable /></li></ul>").appendTo(QUnit.fixture);
        var inline = dom.find("[contentEditable]").kendoEditor({ value: "foo" }).data("kendoEditor");
        var range = inline.createRange();
        range.setStart(inline.body.firstChild, 3);
        range.collapse(true);

        inline.exec("insertParagraph");

        equal(inline.value("<p>foo</p><p></p>"));
        equal($("#qunit-fixture .k-editor").length, 1);
    } finally {
        kendo.destroy(QUnit.fixture);
    }
});

test("does not remove text with bom", function() {
    var range =  createRangeFromText(editor, '<p>foo</p><ul><li>bar\ufeff|\ufeff|</li></ul>');

    createParagraphCommand(range).exec();

    insertCaretAnchor();

    equal(editor.value(), '<p>foo</p><ul><li>bar</li><li><a></a></li></ul>');
});

test("paragraph at end of link does not transfer it", function() {
    editor.value('<p><a href="#bar">foo</a></p>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild.firstChild, 3);
    range.collapse(true);

    createParagraphCommand(range).exec();

    insertCaretAnchor();

    equal(editor.value(), '<p><a href="#bar">foo</a></p><p><a></a></p>');
});

test("paragraph before img does not move focus within img", function() {
    editor.value('<p><img></p>');

    range = editor.createRange();
    range.setStart(editor.body.firstChild, 0);
    range.collapse(true);

    createParagraphCommand(range).exec();

    range = editor.getRange();

    equal(range.commonAncestorContainer.nodeName.toLowerCase(), "p");
});

test("paragraph before link does not remove it", function() {
    var range =  createRangeFromText(editor, '<p>||<a href="foo">foo</a></p>');

    createParagraphCommand(range).exec();

    equal(editor.value(), '<p></p><p><a href="foo">foo</a></p>');
});

test("paragraph before input does not clone it", function() {
    var range = createRangeFromText(editor, '<p>||<input></p>');

    createParagraphCommand(range).exec();
    createParagraphCommand(editor.getRange()).exec();

    equal(editor.value(), '<p></p><p></p><p><input /></p>');
});

test("paragraph inside list link cleans link on new list item", function() {
    var range = createRangeFromText(editor, '<ul><li><a href="http://foo">foo||</a></li></ul>');

    createParagraphCommand(range).exec();

    equal(editor.value(), '<ul><li><a href="http://foo">foo</a></li><li></li></ul>');
});

}());
