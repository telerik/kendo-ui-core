import '@progress/kendo-ui/src/kendo.editor.js';

/* exported getEditor */
export function getEditor(selector) {
    return $(selector || '#Editor1').data("kendoEditor");
}

/* exported editor_describe */
export function editor_describe(name, options, editorOptions) {
    describe("", function() {
        beforeEach(function() {
            if (editorOptions && editorOptions.element) {
                $(editorOptions.element).appendTo(document.body).kendoEditor(editorOptions);
            }
            else {
                $('<textarea id="editor-fixture"></textarea>').appendTo("body").kendoEditor(editorOptions);
            }
        });
        afterEach(function() {
            $("#editor-fixture").kendoEditor("destroy").closest(".k-editor").remove();
            $(".k-popup").remove();
        });

        describe(name, options);
    });
}

/* exported createRangeFromText */
export function createRangeFromText(editor, html) {
    editor.value(html.replace(/\|/g, '<span class="t-marker"></span>'));
    let $markers = $('.t-marker', editor.body);

    let range = editor.createRange();
    range.setStartBefore($markers[0]);
    range.setEndAfter($markers[1]);

    let marker = new kendo.ui.editor.Marker();

    marker.start = $markers[0];
    marker.end = $markers[1];

    marker.remove(range);
    return range;
}

/* exported assertRange */
export function assertRange(actualRange, expectedRange) {
    assert.equal(actualRange.commonAncestorContainer, expectedRange.commonAncestorContainer);
    assert.equal(actualRange.startContainer, expectedRange.startContainer);
    assert.equal(actualRange.endContainer, expectedRange.endContainer);
    assert.equal(actualRange.startOffset, expectedRange.startOffset);
    assert.equal(actualRange.endOffset, expectedRange.endOffset);
}

export function serialize(dom) {
    return kendo.ui.editor.Serializer.domToXhtml(dom);
}

export function contentEqual(editor, content) {
    assert.equal(editor.value(), content);
}

export function rangeFromHtml(html) {
    Mocha.fixture.append(html.replace(/\|/g, '<span class="t-marker"></span>'));

    var markers = Mocha.fixture.find('.t-marker');

    var range = kendo.ui.editor.RangeUtils.createRange(document);
    range.setStartBefore(markers[0]);
    range.setEndAfter(markers[1]);

    var marker = new kendo.ui.editor.Marker();

    marker.start = markers[0];
    marker.end = markers[1];

    marker.remove(range);

    return range;
}

export function equalDom(actual, expected, message) {
    let sortedActual = sortAttrs(actual);
    let sortedExpected = sortAttrs(expected);
    assert.equal(sortedActual, sortedExpected, message);
}

function sortAttrs(html) {
    return html.replace(/<([^>]*)>/gi, function(match, capture) {
        let domElm = $(match)[0];

        if (domElm && domElm.attributes) {
            let attributes = Array.from(domElm.attributes);
            attributes.sort(function(a, b) {
                return a.nodeName > b.nodeName ? 1 : a.nodeName < b.nodeName ? -1 : 0;
            });

            let output = "<" + domElm.nodeName.toLowerCase();

            for (let index in attributes) {
                let attr = attributes[index];
                output = output + " " + attr.nodeName + "=\"" + attr.nodeValue + "\"";
            }

            if (/\/$/.test(capture)) {
                output = output + "/";
            }

            output = output + ">";

            return output;
        } else {
            return match;
        }
    });
}