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
    KEDITORIMAGETITLE = "#k-editor-image-title";

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
            if (!img) {
                img = dom.create(doc, "img", attributes);
                img.onload = img.onerror = function () {
                        img.removeAttribute("complete");
                        img.removeAttribute("width");
                        img.removeAttribute("height");
                    };

                range.deleteContents();
                range.insertNode(img);

                if (!img.nextSibling) {
                    dom.insertAfter(doc.createTextNode("\ufeff"), img);
                }

                range.setStartAfter(img);
                range.setEndAfter(img);
                RangeUtils.selectRange(range);
                return true;
            } else {
                dom.attr(img, attributes);
            }
        }

        return false;
    },

    _dialogTemplate: function(showBrowser) {
        return kendo.template(
            '<div class="k-editor-dialog k-popup-edit-form k-edit-form-container">' +
                '# if (showBrowser) { #' +
                    '<div class="k-imagebrowser"></div>' +
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
                '<div class="k-edit-buttons k-state-default">' +
                    '<button class="k-dialog-insert k-button">#: messages.dialogInsert #</button>' +
                    '<button class="k-dialog-close k-button k-secondary">#: messages.dialogCancel #</button>' +
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
            dialog,
            options = that.editor.options,
            messages = options.messages,
            imageBrowser = options.imageBrowser,
            showBrowser = !!(kendo.ui.ImageBrowser && imageBrowser && imageBrowser.transport && imageBrowser.transport.read !== undefined);

        function apply(e) {
            var element = dialog.element;

            that.attributes = {
                src: element.find(KEDITORIMAGEURL).val().replace(/ /g, "%20"),
                alt: element.find(KEDITORIMAGETITLE).val()
            };

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

        dialog = this.createDialog(that._dialogTemplate(showBrowser), {
            title: messages.insertImage,
            close: close,
            visible: false,
            resizable: showBrowser,
            activate: function() {
                if (showBrowser) {
                    var that = this;

                    new kendo.ui.ImageBrowser(
                        that.element.find(".k-imagebrowser"),
                        extend({}, imageBrowser, {
                            change: function() {
                                that.element.find(KEDITORIMAGEURL).val(this.value());
                            },
                            apply: apply
                        })
                    );
                }
            }
        })
                .toggleClass("k-imagebrowser-dialog", showBrowser)
                .find(".k-dialog-insert").click(apply).end()
                .find(".k-dialog-close").click(close).end()
                .find(".k-edit-field input").keydown(keyDown).end()
                // IE < 8 returns absolute url if getAttribute is not used
                .find(KEDITORIMAGEURL).val(img ? img.getAttribute("src", 2) : "http://").end()
                .find(KEDITORIMAGETITLE).val(img ? img.alt : "").end()
                .data("kendoWindow")
                .center().open();

        $(KEDITORIMAGEURL, dialog.element).focus().select();
    }

});

kendo.ui.editor.ImageCommand = ImageCommand;

registerTool("insertImage", new Editor.Tool({ command: ImageCommand, template: new ToolTemplate({template: EditorUtils.buttonTemplate, title: "Insert Image" }) }));

})(window.kendo.jQuery);
