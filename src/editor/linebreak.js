(function($) {

// Imports ================================================================
var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    Command = Editor.Command,
    Tool = Editor.Tool,
    BlockFormatter = Editor.BlockFormatter,
    normalize = dom.normalize,
    RangeUtils = Editor.RangeUtils,
    registerTool = Editor.EditorUtils.registerTool;

var ParagraphCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange(),
            doc = RangeUtils.documentFromRange(range),
            parent, previous, next,
            container,
            emptyParagraphContent = kendo.support.browser.msie ? '' : '<br _moz_dirty="" />',
            paragraph, marker, li, heading, rng,
            // necessary while the emptyParagraphContent is empty under IE
            blocks = 'p,h1,h2,h3,h4,h5,h6'.split(','),
            startInBlock = dom.parentOfType(range.startContainer, blocks),
            endInBlock = dom.parentOfType(range.endContainer, blocks),
            shouldTrim = (startInBlock && !endInBlock) || (!startInBlock && endInBlock);

        function clean(node) {
            if (node.firstChild && dom.is(node.firstChild, 'br')) {
                dom.remove(node.firstChild);
            }

            if (dom.isDataNode(node) && !node.nodeValue) {
                node = node.parentNode;
            }

            if (node && !dom.is(node, 'img')) {
                while (node.firstChild && node.firstChild.nodeType == 1) {
                    node = node.firstChild;
                }

                if (node.innerHTML === "") {
                    node.innerHTML = emptyParagraphContent;
                }
            }
        }

        range.deleteContents();

        marker = dom.create(doc, 'a');
        range.insertNode(marker);

        if (!marker.parentNode) {
            // inserting paragraph in Firefox full body range
            container = range.commonAncestorContainer;
            container.innerHTML = "";
            container.appendChild(marker);
        }

        normalize(marker.parentNode);

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

            clean(previous);
            clean(next);

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
            }
        }

        range.collapse(true);

        dom.scrollTo(next);

        RangeUtils.selectRange(range);
    }

});

var NewLineCommand = Command.extend({
    init: function(options) {
        this.options = options;
        Command.fn.init.call(this, options);
    },

    exec: function () {
        var range = this.getRange();
        range.deleteContents();
        var br = dom.create(RangeUtils.documentFromRange(range), 'br');
        range.insertNode(br);
        normalize(br.parentNode);

        if (!kendo.support.browser.msie && (!br.nextSibling || dom.isWhitespace(br.nextSibling))) {
            //Gecko and WebKit cannot put the caret after only one br.
            var filler = br.cloneNode(true);
            filler.setAttribute('_moz_dirty', '');
            dom.insertAfter(filler, br);
        }
        range.setStartAfter(br);
        range.collapse(true);

        dom.scrollTo(br.nextSibling);

        RangeUtils.selectRange(range);
    }
});

extend(Editor, {
    ParagraphCommand: ParagraphCommand,
    NewLineCommand: NewLineCommand
});

registerTool("insertLineBreak", new Tool({ key: 13, shift: true, command: NewLineCommand }));
registerTool("insertParagraph", new Tool({ key: 13, command: ParagraphCommand }));

})(window.kendo.jQuery);
