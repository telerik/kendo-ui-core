(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    extend = $.extend,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
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
            candidate = dom.ofType(nodes[i], format[0].tags) ? nodes[i] : dom.parentOfType(nodes[i], format[0].tags);
            if (!candidate) {
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

        for (i = 0, len = format.length; i < len; i++) {
            node = sourceNode;
            tags = format[i].tags;
            attributes = format[i].attr;

            while (node) {
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
        var that = this,
            formatNodes = dom.is(nodes[0], "img") ? [nodes[0]] : that.finder.findSuitable(nodes),
            formatToApply = formatNodes.length ? EditorUtils.formatByName(dom.name(formatNodes[0]), that.format) : that.format[0],
            tag = formatToApply.tags[0],
            attributes = extend({}, formatToApply.attr, that.values),
            i, len;

        if (formatNodes.length) {
            for (i = 0, len = formatNodes.length; i < len; i++) {
                dom.attr(formatNodes[i], attributes);
            }
        } else {
            that.wrap(tag, attributes, nodes);
        }
    },

    remove: function (nodes) {
        var i, l, formatNode, namedFormat;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = this.finder.findFormat(nodes[i]);
            if (formatNode) {
                if (dom.ofType(formatNode, ["p", "img", "li"])) {
                    namedFormat = EditorUtils.formatByName(dom.name(formatNode), this.format);
                    if (namedFormat.attr.style) {
                        dom.unstyle(formatNode, namedFormat.attr.style);
                    }
                    if (namedFormat.attr.className) {
                        dom.removeClass(formatNode, namedFormat.attr.className);
                    }
                } else {
                    dom.unwrap(formatNode);
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
        var format = this.format,
            blocks = dom.blockParents(nodes),
            formatTag = format[0].tags[0],
            i, len, list, formatter, range;

        if (blocks.length) {
            for (i = 0, len = blocks.length; i < len; i++) {
                if (dom.is(blocks[i], "li")) {
                    list = blocks[i].parentNode;
                    formatter = new Editor.ListFormatter(list.nodeName.toLowerCase(), formatTag);
                    range = this.editor.createRange();
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

var BlockFormatTool = FormatTool.extend({
    init: function (options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new BlockFormatFinder(options.format),
            formatter: function () {
                return new BlockFormatter(options.format);
            }
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

    update: function(ui, nodes) {
        var list;
        if (ui.is("select")) {
            list = ui.data("kendoSelectBox");
        } else {
            list = ui.find("select").data("kendoSelectBox");
        }
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = "formatBlock";

        new Editor.SelectBox(ui, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: this.options.items ? this.options.items : editor.options.formatBlock,
            title: editor.options.messages.formatBlock,
            change: function (e) {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");
    }
});

extend(Editor, {
    BlockFormatFinder: BlockFormatFinder,
    BlockFormatter: BlockFormatter,
    GreedyBlockFormatter: GreedyBlockFormatter,
    FormatCommand: FormatCommand,
    BlockFormatTool: BlockFormatTool,
    FormatBlockTool: FormatBlockTool
});

registerTool("formatBlock", new FormatBlockTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate})}));

registerFormat("justifyLeft", [ { tags: dom.blockElements, attr: { style: { textAlign: "left"}} }, { tags: ["img"], attr: { style: { "float": "left"}} } ]);
registerTool("justifyLeft", new BlockFormatTool({format: formats.justifyLeft, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Left"})}));

registerFormat("justifyCenter", [ { tags: dom.blockElements, attr: { style: { textAlign: "center"}} }, { tags: ["img"], attr: { style: { display: "block", marginLeft: "auto", marginRight: "auto"}} } ]);
registerTool("justifyCenter", new BlockFormatTool({format: formats.justifyCenter, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Center"})}));

registerFormat("justifyRight", [ { tags: dom.blockElements, attr: { style: { textAlign: "right"}} }, { tags: ["img"], attr: { style: { "float": "right"}} } ]);
registerTool("justifyRight", new BlockFormatTool({format: formats.justifyRight, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Right"})}));

registerFormat("justifyFull", [ { tags: dom.blockElements, attr: { style: { textAlign: "justify"}} } ]);
registerTool("justifyFull", new BlockFormatTool({format: formats.justifyFull, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Justify Full"})}));

})(window.kendo.jQuery);
