(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    EditorUtils = Editor.EditorUtils,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    FormatTool = Editor.FormatTool,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    extend = $.extend,
    registerTool = Editor.EditorUtils.registerTool,
    registerFormat = Editor.EditorUtils.registerFormat,
    KMARKER = "k-marker";

var InlineFormatFinder = Class.extend({
    init: function(format) {
        this.format = format;
    },

    numberOfSiblings: function(referenceNode) {
        var textNodesCount = 0,
            elementNodesCount = 0,
            markerCount = 0,
            parentNode = referenceNode.parentNode,
            node;

        for (node = parentNode.firstChild; node; node = node.nextSibling) {
            if (node != referenceNode) {
                if (node.className == KMARKER) {
                    markerCount++;
                } else if (node.nodeType == 3) {
                    textNodesCount++;
                } else {
                    elementNodesCount++;
                }
            }
        }

        if (markerCount > 1 && parentNode.firstChild.className == KMARKER && parentNode.lastChild.className == KMARKER) {
            // full node selection
            return 0;
        } else {
            return elementNodesCount + textNodesCount;
        }
    },

    findSuitable: function (sourceNode, skip) {
        if (!skip && this.numberOfSiblings(sourceNode) > 0) {
            return null;
        }

        return dom.parentOfType(sourceNode, this.format[0].tags);
    },

    findFormat: function (sourceNode) {
        var format = this.format,
            attrEquals = dom.attrEquals,
            i, len, node, tags, attributes;

        for (i = 0, len = format.length; i < len; i++) {
            node = sourceNode;
            tags = format[i].tags;
            attributes = format[i].attr;

            if (node && dom.ofType(node, tags) && attrEquals(node, attributes)) {
                return node;
            }

            while (node) {
                node = dom.parentOfType(node, tags);
                if (node && attrEquals(node, attributes)) {
                    return node;
                }
            }
        }

        return null;
    },

    isFormatted: function (nodes) {
        var i, len;

        for (i = 0, len = nodes.length; i < len; i++) {
            if (this.findFormat(nodes[i])) {
                return true;
            }
        }
        return false;
    }
});

var InlineFormatter = Class.extend({
    init: function(format, values) {
        var that = this;
        that.finder = new InlineFormatFinder(format);
        that.attributes = extend({}, format[0].attr, values);
        that.tag = format[0].tags[0];
    },

    wrap: function(node) {
        return dom.wrap(node, dom.create(node.ownerDocument, this.tag, this.attributes));
    },

    activate: function(range, nodes) {
        var that = this;
        if (that.finder.isFormatted(nodes)) {
            that.split(range);
            that.remove(nodes);
        } else {
            that.apply(nodes);
        }
    },

    toggle: function (range) {
        var nodes = RangeUtils.textNodes(range);

        if (nodes.length > 0) {
            this.activate(range, nodes);
        }
    },

    apply: function (nodes) {
        var that = this,
        formatNodes = [],
        i, l, node, formatNode;

        for (i = 0, l = nodes.length; i < l; i++) {
            node = nodes[i];
            formatNode = that.finder.findSuitable(node);
            if (formatNode) {
                dom.attr(formatNode, that.attributes);
            } else {
                formatNode = that.wrap(node);
            }

            formatNodes.push(formatNode);
        }

        that.consolidate(formatNodes);
    },

    remove: function (nodes) {
        var that = this,
        i, l, formatNode;

        for (i = 0, l = nodes.length; i < l; i++) {
            formatNode = that.finder.findFormat(nodes[i]);
            if (formatNode) {
                if (that.attributes && that.attributes.style) {
                    dom.unstyle(formatNode, that.attributes.style);
                    if (!formatNode.style.cssText) {
                        dom.unwrap(formatNode);
                    }
                } else {
                    dom.unwrap(formatNode);
                }
            }
        }
    },

    split: function (range) {
        var nodes = RangeUtils.textNodes(range),
        l = nodes.length,
        i, formatNode;

        if (l > 0) {
            for (i = 0; i < l; i++) {
                formatNode = this.finder.findFormat(nodes[i]);
                if (formatNode) {
                    RangeUtils.split(range, formatNode, true);
                }
            }
        }
    },

    consolidate: function (nodes) {
        var node, last;

        while (nodes.length > 1) {
            node = nodes.pop();
            last = nodes[nodes.length - 1];

            if (node.previousSibling && node.previousSibling.className == KMARKER) {
                last.appendChild(node.previousSibling);
            }

            if (node.tagName == last.tagName && node.previousSibling == last && node.style.cssText == last.style.cssText) {
                while (node.firstChild) {
                    last.appendChild(node.firstChild);
                }
                dom.remove(node);
            }
        }
    }
});

var GreedyInlineFormatFinder = InlineFormatFinder.extend({
    init: function(format, greedyProperty) {
        var that = this;
        that.format = format;
        that.greedyProperty = greedyProperty;
        InlineFormatFinder.fn.init.call(that, format);
    },

    getInlineCssValue: function(node) {
        var attributes = node.attributes,
            trim = $.trim,
            i, l, attribute, name, attributeValue, css, pair, cssIndex, len, propertyAndValue, property, value;

        if (!attributes) {
            return;
        }

        for (i = 0, l = attributes.length; i < l; i++) {
            attribute = attributes[i];
            name = attribute.nodeName;
            attributeValue = attribute.nodeValue;

            if (attribute.specified && name == "style") {

                css = trim(attributeValue || node.style.cssText).split(";");

                for (cssIndex = 0, len = css.length; cssIndex < len; cssIndex++) {
                    pair = css[cssIndex];
                    if (pair.length) {
                        propertyAndValue = pair.split(":");
                        property = trim(propertyAndValue[0].toLowerCase());
                        value = trim(propertyAndValue[1]);

                        if (property != this.greedyProperty) {
                            continue;
                        }

                        return property.indexOf("color") >= 0 ? dom.toHex(value) : value;
                    }
                }
            }
        }
    },

    getFormatInner: function (node) {
        var $node = $(dom.isDataNode(node) ? node.parentNode : node),
            parents = $node.parents().andSelf(),
            i, len, value;

        for (i = 0, len = parents.length; i < len; i++) {
            value = this.greedyProperty == "className" ? parents[i].className : this.getInlineCssValue(parents[i]);
            if (value) {
                return value;
            }
        }

        return "inherit";
    },

    getFormat: function (nodes) {
        var result = this.getFormatInner(nodes[0]),
        i, len;

        for (i = 1, len = nodes.length; i < len; i++) {
            if (result != this.getFormatInner(nodes[i])) {
                return "";
            }
        }

        return result;
    },

    isFormatted: function (nodes) {
        return this.getFormat(nodes) !== "";
    }
});

var GreedyInlineFormatter = InlineFormatter.extend({
    init: function(format, values, greedyProperty) {
        var that = this;

        InlineFormatter.fn.init.call(that, format, values);

        that.greedyProperty = greedyProperty;
        that.values = values;
        that.finder = new GreedyInlineFormatFinder(format, greedyProperty);
    },

    activate: function(range, nodes) {
        var that = this,
            camelCase,
            greedyProperty = that.greedyProperty,
            action = "apply";

        that.split(range);

        if (greedyProperty) {
            camelCase = greedyProperty.replace(/-([a-z])/, function(all, letter) { return letter.toUpperCase(); });

            if (that.values.style[camelCase] == "inherit") {
                action = "remove";
            }
        }

        that[action](nodes);
    }
});

function inlineFormatWillDelayExecution (range) {
    return range.collapsed && !RangeUtils.isExpandable(range);
}

var InlineFormatTool = FormatTool.extend({
    init: function(options) {
        FormatTool.fn.init.call(this, extend(options, {
            finder: new InlineFormatFinder(options.format),
            formatter: function () { return new InlineFormatter(options.format); }
        }));

        this.willDelayExecution = inlineFormatWillDelayExecution;
    }
});

var FontTool = Tool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        // IE has single selection hence we are using select box instead of combobox
        that.type = (kendo.support.browser.msie || kendo.support.touch) ? "kendoDropDownList" : "kendoComboBox";
        that.format = [{ tags: ["span"] }];
        that.finder = new GreedyInlineFormatFinder(that.format, options.cssAttr);
    },

    command: function (commandArguments) {
        var options = this.options,
            format = this.format,
            style = {};

        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                style[options.domAttr] = commandArguments.value;

                return new GreedyInlineFormatter(format, { style: style }, options.cssAttr);
            }
        }));
    },

    willDelayExecution: inlineFormatWillDelayExecution,

    update: function(ui, nodes, pendingFormats) {
        var list = ui.data(this.type),
            pendingFormat = pendingFormats.getPending(this.name),
            format;

        if (pendingFormat && pendingFormat.options.params) {
            format = pendingFormat.options.params.value;
        } else {
            format = this.finder.getFormat(nodes);
        }

        list.close();
        list.value(format);
    },

    initialize: function (ui, initOptions) {
        var editor = initOptions.editor,
            options = this.options,
            toolName = options.name,
            dataSource,
            defaultValue = [];

        if (options.defaultValue) {
           defaultValue = [{
                text: editor.options.messages[options.defaultValue[0].text],
                value: options.defaultValue[0].value
           }];
        }

        dataSource = defaultValue.concat(options.items ? options.items : editor.options[toolName]);

        ui[this.type]({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            change: function () {
                Tool.exec(editor, toolName, this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + toolName).find("*").andSelf().attr("unselectable", "on");

        ui.data(this.type).value("inherit");
    }

});

var ColorTool = Tool.extend({
    init: function(options) {
        Tool.fn.init.call(this, options);

        this.options = options;
        this.format = [{ tags: ["span"] }];
    },

    update: function(ui) {
        this._widget.close();
    },

    command: function (commandArguments) {
        var options = this.options,
            format = this.format,
            style = {};

        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                style[options.domAttr] = commandArguments.value;

                return new GreedyInlineFormatter(format, { style: style }, options.cssAttr);
            }
        }));
    },

    willDelayExecution: inlineFormatWillDelayExecution,

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            toolName = this.name;

        ui = this._widget = new kendo.ui.ColorPicker(ui, {
            toolIcon: "k-" + this.options.name,
            palette: "web",
            change: function(e) {
                var color = e.value;
                if (color) {
                    Tool.exec(editor, toolName, color.toDisplay());
                }
            }
        });
        ui.element.attr("title", initOptions.title);
    }
});

var StyleTool = Tool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        that.format = [{ tags: ["span"] }];
        that.finder = new GreedyInlineFormatFinder(that.format, "className");
    },

    command: function (commandArguments) {
        var format = this.format;
        return new Editor.FormatCommand(extend(commandArguments, {
            formatter: function () {
                return new GreedyInlineFormatter(format, { className: commandArguments.value });
            }
        }));
    },

    update: function(ui, nodes) {
        var list = ui.data("kendoSelectBox");
        list.close();
        list.value(this.finder.getFormat(nodes));
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor;

        new Editor.SelectBox(ui, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: editor.options.style,
            title: editor.options.messages.style,
            change: function () {
                Tool.exec(editor, "style", this.value());
            },
            highlightFirst: false
        });

        ui.closest(".k-widget").removeClass("k-" + this.name).find("*").andSelf().attr("unselectable", "on");
    }

});

extend(Editor, {
    InlineFormatFinder: InlineFormatFinder,
    InlineFormatter: InlineFormatter,
    GreedyInlineFormatFinder: GreedyInlineFormatFinder,
    GreedyInlineFormatter: GreedyInlineFormatter,
    InlineFormatTool: InlineFormatTool,
    FontTool: FontTool,
    ColorTool: ColorTool,
    StyleTool: StyleTool
});

registerTool("style", new Editor.StyleTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Styles"})}));

registerFormat("bold", [ { tags: ["strong"] }, { tags: ["span"], attr: { style: { fontWeight: "bold"}} } ]);
registerTool("bold", new InlineFormatTool({ key: "B", ctrl: true, format: formats.bold, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Bold"}) }));

registerFormat("italic", [ { tags: ["em"] }, { tags: ["span"], attr: { style: { fontStyle: "italic"}} } ]);
registerTool("italic", new InlineFormatTool({ key: "I", ctrl: true, format: formats.italic, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Italic"})}));

registerFormat("underline", [ { tags: ["span"], attr: { style: { textDecoration: "underline"}} } ]);
registerTool("underline", new InlineFormatTool({ key: "U", ctrl: true, format: formats.underline, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Underline"})}));

registerFormat("strikethrough", [ { tags: ["del"] }, { tags: ["span"], attr: { style: { textDecoration: "line-through"}} } ]);
registerTool("strikethrough", new InlineFormatTool({format: formats.strikethrough, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Strikethrough"})}));

registerFormat("superscript", [ { tags: ["sup"] } ]);
registerTool("superscript", new InlineFormatTool({format: formats.superscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Superscript"})}));

registerFormat("subscript", [ { tags: ["sub"] } ]);
registerTool("subscript", new InlineFormatTool({format: formats.subscript, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Subscript"})}));

registerTool("foreColor", new ColorTool({cssAttr:"color", domAttr:"color", name:"foreColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Color"})}));

registerTool("backColor", new ColorTool({cssAttr:"background-color", domAttr: "backgroundColor", name:"backColor", template: new ToolTemplate({template: EditorUtils.colorPickerTemplate, title: "Background Color"})}));

registerTool("fontName", new FontTool({cssAttr:"font-family", domAttr: "fontFamily", name:"fontName", defaultValue: [{ text: "fontNameInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Name"})}));

registerTool("fontSize", new FontTool({cssAttr:"font-size", domAttr:"fontSize", name:"fontSize", defaultValue: [{ text: "fontSizeInherit",  value: "inherit" }], template: new ToolTemplate({template: EditorUtils.comboBoxTemplate, title: "Font Size"})}));

})(window.kendo.jQuery);
