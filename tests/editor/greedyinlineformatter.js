(function(){

var editor;

var GreedyInlineFormatter = kendo.ui.editor.GreedyInlineFormatter;

editor_module("editor greedy inline formatter", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

test('toggle applies format on simple selection', function() {
    var range = createRangeFromText(editor, "|foo|");
    var formatter = new GreedyInlineFormatter([{ tags: ['span'] }], { style: { fontFamily: 'Arial' } }, 'font-family');
    formatter.toggle(range);
    equal(editor.value(), '<span style="font-family:Arial;">foo</span>');
});

test('toggle applies format on suitable node', function() {
    var range = createRangeFromText(editor, '|<span style="font-family:Courier;">foo</span>|');
    var formatter = new GreedyInlineFormatter([{ tags: ['span'] }], { style: { fontFamily: 'Arial' } }, 'font-family');
    formatter.toggle(range);
    equal(editor.value(), '<span style="font-family:Arial;">foo</span>');
});

test('formats split existing format nodes', function() {
    var range = createRangeFromText(editor, '<span style="font-family:Courier;">fo|o</span>bar|');
    var formatter = new GreedyInlineFormatter([{ tags: ['span'] }], { style: { fontFamily: 'Arial' } }, 'font-family');

    var marker = new kendo.ui.editor.Marker();
    marker.add(range);
    formatter.toggle(range);
    marker.remove(range);

    equal(editor.value(), '<span style="font-family:Courier;">fo</span><span style="font-family:Arial;">obar</span>');
});

test('format splits span when inherit is supplied', function() {
    var range = createRangeFromText(editor, '<span style="font-family:Courier;">fo|o</span>bar|');
    var formatter = new GreedyInlineFormatter([{ tags: ['span'] }], { style: { fontFamily: 'inherit' } }, 'font-family');

    var marker = new kendo.ui.editor.Marker();
    marker.add(range);
    formatter.toggle(range);
    marker.remove(range);

    equal(editor.value(), '<span style="font-family:Courier;">fo</span>obar');
});

test("leaves inner inline nodes", function() {
    var range = createRangeFromText(editor, "<span style='color:#ff0000;'><em>|foo|</em></span>");
    var formatter = new GreedyInlineFormatter([{ tags: ["span"] }], { style: { color: 'inherit' } }, 'color');
    formatter.activate(range, new kendo.ui.editor.RangeEnumerator(range).enumerate());

    equal(editor.value(), "<em>foo</em>");
});

}());
