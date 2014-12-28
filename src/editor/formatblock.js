(function(f, define){
    define([ "./inlineformat" ], f);
})(function(){

(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    dom = Editor.Dom,
    Command = Editor.Command,
    ToolTemplate = Editor.ToolTemplate,
    FormatTool = Editor.FormatTool,
    EditorUtils = Editor.EditorUtils,
    registerTool = EditorUtils.registerTool,
    registerFormat = EditorUtils.registerFormat,
    RangeUtils = Editor.RangeUtils;

var BlockFormatFinder = Class.extend({
    init: function(format) {
        this.format = format;
    },

    contains: function(node, children) {
        var i, len, child;

        for (i = 0, len = children.length; i < len; i++) {
            child = children[i];
            if (!child || !dom.isAncestorOrSelf(node, child)) {
                return false;
            }
        }

        return true;
    },

    findSuitable: function (nodes) {
        var format = this.format,
            suitable = [],
            i, len, candidate;

        for (i = 0, len = nodes.length; i < len; i++) {
            for (var f = format.length - 1; f >= 0; f--) {
                candidate = dom.ofType(nodes[i], format[f].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[f].tags);
                if (candidate) {
                    break;
                }
            }

            if (!candidate || candidate.contentEditable === 'true') {
                return [];
            }

            if ($.inArray(candidate, suitable) < 0) {
                suitable.push(candidate);
            }
        }

        for (i = 0, len = suitable.length; i < len; i++) {
            if (this.contains(suitable[i], suitable)) {
                return [suitable[i]];
            }
        }

        return suitable;
    },

    findFormat: function (sourceNode) {
        var format = this.format,
            i, len, node, tags, attributes;
        var editableParent = dom.editableParent(sourceNode);

        for (i = 0, len = format.length; i < len; i++) {
            node = sourceNode;
            tags = format[i].tags;
            attributes = format[i].attr;

            while (node && dom.isAncestorOf(editableParent, node)) {
                if (dom.ofType(node, tags) && dom.attrEquals(node, attributes)) {
                    return node;
                }

                node = node.parentNode;
            }
        }
        return null;
    },

    getFormat: function (nodes) {
        var that = this,
            findFormat = function(node) {
                    return that.findFormat(dom.isDataNode(node) ? node.parentNode : node);
                },
            result = findFormat(nodes[0]),
            i, len;

        if (!result) {
            return "";
        }

        for (i = 1, len = nodes.length; i < len; i++) {
            if (result != findFormat(nodes[i])) {
                return "";
            }
        }

        return result.nodeName.toLowerCase();
    },

    isFormatted: function (nodes) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            if (!this.findFormat(nodes[i])) {
                return false;
            }
        }

        return true;
    }
});

var BlockFormatter = Class.extend({
    init: function (format, values) {
        this.format = format;
        this.values = values;
        this.finder = new BlockFormatFinder(format);
    },

    wrap: function(tag, attributes, nodes) {
        var commonAncestor = nodes.length == 1 ? dom.blockParentOrBody(nodes[0]) : dom.commonAncestor.apply(null, nodes);

        if (dom.isInline(commonAncestor)) {
            commonAncestor = dom.blockParentOrBody(commonAncestor);
        }

        var ancestors = dom.significantChildNodes(commonAncestor),
            position = dom.findNodeIndex(ancestors[0]),
            wrapper = dom.create(commonAncestor.ownerDocument, tag, attributes),
            i, ancestor;

        for (i = 0; i < ancestors.length; i++) {
            ancestor = ancestors[i];
            if (dom.isBlock(ancestor)) {
                dom.attr(ancestor, attributes);

                if (wrapper.childNodes.length) {
                    dom.insertBefore(wrapper, ancestor);
                    wrapper = wrapper.cloneNode(false);
                }

                position = dom.findNodeIndex(ancestor) + 1;

                continue;
            }

            wrapper.appendChild(ancestor);
        }

        if (wrapper.firstChild) {
            dom.insertAt(commonAncestor, wrapper, position);
        }
    },

    apply: function (nodes) {
        var format, values = this.values;

        function attributes(format) {
            return extend({}, format && format.attr, values);
        }

        var images = dom.filter("img", nodes);
        var imageFormat = EditorUtils.formatByName("img", this.format);
        var imageAttributes = attributes(imageFormat);
        $.each(images, function() {
            dom.attr(this, imageAttributes);
        });

        // only images were selected, no need to wrap
        if (images.length == nodes.length) {
            return;
        }

        var nonImages = dom.filter("img", nodes, true);
        var formatNodes = this.finder.findSuitable(nonImages);

        if (formatNodes.length) {
            for (var i = 0, len = formatNodes.length; i < len; i++) {
                format = EditorUtils.formatByName(dom.name(formatNodes[i]), this.format);
                dom.attr(formatNodes[i], attributes(format));
            }
        } else {
            format = this.format[0];
            this.wrap(format.tags[0], attributes(format), nonImages);
        }
    },

    remove: function (nodes) {
        var i, l, formatNode, namedFormat, name;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = this.finder.findFormat(nodes[i]);
            if (formatNode) {
                name = dom.name(formatNode);
                if (name == "div" && !formatNode.getAttribute("class")) {
                    dom.unwrap(formatNode);
                } else {
                    namedFormat = EditorUtils.formatByName(name, this.format);
                    if (namedFormat.attr.style) {
                        dom.unstyle(formatNode, namedFormat.attr.style);
                    }
                    if (namedFormat.attr.className) {
                        dom.removeClass(formatNode, namedFormat.attr.className);
                    }
                }
            }
        }
    },

    toggle: function (range) {
        var that = this,
            nodes = RangeUtils.nodes(range);

        if (that.finder.isFormatted(nodes)) {
            that.remove(nodes);
        } else {
            that.apply(nodes);
        }
    }
});

var GreedyBlockFormatter = Class.extend({
    init: function (format, values) {
        var that = this;
        that.format = format;
        that.values = values;
        that.finder = new BlockFormatFinder(format);
    },

    apply: function (nodes) {
        var format = this.format;
        var blocks = dom.blockParents(nodes);
        var formatTag = format[0].tags[0];
        var i, len, list, formatter, range;
        var element;
        var tagName;

        if (blocks.length) {
            for (i = 0, len = blocks.length; i < len; i++) {
                tagName = dom.name(blocks[i]);

                if (tagName == "li") {
                    list = blocks[i].parentNode;
                    formatter = new Editor.ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    range = this.editor.createRange();
                    range.selectNode(blocks[i]);
                    formatter.toggle(range);
                } else if (formatTag && (tagName == "td" || blocks[i].attributes.contentEditable)) {
                    new BlockFormatter(format, this.values).apply(blocks[i].childNodes);
                } else {
                    element = dom.changeTag(blocks[i], formatTag);
                    dom.attr(element, format[0].attr);
                }
            }
        } else {
            new BlockFormatter(format, this.values).apply(nodes);
        }
    },

    toggle: function (range) {
        var nodes = RangeUtils.textNodes(range);
        if (!nodes.length) {
            range.selectNodeContents(range.commonAncestorContainer);
            nodes = RangeUtils.textNodes(range);
            if (!nodes.length) {
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
            }
        }

        this.apply(nodes);
    }
});

var FormatCommand = Command.extend({
    init: function (options) {
        options.formatter = options.formatter();
        Command.fn.init.call(this, options);
    }
});

var BlockFormatTool = FormatTool.extend({ init: function (options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new BlockFormatFinder(options.format),
            formatter: function () {
                return new BlockFormatter(options.format);
            }
        }));
    }
});

extend(Editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    GreedyBlockFormatter: GreedyBlockFormatter,
    FormatCommand: FormatCommand,
    BlockFormatTool: BlockFormatTool
});

var listElements = ["ul","ol","li"];

registerFormat("justifyLeft", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "left" }} },
    { tags: ["img"], attr: { style: { "float": "left", display: "", marginLeft: "", marginRight: "" }} },
    { tags: listElements, attr: { style: { textAlign: "left", listStylePosition: "" }} }
]);
registerTool("justifyLeft", new BlockFormatTool({
    format: formats.justifyLeft,
    template: new ToolTemplate({
        template: EditorUtils.buttonTemplate,
        title: "Justify Left"
    })
}));

registerFormat("justifyCenter", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "center" }} },
    { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto", "float": "" }} },
    { tags: listElements, attr: { style: { textAlign: "center", listStylePosition: "inside" }} }
]);
registerTool("justifyCenter", new BlockFormatTool({
    format: formats.justifyCenter,
    template: new ToolTemplate({
        template: EditorUtils.buttonTemplate,
        title: "Justify Center"
    })
}));

registerFormat("justifyRight", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "right" }} },
    { tags: ["img"], attr: { style: { "float": "right", display: "", marginLeft: "", marginRight: "" }} },
    { tags: listElements, attr: { style: { textAlign: "right", listStylePosition: "inside" }} }
]);
registerTool("justifyRight", new BlockFormatTool({
    format: formats.justifyRight,
    template: new ToolTemplate({
        template: EditorUtils.buttonTemplate,
        title: "Justify Right"
    })
}));

registerFormat("justifyFull", [
    { tags: dom.nonListBlockElements, attr: { style: { textAlign: "justify" }} },
    { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto", "float": "" }} },
    { tags: listElements, attr: { style: { textAlign: "justify", listStylePosition: "" }} }
]);
registerTool("justifyFull", new BlockFormatTool({
    format: formats.justifyFull,
    template: new ToolTemplate({
        template: EditorUtils.buttonTemplate,
        title: "Justify Full"
    })
}));

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
