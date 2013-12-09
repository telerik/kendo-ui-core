(function(){

var editor;

editor_module("editor view html command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
        kendo.destroy("[data-role=window]");
        editor.unbind("change");
    }
});

function createViewHtmlCommand(target) {
    target = target || editor;

    var command = new kendo.ui.editor.ViewHtmlCommand({ range: target.getRange() });

    command.editor = target;

    command.exec();
}

test("textarea shows editor content", function() {
    var html = "<strong>foo</strong>";

    editor.value(html);

    createViewHtmlCommand();

    equal($(".k-window textarea").val(), html);
});

test("textarea applies basic formatting for paragraphs", function() {
    editor.value("<p>foo</p><p>bar</p>");

    createViewHtmlCommand();

    equal($(".k-window textarea").val(), "<p>foo</p>\n<p>bar</p>");
});

test("textarea applies basic formatting for lists", function() {
    editor.value("<ul><li>foo</li><li>bar</li></ul>");

    createViewHtmlCommand();

    equal($(".k-window textarea").val(), "<ul>\n<li>foo</li>\n<li>bar</li>\n</ul>");
});

test("update button sets the editor content", function() {
    var html = "<strong>bar</strong>";

    editor.value("<p>foo</p>");

    createViewHtmlCommand();

    $(".k-window textarea").val(html);

    $(".k-dialog-update").click();

    equal(editor.value(), html);
});

test("update button triggers change event", 1, function() {
    var html = "<strong>bar</strong>";

    editor.value("<p>foo</p>");

    editor.bind("change", function() { ok(true); });

    createViewHtmlCommand();

    $(".k-window textarea").val(html);

    $(".k-dialog-update").click();
});

test("close button does not modify the editor content", function() {
    var initialHtml = "<p>foo</p>";

    editor.value(initialHtml);

    createViewHtmlCommand();

    $(".k-window textarea").val("<strong>bar</strong>");

    $(".k-dialog-close").click();

    equal(editor.value(), initialHtml);
});

test("dialog title can be localized", function() {
    editor.options.messages.viewHtml = "bar";

    createViewHtmlCommand();

    equal($('.k-window .k-window-title').text(), "bar");
});

test("inline editor is focused after dialog is closed", function() {
    var inline = new kendo.ui.Editor("#inline");

    createViewHtmlCommand(inline);

    $(".k-dialog-close").click();

    equal(kendo._activeElement(), inline.element[0]);
});

}());
