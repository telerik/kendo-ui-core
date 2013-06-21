(function($) {

var kendo = window.kendo,
    Class = kendo.Class,
    Editor = kendo.ui.editor,
    formats = kendo.ui.Editor.fn.options.formats,
    EditorUtils = Editor.EditorUtils,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    DelayedExecutionTool = Editor.DelayedExecutionTool,
    FormatTool = Editor.FormatTool,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    extend = $.extend,
    GreedyInlineFormatter = Editor.GreedyInlineFormatter,
    GreedyInlineFormatFinder = Editor.GreedyInlineFormatFinder,
    GreedyBlockFormatter = Editor.GreedyBlockFormatter,
    BlockFormatFinder = Editor.BlockFormatFinder,
    registerTool = Editor.EditorUtils.registerTool,
    registerFormat = Editor.EditorUtils.registerFormat,
    KMARKER = "k-marker";


var FormattingTool = DelayedExecutionTool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, options);

        that.type = "kendoSelectBox";
        that._spanTag = [{ tags: ["span"] }];
        var inlineFinder = new GreedyInlineFormatFinder(that._spanTag, "className");
        var blockFinder = new BlockFormatFinder([{ tags: dom.blockElements }]);

        that.finder = {
            getFormat: function(nodes) {
                return inlineFinder.getFormat(nodes) || blockFinder.getFormat(nodes);
            }
        };
    },

    command: function (args) {
        var spanTag = this._spanTag,
            item = args.value;

        if (!$.isPlainObject(item)) {
            item = { className: item };
        }

        return new Editor.FormatCommand({
            range: args.range,
            formatter: function () {
                var formatter,
                    tags = (item.tag || "span").split(","),
                    format = [{
                        tags: tags,
                        attr: { className: item.className }
                    }];

                if (dom.inlineElements.indexOf(tags[0]) >= 0) {
                    formatter = new GreedyInlineFormatter(format);
                } else {
                    formatter = new GreedyBlockFormatter(format);
                }

                return formatter;
            }
        });
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor,
            options = this.options,
            toolName = this.name;

        new Editor.SelectBox(ui, {
            dataTextField: "text",
            dataValueField: "value",
            dataSource: options.items || editor.options[toolName],
            title: editor.options.messages.style,
            change: function () {
                Tool.exec(editor, toolName, this.dataItem().toJSON());
            },
            highlightFirst: false,
            template: kendo.template(
                '<span unselectable="on" style="display:block;#=data.style#">#:data.text#</span>'
            )
        });

        ui.addClass("k-decorated")
            .closest(".k-widget")
                .removeClass("k-" + toolName)
                .find("*").addBack()
                    .attr("unselectable", "on");
    },

    update: function(ui, nodes) {
        var selectBox = $(ui).data(this.type),
            dataSource = selectBox.dataSource,
            items = dataSource.data(),
            i, context,
            ancestor = dom.commonAncestor.apply(null, nodes);

        for (i = 0; i < items.length; i++) {
            context = items[i].context;

            items[i].visible = !context || !!$(ancestor).closest(context).length;
        }

        dataSource.filter([{ field: "visible", operator: "eq", value: true }]);

        DelayedExecutionTool.fn.update.call(this, ui, nodes);

        selectBox.wrapper.toggleClass("k-state-disabled", !dataSource.view().length);
    }
});

var StyleTool = FormattingTool.extend({
    init: function(options) {
        var that = this,
            console = window.console;

        FormattingTool.fn.init.call(that, options);

        if (console) {
            console.warn("The `style` tool has been deprecated in favor of the `formatting` tool. See http://docs.kendoui.com/ for more information");
        }

        that.format = [{ tags: ["span"] }];
        that.finder = new GreedyInlineFormatFinder(that.format, "className");
    }
});


extend(Editor, {
    FormattingTool: FormattingTool,
    StyleTool: StyleTool
});

registerTool("formatting", new FormattingTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Format"})}));

registerTool("style", new Editor.StyleTool({template: new ToolTemplate({template: EditorUtils.dropDownListTemplate, title: "Styles"})}));

})(window.kendo.jQuery);
