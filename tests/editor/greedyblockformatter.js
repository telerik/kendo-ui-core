(function(){

var editor;

var GreedyBlockFormatter = kendo.ui.editor.GreedyBlockFormatter;

editor_module("editor greedy block formatter", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});


test('apply replaces outer block element', function() {
    editor.value('<p>foo</p>');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1'] }], {});

    formatter.apply([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<h1>foo</h1>');
});

test('apply adds block element', function() {
    editor.value('foo');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1'] }], {});

    formatter.apply([editor.body.firstChild]);

    equal(editor.value(), '<h1>foo</h1>');
});

test('apply splits lists', function() {
    editor.value('<ul><li>foo</li><li>bar</li><li>baz</li></ul>');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1'] }], {});

    formatter.editor = editor;
    formatter.apply([editor.body.firstChild.childNodes[1].firstChild]);

    equal(editor.value(), '<ul><li>foo</li></ul><h1>bar</h1><ul><li>baz</li></ul>');
});

test('apply is applied on multiple list items', function() {
    editor.value('<ul><li>foo</li><li>bar</li><li>baz</li></ul>');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1']}], {});

    formatter.editor = editor;
    formatter.apply([editor.body.firstChild.childNodes[0].firstChild, editor.body.firstChild.childNodes[1].firstChild]);

    equal(editor.value(), '<h1>foo</h1><h1>bar</h1><ul><li>baz</li></ul>');
});

test('apply is applied on multiple paragraphs', function() {
    editor.value('<p>foo</p><p>bar</p><p>baz</p>');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1'] }], {});

    formatter.editor = editor;
    formatter.apply([editor.body.childNodes[0].firstChild, editor.body.childNodes[1].firstChild]);

    equal(editor.value(), '<h1>foo</h1><h1>bar</h1><p>baz</p>');
});

test('toggle calls apply', function() {
    var formatter = new GreedyBlockFormatter([{ tags: ['h1'] }], {});

    formatter.editor = editor;

    var called = false;

    formatter.apply = function() { called = true; };

    formatter.toggle(createRangeFromText(editor, '<p>|foo|</p>'));

    ok(called);
});

test("apply sets passed attributes to tag", function() {
    editor.value('<h1>foo</h1>');

    var formatter = new GreedyBlockFormatter([{ tags: ['h1'], attr: { className: "foo"} }], {});

    formatter.editor = editor;
    formatter.apply([editor.body.childNodes[0].firstChild]);

    equal(editor.value(), '<h1 class="foo">foo</h1>');
});

test("apply block formats to multiple table cells", function() {
    editor.value("<table><tr><td>foo</td><td>bar</td></tr></table>");

    var formatter = new GreedyBlockFormatter([{ tags: ['p'], attr: { className: "foo"} }], {});

    formatter.editor = editor;
    var td = $("td", editor.body);
    formatter.apply([td[0].firstChild, td[1].firstChild]);

    equal(editor.value(), '<table><tbody><tr><td><p class="foo">foo</p></td><td><p class="foo">bar</p></td></tr></tbody></table>');
});

test("apply table cell formats to multiple table cells", function() {
    editor.value("<table><tr><td>foo</td><td>bar</td></tr></table>");

    var formatter = new GreedyBlockFormatter([{ tags: ['td'], attr: { className: "foo"} }], {});

    formatter.editor = editor;
    var td = $("td", editor.body);
    formatter.apply([td[0].firstChild, td[1].firstChild]);

    equal(editor.value(), '<table><tbody><tr><td class="foo">foo</td><td class="foo">bar</td></tr></tbody></table>');
});

}());
