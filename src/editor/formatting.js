(function(f, define){
    define([ "./viewhtml" ], f);
})(function(){

(function($) {

var kendo = window.kendo,
    Editor = kendo.ui.editor,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate,
    DelayedExecutionTool = Editor.DelayedExecutionTool,
    dom = Editor.Dom,
    dropDownListTemplate = Editor.EditorUtils.dropDownListTemplate,
    registerTool = Editor.EditorUtils.registerTool;


var FormattingTool = Editor.FormattingTool = DelayedExecutionTool.extend({
    init: function(options) {
        var that = this;
        Tool.fn.init.call(that, kendo.deepExtend({}, that.options, options));

        that.type = "kendoSelectBox";

        that.finder = {
            getFormat: function() { return ""; }
        };
    },

    options: {
        items: [
            { text: "Paragraph", value: "p" },
            { text: "Quotation", value: "blockquote" },
            { text: "Heading 1", value: "h1" },
            { text: "Heading 2", value: "h2" },
            { text: "Heading 3", value: "h3" },
            { text: "Heading 4", value: "h4" },
            { text: "Heading 5", value: "h5" },
            { text: "Heading 6", value: "h6" }
        ],
        width: 90
    },

    toFormattingItem: function(item) {
        var value = item.value;

        if (!value) {
            return item;
        }

        if (item.tag || item.className) {
            return item;
        }

        var dot = value.indexOf(".");

        if (dot === 0) {
            item.className = value.substring(1);
        } else if (dot == -1) {
            item.tag = value;
        } else {
            item.tag = value.substring(0, dot);
            item.className = value.substring(dot + 1);
        }

        return item;
    },

    command: function (args) {
        var item = args.value;

        item = this.toFormattingItem(item);

        return new Editor.FormatCommand({
            range: args.range,
            formatter: function () {
                var formatter,
                    tags = (item.tag || item.context || "span").split(","),
                    format = [{
                        tags: tags,
                        attr: { className: item.className || "" }
                    }];

                if ($.inArray(tags[0], dom.inlineElements) >= 0) {
                    formatter = new Editor.GreedyInlineFormatter(format);
                } else {
                    formatter = new Editor.GreedyBlockFormatter(format);
                }

                return formatter;
            }
        });
    },

    initialize: function(ui, initOptions) {
        var editor = initOptions.editor;
        var options = this.options;
        var toolName = options.name;
        var that = this;

        ui.width(options.width);

        ui.kendoSelectBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: options.items || editor.options[toolName],
            title: editor.options.messages[toolName],
            autoSize: true,
            change: function () {
                Tool.exec(editor, toolName, this.dataItem().toJSON());
            },
            dataBound: function() {
                var i, items = this.dataSource.data();

                for (i = 0; i < items.length; i++) {
                    items[i] = that.toFormattingItem(items[i]);
                }
            },
            highlightFirst: false,
            template: kendo.template(
                '<span unselectable="on" style="display:block;#=(data.style||"")#">#:data.text#</span>'
            )
        });

        ui.addClass("k-decorated")
            .closest(".k-widget")
                .removeClass("k-" + toolName)
                .find("*").addBack()
                    .attr("unselectable", "on");
    },

    getFormattingValue: function(items, nodes) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var tag = item.tag || item.context || "";
            var className = item.className ? "."+item.className : "";
            var selector = tag + className;

            var element = $(nodes[0]).closest(selector)[0];

            if (!element) {
                continue;
            }

            if (nodes.length == 1) {
                return item.value;
            }

            for (var n = 1; n < nodes.length; n++) {
                if (!$(nodes[n]).closest(selector)[0]) {
                    break;
                } else if (n == nodes.length - 1) {
                    return item.value;
                }
            }
        }

        return "";
    },

    update: function(ui, nodes) {
        var selectBox = $(ui).data(this.type);

        // necessary until formatBlock is deleted
        if (!selectBox) {
            return;
        }

        var dataSource = selectBox.dataSource,
            items = dataSource.data(),
            i, context,
            ancestor = dom.commonAncestor.apply(null, nodes);

        for (i = 0; i < items.length; i++) {
            context = items[i].context;

            items[i].visible = !context || !!$(ancestor).closest(context).length;
        }

        dataSource.filter([{ field: "visible", operator: "eq", value: true }]);

        DelayedExecutionTool.fn.update.call(this, ui, nodes);

        selectBox.value(this.getFormattingValue(dataSource.view(), nodes));

        selectBox.wrapper.toggleClass("k-state-disabled", !dataSource.view().length);
    }
});

registerTool("formatting", new FormattingTool({template: new ToolTemplate({template: dropDownListTemplate, title: "Format"})}));

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
