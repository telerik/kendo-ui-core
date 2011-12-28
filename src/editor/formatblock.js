(function($) {

function BlockFormatFinder(format) {
    function contains(node, children) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child == null || !isAncestorOrSelf(node, child))
                return false;
        }

        return true;
    }

    this.findSuitable = function (nodes) {
        var suitable = [];

        for (var i = 0; i < nodes.length; i++) {
            var candidate = dom.ofType(nodes[i], format[0].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[0].tags);
            if (!candidate)
                return [];
            if ($.inArray(candidate, suitable) < 0)
                suitable.push(candidate);
        }

        for (var i = 0; i < suitable.length; i++)
            if (contains(suitable[i], suitable))
                return [suitable[i]];

        return suitable;
    }

    this.findFormat = function (sourceNode) {
        for (var i = 0; i < format.length; i++) {
            var node = sourceNode;
            var tags = format[i].tags;
            var attributes = format[i].attr;

            while (node) {
                if (dom.ofType(node, tags) && attrEquals(node, attributes))
                    return node;
                node = node.parentNode;
            }
        }
        return null;
    }

    this.getFormat = function (nodes) {
        var findFormat = $.proxy(function(node) { return this.findFormat(isDataNode(node) ? node.parentNode : node); }, this),
            result = findFormat(nodes[0]);

        if (!result)
            return '';

        for (var i = 1, len = nodes.length; i < len; i++)
            if (result != findFormat(nodes[i]))
                return '';

        return result.nodeName.toLowerCase();
    }

    this.isFormatted = function (nodes) {
        for (var i = 0; i < nodes.length; i++)
            if (!this.findFormat(nodes[i]))
                return false;

        return true;
    }
}

function BlockFormatter(format, values) {
    var finder = new BlockFormatFinder(format);

    function wrap(tag, attributes, nodes) {
        var commonAncestor = nodes.length == 1 ? dom.blockParentOrBody(nodes[0]) : dom.commonAncestor.apply(null, nodes);

        if (dom.isInline(commonAncestor))
            commonAncestor = dom.blockParentOrBody(commonAncestor);

        var ancestors = dom.significantChildNodes(commonAncestor);

        var position = findNodeIndex(ancestors[0]);

        var wrapper = dom.create(commonAncestor.ownerDocument, tag, attributes);

        for (var i = 0; i < ancestors.length; i++) {
            var ancestor = ancestors[i];
            if (dom.isBlock(ancestor)) {
                dom.attr(ancestor, attributes);

                if (wrapper.childNodes.length) {
                    dom.insertBefore(wrapper, ancestor);
                    wrapper = wrapper.cloneNode(false);
                }

                position = findNodeIndex(ancestor) + 1;

                continue;
            }

            wrapper.appendChild(ancestor);
        }

        if (wrapper.firstChild)
            dom.insertAt(commonAncestor, wrapper, position);
    }

    this.apply = function (nodes) {
        var formatNodes = dom.is(nodes[0], 'img') ? [nodes[0]] : finder.findSuitable(nodes);

        var formatToApply = formatNodes.length ? formatByName(dom.name(formatNodes[0]), format) : format[0];

        var tag = formatToApply.tags[0];
        var attributes = $.extend({}, formatToApply.attr, values);

        if (formatNodes.length)
            for (var i = 0; i < formatNodes.length; i++)
                dom.attr(formatNodes[i], attributes);
        else
            wrap(tag, attributes, nodes);
    }

    this.remove = function (nodes) {
        for (var i = 0, l = nodes.length; i < l; i++) {
            var formatNode = finder.findFormat(nodes[i]);
            if (formatNode)
                if (dom.ofType(formatNode, ['p', 'img', 'li']))
                    dom.unstyle(formatNode, formatByName(dom.name(formatNode), format).attr.style);
                else
                    dom.unwrap(formatNode);
        }
    }

    this.toggle = function (range) {
        var nodes = RangeUtils.nodes(range);
        if (finder.isFormatted(nodes))
            this.remove(nodes);
        else
            this.apply(nodes);
    }
}

function GreedyBlockFormatter(format, values) {
    var finder = new BlockFormatFinder(format);

    this.apply = function (nodes) {
        var blocks = blockParents(nodes);
        var formatTag = format[0].tags[0];
        if (blocks.length) {
            for (var i = 0, len = blocks.length; i < len; i++) {
                if (dom.is(blocks[i], 'li')) {
                    var list = blocks[i].parentNode;
                    var formatter = new ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    var range = this.editor.createRange();
                    range.selectNode(blocks[i]);
                    formatter.toggle(range);
                } else {
                    dom.changeTag(blocks[i], formatTag);
                }
            }
        } else {
            new BlockFormatter(format, values).apply(nodes);
        }
    }

    this.toggle = function (range) {
        var nodes = textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = textNodes(range);
            if (!nodes.length)
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
        }

        this.apply(nodes);
    }
}

function FormatCommand(options) {
    options.formatter = options.formatter();
    Command.call(this, options);
}

function BlockFormatTool (options) {
    FormatTool.call(this, $.extend(options, {
        finder: new BlockFormatFinder(options.format),
        formatter: function () { return new BlockFormatter(options.format) }
    }));
}

function FormatBlockTool() {
    Tool.call(this);
    var finder = new BlockFormatFinder([{ tags: blockElements }])

    this.command = function (commandArguments) {
        return new FormatCommand($.extend(commandArguments, {
            formatter: function () { return new GreedyBlockFormatter([{ tags: [commandArguments.value] }], {}); }
        }))
    }
    
    this.update = function($ui, nodes) {
        var list = $ui.data('tSelectBox');
        list.close();
        list.value(finder.getFormat(nodes));
    }

    this.init = function($ui, initOptions) {
        var editor = initOptions.editor;
        
        $ui.tSelectBox({
            data: editor.formatBlock,
            title: editor.localization.formatBlock,
            onItemCreate: function (e) {
                var tagName = e.dataItem.Value;
                e.html = '<' + tagName + ' unselectable="on" style="margin: .3em 0;' + dom.inlineStyle(editor.document, tagName) + '">' + e.dataItem.Text + '</' + tagName + '>';
            },
            onChange: function (e) {
                Tool.exec(editor, 'formatBlock', e.value);
            },
            highlightFirst: false
        });
    }
};

})(jQuery);