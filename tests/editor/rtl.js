(function(){

module("editor rtl", {
    setup: function() {
        QUnit.fixture.append('<div class="k-rtl"><textarea id="editor"></textarea></div>');
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test('content iframe inherits rtl direction', function() {
    var editor = new kendo.ui.Editor("#editor");
    equal($(editor.body, editor.document).css('direction'), 'rtl');
});

}());
