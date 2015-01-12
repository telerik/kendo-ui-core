(function(){

function formatRange(range, format) {
    var command = new kendo.ui.editor.FormatCommand({
        range:range,
        format: format,
        formatter: function() {
            return new kendo.ui.editor.InlineFormatter(format);
        }
    });
    command.editor = editor;
    command.exec();
}

var editor;

editor_module("editor apply inline format", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
});

test('applyFormat applies format on text range', function() {
    editor.value('<p>golgafrincham telephone sanitisers</p>');

    var pararagraph = $('p', editor.document)[0].firstChild;
    var range = editor.createRange();
    range.setStart(pararagraph, 0);
    range.setEnd(pararagraph, 13);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value(), '<p><strong>golgafrincham</strong> telephone sanitisers</p>');
});

test('applyFormat applies inline formats properly on block elements', function() {
    editor.value('<p>golgafrincham</p>');

    var pararagraph = $('p', editor.document)[0];

    var range = editor.createRange();
    range.selectNode(pararagraph);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value(), '<p><strong>golgafrincham</strong></p>');
});

test('applyFormat applies format on split text elements', function() {
    editor.value('<p>foo<em>bar</em>baz</p>');

    var pararagraph = $('p', editor.document)[0];

    var range = editor.createRange();
    range.setStart(pararagraph.firstChild, 2);
    range.setEnd(pararagraph.childNodes[2], 2);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value(), '<p>fo<strong>o<em>bar</em>ba</strong>z</p>');
});

test('applyFormat uses the supplied selector', function() {
    editor.value('<p>golgafrincham</p>');

    var pararagraph = $('p', editor.document)[0];

    var range = editor.createRange();
    range.selectNode(pararagraph);

    formatRange(range, editor.options.formats.italic);

    equal(editor.value(), '<p><em>golgafrincham</em></p>');
});

test('formatRange applies style commands', function() {
    editor.value('<p>golgafrincham</p>');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild.firstChild, 5);
    range.setEnd(editor.body.firstChild.firstChild, 9);

    formatRange(range, editor.options.formats.underline);

    var span = $(editor.value()).find('span');

    equal(span.length, 1);
    equal(span.css('textDecoration'), 'underline');
});

test('formatRange does not introduce blank text nodes', function() {
    editor.value('golgafrincham');

    var range = editor.createRange();
    range.setStart(editor.body, 0);
    range.setEnd(editor.body, 1);

    formatRange(range, editor.options.formats.bold);

    equal(editor.body.childNodes.length, 2);
});

test('formatRange does honor block elements', function() {
    editor.value('<p>golgafrincham</p><p>telephone</p>');

    var range = editor.createRange();
    range.setStart(editor.body, 0);
    range.setEnd(editor.body, 2);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value().replace(/\s*/gi, ''), '<p><strong>golgafrincham</strong></p><p><strong>telephone</strong></p>');
});

test('formatRange honors nested block element', function() {
    editor.value('<div><div>golgafrincham</div></div>');

    var range = editor.createRange();
    range.setStart(editor.body, 0);
    range.setEnd(editor.body, 1);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value().replace(/\s*/gi, ''), '<div><div><strong>golgafrincham</strong></div></div>');
});

test('formatRange honors multiple nested block elements', function() {
    editor.value('<ul><li>golgafrincham</li><li>telephone</li></ul>');

    var range = editor.createRange();
    range.setStart(editor.body, 0);
    range.setEnd(editor.body, 1);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value().replace(/\s*/gi, ''), '<ul><li><strong>golgafrincham</strong></li><li><strong>telephone</strong></li></ul>');
});

test('formatRange reuses span', function() {
    editor.value('<span>golgafrincham</span>');

    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    formatRange(range, editor.options.formats.underline);

    equal(editor.value(), '<span style="text-decoration:underline;">golgafrincham</span>');
});

test('formatRange reuses span when node contents are selected', function() {
    editor.value('<span>golgafrincham</span>');

    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild);

    formatRange(range, editor.options.formats.underline);

    equal(editor.value(), '<span style="text-decoration:underline;">golgafrincham</span>');
});

test('formatRange does not reuse span if tags are specified', function() {
    editor.value('<span>golgafrincham</span>');

    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value(), '<strong><span>golgafrincham</span></strong>');
});

test('formatRange with inline format on collapsed range formats to word boundary', function() {
    editor.value('foo');

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    formatRange(range, editor.options.formats.bold);

    equal(editor.value(), '<strong>foo</strong>');
});

test('underline and collapsed range', function() {
    editor.value('foo');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    formatRange(range, editor.options.formats.underline);

    equal(editor.value(), '<span style="text-decoration:underline;">foo</span>');
});

}());
