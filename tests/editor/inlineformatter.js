(function() {

var EditorNS = kendo.ui.editor;
var InlineFormatter = EditorNS.InlineFormatter;
var RangeEnumerator = EditorNS.RangeEnumerator;
var formats = kendo.ui.Editor.fn.options.formats;
var serialize = EditorHelpers.serialize;
var fixture;

module("editor inline formatter", {
    setup: function() {
        QUnit.fixture.attr("contentEdtiable", "true");
        fixture = QUnit.fixture[0];
    }
});

test('apply format applies style', function() {
    var dom = QUnit.fixture.html('<span>foo</span>').find("span");

    var formatter = new InlineFormatter(formats.underline);

    formatter.apply([dom[0].firstChild]);

    equal(serialize(fixture), '<span style="text-decoration:underline;">foo</span>');
});

test('apply wraps text node', function() {
    QUnit.fixture.text("foo");

    var formatter = new InlineFormatter(formats.bold);

    formatter.apply([fixture.firstChild]);

    equal(serialize(fixture), '<strong>foo</strong>');
});

test('apply wraps text node and applies styles', function() {
    QUnit.fixture.text("foo");

    var formatter = new InlineFormatter(formats.underline);

    formatter.apply([fixture.firstChild]);

    equal(serialize(fixture), '<span style="text-decoration:underline;">foo</span>');
});

test('apply resolves style argument', function() {
    QUnit.fixture.text("foo");

    var formatter = new InlineFormatter([{tags:['span']}], {style:{color:'#f1f1f1'}});

    formatter.apply([fixture.firstChild]);

    equal(serialize(fixture), '<span style="color:#f1f1f1;">foo</span>');
});

test('apply applies attributes', function() {
    QUnit.fixture.text("foo");

    var formatter = new InlineFormatter([{tags:['span']}], {id:'test'});

    formatter.apply([fixture.firstChild]);

    equal(serialize(fixture), '<span id="test">foo</span>');
});

test('apply updates attributes', function() {
    QUnit.fixture.html('<span id="foo">foo</span>');

    var formatter = new InlineFormatter([{ tags: ['span']}], {id:'bar'});

    formatter.apply([fixture.firstChild.firstChild]);

    equal(serialize(fixture), '<span id="bar">foo</span>');
});

test("apply on multiple inline nodes creates one format node", function() {
    QUnit.fixture.html('<em>foo</em><strong>bar</strong>');

    var formatter = new InlineFormatter([{ tags: ['span']}]);

    var em = QUnit.fixture.find("em")[0];
    var strong = QUnit.fixture.find("strong")[0];

    formatter.apply([em.firstChild, strong.firstChild]);

    equal(serialize(fixture), '<span><em>foo</em><strong>bar</strong></span>');
});

test('consolidate merges nodes of same format', function() {
    QUnit.fixture.html('<span style="text-decoration:underline;">f</span><span style="text-decoration:underline;">oo</span>');

    var formatter = new InlineFormatter(formats.underline);

    formatter.consolidate([fixture.firstChild, fixture.lastChild]);

    equal(serialize(fixture), '<span style="text-decoration:underline;">foo</span>');
});

test('consolidate skips marker', function() {
    QUnit.fixture.html('<span style="text-decoration:underline;">f</span><span class="k-marker"></span><span style="text-decoration:underline;">oo</span>');

    var formatter = new InlineFormatter(formats.underline);

    formatter.consolidate([fixture.firstChild, fixture.lastChild]);

    equal(fixture.firstChild.childNodes[1].className, "k-marker");
});

test('consolidate does not merge nodes which are not siblings', function() {
    QUnit.fixture.html('<em>f</em><strong><em>oo</em></strong>');

    var formatter = new InlineFormatter(formats.italic);

    formatter.consolidate([fixture.firstChild, fixture.lastChild.firstChild]);

    equal(serialize(fixture), '<em>f</em><strong><em>oo</em></strong>');
});

test('consolidate does not merge nodes with different styles', function() {
    QUnit.fixture.html('<span style="color:#ff0000;">foo</span><span style="font-family:Courier;">bar</span>');

    var formatter = new InlineFormatter([{ tags: ['span'] }], { style: { color: '#ff0000' } }, 'color');

    formatter.consolidate([fixture.firstChild, fixture.lastChild]);

    equal(serialize(fixture), '<span style="color:#ff0000;">foo</span><span style="font-family:Courier;">bar</span>');
});

test('consolidate does not merge different tags', function() {
    QUnit.fixture.html('<span style="color:#ff0000;">f</span><a href="#" style="color:#ff0000;">oo</a>');

    var formatter = new InlineFormatter([{ tags: ['span'] }], { style: { color: '#ff0000' } }, 'color');

    formatter.consolidate([fixture.firstChild, fixture.lastChild]);

    equal(serialize(fixture), '<span style="color:#ff0000;">f</span><a href="#" style="color:#ff0000;">oo</a>');
});

test('remove removes format when whole node contents are selected', function() {
    QUnit.fixture.html("<strong>foo</strong>");

    var formatter = new InlineFormatter(formats.bold);

    formatter.remove([fixture.firstChild.firstChild]);

    equal(serialize(fixture), 'foo');
});

test('remove removes format when whole node is selected', function() {
    QUnit.fixture.html("<strong>foo</strong>");

    var formatter = new InlineFormatter(formats.bold);

    formatter.remove([fixture.firstChild]);

    equal(serialize(fixture), 'foo');
});

editor_module("editor inline formatter", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    }
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

    equal($("strong", editor.body)[0].childNodes.length, 1);
});

}());
