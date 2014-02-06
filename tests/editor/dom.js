(function(){

var editor;
var iframe;

var Dom = kendo.ui.editor.Dom;

editor_module("editor DOM", {
   setup: function() {
       editor = $("#editor-fixture").data("kendoEditor");
       iframe = $(editor.wrapper).find("iframe");
       QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

test('commonAncestor returns common ancestor for root nodes returns body', function() {
    editor.value('<span>foo</span><span>bar</span>');
    equal(Dom.commonAncestor(editor.body.firstChild.firstChild, editor.body.lastChild.lastChild), editor.body);
});

test('commonAncestor single node returns same element', function() {
    editor.value('<span>foo</span><span>bar</span>');
    equal(Dom.commonAncestor(editor.body.firstChild.firstChild), editor.body.firstChild.firstChild);
});

test('commonAncestor returns common ancestor for parent and child', function() {
    editor.value('<span>foo</span>');
    equal(Dom.commonAncestor(editor.body.firstChild.firstChild, editor.body.firstChild), editor.body.firstChild);
});

test('commonAncestor returns null when called with empty arguments', function() {
    ok(null === Dom.commonAncestor());
});

test('style applies specified style', function() {
    var element = document.createElement('span');
    Dom.style(element, {color:'red'});
    equal(element.style.color, 'red');
});

test('style does nothing if no style specified', function() {
    var element = document.createElement('span');
    Dom.style(element);
    equal(element.style.cssText, '');
});

test('unstyle does nothing if no style specified', function() {
    var element = document.createElement('span');
    Dom.style(element, {color:'red'});
    Dom.unstyle(element);
    equal(element.style.color, 'red');
});

test('unstyle removes the specified attributes', function() {
    var element = document.createElement('span');
    Dom.style(element, { color: 'red' });
    Dom.unstyle(element, { color: 'red' });
    equal(element.style.cssText, '');
});

test('createElement creates element', function() {
    var element = Dom.create(document, 'span');
    ok(undefined !== element);
    equal(element.tagName.toLowerCase(), 'span');
});

test('createElement creates element and sets attributes', function() {
    var element = Dom.create(document, 'span', {className:'test'});
    equal(element.className, 'test');
});

test('createElement can set style', function() {
    var element = Dom.create(document, 'span', { style: {color:'red'}});
    equal(element.style.color, 'red');
});

test('change tag updates the element tag name', function() {
    var source = Dom.create(document, 'div');
    QUnit.fixture.append(source);
    var result = Dom.changeTag(source, 'span');
    equal(result.tagName.toLowerCase(), 'span');
    equal(result.parentNode, QUnit.fixture[0]);
});

test('change tag clones attributes', function() {
    var source = Dom.create(document, 'div', {className:'test'});
    QUnit.fixture.append(source);

    var result = Dom.changeTag(source, 'span');
    equal(result.className, 'test');
});

test('change tag clones style', function() {
    var source = Dom.create(document, 'div', { style: {textAlign:'center'}});

    QUnit.fixture.append(source);
    var result = Dom.changeTag(source, 'span');
    equal(result.style.textAlign, 'center');
});

test('find last text node single node', function() {
    var node = Dom.create(document, 'div');
    node.innerHTML = 'foo';

    equal(Dom.lastTextNode(node), node.firstChild);
});

test('find last text node when it is first', function() {
    var node = Dom.create(document, 'div');
    node.innerHTML = 'foo<span></span>';

    equal(Dom.lastTextNode(node), node.firstChild);
});

test('find last text node when it is child of child', function() {
    var node = Dom.create(document, 'div');
    node.innerHTML = '<span>foo</span>';

    equal(Dom.lastTextNode(node), node.firstChild.firstChild);
});

test('find last text returns null', function() {
    var node = Dom.create(document, 'div');
    node.innerHTML = '<span></span>';

    equal(Dom.lastTextNode(node), null);
});

test('find last text node first child of child', function() {
    var node = Dom.create(document, 'div');
    node.innerHTML = '<span>foo<span></span></span>';

    equal(Dom.lastTextNode(node), node.firstChild.firstChild);
});

test("normalize of empty node", function() {
    var node = Dom.create(document, "div");
    Dom.normalize(node);
    equal(node.childNodes.length, 0);
    equal(node.innerHTML, "");
});

test("normalize one text node", function() {
    var node = Dom.create(document, "div");
    node.appendChild(document.createTextNode("foo"));
    Dom.normalize(node);
    equal(node.childNodes.length, 1);
    equal(node.innerHTML, "foo");
});

test("normalize two text nodes", function() {
    var node = Dom.create(document, "div");
    node.appendChild(document.createTextNode("foo"));
    node.appendChild(document.createTextNode("bar"));
    Dom.normalize(node);
    equal(node.childNodes.length, 1);
    equal(node.innerHTML, "foobar");
});

test("normalize mixed content nodes", function() {
    var node = Dom.create(document, "div");
    node.appendChild(document.createTextNode("foo"));
    node.appendChild(document.createTextNode("bar"));

    node.appendChild(document.createElement("span"));

    node.appendChild(document.createTextNode("foo"));
    node.appendChild(document.createTextNode("bar"));

    Dom.normalize(node);
    equal(node.childNodes.length, 3);
    equal(node.innerHTML.toLowerCase(), "foobar<span></span>foobar");
});

function scrollTop(editor) {
    return editor.body.scrollTop || editor.document.documentElement.scrollTop;
}

test("scrollTo does not scroll if element is in view", function() {
    editor.value("<div style='height: 24px'>foo</div><div style='height:24px'>bar</div>");
    Dom.scrollTo(editor.body.firstChild);
    equal(scrollTop(editor), 0);
});

test("scrollTo scrolls to last element", function() {
    editor.value("<div style='height: 1000px'>foo</div><div style='height:24px'>bar</div>");
    var bar = editor.body.lastChild;
    Dom.scrollTo(bar);
    equal(scrollTop(editor), 1024 - iframe.height());
});

test("editableParent returns inline body from inline node", function() {
    var inline = new kendo.ui.Editor("#inline");

    inline.value("foo");

    var result = Dom.editableParent(inline.body.firstChild);

    equal(inline.body, result);
});

test("editableParent returns inline body from nested inline node", function() {
    var inline = new kendo.ui.Editor("#inline");

    inline.value("<div>foo</div>");

    var result = Dom.editableParent(inline.body.firstChild.firstChild);

    equal(inline.body, result);
});

module("editor dom ensureTrailingBreaks");

test("adds line break to element", function() {
    var dom = $("<p>foo</p>");

    Dom.ensureTrailingBreak(dom[0]);

    equal(dom.find("br").length, 1);
});

test("does not add redundant breaks", function() {
    var dom = $("<p>foo<br /></p>");

    Dom.ensureTrailingBreak(dom[0]);

    equal(dom.find("br").length, 1);
});

test("adds break to empty paragraph", function() {
    var dom = $("<p></p>");

    Dom.ensureTrailingBreak(dom[0]);

    equal(dom.find("br").length, 1);
});

test("adds breaks to all paragraphs", function() {
    var dom = $("<div><p>foo</p><p>bar</p></div>");

    Dom.ensureTrailingBreaks(dom[0]);

    equal(dom.find("br").length, 2);
});

}());
