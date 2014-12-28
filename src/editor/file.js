(function(f, define){
    define([ "../kendo.filebrowser", "./link" ], f);
})(function(){

(function($, undefined) {

var kendo = window.kendo,
    extend = $.extend,
    Editor = kendo.ui.editor,
    EditorUtils = Editor.EditorUtils,
    dom = Editor.Dom,
    registerTool = EditorUtils.registerTool,
    ToolTemplate = Editor.ToolTemplate,
    RangeUtils = Editor.RangeUtils,
    Command = Editor.Command,
    LinkFormatter = Editor.LinkFormatter,
    textNodes = RangeUtils.textNodes,
    keys = kendo.keys,
    KEDITORFILEURL = "#k-editor-file-url",
    KEDITORFILETITLE = "#k-editor-file-title";

var FileCommand = Command.extend({
    init: function(options) {
        var that = this;
        Command.fn.init.call(that, options);

        that.formatter = new LinkFormatter();

        that.async = true;
        that.attributes = {};
    },

    insertFile: function(file, range) {
        var attributes = this.attributes;
        var doc = RangeUtils.documentFromRange(range);

        if (attributes.href && attributes.href != "http://") {

            if (!file) {
                file = dom.create(doc, "a", {href: attributes.href});
                file.innerHTML = attributes.innerHTML;

                range.deleteContents();
                range.insertNode(file);

                if (!file.nextSibling) {
                    dom.insertAfter(doc.createTextNode("\ufeff"), file);
                }

                range.setStartAfter(file);
                range.setEndAfter(file);
                RangeUtils.selectRange(range);
                return true;
            } else {
                dom.attr(file, attributes);
            }
        }

        return false;
    },

    _dialogTemplate: function(showBrowser) {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                '# if (showBrowser) { #' +
                    '<div class="k-filebrowser"></div>' +
                '# } #' +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-file-url">#: messages.fileWebAddress #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-file-url">' +
                "</div>" +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-file-title">#: messages.fileTitle #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-file-title">' +
                "</div>" +
                '<div class="k-edit-buttons k-state-default">' +
                    '<button class="k-dialog-insert k-button k-primary">#: messages.dialogInsert #</button>' +
                    '<button class="k-dialog-close k-button">#: messages.dialogCancel #</button>' +
                '</div>' +
            '</div>'
        )({
            messages: this.editor.options.messages,
            showBrowser: showBrowser
        });
    },

    redo: function () {
        var that = this,
            range = that.lockRange();

        this.formatter.apply(range, this.attributes);
        that.releaseRange(range);
    },

    exec: function () {
        var that = this,
            range = that.lockRange(),
            nodes = textNodes(range),
            applied = false,
            file = nodes.length ? this.formatter.finder.findSuitable(nodes[0]) : null,
            dialog,
            options = that.editor.options,
            messages = options.messages,
            fileBrowser = options.fileBrowser,
            showBrowser = !!(kendo.ui.FileBrowser && fileBrowser && fileBrowser.transport && fileBrowser.transport.read !== undefined),
            dialogOptions = {
                title: messages.insertFile,
                visible: false,
                resizable: showBrowser
            };

        function apply(e) {
            var element = dialog.element,
                href = element.find(KEDITORFILEURL).val().replace(/ /g, "%20"),
                innerHTML = element.find(KEDITORFILETITLE).val();

            that.attributes = {
                href: href,
                innerHTML: innerHTML !== "" ? innerHTML : href
            };

            applied = that.insertFile(file, range);

            close(e);

            if (that.change) {
                that.change();
            }
        }

        function close(e) {
            e.preventDefault();
            dialog.destroy();

            dom.windowFromDocument(RangeUtils.documentFromRange(range)).focus();
            if (!applied) {
                that.releaseRange(range);
            }
        }

        function keyDown(e) {
            if (e.keyCode == keys.ENTER) {
                apply(e);
            } else if (e.keyCode == keys.ESC) {
                close(e);
            }
        }

        dialogOptions.close = close;

        if (showBrowser) {
            dialogOptions.width = 750;
        }

        dialog = this.createDialog(that._dialogTemplate(showBrowser), dialogOptions)
            .toggleClass("k-filebrowser-dialog", showBrowser)
            .find(".k-dialog-insert").click(apply).end()
            .find(".k-dialog-close").click(close).end()
            .find(".k-edit-field input").keydown(keyDown).end()
            // IE < 8 returns absolute url if getAttribute is not used
            .find(KEDITORFILEURL).val(file ? file.getAttribute("href", 2) : "http://").end()
            .find(KEDITORFILETITLE).val(file ? file.title : "").end()
            .data("kendoWindow");

        if (showBrowser) {
            new kendo.ui.FileBrowser(
                dialog.element.find(".k-filebrowser"),
                extend({}, fileBrowser, {
                    change: function() {
                        dialog.element.find(KEDITORFILEURL).val(this.value());
                    },
                    apply: apply
                })
            );
        }

        dialog.center().open();
        dialog.element.find(KEDITORFILEURL).focus().select();
    }

});

kendo.ui.editor.FileCommand = FileCommand;

registerTool("insertFile", new Editor.Tool({ command: FileCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Insert File" }) }));

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
