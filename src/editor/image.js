(function(f, define){
    define([ "../kendo.imagebrowser", "./link" ], f);
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
    keys = kendo.keys,
    KEDITORIMAGEURL = "#k-editor-image-url",
    KEDITORIMAGETITLE = "#k-editor-image-title",
    KEDITORIMAGEWIDTH = "#k-editor-image-width",
    KEDITORIMAGEHEIGHT = "#k-editor-image-height";

var ImageCommand = Command.extend({
    init: function(options) {
        var that = this;
        Command.fn.init.call(that, options);

        that.async = true;
        that.attributes = {};
    },

    insertImage: function(img, range) {
        var attributes = this.attributes;
        var doc = RangeUtils.documentFromRange(range);

        if (attributes.src && attributes.src != "http://") {

            var removeIEAttributes = function() {
                setTimeout(function(){
                    if (!attributes.width) {
                        img.removeAttribute("width");
                    }

                    if (!attributes.height) {
                        img.removeAttribute("height");
                    }

                    img.removeAttribute("complete");
                });
            };

            if (!img) {
                img = dom.create(doc, "img", attributes);
                img.onload = img.onerror = function () {
                    removeIEAttributes();
                };

                range.deleteContents();
                range.insertNode(img);

                if (!img.nextSibling) {
                    dom.insertAfter(doc.createTextNode("\ufeff"), img);
                }

                removeIEAttributes();

                range.setStartAfter(img);
                range.setEndAfter(img);
                RangeUtils.selectRange(range);
                return true;
            } else {
                dom.attr(img, attributes);
                removeIEAttributes();
            }
        }

        return false;
    },

    _dialogTemplate: function(showBrowser) {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                '# if (showBrowser) { #' +
                    '<div class="k-filebrowser k-imagebrowser"></div>' +
                '# } #' +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-url">#: messages.imageWebAddress #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-url">' +
                "</div>" +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-title">#: messages.imageAltText #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-title">' +
                "</div>" +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-width">#: messages.imageWidth #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-width">' +
                "</div>" +
                "<div class='k-edit-label'>" +
                    '<label for="k-editor-image-height">#: messages.imageHeight #</label>' +
                "</div>" +
                "<div class='k-edit-field'>" +
                    '<input type="text" class="k-input k-textbox" id="k-editor-image-height">' +
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

        if (!that.insertImage(RangeUtils.image(range), range)) {
            that.releaseRange(range);
        }
    },

    exec: function () {
        var that = this,
            range = that.lockRange(),
            applied = false,
            img = RangeUtils.image(range),
            imageWidth = img && img.getAttribute("width") || "",
            imageHeight = img && img.getAttribute("height") || "",
            dialog,
            options = that.editor.options,
            messages = options.messages,
            imageBrowser = options.imageBrowser,
            showBrowser = !!(kendo.ui.ImageBrowser && imageBrowser && imageBrowser.transport && imageBrowser.transport.read !== undefined),
            dialogOptions = {
                title: messages.insertImage,
                visible: false,
                resizable: showBrowser
            };

        function apply(e) {
            var element = dialog.element,
                w = parseInt(element.find(KEDITORIMAGEWIDTH).val(), 10),
                h = parseInt(element.find(KEDITORIMAGEHEIGHT).val(), 10);

            that.attributes = {
                src: element.find(KEDITORIMAGEURL).val().replace(/ /g, "%20"),
                alt: element.find(KEDITORIMAGETITLE).val()
            };

            that.attributes.width = null;
            that.attributes.height = null;

            if (!isNaN(w) && w > 0) {
                that.attributes.width = w;
            }

            if (!isNaN(h) && h > 0) {
                that.attributes.height = h;
            }

            applied = that.insertImage(img, range);

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
            .find(KEDITORIMAGEURL).val(img ? img.getAttribute("src", 2) : "http://").end()
            .find(KEDITORIMAGETITLE).val(img ? img.alt : "").end()
            .find(KEDITORIMAGEWIDTH).val(imageWidth).end()
            .find(KEDITORIMAGEHEIGHT).val(imageHeight).end()
            .data("kendoWindow");

        if (showBrowser) {
            new kendo.ui.ImageBrowser(
                dialog.element.find(".k-imagebrowser"),
                extend({}, imageBrowser, {
                    change: function() {
                        dialog.element.find(KEDITORIMAGEURL).val(this.value());
                    },
                    apply: apply
                })
            );
        }

        dialog.center().open();
        dialog.element.find(KEDITORIMAGEURL).focus().select();
    }

});

kendo.ui.editor.ImageCommand = ImageCommand;

registerTool("insertImage", new Editor.Tool({ command: ImageCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Insert Image" }) }));

})(window.kendo.jQuery);

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
