(function(){

var editor;

var CleanFormatCommand = kendo.ui.editor.CleanFormatCommand;

editor_module("editor clean format command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       editor.focus();
   }
});

function cleanCommand(range) {
    var command = new CleanFormatCommand({
        range: range,
        remove: "strong,em,span".split(",")
    });
    command.editor = editor;
    return command;
}

function selectAll(editor) {
    var range = editor.createRange();

    range.selectNodeContents(editor.body);

    return range;
}

function cleanedContent(html, select) {
    editor.value(html);

    var range = (select || selectAll)(editor);

    var command = cleanCommand(range);
    command.exec();

    return editor.value();
}

test("removes strong tag", function() {
    equal(cleanedContent('<strong>foo</strong>'), 'foo');
});

test("removes multiple elements", function() {
    equal(cleanedContent('<strong>foo</strong><em>bar</em>'), 'foobar');
});

test("removes span tags", function() {
    equal(cleanedContent('<span style="color: #f00">foo</span>'), 'foo');
});

test("removes nested formatting", function() {
    equal(cleanedContent('<strong>foo<em>bar</em></strong>'), 'foobar');
});

test("removes deeply nested formatting", function() {
    equal(cleanedContent('<strong>foo<em>bar<span style="color: #f00">baz</span></em></strong>'), 'foobarbaz');
});

test("keeps paragraphs", function() {
    equal(cleanedContent('<p>foo<em>bar</em></p>'), '<p>foobar</p>');
});

test("removes style attributes", function() {
    equal(cleanedContent('<p style="color: #f00;">foo</p>'), '<p>foo</p>');
});

test("removes style attributes of fully selected nodes", function() {
    equal(
        cleanedContent(
            '<p style="color: #f00;">foo</p>' +
            '<p style="color: #00f;">bar</p>',
        function(editor) {
            var range = editor.createRange();
            var p = $("p", editor.body);

            range.setStart(p[0].firstChild, 0);
            range.setEnd(p[1].firstChild, 3);

            return range;
        }), '<p>foo</p><p>bar</p>'
    );
});

}());
