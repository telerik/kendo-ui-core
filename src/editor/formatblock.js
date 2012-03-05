(function($) {

// Imports ================================================================
var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.Editor,
    formats = Editor.fn.options.formats,
    dom = Editor.Dom,
    Command = Editor.Command,
    Tool = Editor.Tool,
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
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child == null || !dom.isAncestorOrSelf(node, child))
                return false;
        }

        return true;
    },

    findSuitable: function (nodes) {
        var format = this.format,
            suitable = [];

        for (var i = 0; i < nodes.length; i++) {
            var candidate = dom.ofType(nodes[i], format[0].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[0].tags);
            if (!candidate)
                return [];
            if ($.inArray(candidate, suitable) < 0)
                suitable.push(candidate);
        }

        for (var i = 0; i < suitable.length; i++)
            if (this.contains(suitable[i], suitable))
                return [suitable[i]];

        return suitable;
    },

    findFormat: function (sourceNode) {
        var format = this.format;
        for (var i = 0; i < format.length; i++) {
            var node = sourceNode;
            var tags = format[i].tags;
            var attributes = format[i].attr;

            while (node) {
                if (dom.ofType(node, tags) && dom.attrEquals(node, attributes))
                    return node;
                node = node.parentNode;
            }
        }
        return null;
    },

    getFormat: function (nodes) {
        var findFormat = $.proxy(function(node) { return this.findFormat(dom.isDataNode(node) ? node.parentNode : node); }, this),
            result = findFormat(nodes[0]);

        if (!result)
            return '';

        for (var i = 1, len = nodes.length; i < len; i++)
            if (result != findFormat(nodes[i]))
                return '';

        return result.nodeName.toLowerCase();
    },

    isFormatted: function (nodes) {
        for (var i = 0; i < nodes.length; i++)
            if (!this.findFormat(nodes[i]))
                return false;

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

        if (dom.isInline(commonAncestor))
            commonAncestor = dom.blockParentOrBody(commonAncestor);

        var ancestors = dom.significantChildNodes(commonAncestor);

        var position = dom.findNodeIndex(ancestors[0]);

        var wrapper = dom.create(commonAncestor.ownerDocument, tag, attributes);

        for (var i = 0; i < ancestors.length; i++) {
            var ancestor = ancestors[i];
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

        if (wrapper.firstChild)
            dom.insertAt(commonAncestor, wrapper, position);
    },

    apply: function (nodes) {
        var formatNodes = dom.is(nodes[0], 'img') ? [nodes[0]] : this.finder.findSuitable(nodes);

        var formatToApply = formatNodes.length ? EditorUtils.formatByName(dom.name(formatNodes[0]), this.format) : this.format[0];

        var tag = formatToApply.tags[0];
        var attributes = extend({}, formatToApply.attr, this.values);

        if (formatNodes.length)
            for (var i = 0; i < formatNodes.length; i++)
                dom.attr(formatNodes[i], attributes);
        else
            this.wrap(tag, attributes, nodes);
    },

    remove: function (nodes) {
        for (var i = 0, l = nodes.length; i < l; i++) {
            var formatNode = this.finder.findFormat(nodes[i]);
            if (formatNode)
                if (dom.ofType(formatNode, ['p', 'img', 'li'])) {
                    var namedFormat = EditorUtils.formatByName(dom.name(formatNode), this.format);
                    if (namedFormat.attr.style) {
                        dom.unstyle(formatNode, namedFormat.attr.style);
                    }
                    if (namedFormat.attr.className) {
                        dom.removeClass(formatNode, namedFormat.attr.className);
                    }
                } else
                    dom.unwrap(formatNode);
        }
    },

    toggle: function (range) {
        var nodes = RangeUtils.nodes(range);
        if (this.finder.isFormatted(nodes))
            this.remove(nodes);
        else
            this.apply(nodes);
    }
});

var GreedyBlockFormatter = Class.extend({
    init: function (format, values) {
        this.format = format;
        this.values = values;
        this.finder = new BlockFormatFinder(format);
    },

    apply: function (nodes) {
        var format = this.format,
            blocks = dom.blockParents(nodes),
            formatTag = format[0].tags[0];

        if (blocks.length) {
            for (var i = 0, len = blocks.length; i < len; i++) {
                if (dom.is(blocks[i], 'li')) {
                    var list = blocks[i].parentNode;
                    var formatter = new Editor.ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    var range = this.editor.createRange();
                    range.selectNode(blocks[i]);
                    formatter.toggle(range);
                } else {
                    dom.changeTag(blocks[i], formatTag);
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
            if (!nodes.length)
                nodes = dom.significantChildNodes(range.commonAncestorContainer);
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

var BlockFormatTool = FormatTool.extend({
    init: function (options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new BlockFormatFinder(options.format),
            formatter: function () { return new BlockFormatter(options.format) }
        }));
    }
});

var FormatBlockTool = Tool.extend({
    init: function (options) {
        Tool.fn.init.call(this, options);
        this.finder = new BlockFormatFinder([{ tags: dom.blockElements }]);
    },

    command: function (commandArguments) {
        return new FormatCommand(extend(commandArguments, {
            formatter: function () { return new GreedyBlockFormatter([{ tags: [commandArguments.value] }], {}); }
        }));
    },

    update: function($ui, nodes) {
        var list;
        if ($ui.is("select")) {
            list = $ui.data('kendoDropDownList');
        } else {
            list = $ui.find("select").data('kendoDropDownList');
        }
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function($ui, initOptions) {
        var editor = initOptions.editor,
            toolName = 'formatBlock';

        $ui.kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: editor.options.formatBlock,
            title: editor.options.localization.formatBlock,
            change: function (e) {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        $ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");
    }

});

extend(kendo.ui.Editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    GreedyBlockFormatter: GreedyBlockFormatter,
    FormatCommand: FormatCommand,
    BlockFormatTool: BlockFormatTool,
    FormatBlockTool: FormatBlockTool
});

registerTool("formatBlock", new FormatBlockTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Format Block", initialValue: "Select Block Type"})}));

registerFormat("justifyLeft", [ { tags: dom.blockElements, attr: { style: { textAlign: 'left'}} }, { tags: ['img'], attr: { style: { 'float': 'left'}} } ]);
registerTool("justifyLeft", new BlockFormatTool({format: formats.justifyLeft, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Left"})}));

registerFormat("justifyCenter", [ { tags: dom.blockElements, attr: { style: { textAlign: 'center'}} }, { tags: ['img'], attr: { style: { display: 'block', marginLeft: 'auto', marginRight: 'auto'}} } ]);
registerTool("justifyCenter", new BlockFormatTool({format: formats.justifyCenter, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Center"})}));

registerFormat("justifyRight", [ { tags: dom.blockElements, attr: { style: { textAlign: 'right'}} }, { tags: ['img'], attr: { style: { 'float': 'right'}} } ]);
registerTool("justifyRight", new BlockFormatTool({format: formats.justifyRight, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Right"})}));

registerFormat("justifyFull", [ { tags: dom.blockElements, attr: { style: { textAlign: 'justify'}} } ]);
registerTool("justifyFull", new BlockFormatTool({format: formats.justifyFull, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Full"})}));

})(jQuery);
