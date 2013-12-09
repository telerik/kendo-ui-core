(function(){

var cleaner;

module("editor webkit format cleaner", {
    setup: function() {
        cleaner = new kendo.ui.editor.WebkitFormatCleaner();
    }
});

function clean(html) {
    var value = cleaner.clean(html);
    return value.replace(/(<\/?[^>]*>)/g, function (_, tag) {
        return tag.toLowerCase();
    }).replace(/[\r\n]+/g, "");
}

test("removes apple-style-span class", function() {
    equal(clean('<span class="Apple-style-span">foo</span>'), '<span>foo</span>');
});

test("removes all styles of paragraphs", function() {
    equal(clean('<p style="margin: 0; padding: 0;">foo</p>'), '<p>foo</p>');
});

test("removes outermost div (occuring when pasting in safari 5.x)", function() {
    equal(clean("<div><p>foo</p></div>"), "<p>foo</p>");
});

}());

