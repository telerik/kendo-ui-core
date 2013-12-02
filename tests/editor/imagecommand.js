(function(){

var ImageCommand = kendo.ui.editor.ImageCommand;

var editor;

editor_module("editor image command", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
   },
   teardown: function() {
       $(".k-window-content").kendoWindow("destroy");
   }
});

function execImageCommandOnRange(range) {
    var command = new ImageCommand({ range: range });
    command.editor = editor;
    command.exec();

    return command;
}

test('exec creates window', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    equal($('.k-window').length, 1)
});

test('clicking close closes the window', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('.k-window-action .k-i-close').click();
    equal($('.k-window').length, 0)
});

test('clicking insert closes the window', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('.k-dialog-insert').click();
    equal($('.k-window').length, 0)
});

test('clicking insert inserts image if url is set', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('#k-editor-image-url').val('foo');
    $('.k-dialog-insert').click();
    equal(editor.value(), '<img alt="" src="foo" />')
});

test('clicking insert does not insert image if url is not set', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('#k-editor-image-url').val('');
    $('.k-dialog-insert').click();
    equal(editor.value(), 'foo')
});

test('clicking insert updates existing src', function() {
    editor.value('<img src="bar" style="float:left" />');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);
    execImageCommandOnRange(range);

    $('#k-editor-image-url').val('foo');
    $('.k-dialog-insert').click();
    equal(editor.value(), '<img alt="" src="foo" style="float:left;" />')
});

test('url text is set', function() {
    editor.value('<img src="bar" />');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);
    execImageCommandOnRange(range);

    equal($('#k-editor-image-url').val(), 'bar');
});

test('hitting enter in url inserts image', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    var e = new $.Event();
    e.type = 'keydown';
    e.keyCode = 13;

    $('#k-editor-image-url')
        .val('http://foo')
        .trigger(e);

    equal(editor.value(), '<img alt="" src="http://foo" />')
    equal($('.k-window').length, 0);
});

test('hitting esc in url cancels', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    var e = new $.Event();
    e.type = 'keydown';
    e.keyCode = 27;

    $('#k-editor-image-url')
    .val('foo')
    .trigger(e);

    equal(editor.value(), 'foo')
    equal($('.k-window').length, 0);
});

test('hitting enter in title field inserts link', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    var e = new $.Event();
    e.type = 'keydown';
    e.keyCode = 13;

    $('#k-editor-image-url').val('http://foo')
    $('#k-editor-image-title').trigger(e);

    equal(editor.value(), '<img alt="" src="http://foo" />')
    equal($('.k-window').length, 0);
});

test('hitting esc in title cancels', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    var e = new $.Event();
    e.type = 'keydown';
    e.keyCode = 27;

    $('#k-editor-image-url')
    .val('foo')

    $('#k-editor-image-title').trigger(e);

    equal(editor.value(), 'foo')
    equal($('.k-window').length, 0);
});

test('setting title sets alt', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('#k-editor-image-url')
    .val('http://foo');

    $('#k-editor-image-title')
    .val('bar')

    $('.k-dialog-insert').click();
    equal(editor.value(), '<img alt="bar" src="http://foo" />')
});

test('title text box is filled from alt', function() {
    editor.value('<img src="foo" alt="bar" />');
    var range = editor.createRange();
    range.selectNode(editor.body.firstChild);
    execImageCommandOnRange(range);

    equal($('#k-editor-image-title').val(), 'bar');
});

test('undo restores content', function() {
    var range = createRangeFromText(editor, '|foo|');

    var command = execImageCommandOnRange(range);

    $('#k-editor-image-url')
    .val('foo');

    $('.k-dialog-insert').click();
    command.undo();
    equal(editor.value(), 'foo');
});


test('exec inserts image with empty range', function() {
    editor.value('foo ');
    var range = editor.createRange();
    range.setStart(editor.body.firstChild, 4);
    range.setEnd(editor.body.firstChild, 4);

    execImageCommandOnRange(range);

    $('#k-editor-image-url')
    .val('http://foo');

    $('.k-dialog-insert').click();
    equal(editor.value(), 'foo <img alt="" src="http://foo" />')
});

test('link is not created if url is http slash slash', function() {
    var range = createRangeFromText(editor, '|foo|');

    execImageCommandOnRange(range);

    $('.k-dialog-insert').click();
    equal(editor.value(), 'foo')
});

test('cursor is put after image', function() {
    var range = createRangeFromText(editor, '|foo|bar');
    execImageCommandOnRange(range);

    $('#k-editor-image-url').val('http://foo');

    $('.k-dialog-insert').click();

    range = editor.getRange();
    range.insertNode(editor.document.createElement('span'));
    equal(editor.value(), '<img alt="" src="http://foo" /><span></span>bar');
});

test('closing the window restores content', function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('.k-window').css({width:200,height:300}).find('.k-i-close').click();

    equal(editor.value(), 'foo')
    equal($('.k-window').length, 0);
});

test("applying substitues spaces with %20", function() {
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    $('#k-editor-image-url').val('foo bar baz');
    $('.k-dialog-insert').click();
    equal(editor.value(), '<img alt="" src="foo%20bar%20baz" />')
});

test("window title can be localized", function() {
    editor.options.messages.insertImage = "bar";
    var range = createRangeFromText(editor, '|foo|');
    execImageCommandOnRange(range);

    equal($('.k-window .k-window-title').text(), "bar");
});

}());
