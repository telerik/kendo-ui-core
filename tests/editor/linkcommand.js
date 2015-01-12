(function(){

var LinkFormatter = kendo.ui.editor.LinkFormatter;
var formatter;
var fixture;

module("editor link formatter", {
    setup: function() {
        formatter = new LinkFormatter();
        fixture = QUnit.fixture;
    }
});

test("apply on range", function() {
    formatter.apply(rangeFromHtml("|foo|"), { href: "/foo" });

    equal(fixture.find("a").length, 1);
    equal(fixture.find("a").text(), "foo");
    equal(fixture.find("a").attr("href"), "/foo");
    equal(fixture.text(), "foo");
});

test("apply on empty range with innerHTML", function() {
    formatter.apply(rangeFromHtml("||"), { innerHTML: "bar", href: "foo" });

    equal(fixture.find("a").length, 1);
    equal(fixture.find("a").text(), "bar");
    equal(fixture.find("a").attr("href"), "foo");
    equal(fixture.text(), "bar");
});

test("apply on inline nodes creates one link", function() {
    formatter.apply(rangeFromHtml("|foo<em>bar</em>baz|"), { href: "/foo" });

    equal(fixture.find("a").length, 1);
    equal(fixture.find("a em").length, 1);
    equal(fixture.find("a").text(), "foobarbaz");
});

}());

(function(){

var editor;

editor_module("editor link command", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
    },
    teardown: function() {
       kendo.destroy("[data-role=window]");
    }
});

function execLinkCommandOnRange(range) {
    var command = new kendo.ui.editor.LinkCommand({ range: range });
    command.editor = editor;
    command.exec();

    return command;
}

test("exec creates window", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    equal($(".k-window").length, 1);
});

test("clicking close closes the window", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $(".k-dialog-close").click();
    equal($(".k-window").length, 0);
});

test("clicking insert closes the window", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $(".k-dialog-insert").click();
    equal($(".k-window").length, 0);
});

test("text is filled when only text is selected", function() {
    var range = createRangeFromText(editor, "|foo bar|");
    execLinkCommandOnRange(range);

    equal($("#k-editor-link-text").val(), "foo bar");
});

test("text is filled if more than one text node is selected", function() {
    var range = createRangeFromText(editor, "|foo <strong>bar</strong>|");
    execLinkCommandOnRange(range);

    equal($("#k-editor-link-text").val(), "foo bar");
});

test("selection is replaced by text if more than one node is selected", function() {
    var range = createRangeFromText(editor, "|foo <strong>bar</strong>|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-text").val("foo");
    $("#k-editor-link-url").val("bar");
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="bar">foo</a>');
});

test("collapsed range is expanded", function() {
    editor.value("foo");
    var range = editor.createRange();

    range.setStart(editor.body.firstChild, 1);
    range.setEnd(editor.body.firstChild, 1);

    execLinkCommandOnRange(range);

    equal($("#k-editor-link-text").val(), "foo");
});

test("clicking insert inserts link if url is set", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="foo">foo</a>');
});

test("clicking insert does not inserts link if url is not set", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("");
    $(".k-dialog-insert").click();
    equal(editor.value(), "foo");
});

test("clicking insert inserts mailto if email address is typed", function() {
    var range = createRangeFromText(editor, "|foo|"),
        url = "foo@bar.baz";
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val(url);
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="mailto:'+ url +'">foo</a>');
});

test("clicking insert does not insert mailto if protocol is typed", function() {
    var range = createRangeFromText(editor, "|foo|"),
        url = "ftp://foo@bar.baz";
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val(url);
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="' + url + '">foo</a>');
});

test("clicking insert does not insert mailto if already typed", function() {
    var range = createRangeFromText(editor, "|foo|"),
        url = "mailto:foo@bar.baz";
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val(url);
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="' + url + '">foo</a>');
});

test("clicking insert does not insert mailto if protocol-less url is typed", function() {
    var range = createRangeFromText(editor, "|foo|"),
        url = "//foo.bar";
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val(url);
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="' + url + '">foo</a>');
});

test("clicking insert updates existing url", function() {
    var range = createRangeFromText(editor, '<a href="bar">|foo|</a>');
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $(".k-dialog-insert").click();
    equal(editor.value(), '<a href="foo">foo</a>');
});

test("url text is set", function() {
    var range = createRangeFromText(editor, '<a href="bar">|foo|</a>');
    execLinkCommandOnRange(range);

    equal($('#k-editor-link-url').val(), 'bar');
});

function evt(type, keyCode) {
    var e = new $.Event();
    e.type = type;
    e.keyCode = keyCode;
    return e;
}

test("hitting enter in url inserts link", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo").trigger(evt("keydown", 13));

    equal(editor.value(), '<a href="foo">foo</a>');
    equal($(".k-window").length, 0);
});
test("hitting esc in url cancels", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo").trigger(evt("keydown", 27));

    equal(editor.value(), "foo");
    equal($(".k-window").length, 0);
});

test("hitting enter in name field inserts link", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").trigger(evt("keydown", 13));

    equal(editor.value(), '<a href="foo">foo</a>');
    equal($(".k-window").length, 0);
});

test("hitting enter in title field inserts link", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-title").trigger(evt("keydown", 13));

    equal(editor.value(), '<a href="foo">foo</a>');
    equal($(".k-window").length, 0);
});

test("hitting esc in text cancels", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").trigger(evt("keydown", 27));

    equal(editor.value(), "foo");
    equal($(".k-window").length, 0);
});

test("hitting esc in title cancels", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-title").trigger(evt("keydown", 27));

    equal(editor.value(), "foo");
    equal($(".k-window").length, 0);
});

test("closing the window restores content", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $(".k-window").css({width:200,height:300}).find(".k-i-close").click();

    equal(editor.value(), "foo");
    equal($(".k-window").length, 0);
});

test("setting title", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-title").val("bar");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="foo" title="bar">foo</a>');
});

test("setting opening in new window", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-target").prop("checked", true);
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="foo" target="_blank">foo</a>');
});

test("title text box is updated", function() {
    var range = createRangeFromText(editor, '<a href="#" title="bar">|foo|</a>');
    execLinkCommandOnRange(range);

    equal($('#k-editor-link-title').val(), 'bar');
});

test("target checkbox is updated", function() {
    var range = createRangeFromText(editor, '<a href="#" target="_blank">|foo|</a>');
    execLinkCommandOnRange(range);

    ok($("#k-editor-link-target").is(":checked"));
});

test("updatung link text", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").val("bar");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="foo">bar</a>');
});

test("updating link text from caret", function() {
    editor.value("foo");
    var range = editor.getRange();
    range.setStart(editor.body.firstChild,1);
    range.setEnd(editor.body.firstChild,1);

    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").val("bar");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="foo">bar</a>');
});

test("undo restores content", function() {
    editor.value("foo");
    var range = editor.getRange();
    range.setStart(editor.body.firstChild,1);
    range.setEnd(editor.body.firstChild,1);

    var command = execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").val("bar");
    $(".k-dialog-insert").click();

    command.undo();

    equal(editor.value(), "foo");
});

test("redo creates link", function() {
    editor.value("foo");
    var range = editor.getRange();
    range.setStart(editor.body.firstChild,1);
    range.setEnd(editor.body.firstChild,1);

    var command = execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("foo");
    $("#k-editor-link-text").val("bar");
    $(".k-dialog-insert").click();

    command.undo();
    command.redo();

    equal(editor.value(), '<a href="foo">bar</a>');
});

test("link is not created if url is http slash slash", function() {
    var range = createRangeFromText(editor, "|foo|");
    execLinkCommandOnRange(range);
    $(".k-dialog-insert").click();

    equal(editor.value(), "foo");
});

test("exec inserts link with empty range", function() {
    editor.value("foo ");

    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 4);
    range.setEnd(editor.body.firstChild, 4);

    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("bar");
    $(".k-dialog-insert").click();

    equal(editor.value(), 'foo <a href="bar">bar</a>');
});

test("dialog title can be localized", function() {
    editor.options.messages.createLink = "bar";
    var range = createRangeFromText(editor, "|foo|");

    execLinkCommandOnRange(range);

    equal($(".k-window .k-window-title").text(), "bar");
});

function createLink(range, text, url, newWindow) {
    execLinkCommandOnRange(range);
    $("#k-editor-link-url").val(url);
    $("#k-editor-link-text").val(text);

    if (newWindow) {
        $("#k-editor-link-target").attr("checked", true);
    }

    $(".k-dialog-insert").click();
}

test("inserting links sequentially does not render invalid markup", function() {
    editor.value("");

    createLink(editor.getRange(), "foo", "foo");
    createLink(editor.getRange(), "bar", "bar");

    equal(editor.value(), '<a href="foo">foo</a><a href="bar">bar</a>');
});

test("link dialog allows users to remove target='_blank' attribute", function() {
    editor.value("");

    createLink(editor.getRange(), "foo", "foo", true);

    var range = editor.getRange();
    range.selectNodeContents(editor.body);

    execLinkCommandOnRange(range);

    $("#k-editor-link-target").attr("checked", false);
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="foo">foo</a>');
});

test("creating links through exec", function() {
    editor.value("");

    editor.exec("createLink", {
        text: "foo",
        url: "bar",
        target: "_blank"
    });

    equal(editor.value(), '<a href="bar" target="_blank">foo</a>');
});

test("creating links through exec without text", function() {
    editor.value("");

    editor.exec("createLink", {
        url: "bar"
    });

    equal(editor.value(), '<a href="bar">bar</a>');
});

test("creating links through exec does not open popup", function() {
    editor.value("");

    editor.exec("createLink", {
        text: "foo",
        url: "bar"
    });

    equal($(".k-window").length, 0);
});

test("executing command over formatted nodes", function() {
    var range = createRangeFromText(editor, "|foo <em>bar</em>|");
    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("baz");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="baz">foo <em>bar</em></a>');
});

test("text field does not show bom text (focus caret gets lost)", function() {
    var range = createRangeFromText(editor, "foo ||");
    execLinkCommandOnRange(range);

    equal($("#k-editor-link-text").val().replace(/\ufeff/g, "BOM"), "");
});

test("text box is not shown if executing over image", function() {
    editor.value("<img />");
    var range = editor.createRange();
    range.selectNodeContents(editor.body);
    editor.selectRange(range);

    execLinkCommandOnRange(range);

    equal($("#k-editor-link-text:visible").length, 0);
    equal($(".k-editor-link-text-row:visible").length, 0);
});

test("exec over image selection", function() {
    editor.value("<img />");
    var range = editor.createRange();
    range.selectNodeContents(editor.body);
    editor.selectRange(range);

    execLinkCommandOnRange(range);

    $("#k-editor-link-url").val("baz");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="baz"><img /></a>');
});

test("change link text does not leave ghost nodes", function() {
    var range = createRangeFromText(editor, "<a href='#top'>f||oo</a>");
    execLinkCommandOnRange(range);

    $("#k-editor-link-text").val("bar");
    $(".k-dialog-insert").click();

    equal(editor.value(), '<a href="#top">bar</a>');
});

}());
