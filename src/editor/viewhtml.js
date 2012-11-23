(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    RangeUtils = Editor.RangeUtils,
    EditorUtils = Editor.EditorUtils,
    Command = Editor.Command,
    Tool = Editor.Tool,
    ToolTemplate = Editor.ToolTemplate;

var ViewHtmlCommand = Command.extend({
    init: function(options) {
        var cmd = this;
        cmd.options = options;
        Command.fn.init.call(cmd, options);
        cmd.attributes = null;
        cmd.async = true;
    },

    exec: function () {
        var that = this,
            editor = that.editor,
            range = editor.getRange(),
            dialog = $(ViewHtmlCommand.template).appendTo(document.body),
            content = ViewHtmlCommand.indent(editor.value()),
            textarea = ".k-editor-textarea";

        function apply(e) {
            editor.value(dialog.find(textarea).val());

            close(e);

            if (that.change) {
                that.change();
            }

            editor.trigger("change");
        }

        function close(e) {
            e.preventDefault();

            dialog.data("kendoWindow").destroy();

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();
        }

        dialog.kendoWindow(extend({}, editor.options.dialogOptions, {
            title: "View HTML",
            close: close
        }))
            .hide()
            .find(textarea).val(content).end()
            .find(".k-dialog-update").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .show()
            .data("kendoWindow")
            .center();

        dialog.find(textarea).focus();
    }
});

extend(ViewHtmlCommand, {
    template: "<div class='k-editor-dialog'>" +
                "<textarea class='k-editor-textarea k-input'></textarea>" +
                "<div class='k-button-wrapper'>" +
                    "<button class='k-dialog-update k-button'>Update</button>" +
                    "&nbsp;or&nbsp;" +
                    "<a href='#' class='k-dialog-close k-link'>Close</a>" +
                "</div>" +
            "</div>",
    indent: function(content) {
        return content.replace(/<\/(p|li|ul|ol|h[1-6]|table|tr|td|th)>/ig, "</$1>\n")
                      .replace(/<(ul|ol)([^>]*)><li/ig, "<$1$2>\n<li")
                      .replace(/<br \/>/ig, "<br />\n")
                      .replace(/\n$/, "");
    }
});

kendo.ui.editor.ViewHtmlCommand = ViewHtmlCommand;

Editor.EditorUtils.registerTool("viewHtml", new Tool({ command: ViewHtmlCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "View HTML"})}));

})(window.kendo.jQuery);
