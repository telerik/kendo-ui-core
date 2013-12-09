(function() {

var InlineFormatter = kendo.ui.editor.InlineFormatter;
var RangeEnumerator = kendo.ui.editor.RangeEnumerator;
var formats;

editor_module("editor inline formatter", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       formats = editor.options.formats;
   }
});

test('apply format applies style', function() {
    var range = createRangeFromText(editor, '<span>|foo|</span>');

    var formatter = new InlineFormatter(formats.underline);

    formatter.apply(new RangeEnumerator(range).enumerate());

    equal(editor.value(), '<span style="text-decoration:underline;">foo</span>');
});

test('apply wraps text node', function() {
    var range = createRangeFromText(editor, '|foo|');

    var formatter = new InlineFormatter(formats.bold);

    formatter.apply(new RangeEnumerator(range).enumerate());

    equal(editor.value(), '<strong>foo</strong>');
});

test('apply wraps text node and applies styles', function() {
    var range = createRangeFromText(editor, '|foo|');

    var formatter = new InlineFormatter(formats.underline);

    formatter.apply(new RangeEnumerator(range).enumerate());

    equal(editor.value(), '<span style="text-decoration:underline;">foo</span>');
});

test('apply resolves style argument', function() {
    editor.value('foo');
    var formatter = new InlineFormatter([{tags:['span']}], {style:{color:'#f1f1f1'}});
    formatter.apply([editor.body.firstChild]);
    equal(editor.value(), '<span style="color:#f1f1f1;">foo</span>');
});

test('apply applies attributes', function() {
    editor.value('foo');
    var formatter = new InlineFormatter([{tags:['span']}], {id:'test'});

    formatter.apply([editor.body.firstChild]);
    equal(editor.value(), '<span id="test">foo</span>');
});

test('apply updates attributes', function() {
    editor.value('<span id="foo">foo</span>');
    var formatter = new InlineFormatter([{ tags: ['span']}], {id:'bar'});

    formatter.apply([editor.body.firstChild.firstChild]);

    equal(editor.value(), '<span id="bar">foo</span>');
});

test('consolidate merges nodes of same format', function() {
    editor.value('<span style="text-decoration:underline;">f</span><span style="text-decoration:underline;">oo</span>');
    var formatter = new InlineFormatter(formats.underline);
    formatter.consolidate([editor.body.firstChild, editor.body.lastChild]);
    equal(editor.value(), '<span style="text-decoration:underline;">foo</span>');
});

test('consolidate skips marker', function() {
    editor.value('<span style="text-decoration:underline;">f</span><span class="k-marker"></span><span style="text-decoration:underline;">oo</span>');
    var formatter = new InlineFormatter(formats.underline);
    formatter.consolidate([editor.body.firstChild, editor.body.lastChild]);
    equal(editor.body.firstChild.childNodes[1].className, "k-marker");
});

test('consolidate does not merge nodes which are not siblings', function() {
    editor.value('<em>f</em><strong><em>oo</em></strong>');
    var formatter = new InlineFormatter(formats.italic);
    formatter.consolidate([editor.body.firstChild, editor.body.lastChild.firstChild]);
    equal(editor.value(), '<em>f</em><strong><em>oo</em></strong>');
});

test('consolidate does not merge nodes with different styles', function() {
    editor.value('<span style="color:#ff0000;">foo</span><span style="font-family:Courier;">bar</span>');
    var formatter = new InlineFormatter([{ tags: ['span'] }], { style: { color: '#ff0000' } }, 'color');
    formatter.consolidate([editor.body.firstChild, editor.body.lastChild]);
    equal(editor.value(), '<span style="color:#ff0000;">foo</span><span style="font-family:Courier;">bar</span>');
});

test('consolidate does not merge different tags', function() {
    editor.value('<span style="color:#ff0000;">f</span><a href="#" style="color:#ff0000;">oo</a>');
    var formatter = new InlineFormatter([{ tags: ['span'] }], { style: { color: '#ff0000' } }, 'color');
    formatter.consolidate([editor.body.firstChild, editor.body.lastChild]);
    equal(editor.value(), '<span style="color:#ff0000;">f</span><a href="#" style="color:#ff0000;">oo</a>');
});

test('remove removes format when whole node contents are selected', function() {
    var range = createRangeFromText(editor, "<strong>|foo|</strong>");
    var formatter = new InlineFormatter(formats.bold);
    formatter.remove(new RangeEnumerator(range).enumerate());
    equal(editor.value(), 'foo');
});

test('remove removes format when whole node is selected', function() {
    var range = createRangeFromText(editor, "|<strong>foo</strong>|");
    var formatter = new InlineFormatter(formats.bold);
    formatter.remove(new RangeEnumerator(range).enumerate());
    equal(editor.value(), 'foo');
});

test('splits format before selection', function() {
    var range = createRangeFromText(editor, "<strong>f|oo|</strong>");
    var formatter = new InlineFormatter(formats.bold);
    formatter.split(range);
    equal(editor.value(), '<strong>f</strong><strong>oo</strong>');
});

test('splits format after selection', function() {
    var range = createRangeFromText(editor, "<strong>|fo|o</strong>");
    var formatter = new InlineFormatter(formats.bold);

    formatter.split(range);
    equal(editor.value(), '<strong>fo</strong><strong>o</strong>');
});

test('split format keeps markers', function() {
    var range = createRangeFromText(editor, '<strong>|fo|o</strong>');
    var formatter = new InlineFormatter(formats.bold);

    var marker = new kendo.ui.editor.Marker();
    range = marker.add(range);

    formatter.split(range);
    equal(editor.body.firstChild.firstChild.className, "k-marker");
    equal(editor.body.firstChild.lastChild.className, "k-marker");
});

test('toggle applies format if format is not found', function() {
    var range = createRangeFromText(editor, '|fo|');

    var formatter = new InlineFormatter(formats.bold);
    var argument;
    formatter.apply = function() {
        argument = arguments[0];
    };
    formatter.toggle(range);
    ok($.isArray(argument));
});

test('toggle removes format if format is found', function() {
    var range = createRangeFromText(editor, '<strong>|fo|</strong>');

    var formatter = new InlineFormatter(formats.bold);
    var argument;
    formatter.remove = function() {
        argument = arguments[0];
    };
    formatter.toggle(range);
    ok($.isArray(argument));
});

test('toggle splits format if format is found', function() {
    var range = createRangeFromText(editor, '<strong>|fo|</strong>');

    var formatter = new InlineFormatter(formats.bold);
    var argument;
    formatter.split = function () {
        argument = arguments[0];
    };
    formatter.toggle(range);
    equal(argument, range);
});

test('space before content preserved after removing format', function() {
    var range = createRangeFromText(editor, 'foo<strong> |bar|</strong>');
    var formatter = new InlineFormatter(formats.bold);
    var marker = new kendo.ui.editor.Marker();
    marker.add(range);
    formatter.toggle(range);
    marker.remove(range);
    equal(editor.value(), 'foo bar');
});

test('space after content preserved after removing format', function() {
    var range = createRangeFromText(editor, '<strong>|foo| </strong>');
    var formatter = new InlineFormatter(formats.bold);
    var marker = new kendo.ui.editor.Marker();
    marker.add(range);

    formatter.toggle(range);
    marker.remove(range);
    equal(editor.value(), 'foo ');
});

test('removing format preserves the format element and removes the format attributes', function () {
    var range = createRangeFromText(editor, '<span style="font-size:xx-small;text-decoration:underline;">|foo|</span>');
    var formatter = new InlineFormatter(formats.underline);
    var marker = new kendo.ui.editor.Marker();
    marker.add(range);

    formatter.toggle(range);
    marker.remove(range);
    equal(editor.value(), '<span style="font-size:xx-small;">foo</span>');
});

test("removing format does not remove elements with class attribute", function() {
    var range = createRangeFromText(editor, '<span class="bar" style="text-decoration:underline;">|foo|</span>');
    var formatter = new InlineFormatter(formats.underline);
    var marker = new kendo.ui.editor.Marker();
    marker.add(range);

    formatter.toggle(range);
    marker.remove(range);
    equal(editor.value(), '<span class="bar">foo</span>');
});

test('space before and after content preserved after removing format', function() {
    var range = createRangeFromText(editor, 'foo<strong> |bar| baz</strong>');
    var formatter = new InlineFormatter(formats.bold);
    var marker = new kendo.ui.editor.Marker();
    marker.add(range);
    formatter.toggle(range);
    marker.remove(range);
    equal(editor.value(), 'foo bar<strong> baz</strong>');
});

test("BOM nodes are not accumulated when executing sequential commands", function() {
    editor.value("foo");

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 3);
    range.collapse(true);
    editor.selectRange(range);

    editor.exec("bold");
    editor.exec("italic");

    equal(editor.body.lastChild.childNodes.length, 1);
});

}());
