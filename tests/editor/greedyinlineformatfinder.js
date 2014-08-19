(function(){

var editor;

var GreedyInlineFormatFinder = kendo.ui.editor.GreedyInlineFormatFinder;

editor_module("editor greedy inline format finder", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   }
});

test('getFormat returns inherit when called on unformatted node', function() {
    editor.value('foo');

    var finder = new GreedyInlineFormatFinder([{ tags: ['span'] }], 'font-family');
    equal(finder.getFormat([editor.body.firstChild]), 'inherit');
});

test('getFormat returns correct font when in format node', function() {
    editor.value('foo<span style="font-family:Courier;">bar</span>baz');

    var finder = new GreedyInlineFormatFinder([{ tags: ['span'] }], 'font-family');

    var span = editor.body.childNodes[1];
    equal(finder.getFormat([span.firstChild]), 'Courier');
});

test('getFormat returns correct font when deep in format node', function() {
    editor.value('foo<span style="font-family:Courier;"><del>bar</del></span>baz');

    var finder = new GreedyInlineFormatFinder([{ tags: ['span'] }], 'font-family');

    var span = editor.body.childNodes[1];
    equal(finder.getFormat([span.firstChild.firstChild]), 'Courier');
});

test('getFormat returns empty string when different fonts are encountered', function() {
    editor.value('<span style="font-family:Verdana;">foo</span><span style="font-family:Courier;">bar</span>');

    var finder = new GreedyInlineFormatFinder([{ tags: ['span'] }], 'font-family');

    equal(finder.getFormat([editor.body.firstChild.firstChild, editor.body.lastChild.firstChild]), '');
});

test('getFormat returns relative font sizes when they are set', function() {
    editor.value('<span style="font-size:x-large;">foo</span>');

    var finder = new GreedyInlineFormatFinder([{ tags: ['span'] }], 'font-size');

    equal(finder.getFormat([editor.body.firstChild.firstChild]), 'x-large');
});

test('getFormat returns inner format when called on nested format nodes', function() {
    editor.value('<p style="font-family:Verdana;">foo <span style="font-family:Courier;">bar</span></p>');

    var finder = new GreedyInlineFormatFinder([{ tags: ['p', 'span'] }], 'font-family');
    equal(finder.getFormat([$("span", editor.body)[0].firstChild]), 'Courier');
});

}());
