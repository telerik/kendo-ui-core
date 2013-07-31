(function($) {

// Imports ================================================================
var kendo = window.kendo,
    extend = $.extend,
    editorNS = kendo.ui.editor,
    dom = editorNS.Dom,
    Command = editorNS.Command,
    Tool = editorNS.Tool,
    BlockFormatter = editorNS.BlockFormatter,
    normalize = dom.normalize,
    RangeUtils = editorNS.RangeUtils,
    registerTool = editorNS.EditorUtils.registerTool;

var ParagraphCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    _insertMarker: function(doc, range) {
        var marker = dom.create(doc, 'a'), container;

        range.insertNode(marker);

        if (!marker.parentNode) {
            // inserting paragraph in Firefox full body range
            container = range.commonAncestorContainer;
            container.innerHTML = "";
            container.appendChild(marker);
        }

        normalize(marker.parentNode);

        return marker;
    },

    shouldTrim: function(range) {
        var blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks);
        return (startInBlock && !endInBlock) || (!startInBlock && endInBlock);
    },

    exec: function () {
        var range = this.getRange(),
            doc = RangeUtils.documentFromRange(range),
            parent, previous, next,
            emptyParagraphContent = editorNS.emptyElementContent,
            paragraph, marker, li, heading, rng,
            shouldTrim = this.shouldTrim(range);

        range.deleteContents();

        marker = this._insertMarker(doc, range);

        li = dom.parentOfType(marker, ['li']);
        heading = dom.parentOfType(marker, 'h1,h2,h3,h4,h5,h6'.split(','));

        if (li) {
            rng = range.cloneRange();
            rng.selectNode(li);

            // hitting 'enter' in empty li
            if (!RangeUtils.textNodes(rng).length) {
                paragraph = dom.create(doc, 'p');

                if (li.nextSibling) {
                    RangeUtils.split(rng, li.parentNode);
                }

                dom.insertAfter(paragraph, li.parentNode);
                dom.remove(li.parentNode.childNodes.length == 1 ? li.parentNode : li);
                paragraph.innerHTML = emptyParagraphContent;
                next = paragraph;
            }
        } else if (heading && !marker.nextSibling) {
            paragraph = dom.create(doc, 'p');

            dom.insertAfter(paragraph, heading);
            paragraph.innerHTML = emptyParagraphContent;
            dom.remove(marker);
            next = paragraph;
        }

        if (!next) {
            if (!(li || heading)) {
                new BlockFormatter([{ tags: ['p']}]).apply([marker]);
            }

            range.selectNode(marker);

            parent = dom.parentOfType(marker, [li ? 'li' : heading ? dom.name(heading) : 'p']);

            RangeUtils.split(range, parent, shouldTrim);

            previous = parent.previousSibling;

            if (dom.is(previous, 'li') && previous.firstChild && !dom.is(previous.firstChild, 'br')) {
                previous = previous.firstChild;
            }

            next = parent.nextSibling;

            if (dom.is(next, 'li') && next.firstChild && !dom.is(next.firstChild, 'br')) {
                next = next.firstChild;
            }

            dom.remove(parent);

            this.clean(previous);
            this.clean(next);

            // normalize updates the caret display in Gecko
            normalize(previous);
        }

        normalize(next);

        if (dom.is(next, 'img')) {
            range.setStartBefore(next);
        } else {
            range.selectNodeContents(next);

            var textNode = RangeUtils.textNodes(range)[0];

            if (textNode) {
                range.selectNodeContents(textNode);
            } else {
                while (next.childNodes.length && !dom.is(next.firstChild, "br")) {
                    next = next.firstChild;
                }

                range.selectNodeContents(next);
            }
        }

        range.collapse(true);

        dom.scrollTo(next);

        RangeUtils.selectRange(range);
    },

    clean: function(node) {
        if (node.firstChild && dom.is(node.firstChild, 'br')) {
            dom.remove(node.firstChild);
        }

        if (dom.isDataNode(node) && !node.nodeValue) {
            node = node.parentNode;
        }

        if (node) {
            while (node.firstChild && node.firstChild.nodeType == 1) {
                node = node.firstChild;
            }

            if (!dom.is(node, 'img') && /^\s*$/.test(node.innerHTML)) {
                node.innerHTML = editorNS.emptyElementContent;
            }
        }
    }
});

var NewLineCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange(),
            br = dom.create(RangeUtils.documentFromRange(range), 'br'),
            filler;

        range.deleteContents();
        range.insertNode(br);

        normalize(br.parentNode);

        if (!kendo.support.browser.msie && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            // Gecko and WebKit cannot put the caret after only one br.
            filler = br.cloneNode(true);
            filler.setAttribute('_moz_dirty', '');
            dom.insertAfter(filler, br);
        }

        range.setStartAfter(br);
        range.collapse(true);

        dom.scrollTo(br.nextSibling || br);

        RangeUtils.selectRange(range);
    }
});

extend(editorNS, {
    ParagraphCommand: ParagraphCommand,
    NewLineCommand: NewLineCommand
});

registerTool("insertLineBreak", new Tool({ key: 13, shift: true, command: NewLineCommand }));
registerTool("insertParagraph", new Tool({ key: 13, command: ParagraphCommand }));

})(window.kendo.jQuery);
